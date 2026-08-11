// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks?: string[], fills?: [string, string][], extra?: () => Promise<void> }} spec
 */
async function assertBlockedThenWrites(page, spec) {
  await page.goto(`/years/2016/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await page
    .waitForFunction(
      () => {
        const d = document.documentElement;
        return (
          d.getAttribute("data-itt-feat-year2016extras") === "1" ||
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
  if (spec.extra) await spec.extra();
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

test.describe("2016 REAL flows", () => {
  test("Stories incomplete does not write; caption + checks write itt16-ig-stories", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/instagram/stories.html",
      key: "itt16-ig-stories",
      save: "[data-ig-stories-add]",
      fills: [["[data-ig-stories-caption]", "coffee"]],
      checks: ["[data-ig-stories-24h]", "[data-ig-stories-not-reels]"],
    });
  });

  test("Stories add then reload feed shows caption", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-ig-stories");
      localStorage.removeItem("itt16-ig-stories-list");
    });
    await page.reload();
    await page.locator("[data-ig-stories-caption]").fill("coffee");
    await page.locator("[data-ig-stories-24h]").check();
    await page.locator("[data-ig-stories-not-reels]").check();
    await page.locator("[data-ig-stories-add]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-ig-stories"))).toBeTruthy();
    await page.goto("/years/2016/sites/instagram/index.html");
    await page
      .waitForFunction(
        () => document.documentElement.getAttribute("data-itt-feat-year2016extras") === "1",
        null,
        { timeout: 15000 }
      )
      .catch(() => {});
    await expect(page.locator("[data-ig-has-story]")).toBeVisible();
    await expect(page.locator("[data-ig-stories-echo]")).toContainText("coffee");
    await expect(page.locator("[data-ig-stories-list]")).toContainText("coffee");
  });

  test("Watch without a story never writes", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/watch.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-ig-stories");
      localStorage.removeItem("itt16-ig-stories-watch");
    });
    await page.reload();
    await page.locator("[data-ig-watch-24h]").check();
    await page.locator("[data-ig-watch-not-post]").check();
    await page.locator("[data-ig-stories-watch]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt16-ig-stories-watch"))).toBeFalsy();
  });

  test("Watch after add writes itt16-ig-stories-watch", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-ig-stories");
      localStorage.removeItem("itt16-ig-stories-watch");
    });
    await page.reload();
    await page.locator("[data-ig-stories-caption]").fill("sunset");
    await page.locator("[data-ig-stories-24h]").check();
    await page.locator("[data-ig-stories-not-reels]").check();
    await page.locator("[data-ig-stories-add]").click();
    await page.goto("/years/2016/sites/instagram/watch.html");
    await assertBlockedThenWrites(page, {
      path: "sites/instagram/watch.html",
      key: "itt16-ig-stories-watch",
      save: "[data-ig-stories-watch]",
      checks: ["[data-ig-watch-24h]", "[data-ig-watch-not-post]"],
    });
    const raw = await page.evaluate(() => localStorage.getItem("itt16-ig-stories-watch"));
    expect(raw).toMatch(/sunset/);
    expect(raw).toMatch(/"year":"2016"/);
  });

  test("Stories checks without caption never write", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.reload();
    await page.locator("[data-ig-stories-24h]").check();
    await page.locator("[data-ig-stories-not-reels]").check();
    await page.locator("[data-ig-stories-add]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt16-ig-stories"))).toBeFalsy();
  });

  test("PoGO map needs literacy then stop", async ({ page }) => {
    await page.goto("/years/2016/sites/pogo/map.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-pogo");
      localStorage.removeItem("itt16-pogo-stop");
    });
    await page.reload();
    await page.locator("[data-pogo-stop='park']").click();
    await page.locator("[data-pogo-stop-nogps]").check();
    await page.locator("[data-pogo-stop-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt16-pogo-stop"))).toBeFalsy();
    await page.goto("/years/2016/sites/pogo/index.html");
    await page.locator("[data-pogo-location]").check();
    await page.locator("[data-pogo-no-art]").check();
    await page.locator("[data-pogo-outside]").check();
    await page.locator("[data-pogo-catch]").click();
    await page.goto("/years/2016/sites/pogo/map.html");
    await page.locator("[data-pogo-stop='park']").click();
    await page.locator("[data-pogo-stop-nogps]").check();
    await page.locator("[data-pogo-stop-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-pogo-stop"))).toBeTruthy();
  });

  test("PoGO needs location + no-art", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/pogo/index.html",
      key: "itt16-pogo",
      save: "[data-pogo-catch]",
      checks: ["[data-pogo-location]", "[data-pogo-no-art]", "[data-pogo-outside]"],
    });
  });

  test("Reactions need a pick + not-dislike", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/reactions.html");
    await page.evaluate(() => localStorage.removeItem("itt16-reactions"));
    await page.reload();
    await page.locator("[data-reactions-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt16-reactions"))).toBeFalsy();
    await page.locator('[data-reaction="love"]').click();
    await page.locator("[data-reactions-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt16-reactions"))).toBeFalsy();
    await page.locator("[data-reaction-not-dislike]").check();
    await page.locator("[data-reactions-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-reactions"))).toBeTruthy();
  });

  test("Reactions persist on feed after pick", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/reactions.html");
    await page.evaluate(() => localStorage.removeItem("itt16-reactions"));
    await page.reload();
    await page.locator('[data-reaction="love"]').click();
    await page.locator("[data-reaction-not-dislike]").check();
    await page.locator("[data-reactions-save]").click();
    await page.goto("/years/2016/sites/facebook/index.html");
    await page
      .waitForFunction(
        () => document.documentElement.getAttribute("data-itt-feat-year2016extras") === "1",
        null,
        { timeout: 15000 }
      )
      .catch(() => {});
    await expect(page.locator("[data-reaction-on-post]")).toContainText(/love/i);
    await page.goto("/years/2016/sites/facebook/post.html");
    await expect(page.locator("[data-reaction-on-post]")).toContainText(/love/i);
  });

  test("WA chat needs E2E then message", async ({ page }) => {
    await page.goto("/years/2016/sites/whatsapp/chat.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-wa-e2e");
      localStorage.removeItem("itt16-wa-chat");
    });
    await page.reload();
    await page.locator("[data-wa-chat-text]").fill("see you");
    await page.locator("[data-wa-chat-lock]").check();
    await page.locator("[data-wa-chat-send]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt16-wa-chat"))).toBeFalsy();
    await page.goto("/years/2016/sites/whatsapp/e2e.html");
    await page.locator("[data-wa-e2e-meaning]").check();
    await page.locator("[data-wa-e2e-date]").check();
    await page.locator("[data-wa-e2e-save]").click();
    await page.goto("/years/2016/sites/whatsapp/chat.html");
    await page.locator("[data-wa-chat-text]").fill("see you");
    await page.locator("[data-wa-chat-lock]").check();
    await page.locator("[data-wa-chat-send]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-wa-chat"))).toBeTruthy();
  });

  test("Dongle needs iPhone 7 literacy", async ({ page }) => {
    await page.goto("/years/2016/sites/iphone/dongle.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-iphone7");
      localStorage.removeItem("itt16-dongle");
    });
    await page.reload();
    await page.locator("[data-dongle-price]").check();
    await page.locator("[data-dongle-wired]").check();
    await page.locator("[data-dongle-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt16-dongle"))).toBeFalsy();
    await page.goto("/years/2016/sites/iphone/7.html");
    await page.locator("[data-iphone7-jack]").check();
    await page.locator("[data-iphone7-adapter]").check();
    await page.locator("[data-iphone7-not-x]").check();
    await page.locator("[data-iphone7-save]").click();
    await page.goto("/years/2016/sites/iphone/dongle.html");
    await page.locator("[data-dongle-price]").check();
    await page.locator("[data-dongle-wired]").check();
    await page.locator("[data-dongle-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-dongle"))).toBeTruthy();
  });

  test("Vine clip incomplete then writes; goodbye blocks new loops", async ({ page }) => {
    await page.goto("/years/2016/sites/vine/loop.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-vine");
      localStorage.removeItem("itt16-vine-clip");
    });
    await page.reload();
    await page.locator("[data-vine-clip-six]").check();
    await page.locator("[data-vine-clip-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt16-vine-clip"))).toBeFalsy();
    await page.locator("[data-vine-clip-caption]").fill("cat loop");
    await page.locator("[data-vine-clip-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-vine-clip"))).toBeTruthy();
    await page.goto("/years/2016/sites/vine/goodbye.html");
    await page.locator("[data-vine-announce]").check();
    await page.locator("[data-vine-not-gone]").check();
    await page.locator("[data-vine-save]").click();
    await page.goto("/years/2016/sites/vine/loop.html");
    await page.evaluate(() => localStorage.removeItem("itt16-vine-clip"));
    await page.reload();
    await expect(page.locator("[data-vine-clip-save]")).toBeDisabled();
    expect(await page.evaluate(() => localStorage.getItem("itt16-vine-clip"))).toBeFalsy();
  });

  test("WA E2E two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/whatsapp/e2e.html",
      key: "itt16-wa-e2e",
      save: "[data-wa-e2e-save]",
      checks: ["[data-wa-e2e-meaning]", "[data-wa-e2e-date]"],
    });
  });

  test("iPhone 7 three honesty checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/iphone/7.html",
      key: "itt16-iphone7",
      save: "[data-iphone7-save]",
      checks: ["[data-iphone7-jack]", "[data-iphone7-adapter]", "[data-iphone7-not-x]"],
    });
  });

  test("AirPods price + date + not Pro", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/airpods/index.html",
      key: "itt16-airpods",
      save: "[data-airpods-save]",
      checks: ["[data-airpods-price]", "[data-airpods-date]", "[data-airpods-not-pro]"],
    });
  });

  test("Vine dual-date required", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/vine/goodbye.html",
      key: "itt16-vine",
      save: "[data-vine-save]",
      checks: ["[data-vine-announce]", "[data-vine-not-gone]"],
    });
  });

  test("Win10 end three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/windows10/index.html",
      key: "itt16-win10-end",
      save: "[data-win10-end-save]",
      checks: ["[data-win10-started]", "[data-win10-ended]", "[data-win10-still-mass]"],
    });
  });

  test("Chrome habit + EdgeHTML + download", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/chrome/index.html",
      key: "itt16-chrome",
      save: "[data-chrome16-save]",
      checks: ["[data-chrome16-habit]", "[data-chrome16-edge]", "[data-chrome16-dl]"],
    });
  });

  test("Messenger bots F8 2016", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/messenger/bots.html",
      key: "itt16-bots",
      save: "[data-bots-save]",
      fills: [["[data-bot-msg]", "do you deliver to 2016?"]],
      checks: ["[data-bots-f8]", "[data-bots-not-2015]"],
    });
  });

  test("Oculus CV1 ship + price", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/oculus/cv1.html",
      key: "itt16-rift",
      save: "[data-rift-save]",
      checks: ["[data-rift-ship]", "[data-rift-price]"],
    });
  });

  test("LinkedIn $26.2B + Jun 13", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/linkedin/deal.html",
      key: "itt16-linkedin",
      save: "[data-li-save]",
      checks: ["[data-li-price]", "[data-li-date]"],
    });
  });

  test("Allo date + smart reply + chip", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/allo/index.html",
      key: "itt16-allo",
      save: "[data-allo-save]",
      checks: ["[data-allo-date]", "[data-allo-smart]"],
      extra: async () => {
        await page.locator("[data-allo-chip]").first().click();
      },
    });
  });

  test("Instagram Live three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/instagram/live.html",
      key: "itt16-ig-live",
      save: "[data-ig-live-save]",
      checks: ["[data-ig-live-date]", "[data-ig-live-gone]", "[data-ig-live-not-reels]"],
    });
  });

  test("AMP in Search two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/amp/serp.html",
      key: "itt16-amp-serp",
      save: "[data-amp-serp-save]",
      checks: ["[data-amp-serp-date]", "[data-amp-serp-not-2015]"],
    });
  });

  test("FB Live everyone + not-stream", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/facebook/live.html",
      key: "itt16-fb-live",
      save: "[data-fb-live-save]",
      checks: ["[data-fb-live-everyone]", "[data-fb-live-not-stream]"],
    });
  });

  test("Dyn Oct 21 + IoT no payload", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/dyn/index.html",
      key: "itt16-dyn",
      save: "[data-dyn-save]",
      checks: ["[data-dyn-date]", "[data-dyn-iot]"],
    });
  });

  test("Pixel Oct 4 + not iPhone", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/pixel/index.html",
      key: "itt16-pixel",
      save: "[data-pixel-save]",
      checks: ["[data-pixel-date]", "[data-pixel-not-iphone]"],
    });
  });

  test("Google Home $129 + Nov 4 + not Echo-first", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/home/index.html",
      key: "itt16-home",
      save: "[data-ghome-save]",
      checks: ["[data-ghome-price]", "[data-ghome-ship]", "[data-ghome-not-echo]"],
    });
  });

  test("Spectacles $129 + Snapbot + still competes", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/snapchat/spectacles.html",
      key: "itt16-spectacles",
      save: "[data-spec-save]",
      checks: ["[data-spec-price]", "[data-spec-snapbot]", "[data-spec-still]"],
    });
  });

  test("Live complete does not write itt15-*", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/live.html");
    await page.evaluate(() => {
      localStorage.setItem("itt15-watch", '{"keep":1}');
      localStorage.removeItem("itt16-ig-live");
    });
    await page.locator("[data-ig-live-date]").check();
    await page.locator("[data-ig-live-gone]").check();
    await page.locator("[data-ig-live-not-reels]").check();
    await page.locator("[data-ig-live-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-ig-live"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt15-watch"))).toBe('{"keep":1}');
  });

  test("P2 letter two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/apple/letter.html",
      key: "itt16-fbi-letter",
      save: "[data-fbi-save]",
      checks: ["[data-fbi-backdoor]", "[data-fbi-not-crime]"],
    });
  });

  test("P2 Free Basics two checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/freebasics/index.html",
      key: "itt16-freebasics",
      save: "[data-freebasics-save]",
      checks: ["[data-fb-trai-date]", "[data-fb-trai-not-wall]"],
    });
  });

  test("P2 Marketplace title + price + no-pay", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/facebook/marketplace.html",
      key: "itt16-marketplace",
      save: "[data-mp-save]",
      fills: [
        ["[data-mp-title]", "desk lamp"],
        ["[data-mp-price]", "12"],
      ],
      checks: ["[data-mp-no-pay]"],
    });
  });

  test("P2 Duo three checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/duo/index.html",
      key: "itt16-duo",
      save: "[data-duo-save]",
      checks: ["[data-duo-phone]", "[data-duo-knock]", "[data-duo-not-meet]"],
    });
  });

  test("P2 Teams preview + GA 2017", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/teams/index.html",
      key: "itt16-teams-preview",
      save: "[data-teams-save]",
      checks: ["[data-teams-preview]", "[data-teams-ga]"],
    });
  });

  test("P2 AlphaGo 4-1 + livestream", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/alphago/index.html",
      key: "itt16-alphago",
      save: "[data-ag-save]",
      checks: ["[data-ag-score]", "[data-ag-stream]"],
    });
  });

  test("P2 Let’s Encrypt prod + 90 days", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/letsencrypt/index.html",
      key: "itt16-letsencrypt",
      save: "[data-le-save]",
      checks: ["[data-le-prod]", "[data-le-90]"],
    });
  });

  test("P2 Yahoo two notices + not 3B", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/yahoo-breach/index.html",
      key: "itt16-yahoo-breach",
      save: "[data-yh-save]",
      checks: ["[data-yh-two]", "[data-yh-not-3b]"],
    });
  });

  test("P2 leftover Workplace", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/workplace/index.html",
      key: "itt16-workplace",
      save: "[data-wp-save]",
      checks: ["[data-wp-work]", "[data-wp-not-feed]"],
    });
  });

  test("P2 leftover iOS 10", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/iphone/ios10.html",
      key: "itt16-ios10",
      save: "[data-ios10-save]",
      checks: ["[data-ios10-stickers]", "[data-ios10-not-face]"],
    });
  });

  test("P2 leftover Nougat", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/android/nougat.html",
      key: "itt16-nougat",
      save: "[data-nougat-save]",
      checks: ["[data-nougat-date]", "[data-nougat-split]"],
    });
  });

  test("P2 leftover Note 7", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/note7/index.html",
      key: "itt16-note7",
      save: "[data-note7-save]",
      checks: ["[data-note7-down]", "[data-note7-replace]"],
    });
  });

  test("P2 leftover Mario Run", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/mariorun/index.html",
      key: "itt16-mario-run",
      save: "[data-mario-save]",
      checks: ["[data-mario-date]", "[data-mario-price]"],
    });
  });

  test("leftover Workplace reload + isolation vs itt15", async ({ page }) => {
    await page.goto("/years/2016/sites/workplace/index.html");
    await page.evaluate(() => {
      localStorage.setItem("itt15-watch", '{"keep":1}');
      localStorage.removeItem("itt16-workplace");
      localStorage.removeItem("itt16-ig-stories");
    });
    await page.reload();
    await page.locator("[data-wp-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt16-workplace"))).toBeFalsy();
    await page.locator("[data-wp-work]").check();
    await page.locator("[data-wp-not-feed]").check();
    await page.locator("[data-wp-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-workplace"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt15-watch"))).toBe('{"keep":1}');
    expect(await page.evaluate(() => localStorage.getItem("itt16-ig-stories"))).toBeFalsy();
    await page.reload();
    await expect(page.locator("[data-wp-status]")).toContainText(/Workplace/i);
    await expect(page.locator("[data-next-flow]")).toBeVisible();
    await expect(page.locator("[data-next-flow] a[href*='stories']")).toBeVisible();
  });

  test("P2 letter isolation vs itt15 + Stories", async ({ page }) => {
    await page.goto("/years/2016/sites/apple/letter.html");
    await page.evaluate(() => {
      localStorage.setItem("itt15-watch", '{"keep":1}');
      localStorage.removeItem("itt16-fbi-letter");
      localStorage.removeItem("itt16-ig-stories");
    });
    await page.locator("[data-fbi-backdoor]").check();
    await page.locator("[data-fbi-not-crime]").check();
    await page.locator("[data-fbi-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-fbi-letter"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt15-watch"))).toBe('{"keep":1}');
    expect(await page.evaluate(() => localStorage.getItem("itt16-ig-stories"))).toBeFalsy();
  });

  test("musical.ly caption + not TikTok", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/musically/index.html",
      key: "itt16-musical",
      save: "[data-musical-save]",
      fills: [["[data-musical-caption]", "15 seconds"]],
      checks: ["[data-musical-not-tiktok]"],
    });
  });

  test("Stories complete does not touch itt15-*", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await page.evaluate(() => {
      localStorage.setItem("itt15-watch", '{"keep":1}');
      localStorage.removeItem("itt16-ig-stories");
    });
    await page.locator("[data-ig-stories-caption]").fill("coffee");
    await page.locator("[data-ig-stories-24h]").check();
    await page.locator("[data-ig-stories-not-reels]").check();
    await page.locator("[data-ig-stories-add]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt16-ig-stories"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt15-watch"))).toBe('{"keep":1}');
  });

  const residuals = [
    { path: "sites/instagram/index.html", key: "itt16-ig-feed" },
    { path: "sites/facebook/index.html", key: "itt16-fb-feed" },
    { path: "sites/whatsapp/index.html", key: "itt16-wa-web" },
    { path: "sites/vine/index.html", key: "itt16-vine-loop" },
    { path: "sites/iphone/index.html", key: "itt16-iphone-6s" },
    { path: "sites/apple/watch.html", key: "itt16-watch-residual" },
    { path: "sites/snapchat/story.html", key: "itt16-snap-story" },
    { path: "sites/googlephotos/index.html", key: "itt16-gphotos" },
    { path: "sites/periscope/index.html", key: "itt16-periscope" },
    { path: "sites/discord/index.html", key: "itt16-discord" },
    { path: "sites/edge/index.html", key: "itt16-edge" },
    { path: "sites/chrome/about.html", key: "itt16-chrome-about" },
    { path: "sites/playable/loop.html", key: "itt16-slither-ack" },
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
