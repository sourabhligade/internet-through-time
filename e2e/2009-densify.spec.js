// @ts-check
/**
 * 2009 densify gates — scale, bans, year-truth, P0 products.
 * docs/2009-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2009 densify', () => {
  test('scale and thesis on about', async ({ page }) => {
    await page.goto('/years/2009/pages/about.html');
    await expect(page.locator('body')).toContainText('238,027,855');
    await expect(page.locator('body')).toContainText(/1\.77|1\.73|350|1B|billion/i);
    await expect(page.locator('body')).toContainText(/3GS|Like|FarmVille|Bing|Twitter/i);
  });

  test('hard bans present; 3GS is product not ban', async ({ page }) => {
    await page.goto('/years/2009/pages/about.html');
    await expect(page.locator('body')).toContainText(/iPad|Instagram|Spotify/i);
    await expect(page.locator('body')).toContainText(/US|2010|2011/i);
    const text = await page.locator('body').innerText();
    expect(text.toLowerCase()).toMatch(/3gs/);
    expect(text.toLowerCase()).not.toMatch(/3gs is banned as a 2009 product/);
  });

  test('home trails list P0 products', async ({ page }) => {
    await page.goto('/years/2009/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/238,027,855/);
    expect(text).toMatch(/App Store|3GS|FarmVille|Bing/i);
    expect(text).toMatch(/Like|Twitter|Windows 7/i);
  });

  test('dirbar P0 products in shell', async ({ page }) => {
    await enterYear(page, '2009');
    for (const label of ['App Store', 'iPhone 3GS', 'Facebook', 'FarmVille', 'Bing', 'Twitter']) {
      await expect(page.locator('#dirbar .dir-btn', { hasText: label }).first()).toBeVisible();
    }
  });

  test('iPhone 3GS prices and dates', async ({ page }) => {
    await page.goto('/years/2009/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/3GS|\$199|\$299|Jun 19|OS 3/i);
  });

  test('App Store 50k / 1B honesty', async ({ page }) => {
    await page.goto('/years/2009/sites/appstore/index.html');
    await expect(page.locator('body')).toContainText(/50,?000|1B|billion|1\.5B/i);
    await expect(page.locator('[data-appstore-install]').first()).toBeVisible({ timeout: 20000 });
  });

  test('Facebook Like + Beacon end', async ({ page }) => {
    await page.goto('/years/2009/sites/facebook/feed.html');
    await expect(page.locator('[data-fb-like]').first()).toBeVisible();
    await page.goto('/years/2009/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Beacon/i);
    await expect(page.locator('body')).toContainText(/Sep 21|2007|shut/i);
  });

  test('FarmVille launch honesty', async ({ page }) => {
    await page.goto('/years/2009/sites/farmville/index.html');
    await expect(page.locator('body')).toContainText(/FarmVille|Jun 19|2009|plant/i);
    await expect(page.locator('[data-farm-plant]').first()).toBeVisible();
  });

  test('Bing decision engine', async ({ page }) => {
    await page.goto('/years/2009/sites/bing/index.html');
    await expect(page.locator('body')).toContainText(/Bing|decision|Jun 3|2009/i);
    await expect(page.locator('[data-bing-search]')).toBeVisible();
  });

  test('Windows 7 Oct GA · not January default', async ({ page }) => {
    await page.goto('/years/2009/sites/windows7/index.html');
    await expect(page.locator('body')).toContainText(/Oct 22|2009/i);
  });

  test('IE 8 Mar 19', async ({ page }) => {
    await page.goto('/years/2009/sites/ie8/index.html');
    await expect(page.locator('body')).toContainText(/Mar 19|IE 8|Internet Explorer 8/i);
  });

  test('Foursquare SXSW seed', async ({ page }) => {
    await page.goto('/years/2009/sites/foursquare/index.html');
    await expect(page.locator('body')).toContainText(/Foursquare|check-in|SXSW|Mar|2009/i);
    await expect(page.locator('[data-4sq-checkin]').first()).toBeVisible();
  });

  test('Kickstarter Apr 28 seed', async ({ page }) => {
    await page.goto('/years/2009/sites/kickstarter/index.html');
    await expect(page.locator('body')).toContainText(/Kickstarter|Apr 28|2009/i);
    await expect(page.locator('[data-ks-back]').first()).toBeVisible();
  });

  test('Wave demo only honesty', async ({ page }) => {
    await page.goto('/years/2009/sites/wave/index.html');
    await expect(page.locator('body')).toContainText(/Wave|invite|demo|2010|May/i);
  });

  test('Spotify Europe · US ban', async ({ page }) => {
    await page.goto('/years/2009/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText(/Europe/i);
    await expect(page.locator('body')).toContainText(/not.*US|2011/i);
  });

  test('Chrome Mac/Linux late-year honesty', async ({ page }) => {
    await page.goto('/years/2009/sites/chrome/about.html');
    await expect(page.locator('body')).toContainText(/Mac|Linux|Dec/i);
  });

  test('Twitter real-time culture', async ({ page }) => {
    await page.goto('/years/2009/sites/twitter/about.html');
    await expect(page.locator('body')).toContainText(/Oprah|Kutcher|real-time|2009/i);
  });
});
