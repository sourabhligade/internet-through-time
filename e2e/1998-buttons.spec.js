// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('1998 chrome buttons + info', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '1998');
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
  });

  test('full toolbar Search Favorites Mail Go', async ({ page }) => {
    await page.locator('#btn-search').click();
    await expect(page.locator('#location')).toBeFocused();
    await page.locator('#btn-favorites').click();
    await page.waitForTimeout(200);
    const favOpen = await page.evaluate(() => {
      const d = document.getElementById('dlg-bookmarks');
      return d && !d.classList.contains('hidden');
    });
    expect(favOpen).toBeTruthy();
    await page.evaluate(() => {
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.locator('#btn-mail').click();
    await page.waitForTimeout(200);
    await page.evaluate(() => {
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.fill('#location', 'http://www.google.com/');
    await page.locator('#btn-go').click();
    await page.waitForTimeout(900);
    expect(await page.locator('#content').getAttribute('src')).toMatch(/google/i);
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
      await page.waitForTimeout(850);
      const src = (await page.locator('#content').getAttribute('src')) || '';
      const brand = (go || '').includes('sites/')
        ? (go || '').split('/')[1]
        : ((go || '').split('/').pop() || '').replace('.html', '');
      if (!src.includes(brand) && !(go && src.includes(go.split('/').pop().replace('.html', '')))) {
        fails.push(`${label}: go=${go} src=${src}`);
      }
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });

  test('toolbar chrome GIFs 200', async ({ page, request }) => {
    const imgs = await page.locator('#toolbar img[src*="chrome/"]').evaluateAll((els) =>
      els.map((e) => e.getAttribute('src')).filter(Boolean)
    );
    expect(imgs.length).toBeGreaterThanOrEqual(8);
    for (const src of imgs) {
      const url = src.startsWith('http') ? src : new URL(src, page.url()).href;
      expect((await request.get(url)).status(), src).toBe(200);
    }
  });

  test('About / Whats New / Cool info dense', async ({ page }) => {
    await page.goto('/years/1998/pages/about.html');
    await expect(page.locator('body')).toContainText(/Thesis|Bans|localStorage|Google/i);
    await page.goto('/years/1998/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/Google|Amazon Music|eBay|Windows 98/i);
    await page.goto('/years/1998/pages/cool.html');
    await expect(page.locator('body')).toContainText(/Excite|GeoCities|Slashdot/i);
  });

  test('Google no smile + densify about', async ({ page }) => {
    await page.goto('/years/1998/sites/google/index.html');
    await expect(page.locator('body')).not.toContainText(/smile logo/i);
    await page.goto('/years/1998/sites/google/about.html');
    await expect(page.locator('body')).toContainText(/1998|BETA|newcomer/i);
  });

  test('GameSpot downloads theater button', async ({ page }) => {
    await page.goto('/years/1998/sites/gamespot/downloads.html');
    await expect(page.locator('[data-itt-download]').first()).toBeVisible();
  });
});
