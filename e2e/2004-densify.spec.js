// @ts-check
/** 2004 densify — Gmail / Thefacebook / Flickr multipage */
const { test, expect } = require('@playwright/test');

test.describe('2004 densify', () => {
  test('Gmail multipage', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/index.html');
    await expect(page.locator('body')).toContainText(/Gmail|invite|1 GB|Google/i);
  });

  test('Thefacebook multipage', async ({ page }) => {
    await page.goto('/years/2004/sites/facebook/index.html');
    await expect(page.locator('body')).toContainText(/facebook|Thefacebook|Harvard/i);
  });

  test('Flickr multipage', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/index.html');
    await expect(page.locator('body')).toContainText(/Flickr|photo/i);
  });

  test('Firefox 1.0 product room', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/index.html');
    await expect(page.locator('body')).toContainText(/Firefox|Mozilla/i);
  });

  test('home chips real paths', async ({ page }) => {
    await page.goto('/years/2004/pages/home.html');
    const links = page.locator('.itt-product-chips a, .itt-start a[href*="sites/"]');
    const n = await links.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < Math.min(n, 10); i++) {
      expect(await links.nth(i).getAttribute('href')).not.toMatch(/^#$/);
    }
  });
});
