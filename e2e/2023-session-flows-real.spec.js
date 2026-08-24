// @ts-check
/**
 * 2023 leftover-pop upgrade + official leftover — REAL, not dest-field.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const SITES = path.join(__dirname, '..', 'years', '2023', 'sites');

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function clearKey(page, key) {
  await page.evaluate((k) => {
    try { localStorage.removeItem(k); } catch (e) { /* */ }
  }, key);
}

test('2023 dests have no dest-field plaques', async () => {
  const htmls = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (name.endsWith('.html')) htmls.push(p);
    }
  }
  walk(SITES);
  const bad = [];
  for (const p of htmls) {
    const t = fs.readFileSync(p, 'utf8');
    if (t.includes('data-dest-field')) bad.push(p + ' dest-field');
    if (/I read the \d{4} period note/i.test(t)) bad.push(p + ' plaque');
    if (t.includes('Note leftover')) bad.push(p + ' Note leftover');
  }
  expect(bad, bad.join('\n')).toEqual([]);
});

const FLOWS = [
  {
    path: '/years/2023/sites/chatgpt/plus.html',
    key: 'itt23-chatgpt-plus',
    incomplete: async (page) => { await page.locator('[data-plus-go]').click(); },
    complete: async (page) => {
      await page.locator('[data-plus-pick="20"]').click();
      const reqs = page.locator('[data-plus-req]');
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator('[data-plus-go]').click();
    },
  },
  {
    path: '/years/2023/sites/tiktok/index.html',
    key: 'itt23-pop3-tiktok',
    ytl: { pick: 'fyp', field: 'fyp leftover' },
  },
  {
    path: '/years/2023/sites/midjourney/index.html',
    key: 'itt23-pop3-midjourney',
    ytl: { pick: 'imagine', field: '/imagine leftover' },
  },
  {
    path: '/years/2023/sites/lensa/index.html',
    key: 'itt23-pop3-lensa',
    ytl: { pick: 'avatar', field: 'avatar leftover' },
  },
  {
    path: '/years/2023/sites/facebook/index.html',
    key: 'itt23-pop-facebook',
    ytl: { pick: 'connect', field: 'connect leftover' },
  },
  {
    path: '/years/2023/sites/youtube/index.html',
    key: 'itt23-pop-youtube',
    ytl: { pick: 'watch', field: 'youtube leftover' },
  },
  {
    path: '/years/2023/sites/wikipedia/index.html',
    key: 'itt23-pop-wikipedia',
    ytl: { pick: 'cite', field: 'wiki leftover' },
  },
  {
    path: '/years/2023/sites/twitter/index.html',
    key: 'itt23-twitter',
    fieldGo: { field: '[data-tw22-note]', req: '[data-tw22-req]', go: '[data-tw22-go]', value: 'the bird is freed' },
  },
  {
    path: '/years/2023/sites/windows10/index.html',
    key: 'itt23-win10',
    fieldGo: { req: '[data-w10-req]', go: '[data-w10-save]' },
  },
];

for (const fl of FLOWS) {
  test(`${fl.key} incomplete never writes then REAL`, async ({ page }) => {
    await page.goto(fl.path);
    await clearKey(page, fl.key);
    await page.reload();
    await expect(page.locator('[data-dest-field]')).toHaveCount(0);

    if (fl.incomplete) await fl.incomplete(page);
    else if (fl.ytl) await page.locator('[data-ytl-go]').first().click();
    else if (fl.fieldGo) await page.locator(fl.fieldGo.go).click();
    await expect.poll(async () => getKey(page, fl.key)).toBeFalsy();

    if (fl.complete) {
      await fl.complete(page);
    } else if (fl.ytl) {
      const host = page.locator('[data-ytl]').first();
      await host.locator(`[data-ytl-pick="${fl.ytl.pick}"]`).click();
      await host.locator('[data-ytl-field]').fill(fl.ytl.field);
      const reqs = host.locator('[data-ytl-req]');
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await host.locator('[data-ytl-go]').click();
    } else if (fl.fieldGo) {
      if (fl.fieldGo.field && fl.fieldGo.value) {
        await page.locator(fl.fieldGo.field).fill(fl.fieldGo.value);
      }
      if (fl.fieldGo.req) {
        const reqs = page.locator(fl.fieldGo.req);
        const n = await reqs.count();
        for (let i = 0; i < n; i++) await reqs.nth(i).check();
      }
      await page.locator(fl.fieldGo.go).click();
    }

    await expect.poll(async () => getKey(page, fl.key), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, fl.key)) || '{}');
    expect(blob.real, fl.key + ' must be REAL').toBe(true);
    expect(blob.multiStep, fl.key + ' must be multi-step').toBe(true);
    expect(String(blob.year)).toBe('2023');
  });
}
