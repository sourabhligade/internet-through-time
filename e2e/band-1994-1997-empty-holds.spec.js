// @ts-check
/**
 * Phase 3 lock for 1994–1997. Empty, trap, one character, and missing ticks
 * leave the star empty. Score 0 on Hotlist and Planets writes nothing.
 * The 841-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((list) => {
    list.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

async function verbReady(page) {
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

test.describe("1994-1997 phase 3 empty holds", () => {
  test("CSotD empty, one character, missing pick, and trap leave the star empty", async ({ page }) => {
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await verbReady(page);
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt94-csotd") === 0)
        .forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem("itt94-csotd-wandered");
    });

    await page.locator("[data-lo-trap]").first().click();
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    expect(await raw(page, "itt94-csotd")).toBeNull();

    await page.fill("[name='gbname']", "A");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    expect(await raw(page, "itt94-csotd")).toBeNull();

    await page.fill("[name='gbname']", "Glenn residual");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    expect(await raw(page, "itt94-csotd")).toBeNull();

    await page.locator("[data-official-pick='today']").click();
    await page.fill("[name='gbname']", "A");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    expect(await raw(page, "itt94-csotd")).toBeNull();
  });

  test("SSL empty, one character, short card, and short city leave the star empty", async ({ page }) => {
    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await verbReady(page);
    await clearKeys(page, ["itt95-ssl-checkout"]);

    await page.locator("[data-lo-trap]").first().click();
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    await expect(page.locator("[data-ssl-status], [data-itt-action-status]").first()).toContainText(/required|dest first|Incomplete never writes/i);
    expect(await raw(page, "itt95-ssl-checkout")).toBeNull();

    await page.fill("[name='name']", "A");
    await page.fill("[name='card']", "4111");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    expect(await raw(page, "itt95-ssl-checkout")).toBeNull();

    await page.fill("[name='name']", "Ada");
    await page.fill("[name='card']", "411");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    expect(await raw(page, "itt95-ssl-checkout")).toBeNull();

    await page.fill("[name='name']", "Ada");
    await page.fill("[name='card']", "4111");
    await page.fill("[name='city']", "S");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    expect(await raw(page, "itt95-ssl-checkout")).toBeNull();
  });

  test("Portal trap, short verb, and fewer than three visits leave the star empty", async ({ page }) => {
    await page.goto("/years/1996/sites/portals/wars.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt96-portal-wars");
      sessionStorage.removeItem("itt96-portal-progress");
    });

    const traps = page.locator("[data-lo-trap], [data-official-trap]");
    const n = await traps.count();
    for (let i = 0; i < n; i++) await traps.nth(i).click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();

    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();

    await page.locator("[data-official-need]").fill("Y");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();

    await page.locator("[data-official-need]").fill("Yahoo home");
    await page.locator("[data-official-req]").nth(1).uncheck();
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();

    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();

    await page.goto("/years/1996/sites/yahoo/index.html");
    expect(await raw(page, "itt96-portal-wars")).toBeNull();
    await page.goto("/years/1996/sites/excite/index.html");
    expect(await raw(page, "itt96-portal-wars")).toBeNull();
  });

  test("PointCast trap, one channel, one character, and missing ticks leave the star empty", async ({
    page,
  }) => {
    await page.goto("/years/1997/sites/pointcast/index.html");
    await verbReady(page);
    await clearKeys(page, ["itt97-pointcast"]);

    const traps = page.locator("[data-pc-trap], [data-official-trap], [data-lo-trap]");
    const n = await traps.count();
    for (let i = 0; i < n; i++) await traps.nth(i).click();
    await page.locator("[data-pc-sub='News']").click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();

    await page.locator("[data-official-need]").fill("P");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-pc-sub='News']").click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();

    await page.reload();
    await verbReady(page);
    await clearKeys(page, ["itt97-pointcast"]);
    await page.locator("[data-official-need]").fill("PointCast");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-pc-sub='News']").click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();

    await page.reload();
    await verbReady(page);
    await clearKeys(page, ["itt97-pointcast"]);
    await page.locator("[data-official-need]").fill("PointCast");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-pc-sub='News']").click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();
  });

  test("PointCast two channels still write after the empty holds", async ({ page }) => {
    await page.goto("/years/1997/sites/pointcast/index.html");
    await verbReady(page);
    await clearKeys(page, ["itt97-pointcast"]);
    await page.locator("[data-pc-sub='News']").click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();
    await page.locator("[data-pc-sub='Weather']").click();
    await expect.poll(() => raw(page, "itt97-pointcast"), { timeout: 8000 }).toBeTruthy();
    const saved = JSON.parse((await raw(page, "itt97-pointcast")) || "null");
    expect(saved.kind).toBe("official");
    expect(saved.real).toBe(true);
  });

  test("Hotlist score 0, Start, trap, and a short verb leave the game and the year star empty", async ({
    page,
  }) => {
    await page.goto("/years/1994/sites/playable/game.html");
    await verbReady(page);
    await page.waitForFunction(() => !!(window.ITT && window.ITT.YearGame && window.ITT.YearGame.saveBest));
    await clearKeys(page, ["itt94-game-hotlist", "itt94-csotd"]);

    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(200);
    await page.locator("[data-official-trap]").click();
    const refused = await page.evaluate(() => {
      const blob = window.ITT.YearGame.saveBest("hotlist", 0, { year: "1994" });
      window.ITTYearGameOnScore("hotlist", 0);
      const status = document.querySelector("[data-itt-action-status], #play-status");
      return { blob: blob, status: status ? status.textContent : "" };
    });
    expect(refused.blob).toBeNull();
    expect(refused.status || "").not.toContain("blocked the save");
    expect(await raw(page, "itt94-game-hotlist")).toBeNull();
    expect(await raw(page, "itt94-csotd")).toBeNull();

    await page.locator("[data-official-need]").fill("A");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt94-game-hotlist")).toBeNull();
    expect(await raw(page, "itt94-csotd")).toBeNull();

    await page.locator("[data-official-need]").fill("Year game");
    await page.locator("[data-official-req]").nth(1).uncheck();
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt94-game-hotlist")).toBeNull();
    expect(await raw(page, "itt94-csotd")).toBeNull();
  });

  test("Planets score 0, Start, trap, and a short verb leave the game and the year star empty", async ({
    page,
  }) => {
    await page.goto("/years/1996/sites/playable/game.html");
    await verbReady(page);
    await page.waitForFunction(() => !!(window.ITT && window.ITT.YearGame && window.ITT.YearGame.saveBest));
    await clearKeys(page, ["itt96-game-planets", "itt96-portal-wars"]);

    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(200);
    await page.locator("[data-official-trap]").click();
    const refused = await page.evaluate(() => window.ITT.YearGame.saveBest("planets", 0, { year: "1996" }));
    expect(refused).toBeNull();
    expect(await raw(page, "itt96-game-planets")).toBeNull();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();

    await page.locator("[data-official-need]").fill("A");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt96-game-planets")).toBeNull();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();

    await page.locator("[data-official-need]").fill("Year game");
    await page.locator("[data-official-req]").nth(1).uncheck();
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt96-game-planets")).toBeNull();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();
  });
});
