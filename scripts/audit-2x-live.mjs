#!/usr/bin/env node
/**
 * Live-check every ship-year 2× matrix flow.
 * Prints FAIL lines. Exit 1 if any fail.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const mx = JSON.parse(fs.readFileSync(path.join(ROOT, "e2e/2x-links.matrix.json"), "utf8"));
const BASE = process.env.BASE_URL || "http://127.0.0.1:8080";
const WIPED = new Set(["2021", "2022", "2023", "2024", "2025"]);

const rows = mx.filter((r) => !WIPED.has(String(r.year)) && fs.existsSync(path.join(ROOT, "years", String(r.year), "index.html")));

function suffixOf(key) {
  return String(key).replace(/^itt\d{2}-/, "");
}

async function runLeftoverOfficial(page, spec) {
  const suffix = suffixOf(spec.key);
  const panel = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await panel.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction((suf) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, suffix, { timeout: 20000 });
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);

  await panel.locator("[data-lo-save]").first().click();
  if (await page.evaluate((k) => localStorage.getItem(k), spec.key)) {
    throw new Error("0 ticks wrote");
  }
  const reqs = panel.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  const saveBtn = panel.locator("[data-lo-save]").first();
  const needPick = (await saveBtn.getAttribute("data-lo-need-pick")) || "";
  const minPick = Number((await saveBtn.getAttribute("data-lo-min-pick")) || "0");
  const picks = panel.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (needPick) {
    await panel.locator(`[data-lo-pick="${needPick}"]`).first().click();
  } else if (nPick > 0) {
    const need = Math.max(minPick || 1, 1);
    for (let i = 0; i < Math.min(need, nPick); i++) await picks.nth(i).click();
  }
  const field = panel.locator("[data-lo-field]");
  if ((await field.count()) > 0) {
    const ph = (await field.first().getAttribute("placeholder")) || "leftover";
    await field.first().fill(ph.length >= 2 ? ph : ph + "xx");
  }
  const wait = panel.locator("[data-lo-wait]");
  if ((await wait.count()) > 0) {
    await wait.first().click();
    await page.waitForTimeout(1000);
  }
  await saveBtn.click();
  const raw = await page.evaluate((k) => localStorage.getItem(k), spec.key);
  if (!raw) throw new Error("complete did not write");
  const blob = JSON.parse(raw);
  if (!blob.real || !blob.leftover || !blob.multiStep) throw new Error("not leftover REAL");
  if (String(blob.year) !== String(spec.year)) throw new Error("year " + blob.year);
  if (spec.next) {
    const res = await page.request.get(BASE + spec.next);
    if (res.status() !== 200) throw new Error("next " + res.status() + " " + spec.next);
  }
}

async function runOne(page, spec) {
  const url = BASE + spec.path;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  const suffix = suffixOf(spec.key);
  const fourX = page.locator(`[data-4x-panel]:has([data-4x-go="${suffix}"])`);
  if ((await fourX.count()) < 1) {
    await runLeftoverOfficial(page, spec);
    return;
  }
  await page.waitForSelector('html[data-4x-ready="1"]', { timeout: 15000 });
  const panel = fourX;
  const go = panel.locator("[data-4x-go]");
  if ((await go.count()) < 1) throw new Error("no go button");
  if (!(await go.first().isVisible())) throw new Error("go not visible");

  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await go.first().click();
  let raw = await page.evaluate((k) => localStorage.getItem(k), spec.key);
  if (raw) throw new Error("incomplete wrote");

  if (spec.kind === "query") {
    const field = panel.locator("[data-4x-field]");
    if ((await field.count()) < 1) throw new Error("no field");
    await field.first().fill("ok leftover");
  } else if (spec.kind === "checks") {
    const boxes = panel.locator("[data-4x-req]");
    const n = await boxes.count();
    if (n < 1) throw new Error("no checks");
    for (let i = 0; i < n; i++) await boxes.nth(i).check();
  } else if (spec.kind === "hops") {
    const hops = panel.locator("[data-4x-hop]");
    const n = await hops.count();
    if (n < 2) throw new Error("hops < 2");
    await hops.nth(0).click();
    await hops.nth(1).click();
  } else if (spec.kind === "wait") {
    const w = panel.locator("[data-4x-wait]");
    if ((await w.count()) < 1) throw new Error("no wait");
    await w.first().click();
    await page.waitForTimeout(2200);
  } else if (spec.kind === "toggle") {
    await panel.locator('[data-4x-toggle="off"]').click();
    await panel.locator('[data-4x-toggle="on"]').click();
  } else {
    throw new Error("unknown kind " + spec.kind);
  }

  await go.first().click();
  raw = await page.evaluate((k) => localStorage.getItem(k), spec.key);
  if (!raw) throw new Error("complete did not write");
  const blob = JSON.parse(raw);
  if (!blob.real || !blob.multiStep) throw new Error("not REAL/multiStep");
  if (String(blob.year) !== String(spec.year)) throw new Error("year " + blob.year);
  if (blob.kind !== spec.kind) throw new Error("kind wrote " + blob.kind);
  if (spec.next) {
    const res = await page.request.get(BASE + spec.next);
    if (res.status() !== 200) throw new Error("next " + res.status() + " " + spec.next);
  }
}

const only = process.argv[2]; // optional year
const work = only ? rows.filter((r) => String(r.year) === only) : rows;

const browser = await chromium.launch();
const page = await browser.newPage();
let fail = 0;
let pass = 0;
for (const spec of work) {
  try {
    await runOne(page, spec);
    pass++;
    process.stdout.write(".");
  } catch (e) {
    fail++;
    process.stdout.write("\nFAIL " + spec.year + " " + spec.key + " " + spec.path + " :: " + e.message + "\n");
  }
}
await browser.close();
process.stdout.write("\nPASS " + pass + " FAIL " + fail + " / " + work.length + "\n");
process.exit(fail ? 1 : 0);
