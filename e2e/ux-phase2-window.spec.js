// @ts-check
/**
 * Museum-grade UX phase 2. Hub → year door → dest sits in #content.
 * Gold leftover stays leftover. Direct dest URLs stay HTTP 200.
 * B1 first-boot: relative pages/home.html is not ERR_ABORTED.
 * Same-path Home/reload uses location.reload (no about:blank bounce).
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { enterYear, goInFrame, contentFrame } = require("./helpers.js");
const { getKey } = require("./ux-phase-io.js");

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

async function hubEnterYear(page, year) {
  await page.goto("/");
  await page.locator("a.year-card.available.y" + year).click();
  await page.locator("#skip-connect").click({ force: true, timeout: 3000 }).catch(() => {});
  await waitGuided(page);
}

async function clickStarChip(page, year) {
  const frame = contentFrame(page);
  const chip = frame.locator('[data-ott-one-thing="' + year + '"]').first();
  await expect(chip).toBeVisible({ timeout: 20000 });
  await chip.click();
}

async function framePath(page) {
  return page.evaluate(() => {
    const f = document.getElementById("content");
    try {
      const p = f && f.contentWindow && f.contentWindow.location && f.contentWindow.location.pathname;
      return p || (f && f.getAttribute("src")) || "";
    } catch (e) {
      return (f && f.getAttribute("src")) || "";
    }
  });
}

async function goldStyleInFrame(page) {
  return page.evaluate(() => {
    try {
      const doc = document.getElementById("content").contentDocument;
      const el = doc && doc.querySelector("html[data-official-key] [data-lo-panel][data-itt-gold-lx]");
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { display: cs.display, marginTop: parseFloat(cs.marginTop) || 0 };
    } catch (e) {
      return null;
    }
  });
}

/** First-boot home.html aborts only (B1). Stop listening before dest nav. */
async function firstBootHome(page, year) {
  const aborted = [];
  const onFail = (req) => {
    const url = req.url();
    if (!/\/pages\/home\.html(?:\?|#|$)/.test(url)) return;
    const err = (req.failure() && req.failure().errorText) || "";
    if (/ERR_ABORTED|NS_BINDING_ABORTED/.test(err)) aborted.push(url + " " + err);
  };
  page.on("requestfailed", onFail);
  await page.goto("/years/" + year + "/");
  await page.locator("#skip-connect").click({ force: true, timeout: 3000 }).catch(() => {});
  await waitGuided(page);
  page.off("requestfailed", onFail);
  return aborted;
}

test.describe("UX phase 2 dest in the year window", () => {
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

  test("gold leftover on Lucky is block with a top gap and 3em fold CSS", async ({ page }) => {
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
      /html\[data-official-key\] \[data-lo-panel\]\[data-itt-gold-lx\][\s\S]{0,160}margin-top:\s*3em/
    );
  });

  test("direct Lucky dest is HTTP 200 dest-as-tab", async ({ page }) => {
    const res = await page.goto("/years/1998/sites/google/lucky.html");
    expect(res && res.status()).toBe(200);
    await expect(page.locator("html")).toHaveClass(/itt-dest-top/);
    await expect(page.locator("html")).toHaveAttribute("data-official-key", "itt98-lucky");
  });

  test("hub to 1998 Starting Point chip opens Lucky in the year iframe", async ({ page }) => {
    await hubEnterYear(page, "1998");
    await expect(page).toHaveURL(/\/years\/1998\//);
    await clickStarChip(page, "1998");
    await expect.poll(() => framePath(page), { timeout: 20000 }).toMatch(/google\/lucky/);
    const frame = contentFrame(page);
    await expect(frame.locator("html")).toHaveAttribute("data-official-key", "itt98-lucky");
    await expect(page).toHaveURL(/\/years\/1998\//);
    await expect(page.locator("#location")).toBeVisible();
  });

  test("1998 year door first pages/home.html is not aborted and Lucky still opens in the iframe", async ({ page }) => {
    const aborted = await firstBootHome(page, "1998");
    expect(aborted, "first-boot home.html abort").toEqual([]);
    const src = await page.locator("#content").getAttribute("src");
    expect(src).toMatch(/pages\/home\.html/);
    expect(src.indexOf("http")).toBe(-1);
    expect(src.indexOf("/years/")).toBe(-1);
    await expect(contentFrame(page).locator(".ott-guided")).toBeVisible();
    await clickStarChip(page, "1998");
    await expect.poll(() => framePath(page), { timeout: 20000 }).toMatch(/google\/lucky/);
    const frame = contentFrame(page);
    await expect(frame.locator("html")).toHaveAttribute("data-official-key", "itt98-lucky");
    await expect(page).toHaveURL(/\/years\/1998\//);
  });

  test("gold leftover in the Lucky iframe stays leftover and does not stamp the star", async ({ page }) => {
    await enterYear(page, "1998");
    await waitGuided(page);
    await goInFrame(page, "sites/google/lucky.html");
    await page.waitForFunction(() => {
      try {
        const doc = document.getElementById("content").contentDocument;
        const save = doc && doc.querySelector("[data-lo-save][data-lo-key='gold-lx']");
        return !!(save && save.getAttribute("data-lo-bound") === "1");
      } catch (e) {
        return false;
      }
    }, null, { timeout: 20000 });
    const gold = await goldStyleInFrame(page);
    expect(gold, "gold leftover in iframe").toBeTruthy();
    expect(gold.display).toBe("block");
    expect(gold.marginTop).toBeGreaterThan(0);
    const frame = contentFrame(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt98-lucky");
      localStorage.removeItem("itt98-gold-lx");
    });
    const panel = frame.locator("[data-itt-gold-lx]");
    await panel.locator("[data-lo-req]").nth(0).check();
    await panel.locator("[data-lo-req]").nth(1).check();
    await panel.locator("[data-lo-pick='keep']").click();
    await panel.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt98-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt98-lucky")).toBeNull();
    const blob = JSON.parse((await getKey(page, "itt98-gold-lx")) || "{}");
    expect(blob.kind).toBe("leftover");
    await expect(page).toHaveURL(/\/years\/1998\//);
  });

  test("2010 map F4 F5 copy uses dest official keys", async () => {
    const maps = fs.readFileSync(path.join(__dirname, "../js/config/flow-maps.js"), "utf8");
    expect(maps).toMatch(/Like · itt10-fb-og/);
    expect(maps).toMatch(/35h honesty · itt10-yt/);
    expect(maps).not.toMatch(/Like · itt10-facebook/);
    expect(maps).not.toMatch(/35h honesty · itt10-youtube/);
  });

  test("2010 year map paints dest official keys", async ({ page }) => {
    await enterYear(page, "2010");
    await waitGuided(page);
    await goInFrame(page, "pages/map.html");
    const frame = contentFrame(page);
    await expect(frame.locator("body")).toContainText("itt10-fb-og", { timeout: 20000 });
    await expect(frame.locator("body")).toContainText("itt10-yt");
    await expect(frame.locator("body")).not.toContainText("itt10-facebook");
    await expect(frame.locator("body")).not.toContainText("itt10-youtube");
  });

  for (const row of [
    { year: "1998", dest: "sites/google/lucky.html", key: "itt98-lucky" },
    { year: "2010", dest: "sites/instagram/index.html", key: "itt10-ig-posts" },
    { year: "2022", dest: "sites/chatgpt/index.html", key: "itt22-chatgpt" },
  ]) {
    test(row.year + " dest reload does not bounce through about:blank", async ({ page }) => {
      await enterYear(page, row.year);
      await waitGuided(page);
      await goInFrame(page, row.dest);
      const slug = row.dest.split("/")[1];
      await expect.poll(() => framePath(page), { timeout: 20000 }).toMatch(new RegExp(slug));
      const blanked = [];
      page.on("framenavigated", (frame) => {
        const u = frame.url();
        if (/^about:blank/.test(u)) blanked.push(u);
      });
      await page.locator("#btn-reload").click();
      await expect.poll(() => framePath(page), { timeout: 20000 }).toMatch(new RegExp(slug));
      const frame = contentFrame(page);
      await expect(frame.locator("html")).toHaveAttribute("data-official-key", row.key);
      expect(blanked, "about:blank bounce").toEqual([]);
    });
  }

  test("same-path Home on Starting Point does not bounce through about:blank", async ({ page }) => {
    await hubEnterYear(page, "1998");
    const blanked = [];
    page.on("framenavigated", (frame) => {
      const u = frame.url();
      if (/^about:blank/.test(u)) blanked.push(u);
    });
    await page.locator("#btn-home").click();
    await waitGuided(page);
    expect(blanked, "about:blank bounce").toEqual([]);
    await expect(contentFrame(page).locator(".ott-guided")).toBeVisible();
  });
});
