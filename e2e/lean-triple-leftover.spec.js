// @ts-check
/**
 * Legal 2015–2020 3× leftover dests — 2016 / 2018 leftover dests only.
 * Empty / trap never write. Complete writes leftover. Never star.
 * Not leftover-3× unique. Not leftover-20. 2015 wiped. 2017/2019/2020 dest folders stay.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails, killOverlays } = require("./helpers");
const ROWS = require("./lean-triple-leftover.matrix.json");
const UNIQUE = require("../scripts/leftover-3x-unique.json");

const ROOT = path.join(__dirname, "..");

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

test("2015 wiped · 2017 dest folders stay · 2019 / 2020 are React doors", () => {
  expect(fs.existsSync(path.join(ROOT, "years", "2015"))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, "years", "2017"))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, "react", "src", "year2017.js"))).toBe(true);
  expect(fs.existsSync(path.join(ROOT, "years", "2019"))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, "years", "2020"))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, "react", "src", "year2019.js"))).toBe(true);
  expect(fs.existsSync(path.join(ROOT, "react", "src", "year2020.js"))).toBe(true);
});

test("2016 dest folders 57 · 2018 year tree is gone", () => {
  expect(destFolders(2016).length).toBe(57);
  expect(fs.existsSync(path.join(ROOT, "years", "2018"))).toBe(false);
});

test("2018 leftover-3× unique is gone", () => {
  expect(uniqueIds("2018")).toHaveLength(0);
});

test("triple leftover dests dest-disjoint leftover-3× unique", () => {
  for (const row of ROWS) {
    expect(uniqueIds(row.year).includes(row.id), row.year + " " + row.id).toBe(false);
  }
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
