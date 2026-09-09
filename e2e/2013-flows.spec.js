// @ts-check
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

test.skip(!fs.existsSync(path.join(__dirname, "..", "years", "2013", "index.html")), "2013 wiped");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}
test.describe("2013 flows", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2013/pages/about.html");
        await expect(page.locator("body")).toContainText("672,985,183");
    await expect(page.locator("body")).toContainText("861 million");
    await expect(page.locator("body")).toContainText("Stories");
    await expect(page.locator("body")).toContainText("Vine");
  });
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2013/pages/home.html");
    await expect(page.locator("#ott-guided-2013 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2013"]')).toBeVisible();
  });
  test("star trap + empty never write; complete writes itt13-vine-posts", async ({ page }) => {
    await page.goto("/years/2013/sites/vine/record.html");
    await page.evaluate(() => localStorage.removeItem("itt13-vine-posts"));
    await page.reload();
    await page.locator("[data-vn13-trap]").click();
    await page.locator("[data-vn13-post]").click();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
    await page.locator("[data-vn13-hold]").click();
    await page.locator("[data-vn13-post]").click();
    await expect.poll(() => getKey(page, "itt13-vine-posts")).toBeTruthy();
  });
  test("Chrome IE trap / empty URL never writes; habit writes", async ({ page }) => {
    await page.goto("/years/2013/sites/chrome/index.html");
    await page.evaluate(() => localStorage.removeItem("itt13-chrome"));
    await page.reload();
    await page.locator("[data-ch13-ie]").click();
    expect(await getKey(page, "itt13-chrome")).toBeFalsy();
    await page.locator("[data-ch13-req]").nth(0).check();
    await page.locator("[data-ch13-req]").nth(1).check();
    await page.locator("[data-ch13-ack]").click();
    expect(await getKey(page, "itt13-chrome")).toBeFalsy();
    await page.locator('[data-ch13-pick="habit"]').click();
    await page.fill("[data-ch13-field]", "youtube.com");
    await page.locator("[data-ch13-ack]").click();
    await expect.poll(() => getKey(page, "itt13-chrome")).toBeTruthy();
  });

  test("Telegram WhatsApp trap / empty never writes; send writes", async ({ page }) => {
    await page.goto("/years/2013/sites/telegram/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-telegram-chat");
      localStorage.removeItem("itt13-vine-posts");
    });
    await page.reload();
    await page.locator("[data-tg13-wa]").click();
    expect(await getKey(page, "itt13-telegram-chat")).toBeFalsy();
    await page.locator("[data-tg13-req]").nth(0).check();
    await page.locator("[data-tg13-req]").nth(1).check();
    await page.locator("[data-tg13-send]").click();
    expect(await getKey(page, "itt13-telegram-chat")).toBeFalsy();
    await page.fill("[data-tg13-msg]", "cloud leftover");
    await page.locator("[data-tg13-send]").click();
    await expect.poll(() => getKey(page, "itt13-telegram-chat")).toBeTruthy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
  });

  test("Medium tweet trap / empty never writes; publish writes", async ({ page }) => {
    await page.goto("/years/2013/sites/medium/index.html");
    await page.evaluate(() => localStorage.removeItem("itt13-medium"));
    await page.reload();
    await page.locator("[data-med13-tweet]").click();
    expect(await getKey(page, "itt13-medium")).toBeFalsy();
    await page.locator("[data-med13-req]").nth(0).check();
    await page.locator("[data-med13-req]").nth(1).check();
    await page.locator("[data-med13-publish]").click();
    expect(await getKey(page, "itt13-medium")).toBeFalsy();
    await page.fill("[data-med13-draft]", "a short leftover essay");
    await page.locator("[data-med13-publish]").click();
    await expect.poll(() => getKey(page, "itt13-medium")).toBeTruthy();
  });

  test("Ask.fm leftover-3× empty never writes · complete leftover · gold empty", async ({ page }) => {
    await page.goto("/years/2013/sites/askfm/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-pop-askfm");
      localStorage.removeItem("itt13-vine-posts");
    });
    await page.reload();
    const go = page.locator("[data-pop-go][data-pop-id='askfm']").first();
    await go.click();
    expect(await getKey(page, "itt13-pop-askfm")).toBeFalsy();
    const panel = page.locator("[data-pop-panel]").filter({ has: go }).first();
    await panel.locator("[data-pop-pick='keep']").click();
    const reqs = panel.locator("[data-pop-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await panel.locator("[data-pop-field]").fill("ask leftover");
    await go.click();
    await expect.poll(() => getKey(page, "itt13-pop-askfm")).toBeTruthy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
  });

  test("Vine leftover-2× empty never writes · lx then d2 · gold empty", async ({ page }) => {
    await page.goto("/years/2013/sites/vine/record.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-vine-lx");
      localStorage.removeItem("itt13-vine-d2");
      localStorage.removeItem("itt13-vine-posts");
    });
    await page.reload();
    const p1 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="vine-lx"]') }).first();
    await p1.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt13-vine-lx")).toBeFalsy();
    await p1.locator("[data-lo-pick='keep']").click();
    const r1 = p1.locator("[data-lo-req]");
    for (let i = 0; i < (await r1.count()); i++) await r1.nth(i).check();
    await p1.locator("[data-lo-field]").fill("vine leftover");
    await p1.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt13-vine-lx")).toBeTruthy();
    const p2 = page.locator("[data-lo-panel]").filter({ has: page.locator('[data-lo-save][data-lo-key="vine-d2"]') }).first();
    await p2.locator("[data-lo-pick='keep']").click();
    const r2 = p2.locator("[data-lo-req]");
    for (let i = 0; i < (await r2.count()); i++) await r2.nth(i).check();
    await p2.locator("[data-lo-field]").fill("vine leftover two");
    await p2.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt13-vine-d2")).toBeTruthy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
  });

  test("Snap Stories trap/empty never writes then save", async ({ page }) => {
    await page.goto("/years/2013/sites/snapchat/story.html");
    await page.evaluate(() => localStorage.removeItem("itt13-snap-story"));
    await page.reload();
    await page.locator("[data-sn13-ig]").click();
    await page.locator("[data-sn13-post]").click();
    expect(await getKey(page, "itt13-snap-story")).toBeFalsy();
    await page.locator("[data-sn13-req]").nth(0).check();
    await page.locator("[data-sn13-req]").nth(1).check();
    await page.locator('[data-sn13-snap="a"]').click();
    await page.locator('[data-sn13-snap="b"]').click();
    await page.locator("[data-sn13-post]").click();
    await expect.poll(() => getKey(page, "itt13-snap-story")).toBeTruthy();
  });

  test("Snowden empty never writes · complete leftover literacy · gold empty", async ({ page }) => {
    await page.goto("/years/2013/sites/snowden/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-snowden-ack");
      localStorage.removeItem("itt13-vine-posts");
    });
    await page.reload();
    const goldTrap = page.locator("[data-lo-trap]").first();
    if (await goldTrap.count()) await goldTrap.click();
    await page.locator("[data-sd13-ack]").click();
    expect(await getKey(page, "itt13-snowden-ack")).toBeFalsy();
    await page.locator("[data-sd13-req]").nth(0).check();
    await page.locator("[data-sd13-req]").nth(1).check();
    await page.locator("[data-sd13-ack]").click();
    await expect.poll(() => getKey(page, "itt13-snowden-ack")).toBeTruthy();
    expect(await getKey(page, "itt13-vine-posts")).toBeFalsy();
    const next = page.locator('[data-next-when-key="itt13-snowden-ack"] a').first();
    await expect(next).toBeVisible();
    const href = await next.getAttribute("href");
    const res = await page.request.get(new URL(href || "", page.url()).href);
    expect(res.status(), href).toBeLessThan(400);
  });

  test("second leftover dests Chrome · Snowden · Telegram exist and are not the gold", async ({ page }) => {
    await page.goto("/years/2013/pages/home.html");
    await expect(page.locator("#ott-guided-2013 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2013"]')).toHaveAttribute("href", /vine\/record/);
    for (const dest of ["sites/chrome/index.html", "sites/snowden/index.html", "sites/telegram/index.html"]) {
      const res = await page.request.get("/years/2013/" + dest);
      expect(res.status(), dest).toBeLessThan(400);
    }
  });
});
