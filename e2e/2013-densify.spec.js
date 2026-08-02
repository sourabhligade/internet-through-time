// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2013 densify', () => {
  test('scale dual-cite on about', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText('672,985,183');
    await expect(page.locator('body')).toContainText(/2\.756|2,756|billion/i);
  });

  test('home trails P0 products', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Connection trails|Six-second/i);
    expect(text).toMatch(/Vine/);
    expect(text).toMatch(/Stories|Snapchat/i);
    expect(text).toMatch(/iOS 7|Touch ID|5s/i);
    expect(text).toMatch(/Snowden|PRISM/i);
  });

  test('whats-new is 2013 spine not prior-year scaffold', async ({ page }) => {
    await page.goto('/years/2013/pages/whats-new.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/What.?s New in 2013|2013/i);
    expect(text).not.toMatch(/What.?s New in 2012/i);
    expect(text).toMatch(/Vine/);
    expect(text).toMatch(/Stories|Snowden|iOS 7/i);
  });

  test('Vine Jan 24 about', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/about.html');
    await expect(page.locator('body')).toContainText(/January 24|Jan 24|6 second/i);
  });

  test('IG Video 15s', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await expect(page.locator('body')).toContainText(/15 second|15s|June 20/i);
    await expect(page.locator('[data-igv-share]')).toBeVisible();
  });

  test('Snapchat Stories Oct 3', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/story.html');
    await expect(page.locator('body')).toContainText(/October 3|24 hour|Stories/i);
  });

  test('Snapchat index promotes Stories (2013 honesty)', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/index.html');
    await expect(page.locator('body')).toContainText(/Stories|My Story|October 3|Oct 3/i);
    await expect(page.locator('body')).not.toContainText(/still not Stories/i);
    await expect(page.locator('a[href*="story"]').first()).toBeVisible();
  });

  test('Chrome 2013 narrative not 2012-only seed', async ({ page }) => {
    await page.goto('/years/2013/sites/chrome/index.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/2013/);
    expect(text).toMatch(/Chrome/i);
    await expect(page.locator('[data-chrome-download]')).toBeVisible();
  });

  test('Bitcoin / Silk Road news literacy on about', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText(/Bitcoin|Silk Road/i);
    await expect(page.locator('[data-btc-note]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/news|no market|literacy/i);
  });

  test('PS4 and Xbox One launch honesty', async ({ page }) => {
    await page.goto('/years/2013/sites/ps4/index.html');
    await expect(page.locator('body')).toContainText(/November 15|Nov 15|2013/i);
    await page.goto('/years/2013/sites/xboxone/index.html');
    await expect(page.locator('body')).toContainText(/November 22|Nov 22|2013/i);
  });


  test('iOS 7 and Touch ID rooms', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await expect(page.locator('body')).toContainText(/iOS 7|September 18|flat/i);
    await page.goto('/years/2013/sites/iphone/touchid.html');
    await expect(page.locator('body')).toContainText(/Touch ID|5s/i);
  });

  test('Win8.1 Oct 17 honesty', async ({ page }) => {
    await page.goto('/years/2013/sites/windows81/about.html');
    await expect(page.locator('body')).toContainText(/October 17|Oct 17|2013/i);
    await expect(page.locator('body')).toContainText(/Windows 7|Start|upgrade/i);
  });

  test('Snowden culture room', async ({ page }) => {
    await page.goto('/years/2013/sites/snowden/index.html');
    await expect(page.locator('body')).toContainText(/PRISM|Snowden|June/i);
    await expect(page.locator('[data-snowden-ack]')).toBeVisible();
  });

  test('nav P0 in shell', async ({ page }) => {
    await enterYear(page, '2013');
    for (const label of ['Vine', 'Chrome', 'iOS 7']) {
      await expect(page.locator('#dirbar .dir-btn, .itt-nav a, nav a', { hasText: label }).first()).toBeVisible({
        timeout: 15000,
      });
    }
  });
});
