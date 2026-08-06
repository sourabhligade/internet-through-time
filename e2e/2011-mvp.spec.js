// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion } = require('./helpers');

test.describe('2011 MVP', () => {
  test('shell boots 2011', async ({ page }) => {
    await enterYear(page, '2011');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2011');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('home lists P0 thesis', async ({ page }) => {
    await page.goto('/years/2011/pages/home.html');
    for (const t of ['Spotify US', 'Timeline', 'Google+', 'Siri', '346,004,403']) {
      await expect(page.locator('body')).toContainText(t);
    }
  });

  test('about dual scale and bans', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await expect(page.locator('body')).toContainText('346,004,403');
    await expect(page.locator('body')).toContainText('555');
    await expect(page.locator('body')).toContainText(/Instagram.*Android|Android.*2012/i);
    await expect(page.locator('body')).toContainText(/Spotify|Siri|Timeline/i);
  });

  test('Spotify invite + plan → itt11', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt11-spotify') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-spotify-invite]', { timeout: 20000 });
    await page.locator('[data-spotify-invite]').click();
    await expect(page.locator('[data-spotify-status]')).toContainText(/Invite|free|plan/i, {
      timeout: 8000,
    });
    const invited = await page.evaluate(() => localStorage.getItem('itt11-spotify-invited'));
    expect(invited || '').toMatch(/true/i);
  });

  test('Facebook Timeline enable', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/timeline.html');
    await page.waitForSelector('[data-fb-timeline-enable]', { timeout: 20000 });
    await page.locator('[data-fb-timeline-enable]').click();
    await expect(page.locator('[data-fb-timeline-status]')).toContainText(/Timeline/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt11-fb-timeline'));
    expect(raw).toBe('1');
  });

  test('Google+ Circles add', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/circles.html');
    await page.waitForSelector('[data-gplus-add-circle]', { timeout: 20000 });
    await page.locator('[data-gplus-circle-name]').fill('Coworkers');
    await page.locator('[data-gplus-add-circle]').click();
    await expect(page.locator('[data-gplus-circles]')).toContainText('Coworkers', {
      timeout: 8000,
    });
  });

  test('Siri canned answer', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/siri.html');
    await page.waitForSelector('[data-siri-phrase]', { timeout: 20000 });
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2011',
      null,
      { timeout: 25000 }
    );
    await page.locator('[data-siri-phrase="Will I need an umbrella this weekend?"]').click();
    await expect(page.locator('[data-siri-log]')).toContainText(/Siri|umbrella|rain|weather/i, {
      timeout: 10000,
    });
  });

  test('IE9 download theater', async ({ page }) => {
    await page.goto('/years/2011/sites/ie9/download.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-ie9');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.locator('[data-ie9-download]').click();
    await expect(page.locator('[data-ie9-status]')).toContainText(/installed|Download complete/i, {
      timeout: 5000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt11-ie9'));
    expect(raw).toBe('1');
  });

  test('shell navigates to Spotify', async ({ page }) => {
    await enterYear(page, '2011');
    await goInFrame(page, 'sites/spotify/index.html');
    await waitForImmersion(page, '2011');
    const body = page.frameLocator('#content').locator('body');
    await expect(body).toContainText(/Spotify|July 14|United States/i);
  });
});
