// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2015 MVP', () => {
  test('shell boots with year-2015', async ({ page }) => {
    await page.goto('/years/2015/');
    await expect(page.locator('body')).toHaveClass(/year-2015/);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2015');
  });

  test('home thesis + guided trails', async ({ page }) => {
    await page.goto('/years/2015/pages/home.html');
    await expect(page.locator('body')).toContainText(/2015|Watch|Windows 10|Periscope|Apple Music/i);
    await expect(page.locator('body')).toContainText('863,105,652');
    await expect(page.locator('a[href*="watch"]').first()).toBeVisible();
    await expect(page.locator('a[href*="windows10"]').first()).toBeVisible();
    await expect(page.locator('a[href*="periscope"]').first()).toBeVisible();
  });

  test('about dual-cite scale + bans', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await expect(page.locator('body')).toContainText('863,105,652');
    await expect(page.locator('body')).toContainText('3,185,996,155');
    await expect(page.locator('body')).toContainText(/Stories|Reactions|Meta|Pokémon GO|TikTok/i);
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

  test('shell year-label is 2015 not 2013 clone', async ({ page }) => {
    await enterYear(page, '2015');
    await expect(page.locator('.year-label')).toContainText('2015');
    await expect(page.locator('.year-label')).not.toContainText('2013 · Windows 7');
  });
});
