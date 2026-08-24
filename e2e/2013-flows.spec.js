// @ts-check
const { test, expect } = require("@playwright/test");
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
    await page.locator("[data-vn13-req]").nth(0).check();
    await page.locator("[data-vn13-req]").nth(1).check();
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
    await page.locator('[data-ch13-pick="ie"]').click();
    await page.locator("[data-ch13-ack]").click();
    expect(await getKey(page, "itt13-chrome")).toBeFalsy();
    await page.locator('[data-ch13-pick="habit"]').click();
    await page.fill("[data-ch13-field]", "youtube.com");
    await page.locator("[data-ch13-ack]").click();
    await expect.poll(() => getKey(page, "itt13-chrome")).toBeTruthy();
  });

  test("Telegram WhatsApp trap / empty never writes; send writes", async ({ page }) => {
    await page.goto("/years/2013/sites/telegram/chat.html");
    await page.evaluate(() => localStorage.removeItem("itt13-telegram-chat"));
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

  test("HealthCare.gov fine/retry never writes; enroll writes 503", async ({ page }) => {
    await page.goto("/years/2013/sites/healthcare/index.html");
    await page.evaluate(() => localStorage.removeItem("itt13-healthcare"));
    await page.reload();
    await page.locator("[data-hc13-fine]").click();
    expect(await getKey(page, "itt13-healthcare")).toBeFalsy();
    await page.goto("/years/2013/sites/healthcare/status.html");
    await page.locator("[data-hc13-retry]").click();
    expect(await getKey(page, "itt13-healthcare")).toBeFalsy();
    await page.goto("/years/2013/sites/healthcare/index.html");
    await page.locator("[data-hc13-apply]").click();
    await expect.poll(() => getKey(page, "itt13-healthcare")).toBeTruthy();
  });

  test("iPhone 5c Face ID / no color never writes; color writes", async ({ page }) => {
    await page.goto("/years/2013/sites/iphone/5c.html");
    await page.evaluate(() => localStorage.removeItem("itt13-iphone5c"));
    await page.reload();
    await page.locator("[data-5c-face]").click();
    expect(await getKey(page, "itt13-iphone5c")).toBeFalsy();
    await page.locator("[data-5c-req]").nth(0).check();
    await page.locator("[data-5c-req]").nth(1).check();
    await page.locator("[data-5c-ack]").click();
    expect(await getKey(page, "itt13-iphone5c")).toBeFalsy();
    await page.locator('[data-5c-color="green"]').click();
    await page.locator("[data-5c-ack]").click();
    await expect.poll(() => getKey(page, "itt13-iphone5c")).toBeTruthy();
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
    await page.locator('[data-sn13-snap="one"]').click();
    await page.locator('[data-sn13-snap="two"]').click();
    await page.locator("[data-sn13-post]").click();
    await expect.poll(() => getKey(page, "itt13-snap-story")).toBeTruthy();
  });

  test("second leftover 3× is Chrome · Snowden · Telegram and not the third trio", async ({ page }) => {
    await page.goto("/years/2013/pages/home.html");
    await expect(page.locator("#ott-guided-2013 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2013"]')).toHaveAttribute("href", /vine\/record/);
    const more = page.locator('[data-itt-pop-more="2013"] a[href*="sites/"]');
    const third = page.locator('[data-itt-pop-3x3="2013"] a[href*="sites/"]');
    await expect(more).toHaveCount(3);
    await expect(third).toHaveCount(3);
    const moreH = await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""));
    const thirdH = await third.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""));
    expect(moreH.join(" ")).toMatch(/chrome\//);
    expect(moreH.join(" ")).toMatch(/snowden\//);
    expect(moreH.join(" ")).toMatch(/telegram\//);
    for (const h of moreH) expect(thirdH).not.toContain(h);
  });
});
