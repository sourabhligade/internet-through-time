// @ts-check
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear } = require('./helpers');

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
    await page.waitForTimeout(700);
    let src = await page.locator('#content').getAttribute('src');
    expect(src || '').toMatch(/home/i);
    await page.locator('#btn-reload').click();
    await page.waitForTimeout(400);
    await page.locator('#btn-stop').click();
    // still has content frame
    await expect(page.locator('#content')).toBeVisible();
  });

  test('toolbar Search focuses location; Favorites opens dialog', async ({ page }) => {
    await page.locator('#btn-search').click();
    await expect(page.locator('#location')).toBeFocused();
    await page.locator('#btn-favorites').click();
    await page.waitForTimeout(200);
    const open = await page.evaluate(() => {
      const d = document.getElementById('dlg-bookmarks');
      return d && !d.classList.contains('hidden');
    });
    expect(open).toBeTruthy();
  });

  test('toolbar Mail + History + Go location', async ({ page }) => {
    await page.locator('#btn-mail').click();
    await page.waitForTimeout(200);
    // mail dialog or alert
    await page.evaluate(() => {
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.locator('#btn-history').click();
    await page.waitForTimeout(300);
    await page.fill('#location', 'http://www.google.com/');
    await page.locator('#btn-go').click();
    await page.waitForTimeout(800);
    const src = await page.locator('#content').getAttribute('src');
    expect(src || '').toMatch(/google/i);
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
      await page.waitForTimeout(900);
      const src = (await page.locator('#content').getAttribute('src')) || '';
      const needle = (go || '').split('/').filter(Boolean).pop() || '';
      const brand = (go || '').includes('sites/') ? (go || '').split('/')[1] : needle;
      if (!src.includes(brand) && !src.includes(needle.replace('.html', ''))) {
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
    await page.waitForTimeout(700);
    expect(await page.locator('#content').getAttribute('src')).toMatch(/home/i);
  });

  test('content: wiki edit + google search + broadband speed', async ({ page }) => {
    test.setTimeout(90_000);
    const frame = page.frameLocator('#content');
    const clearChrome = async () => {
      await page.evaluate(() => {
        document.getElementById('modal-backdrop')?.classList.add('hidden');
        document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      });
    };

    await clearChrome();
    await page.locator('.dir-btn', { hasText: 'Wikipedia' }).click({ force: true });
    await page.waitForFunction(() => {
      try {
        const s = document.getElementById('content')?.getAttribute('src') || '';
        return /wiki/i.test(s);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });
    await frame.locator('a[href="edit.html"]').first().click({ force: true });
    await expect(frame.locator('body')).toContainText(/edit|wiki|preview/i, { timeout: 15000 });

    await clearChrome();
    await page.locator('.dir-btn', { hasText: 'Google' }).click({ force: true });
    await page.waitForFunction(() => {
      try {
        const s = document.getElementById('content')?.getAttribute('src') || '';
        return /google/i.test(s);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });
    await frame.locator('input[name="q"]').fill('wikipedia');
    await frame.locator('input[type="submit"]').first().click();
    await expect
      .poll(async () => (await page.locator('#content').getAttribute('src')) || '', { timeout: 15000 })
      .toMatch(/search|google/i);

    await clearChrome();
    await page.locator('.dir-btn', { hasText: 'Broadband' }).click({ force: true });
    await page.waitForFunction(() => {
      try {
        const s = document.getElementById('content')?.getAttribute('src') || '';
        return /broadband|isp/i.test(s);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });
    await frame.locator('#speed-check').click({ force: true });
    await expect(frame.locator('#speed-out')).toContainText(/kbps|museum/i, { timeout: 10000 });
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
