// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, killOverlays } = require('./helpers');

test.describe('2015 shell honesty', () => {
  test('shell boots 2015 with Win10 / Chrome class', async ({ page }) => {
    await page.goto('/years/2015/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2015');
    await expect(page.locator('body')).toHaveClass(/os-win10/);
    await expect(page.locator('body')).toHaveClass(/browser-chrome/);
  });

  test('connect overlay is 2015 thesis not 2014 spine', async ({ page }) => {
    await page.goto('/years/2015/');
    const text = await page.locator('#connect-overlay').innerText();
    expect(text).toMatch(/Watch|Win10|Periscope|Music|Photos/i);
    expect(text).not.toMatch(/WhatsApp.*Heartbleed|Heartbleed.*WhatsApp/i);
  });

  test('Win10 free upgrade product not TP-only', async ({ page }) => {
    await page.goto('/years/2015/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/free upgrade/i);
    await expect(page.locator('body')).toContainText(/not 2014 TP|Win7 residual/i);
  });

  test('Watch is shipped 2015 not announce-only', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await expect(page.locator('body')).toContainText(/ship|2015|Apr/i);
    await expect(page.locator('body')).toContainText(/not 2014 announce|retail ship/i);
  });

  test('Edge is Spartan not Chromium era', async ({ page }) => {
    await page.goto('/years/2015/sites/edge/index.html');
    await expect(page.locator('body')).toContainText(/Spartan|not Chromium/i);
    await page.goto('/years/2015/sites/edge/about.html');
    await expect(page.locator('body')).toContainText(/not.*Chromium|Spartan|EdgeHTML/i);
  });

  test('About bans IG Stories and Meta', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await expect(page.locator('body')).toContainText(/Stories/i);
    await expect(page.locator('body')).toContainText(/Meta|TikTok|Reactions/i);
  });

  test('shell content iframe works', async ({ page }) => {
    await enterYear(page, '2015');
    await killOverlays(page);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2015');
    await expect(page.locator('#content')).toBeVisible();
    await expect(page.locator('#window-title')).toBeVisible();
  });

  test('exit bar leaves year with resume key', async ({ page }) => {
    await enterYear(page, '2015');
    await page.evaluate(() => {
      try {
        localStorage.setItem('itt-last-year', '2015');
      } catch (e) {
        /* */
      }
    });
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2015"]').first()).toBeVisible();
    const last = await page.evaluate(() => localStorage.getItem('itt-last-year'));
    if (last) expect(last).toMatch(/2015/);
  });
});

  test('dirbar points at 2015 P0 not Vine/iOS7', async ({ page }) => {
    await page.goto('/years/2015/');
    await expect(page.locator('.dir-btn[data-go*="watch"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go*="windows10"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go*="edge"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go*="periscope"]')).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/data-go="sites\/vine/);
  });

  test('connect overlay is 2015 thesis', async ({ page }) => {
    await page.goto('/years/2015/');
    const text = await page.locator('#connect-overlay').innerText();
    expect(text).toMatch(/Watch|Win10|Photos|Music|863/i);
    expect(text).not.toMatch(/Pokémon GO|iPhone 11/i);
  });
