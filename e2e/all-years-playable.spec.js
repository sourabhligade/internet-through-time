// @ts-check
/**
 * Every year 1994–2016 has 3 REAL playable toys (sites/playable).
 * Completing a run MUST write ittYY-playable | ittYY-playable-2 | ittYY-playable-3
 */
const { test, expect } = require('@playwright/test');

/** @type {Record<string, Array<{type: string, phrase?: string, holdMs?: number}>>} */
const GAMES = {
  '1994': [
    { type: 'meter' },
    { type: 'targets' },
    { type: 'type', phrase: 'http://info.cern.ch/' },
  ],
  '1995': [
    { type: 'targets' },
    { type: 'hold', holdMs: 1600 },
    { type: 'type', phrase: 'Entertainment' },
  ],
  '1996': [
    { type: 'targets' },
    { type: 'meter' },
    { type: 'type', phrase: 'Thanks for visiting!' },
  ],
  '1997': [
    { type: 'targets' },
    { type: 'type', phrase: 'uh oh' },
    { type: 'meter' },
  ],
  '1998': [
    { type: 'type', phrase: "I'm Feeling Lucky" },
    { type: 'targets' },
    { type: 'meter' },
  ],
  '1999': [
    { type: 'meter' },
    { type: 'targets' },
    { type: 'type', phrase: 'Hello weblog' },
  ],
  '2000': [
    { type: 'meter' },
    { type: 'targets' },
    { type: 'type', phrase: 'proxy bid 12.50' },
  ],
  '2001': [
    { type: 'type', phrase: 'Fixed a typo' },
    { type: 'meter' },
    { type: 'targets' },
  ],
  '2002': [
    { type: 'targets' },
    { type: 'type', phrase: 'best friend ever' },
    { type: 'meter' },
  ],
  '2003': [
    { type: 'targets' },
    { type: 'type', phrase: 'currently bored' },
    { type: 'hold', holdMs: 2000 },
  ],
  '2004': [
    { type: 'type', phrase: 'archive is y' },
    { type: 'targets' },
    { type: 'meter' },
  ],
  '2005': [
    { type: 'targets' },
    { type: 'type', phrase: 'the internet of the future' },
    { type: 'meter' },
  ],
  '2006': [
    { type: 'type', phrase: 'just setting up my twttr' },
    { type: 'targets' },
    { type: 'hold', holdMs: 2200 },
  ],
  '2007': [
    { type: 'hold', holdMs: 1800 },
    { type: 'targets' },
    { type: 'type', phrase: 'omw ttyl' },
  ],
  '2008': [
    { type: 'targets' },
    { type: 'meter' },
    { type: 'type', phrase: 'angry birds' },
  ],
  '2009': [
    { type: 'targets' },
    { type: 'type', phrase: 'is harvesting wheat' },
    { type: 'meter' },
  ],
  '2010': [
    { type: 'targets' },
    { type: 'hold', holdMs: 1800 },
    { type: 'type', phrase: 'nofilter' },
  ],
  '2011': [
    { type: 'targets' },
    { type: 'type', phrase: 'what is the weather' },
    { type: 'meter' },
  ],
  '2012': [
    { type: 'meter' },
    { type: 'targets' },
    { type: 'type', phrase: '#yolo' },
  ],
  '2013': [
    { type: 'hold', holdMs: 6000 },
    { type: 'targets' },
    { type: 'type', phrase: 'available' },
  ],
  '2014': [
    { type: 'targets' },
    { type: 'meter' },
    { type: 'type', phrase: 'ice bucket challenge' },
  ],
  '2015': [
    { type: 'meter' },
    { type: 'targets' },
    { type: 'type', phrase: ':fire:' },
  ],
  '2016': [
    { type: 'targets' },
    { type: 'hold', holdMs: 2000 },
    { type: 'type', phrase: 'going live' },
  ],
};

function prefix(year) {
  return 'itt' + String(year).slice(2);
}

function storageKey(year, slot) {
  const base = `${prefix(year)}-playable`;
  return slot === 1 ? base : `${base}-${slot}`;
}

async function waitPlayable(page) {
  await page.waitForFunction(() => {
    try {
      return (
        document.documentElement &&
        document.documentElement.getAttribute('data-itt-feat-yearplayable') === '1'
      );
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{type: string, phrase?: string, holdMs?: number}} g
 * @param {string} key
 */
async function playGame(page, g, key) {
  await page.locator('[data-yp-start]').click();

  if (g.type === 'meter') {
    const btn = page.locator('[data-yp-click]');
    await expect(btn).toBeVisible({ timeout: 5000 });
    for (let i = 0; i < 40; i++) {
      await btn.click({ force: true });
    }
  } else if (g.type === 'targets') {
    const deadline = Date.now() + 16000;
    while (Date.now() < deadline) {
      const t = page.locator('.yp-target').first();
      if (await t.count()) {
        await t.click({ force: true }).catch(() => {});
      }
      const has = await page.evaluate((k) => !!localStorage.getItem(k), key);
      if (has) break;
      await page.waitForTimeout(80);
    }
  } else if (g.type === 'type') {
    await page.locator('[data-yp-input]').fill(g.phrase || '');
    await page.locator('[data-yp-submit]').click();
  } else if (g.type === 'hold') {
    const hold = page.locator('[data-yp-hold]');
    await expect(hold).toBeVisible();
    const box = await hold.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.waitForTimeout((g.holdMs || 2000) + 200);
      await page.mouse.up();
    }
  }

  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), {
      timeout: 18000,
      message: 'missing ' + key,
    })
    .toBeTruthy();
  const raw = (await page.evaluate((k) => localStorage.getItem(k), key)) || '';
  expect(raw).toMatch(/score|best|playable|won/i);
}

for (const year of Object.keys(GAMES)) {
  const slots = GAMES[year];
  for (let i = 0; i < slots.length; i++) {
    const slot = i + 1;
    const g = slots[i];
    const key = storageKey(year, slot);

    test(`playable ${year} #${slot} → ${key}`, async ({ page }) => {
      await page.goto(`/years/${year}/sites/playable/index.html?g=${slot}`);
      await page.evaluate((k) => {
        try {
          localStorage.removeItem(k);
        } catch (e) {
          /* */
        }
      }, key);
      await page.reload();
      await waitPlayable(page);
      await expect(page.locator('[data-year-playable]')).toBeVisible();
      // ensure correct tab selected for deep link
      await expect(page.locator(`[data-yp-tab="${slot}"]`)).toHaveClass(/is-on/);
      await playGame(page, g, key);
    });
  }
}

test('home pages link three playables for sample years', async ({ page }) => {
  for (const y of ['1994', '2000', '2005', '2010', '2015', '2016']) {
    await page.goto(`/years/${y}/pages/home.html`);
    await expect(page.locator('a[href*="playable"][href*="g=1"]').first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('a[href*="playable"][href*="g=2"]').first()).toBeVisible();
    await expect(page.locator('a[href*="playable"][href*="g=3"]').first()).toBeVisible();
  }
});
