// @ts-check
/**
 * Visitor walk — iframe shell, no seeded storage on the gold path.
 * Standalone page tests hid the real break: extras lock FYP until itt18-gdpr
 * is visible inside the year-shell iframe.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame, killOverlays } = require("./helpers");

/**
 * @param {import("@playwright/test").Page} page
 */
async function waitExtras(page) {
  await page.waitForFunction(
    () => {
      try {
        const d = document.getElementById("content") && document.getElementById("content").contentDocument;
        return !!(d && d.documentElement && d.documentElement.getAttribute("data-itt-feat-year2018extras") === "1");
      } catch (e) {
        return false;
      }
    },
    null,
    { timeout: 20000 }
  );
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function clear18(page) {
  /* Same-origin wipe once. addInitScript would re-run on every iframe
     navigation and delete the GDPR blob before FYP can read it. */
  await page.goto("/years/2018/");
  await page.evaluate(() => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.indexOf("itt18") === 0)
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  });
}

/**
 * @param {import("@playwright/test").FrameLocator} frame
 * @param {string[]} checks
 */
async function tickAll(frame, checks) {
  for (const sel of checks) {
    await frame.locator(sel).evaluateAll((els) => {
      els.forEach((el) => {
        el.checked = true;
      });
    });
  }
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {import("@playwright/test").FrameLocator} frame
 * @param {{ path: string, key: string, save: string, checks: string[], taps?: string[] }} spec
 */
async function roomWrite(page, frame, spec) {
  await goInFrame(page, spec.path);
  await killOverlays(page);
  await waitExtras(page);
  await expect(frame.locator(spec.save).first()).toBeVisible({ timeout: 15000 });
  await expect(frame.locator(spec.save).first()).toBeEnabled({ timeout: 15000 });
  await frame.locator(spec.save).first().click({ force: true });
  await page.waitForTimeout(80);
  expect(await page.evaluate((k) => localStorage.getItem(k), spec.key), spec.key + " incomplete").toBeFalsy();
  if (spec.taps) {
    for (const t of spec.taps) await frame.locator(t).first().click({ force: true });
  }
  await tickAll(frame, spec.checks);
  await killOverlays(page);
  await frame.locator(spec.save).first().click({ force: true });
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), spec.key), { timeout: 10000 }).toBeTruthy();
  const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), spec.key)) || "{}");
  expect(blob.real, spec.key).toBe(true);
  expect(blob.multiStep, spec.key).toBe(true);
  expect(blob.year, spec.key).toBe("2018");
}

const REST_ROOMS = [
  {
    path: "sites/tiktok/index.html",
    key: "itt18-tiktok-merge",
    save: "[data-tt-save]",
    checks: ["[data-tt-merge]", "[data-tt-not-reels]"],
  },
  {
    path: "sites/youtube/premium.html",
    key: "itt18-yt-premium",
    save: "[data-ytp-save]",
    checks: ["[data-ytp-rename]", "[data-ytp-price]", "[data-ytp-not-tv]"],
  },
  {
    path: "sites/chrome/index.html",
    key: "itt18-chrome",
    save: "[data-chrome18-save]",
    checks: ["[data-chrome18-habit]", "[data-chrome18-edge]", "[data-chrome18-notnew]"],
  },
  {
    path: "sites/chrome/not-secure.html",
    key: "itt18-chrome68",
    save: "[data-c68-save]",
    checks: ["[data-c68-date]", "[data-c68-http]"],
  },
  {
    path: "sites/windows10/index.html",
    key: "itt18-win10",
    save: "[data-win10-save]",
    checks: ["[data-win10-mass]", "[data-win10-ended-2016]"],
  },
  {
    path: "sites/fortnite/switch.html",
    key: "itt18-fn-switch",
    save: "[data-fns-save]",
    checks: ["[data-fns-date]", "[data-fns-not-2017]", "[data-fns-no-art]"],
  },
  {
    path: "sites/github/microsoft.html",
    key: "itt18-github",
    save: "[data-gh-save]",
    checks: ["[data-gh-price]", "[data-gh-dates]"],
  },
  {
    path: "sites/spotify/direct.html",
    key: "itt18-spotify",
    save: "[data-spfy-save]",
    checks: ["[data-spfy-direct]", "[data-spfy-prices]"],
  },
  {
    path: "sites/craigslist/personals.html",
    key: "itt18-fosta",
    save: "[data-fosta-save]",
    checks: ["[data-fosta-date]", "[data-fosta-no-ads]"],
  },
  {
    path: "sites/googleplus/sunset.html",
    key: "itt18-gplus",
    save: "[data-gp-save]",
    checks: ["[data-gp-announce]", "[data-gp-dies-2019]"],
  },
  {
    path: "sites/tumblr/ban.html",
    key: "itt18-tumblr",
    save: "[data-tb-save]",
    checks: ["[data-tb-date]", "[data-tb-verizon]"],
  },
  {
    path: "sites/ios12/index.html",
    key: "itt18-ios12",
    save: "[data-ios12-save]",
    checks: ["[data-ios12-date]", "[data-ios12-not-face]"],
  },
  {
    path: "sites/musically/index.html",
    key: "itt18-musical",
    save: "[data-musical-save]",
    checks: ["[data-musical-date]", "[data-musical-merge]"],
  },
  {
    path: "sites/dropbox/ipo.html",
    key: "itt18-dbx",
    save: "[data-dbx-save]",
    checks: ["[data-dbx-price]", "[data-dbx-date]"],
  },
  {
    path: "sites/oculus/go.html",
    key: "itt18-oculus-go",
    save: "[data-og-save]",
    checks: ["[data-og-price]", "[data-og-date]"],
  },
  {
    path: "sites/tls13/index.html",
    key: "itt18-tls13",
    save: "[data-tls-save]",
    checks: ["[data-tls-rfc]", "[data-tls-date]"],
  },
  {
    path: "sites/iphone/xs.html",
    key: "itt18-xs",
    save: "[data-xs-save]",
    checks: ["[data-xs-date]", "[data-xs-not-new]"],
  },
  {
    path: "sites/facebook/portal.html",
    key: "itt18-portal",
    save: "[data-pt-save]",
    checks: ["[data-pt-price]", "[data-pt-date]"],
  },
  {
    path: "sites/pixel/3.html",
    key: "itt18-pixel3",
    save: "[data-px-save]",
    checks: ["[data-px-date]", "[data-px-not2]"],
  },
  {
    path: "sites/flickr/1000.html",
    key: "itt18-flickr",
    save: "[data-fl-save]",
    checks: ["[data-fl-limit]", "[data-fl-enforce]"],
  },
  {
    path: "sites/edge/chromium.html",
    key: "itt18-edge-announce",
    save: "[data-ed-save]",
    checks: ["[data-ed-date]", "[data-ed-not-default]"],
  },
  {
    path: "pages/about.html",
    key: "itt18-thesis-ack",
    save: "[data-itt-real-save]",
    checks: ["[data-req]"],
  },
  {
    path: "sites/playable/game.html",
    key: "itt18-consentdash-lit",
    save: "[data-storage-key='consentdash-lit']",
    checks: ["[data-itt-real-panel] [data-req]"],
  },
];

test.describe("2018 visitor walk (iframe)", () => {
  test("banner Accept All fails; Manage save writes; FYP then hearing work", async ({ page }) => {
    test.setTimeout(90000);
    await clear18(page);
    await enterYear(page, "2018");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2018"]')).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-ott-one-thing="2018"]').click();
    await waitExtras(page);
    await expect(frame.locator("[data-gdpr-accept-all]")).toBeVisible({ timeout: 15000 });
    await frame.locator("[data-gdpr-accept-all]").click();
    await page.waitForTimeout(150);
    expect(await page.evaluate(() => localStorage.getItem("itt18-gdpr"))).toBeFalsy();

    await frame.locator("[data-gdpr-manage]").click();
    await waitExtras(page);
    await expect(frame.locator("[data-gdpr-save]")).toBeVisible({ timeout: 15000 });
    await frame.locator("[data-gdpr-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt18-gdpr"))).toBeFalsy();
    await tickAll(frame, ["[data-gdpr-art15]", "[data-gdpr-art17]", "[data-gdpr-date]"]);
    await frame.locator("[data-gdpr-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-gdpr")), { timeout: 10000 }).toBeTruthy();
    const gdpr = JSON.parse((await page.evaluate(() => localStorage.getItem("itt18-gdpr"))) || "{}");
    expect(gdpr.real).toBe(true);
    expect(gdpr.multiStep).toBe(true);
    expect(gdpr.year).toBe("2018");
    await expect(frame.locator("[data-next-flow]")).toBeVisible();

    await frame.locator("[data-next-flow] a[href*='tiktok']").first().click();
    await waitExtras(page);
    await expect(frame.locator("html")).toHaveAttribute("data-itt18-consent", "1", { timeout: 15000 });
    await expect(frame.locator("[data-fyp-save]")).toBeEnabled({ timeout: 15000 });
    const before = await frame.locator("[data-fyp-card]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-tag"))
    );
    await frame.locator("[data-fyp-more]").click();
    await frame.locator("[data-fyp-less]").click();
    const mid = await frame.locator("[data-fyp-card]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-tag"))
    );
    expect(mid.join(",")).not.toBe(before.join(","));
    await tickAll(frame, ["[data-fyp-merge]", "[data-fyp-not-reels]"]);
    await frame.locator("[data-fyp-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-tiktok-fyp"))).toBeTruthy();

    await frame.locator("[data-next-flow] a").first().click();
    await waitExtras(page);
    await expect(frame.locator("[data-ca-save]")).toBeVisible({ timeout: 15000 });
    await tickAll(frame, ["[data-ca-quiz]", "[data-ca-press]", "[data-ca-hearing]"]);
    await frame.locator("[data-ca-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-ca"))).toBeTruthy();

    await frame.locator("[data-next-flow] a[href*='hearing']").first().click();
    await expect(frame.locator("body")).toContainText(/I started Facebook/i);
    await expect(frame.locator("[data-next-flow] a[href*='igtv']")).toBeVisible();

    await goInFrame(page, "sites/instagram/igtv.html");
    await killOverlays(page);
    await waitExtras(page);
    await expect(frame.locator("[data-igtv-save]")).toBeEnabled({ timeout: 15000 });
    await tickAll(frame, ["[data-igtv-date]", "[data-igtv-not-reels]", "[data-igtv-length]"]);
    await frame.locator("[data-igtv-save]").click({ force: true });
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-igtv"))).toBeTruthy();

    await goInFrame(page, "sites/spectre/index.html");
    await killOverlays(page);
    await waitExtras(page);
    await tickAll(frame, ["[data-sp-date]", "[data-sp-no-payload]"]);
    await frame.locator("[data-sp-save]").click({ force: true });
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-spectre"))).toBeTruthy();

    await goInFrame(page, "sites/homepod/index.html");
    await killOverlays(page);
    await waitExtras(page);
    await tickAll(frame, ["[data-hp-price]", "[data-hp-date]"]);
    await frame.locator("[data-hp-save]").click({ force: true });
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-homepod"))).toBeTruthy();

    const keys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.indexOf("itt18-") === 0).sort());
    expect(keys).toEqual(
      expect.arrayContaining(["itt18-gdpr", "itt18-tiktok-fyp", "itt18-ca", "itt18-igtv", "itt18-spectre", "itt18-homepod"])
    );
  });

  test("FYP stays locked in the iframe until Manage writes", async ({ page }) => {
    await clear18(page);
    await enterYear(page, "2018");
    const frame = contentFrame(page);
    await goInFrame(page, "sites/tiktok/fyp.html");
    await waitExtras(page);
    await expect(frame.locator("[data-fyp-save]")).toBeDisabled();
    await goInFrame(page, "sites/gdpr/manage.html");
    await waitExtras(page);
    await tickAll(frame, ["[data-gdpr-art15]", "[data-gdpr-art17]", "[data-gdpr-date]"]);
    await frame.locator("[data-gdpr-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt18-gdpr"))).toBeTruthy();
    await goInFrame(page, "sites/tiktok/fyp.html");
    await waitExtras(page);
    await expect(frame.locator("html")).toHaveAttribute("data-itt18-consent", "1", { timeout: 15000 });
    await expect(frame.locator("[data-fyp-save]")).toBeEnabled({ timeout: 15000 });
    await expect(frame.locator("[data-fyp-more]")).toBeEnabled();
  });

  test("every remaining save room writes from the iframe", async ({ page }) => {
    test.setTimeout(240000);
    await clear18(page);
    await enterYear(page, "2018");
    await page.evaluate(() => {
      localStorage.setItem(
        "itt18-gdpr",
        JSON.stringify({ multiStep: true, real: true, year: "2018", path: "manage", ts: Date.now() })
      );
    });
    const frame = contentFrame(page);
    for (const spec of REST_ROOMS) {
      await roomWrite(page, frame, spec);
    }
  });
});
