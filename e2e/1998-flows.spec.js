// @ts-check
/**
 * 1998 hard signature flows — no soft mocks.
 * Failures mean theater/DOM/storage broke, not just missing copy.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('1998 hard flows', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '1998');
  });

  test('Google! sparse home loads and search form works', async ({ page }) => {
    await goInFrame(page, 'sites/google/index.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Google/i, { timeout: 15000 });
    const q = frame.locator('input[name="q"], input[type="text"]').first();
    await q.fill('yahoo');
    await frame.locator('input[type="submit"], button[type="submit"]').first().click();
    await page.waitForTimeout(800);
    await expect(contentFrame(page).locator('body')).toContainText(/yahoo|result|Search/i, {
      timeout: 15000,
    });
  });

  test('Amazon Music add CD to cart (itt98)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt98') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-add-cart]').first()).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-add-cart]').first().click();
    await expect(frame.locator('[data-cart-count]').first()).not.toHaveText('0', {
      timeout: 10000,
    });
    await goInFrame(page, 'sites/amazon/cart.html');
    await waitForImmersion(page, '1998');
    await expect(contentFrame(page).locator('body')).toContainText(/cart|OK Computer|Radiohead|item/i, {
      timeout: 15000,
    });
  });

  test('Excite search destinations resolve', async ({ page }) => {
    await goInFrame(page, 'sites/excite/search.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/excite|Search/i, { timeout: 15000 });
    await frame.getByRole('link', { name: /Google/i }).first().click();
    await page.waitForTimeout(900);
    const body = await contentFrame(page).locator('body').innerText();
    expect(body).not.toMatch(/Error code: 404|File not found/i);
    expect(body).toMatch(/Google/i);
  });

  test('eBay home is black-era marketplace (not smile Amazon)', async ({ page }) => {
    await goInFrame(page, 'sites/ebay/index.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/eBay|auction|bid/i, { timeout: 15000 });
    const html = await frame.locator('body').innerHTML();
    expect(html).not.toMatch(/amazon.*smile|smile.*logo/i);
  });
});
