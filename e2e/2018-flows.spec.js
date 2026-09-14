// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2018 flows", () => {
  test("2018 is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".year-card.available.y2018")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2018")).toHaveCount(0);
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator("#ott-guided-2018 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2018"]')).toBeVisible();
  });

  test("star Accept All never writes; Manage + Save writes itt18-gdpr", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-gdpr"));
    await page.reload();
    await page.locator("[data-gdpr-accept-all]").click();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
    await page.locator("[data-gdpr-manage]").click();
    await page.locator("[data-gdpr-save]").click();
    await expect.poll(() => getKey(page, "itt18-gdpr")).toBeTruthy();
  });

  test("TikTok FYP empty never writes; two taps + Learn writes", async ({ page }) => {
    await page.goto("/years/2018/sites/tiktok/fyp.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt18-tiktok-fyp");
      localStorage.removeItem("itt18-gdpr");
    });
    await page.reload();
    await page.locator("[data-fyp-learn]").click();
    expect(await getKey(page, "itt18-tiktok-fyp")).toBeFalsy();
    await page.locator('[data-fyp-tap="a"]').click();
    await page.locator('[data-fyp-tap="b"]').click();
    await page.locator("[data-fyp-learn]").click();
    await expect.poll(() => getKey(page, "itt18-tiktok-fyp")).toBeTruthy();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
  });

  test("official dests exist and leftover-2× never writes gold", async ({ page }) => {
    const dests = [
      "sites/trust/index.html",
      "sites/instagram/igtv.html",
      "sites/chrome/not-secure.html",
      "sites/homepod/index.html",
      "sites/spectre/index.html",
      "sites/fortnite/switch.html",
      "sites/github/microsoft.html",
      "sites/playable/game.html",
    ];
    for (const dest of dests) {
      const res = await page.request.get("/years/2018/" + dest);
      expect(res.status(), dest).toBeLessThan(400);
    }
    await page.goto("/years/2018/sites/trust/index.html");
    await expect(page.locator("[data-lo-panel]")).toHaveCount(0);
    await page.evaluate(() => {
      localStorage.removeItem("itt18-gdpr");
      localStorage.removeItem("itt18-hear-lx");
    });
    await page.locator("[data-hear-sit]").click();
    expect(await getKey(page, "itt18-hear-lx")).toBeFalsy();
    expect(await getKey(page, "itt18-gdpr")).toBeFalsy();
  });

  test("official 10 dests write leftover keys, never GDPR gold", async ({ page }) => {
    const rows = [
      { path: "/years/2018/sites/instagram/igtv.html", empty: async (p) => p.locator("[data-igtv-post]").click(), fill: async (p) => { await p.fill("[data-igtv-title]", "episode"); await p.locator("[data-igtv-post]").click(); }, key: "itt18-igtv" },
      { path: "/years/2018/sites/trust/index.html", empty: async (p) => {}, fill: async (p) => p.locator("[data-hear-sit]").click(), key: "itt18-hearing" },
      { path: "/years/2018/sites/chrome/not-secure.html", empty: async (p) => {}, fill: async (p) => p.locator("[data-ns-ack]").click(), key: "itt18-not-secure" },
      { path: "/years/2018/sites/homepod/index.html", empty: async (p) => {}, fill: async (p) => p.locator("[data-hp-reserve]").click(), key: "itt18-homepod" },
      { path: "/years/2018/sites/spectre/index.html", empty: async (p) => {}, fill: async (p) => p.locator("[data-sp-ack]").click(), key: "itt18-spectre" },
      { path: "/years/2018/sites/fortnite/switch.html", empty: async (p) => {}, fill: async (p) => p.locator("[data-fns-drop]").click(), key: "itt18-fn-switch" },
      { path: "/years/2018/sites/github/microsoft.html", empty: async (p) => {}, fill: async (p) => p.locator("[data-gh-ack]").click(), key: "itt18-github" },
    ];
    for (const row of rows) {
      await page.goto(row.path);
      await page.evaluate((k) => {
        localStorage.removeItem(k);
        localStorage.removeItem("itt18-gdpr");
      }, row.key);
      await page.reload();
      await page.waitForTimeout(250);
      await row.empty(page);
      if (row.key === "itt18-igtv") {
        expect(await getKey(page, row.key), row.key + " empty").toBeFalsy();
      }
      await row.fill(page);
      await expect.poll(() => getKey(page, row.key), { timeout: 8000 }).toBeTruthy();
      expect(await getKey(page, "itt18-gdpr"), row.key + " star").toBeFalsy();
    }
  });
});
