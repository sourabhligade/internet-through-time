// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('1998 SOURCES rooms', () => {
  test('CDnow music-first store + Amazon Music link', async ({ page }) => {
    await page.goto('/years/1998/sites/cdnow/index.html');
    await expect(page.getByText(/CDnow|Ultimate Music/i).first()).toBeVisible();
    await page.getByRole('link', { name: /Amazon Music|Compare Amazon/i }).first().click();
    await expect(page).toHaveURL(/amazon\/music/);
  });

  test('mozilla.org + WaSP educational pages', async ({ page }) => {
    await page.goto('/years/1998/sites/mozilla/index.html');
    await expect(page.getByText(/mozilla\.org|open source|January 22/i).first()).toBeVisible();
    await page.getByRole('link', { name: /WaSP|Web Standards/i }).first().click();
    await expect(page.getByText(/Web Standards Project|DOM Level 1/i).first()).toBeVisible();
  });

  test('GameSpot densify has downloads theater', async ({ page }) => {
    await page.goto('/years/1998/sites/gamespot/index.html');
    await expect(page.getByText(/Half-Life|StarCraft|GameSpot/i).first()).toBeVisible();
    await page.getByRole('link', { name: /Downloads/i }).first().click();
    await expect(page.getByText(/56k|demo/i).first()).toBeVisible();
  });
});
