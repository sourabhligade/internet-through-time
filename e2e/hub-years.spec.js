// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('hub + year shells', () => {
  test('hub lists 1994–2005 as available', async ({ page }) => {
    await page.goto('/');
    for (const y of ['1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005']) {
      await expect(page.locator(`a[href*="years/${y}"]`)).toBeVisible();
    }
  });

  for (const year of ['1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005']) {
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
