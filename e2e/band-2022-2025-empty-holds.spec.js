// @ts-check
/**
 * Phase 3 lock for 2022–2025. Empty ChatGPT send writes nothing.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function verbReady(page) {
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

test.describe("2022-2025 phase 3 empty holds", () => {
  test("ChatGPT empty send writes nothing", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt22-chatgpt")).toBeNull();
  });
});
