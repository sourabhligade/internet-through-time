// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2004 culture', () => {
  test('Gmail about + Firefox features', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/about.html');
    await expect(page.getByText(/April 1|gigabyte|Invite/i).first()).toBeVisible();
    await page.goto('/years/2004/sites/firefox/features.html');
    await expect(page.getByText(/Tabbed|Popup|Features/i).first()).toBeVisible();
  });
  test('Thefacebook campus copy + Flickr about', async ({ page }) => {
    await page.goto('/years/2004/sites/facebook/index.html');
    await expect(page.getByText(/thefacebook|Harvard|college/i).first()).toBeVisible();
    await page.goto('/years/2004/sites/flickr/about.html');
    await expect(page.getByText(/Flickr|photo|tag/i).first()).toBeVisible();
  });
});
