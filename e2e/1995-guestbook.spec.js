// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1995 GeoCities guestbook', () => {
  test('signing guestbook adds entry to list and storage', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt95-gb') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });

    await goInFrame(page, 'sites/geocities/Hollywood/1234/index.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);

    await expect(frame.locator('form[data-gb-form]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="n"]').fill('TestVisitor');
    await frame.locator('input[name="f"]').fill('Testville');
    await frame.locator('textarea[name="m"]').fill('Cool page from e2e!');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });

    await expect(frame.locator('[data-gb-list]')).toContainText('TestVisitor', { timeout: 10000 });
    await expect(frame.locator('[data-gb-list]')).toContainText('Cool page from e2e');

    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const raw = localStorage.getItem('itt95-gb-gc-holly');
          return raw && raw.includes('TestVisitor');
        } catch (e) {
          return false;
        }
      });
    }, { timeout: 10000 }).toBeTruthy();
  });
});
