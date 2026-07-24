// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2002 densify rooms', () => {
  test('Daypop Top 40', async ({ page }) => {
    await page.goto('/years/2002/sites/daypop/top40.html');
    await expect(page.getByText(/Top 40|blogosphere|Daypop/i).first()).toBeVisible();
  });
  test('Technorati Cosmos', async ({ page }) => {
    await page.goto('/years/2002/sites/technorati/index.html');
    await expect(page.getByText(/Cosmos|linking/i).first()).toBeVisible();
  });
  test('Google News beta', async ({ page }) => {
    await page.goto('/years/2002/sites/googlenews/index.html');
    await expect(page.getByText(/Google News|beta|Top Stories/i).first()).toBeVisible();
  });
  test('Friendster densified profile', async ({ page }) => {
    await page.goto('/years/2002/sites/friendster/index.html');
    await page.waitForTimeout(500);
    await expect(page.locator('img[src*="avatar"]')).toBeVisible();
    await expect(page.locator('[data-friendster-profile]')).toBeVisible();
  });
});
