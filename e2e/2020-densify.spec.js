// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("2020 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2020/pages/about.html");
    await expect(page.locator("body")).toContainText("1,295,973,827");
    await expect(page.locator("body")).toContainText("table ends 2018");
    await expect(page.locator("body")).toContainText("participants");
    await expect(page.locator("body")).toContainText("not users");
  });

  test("guided stays exactly 6 + chip is Zoom", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("#ott-guided-2020 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2020"]')).toHaveAttribute("href", /zoom\/meeting/);
  });

  test("dirbar dests resolve · no 2021 clone rooms", async ({ page }) => {
    await page.goto("/years/2020/");
    await expect(page.locator('[data-go="sites/att/index.html"]')).toHaveCount(0);
    await expect(page.locator('[data-go="sites/copilot/index.html"]')).toHaveCount(0);
    const goes = await page.locator(".dir-btn[data-go]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-go") || "")
    );
    expect(goes.length).toBeGreaterThanOrEqual(6);
    for (const go of goes) {
      const res = await page.request.get("/years/2020/" + go);
      expect(res.status(), "dirbar " + go).toBeLessThan(400);
    }
  });
});
