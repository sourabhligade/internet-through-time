// @ts-check
/**
 * Phase 5 lock for 2010–2013. Leftover panels on Instagram Android and Vine
 * do not stamp the star.
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
      return !!(save && save.getAttribute("data-lo-bound") === "1" && trails && trails.length && window.ITT.User);
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
      } catch (e) { /* */ }
    },
    { from, to }
  );
}

test.describe("2010-2013 phase 5 leftover off the star", () => {
  test("Instagram Android gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2012/sites/instagram/android.html");
    await readyGold(page, "2012");
    await page.evaluate(() => {
      localStorage.removeItem("itt12-ig-android");
      localStorage.removeItem("itt12-gold-lx");
    });
    expect(
      await page.evaluate(() => {
        const gold = document.querySelector("[data-itt-gold-lx]");
        const exhibit = document.querySelector("[data-official-verb]");
        if (!gold || !exhibit) return false;
        return gold.getBoundingClientRect().top + 1 >= exhibit.getBoundingClientRect().bottom;
      })
    ).toBe(true);
    await finishGold(page);
    await expect.poll(() => raw(page, "itt12-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt12-ig-android")).toBeNull();
    expect((await envelope(page, "itt12-gold-lx")).kind).toBe("leftover");
    await expect(nextFor(page, "itt12-ig-android")).toBeHidden();
  });

  test("Vine gold-lx writes leftover and leftover aimed at the star refuses", async ({ page }) => {
    await page.goto("/years/2013/sites/vine/record.html");
    await readyGold(page, "2013");
    await page.evaluate(() => {
      localStorage.removeItem("itt13-vine-posts");
      localStorage.removeItem("itt13-gold-lx");
    });
    await finishGold(page);
    await expect.poll(() => raw(page, "itt13-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt13-vine-posts")).toBeNull();
  });

  test("Vine leftover aimed at the star refuses and leaves the official key", async ({ page }) => {
    await rewriteLoKey(page, "gold-lx", "vine-posts");
    await page.goto("/years/2013/sites/vine/record.html");
    const planted = JSON.stringify({
      v: 1,
      year: "2013",
      key: "itt13-vine-posts",
      kind: "official",
      real: true,
      ts: 1,
    });
    await page.evaluate((blob) => {
      localStorage.setItem("itt13-vine-posts", blob);
      localStorage.removeItem("itt13-gold-lx");
    }, planted);
    await page.reload();
    await page.waitForFunction(() => {
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["2013"];
      const save = document.querySelector("[data-lo-save][data-lo-key='vine-posts']");
      const hit = trails && trails.some((row) => row && row.whenKey === "itt13-vine-posts" && Number(row.n) >= 1 && Number(row.n) <= 10);
      return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });
    const panel = await finishGold(page);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
    expect(await raw(page, "itt13-vine-posts")).toBe(planted);
    expect((await envelope(page, "itt13-vine-posts")).kind).toBe("official");
  });
});
