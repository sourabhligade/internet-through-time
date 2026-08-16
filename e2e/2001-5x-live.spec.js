// @ts-check
/** 2001 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2001 5× live F1–F5', () => {
  test('F1 Wiki edit→history empty never writes', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt01-wiki-pages');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-wiki-pages')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-wiki-pages'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt01-wiki-pages')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '01');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="apple"]').first()).toBeVisible();
  });

  test('F2 iPod library empty never writes', async ({ page }) => {
    await page.goto('/years/2001/sites/apple/ipod.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt01-ipod');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-ipod')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-ipod'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt01-ipod')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '01');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="wayback"]').first()).toBeVisible();
  });

  test('F3 Wayback lookup empty never writes', async ({ page }) => {
    await page.goto('/years/2001/sites/wayback/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt01-wayback');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-wayback')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-wayback'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt01-wayback')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '01');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="movabletype"]').first()).toBeVisible();
  });

  test('F4 Movable Type empty never writes', async ({ page }) => {
    await page.goto('/years/2001/sites/movabletype/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt01-mt');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-mt')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-mt'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt01-mt')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '01');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="broadband"]').first()).toBeVisible();
  });

  test('F5 Always-on ISP empty never writes', async ({ page }) => {
    await page.goto('/years/2001/sites/broadband/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt01-bb');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-bb')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt01-bb'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt01-bb')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '01');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="msn"]').first()).toBeVisible();
  });

  test('home #ott-5x-2001 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2001/pages/home.html');
    const chips = page.locator('#ott-5x-2001 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
