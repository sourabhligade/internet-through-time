// @ts-check
/** 2013 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2013 5× live F1–F5', () => {
  test('F1 Tinder trail empty never writes', async ({ page }) => {
    await page.goto('/years/2013/sites/tinder/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt13-tinder');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-tinder')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-tinder'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt13-tinder')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '13');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="snapchat"]').first()).toBeVisible();
  });

  test('F2 Snap 24h empty never writes', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt13-snap-story');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-snap-story')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-snap-story'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt13-snap-story')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '13');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="video.html"]').first()).toBeVisible();
  });

  test('F3 IG Video 15s empty never writes', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt13-igvid');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-igvid')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-igvid'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt13-igvid')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '13');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="iphone"]').first()).toBeVisible();
  });

  test('F4 iOS 7 / Touch ID empty never writes', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt13-ios7');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-ios7')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-ios7'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt13-ios7')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '13');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="snowden"]').first()).toBeVisible();
  });

  test('F5 Snowden Jun 2013 empty never writes', async ({ page }) => {
    await page.goto('/years/2013/sites/snowden/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt13-snowden-5x');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-snowden-5x')).toBeFalsy();
    await expect.poll(async () => getKey(page, 'itt13-snowden')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt13-snowden-5x'), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, 'itt13-snowden')).toBeFalsy();
    const raw = (await getKey(page, 'itt13-snowden-5x')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '13');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="record.html"]').first()).toBeVisible();
  });

  test('home #ott-5x-2013 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    const chips = page.locator('#ott-5x-2013 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
