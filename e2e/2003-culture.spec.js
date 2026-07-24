// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2003 culture', () => {
  test('MySpace + iTunes store', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/index.html');
    await expect(page.locator('[data-myspace-profile], .ms-logo-2003').first()).toBeVisible();
    await page.goto('/years/2003/sites/itunes/index.html');
    await expect(page.getByText(/iTunes|99|Music Store/i).first()).toBeVisible();
  });
  test('WordPress + LinkedIn', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/index.html');
    await expect(page.getByText(/WordPress|Poetry|blog/i).first()).toBeVisible();
    await page.goto('/years/2003/sites/linkedin/index.html');
    await expect(page.getByText(/LinkedIn|Relationships|network/i).first()).toBeVisible();
  });
});
