// @ts-check
/** 2020 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2020 5× live F1–F5', () => {
  test('F1 Quibi 6-min empty never writes', async ({ page }) => {
    await page.goto('/years/2020/sites/quibi/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt20-quibi');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-quibi')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-quibi'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt20-quibi')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '20');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="reels.html"]').first()).toBeVisible();
  });

  test('F2 Reels 15s empty never writes', async ({ page }) => {
    await page.goto('/years/2020/sites/instagram/reels.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt20-reels');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-reels')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-reels'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt20-reels')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '20');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="eol.html"]').first()).toBeVisible();
  });

  test('F3 Flash EOL empty never writes', async ({ page }) => {
    await page.goto('/years/2020/sites/flash/eol.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt20-flash');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-flash')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-flash'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt20-flash')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '20');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="ccpa"]').first()).toBeVisible();
  });

  test('F4 CCPA empty never writes', async ({ page }) => {
    await page.goto('/years/2020/sites/ccpa/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt20-ccpa-dns');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-ccpa-dns')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-ccpa-dns'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt20-ccpa-dns')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '20');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="island.html"]').first()).toBeVisible();
  });

  test('F5 ACNH empty never writes', async ({ page }) => {
    await page.goto('/years/2020/sites/acnh/island.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt20-acnh');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-acnh')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt20-acnh'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt20-acnh')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '20');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="zoom"]').first()).toBeVisible();
  });

  test('home #ott-5x-2020 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2020/pages/home.html');
    const chips = page.locator('#ott-5x-2020 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
