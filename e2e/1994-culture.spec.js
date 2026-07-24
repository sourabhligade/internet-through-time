// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

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

  test('FishCam from Starting Point does not 404 via pages/sites/', async ({ page }) => {
    await enterYear(page, '1994');
    const frame = contentFrame(page);
    await expect(frame.getByText(/Fish Cam|World Wide Web|Yahoo/i).first()).toBeVisible({ timeout: 15000 });
    await frame.getByRole('link', { name: /Fish Cam/i }).first().click();
    // Must land on real fishcam, not 404 with pages/sites/… path
    await expect(frame.getByText(/404 Not Found/i)).toHaveCount(0, { timeout: 15000 });
    await expect(frame.getByText(/Fish|webcam|tank|FishCam/i).first()).toBeVisible({ timeout: 15000 });
    const loc = page.locator('#location');
    await expect(loc).toBeVisible();
    const v = await loc.inputValue();
    expect(v).not.toMatch(/pages\/sites\//);
    expect(v.toLowerCase()).toMatch(/fishcam|fish\.cam|mcom\.com\/fishcam/);
  });
});
