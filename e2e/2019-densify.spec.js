// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2019 leftover densify copy", () => {
  test("about bans Zoom and Reels", async ({ page }) => {
    await page.goto("/years/2019/pages/about.html");
    await expect(page.locator("body")).toContainText(/Zoom/i);
    await expect(page.locator("body")).toContainText(/Reels/i);
    await expect(page.locator("body")).not.toContainText(/I read the 2019 period note/i);
  });

  test("Disney+ join trial is on disk", async ({ page }) => {
    const res = await page.goto("/years/2019/sites/disneyplus/index.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("[data-dplus-trial]")).toBeVisible();
  });

  test("Marshmello leftover exists", async ({ page }) => {
    await page.goto("/years/2019/sites/fortnite/marshmello.html");
    await expect(page.locator("body")).toContainText(/10\.7/);
    await expect(page.locator("body")).toContainText(/Travis/i);
  });
});
