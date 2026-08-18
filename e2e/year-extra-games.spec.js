// @ts-check
/**
 * Two leftover extra games per shipped year (extra-a / extra-b).
 * Minute machines: empty Finish never writes · year-true verbs write ittYY-game-*.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { enterYear, goImmersion, contentFrame, killOverlays } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const YEARS = [];
for (let y = 1994; y <= 2018; y++) YEARS.push(String(y));

function yearOnDisk(year) {
  return fs.existsSync(path.join(ROOT, "years", year, "index.html"));
}

function prefix(year) {
  return "itt" + String(year).slice(2);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} year
 * @param {"extra-a.html"|"extra-b.html"} file
 */
async function openExtra(page, year, file) {
  test.skip(!yearOnDisk(year), year + " not on disk");
  await enterYear(page, year);
  await page.evaluate((p) => {
    Object.keys(localStorage)
      .filter((k) => k.indexOf(p + "-game-") === 0)
      .forEach((k) => localStorage.removeItem(k));
  }, prefix(year));
  await goImmersion(page, year, "sites/playable/" + file + "?fast=1");
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator("[data-year-game][data-minute-extra]")).toBeVisible({ timeout: 20000 });
  return frame;
}

/**
 * Drive the year-true verbs for whatever kind this extra is.
 * @param {import("@playwright/test").FrameLocator} frame
 * @param {import("@playwright/test").Page} page
 */
async function completeMinute(frame, page) {
  const host = frame.locator("[data-year-game][data-minute-extra]");
  const kind = (await host.getAttribute("data-mx-kind")) || "pick";
  await frame.locator("[data-game-start]").click();

  if (kind === "form") {
    const inputs = frame.locator("[data-mx-input]");
    const n = await inputs.count();
    for (let i = 0; i < n; i++) {
      const need = (await inputs.nth(i).getAttribute("data-need")) || "";
      await inputs.nth(i).fill(need);
    }
    await frame.locator("[data-mx-submit]").click();
  } else if (kind === "search") {
    const q = (await host.getAttribute("data-mx-query")) || "";
    await frame.locator("input[data-mx-query]").fill(q);
    await frame.locator("[data-mx-run]").click();
    await frame.locator("[data-mx-hit]").click();
  } else if (kind === "hold") {
    const btn = frame.locator("[data-mx-hold]");
    await btn.dispatchEvent("pointerdown");
    await page.waitForTimeout(1800);
    await btn.dispatchEvent("pointerup");
  } else if (kind === "wizard") {
    const next = frame.locator("[data-mx-next]");
    for (let i = 0; i < 8; i++) {
      if (!(await next.isVisible().catch(() => false))) break;
      await next.click();
    }
  } else if (kind === "seq") {
    const items = frame.locator("[data-mx-seq]");
    const n = await items.count();
    /** @type {{ i: number, o: number }[]} */
    const orders = [];
    for (let i = 0; i < n; i++) {
      orders.push({ i, o: Number((await items.nth(i).getAttribute("data-order")) || "0") });
    }
    orders.sort((a, b) => a.o - b.o);
    for (const x of orders) await items.nth(x.i).click();
  } else {
    const goods = frame.locator("[data-mx-good]");
    const n = await goods.count();
    for (let i = 0; i < n; i++) await goods.nth(i).click();
  }

  const confirmNeed = (await host.getAttribute("data-mx-confirm-need")) || "";
  if (confirmNeed) {
    await frame.locator("[data-mx-confirm]").fill(confirmNeed);
  }
  await frame.locator("[data-mx-finish]").click();
}

test.describe("year extra games — minute machines", () => {
  for (const year of YEARS) {
    for (const file of /** @type {const} */ (["extra-a.html", "extra-b.html"])) {
      test(`${year} ${file} loads · empty Finish never writes · year-true verbs write`, async ({
        page,
      }) => {
        const frame = await openExtra(page, year, file);
        const host = frame.locator("[data-year-game][data-minute-extra]");
        const gid = await host.getAttribute("data-game-id");
        const kind = await host.getAttribute("data-mx-kind");
        expect(gid).toBeTruthy();
        expect(kind).toBeTruthy();
        const key = prefix(year) + "-game-" + gid;
        await frame.locator("[data-mx-finish]").click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
        await completeMinute(frame, page);
        await expect
          .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 8000 })
          .toBeTruthy();
        const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), key)) || "{}");
        expect(blob.real).toBe(true);
        expect(String(blob.year)).toBe(year);
        expect(blob.multiStep).toBe(true);
        expect(blob.kind).toBe(kind);
      });
    }
  }

  test("2016 home lists both extras", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    await expect(page.locator('a[href*="extra-a.html"]')).toBeVisible();
    await expect(page.locator('a[href*="extra-b.html"]')).toBeVisible();
  });
});
