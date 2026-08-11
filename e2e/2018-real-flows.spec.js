// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks?: string[] }} spec
 */
async function assertBlockedThenWrites(page, spec) {
  await page.goto(`/years/2018/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await page
    .waitForFunction(
      () => {
        const d = document.documentElement;
        return (
          d.getAttribute("data-itt-feat-year2018extras") === "1" ||
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

test.describe("2018 REAL flows", () => {
  test("GDPR Manage page itself writes after three rights checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/gdpr/manage.html",
      key: "itt18-gdpr",
      save: "[data-gdpr-save]",
      checks: ["[data-gdpr-art15]", "[data-gdpr-art17]", "[data-gdpr-date]"],
    });
  });

  test("GDPR Accept All does not write; rights three checks write itt18-gdpr", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-gdpr"));
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("[data-gdpr-accept-all]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt18-gdpr"))).toBeFalsy();
    await assertBlockedThenWrites(page, {
      path: "sites/gdpr/rights.html",
      key: "itt18-gdpr",
      save: "[data-gdpr-save]",
      checks: ["[data-gdpr-art15]", "[data-gdpr-art17]", "[data-gdpr-date]"],
    });
  });

  test("Trust three checks write itt18-ca", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/trust/index.html",
      key: "itt18-ca",
      save: "[data-ca-save]",
      checks: ["[data-ca-quiz]", "[data-ca-press]", "[data-ca-hearing]"],
    });
  });

  test("Spectre two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/spectre/index.html",
      key: "itt18-spectre",
      save: "[data-sp-save]",
      checks: ["[data-sp-date]", "[data-sp-no-payload]"],
    });
  });

  test("HomePod $349 + Feb 9", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/homepod/index.html",
      key: "itt18-homepod",
      save: "[data-hp-save]",
      checks: ["[data-hp-price]", "[data-hp-date]"],
    });
  });

  test("Chrome 68 two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/chrome/not-secure.html",
      key: "itt18-chrome68",
      save: "[data-c68-save]",
      checks: ["[data-c68-date]", "[data-c68-http]"],
    });
  });

  test("Win10 still mass + ended 2016", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/windows10/index.html",
      key: "itt18-win10",
      save: "[data-win10-save]",
      checks: ["[data-win10-mass]", "[data-win10-ended-2016]"],
    });
  });

  test("IGTV three checks", async ({ page }) => {
    await page.goto("/years/2018/sites/instagram/igtv.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt18-igtv");
      localStorage.setItem(
        "itt18-gdpr",
        JSON.stringify({ multiStep: true, real: true, year: "2018", path: "manage", ts: Date.now() })
      );
    });
    await page.reload();
    await assertBlockedThenWrites(page, {
      path: "sites/instagram/igtv.html",
      key: "itt18-igtv",
      save: "[data-igtv-save]",
      checks: ["[data-igtv-date]", "[data-igtv-not-reels]", "[data-igtv-length]"],
    });
  });

  test("Chrome habit three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/chrome/index.html",
      key: "itt18-chrome",
      save: "[data-chrome18-save]",
      checks: ["[data-chrome18-habit]", "[data-chrome18-edge]", "[data-chrome18-notnew]"],
    });
  });

  test("About thesis two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "pages/about.html",
      key: "itt18-thesis-ack",
      save: "[data-itt-real-save]",
      checks: ["[data-req]"],
    });
  });

  test("TikTok merge two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/tiktok/index.html",
      key: "itt18-tiktok-merge",
      save: "[data-tt-save]",
      checks: ["[data-tt-merge]", "[data-tt-not-reels]"],
    });
  });

  test("neighbor itt17-faceid untouched", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/rights.html");
    await page.evaluate(() => {
      localStorage.setItem("itt17-faceid", JSON.stringify({ year: "2017", keep: true }));
      localStorage.removeItem("itt18-gdpr");
    });
    await page.reload();
    await page.locator("[data-gdpr-art15]").check();
    await page.locator("[data-gdpr-art17]").check();
    await page.locator("[data-gdpr-date]").check();
    await page.locator("[data-gdpr-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-gdpr"))).toBeTruthy();
    const face = await page.evaluate(() => localStorage.getItem("itt17-faceid"));
    expect(face).toMatch(/2017/);
  });
});
