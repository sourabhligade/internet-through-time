// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2001 museum densify', () => {
  test('wikipedia densify nav Recent changes', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/index.html');
    await expect(page.locator('body')).toContainText('Recent changes');
    await expect(page.locator('a[href="community.html"]').first()).toBeVisible();
    await expect(page.locator('a[href="languages.html"]').first()).toBeVisible();
  });

  test('iPod multipage specs howto', async ({ page }) => {
    await page.goto('/years/2001/sites/apple/ipod.html');
    await expect(page.locator('body')).toContainText(/1,000 songs/i);
    await expect(page.locator('a[href="ipod/specs.html"]')).toBeVisible();
    await page.goto('/years/2001/sites/apple/ipod/specs.html');
    await expect(page.locator('body')).toContainText(/FireWire|5 GB|1,000/i);
  });

  test('Google WA logo 2001', async ({ page }) => {
    await page.goto('/years/2001/sites/google/index.html');
    await expect(page.locator('img[src*="logo-wa-2001"]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/©2001 Google|© 2001 Google/i);
  });

  test('broadband ISP theater', async ({ page }) => {
    await page.goto('/years/2001/sites/broadband/index.html');
    await expect(page.locator('body')).toContainText(/Always-on|broadband|DSL/i);
    await page.click('#speed-check');
    await expect(page.locator('#speed-out')).toContainText(/kbps|museum/i, { timeout: 3000 });
  });

  test('shell XP Start not Win98', async ({ page }) => {
    await enterYear(page, '2001');
    await expect(page.locator('body')).toHaveClass(/year-2001/);
    const startSrc = await page.locator('#btn-start img').getAttribute('src');
    expect(startSrc || '').toMatch(/xp\/start/);
    await expect(page.locator('.start-banner-text')).toContainText(/XP/i);
  });

  test('no Store as 2001 product on iPod', async ({ page }) => {
    await page.goto('/years/2001/sites/apple/ipod.html');
    await expect(page.locator('body')).toContainText(/still in the future|Not a music store/i);
  });
});
