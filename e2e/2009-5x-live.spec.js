// @ts-check
/** 2009 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2009 5× live F1–F5', () => {
  test('F1 Foursquare check-in empty never writes', async ({ page }) => {
    await page.goto('/years/2009/sites/foursquare/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt09-foursquare');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-foursquare')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-foursquare'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt09-foursquare')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '09');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="farmville"]').first()).toBeVisible();
  });

  test('F2 FarmVille neighbor empty never writes', async ({ page }) => {
    await page.goto('/years/2009/sites/farmville/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt09-farm-5x');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-farm-5x')).toBeFalsy();
    await expect.poll(async () => getKey(page, 'itt09-farm')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-farm-5x'), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, 'itt09-farm')).toBeFalsy();
    const raw = (await getKey(page, 'itt09-farm-5x')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '09');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="bing"]').first()).toBeVisible();
  });

  test('F3 Bing catalog empty never writes', async ({ page }) => {
    await page.goto('/years/2009/sites/bing/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt09-bing');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-bing')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-bing'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt09-bing')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '09');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="stackoverflow"]').first()).toBeVisible();
  });

  test('F4 SO accept empty never writes', async ({ page }) => {
    await page.goto('/years/2009/sites/stackoverflow/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt09-so-accepted');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-so-accepted')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-so-accepted'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt09-so-accepted')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '09');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="windows7"]').first()).toBeVisible();
  });

  test('F5 Win7 / IE8 empty never writes', async ({ page }) => {
    await page.goto('/years/2009/sites/windows7/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt09-w7');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-w7')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt09-w7'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt09-w7')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '09');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="feed.html"]').first()).toBeVisible();
  });

  test('home #ott-5x-2009 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2009/pages/home.html');
    const chips = page.locator('#ott-5x-2009 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
