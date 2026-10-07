// @ts-check
/**
 * 1998–2000 4× leftover — every N-flow: incomplete never writes, complete writes REAL ittYY-*.
 */
const { test, expect } = require('@playwright/test');
const { revealLeftoverRails } = require('./helpers');


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
 * @param {{path:string,key:string,kind:string,yy:string,year:string}} spec
 */
async function runFlow(page, spec) {
  await page.goto(spec.path);
  await clearKey(page, spec.key);
  await page.reload();
  await revealLeftoverRails(page);
  await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
  const suffix = spec.key.replace(/^itt\d{2}-/, '');
  const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${suffix}"])`);
  const go = panel.locator('[data-4x-go]');
  await expect(go).toBeVisible();
  await expect(page.locator('[data-dest-field]')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText(/I read the \d{4} period note/i);

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
  expect(String(blob.year)).toBe(spec.year);
  expect(blob.kind).toBe('leftover');
  expect(blob.step).toBe(spec.kind);
  expect(blob.flow).toBe(suffix);
  expect(await leaks(page, spec.yy)).toEqual([]);
}

const Y98 = [
  { path: '/years/1998/sites/youvegotmail/index.html', key: 'itt98-youvegotmail-lx2-4x', kind: 'hops', yy: '98', year: '1998' },
  { path: '/years/1998/sites/go/index.html', key: 'itt98-go-4x', kind: 'checks', yy: '98', year: '1998' },
  { path: '/years/1998/sites/snap/index.html', key: 'itt98-snap-4x', kind: 'query', yy: '98', year: '1998' },
  { path: '/years/1998/sites/about/index.html', key: 'itt98-about-4x', kind: 'query', yy: '98', year: '1998' },
  { path: '/years/1998/sites/valve/index.html', key: 'itt98-valve-lx3-4x', kind: 'query', yy: '98', year: '1998' },
  { path: '/years/1998/sites/gamespot/index.html', key: 'itt98-gamespot-lx3-4x', kind: 'hops', yy: '98', year: '1998' },
  { path: '/years/1998/sites/winfiles/index.html', key: 'itt98-winfiles-lx3-4x', kind: 'checks', yy: '98', year: '1998' },
  { path: '/years/1998/sites/hillmancurtis/index.html', key: 'itt98-hillmancurtis-lx2-4x', kind: 'hops', yy: '98', year: '1998' },
  { path: '/years/1998/sites/larrypage/index.html', key: 'itt98-larrypage-4x', kind: 'checks', yy: '98', year: '1998' },
  { path: '/years/1998/sites/sergeybrin/index.html', key: 'itt98-sergeybrin-4x', kind: 'query', yy: '98', year: '1998' },
  { path: '/years/1998/sites/broadcastcom/index.html', key: 'itt98-broadcastcom-4x', kind: 'hops', yy: '98', year: '1998' },
  { path: '/years/1998/sites/opendiary/index.html', key: 'itt98-opendiary-4x', kind: 'query', yy: '98', year: '1998' },
  { path: '/years/1998/sites/icqweb/index.html', key: 'itt98-icqweb-4x', kind: 'query', yy: '98', year: '1998' },
  { path: '/years/1998/sites/netcenter/index.html', key: 'itt98-netcenter-lx2-4x', kind: 'query', yy: '98', year: '1998' }
];

const Y99 = [
  { path: '/years/1999/sites/neopets/index.html', key: 'itt99-neopets-4x', kind: 'checks', yy: '99', year: '1999' },
  { path: '/years/1999/sites/egroups/index.html', key: 'itt99-egroups-4x', kind: 'query', yy: '99', year: '1999' },
  { path: '/years/1999/sites/yahoomessenger/index.html', key: 'itt99-yahoomessenger-4x', kind: 'checks', yy: '99', year: '1999' },
  { path: '/years/1999/sites/sixdegrees/index.html', key: 'itt99-sixdegrees-4x', kind: 'checks', yy: '99', year: '1999' },
  { path: '/years/1999/sites/theonion/index.html', key: 'itt99-theonion-4x', kind: 'checks', yy: '99', year: '1999' },
  { path: '/years/1999/sites/drkoop/index.html', key: 'itt99-drkoop-4x', kind: 'checks', yy: '99', year: '1999' },
  { path: '/years/1999/sites/flash4/index.html', key: 'itt99-flash4-lx2-4x', kind: 'query', yy: '99', year: '1999' },
  { path: '/years/1999/sites/hampsterdance/index.html', key: 'itt99-hampsterdance-lx2-4x', kind: 'checks', yy: '99', year: '1999' },
  { path: '/years/1999/sites/zombo/index.html', key: 'itt99-zombo-lx2-4x', kind: 'query', yy: '99', year: '1999' },
  { path: '/years/1999/sites/webvan/index.html', key: 'itt99-webvan-4x', kind: 'checks', yy: '99', year: '1999' },
  { path: '/years/1999/sites/etrade/index.html', key: 'itt99-etrade-4x', kind: 'query', yy: '99', year: '1999' }
];

const Y00 = [
  { path: '/years/2000/sites/startupfailures/index.html', key: 'itt00-fail', kind: 'hops', yy: '00', year: '2000' },
  { path: '/years/2000/sites/half/index.html', key: 'itt00-half', kind: 'checks', yy: '00', year: '2000' },
  { path: '/years/2000/sites/everything2/index.html', key: 'itt00-e2', kind: 'query', yy: '00', year: '2000' },
  { path: '/years/2000/sites/limewire/index.html', key: 'itt00-lw', kind: 'checks', yy: '00', year: '2000' },
  { path: '/years/2000/sites/homestar/index.html', key: 'itt00-homestar', kind: 'checks', yy: '00', year: '2000' },
  { path: '/years/2000/sites/camworld/index.html', key: 'itt00-cam', kind: 'hops', yy: '00', year: '2000' },
  { path: '/years/2000/sites/ivillage/index.html', key: 'itt00-ivi', kind: 'hops', yy: '00', year: '2000' },
  { path: '/years/2000/sites/womencom/index.html', key: 'itt00-women', kind: 'hops', yy: '00', year: '2000' },
  { path: '/years/2000/sites/macromedia/index.html', key: 'itt00-flash5', kind: 'checks', yy: '00', year: '2000' }
];

function pack(year, list) {
  test.describe(year + ' 4× leftover every flow', () => {
    for (const spec of list) {
      test(spec.key + ' incomplete blocked then writes REAL', async ({ page }) => {
        await runFlow(page, spec);
      });
    }
  });
}

pack('1998', Y98);
pack('1999', Y99);
pack('2000', Y00);

test.describe('4× trails part 2', () => {
  test('1998 Lucky star still on disk', async ({ page }) => {
    const res = await page.goto('/years/1998/sites/google/lucky.html');
    expect(res && res.status()).toBe(200);
    await expect(page.locator('body')).toContainText(/lucky|Google/i);
  });
  test('1999 star chip is AIM, not a second 4× button on the away page', async ({ page }) => {
    await page.goto('/years/1999/pages/home.html');
    await expect(page.locator('[data-ott-one-thing="1999"]')).toBeVisible();
    const href = await page.locator('[data-ott-one-thing="1999"]').getAttribute('href');
    expect(href).toMatch(/aim/i);
  });
  test('2000 star chip is MapQuest', async ({ page }) => {
    await page.goto('/years/2000/pages/home.html');
    await expect(page.locator('[data-ott-one-thing="2000"]')).toBeVisible();
    const href = await page.locator('[data-ott-one-thing="2000"]').getAttribute('href');
    expect(href).toMatch(/mapquest/i);
  });
});
