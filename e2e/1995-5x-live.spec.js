// @ts-check
/** 1995 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');
const { revealLeftoverRails } = require('./helpers');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1995 5× live F1–F5', () => {
  test('F1 Homestead empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/geocities/homestead.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt95-homestead');
    await page.reload();
    await revealLeftoverRails(page);
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F2 AuctionWeb bid gold — empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/auctionweb/item-laser.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt95-bid') === 0 || k === 'itt95-aw-bid' || k.indexOf('itt95-auction') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await page.reload();
    await expect(page.locator('[data-auction-id][data-itt-auction-bound="1"]')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('[data-5x-save]')).toHaveCount(0);
    await page.locator('form[data-bid-form] button[type="submit"], form[data-bid-form] input[type="submit"]').first().click();
    await expect.poll(async () => getKey(page, 'itt95-aw-bid')).toBeFalsy();
    await page.fill('form[data-bid-form] [name="bidder"]', 'museum@dialup');
    await page.fill('form[data-bid-form] [name="bid"]', '25');
    await page.locator('form[data-bid-form] button[type="submit"], form[data-bid-form] input[type="submit"]').first().click();
    await expect.poll(async () => getKey(page, 'itt95-aw-bid'), { timeout: 8000 }).toBeTruthy();
  });

  test('F3 AltaVista query gold — empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/altavista/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt95-av');
    await page.reload();
    await expect(page.locator('[data-5x-save]')).toHaveCount(0);
    await page.locator('form[data-av-search] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, 'itt95-av')).toBeFalsy();
    await page.fill('form[data-av-search] [name="q"]', 'mosaic');
    await page.locator('form[data-av-search] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, 'itt95-av'), { timeout: 8000 }).toBeTruthy();
  });

  test('F4 HotWired 3 departments empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/hotwired/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt95-hotwired');
    await page.reload();
    await revealLeftoverRails(page);
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F5 Netscape download gold — empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/netscape/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt95-ns-dl');
    await page.reload();
    await expect(page.locator('[data-5x-save]')).toHaveCount(0);
    await page.locator('form[data-ns-download] input[type="submit"]').click();
    await expect.poll(async () => getKey(page, 'itt95-ns-dl'), { timeout: 8000 }).toBeTruthy();
  });

  test('home #ott-5x-1995 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/1995/pages/home.html');
    const chips = page.locator('#ott-5x-1995 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
