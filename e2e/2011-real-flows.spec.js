// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion } = require('./helpers');

test.describe('2011 real flows', () => {
  test('Spotify free play shows ad theater', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/player.html');
    await page.evaluate(() => {
      try {
        localStorage.setItem('itt11-spotify-invited', 'true');
        localStorage.setItem('itt11-spotify-plan', JSON.stringify('free'));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-spotify-play]', { timeout: 20000 });
    await page.locator('[data-spotify-play]').first().click();
    await expect(page.locator('[data-spotify-ad]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-spotify-status]')).toContainText(/Playing|free|ad/i);
  });

  test('Feed mode toggle Top Stories / Recent', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/feed-about.html');
    await page.waitForSelector('[data-fb-feed-mode]', { timeout: 20000 });
    await page.locator('[data-fb-feed-mode="recent"]').click();
    await expect(page.locator('[data-fb-feed-mode-status]')).toContainText(/Most Recent/i);
    await page.locator('[data-fb-feed-mode="top"]').click();
    await expect(page.locator('[data-fb-feed-mode-status]')).toContainText(/Top Stories/i);
  });

  test('Google+ Hangout mock', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/hangouts.html');
    await page.waitForSelector('[data-gplus-hangout-start]', { timeout: 20000 });
    await page.locator('[data-gplus-hangout-start]').click();
    await expect(page.locator('[data-gplus-hangout]')).toContainText(/Hangout|mock/i);
  });

  test('Qwikster exhibit honesty', async ({ page }) => {
    await page.goto('/years/2011/sites/netflix/qwikster.html');
    await expect(page.locator('body')).toContainText(/Qwikster/i);
    await expect(page.locator('body')).toContainText(/reverse|cancelled|October/i);
  });

  test('Snapchat timer seed', async ({ page }) => {
    await page.goto('/years/2011/sites/snapchat/index.html');
    await page.waitForSelector('[data-snap-send]', { timeout: 20000 });
    await page.locator('[data-snap-send]').click();
    await expect(page.locator('[data-snap-status]')).toContainText(/Snap|sent/i, { timeout: 5000 });
  });

  test('trail: home → Timeline via shell', async ({ page }) => {
    await enterYear(page, '2011');
    await goInFrame(page, 'sites/facebook/timeline.html');
    await waitForImmersion(page, '2011');
    await expect(page.frameLocator('#content').locator('body')).toContainText(/Timeline/i);
  });
});
