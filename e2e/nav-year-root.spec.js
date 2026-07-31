// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

const CASES = [
  { year: '1994', link: /Fish Cam/i, ok: /Fish|webcam|tank/i, badLoc: /pages\/sites\// },
  { year: '1998', link: /Google/i, ok: /Google|Search the web/i, badLoc: /pages\/sites\// },
  { year: '1999', link: /Napster/i, ok: /Napster|MP3|peer/i, badLoc: /pages\/sites\// },
];

test.describe('year-root nav from Starting Point', () => {
  for (const c of CASES) {
    test(`${c.year} → ${c.link}`, async ({ page }) => {
      await enterYear(page, c.year);
      const frame = contentFrame(page);
      await expect(frame.locator('body')).toBeVisible({ timeout: 15000 });
      const link = frame.getByRole('link', { name: c.link }).first();
      await expect(link).toBeVisible({ timeout: 15000 });
      await link.click();
      await expect(frame.getByText(/404 Not Found/i)).toHaveCount(0, { timeout: 15000 });
      await expect(frame.getByText(c.ok).first()).toBeVisible({ timeout: 15000 });
      const loc = await page.locator('#location').inputValue();
      expect(loc).not.toMatch(c.badLoc);
      expect(loc).not.toMatch(/pages\/sites\//);
    });
  }
});
