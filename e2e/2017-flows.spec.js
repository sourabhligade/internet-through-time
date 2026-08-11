// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

test.describe("2017 flows", () => {
  test("enter year", async ({ page }) => {
    await enterYear(page, "2017");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2017");
  });

  test("Face ID Sep 12 + no home button", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await expect(page.locator("body")).toContainText(/Sep(?:tember)?\s*12/i);
    await expect(page.locator("body")).toContainText(/no home button/i);
    await expect(page.locator("[data-faceid-not-xs]")).toBeVisible();
  });

  test("iframe can open Face ID", async ({ page }) => {
    await enterYear(page, "2017");
    await goInFrame(page, "sites/iphone/x.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Face ID/i);
  });

  test("Fortnite Sep 26 + no official art", async ({ page }) => {
    await page.goto("/years/2017/sites/fortnite/index.html");
    await expect(page.locator("body")).toContainText(/Sep(?:tember)?\s*26/i);
    await expect(page.locator("body")).toContainText(/no official/i);
    await expect(page.locator("[data-fn-free]")).toBeVisible();
  });

  test("home journeys list the six P0 trails", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    const j = page.locator("[data-itt-journeys]");
    await expect(j).toBeVisible();
    await expect(j).toContainText(/Unlock with a face|Drop in|Type past 140|Friday ransomware|Vine is an archive|Office is GA/i);
    await expect(j.locator("a[href*='iphone/x']").first()).toBeVisible();
    await expect(j.locator("a[href*='twitter/280']").first()).toBeVisible();
  });

  test("Twitter 280 Nov 7", async ({ page }) => {
    await page.goto("/years/2017/sites/twitter/280.html");
    await expect(page.locator("body")).toContainText(/Nov(?:ember)?\s*7/i);
    await expect(page.locator("body")).toContainText(/280/);
    await expect(page.locator("body")).toContainText(/not the X/i);
  });

  test("WannaCry May 12", async ({ page }) => {
    await page.goto("/years/2017/sites/wannacry/index.html");
    await expect(page.locator("body")).toContainText(/May\s*12/i);
    await expect(page.locator("body")).toContainText(/no exploit|no attack code/i);
  });

  test("whats-new calendar has Face ID + Fortnite + 280", async ({ page }) => {
    await page.goto("/years/2017/pages/whats-new.html");
    await expect(page.locator("body")).toContainText(/Sep(?:tember)?\s*12/i);
    await expect(page.locator("body")).toContainText(/Sep(?:tember)?\s*26/i);
    await expect(page.locator("body")).toContainText(/Nov(?:ember)?\s*7/i);
    await expect(page.locator("body")).toContainText(/Jan(?:uary)?\s*17/i);
  });

  test("Vine gone Jan 17 reverse of 2016", async ({ page }) => {
    await page.goto("/years/2017/sites/vine/gone.html");
    await expect(page.locator("body")).toContainText(/Jan(?:uary)?\s*17/i);
    await expect(page.locator("body")).toContainText(/2016 only/i);
  });

  test("Teams GA Mar 14 not preview", async ({ page }) => {
    await page.goto("/years/2017/sites/teams/index.html");
    await expect(page.locator("body")).toContainText(/Mar(?:ch)?\s*14/i);
    await expect(page.locator("body")).toContainText(/preview/i);
  });

  test("Yahoo 3B Oct 3 is this year", async ({ page }) => {
    await page.goto("/years/2017/sites/yahoo-3b/index.html");
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*3/i);
    await expect(page.locator("body")).toContainText(/3 billion/i);
  });
});
