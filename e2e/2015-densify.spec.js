// @ts-check
/**
 * 2015 densify — year spine, bans, P0 multipage, densify gems (museum L3 bar).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, checkAllReq } = require('./helpers');

test.describe('2015 densify', () => {
  test('scale dual-cite on about', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await expect(page.locator('body')).toContainText('863,105,652');
    await expect(page.locator('body')).toContainText('3,185,996,155');
    await expect(page.locator('body')).toContainText(/−11%|-11%/);
  });

  test('hard bans Stories Reactions Meta Chromium Edge', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Stories/i);
    expect(text).toMatch(/Reactions|TikTok|Meta/i);
    expect(text).toMatch(/Chromium|Edge/i);
  });

  test('home trails list 2015 P0 products', async ({ page }) => {
    await page.goto('/years/2015/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Watch/i);
    expect(text).toMatch(/Windows 10|Win10/i);
    expect(text).toMatch(/Periscope|Meerkat/i);
    expect(text).toMatch(/Apple Music|Music/i);
    expect(text).toMatch(/863,105,652|−11%|-11%/i);
    expect(text).toMatch(/Peach|Discord|Discover|Secret/i);
  });

  test('home has continuity archive not primary spine', async ({ page }) => {
    await page.goto('/years/2015/pages/home.html');
    await expect(page.locator('body')).toContainText(/Continuity archive/i);
    await expect(page.locator('a[href*="whatsapp"]').first()).toBeVisible();
  });

  test('whats-new is 2015 spine', async ({ page }) => {
    await page.goto('/years/2015/pages/whats-new.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/2015/);
    expect(text).toMatch(/Watch|Apr|Periscope|Music|863/i);
  });

  test('Watch multipage shipped honesty', async ({ page }) => {
    await page.goto('/years/2015/sites/apple/watch.html');
    await expect(page.locator('body')).toContainText(/ships|shipped|2015|Apr/i);
    await expect(page.locator('a[href*="faces"]').first()).toBeVisible();
    await expect(page.locator('a[href*="pair"]').first()).toBeVisible();
    await page.goto('/years/2015/sites/apple/faces.html');
    await expect(page.locator('body')).toContainText(/Sport|Modular|Utility/i);
    await page.goto('/years/2015/sites/apple/pair.html');
    await expect(page.locator('body')).toContainText(/Pair|iPhone|Bluetooth/i);
  });

  test('Win10 multipage free upgrade not TP-only', async ({ page }) => {
    await page.goto('/years/2015/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/free upgrade/i);
    await expect(page.locator('body')).toContainText(/Win7 residual|not 2014 TP/i);
    await page.goto('/years/2015/sites/windows10/about.html');
    await expect(page.locator('body')).toContainText(/free upgrade/i);
    await page.goto('/years/2015/sites/windows10/upgrade.html');
    await expect(page.locator('body')).toContainText(/upgrade|reserve/i);
  });

  test('Edge multipage Spartan not Chromium', async ({ page }) => {
    await page.goto('/years/2015/sites/edge/index.html');
    await expect(page.locator('body')).toContainText(/Spartan|not Chromium/i);
    await page.goto('/years/2015/sites/edge/about.html');
    await expect(page.locator('body')).toContainText(/Spartan|EdgeHTML|not.*Chromium/i);
  });

  test('Live rooms multipage about + go-live controls', async ({ page }) => {
    for (const path of [
      '/years/2015/sites/periscope/index.html',
      '/years/2015/sites/periscope/about.html',
      '/years/2015/sites/meerkat/index.html',
      '/years/2015/sites/meerkat/about.html',
      '/years/2015/sites/fblive/index.html',
      '/years/2015/sites/fblive/about.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
    await page.goto('/years/2015/sites/periscope/index.html');
    await expect(page.locator('[data-live-go]')).toBeVisible();
    await expect(page.locator('[data-live-title]')).toBeVisible();
  });

  test('Apple Music multipage trial Beats1', async ({ page }) => {
    await page.goto('/years/2015/sites/applemusic/index.html');
    await expect(page.locator('a[href*="trial"]').first()).toBeVisible();
    await expect(page.locator('a[href*="beats1"]').first()).toBeVisible();
    await page.goto('/years/2015/sites/applemusic/trial.html');
    await expect(page.locator('[data-itt-real-save]')).toBeVisible();
    await page.goto('/years/2015/sites/applemusic/beats1.html');
    await expect(page.locator('body')).toContainText(/Beats 1/i);
  });

  test('blockers + Photos multipage', async ({ page }) => {
    await page.goto('/years/2015/sites/ios9/blockers.html');
    await expect(page.locator('[data-itt-real-save]')).toBeVisible();
    await page.goto('/years/2015/sites/ios9/about.html');
    await expect(page.locator('body')).toContainText(/Content Blocker|Safari/i);
    await page.goto('/years/2015/sites/googlephotos/index.html');
    await expect(page.locator('a[href*="library"]').first()).toBeVisible();
    await page.goto('/years/2015/sites/googlephotos/library.html');
    await expect(page.locator('body')).toContainText(/Library|backup/i);
  });

  test('densify gems multipage paths', async ({ page }) => {
    for (const path of [
      '/years/2015/sites/peach/index.html',
      '/years/2015/sites/peach/canvas.html',
      '/years/2015/sites/discord/index.html',
      '/years/2015/sites/discord/about.html',
      '/years/2015/sites/discord/server.html',
      '/years/2015/sites/snapchat/discover.html',
      '/years/2015/sites/secret/shutdown.html',
      '/years/2015/sites/messenger/bots.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('Peach canvas REAL multipage', async ({ page }) => {
    await page.goto('/years/2015/sites/peach/canvas.html');
    await page.evaluate(() => localStorage.removeItem('itt15-peach-canvas'));
    await page.reload();
    await page.locator('[data-peach-word]').fill('weather');
    await page.locator('[data-peach-fade]').check();
    await page.locator('[data-peach-lit]').check();
    await page.locator('[data-peach-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt15-peach-canvas')))
      .toMatch(/weather/i);
  });

  test('Secret shutdown REAL', async ({ page }) => {
    await page.goto('/years/2015/sites/secret/shutdown.html');
    await page.evaluate(() => localStorage.removeItem('itt15-secret-end'));
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="secret-end"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt15-secret-end')))
      .toBeTruthy();
  });

  test('Discord REAL', async ({ page }) => {
    await page.goto('/years/2015/sites/discord/index.html');
    await page.evaluate(() => localStorage.removeItem('itt15-discord'));
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="discord"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt15-discord')))
      .toBeTruthy();
  });

  test('Snap Discover REAL Jan 2015', async ({ page }) => {
    await page.goto('/years/2015/sites/snapchat/discover.html');
    await page.evaluate(() => localStorage.removeItem('itt15-snap-discover'));
    await page.reload();
    await expect(page.locator('body')).toContainText(/Jan(uary)?\s*27|2015/i);
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="snap-discover"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt15-snap-discover')))
      .toBeTruthy();
  });

  test('nav shell has year 2015', async ({ page }) => {
    await enterYear(page, '2015');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2015');
    await expect(page.locator('#content')).toBeVisible();
  });
});

  test('home trail cards have data-trail-keys', async ({ page }) => {
    await page.goto('/years/2015/pages/home.html');
    await expect(page.locator('[data-itt15-home-trails]')).toBeVisible();
    await expect(page.locator('.itt15-trail-card[data-trail-keys]')).toHaveCount(6);
    await expect(page.locator('a[href*="periscope"]').first()).toBeVisible();
    await expect(page.locator('a[href*="gwx"]').first()).toBeVisible();
  });

  test('GWX free upgrade multipage REAL', async ({ page }) => {
    await page.goto('/years/2015/sites/windows10/gwx.html');
    await page.evaluate(() => localStorage.removeItem('itt15-win10'));
    await page.reload();
    await page.locator('[data-gwx-reserve]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem('itt15-win10'))).toBeFalsy();
    await checkAllReq(page);
    await page.locator('[data-gwx-reserve]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt15-win10'))).toMatch(/gwx|freeUpgrade|true/i);
  });
