// @ts-check
/**
 * 2015 multi-hop trails — storage required on each step.
 */
const { test, expect } = require('@playwright/test');
const { checkAllReq } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `trail missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2015 trail T1 — Wearable', () => {
  test('Watch face → band → shipped check', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await clearKeys(page, ['itt15-watch']);
    await page.reload();
    await page.locator('[data-watch-face]').selectOption('modular');
    await page.locator('[data-watch-band]').selectOption('milanese');
    await page.locator('[data-watch-shipped]').check();
    await page.locator('[data-watch15-save]').click();
    const raw = await requireKey(page, 'itt15-watch');
    expect(raw).toMatch(/modular|milanese|2015-04-24|shipped/i);
    await page.goto('/years/2015/sites/apple/faces.html');
    await expect(page.locator('body')).toContainText(/Modular|Sport/i);
  });
});

test.describe('2015 trail T2 — Free OS', () => {
  test('Win10 free → Edge download → prefer', async ({ page }) => {
    await page.goto('/years/2015/sites/windows10/index.html');
    await clearKeys(page, ['itt15-win10', 'itt15-edge']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-win10-upgrade]').click();
    await requireKey(page, 'itt15-win10');

    await page.goto('/years/2015/sites/edge/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-edge-download]').click();
    await requireKey(page, 'itt15-edge');
    await page.locator('[data-edge-prefer]').click();
    const edge = await requireKey(page, 'itt15-edge');
    expect(edge).toMatch(/prefer|true|download/i);
  });
});

test.describe('2015 trail T3 — Go live', () => {
  test('Meerkat → Periscope → FB Live titles required', async ({ page }) => {
    await clearKeys(page, [
      'itt15-meerkat-live',
      'itt15-periscope-live',
      'itt15-fblive-live',
      'itt15-meerkat',
      'itt15-periscope',
      'itt15-fblive',
    ]);

    await page.goto('/years/2015/sites/meerkat/index.html');
    await page.reload();
    await page.fill('[data-live-title]', 'trail meerkat live');
    await checkAllReq(page);
    await page.locator('[data-live-go]').click();
    await requireKey(page, 'itt15-meerkat-live');

    await page.goto('/years/2015/sites/periscope/index.html');
    await page.reload();
    await page.fill('[data-live-title]', 'trail peri live');
    await checkAllReq(page);
    await page.locator('[data-live-go]').click();
    await requireKey(page, 'itt15-periscope-live');

    await page.goto('/years/2015/sites/fblive/index.html');
    await page.reload();
    await page.fill('[data-live-title]', 'trail fb live');
    await checkAllReq(page);
    await page.locator('[data-live-go]').click();
    await requireKey(page, 'itt15-fblive-live');
  });
});

test.describe('2015 trail T4 — Privacy', () => {
  test('blockers → Google Photos', async ({ page }) => {
    await page.goto('/years/2015/sites/ios9/blockers.html');
    await clearKeys(page, ['itt15-blockers', 'itt15-googlephotos']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    await requireKey(page, 'itt15-blockers');

    await page.goto('/years/2015/sites/googlephotos/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    await requireKey(page, 'itt15-googlephotos');
  });
});

test.describe('2015 trail T5 — Music', () => {
  test('Apple Music trial REAL', async ({ page }) => {
    await page.goto('/years/2015/sites/applemusic/trial.html');
    await clearKeys(page, ['itt15-applemusic']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="applemusic"]').click();
    await requireKey(page, 'itt15-applemusic');
    await page.goto('/years/2015/sites/applemusic/beats1.html');
    await expect(page.locator('body')).toContainText(/Beats 1/i);
  });
});
