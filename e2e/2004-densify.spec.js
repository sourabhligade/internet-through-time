// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2004 densify', () => {
  test('Gmail about + compose path', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/about.html');
    await expect(page.getByText(/April 1, 2004|gigabyte|Invite/i).first()).toBeVisible();
    await page.goto('/years/2004/sites/gmail/index.html');
    await page.locator('[data-gmail-login]').evaluate(f => f.requestSubmit());
    await page.waitForURL(/inbox/);
    await page.goto('/years/2004/sites/gmail/compose.html');
    await expect(page.locator('[data-gmail-compose]')).toBeVisible();
  });

  test('Firefox multi-page', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/index.html');
    await expect(page.getByText(/Firefox 1\.0|November 9/i).first()).toBeVisible();
    await page.goto('/years/2004/sites/firefox/features.html');
    await expect(page.getByText(/Tabbed browsing|Popup/i).first()).toBeVisible();
    await page.goto('/years/2004/sites/firefox/download.html');
    await expect(page.getByText(/Download Firefox/i).first()).toBeVisible();
  });

  test('Flickr explore + Thefacebook friends', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/explore.html');
    await expect(page.getByText(/flickr|Explore|tag/i).first()).toBeVisible();
    await page.goto('/years/2004/sites/facebook/friends.html');
    await expect(page.locator('[data-fb-friends]')).toBeVisible({ timeout: 10000 });
  });
});
