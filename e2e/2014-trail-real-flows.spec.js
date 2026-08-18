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

test.describe('2014 leftover trail', () => {
  test('WhatsApp install reveals chat next', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await clearKeys(page, ['itt14-wa-install', 'itt14-wa']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-wa-install]').click();
    await expect(page.locator('[data-next-flow] a').first()).toBeVisible();
    await expect(page.locator('[data-next-flow] a').first()).toHaveAttribute('href', /chat/i);
  });

  test('Heartbleed literacy reveals Ice Bucket next', async ({ page }) => {
    await page.goto('/years/2014/sites/heartbleed/index.html');
    await clearKeys(page, ['itt14-heartbleed']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-hb-ack]').click();
    await expect(page.locator('[data-next-flow] a').first()).toBeVisible();
    await expect(page.locator('[data-next-flow] a').first()).toHaveAttribute('href', /icebucket/i);
  });

  test('Ice Bucket writes itt14-icebucket and reveals iPhone', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await clearKeys(page, ['itt14-icebucket']);
    await page.reload();
    await page.locator('[data-ice-nominate]').fill('trail residual');
    await page.locator('[data-ice-req]').check({ force: true });
    await page.locator('[data-ice-dump]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-icebucket'))).toBeTruthy();
    await expect(page.locator('[data-next-flow] a').first()).toBeVisible();
  });

  test('iPhone 6 order writes itt14-iphone6 and reveals Pay', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await clearKeys(page, ['itt14-iphone6']);
    await page.reload();
    await page.locator('[name="iphone6-sku"]').nth(1).check({ force: true });
    await page.locator('[name="iphone6-size"]').nth(1).check({ force: true });
    await page.locator('[data-iphone6-order]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-iphone6'))).toBeTruthy();
    await expect(page.locator('[data-next-flow] a').first()).toHaveAttribute('href', /pay/i);
  });
});
