// @ts-check
/**
 * 2007 real localStorage flows — no soft mocks.
 * Every interactive action must mutate itt07-* keys and DOM.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

test.describe('2007 real flows — P0 products', () => {
  test('iPhone browse persists itt07-iphone-history', async ({ page }) => {
    await page.goto('/years/2007/sites/iphone/index.html');
    await clearKeys(page, ['itt07-iphone-history']);
    await page.reload();
    await page.waitForSelector('[data-iphone-browse]', { timeout: 20000 });
    await page.fill('[name="url"]', 'http://maps.google.com/');
    await page.locator('[data-iphone-browse] button[type="submit"]').click();
    await expect(page.locator('[data-iphone-status]')).toContainText(/Opened|history/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt07-iphone-history'));
    expect(raw || '').toContain('maps.google');
    expect(await page.evaluate(() => localStorage.getItem('itt06-iphone-history'))).toBeNull();
    await expect(page.locator('[data-iphone-history]')).toContainText(/maps\.google/i);
  });

  test('iPhone preset Google writes history', async ({ page }) => {
    await page.goto('/years/2007/sites/iphone/index.html');
    await clearKeys(page, ['itt07-iphone-history']);
    await page.reload();
    await page.waitForSelector('[data-iphone-presets] button', { timeout: 15000 });
    await page.locator('[data-iphone-presets] button').filter({ hasText: 'Google' }).click();
    const raw = await page.evaluate(() => localStorage.getItem('itt07-iphone-history'));
    expect(raw || '').toMatch(/google/i);
  });

  test('Street View city → itt07-streetview', async ({ page }) => {
    await page.goto('/years/2007/sites/maps/streetview.html');
    await clearKeys(page, ['itt07-streetview']);
    await page.reload();
    await page.waitForSelector('[data-sv-city="New York"]', { timeout: 20000 });
    await page.locator('[data-sv-city="New York"]').click();
    await expect(page.locator('[data-sv-status]')).toContainText(/New York/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt07-streetview'));
    expect(raw || '').toContain('New York');
  });

  test('Facebook Platform app → itt07-fb-apps', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/platform.html');
    await clearKeys(page, ['itt07-fb-apps']);
    await page.reload();
    await page.waitForSelector('[data-fb-app-add]', { timeout: 20000 });
    await page.selectOption('[name="app"]', { label: 'SuperPoke!' }).catch(async () => {
      await page.locator('[name="app"]').selectOption({ index: 1 });
    });
    await page.locator('[data-fb-app-add] button[type="submit"]').click();
    await expect(page.locator('[data-fb-apps]')).not.toContainText(/No apps yet/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt07-fb-apps'));
    expect(raw && raw.length > 2).toBeTruthy();
    await expect(page.locator('[data-fb-app-remove]').first()).toBeVisible();
  });

  test('Twitter compose → itt07-tweets', async ({ page }) => {
    await page.goto('/years/2007/sites/twitter/index.html');
    await clearKeys(page, ['itt07-tweets']);
    await page.reload();
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    const msg = 'sxsw real ' + Date.now();
    await page.fill('[name="status"]', msg);
    await page.locator('[data-twitter-compose] button[type="submit"]').click();
    await expect(page.locator('[data-twitter-timeline]')).toContainText(msg, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt07-tweets'));
    expect(raw || '').toContain(msg);
  });

  test('YouTube upload → itt07-yt-uploads', async ({ page }) => {
    await page.goto('/years/2007/sites/youtube/upload.html');
    await clearKeys(page, ['itt07-yt-uploads']);
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    const title = 'RealYT07 ' + Date.now();
    await page.fill('[name="title"]', title);
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/Upload|list|Watch/i, {
      timeout: 10000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt07-yt-uploads'));
    expect(raw || '').toContain(title);
  });

  test('Digg digg-it → itt07-digg-links', async ({ page }) => {
    await page.goto('/years/2007/sites/digg/index.html');
    await clearKeys(page, ['itt07-digg-links', 'itt06-digg-links']);
    await page.reload();
    await page.waitForSelector('[data-digg-up]', { timeout: 20000 });
    const before = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
    await page.locator('[data-digg-up="0"]').click();
    await expect(page.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
      timeout: 5000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt07-digg-links'))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt06-digg-links'))).toBeNull();
  });

  test('MySpace profile save → itt07-myspace-profile', async ({ page }) => {
    await page.goto('/years/2007/sites/myspace/profile.html');
    await clearKeys(page, ['itt07-myspace-profile']);
    await page.reload();
    await page.waitForSelector('[data-myspace-profile-form]', { timeout: 20000 });
    const name = 'Space07' + Date.now();
    await page.fill('[name="display"]', name);
    await page.fill('[name="headline"]', 'Headline 2007');
    await page.fill('[name="about"]', 'About real storage');
    await page.locator('[data-myspace-profile-form] input[type="submit"]').click();
    await expect(page.locator('[data-myspace-status]')).toContainText(/saved|Profile/i, {
      timeout: 5000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt07-myspace-profile'));
    expect(raw || '').toContain(name);
  });

  test('shell dirbar iPhone → real immersion boot', async ({ page }) => {
    await enterYear(page, '2007');
    await goInFrame(page, 'sites/iphone/index.html');
    await waitForImmersion(page, '2007');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/iPhone|App Store/i);
  });
});
