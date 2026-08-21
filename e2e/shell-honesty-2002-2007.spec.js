// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

const YEARS = [
  { year: '2002', os: /Windows XP/i, browser: /Internet Explorer 6/i },
  { year: '2003', os: /Windows XP/i, browser: /Internet Explorer 6/i },
  { year: '2004', os: /Windows XP/i, browser: /Internet Explorer 6/i },
  { year: '2005', os: /Windows XP/i, browser: /Internet Explorer 6/i },
  { year: '2006', os: /Windows XP/i, browser: /Internet Explorer 6/i },
];

test.describe('shell honesty 2002–2007', () => {
  for (const { year, os, browser } of YEARS) {
    test(`${year} exit-bar year-label is year-true`, async ({ page }) => {
      await enterYear(page, year);
      const label = page.locator('.year-label');
      await expect(label).toContainText(year);
      await expect(label).toContainText(os);
      await expect(label).toContainText(browser);
      await expect(label).not.toContainText('2013 · Windows 7');
      if (year !== '2001') {
        await expect(label).not.toContainText('2001 · Windows XP');
      }
      const bodyYear = await page.locator('body').getAttribute('data-itt-year');
      expect(bodyYear).toBe(year);
    });
  }
});
