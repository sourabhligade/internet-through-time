// @ts-check
/**
 * Every live year Starting Point is a lean door:
 *  - guided 6 + star + dest-unique official trail (7–10 websites)
 *  - leftover warehouse not first paint
 *  - official flow hrefs resolve (no 404)
 */
const { test, expect } = require('@playwright/test');

const { completeRealGate, twoStepClick, checkAllReq, killOverlays, isLiveYear } = require('./helpers');

const fs = require('fs');
const path = require('path');

const YEARS = [];
for (let y = 1994; y <= 2022; y++) {
  const home = path.join(__dirname, '..', 'years', String(y), 'pages', 'home.html');
  if (fs.existsSync(home) && isLiveYear(String(y))) YEARS.push(String(y));
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

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function officialTrailHrefs(page, year) {
  const hrefs = await page.evaluate(() => {
    /** @type {string[]} */
    const out = [];
    const root = document.querySelector('[data-itt-ten-flows]');
    if (!root) return out;
    root.querySelectorAll('a[href*="sites/"]').forEach((a) => {
      const h = a.getAttribute('href') || '';
      if (h) out.push(h.split('?')[0].split('#')[0]);
    });
    return out;
  });
  expect(hrefs.length, `${year} official dests`).toBeGreaterThanOrEqual(7);
  expect(hrefs.length, `${year} official dests`).toBeLessThanOrEqual(10);
  const pages = hrefs.map((h) => h.replace(/\\/g, "/").toLowerCase());
  expect(new Set(pages).size, `${year} official dests must be unique hrefs`).toBe(pages.length);
  return hrefs;
}

test.describe('Year home lean door · guided 6 + dest-unique official trail', () => {
  for (const y of YEARS) {
    test(`${y} first paint is guided 6 + star + dest-unique official trail`, async ({ page }) => {
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${y} ol > li`)).toHaveCount(6);
      await expect(page.locator(`[data-ott-one-thing="${y}"]`)).toBeVisible();
      const items = page.locator(`#ott-flows-${y} [data-itt-ten-flows] > li`);
      const n = await items.count();
      expect(n, `${y} official list`).toBeGreaterThanOrEqual(7);
      expect(n, `${y} official list`).toBeLessThanOrEqual(10);
      await officialTrailHrefs(page, y);
      await expect(page.locator(`[data-itt-pop3x="${y}"]`)).toHaveCount(0);
      await expect(page.locator(`[data-itt-pop-more="${y}"]`)).toHaveCount(0);
      await expect(page.locator(`[data-itt-pop-3x3="${y}"]`)).toHaveCount(0);
      await expect(page.locator('[data-itt-2x-unique], [data-itt-3x-links], [data-itt-densify]')).toHaveCount(0);
      await expect(page.locator('a[href*="map.html"]').first()).toBeVisible();

      const siteLinks = page.locator('a[href*="../sites/"], a[href*="/sites/"]');
      expect(await siteLinks.count(), `${y} site links`).toBeGreaterThanOrEqual(7);
      const first = siteLinks.first();
      await expect(first).toBeVisible();
      const href = await first.getAttribute('href');
      expect(href).toBeTruthy();
      const abs = new URL(/** @type {string} */ (href), page.url()).pathname;
      const res = await page.request.get(abs);
      expect(res.status(), `GET ${abs}`).toBeLessThan(400);
    });

    test(`${y} official trail hrefs resolve and dests are unique`, async ({ page }) => {
      await page.goto(`/years/${y}/pages/home.html`);
      const hrefs = await officialTrailHrefs(page, y);
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


