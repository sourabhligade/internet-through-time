// @ts-check
/**
 * 2009 period flows A–T sample (core paths)
 * docs/2009-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, keys);
}

test.describe('2009 flows', () => {
  test('A enter year', async ({ page }) => {
    await enterYear(page, '2009');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2009');
  });

  test('B thesis about', async ({ page }) => {
    await page.goto('/years/2009/pages/about.html');
    await expect(page.locator('body')).toContainText('238,027,855');
    await expect(page.locator('body')).toContainText(/Like|FarmVille|3GS/i);
  });

  test('C App Store', async ({ page }) => {
    await page.goto('/years/2009/sites/appstore/index.html');
    await clearKeys(page, ['itt09-apps']);
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await page.locator('[data-appstore-install]').first().click();
    expect(await page.evaluate(() => localStorage.getItem('itt09-apps'))).toBeTruthy();
  });

  test('D iPhone 3GS', async ({ page }) => {
    await page.goto('/years/2009/sites/iphone/about.html');
    await expect(page.locator('body')).toContainText(/Jun 19|3GS|\$199/i);
  });

  test('E Facebook Like', async ({ page }) => {
    await page.goto('/years/2009/sites/facebook/feed.html');
    await clearKeys(page, ['itt09-fb-likes']);
    await page.reload();
    await page.waitForSelector('[data-fb-like]', { timeout: 20000 });
    await page.locator('[data-fb-like]').first().click();
    expect(await page.evaluate(() => localStorage.getItem('itt09-fb-likes'))).toBeTruthy();
  });

  test('F FarmVille', async ({ page }) => {
    await page.goto('/years/2009/sites/farmville/index.html');
    await clearKeys(page, ['itt09-farm']);
    await page.reload();
    await page.waitForSelector('[data-farm-plant]', { timeout: 20000 });
    await page.locator('[data-farm-plant="strawberry"]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt09-farm'))).toMatch(/strawberry/i);
  });

  test('G Bing', async ({ page }) => {
    await page.goto('/years/2009/sites/bing/index.html');
    await clearKeys(page, ['itt09-bing']);
    await page.reload();
    await page.waitForSelector('[data-bing-search]', { timeout: 20000 });
    await page.locator('[data-bing-search]').evaluate((f) => f.requestSubmit());
    expect(await page.evaluate(() => localStorage.getItem('itt09-bing'))).toBeTruthy();
  });

  test('I Windows 7 / IE8 dates', async ({ page }) => {
    await page.goto('/years/2009/sites/windows7/index.html');
    await expect(page.locator('body')).toContainText(/Oct 22|2009/i);
    await page.goto('/years/2009/sites/ie8/index.html');
    await expect(page.locator('body')).toContainText(/Mar 19|IE 8|Internet Explorer 8/i);
  });

  test('L Foursquare check-in', async ({ page }) => {
    await page.goto('/years/2009/sites/foursquare/index.html');
    await clearKeys(page, ['itt09-4sq']);
    await page.reload();
    await page.waitForSelector('[data-4sq-checkin]', { timeout: 20000 });
    await page.locator('[data-4sq-checkin]').first().click();
    expect(await page.evaluate(() => localStorage.getItem('itt09-4sq'))).toBeTruthy();
  });

  test('M Kickstarter back', async ({ page }) => {
    await page.goto('/years/2009/sites/kickstarter/index.html');
    await clearKeys(page, ['itt09-ks']);
    await page.reload();
    await page.waitForSelector('[data-ks-back]', { timeout: 20000 });
    await page.locator('[data-ks-back]').first().click();
    expect(await page.evaluate(() => localStorage.getItem('itt09-ks'))).toBeTruthy();
  });

  test('S Beacon end honesty', async ({ page }) => {
    await page.goto('/years/2009/sites/facebook/about.html');
    await expect(page.locator('body')).toContainText(/Beacon/i);
    await expect(page.locator('body')).toContainText(/Sep 21|2007|shut/i);
  });

  test('H Twitter 2009 culture + compose', async ({ page }) => {
    await page.goto('/years/2009/sites/twitter/about.html');
    await expect(page.locator('body')).toContainText(/Oprah|Kutcher|real-time|2009/i);
    await expect(page.locator('body')).not.toContainText(/2007 is the breakout year/i);
    await page.goto('/years/2009/sites/twitter/index.html');
    await clearKeys(page, ['itt09-tweets']);
    await page.reload();
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    await page.locator('[data-twitter-status], textarea').first().fill('hello 2009 flow');
    await page.locator('[data-twitter-compose]').evaluate((f) => f.requestSubmit());
    expect(await page.evaluate(() => localStorage.getItem('itt09-tweets'))).toMatch(/hello 2009/i);
  });

  test('Address bar routes iPhone and Windows 7 specifically', async ({ page }) => {
    await enterYear(page, '2009');
    await page.fill('#location', 'http://www.apple.com/iphone/');
    await page.press('#location', 'Enter');
    await expect(page.locator('#content')).toHaveAttribute('src', /iphone/i, { timeout: 10000 });
    await page.fill('#location', 'http://www.microsoft.com/windows/windows-7/');
    await page.press('#location', 'Enter');
    await expect(page.locator('#content')).toHaveAttribute('src', /windows7/i, { timeout: 10000 });
  });

  test('N Wave invite theater', async ({ page }) => {
    await page.goto('/years/2009/sites/wave/index.html');
    await clearKeys(page, ['itt09-wave']);
    await page.reload();
    await page.waitForSelector('[data-wave-invite]', { timeout: 20000 });
    await page.locator('[data-wave-invite]').click();
    await expect(page.locator('[data-wave-status]')).toContainText(/invite|itt09|2010/i, { timeout: 8000 });
    expect(await page.evaluate(() => localStorage.getItem('itt09-wave'))).toMatch(/invited|true/i);
  });

  test('K Chrome multi-OS late-year honesty', async ({ page }) => {
    await page.goto('/years/2009/sites/chrome/about.html');
    await expect(page.locator('body')).toContainText(/Mac|Linux|Dec/i);
    await expect(page.locator('body')).toContainText(/IE 8|not.*only mass|Ban/i);
  });

  test('FriendFeed epitaph + Spotify EU ban', async ({ page }) => {
    await page.goto('/years/2009/sites/friendfeed/index.html');
    await expect(page.locator('body')).toContainText(/Aug 10|acquire|FriendFeed/i);
    await page.goto('/years/2009/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText(/Europe|not US|2011/i);
  });
});
