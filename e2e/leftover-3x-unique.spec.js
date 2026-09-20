// @ts-check
/**
 * Unique leftover-3×n — one dest / one key / dest-true.
 * Empty never writes. Complete writes leftover only. Never star.
 * Dest set is unique vs official 10.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const ROWS = require("./leftover-3x-unique.matrix.json");

function goSel(row) {
  if (row.kind === "third") return `[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-${row.id}']`;
  if (row.kind === "second") return `[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-${row.id}']`;
  return `[data-itt-lo3x] [data-pop-go][data-pop-id='${row.id}']:not([data-pop-key])`;
}

test("unique leftover-3× dests are a set — no dest twice inside a year", () => {
  const byYear = {};
  for (const row of ROWS) {
    byYear[row.year] = byYear[row.year] || [];
    byYear[row.year].push(row.id);
  }
  for (const [year, ids] of Object.entries(byYear)) {
    expect(new Set(ids).size, year + " unique dests").toBe(ids.length);
  }
});

for (const row of ROWS) {
  test.describe(`${row.year} leftover-3× unique ${row.kind} ${row.id}`, () => {
    test(`dest-true face empty never writes · complete writes ${row.key} never star`, async ({
      page,
    }) => {
      await page.goto(row.href);
      await revealLeftoverRails(page);
      await page.evaluate((ks) => {
        ks.forEach((k) => localStorage.removeItem(k));
      }, [row.key, row.star]);
      await page.reload();
      await revealLeftoverRails(page);
      const go = page.locator(goSel(row)).first();
      await expect(go, row.href + " leftover-3× go").toBeVisible();
      const panel = go.locator("xpath=ancestor::*[@data-itt-lo3x][1]");
      await expect(panel, row.href + " dest-true leftover-3×").toBeVisible();
      await go.click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
      await panel.locator('[data-pop-pick="keep"]').click();
      await panel.locator("[data-pop-req]").nth(0).check();
      await panel.locator("[data-pop-req]").nth(1).check();
      await panel.locator("[data-pop-field]").fill(row.id + " leftover");
      await go.click();
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), row.key)).toBeTruthy();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star)).toBeFalsy();
    });
  });
}

test("2013 unique leftover-3×n is 9 dests · second includes yikyak", async ({ page }) => {
  const ids = ROWS.filter((r) => r.year === "2013").map((r) => r.id);
  expect(ids).toEqual([
    "askfm",
    "whisper",
    "youtube",
    "chrome",
    "medium",
    "yikyak",
    "reddit",
    "facebook",
    "twitter",
  ]);
  await page.goto("/years/2013/pages/home.html");
  await revealLeftoverRails(page);
  await expect.poll(async () => {
    await revealLeftoverRails(page);
    return page.locator('[data-itt-pop-more="2013"]').count();
  }, { timeout: 15000 }).toBeGreaterThan(0);
  const strip = page.locator('[data-itt-pop-more="2013"]').first();
  await expect(strip).toBeAttached({ timeout: 15000 });
  await expect(strip.locator('a[href*="sites/"]')).toHaveCount(3);
  await expect(strip).toContainText(/Yik Yak/);
});

test("2018 unique leftover-3×n stops at first 3 · no invented dests", () => {
  const rows = ROWS.filter((r) => r.year === "2018");
  expect(rows.map((r) => r.kind)).toEqual(["first", "first", "first"]);
  expect(rows.map((r) => r.id)).toEqual(["reddit", "youtube", "wikipedia"]);
});

test("2021 unique leftover-3×n stops at 5 leftover dests", () => {
  const rows = ROWS.filter((r) => r.year === "2021");
  expect(rows).toHaveLength(5);
});

test("2022 unique leftover-3×n is 9 dests dest-disjoint from official 10", () => {
  const rows = ROWS.filter((r) => r.year === "2022");
  expect(rows.map((r) => r.id)).toEqual([
    "amazon",
    "google",
    "instagram",
    "facebook",
    "youtube",
    "reddit",
    "wikipedia",
    "netflix",
    "nyt",
  ]);
  const official = new Set([
    "chatgpt",
    "wordle",
    "twitter",
    "bereal",
    "iphone",
    "ftx",
    "mastodon",
    "tiktok",
    "windows11",
    "playable",
  ]);
  for (const r of rows) {
    expect(official.has(r.id), r.id + " must not be official dest").toBe(false);
  }
});

test("2007 unique leftover-3×n is 9 dests dest-disjoint from official 10", () => {
  const rows = ROWS.filter((r) => r.year === "2007");
  expect(rows.map((r) => r.id)).toEqual([
    "wiki",
    "myspace",
    "maps",
    "ebay",
    "stumble",
    "wow",
    "flickr",
    "reddit",
    "digg",
  ]);
  const official = new Set([
    "iphone",
    "streetview",
    "gmail",
    "fbplat",
    "twitter",
    "youtube",
    "tumblr",
    "kindle",
    "ie6",
    "playable",
  ]);
  for (const r of rows) {
    expect(official.has(r.id), r.id + " must not be official dest").toBe(false);
  }
});

test("2010 unique leftover-3×n is 9 dests dest-disjoint from official 10", () => {
  const rows = ROWS.filter((r) => r.year === "2010");
  expect(rows.map((r) => r.id)).toEqual([
    "netflix",
    "tumblr",
    "formspring",
    "chrome",
    "wave",
    "android",
    "reddit",
    "google",
    "groupon",
  ]);
  const official = new Set([
    "instagram",
    "iphone",
    "ipad",
    "facebook",
    "farmville",
    "imgur",
    "foursquare",
    "twitter",
    "youtube",
    "playable",
  ]);
  for (const r of rows) {
    expect(official.has(r.id), r.id + " must not be official dest").toBe(false);
  }
});

test("2008 and 2009 are not leftover-3× unique dest-true rows", () => {
  expect(ROWS.filter((r) => r.year === "2008")).toHaveLength(0);
  expect(ROWS.filter((r) => r.year === "2009")).toHaveLength(0);
});

for (const row of ROWS.filter((r) => r.year === "2007" || r.year === "2010")) {
  test(`${row.year} ${row.id} has one dest-true leftover-3× go · no mock leftover go`, async ({
    page,
  }) => {
    await page.goto(row.href);
    await revealLeftoverRails(page);
    const lo3xGo = page.locator("[data-itt-lo3x] [data-pop-go]");
    await expect(lo3xGo, row.href + " dest-true leftover-3× go").toHaveCount(1);
    const allGo = page.locator("[data-pop-go]");
    await expect(allGo, row.href + " no mock leftover go").toHaveCount(1);
    await expect(
      page.locator("[data-itt-capture-cite], .itt-pixel-failed").first(),
      row.href + " failed-final / capture-cite"
    ).toBeAttached();
  });
}

test("2020 unique leftover-3×n is 9 dests dest-disjoint from official 10", () => {
  const rows = ROWS.filter((r) => r.year === "2020");
  expect(rows.map((r) => r.id)).toEqual([
    "amazon",
    "facebook",
    "google",
    "instagram",
    "youtube",
    "slack",
    "reddit",
    "wikipedia",
    "nyt",
  ]);
  const official = new Set([
    "zoom",
    "houseparty",
    "discord",
    "teams",
    "classroom",
    "netflix",
    "tiktok",
    "amongus",
    "animalcrossing",
    "playable",
  ]);
  for (const r of rows) {
    expect(official.has(r.id), r.id + " must not be official dest").toBe(false);
  }
});

