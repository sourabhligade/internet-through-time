// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks?: string[], fills?: [string, string][] }} spec
 */
async function assertBlockedThenWrites(page, spec) {
  await page.goto(`/years/2017/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await page
    .waitForFunction(
      () => {
        const d = document.documentElement;
        return (
          d.getAttribute("data-itt-feat-year2017extras") === "1" ||
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
  for (const [sel, val] of spec.fills || []) await page.fill(sel, val);
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

test.describe("2017 REAL flows", () => {
  test("Face ID incomplete does not write; three checks write itt17-faceid", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/iphone/x.html",
      key: "itt17-faceid",
      save: "[data-faceid-save]",
      checks: ["[data-faceid-no-home]", "[data-faceid-not-touch]", "[data-faceid-not-xs]"],
    });
  });

  test("Fortnite three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/fortnite/index.html",
      key: "itt17-fortnite",
      save: "[data-fn-save]",
      checks: ["[data-fn-date]", "[data-fn-free]", "[data-fn-no-art]"],
    });
  });

  test("Twitter 280 needs 141+ chars", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/twitter/280.html",
      key: "itt17-twitter280",
      save: "[data-tw280-save]",
      fills: [
        [
          "[data-tw280-text]",
          "This museum tweet is longer than one hundred and forty characters on purpose so last year’s wall would have failed it — keep typing until we clearly pass one-four-one.",
        ],
      ],
      checks: ["[data-tw280-date]", "[data-tw280-not-x]"],
    });
  });

  test("WannaCry two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/wannacry/index.html",
      key: "itt17-wannacry",
      save: "[data-wc-save]",
      checks: ["[data-wc-date]", "[data-wc-no-payload]"],
    });
  });

  test("Vine gone two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/vine/gone.html",
      key: "itt17-vine-gone",
      save: "[data-vine-gone-save]",
      checks: ["[data-vine-gone-date]", "[data-vine-gone-not-2016]"],
    });
  });

  test("Teams GA two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/teams/index.html",
      key: "itt17-teams-ga",
      save: "[data-teams-ga-save]",
      checks: ["[data-teams-ga-date]", "[data-teams-ga-not-preview]"],
    });
  });

  test("Equifax two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/equifax/index.html",
      key: "itt17-equifax",
      save: "[data-eq-save]",
      checks: ["[data-eq-date]", "[data-eq-no-ssn]"],
    });
  });

  test("Win10 still mass + ended 2016", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/windows10/index.html",
      key: "itt17-win10",
      save: "[data-win10-save]",
      checks: ["[data-win10-mass]", "[data-win10-ended-2016]"],
    });
  });

  test("Chrome habit + EdgeHTML", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/chrome/index.html",
      key: "itt17-chrome",
      save: "[data-chrome17-save]",
      checks: ["[data-chrome17-habit]", "[data-chrome17-edge]"],
    });
  });

  test("musical.ly acquire + not TikTok", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/musically/index.html",
      key: "itt17-musical",
      save: "[data-musical-save]",
      checks: ["[data-musical-date]", "[data-musical-not-tiktok]"],
    });
  });

  test("Switch Mar 3 + not Fortnite yet", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/switch/index.html",
      key: "itt17-switch",
      save: "[data-switch-save]",
      checks: ["[data-switch-date]", "[data-switch-not-fn]"],
    });
  });

  test("Bitcoin Dec ~$20k + not winter", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/bitcoin/index.html",
      key: "itt17-bitcoin",
      save: "[data-btc-save]",
      checks: ["[data-btc-ath]", "[data-btc-not-winter]"],
    });
  });

  test("Yahoo 3B is 2017 news", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/yahoo-3b/index.html",
      key: "itt17-yahoo-3b",
      save: "[data-yh3b-save]",
      checks: ["[data-yh3b-date]", "[data-yh3b-not-2016]"],
    });
  });

  test("Title II repeal Dec 14", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/netneutrality/index.html",
      key: "itt17-netneutrality",
      save: "[data-nn-save]",
      checks: ["[data-nn-date]", "[data-nn-title2]"],
    });
  });

  test("Snap redesign Nov hated", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/snapchat/redesign.html",
      key: "itt17-snap-redesign",
      save: "[data-snap-save]",
      checks: ["[data-snap-date]", "[data-snap-hated]"],
    });
  });

  test("Discord Nitro Jan 23 + no pay", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/discord/nitro.html",
      key: "itt17-nitro",
      save: "[data-nitro-save]",
      checks: ["[data-nitro-date]", "[data-nitro-not-store]"],
    });
  });

  test("Facebook 2B + not Meta", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/facebook/2b.html",
      key: "itt17-fb-2b",
      save: "[data-fb2b-save]",
      checks: ["[data-fb2b-date]", "[data-fb2b-not-meta]"],
    });
  });

  test("Twitter 280 checks without 141 chars never write", async ({ page }) => {
    await page.goto("/years/2017/sites/twitter/280.html");
    await page.evaluate(() => localStorage.removeItem("itt17-twitter280"));
    await page.reload();
    await page.locator("[data-tw280-text]").fill("too short");
    await page.locator("[data-tw280-date]").check();
    await page.locator("[data-tw280-not-x]").check();
    await page.locator("[data-tw280-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt17-twitter280"))).toBeFalsy();
  });

  test("About thesis two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "pages/about.html",
      key: "itt17-thesis-ack",
      save: "[data-itt-real-save]",
      checks: ["[data-req]"],
    });
  });

  test("Face ID complete does not touch itt16-*", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await page.evaluate(() => {
      localStorage.setItem("itt16-ig-stories", '{"keep":1}');
      localStorage.removeItem("itt17-faceid");
    });
    await page.locator("[data-faceid-no-home]").check();
    await page.locator("[data-faceid-not-touch]").check();
    await page.locator("[data-faceid-not-xs]").check();
    await page.locator("[data-faceid-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt17-faceid"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt16-ig-stories"))).toBe('{"keep":1}');
  });

  const residuals = [
    { path: "sites/facebook/index.html", key: "itt17-fb-feed" },
    { path: "sites/twitter/index.html", key: "itt17-tw-feed" },
    { path: "sites/iphone/index.html", key: "itt17-iphone-8" },
    { path: "sites/instagram/stories.html", key: "itt17-ig-stories-res" },
    { path: "sites/airpods/index.html", key: "itt17-airpods-res" },
    { path: "sites/whatsapp/e2e.html", key: "itt17-wa-e2e-res" },
    { path: "sites/chrome/about.html", key: "itt17-chrome-about" },
  ];

  for (const room of residuals) {
    test(`residual REAL ${room.key}`, async ({ page }) => {
      await assertBlockedThenWrites(page, {
        path: room.path,
        key: room.key,
        save: "[data-itt-real-save]",
        checks: ["[data-req]"],
      });
    });
  }
});
