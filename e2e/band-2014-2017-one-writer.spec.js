// @ts-check
/**
 * Phase 2 lock for 2014–2017. WhatsApp Install is official.
 * 2015 is omitted. 2017 stays absent. The 115-page walk is phase 6.
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

test.describe("2014-2017 phase 2 one writer", () => {
  test("2015 tree and 2017 stay absent", () => {
    expect(fs.existsSync(path.join(__dirname, "../years/2015"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../years/2017"))).toBe(false);
  });

  test("WhatsApp empty install writes nothing then a real install is official", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt14-wa-install"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt14-wa-install")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt14-wa-install"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt14-wa-install")).kind).toBe("official");
  });

  test("2015 omitted hash is not a door", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2015");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Periscope");
  });
});
