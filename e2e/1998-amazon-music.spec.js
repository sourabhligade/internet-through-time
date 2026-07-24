// @ts-check
const { test, expect } = require('@playwright/test');

async function enter1998(page) {
  await page.goto('/years/1998/');
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

test.describe('1998 Amazon Music', () => {
  test('Music tab page loads and can add CD to cart', async ({ page }) => {
    await enter1998(page);
    await page.evaluate(() => {
      const iframe = document.getElementById('content');
      if (iframe) iframe.src = 'sites/amazon/music.html';
    });
    const frame = page.frameLocator('#content');
    await page.waitForFunction(() => {
      try {
        const doc = document.getElementById('content').contentDocument;
        return !!(doc && doc.documentElement.getAttribute('data-itt-immersion-booted') === '1998');
      } catch (e) {
        return false;
      }
    }, null, { timeout: 20000 });
    await expect(frame.locator('body')).toContainText('Music', { timeout: 15000 });
    await frame.locator('[data-add-cart]').first().click();
    await expect(frame.locator('[data-cart-count]').first()).not.toHaveText('0', { timeout: 10000 });
  });
});
