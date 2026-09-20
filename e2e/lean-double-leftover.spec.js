// @ts-check
/**
 * Lean-double leftover dests — dest-disjoint leftover dests on thin lean doors.
 * Empty / trap never write. Complete writes leftover key. Never star.
 * Not leftover-3× unique. Not official 10. Not leftover-20.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails, killOverlays } = require("./helpers");
const ROWS = require("./lean-double-leftover.matrix.json");
const UNIQUE = require("../scripts/leftover-3x-unique.json");

const ROOT = path.join(__dirname, "..");
const WANT_FOLDERS = {
  2007: 46,
  2010: 44,
  2011: 62,
  2012: 48,
  2014: 36,
  2016: 106,
  2018: 44,
  2020: 39,
  2021: 30,
  2022: 38,
};

function destFolders(year) {
  const dir = path.join(ROOT, "years", String(year), "sites");
  return fs.readdirSync(dir).filter((name) =>
    fs.statSync(path.join(dir, name)).isDirectory()
  );
}

function uniqueIds(year) {
  const row = UNIQUE[String(year)] || {};
  const ids = [];
  for (const layer of ["first", "second", "third"]) {
    for (const item of row[layer] || []) {
      if (item.id) ids.push(item.id);
    }
  }
  return ids;
}

test("lean-double leftover dests are unique within a year", () => {
  const byYear = {};
  for (const row of ROWS) {
    byYear[row.year] = byYear[row.year] || [];
    byYear[row.year].push(row.id);
  }
  for (const [year, ids] of Object.entries(byYear)) {
    expect(new Set(ids).size, year + " unique leftover dests").toBe(ids.length);
  }
});

test("lean-double leftover dests dest-disjoint leftover-3× unique", () => {
  for (const row of ROWS) {
    expect(
      uniqueIds(row.year).includes(row.id),
      row.year + " " + row.id + " must not be leftover-3× unique"
    ).toBe(false);
  }
});

test("2018 leftover-3× unique stays 3 · 2021 stays 5", () => {
  expect(uniqueIds("2018")).toHaveLength(3);
  expect(uniqueIds("2021")).toHaveLength(5);
});

test("dest folder counts match lean-double disk", () => {
  for (const [y, n] of Object.entries(WANT_FOLDERS)) {
    expect(destFolders(y).length, y + " dest folders").toBe(n);
  }
});

test("2013 dest folders stay holes-only 54", () => {
  expect(destFolders(2013).length).toBe(54);
});

for (const row of ROWS) {
  test.describe(`${row.year} leftover dest ${row.id}`, () => {
    test(`empty / trap never write · complete writes ${row.key} never star`, async ({
      page,
    }) => {
      await page.goto(row.href);
      await revealLeftoverRails(page);
      await killOverlays(page);
      await page.evaluate((ks) => {
        ks.forEach((k) => localStorage.removeItem(k));
      }, [row.key, row.star]);
      await page.reload();
      await revealLeftoverRails(page);
      await killOverlays(page);

      const panel = page.locator("[data-lo-panel][data-itt-dest-true]").first();
      await expect(panel, row.href + " dest-true leftover").toBeVisible();
      await expect(page.locator("[data-itt-lo3x]")).toHaveCount(0);
      await expect(page.locator("[data-official-key]")).toHaveCount(0);
      await expect(page.locator("[data-pop-go]")).toHaveCount(0);

      const save = panel.locator("[data-lo-save]").first();
      await save.click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star)).toBeFalsy();

      await panel.locator("[data-lo-trap]").first().click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star)).toBeFalsy();

      await panel.locator('[data-lo-pick="keep"]').click();
      await panel.locator("[data-lo-req]").nth(0).check();
      await panel.locator("[data-lo-req]").nth(1).check();
      await panel.locator("[data-lo-field]").fill(row.id + " leftover");
      await save.click();
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), row.key)).toBeTruthy();
      const blob = JSON.parse(
        (await page.evaluate((k) => localStorage.getItem(k), row.key)) || "{}"
      );
      expect(blob.leftover).toBe(true);
      expect(blob.official).toBeFalsy();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star)).toBeFalsy();
    });
  });
}
