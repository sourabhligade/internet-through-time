// @ts-check
/**
 * 2008 densify gates — scale, bans, year-truth scrub, P0 products.
 * Maps to docs/2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md
 */
const { test, expect } = require('@playwright/test');

test.describe('2008 densify', () => {
  test('scale and thesis on about', async ({ page }) => {
    await page.goto('/years/2008/pages/about.html');
    await expect(page.locator('body')).toContainText('172,338,726');
    await expect(page.locator('body')).toContainText(/Dropbox/i);
    await expect(page.locator('body')).toContainText(/1\.57B|1570|1,57/i);
    await expect(page.locator('body')).toContainText(/App Store|iPhone 3G|Chrome|G1|Hulu/i);
  });

  test('hard bans present; App Store not banned as year default', async ({ page }) => {
    await page.goto('/years/2008/pages/about.html');
    await expect(page.locator('body')).toContainText(/3GS/i);
    await expect(page.locator('body')).toContainText(/Spotify/i);
    await expect(page.locator('body')).toContainText(/not US|Europe|2011/i);
    const text = await page.locator('body').innerText();
    expect(text.toLowerCase()).not.toMatch(/app store is banned|no app store this year/);
  });

  test('no 2007 App Store ban as year default on home', async ({ page }) => {
    await page.goto('/years/2008/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/no App Store yet/i);
    expect(text).toMatch(/App Store/i);
    expect(text).toMatch(/172,338,726/);
    expect(text).toMatch(/Chrome|Android|Hulu/i);
  });

  test('dirbar P0 products in shell', async ({ page }) => {
    await page.goto('/years/2008/');
    const skip = page.locator('#skip-connect');
    if (await skip.isVisible().catch(() => false)) await skip.click();
    for (const label of ['App Store', 'iPhone', 'Chrome', 'Android', 'Hulu']) {
      await expect(page.locator('#dirbar .dir-btn', { hasText: label })).toBeVisible();
    }
  });

  test('Firefox 3 Download Day framing', async ({ page }) => {
    await page.goto('/years/2008/sites/firefox/index.html');
    await expect(page.locator('body')).toContainText(/Firefox 3|Download Day/i);
  });

  test('Netflix discs + stream honesty', async ({ page }) => {
    await page.goto('/years/2008/sites/netflix/index.html');
    await expect(page.locator('body')).toContainText(/Watch Instantly|stream|DVD|envelope/i);
    // Honesty line: still discs + stream densify (not a disc-free product)
    await expect(page.locator('body')).toContainText(/Not yet a streaming-only|disc subscribers|red-envelope|DVD mail/i);
  });

  test('iPhone about rejects 3GS as this year', async ({ page }) => {
    await page.goto('/years/2008/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/3GS|2009/i);
    await expect(page.locator('body')).toContainText(/\$199|\$299|Jul 11/i);
    await expect(page.locator('body')).toContainText(/App Store/i);
  });

  test('Chrome Windows-first · not sole shell', async ({ page }) => {
    await page.goto('/years/2008/sites/chrome/about.html');
    await expect(page.locator('body')).toContainText(/Windows|Sep|Dec|1\.0/i);
    await expect(page.locator('body')).toContainText(/IE|XP|mass/i);
  });

  test('Android first-phone · not global mass', async ({ page }) => {
    await page.goto('/years/2008/sites/android/about.html');
    await expect(page.locator('body')).toContainText(/first|G1|Oct|T-Mobile/i);
    await expect(page.locator('body')).toContainText(/not|mass|global|every phone/i);
  });

  test('Hulu public Mar 12', async ({ page }) => {
    await page.goto('/years/2008/sites/hulu/about.html');
    await expect(page.locator('body')).toContainText(/Mar(?:ch)?\s*12|2008|public/i);
  });

  test('YouTube HD late-year densify', async ({ page }) => {
    await page.goto('/years/2008/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/Google/i);
    await expect(page.locator('body')).toContainText(/720p|HD|Flash/i);
  });

  test('Facebook Connect + Beacon residual (not 2009 shutdown as live default)', async ({ page }) => {
    await page.goto('/years/2008/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Connect/i);
    await expect(page.locator('body')).toContainText(/Beacon/i);
    await expect(page.locator('body')).toContainText(/2009/i);
  });

  test('Gmail remains open (not invite-only year story)', async ({ page }) => {
    await page.goto('/years/2008/sites/gmail/about.html');
    await expect(page.locator('body')).toContainText(/Feb(?:ruary)?\s*14|open|everyone/i);
  });

  test('immersion config storagePrefix itt08', async ({ page }) => {
    await page.goto('/years/2008/pages/home.html');
    await page.waitForFunction(
      () => window.ITT && ITT.immersionConfigs && ITT.immersionConfigs['2008'],
      null,
      { timeout: 20000 }
    );
    const prefix = await page.evaluate(() => ITT.immersionConfigs['2008'].storagePrefix);
    expect(prefix).toBe('itt08');
  });
});
