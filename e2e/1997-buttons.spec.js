// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('1997 chrome buttons live', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
  });

  test('dirbar Yahoo eBay Slashdot PointCast', async ({ page }) => {
    for (const [label, re] of [
      ['Yahoo!', /yahoo/i],
      ['eBay', /ebay/i],
      ['Slashdot', /slashdot/i],
      ['Channels', /pointcast|channel/i],
    ]) {
      await page.evaluate(() => {
        document.getElementById('modal-backdrop')?.classList.add('hidden');
        document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      });
      await page.locator('#dirbar .dir-btn', { hasText: label }).click({ force: true });
      await page.waitForTimeout(900);
      const src = (await page.locator('#content').getAttribute('src')) || '';
      expect(src, label).toMatch(re);
    }
  });

  test('Start menu Settings and Run', async ({ page }) => {
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="settings"]').click();
    await expect(page.locator('#dlg-prefs')).not.toHaveClass(/hidden/);
    await page.evaluate(() => {
      document.getElementById('dlg-prefs')?.classList.add('hidden');
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="run"]').click();
    await expect(page.locator('#dlg-open-location')).not.toHaveClass(/hidden/);
  });

  test('toolbar chrome GIFs HTTP 200', async ({ page, request }) => {
    const imgs = await page.locator('#toolbar img[src*="chrome/"]').evaluateAll((els) =>
      els.map((e) => e.getAttribute('src')).filter(Boolean)
    );
    expect(imgs.length).toBeGreaterThanOrEqual(5);
    for (const src of imgs) {
      const url = src.startsWith('http') ? src : new URL(src, page.url()).href;
      expect((await request.get(url)).status(), src).toBe(200);
    }
  });

  test('Yahoo logo 1997 asset + densify pages', async ({ page }) => {
    await page.goto('/years/1997/sites/yahoo/index.html');
    await expect(page.locator('img[src*="1997/yahoo/logo"]').first()).toBeVisible();
    await expect(page.locator('img[src*="banner-cat-199706"]').first()).toBeVisible();
    await page.goto('/years/1997/sites/yahoo/whats-new.html');
    await expect(page.locator('body')).toContainText(/What's New|1997/i);
    await page.goto('/years/1997/sites/amazon/ipo.html');
    await expect(page.locator('body')).toContainText(/IPO|May 15/i);
  });
});
