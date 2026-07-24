// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2005 densify', () => {
  test('YouTube upload + about framing', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/about.html');
    await expect(page.getByText(/Broadcast Yourself|Apr 23|2006/i).first()).toBeVisible();
    await page.goto('/years/2005/sites/youtube/upload.html');
    await expect(page.locator('[data-yt-upload]')).toBeVisible();
    await page.goto('/years/2005/sites/youtube/channels.html');
    await expect(page.getByText(/Channels|jawed/i).first()).toBeVisible();
  });

  test('Maps mashups + Reddit submit + Digg about', async ({ page }) => {
    await page.goto('/years/2005/sites/maps/mashups.html');
    await expect(page.getByText(/HousingMaps|mashup|Ajax/i).first()).toBeVisible();
    await page.goto('/years/2005/sites/reddit/submit.html');
    await expect(page.locator('[data-reddit-submit]')).toBeVisible();
    await page.goto('/years/2005/sites/digg/about.html');
    await expect(page.getByText(/digg|bury|2005/i).first()).toBeVisible();
  });

  test('TechCrunch room + iTunes podcasts', async ({ page }) => {
    await page.goto('/years/2005/sites/techcrunch/index.html');
    await expect(page.getByText(/TechCrunch|Web 2\.0/i).first()).toBeVisible();
    await page.goto('/years/2005/sites/itunes/index.html');
    await expect(page.getByText(/Podcast|June 28|iTunes/i).first()).toBeVisible();
  });
});
