// @ts-check
const { test, expect } = require('@playwright/test');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try { localStorage.removeItem(k); } catch (e) { /* */ }
    });
  }, keys);
}
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe('2010 leftover trail', () => {
  test('Instagram share reveals next iPhone 4', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await clearKeys(page, ['itt10-ig', 'itt10-ig-posts']);
    await page.reload();
    await page.locator('[data-ig-filter="Earlybird"]').click();
    await page.locator('[data-ig-caption]').fill('dinner');
    await page.locator('[data-ig-share]').click();
    await expect.poll(() => getKey(page, 'itt10-ig-posts')).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="iphone"]')).toBeVisible();
  });

  test('iPhone 4 acks reveal next iPad', async ({ page }) => {
    await page.goto('/years/2010/sites/iphone/index.html');
    await clearKeys(page, ['itt10-iphone4']);
    await page.reload();
    await page.locator('[data-ft-wifi]').check();
    await page.locator('[data-antenna-ack]').check();
    await page.locator('[data-iphone4-ack]').click();
    await expect.poll(() => getKey(page, 'itt10-iphone4')).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="ipad"]')).toBeVisible();
  });

  test('iPad order writes itt10-ipad', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/order.html');
    await clearKeys(page, ['itt10-ipad']);
    await page.reload();
    await page.locator('[name="ipad-cap"][value="16GB"]').check();
    await page.locator('[name="ipad-radio"][value="Wi-Fi"]').check();
    await page.locator('[data-ipad-order]').click();
    await expect.poll(() => getKey(page, 'itt10-ipad')).toMatch(/16GB|real/i);
  });

  test('OG two Likes write itt10-fb-og', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/index.html');
    await clearKeys(page, ['itt10-fb-og', 'itt10-fb-og-partial']);
    await page.reload();
    await page.locator('[data-og-like="cnn"]').click();
    expect(await getKey(page, 'itt10-fb-og')).toBeFalsy();
    await page.locator('[data-og-like="imdb"]').click();
    await expect.poll(() => getKey(page, 'itt10-fb-og')).toBeTruthy();
  });
});
