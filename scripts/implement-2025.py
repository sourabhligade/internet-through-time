#!/usr/bin/env python3
"""Implement 2025 lean door from live 2024 shape. Does not touch years/2024/."""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(p: Path, t: str) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(t, encoding="utf-8")


def retarget(text: str) -> str:
    reps = [
        ('data-itt-year="2024"', 'data-itt-year="2025"'),
        ("itt24-", "itt25-"),
        ("immersion-2024.js", "immersion-2025.js"),
        ("browser-2024.js", "browser-2025.js"),
        ("js/config/2024.js", "js/config/2025.js"),
        ("year-2024", "year-2025"),
        ("yg-year-2024", "yg-year-2025"),
        ("ott-guided-2024", "ott-guided-2025"),
        ('data-ott-one-thing="2024"', 'data-ott-one-thing="2025"'),
        ('data-itt-pop3x="2024"', 'data-itt-pop3x="2025"'),
        ('data-itt-pop-more="2024"', 'data-itt-pop-more="2025"'),
        ('data-itt-pop-3x3="2024"', 'data-itt-pop-3x3="2025"'),
        ('data-itt-year-extras="2024"', 'data-itt-year-extras="2025"'),
        ('data-itt-mass="2024"', 'data-itt-mass="2025"'),
        ("years/2024/", "years/2025/"),
        ("web2024", "web2025"),
        ('class="year-2024', 'class="year-2025'),
        ('ITT.bootBrowserYear("2024")', 'ITT.bootBrowserYear("2025")'),
        ('ITT.configs["2024"]', 'ITT.configs["2025"]'),
        ('storagePrefix: "itt24"', 'storagePrefix: "itt25"'),
        ("itt-2024-", "itt-2025-"),
        ('data-year="2024"', 'data-year="2025"'),
        ('data-itt-3x-also data-itt-year="2024"', 'data-itt-3x-also data-itt-year="2025"'),
        ("Welcome to the World Wide Web — 2024", "Welcome to the World Wide Web — 2025"),
        ("Chrome habit — 2024", "Chrome habit — 2025"),
        ("ITT-2X-REMAIN:2024", "ITT-2X-REMAIN:2025"),
        ("ott-2x-2024", "ott-2x-2025"),
    ]
    for a, b in reps:
        text = text.replace(a, b)
    return text


def ytl(
    year: str,
    title: str,
    key: str,
    need: str,
    pick: str,
    trap: str,
    field: str,
    ph: str,
    need_field: str,
    req: str,
    go: str,
    note: str,
) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div data-ytl data-ytl-key="{key}" data-ytl-need-pick="{need}" data-ytl-need-field="{need_field}" data-ytl-verb="{go}" data-itt-year="{year}" style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<p>{note}</p>
<p>
 <button type="button" data-ytl-pick="{need}" data-ytl-q="{need_field}">{pick}</button>
 <button type="button" data-ytl-pick="trap">{trap}</button>
</p>
<p><label>{field}<br><input type="text" data-ytl-field maxlength="80" placeholder="{ph}" autocomplete="off"></label></p>
<label style="display:block"><input type="checkbox" data-ytl-req> {req}</label>
<p>
 <button type="button" data-ytl-trap>{trap}</button>
 <button type="button" data-ytl-go>{go}</button>
 <span data-ytl-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt25-{key}"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
<p class="honest" style="margin:0 0 8px;font-size:12px">2025 leftover · incomplete never writes · not the chip</p>
</div>
<script src="../../../../js/immersion-2025.js"></script>
</body>
</html>
"""


def bump_year_cap(text: str) -> str:
    text = text.replace("y <= 2024", "y <= 2025")
    text = text.replace("y<=2024", "y<=2025")
    text = text.replace("range(1994, 2025)", "range(1994, 2026)")
    return text


def insert_after_2024_list_item(text: str, item_2024: str, item_2025: str) -> str:
    if item_2025 in text:
        return text
    if item_2024 not in text:
        return text
    return text.replace(item_2024, item_2024 + item_2025, 1)


def main() -> None:
    src = ROOT / "years" / "2024"
    dst = ROOT / "years" / "2025"
    if not src.exists():
        raise SystemExit("years/2024 missing — cannot clone")
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    for p in dst.rglob("*"):
        if p.is_file() and p.suffix in {".html", ".js"}:
            p.write_text(retarget(p.read_text(encoding="utf-8", errors="replace")), encoding="utf-8")

    cfg = (ROOT / "js" / "config" / "2024.js").read_text(encoding="utf-8")
    cfg = cfg.replace("2024", "2025").replace("itt24", "itt25").replace("web2024", "web2025")
    write(ROOT / "js" / "config" / "2025.js", cfg)

    write(
        ROOT / "js" / "browser-2025.js",
        """/**
 * Browser year stub — 2025
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2025");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2025"]) {
    console.error("ITT 2025 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2025"]);
})();
""",
    )
    write(
        ROOT / "js" / "immersion-2025.js",
        """/**
 * Immersion year stub — 2025
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2025";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
""",
    )
    write(
        ROOT / "js" / "config" / "immersion-2025.js",
        """/**
 * Immersion config — 2025
 * Thesis: Think is the save · R1 is open-weight reason · empty / V3 / treat-as-2024 never write
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2025"] = {
    year: "2025",
    storagePrefix: "itt25",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2025Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "Win11 residual · Chrome habit · DeepSeek R1 Think",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "R1", href: "sites/deepseek/r1.html", match: "/deepseek/" },
      { label: "Operator", href: "sites/operator/index.html", match: "/operator/" },
      { label: "o3-mini", href: "sites/o3mini/index.html", match: "/o3mini/" },
      { label: "4.5", href: "sites/gpt45/index.html", match: "/gpt45/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "DeepSeek R1 Think", href: "sites/deepseek/r1.html" },
      { label: "Operator leftover", href: "sites/operator/index.html" },
      { label: "About 2025", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
""",
    )

    write(
        ROOT / "years" / "2025" / "sites" / "deepseek" / "r1.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2025">
<head>
<meta charset="utf-8">
<title>DeepSeek R1 Think — 2025</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-recon-gold" data-recon="r1"><b>RECON frame</b> RECON · think sheet · no DeepSeek mark</div>
<div style="max-width:32em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>DeepSeek R1 Think</h1>
<p><b>20 Jan 2025</b>. Open-weight reasoner. MIT license. Not V3. Not 2024 US mass. Not GPT-5. This is not a live model. No official pixels. No ripped weights.</p>
<p class="itt-pixel-failed">[failed-final] think sheet · no wordmark</p>
<p>
 <button type="button" data-r1-pick="v3">Stay on V3</button>
 <button type="button" data-r1-pick="r1">R1</button>
</p>
<label style="display:block"><input type="checkbox" data-r1-req> 20 Jan 2025 · MIT weights — not a 2024 US-mass dest</label>
<label style="display:block"><input type="checkbox" data-r1-req> Think is the save — empty / V3 never write</label>
<p>
 <button type="button" data-r1-go>Think</button>
 <button type="button" data-r1-trap="gpt5">GPT-5 January mass (trap)</button>
 <button type="button" data-r1-trap="was24">R1 was 2024 (trap)</button>
 <button type="button" data-r1-trap="4o">4o is 2025 gold (trap)</button>
</p>
<p data-r1-status></p>
<p hidden data-next-flow data-next-when-key="itt25-r1"><b>Next:</b> <a href="../operator/index.html">Operator leftover</a></p>
</div>
<script src="../../../../js/immersion-2025.js"></script>
</body>
</html>
""",
    )

    leftovers = [
        (
            "operator/index.html",
            "Operator leftover",
            "operator",
            "agent",
            "Ack Operator leftover",
            "Treat as gold (trap)",
            "Note",
            "operator leftover",
            "operator leftover",
            "Jan 2025 computer-use leftover · not the chip",
            "Ack leftover",
            "January 2025 computer-use class leftover. Not a live agent. Not the chip.",
        ),
        (
            "o3mini/index.html",
            "o3-mini leftover",
            "o3mini",
            "mini",
            "Ack o3-mini leftover",
            "Treat as gold (trap)",
            "Note",
            "o3-mini leftover",
            "o3-mini leftover",
            "31 Jan 2025 leftover · not the chip",
            "Ack leftover",
            "31 Jan 2025 leftover reasoner. Not R1. Not the chip.",
        ),
        (
            "gpt45/index.html",
            "GPT-4.5 leftover",
            "gpt45",
            "preview",
            "Ack 4.5 leftover",
            "Treat as gold (trap)",
            "Note",
            "gpt-4.5 leftover",
            "gpt-4.5 leftover",
            "Feb 2025 preview leftover · not the chip",
            "Ack leftover",
            "February 2025 class leftover. Not 4o. Not GPT-5 January mass. Not the chip.",
        ),
        (
            "grok3/index.html",
            "Grok 3 leftover",
            "grok3",
            "grok3",
            "Ack Grok 3 leftover",
            "Treat as gold (trap)",
            "Note",
            "grok 3 leftover",
            "grok 3 leftover",
            "2025 leftover · not the chip",
            "Ack leftover",
            "2025 leftover. Not 2023/2024 Grok dest. Not the chip.",
        ),
        (
            "claude4/index.html",
            "Claude 4 leftover",
            "claude4",
            "sonnet",
            "Ack Claude 4 leftover",
            "Treat 3.5 as 2025 gold (trap)",
            "Note",
            "claude 4 leftover",
            "claude 4 leftover",
            "2025 leftover · not the chip",
            "Ack leftover",
            "2025 leftover. Claude 3.5 stays 2024. Not the chip.",
        ),
        (
            "gemini25/index.html",
            "Gemini 2.5 leftover",
            "gemini25",
            "g25",
            "Ack Gemini 2.5 leftover",
            "Treat 2024 Gemini as gold (trap)",
            "Note",
            "gemini 2.5 leftover",
            "gemini 2.5 leftover",
            "2025 leftover · not the chip",
            "Ack leftover",
            "2025 leftover. 2024 Gemini leftover stays next door. Not the chip.",
        ),
    ]
    for rel, title, key, need, pick, trap, field, ph, nf, req, go, note in leftovers:
        write(ROOT / "years" / "2025" / "sites" / rel, ytl("2025", title, key, need, pick, trap, field, ph, nf, req, go, note))

    # 4o dest in 2025 is leftover residual, not gold. Keep the 4× panel.
    four = (ROOT / "years" / "2025" / "sites" / "chatgpt" / "4o.html").read_text(encoding="utf-8")
    four = re.sub(
        r"<h1>GPT-4o Talk</h1>.*?<p data-4o-status></p>",
        """<h1>GPT-4o residual</h1>
<p><b>13 May 2024</b> chip. Talk still writes <b>itt24-gpt4o</b> next door. This dest is leftover literacy only. Empty Talk never writes 2025 gold.</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · 4o is last year</p>
<p>
 <button type="button" data-r1-trap="4o">Treat 4o as 2025 gold (trap)</button>
</p>
<p data-4o-status>4o is 2024. Use the leftover panel below.</p>""",
        four,
        count=1,
        flags=re.S,
    )
    four = four.replace("GPT-4o Talk — 2025", "GPT-4o residual — 2025")
    write(ROOT / "years" / "2025" / "sites" / "chatgpt" / "4o.html", four)

    two_x = ""
    home_cloned = (ROOT / "years" / "2025" / "pages" / "home.html").read_text(encoding="utf-8")
    m = re.search(r"(<!-- ITT-2X-TRAILS:start -->.*)</body>", home_cloned, re.S)
    if m:
        two_x = m.group(1)
        two_x = two_x.replace("../sites/chatgpt/4o.html", "../sites/deepseek/r1.html")
        two_x = two_x.replace("★ GPT-4o Talk", "★ DeepSeek R1 Think")

    write(
        ROOT / "years" / "2025" / "pages" / "home.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2025">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2025</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:12px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px">
<p><a data-ott-one-thing="2025" href="../sites/deepseek/r1.html" style="display:inline-block;padding:5px 12px;background:#2b6cb0;color:#fff;border-radius:14px;text-decoration:none;font-weight:bold">★ One-thing · DeepSeek R1 Think REAL</a></p>
<div class="ott-guided" id="ott-guided-2025" style="margin:12px 0;padding:14px;background:#111;color:#f5f5f7;border-radius:6px">
 <b>▶ Guided flow · 2025</b>
 <ol style="margin:8px 0 0;padding-left:1.3em;line-height:1.7">
  <li><a href="about.html" style="color:#aed6f1">About 2025</a> — R1 · ILS ban · ITU 6B / 74%</li>
  <li><a href="../sites/deepseek/r1.html" style="color:#aed6f1">DeepSeek R1 Think</a> — 20 Jan · MIT</li>
  <li><a href="../sites/operator/index.html" style="color:#aed6f1">Operator leftover</a> — computer-use</li>
  <li><a href="../sites/o3mini/index.html" style="color:#aed6f1">o3-mini leftover</a> — 31 Jan</li>
  <li><a href="../sites/gpt45/index.html" style="color:#aed6f1">GPT-4.5 leftover</a> — Feb class</li>
  <li><a href="map.html" style="color:#aed6f1">Year flow map</a></li>
 </ol>
</div>
<p class="itt-mass-honesty" data-itt-mass="2025" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em"><b>No June websites cell.</b> Live Stats table ends 2018 at 1,630,322,579. Netcraft January 2025: <b>1,161,445,625</b> hostnames. ITU 2025 report: <b>6 billion / 74%</b>. GPT-5 is not January 2025 mass. 4o Talk is 2024. R1 is not a 2024 dest.</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a1a1a" style="border:2px solid #2b6cb0">
<tr bgcolor="#111"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — 2025</b> · Win11 residual · Chrome habit · DeepSeek R1
</td></tr>
<tr bgcolor="#d6eaf8"><td style="padding:8px 12px">
 <b>Think is the save. Empty / V3 / treat-as-2024 never write.</b>
 20 Jan 2025 · MIT weights. Operator / o3-mini / GPT-4.5 are leftover. 4o is last year.
</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <div data-itt-tour></div>
 <p><a href="map.html"><b>2025 UX flow map</b></a></p>
 <p class="itt-playable-link" data-itt-year-extras="2025" style="padding:8px;border:2px solid #333;background:#ffc"><b>▶ Play this year’s game</b> — <a href="../sites/playable/game.html"><b>Think Dash</b></a> · <a href="../sites/playable/famous.html">Famous games</a> · extras: <a href="../sites/playable/extra-a.html">Think drill</a> · <a href="../sites/playable/extra-b.html">Operator wait</a></p>
 <p>
  <a href="../sites/deepseek/r1.html">DeepSeek R1</a> ·
  <a href="../sites/operator/index.html">Operator</a> ·
  <a href="../sites/o3mini/index.html">o3-mini</a> ·
  <a href="../sites/gpt45/index.html">GPT-4.5</a>
 </p>
 <p style="font-size:12px;color:#444">Also 2025:
  <a href="../sites/grok3/index.html">Grok 3 leftover</a> ·
  <a href="../sites/claude4/index.html">Claude 4 leftover</a> ·
  <a href="../sites/gemini25/index.html">Gemini 2.5 leftover</a> ·
  <a href="../sites/chrome/index.html">Chrome habit</a>
 </p>
 <p class="itt-year-true-pack" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px;border:1px dashed #666"><b>Continuity leftover (not the one-thing):</b>
  2024 Talk still exists next door and writes <b>itt24-gpt4o</b> only.
  GPT-5 January mass / 4o-as-2025-gold are <b>not</b> 2025 defaults.
 </p>
</td></tr>
</table>
</div>
<p data-itt-pop3x="2025" class="itt-pop3x" style="font-size:12px;margin:10px auto;padding:6px 0;max-width:720px">Also popular in 2025 (leftover trail, not the chip): <a href="../sites/youtube/index.html">YouTube</a> → <a href="../sites/wikipedia/index.html">Wikipedia</a> → <a href="../sites/facebook/index.html">Facebook</a></p>
<p data-itt-pop-more="2025" class="itt-pop-more" style="font-size:12px;margin:8px auto;max-width:720px"><b>3 more leftovers</b>: <a href="../sites/tiktok/index.html">TikTok leftover</a> ·
 <a href="../sites/midjourney/index.html">Midjourney leftover</a> ·
 <a href="../sites/lensa/index.html">Lensa leftover</a></p>
<p data-itt-pop-3x3="2025" class="itt-pop-3x3" style="font-size:12px;margin:8px auto;max-width:720px">
 <b>3 more leftovers</b> (third trio):
 <a href="../sites/claude2/index.html">Claude 2 residual</a> ·
 <a href="../sites/bluesky/index.html">Bluesky leftover</a> ·
 <a href="../sites/threads/index.html">Threads residual</a>
</p>
<script src="../../../js/immersion-2025.js"></script>
{two_x}
</body>
</html>
""",
    )

    write(
        ROOT / "years" / "2025" / "pages" / "about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2025">
<head>
<meta charset="utf-8">
<title>About 2025 — dual scale · bans</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2025</h1>
<p><b>Think is the save — empty / V3 / treat-as-2024 never write — while the Live Stats June table still ends at 2018 and Netcraft January 2025 is 1,161,445,625 hostnames.</b></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#d6eaf8"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b>. <b>No June 2025 websites digit.</b></td></tr>
<tr><td>Netcraft January 2025</td><td><b>1,161,445,625</b> hostnames · <b>273,352,681</b> domains · <b>13,423,989</b> computers — <b>January</b>, never June</td></tr>
<tr><td>ITU 2025 report</td><td><b>6 billion</b> / <b>74%</b> people online — labeled 2025 report cell</td></tr>
<tr><td>DeepSeek R1</td><td><b>20 Jan 2025</b> · MIT · Think</td></tr>
<tr><td>o3-mini</td><td><b>31 Jan 2025</b> leftover</td></tr>
<tr><td>Operator / GPT-4.5</td><td>Jan / Feb leftover · not the chip</td></tr>
</table>
<h2>Bans — not 2025 defaults</h2>
<ul>
<li>Treat R1 as a 2024 dest · 4o as the 2025 gold</li>
<li>GPT-5 as January 2025 mass</li>
<li>Invent ILS June 2025 websites · 7th guided step · brand pixels · ripped weights · live model</li>
<li>Wipe 2024 Talk</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read that DeepSeek R1 is 20 Jan 2025, MIT, and Think is the save — not V3, not 2024.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know 4o is 2024, Operator / o3-mini / GPT-4.5 are leftover, and there is no June 2025 ILS websites digit.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> <a href="../sites/deepseek/r1.html">DeepSeek R1 Think</a></p>
</section>
<p><a href="home.html">Starting Point</a> · <a href="../sites/deepseek/r1.html">★ DeepSeek R1</a></p>
</div>
<script src="../../../js/immersion-2025.js"></script>
</body>
</html>
""",
    )

    extras_src = (ROOT / "js" / "immersion" / "year-2024-extras.js").read_text(encoding="utf-8")
    extras = extras_src.replace("2024", "2025").replace("itt24", "itt25")
    extras = extras.replace("year-2024-extras", "year-2025-extras")
    extras = extras.replace("year2024Extras", "year2025Extras")
    extras = extras.replace("GPT-4o star", "DeepSeek R1 star")
    extras = extras.replace("boot4o", "bootR1")
    extras = extras.replace("data-4o-", "data-r1-")
    extras = extras.replace('key("gpt4o")', 'key("r1")')
    extras = extras.replace("Picked GPT-4o.", "Picked R1.")
    extras = extras.replace("Stay on GPT-4 never writes 4o.", "Stay on V3 never writes R1.")
    extras = extras.replace('picked === "4o"', 'picked === "r1"')
    extras = extras.replace('picked !== "4o"', 'picked !== "r1"')
    extras = extras.replace('[data-r1-trap="gpt5"]', '[data-r1-trap="gpt5"]')
    extras = extras.replace("GPT-5 is not 2024 mass.", "GPT-5 is not January 2025 mass.")
    extras = extras.replace("GPT-5 is not 2025 mass.", "GPT-5 is not January 2025 mass.")
    extras = extras.replace('[data-r1-trap="was23"]', '[data-r1-trap="was24"]')
    extras = extras.replace("GPT-4o is 13 May 2024. 2023 is Plus.", "R1 is 20 Jan 2025. 2024 is Talk.")
    extras = extras.replace('[data-r1-trap="apple"]', '[data-r1-trap="4o"]')
    extras = extras.replace(
        "Apple Intelligence is leftover, not the January shell.",
        "4o is 2024. Talk writes itt24-gpt4o only.",
    )
    extras = extras.replace("4o leftover · ", "R1 leftover · ")
    extras = extras.replace("Pick GPT-4o first. Empty / GPT-4 never writes.", "Pick R1 first. Empty / V3 never writes.")
    extras = extras.replace(
        'saveJSON(key("r1"), blob({ omni: true, freeClass: true, date: "2025-05-13", gpt5: false }));',
        'saveJSON(key("r1"), blob({ think: true, mit: true, date: "2025-01-20", gpt5: false, v3: false }));',
    )
    extras = extras.replace("GPT-4o Talk · ", "DeepSeek R1 Think · ")
    extras = extras.replace("Talk drill leftover", "Think drill leftover")
    extras = extras.replace("Tap Talk three times.", "Tap Think three times.")
    extras = extras.replace("Gemini leftover · ", "Operator leftover · ")
    extras = extras.replace('!== "gemini"', '!== "operator"')
    extras = extras.replace("Type gemini first.", "Type operator first.")
    extras = extras.replace("gemini: true, date: \"2025-02-08\"", "operator: true, date: \"2025-01\"")
    extras = extras.replace("data-24-bound", "data-25-bound")
    write(ROOT / "js" / "immersion" / "year-2025-extras.js", extras)

    write(
        ROOT / "js" / "games" / "year-2025-think.js",
        """/**
 * Think Dash — 2025 museum year game.
 * Storage: itt25-game-think
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="think"]');
  if (!host) return;
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var goBtn = host.querySelector("[data-prompt-go]");
  var field = host.querySelector("[data-prompt-field]");
  var running = false;
  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function ticks() {
    var els = host.querySelectorAll("[data-prompt-req]");
    var n = 0, i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }
  if (startBtn) startBtn.addEventListener("click", function () {
    running = true;
    if (scoreEl) scoreEl.textContent = "0";
    if (field) field.value = "";
    setStatus("Tick both honesties. Type think. Empty never writes.");
  });
  if (goBtn) goBtn.addEventListener("click", function () {
    if (!running) { setStatus("New Game first."); return; }
    if (ticks() < 2) { setStatus("Tick both honesties first. Incomplete never writes."); return; }
    var word = field ? String(field.value || "").replace(/^\\s+|\\s+$/g, "") : "";
    if (word.replace(/\\s/g, "").toLowerCase() !== "think") {
      setStatus("Type think first. Empty never writes.");
      return;
    }
    if (scoreEl) scoreEl.textContent = "4";
    try {
      localStorage.setItem("itt25-game-think", JSON.stringify({
        real: true, multiStep: true, year: "2025", think: true, ts: Date.now()
      }));
    } catch (e) { /* */ }
    running = false;
    setStatus("Think Dash leftover · itt25-game-think");
    try { if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document); } catch (e2) { /* */ }
  });
})();
""",
    )

    for name in ("year-2024-omni.js", "year-2024-bereal2.js", "year-2024-mastoinst.js", "year-2024-wordguess.js"):
        src_js = ROOT / "js" / "games" / name
        if src_js.exists():
            write(ROOT / "js" / "games" / name.replace("2024", "2025"), retarget(src_js.read_text(encoding="utf-8")))

    game = (ROOT / "years" / "2025" / "sites" / "playable" / "game.html").read_text(encoding="utf-8")
    game = game.replace("Omni Dash", "Think Dash")
    game = game.replace("Prompt Box", "Think Dash")
    game = re.sub(r'data-game-id="[^"]+"', 'data-game-id="think"', game)
    game = game.replace("year-2025-omni.js", "year-2025-think.js")
    game = game.replace("year-2024-omni.js", "year-2025-think.js")
    game = game.replace("itt25-game-omni", "itt25-game-think")
    game = game.replace("itt25-game-prompt", "itt25-game-think")
    game = game.replace("../chatgpt/4o.html", "../deepseek/r1.html")
    game = game.replace("Type omni", "Type think")
    game = game.replace("omni leftover", "think leftover")
    write(ROOT / "years" / "2025" / "sites" / "playable" / "game.html", game)

    extra_a = (ROOT / "years" / "2025" / "sites" / "playable" / "extra-a.html").read_text(encoding="utf-8")
    extra_a = extra_a.replace("Talk drill", "Think drill").replace("Send drill", "Think drill")
    extra_a = extra_a.replace(">Talk<", ">Think<").replace(">Send<", ">Think<")
    extra_a = extra_a.replace("Tap Send three times", "Tap Think three times")
    extra_a = extra_a.replace("Gemini wait", "Operator wait")
    extra_a = extra_a.replace("../chatgpt/index.html", "../deepseek/r1.html")
    write(ROOT / "years" / "2025" / "sites" / "playable" / "extra-a.html", extra_a)
    extra_b = (ROOT / "years" / "2025" / "sites" / "playable" / "extra-b.html").read_text(encoding="utf-8")
    extra_b = extra_b.replace("Gemini wait", "Operator wait").replace("1 million", "Operator wait")
    extra_b = extra_b.replace("gemini", "operator").replace("Gemini", "Operator")
    write(ROOT / "years" / "2025" / "sites" / "playable" / "extra-b.html", extra_b)

    idx = (ROOT / "years" / "2025" / "index.html").read_text(encoding="utf-8")
    idx = idx.replace("sites/chatgpt/4o.html", "sites/deepseek/r1.html")
    idx = idx.replace("sites/chatgpt/plus.html", "sites/deepseek/r1.html")
    idx = idx.replace(">4o<", ">R1<").replace(">Plus<", ">R1<")
    idx = idx.replace("GPT-4o Talk", "DeepSeek R1 Think")
    idx = idx.replace("Talk is the save · empty / GPT-5 / 4o-as-2023 never write.", "Think is the save · empty / V3 / treat-as-2024 never write.")
    idx = idx.replace("Talk is the save · empty / GPT-5 / 4o-as-2024 never write.", "Think is the save · empty / V3 / treat-as-2024 never write.")
    write(ROOT / "years" / "2025" / "index.html", idx)

    c = (ROOT / "js" / "config" / "2025.js").read_text(encoding="utf-8")
    for room in [
        "sites/deepseek/r1.html",
        "sites/operator/index.html",
        "sites/o3mini/index.html",
        "sites/gpt45/index.html",
        "sites/grok3/index.html",
        "sites/claude4/index.html",
        "sites/gemini25/index.html",
    ]:
        if room not in c:
            c = c.replace('    "sites/chatgpt/4o.html",', f'    "{room}",\n    "sites/chatgpt/4o.html",', 1)
    c = c.replace('title: "GPT-4o", path: "sites/chatgpt/4o.html"', 'title: "DeepSeek R1", path: "sites/deepseek/r1.html"')
    c = c.replace('title: "4o", path: "sites/chatgpt/4o.html"', 'title: "DeepSeek R1", path: "sites/deepseek/r1.html"')
    write(ROOT / "js" / "config" / "2025.js", c)

    # --- wire registry / trails / playable ---
    reg = (ROOT / "js" / "immersion" / "registry.js").read_text(encoding="utf-8")
    if '"2025"' not in reg.split("var EXTRA")[1][:8000] if "var EXTRA" in reg else True:
        needle = """    "2024": [
      "immersion/no-mock-common.js",
      "immersion/year-2024-extras.js",
      "immersion/one-thing-machines.js"
    ]
"""
        insert = needle.replace("2024", "2025").replace("year-2024", "year-2025")
        if '"2025"' not in reg:
            if needle not in reg:
                raise SystemExit("registry EXTRA 2024 block missing")
            reg = reg.replace(needle, needle.rstrip() + ",\n" + insert)
            write(ROOT / "js" / "immersion" / "registry.js", reg)

    trails = (ROOT / "js" / "config" / "flow-trails.js").read_text(encoding="utf-8")
    if '"2025"' not in trails:
        block = """    "2025": [
      {"n": 1, "name": "DeepSeek R1 Think", "href": "sites/deepseek/r1.html", "match": "/deepseek/r1", "whenKey": "itt25-r1", "nextHref": "sites/operator/index.html", "nextLabel": "Operator leftover"},
      {"n": 2, "name": "Operator leftover", "href": "sites/operator/index.html", "match": "/operator/", "whenKey": "itt25-operator", "nextHref": "sites/o3mini/index.html", "nextLabel": "o3-mini leftover"},
      {"n": 3, "name": "o3-mini leftover", "href": "sites/o3mini/index.html", "match": "/o3mini/", "whenKey": "itt25-o3mini", "nextHref": "sites/gpt45/index.html", "nextLabel": "GPT-4.5 leftover"},
      {"n": 4, "name": "GPT-4.5 leftover", "href": "sites/gpt45/index.html", "match": "/gpt45/", "whenKey": "itt25-gpt45", "nextHref": "sites/grok3/index.html", "nextLabel": "Grok 3 leftover"},
      {"n": 5, "name": "Grok 3 leftover", "href": "sites/grok3/index.html", "match": "/grok3/", "whenKey": "itt25-grok3", "nextHref": "sites/claude4/index.html", "nextLabel": "Claude 4 leftover"},
      {"n": 6, "name": "Claude 4 leftover", "href": "sites/claude4/index.html", "match": "/claude4/", "whenKey": "itt25-claude4", "nextHref": "sites/gemini25/index.html", "nextLabel": "Gemini 2.5 leftover"},
      {"n": 7, "name": "Gemini 2.5 leftover", "href": "sites/gemini25/index.html", "match": "/gemini25/", "whenKey": "itt25-gemini25", "nextHref": "sites/playable/game.html", "nextLabel": "Think Dash"},
      {"n": 8, "name": "Chrome habit", "href": "sites/chrome/index.html", "match": "/chrome/", "whenKey": "itt25-chrome", "nextHref": "sites/windows10/index.html", "nextLabel": "Windows 10"},
      {"n": 9, "name": "Windows 10 residual", "href": "sites/windows10/index.html", "match": "/windows10/", "whenKey": "itt25-win10", "nextHref": "sites/playable/game.html", "nextLabel": "Think Dash"},
      {"n": 10, "name": "Think Dash", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt25-game-think", "nextHref": "sites/deepseek/r1.html", "nextLabel": "DeepSeek R1"}
    ]
"""
        trails = trails.replace(
            '      {"n": 10, "name": "Omni Dash", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt24-game-omni", "nextHref": "sites/chatgpt/4o.html", "nextLabel": "GPT-4o"}\n    ]\n  };',
            '      {"n": 10, "name": "Omni Dash", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt24-game-omni", "nextHref": "sites/chatgpt/4o.html", "nextLabel": "GPT-4o"}\n    ],\n'
            + block
            + "  };",
        )
        write(ROOT / "js" / "config" / "flow-trails.js", trails)

    yp = (ROOT / "js" / "config" / "year-playable.js").read_text(encoding="utf-8")
    if '"2025"' not in yp:
        yp = yp.replace(
            """    "2024": {
      id: "omni",
      title: "Omni Dash",
      href: "game.html",
      key: "itt24-game-omni",
      inspire: "Theater omni — not a live model · 4o is the gold dest",
      blurb: "Type omni. Incomplete never writes.",
      why: "4o is the door. The game is a theater box.",
      era: "Talk is the save. GPT-5 is next year.",
      famous: "Brick Bat + Concentration",
      accent: "#10a37f"
    }""",
            """    "2024": {
      id: "omni",
      title: "Omni Dash",
      href: "game.html",
      key: "itt24-game-omni",
      inspire: "Theater omni — not a live model · 4o is the gold dest",
      blurb: "Type omni. Incomplete never writes.",
      why: "4o is the door. The game is a theater box.",
      era: "Talk is the save. GPT-5 is next year.",
      famous: "Brick Bat + Concentration",
      accent: "#10a37f"
    },
    "2025": {
      id: "think",
      title: "Think Dash",
      href: "game.html",
      key: "itt25-game-think",
      inspire: "Theater think — not a live model · R1 is the gold dest",
      blurb: "Type think. Incomplete never writes.",
      why: "R1 is the door. The game is a theater box.",
      era: "Think is the save. 4o is last year.",
      famous: "Brick Bat + Concentration",
      accent: "#2b6cb0"
    }""",
        )
        write(ROOT / "js" / "config" / "year-playable.js", yp)

    yeg = (ROOT / "js" / "config" / "year-extra-games.js").read_text(encoding="utf-8")
    if "yearExtraGames['2025']" not in yeg:
        yeg += (
            "\n  ;(ITT.yearExtraGames['2025'] = ITT.yearExtraGames['2025'] || []).push("
            "{id:'thinkwait',title:'Think Wait',href:\"extra-c.html\",key:\"itt25-game-thinkwait\"});\n"
            "  ;(ITT.yearExtraGames['2025'] = ITT.yearExtraGames['2025'] || []).push("
            "{id:'opask',title:'Operator Ask',href:\"extra-d.html\",key:\"itt25-game-opask\"});\n"
            "  ;(ITT.yearExtraGames['2025'] = ITT.yearExtraGames['2025'] || []).push("
            "{id:'r1note',title:'R1 Note',href:\"extra-e.html\",key:\"itt25-game-r1note\"});\n"
        )
        write(ROOT / "js" / "config" / "year-extra-games.js", yeg)

    # flow-maps-3x: clone 2024 block
    fm_path = ROOT / "js" / "config" / "flow-maps-3x.js"
    fm = fm_path.read_text(encoding="utf-8")
    if '"2025"' not in fm:
        mfm = re.search(r'  "2024": \[', fm)
        if mfm:
            start = mfm.start()
            # find matching close of 2024 array at top level of extra object
            i = mfm.end()
            depth = 1
            while i < len(fm) and depth:
                if fm[i] == "[":
                    depth += 1
                elif fm[i] == "]":
                    depth -= 1
                i += 1
            block_2024 = fm[start:i]
            block_2025 = block_2024.replace('"2024":', '"2025":', 1)
            fm = fm[:i] + ",\n" + block_2025 + fm[i:]
            fm_path.write_text(fm, encoding="utf-8")

    # 2× matrix — 48 rows
    mx_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(mx_path.read_text(encoding="utf-8"))
    if not any(r.get("year") == "2025" for r in rows):
        extra_rows = []
        for r in rows:
            if r.get("year") != "2024":
                continue
            nr = dict(r)
            nr["year"] = "2025"
            for k in ("path", "next"):
                if isinstance(nr.get(k), str):
                    nr[k] = nr[k].replace("/years/2024/", "/years/2025/")
            if isinstance(nr.get("key"), str):
                nr["key"] = nr["key"].replace("itt24-", "itt25-")
            extra_rows.append(nr)
        rows.extend(extra_rows)
        mx_path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")

    # museum-progress
    mp = (ROOT / "js" / "museum-progress.js").read_text(encoding="utf-8")
    if '"2025": yearVisitTour("2025"' not in mp:
        mp = mp.replace(
            """    "2024": yearVisitTour("2024",
      { path: "sites/chatgpt/4o.html", label: "GPT-4o Talk", blurb: "Omni. Free-class. Empty / GPT-5 never write.", match: "/chatgpt/4o" },
      { path: "sites/gemini/index.html", label: "Gemini leftover", blurb: "8 Feb. Bard is the old name.", match: "/gemini/" }),
  };""",
            """    "2024": yearVisitTour("2024",
      { path: "sites/chatgpt/4o.html", label: "GPT-4o Talk", blurb: "Omni. Free-class. Empty / GPT-5 never write.", match: "/chatgpt/4o" },
      { path: "sites/gemini/index.html", label: "Gemini leftover", blurb: "8 Feb. Bard is the old name.", match: "/gemini/" }),
    "2025": yearVisitTour("2025",
      { path: "sites/deepseek/r1.html", label: "DeepSeek R1 Think", blurb: "20 Jan. MIT. Empty / V3 / treat-as-2024 never write.", match: "/deepseek/" },
      { path: "sites/operator/index.html", label: "Operator leftover", blurb: "Jan computer-use leftover. Not the chip.", match: "/operator/" }),
  };""",
        )
    mp = bump_year_cap(mp)
    write(ROOT / "js" / "museum-progress.js", mp)

    # atlas.js year cap
    aj = (ROOT / "js" / "atlas.js").read_text(encoding="utf-8")
    write(ROOT / "js" / "atlas.js", bump_year_cap(aj))

    # atlas-data
    ad = (ROOT / "js" / "atlas-data.js").read_text(encoding="utf-8")
    ad = ad.replace("Museum ends 2024.", "Museum ends 2025.")
    ad = insert_after_2024_list_item(ad, '"2023", "2024"', '"2023", "2024", "2025"')
    ad = ad.replace(
        '{ id: "models", label: "Models", blurb: "ATT Ask, ChatGPT Send, Plus $20, GPT-4o Talk.", years: ["2021", "2022", "2023", "2024"] }',
        '{ id: "models", label: "Models", blurb: "ATT Ask, ChatGPT Send, Plus $20, GPT-4o Talk, R1 Think.", years: ["2021", "2022", "2023", "2024", "2025"] }',
    )
    if '"2025": "4o is 2024.' not in ad:
        ad = ad.replace(
            '"2024": "Empty / GPT-5 / 4o-as-2023 never write."',
            '"2024": "Empty / GPT-5 / 4o-as-2023 never write.",\n      "2025": "4o is 2024. GPT-5 is not January mass. Empty / V3 never write."',
        )
    if '"2025": "Think is the save.' not in ad:
        ad = ad.replace(
            '"2024": "Talk is the save. The voice is the new ding. Empty / GPT-5 / 4o-as-2023 never write."',
            '"2024": "Talk is the save. The voice is the new ding. Empty / GPT-5 / 4o-as-2023 never write.",\n      "2025": "Think is the save. Open weights reason. Empty / V3 / treat-as-2024 never write."',
        )
    if '"2025": [' not in ad.split("guidedFull")[1][:4000]:
        ad = ad.replace(
            """      "2024": [
        { label: "About 2024", href: "years/2024/pages/about.html" },
        { label: "GPT-4o Talk", href: "years/2024/sites/chatgpt/4o.html" },
        { label: "Gemini leftover — not Bard", href: "years/2024/sites/gemini/index.html" },
        { label: "Claude 3.5 leftover", href: "years/2024/sites/claude35/index.html" },
        { label: "Sora leftover — preview", href: "years/2024/sites/sora/index.html" },
        { label: "Year flow map", href: "years/2024/pages/map.html" }
      ]""",
            """      "2024": [
        { label: "About 2024", href: "years/2024/pages/about.html" },
        { label: "GPT-4o Talk", href: "years/2024/sites/chatgpt/4o.html" },
        { label: "Gemini leftover — not Bard", href: "years/2024/sites/gemini/index.html" },
        { label: "Claude 3.5 leftover", href: "years/2024/sites/claude35/index.html" },
        { label: "Sora leftover — preview", href: "years/2024/sites/sora/index.html" },
        { label: "Year flow map", href: "years/2024/pages/map.html" }
      ],
      "2025": [
        { label: "About 2025", href: "years/2025/pages/about.html" },
        { label: "DeepSeek R1 Think", href: "years/2025/sites/deepseek/r1.html" },
        { label: "Operator leftover", href: "years/2025/sites/operator/index.html" },
        { label: "o3-mini leftover", href: "years/2025/sites/o3mini/index.html" },
        { label: "GPT-4.5 leftover", href: "years/2025/sites/gpt45/index.html" },
        { label: "Year flow map", href: "years/2025/pages/map.html" }
      ]""",
        )
    if '"2025": {' not in ad.split("years: {")[-1] if "years: {" in ad else True:
        ad = ad.replace(
            """      "2024": {
        era: "Win11 residual · Chrome habit · GPT-4o",
        thesis: "Talk is the save. Empty / GPT-5 / 4o-as-2023 never write.",
        gold: { label: "GPT-4o Talk", href: "years/2024/sites/chatgpt/4o.html", key: "itt24-gpt4o" },
        guided: [
          { label: "Gemini leftover", href: "years/2024/sites/gemini/index.html" },
          { label: "Claude 3.5 leftover", href: "years/2024/sites/claude35/index.html" }
        ],
        game: { label: "Omni Dash", href: "years/2024/sites/playable/game.html" }
      }""",
            """      "2024": {
        era: "Win11 residual · Chrome habit · GPT-4o",
        thesis: "Talk is the save. Empty / GPT-5 / 4o-as-2023 never write.",
        gold: { label: "GPT-4o Talk", href: "years/2024/sites/chatgpt/4o.html", key: "itt24-gpt4o" },
        guided: [
          { label: "Gemini leftover", href: "years/2024/sites/gemini/index.html" },
          { label: "Claude 3.5 leftover", href: "years/2024/sites/claude35/index.html" }
        ],
        game: { label: "Omni Dash", href: "years/2024/sites/playable/game.html" }
      },
      "2025": {
        era: "Win11 residual · Chrome habit · DeepSeek R1",
        thesis: "Think is the save. Empty / V3 / treat-as-2024 never write.",
        gold: { label: "DeepSeek R1 Think", href: "years/2025/sites/deepseek/r1.html", key: "itt25-r1" },
        guided: [
          { label: "Operator leftover", href: "years/2025/sites/operator/index.html" },
          { label: "o3-mini leftover", href: "years/2025/sites/o3mini/index.html" }
        ],
        game: { label: "Think Dash", href: "years/2025/sites/playable/game.html" }
      }""",
        )
    if 'year: "2025", label: "DeepSeek R1 Think"' not in ad:
        ad = ad.replace(
            '{ year: "2024", label: "GPT-4o Talk", href: "years/2024/sites/chatgpt/4o.html" }',
            '{ year: "2024", label: "GPT-4o Talk", href: "years/2024/sites/chatgpt/4o.html" },\n          { year: "2025", label: "DeepSeek R1 Think", href: "years/2025/sites/deepseek/r1.html" }',
        )
    write(ROOT / "js" / "atlas-data.js", ad)

    # check-every-flow
    cef = (ROOT / "scripts" / "check-every-flow.js").read_text(encoding="utf-8")
    cef = bump_year_cap(cef)
    if "2025:" not in cef:
        cef = cef.replace(
            '  2024: { path: "sites/chatgpt/4o.html", key: "itt24-gpt4o", hook: /data-4o-go/ },\n};',
            '  2024: { path: "sites/chatgpt/4o.html", key: "itt24-gpt4o", hook: /data-4o-go/ },\n'
            '  2025: { path: "sites/deepseek/r1.html", key: "itt25-r1", hook: /data-r1-go/ },\n};',
        )
    write(ROOT / "scripts" / "check-every-flow.js", cef)

    # itt_gate
    gate = (ROOT / "scripts" / "itt_gate.py").read_text(encoding="utf-8")
    gate = gate.replace("2024+ not on disk. Museum ends 2024.", "2026+ not on disk. Museum ends 2025.")
    gate = bump_year_cap(gate)
    write(ROOT / "scripts" / "itt_gate.py", gate)

    for rel in (
        "scripts/audit-mock-flows.js",
        "scripts/oss-visitor-gate.mjs",
        "e2e/year-start-trails.spec.js",
        "e2e/3x-links.spec.js",
        "e2e/year-more-3x.spec.js",
        "e2e/year-2010-plus-3x-unique.spec.js",
    ):
        p = ROOT / rel
        if p.exists():
            write(p, bump_year_cap(p.read_text(encoding="utf-8")))

    # one-thing
    ot = (ROOT / "e2e" / "one-thing-per-year.spec.js").read_text(encoding="utf-8")
    if 'year: "2025"' not in ot:
        ot = ot.replace(
            """    year: "2024",
    path: "/years/2024/sites/chatgpt/4o.html",
    key: "itt24-gpt4o",
    incomplete: async (page) => {
      await page.locator("[data-4o-go]").click();
    },
    complete: async (page) => {
      await page.locator('[data-4o-pick="4o"]').click();
      const reqs = page.locator("[data-4o-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("[data-4o-go]").click();
    },
  },
];""",
            """    year: "2024",
    path: "/years/2024/sites/chatgpt/4o.html",
    key: "itt24-gpt4o",
    incomplete: async (page) => {
      await page.locator("[data-4o-go]").click();
    },
    complete: async (page) => {
      await page.locator('[data-4o-pick="4o"]').click();
      const reqs = page.locator("[data-4o-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("[data-4o-go]").click();
    },
  },
  {
    year: "2025",
    path: "/years/2025/sites/deepseek/r1.html",
    key: "itt25-r1",
    incomplete: async (page) => {
      await page.locator("[data-r1-go]").click();
    },
    complete: async (page) => {
      await page.locator('[data-r1-pick="r1"]').click();
      const reqs = page.locator("[data-r1-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("[data-r1-go]").click();
    },
  },
];""",
        )
        write(ROOT / "e2e" / "one-thing-per-year.spec.js", ot)

    # atlas e2e lists
    for rel, extra in (
        ("e2e/atlas.spec.js", True),
        ("e2e/atlas-all-flows.spec.js", True),
    ):
        p = ROOT / rel
        t = p.read_text(encoding="utf-8")
        t = t.replace('"2023", "2024",', '"2023", "2024", "2025",')
        t = t.replace('"2023", "2024"\n];', '"2023", "2024", "2025"\n];')
        t = t.replace('"2022", "2023", "2024",', '"2022", "2023", "2024", "2025",')
        t = t.replace('models: ["2021", "2022", "2023", "2024"]', 'models: ["2021", "2022", "2023", "2024", "2025"]')
        if '2025": /R1|Think/i' not in t and '"2024": /GPT-4o|Talk/i' in t:
            t = t.replace('"2024": /GPT-4o|Talk/i,', '"2024": /GPT-4o|Talk/i,\n  "2025": /R1|Think/i,')
        write(p, t)

    # hub card + end-year copy
    hub = (ROOT / "index.html").read_text(encoding="utf-8")
    hub = hub.replace("1994–2024 (28 years", "1994–2025 (29 years")
    hub = hub.replace("The museum ends in 2024.", "The museum ends in 2025.")
    hub = hub.replace("museum ends 2024", "museum ends 2025")
    hub = hub.replace("<b>28 years open</b>", "<b>29 years open</b>")
    hub = hub.replace("★ 28 years open", "★ 29 years open")
    if 'data-year="2025"' not in hub:
        hub = hub.replace(
            """      <a class="year-card available y2024" href="years/2024/" data-year="2024">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2024</p>
            <span class="era-chip">4o · omni · Talk</span>
          </div>
          <p class="label">GPT-4o Talk · Gemini leftover · Claude 3.5 leftover</p>
          <p class="scale">Table ends 2018 · Netcraft Jan 1,079,154,539 · ITU 5.5B / 68%</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>

</div>""",
            """      <a class="year-card available y2024" href="years/2024/" data-year="2024">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2024</p>
            <span class="era-chip">4o · omni · Talk</span>
          </div>
          <p class="label">GPT-4o Talk · Gemini leftover · Claude 3.5 leftover</p>
          <p class="scale">Table ends 2018 · Netcraft Jan 1,079,154,539 · ITU 5.5B / 68%</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>

      <a class="year-card available y2025" href="years/2025/" data-year="2025">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2025</p>
            <span class="era-chip">R1 · Think · MIT</span>
          </div>
          <p class="label">DeepSeek R1 Think · Operator leftover · o3-mini leftover</p>
          <p class="scale">Table ends 2018 · Netcraft Jan 1,161,445,625 · ITU 6B / 74%</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>

</div>""",
        )
    write(ROOT / "index.html", hub)

    atlas_html = (ROOT / "atlas" / "index.html").read_text(encoding="utf-8")
    atlas_html = atlas_html.replace("28 open years (1994–2024", "29 open years (1994–2025")
    atlas_html = atlas_html.replace("2013–2024 are lean doors. The museum ends in 2024.", "2013–2025 are lean doors. The museum ends in 2025.")
    atlas_html = atlas_html.replace("Year hallway 1994–2024", "Year hallway 1994–2025")
    atlas_html = atlas_html.replace("Models covers 2021–2024.", "Models covers 2021–2025.")
    atlas_html = atlas_html.replace("28 years playable", "29 years playable")
    atlas_html = atlas_html.replace("museum ends 2024", "museum ends 2025")
    atlas_html = atlas_html.replace("2013–2024 lean doors", "2013–2025 lean doors")
    write(ROOT / "atlas" / "index.html", atlas_html)

    css = (ROOT / "css" / "hub.css").read_text(encoding="utf-8")
    if ".year-card.y2025" not in css:
        css += """
.year-card.y2025 { border-color: #1a365d #404040 #404040 #111; }
.year-card.y2025 .year-card-inner { background: linear-gradient(180deg, #0b1020 0%, #163 55%); color: #eee; }
.year-card.y2025 .year { color: #fff; }
.year-card.y2025 .era-chip { background: #2b6cb0; color: #fff; }
.year-card.y2025 .motif { background: linear-gradient(135deg, #2b6cb0, #1a365d); }
.year-card.y2025 .label, .year-card.y2025 .scale { color: #ccc; }
"""
        write(ROOT / "css" / "hub.css", css)

    # docs status
    rf = ROOT / "docs" / "2025-READ-FIRST.md"
    if rf.exists():
        t = rf.read_text(encoding="utf-8")
        t = t.replace("**Status:** first door on disk this pass.", "**Status:** lean door on disk. Star `itt25-r1`.")
        write(rf, t)

    html_n = len(list((ROOT / "years" / "2025").rglob("*.html")))
    sites_n = len([p for p in (ROOT / "years" / "2025" / "sites").iterdir() if p.is_dir()])
    print("2025 tree ready", html_n, "html", sites_n, "site folders")
    print("2024 untouched", (ROOT / "years" / "2024" / "sites" / "chatgpt" / "4o.html").exists())


if __name__ == "__main__":
    main()
