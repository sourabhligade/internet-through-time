// @ts-check
/** 1997 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1997 5× live F1–F5', () => {
  test('F1 Slashdot moderate empty never writes', async ({ page }) => {
    await page.goto('/years/1997/sites/slashdot/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt97-slashdot');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F2 eBay bid empty never writes', async ({ page }) => {
    await page.goto('/years/1997/sites/ebay/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt97-ebay-bid');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F3 ICQ buddy empty never writes', async ({ page }) => {
    await page.goto('/years/1997/sites/icq/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt97-icq-buddy');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F4 Think Different empty never writes', async ({ page }) => {
    await page.goto('/years/1997/sites/apple/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt97-td');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
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
