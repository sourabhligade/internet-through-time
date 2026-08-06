// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2009 MVP', () => {
  test('shell boots 2009', async ({ page }) => {
    await enterYear(page, '2009');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2009');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('home lists P0 thesis', async ({ page }) => {
    await page.goto('/years/2009/pages/home.html');
    for (const t of ['App Store', '3GS', 'FarmVille', 'Bing', '238,027,855']) {
      await expect(page.locator('body')).toContainText(t);
    }
  });

  test('about bans iPad and Spotify US', async ({ page }) => {
    await page.goto('/years/2009/pages/about.html');
    await expect(page.locator('body')).toContainText(/iPad|Spotify/i);
    await expect(page.locator('body')).toContainText(/3GS|FarmVille|238,027,855/i);
  });

  test('App Store install → itt09-apps', async ({ page }) => {
    await page.goto('/years/2009/sites/appstore/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt09-apps');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-appstore-catalog], [data-appstore-install]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/50,?000|billion|1B/i);
    const btn = page.locator('[data-appstore-install]').first();
    await btn.click();
    await expect(page.locator('[data-appstore-status]')).toContainText(/Installed|Already|itt09/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt09-apps'));
    expect(raw || '').toMatch(/Koi|Monkey|Convert|Facebook|Shazam|name|Twitter|Pandora/i);
  });

  test('iPhone 3GS prices and App Store link', async ({ page }) => {
    await page.goto('/years/2009/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText(/3GS|\$199|\$299|App Store/i);
  });

  test('FarmVille plant → itt09-farm', async ({ page }) => {
    await page.goto('/years/2009/sites/farmville/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt09-farm');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-farm-plant]', { timeout: 20000 });
    await page.locator('[data-farm-plant]').first().click();
    await expect(page.locator('[data-farm-status]')).toContainText(/itt09|Plots|Coins/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt09-farm'));
    expect(raw || '').toMatch(/strawberry|wheat|pumpkin|plots/i);
  });

  test('Bing search → itt09-bing', async ({ page }) => {
    await page.goto('/years/2009/sites/bing/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt09-bing');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-bing-search]', { timeout: 20000 });
    await page.locator('[data-bing-search] input[name="q"]').fill('windows 7');
    await page.locator('[data-bing-search]').evaluate((f) => f.requestSubmit());
    await expect(page.locator('[data-bing-status]')).toContainText(/Searched|itt09/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt09-bing'));
    expect(raw || '').toMatch(/windows|searched|true/i);
  });

  test('Facebook Like → itt09-fb-likes', async ({ page }) => {
    await page.goto('/years/2009/sites/facebook/feed.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt09-fb-likes');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-fb-like]', { timeout: 20000 });
    await page.locator('[data-fb-like]').first().click();
    await expect(page.locator('[data-fb-like-status]')).toContainText(/Liked|itt09/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt09-fb-likes'));
    expect(raw || '').toMatch(/post|1/);
  });
});
