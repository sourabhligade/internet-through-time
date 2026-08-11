// @ts-check
const { test, expect } = require("@playwright/test");

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks?: string[], fills?: [string, string][] }} spec
 */
async function assertBlockedThenWrites(page, spec) {
  await page.goto(`/years/2015/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
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

test.describe("2015 REAL flows", () => {
  test("Watch incomplete does not write; shipped writes itt15-watch", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/apple/watch.html",
      key: "itt15-watch",
      save: "[data-watch-save]",
      checks: ["[data-watch-shipped]", "[data-watch-no-store]"],
    });
  });

  test("Win10 three honesty checks required", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/windows10/index.html",
      key: "itt15-win10",
      save: "[data-win10-upgrade]",
      checks: ["[data-win10-free]", "[data-win10-date]", "[data-win10-not-ended]"],
    });
  });

  test("Edge prefer requires ships + not-Chromium", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/edge/index.html",
      key: "itt15-edge",
      save: "[data-edge-prefer]",
      checks: ["[data-edge-ships]", "[data-edge-not-chromium]"],
    });
  });

  test("WhatsApp Web incomplete does not write; both checks write itt15-wa-web", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/whatsapp/web.html",
      key: "itt15-wa-web",
      save: "[data-wa-web-link]",
      checks: ["[data-wa-web-phone]", "[data-wa-web-not-e2e]"],
    });
  });

  test("Periscope empty title does not write; title writes itt15-periscope", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/periscope/index.html",
      key: "itt15-periscope",
      save: "[data-peri-live]",
      fills: [["[data-peri-title]", "Coffee shop"]],
    });
  });

  test("Meerkat war literacy needs SXSW + graph block", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/meerkat/index.html",
      key: "itt15-meerkat",
      save: "[data-meerkat-save]",
      checks: ["[data-meerkat-sxsw]", "[data-meerkat-graph]"],
    });
  });

  test("FB Live celebs-only honesty", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/fblive/index.html",
      key: "itt15-fblive",
      save: "[data-fblive-save]",
      checks: ["[data-fblive-celebs]", "[data-fblive-not-mass]"],
    });
  });

  test("Apple Music trial checkbox required", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/applemusic/index.html",
      key: "itt15-music",
      save: "[data-music-save]",
      checks: ["[data-music-trial]", "[data-music-not-pay]"],
    });
  });

  test("Google Photos three honesty checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/googlephotos/index.html",
      key: "itt15-photos",
      save: "[data-photos-save]",
      checks: ["[data-photos-backup]", "[data-photos-hq]", "[data-photos-original]"],
    });
  });

  test("iOS 9 blockers need app + Settings path + enable", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/ios9/blockers.html",
      key: "itt15-blockers",
      save: "[data-blocker-save]",
      checks: ["[data-blocker-app]", "[data-blocker-path]", "[data-blocker-enable]"],
    });
  });

  test("Discord needs server + channel + gamer seed", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/discord/index.html",
      key: "itt15-discord",
      save: "[data-discord-save]",
      fills: [
        ["[data-discord-server]", "LAN party"],
        ["[data-discord-channel]", "#general"],
      ],
      checks: ["[data-discord-gamer]"],
    });
  });

  test("Discord #channel needs server; message reloads", async ({ page }) => {
    await page.goto("/years/2015/sites/discord/channel.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt15-discord");
      localStorage.removeItem("itt15-discord-msgs");
    });
    await page.reload();
    await page.locator("[data-discord-msg]").fill("gg");
    await page.locator("[data-discord-send]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt15-discord-msgs"))).toBeFalsy();
    await page.goto("/years/2015/sites/discord/index.html");
    await page.fill("[data-discord-server]", "LAN party");
    await page.fill("[data-discord-channel]", "#general");
    await page.locator("[data-discord-gamer]").check();
    await page.locator("[data-discord-save]").click();
    await page.goto("/years/2015/sites/discord/channel.html");
    await page.locator("[data-discord-msg]").fill("gg");
    await page.locator("[data-discord-send]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-discord-msgs"))).toMatch(/gg/);
    await page.reload();
    await expect(page.locator("[data-discord-thread]")).toContainText("gg");
  });

  test("Discover needs ≥2 publisher tiles", async ({ page }) => {
    await page.goto("/years/2015/sites/snapchat/discover.html");
    await page.evaluate(() => localStorage.removeItem("itt15-snap-discover"));
    await page.reload();
    await page.locator("[data-discover-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt15-snap-discover"))).toBeFalsy();
    await page.locator("[data-discover-tile]").nth(0).check();
    await page.locator("[data-discover-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt15-snap-discover"))).toBeFalsy();
    await page.locator("[data-discover-tile]").nth(1).check();
    await page.locator("[data-discover-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-snap-discover"))).toBeTruthy();
  });

  test("Echo mass + price + Alexa required", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/echo/index.html",
      key: "itt15-echo",
      save: "[data-echo-save]",
      checks: ["[data-echo-mass]", "[data-echo-price]", "[data-echo-alexa]"],
    });
  });

  test("Let's Encrypt three honesty checks", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/letsencrypt/index.html",
      key: "itt15-le",
      save: "[data-le-save]",
      checks: ["[data-le-free]", "[data-le-auto]", "[data-le-beta]"],
    });
  });

  test("Swift OSS + Apache class", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/swift/index.html",
      key: "itt15-swift",
      save: "[data-swift-save]",
      checks: ["[data-swift-oss]", "[data-swift-apache]"],
    });
  });

  test("Messenger Platform not mass bots", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/messenger/index.html",
      key: "itt15-messenger-platform",
      save: "[data-msg-save]",
      checks: ["[data-msg-platform]", "[data-msg-not-bots]"],
    });
  });

  test("Oculus CV1 pre-ship honesty", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/oculus/cv1.html",
      key: "itt15-oculus-cv1",
      save: "[data-oculus-cv1-save]",
      checks: ["[data-oculus-preship]", "[data-oculus-not-unbox]"],
    });
  });

  test("Peach empty word blocked; Magic Word writes itt15-peach", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/peach/index.html",
      key: "itt15-peach",
      save: "[data-peach-save]",
      fills: [["[data-peach-word]", "draw"]],
    });
  });

  test("iPhone 6s 3D Touch + ship date", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/iphone/6s.html",
      key: "itt15-iphone6s",
      save: "[data-6s-save]",
      checks: ["[data-6s-3d]", "[data-6s-ship]"],
    });
  });

  test("Ashley Madison literacy incomplete blocked; both checks write itt15-am-literacy", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/privacy/ashleymadison.html",
      key: "itt15-am-literacy",
      save: "[data-am-save]",
      checks: ["[data-am-breach]", "[data-am-no-dump]"],
    });
  });

  test("React Native incomplete blocked; both checks write itt15-rn", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/reactnative/index.html",
      key: "itt15-rn",
      save: "[data-rn-save]",
      checks: ["[data-rn-f8]", "[data-rn-ios]"],
    });
  });

  test("About shows 1B dip honesty", async ({ page }) => {
    await page.goto("/years/2015/pages/about.html");
    await expect(page.locator("body")).toContainText(/863,105,652/);
    await expect(page.locator("body")).toContainText(/2014|1 billion|1B|dip|Mar 2016/i);
  });

  test("About thesis incomplete does not write; both checks write itt15-thesis-ack", async ({ page }) => {
    await page.goto("/years/2015/pages/about.html");
    await page.evaluate(() => localStorage.removeItem("itt15-thesis-ack"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt15-thesis-ack"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt15-thesis-ack"))).toBeFalsy();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-thesis-ack"))).toBeTruthy();
  });

  test("2015 REAL never writes itt14-* neighbor keys", async ({ page }) => {
    await page.goto("/years/2015/sites/apple/watch.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt15-watch");
      localStorage.removeItem("itt14-watch");
      localStorage.removeItem("itt14-watch-announce");
    });
    await page.reload();
    await page.locator("[data-watch-shipped]").check();
    await page.locator("[data-watch-no-store]").check();
    await page.locator("[data-watch-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-watch"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt14-watch"))).toBeFalsy();
    expect(await page.evaluate(() => localStorage.getItem("itt14-watch-announce"))).toBeFalsy();
  });

  test("Chrome habit REAL: one-click gone; three checks write itt15-chrome", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/chrome/index.html",
      key: "itt15-chrome",
      save: "[data-chrome15-save]",
      checks: ["[data-chrome15-habit]", "[data-chrome15-edge]", "[data-chrome15-dl]"],
    });
  });

  test("Spotify residual REAL: invite mock gone; plan writes itt15-spotify", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/spotify/index.html",
      key: "itt15-spotify",
      save: "[data-spotify15-save]",
      checks: ["[data-spotify15-residual]", "[data-spotify15-war]", "[data-spotify15-plan][value='free']"],
    });
  });

  test("YouTube Red incomplete blocked; three checks write itt15-ytred", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/youtube/red.html",
      key: "itt15-ytred",
      save: "[data-ytred-save]",
      checks: ["[data-ytred-price]", "[data-ytred-all]", "[data-ytred-ios]"],
    });
  });

  test("Instant Articles incomplete blocked; three checks write itt15-instant", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/facebook/instant.html",
      key: "itt15-instant",
      save: "[data-ia-save]",
      checks: ["[data-ia-inapp]", "[data-ia-partners]", "[data-ia-not-amp]"],
    });
  });

  test("Moments incomplete blocked; two checks write itt15-moments", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/twitter/moments.html",
      key: "itt15-moments",
      save: "[data-mom-save]",
      checks: ["[data-mom-date]", "[data-mom-curated]"],
    });
  });

  test("Title II incomplete blocked; three checks write itt15-title2", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/fcc/index.html",
      key: "itt15-title2",
      save: "[data-t2-save]",
      checks: ["[data-t2-vote]", "[data-t2-32]", "[data-t2-not17]"],
    });
  });

  test("AMP announce incomplete blocked; two checks write itt15-amp-ack", async ({ page }) => {
    await assertBlockedThenWrites(page, {
      path: "sites/amp/index.html",
      key: "itt15-amp-ack",
      save: "[data-amp-save]",
      checks: ["[data-amp-announce]", "[data-amp-notserp]"],
    });
  });

  test("Blob Rush load does not write; saveBest writes itt15-game-blobrush", async ({ page }) => {
    await page.goto("/years/2015/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt15-game-blobrush"));
    await page.reload();
    await expect(page.locator('[data-year-game][data-game-id="blobrush"]')).toBeVisible();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem("itt15-game-blobrush"))).toBeFalsy();
    await page.evaluate(() => {
      if (!window.ITT || !ITT.YearGame) throw new Error("YearGame missing");
      ITT.YearGame.saveBest("blobrush", 12, { year: "2015" });
    });
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt15-game-blobrush"))) || "{}");
    expect(blob.gameId).toBe("blobrush");
    expect(blob.year).toBe("2015");
    expect(blob.best).toBeGreaterThanOrEqual(12);
    expect(blob.real).toBe(true);
  });

  const residuals = [
    { path: "sites/apple/index.html", key: "itt15-apple-residual" },
    { path: "sites/facebook/index.html", key: "itt15-fb-residual" },
    { path: "sites/instagram/index.html", key: "itt15-ig-residual" },
    { path: "sites/vine/index.html", key: "itt15-vine-residual" },
    { path: "sites/iphone/index.html", key: "itt15-iphone-residual" },
    { path: "sites/heartbleed/index.html", key: "itt15-hb-residual" },
    { path: "sites/windows7/index.html", key: "itt15-win7-residual" },
    { path: "sites/youtube/index.html", key: "itt15-yt-residual" },
    { path: "sites/twitter/index.html", key: "itt15-twitter-residual" },
    { path: "sites/chrome/about.html", key: "itt15-chrome-about" },
    { path: "sites/playable/loop.html", key: "itt15-loopsix-ack" },
    { path: "sites/whatsapp/about.html", key: "itt15-wa-deal" },
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
