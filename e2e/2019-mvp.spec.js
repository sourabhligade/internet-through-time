// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2019 MVP", () => {
  test("2019 card opens the React year", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("a.year-card.available[data-year='2019']");
    await expect(card).toBeVisible();
    await expect(card).toHaveAttribute("href", /app\/index\.html#\/year\/2019/);
    await expect(page.locator(".year-card.locked.y2019")).toHaveCount(0);
  });

  test("React door shows Disney+ Continue and six guided steps", async ({ page }) => {
    await page.goto("/app/index.html#/year/2019");
    await expect(page.getByRole("heading", { name: "Disney+ Continue" })).toBeVisible();
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);
  });

  test("about keeps the 2018 table and the ITU cite", async ({ page }) => {
    await page.goto("/app/index.html#/year/2019");
    await page.locator(".rails").getByRole("button", { name: "About 2019" }).click();
    const about = page.locator("article.stop");
    await expect(about).toContainText("1,630,322,579");
    await expect(about).toContainText("ends 2018");
    await expect(about).toContainText(/ITU/i);
    await expect(about).toContainText(/4\.1/);
    await expect(about).toContainText(/Disney/i);
    await expect(about).toContainText(/Reels/i);
  });
});
