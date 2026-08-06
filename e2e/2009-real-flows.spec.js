// @ts-check
/**
 * 2009 real localStorage flows — no soft mocks.
 * Every interactive action must mutate itt09-* keys and/or DOM after click.
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

test.describe('2009 real flows', () => {
  test('App Store install → itt09-apps', async ({ page }) => {
    await page.goto('/years/2009/sites/appstore/index.html');
    await clearKeys(page, 'itt09-apps');
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await page.locator('[data-appstore-install]').first().click();
    const after = JSON.parse((await requireKey(page, 'itt09-apps')) || '[]');
    expect(Array.isArray(after) ? after.length : 1).toBeGreaterThan(0);
  });

  test('Facebook Like → itt09-fb-likes', async ({ page }) => {
    await page.goto('/years/2009/sites/facebook/feed.html');
    await clearKeys(page, 'itt09-fb-likes');
    await page.reload();
    await page.waitForSelector('[data-fb-like]', { timeout: 20000 });
    await page.locator('[data-fb-like]').first().click();
    await requireKey(page, 'itt09-fb-likes');
  });

  test('FarmVille plant → itt09-farm', async ({ page }) => {
    await page.goto('/years/2009/sites/farmville/index.html');
    await clearKeys(page, 'itt09-farm');
    await page.reload();
    await page.locator('[data-farm-plant="strawberry"]').click();
    const raw = await requireKey(page, 'itt09-farm');
    expect(raw).toMatch(/strawberry/i);
  });

  test('Bing search → itt09-bing', async ({ page }) => {
    await page.goto('/years/2009/sites/bing/index.html');
    await clearKeys(page, 'itt09-bing');
    await page.reload();
    await page.waitForSelector('[data-bing-search]', { timeout: 20000 });
    if (await page.locator('[data-bing-search] input[name="q"]').count()) {
      await page.locator('[data-bing-search] input[name="q"]').fill('windows 7');
    }
    await page.locator('[data-bing-search]').evaluate((f) => f.requestSubmit());
    await requireKey(page, 'itt09-bing');
  });

  test('Twitter compose → itt09-tweets', async ({ page }) => {
    await page.goto('/years/2009/sites/twitter/index.html');
    await clearKeys(page, 'itt09-tweets');
    await page.reload();
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    await page.locator('[data-twitter-status], textarea').first().fill('real flow tweet 2009');
    await page.locator('[data-twitter-compose]').evaluate((f) => f.requestSubmit());
    const raw = await requireKey(page, 'itt09-tweets');
    expect(raw).toMatch(/real flow tweet 2009/i);
  });

  test('Foursquare check-in → itt09-4sq', async ({ page }) => {
    await page.goto('/years/2009/sites/foursquare/index.html');
    await clearKeys(page, 'itt09-4sq');
    await page.reload();
    await page.locator('[data-4sq-checkin]').first().click();
    await requireKey(page, 'itt09-4sq');
  });

  test('Kickstarter back → itt09-ks', async ({ page }) => {
    await page.goto('/years/2009/sites/kickstarter/index.html');
    await clearKeys(page, 'itt09-ks');
    await page.reload();
    await page.waitForSelector('[data-ks-back]', { timeout: 20000 });
    await page.locator('[data-ks-back]').first().click();
    await requireKey(page, 'itt09-ks');
  });

  test('Wave invite → itt09-wave', async ({ page }) => {
    await page.goto('/years/2009/sites/wave/index.html');
    await clearKeys(page, 'itt09-wave');
    await page.reload();
    await page.locator('[data-wave-invite]').click();
    await requireKey(page, 'itt09-wave');
  });

  test('Chrome download → itt09-chrome', async ({ page }) => {
    await page.goto('/years/2009/sites/chrome/index.html');
    await clearKeys(page, 'itt09-chrome');
    await page.reload();
    await page.locator('[data-chrome-download]').click();
    await requireKey(page, 'itt09-chrome');
  });

  test('Android Market install', async ({ page }) => {
    await page.goto('/years/2009/sites/android/market.html');
    await clearKeys(page, ['itt09-android-apps', 'itt09-android']);
    await page.reload();
    await page.waitForSelector('[data-android-install]', { timeout: 20000 });
    await page.locator('[data-android-install]').first().click();
    const raw = await page.evaluate(
      () => localStorage.getItem('itt09-android-apps') || localStorage.getItem('itt09-android')
    );
    expect(raw).toBeTruthy();
  });

  test('Gmail sign-in → itt09-gmail', async ({ page }) => {
    await page.goto('/years/2009/sites/gmail/index.html');
    await page.evaluate(() => {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt09-gmail') === 0) localStorage.removeItem(k);
      }
    });
    await page.reload();
    await page.waitForSelector('[data-gmail-login]', { timeout: 20000 });
    await page.locator('[data-gmail-login]').evaluate((f) => f.requestSubmit());
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt09-gmail')), { timeout: 8000 })
      .toBeTruthy();
  });

  test('Hulu play → itt09-hulu', async ({ page }) => {
    await page.goto('/years/2009/sites/hulu/index.html');
    await clearKeys(page, 'itt09-hulu');
    await page.reload();
    await page.waitForSelector('[data-hulu-play]', { timeout: 20000 });
    await page.locator('[data-hulu-play]').first().click();
    await requireKey(page, 'itt09-hulu');
  });

  test('Netflix queue → itt09-netflix-queue', async ({ page }) => {
    await page.goto('/years/2009/sites/netflix/index.html');
    await clearKeys(page, 'itt09-netflix-queue');
    await page.reload();
    await page.waitForSelector('[data-netflix-queue-form]', { timeout: 20000 });
    await page.locator('[data-netflix-q]').fill('Up');
    await page.locator('[data-netflix-queue-form]').evaluate((f) => f.requestSubmit());
    const raw = await requireKey(page, 'itt09-netflix-queue');
    expect(raw).toMatch(/Up/i);
  });

  test('Dropbox add file → itt09-dropbox-files', async ({ page }) => {
    await page.goto('/years/2009/sites/dropbox/index.html');
    await clearKeys(page, 'itt09-dropbox-files');
    await page.reload();
    await page.waitForSelector('[data-dropbox-add]', { timeout: 20000 });
    if (await page.locator('[data-dropbox-name]').count()) {
      await page.locator('[data-dropbox-name]').fill('notes-2009.txt');
    }
    await page.locator('[data-dropbox-add]').click();
    await requireKey(page, 'itt09-dropbox-files');
  });

  test('Spotify Europe join → itt09-spotify-eu', async ({ page }) => {
    await page.goto('/years/2009/sites/spotify/index.html');
    await clearKeys(page, 'itt09-spotify-eu');
    await page.reload();
    await page.waitForSelector('[data-spotify-join]', { timeout: 15000 });
    if (await page.locator('[data-spotify-invite]').count()) {
      await page.locator('[data-spotify-invite]').fill('EURO-2009');
    }
    await page.locator('[data-spotify-join]').click();
    await requireKey(page, 'itt09-spotify-eu');
  });

  test('Amazon cart mutates itt09 cart key', async ({ page }) => {
    await page.goto('/years/2009/sites/amazon/index.html');
    await page.evaluate(() => {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt09') === 0 && /cart/i.test(k)) localStorage.removeItem(k);
      }
    });
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    const cart = await page.evaluate(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt09') === 0 && /cart/i.test(k) && localStorage.getItem(k)) {
          return localStorage.getItem(k);
        }
      }
      return null;
    });
    expect(cart).toBeTruthy();
  });

  test('iPhone Safari history when present', async ({ page }) => {
    await page.goto('/years/2009/sites/iphone/index.html');
    await clearKeys(page, 'itt09-iphone-history');
    await page.reload();
    const browse = page.locator('[data-iphone-browse]');
    if ((await browse.count()) === 0) {
      test.skip(true, 'no iphone browse form on 2009 index');
      return;
    }
    await page.fill('[name="url"]', 'http://www.apple.com/');
    await browse.evaluate((f) => {
      if (f.requestSubmit) f.requestSubmit();
      else f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    await requireKey(page, 'itt09-iphone-history');
  });
});
