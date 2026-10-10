// @ts-check
/**
 * PHASE-SCAN improvisation locks. Off dest-true 12.
 * helper / status-node / kit-receipt / pack-b-verify.
 * Do not dest-farm. Pack B rooms already on disk.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { getKey } = require("./ux-phase-io.js");

const PACK_B_2008 = [
  "hi5",
  "orkut",
  "bebo",
  "ning",
  "scribd",
  "livespaces",
  "craigslist",
  "weather",
  "nyt",
  "bbc",
  "huffpo",
  "gizmodo",
  "engadget",
  "ars",
  "collegehumor",
  "funnyordie",
  "icanhas",
  "failblog",
  "xkcd",
  "onion",
  "ytmnd",
  "disqus",
  "plurk",
  "duckduckgo",
  "pandora",
  "imeem",
  "tripadvisor",
  "kayak",
  "zillow",
  "flash10",
  "silverlight",
  "html5",
  "opensocial",
  "ie8",
  "windows7",
];

const STATUS_DESTS = [
  { path: "/years/1998/sites/dmoz/index.html", key: "itt98-dmoz" },
];

test.describe("PHASE-SCAN improvisation", () => {
  test("2015 omitted hash is not a door", async ({ page }) => {
    const res = await page.goto("/app/index.html#/year/2015");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Periscope");
  });

  for (const row of STATUS_DESTS) {
    test(row.key + " bakes one data-official-status and hold reuses it", async ({ page }) => {
      const file = path.join(__dirname, "..", row.path.replace(/^\//, ""));
      const html = fs.readFileSync(file, "utf8");
      expect(html).toMatch(/data-official-status/);
      await page.goto(row.path);
      await page.waitForFunction(() => {
        const verbs = document.querySelectorAll("[data-official-verb]");
        if (!verbs.length) return document.readyState === "complete";
        return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
      }, null, { timeout: 15000 });
      await page.evaluate((k) => localStorage.removeItem(k), row.key);
      const before = await page.locator("[data-official-status]").count();
      expect(before).toBe(1);
      await page.locator("[data-official-verb]").first().click();
      expect(await getKey(page, row.key)).toBeNull();
      const after = await page.locator("[data-official-status]").count();
      expect(after).toBe(1);
      const paint = await page.locator("[data-official-status]").first().evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
          text: String(el.textContent || "").replace(/\s+/g, " ").trim(),
          color: cs.color,
        };
      });
      expect(paint.text).toMatch(/never writes/);
      expect(paint.color).toBe("rgb(170, 0, 0)");
    });
  }

  test("kit bootChecks prints Saved. leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2009/sites/farmville/index.html");
    await page.waitForFunction(() => {
      const panel = document.querySelector("[data-5x-loop]");
      return !!(panel && panel.getAttribute("data-5x-booted") === "1");
    }, null, { timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt09-fv5"));
    await page.locator("[data-5x-save]").click();
    expect(await getKey(page, "itt09-fv5")).toBeNull();
    await expect(page.locator("[data-5x-status]")).toContainText(/Incomplete never writes/);
    await page.locator('[data-5x-req="a"]').check();
    await page.locator('[data-5x-req="b"]').check();
    await page.locator("[data-5x-save]").click();
    await expect.poll(() => getKey(page, "itt09-fv5"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt09-fv5")) || "{}");
    expect(blob.kind).toBe("leftover");
    await expect(page.locator("[data-5x-status]")).toHaveText("Saved.");
    await expect(page.locator("[data-5x-status]")).not.toContainText(/itt09-/);
    expect(await getKey(page, "itt09-farm")).toBeNull();
  });

  test("kit bootChecks honors a blocked save", async ({ page }) => {
    await page.addInitScript(() => {
      const orig = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, v) {
        if (String(k).indexOf("itt09-fv5") !== -1) throw new Error("quota");
        return orig.apply(this, arguments);
      };
    });
    await page.goto("/years/2009/sites/farmville/index.html");
    await page.waitForFunction(() => {
      const panel = document.querySelector("[data-5x-loop]");
      return !!(panel && panel.getAttribute("data-5x-booted") === "1");
    }, null, { timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt09-fv5"));
    await page.locator('[data-5x-req="a"]').check();
    await page.locator('[data-5x-req="b"]').check();
    await page.locator("[data-5x-save]").click();
    expect(await getKey(page, "itt09-fv5")).toBeNull();
    await expect(page.locator("[data-5x-status]")).toHaveText("This browser blocked the save.");
  });

  test("2008 Pack B rooms already on disk return HTTP 200", async ({ request }) => {
    expect(PACK_B_2008.length).toBe(35);
    for (const slug of PACK_B_2008) {
      const rel = "years/2008/sites/" + slug + "/index.html";
      expect(fs.existsSync(path.join(__dirname, "..", rel)), rel).toBe(true);
      const res = await request.get("/" + rel);
      expect(res.status(), slug).toBe(200);
    }
  });
});
