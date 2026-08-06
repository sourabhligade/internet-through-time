// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

test.describe('2001 full year — MVP + densify', () => {
  test('hub opens 2001', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href*="years/2001"]')).toBeVisible();
  });

  test('shell boots year-2001 XP/IE6', async ({ page }) => {
    await enterYear(page, '2001');
    await expect(page.locator('#content')).toBeVisible();
    await expect(page.locator('#location')).toBeVisible();
    await expect(page.locator('body')).toHaveClass(/year-2001/);
  });

  test('Wikipedia UseMod edit preview', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/edit.html');
    await page.waitForTimeout(400);
    await page.fill('textarea[name="text"]', "'''Hello Wiki''' is live.");
    await page.click('[data-wiki-preview]');
    const out = page.locator('[data-wiki-preview-out]');
    await expect(out).toBeVisible({ timeout: 8000 });
    await expect(out.locator('b').filter({ hasText: 'Hello Wiki' })).toBeVisible();
  });

  test('Wikipedia home has edit-now CTA', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/index.html');
    await expect(page.getByText(/edit this page right now/i)).toBeVisible();
  });

  test('iPod slogan + not store', async ({ page }) => {
    await page.goto('/years/2001/sites/apple/ipod.html');
    await expect(page.getByText(/1,000 songs in your pocket/i)).toBeVisible();
    await expect(page.getByText(/not a music store|still in the future/i).first()).toBeVisible();
  });

  test('iTunes library download theater', async ({ page }) => {
    await page.goto('/years/2001/sites/apple/itunes.html');
    await expect(page.locator('[data-itt-download]')).toBeVisible();
    await expect(page.getByText(/jukebox/i).first()).toBeVisible();
  });

  test('Amazon smile logo', async ({ page }) => {
    await page.goto('/years/2001/sites/amazon/index.html');
    await expect(page.locator('img[src*="smile"]').first()).toBeVisible();
  });

  test('Google sparse 2001', async ({ page }) => {
    await page.goto('/years/2001/sites/google/index.html');
    await expect(page.locator('form[data-google-search], form[name="f"]')).toBeVisible();
    await expect(page.getByText(/©2001 Google|© 2001 Google/i)).toBeVisible();
  });

  test('Yahoo news is 2001 not 1997', async ({ page }) => {
    await page.goto('/years/2001/sites/yahoo/news.html');
    await expect(page.getByText(/Afghanistan|Anthrax|iPod|Internet Explorer 6/i).first()).toBeVisible();
    await expect(page.getByText(/Mars Pathfinder|Princess Diana/i)).toHaveCount(0);
  });

  test('CNN is late-2001 framing', async ({ page }) => {
    await page.goto('/years/2001/sites/cnn/index.html');
    await expect(page.getByText(/Afghanistan|Northern Alliance|al Qaeda/i).first()).toBeVisible();
  });

  test('Movable Type + Blogdex + Wayback present', async ({ page }) => {
    await page.goto('/years/2001/sites/movabletype/index.html');
    await expect(page.getByText(/Personal Publishing|Movable Type/i).first()).toBeVisible();
    await page.goto('/years/2001/sites/blogdex/index.html');
    await expect(page.getByText(/blogdex|13494/i).first()).toBeVisible();
    await page.goto('/years/2001/sites/wayback/index.html');
    await expect(page.getByText(/Wayback Machine/i)).toBeVisible();
  });

  test('P2 rooms Moreover Loudcloud Encarta', async ({ page }) => {
    await page.goto('/years/2001/sites/moreover/index.html');
    await expect(page.getByText(/webfeed|Moreover/i).first()).toBeVisible();
    await page.goto('/years/2001/sites/loudcloud/index.html');
    await expect(page.getByText(/Loudcloud|Andreessen/i).first()).toBeVisible();
    await page.goto('/years/2001/sites/encarta/index.html');
    await expect(page.getByText(/Wikipedia/i).first()).toBeVisible();
  });

  test('Napster endgame not growth-only', async ({ page }) => {
    await page.goto('/years/2001/sites/napster/index.html');
    await expect(page.getByText(/endgame|injunction|2001 legal/i).first()).toBeVisible();
  });

  test('home lists full year spine', async ({ page }) => {
    await page.goto('/years/2001/pages/home.html');
    await expect(page.getByRole('link', { name: /Wikipedia/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Movable Type/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Blogdex/i }).first()).toBeVisible();
  });
});
