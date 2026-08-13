// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

test.describe("2014 flows A–T (sample)", () => {
  test("A enter year", async ({ page }) => {
    await enterYear(page, "2014");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2014");
  });

  test("B about dual-cite", async ({ page }) => {
    await page.goto("/years/2014/pages/about.html");
    await expect(page.locator("body")).toContainText("968,882,453");
    await expect(page.locator("body")).toContainText(/September 2014/i);
  });

  test("C–D WhatsApp install + deal", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/about.html");
    await expect(page.locator("body")).toContainText(/16|19/);
    await expect(page.locator("body")).toContainText(/October 6|Oct 6/i);
  });

  test("F iPhone prices", async ({ page }) => {
    await page.goto("/years/2014/sites/iphone/index.html");
    await expect(page.locator("body")).toContainText("$199");
    await expect(page.locator("body")).toContainText("$499");
  });

  test("M Win10 not retail", async ({ page }) => {
    await page.goto("/years/2014/sites/windows10/index.html");
    await expect(page.locator("body")).toContainText(/not retail|Technical Preview|Insider/i);
  });

  test("iframe can open WhatsApp", async ({ page }) => {
    await enterYear(page, "2014");
    await goInFrame(page, "sites/whatsapp/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/WhatsApp/i);
  });
});
