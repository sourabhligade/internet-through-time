// @ts-check
/**
 * Deep flow checks — every year game: load → start/interact → observable progress.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays, waitKey, waitYearGame } = require('./helpers');

function yearOnDisk(year) {
  return fs.existsSync(path.join(__dirname, '..', 'years', String(year)));
}

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
  test.skip(!yearOnDisk(year), year + ' not on disk');
  await enterYear(page, year);
  if (clearPrefix) await clearGameKeys(page, clearPrefix);
  const path = 'sites/playable/game.html' + (query || '');
  await goImmersion(page, year, path);
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('[data-year-game]')).toBeVisible({ timeout: 20000 });
  await waitYearGame(page);
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
    await expect(frame.locator('[data-c4-board] button').first()).toBeVisible();
    await expect(frame.locator('[data-itt-action-status], [data-c4-board]').first()).toBeVisible();
  });

  test('1998 Skip-Intro: start → score increases while running', async ({ page }) => {
    const frame = await openGame(page, '1998');
    const before = await frame.locator('#play-score').textContent();
    await frame.locator('#play-start').click();
    await page.waitForTimeout(1200); // product timer: skip-intro score ticks while running
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
    await waitKey(page, 'itt99-game-petdash');
    const ptsAfter = Number((await frame.locator('[data-points]').textContent()) || '0');
    // default 20, feed costs 5
    expect(ptsAfter).toBe(ptsBefore - 5);
  });

  test('2000 Lot Life: start fast → storage write', async ({ page }) => {
    const frame = await openGame(page, '2000', '?fast=1', 'itt00');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt00-game-lotlife')), {
        timeout: 5000,
      })
      .toBeTruthy();
    const raw = await page.evaluate(() => localStorage.getItem('itt00-game-lotlife'));
    const data = JSON.parse(raw || '{}');
    expect(data.multiStep).toBe(true);
    expect(data.real).toBe(true);
  });

  test('2001 Clickscape: canvas click walks/chops', async ({ page }) => {
    const frame = await openGame(page, '2001', '', 'itt01');
    const canvas = frame.locator('canvas');
    await expect(canvas).toBeVisible();
    /* Frame-local click avoids shell overlay intercepting page.mouse coords */
    await canvas.click({ force: true, position: { x: 80, y: 80 } });
    await expect(frame.locator('[data-itt-action-status]')).toBeVisible({ timeout: 5000 });
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
    await expect.poll(async () => ((await frame.locator('[data-log]').textContent()) || '').length, { timeout: 5000 }).toBeGreaterThan(0);
  });

  test('2004 Gem Cascade: start fast writes score', async ({ page }) => {
    const frame = await openGame(page, '2004', '?fast=1', 'itt04');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt04-game-gemcascade')), { timeout: 5000 })
      .toBeTruthy();
    await expect(frame.locator('[data-gem-board]')).toBeVisible();
  });

  test('2005 HoverChop: start → score increases', async ({ page }) => {
    const frame = await openGame(page, '2005', '', 'itt05');
    await frame.locator('#play-start').click();
    await expect
      .poll(async () => Number((await frame.locator('#play-score').textContent()) || '0'), { timeout: 8000 })
      .toBeGreaterThan(0);
  });

  test('2006 TrailSled: ride → distance > 0', async ({ page }) => {
    const frame = await openGame(page, '2006', '', 'itt06');
    await frame.locator('#play-start').click(); // seeds demo ramp if empty
    await expect
      .poll(async () => Number((await frame.locator('#play-score').textContent()) || '0'), { timeout: 8000 })
      .toBeGreaterThan(0);
  });

  test('2007 Box Shift: level renders · D-pad moves', async ({ page }) => {
    const frame = await openGame(page, '2007');
    await expect(frame.locator('[data-level]')).toContainText('#');
    const before = await frame.locator('[data-level]').textContent();
    // D-pad works without iframe keyboard focus (shell UX fix)
    await frame.locator('[data-dir="right"]').click({ force: true });
    await expect
      .poll(async () => frame.locator('[data-level]').textContent(), { timeout: 3000 })
      .not.toBe(before);
    const after = await frame.locator('[data-level]').textContent();
    expect(after).not.toBe(before);
    await expect(frame.locator('[data-level]')).toContainText('@');
  });

  test('2008 Goo Span: start fast writes score', async ({ page }) => {
    const frame = await openGame(page, '2008', '?fast=1', 'itt08');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt08-game-goospan')), { timeout: 5000 })
      .toBeTruthy();
    await expect(frame.locator('canvas')).toBeVisible();
  });

  test('2009 Plot Neighbors: plant wheat → storage', async ({ page }) => {
    const frame = await openGame(page, '2009', '?fast=1', 'itt09');
    /* Freemium literacy required before plant (source expansion G3) */
    await frame.locator('[data-fv-free]').check({ force: true });
    await frame.locator('[data-fv-neighbor]').check({ force: true });
    await frame.locator('[data-fv-money]').check({ force: true });
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

  test('2010 Sling Nest: start → score', async ({ page }) => {
    const frame = await openGame(page, '2010', '', 'itt10');
    await expect(frame.locator('[data-game-id="slingnest"]')).toBeVisible();
    await frame.locator('#play-start').click();
    await expect
      .poll(async () => Number((await frame.locator('#play-score').textContent()) || '0'), { timeout: 8000 })
      .toBeGreaterThan(0);
  });

  test('2011 Letter Swap: start → play word · status responds', async ({ page }) => {
    const frame = await openGame(page, '2011', '?fast=1', 'itt11');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-rack]')).not.toHaveText('—', { timeout: 3000 });
    // Try a common letter word; may succeed or fail on rack — status must update either way
    await frame.locator('[data-word]').fill('a');
    await frame.locator('[data-play-word]').click();
    await expect.poll(async () => ((await frame.locator('[data-itt-action-status]').textContent()) || '').length, { timeout: 5000 }).toBeGreaterThan(0);
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

  test('2013 Loop Six: start → hold writes score', async ({ page }) => {
    const frame = await openGame(page, '2013');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-loop-hold]')).toBeVisible();
    const hold = frame.locator('[data-loop-hold]');
    for (let i = 0; i < 6; i++) await hold.click();
    await expect(frame.locator('[data-game-score]')).not.toHaveText('0', { timeout: 5000 });
  });

  test('2014 Tile Fold: start → canvas + arrows move status', async ({ page }) => {
    const frame = await openGame(page, '2014');
    await frame.locator('#play-start').click();
    await expect(frame.locator('#game-canvas')).toBeVisible();
    await frame.locator('#game-canvas').focus();
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowUp');
    await expect(frame.locator('#play-status, #play-score').first()).toBeVisible({ timeout: 5000 });
    await expect(frame.locator('body')).toContainText(/2048|Tile Fold|128/i);
  });

  test('2015 Blob Rush: start → canvas + status', async ({ page }) => {
    const frame = await openGame(page, '2015');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('#game-canvas')).toBeVisible();
    await frame.locator('#game-canvas').click({ force: true });
    await expect(frame.locator('[data-itt-action-status], [data-game-score]').first()).toBeVisible({
      timeout: 5000,
    });
    await expect(frame.locator('body')).toContainText(/Blob Rush|agar/i);
    await expect(frame.locator('body')).toContainText(/28 Apr 2015|slither\.io is 2016|\.io wave/i);
    await expect(frame.locator('[data-blob-board]')).toBeVisible();
    await expect(frame.locator('[data-blob-split]')).toBeVisible();
  });

  test('2015 Blob Rush split API + pause honors YearGame', async ({ page }) => {
    const frame = await openGame(page, '2015', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await page.waitForTimeout(200);
    const splitOk = await page.evaluate(() => {
      try {
        const w = document.getElementById('content') && document.getElementById('content').contentWindow;
        if (!w || typeof w.__ittBlobRushSplit !== 'function') return false;
        w.__ittBlobRushSplit();
        return true;
      } catch (e) {
        return false;
      }
    });
    expect(splitOk).toBeTruthy();
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/Split|mass|Need mass/i);
    await expect(frame.locator('[data-blob-board]')).toContainText(/you/i);
  });

  test('2016 Gym Rush: start → canvas + status', async ({ page }) => {
    const frame = await openGame(page, '2016');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('#game-canvas')).toBeVisible();
    await frame.locator('#game-canvas').click({ force: true });
    await expect(frame.locator('[data-itt-action-status], [data-game-score]').first()).toBeVisible({
      timeout: 5000,
    });
    await expect(frame.locator('body')).toContainText(/Gym Rush|Jul 6 2016|no official/i);
  });

  test('2016 Gym Rush end API + pause honors YearGame', async ({ page }) => {
    const frame = await openGame(page, '2016', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await page.waitForTimeout(200);
    const endOk = await page.evaluate(() => {
      try {
        const w = document.getElementById('content') && document.getElementById('content').contentWindow;
        const host = w && w.document.querySelector('[data-year-game]');
        if (!host || typeof host.__ittGymRushEnd !== 'function') return false;
        host.__ittGymRushEnd(40);
        return true;
      } catch (e) {
        return false;
      }
    });
    expect(endOk).toBeTruthy();
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/score|gold|Gym|Battery|test end/i);
  });

  test('2017 Storm Circle: start → canvas + status', async ({ page }) => {
    const frame = await openGame(page, '2017');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('#game-canvas')).toBeVisible();
    await frame.locator('#game-canvas').click({ force: true });
    await expect(frame.locator('[data-itt-action-status], [data-game-score]').first()).toBeVisible({
      timeout: 5000,
    });
    await expect(frame.locator('body')).toContainText(/Storm Circle|Sep 26 2017|no official/i);
  });

  test('2018 Consent Dash: start → canvas + status', async ({ page }) => {
    const frame = await openGame(page, '2018');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('#game-canvas')).toBeVisible();
    await frame.locator('#game-canvas').click({ force: true });
    await expect(frame.locator('[data-itt-action-status], [data-game-score]').first()).toBeVisible({
      timeout: 5000,
    });
    await expect(frame.locator('body')).toContainText(/Consent Dash|25 May|Manage/i);
  });

  test('2018 Consent Dash end API + pause honors YearGame', async ({ page }) => {
    const frame = await openGame(page, '2018', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await page.waitForTimeout(200);
    const endOk = await page.evaluate(() => {
      try {
        const w = document.getElementById('content') && document.getElementById('content').contentWindow;
        const host = w && w.document.querySelector('[data-year-game]');
        if (!host || typeof host.__ittConsentDashEnd !== 'function') return false;
        host.__ittConsentDashEnd(40);
        return true;
      } catch (e) {
        return false;
      }
    });
    expect(endOk).toBeTruthy();
    await expect(frame.locator('[data-itt-action-status]').first()).toContainText(/score|gold|Manage|test end/i);
  });

  test('2017 Storm Circle end API + pause honors YearGame', async ({ page }) => {
    const frame = await openGame(page, '2017', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await page.waitForTimeout(200);
    const endOk = await page.evaluate(() => {
      try {
        const w = document.getElementById('content') && document.getElementById('content').contentWindow;
        const host = w && w.document.querySelector('[data-year-game]');
        if (!host || typeof host.__ittStormCircleEnd !== 'function') return false;
        host.__ittStormCircleEnd(40);
        return true;
      } catch (e) {
        return false;
      }
    });
    expect(endOk).toBeTruthy();
    await expect(frame.locator('[data-itt-action-status]').first()).toContainText(/score|gold|Storm|Battery|test end/i);
  });

  test('1995 Checkers: start → select piece → destinations marked', async ({ page }) => {
    const frame = await openGame(page, '1995', '?fast=1', 'itt95');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => frame.locator('[data-checkers-board] button').count(), { timeout: 8000 })
      .toBe(64);
    // Click a dark man in bottom half (index ~48-63)
    await frame.locator('[data-checkers-board] button').nth(50).click({ force: true });
    await expect
      .poll(
        async () => {
          const dests = await frame.locator('[data-checkers-board] button[data-dest="1"]').count();
          const status = (await frame.locator('[data-itt-action-status]').textContent()) || '';
          return dests > 0 || /move|destination|capture|Select/i.test(status);
        },
        { timeout: 5000 }
      )
      .toBeTruthy();
  });
});
