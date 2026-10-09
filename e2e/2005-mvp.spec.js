// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { getKey, clickOfficialVerb } = require("./dest-true-io");

test.describe("2005 mvp", () => {
  test("2005 is live on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2005", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2005']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2005")).toHaveCount(0);
  });

  test("guided stays exactly 6 · chip YouTube", async ({ page }) => {
    await page.goto("/years/2005/pages/home.html");
    await expect(page.locator("#ott-guided-2005 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2005"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2005"]')).toHaveAttribute("href", /youtube\/upload/);
  });

  test("YouTube empty never writes · titled upload writes official itt05-yt-uploads", async ({ page }) => {
    const dest = "/years/2005/sites/youtube/upload.html";
    await page.goto(dest);
    await page.evaluate(() => localStorage.removeItem("itt05-yt-uploads"));
    await clickOfficialVerb(page, dest);
    expect(await getKey(page, "itt05-yt-uploads")).toBeFalsy();
    await page.fill("[name='title']", "elephant residual");
    await page.fill("[name='desc']", "tag residual");
    await page.locator("[data-yt-req]").nth(0).check();
    await page.locator("[data-yt-req]").nth(1).check();
    await clickOfficialVerb(page, dest);
    await expect.poll(() => getKey(page, "itt05-yt-uploads"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt05-yt-uploads")) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.kind).toBe("official");
    expect(String(blob.year)).toBe("2005");
    expect(blob.key).toBe("itt05-yt-uploads");
  });
});
