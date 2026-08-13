// @ts-check
/**
 * 2015 flows A–T — storage-hard where product allows.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, checkAllReq } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

async function expectStorageTruthy(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2015 flows A–T', () => {
  test('A enter year — shell boot', async ({ page }) => {
    await enterYear(page, '2015');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2015');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B thesis about — dual scale + REAL', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await clearKeys(page, ['itt15-thesis-ack']);
    await page.reload();
    await expect(page.locator('body')).toContainText('863,105,652');
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectStorageTruthy(page, 'itt15-thesis-ack');
  });

  test('C–E Watch multipage config', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await clearKeys(page, ['itt15-watch']);
    await page.reload();
    await page.locator('[data-watch-shipped]').check();
    await page.locator('[data-watch15-save]').click();
    await expectStorageTruthy(page, 'itt15-watch');
    await page.goto('/years/2015/sites/apple/faces.html');
    await expect(page.locator('body')).toContainText(/face/i);
    await page.goto('/years/2015/sites/apple/pair.html');
    await expect(page.locator('body')).toContainText(/Pair/i);
  });

  test('F–G Win10 free upgrade', async ({ page }) => {
    await page.goto('/years/2015/sites/windows10/index.html');
    await clearKeys(page, ['itt15-win10']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-win10-upgrade]').click();
    await expectStorageTruthy(page, 'itt15-win10');
    await page.goto('/years/2015/sites/windows10/about.html');
    await expect(page.locator('body')).toContainText(/free upgrade|Win7 residual/i);
  });

  test('H–I Edge download + prefer', async ({ page }) => {
    await page.goto('/years/2015/sites/edge/index.html');
    await clearKeys(page, ['itt15-edge']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-edge-download]').click();
    await expectStorageTruthy(page, 'itt15-edge');
    await page.locator('[data-edge-prefer]').click();
    const raw = await expectStorageTruthy(page, 'itt15-edge');
    expect(raw).toMatch(/prefer|true|download/i);
  });

  test('J–L go live titled streams', async ({ page }) => {
    await page.goto('/years/2015/sites/periscope/index.html');
    await clearKeys(page, [
      'itt15-periscope',
      'itt15-periscope-live',
      'itt15-meerkat',
      'itt15-meerkat-live',
      'itt15-fblive',
      'itt15-fblive-live',
    ]);
    await page.reload();
    await page.fill('[data-live-title]', 'flow peri downtown');
    await checkAllReq(page);
    await page.locator('[data-live-go]').click();
    await expectStorageTruthy(page, 'itt15-periscope-live');

    await page.goto('/years/2015/sites/meerkat/index.html');
    await page.reload();
    await page.fill('[data-live-title]', 'flow meerkat sxsw');
    await checkAllReq(page);
    await page.locator('[data-live-go]').click();
    await expectStorageTruthy(page, 'itt15-meerkat-live');

    await page.goto('/years/2015/sites/fblive/index.html');
    await page.reload();
    await page.fill('[data-live-title]', 'flow fblive feed');
    await checkAllReq(page);
    await page.locator('[data-live-go]').click();
    await expectStorageTruthy(page, 'itt15-fblive-live');
  });

  test('M–N Apple Music trial', async ({ page }) => {
    await page.goto('/years/2015/sites/applemusic/trial.html');
    await clearKeys(page, ['itt15-applemusic']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="applemusic"]').click();
    await expectStorageTruthy(page, 'itt15-applemusic');
    await page.goto('/years/2015/sites/applemusic/beats1.html');
    await expect(page.locator('body')).toContainText(/Beats 1/i);
  });

  test('O–Q privacy + photos', async ({ page }) => {
    await page.goto('/years/2015/sites/ios9/blockers.html');
    await clearKeys(page, ['itt15-blockers', 'itt15-googlephotos']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    await expectStorageTruthy(page, 'itt15-blockers');

    await page.goto('/years/2015/sites/googlephotos/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    await expectStorageTruthy(page, 'itt15-googlephotos');
    await page.goto('/years/2015/sites/googlephotos/library.html');
    await expect(page.locator('body')).toContainText(/Library/i);
  });

  test('R–T densify gems storage', async ({ page }) => {
    await page.goto('/years/2015/sites/snapchat/discover.html');
    await clearKeys(page, [
      'itt15-snap-discover',
      'itt15-discord',
      'itt15-peach-canvas',
      'itt15-secret-end',
      'itt15-messenger-bots',
    ]);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="snap-discover"]').click();
    await expectStorageTruthy(page, 'itt15-snap-discover');

    await page.goto('/years/2015/sites/discord/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="discord"]').click();
    await expectStorageTruthy(page, 'itt15-discord');

    await page.goto('/years/2015/sites/peach/canvas.html');
    await page.reload();
    await page.locator('[data-peach-word]').fill('gif');
    await page.locator('[data-peach-fade]').check();
    await page.locator('[data-peach-lit]').check();
    await page.locator('[data-peach-save]').click();
    await expectStorageTruthy(page, 'itt15-peach-canvas');

    await page.goto('/years/2015/sites/secret/shutdown.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="secret-end"]').click();
    await expectStorageTruthy(page, 'itt15-secret-end');

    await page.goto('/years/2015/sites/messenger/bots.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="messenger-bots"]').click();
    await expectStorageTruthy(page, 'itt15-messenger-bots');
  });
});
