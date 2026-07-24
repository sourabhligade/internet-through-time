// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('auction low-bid rejection', () => {
  test('1995 AuctionWeb rejects bid at or below high', async ({ page }) => {
    const messages = [];
    page.on('dialog', async (dialog) => {
      messages.push(dialog.message());
      await dialog.accept();
    });

    await enterYear(page, '1995');
    // clear prior bids
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt95-bid') !== -1 || k.indexOf('itt95-auction') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });

    await goInFrame(page, 'sites/auctionweb/item-laser.html');
    await waitForImmersion(page, '1995');
    const frame = contentFrame(page);

    await expect(frame.locator('form[data-bid-form]')).toBeVisible({ timeout: 15000 });
    // min is 5 — bid 3 should fail
    await frame.locator('input[name="bidder"]').fill('cheapskate');
    await frame.locator('input[name="bid"]').fill('3');
    await frame.locator('form[data-bid-form] input[type="submit"]').click({ force: true });

    await expect.poll(() => messages.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(messages.join(' ')).toMatch(/higher|must be/i);

    // high bid should still be opening (~$5)
    const high = await frame.locator('[data-high-bid]').innerText();
    expect(high).toMatch(/\$?5/);
  });

  test('1997 eBay rejects bid at or below current high', async ({ page }) => {
    const messages = [];
    page.on('dialog', async (dialog) => {
      messages.push(dialog.message());
      await dialog.accept();
    });

    await enterYear(page, '1997');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('itt97-bid') !== -1 || k.indexOf('itt97-auction') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });

    await goInFrame(page, 'sites/ebay/item-laptop.html');
    await waitForImmersion(page, '1997');
    const frame = contentFrame(page);

    await expect(frame.locator('form[data-bid-form]')).toBeVisible({ timeout: 15000 });
    // min 425 — bid 100 should fail
    await frame.locator('input[name="bid"]').fill('100');
    await frame.locator('form[data-bid-form] input[type="submit"]').click({ force: true });

    await expect.poll(() => messages.length, { timeout: 10000 }).toBeGreaterThan(0);
    expect(messages.join(' ')).toMatch(/higher|must be/i);
  });
});
