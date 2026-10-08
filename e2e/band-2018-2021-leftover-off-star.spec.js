// @ts-check
/**
 * Phase 5 lock for 2018–2021. Zoom has no leftover panel. A leftover save
 * must not stamp itt20-zoom.
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

test.describe("2018-2021 phase 5 leftover off the star", () => {
  test("Zoom page leftover save does not stamp the star", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    const gold = await page.locator("[data-itt-gold-lx], [data-lo-save]").count();
    expect(gold).toBe(0);
    expect(await raw(page, "itt20-zoom")).toBeNull();
  });
});
