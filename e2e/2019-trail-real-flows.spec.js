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

async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `trail missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2019 trail T1 — Short video mass', () => {
  test('TikTok For You REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/tiktok/index.html');
    await clearKeys(page, ['itt19-tiktok']);
    await page.reload();
    await page.locator('[data-tt-caption]').fill('trail fyp');
    await checkAllReq(page);
    await page.locator('[data-tt-post]').click();
    await requireKey(page, 'itt19-tiktok');
  });
});

test.describe('2019 trail T2 — Streaming stack', () => {
  test('Disney+ join → Watchlist', async ({ page }) => {
    await clearKeys(page, ['itt19-disneyplus']);
    await page.goto('/years/2019/sites/disneyplus/index.html');
    await page.reload();
    await page.locator('[data-dplus-plan]').selectOption('monthly');
    await checkAllReq(page);
    await page.locator('[data-dplus-join]').click();
    await requireKey(page, 'itt19-disneyplus');
    await page.goto('/years/2019/sites/disneyplus/queue.html');
    await page.locator('[data-dplus-title]').fill('The Mandalorian');
    await checkAllReq(page);
    await page.locator('[data-dplus-queue]').click();
    const raw = await requireKey(page, 'itt19-disneyplus');
    expect(raw).toMatch(/Mandalorian/i);
  });
});

test.describe('2019 trail T3 — Games as service', () => {
  test('Arcade trial', async ({ page }) => {
    await page.goto('/years/2019/sites/arcade/index.html');
    await clearKeys(page, ['itt19-arcade']);
    await page.reload();
    await page.locator('[data-arcade-game]').selectOption('sayonara');
    await checkAllReq(page);
    await page.locator('[data-arcade-start]').click();
    await requireKey(page, 'itt19-arcade');
  });
});

test.describe('2019 trail T4 — Autumn hardware', () => {
  test('iPhone 11 → AirPods Pro', async ({ page }) => {
    await page.goto('/years/2019/sites/iphone/iphone11.html');
    await clearKeys(page, ['itt19-iphone11', 'itt19-airpods-pro']);
    await page.reload();
    await page.locator('[data-ip11-color]').selectOption('green');
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone11"]').click();
    await requireKey(page, 'itt19-iphone11');
    await page.goto('/years/2019/sites/airpodspro/index.html');
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-airpods-pro-save]').click();
    await requireKey(page, 'itt19-airpods-pro');
  });
});

test.describe('2019 trail T5 — Cloud try', () => {
  test('Stadia claim → stream', async ({ page }) => {
    await clearKeys(page, ['itt19-stadia']);
    await page.goto('/years/2019/sites/stadia/index.html');
    await page.reload();
    await page.locator('[data-stadia-tier]').selectOption('founders');
    await checkAllReq(page);
    await page.locator('[data-stadia-claim]').click();
    await requireKey(page, 'itt19-stadia');
    await page.goto('/years/2019/sites/stadia/stream.html');
    await page.locator('[data-stadia-game]').fill('Destiny 2');
    await checkAllReq(page);
    await page.locator('[data-stadia-stream]').click();
    const raw = await requireKey(page, 'itt19-stadia');
    expect(raw).toMatch(/Destiny/i);
  });
});

test.describe('2019 trail T6 — Originals stack', () => {
  test('Apple TV+', async ({ page }) => {
    await page.goto('/years/2019/sites/appletv/index.html');
    await clearKeys(page, ['itt19-appletv']);
    await page.reload();
    await page.locator('[data-tv-show]').selectOption('dickinson');
    await checkAllReq(page);
    await page.locator('[data-tv-start]').click();
    await requireKey(page, 'itt19-appletv');
  });
});
