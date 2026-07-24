// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion } = require('./helpers');

const HOME_LINKS = [
  'Napster',
  'Google',
  'Blogger',
  'Yahoo!',
  'Amazon.com',
  'eBay',
  'Ask Jeeves',
  'CNN',
  'Y2K',
  'PayPal',
  'Hampster',
  'Zombo',
  'Slashdot',
  'MSN Gaming',
  'Matrix',
  'Flash 4',
  'My Netscape',
];

test.describe('1999 Starting Point links', () => {
  test('signature home links — no 404 / no pages/sites', async ({ page }) => {
    const failures = [];
    for (const name of HOME_LINKS) {
      await enterYear(page, '1999');
      const f = contentFrame(page);
      const link = f.getByRole('link', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first();
      const visible = await link.isVisible().catch(() => false);
      if (!visible) {
        failures.push({ name, error: 'link not visible on home' });
        continue;
      }
      await link.click();
      await page.waitForTimeout(700);
      const bodyText = await contentFrame(page).locator('body').innerText().catch(() => '');
      const loc = await page.locator('#location').inputValue().catch(() => '');
      const is404 = /404 Not Found|Unable to locate the server|not part of the|pages\/sites\//i.test(bodyText);
      const badLoc = /pages\/sites\//.test(loc);
      if (is404 || badLoc) {
        failures.push({ name, loc, is404, badLoc, snippet: bodyText.slice(0, 160) });
      }
    }
    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });

  test('exhibit nav bar links work', async ({ page }) => {
    await enterYear(page, '1999');
    await waitForImmersion(page, '1999');
    const frame = contentFrame(page);
    const nav = frame.locator('#itt-exhibit-nav a');
    const n = await nav.count();
    expect(n).toBeGreaterThan(0);
    const failures = [];
    for (let i = 0; i < n; i++) {
      await enterYear(page, '1999');
      await waitForImmersion(page, '1999');
      const f = contentFrame(page);
      const a = f.locator('#itt-exhibit-nav a').nth(i);
      const text = (await a.innerText()).trim();
      if (/exit|^start$/i.test(text)) continue;
      await a.click();
      await page.waitForTimeout(700);
      const body = await contentFrame(page).locator('body').innerText();
      const loc = await page.locator('#location').inputValue();
      if (/404 Not Found|Unable to locate/i.test(body) || /pages\/sites\//.test(loc)) {
        failures.push({ text, loc, snippet: body.slice(0, 120) });
      }
    }
    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
  });
});
