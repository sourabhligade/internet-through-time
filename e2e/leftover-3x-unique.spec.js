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

test("leftover-3× unique dests are one leftover dest-true writer — no leftover-official cream", () => {
  const fs = require("fs");
  const path = require("path");
  const hits = [];
  for (const row of ROWS) {
    const file = path.join(__dirname, "..", row.href.replace(/^\//, ""));
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (/data-lo-panel/.test(html) && /data-itt-dest-true/.test(html) && /data-lo-save/.test(html)) {
      hits.push(row.year + "/" + row.id);
    }
  }
  expect(hits, hits.join("\n")).toEqual([]);
});

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

test("2013 unique leftover-3×n is gone", async ({ page }) => {
  expect(ROWS.filter((r) => r.year === "2013")).toEqual([]);
  await page.goto("/years/2013/pages/home.html");
  await revealLeftoverRails(page);
  await expect(page.locator('[data-itt-pop-more="2013"]')).toHaveCount(0);
});

test("2018 unique leftover-3×n is gone", () => {
  expect(ROWS.filter((r) => r.year === "2018")).toEqual([]);
});

test("2021 unique leftover-3×n is gone", () => {
  expect(ROWS.filter((r) => r.year === "2021")).toEqual([]);
});


test("leftover-3× unique catalog is empty", () => {
  expect(ROWS).toEqual([]);
});

test("2008 and 2009 are not leftover-3× unique dest-true rows", () => {
  expect(ROWS.filter((r) => r.year === "2008")).toHaveLength(0);
  expect(ROWS.filter((r) => r.year === "2009")).toHaveLength(0);
});

test("2012 leftover-4× unique dest faces stay · not leftover-3× catalog", () => {
  const fs = require("fs");
  const path = require("path");
  const ids = ["chrome", "twitter", "soundcloud"];
  for (const id of ids) {
    const file = path.join(__dirname, "..", "years/2012/sites", id, "index.html");
    expect(fs.existsSync(file), id).toBe(true);
    const html = fs.readFileSync(file, "utf8");
    expect(html, id + " leftover-4×").toMatch(/data-itt-lo3x/);
    expect(html, id + " pop4").toMatch(/pop4-/);
  }
  expect(ROWS.filter((r) => r.year === "2012")).toEqual([]);
});

test("2005 leftover-3× dest faces are forest leftover · not unique catalog", () => {
  const fs = require("fs");
  const path = require("path");
  const file = path.join(__dirname, "..", "years/2005/sites/adsense/index.html");
  expect(fs.existsSync(file)).toBe(true);
  expect(fs.readFileSync(file, "utf8")).toMatch(/data-itt-lo3x/);
  expect(ROWS.filter((r) => r.year === "2005")).toEqual([]);
});
