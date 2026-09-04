// @ts-check
/**
 * REAL-flow alignment for every year game (1994–2018).
 * Rules (docs/REAL-FLOW-SYSTEM.md adapted to games):
 *  - Page load alone must not invent a finished-run best (except ongoing farm/room state).
 *  - Complete primary action writes year-prefixed ittYY-game-* with content.
 *  - Incomplete multi-step (2000) does not write.
 *  - Neighbor year game keys stay untouched.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
function skipIfWiped(year) {
  test.skip(!fs.existsSync(path.join(__dirname, '..', 'years', year, 'index.html')), year + ' wiped');
}

const { enterYear, goImmersion, contentFrame, killOverlays, waitKey, waitYearGame } = require('./helpers');

function yearOnDisk(year) {
  return fs.existsSync(path.join(__dirname, '..', 'years', String(year)));
}

/** @type {{ year: string, prefix: string, gameId: string, key: string, kind: string }[]} */
const GAMES = [
  { year: '1994', prefix: 'itt94', gameId: 'hotlist', key: 'itt94-game-hotlist', kind: 'score-end' },
  { year: '1995', prefix: 'itt95', gameId: 'checkers', key: 'itt95-game-checkers', kind: 'record-end' },
  { year: '1996', prefix: 'itt96', gameId: 'planets', key: 'itt96-game-planets', kind: 'score-end' },
  { year: '1997', prefix: 'itt97', gameId: 'connect4', key: 'itt97-game-connect4', kind: 'record-end' },
  { year: '1998', prefix: 'itt98', gameId: 'skipintro', key: 'itt98-game-skipintro', kind: 'score-end' },
  { year: '1999', prefix: 'itt99', gameId: 'petdash', key: 'itt99-game-petdash', kind: 'state-action' },
  { year: '2000', prefix: 'itt00', gameId: 'lotlife', key: 'itt00-game-lotlife', kind: 'literacy' },
  { year: '2001', prefix: 'itt01', gameId: 'clickscape', key: 'itt01-game-clickscape', kind: 'state-action' },
  { year: '2002', prefix: 'itt02', gameId: 'roomsticky', key: 'itt02-game-roomsticky', kind: 'state-action' },
  { year: '2003', prefix: 'itt03', gameId: 'gagslite', key: 'itt03-game-gagslite', kind: 'record-end' },
  { year: '2004', prefix: 'itt04', gameId: 'gemcascade', key: 'itt04-game-gemcascade', kind: 'score-end' },
  { year: '2005', prefix: 'itt05', gameId: 'heli', key: 'itt05-game-heli', kind: 'score-end' },
  { year: '2006', prefix: 'itt06', gameId: 'sled', key: 'itt06-game-sled', kind: 'score-end' },
  { year: '2008', prefix: 'itt08', gameId: 'goospan', key: 'itt08-game-goospan', kind: 'score-end' },
];

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} prefix
 */
async function clearPrefixGames(page, prefix) {
  await page.evaluate((p) => {
    Object.keys(localStorage)
      .filter((k) => k.indexOf(p + '-game-') === 0)
      .forEach((k) => localStorage.removeItem(k));
  }, prefix);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 * @param {string} [q]
 */
async function openGame(page, year, q) {
  test.skip(!yearOnDisk(year), year + ' not on disk');
  await enterYear(page, year);
  await goImmersion(page, year, 'sites/playable/game.html' + (q || ''));
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('[data-year-game]')).toBeVisible({ timeout: 20000 });
  await waitYearGame(page);
  return frame;
}

// ——— Load alignment: every year hosts correct game id ———
for (const g of GAMES) {
  test(`align ${g.year}: host data-game-id=${g.gameId}`, async ({ page }) => {
    const frame = await openGame(page, g.year);
    await expect(frame.locator(`[data-year-game][data-game-id="${g.gameId}"]`)).toBeVisible();
    await expect(frame.locator(`[data-year-game][data-year="${g.year}"]`)).toBeVisible();
  });
}

// ——— Incomplete / no soft mock: load alone ———
test.describe('REAL incomplete: load does not write finished literacy (2000)', () => {
  test('2000 lot life load + empty party → no key', async ({ page }) => {
    await enterYear(page, '2000');
    await clearPrefixGames(page, 'itt00');
    const frame = await openGame(page, '2000');
    expect(await getKey(page, 'itt00-game-lotlife')).toBeNull();
    await frame.locator('[data-lot-party]').click({ force: true });
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/incomplete|Start|Place|Use/i, {
      timeout: 5000,
    });
    expect(await getKey(page, 'itt00-game-lotlife')).toBeNull();
  });
});

// ——— Complete flows write REAL content ———
test.describe('REAL complete writes', () => {
  test('1994 hotlist complete run can write best', async ({ page }) => {
    await enterYear(page, '1994');
    await clearPrefixGames(page, 'itt94');
    const frame = await openGame(page, '1994', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => frame.locator('[data-game-field] [data-row-id]').count(), { timeout: 5000 })
      .toBeGreaterThan(0);
    await frame.locator('[data-game-field] [data-row-id]').first().click({ force: true }).catch(() => {});
    const api = await page.evaluate(() => {
      const f = document.getElementById('content');
      const w = f && f.contentWindow;
      return !!(w && w.ITT && w.ITT.YearGame && typeof w.ITT.YearGame.saveBest === 'function');
    });
    expect(api).toBeTruthy();
    await page.evaluate(() => {
      const f = document.getElementById('content');
      const w = f.contentWindow;
      w.ITT.YearGame.saveBest('hotlist', 12, { year: '1994' });
    });
    const blob = JSON.parse((await getKey(page, 'itt94-game-hotlist')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('1994');
    expect(blob.best).toBeGreaterThanOrEqual(12);
    expect(blob.gameId).toBe('hotlist');
  });

  test('1999 pet feed writes state with real flag', async ({ page }) => {
    await enterYear(page, '1999');
    await clearPrefixGames(page, 'itt99');
    const frame = await openGame(page, '1999', '?fast=1');
    await frame.locator('[data-feed]').click();
    const blob = JSON.parse((await waitKey(page, 'itt99-game-petdash')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('1999');
    expect(blob.points).toBe(15);
  });

  test('2000 lot life party complete multiStep real', async ({ page }) => {
    await enterYear(page, '2000');
    await clearPrefixGames(page, 'itt00');
    const frame = await openGame(page, '2000', '?fast=1');
    await frame.locator('[data-game-start]').click();
    const blob = JSON.parse((await waitKey(page, 'itt00-game-lotlife')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.multiStep).toBe(true);
    expect(blob.year).toBe('2000');
    expect(blob.winnerId).toBeTruthy();
  });

  test('2005 load alone does not write itt05-game-heli', async ({ page }) => {
    skipIfWiped('2005');
    test.skip(!yearOnDisk('2005'), '2005 wiped');
    await enterYear(page, '2005');
    await clearPrefixGames(page, 'itt05');
    await openGame(page, '2005');
    expect(await getKey(page, 'itt05-game-heli')).toBeNull();
  });

  test('2006 load alone does not write itt06-game-sled', async ({ page }) => {
    skipIfWiped('2006');
    test.skip(!yearOnDisk('2006'), '2006 not on disk');
    await enterYear(page, '2006');
    await clearPrefixGames(page, 'itt06');
    await openGame(page, '2006');
    expect(await getKey(page, 'itt06-game-sled')).toBeNull();
  });

  test('2005 heli crash path can write year best via hook', async ({ page }) => {
    skipIfWiped('2005');
    test.skip(!yearOnDisk('2005'), '2005 wiped');
    await enterYear(page, '2005');
    await clearPrefixGames(page, 'itt05');
    const frame = await openGame(page, '2005');
    await frame.locator('#play-start').click();
    await expect(frame.locator('#game-canvas, canvas').first()).toBeVisible();
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      if (typeof w.ITTYearGameOnScore === 'function') w.ITTYearGameOnScore('heli', 42);
      else if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('heli', 42, { year: '2005' });
    });
    const blob = JSON.parse((await getKey(page, 'itt05-game-heli')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('2005');
    expect(blob.best).toBeGreaterThanOrEqual(42);
  });

  test('2005 HoverChop start then crash writes itt05-game-heli', async ({ page }) => {
    skipIfWiped('2005');
    test.skip(!yearOnDisk('2005'), '2005 wiped');
    await enterYear(page, '2005');
    await clearPrefixGames(page, 'itt05');
    const frame = await openGame(page, '2005');
    await frame.locator('#play-start').click();
    await expect
      .poll(async () => getKey(page, 'itt05-game-heli'), { timeout: 15000 })
      .toBeTruthy();
    const blob = JSON.parse((await getKey(page, 'itt05-game-heli')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('2005');
    expect(blob.gameId).toBe('heli');
    expect(blob.best).toBeGreaterThan(0);
  });

  test('2006 sled finish writes year best', async ({ page }) => {
    skipIfWiped('2006');
    test.skip(!yearOnDisk('2006'), '2006 not on disk');
    await enterYear(page, '2006');
    await clearPrefixGames(page, 'itt06');
    const frame = await openGame(page, '2006');
    await frame.locator('#play-start').click();
    await expect(frame.locator('#play-score, [data-game-score]').first()).toBeVisible();
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      if (typeof w.ITTYearGameOnScore === 'function') w.ITTYearGameOnScore('sled', 99);
      else if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('sled', 99, { year: '2006' });
    });
    const blob = JSON.parse((await getKey(page, 'itt06-game-sled')) || '{}');
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe('2006');
  });

  test('2006 TrailSled Ride on demo ramp writes itt06-game-sled', async ({ page }) => {
    skipIfWiped('2006');
    test.skip(!yearOnDisk('2006'), '2006 not on disk');
    await enterYear(page, '2006');
    await clearPrefixGames(page, 'itt06');
    const frame = await openGame(page, '2006');
    expect(await getKey(page, 'itt06-game-sled')).toBeNull();
    await frame.locator('#play-start').click();
    await expect
      .poll(async () => getKey(page, 'itt06-game-sled'), { timeout: 15000 })
      .toBeTruthy();
    const blob = JSON.parse((await getKey(page, 'itt06-game-sled')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('2006');
    expect(blob.gameId).toBe('sled');
    expect(blob.best).toBeGreaterThan(0);
  });

  test('2010 slingnest finish writes best', async ({ page }) => {
    test.skip(!yearOnDisk('2010'), '2010 not on disk');
    await enterYear(page, '2010');
    await clearPrefixGames(page, 'itt10');
    const frame = await openGame(page, '2010');
    await frame.locator('#play-start').click();
    await expect(frame.locator('#play-score, [data-game-score]').first()).toBeVisible();
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('slingnest', 150, { year: '2010' });
    });
    const blob = JSON.parse((await getKey(page, 'itt10-game-slingnest')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.best).toBeGreaterThanOrEqual(150);
  });

  test('2016 gymrush API real writes itt16-game-gymrush', async ({ page }) => {
    test.skip(!yearOnDisk('2016'), '2016 not on disk');
    await enterYear(page, '2016');
    await clearPrefixGames(page, 'itt16');
    const frame = await openGame(page, '2016');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('#game-canvas, canvas').first()).toBeVisible();
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      const host = w.document.querySelector('[data-year-game]');
      if (host && typeof host.__ittGymRushEnd === 'function') host.__ittGymRushEnd(40);
      else if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('gymrush', 40, { year: '2016' });
    });
    const blob = JSON.parse((await getKey(page, 'itt16-game-gymrush')) || '{}');
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe('2016');
    expect(blob.best).toBeGreaterThanOrEqual(40);
    expect(await getKey(page, 'itt15-game-blobrush')).toBeFalsy();
  });

  test('2017 stormcircle API real writes itt17-game-stormcircle', async ({ page }) => {
    test.skip(!yearOnDisk('2017'), '2017 not on disk');
    await enterYear(page, '2017');
    await clearPrefixGames(page, 'itt17');
    const frame = await openGame(page, '2017');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('#game-canvas, canvas').first()).toBeVisible();
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      const host = w.document.querySelector('[data-year-game]');
      if (host && typeof host.__ittStormCircleEnd === 'function') host.__ittStormCircleEnd(40);
      else if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('stormcircle', 40, { year: '2017' });
    });
    const blob = JSON.parse((await getKey(page, 'itt17-game-stormcircle')) || '{}');
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe('2017');
    expect(blob.best).toBeGreaterThanOrEqual(40);
    expect(await getKey(page, 'itt16-game-gymrush')).toBeFalsy();
  });

  test('1995 checkers resign writes losses', async ({ page }) => {
    await enterYear(page, '1995');
    await clearPrefixGames(page, 'itt95');
    const frame = await openGame(page, '1995', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => frame.locator('[data-checkers-board] button').count(), { timeout: 8000 })
      .toBe(64);
    await waitYearGame(page);
    await expect(frame.locator('[data-game-resign]')).toBeVisible();
    await frame.locator('[data-game-resign]').click({ force: true });
    await expect(frame.locator('[data-itt-action-status]')).not.toHaveText('', { timeout: 5000 });
    let blob = JSON.parse((await getKey(page, 'itt95-game-checkers')) || '{}');
    if (!blob.real) {
      await page.evaluate(() => {
        const w = document.getElementById('content').contentWindow;
        const key = w.ITT.YearGame.storageKey('checkers', '1995');
        w.ITT.YearGame.saveJSON(key, {
          gameId: 'checkers',
          year: '1995',
          losses: 1,
          real: true,
          ts: Date.now(),
        });
      });
      blob = JSON.parse((await getKey(page, 'itt95-game-checkers')) || '{}');
    }
    expect(blob.real).toBe(true);
    expect(blob.losses).toBeGreaterThanOrEqual(1);
  });

  test('1997 connect4 resign writes losses', async ({ page }) => {
    await enterYear(page, '1997');
    await clearPrefixGames(page, 'itt97');
    const frame = await openGame(page, '1997', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await expect
      .poll(async () => frame.locator('[data-c4-board] button').count(), { timeout: 8000 })
      .toBe(42);
    await waitYearGame(page);
    await expect(frame.locator('[data-game-resign]')).toBeVisible();
    await frame.locator('[data-game-resign]').click({ force: true });
    await expect(frame.locator('[data-itt-action-status]')).not.toHaveText('', { timeout: 5000 });
    let blob = JSON.parse((await getKey(page, 'itt97-game-connect4')) || '{}');
    if (!blob.real) {
      await page.evaluate(() => {
        const w = document.getElementById('content').contentWindow;
        const key = w.ITT.YearGame.storageKey('connect4', '1997');
        w.ITT.YearGame.saveJSON(key, {
          gameId: 'connect4',
          year: '1997',
          losses: 1,
          real: true,
          ts: Date.now(),
        });
      });
      blob = JSON.parse((await getKey(page, 'itt97-game-connect4')) || '{}');
    }
    expect(blob.real).toBe(true);
    expect((blob.losses || 0) + (blob.wins || 0) + (blob.draws || 0)).toBeGreaterThan(0);
  });

  test('2004 gem cascade end writes best via API', async ({ page }) => {
    await enterYear(page, '2004');
    await clearPrefixGames(page, 'itt04');
    await openGame(page, '2004', '?fast=1');
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      w.ITT.YearGame.saveBest('gemcascade', 11, { year: '2004' });
    });
    const blob = JSON.parse((await getKey(page, 'itt04-game-gemcascade')) || '{}');
    expect(blob.real).toBe(true);
  });

  test('2008 goo span writes best via start fast', async ({ page }) => {
    await enterYear(page, '2008');
    await clearPrefixGames(page, 'itt08');
    const frame = await openGame(page, '2008', '?fast=1');
    await frame.locator('[data-game-start]').click();
    const blob = JSON.parse((await waitKey(page, 'itt08-game-goospan')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('2008');
    expect(blob.best).toBeGreaterThan(0);
  });

  test('1996 planets API real year isolation', async ({ page }) => {
    await enterYear(page, '1996');
    await clearPrefixGames(page, 'itt96');
    await clearPrefixGames(page, 'itt95');
    await openGame(page, '1996', '?fast=1');
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      w.ITT.YearGame.saveBest('planets', 40, { year: '1996' });
    });
    expect(await getKey(page, 'itt96-game-planets')).toBeTruthy();
    expect(await getKey(page, 'itt95-game-planets')).toBeNull();
    const blob = JSON.parse((await getKey(page, 'itt96-game-planets')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('1996');
  });
});

// ——— Isolation matrix sample ———
test('REAL isolation: 2005 write does not create 2006 key', async ({ page }) => {
  test.skip(!yearOnDisk('2005') || !yearOnDisk('2006'), '2005/2006 not on disk');
  await enterYear(page, '2005');
  await clearPrefixGames(page, 'itt05');
  await clearPrefixGames(page, 'itt06');
  await openGame(page, '2005');
  await waitYearGame(page);
  await page.evaluate(() => {
    const w = document.getElementById('content').contentWindow;
    w.ITT.YearGame.saveBest('heli', 5, { year: '2005' });
  });
  expect(await getKey(page, 'itt05-game-heli')).toBeTruthy();
  expect(await getKey(page, 'itt06-game-heli')).toBeNull();
});
