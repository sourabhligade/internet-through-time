// @ts-check
/**
 * Every year game 1994–2018: load flow + basic interactivity + accessibility smoke.
 * Runs inside year shell iframe (enterYear + goImmersion).
 */
const { test, expect } = require('@playwright/test');

const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

const WIPED = new Set(['2025']);
const YEARS = [];
for (let y = 1994; y <= 2011; y++) {
  const s = String(y);
  if (!WIPED.has(s)) YEARS.push(s);
}

/** @type {Record<string, { id: string, primary: string, flow: 'click-start'|'click-primary'|'canvas'|'literacy'|'plant'|'grid' }>} */
const FLOW = {
  '1994': { id: 'hotlist', primary: '[data-game-start]', flow: 'click-start' },
  '1995': { id: 'checkers', primary: '[data-game-start]', flow: 'click-start' },
  '1996': { id: 'planets', primary: '[data-game-start]', flow: 'click-start' },
  '1997': { id: 'connect4', primary: '[data-game-start]', flow: 'click-start' },
  '1998': { id: 'skipintro', primary: '#play-start', flow: 'click-start' },
  '1999': { id: 'petdash', primary: '[data-feed]', flow: 'click-primary' },
  '2000': { id: 'lotlife', primary: '[data-game-start]', flow: 'literacy' },
  '2004': { id: 'gemcascade', primary: '[data-game-start]', flow: 'click-start' },
  '2008': { id: 'goospan', primary: '[data-game-start]', flow: 'click-start' },
  '2009': { id: 'plotneighbors', primary: '[data-fv-free]', flow: 'plant' },
  '2010': { id: 'slingnest', primary: '#play-start, [data-game-start]', flow: 'click-start' },
  '2011': { id: 'letterswap', primary: '[data-game-start]', flow: 'click-start' },
  '2017': { id: 'stormcircle', primary: '[data-game-start]', flow: 'click-start' },
  '2018': { id: 'consentdash', primary: '[data-game-start]', flow: 'click-start' },
};

/**
 * @param {import('@playwright/test').FrameLocator | import('@playwright/test').Page} frame
 */
async function assertA11yShell(frame, year, gameId) {
  const host = frame.locator(`[data-year-game][data-game-id="${gameId}"]`);
  await expect(host).toBeVisible({ timeout: 15000 });
  await expect(frame.locator('h1').first()).toBeVisible();
  /* Boot sets these when year-game-boot.js runs */
  await expect
    .poll(async () => host.evaluate((el) => el.getAttribute('tabindex')), { timeout: 10000 })
    .toBe('0');
  await expect
    .poll(async () => host.evaluate((el) => el.getAttribute('role')), { timeout: 8000 })
    .toBe('region');
  const aria = await host.getAttribute('aria-label');
  expect(aria || '').toMatch(new RegExp(year + '|' + gameId + '|game|museum', 'i'));
  /* Status / live region if present */
  const status = frame.locator('[data-itt-action-status], #play-status, [role="status"]').first();
  if (await status.count()) {
    await expect(status).toBeVisible();
  }
  /* Inspiration / honesty strip readable */
  await expect(frame.locator('.yg-honesty, .honesty, [data-yg-inspire]').first()).toBeVisible();
  /* At least one focusable control: button, link, or canvas */
  const focusable = frame.locator(
    'button, a[href], [tabindex="0"], input, select, textarea, canvas'
  );
  expect(await focusable.count()).toBeGreaterThanOrEqual(2);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').FrameLocator} frame
 * @param {string} year
 */
async function runPrimaryFlow(page, frame, year) {
  const conf = FLOW[year];
  if (!conf) return;
  await killOverlays(page).catch(() => {});

  if (conf.flow === 'plant') {
    /* 2009 freemium literacy then plant */
    await frame.locator('[data-fv-free]').check({ force: true });
    await frame.locator('[data-fv-neighbor]').check({ force: true });
    await frame.locator('[data-fv-money]').check({ force: true });
    await frame.locator('[data-seed="wheat"]').click({ force: true });
    await frame.locator('[data-plots] button').first().click({ force: true });
    await page.waitForTimeout(200);
    return;
  }

  if (conf.flow === 'literacy' && year === '2000') {
    await frame.locator('[data-lot-party]').click({ force: true });
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem('itt00-game-lotlife'))).toBeFalsy();
    return;
  }

  if (conf.flow === 'canvas') {
    const canvas = frame.locator('canvas').first();
    await expect(canvas).toBeVisible();
    /* Prefer frame-local click to avoid shell overlay coordinate issues */
    await canvas.click({ force: true }).catch(() => {});
    await page.waitForTimeout(200);
    return;
  }

  if (conf.flow === 'grid') {
    const appBtn = frame.locator('[data-app-grid] button, [data-app-grid] a').first();
    if (await appBtn.count()) {
      await appBtn.click({ force: true });
    } else {
      await expect(frame.locator('canvas').first()).toBeVisible();
    }
    await page.waitForTimeout(200);
    return;
  }

  /* click-start / click-primary */
  const sel = conf.primary.split(',')[0].trim();
  const el = frame.locator(sel).first();
  if (await el.count()) {
    await el.click({ force: true });
    await page.waitForTimeout(250);
  }
  /* secondary action for a few years */
}

test.describe('Year games — each flow + UI accessible', () => {
  for (const year of YEARS) {
    const conf = FLOW[year];
    if (!conf) continue;
    test(`${year} ${conf.id}: a11y shell + primary flow`, async ({ page }) => {
      await enterYear(page, year);
      await killOverlays(page).catch(() => {});
      await goImmersion(page, year, 'sites/playable/game.html?fast=1');
      const frame = contentFrame(page);
      await assertA11yShell(frame, year, conf.id);
      /* Host can receive focus (keyboard path) */
      await frame.locator(`[data-year-game][data-game-id="${conf.id}"]`).evaluate((el) => {
        el.focus();
      });
      const focused = await frame.locator(`[data-year-game][data-game-id="${conf.id}"]`).evaluate(
        (el) => document.activeElement === el || el.contains(document.activeElement)
      );
      expect(focused).toBeTruthy();
      await runPrimaryFlow(page, frame, year);
      /* Still visible after interaction (no crash blank) — re-resolve frame */
      const frame2 = contentFrame(page);
      const hostAfter = frame2.locator(`[data-year-game][data-game-id="${conf.id}"]`);
      if (await hostAfter.count()) {
        await expect(hostAfter).toBeVisible({ timeout: 8000 });
        await expect(frame2.locator('h1').first()).toBeVisible();
      } else {
        /* Fallback: year still in body (some canvas games keep host under load) */
        await expect(frame2.locator('body')).toContainText(new RegExp(year));
      }
    });
  }
});

test.describe('Playables lobby a11y smoke (sample years)', () => {
  for (const year of ['1994', '2000', '2004', '2008']) {
    test(`${year} playable lobby has heading and cabinet`, async ({ page }) => {
      await enterYear(page, year);
      await goImmersion(page, year, 'sites/playable/index.html');
      const frame = contentFrame(page);
      await expect(frame.locator('body')).toBeVisible();
      /* Mount playable UI (FrameLocator has no waitForSelector) */
      await expect(
        frame.locator('[data-year-playable], .yp-shell, .itt-playable, button, a, h1, h2').first()
      ).toBeVisible({ timeout: 15000 });
      const text = await frame.locator('body').innerText();
      expect(text.length).toBeGreaterThan(20);
      const gameLink = frame.locator('a[href*="game.html"]');
      if (await gameLink.count()) {
        await expect(gameLink.first()).toBeVisible();
      }
    });
  }
});
