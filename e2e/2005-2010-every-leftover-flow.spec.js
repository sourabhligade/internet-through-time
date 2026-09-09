// @ts-check
/**
 * Every leftover 3× dest machine + leftover-2× + leftover-4× on leftover 3× dests.
 * 2005–2010. Not a sample. Incomplete never writes. Gold never written.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const YEARS = ["2005", "2006", "2007", "2008", "2009", "2010"];

const GOLD = {
  2005: ["itt05-yt-uploads", "itt05-maps", "itt05-pandora", "itt05-digg", "itt05-reddit", "itt05-flickr"],
  2006: ["itt06-tweets", "itt06-feed", "itt06-fb-open", "itt06-yt", "itt06-gdocs", "itt06-ie7"],
  2007: ["itt07-iphone", "itt07-streetview", "itt07-gmail", "itt07-tumblr", "itt07-ie6"],
  2008: ["itt08-github", "itt08-apps", "itt08-chrome", "itt08-hulu", "itt08-tweets", "itt08-dropbox"],
  2009: ["itt09-like", "itt09-farm", "itt09-bing", "itt09-iphone", "itt09-kickstarter", "itt09-win7"],
  2010: ["itt10-ig-posts", "itt10-ig", "itt10-iphone4", "itt10-ipad", "itt10-fb-og", "itt10-imgur"],
};

function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function siteSlug(href) {
  const m = String(href || "").match(/sites\/([^/?#]+)/);
  return m ? m[1] : "";
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} year
 */
async function leftoverDestHrefs(page, year) {
  await page.goto(`/years/${year}/pages/home.html`);
  return page.evaluate((y) => {
    const sels = [
      `[data-itt-pop3x="${y}"]`,
      `[data-itt-pop-more="${y}"]`,
      `[data-itt-pop-3x3="${y}"]`,
      `[data-itt-pop-2x-a="${y}"]`,
      `[data-itt-pop-2x-b="${y}"]`,
      `[data-itt-pop-2x-c="${y}"]`,
    ];
    const hrefs = [];
    const seen = {};
    for (const sel of sels) {
      document.querySelectorAll(`${sel} a[href*="sites/"]`).forEach((el) => {
        const h = el.getAttribute("href") || "";
        if (!h || seen[h]) return;
        seen[h] = 1;
        hrefs.push(h);
      });
    }
    return hrefs;
  }, year);
}

function destUrl(year, href) {
  const cleaned = href.replace(/^\.\.\//, "");
  return `/years/${year}/${cleaned}`;
}

async function goldEmpty(page, year) {
  for (const g of GOLD[year] || []) {
    expect(await getKey(page, g), "must not write gold " + g).toBeFalsy();
  }
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function walkPopOnPage(page, year) {
  const go = page.locator("[data-pop-go]").first();
  if (!(await go.count())) return { skipped: "no leftover 3× dest machine" };
  const id = (await go.getAttribute("data-pop-id")) || "";
  const keyAttr = await go.getAttribute("data-pop-key");
  const key = keyAttr ? `itt${year.slice(2)}-${keyAttr}` : `itt${year.slice(2)}-pop-${id}`;
  await page.evaluate((k) => localStorage.removeItem(k), key);
  for (const g of GOLD[year] || []) await page.evaluate((k) => localStorage.removeItem(k), g);
  await page.reload();
  await expect(go).toBeVisible({ timeout: 15000 });
  await page.waitForFunction(
    () => {
      const b = document.querySelector("[data-pop-go]");
      return !!(b && b.getAttribute("data-pop-bound") === "1");
    },
    null,
    { timeout: 15000 }
  );
  const panel = go.locator("xpath=ancestor::*[@data-pop-panel='1' or contains(@class,'itt-pop3')][1]");
  const scope = (await panel.count()) ? panel : page;
  await go.click();
  expect(await getKey(page, key), key + " empty/no-pick").toBeFalsy();
  const trap = scope.locator("[data-pop-pick='trap'], [data-pop-trap='1']").first();
  if (await trap.count()) {
    await trap.click();
    await go.click();
    expect(await getKey(page, key), key + " trap").toBeFalsy();
  }
  const keep = scope.locator("[data-pop-pick]:not([data-pop-trap='1']):not([data-pop-pick='trap'])").first();
  if (await keep.count()) await keep.click();
  const reqs = scope.locator("[data-pop-req]");
  const nReq = await reqs.count();
  if (nReq) {
    await go.click();
    expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  }
  const field = scope.locator("[data-pop-field]").first();
  if (await field.count()) {
    await field.fill("");
    await go.click();
    expect(await getKey(page, key), key + " empty field").toBeFalsy();
    await field.fill((await field.getAttribute("placeholder")) || "museum leftover");
  }
  await go.click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(blob.multiStep).toBe(true);
  expect(String(blob.year)).toBe(year);
  await goldEmpty(page, year);
  const next = page.locator(`[data-next-when-key="${key}"] a`).first();
  if (await next.count()) {
    const href = (await next.getAttribute("href")) || "";
    const [res] = await Promise.all([
      page.waitForResponse((r) => r.request().resourceType() === "document"),
      next.click(),
    ]);
    expect(res.ok(), "leftover 3× Next HTTP 200 " + res.url()).toBeTruthy();
    expect(href.length).toBeGreaterThan(0);
  }
  return { key };
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function walkLeftover2x(page, year) {
  const btn = page.locator("[data-lo-save]").first();
  if (!(await btn.count())) return { skipped: "no leftover-2×" };
  await page.waitForFunction(
    () => {
      const b = document.querySelector("[data-lo-save]");
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    null,
    { timeout: 15000 }
  );
  const suffix = (await btn.getAttribute("data-lo-key")) || "";
  const key = `itt${year.slice(2)}-${suffix}`;
  await page.evaluate((k) => localStorage.removeItem(k), key);
  const panel = btn.locator("xpath=ancestor::*[@data-lo-panel][1]");
  const scope = (await panel.count()) ? panel : page;
  const trap = scope.locator("[data-lo-trap], [data-lo-pick='trap']").first();
  if (await trap.count()) {
    await trap.click();
    await btn.click();
    expect(await getKey(page, key), key + " leftover-2× trap").toBeFalsy();
  }
  const picks = scope.locator("[data-lo-pick]:not([data-lo-pick='trap'])");
  const nPick = await picks.count();
  const need = parseInt((await btn.getAttribute("data-lo-min-pick")) || "0", 10);
  const needPick = (await btn.getAttribute("data-lo-need-pick")) || "";
  if (needPick) {
    const named = scope.locator(`[data-lo-pick="${needPick}"]`).first();
    if (await named.count()) await named.click();
  } else if (nPick) {
    const take = need > 0 ? Math.min(need, nPick) : 1;
    for (let i = 0; i < take; i++) await picks.nth(i).click();
  }
  const wait = scope.locator("[data-lo-wait]").first();
  if (await wait.count()) {
    await wait.click();
    await page.waitForTimeout(1000);
  }
  const reqs = scope.locator("[data-lo-req]");
  const nReq = await reqs.count();
  if (nReq) {
    await btn.click();
    expect(await getKey(page, key), key + " leftover-2× 0 ticks").toBeFalsy();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  }
  const field = scope.locator("[data-lo-field]").first();
  if (await field.count()) {
    await field.fill("");
    await btn.click();
    expect(await getKey(page, key), key + " leftover-2× empty field").toBeFalsy();
    await field.fill((await field.getAttribute("placeholder")) || "museum leftover");
  }
  await btn.click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(String(blob.year)).toBe(year);
  await goldEmpty(page, year);
  return { key };
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function walkLeftover4x(page, year) {
  const prefer = page.locator("[data-4x-go$='-4x']").first();
  const btn = (await prefer.count()) ? prefer : page.locator("[data-4x-go]").first();
  if (!(await btn.count())) return { skipped: "no leftover-4×" };
  await page.waitForFunction(
    (sel) => {
      const b = document.querySelector(sel);
      return !!(b && b.getAttribute("data-4x-bound") === "1");
    },
    (await prefer.count()) ? "[data-4x-go$='-4x']" : "[data-4x-go]",
    { timeout: 15000 }
  );
  const suffix = (await btn.getAttribute("data-4x-go")) || "";
  const key = `itt${year.slice(2)}-${suffix}`;
  await page.evaluate((k) => localStorage.removeItem(k), key);
  const panel = btn.locator("xpath=ancestor::*[@data-4x-panel][1]");
  const scope = (await panel.count()) ? panel : page;
  let kind = ((await panel.count()) ? await panel.getAttribute("data-4x-kind") : "query") || "query";
  kind = kind.toLowerCase();
  const hops = scope.locator("[data-4x-hop]:not([data-4x-hop='trap']):not([hidden])");
  const hopN = await hops.count();
  const field = scope.locator("[data-4x-field]").first();
  if (kind === "hops" && hopN === 0 && (await field.count())) kind = "query";
  if (kind === "query") {
    if (await field.count()) {
      await field.fill("");
      await btn.click();
      expect(await getKey(page, key), key + " leftover-4× empty").toBeFalsy();
      await field.fill((await field.getAttribute("placeholder")) || "museum leftover");
    }
  } else if (kind === "checks") {
    const reqs = scope.locator("[data-4x-req]");
    const n = await reqs.count();
    if (n) {
      await btn.click();
      expect(await getKey(page, key), key + " leftover-4× 0 ticks").toBeFalsy();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
    }
  } else if (kind === "hops") {
    if (hopN) {
      await btn.click();
      expect(await getKey(page, key), key + " leftover-4× 0 hops").toBeFalsy();
      for (let i = 0; i < hopN; i++) {
        const hop = hops.nth(i);
        if (await hop.isVisible()) await hop.click();
      }
    }
  } else if (kind === "wait") {
    const wait = scope.locator("[data-4x-wait]").first();
    if (await wait.count()) {
      await btn.click();
      expect(await getKey(page, key), key + " leftover-4× skip wait").toBeFalsy();
      const ms = parseInt((await wait.getAttribute("data-4x-wait-ms")) || "2000", 10);
      await wait.click();
      await page.waitForTimeout(ms + 200);
    }
  } else if (kind === "toggle") {
    const off = scope.locator('[data-4x-toggle="off"]').first();
    const on = scope.locator('[data-4x-toggle="on"]').first();
    if (await off.count()) await off.click();
    if (await on.count()) await on.click();
  }
  await btn.click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe(year);
  await goldEmpty(page, year);
  return { key, kind };
}

test.describe("dest folders stay frozen", () => {
  test("117 / 126 / 55 / 199 / 68 / 44", () => {
    const want = { 2005: 117, 2006: 126, 2007: 55, 2008: 199, 2009: 68, 2010: 44 };
    for (const [y, n] of Object.entries(want)) {
      const dir = path.join(ROOT, "years", y, "sites");
      const got = fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory()).length;
      expect(got, y).toBe(n);
    }
  });
});

for (const year of YEARS) {
  test.describe(`${year} every leftover 3× dest machine + leftover-2× + leftover-4×`, () => {
    test(`leftover 3× dests from home each have leftover 3× dest machine and write leftover-only`, async ({ page }) => {
      const hrefs = await leftoverDestHrefs(page, year);
      expect(hrefs.length, year + " leftover 3× dests").toBeGreaterThan(0);
      const missing = [];
      for (const href of hrefs) {
        const url = destUrl(year, href);
        const res = await page.goto(url);
        expect(res && res.ok(), url).toBeTruthy();
        const n = await page.locator("[data-pop-go]").count();
        if (!n) missing.push(url);
      }
      expect(missing, "leftover 3× dests missing leftover 3× dest machine").toEqual([]);
    });

    test(`walk leftover 3× dest machine on every leftover 3× dest`, async ({ page }) => {
      const hrefs = await leftoverDestHrefs(page, year);
      for (const href of hrefs) {
        const url = destUrl(year, href);
        await page.goto(url);
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        const out = await walkPopOnPage(page, year);
        expect(out.skipped, url + " leftover 3× dest machine").toBeFalsy();
      }
    });

    test(`walk leftover-2× write on every leftover 3× dest`, async ({ page }) => {
      const hrefs = await leftoverDestHrefs(page, year);
      for (const href of hrefs) {
        const url = destUrl(year, href);
        await page.goto(url);
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        if (!(await page.locator("[data-lo-save]").count())) continue;
        const out = await walkLeftover2x(page, year);
        expect(out.skipped, url + " leftover-2×").toBeFalsy();
      }
    });

    test(`walk leftover-4× write on every leftover 3× dest that has leftover-4×`, async ({ page }) => {
      test.setTimeout(180000);
      const hrefs = await leftoverDestHrefs(page, year);
      for (const href of hrefs) {
        const url = destUrl(year, href);
        await page.goto(url);
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        if (!(await page.locator("[data-4x-go]").count())) continue;
        const out = await walkLeftover4x(page, year);
        expect(out.skipped, url + " leftover-4×").toBeFalsy();
      }
    });
  });
}
