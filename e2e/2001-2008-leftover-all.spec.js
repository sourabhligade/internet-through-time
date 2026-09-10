// @ts-check
/**
 * Every leftover-official dest 2001–2008: trap / empty / wrong pick never write.
 * Complete leftover writes leftover key, not a neighbor year.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const YEARS = new Set(["2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008"]);
const MATRIX = JSON.parse(fs.readFileSync(path.join(__dirname, "leftover-official.matrix.json"), "utf8"));
const DESTS = MATRIX.dests.filter((d) => {
  if (!YEARS.has(d.year)) return false;
  const dest = path.join(ROOT, "years", d.year, d.href);
  if (!fs.existsSync(dest)) return false;
  try {
    return fs.readFileSync(dest, "utf8").indexOf("data-lo-panel") !== -1;
  } catch (e) {
    return false;
  }
});

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function runDest(page, d) {
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${d.suffix}"])`).first();
  await page.goto("/years/" + d.year + "/" + d.href);
  await revealLeftoverRails(page);
  await lo.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction((suf) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, d.suffix, { timeout: 20000 });
  await page.evaluate((k) => localStorage.removeItem(k), d.key);

  if ((await lo.locator("[data-lo-trap]").count()) > 0) {
    await lo.locator("[data-lo-trap]").first().click();
    expect(await getKey(page, d.key), d.key + " trap").toBeFalsy();
  }

  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, d.key), d.key + " 0 ticks").toBeFalsy();

  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();

  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, d.key), d.key + " ticks only").toBeFalsy();

  if (d.needPick) {
    const picks = lo.locator("[data-lo-pick]");
    const nPick = await picks.count();
    for (let i = 0; i < nPick; i++) {
      const id = await picks.nth(i).getAttribute("data-lo-pick");
      if (id && id !== d.needPick) {
        await picks.nth(i).click();
        await lo.locator("[data-lo-save]").first().click();
        expect(await getKey(page, d.key), d.key + " wrong pick").toBeFalsy();
        break;
      }
    }
    await lo.locator(`[data-lo-pick="${d.needPick}"]`).first().click();
  } else if (d.minPick) {
    const picks = lo.locator("[data-lo-pick]");
    const n = await picks.count();
    expect(n, d.key + " min picks present").toBeGreaterThanOrEqual(d.minPick);
    for (let i = 0; i < d.minPick; i++) await picks.nth(i).click();
  }

  if (d.field) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, d.key), d.key + " empty field").toBeFalsy();
    const ph = d.placeholder || "museum leftover";
    await lo.locator("[data-lo-field]").fill(ph.length >= 2 ? ph : ph + "xx");
  }

  if ((await lo.locator("[data-lo-wait]").count()) > 0) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, d.key), d.key + " skip wait").toBeFalsy();
    await lo.locator("[data-lo-wait]").first().click();
    await page.waitForTimeout(1000);
  }

  await lo.locator("[data-lo-save]").first().click();
  await expect.poll(() => getKey(page, d.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, d.key)) || "{}");
  expect(blob.real, d.key + " real").toBe(true);
  expect(blob.leftover, d.key + " leftover").toBe(true);
  expect(String(blob.year), d.key + " year").toBe(d.year);
}

test.describe("2001–2008 leftover-official dest count", () => {
  test("matrix dests exist for 2001–2008", () => {
    expect(DESTS.length, "2001–2008 leftover dests").toBeGreaterThan(3600);
  });
});

test.describe.configure({ mode: "parallel" });

test.describe("2001–2008 leftover dests complete leftover-official", () => {
  for (const d of DESTS) {
    test(`${d.year} ${d.suffix} ${d.href}`, async ({ page }) => {
      await runDest(page, d);
    });
  }
});
