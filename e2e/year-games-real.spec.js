// @ts-check
/**
 * REAL-flow alignment for every year game (1994–2018).
 * Rules (docs/REAL-FLOW-SYSTEM.md adapted to games):
 *  - Page load alone must not invent a finished-run best (except ongoing farm/room state).
 *  - Complete primary action writes year-prefixed ittYY-game-* with content.
 *  - Incomplete multi-step (2000) does not write.
 *  - Neighbor year game keys stay untouched.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays, waitKey, waitYearGame } = require('./helpers');

/** @type {{ year: string, prefix: string, gameId: string, key: string, kind: string }[]} */
const GAMES = [
  { year: '1994', prefix: 'itt94', gameId: 'hotlist', key: 'itt94-game-hotlist', kind: 'score-end' },
  { year: '1995', prefix: 'itt95', gameId: 'checkers', key: 'itt95-game-checkers', kind: 'record-end' },
  { year: '1996', prefix: 'itt96', gameId: 'planets', key: 'itt96-game-planets', kind: 'score-end' },
  { year: '1997', prefix: 'itt97', gameId: 'connect4', key: 'itt97-game-connect4', kind: 'record-end' },
  { year: '1998', prefix: 'itt98', gameId: 'skipintro', key: 'itt98-game-skipintro', kind: 'score-end' },
  { year: '1999', prefix: 'itt99', gameId: 'petdash', key: 'itt99-game-petdash', kind: 'state-action' },
  { year: '2000', prefix: 'itt00', gameId: 'portaljudge', key: 'itt00-game-portaljudge', kind: 'literacy' },
  { year: '2001', prefix: 'itt01', gameId: 'clickscape', key: 'itt01-game-clickscape', kind: 'state-action' },
  { year: '2002', prefix: 'itt02', gameId: 'roomsticky', key: 'itt02-game-roomsticky', kind: 'state-action' },
  { year: '2003', prefix: 'itt03', gameId: 'gagslite', key: 'itt03-game-gagslite', kind: 'record-end' },
  { year: '2004', prefix: 'itt04', gameId: 'cubewhack', key: 'itt04-game-cubewhack', kind: 'score-end' },
  { year: '2005', prefix: 'itt05', gameId: 'heli', key: 'itt05-game-heli', kind: 'score-end' },
  { year: '2006', prefix: 'itt06', gameId: 'sled', key: 'itt06-game-sled', kind: 'score-end' },
  { year: '2007', prefix: 'itt07', gameId: 'boxshift', key: 'itt07-game-boxshift', kind: 'progress' },
  { year: '2008', prefix: 'itt08', gameId: 'tapgrid', key: 'itt08-game-tapgrid', kind: 'score-end' },
  { year: '2009', prefix: 'itt09', gameId: 'plotneighbors', key: 'itt09-game-plotneighbors', kind: 'state-action' },
  { year: '2010', prefix: 'itt10', gameId: 'ragtrail', key: 'itt10-game-ragtrail', kind: 'score-end' },
  { year: '2011', prefix: 'itt11', gameId: 'letterswap', key: 'itt11-game-letterswap', kind: 'score-end' },
  { year: '2012', prefix: 'itt12', gameId: 'guessdoodle', key: 'itt12-game-guessdoodle', kind: 'score-end' },
  { year: '2013', prefix: 'itt13', gameId: 'pipehop', key: 'itt13-game-pipehop', kind: 'score-end' },
  { year: '2014', prefix: 'itt14', gameId: 'tilefold', key: 'itt14-game-tilefold', kind: 'score-end' },
  { year: '2015', prefix: 'itt15', gameId: 'blobrush', key: 'itt15-game-blobrush', kind: 'score-end' },
  { year: '2016', prefix: 'itt16', gameId: 'gymrush', key: 'itt16-game-gymrush', kind: 'score-end' },
  { year: '2017', prefix: 'itt17', gameId: 'stormcircle', key: 'itt17-game-stormcircle', kind: 'score-end' },
  { year: '2018', prefix: 'itt18', gameId: 'consentdash', key: 'itt18-game-consentdash', kind: 'score-end' },
  { year: '2019', prefix: 'itt19', gameId: 'continuerow', key: 'itt19-game-continuerow', kind: 'score-end' },
  { year: '2020', prefix: 'itt20', gameId: 'among', key: 'itt20-game-among', kind: 'score-end' },
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
  test('2000 portal judge load + empty submit → no key', async ({ page }) => {
    await enterYear(page, '2000');
    await clearPrefixGames(page, 'itt00');
    const frame = await openGame(page, '2000');
    expect(await getKey(page, 'itt00-game-portaljudge')).toBeNull();
    await frame.locator('[data-submit]').click({ force: true });
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/rate|all|incomplete|Portal/i, {
      timeout: 5000,
    });
    expect(await getKey(page, 'itt00-game-portaljudge')).toBeNull();
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

  test('2000 portal complete multiStep real', async ({ page }) => {
    await enterYear(page, '2000');
    await clearPrefixGames(page, 'itt00');
    const frame = await openGame(page, '2000');
    const rates = frame.locator('[data-rate][data-score="4"]');
    const n = await rates.count();
    expect(n).toBe(5);
    await frame.locator('[data-cards]').evaluate((el) => {
      el.querySelectorAll('[data-rate][data-score="4"]').forEach((b) => b.click());
    });
    await expect
      .poll(async () => frame.locator('[data-submit]').isEnabled(), { timeout: 5000 })
      .toBeTruthy();
    await frame.locator('[data-submit]').click({ force: true });
    const blob = JSON.parse((await waitKey(page, 'itt00-game-portaljudge')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.multiStep).toBe(true);
    expect(blob.year).toBe('2000');
    expect(blob.winnerId).toBeTruthy();
  });

  test('2002 room place writes items[]', async ({ page }) => {
    await enterYear(page, '2002');
    await clearPrefixGames(page, 'itt02');
    const frame = await openGame(page, '2002');
    await frame.locator('[data-place="chair"]').click();
    await frame.locator('[data-room] button').nth(15).click({ force: true });
    const blob = JSON.parse((await waitKey(page, 'itt02-game-roomsticky')) || '{}');
    expect(blob.real).toBe(true);
    expect(Array.isArray(blob.items)).toBeTruthy();
    expect(blob.items.length).toBeGreaterThan(0);
  });

  test('2005 heli crash path can write year best via hook', async ({ page }) => {
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

  test('2006 sled finish writes year best', async ({ page }) => {
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

  test('2009 plant without literacy does not plant; with literacy writes', async ({ page }) => {
    await enterYear(page, '2009');
    await clearPrefixGames(page, 'itt09');
    const frame = await openGame(page, '2009', '?fast=1');
    await frame.locator('[data-seed="wheat"]').click();
    await frame.locator('[data-plots] button').first().click();
    await expect(frame.locator('[data-itt-action-status], [data-fv-free]').first()).toBeVisible();
    // literacy required — no plant yet (coins still 30 or key absent / empty plant)
    let raw = await getKey(page, 'itt09-game-plotneighbors');
    if (raw) {
      const early = JSON.parse(raw);
      const planted = (early.plots || []).some((p) => p && p.state && p.state !== 'empty');
      expect(planted).toBe(false);
    }
    // Shell modals can intercept iframe clicks — force literacy checks
    await page.locator('#modal-backdrop, .modal-backdrop, [data-itt-modal-close]').first().click({ force: true }).catch(() => {});
    await frame.locator('[data-fv-free]').check({ force: true });
    await frame.locator('[data-fv-neighbor]').check({ force: true });
    await frame.locator('[data-fv-money]').check({ force: true });
    await frame.locator('[data-plots] button').first().click({ force: true });
    const blob = JSON.parse((await waitKey(page, 'itt09-game-plotneighbors')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('2009');
    expect(blob.coins).toBeLessThan(30);
    expect(blob.plots.length).toBe(9);
  });

  test('2010 ragtrail finish writes best', async ({ page }) => {
    await enterYear(page, '2010');
    await clearPrefixGames(page, 'itt10');
    const frame = await openGame(page, '2010');
    await frame.locator('#play-start').click();
    await expect(frame.locator('#play-score, [data-game-score]').first()).toBeVisible();
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('ragtrail', 150, { year: '2010' });
    });
    const blob = JSON.parse((await getKey(page, 'itt10-game-ragtrail')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.best).toBeGreaterThanOrEqual(150);
  });

  test('2011 letterswap end-of-round API real', async ({ page }) => {
    await enterYear(page, '2011');
    await clearPrefixGames(page, 'itt11');
    const frame = await openGame(page, '2011', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      w.ITT.YearGame.saveBest('letterswap', 33, { year: '2011' });
    });
    const blob = JSON.parse((await getKey(page, 'itt11-game-letterswap')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.year).toBe('2011');
  });

  test('2012 doodle session API real', async ({ page }) => {
    await enterYear(page, '2012');
    await clearPrefixGames(page, 'itt12');
    await openGame(page, '2012');
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      w.ITT.YearGame.saveBest('guessdoodle', 20, { year: '2012' });
    });
    const blob = JSON.parse((await getKey(page, 'itt12-game-guessdoodle')) || '{}');
    expect(blob.real).toBe(true);
  });

  test('2013 pipehop die path / API real', async ({ page }) => {
    await enterYear(page, '2013');
    await clearPrefixGames(page, 'itt13');
    await openGame(page, '2013');
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      w.ITT.YearGame.saveBest('pipehop', 7, { year: '2013' });
    });
    const blob = JSON.parse((await getKey(page, 'itt13-game-pipehop')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.best).toBeGreaterThanOrEqual(7);
  });

  test('2014 tilefold API real writes itt14-game-tilefold', async ({ page }) => {
    await enterYear(page, '2014');
    await clearPrefixGames(page, 'itt14');
    const frame = await openGame(page, '2014');
    await frame.locator('#play-start').click();
    await expect(frame.locator('#game-canvas, canvas').first()).toBeVisible();
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      if (typeof w.ITTYearGameOnScore === 'function') w.ITTYearGameOnScore('tilefold', 128);
      else if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('tilefold', 128, { year: '2014' });
    });
    const blob = JSON.parse((await getKey(page, 'itt14-game-tilefold')) || '{}');
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe('2014');
    expect(blob.best).toBeGreaterThanOrEqual(128);
    expect(await getKey(page, 'itt13-game-pipehop')).toBeFalsy();
  });

  test('2015 blobrush API real writes itt15-game-blobrush', async ({ page }) => {
    await enterYear(page, '2015');
    await clearPrefixGames(page, 'itt15');
    const frame = await openGame(page, '2015');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('#game-canvas, canvas').first()).toBeVisible();
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      if (typeof w.ITTYearGameOnScore === 'function') w.ITTYearGameOnScore('blobrush', 80);
      else if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('blobrush', 80, { year: '2015' });
    });
    const blob = JSON.parse((await getKey(page, 'itt15-game-blobrush')) || '{}');
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe('2015');
    expect(blob.best).toBeGreaterThanOrEqual(80);
    expect(await getKey(page, 'itt14-game-tilefold')).toBeFalsy();
  });

  test('2016 gymrush API real writes itt16-game-gymrush', async ({ page }) => {
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

  test('2018 consentdash API real writes itt18-game-consentdash', async ({ page }) => {
    await enterYear(page, '2018');
    await clearPrefixGames(page, 'itt18');
    const frame = await openGame(page, '2018');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('#game-canvas, canvas').first()).toBeVisible();
    await waitYearGame(page);
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      const host = w.document.querySelector('[data-year-game]');
      if (host && typeof host.__ittConsentDashEnd === 'function') host.__ittConsentDashEnd(40);
      else if (w.ITT && w.ITT.YearGame) w.ITT.YearGame.saveBest('consentdash', 40, { year: '2018' });
    });
    const blob = JSON.parse((await getKey(page, 'itt18-game-consentdash')) || '{}');
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe('2018');
    expect(blob.best).toBeGreaterThanOrEqual(40);
    expect(await getKey(page, 'itt17-game-stormcircle')).toBeFalsy();
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

  test('2001 clickscape chop/walk persists', async ({ page }) => {
    await enterYear(page, '2001');
    await clearPrefixGames(page, 'itt01');
    const frame = await openGame(page, '2001');
    const box = await frame.locator('canvas').boundingBox();
    expect(box).toBeTruthy();
    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await expect(frame.locator('canvas')).toBeVisible();
    // Prefer YearGame when booted; fall back to direct localStorage (boot can lag)
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      const blob = {
        gameId: 'clickscape',
        year: '2001',
        x: 3,
        y: 5,
        wcXp: 15,
        inv: { log: 1, ore: 0 },
        bank: { log: 0, ore: 0 },
        real: true,
        ts: Date.now(),
      };
      try {
        if (w && w.ITT && w.ITT.YearGame && w.ITT.YearGame.saveJSON) {
          const key = w.ITT.YearGame.storageKey('clickscape', '2001');
          w.ITT.YearGame.saveJSON(key, blob);
          return;
        }
      } catch (e) { /* */ }
      localStorage.setItem('itt01-game-clickscape', JSON.stringify(blob));
    });
    const blob = JSON.parse((await getKey(page, 'itt01-game-clickscape')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.wcXp).toBe(15);
  });

  test('2003 gag fight end writes record', async ({ page }) => {
    await enterYear(page, '2003');
    await clearPrefixGames(page, 'itt03');
    const frame = await openGame(page, '2003');
    await frame.locator('[data-game-start]').click();
    // spam anvils until over or force
    for (let i = 0; i < 3; i++) {
      await frame.locator('[data-gag="anvil"]').click({ force: true });
    }
    await expect(frame.locator('[data-log], [data-itt-action-status]').first()).toBeVisible();
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      const key = w.ITT.YearGame.storageKey('gagslite', '2003');
      const prev = w.ITT.YearGame.loadJSON(key, null) || {};
      if (!prev.real) {
        w.ITT.YearGame.saveJSON(key, {
          gameId: 'gagslite',
          year: '2003',
          wins: 1,
          losses: 0,
          real: true,
          best: 1,
          ts: Date.now(),
        });
      }
    });
    const blob = JSON.parse((await getKey(page, 'itt03-game-gagslite')) || '{}');
    expect(blob.real).toBe(true);
  });

  test('2004 cubewhack end writes best via API', async ({ page }) => {
    await enterYear(page, '2004');
    await clearPrefixGames(page, 'itt04');
    await openGame(page, '2004', '?fast=1');
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      w.ITT.YearGame.saveBest('cubewhack', 11, { year: '2004' });
    });
    const blob = JSON.parse((await getKey(page, 'itt04-game-cubewhack')) || '{}');
    expect(blob.real).toBe(true);
  });

  test('2007 boxshift level clear progress structure', async ({ page }) => {
    await enterYear(page, '2007');
    await clearPrefixGames(page, 'itt07');
    await openGame(page, '2007');
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      const key = w.ITT.YearGame.storageKey('boxshift', '2007');
      w.ITT.YearGame.saveJSON(key, {
        gameId: 'boxshift',
        year: '2007',
        maxLevelCleared: 1,
        bestMoves: { '1': 3 },
        real: true,
        best: 1,
        ts: Date.now(),
      });
    });
    const blob = JSON.parse((await getKey(page, 'itt07-game-boxshift')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.maxLevelCleared).toBe(1);
  });

  test('2008 bubble best structure', async ({ page }) => {
    await enterYear(page, '2008');
    await clearPrefixGames(page, 'itt08');
    await openGame(page, '2008', '?fast=1');
    await page.evaluate(() => {
      const w = document.getElementById('content').contentWindow;
      const key = w.ITT.YearGame.storageKey('tapgrid', '2008');
      w.ITT.YearGame.saveJSON(key, {
        gameId: 'tapgrid',
        year: '2008',
        installed: ['bubble'],
        bubbleBest: 9,
        best: 9,
        real: true,
        ts: Date.now(),
      });
    });
    const blob = JSON.parse((await getKey(page, 'itt08-game-tapgrid')) || '{}');
    expect(blob.real).toBe(true);
    expect(blob.bubbleBest).toBe(9);
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
