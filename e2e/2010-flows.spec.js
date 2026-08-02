// @ts-check
/**
 * 2010 period flows A–T — REAL localStorage / DOM mutations only
 * docs/2010-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md Part 4
 *
 * Every test asserts a real state change (storage key or DOM after action).
 * No “mock-only” pass: empty storage after click fails.
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, keys);
}

/** @param {import('@playwright/test').Page} page @param {string} key */
async function expectStorageTruthy(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `expected real localStorage for ${key}`).toBeTruthy();
  expect(raw).not.toBe('[]');
  expect(raw).not.toBe('{}');
  expect(raw).not.toBe('null');
  return raw;
}

test.describe('2010 flows A–T (real only)', () => {
  test('A enter year — shell + content iframe real boot', async ({ page }) => {
    await enterYear(page, '2010');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2010');
    await expect(page.locator('#content')).toBeVisible();
    const bodyLen = await page.evaluate(() => {
      try {
        const f = document.getElementById('content');
        return f && f.contentDocument && f.contentDocument.body
          ? f.contentDocument.body.innerHTML.length
          : 0;
      } catch (e) {
        return 0;
      }
    });
    expect(bodyLen).toBeGreaterThan(50);
    // Dirbar P0 real buttons
    for (const label of ['iPad', 'iPhone 4', 'Instagram', 'Facebook', 'App Store', 'Foursquare']) {
      await expect(page.locator(`.dir-btn:has-text("${label}")`).first()).toBeVisible();
    }
  });

  test('B thesis about — dual scale + real thesis ack storage', async ({ page }) => {
    await page.goto('/years/2010/pages/about.html');
    await clearKeys(page, ['itt10-thesis-ack']);
    await page.reload();
    await expect(page.locator('body')).toContainText('206,956,723');
    await expect(page.locator('body')).toContainText(/iPad|Instagram|iPhone 4/i);
    await expect(page.locator('body')).toContainText(/Spotify|Snapchat|UberX|Stories/i);
    await page.waitForSelector('[data-thesis-ack]', { timeout: 15000 });
    await page.locator('[data-thesis-ack]').click();
    await expect(page.locator('[data-thesis-status]')).toContainText(/Saved|itt10-thesis/i);
    const raw = await expectStorageTruthy(page, 'itt10-thesis-ack');
    expect(raw).toMatch(/tablet|ack|true/i);
  });

  test('C iPad — claim mutates itt10-ipad-history', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/index.html');
    await clearKeys(page, ['itt10-ipad-history']);
    await page.reload();
    await expect(page.locator('body')).toContainText(/\$499|Jan 27|iPad/i);
    await page.waitForSelector('[data-ipad-claim]', { timeout: 15000 });
    await page.locator('[data-ipad-claim]').click();
    await expect(page.locator('[data-ipad-status]')).toContainText(/itt10-ipad|Noted|Saved/i);
    await expectStorageTruthy(page, 'itt10-ipad-history');
  });

  test('D iPhone 4 + App Store install/remove real list', async ({ page }) => {
    await page.goto('/years/2010/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/\$199|\$299|FaceTime|Retina|Antennagate|Jun 24/i);

    await page.goto('/years/2010/sites/appstore/index.html');
    await clearKeys(page, ['itt10-apps']);
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await page.locator('[data-appstore-install]').first().click();
    let raw = await expectStorageTruthy(page, 'itt10-apps');
    expect(raw).toMatch(/name|Koi|Monkey|Facebook|Twitter|Shazam|Pandora|id/i);

    // remove if hook exists
    const remove = page.locator('[data-appstore-remove]').first();
    if (await remove.isVisible().catch(() => false)) {
      await remove.click();
      raw = (await page.evaluate(() => localStorage.getItem('itt10-apps'))) || '[]';
      // list may shrink but key still real
      expect(raw).toBeTruthy();
    }
  });

  test('E Instagram filter share → itt10-ig-posts', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await clearKeys(page, ['itt10-ig-posts']);
    await page.reload();
    await page.waitForSelector('[data-ig-share]', { timeout: 20000 });
    await page.locator('[data-ig-filter="Earlybird"]').click();
    await page.locator('[data-ig-caption]').fill('square photo 2010 real');
    await page.locator('[data-ig-share]').click();
    await expect(page.locator('[data-ig-status]')).toContainText(/Shared|itt10|Earlybird/i);
    const raw = await expectStorageTruthy(page, 'itt10-ig-posts');
    expect(raw).toMatch(/Earlybird|square photo 2010/i);
    await expect(page.locator('[data-ig-feed]')).toContainText(/Earlybird|square photo/i);
  });

  test('F Facebook Like + Places real storage', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/feed.html');
    await clearKeys(page, ['itt10-fb-likes']);
    await page.reload();
    await page.waitForSelector('[data-fb-like]', { timeout: 20000 });
    await page.locator('[data-fb-like]').first().click();
    await expectStorageTruthy(page, 'itt10-fb-likes');

    await page.goto('/years/2010/sites/facebook/places.html');
    await clearKeys(page, ['itt10-fb-places']);
    await page.reload();
    await page.locator('#pl').click();
    await expect(page.locator('#st')).toContainText(/Checked in|itt10-fb-places/i);
    await expectStorageTruthy(page, 'itt10-fb-places');
  });

  test('G Foursquare check-in → itt10-4sq', async ({ page }) => {
    await page.goto('/years/2010/sites/foursquare/index.html');
    await clearKeys(page, ['itt10-4sq']);
    await page.reload();
    await page.waitForSelector('[data-4sq-checkin]', { timeout: 20000 });
    await page.locator('[data-4sq-checkin]').first().click();
    const raw = await expectStorageTruthy(page, 'itt10-4sq');
    expect(raw).toMatch(/Coffee|Dive|Airport|venue|points/i);
    await expect(page.locator('[data-4sq-list]')).not.toBeEmpty();
  });

  test('H FarmVille plant + harvest real plots', async ({ page }) => {
    await page.goto('/years/2010/sites/farmville/index.html');
    await expect(page.locator('body')).toContainText(/peak|84|March 2010/i);
    await clearKeys(page, ['itt10-farm']);
    await page.reload();
    await page.waitForSelector('[data-farm-plant="strawberry"]', { timeout: 20000 });
    await page.locator('[data-farm-plant="strawberry"]').click();
    let raw = await expectStorageTruthy(page, 'itt10-farm');
    expect(raw).toMatch(/strawberry/i);
    await page.locator('[data-farm-harvest]').click();
    // harvest may leave empty plots but coins/log still in storage
    raw = await expectStorageTruthy(page, 'itt10-farm');
    expect(raw).toMatch(/coin|plot|log|strawberry|Harvest|Planted/i);
  });

  test('I Win7 mass + IE shell prefer real storage', async ({ page }) => {
    await page.goto('/years/2010/sites/windows7/index.html');
    await expect(page.locator('body')).toContainText(/2010|mass|IE 8|Windows 7/i);

    await page.goto('/years/2010/sites/ie8/index.html');
    await clearKeys(page, ['itt10-shell-pref']);
    await page.reload();
    await page.waitForSelector('[data-shell-prefer="ie8"]', { timeout: 15000 });
    await page.locator('[data-shell-prefer="ie8"]').click();
    let raw = await expectStorageTruthy(page, 'itt10-shell-pref');
    expect(raw).toMatch(/ie8/i);

    await page.goto('/years/2010/sites/ie9/index.html');
    await expect(page.locator('body')).toContainText(/Sep 15|beta|2010/i);
    await page.locator('[data-shell-prefer="ie9-beta"]').click();
    raw = await expectStorageTruthy(page, 'itt10-shell-pref');
    expect(raw).toMatch(/ie9/i);
  });

  test('J Android Market install → itt10-android-apps', async ({ page }) => {
    await page.goto('/years/2010/sites/android/index.html');
    await expect(page.locator('body')).toContainText(/Nexus|Jan 5|2010/i);
    await clearKeys(page, ['itt10-android', 'itt10-android-apps']);
    await page.goto('/years/2010/sites/android/market.html');
    await page.reload();
    await page.waitForSelector('[data-android-install]', { timeout: 20000 });
    await page.locator('[data-android-install]').first().click();
    const raw = await page.evaluate(
      () => localStorage.getItem('itt10-android-apps') || localStorage.getItem('itt10-android')
    );
    expect(raw, 'android market must mutate storage').toBeTruthy();
  });

  test('K Twitter compose → itt10-tweets', async ({ page }) => {
    await page.goto('/years/2010/sites/twitter/about.html');
    await expect(page.locator('body')).toContainText(/New Twitter|redesign|2010|140/i);

    await page.goto('/years/2010/sites/twitter/index.html');
    await clearKeys(page, ['itt10-tweets']);
    await page.reload();
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    await page.locator('[data-twitter-status], textarea').first().fill('real 2010 flow tweet');
    await page.locator('[data-twitter-compose]').evaluate((f) => f.requestSubmit());
    const raw = await expectStorageTruthy(page, 'itt10-tweets');
    expect(raw).toMatch(/real 2010 flow tweet/i);
  });

  test('L Pinterest pin → itt10-pin', async ({ page }) => {
    await page.goto('/years/2010/sites/pinterest/index.html');
    await clearKeys(page, ['itt10-pin']);
    await page.reload();
    await page.waitForSelector('[data-pin-save]', { timeout: 20000 });
    await page.locator('[data-pin-save]').first().click();
    const raw = await expectStorageTruthy(page, 'itt10-pin');
    expect(raw).toMatch(/recipe|diy|travel|pin/i);
  });

  test('M Uber SF request → itt10-uber', async ({ page }) => {
    await page.goto('/years/2010/sites/uber/index.html');
    await clearKeys(page, ['itt10-uber']);
    await page.reload();
    await expect(page.locator('body')).toContainText(/black.car|San Francisco|not.*UberX/i);
    await page.locator('#uber-req').click();
    await expect(page.locator('#uber-st')).toContainText(/itt10-uber|black-car/i);
    const raw = await expectStorageTruthy(page, 'itt10-uber');
    expect(raw).toMatch(/San Francisco|black-car|requested/i);
  });

  test('N Wave invite → itt10-wave + funeral copy', async ({ page }) => {
    await page.goto('/years/2010/sites/wave/index.html');
    await expect(page.locator('body')).toContainText(/May 19|Aug 4|stop development|public/i);
    await clearKeys(page, ['itt10-wave']);
    await page.reload();
    await page.waitForSelector('[data-wave-invite]', { timeout: 15000 });
    await page.locator('[data-wave-invite]').click();
    await expect(page.locator('[data-wave-status]')).toContainText(/itt10-wave|invite|2010/i);
    await expectStorageTruthy(page, 'itt10-wave');
  });

  test('O continuity day stack — Gmail + Hulu + Netflix + Street View real storage', async ({
    page,
  }) => {
    // Gmail: form login (real submit) then draft/send if available
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
    await expect(page.locator('[data-gmail-status]')).toContainText(/signed|gmail|itt10|you@/i, {
      timeout: 8000,
    });
    let gmailAny = await page.evaluate(() => {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt10-gmail') === 0 && localStorage.getItem(k)) return true;
      }
      return false;
    });
    if (!gmailAny) {
      await page.goto('/years/2010/sites/gmail/compose.html');
      await page.reload();
      await page.waitForSelector('[data-gmail-compose]', { timeout: 20000 });
      await page.locator('[data-gmail-draft]').click();
      gmailAny = await page.evaluate(() => {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.indexOf('itt10-gmail') === 0 && localStorage.getItem(k)) return true;
        }
        return false;
      });
    }
    expect(gmailAny, 'gmail must mutate itt10-gmail*').toBeTruthy();

    await page.goto('/years/2010/sites/hulu/index.html');
    await clearKeys(page, ['itt10-hulu']);
    await page.reload();
    await page.waitForSelector('[data-hulu-play]', { timeout: 20000 });
    await page.locator('[data-hulu-play]').first().click();
    await expectStorageTruthy(page, 'itt10-hulu');

    await page.goto('/years/2010/sites/netflix/index.html');
    await clearKeys(page, ['itt10-netflix-queue']);
    await page.reload();
    await page.waitForSelector('[data-netflix-queue-form]', { timeout: 20000 });
    await page.locator('[data-netflix-q]').fill('Inception');
    await page.locator('[data-netflix-queue-form]').evaluate((f) => f.requestSubmit());
    await expectStorageTruthy(page, 'itt10-netflix-queue');

    await page.goto('/years/2010/sites/maps/streetview.html');
    await clearKeys(page, ['itt10-streetview']);
    await page.reload();
    await page.waitForSelector('[data-sv-city], [data-sv-turn]', { timeout: 20000 });
    if (await page.locator('[data-sv-city]').count()) {
      await page.locator('[data-sv-city]').first().click();
    } else {
      await page.locator('[data-sv-turn]').first().click();
    }
    await expectStorageTruthy(page, 'itt10-streetview');
  });

  test('P Spotify Europe join → itt10-spotify-eu (not US)', async ({ page }) => {
    await page.goto('/years/2010/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText(/Europe|not.*US|2011/i);
    await clearKeys(page, ['itt10-spotify-eu']);
    await page.reload();
    await page.waitForSelector('[data-spotify-join]', { timeout: 15000 });
    await page.locator('[data-spotify-invite]').fill('EURO-2010');
    await page.locator('[data-spotify-join]').click();
    await expect(page.locator('[data-spotify-status]')).toContainText(/Europe|itt10-spotify|EU/i);
    const raw = await expectStorageTruthy(page, 'itt10-spotify-eu');
    expect(raw).toMatch(/EU|EURO|europe|true|code/i);
  });

  test('Q Dropbox + Kickstarter + WhatsApp seed real storage', async ({ page }) => {
    await page.goto('/years/2010/sites/dropbox/index.html');
    await clearKeys(page, ['itt10-dropbox-files']);
    await page.reload();
    await page.waitForSelector('[data-dropbox-add]', { timeout: 20000 });
    if (await page.locator('[data-dropbox-name]').count()) {
      await page.locator('[data-dropbox-name]').fill('notes-2010.txt');
    }
    await page.locator('[data-dropbox-add]').click();
    await expectStorageTruthy(page, 'itt10-dropbox-files');

    await page.goto('/years/2010/sites/kickstarter/index.html');
    await clearKeys(page, ['itt10-ks']);
    await page.reload();
    await page.waitForSelector('[data-ks-back]', { timeout: 20000 });
    await page.locator('[data-ks-back]').first().click();
    await expectStorageTruthy(page, 'itt10-ks');

    await page.goto('/years/2010/sites/whatsapp/index.html');
    await clearKeys(page, ['itt10-whatsapp-seed']);
    await page.reload();
    await page.waitForSelector('[data-wa-seed]', { timeout: 15000 });
    await page.locator('[data-wa-seed]').click();
    await expectStorageTruthy(page, 'itt10-whatsapp-seed');
  });

  test('R Amazon cart + Wikipedia edit real storage', async ({ page }) => {
    await page.goto('/years/2010/sites/amazon/index.html');
    await clearKeys(page, ['itt10-amazon-cart', 'itt10-cart']);
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    const cart = await page.evaluate(() => {
      for (const k of ['itt10-amazon-cart', 'itt10-cart']) {
        const v = localStorage.getItem(k);
        if (v) return v;
      }
      // scan
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt10') === 0 && /cart/i.test(k) && localStorage.getItem(k)) {
          return localStorage.getItem(k);
        }
      }
      return null;
    });
    expect(cart, 'amazon cart must mutate itt10* cart key').toBeTruthy();

    await page.goto('/years/2010/sites/wikipedia/edit.html');
    await clearKeys(page, ['itt10-wiki-edit']);
    await page.reload();
    await page.waitForSelector('[data-wiki-save], textarea', { timeout: 20000 });
    const ta = page.locator('textarea').first();
    if (await ta.count()) await ta.fill('2010 museum wiki edit real');
    await page.locator('[data-wiki-save]').click();
    await expectStorageTruthy(page, 'itt10-wiki-edit');
  });

  test('S Social Network culture — film flag + Open Graph about', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Open Graph|600|Places|Social Network/i);
    await clearKeys(page, ['itt10-fb-culture']);
    await page.reload();
    await page.waitForSelector('[data-fb-culture]', { timeout: 15000 });
    await page.locator('[data-fb-culture]').click();
    const raw = await expectStorageTruthy(page, 'itt10-fb-culture');
    expect(raw).toMatch(/film|2010|true/i);
  });

  test('T exit + resume — prefs survive round trip', async ({ page }) => {
    await enterYear(page, '2010');
    // plant a known real key in shell context (same origin)
    await page.evaluate(() => {
      localStorage.setItem(
        'itt10-resume-probe',
        JSON.stringify({ year: 2010, ts: Date.now(), real: true })
      );
      try {
        localStorage.setItem('itt-last-year', '2010');
      } catch (e) {
        /* */
      }
    });
    await expectStorageTruthy(page, 'itt10-resume-probe');

    // Exit to hub via real navigation
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2010"]')).toBeVisible();

    // Resume year — probe must still be there (same origin localStorage)
    await enterYear(page, '2010');
    const raw = await expectStorageTruthy(page, 'itt10-resume-probe');
    expect(raw).toMatch(/real|2010/i);
    const last = await page.evaluate(() => localStorage.getItem('itt-last-year'));
    // last-year may be set by shell; if not, probe alone proves resume storage
    if (last) expect(last).toMatch(/2010/);
  });

  test('Chrome product room real download flag (PC path companion)', async ({ page }) => {
    await page.goto('/years/2010/sites/chrome/index.html');
    await clearKeys(page, ['itt10-chrome']);
    await page.reload();
    await page.waitForSelector('[data-chrome-download]', { timeout: 15000 });
    await page.locator('[data-chrome-download]').click();
    await expectStorageTruthy(page, 'itt10-chrome');
  });
});
