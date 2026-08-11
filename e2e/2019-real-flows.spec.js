// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks?: string[] }} spec
 */
async function assertBlockedThenWrites(page, spec) {
  await page.goto(`/years/2019/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await page
    .waitForFunction(
      () => {
        const d = document.documentElement;
        return (
          d.getAttribute("data-itt-feat-year2019extras") === "1" ||
          d.getAttribute("data-itt-real-flow") === "1" ||
          !!document.querySelector("[data-itt-real-save][data-itt-real-bound='1']")
        );
      },
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.locator(spec.save).click();
  await page.waitForTimeout(120);
  expect(await page.evaluate((k) => localStorage.getItem(k), spec.key), spec.key + " incomplete").toBeFalsy();
  for (const sel of spec.checks || []) {
    const loc = page.locator(sel);
    const n = await loc.count();
    if (n > 1) {
      for (let i = 0; i < n; i++) await loc.nth(i).check();
    } else {
      await loc.first().check();
    }
  }
  await page.locator(spec.save).click();
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeTruthy();
}

test.describe("2019 REAL flows", () => {
  test("Disney+ trial does not write; profiles + continue write itt19-disneyplus", async ({ page }) => {
    await page.goto("/years/2019/sites/disneyplus/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-disneyplus"));
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("[data-dplus-trial]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt19-disneyplus"))).toBeFalsy();
    await page.locator('[data-profile="adult-1"]').click();
    await page.locator('[data-title="mando"]').click();
    await page.locator("[data-add-continue]").click();
    await page.locator('[data-title="lion-king"]').click();
    await page.locator("[data-add-continue]").click();
    await page.locator("[data-dplus-date]").check();
    await page.locator("[data-dplus-not-trial]").check();
    await page.locator("[data-dplus-kids]").check();
    await page.locator("[data-dplus-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt19-disneyplus"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt19-disneyplus"))) || "{}");
    expect(blob.multiStep).toBe(true);
    expect(blob.real).toBe(true);
    expect(blob.year).toBe("2019");
    expect(blob.continueIds["adult-1"].length).toBeGreaterThanOrEqual(2);
    expect(blob.kidsBlocked).toBe(true);
  });

  test("kids hides mando", async ({ page }) => {
    await page.goto("/years/2019/sites/disneyplus/index.html");
    await page.locator('[data-profile="kids-1"]').click();
    await expect(page.locator('[data-title="mando"]')).toBeHidden();
    await expect(page.locator('[data-title="nemo"]')).toBeVisible();
  });

  test("About thesis two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "pages/about.html",
      key: "itt19-thesis-ack",
      save: "[data-itt-real-save]",
      checks: ["[data-req]"],
    });
  });

  test("Apple TV+ three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/appletv/index.html",
      key: "itt19-appletv",
      save: "[data-atv-save]",
      checks: ["[data-atv-price]", "[data-atv-date]", "[data-atv-not-dplus]"],
    });
  });

  test("G+ funeral three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/googleplus/funeral.html",
      key: "itt19-gplus",
      save: "[data-gp-save]",
      checks: ["[data-gp-dies]", "[data-gp-date]", "[data-gp-announce]"],
    });
  });

  test("FTC three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/ftc/index.html",
      key: "itt19-ftc",
      save: "[data-ftc-save]",
      checks: ["[data-ftc-amount]", "[data-ftc-date]", "[data-ftc-no-target]"],
    });
  });

  test("CNIL three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/cnil/index.html",
      key: "itt19-cnil",
      save: "[data-cnil-save]",
      checks: ["[data-cnil-amount]", "[data-cnil-date]", "[data-cnil-gdpr-2018]"],
    });
  });

  test("Marshmello two beats + checks", async ({ page }) => {
    await page.goto("/years/2019/sites/fortnite/marshmello.html");
    await page.evaluate(() => localStorage.removeItem("itt19-marshmello"));
    await page.reload();
    await page.waitForTimeout(300);
    await page.locator("[data-mello-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt19-marshmello"))).toBeFalsy();
    await page.locator('[data-mello-beat="1"]').click();
    await page.locator('[data-mello-beat="2"]').click();
    await page.locator("[data-mello-date]").check();
    await page.locator("[data-mello-not-travis]").check();
    await page.locator("[data-mello-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt19-marshmello"))).toBeTruthy();
  });

  test("neighbor itt18-gdpr untouched", async ({ page }) => {
    await page.goto("/years/2019/sites/disneyplus/index.html");
    await page.evaluate(() => {
      localStorage.setItem("itt18-gdpr", JSON.stringify({ real: true, keep: 1 }));
    });
    await page.locator('[data-profile="adult-1"]').click();
    await page.locator('[data-title="mando"]').click();
    await page.locator("[data-add-continue]").click();
    await page.locator('[data-title="lion-king"]').click();
    await page.locator("[data-add-continue]").click();
    await page.locator("[data-dplus-date]").check();
    await page.locator("[data-dplus-not-trial]").check();
    await page.locator("[data-dplus-kids]").check();
    await page.locator("[data-dplus-save]").click();
    const leftover = await page.evaluate(() => localStorage.getItem("itt18-gdpr"));
    expect(leftover).toContain("keep");
  });
});
