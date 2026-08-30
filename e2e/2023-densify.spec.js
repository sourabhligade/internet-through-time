// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2023 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2023/pages/about.html");
    await expect(page.locator("body")).toContainText("table ends 2018");
    await expect(page.locator("body")).toContainText("5.4 billion");
    await expect(page.locator("body")).toContainText("$20");
  });

  test("guided stays exactly 6 + chip is Plus", async ({ page }) => {
    await page.goto("/years/2023/pages/home.html");
    await expect(page.locator("#ott-guided-2023 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2023"]')).toHaveAttribute("href", /plus/);
  });

  test("dirbar dests resolve · no 2022 clone rooms", async ({ page }) => {
    await page.goto("/years/2023/");
    await expect(page.locator('[data-go="sites/chatgpt/index.html"]')).toHaveCount(0);
    await expect(page.locator('[data-go="sites/wordle/index.html"]')).toHaveCount(0);
    const goes = await page.locator(".dir-btn[data-go]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-go") || "")
    );
    expect(goes.length).toBeGreaterThanOrEqual(6);
    for (const go of goes) {
      const res = await page.request.get("/years/2023/" + go);
      expect(res.status(), "dirbar " + go).toBeLessThan(400);
    }
  });
});
