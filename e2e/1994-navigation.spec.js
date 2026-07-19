// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1994 navigation', () => {
  test('Yahoo Stanford directory loads', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/yahoo/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1994');
    await expect(frame.locator('text=/Yahoo/i').first()).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('text=/akebono|Stanford|Guide/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('CERN first-web page loads', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/cern/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1994');
    await expect(frame.locator('text=/World Wide Web|CERN|hypermedia/i').first()).toBeVisible({
      timeout: 15000,
    });
  });

  test('location bar shows mapped host after nav', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/yahoo/index.html');
    await waitForImmersion(page, '1994');
    await expect.poll(async () => {
      return page.locator('#location').inputValue();
    }, { timeout: 15000 }).toMatch(/yahoo|stanford|akebono/i);
  });
});
