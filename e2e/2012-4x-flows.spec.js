// @ts-check
/**
 * 2012 4× leftover — every N-flow: incomplete never writes, complete writes REAL itt12-*.
 */
const { test, expect } = require('@playwright/test');


async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function clearKey(page, key) {
  await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } }, key);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{path:string,key:string,kind:string}} spec
 */
async function runFlow(page, spec) {
  await page.goto(spec.path);
  await clearKey(page, spec.key);
  await page.reload();
  await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
  const suffix = spec.key.replace(/^itt\d{2}-/, '');
  const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${suffix}"])`);
  const go = panel.locator('[data-4x-go]');
  await expect(go).toBeVisible();
  await expect(page.locator('[data-dest-field]')).toHaveCount(0);

  await go.click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();

  if (spec.kind === 'query') {
    await panel.locator('[data-4x-field]').fill('ok');
  } else if (spec.kind === 'checks') {
    const boxes = panel.locator('[data-4x-req]');
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check();
  } else if (spec.kind === 'hops') {
    const hops = panel.locator('[data-4x-hop]');
    await hops.nth(0).click();
    await hops.nth(1).click();
  }

  await go.click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, spec.key)) || '{}');
  expect(blob.real).toBe(true);
  expect(blob.multiStep).toBe(true);
  expect(String(blob.year)).toBe('2012');
}

const FLOWS = [
  { path: '/years/2012/sites/soundcloud/index.html', key: 'itt12-soundcloud', kind: 'query' },
  { path: '/years/2012/sites/twitter/index.html', key: 'itt12-tweets', kind: 'query' },
  { path: '/years/2012/sites/youtube/index.html', key: 'itt12-yt', kind: 'checks' },
  { path: '/years/2012/sites/tinder/index.html', key: 'itt12-tinder', kind: 'hops' },
  { path: '/years/2012/sites/uber/index.html', key: 'itt12-uberx', kind: 'query' },
  { path: '/years/2012/sites/windows8/index.html', key: 'itt12-win8', kind: 'checks' },
  { path: '/years/2012/sites/iphone/index.html', key: 'itt12-iphone5', kind: 'checks' },
  { path: '/years/2012/sites/chrome/index.html', key: 'itt12-chrome', kind: 'checks' },
  { path: '/years/2012/sites/reddit/ama.html', key: 'itt12-ama', kind: 'query' },
  { path: '/years/2012/sites/waze/index.html', key: 'itt12-waze', kind: 'query' },
  { path: '/years/2012/sites/trello/index.html', key: 'itt12-trello', kind: 'query' },
  { path: '/years/2012/sites/tumblr/index.html', key: 'itt12-tumblr', kind: 'query' },
  { path: '/years/2012/sites/play/index.html', key: 'itt12-play', kind: 'checks' },
  { path: '/years/2012/sites/playable/game.html', key: 'itt12-game-guessdoodle', kind: 'checks' },
  { path: '/years/2012/sites/lyft/index.html', key: 'itt12-lyft', kind: 'checks' },
  { path: '/years/2012/sites/buzzfeed/index.html', key: 'itt12-buzzfeed', kind: 'query' },
  { path: '/years/2012/sites/snapchat/index.html', key: 'itt12-snap', kind: 'checks' },
  { path: '/years/2012/sites/googleplus/index.html', key: 'itt12-gplus', kind: 'checks' },
];

test.describe('2012 4× leftover', () => {
  for (const fl of FLOWS) {
    test(`${fl.key} incomplete then REAL`, async ({ page }) => {
      await runFlow(page, fl);
    });
  }
});
