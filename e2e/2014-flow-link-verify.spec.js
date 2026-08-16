// @ts-check
/**
 * 2014 — every flow-map site + home/dirbar link + remaining REAL machines.
 * Incomplete paths must not write.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

const FLOW_SITES = [
  "pages/home.html",
  "pages/about.html",
  "pages/map.html",
  "sites/whatsapp/index.html",
  "sites/whatsapp/about.html",
  "sites/whatsapp/chat.html",
  "sites/heartbleed/index.html",
  "sites/heartbleed/rotate.html",
  "sites/billion/index.html",
  "sites/iphone/index.html",
  "sites/iphone/pay.html",
  "sites/iphone/bendgate.html",
  "sites/apple/watch.html",
  "sites/iphone/ios8.html",
  "sites/icebucket/index.html",
  "sites/serial/index.html",
  "sites/youtube/index.html",
  "sites/youtube/watch.html",
  "sites/chrome/index.html",
  "sites/windows10/index.html",
  "sites/twitch/index.html",
  "sites/oculus/index.html",
  "sites/alibaba/index.html",
  "sites/echo/index.html",
  "sites/material/index.html",
  "sites/slack/index.html",
  "sites/slack/channel.html",
  "sites/slack/about.html",
  "sites/cardboard/index.html",
  "sites/secret/index.html",
  "sites/playable/game.html",
  "sites/playable/index.html",
];

const HOME_HREFS = [
  "about.html",
  "map.html",
  "whats-new.html",
  "../sites/whatsapp/index.html",
  "../sites/whatsapp/about.html",
  "../sites/whatsapp/chat.html",
  "../sites/heartbleed/index.html",
  "../sites/heartbleed/rotate.html",
  "../sites/iphone/index.html",
  "../sites/iphone/pay.html",
  "../sites/iphone/bendgate.html",
  "../sites/apple/watch.html",
  "../sites/icebucket/index.html",
  "../sites/serial/index.html",
  "../sites/billion/index.html",
  "../sites/chrome/index.html",
  "../sites/windows10/index.html",
  "../sites/twitch/index.html",
  "../sites/oculus/index.html",
  "../sites/alibaba/index.html",
  "../sites/echo/index.html",
  "../sites/slack/index.html",
  "../sites/slack/channel.html",
  "../sites/slack/about.html",
  "../sites/cardboard/index.html",
  "../sites/secret/index.html",
  "../sites/material/index.html",
  "../sites/vine/index.html",
  "../sites/snapchat/story.html",
  "../sites/instagram/video.html",
  "../sites/snowden/index.html",
  "../sites/playable/index.html",
  "../sites/playable/game.html",
];

async function clearKey(page, key) {
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

test.describe("2014 flow-map + home links exist", () => {
  for (const rel of FLOW_SITES) {
    test(`flow-map ${rel}`, async ({ page }) => {
      const res = await page.goto(`/years/2014/${rel}`);
      expect(res && res.ok(), rel).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2014");
      await expect(page.locator("body")).not.toBeEmpty();
    });
  }

  for (const href of HOME_HREFS) {
    const dest = href.replace(/^\.\.\//, "");
    test(`home link ${href}`, async ({ page }) => {
      const res = await page.goto(`/years/2014/pages/${href}`);
      expect(res && res.ok(), dest).toBeTruthy();
    });
  }

  test("whats-new + cool + 404 exist", async ({ page }) => {
    for (const p of ["pages/whats-new.html", "pages/cool.html", "pages/error/404.html"]) {
      const res = await page.goto(`/years/2014/${p}`);
      expect(res && res.ok(), p).toBeTruthy();
    }
  });

  test("map renders 2014 branches", async ({ page }) => {
    await page.goto("/years/2014/pages/map.html");
    const tree = page.locator("[data-itt-flow-map]");
    await expect(tree).toBeVisible();
    await expect(tree).toContainText(/WhatsApp/i, { timeout: 10000 });
    await expect(tree).toContainText(/Heartbleed|iPhone 6/i);
    await expect(tree.locator("a[href*='whatsapp']").first()).toBeVisible();
  });
});

test.describe("2014 dirbar + iframe trails", () => {
  test("dirbar buttons open P0 rooms", async ({ page }) => {
    await enterYear(page, "2014");
    const targets = [
      ["WhatsApp", /WhatsApp/i],
      ["Heartbleed", /Heartbleed|CVE-2014-0160/i],
      ["iPhone 6", /iPhone 6/i],
      ["Ice Bucket", /Ice Bucket|ALS/i],
      ["1B sites", /968,882,453|billion/i],
      ["Chrome", /Chrome/i],
      ["Win10 TP", /Technical Preview|Insider|not retail/i],
    ];
    for (const [label, re] of targets) {
      await page.evaluate(() => {
        const bd = document.getElementById("modal-backdrop");
        if (bd) {
          bd.style.display = "none";
          bd.classList.remove("is-on");
        }
      });
      await page.locator("#dirbar .dir-btn", { hasText: label }).first().click({ force: true });
      await expect(contentFrame(page).locator("body")).toContainText(re, { timeout: 15000 });
    }
  });

  test("iframe guided WhatsApp → Heartbleed → iPhone", async ({ page }) => {
    await enterYear(page, "2014");
    await goInFrame(page, "sites/whatsapp/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/WhatsApp/i);
    await goInFrame(page, "sites/heartbleed/rotate.html");
    await expect(contentFrame(page).locator("body")).toContainText(/password/i);
    await goInFrame(page, "sites/iphone/pay.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Apple Pay|October/i);
  });
});

test.describe("2014 remaining REAL machines", () => {
  test("WhatsApp chat: no install / empty send do not write; send writes", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/chat.html");
    await clearKey(page, "itt14-wa-install");
    await clearKey(page, "itt14-wa-msgs");
    await page.reload();
    await page.fill("[data-wa-text]", "hello residual");
    await page.locator("[data-wa-send-btn]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-wa-msgs"))).toBeFalsy();

    await page.goto("/years/2014/sites/whatsapp/index.html");
    await page.fill("[data-wa-name]", "Glenn");
    await page.locator("[data-wa-install]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-install"))).toBeTruthy();

    await page.goto("/years/2014/sites/whatsapp/chat.html");
    await page.locator("[data-wa-send-btn]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-wa-msgs"))).toBeFalsy();
    await page.fill("[data-wa-text]", "ok after install");
    await page.locator("[data-wa-send-btn]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-msgs"))).toBeTruthy();
  });

  test("Ice Bucket empty name does not write", async ({ page }) => {
    await page.goto("/years/2014/sites/icebucket/index.html");
    await clearKey(page, "itt14-icebucket-posts");
    await page.reload();
    await page.locator("[data-ib-post]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-icebucket-posts"))).toBeFalsy();
    await page.fill("[data-ib-name]", "Pat residual");
    await page.fill("[data-ib-nom]", "Alex");
    await page.fill("[data-ib-nom-2]", "Sam");
    await page.fill("[data-ib-nom-3]", "Jordan");
    await page.locator("[data-ib-post]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-icebucket-posts"))).toBeTruthy();
  });

  test("Apple Pay needs nick + Touch ID", async ({ page }) => {
    await page.goto("/years/2014/sites/iphone/pay.html");
    await clearKey(page, "itt14-pay");
    await page.reload();
    await page.locator("[data-pay-enroll]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-pay"))).toBeFalsy();
    await page.fill("[data-pay-name]", "Visa 4242");
    await page.locator("[data-pay-touch]").check();
    await page.locator("[data-pay-enroll]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-pay"))).toBeTruthy();
  });

  test("Echo invite honesty required", async ({ page }) => {
    await page.goto("/years/2014/sites/echo/index.html");
    await clearKey(page, "itt14-echo");
    await page.reload();
    await page.locator("[data-echo-req]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-echo"))).toBeFalsy();
    await page.locator("[data-echo-invite]").check();
    await page.locator("[data-echo-not-mass]").check();
    await page.locator("[data-echo-req]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-echo"))).toBeTruthy();
  });

  test("iPhone 6 size picker writes", async ({ page }) => {
    await page.goto("/years/2014/sites/iphone/index.html");
    await clearKey(page, "itt14-iphone6");
    await page.reload();
    await page.locator('[data-ip6-size="6plus"]').click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-iphone6"))).toBeFalsy();
    await page.locator("[data-ip6-not-x]").check();
    await page.locator('[data-ip6-size="6plus"]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-iphone6"))).toBeTruthy();
  });

  test("Serial heard writes", async ({ page }) => {
    await page.goto("/years/2014/sites/serial/index.html");
    await clearKey(page, "itt14-serial");
    await page.reload();
    await page.locator("[data-serial-heard]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-serial"))).toBeFalsy();
    await page.locator("[data-serial-oct]").check();
    await page.locator("[data-serial-no-crime]").check();
    await page.locator("[data-serial-heard]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-serial"))).toBeTruthy();
  });

  test("Twitch channel + two checks write itt14-twitch", async ({ page }) => {
    await page.goto("/years/2014/sites/twitch/index.html");
    await clearKey(page, "itt14-twitch");
    await page.reload();
    await page.locator("[data-twitch-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-twitch"))).toBeFalsy();
    await page.fill("[data-twitch-channel]", "summit residual");
    await page.locator("[data-twitch-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-twitch"))).toBeFalsy();
    await page.locator("[data-twitch-live]").check();
    await page.locator("[data-twitch-not-ott]").check();
    await page.locator("[data-twitch-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-twitch"))).toBeTruthy();
  });

  for (const room of [
    { path: "sites/billion/index.html", key: "itt14-billion-ack", label: "1B" },
    { path: "sites/iphone/bendgate.html", key: "itt14-bendgate", label: "Bendgate" },
    { path: "sites/oculus/index.html", key: "itt14-oculus", label: "Oculus" },
    { path: "sites/alibaba/index.html", key: "itt14-alibaba", label: "Alibaba" },
    { path: "sites/material/index.html", key: "itt14-material", label: "Material" },
  ]) {
    test(`${room.label} literacy needs ≥2`, async ({ page }) => {
      await page.goto(`/years/2014/${room.path}`);
      await clearKey(page, room.key);
      await page.reload();
      await page.locator("[data-req]").first().check();
      await page.locator("[data-itt-real-save]").click();
      await page.waitForTimeout(120);
      expect(await page.evaluate((k) => localStorage.getItem(k), room.key)).toBeFalsy();
      await page.locator("[data-req]").nth(1).check();
      await page.locator("[data-itt-real-save]").click();
      await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), room.key)).toBeTruthy();
    });
  }

  test("Chrome one-click gone; three checks write itt14-chrome", async ({ page }) => {
    await page.goto("/years/2014/sites/chrome/index.html");
    await clearKey(page, "itt14-chrome");
    await page.reload();
    expect(await page.locator("[data-chrome-download]").count()).toBe(0);
    await page.locator("[data-chrome14-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-chrome"))).toBeFalsy();
    await page.locator("[data-chrome14-habit]").check();
    await page.locator("[data-chrome14-not-edge]").check();
    await page.locator("[data-chrome14-dl]").check();
    await page.locator("[data-chrome14-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-chrome"))).toBeTruthy();
  });

  test("Tile Fold canvas mounts", async ({ page }) => {
    await page.goto("/years/2014/sites/playable/game.html");
    await expect(page.locator("#game-canvas, canvas").first()).toBeVisible();
    await expect(page.locator("body")).toContainText(/Tile Fold|2048/i);
  });

  test("Slack honesty is not the one-thing", async ({ page }) => {
    await page.goto("/years/2014/sites/slack/index.html");
    await expect(page.locator("body")).toContainText(/2013|February 2014|not the 2014 one-thing|WhatsApp/i);
  });
});
