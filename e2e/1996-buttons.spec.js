// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('1996 chrome buttons + dirbar (live, not mocks)', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
  });

  test('Start menu Settings + Run', async ({ page }) => {
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="settings"]').click();
    await expect(page.locator('#dlg-prefs')).not.toHaveClass(/hidden/);
    await page.evaluate(() => {
      document.getElementById('dlg-prefs')?.classList.add('hidden');
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="run"]').click();
    await expect(page.locator('#dlg-open-location')).not.toHaveClass(/hidden/);
  });

  test('Start menu Help + Programs navigate', async ({ page }) => {
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="help"]').click();
    await page.waitForTimeout(400);
    expect(await page.locator('#content').getAttribute('src')).toMatch(/about\.html/);
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="programs"]').click();
    await page.waitForTimeout(400);
    expect(await page.locator('#content').getAttribute('src')).toMatch(/home\.html/);
  });

  test('dirbar HoTMaiL Space Jam Excite CNN', async ({ page }) => {
    for (const [label, re] of [
      ['HoTMaiL', /hotmail/i],
      ['Space Jam', /spacejam/i],
      ['Excite', /excite/i],
      ['CNN', /cnn/i],
      ['Yahoo!', /yahoo/i],
    ]) {
      await page.evaluate(() => {
        document.getElementById('modal-backdrop')?.classList.add('hidden');
        document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      });
      await page.locator('#dirbar .dir-btn', { hasText: label }).click({ force: true });
      await page.waitForTimeout(1000);
      expect(await page.locator('#content').getAttribute('src')).toMatch(re);
    }
  });

  test('home destinations + dirbar present', async ({ page }) => {
    await page.locator('#dirbar .dir-btn', { hasText: 'Home' }).click({ force: true });
    await page.waitForTimeout(600);
    const frame = page.frameLocator('#content');
    // Quick-btns removed — destinations list + browser dirbar are the wayfinding
    await expect(frame.getByRole('link', { name: /HoTMaiL|Yahoo/i }).first()).toBeVisible({ timeout: 10000 });
    await expect(frame.locator('body')).toContainText(/Destinations|Places to try|Welcome/i);
    const dirN = await page.locator('#dirbar .dir-btn').count();
    expect(dirN).toBeGreaterThanOrEqual(6);
  });
});
