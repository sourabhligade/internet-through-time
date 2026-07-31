// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

test.describe('2006 MVP', () => {
  test('shell boots XP/IE6 2006', async ({ page }) => {
    await enterYear(page, '2006');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2006');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('home tour lists P0 thesis sites', async ({ page }) => {
    await page.goto('/years/2006/pages/home.html');
    for (const t of ['Twitter', 'Facebook', 'YouTube', 'Digg', 'Google Docs', 'AWS', '85,507,314']) {
      await expect(page.locator('body')).toContainText(t);
    }
  });

  test('about has scale and bans', async ({ page }) => {
    await page.goto('/years/2006/pages/about.html');
    await expect(page.locator('body')).toContainText('85,507,314');
    await expect(page.locator('body')).toContainText(/iPhone|Chrome|Street View/i);
    await expect(page.locator('body')).toContainText(/News Feed|Sep 26|Jul 15/i);
  });

  test('twitter compose + timeline', async ({ page }) => {
    await page.goto('/years/2006/sites/twitter/index.html');
    await expect(page.locator('body')).toContainText(/What are you doing/i);
    const status = page.locator('[name="status"], [data-twitter-status]').first();
    await status.fill('hello from museum 2006');
    await page.locator('[data-twitter-compose] button[type="submit"]').click();
    await expect(page.locator('[data-twitter-timeline]')).toContainText('hello from museum 2006');
  });

  test('facebook feed room', async ({ page }) => {
    await page.goto('/years/2006/sites/facebook/feed.html');
    await expect(page.locator('body')).toContainText(/News Feed/i);
    await expect(page.locator('[data-fb-feed]')).toBeVisible();
  });

  test('youtube two-era framing', async ({ page }) => {
    await page.goto('/years/2006/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/1\.65|Oct 9|independent/i);
  });

  test('digg peak front page', async ({ page }) => {
    await page.goto('/years/2006/sites/digg/index.html');
    await expect(page.locator('body')).toContainText(/peak|Digg/i);
    await expect(page.locator('[data-digg-list]')).toBeVisible();
  });

  test('docs + aws rooms load', async ({ page }) => {
    await page.goto('/years/2006/sites/docs/index.html');
    await expect(page.locator('body')).toContainText(/Docs|Writely|Oct 10/i);
    await page.goto('/years/2006/sites/aws/index.html');
    await expect(page.locator('body')).toContainText(/S3|Mar 14|EC2/i);
  });
});
