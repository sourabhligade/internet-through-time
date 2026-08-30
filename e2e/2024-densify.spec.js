// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2024 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2024/pages/about.html");
    await expect(page.locator("body")).toContainText("1,079,154,539");
    await expect(page.locator("body")).toContainText("table ends 2018");
    await expect(page.locator("body")).toContainText("13 May 2024");
  });

  test("guided stays exactly 6 + chip is GPT-4o", async ({ page }) => {
    await page.goto("/years/2024/pages/home.html");
    await expect(page.locator("#ott-guided-2024 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2024"]')).toHaveAttribute("href", /4o/);
  });

  test("dirbar dests resolve · no 2021 clone rooms", async ({ page }) => {
    await page.goto("/years/2024/");
    await expect(page.locator('[data-go="sites/signal/index.html"]')).toHaveCount(0);
    await expect(page.locator('[data-go="sites/copilot/index.html"]')).toHaveCount(0);
    const goes = await page.locator(".dir-btn[data-go]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-go") || "")
    );
    expect(goes.length).toBeGreaterThanOrEqual(6);
    for (const go of goes) {
      const res = await page.request.get("/years/2024/" + go);
      expect(res.status(), "dirbar " + go).toBeLessThan(400);
    }
  });
});
