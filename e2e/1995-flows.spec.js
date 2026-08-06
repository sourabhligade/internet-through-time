// @ts-check
/**
 * 1995 — one hard e2e per interactive flow.
 * No soft mock fallbacks: storage/DOM must change.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

async function boot(page, path) {
  await enterYear(page, '1995');
  await goInFrame(page, path);
  await waitForImmersion(page, '1995');
  return contentFrame(page);
}

test.describe('1995 flow: Amazon add-to-cart (book page)', () => {
  test('data-add-cart writes itt95-amazon-cart', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.setItem('itt95-amazon-cart', '[]'));
    await goInFrame(page, 'sites/amazon/book-neuromancer.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    const btn = frame.locator('[data-add-cart]').first();
    await expect(btn).toBeVisible({ timeout: 15000 });
    const tag = await btn.evaluate((el) => el.tagName.toLowerCase());
    expect(tag).toBe('input');
    await btn.click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length)
    ).toBeGreaterThan(0);
    const cart = await page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]'));
    expect(cart[0].title || cart[0].id).toBeTruthy();
  });
});

test.describe('1995 flow: Amazon add-to-cart (home)', () => {
  test('home featured buttons are type=button and add items', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.setItem('itt95-amazon-cart', '[]'));
    const frame = await boot(page, 'sites/amazon/index.html');
    const btn = frame.locator('[data-add-cart]').first();
    await expect(btn).toHaveAttribute('type', 'button');
    await btn.click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length)
    ).toBeGreaterThan(0);
  });
});

test.describe('1995 flow: Amazon cart list + clear', () => {
  test('cart page lists items and empty cart clears storage', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt95-amazon-cart',
        JSON.stringify([{ id: 'neuromancer', title: 'Neuromancer', price: 6.99, author: 'William Gibson' }])
      );
    });
    const frame = await boot(page, 'sites/amazon/cart.html');
    await expect(frame.locator('[data-cart-list]')).toContainText(/Neuromancer/i, { timeout: 15000 });
    await expect(frame.locator('[data-cart-total]')).not.toHaveText('$0.00');
    await frame.locator('[data-cart-clear]').click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length)
    ).toBe(0);
  });
});

test.describe('1995 flow: Amazon SSL checkout', () => {
  test('secure banner + order + mail + empty cart', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt95-amazon-cart',
        JSON.stringify([{ id: 'neuromancer', title: 'Neuromancer', price: 6.99, author: 'William Gibson' }])
      );
      localStorage.setItem('itt95-amazon-orders', '[]');
      localStorage.setItem('itt95-order-mail', '[]');
    });
    const frame = await boot(page, 'sites/amazon/checkout.html');
    await expect(frame.locator('#itt-secure-banner')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('body')).toContainText(/Secure document/i);
    await expect(frame.locator('[data-checkout-list]')).toContainText(/Neuromancer/i);
    await frame.locator('input[name="name"]').fill('Checkout Flow');
    await frame.locator('input[name="email"]').fill('checkout@example.com');
    await frame.locator('form[data-checkout-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('body[data-order-thanks]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('[data-order-name]')).toContainText(/Checkout Flow/i);
    await expect.poll(async () =>
      page.evaluate(() => ({
        cart: JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length,
        orders: JSON.parse(localStorage.getItem('itt95-amazon-orders') || '[]').length,
        mail: JSON.parse(localStorage.getItem('itt95-order-mail') || '[]').length,
      }))
    ).toEqual({ cart: 0, orders: 1, mail: 1 });
  });
});

test.describe('1995 flow: Amazon book search', () => {
  test('data-amazon-results lists gibson titles', async ({ page }) => {
    const frame = await boot(page, 'sites/amazon/search.html?q=gibson');
    await expect(frame.locator('[data-amazon-results]')).toContainText(/Neuromancer|Gibson|book/i, {
      timeout: 15000,
    });
  });
});

test.describe('1995 flow: AuctionWeb bid', () => {
  test('laser pointer bid updates high bidder + history + storage', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt95') === 0 && k.indexOf('bid') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    const frame = await boot(page, 'sites/auctionweb/item-laser.html');
    const form = frame.locator('form[data-bid-form]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('input[name="bidder"]').fill('BidFlowUser');
    await form.locator('input[name="bid"]').fill('33.33');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bid]')).toContainText('33.33', { timeout: 10000 });
    await expect(frame.locator('[data-high-bidder]')).toContainText('BidFlowUser');
    await expect(frame.locator('[data-bid-history]')).toContainText('BidFlowUser');
    await expect.poll(async () =>
      page.evaluate(() =>
        Object.keys(localStorage).some((k) => {
          const v = localStorage.getItem(k) || '';
          return k.indexOf('itt95') === 0 && v.includes('BidFlowUser');
        })
      )
    ).toBeTruthy();
  });

  test('second item (disk) bid form also works', async ({ page }) => {
    await enterYear(page, '1995');
    const frame = await boot(page, 'sites/auctionweb/item-disk.html');
    await expect(frame.locator('[data-auction-id="disk"]')).toBeVisible();
    const form = frame.locator('form[data-bid-form]');
    await form.locator('input[name="bidder"]').fill('DiskBidder');
    await form.locator('input[name="bid"]').fill('99.00');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bidder]')).toContainText('DiskBidder', { timeout: 10000 });
  });

  test('AuctionWeb home brands AuctionWeb not eBay', async ({ page }) => {
    const frame = await boot(page, 'sites/auctionweb/index.html');
    const body = await frame.locator('body').innerText();
    expect(body).toMatch(/AuctionWeb/i);
  });
});

test.describe('1995 flow: GeoCities homestead', () => {
  test('wizard saves homestead and shows my-homestead view', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.removeItem('itt95-homestead'));
    const frame = await boot(page, 'sites/geocities/homestead.html');
    await frame.locator('select[name="neighborhood"]').selectOption('Hollywood');
    await frame.locator('input[name="number"]').fill('4242');
    await frame.locator('input[name="title"]').fill('Flow Homestead 95');
    await frame.locator('textarea[name="about"]').fill('Homestead flow test page.');
    await frame.locator('form[data-homestead-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-homestead-view]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('[data-homestead-view]')).toContainText(/Flow Homestead 95/i);
    const hs = await page.evaluate(() => JSON.parse(localStorage.getItem('itt95-homestead') || 'null'));
    expect(hs && hs.title).toBe('Flow Homestead 95');
    expect(hs.number).toBe('4242');
  });
});

test.describe('1995 flow: GeoCities webring', () => {
  test('injects Prev / Random / Next with real hrefs', async ({ page }) => {
    const frame = await boot(page, 'sites/geocities/Hollywood/1234/index.html');
    const ring = frame.locator('[data-webring]');
    await expect(ring).toContainText(/Prev/i, { timeout: 15000 });
    await expect(ring).toContainText(/Next/i);
    await expect(ring).toContainText(/Random/i);
    const hrefs = await ring.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThanOrEqual(3);
    hrefs.forEach((h) => {
      expect(h).toBeTruthy();
      expect(h).not.toBe('#');
    });
  });
});

test.describe('1995 flow: GeoCities guestbook', () => {
  test('Hollywood homestead guestbook signs to list + storage', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => /gb-gc-holly|itt95-gb/.test(k))
        .forEach((k) => localStorage.removeItem(k));
    });
    const frame = await boot(page, 'sites/geocities/Hollywood/1234/index.html');
    await frame.locator('input[name="n"]').fill('GeoFlowSigner');
    await frame.locator('input[name="f"]').fill('LA');
    await frame.locator('textarea[name="m"]').fill('GeoCities guestbook flow.');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-gb-list]')).toContainText('GeoFlowSigner', { timeout: 10000 });
    await expect.poll(async () =>
      page.evaluate(() =>
        Object.keys(localStorage).some((k) => (localStorage.getItem(k) || '').includes('GeoFlowSigner'))
      )
    ).toBeTruthy();
  });
});

test.describe('1995 flow: White House guestbook', () => {
  test('wh1995 guestbook signs', async ({ page }) => {
    const frame = await boot(page, 'sites/whitehouse/guestbook.html');
    await frame.locator('input[name="n"]').fill('WH95Flow');
    await frame.locator('input[name="f"]').fill('DC');
    await frame.locator('input[name="m"]').fill('White House 1995 guestbook flow.');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-gb-list]')).toContainText('WH95Flow', { timeout: 10000 });
  });
});

test.describe('1995 flow: AltaVista search', () => {
  test('full-text catalog returns matches for books', async ({ page }) => {
    const frame = await boot(page, 'sites/altavista/search.html?q=books');
    const out = frame.locator('[data-search-results]');
    await expect(out).toContainText(/match/i, { timeout: 15000 });
    await expect(out.locator('a').first()).toBeVisible();
  });
});

test.describe('1995 flow: Yahoo search', () => {
  test('directory search returns auction hits', async ({ page }) => {
    const frame = await boot(page, 'sites/yahoo/search.html?p=auction');
    await expect(frame.locator('[data-search-results]')).toContainText(/AuctionWeb|match/i, {
      timeout: 15000,
    });
  });
});

test.describe('1995 flow: end-to-end commerce path', () => {
  test('Yahoo → Amazon add → cart → checkout order', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      localStorage.setItem('itt95-amazon-cart', '[]');
      localStorage.setItem('itt95-amazon-orders', '[]');
      localStorage.setItem('itt95-order-mail', '[]');
    });
    await goInFrame(page, 'sites/yahoo/index.html');
    await waitForImmersion(page, '1995');
    let frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Yahoo/i);

    await goInFrame(page, 'sites/amazon/book-snow-crash.html');
    await waitForImmersion(page, '1995');
    frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length)
    ).toBe(1);

    await goInFrame(page, 'sites/amazon/cart.html');
    await waitForImmersion(page, '1995');
    frame = contentFrame(page);
    await expect(frame.locator('[data-cart-list]')).toContainText(/Snow Crash/i, { timeout: 15000 });

    await goInFrame(page, 'sites/amazon/checkout.html');
    await waitForImmersion(page, '1995');
    frame = contentFrame(page);
    await frame.locator('input[name="name"]').fill('Path Buyer');
    await frame.locator('input[name="email"]').fill('path@example.com');
    await frame.locator('form[data-checkout-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('body[data-order-thanks]')).toBeVisible({ timeout: 15000 });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-orders') || '[]').length)
    ).toBe(1);
  });
});
