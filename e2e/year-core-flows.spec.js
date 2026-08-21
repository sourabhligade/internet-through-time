// @ts-check
/**
 * Core shell flows for every exhibit year 1994–2018.
 * Covers: boot · home content · dirbar · home button · start menu · location Go.
 */
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const {
  enterYear,
  contentFrame,
  killOverlays,
  clickAllDirbar,
  exerciseStartMenu,
  goInFrame,
  waitForImmersion,
} = require('./helpers');

const YEARS = [
  '1994', '1995', '1996', '1997', '1998', '1999',
  '2000', '2001', '2002', '2003', '2004', '2005',
  '2006', '2007', '2008', '2010', '2012', '2015', '2016', '2017', '2018', '2019',
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
  '2007': { type: 'iphone', re: /iphone/i },

  /* Prefer keys that exist in each year's locationHints map */
  '2008': { type: 'iphone', re: /iphone/i },

  '2010': { type: 'instagram', re: /instagram/i },

  '2015': { type: 'periscope', re: /periscope|live/i },
  '2016': { type: 'stories', re: /stor(y|ies)|instagram/i },
  '2017': { type: 'faceid', re: /face.?id|iphone.?x|animoji|no.?home/i },
  '2018': { type: 'gdpr', re: /gdpr|cookie|consent|manage|banner/i },
  '2019': { type: 'disneyplus', re: /disney|who's watching|continue|trial/i },
};

for (const year of YEARS) {
  test.describe(`year-core ${year}`, () => {
    test(`shell boots + home content + chrome visible`, async ({ page }) => {
      await enterYear(page, year);
      await waitForImmersion(page, year);
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
      test.skip(!['1995', '2005', '2008'].includes(year), 'spot-check only');
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
      await page.waitForFunction(
        () => !!(window.ITT && ITT.activeBrowser && typeof ITT.activeBrowser.navigate === 'function'),
        null,
        { timeout: 15000 }
      );
      const loc = page.locator('#location');
      await loc.click({ force: true });
      await loc.fill(hint.type);
      // Enter is the period behavior. Do not also click Go after Enter —
      // the bar is rewritten to a display URL and a second Go can remap.
      await loc.press('Enter');
      await page.waitForFunction(
        (reSrc) => {
          try {
            const f = document.getElementById('content');
            const src = ((f && f.getAttribute('src')) || '').toLowerCase();
            if (new RegExp(reSrc, 'i').test(src)) return true;
            const loc = f && f.contentWindow && f.contentWindow.location;
            if (loc) {
              const path = ((loc.pathname || '') + (loc.search || '')).toLowerCase();
              if (new RegExp(reSrc, 'i').test(path)) return true;
            }
            return false;
          } catch (e) {
            return false;
          }
        },
        hint.re.source,
        { timeout: 25000 }
      );
      const src = (await page.locator('#content').getAttribute('src')) || '';
      expect(src).toMatch(hint.re);
    });
  });
}
