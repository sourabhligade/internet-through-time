// @ts-check
/**
 * Real play (no ?test=1) for every more-c / more-d dest.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const matrix = require('./year-full-more.matrix.json').filter((row) => {
  const dest = path.join(__dirname, '..', row.path.replace(/^\//, ''));
  if (!fs.existsSync(path.join(__dirname, '..', 'years', row.year, 'index.html'))) return false;
  if (!fs.existsSync(dest)) return false;
  return /data-full-more/.test(fs.readFileSync(dest, 'utf8'));
});

/**
 * @param {import('@playwright/test').Page} page
 * @param {{ engine: string }} spec
 */
async function playEngine(page, spec) {
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  const engine = spec.engine;
  if (engine === 'gather') {
    const spots = [
      [60, 50],
      [200, 50],
      [340, 50],
      [60, 140],
      [200, 140],
      [340, 140]
    ];
    for (let n = 0; n < 3; n++) {
      for (const [x, y] of spots) await canvas.click({ position: { x, y } });
    }
    await canvas.click({ position: { x: 420, y: 260 } });
    return;
  }
  if (engine === 'corridor') {
    const xs = [80, 240, 400];
    for (let t = 0; t < 14; t++) {
      for (const x of xs) await canvas.click({ position: { x, y: 250 } });
    }
    return;
  }
  if (engine === 'solitaire') {
    for (let n = 0; n < 14; n++) {
      await canvas.click({ position: { x: 40 + (n % 7) * 64, y: 80 } });
    }
    return;
  }
  if (engine === 'cards') {
    await canvas.click({ position: { x: 58, y: 130 } });
    await canvas.click({ position: { x: 146, y: 130 } });
    await canvas.click({ position: { x: 234, y: 130 } });
    return;
  }
  if (engine === 'platform') {
    for (const [x, y] of [
      [140, 164],
      [260, 104],
      [400, 174]
    ]) {
      await canvas.click({ position: { x, y } });
    }
    return;
  }
  if (engine === 'match3') {
    const cw = 480 / 6;
    const ch = 280 / 6;
    for (let i = 0; i < 6; i++) {
      await canvas.click({ position: { x: cw / 2, y: ch / 2 } });
      await canvas.click({ position: { x: cw + cw / 2, y: ch / 2 } });
    }
    return;
  }
  if (engine === 'craft') {
    const need = [18, 19, 26, 27, 34, 35, 42, 43];
    const cw = 480 / 8;
    const ch = 280 / 8;
    for (const i of need) {
      const r = (i / 8) | 0;
      const c = i % 8;
      await canvas.click({ position: { x: c * cw + cw / 2, y: r * ch + ch / 2 } });
    }
    return;
  }
  if (engine === 'fold') {
    await canvas.click({ position: { x: 20, y: 140 } });
    await canvas.click({ position: { x: 20, y: 140 } });
    await canvas.click({ position: { x: 460, y: 140 } });
    await canvas.click({ position: { x: 240, y: 20 } });
    return;
  }
  if (engine === 'flap') {
    for (let i = 0; i < 45; i++) {
      await canvas.click({ position: { x: 80, y: 140 } });
      await page.waitForTimeout(110);
      if (await page.evaluate((k) => localStorage.getItem(k), spec.key)) return;
    }
    return;
  }
  if (engine === 'idle') {
    for (let i = 0; i < 55; i++) await canvas.click({ position: { x: 240, y: 110 } });
    return;
  }
  if (engine === 'rhythm') {
    const lanes = [60, 180, 300, 420];
    for (let t = 0; t < 90; t++) {
      await canvas.click({ position: { x: lanes[t % 4], y: 250 } });
      await page.waitForTimeout(60);
      if (await page.evaluate((k) => localStorage.getItem(k), spec.key)) return;
    }
    return;
  }
  throw new Error('no play recipe for ' + engine);
}

for (const spec of matrix) {
  test(`${spec.year} ${spec.slot} ${spec.id} ${spec.engine} real play`, async ({ page }) => {
    await page.goto(spec.path);
    await page.evaluate((k) => localStorage.removeItem(k), spec.key);
    await page.reload();
    await expect(page.locator('[data-full-more]')).toHaveAttribute('data-full-ready', '1');
    await page.locator('[data-full-trap]').click();
    expect(await page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeNull();
    await page.locator('[data-game-start]').click();
    await playEngine(page, spec);
    await expect
      .poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key), { timeout: 16000 })
      .toBeTruthy();
    const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), spec.key)) || '{}');
    expect(blob.real, spec.key).toBe(true);
    expect(blob.fullMore, spec.key).toBe(true);
    expect(String(blob.year)).toBe(String(spec.year));
  });
}
