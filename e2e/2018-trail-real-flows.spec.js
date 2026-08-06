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

test.describe('2018 trail — consent + short video', () => {
  test('GDPR multi-step → TikTok complete', async ({ page }) => {
    await page.goto('/years/2018/sites/gdpr/index.html');
    await clearKeys(page, ['itt18-gdpr', 'itt18-tiktok']);
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator('[data-gdpr-manage]').click();
    await page.locator('[data-gdpr-rights]').check();
    await page.locator('[data-gdpr-save]').click();
    await requireKey(page, 'itt18-gdpr');

    await page.goto('/years/2018/sites/tiktok/index.html');
    await page.waitForTimeout(400);
    await page.locator('[data-tt-brand]').check();
    await page.locator('[data-tt-migrate]').check();
    await page.locator('[data-tt-fyp]').check();
    await page.locator('[data-tt-clip="clip-a"]').click();
    await page.locator('[data-tt-save]').click();
    await requireKey(page, 'itt18-tiktok');
  });
});
