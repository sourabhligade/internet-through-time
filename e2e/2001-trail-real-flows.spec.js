// @ts-check
/**
 * 2001 multi-step trails — real localStorage (itt01).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, goInFrame, waitForImmersion } = require('./helpers');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} keys
 */
async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

test.describe('2001 trail A — Wiki densify path', () => {
  test('Wikipedia home → welcome → edit preview hooks', async ({ page }) => {
    await enterYear(page, '2001');
    await goInFrame(page, 'sites/wikipedia/index.html');
    await waitForImmersion(page, '2001');
    let frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Wikipedia|encyclopedia/i, { timeout: 15000 });

    await goInFrame(page, 'sites/wikipedia/welcome.html');
    await waitForImmersion(page, '2001');
    frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Welcome|newcomers|edit/i, { timeout: 10000 });

    await goInFrame(page, 'sites/wikipedia/edit.html');
    await waitForImmersion(page, '2001');
    frame = contentFrame(page);
    await expect(
      frame.locator('[data-wiki-preview], input[value*="preview" i], textarea').first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe('2001 trail B — Commerce + always-on', () => {
  test('Amazon smile cart → broadband speed theater', async ({ page }) => {
    await enterYear(page, '2001');
    await clearKeys(page, ['itt01-amazon-cart']);
    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '2001');
    let frame = contentFrame(page);
    const add = frame.locator('[data-add-cart]').first();
    await expect(add).toBeVisible({ timeout: 10000 });
    await add.click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt01-amazon-cart')), {
        timeout: 10000,
      })
      .toBeTruthy();

    await goInFrame(page, 'sites/broadband/index.html');
    await waitForImmersion(page, '2001');
    frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Always-on|broadband|DSL|cable/i, {
      timeout: 15000,
    });
    const btn = frame.locator('#speed-check');
    if (await btn.count()) {
      await btn.click();
      await expect(frame.locator('#speed-out')).not.toHaveText('', { timeout: 5000 });
    }
  });
});

test.describe('2001 trail C — iPod honesty', () => {
  test('iPod multipage → iTunes library (no Store)', async ({ page }) => {
    await enterYear(page, '2001');
    await goInFrame(page, 'sites/apple/ipod.html');
    await waitForImmersion(page, '2001');
    let frame = contentFrame(page);
    const ipod = await frame.locator('body').innerText();
    expect(ipod).toMatch(/1,000 songs|iPod/i);
    expect(ipod).toMatch(/still in the future|Not a music store|not a store/i);

    await goInFrame(page, 'sites/apple/itunes.html');
    await waitForImmersion(page, '2001');
    frame = contentFrame(page);
    const itunes = await frame.locator('body').innerText();
    expect(itunes).toMatch(/iTunes|jukebox|library/i);
    expect(itunes).not.toMatch(/buy songs for 99|99\s*¢ downloads|Music Store is open/i);
  });
});
