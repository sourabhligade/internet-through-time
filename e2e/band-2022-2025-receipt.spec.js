// @ts-check
/**
 * Phase 4 lock for 2022–2025. ChatGPT status is Saved. with no key.
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

function nextFor(page, key) {
  return page.locator('[data-next-flow][data-next-when-key="' + key + '"]');
}

async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2022-2025 phase 4 receipt", () => {
  test("ChatGPT official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt22-chatgpt"));
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt22-chatgpt")).toBeHidden();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt22-chatgpt"), { timeout: 8000 }).toBeTruthy();
    await expect(page.locator("[data-official-status]").first()).toHaveText("Saved.");
    await expect(page.locator("[data-official-status]").first()).not.toContainText(/itt22-/);
    await expect(nextFor(page, "itt22-chatgpt")).toBeVisible();
  });

  test("ChatGPT toy envelope keeps Next hidden", async ({ page }) => {
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt22-chatgpt",
        JSON.stringify({ v: 1, year: "2022", key: "itt22-chatgpt", kind: "toy", real: true, ts: 1 })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt22-chatgpt")).toBeHidden();
  });
});
