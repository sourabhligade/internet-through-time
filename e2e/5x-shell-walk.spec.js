// @ts-check
/**
 * Visitor path: year shell iframe · F1 complete · Next lands on F2.
 * Direct-URL 5× specs can pass while the shell walk is broken.
 */
const { test, expect } = require('@playwright/test');

const fs = require('fs');
const path = require('path');
const { enterYear, goInFrame, contentFrame, killOverlays } = require('./helpers');
function yearOnDisk(year) {
  return fs.existsSync(path.join(__dirname, '..', 'years', String(year), 'index.html'));
}
const matrix = require('./5x-recheck.matrix.json');

async function iframeKey(page, key) {
  return page.evaluate((k) => {
    try {
      const f = document.getElementById('content');
      const w = f && f.contentWindow;
      return w && w.localStorage ? w.localStorage.getItem(k) : localStorage.getItem(k);
    } catch (e) {
      try {
        return localStorage.getItem(k);
      } catch (e2) {
        return null;
      }
    }
  }, key);
}

async function iframeClear(page, key) {
  await page.evaluate((k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      /* */
    }
    try {
      const f = document.getElementById('content');
      if (f && f.contentWindow && f.contentWindow.localStorage) f.contentWindow.localStorage.removeItem(k);
    } catch (e2) {
      /* */
    }
  }, key);
}

for (const yearPack of matrix.panel) {
  const year = String(yearPack.year);
  const f1 = yearPack.flows[0];
  const f2 = yearPack.flows[1];

  test(`${year} shell F1 empty never writes · complete · Next → F2`, async ({ page }) => {
    await enterYear(page, year);
    await iframeClear(page, f1.key);
    await goInFrame(page, f1.room);
    await killOverlays(page);
    const frame = contentFrame(page);
    const save = frame.locator('[data-5x-save]').first();
    await expect(save).toBeVisible({ timeout: 15000 });
    await save.click();
    await expect.poll(async () => iframeKey(page, f1.key)).toBeFalsy();
    await frame.locator('[data-5x-req="a"]').first().check();
    await frame.locator('[data-5x-req="b"]').first().check();
    const extra = frame.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => iframeKey(page, f1.key), { timeout: 8000 }).toBeTruthy();
    const next = frame.locator('[data-5x-loop] [data-5x-next] a').first();
    await expect(next).toBeVisible();
    await next.click();
    await page.waitForFunction(
      (needle) => {
        try {
          const f = document.getElementById('content');
          const src = ((f && f.getAttribute('src')) || '') + '';
          const path = (f && f.contentWindow && f.contentWindow.location && f.contentWindow.location.pathname) || '';
          return src.indexOf(needle) !== -1 || path.indexOf(needle) !== -1;
        } catch (e) {
          return false;
        }
      },
      f2.room.replace(/^\//, ''),
      { timeout: 20000 }
    );
    /* Native gold F2 (FishCam, Hotmail, AuctionWeb…) has no checkbox plaque. */
    const save2 = contentFrame(page).locator('[data-5x-save]').first();
    if ((await save2.count()) === 0) {
      await expect(contentFrame(page).locator('body')).toBeVisible();
      return;
    }
    await expect(save2).toBeVisible({ timeout: 15000 });
  });
}

const GOLD_WALKS = [
  { year: '2010', room: 'sites/instagram/index.html', empty: async (f) => f.locator('[data-ig-share]').click(), fill: async (f) => { await f.locator('[data-ig-filter="Earlybird"]').click(); await f.locator('[data-ig-caption]').fill('shell 5x'); }, save: '[data-ig-share]', key: 'itt10-ig-posts', nextFrag: 'ipad' },
  { year: '2011', room: 'sites/spotify/index.html', empty: async (f) => f.locator('[data-spotify-invite]').click(), fill: async (f) => { await f.locator('[data-spotify-ack]').check(); await f.locator('[data-spotify-no-stream]').check(); }, save: '[data-spotify-invite]', key: 'itt11-spotify-invited', nextFrag: 'timeline' },
  { year: '2019', room: 'sites/tiktok/index.html', empty: async (f) => f.locator('[data-tt-post]').click(), fill: async (f) => { const req = f.locator('[data-tt-req]'); const n = await req.count(); for (let i = 0; i < n; i++) await req.nth(i).check(); await f.locator('[data-tt-caption]').fill('shell fyp'); await f.locator('[data-tt-post]').click(); await f.locator('[data-tt-caption]').fill('second leftover'); }, save: '[data-tt-post]', key: 'itt19-tiktok', nextFrag: 'arcade' },
];

for (const g of GOLD_WALKS) {
  test(`${g.year} shell gold F1 empty never writes · Next`, async ({ page }) => {
    test.skip(!yearOnDisk(g.year), g.year + ' not on disk');
    await enterYear(page, g.year);
    await iframeClear(page, g.key);
    await goInFrame(page, g.room);
    await killOverlays(page);
    const frame = contentFrame(page);
    await g.empty(frame);
    await expect.poll(async () => iframeKey(page, g.key)).toBeFalsy();
    await g.fill(frame);
    await frame.locator(g.save).click();
    await expect.poll(async () => iframeKey(page, g.key), { timeout: 8000 }).toBeTruthy();
    await expect(frame.locator(`[data-itt${g.year.slice(2)}-next] a[href*="${g.nextFrag}"]`).first()).toBeVisible();
  });
}
