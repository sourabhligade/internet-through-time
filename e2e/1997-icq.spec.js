// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1997 ICQ', () => {
  test('ICQ landing explains download IM culture', async ({ page }) => {
    await enterYear(page, '1997');
    await goInFrame(page, 'sites/icq/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1997');
    await expect(frame.locator('text=/ICQ|I Seek You/i').first()).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('text=/buddy|Mirabilis|download/i').first()).toBeVisible();
  });
});
