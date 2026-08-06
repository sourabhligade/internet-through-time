// @ts-check
/** 2003 trail real flows */
const { test, expect } = require('@playwright/test');

test.describe('2003 trail real flows', () => {
  test('home → MySpace', async ({ page }) => {
    await page.goto('/years/2003/pages/home.html');
    const link = page.locator('a[href*="myspace"]').first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/myspace/i);
  });

  test('MySpace action does not leak itt02/itt04', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/index.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt02-') || k.startsWith('itt04-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    // best-effort interact
    const btn = page.locator('button, [data-myspace-add], [type="submit"]').first();
    if (await btn.count()) await btn.click().catch(() => {});
    const leaked = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt02-') || k.startsWith('itt04-'))
    );
    expect(leaked).toEqual([]);
  });
});
