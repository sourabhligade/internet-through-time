// @ts-check
const { test, expect } = require('@playwright/test');

const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

test('1994 densify page exists and star next works', async ({ page }) => {
  await page.goto('/years/1994/sites/iuma/listen.html');
  await expect(page.locator('h1')).toContainText(/listen/i);
  await expect(page.locator('a[href*="csotd"]').first()).toBeVisible();
});

test('1994 IUMA lobby links listen', async ({ page }) => {
  await page.goto('/years/1994/sites/iuma/index.html');
  await expect(page.locator('a[href="listen.html"]').first()).toBeVisible();
});

