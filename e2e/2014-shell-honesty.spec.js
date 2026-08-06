// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2014 shell honesty', () => {
  test('default shell is not Windows 10 retail', async ({ page }) => {
    await page.goto('/years/2014/');
    await expect(page.locator('body')).toHaveClass(/os-win7/);
    await expect(page.locator('body')).not.toHaveClass(/os-win10/);
  });

  test('Win10 page is Technical Preview only', async ({ page }) => {
    await page.goto('/years/2014/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Technical Preview|Insider/i);
    await expect(page.locator('body')).toContainText(/not retail|not.*mass|Win7 residual/i);
  });

  test('Watch is pre-ship', async ({ page }) => {
    await page.goto('/years/2014/sites/apple/watch.html');
    await expect(page.locator('body')).toContainText(/ships 2015|2015/i);
  });

  test('About bans IG Stories and Meta', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText(/Stories/i);
    await expect(page.locator('body')).toContainText(/Meta|TikTok|Reactions/i);
  });
});
