// @ts-check
/**
 * Per-year museum games — page loads + basic interactivity smoke.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame } = require('./helpers');

const YEARS = [];
for (let y = 1994; y <= 2018; y++) YEARS.push(String(y));

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


test.describe('year-game signatures 2016–2018', () => {
  test('2016 Gym Rush starts and scores', async ({ page }) => {
    await enterYear(page, '2016');
    await goImmersion(page, '2016', 'sites/playable/game.html?fast=1');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-year-game][data-game-id="gymrush"]')).toBeVisible();
    await frame.locator('[data-game-start]').click();
    await page.waitForTimeout(200);
    const node = frame.locator('[data-game-field] button').first();
    if (await node.count()) await node.click({ force: true });
    await page.waitForTimeout(100);
    await expect(frame.locator('[data-game-score]')).not.toHaveText('0');
  });

  test('2017 Storm Scan multi-step incomplete no full save without start', async ({ page }) => {
    await enterYear(page, '2017');
    await page.evaluate(() => {
      Object.keys(localStorage).filter((k) => k.indexOf('itt17-game-stormscan') === 0).forEach((k) => localStorage.removeItem(k));
    });
    await goImmersion(page, '2017', 'sites/playable/game.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-year-game][data-game-id="stormscan"]')).toBeVisible();
    // click scan without start should not write
    await frame.locator('[data-scan-click]').click({ force: true });
    await page.waitForTimeout(150);
    const v = await page.evaluate(() => localStorage.getItem('itt17-game-stormscan'));
    expect(v).toBeNull();
  });

  test('2018 Consent Dash incomplete does not write; complete writes', async ({ page }) => {
    await enterYear(page, '2018');
    await page.evaluate(() => {
      Object.keys(localStorage).filter((k) => k.indexOf('itt18-game-consentdash') === 0).forEach((k) => localStorage.removeItem(k));
    });
    await goImmersion(page, '2018', 'sites/playable/game.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-year-game][data-game-id="consentdash"]')).toBeVisible();
    await frame.locator('[data-cd-save]').click({ force: true }).catch(() => {});
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt18-game-consentdash'))).toBeNull();
    await frame.locator('[data-cd-manage]').click();
    await frame.locator('[data-cd-analytics]').uncheck();
    await frame.locator('[data-cd-rights]').check();
    await frame.locator('[data-cd-save]').click();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem('itt18-game-consentdash'))).toBeTruthy();
  });
});
