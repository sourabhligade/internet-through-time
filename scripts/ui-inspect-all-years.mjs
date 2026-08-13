/**
 * Detailed UI inspection across all shipped years.
 * Usage:
 *   node scripts/ui-inspect-all-years.mjs
 *   BASE_URL=http://127.0.0.1:8765 node scripts/ui-inspect-all-years.mjs
 *
 * Checks (per year):
 *  - shell boot + content iframe
 *  - horizontal overflow (shell + home immersion page)
 *  - nav strip presence / overflow / huge height
 *  - wayfind bar
 *  - starting-point home
 *  - about page (if present)
 *  - console errors
 *  - broken image src 404s (sample)
 */
import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { spawn } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = process.env.BASE_URL || "http://127.0.0.1:8877";
const VIEWPORT = { width: 1024, height: 720 };
const NARROW = { width: 720, height: 560 };
const OUT_JSON = path.join(ROOT, "docs/UI-INSPECT-ALL-YEARS.json");
const OUT_MD = path.join(ROOT, "docs/UI-INSPECT-ALL-YEARS.md");

function shippedYears() {
  const yearsDir = path.join(ROOT, "years");
  return fs
    .readdirSync(yearsDir)
    .filter((n) => /^\d{4}$/.test(n))
    .filter((n) => fs.existsSync(path.join(yearsDir, n, "index.html")))
    .sort();
}

function severityRank(s) {
  return { critical: 0, high: 1, medium: 2, low: 3, info: 4 }[s] ?? 9;
}

async function measureOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const clientW = doc.clientWidth || window.innerWidth;
    const scrollW = Math.max(body?.scrollWidth || 0, doc.scrollWidth || 0);
    const culprits = [];
    if (scrollW > clientW + 2) {
      const all = document.querySelectorAll("body *");
      for (let i = 0; i < all.length && culprits.length < 12; i++) {
        const el = all[i];
        try {
          if (el.scrollWidth > clientW + 2) {
            culprits.push({
              tag: el.tagName,
              id: el.id || "",
              cls: String(el.className || "").slice(0, 60),
              sw: el.scrollWidth,
            });
          }
        } catch (e) {
          /* */
        }
      }
    }
    return {
      clientW,
      scrollW,
      overflow: scrollW > clientW + 2,
      overflowPx: Math.max(0, scrollW - clientW),
      culprits,
    };
  });
}

async function inspectImmersionPage(page, url, label) {
  const issues = [];
  const consoleErrors = [];
  const onConsole = (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 200));
  };
  const onPageError = (err) => consoleErrors.push(String(err.message || err).slice(0, 200));
  page.on("console", onConsole);
  page.on("pageerror", onPageError);

  let status = 0;
  try {
    const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
    status = resp ? resp.status() : 0;
  } catch (e) {
    issues.push({
      severity: "critical",
      check: "load",
      page: label,
      msg: `Failed to load: ${e.message}`,
    });
    page.off("console", onConsole);
    page.off("pageerror", onPageError);
    return { issues, consoleErrors, status, metrics: {} };
  }

  if (status >= 400) {
    issues.push({
      severity: "critical",
      check: "http",
      page: label,
      msg: `HTTP ${status}`,
    });
  }

  await page.waitForTimeout(900);

  const metrics = await page.evaluate(() => {
    const nav = document.getElementById("itt-exhibit-nav");
    const slot = document.getElementById("itt-nav-slot");
    const way = document.getElementById("itt-wayfind");
    const foot = document.getElementById("itt-exhibit-foot");
    const tour = document.querySelector("[data-itt-tour]");
    const night = document.getElementById("itt-first-night-bar");
    const year =
      document.documentElement.getAttribute("data-itt-year") ||
      document.body?.getAttribute("data-itt-year") ||
      "";
    return {
      yearAttr: year,
      hasNav: !!nav,
      navHeight: nav ? Math.round(nav.getBoundingClientRect().height) : 0,
      navLinks: nav ? nav.querySelectorAll("a.itt-nav, a").length : 0,
      hasSlot: !!slot,
      hasWayfind: !!way,
      hasFoot: !!foot,
      hasTour: !!tour,
      hasNightBar: !!night,
      title: document.title || "",
      bodyTextLen: (document.body?.innerText || "").length,
    };
  });

  const overflow = await measureOverflow(page);
  metrics.overflow = overflow;

  if (overflow.overflow) {
    issues.push({
      severity: overflow.overflowPx > 40 ? "high" : "medium",
      check: "overflow-x",
      page: label,
      msg: `Horizontal overflow +${overflow.overflowPx}px (scroll ${overflow.scrollW} > client ${overflow.clientW})`,
      culprits: overflow.culprits.slice(0, 6),
    });
  }

  if (metrics.navHeight > 90) {
    issues.push({
      severity: "medium",
      check: "nav-height",
      page: label,
      msg: `Nav strip very tall (${metrics.navHeight}px) — likely wrapping/overflow`,
    });
  }

  if (metrics.navLinks > 14) {
    issues.push({
      severity: "low",
      check: "nav-density",
      page: label,
      msg: `Many nav links (${metrics.navLinks}) — risk of wrap/overflow`,
    });
  }

  if (metrics.bodyTextLen < 80 && label.includes("home")) {
    issues.push({
      severity: "high",
      check: "empty-content",
      page: label,
      msg: `Very little body text (${metrics.bodyTextLen} chars)`,
    });
  }

  // Sample broken images (src that failed)
  const brokenImgs = await page.evaluate(async () => {
    const imgs = [...document.images].slice(0, 40);
    const bad = [];
    for (const img of imgs) {
      if (!img.complete || img.naturalWidth === 0) {
        if (img.src && !img.src.startsWith("data:")) {
          bad.push(img.getAttribute("src") || img.src);
        }
      }
    }
    return bad.slice(0, 8);
  });
  if (brokenImgs.length) {
    issues.push({
      severity: "medium",
      check: "broken-images",
      page: label,
      msg: `${brokenImgs.length}+ broken/empty images`,
      samples: brokenImgs,
    });
  }

  // Unique console errors
  const uniqErr = [...new Set(consoleErrors)].slice(0, 5);
  if (uniqErr.length) {
    issues.push({
      severity: "medium",
      check: "console",
      page: label,
      msg: `${uniqErr.length} console error(s)`,
      samples: uniqErr,
    });
  }

  page.off("console", onConsole);
  page.off("pageerror", onPageError);
  return { issues, consoleErrors: uniqErr, status, metrics };
}

async function inspectYearShell(page, year) {
  const issues = [];
  const url = `${BASE}/years/${year}/`;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
  } catch (e) {
    return {
      year,
      issues: [
        {
          severity: "critical",
          check: "shell-load",
          page: "shell",
          msg: e.message,
        },
      ],
      pages: {},
    };
  }

  // Skip connect if present
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) {
    await skip.click().catch(() => {});
  }
  // Kill overlays
  await page
    .evaluate(() => {
      ["connect-overlay", "modal-backdrop"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.add("hidden");
          el.style.display = "none";
        }
      });
    })
    .catch(() => {});

  await page.waitForTimeout(600);

  // Iframe content
  let iframeOk = false;
  let iframePath = "";
  try {
    await page.waitForFunction(
      () => {
        const f = document.getElementById("content");
        try {
          return !!(
            f &&
            f.contentDocument &&
            f.contentDocument.body &&
            f.contentDocument.body.innerHTML.length > 20
          );
        } catch (e) {
          return false;
        }
      },
      null,
      { timeout: 15000 }
    );
    iframeOk = true;
    iframePath = await page.evaluate(() => {
      const f = document.getElementById("content");
      return (f && (f.getAttribute("src") || f.contentWindow?.location?.pathname)) || "";
    });
  } catch (e) {
    issues.push({
      severity: "critical",
      check: "iframe",
      page: "shell",
      msg: "Content iframe did not become live",
    });
  }

  const shellOverflow = await measureOverflow(page);
  if (shellOverflow.overflow) {
    issues.push({
      severity: shellOverflow.overflowPx > 40 ? "high" : "medium",
      check: "shell-overflow-x",
      page: "shell",
      msg: `Shell horizontal overflow +${shellOverflow.overflowPx}px`,
      culprits: shellOverflow.culprits.slice(0, 5),
    });
  }

  // Shell chrome pieces
  const chrome = await page.evaluate(() => {
    return {
      hasContent: !!document.getElementById("content"),
      hasLocation: !!document.getElementById("location"),
      hasTitle: !!document.getElementById("window-title"),
      bodyYear: document.body?.getAttribute("data-itt-year") || "",
      bodyClass: document.body?.className || "",
    };
  });
  if (!chrome.hasContent) {
    issues.push({
      severity: "critical",
      check: "chrome",
      page: "shell",
      msg: "Missing #content iframe",
    });
  }

  // Narrow viewport shell
  await page.setViewportSize(NARROW);
  await page.waitForTimeout(200);
  const narrowShell = await measureOverflow(page);
  if (narrowShell.overflow && narrowShell.overflowPx > 24) {
    issues.push({
      severity: "medium",
      check: "shell-narrow-overflow",
      page: "shell@720",
      msg: `Narrow shell overflow +${narrowShell.overflowPx}px`,
    });
  }
  await page.setViewportSize(VIEWPORT);

  return {
    year,
    iframeOk,
    iframePath,
    chrome,
    issues,
  };
}

async function main() {
  const years = shippedYears();
  console.log(`UI inspect ${years.length} years @ ${BASE}`);

  // Start static server if needed
  let serverProc = null;
  if (!process.env.BASE_URL) {
    serverProc = spawn("python3", ["-m", "http.server", "8877", "--bind", "127.0.0.1"], {
      cwd: ROOT,
      stdio: "ignore",
    });
    await new Promise((r) => setTimeout(r, 500));
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  const report = {
    date: new Date().toISOString(),
    base: BASE,
    viewport: VIEWPORT,
    years: {},
    summary: { years: years.length, critical: 0, high: 0, medium: 0, low: 0, info: 0, clean: 0 },
  };

  for (const year of years) {
    process.stdout.write(`  ${year}… `);
    const yearReport = {
      shell: null,
      pages: {},
      issues: [],
    };

    // Shell
    const shell = await inspectYearShell(page, year);
    yearReport.shell = shell;
    yearReport.issues.push(...shell.issues);

    // Direct immersion pages (bypass shell — matches how nav overflow appears)
    const candidates = [
      { path: `years/${year}/pages/home.html`, label: "home" },
      { path: `years/${year}/pages/about.html`, label: "about" },
      { path: `years/${year}/pages/map.html`, label: "map" },
    ];

    // Year-specific signature pages (common overflow targets)
    const sig = {
      1998: ["sites/google/index.html"],
      2005: ["sites/youtube/index.html"],
      2007: ["sites/iphone/index.html"],
      2010: ["sites/instagram/index.html"],
      2013: ["sites/vine/index.html"],
      2014: ["sites/whatsapp/index.html"],
      2015: ["sites/apple/watch.html"],
      2016: ["sites/instagram/stories.html"],
      2017: ["sites/iphone/x.html", "sites/netflix/modern.html", "sites/fortnite/index.html"],
    };
    (sig[year] || []).forEach((p) => {
      candidates.push({ path: `years/${year}/${p}`, label: p });
    });

    for (const c of candidates) {
      const full = path.join(ROOT, c.path);
      if (!fs.existsSync(full)) continue;
      await page.setViewportSize(NARROW);
      const r = await inspectImmersionPage(page, `${BASE}/${c.path}`, c.label);
      yearReport.pages[c.label] = {
        status: r.status,
        metrics: r.metrics,
        issueCount: r.issues.length,
      };
      yearReport.issues.push(...r.issues);
      await page.setViewportSize(VIEWPORT);
    }

    // Deduplicate issues by check+page+msg
    const seen = new Set();
    yearReport.issues = yearReport.issues.filter((iss) => {
      const k = `${iss.check}|${iss.page}|${iss.msg}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    yearReport.issues.sort((a, b) => severityRank(a.severity) - severityRank(b.severity));

    for (const iss of yearReport.issues) {
      if (report.summary[iss.severity] != null) report.summary[iss.severity]++;
    }
    if (yearReport.issues.length === 0) report.summary.clean++;

    report.years[year] = yearReport;
    const hi = yearReport.issues.filter((i) => i.severity === "critical" || i.severity === "high")
      .length;
    console.log(
      yearReport.issues.length === 0
        ? "clean"
        : `${yearReport.issues.length} issue(s) (${hi} high/crit)`
    );
  }

  await browser.close();
  if (serverProc) serverProc.kill();

  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2));

  // Markdown report
  let md = `# UI inspection — all years\n\n`;
  md += `**Date:** ${report.date.slice(0, 10)}  \n`;
  md += `**Viewport:** ${VIEWPORT.width}×${VIEWPORT.height} (immersion pages also @ ${NARROW.width}×${NARROW.height})  \n`;
  md += `**Years:** ${report.summary.years}  \n\n`;
  md += `## Summary\n\n`;
  md += `| Severity | Count |\n|----------|------:|\n`;
  md += `| critical | ${report.summary.critical} |\n`;
  md += `| high | ${report.summary.high} |\n`;
  md += `| medium | ${report.summary.medium} |\n`;
  md += `| low | ${report.summary.low} |\n`;
  md += `| clean years | ${report.summary.clean} |\n\n`;

  md += `## By year\n\n`;
  for (const year of years) {
    const y = report.years[year];
    const crit = y.issues.filter((i) => i.severity === "critical" || i.severity === "high");
    md += `### ${year} ${y.issues.length === 0 ? "· clean" : `· ${y.issues.length} issue(s)`}\n\n`;
    if (y.shell && !y.shell.iframeOk) md += `- Shell iframe **failed**\n`;
    if (y.issues.length === 0) {
      md += `_No issues flagged._\n\n`;
      continue;
    }
    for (const iss of y.issues) {
      md += `- **[${iss.severity}]** \`${iss.check}\` @ ${iss.page}: ${iss.msg}\n`;
      if (iss.culprits?.length) {
        md += `  - culprits: ${iss.culprits
          .map((c) => `${c.tag}${c.id ? "#" + c.id : ""}`)
          .join(", ")}\n`;
      }
      if (iss.samples?.length) {
        md += `  - samples: ${iss.samples
          .slice(0, 3)
          .map((s) => `\`${String(s).slice(0, 80)}\``)
          .join(", ")}\n`;
      }
    }
    md += `\n`;
  }

  md += `## How to re-run\n\n\`\`\`bash\nnode scripts/ui-inspect-all-years.mjs\n\`\`\`\n`;
  fs.writeFileSync(OUT_MD, md);
  console.log(`\nWrote ${OUT_MD}`);
  console.log(
    `Summary: crit=${report.summary.critical} high=${report.summary.high} med=${report.summary.medium} low=${report.summary.low} clean=${report.summary.clean}`
  );

  // Exit non-zero if critical/high
  if (report.summary.critical + report.summary.high > 0) process.exitCode = 2;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
