const { test, expect } = require('@playwright/test');

test.describe('2005 MVP', () => {
  test('hub opens 2005', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card[data-year="2005"]');
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/years\/2005/);
  });

  test('shell boots year 2005', async ({ page }) => {
    await page.goto('/years/2005/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2005');
  });

  test('home lists guided 6 and leftover 3×3', async ({ page }) => {
    await page.goto('/years/2005/pages/home.html');
    await expect(page.locator('#ott-guided-2005 ol li')).toHaveCount(6);
    await expect(page.locator('body')).toContainText('Upload');
    expect(await page.locator('p.itt-pop-3x3[data-itt-pop-3x3="2005"] a[href*="sites/"]').count()).toBeGreaterThanOrEqual(3);
  });

  test('2006 hub card is open', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2006"]')).toBeVisible();
  });
});
