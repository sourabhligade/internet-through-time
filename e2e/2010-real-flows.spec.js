// @ts-check
/**
 * 2010 real localStorage flows — no soft mocks.
 * Every interactive action must mutate itt10-* keys and/or DOM after click.
 */
const { test, expect } = require('@playwright/test');

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

/** @param {import('@playwright/test').Page} page @param {string} key */
async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing real storage ${key}`).toBeTruthy();
  expect(raw).not.toBe('[]');
  expect(raw).not.toBe('{}');
  expect(raw).not.toBe('null');
  return raw || '';
}

test.describe('2010 real flows', () => {
  test('App Store install then list is non-empty', async ({ page }) => {
    await page.goto('/years/2010/sites/appstore/index.html');
    await clearKeys(page, 'itt10-apps');
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await page.locator('[data-appstore-install]').first().click();
    await expect(page.locator('[data-appstore-apps]')).toContainText(
      /Koi|Monkey|Convert|Facebook|Shazam|NYTimes|Camera|Google|Twitter|Pandora|name/i,
      { timeout: 8000 }
    );
    const after = JSON.parse((await requireKey(page, 'itt10-apps')) || '[]');
    expect(Array.isArray(after) ? after.length : 1).toBeGreaterThan(0);
  });

  test('iPhone Safari history → itt10-iphone-history', async ({ page }) => {
    await page.goto('/years/2010/sites/iphone/index.html');
    await clearKeys(page, 'itt10-iphone-history');
    await page.reload();
    await page.waitForSelector('[data-iphone-browse]', { timeout: 20000 });
    await page.fill('[name="url"]', 'http://www.apple.com/');
    await page.locator('[data-iphone-browse] button[type="submit"]').click();
    await expect(page.locator('[data-iphone-status]')).toContainText(/Opened|itt10|apple/i, {
      timeout: 8000,
    });
    const raw = await requireKey(page, 'itt10-iphone-history');
    expect(raw).toMatch(/apple/i);
  });

  test('iPad claim → itt10-ipad-history', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/index.html');
    await clearKeys(page, 'itt10-ipad-history');
    await page.reload();
    await page.locator('[data-ipad-claim]').click();
    await requireKey(page, 'itt10-ipad-history');
  });

  test('Instagram share → feed DOM + itt10-ig-posts', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await clearKeys(page, 'itt10-ig-posts');
    await page.reload();
    await page.locator('[data-ig-filter="Toaster"]').click();
    await page.locator('[data-ig-caption]').fill('real 2010 post');
    await page.locator('[data-ig-share]').click();
    await expect(page.locator('[data-ig-feed]')).toContainText(/Toaster|real 2010/i, {
      timeout: 8000,
    });
    const raw = await requireKey(page, 'itt10-ig-posts');
    expect(raw).toMatch(/Toaster|real 2010/i);
  });

  test('Facebook Like count + storage', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/feed.html');
    await clearKeys(page, 'itt10-fb-likes');
    await page.reload();
    await page.waitForSelector('[data-fb-like]', { timeout: 20000 });
    const id = await page.locator('[data-fb-like]').first().getAttribute('data-fb-like');
    await page.locator('[data-fb-like]').first().click();
    await requireKey(page, 'itt10-fb-likes');
    if (id) {
      const count = page.locator(`[data-fb-like-count="${id}"]`);
      if (await count.count()) {
        await expect(count).not.toHaveText('0');
      }
    }
  });

  test('Facebook Places check-in', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/places.html');
    await clearKeys(page, 'itt10-fb-places');
    await page.reload();
    await page.locator('#pl').click();
    await requireKey(page, 'itt10-fb-places');
  });

  test('FarmVille plant mutates plots JSON', async ({ page }) => {
    await page.goto('/years/2010/sites/farmville/index.html');
    await clearKeys(page, 'itt10-farm');
    await page.reload();
    await page.locator('[data-farm-plant="wheat"]').click();
    const raw = await requireKey(page, 'itt10-farm');
    expect(raw).toMatch(/wheat/i);
    await expect(page.locator('[data-farm-status]')).toContainText(/itt10|Plots|Coins/i);
  });

  test('Foursquare check-in list grows', async ({ page }) => {
    await page.goto('/years/2010/sites/foursquare/index.html');
    await clearKeys(page, 'itt10-4sq');
    await page.reload();
    await page.locator('[data-4sq-checkin]').first().click();
    await requireKey(page, 'itt10-4sq');
    await expect(page.locator('[data-4sq-list]')).toContainText(/Coffee|Dive|Airport|pts|check/i);
  });

  test('Android Market install', async ({ page }) => {
    await page.goto('/years/2010/sites/android/market.html');
    await clearKeys(page, ['itt10-android-apps', 'itt10-android']);
    await page.reload();
    await page.waitForSelector('[data-android-install]', { timeout: 20000 });
    await page.locator('[data-android-install]').first().click();
    const raw = await page.evaluate(
      () => localStorage.getItem('itt10-android-apps') || localStorage.getItem('itt10-android')
    );
    expect(raw).toBeTruthy();
  });

  test('Chrome download mutates itt10-chrome', async ({ page }) => {
    await page.goto('/years/2010/sites/chrome/index.html');
    await clearKeys(page, 'itt10-chrome');
    await page.reload();
    await page.locator('[data-chrome-download]').click();
    await page.locator('[data-chrome-prefer]').click();
    const raw = await requireKey(page, 'itt10-chrome');
    expect(raw).toMatch(/download|prefer|true/i);
  });

  test('Hulu play mutates itt10-hulu', async ({ page }) => {
    await page.goto('/years/2010/sites/hulu/index.html');
    await clearKeys(page, 'itt10-hulu');
    await page.reload();
    await page.waitForSelector('[data-hulu-play]', { timeout: 20000 });
    await page.locator('[data-hulu-play]').first().click();
    await requireKey(page, 'itt10-hulu');
  });

  test('Netflix queue mutates itt10-netflix-queue', async ({ page }) => {
    await page.goto('/years/2010/sites/netflix/index.html');
    await clearKeys(page, 'itt10-netflix-queue');
    await page.reload();
    await page.waitForSelector('[data-netflix-queue-form]', { timeout: 20000 });
    await page.locator('[data-netflix-q]').fill('Inception');
    await page.locator('[data-netflix-queue-form]').evaluate((f) => f.requestSubmit());
    const raw = await requireKey(page, 'itt10-netflix-queue');
    expect(raw).toMatch(/Inception/i);
  });

  test('Twitter compose → itt10-tweets', async ({ page }) => {
    await page.goto('/years/2010/sites/twitter/index.html');
    await clearKeys(page, 'itt10-tweets');
    await page.reload();
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    await page.locator('[data-twitter-status], textarea').first().fill('real flow tweet 2010');
    await page.locator('[data-twitter-compose]').evaluate((f) => f.requestSubmit());
    const raw = await requireKey(page, 'itt10-tweets');
    expect(raw).toMatch(/real flow tweet 2010/i);
  });

  test('Spotify Europe join → itt10-spotify-eu', async ({ page }) => {
    await page.goto('/years/2010/sites/spotify/index.html');
    await clearKeys(page, 'itt10-spotify-eu');
    await page.reload();
    await page.locator('[data-spotify-invite]').fill('EURO-REAL');
    await page.locator('[data-spotify-join]').click();
    await requireKey(page, 'itt10-spotify-eu');
  });

  test('Dropbox add file → itt10-dropbox-files', async ({ page }) => {
    await page.goto('/years/2010/sites/dropbox/index.html');
    await clearKeys(page, 'itt10-dropbox-files');
    await page.reload();
    await page.waitForSelector('[data-dropbox-add]', { timeout: 20000 });
    if (await page.locator('[data-dropbox-name]').count()) {
      await page.locator('[data-dropbox-name]').fill('deck-2010.pdf');
    }
    await page.locator('[data-dropbox-add]').click();
    await requireKey(page, 'itt10-dropbox-files');
  });

  test('Kickstarter back → itt10-ks', async ({ page }) => {
    await page.goto('/years/2010/sites/kickstarter/index.html');
    await clearKeys(page, 'itt10-ks');
    await page.reload();
    await page.waitForSelector('[data-ks-back]', { timeout: 20000 });
    await page.locator('[data-ks-back]').first().click();
    await requireKey(page, 'itt10-ks');
  });

  test('Pinterest pin → itt10-pin', async ({ page }) => {
    await page.goto('/years/2010/sites/pinterest/index.html');
    await clearKeys(page, 'itt10-pin');
    await page.reload();
    await page.locator('[data-pin-save]').first().click();
    await requireKey(page, 'itt10-pin');
  });

  test('Uber SF request → itt10-uber', async ({ page }) => {
    await page.goto('/years/2010/sites/uber/index.html');
    await clearKeys(page, 'itt10-uber');
    await page.reload();
    await page.locator('#uber-req').click();
    const raw = await requireKey(page, 'itt10-uber');
    expect(raw).toMatch(/black-car|San Francisco/i);
  });

  test('Wave invite → itt10-wave', async ({ page }) => {
    await page.goto('/years/2010/sites/wave/index.html');
    await clearKeys(page, 'itt10-wave');
    await page.reload();
    await page.locator('[data-wave-invite]').click();
    await requireKey(page, 'itt10-wave');
  });

  test('Gmail sign-in → itt10-gmail', async ({ page }) => {
    await page.goto('/years/2010/sites/gmail/index.html');
    await page.evaluate(() => {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt10-gmail') === 0) localStorage.removeItem(k);
      }
    });
    await page.reload();
    await page.waitForSelector('[data-gmail-login]', { timeout: 20000 });
    await page.locator('[data-gmail-login]').evaluate((f) => f.requestSubmit());
    await expect(page.locator('[data-gmail-status]')).toContainText(/Signed|inbox|gmail/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt10-gmail'));
    expect(raw, 'itt10-gmail after sign-in').toBeTruthy();
  });

  test('Street View turn/city → itt10-streetview', async ({ page }) => {
    await page.goto('/years/2010/sites/maps/streetview.html');
    await clearKeys(page, 'itt10-streetview');
    await page.reload();
    await page.waitForSelector('[data-sv-city], [data-sv-turn]', { timeout: 20000 });
    if (await page.locator('[data-sv-city]').count()) {
      await page.locator('[data-sv-city]').first().click();
    } else {
      await page.locator('[data-sv-turn]').first().click();
    }
    await requireKey(page, 'itt10-streetview');
  });

  test('Amazon add to cart mutates itt10 cart key', async ({ page }) => {
    await page.goto('/years/2010/sites/amazon/index.html');
    await page.evaluate(() => {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt10') === 0 && /cart/i.test(k)) localStorage.removeItem(k);
      }
    });
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    const cart = await page.evaluate(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt10') === 0 && /cart/i.test(k) && localStorage.getItem(k)) {
          return localStorage.getItem(k);
        }
      }
      return null;
    });
    expect(cart).toBeTruthy();
  });
});
