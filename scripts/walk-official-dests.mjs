#!/usr/bin/env node
/**
 * Browser-walk every dest with data-official-verb.
 * Fills only official/product fields (skips leftover panels).
 * Trap / empty never write. Complete writes html[data-official-key].
 */
import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.env.BASE_URL || "http://127.0.0.1:8080").replace(/\/$/, "");
const WORKERS = Math.max(1, parseInt(process.env.WORKERS || "4", 10) || 4);
const WIPED = new Set(["2018", "2020", "2023", "2024", "2025"]);
const OUT = process.env.OUT || "/tmp/walk-official-dests.json";

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
    if (!/^\d{4}$/.test(year) || WIPED.has(year)) continue;
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

async function fillProductHonesty(page) {
  return page.evaluate(() => {
    function inSidePanel(el) {
      var n = el;
      while (n && n.nodeType === 1) {
        if (n.getAttribute) {
          if (n.getAttribute("data-lo-panel") === "1") return true;
          if (n.getAttribute("data-pop-panel") === "1") return true;
        }
        n = n.parentNode;
      }
      return false;
    }
    var reqs = 0;
    var all = document.querySelectorAll("input[type='checkbox']");
    var i;
    for (i = 0; i < all.length; i++) {
      if (inSidePanel(all[i])) continue;
      var el = all[i];
      if (el.getAttribute("data-official-req") != null || el.getAttribute("data-req") != null) {
        el.checked = true;
        reqs += 1;
        continue;
      }
      var attrs = el.attributes;
      var j;
      for (j = 0; j < attrs.length; j++) {
        var n = attrs[j].name || "";
        if (n.indexOf("data-") !== 0) continue;
        if (n === "data-lo-req" || n === "data-pop-req") continue;
        if (n.slice(-4) === "-req" || n.slice(-6) === "-check") {
          el.checked = true;
          reqs += 1;
          break;
        }
      }
    }
    var verb = document.querySelector("[data-official-verb]");
    var form = verb && (verb.form || (verb.closest && verb.closest("form")));
    var field = document.querySelector("[data-official-need]");
    if (field && inSidePanel(field)) field = null;
    if (!field && form) {
      field =
        form.querySelector("[data-official-need]") ||
        form.querySelector("input[required], textarea[required]") ||
        form.querySelector("input[type='text'], input[type='search'], input:not([type]), textarea");
      if (field && inSidePanel(field)) field = null;
    }
    if (!field) {
      var cands = document.querySelectorAll(
        "input[type='text'], input[type='search'], input:not([type]), textarea"
      );
      var k;
      for (k = 0; k < cands.length; k++) {
        if (!inSidePanel(cands[k])) {
          field = cands[k];
          break;
        }
      }
    }
    if (field) {
      var minNeed = 2;
      var minAttr = field.getAttribute("data-official-min");
      if (minAttr && /^\d+$/.test(minAttr)) minNeed = parseInt(minAttr, 10);
      var fill = "museum leftover";
      while (fill.length < minNeed) fill += " leftover tweet past one-forty";
      field.value = fill;
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
    /* official-verb.js: form with ≥2 product boxes and no official-req needs 2 ticks */
    var verbEl = document.querySelector("[data-official-verb]");
    var formEl = verbEl && (verbEl.form || (verbEl.closest && verbEl.closest("form")));
    if (formEl && reqs === 0) {
      var boxes = formEl.querySelectorAll("input[type='checkbox']");
      var ticked = 0;
      var b;
      for (b = 0; b < boxes.length && ticked < 2; b++) {
        if (inSidePanel(boxes[b])) continue;
        boxes[b].checked = true;
        ticked += 1;
        reqs += 1;
      }
    }
    var pickId = verb ? verb.getAttribute("data-official-need-pick") || "" : "";
    var picked = 0;
    if (pickId) {
      var p = document.querySelector('[data-official-pick="' + pickId + '"]');
      if (p) {
        p.click();
        picked = 1;
      }
    } else {
      var picks = document.querySelectorAll("[data-official-pick]");
      if (picks.length) {
        picks[0].click();
        picked = 1;
      }
    }
    return {
      reqs: reqs,
      field: !!field,
      picked: picked,
      bound: !!(verb && verb.getAttribute("data-official-verb-bound") === "1"),
    };
  });
}

async function walkOne(page, d) {
  const url = `${BASE}/years/${d.year}/${d.href}`;
  const fail = (why, extra) => ({ ...d, ok: false, why, url, ...(extra || {}) });
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.locator("[data-official-verb]").first().waitFor({ timeout: 15000 });
    await page
      .waitForFunction(
        () => {
          const b = document.querySelector("[data-official-verb]");
          return !!(b && b.getAttribute("data-official-verb-bound") === "1");
        },
        null,
        { timeout: 12000 }
      )
      .catch(() => {});
    if (d.key) await page.evaluate((k) => localStorage.removeItem(k), d.key);

    const trap = page.locator("[data-official-trap]").first();
    if ((await trap.count()) > 0) {
      await trap.click();
      if (d.key && (await page.evaluate((k) => localStorage.getItem(k), d.key))) {
        return fail("trap wrote");
      }
    }

    const destUrl = page.url();
    await page.locator("[data-official-verb]").first().click();
    await page.waitForTimeout(200);
    if (page.url() !== destUrl) {
      /* Form submit navigated. Product machine may have written on a prefilled form. */
      const rawNav = d.key ? await page.evaluate((k) => localStorage.getItem(k), d.key) : null;
      if (rawNav) {
        let navObj = null;
        try {
          navObj = JSON.parse(rawNav);
        } catch {
          navObj = null;
        }
        if (navObj && (navObj.real === true || navObj.official === true || Array.isArray(navObj))) {
          return { ...d, ok: true, url, note: "product-nav", payload: rawNav.slice(0, 80) };
        }
      }
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
      await page.locator("[data-official-verb]").first().waitFor({ timeout: 15000 });
      if (d.key) await page.evaluate((k) => localStorage.removeItem(k), d.key);
    } else if (d.key && (await page.evaluate((k) => localStorage.getItem(k), d.key))) {
      const rawEmpty = await page.evaluate((k) => localStorage.getItem(k), d.key);
      let emptyObj = null;
      try {
        emptyObj = JSON.parse(rawEmpty);
      } catch {
        emptyObj = null;
      }
      /* Year-true product machine (Like / Add / Patch / prefilled Send) writes official key. */
      if (emptyObj && emptyObj.real === true) {
        return { ...d, ok: true, url, note: "product-oneclick", payload: rawEmpty.slice(0, 80) };
      }
      return fail("empty wrote");
    }

    const filled = await fillProductHonesty(page);
    const destUrl2 = page.url();
    await page.locator("[data-official-verb]").first().click();
    await page.waitForTimeout(350);
    if (page.url() !== destUrl2) {
      /* Navigated after complete — localStorage persists on same origin. */
    }
    if (!d.key) return { ...d, ok: true, url, note: "no official-key", filled };
    const raw = await page.evaluate((k) => localStorage.getItem(k), d.key);
    if (!raw) return fail("complete did not write", { filled });
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch {
      return fail("wrote non-JSON", { filled, raw: String(raw).slice(0, 80) });
    }
    const yearOk = !obj.year || String(obj.year) === d.year;
    const realOk = obj.real === true || obj.official === true || Array.isArray(obj);
    if (!realOk || !yearOk) {
      return fail("payload " + raw.slice(0, 80), { filled });
    }
    return { ...d, ok: true, url, filled };
  } catch (e) {
    return fail(String(e.message || e).slice(0, 180));
  }
}

async function main() {
  const dests = collect();
  console.log("official-verb dests", dests.length, "workers", WORKERS);
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
      if (!r.ok || done % 20 === 0) {
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
  console.log("SUMMARY official", { total: out.total, ok: out.ok, fail: out.fail });
  if (fail.length) {
    for (const f of fail.slice(0, 50)) console.log(" FAIL", f.year, f.href, f.why);
  }
  process.exit(fail.length ? 1 : 0);
}
main().catch((e) => {
  console.error(e);
  process.exit(2);
});
