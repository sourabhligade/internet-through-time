// @ts-check
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

async function expectKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2019 real flows', () => {
  test('thesis REAL', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await clearKeys(page, ['itt19-thesis-ack']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectKey(page, 'itt19-thesis-ack');
  });

  test('TikTok empty blocked then REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/tiktok/index.html');
    await clearKeys(page, ['itt19-tiktok']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-tt-post]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt19-tiktok'))).toBeFalsy();
    await page.locator('[data-tt-caption]').fill('live fyp');
    await page.locator('[data-tt-post]').click();
    await expectKey(page, 'itt19-tiktok');
  });

  test('Disney+ incomplete blocked then REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/disneyplus/index.html');
    await clearKeys(page, ['itt19-disneyplus']);
    await page.reload();
    await page.locator('[data-dplus-join]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt19-disneyplus'))).toBeFalsy();
    await page.locator('[data-dplus-plan]').selectOption('monthly');
    await checkAllReq(page);
    await page.locator('[data-dplus-join]').click();
    await expectKey(page, 'itt19-disneyplus');
  });

  test('Arcade REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/arcade/index.html');
    await clearKeys(page, ['itt19-arcade']);
    await page.reload();
    await page.locator('[data-arcade-game]').selectOption('oceanhorn2');
    await checkAllReq(page);
    await page.locator('[data-arcade-start]').click();
    await expectKey(page, 'itt19-arcade');
  });

  test('iPhone 11 REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/iphone/iphone11.html');
    await clearKeys(page, ['itt19-iphone11']);
    await page.reload();
    await page.locator('[data-ip11-color]').selectOption('purple');
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone11"]').click();
    await expectKey(page, 'itt19-iphone11');
  });

  test('AirPods Pro REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/airpodspro/index.html');
    await clearKeys(page, ['itt19-airpods-pro']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-airpods-pro-save]').click();
    await expectKey(page, 'itt19-airpods-pro');
  });

  test('Stadia REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/stadia/index.html');
    await clearKeys(page, ['itt19-stadia']);
    await page.reload();
    await page.locator('[data-stadia-tier]').selectOption('founders');
    await checkAllReq(page);
    await page.locator('[data-stadia-claim]').click();
    await expectKey(page, 'itt19-stadia');
  });

  test('Apple TV+ REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/appletv/index.html');
    await clearKeys(page, ['itt19-appletv']);
    await page.reload();
    await page.locator('[data-tv-show]').selectOption('morningshow');
    await checkAllReq(page);
    await page.locator('[data-tv-start]').click();
    await expectKey(page, 'itt19-appletv');
  });

  test('prefix isolation no itt16 writes', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt16-') || k.startsWith('itt19-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save]').click();
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt16-') || k.startsWith('itt19-'))
    );
    expect(keys.some((k) => k.startsWith('itt19-'))).toBeTruthy();
    expect(keys.filter((k) => k.startsWith('itt16-'))).toEqual([]);
  });

  test('AirPods Pro incomplete blocked then REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/airpodspro/index.html');
    await clearKeys(page, ['itt19-airpods-pro']);
    await page.reload();
    await page.locator('[data-airpods-pro-save]').click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt19-airpods-pro'))).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-airpods-pro-save]').click();
    await expectKey(page, 'itt19-airpods-pro');
  });

  test('Disney+ queue requires join multipage REAL', async ({ page }) => {
    await clearKeys(page, ['itt19-disneyplus']);
    await page.goto('/years/2019/sites/disneyplus/queue.html');
    await page.reload();
    await page.locator('[data-dplus-title]').fill('The Mandalorian');
    await checkAllReq(page);
    await page.locator('[data-dplus-queue]').click();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem('itt19-disneyplus'))).toBeFalsy();

    await page.goto('/years/2019/sites/disneyplus/index.html');
    await page.locator('[data-dplus-plan]').selectOption('annual');
    await checkAllReq(page);
    await page.locator('[data-dplus-join]').click();
    await expectKey(page, 'itt19-disneyplus');

    await page.goto('/years/2019/sites/disneyplus/queue.html');
    await page.locator('[data-dplus-title]').fill('The Mandalorian');
    await checkAllReq(page);
    await page.locator('[data-dplus-queue]').click();
    const raw = await expectKey(page, 'itt19-disneyplus');
    expect(raw).toMatch(/Mandalorian/i);
  });

  test('Stadia stream requires claim multipage REAL', async ({ page }) => {
    await clearKeys(page, ['itt19-stadia']);
    await page.goto('/years/2019/sites/stadia/stream.html');
    await page.reload();
    await page.locator('[data-stadia-game]').fill('Destiny 2');
    await checkAllReq(page);
    await page.locator('[data-stadia-stream]').click();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem('itt19-stadia'))).toBeFalsy();

    await page.goto('/years/2019/sites/stadia/index.html');
    await page.locator('[data-stadia-tier]').selectOption('pro');
    await checkAllReq(page);
    await page.locator('[data-stadia-claim]').click();
    await expectKey(page, 'itt19-stadia');

    await page.goto('/years/2019/sites/stadia/stream.html');
    await page.locator('[data-stadia-game]').fill('Destiny 2');
    await checkAllReq(page);
    await page.locator('[data-stadia-stream]').click();
    const raw = await expectKey(page, 'itt19-stadia');
    expect(raw).toMatch(/Destiny/i);
  });
});
