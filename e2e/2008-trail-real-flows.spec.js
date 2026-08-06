// @ts-check
/**
 * 2008 multi-step trails — real localStorage (itt08).
 * docs/2008-CONNECTIONS-AND-TRAILS.md · Home trails 1–6
 * docs/2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md Part 5
 */
const { test, expect } = require('@playwright/test');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} keys
 */
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

test.describe('2008 trail 1 — Apps arrive', () => {
  test('iPhone 3G about → App Store install → itt08-apps', async ({ page }) => {
    await page.goto('/years/2008/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/3G|\$199|App Store|Jul/i);
    await expect(page.locator('a[href*="appstore"]').first()).toBeVisible();

    await page.goto('/years/2008/sites/appstore/index.html');
    await clearKeys(page, ['itt08-apps']);
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await page.locator('[data-appstore-install]').first().click();
    await expect(page.locator('[data-appstore-status]')).toContainText(/Installed|Already|itt08/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-apps'));
    expect(raw || '').toMatch(/name|id/i);
  });
});

test.describe('2008 trail 2 — Browser wars 2.0', () => {
  test('Firefox 3 → Chrome download → itt08-chrome', async ({ page }) => {
    await page.goto('/years/2008/sites/firefox/index.html');
    await expect(page.locator('body')).toContainText(/Firefox 3|Download Day/i);
    await expect(page.locator('a[href*="chrome"]').first()).toBeVisible();

    await page.goto('/years/2008/sites/chrome/index.html');
    await clearKeys(page, ['itt08-chrome']);
    await page.reload();
    await page.waitForSelector('[data-chrome-download]', { timeout: 20000 });
    await page.locator('[data-chrome-download]').click();
    await expect(page.locator('[data-chrome-status]')).toContainText(/Download|itt08|Windows/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-chrome'));
    expect(raw || '').toContain('downloaded');
  });
});

test.describe('2008 trail 3 — Android opens', () => {
  test('G1 → Market install → contrast App Store', async ({ page }) => {
    await page.goto('/years/2008/sites/android/index.html');
    await expect(page.locator('body')).toContainText(/G1|first|T-Mobile/i);
    await expect(page.locator('a[href*="market"], a[href*="appstore"]').first()).toBeVisible();

    await page.goto('/years/2008/sites/android/market.html');
    await clearKeys(page, ['itt08-android-apps']);
    await page.reload();
    await page.waitForSelector('[data-android-install]', { timeout: 20000 });
    const mapsBtn = page.locator('[data-android-install="Google Maps"]');
    if (await mapsBtn.count()) {
      await mapsBtn.click();
    } else {
      await page.locator('[data-android-install]').first().click();
    }
    await page.waitForTimeout(200);
    const raw = await page.evaluate(() => localStorage.getItem('itt08-android-apps'));
    expect(raw || '').toMatch(/Maps|Gmail|YouTube|Amazon|name/i);

    await page.goto('/years/2008/sites/appstore/index.html');
    await expect(page.locator('body')).toContainText(/App Store|500|552/i);
  });
});

test.describe('2008 trail 4 — Stream night', () => {
  test('Hulu → Netflix → YouTube · three storage keys', async ({ page }) => {
    await page.goto('/years/2008/sites/hulu/index.html');
    await clearKeys(page, ['itt08-hulu', 'itt08-netflix-queue', 'itt08-yt-uploads', 'itt08-yt-views']);
    await page.reload();
    await page.waitForSelector('[data-hulu-play]', { timeout: 20000 });
    await page.locator('[data-hulu-play]').first().click();
    expect(await page.evaluate(() => localStorage.getItem('itt08-hulu'))).toBeTruthy();

    await page.goto('/years/2008/sites/netflix/index.html');
    await page.waitForSelector('[data-netflix-queue-form]', { timeout: 20000 });
    await page.fill('[name="q"]', 'Iron Man');
    await page.locator('[data-netflix-queue-form] input[type="submit"]').click();
    await expect(page.locator('[data-netflix-queue]')).toContainText(/Iron Man/i, { timeout: 8000 });

    await page.goto('/years/2008/sites/youtube/upload.html');
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.fill('[data-yt-upload] [name="title"]', 'Stream night vlog');
    await page.locator('[data-yt-upload] button[type="submit"], [data-yt-upload] input[type="submit"]').first().click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/upload|saved|list|itt08/i, {
      timeout: 8000,
    });
    expect(await page.evaluate(() => localStorage.getItem('itt08-yt-uploads'))).toMatch(/vlog|Stream/i);
  });
});

test.describe('2008 trail 5 — Login everywhere', () => {
  test('Facebook Connect → Feed residual', async ({ page }) => {
    await page.goto('/years/2008/sites/facebook/connect.html');
    await clearKeys(page, ['itt08-fb-connect']);
    await page.reload();
    await page.waitForSelector('[data-fb-connect]', { timeout: 20000 });
    await page.locator('[data-fb-connect]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt08-fb-connect'))).toContain('connected');

    await page.goto('/years/2008/sites/facebook/feed.html');
    await expect(page.locator('body')).toContainText(/Feed|News|status|Facebook/i);
  });
});

test.describe('2008 trail 6 — Still desktop', () => {
  test('Gmail login → Digg submit → Street View', async ({ page }) => {
    await page.goto('/years/2008/sites/gmail/index.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt08-gmail') || k.startsWith('itt08-digg') || k === 'itt08-streetview')
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForSelector('[data-gmail-login]', { timeout: 20000 });
    await page.fill('[data-gmail-login] [name="email"]', 'desktop@gmail.com');
    await page.fill('[data-gmail-login] [name="pass"]', 'museum');
    await page.locator('[data-gmail-login] button[type="submit"]').click();
    await expect(page.locator('[data-gmail-status]')).toContainText(/sign|in|welcome|session|ok|open/i, {
      timeout: 8000,
    });

    await page.goto('/years/2008/sites/digg/submit.html');
    await page.waitForSelector('[data-digg-submit]', { timeout: 20000 });
    await page.fill('[data-digg-submit] [name="title"]', 'Desktop trail story');
    await page.fill('[data-digg-submit] [name="url"]', 'http://example.com/desktop');
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-status]')).toContainText(/submit|digg|story|added/i, {
      timeout: 8000,
    });

    await page.goto('/years/2008/sites/maps/streetview.html');
    await page.waitForSelector('[data-sv-city="Miami"]', { timeout: 20000 });
    await page.locator('[data-sv-city="Miami"]').click();
    await expect(page.locator('[data-sv-status]')).toContainText(/Miami|Street View/i, {
      timeout: 8000,
    });
  });
});

test.describe('2008 home trails listed', () => {
  test('Starting Point documents all six trails', async ({ page }) => {
    await page.goto('/years/2008/pages/home.html');
    for (const t of [
      'Apps arrive',
      'Browser wars',
      'Android opens',
      'Stream night',
      'Login everywhere',
      'Still desktop',
    ]) {
      await expect(page.locator('body')).toContainText(new RegExp(t, 'i'));
    }
  });
});
