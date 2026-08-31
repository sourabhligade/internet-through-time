// @ts-check
/**
 * 2021/2022 leftover rooms that used to be generic ytl / wrong leftover copy.
 * First click is the period verb. Trap never writes. dest-field banned.
 */
const { test, expect } = require("@playwright/test");


async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {{path:string,key:string,ns:string,kind:string,forbid?:RegExp}} spec
 */
async function walkTheater(page, spec) {
  await page.goto(spec.path);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  const ns = spec.ns;
  const go = page.locator(`[data-${ns}-go]`);
  await expect(go).toBeVisible();
  await expect(page.locator("[data-dest-field]")).toHaveCount(0);
  await expect(page.locator("[data-ytl]")).toHaveCount(0);
  const goText = ((await go.innerText()) || "").toLowerCase();
  const field = page.locator(`[data-${ns}-field]`);
  const ph = (await field.count()) ? ((await field.getAttribute("placeholder")) || "").toLowerCase() : "";
  const h1 = ((await page.locator("h1").first().innerText()) || "").toLowerCase();
  if (spec.forbid) {
    expect(goText).not.toMatch(spec.forbid);
    expect(ph).not.toMatch(spec.forbid);
    expect(h1).not.toMatch(spec.forbid);
  }
  await go.click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  await page.locator(`[data-${ns}-trap]`).first().click();
  await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();
  const ticks = page.locator(`[data-${ns}-req]`);
  const n = await ticks.count();
  expect(n).toBeGreaterThanOrEqual(2);
  for (let i = 0; i < n; i++) await ticks.nth(i).check();
  if (spec.kind === "query") {
    await page.locator(`[data-${ns}-field]`).fill("ok leftover");
  }
  await go.click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, spec.key)) || "{}");
  expect(blob.real).toBe(true);
}

test("2021 ATT leftover dest is Ask leftover, not TikTok FYP", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2021/sites/attabout/index.html",
    key: "itt21-pop5-attabout",
    ns: "p21",
    kind: "query",
    forbid: /tiktok|fyp/,
  });
});

test("2021 Signal leftover dest is Signal join, not Stories", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2021/sites/sigabout/index.html",
    key: "itt21-pop4-sigabout",
    ns: "p21",
    kind: "query",
    forbid: /snap leftover|filter leftover/,
  });
});

test("2021 ATT about is Ask leftover, not TikTok", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2021/sites/att/about.html",
    key: "itt21-pop7-att21",
    ns: "p21",
    kind: "query",
    forbid: /tiktok|fyp/,
  });
});

test("2022 DALL·E leftover dest is DALL·E, not Let's Encrypt", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/dalleabout/index.html",
    key: "itt22-pop4-dalleabout",
    ns: "p22",
    kind: "query",
    forbid: /lets encrypt|periscope/,
  });
});

test("2022 Mastodon leftover dest is Mastodon, not Stadia", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/mastoabout/index.html",
    key: "itt22-pop4-mastoabout",
    ns: "p22",
    kind: "query",
    forbid: /stadia leftover/,
  });
});

test("2022 Character.AI leftover dest is chat, not arcade", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/cail22/index.html",
    key: "itt22-pop6-cail22",
    ns: "p22",
    kind: "query",
    forbid: /arcade leftover/,
  });
});

test("2022 SD about is SD leftover, not Stadia", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/stablediffusion/about.html",
    key: "itt22-pop7-sd22",
    ns: "p22",
    kind: "query",
    forbid: /stadia leftover/,
  });
});

test("2022 Copilot leftover dest is 2022 GA neighbor, not waitlist", async ({ page }) => {
  await walkTheater(page, {
    path: "/years/2022/sites/copilot22/index.html",
    key: "itt22-pop6-copilot22",
    ns: "p22",
    kind: "query",
    forbid: /join leftover waitlist/,
  });
});
