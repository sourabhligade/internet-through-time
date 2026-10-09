// @ts-check
/**
 * Museum-grade UX phase 5. 2015 React door.
 * Header is the stop. No itt15- on the glass. #/year/2017 is not a door.
 * Off dest-true 12. Do not dest-farm. Do not invent a years/2015 tree.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { completeReactStop } = require("./helpers.js");
const { getKey, envelope } = require("./ux-phase-io.js");

test.describe("UX phase 5 2015 React glass", () => {
  test("hub card opens the React door and there is no years/2015 tree", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "../years/2015"))).toBe(false);
    const res = await page.goto("/");
    expect(res && res.ok()).toBeTruthy();
    const card = page.locator("a.year-card.available.y2015");
    await expect(card).toHaveAttribute("href", "app/index.html#/year/2015");
    await card.click();
    await expect(page).toHaveURL(/\/app\/index\.html#\/year\/2015/);
    await expect(page.locator(".year-star")).toHaveText("Periscope");
  });

  test("header is the stop and no itt15- leaf is on the glass", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2015");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator(".year-star")).toHaveText("Periscope");
    await expect(page.locator("header em")).toHaveText("Starting Point");
    await page.locator("article").getByRole("button", { name: "Apple Music", exact: true }).click();
    await expect(page.locator("header")).not.toContainText("Periscope");
    await expect(page.locator("header em")).toContainText("Apple Music");
    await expect(page.locator(".stop h1").first()).toHaveText("Apple Music");
    const keys = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("body *")).filter((el) => {
        if (el.children.length) return false;
        if (!/itt15-/.test(el.textContent || "")) return false;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") return false;
        const r = el.getBoundingClientRect();
        return r.width > 8 && r.height > 8;
      }).map((el) => (el.textContent || "").trim());
    });
    expect(keys).toEqual([]);
  });

  test("Periscope ticks plus title plus Go LIVE store official and print Saved.", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-periscope");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-periscope");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await completeReactStop(page, room);
    await expect.poll(() => getKey(page, "itt15-periscope"), { timeout: 8000 }).toBeTruthy();
    await envelope(page, "itt15-periscope");
    await expect(room.locator(".status")).toHaveText("Saved.");
    await expect(room.locator(".status")).not.toContainText(/itt15-/);
  });

  test("ALSO_2015 stays empty and leftover list stays off the glass", async ({ page }) => {
    const src = fs.readFileSync(path.join(__dirname, "../react/src/year2015.js"), "utf8");
    expect(src).toMatch(/export const ALSO_2015 = \[\]/);
    await page.goto("/app/index.html#/year/2015");
    await expect(page.locator(".year-star")).toHaveText("Periscope");
    await expect(page.locator("section.also-year")).toHaveCount(0);
    await expect(page.getByText("Leftover list")).toHaveCount(0);
    await page.goto("/app/index.html#/year/2015?deep=1");
    await expect(page.locator("section.also-year")).toHaveCount(0);
  });

  test("2017 hash is not a door and never shows Periscope", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2017");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2017 is not a door" })).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
    await expect(page.locator(".year-star")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText("Periscope");
    await expect(page.getByRole("link", { name: "Museum hub" })).toHaveAttribute("href", "../index.html");
  });
});
