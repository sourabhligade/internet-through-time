// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, contentFrame } = require("./helpers");

test.describe("2022 MVP", () => {
  test("shell boots and home chip is ChatGPT Send", async ({ page }) => {
    await enterYear(page, "2022");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2022"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2022"]')).toHaveAttribute("href", /chatgpt/);
    await expect(frame.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
    await expect(page.locator(".year-label")).toContainText(/Chrome habit/i);
    await expect(page.locator("body")).toContainText(/ChatGPT/i);
  });

  test("about dual-cite and bans", async ({ page }) => {
    await page.goto("/years/2022/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");
    await expect(page.locator("body")).toContainText("ends 2018");
    await expect(page.locator("body")).toContainText(/January/);
    await expect(page.locator("body")).toContainText("1,167,715,133");
    await expect(page.locator("body")).toContainText(/5\.3/);
    await expect(page.locator("body")).toContainText(/66/);
    await expect(page.locator("body")).toContainText(/not Plus/i);
    await expect(page.locator("body")).toContainText(/GPT-4/);
  });

  test("empty / Plus / GPT-4 never write; prompt + Send writes", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
    await page.reload();
    await page.locator("[data-gpt22-plus]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt"))).toBeFalsy();
    await page.locator("[data-gpt22-gpt4]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt"))).toBeFalsy();
    await page.locator("[data-gpt22-bing]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt"))).toBeFalsy();
    await page.locator("[data-gpt22-send]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt22-chatgpt"))).toBeFalsy();
    await page.fill("[data-gpt22-prompt]", "explain leftover");
    await page.locator("[data-gpt22-send]").click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem("itt22-chatgpt"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt22-chatgpt"))) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.sent).toBe(true);
    expect(blob.year).toBe("2022");
    expect(await page.evaluate(() => localStorage.getItem("itt21-att"))).toBeFalsy();
  });
});
