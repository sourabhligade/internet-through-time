// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2001 culture continuity', () => {
  test('Google habit + Amazon smile continuity', async ({ page }) => {
    await page.goto('/years/2001/sites/google/index.html');
    await expect(page.getByText(/Google|habit|Search/i).first()).toBeVisible();
    await page.goto('/years/2001/sites/amazon/index.html');
    await expect(page.locator('body')).toBeVisible();
  });
  test('Nupedia article + CNN room', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/article-nupedia.html');
    await expect(page.getByText(/Nupedia/i).first()).toBeVisible();
    await page.goto('/years/2001/sites/cnn/index.html');
    await expect(page.getByText(/CNN|News/i).first()).toBeVisible();
  });
});
