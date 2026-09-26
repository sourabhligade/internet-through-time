// @ts-check
const { test, expect } = require("@playwright/test");
const { openReactStop } = require("./helpers");

test.describe("2017 densify", () => {
  test("Animoji leftover has no Face ID official writer", async ({ page }) => {
    const room = await openReactStop(page, "2017", "itt17-animoji");
    await expect(room.locator("code", { hasText: "itt17-animoji" })).toHaveCount(1);
    await expect(room.locator("code", { hasText: "itt17-faceid" })).toHaveCount(0);
    await expect(room.locator(".kicker")).toContainText(/Leftover/i);
  });

  test("guided list stays 6", async ({ page }) => {
    await page.goto("/app/index.html#/year/2017");
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);
  });
});
