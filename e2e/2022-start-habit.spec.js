// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2022 start habit", () => {
  test("hero is ChatGPT Send · empty / GPT-4 never writes", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    const star = page.locator('[data-ott-one-thing="2022"]');
    await expect(star).toBeVisible();
    await expect(star).toHaveAttribute("href", /sites\/chatgpt\/index\.html/);
    await expect(star).toContainText(/ChatGPT Send/);
    await expect(page.locator("#ott-guided-2022")).toContainText("empty / GPT-4 never writes");
    await expect(page.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
  });

  test("official 10 unique dests", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    const hrefs = await page.$$eval('#ott-flows-2022 [data-itt-ten-flows] a[href*="sites/"]', (as) =>
      as.map((a) => (a.getAttribute("href") || "").split("?")[0])
    );
    expect(hrefs.length).toBe(10);
    expect(new Set(hrefs).size).toBe(10);
  });

  test("hub card opens 2022", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a.year-card.available[href*="years/2022"]')).toBeVisible();
    await expect(page.locator(".hub-stats")).toContainText("28 years");
  });
});
