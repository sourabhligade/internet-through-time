// @ts-check
/**
 * 2× leftover dests — every N-flow on every ship year:
 * incomplete never writes, complete writes REAL ittYY-*.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const matrix = require('./2x-links.matrix.json');
const ROOT = path.join(__dirname, '..');

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function clearKey(page, key) {
  await page.evaluate((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } }, key);
}
async function leaks(page, year) {
  const yy = String(year).slice(2);
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
 * @param {{path:string,key:string,kind:string,year:string,next?:string}} spec
 */
async function runLeftoverOfficial(page, spec) {
  const suffix = spec.key.replace(/^itt\d{2}-/, '');
  const panel = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await panel.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction((suf) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, suffix, { timeout: 20000 });
  await clearKey(page, spec.key);

  const trap = panel.locator("[data-lo-trap]").first();
  if ((await trap.count()) > 0) await trap.click();
  expect(await getKey(page, spec.key), spec.key + " trap").toBeFalsy();

  await panel.locator("[data-lo-save]").first().click();
  expect(await getKey(page, spec.key), spec.key + " 0 ticks").toBeFalsy();

  const reqs = panel.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();

  const saveBtn = panel.locator("[data-lo-save]").first();
  const needPick = (await saveBtn.getAttribute("data-lo-need-pick")) || "";
  const minPick = Number((await saveBtn.getAttribute("data-lo-min-pick")) || "0");
  const picks = panel.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (needPick) {
    await panel.locator(`[data-lo-pick="${needPick}"]`).first().click();
  } else if (nPick > 0) {
    const need = Math.max(minPick || 1, 1);
    for (let i = 0; i < Math.min(need, nPick); i++) await picks.nth(i).click();
  }
  const field = panel.locator("[data-lo-field]");
  if ((await field.count()) > 0) {
    const ph = (await field.first().getAttribute("placeholder")) || "leftover";
    await field.first().fill(ph.length >= 2 ? ph : ph + "xx");
  }
  const wait = panel.locator("[data-lo-wait]");
  if ((await wait.count()) > 0) {
    await wait.first().click();
    await page.waitForTimeout(1000);
  }
  await saveBtn.click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, spec.key)) || "{}");
  expect(blob.real, spec.key + " real").toBe(true);
  expect(blob.leftover, spec.key + " leftover").toBe(true);
  expect(blob.multiStep, spec.key + " multi").toBe(true);
  expect(String(blob.year)).toBe(String(spec.year));
  expect(await leaks(page, spec.year)).toEqual([]);
  if (spec.next) {
    const res = await page.request.get(spec.next);
    expect(res.status(), spec.next).toBe(200);
  }
}

async function runFlow(page, spec) {
  await page.goto(spec.path);
  await clearKey(page, spec.key);
  await page.reload();
  const suffix = spec.key.replace(/^itt\d{2}-/, '');
  const fourX = page.locator(`[data-4x-panel]:has([data-4x-go="${suffix}"])`);
  if ((await fourX.count()) > 0) {
    await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
    const panel = fourX;
    const go = panel.locator('[data-4x-go]');
    await expect(go).toBeVisible();
    await expect(page.locator('[data-dest-field]')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(/I read the \d{4} period note/i);

    await go.click();
    await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();

    if (spec.kind === 'query') {
      await panel.locator('[data-4x-field]').fill('ok leftover');
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
    const blob = JSON.parse((await getKey(page, spec.key)) || '{}');
    expect(blob.real, spec.key + ' must be REAL').toBe(true);
    expect(blob.multiStep, spec.key + ' must be multi-step').toBe(true);
    expect(String(blob.year)).toBe(String(spec.year));
    expect(blob.kind).toBe(spec.kind);
    expect(await leaks(page, spec.year)).toEqual([]);
    if (spec.next) {
      const res = await page.request.get(spec.next);
      expect(res.status(), spec.next).toBe(200);
    }
    return;
  }
  await runLeftoverOfficial(page, spec);
}

const byYear = {};
for (const row of matrix) {
  (byYear[row.year] || (byYear[row.year] = [])).push(row);
}

for (const year of Object.keys(byYear).sort()) {
  if (!fs.existsSync(path.join(ROOT, 'years', year, 'index.html'))) continue;
  const rows = byYear[year].filter((fl) => {
    const dest = path.join(ROOT, String(fl.path || '').replace(/^\//, ''));
    if (!fs.existsSync(dest)) return false;
    try {
      const html = fs.readFileSync(dest, 'utf8');
      const suffix = String(fl.key || '').replace(/^itt\d{2}-/, '');
      return html.indexOf('data-4x-go="' + suffix + '"') !== -1 || html.indexOf('data-lo-key="' + suffix + '"') !== -1;
    } catch (e) {
      return false;
    }
  });
  if (!rows.length) continue;
  test.describe(`2× leftover ${year}`, () => {
    for (const fl of rows) {
      test(`${fl.key} ${fl.path} → ${fl.next} incomplete then REAL`, async ({ page }) => {
        await runFlow(page, fl);
      });
    }
  });
}
