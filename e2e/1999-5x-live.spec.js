// @ts-check
/** 1999 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1999 5× live F1–F5', () => {
  test('F1 Napster search empty never writes', async ({ page }) => {
    await page.goto('/years/1999/sites/napster/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt99-napster');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt99-napster')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt99-napster'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt99-napster')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '99');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="blogger"]').first()).toBeVisible();
  });

  test('F2 Blogger permalink empty never writes', async ({ page }) => {
    await page.goto('/years/1999/sites/blogger/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt99-blogger');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt99-blogger')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt99-blogger'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt99-blogger')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '99');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="paypal"]').first()).toBeVisible();
  });

  test('F3 PayPal send residual empty never writes', async ({ page }) => {
    await page.goto('/years/1999/sites/paypal/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt99-paypal');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt99-paypal')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt99-paypal'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt99-paypal')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '99');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="ebay"]').first()).toBeVisible();
  });

  test('F4 eBay watch empty never writes', async ({ page }) => {
    await page.goto('/years/1999/sites/ebay/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt99-ebay');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt99-ebay')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt99-ebay'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt99-ebay')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '99');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="y2k"]').first()).toBeVisible();
  });

  test('F5 Y2K remediation gold — empty never writes', async ({ page }) => {
    await page.goto('/years/1999/sites/y2k/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt99-y2k');
    await page.reload();
    await expect(page.locator('[data-5x-save]')).toHaveCount(0);
    await page.locator('form[data-y2k-form] button[type="submit"]').click();
    await expect.poll(async () => getKey(page, 'itt99-y2k')).toBeFalsy();
    await page.locator('[data-y2k-sys="cobol"]').check();
    await page.locator('[data-y2k-sys="embed"]').check();
    await page.locator('form[data-y2k-form] button[type="submit"]').click();
    await expect.poll(async () => getKey(page, 'itt99-y2k'), { timeout: 8000 }).toBeTruthy();
  });

  test('home #ott-5x-1999 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/1999/pages/home.html');
    const chips = page.locator('#ott-5x-1999 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
