// @ts-check
/**
 * 2012 lean from-scratch — door + star + P0
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

test.describe('2012 MVP', () => {
  test('A shell boots Win7 / IE9 / 2012', async ({ page }) => {
    await enterYear(page, '2012');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2012');
    await expect(page.locator('body')).toHaveClass(/os-win7/);
    await expect(page.locator('body')).toHaveClass(/browser-ie9/);
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B about dual scale + bans', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await expect(page.locator('body')).toContainText('697,089,489');
    await expect(page.locator('body')).toContainText('634 million');
    await expect(page.locator('body')).toContainText(/Stories|Vine|Windows 8/i);
    await expect(page.locator('body')).toContainText('1 billion');
    await expect(page.locator('body')).toContainText('425 million');
    await expect(page.locator('body')).toContainText('wildcard');
  });

  test('C Instagram Android incomplete never writes then share writes itt12-ig', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await clearKeys(page, ['itt12-ig', 'itt12-ig-posts']);
    await page.reload();
    await page.waitForSelector('[data-ig-share]', { timeout: 20000 });
    await page.locator('[data-ig-share]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-ig-posts'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-ig-share]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-ig-posts'))).toBeFalsy();
    await page.locator('[data-ig-filter="X-Pro II"]').click();
    await page.locator('[data-ig-caption]').fill('dinner plate residual');
    await page.locator('[data-ig-share]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-ig-posts'))).toMatch(/X-Pro|dinner|real/i);
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-ig'))).toBeTruthy();
  });

  test('D $1B acquisition writes itt12-ig-fb', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/acquired.html');
    await clearKeys(page, ['itt12-ig-fb']);
    await page.reload();
    await page.locator('[data-itt-real-save]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-ig-fb'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-itt-real-save]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-ig-fb'))).toMatch(/1B|standalone|real|owned/i);
  });

  test('E IPO $38 writes itt12-fb-ipo', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await clearKeys(page, ['itt12-fb-ipo']);
    await page.reload();
    await page.locator('[data-itt-real-save]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-fb-ipo'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-itt-real-save]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-fb-ipo'))).toMatch(/38|real|ipo/i);
  });

  test('G Pinterest pin writes itt12-pin', async ({ page }) => {
    await page.goto('/years/2012/sites/pinterest/index.html');
    await clearKeys(page, ['itt12-pin']);
    await page.reload();
    await page.locator('[data-pin-save]').first().click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-pin'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-pin-save]').first().click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-pin'))).toBeTruthy();
  });

  test('H iPhone 5 order writes itt12-iphone5', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/index.html');
    await clearKeys(page, ['itt12-iphone5']);
    await page.reload();
    await page.locator('[data-iphone5-order]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-iphone5'))).toBeFalsy();
    await page.locator('[name="iphone5-sku"]').first().check({ force: true });
    await page.locator('[data-iphone5-lightning]').check({ force: true });
    await page.locator('[data-iphone5-order]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-iphone5'))).toMatch(/199|lightning|real/i);
  });
});
