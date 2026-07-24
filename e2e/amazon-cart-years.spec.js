// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

/** @type {{ year: string, page: string, storageKey: string }[]} */
const CASES = [
  { year: '1995', page: 'sites/amazon/book-neuromancer.html', storageKey: 'itt95-amazon-cart' },
  { year: '1996', page: 'sites/amazon/book-road-ahead.html', storageKey: 'itt96-amazon-cart' },
  { year: '1997', page: 'sites/amazon/book-being-digital.html', storageKey: 'itt97-amazon-cart' },
  { year: '1998', page: 'sites/amazon/music.html', storageKey: 'itt98-amazon-cart' },
];

// neuromancer may not have data-add-cart in 1995 - check
// 1995 book-neuromancer - verify exists with data-add-cart

test.describe('Amazon cart (parametrized years)', () => {
  for (const c of CASES) {
    test(`${c.year}: add to cart writes ${c.storageKey}`, async ({ page }) => {
      await enterYear(page, c.year);
      await goInFrame(page, c.page);
      await waitForImmersion(page, c.year);
      const frame = contentFrame(page);
      const addBtn = frame.locator('[data-add-cart]').first();
      await expect(addBtn).toBeVisible({ timeout: 20000 });

      await page.evaluate((key) => localStorage.setItem(key, '[]'), c.storageKey);
      await addBtn.click({ force: true });

      await expect
        .poll(async () => {
          return page.evaluate((key) => {
            try {
              const arr = JSON.parse(localStorage.getItem(key) || '[]');
              return Array.isArray(arr) ? arr.length : 0;
            } catch (e) {
              return -1;
            }
          }, c.storageKey);
        }, { timeout: 15000 })
        .toBeGreaterThan(0);
    });
  }
});
