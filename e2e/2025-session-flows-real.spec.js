// @ts-check
/**
 * 2025 session dests — gold + official leftovers must be REAL.
 * dest-field plaques and empty-Go writes fail.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const SITES = path.join(ROOT, "years", "2025", "sites");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function clearKey(page, key) {
  await page.evaluate((k) => {
    try { localStorage.removeItem(k); } catch (e) { /* */ }
  }, key);
}

test("2025 dests have no dest-field plaques", async () => {
  const htmls = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (name.endsWith(".html")) htmls.push(p);
    }
  }
  walk(SITES);
  const bad = [];
  for (const p of htmls) {
    const t = fs.readFileSync(p, "utf8");
    if (t.includes("data-dest-field")) bad.push(p + " dest-field");
    if (/I read the \d{4} period note/i.test(t)) bad.push(p + " plaque");
  }
  expect(bad, bad.join("\n")).toEqual([]);
});

test("2025 guided ol is exactly 6", async () => {
  const home = fs.readFileSync(path.join(ROOT, "years/2025/pages/home.html"), "utf8");
  const m = home.match(/id="ott-guided-2025"[\s\S]*?<\/ol>/);
  expect(m, "guided ol").toBeTruthy();
  expect((m && m[0].match(/<li>/g) || []).length).toBe(6);
});

/** Official leftover + gold */
const FLOWS = [
  {
    path: "/years/2025/sites/deepseek/r1.html",
    key: "itt25-r1",
    incomplete: async (page) => { await page.locator("[data-r1-go]").click(); },
    complete: async (page) => {
      await page.locator('[data-r1-pick="r1"]').click();
      const reqs = page.locator("[data-r1-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("[data-r1-go]").click();
    },
  },
  { path: "/years/2025/sites/operator/index.html", key: "itt25-operator", ytl: { pick: "agent", field: "operator leftover" } },
  { path: "/years/2025/sites/o3mini/index.html", key: "itt25-o3mini", ytl: { pick: "mini", field: "o3-mini leftover" } },
  { path: "/years/2025/sites/gpt45/index.html", key: "itt25-gpt45", ytl: { pick: "preview", field: "gpt-4.5 leftover" } },
  { path: "/years/2025/sites/grok3/index.html", key: "itt25-grok3", ytl: { pick: "grok3", field: "grok 3 leftover" } },
  { path: "/years/2025/sites/claude4/index.html", key: "itt25-claude4", ytl: { pick: "sonnet", field: "claude 4 leftover" } },
  { path: "/years/2025/sites/gemini25/index.html", key: "itt25-gemini25", ytl: { pick: "g25", field: "gemini 2.5 leftover" } },
  {
    path: "/years/2025/sites/chrome/index.html",
    key: "itt25-chrome",
    fieldGo: { field: "[data-ch22-url]", req: "[data-ch22-req]", go: "[data-ch22-keep]", value: "example.com" },
  },
  {
    path: "/years/2025/sites/windows10/index.html",
    key: "itt25-win10",
    fieldGo: { req: "[data-w10-req]", go: "[data-w10-save]" },
  },
];

for (const fl of FLOWS) {
  test(`${fl.key} incomplete never writes then REAL`, async ({ page }) => {
    await page.goto(fl.path);
    await clearKey(page, fl.key);
    await page.reload();
    await expect(page.locator("[data-dest-field]")).toHaveCount(0);

    if (fl.incomplete) {
      await fl.incomplete(page);
    } else if (fl.ytl) {
      await page.locator("[data-ytl-go]").first().click();
    } else if (fl.fieldGo) {
      await page.locator(fl.fieldGo.go).click();
    }
    await expect.poll(async () => getKey(page, fl.key)).toBeFalsy();

    if (fl.complete) {
      await fl.complete(page);
    } else if (fl.ytl) {
      const host = page.locator("[data-ytl]").first();
      await host.locator(`[data-ytl-pick="${fl.ytl.pick}"]`).click();
      await host.locator("[data-ytl-field]").fill(fl.ytl.field);
      const reqs = host.locator("[data-ytl-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await host.locator("[data-ytl-go]").click();
    } else if (fl.fieldGo) {
      if (fl.fieldGo.field && fl.fieldGo.value) {
        await page.locator(fl.fieldGo.field).fill(fl.fieldGo.value);
      }
      if (fl.fieldGo.req) {
        const reqs = page.locator(fl.fieldGo.req);
        const n = await reqs.count();
        for (let i = 0; i < n; i++) await reqs.nth(i).check();
      }
      await page.locator(fl.fieldGo.go).click();
    }

    await expect.poll(async () => getKey(page, fl.key), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, fl.key)) || "{}");
    expect(blob.real, fl.key + " must be REAL").toBe(true);
    expect(blob.multiStep, fl.key + " must be multi-step").toBe(true);
    expect(String(blob.year)).toBe("2025");
  });
}
