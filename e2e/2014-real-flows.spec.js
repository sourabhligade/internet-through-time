// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2014 REAL flows", () => {
  test("thesis incomplete does not write", async ({ page }) => {
    await page.goto("/years/2014/pages/about.html");
    await page.evaluate(() => localStorage.removeItem("itt14-thesis-ack"));
    await page.reload();
    await page.locator("[data-req]").first().check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem("itt14-thesis-ack"))).toBeFalsy();
  });

  test("thesis complete writes itt14-thesis-ack", async ({ page }) => {
    await page.goto("/years/2014/pages/about.html");
    await page.evaluate(() => localStorage.removeItem("itt14-thesis-ack"));
    await page.reload();
    const boxes = page.locator("[data-req]");
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-thesis-ack"))).toBeTruthy();
  });

  test("WhatsApp empty install does not write; name writes", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-wa-install"));
    await page.reload();
    await page.locator("[data-wa-install]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-wa-install"))).toBeFalsy();
    await page.fill("[data-wa-name]", "Glenn residual");
    await page.locator("[data-wa-install]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-install"))).toBeTruthy();
  });

  test("Heartbleed rotate needs ≥2", async ({ page }) => {
    await page.goto("/years/2014/sites/heartbleed/rotate.html");
    await page.evaluate(() => localStorage.removeItem("itt14-heartbleed-rotate"));
    await page.reload();
    await page.locator("[data-req]").first().check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-heartbleed-rotate"))).toBeFalsy();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt14-heartbleed-rotate")))
      .toBeTruthy();
  });

  test("Win10 TP requires honesty", async ({ page }) => {
    await page.goto("/years/2014/sites/windows10/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-win10tp"));
    await page.reload();
    await page.locator("[data-w10-try]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-win10tp"))).toBeFalsy();
    await page.locator("[data-w10-honest]").check();
    await page.locator("[data-w10-not-free]").check();
    await page.locator("[data-w10-try]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-win10tp"))).toBeTruthy();
  });

  test("Chrome habit REAL: one-click gone; three checks write itt14-chrome", async ({ page }) => {
    await page.goto("/years/2014/sites/chrome/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-chrome"));
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

  test("Cardboard incomplete blocked; both checks write itt14-cardboard", async ({ page }) => {
    await page.goto("/years/2014/sites/cardboard/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-cardboard"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-cardboard"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-cardboard"))).toBeFalsy();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-cardboard"))).toBeTruthy();
  });

  test("Slack incomplete blocked; workspace + checks write itt14-slack", async ({ page }) => {
    await page.goto("/years/2014/sites/slack/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-slack"));
    await page.reload();
    await page.locator("[data-slack14-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-slack"))).toBeFalsy();
    await page.fill("[data-slack14-ws]", "museum-hq");
    await page.locator("[data-slack14-public]").check();
    await page.locator("[data-slack14-not-ott]").check();
    await page.locator("[data-slack14-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-slack"))).toBeTruthy();
  });

  test("Slack #general needs workspace; message reloads", async ({ page }) => {
    await page.goto("/years/2014/sites/slack/channel.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt14-slack");
      localStorage.removeItem("itt14-slack-msgs");
    });
    await page.reload();
    await page.locator("[data-slack14-msg]").fill("ship it");
    await page.locator("[data-slack14-send]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-slack-msgs"))).toBeFalsy();
    await page.goto("/years/2014/sites/slack/index.html");
    await page.fill("[data-slack14-ws]", "museum-hq");
    await page.locator("[data-slack14-public]").check();
    await page.locator("[data-slack14-not-ott]").check();
    await page.locator("[data-slack14-save]").click();
    await page.goto("/years/2014/sites/slack/channel.html");
    await page.locator("[data-slack14-msg]").fill("ship it");
    await page.locator("[data-slack14-send]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-slack-msgs"))).toMatch(/ship it/);
    await page.reload();
    await expect(page.locator("[data-slack14-thread]")).toContainText("ship it");
  });

  test("Secret empty post blocked; handle+text write itt14-secret-posts", async ({ page }) => {
    await page.goto("/years/2014/sites/secret/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-secret-posts"));
    await page.reload();
    await page.locator("[data-secret-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-secret-posts"))).toBeFalsy();
    await page.fill("[data-secret-name]", "anon");
    await page.fill("[data-secret-text]", "theater only");
    await page.locator("[data-secret-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-secret-posts"))).toBeTruthy();
  });

  test("Yik Yak harm check + reject threat; honest yak writes", async ({ page }) => {
    await page.goto("/years/2014/sites/yikyak/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-yikyak"));
    await page.reload();
    await page.fill("[data-yy-text]", "bomb scare");
    await page.locator("[data-yy-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-yikyak"))).toBeFalsy();
    await page.locator("[data-yy-honest]").check();
    await page.locator("[data-yy-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-yikyak"))).toBeFalsy();
    await page.fill("[data-yy-text]", "dining hall line");
    await page.locator("[data-yy-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-yikyak"))).toBeTruthy();
  });

  test("Ello manifesto required", async ({ page }) => {
    await page.goto("/years/2014/sites/ello/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-ello"));
    await page.reload();
    await page.locator("[data-ello-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-ello"))).toBeFalsy();
    await page.locator("[data-ello-manifesto]").check();
    await page.locator("[data-ello-not-dead]").check();
    await page.locator("[data-ello-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-ello"))).toBeTruthy();
  });

  test("Musical.ly not TikTok", async ({ page }) => {
    await page.goto("/years/2014/sites/musically/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-musically-ack"));
    await page.reload();
    await page.locator("[data-mly14-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-musically-ack"))).toBeFalsy();
    await page.locator("[data-mly14-seed]").check();
    await page.locator("[data-mly14-not-tt]").check();
    await page.locator("[data-mly14-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-musically-ack"))).toBeTruthy();
  });

  test("Watch announce requires ships-2015", async ({ page }) => {
    await page.goto("/years/2014/sites/apple/watch.html");
    await page.evaluate(() => localStorage.removeItem("itt14-watch-announce"));
    await page.reload();
    await page.locator("[data-watch-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-watch-announce"))).toBeFalsy();
    await page.locator("[data-watch-2015]").check();
    await page.locator("[data-watch-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-watch-announce"))).toBeTruthy();
  });

  test("iOS 8 residual REAL", async ({ page }) => {
    await page.goto("/years/2014/sites/iphone/ios8.html");
    await page.evaluate(() => localStorage.removeItem("itt14-ios8"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-ios8"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-ios8"))).toBeTruthy();
  });

  test("WhatsApp deal about REAL", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/about.html");
    await page.evaluate(() => localStorage.removeItem("itt14-wa-deal"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-wa-deal"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-deal"))).toBeTruthy();
  });

  test("Serial one-click blocked; two checks write itt14-serial", async ({ page }) => {
    await page.goto("/years/2014/sites/serial/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-serial"));
    await page.reload();
    await page.locator("[data-serial-heard]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-serial"))).toBeFalsy();
    await page.locator("[data-serial-oct]").check();
    await page.locator("[data-serial-no-crime]").check();
    await page.locator("[data-serial-heard]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-serial"))).toBeTruthy();
  });

  test("1B literacy incomplete blocked; both checks write itt14-billion-ack", async ({ page }) => {
    await page.goto("/years/2014/sites/billion/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-billion-ack"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-billion-ack"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-billion-ack"))).toBeTruthy();
  });

  test("iPhone 6 size requires not-X honesty; writes itt14-iphone6", async ({ page }) => {
    await page.goto("/years/2014/sites/iphone/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-iphone6"));
    await page.reload();
    await page.locator("[data-ip6-size='6']").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-iphone6"))).toBeFalsy();
    await page.locator("[data-ip6-not-x]").check();
    await page.locator("[data-ip6-size='6plus']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-iphone6"))).toBeTruthy();
  });

  test("Apple Pay empty enroll blocked; name+Touch ID write itt14-pay", async ({ page }) => {
    await page.goto("/years/2014/sites/iphone/pay.html");
    await page.evaluate(() => localStorage.removeItem("itt14-pay"));
    await page.reload();
    await page.locator("[data-pay-enroll]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-pay"))).toBeFalsy();
    await page.fill("[data-pay-name]", "Visa theater");
    await page.locator("[data-pay-touch]").check();
    await page.locator("[data-pay-enroll]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-pay"))).toBeTruthy();
  });

  test("Bendgate literacy REAL", async ({ page }) => {
    await page.goto("/years/2014/sites/iphone/bendgate.html");
    await page.evaluate(() => localStorage.removeItem("itt14-bendgate"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-bendgate"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-bendgate"))).toBeTruthy();
  });

  test("Ice Bucket name+nominate required; writes itt14-icebucket-posts", async ({ page }) => {
    await page.goto("/years/2014/sites/icebucket/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-icebucket-posts"));
    await page.reload();
    await page.locator("[data-ib-post]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-icebucket-posts"))).toBeFalsy();
    await page.fill("[data-ib-name]", "Pat");
    await page.fill("[data-ib-nom]", "Sam");
    await page.locator("[data-ib-post]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-icebucket-posts"))).toBeTruthy();
  });

  test("Twitch channel + two checks write itt14-twitch", async ({ page }) => {
    await page.goto("/years/2014/sites/twitch/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-twitch"));
    await page.reload();
    await page.locator("[data-twitch-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-twitch"))).toBeFalsy();
    await page.fill("[data-twitch-channel]", "museum-live");
    await page.locator("[data-twitch-live]").check();
    await page.locator("[data-twitch-not-ott]").check();
    await page.locator("[data-twitch-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-twitch"))).toBeTruthy();
  });

  test("Oculus literacy REAL", async ({ page }) => {
    await page.goto("/years/2014/sites/oculus/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-oculus"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-oculus"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-oculus"))).toBeTruthy();
  });

  test("Alibaba IPO literacy REAL", async ({ page }) => {
    await page.goto("/years/2014/sites/alibaba/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-alibaba"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-alibaba"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-alibaba"))).toBeTruthy();
  });

  test("Echo invite two checks write itt14-echo", async ({ page }) => {
    await page.goto("/years/2014/sites/echo/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-echo"));
    await page.reload();
    await page.locator("[data-echo-req]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-echo"))).toBeFalsy();
    await page.locator("[data-echo-invite]").check();
    await page.locator("[data-echo-not-mass]").check();
    await page.locator("[data-echo-req]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-echo"))).toBeTruthy();
  });

  test("Material literacy REAL", async ({ page }) => {
    await page.goto("/years/2014/sites/material/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-material"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-material"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-material"))).toBeTruthy();
  });

  test("WhatsApp chat empty blocked; install then send writes itt14-wa-msgs", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt14-wa-install");
      localStorage.removeItem("itt14-wa-msgs");
    });
    await page.reload();
    await page.fill("[data-wa-name]", "Glenn");
    await page.locator("[data-wa-install]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-install"))).toBeTruthy();
    await page.goto("/years/2014/sites/whatsapp/chat.html");
    await page.locator("[data-wa-send-btn]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-wa-msgs"))).toBeFalsy();
    await page.fill("[data-wa-text]", "hello 2014");
    await page.locator("[data-wa-send-btn]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-msgs"))).toBeTruthy();
  });

  test("Vine residual REAL", async ({ page }) => {
    await page.goto("/years/2014/sites/vine/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-vine-residual"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-vine-residual"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-vine-residual"))).toBeTruthy();
  });

  test("Flappy flood incomplete blocked; both checks write itt14-flappy-flood", async ({ page }) => {
    await page.goto("/years/2014/sites/playable/flappy-flood.html");
    await page.evaluate(() => localStorage.removeItem("itt14-flappy-flood"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-flappy-flood"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-flappy-flood"))).toBeTruthy();
  });

  test("2014 complete actions never write itt13-* or itt15-*", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await page.evaluate(() => {
      localStorage.setItem("itt13-vine-posts", '{"keep":1}');
      localStorage.setItem("itt15-watch", '{"keep":1}');
      localStorage.removeItem("itt14-wa-install");
    });
    await page.fill("[data-wa-name]", "iso");
    await page.locator("[data-wa-install]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-wa-install"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt13-vine-posts"))).toBe('{"keep":1}');
    expect(await page.evaluate(() => localStorage.getItem("itt15-watch"))).toBe('{"keep":1}');
  });

  test("Heartbleed intro incomplete blocked; both checks write itt14-hb-intro", async ({ page }) => {
    await page.goto("/years/2014/sites/heartbleed/index.html");
    await page.evaluate(() => localStorage.removeItem("itt14-hb-intro"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt14-hb-intro"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt14-hb-intro"))).toBeTruthy();
  });
});
