// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2002 MVP — always-on · Friendster · KaZaA · TrackBack · Wired', () => {
  test('hub opens 2002', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href*="years/2002"]')).toBeVisible();
  });

  test('shell boots year-2002 XP/IE6', async ({ page }) => {
    await enterYear(page, '2002');
    await expect(page.locator('#content')).toBeVisible();
    await expect(page.locator('#location')).toBeVisible();
    await expect(page.locator('body')).toHaveClass(/year-2002/);
  });

  test('About has Pew 21% framing', async ({ page }) => {
    await page.goto('/years/2002/pages/about.html');
    await expect(page.getByText(/21%/)).toBeVisible();
    await expect(page.getByText(/24 million/i)).toBeVisible();
  });

  test('Friendster profile theater', async ({ page }) => {
    await page.goto('/years/2002/sites/friendster/index.html');
    await expect(page.getByText(/Friendster/i).first()).toBeVisible();
    await expect(page.getByText(/founded in 2002/i)).toBeVisible();
  });

  test('KaZaA search theater', async ({ page }) => {
    await page.goto('/years/2002/sites/kazaa/client.html');
    await expect(page.locator('[data-kazaa-search]')).toBeVisible();
    await page.fill('[data-kazaa-q], [name="q"]', 'mp3');
    await page.click('[data-kazaa-search] button[type="submit"], [data-kazaa-search] input[type="submit"]');
    await expect(page.locator('[data-kazaa-results]')).toContainText(/simulated|File|Download|peer|mp3|kbps/i, { timeout: 5000 });
  });

  test('TrackBack form', async ({ page }) => {
    await page.goto('/years/2002/sites/movabletype/trackback.html');
    await expect(page.locator('[data-trackback-form]')).toBeVisible();
    await page.click('[data-trackback-form] button[type="submit"]');
    await expect(page.locator('[data-trackback-status]')).toContainText(/Ping|sent|TrackBack|ok|list/i);
  });

  test('Wired CSS redesign story', async ({ page }) => {
    await page.goto('/years/2002/sites/wired/index.html');
    await expect(page.getByText(/CSS/i).first()).toBeVisible();
    await expect(page.getByText(/2002/i).first()).toBeVisible();
  });

  test('Google News-New! and page count', async ({ page }) => {
    await page.goto('/years/2002/sites/google/index.html');
    await expect(page.getByText(/News/i).first()).toBeVisible();
    await expect(page.getByText(/3,083,324,652/)).toBeVisible();
  });

  test('Amazon smile present', async ({ page }) => {
    await page.goto('/years/2002/sites/amazon/index.html');
    await expect(page.locator('img[src*="smile"]').first()).toBeVisible();
  });
});
