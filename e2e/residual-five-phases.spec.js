// @ts-check
/**
 * Residual five-phase integration smoke — trails · densify gems · forest · about axis.
 * @see docs/RESEARCH-RESIDUAL-FLOW-IMPROVEMENTS-IMPLEMENTATION-PHASES-2026-08-07.md
 */
const { test, expect } = require("@playwright/test");

test.describe("Residual Phase 2 — dual trails", () => {
  /** @type {{ id: string, a: string, b?: string }[]} */
  const TRAILS = [
    { id: "mapquest-maps", a: "/years/2000/sites/mapquest/index.html", b: "/years/2005/sites/maps/index.html" },
    { id: "pb-myspace", a: "/years/2003/sites/photobucket/index.html", b: "/years/2003/sites/myspace/index.html" },
    { id: "imgur-reddit", a: "/years/2010/sites/imgur/index.html", b: "/years/2010/sites/reddit/index.html" },
    { id: "aim-icq", a: "/years/1999/sites/aim/index.html", b: "/years/1997/sites/icq/index.html" },
    { id: "github-so", a: "/years/2008/sites/github/index.html", b: "/years/2009/sites/stackoverflow/index.html" },
    { id: "pandora-spotify", a: "/years/2005/sites/pandora/index.html", b: "/years/2011/sites/spotify/index.html" },
    { id: "msn-mail", a: "/years/2001/sites/msn/index.html" },
  ];

  for (const tr of TRAILS) {
    test(`trail ${tr.id} visible`, async ({ page }) => {
      await page.goto(tr.a);
      await expect(page.locator(`[data-ott-trail="${tr.id}"]`).first()).toBeVisible({ timeout: 15000 });
      if (tr.b) {
        await page.goto(tr.b);
        await expect(page.locator(`[data-ott-trail="${tr.id}"]`).first()).toBeVisible({ timeout: 15000 });
      }
    });
  }

  test("home phase-2 trail chips on sample years", async ({ page }) => {
    for (const y of ["1999", "2000", "2003", "2005", "2008", "2010"]) {
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator(".itt-phase2-trails, [data-ott-one-thing]").first()).toBeVisible();
      await expect(page.locator("body")).toContainText(/Phase 2 trail|One-thing|MapQuest|AIM|Imgur|GitHub|Photobucket|Pandora|MSN/i);
    }
  });
});

test.describe("Residual Phase 2 — deepen multipage", () => {
  test("AIM profile · MSN wlive · Pandora player · 2013 Slack residual", async ({ page }) => {
    for (const path of [
      "/years/1999/sites/aim/profile.html",
      "/years/2001/sites/msn/wlive.html",
      "/years/2001/sites/msn/chat.html",
      "/years/2005/sites/pandora/player.html",
      "/years/2005/sites/pandora/genome.html",
      "/years/2013/sites/slack/channel.html",
      "/years/2013/sites/slack/workspace.html",
    ]) {
      await page.goto(path);
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("MapQuest directions densify has multi steps + print strip", async ({ page }) => {
    await page.goto("/years/2000/sites/mapquest/directions.html");
    await expect(page.locator("[data-ott-click]")).toHaveCount(await page.locator("[data-ott-click]").count());
    expect(await page.locator("[data-ott-click]").count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator("body")).toContainText(/turn-by-turn|print|MapQuest/i);
    await page.goto("/years/2000/sites/mapquest/print.html");
    await expect(page.locator(".print-strip").first()).toContainText(/Printable|print|MapQuest|Directions/i);
  });

  test("GitHub issue densify + SO vote/accept densify", async ({ page }) => {
    await page.goto("/years/2008/sites/github/issue.html");
    await expect(page.locator("body")).toContainText(/issue|GitHub|Close/i);
    await page.locator('[data-ott-click="close"]').click();
    await expect(page.locator("[data-gh-issue-status]")).toContainText(/close|residual/i);

    await page.goto("/years/2009/sites/stackoverflow/question.html");
    await expect(page.locator("[data-so-score]")).toBeVisible();
    await page.locator('[data-so-vote="up"]').click();
    await page.locator('[data-so-accept="a"]').click();
    await expect(page.locator("[data-so-status]")).toContainText(/Accept|Vote|residual/i);
  });

  test("MapQuest complete REAL still writes itt00-mapquest", async ({ page }) => {
    await page.goto("/years/2000/sites/mapquest/index.html");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt00-mapquest");
        localStorage.removeItem("itt00-mapquest-trip");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("#ott-field").first().fill("123 Main St");
    await page.locator("#mq-to").fill("456 Oak Ave");
    await page.locator('[data-ott-click="get-dir"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt00-mapquest")), { timeout: 8000 })
      .toBeTruthy();
    await page.goto("/years/2000/sites/mapquest/directions.html");
    await expect(page.locator("[data-mq-steps]")).toContainText(/123 Main St|Oak Ave|Arrive/i);
  });
});


test.describe("Residual Phase 4 — culture densify gems", () => {
  const gems = [
    { path: "/years/2010/sites/cablegate/index.html", key: "itt10-cablegate" },
    { path: "/years/2010/sites/groupon/index.html", key: "itt10-groupon" },
    { path: "/years/2010/sites/digg/v4.html", key: "itt10-digg-v4" },
  ];

  async function completeGem(page, path) {
    if (path.includes("cablegate")) {
      await page.locator("[data-cablegate-ack]").click();
      expect(await page.evaluate(() => localStorage.getItem("itt10-cablegate"))).toBeFalsy();
      await page.locator("[data-cablegate-1]").click();
      await page.locator("[data-cablegate-2]").click();
      await page.locator("[data-cablegate-ack]").click();
      return;
    }
    if (path.includes("groupon")) {
      await page.locator("[data-groupon-buy]").click();
      expect(await page.evaluate(() => localStorage.getItem("itt10-groupon"))).toBeFalsy();
      await page.locator("[data-groupon-city]").fill("Seattle");
      await page.locator("[data-groupon-buy]").click();
      return;
    }
    if (path.includes("digg")) {
      await page.locator("[data-diggv4-ack]").click();
      expect(await page.evaluate(() => localStorage.getItem("itt10-digg-v4"))).toBeFalsy();
      await page.locator("[data-diggv4-algo]").click();
      await page.locator("[data-diggv4-power]").click();
      await page.locator("[data-diggv4-ack]").click();
    }
  }

  for (const g of gems) {
    test(`${g.path} incomplete no write · complete writes ${g.key}`, async ({ page }) => {
      await page.goto(g.path);
      await page.evaluate((k) => localStorage.removeItem(k), g.key);
      await page.reload();
      await page.waitForTimeout(400);
      await completeGem(page, g.path);
      await expect
        .poll(async () => page.evaluate((k) => localStorage.getItem(k), g.key), { timeout: 8000 })
        .toBeTruthy();
    });
  }

  test("2010 home densify gem chips", async ({ page }) => {
    await page.goto("/years/2010/pages/home.html");
    await expect(page.locator(".itt-densify-gems").first()).toContainText(/Cablegate|Digg v4|Groupon/i);
    await expect(page.locator('a[href*="cablegate/literacy"]').first()).toBeVisible();
    await expect(page.locator('a[href*="digg/exodus"]').first()).toBeVisible();
  });

  test("Phase 4 multipage densify rooms load", async ({ page }) => {
    for (const path of [
      "/years/2010/sites/cablegate/literacy.html",
      "/years/2010/sites/cablegate/press.html",
      "/years/2010/sites/digg/exodus.html",
      "/years/2010/sites/groupon/deal.html",
    ]) {
      await page.goto(path);
      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator("body")).toContainText(/2010|densify|residual|Phase 4|literacy|exodus|deal/i);
    }
  });

  test("Cablegate hard ban · Groupon IPO ban · Digg exodus trail", async ({ page }) => {
    await page.goto("/years/2010/sites/cablegate/index.html");
    await expect(page.locator("body")).toContainText(/no cable dump|No cable dump/i);
    await page.goto("/years/2010/sites/groupon/index.html");
    await expect(page.locator("body")).toContainText(/IPO|2011/i);
    await page.goto("/years/2010/sites/digg/exodus.html");
    await expect(page.locator('[data-ott-trail="digg-reddit"], a[href*="reddit"]').first()).toBeVisible();
  });
});

test.describe("Residual Phase 5 — forest + about axis", () => {
  test("continuity forest chip on sample Amazon + Yahoo rooms", async ({ page }) => {
    for (const y of ["2008", "2010", "2013"]) {
      await page.goto(`/years/${y}/sites/amazon/index.html`);
      await expect(
        page.locator("[data-itt-continuity-archive], [data-itt-forest], .itt-continuity-chip, .itt18-continuity-archive").first()
      ).toBeVisible({ timeout: 10000 });
      await page.goto(`/years/${y}/sites/yahoo/index.html`);
      await expect(
        page.locator("[data-itt-continuity-archive], [data-itt-forest], .itt-continuity-chip, .itt18-continuity-archive").first()
      ).toBeVisible({ timeout: 10000 });
    }
  });

  test("About third-axis strip 2010–2013 sample", async ({ page }) => {
    for (const y of ["2010", "2012", "2013"]) {
      await page.goto(`/years/${y}/pages/about.html`);
      await expect(page.locator("body")).toContainText(/Third axis|page weight|HTTP Archive/i);
    }
  });

  test("games FarmVille product link", async ({ page }) => {
    await page.goto("/years/2009/sites/playable/game.html");
    await expect(page.locator('a[href*="farmville"], a[data-yg-product-link="farmville"]').first()).toBeVisible();
  });

  test("soft residual chips AIM/MapQuest/Pandora on adjacent homes", async ({ page }) => {
    await page.goto("/years/2000/pages/home.html");
    await expect(page.locator(".itt-residual-soft").first()).toContainText(/AIM|MapQuest/i);
    await page.goto("/years/2001/pages/home.html");
    await expect(page.locator(".itt-residual-soft").first()).toContainText(/AIM|MapQuest|MSN/i);
    await page.goto("/years/2007/pages/home.html");
    await expect(page.locator(".itt-residual-soft").first()).toContainText(/Pandora|Flash/i);
    await page.goto("/years/2010/pages/home.html");
    await expect(page.locator(".itt-residual-soft").first()).toContainText(/Pandora|GitHub/i);
  });
});
