// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2000 authenticity', () => {
  test('shell is IE 5.5 / year 2000', async ({ page }) => {
    await page.goto('/years/2000/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2000');
    await expect(page.locator('.year-label')).toContainText('2000');
    await expect(page.locator('.year-label')).toContainText('Internet Explorer 5.5');
  });

  test('hub unlocks 2000', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card[data-year="2000"]');
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute('href', /2000/);
  });

  test('Amazon smile logo present', async ({ page }) => {
    await page.goto('/years/2000/');
    const skip = page.locator('#skip-connect');
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await page.waitForFunction(() => {
      const f = document.getElementById('content');
      try { return !!(f && f.contentDocument && f.contentDocument.body); } catch (e) { return false; }
    }, null, { timeout: 20000 });

    await page.locator('.dir-btn', { hasText: 'Amazon' }).click();
    const frame = page.frameLocator('#content');
    await expect(frame.locator('img[src*="logo-smile"]').first()).toBeVisible({ timeout: 15000 });
  });
});
