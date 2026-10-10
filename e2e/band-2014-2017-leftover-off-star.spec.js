// @ts-check
/**
 * Phase 5 lock for band 2014–2017. Filename stays with the band family.
 * Body locks 2014 WhatsApp gold-lx leftover off the star, and 2015 omitted
 * hash. 2017 is absent.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function envelope(page, key) {
  const text = await raw(page, key);
  return text ? JSON.parse(text) : null;
}

async function readyGold(page, year) {
  await page.waitForFunction(
    (y) => {
      const save = document.querySelector("[data-lo-save][data-lo-key='gold-lx']");
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails[y];
      return !!(save && save.getAttribute("data-lo-bound") === "1" && trails && trails.length && window.ITT.User);
    },
    year,
    { timeout: 20000 }
  );
}

async function finishGold(page) {
  const panel = page.locator("[data-itt-gold-lx]");
  await panel.locator("[data-lo-req]").nth(0).check();
  await panel.locator("[data-lo-req]").nth(1).check();
  await panel.locator("[data-lo-pick='keep']").click();
  await panel.locator("[data-lo-save]").click();
  return panel;
}

test.describe("2014-2017 phase 5 leftover off the star", () => {
  test("WhatsApp gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await readyGold(page, "2014");
    await page.evaluate(() => {
      localStorage.removeItem("itt14-wa-install");
      localStorage.removeItem("itt14-gold-lx");
    });
    await finishGold(page);
    await expect.poll(() => raw(page, "itt14-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt14-wa-install")).toBeNull();
    expect((await envelope(page, "itt14-gold-lx")).kind).toBe("leftover");
  });

  test("2015 omitted hash is not a door", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2015");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Periscope");
  });
});
