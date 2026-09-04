// @ts-check
const { test, expect } = require("@playwright/test");

const { enterYear, goInFrame, waitForImmersion, contentFrame } = require("./helpers");

test.describe("1995 homestead live UX", () => {
  test("empty blocked; publish persists on my-homestead", async ({ page }) => {
    await enterYear(page, "1995");
    await page.evaluate(() => {
      localStorage.removeItem("itt95-homestead");
      localStorage.setItem("itt94-keep", "1");
      localStorage.setItem("itt96-keep", "1");
    });
    await goInFrame(page, "sites/geocities/homestead.html");
    const frame = contentFrame(page);
    await expect(frame.locator("form[data-homestead-form]")).toBeVisible({ timeout: 20000 });
    await waitForImmersion(page, "1995");
    await frame.locator("form[data-homestead-form] input[type='submit']").click({ force: true });
    expect(await page.evaluate(() => localStorage.getItem("itt95-homestead"))).toBeFalsy();
    await frame.locator('input[name="title"]').fill("Museum Hut");
    await frame.locator("form[data-homestead-form] input[type='submit']").click({ force: true });
    expect(await page.evaluate(() => localStorage.getItem("itt95-homestead"))).toBeFalsy();
    await frame.locator('textarea[name="about"]').fill("Free homepage residual.");
    await frame.locator("form[data-homestead-form] input[type='submit']").click({ force: true });
    await expect(frame.locator("[data-homestead-view]")).toContainText(/Museum Hut/i, { timeout: 15000 });
    const raw = await page.evaluate(() => localStorage.getItem("itt95-homestead") || "");
    expect(raw).toMatch(/multiStep/);
    expect(raw).toMatch(/"year":\s*"1995"/);
    await goInFrame(page, "sites/geocities/my-homestead.html");
    await expect(frame.locator("[data-homestead-view]")).toContainText(/Museum Hut/i);
    expect(await page.evaluate(() => localStorage.getItem("itt94-keep"))).toBe("1");
    expect(await page.evaluate(() => localStorage.getItem("itt96-keep"))).toBe("1");
  });
});
