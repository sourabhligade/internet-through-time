// @ts-check
const { test, expect } = require("@playwright/test");
const { completeReactStop } = require("./helpers");

const STOPS = [
  "itt15-periscope",
  "itt15-music",
  "itt15-win10",
  "itt15-reddit",
  "itt15-watch",
  "itt15-edge",
  "itt15-meerkat",
  "itt15-slack",
  "itt15-youtube",
  "itt15-game-liverush",
];

const LEFTOVER = [
  "itt15-googlephotos",
  "itt15-snap-discover",
  "itt15-le",
  "itt15-discord",
  "itt15-ethereum",
  "itt15-news",
  "itt15-instantarticles",
  "itt15-androidpay",
  "itt15-ipadpro",
  "itt15-dx12",
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2015 flows", () => {
  test("every official React stop empty never writes then complete writes", async ({ page }) => {
    for (const key of STOPS) {
      await page.goto(`/app/index.html#/year/2015?stop=${key}`);
      await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
        timeout: 15000,
      });
      const room = page.locator(`article.stop#${key}`);
      await room.waitFor({ timeout: 15000 });
      await page.evaluate((k) => localStorage.removeItem(k), key);
      await room.locator(".actions button").last().click();
      expect(await getKey(page, key), key + " empty").toBeFalsy();
      await completeReactStop(page, room);
      await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, key)) || "{}");
      expect(blob.real, key).toBe(true);
      expect(blob.kind, key).toBe("official");
    }
  });

  test("every leftover React stop empty never writes then complete writes leftover", async ({ page }) => {
    for (const key of LEFTOVER) {
      await page.goto(`/app/index.html#/year/2015?stop=${key}`);
      await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
        timeout: 15000,
      });
      const room = page.locator(`article.stop#${key}`);
      await room.waitFor({ timeout: 15000 });
      await page.evaluate((k) => {
        localStorage.removeItem(k);
        localStorage.removeItem("itt15-periscope");
      }, key);
      await room.locator(".actions button").last().click();
      expect(await getKey(page, key), key + " empty").toBeFalsy();
      expect(await getKey(page, "itt15-periscope"), key + " star empty").toBeFalsy();
      await completeReactStop(page, room);
      await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, key)) || "{}");
      expect(blob.real, key).toBe(true);
      expect(blob.leftover, key).toBe(true);
      expect(blob.kind, key).toBe("leftover");
      expect(await getKey(page, "itt15-periscope"), key + " leftover never star").toBeFalsy();
    }
  });
});
