// @ts-check
/**
 * Official-trail leftover machines — every dest in leftover-official.matrix.json.
 * Trap / empty / 0 ticks / wrong pick never writes. Complete writes { real, leftover, year }.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");


const ROOT = path.join(__dirname, "..");
const MATRIX = JSON.parse(fs.readFileSync(path.join(__dirname, "leftover-official.matrix.json"), "utf8"));
/** @type {{ year: string, href: string, key: string, suffix: string, needPick: string, minPick: number, field: boolean, placeholder: string }[]} */
const DESTS = MATRIX.dests.filter((d) => {
  const dest = path.join(ROOT, "years", d.year, d.href);
  if (!fs.existsSync(path.join(ROOT, "years", d.year, "index.html"))) return false;
  if (!fs.existsSync(dest)) return false;
  try {
    return fs.readFileSync(dest, "utf8").indexOf("data-lo-panel") !== -1;
  } catch (e) {
    return false;
  }
});

function neighborKeys(year, suffix) {
  const y = parseInt(year, 10);
  return [
    "itt" + String(y - 1).slice(-2) + "-" + suffix,
    "itt" + String(y + 1).slice(-2) + "-" + suffix,
  ];
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function waitLo(page, suffix) {
  const panel = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await panel.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction((suf) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, suffix, { timeout: 20000 });
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {(typeof DESTS)[0]} d
 */
async function runDest(page, d) {
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${d.suffix}"])`).first();
  await page.goto("/years/" + d.year + "/" + d.href);
  await waitLo(page, d.suffix);
  /* Dest extras may seed the same key on boot — leftover machine starts after that. */
  await page.evaluate((k) => localStorage.removeItem(k), d.key);

  await lo.locator("[data-lo-trap]").first().click();
  expect(await getKey(page, d.key), d.key + " trap").toBeFalsy();

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
    await lo.locator(`[data-lo-pick="${d.needPick}"]`).click();
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

  await lo.locator("[data-lo-save]").first().click();
  await expect.poll(() => getKey(page, d.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, d.key)) || "{}");
  expect(blob.real, d.key + " real").toBe(true);
  expect(blob.leftover, d.key + " leftover").toBe(true);
  expect(String(blob.year), d.key + " year").toBe(d.year);
  expect(blob.multiStep, d.key + " multi").toBe(true);

  for (const nk of neighborKeys(d.year, d.suffix)) {
    expect(await getKey(page, nk), "neighbor " + nk).toBeFalsy();
  }
}

test.describe("leftover official · disk + trail", () => {
  test("leftover-official engine is wired", () => {
    const boot = fs.readFileSync(path.join(ROOT, "js/immersion/boot.js"), "utf8");
    expect(boot).toMatch(/immersion\/leftover-official\.js/);
    expect(fs.existsSync(path.join(ROOT, "js/immersion/leftover-official.js"))).toBe(true);
  });

  test("every live official-10 dest has a named whenKey", () => {
    const trails = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
    const years = trails.match(/"(\d{4})":\s*\[([\s\S]*?)\]/g) || [];
    let empty = 0;
    let live = 0;
    for (const block of years) {
      const ym = block.match(/"(\d{4})"/);
      const year = ym ? ym[1] : "";
      if (!year) continue;
      const keys = block.match(/"whenKey":\s*"([^"]*)"/g) || [];
      live += keys.length;
      empty += keys.filter((k) => /"whenKey":\s*""/.test(k)).length;
    }
    expect(live, "live trail dests").toBeGreaterThanOrEqual(28 * 10);
    expect(empty, "empty live whenKeys").toBe(0);
  });

  test("every matrix dest file has leftover panel + dest exists", () => {
    expect(DESTS.length).toBeGreaterThanOrEqual(99);
    for (const d of DESTS) {
      const file = path.join(ROOT, "years", d.year, d.href);
      expect(fs.existsSync(file), file).toBe(true);
      const html = fs.readFileSync(file, "utf8");
      expect(html, d.key).toMatch(/data-lo-save/);
      expect(html, d.key + " suffix").toMatch(new RegExp('data-lo-key="' + d.suffix + '"'));
      expect(html, d.key + " trap").toMatch(/data-lo-trap/);
    }
  });
});

test.describe("leftover official · trap then save", () => {
  for (const d of DESTS) {
    test(`${d.year} ${d.suffix} incomplete never writes then save`, async ({ page }) => {
      await runDest(page, d);
    });
  }
});
