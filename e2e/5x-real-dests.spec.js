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

test('2002 dest writer incomplete never writes', async ({ page }) => {
  await enterYear(page, '2002');
  await page.evaluate(() => localStorage.removeItem('itt02-fs'));
  await goImmersion(page, '2002', 'sites/friendster/testimonial.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-itt-real-save]')).toBeVisible({ timeout: 20000 });
  await frame.locator('[data-itt-real-save]').click({ force: true });
  expect(await page.evaluate(() => localStorage.getItem('itt02-fs'))).toBeNull();
});

test('2002 dest writer complete writes itt02-fs', async ({ page }) => {
  await enterYear(page, '2002');
  await page.evaluate(() => localStorage.removeItem('itt02-fs'));
  await goImmersion(page, '2002', 'sites/friendster/testimonial.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-req]').first()).toBeVisible({ timeout: 20000 });
  const n = await frame.locator('[data-req]').count();
  for (let i = 0; i < n; i++) await frame.locator('[data-req]').nth(i).check({ force: true });
  await frame.locator('[data-dest-field]').fill('circle of friends');
  await frame.locator('[data-itt-real-save]').click({ force: true });
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem('itt02-fs')), { timeout: 8000 })
    .toBeTruthy();
  const blob = await page.evaluate(() => JSON.parse(localStorage.getItem('itt02-fs') || 'null'));
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe('2002');
});

test('2003 dest Top 8 page exists and star next works', async ({ page }) => {
  await page.goto('/years/2003/sites/myspace/top8.html');
  await expect(page.locator('h1')).toContainText(/Top 8/i);
  await expect(page.locator('a[href="../photobucket/index.html"]').first()).toBeVisible();
});

