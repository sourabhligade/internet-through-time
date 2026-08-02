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

  test('Auction bid shows flash feedback (1995)', async ({ page }) => {
    await page.goto('/years/1995/sites/auctionweb/item-laser.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt95') === 0 && k.indexOf('bid') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '1995',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('form[data-bid-form]', { timeout: 15000 });
    await page.fill('form[data-bid-form] input[name="bidder"]', 'FbUser');
    await page.fill('form[data-bid-form] input[name="bid"]', '40.00');
    await page.locator('form[data-bid-form] input[type="submit"]').click({ force: true });
    await expect(page.locator('[data-high-bidder]')).toContainText('FbUser', { timeout: 10000 });
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const flash = document.getElementById('itt-flash');
          const flashOk = flash && flash.style.display !== 'none' && (flash.textContent || '').length > 5;
          const last = window.ITT && window.ITT.lastActionFeedback;
          return !!(flashOk || (last && /bidder|bid/i.test(last.message || '')));
        });
      }, { timeout: 8000 })
      .toBeTruthy();
  });

  test('HoTMaiL login feedback or inbox (1996)', async ({ page }) => {
    await page.goto('/years/1996/sites/hotmail/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '1996',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('form[data-hotmail-login]', { timeout: 15000 });
    await page.fill('form[data-hotmail-login] input[name="login"]', 'feedback');
    await page
      .locator('form[data-hotmail-login] input[type="password"], form[data-hotmail-login] input[name="pass"]')
      .first()
      .fill('x');
    await page
      .locator(
        'form[data-hotmail-login] input[type="image"], form[data-hotmail-login] input[type="submit"]'
      )
      .first()
      .click({ force: true });
    await page.waitForTimeout(900);
    // Login may navigate to inbox (flash left behind) — accept storage, flash, or inbox UI
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const flash = document.getElementById('itt-flash');
          const flashOk = flash && flash.style.display !== 'none' && (flash.textContent || '').length > 3;
          const last = window.ITT && window.ITT.lastActionFeedback;
          const user = localStorage.getItem('itt96-hotmail-user');
          const body = (document.body && document.body.innerText) || '';
          const inbox = /Inbox|Compose|Folders|New Mail/i.test(body);
          return !!(flashOk || (last && last.message) || user || inbox);
        });
      }, { timeout: 8000 })
      .toBeTruthy();
  });

  test('App Store install feedback (2008)', async ({ page }) => {
    await page.goto('/years/2008/sites/appstore/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2008',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('[data-appstore-install]', { timeout: 15000 });
    await page.locator('[data-appstore-install]').first().click();
    await expect(page.locator('[data-appstore-status]')).toContainText(/Install|Already|Free|app/i, {
      timeout: 8000,
    });
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const last = window.ITT && window.ITT.lastActionFeedback;
          const st = document.querySelector('[data-appstore-status]');
          return !!(
            (last && last.message) ||
            (st && (st.textContent || '').length > 5)
          );
        });
      }, { timeout: 5000 })
      .toBeTruthy();
  });

  test('del.icio.us post feedback (2005)', async ({ page }) => {
    await page.goto('/years/2005/sites/delicious/index.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2005',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('[data-delicious-post]', { timeout: 15000 });
    await page.fill('[data-delicious-post] [name="url"]', 'http://example.com/fb');
    await page.fill('[data-delicious-post] [name="title"]', 'Feedback pin');
    await page.locator('[data-delicious-post] button[type="submit"]').click();
    await expect(page.locator('[data-delicious-status]')).toContainText(/Posted|del\.icio/i, {
      timeout: 8000,
    });
  });

  test('Blogger publish feedback path (2005)', async ({ page }) => {
    await page.goto('/years/2005/sites/blogger/edit.html');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2005',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('[data-blogger-post]', { timeout: 15000 });
    await page.fill('[data-blogger-post] [name="title"]', 'FbBlog');
    await page.fill('[data-blogger-post] [name="body"]', 'feedback body');
    await page.locator('[data-blogger-post] input[type="submit"]').click();
    await page.waitForTimeout(800);
    // navigates to view or shows status
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const last = window.ITT && window.ITT.lastActionFeedback;
          const blog = localStorage.getItem('itt05-blog');
          return !!(blog && blog.indexOf('FbBlog') !== -1) || !!(last && last.message);
        });
      }, { timeout: 10000 })
      .toBeTruthy();
  });
});
