// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2005 signature', () => {
  test('YouTube list and watch', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/index.html');
    await expect(page.getByText(/Broadcast Yourself|YouTube/i).first()).toBeVisible();
    await page.locator('[data-yt-list] a').first().click();
    await page.waitForURL(/watch/);
    await expect(page.locator('[data-yt-watch]')).toBeVisible({ timeout: 10000 });
  });

  test('Maps canvas + Reddit boost', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/index.html');
    await expect(page.locator('[data-maps-canvas]')).toBeVisible();
    await page.goto('/years/2005/sites/reddit/index.html');
    await expect(page.locator('[data-reddit-list]')).toBeVisible({ timeout: 10000 });
  });

  test('Digg list + shell year', async ({ page }) => {
    await page.goto('/years/2005/sites/digg/index.html');
    await expect(page.locator('[data-digg-list]')).toBeVisible({ timeout: 10000 });
    await page.goto('/years/2005/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2005');
  });
});
