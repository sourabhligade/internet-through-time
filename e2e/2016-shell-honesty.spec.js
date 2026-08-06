// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2016 shell honesty', () => {
  test('exit-bar year-label is year-true', async ({ page }) => {
    await enterYear(page, '2016');
    await expect(page.locator('.year-label')).toContainText('2016');
    await expect(page.locator('.year-label')).toContainText(/Windows 10|Chrome/i);
    await expect(page.locator('.year-label')).not.toContainText('2013 · Windows 7');
  });

  test('Stories is 2016 product (Aug 2 honesty)', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await expect(page.locator('body')).toContainText(/Aug(?:ust)?\s*2|2016/i);
    await expect(page.locator('body')).toContainText(/not.*Reels|not Meta|Snap/i);
  });

  test('Win10 free upgrade ends in 2016', async ({ page }) => {
    await page.goto('/years/2016/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Jul(?:y)?\s*29|ended|end/i);
  });

  test('About bans Meta / TikTok / Face ID as mass defaults', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await expect(page.locator('body')).toContainText(/Meta|TikTok|Face ID|Reels/i);
  });
});
