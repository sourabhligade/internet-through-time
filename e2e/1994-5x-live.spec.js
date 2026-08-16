// @ts-check
/** 1994 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1994 5× live F1–F5', () => {
  test('F1 IUMA listen empty never writes', async ({ page }) => {
    await page.goto('/years/1994/sites/iuma/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt94-iuma');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-iuma')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-iuma'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt94-iuma')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '94');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="fishcam"]').first()).toBeVisible();
  });

  test('F2 FishCam empty never writes', async ({ page }) => {
    await page.goto('/years/1994/sites/fishcam/index.html');
    await page.evaluate((keys) => {
      keys.forEach((k) => { try { localStorage.removeItem(k); } catch (e) {} });
    }, ['itt94-fishcam', 'itt94-fishcam-5x', 'itt94-fishcam-n']);
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-fishcam-5x')).toBeFalsy();
    await expect.poll(async () => getKey(page, 'itt94-fishcam')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-fishcam-5x'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt94-fishcam-5x')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '94');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="whitehouse"]').first()).toBeVisible();
  });

  test('F3 White House map empty never writes', async ({ page }) => {
    await page.goto('/years/1994/sites/whitehouse/index.html');
    await page.evaluate((keys) => {
      keys.forEach((k) => { try { localStorage.removeItem(k); } catch (e) {} });
    }, ['itt94-wh-map', 'itt94-wh-map-5x']);
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-wh-map-5x')).toBeFalsy();
    await expect.poll(async () => getKey(page, 'itt94-wh-map')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-wh-map-5x'), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, 'itt94-wh-map')).toBeFalsy();
    const raw = (await getKey(page, 'itt94-wh-map-5x')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '94');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="yahoo"]').first()).toBeVisible();
  });

  test('F4 Yahoo 3-hub empty never writes', async ({ page }) => {
    await page.goto('/years/1994/sites/yahoo/index.html');
    await page.evaluate((keys) => {
      keys.forEach((k) => { try { localStorage.removeItem(k); } catch (e) {} });
    }, ['itt94-yahoo-wander', 'itt94-yahoo-5x']);
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-yahoo-5x')).toBeFalsy();
    await expect.poll(async () => getKey(page, 'itt94-yahoo-wander')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-yahoo-5x'), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, 'itt94-yahoo-wander')).toBeFalsy();
    const raw = (await getKey(page, 'itt94-yahoo-5x')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '94');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="ncsa"]').first()).toBeVisible();
  });

  test('F5 What’s New / NCSA empty never writes', async ({ page }) => {
    await page.goto('/years/1994/sites/ncsa/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt94-whatsnew');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-whatsnew')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt94-whatsnew'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt94-whatsnew')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '94');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="csotd"]').first()).toBeVisible();
  });

  test('home #ott-5x-1994 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/1994/pages/home.html');
    const chips = page.locator('#ott-5x-1994 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
