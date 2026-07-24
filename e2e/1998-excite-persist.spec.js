// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1998 Excite personalize persist', () => {
  test('hidden stocks module stays hidden after revisit', async ({ page }) => {
    await enterYear(page, '1998');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt98-excite') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });

    await goInFrame(page, 'sites/excite/index.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);

    await expect(frame.locator('[data-excite-mod="stocks"]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-excite-toggle="stocks"]').click();
    await expect(frame.locator('[data-excite-mod="stocks"]')).toBeHidden({ timeout: 5000 });

    await goInFrame(page, 'sites/excite/index.html');
    await waitForImmersion(page, '1998');
    await expect(contentFrame(page).locator('[data-excite-mod="stocks"]')).toBeHidden({
      timeout: 10000,
    });
  });
});
