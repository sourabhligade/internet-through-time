// @ts-check
/**
 * 2022 leftover 4× — every dest that ships: empty go never writes,
 * complete writes itt22-<suffix>-4x, never the star.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const YEAR = path.join(ROOT, "years", "2022");
const GOLD = "itt22-chatgpt";

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** @returns {{ path: string, key: string, kind: string, go: string }[]} */
function listFourX() {
  /** @type {{ path: string, key: string, kind: string, go: string }[]} */
  const out = [];
  /** @param {string} dir */
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!name.endsWith(".html")) continue;
      const html = fs.readFileSync(full, "utf8");
      const kindM = html.match(/data-4x-kind="([^"]+)"/);
      const goM = html.match(/data-4x-go="([^"]+)"/);
      if (!kindM || !goM) continue;
      const rel = path.relative(YEAR, full).replace(/\\/g, "/");
      out.push({
        path: "/years/2022/" + rel,
        key: "itt22-" + goM[1],
        kind: kindM[1],
        go: goM[1],
      });
    }
  }
  walk(YEAR);
  return out;
}

const FLOWS = listFourX();

test("2022 leftover 4× is on every leftover dest", () => {
  expect(FLOWS.length, "leftover 4× dests").toBeGreaterThanOrEqual(120);
  expect(FLOWS.every((f) => f.go.endsWith("-4x")), "go suffix -4x").toBe(true);
  expect(FLOWS.some((f) => f.go === "gpt-lx-4x"), "ChatGPT leftover 4×").toBe(true);
  expect(FLOWS.some((f) => f.go === "chatgpt-4x" || f.go === "chatgpt"), "no official leftover 4× key").toBe(false);
});

/**
 * @param {import("@playwright/test").Page} page
 * @param {(typeof FLOWS)[0]} spec
 */
async function runFourX(page, spec) {
  await page.goto(spec.path);
  await page.evaluate(([k, gold]) => {
    try {
      localStorage.removeItem(k);
      localStorage.removeItem(gold);
    } catch (e) {
      /* */
    }
  }, [spec.key, GOLD]);
  await page.reload();
  await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
  const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${spec.go}"])`).first();
  const go = panel.locator(`[data-4x-go="${spec.go}"]`);
  await expect(go).toBeVisible();
  await expect(go).not.toHaveText(/Do leftover|Save leftover 4×|Note leftover/i);
  await expect(page.locator("[data-dest-field]")).toHaveCount(0);

  await go.click();
  expect(await getKey(page, spec.key), spec.key + " empty go").toBeFalsy();
  expect(await getKey(page, GOLD), spec.key + " empty gold").toBeFalsy();

  if (spec.kind === "query") {
    await panel.locator("[data-4x-field]").fill("ok leftover");
  } else if (spec.kind === "checks") {
    const boxes = panel.locator("[data-4x-req]");
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check();
  } else if (spec.kind === "hops") {
    const hops = panel.locator("[data-4x-hop]");
    expect(await hops.count(), spec.key + " hops").toBeGreaterThanOrEqual(2);
    await hops.nth(0).click();
    await hops.nth(1).click();
  } else if (spec.kind === "wait") {
    await panel.locator("[data-4x-wait]").click();
    await page.waitForTimeout(2200);
  } else if (spec.kind === "toggle") {
    await panel.locator('[data-4x-toggle="off"]').click();
    await panel.locator('[data-4x-toggle="on"]').click();
  }

  await go.click();
  await expect.poll(() => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, spec.key)) || "{}");
  expect(blob.real, spec.key + " real").toBe(true);
  expect(blob.multiStep, spec.key + " multi").toBe(true);
  expect(String(blob.year), spec.key + " year").toBe("2022");
  expect(await getKey(page, GOLD), spec.key + " never gold").toBeFalsy();

  const next = panel.locator("[data-next-flow] a, [data-4x-next] a").first();
  if ((await next.count()) > 0) {
    const href = await next.getAttribute("href");
    expect(href, spec.key + " next href").toBeTruthy();
    const dest = new URL(href || "", page.url());
    expect(dest.pathname, spec.key + " next year").toMatch(/\/years\/2022\//);
    const res = await page.request.get(dest.pathname);
    expect(res.status(), dest.pathname).toBe(200);
  }
}

test.describe("2022 leftover 4× every dest", () => {
  for (const fl of FLOWS) {
    test(`${fl.key} ${fl.path} empty then REAL`, async ({ page }) => {
      await runFourX(page, fl);
    });
  }
});
