// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2012 SoundCloud scrub comment", () => {
  test("play + comment at fake time persists", async ({ page }) => {
    await page.goto("/years/2012/sites/soundcloud/index.html");
    await page.evaluate(() => localStorage.removeItem("itt12-soundcloud"));
    await page.reload();
    await page.waitForTimeout(400);

    await page.locator("[data-sc-comment-btn]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt12-soundcloud"))).toBeNull();

    await page.locator("[data-sc-play]").click();
    await page.locator("[data-sc-scrub]").evaluate((el) => {
      el.value = "42";
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await page.fill("[data-sc-text]", "nice drop residual");
    await page.locator("[data-sc-comment-btn]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt12-soundcloud")))
      .toMatch(/nice drop residual/);
    await expect(page.locator("[data-sc-log]")).toContainText(/0:42|nice drop residual/i);
    await page.reload();
    await page.waitForTimeout(400);
    await expect(page.locator("[data-sc-log]")).toContainText(/0:42/i);
    await expect(page.locator("[data-sc-log]")).toContainText(/nice drop residual/i);
  });
});
