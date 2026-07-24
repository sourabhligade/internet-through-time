// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2002 culture', () => {
  test('Friendster profile + KaZaA', async ({ page }) => {
    await page.goto('/years/2002/sites/friendster/index.html');
    await expect(page.locator('[data-friendster-profile], body').first()).toBeVisible();
    await page.goto('/years/2002/sites/kazaa/index.html');
    await expect(page.getByText(/KaZaA|Kazaa|P2P|file/i).first()).toBeVisible();
  });
  test('Wired + Daypop', async ({ page }) => {
    await page.goto('/years/2002/sites/wired/index.html');
    await expect(page.getByText(/Wired|CSS|web/i).first()).toBeVisible();
    await page.goto('/years/2002/sites/daypop/index.html');
    await expect(page.getByText(/Daypop|blog|RSS|sources/i).first()).toBeVisible();
  });
});
