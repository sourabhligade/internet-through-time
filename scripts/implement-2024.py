#!/usr/bin/env python3
"""Implement 2024 lean door from live 2023 shape."""
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
        ('data-itt-year="2023"', 'data-itt-year="2024"'),
        ("itt23-", "itt24-"),
        ("immersion-2023.js", "immersion-2024.js"),
        ("browser-2023.js", "browser-2024.js"),
        ("js/config/2023.js", "js/config/2024.js"),
        ("year-2023", "year-2024"),
        ("yg-year-2023", "yg-year-2024"),
        ("ott-guided-2023", "ott-guided-2024"),
        ('data-ott-one-thing="2023"', 'data-ott-one-thing="2024"'),
        ('data-itt-pop3x="2023"', 'data-itt-pop3x="2024"'),
        ('data-itt-pop-more="2023"', 'data-itt-pop-more="2024"'),
        ('data-itt-pop-3x3="2023"', 'data-itt-pop-3x3="2024"'),
        ('data-itt-year-extras="2023"', 'data-itt-year-extras="2024"'),
        ('data-itt-mass="2023"', 'data-itt-mass="2024"'),
        ("years/2023/", "years/2024/"),
        ("web2023", "web2024"),
        ('class="year-2023', 'class="year-2024'),
        ('ITT.bootBrowserYear("2023")', 'ITT.bootBrowserYear("2024")'),
        ('ITT.configs["2023"]', 'ITT.configs["2024"]'),
        ('storagePrefix: "itt23"', 'storagePrefix: "itt24"'),
        ("itt-2023-", "itt-2024-"),
        ('data-year="2023"', 'data-year="2024"'),
        ('data-itt-3x-also data-itt-year="2023"', 'data-itt-3x-also data-itt-year="2024"'),
        ("Welcome to the World Wide Web — 2023", "Welcome to the World Wide Web — 2024"),
        ("Chrome habit — 2023", "Chrome habit — 2024"),
    ]
    for a, b in reps:
        text = text.replace(a, b)
    return text


def ytl(year: str, title: str, key: str, need: str, pick: str, trap: str, field: str, ph: str, need_field: str, req: str, go: str) -> str:
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
<p hidden data-next-flow data-next-when-key="itt24-{key}"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
</div>
<script src="../../../../js/immersion-2024.js"></script>
</body>
</html>
"""


def main() -> None:
    src = ROOT / "years" / "2023"
    dst = ROOT / "years" / "2024"
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    for p in dst.rglob("*"):
        if p.is_file() and p.suffix in {".html", ".js"}:
            p.write_text(retarget(p.read_text(encoding="utf-8", errors="replace")), encoding="utf-8")

    cfg = (ROOT / "js" / "config" / "2023.js").read_text(encoding="utf-8")
    cfg = cfg.replace("2023", "2024").replace("itt23", "itt24").replace("web2023", "web2024")
    write(ROOT / "js" / "config" / "2024.js", cfg)
    write(ROOT / "js" / "browser-2024.js", """/**
 * Browser year stub — 2024
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2024");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2024"]) {
    console.error("ITT 2024 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2024"]);
})();
""")
    write(ROOT / "js" / "immersion-2024.js", """/**
 * Immersion year stub — 2024
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2024";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
""")
    write(
        ROOT / "js" / "config" / "immersion-2024.js",
        (ROOT / "js" / "config" / "immersion-2023.js")
        .read_text(encoding="utf-8")
        .replace("2023", "2024")
        .replace("itt23", "itt24")
        .replace("year2023Extras", "year2024Extras")
        .replace("ChatGPT Plus", "GPT-4o Talk")
        .replace("sites/chatgpt/plus.html", "sites/chatgpt/4o.html")
        .replace("sites/chatgpt/gpt4.html", "sites/gemini/index.html")
        .replace("sites/bing/chat.html", "sites/claude35/index.html")
        .replace("sites/bard/index.html", "sites/sora/index.html")
        .replace("Plus", "4o")
        .replace("GPT-4 leftover", "Gemini leftover")
        .replace("Subscribe $20 is the save", "Talk is the save · 4o is omni and free-class"),
    )

    write(
        ROOT / "years" / "2024" / "sites" / "chatgpt" / "4o.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>GPT-4o Talk — 2024</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-recon-gold" data-recon="gpt4o"><b>RECON frame</b> RECON · omni chrome · no OpenAI mark</div>
<div style="max-width:32em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>GPT-4o Talk</h1>
<p><b>13 May 2024</b>. Omni — audio, vision, text. Free-class in ChatGPT (limits). Not Plus-only. Not GPT-5. This is not a live model. No official OpenAI pixels.</p>
<p class="itt-pixel-failed">[failed-final] talk sheet · no OpenAI wordmark</p>
<p>
 <button type="button" data-4o-pick="gpt4">Stay on GPT-4</button>
 <button type="button" data-4o-pick="4o">GPT-4o</button>
</p>
<label style="display:block"><input type="checkbox" data-4o-req> Omni · 13 May 2024 — not a 2023 product</label>
<label style="display:block"><input type="checkbox" data-4o-req> Free-class — not Plus-only</label>
<p>
 <button type="button" data-4o-go>Talk</button>
 <button type="button" data-4o-trap="gpt5">GPT-5 (trap)</button>
 <button type="button" data-4o-trap="was23">4o was 2023 (trap)</button>
 <button type="button" data-4o-trap="apple">Apple Intelligence January (trap)</button>
</p>
<p data-4o-status></p>
<p hidden data-next-flow data-next-when-key="itt24-gpt4o"><b>Next:</b> <a href="../gemini/index.html">Gemini leftover</a></p>
</div>
<script src="../../../../js/immersion-2024.js"></script>
</body>
</html>
""",
    )

    leftovers = [
        ("gemini/index.html", "Gemini leftover", "gemini", "gemini", "Ask Gemini leftover", "Bard as 2024 name", "Ask", "ask gemini", "ask gemini", "8 Feb 2024 · Bard is the old name", "Ask leftover"),
        ("claude35/index.html", "Claude 3.5 leftover", "claude35", "sonnet", "Ask Claude 3.5 leftover", "Claude 2 as 2024 gold", "Prompt", "claude 3.5 leftover", "claude 3.5 leftover", "June 2024 leftover · not the chip", "Ask leftover"),
        ("sora/index.html", "Sora leftover", "sora", "preview", "Preview leftover", "Public download (trap)", "Note", "sora preview", "sora preview", "Feb 2024 preview · not public mass", "Ack leftover"),
        ("appleintel/index.html", "Apple Intelligence leftover", "appleintel", "late", "Late-ship leftover", "January shell (trap)", "Note", "ios 18.1 leftover", "ios 18.1 leftover", "WWDC leftover · not January desktop", "Ack leftover"),
        ("o1/index.html", "o1 leftover", "o1", "preview", "o1 preview leftover", "Treat as gold (trap)", "Note", "o1 preview", "o1 preview", "Sep 2024 leftover · not the chip", "Ack leftover"),
        ("chatgpt/plus.html", "Plus residual", "plus", "residual", "Plus is 2023 leftover", "Steal itt23-chatgpt-plus (trap)", "Note", "plus residual", "plus residual", "2023 Subscribe still next door", "Ack leftover"),
    ]
    for rel, title, key, need, pick, trap, field, ph, nf, req, go in leftovers:
        write(ROOT / "years" / "2024" / "sites" / rel, ytl("2024", title, key, need, pick, trap, field, ph, nf, req, go))

    write(
        ROOT / "years" / "2024" / "pages" / "home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2024</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:12px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px">
<p><a data-ott-one-thing="2024" href="../sites/chatgpt/4o.html" style="display:inline-block;padding:5px 12px;background:#10a37f;color:#fff;border-radius:14px;text-decoration:none;font-weight:bold">★ One-thing · GPT-4o Talk REAL</a></p>
<div class="ott-guided" id="ott-guided-2024" style="margin:12px 0;padding:14px;background:#111;color:#f5f5f7;border-radius:6px">
 <b>▶ Guided flow · 2024</b>
 <ol style="margin:8px 0 0;padding-left:1.3em;line-height:1.7">
  <li><a href="about.html" style="color:#aed6f1">About 2024</a> — 4o · Gemini · ILS ban</li>
  <li><a href="../sites/chatgpt/4o.html" style="color:#aed6f1">GPT-4o Talk</a> — omni · free-class</li>
  <li><a href="../sites/gemini/index.html" style="color:#aed6f1">Gemini leftover</a> — not Bard</li>
  <li><a href="../sites/claude35/index.html" style="color:#aed6f1">Claude 3.5 leftover</a> — June</li>
  <li><a href="../sites/sora/index.html" style="color:#aed6f1">Sora leftover</a> — preview</li>
  <li><a href="map.html" style="color:#aed6f1">Year flow map</a></li>
 </ol>
</div>
<p class="itt-mass-honesty" data-itt-mass="2024" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em"><b>No June websites cell.</b> Live Stats table ends 2018 at 1,630,322,579. Netcraft January 2024: <b>1,079,154,539</b> hostnames. ITU 2024 report: <b>5.5 billion / 68%</b>. GPT-5 is not 2024 mass. Apple Intelligence is leftover, not the January shell.</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a1a1a" style="border:2px solid #10a37f">
<tr bgcolor="#111"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — 2024</b> · Win11 residual · Chrome habit · GPT-4o
</td></tr>
<tr bgcolor="#d5f5e3"><td style="padding:8px 12px">
 <b>Talk is the save. Empty / GPT-5 / 4o-as-2023 never write.</b>
 13 May 2024 · omni · free-class. Bard is Gemini. Plus is 2023.
</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <div data-itt-tour></div>
 <p><a href="map.html"><b>2024 UX flow map</b></a></p>
 <p class="itt-playable-link" data-itt-year-extras="2024" style="padding:8px;border:2px solid #333;background:#ffc"><b>▶ Play this year’s game</b> — <a href="../sites/playable/game.html"><b>Omni Dash</b></a> · <a href="../sites/playable/famous.html">Famous games</a> · extras: <a href="../sites/playable/extra-a.html">Talk drill</a> · <a href="../sites/playable/extra-b.html">Gemini wait</a></p>
 <p>
  <a href="../sites/chatgpt/4o.html">GPT-4o</a> ·
  <a href="../sites/gemini/index.html">Gemini</a> ·
  <a href="../sites/claude35/index.html">Claude 3.5</a> ·
  <a href="../sites/sora/index.html">Sora</a>
 </p>
 <p style="font-size:12px;color:#444">Also 2024:
  <a href="../sites/appleintel/index.html">Apple Intelligence leftover</a> ·
  <a href="../sites/o1/index.html">o1 leftover</a> ·
  <a href="../sites/chatgpt/plus.html">Plus residual</a> ·
  <a href="../sites/chrome/index.html">Chrome habit</a>
 </p>
 <p class="itt-year-true-pack" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px;border:1px dashed #666"><b>Continuity leftover (not the one-thing):</b>
  2023 Plus still exists next door and writes <b>itt23-chatgpt-plus</b> only.
  GPT-5 / DeepSeek US mass are <b>not</b> 2024 defaults.
 </p>
</td></tr>
</table>
</div>
<p data-itt-pop3x="2024" class="itt-pop3x" style="font-size:12px;margin:10px auto;padding:6px 0;max-width:720px">Also popular in 2024 (leftover trail, not the chip): <a href="../sites/youtube/index.html">YouTube</a> → <a href="../sites/wikipedia/index.html">Wikipedia</a> → <a href="../sites/facebook/index.html">Facebook</a></p>
<p data-itt-pop-more="2024" class="itt-pop-more" style="font-size:12px;margin:8px auto;max-width:720px"><b>3 more leftovers</b>: <a href="../sites/tiktok/index.html">TikTok leftover</a> ·
 <a href="../sites/midjourney/index.html">Midjourney leftover</a> ·
 <a href="../sites/lensa/index.html">Lensa leftover</a></p>
<p data-itt-pop-3x3="2024" class="itt-pop-3x3" style="font-size:12px;margin:8px auto;max-width:720px">
 <b>3 more leftovers</b> (third trio):
 <a href="../sites/claude2/index.html">Claude 2 residual</a> ·
 <a href="../sites/bluesky/index.html">Bluesky leftover</a> ·
 <a href="../sites/threads/index.html">Threads residual</a>
</p>
<script src="../../../js/immersion-2024.js"></script>
</body>
</html>
""",
    )

    write(
        ROOT / "years" / "2024" / "pages" / "about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2024">
<head>
<meta charset="utf-8">
<title>About 2024 — dual scale · bans</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2024</h1>
<p><b>Talk is the save — empty / GPT-5 / 4o-as-2023 never write — while the Live Stats June table still ends at 2018 and Netcraft January 2024 is 1,079,154,539 hostnames.</b></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#d5f5e3"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b>. <b>No June 2024 websites digit.</b></td></tr>
<tr><td>Netcraft January 2024</td><td><b>1,079,154,539</b> hostnames · <b>270,447,456</b> domains · <b>12,337,710</b> computers — <b>January</b>, never June</td></tr>
<tr><td>ITU 2024 report</td><td><b>5.5 billion</b> / <b>68%</b> people online — labeled 2024 report cell</td></tr>
<tr><td>GPT-4o</td><td><b>13 May 2024</b> · omni · free-class</td></tr>
<tr><td>Gemini</td><td>Bard renamed <b>8 Feb 2024</b></td></tr>
<tr><td>Claude 3.5 Sonnet</td><td><b>20/21 Jun 2024</b></td></tr>
</table>
<h2>Bans — not 2024 defaults</h2>
<ul>
<li>GPT-5 as 2024 mass · DeepSeek as 2024 US mass</li>
<li>Treat 4o as a 2023 product · Bard as 2024 default name</li>
<li>Apple Intelligence as January OS</li>
<li>Invent ILS June 2024 websites · 7th guided step · brand pixels · ripped weights</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read that GPT-4o is 13 May 2024, omni, and free-class — not Plus-only.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know Bard is Gemini, Apple Intelligence is leftover, and there is no June 2024 ILS websites digit.</label>
<p><button type="button" data-thesis-save>Save thesis literacy</button> <span data-thesis-status></span></p>
</section>
<p><a href="home.html">Starting Point</a> · <a href="../sites/chatgpt/4o.html">★ GPT-4o</a></p>
</div>
<script src="../../../js/immersion-2024.js"></script>
</body>
</html>
""",
    )

    write(
        ROOT / "js" / "immersion" / "year-2024-extras.js",
        """/**
 * 2024 lean extras — GPT-4o star
 * Keys: itt24-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2024");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2024 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2024", ts: Date.now() };
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

  function boot4o(doc) {
    var go = doc.querySelector("[data-4o-go]");
    if (!go) return;
    var st = doc.querySelector("[data-4o-status]");
    var picked = "";
    var picks = doc.querySelectorAll("[data-4o-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        picked = this.getAttribute("data-4o-pick") || "";
        feedback(picked === "4o" ? "Picked GPT-4o." : "Stay on GPT-4 never writes 4o.", st, { error: picked !== "4o" });
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
    trap('[data-4o-trap="gpt5"]', "GPT-5 is not 2024 mass. That click never writes.");
    trap('[data-4o-trap="was23"]', "GPT-4o is 13 May 2024. 2023 is Plus. That click never writes.");
    trap('[data-4o-trap="apple"]', "Apple Intelligence is leftover, not the January shell. That click never writes.");
    var saved = YX.loadJSON(key("gpt4o"));
    if (saved && saved.real) {
      feedback("4o leftover · " + key("gpt4o"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      if (picked !== "4o") {
        feedback("Pick GPT-4o first. Empty / GPT-4 never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-4o-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("gpt4o"), blob({ omni: true, freeClass: true, date: "2024-05-13", gpt5: false }));
      feedback("GPT-4o Talk · " + key("gpt4o"), st);
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
        feedback("GPT-5 is not 2024 mass. That click never writes.", st, { error: true });
      });
    }
    if (!btn) return;
    var saved = YX.loadJSON(key("extra-a"));
    if (saved && saved.real) {
      feedback("Talk drill leftover · " + key("extra-a"), st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      n++;
      if (n < 3) {
        feedback("Tap Talk three times. " + n + "/3 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-a"), blob({ taps: 3 }));
      feedback("Talk drill leftover · " + key("extra-a"), st);
      reveal(doc);
    });
  }

  function bootExtraB(doc) {
    var go = doc.querySelector("[data-extra-b-save]");
    var st = doc.querySelector("[data-extra-b-status]");
    if (!go) return;
    var saved = YX.loadJSON(key("extra-b"));
    if (saved && saved.real) {
      feedback("Gemini leftover · " + key("extra-b"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-extra-b-field]");
      if (!q || q.replace(/\\s/g, "").toLowerCase() !== "gemini") {
        feedback("Type gemini first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-b"), blob({ gemini: true, date: "2024-02-08" }));
      feedback("Gemini leftover · " + key("extra-b"), st);
      reveal(doc);
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    boot4o(doc);
    bootExtraA(doc);
    bootExtraB(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2024-extras", featureKey: "year2024Extras", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
""",
    )

    write(
        ROOT / "js" / "games" / "year-2024-omni.js",
        """/**
 * Omni Dash — 2024 museum year game.
 * Storage: itt24-game-omni
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="omni"]');
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
    setStatus("Tick both honesties. Type omni. Empty never writes.");
  });
  if (goBtn) goBtn.addEventListener("click", function () {
    if (!running) { setStatus("New Game first."); return; }
    if (ticks() < 2) { setStatus("Tick both honesties first. Incomplete never writes."); return; }
    var word = field ? String(field.value || "").replace(/^\\s+|\\s+$/g, "") : "";
    if (word.replace(/\\s/g, "").toLowerCase() !== "omni") {
      setStatus("Type omni first. Empty never writes.");
      return;
    }
    if (scoreEl) scoreEl.textContent = "4";
    try {
      localStorage.setItem("itt24-game-omni", JSON.stringify({
        real: true, multiStep: true, year: "2024", omni: true, ts: Date.now()
      }));
    } catch (e) { /* */ }
    running = false;
    setStatus("Omni Dash leftover · itt24-game-omni");
    try { if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document); } catch (e2) { /* */ }
  });
})();
""",
    )

    game = (ROOT / "years" / "2024" / "sites" / "playable" / "game.html").read_text(encoding="utf-8")
    game = game.replace("Subscribe Dash", "Omni Dash")
    game = game.replace("Prompt Box", "Omni Dash")
    game = re.sub(r'data-game-id="[^"]+"', 'data-game-id="omni"', game)
    game = game.replace("year-2023-subscribe.js", "year-2024-omni.js")
    game = game.replace("year-2024-subscribe.js", "year-2024-omni.js")
    game = game.replace("itt24-game-subscribe", "itt24-game-omni")
    game = game.replace("itt24-game-prompt", "itt24-game-omni")
    game = game.replace("../chatgpt/plus.html", "../chatgpt/4o.html")
    game = game.replace("../chatgpt/index.html", "../chatgpt/4o.html")
    write(ROOT / "years" / "2024" / "sites" / "playable" / "game.html", game)

    extra_a = (ROOT / "years" / "2024" / "sites" / "playable" / "extra-a.html").read_text(encoding="utf-8")
    extra_a = extra_a.replace("Plus drill", "Talk drill").replace("Send drill", "Talk drill")
    extra_a = extra_a.replace("GPT-4o (trap)", "GPT-5 (trap)")
    extra_a = extra_a.replace(">Subscribe<", ">Talk<").replace(">Send<", ">Talk<")
    extra_a = extra_a.replace("Preview wait", "Gemini wait")
    write(ROOT / "years" / "2024" / "sites" / "playable" / "extra-a.html", extra_a)
    extra_b = (ROOT / "years" / "2024" / "sites" / "playable" / "extra-b.html").read_text(encoding="utf-8")
    extra_b = extra_b.replace("Preview wait", "Gemini wait").replace("1 million", "Gemini wait")
    extra_b = extra_b.replace("preview", "gemini").replace("million", "gemini")
    write(ROOT / "years" / "2024" / "sites" / "playable" / "extra-b.html", extra_b)

    idx = (ROOT / "years" / "2024" / "index.html").read_text(encoding="utf-8")
    idx = idx.replace("sites/chatgpt/plus.html", "sites/chatgpt/4o.html")
    idx = idx.replace("sites/chatgpt/index.html", "sites/chatgpt/4o.html")
    idx = idx.replace(">Plus<", ">4o<").replace(">ChatGPT<", ">4o<")
    idx = idx.replace("ChatGPT Plus $20", "GPT-4o Talk")
    idx = idx.replace("Subscribe $20 is the save", "Talk is the save · empty / GPT-5 / 4o-as-2023 never write.")
    write(ROOT / "years" / "2024" / "index.html", idx)

    # rooms in config
    c = (ROOT / "js" / "config" / "2024.js").read_text(encoding="utf-8")
    for room in [
        "sites/chatgpt/4o.html",
        "sites/gemini/index.html",
        "sites/claude35/index.html",
        "sites/sora/index.html",
        "sites/appleintel/index.html",
        "sites/o1/index.html",
    ]:
        if room not in c:
            c = c.replace('    "sites/chatgpt/plus.html",', f'    "{room}",\n    "sites/chatgpt/plus.html",', 1)
    c = c.replace('title: "ChatGPT Plus", path: "sites/chatgpt/plus.html"',
                  'title: "GPT-4o", path: "sites/chatgpt/4o.html"')
    write(ROOT / "js" / "config" / "2024.js", c)

    print("2024 tree ready", len(list((ROOT / "years" / "2024").rglob("*.html"))), "html")


if __name__ == "__main__":
    main()
