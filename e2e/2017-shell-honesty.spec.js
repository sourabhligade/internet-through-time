// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2017 shell honesty', () => {
  test('exit-bar year-label is year-true', async ({ page }) => {
    await enterYear(page, '2017');
    await expect(page.locator('.year-label')).toContainText('2017');
    await expect(page.locator('.year-label')).toContainText(/Face ID|Windows 10|Chrome/i);
    await expect(page.locator('.year-label')).not.toContainText('2013 · Windows 7');
  });

  test('About bans Meta / TikTok mass', async ({ page }) => {
    await page.goto('/years/2017/pages/about.html');
    await expect(page.locator('body')).toContainText(/Meta|TikTok|Reels/i);
  });

  test('WannaCry is 2017 date-true', async ({ page }) => {
    await page.goto('/years/2017/sites/wannacry/index.html');
    await expect(page.locator('body')).toContainText(/2017|May/i);
  });
});
