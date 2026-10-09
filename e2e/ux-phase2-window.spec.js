// @ts-check
/**
 * Museum-grade UX phase 2. Hub → year door → dest sits in #content.
 * Gold leftover stays leftover. Direct dest URLs stay HTTP 200.
 * Does not edit setIframeSrc (GitNexus CRITICAL).
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { enterYear, goInFrame, contentFrame } = require("./helpers.js");

async function waitGuided(page) {
  await page.waitForFunction(() => {
    try {
      const frame = document.getElementById("content");
      const doc = frame && frame.contentDocument;
      return !!(doc && doc.querySelector(".ott-guided"));
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

test.describe("UX phase 2 dest in the year window", () => {
  test("2016 year door Starting Point loads in the iframe", async ({ page }) => {
    await enterYear(page, "2016");
    await waitGuided(page);
    const sandbox = await page.locator("#content").getAttribute("sandbox");
    expect(sandbox).toContain("allow-same-origin");
    expect(sandbox).toContain("allow-scripts");
    await expect(contentFrame(page).locator(".ott-guided")).toBeVisible();
    await expect(page.locator("body")).toHaveClass(/os-win10/);
    await expect(page.locator("body")).toHaveClass(/browser-chrome-habit/);
    await expect(page).toHaveURL(/\/years\/2016\//);
  });

  test("2016 Stories sits in the year iframe and the parent stays 2016", async ({ page }) => {
    await enterYear(page, "2016");
    await waitGuided(page);
    await goInFrame(page, "sites/instagram/stories.html");
    const frame = contentFrame(page);
    await expect(frame.locator("html")).toHaveAttribute("data-official-key", "itt16-ig-stories");
    await expect(frame.locator("html")).toHaveAttribute("data-itt-year", "2016");
    await expect(page).toHaveURL(/\/years\/2016\//);
    await expect(page.locator("body")).toHaveClass(/browser-chrome-habit/);
    await expect(frame.locator("html")).not.toHaveClass(/itt-dest-top/);
  });

  test("1998 Lucky sits in the year iframe and chrome stays 1998", async ({ page }) => {
    await enterYear(page, "1998");
    await waitGuided(page);
    await goInFrame(page, "sites/google/lucky.html");
    const frame = contentFrame(page);
    await expect(frame.locator("html")).toHaveAttribute("data-official-key", "itt98-lucky");
    await expect(frame.locator("html")).toHaveAttribute("data-itt-year", "1998");
    await expect(page).toHaveURL(/\/years\/1998\//);
    await expect(page.locator("#location")).toBeVisible();
  });

  test("gold leftover on Lucky is block with a top gap and 1.5em fold CSS", async ({ page }) => {
    const res = await page.goto("/years/1998/sites/google/lucky.html");
    expect(res && res.ok()).toBeTruthy();
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-itt-immersion-booted") === "1998",
      null,
      { timeout: 15000 }
    );
    const gold = await page.evaluate(() => {
      const el = document.querySelector("html[data-official-key] [data-lo-panel][data-itt-gold-lx]");
      if (!el) return null;
      const cs = getComputedStyle(el);
      const font = parseFloat(cs.fontSize) || 16;
      const marginTop = parseFloat(cs.marginTop) || 0;
      return { display: cs.display, marginTop, em: font ? marginTop / font : 0 };
    });
    expect(gold, "gold leftover panel").toBeTruthy();
    expect(gold.display).toBe("block");
    expect(gold.marginTop, "gold leftover top gap").toBeGreaterThan(0);
    const fold = fs.readFileSync(path.join(__dirname, "../css/itt-leftover-fold.css"), "utf8");
    expect(fold).toMatch(
      /html\[data-official-key\] \[data-lo-panel\]\[data-itt-gold-lx\][\s\S]{0,120}margin-top:\s*1\.5em/
    );
  });

  test("direct Lucky dest is HTTP 200 dest-as-tab", async ({ page }) => {
    const res = await page.goto("/years/1998/sites/google/lucky.html");
    expect(res && res.status()).toBe(200);
    await expect(page.locator("html")).toHaveClass(/itt-dest-top/);
    await expect(page.locator("html")).toHaveAttribute("data-official-key", "itt98-lucky");
  });
});
