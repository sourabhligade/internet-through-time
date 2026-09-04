// @ts-check
/**
 * Two leftover extra games per shipped year (extra-a / extra-b).
 * Minute machines: empty Finish never writes · year-true verbs write ittYY-game-*.
 * 2012 extra-a/b are on disk (Android share · IPO pin). Dest-missing extras still skip.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const { enterYear, goImmersion, contentFrame, killOverlays } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const YEARS = [];
const WIPED_YEARS = new Set(["2014", "2018", "2020", "2021", "2022", "2023", "2024", "2025"]);
for (let y = 1994; y <= 2019; y++) {
  if (y === 2006 || y === 2007 || y === 2009 || y === 2011 || y === 2013 || y === 2014) continue;
  const s = String(y);
  if (WIPED_YEARS.has(s)) continue;
  YEARS.push(s);
}

function yearOnDisk(year) {
  return fs.existsSync(path.join(ROOT, "years", year, "index.html"));
}

function extraOnDisk(year, file) {
  return fs.existsSync(path.join(ROOT, "years", year, "sites", "playable", file));
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
  test.skip(
    !extraOnDisk(year, file),
    year + " " + file + " not on disk (lean — extra-c/d/e only)"
  );
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
  await killOverlays(page);
  await frame.locator("[data-game-start]").click();
  await killOverlays(page);

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
    await frame.locator("[data-mx-good]").first().waitFor({ timeout: 8000 });
    await frame.locator("[data-mx-good]").first().evaluate(() => {
      const nodes = document.querySelectorAll("[data-mx-good]");
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].getAttribute("data-mx-used") === "1") continue;
        nodes[i].click();
      }
    });
  }

  const confirmNeed = (await host.getAttribute("data-mx-confirm-need")) || "";
  if (confirmNeed) {
    const box = frame.locator("[data-mx-confirm]").first();
    await box.fill(confirmNeed);
    await box.dispatchEvent("input");
  }
  await killOverlays(page);
  await frame.locator("[data-mx-finish]").click({ force: true });
}

test.describe("H13 lean cabinets 2016–2017 — game-2…5 minute machines", () => {
  for (const year of ["2016", "2017"]) {
    for (const file of /** @type {const} */ ([
      "game-2.html",
      "game-3.html",
      "game-4.html",
      "game-5.html",
    ])) {
      test(`${year} ${file} leftover cabinet · empty Finish never writes · verbs write`, async ({
        page,
      }) => {
        const frame = await openExtra(page, year, file);
        const host = frame.locator("[data-year-game][data-minute-extra]");
        const gid = await host.getAttribute("data-game-id");
        expect(gid).toBeTruthy();
        expect(await host.getAttribute("data-pack-game")).toBeNull();
        const key = prefix(year) + "-game-" + gid;
        await frame.locator("[data-mx-finish]").click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
        await completeMinute(frame, page);
        await expect
          .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 8000 })
          .toBeTruthy();
      });
    }
  }
});

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
    const extras = page.locator('[data-itt-year-extras="2016"]');
    await expect(extras.locator('a[href*="extra-a.html"]')).toBeVisible();
    await expect(extras.locator('a[href*="extra-b.html"]')).toBeVisible();
  });
});
