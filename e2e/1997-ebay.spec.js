// @ts-check
const { test, expect } = require('@playwright/test');

async function enterYear(page, year) {
  await page.goto(`/years/${year}/`);
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) {
    await skip.click();
  }
  for (let i = 0; i < 3; i++) {
    const alert = page.locator('#dlg-alert:not(.hidden)');
    if (await alert.isVisible().catch(() => false)) {
      await page.locator('#dlg-alert-ok, [data-close="dlg-alert"]').first().click();
      await page.waitForTimeout(150);
    } else break;
  }
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerHTML.length > 20);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

test.describe('1997 immersion', () => {
  test('eBay item page loads and has bid form', async ({ page }) => {
    await enterYear(page, '1997');

    // Navigate to eBay item page
    await page.evaluate(() => {
      const iframe = document.getElementById('content');
      if (iframe) iframe.src = 'sites/ebay/item-laptop.html';
    });

    const frame = page.frameLocator('#content');

    // Wait for page content to load
    await expect(frame.locator('body')).toBeVisible({ timeout: 20000 });

    // Wait for immersion to boot
    await page.waitForFunction(() => {
      try {
        const doc = document.getElementById('content').contentDocument;
        return !!(doc && doc.documentElement.getAttribute('data-itt-immersion-booted') === '1997');
      } catch (e) {
        return false;
      }
    }, null, { timeout: 20000 });

    // Verify eBay item content is present
    const title = frame.locator('text=ThinkPad').first();
    await expect(title).toBeVisible({ timeout: 10000 });

    // Verify the page has eBay branding
    const ebayLogo = frame.locator('.eb-logo').first();
    await expect(ebayLogo).toBeVisible({ timeout: 5000 });
  });
});
