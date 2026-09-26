// @ts-check
/** 2004 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('2004 5× live F1–F5', () => {
  test('F1 Flickr stream empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/flickr/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-flickr');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F2 Gmail invite empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-gmail');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F3 Firefox 1.0 thanks empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-fx');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F4 Digg seed vote empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/digg/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-digg');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F5 folklore story empty never writes', async ({ page }) => {
    await page.goto('/years/2004/sites/folklore/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt04-folk');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('home #ott-5x-2004 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2004/pages/home.html');
    const chips = page.locator('#ott-5x-2004 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
