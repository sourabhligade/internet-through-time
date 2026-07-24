// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1998 museum authenticity', () => {
  test('Google period logo GIF and search hooks', async ({ page }) => {
    await enterYear(page, '1998');
    await goInFrame(page, 'sites/google/index.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('img[src*="1998/google/logo"]').first()).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('form[data-google-search]')).toBeVisible();
    await expect(frame.locator('input[data-google-lucky], input[name="btnI"]').first()).toBeVisible();
  });

  test('eBay uses black period logo and My eBay + IPO framing', async ({ page }) => {
    await enterYear(page, '1998');
    await goInFrame(page, 'sites/ebay/index.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('.eb-logo img[src*="ebay"]').first()).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('a[href*="myebay"]').first()).toBeVisible();
    await expect(frame.locator('body')).toContainText(/IPO|public|NASDAQ|EBAY/i);
    const multi = await frame.locator('.eb-logo .eb-e, .eb-logo .eb-b').count();
    expect(multi).toBe(0);
  });

  test('Amazon Music tab and no smile branding', async ({ page }) => {
    await enterYear(page, '1998');
    await goInFrame(page, 'sites/amazon/index.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('a[href*="music"]').first()).toBeVisible({ timeout: 15000 });
    const html = await frame.locator('body').innerHTML();
    expect(html.toLowerCase()).not.toMatch(/smile-logo|amazon-smile/);
  });

  test('Yahoo denser portal + My Yahoo', async ({ page }) => {
    await enterYear(page, '1998');
    await goInFrame(page, 'sites/yahoo/index.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('text=World Yahoos').first()).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('a[href*="my.html"]').first()).toBeVisible();
  });

  test('Win98 start asset in shell', async ({ page }) => {
    await enterYear(page, '1998');
    const start = page.locator('img[src*="1998/win98/start"], img[src*="win98/start"]');
    await expect(start.first()).toBeVisible({ timeout: 10000 });
  });
});
