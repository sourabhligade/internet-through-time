// @ts-check
/**
 * 2000 multi-step trails — real localStorage (itt00).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} keys
 */
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

test.describe('2000 trail A — Smile commerce', () => {
  test('Amazon smile home → music add → cart storage (itt00)', async ({ page }) => {
    await enterYear(page, '2000');
    await clearKeys(page, ['itt00-amazon-cart', 'itt99-amazon-cart']);
    await goInFrame(page, 'sites/amazon/index.html');
    await waitForImmersion(page, '2000');
    let frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Amazon/i, { timeout: 15000 });
    await expect(frame.locator('img[src*="smile"], img[src*="logo-smile"]').first()).toBeVisible({
      timeout: 10000,
    });

    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '2000');
    frame = contentFrame(page);
    const add = frame.locator('[data-add-cart]').first();
    await expect(add).toBeVisible({ timeout: 10000 });
    await add.click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt00-amazon-cart')), {
        timeout: 10000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt99-amazon-cart'))).toBeNull();

    await goInFrame(page, 'sites/amazon/cart.html');
    await waitForImmersion(page, '2000');
    frame = contentFrame(page);
    await expect(frame.locator('[data-cart-list]').first()).toContainText(/Music|CD|album|OK Computer|Radiohead|\$/i, {
      timeout: 10000,
    });
  });
});

test.describe('2000 trail B — Napster → Pets lore', () => {
  test('Napster search → Pets shutdown path', async ({ page }) => {
    await enterYear(page, '2000');
    await goInFrame(page, 'sites/napster/search.html?q=radiohead');
    await waitForImmersion(page, '2000');
    let frame = contentFrame(page);
    await expect(frame.locator('#napster-results').first()).toContainText(/Radiohead|mp3|Download|result/i, {
      timeout: 15000,
    });

    await goInFrame(page, 'sites/pets/index.html');
    await waitForImmersion(page, '2000');
    frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Pets\.com|sock puppet/i, { timeout: 15000 });

    await goInFrame(page, 'sites/pets/shutdown.html');
    await waitForImmersion(page, '2000');
    frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/November|shutdown|closed|2000/i);
  });
});
