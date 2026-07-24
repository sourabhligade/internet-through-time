// @ts-check
const { test, expect } = require('@playwright/test');
test.describe('1994 culture', () => {
  test('NCSA + Cool Site of the Day', async ({ page }) => {
    await page.goto('/years/1994/sites/ncsa/index.html');
    await expect(page.getByText(/NCSA|Mosaic|Starting/i).first()).toBeVisible();
    await page.goto('/years/1994/sites/csotd/index.html');
    await expect(page.getByText(/Cool Site|cool/i).first()).toBeVisible();
  });
  test('FishCam + personal', async ({ page }) => {
    await page.goto('/years/1994/sites/fishcam/index.html');
    await expect(page.getByText(/FishCam|Fish|webcam|Netscape/i).first()).toBeVisible();
    await page.goto('/years/1994/sites/personal/index.html');
    await expect(page.locator('body')).toBeVisible();
  });
});
