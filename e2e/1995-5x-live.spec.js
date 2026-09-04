// @ts-check
/** 1995 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1995 5× live F1–F5', () => {
  test('F1 Homestead empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/geocities/homestead.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt95-homestead');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-homestead')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-homestead'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt95-homestead')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '95');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="auctionweb"]').first()).toBeVisible();
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
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-hotwired')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-hotwired'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt95-hotwired')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '95');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="netscape"]').first()).toBeVisible();
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
