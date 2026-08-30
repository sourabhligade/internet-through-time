// @ts-check
/**
 * Early-year Starting Point connection trails (1995–2001)
 */
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}


const YEARS = [
  {
    y: '1994',
    must: [/Connection trails/i, /Yahoo/i, /CERN|Mosaic|Netscape/i, /Fish Cam|Cool Site/i],
  },
  {
    y: '1995',
    must: [/Connection trails/i, /Shop the commercial Web|Amazon/i, /Yahoo/i, /GeoCities/i, /Starting Point/i],
  },
  {
    y: '1996',
    must: [/Connection trails/i, /HoTMaiL|Free email/i, /Space Jam|Portal/i, /Starting Point/i],
  },
  {
    y: '1997',
    must: [/Connection trails/i, /eBay|Auction/i, /Slashdot/i, /Starting Point/i],
  },
  {
    y: '1998',
    must: [/Connection trails/i, /Google/i, /Yahoo/i, /Amazon|CD/i, /Starting Point/i],
  },
  {
    y: '1999',
    must: [/Connection trails/i, /Napster/i, /Google/i, /Blogger/i, /Starting Point/i],
  },
  {
    y: '2000',
    must: [/Connection trails/i, /Amazon|smile/i, /Napster/i, /Pets\.com/i, /Starting Point/i],
  },
  {
    y: '2004',
    must: [/Connection trails|REAL multipath/i, /Firefox|Gmail/i, /Flickr|Thefacebook|facebook/i, /Starting Point/i],
  },
  {
    y: '2005',
    must: [/Connection trails|REAL multipath/i, /YouTube|Digg|Flickr/i, /Starting Point|flow map/i],
  },
  {
    y: '2008',
    must: [/Connection trails|REAL multipath/i, /App Store|Chrome|Android/i],
  },
];

test.describe('Early-year connection trails', () => {
  for (const row of YEARS) {
    test(`${row.y} home has life trails + nav honesty`, async ({ page }) => {
      await page.goto(`/years/${row.y}/pages/home.html`);
      const body = page.locator('body');
      for (const re of row.must) {
        await expect(body).toContainText(re);
      }
      // densify: many site links + multipath arrows
      const trailLinks = page.locator('a[href*="../sites/"], a[href*="/sites/"]');
      expect(await trailLinks.count()).toBeGreaterThan(8);
      const text = await body.innerText();
      expect(text).toMatch(/→|->/);
    });
  }
});
