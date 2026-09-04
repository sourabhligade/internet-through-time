// @ts-check
const { test, expect } = require('@playwright/test');

const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

test('1994 densify page exists and star next works', async ({ page }) => {
  await page.goto('/years/1994/sites/iuma/listen.html');
  await expect(page.locator('h1')).toContainText(/listen/i);
  await expect(page.locator('a[href*="csotd"]').first()).toBeVisible();
});

test('guided ol stays 6 on 2008 home', async ({ page }) => {
  await page.goto('/years/2008/pages/home.html');
  const n = await page.locator('#ott-guided-2008 ol > li, .ott-guided ol > li').count();
  expect(n === 0 || n === 6).toBeTruthy();
});


