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

  test('home lists guided 6 and leftover strips', async ({ page }) => {
    await page.goto('/years/2005/pages/home.html');
    await expect(page.locator('#ott-guided-2005 ol li')).toHaveCount(6);
    await expect(page.locator('body')).toContainText('Upload');
    await expect(page.locator('nav[data-itt-pop3x="2005"] a')).toHaveCount(9);
    await expect(page.locator('[data-itt-pop-more="2005"] a')).toHaveCount(9);
    await expect(page.locator('[data-itt-pop-3x3="2005"] a')).toHaveCount(9);
  });

  test('2006 stays boarded', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card[href*="years/2006"]')).toHaveCount(0);
    await expect(page.locator('.year-card.locked.y2006')).toBeVisible();
  });
});
