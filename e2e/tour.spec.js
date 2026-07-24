// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

/** 1998 tour steps from config/immersion-1998.js */
const TOUR_1998 = [
  { id: 'google', path: 'sites/google/index.html' },
  { id: 'yahoo', path: 'sites/yahoo/index.html' },
  { id: 'amazon', path: 'sites/amazon/music.html' },
  { id: 'ebay', path: 'sites/ebay/index.html' },
  { id: 'excite', path: 'sites/excite/index.html' },
];

test.describe('guided tour', () => {
  test('1998 tour marks steps done and completes', async ({ page }) => {
    await enterYear(page, '1998');

    // Clear prior tour state
    await page.evaluate(() => {
      const keys = Object.keys(localStorage).filter((k) => k.indexOf('itt98-tour') !== -1);
      keys.forEach((k) => localStorage.removeItem(k));
    });

    await goInFrame(page, 'pages/home.html');
    await waitForImmersion(page, '1998');

    // Visit each tour page so markTourProgress fires
    for (const step of TOUR_1998) {
      await goInFrame(page, step.path);
      await waitForImmersion(page, '1998');
      // give markTourProgress a tick
      await page.waitForTimeout(300);
    }

    // Return home and assert tour UI
    await goInFrame(page, 'pages/home.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-itt-tour]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('[data-itt-tour]')).toContainText(/5\/5|Tour complete/i, {
      timeout: 15000,
    });
  });
});
