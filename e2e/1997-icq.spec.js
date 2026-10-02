// @ts-check
const { test, expect } = require('@playwright/test');


async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1997 ICQ', () => {
  test('ICQ landing explains download IM culture', async ({ page }) => {
    await enterYear(page, '1997');
    await goInFrame(page, 'sites/icq/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1997');
    await expect(frame.locator("b").filter({ hasText: "I Seek You" }).first()).toBeVisible({ timeout: 15000 });
    await expect(frame.locator("p").filter({ hasText: /buddy lists/i }).first()).toBeVisible();
  });
});
