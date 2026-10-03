// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, contentFrame } = require("./helpers");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2020 MVP", () => {
  test("2020 is live", async ({ page }) => {
    const fs = require("fs");
    const path = require("path");
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2020", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2020']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2020")).toHaveCount(0);
  });

  test("shell boots and home chip is Zoom Leave", async ({ page }) => {
    await enterYear(page, "2020");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2020"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2020"]')).toHaveAttribute("href", /zoom\/meeting/);
    await expect(frame.locator("#ott-guided-2020 ol > li")).toHaveCount(6);
  });

  test("Stay / empty never writes; mute + chat + Leave writes", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.reload();
    await page.locator("[data-official-trap]").click();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    const reqs = page.locator("[data-official-verb-host] [data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-need]").fill("brb leftover");
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt20-zoom")).toBeTruthy();
  });
});
