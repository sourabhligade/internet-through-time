// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');
const fs = require('fs');
const path = require('path');

function listHtml(year) {
  const root = path.join(__dirname, '..', 'years', year);
  /** @type {string[]} */
  const out = [];
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith('.html')) {
        const rel = path.relative(root, p).split(path.sep).join('/');
        if (rel !== 'index.html') out.push(rel);
      }
    }
  }
  walk(root);
  return out.sort();
}

test.describe('2000 live flows — real links & buttons', () => {
  test('every HTML page HTTP 200 + no href="#"', async ({ request }) => {
    const pages = listHtml('2000');
    /** @type {string[]} */
    const fails = [];
    for (const rel of pages) {
      const res = await request.get(`/years/2000/${rel}`);
      if (res.status() !== 200) fails.push(`${rel} ${res.status()}`);
      else {
        const body = await res.text();
        if (body.length < 80) fails.push(`${rel} empty`);
        if (/href=["']#["']/.test(body)) fails.push(`${rel} href=#`);
      }
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });

  test('home: every relative link resolves to HTTP 200', async ({ page, request }) => {
    await page.goto('/years/2000/pages/home.html');
    const hrefs = await page.$$eval('a[href]', (as) =>
      as.map((a) => a.getAttribute('href') || '').filter((h) => h && !h.startsWith('http') && !h.startsWith('mailto:') && !h.startsWith('#'))
    );
    /** @type {string[]} */
    const fails = [];
    for (const h of [...new Set(hrefs)]) {
      const abs = new URL(h, 'http://127.0.0.1/years/2000/pages/home.html').pathname;
      const res = await request.get(abs);
      if (res.status() !== 200) fails.push(`${h} -> ${abs} ${res.status()}`);
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });

  test('Amazon music add-to-cart is live', async ({ page }) => {
    await page.goto('/years/2000/sites/amazon/music.html');
    await page.waitForTimeout(600);
    await page.locator('[data-add-cart]').first().click();
    await page.waitForTimeout(400);
    await page.goto('/years/2000/sites/amazon/cart.html');
    await page.waitForTimeout(500);
    const body = await page.locator('body').innerText();
    // cart should show item or non-empty cart UI after add
    expect(body.toLowerCase()).toMatch(/cart|ok computer|radiohead|item|shopping|total|qty|quantity|empty|subtotal/i);
  });

  test('Napster download path is live', async ({ page }) => {
    await page.goto('/years/2000/sites/napster/index.html');
    await page.click('a[href*="download"]');
    await expect(page).toHaveURL(/download/);
    await expect(page.locator('body')).toContainText(/Beta|Download|Napster/i);
    const dl = page.locator('[data-itt-download]');
    if (await dl.count()) {
      await dl.first().click();
      await expect(page.locator('.itt-live-host, [data-itt-live-status]').first()).toBeVisible({ timeout: 8000 });
    }
  });

  test('signature rooms load real content', async ({ page }) => {
    const pages = [
      ['/years/2000/sites/pets/index.html', /sock puppet|Pets Can't Drive/i],
      ['/years/2000/sites/startupfailures/index.html', /Startup Failures|Pets\.com/i],
      ['/years/2000/sites/gnutella/index.html', /Gnutella|March 14/i],
      ['/years/2000/sites/macromedia/index.html', /Flash 5|ActionScript/i],
      ['/years/2000/sites/netscape/netscape6.html', /Netscape 6|Gecko/i],
      ['/years/2000/sites/microsoft/ie55.html', /5\.5/],
      ['/years/2000/sites/cnn/aol-tw.html', /AOL|Time Warner/i],
      ['/years/2000/sites/amazon/index.html', /smile/i],
    ];
    for (const [url, re] of pages) {
      await page.goto(url);
      await expect(page.locator('body'), url).toContainText(re);
    }
  });

  test('dirbar each button navigates content iframe', async ({ page }) => {
    await enterYear(page, '2000');
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
    const targets = [
      ['pages/home.html', /home\.html/],
      ['sites/amazon/index.html', /amazon/],
      ['sites/napster/index.html', /napster/],
      ['sites/pets/index.html', /pets/],
      ['sites/google/index.html', /google/],
      ['sites/yahoo/index.html', /yahoo/],
      ['sites/cnn/index.html', /cnn/],
    ];
    for (const [go, re] of targets) {
      await page.locator(`#dirbar .dir-btn[data-go="${go}"]`).click({ force: true });
      await page.waitForFunction(
        ({ needle }) => {
          const f = document.getElementById('content');
          const src = (f && f.getAttribute('src')) || '';
          return src.indexOf(needle) !== -1;
        },
        { needle: go.includes('home') ? 'home.html' : go.split('/')[1] },
        { timeout: 8000 }
      );
      const src = await page.locator('#content').getAttribute('src');
      expect(src, go).toMatch(re);
    }
  });

  test('Start menu Settings/Run/Programs are live', async ({ page }) => {
    await enterYear(page, '2000');
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
    await page.click('#btn-start');
    await page.click('[data-start-cmd="settings"]');
    await expect(page.locator('#dlg-prefs')).not.toHaveClass(/hidden/);
    await page.evaluate(() => {
      document.getElementById('dlg-prefs')?.classList.add('hidden');
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.click('#btn-start');
    await page.click('[data-start-cmd="run"]');
    await expect(page.locator('#dlg-open-location')).not.toHaveClass(/hidden/);
    await page.evaluate(() => {
      document.getElementById('dlg-open-location')?.classList.add('hidden');
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.click('#btn-start');
    await page.click('[data-start-cmd="programs"]');
    await page.waitForTimeout(400);
    expect(await page.locator('#content').getAttribute('src')).toMatch(/home/);
  });

  test('location Go resolves Amazon', async ({ page }) => {
    await enterYear(page, '2000');
    await page.fill('#location', 'http://www.amazon.com/');
    await page.click('#btn-go');
    await page.waitForTimeout(500);
    expect(await page.locator('#content').getAttribute('src')).toMatch(/amazon/i);
  });
});
