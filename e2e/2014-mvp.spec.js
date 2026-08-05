// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2014 MVP', () => {
  test('shell boots with year-2014', async ({ page }) => {
    await page.goto('/years/2014/');
    await expect(page.locator('body')).toHaveClass(/year-2014/);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2014');
  });

  test('home thesis + trails', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    await expect(page.locator('body')).toContainText(/2014|WhatsApp|Heartbleed|iPhone 6/i);
    await expect(page.locator('a[href*="whatsapp"]').first()).toBeVisible();
    await expect(page.locator('a[href*="heartbleed"]').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/968,882,453|1B|1 billion/i);
  });

  test('about dual-cite scale + bans', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText('968,882,453');
    await expect(page.locator('body')).toContainText('2,925,249,355');
    await expect(page.locator('body')).toContainText(/1 billion|Sep 2014/i);
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Reactions|Meta/i);
    await expect(page.locator('[data-itt-real-save]')).toBeVisible();
  });

  test('P0 rooms exist', async ({ page }) => {
    for (const path of [
      '/years/2014/sites/whatsapp/index.html',
      '/years/2014/sites/heartbleed/index.html',
      '/years/2014/sites/iphone/index.html',
      '/years/2014/sites/icebucket/index.html',
      '/years/2014/sites/billion/index.html',
      '/years/2014/sites/windows10/index.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
      await expect(page.locator('body')).toContainText(/2014|WhatsApp|Heartbleed|iPhone|Ice|billion|Windows 10/i);
    }
  });
});
