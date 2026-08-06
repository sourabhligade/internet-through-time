// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('1999 chrome buttons + densify', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '1999');
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
  });

  test('Start menu Settings + Run', async ({ page }) => {
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

  test('dirbar Napster Google Blogger', async ({ page }) => {
    for (const [label, re] of [
      ['Napster', /napster/i],
      ['Google', /google/i],
      ['Blogger', /blogger/i],
    ]) {
      await page.evaluate(() => {
        document.getElementById('modal-backdrop')?.classList.add('hidden');
        document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      });
      await page.locator('#dirbar .dir-btn', { hasText: label }).click({ force: true });
      await page.waitForTimeout(900);
      expect(await page.locator('#content').getAttribute('src')).toMatch(re);
    }
  });

  test('toolbar Search Favorites Go', async ({ page }) => {
    await page.locator('#btn-search').click();
    await expect(page.locator('#location')).toBeFocused();
    await page.locator('#btn-favorites').click();
    await page.waitForTimeout(200);
    const open = await page.evaluate(() => {
      const d = document.getElementById('dlg-bookmarks');
      return d && !d.classList.contains('hidden');
    });
    expect(open).toBeTruthy();
    await page.evaluate(() => {
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.fill('#location', 'http://www.napster.com/');
    await page.locator('#btn-go').click();
    await page.waitForTimeout(900);
    expect(await page.locator('#content').getAttribute('src')).toMatch(/napster/i);
  });

  test('chrome GIFs 200', async ({ page, request }) => {
    const imgs = await page.locator('#toolbar img[src*="chrome/"]').evaluateAll((els) =>
      els.map((e) => e.getAttribute('src')).filter(Boolean)
    );
    expect(imgs.length).toBeGreaterThanOrEqual(8);
    for (const src of imgs) {
      const url = src.startsWith('http') ? src : new URL(src, page.url()).href;
      expect((await request.get(url)).status(), src).toBe(200);
    }
  });

  test('Napster legal + client + search hook', async ({ page }) => {
    await page.goto('/years/1999/sites/napster/legal.html');
    await expect(page.locator('body')).toContainText(/RIAA|Dec 6|copyright/i);
    await page.goto('/years/1999/sites/napster/client.html');
    await expect(page.locator('body')).toContainText(/client|theater|library/i);
    await page.goto('/years/1999/sites/napster/search.html');
    await expect(page.locator('[data-napster-search]')).toBeVisible();
  });

  test('About densify + CNN 1999', async ({ page }) => {
    await page.goto('/years/1999/pages/about.html');
    await expect(page.locator('body')).toContainText(/Napster|Blogger|Bans|localStorage/i);
    await page.goto('/years/1999/sites/cnn/index.html');
    await expect(page.locator('body')).toContainText(/1999|Findings of Fact|Napster/i);
  });

  test('no Amazon smile asset', async ({ page }) => {
    await page.goto('/years/1999/sites/amazon/index.html');
    const html = await page.content();
    expect(html).not.toMatch(/logo-smile|smile\.gif/i);
    await expect(page.locator('img[src*="smile"]')).toHaveCount(0);
  });
});
