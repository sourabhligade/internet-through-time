// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2003 densify rooms', () => {
  test('MySpace Top 8 + comments', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/index.html');
    await page.waitForTimeout(900);
    await expect(page.locator('[data-ms-top8]')).toContainText(/Tom|jen_x/i, { timeout: 10000 });
    await expect(page.locator('[data-ms-comments]')).toContainText(/Welcome|comment|Tom/i);
  });

  test('iTunes genre store + buy', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await page.waitForTimeout(900);
    await expect(page.locator('[data-itunes-store]')).toContainText(/Hey Ya|Buy Song/i, { timeout: 10000 });
    await page.locator('[data-itunes-buy]').first().click();
    await expect(page.locator('[data-itunes-library]')).toContainText(/Hey Ya|OutKast|song/i, { timeout: 5000 });
  });

  test('WordPress dashboard posts', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/dashboard.html');
    await page.waitForTimeout(900);
    await expect(page.locator('[data-wp-posts]')).toContainText(/Hello world|Code is Poetry/i, { timeout: 10000 });
    await expect(page.locator('[data-wp-dash]')).toContainText(/post/i);
  });

  test('LinkedIn connections + PYMK', async ({ page }) => {
    await page.goto('/years/2003/sites/linkedin/index.html');
    await page.waitForTimeout(900);
    await expect(page.locator('[data-li-list]')).toContainText(/Recruiter|Engineer/i, { timeout: 10000 });
    await expect(page.locator('[data-li-pymk]')).toContainText(/Designer|Analyst|Dev/i);
  });

  test('AdSense secondary room', async ({ page }) => {
    await page.goto('/years/2003/sites/adsense/index.html');
    await expect(page.getByText(/AdSense|Monetize|content/i).first()).toBeVisible();
  });

  test('home mood board', async ({ page }) => {
    await page.goto('/years/2003/pages/home.html');
    await expect(page.getByText(/Mood board/i)).toBeVisible();
    await expect(page.getByText(/AdSense/i).first()).toBeVisible();
  });
});
