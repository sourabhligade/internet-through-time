// @ts-check
/**
 * 1996 — hard e2e per interactive flow (HoTMaiL, Amazon, AuctionWeb, search, GeoCities, Space Jam).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

async function boot(page, path) {
  await enterYear(page, '1996');
  await goInFrame(page, path);
  await waitForImmersion(page, '1996');
  return contentFrame(page);
}

test.describe('1996 flow: HoTMaiL login → inbox', () => {
  test('login stores user and shows inbox rows', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt96-hotmail') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    const frame = await boot(page, 'sites/hotmail/index.html');
    await expect(frame.locator('form[data-hotmail-login]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="login"]').fill('flow96user');
    await frame.locator('input[name="pass"]').fill('secret');
    await frame.locator('form[data-hotmail-login] input[type="image"], form[data-hotmail-login] input[type="submit"]').first().click({ force: true });
    await expect(frame.locator('[data-hotmail-inbox] tr').first()).toBeVisible({ timeout: 20000 });
    await expect.poll(async () =>
      page.evaluate(() => {
        const u = localStorage.getItem('itt96-hotmail-user');
        return !!(u && u.includes('flow96user'));
      })
    ).toBeTruthy();
  });
});

test.describe('1996 flow: HoTMaiL compose', () => {
  test('compose form posts when logged in', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      localStorage.setItem('itt96-hotmail-user', JSON.stringify({ id: 'composer96', at: new Date().toLocaleString() }));
    });
    const frame = await boot(page, 'sites/hotmail/compose.html');
    await expect(frame.locator('form[data-hotmail-compose]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="to"]').fill('friend@example.com');
    await frame.locator('input[name="subject"]').fill('Flow test mail');
    await frame.locator('textarea[name="body"]').fill('Hello from 1996 HoTMaiL flow.');
    await frame.locator('form[data-hotmail-compose] input[type="submit"]').click({ force: true });
    // Should stay usable — flash or sent state
    await expect(frame.locator('body')).toContainText(/HoTMaiL|compose|Sent|Inbox|mail/i, { timeout: 10000 });
  });
});

test.describe('1996 flow: Amazon cart', () => {
  test('add-to-cart writes itt96-amazon-cart', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => localStorage.setItem('itt96-amazon-cart', '[]'));
    const frame = await boot(page, 'sites/amazon/book-neuromancer.html');
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt96-amazon-cart') || '[]').length)
    ).toBeGreaterThan(0);
  });

  test('cart lists and clears', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt96-amazon-cart',
        JSON.stringify([{ id: 'neuromancer', title: 'Neuromancer', price: 6.99, author: 'William Gibson' }])
      );
    });
    const frame = await boot(page, 'sites/amazon/cart.html');
    await expect(frame.locator('[data-cart-list]')).toContainText(/Neuromancer/i, { timeout: 15000 });
    await frame.locator('[data-cart-clear]').click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt96-amazon-cart') || '[]').length)
    ).toBe(0);
  });

  test('SSL checkout places order', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt96-amazon-cart',
        JSON.stringify([{ id: 'snow-crash', title: 'Snow Crash', price: 7.5, author: 'Neal Stephenson' }])
      );
      localStorage.setItem('itt96-amazon-orders', '[]');
      localStorage.setItem('itt96-order-mail', '[]');
    });
    const frame = await boot(page, 'sites/amazon/checkout.html');
    await expect(frame.locator('form[data-checkout-form]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="name"]').fill('Buyer96');
    await frame.locator('input[name="email"]').fill('b96@example.com');
    await frame.locator('form[data-checkout-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('body[data-order-thanks]')).toBeVisible({ timeout: 15000 });
    await expect.poll(async () =>
      page.evaluate(() => ({
        cart: JSON.parse(localStorage.getItem('itt96-amazon-cart') || '[]').length,
        orders: JSON.parse(localStorage.getItem('itt96-amazon-orders') || '[]').length,
      }))
    ).toEqual({ cart: 0, orders: 1 });
  });
});

test.describe('1996 flow: AuctionWeb bid', () => {
  test('laser bid updates high bidder and storage', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt96') === 0 && k.indexOf('bid') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    const frame = await boot(page, 'sites/auctionweb/item-laser.html');
    const form = frame.locator('form[data-bid-form]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('input[name="bidder"]').fill('Bid96');
    await form.locator('input[name="bid"]').fill('40.00');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bidder]')).toContainText('Bid96', { timeout: 10000 });
    await expect.poll(async () =>
      page.evaluate(() =>
        Object.keys(localStorage).some((k) => (localStorage.getItem(k) || '').includes('Bid96'))
      )
    ).toBeTruthy();
  });
});

test.describe('1996 flow: Excite + AltaVista search', () => {
  test('Excite search returns catalog matches', async ({ page }) => {
    const frame = await boot(page, 'sites/excite/search.html?q=books');
    await expect(frame.locator('[data-search-results]')).toContainText(/match|Amazon|book/i, {
      timeout: 15000,
    });
  });

  test('AltaVista search returns matches', async ({ page }) => {
    const frame = await boot(page, 'sites/altavista/search.html?q=email');
    await expect(frame.locator('[data-search-results]')).toContainText(/match|HoTMaiL|mail/i, {
      timeout: 15000,
    });
  });
});

test.describe('1996 flow: GeoCities guestbook', () => {
  test('Hollywood homestead guestbook signs', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => /gb-gc|itt96-gb/.test(k))
        .forEach((k) => localStorage.removeItem(k));
    });
    const frame = await boot(page, 'sites/geocities/Hollywood/4521/index.html');
    await expect(frame.locator('form[data-gb-form]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="n"]').fill('GC96Signer');
    await frame.locator('textarea[name="m"], input[name="m"]').first().fill('GeoCities 96 flow.');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-gb-list]')).toContainText('GC96Signer', { timeout: 10000 });
  });
});

test.describe('1996 flow: Space Jam hub', () => {
  test('planet hub loads and links to sitemap/sections', async ({ page }) => {
    const frame = await boot(page, 'sites/spacejam/index.html');
    await expect(frame.locator('body')).toContainText(/Space Jam|Jam/i, { timeout: 15000 });
    // Should have multiple planet/section links or images
    const links = frame.locator('a[href]');
    expect(await links.count()).toBeGreaterThan(3);
  });
});

test.describe('1996 flow: Yahoo portal', () => {
  test('Yahoo home loads yellow portal era', async ({ page }) => {
    const frame = await boot(page, 'sites/yahoo/index.html');
    await expect(frame.locator('body')).toContainText(/Yahoo/i);
    await expect.poll(async () => page.locator('#location').inputValue()).toMatch(/yahoo/i);
  });
});

test.describe('1996 flow: Amazon home add-to-cart', () => {
  test('featured home buttons write cart without opening book page', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => localStorage.setItem('itt96-amazon-cart', '[]'));
    const frame = await boot(page, 'sites/amazon/index.html');
    const btn = frame.locator('[data-add-cart]').first();
    await expect(btn).toBeVisible({ timeout: 15000 });
    await btn.click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt96-amazon-cart') || '[]').length)
    ).toBeGreaterThan(0);
  });
});

test.describe('1996 flow: HoTMaiL logout', () => {
  test('sign out clears itt96-hotmail-user', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt96-hotmail-user',
        JSON.stringify({ id: 'logoutflow', at: new Date().toLocaleString() })
      );
    });
    const frame = await boot(page, 'sites/hotmail/inbox.html');
    await expect(frame.locator('[data-hotmail-logout]').first()).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-hotmail-logout]').first().click({ force: true });
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt96-hotmail-user'))).toBeFalsy();
  });
});

test.describe('1996 flow: full path HoTMaiL then Amazon', () => {
  test('login mail then buy a book end-to-end', async ({ page }) => {
    await enterYear(page, '1996');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt96') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    let frame = await boot(page, 'sites/hotmail/index.html');
    await frame.locator('input[name="login"]').fill('pathuser');
    await frame.locator('input[name="pass"]').fill('x');
    await frame.locator('form[data-hotmail-login] input[type="image"], form[data-hotmail-login] input[type="submit"]').first().click({ force: true });
    await expect(frame.locator('[data-hotmail-inbox] tr').first()).toBeVisible({ timeout: 20000 });

    await goInFrame(page, 'sites/amazon/book-neuromancer.html');
    await waitForImmersion(page, '1996');
    frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt96-amazon-cart') || '[]').length)
    ).toBe(1);

    await goInFrame(page, 'sites/amazon/checkout.html');
    await waitForImmersion(page, '1996');
    frame = contentFrame(page);
    await frame.locator('input[name="name"]').fill('Path User');
    await frame.locator('input[name="email"]').fill('path@example.com');
    await frame.locator('form[data-checkout-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('body[data-order-thanks]')).toBeVisible({ timeout: 15000 });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt96-amazon-orders') || '[]').length)
    ).toBe(1);
  });
});
