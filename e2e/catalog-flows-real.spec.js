// @ts-check
/**
 * Every leftover-2× unique catalog dest and leftover-3× dest-links catalog dest
 * is a real writer. Empty and trap write nothing. A finished click writes
 * ITT.User { v:1, real:true }. Leftover never writes the year star.
 *
 * Href rails are not this check. Missing dest folders stay missing.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const KINDS = ["official", "leftover", "game", "toy", "shell"];

function loadMatrix(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, name), "utf8"));
}

function stars() {
  const text = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  /** @type {Record<string, string>} */
  const out = {};
  const yearRe = /\n    "(\d{4})": \[/g;
  const positions = [];
  let m;
  while ((m = yearRe.exec(text))) positions.push({ year: m[1], start: m.index });
  for (let i = 0; i < positions.length; i++) {
    const chunk = text.slice(
      positions[i].start,
      i + 1 < positions.length ? positions[i + 1].start : text.length
    );
    const star = chunk.match(/"n":\s*1,\s*"name":\s*"[^"]*",\s*"href":\s*"[^"]*",\s*"match":\s*"[^"]*",\s*"whenKey":\s*"([^"]+)"/);
    if (star) out[positions[i].year] = star[1];
  }
  return out;
}

const STAR = stars();

function catalogDests() {
  /** @type {{ year: string, slug: string, file: string, star: string }[]} */
  const out = [];
  const seen = new Set();
  for (const name of ["leftover-2x-unique-links.matrix.json", "leftover-3x-unique-links.matrix.json"]) {
    for (const row of loadMatrix(name)) {
      for (const slug of row.dests) {
        const id = row.year + "/" + slug;
        if (seen.has(id)) continue;
        seen.add(id);
        out.push({
          year: String(row.year),
          slug,
          file: path.join(ROOT, "years", String(row.year), "sites", slug, "index.html"),
          star: STAR[String(row.year)] || "",
        });
      }
    }
  }
  return out;
}

const DESTS = catalogDests();

function writerKind(html) {
  if (/data-lo-save/.test(html)) return "lo";
  if (/data-pop-go/.test(html)) return "pop";
  if (/data-itt-popular-save|data-itt-real-save/.test(html)) return "popular";
  if (/data-official-verb/.test(html)) return "official";
  return "none";
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** Folded pop/5× doors become leftover saves only after boot. Classify the live writer. */
async function waitBound(page) {
  await page.waitForFunction(
    () => {
      const q = (sel) => document.querySelector(sel);
      return !!(
        q("[data-lo-save][data-lo-bound='1']") ||
        q("[data-pop-go][data-pop-bound='1']") ||
        q("[data-itt-popular-save][data-itt-real-bound='1']") ||
        q("[data-itt-real-save][data-itt-real-bound='1']") ||
        q("[data-official-verb][data-official-verb-bound='1']")
      );
    },
    null,
    { timeout: 20000 }
  );
}

async function clearKeys(page, keys) {
  await page.evaluate((list) => {
    list.forEach((k) => {
      if (k) localStorage.removeItem(k);
    });
  }, keys);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 */
async function assertEnvelope(page, key, year) {
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.v, key + " v").toBe(1);
  expect(blob.real, key + " real").toBe(true);
  expect(KINDS, key + " kind").toContain(blob.kind);
  expect(String(blob.year), key + " year").toBe(year);
  expect(blob.key, key + " key").toBe(key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, slug: string, star: string }} d
 */
async function finishLo(page, d) {
  const suffix = await page.evaluate((slug) => {
    const saves = Array.from(document.querySelectorAll("[data-lo-save][data-lo-key]"));
    function panelOf(el) {
      let n = el;
      while (n && n.nodeType === 1) {
        if (n.getAttribute("data-lo-panel") === "1") return n;
        n = n.parentElement;
      }
      return el.parentElement;
    }
    const rows = saves.map((save) => {
      const panel = panelOf(save);
      const key = save.getAttribute("data-lo-key") || "";
      const stem = key.replace(/-(lx|dp|more|rlx|ab)$/i, "");
      return {
        key,
        destTrue: !!(panel && panel.getAttribute("data-itt-dest-true") === "1"),
        match: !!(slug && (key === slug || stem === slug || key.indexOf(slug) === 0)),
      };
    });
    const prefer =
      rows.find((r) => r.destTrue && r.match) ||
      rows.find((r) => r.destTrue) ||
      rows.find((r) => r.match) ||
      rows[0];
    return prefer ? prefer.key : "";
  }, d.slug);
  expect(suffix, d.year + "/" + d.slug + " lo key").toBeTruthy();
  const full = await page.evaluate((suf) => {
    const y = document.documentElement.getAttribute("data-itt-year") || "";
    if (window.ITT && ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey(suf, "itt" + y.slice(2));
    }
    return "itt" + y.slice(2) + "-" + suf;
  }, suffix);
  await clearKeys(page, [full, d.star]);
  await page.reload();
  await revealLeftoverRails(page);
  const save = page.locator(`[data-lo-save][data-lo-key="${suffix}"]`).first();
  await save.waitFor({ state: "attached", timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
  const panel = save.locator("xpath=ancestor::*[@data-lo-panel='1'][1]");
  const scope = (await panel.count()) ? panel : page.locator("body");

  await save.click({ force: true });
  expect(await getKey(page, full), full + " empty").toBeFalsy();

  const trap = scope.locator("[data-lo-trap]:not([data-lo-pick])").first();
  if (await trap.count()) {
    await trap.click({ force: true });
    await save.click({ force: true });
    expect(await getKey(page, full), full + " trap").toBeFalsy();
  }

  const reqs = scope.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });

  const needPick = (await save.getAttribute("data-lo-need-pick")) || "";
  const minPick = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10) || 0;
  const picks = scope.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (needPick) {
    await scope.locator(`[data-lo-pick="${needPick}"]`).first().click({ force: true });
  } else if (nPick) {
    const want = minPick > 0 ? minPick : 1;
    let clicked = 0;
    for (let i = 0; i < nPick && clicked < want; i++) {
      const id = await picks.nth(i).getAttribute("data-lo-pick");
      const isTrap = (await picks.nth(i).getAttribute("data-lo-trap")) === "1" || id === "trap";
      if (isTrap) continue;
      await picks.nth(i).click({ force: true });
      clicked += 1;
    }
  }

  const field = scope.locator("[data-lo-field]").first();
  if (await field.count()) {
    const needField = await page.evaluate((suf) => {
      const btn = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      if (!btn) return "";
      let n = btn;
      while (n && n.nodeType === 1 && n.getAttribute("data-lo-panel") !== "1") n = n.parentElement;
      const root = n && n.getAttribute && n.getAttribute("data-lo-panel") === "1" ? n : btn;
      return btn.getAttribute("data-lo-need-field") || root.getAttribute("data-lo-need-field") || "";
    }, suffix);
    const ph = (await field.getAttribute("placeholder")) || "museum leftover";
    await field.fill(needField || (ph.length >= 2 ? ph : "museum leftover"));
  }

  const wait = scope.locator("[data-lo-wait]").first();
  if (await wait.count()) {
    await wait.click({ force: true });
    await page.waitForFunction(
      (suf) => {
        const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
        if (!b) return false;
        let n = b;
        while (n && n.nodeType === 1 && n.getAttribute("data-lo-panel") !== "1") n = n.parentElement;
        const w = n && n.querySelector ? n.querySelector("[data-lo-wait]") : null;
        return !!(w && w.getAttribute("data-lo-waited") === "1");
      },
      suffix,
      { timeout: 5000 }
    );
  }

  await save.click({ force: true });
  await assertEnvelope(page, full, d.year);
  if (d.star && d.star !== full) expect(await getKey(page, d.star), full + " wrote star").toBeFalsy();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, slug: string, star: string }} d
 */
async function finishPop(page, d) {
  const meta = await page.evaluate(() => {
    const btn = document.querySelector("[data-pop-go]");
    if (!btn) return null;
    const id = btn.getAttribute("data-pop-id") || "site";
    const suffix = btn.getAttribute("data-pop-key") || "pop-" + id;
    return { id, suffix };
  });
  expect(meta, d.slug + " pop").toBeTruthy();
  const full = await page.evaluate((suf) => {
    const y = document.documentElement.getAttribute("data-itt-year") || "";
    if (window.ITT && ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey(suf, "itt" + y.slice(2));
    }
    return "itt" + y.slice(2) + "-" + suf;
  }, meta.suffix);
  await clearKeys(page, [full, d.star]);
  await page.reload();
  await revealLeftoverRails(page);
  const go = page.locator("[data-pop-go]").first();
  await go.waitFor({ state: "attached", timeout: 20000 });
  await page.waitForFunction(
    () => {
      const b = document.querySelector("[data-pop-go]");
      return !!(b && b.getAttribute("data-pop-bound") === "1");
    },
    null,
    { timeout: 20000 }
  );
  const panel = go.locator(
    "xpath=ancestor::*[@data-pop-panel='1' or contains(@class,'itt-pop3x-flow') or contains(@class,'itt-pop3')][1]"
  );
  const scope = (await panel.count()) ? panel : page.locator("body");
  await go.click({ force: true });
  expect(await getKey(page, full), full + " empty").toBeFalsy();
  const trap = scope.locator("[data-pop-pick='trap'], [data-pop-trap='1']").first();
  if (await trap.count()) {
    await trap.click({ force: true });
    await go.click({ force: true });
    expect(await getKey(page, full), full + " trap").toBeFalsy();
  }
  const keep = scope.locator("[data-pop-pick]:not([data-pop-trap='1']):not([data-pop-pick='trap'])").first();
  if (await keep.count()) await keep.click({ force: true });
  const reqs = scope.locator("[data-pop-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const field = scope.locator("[data-pop-field]").first();
  if (await field.count()) {
    const ph = (await field.getAttribute("placeholder")) || "museum note";
    await field.fill(ph.length >= 2 ? ph : "museum note");
  }
  await go.click({ force: true });
  await assertEnvelope(page, full, d.year);
  if (d.star && d.star !== full) expect(await getKey(page, d.star), full + " wrote star").toBeFalsy();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, slug: string, star: string }} d
 */
async function finishPopular(page, d) {
  const suffix = await page.evaluate(() => {
    const btn = document.querySelector("[data-itt-popular-save], [data-itt-real-save]");
    return btn ? btn.getAttribute("data-storage-key") || "real-ack" : "";
  });
  const full = await page.evaluate((suf) => {
    const y = document.documentElement.getAttribute("data-itt-year") || "";
    if (window.ITT && ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey(suf, "itt" + y.slice(2));
    }
    return "itt" + y.slice(2) + "-" + suf;
  }, suffix);
  await clearKeys(page, [full, d.star]);
  await page.reload();
  await revealLeftoverRails(page);
  const save = page.locator("[data-itt-popular-save], [data-itt-real-save]").first();
  await save.waitFor({ state: "attached", timeout: 20000 });
  await page.waitForFunction(
    () => {
      const b = document.querySelector("[data-itt-popular-save], [data-itt-real-save]");
      return !!(b && b.getAttribute("data-itt-real-bound") === "1");
    },
    null,
    { timeout: 20000 }
  );
  const panel = save.locator("xpath=ancestor::*[contains(@class,'itt-popular-panel')][1]");
  const scope = (await panel.count()) ? panel : page.locator("body");
  await save.click({ force: true });
  expect(await getKey(page, full), full + " empty").toBeFalsy();
  const reqs = scope.locator("[data-popular-req], [data-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const fieldSel = (await save.getAttribute("data-require-field")) || "";
  if (fieldSel) {
    const field = scope.locator(fieldSel).first();
    const minLen = parseInt((await save.getAttribute("data-require-field-min")) || "2", 10) || 2;
    const ph = (await field.getAttribute("placeholder")) || "museum note";
    await field.fill(ph.length >= minLen ? ph : "museum note");
  }
  await save.click({ force: true });
  await assertEnvelope(page, full, d.year);
  if (d.star && d.star !== full) expect(await getKey(page, d.star), full + " wrote star").toBeFalsy();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, slug: string, star: string }} d
 */
async function finishOfficial(page, d) {
  const key = await page.evaluate(() => document.documentElement.getAttribute("data-official-key") || "");
  expect(key, d.slug + " official key").toBeTruthy();
  await clearKeys(page, [key, d.star]);
  await page.reload();
  const verb = page.locator("[data-official-verb]").first();
  await verb.waitFor({ state: "attached", timeout: 20000 });
  await page.waitForFunction(
    () => {
      const b = document.querySelector("[data-official-verb]");
      return !!(b && b.getAttribute("data-official-verb-bound") === "1");
    },
    null,
    { timeout: 20000 }
  );
  await verb.click({ force: true });
  expect(await getKey(page, key), key + " empty").toBeFalsy();
  const reqs = page.locator("[data-official-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const needs = page.locator("[data-official-need]");
  const nNeed = await needs.count();
  for (let i = 0; i < nNeed; i++) {
    const ph = (await needs.nth(i).getAttribute("placeholder")) || "museum note";
    await needs.nth(i).fill(ph.length >= 2 ? ph : "museum note");
  }
  await verb.click({ force: true });
  await assertEnvelope(page, key, d.year);
}

test.describe("catalog dests are real writers", () => {
  test("disk: every catalog dest has a writer hook", () => {
    expect(DESTS.length).toBeGreaterThan(1100);
    const misses = [];
    for (const d of DESTS) {
      if (!fs.existsSync(d.file)) {
        misses.push(d.year + "/" + d.slug + " missing");
        continue;
      }
      const html = fs.readFileSync(d.file, "utf8");
      if (writerKind(html) === "none") misses.push(d.year + "/" + d.slug + " no writer");
    }
    expect(misses, misses.join(" · ")).toEqual([]);
  });

  for (const d of DESTS) {
    test(`${d.year} ${d.slug} real writer`, async ({ page }) => {
      const res = await page.goto("/years/" + d.year + "/sites/" + d.slug + "/index.html");
      expect(res && res.ok(), d.slug + " http").toBeTruthy();
      await revealLeftoverRails(page);
      await waitBound(page);
      const html = await page.content();
      const kind = writerKind(html);
      expect(kind, d.year + "/" + d.slug).not.toBe("none");
      if (kind === "lo") await finishLo(page, d);
      else if (kind === "pop") await finishPop(page, d);
      else if (kind === "popular") await finishPopular(page, d);
      else await finishOfficial(page, d);
    });
  }
});
