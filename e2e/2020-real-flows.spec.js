// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks?: string[] }} spec
 */
async function assertBlockedThenWrites(page, spec) {
  await page.goto(`/years/2020/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await page
    .waitForFunction(
      () => {
        const d = document.documentElement;
        return (
          d.getAttribute("data-itt-feat-year2020extras") === "1" ||
          d.getAttribute("data-itt-real-flow") === "1" ||
          !!document.querySelector("[data-itt-real-save][data-itt-real-bound='1']")
        );
      },
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.locator(spec.save).click();
  await page.waitForTimeout(120);
  expect(await page.evaluate((k) => localStorage.getItem(k), spec.key), spec.key + " incomplete").toBeFalsy();
  for (const sel of spec.checks || []) {
    const loc = page.locator(sel);
    const n = await loc.count();
    if (n > 1) {
      for (let i = 0; i < n; i++) await loc.nth(i).check();
    } else {
      await loc.first().check();
    }
  }
  await page.locator(spec.save).click();
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeTruthy();
}

test.describe("2020 REAL flows", () => {
  test("About thesis three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "pages/about.html",
      key: "itt20-thesis-ack",
      save: "[data-itt-real-save]",
      checks: ["[data-req]"],
    });
  });

  test("CCPA hides ad slot", async ({ page }) => {
    await page.goto("/years/2020/sites/ccpa/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-ccpa-dns"));
    await page.reload();
    await page.waitForTimeout(300);
    await page.locator("[data-dns]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt20-ccpa-dns"))).toBeFalsy();
    await page.locator("[data-ccpa-live]").check();
    await page.locator("[data-ccpa-not-gdpr]").check();
    await page.locator("[data-dns]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-ccpa-dns"))).toBeTruthy();
    await page.goto("/years/2020/sites/shop/index.html");
    await page.waitForTimeout(400);
    await expect(page.locator(".itt20-ad-slot")).toBeHidden();
  });

  test("Reels 0s does not write", async ({ page }) => {
    await page.goto("/years/2020/sites/instagram/reels.html");
    await page.evaluate(() => localStorage.removeItem("itt20-reels"));
    await page.reload();
    await page.waitForTimeout(300);
    await page.locator("[data-reel-date]").check();
    await page.locator("[data-reel-not-stories]").check();
    await page.locator("[data-reel-not-meta]").check();
    await page.locator("[data-reel-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt20-reels"))).toBeFalsy();
  });

  test("Flash three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/flash/eol.html",
      key: "itt20-flash",
      save: "[data-fl-save]",
      checks: ["[data-fl-eol]", "[data-fl-announce]", "[data-fl-not-2016]"],
    });
  });

  test("Edge three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/edge/index.html",
      key: "itt20-edge",
      save: "[data-ed-save]",
      checks: ["[data-ed-stable]", "[data-ed-not-2019]", "[data-ed-habit]"],
    });
  });

  test("HBO Max three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/hbomax/index.html",
      key: "itt20-hbomax",
      save: "[data-hbo-save]",
      checks: ["[data-hbo-price]", "[data-hbo-date]", "[data-hbo-not-dplus]"],
    });
  });

  test("Reels 15s + checks writes itt20-reels", async ({ page }) => {
    await page.goto("/years/2020/sites/instagram/reels.html");
    await page.evaluate(() => localStorage.removeItem("itt20-reels"));
    await page.reload();
    await page.waitForTimeout(300);
    await page.locator("[data-reel-record]").click();
    await page.waitForTimeout(1600);
    await page.locator("[data-reel-date]").check();
    await page.locator("[data-reel-not-stories]").check();
    await page.locator("[data-reel-not-meta]").check();
    await page.locator("[data-reel-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-reels"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-reels"))) || "{}");
    expect(blob.sec).toBe(15);
    expect(blob.notStories).toBe(true);
    expect(blob.year).toBe("2020");
  });
});

