// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

test.describe("2018 flows", () => {
  test("enter year", async ({ page }) => {
    await enterYear(page, "2018");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2018");
  });

  test("GDPR 25 May + Manage", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/index.html");
    await expect(page.locator("body")).toContainText(/25 May|May 25/i);
    await expect(page.locator("[data-gdpr-accept-all]")).toBeVisible();
    await expect(page.locator("[data-gdpr-manage]")).toBeVisible();
  });

  test("iframe can open GDPR", async ({ page }) => {
    await enterYear(page, "2018");
    await goInFrame(page, "sites/gdpr/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/cookie|25 May/i);
  });

  test("home journeys list the six P0 trails", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    const j = page.locator("[data-itt-journeys]");
    await expect(j).toBeVisible();
    await expect(j).toContainText(/Manage cookies|Scroll For You|Sit the hearing|Open IGTV|CPU scare|Speaker in the kitchen/i);
    await expect(j.locator("a[href*='gdpr']").first()).toBeVisible();
    await expect(j.locator("a[href*='tiktok']").first()).toBeVisible();
  });

  test("TikTok Aug 2 merge", async ({ page }) => {
    await page.goto("/years/2018/sites/tiktok/index.html");
    await expect(page.locator("body")).toContainText(/August 2|2 August|Aug 2/i);
    await expect(page.locator("body")).toContainText(/not Reels/i);
  });

  test("IGTV not Reels", async ({ page }) => {
    await page.goto("/years/2018/sites/instagram/igtv.html");
    await expect(page.locator("body")).toContainText(/June 20|20 June/i);
    await expect(page.locator("[data-igtv-not-reels]")).toBeVisible();
  });

  test("hearing quote is on disk", async ({ page }) => {
    await page.goto("/years/2018/sites/trust/hearing.html");
    await expect(page.locator("body")).toContainText(/I started Facebook/i);
    await expect(page.locator("body")).toContainText(/10 April|April 10/i);
  });

  test("Chrome 68 Not secure", async ({ page }) => {
    await page.goto("/years/2018/sites/chrome/not-secure.html");
    await expect(page.locator("body")).toContainText(/Not secure/i);
    await expect(page.locator("body")).toContainText(/68/);
  });

  test("YouTube Premium is not YouTube TV", async ({ page }) => {
    await page.goto("/years/2018/sites/youtube/premium.html");
    await expect(page.locator("body")).toContainText(/\$11\.99/);
    await expect(page.locator("body")).toContainText(/not YouTube TV/i);
  });

  test("iframe can open TikTok FYP", async ({ page }) => {
    await enterYear(page, "2018");
    await goInFrame(page, "sites/tiktok/fyp.html");
    await expect(contentFrame(page).locator("[data-fyp-list]")).toBeVisible();
  });
});
