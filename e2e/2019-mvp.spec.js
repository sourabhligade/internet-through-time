// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2019 MVP', () => {
  test('shell boots with year-2019', async ({ page }) => {
    await page.goto('/years/2019/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2019');
  });

  test('home thesis + trails', async ({ page }) => {
    await page.goto('/years/2019/pages/home.html');
    await expect(page.locator('body')).toContainText(/2019|TikTok|Disney\+|Arcade|1,630,322,579|4\.1B/i);
    await expect(page.locator('a[href*="tiktok"]').first()).toBeVisible();
    await expect(page.locator('a[href*="disneyplus"]').first()).toBeVisible();
  });

  test('about dual-cite scale + bans', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await expect(page.locator('body')).toContainText('1,630,322,579');
    await expect(page.locator('body')).toContainText(/4\.1B|4\.1/);
    await expect(page.locator('body')).toContainText(/COVID|2020/i);
    await expect(page.locator('[data-itt-real-save]')).toBeVisible();
  });

  test('P0 rooms exist', async ({ page }) => {
    for (const path of [
      '/years/2019/sites/tiktok/index.html',
      '/years/2019/sites/disneyplus/index.html',
      '/years/2019/sites/arcade/index.html',
      '/years/2019/sites/appletv/index.html',
      '/years/2019/sites/iphone/iphone11.html',
      '/years/2019/sites/airpodspro/index.html',
      '/years/2019/sites/stadia/index.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('home trail cards T1–T6 hrefs', async ({ page }) => {
    await page.goto('/years/2019/pages/home.html');
    for (const href of [
      'tiktok',
      'disneyplus',
      'arcade',
      'iphone11',
      'stadia',
      'appletv',
    ]) {
      await expect(page.locator(`a[href*="${href}"]`).first()).toBeVisible();
    }
  });

  test('whats-new calendar loads', async ({ page }) => {
    const res = await page.goto('/years/2019/pages/whats-new.html');
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Nov 12|Sep 19|Nov 19|Nov 1|TikTok/i);
  });
});
