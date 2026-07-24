// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2003 signature', () => {
  test('shell is 2003 IE6', async ({ page }) => {
    await page.goto('/years/2003/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2003');
    await expect(page.locator('.year-label')).toContainText('2003');
  });

  test('hub unlocks 2003', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card[data-year="2003"]')).toBeVisible();
  });

  test('MySpace profile theater', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/index.html');
    await page.waitForTimeout(800);
    await expect(page.locator('[data-myspace-profile]').first()).toBeVisible();
    await expect(page.locator('[data-ms-name]').first()).toContainText(/Tom|Friend|./i, { timeout: 10000 });
  });

  test('iTunes store theater', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await page.waitForTimeout(800);
    await expect(page.locator('[data-itunes-store]')).toContainText(/Hey Ya|Buy Song|0\.99/i, { timeout: 10000 });
  });

  test('WordPress posts theater', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/index.html');
    await page.waitForTimeout(800);
    await expect(page.locator('[data-wp-posts]')).toContainText(/Hello world|Welcome to WordPress/i, { timeout: 10000 });
  });

  test('LinkedIn connections theater', async ({ page }) => {
    await page.goto('/years/2003/sites/linkedin/index.html');
    await page.waitForTimeout(800);
    await expect(page.locator('[data-li-list]')).toContainText(/Recruiter|Engineer|Jane|Sam/i, { timeout: 10000 });
  });
});
