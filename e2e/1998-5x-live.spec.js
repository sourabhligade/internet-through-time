// @ts-check
/** 1998 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1998 5× live F1–F5', () => {
  test('F1 Babel Fish empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/altavista/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-babelfish');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-babelfish')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-babelfish'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt98-babelfish')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '98');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="google"]').first()).toBeVisible();
  });

  test('F2 Google catalog empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/google/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-google-q');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-google-q')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-google-q'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt98-google-q')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '98');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="amazon"]').first()).toBeVisible();
  });

  test('F3 Amazon Music CD empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/amazon/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-amzn-cd');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-amzn-cd')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-amzn-cd'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt98-amzn-cd')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '98');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="dmoz"]').first()).toBeVisible();
  });

  test('F4 DMOZ 2-level empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/dmoz/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-dmoz');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-dmoz')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-dmoz'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt98-dmoz')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '98');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="mozilla"]').first()).toBeVisible();
  });

  test('F5 Mozilla split empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/mozilla/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-mozilla');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-mozilla')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt98-mozilla'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt98-mozilla')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '98');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="lucky.html"]').first()).toBeVisible();
  });

  test('home #ott-5x-1998 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/1998/pages/home.html');
    const chips = page.locator('#ott-5x-1998 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
