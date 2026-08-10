// @ts-check
const { test, expect } = require("@playwright/test");
const { waitKey } = require("./helpers");

test.describe("2016 trail REAL", () => {
  test("Stories complete next-flow includes Live", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.reload();
    await page.locator("[data-ig-stories-caption]").fill("coffee");
    await page.locator("[data-ig-stories-24h]").check();
    await page.locator("[data-ig-stories-not-reels]").check();
    await page.locator("[data-ig-stories-add]").click();
    await expect(page.locator("[data-next-flow]")).toBeVisible();
    await expect(page.locator("[data-next-flow] a[href*='live']")).toBeVisible();
    await page.locator("[data-next-flow] a[href*='live']").click();
    await expect(page).toHaveURL(/instagram\/live/);
    await expect(page.locator("body")).toContainText(/Nov(?:ember)?\s*21/i);
  });

  test("Pixel complete next-flow to Google Home", async ({ page }) => {
    await page.goto("/years/2016/sites/pixel/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-pixel"));
    await page.reload();
    await page.locator("[data-pixel-date]").check();
    await page.locator("[data-pixel-not-iphone]").check();
    await page.locator("[data-pixel-save]").click();
    await expect(page.locator("[data-next-flow] a[href*='home']")).toBeVisible();
    await page.locator("[data-next-flow] a[href*='home']").click();
    await expect(page).toHaveURL(/sites\/home/);
    await expect(page.locator("body")).toContainText("$129");
  });

  test("Snap story residual links Spectacles", async ({ page }) => {
    await page.goto("/years/2016/sites/snapchat/story.html");
    await expect(page.locator("a[href*='spectacles']").first()).toBeVisible();
    await page.locator("a[href*='spectacles']").first().click();
    await expect(page.locator("body")).toContainText(/Snapbot|\$129/i);
  });

  test("?trail=2016-start writes night state", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("itt-first-night");
    });
    await page.goto("/years/2016/?trail=2016-start&room=pages%2Fabout.html");
    await page.locator("#skip-connect").click({ timeout: 5000 }).catch(() => {});
    const night = await waitKey(page, "itt-first-night");
    expect(night).toMatch(/2016-start/);
  });
});
