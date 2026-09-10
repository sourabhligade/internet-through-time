// @ts-check
/**
 * Every official-10 dest 1994–2024 is a REAL writer.
 * Incomplete / trap / empty never writes whenKey.
 * Complete writes year-prefixed JSON { real, year } (games write { real, gameId }).
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");


const ROOT = path.join(__dirname, "..");

function loadTrails() {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  /** @type {{ year: string, n: number, name: string, href: string, whenKey: string }[]} */
  const dests = [];
  const yearRe = /"(\d{4})":\s*\[/g;
  let m;
  const starts = [];
  while ((m = yearRe.exec(src))) starts.push({ year: m[1], at: m.index + m[0].length });
  for (let i = 0; i < starts.length; i++) {
    const year = starts[i].year;
    if (year === "2025") continue;
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
  return dests;
}

const DESTS = loadTrails().filter((d) => {
  const file = path.join(ROOT, "years", d.year, d.href);
  return d.whenKey && fs.existsSync(file);
});

/**
 * Year-star product machines (one-thing dests). Incomplete never writes
 * the official whenKey. Complete writes it.
 * @type {Record<string, { incomplete: (p: import("@playwright/test").Page) => Promise<void>, complete: (p: import("@playwright/test").Page) => Promise<void>, seedOk?: boolean }>}
 */
const STAR = {
  "itt94-csotd": {
    incomplete: async (page) => {
      await page.locator("form[data-csotd-gb] input[type='submit']").click();
    },
    complete: async (page) => {
      await page.evaluate(() => {
        try { sessionStorage.setItem("itt94-csotd-wandered", "1"); } catch (e) { /* */ }
      });
      await page.fill("[name='gbname']", "Glenn residual");
      await page.fill("[name='gbnote']", "Modem worthy.");
      await page.locator("form[data-csotd-gb] input[type='submit']").click();
    },
  },
  "itt95-ssl-checkout": {
    incomplete: async (page) => {
      await page.locator("form[data-ssl-form] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("[name='name']", "Jane Residual");
      await page.fill("[name='card']", "4242");
      await page.fill("[name='city']", "Seattle");
      await page.locator("form[data-ssl-form] button[type='submit']").click();
    },
  },
  "itt96-portal-wars": {
    incomplete: async (page) => {
      await page.locator("[data-portal='yahoo']").click();
    },
    complete: async (page) => {
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
  },
  "itt97-pointcast": {
    incomplete: async (page) => {
      await page.locator("[data-pc-sub='News']").click();
    },
    complete: async (page) => {
      await page.locator("[data-pc-sub='News']").click();
      await page.locator("[data-pc-sub='Weather']").click();
    },
  },
  "itt98-lucky": {
    incomplete: async (page) => {
      await page.locator("[data-google-lucky]").click();
    },
    complete: async (page) => {
      await page.fill("#ott-field, [name='q']", "yahoo");
      await page.locator("[data-google-lucky]").click();
    },
  },
  "itt99-aim": {
    incomplete: async (page) => {
      await page.locator("form[data-aim-signon] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("#ott-field, [name='sn']", "coolkid99");
      await page.locator("form[data-aim-signon] button[type='submit']").click();
    },
  },
  "itt00-mapquest": {
    incomplete: async (page) => {
      await page.locator("form[data-mq-form] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("#ott-field, [name='from']", "123 Main St");
      await page.fill("#mq-to, [name='to']", "456 Oak Ave");
      await page.locator("form[data-mq-form] button[type='submit']").click();
    },
  },
  "itt04-thefacebook-networks": {
    incomplete: async (page) => {
      await page.locator("[data-fb-join-btn]").click();
    },
    complete: async (page) => {
      await page.locator("[data-fb-network='harvard']").click();
      await page.fill("[data-fb-join-name]", "Mark residual");
      await page.locator("[data-fb-join-btn]").click();
    },
  },
  "itt05-yt-uploads": {
    seedOk: true,
    incomplete: async (page) => {
      await page.locator("form[data-yt-upload] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("[name='title']", "Me at the zoo residual");
      await page.fill("[name='desc']", "first clip");
      const reqs = page.locator("[data-yt-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("form[data-yt-upload] button[type='submit']").click();
    },
  },
  "itt06-tweets": {
    incomplete: async (page) => {
      await page.locator("[data-tw06-post]").click();
    },
    complete: async (page) => {
      await page.locator("[data-tw06-req]").nth(0).check();
      await page.locator("[data-tw06-req]").nth(1).check();
      await page.fill("[data-tw06-body]", "just setting up my twttr");
      await page.locator("[data-tw06-post]").click();
    },
  },
  "itt07-iphone": {
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("apple.com");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  "itt08-github": {
    incomplete: async (page) => {
      await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("[name='title']", "Cannot center logo residual");
      await page.fill("[name='body']", "Steps to reproduce residual");
      await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    },
  },
  "itt09-like": {
    incomplete: async (page) => {
      await page.locator("[data-lk09-like]").click();
    },
    complete: async (page) => {
      await page.locator('[data-lk09-page="news"]').click();
      await page.locator('[data-lk09-page="music"]').click();
      await page.locator("[data-lk09-like]").click();
    },
  },
  "itt10-ig-posts": {
    incomplete: async (page) => {
      await page.locator("[data-ig-share]").click();
    },
    complete: async (page) => {
      await page.locator('[data-ig-filter="X-Pro II"]').click();
      await page.fill("[data-ig-caption]", "museum square");
      await page.locator("[data-ig-share]").click();
    },
  },
  "itt11-gplus": {
    incomplete: async (page) => {
      await page.locator("[data-gp11-hangout]").click();
    },
    complete: async (page) => {
      await page.fill("[data-gp11-circle]", "Friends");
      await page.locator('[data-gp11-person="ada"]').click();
      await page.locator('[data-gp11-person="al"]').click();
      await page.locator("[data-gp11-hangout]").click();
    },
  },
  "itt12-ig-android": {
    incomplete: async (page) => {
      await page.locator("[data-ig12-share]").click();
    },
    complete: async (page) => {
      await page.locator('[data-ig12-filter="X-Pro II"]').click();
      await page.locator("[data-ig12-share]").click();
    },
  },
  "itt13-vine-posts": {
    incomplete: async (page) => {
      await page.locator("[data-vn13-post]").click();
    },
    complete: async (page) => {
      await page.locator("[data-vn13-hold]").click();
      await page.locator("[data-vn13-post]").click();
    },
  },
  "itt14-wa-install": {
    incomplete: async (page) => {
      await page.locator("[data-wa14-messenger]").click();
    },
    complete: async (page) => {
      await page.locator('[data-wa14-deal="16b"]').click();
      await page.locator('[data-wa14-deal="rsu"]').click();
      await page.locator("[data-wa14-install]").click();
    },
  },
  "itt15-periscope": {
    incomplete: async (page) => {
      await page.locator("[data-peri-live]").click();
    },
    complete: async (page) => {
      await page.fill("[data-peri-title]", "museum rooftop");
      await page.locator("[data-peri-live]").click();
    },
  },
  "itt16-ig-stories": {
    incomplete: async (page) => {
      await page.locator("[data-ig-story-add]").click();
    },
    complete: async (page) => {
      await page.fill("[data-ig-story-text]", "museum rooftop 24h");
      await page.locator("[data-ig-story-add]").click();
    },
  },
  "itt17-faceid": {
    incomplete: async (page) => {
      await page.locator("[data-faceid-unlock]").click();
    },
    complete: async (page) => {
      await page.locator("[data-faceid-look]").click();
      await page.locator("[data-faceid-unlock]").click();
    },
  },
  "itt18-gdpr": {
    incomplete: async (page) => {
      await page.locator("[data-gdpr-accept-all]").click();
    },
    complete: async (page) => {
      await page.locator("[data-gdpr-manage]").click();
      await page.locator("[data-gdpr-save]").click();
    },
  },
  "itt19-disneyplus": {
    incomplete: async (page) => {
      await page.locator("[data-dplus-continue]").click();
    },
    complete: async (page) => {
      await page.locator("[data-dplus-req]").nth(0).check();
      await page.locator("[data-dplus-req]").nth(1).check();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-add]").nth(0).click();
      await page.locator("[data-dplus-add]").nth(1).click();
      await page.locator('[data-dplus-profile="kids"]').click();
      await page.locator('[data-dplus-profile="adult"]').click();
      await page.locator("[data-dplus-continue]").click();
    },
  },
  "itt20-zoom": {
    incomplete: async (page) => {
      await page.locator("[data-zoom-leave]").click();
    },
    complete: async (page) => {
      await page.locator("[data-zoom-req]").nth(0).check();
      await page.locator("[data-zoom-req]").nth(1).check();
      await page.locator("[data-zoom-mute]").click();
      await page.locator("[data-zoom-chat]").fill("can you hear me");
      await page.locator("[data-zoom-send]").click();
      await page.locator("[data-zoom-leave]").click();
    },
  },
  "itt21-att": {
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").click();
    },
    complete: async (page) => {
      await page.locator('[data-att-hop="privacy"]').click();
      await page.locator('[data-att-hop="tracking"]').click();
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  "itt24-gpt4o": {
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator('[data-official-pick="4o"]').click();
      await page.locator("[data-official-need]").fill("leftover");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
};

/** @param {import("@playwright/test").Page} page @param {string} key */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} year
 * @param {string} href
 * @param {string} key
 */
async function openClear(page, year, href, key) {
  await page.goto("/years/" + year + "/" + href);
  await revealLeftoverRails(page);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  await revealLeftoverRails(page);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} key
 */
async function expectReal(page, key, year) {
  await expect.poll(() => getKey(page, key), { timeout: 10000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real, key + " real").toBe(true);
  expect(String(blob.year || ""), key + " year").toBe(year);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {(typeof DESTS)[0]} d
 */
async function runDest(page, d) {
  const file = path.join(ROOT, "years", d.year, d.href);
  const html = fs.readFileSync(file, "utf8");
  const suffix = d.whenKey.replace(/^itt\d{2}-/, "");

  await openClear(page, d.year, d.href, d.whenKey);

  const star = STAR[d.whenKey];
  if (star) {
    await page.waitForTimeout(400);
    if (!star.seedOk) {
      expect(await getKey(page, d.whenKey), d.whenKey + " visit").toBeFalsy();
    }
    const before = await getKey(page, d.whenKey);
    await star.incomplete(page);
    if (star.seedOk) {
      const afterEmpty = await getKey(page, d.whenKey);
      if (d.whenKey === "itt05-yt-uploads") {
        const a = JSON.parse(afterEmpty || "[]");
        expect(a.some((x) => x && /residual/i.test(x.title || "")), d.whenKey + " empty title").toBeFalsy();
      } else {
        expect(afterEmpty, d.whenKey + " incomplete").toBe(before);
      }
    } else {
      expect(await getKey(page, d.whenKey), d.whenKey + " incomplete").toBeFalsy();
    }
    await star.complete(page);
    if (d.whenKey === "itt05-yt-uploads") {
      await expect.poll(async () => {
        const raw = await getKey(page, d.whenKey);
        const list = JSON.parse(raw || "[]");
        return Array.isArray(list) && list.some((x) => x && /residual/i.test(x.title || ""));
      }, { timeout: 8000 }).toBeTruthy();
    } else {
      await expect.poll(() => getKey(page, d.whenKey), { timeout: 10000 }).toBeTruthy();
    }
    return;
  }

  if (html.indexOf("data-year-game") !== -1) {
    await expect(page.locator("[data-year-game]")).toBeVisible();
    expect(await getKey(page, d.whenKey), d.whenKey + " visit never writes").toBeFalsy();
    return;
  }

  if (html.indexOf("data-lo-panel") !== -1 && html.indexOf('data-lo-key="' + suffix + '"') !== -1) {
    const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
    await lo.locator("[data-lo-save]").waitFor({ timeout: 20000 });
    await page.waitForFunction((suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    }, suffix, { timeout: 20000 });
    await page.evaluate((k) => localStorage.removeItem(k), d.whenKey);

    await lo.locator("[data-lo-trap]").first().click();
    expect(await getKey(page, d.whenKey), d.whenKey + " trap").toBeFalsy();
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, d.whenKey), d.whenKey + " 0 ticks").toBeFalsy();
    const reqs = lo.locator("[data-lo-req]");
    const nReq = await reqs.count();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
    const hasField0 = (await lo.locator("[data-lo-field]").count()) > 0;
    const hasPicks0 = (await lo.locator("[data-lo-pick]").count()) > 0;
    if (hasField0 || hasPicks0) {
      await lo.locator("[data-lo-save]").first().click();
      expect(await getKey(page, d.whenKey), d.whenKey + " ticks only").toBeFalsy();
    }

    const needPick = await lo.locator("[data-lo-save]").first().getAttribute("data-lo-need-pick");
    const minPick = parseInt((await lo.locator("[data-lo-save]").first().getAttribute("data-lo-min-pick")) || "0", 10);
    if (needPick) {
      await lo.locator(`[data-lo-pick="${needPick}"]`).click();
    } else if (minPick) {
      const picks = lo.locator("[data-lo-pick]");
      for (let i = 0; i < minPick; i++) await picks.nth(i).click();
    } else if ((await lo.locator("[data-lo-pick]").count()) > 0) {
      await lo.locator("[data-lo-pick]").first().click();
    }
    if ((await lo.locator("[data-lo-field]").count()) > 0) {
      await lo.locator("[data-lo-save]").first().click();
      expect(await getKey(page, d.whenKey), d.whenKey + " empty field").toBeFalsy();
      await lo.locator("[data-lo-field]").fill("museum leftover");
    }
    if ((await lo.locator("[data-lo-wait]").count()) > 0) {
      await lo.locator("[data-lo-save]").first().click();
      expect(await getKey(page, d.whenKey), d.whenKey + " skip wait").toBeFalsy();
      await lo.locator("[data-lo-wait]").first().click();
      await page.waitForTimeout(1000);
    }
    await lo.locator("[data-lo-save]").first().click();
    await expectReal(page, d.whenKey, d.year);
    return;
  }

  if (html.indexOf('data-storage-key="' + suffix + '"') !== -1) {
    const btn = page.locator(`[data-itt-real-save][data-storage-key="${suffix}"]`).first();
    await btn.waitFor({ timeout: 20000 });
    await page.waitForFunction(
      (suf) => {
        const b = document.querySelector('[data-itt-real-save][data-storage-key="' + suf + '"]');
        return !!(b && (b.getAttribute("data-itt-real-bound") === "1" || b.getAttribute("data-bound") === "1"));
      },
      suffix,
      { timeout: 20000 }
    ).catch(() => {});
    await page.evaluate((k) => localStorage.removeItem(k), d.whenKey);
    await btn.click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty").toBeFalsy();
    const root = page.locator("body");
    const reqs = root.locator("[data-req]");
    const nReq = await reqs.count();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
    const fieldSel = await btn.getAttribute("data-require-field");
    if (fieldSel) {
      await btn.click();
      expect(await getKey(page, d.whenKey), d.whenKey + " ticks only").toBeFalsy();
      await page.locator(fieldSel).fill("museum leftover");
    }
    await btn.click();
    await expectReal(page, d.whenKey, d.year);
    return;
  }

  if (html.indexOf('data-4x-go="' + suffix + '"') !== -1) {
    await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
    const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${suffix}"])`);
    const go = panel.locator("[data-4x-go]");
    await go.click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty 4x").toBeFalsy();
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
    await expectReal(page, d.whenKey, d.year);
    return;
  }

  if (html.indexOf("data-wiki-save") !== -1) {
    await page.locator("[data-wiki-preview]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " preview").toBeFalsy();
    await page.locator("[data-wiki-save]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty wiki").toBeFalsy();
    await page.locator("[data-wiki-body], textarea[name=text]").fill("This is the new WikiPedia leftover.");
    await page.locator("[data-wiki-save]").click();
    await expectReal(page, d.whenKey, d.year);
    return;
  }

  if (html.indexOf("data-su-stumble") !== -1) {
    await page.locator("[data-su-stumble]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty stumble").toBeFalsy();
    await page.locator("[data-su-topic]").selectOption({ index: 1 });
    await page.locator("[data-su-stumble]").click();
    await page.locator("[data-su-up]").click();
    await expectReal(page, d.whenKey, d.year);
    return;
  }

  if (html.indexOf("data-pb-upload") !== -1) {
    await page.locator("form[data-pb-upload] button[type=submit]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty pb").toBeFalsy();
    await page.locator("form[data-pb-upload] [name=file], #ott-field").first().fill("vacation.jpg");
    await page.locator("form[data-pb-upload] button[type=submit]").click();
    await expectReal(page, d.whenKey, d.year);
    return;
  }

  if (html.indexOf("data-itunes-buy") !== -1) {
    await page.locator("form[data-itunes-buy] button[type=submit]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty itunes").toBeFalsy();
    await page.locator("form[data-itunes-buy] [name=title]").fill("Let It Snow");
    const reqs = page.locator("form[data-itunes-buy] [data-itunes-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("form[data-itunes-buy] button[type=submit]").click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-wp-publish") !== -1) {
    await page.locator("form[data-wp-publish] button[type=submit]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty wp").toBeFalsy();
    await page.locator("form[data-wp-publish] [name=title]").fill("Hello leftover");
    await page.locator("form[data-wp-publish] [name=body], form[data-wp-publish] textarea").first().fill("First leftover post.");
    await page.locator("form[data-wp-publish] button[type=submit]").click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-li-invite") !== -1) {
    await page.waitForTimeout(400);
    const before = JSON.parse((await getKey(page, d.whenKey)) || "[]");
    const n0 = Array.isArray(before) ? before.length : 0;
    await page.locator("form[data-li-invite] button[type=submit]").click();
    const afterEmpty = JSON.parse((await getKey(page, d.whenKey)) || "[]");
    expect(Array.isArray(afterEmpty) ? afterEmpty.length : 0, d.whenKey + " empty li").toBe(n0);
    await page.locator("form[data-li-invite] [name=name]").fill("Reid leftover");
    await page.locator("form[data-li-invite] button[type=submit]").click();
    await expect.poll(async () => {
      const raw = await getKey(page, d.whenKey);
      const list = JSON.parse(raw || "[]");
      return Array.isArray(list) && list.some((x) => x && /Reid leftover/.test(x.name || ""));
    }, { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-ms-top8") !== -1) {
    await page.locator("[data-ms-top8-save]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty top8").toBeFalsy();
    const slots = page.locator("[data-ms-top8-slot]");
    const n = await slots.count();
    for (let i = 0; i < n; i++) await slots.nth(i).selectOption({ index: i + 1 });
    await page.locator("[data-ms-top8-save]").click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-friendster-add-form") !== -1) {
    await page.locator("form[data-friendster-add-form] button[type=submit]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty fs").toBeFalsy();
    await page.locator("form[data-friendster-add-form] [name=fname]").fill("Jonathan leftover");
    await page.locator("form[data-friendster-add-form] [name=fabout]").fill("circle leftover");
    await page.locator("form[data-friendster-add-form] button[type=submit]").click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-adsense-signup") !== -1) {
    await page.locator("form[data-adsense-signup] button[type=submit]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty adsense").toBeFalsy();
    await page.locator("form[data-adsense-signup] [name=site]").fill("leftover.example");
    await page.locator("form[data-adsense-signup] button[type=submit]").click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-bloglines-add") !== -1) {
    await page.locator("form[data-bloglines-add] button[type=submit]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty bloglines").toBeFalsy();
    await page.locator("form[data-bloglines-add] [name=url]").fill("http://leftover.example/feed");
    await page.locator("form[data-bloglines-add] button[type=submit]").click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-blogger-post") !== -1) {
    await page.locator("form[data-blogger-post] button[type=submit]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty blogger").toBeFalsy();
    await page.locator("form[data-blogger-post] [name=title]").fill("leftover post");
    await page.locator("form[data-blogger-post] [name=body]").fill("leftover body");
    await page.locator("form[data-blogger-post] button[type=submit]").click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-google-search") !== -1) {
    await page.locator("form[data-google-search] button[type=submit], form[data-google-search] input[type=submit]").first().click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty google").toBeFalsy();
    await page.locator("form[data-google-search] [name=q]").fill("leftover query");
    await page.locator("form[data-google-search] button[type=submit], form[data-google-search] input[name=btnG]").first().click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-gpt22-send") !== -1) {
    await page.locator("[data-gpt22-send]").click();
    expect(await getKey(page, d.whenKey), d.whenKey + " empty gpt").toBeFalsy();
    await page.locator("[data-gpt22-prompt]").fill("explain this leftover");
    await page.locator("[data-gpt22-send]").click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  if (html.indexOf("data-official-verb") !== -1) {
    const hops = page.locator("[data-att-hop]");
    const nHop = await hops.count();
    for (let i = 0; i < nHop; i++) await hops.nth(i).click();
    const save = page.locator("[data-official-verb], [data-official-save]").first();
    await save.waitFor({ timeout: 15000 });
    await save.click();
    expect(await getKey(page, d.whenKey), d.whenKey + " official empty").toBeFalsy();
    const reqs = page.locator("[data-official-req], [data-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    const field = page.locator("[data-official-need], [data-official-field], [data-lo-field]").first();
    if ((await field.count()) > 0) await field.fill("museum leftover");
    const pick = page.locator("[data-official-pick]").first();
    if ((await pick.count()) > 0) await pick.click();
    await save.click();
    await expect.poll(() => getKey(page, d.whenKey), { timeout: 8000 }).toBeTruthy();
    return;
  }

  throw new Error(d.year + " " + d.whenKey + " has no REAL writer on " + d.href);
}

test.describe("official 10 · every dest REAL", () => {
  test("every live official dest has a named whenKey and a file", () => {
    expect(DESTS.length, "official dests").toBeGreaterThanOrEqual(24 * 10);
    const empty = DESTS.filter((d) => !d.whenKey);
    expect(empty, "empty whenKeys").toEqual([]);
  });

  for (const d of DESTS) {
    test(`${d.year} n=${d.n} ${d.whenKey} incomplete never writes then save`, async ({ page }) => {
      await runDest(page, d);
    });
  }
});
