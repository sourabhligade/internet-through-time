// @ts-check
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

test.describe('1994 flow', () => {
  test('home about handbook', async ({ page }) => {
    await page.goto('/years/1994/pages/home.html');
    await expect(page.locator('body')).toBeVisible();
    await page.goto('/years/1994/pages/about.html');
    await expect(page.locator('body')).toBeVisible();
  });
});
