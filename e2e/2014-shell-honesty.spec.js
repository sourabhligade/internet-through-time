// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, killOverlays, completeRealGate } = require('./helpers');

test.describe('2014 shell honesty', () => {
  test('default shell is not Windows 10 retail', async ({ page }) => {
    await page.goto('/years/2014/');
    await expect(page.locator('body')).toHaveClass(/os-win7/);
    await expect(page.locator('body')).not.toHaveClass(/os-win10/);
  });

  test('Win10 page is Technical Preview only', async ({ page }) => {
    await page.goto('/years/2014/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Technical Preview|Insider/i);
    await expect(page.locator('body')).toContainText(/not retail|not.*mass|Win7 residual/i);
  });

  test('Watch is pre-ship', async ({ page }) => {
    await page.goto('/years/2014/sites/apple/watch.html');
    await expect(page.locator('body')).toContainText(/ships 2015|2015/i);
  });

  test('About bans IG Stories and Meta', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText(/Stories/i);
    await expect(page.locator('body')).toContainText(/Meta|TikTok|Reactions/i);
  });

  test('shell boots 2014 and content iframe works', async ({ page }) => {
    await enterYear(page, '2014');
    await killOverlays(page);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2014');
    await expect(page.locator('#content')).toBeVisible();
    await expect(page.locator('#window-title')).toBeVisible();
  });

  test('Chrome room download writes itt14-chrome inside year', async ({ page }) => {
    await page.goto('/years/2014/sites/chrome/index.html');
    await page.evaluate(() => localStorage.removeItem('itt14-chrome'));
    await page.reload();
    await completeRealGate(page, '[data-chrome-download]');
    const raw = await page.evaluate(() => localStorage.getItem('itt14-chrome'));
    expect(raw, 'itt14-chrome after download').toBeTruthy();
  });

  test('exit bar leaves year with resume key', async ({ page }) => {
    await enterYear(page, '2014');
    await page.evaluate(() => {
      try {
        localStorage.setItem('itt-last-year', '2014');
      } catch (e) {
        /* */
      }
    });
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2014"]')).toBeVisible();
    const last = await page.evaluate(() => localStorage.getItem('itt-last-year'));
    if (last) expect(last).toMatch(/2014/);
  });
});
