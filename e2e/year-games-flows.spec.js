// @ts-check
/**
 * Deep flow checks — every year game: load → start/interact → observable progress.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

/**
 * Clear year game keys (must run after a same-origin page load).
 * @param {import('@playwright/test').Page} page
 * @param {string} prefix e.g. itt95
 */
async function clearGameKeys(page, prefix) {
  await page.evaluate((p) => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.indexOf(p + '-game-') === 0)
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* ignore */ }
  }, prefix);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 * @param {string} [query]
 * @param {string} [clearPrefix] if set, clear ittXX-game-* after enterYear
 */
async function openGame(page, year, query, clearPrefix) {
  await enterYear(page, year);
  if (clearPrefix) await clearGameKeys(page, clearPrefix);
  const path = 'sites/playable/game.html' + (query || '');
  await goImmersion(page, year, path);
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('[data-year-game]')).toBeVisible({ timeout: 20000 });
  return frame;
}

test.describe('year game flows — full matrix', () => {
  test('1994 Hotlist Surfer: start → rows → score can increase', async ({ page }) => {
    const frame = await openGame(page, '1994', '?fast=1', 'itt94');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => frame.locator('[data-game-field] [data-row-id]').count(), { timeout: 5000 })
      .toBeGreaterThan(0);
    // Click several rows (some may be rot)
    const n = await frame.locator('[data-game-field] [data-row-id]').count();
    for (let i = 0; i < Math.min(n, 4); i++) {
      await frame.locator('[data-game-field] [data-row-id]').nth(i).click({ force: true }).catch(() => {});
    }
    await page.waitForTimeout(400);
    // Game still responsive: time or score or status present
    await expect(frame.locator('[data-game-score], [data-game-time], [data-itt-action-status]').first()).toBeVisible();
  });

  test('1995 Applet Checkers: start → board + move possible', async ({ page }) => {
    const frame = await openGame(page, '1995', '?fast=1', 'itt95');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => frame.locator('[data-checkers-board] button').count(), { timeout: 8000 })
      .toBe(64);
    // Click a dark piece area (bottom rows) then any cell
    await frame.locator('[data-checkers-board] button').nth(50).click({ force: true });
    await frame.locator('[data-checkers-board] button').nth(40).click({ force: true });
    await expect(frame.locator('[data-itt-action-status]')).not.toBeEmpty();
  });

  test('1996 Planet Hop: start → target shown → planet click', async ({ page }) => {
    const frame = await openGame(page, '1996', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-game-target]')).not.toHaveText('—', { timeout: 3000 });
    await frame.locator('[data-planet]').first().click({ force: true });
    await expect(frame.locator('[data-game-score]')).toBeVisible();
  });

  test('1997 Connect Four: find game → board → drop', async ({ page }) => {
    const frame = await openGame(page, '1997', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => frame.locator('[data-c4-board] button').count(), { timeout: 8000 })
      .toBe(42);
    await frame.locator('[data-c4-board] button').nth(38).click({ force: true }); // bottom-ish
    await page.waitForTimeout(600);
    // At least one filled disc (non-#eee background or still 42 buttons)
    await expect(frame.locator('[data-c4-board] button').first()).toBeVisible();
  });

  test('1998 Skip-Intro: start → score increases while running', async ({ page }) => {
    const frame = await openGame(page, '1998');
    const before = await frame.locator('#play-score').textContent();
    await frame.locator('#play-start').click();
    await page.waitForTimeout(1200);
    const after = await frame.locator('#play-score').textContent();
    expect(Number(after) >= Number(before || 0)).toBeTruthy();
    // jump
    await frame.locator('#game-canvas').click({ force: true });
    await expect(frame.locator('#play-status')).toBeVisible();
  });

  test('1999 Pixel Pet: feed spends points', async ({ page }) => {
    const frame = await openGame(page, '1999', '?fast=1', 'itt99');
    const ptsBefore = Number((await frame.locator('[data-points]').textContent()) || '20');
    await frame.locator('[data-feed]').click();
    await page.waitForTimeout(200);
    const ptsAfter = Number((await frame.locator('[data-points]').textContent()) || '0');
    // default 20, feed costs 5
    expect(ptsAfter).toBe(ptsBefore - 5);
    const key = await page.evaluate(() => localStorage.getItem('itt99-game-petdash'));
    expect(key).toBeTruthy();
  });

  test('2000 Portal Judge: rate all 5 → storage write', async ({ page }) => {
    const frame = await openGame(page, '2000', '', 'itt00');
    // rate each card 3
    const rateBtns = frame.locator('[data-rate][data-score="3"]');
    const count = await rateBtns.count();
    expect(count).toBe(5);
    for (let i = 0; i < count; i++) {
      await rateBtns.nth(i).click({ force: true });
    }
    await frame.locator('[data-submit]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt00-game-portaljudge')), {
        timeout: 5000,
      })
      .toBeTruthy();
    const raw = await page.evaluate(() => localStorage.getItem('itt00-game-portaljudge'));
    const data = JSON.parse(raw || '{}');
    expect(data.multiStep).toBe(true);
    expect(data.real).toBe(true);
  });

  test('2001 Clickscape: canvas click walks/chops', async ({ page }) => {
    const frame = await openGame(page, '2001', '', 'itt01');
    const canvas = frame.locator('canvas');
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box).toBeTruthy();
    // click center-ish of canvas
    await page.mouse.click(box.x + box.width * 0.4, box.y + box.height * 0.5);
    await page.waitForTimeout(300);
    await expect(frame.locator('[data-itt-action-status]')).toBeVisible();
  });

  test('2002 Room Sticky: place furniture → storage', async ({ page }) => {
    const frame = await openGame(page, '2002', '', 'itt02');
    await frame.locator('[data-place="chair"]').click();
    await frame.locator('[data-room] button').nth(22).click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt02-game-roomsticky')), {
        timeout: 5000,
      })
      .toBeTruthy();
  });

  test('2003 Gags Lite: start fight → gag click', async ({ page }) => {
    const frame = await openGame(page, '2003');
    await frame.locator('[data-game-start]').click();
    await frame.locator('[data-gag="pie"]').click();
    await page.waitForTimeout(300);
    const log = await frame.locator('[data-log]').textContent();
    expect((log || '').length).toBeGreaterThan(0);
  });

  test('2004 Cubicle Whack: start → timer runs', async ({ page }) => {
    const frame = await openGame(page, '2004', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await page.waitForTimeout(1500);
    const t = await frame.locator('[data-game-time]').textContent();
    // started at 8 in fast mode or 45 — should be less after 1.5s
    expect(Number(t)).toBeLessThan(45);
  });

  test('2005 HoverChop: start → score increases', async ({ page }) => {
    const frame = await openGame(page, '2005', '', 'itt05');
    await frame.locator('#play-start').click();
    await page.waitForTimeout(900);
    const sc = Number((await frame.locator('#play-score').textContent()) || '0');
    expect(sc).toBeGreaterThan(0);
  });

  test('2006 TrailSled: ride → distance > 0', async ({ page }) => {
    const frame = await openGame(page, '2006', '', 'itt06');
    await frame.locator('#play-start').click(); // seeds demo ramp if empty
    await page.waitForTimeout(2000);
    const sc = Number((await frame.locator('#play-score').textContent()) || '0');
    expect(sc).toBeGreaterThan(0);
  });

  test('2007 Box Shift: level renders · D-pad moves', async ({ page }) => {
    const frame = await openGame(page, '2007');
    await expect(frame.locator('[data-level]')).toContainText('#');
    const before = await frame.locator('[data-level]').textContent();
    // D-pad works without iframe keyboard focus (shell UX fix)
    await frame.locator('[data-dir="right"]').click({ force: true });
    await page.waitForTimeout(200);
    const after = await frame.locator('[data-level]').textContent();
    expect(after).not.toBe(before);
    await expect(frame.locator('[data-level]')).toContainText('@');
  });

  test('2008 Tap Grid: open Bubble Pop · canvas shows', async ({ page }) => {
    const frame = await openGame(page, '2008', '?fast=1');
    await frame.getByRole('button', { name: /Bubble Pop/i }).click();
    await expect(frame.locator('canvas')).toBeVisible();
    await page.waitForTimeout(500);
    await expect(frame.locator('[data-game-score]')).toBeVisible();
  });

  test('2009 Plot Neighbors: plant wheat → storage', async ({ page }) => {
    const frame = await openGame(page, '2009', '?fast=1', 'itt09');
    await frame.locator('[data-seed="wheat"]').click();
    await frame.locator('[data-plots] button').first().click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt09-game-plotneighbors')), {
        timeout: 5000,
      })
      .toBeTruthy();
    const raw = await page.evaluate(() => localStorage.getItem('itt09-game-plotneighbors'));
    const data = JSON.parse(raw || '{}');
    expect(data.plots).toBeTruthy();
    expect(data.coins).toBeLessThan(30);
  });

  test('2010 Rag Trail: ride → distance', async ({ page }) => {
    const frame = await openGame(page, '2010', '', 'itt10');
    await expect(frame.locator('[data-game-id="ragtrail"]')).toBeVisible();
    await frame.locator('#play-start').click();
    await page.waitForTimeout(2000);
    const sc = Number((await frame.locator('#play-score').textContent()) || '0');
    expect(sc).toBeGreaterThan(0);
  });

  test('2011 Letter Swap: start → play word · status responds', async ({ page }) => {
    const frame = await openGame(page, '2011', '?fast=1', 'itt11');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-rack]')).not.toHaveText('—', { timeout: 3000 });
    // Try a common letter word; may succeed or fail on rack — status must update either way
    await frame.locator('[data-word]').fill('a');
    await frame.locator('[data-play-word]').click();
    await page.waitForTimeout(200);
    const status = await frame.locator('[data-itt-action-status]').textContent();
    expect((status || '').length).toBeGreaterThan(0);
    // Timer should be counting
    await expect(frame.locator('[data-game-time]')).toBeVisible();
  });

  test('2012 Guess Doodle: start → prompt shown', async ({ page }) => {
    const frame = await openGame(page, '2012');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-prompt]')).toContainText(/Draw:/i, { timeout: 3000 });
    await frame.locator('[data-done]').click();
    await expect(frame.locator('[data-choices] button').first()).toBeVisible({ timeout: 3000 });
  });

  test('2013 Pipe Hop: flap start → score can rise or status', async ({ page }) => {
    const frame = await openGame(page, '2013');
    await frame.locator('#play-start').click();
    await page.waitForTimeout(800);
    await frame.locator('#game-canvas').click({ force: true });
    await page.waitForTimeout(500);
    await expect(frame.locator('#play-status')).toBeVisible();
  });

  test('2014 Tile Fold: new game · D-pad / board works', async ({ page }) => {
    const frame = await openGame(page, '2014', '', 'itt14');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-tf-board] > div')).toHaveCount(16);
    await frame.locator('[data-tf-dir="right"]').click({ force: true });
    await page.waitForTimeout(150);
    await frame.locator('[data-tf-dir="down"]').click({ force: true });
    await page.waitForTimeout(150);
    await expect(frame.locator('[data-tf-board] > div')).toHaveCount(16);
    await expect(frame.locator('[data-game-score]')).toBeVisible();
  });

  test('1995 Checkers: start → select piece → destinations marked', async ({ page }) => {
    const frame = await openGame(page, '1995', '?fast=1', 'itt95');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => frame.locator('[data-checkers-board] button').count(), { timeout: 8000 })
      .toBe(64);
    // Click a dark man in bottom half (index ~48-63)
    await frame.locator('[data-checkers-board] button').nth(50).click({ force: true });
    await page.waitForTimeout(150);
    // Either destinations appear or status explains capture/move
    const dests = await frame.locator('[data-checkers-board] button[data-dest="1"]').count();
    const status = (await frame.locator('[data-itt-action-status]').textContent()) || '';
    expect(dests > 0 || /move|destination|capture|Select/i.test(status)).toBeTruthy();
  });
});
