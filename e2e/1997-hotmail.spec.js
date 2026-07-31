// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1997 HoTMaiL', () => {
  test('login writes user and shows inbox rows (itt97)', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt97') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/hotmail/index.html');
    await waitForImmersion(page, '1997');
    const frame = contentFrame(page);
    await expect(frame.locator('form[data-hotmail-login]')).toBeVisible({ timeout: 20000 });

    await frame.locator('input[name="login"]').fill('itt97user');
    await frame.locator('input[name="pass"]').fill('secret');
    await frame
      .locator('form[data-hotmail-login] input[type="submit"], form[data-hotmail-login] input[type="image"]')
      .first()
      .click({ force: true });

    await expect(frame.locator('[data-hotmail-inbox] tr').first()).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('body')).toContainText(/Inbox|welcome@hotmail|HoTMaiL|itt97user/i);

    await expect
      .poll(async () => {
        return page.evaluate(() => {
          try {
            const u = localStorage.getItem('itt97-hotmail-user');
            return !!(u && u.includes('itt97user'));
          } catch (e) {
            return false;
          }
        });
      }, { timeout: 10000 })
      .toBeTruthy();
  });

  test('dirbar HoTMaiL reaches login', async ({ page }) => {
    await enterYear(page, '1997');
    const btn = page.locator('#dirbar .dir-btn', { hasText: /HoTMaiL/i });
    if ((await btn.count()) === 0) {
      test.skip();
      return;
    }
    await btn.first().click({ force: true });
    await page.waitForTimeout(900);
    await waitForImmersion(page, '1997');
    await expect(contentFrame(page).locator('form[data-hotmail-login]')).toBeVisible({ timeout: 15000 });
    await expect(contentFrame(page).locator('body')).toContainText(/HoTMaiL|Sign|Login|Member/i);
  });
});
