// @ts-check
/**
 * Phase 4 lock for 2010–2013. Instagram Android and Vine receipts are Saved.
 * with no storage key. Next stays hidden on a toy envelope.
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

async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-req], [data-fb1b-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2010-2013 phase 4 receipt", () => {
  test("Instagram Android official finish says Saved. and shows Next", async ({ page }) => {
    await page.goto("/years/2012/sites/instagram/android.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt12-ig-android"));
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt12-ig-android")).toBeHidden();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt12-ig-android"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt12-ig-android")).kind).toBe("official");
    await expect(page.locator("[data-official-status]")).toHaveText("Saved.");
    await expect(page.locator("[data-official-status]")).not.toContainText(/itt12-/);
    await expect(nextFor(page, "itt12-ig-android")).toBeVisible();
  });

  test("Vine toy envelope keeps Next hidden", async ({ page }) => {
    await page.goto("/years/2013/sites/vine/record.html");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt13-vine-posts",
        JSON.stringify({ v: 1, year: "2013", key: "itt13-vine-posts", kind: "toy", real: true, ts: 1 })
      );
    });
    await page.reload();
    await verbReady(page);
    await expect(nextFor(page, "itt13-vine-posts")).toBeHidden();
    expect((await envelope(page, "itt13-vine-posts")).kind).toBe("toy");
  });
});
