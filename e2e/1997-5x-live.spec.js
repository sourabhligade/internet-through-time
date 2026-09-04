// @ts-check
/** 1997 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1997 5× live F1–F5', () => {
  test('F1 Slashdot moderate empty never writes', async ({ page }) => {
    await page.goto('/years/1997/sites/slashdot/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt97-slashdot');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt97-slashdot')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt97-slashdot'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt97-slashdot')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '97');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="ebay"]').first()).toBeVisible();
  });

  test('F2 eBay bid empty never writes', async ({ page }) => {
    await page.goto('/years/1997/sites/ebay/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt97-ebay-bid');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt97-ebay-bid')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt97-ebay-bid'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt97-ebay-bid')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '97');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="icq"]').first()).toBeVisible();
  });

  test('F3 ICQ buddy empty never writes', async ({ page }) => {
    await page.goto('/years/1997/sites/icq/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt97-icq-buddy');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt97-icq-buddy')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt97-icq-buddy'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt97-icq-buddy')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '97');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="apple"]').first()).toBeVisible();
  });

  test('F4 Think Different empty never writes', async ({ page }) => {
    await page.goto('/years/1997/sites/apple/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt97-td');
    await page.reload();
    const save = page.locator('[data-5x-save]').first();
    await expect(save).toBeVisible();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt97-td')).toBeFalsy();
    await page.locator('[data-5x-req="a"]').first().check();
    await page.locator('[data-5x-req="b"]').first().check();
    const extra = page.locator('[data-5x-req="c"]');
    if (await extra.count()) await extra.first().check();
    await save.click();
    await expect.poll(async () => getKey(page, 'itt97-td'), { timeout: 8000 }).toBeTruthy();
    const raw = (await getKey(page, 'itt97-td')) || '';
    expect(raw).toMatch(/real|multiStep/i);
    const leak = await page.evaluate((yy) => {
      const bad = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
      }
      return bad;
    }, '97');
    expect(leak).toEqual([]);
    await expect(page.locator('[data-5x-next] a[href*="drudge"]').first()).toBeVisible();
  });

  test('F5 Drudge two wires gold', async ({ page }) => {
    await page.goto('/years/1997/sites/drudge/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt97-drudge'); } catch (e) {}
      try { sessionStorage.removeItem('itt97-drudge-seen'); } catch (e2) {}
    });
    await expect(page.locator('[data-5x-save]')).toHaveCount(0);
    await page.locator('[data-drudge-story="ie4"]').click();
    await page.goto('/years/1997/sites/drudge/index.html');
    await page.locator('[data-drudge-story="amazon"]').click();
    await expect.poll(async () => getKey(page, 'itt97-drudge'), { timeout: 8000 }).toBeTruthy();
  });

  test('home #ott-5x-1997 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/1997/pages/home.html');
    const chips = page.locator('#ott-5x-1997 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
