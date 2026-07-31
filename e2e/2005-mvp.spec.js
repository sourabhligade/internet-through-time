// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

test.describe('2005 MVP', () => {
  test('shell boots XP/IE6 2005', async ({ page }) => {
    await enterYear(page, '2005');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2005');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('youtube framing', async ({ page }) => {
    await enterYear(page, '2005');
    await page.evaluate(() => {
      const f = document.getElementById('content');
      if (f) f.src = 'sites/youtube/index.html';
    });
    await page.waitForTimeout(600);
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Broadcast Yourself|YouTube/i);
  });

  test('home tour lists P0', async ({ page }) => {
    await page.goto('/years/2005/pages/home.html');
    for (const t of ['YouTube', 'Google Maps', 'Reddit', 'Digg']) {
      await expect(page.locator('body')).toContainText(t);
    }
  });
});
