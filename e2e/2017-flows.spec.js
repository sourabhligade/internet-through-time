// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2017 flows smoke', () => {
  test('shell · about · Face ID · Fortnite · WannaCry', async ({ page }) => {
    await page.goto('/years/2017/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2017');

    await page.goto('/years/2017/pages/about.html');
    await expect(page.locator('body')).toContainText('1,766,926,408');

    await page.goto('/years/2017/sites/iphone/x.html');
    await expect(page.locator('body')).toContainText(/Face ID|iPhone X/i);

    await page.goto('/years/2017/sites/fortnite/index.html');
    await expect(page.locator('body')).toContainText(/Fortnite|free|Battle Royale/i);

    await page.goto('/years/2017/sites/wannacry/index.html');
    await expect(page.locator('body')).toContainText(/WannaCry|May 2017|ransomware/i);
  });

  test('map + whats-new', async ({ page }) => {
    await page.goto('/years/2017/pages/map.html');
    await expect(page.locator('body')).toContainText(/2017|flow|map|Face ID|Fortnite/i);

    await page.goto('/years/2017/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/2017|Face ID|Fortnite|280/i);
  });
});
