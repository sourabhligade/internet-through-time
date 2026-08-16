// @ts-check
/**
 * 2019 5× F1–F5 — REAL incomplete-never-writes + Next chain to the Disney+ star.
 * Key names stay itt19-appletv (not tvplus). Trial never writes.
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

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function expectKey(page, key, re) {
  await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const raw = (await getKey(page, key)) || '';
  if (re) expect(raw).toMatch(re);
  return raw;
}

test.describe('2019 5× live F1–F5', () => {
  test('F1 TikTok empty blocked then REAL · Next Arcade', async ({ page }) => {
    await page.goto('/years/2019/sites/tiktok/index.html');
    await clearKeys(page, ['itt19-tiktok']);
    await page.reload();
    await page.locator('[data-tt-post]').click();
    await expect.poll(async () => getKey(page, 'itt19-tiktok')).toBeFalsy();
    await page.locator('[data-tt-caption]').fill('fyp 5x');
    await checkAllReq(page);
    await page.locator('[data-tt-post]').click();
    await expectKey(page, 'itt19-tiktok', /fyp 5x/i);
    const next = page.locator('[data-itt19-next]');
    await expect(next).toBeVisible();
    await expect(next.locator('a[href*="arcade"]')).toHaveCount(1);
  });

  test('F2 Arcade no-game blocked then REAL · Next TV+', async ({ page }) => {
    await page.goto('/years/2019/sites/arcade/index.html');
    await clearKeys(page, ['itt19-arcade']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-arcade-start]').click();
    await expect.poll(async () => getKey(page, 'itt19-arcade')).toBeFalsy();
    await page.locator('[data-arcade-game]').selectOption('oceanhorn2');
    await page.locator('[data-arcade-start]').click();
    await expectKey(page, 'itt19-arcade', /oceanhorn2/i);
    await expect(page.locator('[data-itt19-next] a[href*="appletv"]').first()).toBeVisible();
  });

  test('F3 TV+ no-show blocked then REAL · Next Stadia', async ({ page }) => {
    await page.goto('/years/2019/sites/appletv/index.html');
    await clearKeys(page, ['itt19-appletv']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-tv-start]').click();
    await expect.poll(async () => getKey(page, 'itt19-appletv')).toBeFalsy();
    await page.locator('[data-tv-show]').selectOption('morningshow');
    await page.locator('[data-tv-start]').click();
    await expectKey(page, 'itt19-appletv', /morningshow/i);
    await expect(page.locator('[data-itt19-next] a[href*="stadia"]').first()).toBeVisible();
  });

  test('F4 Stadia no-tier blocked then REAL · Next iPhone 11', async ({ page }) => {
    await page.goto('/years/2019/sites/stadia/index.html');
    await clearKeys(page, ['itt19-stadia']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-stadia-claim]').click();
    await expect.poll(async () => getKey(page, 'itt19-stadia')).toBeFalsy();
    await page.locator('[data-stadia-tier]').selectOption('founders');
    await page.locator('[data-stadia-claim]').click();
    await expectKey(page, 'itt19-stadia', /founders/i);
    await expect(page.locator('body')).toContainText(/not invent later shutdown/i);
    await expect(page.locator('[data-itt19-next] a[href*="iphone11"]').first()).toBeVisible();
  });

  test('F5 iPhone 11 no-color blocked then REAL · Next Marshmello + star', async ({ page }) => {
    await page.goto('/years/2019/sites/iphone/iphone11.html');
    await clearKeys(page, ['itt19-iphone11']);
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="iphone11"]').click();
    await expect.poll(async () => getKey(page, 'itt19-iphone11')).toBeFalsy();
    await page.locator('[data-ip11-color]').selectOption('purple');
    await page.locator('[data-itt-real-save][data-storage-key="iphone11"]').click();
    await expectKey(page, 'itt19-iphone11', /purple|real/i);
    const next = page.locator('[data-itt19-next]');
    await expect(next.locator('a[href*="marshmello"]')).toHaveCount(1);
    await expect(next.locator('a[href*="disneyplus/home"]')).toHaveCount(1);
  });

  test('F5 Marshmello incomplete blocked then REAL', async ({ page }) => {
    await page.goto('/years/2019/sites/fortnite/marshmello.html');
    await clearKeys(page, ['itt19-marshmello']);
    await page.reload();
    await page.locator('[data-mello-save]').click();
    await expect.poll(async () => getKey(page, 'itt19-marshmello')).toBeFalsy();
    await page.locator('[data-mello-date]').check();
    await page.locator('[data-mello-not-travis]').check();
    await page.locator('[data-mello-save]').click();
    await expectKey(page, 'itt19-marshmello', /2019-02-02|notTravis|real/i);
    await expect(page.locator('body')).toContainText(/not.*Travis Scott/i);
  });

  test('star trial never writes · Continue save writes itt19-disneyplus', async ({ page }) => {
    await page.goto('/years/2019/sites/disneyplus/index.html');
    await clearKeys(page, ['itt19-disneyplus']);
    await page.reload();
    await page.locator('[data-dplus-trial]').click();
    await expect.poll(async () => getKey(page, 'itt19-disneyplus')).toBeFalsy();
    await expect(page.locator('[data-dplus-status]')).toContainText(/trap/i);

    await page.goto('/years/2019/sites/disneyplus/home.html');
    await page.reload();
    await page.locator('[data-dplus-save]').click();
    await expect.poll(async () => getKey(page, 'itt19-disneyplus')).toBeFalsy();
    await page.locator('[data-profile="adult-1"]').click();
    await page.locator('[data-title="mando"]').click();
    await page.locator('[data-add-continue]').click();
    await page.locator('[data-title="lion-king"]').click();
    await page.locator('[data-add-continue]').click();
    await checkAllReq(page);
    await page.locator('[data-dplus-save]').click();
    await expectKey(page, 'itt19-disneyplus', /continue|who|mando/i);
  });
});
