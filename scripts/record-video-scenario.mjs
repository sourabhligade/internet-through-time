#!/usr/bin/env node
/**
 * Record one continuous visitor video through the museum's video years:
 *   2005 YouTube watch + upload REAL → 2013 Vine hold/post REAL
 *
 *   node scripts/record-video-scenario.mjs
 * Writes webm under test-results/video-scenario/
 */
import { chromium } from "@playwright/test";
import { spawn } from "child_process";
import { createServer } from "net";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = (process.env.BASE_URL || "http://127.0.0.1:8080").replace(/\/$/, "");
const OUT = path.join(ROOT, "test-results", "video-scenario");
fs.mkdirSync(OUT, { recursive: true });

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
      if (res.ok) return true;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 120));
  }
  return false;
}

async function maybeStartServer() {
  if (await waitHttp(BASE + "/", 300)) return null;
  const u = new URL(BASE);
  const port = Number(u.port || 80);
  if (!(await portFree(port))) throw new Error(`nothing on ${BASE} and port busy`);
  const child = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], {
    cwd: ROOT,
    stdio: "ignore",
  });
  if (!(await waitHttp(BASE + "/", 8000))) {
    child.kill();
    throw new Error("server not ready");
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
  if (await skip.isVisible().catch(() => false)) await skip.click().catch(() => {});
  await killOverlays(page);
  await page.waitForFunction(() => {
    const f = document.getElementById("content");
    try {
      return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerHTML.length > 20);
    } catch {
      return false;
    }
  }, null, { timeout: 20000 });
}

async function goInFrame(page, rel) {
  await killOverlays(page);
  await page.evaluate((src) => {
    try {
      if (window.ITT && window.ITT.activeBrowser && typeof window.ITT.activeBrowser.navigate === "function") {
        window.ITT.activeBrowser.navigate(src, { instant: true });
        return;
      }
    } catch {
      /* fall through */
    }
    const iframe = document.getElementById("content");
    if (iframe) iframe.src = src;
  }, rel);
  await page.waitForFunction(
    (n) => {
      try {
        const f = document.getElementById("content");
        const src = (f && f.getAttribute("src")) || "";
        const loc = f && f.contentDocument && f.contentDocument.location;
        const path = loc ? loc.pathname : src;
        return path.includes(n.split("?")[0]);
      } catch {
        return false;
      }
    },
    rel,
    { timeout: 15000 }
  );
}

function frame(page) {
  return page.frameLocator("#content");
}

const log = [];
function step(msg) {
  log.push(msg);
  console.log("  " + msg);
}

const server = await maybeStartServer();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: OUT, size: { width: 1280, height: 800 } },
});
const page = await context.newPage();
const result = { ok: true, keys: {}, notes: [] };

try {
  // 2005 YouTube — watch theater + REAL upload
  await enterYear(page, "2005");
  await goInFrame(page, "sites/youtube/watch.html");
  const f = frame(page);
  await f.locator("[data-yt-player]").waitFor({ timeout: 15000 });
  await f.locator("[data-yt-play]").click();
  await new Promise((r) => setTimeout(r, 600));
  const playerText = await f.locator("[data-yt-player]").innerText();
  step(`2005 watch play · player="${playerText.slice(0, 80)}"`);
  result.notes.push({ watchPlayer: playerText.slice(0, 120) });

  await goInFrame(page, "sites/youtube/upload.html");
  await page.evaluate(() => localStorage.removeItem("itt05-yt-uploads"));
  await f.locator('[name="title"]').fill("");
  await f.locator('[data-yt-upload] button[type="submit"]').click().catch(() => {});
  await new Promise((r) => setTimeout(r, 200));
  const empty = await page.evaluate(() => localStorage.getItem("itt05-yt-uploads"));
  step(`2005 upload empty · key=${empty ? "SET" : "null"}`);

  const title = "Scenario clip " + Date.now();
  await f.locator('[name="title"]').fill(title);
  await f.locator('[name="desc"]').fill("recorded visitor scenario");
  await f.locator('[data-yt-upload] button[type="submit"]').click();
  await f.locator("[data-yt-upload-status]").waitFor({ timeout: 10000 });
  const yt = await page.evaluate(() => localStorage.getItem("itt05-yt-uploads"));
  result.keys["itt05-yt-uploads"] = yt ? yt.slice(0, 200) : null;
  if (!yt || !yt.includes(title)) {
    result.ok = false;
    step("FAIL 2005 upload did not persist title");
  } else step("2005 upload REAL wrote itt05-yt-uploads");

  // 2013 Vine — hold 350ms then post
  await page.goto(`${BASE}/years/2013/sites/vine/record.html`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.removeItem("itt13-vine-posts"));
  await page.locator("[data-vine-hold]").waitFor({ timeout: 15000 });
  await page.locator("[data-vine-hold]").dispatchEvent("mousedown");
  await new Promise((r) => setTimeout(r, 400));
  await page.locator("[data-vine-hold]").dispatchEvent("mouseup");
  await page.locator("[data-vine-post]").click();
  const vine = await page.evaluate(() => localStorage.getItem("itt13-vine-posts"));
  result.keys["itt13-vine-posts"] = vine ? vine.slice(0, 200) : null;
  if (!vine) {
    result.ok = false;
    step("FAIL 2013 Vine did not write itt13-vine-posts");
  } else step("2013 Vine REAL wrote itt13-vine-posts");
} catch (e) {
  result.ok = false;
  result.error = String(e).slice(0, 400);
  step("ERROR " + result.error);
} finally {
  await context.close();
  await browser.close();
  if (server) server.kill();
}

const videos = fs.readdirSync(OUT).filter((n) => n.endsWith(".webm"));
result.videos = videos.map((n) => path.join("test-results/video-scenario", n));
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
console.log("==> video scenario OK");
