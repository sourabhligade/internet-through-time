// @ts-check
/**
 * Phase 2 lock for 2018–2021. Zoom Leave and Ask App Not to Track are
 * official-verb. 2018 and 2019 stay absent. The 40-page walk is phase 6.
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

test.describe("2018-2021 phase 2 one writer", () => {
  test("2018 and 2019 stay absent", () => {
    expect(fs.existsSync(path.join(__dirname, "../years/2018"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../years/2019"))).toBe(false);
  });

  test("Zoom empty leave writes nothing then a real Leave is official", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.locator("[data-zoom-leave]").click();
    expect(await raw(page, "itt20-zoom")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt20-zoom"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt20-zoom")).kind).toBe("official");
  });

  test("Ask App Not to Track empty writes nothing then a real save is official", async ({ page }) => {
    await page.goto("/years/2021/sites/att/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt21-att"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt21-att")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt21-att"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt21-att")).kind).toBe("official");
  });
});
