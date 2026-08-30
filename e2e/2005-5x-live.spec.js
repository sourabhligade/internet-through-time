// @ts-check
/** 2005 5× live — leftover F rooms stay live. Plaque dests still gate incomplete. */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }

/**
 * @param {import('@playwright/test').Page} page
 * @param {{ href: string, key: string, next: string }} spec
 */
async function runF(page, spec) {
  await page.goto(spec.href);
  expect((await page.request.get(spec.href)).status(), spec.href).toBe(200);
  await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } }, spec.key);
  await page.reload();
  const save = page.locator('[data-5x-save]').first();
  if ((await save.count()) === 0) {
    const leftover = page.locator('[data-lo-panel], [data-4x-go], [data-yt-list], [data-maps-canvas], [data-reddit-list], [data-digg-list], [data-hm-filter]');
    await expect(leftover.first(), spec.href + ' leftover or product hook').toBeVisible();
    const next = spec.next.indexOf('sites/') === 0 ? `/years/2005/${spec.next}` : spec.next;
    expect((await page.request.get(next)).status(), next).toBe(200);
    return;
  }
  await expect(save).toBeVisible();
  await save.click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  await page.locator('[data-5x-req="a"]').first().check();
  await page.locator('[data-5x-req="b"]').first().check();
  const extra = page.locator('[data-5x-req="c"]');
  if (await extra.count()) await extra.first().check();
  await save.click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const raw = (await getKey(page, spec.key)) || '';
  expect(raw).toMatch(/real|multiStep/i);
  const leak = await page.evaluate((yy) => {
    const bad = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || '';
      if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + yy + '-') !== 0) bad.push(k);
    }
    return bad;
  }, '05');
  expect(leak).toEqual([]);
  await expect(page.locator('[data-5x-next] a').first()).toBeVisible();
}

test.describe('2005 5× live F1–F5', () => {
  test('F1 YouTube like empty never writes', async ({ page }) => {
    await runF(page, { href: '/years/2005/sites/youtube/index.html', key: 'itt05-yt', next: 'sites/maps/index.html' });
  });

  test('F2 Maps last view empty never writes', async ({ page }) => {
    await runF(page, { href: '/years/2005/sites/maps/index.html', key: 'itt05-maps', next: 'sites/reddit/index.html' });
  });

  test('F3 Reddit upvote empty never writes', async ({ page }) => {
    await runF(page, { href: '/years/2005/sites/reddit/index.html', key: 'itt05-reddit', next: 'sites/digg/index.html' });
  });

  test('F4 Digg bury empty never writes', async ({ page }) => {
    await runF(page, { href: '/years/2005/sites/digg/index.html', key: 'itt05-digg', next: 'sites/housingmaps/index.html' });
  });

  test('F5 Housing Maps empty never writes', async ({ page }) => {
    await runF(page, { href: '/years/2005/sites/housingmaps/index.html', key: 'itt05-hm', next: 'sites/pandora/index.html' });
  });

  test('home #ott-5x-2005 chips land on F rooms', async ({ page }) => {
    await page.goto('/years/2005/pages/home.html');
    const chips = page.locator('#ott-5x-2005 a');
    await expect(chips).toHaveCount(6);
    const hrefs = await chips.evaluateAll((as) => as.map((a) => a.getAttribute('href') || ''));
    hrefs.forEach((h) => expect(h).toMatch(/sites\//));
  });

});
