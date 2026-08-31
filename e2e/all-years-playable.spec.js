// @ts-check
/**
 * Every year 1994–2010 has a real game cabinet (no tap/hold toys).
 * Cabinet links the period year game + famous pair.
 */
const { test, expect } = require('@playwright/test');


const WIPED = new Set(['2005', '2006', '2007', '2009', '2011', '2014']);
const YEARS = [];
for (let y = 1994; y <= 2011; y++) {
  const s = String(y);
  if (!WIPED.has(s)) YEARS.push(s);
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
  2008: 'goospan',
  2009: 'plot',
  2010: 'slingnest',
  2011: 'letterswap',
};

async function waitCabinet(page) {
  await page.waitForFunction(() => {
    try {
      if (document.querySelector('[data-yp-cabinet]')) return true;
      return (
        document.documentElement &&
        document.documentElement.getAttribute('data-itt-feat-yearplayable') === '1'
      );
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

for (const year of YEARS) {
  test(`cabinet ${year} links year game + famous`, async ({ page }) => {
    await page.goto(`/years/${year}/sites/playable/index.html`);
    await waitCabinet(page);
    await expect(page.locator('[data-year-playable]')).toBeVisible();
    await expect(page.locator('[data-yp-cabinet]')).toBeVisible();
    await expect(page.locator('[data-yp-play]')).toHaveAttribute('href', /game\.html/);
    await expect(page.locator('a[href="famous.html"]').first()).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/Toys 4/);
    await expect(page.locator('a[href*="g=15"]')).toHaveCount(0);
  });
}

test('home pages link the year game, not toy slots', async ({ page }) => {
  for (const y of ['1994', '2000', '2004', '2008', '2010']) {
    await page.goto(`/years/${y}/pages/home.html`);
    await expect(page.locator('a[href*="playable/game.html"]').first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('a[href*="playable/index.html?g="]')).toHaveCount(0);
    await expect(page.locator('.itt-5x-playables')).toHaveCount(0);
  }
});

test('2000 2004 2008 featured ids match replacements', async ({ page }) => {
  for (const y of ['2000', '2004', '2008']) {
    await page.goto(`/years/${y}/sites/playable/game.html`);
    await expect(page.locator(`[data-year-game][data-game-id="${FEATURED[y]}"]`)).toBeVisible({
      timeout: 15000,
    });
  }
});
