// @ts-check
/**
 * 2024 session dests — every leftover / gold flow must be REAL.
 * dest-field plaques and empty-Go writes fail.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const ROOT = path.join(__dirname, '..');
const SITES = path.join(ROOT, 'years', '2024', 'sites');

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function clearKey(page, key) {
  await page.evaluate((k) => {
    try { localStorage.removeItem(k); } catch (e) { /* */ }
  }, key);
}

test('2024 dests have no dest-field plaques', async () => {
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

/** Official leftover + gold + upgraded pop dests */
const FLOWS = [
  {
    path: '/years/2024/sites/chatgpt/4o.html',
    key: 'itt24-gpt4o',
    incomplete: async (page) => { await page.locator('[data-4o-go]').click(); },
    complete: async (page) => {
      await page.locator('[data-4o-pick="4o"]').click();
      const reqs = page.locator('[data-4o-req]');
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator('[data-4o-go]').click();
    },
  },
  {
    path: '/years/2024/sites/gemini/index.html',
    key: 'itt24-gemini',
    ytl: { pick: 'gemini', field: 'ask gemini' },
  },
  {
    path: '/years/2024/sites/claude35/index.html',
    key: 'itt24-claude35',
    ytl: { pick: 'sonnet', field: 'claude 3.5 leftover' },
  },
  {
    path: '/years/2024/sites/sora/index.html',
    key: 'itt24-sora',
    ytl: { pick: 'preview', field: 'sora preview' },
  },
  {
    path: '/years/2024/sites/appleintel/index.html',
    key: 'itt24-appleintel',
    ytl: { pick: 'late', field: 'ios 18.1 leftover' },
  },
  {
    path: '/years/2024/sites/o1/index.html',
    key: 'itt24-o1',
    ytl: { pick: 'preview', field: 'o1 preview' },
  },
  {
    path: '/years/2024/sites/chatgpt/plus.html',
    key: 'itt24-plus',
    ytl: { pick: 'residual', field: 'plus residual' },
  },
  {
    path: '/years/2024/sites/twitter/index.html',
    key: 'itt24-twitter',
    fieldGo: { field: '[data-tw22-note]', req: '[data-tw22-req]', go: '[data-tw22-go]', value: 'the bird is freed' },
  },
  {
    path: '/years/2024/sites/wordle/index.html',
    key: 'itt24-wordle',
    fieldGo: { field: '[data-wd22-guess]', req: '[data-wd22-req]', go: '[data-wd22-go]', value: 'times' },
  },
  {
    path: '/years/2024/sites/stablediffusion/index.html',
    key: 'itt24-sd',
    fieldGo: { field: '[data-sd22-prompt]', req: '[data-sd22-req]', go: '[data-sd22-go]', value: 'astronaut leftover' },
  },
  {
    path: '/years/2024/sites/mastodon/index.html',
    key: 'itt24-mastodon',
    fieldGo: { field: '[data-md22-instance]', go: '[data-md22-go]', value: 'mastodon.social' },
  },
  {
    path: '/years/2024/sites/bereal/index.html',
    key: 'itt24-bereal',
    fieldGo: { req: '[data-br22-req]', go: '[data-br22-go]' },
  },
  {
    path: '/years/2024/sites/dalle2/index.html',
    key: 'itt24-dalle2',
    fieldGo: { field: '[data-dl22-desc]', req: '[data-dl22-req]', go: '[data-dl22-go]', value: 'astronaut leftover' },
  },
  {
    path: '/years/2024/sites/chrome/index.html',
    key: 'itt24-chrome',
    fieldGo: { field: '[data-ch22-url]', req: '[data-ch22-req]', go: '[data-ch22-keep]', value: 'example.com' },
  },
  {
    path: '/years/2024/sites/windows10/index.html',
    key: 'itt24-win10',
    fieldGo: { req: '[data-w10-req]', go: '[data-w10-save]' },
  },
  {
    path: '/years/2024/sites/tiktok/index.html',
    key: 'itt24-pop3-tiktok',
    ytl: { pick: 'fyp', field: 'fyp leftover' },
  },
  {
    path: '/years/2024/sites/midjourney/index.html',
    key: 'itt24-pop3-midjourney',
    ytl: { pick: 'imagine', field: '/imagine leftover' },
  },
  {
    path: '/years/2024/sites/lensa/index.html',
    key: 'itt24-pop3-lensa',
    ytl: { pick: 'avatar', field: 'avatar leftover' },
  },
  {
    path: '/years/2024/sites/facebook/index.html',
    key: 'itt24-pop-facebook',
    ytl: { pick: 'connect', field: 'connect leftover' },
  },
  {
    path: '/years/2024/sites/youtube/index.html',
    key: 'itt24-pop-youtube',
    ytl: { pick: 'watch', field: 'youtube leftover' },
  },
  {
    path: '/years/2024/sites/wikipedia/index.html',
    key: 'itt24-pop-wikipedia',
    ytl: { pick: 'cite', field: 'wiki leftover' },
  },
];

for (const fl of FLOWS) {
  test(`${fl.key} incomplete never writes then REAL`, async ({ page }) => {
    await page.goto(fl.path);
    await clearKey(page, fl.key);
    await page.reload();
    await expect(page.locator('[data-dest-field]')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(/I read the \d{4} period note/i);

    if (fl.incomplete) {
      await fl.incomplete(page);
    } else if (fl.ytl) {
      await page.locator('[data-ytl-go]').first().click();
    } else if (fl.fieldGo) {
      await page.locator(fl.fieldGo.go).click();
    }
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
    expect(String(blob.year)).toBe('2024');
  });
}
