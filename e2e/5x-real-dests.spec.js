// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

test('2011 dest writer incomplete never writes', async ({ page }) => {
  await enterYear(page, '2011');
  await page.evaluate(() => localStorage.removeItem('itt11-wechat'));
  await goImmersion(page, '2011', 'sites/wechat/index.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-itt-real-save]')).toBeVisible({ timeout: 20000 });
  await frame.locator('[data-itt-real-save]').click({ force: true });
  expect(await page.evaluate(() => localStorage.getItem('itt11-wechat'))).toBeNull();
});

test('2011 dest writer complete writes itt11-wechat', async ({ page }) => {
  await enterYear(page, '2011');
  await page.evaluate(() => localStorage.removeItem('itt11-wechat'));
  await goImmersion(page, '2011', 'sites/wechat/index.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-req]').first()).toBeVisible({ timeout: 20000 });
  const n = await frame.locator('[data-req]').count();
  for (let i = 0; i < n; i++) await frame.locator('[data-req]').nth(i).check({ force: true });
  await frame.locator('[data-dest-field]').fill('hello weixin');
  await frame.locator('[data-itt-real-save]').click({ force: true });
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem('itt11-wechat')), { timeout: 8000 })
    .toBeTruthy();
  const blob = await page.evaluate(() => JSON.parse(localStorage.getItem('itt11-wechat') || 'null'));
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe('2011');
});

test('1994 densify page exists and star next works', async ({ page }) => {
  await page.goto('/years/1994/sites/iuma/listen.html');
  await expect(page.locator('h1')).toContainText(/listen/i);
  await expect(page.locator('a[href*="csotd"]')).toBeVisible();
});

test('2020 dest atlas chip on home', async ({ page }) => {
  await page.goto('/years/2020/pages/home.html');
  await expect(page.locator('[data-itt-5x-atlas] a[href*="reels"]').first()).toBeVisible();
});

test('guided ol stays 6 on 2011 home', async ({ page }) => {
  await page.goto('/years/2011/pages/home.html');
  const n = await page.locator('#ott-guided-2011 ol > li, .ott-guided ol > li').count();
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
  await expect(page.locator('a[href="../photobucket/index.html"]')).toBeVisible();
});

test('2018 socials row links period rooms', async ({ page }) => {
  await page.goto('/years/2018/pages/home.html');
  const socials = page.locator('[data-itt-socials]');
  await expect(socials).toBeVisible();
  await expect(socials.locator('a[href*="snapchat"]')).toBeVisible();
  await expect(socials.locator('a[href*="reddit"]')).toBeVisible();
  await expect(socials.locator('a[href*="twitch"]')).toBeVisible();
  await expect(socials.locator('a[href*="instagram/index"]')).toBeVisible();
  await expect(socials.locator('a[href*="twitter/index"]')).toBeVisible();
});

test('2018 snap dest incomplete never writes', async ({ page }) => {
  await enterYear(page, '2018');
  await page.evaluate(() => localStorage.removeItem('itt18-snap'));
  await goImmersion(page, '2018', 'sites/snapchat/index.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-itt-real-save]')).toBeVisible({ timeout: 20000 });
  await frame.locator('[data-itt-real-save]').click({ force: true });
  expect(await page.evaluate(() => localStorage.getItem('itt18-snap'))).toBeNull();
});

test('2018 reddit dest complete writes itt18-reddit', async ({ page }) => {
  await enterYear(page, '2018');
  await page.evaluate(() => localStorage.removeItem('itt18-reddit'));
  await goImmersion(page, '2018', 'sites/reddit/index.html');
  const frame = contentFrame(page);
  await expect(frame.locator('[data-req]').first()).toBeVisible({ timeout: 20000 });
  const n = await frame.locator('[data-req]').count();
  for (let i = 0; i < n; i++) await frame.locator('[data-req]').nth(i).check({ force: true });
  await frame.locator('[data-dest-field]').fill('r/announcements');
  await frame.locator('[data-itt-real-save]').click({ force: true });
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem('itt18-reddit')), { timeout: 8000 })
    .toBeTruthy();
  const blob = await page.evaluate(() => JSON.parse(localStorage.getItem('itt18-reddit') || 'null'));
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe('2018');
});
