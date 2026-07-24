// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2001 signature', () => {
  test('Wikipedia free encyclopedia', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/index.html');
    await expect(page.getByText(/Wikipedia|free encyclopedia|anyone can edit/i).first()).toBeVisible();
  });
  test('iPod pocket jukebox', async ({ page }) => {
    await page.goto('/years/2001/sites/apple/ipod.html');
    await expect(page.getByText(/1,000 songs|iPod/i).first()).toBeVisible();
  });
  test('shell IE6 / 2001', async ({ page }) => {
    await page.goto('/years/2001/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2001');
    await expect(page.locator('.year-label')).toContainText('2001');
  });
});
