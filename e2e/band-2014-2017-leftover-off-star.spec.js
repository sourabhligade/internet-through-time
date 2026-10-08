// @ts-check
/**
 * Phase 5 lock for 2014–2017. Leftover on WhatsApp and Stories does not
 * stamp the star. 2015 leftover trail stays empty.
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

test.describe("2014-2017 phase 5 leftover off the star", () => {
  test("Stories gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await readyGold(page, "2016");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-ig-stories");
      localStorage.removeItem("itt16-gold-lx");
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
    await expect.poll(() => raw(page, "itt16-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt16-ig-stories")).toBeNull();
    expect((await envelope(page, "itt16-gold-lx")).kind).toBe("leftover");
    await expect(nextFor(page, "itt16-ig-stories")).toBeHidden();
  });

  test("Stories leftover aimed at the star refuses and leaves the official key", async ({ page }) => {
    await rewriteLoKey(page, "gold-lx", "ig-stories");
    await page.goto("/years/2016/sites/instagram/stories.html");
    const planted = JSON.stringify({
      v: 1,
      year: "2016",
      key: "itt16-ig-stories",
      kind: "official",
      real: true,
      ts: 1,
    });
    await page.evaluate((blob) => {
      localStorage.setItem("itt16-ig-stories", blob);
      localStorage.removeItem("itt16-gold-lx");
    }, planted);
    await page.reload();
    await page.waitForFunction(() => {
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["2016"];
      const save = document.querySelector("[data-lo-save][data-lo-key='ig-stories']");
      const hit = trails && trails.some((row) => row && row.whenKey === "itt16-ig-stories" && Number(row.n) >= 1 && Number(row.n) <= 10);
      return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });
    const panel = await finishGold(page);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
    expect(await raw(page, "itt16-ig-stories")).toBe(planted);
    expect((await envelope(page, "itt16-ig-stories")).kind).toBe("official");
  });

  test("WhatsApp gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await readyGold(page, "2014");
    await page.evaluate(() => {
      localStorage.removeItem("itt14-wa-install");
      localStorage.removeItem("itt14-gold-lx");
    });
    await finishGold(page);
    await expect.poll(() => raw(page, "itt14-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt14-wa-install")).toBeNull();
    expect((await envelope(page, "itt14-gold-lx")).kind).toBe("leftover");
  });

  test("2015 leftover trail stays empty", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User), null, { timeout: 15000 });
    await expect(page.locator("[data-lo-save], [data-itt-gold-lx]")).toHaveCount(0);
  });
});
