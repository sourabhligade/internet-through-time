// @ts-check
/**
 * Real play (no ?test=1) for every full-more engine.
 * Mouse-only — same path a visitor uses inside the year shell.
 */
const { test, expect } = require('@playwright/test');


async function openGame(page, path, key) {
  await page.goto(path);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  await expect(page.locator('[data-full-more]')).toHaveAttribute('data-full-ready', '1');
  await page.locator('[data-full-trap]').click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull();
  await page.locator('[data-game-start]').click();
}

async function expectSaved(page, key) {
  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 15000 })
    .toBeTruthy();
  const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), key)) || '{}');
  expect(blob.real, key + ' real').toBe(true);
  expect(blob.fullMore, key + ' fullMore').toBe(true);
  expect(blob.best, key + ' best').toBeGreaterThan(0);
}

test('corridor 1994 Hall Peek trap then mouse play', async ({ page }) => {
  await openGame(page, '/years/1994/sites/playable/more-c.html', 'itt94-game-hallpeek');
  const canvas = page.locator('canvas');
  const xs = [80, 240, 400];
  for (let t = 0; t < 12; t++) {
    for (const x of xs) {
      await canvas.click({ position: { x, y: 250 } });
    }
  }
  await expectSaved(page, 'itt94-game-hallpeek');
});

test('solitaire 1994 Desk Klondike clicks', async ({ page }) => {
  await openGame(page, '/years/1994/sites/playable/more-d.html', 'itt94-game-deskklond');
  const canvas = page.locator('canvas');
  for (let n = 0; n < 14; n++) {
    await canvas.click({ position: { x: 40 + (n % 7) * 64, y: 80 } });
  }
  await expectSaved(page, 'itt94-game-deskklond');
});

test('cards 1995 Command Click plays 3', async ({ page }) => {
  await openGame(page, '/years/1995/sites/playable/more-d.html', 'itt95-game-cmdclick');
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x: 58, y: 130 } });
  await canvas.click({ position: { x: 146, y: 130 } });
  await canvas.click({ position: { x: 234, y: 130 } });
  await expectSaved(page, 'itt95-game-cmdclick');
});

test('platform 1996 Star Cube mouse + jump', async ({ page }) => {
  await openGame(page, '/years/1996/sites/playable/more-c.html', 'itt96-game-starcubed');
  const canvas = page.locator('canvas');
  const coins = [
    [140, 164],
    [260, 104],
    [400, 174]
  ];
  for (const [x, y] of coins) {
    await canvas.click({ position: { x, y } });
  }
  await expectSaved(page, 'itt96-game-starcubed');
});

test('fold 2008 Braid Fold edge click reaches 16', async ({ page }) => {
  await openGame(page, '/years/2008/sites/playable/more-d.html', 'itt08-game-braidfold');
  const canvas = page.locator('canvas');
  await canvas.click({ position: { x: 20, y: 140 } });
  await canvas.click({ position: { x: 20, y: 140 } });
  await canvas.click({ position: { x: 460, y: 140 } });
  await canvas.click({ position: { x: 240, y: 20 } });
  await canvas.click({ position: { x: 240, y: 260 } });
  await expectSaved(page, 'itt08-game-braidfold');
});

test('flap 2013 Pipe Flap click climb', async ({ page }) => {
  await openGame(page, '/years/2013/sites/playable/more-c.html', 'itt13-game-flap2013');
  const canvas = page.locator('canvas');
  for (let i = 0; i < 40; i++) {
    await canvas.click({ position: { x: 80, y: 140 } });
    await page.waitForTimeout(120);
    if (await page.evaluate(() => localStorage.getItem('itt13-game-flap2013'))) break;
  }
  await expectSaved(page, 'itt13-game-flap2013');
});

test('idle 2013 Cookie Click bakery', async ({ page }) => {
  await openGame(page, '/years/2013/sites/playable/more-d.html', 'itt13-game-cookieclk');
  const canvas = page.locator('canvas');
  for (let i = 0; i < 55; i++) {
    await canvas.click({ position: { x: 240, y: 110 } });
  }
  await expectSaved(page, 'itt13-game-cookieclk');
});

test('rhythm 2024 Stratagem lane clicks', async ({ page }) => {
  test.skip(!require('fs').existsSync(require('path').join(__dirname, '..', 'years', '2024', 'index.html')), '2024 wiped');
  await openGame(page, '/years/2024/sites/playable/more-d.html', 'itt24-game-helldive');
  const canvas = page.locator('canvas');
  const lanes = [60, 180, 300, 420];
  for (let t = 0; t < 80; t++) {
    await canvas.click({ position: { x: lanes[t % 4], y: 250 } });
    await page.waitForTimeout(70);
    if (await page.evaluate(() => localStorage.getItem('itt24-game-helldive'))) break;
  }
  await expectSaved(page, 'itt24-game-helldive');
});
