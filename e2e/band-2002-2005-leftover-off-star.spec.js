// @ts-check
/**
 * Phase 5 lock for 2002–2005. The leftover panel on Stumble, Photobucket,
 * thefacebook networks, and YouTube upload does not stamp the star. A real
 * gold-lx write is kind leftover. A save aimed at the n=1–10 star says it
 * never stamps the official key. leftover-official.js bootOne already refuses
 * that rewrite. The 2,319-page walk is phase 6.
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

test.describe("2002-2005 phase 5 leftover off the star", () => {
  test("Stumble gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    await readyGold(page, "2002");
    await page.evaluate(() => {
      localStorage.removeItem("itt02-stumble");
      localStorage.removeItem("itt02-gold-lx");
    });
    expect(
      await page.evaluate(() => {
        const gold = document.querySelector("[data-itt-gold-lx]");
        const exhibit = document.querySelector("[data-su-stumble], [data-official-verb]");
        if (!gold || !exhibit) return false;
        return gold.getBoundingClientRect().top + 1 >= exhibit.getBoundingClientRect().bottom;
      })
    ).toBe(true);
    const panel = page.locator("[data-itt-gold-lx]");
    await panel.locator("[data-lo-trap]").click();
    await expect(panel.locator("[data-lo-status]")).toContainText(/never writes/i);
    expect(await raw(page, "itt02-stumble")).toBeNull();
    expect(await raw(page, "itt02-gold-lx")).toBeNull();
    await finishGold(page);
    await expect.poll(() => raw(page, "itt02-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt02-stumble")).toBeNull();
    const saved = await envelope(page, "itt02-gold-lx");
    expect(saved && saved.kind).toBe("leftover");
    expect(saved.real).toBe(true);
    expect(saved.leftover).toBe(true);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Saved.");
    await expect(panel.locator("[data-lo-status]")).not.toContainText(/itt02-/);
    await expect(nextFor(page, "itt02-stumble")).toBeHidden();
  });

  test("Stumble leftover aimed at the star refuses and leaves the official key", async ({ page }) => {
    await rewriteLoKey(page, "gold-lx", "stumble");
    await page.goto("/years/2002/sites/stumbleupon/index.html");
    const planted = JSON.stringify({
      v: 1,
      year: "2002",
      key: "itt02-stumble",
      kind: "official",
      real: true,
      ts: 1,
    });
    await page.evaluate((blob) => {
      localStorage.setItem("itt02-stumble", blob);
      localStorage.removeItem("itt02-gold-lx");
    }, planted);
    await page.reload();
    await page.waitForFunction(() => {
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["2002"];
      const save = document.querySelector("[data-lo-save][data-lo-key='stumble']");
      const hit = trails && trails.some((row) => row && row.whenKey === "itt02-stumble" && Number(row.n) >= 1 && Number(row.n) <= 10);
      return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });
    const panel = await finishGold(page);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
    expect(await raw(page, "itt02-stumble")).toBe(planted);
    expect(await raw(page, "itt02-gold-lx")).toBeNull();
    const kept = await envelope(page, "itt02-stumble");
    expect(kept && kept.kind).toBe("official");
    await expect(nextFor(page, "itt02-stumble")).toBeVisible();
  });

  test("Photobucket gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2003/sites/photobucket/index.html");
    await readyGold(page, "2003");
    await page.evaluate(() => {
      localStorage.removeItem("itt03-photobucket");
      localStorage.removeItem("itt03-gold-lx");
    });
    expect(
      await page.evaluate(() => {
        const gold = document.querySelector("[data-itt-gold-lx]");
        const exhibit = document.querySelector("[data-pb-upload], form");
        if (!gold || !exhibit) return false;
        return gold.getBoundingClientRect().top + 1 >= exhibit.getBoundingClientRect().bottom;
      })
    ).toBe(true);
    await finishGold(page);
    await expect.poll(() => raw(page, "itt03-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt03-photobucket")).toBeNull();
    const saved = await envelope(page, "itt03-gold-lx");
    expect(saved && saved.kind).toBe("leftover");
    await expect(nextFor(page, "itt03-photobucket")).toBeHidden();
  });

  test("YouTube gold-lx writes leftover and leaves the star empty", async ({ page }) => {
    await page.goto("/years/2005/sites/youtube/upload.html");
    await readyGold(page, "2005");
    await page.evaluate(() => {
      localStorage.removeItem("itt05-yt-uploads");
      localStorage.removeItem("itt05-gold-lx");
    });
    expect(
      await page.evaluate(() => {
        const gold = document.querySelector("[data-itt-gold-lx]");
        const exhibit = document.querySelector("[data-yt-upload], form");
        if (!gold || !exhibit) return false;
        return gold.getBoundingClientRect().top + 1 >= exhibit.getBoundingClientRect().bottom;
      })
    ).toBe(true);
    const panel = page.locator("[data-itt-gold-lx]");
    await finishGold(page);
    await expect.poll(() => raw(page, "itt05-gold-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await raw(page, "itt05-yt-uploads")).toBeNull();
    const saved = await envelope(page, "itt05-gold-lx");
    expect(saved && saved.kind).toBe("leftover");
    expect(saved.real).toBe(true);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Saved.");
    await expect(nextFor(page, "itt05-yt-uploads")).toBeHidden();
  });

  test("YouTube leftover aimed at the star refuses and leaves the official key", async ({ page }) => {
    await rewriteLoKey(page, "gold-lx", "yt-uploads");
    await page.goto("/years/2005/sites/youtube/upload.html");
    const planted = JSON.stringify({
      v: 1,
      year: "2005",
      key: "itt05-yt-uploads",
      kind: "official",
      real: true,
      ts: 1,
    });
    await page.evaluate((blob) => {
      localStorage.setItem("itt05-yt-uploads", blob);
      localStorage.removeItem("itt05-gold-lx");
    }, planted);
    await page.reload();
    await page.waitForFunction(() => {
      const trails = window.ITT && ITT.flowTrails && ITT.flowTrails["2005"];
      const save = document.querySelector("[data-lo-save][data-lo-key='yt-uploads']");
      const hit = trails && trails.some((row) => row && row.whenKey === "itt05-yt-uploads" && Number(row.n) >= 1 && Number(row.n) <= 10);
      return !!(hit && save && save.getAttribute("data-lo-bound") === "1");
    }, null, { timeout: 20000 });
    const panel = await finishGold(page);
    await expect(panel.locator("[data-lo-status]")).toHaveText("Leftover never stamps the official key.");
    expect(await raw(page, "itt05-yt-uploads")).toBe(planted);
    expect(await raw(page, "itt05-gold-lx")).toBeNull();
    const kept = await envelope(page, "itt05-yt-uploads");
    expect(kept && kept.kind).toBe("official");
    await expect(nextFor(page, "itt05-yt-uploads")).toBeVisible();
  });
});
