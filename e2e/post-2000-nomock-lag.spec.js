// @ts-check
/**
 * Post-2000: no unused product engines on a single room (the lag),
 * residual REAL honesty in first boot (not a 1.2s mock window),
 * Spotify plan is not a one-click write.
 */
const { test, expect } = require('@playwright/test');

test.describe('post-2000 boot is page-local, not the full forest', () => {
  test('2005 YouTube does not load Amazon / Napster engines', async ({ page }) => {
    const extra = [];
    page.on('request', (req) => {
      const u = req.url();
      if (/immersion\/(amazon|napster|kazaa|friendster)\.js/.test(u)) extra.push(u);
    });
    await page.goto('/years/2005/sites/youtube/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2005',
      null,
      { timeout: 20000 }
    );
    await page.waitForTimeout(400);
    expect(extra, extra.join('\n')).toEqual([]);
    const yt = await page.evaluate(() => !!document.querySelector('script[src*="immersion/youtube.js"]'));
    expect(yt).toBeTruthy();
    const rr = await page.evaluate(() =>
      document.documentElement.getAttribute('data-itt-residual-real')
    );
    expect(rr).toBe('1');
  });

  test('2010 Chrome page does not load FarmVille / Foursquare engines', async ({ page }) => {
    const extra = [];
    page.on('request', (req) => {
      const u = req.url();
      if (/immersion\/(farmville|foursquare|kickstarter)\.js/.test(u)) extra.push(u);
    });
    await page.goto('/years/2010/sites/chrome/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2010',
      null,
      { timeout: 20000 }
    );
    await page.waitForTimeout(400);
    expect(extra, extra.join('\n')).toEqual([]);
  });
});

test.describe('post-2000 leftover writers are not one-click mocks', () => {
  test('2011 Spotify plan first click does not write', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/plans.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt11-spotify') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForSelector('[data-spotify-plan]', { timeout: 20000 });
    await page.waitForTimeout(450);
    await page.locator('[data-spotify-plan="free"]').click();
    await page.waitForTimeout(200);
    const raw = await page.evaluate(() => localStorage.getItem('itt11-spotify-plan'));
    expect(raw).toBeFalsy();
  });
});
