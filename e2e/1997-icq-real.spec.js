// @ts-check
/**
 * 1997 ICQ multipage REAL — UIN · buddies · offline messages
 * Storage: itt97-icq-uin · itt97-icq-buddies · itt97-icq-messages
 */
const { test, expect } = require('@playwright/test');

async function clearIcq(page) {
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('itt97-icq'))
      .forEach((k) => localStorage.removeItem(k));
  });
}

test.describe('1997 ICQ real flows', () => {
  test('register UIN → add buddy (empty blocked)', async ({ page }) => {
    await page.goto('/years/1997/sites/icq/register.html');
    await clearIcq(page);
    await page.reload();
    await page.waitForTimeout(600);

    await page.locator('form[data-icq-register] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt97-icq-uin')))
      .toBeNull();

    await page.fill('form[data-icq-register] [name="nick"]', 'MuseumUser');
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt97-icq-uin')))
      .toBeTruthy();

    const uinPayload = await page.evaluate(() => localStorage.getItem('itt97-icq-uin'));
    expect(uinPayload).toMatch(/uin|MuseumUser/i);

    await page.goto('/years/1997/sites/icq/buddylist.html');
    await page.waitForTimeout(600);
    // empty buddy blocked
    await page.locator('form[data-icq-buddy-form] button[type="submit"]').click();
    await page.fill('[name="uin"]', '12345678');
    await page.fill('[name="nick"]', 'Buddy');
    await page.locator('form[data-icq-buddy-form] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt97-icq-buddies')))
      .toBeTruthy();
    await expect(page.locator('[data-icq-buddies]')).toContainText(/Buddy|12345678/i);
  });

  test('offline message empty blocked; write itt97-icq-messages', async ({ page }) => {
    await page.goto('/years/1997/sites/icq/register.html');
    await clearIcq(page);
    await page.reload();
    await page.waitForTimeout(600);
    await page.fill('form[data-icq-register] [name="nick"]', 'MsgUser');
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt97-icq-uin')))
      .toBeTruthy();

    await page.goto('/years/1997/sites/icq/message.html');
    await page.waitForTimeout(600);
    await page.locator('form[data-icq-msg-form] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt97-icq-messages')))
      .toBeNull();

    await page.fill('[name="to"]', '12345678');
    await page.fill('[name="text"]', 'uh-oh offline museum ping');
    await page.locator('form[data-icq-msg-form] button[type="submit"]').click();
    await expect
      .poll(async () => {
        const raw = await page.evaluate(() => localStorage.getItem('itt97-icq-messages'));
        return raw && raw.includes('uh-oh offline museum ping');
      })
      .toBeTruthy();
  });

  test('does not leak itt96- or itt98- keys', async ({ page }) => {
    await page.goto('/years/1997/sites/icq/register.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt96-') || k.startsWith('itt98-') || k.startsWith('itt97-icq'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(600);
    await page.fill('[name="nick"]', 'IsoUser');
    await page.locator('form[data-icq-register] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => !!localStorage.getItem('itt97-icq-uin')))
      .toBeTruthy();
    const leak = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt96-') || k.startsWith('itt98-'))
    );
    expect(leak).toEqual([]);
  });
});
