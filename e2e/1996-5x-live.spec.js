// @ts-check
/** 1996 5× live — incomplete never writes · Next along the locked chain · isolation. */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

test.describe('1996 5× live F1–F5', () => {
  test('F1 My portal empty never writes', async ({ page }) => {
    await page.goto('/years/1996/sites/yahoo/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt96-myportal');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F2 HoTMaiL login gold — empty never writes', async ({ page }) => {
    await page.goto('/years/1996/sites/hotmail/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt96-hotmail-user');
    await page.reload();
    await expect(page.locator('[data-5x-save]')).toHaveCount(0);
    await page.locator('form[data-hotmail-login] input[type="image"], form[data-hotmail-login] button, form[data-hotmail-login] input[type="submit"]').first().click();
    await expect.poll(async () => getKey(page, 'itt96-hotmail-user')).toBeFalsy();
    await page.fill('form[data-hotmail-login] [name="login"]', 'museum96');
    await page.fill('form[data-hotmail-login] [name="pass"]', 'modem');
    await page.locator('form[data-hotmail-login] input[type="image"], form[data-hotmail-login] button, form[data-hotmail-login] input[type="submit"]').first().click();
    await expect.poll(async () => getKey(page, 'itt96-hotmail-user'), { timeout: 8000 }).toBeTruthy();
  });

  test('F3 Space Jam 3 planets gold', async ({ page }) => {
    await page.goto('/years/1996/sites/spacejam/index.html');
    await page.evaluate(() => {
      try { localStorage.removeItem('itt96-jam'); } catch (e) {}
      try { sessionStorage.removeItem('itt96-sj-seen'); } catch (e2) {}
    });
    await expect(page.locator('[data-5x-save]')).toHaveCount(0);
    await page.locator('[data-sj-planet="press"]').click();
    await page.goto('/years/1996/sites/spacejam/index.html');
    await page.locator('[data-sj-planet="jam"]').click();
    await page.goto('/years/1996/sites/spacejam/index.html');
    await page.locator('[data-sj-planet="bball"]').click();
    await expect.poll(async () => getKey(page, 'itt96-jam'), { timeout: 8000 }).toBeTruthy();
  });

  test('F4 RealPlayer buffer empty never writes', async ({ page }) => {
    await page.goto('/years/1996/sites/realplayer/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt96-real');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('F5 Guestbook empty never writes', async ({ page }) => {
    await page.goto('/years/1996/sites/angelfire/index.html');
    await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) {} }, 'itt96-gb');
    await page.reload();
    await expect(page.locator('[data-5x-save], [data-5x-loop]')).toHaveCount(0);
    return;
  });

  test('home #ott-5x-1996 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/1996/pages/home.html');
    const chips = page.locator('#ott-5x-1996 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
