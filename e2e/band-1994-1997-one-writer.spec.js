// @ts-check
/**
 * Phase 2 lock for 1994–1997. One finish, one envelope.
 * Score 0 writes nothing. PointCast and CSotD read back kind official.
 * IUMA play stays a player. The full register walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function envelope(page, key) {
  const text = await raw(page, key);
  return text ? JSON.parse(text) : null;
}

test.describe("1994-1997 phase 2 one writer", () => {
  test("Hotlist score 0 writes nothing and a scored run stays official", async ({ page }) => {
    await page.goto("/years/1994/sites/playable/game.html?fast=1");
    await page.waitForFunction(
      () => !!(window.ITT && window.ITT.YearGame && window.ITT.YearGame.saveBest),
      null,
      { timeout: 15000 }
    );
    await page.evaluate(() => localStorage.removeItem("itt94-game-hotlist"));
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(250);
    expect(await raw(page, "itt94-game-hotlist")).toBeNull();

    const refused = await page.evaluate(() => {
      const blob = window.ITT.YearGame.saveBest("hotlist", 0, { year: "1994" });
      window.ITTYearGameOnScore("hotlist", 0);
      const status = document.querySelector("[data-itt-action-status], #play-status");
      return {
        blob: blob,
        stored: localStorage.getItem("itt94-game-hotlist"),
        status: status ? status.textContent : "",
      };
    });
    expect(refused.blob).toBeNull();
    expect(refused.stored).toBeNull();
    expect(refused.status).not.toContain("blocked the save");

    await page.evaluate(() => {
      window.ITT.YearGame.saveBest("hotlist", 12, { year: "1994" });
    });
    const saved = await envelope(page, "itt94-game-hotlist");
    expect(saved && saved.real).toBe(true);
    expect(saved.kind).toBe("official");
    expect(saved.best).toBeGreaterThanOrEqual(12);
    expect(saved.year).toBe("1994");
    await page.reload();
    await page.waitForFunction(
      () => !!(window.ITT && window.ITT.User && window.ITT.User.take),
      null,
      { timeout: 15000 }
    );
    const again = await envelope(page, "itt94-game-hotlist");
    expect(again && again.kind).toBe("official");
    expect(again.real).toBe(true);
  });

  test("Planets score 0 writes nothing and a scored run stays official", async ({ page }) => {
    await page.goto("/years/1996/sites/playable/game.html");
    await page.waitForFunction(
      () => !!(window.ITT && window.ITT.YearGame && window.ITT.YearGame.saveBest),
      null,
      { timeout: 15000 }
    );
    await page.evaluate(() => {
      localStorage.removeItem("itt96-game-planets");
      const missed = window.ITT.YearGame.saveBest("planets", 0, { year: "1996" });
      window.ITT.YearGame.saveBest("planets", 40, { year: "1996" });
      window.__phase2Missed = missed;
    });
    expect(await page.evaluate(() => window.__phase2Missed)).toBeNull();
    const saved = await envelope(page, "itt96-game-planets");
    expect(saved && saved.real).toBe(true);
    expect(saved.kind).toBe("official");
    expect(saved.year).toBe("1996");
    expect(saved.best).toBeGreaterThanOrEqual(40);
  });

  test("year-extras saveJSON passes kind and leaves a two-arg write inferred", async ({ page }) => {
    await page.goto("/years/1994/sites/playable/game.html");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    await page.addScriptTag({ url: "/js/immersion/year-extras-kit.js" });
    await page.evaluate(() => {
      const YX = window.ITT.YearExtras.forYear("1994");
      localStorage.removeItem("itt94-phase2-kind-probe");
      localStorage.removeItem("itt94-phase2-infer-probe");
      YX.saveJSON("itt94-phase2-kind-probe", { note: "probe" }, { kind: "leftover", year: "1994" });
      YX.saveJSON("itt94-phase2-infer-probe", { note: "probe" });
    });
    const passed = await envelope(page, "itt94-phase2-kind-probe");
    const inferred = await envelope(page, "itt94-phase2-infer-probe");
    expect(passed && passed.kind).toBe("leftover");
    expect(passed.real).toBe(true);
    expect(passed.year).toBe("1994");
    expect(inferred && inferred.kind).toBe("toy");
    await page.evaluate(() => {
      localStorage.removeItem("itt94-phase2-kind-probe");
      localStorage.removeItem("itt94-phase2-infer-probe");
    });
  });

  test("PointCast one channel writes nothing and two channels are official", async ({ page }) => {
    await page.goto("/years/1997/sites/pointcast/index.html");
    await page.waitForFunction(
      () => !!document.querySelector("[data-pc-sub='News']"),
      null,
      { timeout: 15000 }
    );
    await page.evaluate(() => localStorage.removeItem("itt97-pointcast"));
    await page.locator("[data-pc-trap]").click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();
    await page.locator('[data-pc-sub="News"]').click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();
    await page.locator('[data-pc-sub="Weather"]').click();
    await expect.poll(() => raw(page, "itt97-pointcast"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt97-pointcast");
    expect(saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("1997");
    await page.reload();
    const again = await envelope(page, "itt97-pointcast");
    expect(again && again.kind).toBe("official");
    expect(again.real).toBe(true);
  });

  test("CSotD sign writes the star as official and keeps the guestbook on its own key", async ({
    page,
  }) => {
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt94-csotd") === 0)
        .forEach((k) => localStorage.removeItem(k));
      sessionStorage.removeItem("itt94-csotd-wandered");
    });
    await page.reload();
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    expect(await raw(page, "itt94-csotd")).toBeNull();

    await page.evaluate(() => sessionStorage.setItem("itt94-csotd-wandered", "1"));
    await page.locator("[data-official-pick='today']").click();
    await page.fill("[name='gbname']", "Glenn residual");
    await page.fill("[name='gbnote']", "Worth the modem.");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
    await expect.poll(() => raw(page, "itt94-csotd"), { timeout: 8000 }).toMatch(/Glenn residual/);
    const saved = await envelope(page, "itt94-csotd");
    expect(saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.multiStep).toBe(true);
    expect(saved.name).toBe("Glenn residual");
    const book = await envelope(page, "itt94-csotd-gb");
    expect(book && book.key).toBe("itt94-csotd-gb");
    expect(book.key).not.toBe("itt94-csotd");
    await page.reload();
    const again = await envelope(page, "itt94-csotd");
    expect(again && again.kind).toBe("official");
    expect(again.real).toBe(true);
    await expect(page.locator("[data-csotd-last]")).toContainText(/Glenn residual/i);
  });

  test("SSL checkout real order is official and empty fields write nothing", async ({ page }) => {
    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await page.waitForFunction(
      () => !!document.querySelector("[data-ssl-form]"),
      null,
      { timeout: 15000 }
    );
    await page.evaluate(() => localStorage.removeItem("itt95-ssl-checkout"));
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    expect(await raw(page, "itt95-ssl-checkout")).toBeNull();
    await page.fill("[name='name']", "Ada Lovelace");
    await page.fill("[name='card']", "4111");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt95-ssl-checkout"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt95-ssl-checkout");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("1995");
    expect(saved.last4).toBe("4111");
    await page.reload();
    const again = await envelope(page, "itt95-ssl-checkout");
    expect(again && again.kind).toBe("official");
    expect(again.real).toBe(true);
  });

  test("Portal Wars three visits are official and fewer visits write nothing", async ({ page }) => {
    await page.goto("/years/1996/sites/portals/wars.html");
    await page.waitForFunction(
      () => !!document.querySelector("[data-portal-wars]"),
      null,
      { timeout: 15000 }
    );
    await page.evaluate(() => {
      localStorage.removeItem("itt96-portal-wars");
      sessionStorage.removeItem("itt96-portal-progress");
    });
    await page.reload();
    await page.waitForFunction(
      () => !!document.querySelector("[data-portal-wars]"),
      null,
      { timeout: 15000 }
    );
    await page.locator("[data-portal='yahoo']").first().click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();
    await page.goto("/years/1996/sites/portals/wars.html");
    await page.locator("[data-portal='excite']").first().click();
    expect(await raw(page, "itt96-portal-wars")).toBeNull();
    await page.goto("/years/1996/sites/portals/wars.html");
    await page.locator("[data-portal='altavista']").first().click();
    await expect.poll(() => raw(page, "itt96-portal-wars"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt96-portal-wars");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("1996");
    await page.goto("/years/1996/sites/portals/wars.html");
    const again = await envelope(page, "itt96-portal-wars");
    expect(again && again.kind).toBe("official");
    expect(again.real).toBe(true);
  });

  test("IUMA play does not store itt94-iuma", async ({ page }) => {
    await page.goto("/years/1994/sites/iuma/listen.html");
    await page.locator("[data-player-play]").waitFor({ state: "attached", timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt94-iuma"));
    await page.locator("[data-player-play]").click();
    await page.waitForTimeout(200);
    expect(await raw(page, "itt94-iuma")).toBeNull();
  });
});
