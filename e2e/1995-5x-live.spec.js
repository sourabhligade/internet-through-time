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

  test('F2 AuctionWeb bid empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/auctionweb/item-laser.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt95-aw-bid');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-aw-bid')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-aw-bid'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt95-aw-bid')) || '';
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
    await expect(page.locator('[data-5x-next] a[href*="altavista"]').first()).toBeVisible();
  });

  test('F3 AltaVista catalog empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/altavista/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt95-av');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-av')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-av'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt95-av')) || '';
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
    await expect(page.locator('[data-5x-next] a[href*="hotwired"]').first()).toBeVisible();
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

  test('F5 What’s Cool empty never writes', async ({ page }) => {
    await page.goto('/years/1995/sites/netscape/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt95-cool');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-cool')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt95-cool'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt95-cool')) || '';
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
    await expect(page.locator('[data-5x-next] a[href*="ssl-checkout.html"]').first()).toBeVisible();
  });

  test('home #ott-5x-1995 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/1995/pages/home.html');
    const chips = page.locator('#ott-5x-1995 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
