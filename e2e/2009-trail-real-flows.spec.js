// @ts-check
/**
 * 2009 multi-step trails — real localStorage (itt09).
 * docs/2009-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md Part 5
 */
const { test, expect } = require('@playwright/test');

async function checkAllReq(page, sel = '[data-req], [data-chrome-check], [data-appstore-check], [data-android-check], [data-wave-check]') {
  const loc = page.locator(sel);
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    try { await loc.nth(i).check({ force: true }); } catch (e) { /* */ }
  }
}
async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

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

/** @param {import('@playwright/test').Page} page @param {string} key */
async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `trail missing ${key}`).toBeTruthy();
  expect(raw).not.toBe('[]');
  return raw || '';
}

test.describe('2009 trail 1 — Apps every day', () => {
  test('iPhone 3GS about → App Store install', async ({ page }) => {
    await page.goto('/years/2009/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/3GS|\$199|Jun 19/i);

    await page.goto('/years/2009/sites/appstore/index.html');
    await clearKeys(page, ['itt09-apps']);
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await checkAllReq(page);
    await twoStepClick(page, '[data-appstore-install]');
    await requireKey(page, 'itt09-apps');
  });
});

test.describe('2009 trail 2 — Social mainstream', () => {
  test('Facebook Like → FarmVille plant', async ({ page }) => {
    await page.goto('/years/2009/sites/facebook/feed.html');
    await clearKeys(page, ['itt09-fb-likes', 'itt09-farm']);
    await page.reload();
    await page.locator('[data-fb-like]').first().click();
    await requireKey(page, 'itt09-fb-likes');

    await page.goto('/years/2009/sites/farmville/index.html');
    await page.reload();
    await twoStepClick(page, '[data-farm-plant]');
    await requireKey(page, 'itt09-farm');
  });
});

test.describe('2009 trail 3 — Decision engine', () => {
  test('Bing search → storage', async ({ page }) => {
    await page.goto('/years/2009/sites/bing/index.html');
    await clearKeys(page, ['itt09-bing']);
    await page.reload();
    await expect(page.locator('body')).toContainText(/Bing|decision|Jun/i);
    await page.locator('[data-bing-search]').evaluate((f) => f.requestSubmit());
    await requireKey(page, 'itt09-bing');
  });
});

test.describe('2009 trail 4 — Real-time web', () => {
  test('Twitter about → compose', async ({ page }) => {
    await page.goto('/years/2009/sites/twitter/about.html');
    await expect(page.locator('body')).toContainText(/Oprah|Kutcher|real-time/i);

    await page.goto('/years/2009/sites/twitter/index.html');
    await clearKeys(page, ['itt09-tweets']);
    await page.reload();
    await page.locator('[data-twitter-status], textarea').first().fill('trail tweet 2009');
    await page.locator('[data-twitter-compose]').evaluate((f) => f.requestSubmit());
    await requireKey(page, 'itt09-tweets');
  });
});

test.describe('2009 trail 5 — PC not dead', () => {
  test('IE8 · Windows 7 dates · Gmail', async ({ page }) => {
    await page.goto('/years/2009/sites/ie8/index.html');
    await expect(page.locator('body')).toContainText(/Mar 19|IE 8/i);
    await page.goto('/years/2009/sites/windows7/index.html');
    await expect(page.locator('body')).toContainText(/Oct 22|2009/i);

    await page.goto('/years/2009/sites/gmail/index.html');
    await page.evaluate(() => {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt09-gmail') === 0) localStorage.removeItem(k);
      }
    });
    await page.reload();
    await page.locator('[data-gmail-login]').evaluate((f) => f.requestSubmit());
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt09-gmail')), { timeout: 8000 })
      .toBeTruthy();
  });
});

test.describe('2009 trail 6 — Seeds of 2010s', () => {
  test('Foursquare → Kickstarter both keys', async ({ page }) => {
    await page.goto('/years/2009/sites/foursquare/index.html');
    await clearKeys(page, ['itt09-4sq', 'itt09-ks']);
    await page.reload();
    await twoStepClick(page, '[data-4sq-checkin]');
    await requireKey(page, 'itt09-4sq');

    await page.goto('/years/2009/sites/kickstarter/index.html');
    await page.reload();
    await page.locator('[data-ks-back]').first().click();
    await requireKey(page, 'itt09-ks');
  });
});

test.describe('2009 trail 7 — Privacy + EU Spotify', () => {
  test('Beacon end · Spotify Europe ban', async ({ page }) => {
    await page.goto('/years/2009/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Beacon/i);
    await expect(page.locator('body')).toContainText(/Sep 21|shut|2007/i);

    await page.goto('/years/2009/sites/spotify/index.html');
    await clearKeys(page, ['itt09-spotify-eu']);
    await page.reload();
    await expect(page.locator('body')).toContainText(/Europe|not.*US|2011/i);
    await page.locator('[data-spotify-join]').click();
    await requireKey(page, 'itt09-spotify-eu');
  });
});
