// @ts-check
/**
 * 2022 dest-true official 10 — ChatGPT Send is the star.
 * Unique dests. No 2021 ATT / Signal / Copilot waitlist clones.
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

/** @type {{ slug: string, key: string, label: string, file?: string, need?: string }[]} */
const OFFICIAL = [
  { slug: "chatgpt", key: "itt22-chatgpt", label: "ChatGPT Send", need: "explain this" },
  { slug: "twitter", key: "itt22-twitter", label: "Twitter leftover" },
  { slug: "wordle", key: "itt22-wordle", label: "Wordle leftover" },
  { slug: "stablediffusion", key: "itt22-sd", label: "Stable Diffusion leftover" },
  { slug: "mastodon", key: "itt22-mastodon", label: "Mastodon leftover" },
  { slug: "bereal", key: "itt22-bereal", label: "BeReal leftover" },
  { slug: "dalle2", key: "itt22-dalle2", label: "DALL·E 2 leftover" },
  { slug: "copilotga", key: "itt22-copilotga", label: "Copilot GA leftover" },
  { slug: "chrome", key: "itt22-chrome", label: "Chrome habit" },
  { slug: "playable", key: "itt22-game-prompt", label: "Prompt Box", file: "game.html" },
];

test.describe("2022 dest-true official", () => {
  test("catalog is unique vs 2021 dests", () => {
    const slugs = OFFICIAL.map((d) => d.slug);
    for (const clone of ["att", "signal", "copilot", "meta", "windows11", "flash", "nft", "clubhouse", "squid"]) {
      expect(slugs, clone + " clone").not.toContain(clone);
    }
    expect(slugs).toContain("copilotga");
    expect(slugs).not.toContain("copilot");
  });

  for (const dest of OFFICIAL) {
    const file = dest.file || "index.html";
    test(`${dest.label} trap / 0 ticks never write · ticks write ${dest.key}`, async ({ page }) => {
      await openClear(page, `/years/2022/sites/${dest.slug}/${file}`, [dest.key, "itt22-chatgpt", "itt21-att"]);
      const trap = page.locator("[data-official-trap]").first();
      if (await trap.count()) {
        await trap.click();
        expect(await getKey(page, dest.key)).toBeFalsy();
      }
      const verb = page.locator("[data-official-verb-host] [data-official-verb]");
      await verb.click();
      expect(await getKey(page, dest.key)).toBeFalsy();
      const need = page.locator("[data-official-verb-host] [data-official-need]");
      if (await need.count()) {
        await need.fill(dest.need || "museum leftover");
      }
      await tickReqs(page, "[data-official-verb-host] [data-official-req]");
      await verb.click();
      await expect.poll(() => getKey(page, dest.key), { timeout: 8000 }).toBeTruthy();
      expect(officialTrue(await getKey(page, dest.key))).toBe(true);
      if (dest.key !== "itt22-chatgpt") {
        expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
      }
      expect(await getKey(page, "itt21-att")).toBeFalsy();
    });
  }

  test("guided stays 6 · leftover-3× first never lists gold dest", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("#ott-guided-2022 ol li")).toHaveCount(6);
    const first = page.locator('[data-itt-pop3x="2022"]').first();
    expect(await first.count()).toBeGreaterThan(0);
    const hrefs = await first.locator('a[href*="sites/"]').evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "")
    );
    expect(hrefs.some((h) => /\/chatgpt\//.test(h))).toBe(false);
    expect(hrefs.length).toBe(18);
  });
});
