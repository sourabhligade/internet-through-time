// @ts-check
/**
 * 2001–2008 Starting Point + flow map UI robustness
 * XP window chrome · product chips · flow map tree
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

const YEARS = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008'];

for (const year of YEARS) {
  test.describe(`UI robust ${year}`, () => {
    test('Starting Point has XP window + chips + flow map link', async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator('body.itt-start-page, body[data-itt-start]').first()).toBeVisible();
      await expect(page.locator('table.itt-start').first()).toBeVisible();
      await expect(page.locator('.itt-start-title').first()).toContainText(
        new RegExp(`Starting Point|${year}`)
      );
      await expect(page.locator('.itt-product-chips a').first()).toBeVisible();
      await expect(page.locator('a[href="map.html"], a[href*="map.html"]').first()).toBeVisible();
      // at least 3 product chips for wayfinding
      expect(await page.locator('.itt-product-chips a').count()).toBeGreaterThanOrEqual(3);
    });

    test('flow map renders in XP map window', async ({ page }) => {
      await page.goto(`/years/${year}/pages/map.html`);
      await page.waitForSelector('.itt-fmap-branch, .itt-fmap', { timeout: 20000 });
      await expect(page.locator('.itt-map-window').first()).toBeVisible();
      await expect(page.locator('a.itt-fmap-name').first()).toBeVisible();
      await expect(page.locator('.itt-fmap-missing')).toHaveCount(0);
    });

    test('shell loads home with chips visible in iframe', async ({ page }) => {
      await enterYear(page, year);
      await goInFrame(page, 'pages/home.html');
      const frame = contentFrame(page);
      // Prefer DOM chips over immersion boot (CSS @import chains can delay boot flag)
      await expect(frame.locator('.itt-product-chips a').first()).toBeVisible({ timeout: 25000 });
      await expect(frame.locator('a[href="map.html"], a[href*="map.html"]').first()).toBeVisible({
        timeout: 10000,
      });
      await expect(frame.locator('.itt-start-title, table.itt-start').first()).toBeVisible();
    });
  });
}
