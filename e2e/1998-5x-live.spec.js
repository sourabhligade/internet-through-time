// @ts-check
/** 1998 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1998 5× live F1–F5', () => {
  test('F1 Babel Fish empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/altavista/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-babelfish');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F2 Google catalog empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/google/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-google-q');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F3 Amazon Music CD empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/amazon/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-amzn-cd');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F4 DMOZ 2-level empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/dmoz/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-dmoz');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F5 Mozilla split empty never writes', async ({ page }) => {
    await page.goto('/years/1998/sites/mozilla/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt98-mozilla');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('home #ott-5x-1998 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/1998/pages/home.html');
    const chips = page.locator('#ott-5x-1998 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
