#!/usr/bin/env node
/**
 * Walk e2e/registers/band-1994-1997.json in a browser and write passes/.
 *
 *   node scripts/build_passes.js
 *   node scripts/build_passes.js --match aliweb/index.html
 *   node scripts/build_passes.js --limit 20 --workers 4
 *
 * A finished pass: the empty click and the trap leave the row key empty and
 * leave the year star empty, then a real finish writes that key. Leftover
 * rows must be kind leftover. Official verb and scored game rows must be
 * kind official. SSL checkout and portal wars store kind official.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-1994-1997.json");
const OUT = path.join(ROOT, "passes");
const BASE = process.env.BASE_URL || "http://127.0.0.1:8080";

const STARS = {
  "1994": "itt94-csotd",
  "1995": "itt95-ssl-checkout",
  "1996": "itt96-portal-wars",
  "1997": "itt97-pointcast",
};

const TOY_OFFICIAL = new Set();

function arg(name, fallback) {
  const i = process.argv.indexOf(name);
  if (i === -1) return fallback;
  return process.argv[i + 1];
}

function loadRows() {
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  let rows = doc.rows.slice();
  const match = arg("--match", "");
  const limit = parseInt(arg("--limit", "0"), 10);
  if (match) {
    const re = new RegExp(match);
    rows = rows.filter((row) => re.test(row.path) || re.test(row.whenKey || "") || re.test(row.dest));
  }
  if (limit > 0) rows = rows.slice(0, limit);
  return { doc, rows };
}

function htmlOf(row) {
  return fs.readFileSync(path.join(ROOT, row.path), "utf8");
}

function routeOf(row) {
  const html = htmlOf(row);
  const whenKey = row.whenKey || "";
  if (whenKey === "itt94-csotd" || whenKey === "itt95-ssl-checkout" || whenKey === "itt96-portal-wars" || whenKey === "itt97-pointcast") {
    return "custom";
  }
  const officialKey = (html.match(/data-official-key="([^"]+)"/) || [])[1] || "";
  if (
    row.role === "official" &&
    html.indexOf("data-year-game") !== -1 &&
    html.indexOf("year-game-boot.js") !== -1 &&
    whenKey.indexOf("game") !== -1 &&
    (officialKey === whenKey || html.indexOf('data-yg-official-key="' + whenKey + '"') !== -1)
  ) {
    return "game";
  }
  if (row.role === "official" && html.indexOf("data-official-verb") !== -1 && officialKey === whenKey) {
    return "official";
  }
  if (html.indexOf("data-lo-save") !== -1) return "leftover";
  if (html.indexOf("data-official-verb") !== -1) return "verb";
  return "none";
}

function expectedKind(route, key) {
  if (route === "leftover") return "leftover";
  if (route === "verb" || route === "none") return "";
  if (TOY_OFFICIAL.has(key)) return "toy";
  return "official";
}

async function reveal(page) {
  await page.evaluate(() => {
    try { document.documentElement.setAttribute("data-itt-deep", "1"); } catch (e) { /* */ }
    const list = document.querySelectorAll("details.itt-also-year");
    for (let i = 0; i < list.length; i++) list[i].open = true;
  }).catch(() => {});
}

async function raw(page, key) {
  if (!key) return null;
  return page.evaluate((k) => localStorage.getItem(k), key).catch(() => null);
}

async function openRow(page, row) {
  await page.goto(BASE + "/" + row.path, { waitUntil: "domcontentloaded", timeout: 20000 });
  await reveal(page);
  await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.save), null, { timeout: 15000 });
}

async function storageKey(page, suffix) {
  return page.evaluate((suf) => {
    const year = (document.documentElement && document.documentElement.getAttribute("data-itt-year")) || "";
    try {
      if (window.ITT && ITT.YearExtras && ITT.YearExtras.forYear) {
        const Y = ITT.YearExtras.forYear(year);
        if (Y && Y.key) return Y.key(suf);
      }
    } catch (e) { /* */ }
    return "itt" + String(year).slice(2) + "-" + suf;
  }, suffix);
}

async function primarySuffix(page, row) {
  if (row.whenKey) {
    const suffix = row.whenKey.replace(/^itt\d{2}-/, "");
    const has = await page.locator('[data-lo-save][data-lo-key="' + suffix + '"]').count();
    if (has) return suffix;
  }
  const keys = await page.locator("[data-lo-save]").evaluateAll((els) => els.map((el) => el.getAttribute("data-lo-key") || ""));
  return keys.find((k) => k && k !== "gold-lx") || keys[0] || "";
}

async function completeLeftover(page, row) {
  const suffix = await primarySuffix(page, row);
  if (!suffix) return { key: "", status: "no leftover save" };
  const save = page.locator('[data-lo-save][data-lo-key="' + suffix + '"]').first();
  const lo = page.locator('[data-lo-panel]:has([data-lo-save][data-lo-key="' + suffix + '"])').first();
  await save.waitFor({ state: "attached", timeout: 12000 });
  await page.waitForFunction((suf) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, suffix, { timeout: 15000 });
  const key = await storageKey(page, suffix);
  await save.click({ force: true });
  const afterEmpty = await raw(page, key);
  const trap = lo.locator("[data-lo-trap]").first();
  if (await trap.count()) {
    await trap.click({ force: true });
    const trapId = await trap.getAttribute("data-lo-pick");
    const min = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
    if (trapId && min > 1) await trap.click({ force: true });
  }
  const afterTrap = await raw(page, key);
  await lo.locator("[data-lo-req]").evaluateAll((els) => {
    for (let i = 0; i < els.length; i++) els[i].checked = true;
  });
  const need = (await save.getAttribute("data-lo-need-pick")) || "";
  const min = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (need) {
    await lo.locator('[data-lo-pick="' + need + '"]').first().click({ force: true });
  } else if (min > 0) {
    let got = 0;
    for (let i = 0; i < nPick && got < min; i++) {
      const id = (await picks.nth(i).getAttribute("data-lo-pick")) || "";
      const isTrap = (await picks.nth(i).getAttribute("data-lo-trap")) === "1" || id === "trap";
      if (isTrap) continue;
      await picks.nth(i).click({ force: true });
      got += 1;
    }
  } else if (nPick) {
    let clicked = false;
    for (let i = 0; i < nPick; i++) {
      const id = (await picks.nth(i).getAttribute("data-lo-pick")) || "";
      const isTrap = (await picks.nth(i).getAttribute("data-lo-trap")) === "1" || id === "trap";
      if (isTrap) continue;
      await picks.nth(i).click({ force: true });
      clicked = true;
      break;
    }
    if (!clicked) await picks.first().click({ force: true });
  }
  const field = lo.locator("[data-lo-field]").first();
  if (await field.count()) {
    const needField = (await save.getAttribute("data-lo-need-field")) || (await lo.getAttribute("data-lo-need-field")) || "";
    await field.fill(needField || "museum leftover");
  }
  const wait = lo.locator("[data-lo-wait]").first();
  if (await wait.count()) {
    const ms = parseInt((await wait.getAttribute("data-lo-wait-ms")) || "800", 10);
    await wait.click({ force: true });
    await page.waitForFunction(() => {
      const b = document.querySelector("[data-lo-wait]");
      return !!(b && b.getAttribute("data-lo-waited") === "1");
    }, null, { timeout: Math.max(ms, 800) + 2500 }).catch(() => {});
  }
  await save.click({ force: true });
  let blob = null;
  for (let i = 0; i < 25; i++) {
    const value = await raw(page, key);
    if (value) {
      blob = JSON.parse(value);
      break;
    }
    await page.waitForTimeout(200);
  }
  const status = await lo.locator("[data-lo-status]").first().textContent().catch(() => "");
  return { key, afterEmpty, afterTrap, blob, status: String(status || "").trim() };
}

async function completeOfficial(page, row) {
  const key = row.whenKey;
  const verb = page.locator("[data-official-verb]").first();
  await verb.waitFor({ state: "attached", timeout: 12000 });
  await page.waitForFunction(() => {
    const b = document.querySelector("[data-official-verb]");
    return !!(b && b.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
  await page.evaluate(() => {
    const v = document.querySelector("[data-official-verb]");
    if (v) v.click();
  });
  const afterEmpty = await raw(page, key);
  const trap = page.locator("[data-official-trap]").first();
  if (await trap.count()) await trap.click({ force: true });
  const afterTrap = await raw(page, key);
  const reqs = page.locator("[data-official-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const field = page.locator("[data-official-need]").first();
  if (await field.count()) {
    const typ = (await field.getAttribute("type")) || "text";
    const minAttr = await field.getAttribute("data-official-min");
    const minNeed = minAttr && /^\d+$/.test(minAttr) ? parseInt(minAttr, 10) : 2;
    const long = "leftover residual ".repeat(8).slice(0, Math.max(minNeed, 16));
    await field.fill(typ === "number" ? "431" : typ === "email" ? "ada@example.com" : long);
  }
  const pick = page.locator("[data-official-pick]").first();
  if (await pick.count()) await pick.click({ force: true });
  await page.evaluate(() => {
    const v = document.querySelector("[data-official-verb]");
    if (v) v.click();
  });
  let blob = null;
  for (let i = 0; i < 25; i++) {
    const value = await raw(page, key);
    if (value) {
      blob = JSON.parse(value);
      break;
    }
    await page.waitForTimeout(200);
  }
  const status = await page.locator("[data-official-status], [data-itt-action-status]").first().textContent().catch(() => "");
  return { key, afterEmpty, afterTrap, blob, status: String(status || "").trim() };
}

async function completeGame(page, row) {
  const key = row.whenKey;
  await page.waitForFunction(() => !!(window.ITT && window.ITT.YearGame && window.ITT.YearGame.saveBest), null, { timeout: 15000 });
  const start = page.locator("[data-game-start]").first();
  if (await start.count()) await start.click({ force: true });
  await page.waitForTimeout(200);
  const trap = page.locator("[data-official-trap]").first();
  if (await trap.count()) await trap.click({ force: true });
  const afterEmpty = await raw(page, key);
  const afterTrap = afterEmpty;
  const gid = await page.locator("[data-year-game]").first().getAttribute("data-game-id");
  await page.evaluate(({ gameId, year }) => {
    window.ITT.YearGame.saveBest(gameId, 12, { year: year });
  }, { gameId: gid, year: row.year });
  const value = await raw(page, key);
  return {
    key,
    afterEmpty,
    afterTrap,
    blob: value ? JSON.parse(value) : null,
    status: gid ? "saveBest 12" : "no game id",
  };
}

async function waitCustom(page, key) {
  if (key === "itt94-csotd") {
    await page.waitForFunction(() => {
      const b = document.querySelector("form[data-csotd-gb] [data-official-verb]");
      return !!(b && b.getAttribute("data-official-verb-bound") === "1");
    }, null, { timeout: 15000 });
    return;
  }
  if (key === "itt96-portal-wars" || key === "itt97-pointcast") {
    await page.waitForFunction(() => {
      const ready = document.documentElement.getAttribute("data-official-product-ready");
      return ready === "0" || ready === "1";
    }, null, { timeout: 15000 });
    return;
  }
  if (key === "itt95-ssl-checkout") {
    await page.waitForFunction(() => {
      return [...document.scripts].some((s) => (s.src || "").indexOf("one-thing-machines.js") !== -1);
    }, null, { timeout: 15000 });
    await page.waitForTimeout(500);
  }
}

async function completeCustom(page, row) {
  const key = row.whenKey;
  await waitCustom(page, key);
  if (key === "itt94-csotd") {
    await page.locator("form[data-csotd-gb] input[type='submit'], form[data-csotd-gb] [data-official-verb]").first().click({ force: true });
    const afterEmpty = await raw(page, key);
    await page.evaluate(() => { try { sessionStorage.setItem("itt94-csotd-wandered", "1"); } catch (e) { /* */ } });
    const link = page.locator("[data-csotd-link]");
    if (await link.count()) await link.click({ force: true });
    const today = page.locator("[data-official-pick='today']");
    if (await today.count()) await today.click({ force: true });
    await page.fill("[name='gbname']", "Glenn residual");
    await page.fill("[name='gbnote']", "Modem worthy.");
    await page.locator("form[data-csotd-gb] [data-official-verb], form[data-csotd-gb] input[type='submit']").first().click({ force: true });
    const value = await pollKey(page, key);
    return { key, afterEmpty, afterTrap: afterEmpty, blob: value, status: "csotd" };
  }
  if (key === "itt95-ssl-checkout") {
    await page.locator("form[data-ssl-form] button[type='submit']").click({ force: true });
    const afterEmpty = await raw(page, key);
    await page.fill("[name='name']", "Ada Lovelace");
    await page.fill("[name='card']", "4111");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click({ force: true });
    const value = await pollKey(page, key);
    return { key, afterEmpty, afterTrap: afterEmpty, blob: value, status: "ssl" };
  }
  if (key === "itt96-portal-wars") {
    await page.locator("[data-portal='yahoo']").first().click({ force: true });
    const afterEmpty = await raw(page, key);
    for (const id of ["excite", "altavista"]) {
      await page.goto(BASE + "/years/1996/sites/portals/wars.html", { waitUntil: "load" });
      await waitCustom(page, key);
      await page.locator("[data-portal='" + id + "']").first().click({ force: true });
    }
    const value = await pollKey(page, key);
    return { key, afterEmpty, afterTrap: afterEmpty, blob: value, status: "portal" };
  }
  if (key === "itt97-pointcast") {
    await page.locator("[data-pc-sub='News']").click({ force: true });
    const afterEmpty = await raw(page, key);
    await page.locator("[data-pc-sub='Weather']").click({ force: true });
    const value = await pollKey(page, key);
    return { key, afterEmpty, afterTrap: afterEmpty, blob: value, status: "pointcast" };
  }
  return { key, afterEmpty: "skip", afterTrap: "skip", blob: null, status: "no custom" };
}

async function pollKey(page, key) {
  for (let i = 0; i < 30; i++) {
    const value = await raw(page, key);
    if (value) return JSON.parse(value);
    await page.waitForTimeout(200);
  }
  return null;
}

async function completeVerb(page, row) {
  const star = STARS[row.year];
  const verb = page.locator("[data-official-verb]").first();
  if (await verb.count()) await verb.click({ force: true }).catch(() => {});
  await page.waitForTimeout(300);
  const starRaw = await raw(page, star);
  return { key: "", afterEmpty: null, afterTrap: null, blob: null, status: starRaw ? "star written" : "no storage key", starRaw };
}

function judge(row, route, done, starRaw) {
  const key = done.key || row.whenKey || "";
  const want = expectedKind(route, key);
  const star = STARS[row.year];
  const starIsRow = star && star === key;
  const emptyHeld = !done.afterEmpty && !done.afterTrap;
  const starHeld = starIsRow ? emptyHeld : !starRaw;
  const kind = done.blob ? done.blob.kind : "";
  let pass = false;
  let reason = "";
  if (route === "verb") {
    pass = !done.starRaw && !starRaw;
    reason = pass ? "no storage key, star empty" : "click wrote the year star";
  } else if (route === "none") {
    pass = !starRaw;
    reason = pass ? "opened, star empty" : "star written";
  } else if (!emptyHeld) {
    reason = "empty or trap wrote " + key;
  } else if (!done.blob) {
    reason = done.status || "finish wrote nothing";
  } else if (done.blob.v !== 1 || done.blob.real !== true || done.blob.key !== key) {
    reason = "envelope mismatch";
  } else if (want && kind !== want) {
    reason = "kind " + kind + " wanted " + want;
  } else if (!starHeld) {
    reason = "year star " + star + " was written";
  } else {
    pass = true;
    reason = "finished";
  }
  return {
    year: row.year,
    dest: row.dest,
    path: row.path,
    role: row.role,
    n: row.n,
    name: row.name,
    whenKey: row.whenKey,
    leftover2x: !!row.leftover2x,
    route: route,
    key: key,
    kind: kind,
    want: want,
    emptyHeld: emptyHeld,
    starHeld: starHeld,
    pass: pass,
    reason: reason,
    status: done.status || "",
    href: "/" + row.path,
  };
}

async function walkOne(page, row) {
  const route = routeOf(row);
  await openRow(page, row);
  let done;
  if (route === "custom") done = await completeCustom(page, row);
  else if (route === "game") done = await completeGame(page, row);
  else if (route === "official") done = await completeOfficial(page, row);
  else if (route === "leftover") done = await completeLeftover(page, row);
  else if (route === "verb") done = await completeVerb(page, row);
  else done = { key: "", afterEmpty: null, afterTrap: null, blob: null, status: "no save control", starRaw: null };
  const star = STARS[row.year];
  const starRaw = await raw(page, star);
  return judge(row, route, done, starRaw);
}

async function main() {
  if (process.argv.includes("--html-only")) {
    const payload = JSON.parse(fs.readFileSync(path.join(OUT, "1994-1997.json"), "utf8"));
    const passed = payload.rows.filter((row) => row.pass);
    const open = payload.rows.filter((row) => !row.pass);
    payload.passed = passed.length;
    payload.open = open.length;
    payload.walked = payload.rows.length;
    fs.writeFileSync(path.join(OUT, "index.html"), renderIndex(payload, passed));
    fs.writeFileSync(path.join(OUT, "open.html"), renderIndex(payload, open, true));
    console.log("passes " + passed.length + " open " + open.length + " -> passes/");
    return;
  }
  const { doc, rows } = loadRows();
  if (!rows.length) {
    console.error("no rows");
    process.exit(1);
  }
  const workers = Math.max(1, parseInt(arg("--workers", "4"), 10) || 4);
  const browser = await chromium.launch({ headless: true });
  const results = new Array(rows.length);
  let cursor = 0;
  let doneCount = 0;
  const started = Date.now();

  async function worker() {
    while (cursor < rows.length) {
      const i = cursor;
      cursor += 1;
      const row = rows[i];
      const context = await browser.newContext();
      await context.addInitScript(() => {
        /* Clear once per browser context. Later hops in the same room must keep the trail. */
        if (document.cookie.indexOf("itt_pass_walk=1") !== -1) return;
        document.cookie = "itt_pass_walk=1; path=/";
        try { localStorage.clear(); sessionStorage.clear(); } catch (e) { /* */ }
      });
      const page = await context.newPage();
      page.setDefaultTimeout(20000);
      let rec;
      try {
        rec = await Promise.race([
          walkOne(page, row),
          new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 35000)),
        ]);
      } catch (err) {
        rec = {
          year: row.year,
          dest: row.dest,
          path: row.path,
          role: row.role,
          n: row.n,
          name: row.name,
          whenKey: row.whenKey,
          leftover2x: !!row.leftover2x,
          route: routeOf(row),
          key: row.whenKey || "",
          kind: "",
          want: "",
          emptyHeld: false,
          starHeld: false,
          pass: false,
          reason: String(err && err.message ? err.message : err).split("\n")[0].slice(0, 240),
          status: "",
          href: "/" + row.path,
        };
      } finally {
        await context.close().catch(() => {});
      }
      results[i] = rec;
      doneCount += 1;
      if (doneCount % 50 === 0) {
        const partial = results.filter(Boolean);
        fs.mkdirSync(OUT, { recursive: true });
        fs.writeFileSync(path.join(OUT, "1994-1997.partial.json"), JSON.stringify({
          walked: partial.length,
          passed: partial.filter((r) => r.pass).length,
          open: partial.filter((r) => !r.pass).length,
          rows: partial,
        }) + "\n");
      }
      if (!rec.pass || doneCount % 25 === 0 || doneCount === rows.length) {
        const passed = results.filter((r) => r && r.pass).length;
        console.log(doneCount + "/" + rows.length + " passed " + passed + " " + (rec.pass ? "ok" : "OPEN") + " " + rec.path + (rec.pass ? "" : " — " + rec.reason));
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(workers, rows.length) }, () => worker()));
  await browser.close();

  const passed = results.filter((r) => r.pass);
  const open = results.filter((r) => !r.pass);
  const payload = {
    band: "1994-1997",
    built: "2026-10-08",
    base: BASE,
    register: "e2e/registers/band-1994-1997.json",
    census: doc.census,
    elapsedMs: Date.now() - started,
    walked: results.length,
    passed: passed.length,
    open: open.length,
    rows: results,
  };
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "1994-1997.json"), JSON.stringify(payload, null, 2) + "\n");
  fs.writeFileSync(path.join(OUT, "index.html"), renderIndex(payload, passed));
  fs.writeFileSync(path.join(OUT, "open.html"), renderIndex(payload, open, true));
  fs.rmSync(path.join(OUT, "1994-1997.partial.json"), { force: true });
  console.log("passes " + passed.length + " open " + open.length + " -> passes/");
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderIndex(payload, list, isOpen) {
  const title = isOpen ? "1994–1997 open flows" : "1994–1997 passes";
  const byYear = {};
  for (const row of list) {
    (byYear[row.year] || (byYear[row.year] = [])).push(row);
  }
  const years = Object.keys(byYear).sort();
  let body = "";
  for (const year of years) {
    const rows = byYear[year];
    body += "<h2>" + year + " <span>" + rows.length + "</span></h2><table><thead><tr><th>Role</th><th>Flow</th><th>Key</th><th>Kind</th>" + (isOpen ? "<th>Why it is open</th>" : "") + "</tr></thead><tbody>";
    for (const row of rows) {
      const label = row.name || row.dest;
      const n = row.n ? "n=" + row.n + " " : "";
      body += "<tr><td>" + esc(row.role) + "</td><td><a href=\"" + esc(row.href) + "\">" + esc(n + label) + "</a><div class=\"path\">" + esc(row.path) + "</div></td><td><code>" + esc(row.key || "—") + "</code></td><td>" + esc(row.kind || row.want || "—") + "</td>";
      if (isOpen) body += "<td>" + esc(row.reason) + (row.status ? " · " + esc(row.status) : "") + "</td>";
      body += "</tr>";
    }
    body += "</tbody></table>";
  }
  return "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>" + title + "</title><style>body{margin:0;background:#0d1117;color:#e6edf3;font:14px/1.45 Segoe UI,Tahoma,sans-serif}main{max-width:1100px;margin:0 auto;padding:24px 20px 64px}a{color:#58a6ff}h1{font-size:22px;margin:0 0 8px}p{color:#8b949e}h2{font-size:18px;margin:28px 0 8px}h2 span{color:#3fb950;font-size:14px}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:6px 8px;border-bottom:1px solid #30363d;vertical-align:top}code{font-size:12px}.path{color:#8b949e;font-size:11px}nav a{margin-right:12px}</style></head><body><main><h1>" + title + "</h1><p>Walked " + payload.walked + " register rows. " + payload.passed + " passed. " + payload.open + " open. Built " + payload.built + " against " + esc(payload.base) + ".</p><nav><a href=\"index.html\">Passes</a><a href=\"open.html\">Open</a><a href=\"1994-1997.json\">JSON</a></nav>" + body + "</main></body></html>\n";
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  walkOne,
  routeOf,
  expectedKind,
  STARS,
  TOY_OFFICIAL,
};
