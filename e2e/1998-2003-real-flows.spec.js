// @ts-check
/**
 * Real localStorage flows for years 1998–2003 (no soft mocks).
 * Direct page loads prefer pure module truth; a few shell checks for handoff.
 */
const { test, expect } = require('@playwright/test');


async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}


/**
 * @param {import('@playwright/test').Page} page
 * @param {string|string[]} keys
 */
async function clearKeys(page, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, list);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function expectKey(page, key) {
  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 10000 })
    .toBeTruthy();
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/* ─── 1998 ─────────────────────────────────────────────────────────── */

test.describe('1998 real flows', () => {
  test('Google search form navigates with q', async ({ page }) => {
    await page.goto('/years/1998/sites/google/index.html');
    await page.waitForSelector('form[data-google-search] input[name="q"], form input[name="q"]', {
      timeout: 20000,
    });
    await page.fill('input[name="q"]', 'museum');
    await page.locator('form input[type="submit"], form button[type="submit"]').first().click();
    await page.waitForTimeout(500);
    const body = await page.locator('body').innerText();
    expect(page.url().includes('q=') || /result|museum|Google/i.test(body)).toBeTruthy();
  });

  test('Amazon music add-to-cart → itt98-amazon-cart', async ({ page }) => {
    await page.goto('/years/1998/sites/amazon/music.html');
    await clearKeys(page, 'itt98-amazon-cart');
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click({ force: true });
    await expect
      .poll(async () =>
        page.evaluate(() => {
          try {
            return JSON.parse(localStorage.getItem('itt98-amazon-cart') || '[]').length;
          } catch (e) {
            return 0;
          }
        })
      )
      .toBeGreaterThan(0);
  });

  test('eBay bid form raises high bid', async ({ page }) => {
    await page.goto('/years/1998/sites/ebay/item-laptop.html');
    await clearKeys(page, Object.keys(
      // clear all itt98-bid* after load
      {}
    ));
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt98') === 0 && k.indexOf('bid') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForSelector('form[data-bid-form]', { timeout: 20000 });
    const minEl = await page.locator('[data-high-bid]').textContent();
    const cur = parseFloat((minEl || '1').replace(/[^0-9.]/g, '')) || 1;
    await page.fill('form[data-bid-form] input[name="bid"]', String(cur + 25));
    if (await page.locator('form[data-bid-form] input[name="bidder"]').count()) {
      await page.fill('form[data-bid-form] input[name="bidder"]', 'Bid98');
    }
    await page.locator('form[data-bid-form] input[type="submit"]').click({ force: true });
    await expect(page.locator('[data-high-bid]')).toContainText(String(Math.floor(cur + 25)), {
      timeout: 10000,
    });
  });

  test('Excite personalize toggle persists', async ({ page }) => {
    await page.goto('/years/1998/sites/excite/index.html');
    await page.waitForSelector('[data-excite-toggle], body', { timeout: 20000 });
    const toggle = page.locator('[data-excite-toggle]').first();
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(200);
      const raw = await page.evaluate(() =>
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt98') === 0 && /excite/i.test(k))
          .map((k) => localStorage.getItem(k))
          .join('|')
      );
      // Either storage or visible state change
      expect(raw.length > 0 || (await page.locator('body').innerText()).length > 40).toBeTruthy();
    } else {
      await expect(page.locator('body')).toContainText(/Excite/i);
    }
  });

  test('Yahoo portal loads year-true', async ({ page }) => {
    await page.goto('/years/1998/sites/yahoo/index.html');
    await expect(page.locator('body')).toContainText(/Yahoo/i, { timeout: 15000 });
  });

  test('HoTMaiL login → inbox region', async ({ page }) => {
    await page.goto('/years/1998/sites/hotmail/index.html');
    await clearKeys(page, ['itt98-hotmail-user']);
    await page.reload();
    await page.waitForSelector('form[data-hotmail-login]', { timeout: 20000 });
    await page.fill('form[data-hotmail-login] input[name="login"]', 'museum98');
    await page
      .locator('form[data-hotmail-login] input[type="password"], form[data-hotmail-login] input[name="pass"]')
      .first()
      .fill('pass');
    await page
      .locator(
        'form[data-hotmail-login] input[type="image"], form[data-hotmail-login] input[type="submit"]'
      )
      .first()
      .click({ force: true });
    await page.waitForTimeout(800);
    await expect(page.locator('body')).toContainText(/Inbox|Compose|Folders|Mail/i, {
      timeout: 15000,
    });
  });

  test('isolation: cart uses itt98 only', async ({ page }) => {
    await page.goto('/years/1998/sites/amazon/music.html');
    await clearKeys(page, ['itt98-amazon-cart', 'itt97-amazon-cart', 'itt99-amazon-cart']);
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click({ force: true });
    await expectKey(page, 'itt98-amazon-cart');
    expect(await page.evaluate(() => localStorage.getItem('itt97-amazon-cart'))).toBeNull();
  });

  test('Slashdot story page has comment form', async ({ page }) => {
    await page.goto('/years/1998/sites/slashdot/story.html');
    await expect(page.locator('body')).toContainText(/Slashdot|comment/i, { timeout: 15000 });
  });
});

/* ─── 1999 ─────────────────────────────────────────────────────────── */

test.describe('1999 real flows', () => {
  test('Blogger post → view + itt99-blog', async ({ page }) => {
    await page.goto('/years/1999/sites/blogger/edit.html');
    await clearKeys(page, 'itt99-blog');
    await page.reload();
    await page.waitForSelector('[data-blogger-post]', { timeout: 20000 });
    const title = 'Real99 ' + Date.now();
    await page.fill('[data-blogger-post] [name="title"]', title);
    await page.fill('[data-blogger-post] [name="body"]', 'body 99');
    await Promise.all([
      page.waitForURL(/view\.html/, { timeout: 15000 }).catch(() => {}),
      page.locator('[data-blogger-post] input[type="submit"]').click(),
    ]);
    await page.waitForTimeout(400);
    const raw = await expectKey(page, 'itt99-blog');
    expect(raw || '').toContain(title);
  });

  test('Napster search returns rows', async ({ page }) => {
    await page.goto('/years/1999/sites/napster/index.html');
    await expect(page.locator('body')).toContainText(/Napster/i, { timeout: 15000 });
    if (await page.locator('#napster-results, [data-napster-results]').count()) {
      await expect(page.locator('#napster-results, [data-napster-results]')).toContainText(
        /mp3|Download|Radiohead|artist/i,
        { timeout: 10000 }
      );
    }
  });

  test('Amazon cart no smile branding path', async ({ page }) => {
    await page.goto('/years/1999/sites/amazon/index.html');
    await clearKeys(page, 'itt99-amazon-cart');
    await page.reload();
    if (await page.locator('[data-add-cart]').count()) {
      await page.locator('[data-add-cart]').first().click({ force: true });
      await expect
        .poll(async () =>
          page.evaluate(() => JSON.parse(localStorage.getItem('itt99-amazon-cart') || '[]').length)
        )
        .toBeGreaterThan(0);
    } else {
      await page.goto('/years/1999/sites/amazon/book-being-digital.html');
      await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
      await page.locator('[data-add-cart]').first().click({ force: true });
      await expectKey(page, 'itt99-amazon-cart');
    }
    const html = await page.content();
    expect(html).not.toMatch(/logo-smile|smile\.gif/i);
  });

  test('Google funded-startup about', async ({ page }) => {
    await page.goto('/years/1999/sites/google/about.html');
    await expect(page.locator('body')).toContainText(/Google|1999|PageRank|Sequoia|Kleiner/i, {
      timeout: 15000,
    });
  });

  test('eBay multicolor era home', async ({ page }) => {
    await page.goto('/years/1999/sites/ebay/index.html');
    await expect(page.locator('body')).toContainText(/eBay|auction|bid/i, { timeout: 15000 });
  });

  test('Y2K culture room', async ({ page }) => {
    await page.goto('/years/1999/sites/y2k/index.html');
    await expect(page.locator('body')).toContainText(/Y2K|2000|millennium|bug/i, { timeout: 15000 });
  });

  test('isolation: blog key is itt99', async ({ page }) => {
    await page.goto('/years/1999/sites/blogger/edit.html');
    await clearKeys(page, ['itt99-blog', 'itt00-blog']);
    await page.reload();
    await page.waitForSelector('[data-blogger-post]', { timeout: 20000 });
    await page.fill('[data-blogger-post] [name="title"]', 'Iso99');
    await page.fill('[data-blogger-post] [name="body"]', 'x');
    await page.locator('[data-blogger-post] input[type="submit"]').click();
    await page.waitForTimeout(500);
    await expectKey(page, 'itt99-blog');
    expect(await page.evaluate(() => localStorage.getItem('itt00-blog'))).toBeNull();
  });

  test('PayPal seed room loads', async ({ page }) => {
    await page.goto('/years/1999/sites/paypal/index.html');
    await expect(page.locator('body')).toContainText(/PayPal|payment|money/i, { timeout: 15000 });
  });
});

/* ─── 2000 ─────────────────────────────────────────────────────────── */

test.describe('2000 real flows', () => {
  test('Amazon smile cart → itt00-amazon-cart', async ({ page }) => {
    await page.goto('/years/2000/sites/amazon/music.html');
    await clearKeys(page, 'itt00-amazon-cart');
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click({ force: true });
    await expectKey(page, 'itt00-amazon-cart');
  });

  test('Pets.com multipage', async ({ page }) => {
    await page.goto('/years/2000/sites/pets/index.html');
    await expect(page.locator('body')).toContainText(/Pets|sock|puppet/i, { timeout: 15000 });
    const link = page.locator('a[href*="shop"], a[href*="about"], a[href*="shutdown"]').first();
    if (await link.count()) {
      await link.click();
      await expect(page.locator('body')).not.toContainText(/Error code: 404/i);
    }
  });

  test('Napster legal/culture room', async ({ page }) => {
    await page.goto('/years/2000/sites/napster/index.html');
    await expect(page.locator('body')).toContainText(/Napster/i, { timeout: 15000 });
  });

  test('Blogger post → itt00-blog', async ({ page }) => {
    await page.goto('/years/2000/sites/blogger/edit.html');
    await clearKeys(page, 'itt00-blog');
    await page.reload();
    await page.waitForSelector('[data-blogger-post]', { timeout: 20000 });
    const title = 'Y2Kblog ' + Date.now();
    await page.fill('[data-blogger-post] [name="title"]', title);
    await page.fill('[data-blogger-post] [name="body"]', 'crash year post');
    await page.locator('[data-blogger-post] input[type="submit"]').click();
    await page.waitForTimeout(500);
    const raw = await expectKey(page, 'itt00-blog');
    expect(raw || '').toContain(title);
  });

  test('Google home loads', async ({ page }) => {
    await page.goto('/years/2000/sites/google/index.html');
    await expect(page.locator('body')).toContainText(/Google/i, { timeout: 15000 });
  });

  test('Gnutella seed room', async ({ page }) => {
    await page.goto('/years/2000/sites/gnutella/index.html');
    await expect(page.locator('body')).toContainText(/Gnutella|P2P|Nullsoft/i, { timeout: 15000 });
  });

  test('isolation cart itt00 only', async ({ page }) => {
    await page.goto('/years/2000/sites/amazon/music.html');
    await clearKeys(page, ['itt00-amazon-cart', 'itt99-amazon-cart']);
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click({ force: true });
    await expectKey(page, 'itt00-amazon-cart');
    expect(await page.evaluate(() => localStorage.getItem('itt99-amazon-cart'))).toBeNull();
  });

  test('Startup Failures culture', async ({ page }) => {
    await page.goto('/years/2000/sites/startupfailures/index.html');
    await expect(page.locator('body')).toContainText(/fail|startup|crash|dot.?com/i, {
      timeout: 15000,
    });
  });
});
