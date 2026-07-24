// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2004 signature', () => {
  test('Gmail sign-in to inbox', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/index.html');
    await expect(page.getByText(/Gmail|gigabyte|Search/i).first()).toBeVisible();
    await page.locator('[data-gmail-login]').evaluate(f => f.requestSubmit());
    await page.waitForURL(/inbox/);
    await expect(page.locator('[data-gmail-list]')).toBeVisible({ timeout: 10000 });
  });

  test('Flickr stream + Thefacebook profile', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/index.html');
    await expect(page.getByText(/flickr|photo/i).first()).toBeVisible();
    await page.goto('/years/2004/sites/facebook/profile.html');
    await expect(page.locator('[data-fb-name]')).toBeVisible({ timeout: 10000 });
  });

  test('Firefox 1.0 room + shell year', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/index.html');
    await expect(page.getByText(/Firefox 1\.0|November 9/i).first()).toBeVisible();
    await page.goto('/years/2004/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2004');
  });
});
