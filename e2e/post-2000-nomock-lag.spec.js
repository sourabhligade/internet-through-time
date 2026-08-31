// @ts-check
/**
 * Post-2000: no unused product engines on a single room.
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
function skipIfWiped(year) {
  test.skip(!fs.existsSync(path.join(__dirname, '..', 'years', year, 'index.html')), year + ' wiped');
}


test.describe('post-2000 boot is page-local, not the full forest', () => {
  test('2005 YouTube does not load Amazon / Napster engines', async ({ page }) => {
    skipIfWiped('2005');
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
});
