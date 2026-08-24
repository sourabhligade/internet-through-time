#!/usr/bin/env python3
"""Implement 2023 first door + leftover L5–L7 dests on 2010–2023.

Run from repo root. Git only if asked. Incomplete REAL never writes.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def pop_dest(year: str, slug: str, title: str, blurb: str, pick: str, trap: str, key_suffix: str, placeholder: str) -> str:
    yy = year[2:]
    key = f"itt{yy}-{key_suffix}"
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
<div style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>{blurb}</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="{pick}" data-pop-q="{placeholder}">{placeholder}</button>
 <button type="button" data-pop-pick="trap" data-pop-q="trap">{trap}</button>
</div>
<p><label>Note <input type="text" data-pop-field maxlength="80" placeholder="{placeholder}"></label></p>
<label style="display:block" class="pop-req"><input type="checkbox" data-pop-req> Leftover — not the chip</label>
<p>
 <button type="button" data-pop3-trap>{trap}</button>
 <button type="button" data-pop-go data-pop-id="{slug}" data-pop-key="{key_suffix}">Note leftover</button>
 <span data-pop-status></span>
</p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def retarget_copied(text: str) -> str:
    reps = [
        ('data-itt-year="2022"', 'data-itt-year="2023"'),
        ("itt22-", "itt23-"),
        ("immersion-2022.js", "immersion-2023.js"),
        ("browser-2022.js", "browser-2023.js"),
        ("js/config/2022.js", "js/config/2023.js"),
        ("year-2022", "year-2023"),
        ("yg-year-2022", "yg-year-2023"),
        ("ott-guided-2022", "ott-guided-2023"),
        ("ott-5x-2022", "ott-5x-2023"),
        ("ott-2x-2022", "ott-2x-2023"),
        ('data-ott-one-thing="2022"', 'data-ott-one-thing="2023"'),
        ('data-itt-pop3x="2022"', 'data-itt-pop3x="2023"'),
        ('data-itt-pop-more="2022"', 'data-itt-pop-more="2023"'),
        ('data-itt-pop-3x3="2022"', 'data-itt-pop-3x3="2023"'),
        ('data-itt-year-extras="2022"', 'data-itt-year-extras="2023"'),
        ('data-itt-mass="2022"', 'data-itt-mass="2023"'),
        ('data-itt-5x-atlas', "data-itt-5x-atlas"),
        ("years/2022/", "years/2023/"),
        ("web2022", "web2023"),
        ('class="year-2022', 'class="year-2023'),
        ("ITT.bootBrowserYear(\"2022\")", "ITT.bootBrowserYear(\"2023\")"),
        ('ITT.configs["2022"]', 'ITT.configs["2023"]'),
        ('storagePrefix: "itt22"', 'storagePrefix: "itt23"'),
        ("itt-2022-", "itt-2023-"),
        ("Welcome to the World Wide Web — 2022", "Welcome to the World Wide Web — 2023"),
        ("Chrome habit — 2022", "Chrome habit — 2023"),
        ("data-year=\"2022\"", 'data-year="2023"'),
        ("data-itt-3x-also data-itt-year=\"2022\"", 'data-itt-3x-also data-itt-year="2023"'),
    ]
    for a, b in reps:
        text = text.replace(a, b)
    return text


def implement_2023() -> None:
    src = ROOT / "years" / "2022"
    dst = ROOT / "years" / "2023"
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    for p in dst.rglob("*"):
        if p.is_file() and p.suffix in {".html", ".js", ".css"}:
            t = p.read_text(encoding="utf-8", errors="replace")
            p.write_text(retarget_copied(t), encoding="utf-8")

    write(ROOT / "js" / "config" / "2023.js", (ROOT / "js" / "config" / "2022.js").read_text(encoding="utf-8").replace("2022", "2023").replace("itt22", "itt23").replace("web2022", "web2023"))
    write(ROOT / "js" / "browser-2023.js", """/**
 * Browser year stub — 2023
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2023");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2023"]) {
    console.error("ITT 2023 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2023"]);
})();
""")
    write(ROOT / "js" / "immersion-2023.js", """/**
 * Immersion year stub — 2023
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2023";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
""")

    write(ROOT / "years" / "2023" / "sites" / "chatgpt" / "plus.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>ChatGPT Plus — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-recon-gold" data-recon="chatgpt-plus"><b>RECON frame</b> RECON · Plus chrome · no OpenAI mark</div>
<div class="gpt23-sheet" style="max-width:32em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>ChatGPT Plus</h1>
<p><b>1 Feb 2023</b>. <b>$20/month</b>. Free tier stays. US first. Peak-time access. Faster replies. GPT-4 (14 Mar) is Plus-only. This is not a live model. No official OpenAI pixels.</p>
<p class="itt-pixel-failed">[failed-final] subscribe sheet · no OpenAI wordmark</p>
<p>
 <button type="button" data-plus-pick="free">Stay free</button>
 <button type="button" data-plus-pick="20">$20 / month</button>
</p>
<label style="display:block"><input type="checkbox" data-plus-req> Free tier stays — Plus is not required</label>
<label style="display:block"><input type="checkbox" data-plus-req> $20 is 1 Feb 2023 — not a 2022 product</label>
<p>
 <button type="button" data-plus-go>Subscribe</button>
 <button type="button" data-plus-trap="4o">GPT-4o (trap)</button>
 <button type="button" data-plus-trap="gemini">Gemini (trap)</button>
 <button type="button" data-plus-trap="was22">Plus was 2022 (trap)</button>
</p>
<p data-plus-status></p>
<p hidden data-next-flow data-next-when-key="itt23-chatgpt-plus"><b>Next:</b> <a href="gpt4.html">GPT-4 leftover</a></p>
</div>
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    write(ROOT / "years" / "2023" / "sites" / "chatgpt" / "gpt4.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>GPT-4 leftover — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>GPT-4 leftover</h1>
<p><b>14 Mar 2023</b>. Plus-only. Not GPT-4o. Not the chip.</p>
<p class="itt-pixel-failed">[failed-final] model picker · no official mark</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="gpt4" data-pop-q="gpt-4 plus">GPT-4 (Plus)</button>
 <button type="button" data-pop-pick="trap" data-pop-q="trap">GPT-4o (trap)</button>
</div>
<p><label>Note <input type="text" data-pop-field maxlength="80" placeholder="gpt-4 plus"></label></p>
<label style="display:block" class="pop-req"><input type="checkbox" data-pop-req> Plus ack — GPT-4 is Plus-only</label>
<p>
 <button type="button" data-pop3-trap>GPT-4o (trap)</button>
 <button type="button" data-pop-go data-pop-id="gpt4" data-pop-key="gpt4">Pick leftover</button>
 <span data-pop-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt23-gpt4"><b>Next:</b> <a href="../bing/chat.html">Bing Chat leftover</a></p>
</div>
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    write(ROOT / "years" / "2023" / "sites" / "chatgpt" / "index.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>ChatGPT free residual — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>ChatGPT free residual</h1>
<p>2022 Send still lives next door. This dest is literacy, not Plus. Upgrade without $20 never writes Plus.</p>
<p class="itt-pixel-failed">[failed-final] free residual · no OpenAI mark</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="free" data-pop-q="free residual">free residual</button>
 <button type="button" data-pop-pick="trap" data-pop-q="trap">Steal 2022 Send (trap)</button>
</div>
<p><label>Note <input type="text" data-pop-field maxlength="80" placeholder="free residual"></label></p>
<label style="display:block" class="pop-req"><input type="checkbox" data-pop-req> Send is 2022 — Plus is the 2023 chip</label>
<p>
 <button type="button" data-pop3-trap>Write itt22-chatgpt (trap)</button>
 <button type="button" data-pop-go data-pop-id="free" data-pop-key="free">Save leftover</button>
 <span data-pop-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt23-free"><b>Next:</b> <a href="../playable/game.html">Year game</a></p>
<p><a href="plus.html">★ ChatGPT Plus</a></p>
</div>
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    write(ROOT / "years" / "2023" / "sites" / "bing" / "chat.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>Bing Chat leftover — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Bing Chat leftover</h1>
<p><b>7 Feb 2023</b> limited preview. New Bing later runs on GPT-4 (14 Mar). Not unlimited public. Not the chip.</p>
<p class="itt-pixel-failed">[failed-final] preview pane · no Bing mark</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="preview" data-pop-q="limited preview">limited preview</button>
 <button type="button" data-pop-pick="trap" data-pop-q="trap">Unlimited public (trap)</button>
</div>
<p><label>Ask <input type="text" data-pop-field maxlength="80" placeholder="limited preview"></label></p>
<label style="display:block" class="pop-req"><input type="checkbox" data-pop-req> Limited preview — not open-to-all</label>
<p>
 <button type="button" data-pop3-trap>Unlimited public (trap)</button>
 <button type="button" data-pop-go data-pop-id="bingchat" data-pop-key="bingchat">Ask leftover</button>
 <span data-pop-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt23-bingchat"><b>Next:</b> <a href="../bard/index.html">Bard leftover</a></p>
</div>
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    write(ROOT / "years" / "2023" / "sites" / "bard" / "index.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>Bard leftover — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Bard leftover</h1>
<p>Announce 6 Feb. Public <b>21 Mar 2023</b>. <b>Bard, not Gemini</b>. Gemini name is 8 Feb 2024.</p>
<p class="itt-pixel-failed">[failed-final] ask pane · no Google mark</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="bard" data-pop-q="ask bard">ask Bard</button>
 <button type="button" data-pop-pick="trap" data-pop-q="trap">Gemini (trap)</button>
</div>
<p><label>Ask <input type="text" data-pop-field maxlength="80" placeholder="ask bard"></label></p>
<label style="display:block" class="pop-req"><input type="checkbox" data-pop-req> Bard — not Gemini</label>
<p>
 <button type="button" data-pop3-trap>Gemini rename (trap)</button>
 <button type="button" data-pop-go data-pop-id="bard" data-pop-key="bard">Ask leftover</button>
 <span data-pop-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt23-bard"><b>Next:</b> <a href="../threads/index.html">Threads leftover</a></p>
</div>
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    write(ROOT / "years" / "2023" / "sites" / "threads" / "index.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>Threads leftover — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Threads leftover</h1>
<p><b>5 Jul 2023</b>. Not X. Not the chip.</p>
<p class="itt-pixel-failed">[failed-final] leftover post · no Meta mark</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="thread" data-pop-q="threads leftover">threads leftover</button>
 <button type="button" data-pop-pick="trap" data-pop-q="trap">Post as X (trap)</button>
</div>
<p><label>Post <input type="text" data-pop-field maxlength="80" placeholder="threads leftover"></label></p>
<label style="display:block" class="pop-req"><input type="checkbox" data-pop-req> Threads — not X</label>
<p>
 <button type="button" data-pop3-trap>X wordmark (trap)</button>
 <button type="button" data-pop-go data-pop-id="threads" data-pop-key="threads">Post leftover</button>
 <span data-pop-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt23-threads"><b>Next:</b> <a href="../twitter/x.html">X leftover</a></p>
</div>
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    write(ROOT / "years" / "2023" / "sites" / "twitter" / "x.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>X leftover — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#111" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>X leftover</h1>
<p><b>23 Jul 2023</b>. Bird becomes X. Not the 2022 Twitter gold. Not the chip.</p>
<p class="itt-pixel-failed">[failed-final] rebrand note · no official X mark</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="x" data-pop-q="bird to x">bird → X</button>
 <button type="button" data-pop-pick="trap" data-pop-q="trap">2022 Twitter gold (trap)</button>
</div>
<p><label>Note <input type="text" data-pop-field maxlength="80" placeholder="bird to x"></label></p>
<label style="display:block" class="pop-req"><input type="checkbox" data-pop-req> 23 Jul 2023 — leftover, not the chip</label>
<p>
 <button type="button" data-pop3-trap>Treat as 2022 gold (trap)</button>
 <button type="button" data-pop-go data-pop-id="x" data-pop-key="x">Save leftover</button>
 <span data-pop-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt23-x"><b>Next:</b> <a href="../chatgpt/index.html">Free residual</a></p>
</div>
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    write(ROOT / "years" / "2023" / "pages" / "home.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2023</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:12px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px">
<p><a data-ott-one-thing="2023" href="../sites/chatgpt/plus.html" style="display:inline-block;padding:5px 12px;background:#10a37f;color:#fff;border-radius:14px;text-decoration:none;font-weight:bold">★ One-thing · ChatGPT Plus $20 REAL</a></p>
<div class="ott-guided" id="ott-guided-2023" style="margin:12px 0;padding:14px;background:#111;color:#f5f5f7;border-radius:6px">
 <b>▶ Guided flow · 2023</b>
 <ol style="margin:8px 0 0;padding-left:1.3em;line-height:1.7">
  <li><a href="about.html" style="color:#aed6f1">About 2023</a> — $20 · Bard not Gemini · ILS ban</li>
  <li><a href="../sites/chatgpt/plus.html" style="color:#aed6f1">ChatGPT Plus</a> — $20 Subscribe</li>
  <li><a href="../sites/chatgpt/gpt4.html" style="color:#aed6f1">GPT-4 leftover</a> — Plus-only 14 Mar</li>
  <li><a href="../sites/bing/chat.html" style="color:#aed6f1">Bing Chat leftover</a> — 7 Feb preview</li>
  <li><a href="../sites/bard/index.html" style="color:#aed6f1">Bard leftover</a> — not Gemini</li>
  <li><a href="map.html" style="color:#aed6f1">Year flow map</a></li>
 </ol>
</div>
<p class="itt-mass-honesty" data-itt-mass="2023" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em"><b>No June websites cell.</b> Live Stats table ends 2018 at 1,630,322,579. Netcraft January 2023: <b>1,132,268,801</b> hostnames. Plus is $20 on 1 Feb. Gemini is 2024. GPT-4o is 2024.</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a1a1a" style="border:2px solid #10a37f">
<tr bgcolor="#111"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — 2023</b> · Win11 residual · Chrome habit · ChatGPT Plus
</td></tr>
<tr bgcolor="#d5f5e3"><td style="padding:8px 12px">
 <b>Send is not enough. $20 Subscribe is the save.</b>
 GPT-4 is Plus-only. Bard is Bard. Threads 5 Jul. X 23 Jul.
</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <div data-itt-tour></div>
 <p><a href="map.html"><b>2023 UX flow map</b></a></p>
 <p class="itt-playable-link" data-itt-year-extras="2023" style="padding:8px;border:2px solid #333;background:#ffc"><b>▶ Play this year’s game</b> — <a href="../sites/playable/game.html"><b>Subscribe Dash</b></a> · <a href="../sites/playable/famous.html">Famous games</a> · extras: <a href="../sites/playable/extra-a.html">Plus drill</a> · <a href="../sites/playable/extra-b.html">Preview wait</a></p>
 <p>
  <a href="../sites/chatgpt/plus.html">ChatGPT Plus</a> ·
  <a href="../sites/chatgpt/gpt4.html">GPT-4</a> ·
  <a href="../sites/bing/chat.html">Bing Chat</a> ·
  <a href="../sites/bard/index.html">Bard</a>
 </p>
 <p style="font-size:12px;color:#444">Also 2023:
  <a href="../sites/threads/index.html">Threads leftover</a> ·
  <a href="../sites/twitter/x.html">X leftover</a> ·
  <a href="../sites/chatgpt/index.html">Free residual</a> ·
  <a href="../sites/chrome/index.html">Chrome habit</a> ·
  <a href="../sites/windows10/index.html">Win10 residual</a>
 </p>
 <p class="itt-year-true-pack" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px;border:1px dashed #666"><b>Continuity leftover (not the one-thing):</b>
  2022 Send still exists next door and writes <b>itt22-chatgpt</b> only.
  Gemini / GPT-4o / Apple Intelligence are <b>not</b> 2023 defaults.
 </p>
</td></tr>
</table>
</div>
<p data-itt-pop3x="2023" class="itt-pop3x" style="font-size:12px;margin:10px auto;padding:6px 0;max-width:720px">Also popular in 2023 (leftover trail, not the chip): <a href="../sites/youtube/index.html">YouTube</a> → <a href="../sites/wikipedia/index.html">Wikipedia</a> → <a href="../sites/facebook/index.html">Facebook</a></p>
<p data-itt-pop-more="2023" class="itt-pop-more" style="font-size:12px;margin:8px auto;max-width:720px"><b>3 more leftovers</b>: <a href="../sites/twitter/index.html">Twitter residual</a> ·
 <a href="../sites/wordle/index.html">Wordle leftover</a> ·
 <a href="../sites/stablediffusion/index.html">Stable Diffusion leftover</a></p>
<p data-itt-pop-3x3="2023" class="itt-pop-3x3" style="font-size:12px;margin:8px auto;max-width:720px">
 <b>3 more leftovers</b> (third trio):
 <a href="../sites/tiktok/index.html">TikTok leftover</a> ·
 <a href="../sites/midjourney/index.html">Midjourney leftover</a> ·
 <a href="../sites/lensa/index.html">Lensa leftover</a>
</p>
<script src="../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    write(ROOT / "years" / "2023" / "pages" / "about.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>About 2023 — dual scale · bans</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2023</h1>
<p><b>Subscribe $20 is the save — empty / stay free / GPT-4o / Gemini never write — while the Live Stats June table still ends at 2018 and Netcraft January 2023 is 1,132,268,801 hostnames.</b></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#d5f5e3"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b>. <b>No June 2023 websites digit.</b></td></tr>
<tr><td>Netcraft January 2023</td><td><b>1,132,268,801</b> hostnames — <b>January</b>, never June</td></tr>
<tr><td>ChatGPT Plus</td><td><b>$20/month</b> · <b>1 Feb 2023</b> · free stays</td></tr>
<tr><td>GPT-4 in ChatGPT</td><td><b>14 Mar 2023</b> · Plus-only</td></tr>
<tr><td>New Bing preview</td><td><b>7 Feb 2023</b> · later GPT-4</td></tr>
<tr><td>Bard public</td><td><b>21 Mar 2023</b> · Gemini name is <b>2024</b></td></tr>
<tr><td>Threads / X</td><td>Threads <b>5 Jul</b> · X <b>23 Jul</b></td></tr>
<tr><td>100 million MAU</td><td>UBS <b>January 2023</b></td></tr>
</table>
<h2>Bans — not 2023 defaults</h2>
<ul>
<li>GPT-4o (May 2024) · Gemini rename / Gemini app (Feb 2024)</li>
<li>Sora public · Apple Intelligence · Claude 3.5 as 2023 mass</li>
<li>Treat 2022 Send as Plus · invent ILS June 2023 websites</li>
<li>7th guided step · brand pixels · ripped weights</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read that Plus is $20 on 1 Feb 2023 and GPT-4 is Plus-only on 14 Mar.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know Bard is Bard, Gemini is 2024, and there is no June 2023 ILS websites digit.</label>
<p><button type="button" data-thesis-save>Save thesis literacy</button> <span data-thesis-status></span></p>
</section>
<p><a href="home.html">Starting Point</a> · <a href="../sites/chatgpt/plus.html">★ Plus</a></p>
</div>
<script src="../../../js/immersion-2023.js"></script>
</body>
</html>
""")

    # extras JS
    write(ROOT / "js" / "immersion" / "year-2023-extras.js", """/**
 * 2023 lean extras — ChatGPT Plus star
 * Keys: itt23-* via YearExtras — match flow-trails.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2023");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2023 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2023", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function reveal(doc) {
    try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
  }
  function countChecked(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function bootPlus(doc) {
    var go = doc.querySelector("[data-plus-go]");
    if (!go) return;
    var st = doc.querySelector("[data-plus-status]");
    var picked = "";
    var picks = doc.querySelectorAll("[data-plus-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        picked = this.getAttribute("data-plus-pick") || "";
        feedback(picked === "20" ? "Picked $20." : "Stay free never writes Plus.", st, { error: picked !== "20" });
      });
    }
    function trap(sel, msg) {
      var els = doc.querySelectorAll(sel);
      var j;
      for (j = 0; j < els.length; j++) {
        els[j].addEventListener("click", function () {
          feedback(msg, st, { error: true });
        });
      }
    }
    trap('[data-plus-trap="4o"]', "GPT-4o is May 2024. That click never writes.");
    trap('[data-plus-trap="gemini"]', "Gemini is Feb 2024. Bard is the 2023 leftover. That click never writes.");
    trap('[data-plus-trap="was22"]', "Plus is 1 Feb 2023. 2022 is Send. That click never writes.");
    var saved = YX.loadJSON(key("chatgpt-plus"));
    if (saved && saved.real) {
      feedback("Plus leftover · " + key("chatgpt-plus"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      if (picked !== "20") {
        feedback("Pick $20 / month first. Stay free / empty never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-plus-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("chatgpt-plus"), blob({ plus: true, usd: 20, date: "2023-02-01", gpt4o: false, gemini: false }));
      feedback("ChatGPT Plus · " + key("chatgpt-plus"), st);
      reveal(doc);
    });
  }

  function bootExtraA(doc) {
    var trap = doc.querySelector("[data-extra-a-plus]");
    var btn = doc.querySelector("[data-extra-a-send]");
    var st = doc.querySelector("[data-extra-a-status]");
    var n = 0;
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("GPT-4o is 2024. That click never writes.", st, { error: true });
      });
    }
    if (!btn) return;
    var saved = YX.loadJSON(key("extra-a"));
    if (saved && saved.real) {
      feedback("Plus drill leftover · " + key("extra-a"), st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      n++;
      if (n < 3) {
        feedback("Tap Subscribe three times. " + n + "/3 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-a"), blob({ taps: 3 }));
      feedback("Plus drill leftover · " + key("extra-a"), st);
      reveal(doc);
    });
  }

  function bootExtraB(doc) {
    var go = doc.querySelector("[data-extra-b-save]");
    var st = doc.querySelector("[data-extra-b-status]");
    if (!go) return;
    var saved = YX.loadJSON(key("extra-b"));
    if (saved && saved.real) {
      feedback("Preview leftover · " + key("extra-b"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-extra-b-field]");
      if (!q || q.replace(/\\s/g, "").toLowerCase() !== "preview") {
        feedback("Type preview first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-b"), blob({ preview: true, date: "2023-02-07" }));
      feedback("Preview leftover · " + key("extra-b"), st);
      reveal(doc);
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootPlus(doc);
    bootExtraA(doc);
    bootExtraB(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2023-extras", featureKey: "year2023Extras", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
""")

    write(ROOT / "js" / "games" / "year-2023-subscribe.js", """/**
 * Subscribe Dash — 2023 museum year game.
 * Storage: itt23-game-subscribe
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="subscribe"]');
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
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("subscribe", "2023") : 0);
  }
  function paintScore(n) {
    if (scoreEl) scoreEl.textContent = String(n);
  }
  function ticks() {
    var els = host.querySelectorAll("[data-prompt-req]");
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }
  function reset() {
    running = true;
    paintScore(0);
    if (field) field.value = "";
    setStatus("Tick both honesties. Type twenty. Empty never writes.");
  }
  if (startBtn) startBtn.addEventListener("click", reset);
  if (goBtn) {
    goBtn.addEventListener("click", function () {
      if (!running) {
        setStatus("New Game first.");
        return;
      }
      if (ticks() < 2) {
        setStatus("Tick both honesties first. Incomplete never writes.");
        return;
      }
      var word = field ? String(field.value || "").replace(/^\\s+|\\s+$/g, "") : "";
      if (word.replace(/\\s/g, "").toLowerCase() !== "twenty") {
        setStatus("Type twenty first. Empty never writes.");
        return;
      }
      paintScore(20);
      if (YG) YG.saveBest("subscribe", 20, { year: "2023", gold: false, leftover: true });
      try {
        localStorage.setItem("itt23-game-subscribe", JSON.stringify({
          real: true, multiStep: true, year: "2023", usd: 20, ts: Date.now()
        }));
      } catch (e) { /* */ }
      paintBest();
      running = false;
      setStatus("Subscribe Dash leftover · itt23-game-subscribe");
      try { if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document); } catch (e2) { /* */ }
    });
  }
  paintBest();
})();
""")

    game = (ROOT / "years" / "2023" / "sites" / "playable" / "game.html").read_text(encoding="utf-8")
    game = game.replace("Prompt Box", "Subscribe Dash")
    game = game.replace('data-game-id="prompt"', 'data-game-id="subscribe"')
    game = game.replace("year-2022-prompt.js", "year-2023-subscribe.js")
    game = game.replace("year-2023-prompt.js", "year-2023-subscribe.js")
    game = game.replace("itt23-game-prompt", "itt23-game-subscribe")
    game = game.replace("Star stays ChatGPT Send", "Star stays ChatGPT Plus")
    game = game.replace("../chatgpt/index.html", "../chatgpt/plus.html")
    write(ROOT / "years" / "2023" / "sites" / "playable" / "game.html", game)

    extra_a = (ROOT / "years" / "2023" / "sites" / "playable" / "extra-a.html").read_text(encoding="utf-8")
    extra_a = extra_a.replace("Send drill", "Plus drill")
    extra_a = extra_a.replace("data-extra-a-plus", "data-extra-a-plus")
    extra_a = extra_a.replace("Subscribe Plus (trap)", "GPT-4o (trap)")
    extra_a = extra_a.replace(">Send<", ">Subscribe<")
    extra_a = extra_a.replace("1 million", "Preview wait")
    write(ROOT / "years" / "2023" / "sites" / "playable" / "extra-a.html", extra_a)

    extra_b = (ROOT / "years" / "2023" / "sites" / "playable" / "extra-b.html").read_text(encoding="utf-8")
    extra_b = extra_b.replace("1 million", "Preview wait")
    extra_b = extra_b.replace("million", "preview")
    write(ROOT / "years" / "2023" / "sites" / "playable" / "extra-b.html", extra_b)

    # year index dirbar + scripts
    idx = (ROOT / "years" / "2023" / "index.html").read_text(encoding="utf-8")
    idx = idx.replace("sites/chatgpt/index.html", "sites/chatgpt/plus.html")
    idx = idx.replace(">ChatGPT<", ">Plus<")
    idx = idx.replace("2022 thesis", "2023 thesis")
    idx = idx.replace("Send is the save · empty / Plus / GPT-4 / Bing Chat never write.",
                      "Subscribe $20 is the save · empty / stay free / GPT-4o / Gemini never write.")
    idx = idx.replace("ChatGPT · Twitter leftover · Wordle leftover · Stable Diffusion leftover.",
                      "ChatGPT Plus · GPT-4 leftover · Bing Chat leftover · Bard leftover.")
    idx = idx.replace("ChatGPT research preview", "ChatGPT Plus $20")
    write(ROOT / "years" / "2023" / "index.html", idx)

    # config rooms — add new dests
    cfg = (ROOT / "js" / "config" / "2023.js").read_text(encoding="utf-8")
    extra_rooms = [
        "sites/chatgpt/plus.html",
        "sites/chatgpt/gpt4.html",
        "sites/bing/chat.html",
        "sites/bard/index.html",
        "sites/threads/index.html",
        "sites/twitter/x.html",
    ]
    for room in extra_rooms:
        if room not in cfg:
            cfg = cfg.replace(
                '    "sites/chatgpt/index.html",',
                f'    "{room}",\n    "sites/chatgpt/index.html",',
                1,
            )
    cfg = cfg.replace('title: "ChatGPT", path: "sites/chatgpt/index.html"',
                      'title: "ChatGPT Plus", path: "sites/chatgpt/plus.html"')
    cfg = cfg.replace("{ re: /chatgpt|openai|prompt|gpt/i, path: \"sites/chatgpt/index.html\" }",
                      "{ re: /chatgpt|plus|openai|prompt|gpt/i, path: \"sites/chatgpt/plus.html\" }")
    write(ROOT / "js" / "config" / "2023.js", cfg)


DENSIFY = {
    2010: [
        ("L5", "dropbox", "Dropbox leftover", "Sync leftover. Not the chip.", "sync", "iCloud as 2010 gold", "pop4-dropbox", "dropbox leftover"),
        ("L5", "hulustream", "Hulu leftover", "Stream leftover. Discs still exist.", "stream", "Netflix as gold", "pop4-hulustream", "hulu leftover"),
        ("L5", "spotifyeu", "Spotify EU leftover", "EU leftover. US is 2011.", "eu", "Spotify US as 2010", "pop4-spotifyeu", "spotify eu"),
        ("L6", "flickrbox", "Flickr leftover", "Photostream leftover.", "stream", "Instagram as Flickr", "pop5-flickrbox", "flickr leftover"),
        ("L6", "angrybirds", "Angry Birds leftover", "Dec 2009 launch, 2010 leftover habit.", "fling", "Fortnite as 2010", "pop5-angrybirds", "angry birds"),
        ("L6", "gmailtab", "Gmail leftover", "Tab leftover. Not the chip.", "tab", "Inbox as 2010 gold", "pop5-gmailtab", "gmail leftover"),
        ("L7", "farmnote", "FarmVille note leftover", "Peak leftover note. Not the chip.", "peak", "FarmVille as gold", "pop6-farmnote", "farm peak"),
        ("L7", "foursqnote", "Foursquare note leftover", "Check-in leftover note.", "checkin", "Stories as 2010", "pop6-foursqnote", "mayor leftover"),
        ("L7", "pinbeta", "Pinterest beta leftover", "Closed beta leftover.", "pin", "Stories as 2010", "pop6-pinbeta", "two pins"),
    ],
    2011: [
        ("L5", "sirileftover", "Siri leftover", "iPhone 4S leftover. Not G+.", "siri", "Siri as gold", "pop4-sirileftover", "siri leftover"),
        ("L5", "ipad2cam", "iPad 2 leftover", "Cameras leftover. Not the chip.", "camera", "iPad 2 as gold", "pop4-ipad2cam", "ipad 2"),
        ("L5", "twitternote", "Twitter leftover", "140 leftover.", "tweet", "G+ as Twitter", "pop4-twitternote", "140 leftover"),
        ("L6", "qwiknote", "Qwikster leftover", "Funeral leftover note.", "funeral", "Qwikster as gold", "pop5-qwiknote", "qwikster"),
        ("L6", "hangnote", "Hangouts leftover", "Hangout leftover note.", "hang", "Stories as 2011", "pop5-hangnote", "hangout"),
        ("L6", "ie9note", "IE9 leftover", "IE9 leftover note.", "ie9", "Chrome as January shell", "pop5-ie9note", "ie9 leftover"),
        ("L7", "groupon11", "Groupon leftover", "Deal leftover.", "deal", "G+ as Groupon", "pop6-groupon11", "daily deal"),
        ("L7", "dropbox11", "Dropbox leftover", "Sync leftover.", "sync", "iCloud as gold", "pop6-dropbox11", "dropbox leftover"),
        ("L7", "netflix11", "Netflix leftover", "Watch Instantly leftover.", "watch", "Qwikster as Netflix gold", "pop6-netflix11", "watch instantly"),
    ],
    2012: [
        ("L5", "drivebox", "Drive leftover", "Drive leftover. Not the chip.", "drive", "Dropbox as gold", "pop4-drivebox", "drive leftover"),
        ("L5", "kindlefire", "Kindle Fire leftover", "Fire leftover.", "fire", "iPad as 2012 gold", "pop4-kindlefire", "kindle fire"),
        ("L5", "soundcloud", "SoundCloud leftover", "Wave leftover.", "wave", "IG Android as SoundCloud", "pop4-soundcloud", "soundcloud"),
        ("L6", "pinabout", "Pinterest about leftover", "About leftover.", "about", "Stories as 2012", "pop5-pinabout", "pinterest about"),
        ("L6", "ipoabout", "IPO about leftover", "$38 leftover note.", "38", "IPO as gold", "pop5-ipoabout", "ipo 38"),
        ("L6", "igabout", "IG about leftover", "Android leftover note.", "android", "Stories as 2012", "pop5-igabout", "android leftover"),
        ("L7", "ytnote12", "YouTube leftover", "Visit leftover.", "watch", "IG as YouTube", "pop6-ytnote12", "youtube leftover"),
        ("L7", "twnote12", "Twitter leftover", "140 leftover.", "tweet", "Vine as 2012 gold", "pop6-twnote12", "twitter leftover"),
        ("L7", "tumblr12", "Tumblr leftover", "Dash leftover.", "dash", "Yahoo as 2012 gold", "pop6-tumblr12", "tumblr leftover"),
    ],
    2013: [
        ("L5", "healthcare", "Healthcare.gov leftover", "503 leftover.", "503", "Vine as healthcare", "pop4-healthcare", "503 leftover"),
        ("L5", "ouya", "OUYA leftover", "Android console leftover.", "ouya", "Vine as OUYA", "pop4-ouya", "ouya leftover"),
        ("L5", "xboxone", "Xbox One leftover", "Always-on leftover note.", "xbox", "Vine as Xbox", "pop4-xboxone", "xbox leftover"),
        ("L6", "vineabout", "Vine about leftover", "6s leftover note.", "six", "Stories as gold", "pop5-vineabout", "vine 6s"),
        ("L6", "snapabout", "Snap about leftover", "24h leftover note.", "story", "Stories as gold", "pop5-snapabout", "snap leftover"),
        ("L6", "ios7about", "iOS 7 leftover", "Flat leftover note.", "flat", "iOS 7 as gold", "pop5-ios7about", "flat leftover"),
        ("L7", "tumblr13", "Tumblr Yahoo leftover", "Yahoo leftover note.", "yahoo", "Vine as Tumblr", "pop6-tumblr13", "yahoo tumblr"),
        ("L7", "touchabout", "Touch ID leftover", "Hold leftover note.", "hold", "Face ID as 2013", "pop6-touchabout", "touch id"),
        ("L7", "teleabout", "Telegram leftover", "Cloud leftover note.", "cloud", "WhatsApp as 2013 gold", "pop6-teleabout", "telegram"),
    ],
    2014: [
        ("L5", "giphy", "Giphy leftover", "GIF leftover.", "gif", "WA as Giphy", "pop4-giphy", "giphy leftover"),
        ("L5", "swarm", "Swarm leftover", "Check-in leftover.", "swarm", "Foursquare as gold", "pop4-swarm", "swarm leftover"),
        ("L5", "alipay", "Alipay leftover", "Pay leftover.", "pay", "Apple Pay as gold", "pop4-alipay", "alipay leftover"),
        ("L6", "waabout", "WhatsApp about leftover", "Install leftover note.", "install", "Chat as gold", "pop5-waabout", "wa install"),
        ("L6", "iphone6about", "iPhone 6 leftover", "Bigger leftover note.", "plus", "iPhone 6 as gold", "pop5-iphone6about", "iphone 6"),
        ("L6", "materialabout", "Material leftover", "Paper leftover note.", "paper", "Material as gold", "pop5-materialabout", "material"),
        ("L7", "twitchabout", "Twitch leftover", "Stream leftover note.", "stream", "Twitch as gold", "pop6-twitchabout", "twitch leftover"),
        ("L7", "payabout", "Apple Pay leftover", "Pay leftover note.", "pay", "Apple Pay as gold", "pop6-payabout", "apple pay"),
        ("L7", "slackabout", "Slack leftover", "Channel leftover note.", "channel", "Slack as gold", "pop6-slackabout", "slack leftover"),
    ],
    2015: [
        ("L5", "amppage", "AMP leftover", "AMP leftover.", "amp", "Periscope as AMP", "pop4-amppage", "amp leftover"),
        ("L5", "adblock", "Adblock leftover", "Block leftover.", "block", "Periscope as adblock", "pop4-adblock", "adblock leftover"),
        ("L5", "leabout", "Let's Encrypt leftover", "Cert leftover.", "cert", "Periscope as LE", "pop4-leabout", "lets encrypt"),
        ("L6", "periabout", "Periscope about leftover", "Live leftover note.", "live", "Periscope as gold", "pop5-periabout", "go live"),
        ("L6", "photosabout", "Photos leftover", "Locker leftover note.", "locker", "Photos as gold", "pop5-photosabout", "photos locker"),
        ("L6", "watchabout", "Watch leftover", "Watch leftover note.", "watch", "Watch as gold", "pop5-watchabout", "watch leftover"),
        ("L7", "edgeabout", "Edge leftover", "Spartan leftover note.", "spartan", "Edge as gold", "pop6-edgeabout", "edge leftover"),
        ("L7", "discoverabout", "Discover leftover", "Discover leftover note.", "discover", "Discover as gold", "pop6-discoverabout", "discover leftover"),
        ("L7", "discordabout", "Discord leftover", "Server leftover note.", "server", "Discord as gold", "pop6-discordabout", "discord leftover"),
    ],
    2016: [
        ("L5", "alphago", "AlphaGo leftover", "Match leftover.", "match", "Stories as AlphaGo", "pop4-alphago", "alphago leftover"),
        ("L5", "superbowl", "Super Bowl leftover", "Ad leftover.", "ad", "Stories as Super Bowl", "pop4-superbowl", "super bowl"),
        ("L5", "pogoabout", "GO leftover", "Gym leftover note.", "gym", "GO as gold", "pop4-pogoabout", "pokemon go"),
        ("L6", "storyabout", "Stories about leftover", "24h leftover note.", "story", "Stories as gold", "pop5-storyabout", "24h leftover"),
        ("L6", "reactabout", "Reactions leftover", "React leftover note.", "react", "Reactions as gold", "pop5-reactabout", "reactions"),
        ("L6", "e2eabout", "E2E leftover", "Lock leftover note.", "lock", "E2E as gold", "pop5-e2eabout", "e2e leftover"),
        ("L7", "iphone7about", "iPhone 7 leftover", "Jack leftover note.", "jack", "iPhone 7 as gold", "pop6-iphone7about", "iphone 7"),
        ("L7", "spectabout", "Spectacles leftover", "Glass leftover note.", "glass", "Spectacles as gold", "pop6-spectabout", "spectacles"),
        ("L7", "win10end", "Win10 end leftover", "Upgrade leftover note.", "end", "Win10 as gold", "pop6-win10end", "upgrade ends"),
    ],
    2017: [
        ("L5", "notpetya", "NotPetya leftover", "Worm leftover.", "worm", "Face ID as NotPetya", "pop4-notpetya", "notpetya leftover"),
        ("L5", "hqtrivia", "HQ Trivia leftover", "Live leftover.", "live", "Face ID as HQ", "pop4-hqtrivia", "hq leftover"),
        ("L5", "bitmoji", "Bitmoji leftover", "Face leftover.", "face", "Face ID as Bitmoji", "pop4-bitmoji", "bitmoji leftover"),
        ("L6", "faceabout", "Face ID leftover", "Look leftover note.", "look", "Face ID as gold", "pop5-faceabout", "face id"),
        ("L6", "t280about", "280 leftover", "280 leftover note.", "280", "280 as gold", "pop5-t280about", "280 leftover"),
        ("L6", "musically17", "musical.ly leftover", "Lip leftover note.", "lip", "TikTok as 2017 gold", "pop5-musically17", "musically"),
        ("L7", "wannaabout", "WannaCry leftover", "Patch leftover note.", "patch", "WannaCry as gold", "pop6-wannaabout", "wannacry"),
        ("L7", "equifaxabout", "Equifax leftover", "Freeze leftover note.", "freeze", "Equifax as gold", "pop6-equifaxabout", "equifax"),
        ("L7", "pubgnote", "PUBG leftover", "Circle leftover note.", "circle", "Fortnite as gold", "pop6-pubgnote", "pubg leftover"),
    ],
    2018: [
        ("L5", "cambridge", "Hearing leftover", "Hearing leftover.", "hearing", "GDPR as hearing gold", "pop4-cambridge", "hearing leftover"),
        ("L5", "notsecure", "Not Secure leftover", "Chrome 68 leftover.", "http", "GDPR as Chrome gold", "pop4-notsecure", "not secure"),
        ("L5", "spectre18", "Spectre leftover", "CPU leftover.", "cpu", "GDPR as Spectre", "pop4-spectre18", "spectre leftover"),
        ("L6", "gdpra", "GDPR about leftover", "Manage leftover note.", "manage", "Accept All as gold", "pop5-gdpra", "manage leftover"),
        ("L6", "igtvabout", "IGTV leftover", "Long leftover note.", "igtv", "IGTV as gold", "pop5-igtvabout", "igtv leftover"),
        ("L6", "fypabout", "FYP leftover", "For You leftover note.", "fyp", "FYP as gold", "pop5-fypabout", "for you"),
        ("L7", "fnswitch", "Fortnite Switch leftover", "Switch leftover note.", "switch", "Fortnite as gold", "pop6-fnswitch", "fn switch"),
        ("L7", "githubms", "GitHub leftover", "$7.5B leftover note.", "github", "GitHub as gold", "pop6-githubms", "github leftover"),
        ("L7", "homepodabout", "HomePod leftover", "Siri leftover note.", "siri", "HomePod as gold", "pop6-homepodabout", "homepod"),
    ],
    2019: [
        ("L5", "dplusabout", "Disney+ leftover", "Who's watching leftover note.", "profile", "Disney+ as gold", "pop4-dplusabout", "whos watching"),
        ("L5", "marshnote", "Marshmello leftover", "In-game leftover.", "ingame", "Disney+ as Fortnite", "pop4-marshnote", "marshmello"),
        ("L5", "win10n", "Win10 leftover", "Residual leftover.", "win10", "Win11 as 2019 shell", "pop4-win10n", "win10 leftover"),
        ("L6", "chrome19", "Chrome leftover", "Habit leftover note.", "habit", "Chrome as gold", "pop5-chrome19", "chrome habit"),
        ("L6", "fn19", "Fortnite leftover", "Season leftover note.", "season", "Fortnite as gold", "pop5-fn19", "fortnite leftover"),
        ("L6", "tt19", "TikTok leftover", "US mass leftover note.", "us", "TikTok as gold", "pop5-tt19", "tiktok leftover"),
        ("L7", "airpodsabout", "AirPods Pro leftover", "Bud leftover note.", "buds", "AirPods as gold", "pop6-airpodsabout", "airpods pro"),
        ("L7", "stadiaabout", "Stadia leftover", "Wait leftover note.", "wait", "Stadia as gold", "pop6-stadiaabout", "stadia leftover"),
        ("L7", "arcadeabout", "Arcade leftover", "Card leftover note.", "card", "Arcade as gold", "pop6-arcadeabout", "arcade leftover"),
    ],
    2020: [
        ("L5", "reelsabout", "Reels leftover", "15s leftover note.", "reels", "Reels as gold", "pop4-reelsabout", "reels 15s"),
        ("L5", "gpt3about", "GPT-3 leftover", "Waitlist leftover note.", "waitlist", "ChatGPT as 2020", "pop4-gpt3about", "gpt-3 waitlist"),
        ("L5", "flashabout", "Flash leftover", "EOL leftover note.", "eol", "Flash as gold", "pop4-flashabout", "flash eol"),
        ("L6", "wtiabout", "WTI leftover", "−$37.63 leftover note.", "wti", "WTI as gold", "pop5-wtiabout", "wti leftover"),
        ("L6", "edge79about", "Edge 79 leftover", "Chromium leftover note.", "edge", "Edge as gold", "pop5-edge79about", "edge 79"),
        ("L6", "ccpaabout", "CCPA leftover", "Do not sell leftover note.", "ccpa", "CCPA as gold", "pop5-ccpaabout", "ccpa leftover"),
        ("L7", "amongabout", "Among Us leftover", "Sus leftover note.", "sus", "Among Us as gold", "pop6-amongabout", "sus leftover"),
        ("L7", "zoomabout", "Zoom leftover", "Join leftover note.", "join", "Join as gold", "pop6-zoomabout", "join leftover"),
        ("L7", "tteo", "TikTok EO leftover", "Order leftover note.", "eo", "Ban as gold", "pop6-tteo", "tiktok eo"),
    ],
    2021: [
        ("L5", "sigabout", "Signal leftover", "Jan leftover note.", "signal", "Signal as gold", "pop4-sigabout", "signal leftover"),
        ("L5", "copabout", "Copilot leftover", "Waitlist leftover note.", "wait", "Copilot as gold", "pop4-copabout", "copilot leftover"),
        ("L5", "metaabout", "Meta leftover", "Rename leftover note.", "meta", "Meta as gold", "pop4-metaabout", "meta leftover"),
        ("L6", "attabout", "ATT leftover", "Ask leftover note.", "ask", "Allow as gold", "pop5-attabout", "att leftover"),
        ("L6", "win11about", "Win11 leftover", "TPM leftover note.", "tpm", "Win11 as January shell", "pop5-win11about", "win11 leftover"),
        ("L6", "wordleseed", "Wordle seed leftover", "Seed leftover. NYT is 2022.", "seed", "Wordle as 2021 gold", "pop5-wordleseed", "wordle seed"),
        ("L7", "opensea", "OpenSea leftover", "NFT leftover note.", "nft", "NFT as gold", "pop6-opensea", "opensea leftover"),
        ("L7", "robinhood", "Robinhood leftover", "Meme leftover note.", "meme", "Robinhood as gold", "pop6-robinhood", "robinhood leftover"),
        ("L7", "discord21", "Discord leftover", "Server leftover note.", "server", "Discord as gold", "pop6-discord21", "discord leftover"),
    ],
    2022: [
        ("L5", "gptabout", "ChatGPT leftover", "Send leftover note. Plus is 2023.", "send", "Plus as 2022", "pop4-gptabout", "send leftover"),
        ("L5", "dalleabout", "DALL·E 2 leftover", "Preview leftover note.", "dalle2", "DALL·E 3 as 2022", "pop4-dalleabout", "dalle 2"),
        ("L5", "mastoabout", "Mastodon leftover", "Instance leftover note.", "instance", "X as 2022 gold", "pop4-mastoabout", "mastodon leftover"),
        ("L6", "berealabout", "BeReal leftover", "Two-min leftover note.", "twomin", "BeReal as gold", "pop5-berealabout", "bereal leftover"),
        ("L6", "chrome22", "Chrome leftover", "Habit leftover note.", "habit", "Chrome as gold", "pop5-chrome22", "chrome habit"),
        ("L6", "win10n22", "Win10 leftover", "Residual leftover note.", "win10", "Win11 as January shell", "pop5-win10n22", "win10 leftover"),
        ("L7", "notion22", "Notion leftover", "Doc leftover note.", "doc", "ChatGPT as Notion", "pop6-notion22", "notion leftover"),
        ("L7", "cail22", "Character.AI leftover", "Character leftover note.", "char", "ChatGPT as Character.AI", "pop6-cail22", "character leftover"),
        ("L7", "copilot22", "Copilot leftover", "Preview leftover note.", "copilot", "Copilot as gold", "pop6-copilot22", "copilot leftover"),
    ],
    2023: [
        ("L5", "claude2", "Claude 2 leftover", "11 Jul leftover. Not the chip.", "claude2", "Claude 3.5 as 2023 mass", "pop4-claude2", "claude 2"),
        ("L5", "characterai", "Character.AI leftover", "Character leftover.", "char", "Adult persona", "pop4-characterai", "character leftover"),
        ("L5", "copilotx", "Copilot X leftover", "2023 leftover. Not 2021 preview gold.", "copilotx", "Write itt21-copilot", "pop4-copilotx", "copilot x"),
        ("L6", "bluesky", "Bluesky leftover", "Invite leftover.", "invite", "X as Bluesky gold", "pop5-bluesky", "bluesky leftover"),
        ("L6", "notionai", "Notion AI leftover", "Prompt leftover.", "notion", "Plus from this dest", "pop5-notionai", "notion ai"),
        ("L6", "beacons", "Beacons leftover", "Link leftover.", "link", "Adult dest", "pop5-beacons", "beacons leftover"),
        ("L7", "plusabout", "Plus about leftover", "$20 leftover note.", "twenty", "Plus as 2022", "pop6-plusabout", "plus 20"),
        ("L7", "bardabout", "Bard about leftover", "Not Gemini leftover note.", "bard", "Gemini name", "pop6-bardabout", "bard leftover"),
        ("L7", "threadsabout", "Threads about leftover", "5 Jul leftover note.", "threads", "X wordmark", "pop6-threadsabout", "threads leftover"),
    ],
}


def densify_year(year: int) -> int:
    y = str(year)
    home = ROOT / "years" / y / "pages" / "home.html"
    if not home.exists():
        return 0
    created = 0
    strips = {"L5": [], "L6": [], "L7": []}
    rooms = []
    for layer, slug, title, blurb, pick, trap, suffix, ph in DENSIFY[year]:
        dest = ROOT / "years" / y / "sites" / slug / "index.html"
        if dest.exists():
            dest = ROOT / "years" / y / "sites" / slug / "pop.html"
            href = f"../sites/{slug}/pop.html"
        else:
            href = f"../sites/{slug}/index.html"
        css = "period-2022.css" if year >= 2022 else f"period-{year}.css"
        css_path = ROOT / "css" / css
        if not css_path.exists():
            css = "period-2022.css"
        html = pop_dest(y, slug, title, blurb, pick, trap, suffix, ph)
        html = html.replace("period-2022.css", css)
        html = html.replace(f"immersion-{y}.js", f"immersion-{y}.js")
        write(dest, html)
        created += 1
        strips[layer].append((href, title.split(" leftover")[0]))
        rooms.append(f"sites/{slug}/{dest.name}")

    ht = home.read_text(encoding="utf-8", errors="replace")
    if f'data-itt-pop-l5="{y}"' not in ht:
        block = []
        for layer, attr in (("L5", "pop-l5"), ("L6", "pop-l6"), ("L7", "pop-l7")):
            links = " · ".join(f'<a href="{h}">{n}</a>' for h, n in strips[layer])
            block.append(
                f'<p data-itt-{attr}="{y}" class="itt-{attr}" style="font-size:12px;margin:8px auto;max-width:720px">'
                f'<b>{layer} leftovers</b> (densify · not the chip · unique slugs): {links}'
                f' · pick + honesty · empty never writes</p>'
            )
        ht = ht.replace("</body>", "\n".join(block) + "\n</body>")
        home.write_text(ht, encoding="utf-8")

    cfg = ROOT / "js" / "config" / f"{y}.js"
    if cfg.exists():
        ct = cfg.read_text(encoding="utf-8")
        for room in rooms:
            if room not in ct and "var rooms = [" in ct:
                ct = ct.replace("var rooms = [", f'var rooms = [\n    "{room}",', 1)
        cfg.write_text(ct, encoding="utf-8")
    return created


def patch_ship() -> None:
    for rel in ("scripts/itt_gate.py", "scripts/check-all-years.py"):
        p = ROOT / rel
        t = p.read_text(encoding="utf-8")
        t = t.replace('_WIPED = {"2005", "2006", "2007", "2023"}', '_WIPED = {"2005", "2006", "2007"}')
        t = t.replace("range(1994, 2023)", "range(1994, 2024)")
        t = t.replace("2023+ not on disk. Museum ends 2022.", "2024+ not on disk. Museum ends 2023. 2005–2007 wiped.")
        p.write_text(t, encoding="utf-8")

    cay = ROOT / "scripts" / "check-all-years.py"
    t = cay.read_text(encoding="utf-8")
    if '"2023"' not in t.split("SIGNATURE")[1][:4000] if "SIGNATURE" in t else "":
        t = t.replace(
            '        "sites/playable/game.html",\n    ],\n}',
            '        "sites/playable/game.html",\n    ],\n'
            '    "2023": [\n'
            '        "pages/home.html",\n'
            '        "pages/about.html",\n'
            '        "sites/chatgpt/plus.html",\n'
            '        "sites/chatgpt/gpt4.html",\n'
            '        "sites/bing/chat.html",\n'
            '        "sites/bard/index.html",\n'
            '        "sites/playable/game.html",\n'
            '    ],\n}',
            1,
        )
        cay.write_text(t, encoding="utf-8")

    p = ROOT / "scripts" / "build-3x-links.py"
    t = p.read_text(encoding="utf-8")
    t = t.replace("YEARS = range(1994, 2023)", "YEARS = range(1994, 2024)")
    t = t.replace("LEAN_NO_LOBBY = set(range(2010, 2023))", "LEAN_NO_LOBBY = set(range(2010, 2024))")
    p.write_text(t, encoding="utf-8")


def patch_hub() -> None:
    p = ROOT / "index.html"
    t = p.read_text(encoding="utf-8")
    t = t.replace("26 years open", "27 years open")
    t = t.replace("1994–2022 (26 years on disk)", "1994–2023 (27 years on disk; 2005–2007 wiped)")
    t = t.replace("The museum ends in 2022.", "The museum ends in 2023.")
    t = t.replace("museum ends 2022", "museum ends 2023")
    card = """
      <a class="year-card available y2023" href="years/2023/" data-year="2023">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2023</p>
            <span class="era-chip">$20 · Plus · GPT-4</span>
          </div>
          <p class="label">ChatGPT Plus · GPT-4 leftover · Bing Chat · Bard leftover</p>
          <p class="scale">Table ends 2018 · Netcraft Jan 1,132,268,801 · Gemini is 2024</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>
"""
    if 'class="year-card available y2023"' not in t:
        t = t.replace(
            '      <a class="year-card available y2022" href="years/2022/" data-year="2022">',
            '      <a class="year-card available y2022" href="years/2022/" data-year="2022">',
            1,
        )
        # insert after 2022 card block
        marker = '          <p class="meta">Enter immersion</p>\n        </div>\n      </a>\n\n</div>'
        # last occurrence is after 2022
        idx = t.rfind('href="years/2022/"')
        if idx != -1:
            end = t.find("</a>", idx)
            end = t.find("\n", end) + 1
            t = t[:end] + card + t[end:]
    p.write_text(t, encoding="utf-8")


def patch_js_and_e2e() -> None:
    # registry
    reg = ROOT / "js" / "immersion" / "registry.js"
    t = reg.read_text(encoding="utf-8")
    if '"2023"' not in t:
        t = t.replace(
            '      "immersion/year-2022-extras.js",\n      "immersion/one-thing-machines.js"\n    ]',
            '      "immersion/year-2022-extras.js",\n      "immersion/one-thing-machines.js"\n    ],\n'
            '    "2023": [\n'
            '      "immersion/no-mock-common.js",\n'
            '      "immersion/year-2023-extras.js",\n'
            '      "immersion/one-thing-machines.js"\n'
            '    ]',
            1,
        )
        reg.write_text(t, encoding="utf-8")

    # flow-trails
    ft = ROOT / "js" / "config" / "flow-trails.js"
    t = ft.read_text(encoding="utf-8")
    if '"2023"' not in t:
        t = t.replace(
            '      {"n": 10, "name": "Prompt Box", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt22-game-prompt", "nextHref": "sites/chatgpt/index.html", "nextLabel": "ChatGPT"}\n    ]\n  };',
            '      {"n": 10, "name": "Prompt Box", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt22-game-prompt", "nextHref": "sites/chatgpt/index.html", "nextLabel": "ChatGPT"}\n    ],\n'
            '    "2023": [\n'
            '      {"n": 1, "name": "ChatGPT Plus", "href": "sites/chatgpt/plus.html", "match": "/chatgpt/plus", "whenKey": "itt23-chatgpt-plus", "nextHref": "sites/chatgpt/gpt4.html", "nextLabel": "GPT-4 leftover"},\n'
            '      {"n": 2, "name": "GPT-4 leftover", "href": "sites/chatgpt/gpt4.html", "match": "/chatgpt/gpt4", "whenKey": "itt23-gpt4", "nextHref": "sites/bing/chat.html", "nextLabel": "Bing Chat leftover"},\n'
            '      {"n": 3, "name": "Bing Chat leftover", "href": "sites/bing/chat.html", "match": "/bing/", "whenKey": "itt23-bingchat", "nextHref": "sites/bard/index.html", "nextLabel": "Bard leftover"},\n'
            '      {"n": 4, "name": "Bard leftover", "href": "sites/bard/index.html", "match": "/bard/", "whenKey": "itt23-bard", "nextHref": "sites/threads/index.html", "nextLabel": "Threads leftover"},\n'
            '      {"n": 5, "name": "Threads leftover", "href": "sites/threads/index.html", "match": "/threads/", "whenKey": "itt23-threads", "nextHref": "sites/twitter/x.html", "nextLabel": "X leftover"},\n'
            '      {"n": 6, "name": "X leftover", "href": "sites/twitter/x.html", "match": "/twitter/x", "whenKey": "itt23-x", "nextHref": "sites/chatgpt/index.html", "nextLabel": "Free residual"},\n'
            '      {"n": 7, "name": "Free residual", "href": "sites/chatgpt/index.html", "match": "/chatgpt/", "whenKey": "itt23-free", "nextHref": "sites/playable/game.html", "nextLabel": "Subscribe Dash"},\n'
            '      {"n": 8, "name": "Chrome habit", "href": "sites/chrome/index.html", "match": "/chrome/", "whenKey": "itt23-chrome", "nextHref": "sites/windows10/index.html", "nextLabel": "Windows 10"},\n'
            '      {"n": 9, "name": "Windows 10 residual", "href": "sites/windows10/index.html", "match": "/windows10/", "whenKey": "itt23-win10", "nextHref": "sites/playable/game.html", "nextLabel": "Subscribe Dash"},\n'
            '      {"n": 10, "name": "Subscribe Dash", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt23-game-subscribe", "nextHref": "sites/chatgpt/plus.html", "nextLabel": "ChatGPT Plus"}\n'
            '    ]\n  };',
            1,
        )
        ft.write_text(t, encoding="utf-8")

    # playable
    yp = ROOT / "js" / "config" / "year-playable.js"
    t = yp.read_text(encoding="utf-8")
    if '"2023"' not in t:
        t = t.replace(
            '      accent: "#10a37f"\n    }\n  };',
            '      accent: "#10a37f"\n    },\n'
            '    "2023": {\n'
            '      id: "subscribe",\n'
            '      title: "Subscribe Dash",\n'
            '      href: "game.html",\n'
            '      key: "itt23-game-subscribe",\n'
            '      inspire: "Theater subscribe — not a live checkout · Plus is the gold dest",\n'
            '      blurb: "Type twenty. Incomplete never writes.",\n'
            '      why: "Plus is the door. The game is a theater box, not Stripe.",\n'
            '      era: "Subscribe is the save. Gemini is next year.",\n'
            '      famous: "Brick Bat + Concentration",\n'
            '      accent: "#0e7a0d"\n'
            '    }\n  };',
            1,
        )
        yp.write_text(t, encoding="utf-8")

    # extra games CDE
    yg = ROOT / "js" / "config" / "year-extra-games.js"
    t = yg.read_text(encoding="utf-8")
    if "itt23-game-wordguess" not in t and "itt23-game-pluswait" not in t:
        t = t.replace(
            "  /* ITT-3G:end */",
            '  ;(ITT.yearExtraGames[\'2023\'] = ITT.yearExtraGames[\'2023\'] || []).push({id:\'pluswait\',title:\'Plus Wait\',href:"extra-c.html",key:"itt23-game-pluswait"});\n'
            '  ;(ITT.yearExtraGames[\'2023\'] = ITT.yearExtraGames[\'2023\'] || []).push({id:\'bardask\',title:\'Bard Ask\',href:"extra-d.html",key:"itt23-game-bardask"});\n'
            '  ;(ITT.yearExtraGames[\'2023\'] = ITT.yearExtraGames[\'2023\'] || []).push({id:\'xnote\',title:\'X Note\',href:"extra-e.html",key:"itt23-game-xnote"});\n'
            "  /* ITT-3G:end */",
            1,
        )
        yg.write_text(t, encoding="utf-8")

    # extra-cde matrix
    cde_path = ROOT / "e2e" / "year-extra-cde.matrix.json"
    cde = json.loads(cde_path.read_text(encoding="utf-8"))
    if not any(r.get("year") == "2023" for r in cde):
        cde.extend([
            {"year": "2023", "role": "c", "path": "/years/2023/sites/playable/extra-c.html", "key": "itt23-game-pluswait", "id": "pluswait", "kind": "parlor", "title": "Plus Wait", "next": "/years/2023/sites/playable/extra-d.html"},
            {"year": "2023", "role": "d", "path": "/years/2023/sites/playable/extra-d.html", "key": "itt23-game-bardask", "id": "bardask", "kind": "parlor", "title": "Bard Ask", "next": "/years/2023/sites/playable/extra-e.html"},
            {"year": "2023", "role": "e", "path": "/years/2023/sites/playable/extra-e.html", "key": "itt23-game-xnote", "id": "xnote", "kind": "parlor", "title": "X Note", "next": "/years/2023/sites/playable/game.html"},
        ])
        cde_path.write_text(json.dumps(cde, indent=2) + "\n", encoding="utf-8")

    # retarget 2023 extra-c/d/e data attributes after copy
    for role, gid, title, key in (
        ("c", "pluswait", "Plus Wait", "itt23-game-pluswait"),
        ("d", "bardask", "Bard Ask", "itt23-game-bardask"),
        ("e", "xnote", "X Note", "itt23-game-xnote"),
    ):
        p = ROOT / "years" / "2023" / "sites" / "playable" / f"extra-{role}.html"
        t = p.read_text(encoding="utf-8")
        t = re.sub(r'data-game-id="[^"]+"', f'data-game-id="{gid}"', t)
        t = re.sub(r"itt23-game-[a-z0-9]+", key, t)
        t = re.sub(r"<h1>[^<]+</h1>", f"<h1>{title} — 2023</h1>", t, count=1)
        p.write_text(t, encoding="utf-8")

    # atlas
    ad = ROOT / "js" / "atlas-data.js"
    t = ad.read_text(encoding="utf-8")
    t = t.replace("Museum ends 2022.", "Museum ends 2023.")
    if '"2023"' not in t.split("var OPEN")[1][:800]:
        t = t.replace('"2021", "2022"\n  ];', '"2021", "2022", "2023"\n  ];')
    if '"2023":' not in t:
        t = t.replace(
            '        game: { label: "Prompt Box", href: "years/2022/sites/playable/game.html" }\n      }\n    },',
            '        game: { label: "Prompt Box", href: "years/2022/sites/playable/game.html" }\n      },\n'
            '      "2023": {\n'
            '        era: "Win11 residual · Chrome habit · Plus $20",\n'
            '        thesis: "Subscribe is the save. Empty / stay free / GPT-4o / Gemini never write.",\n'
            '        gold: { label: "ChatGPT Plus $20", href: "years/2023/sites/chatgpt/plus.html", key: "itt23-chatgpt-plus" },\n'
            '        guided: [\n'
            '          { label: "GPT-4 leftover", href: "years/2023/sites/chatgpt/gpt4.html" },\n'
            '          { label: "Bing Chat leftover", href: "years/2023/sites/bing/chat.html" }\n'
            '        ],\n'
            '        game: { label: "Subscribe Dash", href: "years/2023/sites/playable/game.html" }\n'
            '      }\n    },',
            1,
        )
    ad.write_text(t, encoding="utf-8")

    aj = ROOT / "js" / "atlas.js"
    t = aj.read_text(encoding="utf-8")
    t = t.replace("y <= 2022", "y <= 2023")
    aj.write_text(t, encoding="utf-8")

    # museum-progress
    mp = ROOT / "js" / "museum-progress.js"
    t = mp.read_text(encoding="utf-8")
    if '"2023":' not in t:
        t = t.replace(
            '      { path: "sites/twitter/index.html", label: "Twitter leftover", blurb: "$44B. Still Twitter. X is 2023.", match: "/twitter/" }),\n  };',
            '      { path: "sites/twitter/index.html", label: "Twitter leftover", blurb: "$44B. Still Twitter. X is 2023.", match: "/twitter/" }),\n'
            '    "2023": yearVisitTour("2023",\n'
            '      { path: "sites/chatgpt/plus.html", label: "ChatGPT Plus $20", blurb: "Stay free never writes. $20 Subscribe does.", match: "/chatgpt/plus" },\n'
            '      { path: "sites/chatgpt/gpt4.html", label: "GPT-4 leftover", blurb: "14 Mar. Plus-only. Not GPT-4o.", match: "/chatgpt/gpt4" }),\n  };',
            1,
        )
    t = t.replace("for (y = 1994; y <= 2022; y++) {\n      if (y === 2023) continue;",
                  "for (y = 1994; y <= 2023; y++) {\n      if (y === 2005 || y === 2006 || y === 2007) continue;")
    t = t.replace("for (y = 1994; y <= 2022; y++) {\n      if (y === 2005 || y === 2006 || y === 2007 || y === 2023) continue;",
                  "for (y = 1994; y <= 2023; y++) {\n      if (y === 2005 || y === 2006 || y === 2007) continue;")
    mp.write_text(t, encoding="utf-8")

    # one-thing
    ot = ROOT / "e2e" / "one-thing-per-year.spec.js"
    t = ot.read_text(encoding="utf-8")
    if "2023" not in t.split("THINGS")[1][:8000]:
        t = t.replace(
            """    complete: async (page) => {
      await page.fill("[data-gpt22-prompt]", "explain leftover");
      await page.locator("[data-gpt22-send]").click();
    },
  },
];""",
            """    complete: async (page) => {
      await page.fill("[data-gpt22-prompt]", "explain leftover");
      await page.locator("[data-gpt22-send]").click();
    },
  },
  {
    year: "2023",
    path: "/years/2023/sites/chatgpt/plus.html",
    key: "itt23-chatgpt-plus",
    incomplete: async (page) => {
      await page.locator("[data-plus-go]").click();
    },
    complete: async (page) => {
      await page.locator('[data-plus-pick="20"]').click();
      const reqs = page.locator("[data-plus-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("[data-plus-go]").click();
    },
  },
];""",
            1,
        )
        ot.write_text(t, encoding="utf-8")

    # hub-years
    hy = ROOT / "e2e" / "hub-years.spec.js"
    t = hy.read_text(encoding="utf-8")
    t = t.replace("'2020', '2021', '2022',", "'2020', '2021', '2022', '2023',")
    t = t.replace("26 years open", "27 years open")
    t = t.replace("hub lists playable years; 2022+ off disk", "hub lists playable years; 2024+ off disk")
    t = t.replace("await expect(page.locator('.year-card.locked.y2023, .year-card.y2023')).toHaveCount(0);",
                  "await expect(page.locator('a.year-card.available[href*=\"years/2023\"]')).toBeVisible();\n    await expect(page.locator('.year-card.locked.y2023')).toHaveCount(0);")
    t = t.replace("await page.evaluate(() => localStorage.setItem('itt-last-year', '2023'));",
                  "await page.evaluate(() => localStorage.setItem('itt-last-year', '2024'));")
    hy.write_text(t, encoding="utf-8")

    for rel in (
        "e2e/3x-links.spec.js",
        "e2e/year-2010-plus-3x-unique.spec.js",
        "e2e/year-more-3x.spec.js",
        "e2e/year-start-trails.spec.js",
    ):
        p = ROOT / rel
        if not p.exists():
            continue
        t = p.read_text(encoding="utf-8")
        t = t.replace("y <= 2022", "y <= 2023")
        p.write_text(t, encoding="utf-8")

    # sitemap
    sm = ROOT / "sitemap.txt"
    if sm.exists():
        t = sm.read_text(encoding="utf-8")
        if "years/2023/" not in t:
            t = t.rstrip() + "\n/years/2023/\n/years/2023/pages/home.html\n/years/2023/sites/chatgpt/plus.html\n"
            sm.write_text(t, encoding="utf-8")

    # README ship law
    rd = ROOT / "docs" / "README.md"
    t = rd.read_text(encoding="utf-8")
    t = t.replace("**26 years** · 1994–2022 minus **2005–2007 wiped**",
                  "**27 years** · 1994–2023 minus **2005–2007 wiped**")
    t = t.replace("**2023 absent**", "**2023 live lean door**")
    rd.write_text(t, encoding="utf-8")

    rf = ROOT / "docs" / "2023-READ-FIRST.md"
    t = rf.read_text(encoding="utf-8")
    t = t.replace("**Status:** research only. **`years/2023/` is absent.** Do not scaffold until you say **implement 2023**.",
                  "**Status:** first door on disk 2026-08-24. Densify later if named.")
    rf.write_text(t, encoding="utf-8")


def main() -> None:
    print("== 2023 first door ==")
    implement_2023()
    print("== densify leftover dests ==")
    total = 0
    for y in range(2010, 2024):
        n = densify_year(y)
        total += n
        print(f"  {y} +{n}")
    print("== ship / hub / e2e ==")
    patch_ship()
    patch_hub()
    patch_js_and_e2e()
    print(f"done. densify dests={total}")


if __name__ == "__main__":
    main()
