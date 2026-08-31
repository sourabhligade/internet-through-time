// @ts-check
/** 2008 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2008 5× live F1–F5', () => {
  test('F1 App Store library empty never writes', async ({ page }) => {
    await page.goto('/years/2008/sites/appstore/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt08-appstore');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-appstore')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-appstore'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt08-appstore')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '08');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="chrome"]').first()).toBeVisible();
  });

  test('F2 Chrome 3-check empty never writes', async ({ page }) => {
    await page.goto('/years/2008/sites/chrome/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt08-chrome');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-chrome')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-chrome'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt08-chrome')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '08');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="android"]').first()).toBeVisible();
  });

  test('F3 Android Market empty never writes', async ({ page }) => {
    await page.goto('/years/2008/sites/android/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt08-g1');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-g1')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-g1'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt08-g1')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '08');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="hulu"]').first()).toBeVisible();
  });

  test('F4 Hulu queue empty never writes', async ({ page }) => {
    await page.goto('/years/2008/sites/hulu/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt08-hulu');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-hulu')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-hulu'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt08-hulu')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '08');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="dropbox"]').first()).toBeVisible();
  });

  test('F5 Dropbox folder empty never writes', async ({ page }) => {
    await page.goto('/years/2008/sites/dropbox/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt08-db');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-db')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt08-db'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt08-db')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '08');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="issue.html"]').first()).toBeVisible();
  });

  test('home #ott-5x-2008 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2008/pages/home.html');
    const chips = page.locator('#ott-5x-2008 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
