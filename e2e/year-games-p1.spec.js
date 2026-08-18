// @ts-check
/**
 * P1 play gates (docs/GAMES-INTEGRATION-TODO-VERIFY-1994-2009.md §8).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays, waitKey } = require('./helpers');

async function openGame(page, year, query, clearPrefix) {
  await enterYear(page, year);
  if (clearPrefix) {
    await page.evaluate((p) => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf(p + '-game-') === 0)
        .forEach((k) => localStorage.removeItem(k));
    }, clearPrefix);
  }
  await goImmersion(page, year, 'sites/playable/game.html' + (query || ''));
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('[data-year-game]')).toBeVisible({ timeout: 20000 });
  return frame;
}

test('1995 forced capture — quiet square is not a dest', async ({ page }) => {
  const frame = await openGame(page, '1995', '?fixture=capture&fast=1', 'itt95');
  await frame.locator('[data-game-start]').click();
  await expect(frame.locator('[data-year-game]')).toHaveAttribute('data-checkers-state', 'play', {
    timeout: 8000,
  });
  await expect(frame.locator('[data-r="5"][data-c="2"]')).toBeVisible();
  await frame.locator('[data-r="5"][data-c="2"]').click();
  await expect(frame.locator('[data-r="3"][data-c="4"][data-dest]')).toBeVisible();
  expect(await frame.locator('[data-r="4"][data-c="1"][data-dest]').count()).toBe(0);
  await frame.locator('[data-r="4"][data-c="1"]').click();
  await expect(frame.locator('[data-r="5"][data-c="2"]')).toContainText('●');
  await expect(frame.locator('[data-hint], [data-itt-action-status]').first()).toContainText(/capture|required|mandatory/i);
});

test('2001 load alone does not write', async ({ page }) => {
  await openGame(page, '2001', '', 'itt01');
  expect(await page.evaluate(() => localStorage.getItem('itt01-game-clickscape'))).toBeNull();
});

test('2001 bank is not instant from far away', async ({ page }) => {
  const frame = await openGame(page, '2001', '', 'itt01');
  await page.evaluate(() => {
    const w = document.getElementById('content').contentWindow;
    const key = w.ITT.YearGame.storageKey('clickscape', '2001');
    w.ITT.YearGame.saveJSON(key, {
      gameId: 'clickscape',
      year: '2001',
      x: 3,
      y: 5,
      wcXp: 0,
      mineXp: 0,
      inv: { log: 2, ore: 0 },
      bank: { log: 0, ore: 0 },
      real: true,
    });
  });
  await goImmersion(page, '2001', 'sites/playable/game.html');
  await killOverlays(page);
  const f2 = contentFrame(page);
  await expect(f2.locator('canvas')).toBeVisible();
  /* Bank booth is ~12,5 — far from 3,5. Click that tile. */
  await f2.locator('canvas').click({ position: { x: 12 * 28 + 10, y: 5 * 28 + 10 }, force: true });
  await page.waitForTimeout(200);
  const bankNow = await page.evaluate(() => {
    const raw = localStorage.getItem('itt01-game-clickscape');
    if (!raw) return -1;
    const o = JSON.parse(raw);
    return (o.bank && o.bank.log) || 0;
  });
  /* Either still walking (bank 0) or not yet deposited. Instant deposit would already be 2. */
  expect(bankNow).toBeLessThan(2);
});

test('2007 level 1 push writes maxLevelCleared', async ({ page }) => {
  const frame = await openGame(page, '2007', '', 'itt07');
  await frame.locator('[data-dir="right"]').click({ force: true });
  await frame.locator('[data-dir="right"]').click({ force: true });
  const blob = JSON.parse((await waitKey(page, 'itt07-game-boxshift')) || '{}');
  expect(blob.real).toBe(true);
  expect(blob.maxLevelCleared).toBeGreaterThanOrEqual(1);
});

test('2007 next/skip does not increment cleared', async ({ page }) => {
  const frame = await openGame(page, '2007', '', 'itt07');
  await frame.locator('[data-next]').click({ force: true });
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => localStorage.getItem('itt07-game-boxshift'))).toBeNull();
});

test('2009 wilt after ready window', async ({ page }) => {
  const frame = await openGame(page, '2009', '?fast=1', 'itt09');
  await frame.locator('[data-fv-free]').check({ force: true });
  await frame.locator('[data-fv-neighbor]').check({ force: true });
  await frame.locator('[data-fv-money]').check({ force: true });
  await frame.locator('[data-seed="wheat"]').click();
  await frame.locator('[data-plots] button').first().click({ force: true });
  await expect
    .poll(async () => {
      const raw = await page.evaluate(() => localStorage.getItem('itt09-game-plotneighbors'));
      if (!raw) return '';
      const o = JSON.parse(raw);
      return (o.plots && o.plots[0] && o.plots[0].state) || '';
    }, { timeout: 20000 })
    .toBe('wilted');
});

test('2009 neighbor cooldown', async ({ page }) => {
  const frame = await openGame(page, '2009', '?fast=1', 'itt09');
  await frame.locator('[data-fv-free]').check({ force: true });
  await frame.locator('[data-fv-neighbor]').check({ force: true });
  await frame.locator('[data-fv-money]').check({ force: true });
  await frame.locator('[data-seed="wheat"]').click();
  await frame.locator('[data-plots] button').first().click({ force: true });
  await frame.locator('[data-neighbor]').click({ force: true });
  await expect(frame.locator('[data-itt-action-status]')).toContainText(/Neighbor finished|finished a plot/i);
  await frame.locator('[data-plots] button').nth(1).click({ force: true });
  await frame.locator('[data-neighbor]').click({ force: true });
  await expect(frame.locator('[data-itt-action-status]')).toContainText(/busy|later/i);
});
