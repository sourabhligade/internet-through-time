// @ts-check
const { test, expect } = require("@playwright/test");

const DOOR = "/app/index.html#/year/2020";

const EXTRAS = [
  { n: 11, name: "Clubhouse", key: "itt20-clubhouse-lx", next: "HBO Max", verb: "Raise hand leftover" },
  { n: 12, name: "HBO Max", key: "itt20-hbomax-lx", next: "Peacock", verb: "Watch HBO leftover" },
  { n: 13, name: "Peacock", key: "itt20-peacock-lx", next: "Amazon", verb: "Watch Peacock leftover" },
  { n: 14, name: "Amazon", key: "itt20-pop-amazon", next: "Facebook", verb: "Cart leftover" },
  { n: 15, name: "Facebook", key: "itt20-pop-facebook", next: "Google", verb: "Feed leftover" },
  { n: 16, name: "Google", key: "itt20-pop-google", next: "Instagram", verb: "Search leftover" },
  { n: 17, name: "Instagram", key: "itt20-pop2-instagram", next: "NYT", verb: "Filter leftover" },
  { n: 18, name: "NYT", key: "itt20-pop3-nyt", next: "Reddit", verb: "Headline leftover" },
  { n: 19, name: "Reddit", key: "itt20-pop3-reddit", next: "Slack", verb: "Open leftover" },
  { n: 20, name: "Slack", key: "itt20-pop2-slack", next: "Wikipedia", verb: "Channel leftover" },
  { n: 21, name: "Wikipedia", key: "itt20-pop3-wikipedia", next: "YouTube", verb: "Read leftover" },
  { n: 22, name: "YouTube", key: "itt20-pop2-youtube", next: "Zoom Leave", verb: "Watch YouTube leftover" },
];

const STOPS = [
  { n: 1, name: "Zoom Leave", key: "itt20-zoom", next: "Houseparty", verb: "Leave", trap: "Stay", placeholder: "chat leftover", checks: 3 },
  { n: 2, name: "Houseparty", key: "itt20-houseparty", next: "Discord", verb: "Hang leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
  { n: 3, name: "Discord", key: "itt20-discord", next: "Teams", verb: "Join voice leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
  { n: 4, name: "Teams", key: "itt20-teams", next: "Classroom", verb: "Join work leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
  { n: 5, name: "Classroom", key: "itt20-classroom", next: "Netflix", verb: "Join class leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
  { n: 6, name: "Netflix", key: "itt20-netflix", next: "TikTok", verb: "Watch leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
  { n: 7, name: "TikTok", key: "itt20-tiktok", next: "Among Us", verb: "For You leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
  { n: 8, name: "Among Us", key: "itt20-amongus", next: "Animal Crossing", verb: "Impostor leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
  { n: 9, name: "Animal Crossing", key: "itt20-acnh", next: "Year game", verb: "Island leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
  { n: 10, name: "Year game", key: "itt20-game-leave", next: "Zoom Leave", verb: "Play leftover", trap: "Zoom Leave as gold (trap)", placeholder: "leftover note", checks: 2 },
];

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2020 every flow link", () => {
  test("guided six and the flow map open", async ({ page }) => {
    await page.goto(DOOR);
    await expect(page.getByRole("heading", { name: "Zoom Leave" })).toBeVisible();
    await expect(page.locator("article.stop ol > li")).toHaveCount(6);

    const rail = page.locator(".rails");
    await rail.getByRole("button", { name: "About 2020" }).click();
    await expect(page.getByRole("heading", { name: "About 2020" })).toBeVisible();

    await rail.getByRole("button", { name: "Year flow map" }).click();
    await expect(page.getByRole("heading", { name: "2020 flow" })).toBeVisible();
    await expect(page.locator("article.stop ol > li")).toHaveCount(22);

    await page.getByRole("button", { name: "Starting Point" }).click();
    await expect(page.getByRole("heading", { name: "Zoom Leave" })).toBeVisible();

    const start = page.locator("article.stop");
    for (const name of ["About 2020", "Zoom Leave", "Houseparty", "Classroom", "Among Us", "Year flow map"]) {
      await page.getByRole("button", { name: "Starting Point" }).click();
      await start.getByRole("button", { name: name, exact: true }).click();
      if (name === "About 2020") {
        await expect(page.getByRole("heading", { name: "About 2020" })).toBeVisible();
      } else if (name === "Year flow map") {
        await expect(page.getByRole("heading", { name: "2020 flow" })).toBeVisible();
      } else if (name === "Zoom Leave") {
        await expect(page.locator("article.stop").getByText("itt20-zoom")).toBeVisible();
      } else {
        await expect(page.locator("article.stop").getByRole("heading", { name: name, exact: true })).toBeVisible();
      }
    }

    await page.locator(".rails").getByRole("button", { name: "Year flow map" }).click();
    for (const stop of STOPS.concat(EXTRAS)) {
      await page.locator("article.stop").getByRole("button", { name: stop.n + ". " + stop.name }).click();
      await expect(page.locator("article.stop").getByText(stop.key)).toBeVisible();
      await page.locator(".rails").getByRole("button", { name: "Year flow map" }).click();
    }
  });

  for (const stop of STOPS) {
    test(stop.n + " " + stop.name + " link saves only " + stop.key, async ({ page }) => {
      await page.goto(DOOR);
      await page.evaluate((key) => localStorage.removeItem(key), stop.key);
      await page.getByRole("button", { name: stop.n + " " + stop.name }).click();
      const room = page.locator("article.stop");
      await expect(room.getByRole("heading", { name: stop.name, exact: true })).toBeVisible();
      await expect(room.getByText(stop.key)).toBeVisible();

      await room.getByRole("button", { name: stop.trap, exact: true }).click();
      expect(await getKey(page, stop.key)).toBeFalsy();

      await room.getByRole("button", { name: stop.verb, exact: true }).click();
      expect(await getKey(page, stop.key)).toBeFalsy();

      const boxes = room.locator("input[type='checkbox']");
      await expect(boxes).toHaveCount(stop.checks);
      for (let i = 0; i < stop.checks; i++) await boxes.nth(i).check();
      await room.getByPlaceholder(stop.placeholder).fill("flow link");
      await room.getByRole("button", { name: stop.verb, exact: true }).click();

      await expect.poll(() => getKey(page, stop.key)).toBeTruthy();
      const blob = JSON.parse((await getKey(page, stop.key)) || "{}");
      expect(blob.official).toBe(true);
      expect(blob.year).toBe("2020");
      expect(blob.q).toBe("flow link");

      await room.getByRole("button", { name: "Next: " + stop.next }).click();
      const next = STOPS[stop.n % STOPS.length];
      await expect(page.locator("article.stop").getByRole("heading", { name: next.name, exact: true })).toBeVisible();
    });
  }

  for (const stop of EXTRAS) {
    test(stop.n + " " + stop.name + " leftover saves only " + stop.key, async ({ page }) => {
      await page.goto(DOOR);
      await page.evaluate((key) => {
        localStorage.removeItem(key);
        localStorage.removeItem("itt20-zoom");
      }, stop.key);
      await page.getByRole("button", { name: stop.n + " " + stop.name }).click();
      const room = page.locator("article.stop");
      await expect(room.getByText(stop.key)).toBeVisible();
      await room.getByRole("button", { name: "Zoom Leave as gold (trap)", exact: true }).click();
      expect(await getKey(page, stop.key)).toBeFalsy();
      expect(await getKey(page, "itt20-zoom")).toBeFalsy();
      await room.getByRole("button", { name: stop.verb, exact: true }).click();
      expect(await getKey(page, stop.key)).toBeFalsy();
      const boxes = room.locator("input[type='checkbox']");
      await expect(boxes).toHaveCount(2);
      await boxes.nth(0).check();
      await boxes.nth(1).check();
      await room.getByPlaceholder("leftover note").fill("flow link");
      await room.getByRole("button", { name: stop.verb, exact: true }).click();
      await expect.poll(() => getKey(page, stop.key)).toBeTruthy();
      const blob = JSON.parse((await getKey(page, stop.key)) || "{}");
      expect(blob.leftover).toBe(true);
      expect(blob.official).toBeFalsy();
      expect(blob.year).toBe("2020");
      expect(await getKey(page, "itt20-zoom")).toBeFalsy();
      await room.getByRole("button", { name: "Next: " + stop.next }).click();
    });
  }
});
