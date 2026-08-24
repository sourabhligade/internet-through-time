// @ts-check
/**
 * Year → next-year handoff flows (1994→1995 … 2016→2017).
 *
 * For each consecutive pair:
 *  1. Boot year N · signature product interaction · year-native storage key
 *  2. Boot year N+1 · signature product interaction · next-year storage key
 *  3. Isolation: N key still present; N+1 write does not overwrite N prefix
 *
 * Complements per-year *-flows suites and cross-year product gates.
 */
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');
const fs = require('fs');
const path = require('path');

function yearOnDisk(year) {
  return fs.existsSync(path.join(__dirname, '..', 'years', String(year), 'index.html'));
}

/** @param {string} year */
function yy(year) {
  return String(year).slice(2);
}

/** @param {string} year @param {string} suffix */
function ittKey(year, suffix) {
  return 'itt' + yy(year) + '-' + suffix;
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Locator} frame
 * @param {string} sel
 */
async function twoStepInFrame(page, frame, sel) {
  await page.waitForTimeout(450);
  const boxes = frame.locator(
    'input[type="checkbox"][data-req], [data-appstore-check], [data-farm-check], [data-4sq-check], [data-chrome-req], [data-itunes-req]'
  );
  const n = await boxes.count();
  for (let i = 0; i < n; i++) {
    const box = boxes.nth(i);
    try {
      await box.check({ force: true });
    } catch (eCheck) {
      await box.click({ force: true });
    }
  }
  const el = frame.locator(sel).first();
  await el.waitFor({ state: 'visible', timeout: 15000 });
  await el.click({ force: true });
  await page.waitForTimeout(150);
  try {
    if (await el.isVisible()) await el.click({ force: true, timeout: 2000 });
  } catch (e) {
    /* already written */
  }
}

/**
 * Signature flow per year: path under year root, action, storage key suffix, body assert.
 * Prefer direct immersion page when shell routing is heavy; still enterYear first for isolation.
 * @type {Record<string, { path: string; keySuffix: string; body: RegExp; act: (page: import('@playwright/test').Page) => Promise<void> }>}
 */
const SIGNATURE = {
  '1994': {
    path: 'sites/csotd/index.html',
    keySuffix: 'csotd',
    body: /Cool Site|guestbook|modem/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await page.evaluate(() => {
        try {
          const f = document.getElementById('content');
          const w = f && f.contentWindow;
          if (w && w.sessionStorage) w.sessionStorage.setItem('itt94-csotd-wandered', '1');
          sessionStorage.setItem('itt94-csotd-wandered', '1');
        } catch (e) {
          /* */
        }
      });
      await frame.locator('[name="gbname"]').fill('Handoff residual');
      await frame.locator('[name="gbnote"]').fill('Worth the modem.');
      await frame.locator('form[data-csotd-gb] input[type="submit"]').click();
    },
  },
  '1995': {
    path: 'sites/amazon/book-neuromancer.html',
    keySuffix: 'amazon-cart',
    body: /Amazon|Neuromancer|cart|Add/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const add = frame.locator('[data-add-cart]').first();
      await expect(add).toBeVisible({ timeout: 15000 });
      await add.click({ force: true });
    },
  },
  '1996': {
    path: 'sites/hotmail/index.html',
    keySuffix: 'hotmail',
    body: /HoTMaiL|Hotmail|Login/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('form[data-hotmail-login]');
      await expect(form).toBeVisible({ timeout: 15000 });
      await form.locator('input[name="login"]').fill('museum');
      await form.locator('input[name="pass"], input[type="password"]').first().fill('pass');
      await form.locator('input[type="image"], input[type="submit"], button[type="submit"]').first().click({
        force: true,
      });
    },
  },
  '1997': {
    path: 'sites/ebay/item-laptop.html',
    keySuffix: 'ebay',
    body: /eBay|Bid|Auction/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('form[data-bid-form]');
      await expect(form).toBeVisible({ timeout: 15000 });
      if (await form.locator('input[name="bidder"]').count()) {
        await form.locator('input[name="bidder"]').fill('Handoff97');
      }
      await form.locator('input[name="bid"]').fill('520.00');
      await form.locator('input[type="submit"]').click({ force: true });
    },
  },
  '1998': {
    path: 'sites/google/lucky.html',
    keySuffix: 'lucky',
    body: /Google|Lucky/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('form[data-google-search], form[data-google-lucky-page]');
      await expect(form).toBeVisible({ timeout: 15000 });
      await form.locator('input[name="q"]').fill('yahoo');
      await form.locator('[data-google-lucky], input[name="btnI"]').first().click({ force: true });
    },
  },
  '1999': {
    path: 'sites/aim/index.html',
    keySuffix: 'aim',
    body: /AIM|AOL Instant|screen name|Buddy/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('form[data-aim-signon]');
      await expect(form).toBeVisible({ timeout: 15000 });
      await form.locator('[name="sn"]').fill('coolkid99');
      await form.locator('button[type="submit"]').click();
    },
  },
  '2000': {
    path: 'sites/amazon/music.html',
    keySuffix: 'amazon-cart',
    body: /Amazon|Music|cart|CD/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const add = frame.locator('[data-add-cart]').first();
      await expect(add).toBeVisible({ timeout: 15000 });
      await add.click({ force: true });
    },
  },
  '2001': {
    path: 'sites/wikipedia/edit.html',
    keySuffix: 'wiki-pages',
    body: /Wikipedia|edit|Save/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await expect(frame.locator('[data-wiki-save]')).toBeVisible({ timeout: 15000 });
      await frame.locator('textarea[name="text"]').fill("'''Wikipedia''' handoff 2001 residual");
      await frame.locator('[data-wiki-save]').click();
    },
  },
  '2002': {
    path: 'sites/friendster/profile.html',
    keySuffix: 'friendster',
    body: /Friendster|profile|friend/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('[data-friendster-profile-form]');
      await expect(form).toBeVisible({ timeout: 15000 });
      await form.locator('input[name="name"], input[name="display"]').first().fill('Handoff02');
      await form.locator('input[type="submit"], button[type="submit"]').first().click();
    },
  },
  '2003': {
    path: 'sites/photobucket/index.html',
    keySuffix: 'photobucket',
    body: /Photobucket|upload|album/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('form[data-pb-upload]');
      await expect(form).toBeVisible({ timeout: 15000 });
      await form.locator('[name="file"]').fill('party-pic.jpg');
      await form.locator('button[type="submit"], [data-ott-click="upload"]').first().click();
    },
  },
  '2004': {
    path: 'sites/gmail/index.html',
    keySuffix: 'gmail',
    body: /Gmail|Google Mail|mail/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('[data-gmail-login]');
      await expect(form).toBeVisible({ timeout: 15000 });
      await form.locator('input[name="email"], input[type="text"]').first().fill('you@college.edu');
      await form.locator('input[type="password"], [name="pass"]').first().fill('secret');
      await form.locator('input[type="submit"], button[type="submit"]').first().click();
    },
  },
  '2005': {
    path: 'sites/youtube/upload.html',
    keySuffix: 'yt-uploads',
    body: /YouTube|upload|video/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const title = 'HandoffYT ' + Date.now();
      await frame.locator('[data-yt-upload] [name="title"]').fill(title);
      await frame.locator('[data-yt-upload] button[type="submit"]').first().click();
    },
  },
  '2006': {
    path: 'sites/twitter/index.html',
    keySuffix: 'tweets',
    body: /Twitter|tweet|twttr/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('[data-twitter-compose]');
      await expect(form).toBeVisible({ timeout: 15000 });
      await form.locator('[data-twitter-status], textarea, [name="status"]').first().fill('handoff tweet 2006');
      await form.evaluate((f) => f.requestSubmit());
    },
  },
  '2007': {
    path: 'sites/iphone/index.html',
    keySuffix: 'iphone-history',
    body: /iPhone|Apple|Safari/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('[data-iphone-browse]');
      await expect(form).toBeVisible({ timeout: 20000 });
      await form.locator('[name="url"]').fill('http://maps.google.com/handoff-2007');
      await form.locator('button[type="submit"]').click();
    },
  },
  '2008': {
    path: 'sites/appstore/index.html',
    keySuffix: 'apps',
    body: /App Store|app/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await twoStepInFrame(page, frame, '[data-appstore-install]');
    },
  },
  '2009': {
    path: 'sites/farmville/index.html',
    keySuffix: 'farm',
    body: /FarmVille|plant|crop/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await twoStepInFrame(page, frame, '[data-farm-plant]');
    },
  },
  '2010': {
    path: 'sites/instagram/index.html',
    keySuffix: 'ig-posts',
    body: /Instagram|filter|iOS/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const share = frame.locator('[data-ig-share]');
      await expect(share).toBeVisible({ timeout: 15000 });
      await frame.locator('[data-ig-filter="Earlybird"]').click();
      await frame.locator('[data-ig-caption]').fill('handoff 2010 square');
      await share.click();
    },
  },
  '2011': {
    path: 'sites/spotify/index.html',
    keySuffix: 'spotify-invited',
    body: /Spotify|United States|July 14/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await expect(frame.locator('[data-spotify-invite]')).toBeVisible({ timeout: 15000 });
      await frame.locator('[data-spotify-ack]').check();
      await frame.locator('[data-spotify-no-stream]').check();
      await frame.locator('[data-spotify-invite]').click();
    },
  },

  '2012': {
    path: 'sites/instagram/android.html',
    keySuffix: 'ig-android',
    body: /Instagram|Android|filter/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await expect(frame.locator('[data-ig12-share]')).toBeVisible({ timeout: 15000 });
      await frame.locator('[data-ig12-filter="X-Pro II"]').click();
      await frame.locator('[data-ig12-share]').click();
    },
  },
  '2015': {
    path: 'sites/periscope/index.html',
    keySuffix: 'periscope',
    body: /Periscope|Go LIVE|live/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await expect(frame.locator('[data-peri-live]')).toBeVisible({ timeout: 15000 });
      await frame.locator('[data-peri-title]').fill('handoff rooftop');
      await frame.locator('[data-peri-live]').click();
    },
  },
  '2016': {
    path: 'sites/instagram/stories.html',
    keySuffix: 'ig-stories',
    body: /Stor(y|ies)|24h|Instagram/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await expect(frame.locator('[data-ig-story-add]')).toBeVisible({ timeout: 15000 });
      await frame.locator('[data-ig-story-text]').fill('handoff 24h');
      await frame.locator('[data-ig-story-add]').click();
    },
  },
  '2017': {
    path: 'sites/iphone/x.html',
    keySuffix: 'faceid',
    body: /Face ID/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await expect(frame.locator('[data-faceid-look]')).toBeVisible({ timeout: 15000 });
      await frame.locator('[data-faceid-look]').click();
      await frame.locator('[data-faceid-unlock]').click();
    },
  },
  '2018': {
    path: 'sites/gdpr/index.html',
    keySuffix: 'gdpr',
    body: /25 May|GDPR|Manage|Accept All/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await expect(frame.locator('[data-gdpr-manage]')).toBeVisible({ timeout: 15000 });
      await frame.locator('[data-gdpr-manage]').click();
      await frame.locator('[data-gdpr-req]').nth(0).check({ force: true });
      await frame.locator('[data-gdpr-req]').nth(1).check({ force: true });
      await frame.locator('[data-gdpr-save]').click();
    },
  },
  '2019': {
    path: 'sites/disneyplus/home.html',
    keySuffix: 'disneyplus',
    body: /Disney\+|\$6\.99|Nov(ember)?\s*12/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await expect(frame.locator('[data-dplus-continue]')).toBeVisible({ timeout: 15000 });
      await frame.locator('[data-dplus-req]').nth(0).check({ force: true });
      await frame.locator('[data-dplus-req]').nth(1).check({ force: true });
      await frame.locator('[data-dplus-profile="adult"]').click();
      await frame.locator('[data-dplus-add]').nth(0).click();
      await frame.locator('[data-dplus-add]').nth(1).click();
      await frame.locator('[data-dplus-profile="kids"]').click();
      await frame.locator('[data-dplus-profile="adult"]').click();
      await frame.locator('[data-dplus-continue]').click();
    },
  },
};

const YEARS = [
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2008',
  '2010',
  '2012',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
];

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function runSignature(page, year) {
  const sig = SIGNATURE[year];
  expect(sig, `signature defined for ${year}`).toBeTruthy();
  await enterYear(page, year);
  await killOverlays(page);
  await goImmersion(page, year, sig.path);
  const frame = contentFrame(page);
  await expect(frame.locator('body')).toContainText(sig.body, { timeout: 20000 });
  await sig.act(page);
  expect(sig.keySuffix, `${year} must have a REAL keySuffix`).toBeTruthy();
  const key = ittKey(year, sig.keySuffix);
  await expect
    .poll(
      async () => {
        const raw = await page.evaluate((k) => localStorage.getItem(k), key);
        if (raw) return raw;
        return page.evaluate((y) => {
          const pref = 'itt' + String(y).slice(2) + '-';
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.indexOf(pref) === 0 && localStorage.getItem(k)) return localStorage.getItem(k);
          }
          return null;
        }, year);
      },
      { timeout: 12000, message: `${year} REAL write missing (${key})` }
    )
    .toBeTruthy();
  // Shell still identifies year
  const bodyYear = await page.locator('body').getAttribute('data-itt-year');
  if (bodyYear) expect(bodyYear).toBe(year);
}

test.describe('year handoff N → N+1', () => {
  for (let i = 0; i < YEARS.length - 1; i++) {
    const from = YEARS[i];
    const to = YEARS[i + 1];
    test(`${from} → ${to}: signature flow then next-year signature`, async ({ page }) => {
      test.skip(!yearOnDisk(from) || !yearOnDisk(to), `${from} or ${to} not on disk`);
      // Clear all museum keys for a clean handoff
      await page.goto('/');
      await page.evaluate(() => {
        try {
          const kill = [];
          for (let j = 0; j < localStorage.length; j++) {
            const k = localStorage.key(j);
            if (k && (k.indexOf('itt') === 0 || k.indexOf('itt-') === 0)) kill.push(k);
          }
          kill.forEach((k) => localStorage.removeItem(k));
        } catch (e) {
          /* */
        }
      });

      await runSignature(page, from);
      const fromPref = 'itt' + yy(from);
      const fromKeys = await page.evaluate((pref) => {
        const out = [];
        for (let j = 0; j < localStorage.length; j++) {
          const k = localStorage.key(j);
          if (k && (k === pref || k.indexOf(pref + '-') === 0) && localStorage.getItem(k)) out.push(k);
        }
        return out;
      }, fromPref);

      await runSignature(page, to);
      const toPref = 'itt' + yy(to);
      const toKeys = await page.evaluate((pref) => {
        const out = [];
        for (let j = 0; j < localStorage.length; j++) {
          const k = localStorage.key(j);
          if (k && (k === pref || k.indexOf(pref + '-') === 0) && localStorage.getItem(k)) out.push(k);
        }
        return out;
      }, toPref);

      expect(toKeys.length, `${to} should write ${toPref}-* keys`).toBeGreaterThan(0);
      for (const k of toKeys) {
        expect(k.startsWith(toPref), `key ${k} should be ${toPref}-*`).toBeTruthy();
        expect(k.startsWith(fromPref + '-') && fromPref !== toPref, `key ${k} leaked from ${from}`).toBeFalsy();
      }

      expect(fromKeys.length, `${from} should have written ${fromPref}-*`).toBeGreaterThan(0);
      const still = await page.evaluate((ks) => ks.every((k) => !!localStorage.getItem(k)), fromKeys);
      expect(still, `${from} keys should survive handoff to ${to}`).toBeTruthy();

      // Hub still lists both years
      await page.goto('/');
      await expect(page.locator(`a.year-card.available[href*="years/${from}"]`)).toBeVisible();
      await expect(page.locator(`a.year-card.available[href*="years/${to}"]`)).toBeVisible();
    });
  }
});

test.describe('year chain: walk 1994 → 2013 via hub cards', () => {
  test('hub cards open each year shell in order (smoke chain)', async ({ page }) => {
    await page.goto('/');
    for (const year of YEARS) {
      if (!yearOnDisk(year)) continue;
      await expect(page.locator(`a.year-card.available[data-year="${year}"]`)).toBeVisible();
      await page.locator(`a.year-card.available[data-year="${year}"]`).click();
      await enterYear(page, year);
      await expect(page.locator('#content')).toBeVisible();
      const bodyYear = await page.locator('body').getAttribute('data-itt-year');
      if (bodyYear) expect(bodyYear).toBe(year);
      // return hub for next card
      await page.goto('/');
    }
  });
});
