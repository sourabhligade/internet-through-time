#!/usr/bin/env node
/**
 * Browser-walk every leftover dest that has data-lo-save.
 * Trap / 0 ticks never write. Complete writes {real, leftover, year}.
 * Usage: BASE_URL=http://127.0.0.1:8081 node scripts/walk-leftover-dests.mjs
 */
import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.env.BASE_URL || "http://127.0.0.1:8081").replace(/\/$/, "");
const YEARS = new Set(
  (process.env.YEARS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);
const USE_MATRIX = process.env.MATRIX === "1";
const WORKERS = Math.max(1, parseInt(process.env.WORKERS || "1", 10) || 1);
const OUT =
  process.env.OUT ||
  path.join(
    ROOT,
    "docs",
    YEARS.size
      ? `_WALK-LEFTOVER-DESTS-${[...YEARS].join("-")}.json`
      : "_WALK-LEFTOVER-DESTS-2026-09-02.json"
  );

function walkHtml(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, acc);
    else if (/\.html?$/i.test(ent.name)) acc.push(p);
  }
  return acc;
}

function collectDests() {
  if (USE_MATRIX) {
    const matrix = JSON.parse(
      fs.readFileSync(path.join(ROOT, "e2e", "leftover-official.matrix.json"), "utf8")
    );
    return (matrix.dests || []).filter((d) => {
      if (YEARS.size && !YEARS.has(d.year)) return false;
      const dest = path.join(ROOT, "years", d.year, d.href);
      return fs.existsSync(dest);
    });
  }
  const dests = [];
  const yearsDir = path.join(ROOT, "years");
  for (const year of fs.readdirSync(yearsDir)) {
    if (!/^\d{4}$/.test(year) || year === "2025") continue;
    if (YEARS.size && !YEARS.has(year)) continue;
    const files = walkHtml(path.join(yearsDir, year, "sites"));
    for (const file of files) {
      const html = fs.readFileSync(file, "utf8");
      if (!html.includes("data-lo-save") || !html.includes("data-lo-panel")) continue;
      const m = html.match(/data-lo-key="([^"]+)"/);
      if (!m) continue;
      const rel = path.relative(path.join(yearsDir, year), file).replace(/\\/g, "/");
      dests.push({ year, href: rel, suffix: m[1], key: "itt" + year.slice(2) + "-" + m[1] });
    }
  }
  return dests;
}

async function walkOne(page, d) {
  const url = `${BASE}/years/${d.year}/${d.href}`;
  const fail = (why) => ({ ...d, ok: false, why, url });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
    const panel = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${d.suffix}"])`).first();
    await panel.locator("[data-lo-save]").waitFor({ timeout: 15000 });
    await page.waitForFunction(
      (suf) => {
        const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
        return !!(b && b.getAttribute("data-lo-bound") === "1");
      },
      d.suffix,
      { timeout: 15000 }
    );
    await page.evaluate((k) => localStorage.removeItem(k), d.key);

    const trap = panel.locator("[data-lo-trap]").first();
    if ((await trap.count()) > 0) {
      await trap.click();
      if (await page.evaluate((k) => localStorage.getItem(k), d.key)) {
        return fail("trap wrote");
      }
    }
    await panel.locator("[data-lo-save]").first().click();
    if (await page.evaluate((k) => localStorage.getItem(k), d.key)) {
      return fail("0 ticks wrote");
    }
    const reqs = panel.locator("[data-lo-req]");
    const nReq = await reqs.count();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
    const saveBtn = panel.locator("[data-lo-save]").first();
    const destNeed = (await saveBtn.getAttribute("data-lo-need-pick")) || "";
    const destMin = (await saveBtn.getAttribute("data-lo-min-pick")) || "";
    const needPick = destNeed;
    const minPick = Number(destMin || "0");
    const picks = panel.locator("[data-lo-pick]");
    const nPick = await picks.count();
    if (needPick) {
      const needBtn = panel.locator(`[data-lo-pick="${needPick}"]`);
      if ((await needBtn.count()) === 0) return fail("needPick missing " + needPick);
      await needBtn.first().click();
    } else if (nPick > 0) {
      const need = Math.max(minPick || 1, 1);
      for (let i = 0; i < Math.min(need, nPick); i++) await picks.nth(i).click();
    }
    const field = panel.locator("[data-lo-field]");
    if ((await field.count()) > 0) {
      const ph = d.placeholder || "leftover";
      await field.first().fill(ph.length >= 2 ? ph : ph + "xx");
    }
    const wait = panel.locator("[data-lo-wait]");
    if ((await wait.count()) > 0) {
      await wait.first().click();
      await page.waitForTimeout(1000);
    }
    await saveBtn.click();
    const raw = await page.evaluate((k) => localStorage.getItem(k), d.key);
    if (!raw) return fail("complete did not write");
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch {
      return fail("wrote non-JSON");
    }
    if (!obj.real || !obj.leftover || String(obj.year) !== d.year) {
      return fail("payload " + raw.slice(0, 80));
    }
    return { ...d, ok: true, url };
  } catch (e) {
    return fail(String(e.message || e).slice(0, 180));
  }
}

async function main() {
  const dests = collectDests();
  console.log("leftover dests to walk", dests.length, "workers", WORKERS, "matrix", USE_MATRIX);
  const browser = await chromium.launch();
  const results = new Array(dests.length);
  let done = 0;
  async function worker(id) {
    const page = await browser.newPage();
    for (let i = id; i < dests.length; i += WORKERS) {
      const d = dests[i];
      const r = await walkOne(page, d);
      results[i] = r;
      done += 1;
      if (!r.ok || done % 50 === 0) {
        console.log(`${done}/${dests.length} ${r.ok ? "OK" : "FAIL"} ${d.year} ${d.href} ${r.ok ? "" : r.why}`);
      }
    }
    await page.close();
  }
  await Promise.all(Array.from({ length: Math.min(WORKERS, dests.length) }, (_, i) => worker(i)));
  await browser.close();
  const fail = results.filter((r) => !r.ok);
  const byYear = {};
  for (const r of results) {
    byYear[r.year] = byYear[r.year] || { ok: 0, fail: 0 };
    byYear[r.year][r.ok ? "ok" : "fail"] += 1;
  }
  const out = {
    total: results.length,
    ok: results.length - fail.length,
    fail: fail.length,
    byYear,
    failures: fail,
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log("wrote", OUT);
  console.log("SUMMARY", JSON.stringify({ total: out.total, ok: out.ok, fail: out.fail }));
  if (fail.length) {
    for (const f of fail.slice(0, 40)) console.log(" FAIL", f.year, f.href, f.why);
  }
  process.exit(fail.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
