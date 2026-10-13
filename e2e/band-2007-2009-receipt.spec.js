// @ts-check
/**
 * Phase 4 lock for 2007–2009. Like receipts.
 * Status is "Saved." or "This browser blocked the save." and names no storage key.
 * Next stays hidden when the envelope is toy. The 288-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

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

function nextFor(page, key) {
  return page.locator('[data-next-flow][data-next-when-key="' + key + '"]');
}

function twStatus(page) {
  return page.locator("[data-official-status]").first();
}

function likeStatus(page) {
  return page.locator("[data-official-status], [data-lk09-status]").first();
}

async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2007-2009 phase 4 receipt", () => {
  test("Like official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2009/sites/facebook/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt09-like"));
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt09-like")).toBeHidden();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt09-like"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt09-like")).kind).toBe("official");
    await expect(likeStatus(page)).toHaveText("Saved.");
    await expect(likeStatus(page)).not.toContainText(/itt09-/);
    await expect(nextFor(page, "itt09-like")).toBeVisible();
  });
});
