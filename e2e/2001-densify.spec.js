// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2001 densify', () => {
  test('Wikipedia main has densify nav and stubs', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/index.html');
    await expect(page.getByText(/free encyclopedia|anyone can edit/i).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Recent changes/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Community portal/i }).first()).toBeVisible();
    await page.getByRole('link', { name: /^Wiki$/i }).first().click();
    await expect(page).toHaveURL(/article-wiki/);
    await expect(page.getByText(/wiki wiki|Ward Cunningham/i).first()).toBeVisible();
  });

  test('Wikipedia edit + Nupedia article', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/edit.html');
    await expect(page.getByText(/Be bold|Editing/i).first()).toBeVisible();
    await page.goto('/years/2001/sites/wikipedia/article-nupedia.html');
    await expect(page.getByText(/Nupedia|peer review/i).first()).toBeVisible();
  });

  test('iPod multi-page densify', async ({ page }) => {
    await page.goto('/years/2001/sites/apple/ipod.html');
    await expect(page.getByText(/1,000 songs/i).first()).toBeVisible();
    await page.getByRole('link', { name: /Tech specs/i }).first().click();
    await expect(page).toHaveURL(/specs/);
    await expect(page.getByText(/5 GB|FireWire/i).first()).toBeVisible();
    await page.goto('/years/2001/sites/apple/ipod/howto.html');
    await expect(page.getByText(/FireWire|iTunes/i).first()).toBeVisible();
  });
});
