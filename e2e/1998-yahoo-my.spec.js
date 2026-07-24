// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1998 My Yahoo personalize', () => {
  test('toggle hides My News module and persists after reload of page', async ({ page }) => {
    await enterYear(page, '1998');
    // clear personalize state
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt98-yahoo') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });

    await goInFrame(page, 'sites/yahoo/my.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);

    const mod = frame.locator('[data-yahoo-mod="news"]');
    await expect(mod).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-yahoo-toggle="news"]').click();
    await expect(mod).toBeHidden({ timeout: 5000 });

    // Re-navigate to my.html — state should stick
    await goInFrame(page, 'sites/yahoo/my.html');
    await waitForImmersion(page, '1998');
    await expect(contentFrame(page).locator('[data-yahoo-mod="news"]')).toBeHidden({
      timeout: 10000,
    });
  });
});
