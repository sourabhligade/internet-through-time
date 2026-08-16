// @ts-check
/**
 * Visitor walk — iframe REAL then Next chip must appear and land on a live room.
 * Catches hidden-Next and leftover 404 dests the unit rooms miss.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goImmersion, contentFrame } = require("./helpers");
const fs = require("fs");
const path = require("path");

/** @param {import('@playwright/test').FrameLocator} frame */
async function checkFrameReq(frame) {
  const boxes = frame.locator("[data-req], [data-airpods-check]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check({ force: true });
}

test.describe("2016 visitor Next walk", () => {
  test("year-start tour PoGO path exists on disk", () => {
    const pogo = path.join(__dirname, "..", "years/2016/sites/pokemongo/index.html");
    const dead = path.join(__dirname, "..", "years/2016/sites/pogo/index.html");
    expect(fs.existsSync(pogo), "pokemongo/index.html").toBe(true);
    expect(fs.existsSync(dead), "deleted pogo/ must stay gone").toBe(false);
    const src = fs.readFileSync(path.join(__dirname, "..", "js/museum-progress.js"), "utf8");
    expect(src).toMatch(/sites\/pokemongo\/index\.html/);
    expect(src).not.toMatch(/sites\/pogo\/index\.html/);
  });

  test("Stories REAL reveals Next to PoGO and the dest loads", async ({ page }) => {
    await enterYear(page, "2016");
    await goImmersion(page, "2016", "sites/instagram/stories.html");
    const frame = contentFrame(page);
    await frame.locator("[data-ig-story-text]").fill("walk next");
    await checkFrameReq(frame);
    await frame.locator("[data-ig-story-add]").click();
    const next = frame.locator("[data-next-flow], [data-itt16-next]");
    await expect(next.first()).toBeVisible();
    await expect(next.locator("a[href*='pokemongo']").first()).toBeVisible();
    await frame.locator("a[href*='pokemongo']").first().click();
    await expect(contentFrame(page).locator("body")).toContainText(/Jul(?:y)?\s*6|Pokémon|Pokemon/i);
  });

  test("Jack REAL reveals Next to AirPods", async ({ page }) => {
    await enterYear(page, "2016");
    await goImmersion(page, "2016", "sites/iphone/jack.html");
    const frame = contentFrame(page);
    await checkFrameReq(frame);
    await frame.locator("[data-itt-real-save]").click();
    await expect(frame.locator("[data-next-flow], [data-itt16-next]").first()).toBeVisible();
    await frame.locator("a[href*='airpods']").first().click();
    await expect(contentFrame(page).locator("body")).toContainText(/AirPods|Dec(?:ember)?\s*13/i);
  });

  test("Vine REAL reveals Next to musical.ly not TikTok", async ({ page }) => {
    await enterYear(page, "2016");
    await goImmersion(page, "2016", "sites/vine/goodbye.html");
    const frame = contentFrame(page);
    await checkFrameReq(frame);
    await frame.locator("[data-itt-real-save]").click();
    await expect(frame.locator("[data-next-flow], [data-itt16-next]").first()).toBeVisible();
    await frame.locator("a[href*='musically']").first().click();
    await expect(contentFrame(page).locator("body")).toContainText(/musical\.?ly/i);
    await expect(contentFrame(page).locator("body")).not.toContainText(/TikTok brand as 2016/i);
  });

  test("WA REAL reveals Next to Dyn not Allo", async ({ page }) => {
    await enterYear(page, "2016");
    await goImmersion(page, "2016", "sites/whatsapp/security.html");
    const frame = contentFrame(page);
    await checkFrameReq(frame);
    await frame.locator("[data-itt-real-save]").click();
    await expect(frame.locator("[data-next-flow], [data-itt16-next]").first()).toBeVisible();
    const href = await frame.locator("[data-next-flow] a, [data-itt16-next] a").first().getAttribute("href");
    expect(href || "").toMatch(/dyn/i);
    expect(href || "").not.toMatch(/allo/i);
    await frame.locator("a[href*='dyn']").first().click();
    await expect(contentFrame(page).locator("body")).toContainText(/Oct(?:ober)?\s*21|Dyn|Mirai/i);
  });

  test("PoGO location continue in iframe reaches team", async ({ page }) => {
    await enterYear(page, "2016");
    await goImmersion(page, "2016", "sites/pokemongo/index.html");
    const frame = contentFrame(page);
    await checkFrameReq(frame);
    await frame.locator("[data-pogo-continue-loc]").click();
    await expect(contentFrame(page).locator("[data-pogo-team]").first()).toBeVisible({ timeout: 15000 });
  });

  test("STEM and Jio REAL reveal Next", async ({ page }) => {
    await enterYear(page, "2016");
    await goImmersion(page, "2016", "sites/stem/index.html");
    let frame = contentFrame(page);
    await frame.locator("[data-stem-ligo]").check({ force: true });
    await frame.locator("[data-stem-go]").check({ force: true });
    await frame.locator("[data-stem-save]").click();
    await expect(frame.locator("[data-next-flow], [data-itt16-next]").first()).toBeVisible();
    await frame.locator("a[href*='jio']").first().click();
    frame = contentFrame(page);
    await expect(frame.locator("[data-jio-save]")).toBeVisible({ timeout: 15000 });
    for (const sel of ["[data-jio-launch]", "[data-jio-data]", "[data-jio-lookback]"]) {
      await frame.locator("label.itt16-check").filter({ has: frame.locator(sel) }).click();
    }
    await frame.locator("[data-jio-save]").click();
    await expect(frame.locator("[data-next-flow], [data-itt16-next]").first()).toBeVisible();
  });
});
