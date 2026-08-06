// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2000 MVP — smile · Napster · Pets · crash', () => {
  test('hub opens 2000', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card[data-year="2000"], a[href*="years/2000"]')).toBeVisible();
    await page.click('a[href="years/2000/"], a[href*="years/2000/"]');
    await expect(page).toHaveURL(/2000/);
  });

  test('shell boots year-2000 IE 5.5', async ({ page }) => {
    await page.goto('/years/2000/');
    await page.evaluate(() => {
      sessionStorage.setItem('itt-2000-connected', '1');
      localStorage.setItem('itt-2000-coach-seen', '1');
      sessionStorage.setItem('itt-2000-coach-seen', '1');
    });
    await page.goto('/years/2000/');
    await expect(page.locator('body.year-2000, body[data-itt-year="2000"]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/Internet Explorer 5\.5|IE 5\.5/);
  });

  test('home thesis + P0 links', async ({ page }) => {
    await page.goto('/years/2000/pages/home.html');
    await expect(page.locator('body')).toContainText(/17[,.]?087[,.]?182|17\.1/);
    for (const slug of ['amazon', 'napster', 'pets']) {
      await expect(page.locator(`a[href*="${slug}"]`).first()).toBeVisible();
    }
  });

  test('Amazon smile logo present', async ({ page }) => {
    await page.goto('/years/2000/sites/amazon/index.html');
    await expect(page.locator('img[src*="logo-smile"]').first()).toBeVisible();
    await expect(page.locator('body')).toContainText(/smile/i);
  });

  test('Napster Internet speed marketing', async ({ page }) => {
    await page.goto('/years/2000/sites/napster/index.html');
    await expect(page.locator('body')).toContainText(/Internet speed/i);
  });

  test('Pets.com sock puppet crash arc', async ({ page }) => {
    await page.goto('/years/2000/sites/pets/index.html');
    await expect(page.locator('body')).toContainText(/sock puppet|Pets Can't Drive/i);
  });

  test('About honesty bans', async ({ page }) => {
    await page.goto('/years/2000/pages/about.html');
    await expect(page.locator('body')).toContainText(/17,087,182/);
    await expect(page.locator('body')).toContainText(/Wikipedia|XP|IE 6/i);
  });
});
