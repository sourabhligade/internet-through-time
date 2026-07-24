// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2002 signature', () => {
  test('shell is 2002 IE6', async ({ page }) => {
    await page.goto('/years/2002/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2002');
    await expect(page.locator('.year-label')).toContainText('2002');
  });

  test('hub unlocks 2002', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card[data-year="2002"]')).toBeVisible();
  });

  test('Friendster profile theater', async ({ page }) => {
    await page.goto('/years/2002/sites/friendster/index.html');
    await page.waitForTimeout(600);
    await expect(page.locator('[data-friendster-profile]')).toBeVisible();
    await expect(page.locator('[data-fs-friends] li').first()).toBeVisible({ timeout: 10000 });
  });

  test('KaZaA search theater', async ({ page }) => {
    await page.goto('/years/2002/sites/kazaa/search.html?q=example');
    await page.waitForTimeout(600);
    await expect(page.locator('[data-kazaa-results]')).toContainText(/Example|Download|Sources/i);
  });

  test('Wired CSS newsroom', async ({ page }) => {
    await page.goto('/years/2002/sites/wired/index.html');
    await expect(page.getByText(/CSS|standards|Wired/i).first()).toBeVisible();
  });
});
