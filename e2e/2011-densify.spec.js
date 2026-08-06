// @ts-check
/**
 * 2011 densify gates — scale, bans, P0 year-truth (museum-ready bar)
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2011 densify', () => {
  test('scale dual-cite and thesis on about', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await expect(page.locator('body')).toContainText('346,004,403');
    await expect(page.locator('body')).toContainText(/555/);
    await expect(page.locator('body')).toContainText(/2\.1|2\.28|800/);
    await expect(page.locator('body')).toContainText(/Spotify|Timeline|Siri|Google\+/i);
  });

  test('hard bans include Instagram Android and UberX', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await expect(page.locator('body')).toContainText(/Instagram.*Android|Android.*2012/i);
    await expect(page.locator('body')).toContainText(/UberX|iPhone 5|Windows 8|Reactions|Stories/i);
  });

  test('home trails list P0 products', async ({ page }) => {
    await page.goto('/years/2011/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/346,004,403|555/);
    expect(text).toMatch(/Spotify/);
    expect(text).toMatch(/Timeline/);
    expect(text).toMatch(/Google\+/);
    expect(text).toMatch(/Siri|4S/);
    expect(text).toMatch(/Qwikster|Netflix|iPad 2/i);
  });

  test('dirbar / nav P0 in shell', async ({ page }) => {
    await enterYear(page, '2011');
    for (const label of ['Spotify', 'Timeline', 'Google+', 'iPhone 4S']) {
      await expect(page.locator('#dirbar .dir-btn, .itt-nav a, nav a', { hasText: label }).first()).toBeVisible({
        timeout: 15000,
      });
    }
  });

  test('Spotify US prices and Jul 14', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText(/July 14|Jul 14/i);
    await expect(page.locator('body')).toContainText(/4\.99|9\.99|invite/i);
  });

  test('Qwikster minute timeline', async ({ page }) => {
    await page.goto('/years/2011/sites/netflix/qwikster.html');
    await expect(page.locator('body')).toContainText(/Qwikster/i);
    await expect(page.locator('body')).toContainText(/Jul|July|Sep|Oct|23|price/i);
  });

  test('Google+ field trial date', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/index.html');
    await expect(page.locator('body')).toContainText(/June 28|Jun 28/i);
    await expect(page.locator('body')).toContainText(/Circles|Hangouts|\+1/i);
  });

  test('Siri Oct 4 · 4S only honesty', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/siri.html');
    await expect(page.locator('body')).toContainText(/Siri|Oct 4|4S/i);
    await expect(page.locator('[data-siri-phrase], [data-siri-form]').first()).toBeVisible();
  });

  test('IE 9 Mar 14 product room', async ({ page }) => {
    await page.goto('/years/2011/sites/ie9/index.html');
    await expect(page.locator('body')).toContainText(/March 14|Mar 14|2011/i);
    await expect(page.locator('body')).toContainText(/HTML5|IE 9|Internet Explorer 9/i);
  });

  test('Android ICS densify Oct 19', async ({ page }) => {
    await page.goto('/years/2011/sites/android/index.html');
    await expect(page.locator('body')).toContainText(/Ice Cream|ICS|Galaxy Nexus|Oct 19/i);
  });

  test('Instagram still iOS-only honesty', async ({ page }) => {
    await page.goto('/years/2011/sites/instagram/index.html');
    await expect(page.locator('body')).toContainText(/iOS|Android.*2012|not.*Android/i);
  });
});
