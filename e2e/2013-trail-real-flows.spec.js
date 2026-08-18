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

test.describe('2013 leftover trail', () => {
  test('Vine post reveals IG Video next', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await clearKeys(page, ['itt13-vine', 'itt13-vine-posts']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    const hold = page.locator('[data-vine-hold]');
    for (let i = 0; i < 5; i++) await hold.click();
    await page.locator('[data-vine-caption]').fill('trail residual');
    await page.locator('[data-vine-post]').click();
    await expect(page.locator('[data-next-flow] a').first()).toBeVisible();
  });

  test('IG Video literacy reveals Stories next', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await clearKeys(page, ['itt13-ig-posts']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-ig-filter="Lagoon"]').click();
    await page.locator('[data-ig-caption]').fill('trail 15s');
    await page.locator('[data-ig-share]').click();
    await expect(page.locator('[data-next-flow] a').first()).toBeVisible();
  });

  test('Stories writes itt13-snap-story', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/story.html');
    await clearKeys(page, ['itt13-snap-story']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-story-text]').fill('trail story');
    await page.locator('[data-story-add]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-snap-story'))).toBeTruthy();
  });

  test('iPhone 5s order writes itt13-iphone5s', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/index.html');
    await clearKeys(page, ['itt13-iphone5s']);
    await page.reload();
    await page.locator('[name="iphone5s-sku"]').nth(1).check({ force: true });
    await page.locator('[data-iphone5s-touch]').check({ force: true });
    await page.locator('[data-iphone5s-order]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-iphone5s'))).toBeTruthy();
  });
});
