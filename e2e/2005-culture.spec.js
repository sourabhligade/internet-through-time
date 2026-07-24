// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2005 culture', () => {
  test('YouTube about + Maps Ajax', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/about.html');
    await expect(page.getByText(/Broadcast Yourself|2005|zoo/i).first()).toBeVisible();
    await page.goto('/years/2005/sites/maps/about.html');
    await expect(page.getByText(/Ajax|Maps|2005/i).first()).toBeVisible();
  });
  test('TechCrunch + Digg submit', async ({ page }) => {
    await page.goto('/years/2005/sites/techcrunch/index.html');
    await expect(page.getByText(/TechCrunch|Web 2\.0/i).first()).toBeVisible();
    await page.goto('/years/2005/sites/digg/submit.html');
    await expect(page.locator('[data-digg-submit]')).toBeVisible();
  });
});
