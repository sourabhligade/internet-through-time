// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1996 Space Jam + HoTMaiL polish', () => {
  test('Space Jam hub lists planet destinations with GIF assets', async ({ page }) => {
    await enterYear(page, '1996');
    await goInFrame(page, 'sites/spacejam/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toBeVisible({ timeout: 20000 });
    await waitForImmersion(page, '1996');

    await expect(frame.locator('img[alt="Space Jam"]').first()).toBeVisible({ timeout: 10000 });
    // Authentic planet GIFs harvested from spacejam.com/1996
    const planets = frame.locator('img[src*="spacejam/p-"]');
    await expect(planets.first()).toBeVisible({ timeout: 10000 });
    const count = await planets.count();
    expect(count).toBeGreaterThanOrEqual(6);

    // Navigate to Jam Central
    await frame.locator('a[href*="jam.htm"]').first().click({ force: true });
    await expect(frame.locator('text=/Jam Central/i').first()).toBeVisible({ timeout: 15000 });
  });

  test('HoTMaiL seed inbox has welcome messages after login', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      localStorage.removeItem('itt96-hotmail-user');
      localStorage.removeItem('itt96-hotmail-mail');
    });

    await goInFrame(page, 'sites/hotmail/index.html');
    const frame = contentFrame(page);
    await expect(frame.locator('form[data-hotmail-login]')).toBeVisible({ timeout: 20000 });
    await waitForImmersion(page, '1996');

    await frame.locator('input[name="login"]').fill('playwright');
    await frame.locator('input[name="pass"]').fill('x');
    await frame.locator('form[data-hotmail-login] input[type="submit"]').click({ force: true });

    await expect(frame.locator('[data-hotmail-inbox] tr').first()).toBeVisible({ timeout: 20000 });
    const rows = await frame.locator('[data-hotmail-inbox] tr').count();
    expect(rows).toBeGreaterThanOrEqual(2);
    await expect(frame.locator('body')).toContainText(/welcome@hotmail|HoTMaiL/i);
  });
});
