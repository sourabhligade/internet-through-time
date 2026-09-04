#!/usr/bin/env node
/** Browser-walk every dest with data-official-verb. Trap never writes. Complete writes gold/leftover key. */
import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.env.BASE_URL || "http://127.0.0.1:8081").replace(/\/$/, "");
const OUT = path.join(ROOT, "docs", "_WALK-OFFICIAL-DESTS-2026-09-02.json");

function walkHtml(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, acc);
    else if (/\.html?$/i.test(ent.name)) acc.push(p);
  }
  return acc;
}

function collect() {
  const dests = [];
  for (const year of fs.readdirSync(path.join(ROOT, "years"))) {
    if (!/^\d{4}$/.test(year) || year === "2025") continue;
    for (const file of walkHtml(path.join(ROOT, "years", year, "sites"))) {
      const html = fs.readFileSync(file, "utf8");
      if (!html.includes("data-official-verb")) continue;
      const key = (html.match(/data-official-key="([^"]+)"/) || [])[1] || "";
      const rel = path.relative(path.join(ROOT, "years", year), file).replace(/\\/g, "/");
      dests.push({ year, href: rel, key });
    }
  }
  return dests;
}

async function walkOne(page, d) {
  const url = `${BASE}/years/${d.year}/${d.href}`;
  const fail = (why) => ({ ...d, ok: false, why, url });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.locator("[data-official-verb]").first().waitFor({ timeout: 15000 });
    if (d.key) await page.evaluate((k) => localStorage.removeItem(k), d.key);
    const trap = page.locator("[data-official-trap]").first();
    if ((await trap.count()) > 0) {
      await trap.click();
      if (d.key && (await page.evaluate((k) => localStorage.getItem(k), d.key))) return fail("trap wrote");
    }
    await page.locator("[data-official-verb]").first().click();
    if (d.key && (await page.evaluate((k) => localStorage.getItem(k), d.key))) return fail("empty wrote");
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    const need = page.locator("[data-official-need]");
    if ((await need.count()) > 0) await need.first().fill("leftover");
    const pick = page.locator("[data-official-pick]").first();
    if ((await pick.count()) > 0) await pick.click();
    await page.locator("[data-official-verb]").first().click();
    if (!d.key) return { ...d, ok: true, url, note: "no official-key" };
    const raw = await page.evaluate((k) => localStorage.getItem(k), d.key);
    if (!raw) return fail("complete did not write");
    return { ...d, ok: true, url };
  } catch (e) {
    return fail(String(e.message || e).slice(0, 180));
  }
}

async function main() {
  const dests = collect();
  console.log("official-verb dests", dests.length);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = [];
  let i = 0;
  for (const d of dests) {
    i += 1;
    const r = await walkOne(page, d);
    results.push(r);
    if (!r.ok || i % 20 === 0) console.log(`${i}/${dests.length} ${r.ok ? "OK" : "FAIL"} ${d.year} ${d.href} ${r.ok ? "" : r.why}`);
  }
  await browser.close();
  const fail = results.filter((r) => !r.ok);
  fs.writeFileSync(OUT, JSON.stringify({ total: results.length, ok: results.length - fail.length, fail: fail.length, failures: fail }, null, 2));
  console.log("SUMMARY official", { total: results.length, ok: results.length - fail.length, fail: fail.length });
  process.exit(fail.length ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(2); });
