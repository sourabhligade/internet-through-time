// @ts-check
/**
 * Unique leftover-4× dests — 2012 fourth strip only.
 * One dest / one key / dest-true. Empty never writes. Never star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const ROWS = require("./leftover-4x-unique.matrix.json");

function goSel(row) {
  return `[data-itt-lo3x] [data-pop-go][data-pop-key='pop4-${row.id}']`;
}

test("unique leftover-4× dests are a set — no dest twice", () => {
  const ids = ROWS.map((r) => r.id);
  expect(new Set(ids).size, "unique dests").toBe(ids.length);
});

test("2012 leftover-4× unique is chrome · twitter · soundcloud", () => {
  expect(ROWS.filter((r) => r.year === "2012").map((r) => r.id)).toEqual([
    "chrome",
    "twitter",
    "soundcloud",
  ]);
});

for (const row of ROWS) {
  test.describe(`${row.year} leftover-4× unique ${row.id}`, () => {
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
      await expect(go, row.href + " leftover-4× go").toBeVisible();
      const panel = go.locator("xpath=ancestor::*[@data-itt-lo3x][1]");
      await expect(panel, row.href + " dest-true leftover-4×").toBeVisible();
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
