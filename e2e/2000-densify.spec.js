// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2000 museum densify — multipage & culture', () => {
  test('Amazon about-smile multipage', async ({ page }) => {
    await page.goto('/years/2000/sites/amazon/about-smile.html');
    await expect(page.locator('body')).toContainText(/smile|Turner Duckworth|tab insanity/i);
    await expect(page.locator('a[href="index.html"]').first()).toBeVisible();
  });

  test('Napster legal timeline', async ({ page }) => {
    await page.goto('/years/2000/sites/napster/legal.html');
    await expect(page.locator('body')).toContainText(/July 26|RIAA|injunction/i);
  });

  test('Pets shop + shutdown arc', async ({ page }) => {
    await page.goto('/years/2000/sites/pets/shop.html');
    await expect(page.locator('body')).toContainText(/Can't Drive|Shop/i);
    await page.goto('/years/2000/sites/pets/shutdown.html');
    await expect(page.locator('body')).toContainText(/November 2000|shutdown|closed/i);
  });

  test('MetaFilter multipage', async ({ page }) => {
    await page.goto('/years/2000/sites/metafilter/index.html');
    await expect(page.locator('body')).toContainText(/community weblog|MetaFilter/i);
    await page.click('a[href="posts.html"]');
    await expect(page).toHaveURL(/posts\.html/);
    await expect(page.locator('body')).toContainText(/NASDAQ|Napster|Flash/i);
  });

  test('Gnutella + Flash skip intro', async ({ page }) => {
    await page.goto('/years/2000/sites/gnutella/index.html');
    await expect(page.locator('body')).toContainText(/March 14|decentralized/i);
    await page.goto('/years/2000/sites/macromedia/index.html');
    await page.click('#skip-intro-btn');
    await expect(page.locator('#site-main')).toBeVisible();
  });

  test('Startup Failures catalog + CNN 2000 date', async ({ page }) => {
    await page.goto('/years/2000/sites/startupfailures/catalog.html');
    await expect(page.locator('body')).toContainText(/Pets\.com|catalog/i);
    await page.goto('/years/2000/sites/cnn/index.html');
    await expect(page.locator('body')).toContainText(/Updated 2000|March 10|NASDAQ/i);
  });

  test('shell tour dirbar Pets after densify', async ({ page }) => {
    await enterYear(page, '2000');
    await page.locator('.dir-btn', { hasText: /Pets/i }).click();
    await page.waitForTimeout(900);
    const path = await page.evaluate(() => {
      try {
        return document.getElementById('content').contentWindow.location.pathname;
      } catch (e) {
        return '';
      }
    });
    expect(path).toMatch(/pets/);
  });
});
