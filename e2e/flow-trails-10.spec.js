// @ts-check
/**
 * Every open year 1994–2008 has a dest-unique official trail on the gold room and the map.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const ROOT = path.join(__dirname, '..');

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
  { year: '2008', gold: 'sites/appstore/index.html', name: /GitHub|App Store/i },
];

test("official trail dests are unique websites inside each year", () => {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const yearRe = /"(\d{4})":\s*\[/g;
  const starts = [];
  let m;
  while ((m = yearRe.exec(src))) starts.push({ year: m[1], at: m.index + m[0].length });
  for (let i = 0; i < starts.length; i++) {
    const year = starts[i].year;
    const end = i + 1 < starts.length ? starts[i + 1].at : src.length;
    const block = src.slice(starts[i].at, end);
    const rowRe = /\{[^}]*"n":\s*(\d+)[^}]*"href":\s*"([^"]*)"/g;
    /** @type {string[]} */
    const official = [];
    let r;
    while ((r = rowRe.exec(block))) {
      if (parseInt(r[1], 10) > 10) continue;
      const sm = r[2].match(/sites\/([^/]+)/i);
      if (sm) official.push(sm[1].toLowerCase());
    }
    expect(new Set(official).size, year + " official dests must be unique websites").toBe(official.length);
  }
});

test.describe('dest-unique official trail every year', () => {
  for (const s of YEARS) {
    if (!fs.existsSync(path.join(ROOT, 'years', s.year, 'index.html'))) continue;
    test(`${s.year} gold room shows dest-unique official trail`, async ({ page }) => {
      await page.goto(`/years/${s.year}/${s.gold}`);
      const trail = page.locator('[data-itt-flow-trail]');
      await expect(trail).toBeVisible({ timeout: 20000 });
      const n = await trail.locator('a').count();
      expect(n, `${s.year} official flow links`).toBeGreaterThanOrEqual(7);
      expect(n).toBeLessThanOrEqual(11);
      await expect(trail).toContainText(s.name);
    });

    test(`${s.year} map lists dest-unique official trail`, async ({ page }) => {
      await page.goto(`/years/${s.year}/pages/map.html`);
      const ten = page.locator('ol[data-itt-ten-flows], [data-itt-ten-flows] ol').first();
      await expect(ten).toBeVisible({ timeout: 20000 });
      const n = await ten.locator("li").count();
      expect(n, `${s.year} official dests`).toBeGreaterThanOrEqual(7);
      expect(n, `${s.year} official dests`).toBeLessThanOrEqual(10);
      const hrefs = await ten.locator("a").evaluateAll((as) =>
        as.map((a) => a.getAttribute("href") || "")
      );
      const slugs = hrefs.map((h) => {
        const m = String(h).match(/sites\/([^/]+)/i);
        return m ? m[1].toLowerCase() : h;
      });
      expect(new Set(slugs).size, `${s.year} official dests must be unique`).toBe(slugs.length);
      await expect(ten).toContainText(s.name);
    });
  }

  test('every year gold trail hrefs return 200', async ({ page, request }) => {
    for (const s of YEARS) {
      if (!fs.existsSync(path.join(ROOT, 'years', s.year, 'index.html'))) continue;
      await page.goto(`/years/${s.year}/${s.gold}`);
      await expect(page.locator('[data-itt-flow-trail] a').first()).toBeVisible({ timeout: 20000 });
      const hrefs = await page.locator('[data-itt-flow-trail] a').evaluateAll((as) =>
        as.map((a) => a.getAttribute('href') || '').filter(Boolean)
      );
      expect(hrefs.length, s.year).toBeGreaterThanOrEqual(7);
      const base = page.url();
      for (const h of hrefs.slice(0, 10)) {
        const url = new URL(h, base).href;
        const res = await request.get(url);
        expect(res.status(), `${s.year} ${url}`).toBe(200);
      }
    }
  });
});
