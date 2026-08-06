// @ts-check
const { test, expect } = require('@playwright/test');

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
  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 10000 })
    .toBeTruthy();
}

test.describe('2014 trail — trust + messaging', () => {
  test('WhatsApp install → Heartbleed rotate ≥2', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await clearKeys(page, [
      'itt14-wa-phone',
      'itt14-wa-install',
      'itt14-wa-installed',
      'itt14-heartbleed',
      'itt14-heartbleed-rotate',
    ]);
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator('[data-wa14-phone]').fill('5551234567');
    await page.locator('[data-wa14-verify]').click();
    await requireKey(page, 'itt14-wa-phone');
    await page.locator('[data-wa14-install]').click();
    await requireKey(page, 'itt14-wa-install');

    await page.goto('/years/2014/sites/heartbleed/index.html');
    await page.waitForTimeout(400);
    await page.locator('[data-hb-cve]').check();
    await page.locator('[data-hb-lit]').check();
    await page.locator('[data-hb-service="email"]').check();
    await page.locator('[data-hb-service="social"]').check();
    await page.locator('[data-hb-rotate]').click();
    await requireKey(page, 'itt14-heartbleed');
  });
});

test.describe('2014 trail — autumn phone + virality', () => {
  test('iPhone 6 pick → Ice Bucket post', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await clearKeys(page, ['itt14-iphone6', 'itt14-icebucket', 'itt14-icebucket-feed']);
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator('[data-iphone6-pick="6"]').first().click();
    await requireKey(page, 'itt14-iphone6');

    await page.goto('/years/2014/sites/icebucket/index.html');
    await page.waitForTimeout(400);
    await page.locator('[data-ib-name]').fill('Trail Alex');
    await page.locator('[data-ib-nom1]').fill('Sam');
    await page.locator('[data-ib-post]').click();
    await requireKey(page, 'itt14-icebucket-feed');
  });
});
