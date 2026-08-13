// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, waitContentSrc } = require('./helpers');

test.describe('2001 every chrome button live', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2001');
    await page.evaluate(() => {
      const kill = (el) => {
        if (!el) return;
        el.classList.add('hidden');
        el.style.display = 'none';
        el.style.pointerEvents = 'none';
      };
      kill(document.getElementById('modal-backdrop'));
      kill(document.getElementById('connect-overlay'));
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
  });

  test('toolbar Home + Reload + Stop fire', async ({ page }) => {
    await page.locator('#btn-home').click();
    await waitContentSrc(page, /home/i);
    await page.locator('#btn-reload').click();
    await expect(page.locator('#content')).toBeVisible();
    await page.locator('#btn-stop').click();
    // still has content frame
    await expect(page.locator('#content')).toBeVisible();
  });

  test('toolbar Search focuses location; Favorites opens dialog', async ({ page }) => {
    await page.locator('#btn-search').click();
    await expect(page.locator('#location')).toBeFocused();
    await page.locator('#btn-favorites').click();
    await expect(page.locator('#dlg-bookmarks:not(.hidden)')).toBeVisible({ timeout: 5000 });
  });

  test('toolbar Mail + History + Go location', async ({ page }) => {
    await page.locator('#btn-mail').click();
    // mail dialog or alert
    await page.evaluate(() => {
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.locator('#btn-history').click();
    await page.fill('#location', 'http://www.google.com/');
    await page.locator('#btn-go').click();
    await waitContentSrc(page, /google/i);
  });

  test('every dirbar button navigates', async ({ page }) => {
    const buttons = page.locator('#dirbar .dir-btn');
    const n = await buttons.count();
    expect(n).toBeGreaterThanOrEqual(8);
    /** @type {string[]} */
    const fails = [];
    for (let i = 0; i < n; i++) {
      const btn = buttons.nth(i);
      const go = await btn.getAttribute('data-go');
      const label = (await btn.innerText()).trim();
      await page.evaluate(() => {
        document.getElementById('modal-backdrop')?.classList.add('hidden');
        document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      });
      await btn.click({ force: true });
      const needle = (go || '').split('/').filter(Boolean).pop() || '';
      const brand = (go || '').includes('sites/') ? (go || '').split('/')[1] : needle;
      const src = (await waitContentSrc(page, new RegExp(brand || needle.replace('.html', '') || 'home', 'i')).catch(
        async () => (await page.locator('#content').getAttribute('src')) || ''
      )) || '';
      if (!String(src).includes(brand) && !String(src).includes(needle.replace('.html', ''))) {
        fails.push(`${label}: go=${go} src=${src}`);
      }
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });

  test('Start menu Settings Find Run Programs live', async ({ page }) => {
    await page.locator('#btn-start').click();
    await expect(page.locator('#start-menu')).not.toHaveClass(/hidden/);
    await page.locator('[data-start-cmd="settings"]').click();
    await expect(page.locator('#dlg-prefs')).not.toHaveClass(/hidden/);
    await page.evaluate(() => {
      document.getElementById('dlg-prefs')?.classList.add('hidden');
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="find"]').click();
    await expect(page.locator('#dlg-find')).not.toHaveClass(/hidden/);
    await page.evaluate(() => {
      document.getElementById('dlg-find')?.classList.add('hidden');
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="run"]').click();
    await expect(page.locator('#dlg-open-location')).not.toHaveClass(/hidden/);
    await page.evaluate(() => {
      document.getElementById('dlg-open-location')?.classList.add('hidden');
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.locator('#btn-start').click();
    await page.locator('[data-start-cmd="programs"]').click();
    await waitContentSrc(page, /home/i);
  });

  test('content: wiki edit + google search + broadband speed', async ({ page }) => {
    await page.locator('.dir-btn', { hasText: 'Wikipedia' }).click();
    await waitContentSrc(page, /wiki/i);
    const frame = page.frameLocator('#content');
    await frame.locator('a[href="edit.html"]').first().click();
    await expect(frame.locator('body')).toContainText(/edit|wiki|preview/i, { timeout: 8000 });
    await page.locator('.dir-btn', { hasText: 'Google' }).click();
    await waitContentSrc(page, /google/i);
    await frame.locator('input[name="q"]').fill('wikipedia');
    await frame.locator('input[type="submit"]').first().click();
    await waitContentSrc(page, /search|google/i);
    await page.locator('.dir-btn', { hasText: 'Broadband' }).click();
    await waitContentSrc(page, /broadband|speed|home/i);
    await frame.locator('#speed-check').click();
    await expect(frame.locator('#speed-out')).toContainText(/kbps|museum/i, { timeout: 3000 });
  });

  test('chrome GIFs load 200 (toolbar icons)', async ({ page, request }) => {
    const imgs = await page.locator('#toolbar img[src*="chrome/"]').evaluateAll((els) =>
      els.map((e) => e.getAttribute('src'))
    );
    expect(imgs.length).toBeGreaterThanOrEqual(9);
    for (const src of imgs) {
      if (!src) continue;
      const url = src.startsWith('http') ? src : new URL(src, page.url()).href;
      const res = await request.get(url);
      expect(res.status(), src).toBe(200);
    }
  });
});
