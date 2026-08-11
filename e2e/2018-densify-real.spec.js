// @ts-check
/**
 * 2018 densify REAL gates, JSON shape, next-flow, isolation, copy honesty.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} feat
 */
async function waitFeat(page, feat) {
  await page
    .waitForFunction(
      (f) => document.documentElement.getAttribute("data-itt-feat-" + f) === "1",
      feat,
      { timeout: 15000 }
    )
    .catch(() => {});
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks: string[], copy?: RegExp[] }} spec
 */
async function incompleteThenWrite(page, spec) {
  await page.goto(`/years/2018/${spec.path}`);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.setItem(
      "itt18-gdpr",
      JSON.stringify({ multiStep: true, real: true, year: "2018", path: "manage", ts: Date.now() })
    );
  }, spec.key);
  await page.reload();
  await waitFeat(page, "year2018extras");
  await page.locator(spec.save).click({ force: true });
  await page.waitForTimeout(100);
  expect(await page.evaluate((k) => localStorage.getItem(k), spec.key), spec.key).toBeFalsy();
  for (const sel of spec.checks) await page.locator(sel).first().check();
  await page.locator(spec.save).click({ force: true });
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeTruthy();
  const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), spec.key)) || "{}");
  expect(blob.multiStep).toBe(true);
  expect(blob.real).toBe(true);
  expect(blob.year).toBe("2018");
}

const ROOMS = [
  {
    id: "YouTube Premium",
    path: "sites/youtube/premium.html",
    key: "itt18-yt-premium",
    save: "[data-ytp-save]",
    checks: ["[data-ytp-rename]", "[data-ytp-price]", "[data-ytp-not-tv]"],
    copy: [/Premium/i, /not YouTube TV/i],
    next: /igtv/i,
    gated: true,
  },
  {
    id: "Fortnite Switch",
    path: "sites/fortnite/switch.html",
    key: "itt18-fn-switch",
    save: "[data-fns-save]",
    checks: ["[data-fns-date]", "[data-fns-not-2017]", "[data-fns-no-art]"],
    copy: [/June 12/i, /2017/],
    next: /home\.html/i,
  },
  {
    id: "GitHub",
    path: "sites/github/microsoft.html",
    key: "itt18-github",
    save: "[data-gh-save]",
    checks: ["[data-gh-price]", "[data-gh-dates]"],
    copy: [/7\.5/],
    next: /home\.html/i,
  },
  {
    id: "Spotify",
    path: "sites/spotify/direct.html",
    key: "itt18-spotify",
    save: "[data-spfy-save]",
    checks: ["[data-spfy-direct]", "[data-spfy-prices]"],
    copy: [/direct listing/i],
    next: /premium/i,
  },
  {
    id: "FOSTA",
    path: "sites/craigslist/personals.html",
    key: "itt18-fosta",
    save: "[data-fosta-save]",
    checks: ["[data-fosta-date]", "[data-fosta-no-ads]"],
    copy: [/March 23|23 March/i, /does not reconstruct/i],
    next: /gdpr/i,
  },
  {
    id: "Google+",
    path: "sites/googleplus/sunset.html",
    key: "itt18-gplus",
    save: "[data-gp-save]",
    checks: ["[data-gp-announce]", "[data-gp-dies-2019]"],
    copy: [/October 8|8 October/i, /2019/],
    next: /home\.html/i,
  },
  {
    id: "Tumblr",
    path: "sites/tumblr/ban.html",
    key: "itt18-tumblr",
    save: "[data-tb-save]",
    checks: ["[data-tb-date]", "[data-tb-verizon]"],
    copy: [/December 17|17 December/i],
    next: /googleplus/i,
  },
  {
    id: "iOS 12",
    path: "sites/ios12/index.html",
    key: "itt18-ios12",
    save: "[data-ios12-save]",
    checks: ["[data-ios12-date]", "[data-ios12-not-face]"],
    copy: [/Screen Time/i, /not/i],
    next: /faceid/i,
  },
  {
    id: "IGTV",
    path: "sites/instagram/igtv.html",
    key: "itt18-igtv",
    save: "[data-igtv-save]",
    checks: ["[data-igtv-date]", "[data-igtv-not-reels]", "[data-igtv-length]"],
    copy: [/June 20|20 June/i, /not Reels/i],
    next: /premium/i,
    gated: true,
  },
  {
    id: "Chrome habit",
    path: "sites/chrome/index.html",
    key: "itt18-chrome",
    save: "[data-chrome18-save]",
    checks: ["[data-chrome18-habit]", "[data-chrome18-edge]", "[data-chrome18-notnew]"],
    copy: [/EdgeHTML/i, /#1 habit/i],
    next: /not-secure/i,
  },
  {
    id: "TikTok merge",
    path: "sites/tiktok/index.html",
    key: "itt18-tiktok-merge",
    save: "[data-tt-save]",
    checks: ["[data-tt-merge]", "[data-tt-not-reels]"],
    copy: [/Aug(?:ust)?\s*2/i, /not Reels/i],
    next: /fyp/i,
  },
  {
    id: "musical.ly trail",
    path: "sites/musically/index.html",
    key: "itt18-musical",
    save: "[data-musical-save]",
    checks: ["[data-musical-date]", "[data-musical-merge]"],
    copy: [/2017/, /Aug(?:ust)?\s*2/i],
  },
  {
    id: "Dropbox IPO",
    path: "sites/dropbox/ipo.html",
    key: "itt18-dbx",
    save: "[data-dbx-save]",
    checks: ["[data-dbx-price]", "[data-dbx-date]"],
    copy: [/\$21/, /DBX/i],
    next: /home\.html/i,
  },
  {
    id: "Oculus Go",
    path: "sites/oculus/go.html",
    key: "itt18-oculus-go",
    save: "[data-og-save]",
    checks: ["[data-og-price]", "[data-og-date]"],
    copy: [/\$199/, /May 1|1 May/i],
    next: /home\.html/i,
  },
  {
    id: "TLS 1.3",
    path: "sites/tls13/index.html",
    key: "itt18-tls13",
    save: "[data-tls-save]",
    checks: ["[data-tls-rfc]", "[data-tls-date]"],
    copy: [/8446/, /August 10|10 August/i],
    next: /not-secure/i,
  },
  {
    id: "iPhone XS",
    path: "sites/iphone/xs.html",
    key: "itt18-xs",
    save: "[data-xs-save]",
    checks: ["[data-xs-date]", "[data-xs-not-new]"],
    copy: [/not new/i],
    next: /faceid/i,
  },
  {
    id: "Portal",
    path: "sites/facebook/portal.html",
    key: "itt18-portal",
    save: "[data-pt-save]",
    checks: ["[data-pt-price]", "[data-pt-date]"],
    copy: [/\$199/, /October 8|8 October/i],
    next: /index\.html/i,
  },
  {
    id: "Pixel 3",
    path: "sites/pixel/3.html",
    key: "itt18-pixel3",
    save: "[data-px-save]",
    checks: ["[data-px-date]", "[data-px-not2]"],
    copy: [/not Pixel 2/i],
    next: /home\.html/i,
  },
  {
    id: "Flickr 1000",
    path: "sites/flickr/1000.html",
    key: "itt18-flickr",
    save: "[data-fl-save]",
    checks: ["[data-fl-limit]", "[data-fl-enforce]"],
    copy: [/1,000|1000/, /January 8|8 January/i],
    next: /home\.html/i,
  },
  {
    id: "Edge announce",
    path: "sites/edge/chromium.html",
    key: "itt18-edge-announce",
    save: "[data-ed-save]",
    checks: ["[data-ed-date]", "[data-ed-not-default]"],
    copy: [/EdgeHTML/i, /not the 2018 default/i],
    next: /chrome/i,
  },
];

test.describe("2018 densify REAL incomplete → complete", () => {
  for (const spec of ROOMS) {
    test(`${spec.id} incomplete never writes; complete is REAL JSON`, async ({ page }) => {
      await incompleteThenWrite(page, spec);
    });
  }
});

test.describe("2018 densify next-flow + reload", () => {
  for (const spec of ROOMS.filter((s) => s.next)) {
    test(`${spec.id} next-flow hidden then visible`, async ({ page }) => {
      await page.goto(`/years/2018/${spec.path}`);
      await page.evaluate((k) => {
        localStorage.removeItem(k);
        localStorage.setItem(
          "itt18-gdpr",
          JSON.stringify({ multiStep: true, real: true, year: "2018", path: "manage", ts: Date.now() })
        );
      }, spec.key);
      await page.reload();
      await waitFeat(page, "year2018extras");
      await expect(page.locator("[data-next-flow]")).toBeHidden();
      for (const sel of spec.checks) await page.locator(sel).first().check();
      await page.locator(spec.save).click({ force: true });
      await expect(page.locator("[data-next-flow]")).toBeVisible();
      await expect(page.locator("[data-next-flow] a").first()).toHaveAttribute("href", spec.next);
      await page.reload();
      await waitFeat(page, "year2018extras");
      await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key)).toBeTruthy();
    });
  }
});

test.describe("2018 densify copy honesty", () => {
  for (const spec of ROOMS) {
    if (!spec.copy) continue;
    test(`${spec.id} period copy`, async ({ page }) => {
      await page.goto(`/years/2018/${spec.path}`);
      for (const re of spec.copy) await expect(page.locator("body")).toContainText(re);
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2018");
      await expect(page.locator(spec.save)).toBeVisible();
    });
  }
});

test.describe("2018 TikTok FYP reorder REAL", () => {
  test("0 taps never writes; two taps + checks write and reorder persists", async ({ page }) => {
    await page.goto("/years/2018/sites/tiktok/fyp.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt18-tiktok-fyp");
      localStorage.setItem(
        "itt18-gdpr",
        JSON.stringify({ multiStep: true, real: true, year: "2018", path: "manage", ts: Date.now() })
      );
    });
    await page.reload();
    await waitFeat(page, "year2018extras");
    await page.locator("[data-fyp-save]").click({ force: true });
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => localStorage.getItem("itt18-tiktok-fyp"))).toBeFalsy();
    await page.locator("[data-fyp-more]").click({ force: true });
    await page.locator("[data-fyp-less]").click({ force: true });
    await page.locator("[data-fyp-merge]").check();
    await page.locator("[data-fyp-not-reels]").check();
    await page.locator("[data-fyp-save]").click({ force: true });
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-tiktok-fyp"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt18-tiktok-fyp"))) || "{}");
    expect(blob.multiStep).toBe(true);
    expect(blob.real).toBe(true);
    expect(blob.year).toBe("2018");
    expect(Array.isArray(blob.order)).toBe(true);
    expect(blob.order.length).toBeGreaterThanOrEqual(2);
    expect(Array.isArray(blob.taps)).toBe(true);
    expect(blob.taps.length).toBeGreaterThanOrEqual(2);
    const before = await page.locator("[data-fyp-card]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-tag"))
    );
    await page.reload();
    await waitFeat(page, "year2018extras");
    const after = await page.locator("[data-fyp-card]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-tag"))
    );
    expect(after).toEqual(before);
  });
});

test.describe("2018 densify isolation + home chips", () => {
  test("GDPR write does not touch itt17-* ", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/rights.html");
    await page.evaluate(() => {
      localStorage.setItem("itt17-faceid", '{"keep":1}');
      localStorage.removeItem("itt18-gdpr");
      localStorage.removeItem("gdpr");
    });
    await waitFeat(page, "year2018extras");
    await page.locator("[data-gdpr-art15]").check();
    await page.locator("[data-gdpr-art17]").check();
    await page.locator("[data-gdpr-date]").check();
    await page.locator("[data-gdpr-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-gdpr"))).toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem("itt17-faceid"))).toBe('{"keep":1}');
    expect(await page.evaluate(() => localStorage.getItem("gdpr"))).toBeFalsy();
  });

  test("home P0 chips resolve", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    const hrefs = [
      "../sites/gdpr/index.html",
      "../sites/tiktok/fyp.html",
      "../sites/trust/index.html",
      "../sites/instagram/igtv.html",
      "../sites/spectre/index.html",
      "../sites/homepod/index.html",
    ];
    for (const h of hrefs) {
      await expect(page.locator(`a[href="${h}"]`).first(), h).toBeVisible();
      const res = await page.goto(`/years/2018/pages/${h}`);
      expect(res && res.ok(), h).toBeTruthy();
      await page.goto("/years/2018/pages/home.html");
    }
  });

  test("home P1 + P2 chips resolve", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    const hrefs = [
      "../sites/youtube/premium.html",
      "../sites/fortnite/switch.html",
      "../sites/github/microsoft.html",
      "../sites/spotify/direct.html",
      "../sites/craigslist/personals.html",
      "../sites/dropbox/ipo.html",
      "../sites/edge/chromium.html",
    ];
    for (const h of hrefs) {
      await expect(page.locator(`a[href="${h}"]`).first(), h).toBeVisible();
      const res = await page.goto(`/years/2018/pages/${h}`);
      expect(res && res.ok(), h).toBeTruthy();
      await page.goto("/years/2018/pages/home.html");
    }
  });

  test("one-thing is still GDPR not TikTok / Face ID", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    const href = await page.locator('[data-ott-one-thing="2018"]').getAttribute("href");
    expect(href).toMatch(/gdpr/);
    expect(href).not.toMatch(/tiktok|iphone|igtv/i);
  });
});

test.describe("2018 gate: FYP primary disabled until GDPR", () => {
  test("no gdpr → FYP save disabled; after gdpr enabled", async ({ page }) => {
    await page.goto("/years/2018/sites/tiktok/fyp.html");
    await page.evaluate(() => localStorage.removeItem("itt18-gdpr"));
    await page.reload();
    await waitFeat(page, "year2018extras");
    await expect(page.locator("[data-fyp-save]")).toBeDisabled();
    await page.goto("/years/2018/sites/gdpr/rights.html");
    await waitFeat(page, "year2018extras");
    await page.locator("[data-gdpr-art15]").check();
    await page.locator("[data-gdpr-art17]").check();
    await page.locator("[data-gdpr-date]").check();
    await page.locator("[data-gdpr-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-gdpr"))).toBeTruthy();
    await page.goto("/years/2018/sites/tiktok/fyp.html");
    await waitFeat(page, "year2018extras");
    await expect(page.locator("[data-fyp-save]")).toBeEnabled();
  });
});

test.describe("2018 densify iframe shell", () => {
  test("iframe can open GDPR", async ({ page }) => {
    await enterYear(page, "2018");
    await goInFrame(page, "sites/gdpr/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/25 May|cookie/i);
  });
});
