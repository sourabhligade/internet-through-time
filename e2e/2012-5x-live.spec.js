// @ts-check
const { test, expect } = require('@playwright/test');


const FLOWS = [
  { suf: 'pin', path: '/years/2012/sites/pinterest/index.html', next: /facebook\/ipo/ },
  { suf: 'fb-ipo', path: '/years/2012/sites/facebook/ipo.html', next: /index\.html/ },
  { suf: 'facebook', path: '/years/2012/sites/facebook/index.html', next: /iphone\/maps/ },
  { suf: 'maps', path: '/years/2012/sites/iphone/maps.html', next: /wikipedia\/sopa/ },
  { suf: 'sopa', path: '/years/2012/sites/wikipedia/sopa.html', next: /instagram\/android/ },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function clearKey(page, key) {
  await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } }, key);
}

test.describe('2012 5× live', () => {
  for (const fl of FLOWS) {
    test(`${fl.suf} empty / one-check / REAL`, async ({ page }) => {
      const key = 'itt12-' + fl.suf;
      await page.goto(fl.path);
      await clearKey(page, key);
      await page.reload();
      await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
      return;
    });
  }
});
