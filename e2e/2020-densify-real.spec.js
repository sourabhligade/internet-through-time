// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks: string[] }} spec
 */
async function incompleteThenWrite(page, spec) {
  await page.goto(`/years/2020/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await page
    .waitForFunction(
      () => document.documentElement.getAttribute("data-itt-feat-year2020extras") === "1",
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.evaluate(() => localStorage.setItem("itt19-keep", '{"keep":true}'));
  await page.locator(spec.save).click({ force: true });
  await page.waitForTimeout(100);
  expect(await page.evaluate((k) => localStorage.getItem(k), spec.key), spec.key + " incomplete").toBeFalsy();
  if (spec.checks.length > 1) {
    await page.locator(spec.checks[0]).first().check();
    await page.locator(spec.save).click({ force: true });
    await page.waitForTimeout(80);
    expect(await page.evaluate((k) => localStorage.getItem(k), spec.key), spec.key + " partial").toBeFalsy();
  }
  for (const sel of spec.checks) await page.locator(sel).first().check();
  await page.locator(spec.save).click({ force: true });
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeTruthy();
  const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), spec.key)) || "{}");
  expect(blob.multiStep, spec.key + " multiStep").toBe(true);
  expect(blob.real, spec.key + " real").toBe(true);
  expect(blob.year, spec.key + " year").toBe("2020");
  expect(await page.evaluate(() => localStorage.getItem("itt19-keep")), spec.key + " isolation").toContain("keep");
  await page.reload();
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeTruthy();
}

const ROOMS = [
  { path: "sites/chrome/index.html", key: "itt20-chrome", save: "[data-chrome20-save]", checks: ["[data-chrome20-habit]", "[data-chrome20-edge]"] },
  { path: "sites/windows10/index.html", key: "itt20-win10", save: "[data-win10-save]", checks: ["[data-win10-mass]", "[data-win10-ended-2016]"] },
  { path: "sites/acnh/island.html", key: "itt20-acnh", save: "[data-acnh-save]", checks: ["[data-acnh-date]", "[data-acnh-not-gold]"] },
  { path: "sites/fortnite/astronomical.html", key: "itt20-astro", save: "[data-astro-save]", checks: ["[data-astro-date]", "[data-astro-count]", "[data-astro-not-mello]"] },
  { path: "sites/meet/index.html", key: "itt20-meet", save: "[data-meet-save]", checks: ["[data-meet-free]", "[data-meet-teams]", "[data-meet-zoom-gold]"] },
  { path: "sites/tiktok/eo.html", key: "itt20-tiktok-eo", save: "[data-eo-save]", checks: ["[data-eo-date]", "[data-eo-works]", "[data-eo-not-meta]"] },
  { path: "sites/epic/liberty.html", key: "itt20-epic", save: "[data-epic-save]", checks: ["[data-epic-date]", "[data-epic-store]"] },
  { path: "sites/iphone/12.html", key: "itt20-iphone12", save: "[data-ip12-save]", checks: ["[data-ip12-date]", "[data-ip12-5g]", "[data-ip12-not-11]"] },
  { path: "sites/apple/m1.html", key: "itt20-m1", save: "[data-m1-save]", checks: ["[data-m1-date]", "[data-m1-macs]"] },
  { path: "sites/exposure/index.html", key: "itt20-gaen", save: "[data-gaen-save]", checks: ["[data-gaen-api]", "[data-gaen-not-gov]"] },
  { path: "sites/quibi/index.html", key: "itt20-quibi", save: "[data-qb-save]", checks: ["[data-qb-date]", "[data-qb-six]"] },
  { path: "sites/twitter/fleets.html", key: "itt20-fleets", save: "[data-flts-save]", checks: ["[data-flts-date]", "[data-flts-dies]"] },
];

test.describe("2020 densify REAL — every P1/P2 room", () => {
  for (const room of ROOMS) {
    test(room.key, async ({ page }) => {
      await incompleteThenWrite(page, room);
    });
  }
});
