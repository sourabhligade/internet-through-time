// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2016 MVP', () => {
  test('shell boots with year-2016', async ({ page }) => {
    await page.goto('/years/2016/');
    await expect(page.locator('body')).toHaveClass(/year-2016/);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2016');
  });

  test('home thesis + guided trails', async ({ page }) => {
    await page.goto('/years/2016/pages/home.html');
    await expect(page.locator('body')).toContainText(/Stories|Pokémon GO|Reactions|Vine/i);
    await expect(page.locator('body')).toContainText('1,045,534,808');
    await expect(page.locator('a[href*="stories"]').first()).toBeVisible();
    await expect(page.locator('a[href*="pokemongo"]').first()).toBeVisible();
    await expect(page.locator('a[href*="reactions"]').first()).toBeVisible();
  });

  test('about dual-cite scale + bans', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await expect(page.locator('body')).toContainText('1,045,534,808');
    await expect(page.locator('body')).toContainText(/Meta|TikTok|Reels|Face ID/i);
    await expect(page.locator('[data-itt-real-save]')).toBeVisible();
  });

  test('P0 rooms exist', async ({ page }) => {
    for (const path of [
      '/years/2016/sites/instagram/stories.html',
      '/years/2016/sites/pokemongo/index.html',
      '/years/2016/sites/facebook/reactions.html',
      '/years/2016/sites/iphone/jack.html',
      '/years/2016/sites/airpods/index.html',
      '/years/2016/sites/vine/goodbye.html',
      '/years/2016/sites/whatsapp/security.html',
      '/years/2016/sites/windows10/index.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('shell year-label is 2016 not 2013 clone', async ({ page }) => {
    await enterYear(page, '2016');
    await expect(page.locator('.year-label')).toContainText('2016');
    await expect(page.locator('.year-label')).not.toContainText('2013 · Windows 7');
  });
});
