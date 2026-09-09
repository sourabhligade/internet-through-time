// @ts-check
/**
 * Two leftover extra games per shipped year (extra-a / extra-b).
 * Minute machines: empty Finish never writes · year-true verbs write ittYY-game-*.
 * 2012 extra-a/b are on disk (Android share · IPO pin). Dest-missing extras still skip.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const { killOverlays } = require("./helpers");

const ROOT = path.join(__dirname, "..");
const YEARS = [];
const WIPED_YEARS = new Set(["2021", "2022", "2023", "2024", "2025"]);
for (let y = 1994; y <= 2020; y++) {
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

function extraHasMinuteHook(year, file) {
  const p = path.join(ROOT, "years", year, "sites", "playable", file);
  if (!fs.existsSync(p)) return false;
  const html = fs.readFileSync(p, "utf8");
  if (!/data-minute-extra/.test(html)) return false;
  if (/data-mx-good|data-mx-seq|data-mx-hold|data-mx-input|data-mx-next/.test(html)) return true;
  return new RegExp("year-" + year + "-").test(html);
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
  test.skip(
    !extraHasMinuteHook(year, file),
    year + " " + file + " has no data-minute-extra (leftover cabinet only — do not dest-farm)"
  );
  await page.goto("/years/" + year + "/sites/playable/" + file + "?fast=1");
  await page.evaluate((p) => {
    Object.keys(localStorage)
      .filter((k) => k.indexOf(p + "-game-") === 0)
      .forEach((k) => localStorage.removeItem(k));
  }, prefix(year));
  await page.reload();
  const host = page.locator("[data-year-game][data-minute-extra]");
  await expect(host).toBeVisible({ timeout: 20000 });
  return page;
}

/**
 * Drive the year-true verbs for whatever kind this extra is.
 * @param {import("@playwright/test").FrameLocator} frame
 * @param {import("@playwright/test").Page} page
 */
async function completeMinute(root, page) {
  const host = root.locator("[data-year-game][data-minute-extra]");
  const kind = (await host.getAttribute("data-mx-kind")) || "pick";
  await killOverlays(page).catch(() => {});
  await root.locator("[data-game-start]").click();
  await killOverlays(page).catch(() => {});

  if (kind === "form") {
    const inputs = root.locator("[data-mx-input]");
    const n = await inputs.count();
    for (let i = 0; i < n; i++) {
      const need = (await inputs.nth(i).getAttribute("data-need")) || "";
      await inputs.nth(i).fill(need);
    }
    await root.locator("[data-mx-submit]").click();
  } else if (kind === "search") {
    const q = (await host.getAttribute("data-mx-query")) || "";
    await root.locator("input[data-mx-query]").fill(q);
    await root.locator("[data-mx-run]").click();
    await root.locator("[data-mx-hit]").click();
  } else if (kind === "hold") {
    const btn = root.locator("[data-mx-hold]");
    await btn.dispatchEvent("pointerdown");
    await page.waitForTimeout(1800);
    await btn.dispatchEvent("pointerup");
  } else if (kind === "wizard") {
    const next = root.locator("[data-mx-next]");
    for (let i = 0; i < 8; i++) {
      if (!(await next.isVisible().catch(() => false))) break;
      await next.click();
    }
  } else if (kind === "seq") {
    await root.locator("[data-mx-seq]").first().waitFor({ timeout: 8000 });
    const items = root.locator("[data-mx-seq]");
    const n = await items.count();
    /** @type {{ i: number, o: number }[]} */
    const orders = [];
    for (let i = 0; i < n; i++) {
      orders.push({ i, o: Number((await items.nth(i).getAttribute("data-order")) || "0") });
    }
    orders.sort((a, b) => a.o - b.o);
    for (const x of orders) await items.nth(x.i).click();
  } else {
    await root.locator("[data-mx-good]").first().waitFor({ timeout: 8000 });
    await root.locator("[data-mx-good]").first().evaluate(() => {
      const nodes = document.querySelectorAll("[data-mx-good]");
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].getAttribute("data-mx-used") === "1") continue;
        nodes[i].click();
      }
    });
  }

  const confirmNeed = (await host.getAttribute("data-mx-confirm-need")) || "";
  if (confirmNeed) {
    const box = root.locator("[data-mx-confirm]").first();
    await box.waitFor({ timeout: 8000 });
    await box.fill(confirmNeed);
    await box.dispatchEvent("input");
  }
  await killOverlays(page).catch(() => {});
  await root.locator("[data-mx-finish]").click({ force: true });
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
        const root = await openExtra(page, year, file);
        const host = root.locator("[data-year-game][data-minute-extra]");
        const gid = await host.getAttribute("data-game-id");
        expect(gid).toBeTruthy();
        expect(await host.getAttribute("data-pack-game")).toBeNull();
        const key = prefix(year) + "-game-" + gid;
        await root.locator("[data-mx-finish]").click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
        await completeMinute(root, page);
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
        const root = await openExtra(page, year, file);
        const host = root.locator("[data-year-game][data-minute-extra]");
        const gid = await host.getAttribute("data-game-id");
        const kind = await host.getAttribute("data-mx-kind");
        expect(gid).toBeTruthy();
        expect(kind).toBeTruthy();
        const key = prefix(year) + "-game-" + gid;
        await root.locator("[data-mx-finish]").click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
        await completeMinute(root, page);
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
