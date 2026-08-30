// @ts-check
/**
 * P0 games-integration gates (docs/GAMES-INTEGRATION-TODO-VERIFY-1994-2009.md §8).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays, waitKey } = require('./helpers');

const fs = require('fs');
const path = require('path');
const YEARS = [];
for (let y = 1994; y <= 2009; y++) {
  const s = String(y);
  if (fs.existsSync(path.join(__dirname, '..', 'years', s, 'index.html'))) YEARS.push(s);
}

const FEATURED = {
  1994: 'hotlist',
  1995: 'checkers',
  1996: 'planets',
  1997: 'connect4',
  1998: 'skipintro',
  1999: 'petdash',
  2000: 'lotlife',
  2001: 'clickscape',
  2002: 'roomsticky',
  2003: 'gagslite',
  2004: 'gemcascade',
  2005: 'heli',
  2006: 'sled',
  2007: 'boxshift',
  2008: 'goospan',
  2009: 'plotneighbors',
};

function prefix(year) {
  return year === '1994' ? 'itt94' : 'itt' + String(year).slice(2);
}

function keyFor(year) {
  return prefix(year) + '-game-' + FEATURED[year];
}

async function openGame(page, year, query) {
  await enterYear(page, year);
  await page.evaluate((p) => {
    Object.keys(localStorage)
      .filter((k) => k.indexOf(p + '-game-') === 0)
      .forEach((k) => localStorage.removeItem(k));
  }, prefix(year));
  await goImmersion(page, year, 'sites/playable/game.html' + (query || ''));
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('[data-year-game]')).toBeVisible({ timeout: 20000 });
  return frame;
}

test.describe('P0 2000 Lot Life gates', () => {
  test('place two pieces only — party still blocked', async ({ page }) => {
    const frame = await openGame(page, '2000');
    await frame.locator('[data-game-start]').click();
    await frame.locator('[data-lot-buy="fridge"]').click();
    await frame.locator('[data-lot-cell="1"]').click();
    await frame.locator('[data-lot-buy="tv"]').click();
    await frame.locator('[data-lot-cell="2"]').click();
    await expect(frame.locator('[data-year-game]')).toHaveAttribute('data-lot-placed', '2');
    await frame.locator('[data-lot-party]').click({ force: true });
    expect(await page.evaluate(() => localStorage.getItem('itt00-game-lotlife'))).toBeNull();
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/Place at least 3|Incomplete/i);
  });

  test('use once only — party still blocked', async ({ page }) => {
    const frame = await openGame(page, '2000');
    await frame.locator('[data-game-start]').click();
    await frame.locator('[data-lot-buy="fridge"]').click();
    await frame.locator('[data-lot-cell="1"]').click();
    await frame.locator('[data-lot-buy="tv"]').click();
    await frame.locator('[data-lot-cell="2"]').click();
    await frame.locator('[data-lot-buy="bed"]').click();
    await frame.locator('[data-lot-cell="3"]').click();
    await frame.locator('[data-lot-cell="1"]').click();
    await expect(frame.locator('[data-year-game]')).toHaveAttribute('data-lot-uses', '1');
    await frame.locator('[data-lot-party]').click({ force: true });
    expect(await page.evaluate(() => localStorage.getItem('itt00-game-lotlife'))).toBeNull();
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/Use two|Incomplete/i);
  });
});

test.describe('P0 2004 Gem Cascade fixtures', () => {
  test('bounce swap does not write', async ({ page }) => {
    const frame = await openGame(page, '2004', '?fixture=bounce');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-gem="0"]')).toBeVisible();
    const before = await frame.locator('[data-gem="0"]').getAttribute('aria-label');
    await frame.locator('[data-gem="0"]').click();
    await frame.locator('[data-gem="1"]').click();
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/bounce|No match/i);
    const after = await frame.locator('[data-gem="0"]').getAttribute('aria-label');
    expect(after).toBe(before);
    expect(await page.evaluate(() => localStorage.getItem('itt04-game-gemcascade'))).toBeNull();
  });

  test('known match-3 scores and can save later', async ({ page }) => {
    const frame = await openGame(page, '2004', '?fixture=match');
    await frame.locator('[data-game-start]').click();
    await frame.locator('[data-gem="2"]').click();
    await frame.locator('[data-gem="10"]').click();
    const score = Number((await frame.locator('[data-game-score]').textContent()) || '0');
    expect(score).toBeGreaterThanOrEqual(30);
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/Cascade/i);
  });

  test('zero-score end writes nothing', async ({ page }) => {
    const frame = await openGame(page, '2004', '?fixture=zero');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/nothing written|No matches/i);
    expect(await page.evaluate(() => localStorage.getItem('itt04-game-gemcascade'))).toBeNull();
  });
});

test.describe('P0 2008 Goo Span far click', () => {
  test('far click does not add a node', async ({ page }) => {
    const frame = await openGame(page, '2008');
    await frame.locator('[data-game-start]').click();
    await expect(frame.locator('[data-year-game]')).toHaveAttribute('data-goo-nodes', '2');
    const canvas = frame.locator('canvas');
    await canvas.click({ position: { x: 260, y: 150 }, force: true });
    await expect(frame.locator('[data-itt-action-status]')).toContainText(/Too far|closer/i);
    await expect(frame.locator('[data-year-game]')).toHaveAttribute('data-goo-nodes', '2');
    expect(await page.evaluate(() => localStorage.getItem('itt08-game-goospan'))).toBeNull();
  });
});

test.describe('P0 isolation + fast=1 load never writes', () => {
  test('2000 write does not create 1999 lotlife key', async ({ page }) => {
    await enterYear(page, '2000');
    await page.evaluate(() => {
      localStorage.removeItem('itt00-game-lotlife');
      localStorage.removeItem('itt99-game-lotlife');
    });
    const frame = await openGame(page, '2000', '?fast=1');
    await frame.locator('[data-game-start]').click();
    await waitKey(page, 'itt00-game-lotlife');
    expect(await page.evaluate(() => localStorage.getItem('itt99-game-lotlife'))).toBeNull();
  });

  for (const year of YEARS) {
    test(`${year} ?fast=1 load without Start writes nothing`, async ({ page }) => {
      await enterYear(page, year);
      await page.evaluate((p) => {
        Object.keys(localStorage)
          .filter((k) => k.indexOf(p + '-game-') === 0)
          .forEach((k) => localStorage.removeItem(k));
      }, prefix(year));
      await goImmersion(page, year, 'sites/playable/game.html?fast=1');
      await killOverlays(page);
      await page.waitForTimeout(2000);
      const raw = await page.evaluate((k) => localStorage.getItem(k), keyFor(year));
      expect(raw).toBeNull();
    });
  }
});
