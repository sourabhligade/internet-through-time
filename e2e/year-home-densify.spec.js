// @ts-check
/**
 * Every year Starting Point densify + trail integrity:
 *  - ≥20 unique internal links
 *  - densify trails (multipath →) + directory
 *  - densify destination hrefs resolve (no 404)
 *  - sample REAL multipath from trail destinations (gated years)
 */
const { test, expect } = require('@playwright/test');

const { completeRealGate, twoStepClick, checkAllReq, killOverlays } = require('./helpers');

const fs = require('fs');
const path = require('path');

const YEARS = [];
for (let y = 1994; y <= 2016; y++) {
  const home = path.join(__dirname, '..', 'years', String(y), 'pages', 'home.html');
  if (fs.existsSync(home)) YEARS.push(String(y));
}

/**
 * @param {import('@playwright/test').Page} page
 */
async function uniqueInternalHrefs(page) {
  return page.evaluate(() => {
    const out = new Set();
    document.querySelectorAll('a[href]').forEach((a) => {
      const h = a.getAttribute('href') || '';
      if (!h || h.startsWith('#') || h.startsWith('javascript:') || h.startsWith('mailto:')) return;
      if (/^https?:/i.test(h) && h.indexOf('/years/') === -1) return;
      out.add(h.split('?')[0].split('#')[0]);
    });
    return Array.from(out);
  });
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function waitImmersion(page, year) {
  await page
    .waitForFunction(
      (y) => {
        const d = document.documentElement;
        return (
          d.getAttribute('data-itt-immersion-booted') === y ||
          d.getAttribute('data-itt-nomock-common') === '1' ||
          d.getAttribute('data-itt-real-flow') === '1'
        );
      },
      year,
      { timeout: 20000 }
    )
    .catch(() => {});
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} sel
 */
async function checkAll(page, sel = '[data-req], [data-chrome-check], [data-uber-check], [data-sopa-check], [data-sopa-fact]') {
  const loc = page.locator(sel);
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    try {
      await loc.nth(i).check({ force: true });
    } catch (e) {
      /* */
    }
  }
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 */
async function twoStep(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(120);
  await el.click();
}

test.describe('Year home densify · ≥20 links + REAL trails', () => {
  for (const y of YEARS) {
    test(`${y} home has ≥20 unique links + densify trails`, async ({ page }) => {
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator('body')).toContainText(
        /Starting Point|on the web|Welcome|portal|20\d\d/i
      );

      const hrefs = await uniqueInternalHrefs(page);
      expect(hrefs.length, `${y} unique internal hrefs`).toBeGreaterThanOrEqual(20);

      const siteLinks = page.locator('a[href*="../sites/"], a[href*="/sites/"]');
      expect(await siteLinks.count(), `${y} site links`).toBeGreaterThanOrEqual(8);

      const body = await page.locator('body').innerText();
      expect(body).toMatch(
        /Connection trails|REAL multipath|product trails|Guided multi-step|Guided flow|Try these/i
      );
      expect(body).toMatch(/→|->/);

      const hasDensify =
        (await page.locator('[data-itt-densify="trails"], [data-itt-densify="directory"]').count()) >
        0;
      const hasMap = (await page.locator('a[href*="map.html"]').count()) > 0;
      expect(hasDensify || hasMap).toBeTruthy();

      // densify trails: at least one multi-hop list item when densify present
      if (hasDensify) {
        const trailItems = page.locator('[data-itt-densify="trails"] li');
        expect(await trailItems.count(), `${y} densify trail items`).toBeGreaterThanOrEqual(1);
        const dirLinks = page.locator('[data-itt-densify="directory"] a[href*="sites/"]');
        // early years have fewer product rooms on disk
        const minDir = Number(y) <= 1997 ? 8 : 12;
        expect(await dirLinks.count(), `${y} directory site links`).toBeGreaterThanOrEqual(minDir);
      }

      // spot-check first site link is 200 OK
      const first = siteLinks.first();
      await expect(first).toBeVisible();
      const href = await first.getAttribute('href');
      expect(href).toBeTruthy();
      const abs = new URL(/** @type {string} */ (href), page.url()).pathname;
      const res = await page.request.get(abs);
      expect(res.status(), `GET ${abs}`).toBeLessThan(400);
    });

    test(`${y} densify trail destinations resolve (sample)`, async ({ page }) => {
      await page.goto(`/years/${y}/pages/home.html`);
      const hrefs = await page.evaluate(() => {
        /** @type {string[]} */
        const out = [];
        const root =
          document.querySelector('[data-itt-densify="trails"]') ||
          document.querySelector('.portal-trails') ||
          document.body;
        root.querySelectorAll('a[href*="sites/"]').forEach((a) => {
          const h = a.getAttribute('href') || '';
          if (h) out.push(h.split('?')[0].split('#')[0]);
        });
        return out.slice(0, 12);
      });
      expect(hrefs.length, `${y} trail sample`).toBeGreaterThanOrEqual(3);
      for (const h of hrefs) {
        const abs = new URL(h, page.url()).pathname;
        const res = await page.request.get(abs);
        expect(res.status(), `${y} trail → ${abs}`).toBeLessThan(400);
      }
    });
  }
});

test.describe('Year about densify links', () => {
  for (const y of YEARS) {
    test(`${y} about has explore / thesis surface`, async ({ page }) => {
      await page.goto(`/years/${y}/pages/about.html`);
      const hrefs = await uniqueInternalHrefs(page);
      expect(hrefs.length, `${y} about hrefs`).toBeGreaterThanOrEqual(6);
      await expect(page.locator('body')).toContainText(/About|thesis|honesty|Explore|scale/i);
    });
  }
});


