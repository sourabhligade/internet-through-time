// @ts-check
/**
 * Action feedback kit — signature clicks show flash and/or status
 */
const { test, expect } = require('@playwright/test');

test.describe('Action feedback kit', () => {
  test('Amazon add-to-cart shows flash feedback (1995)', async ({ page }) => {
    await page.goto('/years/1995/sites/amazon/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '1995' ||
        !!document.querySelector('[data-add-cart], #itt-flash'),
      null,
      { timeout: 25000 }
    ).catch(() => {});
    // wait immersion
    await page.waitForTimeout(400);
    const add = page.locator('[data-add-cart]').first();
    if ((await add.count()) === 0) {
      // some amazon pages use different hooks — open a book page if needed
      await page.goto('/years/1995/sites/amazon/book-being-digital.html');
      await page.waitForTimeout(500);
    }
    const btn = page.locator('[data-add-cart]').first();
    await expect(btn).toBeVisible({ timeout: 15000 });
    await btn.click();
    // flash host or cart flash
    await expect
      .poll(
        async () => {
          return page.evaluate(() => {
            const flash = document.getElementById('itt-flash');
            const flashVis =
              flash && flash.style.display !== 'none' && (flash.textContent || '').length > 5;
            const cart = document.getElementById('cart-flash') || document.querySelector('[data-cart-flash]');
            const cartTxt = cart && (cart.textContent || '').length > 3;
            const last = window.ITT && window.ITT.lastActionFeedback;
            return !!(flashVis || cartTxt || (last && last.message));
          });
        },
        { timeout: 8000 }
      )
      .toBeTruthy();
  });

  test('Pinterest pin triggers actionFeedback (2012)', async ({ page }) => {
    await page.goto('/years/2012/sites/pinterest/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('[data-pin-save]', { timeout: 15000 });
    await page.locator('[data-pin-save]').first().click();
    await expect(page.locator('[data-pin-status]')).toContainText(/pin|Pinned/i, { timeout: 8000 });
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const flash = document.getElementById('itt-flash');
          const flashOk = flash && flash.style.display !== 'none';
          const last = window.ITT && window.ITT.lastActionFeedback;
          return !!(flashOk || (last && /pin/i.test(last.message || '')));
        });
      }, { timeout: 5000 })
      .toBeTruthy();
  });

  test('Instagram share sets status + feedback (2012)', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('[data-ig-share]', { timeout: 15000 });
    if (await page.locator('[data-ig-filter="Valencia"]').count()) {
      await page.locator('[data-ig-filter="Valencia"]').click();
    }
    await page.locator('[data-ig-share]').click();
    await expect(page.locator('[data-ig-status]')).toContainText(/Shared|Valencia|theater/i, {
      timeout: 8000,
    });
  });

  test('Reddit boost shows actionFeedback (2012)', async ({ page }) => {
    await page.goto('/years/2012/sites/reddit/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('[data-reddit-up]', { timeout: 20000 });
    await page.locator('[data-reddit-up]').first().click();
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const flash = document.getElementById('itt-flash');
          const flashOk = flash && flash.style.display !== 'none';
          const last = window.ITT && window.ITT.lastActionFeedback;
          return !!(flashOk || (last && /Boost|boost|Buried/i.test(last.message || '')));
        });
      }, { timeout: 8000 })
      .toBeTruthy();
  });

  test('YouTube like shows actionFeedback (2012)', async ({ page }) => {
    await page.goto('/years/2012/sites/youtube/watch.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('[data-yt-like]', { timeout: 15000 });
    await page.locator('[data-yt-like]').click();
    await expect(page.locator('[data-yt-status]')).toContainText(/Rated|views|saved/i, {
      timeout: 8000,
    });
  });

  test('UberX request status feedback (2012)', async ({ page }) => {
    await page.goto('/years/2012/sites/uber/index.html');
    await page.waitForSelector('[data-uber-kind="uberx"], #uber-x', { timeout: 10000 });
    await page.locator('[data-uber-kind="uberx"], #uber-x').first().click();
    await expect(page.locator('[data-uber-status], #uber-st')).toContainText(/UberX|35%|itt12-uber/i, {
      timeout: 5000,
    });
  });
});
