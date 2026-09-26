// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test.describe("2019 MVP", () => {
  test("2019 leftover rail has no cabinet fillers", () => {
    const src = fs.readFileSync(path.join(__dirname, "..", "react", "src", "year2019.js"), "utf8");
    expect(src).not.toContain("Play cabinet");
    expect(src).not.toContain("itt19-xa-lx");
    expect(src).not.toContain("Museum extra leftover cabinet");
    expect(src.match(/leftover: true/g) || []).toHaveLength(54);
  });

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
    const also = page.locator(".rails section", { has: page.getByRole("heading", { name: "Also this year" }) });
    await expect(also.locator("ol > li")).toHaveCount(54);
    await expect(also.locator("code", { hasText: "itt19-xa-lx" })).toHaveCount(0);
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
