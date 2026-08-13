// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, killOverlays } = require('./helpers');

test.describe('2019 shell honesty', () => {
  test('shell boots 2019', async ({ page }) => {
    await page.goto('/years/2019/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2019');
  });

  test('connect overlay is 2019 thesis', async ({ page }) => {
    await page.goto('/years/2019/');
    const text = await page.locator('#connect-overlay').innerText();
    expect(text).toMatch(/TikTok|Disney\+|Arcade|Stadia|AirPods Pro|iPhone 11/i);
    expect(text).not.toMatch(/Pokémon GO|Stories war|musical\.ly is the product/i);
  });

  test('Disney+ Nov 12 launch', async ({ page }) => {
    await page.goto('/years/2019/sites/disneyplus/index.html');
    await expect(page.locator('body')).toContainText(/Nov(ember)?\s*12|2019/i);
  });

  test('TikTok allowed as 2019 product', async ({ page }) => {
    await page.goto('/years/2019/sites/tiktok/index.html');
    await expect(page.locator('body')).toContainText(/For You|2019|TikTok/i);
    await expect(page.locator('[data-tt-post]')).toBeVisible();
  });

  test('Arcade Sep 19', async ({ page }) => {
    await page.goto('/years/2019/sites/arcade/index.html');
    await expect(page.locator('body')).toContainText(/Sep(tember)?\s*19|2019|Arcade/i);
  });

  test('About bans COVID mass defaults', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await expect(page.locator('body')).toContainText(/COVID|2020/i);
  });

  test('Stadia Nov 19 not invent later shutdown as day-one', async ({ page }) => {
    await page.goto('/years/2019/sites/stadia/index.html');
    await expect(page.locator('body')).toContainText(/Nov(ember)?\s*19|2019/i);
    await expect(page.locator('body')).toContainText(/not invent later shutdown|Founder/i);
  });

  test('shell content iframe works', async ({ page }) => {
    await enterYear(page, '2019');
    await killOverlays(page);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2019');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('hub has 2019 card', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2019"]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/2019|1,630,322,579|4\.1B/i);
  });

  test('AirPods Pro not invent later Max as day-one', async ({ page }) => {
    await page.goto('/years/2019/sites/airpodspro/index.html');
    await expect(page.locator('body')).toContainText(/ANC|Oct|Pro/i);
    await expect(page.locator('body')).toContainText(/not invent later Max|force sensor/i);
  });

  test('Apple TV+ Nov 1 literacy present', async ({ page }) => {
    await page.goto('/years/2019/sites/appletv/index.html');
    await expect(page.locator('body')).toContainText(/Nov(ember)?\s*1|2019|original/i);
    await expect(page.locator('[data-tv-start]')).toBeVisible();
  });

  test('iPhone 11 dual camera honesty', async ({ page }) => {
    await page.goto('/years/2019/sites/iphone/iphone11.html');
    await expect(page.locator('body')).toContainText(/dual camera|iPhone 11|Face ID/i);
    await expect(page.locator('[data-itt-real-save][data-storage-key="iphone11"]')).toBeVisible();
  });

  test('scale honesty websites table ends 2018', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await expect(page.locator('body')).toContainText('1,630,322,579');
    await expect(page.locator('body')).toContainText(/2018|not dual-cited|honest/i);
  });
});

  test('dirbar points at 2019 P0 not Vine/iOS7 primary', async ({ page }) => {
    await page.goto('/years/2019/');
    await expect(page.locator('.dir-btn[data-go*="tiktok"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go*="disneyplus"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go*="stadia"]')).toBeVisible();
  });
