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
      const save = page.locator('[data-5x-save]').first();
      await save.click();
      expect(await getKey(page, key)).toBeFalsy();
      await page.locator('[data-5x-req="a"]').first().check();
      await save.click();
      expect(await getKey(page, key)).toBeFalsy();
      await page.locator('[data-5x-req="b"]').first().check();
      await save.click();
      await expect.poll(() => getKey(page, key)).toBeTruthy();
      const blob = JSON.parse((await getKey(page, key)) || '{}');
      expect(blob.real || blob.multiStep).toBeTruthy();
      expect(String(blob.year)).toBe('2012');
      await expect(page.locator('[data-5x-next] a').first()).toBeVisible();
      const href = await page.locator('[data-5x-next] a').first().getAttribute('href');
      expect(href).toMatch(fl.next);
    });
  }
});
