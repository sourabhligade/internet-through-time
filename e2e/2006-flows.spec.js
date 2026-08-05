// @ts-check
/**
 * 2006 named flows pack (shell + P0) — suite-shape parity with 2007–2013.
 * Deep matrix remains in 2006-real-flows.spec.js; this file gates shell + signature paths.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string|string[]} keys
 */
async function clearKeys(page, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, list);
}

test.describe('2006 flows — enter year', () => {
  test('hub → shell · dirbar Twitter/Facebook/YouTube/Digg · Starting Point', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2006"]')).toBeVisible();
    await enterYear(page, '2006');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2006');
    await expect(page.locator('#content')).toBeVisible();
    for (const label of ['Twitter', 'Facebook', 'YouTube', 'Digg']) {
      await expect(page.locator('#dirbar .dir-btn', { hasText: label })).toBeVisible();
    }
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Starting Point|2006|Twitter/i);
  });
});

test.describe('2006 flows — thesis', () => {
  test('About scale + hard bans', async ({ page }) => {
    await page.goto('/years/2006/pages/about.html');
    await expect(page.locator('body')).toContainText('85,507,314');
    await expect(page.locator('body')).toContainText(/iPhone|Chrome|Street View/i);
    await expect(page.locator('body')).toContainText(/Twitter|News Feed|YouTube/i);
  });

  test('Home trails list P0 products', async ({ page }) => {
    await page.goto('/years/2006/pages/home.html');
    await expect(page.locator('body')).toContainText(/Twitter|Facebook|YouTube|Digg/i);
  });
});

test.describe('2006 flows — Twitter (shell)', () => {
  test('compose → itt06-tweets under shell', async ({ page }) => {
    await enterYear(page, '2006');
    await clearKeys(page, ['itt06-tweets', 'itt05-tweets']);
    await goInFrame(page, 'sites/twitter/index.html');
    await waitForImmersion(page, '2006');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-twitter-compose]')).toBeVisible({ timeout: 15000 });
    const msg = 'shell06 ' + Date.now();
    await frame.locator('[name="status"], [data-twitter-status]').first().fill(msg);
    await frame.locator('[data-twitter-compose] button[type="submit"]').click();
    await expect(frame.locator('[data-twitter-timeline]')).toContainText(msg, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt06-tweets'));
    expect(raw || '').toContain(msg);
    expect(await page.evaluate(() => localStorage.getItem('itt05-tweets'))).toBeNull();
  });
});

test.describe('2006 flows — Facebook Feed (shell)', () => {
  test('status post → itt06-fb-feed under shell', async ({ page }) => {
    await enterYear(page, '2006');
    await clearKeys(page, ['itt06-fb-feed']);
    await goInFrame(page, 'sites/facebook/feed.html');
    await waitForImmersion(page, '2006');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-fb-feed]')).toBeVisible({ timeout: 15000 });
    const text = 'feed shell ' + Date.now();
    await frame.locator('[data-fb-status-post] [name="status"]').fill(text);
    await frame.locator('[data-fb-status-post] button[type="submit"]').click();
    await expect(frame.locator('[data-fb-feed]')).toContainText(text, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt06-fb-feed'));
    expect(raw || '').toContain(text);
  });
});

test.describe('2006 flows — Digg + isolation', () => {
  test('digg it → itt06 only', async ({ page }) => {
    await enterYear(page, '2006');
    await clearKeys(page, ['itt06-digg-links', 'itt05-digg-links']);
    await goInFrame(page, 'sites/digg/index.html');
    await waitForImmersion(page, '2006');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-digg-up="0"]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-digg-up="0"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt06-digg-links')), {
        timeout: 8000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt05-digg-links'))).toBeNull();
  });
});

test.describe('2006 flows — YouTube upload (direct)', () => {
  test('upload → itt06-yt-uploads', async ({ page }) => {
    await page.goto('/years/2006/sites/youtube/upload.html');
    await clearKeys(page, ['itt06-yt-uploads']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    const title = 'FlowsYT06 ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt06-yt-uploads')), {
        timeout: 10000,
      })
      .toContain(title);
  });
});
