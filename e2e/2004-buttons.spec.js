const { test, expect } = require('@playwright/test');

test.describe('2004 museum buttons / multi-page', () => {
  test('thefacebook multi-page nav', async ({ page }) => {
    await page.goto('/years/2004/sites/facebook/index.html');
    await expect(page.locator('a[href="friends.html"]')).toBeVisible();
    await page.click('a[href="friends.html"]');
    await expect(page).toHaveURL(/friends\.html/);
    await page.goto('/years/2004/sites/facebook/networks.html');
    await expect(page.locator('body')).toContainText('Harvard');
    await page.goto('/years/2004/sites/facebook/invite.html');
    await expect(page.locator('[data-fb-invite]')).toBeVisible();
    await page.goto('/years/2004/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText('February 4, 2004');
  });

  test('gmail invite page', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/invite.html');
    await expect(page.locator('[data-gmail-invite]')).toBeVisible();
    await page.fill('[name="email"]', 'pal@example.com');
    await page.click('button[type="submit"]');
    await expect(page.locator('[data-gmail-invite-status]')).toContainText(/Invitation|invite/i);
  });

  test('flickr groups and tags', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/groups.html');
    await expect(page.locator('body')).toContainText('Groups');
    await page.goto('/years/2004/sites/flickr/tags.html');
    await expect(page.locator('body')).toContainText(/folksonomy|Tags/i);
  });

  test('firefox nyt ad page', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/nyt-ad.html');
    await expect(page.locator('body')).toContainText('December 15, 2004');
  });

  test('digg about seed honesty', async ({ page }) => {
    await page.goto('/years/2004/sites/digg/about.html');
    await expect(page.locator('body')).toContainText('December 5, 2004');
    await expect(page.locator('body')).toContainText(/seed|2005/i);
  });

  test('google ipo page', async ({ page }) => {
    await page.goto('/years/2004/sites/google/ipo.html');
    await expect(page.locator('body')).toContainText('August 19, 2004');
  });
});
