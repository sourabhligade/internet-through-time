// @ts-check
/**
 * Hard live-flow audit for 1994 + 1995.
 * Every interactive theater must mutate storage / DOM for real — no soft mock fallbacks.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1994 live flows (hard)', () => {
  test('FishCam advances frame label via immersion', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/fishcam/index.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    const label = frame.locator('[data-fish-label]');
    await expect(label).toBeVisible({ timeout: 15000 });
    await expect(label).toContainText(/Frame \d+ of 4/i, { timeout: 10000 });
    const img = frame.locator('[data-fish-frame]');
    await expect(img).toHaveAttribute('src', /fishcam\/frame-/);
  });

  test('CSotD replaces Loading pick with real destination', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/csotd/index.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    const link = frame.locator('[data-csotd-link]');
    await expect(link).toBeVisible({ timeout: 15000 });
    await expect(link).not.toContainText(/Loading pick/i);
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).not.toBe('#');
    await expect(frame.locator('[data-csotd-blurb]')).not.toContainText(/A human editor picked one site worth your modem time\./);
  });

  test('Yahoo search returns catalog hits', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/yahoo/search.html?p=nasa');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    const out = frame.locator('[data-search-results]');
    await expect(out).toBeVisible({ timeout: 15000 });
    await expect(out).toContainText(/match/i);
    await expect(out).not.toContainText(/No matches/i);
  });

  test('Lycos search returns catalog hits', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/lycos/search.html?q=music');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-search-results]')).toContainText(/match|IUMA|Music/i, { timeout: 15000 });
  });

  test('Personal guestbook signs and lists entry', async ({ page }) => {
    await enterYear(page, '1994');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt-gb') !== -1 || k.indexOf('itt-gb-jdoe') !== -1 || k.endsWith('-gb-jdoe'))
        .forEach((k) => localStorage.removeItem(k));
      // storageKey is PREFIX-gb-key → itt-gb-jdoe for 1994 (prefix itt)
      Object.keys(localStorage).filter((k) => /gb-jdoe|gb-whitehouse/.test(k)).forEach((k) => localStorage.removeItem(k));
    });
    await goInFrame(page, 'sites/personal/guestbook.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    await expect(frame.locator('form[data-gb-form]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="n"]').fill('FlowTester94');
    await frame.locator('textarea[name="m"]').fill('Signed from live flow audit.');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-gb-list]')).toContainText('FlowTester94', { timeout: 10000 });
    await expect(frame.locator('[data-gb-list]')).toContainText('live flow audit');
    await expect.poll(async () => {
      return page.evaluate(() => {
        return Object.keys(localStorage).some((k) => {
          const v = localStorage.getItem(k) || '';
          return v.indexOf('FlowTester94') !== -1;
        });
      });
    }, { timeout: 10000 }).toBeTruthy();
  });

  test('White House guestbook signs', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/whitehouse/guestbook.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    await frame.locator('input[name="n"]').fill('Citizen94');
    await frame.locator('textarea[name="c"]').fill('Greetings from the information superhighway.');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-gb-list]')).toContainText('Citizen94', { timeout: 10000 });
  });

  test('IUMA player enables Play after download theater', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/iuma/bands/download.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-iuma-player]')).toBeVisible({ timeout: 15000 });
    const play = frame.locator('[data-player-play]');
    await expect(play).toBeVisible();
    // Wait for simulated download to finish (14 steps * 280ms ≈ 4s)
    await expect(play).toBeEnabled({ timeout: 20000 });
    await expect(frame.locator('[data-player-status]')).toContainText(/complete|ready|Play/i, { timeout: 5000 });
  });

  test('WH imagemap areas resolve', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/whitehouse/index.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    await expect(frame.locator('map[name="whmap"] area').first()).toHaveAttribute('href', /.+/);
    await frame.locator('a[href="president.html"]').first().click();
    await expect(frame.locator('body')).toContainText(/President|Clinton|White House/i, { timeout: 15000 });
  });
});

test.describe('1995 live flows (hard)', () => {
  test('Amazon cart: add → cart list → clear', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.setItem('itt95-amazon-cart', '[]'));
    await goInFrame(page, 'sites/amazon/book-neuromancer.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect.poll(async () => {
      return page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length);
    }, { timeout: 10000 }).toBeGreaterThan(0);

    await goInFrame(page, 'sites/amazon/cart.html');
    await waitForImmersion(page, '1995');
    await expect(frame.locator('[data-cart-list]')).toContainText(/Neuromancer/i, { timeout: 15000 });
    await expect(frame.locator('[data-cart-total]')).not.toHaveText('$0.00');

    await frame.locator('[data-cart-clear]').click({ force: true });
    await expect.poll(async () => {
      return page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length);
    }, { timeout: 10000 }).toBe(0);
  });

  test('Amazon SSL checkout places order and empties cart', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt95-amazon-cart',
        JSON.stringify([{ id: 'neuromancer', title: 'Neuromancer', price: 6.99, author: 'William Gibson' }])
      );
      localStorage.setItem('itt95-amazon-orders', '[]');
      localStorage.setItem('itt95-order-mail', '[]');
    });
    await goInFrame(page, 'sites/amazon/checkout.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    await expect(frame.locator('#itt-secure-banner')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('[data-checkout-list]')).toContainText(/Neuromancer/i);
    await frame.locator('input[name="name"]').fill('Flow Buyer');
    await frame.locator('input[name="email"]').fill('flow@example.com');
    await frame.locator('form[data-checkout-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('body[data-order-thanks]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('[data-order-name]')).toContainText(/Flow Buyer/i);
    await expect.poll(async () => {
      return page.evaluate(() => ({
        cart: JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length,
        orders: JSON.parse(localStorage.getItem('itt95-amazon-orders') || '[]').length,
        mail: JSON.parse(localStorage.getItem('itt95-order-mail') || '[]').length,
      }));
    }, { timeout: 10000 }).toEqual({ cart: 0, orders: 1, mail: 1 });
  });

  test('Amazon home add-to-cart works (button, not dead submit)', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.setItem('itt95-amazon-cart', '[]'));
    await goInFrame(page, 'sites/amazon/index.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    const btn = frame.locator('[data-add-cart]').first();
    await expect(btn).toHaveAttribute('type', 'button');
    await btn.click({ force: true });
    await expect.poll(async () => {
      return page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length);
    }, { timeout: 10000 }).toBeGreaterThan(0);
  });

  test('AuctionWeb bid updates high bid + localStorage (no fallback)', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt95') === 0 && k.indexOf('bid') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goInFrame(page, 'sites/auctionweb/item-laser.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    const form = frame.locator('form[data-bid-form]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('input[name="bidder"]').fill('HardBidder');
    await form.locator('input[name="bid"]').fill('42.50');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bid]')).toContainText('42.50', { timeout: 10000 });
    await expect(frame.locator('[data-high-bidder]')).toContainText('HardBidder');
    await expect(frame.locator('[data-bid-history]')).toContainText('HardBidder');
    await expect.poll(async () => {
      return page.evaluate(() => {
        return Object.keys(localStorage).some((k) => {
          if (k.indexOf('itt95') !== 0) return false;
          const v = localStorage.getItem(k) || '';
          return v.indexOf('HardBidder') !== -1 && (v.indexOf('42.5') !== -1 || v.indexOf('42.50') !== -1);
        });
      });
    }, { timeout: 10000 }).toBeTruthy();
  });

  test('GeoCities homestead wizard → my-homestead view', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.removeItem('itt95-homestead'));
    await goInFrame(page, 'sites/geocities/homestead.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    await frame.locator('select[name="neighborhood"]').selectOption('Area51');
    await frame.locator('input[name="number"]').fill('5151');
    await frame.locator('input[name="title"]').fill('LiveFlow Homestead');
    await frame.locator('textarea[name="about"]').fill('Built by hard flow audit.');
    await frame.locator('form[data-homestead-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-homestead-view]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('[data-homestead-view]')).toContainText(/LiveFlow Homestead/i);
    await expect(frame.locator('[data-homestead-view]')).toContainText(/Area51|5151/i);
    const hs = await page.evaluate(() => JSON.parse(localStorage.getItem('itt95-homestead') || 'null'));
    expect(hs).toBeTruthy();
    expect(hs.title).toBe('LiveFlow Homestead');
    expect(hs.number).toBe('5151');
  });

  test('GeoCities webring injects Prev/Random/Next links', async ({ page }) => {
    await enterYear(page, '1995');
    await goInFrame(page, 'sites/geocities/Hollywood/1234/index.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
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

  test('GeoCities guestbook signs Hollywood homestead', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('gb-gc-holly') !== -1 || k.indexOf('itt95-gb') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goInFrame(page, 'sites/geocities/Hollywood/1234/index.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    await frame.locator('input[name="n"]').fill('HollySigner');
    await frame.locator('input[name="f"]').fill('LA');
    await frame.locator('textarea[name="m"]').fill('Hard flow guestbook check.');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-gb-list]')).toContainText('HollySigner', { timeout: 10000 });
  });

  test('AltaVista search returns hits for books', async ({ page }) => {
    await enterYear(page, '1995');
    await goInFrame(page, 'sites/altavista/search.html?q=books');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    const out = frame.locator('[data-search-results]');
    await expect(out).toContainText(/match/i, { timeout: 15000 });
    await expect(out).not.toContainText(/^No matches/i);
    await expect(out.locator('a').first()).toBeVisible();
  });

  test('Yahoo search returns hits for auction', async ({ page }) => {
    await enterYear(page, '1995');
    await goInFrame(page, 'sites/yahoo/search.html?p=auction');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-search-results]')).toContainText(/AuctionWeb|match/i, { timeout: 15000 });
  });

  test('Amazon book search theater lists results', async ({ page }) => {
    await enterYear(page, '1995');
    await goInFrame(page, 'sites/amazon/search.html?q=gibson');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-amazon-results]')).toContainText(/Neuromancer|Gibson|book/i, {
      timeout: 15000,
    });
  });
});
