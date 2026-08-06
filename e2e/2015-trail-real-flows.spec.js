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

async function wait2015(page) {
  await page.waitForFunction(
    () =>
      document.documentElement.getAttribute('data-itt-feat-year2015extras') === '1' ||
      document.documentElement.getAttribute('data-itt-immersion-booted') === '2015',
    null,
    { timeout: 20000 }
  );
  await page.waitForTimeout(200);
}

test.describe('2015 trail — free OS + wearable ship', () => {
  test('Watch → Win10 free → Edge prefer', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await clearKeys(page, ['itt15-watch', 'itt15-watch-shipped', 'itt15-win10', 'itt15-edge']);
    await page.reload();
    await wait2015(page);

    await page.locator('[data-watch-shipped]').check();
    await page.locator('[data-watch-save]').click();
    await requireKey(page, 'itt15-watch');

    await page.goto('/years/2015/sites/windows10/index.html');
    await wait2015(page);
    await page.locator('[data-win10-free]').check();
    await page.locator('[data-win10-date]').check();
    await page.locator('[data-win10-not-ended]').check();
    await page.locator('[data-win10-upgrade]').click();
    await requireKey(page, 'itt15-win10');

    await page.goto('/years/2015/sites/edge/index.html');
    await wait2015(page);
    await page.locator('[data-edge-ships]').check();
    await page.locator('[data-edge-not-chromium]').check();
    await page.locator('[data-edge-prefer]').click();
    await requireKey(page, 'itt15-edge');
  });
});

test.describe('2015 trail — go live', () => {
  test('Periscope Go LIVE writes periscope', async ({ page }) => {
    await page.goto('/years/2015/sites/periscope/index.html');
    await clearKeys(page, ['itt15-periscope', 'itt15-periscope-list']);
    await page.reload();
    await wait2015(page);
    await page.locator('[data-peri-title]').fill('Trail stream 2015');
    await page.locator('[data-peri-live]').click();
    await requireKey(page, 'itt15-periscope');
  });
});
