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
  2005: { title: 'HoverChop', id: 'heli' },
  2006: { title: 'TrailSled', id: 'sled' },
  2007: { title: 'Box Shift', id: 'boxshift' },
  2008: { title: 'Goo Span', id: 'goospan' },
  2009: { title: 'Plot Neighbors', id: 'plotneighbors' },
};

for (const year of Object.keys(CABINETS)) {
  const spec = CABINETS[year];
  test(`cabinet ${year} title matches game.html`, async ({ page }) => {
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
    await page.goto(`/years/${year}/pages/map.html`);
    await expect(page.locator('a[href*="playable/game.html"]').first()).toBeVisible({ timeout: 15000 });
  });
}

test('1994 year meter lights Playable after a featured save', async ({ page }) => {
  await enterYear(page, '1994');
  await page.evaluate(() => {
    localStorage.setItem(
      'itt94-game-hotlist',
      JSON.stringify({ gameId: 'hotlist', year: '1994', best: 12, real: true, ts: Date.now() })
    );
  });
  await goImmersion(page, '1994', 'pages/home.html');
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('#itt-ux-year-meter')).toBeVisible({ timeout: 15000 });
  const dots = frame.locator('#itt-ux-year-meter .itt-ux-meter-dot');
  await expect(dots.nth(2)).toHaveClass(/on/);
});
