// @ts-check
/** 2003 densify — P0 multipage presence + Starting Point honesty */
const { test, expect } = require('@playwright/test');

test.describe('2003 densify', () => {
  test('MySpace multipage', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/index.html');
    await expect(page.locator('body')).toContainText(/MySpace/i);
  });

  test('iTunes Store multipage', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await expect(page.locator('body')).toContainText(/iTunes|Store|Music/i);
  });

  test('WordPress densify room', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/index.html');
    await expect(page.locator('body')).toContainText(/WordPress|blog/i);
  });

  test('LinkedIn seed room', async ({ page }) => {
    await page.goto('/years/2003/sites/linkedin/index.html');
    await expect(page.locator('body')).toContainText(/LinkedIn/i);
  });

  test('home chips not hash-only', async ({ page }) => {
    await page.goto('/years/2003/pages/home.html');
    const links = page.locator('.itt-product-chips a, .itt-start a[href*="sites/"]');
    const n = await links.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(n, 10); i++) {
      const h = await links.nth(i).getAttribute('href');
      expect(h).not.toMatch(/^#$/);
    }
  });
});
