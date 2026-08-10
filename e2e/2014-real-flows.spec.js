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
