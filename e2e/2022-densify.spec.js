// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2022 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2022/pages/about.html");
    await expect(page.locator("body")).toContainText("1,167,715,133");
    await expect(page.locator("body")).toContainText("table ends 2018");
    await expect(page.locator("body")).toContainText("5.3 billion");
  });

  test("guided stays exactly 6 + chip is ChatGPT Send", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2022"]')).toHaveAttribute("href", /chatgpt/);
  });

  test("dirbar dests resolve", async ({ page }) => {
    await page.goto("/years/2022/");
    const goes = await page.locator(".dir-btn[data-go]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-go") || "")
    );
    expect(goes.length).toBeGreaterThanOrEqual(6);
    for (const go of goes) {
      const res = await page.request.get("/years/2022/" + go);
      expect(res.status(), "dirbar " + go).toBeLessThan(400);
    }
  });
});
