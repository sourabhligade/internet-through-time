#!/usr/bin/env node
/**
 * OSS visitor gate — one Chromium, no Playwright Test runner.
 *
 * Covers the overlapping “open hub + enter every year + REAL sample” work
 * that E2E_FAST used to pay for as 80+ isolated tests.
 *
 * Usage:
 *   BASE_URL=http://127.0.0.1:8080 node scripts/oss-visitor-gate.mjs
 *   node scripts/oss-visitor-gate.mjs          # starts ephemeral :8080 if needed
 */
import { chromium } from "@playwright/test";
import { spawn } from "child_process";
import { createServer } from "net";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const WIPED = new Set(["2023", "2024", "2025"]);
const YEARS = [];
for (let y = 1994; y <= 2025; y++) {
  if (WIPED.has(String(y))) continue;
  YEARS.push(String(y));
}
const BASE = (process.env.BASE_URL || "http://127.0.0.1:8080").replace(/\/$/, "");

const fails = [];
const timings = {};
const t0 = Date.now();

function fail(name, detail) {
  fails.push(`${name}: ${detail}`);
  console.log(`  FAIL  ${name}: ${detail}`);
}
function ok(name, extra = "") {
  console.log(`  OK    ${name}${extra ? " · " + extra : ""}`);
}

function portFree(port) {
  return new Promise((resolve) => {
    const s = createServer();
    s.once("error", () => resolve(false));
    s.once("listening", () => s.close(() => resolve(true)));
    s.listen(port, "127.0.0.1");
  });
}

async function waitHttp(url, ms = 8000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok || res.status === 200) return true;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  return false;
}

async function maybeStartServer() {
  const up = await waitHttp(BASE + "/", 400);
  if (up) return null;
  const u = new URL(BASE);
  if (u.hostname !== "127.0.0.1" && u.hostname !== "localhost") {
    throw new Error(`server not up at ${BASE} and host is not local`);
  }
  const port = Number(u.port || 80);
  if (!(await portFree(port))) {
    throw new Error(`nothing answering ${BASE} but port ${port} is taken`);
  }
  const child = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], {
    cwd: ROOT,
    stdio: "ignore",
  });
  if (!(await waitHttp(BASE + "/", 8000))) {
    child.kill();
    throw new Error("ephemeral http.server did not become ready");
  }
  return child;
}

async function killOverlays(page) {
  await page.evaluate(() => {
    const kill = (el) => {
      if (!el) return;
      el.classList.add("hidden");
      el.style.display = "none";
      el.style.pointerEvents = "none";
    };
    kill(document.getElementById("modal-backdrop"));
    kill(document.getElementById("connect-overlay"));
    document.querySelectorAll(".dialog").forEach((d) => d.classList.add("hidden"));
  });
}

async function enterYear(page, year) {
  await page.goto(`${BASE}/years/${year}/`, { waitUntil: "domcontentloaded", timeout: 20000 });
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) {
    await skip.click().catch(() => {});
  }
  for (let i = 0; i < 3; i++) {
    const alert = page.locator("#dlg-alert:not(.hidden)");
    if (await alert.isVisible().catch(() => false)) {
      await page.locator('#dlg-alert-ok, [data-close="dlg-alert"]').first().click().catch(() => {});
      await alert.waitFor({ state: "hidden", timeout: 1500 }).catch(() => {});
    } else break;
  }
  await killOverlays(page);
  await page.waitForFunction(
    () => {
      const f = document.getElementById("content");
      try {
        return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerHTML.length > 20);
      } catch {
        return false;
      }
    },
    null,
    { timeout: 20000 }
  );
}

async function iframeInfo(page) {
  return page.evaluate(() => {
    const f = document.getElementById("content");
    if (!f || !f.contentDocument) return { ok: false };
    const d = f.contentDocument;
    return {
      ok: true,
      title: d.title || "",
      href: d.location ? d.location.pathname : "",
      textLen: (d.body && d.body.innerText ? d.body.innerText.length : 0),
      links: d.querySelectorAll("a[href]").length,
    };
  });
}

const server = await maybeStartServer();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

try {
  // --- Hub ---
  {
    const s = Date.now();
    await page.goto(`${BASE}/index.html`, { waitUntil: "domcontentloaded", timeout: 20000 });
    const missing = [];
    for (const y of YEARS) {
      const n = await page.locator(`a.year-card.available[href*="years/${y}"]`).count();
      if (!n) missing.push(y);
    }
    if (missing.length) fail("hub-cards", `missing available cards: ${missing.join(",")}`);
    else ok("hub-cards", `${YEARS.length} playable years (2023–2025 boarded)`);
    const copy = await page.locator("body").innerText();
    if (!/29 years open/i.test(copy)) fail("hub-copy", "expected 29 years open");
    else ok("hub-copy");
    const era = await page.locator('a.era-jump-chip[href="#era-1994-1999"]').count();
    if (!era) fail("hub-era-chip", "missing 1994–1999 era jump");
    else ok("hub-era-chip");
    timings.hubMs = Date.now() - s;
  }

  // --- Every year shell ---
  {
    const s = Date.now();
    for (const year of YEARS) {
      const ys = Date.now();
      try {
        await enterYear(page, year);
        if (!page.url().includes(`/years/${year}/`)) {
          fail(`enter-${year}`, `url ${page.url()}`);
          continue;
        }
        const info = await iframeInfo(page);
        if (!info.ok || info.textLen < 40) {
          fail(`iframe-${year}`, JSON.stringify(info));
          continue;
        }
        ok(`enter-${year}`, `${Date.now() - ys}ms · ${info.links} links`);
      } catch (e) {
        fail(`enter-${year}`, String(e).slice(0, 240));
      }
    }
    timings.yearsMs = Date.now() - s;
  }

  // --- 1995 REAL thesis ---
  {
    const s = Date.now();
    await page.goto(`${BASE}/years/1995/pages/about.html`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForSelector("[data-itt-real-save]", { timeout: 15000 });
    const key = "itt95-thesis-ack";
    await page.evaluate((k) => localStorage.removeItem(k), key);
    await page.locator("[data-itt-real-save]").first().click();
    const after0 = await page.evaluate((k) => localStorage.getItem(k), key);
    const checks = page.locator("[data-req]");
    const n = await checks.count();
    if (n >= 1) await checks.nth(0).check().catch(() => checks.nth(0).click());
    await page.locator("[data-itt-real-save]").first().click();
    const after1 = await page.evaluate((k) => localStorage.getItem(k), key);
    if (n >= 2) await checks.nth(1).check().catch(() => checks.nth(1).click());
    await page.locator("[data-itt-real-save]").first().click();
    const after2 = await page.evaluate((k) => localStorage.getItem(k), key);
    if (after0 || after1) fail("real-1995-incomplete", `wrote early ${after0 || after1}`);
    else ok("real-1995-incomplete");
    let parsed = null;
    try {
      parsed = after2 ? JSON.parse(after2) : null;
    } catch {
      parsed = null;
    }
    if (!parsed || parsed.real !== true || parsed.multiStep !== true || parsed.year !== "1995") {
      fail("real-1995-complete", String(after2));
    } else ok("real-1995-complete");
    timings.real1995Ms = Date.now() - s;
  }

  // --- 2010 Instagram empty share is not REAL ---
  {
    const s = Date.now();
    await page.goto(`${BASE}/years/2010/sites/instagram/index.html`, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.evaluate(() => localStorage.removeItem("itt10-ig-posts"));
    const share = page.locator("[data-ig-share]").first();
    if (await share.isVisible().catch(() => false)) {
      await share.click();
      await new Promise((r) => setTimeout(r, 200));
    }
    const wrote = await page.evaluate(() => localStorage.getItem("itt10-ig-posts"));
    if (wrote) fail("real-2010-ig-incomplete", wrote.slice(0, 120));
    else ok("real-2010-ig-incomplete", "no itt10-ig-posts on empty share");
    timings.real2010Ms = Date.now() - s;
  }

  // --- OSS trail: SourceForge incomplete / complete ---
  {
    const s = Date.now();
    const key = "itt99-sourceforge";
    await page.goto(`${BASE}/years/1999/sites/sourceforge/project.html?p=gimp`, {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    await page.evaluate((k) => localStorage.removeItem(k), key);
    await page.reload({ waitUntil: "domcontentloaded" });
    const dl = page.locator("[data-sf-download]");
    if (await dl.isVisible().catch(() => false)) {
      await dl.click();
      await new Promise((r) => setTimeout(r, 150));
    }
    const early = await page.evaluate((k) => localStorage.getItem(k), key);
    if (early) fail("oss-sf-incomplete", early.slice(0, 120));
    else ok("oss-sf-incomplete");
    const hon = page.locator("[data-sf-not-github]");
    if (await hon.count()) await hon.check();
    if (await dl.isVisible().catch(() => false)) await dl.click();
    const raw = await page.evaluate((k) => localStorage.getItem(k), key);
    let parsed = null;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }
    if (!parsed || parsed.real !== true || parsed.project !== "gimp" || parsed.year !== "1999") {
      fail("oss-sf-complete", String(raw));
    } else ok("oss-sf-complete");
    timings.ossSfMs = Date.now() - s;
  }
} finally {
  await browser.close();
  if (server) server.kill();
}

timings.totalMs = Date.now() - t0;
console.log(
  JSON.stringify(
    {
      ok: fails.length === 0,
      years: YEARS.length,
      fails: fails.length,
      timings,
    },
    null,
    2
  )
);
if (fails.length) {
  console.error(`oss-visitor-gate: ${fails.length} fail(s)`);
  process.exit(1);
}
console.log("==> OSS visitor gate OK");
