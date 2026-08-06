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

test.describe('2003 live flows — real links & buttons', () => {
  test('every HTML page HTTP 200 + no href="#"', async ({ request }) => {
    const pages = listHtml('2003');
    /** @type {string[]} */
    const fails = [];
    for (const rel of pages) {
      const res = await request.get(`/years/2003/${rel}`);
      if (res.status() !== 200) fails.push(`${rel} ${res.status()}`);
      else {
        const body = await res.text();
        if (body.length < 80) fails.push(`${rel} empty`);
        if (/href=["']#["']/.test(body)) fails.push(`${rel} href=#`);
      }
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });

  test('home: every relative link HTTP 200', async ({ page, request }) => {
    await page.goto('/years/2003/pages/home.html');
    const hrefs = await page.$$eval('a[href]', (as) =>
      as.map((a) => a.getAttribute('href') || '').filter((h) => h && !h.startsWith('http') && !h.startsWith('mailto:') && !h.startsWith('#'))
    );
    /** @type {string[]} */
    const fails = [];
    for (const h of [...new Set(hrefs)]) {
      const abs = new URL(h, 'http://127.0.0.1/years/2003/pages/home.html').pathname;
      const res = await request.get(abs);
      if (res.status() !== 200) fails.push(`${h} -> ${abs} ${res.status()}`);
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });

  test('MySpace profile + comment + invite', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/profile.html');
    await page.fill('[name="display"]', 'LiveUser');
    await page.fill('[name="headline"]', 'Working');
    await page.click('[data-myspace-profile-form] input[type="submit"]');
    await expect(page.locator('[data-myspace-status]')).toContainText(/saved/i);
    await page.goto('/years/2003/sites/myspace/index.html');
    await page.waitForTimeout(400);
    await expect(page.locator('[data-myspace-display]')).toContainText(/LiveUser/);
    await page.fill('[name="text"]', 'real comment');
    await page.click('[data-myspace-comment-form] input[type="submit"]');
    await expect(page.locator('[data-myspace-comments]')).toContainText(/real comment/);
    await page.goto('/years/2003/sites/myspace/invite.html');
    await page.fill('[name="email"]', 'pal@example.com');
    await page.click('[data-myspace-invite-form] input[type="submit"]');
    await expect(page.locator('[data-myspace-invites]')).toContainText(/pal@example.com/);
  });

  test('iTunes buy + library persist', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await page.locator('[data-itunes-buy] button[type="submit"]').first().click();
    await expect(page.locator('[data-itunes-status]')).toContainText(/Purchased|99/i);
    await page.goto('/years/2003/sites/itunes/library.html');
    await page.waitForTimeout(300);
    const lib = await page.locator('[data-itunes-library]').innerText();
    expect(lib.length).toBeGreaterThan(5);
  });

  test('WordPress install + publish + blog', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/install.html');
    await page.locator('[data-wp-next]').first().click();
    await page.locator('[data-wp-step="2"] [data-wp-next]').click();
    await expect(page.locator('[data-wp-step="3"]')).toBeVisible();
    await page.goto('/years/2003/sites/wordpress/dashboard.html');
    await page.fill('[name="title"]', 'Live post');
    await page.click('[data-wp-publish] button[type="submit"]');
    await expect(page.locator('[data-wp-status]')).toContainText(/Published/i);
    await page.goto('/years/2003/sites/wordpress/blog.html');
    await expect(page.locator('[data-wp-posts]')).toContainText(/Live post/);
  });

  test('LinkedIn + AdSense + Bloglines live', async ({ page }) => {
    await page.goto('/years/2003/sites/linkedin/index.html');
    await page.locator('[data-li-connect]').first().click();
    await expect(page.locator('[data-li-connect]').first()).toContainText(/Connected/i);
    await page.goto('/years/2003/sites/adsense/index.html');
    await page.click('[data-adsense-signup] button[type="submit"]');
    await expect(page.locator('[data-adsense-code]')).not.toHaveText(/code appears after/i);
    await page.goto('/years/2003/sites/bloglines/reader.html');
    await page.fill('[name="title"]', 'FeedX');
    await page.click('[data-bloglines-add] button[type="submit"]');
    await expect(page.locator('[data-bloglines-feeds]')).toContainText(/FeedX/);
  });

  test('Friendster save + Firebird download theater', async ({ page }) => {
    await page.goto('/years/2003/sites/friendster/profile.html');
    await page.waitForTimeout(400);
    await page.fill('[name="name"]', 'Graph User');
    await page.click('[data-friendster-profile-form] button[type="submit"], [data-friendster-profile-form] input[type="submit"]');
    await expect(page.locator('[data-friendster-status]')).toContainText(/saved/i);
    await page.goto('/years/2003/sites/phoenix/index.html');
    await page.waitForTimeout(400);
    await page.click('[data-itt-download]');
    await expect(page.locator('.itt-live-host, [data-itt-live-status]').first()).toBeVisible({ timeout: 8000 });
  });

  test('dirbar signature targets', async ({ page }) => {
    await enterYear(page, '2003');
    const targets = await page.$$eval('#dirbar .dir-btn[data-go]', (bs) => bs.map((b) => b.getAttribute('data-go')));
    expect(targets.length).toBeGreaterThan(5);
    for (const go of targets.slice(0, 8)) {
      await page.locator(`#dirbar .dir-btn[data-go="${go}"]`).click({ force: true });
      await page.waitForTimeout(400);
      const src = await page.locator('#content').getAttribute('src');
      const leaf = (go || '').split('/').pop() || '';
      expect(src, go).toMatch(new RegExp(leaf.replace('.', '\\.') + '|' + (go || '').split('/')[1] || 'home', 'i'));
    }
  });

  test('Start menu Settings/Run live', async ({ page }) => {
    await enterYear(page, '2003');
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
    await page.click('#btn-start', { force: true });
    await page.click('[data-start-cmd="settings"]', { force: true });
    await expect(page.locator('#dlg-prefs')).not.toHaveClass(/hidden/);
    await page.evaluate(() => {
      document.getElementById('dlg-prefs')?.classList.add('hidden');
      document.getElementById('modal-backdrop')?.classList.add('hidden');
    });
    await page.click('#btn-start', { force: true });
    await page.click('[data-start-cmd="run"]', { force: true });
    await expect(page.locator('#dlg-open-location')).not.toHaveClass(/hidden/);
  });
});
