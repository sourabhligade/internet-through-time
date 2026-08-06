// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

const SAMPLE = ['1994', '1995', '1998', '2005', '2008', '2013', '2014'];

for (const year of SAMPLE) {
  test.describe(`flow map ${year}`, () => {
    test('map page renders tree with branches and site links', async ({ page }) => {
      await page.goto(`/years/${year}/pages/map.html`);
      await page.waitForSelector('[data-itt-flow-map] .itt-fmap, [data-itt-flow-map] .itt-fmap-branch', {
        timeout: 20000,
      });
      const body = page.locator('body');
      await expect(body).toContainText(/UX flow map|flow map/i);
      await expect(body).toContainText(/How the experience works|Trails/i);
      await expect(page.locator('.itt-fmap-branch').first()).toBeVisible();
      await expect(page.locator('a.itt-fmap-name').first()).toBeVisible();
      // no missing-data banner
      await expect(page.locator('.itt-fmap-missing')).toHaveCount(0);
    });

    test('home links to flow map', async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator('a[href="map.html"], a[href*="map.html"]').first()).toBeVisible({
        timeout: 10000,
      });
    });

    test('shell can open map via goInFrame', async ({ page }) => {
      await enterYear(page, year);
      await goInFrame(page, 'pages/map.html');
      await waitForImmersion(page, year);
      const frame = contentFrame(page);
      await expect(frame.locator('.itt-fmap').first()).toContainText(/flow map|Shell|Trails/i, {
        timeout: 15000,
      });
    });
  });
}
