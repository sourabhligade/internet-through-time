// @ts-check
/** 2004 trail — Gmail / Thefacebook paths */
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}


test.describe('2004 trail real flows', () => {
  test('home → Gmail', async ({ page }) => {
    await page.goto('/years/2004/pages/home.html');
    const link = page.locator('a[href*="gmail"]').first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/gmail/i);
  });

  test('Gmail login theater writes itt04 only when hooks present', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/index.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt04-') || k.startsWith('itt03-') || k.startsWith('itt05-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    const form = page.locator('[data-gmail-login], form[data-gmail-login]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('input[name="email"], input[type="email"], input[name="user"]').first().fill('museum@example.com');
    await form.locator('[name="pass"], input[type="password"]').first().fill('secret');
    await form.locator('button, input[type="submit"]').first().click();
    await expect
      .poll(async () => page.evaluate(() => Object.keys(localStorage).some((k) => k.startsWith('itt04-gmail'))))
      .toBeTruthy();
    const leak = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt03-') || k.startsWith('itt05-'))
    );
    expect(leak).toEqual([]);
  });
});
