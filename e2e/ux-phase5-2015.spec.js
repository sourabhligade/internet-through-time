// @ts-check
/**
 * Museum-grade UX phase 5 after the 2015 wipe.
 * 2015 is omitted: no hub card, no years/2015 tree, hash is not a door.
 * Off dest-true 12. Do not dest-farm. Do not restore 2015 until named.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test.describe("UX phase 5 2015 omitted", () => {
  test("no hub card and no years/2015 tree", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "../years/2015"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../react/src/year2015.js"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../react/src/YearRail.jsx"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../react/src/OfficialStop.jsx"))).toBe(false);
    const helpers = fs.readFileSync(path.join(__dirname, "helpers.js"), "utf8");
    expect(helpers.includes("clickRailKey")).toBe(false);
    expect(helpers.includes("completeReactStop")).toBe(false);
    const res = await page.goto("/");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("a.year-card.available.y2015")).toHaveCount(0);
    await expect(page.locator('a.year-card.available[data-year="2015"]')).toHaveCount(0);
  });

  test("2015 hash is not a door and never shows Periscope", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2015");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
    await expect(page.locator(".year-star")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Periscope");
    await expect(page.locator("body")).not.toContainText("Live Rush");
    await expect(page.getByRole("link", { name: "Museum hub" })).toHaveAttribute("href", "../index.html");
  });

  test("2017 hash is not a door and never shows Periscope", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2017");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2017 is not a door" })).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
    await expect(page.locator(".year-star")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Periscope");
    await expect(page.getByRole("link", { name: "Museum hub" })).toHaveAttribute("href", "../index.html");
  });
});
