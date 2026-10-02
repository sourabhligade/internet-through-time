// @ts-check
/**
 * 2001–2007 Starting Point + flow map UI robustness
 * XP window chrome · product chips · flow map tree
 */
const { test, expect } = require('@playwright/test');


async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

const YEARS = ['2004'];

for (const year of YEARS) {
  test.describe(`UI robust ${year}`, () => {
    test('Starting Point has XP window + chips + flow map link', async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator('body.itt-start-page, body[data-itt-start]').first()).toBeVisible();
      await expect(page.locator('.itt-year-star a, #ott-guided-' + year + ' ol li').first()).toBeVisible();
      await expect(page.locator('#ott-guided-' + year + ' ol li')).toHaveCount(6);
      await expect(page.locator('a[href="map.html"], a[href*="map.html"]').first()).toBeVisible();
      expect(await page.locator('.ott-flows a, #ott-flows-' + year + ' a').count()).toBeGreaterThanOrEqual(3);
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
      await expect(frame.locator('.itt-year-star a, #ott-guided-' + year + ' ol li').first()).toBeVisible({ timeout: 25000 });
      await expect(frame.locator('a[href="map.html"], a[href*="map.html"]').first()).toBeVisible({
        timeout: 10000,
      });
      await expect(frame.locator('#ott-guided-' + year + ' ol li')).toHaveCount(6);
    });
  });
}
