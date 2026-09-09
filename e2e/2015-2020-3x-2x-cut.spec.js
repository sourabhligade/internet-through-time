// @ts-check
/**
 * CUT-3X-2X-2015-2020 — leftover 3× second pack, E2E, not mock.
 * Live years: 2015 / 2016 / 2017 / 2019.
 * Doors 10–18 (2016 doors 10–15 only). Today’s 9 stay in 2015-2020-3x-cut.spec.js.
 * 2018 / 2020 stay boarded. Stars / guided 6 / official gold stay put.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** @type {Record<string, {
 *   star: string,
 *   starHref: string,
 *   gold: string[],
 *   want: number,
 *   today: string[],
 *   official: string[],
 *   ils: string[],
 *   doors: { dest: string, go: string, key: string, next: string, nextKey: string, weather: RegExp, lx: string[], never: string[] }[]
 * }>} */
const LIVE = {
  2015: {
    star: "itt15-periscope",
    starHref: "periscope",
    gold: ["itt15-periscope", "itt15-applemusic", "itt15-win10", "itt15-discord", "itt15-snap-discover"],
    want: 18,
    today: ["instagram", "spotify", "netflix", "meerkat", "applemusicsub", "win10get", "vine", "echo", "snapchat"],
    official: ["periscope", "googlephotos", "windows10", "applemusic", "edge", "apple/watch", "snapchat/discover", "discord", "letsencrypt", "playable"],
    ils: ["863,105,652"],
    doors: [
      { dest: "/years/2015/sites/facebook/index.html", go: "[data-pop-go][data-pop-id='facebook']", key: "itt15-pop-facebook", next: "youtube/index.html", nextKey: "itt15-pop-youtube", weather: /one billion people|1B people in a day/i, lx: ["itt15-fb-lx", "itt15-fb-lx-d2"], never: ["itt15-periscope"] },
      { dest: "/years/2015/sites/youtube/index.html", go: "[data-pop-go][data-pop-id='youtube']", key: "itt15-pop-youtube", next: "hbonow/index.html", nextKey: "itt15-pop-hbonow", weather: /YouTube Red|21 Oct 2015/i, lx: ["itt15-yt-lx", "itt15-yt-lx-d2"], never: ["itt15-periscope", "itt15-pop3-ytgaming"] },
      { dest: "/years/2015/sites/hbonow/index.html", go: "[data-pop-go][data-pop-id='hbonow']", key: "itt15-pop-hbonow", next: "slack/index.html", nextKey: "itt15-pop-slack", weather: /7 Apr 2015|HBO Max is 2020/i, lx: ["itt15-hbo-lx", "itt15-hbo-lx-d2"], never: ["itt15-periscope"] },
      { dest: "/years/2015/sites/slack/index.html", go: "[data-pop-go][data-pop-id='slack']", key: "itt15-pop-slack", next: "waweb/index.html", nextKey: "itt15-pop-waweb", weather: /\$2\.8B|16 Apr/i, lx: ["itt15-sl-lx", "itt15-sl-lx-d2"], never: ["itt15-periscope"] },
      { dest: "/years/2015/sites/waweb/index.html", go: "[data-pop-go][data-pop-id='waweb']", key: "itt15-pop-waweb", next: "agario/index.html", nextKey: "itt15-pop-agario", weather: /21 Jan 2015|QR/i, lx: ["itt15-ww-lx", "itt15-ww-lx-d2"], never: ["itt15-periscope", "itt14-wa-install"] },
      { dest: "/years/2015/sites/agario/index.html", go: "[data-pop-go][data-pop-id='agario']", key: "itt15-pop-agario", next: "adblock/index.html", nextKey: "itt15-pop3-adblock", weather: /#1 trending US game|slither/i, lx: ["itt15-agar-lx", "itt15-agar-lx-d2"], never: ["itt15-periscope", "itt15-game-blobrush"] },
      { dest: "/years/2015/sites/adblock/index.html", go: "[data-pop-go][data-pop-id='pop3-adblock']", key: "itt15-pop3-adblock", next: "ytgaming/index.html", nextKey: "itt15-pop3-ytgaming", weather: /iOS 9|16 Sep 2015/i, lx: ["itt15-adblock-lx", "itt15-adblock-lx-d2"], never: ["itt15-periscope"] },
      { dest: "/years/2015/sites/ytgaming/index.html", go: "[data-pop-go][data-pop-id='pop3-ytgaming']", key: "itt15-pop3-ytgaming", next: "instant/index.html", nextKey: "itt15-pop3-instant", weather: /26 Aug 2015|Gaming leftover/i, lx: ["itt15-ytg-lx", "itt15-ytg-lx-d2"], never: ["itt15-periscope", "itt15-pop-youtube"] },
      { dest: "/years/2015/sites/instant/index.html", go: "[data-pop-go][data-pop-id='pop3-instant']", key: "itt15-pop3-instant", next: "pages/home.html", nextKey: "", weather: /12–13 May 2015|Instant Articles/i, lx: ["itt15-ia-lx", "itt15-ia-lx-d2"], never: ["itt15-periscope"] },
    ],
  },
  2016: {
    star: "itt16-ig-stories",
    starHref: "instagram/stories",
    gold: ["itt16-ig-stories", "itt16-musically", "itt16-vine-end"],
    want: 15,
    today: ["reddit", "netflix", "youtube", "slack", "fblive", "smario", "musically", "vine", "snapchat"],
    official: ["instagram/stories", "pokemongo", "facebook/reactions", "whatsapp/e2e", "iphone", "vine/goodbye", "snapchat/spectacles", "musically", "windows10/end", "playable"],
    ils: ["1,045,534,808"],
    doors: [
      { dest: "/years/2016/sites/alphago/index.html", go: "[data-pop-go][data-pop-id='alphago']", key: "itt16-pop-alphago", next: "linkedinms/index.html", nextKey: "itt16-pop-linkedinms", weather: /Lee Sedol|4–1|9–15 Mar 2016/i, lx: ["itt16-alphago-rlx", "itt16-alphago-rlx-d2"], never: ["itt16-ig-stories", "itt16-fb-react"] },
      { dest: "/years/2016/sites/linkedinms/index.html", go: "[data-pop-go][data-pop-id='linkedinms']", key: "itt16-pop-linkedinms", next: "dyn/index.html", nextKey: "itt16-pop-dyn", weather: /\$26\.2B|13 Jun 2016/i, lx: ["itt16-li-6x"], never: ["itt16-ig-stories"] },
      { dest: "/years/2016/sites/dyn/index.html", go: "[data-pop-go][data-pop-id='dyn']", key: "itt16-pop-dyn", next: "jio/index.html", nextKey: "itt16-pop-jio", weather: /21 Oct 2016|Mirai/i, lx: ["itt16-dyn-lx", "itt16-dyn-lx-d2"], never: ["itt16-ig-stories", "itt16-win10-end"] },
      { dest: "/years/2016/sites/jio/index.html", go: "[data-pop-go][data-pop-id='jio']", key: "itt16-pop-jio", next: "assistant/index.html", nextKey: "itt16-pop-assistant", weather: /5 Sep 2016|Welcome Offer/i, lx: ["itt16-ji-6x"], never: ["itt16-ig-stories"] },
      { dest: "/years/2016/sites/assistant/index.html", go: "[data-pop-go][data-pop-id='assistant']", key: "itt16-pop-assistant", next: "houseparty/index.html", nextKey: "itt16-pop-houseparty", weather: /18 May 2016|Pixel 4 Oct/i, lx: ["itt16-as-6x"], never: ["itt16-ig-stories", "itt16-iphone7"] },
      { dest: "/years/2016/sites/houseparty/index.html", go: "[data-pop-go][data-pop-id='houseparty']", key: "itt16-pop-houseparty", next: "pages/home.html", nextKey: "", weather: /28 Sep|2020 lockdown/i, lx: ["itt16-hp-6x"], never: ["itt16-ig-stories"] },
    ],
  },
  2017: {
    star: "itt17-faceid",
    starHref: "iphone/x",
    gold: ["itt17-faceid", "itt17-fortnite", "itt17-teams", "itt17-switch"],
    want: 18,
    today: ["reddit", "youtube", "amazon", "snapipo", "bitcoinath", "echoshow", "fortnite", "teams", "switch"],
    official: ["iphone/x", "fortnite", "twitter/280", "teams", "vine/gone", "switch", "wannacry", "musically", "equifax", "playable"],
    ils: ["1,766,926,408"],
    doors: [
      { dest: "/years/2017/sites/hqtrivia/index.html", go: "[data-pop-go][data-pop-id='hqtrivia']", key: "itt17-pop-hqtrivia", next: "pubgnote/index.html", nextKey: "itt17-pop-pubgnote", weather: /730k|17 Oct 2017/i, lx: ["itt17-hqtrivia-rlx"], never: ["itt17-faceid"] },
      { dest: "/years/2017/sites/pubgnote/index.html", go: "[data-pop-go][data-pop-id='pubgnote']", key: "itt17-pop-pubgnote", next: "facebook2b/index.html", nextKey: "itt17-pop-facebook2b", weather: /23 Mar 2017|21 Dec 2017/i, lx: ["itt17-pubgnote-rlx"], never: ["itt17-faceid", "itt17-fortnite", "itt17-pop3-fortnite"] },
      { dest: "/years/2017/sites/facebook2b/index.html", go: "[data-pop-go][data-pop-id='facebook2b']", key: "itt17-pop-facebook2b", next: "youtubetv/index.html", nextKey: "itt17-pop-youtubetv", weather: /2 billion MAU|27 Jun 2017/i, lx: ["itt17-fb2b-dp"], never: ["itt17-faceid"] },
      { dest: "/years/2017/sites/youtubetv/index.html", go: "[data-pop-go][data-pop-id='youtubetv']", key: "itt17-pop-youtubetv", next: "notpetya/index.html", nextKey: "itt17-pop-notpetya", weather: /\$35|5 Apr 2017/i, lx: ["itt17-ytv-6x"], never: ["itt17-faceid"] },
      { dest: "/years/2017/sites/notpetya/index.html", go: "[data-pop-go][data-pop-id='notpetya']", key: "itt17-pop-notpetya", next: "nnrepeal/index.html", nextKey: "itt17-pop-nnrepeal", weather: /27 Jun 2017|WannaCry/i, lx: ["itt17-notpetya-rlx"], never: ["itt17-faceid", "itt17-wannacry"] },
      { dest: "/years/2017/sites/nnrepeal/index.html", go: "[data-pop-go][data-pop-id='nnrepeal']", key: "itt17-pop-nnrepeal", next: "yahoo3b/index.html", nextKey: "itt17-pop3-yahoo3b", weather: /14 Dec 2017|Title II/i, lx: ["itt17-nn-6x"], never: ["itt17-faceid"] },
      { dest: "/years/2017/sites/yahoo3b/index.html", go: "[data-pop-go][data-pop-id='pop3-yahoo3b']", key: "itt17-pop3-yahoo3b", next: "iphone8/index.html", nextKey: "itt17-pop3-iphone8", weather: /3 Oct 2017|3 billion/i, lx: ["itt17-yahoo3b-dp"], never: ["itt17-faceid"] },
      { dest: "/years/2017/sites/iphone8/index.html", go: "[data-pop-go][data-pop-id='pop3-iphone8']", key: "itt17-pop3-iphone8", next: "pixel2/index.html", nextKey: "itt17-pop3-pixel2", weather: /22 Sep 2017|#1 technology/i, lx: ["itt17-iphone8-dp"], never: ["itt17-faceid"] },
      { dest: "/years/2017/sites/pixel2/index.html", go: "[data-pop-go][data-pop-id='pop3-pixel2']", key: "itt17-pop3-pixel2", next: "pages/home.html", nextKey: "", weather: /4 Oct 2017|Pixel 2/i, lx: ["itt17-px-6x"], never: ["itt17-faceid"] },
    ],
  },
  2019: {
    star: "itt19-disneyplus",
    starHref: "disneyplus",
    gold: ["itt19-disneyplus", "itt19-tiktok", "itt19-arcade", "itt19-stadia", "itt19-appletv", "itt19-airpods-pro", "itt19-iphone11"],
    want: 18,
    today: ["youtube", "instagram", "wikipedia", "facebook", "fortnite", "hidelikes", "tiktok", "stadia", "arcade"],
    official: ["disneyplus", "tiktok", "arcade", "appletv", "stadia", "iphone", "airpodspro", "chrome", "windows10", "playable"],
    ils: ["1,630,322,579", "4.1B"],
    doors: [
      { dest: "/years/2019/sites/gplus/index.html", go: "[data-pop-go][data-pop-id='gplus']", key: "itt19-pop-gplus", next: "inbox/index.html", nextKey: "itt19-pop-inbox", weather: /2 Apr 2019|Google\+/i, lx: ["itt19-gplus-lx", "itt19-gplus-die"], never: ["itt19-disneyplus"] },
      { dest: "/years/2019/sites/inbox/index.html", go: "[data-pop-go][data-pop-id='inbox']", key: "itt19-pop-inbox", next: "cnil/index.html", nextKey: "itt19-pop-cnil", weather: /off 2 Apr 2019|Inbox by Gmail/i, lx: ["itt19-inbox-lx", "itt19-inbox-off"], never: ["itt19-disneyplus"] },
      { dest: "/years/2019/sites/cnil/index.html", go: "[data-pop-go][data-pop-id='cnil']", key: "itt19-pop-cnil", next: "fortnitewc/index.html", nextKey: "itt19-pop-fortnitewc", weather: /€50M|21 Jan 2019/i, lx: ["itt19-cnil-lx", "itt19-cnil-50"], never: ["itt19-disneyplus"] },
      { dest: "/years/2019/sites/fortnitewc/index.html", go: "[data-pop-go][data-pop-id='fortnitewc']", key: "itt19-pop-fortnitewc", next: "oculusquest/index.html", nextKey: "itt19-pop-oculusquest", weather: /26–28 Jul 2019|Bugha|Arthur Ashe/i, lx: ["itt19-wc-lx", "itt19-wc-cup"], never: ["itt19-disneyplus", "itt19-pop-fortnite"] },
      { dest: "/years/2019/sites/oculusquest/index.html", go: "[data-pop-go][data-pop-id='oculusquest']", key: "itt19-pop-oculusquest", next: "libra/index.html", nextKey: "itt19-pop-libra", weather: /21 May 2019|\$399/i, lx: ["itt19-quest-lx", "itt19-quest-buy"], never: ["itt19-disneyplus"] },
      { dest: "/years/2019/sites/libra/index.html", go: "[data-pop-go][data-pop-id='libra']", key: "itt19-pop-libra", next: "slack/index.html", nextKey: "itt19-pop3-slack", weather: /18 Jun 2019|Diem/i, lx: ["itt19-libra-lx", "itt19-libra-wp"], never: ["itt19-disneyplus"] },
      { dest: "/years/2019/sites/slack/index.html", go: "[data-pop-go][data-pop-id='pop3-slack']", key: "itt19-pop3-slack", next: "huawei/index.html", nextKey: "itt19-pop3-huawei", weather: /20 Jun 2019|WORK/i, lx: ["itt19-sl-lx", "itt19-sl-ws"], never: ["itt19-disneyplus", "itt15-pop-slack"] },
      { dest: "/years/2019/sites/huawei/index.html", go: "[data-pop-go][data-pop-id='pop3-huawei']", key: "itt19-pop3-huawei", next: "area51/index.html", nextKey: "itt19-pop3-area51", weather: /Entity List|15–16 May 2019/i, lx: ["itt19-hw-lx", "itt19-hw-gms"], never: ["itt19-disneyplus"] },
      { dest: "/years/2019/sites/area51/index.html", go: "[data-pop-go][data-pop-id='pop3-area51']", key: "itt19-pop3-area51", next: "pages/home.html", nextKey: "", weather: /27 Jun 2019|Storm Area 51/i, lx: ["itt19-a51-lx", "itt19-a51-raid"], never: ["itt19-disneyplus", "itt20-zoom"] },
    ],
  },
};

function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function siteKey(href) {
  const m = String(href || "").match(/sites\/[^?#]+/);
  return m ? m[0].replace(/^\.\.\//, "") : String(href || "");
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ dest: string, go: string, key: string, next: string, nextKey: string, weather: RegExp, lx: string[], never: string[] }} door
 * @param {string[]} gold
 */
async function walkDoor(page, door, gold) {
  await page.goto(door.dest);
  await page.evaluate((k) => localStorage.removeItem(k), door.key);
  const extra = [...new Set([...(gold || []), ...(door.never || []), ...(door.lx || [])])];
  for (const g of extra) await page.evaluate((k) => localStorage.removeItem(k), g);
  if (door.nextKey) await page.evaluate((k) => localStorage.removeItem(k), door.nextKey);
  const y = door.key.slice(3, 5);
  await page.evaluate((p) => localStorage.removeItem("itt" + p + "-x"), String(Number(y) - 1).padStart(2, "0"));
  await page.evaluate((p) => localStorage.removeItem("itt" + p + "-x"), String(Number(y) + 1).padStart(2, "0"));
  await page.reload();

  await expect(page.locator(".itt-pop3x-flow[data-pop-panel='1']").first()).toContainText(door.weather);

  const go = page.locator(door.go).first();
  await expect(go).toBeVisible({ timeout: 15000 });
  await page.waitForFunction(
    (sel) => {
      const b = document.querySelector(sel);
      return !!(b && b.getAttribute("data-pop-bound") === "1");
    },
    door.go,
    { timeout: 15000 }
  );
  const panel = page.locator(`${door.go}`).first().locator("xpath=ancestor::*[@data-pop-panel='1' or contains(@class,'itt-pop3') or contains(@class,'itt-pop3x-flow')][1]");
  const scope = (await panel.count()) ? panel : page;

  await go.click();
  expect(await getKey(page, door.key), door.key + " empty/no-pick").toBeFalsy();

  const trap = scope.locator("[data-pop-pick='trap'], [data-pop-trap='1']").first();
  if (await trap.count()) {
    await trap.click();
    await go.click();
    expect(await getKey(page, door.key), door.key + " trap").toBeFalsy();
  }

  const keep = scope.locator("[data-pop-pick]:not([data-pop-trap='1']):not([data-pop-pick='trap'])").first();
  if (await keep.count()) await keep.click();
  const reqs = scope.locator("[data-pop-req]");
  const nReq = await reqs.count();
  if (nReq) {
    await go.click();
    expect(await getKey(page, door.key), door.key + " 0 ticks").toBeFalsy();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  }
  const field = scope.locator("[data-pop-field]").first();
  if (await field.count()) {
    await field.fill("");
    await go.click();
    expect(await getKey(page, door.key), door.key + " empty field").toBeFalsy();
    const ph = (await field.getAttribute("placeholder")) || "museum leftover";
    await field.fill(ph);
  }
  await go.click();
  await expect.poll(() => getKey(page, door.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, door.key)) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.multiStep).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(String(blob.year)).toBe(String(2000 + Number(door.key.slice(3, 5))));
  for (const g of extra) {
    if (g === door.key) continue;
    expect(await getKey(page, g), door.key + " must not write " + g).toBeFalsy();
  }
  const next = page.locator(`[data-next-when-key="${door.key}"] a`).first();
  await expect(next).toBeVisible();
  const href = (await next.getAttribute("href")) || "";
  expect(href).toContain(door.next);
  if (door.nextKey) {
    expect(await getKey(page, door.nextKey), door.key + " Next must not write " + door.nextKey).toBeFalsy();
  }
  const [res] = await Promise.all([
    page.waitForResponse((r) => r.request().resourceType() === "document" && r.url().includes(door.next.split("/").pop() || door.next)),
    next.click(),
  ]);
  expect(res.ok(), "Next HTTP 200 " + res.url()).toBeTruthy();
  expect(page.url()).toContain(door.next.replace(/^\.\.\//, "").replace("../../", ""));
  if (door.nextKey) {
    expect(await getKey(page, door.nextKey), "landing Next dest must not write " + door.nextKey).toBeFalsy();
  }
}

test.describe("CUT-3X-2X-2015-2020 boarded stay empty", () => {
  test("2018 and 2020 are live lean doors", () => {
    for (const y of ["2018", "2020"]) {
      expect(fs.existsSync(path.join(ROOT, "years", y, "index.html"))).toBe(true);
    }
  });

  test("leftover 4× stays 0 on 2016 / 2017 / 2019 dests", () => {
    for (const y of ["2016", "2017", "2019"]) {
      const dir = path.join(ROOT, "years", y, "sites");
      const hits = [];
      function walk(d) {
        for (const name of fs.readdirSync(d)) {
          const p = path.join(d, name);
          if (fs.statSync(p).isDirectory()) walk(p);
          else if (name.endsWith(".html")) {
            const t = fs.readFileSync(p, "utf8");
            if (t.includes("data-4x-panel") || t.includes("data-4x-go")) hits.push(p);
          }
        }
      }
      walk(dir);
      expect(hits, y + " leftover 4×").toEqual([]);
    }
  });

  test("dest folders stay 71 / 32 / 55 / 55", () => {
    const want = { 2015: 71, 2016: 32, 2017: 55, 2019: 55 };
    for (const [y, n] of Object.entries(want)) {
      const dir = path.join(ROOT, "years", y, "sites");
      const got = fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory()).length;
      expect(got, y + " dest folders").toBe(n);
    }
  });
});

for (const [year, spec] of Object.entries(LIVE)) {
  test.describe(`${year} leftover 3× 2× doors`, () => {
    test(`home strips are unique leftover dests and not the star`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const first = page.locator(`[data-itt-pop3x="${year}"]`).first().locator('a[href*="sites/"]');
      const more = page.locator(`[data-itt-pop-more="${year}"]`).first().locator('a[href*="sites/"]');
      const third = page.locator(`[data-itt-pop-3x3="${year}"]`).first().locator('a[href*="sites/"]');
      const a = page.locator(`[data-itt-pop-2x-a="${year}"]`).first().locator('a[href*="sites/"]');
      const b = page.locator(`[data-itt-pop-2x-b="${year}"]`).first().locator('a[href*="sites/"]');
      const c = page.locator(`[data-itt-pop-2x-c="${year}"]`);
      await expect(first).toHaveCount(3);
      await expect(more).toHaveCount(3);
      await expect(third).toHaveCount(3);
      await expect(a).toHaveCount(3);
      await expect(b).toHaveCount(3);
      if (year === "2016") {
        await expect(c).toHaveCount(0);
      } else {
        await expect(c.first().locator('a[href*="sites/"]')).toHaveCount(3);
      }
      const todayH = [
        ...(await first.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
        ...(await more.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
        ...(await third.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
      ];
      const twoXH = [
        ...(await a.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
        ...(await b.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
        ...(year === "2016" ? [] : await c.first().locator('a[href*="sites/"]').evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
      ];
      const todayK = todayH.map(siteKey);
      const twoXK = twoXH.map(siteKey);
      const allK = [...todayK, ...twoXK];
      expect(new Set(todayK).size).toBe(9);
      expect(new Set(twoXK).size).toBe(spec.want - 9);
      expect(new Set(allK).size).toBe(spec.want);
      const star = (await page.locator(`[data-ott-one-thing="${year}"]`).getAttribute("href")) || "";
      const starK = siteKey(star);
      expect(twoXK.join(" ")).not.toContain(spec.starHref);
      expect(allK).not.toContain(starK);
      for (const k of twoXK) expect(todayK, "2× overlaps today’s 9 " + k).not.toContain(k);
      const ab = [
        ...(await a.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
        ...(await b.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
      ];
      const abJoined = ab.join(" ");
      for (const off of spec.official) {
        expect(abJoined, "4th/5th never official gold " + off).not.toMatch(new RegExp(off.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      }
      if (year === "2015") expect(twoXH.join(" ")).toMatch(/facebook/);
      if (year === "2016") {
        expect(twoXH.join(" ")).toMatch(/alphago/);
        expect(twoXH.join(" ")).not.toMatch(/moments|inbox|win10end|pokemongo/);
      }
      if (year === "2017") expect(twoXH.join(" ")).toMatch(/hqtrivia/);
      if (year === "2019") {
        expect(twoXH.join(" ")).toMatch(/gplus/);
        expect(twoXH.join(" ")).not.toMatch(/hidelikes|wework/);
      }
      for (const h of twoXH) {
        const dest = h.replace(/^\.\.\//, `/years/${year}/`);
        const res = await page.goto(dest);
        expect(res && res.ok(), dest).toBeTruthy();
        await expect(page.locator("[data-pop-panel='1'][class*='itt-pop3x-flow'], .itt-pop3x-flow[data-pop-panel='1']").first()).toBeVisible();
      }
    });

    test(`map lists all leftover 3× 2× hrefs`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/map.html`);
      for (const door of spec.doors) {
        const slug = door.dest.replace(`/years/${year}/sites/`, "");
        await expect(page.locator(`a[href*="${slug}"]`).first()).toBeVisible();
      }
    });

    test(`About still prints ILS and no invented June websites cell`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/about.html`);
      const body = await page.locator("body").innerText();
      for (const print of spec.ils) expect(body).toContain(print);
      if (year === "2019") {
        expect(body).toMatch(/table ends 2018 at 1,630,322,579/);
        expect(body).toMatch(/No June 2019 ILS cell/);
      }
    });

    for (const door of spec.doors) {
      test(`${door.key} trap/empty never write · complete writes · gold empty · Next 200`, async ({ page }) => {
        await walkDoor(page, door, spec.gold);
      });
    }
  });
}
