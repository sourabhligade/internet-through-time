const { test, expect } = require('@playwright/test');

test.describe('2006 MVP', () => {
  test('hub opens 2006', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card[data-year="2006"]');
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/years\/2006/);
  });
  test('shell boots year 2006', async ({ page }) => {
    await page.goto('/years/2006/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2006');
  });
  test('home lists guided 6 and leftover 3×3', async ({ page }) => {
    await page.goto('/years/2006/pages/home.html');
    await expect(page.locator('#ott-guided-2006 ol li')).toHaveCount(6);
    await expect(page.locator('body')).toContainText('Twttr');
    await expect(
      page.locator('p.itt-pop-3x3[data-itt-pop-3x3="2006"]').first().locator('a[href*="sites/"]')
    ).toHaveCount(9);
  });
  test('2007 hub card is open', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card[href*="years/2007"]')).toHaveCount(0);
  });
});
