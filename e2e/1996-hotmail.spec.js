// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1996 immersion', () => {
  test('HoTMaiL login writes user and shows inbox rows', async ({ page }) => {
    await enterYear(page, '1996');
    await goInFrame(page, 'sites/hotmail/index.html');

    const frame = contentFrame(page);
    await expect(frame.locator('form[data-hotmail-login]')).toBeVisible({ timeout: 20000 });
    await waitForImmersion(page, '1996');

    await frame.locator('input[name="login"]').fill('testuser');
    await frame.locator('input[name="pass"]').fill('secret');
    await frame.locator('form[data-hotmail-login] input[type="submit"], form[data-hotmail-login] input[type="image"]').click({ force: true });

    await expect(frame.locator('[data-hotmail-inbox] tr').first()).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('body')).toContainText(/Inbox|welcome@hotmail|HoTMaiL/i);

    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const u = localStorage.getItem('itt96-hotmail-user');
          return !!(u && u.includes('testuser'));
        } catch (e) {
          return false;
        }
      });
    }, { timeout: 10000 }).toBeTruthy();
  });
});
