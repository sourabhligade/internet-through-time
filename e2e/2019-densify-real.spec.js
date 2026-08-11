// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks: string[] }} spec
 */
async function incompleteThenWrite(page, spec) {
  await page.goto(`/years/2019/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await page
    .waitForFunction(
      () => document.documentElement.getAttribute("data-itt-feat-year2019extras") === "1",
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.locator(spec.save).click({ force: true });
  await page.waitForTimeout(100);
  expect(await page.evaluate((k) => localStorage.getItem(k), spec.key), spec.key).toBeFalsy();
  for (const sel of spec.checks) await page.locator(sel).first().check();
  await page.locator(spec.save).click({ force: true });
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeTruthy();
  const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), spec.key)) || "{}");
  expect(blob.multiStep).toBe(true);
  expect(blob.real).toBe(true);
  expect(blob.year).toBe("2019");
}

const ROOMS = [
  { path: "sites/chrome/index.html", key: "itt19-chrome", save: "[data-chrome19-save]", checks: ["[data-chrome19-habit]", "[data-chrome19-edge]", "[data-chrome19-notnew]"] },
  { path: "sites/edge/preview.html", key: "itt19-edge", save: "[data-ed-save]", checks: ["[data-ed-announce]", "[data-ed-preview]", "[data-ed-ship]"] },
  { path: "sites/windows10/index.html", key: "itt19-win10", save: "[data-win10-save]", checks: ["[data-win10-mass]", "[data-win10-ended-2016]"] },
  { path: "sites/flickr/1000.html", key: "itt19-flickr", save: "[data-fl-save]", checks: ["[data-fl-limit]", "[data-fl-enforce]"] },
  { path: "sites/inbox/gone.html", key: "itt19-inbox", save: "[data-inbox-save]", checks: ["[data-inbox-date]", "[data-inbox-gmail]"] },
  { path: "sites/huawei/gms.html", key: "itt19-huawei", save: "[data-hw-save]", checks: ["[data-hw-date]", "[data-hw-gms]"] },
  { path: "sites/oculus/quest.html", key: "itt19-quest", save: "[data-quest-save]", checks: ["[data-quest-price]", "[data-quest-date]"] },
  { path: "sites/ipados/index.html", key: "itt19-ipados", save: "[data-ipados-save]", checks: ["[data-ipados-named]", "[data-ipados-ship]"] },
  { path: "sites/libra/index.html", key: "itt19-libra", save: "[data-libra-save]", checks: ["[data-libra-date]", "[data-libra-not-live]"] },
  { path: "sites/instagram/likes.html", key: "itt19-ig-likes", save: "[data-igl-save]", checks: ["[data-igl-test]", "[data-igl-not-reels]"] },
  { path: "sites/fortnite/worldcup.html", key: "itt19-fn-wc", save: "[data-fnwc-save]", checks: ["[data-fnwc-pool]", "[data-fnwc-bugha]"] },
  { path: "sites/iphone/11.html", key: "itt19-iphone11", save: "[data-ip11-save]", checks: ["[data-ip11-price]", "[data-ip11-not5g]"] },
  { path: "sites/ios13/index.html", key: "itt19-ios13", save: "[data-ios13-save]", checks: ["[data-ios13-date]", "[data-ios13-not-face]"] },
  { path: "sites/arcade/index.html", key: "itt19-arcade", save: "[data-arc-save]", checks: ["[data-arc-price]", "[data-arc-date]"] },
  { path: "sites/stadia/index.html", key: "itt19-stadia", save: "[data-stadia-save]", checks: ["[data-stadia-price]", "[data-stadia-date]"] },
];

test.describe("2019 densify REAL", () => {
  for (const room of ROOMS) {
    test(room.key, async ({ page }) => {
      await incompleteThenWrite(page, room);
    });
  }
});
