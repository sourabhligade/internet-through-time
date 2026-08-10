// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

test.describe("2015 flows", () => {
  test("enter year", async ({ page }) => {
    await enterYear(page, "2015");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2015");
  });

  test("Watch prices", async ({ page }) => {
    await page.goto("/years/2015/sites/apple/watch.html");
    await expect(page.locator("body")).toContainText("$349");
    await expect(page.locator("body")).toContainText(/April 24|Apr 24/i);
  });

  test("iframe can open Watch", async ({ page }) => {
    await enterYear(page, "2015");
    await goInFrame(page, "sites/apple/watch.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Apple Watch/i);
  });

  test("Apple Music prices + Beats 1", async ({ page }) => {
    await page.goto("/years/2015/sites/applemusic/index.html");
    await expect(page.locator("body")).toContainText("$9.99");
    await expect(page.locator("body")).toContainText(/Beats 1/i);
  });

  test("Google Photos unlimited HQ", async ({ page }) => {
    await page.goto("/years/2015/sites/googlephotos/index.html");
    await expect(page.locator("body")).toContainText(/unlimited/i);
    await expect(page.locator("body")).toContainText(/May 28|I\/O|high-quality/i);
  });

  test("Echo mass price", async ({ page }) => {
    await page.goto("/years/2015/sites/echo/index.html");
    await expect(page.locator("body")).toContainText("$179.99");
    await expect(page.locator("body")).toContainText(/Jul 14|July 14|Jun 23|June 23/i);
  });

  test("Edge is EdgeHTML not Chromium", async ({ page }) => {
    await page.goto("/years/2015/sites/edge/index.html");
    await expect(page.locator("body")).toContainText(/EdgeHTML|not.*Chromium/i);
  });

  test("whats-new calendar has Watch + Win10", async ({ page }) => {
    await page.goto("/years/2015/pages/whats-new.html");
    await expect(page.locator("body")).toContainText(/Apr 24|April 24/i);
    await expect(page.locator("body")).toContainText(/Jul 29|July 29/i);
    await expect(page.locator("body")).toContainText(/YouTube Red|Instant Articles|Moments|Title II|AMP/i);
  });

  test("YouTube Red $9.99 not Premium", async ({ page }) => {
    await page.goto("/years/2015/sites/youtube/red.html");
    await expect(page.locator("body")).toContainText("$9.99");
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*28|not.*Premium 2018/i);
  });

  test("AMP is announce not SERP", async ({ page }) => {
    await page.goto("/years/2015/sites/amp/index.html");
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*7/i);
    await expect(page.locator("body")).toContainText(/2016|SERP/i);
  });

  test("Title II is 2015 vote not 2017 repeal", async ({ page }) => {
    await page.goto("/years/2015/sites/fcc/index.html");
    await expect(page.locator("body")).toContainText(/Feb(?:ruary)?\s*26|Title II/i);
    await expect(page.locator("body")).toContainText(/not the 2017/i);
  });

  test("Instant Articles in-app not AMP", async ({ page }) => {
    await page.goto("/years/2015/sites/facebook/instant.html");
    await expect(page.locator("body")).toContainText(/May\s*12|Instant Articles/i);
    await expect(page.locator("body")).toContainText(/not.*AMP/i);
  });

  test("Moments is Oct 6 Project Lightning", async ({ page }) => {
    await page.goto("/years/2015/sites/twitter/moments.html");
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*6|Project Lightning/i);
    await expect(page.locator("body")).toContainText(/curated/i);
  });
});
