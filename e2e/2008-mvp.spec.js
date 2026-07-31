// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2008 MVP', () => {
  test('shell boots 2008', async ({ page }) => {
    await enterYear(page, '2008');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2008');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('home lists P0 thesis', async ({ page }) => {
    await page.goto('/years/2008/pages/home.html');
    for (const t of ['App Store', 'Chrome', 'Android', 'Hulu', '172,338,726']) {
      await expect(page.locator('body')).toContainText(t);
    }
  });

  test('about bans 3GS and Spotify US', async ({ page }) => {
    await page.goto('/years/2008/pages/about.html');
    await expect(page.locator('body')).toContainText(/3GS|Spotify/i);
    await expect(page.locator('body')).toContainText(/App Store|Chrome|172,338,726/i);
  });

  test('App Store install → itt08-apps', async ({ page }) => {
    await page.goto('/years/2008/sites/appstore/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt08-apps');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-appstore-catalog], [data-appstore-install]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/500|552/i);
    const btn = page.locator('[data-appstore-install]').first();
    await btn.click();
    await expect(page.locator('[data-appstore-status]')).toContainText(/Installed|Already|itt08/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-apps'));
    expect(raw || '').toMatch(/Koi|Monkey|Convert|Facebook|Shazam|name/i);
  });

  test('iPhone 3G prices and App Store link', async ({ page }) => {
    await page.goto('/years/2008/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText(/3G|\$199|\$299|App Store/i);
  });

  test('Chrome download theater → itt08-chrome', async ({ page }) => {
    await page.goto('/years/2008/sites/chrome/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt08-chrome');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-chrome-download]', { timeout: 20000 });
    await page.locator('[data-chrome-download]').click();
    await expect(page.locator('[data-chrome-status]')).toContainText(/Download|itt08|Windows/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-chrome'));
    expect(raw || '').toContain('downloaded');
  });

  test('Android G1 first-phone honesty', async ({ page }) => {
    await page.goto('/years/2008/sites/android/index.html');
    await expect(page.locator('body')).toContainText(/G1|first|T-Mobile|Oct/i);
  });

  test('Hulu play → itt08-hulu', async ({ page }) => {
    await page.goto('/years/2008/sites/hulu/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt08-hulu');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-hulu-play]', { timeout: 20000 });
    await page.locator('[data-hulu-play]').first().click();
    await expect(page.locator('[data-hulu-status]')).toContainText(/Watching|itt08|Office|theater/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-hulu'));
    expect(raw || '').toMatch(/Office|30 Rock|SNL|title/i);
  });
});
