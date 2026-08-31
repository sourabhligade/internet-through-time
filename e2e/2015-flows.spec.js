// @ts-check
const { test, expect } = require("@playwright/test");


async function clearKey(page, key) {
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

test.describe("2015 flows", () => {
  test("Periscope empty title never writes; titled go-live writes", async ({ page }) => {
    await page.goto("/years/2015/sites/periscope/index.html");
    await clearKey(page, "itt15-periscope");
    await page.reload();
    await page.locator("[data-peri-live]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-periscope"))).toBeFalsy();
    await page.fill("[data-peri-title]", "museum rooftop");
    await page.locator("[data-peri-live]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt15-periscope")))
      .toMatch(/museum rooftop/);
    await page.reload();
    await expect(page.locator("[data-peri-title]")).toHaveValue("museum rooftop");
  });

  test("Photos empty backup never writes; pick+backup writes", async ({ page }) => {
    await page.goto("/years/2015/sites/googlephotos/index.html");
    await clearKey(page, "itt15-googlephotos");
    await page.reload();
    await page.locator("[data-gp-backup]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-googlephotos"))).toBeFalsy();
    await page.locator('[data-photo-pick="beach"]').click();
    await page.locator("[data-gp-backup]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt15-googlephotos")))
      .toBeTruthy();
  });

  test("Win10 incomplete never writes; two ticks + reserve writes", async ({ page }) => {
    await page.goto("/years/2015/sites/windows10/index.html");
    await clearKey(page, "itt15-win10");
    await page.reload();
    await page.locator("[data-win10-reserve]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-win10"))).toBeFalsy();
    await page.locator("[data-req]").nth(0).check({ force: true });
    await page.locator("[data-req]").nth(1).check({ force: true });
    await page.locator("[data-win10-reserve]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-win10"))).toBeTruthy();
  });

  test("Music empty trial never writes; name + start writes", async ({ page }) => {
    await page.goto("/years/2015/sites/applemusic/index.html");
    await clearKey(page, "itt15-applemusic");
    await page.reload();
    await page.locator("[data-am-trial]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-applemusic"))).toBeFalsy();
    await page.fill("[data-am-account]", "museum fan");
    await page.locator("[data-am-trial]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-applemusic"))).toMatch(/museum fan/);
  });

  test("Edge / Watch leftover / Discover / Discord / LE / Echo write only when complete", async ({ page }) => {
    await page.goto("/years/2015/sites/edge/index.html");
    await clearKey(page, "itt15-edge");
    await page.reload();
    await page.locator("[data-edge-prefer]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-edge"))).toBeFalsy();
    await page.locator("[data-req]").check({ force: true });
    await page.locator("[data-edge-prefer]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-edge"))).toBeTruthy();

    await page.goto("/years/2015/sites/apple/watch.html");
    await clearKey(page, "itt15-watch");
    await page.reload();
    await page.locator("[data-watch-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-watch"))).toBeFalsy();
    await page.locator("[data-watch-face]").selectOption({ index: 1 });
    await page.locator("[data-watch-band]").selectOption({ index: 1 });
    await page.locator("[data-req]").check({ force: true });
    await page.locator("[data-watch-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-watch"))).toBeTruthy();

    await page.goto("/years/2015/sites/snapchat/discover.html");
    await clearKey(page, "itt15-snap-discover");
    await page.reload();
    await page.locator('[data-discover-tile="Vice"]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-snap-discover"))).toMatch(/Vice/);

    await page.goto("/years/2015/sites/discord/index.html");
    await clearKey(page, "itt15-discord");
    await page.reload();
    await page.locator("[data-dc-join]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-discord"))).toBeFalsy();
    await page.fill("[data-dc-server]", "raid-night");
    await page.locator("[data-dc-join]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-discord"))).toMatch(/raid-night/);

    await page.goto("/years/2015/sites/letsencrypt/index.html");
    await clearKey(page, "itt15-le");
    await page.reload();
    await page.locator("[data-le-request]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-le"))).toBeFalsy();
    await page.fill("[data-le-domain]", "example.com");
    await page.locator("[data-le-request]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-le"))).toMatch(/example.com/);

    await page.goto("/years/2015/sites/echo/index.html");
    await clearKey(page, "itt15-echo");
    await page.reload();
    await page.locator("[data-echo-order]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-echo"))).toBeFalsy();
    await page.locator("[data-req]").check({ force: true });
    await page.locator("[data-echo-order]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-echo"))).toBeTruthy();
  });

  test("thesis / literacy / leftover residual rooms load and do not steal the star key", async ({ page }) => {
    await page.goto("/years/2015/pages/about.html");
    await expect(page.locator("body")).toContainText("863,105,652");
    await expect(page.locator("body")).toContainText("−11%");
    await clearKey(page, "itt15-thesis-ack");
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-thesis-ack"))).toBeFalsy();
    await page.locator("[data-thesis-req]").nth(0).check({ force: true });
    await page.locator("[data-thesis-req]").nth(1).check({ force: true });
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-thesis-ack"))).toBeTruthy();

    await page.goto("/years/2015/sites/periscope/watch.html");
    await expect(page.locator("body")).toContainText(/someone else's eyes/i);
    await page.goto("/years/2015/sites/meerkat/index.html");
    await expect(page.locator("body")).toContainText(/SXSW/i);
    expect(await page.locator("[data-peri-live]").count()).toBe(0);
    await page.goto("/years/2015/sites/fblive/index.html");
    await expect(page.locator("body")).toContainText(/celebs|Mentions|not you/i);
    expect(await page.evaluate(() => localStorage.getItem("itt15-fblive-live"))).toBeFalsy();
    expect(await page.locator("[data-peri-live]").count()).toBe(0);

    await page.goto("/years/2015/sites/googlephotos/library.html");
    await expect(page.locator("body")).toContainText(/beach|locker|Search/i);
    await page.goto("/years/2015/sites/applemusic/beats1.html");
    await expect(page.locator("body")).toContainText(/Zane Lowe|Beats 1/i);
    await page.goto("/years/2015/sites/applemusic/index.html");
    await expect(page.locator("body")).toContainText(/Taylor/i);
    await page.goto("/years/2015/sites/windows10/upgrade.html");
    await expect(page.locator("body")).toContainText(/EdgeHTML|Spartan|not Chromium/i);

    await page.goto("/years/2015/sites/ios9/blockers.html");
    await clearKey(page, "itt15-blockers");
    await page.reload();
    await page.locator("[data-block-enable]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt15-blockers"))).toBeFalsy();
    await page.locator("[data-req]").check({ force: true });
    await page.locator("[data-block-enable]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-blockers"))).toBeTruthy();
  });

  test("official 10-stop trail hrefs return 200 and n1 is Periscope", async ({ page, request }) => {
    await page.goto("/years/2015/pages/map.html");
    const ten = page.locator("[data-itt-ten-flows] li");
    await expect(ten).toHaveCount(10, { timeout: 20000 });
    await expect(ten.first()).toContainText(/Periscope/i);
    const hrefs = await page.locator("[data-itt-ten-flows] a").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "").filter(Boolean)
    );
    expect(hrefs[0]).toMatch(/periscope/);
    for (const h of hrefs) {
      const url = new URL(h, "http://127.0.0.1:8080/years/2015/pages/map.html").href;
      const res = await request.get(url);
      expect(res.status(), url).toBe(200);
    }
  });
});
