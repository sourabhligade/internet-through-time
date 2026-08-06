// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2005 buttons', () => {
  test('dirbar youtube digg', async ({ page }) => {
    await enterYear(page, '2005');
    await page.locator('.dir-btn', { hasText: 'YouTube' }).click();
    await page.waitForTimeout(900);
    const path = await page.evaluate(() => document.getElementById('content').contentWindow.location.pathname);
    expect(path).toMatch(/youtube/);
  });

  test('dirbar maps', async ({ page }) => {
    await enterYear(page, '2005');
    await page.locator('.dir-btn', { hasText: 'Maps' }).click();
    await page.waitForTimeout(900);
    const path = await page.evaluate(() => document.getElementById('content').contentWindow.location.pathname);
    expect(path).toMatch(/maps/);
  });
});
