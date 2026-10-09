// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { completeReactStop } = require("./helpers");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2015 mvp", () => {
  test("2015 is the React door on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2015"))).toBe(false);
    await page.goto("/");
    await expect(page.locator('a.year-card.available[data-year="2015"]')).toHaveAttribute(
      "href",
      /app\/index\.html#\/year\/2015/
    );
    await expect(page.locator(".year-card.locked.y2015")).toHaveCount(0);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[data-year="2015"]').click();
    await expect(page).toHaveURL(/app\/index\.html#\/year\/2015/);
    await expect(page.locator(".door")).toBeVisible({ timeout: 20000 });
    await expect(page.locator("body")).toContainText("Periscope");
  });

  test("Periscope empty never writes · Go LIVE writes official itt15-periscope", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-periscope");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-periscope");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await room.locator(".actions button").last().click();
    expect(await getKey(page, "itt15-periscope")).toBeFalsy();
    await completeReactStop(page, room);
    await expect.poll(() => getKey(page, "itt15-periscope"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt15-periscope")) || "{}");
    expect(blob.v).toBe(1);
    expect(blob.real).toBe(true);
    expect(blob.kind).toBe("official");
    expect(String(blob.year)).toBe("2015");
    expect(blob.key).toBe("itt15-periscope");
  });
});
