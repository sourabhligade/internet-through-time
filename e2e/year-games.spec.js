// @ts-check
/**
 * Per-year museum games — page loads + basic interactivity smoke.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame } = require('./helpers');

const YEARS = [];
for (let y = 1994; y <= 2009; y++) YEARS.push(String(y));

for (const year of YEARS) {
  test.describe(`year-game ${year}`, () => {
    test(`game.html loads with data-year-game`, async ({ page }) => {
      await enterYear(page, year);
      await goImmersion(page, year, 'sites/playable/game.html');
      const frame = contentFrame(page);
      await expect(frame.locator('[data-year-game]')).toBeVisible({ timeout: 15000 });
      await expect(frame.locator(`[data-year-game][data-year="${year}"]`)).toBeVisible();
      await expect(frame.locator('body')).toContainText(new RegExp(year));
    });
  });
}

test.describe('year-game signatures', () => {
  test('1994 Hotlist Surfer start + score path', async ({ page }) => {
    await enterYear(page, '1994');
    await goImmersion(page, '1994', 'sites/playable/game.html?fast=1');
    const frame = contentFrame(page);
    await frame.locator('[data-game-start]').click();
    await page.waitForTimeout(800);
    // force click first row if present
    const row = frame.locator('[data-game-field] [data-row-id]').first();
    if (await row.count()) await row.click({ force: true });
    await page.waitForTimeout(500);
    const score = await frame.locator('[data-game-score]').textContent();
    expect(score).toBeTruthy();
  });

  test('2000 Lot Life incomplete party does not write', async ({ page }) => {
    await enterYear(page, '2000');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt00-game-lotlife') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goImmersion(page, '2000', 'sites/playable/game.html');
    const frame = contentFrame(page);
    await frame.locator('[data-lot-party]').click({ force: true });
    await page.waitForTimeout(300);
    const v = await page.evaluate(() => localStorage.getItem('itt00-game-lotlife'));
    expect(v).toBeNull();
  });

});
