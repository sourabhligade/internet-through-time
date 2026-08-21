// @ts-check
const { test, expect } = require('@playwright/test');

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } });
  }, keys);
}

test.describe('2012 leftover trail', () => {
  test('Android share reveals Pinterest next', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await clearKeys(page, ['itt12-ig-android']);
    await page.reload();
    await page.locator('[data-ig12-filter="Lo-Fi"]').click();
    await page.locator('[data-ig12-share]').click();
    await expect.poll(() => getKey(page, 'itt12-ig-android')).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="pinterest"]')).toBeVisible();
  });

  test('Pinterest pins reveal IPO next', async ({ page }) => {
    await page.goto('/years/2012/sites/pinterest/index.html');
    await clearKeys(page, ['itt12-pin']);
    await page.reload();
    await page.locator('[data-pin-tile="kitchen"]').click();
    await page.locator('[data-pin-tile="recipe"]').click();
    await page.locator('[data-pin-save]').click();
    await expect.poll(() => getKey(page, 'itt12-pin')).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="ipo"]').first()).toBeVisible();
  });
});
