// @ts-check
const { test, expect } = require('@playwright/test');
test.describe('2001 flow', () => {
  test('home + about pages', async ({ page }) => {
    await page.goto('/years/2001/pages/home.html');
    await expect(page.locator('body')).toBeVisible();
    await page.goto('/years/2001/pages/about.html');
    await expect(page.locator('body')).toBeVisible();
  });
  test('error pages exist', async ({ page }) => {
    await page.goto('/years/2001/pages/error/404.html');
    await expect(page.locator('body')).toBeVisible();
  });
});
