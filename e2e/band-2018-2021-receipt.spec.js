// @ts-check
/**
 * Phase 4 lock for 2018–2021. Zoom and ATT status is Saved. with no key.
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

test.describe("2018-2021 phase 4 receipt", () => {
  test("Zoom official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt20-zoom")).toBeHidden();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt20-zoom"), { timeout: 8000 }).toBeTruthy();
    await expect(page.locator("[data-official-status]").first()).toHaveText("Saved.");
    await expect(page.locator("[data-official-status]").first()).not.toContainText(/itt20-/);
    await expect(nextFor(page, "itt20-zoom")).toBeVisible();
  });

  test("Zoom toy envelope keeps Next hidden", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt20-zoom",
        JSON.stringify({ v: 1, year: "2020", key: "itt20-zoom", kind: "toy", real: true, ts: 1 })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt20-zoom")).toBeHidden();
  });
});
