// @ts-check
/**
 * Phase 5 lock for 2014–2017. Leftover on WhatsApp does not stamp the
 * star. 2015 leftover trail stays empty.
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
