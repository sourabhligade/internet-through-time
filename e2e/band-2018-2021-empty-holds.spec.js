// @ts-check
/**
 * Phase 3 lock for 2018–2021. Empty Zoom leave and empty ATT write nothing.
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

test.describe("2018-2021 phase 3 empty holds", () => {
  test("Zoom empty Leave writes nothing", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.locator("[data-zoom-leave]").click();
    expect(await raw(page, "itt20-zoom")).toBeNull();
  });

  test("Ask App Not to Track empty click writes nothing", async ({ page }) => {
    await page.goto("/years/2021/sites/att/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt21-att"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt21-att")).toBeNull();
  });
});
