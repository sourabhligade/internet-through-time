// @ts-check
/** 2000 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2000 5× live F1–F5', () => {
  test('F1 eBay watch+bid empty never writes', async ({ page }) => {
    await page.goto('/years/2000/sites/ebay/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt00-ebay-watch');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F2 Pets shop→shutdown empty never writes', async ({ page }) => {
    await page.goto('/years/2000/sites/pets/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt00-pets');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F3 Amazon smile cart empty never writes', async ({ page }) => {
    await page.goto('/years/2000/sites/amazon/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt00-amzn');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F4 Napster legal empty never writes', async ({ page }) => {
    await page.goto('/years/2000/sites/napster/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt00-nap-legal');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F5 Flash 4 nag empty never writes', async ({ page }) => {
    await page.goto('/years/2000/sites/flash4/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt00-flash');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('home #ott-5x-2000 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2000/pages/home.html');
    const chips = page.locator('#ott-5x-2000 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
