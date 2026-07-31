// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('1998 Amazon Music', () => {
  test('Music tab page loads and can add CD to cart', async ({ page }) => {
    // Direct content page: avoids shell iframe race on amazon feature boot
    await page.goto('/years/1998/sites/amazon/music.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt98') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '1998',
      null,
      { timeout: 25000 }
    );
    await expect(page.locator('body')).toContainText('Music', { timeout: 15000 });
    await expect(page.locator('[data-add-cart]').first()).toBeVisible({ timeout: 15000 });
    await page.locator('[data-add-cart]').first().click();
    await expect
      .poll(
        async () => page.evaluate(() => localStorage.getItem('itt98-amazon-cart') || ''),
        { timeout: 10000 }
      )
      .toMatch(/ok-computer|Radiohead|title/i);
    await expect(page.locator('[data-cart-count]').first()).not.toHaveText('0', { timeout: 8000 });
  });
});
