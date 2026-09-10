// @ts-check
/**
 * 2022 every flow — real dest-true + leftover 2× writers.
 * Trap / empty / 0 ticks never write. Complete writes the named key.
 * No mocks. Next dest is HTTP 200. No 2021 clone dests.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** @type {{ slug: string, file: string, official: string | null, leftover: string[], next: string | null, need?: string }[]} */
const DESTS = [
  { slug: "chatgpt", file: "index.html", official: "itt22-chatgpt", leftover: ["chatgpt-lx", "chatgpt-d2"], next: "/years/2022/sites/twitter/index.html", need: "explain this" },
  { slug: "twitter", file: "index.html", official: "itt22-twitter", leftover: ["twitter-lx", "twitter-d2"], next: "/years/2022/sites/wordle/index.html" },
  { slug: "wordle", file: "index.html", official: "itt22-wordle", leftover: ["wordle-lx", "wordle-d2"], next: "/years/2022/sites/stablediffusion/index.html" },
  { slug: "stablediffusion", file: "index.html", official: "itt22-sd", leftover: ["stablediffusion-lx", "stablediffusion-d2"], next: "/years/2022/sites/mastodon/index.html" },
  { slug: "mastodon", file: "index.html", official: "itt22-mastodon", leftover: ["mastodon-lx", "mastodon-d2"], next: "/years/2022/sites/bereal/index.html" },
  { slug: "bereal", file: "index.html", official: "itt22-bereal", leftover: ["bereal-lx", "bereal-d2"], next: "/years/2022/sites/dalle2/index.html" },
  { slug: "dalle2", file: "index.html", official: "itt22-dalle2", leftover: ["dalle2-lx", "dalle2-d2"], next: "/years/2022/sites/copilotga/index.html" },
  { slug: "copilotga", file: "index.html", official: "itt22-copilotga", leftover: ["copilotga-lx", "copilotga-d2"], next: "/years/2022/sites/chrome/index.html" },
  { slug: "chrome", file: "index.html", official: "itt22-chrome", leftover: ["chrome-lx", "chrome-d2"], next: "/years/2022/sites/playable/game.html" },
  { slug: "playable", file: "game.html", official: "itt22-game-prompt", leftover: ["playable-lx", "playable-d2"], next: "/years/2022/sites/chatgpt/index.html" },
  { slug: "youtube", file: "index.html", official: null, leftover: ["youtube", "youtube-d2"], next: "/years/2022/sites/wikipedia/index.html" },
  { slug: "wikipedia", file: "index.html", official: null, leftover: ["wikipedia", "wikipedia-d2"], next: "/years/2022/sites/facebook/index.html" },
  { slug: "facebook", file: "index.html", official: null, leftover: ["facebook", "facebook-d2"], next: "/years/2022/sites/ftx/index.html" },
  { slug: "ftx", file: "index.html", official: null, leftover: ["ftx", "ftx-d2"], next: "/years/2022/sites/luna/index.html" },
  { slug: "luna", file: "index.html", official: null, leftover: ["luna", "luna-d2"], next: "/years/2022/sites/chatgpt/index.html" },
];

function destUrl(d) {
  return `/years/2022/sites/${d.slug}/${d.file}`;
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function officialTrue(raw) {
  const blob = JSON.parse(raw || "null");
  if (!blob) return false;
  if (Array.isArray(blob)) return !!(blob[0] && blob[0].official);
  return blob.official === true;
}

function leftoverTrue(raw) {
  const blob = JSON.parse(raw || "null");
  if (!blob) return false;
  return blob.real === true && blob.leftover === true && String(blob.year) === "2022";
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, keys);
}

async function openClear(page, url, keys) {
  await page.goto(url);
  await clearKeys(page, keys);
  await page.reload();
}

async function tick(page, sel) {
  const reqs = page.locator(sel);
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check({ force: true });
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {typeof DESTS[0]} d
 */
async function completeOfficial(page, d) {
  const official = /** @type {string} */ (d.official);
  const url = destUrl(d);
  await openClear(page, url, [official, "itt22-chatgpt", "itt21-att"]);
  const trap = page.locator("[data-official-verb-host] [data-official-trap]").first();
  if (await trap.count()) {
    await trap.click({ force: true });
    expect(await getKey(page, official), official + " trap").toBeFalsy();
  }
  const verb = page.locator("[data-official-verb-host] [data-official-verb]");
  await expect(verb).toBeVisible({ timeout: 20000 });
  await verb.click({ force: true });
  expect(await getKey(page, official), official + " 0 ticks").toBeFalsy();
  const need = page.locator("[data-official-verb-host] [data-official-need]");
  if (await need.count()) {
    await need.fill(d.need || "museum leftover");
  }
  await tick(page, "[data-official-verb-host] [data-official-req]");
  await verb.click({ force: true });
  await expect.poll(() => getKey(page, official), { timeout: 8000 }).toBeTruthy();
  expect(officialTrue(await getKey(page, official)), official + " official").toBe(true);
  if (official !== "itt22-chatgpt") {
    expect(await getKey(page, "itt22-chatgpt"), official + " never gold").toBeFalsy();
  }
  expect(await getKey(page, "itt21-att"), official + " never 2021 gold").toBeFalsy();
  if (d.next) {
    const nextA = page.locator("[data-next-flow] a[href]").first();
    await expect(nextA).toBeVisible({ timeout: 8000 });
    const href = await nextA.getAttribute("href");
    const resolved = new URL(href || "", "http://127.0.0.1:8080" + url).pathname;
    expect(resolved.replace(/\/$/, "")).toBe(d.next.replace(/\/$/, ""));
    const res = await page.request.get(resolved);
    expect(res.status(), official + " next " + resolved).toBe(200);
  }
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} url
 * @param {string} suffix
 */
async function completeLeftover(page, url, suffix) {
  const key = "itt22-" + suffix;
  await openClear(page, url, [key, "itt22-chatgpt", "itt21-att"]);
  await revealLeftoverRails(page);
  const save = page.locator(`[data-lo-save][data-lo-key="${suffix}"]`).first();
  await expect(save, suffix + " writer").toBeVisible({ timeout: 20000 });
  await page.waitForFunction(
    (s) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + s + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  const trap = lo.locator("[data-lo-trap]").first();
  if (await trap.count()) {
    await trap.click({ force: true });
    expect(await getKey(page, key), key + " trap").toBeFalsy();
  }
  await save.click({ force: true });
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  const needPick = (await save.getAttribute("data-lo-need-pick")) || "";
  const minPick = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
  if (nPick || (await lo.locator("[data-lo-field]").count())) {
    await save.click({ force: true });
    expect(await getKey(page, key), key + " ticks only").toBeFalsy();
  }
  if (needPick) {
    await lo.locator(`[data-lo-pick="${needPick}"]`).click({ force: true });
  } else if (nPick) {
    const need = minPick || nPick;
    for (let i = 0; i < need && i < nPick; i++) await picks.nth(i).click({ force: true });
  }
  const field = lo.locator("[data-lo-field]");
  if (await field.count()) {
    await save.click({ force: true });
    expect(await getKey(page, key), key + " empty field").toBeFalsy();
    await field.fill("museum leftover");
  }
  await save.click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(leftoverTrue(await getKey(page, key)), key + " leftover blob").toBe(true);
  if (key !== "itt22-chatgpt") {
    expect(await getKey(page, "itt22-chatgpt"), key + " never gold").toBeFalsy();
  }
  expect(await getKey(page, "itt21-att"), key + " never 2021 gold").toBeFalsy();
}

test.describe("2022 every dest is on disk", () => {
  test("dest freeze 98 · official 10 leftover 2× · no 2021 official clones", () => {
    expect(DESTS.length).toBe(15);
    const n = fs.readdirSync(path.join(ROOT, "years/2022/sites")).filter((d) =>
      fs.statSync(path.join(ROOT, "years/2022/sites", d)).isDirectory()
    ).length;
    expect(n).toBe(98);
    const slugs = DESTS.map((d) => d.slug);
    for (const clone of ["att", "signal", "copilot", "meta", "windows11", "flash", "nft", "clubhouse", "squid"]) {
      expect(slugs, clone + " clone").not.toContain(clone);
    }
    for (const d of DESTS) {
      const file = path.join(ROOT, "years/2022/sites", d.slug, d.file);
      expect(fs.existsSync(file), d.slug).toBe(true);
      expect(d.leftover.length, d.slug + " leftover 2×").toBe(2);
    }
    expect(DESTS.filter((d) => d.official).length).toBe(10);
  });
});

test.describe("2022 official 10 dest-true", () => {
  for (const d of DESTS.filter((x) => x.official)) {
    test(`${d.official} trap/empty never write · complete official · next live`, async ({ page }) => {
      await completeOfficial(page, d);
    });
  }
});

test.describe("2022 leftover 2× every dest · both writers", () => {
  for (const d of DESTS) {
    for (const suf of d.leftover) {
      test(`${d.slug} ${suf} trap/empty never write · leftover writes · never gold`, async ({ page }) => {
        await completeLeftover(page, destUrl(d), suf);
      });
    }
  }
});

test.describe("2022 every in-year href is live", () => {
  test("home guided 6 + leftover-3× first + third dests HTTP 200", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("#ott-guided-2022 ol li")).toHaveCount(6);
    const hrefs = await page.locator('a[href*="sites/"], a[href$=".html"]').evaluateAll((els) =>
      els.map((a) => a.getAttribute("href") || "").filter(Boolean)
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(54);
    const seen = new Set();
    for (const h of hrefs) {
      if (h.startsWith("http") || h.startsWith("#")) continue;
      const resolved = new URL(h, "http://127.0.0.1:8080/years/2022/pages/home.html").pathname;
      if (seen.has(resolved)) continue;
      seen.add(resolved);
      const res = await page.request.get(resolved);
      expect(res.status(), resolved).toBe(200);
    }
    const first = page.locator('[data-itt-pop3x="2022"] a[href*="sites/"]');
    const third = page.locator('[data-itt-pop-3x3="2022"] a[href*="sites/"]');
    expect(await first.count()).toBe(18);
    expect(await third.count()).toBe(18);
    expect(await page.locator('[data-itt-pop-more="2022"] a[href*="sites/"]').count()).toBe(18);
    const firstH = await first.evaluateAll((els) => els.map((a) => a.getAttribute("href") || ""));
    expect(firstH.some((h) => /\/chatgpt\//.test(h))).toBe(false);
  });

  test("every dest page crumb + next href HTTP 200", async ({ page }) => {
    for (const d of DESTS) {
      const url = destUrl(d);
      await page.goto(url);
      const hrefs = await page.locator("a[href]").evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "").filter(Boolean)
      );
      expect(hrefs.length, d.slug + " has links").toBeGreaterThan(0);
      const seen = new Set();
      for (const h of hrefs) {
        if (h.startsWith("http") || h.startsWith("#") || h.startsWith("mailto:")) continue;
        const resolved = new URL(h, "http://127.0.0.1:8080" + url).pathname;
        if (!resolved.startsWith("/years/2022/")) continue;
        if (seen.has(resolved)) continue;
        seen.add(resolved);
        const res = await page.request.get(resolved);
        expect(res.status(), d.slug + " → " + resolved).toBe(200);
      }
    }
  });

  test("about + map + year shell live", async ({ page }) => {
    for (const p of ["/years/2022/pages/about.html", "/years/2022/pages/map.html", "/years/2022/"]) {
      const res = await page.request.get(p);
      expect(res.status(), p).toBe(200);
    }
    await page.goto("/years/2022/");
    const skip = page.locator("#skip-connect");
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2022");
    await expect(page.locator("#content")).toBeVisible();
  });
});
