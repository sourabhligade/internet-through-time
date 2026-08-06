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

  test('Google+ Hangout offline theater stores session', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/hangouts.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-gplus-hangout');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-gplus-hangout-start]', { timeout: 20000 });
    await page.locator('[data-gplus-hangout-start]').click();
    await expect(page.locator('[data-gplus-hangout]')).toContainText(/Hangout started/i);
    await expect(page.locator('[data-gplus-hangout]')).not.toContainText(/mock/i);
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-gplus-hangout')), {
        timeout: 8000,
      })
      .toBeTruthy();
  });

  test('Qwikster multi-step literacy → itt11-qwikster', async ({ page }) => {
    await page.goto('/years/2011/sites/netflix/qwikster.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-qwikster');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await expect(page.locator('body')).toContainText(/Qwikster/i);
    await expect(page.locator('body')).toContainText(/reverse|cancelled|October/i);
    await page.locator('[data-qw-event="hike"]').check();
    await page.locator('[data-qw-event="reverse"]').check();
    await page.locator('[data-qwikster-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-qwikster')), { timeout: 8000 })
      .toBeTruthy();
    const raw = await page.evaluate(() => localStorage.getItem('itt11-qwikster'));
    expect(raw || '').toMatch(/hike|reverse|Qwikster/i);
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
