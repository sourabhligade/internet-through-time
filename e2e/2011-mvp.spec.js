// @ts-check
/**
 * 2011 lean from-scratch — door + star + P0
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) { /* */ }
    });
  }, keys);
}

test.describe('2011 MVP', () => {
  test('A shell boots Win7 / IE9 / 2011', async ({ page }) => {
    await enterYear(page, '2011');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2011');
    await expect(page.locator('body')).toHaveClass(/os-win7/);
    await expect(page.locator('body')).toHaveClass(/browser-ie9/);
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B about dual scale + bans', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await expect(page.locator('body')).toContainText('346,004,403');
    await expect(page.locator('body')).toContainText('555 million');
    await expect(page.locator('body')).toContainText(/Android|Vine|Windows 8|Siri/i);
    await expect(page.locator('body')).toContainText('#egypt');
    await expect(page.locator('body')).toContainText('800+ million');
    await expect(page.locator('body')).toContainText('48 hours');
    await expect(page.locator('body')).toContainText('1 billion messages');
  });

  test('C Google+ Hangout writes itt11-gplus-hangout', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/hangouts.html');
    await clearKeys(page, ['itt11-gplus-hangout']);
    await page.reload();
    await page.waitForSelector('[data-gplus-hangout-start]', { timeout: 20000 });
    await page.locator('[data-gplus-hangout-start]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt11-gplus-hangout'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-gplus-hangout-start]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt11-gplus-hangout'))).toMatch(/started|Friends|real/i);
    await expect(page.locator('[data-gplus-hangout]')).not.toContainText(/\(mock\)/i);
  });

  test('D Spotify invite writes itt11-spotify-invited', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await clearKeys(page, ['itt11-spotify-invited']);
    await page.reload();
    await page.locator('[data-spotify-invite]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt11-spotify-invited'))).toBeFalsy();
    await page.locator('[data-spotify-ack]').check();
    await page.locator('[data-spotify-no-stream]').check();
    await page.locator('[data-spotify-invite]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt11-spotify-invited'))).toBeTruthy();
  });

  test('H Airbnb request writes itt11-airbnb', async ({ page }) => {
    await page.goto('/years/2011/sites/airbnb/index.html');
    await clearKeys(page, ['itt11-airbnb']);
    await page.reload();
    await page.locator('#ott-field').fill('San Francisco');
    await page.locator('[data-abnb-search]').click();
    await page.locator('[data-abnb-listing]').first().click();
    await page.locator('[data-abnb-note]').fill('Hi host residual');
    await page.locator('[data-abnb-book]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt11-airbnb'))).toMatch(/San Francisco|requested|real/i);
  });

  test('G+ index prints Gundotra four pillars', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/index.html');
    await expect(page.locator('body')).toContainText('Circles');
    await expect(page.locator('body')).toContainText('Sparks');
    await expect(page.locator('body')).toContainText('Hangouts');
    await expect(page.locator('body')).toContainText('Instant Upload');
    await expect(page.locator('body')).toContainText(/field trial|invitation only/i);
  });

  test('Spotify page shows three 14 Jul SKUs + 22 Sep', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText('$4.99');
    await expect(page.locator('body')).toContainText('$9.99');
    await expect(page.locator('body')).toContainText('15 million');
    await expect(page.locator('body')).toContainText('22 Sep');
    await expect(page.locator('body')).toContainText(/No Facebook/i);
  });

  test('iPad 2 prints cameras + Smart Cover + 3G prices', async ({ page }) => {
    await page.goto('/years/2011/sites/ipad/index.html');
    await expect(page.locator('body')).toContainText('$499');
    await expect(page.locator('body')).toContainText('$629');
    await expect(page.locator('body')).toContainText('$39');
    await expect(page.locator('body')).toContainText('Smart Cover');
    await expect(page.locator('body')).toContainText(/no camera/i);
  });

  test('4S prints Siri languages + leftover prices + iCloud', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText('$199');
    await expect(page.locator('body')).toContainText('French');
    await expect(page.locator('body')).toContainText('German');
    await expect(page.locator('body')).toContainText('iCloud');
    await expect(page.locator('body')).toContainText('$99');
  });

  test('Timeline prints Cover + verbs + ticker', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/timeline.html');
    await expect(page.locator('body')).toContainText('Cover');
    await expect(page.locator('body')).toContainText(/listen|ticker/i);
    await expect(page.locator('body')).toContainText('story of your life');
  });

  test('T Letter Swap start deals a rack', async ({ page }) => {
    await page.goto('/years/2011/sites/playable/game.html?fast=1');
    await page.locator('[data-game-start]').click();
    await expect(page.locator('[data-rack]')).not.toHaveText('—', { timeout: 3000 });
  });
});
