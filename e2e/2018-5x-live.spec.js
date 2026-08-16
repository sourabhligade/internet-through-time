// @ts-check
/** 2018 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2018 5× live F1–F5', () => {
  test('F1 TikTok FYP empty never writes', async ({ page }) => {
    await page.goto('/years/2018/sites/tiktok/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt18-tiktok-fyp');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-tiktok-fyp')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-tiktok-fyp'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt18-tiktok-fyp')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '18');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="trust"]').first()).toBeVisible();
  });

  test('F2 Hearing empty never writes', async ({ page }) => {
    await page.goto('/years/2018/sites/trust/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt18-hearing');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-hearing')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-hearing'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt18-hearing')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '18');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="igtv.html"]').first()).toBeVisible();
  });

  test('F3 IGTV empty never writes', async ({ page }) => {
    await page.goto('/years/2018/sites/instagram/igtv.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt18-igtv');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-igtv')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-igtv'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt18-igtv')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '18');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="chrome"]').first()).toBeVisible();
  });

  test('F4 Chrome Not Secure empty never writes', async ({ page }) => {
    await page.goto('/years/2018/sites/chrome/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt18-notsec');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-notsec')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-notsec'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt18-notsec')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '18');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="spectre"]').first()).toBeVisible();
  });

  test('F5 Spectre / HomePod empty never writes', async ({ page }) => {
    await page.goto('/years/2018/sites/spectre/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt18-spectre');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-spectre')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt18-spectre'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt18-spectre')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '18');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="gdpr"]').first()).toBeVisible();
  });

  test('home #ott-5x-2018 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2018/pages/home.html');
    const chips = page.locator('#ott-5x-2018 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
