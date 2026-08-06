// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2018 MVP', () => {
  test('shell boots with year-2018', async ({ page }) => {
    await page.goto('/years/2018/');
    await expect(page.locator('body')).toHaveClass(/year-2018/);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2018');
  });

  test('home thesis + trails', async ({ page }) => {
    await page.goto('/years/2018/pages/home.html');
    await expect(page.locator('body')).toContainText(/GDPR|TikTok|IGTV|1,630,322,579/i);
    await expect(page.locator('a[href*="gdpr"]').first()).toBeVisible();
    await expect(page.locator('a[href*="tiktok"]').first()).toBeVisible();
  });

  test('about dual-cite scale + bans', async ({ page }) => {
    await page.goto('/years/2018/pages/about.html');
    await expect(page.locator('body')).toContainText('1,630,322,579');
    await expect(page.locator('body')).toContainText(/−8%|-8%/);
    await expect(page.locator('body')).toContainText(/Meta|Reels|COVID|ChatGPT/i);
  });

  test('P0 rooms exist', async ({ page }) => {
    for (const path of [
      '/years/2018/sites/gdpr/index.html',
      '/years/2018/sites/tiktok/index.html',
      '/years/2018/sites/instagram/igtv.html',
      '/years/2018/sites/windows10/index.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('shell year-label is 2018 not 2013 clone', async ({ page }) => {
    await enterYear(page, '2018');
    await expect(page.locator('.year-label')).toContainText('2018');
    await expect(page.locator('.year-label')).not.toContainText('2013 · Windows 7');
  });
});
