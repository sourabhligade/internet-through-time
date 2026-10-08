// @ts-check
/**
 * Phase 5 lock for 1998–2001. The leftover panel on Lucky and Wikipedia
 * does not stamp the star. A real gold-lx write is kind leftover.
 * A save aimed at the n=1–10 star says it never stamps the official key.
 * leftover-official.js bootOne already refuses that rewrite. The 1,539-page
 * walk is phase 6.
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

async function rewriteLoKey(page, from, to) {
  await page.addInitScript(
    ({ from: src, to: dest }) => {
      function rewrite() {
        var nodes = document.querySelectorAll("[data-lo-save][data-lo-key='" + src + "']");
        for (var i = 0; i < nodes.length; i++) nodes[i].setAttribute("data-lo-key", dest);
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
    },
    { from, to }
  );
}

test.describe("1998-2001 phase 5 leftover off the star", () => {
  test("Lucky gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await readyGold(page, "1998");
    await page.evaluate(() => {
      localStorage.removeItem("itt98-lucky");
      localStorage.removeItem("itt98-gold-lx");
    });
    expect(
      await page.evaluate(() => {
        const gold = document.querySelector("[data-itt-gold-lx]");
        const exhibit = document.querySelector("[data-google-lucky], form[data-google-search]");
        if (!gold || !exhibit) return false;
        return gold.getBoundingClientRect().top + 1 >= exhibit.getBoundingClientRect().bottom;
      })
    ).toBe(true);
    const panel = page.locator("[data-itt-gold-lx]");
    await panel.locator("[data-lo-trap]").click();
    await expect(panel.locator("[data-lo-status]")).toContainText(/never writes/i);
    expect(await raw(page, "itt98-lucky")).toBeNull();
    expect(await raw(page, "itt98-gold-lx")).toBeNull();
    await finishGold(page);
    await expect.poll(() => raw(page, "itt98-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt98-lucky")).toBeNull();
    const saved = await envelope(page, "itt98-gold-lx");
    expect(saved && saved.kind).toBe("leftover");
    expect(saved.real).toBe(true);
    expect(saved.leftover).toBe(true);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Saved.");
    await expect(panel.locator("[data-lo-status]")).not.toContainText(/itt98-/);
    await expect(nextFor(page, "itt98-lucky")).toBeHidden();
    await page.reload();
    await readyGold(page, "1998");
    expect(await raw(page, "itt98-lucky")).toBeNull();
    const again = await envelope(page, "itt98-gold-lx");
    expect(again && again.kind).toBe("leftover");
    await expect(nextFor(page, "itt98-lucky")).toBeHidden();
  });

  test("Lucky leftover aimed at the star refuses and leaves the official key", async ({ page }) => {
    await rewriteLoKey(page, "gold-lx", "lucky");
    await page.goto("/years/1998/sites/google/lucky.html");
    const planted = JSON.stringify({
      v: 1,
      year: "1998",
      key: "itt98-lucky",
      kind: "official",
      real: true,
      ts: 1,
      q: "yahoo",
    });
    await page.evaluate((blob) => {
      localStorage.setItem("itt98-lucky", blob);
      localStorage.removeItem("itt98-gold-lx");
    }, planted);
    await page.reload();
    await page.waitForFunction(() => {
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["1998"];
      const save = document.querySelector("[data-lo-save][data-lo-key='lucky']");
      const hit = trails && trails.some((row) => row && row.whenKey === "itt98-lucky" && Number(row.n) >= 1 && Number(row.n) <= 10);
      return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });
    const panel = await finishGold(page);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
    expect(await raw(page, "itt98-lucky")).toBe(planted);
    expect(await raw(page, "itt98-gold-lx")).toBeNull();
    const kept = await envelope(page, "itt98-lucky");
    expect(kept && kept.kind).toBe("official");
    await expect(nextFor(page, "itt98-lucky")).toBeVisible();
  });

  test("Wikipedia gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    await readyGold(page, "2001");
    await page.evaluate(() => {
      localStorage.removeItem("itt01-wiki");
      localStorage.removeItem("itt01-gold-lx");
    });
    expect(
      await page.evaluate(() => {
        const gold = document.querySelector("[data-itt-gold-lx]");
        const exhibit = document.querySelector("[data-official-verb], form");
        if (!gold || !exhibit) return false;
        return gold.getBoundingClientRect().top + 1 >= exhibit.getBoundingClientRect().bottom;
      })
    ).toBe(true);
    const panel = page.locator("[data-itt-gold-lx]");
    await panel.locator("[data-lo-trap]").click();
    expect(await raw(page, "itt01-wiki")).toBeNull();
    expect(await raw(page, "itt01-gold-lx")).toBeNull();
    await finishGold(page);
    await expect.poll(() => raw(page, "itt01-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt01-wiki")).toBeNull();
    const saved = await envelope(page, "itt01-gold-lx");
    expect(saved && saved.kind).toBe("leftover");
    expect(saved.real).toBe(true);
    expect(saved.leftover).toBe(true);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Saved.");
    await expect(panel.locator("[data-lo-status]")).not.toContainText(/itt01-/);
    await expect(nextFor(page, "itt01-wiki")).toBeHidden();
    await page.reload();
    await readyGold(page, "2001");
    expect(await raw(page, "itt01-wiki")).toBeNull();
    const again = await envelope(page, "itt01-gold-lx");
    expect(again && again.kind).toBe("leftover");
    await expect(nextFor(page, "itt01-wiki")).toBeHidden();
  });

  test("Wikipedia leftover aimed at the star refuses and leaves the official key", async ({ page }) => {
    await rewriteLoKey(page, "gold-lx", "wiki");
    await page.goto("/years/2001/sites/wikipedia/edit.html");
    const planted = JSON.stringify({
      v: 1,
      year: "2001",
      key: "itt01-wiki",
      kind: "official",
      real: true,
      ts: 1,
    });
    await page.evaluate((blob) => {
      localStorage.setItem("itt01-wiki", blob);
      localStorage.removeItem("itt01-gold-lx");
    }, planted);
    await page.reload();
    await page.waitForFunction(() => {
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["2001"];
      const save = document.querySelector("[data-lo-save][data-lo-key='wiki']");
      const hit = trails && trails.some((row) => row && row.whenKey === "itt01-wiki" && Number(row.n) >= 1 && Number(row.n) <= 10);
      return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });
    const panel = await finishGold(page);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
    expect(await raw(page, "itt01-wiki")).toBe(planted);
    expect(await raw(page, "itt01-gold-lx")).toBeNull();
    const kept = await envelope(page, "itt01-wiki");
    expect(kept && kept.kind).toBe("official");
    await expect(nextFor(page, "itt01-wiki")).toBeVisible();
  });
});
