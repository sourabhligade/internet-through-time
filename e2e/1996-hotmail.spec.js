// @ts-check
const { test, expect } = require('@playwright/test');

async function enterYear(page, year) {
  await page.goto(`/years/${year}/`);
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) {
    await skip.click();
  }
  for (let i = 0; i < 3; i++) {
    const alert = page.locator('#dlg-alert:not(.hidden)');
    if (await alert.isVisible().catch(() => false)) {
      await page.locator('#dlg-alert-ok, [data-close="dlg-alert"]').first().click();
      await page.waitForTimeout(100);
    } else break;
  }
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

test.describe('1996 immersion', () => {
  test('HoTMaiL login writes user and shows inbox rows', async ({ page }) => {
    await enterYear(page, '1996');

    await page.evaluate(() => {
      const iframe = document.getElementById('content');
      if (iframe) iframe.src = 'sites/hotmail/index.html';
    });

    const frame = page.frameLocator('#content');
    await expect(frame.locator('form[data-hotmail-login]')).toBeVisible({ timeout: 20000 });
    // Ensure no modal backdrop or dialog intercepts iframe clicks
    await page.evaluate(() => {
      const bd = document.getElementById('modal-backdrop');
      if (bd) bd.classList.add('hidden');
      document.querySelectorAll('.dialog:not(.hidden)').forEach(d => d.classList.add('hidden'));
    });

    await frame.locator('input[name="login"]').fill('testuser');
    await frame.locator('input[name="pass"]').fill('secret');
    // Force click to bypass any parent-page overlay interception
    await frame.locator('form[data-hotmail-login] input[type="submit"]').click({ force: true });

    // After login, inbox table body should have rows
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
