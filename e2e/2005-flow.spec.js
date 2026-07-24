// @ts-check
const { test, expect } = require('@playwright/test');
test.describe('2005 flow', () => {
  test('home + about pages', async ({ page }) => {
    await page.goto('/years/2005/pages/home.html');
    await expect(page.locator('body')).toBeVisible();
    await page.goto('/years/2005/pages/about.html');
    await expect(page.locator('body')).toBeVisible();
  });
  test('error pages exist', async ({ page }) => {
    await page.goto('/years/2005/pages/error/404.html');
    await expect(page.locator('body')).toBeVisible();
  });
});
