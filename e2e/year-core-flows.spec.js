// @ts-check
/**
 * Core shell flows for every exhibit year 1994–2012.
 * Covers: boot · home content · dirbar · home button · start menu · location Go.
 */
const { test, expect } = require('@playwright/test');
const {
  enterYear,
  contentFrame,
  killOverlays,
  clickAllDirbar,
  exerciseStartMenu,
  goInFrame,
} = require('./helpers');

const YEARS = [
  '1994', '1995', '1996', '1997', '1998', '1999',
  '2000', '2001', '2002', '2003', '2004', '2005',
  '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013',
];

/** Location bar hint that should resolve inside each year (when known). */
const LOCATION_HINT = {
  '1995': { type: 'yahoo', re: /yahoo/i },
  '1996': { type: 'yahoo', re: /yahoo/i },
  '1997': { type: 'ebay', re: /ebay/i },
  '1998': { type: 'google', re: /google/i },
  '1999': { type: 'napster', re: /napster/i },
  '2000': { type: 'amazon', re: /amazon/i },
  '2001': { type: 'wikipedia', re: /wikipedia|wiki/i },
  '2002': { type: 'google', re: /google/i },
  '2003': { type: 'myspace', re: /myspace/i },
  '2004': { type: 'gmail', re: /gmail|mail/i },
  '2005': { type: 'youtube', re: /youtube/i },
  '2006': { type: 'twitter', re: /twitter|twttr/i },
  '2007': { type: 'iphone', re: /iphone|apple/i },
  /* Prefer keys that exist in each year's locationHints map */
  '2008': { type: 'iphone', re: /iphone/i },
  '2009': { type: 'bing', re: /bing/i },
  '2010': { type: 'chrome', re: /chrome/i },
  '2011': { type: 'spotify', re: /spotify/i },
  '2012': { type: 'instagram', re: /instagram/i },
  '2013': { type: 'vine', re: /vine/i },
};

for (const year of YEARS) {
  test.describe(`year-core ${year}`, () => {
    test(`shell boots + home content + chrome visible`, async ({ page }) => {
      await enterYear(page, year);
      await expect(page.locator('#content')).toBeVisible();
      await expect(page.locator('#location')).toBeVisible();
      await expect(page.locator('#btn-home')).toBeVisible();
      await expect(page.locator('#btn-back')).toBeVisible();
      const body = contentFrame(page).locator('body');
      await expect(body).not.toBeEmpty({ timeout: 15000 });
      const text = await body.innerText();
      expect(text.length).toBeGreaterThan(40);
    });

    test(`every dirbar button navigates content`, async ({ page }) => {
      await enterYear(page, year);
      const count = await page.locator('#dirbar .dir-btn[data-go]').count();
      test.skip(count === 0, 'no dirbar buttons');
      const fails = await clickAllDirbar(page, { min: Math.min(4, count) });
      expect(fails, fails.join('\n')).toEqual([]);
    });

    test(`toolbar Home returns to starting point`, async ({ page }) => {
      await enterYear(page, year);
      // leave home
      const firstGo = page.locator('#dirbar .dir-btn[data-go]').nth(1);
      if (await firstGo.count()) {
        await killOverlays(page);
        await firstGo.click({ force: true });
        await page.waitForTimeout(600);
      } else {
        await goInFrame(page, 'pages/home.html');
      }
      await killOverlays(page);
      await page.locator('#btn-home').click({ force: true });
      await page.waitForFunction(() => {
        try {
          const f = document.getElementById('content');
          const src = (f && f.getAttribute('src')) || '';
          return /home\.html|pages\/home/i.test(src);
        } catch (e) {
          return false;
        }
      }, null, { timeout: 15000 });
      await expect(contentFrame(page).locator('body')).toBeVisible();
    });

    test(`Start menu Settings + Run (when present)`, async ({ page }) => {
      await enterYear(page, year);
      const result = await exerciseStartMenu(page);
      if (result.skipped) {
        test.skip(true, 'no Start data-start-cmd on this year');
        return;
      }
      expect(result.prefsOpen, 'Settings should open prefs').toBeTruthy();
      expect(result.runOpen, 'Run should open Open Location').toBeTruthy();
    });

    test(`Museum hub link leaves immersion (UX U2)`, async ({ page }) => {
      /* Spot-check a few years so suite stays fast; path is same pattern all years. */
      test.skip(!['1995', '2005', '2010'].includes(year), 'spot-check only');
      await enterYear(page, year);
      await killOverlays(page);
      const frame = contentFrame(page);
      const hub = frame.locator('a[href*="index.html"][target="_top"]').filter({ hasText: /Museum hub/i }).first();
      await expect(hub).toBeVisible({ timeout: 15000 });
      await hub.click();
      await page.waitForURL((url) => {
        const p = url.pathname || '';
        return p === '/' || p === '/index.html' || /\/index\.html$/.test(p) && !/\/years\//.test(p);
      }, { timeout: 15000 });
      await expect(page.locator('body')).toContainText(/Internet Through Time|Directory of years|How to use/i);
      await expect(page).not.toHaveURL(new RegExp(`/years/${year}/?$`));
    });

    test(`location bar Enter resolves signature hint`, async ({ page }) => {
      const hint = LOCATION_HINT[year];
      test.skip(!hint, 'no location hint for year');
      await enterYear(page, year);
      await killOverlays(page);
      const loc = page.locator('#location');
      await loc.fill(hint.type);
      // Early years (NN) have no #btn-go — Enter is the period behavior
      const hasGo = await page.locator('#btn-go').count();
      if (hasGo) {
        await page.locator('#btn-go').click({ force: true });
      } else {
        await loc.press('Enter');
      }
      await page.waitForFunction(
        (reSrc) => {
          try {
            const f = document.getElementById('content');
            const src = ((f && f.getAttribute('src')) || '').toLowerCase();
            return new RegExp(reSrc, 'i').test(src);
          } catch (e) {
            return false;
          }
        },
        hint.re.source,
        { timeout: 15000 }
      );
      const src = (await page.locator('#content').getAttribute('src')) || '';
      expect(src).toMatch(hint.re);
    });
  });
}
