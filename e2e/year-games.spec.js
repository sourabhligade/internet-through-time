// @ts-check
/**
 * Per-year museum games — page loads + basic interactivity smoke.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame } = require('./helpers');

const YEARS = [];
for (let y = 1994; y <= 2015; y++) YEARS.push(String(y));

for (const year of YEARS) {
  test.describe(`year-game ${year}`, () => {
    test(`game.html loads with data-year-game`, async ({ page }) => {
      await enterYear(page, year);
      await goImmersion(page, year, 'sites/playable/game.html');
      const frame = contentFrame(page);
      await expect(frame.locator('[data-year-game]')).toBeVisible({ timeout: 15000 });
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

  test('2000 Portal Judge incomplete does not write', async ({ page }) => {
    await enterYear(page, '2000');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt00-game-portaljudge') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goImmersion(page, '2000', 'sites/playable/game.html');
    const frame = contentFrame(page);
    await frame.locator('[data-submit]').click({ force: true });
    await page.waitForTimeout(300);
    const v = await page.evaluate(() => localStorage.getItem('itt00-game-portaljudge'));
    expect(v).toBeNull();
  });

  test('2014 Tile Fold board moves', async ({ page }) => {
    await enterYear(page, '2014');
    await goImmersion(page, '2014', 'sites/playable/game.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-tf-board]')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
    await expect(frame.locator('[data-tf-board] div').first()).toBeVisible();
  });

  test('2015 Blob Rush canvas + end saves best', async ({ page }) => {
    await enterYear(page, '2015');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt15-game-blobrush') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goImmersion(page, '2015', 'sites/playable/game.html?fast=1');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-year-game][data-game-id="blobrush"]')).toBeVisible();
    await expect(frame.locator('#game-canvas')).toBeVisible();
    await frame.locator('[data-game-start]').click();
    await page.waitForTimeout(300);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      if (w && w.__ittBlobRushEnd) w.__ittBlobRushEnd(42);
    });
    await page.waitForTimeout(200);
    const raw = await page.evaluate(() => localStorage.getItem('itt15-game-blobrush'));
    expect(raw).toBeTruthy();
    const blob = JSON.parse(raw || '{}');
    expect(blob.best).toBeGreaterThanOrEqual(42);
    expect(blob.gameId || blob.year).toBeTruthy();
  });
});
