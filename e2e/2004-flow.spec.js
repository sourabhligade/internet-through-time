// @ts-check
const { test, expect } = require('@playwright/test');
test.describe('2004 flow', () => {
  test('home + about pages', async ({ page }) => {
    await page.goto('/years/2004/pages/home.html');
    await expect(page.locator('body')).toBeVisible();
    await page.goto('/years/2004/pages/about.html');
    await expect(page.locator('body')).toBeVisible();
  });
  test('error pages exist', async ({ page }) => {
    await page.goto('/years/2004/pages/error/404.html');
    await expect(page.locator('body')).toBeVisible();
  });
});
