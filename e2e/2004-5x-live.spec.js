// @ts-check
/** 2004 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2004 5× live F1–F5', () => {
  test('F1 Flickr stream empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-flickr');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-flickr')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-flickr'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt04-flickr')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '04');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="gmail"]').first()).toBeVisible();
  });

  test('F2 Gmail invite empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-gmail');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-gmail')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-gmail'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt04-gmail')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '04');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="firefox"]').first()).toBeVisible();
  });

  test('F3 Firefox 1.0 thanks empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-fx');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-fx')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-fx'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt04-fx')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '04');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="digg"]').first()).toBeVisible();
  });

  test('F4 Digg seed vote empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/digg/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-digg');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-digg')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-digg'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt04-digg')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '04');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="folklore"]').first()).toBeVisible();
  });

  test('F5 folklore story empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/folklore/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-folk');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-folk')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt04-folk'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt04-folk')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '04');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="networks.html"]').first()).toBeVisible();
  });

  test('home #ott-5x-2004 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2004/pages/home.html');
    const chips = page.locator('#ott-5x-2004 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
