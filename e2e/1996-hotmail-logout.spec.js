// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1996 HoTMaiL logout', () => {
  test('sign out clears user and returns to login', async ({ page }) => {
    await enterYear(page, '1996');
    await goInFrame(page, 'sites/hotmail/index.html');
    await waitForImmersion(page, '1996');
    const frame = contentFrame(page);

    await frame.locator('input[name="login"]').fill('logoutuser');
    await frame.locator('input[name="pass"]').fill('secret');
    await frame.locator('form[data-hotmail-login] input[type="submit"]').click({ force: true });

    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const u = localStorage.getItem('itt96-hotmail-user');
          return !!(u && u.includes('logoutuser'));
        } catch (e) {
          return false;
        }
      });
    }, { timeout: 15000 }).toBeTruthy();

    // Should be on inbox (or still have logout control)
    await page.waitForFunction(() => {
      try {
        const doc = document.getElementById('content').contentDocument;
        return !!(doc && doc.querySelector('[data-hotmail-logout]'));
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });

    await contentFrame(page).locator('[data-hotmail-logout]').first().click({ force: true });

    await expect.poll(async () => {
      return page.evaluate(() => localStorage.getItem('itt96-hotmail-user'));
    }, { timeout: 15000 }).toBeFalsy();

    await expect(contentFrame(page).locator('form[data-hotmail-login]')).toBeVisible({
      timeout: 15000,
    });
  });
});
