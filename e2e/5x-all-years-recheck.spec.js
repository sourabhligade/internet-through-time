// @ts-check
/**
 * From-scratch 5× recheck — every leftover F-loop, every year.
 * Empty / one-check never writes · complete is REAL JSON · Next href is live
 * · reload persists · neighbor prefix absent · chips + guided 6 · chain click.
 */
const { test, expect } = require('@playwright/test');

const fs = require('fs');
const path = require('path');
const matrix = require('./5x-recheck.matrix.json');

function yearOnDisk(year) {
  return fs.existsSync(path.join(__dirname, '..', 'years', String(year), 'index.html'));
}

/** @param {import('@playwright/test').Page} page */
async function getKey(page, key) {
  return page.evaluate((k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }, key);
}

/** @param {import('@playwright/test').Page} page */
async function clearKey(page, key) {
  await page.evaluate((k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      /* */
    }
  }, key);
}

/** @param {import('@playwright/test').Page} page */
async function neighborLeaks(page, yy) {
  return page.evaluate((prefix) => {
    const bad = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || '';
      if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + prefix + '-') !== 0) bad.push(k);
    }
    return bad;
  }, yy);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} href
 */
async function expectLive(page, href) {
  const url = new URL(href, page.url());
  const res = await page.request.get(url.pathname + url.search);
  expect(res.status(), url.pathname).toBe(200);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {number} n
 */
async function tickChecks(page, n) {
  const letters = ['a', 'b', 'c', 'd'];
  for (let i = 0; i < n; i++) {
    const box = page.locator(`[data-5x-req="${letters[i]}"]`).first();
    if (await box.count()) await box.check();
  }
}

const GOLD_HOMES = [
  { year: 2008, star: 'sites/github/issue.html', chipMin: 4 },
  { year: 2010, star: 'sites/instagram/index.html', chipMin: 4 },
];

for (const yearPack of matrix.panel) {
  const year = yearPack.year;
  const yy = yearPack.yy;

  test.describe(`${year} 5× recheck`, () => {
    test.skip(!yearOnDisk(year), String(year) + ' not on disk');
    for (const fl of yearPack.flows) {
      test(`${fl.suffix} empty / one-check / REAL / persist / Next live`, async ({ page }) => {
        const href = `/years/${year}/${fl.room}`;
        await page.goto(href);
        expect((await page.request.get(href)).status()).toBe(200);
        await clearKey(page, fl.key);
        await page.reload();

        /* Native golds (FishCam, bid form, Lucky, etc.) have no checkbox plaque.
           Those writers are locked by e2e/YYYY-5x-live.spec.js — here we prove the room is live. */
        const save = page.locator('[data-5x-save]').first();
        if ((await save.count()) === 0) {
          if (fl.next) {
            const nextAbs = fl.next.indexOf('sites/') === 0 || fl.next.indexOf('pages/') === 0
              ? `/years/${year}/${fl.next}`
              : fl.next;
            await expectLive(page, nextAbs);
          }
          return;
        }
        await expect(save).toBeVisible();

        await save.click();
        await expect.poll(async () => getKey(page, fl.key)).toBeFalsy();

        await page.locator('[data-5x-req="a"]').first().check();
        await save.click();
        await expect.poll(async () => getKey(page, fl.key)).toBeFalsy();

        await tickChecks(page, fl.checks || 2);
        await save.click();
        await expect.poll(async () => getKey(page, fl.key), { timeout: 8000 }).toBeTruthy();
        const raw = (await getKey(page, fl.key)) || '';
        const blob = JSON.parse(raw);
        expect(blob.real === true || blob.multiStep === true).toBeTruthy();
        expect(String(blob.year || year)).toMatch(String(year));
        expect(await neighborLeaks(page, yy)).toEqual([]);

        if (fl.next) {
          const nextA = page.locator('[data-5x-loop] [data-5x-next] a').first();
          await expect(nextA).toBeVisible();
          const nextHref = await nextA.getAttribute('href');
          expect(nextHref).toBeTruthy();
          await expectLive(page, nextHref);
        }

        await page.reload();
        await expect.poll(async () => getKey(page, fl.key)).toBeTruthy();
        if (fl.next) {
          await expect(page.locator('[data-5x-loop] [data-5x-next] a').first()).toBeVisible();
        }
      });
    }

    test(`home chips + guided 6 + star live`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const chips = page.locator(`#ott-5x-${year} a`);
      await expect(chips).toHaveCount(6);
      const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
      expect(hrefs.length).toBe(6);
      for (const h of hrefs) {
        expect(h).toMatch(/sites\//);
        await expectLive(page, h);
      }
      expect((await page.request.get(`/years/${year}/${yearPack.star}`)).status()).toBe(200);
    });

    test(`F1 Next walks to F2`, async ({ page }) => {
      const f1 = yearPack.flows[0];
      const f2 = yearPack.flows[1];
      await page.goto(`/years/${year}/${f1.room}`);
      await clearKey(page, f1.key);
      await page.reload();
      const save1 = page.locator('[data-5x-save]').first();
      if ((await save1.count()) === 0) {
        expect((await page.request.get(`/years/${year}/${f2.room}`)).status()).toBe(200);
        return;
      }
      await tickChecks(page, f1.checks || 2);
      await save1.click();
      await expect.poll(async () => getKey(page, f1.key), { timeout: 8000 }).toBeTruthy();
      const nextA = page.locator('[data-5x-loop] [data-5x-next] a').first();
      await expect(nextA).toBeVisible();
      await nextA.click();
      await expect(page).toHaveURL(new RegExp(f2.room.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      /* F2 may be a native gold (no plaque) — room live is enough. */
      if ((await page.locator('[data-5x-save]').count()) === 0) {
        expect((await page.request.get(page.url())).status()).toBe(200);
        return;
      }
      await expect(page.locator('[data-5x-save]').first()).toBeVisible();
    });
  });
}

test.describe('gold 2008 + 2010 lock + chips live', () => {
  for (const g of GOLD_HOMES) {
    test(`${g.year} guided 6 · chips live · star live`, async ({ page }) => {
      await page.goto(`/years/${g.year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${g.year} ol > li`)).toHaveCount(6);
      const chips = page.locator(`#ott-5x-${g.year} a`);
      await expect(chips.first()).toBeVisible();
      expect(await chips.count()).toBeGreaterThanOrEqual(g.chipMin);
      const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
      for (const h of hrefs) {
        if (!h || h.startsWith('#')) continue;
        await expectLive(page, h);
      }
      expect((await page.request.get(`/years/${g.year}/${g.star}`)).status()).toBe(200);
    });
  }
});
