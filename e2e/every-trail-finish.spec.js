// @ts-check
/**
 * Every live trail room writes one ITT.User envelope.
 * Flow trail rows come from js/config/flow-trails.js (396).
 * 2015 is the React door and is not in that file (10 stops).
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails, completeReactStop } = require("./helpers");
const { getKey, clickOfficialVerb } = require("./dest-true-io");

const ROOT = path.join(__dirname, "..");
const KINDS = ["official", "leftover", "game", "toy", "shell"];

function loadTrails() {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  /** @type {{ year: string, n: number, name: string, href: string, whenKey: string }[]} */
  const dests = [];
  const yearRe = /"(\d{4})":\s*\[/g;
  /** @type {{ year: string, at: number }[]} */
  const starts = [];
  let m;
  while ((m = yearRe.exec(src))) starts.push({ year: m[1], at: m.index + m[0].length });
  for (let i = 0; i < starts.length; i++) {
    const year = starts[i].year;
    if (!fs.existsSync(path.join(ROOT, "years", year, "index.html"))) continue;
    const end = i + 1 < starts.length ? starts[i + 1].at : src.length;
    const block = src.slice(starts[i].at, end);
    const rowRe =
      /\{[^}]*"n":\s*(\d+)[^}]*"name":\s*"([^"]*)"[^}]*"href":\s*"([^"]*)"[^}]*"whenKey":\s*"([^"]*)"/g;
    let r;
    while ((r = rowRe.exec(block))) {
      dests.push({
        year,
        n: parseInt(r[1], 10),
        name: r[2],
        href: r[3],
        whenKey: r[4],
      });
    }
  }
  return dests.filter((d) => fs.existsSync(path.join(ROOT, "years", d.year, d.href)));
}

const DESTS = loadTrails();

const REACT_2015 = [
  { n: 1, whenKey: "itt15-periscope", name: "Periscope Go LIVE" },
  { n: 2, whenKey: "itt15-music", name: "Apple Music" },
  { n: 3, whenKey: "itt15-win10", name: "Windows 10" },
  { n: 4, whenKey: "itt15-reddit", name: "Reddit redesign" },
  { n: 5, whenKey: "itt15-watch", name: "Apple Watch" },
  { n: 6, whenKey: "itt15-edge", name: "Edge" },
  { n: 7, whenKey: "itt15-meerkat", name: "Meerkat" },
  { n: 8, whenKey: "itt15-slack", name: "Slack" },
  { n: 9, whenKey: "itt15-youtube", name: "YouTube Red" },
  { n: 10, whenKey: "itt15-game-liverush", name: "Live Rush" },
];

/**
 * Product machines whose finish is not the generic official-verb form.
 * @type {Record<string, (page: import("@playwright/test").Page) => Promise<void>>}
 */
const CUSTOM = {
  "itt94-csotd": async (page) => {
    await page.evaluate(() => {
      try { sessionStorage.setItem("itt94-csotd-wandered", "1"); } catch (e) { /* */ }
    });
    await page.locator("[data-csotd-link]").click();
    await page.fill("[name='gbname']", "Glenn residual");
    await page.fill("[name='gbnote']", "Modem worthy.");
    await page.locator("form[data-csotd-gb] [data-official-verb]").click();
  },
  "itt95-ssl-checkout": async (page) => {
    await page.fill("[name='name']", "Jane Residual");
    await page.fill("[name='card']", "4242");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
  },
  "itt96-portal-wars": async (page) => {
    const wars = "/years/1996/sites/portals/wars.html";
    for (const id of ["yahoo", "excite", "altavista"]) {
      await page.goto(wars);
      await page.waitForFunction(
        () => [...document.scripts].some((s) => (s.src || "").indexOf("one-thing-machines") !== -1),
        { timeout: 15000 }
      );
      await page.locator(`[data-portal="${id}"]`).first().click();
    }
  },
  "itt97-pointcast": async (page) => {
    await page.locator("[data-pc-sub='News']").click();
    await page.locator("[data-pc-sub='Weather']").click();
  },
  "itt98-lucky": async (page) => {
    await page.fill("#ott-field, [name='q']", "yahoo");
    await page.locator("[data-google-lucky]").click();
  },
  "itt99-aim": async (page) => {
    await page.fill("#ott-field, [name='sn']", "coolkid99");
    await page.locator("form[data-aim-signon] button[type='submit']").click();
  },
  "itt00-mapquest": async (page) => {
    await page.fill("#ott-field, [name='from']", "123 Main St");
    await page.fill("#mq-to, [name='to']", "456 Oak Ave");
    await page.locator("form[data-mq-form] button[type='submit']").click();
  },
  "itt04-thefacebook-networks": async (page) => {
    await page.locator("[data-fb-network='harvard']").click();
    await page.fill("[data-fb-join-name]", "Mark residual");
    await page.locator("[data-fb-join-btn]").click();
  },
  "itt05-yt-uploads": async (page) => {
    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip");
    const reqs = page.locator("[data-yt-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
  },
  "itt06-tweets": async (page) => {
    await page.locator("[data-tw06-req]").nth(0).check();
    await page.locator("[data-tw06-req]").nth(1).check();
    await page.fill("[data-tw06-body]", "just setting up my twttr");
    await page.locator("[data-tw06-post]").click();
  },
  "itt07-iphone": async (page) => {
    await page.locator("[data-official-need]").fill("apple.com");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
  },
  "itt09-like": async (page) => {
    await page.locator("[data-official-need]").fill("Like");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
  },
  "itt10-ig-posts": async (page) => {
    await page.locator('[data-ig-filter="X-Pro II"]').click();
    await page.fill("[data-ig-caption]", "museum square");
    await page.locator("[data-ig-share]").click();
  },
  "itt11-gplus": async (page) => {
    await page.locator("[data-official-need]").fill("Friends");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
  },
  "itt12-ig-android": async (page) => {
    await page.locator('[data-ig12-filter="X-Pro II"]').click();
    await page.fill("[data-official-need]", "X-Pro II leftover");
    await page.locator("[data-ig12-share]").click();
  },
  "itt12-pin": async (page) => {
    await page.locator("[data-official-need]").fill("Pinterest leftover");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator('[data-pin-tile="kitchen"]').click();
    await page.locator('[data-pin-tile="wedding"]').click();
    await page.locator("[data-pin-save]").click();
  },
  "itt13-vine-posts": async (page) => {
    const hold = page.locator("[data-vn13-hold]");
    await hold.waitFor({ state: "visible", timeout: 15000 });
    await hold.dispatchEvent("pointerdown");
    await page.waitForTimeout(6200);
    await hold.dispatchEvent("pointerup");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "leftover residual");
    await page.locator("[data-vn13-post]").click();
  },
  "itt14-wa-install": async (page) => {
    await page.locator('[data-wa14-deal="16b"]').click();
    await page.locator('[data-wa14-deal="rsu"]').click();
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "leftover residual");
    await page.locator("[data-wa14-install]").click();
  },
  "itt20-zoom": async (page) => {
    const reqs = page.locator("[data-official-verb-host] [data-zoom-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-zoom-chat]").fill("can you hear me");
    await page.locator("[data-zoom-send]").click();
    await page.locator("[data-zoom-leave]").click();
  },
  "itt21-att": async (page) => {
    await page.locator("[data-official-need]").fill("Museum App");
    await page.locator("[data-official-req]").nth(0).check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.locator("[data-official-verb]").click();
  },
};

/**
 * @param {{ year: string, href: string, whenKey: string }} d
 */
function readHtml(d) {
  return fs.readFileSync(path.join(ROOT, "years", d.year, d.href), "utf8");
}

/**
 * @param {{ year: string, href: string, whenKey: string }} d
 */
function routeOf(d) {
  const html = readHtml(d);
  const suffix = d.whenKey.replace(/^itt\d{2}-/, "");
  const officialKey = (html.match(/data-official-key="([^"]+)"/) || [])[1] || "";
  const gameId = (html.match(/data-game-id="([^"]+)"/) || [])[1] || "";
  const gameKey = gameId ? "itt" + d.year.slice(2) + "-game-" + gameId : "";
  if (
    html.indexOf("data-year-game") !== -1 &&
    html.indexOf("year-game-boot.js") !== -1 &&
    (gameKey === d.whenKey || (officialKey === d.whenKey && d.whenKey.indexOf("game") !== -1))
  ) {
    return "game";
  }
  if (html.indexOf('data-lo-key="' + suffix + '"') !== -1) return "leftover";
  if (html.indexOf('data-4x-go="' + suffix + '"') !== -1) return "4x";
  if (CUSTOM[d.whenKey]) return "custom";
  if (html.indexOf("data-official-verb") !== -1 && officialKey === d.whenKey) return "official";
  if (html.indexOf("data-pb-upload") !== -1) return "photobucket";
  return "unknown";
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, whenKey: string }} d
 * @param {string | null} kind
 */
async function assertEnvelope(page, d, kind) {
  await expect.poll(() => getKey(page, d.whenKey), { timeout: 12000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, d.whenKey)) || "null");
  expect(blob && blob.v, d.whenKey + " v").toBe(1);
  expect(blob.real, d.whenKey + " real").toBe(true);
  expect(blob.key, d.whenKey + " key").toBe(d.whenKey);
  expect(String(blob.year || ""), d.whenKey + " year").toBe(d.year);
  expect(KINDS, d.whenKey + " kind " + blob.kind).toContain(blob.kind);
  if (kind) expect(blob.kind, d.whenKey + " kind").toBe(kind);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, href: string, whenKey: string }} d
 */
async function openRoom(page, d) {
  await page.goto("/years/" + d.year + "/" + d.href);
  await revealLeftoverRails(page);
  await page.evaluate((k) => localStorage.removeItem(k), d.whenKey);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, href: string, whenKey: string }} d
 */
async function finishOfficial(page, d) {
  const destUrl = "/years/" + d.year + "/" + d.href;
  await openRoom(page, d);
  await page.locator("[data-official-verb]").first().waitFor({ state: "attached", timeout: 15000 });
  await page.evaluate(() => {
    document.querySelectorAll("[data-official-need]").forEach((el) => {
      el.value = "";
    });
  });
  await clickOfficialVerb(page, destUrl);
  if (await getKey(page, d.whenKey)) return;
  await page.evaluate(() => {
    const boxes = document.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < boxes.length; i++) {
      const el = boxes[i];
      if (el.getAttribute("data-official-req") != null) {
        el.checked = true;
        continue;
      }
      if (el.closest("[data-lo-panel], [data-pop-panel], .itt-also-year")) continue;
      el.checked = true;
    }
  });
  const field = page.locator("[data-official-need]").first();
  if ((await field.count()) > 0) {
    const typ = (await field.getAttribute("type")) || "text";
    const minAttr = await field.getAttribute("data-official-min");
    const minNeed = minAttr && /^\d+$/.test(minAttr) ? parseInt(minAttr, 10) : 2;
    const long = "leftover residual ".repeat(20).slice(0, Math.max(minNeed, 16));
    await field.fill(typ === "number" ? "431" : typ === "email" ? "ada@example.com" : long);
  }
  const hops = page.locator("[data-att-hop]");
  const nHop = await hops.count();
  for (let i = 0; i < nHop; i++) await hops.nth(i).click();
  const pick = page.locator("[data-official-pick]").first();
  if ((await pick.count()) > 0) await pick.click({ force: true });
  await clickOfficialVerb(page, destUrl);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, href: string, whenKey: string }} d
 */
async function finishLeftover(page, d) {
  const suffix = d.whenKey.replace(/^itt\d{2}-/, "");
  await openRoom(page, d);
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await lo.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    suffix,
    { timeout: 20000 }
  );
  await page.evaluate((k) => localStorage.removeItem(k), d.whenKey);
  if ((await lo.locator("[data-lo-trap]").count()) > 0) {
    await lo.locator("[data-lo-trap]").first().click();
    expect(await getKey(page, d.whenKey), d.whenKey + " trap").toBeFalsy();
  }
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  const save = lo.locator("[data-lo-save]").first();
  const needPick = await save.getAttribute("data-lo-need-pick");
  const minPick = parseInt((await save.getAttribute("data-lo-min-pick")) || "0", 10);
  if (needPick) {
    await lo.locator(`[data-lo-pick="${needPick}"]`).first().click();
  } else if (minPick) {
    const picks = lo.locator("[data-lo-pick]");
    for (let i = 0; i < minPick; i++) await picks.nth(i).click();
  } else if ((await lo.locator("[data-lo-pick]").count()) > 0) {
    await lo.locator("[data-lo-pick]").first().click();
  }
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await lo.locator("[data-lo-field]").first().fill("museum leftover");
  }
  if ((await lo.locator("[data-lo-wait]").count()) > 0) {
    await lo.locator("[data-lo-wait]").first().click();
    await page.waitForTimeout(1000);
  }
  await save.click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, href: string, whenKey: string }} d
 */
async function finish4x(page, d) {
  const suffix = d.whenKey.replace(/^itt\d{2}-/, "");
  await openRoom(page, d);
  await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
  const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${suffix}"])`);
  const go = panel.locator("[data-4x-go]");
  const kind = (await panel.getAttribute("data-4x-kind")) || "query";
  if (kind === "query") {
    await panel.locator("[data-4x-field]").fill("ok leftover");
  } else if (kind === "checks") {
    const boxes = panel.locator("[data-4x-req]");
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check();
  } else if (kind === "hops") {
    const hops = panel.locator("[data-4x-hop]");
    await hops.nth(0).click();
    await hops.nth(1).click();
  }
  await go.click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, href: string, whenKey: string }} d
 */
async function finishGame(page, d) {
  await openRoom(page, d);
  await page.waitForFunction(
    () => !!(window.ITT && window.ITT.YearGame && window.ITT.YearGame.saveBest && window.ITT.User && window.ITT.User.store),
    null,
    { timeout: 20000 }
  );
  expect(await getKey(page, d.whenKey), d.whenKey + " visit").toBeFalsy();
  const gid = await page.locator("[data-year-game]").first().getAttribute("data-game-id");
  expect(gid, d.whenKey + " game id").toBeTruthy();
  await page.evaluate(
    ({ gameId, year }) => {
      window.ITT.YearGame.saveBest(gameId, 12, { year: year });
    },
    { gameId: gid, year: d.year }
  );
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, href: string, whenKey: string }} d
 */
async function finishPhotobucket(page, d) {
  await openRoom(page, d);
  await page.locator("form[data-pb-upload] [name=file], #ott-field").first().fill("vacation.jpg");
  await page.locator("form[data-pb-upload] button[type=submit]").click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ year: string, n: number, href: string, whenKey: string }} d
 */
async function finish(page, d) {
  const route = routeOf(d);
  if (route === "game") {
    await finishGame(page, d);
    return "official";
  }
  if (route === "leftover") {
    await finishLeftover(page, d);
    return "leftover";
  }
  if (route === "4x") {
    await finish4x(page, d);
    return "leftover";
  }
  if (route === "custom") {
    await openRoom(page, d);
    await CUSTOM[d.whenKey](page);
    return null;
  }
  if (route === "official") {
    await finishOfficial(page, d);
    return "official";
  }
  if (route === "photobucket") {
    await finishPhotobucket(page, d);
    return null;
  }
  throw new Error(d.year + " " + d.whenKey + " has no finish route");
}

test.describe("every trail room writes an envelope", () => {
  test("the live trail is 396 finish rooms", () => {
    expect(DESTS.length).toBe(396);
    const routes = {};
    for (const d of DESTS) {
      const route = routeOf(d);
      expect(route, d.whenKey).not.toBe("unknown");
      routes[route] = (routes[route] || 0) + 1;
    }
    expect(routes.official).toBeGreaterThan(0);
    expect(routes.leftover).toBeGreaterThan(0);
    expect(routes.game).toBeGreaterThan(0);
  });

  for (const d of DESTS) {
    test(`${d.year} n=${d.n} ${d.whenKey}`, async ({ page }) => {
      const kind = await finish(page, d);
      await assertEnvelope(page, d, kind);
    });
  }
});

test.describe("2015 React stops write an envelope", () => {
  for (const stop of REACT_2015) {
    test(`2015 n=${stop.n} ${stop.whenKey}`, async ({ page }) => {
      await page.goto("/app/index.html#/year/2015?stop=" + stop.whenKey);
      await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
        timeout: 15000,
      });
      const room = page.locator("article.stop#" + stop.whenKey);
      await room.waitFor({ timeout: 15000 });
      await completeReactStop(page, room);
      await expect(room.locator(".status")).toHaveText("Saved.");
      await assertEnvelope(page, { year: "2015", whenKey: stop.whenKey, href: "", n: stop.n }, "official");
    });
  }
});
