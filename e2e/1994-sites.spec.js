// @ts-check
const { test, expect } = require('@playwright/test');
test.describe('1994 sites densify', () => {
  test('CERN + Yahoo Stanford', async ({ page }) => {
    await page.goto('/years/1994/sites/cern/index.html');
    await expect(page.getByText(/CERN|Web|Berners/i).first()).toBeVisible();
    await page.goto('/years/1994/sites/yahoo/index.html');
    await expect(page.getByText(/Yahoo|Directory|Categories/i).first()).toBeVisible();
  });
  test('IUMA + White House', async ({ page }) => {
    await page.goto('/years/1994/sites/iuma/index.html');
    await expect(page.getByText(/IUMA|Music|Underground/i).first()).toBeVisible();
    await page.goto('/years/1994/sites/whitehouse/index.html');
    await expect(page.getByText(/White House|President|Welcome/i).first()).toBeVisible();
  });
});
