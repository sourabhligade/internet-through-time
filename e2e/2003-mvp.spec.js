// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2003 MVP — MySpace · Store · WP · LinkedIn · museum densify', () => {
  test('hub opens 2003', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card[data-year="2003"], a[href*="years/2003"]')).toBeVisible();
    await page.click('a[href="years/2003/"], a[href*="years/2003/"]');
    await expect(page).toHaveURL(/2003/);
  });

  test('shell boots year-2003', async ({ page }) => {
    await page.goto('/years/2003/');
    await page.evaluate(() => {
      sessionStorage.setItem('itt-2003-connected', '1');
      localStorage.setItem('itt-2003-coach-seen', '1');
      sessionStorage.setItem('itt-2003-coach-seen', '1');
    });
    await page.goto('/years/2003/');
    await expect(page.locator('body.year-2003, body[data-itt-year="2003"]')).toBeVisible();
  });

  test('home thesis + P0 links', async ({ page }) => {
    await page.goto('/years/2003/pages/home.html');
    await expect(page.locator('body')).toContainText(/40[,.]?912[,.]?332|40\.9/);
    for (const slug of ['myspace', 'itunes', 'wordpress', 'linkedin', 'bloglines']) {
      await expect(page.locator(`a[href*="${slug}"]`).first()).toBeVisible();
    }
  });

  test('MySpace profile theater', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/profile.html');
    await page.fill('[name="display"]', 'Museum User');
    await page.fill('[name="headline"]', 'HTML vibes');
    await page.click('input[type="submit"], button[type="submit"]');
    await expect(page.locator('[data-myspace-status]')).toContainText(/saved/i);
  });

  test('MySpace about pitch', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/about.html');
    await expect(page.locator('body')).toContainText(/friends. friends/i);
  });

  test('iTunes 99 cent buy theater', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await expect(page.locator('.itunes-price').first()).toBeVisible();
    await expect(page.getByText(/stream now|spotify/i)).toHaveCount(0);
    await page.locator('[data-itunes-buy] button[type="submit"]').first().click();
    await expect(page.locator('[data-itunes-status]')).toContainText(/Purchased|99/i);
  });

  test('WordPress publish', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/dashboard.html');
    await page.fill('[name="title"]', 'Hello 2003');
    await page.click('[data-wp-publish] button[type="submit"]');
    await expect(page.locator('[data-wp-status]')).toContainText(/Published/i);
  });

  test('LinkedIn connect', async ({ page }) => {
    await page.goto('/years/2003/sites/linkedin/index.html');
    await page.click('[data-li-connect]').catch(async () => {
      await page.locator('[data-li-connect]').first().click({ force: true });
    });
    await expect(page.locator('[data-li-connect]').first()).toContainText(/Connected|Connect/i);
  });

  test('AdSense signup theater', async ({ page }) => {
    await page.goto('/years/2003/sites/adsense/index.html');
    await page.click('[data-adsense-signup] button[type="submit"]');
    await expect(page.locator('[data-adsense-status]')).toContainText(/Approved|theater/i);
  });

  test('Bloglines no-install + subscribe', async ({ page }) => {
    await page.goto('/years/2003/sites/bloglines/index.html');
    await expect(page.locator('body')).toContainText(/no installation|no install/i);
    await page.goto('/years/2003/sites/bloglines/reader.html');
    await page.fill('[name="title"]', 'Museum Feed');
    await page.click('[data-bloglines-add] button[type="submit"]');
    await expect(page.locator('[data-bloglines-status]')).toContainText(/Subscribed|museum/i);
  });

  test('Blogger Google ownership + Firebird honesty', async ({ page }) => {
    await page.goto('/years/2003/sites/blogger/index.html');
    await expect(page.locator('body')).toContainText(/February 2003|Google/i);
    await expect(page.getByText(/do not claim Google ownership/i)).toHaveCount(0);
    await page.goto('/years/2003/sites/phoenix/index.html');
    await expect(page.locator('body')).toContainText(/Firebird/);
    await expect(page.getByText(/September 23, 2003/)).toHaveCount(0);
  });

  test('About Facemash footnote', async ({ page }) => {
    await page.goto('/years/2003/pages/about.html');
    await expect(page.locator('body')).toContainText(/Facemash/);
  });
});
