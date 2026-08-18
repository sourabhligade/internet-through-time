// @ts-check
/**
 * Every open year 1994–2009 has 10 link-flows on the gold room and the map.
 */
const { test, expect } = require('@playwright/test');

/** @type {{ year: string, gold: string, name: RegExp }[]} */
const YEARS = [
  { year: '1994', gold: 'sites/csotd/index.html', name: /CSotD|Yahoo/i },
  { year: '1995', gold: 'sites/amazon/ssl-checkout.html', name: /SSL|AuctionWeb/i },
  { year: '1996', gold: 'sites/portals/wars.html', name: /Portal|HoTMaiL/i },
  { year: '1997', gold: 'sites/pointcast/index.html', name: /PointCast|ICQ/i },
  { year: '1998', gold: 'sites/google/lucky.html', name: /Lucky|Google/i },
  { year: '1999', gold: 'sites/aim/index.html', name: /AIM|Napster/i },
  { year: '2000', gold: 'sites/mapquest/index.html', name: /MapQuest|Amazon/i },
  { year: '2001', gold: 'sites/wikipedia/edit.html', name: /MSN|Wikipedia/i },
  { year: '2002', gold: 'sites/stumbleupon/index.html', name: /Stumble|Friendster/i },
  { year: '2003', gold: 'sites/photobucket/index.html', name: /Photobucket|MySpace/i },
  { year: '2004', gold: 'sites/facebook/networks.html', name: /thefacebook|Gmail/i },
  { year: '2005', gold: 'sites/youtube/upload.html', name: /Pandora|YouTube/i },
  { year: '2006', gold: 'sites/twitter/index.html', name: /Twitter|News Feed/i },
  { year: '2007', gold: 'sites/iphone/index.html', name: /iPhone|Street View/i },
  { year: '2008', gold: 'sites/appstore/index.html', name: /GitHub|App Store/i },
  { year: '2009', gold: 'sites/facebook/feed.html', name: /Like|FarmVille/i },
];

test.describe('ten link-flows every year', () => {
  for (const s of YEARS) {
    test(`${s.year} gold room shows 10-flow trail`, async ({ page }) => {
      await page.goto(`/years/${s.year}/${s.gold}`);
      const trail = page.locator('[data-itt-flow-trail]');
      await expect(trail).toBeVisible({ timeout: 20000 });
      const n = await trail.locator('a').count();
      expect(n, `${s.year} 10 flow links`).toBeGreaterThanOrEqual(10);
      expect(n).toBeLessThanOrEqual(11);
      await expect(trail).toContainText(s.name);
    });

    test(`${s.year} map lists ten link-flows`, async ({ page }) => {
      await page.goto(`/years/${s.year}/pages/map.html`);
      await expect(page.locator('[data-itt-ten-flows]')).toBeVisible({ timeout: 20000 });
      await expect(page.locator('[data-itt-ten-flows] li')).toHaveCount(10);
      await expect(page.locator('[data-itt-ten-flows]')).toContainText(s.name);
    });
  }

  test('every year gold trail hrefs return 200', async ({ page, request }) => {
    for (const s of YEARS) {
      await page.goto(`/years/${s.year}/${s.gold}`);
      await expect(page.locator('[data-itt-flow-trail] a').first()).toBeVisible({ timeout: 20000 });
      const hrefs = await page.locator('[data-itt-flow-trail] a').evaluateAll((as) =>
        as.map((a) => a.getAttribute('href') || '').filter(Boolean)
      );
      expect(hrefs.length, s.year).toBeGreaterThanOrEqual(10);
      const base = `http://127.0.0.1:8080/years/${s.year}/${s.gold}`;
      for (const h of hrefs.slice(0, 10)) {
        const url = new URL(h, base).href;
        const res = await request.get(url);
        expect(res.status(), `${s.year} ${url}`).toBe(200);
      }
    }
  });
});
