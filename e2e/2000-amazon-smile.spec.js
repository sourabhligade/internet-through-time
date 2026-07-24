// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2000 Amazon smile', () => {
  test('smile home and multi-tab strip', async ({ page }) => {
    await page.goto('/years/2000/');
    const skip = page.locator('#skip-connect');
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await page.waitForFunction(() => {
      const f = document.getElementById('content');
      try { return !!(f && f.contentDocument && f.contentDocument.body); } catch (e) { return false; }
    }, null, { timeout: 20000 });

    await page.locator('.dir-btn', { hasText: 'Amazon' }).click();
    const frame = page.frameLocator('#content');
    await expect(frame.locator('img[src*="logo-smile"]').first()).toBeVisible({ timeout: 15000 });
    await expect(frame.getByText(/Tab insanity|Marketplace|zShops/i).first()).toBeVisible({ timeout: 10000 });
  });
});
