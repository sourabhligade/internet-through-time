// @ts-check
/**
 * 2006 museum densify gates — continuity year-truth + optional rooms.
 */
const { test, expect } = require('@playwright/test');

test.describe('2006 densify — continuity honesty', () => {
  test('MySpace: mass king · News Corp is 2005 history · FB competition', async ({ page }) => {
    await page.goto('/years/2006/sites/myspace/index.html');
    await expect(page.locator('body')).toContainText(/mass social|News Corp|2005/i);
    await expect(page.locator('body')).toContainText(/Facebook|Sep 26|News Feed/i);
    // acquisition date must not claim July 2006
    const body = await page.locator('body').innerText();
    expect(body).not.toMatch(/July 18,\s*2006.*\$580|Jul 18,\s*2006.*\$580/i);
  });

  test('Flickr: Yahoo ownership is 2005 · continuity in 2006', async ({ page }) => {
    await page.goto('/years/2006/sites/flickr/about.html');
    await expect(page.locator('body')).toContainText(/2005|Yahoo/i);
    await expect(page.locator('body')).toContainText(/2006/i);
  });

  test('Maps: Street View ban · not 2006 launch year', async ({ page }) => {
    await page.goto('/years/2006/sites/maps/about.html');
    await expect(page.locator('body')).toContainText(/Street View/i);
    await expect(page.locator('body')).toContainText(/2007|not 2006|Continuity/i);
  });

  test('Reddit: under Digg · launched 2005', async ({ page }) => {
    await page.goto('/years/2006/sites/reddit/about.html');
    await expect(page.locator('body')).toContainText(/2005/i);
    await expect(page.locator('body')).toContainText(/Digg/i);
  });

  test('Gmail: invite culture · open is Feb 2007', async ({ page }) => {
    await page.goto('/years/2006/sites/gmail/about.html');
    await expect(page.locator('body')).toContainText(/2007|invite/i);
    await expect(page.locator('body')).toContainText(/not|ban|default|year-start|Invite/i);
  });

  test('TechCrunch covers 2006 P0 thesis', async ({ page }) => {
    await page.goto('/years/2006/sites/techcrunch/index.html');
    await expect(page.locator('body')).toContainText(/Twitter|Facebook|YouTube|1\.65|Digg/i);
  });
});

test.describe('2006 densify — optional rooms', () => {
  test('Google Reader subscribe → itt06-reader-subs', async ({ page }) => {
    await page.goto('/years/2006/sites/reader/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt06-reader-subs');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-reader-add]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/Sep 2006|unread|Reader/i);
    await page.fill('[name="feed"]', 'Museum Feed');
    await page.locator('[data-reader-add] button[type="submit"]').click();
    await expect(page.locator('[data-reader-subs]')).toContainText(/Museum Feed/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt06-reader-subs'));
    expect(raw || '').toContain('Museum Feed');
  });

  test('IE7 product room · shell stays XP+IE6 default', async ({ page }) => {
    await page.goto('/years/2006/sites/microsoft/ie7.html');
    await expect(page.locator('body')).toContainText(/October 18, 2006|Oct 18/i);
    await expect(page.locator('body')).toContainText(/IE 6|default|XP/i);
    await expect(page.locator('body')).toContainText(/Vista|2007/i);
  });

  test('Time You culture room', async ({ page }) => {
    await page.goto('/years/2006/sites/time-you/index.html');
    await expect(page.locator('body')).toContainText(/Person of the Year|You/i);
    await expect(page.locator('body')).toContainText(/YouTube|Digg|MySpace/i);
  });
});
