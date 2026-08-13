// @ts-check
const { test, expect } = require('@playwright/test');
const { checkAllReq, completeRealGate } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

async function expectKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2015 real flows', () => {
  test('thesis REAL', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await clearKeys(page, ['itt15-thesis-ack']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectKey(page, 'itt15-thesis-ack');
  });

  test('Watch shipped config', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await clearKeys(page, ['itt15-watch']);
    await page.reload();
    await page.locator('[data-watch-shipped]').check();
    await page.locator('[data-watch15-save]').click();
    await expectKey(page, 'itt15-watch');
  });

  test('Win10 free upgrade REAL', async ({ page }) => {
    await page.goto('/years/2015/sites/windows10/index.html');
    await clearKeys(page, ['itt15-win10']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-win10-upgrade]').click();
    await expectKey(page, 'itt15-win10');
  });

  test('Edge download + prefer', async ({ page }) => {
    await page.goto('/years/2015/sites/edge/index.html');
    await clearKeys(page, ['itt15-edge']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-edge-download]').click();
    await expectKey(page, 'itt15-edge');
    await page.locator('[data-edge-prefer]').click();
    const raw = await expectKey(page, 'itt15-edge');
    expect(raw).toMatch(/prefer|true|download/i);
  });

  test('Periscope empty title blocked then go-live REAL', async ({ page }) => {
    await page.goto('/years/2015/sites/periscope/index.html');
    await clearKeys(page, ['itt15-periscope', 'itt15-periscope-live']);
    await page.reload();
    await page.waitForSelector('[data-live-go]', { timeout: 10000 });
    await page.locator('[data-live-go]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt15-periscope-live'))).toBeFalsy();
    await page.fill('[data-live-title]', 'Museum downtown walk');
    await checkAllReq(page);
    await page.locator('[data-live-go]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt15-periscope-live')), {
        timeout: 8000,
      })
      .toMatch(/downtown|Museum/i);
    await expectKey(page, 'itt15-periscope');
  });

  test('Photos + blockers REAL multi-step', async ({ page }) => {
    await page.goto('/years/2015/sites/googlephotos/index.html');
    await clearKeys(page, ['itt15-googlephotos', 'itt15-blockers']);
    await page.reload();
    await page.waitForTimeout(400);
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    await expectKey(page, 'itt15-googlephotos');

    await page.goto('/years/2015/sites/ios9/blockers.html');
    await page.reload();
    await page.waitForTimeout(400);
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    await expectKey(page, 'itt15-blockers');
  });

  test('Apple Music incomplete blocked then REAL', async ({ page }) => {
    await page.goto('/years/2015/sites/applemusic/index.html');
    await clearKeys(page, ['itt15-applemusic']);
    await page.reload();
    await page.locator('[data-itt-real-save][data-storage-key="applemusic"]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt15-applemusic'))).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="applemusic"]').click();
    await expectKey(page, 'itt15-applemusic');
  });

  test('Meerkat empty title blocked', async ({ page }) => {
    await page.goto('/years/2015/sites/meerkat/index.html');
    await clearKeys(page, ['itt15-meerkat-live', 'itt15-meerkat']);
    await page.reload();
    await page.waitForSelector('[data-live-go]', { timeout: 10000 });
    await page.locator('[data-live-go]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt15-meerkat-live'))).toBeFalsy();
    await page.fill('[data-live-title]', 'Meerkat museum live');
    await checkAllReq(page);
    await page.locator('[data-live-go]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt15-meerkat-live')), {
        timeout: 8000,
      })
      .toMatch(/Meerkat|museum/i);
  });

  test('Watch incomplete without shipped check', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await clearKeys(page, ['itt15-watch']);
    await page.reload();
    await page.locator('[data-watch15-save]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt15-watch'))).toBeFalsy();
    await page.locator('[data-watch-shipped]').check();
    await page.locator('[data-watch15-save]').click();
    await expectKey(page, 'itt15-watch');
  });

  test('prefix isolation no itt14 writes', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt14-') || k.startsWith('itt15-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt14-') || k.startsWith('itt15-'))
    );
    expect(keys.some((k) => k.startsWith('itt15-'))).toBeTruthy();
    expect(keys.filter((k) => k.startsWith('itt14-'))).toEqual([]);
  });
});
