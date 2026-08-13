// @ts-check
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1996 Yahoo depth + Amazon recs', () => {
  test('Yahoo Computers category has subcategories', async ({ page }) => {
    await enterYear(page, '1996');
    await goInFrame(page, 'sites/yahoo/Computers/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1996');
    await expect(frame.locator('text=/Computers/i').first()).toBeVisible({ timeout: 10000 });
    await expect(frame.locator('a[href*="Internet"], a[href*="Software"], a[href*="WWW"]').first()).toBeVisible();
    await expect(frame.locator('a[href*="hotmail"]').first()).toBeVisible();
  });

  test('Amazon shows customers-who-bought recs', async ({ page }) => {
    await enterYear(page, '1996');
    await goInFrame(page, 'sites/amazon/book-neuromancer.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1996');
    await expect(frame.locator('[data-amazon-recs]')).toBeVisible({ timeout: 10000 });
    await expect(frame.locator('[data-amazon-recs] li').first()).toBeVisible({ timeout: 10000 });
  });
});
