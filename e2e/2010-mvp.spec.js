// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2010 MVP', () => {
  test('shell boots 2010', async ({ page }) => {
    await enterYear(page, '2010');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2010');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('home lists P0 thesis', async ({ page }) => {
    await page.goto('/years/2010/pages/home.html');
    for (const t of ['iPad', 'Instagram', 'iPhone 4', '206,956,723']) {
      await expect(page.locator('body')).toContainText(t);
    }
  });

  test('about dual scale and bans', async ({ page }) => {
    await page.goto('/years/2010/pages/about.html');
    await expect(page.locator('body')).toContainText('206,956,723');
    await expect(page.locator('body')).toContainText(/Spotify|Snapchat/i);
    await expect(page.locator('body')).toContainText(/iPad|Instagram/i);
  });

  test('App Store install → itt10-apps', async ({ page }) => {
    await page.goto('/years/2010/sites/appstore/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt10-apps');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-appstore-catalog], [data-appstore-install]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/225|5 billion|5B/i);
    const btn = page.locator('[data-appstore-install]').first();
    await btn.click();
    await expect(page.locator('[data-appstore-status]')).toContainText(/Installed|Already|itt10/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt10-apps'));
    expect(raw || '').toMatch(/Koi|Monkey|Convert|Facebook|Shazam|name|Twitter|Pandora/i);
  });

  test('iPhone 4 prices', async ({ page }) => {
    await page.goto('/years/2010/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/iPhone 4|\$199|\$299|FaceTime|Retina/i);
  });

  test('iPad prices', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/index.html');
    await expect(page.locator('body')).toContainText(/\$499|Jan 27|iPad/i);
  });

  test('Instagram share → itt10-ig-posts', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt10-ig-posts');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-ig-share]', { timeout: 20000 });
    await page.locator('[data-ig-filter="Earlybird"]').click();
    await page.locator('[data-ig-caption]').fill('hello 2010');
    await page.locator('[data-ig-share]').click();
    await expect(page.locator('[data-ig-status]')).toContainText(/Shared|itt10|Earlybird/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt10-ig-posts'));
    expect(raw || '').toMatch(/Earlybird|hello 2010/i);
  });

  test('FarmVille plant → itt10-farm', async ({ page }) => {
    await page.goto('/years/2010/sites/farmville/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt10-farm');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-farm-plant]', { timeout: 20000 });
    await page.locator('[data-farm-plant]').first().click();
    const raw = await page.evaluate(() => localStorage.getItem('itt10-farm'));
    expect(raw || '').toMatch(/strawberry|wheat|pumpkin|plots/i);
  });

  test('Facebook Like → itt10-fb-likes', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/feed.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt10-fb-likes');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-fb-like]', { timeout: 20000 });
    await page.locator('[data-fb-like]').first().click();
    const raw = await page.evaluate(() => localStorage.getItem('itt10-fb-likes'));
    expect(raw || '').toMatch(/post|1/);
  });
});
