// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, contentFrame } = require("./helpers");

test.describe("2020 MVP", () => {
  test("shell boots and home chip is Zoom meeting", async ({ page }) => {
    await enterYear(page, "2020");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2020"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2020"]')).toHaveAttribute("href", /zoom\/meeting/);
    await expect(frame.locator("#ott-guided-2020 ol > li")).toHaveCount(6);
  });

  test("about dual-cite and bans", async ({ page }) => {
    await page.goto("/years/2020/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");
    await expect(page.locator("body")).toContainText("ends 2018");
    await expect(page.locator("body")).toContainText(/ITU/i);
    await expect(page.locator("body")).toContainText(/4\.1/);
    await expect(page.locator("body")).toContainText(/participants/i);
    await expect(page.locator("body")).toContainText(/10\.2/);
    await expect(page.locator("body")).toContainText(/ChatGPT/i);
  });

  test("Join never writes; mute + chat + leave writes", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.reload();
    await page.locator("[data-zoom-join]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.reload();
    await page.locator("[data-zoom-leave]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
    await page.locator("[data-zoom-req]").nth(0).check();
    await page.locator("[data-zoom-req]").nth(1).check();
    await page.locator("[data-zoom-mute]").click();
    await page.fill("[data-zoom-field]", "can you see my screen");
    await page.locator("[data-zoom-send]").click();
    await page.locator("[data-zoom-leave]").click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-zoom"))) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.participantsNotUsers).toBe(true);
    expect(await page.evaluate(() => localStorage.getItem("itt19-disneyplus"))).toBeFalsy();
    expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
  });
});
