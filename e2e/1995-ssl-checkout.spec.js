// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1995 SSL checkout ritual', () => {
  test('checkout shows secure banner and records order + mail', async ({ page }) => {
    await enterYear(page, '1995');

    // Seed cart with one book
    await page.evaluate(() => {
      localStorage.setItem(
        'itt95-amazon-cart',
        JSON.stringify([{ id: 'neuromancer', title: 'Neuromancer', price: 6.99, author: 'William Gibson' }])
      );
    });

    await goInFrame(page, 'sites/amazon/checkout.html');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-checkout], body[data-checkout]').first()).toBeVisible({ timeout: 20000 });
    await waitForImmersion(page, '1995');

    // Secure theater banner
    await expect(frame.locator('#itt-secure-banner')).toBeVisible({ timeout: 10000 });
    await expect(frame.locator('body')).toContainText(/Secure document/i);

    // Parent location may flip to https (secure mode)
    await page.waitForFunction(() => {
      try {
        const b = window.ITT && window.ITT.activeBrowser;
        const loc = document.getElementById('location');
        const val = (loc && loc.value) || '';
        return val.indexOf('https://') === 0 || (b && typeof b.setSecureMode === 'function');
      } catch (e) {
        return false;
      }
    }, null, { timeout: 10000 });

    await frame.locator('input[name="name"]').fill('Test Buyer');
    await frame.locator('input[name="email"]').fill('buyer@example.com');
    await frame.locator('form[data-checkout-form] input[type="submit"]').click({ force: true });

    // Thanks page
    await expect(frame.locator('body[data-order-thanks]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('body')).toContainText(/Thank you for your order/i);

    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const orders = JSON.parse(localStorage.getItem('itt95-amazon-orders') || '[]');
          const mail = JSON.parse(localStorage.getItem('itt95-order-mail') || '[]');
          const cart = JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]');
          return {
            orders: Array.isArray(orders) ? orders.length : 0,
            mail: Array.isArray(mail) ? mail.length : 0,
            cart: Array.isArray(cart) ? cart.length : 0,
          };
        } catch (e) {
          return { orders: -1, mail: -1, cart: -1 };
        }
      });
    }, { timeout: 10000 }).toEqual({ orders: 1, mail: 1, cart: 0 });

    const state = await page.evaluate(() => ({
      orders: JSON.parse(localStorage.getItem('itt95-amazon-orders') || '[]'),
      mail: JSON.parse(localStorage.getItem('itt95-order-mail') || '[]'),
    }));
    expect(state.mail[0].from).toMatch(/amazon/i);
    expect(state.orders[0].name).toMatch(/Test Buyer/i);
  });

  test('add-to-cart uses period input control', async ({ page }) => {
    await enterYear(page, '1995');
    await goInFrame(page, 'sites/amazon/book-neuromancer.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1995');
    const add = frame.locator('[data-add-cart]').first();
    await expect(add).toBeVisible({ timeout: 15000 });
    const tag = await add.evaluate((el) => el.tagName.toLowerCase());
    expect(tag).toBe('input');
    const type = await add.getAttribute('type');
    expect(['button', 'submit']).toContain(type);
  });
});
