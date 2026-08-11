// @ts-check
/**
 * 2017 densify REAL gates, JSON shape, next-flow, isolation, copy honesty.
 * Incomplete never writes. Prefix itt17 only.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} feat
 */
async function waitFeat(page, feat) {
  const attr = `data-itt-feat-${feat}`;
  await page
    .waitForFunction(
      (a) => {
        try {
          return document.documentElement && document.documentElement.getAttribute(a) === "1";
        } catch (e) {
          return false;
        }
      },
      attr,
      { timeout: 15000 }
    )
    .catch(() => {});
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} k
 */
async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ path: string, key: string, save: string, checks: string[], fills?: [string, string][] }} spec
 */
async function assertBlockedThenWrites(page, spec) {
  await page.goto(`/years/2017/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await waitFeat(page, "year2017extras");
  await page.locator(spec.save).click();
  await page.waitForTimeout(80);
  expect(await getKey(page, spec.key), spec.key + " bare save").toBeFalsy();
  if (spec.fills && spec.fills.length) {
    for (const [sel, val] of spec.fills) await page.fill(sel, val);
    await page.locator(spec.save).click();
    await page.waitForTimeout(80);
    expect(await getKey(page, spec.key), spec.key + " fills-only").toBeFalsy();
  } else if (spec.checks.length > 1) {
    await page.locator(spec.checks[0]).check();
    await page.locator(spec.save).click();
    await page.waitForTimeout(80);
    expect(await getKey(page, spec.key), spec.key + " partial").toBeFalsy();
  }
  for (const sel of spec.checks) await page.locator(sel).check();
  if (spec.fills) {
    for (const [sel, val] of spec.fills) await page.fill(sel, val);
  }
  await page.locator(spec.save).click();
  await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
  const raw = (await getKey(page, spec.key)) || "";
  const blob = JSON.parse(raw);
  expect(blob.multiStep, spec.key + " multiStep").toBe(true);
  expect(blob.real, spec.key + " real").toBe(true);
  expect(blob.year, spec.key + " year").toBe("2017");
  expect(blob.ts, spec.key + " ts").toBeGreaterThan(0);
  return blob;
}

const DENSIFY = [
  {
    id: "Face ID",
    path: "sites/iphone/x.html",
    key: "itt17-faceid",
    save: "[data-faceid-save]",
    checks: ["[data-faceid-no-home]", "[data-faceid-not-touch]", "[data-faceid-not-xs]"],
    copy: [/Sep(?:tember)?\s*12/i, /Face ID/i, /not XS/i],
    next: /fortnite|twitter\/280/i,
  },
  {
    id: "Fortnite",
    path: "sites/fortnite/index.html",
    key: "itt17-fortnite",
    save: "[data-fn-save]",
    checks: ["[data-fn-date]", "[data-fn-free]", "[data-fn-no-art]"],
    copy: [/Sep(?:tember)?\s*26/i, /free/i, /no official/i],
    next: /game\.html|iphone\/x/i,
  },
  {
    id: "WannaCry",
    path: "sites/wannacry/index.html",
    key: "itt17-wannacry",
    save: "[data-wc-save]",
    checks: ["[data-wc-date]", "[data-wc-no-payload]"],
    copy: [/May\s*12/i, /no exploit|no attack code/i],
    next: /equifax/i,
  },
  {
    id: "Vine gone",
    path: "sites/vine/gone.html",
    key: "itt17-vine-gone",
    save: "[data-vine-gone-save]",
    checks: ["[data-vine-gone-date]", "[data-vine-gone-not-2016]"],
    copy: [/Jan(?:uary)?\s*17/i, /2016 only/i],
    next: /musical/i,
  },
  {
    id: "Teams GA",
    path: "sites/teams/index.html",
    key: "itt17-teams-ga",
    save: "[data-teams-ga-save]",
    checks: ["[data-teams-ga-date]", "[data-teams-ga-not-preview]"],
    copy: [/Mar(?:ch)?\s*14/i, /preview/i],
    next: /iphone\/x|nitro/i,
  },
  {
    id: "Equifax",
    path: "sites/equifax/index.html",
    key: "itt17-equifax",
    save: "[data-eq-save]",
    checks: ["[data-eq-date]", "[data-eq-no-ssn]"],
    copy: [/Sep(?:tember)?\s*7/i, /143/i, /does not/i],
    next: /yahoo-3b/i,
  },
  {
    id: "Yahoo 3B",
    path: "sites/yahoo-3b/index.html",
    key: "itt17-yahoo-3b",
    save: "[data-yh3b-save]",
    checks: ["[data-yh3b-date]", "[data-yh3b-not-2016]"],
    copy: [/Oct(?:ober)?\s*3/i, /3 billion/i, /2016/i],
    next: /equifax/i,
  },
  {
    id: "Snap IPO",
    path: "sites/snapchat/ipo.html",
    key: "itt17-snap-ipo",
    save: "[data-ipo-save]",
    checks: ["[data-ipo-price]", "[data-ipo-novote]"],
    copy: [/\$17/, /\$24/, /no vote|does not vote/i],
    next: /redesign|iphone\/x/i,
  },
  {
    id: "YouTube TV",
    path: "sites/youtube/tv.html",
    key: "itt17-yt-tv",
    save: "[data-yttv-save]",
    checks: ["[data-yttv-price]", "[data-yttv-not-prem]"],
    copy: [/\$35/, /Apr(?:il)?\s*5/i, /not YouTube Premium/i],
    next: /netflix/i,
  },
  {
    id: "Echo Show",
    path: "sites/echo/show.html",
    key: "itt17-echo-show",
    save: "[data-echo-save]",
    checks: ["[data-echo-date]", "[data-echo-screen]"],
    copy: [/May\s*9/i, /Jun(?:e)?\s*28/i, /\$229/],
    next: /iphone\/x|facebook\/2b/i,
  },
  {
    id: "NotPetya",
    path: "sites/notpetya/index.html",
    key: "itt17-notpetya",
    save: "[data-np-save]",
    checks: ["[data-np-date]", "[data-np-not-wc]"],
    copy: [/Jun(?:e)?\s*27/i, /not WannaCry/i, /no attack code|no payload/i],
    next: /wannacry|krack/i,
  },
  {
    id: "Flash EOL",
    path: "sites/flash/eol.html",
    key: "itt17-flash-eol",
    save: "[data-fl-save]",
    checks: ["[data-fl-date]", "[data-fl-2020]"],
    copy: [/Jul(?:y)?\s*25/i, /2020/],
    next: /chrome/i,
  },
  {
    id: "iOS 11",
    path: "sites/ios11/index.html",
    key: "itt17-ios11",
    save: "[data-ios11-save]",
    checks: ["[data-ios11-date]", "[data-ios11-not-face]"],
    copy: [/Sep(?:tember)?\s*19/i, /Face ID is the/i],
    next: /iphone\/x/i,
  },
  {
    id: "Pixel 2",
    path: "sites/pixel/2.html",
    key: "itt17-pixel2",
    save: "[data-px2-save]",
    checks: ["[data-px2-date]", "[data-px2-not-x]"],
    copy: [/Oct(?:ober)?\s*4/i, /not iPhone X/i],
    next: /iphone\/x/i,
  },
  {
    id: "KRACK",
    path: "sites/krack/index.html",
    key: "itt17-krack",
    save: "[data-kr-save]",
    checks: ["[data-kr-date]", "[data-kr-no-exploit]"],
    copy: [/Oct(?:ober)?\s*16/i, /WPA2/i, /no exploit/i],
    next: /wannacry/i,
  },
  {
    id: "Netflix My List",
    path: "sites/netflix/index.html",
    key: "itt17-nf-mylist",
    save: "[data-nf-save]",
    checks: ["[data-nf-2016-dl]", "[data-nf-not-onething]"],
    fills: [["[data-nf-title]", "The Crown"]],
    copy: [/My List/i, /2016/i, /not the 2017 one-thing|Face ID is/i],
    next: /youtube\/tv|home\.html/i,
  },
];

test.describe("2017 densify REAL incomplete → complete", () => {
  for (const spec of DENSIFY) {
    test(`${spec.id} incomplete never writes; complete is REAL JSON`, async ({ page }) => {
      const blob = await assertBlockedThenWrites(page, spec);
      expect(blob).toBeTruthy();
    });
  }
});

test.describe("2017 densify next-flow + reload", () => {
  for (const spec of DENSIFY) {
    test(`${spec.id} next-flow hidden then visible; reload keeps status`, async ({ page }) => {
      await page.goto(`/years/2017/${spec.path}`);
      await page.evaluate((k) => localStorage.removeItem(k), spec.key);
      await page.reload();
      await waitFeat(page, "year2017extras");
      await expect(page.locator("[data-next-flow]")).toBeHidden();
      for (const sel of spec.checks) await page.locator(sel).check();
      if (spec.fills) {
        for (const [sel, val] of spec.fills) await page.fill(sel, val);
      }
      await page.locator(spec.save).click();
      await expect(page.locator("[data-next-flow]")).toBeVisible();
      await expect(page.locator("[data-next-flow] a").first()).toHaveAttribute("href", spec.next);
      await page.reload();
      await waitFeat(page, "year2017extras");
      await expect.poll(async () => getKey(page, spec.key)).toBeTruthy();
      await expect(page.locator("[data-next-flow]")).toBeVisible();
    });
  }
});

test.describe("2017 densify copy honesty", () => {
  for (const spec of DENSIFY) {
    test(`${spec.id} period copy`, async ({ page }) => {
      await page.goto(`/years/2017/${spec.path}`);
      const body = page.locator("body");
      for (const re of spec.copy) await expect(body).toContainText(re);
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2017");
      await expect(page.locator(spec.save)).toBeVisible();
    });
  }

  test("Face ID is not Touch ID / not XS", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await expect(page.locator("body")).toContainText(/no home button/i);
    await expect(page.locator("body")).toContainText(/not Touch ID/i);
    await expect(page.locator("body")).toContainText(/not XS/i);
  });

  test("Fortnite is free BR not Switch this year", async ({ page }) => {
    await page.goto("/years/2017/sites/fortnite/index.html");
    await expect(page.locator("body")).toContainText(/free/i);
    await expect(page.locator("body")).toContainText(/June 2018|not on Switch/i);
  });

  test("WannaCry has no exploit how-to", async ({ page }) => {
    await page.goto("/years/2017/sites/wannacry/index.html");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/May\s*12/i);
    expect(text).toMatch(/no exploit|no attack code/i);
    expect(text).not.toMatch(/how to (launch|run|spread)/i);
  });

  test("Equifax has no SSN field", async ({ page }) => {
    await page.goto("/years/2017/sites/equifax/index.html");
    await expect(page.locator("input[type='password'], input[name*='ssn'], [data-ssn]")).toHaveCount(0);
    await expect(page.locator("body")).toContainText(/does not/i);
  });

  test("NotPetya is not WannaCry and has no exploit", async ({ page }) => {
    await page.goto("/years/2017/sites/notpetya/index.html");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Jun(?:e)?\s*27/i);
    expect(text).toMatch(/not WannaCry/i);
    expect(text).not.toMatch(/how to (launch|run|spread)/i);
  });

  test("Flash is announced dead in 2020 not already gone", async ({ page }) => {
    await page.goto("/years/2017/sites/flash/eol.html");
    await expect(page.locator("body")).toContainText(/2020/);
    await expect(page.locator("body")).toContainText(/still (plays|supported)/i);
  });

  test("iOS 11 points Face ID at the phone", async ({ page }) => {
    await page.goto("/years/2017/sites/ios11/index.html");
    await expect(page.locator("body")).toContainText(/Sep(?:tember)?\s*19/i);
    await expect(page.locator("p a[href*='iphone/x']").first()).toBeVisible();
  });

  test("musical.ly is not TikTok US mass", async ({ page }) => {
    await page.goto("/years/2017/sites/musically/index.html");
    await expect(page.locator("body")).toContainText(/not TikTok/i);
    await expect(page.locator("body")).toContainText(/2018/i);
  });
});

test.describe("2017 densify isolation + home chips", () => {
  test("Face ID write does not touch itt16-* or unprefixed keys", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await page.evaluate(() => {
      localStorage.setItem("itt16-ig-stories", '{"keep":1}');
      localStorage.removeItem("itt17-faceid");
      localStorage.removeItem("faceid");
    });
    await waitFeat(page, "year2017extras");
    await page.locator("[data-faceid-no-home]").check();
    await page.locator("[data-faceid-not-touch]").check();
    await page.locator("[data-faceid-not-xs]").check();
    await page.locator("[data-faceid-save]").click();
    await expect.poll(async () => getKey(page, "itt17-faceid")).toBeTruthy();
    expect(await getKey(page, "itt16-ig-stories")).toBe('{"keep":1}');
    expect(await getKey(page, "faceid")).toBeFalsy();
  });

  test("home P0 chips resolve to real HTML not #", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    const hrefs = [
      "../sites/iphone/x.html",
      "../sites/fortnite/index.html",
      "../sites/twitter/280.html",
      "../sites/wannacry/index.html",
      "../sites/vine/gone.html",
      "../sites/equifax/index.html",
    ];
    for (const h of hrefs) {
      const a = page.locator(`a[href="${h}"]`).first();
      await expect(a, h).toBeVisible();
      const href = await a.getAttribute("href");
      expect(href, h).not.toMatch(/^#/);
      const res = await page.goto(`/years/2017/pages/${href}`);
      expect(res && res.ok(), href || h).toBeTruthy();
      await page.goto("/years/2017/pages/home.html");
    }
  });

  test("home P2 harvest chips resolve", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    const hrefs = [
      "../sites/snapchat/ipo.html",
      "../sites/youtube/tv.html",
      "../sites/echo/show.html",
      "../sites/notpetya/index.html",
      "../sites/flash/eol.html",
      "../sites/ios11/index.html",
      "../sites/pixel/2.html",
      "../sites/krack/index.html",
    ];
    for (const h of hrefs) {
      const a = page.locator(`a[href="${h}"]`).first();
      await expect(a, h).toBeVisible();
      const res = await page.goto(`/years/2017/pages/${h}`);
      expect(res && res.ok(), h).toBeTruthy();
      await page.goto("/years/2017/pages/home.html");
    }
  });

  test("one-thing is still Face ID not Fortnite/280/Netflix", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    const href = await page.locator('[data-ott-one-thing="2017"]').getAttribute("href");
    expect(href).toMatch(/iphone\/x/);
    expect(href).not.toMatch(/fortnite|280|netflix|musical/i);
  });
});

test.describe("2017 densify iframe shell", () => {
  test("iframe Face ID incomplete then complete", async ({ page }) => {
    await enterYear(page, "2017");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt17-faceid");
        localStorage.setItem("itt16-ig-stories", '{"keep":1}');
      } catch (e) {
        /* */
      }
    });
    await goInFrame(page, "sites/iphone/x.html");
    const frame = contentFrame(page);
    await expect(frame.locator("[data-faceid-save]")).toBeVisible({ timeout: 15000 });
    await frame.locator("[data-faceid-save]").click();
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt17-faceid")).toBeFalsy();
    await frame.locator("[data-faceid-no-home]").check({ force: true });
    await frame.locator("[data-faceid-not-touch]").check({ force: true });
    await frame.locator("[data-faceid-not-xs]").check({ force: true });
    await frame.locator("[data-faceid-save]").click();
    await expect.poll(async () => getKey(page, "itt17-faceid"), { timeout: 10000 }).toBeTruthy();
    expect(await getKey(page, "itt16-ig-stories")).toBe('{"keep":1}');
  });

  test("iframe Fortnite → Storm Circle trail", async ({ page }) => {
    await enterYear(page, "2017");
    await goInFrame(page, "sites/fortnite/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Fortnite|Sep(?:tember)?\s*26/i, {
      timeout: 15000,
    });
    await goInFrame(page, "sites/playable/game.html");
    await expect(contentFrame(page).locator("[data-game-id='stormcircle']")).toBeVisible();
  });
});
