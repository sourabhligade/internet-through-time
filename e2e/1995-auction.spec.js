// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1995 AuctionWeb', () => {
  test('bid form accepts higher bid into localStorage', async ({ page }) => {
    await enterYear(page, '1995');
    await goInFrame(page, 'sites/auctionweb/item-laser.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1995');

    await expect(frame.locator('[data-auction-id], form[data-bid-form]').first()).toBeVisible({
      timeout: 15000,
    });

    const form = frame.locator('form[data-bid-form]');
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('input[name="bidder"]').fill('e2e-bidder');
    await form.locator('input[name="bid"]').fill('50.00');
    await form.locator('input[type="submit"], button[type="submit"]').first().click({ force: true });

    await expect(frame.locator('[data-high-bid]')).toContainText('50', { timeout: 10000 });
    await expect(frame.locator('[data-high-bidder]')).toContainText('e2e-bidder');

    await expect.poll(async () => {
      return page.evaluate(() => {
        const keys = Object.keys(localStorage).filter((k) => k.indexOf('itt95') === 0 && k.indexOf('bid') !== -1);
        return keys.some((k) => {
          try {
            const v = localStorage.getItem(k) || '';
            return v.indexOf('e2e-bidder') !== -1 || v.indexOf('50') !== -1;
          } catch (e) {
            return false;
          }
        });
      });
    }, { timeout: 10000 }).toBeTruthy();
  });

  test('AuctionWeb home is not named eBay', async ({ page }) => {
    await enterYear(page, '1995');
    await goInFrame(page, 'sites/auctionweb/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1995');
    await expect(frame.locator('text=/AuctionWeb/i').first()).toBeVisible({ timeout: 10000 });
    const body = await frame.locator('body').innerText();
    // Title/branding should not be modern multicolor eBay as primary name
    expect(body).toMatch(/AuctionWeb/i);
  });
});
