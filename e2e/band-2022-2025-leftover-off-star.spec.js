// @ts-check
/**
 * Phase 5 lock for 2022–2025. ChatGPT has no leftover panel. A leftover save
 * must not stamp itt22-chatgpt. 2023–2025 stay absent.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

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

test.describe("2022-2025 phase 5 leftover off the star", () => {
  test("2023-2025 stay absent", () => {
    expect(fs.existsSync(path.join(__dirname, "../years/2023"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../years/2024"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../years/2025"))).toBe(false);
  });

  test("ChatGPT page leftover save does not stamp the star", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
    const gold = await page.locator("[data-itt-gold-lx], [data-lo-save]").count();
    expect(gold).toBe(0);
    expect(await raw(page, "itt22-chatgpt")).toBeNull();
  });
});
