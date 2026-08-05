// @ts-check
/**
 * 2002 trail — multi-step real localStorage isolation.
 */
const { test, expect } = require('@playwright/test');

test.describe('2002 trail real flows', () => {
  test('home → Friendster trail path exists', async ({ page }) => {
    await page.goto('/years/2002/pages/home.html');
    await expect(page.locator('body')).toContainText(/Friendster|2002|Starting/i);
    const link = page.locator('a[href*="friendster"]').first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/friendster/i);
    await expect(page.locator('body')).toContainText(/Friendster/i);
  });

  test('KaZaA search does not write wrong-year keys', async ({ page }) => {
    await page.goto('/years/2002/sites/kazaa/index.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt01-') || k.startsWith('itt03-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    const input = page.locator('input[name="q"], input[type="text"], [data-kazaa-q]').first();
    if ((await input.count()) && (await input.isVisible().catch(() => false))) {
      await input.fill('museum');
      const btn = page.locator('button[type="submit"], input[type="submit"], [data-kazaa-search]').first();
      if (await btn.count()) await btn.click();
    }
    const leaked = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt01-') || k.startsWith('itt03-'))
    );
    expect(leaked, 'no adjacent-year keys').toEqual([]);
  });
});
