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

async function wait2017(page) {
  await page.waitForFunction(
    () =>
      document.documentElement.getAttribute('data-itt-feat-year2017extras') === '1' ||
      document.documentElement.getAttribute('data-itt-immersion-booted') === '2017',
    null,
    { timeout: 20000 }
  );
  await page.waitForTimeout(200);
}

async function checkAll(page, selector) {
  await page.locator(selector).evaluateAll((els) =>
    els.forEach((e) => {
      e.checked = true;
      e.dispatchEvent(new Event('change', { bubbles: true }));
    })
  );
}

test.describe('2017 trail — Face ID era', () => {
  test('Face ID multi-step → thesis ack', async ({ page }) => {
    await page.goto('/years/2017/sites/iphone/x.html');
    await clearKeys(page, ['itt17-faceid', 'itt17-iphonex', 'itt17-thesis-ack']);
    await page.reload();
    await wait2017(page);

    await checkAll(page, '[data-faceid-notch], [data-faceid-look], [data-faceid-price], [data-faceid-store]');
    await page.locator('[data-faceid-save]').click();
    await requireKey(page, 'itt17-faceid');

    await page.goto('/years/2017/pages/about.html');
    await wait2017(page);
    await checkAll(page, '[data-req]');
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await requireKey(page, 'itt17-thesis-ack');
  });
});
