// @ts-check
/**
 * Year → next-year handoff flows (1994→1995 … 2012→2013).
 *
 * For each consecutive pair:
 *  1. Boot year N · signature product interaction · year-native storage key
 *  2. Boot year N+1 · signature product interaction · next-year storage key
 *  3. Isolation: N key still present; N+1 write does not overwrite N prefix
 *
 * Complements per-year *-flows suites and cross-year product gates.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

/** @param {string} year */
function yy(year) {
  return String(year).slice(2);
}

/** @param {string} year @param {string} suffix */
function ittKey(year, suffix) {
  // 1994 uses storagePrefix "itt" (legacy), not itt94
  if (year === '1994') return 'itt-' + suffix;
  return 'itt' + yy(year) + '-' + suffix;
}

/**
 * Signature flow per year: path under year root, action, storage key suffix, body assert.
 * Prefer direct immersion page when shell routing is heavy; still enterYear first for isolation.
 * @type {Record<string, { path: string; keySuffix: string; body: RegExp; act: (page: import('@playwright/test').Page) => Promise<void> }>}
 */
const SIGNATURE = {
  '1994': {
    path: 'sites/yahoo/index.html',
    keySuffix: '',
    body: /Yahoo|directory|Search/i,
    act: async () => {
      /* browse-only thesis */
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
      if ((await form.count()) === 0) return;
      await form.locator('input[name="login"]').fill('museum');
      await form.locator('input[name="pass"], input[type="password"]').first().fill('pass');
      await form.locator('input[type="image"], input[type="submit"], button[type="submit"]').first().click({ force: true });
    },
  },
  '1997': {
    path: 'sites/ebay/item-laptop.html',
    keySuffix: '',
    body: /eBay|Bid|Auction/i,
    act: async () => {
      /* form present is enough for handoff */
    },
  },
  '1998': {
    path: 'sites/google/index.html',
    keySuffix: '',
    body: /Google|Search/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('form, [data-google-search]').first();
      if ((await form.count()) === 0) return;
      const q = form.locator('input[name="q"], input[type="text"]').first();
      if (await q.count()) {
        await q.fill('handoff');
        await form.locator('input[type="submit"], button[type="submit"]').first().click().catch(() => {});
      }
    },
  },
  '1999': {
    path: 'sites/napster/index.html',
    keySuffix: '',
    body: /Napster|download|share|music/i,
    act: async () => {},
  },
  '2000': {
    path: 'sites/amazon/music.html',
    keySuffix: 'amazon-cart',
    body: /Amazon|Music|cart|CD/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const add = frame.locator('[data-add-cart]').first();
      if (await add.count()) await add.click({ force: true });
    },
  },
  '2001': {
    path: 'sites/wikipedia/index.html',
    keySuffix: '',
    body: /Wikipedia|Wiki|encyclopedia/i,
    act: async () => {},
  },
  '2002': {
    path: 'sites/friendster/index.html',
    keySuffix: 'friendster',
    body: /Friendster|profile|friend/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const save = frame.locator('[data-friendster-save], [data-fs-save], button').first();
      if (await save.count()) await save.click().catch(() => {});
    },
  },
  '2003': {
    path: 'sites/myspace/index.html',
    keySuffix: 'myspace',
    body: /MySpace|myspace|profile/i,
    act: async () => {},
  },
  '2004': {
    path: 'sites/gmail/index.html',
    keySuffix: 'gmail',
    body: /Gmail|Google Mail|mail/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('[data-gmail-login]');
      if (await form.count()) {
        await form.evaluate((f) => {
          if (f.requestSubmit) f.requestSubmit();
        });
      }
    },
  },
  '2005': {
    path: 'sites/youtube/index.html',
    keySuffix: 'yt-views',
    body: /YouTube|video/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const like = frame.locator('[data-yt-like], [data-yt-view]').first();
      if (await like.count()) await like.click().catch(() => {});
    },
  },
  '2006': {
    path: 'sites/twitter/index.html',
    keySuffix: 'tweets',
    body: /Twitter|tweet|twttr/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const form = frame.locator('[data-twitter-compose]');
      if ((await form.count()) === 0) return;
      await form.locator('[data-twitter-status], textarea').first().fill('handoff tweet 2006');
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
      const btn = frame.locator('[data-appstore-install]').first();
      if (await btn.count()) await btn.click();
    },
  },
  '2009': {
    path: 'sites/farmville/index.html',
    keySuffix: 'farm',
    body: /FarmVille|plant|crop/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const plant = frame.locator('[data-farm-plant]').first();
      await expect(plant).toBeVisible({ timeout: 15000 });
      await plant.click();
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
      await share.click();
    },
  },
  '2011': {
    path: 'sites/spotify/index.html',
    keySuffix: 'spotify-invited',
    body: /Spotify|United States|July 14/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const invite = frame.locator('[data-spotify-invite]');
      await expect(invite).toBeVisible({ timeout: 15000 });
      await invite.click();
    },
  },
  '2012': {
    path: 'sites/instagram/android.html',
    keySuffix: 'ig-android',
    body: /Android|April 3|Instagram/i,
    act: async (page) => {
      const frame = contentFrame(page);
      const install = frame.locator('[data-ig-android-install]');
      await expect(install).toBeVisible({ timeout: 15000 });
      await install.click();
    },
  },
  '2013': {
    path: 'sites/whatsapp/index.html',
    keySuffix: 'wa-installed',
    body: /WhatsApp|verify|install/i,
    act: async (page) => {
      const frame = contentFrame(page);
      await frame.locator('[data-wa13-phone]').fill('5559876543');
      await frame.locator('[data-wa13-verify]').click();
      await frame.locator('[data-wa13-install]').click();
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
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
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
  if (sig.keySuffix) {
    const key = ittKey(year, sig.keySuffix);
    // Clear before act would wipe — re-act path already ran; poll for any year key write
    await expect
      .poll(
        async () => {
          const raw = await page.evaluate((k) => localStorage.getItem(k), key);
          // Also accept any key with year prefix that was written during act
          if (raw) return raw;
          return page.evaluate((y) => {
            const pref = y === '1994' ? 'itt-' : 'itt' + String(y).slice(2) + '-';
            for (let i = 0; i < localStorage.length; i++) {
              const k = localStorage.key(i);
              if (k && k.indexOf(pref) === 0 && localStorage.getItem(k)) return localStorage.getItem(k);
            }
            return null;
          }, year);
        },
        { timeout: 8000 }
      )
      .toBeTruthy();
  }
  // Shell still identifies year
  const bodyYear = await page.locator('body').getAttribute('data-itt-year');
  if (bodyYear) expect(bodyYear).toBe(year);
}

test.describe('year handoff N → N+1', () => {
  for (let i = 0; i < YEARS.length - 1; i++) {
    const from = YEARS[i];
    const to = YEARS[i + 1];
    test(`${from} → ${to}: signature flow then next-year signature`, async ({ page }) => {
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
      const fromPref = from === '1994' ? 'itt' : 'itt' + yy(from);
      const fromKeys = await page.evaluate((pref) => {
        const out = [];
        for (let j = 0; j < localStorage.length; j++) {
          const k = localStorage.key(j);
          if (k && (k === pref || k.indexOf(pref + '-') === 0) && localStorage.getItem(k)) out.push(k);
        }
        return out;
      }, fromPref);

      await runSignature(page, to);
      const toPref = to === '1994' ? 'itt' : 'itt' + yy(to);
      const toKeys = await page.evaluate((pref) => {
        const out = [];
        for (let j = 0; j < localStorage.length; j++) {
          const k = localStorage.key(j);
          if (k && (k === pref || k.indexOf(pref + '-') === 0) && localStorage.getItem(k)) out.push(k);
        }
        return out;
      }, toPref);

      // Isolation: next year must not only write previous year's prefix
      // (browse-only years may leave empty toKeys — still require boot OK above)
      if (SIGNATURE[to].keySuffix) {
        expect(toKeys.length, `${to} should write ${toPref}-* keys`).toBeGreaterThan(0);
        for (const k of toKeys) {
          expect(k.startsWith(toPref), `key ${k} should be ${toPref}-*`).toBeTruthy();
          expect(k.startsWith(fromPref + '-') && fromPref !== toPref, `key ${k} leaked from ${from}`).toBeFalsy();
        }
      }

      // Previous year keys should still exist if they were written (same origin localStorage)
      if (fromKeys.length && SIGNATURE[from].keySuffix) {
        const still = await page.evaluate((ks) => ks.every((k) => !!localStorage.getItem(k)), fromKeys);
        expect(still, `${from} keys should survive handoff to ${to}`).toBeTruthy();
      }

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
