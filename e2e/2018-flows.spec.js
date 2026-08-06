// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2018 flows smoke', () => {
  test('shell · about · GDPR · TikTok · IGTV', async ({ page }) => {
    await page.goto('/years/2018/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2018');

    await page.goto('/years/2018/pages/about.html');
    await expect(page.locator('body')).toContainText('1,630,322,579');

    await page.goto('/years/2018/sites/gdpr/index.html');
    await expect(page.locator('body')).toContainText(/GDPR|consent|May 25/i);

    await page.goto('/years/2018/sites/tiktok/index.html');
    await expect(page.locator('body')).toContainText(/TikTok|Aug(?:ust)?\s*2|Musical/i);

    await page.goto('/years/2018/sites/instagram/igtv.html');
    await expect(page.locator('body')).toContainText(/IGTV|vertical|Jun/i);
  });

  test('map + whats-new', async ({ page }) => {
    await page.goto('/years/2018/pages/map.html');
    await expect(page.locator('body')).toContainText(/2018|flow|map|GDPR|TikTok/i);

    await page.goto('/years/2018/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/2018|GDPR|TikTok|IGTV/i);
  });
});
