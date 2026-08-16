// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame } = require('./helpers');

test('2021 ATT Allow never writes', async ({ page }) => {
  await enterYear(page, '2021');
  await page.evaluate(() => localStorage.removeItem('itt21-att'));
  await goImmersion(page, '2021', 'sites/att/index.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-att-allow]')).toBeVisible({ timeout: 20000 });
  await frame.locator('[data-att-allow]').click({ force: true });
  expect(await page.evaluate(() => localStorage.getItem('itt21-att'))).toBeNull();
});

test('2021 ATT incomplete save never writes', async ({ page }) => {
  await enterYear(page, '2021');
  await page.evaluate(() => localStorage.removeItem('itt21-att'));
  await goImmersion(page, '2021', 'sites/att/index.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-itt-real-save]')).toBeVisible({ timeout: 20000 });
  await frame.locator('[data-itt-real-save]').click({ force: true });
  expect(await page.evaluate(() => localStorage.getItem('itt21-att'))).toBeNull();
});

test('2021 ATT complete writes itt21-att', async ({ page }) => {
  await enterYear(page, '2021');
  await page.evaluate(() => localStorage.removeItem('itt21-att'));
  await goImmersion(page, '2021', 'sites/att/index.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-req]').first()).toBeVisible({ timeout: 20000 });
  const n = await frame.locator('[data-req]').count();
  for (let i = 0; i < n; i++) await frame.locator('[data-req]').nth(i).check({ force: true });
  await frame.locator('[data-dest-field]').fill('not to track');
  await frame.locator('[data-itt-real-save]').click({ force: true });
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem('itt21-att')), { timeout: 8000 })
    .toBeTruthy();
  const blob = await page.evaluate(() => JSON.parse(localStorage.getItem('itt21-att') || 'null'));
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe('2021');
});

test('2021 guided ol stays 6', async ({ page }) => {
  await page.goto('/years/2021/pages/home.html');
  const n = await page.locator('#ott-guided-2021 ol > li').count();
  expect(n).toBe(6);
});

test('2021 Signal incomplete never writes', async ({ page }) => {
  await enterYear(page, '2021');
  await page.evaluate(() => localStorage.removeItem('itt21-signal'));
  await goImmersion(page, '2021', 'sites/signal/index.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-itt-real-save]')).toBeVisible({ timeout: 20000 });
  await frame.locator('[data-itt-real-save]').click({ force: true });
  expect(await page.evaluate(() => localStorage.getItem('itt21-signal'))).toBeNull();
});
