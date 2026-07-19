// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1997 channels + SSL API', () => {
  test('IE4 dir bar has Channels pointing at PointCast', async ({ page }) => {
    await enterYear(page, '1997');
    const channels = page.locator('.dir-btn[data-go*="pointcast"], .dir-btn:has-text("Channels")');
    await expect(channels.first()).toBeVisible({ timeout: 10000 });
    await channels.first().click();
    const frame = contentFrame(page);
    await expect(frame.locator('text=/PointCast|push|Channel/i').first()).toBeVisible({
      timeout: 15000,
    });
  });

  test('activeBrowser.setSecureMode is exposed after shell boot', async ({ page }) => {
    await enterYear(page, '1997');
    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          return !!(window.ITT && window.ITT.activeBrowser && typeof window.ITT.activeBrowser.setSecureMode === 'function');
        } catch (e) {
          return false;
        }
      });
    }, { timeout: 15000 }).toBeTruthy();
  });

  test('Amazon checkout flips secure location theater', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt97-amazon-cart',
        JSON.stringify([{ id: 'contact', title: 'Contact', price: 6.99, author: 'Carl Sagan' }])
      );
    });
    await goInFrame(page, 'sites/amazon/checkout.html');
    await waitForImmersion(page, '1997');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-checkout], body[data-checkout]').first()).toBeVisible({
      timeout: 15000,
    });
    // Secure banner and/or https location
    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const loc = document.getElementById('location');
          const val = (loc && loc.value) || '';
          const doc = document.getElementById('content').contentDocument;
          const banner = doc && doc.getElementById('itt-secure-banner');
          return val.indexOf('https://') === 0 || !!banner;
        } catch (e) {
          return false;
        }
      });
    }, { timeout: 15000 }).toBeTruthy();
  });
});
