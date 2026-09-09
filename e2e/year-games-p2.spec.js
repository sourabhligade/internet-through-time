// @ts-check
/**
 * P2 integration gates — cabinet title, map href, year meter.
 */
const { test, expect } = require('@playwright/test');

const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

const CABINETS = {
  1994: { title: 'Hotlist Surfer', id: 'hotlist' },
  1995: { title: 'Applet Checkers', id: 'checkers' },
  1996: { title: 'Planet Hop', id: 'planets' },
  1997: { title: 'Lobby Connect Four', id: 'connect4' },
  1998: { title: 'Skip-Intro Runner', id: 'skipintro' },
  1999: { title: 'Pixel Pet Dash', id: 'petdash' },
  2000: { title: 'Lot Life', id: 'lotlife' },
  2001: { title: 'Clickscape', id: 'clickscape' },
  2002: { title: 'Room Sticky', id: 'roomsticky' },
  2003: { title: 'Gags Lite', id: 'gagslite' },
  2004: { title: 'Gem Cascade', id: 'gemcascade' },
  2008: { title: 'Goo Span', id: 'goospan' },
};

const fs = require('fs');
const path = require('path');

for (const year of Object.keys(CABINETS)) {
  const spec = CABINETS[year];
  test(`cabinet ${year} title matches game.html`, async ({ page }) => {
    test.skip(!fs.existsSync(path.join(__dirname, '..', 'years', year, 'index.html')), year + ' wiped');
    await page.goto(`/years/${year}/sites/playable/index.html`);
    await expect(page.locator('[data-yp-cabinet] .yp-title, [data-yp-cabinet] h1').first()).toContainText(
      spec.title,
      { timeout: 20000 }
    );
    await page.goto(`/years/${year}/sites/playable/game.html`);
    await expect(page.locator('h1').first()).toContainText(spec.title);
    await expect(page.locator(`[data-year-game][data-game-id="${spec.id}"]`)).toBeVisible();
  });

  test(`map ${year} links game.html`, async ({ page }) => {
    test.skip(!fs.existsSync(path.join(__dirname, '..', 'years', year, 'index.html')), year + ' wiped');
    await page.goto(`/years/${year}/pages/map.html`);
    await expect(page.locator('a[href*="playable/game.html"]').first()).toBeVisible({ timeout: 15000 });
  });
}

test('1994 year meter lights Playable after a featured save', async ({ page }) => {
  await enterYear(page, '1994');
  const meterOn = await page.evaluate(() => {
    try {
      return !!(window.ITT && ITT.UX && ITT.UX.isOn && ITT.UX.isOn('yearMeter'));
    } catch (e) {
      return false;
    }
  });
  test.skip(!meterOn, 'yearMeter flag is off');
  await page.evaluate(() => {
    localStorage.setItem(
      'itt94-game-hotlist',
      JSON.stringify({ gameId: 'hotlist', year: '1994', best: 12, real: true, ts: Date.now() })
    );
  });
  await goImmersion(page, '1994', 'pages/home.html');
  await killOverlays(page);
  const frame = contentFrame(page);
  const meter = page.locator('#itt-ux-year-meter');
  const frameMeter = frame.locator('#itt-ux-year-meter');
  if (await frameMeter.count()) {
    await expect(frameMeter).toBeVisible({ timeout: 15000 });
    await expect(frameMeter.locator('.itt-ux-meter-dot').nth(2)).toHaveClass(/on/);
  } else {
    await expect(meter).toBeVisible({ timeout: 15000 });
    await expect(meter.locator('.itt-ux-meter-dot').nth(2)).toHaveClass(/on/);
  }
});
