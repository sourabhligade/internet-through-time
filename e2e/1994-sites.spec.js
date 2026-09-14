// @ts-check
const { test, expect } = require('@playwright/test');


async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

test.describe('1994 sites densify', () => {
  test('CERN + Yahoo Stanford', async ({ page }) => {
    await page.goto('/years/1994/sites/cern/index.html');
    await expect(page).toHaveTitle(/CERN|Web|WWW/i);
    await expect(page.locator('body')).toContainText(/CERN|Berners|World Wide Web/i);
    await page.goto('/years/1994/sites/yahoo/index.html');
    await expect(page).toHaveTitle(/Yahoo/i);
    await expect(page.locator('body')).toContainText(/akebono|Stanford|Guide/i);
  });
  test('IUMA + White House', async ({ page }) => {
    await page.goto('/years/1994/sites/iuma/index.html');
    await expect(page).toHaveTitle(/IUMA|Music|Underground/i);
    await expect(page.locator('body')).toContainText(/IUMA|Underground|Music/i);
    await page.goto('/years/1994/sites/whitehouse/index.html');
    await expect(page).toHaveTitle(/White House/i);
    await expect(page.locator('body')).toContainText(/White House|President|Welcome/i);
  });
});
