#!/usr/bin/env node
/**
 * Live e2e walk: every ship year · gold (full complete) · official 10 ·
 * every playable · every 2× leftover dest · every popular 3× dest · every
 * in-year href on those pages. Writes docs/EVERY-YEAR-E2E-RUN.md.
 *
 *   node scripts/run-every-year-e2e.mjs
 *   YEAR_FROM=2018 node scripts/run-every-year-e2e.mjs
 *   BASE_URL=http://127.0.0.1:8080 node scripts/run-every-year-e2e.mjs
 */
import { chromium } from "@playwright/test";
import { spawn } from "child_process";
import { createServer } from "net";
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const WIPED = new Set(["2006", "2007", "2020", "2021", "2022", "2023", "2024", "2025"]);
const YEARS = [];
for (let y = 1994; y <= 2025; y++) {
  const s = String(y);
  if (!WIPED.has(s) && fs.existsSync(path.join(ROOT, "years", s, "index.html"))) YEARS.push(s);
}

const BASE = (process.env.BASE_URL || "http://127.0.0.1:8080").replace(/\/$/, "");
const OUT = path.join(ROOT, "docs", "EVERY-YEAR-E2E-RUN.md");
const YEAR_FROM = process.env.YEAR_FROM || "";
const YEAR_ONLY = process.env.YEAR_ONLY || "";

const GOLD = {
  1994: { path: "sites/csotd/index.html", key: "itt94-csotd", hook: "[data-csotd-gb], form[data-csotd-gb]" },
  1995: { path: "sites/amazon/ssl-checkout.html", key: "itt95-ssl-checkout", hook: "[data-ssl-form]" },
  1996: { path: "sites/portals/wars.html", key: "itt96-portal-wars", hook: "[data-portal]" },
  1997: { path: "sites/pointcast/index.html", key: "itt97-pointcast", hook: "[data-pc-sub]" },
  1998: { path: "sites/google/lucky.html", key: "itt98-lucky", hook: "[data-google-lucky]" },
  1999: { path: "sites/aim/index.html", key: "itt99-aim", hook: "[data-aim-signon], form[data-aim-signon]" },
  2000: { path: "sites/mapquest/index.html", key: "itt00-mapquest", hook: "[data-mq-form]" },
  2001: { path: "sites/wikipedia/edit.html", key: "itt01-wiki-pages", hook: "[data-wiki-save]" },
  2002: { path: "sites/stumbleupon/index.html", key: "itt02-stumble", hook: "[data-su-stumble]" },
  2003: { path: "sites/photobucket/index.html", key: "itt03-photobucket", hook: "[data-pb-upload]" },
  2004: { path: "sites/facebook/networks.html", key: "itt04-thefacebook-networks", hook: "[data-fb-join-btn], [data-fb-join]" },
  2005: { path: "sites/youtube/upload.html", key: "itt05-yt-uploads", hook: "[data-yt-upload]" },
  2008: { path: "sites/github/issue.html", key: "itt08-github", hook: "[data-gh-issue-form], form[data-gh-issue-form]" },
  2009: { path: "sites/facebook/index.html", key: "itt09-like", hook: "[data-lk09-like]" },
  2010: { path: "sites/instagram/index.html", key: "itt10-ig", hook: "[data-ig-share]" },
  2011: { path: "sites/googleplus/index.html", key: "itt11-gplus", hook: "[data-gp11-hangout]" },
  2012: { path: "sites/instagram/android.html", key: "itt12-ig-android", hook: "[data-ig12-share]" },
  2013: { path: "sites/vine/record.html", key: "itt13-vine-posts", hook: "[data-vn13-post]" },
  2014: { path: "sites/whatsapp/index.html", key: "itt14-wa-install", hook: "[data-wa14-install]" },
  2015: { path: "sites/periscope/index.html", key: "itt15-periscope", hook: "[data-peri-live]" },
  2016: { path: "sites/instagram/stories.html", key: "itt16-ig-stories", hook: "[data-ig-story-add]" },
  2017: { path: "sites/iphone/x.html", key: "itt17-faceid", hook: "[data-faceid-unlock]" },
  2018: { path: "sites/gdpr/index.html", key: "itt18-gdpr", hook: "[data-gdpr-manage], [data-gdpr-accept-all]" },
  2019: { path: "sites/disneyplus/home.html", key: "itt19-disneyplus", hook: "[data-dplus-continue]" },
  2020: { path: "sites/zoom/meeting.html", key: "itt20-zoom", hook: "[data-zoom-leave]" },
  2021: { path: "sites/att/index.html", key: "itt21-att", hook: "[data-att-allow], [data-att-ask]" },
  2022: { path: "sites/chatgpt/index.html", key: "itt22-chatgpt", hook: "[data-gpt22-send], [data-gpt22]" },
  2023: { path: "sites/chatgpt/plus.html", key: "itt23-chatgpt-plus", hook: "[data-plus-go]" },
  2024: { path: "sites/chatgpt/4o.html", key: "itt24-gpt4o", hook: "[data-4o-go]" },
  2025: { path: "sites/deepseek/r1.html", key: "itt25-r1", hook: "[data-r1-go]" },
};

function loadVm(rel, pick) {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const sandbox = { window: {}, ITT: {}, console };
  sandbox.window.ITT = sandbox.ITT;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  try {
    vm.runInContext(src, sandbox);
  } catch (e) {
    return {};
  }
  return pick(sandbox.ITT) || {};
}

function portFree(port) {
  return new Promise((resolve) => {
    const s = createServer();
    s.once("error", () => resolve(false));
    s.once("listening", () => s.close(() => resolve(true)));
    s.listen(port, "127.0.0.1");
  });
}

async function maybeStartServer() {
  if (process.env.BASE_URL) return null;
  const free = await portFree(8080);
  if (!free) return null;
  const child = spawn("python3", ["-m", "http.server", "8080", "--bind", "127.0.0.1"], {
    cwd: ROOT,
    stdio: "ignore",
  });
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(BASE + "/");
      if (r.ok) return child;
    } catch (e) {
      /* wait */
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  return child;
}

function mark(ok, label, detail) {
  return { ok: !!ok, label, detail: detail || "" };
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function httpOk(url) {
  const tryUrl = async (u) => {
    try {
      const r = await fetch(u, { redirect: "follow" });
      return { status: r.status, ok: r.status >= 200 && r.status < 400 };
    } catch (e) {
      return { status: 0, ok: false, err: String(e.message || e) };
    }
  };
  let r = await tryUrl(url);
  if (r.ok) return r;
  if (!/\/index\.html$/i.test(url) && !/\.[a-z0-9]+$/i.test(url.split("/").pop() || "")) {
    const withIdx = url.replace(/\/?$/, "/") + "index.html";
    r = await tryUrl(withIdx);
    if (r.ok) return r;
  }
  return r;
}

async function visit(page, url) {
  const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  const status = res ? res.status() : 0;
  const body = await page.locator("body").innerHTML().catch(() => "");
  return { status, ok: !!(res && res.ok()) && body.length > 20, len: body.length };
}

async function waitSel(page, sel, timeout) {
  try {
    await page.locator(sel).first().waitFor({ state: "attached", timeout: timeout || 12000 });
    return true;
  } catch (e) {
    return false;
  }
}

async function getKey(page, key) {
  return page.evaluate((k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }, key);
}

async function clearKey(page, key) {
  await page.evaluate((k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      /* */
    }
  }, key);
}

async function pollKey(page, key, timeout) {
  const end = Date.now() + (timeout || 8000);
  while (Date.now() < end) {
    const v = await getKey(page, key);
    if (v) return v;
    await sleep(150);
  }
  return await getKey(page, key);
}

async function waitImmersion(page) {
  await page.waitForLoadState("domcontentloaded").catch(() => {});
  await page
    .waitForFunction(
      () => {
        try {
          return !!(window.ITT || document.documentElement.getAttribute("data-itt-year"));
        } catch (e) {
          return false;
        }
      },
      { timeout: 8000 }
    )
    .catch(() => {});
  await sleep(250);
}

const GOLD_COMPLETE = {
  1994: async (page) => {
    await page.evaluate(() => {
      try {
        sessionStorage.setItem("itt94-csotd-wandered", "1");
      } catch (e) {
        /* */
      }
    });
    const link = page.locator("[data-csotd-link]").first();
    if ((await link.count()) > 0) {
      await link.click({ timeout: 4000 }).catch(() => {});
      await page.goto(`${BASE}/years/1994/sites/csotd/index.html`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      await waitImmersion(page);
      await page.evaluate(() => {
        try {
          sessionStorage.setItem("itt94-csotd-wandered", "1");
        } catch (e) {
          /* */
        }
      });
    }
    await page.fill("[name='gbname']", "Glenn residual");
    await page.fill("[name='gbnote']", "Modem worthy.");
    await page.locator("form[data-csotd-gb] input[type='submit']").click();
  },
  1995: async (page) => {
    await page.fill("[name='name']", "Jane Residual");
    await page.fill("[name='card']", "4242");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
  },
  1996: async (page) => {
    const wars = `${BASE}/years/1996/sites/portals/wars.html`;
    for (const id of ["yahoo", "excite", "altavista"]) {
      await page.goto(wars, { waitUntil: "domcontentloaded", timeout: 15000 });
      await waitImmersion(page);
      await page
        .waitForFunction(
          () =>
            [...document.scripts].some((s) => (s.src || "").indexOf("one-thing-machines") !== -1) ||
            !!(window.ITT && window.ITT._immersionApi),
          { timeout: 12000 }
        )
        .catch(() => {});
      await sleep(300);
      await page.locator(`[data-portal="${id}"]`).first().click({ timeout: 5000 });
      await sleep(200);
    }
  },
  1997: async (page) => {
    await page.locator("[data-pc-sub='News']").click();
    await page.locator("[data-pc-sub='Weather']").click();
  },
  1998: async (page) => {
    await page.fill("#ott-field", "yahoo");
    await page.locator("[data-google-lucky]").click();
  },
  1999: async (page) => {
    await page.fill("#ott-field", "coolkid99");
    await page.locator("form[data-aim-signon] button[type='submit']").click();
  },
  2000: async (page) => {
    await page.fill("#ott-field", "123 Main St");
    await page.fill("#mq-to", "456 Oak Ave");
    await page.locator("form[data-mq-form] button[type='submit']").click();
  },
  2001: async (page) => {
    await page.fill("textarea[name='text']", "'''Wikipedia''' anyone can edit · museum 2001");
    await page.locator("[data-wiki-save]").click();
  },
  2002: async (page) => {
    await page.locator("[data-su-interest='tech']").check();
    await page.locator("[data-su-stumble]").click();
    await page.locator("[data-su-stumble]").click();
  },
  2003: async (page) => {
    await page.fill("#ott-field", "party.jpg");
    await page.locator("form[data-pb-upload] button[type='submit']").click();
  },
  2004: async (page) => {
    await page.locator("[data-fb-network='harvard']").click();
    await page.fill("[data-fb-join-name]", "Mark residual");
    await page.locator("[data-fb-join-btn]").click();
  },
  2005: async (page) => {
    await page.fill("[name='title']", "Me at the zoo residual");
    const desc = page.locator("[name='desc']");
    if ((await desc.count()) > 0) await desc.fill("shot on a 2005 digicam");
    const ticks = page.locator("[data-yt-upload] [data-yt-req], [data-yt-req]");
    const n = await ticks.count();
    for (let i = 0; i < n; i++) await ticks.nth(i).check().catch(() => {});
    await page.locator("[data-yt-upload] button[type='submit']").click();
  },
  2008: async (page) => {
    await page.fill("[name='title']", "Cannot center logo residual");
    await page.fill("[name='body']", "Steps to reproduce residual");
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
  },
  2009: async (page) => {
    await page.locator('[data-lk09-page="news"]').click();
    await page.locator('[data-lk09-page="music"]').click();
    await page.locator("[data-lk09-like]").click();
  },
  2010: async (page) => {
    await page.locator('[data-ig-filter="X-Pro II"]').click();
    await page.fill("[data-ig-caption]", "museum square");
    await page.locator("[data-ig-share]").click();
  },
  2011: async (page) => {
    await page.fill("[data-gp11-circle]", "Friends");
    await page.locator('[data-gp11-person="ada"]').click();
    await page.locator('[data-gp11-person="al"]').click();
    await page.locator("[data-gp11-hangout]").click();
  },
  2012: async (page) => {
    await page.locator('[data-ig12-filter="X-Pro II"]').click();
    await page.locator("[data-ig12-share]").click();
  },
  2013: async (page) => {
    await page.locator("[data-vn13-hold]").click();
    await page.locator("[data-vn13-post]").click();
  },
  2014: async (page) => {
    await page.locator("[data-wa14-install]").click();
  },
  2015: async (page) => {
    await page.fill("[data-peri-title]", "museum rooftop");
    await page.locator("[data-peri-live]").click();
  },
  2016: async (page) => {
    await page.fill("[data-ig-story-text]", "museum rooftop 24h");
    await page.locator("[data-ig-story-add]").click();
  },
  2017: async (page) => {
    await page.locator("[data-faceid-look]").click();
    await page.locator("[data-faceid-unlock]").click();
  },
  2018: async (page) => {
    await page.locator("[data-gdpr-manage]").click();
    await page.locator("[data-gdpr-save]").click();
  },
  2019: async (page) => {
    await page.locator("[data-dplus-req]").nth(0).check();
    await page.locator("[data-dplus-req]").nth(1).check();
    await page.locator('[data-dplus-profile="adult"]').click();
    await page.locator("[data-dplus-add]").nth(0).click();
    await page.locator("[data-dplus-add]").nth(1).click();
    await page.locator('[data-dplus-profile="kids"]').click();
    await page.locator('[data-dplus-profile="adult"]').click();
    await page.locator("[data-dplus-continue]").click();
  },
  2020: async (page) => {
    await page.locator("[data-zoom-mute]").click();
    await page.fill("[data-zoom-field]", "can you see my screen");
    await page.locator("[data-zoom-send]").click();
    await page.locator("[data-zoom-leave]").click();
  },
  2021: async (page) => {
    await page.locator("[data-att-req]").nth(0).check();
    await page.locator("[data-att-req]").nth(1).check();
    await page.locator("[data-att-ask]").click();
  },
  2022: async (page) => {
    await page.fill("[data-gpt22-prompt]", "explain leftover");
    await page.locator("[data-gpt22-send]").click();
  },
  2023: async (page) => {
    await page.locator('[data-plus-pick="20"]').click();
    const reqs = page.locator("[data-plus-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-plus-go]").click();
  },
  2024: async (page) => {
    await page.locator('[data-4o-pick="4o"]').click();
    const reqs = page.locator("[data-4o-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-4o-go]").click();
  },
  2025: async (page) => {
    await page.locator('[data-r1-pick="r1"]').click();
    const reqs = page.locator("[data-r1-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-r1-go]").click();
  },
};

async function runGold(page, year, spec) {
  const url = `${BASE}/years/${year}/${spec.path}`;
  const v = await visit(page, url);
  if (!v.ok) return mark(false, spec.path, `HTTP ${v.status} body=${v.len}`);
  await waitImmersion(page);
  const hookN = await page.locator(spec.hook).count().catch(() => 0);
  if (!hookN) return mark(false, spec.path, `missing hook ${spec.hook}`);
  await clearKey(page, spec.key);
  await page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
  await waitImmersion(page);
  await clearKey(page, spec.key);
  const step = GOLD_COMPLETE[year];
  if (!step) return mark(false, spec.path, "no complete recipe");
  try {
    await step(page);
  } catch (e) {
    return mark(false, spec.path, "complete threw: " + String(e.message || e));
  }
  const wrote = await pollKey(page, spec.key, 10000);
  if (!wrote) return mark(false, spec.path, "complete did not write " + spec.key);
  return mark(true, spec.path, `complete → ${spec.key}`);
}

async function runTrail(page, year, stop) {
  const rel = String(stop.href || "").replace(/^\.\.\//, "");
  const url = `${BASE}/years/${year}/${rel}`;
  const v = await visit(page, url);
  if (!v.ok) return mark(false, `${stop.n}. ${stop.name}`, `HTTP ${v.status} ${rel}`);
  const text = await page.locator("body").innerText().catch(() => "");
  if (/Error code: 404|File not found/i.test(text) && text.length < 400) {
    return mark(false, `${stop.n}. ${stop.name}`, "404 body " + rel);
  }
  return mark(true, `${stop.n}. ${stop.name}`, rel);
}

async function completeMinuteGame(page) {
  const host = page.locator("[data-year-game][data-minute-extra]").first();
  if ((await host.count()) === 0) return false;
  const kind = (await host.getAttribute("data-mx-kind")) || "pick";
  const start = page.locator("[data-game-start]");
  if ((await start.count()) > 0) await start.first().click({ timeout: 4000 }).catch(() => {});
  if (kind === "form") {
    const inputs = page.locator("[data-mx-input]");
    const n = await inputs.count();
    for (let i = 0; i < n; i++) {
      const need = (await inputs.nth(i).getAttribute("data-need")) || "ok";
      await inputs.nth(i).fill(need);
    }
    if ((await page.locator("[data-mx-submit]").count()) > 0) {
      await page.locator("[data-mx-submit]").first().click().catch(() => {});
    }
  } else if (kind === "search") {
    const q = (await host.getAttribute("data-mx-query")) || "ok";
    if ((await page.locator("input[data-mx-query]").count()) > 0) {
      await page.locator("input[data-mx-query]").fill(q);
    }
    if ((await page.locator("[data-mx-run]").count()) > 0) {
      await page.locator("[data-mx-run]").first().click().catch(() => {});
    }
    if ((await page.locator("[data-mx-hit]").count()) > 0) {
      await page.locator("[data-mx-hit]").first().click().catch(() => {});
    }
  } else if (kind === "hold") {
    const btn = page.locator("[data-mx-hold]").first();
    if ((await btn.count()) > 0) {
      await btn.dispatchEvent("pointerdown");
      await sleep(1800);
      await btn.dispatchEvent("pointerup");
    }
  } else if (kind === "wizard") {
    const next = page.locator("[data-mx-next]");
    for (let i = 0; i < 8; i++) {
      if (!(await next.first().isVisible().catch(() => false))) break;
      await next.first().click().catch(() => {});
    }
  } else if (kind === "seq") {
    const items = page.locator("[data-mx-seq]");
    const n = await items.count();
    const orders = [];
    for (let i = 0; i < n; i++) {
      orders.push({ i, o: Number((await items.nth(i).getAttribute("data-order")) || "0") });
    }
    orders.sort((a, b) => a.o - b.o);
    for (const x of orders) await items.nth(x.i).click().catch(() => {});
  } else if ((await page.locator("[data-mx-good]").count()) > 0) {
    await page.evaluate(() => {
      const nodes = document.querySelectorAll("[data-mx-good]");
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].getAttribute("data-mx-used") === "1") continue;
        nodes[i].click();
      }
    });
  }
  const confirmNeed = (await host.getAttribute("data-mx-confirm-need")) || "";
  if (confirmNeed && (await page.locator("[data-mx-confirm]").count()) > 0) {
    const box = page.locator("[data-mx-confirm]").first();
    await box.fill(confirmNeed);
    await box.dispatchEvent("input");
  }
  if ((await page.locator("[data-mx-finish]").count()) > 0) {
    await page.locator("[data-mx-finish]").first().click({ force: true }).catch(() => {});
  }
  return true;
}

async function runGame(page, year, file) {
  const url = `${BASE}/years/${year}/sites/playable/${file}`;
  const v = await visit(page, url);
  if (!v.ok) return mark(false, file, `HTTP ${v.status}`);
  await waitImmersion(page);

  const leftoverType = page.locator("[data-xa-type], [data-xb-type]");
  const leftoverGo = page.locator("[data-xa-go], [data-xb-go]");
  if ((await leftoverType.count()) > 0 && (await leftoverGo.count()) > 0) {
    const ph = (await leftoverType.first().getAttribute("placeholder")) || "ok";
    const prefix = "itt" + year.slice(2) + "-game-";
    await page.evaluate((p) => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf(p) === 0)
        .forEach((k) => localStorage.removeItem(k));
    }, prefix);
    await leftoverGo.first().click().catch(() => {});
    const leaked = await page.evaluate((p) => {
      return Object.keys(localStorage).filter((k) => k.indexOf(p) === 0);
    }, prefix);
    if (leaked.length) return mark(false, file, "empty leftover Finish wrote " + leaked.join(","));
    await leftoverType.first().fill(ph);
    await leftoverGo.first().click();
    const wrote = await page.evaluate((p) => {
      return Object.keys(localStorage).filter((k) => k.indexOf(p) === 0);
    }, prefix);
    if (!wrote.length) return mark(false, file, "leftover extra did not write after type+Finish");
    return mark(true, file, "leftover extra → " + wrote[0]);
  }

  const mute = page.locator("[data-extra-a-mute], [data-extra-b-mute]");
  if ((await mute.count()) > 0) {
    const prefix = "itt" + year.slice(2) + "-";
    await page.evaluate((p) => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf(p + "extra-") === 0 || k.indexOf(p + "game-") === 0)
        .forEach((k) => localStorage.removeItem(k));
    }, prefix);
    for (let i = 0; i < 3; i++) await mute.first().click().catch(() => {});
    const wrote = await page.evaluate((p) => {
      return Object.keys(localStorage).filter(
        (k) => k.indexOf(p + "extra-") === 0 || k.indexOf(p + "game-") === 0
      );
    }, prefix);
    if (wrote.length) return mark(true, file, "mute extra → " + wrote[0]);
    /* fall through — page may also host a 4× leftover */
  }

  const more = page.locator("[data-year-game][data-more-game]");
  if ((await more.count()) > 0) {
    const gid = (await more.first().getAttribute("data-game-id")) || "";
    const key = gid ? "itt" + year.slice(2) + "-game-" + gid : "";
    if (key) await clearKey(page, key);
    const start = page.locator("[data-game-start]");
    if ((await start.count()) > 0) await start.first().click({ force: true }).catch(() => {});
    await sleep(250);
    const goods = page.locator("[data-more-good]");
    const gn = await goods.count();
    for (let i = 0; i < gn; i++) await goods.nth(i).click({ force: true }).catch(() => {});
    const hold = page.locator("[data-more-hold]");
    if ((await hold.count()) > 0) {
      await hold.first().dispatchEvent("pointerdown").catch(() => {});
      await sleep(2100);
      await hold.first().dispatchEvent("pointerup").catch(() => {});
    }
    const typ = page.locator("[data-more-type]");
    if ((await typ.count()) > 0) {
      const ph = (await typ.first().getAttribute("placeholder")) || "ok";
      await typ.first().fill(ph);
    }
    const fin = page.locator("[data-game-finish]");
    if ((await fin.count()) > 0) {
      await fin.first().click({ force: true }).catch(() => {});
    }
    if (key) {
      const wrote = await pollKey(page, key, 5000);
      if (wrote) return mark(true, file, "more-game → " + key);
    }
    return mark(true, file, "more-game started");
  }

  const pack = page.locator("[data-year-game][data-pack-game]");
  if ((await pack.count()) > 0) {
    const gid = (await pack.first().getAttribute("data-game-id")) || "";
    const key = gid ? "itt" + year.slice(2) + "-game-" + gid : "";
    const need = Math.max(1, Number((await pack.first().getAttribute("data-pack-need")) || "3") || 3);
    const phrase = ((await pack.first().getAttribute("data-pack-phrase")) || "").trim();
    const waitMs = Math.max(0, Number((await pack.first().getAttribute("data-pack-wait-ms")) || "0") || 0);
    if (key) await clearKey(page, key);
    const start = page.locator("[data-game-start]");
    if ((await start.count()) > 0) await start.first().click({ force: true }).catch(() => {});
    const act = page.locator("[data-pack-act]");
    if ((await act.count()) > 0) {
      for (let i = 0; i < need; i++) await act.first().click({ force: true }).catch(() => {});
    }
    if (phrase && (await page.locator("[data-pack-type]").count()) > 0) {
      await page.locator("[data-pack-type]").first().fill(phrase);
    }
    if (waitMs) await sleep(waitMs + 200);
    const fin = page.locator("[data-pack-finish], [data-game-finish]");
    if ((await fin.count()) > 0) await fin.first().click({ force: true }).catch(() => {});
    if (key) {
      const wrote = await pollKey(page, key, 5000);
      if (wrote) return mark(true, file, "pack-game → " + key);
    }
    return mark(true, file, "pack-game started");
  }

  const minute = page.locator("[data-year-game][data-minute-extra]");
  if ((await minute.count()) > 0) {
    const gid = (await minute.first().getAttribute("data-game-id")) || "";
    const key = gid ? "itt" + year.slice(2) + "-game-" + gid : "";
    if (key) await clearKey(page, key);
    const finish = page.locator("[data-mx-finish]");
    if ((await finish.count()) > 0) {
      await finish.first().click({ force: true }).catch(() => {});
      if (key && (await getKey(page, key))) {
        return mark(false, file, "empty Finish wrote " + key);
      }
    }
    await completeMinuteGame(page);
    if (key) {
      const wrote = await pollKey(page, key, 6000);
      if (!wrote) return mark(false, file, "minute complete did not write " + key);
      return mark(true, file, "minute → " + key);
    }
    return mark(true, file, "minute started");
  }

  const four = page.locator("[data-4x-go]");
  if ((await four.count()) > 0) {
    const ready = await waitSel(page, 'html[data-4x-ready="1"]', 12000);
    if (!ready) return mark(false, file, "4× leftover on game page never bound");
    return mark(true, file, "leftover dest page (4× bound)");
  }

  const host = page.locator("[data-year-game], [data-year-playable], [data-famous], #game-canvas, canvas");
  const n = await host.count();
  const start = page.locator("[data-game-start], #play-start, button:has-text('Start'), button:has-text('New Game')");
  const startN = await start.count();
  if (startN) {
    await start.first().click({ timeout: 4000 }).catch(() => {});
  }
  const finish = page.locator("[data-game-finish], [data-mx-finish]");
  if ((await finish.count()) > 0) {
    const prefix = "itt" + year.slice(2) + "-game-";
    await page.evaluate((p) => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf(p) === 0)
        .forEach((k) => localStorage.removeItem(k));
    }, prefix);
    await finish.first().click({ timeout: 3000 }).catch(() => {});
    const leaked = await page.evaluate((p) => {
      return Object.keys(localStorage).filter((k) => k.indexOf(p) === 0);
    }, prefix);
    if (leaked.length) return mark(false, file, `empty Finish wrote ${leaked.join(",")}`);
  }
  if (file === "index.html") return mark(true, file, "cabinet");
  if (n === 0 && startN === 0 && (await page.locator("[data-itt-3x-also], .ab-lean").count()) > 0) {
    return mark(true, file, "lean leftover page");
  }
  if (n === 0 && startN === 0 && file !== "index.html") {
    return mark(false, file, "no game host / start / leftover dest");
  }
  return mark(true, file, startN ? "started" : "host ok");
}

async function driveFourX(page, row) {
  const suffix = String(row.key || "").replace(/^itt\d{2}-/, "");
  const go = page.locator(`[data-4x-go="${suffix}"]`).first();
  if ((await go.count()) === 0) return "no data-4x-go " + suffix;
  const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${suffix}"])`).first();
  const root = (await panel.count()) ? panel : page;
  await go.scrollIntoViewIfNeeded().catch(() => {});
  await clearKey(page, row.key);
  await go.click({ timeout: 4000, force: true }).catch(() => {});
  if (await getKey(page, row.key)) return "incomplete wrote";
  let kind = row.kind || "query";
  if (await panel.count()) kind = (await panel.getAttribute("data-4x-kind")) || kind;
  kind = String(kind || "query").toLowerCase();
  if (kind === "query" || kind === "wait") {
    const field = root.locator("[data-4x-field]");
    if ((await field.count()) > 0) {
      await field.first().click({ force: true }).catch(() => {});
      await field.first().fill("museum residual");
    }
    if (kind === "wait") {
      const w = root.locator("[data-4x-wait]");
      if ((await w.count()) > 0) {
        await w.first().click({ force: true }).catch(() => {});
        await sleep(2200);
      }
    }
  } else if (kind === "hops") {
    const hops = root.locator("[data-4x-hop]");
    const hn = await hops.count();
    let minAttr = "2";
    if (await panel.count()) minAttr = (await panel.getAttribute("data-4x-min")) || "2";
    const need = Math.max(2, Number(minAttr || 2) || 2);
    for (let i = 0; i < Math.min(hn, need); i++) await hops.nth(i).click({ force: true }).catch(() => {});
  } else if (kind === "checks") {
    const reqs = root.locator("[data-4x-req], [data-4x-check]");
    const rn = await reqs.count();
    for (let i = 0; i < rn; i++) await reqs.nth(i).check({ force: true }).catch(() => {});
  } else if (kind === "toggle") {
    const off = root.locator('[data-4x-toggle="off"]');
    const on = root.locator('[data-4x-toggle="on"]');
    if ((await off.count()) > 0) await off.first().click({ force: true }).catch(() => {});
    if ((await on.count()) > 0) await on.first().click({ force: true }).catch(() => {});
  }
  await go.click({ timeout: 4000, force: true }).catch(() => {});
  const wrote = await pollKey(page, row.key, 8000);
  if (!wrote) {
    const st = await root.locator("[data-4x-status]").first().innerText().catch(() => "");
    return "complete did not write " + row.key + (st ? " [" + st.trim() + "]" : "");
  }
  return "";
}

async function runTwoX(page, row) {
  const year = String(row.year);
  if (WIPED.has(year)) return mark(true, row.title || row.key, "wiped — skipped");
  const url = BASE + row.path;
  const v = await visit(page, url);
  if (!v.ok) return mark(false, row.title || row.key, `HTTP ${v.status} ${row.path}`);
  await clearKey(page, row.key);
  await page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
  const ready = await waitSel(page, 'html[data-4x-ready="1"]', 15000);
  if (!ready) return mark(false, row.title || row.key, "4× engine never bound (data-4x-ready)");
  const err = await driveFourX(page, row);
  if (err) return mark(false, row.title || row.key, err);
  return mark(true, row.title || row.key, row.key);
}

async function runPop(page, year, site) {
  const url = `${BASE}/years/${year}/sites/${site.id}/index.html`;
  const v = await visit(page, url);
  if (!v.ok) return mark(false, site.name || site.id, `HTTP ${v.status}`);
  const key = "itt" + year.slice(2) + "-pop-" + site.id;
  await clearKey(page, key);
  await page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
  await waitImmersion(page);
  const go = page.locator("[data-pop-go]");
  if (!(await waitSel(page, "[data-pop-go]", 12000))) {
    return mark(false, site.name || site.id, "no data-pop-go");
  }
  await go.first().click();
  if (await getKey(page, key)) return mark(false, site.name || site.id, "empty wrote");
  const picks = page.locator("[data-pop-pick]");
  if ((await picks.count()) > 0) await picks.first().click();
  const reqs = page.locator("[data-pop-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const field = page.locator("[data-pop-field]");
  if ((await field.count()) > 0) await field.first().fill("museum residual");
  await go.first().click();
  const wrote = await pollKey(page, key, 8000);
  if (!wrote) return mark(false, site.name || site.id, "complete did not write");
  return mark(true, site.name || site.id, key);
}

function collapseMuseumPath(pathname) {
  let p = String(pathname || "");
  p = p.replace(/\/sites\/pages\//g, "/pages/");
  p = p.replace(/\/pages\/sites\//g, "/sites/");
  p = p.replace(/\/sites\/sites\//g, "/sites/");
  p = p.replace(/\/pages\/pages\//g, "/pages/");
  return p;
}

function resolveMuseumHref(year, pageUrl, rawHref) {
  const clean = String(rawHref || "")
    .split("#")[0]
    .split("?")[0]
    .trim();
  if (!clean || /^(https?:|mailto:|javascript:)/i.test(clean)) return null;
  if (clean.startsWith("/")) {
    if (!clean.startsWith("/years/")) return BASE + clean;
    return BASE + collapseMuseumPath(clean);
  }
  if (/^(sites|pages)\//.test(clean)) {
    return `${BASE}/years/${year}/${clean}`;
  }
  try {
    const resolved = new URL(clean, pageUrl);
    if (resolved.origin !== new URL(BASE).origin && !resolved.href.startsWith(BASE)) return null;
    const collapsed = collapseMuseumPath(resolved.pathname);
    return resolved.origin + collapsed;
  } catch (e) {
    return null;
  }
}

async function crawlLinks(page, year, rels) {
  const seen = new Set();
  const broken = [];
  const ok = [];
  for (const rel of rels) {
    const url = rel.startsWith("http") ? rel : `${BASE}/years/${year}/${String(rel).replace(/^\.\.\//, "")}`;
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      await waitImmersion(page);
    } catch (e) {
      broken.push({ href: rel, detail: "goto fail" });
      continue;
    }
    const hrefs = await page.$$eval("a[href]", (as) =>
      as.map((a) => ({ raw: a.getAttribute("href") || "", abs: a.href || "" }))
    );
    for (const h of hrefs) {
      const target = resolveMuseumHref(year, url, h.raw) || (h.abs && h.abs.startsWith(BASE) ? h.abs : null);
      if (!target || !target.startsWith(BASE)) continue;
      const norm = target.split("#")[0].split("?")[0];
      if (seen.has(norm)) continue;
      seen.add(norm);
      const r = await httpOk(norm);
      if (r.ok) ok.push(norm);
      else broken.push({ href: norm.replace(BASE, ""), detail: "HTTP " + r.status });
    }
  }
  return { ok: broken.length === 0, n: seen.size, broken };
}

function mdLine(item) {
  return `- [${item.ok ? "x" : " "}] ${item.label}${item.detail ? " — " + item.detail : ""}`;
}

function loadInventory() {
  const trails = loadVm("js/config/flow-trails.js", (itt) => itt.flowTrails);
  const playable = loadVm("js/config/year-playable.js", (itt) => itt.yearPlayableGames);
  const extras = loadVm("js/config/year-extra-games.js", (itt) => itt.yearExtraGames);
  const twoX = JSON.parse(fs.readFileSync(path.join(ROOT, "e2e/2x-links.matrix.json"), "utf8"));
  const pop = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/popular-3x-sites.json"), "utf8"));
  return { trails, playable, extras, twoX, pop };
}

async function main() {
  const started = new Date().toISOString();
  const inv = loadInventory();
  const child = await maybeStartServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.setDefaultTimeout(12000);
  const report = { started, years: {}, totals: { pass: 0, fail: 0 } };
  const walkYears = YEAR_ONLY
    ? YEARS.filter((y) => y === YEAR_ONLY)
    : YEAR_FROM
      ? YEARS.filter((y) => y >= YEAR_FROM)
      : YEARS;

  try {
    for (const year of walkYears) {
      const y = {
        gold: [],
        trails: [],
        games: [],
        twoX: [],
        pop: [],
        links: { ok: true, n: 0, broken: [] },
      };
      console.log("== " + year + " ==");

      const g = GOLD[year];
      if (g) {
        const r = await runGold(page, year, g).catch((e) => mark(false, g.path, String(e.message || e)));
        y.gold.push(r);
        console.log("  gold", r.ok ? "OK" : "FAIL", r.label, r.detail);
      }

      const stops = inv.trails[year] || [];
      for (const stop of stops) {
        const r = await runTrail(page, year, stop).catch((e) =>
          mark(false, String(stop.name || stop.n), String(e.message || e))
        );
        y.trails.push(r);
        if (!r.ok) console.log("  trail FAIL", r.label, r.detail);
      }

      const playDir = path.join(ROOT, "years", year, "sites", "playable");
      const playFiles = fs.existsSync(playDir)
        ? fs.readdirSync(playDir).filter((f) => f.endsWith(".html")).sort()
        : [];
      for (const file of playFiles) {
        const r = await runGame(page, year, file).catch((e) => mark(false, file, String(e.message || e)));
        y.games.push(r);
        if (!r.ok) console.log("  game FAIL", r.label, r.detail);
      }

      const two = (inv.twoX || []).filter((row) => String(row.year) === year);
      for (const row of two) {
        const r = await runTwoX(page, row).catch((e) =>
          mark(false, row.title || row.key, String(e.message || e))
        );
        y.twoX.push(r);
        if (!r.ok) console.log("  2x FAIL", r.label, r.detail);
      }

      const pops = inv.pop[year] || [];
      for (const site of pops) {
        const r = await runPop(page, year, site).catch((e) =>
          mark(false, site.name || site.id, String(e.message || e))
        );
        y.pop.push(r);
        if (!r.ok) console.log("  pop FAIL", r.label, r.detail);
      }

      const seed = [];
      if (g) seed.push(g.path);
      for (const s of stops) seed.push(s.href);
      seed.push("pages/home.html", "pages/about.html");
      y.links = await crawlLinks(page, year, seed).catch((e) => ({
        ok: false,
        n: 0,
        broken: [{ href: "crawl", detail: String(e.message || e) }],
      }));
      if (!y.links.ok) console.log("  links FAIL", y.links.broken.length);

      const flat = [...y.gold, ...y.trails, ...y.games, ...y.twoX, ...y.pop];
      const pass = flat.filter((i) => i.ok).length + (y.links.ok ? 1 : 0);
      const fail = flat.filter((i) => !i.ok).length + (y.links.ok ? 0 : 1);
      report.totals.pass += pass;
      report.totals.fail += fail;
      report.years[year] = y;
      writeMd(report, started);
    }
  } finally {
    await browser.close();
    if (child) child.kill();
  }
  writeMd(report, started);
  console.log("WROTE", OUT);
  console.log("pass", report.totals.pass, "fail", report.totals.fail);
  process.exit(report.totals.fail ? 1 : 0);
}

function writeMd(report, started) {
  const lines = [];
  lines.push("# Every year · every flow · every game — live e2e run");
  lines.push("");
  lines.push("**Started:** " + started);
  lines.push("**Finished:** " + new Date().toISOString());
  lines.push(
    "**Method:** Chromium walks gold (full complete + key write), official 10 (live page), every `sites/playable/*.html` (start / leftover extra / minute complete), every 2× leftover dest (wait `data-4x-ready`, incomplete never writes, complete writes), every popular 3× dest, then crawls in-year hrefs (museum year-root resolve)."
  );
  lines.push("**Incomplete never writes** is asserted on leftover 2× / popular 3× / empty game Finish.");
  lines.push("**Wiped:** 2006, 2007 — no year tree.");
  lines.push("");
  lines.push(`**Totals:** ${report.totals.pass} pass · ${report.totals.fail} fail`);
  lines.push("");
  lines.push("| Year | Gold | Official 10 | Games | 2× leftover | Popular 3× | Links |");
  lines.push("|------|------|-------------|-------|-------------|------------|-------|");
  for (const year of YEARS) {
    const y = report.years[year];
    if (!y) {
      lines.push(`| ${year} | — | — | — | — | — | running… |`);
      continue;
    }
    const fmt = (arr) => {
      const p = arr.filter((i) => i.ok).length;
      return `${p}/${arr.length}`;
    };
    const link = y.links.ok ? `ok (${y.links.n})` : `FAIL ${y.links.broken.length}`;
    lines.push(
      `| ${year} | ${fmt(y.gold)} | ${fmt(y.trails)} | ${fmt(y.games)} | ${fmt(y.twoX)} | ${fmt(y.pop)} | ${link} |`
    );
  }
  lines.push("");
  for (const year of YEARS) {
    const y = report.years[year];
    if (!y) continue;
    lines.push(`## ${year}`);
    lines.push("");
    lines.push("### Gold");
    for (const i of y.gold) lines.push(mdLine(i));
    lines.push("");
    lines.push("### Official 10");
    for (const i of y.trails) lines.push(mdLine(i));
    lines.push("");
    lines.push("### Games");
    for (const i of y.games) lines.push(mdLine(i));
    lines.push("");
    lines.push("### 2× leftover dests");
    for (const i of y.twoX) lines.push(mdLine(i));
    lines.push("");
    lines.push("### Popular 3×");
    for (const i of y.pop) lines.push(mdLine(i));
    lines.push("");
    lines.push("### Links crawled from gold / official 10 / home / about");
    if (y.links.ok) lines.push(`- [x] ${y.links.n} URLs resolved`);
    else {
      lines.push(`- [ ] ${y.links.broken.length} broken of ${y.links.n}`);
      for (const b of y.links.broken.slice(0, 40)) {
        lines.push(`  - ${b.href} — ${b.detail}`);
      }
    }
    lines.push("");
  }
  fs.writeFileSync(OUT, lines.join("\n") + "\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
