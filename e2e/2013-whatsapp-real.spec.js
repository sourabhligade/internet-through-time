// @ts-check
/**
 * 2013 WhatsApp multipage REAL — verify → install → chat
 * Keys: itt13-wa-phone · itt13-wa-installed · itt13-wa-chats
 * Bans: no Facebook deal (2014), no E2E default (2016)
 */
const { test, expect } = require('@playwright/test');

async function clearWa13(page) {
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('itt13-wa') || k.startsWith('itt14-wa'))
      .forEach((k) => localStorage.removeItem(k));
  });
}

test.describe('2013 WhatsApp real flows', () => {
  test('gates + chat write itt13-wa-* only', async ({ page }) => {
    await page.goto('/years/2013/sites/whatsapp/index.html');
    await clearWa13(page);
    await page.reload();

    await page.locator('[data-wa13-install]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-wa-installed')))
      .toBeNull();

    // short phone blocked
    await page.fill('[data-wa13-phone]', '12');
    await page.locator('[data-wa13-verify]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-wa-phone')))
      .toBeNull();

    await page.fill('[data-wa13-phone]', '5551234567');
    await page.locator('[data-wa13-verify]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-wa-phone')))
      .toBeTruthy();

    await page.locator('[data-wa13-install]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt13-wa-installed')))
      .toBeTruthy();

    await page.goto('/years/2013/sites/whatsapp/chat.html');
    await page.locator('form[data-wa13-send] button[type="submit"]').click();
    const before = await page.evaluate(() => localStorage.getItem('itt13-wa-chats'));
    await page.fill('[data-wa13-text], [name=text]', 'hello 2013');
    await page.locator('form[data-wa13-send] button[type="submit"]').click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem('itt13-wa-chats'));
        return raw && raw.includes('hello 2013');
      })
      .toBeTruthy();
    const leak = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt14-wa'))
    );
    expect(leak).toEqual([]);
    expect(before).toBeTruthy();
    await expect(page.locator('[data-wa13-list]')).toContainText(/hello 2013/i);
  });

  test('about bans Facebook acquisition and E2E', async ({ page }) => {
    await page.goto('/years/2013/sites/whatsapp/about.html');
    await expect(page.locator('body')).toContainText(/2014|not.*acquired|Facebook has/i);
    await expect(page.locator('body')).toContainText(/E2E|2016|encryption/i);
  });

  test('chat without install is blocked', async ({ page }) => {
    await page.goto('/years/2013/sites/whatsapp/chat.html');
    await clearWa13(page);
    await page.reload();
    await page.fill('[data-wa13-text], [name=text]', 'should fail');
    await page.locator('form[data-wa13-send] button[type="submit"]').click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem('itt13-wa-chats'));
        return !raw || !raw.includes('should fail');
      })
      .toBeTruthy();
  });
});
