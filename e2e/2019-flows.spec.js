// @ts-check
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

test.describe('2019 flows A–T', () => {
  test('A enter year — shell boot', async ({ page }) => {
    await enterYear(page, '2019');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2019');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B thesis about REAL', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await clearKeys(page, ['itt19-thesis-ack']);
    await page.reload();
    await expect(page.locator('body')).toContainText('1,630,322,579');
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectStorageTruthy(page, 'itt19-thesis-ack');
  });

  test('C TikTok write', async ({ page }) => {
    await page.goto('/years/2019/sites/tiktok/index.html');
    await clearKeys(page, ['itt19-tiktok']);
    await page.reload();
    await page.locator('[data-tt-caption]').fill('flow fyp');
    await checkAllReq(page);
    await page.locator('[data-tt-post]').click();
    await expectStorageTruthy(page, 'itt19-tiktok');
  });

  test('D Disney+ join', async ({ page }) => {
    await page.goto('/years/2019/sites/disneyplus/index.html');
    await clearKeys(page, ['itt19-disneyplus']);
    await page.reload();
    await page.locator('[data-dplus-plan]').selectOption('bundle');
    await checkAllReq(page);
    await page.locator('[data-dplus-join]').click();
    await expectStorageTruthy(page, 'itt19-disneyplus');
  });

  test('E Arcade trial', async ({ page }) => {
    await page.goto('/years/2019/sites/arcade/index.html');
    await clearKeys(page, ['itt19-arcade']);
    await page.reload();
    await page.locator('[data-arcade-game]').selectOption('sonic');
    await checkAllReq(page);
    await page.locator('[data-arcade-start]').click();
    await expectStorageTruthy(page, 'itt19-arcade');
  });

  test('F–G iPhone 11 + AirPods Pro', async ({ page }) => {
    await page.goto('/years/2019/sites/iphone/iphone11.html');
    await clearKeys(page, ['itt19-iphone11', 'itt19-airpods-pro']);
    await page.reload();
    await page.locator('[data-ip11-color]').selectOption('black');
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone11"]').click();
    await expectStorageTruthy(page, 'itt19-iphone11');
    await page.goto('/years/2019/sites/airpodspro/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-airpods-pro-save]').click();
    await expectStorageTruthy(page, 'itt19-airpods-pro');
  });

  test('H Stadia claim', async ({ page }) => {
    await page.goto('/years/2019/sites/stadia/index.html');
    await clearKeys(page, ['itt19-stadia']);
    await page.reload();
    await page.locator('[data-stadia-tier]').selectOption('premiere');
    await checkAllReq(page);
    await page.locator('[data-stadia-claim]').click();
    await expectStorageTruthy(page, 'itt19-stadia');
  });

  test('I Apple TV+', async ({ page }) => {
    await page.goto('/years/2019/sites/appletv/index.html');
    await clearKeys(page, ['itt19-appletv']);
    await page.reload();
    await page.locator('[data-tv-show]').selectOption('morningshow');
    await checkAllReq(page);
    await page.locator('[data-tv-start]').click();
    await expectStorageTruthy(page, 'itt19-appletv');
  });

  test('J home trails visible', async ({ page }) => {
    await page.goto('/years/2019/pages/home.html');
    await expect(page.locator('[data-itt19-home-trails]')).toBeVisible();
    await expect(page.locator('.itt19-trail-card').first()).toBeVisible();
  });
});
