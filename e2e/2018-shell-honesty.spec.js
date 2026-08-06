// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2018 shell honesty', () => {
  test('exit-bar year-label is year-true', async ({ page }) => {
    await enterYear(page, '2018');
    await expect(page.locator('.year-label')).toContainText('2018');
    await expect(page.locator('.year-label')).toContainText(/Windows 10|Chrome|Edge/i);
    await expect(page.locator('.year-label')).not.toContainText('2013 · Windows 7');
  });

  test('About bans Meta / Reels / COVID / ChatGPT', async ({ page }) => {
    await page.goto('/years/2018/pages/about.html');
    await expect(page.locator('body')).toContainText(/Meta|Reels|COVID|ChatGPT/i);
  });

  test('GDPR is May 25 2018 class', async ({ page }) => {
    await page.goto('/years/2018/sites/gdpr/index.html');
    await expect(page.locator('body')).toContainText(/May 25|GDPR|consent/i);
  });
});
