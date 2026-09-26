// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2017 official trail dests exist", () => {
  const keys = [
    "itt17-faceid",
    "itt17-fortnite",
    "itt17-twitter-280",
    "itt17-teams",
    "itt17-vine-gone",
    "itt17-switch",
    "itt17-wannacry",
    "itt17-musically",
    "itt17-equifax",
    "itt17-game-stormcircle",
  ];

  test("React door loads Face ID", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2017");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "Face ID" })).toBeVisible();
  });

  for (const key of keys) {
    test(key + " is on the official rail", async ({ page }) => {
      await page.goto("/app/index.html#/year/2017");
      await expect(page.locator(".rails li code", { hasText: key })).toHaveCount(1);
    });
  }

  test("guided six stays six · no reddit/amazon gold", async ({ page }) => {
    await page.goto("/app/index.html#/year/2017");
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);
    await expect(page.locator(".rails code", { hasText: "itt17-faceid" })).toHaveCount(1);
    await expect(page.locator(".rails code", { hasText: "itt17-fortnite" })).toHaveCount(1);
    await expect(page.locator(".rails code", { hasText: "itt17-game-stormcircle" })).toHaveCount(1);
  });
});
