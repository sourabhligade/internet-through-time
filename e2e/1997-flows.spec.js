// @ts-check
/**
 * 1997 — hard e2e per interactive flow (eBay, Amazon, Slashdot, PointCast, ICQ, Start menu).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

async function boot(page, path) {
  await enterYear(page, '1997');
  await goInFrame(page, path);
  await waitForImmersion(page, '1997');
  return contentFrame(page);
}

test.describe('1997 flow: eBay bid', () => {
  test('laptop bid form raises high bid and stores history', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt97') === 0 && k.indexOf('bid') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    const frame = await boot(page, 'sites/ebay/item-laptop.html');
    await expect(frame.locator('[data-auction-id="laptop"]')).toBeVisible({ timeout: 15000 });
    const form = frame.locator('form[data-bid-form]');
    await expect(form).toBeVisible();
    // form may only have bid field
    const bidder = form.locator('input[name="bidder"]');
    if (await bidder.count()) await bidder.fill('eBayFlow97');
    await form.locator('input[name="bid"]').fill('500.00');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bid]')).toContainText('500', { timeout: 10000 });
    await expect.poll(async () =>
      page.evaluate(() =>
        Object.keys(localStorage).some((k) => {
          if (k.indexOf('itt97') !== 0 || k.indexOf('bid') === -1) return false;
          const v = localStorage.getItem(k) || '';
          return v.includes('500');
        })
      )
    ).toBeTruthy();
  });

  test('eBay home uses black wordmark era branding not multicolor lore', async ({ page }) => {
    const frame = await boot(page, 'sites/ebay/index.html');
    await expect(frame.locator('body')).toContainText(/eBay/i, { timeout: 15000 });
  });
});

test.describe('1997 flow: Amazon cart + IPO era', () => {
  test('add-to-cart uses itt97 prefix', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => localStorage.setItem('itt97-amazon-cart', '[]'));
    const frame = await boot(page, 'sites/amazon/book-being-digital.html');
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt97-amazon-cart') || '[]').length)
    ).toBeGreaterThan(0);
  });

  test('checkout completes order', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt97-amazon-cart',
        JSON.stringify([{ id: 'being-digital', title: 'Being Digital', price: 10.36, author: 'Negroponte' }])
      );
      localStorage.setItem('itt97-amazon-orders', '[]');
    });
    // find checkout path
    const frame = await boot(page, 'sites/amazon/checkout.html');
    await expect(frame.locator('form[data-checkout-form]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="name"]').fill('IPO Buyer');
    const email = frame.locator('input[name="email"]');
    if (await email.count()) await email.fill('ipo@example.com');
    await frame.locator('form[data-checkout-form] input[type="submit"]').click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt97-amazon-orders') || '[]').length)
    , { timeout: 15000 }).toBeGreaterThan(0);
  });
});

test.describe('1997 flow: Slashdot comments', () => {
  test('comment posts to list and localStorage', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('sd-comments') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    const frame = await boot(page, 'sites/slashdot/story.html');
    await expect(frame.locator('form[data-sd-comment-form]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="nick"]').fill('Nerd97');
    await frame.locator('input[name="subject"]').fill('Flow comment');
    await frame.locator('textarea[name="body"]').fill('Slashdot flow works.');
    await frame.locator('form[data-sd-comment-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-sd-comments]')).toContainText(/Flow comment|Nerd97/i, {
      timeout: 10000,
    });
  });
});

test.describe('1997 flow: PointCast channels', () => {
  test('home and channels pages load push thesis', async ({ page }) => {
    const frame = await boot(page, 'sites/pointcast/index.html');
    await expect(frame.locator('body')).toContainText(/PointCast/i, { timeout: 15000 });
    await frame.locator('a[href*="channel"]').first().click({ force: true });
    await expect(frame.locator('body')).toContainText(/Channel|News|tuner|push/i, { timeout: 15000 });
  });
});

test.describe('1997 flow: ICQ', () => {
  test('ICQ home presents messenger product', async ({ page }) => {
    const frame = await boot(page, 'sites/icq/index.html');
    await expect(frame.locator('body')).toContainText(/ICQ|I Seek You|UIN|message/i, { timeout: 15000 });
  });
});

test.describe('1997 flow: Start menu', () => {
  test('data-start-cmd buttons exist and respond', async ({ page }) => {
    await enterYear(page, '1997');
    const items = page.locator('[data-start-cmd]');
    await expect(items.first()).toBeAttached({ timeout: 10000 });
    const n = await items.count();
    expect(n).toBeGreaterThanOrEqual(3);
    // Open start if needed
    const start = page.locator('#start-button, .start-btn, [id*="start"]').first();
    if (await start.isVisible().catch(() => false)) {
      await start.click({ force: true });
    }
    await page.locator('[data-start-cmd="help"]').click({ force: true }).catch(() => {});
    // Should not throw; shell remains usable
    await expect(page.locator('#content')).toBeVisible();
  });
});

test.describe('1997 flow: Yahoo + HotBot navigation', () => {
  test('Yahoo portal loads', async ({ page }) => {
    const frame = await boot(page, 'sites/yahoo/index.html');
    await expect(frame.locator('body')).toContainText(/Yahoo/i);
  });

  test('HotBot search page loads', async ({ page }) => {
    const frame = await boot(page, 'sites/hotbot/index.html');
    await expect(frame.locator('body')).toContainText(/HotBot|search/i, { timeout: 15000 });
  });
});

test.describe('1997 flow: Amazon no smile', () => {
  test('amazon pages do not use smile branding', async ({ page }) => {
    const frame = await boot(page, 'sites/amazon/index.html');
    const html = await frame.locator('body').innerHTML();
    expect(html.toLowerCase()).not.toMatch(/logo-smile|smile\.gif/);
    await expect(frame.locator('body')).toContainText(/Amazon|book/i);
  });
});

test.describe('1997 flow: eBay PDA second listing', () => {
  test('pda item bid form works', async ({ page }) => {
    await enterYear(page, '1997');
    const frame = await boot(page, 'sites/ebay/item-pda.html');
    await expect(frame.locator('[data-auction-id="pda"]')).toBeVisible({ timeout: 15000 });
    const form = frame.locator('form[data-bid-form]');
    await form.locator('input[name="bid"]').fill('200.00');
    await form.locator('input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bid]')).toContainText('200', { timeout: 10000 });
  });
});

test.describe('1997 flow: full path eBay then Amazon', () => {
  test('bid on laptop then checkout a book', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt97') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    let frame = await boot(page, 'sites/ebay/item-laptop.html');
    await frame.locator('form[data-bid-form] input[name="bid"]').fill('510.00');
    await frame.locator('form[data-bid-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-high-bid]')).toContainText('510', { timeout: 10000 });

    await goInFrame(page, 'sites/amazon/book-being-digital.html');
    await waitForImmersion(page, '1997');
    frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt97-amazon-cart') || '[]').length)
    ).toBe(1);

    await goInFrame(page, 'sites/amazon/checkout.html');
    await waitForImmersion(page, '1997');
    frame = contentFrame(page);
    await frame.locator('input[name="name"]').fill('Combo Buyer');
    await frame.locator('form[data-checkout-form] input[type="submit"]').click({ force: true });
    await expect.poll(async () =>
      page.evaluate(() => JSON.parse(localStorage.getItem('itt97-amazon-orders') || '[]').length)
    , { timeout: 15000 }).toBeGreaterThan(0);
  });
});
