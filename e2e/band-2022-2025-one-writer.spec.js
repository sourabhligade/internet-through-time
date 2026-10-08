// @ts-check
/**
 * Phase 2 lock for 2022–2025. ChatGPT Send is official-verb. 2023–2025 stay
 * absent. The 29-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function envelope(page, key) {
  const text = await raw(page, key);
  return text ? JSON.parse(text) : null;
}

async function verbReady(page) {
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2022-2025 phase 2 one writer", () => {
  test("2023, 2024, and 2025 stay absent", () => {
    expect(fs.existsSync(path.join(__dirname, "../years/2023"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../years/2024"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../years/2025"))).toBe(false);
  });

  test("ChatGPT empty send writes nothing then a real send is official", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt22-chatgpt")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt22-chatgpt"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt22-chatgpt")).kind).toBe("official");
  });
});
