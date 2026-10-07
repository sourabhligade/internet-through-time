// @ts-check
/**
 * Phase 5 lock for 1994–1997. The leftover panel on CSotD and PointCast
 * does not stamp the star. A real gold-lx write is kind leftover.
 * A save aimed at the n=1–10 star says it never stamps the official key.
 * The 841-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function envelope(page, key) {
  const text = await raw(page, key);
  return text ? JSON.parse(text) : null;
}

function nextFor(page, key) {
  return page.locator('[data-next-flow][data-next-when-key="' + key + '"]');
}

async function readyGold(page, year) {
  await page.waitForFunction(
    (y) => {
      const save = document.querySelector("[data-lo-save][data-lo-key='gold-lx']");
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails[y];
      return !!(
        save &&
        save.getAttribute("data-lo-bound") === "1" &&
        trails &&
        trails.length &&
        window.ITT.User
      );
    },
    year,
    { timeout: 20000 }
  );
}

async function finishGold(page) {
  const panel = page.locator("[data-itt-gold-lx]");
  await panel.locator("[data-lo-req]").nth(0).check();
  await panel.locator("[data-lo-req]").nth(1).check();
  await panel.locator("[data-lo-pick='keep']").click();
  await panel.locator("[data-lo-save]").click();
  return panel;
}

test.describe("1994-1997 phase 5 leftover off the star", () => {
  test("CSotD gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    await readyGold(page, "1994");
    await page.evaluate(() => {
      localStorage.removeItem("itt94-csotd");
      localStorage.removeItem("itt94-gold-lx");
    });
    const panel = page.locator("[data-itt-gold-lx]");
    await panel.locator("[data-lo-trap]").click();
    await expect(panel.locator("[data-lo-status]")).toContainText(/never writes/i);
    expect(await raw(page, "itt94-csotd")).toBeNull();
    expect(await raw(page, "itt94-gold-lx")).toBeNull();
    await finishGold(page);
    await expect.poll(() => raw(page, "itt94-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt94-csotd")).toBeNull();
    const saved = await envelope(page, "itt94-gold-lx");
    expect(saved && saved.kind).toBe("leftover");
    expect(saved.real).toBe(true);
    expect(saved.leftover).toBe(true);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Saved.");
    await expect(panel.locator("[data-lo-status]")).not.toContainText(/itt94-/);
    await expect(nextFor(page, "itt94-csotd")).toBeHidden();
    await page.reload();
    await readyGold(page, "1994");
    expect(await raw(page, "itt94-csotd")).toBeNull();
    const again = await envelope(page, "itt94-gold-lx");
    expect(again && again.kind).toBe("leftover");
    await expect(nextFor(page, "itt94-csotd")).toBeHidden();
  });

  test("CSotD leftover aimed at the star refuses and leaves the official key", async ({ page }) => {
    await page.addInitScript(() => {
      function rewrite() {
        var nodes = document.querySelectorAll("[data-lo-save][data-lo-key='gold-lx']");
        for (var i = 0; i < nodes.length; i++) nodes[i].setAttribute("data-lo-key", "csotd");
      }
      document.addEventListener("DOMContentLoaded", rewrite);
      try {
        new MutationObserver(rewrite).observe(document, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["data-lo-key"],
        });
      } catch (e) { /* document not observable yet */ }
    });
    await page.goto("/years/1994/sites/csotd/index.html?pick=3");
    const planted = JSON.stringify({
      v: 1,
      year: "1994",
      key: "itt94-csotd",
      kind: "official",
      real: true,
      ts: 1,
      name: "Ada",
    });
    await page.evaluate((blob) => {
      localStorage.setItem("itt94-csotd", blob);
      localStorage.removeItem("itt94-gold-lx");
    }, planted);
    await page.reload();
    await page.waitForFunction(() => {
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["1994"];
      const save = document.querySelector("[data-lo-save][data-lo-key='csotd']");
      const hit = trails && trails.some((row) => row && row.whenKey === "itt94-csotd" && Number(row.n) >= 1 && Number(row.n) <= 10);
      return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });
    const panel = await finishGold(page);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
    expect(await raw(page, "itt94-csotd")).toBe(planted);
    expect(await raw(page, "itt94-gold-lx")).toBeNull();
    const kept = await envelope(page, "itt94-csotd");
    expect(kept && kept.kind).toBe("official");
  });

  test("PointCast gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/1997/sites/pointcast/index.html");
    await readyGold(page, "1997");
    await page.evaluate(() => {
      localStorage.removeItem("itt97-pointcast");
      localStorage.removeItem("itt97-gold-lx");
    });
    const panel = page.locator("[data-itt-gold-lx]");
    await panel.locator("[data-lo-trap]").click();
    expect(await raw(page, "itt97-pointcast")).toBeNull();
    expect(await raw(page, "itt97-gold-lx")).toBeNull();
    await finishGold(page);
    await expect.poll(() => raw(page, "itt97-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt97-pointcast")).toBeNull();
    const saved = await envelope(page, "itt97-gold-lx");
    expect(saved && saved.kind).toBe("leftover");
    expect(saved.real).toBe(true);
    expect(saved.leftover).toBe(true);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Saved.");
    await expect(panel.locator("[data-lo-status]")).not.toContainText(/itt97-/);
    await expect(nextFor(page, "itt97-pointcast")).toBeHidden();
    await page.reload();
    await readyGold(page, "1997");
    expect(await raw(page, "itt97-pointcast")).toBeNull();
    const again = await envelope(page, "itt97-gold-lx");
    expect(again && again.kind).toBe("leftover");
    await expect(nextFor(page, "itt97-pointcast")).toBeHidden();
  });

  test("PointCast leftover aimed at the star refuses and leaves the official key", async ({ page }) => {
    await page.addInitScript(() => {
      function rewrite() {
        var nodes = document.querySelectorAll("[data-lo-save][data-lo-key='gold-lx']");
        for (var i = 0; i < nodes.length; i++) nodes[i].setAttribute("data-lo-key", "pointcast");
      }
      document.addEventListener("DOMContentLoaded", rewrite);
      try {
        new MutationObserver(rewrite).observe(document, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["data-lo-key"],
        });
      } catch (e) { /* document not observable yet */ }
    });
    await page.goto("/years/1997/sites/pointcast/index.html");
    const planted = JSON.stringify({
      v: 1,
      year: "1997",
      key: "itt97-pointcast",
      kind: "official",
      real: true,
      ts: 1,
      channels: ["News", "Weather"],
    });
    await page.evaluate((blob) => {
      localStorage.setItem("itt97-pointcast", blob);
      localStorage.removeItem("itt97-gold-lx");
    }, planted);
    await page.reload();
    await page.waitForFunction(() => {
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["1997"];
      const save = document.querySelector("[data-lo-save][data-lo-key='pointcast']");
      const hit = trails && trails.some((row) => row && row.whenKey === "itt97-pointcast" && Number(row.n) >= 1 && Number(row.n) <= 10);
      return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });
    const panel = await finishGold(page);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
    expect(await raw(page, "itt97-pointcast")).toBe(planted);
    expect(await raw(page, "itt97-gold-lx")).toBeNull();
    const kept = await envelope(page, "itt97-pointcast");
    expect(kept && kept.kind).toBe("official");
    await expect(nextFor(page, "itt97-pointcast")).toBeVisible();
  });
});
