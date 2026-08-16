// @ts-check
/** 2003 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2003 5× live F1–F5', () => {
  test('F1 iTunes 99¢ empty never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt03-itunes');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-itunes')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-itunes'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt03-itunes')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '03');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="wordpress"]').first()).toBeVisible();
  });

  test('F2 WordPress publish empty never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt03-wp');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-wp')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-wp'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt03-wp')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '03');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="linkedin"]').first()).toBeVisible();
  });

  test('F3 LinkedIn invite empty never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/linkedin/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt03-li');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-li')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-li'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt03-li')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '03');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="myspace"]').first()).toBeVisible();
  });

  test('F4 MySpace Top 8 empty never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/myspace/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt03-ms-top8-5x');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-ms-top8-5x')).toBeFalsy();
    await expect.poll(async () => getKey(page, 'itt03-ms-top8')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-ms-top8-5x'), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, 'itt03-ms-top8')).toBeFalsy();
    const raw = (await getKey(page, 'itt03-ms-top8-5x')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '03');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="adsense"]').first()).toBeVisible();
  });

  test('F5 AdSense report empty never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/adsense/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt03-adsense');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-adsense')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt03-adsense'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt03-adsense')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '03');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="photobucket"]').first()).toBeVisible();
  });

  test('home #ott-5x-2003 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2003/pages/home.html');
    const chips = page.locator('#ott-5x-2003 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
