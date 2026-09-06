// @ts-check
/**
 * 2014 every implemented flow — end to end, not mock.
 * Official 10 period verbs + leftover 2× every dest + leftover 4× every dest.
 * Trap / empty / 0 ticks never write. Complete writes REAL. Leftover never writes gold.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const STAR = "itt14-wa-install";
const MATRIX = JSON.parse(fs.readFileSync(path.join(__dirname, "leftover-official.matrix.json"), "utf8"));
const LO = MATRIX.dests.filter((d) => d.year === "2014");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    for (const k of ks) localStorage.removeItem(k);
  }, keys);
}

async function open(page, href, keys) {
  await page.goto("/years/2014/" + href);
  await clearKeys(page, keys);
  await page.reload();
}

const OFFICIAL = [
  {
    name: "n1 WhatsApp Install",
    href: "sites/whatsapp/index.html",
    key: STAR,
    incomplete: async (page) => {
      await page.locator("[data-wa14-messenger]").click();
      expect(await getKey(page, STAR)).toBeFalsy();
      await page.locator("[data-wa14-install]").click();
      expect(await getKey(page, STAR)).toBeFalsy();
      await page.locator('[data-wa14-deal="16b"]').click();
      await page.locator("[data-wa14-install]").click();
      expect(await getKey(page, STAR)).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator('[data-wa14-deal="16b"]').click();
      await page.locator('[data-wa14-deal="rsu"]').click();
      await page.locator("[data-wa14-install]").click();
    },
  },
  {
    name: "n2 WhatsApp chat",
    href: "sites/whatsapp/chat.html",
    key: "itt14-wa-chat",
    incomplete: async (page) => {
      await page.locator("[data-wa14-send]").click();
      expect(await getKey(page, "itt14-wa-chat")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-wa14-req]").nth(0).check();
      await page.locator("[data-wa14-req]").nth(1).check();
      await page.locator("[data-wa14-note]").fill("leftover note");
      await page.locator("[data-wa14-send]").click();
    },
  },
  {
    name: "n3 Heartbleed rotate",
    href: "sites/heartbleed/index.html",
    key: "itt14-heartbleed",
    incomplete: async (page) => {
      await page.locator("[data-hb14-exploit]").click();
      expect(await getKey(page, "itt14-heartbleed")).toBeFalsy();
      await page.locator("[data-hb14-rotate]").click();
      expect(await getKey(page, "itt14-heartbleed")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-hb14-req]").nth(0).check();
      await page.locator("[data-hb14-req]").nth(1).check();
      await page.locator("[data-hb14-rotate]").click();
    },
  },
  {
    name: "n4 Ice Bucket nominate",
    href: "sites/icebucket/index.html",
    key: "itt14-icebucket",
    incomplete: async (page) => {
      await page.locator("[data-ice14-dump]").click();
      expect(await getKey(page, "itt14-icebucket")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-ice14-req]").nth(0).check();
      await page.locator("[data-ice14-req]").nth(1).check();
      await page.locator("[data-ice14-name]").fill("nominate leftover");
      await page.locator("[data-ice14-dump]").click();
    },
  },
  {
    name: "n5 iPhone 6 leftover",
    href: "sites/iphone/index.html",
    key: "itt14-iphone6",
    incomplete: async (page) => {
      await page.locator("[data-ip14-watch]").click();
      expect(await getKey(page, "itt14-iphone6")).toBeFalsy();
      await page.locator("[data-ip14-faceid]").click();
      expect(await getKey(page, "itt14-iphone6")).toBeFalsy();
      await page.locator("[data-ip14-save]").click();
      expect(await getKey(page, "itt14-iphone6")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-ip14-req]").nth(0).check();
      await page.locator("[data-ip14-req]").nth(1).check();
      await page.locator('[data-ip14-size="6"]').click();
      await page.locator("[data-ip14-save]").click();
    },
  },
  {
    name: "n6 Apple Pay leftover",
    href: "sites/iphone/pay.html",
    key: "itt14-applepay",
    incomplete: async (page) => {
      await page.locator("[data-pay14-tap]").click();
      expect(await getKey(page, "itt14-applepay")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-pay14-req]").nth(0).check();
      await page.locator("[data-pay14-req]").nth(1).check();
      await page.locator("[data-pay14-tap]").click();
    },
  },
  {
    name: "n7 Material leftover",
    href: "sites/material/index.html",
    key: "itt14-material",
    incomplete: async (page) => {
      await page.locator("[data-mat14-save]").click();
      expect(await getKey(page, "itt14-material")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-mat14-req]").nth(0).check();
      await page.locator("[data-mat14-req]").nth(1).check();
      await page.locator("[data-mat14-save]").click();
    },
  },
  {
    name: "n8 Slack leftover",
    href: "sites/slack/index.html",
    key: "itt14-slack",
    incomplete: async (page) => {
      await page.locator("[data-sl14-join]").click();
      expect(await getKey(page, "itt14-slack")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator('[data-sl14-chan="general"]').click();
      await page.locator("[data-sl14-join]").click();
    },
  },
  {
    name: "n9 Twitch leftover",
    href: "sites/twitch/index.html",
    key: "itt14-twitch",
    incomplete: async (page) => {
      await page.locator("[data-tw14-google]").click();
      expect(await getKey(page, "itt14-twitch")).toBeFalsy();
      await page.locator("[data-tw14-save]").click();
      expect(await getKey(page, "itt14-twitch")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator("[data-tw14-req]").check();
      await page.locator("[data-tw14-note]").fill("stream leftover");
      await page.locator("[data-tw14-save]").click();
    },
  },
  {
    name: "n10 Tile Fold",
    href: "sites/playable/game.html",
    key: "itt14-game-tilefold",
    incomplete: async (page) => {
      await page.locator("[data-tile-trap]").click();
      expect(await getKey(page, "itt14-game-tilefold")).toBeFalsy();
      await page.locator('[data-tile-fold="a"]').click();
      expect(await getKey(page, "itt14-game-tilefold")).toBeFalsy();
    },
    complete: async (page) => {
      await page.locator('[data-tile-fold="a"]').click();
      await page.locator('[data-tile-fold="b"]').click();
    },
  },
];

test.describe("2014 official 10 end-to-end REAL", () => {
  for (const flow of OFFICIAL) {
    test(flow.name + " incomplete never writes then complete REAL", async ({ page }) => {
      await open(page, flow.href, [flow.key, STAR]);
      await flow.incomplete(page);
      expect(await getKey(page, flow.key), flow.key + " incomplete").toBeFalsy();
      if (flow.key !== STAR) expect(await getKey(page, STAR), flow.name + " must not write star").toBeFalsy();
      await flow.complete(page);
      await expect.poll(() => getKey(page, flow.key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, flow.key)) || "{}");
      expect(blob.real, flow.key + " real").toBe(true);
      expect(String(blob.year), flow.key + " year").toBe("2014");
      if (flow.key !== STAR) expect(await getKey(page, STAR), flow.name + " leftover/official must not write star").toBeFalsy();
    });
  }
});

test.describe("2014 leftover 2× every dest end-to-end REAL", () => {
  test("matrix covers every dest leftover key on disk", () => {
    const have = new Set(LO.map((d) => d.href + "\t" + d.suffix));
    const missing = [];
    const destRoot = path.join(ROOT, "years", "2014", "sites");
    function walk(dir) {
      for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) {
          walk(full);
          continue;
        }
        if (!name.endsWith(".html")) continue;
        const html = fs.readFileSync(full, "utf8");
        const href = path.relative(path.join(ROOT, "years", "2014"), full).replace(/\\/g, "/");
        const re = /data-lo-key="([^"]+)"/g;
        let m;
        while ((m = re.exec(html))) {
          if (!have.has(href + "\t" + m[1])) missing.push(href + " " + m[1]);
        }
      }
    }
    walk(destRoot);
    expect(missing).toEqual([]);
    expect(LO.length).toBeGreaterThanOrEqual(32);
  });

  for (const d of LO) {
    test(`${d.suffix} ${d.href} leftover 2× trap then REAL`, async ({ page }) => {
      const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${d.suffix}"])`).first();
      await page.goto("/years/2014/" + d.href);
      await page.waitForFunction((s) => {
        const b = document.querySelector('[data-lo-save][data-lo-key="' + s + '"]');
        return !!(b && b.getAttribute("data-lo-bound") === "1");
      }, d.suffix, { timeout: 20000 });
      await page.evaluate((k) => localStorage.removeItem(k), d.key);
      await page.evaluate((k) => localStorage.removeItem(k), STAR);

      await lo.locator("[data-lo-trap]").first().click();
      expect(await getKey(page, d.key), d.key + " trap").toBeFalsy();
      await lo.locator("[data-lo-save]").first().click();
      expect(await getKey(page, d.key), d.key + " 0 ticks").toBeFalsy();

      const reqs = lo.locator("[data-lo-req]");
      const nReq = await reqs.count();
      for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
      await lo.locator("[data-lo-save]").first().click();
      expect(await getKey(page, d.key), d.key + " ticks only").toBeFalsy();

      if (d.needPick) {
        await lo.locator(`[data-lo-pick="${d.needPick}"]`).click();
      } else if (d.minPick) {
        const picks = lo.locator("[data-lo-pick]");
        for (let i = 0; i < d.minPick; i++) await picks.nth(i).click();
      }

      if (d.field) {
        await lo.locator("[data-lo-save]").first().click();
        expect(await getKey(page, d.key), d.key + " empty field").toBeFalsy();
        await lo.locator("[data-lo-field]").fill("museum leftover");
      }

      if ((await lo.locator("[data-lo-wait]").count()) > 0) {
        await lo.locator("[data-lo-save]").first().click();
        expect(await getKey(page, d.key), d.key + " skip wait").toBeFalsy();
        await lo.locator("[data-lo-wait]").first().click();
        await page.waitForTimeout(1100);
      }

      await lo.locator("[data-lo-save]").first().click();
      await expect.poll(() => getKey(page, d.key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, d.key)) || "{}");
      expect(blob.real, d.key + " real").toBe(true);
      expect(blob.leftover, d.key + " leftover").toBe(true);
      expect(String(blob.year), d.key + " year").toBe("2014");
      expect(blob.multiStep, d.key + " multi").toBe(true);
      expect(await getKey(page, STAR), d.key + " must not write star").toBeFalsy();
    });
  }
});

function destHtmlFiles() {
  const out = [];
  const destRoot = path.join(ROOT, "years", "2014", "sites");
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!name.endsWith(".html")) continue;
      const html = fs.readFileSync(full, "utf8");
      const m = html.match(/data-4x-go="([^"]+)"/);
      if (!m) continue;
      out.push({
        href: path.relative(path.join(ROOT, "years", "2014"), full).replace(/\\/g, "/"),
        go: m[1],
        key: "itt14-" + m[1],
      });
    }
  }
  walk(destRoot);
  return out;
}

const FOURX = destHtmlFiles();

test.describe("2014 leftover 4× every dest end-to-end REAL", () => {
  test("every dest file has leftover 4×", () => {
    expect(FOURX.length).toBe(32);
  });

  for (const d of FOURX) {
    test(`${d.go} ${d.href} leftover 4× empty then REAL`, async ({ page }) => {
      await page.goto("/years/2014/" + d.href);
      await page.evaluate(({ k, s }) => {
        localStorage.removeItem(k);
        localStorage.removeItem(s);
      }, { k: d.key, s: STAR });
      await page.reload();
      const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${d.go}"])`).first();
      const go = panel.locator(`[data-4x-go="${d.go}"]`).first();
      await go.waitFor({ timeout: 20000 });
      await page.waitForFunction(() => {
        return !!(window.ITT && document.querySelector("[data-4x-go]"));
      }, null, { timeout: 20000 });
      await go.click();
      expect(await getKey(page, d.key), d.key + " empty go").toBeFalsy();

      const hops = panel.locator("[data-4x-hop]");
      if ((await hops.count()) >= 2) {
        await hops.nth(0).click();
        await hops.nth(1).click();
      }
      const field = panel.locator("[data-4x-field]");
      if ((await field.count()) > 0) await field.first().fill("museum leftover");
      const reqs = panel.locator("[data-4x-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      const wait = panel.locator("[data-4x-wait]");
      if ((await wait.count()) > 0) {
        await wait.first().click();
        await page.waitForTimeout(2200);
      }
      await go.click();
      await expect.poll(() => getKey(page, d.key), { timeout: 8000 }).toBeTruthy();
      const blob = JSON.parse((await getKey(page, d.key)) || "{}");
      expect(blob.real, d.key + " real").toBe(true);
      expect(String(blob.year), d.key + " year").toBe("2014");
      expect(await getKey(page, STAR), d.go + " leftover 4× must not write star").toBeFalsy();
    });
  }
});

test("2014 About thesis literacy writes thesis-ack only", async ({ page }) => {
  await page.goto("/years/2014/pages/about.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt14-thesis-ack");
    localStorage.removeItem("itt14-wa-install");
  });
  await page.reload();
  await page.locator("[data-itt-real-save]").click();
  expect(await getKey(page, "itt14-thesis-ack")).toBeFalsy();
  await page.locator("[data-thesis-req]").nth(0).check();
  await page.locator("[data-thesis-req]").nth(1).check();
  await page.locator("[data-itt-real-save]").click();
  await expect.poll(() => getKey(page, "itt14-thesis-ack"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, STAR)).toBeFalsy();
});
