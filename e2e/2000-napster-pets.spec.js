// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2000 Napster + Pets', () => {
  test('Napster search theater', async ({ page }) => {
    // Direct content page (same pattern as 1999 suite)
    await page.goto('/years/2000/sites/napster/search.html?q=eminem');
    await page.waitForTimeout(800);
    await expect(page.locator('[data-napster-search]')).toBeVisible();
    await expect(page.locator('#napster-results')).toContainText(/Eminem|mp3|Download|Library/i);
  });

  test('Pets.com about shutdown story', async ({ page }) => {
    await page.goto('/years/2000/sites/pets/about.html');
    await expect(page.getByText(/November 2000|shutdown/i).first()).toBeVisible();
  });

  test('Napster marketing line on home', async ({ page }) => {
    await page.goto('/years/2000/sites/napster/index.html');
    await expect(page.getByText(/Internet speed/i).first()).toBeVisible();
  });
});
