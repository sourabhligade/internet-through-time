// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, killOverlays } = require('./helpers');

test.describe('2016 shell honesty', () => {
  test('shell boots 2016', async ({ page }) => {
    await page.goto('/years/2016/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2016');
  });

  test('connect overlay is 2016 thesis', async ({ page }) => {
    await page.goto('/years/2016/');
    const text = await page.locator('#connect-overlay').innerText();
    expect(text).toMatch(/Stories|GO|Reactions|jack|Vine|E2E|WhatsApp/i);
    expect(text).not.toMatch(/Watch ships · free Win10 · go live · Music · Photos/i);
  });

  test('Win10 free upgrade ended Jul 29', async ({ page }) => {
    await page.goto('/years/2016/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/ended|Jul(y)?\s*29|free upgrade/i);
  });

  test('Stories allowed as 2016 product', async ({ page }) => {
    await page.goto('/years/2016/sites/instagram/stories.html');
    await expect(page.locator('body')).toContainText(/Aug(ust)?\s*2|2016|Stories/i);
    await expect(page.locator('[data-ig-story-add]')).toBeVisible();
  });

  test('Edge is not Chromium era', async ({ page }) => {
    await page.goto('/years/2016/sites/edge/index.html');
    await expect(page.locator('body')).toContainText(/not.*Chromium|Spartan|EdgeHTML/i);
  });

  test('About bans TikTok brand and Meta', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await expect(page.locator('body')).toContainText(/TikTok/i);
    await expect(page.locator('body')).toContainText(/Meta|Reels/i);
  });

  test('Switch is announce ships 2017', async ({ page }) => {
    await page.goto('/years/2016/sites/nintendo/switch.html');
    await expect(page.locator('body')).toContainText(/2017|announce|Oct/i);
  });

  test('shell content iframe works', async ({ page }) => {
    await enterYear(page, '2016');
    await killOverlays(page);
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2016');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('hub has 2016 card', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2016"]').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/1994[–-]2020|1994[–-]2016|1,045,534,808/i);
  });

  test('musical.ly not TikTok product title', async ({ page }) => {
    await page.goto('/years/2016/sites/musically/index.html');
    const title = await page.title();
    expect(title).toMatch(/musical/i);
    expect(title.toLowerCase()).not.toBe('tiktok');
  });

  test('Rift not Quest invent', async ({ page }) => {
    await page.goto('/years/2016/sites/oculus/rift.html');
    await expect(page.locator('body')).toContainText(/not invent.*Quest|tethered|CV1|\$599/i);
  });

  test('WA E2E April 2016 literacy present', async ({ page }) => {
    await page.goto('/years/2016/sites/whatsapp/security.html');
    await expect(page.locator('body')).toContainText(/April|E2E|encrypt|default/i);
    await expect(page.locator('[data-itt-real-save][data-storage-key="wa-e2e"]')).toBeVisible();
  });

  test('Snap residual competitor war copy', async ({ page }) => {
    await page.goto('/years/2016/sites/snapchat/story.html');
    await expect(page.locator('body')).toContainText(/Stories war|still|compet/i);
    await expect(page.locator('body')).toContainText(/Instagram Stories|Aug 2/i);
  });

  test('Edge two-step prefer blocked without download', async ({ page }) => {
    await page.goto('/years/2016/sites/edge/index.html');
    await page.evaluate(() => localStorage.removeItem('itt16-edge'));
    await page.reload();
    await expect(page.locator('[data-edge-download]')).toBeVisible();
    await expect(page.locator('[data-edge-prefer]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/not.*Chromium|Spartan/i);
  });
});

  test('dirbar points at 2016 P0 not iPhone 5s/Win8.1', async ({ page }) => {
    await page.goto('/years/2016/');
    await expect(page.locator('.dir-btn[data-go*="stories"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go*="pokemongo"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go*="reactions"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go*="jack"]')).toBeVisible();
    await expect(page.locator('.dir-btn[data-go="sites/windows81/index.html"]')).toHaveCount(0);
    await expect(page.locator('.dir-btn[data-go="sites/iphone/ios7.html"]')).toHaveCount(0);
  });
