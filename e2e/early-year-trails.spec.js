// @ts-check
/**
 * Early-year Starting Point connection trails (1995–2001)
 */
const { test, expect } = require('@playwright/test');

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
    y: '2001',
    must: [/Connection trails/i, /Wikipedia/i, /iPod/i, /IE 6|Windows XP/i, /Starting Point/i],
  },
  {
    y: '2002',
    must: [/Connection trails/i, /Friendster/i, /KaZaA|Blogger/i, /Starting Point/i],
  },
  {
    y: '2003',
    must: [/Connection trails/i, /MySpace|Friendster/i, /iTunes|WordPress/i, /Starting Point/i],
  },
  {
    y: '2004',
    must: [/Connection trails/i, /Firefox|Gmail/i, /Flickr|Thefacebook|facebook/i, /Starting Point/i],
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
      // at least a few trail links into sites/
      const trailLinks = page.locator('a[href*="../sites/"]');
      expect(await trailLinks.count()).toBeGreaterThan(5);
    });
  }
});
