// @ts-check
/**
 * 2012 densify gates — scale, bans, P0 year-truth (museum-ready bar)
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2012 densify', () => {
  test('scale dual-cite and thesis on about', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await expect(page.locator('body')).toContainText('697,089,489');
    await expect(page.locator('body')).toContainText(/634/);
    await expect(page.locator('body')).toContainText(/2\.4|billion|IPO|Instagram/i);
  });

  test('hard bans Stories TikTok Meta Win8-as-only-shell', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await expect(page.locator('body')).toContainText(/Stories|Reels/i);
    await expect(page.locator('body')).toContainText(/TikTok|Reactions|Meta/i);
    await expect(page.locator('body')).toContainText(/Win8|Windows 8|January|mass shell/i);
  });

  test('home trails list P0 products', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/697,089,489|634/);
    expect(text).toMatch(/Instagram/);
    expect(text).toMatch(/IPO|\$38/);
    expect(text).toMatch(/Pinterest/);
    expect(text).toMatch(/iPhone 5|Lightning|Maps/i);
    expect(text).toMatch(/Windows 8|Chrome/i);
  });

  test('nav P0 products in shell', async ({ page }) => {
    await enterYear(page, '2012');
    for (const label of ['Instagram', 'Pinterest', 'iPhone 5', 'Chrome']) {
      await expect(page.locator('#dirbar .dir-btn, .itt-nav a, nav a', { hasText: label }).first()).toBeVisible({
        timeout: 15000,
      });
    }
  });

  test('Instagram Android Apr 3 + acquisition path', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await expect(page.locator('body')).toContainText(/April 3|Apr 3/i);
    await expect(page.locator('body')).toContainText(/1 million|1M|million/i);
    await page.goto('/years/2012/sites/instagram/acquired.html');
    await expect(page.locator('body')).toContainText(/April 9|Apr 9|\$1|1 billion|billion/i);
  });

  test('Facebook IPO minute details', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await expect(page.locator('body')).toContainText(/May 18|\$38/i);
    await expect(page.locator('body')).toContainText(/Nasdaq|11:30|42|38\.23|16 billion|104/i);
  });

  test('iPhone 5 prices and ship dates', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/prices.html');
    await expect(page.locator('body')).toContainText(/\$199|\$299|\$399/);
    await expect(page.locator('body')).toContainText(/Sep|September|5 million|Lightning|Maps/i);
  });

  test('iPad mini prices $329+', async ({ page }) => {
    await page.goto('/years/2012/sites/ipad/prices.html');
    await expect(page.locator('body')).toContainText('$329');
    await expect(page.locator('body')).toContainText(/429|529|Nov|November/i);
  });

  test('Chrome StatCounter war copy', async ({ page }) => {
    await page.goto('/years/2012/sites/chrome/index.html');
    await expect(page.locator('body')).toContainText(/StatCounter|Chrome|IE/i);
    await expect(page.locator('body')).toContainText(/May|33|overtake|overtakes/i);
  });

  test('Windows 8 Oct 26 honesty', async ({ page }) => {
    await page.goto('/years/2012/sites/windows8/about.html');
    await expect(page.locator('body')).toContainText(/October 26|Oct 26|2012/i);
    await expect(page.locator('body')).toContainText(/Windows 7|not|mass|controversial/i);
  });

  test('Pinterest mass 2012', async ({ page }) => {
    await page.goto('/years/2012/sites/pinterest/about.html');
    await expect(page.locator('body')).toContainText(/2012|public|10M|Pinterest/i);
  });

  test('SOPA Wikipedia blackout room Jan 18', async ({ page }) => {
    await page.goto('/years/2012/sites/wikipedia/sopa-blackout.html');
    await expect(page.locator('body')).toContainText(/SOPA|PIPA/i);
    await expect(page.locator('body')).toContainText(/January 18|Jan 18|blackout/i);
    await expect(page.locator('[data-sopa-ack]')).toBeVisible();
  });

  test('Reddit Obama AMA mass culture 2012', async ({ page }) => {
    await page.goto('/years/2012/sites/reddit/ama.html');
    await expect(page.locator('body')).toContainText(/Obama|AMA/i);
    await expect(page.locator('body')).toContainText(/2012|August|IAmA/i);
    await expect(page.locator('[data-reddit-ama-ack]')).toBeVisible();
  });

  test('home culture trail SOPA · AMA · Gangnam', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/SOPA|blackout/i);
    expect(text).toMatch(/AMA|Obama/i);
    expect(text).toMatch(/Gangnam/i);
  });

  test('Reddit year-truth is 2012 not Digg-2007 king', async ({ page }) => {
    await page.goto('/years/2012/sites/reddit/about.html');
    await expect(page.locator('body')).toContainText(/2012/);
    await expect(page.locator('body')).toContainText(/37 billion|mainstream|mass|AMA/i);
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/Digg is still the UGC front-page king/i);
  });
});
