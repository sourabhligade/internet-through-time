// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('hub + year shells', () => {
  test('hub lists 1994–1997 as available', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href*="years/1994"]')).toBeVisible();
    await expect(page.locator('a[href*="years/1995"]')).toBeVisible();
    await expect(page.locator('a[href*="years/1996"]')).toBeVisible();
    await expect(page.locator('a[href*="years/1997"]')).toBeVisible();
  });

  for (const year of ['1994', '1995', '1996', '1997']) {
    test(`${year} shell boots with content iframe`, async ({ page }) => {
      await page.goto(`/years/${year}/`);
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
      await expect(page.locator('#content')).toBeVisible();
      await expect(page.locator('#location')).toBeVisible();
    });
  }
});
