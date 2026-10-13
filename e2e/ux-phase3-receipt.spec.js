// @ts-check
/**
 * Museum-grade UX phase 3. Accepted write prints Saved.
 * Keys stay in storage. They leave the glass.
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");
const { contentFrame, enterYear, goInFrame } = require("./helpers.js");
const {
  getKey,
  verbReady,
  finishOfficial,
  verbReadyInFrame,
  finishOfficialIn,
  envelope,
  statusText,
} = require("./ux-phase-io.js");

async function openDest(page, path, key) {
  await page.goto(path);
  await verbReady(page);
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

async function statusPaint(page, sel) {
  return page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      text: String(el.textContent || "").replace(/\s+/g, " ").trim(),
      color: cs.color,
    };
  }, sel);
}

async function expectSavedGlass(page, key) {
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  await envelope(page, key);
  await expect.poll(() => statusText(page), { timeout: 8000 }).toMatch(/^(Saved\.|This browser blocked the save\.)$/);
  const text = await statusText(page);
  expect(text).not.toMatch(/itt1[56]-/);
  await expect(page.locator("[data-official-status]").first()).not.toContainText(/itt1[56]-/);
  const paint = await statusPaint(page, "[data-official-status]");
  if (paint && paint.text === "Saved.") expect(paint.color).toBe("rgb(0, 102, 0)");
}

test.describe("UX phase 3 receipt glass", () => {
  for (const row of [
    { name: "WhatsApp Install", path: "/years/2014/sites/whatsapp/index.html", key: "itt14-wa-install" },
  ]) {
    test(row.name + " empty and trap hold in red and write nothing", async ({ page }) => {
      await openDest(page, row.path, row.key);
      await page.locator("[data-official-verb]").first().click();
      expect(await getKey(page, row.key)).toBeNull();
      const empty = await statusPaint(page, "[data-official-status]");
      expect(empty, "empty hold").toBeTruthy();
      expect(empty.text).toMatch(/never writes/);
      expect(empty.color).toBe("rgb(170, 0, 0)");
      const trap = page.locator("[data-official-trap]").first();
      if (await trap.count()) {
        await trap.click();
        expect(await getKey(page, row.key)).toBeNull();
        const held = await statusPaint(page, "[data-official-status]");
        expect(held.text).toMatch(/never writes/);
        expect(held.color).toBe("rgb(170, 0, 0)");
      }
    });
  }

  test("2010 leftover pop dest prints Saved. without the storage key", async ({ page }) => {
    await page.goto("/years/2010/sites/minecraft/index.html");
    await page.waitForFunction(
      () => {
        const btn = document.querySelector("[data-pop-go]");
        return !!(btn && btn.getAttribute("data-pop-bound") === "1");
      },
      null,
      { timeout: 15000 }
    );
    await page.evaluate(() => {
      localStorage.removeItem("itt10-pop-minecraft");
      localStorage.removeItem("itt10-minecraft-lx");
    });
    await page.locator("[data-pop-field]").fill("leftover residual");
    await page.locator("[data-pop-go]").click();
    await expect(page.locator("[data-pop-status]").first()).toHaveText("Saved.", { timeout: 8000 });
    const text = await page.locator("[data-pop-status]").first().innerText();
    expect(text).not.toMatch(/itt10-/);
    const wrote =
      (await getKey(page, "itt10-pop-minecraft")) ||
      (await getKey(page, "itt10-minecraft-lx"));
    expect(wrote, "leftover envelope").toBeTruthy();
  });

  test("2012 extra-a minute game prints Saved. chip without the storage key", async ({ page }) => {
    await page.goto("/years/2012/sites/playable/extra-a.html?fast=1");
    await page.evaluate(() => localStorage.removeItem("itt12-game-andshare"));
    await page.reload();
    const host = page.locator("[data-year-game][data-minute-extra]");
    await expect(host).toBeVisible({ timeout: 20000 });
    await page.locator("[data-mx-finish]").click();
    expect(await getKey(page, "itt12-game-andshare")).toBeFalsy();
    const st = page.locator("[data-itt-action-status]").first();
    await expect(st).toContainText(/never writes/i);
    const hold = await statusPaint(page, "[data-itt-action-status]");
    expect(hold && hold.color).toBe("rgb(170, 0, 0)");
    await page.locator("[data-game-start]").click();
    const playStart = await statusPaint(page, "[data-itt-action-status]");
    expect(playStart && playStart.text).not.toMatch(/never writes/i);
    expect(playStart && playStart.color).not.toBe("rgb(170, 0, 0)");
    await page.locator("[data-mx-seq]").first().waitFor({ timeout: 8000 });
    const items = page.locator("[data-mx-seq]");
    const n = await items.count();
    /** @type {{ i: number, o: number }[]} */
    const orders = [];
    for (let i = 0; i < n; i++) {
      orders.push({ i, o: Number((await items.nth(i).getAttribute("data-order")) || "0") });
    }
    orders.sort((a, b) => a.o - b.o);
    for (const x of orders) await items.nth(x.i).click();
    await page.locator("[data-mx-confirm]").first().fill("android");
    await page.locator("[data-mx-confirm]").first().dispatchEvent("input");
    await page.locator("[data-mx-finish]").click({ force: true });
    await expect.poll(() => getKey(page, "itt12-game-andshare"), { timeout: 8000 }).toBeTruthy();
    await expect(st).toHaveText("Saved.");
    await expect(st).not.toContainText(/itt12-/);
    const ok = await statusPaint(page, "[data-itt-action-status]");
    expect(ok && ok.text).toBe("Saved.");
    expect(ok && ok.color).toBe("rgb(0, 102, 0)");
    await page.locator("[data-mx-finish]").click({ force: true });
    await expect(st).toHaveText("Already saved.");
    const again = await statusPaint(page, "[data-itt-action-status]");
    expect(again && again.color).toBe("rgb(0, 102, 0)");
  });

  test("1998 extra-a Lucky extra prints Saved. on the year skin", async ({ page }) => {
    await page.goto("/years/1998/sites/playable/extra-a.html?fast=1");
    await page.evaluate(() => localStorage.removeItem("itt98-game-luckygo"));
    await page.reload();
    const host = page.locator("[data-year-game][data-minute-extra]");
    await expect(host).toBeVisible({ timeout: 20000 });
    await page.locator("[data-game-start]").click();
    const q = (await host.getAttribute("data-mx-query")) || "yahoo";
    await page.locator("input[data-mx-query]").fill(q);
    await page.locator("[data-mx-run]").click();
    await page.locator("[data-mx-hit]").click();
    await page.locator("[data-mx-finish]").click({ force: true });
    await expect.poll(() => getKey(page, "itt98-game-luckygo"), { timeout: 8000 }).toBeTruthy();
    const st = page.locator("[data-itt-action-status]").first();
    await expect(st).toHaveText("Saved.");
    await expect(st).not.toContainText(/itt98-/);
    const ok = await statusPaint(page, "[data-itt-action-status]");
    expect(ok && ok.color).toBe("rgb(0, 102, 0)");
  });

  test("2005 HoverChop Saved. chip then Start restamps play", async ({ page }) => {
    await page.goto("/years/2005/sites/playable/game.html?fast=1");
    await page.evaluate(() => localStorage.removeItem("itt05-game-heli"));
    await page.reload();
    const st = page.locator("#play-status").first();
    await page.evaluate(() => {
      if (typeof window.ITTYearGameOnScore === "function") window.ITTYearGameOnScore("heli", 42);
    });
    await expect.poll(() => getKey(page, "itt05-game-heli"), { timeout: 8000 }).toBeTruthy();
    await expect(st).toHaveText("Saved.");
    await expect(st).not.toContainText(/itt05-/);
    const ok = await statusPaint(page, "#play-status");
    expect(ok && ok.color).toBe("rgb(0, 102, 0)");
    await page.locator("#play-start").click();
    await expect(st).toContainText(/climb/i);
    await expect(st).not.toHaveText("Saved.");
    const play = await page.locator("#play-status").evaluate((el) => el.getAttribute("data-yg-receipt"));
    expect(play).toBe("play");
    const paint = await statusPaint(page, "#play-status");
    expect(paint && paint.color).not.toBe("rgb(0, 102, 0)");
  });

  test("1998 pack Start is play then empty Finish is hold", async ({ page }) => {
    await page.goto("/years/1998/sites/playable/game-2.html");
    await page.evaluate(() => localStorage.removeItem("itt98-game-dmoz"));
    await page.reload();
    const play = await statusPaint(page, "[data-itt-action-status]");
    expect(play && play.text).not.toMatch(/never writes/i);
    expect(play && play.color).not.toBe("rgb(170, 0, 0)");
    await page.locator("[data-pack-finish]").click();
    const hold = await statusPaint(page, "[data-itt-action-status]");
    expect(hold && hold.text).toMatch(/never writes/i);
    expect(hold && hold.color).toBe("rgb(170, 0, 0)");
  });

  test("2000 Lot Life Saved. then Party keeps Already saved.", async ({ page }) => {
    await page.goto("/years/2000/sites/playable/game.html?fast=1");
    await page.evaluate(() => localStorage.removeItem("itt00-game-lotlife"));
    await page.reload();
    const st = page.locator("[data-itt-action-status]").first();
    await page.locator("[data-game-start]").click();
    await expect.poll(() => getKey(page, "itt00-game-lotlife"), { timeout: 8000 }).toBeTruthy();
    await expect(st).toHaveText("Saved.");
    await expect(st).not.toContainText(/itt00-/);
    const ok = await statusPaint(page, "[data-itt-action-status]");
    expect(ok && ok.color).toBe("rgb(0, 102, 0)");
    await expect(page.locator("[data-lot-party]")).toBeDisabled();
    await page.evaluate(() => {
      const b = document.querySelector("[data-lot-party]");
      if (!b) return;
      b.disabled = false;
      b.click();
    });
    await expect(st).toHaveText("Already saved.");
    const again = await statusPaint(page, "[data-itt-action-status]");
    expect(again && again.color).toBe("rgb(0, 102, 0)");
  });

  test("2015 omitted hash is not a door", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2015");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Periscope");
  });
});
