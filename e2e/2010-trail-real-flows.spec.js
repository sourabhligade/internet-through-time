// @ts-check
/**
 * 2010 multi-step trails — real localStorage (itt10).
 * docs/2010-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md Part 5
 * Home trails 1–7
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

/** @param {import('@playwright/test').Page} page @param {string} key */
async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `trail missing ${key}`).toBeTruthy();
  expect(raw).not.toBe('[]');
  return raw || '';
}

test.describe('2010 trail 1 — Tablet arrives', () => {
  test('iPad about → App Store install → itt10-apps', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/about.html');
    await expect(page.locator('body')).toContainText(/\$499|Jan 27|iPad/i);
    await expect(page.locator('a[href*="appstore"]').first()).toBeVisible();

    await page.goto('/years/2010/sites/appstore/index.html');
    await clearKeys(page, ['itt10-apps']);
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await page.locator('[data-appstore-install]').first().click();
    await requireKey(page, 'itt10-apps');
  });
});

test.describe('2010 trail 2 — Phone leap', () => {
  test('iPhone 4 about → App Store → Safari history', async ({ page }) => {
    await page.goto('/years/2010/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/\$199|FaceTime|Retina|Jun 24/i);

    await page.goto('/years/2010/sites/appstore/index.html');
    await clearKeys(page, ['itt10-apps', 'itt10-iphone-history']);
    await page.reload();
    await page.locator('[data-appstore-install]').first().click();
    await requireKey(page, 'itt10-apps');

    await page.goto('/years/2010/sites/iphone/index.html');
    await page.reload();
    await page.waitForSelector('[data-iphone-browse]', { timeout: 20000 });
    await page.fill('[name="url"]', 'http://www.google.com/');
    await page.locator('[data-iphone-browse] button[type="submit"]').click();
    await requireKey(page, 'itt10-iphone-history');
  });
});

test.describe('2010 trail 3 — Filter social', () => {
  test('Instagram share → iOS-only about', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await clearKeys(page, ['itt10-ig-posts']);
    await page.reload();
    await page.locator('[data-ig-filter="Earlybird"]').click();
    await page.locator('[data-ig-share]').click();
    await requireKey(page, 'itt10-ig-posts');

    await page.goto('/years/2010/sites/instagram/about.html');
    await expect(page.locator('body')).toContainText(/iOS only|iOS-only|Oct 6|not.*Android/i);
  });
});

test.describe('2010 trail 4 — Social web', () => {
  test('Facebook Like → Open Graph about → Places', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/feed.html');
    await clearKeys(page, ['itt10-fb-likes', 'itt10-fb-places', 'itt10-fb-culture']);
    await page.reload();
    await page.locator('[data-fb-like]').first().click();
    await requireKey(page, 'itt10-fb-likes');

    await page.goto('/years/2010/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Open Graph|600/i);
    await page.locator('[data-fb-culture]').click();
    await requireKey(page, 'itt10-fb-culture');

    await page.goto('/years/2010/sites/facebook/places.html');
    await page.locator('#pl').click();
    await requireKey(page, 'itt10-fb-places');
  });
});

test.describe('2010 trail 5 — Check-in + farm', () => {
  test('Foursquare → FarmVille peak both keys', async ({ page }) => {
    await page.goto('/years/2010/sites/foursquare/index.html');
    await clearKeys(page, ['itt10-4sq', 'itt10-farm']);
    await page.reload();
    await page.locator('[data-4sq-checkin]').first().click();
    await requireKey(page, 'itt10-4sq');

    await page.goto('/years/2010/sites/farmville/index.html');
    await expect(page.locator('body')).toContainText(/peak|84|March 2010/i);
    await page.locator('[data-farm-plant="strawberry"]').click();
    await requireKey(page, 'itt10-farm');
  });
});

test.describe('2010 trail 6 — Still PC / EU Spotify', () => {
  test('Win7 · Gmail · Spotify Europe three real keys', async ({ page }) => {
    await page.goto('/years/2010/sites/windows7/index.html');
    await expect(page.locator('body')).toContainText(/mass|2010|IE 8/i);

    await page.goto('/years/2010/sites/ie8/index.html');
    await clearKeys(page, ['itt10-shell-pref', 'itt10-gmail', 'itt10-spotify-eu']);
    await page.reload();
    await page.locator('[data-shell-prefer="ie8"]').click();
    await requireKey(page, 'itt10-shell-pref');

    await page.goto('/years/2010/sites/gmail/index.html');
    await page.reload();
    await page.locator('[data-gmail-login]').evaluate((f) => f.requestSubmit());
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt10-gmail')), { timeout: 8000 })
      .toBeTruthy();

    await page.goto('/years/2010/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText(/Europe|not.*US|2011/i);
    await page.locator('[data-spotify-join]').click();
    await requireKey(page, 'itt10-spotify-eu');
  });
});

test.describe('2010 trail 7 — Seeds of later', () => {
  test('Pinterest · Uber · Wave three keys', async ({ page }) => {
    await page.goto('/years/2010/sites/pinterest/index.html');
    await clearKeys(page, ['itt10-pin', 'itt10-uber', 'itt10-wave']);
    await page.reload();
    await page.locator('[data-pin-save]').first().click();
    await requireKey(page, 'itt10-pin');

    await page.goto('/years/2010/sites/uber/index.html');
    await page.locator('#uber-req').click();
    await requireKey(page, 'itt10-uber');

    await page.goto('/years/2010/sites/wave/index.html');
    await page.locator('[data-wave-invite]').click();
    await requireKey(page, 'itt10-wave');
  });
});
