// @ts-check
/**
 * 2021 dest-true official 10 — ATT Ask is the star.
 * Trap / empty never write. Period control writes official:true.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function officialTrue(raw) {
  const blob = JSON.parse(raw || "null");
  if (!blob) return false;
  if (Array.isArray(blob)) return !!(blob[0] && blob[0].official);
  return blob.official === true;
}

async function openClear(page, path, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.goto(path);
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, list);
  await page.reload();
}

async function tickReqs(page, sel) {
  const reqs = page.locator(sel);
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
}

/** @type {{ slug: string, key: string, label: string }[]} */
const OFFICIAL = [
  { slug: "att", key: "itt21-att", label: "ATT Ask" },
  { slug: "signal", key: "itt21-signal", label: "Signal leftover" },
  { slug: "copilot", key: "itt21-copilot", label: "Copilot waitlist" },
  { slug: "meta", key: "itt21-meta", label: "Meta rename leftover" },
  { slug: "windows11", key: "itt21-win11", label: "Windows 11 leftover" },
  { slug: "flash", key: "itt21-flash-brick", label: "Flash brick" },
  { slug: "chrome", key: "itt21-chrome", label: "Chrome habit" },
  { slug: "windows10", key: "itt21-win10", label: "Windows 10 residual" },
  { slug: "facebook", key: "itt21-pop-facebook", label: "Facebook leftover" },
  { slug: "playable", key: "itt21-game-five", label: "Five Letter", file: "game.html" },
];

test.describe("2021 dest-true official", () => {
  for (const dest of OFFICIAL) {
    const file = dest.file || "index.html";
    test(`${dest.label} trap / 0 ticks never write · ticks write ${dest.key}`, async ({ page }) => {
      await openClear(page, `/years/2021/sites/${dest.slug}/${file}`, [dest.key, "itt21-att", "itt20-zoom"]);
      const trap = page.locator("[data-official-trap]").first();
      if (await trap.count()) {
        await trap.click();
        expect(await getKey(page, dest.key)).toBeFalsy();
      }
      const verb = page.locator("[data-official-verb-host] [data-official-verb]");
      await verb.click();
      expect(await getKey(page, dest.key)).toBeFalsy();
      await tickReqs(page, "[data-official-verb-host] [data-official-req]");
      await verb.click();
      await expect.poll(() => getKey(page, dest.key), { timeout: 8000 }).toBeTruthy();
      expect(officialTrue(await getKey(page, dest.key))).toBe(true);
      if (dest.key !== "itt21-att") {
        expect(await getKey(page, "itt21-att")).toBeFalsy();
      }
      expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    });
  }

  test("guided stays 6 · leftover-3× first never lists gold dest", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("#ott-guided-2021 ol li")).toHaveCount(6);
    const first = page.locator('[data-itt-pop3x="2021"]').first();
    expect(await first.count()).toBeGreaterThan(0);
    const hrefs = await first.locator('a[href*="sites/"]').evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "")
    );
    expect(hrefs.some((h) => /\/att\//.test(h))).toBe(false);
    expect(hrefs.length).toBe(18);
  });
});
