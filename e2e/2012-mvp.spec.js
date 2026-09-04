// @ts-check
/**
 * 2012 lean from-scratch — door + star + thesis
 */
const { test, expect } = require('@playwright/test');

const { enterYear } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } });
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
    await expect(page.locator('body')).toContainText('32.43%');
    await expect(page.locator('body')).toContainText('32.12%');
    await expect(page.locator('body')).toContainText(/Vine|Stories|WhatsApp/i);
    await expect(page.locator('body')).toContainText('634 million');
  });

  test('C Instagram Android incomplete blocked then writes itt12-ig-android', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await clearKeys(page, ['itt12-ig-android']);
    await page.reload();
    await page.locator('[data-ig12-share]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-ig-android'))).toBeFalsy();
    await page.locator('[data-ig12-filter="X-Pro II"]').click();
    await page.locator('[data-ig12-share]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-ig-android'))).toMatch(/X-Pro II|android|real/i);
    const raw = await page.evaluate(() => localStorage.getItem('itt12-ig-android'));
    const blob = JSON.parse(raw || '{}');
    expect(blob.real).toBe(true);
    expect(blob.platform).toBe('android');
    expect(blob.year).toBe('2012');
    const leaks = await page.evaluate(() => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt12-') !== 0) bad.push(k);
      }
      return bad;
    });
    expect(leaks).toEqual([]);
  });

  test('D guided 6 · chip Android · no dest-field', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    await expect(page.locator('#ott-guided-2012 ol > li')).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2012"]')).toHaveAttribute('href', /instagram\/android/);
    await expect(page.locator('[data-dest-field]')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(/I read the 2012 period note/i);
  });
});
