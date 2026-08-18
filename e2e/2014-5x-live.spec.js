// @ts-check
/**
 * 2014 lean 5× — pack games G1–G4 · 50 trails · atlas dests · guided 6
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const PACKS = [
  { file: 'game-2.html', gid: 'icehold', key: 'itt14-game-icehold', phrase: 'ice', need: 2 },
  { file: 'game-3.html', gid: 'waticks', key: 'itt14-game-waticks', phrase: 'deal', need: 2 },
  { file: 'game-4.html', gid: 'hbpatch', key: 'itt14-game-hbpatch', phrase: 'rotate', need: 2 },
  { file: 'game-5.html', gid: 'paytap', key: 'itt14-game-paytap', phrase: 'tap', need: 2 },
];

function yearTrailHrefs(year) {
  const hrefs = [];
  const re = /"href"\s*:\s*"(sites\/[^"]+|pages\/[^"]+)"/g;
  const slice = (src) => {
    const i = src.indexOf('"' + year + '"');
    if (i < 0) return '';
    const j = src.indexOf(']', i);
    return src.slice(i, j + 1);
  };
  for (const name of ['flow-trails.js', 'flow-trails-5x.js']) {
    const src = slice(fs.readFileSync(path.join(ROOT, 'js/config', name), 'utf8'));
    let m;
    while ((m = re.exec(src))) hrefs.push(m[1]);
    re.lastIndex = 0;
  }
  return [...new Set(hrefs)];
}

async function playPack(page, pack, { phrase, acts }) {
  await page.goto('/years/2014/sites/playable/' + pack.file);
  await page.evaluate((k) => localStorage.removeItem(k), pack.key);
  await page.reload();
  await page.locator('[data-game-start]').click();
  const n = acts == null ? pack.need : acts;
  for (let i = 0; i < n; i++) await page.locator('[data-pack-act]').click();
  if (phrase) await page.locator('[data-pack-type]').fill(phrase);
  await page.locator('[data-pack-finish]').click();
}

test.describe('2014 5× live', () => {
  for (const pack of PACKS) {
    test(`${pack.gid} incomplete (no phrase) never writes ${pack.key}`, async ({ page }) => {
      await playPack(page, pack, { phrase: '', acts: pack.need });
      expect(await page.evaluate((k) => localStorage.getItem(k), pack.key)).toBeFalsy();
    });

    test(`${pack.gid} complete writes ${pack.key}`, async ({ page }) => {
      await playPack(page, pack, { phrase: pack.phrase, acts: pack.need });
      await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), pack.key)).toBeTruthy();
      const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), pack.key)) || '{}');
      expect(blob.real).toBe(true);
      expect(String(blob.year)).toBe('2014');
      expect(blob.gameId).toBe(pack.gid);
      expect(await page.evaluate(() => Object.keys(localStorage).some((k) => k.indexOf('itt13') === 0 || k.indexOf('itt15') === 0))).toBeFalsy();
    });
  }

  test('atlas chips dest 200 and guided stays 6', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    await expect(page.locator('#ott-guided-2014 ol > li')).toHaveCount(6);
    const n = await page.locator('[data-itt-5x-atlas] a').count();
    expect(n).toBeGreaterThan(5);
    const hrefs = await page.locator('[data-itt-5x-atlas] a').evaluateAll((els) =>
      els.map((a) => a.getAttribute('href') || '')
    );
    for (const href of hrefs) {
      const dest = new URL(href, page.url());
      expect((await page.request.get(dest.pathname)).status(), dest.pathname).toBe(200);
    }
  });

  test('50 trail stops · every dest 200', async ({ page }) => {
    const hrefs = yearTrailHrefs('2014');
    expect(hrefs.length, 'unique trail hrefs').toBeGreaterThanOrEqual(10);
    const extra = fs.readFileSync(path.join(ROOT, 'js/config/flow-trails-5x.js'), 'utf8');
    const i = extra.indexOf('"2014"');
    const j = extra.indexOf(']', i);
    const ns = (extra.slice(i, j + 1).match(/"n"\s*:\s*(\d+)/g) || []).length;
    expect(ns, '5x extra n=11–50').toBe(40);
    for (const href of hrefs) {
      expect((await page.request.get('/years/2014/' + href)).status(), href).toBe(200);
    }
  });

  test('lobby lists five cabinets', async ({ page }) => {
    await page.goto('/years/2014/sites/playable/index.html');
    for (const f of ['game.html', 'game-2.html', 'game-3.html', 'game-4.html', 'game-5.html']) {
      await expect(page.locator(`a[href="${f}"]`).first()).toBeVisible();
    }
    await expect(page.locator('a[href*="g=15"]')).toHaveCount(0);
  });
});
