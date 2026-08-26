// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, contentFrame } = require("./helpers");

test.describe("2021 MVP", () => {
  test("shell boots and home chip is ATT Ask", async ({ page }) => {
    await enterYear(page, "2021");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2021"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2021"]')).toHaveAttribute("href", /att/);
    await expect(frame.locator("#ott-guided-2021 ol > li")).toHaveCount(6);
  });

  test("about dual-cite and bans", async ({ page }) => {
    await page.goto("/years/2021/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");
    await expect(page.locator("body")).toContainText("ends 2018");
    await expect(page.locator("body")).toContainText(/ITU/i);
    await expect(page.locator("body")).toContainText(/4\.9/);
    await expect(page.locator("body")).toContainText(/1,197,982,359/);
    await expect(page.locator("body")).toContainText(/ChatGPT/i);
    await expect(page.locator("body")).toContainText(/90/);
  });

  test("Allow never writes; Ask + two ticks writes", async ({ page }) => {
    await page.goto("/years/2021/sites/att/index.html");
    await page.evaluate(() => localStorage.removeItem("itt21-att"));
    await page.reload();
    await page.locator("[data-att-allow]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
    await page.locator("[data-att-ask]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
    await page.locator("[data-att-req]").nth(0).check();
    await page.locator("[data-att-req]").nth(1).check();
    await page.locator("[data-att-ask]").click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem("itt21-att"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt21-att"))) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.asked).toBe(true);
    expect(blob.allow).toBe(false);
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
    expect(await page.evaluate(() => localStorage.getItem("itt22-chat"))).toBeFalsy();
  });
});
