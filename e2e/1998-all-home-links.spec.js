// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

/** Signature destinations listed on 1998 Starting Point */
const HOME_LINKS = [
  'Google!',
  'Yahoo!',
  'Amazon.com',
  'eBay',
  'Excite',
  'CNN Interactive',
  'GeoCities',
  'Hotmail',
  'CDnow',
  'Valve',
  'Slashdot',
  "You've Got Mail",
];

test.describe('1998 every Starting Point link', () => {
  test('click signature home links — no 404 / no pages/sites', async ({ page }) => {
    const failures = [];
    for (const name of HOME_LINKS) {
      await enterYear(page, '1998');
      const f = contentFrame(page);
      const link = f.getByRole('link', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first();
      await expect(link, name).toBeVisible({ timeout: 12000 });
      await link.click();
      await page.waitForTimeout(700);
      const bodyText = await contentFrame(page).locator('body').innerText().catch(() => '');
      const loc = await page.locator('#location').inputValue().catch(() => '');
      const is404 = /404 Not Found|Unable to locate the server|not part of the/i.test(bodyText);
      const badLoc = /pages\/sites\//.test(loc);
      if (is404 || badLoc) {
        failures.push({ name, loc, is404, badLoc, snippet: bodyText.slice(0, 160) });
      }
    }
    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });
});
