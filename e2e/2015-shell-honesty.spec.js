// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2015 shell honesty', () => {
  test('exit-bar year-label is year-true', async ({ page }) => {
    await enterYear(page, '2015');
    await expect(page.locator('.year-label')).toContainText('2015');
    await expect(page.locator('.year-label')).toContainText(/Windows 10|Chrome|Edge/i);
    await expect(page.locator('.year-label')).not.toContainText('2013 · Windows 7');
  });

  test('Win10 is free upgrade product (not TP-only sole story)', async ({ page }) => {
    await page.goto('/years/2015/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/free upgrade|July 29/i);
    await expect(page.locator('body')).toContainText(/not ended/i);
  });

  test('Edge is EdgeHTML not Chromium', async ({ page }) => {
    await page.goto('/years/2015/sites/edge/index.html');
    await expect(page.locator('body')).toContainText(/EdgeHTML|not Chromium/i);
  });

  test('About bans 2016+ products', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await expect(page.locator('body')).toContainText(/Stories|Reactions|Pokémon GO|Meta/i);
  });
});
