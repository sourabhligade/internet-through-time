// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { completeReactStop } = require("./helpers");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2015 mvp", () => {
  test("2015 is the React door on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2015"))).toBe(false);
    await page.goto("/");
    await expect(page.locator('a.year-card.available[data-year="2015"]')).toHaveAttribute(
      "href",
      /app\/index\.html#\/year\/2015/
    );
    await expect(page.locator(".year-card.locked.y2015")).toHaveCount(0);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[data-year="2015"]').click();
    await expect(page).toHaveURL(/app\/index\.html#\/year\/2015/);
    await expect(page.locator(".door")).toBeVisible({ timeout: 20000 });
    await expect(page.locator("body")).toContainText("Periscope");
  });

  test("Periscope empty never writes · Go LIVE writes official itt15-periscope", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-periscope");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-periscope");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await room.locator(".actions button").last().click();
    expect(await getKey(page, "itt15-periscope")).toBeFalsy();
    await completeReactStop(page, room);
    await expect.poll(() => getKey(page, "itt15-periscope"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt15-periscope")) || "{}");
    expect(blob.v).toBe(1);
    expect(blob.real).toBe(true);
    expect(blob.kind).toBe("official");
    expect(String(blob.year)).toBe("2015");
    expect(blob.key).toBe("itt15-periscope");
  });

  test("leftover empty and trap never write · Backup writes leftover itt15-googlephotos", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-googlephotos");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-googlephotos");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => {
      localStorage.removeItem("itt15-googlephotos");
      localStorage.removeItem("itt15-periscope");
    });
    await expect(room.locator(".kicker")).toHaveText("Leftover 11");
    await room.locator(".actions button").first().click();
    expect(await getKey(page, "itt15-googlephotos")).toBeFalsy();
    expect(await getKey(page, "itt15-periscope")).toBeFalsy();
    await room.locator(".actions button").last().click();
    expect(await getKey(page, "itt15-googlephotos")).toBeFalsy();
    await completeReactStop(page, room);
    await expect.poll(() => getKey(page, "itt15-googlephotos"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt15-googlephotos")) || "{}");
    expect(blob.v).toBe(1);
    expect(blob.real).toBe(true);
    expect(blob.leftover).toBe(true);
    expect(blob.kind).toBe("leftover");
    expect(String(blob.year)).toBe("2015");
    expect(blob.key).toBe("itt15-googlephotos");
    expect(await getKey(page, "itt15-periscope")).toBeFalsy();
  });

  test("short viewport Play Pair Follow hit the verb, not Document Done", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 560 });
    const rooms = [
      { stop: "itt15-music", verb: /play/i, face: true, deep: false },
      { stop: "itt15-watch", verb: /pair/i, face: true, deep: false },
      { stop: "itt15-win10", verb: /upgrade/i, face: true, deep: false },
      { stop: "itt15-news", verb: /follow/i, face: false, deep: true },
      { stop: "itt15-ipadpro", verb: /order/i, face: false, deep: true },
    ];
    for (const room of rooms) {
      const hash = room.deep
        ? `#/year/2015?deep=1&stop=${room.stop}`
        : `#/year/2015?stop=${room.stop}`;
      await page.goto("/app/index.html" + hash);
      await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
        timeout: 15000,
      });
      const article = page.locator("article.stop#" + room.stop);
      await article.waitFor({ timeout: 15000 });
      if (room.deep) {
        const leftover = page.locator(".also-year summary");
        if (await leftover.count()) await leftover.click();
      }
      const verb = article.locator(".actions button").last();
      await expect(verb).toHaveText(room.verb);
      const hit = await verb.evaluate((el) => {
        const box = el.getBoundingClientRect();
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        const top = document.elementFromPoint(x, y);
        return {
          inView: box.top >= 0 && box.bottom <= (window.innerHeight || 0),
          cls: top ? String(top.className || "") : "",
          isVerb: !!(top && (top === el || el.contains(top))),
        };
      });
      expect(hit.inView, room.stop + " verb in view").toBe(true);
      expect(hit.isVerb, room.stop + " click hits " + hit.cls).toBe(true);
      await page.evaluate((key) => localStorage.removeItem(key), room.stop);
      await verb.click();
      await expect(article.locator("[role='status']")).toContainText(/never writes/i);
      if (room.face) {
        await article.locator("[data-product-face]").click();
        await expect(article.locator("[role='status']")).toContainText(/never writes/i);
      }
    }
  });
});
