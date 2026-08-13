// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2015 MVP', () => {
  test('shell boots with year-2015', async ({ page }) => {
    await page.goto('/years/2015/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2015');
  });

  test('home thesis + trails', async ({ page }) => {
    await page.goto('/years/2015/pages/home.html');
    await expect(page.locator('body')).toContainText(/2015|Watch|Win10|Periscope|863,105,652/i);
    await expect(page.locator('a[href*="watch"]').first()).toBeVisible();
    await expect(page.locator('a[href*="periscope"]').first()).toBeVisible();
  });

  test('about dual-cite scale + bans', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await expect(page.locator('body')).toContainText('863,105,652');
    await expect(page.locator('body')).toContainText('3,185,996,155');
    await expect(page.locator('body')).toContainText(/−11%|-11%/);
    await expect(page.locator('body')).toContainText(/Stories|Reactions|TikTok/i);
    await expect(page.locator('[data-itt-real-save]')).toBeVisible();
  });

  test('P0 rooms exist', async ({ page }) => {
    for (const path of [
      '/years/2015/sites/apple/watch.html',
      '/years/2015/sites/windows10/index.html',
      '/years/2015/sites/edge/index.html',
      '/years/2015/sites/periscope/index.html',
      '/years/2015/sites/applemusic/index.html',
      '/years/2015/sites/googlephotos/index.html',
      '/years/2015/sites/ios9/blockers.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });
});
