// @ts-check
/**
 * 2013 lean from-scratch — door + star + P0
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) { /* */ }
    });
  }, keys);
}

test.describe('2013 MVP', () => {
  test('A shell boots Win7 / IE9 / 2013', async ({ page }) => {
    await enterYear(page, '2013');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2013');
    await expect(page.locator('body')).toHaveClass(/os-win7/);
    await expect(page.locator('body')).toHaveClass(/browser-ie9/);
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B about dual scale + bans', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText('672,985,183');
    await expect(page.locator('body')).toContainText('861');
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Windows 10/i);
  });

  test('C Vine incomplete never writes then post writes itt13-vine-posts', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await clearKeys(page, ['itt13-vine', 'itt13-vine-posts']);
    await page.reload();
    await page.waitForSelector('[data-vine-post]', { timeout: 20000 });
    await page.locator('[data-vine-post]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-vine-posts'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-vine-post]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-vine-posts'))).toBeFalsy();
    const hold = page.locator('[data-vine-hold]');
    for (let i = 0; i < 5; i++) await hold.click();
    await page.locator('[data-vine-caption]').fill('loop residual');
    await page.locator('[data-vine-post]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-vine-posts'))).toMatch(/6|loop|real/i);
  });

  test('D IG Video writes itt13-ig-posts', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await clearKeys(page, ['itt13-ig', 'itt13-ig-posts', 'itt13-ig-video']);
    await page.reload();
    await page.locator('[data-ig-share]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-ig-posts'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-ig-filter="Cinema"]').click();
    await page.locator('[data-ig-caption]').fill('15s residual');
    await page.locator('[data-ig-share]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-ig-posts'))).toMatch(/Cinema|15|real/i);
  });

  test('E Stories writes itt13-snap-story', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/story.html');
    await clearKeys(page, ['itt13-snap-story', 'itt13-snap']);
    await page.reload();
    await page.locator('[data-story-add]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-snap-story'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-story-text]').fill('coffee this morning');
    await page.locator('[data-story-add]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-snap-story'))).toMatch(/24|story|real/i);
  });

  test('H iPhone 5s order writes itt13-iphone5s', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/index.html');
    await clearKeys(page, ['itt13-iphone5s']);
    await page.reload();
    await page.locator('[data-iphone5s-order]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-iphone5s'))).toBeFalsy();
    await page.locator('[name="iphone5s-sku"]').first().check({ force: true });
    await page.locator('[data-iphone5s-touch]').check({ force: true });
    await page.locator('[data-iphone5s-order]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-iphone5s'))).toMatch(/199|touch|real/i);
  });
});
