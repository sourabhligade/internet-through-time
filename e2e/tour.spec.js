// @ts-check
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

/** 1998 tour steps from config/immersion-1998.js */
const TOUR_1998 = [
  { id: 'google', path: 'sites/google/index.html' },
  { id: 'yahoo', path: 'sites/yahoo/index.html' },
  { id: 'amazon', path: 'sites/amazon/music.html' },
  { id: 'ebay', path: 'sites/ebay/index.html' },
  { id: 'excite', path: 'sites/excite/index.html' },
  { id: 'hotmail', path: 'sites/hotmail/index.html' },
];

test.describe('guided tour', () => {
  test('1998 tour marks steps done and completes', async ({ page }) => {
    await enterYear(page, '1998');

    // Clear prior tour state
    await page.evaluate(() => {
      const keys = Object.keys(localStorage).filter(
        (k) => k.indexOf('itt98-tour') !== -1 || k.indexOf('itt98-bid') !== -1
      );
      keys.forEach((k) => localStorage.removeItem(k));
    });

    await goInFrame(page, 'pages/home.html');
    await waitForImmersion(page, '1998');

    // Visit alone only marks visited. Product actions call markTourUsed.
    // Google Search → results page stamps "google"
    await goInFrame(page, 'sites/google/index.html');
    await waitForImmersion(page, '1998');
    let frame = contentFrame(page);
    await frame.locator('input[name="q"]').fill('yahoo');
    await frame.locator('input[name="btnG"], input[value="Google Search"]').first().click({ force: true });
    await expect(contentFrame(page).locator('[data-google-results]')).toBeVisible({ timeout: 15000 });
    await waitForImmersion(page, '1998');

    // My Yahoo! toggle stamps "yahoo"
    await goInFrame(page, 'sites/yahoo/my.html');
    await waitForImmersion(page, '1998');
    frame = contentFrame(page);
    await frame.locator('[data-yahoo-toggle]').first().click({ force: true });

    // Amazon Music add-to-cart stamps "amazon"
    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '1998');
    frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });

    // eBay bid stamps "ebay"
    await goInFrame(page, 'sites/ebay/item-laptop.html');
    await waitForImmersion(page, '1998');
    frame = contentFrame(page);
    await frame.locator('input[name="bid"]').fill('999');
    page.once('dialog', (d) => d.accept().catch(() => {}));
    await frame.locator('form[data-bid-form] input[type="submit"]').click({ force: true });

    // Excite personalize toggle stamps "excite"
    await goInFrame(page, 'sites/excite/index.html');
    await waitForImmersion(page, '1998');
    frame = contentFrame(page);
    await frame.locator('[data-excite-toggle]').first().click({ force: true });

    // Hotmail sign-in stamps "hotmail"
    await goInFrame(page, 'sites/hotmail/index.html');
    await waitForImmersion(page, '1998');
    frame = contentFrame(page);
    await frame.locator('input[name="login"]').fill('tourtester');
    await frame.locator('input[name="pass"]').fill('x');
    await frame.locator('form[data-hotmail-login] input[type="submit"]').click({ force: true });
    await page.waitForTimeout(400);

    // Return home and assert tour UI
    await goInFrame(page, 'pages/home.html');
    await waitForImmersion(page, '1998');
    frame = contentFrame(page);
    await expect(frame.locator('[data-itt-tour]')).toBeVisible({ timeout: 15000 });
    const n = TOUR_1998.length;
    await expect(frame.locator('[data-itt-tour]')).toContainText(
      new RegExp(n + '\\/' + n + '|Tour complete', 'i'),
      { timeout: 15000 }
    );
  });
});
