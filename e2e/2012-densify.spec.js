// @ts-check
const { test, expect } = require('@playwright/test');


test.describe('2012 leftover densify copy', () => {
  test('About scale + bans', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await expect(page.locator('body')).toContainText('697,089,489');
    await expect(page.locator('body')).toContainText('Chrome');
    await expect(page.locator('body')).toContainText('Vine');
  });
  test('Android star honesty', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await expect(page.locator('body')).toContainText('3 Apr');
    await expect(page.locator('body')).toContainText('$1B');
    await expect(page.locator('body')).toContainText(/Stories/i);
  });
  test('IPO $38 + Nasdaq', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await expect(page.locator('body')).toContainText('$38');
    await expect(page.locator('body')).toContainText(/Nasdaq/i);
  });
  test('SOPA 18 Jan', async ({ page }) => {
    await page.goto('/years/2012/sites/wikipedia/sopa.html');
    await expect(page.locator('body')).toContainText('18 January');
    await expect(page.locator('body')).toContainText('SOPA');
  });
  test('Maps flop', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/maps.html');
    await expect(page.locator('body')).toContainText(/transit/i);
    await expect(page.locator('body')).toContainText(/bridge/i);
  });
});
