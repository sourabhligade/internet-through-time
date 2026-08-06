// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2007 MVP', () => {
  test('shell boots 2007', async ({ page }) => {
    await enterYear(page, '2007');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2007');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('home lists P0 thesis', async ({ page }) => {
    await page.goto('/years/2007/pages/home.html');
    for (const t of ['iPhone', 'Gmail', 'Street View', 'Facebook', 'Twitter']) {
      await expect(page.locator('body')).toContainText(t);
    }
  });

  test('about bans Chrome and App Store', async ({ page }) => {
    await page.goto('/years/2007/pages/about.html');
    await expect(page.locator('body')).toContainText(/Chrome|App Store/i);
    await expect(page.locator('body')).toContainText(/iPhone|Street View|Feb 14|May 24/i);
  });

  test('iPhone browse theater → itt07-iphone-history', async ({ page }) => {
    await page.goto('/years/2007/sites/iphone/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-iphone-history');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-iphone-browse]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/no App Store|App Store/i);
    await page.fill('[name="url"]', 'http://www.google.com/');
    await page.locator('[data-iphone-browse] button[type="submit"]').click();
    await expect(page.locator('[data-iphone-status]')).toContainText(/Opened|itt07/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt07-iphone-history'));
    expect(raw || '').toContain('google');
  });

  test('Gmail open Feb 14', async ({ page }) => {
    await page.goto('/years/2007/sites/gmail/about.html');
    await expect(page.locator('body')).toContainText(/February 14|Feb 14|open to everyone/i);
  });

  test('Street View cities', async ({ page }) => {
    await page.goto('/years/2007/sites/maps/streetview.html');
    await page.waitForSelector('[data-sv-city]', { timeout: 20000 });
    await page.locator('[data-sv-city="San Francisco"]').click();
    await expect(page.locator('[data-sv-status]')).toContainText(/San Francisco|Street View/i);
  });

  test('Facebook Platform add app', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/platform.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-fb-apps');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-fb-app-add]', { timeout: 20000 });
    await page.locator('[data-fb-app-add] button[type="submit"]').click();
    await expect(page.locator('[data-fb-apps]')).toContainText(/iLike|SuperPoke|Causes|Poker|Quizzes/i, {
      timeout: 8000,
    });
  });

  test('YouTube Google-owned all year', async ({ page }) => {
    await page.goto('/years/2007/sites/youtube/about.html');
    await expect(page.locator('body')).toContainText(/Google|all year|Nov 13/i);
  });
});
