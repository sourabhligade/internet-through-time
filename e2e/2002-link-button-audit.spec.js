// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2002 full button/link re-verify', () => {
  test('shell Start menu commands open live dialogs', async ({ page }) => {
    await enterYear(page, '2002');
    const checks = [
      ['settings', '#dlg-prefs'],
      ['find', '#dlg-find'],
      ['run', '#dlg-open-location'],
      ['help', '#dlg-about'],
    ];
    for (const [cmd, dlg] of checks) {
      await page.click('#btn-start');
      await page.click(`[data-start-cmd="${cmd}"]`);
      await expect(page.locator(dlg)).not.toHaveClass(/hidden/);
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.classList.add('hidden');
        const bd = document.getElementById('modal-backdrop');
        if (bd) bd.classList.add('hidden');
      }, dlg);
    }
    await page.click('#btn-start');
    await page.click('[data-start-cmd="programs"]');
    await page.waitForTimeout(200);
    expect(await page.locator('#content').getAttribute('src')).toMatch(/home/);
  });

  test('shell dirbar each target loads', async ({ page }) => {
    await enterYear(page, '2002');
    const targets = [
      ['pages/home.html', /home\.html/],
      ['sites/friendster/index.html', /friendster/],
      ['sites/kazaa/index.html', /kazaa/],
      ['sites/blogger/index.html', /blogger/],
      ['sites/google/index.html', /google/],
      ['sites/wired/index.html', /wired/],
      ['sites/wikipedia/index.html', /wikipedia/],
      ['sites/amazon/index.html', /amazon/],
    ];
    for (const [go, reSrc] of targets) {
      await page.evaluate(() => {
        const bd = document.getElementById('modal-backdrop');
        if (bd) bd.classList.add('hidden');
        document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      });
      await page.locator(`#dirbar .dir-btn[data-go="${go}"]`).click({ force: true });
      await page.waitForTimeout(400);
      const src = await page.locator('#content').getAttribute('src');
      expect(src, go + ' -> ' + src).toMatch(reSrc);
    }
  });

  test('shell Go + Home toolbar', async ({ page }) => {
    await enterYear(page, '2002');
    await page.fill('#location', 'http://www.google.com/');
    await page.click('#btn-go');
    await page.waitForTimeout(400);
    let src = await page.locator('#content').getAttribute('src');
    expect(src).toMatch(/google/i);
    await page.click('#btn-home');
    await page.waitForTimeout(300);
    src = await page.locator('#content').getAttribute('src');
    expect(src).toMatch(/home\.html/);
  });

  test('Friendster profile save + friends add', async ({ page }) => {
    await page.goto('/years/2002/sites/friendster/profile.html');
    await page.waitForTimeout(500);
    await page.fill('[name="name"]', 'Audit User');
    await page.click('[data-friendster-profile-form] button[type="submit"]');
    await expect(page.locator('[data-friendster-status]')).toContainText(/saved/i);
    await page.goto('/years/2002/sites/friendster/friends.html');
    await page.waitForTimeout(400);
    await page.fill('[name="fname"]', 'New Friend');
    await page.click('[data-friendster-add-form] button[type="submit"]');
    await expect(page.locator('[data-friendster-friends]')).toContainText(/New Friend/);
  });

  test('KaZaA download + search', async ({ page }) => {
    await page.goto('/years/2002/sites/kazaa/index.html');
    await page.waitForTimeout(500);
    await page.click('[data-itt-download]');
    await expect(page.locator('.itt-live-host, [data-itt-live-status]').first()).toBeVisible({ timeout: 8000 });
    await page.goto('/years/2002/sites/kazaa/client.html');
    await page.waitForTimeout(500);
    await page.fill('[data-kazaa-q], [name="q"]', 'mp3');
    await page.locator('[data-kazaa-search] button[type="submit"]').click();
    await expect(page.locator('[data-kazaa-results]')).toContainText(/File|simulated|Museum/i, { timeout: 5000 });
  });

  test('TrackBack form live', async ({ page }) => {
    await page.goto('/years/2002/sites/movabletype/trackback.html');
    await page.waitForTimeout(400);
    await page.click('[data-trackback-form] button[type="submit"]');
    await expect(
      page.locator('[data-trackback-status], #tb-out, .itt-live-host, [data-itt-live-status]').first()
    ).toBeVisible({ timeout: 5000 });
  });

  test('Blogger enter navigates to edit', async ({ page }) => {
    await page.goto('/years/2002/sites/blogger/index.html');
    await page.waitForTimeout(400);
    const enter = page.locator('form[data-blogger-title] input[type="submit"], input[type="submit"][value="enter"]');
    await expect(enter.first()).toBeVisible({ timeout: 5000 });
    await enter.first().click();
    await page.waitForTimeout(500);
    // either navigated or blogger.js rewrote location
    const ok = /edit\.html/.test(page.url()) || await page.locator('textarea, [data-blogger-post]').count();
    expect(ok, 'blogger enter should reach edit UI').toBeTruthy();
  });

  test('Google search form', async ({ page }) => {
    await page.goto('/years/2002/sites/google/index.html');
    await page.waitForTimeout(500);
    await page.fill('input[name="q"]', 'broadband');
    await page.locator('form').filter({ has: page.locator('input[name="q"]') }).locator('input[type="submit"]').first().click();
    await page.waitForTimeout(500);
    expect(page.url()).toMatch(/search/);
  });

  test('Amazon add to cart + checkout link', async ({ page }) => {
    await page.goto('/years/2002/sites/amazon/book-contact.html');
    await page.waitForTimeout(600);
    await page.click('[data-add-cart]');
    await page.waitForTimeout(300);
    await page.goto('/years/2002/sites/amazon/cart.html');
    await page.waitForTimeout(600);
    await expect(page.locator('[data-cart-list]').first()).toContainText(/Contact|Remove|\$/i);
    await page.locator('a[href="checkout.html"]').first().click();
    await expect(page).toHaveURL(/checkout\.html/);
  });

  test('eBay place bid updates high bid', async ({ page }) => {
    await page.goto('/years/2002/sites/ebay/item-laptop.html');
    await page.waitForTimeout(800);
    await page.fill('[name="bid"]', '999');
    const bidder = page.locator('[name="bidder"]');
    if (await bidder.count()) await bidder.fill('auditor');
    await page.click('form[data-bid-form] input[type="submit"]');
    await page.waitForTimeout(500);
    const after = await page.locator('[data-high-bid]').innerText();
    expect(after.replace(/[^0-9.]/g, '')).toMatch(/999|9/);
  });

  test('Wikipedia edit page has live controls', async ({ page }) => {
    await page.goto('/years/2002/sites/wikipedia/edit.html');
    await page.waitForTimeout(500);
    await expect(page.locator('textarea').first()).toBeVisible();
    const prev = page.locator('[data-wiki-preview]');
    if (await prev.count()) {
      await page.locator('textarea').first().fill("'''Hello''' wiki");
      await prev.click();
      await expect(page.locator('[data-wiki-preview-out]').first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('News tabs MTV Phoenix Daypop Technorati', async ({ page }) => {
    await page.goto('/years/2002/sites/googlenews/index.html');
    await page.click('[data-gn-tab="world"]');
    await expect(page.locator('[data-gn-panel="world"]')).toHaveClass(/active/);

    await page.goto('/years/2002/sites/mtv/index.html');
    await page.click('a[href="videos.html"]');
    await expect(page).toHaveURL(/videos\.html/);

    await page.goto('/years/2002/sites/phoenix/index.html');
    await page.waitForTimeout(500);
    await page.click('[data-itt-download]');
    await expect(page.locator('.itt-live-host').first()).toBeVisible({ timeout: 8000 });

    await page.goto('/years/2002/sites/daypop/index.html');
    await page.click('a[href*="search.html"]');
    await expect(page).toHaveURL(/search/);

    await page.goto('/years/2002/sites/technorati/index.html');
    await page.click('[data-technorati-cosmos] button[type="submit"]');
    await expect(page.locator('[data-technorati-results]')).toBeVisible();
    await expect(page.locator('[data-technorati-status]')).toContainText(/blog/i);
  });

  test('home page internal links HTTP 200', async ({ page }) => {
    await page.goto('/years/2002/pages/home.html');
    const hrefs = await page.locator('a[href]').evaluateAll((as) =>
      as
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && !h.startsWith('http') && !h.startsWith('mailto') && !h.startsWith('javascript'))
    );
    const broken = [];
    for (const h of hrefs) {
      const url = new URL(h, 'http://127.0.0.1:8080/years/2002/pages/home.html').pathname;
      const res = await page.request.get(url);
      if (res.status() >= 400) broken.push({ h, status: res.status() });
    }
    expect(broken, JSON.stringify(broken)).toEqual([]);
  });

  test('about page internal links HTTP 200', async ({ page }) => {
    await page.goto('/years/2002/pages/about.html');
    const hrefs = await page.locator('a[href]').evaluateAll((as) =>
      as
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && !h.startsWith('http') && !h.startsWith('mailto') && !h.startsWith('javascript'))
    );
    const broken = [];
    for (const h of hrefs) {
      const url = new URL(h, 'http://127.0.0.1:8080/years/2002/pages/about.html').pathname;
      const res = await page.request.get(url);
      if (res.status() >= 400) broken.push({ h, status: res.status() });
    }
    expect(broken, JSON.stringify(broken)).toEqual([]);
  });
});
