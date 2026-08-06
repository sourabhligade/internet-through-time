// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2017 MVP', () => {
  test('shell boots with year-2017', async ({ page }) => {
    await page.goto('/years/2017/');
    await expect(page.locator('body')).toHaveClass(/year-2017/);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2017');
  });

  test('home thesis + trails', async ({ page }) => {
    await page.goto('/years/2017/pages/home.html');
    await expect(page.locator('body')).toContainText(/Face ID|Fortnite|crypto|WannaCry|280/i);
    await expect(page.locator('a[href*="iphone"]').first()).toBeVisible();
  });

  test('about dual-cite scale + bans', async ({ page }) => {
    await page.goto('/years/2017/pages/about.html');
    await expect(page.locator('body')).toContainText('1,766,926,408');
    await expect(page.locator('body')).toContainText(/Meta|TikTok|Reels/i);
    await expect(page.locator('[data-itt-real-save]')).toBeVisible();
  });

  test('P0 rooms exist', async ({ page }) => {
    for (const path of [
      '/years/2017/sites/iphone/x.html',
      '/years/2017/sites/fortnite/index.html',
      '/years/2017/sites/crypto/index.html',
      '/years/2017/sites/wannacry/index.html',
      '/years/2017/sites/twitter/index.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('shell year-label is 2017 not 2013 clone', async ({ page }) => {
    await enterYear(page, '2017');
    await expect(page.locator('.year-label')).toContainText('2017');
    await expect(page.locator('.year-label')).not.toContainText('2013 · Windows 7');
  });
});
