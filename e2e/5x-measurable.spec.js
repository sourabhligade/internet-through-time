// @ts-check
/**
 * 5× measurable quantity — games, toys, trails, atlas chips.
 * Incomplete pack games never write. Locked star keys stay neighbor-safe.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

const SAMPLE = ['1994', '2005', '2011', '2020'];

const PACK = {
  1994: { file: 'game-2.html', gid: 'whatsnew', key: 'itt94-game-whatsnew', need: 6 },
  2005: { file: 'game-2.html', gid: 'ytsurge', key: 'itt05-game-ytsurge', need: 3 },
  2011: { file: 'game-2.html', gid: 'siriline', key: 'itt11-game-siriline', need: 3 },
  2020: { file: 'game-2.html', gid: 'breakout', key: 'itt20-game-breakout', need: 3 },
};

async function openPack(page, year, file) {
  await enterYear(page, year);
  await goImmersion(page, year, 'sites/playable/' + file);
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('[data-year-game][data-pack-game]')).toBeVisible({ timeout: 20000 });
  return frame;
}

for (const year of SAMPLE) {
  const p = PACK[year];
  test(`5x pack ${year} host + incomplete never writes`, async ({ page }) => {
    await enterYear(page, year);
    await page.evaluate((k) => localStorage.removeItem(k), p.key);
    const frame = await openPack(page, year, p.file);
    await expect(frame.locator(`[data-game-id="${p.gid}"]`)).toBeVisible();
    await frame.locator('[data-pack-finish]').click({ force: true });
    const raw = await page.evaluate((k) => localStorage.getItem(k), p.key);
    expect(raw).toBeNull();
  });

  test(`5x pack ${year} complete writes ${PACK[year].key}`, async ({ page }) => {
    await enterYear(page, year);
    await page.evaluate((k) => localStorage.removeItem(k), p.key);
    const frame = await openPack(page, year, p.file);
    const start = frame.locator('[data-game-start]');
    if (await start.count()) await start.click({ force: true });
    const act = frame.locator('[data-pack-act]');
    const need = Number(await frame.locator('[data-year-game]').getAttribute('data-pack-need')) || p.need;
    for (let i = 0; i < need; i++) await act.click({ force: true });
    const phrase = await frame.locator('[data-year-game]').getAttribute('data-pack-phrase');
    if (phrase) {
      await frame.locator('[data-pack-type]').fill(phrase);
    }
    const wait = Number(await frame.locator('[data-year-game]').getAttribute('data-pack-wait-ms') || '0');
    if (wait) await page.waitForTimeout(wait + 200);
    await frame.locator('[data-pack-finish]').click({ force: true });
    await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), p.key), { timeout: 8000 }).toBeTruthy();
    const blob = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), p.key);
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe(year);
    expect(blob.gameId).toBe(p.gid);
  });

  test(`5x toys ${year} g=15 host exists`, async ({ page }) => {
    await page.goto(`/years/${year}/sites/playable/index.html?g=15`);
    await expect(page.locator('[data-year-playable]')).toBeVisible({ timeout: 20000 });
    await expect(page.locator('a[href*="g=15"], [data-yp-tab="15"]').first()).toBeVisible();
  });

  test(`5x home atlas ${year} has chips`, async ({ page }) => {
    await page.goto(`/years/${year}/pages/home.html`);
    await expect(page.locator('[data-itt-5x-atlas] a').first()).toBeVisible();
    const n = await page.locator('[data-itt-5x-atlas] a').count();
    expect(n).toBeGreaterThan(5);
  });
}

test('guided ol stays 6 on 1994 home', async ({ page }) => {
  await page.goto('/years/1994/pages/home.html');
  const n = await page.locator('#ott-guided-1994 ol > li').count();
  expect(n).toBe(6);
});
