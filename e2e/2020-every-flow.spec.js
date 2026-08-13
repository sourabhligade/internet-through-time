// @ts-check
/**
 * 2020 — every page 200 + every machine edge that the other specs leave open.
 * Incomplete never writes. Join is not save. Residual never writes gold.
 */
const { test, expect } = require("@playwright/test");

const PAGES = [
  "pages/home.html",
  "pages/about.html",
  "pages/map.html",
  "pages/whats-new.html",
  "pages/cool.html",
  "pages/error/404.html",
  "pages/error/unreachable.html",
  "sites/zoom/index.html",
  "sites/zoom/join.html",
  "sites/zoom/meeting.html",
  "sites/zoom/recap.html",
  "sites/zoom/about.html",
  "sites/instagram/reels.html",
  "sites/instagram/stories.html",
  "sites/instagram/igtv.html",
  "sites/ccpa/index.html",
  "sites/shop/index.html",
  "sites/flash/eol.html",
  "sites/edge/index.html",
  "sites/acnh/island.html",
  "sites/fortnite/astronomical.html",
  "sites/meet/index.html",
  "sites/hbomax/index.html",
  "sites/tiktok/eo.html",
  "sites/tiktok/fyp.html",
  "sites/epic/liberty.html",
  "sites/iphone/12.html",
  "sites/iphone/faceid.html",
  "sites/apple/m1.html",
  "sites/exposure/index.html",
  "sites/chrome/index.html",
  "sites/windows10/index.html",
  "sites/quibi/index.html",
  "sites/twitter/fleets.html",
  "sites/twitter/280.html",
  "sites/gdpr/residual.html",
  "sites/disneyplus/residual.html",
  "sites/vine/gone.html",
  "sites/playable/index.html",
  "sites/playable/game.html",
  "sites/mixer/index.html",
  "sites/peacock/index.html",
  "sites/ps5/index.html",
  "sites/openai/gpt3.html",
  "sites/youtube/shorts.html",
  "sites/quest2/index.html",
  "sites/ios14/index.html",
  "sites/iowa/index.html",
  "sites/twitter/hack.html",
  "sites/clubhouse/index.html",
  "sites/schrems/index.html",
];

const GOLD = [
  "itt20-zoom",
  "itt20-reels",
  "itt20-ccpa-dns",
  "itt20-flash",
  "itt20-edge",
  "itt20-chrome",
  "itt20-win10",
  "itt20-acnh",
  "itt20-astro",
  "itt20-meet",
  "itt20-hbomax",
  "itt20-tiktok-eo",
  "itt20-epic",
  "itt20-iphone12",
  "itt20-m1",
  "itt20-gaen",
  "itt20-quibi",
  "itt20-fleets",
  "itt20-game-among",
  "itt20-mixer",
  "itt20-peacock",
  "itt20-ps5",
  "itt20-gpt3",
  "itt20-shorts",
  "itt20-quest2",
  "itt20-ios14",
  "itt20-iowa",
  "itt20-tw-hack",
  "itt20-clubhouse",
  "itt20-schrems",
];

/**
 * @param {import("@playwright/test").Page} page
 */
async function waitExtras(page) {
  await page
    .waitForFunction(
      () => document.documentElement.getAttribute("data-itt-feat-year2020extras") === "1",
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function clearGold(page) {
  await page.evaluate((keys) => {
    keys.forEach((k) => localStorage.removeItem(k));
    sessionStorage.removeItem("itt20-zoom-draft");
  }, GOLD);
}

test.describe("2020 leftover calendar chips", () => {
  test("home/about/whats-new name C1–C4 and do not add a 7th guided item", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("#ott-guided-2020 ol li")).toHaveCount(6);
    await expect(page.locator("body")).toContainText(/2 billion/i);
    await expect(page.locator("body")).toContainText(/WWDC/i);
    await expect(page.locator("body")).toContainText(/Fall Guys/i);
    await expect(page.locator("body")).toContainText(/15\.8M/);
    await expect(page.locator("body")).toContainText(/not the year game/i);
    await expect(page.locator("a[href*='apple/m1']").first()).toBeVisible();
    await expect(page.locator("a[href*='playable/game']").first()).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
    expect(await page.evaluate(() => localStorage.getItem("itt20-reels"))).toBeFalsy();
    await page.goto("/years/2020/pages/about.html");
    await expect(page.locator("body")).toContainText(/2 billion/i);
    await expect(page.locator("body")).toContainText(/not a dashboard/i);
    await page.goto("/years/2020/pages/whats-new.html");
    await expect(page.locator("body")).toContainText(/WWDC/i);
    await expect(page.locator("body")).toContainText(/15\.8M/);
  });
});

test.describe("2020 every page is live", () => {
  test("all 51 HTML rooms return 200 and stay year-true", async ({ page }) => {
    expect(PAGES.length).toBe(51);
    for (const rel of PAGES) {
      const res = await page.goto("/years/2020/" + rel);
      expect(res && res.ok(), rel).toBeTruthy();
      await expect(page.locator("html"), rel).toHaveAttribute("data-itt-year", "2020");
    }
  });
});

test.describe("2020 Zoom edges the gold path leaves open", () => {
  test("waiting room without a draft does not admit", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/join.html");
    await page.evaluate(() => {
      sessionStorage.removeItem("itt20-zoom-draft");
      localStorage.removeItem("itt20-zoom");
    });
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-admit]").click();
    await page.waitForTimeout(200);
    expect(page.url()).toMatch(/join\.html/);
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
  });

  test("meeting without a draft cannot leave into recap", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await page.evaluate(() => {
      sessionStorage.removeItem("itt20-zoom-draft");
      localStorage.removeItem("itt20-zoom");
    });
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-leave]").click();
    await page.waitForTimeout(200);
    expect(page.url()).toMatch(/meeting\.html/);
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
  });

  test("recap without a meeting draft does not write", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/recap.html");
    await page.evaluate(() => {
      sessionStorage.removeItem("itt20-zoom-draft");
      localStorage.removeItem("itt20-zoom");
    });
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-zoom-part]").check();
    await page.locator("[data-zoom-not-live]").check();
    await page.locator("[data-zoom-save]").click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
  });

  test("empty chat does not unlock leave", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt20-zoom");
      sessionStorage.removeItem("itt20-zoom-draft");
    });
    await page.reload();
    await page.locator("#itt20-code").fill("555666");
    await page.locator("[data-zoom-join]").click();
    await page.waitForURL(/join\.html/);
    await page.locator("[data-admit]").click();
    await page.waitForURL(/meeting\.html/);
    await page.locator("[data-chat]").evaluate((f) => f.requestSubmit());
    await page.locator("[data-leave]").click();
    await page.waitForTimeout(200);
    expect(page.url()).toMatch(/meeting\.html/);
    expect(await page.evaluate(() => localStorage.getItem("itt20-zoom"))).toBeFalsy();
  });

  test("video toggle persists across meeting reload", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => sessionStorage.removeItem("itt20-zoom-draft"));
    await page.reload();
    await page.locator("#itt20-code").fill("333444");
    await page.locator("[data-zoom-join]").click();
    await page.waitForURL(/join\.html/);
    await page.locator("[data-admit]").click();
    await page.waitForURL(/meeting\.html/);
    await expect(page.locator("[data-video]")).toHaveAttribute("aria-pressed", "false");
    await page.locator("[data-video]").click();
    await expect(page.locator("[data-video]")).toHaveAttribute("aria-pressed", "true");
    await page.reload();
    await expect(page.locator("[data-video]")).toHaveAttribute("aria-pressed", "true");
  });

  test("mute-all remutes self after unmute", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/index.html");
    await page.evaluate(() => sessionStorage.removeItem("itt20-zoom-draft"));
    await page.reload();
    await page.locator("#itt20-code").fill("222333");
    await page.locator("[data-zoom-join]").click();
    await page.waitForURL(/join\.html/);
    await page.locator("[data-admit]").click();
    await page.waitForURL(/meeting\.html/);
    await page.locator("[data-mute]").click();
    await expect(page.locator("[data-mute]")).toHaveAttribute("aria-pressed", "false");
    await page.locator("[data-mute-all]").click();
    await expect(page.locator("[data-mute]")).toHaveAttribute("aria-pressed", "true");
  });

  test("about Zoom is participants not unique users", async ({ page }) => {
    const res = await page.goto("/years/2020/sites/zoom/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText(/participants/);
    await expect(page.locator("body")).toContainText(/not DAU/i);
  });
});

test.describe("2020 Reels / CCPA / shop edges", () => {
  test("Reels 15s without honesty checks does not write", async ({ page }) => {
    await page.goto("/years/2020/sites/instagram/reels.html");
    await page.evaluate(() => localStorage.removeItem("itt20-reels"));
    await page.reload();
    await waitExtras(page);
    await page.locator("[data-reel-record]").click();
    await page.waitForTimeout(1600);
    await page.locator("[data-reel-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt20-reels"))).toBeFalsy();
  });

  test("shop ad is visible until CCPA writes, then stays hidden on reload", async ({ page }) => {
    await page.goto("/years/2020/sites/shop/index.html");
    await page.evaluate(() => localStorage.removeItem("itt20-ccpa-dns"));
    await page.reload();
    await waitExtras(page);
    await expect(page.locator(".itt20-ad-slot")).toBeVisible();
    await page.goto("/years/2020/sites/ccpa/index.html");
    await waitExtras(page);
    await page.locator("[data-ccpa-live]").check();
    await page.locator("[data-ccpa-not-gdpr]").check();
    await page.locator("[data-dns]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-ccpa-dns"))).toBeTruthy();
    await page.goto("/years/2020/sites/shop/index.html");
    await waitExtras(page);
    await expect(page.locator(".itt20-ad-slot")).toBeHidden();
    await page.reload();
    await waitExtras(page);
    await expect(page.locator(".itt20-ad-slot")).toBeHidden();
  });
});

test.describe("2020 residual + playable + map", () => {
  test("residual rooms are year-wrong on purpose and write no gold", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await clearGold(page);
    const residual = [
      { path: "sites/disneyplus/residual.html", copy: /2019/ },
      { path: "sites/gdpr/residual.html", copy: /2018/ },
      { path: "sites/instagram/stories.html", copy: /2016/ },
      { path: "sites/iphone/faceid.html", copy: /2017/ },
      { path: "sites/twitter/280.html", copy: /2017/ },
      { path: "sites/vine/gone.html", copy: /2017|gone/i },
      { path: "sites/tiktok/fyp.html", copy: /2018|residual/i },
      { path: "sites/instagram/igtv.html", copy: /2018|residual/i },
    ];
    for (const room of residual) {
      const res = await page.goto("/years/2020/" + room.path);
      expect(res && res.ok(), room.path).toBeTruthy();
      await expect(page.locator("body"), room.path).toContainText(room.copy);
    }
    const leftover = await page.evaluate((keys) => keys.filter((k) => localStorage.getItem(k)), GOLD);
    expect(leftover, "residual wrote gold: " + leftover.join(",")).toEqual([]);
  });

  test("playable toys boot and g=1/2/3 are 200", async ({ page }) => {
    const res = await page.goto("/years/2020/sites/playable/index.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("[data-year-playable]")).toBeVisible();
    for (const g of [1, 2, 3]) {
      const r = await page.goto("/years/2020/sites/playable/index.html?g=" + g);
      expect(r && r.ok(), "g=" + g).toBeTruthy();
      await expect(page.locator("[data-year-playable]")).toBeVisible();
    }
  });

  test("flow-map has 2020 branches including S15", async ({ page }) => {
    await page.goto("/years/2020/pages/map.html");
    await expect(page.locator("[data-itt-flow-map]")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("[data-itt-flow-map]")).toContainText(/You're muted|You.re muted/i);
    await expect(page.locator("[data-itt-flow-map]")).toContainText(/Short video/);
    await expect(page.locator("[data-itt-flow-map]")).toContainText(/P1 densify/);
    await expect(page.locator("[data-itt-flow-map]")).toContainText(/S15 densify/);
    await expect(page.locator("[data-itt-flow-map]")).toContainText(/Play \+ residual/i);
  });

  test("home one-thing is Zoom and every home chip is 200", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2020"]')).toHaveAttribute("href", /zoom/);
    const hrefs = await page.locator("a[href]").evaluateAll((els) =>
      els
        .map((a) => a.getAttribute("href") || "")
        .filter((h) => h && !h.startsWith("http") && !h.startsWith("#") && !h.startsWith("mailto:"))
    );
    expect(hrefs.length).toBeGreaterThan(15);
    for (const href of hrefs) {
      const url = new URL(href, "http://x/years/2020/pages/home.html").pathname;
      const res = await page.goto(url);
      expect(res && res.ok(), url).toBeTruthy();
    }
  });
});
