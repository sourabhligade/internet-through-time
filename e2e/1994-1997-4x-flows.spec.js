// @ts-check
/**
 * 1994–1997 4× leftover — every N-flow: incomplete never writes, complete writes ittYY-*.
 */
const { test, expect } = require('@playwright/test');

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function clearKey(page, key) {
  await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } }, key);
}
async function leaks(page, yy) {
  return page.evaluate((y) => {
    const bad = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || '';
      if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + y + '-') !== 0) bad.push(k);
    }
    return bad;
  }, yy);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{path:string,key:string,kind:string,yy:string}} spec
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
  await expect(page.locator('body')).not.toContainText(/I read the \d{4} period note/i);

  // incomplete
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
    const n = await hops.count();
    expect(n).toBeGreaterThanOrEqual(2);
    await hops.nth(0).click();
    await hops.nth(1).click();
  } else if (spec.kind === 'wait') {
    await panel.locator('[data-4x-wait]').click();
    await page.waitForTimeout(2200);
  } else if (spec.kind === 'toggle') {
    await panel.locator('[data-4x-toggle="off"]').click();
    await panel.locator('[data-4x-toggle="on"]').click();
  }

  await go.click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const raw = (await getKey(page, spec.key)) || '';
  const blob = JSON.parse(raw);
  expect(blob.real, spec.key + ' must be REAL not mock').toBe(true);
  expect(blob.multiStep, spec.key + ' must be multi-step').toBe(true);
  expect(String(blob.year)).toBe('19' + spec.yy);
  expect(blob.kind).toBe(spec.kind);
  expect(blob.flow).toBe(suffix);
  expect(await leaks(page, spec.yy)).toEqual([]);
}

const Y94 = [
  { path: '/years/1994/sites/webcrawler/index.html', key: 'itt94-wc', kind: 'query', yy: '94' },
  { path: '/years/1994/sites/lycos/index.html', key: 'itt94-lycos', kind: 'query', yy: '94' },
  { path: '/years/1994/sites/pizzahut/index.html', key: 'itt94-pizza', kind: 'query', yy: '94' },
  { path: '/years/1994/sites/netmarket/index.html', key: 'itt94-netmarket', kind: 'query', yy: '94' },
  { path: '/years/1994/sites/imdb/index.html', key: 'itt94-imdb', kind: 'query', yy: '94' },
  { path: '/years/1994/sites/personal/index.html', key: 'itt94-personal-gb', kind: 'query', yy: '94' },
  { path: '/years/1994/sites/hotwired/index.html', key: 'itt94-banner', kind: 'hops', yy: '94' },
  { path: '/years/1994/sites/iuma/index.html', key: 'itt94-iuma-dl', kind: 'wait', yy: '94' },
  { path: '/years/1994/sites/jumpstation/index.html', key: 'itt94-jump', kind: 'query', yy: '94' },
  { path: '/years/1994/sites/galaxy/index.html', key: 'itt94-galaxy', kind: 'hops', yy: '94' },
  { path: '/years/1994/sites/gnn/index.html', key: 'itt94-gnn', kind: 'checks', yy: '94' },
  { path: '/years/1994/sites/compuserve/index.html', key: 'itt94-cis', kind: 'checks', yy: '94' },
  { path: '/years/1994/sites/prodigy/index.html', key: 'itt94-prodigy', kind: 'checks', yy: '94' },
  { path: '/years/1994/sites/pathfinder/index.html', key: 'itt94-pathfinder', kind: 'hops', yy: '94' },
  { path: '/years/1994/sites/nasa/index.html', key: 'itt94-nasa', kind: 'wait', yy: '94' },
  { path: '/years/1994/pages/handbook.html', key: 'itt94-viewsrc', kind: 'checks', yy: '94' },
  { path: '/years/1994/pages/handbook.html', key: 'itt94-img-off', kind: 'toggle', yy: '94' },
  { path: '/years/1994/sites/cern/index.html', key: 'itt94-cern', kind: 'checks', yy: '94' }
];

const Y95 = [
  { path: '/years/1995/sites/amazon/index.html', key: 'itt95-amzn-q', kind: 'query', yy: '95' },
  { path: '/years/1995/sites/amazon/index.html', key: 'itt95-amzn-cart', kind: 'query', yy: '95' },
  { path: '/years/1995/sites/espn/index.html', key: 'itt95-espn', kind: 'hops', yy: '95' },
  { path: '/years/1995/sites/cnet/index.html', key: 'itt95-cnet', kind: 'hops', yy: '95' },
  { path: '/years/1995/sites/salon/index.html', key: 'itt95-salon', kind: 'checks', yy: '95' },
  { path: '/years/1995/sites/match/index.html', key: 'itt95-match', kind: 'query', yy: '95' },
  { path: '/years/1995/sites/classmates/index.html', key: 'itt95-classmates', kind: 'query', yy: '95' },
  { path: '/years/1995/sites/tripod/index.html', key: 'itt95-tripod', kind: 'query', yy: '95' },
  { path: '/years/1995/sites/cnn/index.html', key: 'itt95-cnn', kind: 'hops', yy: '95' },
  { path: '/years/1995/sites/aol/index.html', key: 'itt95-aol', kind: 'query', yy: '95' },
  { path: '/years/1995/sites/netscape/download.html', key: 'itt95-nn-dl', kind: 'checks', yy: '95' },
  { path: '/years/1995/sites/microsoft/index.html', key: 'itt95-ie1', kind: 'checks', yy: '95' },
  { path: '/years/1995/sites/infoseek/index.html', key: 'itt95-infoseek', kind: 'query', yy: '95' },
  { path: '/years/1995/sites/yahoo/index.html', key: 'itt95-yahoo-com', kind: 'hops', yy: '95' },
  { path: '/years/1995/sites/wsj/index.html', key: 'itt95-wsj', kind: 'checks', yy: '95' },
  { path: '/years/1995/sites/timewarner/index.html', key: 'itt95-tw', kind: 'hops', yy: '95' },
  { path: '/years/1995/sites/whitehouse/index.html', key: 'itt95-wh', kind: 'checks', yy: '95' },
  { path: '/years/1995/sites/geocities/index.html', key: 'itt95-webring', kind: 'hops', yy: '95' }
];

const Y96 = [
  { path: '/years/1996/sites/hotmail/inbox.html', key: 'itt96-hotmail-inbox', kind: 'query', yy: '96' },
  { path: '/years/1996/sites/yahoo/index.html', key: 'itt96-my-save', kind: 'hops', yy: '96' },
  { path: '/years/1996/sites/craigslist/index.html', key: 'itt96-cl', kind: 'query', yy: '96' },
  { path: '/years/1996/sites/askjeeves/index.html', key: 'itt96-jeeves', kind: 'query', yy: '96' },
  { path: '/years/1996/sites/mtv/index.html', key: 'itt96-mtv', kind: 'hops', yy: '96' },
  { path: '/years/1996/sites/plugin/index.html', key: 'itt96-plugin', kind: 'checks', yy: '96' },
  { path: '/years/1996/sites/netscape/index.html', key: 'itt96-nn3', kind: 'checks', yy: '96' },
  { path: '/years/1996/sites/msn/index.html', key: 'itt96-msn', kind: 'checks', yy: '96' },
  { path: '/years/1996/sites/cnn/index.html', key: 'itt96-cnn', kind: 'hops', yy: '96' },
  { path: '/years/1996/sites/angelfire/index.html', key: 'itt96-angel', kind: 'query', yy: '96' },
  { path: '/years/1996/sites/theglobe/index.html', key: 'itt96-globe', kind: 'checks', yy: '96' },
  { path: '/years/1996/sites/totalny/index.html', key: 'itt96-tny', kind: 'checks', yy: '96' },
  { path: '/years/1996/sites/auctionweb/index.html', key: 'itt96-aw', kind: 'query', yy: '96' },
  { path: '/years/1996/sites/altavista/index.html', key: 'itt96-av', kind: 'query', yy: '96' },
  { path: '/years/1996/sites/spacejam/lineup.html', key: 'itt96-jam-line', kind: 'hops', yy: '96' },
  { path: '/years/1996/sites/spacejam/jamcentral.html', key: 'itt96-jam-central', kind: 'checks', yy: '96' },
  { path: '/years/1996/sites/pathfinder/index.html', key: 'itt96-pf', kind: 'hops', yy: '96' },
  { path: '/years/1996/sites/infoseek/index.html', key: 'itt96-infoseek', kind: 'query', yy: '96' }
];

const Y97 = [
  { path: '/years/1997/sites/aim/index.html', key: 'itt97-aim-birth', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/icq/index.html', key: 'itt97-icq-msg', kind: 'query', yy: '97' },
  { path: '/years/1997/sites/nytimes/index.html', key: 'itt97-nyt', kind: 'hops', yy: '97' },
  { path: '/years/1997/sites/mp3com/index.html', key: 'itt97-mp3', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/zdnet/index.html', key: 'itt97-zdnet', kind: 'hops', yy: '97' },
  { path: '/years/1997/sites/winamp/index.html', key: 'itt97-winamp', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/javaplugin/index.html', key: 'itt97-java', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/bbc/index.html', key: 'itt97-bbc', kind: 'hops', yy: '97' },
  { path: '/years/1997/sites/scripting/index.html', key: 'itt97-scripting', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/newscom/index.html', key: 'itt97-newscom', kind: 'hops', yy: '97' },
  { path: '/years/1997/sites/amazon/index.html', key: 'itt97-amzn-ipo', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/ebay/index.html', key: 'itt97-ebay-name', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/microsoft/ie4.html', key: 'itt97-ie4', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/altavista/index.html', key: 'itt97-av', kind: 'query', yy: '97' },
  { path: '/years/1997/sites/geocities/index.html', key: 'itt97-gc-1m', kind: 'checks', yy: '97' },
  { path: '/years/1997/sites/hotmail/index.html', key: 'itt97-hotmail', kind: 'query', yy: '97' },
  { path: '/years/1997/sites/lycos/index.html', key: 'itt97-lycos', kind: 'query', yy: '97' },
  { path: '/years/1997/sites/drudge/story.html', key: 'itt97-drudge-story', kind: 'checks', yy: '97' }
];

function pack(year, list) {
  test.describe(year + ' 4× leftover every flow', () => {
    for (const spec of list) {
      test(spec.key + ' incomplete blocked then writes', async ({ page }) => {
        await runFlow(page, spec);
      });
    }
  });
}

pack('1994', Y94);
pack('1995', Y95);
pack('1996', Y96);
pack('1997', Y97);

test.describe('4× trails', () => {
  test('1994 CSotD next still points at Yahoo', async ({ page }) => {
    await page.goto('/years/1994/sites/csotd/index.html');
    await expect(page.locator('[data-next-flow] a[href*="yahoo"]').first()).toBeAttached();
  });
  test('1995 Amazon SSL checkout still on disk', async ({ page }) => {
    const res = await page.goto('/years/1995/sites/amazon/ssl-checkout.html');
    expect(res && res.status()).toBe(200);
    await expect(page.locator('body')).toContainText(/SSL|checkout|padlock/i);
  });
  test('1996 Hotmail inbox 4× present', async ({ page }) => {
    await page.goto('/years/1996/sites/hotmail/inbox.html');
    await expect(page.locator('[data-4x-go="hotmail-inbox"]')).toBeVisible();
  });
  test('1997 AIM birth is leftover not the PointCast star', async ({ page }) => {
    await page.goto('/years/1997/pages/home.html');
    await expect(page.locator('[data-ott-one-thing="1997"]')).toBeVisible();
    const href = await page.locator('[data-ott-one-thing="1997"]').getAttribute('href');
    expect(href).toMatch(/pointcast/i);
  });
});
