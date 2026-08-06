// @ts-check
/**
 * 2010 densify gates — scale, bans, year-truth, P0 products.
 * docs/2010-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2010 densify', () => {
  test('scale and thesis on about', async ({ page }) => {
    await page.goto('/years/2010/pages/about.html');
    await expect(page.locator('body')).toContainText('206,956,723');
    await expect(page.locator('body')).toContainText(/255|2\.05|1\.97|2B|600/i);
    await expect(page.locator('body')).toContainText(/iPad|iPhone 4|Instagram|Open Graph|FarmVille/i);
  });

  test('hard bans present; iPad is product not ban-only', async ({ page }) => {
    await page.goto('/years/2010/pages/about.html');
    await expect(page.locator('body')).toContainText(/Spotify/i);
    await expect(page.locator('body')).toContainText(/US|2011/i);
    await expect(page.locator('body')).toContainText(/Snapchat|UberX|Stories|Reactions/i);
    const text = await page.locator('body').innerText();
    expect(text.toLowerCase()).toMatch(/ipad/);
    expect(text.toLowerCase()).not.toMatch(/ipad is banned as a 2010 product/);
  });

  test('home trails list P0 products', async ({ page }) => {
    await page.goto('/years/2010/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/206,956,723/);
    expect(text).toMatch(/iPad/);
    expect(text).toMatch(/Instagram/);
    expect(text).toMatch(/iPhone 4/);
    expect(text).toMatch(/Foursquare|FarmVille|App Store/i);
    expect(text).toMatch(/Tablet arrives|Phone leap|Filter social|Social web/i);
  });

  test('dirbar P0 products in shell', async ({ page }) => {
    await enterYear(page, '2010');
    for (const label of ['iPad', 'iPhone 4', 'Instagram', 'Facebook', 'App Store', 'Foursquare']) {
      await expect(page.locator('#dirbar .dir-btn', { hasText: label })).toBeVisible();
    }
  });

  test('iPad prices and dates', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/about.html');
    await expect(page.locator('body')).toContainText(/\$499|Jan 27|March|2010/i);
  });

  test('iPhone 4 flagship · Antennagate · not 3GS-only hero', async ({ page }) => {
    await page.goto('/years/2010/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText(/iPhone 4/i);
    await expect(page.locator('body')).toContainText(/FaceTime|Retina/i);
    await expect(page.locator('body')).toContainText(/Antennagate|\$199/i);
    const t = await page.locator('body').innerText();
    expect(t).not.toMatch(/3GS is the 2009 flagship as the only phone story/i);
  });

  test('App Store 225k / 5B honesty', async ({ page }) => {
    await page.goto('/years/2010/sites/appstore/index.html');
    await expect(page.locator('body')).toContainText(/225|5 billion|5B/i);
    await expect(page.locator('[data-appstore-catalog], [data-appstore-install]').first()).toBeVisible({
      timeout: 20000,
    });
  });

  test('Instagram iOS-only · no Stories product', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await expect(page.locator('body')).toContainText(/iOS only|iOS-only|Oct 6/i);
    await expect(page.locator('body')).toContainText(/not.*Android|not.*Stories|not.*Reels|Facebook-owned/i);
    await expect(page.locator('[data-ig-share]')).toBeVisible();
  });

  test('Facebook Open Graph · Places · peak scale', async ({ page }) => {
    await page.goto('/years/2010/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Open Graph|600|Places/i);
    await page.goto('/years/2010/sites/facebook/places.html');
    await expect(page.locator('body')).toContainText(/Places|check-in|Foursquare/i);
  });

  test('FarmVille peak year honesty', async ({ page }) => {
    await page.goto('/years/2010/sites/farmville/index.html');
    await expect(page.locator('body')).toContainText(/peak|84|March 2010/i);
    await expect(page.locator('[data-farm-plant]').first()).toBeVisible();
  });

  test('Foursquare peak culture', async ({ page }) => {
    await page.goto('/years/2010/sites/foursquare/index.html');
    await expect(page.locator('body')).toContainText(/2010|peak|mayor|Gowalla/i);
    await expect(page.locator('[data-4sq-checkin]').first()).toBeVisible();
  });

  test('Wave public then funeral', async ({ page }) => {
    await page.goto('/years/2010/sites/wave/index.html');
    await expect(page.locator('body')).toContainText(/May 19|public/i);
    await expect(page.locator('body')).toContainText(/Aug 4|stop development|funeral/i);
  });

  test('Uber SF black-car not UberX mass', async ({ page }) => {
    await page.goto('/years/2010/sites/uber/index.html');
    await expect(page.locator('body')).toContainText(/black.car|San Francisco/i);
    await expect(page.locator('body')).toContainText(/not.*UberX|not.*every city/i);
  });

  test('Spotify Europe · US ban', async ({ page }) => {
    await page.goto('/years/2010/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText(/Europe/i);
    await expect(page.locator('body')).toContainText(/not.*US|2011/i);
  });

  test('Android Nexus One framing', async ({ page }) => {
    await page.goto('/years/2010/sites/android/index.html');
    await expect(page.locator('body')).toContainText(/Nexus|Jan 5|2010/i);
  });

  test('IE9 is beta · shell remains IE8 path', async ({ page }) => {
    await page.goto('/years/2010/sites/ie9/index.html');
    await expect(page.locator('body')).toContainText(/beta|Sep 15|2010/i);
    await expect(page.locator('body')).toContainText(/IE 8|Win7|Windows 7/i);
  });

  test('Windows 7 mass year of 2010', async ({ page }) => {
    await page.goto('/years/2010/sites/windows7/index.html');
    await expect(page.locator('body')).toContainText(/2010|mass|IE 8/i);
  });

  test('Twitter New Twitter 2010 about', async ({ page }) => {
    await page.goto('/years/2010/sites/twitter/about.html');
    await expect(page.locator('body')).toContainText(/New Twitter|redesign|2010|140/i);
  });

  test('Pinterest beta honesty', async ({ page }) => {
    await page.goto('/years/2010/sites/pinterest/index.html');
    await expect(page.locator('body')).toContainText(/beta|March 2010|not 2012/i);
    await expect(page.locator('[data-pin-save]').first()).toBeVisible();
  });
});
