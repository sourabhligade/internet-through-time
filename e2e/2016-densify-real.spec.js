// @ts-check
/**
 * 2016 densify 16-D1–D6 — REAL gates, JSON shape, next-flow, isolation, copy honesty.
 * Incomplete never writes. Prefix itt16 only.
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
  await page.goto(`/years/2016/${spec.path}`);
  await page.evaluate((k) => localStorage.removeItem(k), spec.key);
  await page.reload();
  await waitFeat(page, "year2016extras");
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
  expect(blob.year, spec.key + " year").toBe("2016");
  expect(blob.ts, spec.key + " ts").toBeGreaterThan(0);
  return blob;
}

const DENSIFY = [
  {
    id: "16-D1 Live",
    path: "sites/instagram/live.html",
    key: "itt16-ig-live",
    save: "[data-ig-live-save]",
    checks: ["[data-ig-live-date]", "[data-ig-live-gone]", "[data-ig-live-not-reels]"],
    copy: [/Nov(?:ember)?\s*21/i, /Stories/i, /not Reels/i],
    next: /stories|snap/i,
  },
  {
    id: "16-D2 AMP-SERP",
    path: "sites/amp/serp.html",
    key: "itt16-amp-serp",
    save: "[data-amp-serp-save]",
    checks: ["[data-amp-serp-date]", "[data-amp-serp-not-2015]"],
    copy: [/Feb(?:ruary)?\s*24/i, /2015/i, /Search/i],
    next: /reaction|dyn/i,
  },
  {
    id: "16-D3 FB Live",
    path: "sites/facebook/live.html",
    key: "itt16-fb-live",
    save: "[data-fb-live-save]",
    checks: ["[data-fb-live-everyone]", "[data-fb-live-not-stream]"],
    copy: [/anyone can go live|everyone/i, /not actually|does not start a real/i],
    next: /reaction|instagram\/live|periscope/i,
  },
  {
    id: "16-D4 Dyn",
    path: "sites/dyn/index.html",
    key: "itt16-dyn",
    save: "[data-dyn-save]",
    checks: ["[data-dyn-date]", "[data-dyn-iot]"],
    copy: [/Oct(?:ober)?\s*21/i, /Mirai/i, /no attack code/i],
    next: /vine|home\.html/i,
  },
  {
    id: "16-D5 Pixel",
    path: "sites/pixel/index.html",
    key: "itt16-pixel",
    save: "[data-pixel-save]",
    checks: ["[data-pixel-date]", "[data-pixel-not-iphone]"],
    copy: [/Oct(?:ober)?\s*4/i, /not an iPhone/i],
    next: /home\/index|allo/i,
  },
  {
    id: "16-D5 Home",
    path: "sites/home/index.html",
    key: "itt16-home",
    save: "[data-ghome-save]",
    checks: ["[data-ghome-price]", "[data-ghome-ship]", "[data-ghome-not-echo]"],
    copy: [/\$129/, /Nov(?:ember)?\s*4/i, /Echo/i],
    next: /pixel|allo|home\.html/i,
  },
  {
    id: "16-D6 Spectacles",
    path: "sites/snapchat/spectacles.html",
    key: "itt16-spectacles",
    save: "[data-spec-save]",
    checks: ["[data-spec-price]", "[data-spec-snapbot]", "[data-spec-still]"],
    copy: [/\$129/, /Snapbot/i, /still competes/i],
    next: /story\.html|stories/i,
  },
  {
    id: "16-D21 letter",
    path: "sites/apple/letter.html",
    key: "itt16-fbi-letter",
    save: "[data-fbi-save]",
    checks: ["[data-fbi-backdoor]", "[data-fbi-not-crime]"],
    copy: [/Feb(?:ruary)?\s*16/i, /backdoor/i, /encryption literacy/i],
    next: /whatsapp\/e2e|about\.html/i,
  },
  {
    id: "16-D22 Free Basics",
    path: "sites/freebasics/index.html",
    key: "itt16-freebasics",
    save: "[data-freebasics-save]",
    checks: ["[data-fb-trai-date]", "[data-fb-trai-not-wall]"],
    copy: [/Feb(?:ruary)?\s*8/i, /same bits, same price/i, /still ran in other countries/i],
    next: /dyn|letter|home\.html/i,
  },
  {
    id: "16-D8 Marketplace",
    path: "sites/facebook/marketplace.html",
    key: "itt16-marketplace",
    save: "[data-mp-save]",
    checks: ["[data-mp-no-pay]"],
    fills: [
      ["[data-mp-title]", "desk lamp"],
      ["[data-mp-price]", "12"],
    ],
    copy: [/Oct(?:ober)?\s*3/i, /450 million/i, /does not/i],
    next: /reactions|live/i,
  },
  {
    id: "16-D7 Duo",
    path: "sites/duo/index.html",
    key: "itt16-duo",
    save: "[data-duo-save]",
    checks: ["[data-duo-phone]", "[data-duo-knock]", "[data-duo-not-meet]"],
    copy: [/Aug(?:ust)?\s*16/i, /Knock Knock/i, /not Google Meet/i],
    next: /allo|stories/i,
  },
  {
    id: "16-D10 Teams",
    path: "sites/teams/index.html",
    key: "itt16-teams-preview",
    save: "[data-teams-save]",
    checks: ["[data-teams-preview]", "[data-teams-ga]"],
    copy: [/PREVIEW/i, /Nov(?:ember)?\s*2/i, /2017/i],
    next: /linkedin|home\.html/i,
  },
  {
    id: "16-D12 AlphaGo",
    path: "sites/alphago/index.html",
    key: "itt16-alphago",
    save: "[data-ag-save]",
    checks: ["[data-ag-score]", "[data-ag-stream]"],
    copy: [/4–1|4-1/, /Lee/, /livestream/i],
    next: /about\.html|home\.html/i,
  },
  {
    id: "16-D18 Let’s Encrypt",
    path: "sites/letsencrypt/index.html",
    key: "itt16-letsencrypt",
    save: "[data-le-save]",
    checks: ["[data-le-prod]", "[data-le-90]"],
    copy: [/April 12|Apr 12/i, /90 days/i, /ordinary/i],
    next: /whatsapp\/e2e|home\.html/i,
  },
  {
    id: "16-D19 Yahoo",
    path: "sites/yahoo-breach/index.html",
    key: "itt16-yahoo-breach",
    save: "[data-yh-save]",
    checks: ["[data-yh-two]", "[data-yh-not-3b]"],
    copy: [/Sep(?:tember)?\s*22/i, /Dec(?:ember)?\s*14/i, /not 2016 news/i],
    next: /about\.html|home\.html/i,
  },
  {
    id: "16-L1 Workplace",
    path: "sites/workplace/index.html",
    key: "itt16-workplace",
    save: "[data-wp-save]",
    checks: ["[data-wp-work]", "[data-wp-not-feed]"],
    copy: [/Oct(?:ober)?\s*10/i, /at work/i, /not the/i],
    next: /stories/i,
  },
  {
    id: "16-L2 iOS 10",
    path: "sites/iphone/ios10.html",
    key: "itt16-ios10",
    save: "[data-ios10-save]",
    checks: ["[data-ios10-stickers]", "[data-ios10-not-face]"],
    copy: [/Sep(?:tember)?\s*13/i, /sticker/i, /not Face ID/i],
    next: /7\.html/i,
  },
  {
    id: "16-L3 Nougat",
    path: "sites/android/nougat.html",
    key: "itt16-nougat",
    save: "[data-nougat-save]",
    checks: ["[data-nougat-date]", "[data-nougat-split]"],
    copy: [/Aug(?:ust)?\s*22/i, /multi-window|split-screen/i],
    next: /pixel/i,
  },
  {
    id: "16-L4 Note 7",
    path: "sites/note7/index.html",
    key: "itt16-note7",
    save: "[data-note7-save]",
    checks: ["[data-note7-down]", "[data-note7-replace]"],
    copy: [/CPSC/i, /power down/i, /replacement/i],
    next: /7\.html|iphone/i,
  },
  {
    id: "16-L5 Mario Run",
    path: "sites/mariorun/index.html",
    key: "itt16-mario-run",
    save: "[data-mario-save]",
    checks: ["[data-mario-date]", "[data-mario-price]"],
    copy: [/Dec(?:ember)?\s*15/i, /\$9\.99/, /no official art/i],
    next: /playable\/game|gym/i,
  },
];

test.describe("2016 densify REAL incomplete → complete", () => {
  for (const spec of DENSIFY) {
    test(`${spec.id} incomplete never writes; complete is REAL JSON`, async ({ page }) => {
      const blob = await assertBlockedThenWrites(page, spec);
      expect(blob).toBeTruthy();
    });
  }
});

test.describe("2016 densify next-flow + reload", () => {
  for (const spec of DENSIFY) {
    test(`${spec.id} next-flow hidden then visible; reload keeps status`, async ({ page }) => {
      await page.goto(`/years/2016/${spec.path}`);
      await page.evaluate((k) => localStorage.removeItem(k), spec.key);
      await page.reload();
      await waitFeat(page, "year2016extras");
      await expect(page.locator("[data-next-flow]")).toBeHidden();
      for (const sel of spec.checks) await page.locator(sel).check();
      if (spec.fills) {
        for (const [sel, val] of spec.fills) await page.fill(sel, val);
      }
      await page.locator(spec.save).click();
      await expect(page.locator("[data-next-flow]")).toBeVisible();
      await expect(page.locator("[data-next-flow] a").first()).toHaveAttribute("href", spec.next);
      await page.reload();
      await waitFeat(page, "year2016extras");
      await expect.poll(async () => getKey(page, spec.key)).toBeTruthy();
      await expect(page.locator("[data-next-flow]")).toBeVisible();
    });
  }
});

test.describe("2016 densify copy honesty", () => {
  for (const spec of DENSIFY) {
    test(`${spec.id} period copy`, async ({ page }) => {
      await page.goto(`/years/2016/${spec.path}`);
      const body = page.locator("body");
      for (const re of spec.copy) await expect(body).toContainText(re);
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2016");
      await expect(page.locator(spec.save)).toBeVisible();
    });
  }

  test("Live is not Reels / not IGTV / no getUserMedia", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/live.html");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/not Reels/i);
    expect(text).toMatch(/not a saved IGTV|Not IGTV/i);
    expect(text).toMatch(/no real camera|no livestream|theater/i);
    expect(await page.locator("video, [data-camera]").count()).toBe(0);
  });

  test("AMP is in Search 2016 not announce-only 2015", async ({ page }) => {
    await page.goto("/years/2016/sites/amp/serp.html");
    await expect(page.locator("body")).toContainText(/Feb(?:ruary)?\s*24/i);
    await expect(page.locator("body")).toContainText(/2015 only|announced the spec/i);
    await expect(page.locator("body")).not.toContainText(/not in SERP until Feb 2016/i);
  });

  test("FB Live everyone is not 2015 celebs default", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/live.html");
    await expect(page.locator("body")).toContainText(/anyone can go live|everyone/i);
    await expect(page.locator("body")).toContainText(/Mentions|celebs|public figures/i);
    await expect(page.locator("body")).toContainText(/not actually broadcasting|does not start a real/i);
  });

  test("Dyn has no exploit how-to", async ({ page }) => {
    await page.goto("/years/2016/sites/dyn/index.html");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Mirai/i);
    expect(text).toMatch(/no attack code/i);
    expect(text).not.toMatch(/how to (launch|run) .*ddos/i);
    expect(text).not.toMatch(/default password/i);
  });

  test("Pixel / Home are not iPhone 7 / not first speaker", async ({ page }) => {
    await page.goto("/years/2016/sites/pixel/index.html");
    await expect(page.locator("body")).toContainText(/not an iPhone/i);
    await page.goto("/years/2016/sites/home/index.html");
    await expect(page.locator("body")).toContainText("$129");
    await expect(page.locator("body")).toContainText(/not the first smart speaker|Echo already/i);
    await expect(page.locator("body")).toContainText(/Not Home Mini \(2017\)/i);
    await expect(page.locator("body")).toContainText(/Not Nest Hub/i);
  });

  test("Spectacles do not say Snap died", async ({ page }) => {
    await page.goto("/years/2016/sites/snapchat/spectacles.html");
    await expect(page.locator("body")).toContainText(/still competes/i);
    await expect(page.locator("body")).toContainText(/did not kill Snap/i);
  });

  test("letter is encryption literacy not a crime exhibit", async ({ page }) => {
    await page.goto("/years/2016/sites/apple/letter.html");
    await expect(page.locator("body")).toContainText(/backdoor/i);
    await expect(page.locator("body")).toContainText(/not a crime/i);
    await expect(page.locator("body")).toContainText(/customer-letter/i);
  });

  test("Free Basics is not India banned Facebook", async ({ page }) => {
    await page.goto("/years/2016/sites/freebasics/index.html");
    await expect(page.locator("body")).toContainText(/same bits, same price/i);
    await expect(page.locator("body")).toContainText(/still ran in other countries/i);
    await expect(page.locator("body")).toContainText(/not.{0,8}India banned Facebook/i);
  });

  test("Marketplace has no payment UI", async ({ page }) => {
    await page.goto("/years/2016/sites/facebook/marketplace.html");
    await expect(page.locator("body")).toContainText(/450 million/i);
    await expect(page.locator("body")).toContainText(/18\+/);
    await expect(page.locator("input[type='password'], input[name*='card'], [data-checkout]")).toHaveCount(0);
  });

  test("Duo is not Meet; Allo is not E2E default", async ({ page }) => {
    await page.goto("/years/2016/sites/duo/index.html");
    await expect(page.locator("body")).toContainText(/Knock Knock/i);
    await expect(page.locator("body")).toContainText(/not Google Meet/i);
    await page.goto("/years/2016/sites/allo/index.html");
    await expect(page.locator("body")).toContainText(/not.{0,8}E2E default/i);
    await expect(page.locator("a[href*='duo']").first()).toBeVisible();
  });

  test("Teams PREVIEW is visible; GA is 2017", async ({ page }) => {
    await page.goto("/years/2016/sites/teams/index.html");
    await expect(page.locator("body")).toContainText(/PREVIEW/i);
    await expect(page.locator("body")).toContainText(/Mar(?:ch)?\s*14\s*2017|2017/i);
    await expect(page.locator("body")).toContainText(/not 2020/i);
  });

  test("AlphaGo is 4–1 and Lee won game 4", async ({ page }) => {
    await page.goto("/years/2016/sites/alphago/index.html");
    await expect(page.locator("body")).toContainText(/4–1|4-1/);
    await expect(page.locator("body")).toContainText(/Lee Sedol/);
    await expect(page.locator("body")).toContainText(/game 4/i);
    await expect(page.locator("body")).toContainText(/not.{0,6}AGI took the jobs/i);
  });

  test("Let’s Encrypt distinguishes 2015 beta from 2016 production", async ({ page }) => {
    await page.goto("/years/2016/sites/letsencrypt/index.html");
    await expect(page.locator("body")).toContainText(/April 12|Apr 12/i);
    await expect(page.locator("body")).toContainText(/90 days/i);
    await expect(page.locator("body")).toContainText(/2015/);
  });

  test("Yahoo two notices; not 3B", async ({ page }) => {
    await page.goto("/years/2016/sites/yahoo-breach/index.html");
    await expect(page.locator("body")).toContainText(/500 million/i);
    await expect(page.locator("body")).toContainText(/1 billion/i);
    await expect(page.locator("body")).toContainText(/not 2016 news/i);
    await expect(page.locator("input[type='password']")).toHaveCount(0);
  });
});

test.describe("2016 densify isolation + home chips", () => {
  test("Live write does not touch itt15-* or unprefixed keys", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/live.html");
    await page.evaluate(() => {
      localStorage.setItem("itt15-watch", '{"keep":1}');
      localStorage.setItem("itt15-amp-ack", '{"keep":1}');
      localStorage.removeItem("itt16-ig-live");
      localStorage.removeItem("ig-live");
    });
    await waitFeat(page, "year2016extras");
    await page.locator("[data-ig-live-date]").check();
    await page.locator("[data-ig-live-gone]").check();
    await page.locator("[data-ig-live-not-reels]").check();
    await page.locator("[data-ig-live-save]").click();
    await expect.poll(async () => getKey(page, "itt16-ig-live")).toBeTruthy();
    expect(await getKey(page, "itt15-watch")).toBe('{"keep":1}');
    expect(await getKey(page, "itt15-amp-ack")).toBe('{"keep":1}');
    expect(await getKey(page, "ig-live")).toBeFalsy();
  });

  test("AMP-SERP is not itt15-amp-ack", async ({ page }) => {
    await page.goto("/years/2016/sites/amp/serp.html");
    await page.evaluate(() => {
      localStorage.setItem("itt15-amp-ack", '{"keep":1}');
      localStorage.removeItem("itt16-amp-serp");
    });
    await waitFeat(page, "year2016extras");
    await page.locator("[data-amp-serp-date]").check();
    await page.locator("[data-amp-serp-not-2015]").check();
    await page.locator("[data-amp-serp-save]").click();
    await expect.poll(async () => getKey(page, "itt16-amp-serp")).toBeTruthy();
    expect(await getKey(page, "itt15-amp-ack")).toBe('{"keep":1}');
  });

  test("home harvest chips resolve to real HTML not #", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    const hrefs = [
      "../sites/instagram/live.html",
      "../sites/amp/serp.html",
      "../sites/facebook/live.html",
      "../sites/dyn/index.html",
      "../sites/pixel/index.html",
      "../sites/home/index.html",
      "../sites/snapchat/spectacles.html",
      "../sites/apple/letter.html",
      "../sites/freebasics/index.html",
      "../sites/facebook/marketplace.html",
      "../sites/duo/index.html",
      "../sites/teams/index.html",
      "../sites/alphago/index.html",
      "../sites/letsencrypt/index.html",
      "../sites/yahoo-breach/index.html",
      "../sites/workplace/index.html",
      "../sites/iphone/ios10.html",
      "../sites/android/nougat.html",
      "../sites/note7/index.html",
      "../sites/mariorun/index.html",
    ];
    for (const h of hrefs) {
      const a = page.locator(`a[href="${h}"], a[href*="${h.replace("../", "")}"]`).first();
      await expect(a, h).toBeVisible();
      const href = await a.getAttribute("href");
      expect(href, h).not.toMatch(/^#/);
      const res = await page.goto(`/years/2016/pages/${href}`);
      expect(res && res.ok(), href || h).toBeTruthy();
      await page.goto("/years/2016/pages/home.html");
    }
  });

  test("guided stays 6; harvest chips after guided", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    await expect(page.locator("#ott-guided-2016 ol li")).toHaveCount(6);
    const order = await page.evaluate(() => {
      const guided = document.getElementById("ott-guided-2016");
      const harvest = Array.from(document.querySelectorAll("h2")).find((h) =>
        /deep harvest/i.test(h.textContent || "")
      );
      if (!guided || !harvest) return { ok: false };
      return {
        ok: true,
        guidedBefore: !!(guided.compareDocumentPosition(harvest) & Node.DOCUMENT_POSITION_FOLLOWING),
      };
    });
    expect(order.ok).toBe(true);
    expect(order.guidedBefore).toBe(true);
  });

  test("one-thing is still Stories not Live/Pixel/PoGO", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    const href = await page.locator('[data-ott-one-thing="2016"]').getAttribute("href");
    expect(href).toMatch(/stories/);
    expect(href).not.toMatch(/live|pixel|pogo|musical|dyn|letter|marketplace|duo|alphago/i);
  });
});

test.describe("2016 densify iframe shell", () => {
  test("iframe Live incomplete then complete", async ({ page }) => {
    await enterYear(page, "2016");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt16-ig-live");
        localStorage.setItem("itt15-watch", '{"keep":1}');
      } catch (e) {
        /* */
      }
    });
    await goInFrame(page, "sites/instagram/live.html");
    const frame = contentFrame(page);
    await expect(frame.locator("[data-ig-live-save]")).toBeVisible({ timeout: 15000 });
    await frame.locator("[data-ig-live-save]").click();
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt16-ig-live")).toBeFalsy();
    await frame.locator("[data-ig-live-date]").check({ force: true });
    await frame.locator("[data-ig-live-gone]").check({ force: true });
    await frame.locator("[data-ig-live-not-reels]").check({ force: true });
    await frame.locator("[data-ig-live-save]").click();
    await expect.poll(async () => getKey(page, "itt16-ig-live"), { timeout: 10000 }).toBeTruthy();
    expect(await getKey(page, "itt15-watch")).toBe('{"keep":1}');
  });

  test("iframe Pixel → Home trail", async ({ page }) => {
    await enterYear(page, "2016");
    await goInFrame(page, "sites/pixel/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Pixel|Oct(?:ober)?\s*4/i, {
      timeout: 15000,
    });
    await goInFrame(page, "sites/home/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/\$129|Google Home/i);
  });

  test("iframe AMP + Dyn + Spectacles load", async ({ page }) => {
    await enterYear(page, "2016");
    await goInFrame(page, "sites/amp/serp.html");
    await expect(contentFrame(page).locator("body")).toContainText(/AMP|Feb(?:ruary)?\s*24/i, {
      timeout: 15000,
    });
    await goInFrame(page, "sites/dyn/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Dyn|Mirai/i);
    await goInFrame(page, "sites/snapchat/spectacles.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Spectacles|\$129/i);
  });
});
