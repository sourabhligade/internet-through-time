// @ts-check
const { test, expect } = require('@playwright/test');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) { /* */ }
    });
  }, keys);
}

test.describe('2012 leftover trail', () => {
  test('Instagram share reveals $1B next', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await clearKeys(page, ['itt12-ig', 'itt12-ig-posts']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-ig-filter="Earlybird"]').click();
    await page.locator('[data-ig-caption]').fill('trail residual');
    await page.locator('[data-ig-share]').click();
    await expect(page.locator('[data-next-flow] a').first()).toBeVisible();
  });

  test('$1B literacy reveals IPO next', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/acquired.html');
    await clearKeys(page, ['itt12-ig-fb']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-itt-real-save]').click();
    await expect(page.locator('[data-next-flow] a').first()).toBeVisible();
  });

  test('IPO writes itt12-fb-ipo', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await clearKeys(page, ['itt12-fb-ipo']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-itt-real-save]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-fb-ipo'))).toBeTruthy();
  });

  test('iPhone 5 order writes itt12-iphone5', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/index.html');
    await clearKeys(page, ['itt12-iphone5']);
    await page.reload();
    await page.locator('[name="iphone5-sku"]').nth(1).check({ force: true });
    await page.locator('[data-iphone5-lightning]').check({ force: true });
    await page.locator('[data-iphone5-order]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-iphone5'))).toBeTruthy();
  });
});
