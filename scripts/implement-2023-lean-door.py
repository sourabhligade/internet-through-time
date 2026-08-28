#!/usr/bin/env python3
"""2023 lean door from scratch. Clone 2022 shell. Do not restore a forest.

Star: ChatGPT Plus Subscribe · 1 Feb 2023 · $20 · itt23-plus
Incomplete never writes. No official brand pixels. Guided 6. HTML lean.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2023"

# slug, suffix, kind, tone, bar, h1, life, ticks, field, hops, trap_lab, trap_msg, go_lab, nxt, nl
DESTS = []


def add(*row):
    DESTS.append(row)


add("plus", "plus", "query", "gpt",
    "ChatGPT · Plus leftover subscribe",
    "ChatGPT Plus",
    "<p><b>1 Feb 2023</b> — OpenAI “Introducing ChatGPT Plus”. <b>$20 / month</b>. Peak-time access · faster replies · priority features. Free tier stays. Expanded outside the US <b>10 Feb</b>.</p><p>Subscribe Plus is the save. GPT-4 is <b>14 Mar</b> leftover. Bing Chat is <b>7 Feb</b> leftover. No live card. No official OpenAI pixels.</p>",
    ["1 Feb 2023 · $20 / month · Plus leftover subscribe", "GPT-4 is 14 Mar leftover. No live card. Not Send gold."],
    "plus leftover $20", None,
    "GPT-4 is already here (trap)", "GPT-4 is 14 Mar. That click never writes Plus.",
    "Subscribe Plus", "../gpt4/index.html", "GPT-4 leftover")

add("gpt4", "gpt4", "query", "gpt",
    "GPT-4 leftover · 14 Mar 2023",
    "GPT-4 leftover",
    "<p><b>14 Mar 2023</b> — OpenAI announce. Plus subscribers can pick GPT-4. Technical report arXiv:2303.08774. API GA <b>6 Jul</b>. No live model. Plus dest is the chip.</p>",
    ["14 Mar 2023 · GPT-4 leftover · Plus can pick it", "No live model. Not Plus gold. 4o is 2024."],
    "gpt-4 leftover", None,
    "This is Plus gold (trap)", "Plus is the chip. That click never writes.",
    "Save GPT-4 leftover", "../bingchat/index.html", "Bing Chat leftover")

add("bingchat", "bing", "query", "win",
    "Bing Chat leftover · 7 Feb 2023",
    "Bing Chat leftover",
    "<p><b>7 Feb 2023</b> — Microsoft “new Bing” limited preview. Waitlist. This dest stays <b>Bing Chat</b>. Copilot rename is later leftover, not this gold.</p>",
    ["7 Feb 2023 · Bing Chat leftover preview", "Dest stays Bing Chat. Not Plus gold. No live chat."],
    "bing chat leftover", None,
    "This is Copilot gold (trap)", "This dest stays Bing Chat. That click never writes.",
    "Save Bing leftover", "../threads/index.html", "Threads leftover")

add("threads", "threads", "query", "tw",
    "Threads leftover · 5 Jul 2023",
    "Threads leftover",
    "<p><b>5 Jul 2023</b> — Instagram Creators “Introducing Threads”. 500 characters. Instagram login leftover. <b>Not EU at launch</b>. Consumer app is still Instagram / Facebook. X dest is next door.</p>",
    ["5 Jul 2023 · Threads leftover · 500 characters", "Not EU at launch. Not X dest. Not Plus gold."],
    "threads leftover", None,
    "Open in the EU (trap)", "Not EU at launch. That click never writes.",
    "Join leftover", "../x/index.html", "X leftover")

add("x", "x", "query", "xtrap",
    "X leftover · 23 Jul 2023",
    "X leftover",
    "<p><b>23 Jul 2023</b>. Dest name becomes <b>X</b> this year. The 2022 dest stays <b>Twitter</b>. No official X mark. No live post.</p>",
    ["23 Jul 2023 · leftover rebrand · dest name is X", "2022 dest stays Twitter. Not Threads gold."],
    "x leftover", None,
    "This is still Twitter gold (trap)", "Twitter dest is 2022. That click never writes.",
    "Ack X leftover", "../bard/index.html", "Bard leftover")

add("bard", "bard", "query", "win",
    "Bard leftover · 21 Mar 2023",
    "Bard leftover",
    "<p><b>21 Mar 2023</b> — Google “Sign up to try Bard”. US + UK first. LaMDA-class leftover. <b>Gemini is 6 Dec</b> leftover, not March gold. No live model.</p>",
    ["21 Mar 2023 · Bard leftover · US + UK first", "Gemini is 6 Dec. No live model. Not Plus gold."],
    "bard leftover", None,
    "This is Gemini gold (trap)", "Gemini is 6 Dec. That click never writes.",
    "Save Bard leftover", "../claude2/index.html", "Claude 2 leftover")

add("claude2", "claude2", "query", "gpt",
    "Claude 2 leftover · 11 Jul 2023",
    "Claude 2 leftover",
    "<p><b>11 Jul 2023</b> — Anthropic “Claude 2”. claude.ai US + UK beta. No live model. Not Plus gold.</p>",
    ["11 Jul 2023 · Claude 2 leftover · US + UK", "No live model. Not Plus gold. Not 4o."],
    "claude 2 leftover", None,
    "Open live model (trap)", "No live model. That click never writes.",
    "Save Claude leftover", "../chrome/index.html", "Chrome habit")

add("chrome", "chrome", "query", "win",
    "Chrome leftover habit",
    "Chrome habit — 2023 leftover",
    "<p>2023 Chrome leftover habit. Failed-final word <b>Chrome</b>. No official Chrome pixels. Not Edge-as-default.</p>",
    ["2023 Chrome leftover habit · failed-final word Chrome", "Not Edge as default. Not Plus gold."],
    "youtube.com", None,
    "This is Edge gold (trap)", "Chrome habit stays the mass shell. That click never writes.",
    "Keep leftover habit", "../windows10/index.html", "Windows 10 residual")

add("windows10", "win10", "checks", "win",
    "Windows 10 leftover · 2023",
    "Windows 10 residual — 2023",
    "<p>2023. January mass desktop is still Win10. Win11 is leftover, not the January shell. Failed-final word Chrome.</p>",
    ["2023 · Win10 is still January mass", "Not Win11-as-January. Not Plus gold."],
    None, None,
    "Win11 is the January shell (trap)", "January mass is still Win10. That click never writes.",
    "Ack Win10 leftover", "../playable/game.html", "Plus Queue")

add("youtube", "yt", "query", "yt",
    "YouTube leftover · 2023",
    "YouTube leftover",
    "<p>2023 YouTube leftover watch. Not Shorts-as-2023-new. Plus is the chip.</p>",
    ["2023 YouTube leftover · not the chip", "Not Plus gold."],
    "youtube leftover", None,
    "This is the year chip (trap)", "YouTube is leftover. That click never writes the chip.",
    "Watch leftover", "../wikipedia/index.html", "Wikipedia leftover")

add("wikipedia", "wiki", "query", "win",
    "Wikipedia leftover · 2023",
    "Wikipedia leftover",
    "<p>2023 Wikipedia leftover cite. Not the chip.</p>",
    ["2023 Wikipedia leftover", "Cite leftover · not Plus gold."],
    "wiki leftover", None,
    "This is the year chip (trap)", "Wikipedia is leftover. That click never writes the chip.",
    "Cite leftover", "../facebook/index.html", "Facebook leftover")

add("facebook", "fb", "query", "win",
    "Facebook leftover · 2023",
    "Facebook leftover",
    "<p>2023 Facebook leftover feed. Consumer app is still Facebook. Threads dest is next door. Meta rename is 2021.</p>",
    ["2023 Facebook leftover · consumer app still Facebook", "Not Threads gold. Not Plus gold."],
    "facebook leftover", None,
    "Open Threads gold (trap)", "Threads dest already exists. That click never writes.",
    "Like leftover", "../reddit/index.html", "Reddit leftover")

add("reddit", "reddit", "checks", "warn",
    "Reddit leftover · API blackout",
    "Reddit leftover",
    "<p><b>12–14 Jun 2023</b>. Reddit leftover API blackout. 7,000+ subs private. Apollo leftover neighbor. No live vote.</p>",
    ["12–14 Jun 2023 · leftover API blackout", "No live vote. Not Plus gold."],
    None, None,
    "Cast a live vote (trap)", "No live vote. That click never writes.",
    "Ack blackout leftover", "../dalle3/index.html", "DALL·E 3 leftover")

add("dalle3", "dalle3", "query", "gpt",
    "DALL·E 3 leftover",
    "DALL·E 3 leftover",
    "<p><b>20 Sep 2023</b> announce. Plus / Enterprise <b>October</b>. No live image. Sora is <b>2024</b>.</p>",
    ["20 Sep 2023 · DALL·E 3 leftover · October Plus", "No live image. Sora is 2024."],
    "dalle 3 leftover", None,
    "Open Sora (trap)", "Sora is 2024. That click never writes.",
    "Save DALL·E leftover", "../bluesky/index.html", "Bluesky leftover")

add("bluesky", "bluesky", "query", "tw",
    "Bluesky leftover · 2023",
    "Bluesky leftover",
    "<p>2023 Bluesky leftover invite. Not Threads dest. Not X dest. No live federate.</p>",
    ["2023 Bluesky leftover invite", "Not Threads. Not X. Not Plus gold."],
    "bluesky leftover", None,
    "This is Threads gold (trap)", "Threads dest already exists. That click never writes.",
    "Save invite leftover", "../plus/index.html", "★ Subscribe Plus")


def fourx(suffix, kind, title, nxt, nl, field, ticks):
    inner = ""
    if kind == "query" and field:
        inner = (
            f'<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" '
            f'autocomplete="off" placeholder="{field}"></label></p>\n'
        )
    else:
        labs = ticks or ["Leftover tick one", "Leftover tick two"]
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in labs
        )
        inner = f"<p>{boxes}</p>\n"
    verb = "Type leftover" if kind == "query" else "Ack leftover"
    return f"""<!-- ITT-4X:{suffix}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2023 leftover · incomplete never writes · not the chip</p>
{inner}<p><button type="button" data-4x-go="{suffix}">{verb}</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt23-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</section>
<!-- ITT-4X:{suffix}:end -->
"""


def write_dest(row):
    slug, suffix, kind, tone, bar, h1, life, ticks, field, hops, trap_lab, trap_msg, go_lab, nxt, nl = row
    dest = Y / "sites" / slug / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    tick_html = "".join(
        f'<label style="display:block"><input type="checkbox" data-p23-req> {t}</label>\n'
        for t in ticks
    )
    mid = ""
    if field:
        mid = (
            f'<p><label>Leftover<br><input type="text" data-p23-field maxlength="80" '
            f'autocomplete="off" placeholder="{field}"></label></p>\n'
        )
    if hops:
        btns = " ".join(
            f'<button type="button" data-p23-hop="{hid}">{lab}</button>' for hid, lab in hops
        )
        mid += f"<p>{btns}</p>\n"
    go_attrs = f'data-p23-go data-p23-key="{suffix}"'
    if slug == "plus":
        go_attrs = 'class="dp-go" data-p23-go data-p23-key="plus" data-plus-go'
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>{h1} — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2023.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-recon-gold" data-recon="{slug}"><b>RECON frame</b> leftover theater · no official mark</div>
<div class="dp-stage" data-dp-tone="{tone}" data-p23-theater>
<div class="dp-bar">{bar}</div>
<div class="dp-body">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not a 2022 Send</p>
<h1>{h1}</h1>
{life}
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
{tick_html}{mid}<p>
 <button type="button" class="dp-trap" data-p23-trap data-p23-trap-msg="{trap_msg}">{trap_lab}</button>
 <button type="button" class="dp-go" {go_attrs}>{go_lab}</button>
</p>
<p data-p23-status></p>
<p hidden data-next-flow data-next-when-key="itt23-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
</div>
{fourx(suffix, kind, h1 + " leftover pack", nxt, nl, field, ticks)}<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
"""
    dest.write_text(html, encoding="utf-8")


def write_pages():
    pages = Y / "pages"
    pages.mkdir(parents=True, exist_ok=True)
    (pages / "error").mkdir(exist_ok=True)
    (pages / "home.html").write_text("""<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2023</title>
<link rel="stylesheet" href="../../../css/period-2023.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:12px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px">
<p><a data-ott-one-thing="2023" href="../sites/plus/index.html" style="display:inline-block;padding:5px 12px;background:#10a37f;color:#fff;border-radius:14px;text-decoration:none;font-weight:bold">★ One-thing · ChatGPT Plus REAL</a></p>
<div class="ott-guided" id="ott-guided-2023" style="margin:12px 0;padding:14px;background:#111;color:#f5f5f7;border-radius:6px">
 <b>▶ Guided flow · 2023</b>
 <ol style="margin:8px 0 0;padding-left:1.3em;line-height:1.7">
  <li><a href="about.html" style="color:#aed6f1">About 2023</a> — table ends 2018 · ITU 5.4B / 67%</li>
  <li><a href="../sites/plus/index.html" style="color:#aed6f1">ChatGPT Plus</a> — $20 · GPT-4 is leftover</li>
  <li><a href="../sites/gpt4/index.html" style="color:#aed6f1">GPT-4 leftover</a> — 14 Mar</li>
  <li><a href="../sites/bingchat/index.html" style="color:#aed6f1">Bing Chat leftover</a> — 7 Feb</li>
  <li><a href="../sites/threads/index.html" style="color:#aed6f1">Threads leftover</a> — 5 Jul</li>
  <li><a href="map.html" style="color:#aed6f1">Year flow map</a></li>
 </ol>
</div>
<p class="itt-mass-honesty" data-itt-mass="2023" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em"><b>No June websites cell.</b> Live Stats table ends 2018 at 1,630,322,579. ITU 2023: <b>5.4 billion / 67%</b> · 2.6B offline. Gold is Subscribe Plus. GPT-4 / Bing Chat / Threads / X are leftover. Sora / 4o are 2024.</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a1a1a" style="border:2px solid #10a37f">
<tr bgcolor="#111"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — 2023</b> · Win10 mass · Chrome habit · ChatGPT Plus
</td></tr>
<tr bgcolor="#d5f5e3"><td style="padding:8px 12px">
 <b>Subscribe Plus is the save. GPT-4 / Bing Chat / live charge never write.</b>
 1 Feb 2023 · $20 / month · free tier stays.
 Not Send. Not 4o. Not Sora.
</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <div data-itt-tour></div>
 <p><a href="map.html"><b>2023 UX flow map</b></a></p>
 <p class="itt-playable-link" data-itt-year-extras="2023" style="padding:8px;border:2px solid #333;background:#ffc"><b>▶ Play this year’s game</b> — <a href="../sites/playable/game.html"><b>Plus Queue</b></a> · <a href="../sites/playable/famous.html">Famous games</a> · extras: <a href="../sites/playable/extra-a.html">Plus drill</a> · <a href="../sites/playable/extra-b.html">$20</a></p>
 <p>
  <a href="../sites/plus/index.html">Plus</a> ·
  <a href="../sites/gpt4/index.html">GPT-4</a> ·
  <a href="../sites/bingchat/index.html">Bing Chat</a> ·
  <a href="../sites/threads/index.html">Threads</a>
 </p>
 <p style="font-size:12px;color:#444">Also 2023:
  <a href="../sites/x/index.html">X leftover</a> ·
  <a href="../sites/bard/index.html">Bard leftover</a> ·
  <a href="../sites/claude2/index.html">Claude 2 leftover</a> ·
  <a href="../sites/chrome/index.html">Chrome habit</a> ·
  <a href="../sites/windows10/index.html">Win10 residual</a>
 </p>
 <p class="itt-year-true-pack" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px;border:1px dashed #666"><b>Continuity leftover (not the one-thing):</b>
  ChatGPT Send is <b>2022</b>.
  GPT-4 / Bing Chat / Threads / X are leftover — <b>not the chip</b>.
  Sora / 4o are <b>not</b> 2023 defaults.
 </p>
</td></tr>
</table>
</div>
<p data-itt-pop3x="2023" class="itt-pop3x" style="font-size:12px;margin:10px auto;padding:6px 0;max-width:720px">Also popular in 2023 (leftover trail, not the chip): <a href="../sites/youtube/index.html">YouTube</a> → <a href="../sites/wikipedia/index.html">Wikipedia</a> → <a href="../sites/facebook/index.html">Facebook</a></p>
<p data-itt-pop-more="2023" class="itt-pop-more" style="font-size:12px;margin:8px auto;max-width:720px"><b>3 more leftovers</b>: <a href="../sites/x/index.html">X leftover</a> ·
 <a href="../sites/bard/index.html">Bard leftover</a> ·
 <a href="../sites/claude2/index.html">Claude 2 leftover</a></p>
<p data-itt-pop-3x3="2023" class="itt-pop-3x3" style="font-size:12px;margin:8px auto;max-width:720px">
 <b>3 more leftovers</b> (third trio):
 <a href="../sites/reddit/index.html">Reddit leftover</a> ·
 <a href="../sites/dalle3/index.html">DALL·E 3 leftover</a> ·
 <a href="../sites/bluesky/index.html">Bluesky leftover</a>
</p>
<script src="../../../js/immersion-2023.js"></script>
</body>
</html>
""", encoding="utf-8")

    (pages / "about.html").write_text("""<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>About 2023 — dual scale · bans</title>
<link rel="stylesheet" href="../../../css/period-2023.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2023</h1>
<p><b>Subscribe Plus is the save — GPT-4 / Bing Chat / live charge never write — while the Live Stats June table stops at 2018 and ITU’s 2023 people-online cell is 5.4 billion / 67%.</b></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#d5f5e3"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b>. <b>No June 2023 websites digit.</b></td></tr>
<tr><td>Internet users (ITU 2023)</td><td><b>5.4 billion</b> / <b>67%</b> · <b>2.6 billion</b> still offline — Facts and Figures 2023</td></tr>
<tr><td>ChatGPT Plus</td><td><b>1 Feb 2023</b> · <b>$20 / month</b> — OpenAI “Introducing ChatGPT Plus”</td></tr>
<tr><td>GPT-4</td><td><b>14 Mar 2023</b> — OpenAI announce · leftover, not the chip</td></tr>
<tr><td>Bing Chat</td><td><b>7 Feb 2023</b> — Microsoft new Bing preview</td></tr>
<tr><td>Threads</td><td><b>5 Jul 2023</b> — Instagram Creators</td></tr>
<tr><td>X</td><td><b>23 Jul 2023</b> — dest name becomes X. 2022 dest stays Twitter.</td></tr>
</table>
<h2>Bans — not 2023 defaults</h2>
<ul>
<li>Sora · GPT-4o (2024)</li>
<li>Send as this year’s gold (Send is 2022)</li>
<li>Live model / live card / official OpenAI · Meta · X · Google pixels</li>
<li>Invent a June 2023 websites digit</li>
</ul>
<p><a href="home.html">Starting Point</a> · <a href="map.html">Year flow map</a></p>
</div>
<script src="../../../js/immersion-2023.js"></script>
</body>
</html>
""", encoding="utf-8")

    (pages / "map.html").write_text("""<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>2023 flow map</title>
<link rel="stylesheet" href="../../../css/period-2023.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:16px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px;line-height:1.5">
<p class="crumb"><a href="home.html">← Starting Point</a> · <a href="about.html">About</a></p>
<h1>2023 UX flow map</h1>
<p>GPT-4 is highlighted. <b>Subscribe Plus is the real click</b>. Star = Plus (not Send). Guided list stays 6.</p>
<pre style="font-size:11px;background:#111;color:#aed6f1;padding:10px;overflow:auto">
Starting Point
 ├─ Guided 6 …… About → ★ Plus → GPT-4 → Bing Chat → Threads → this map
 ├─ Official 10 … Plus → GPT-4 → Bing Chat → Threads → X → Bard
 │                 → Claude 2 → Chrome → Win10 → Plus Queue ──► Plus
 ├─ Leftover 3× … YouTube → Wikipedia → Facebook → Plus
 └─ Third 3× …… Reddit API → DALL·E 3 → Bluesky
</pre>
<ol data-itt-ten-flows style="padding-left:1.3em">
 <li>★ <a href="../sites/plus/index.html">ChatGPT Plus</a> — $20 · 1 Feb. GPT-4 never writes. <code>itt23-plus</code>.</li>
 <li><a href="../sites/gpt4/index.html">GPT-4 leftover</a> — 14 Mar. <code>itt23-gpt4</code>.</li>
 <li><a href="../sites/bingchat/index.html">Bing Chat leftover</a> — 7 Feb. <code>itt23-bing</code>.</li>
 <li><a href="../sites/threads/index.html">Threads leftover</a> — 5 Jul. <code>itt23-threads</code>.</li>
 <li><a href="../sites/x/index.html">X leftover</a> — 23 Jul. <code>itt23-x</code>.</li>
 <li><a href="../sites/bard/index.html">Bard leftover</a> — 21 Mar. <code>itt23-bard</code>.</li>
 <li><a href="../sites/claude2/index.html">Claude 2 leftover</a> — 11 Jul. <code>itt23-claude2</code>.</li>
 <li><a href="../sites/chrome/index.html">Chrome habit</a> — leftover browser. <code>itt23-chrome</code>.</li>
 <li><a href="../sites/windows10/index.html">Windows 10 residual</a>. <code>itt23-win10</code>.</li>
 <li><a href="../sites/playable/game.html">Plus Queue</a>. <code>itt23-game-plusq</code>.</li>
</ol>
<p><a href="about.html">About</a> · <a href="home.html">Home</a></p>
<div data-itt-flow-map></div>
</div>
<script src="../../../js/config/flow-maps.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../js/immersion-2023.js"></script>
</body>
</html>
""", encoding="utf-8")

    (pages / "whats-new.html").write_text(
        '<!DOCTYPE html><html lang="en" data-itt-year="2023"><head><meta charset="utf-8"><title>What’s new — 2023</title>'
        '<link rel="stylesheet" href="../../../css/period-2023.css"></head><body bgcolor="#f2f2f2">'
        '<div id="itt-nav-slot" class="itt-nav-slot"></div>'
        '<p><a href="home.html">Starting Point</a></p><h1>What’s new — 2023</h1>'
        '<p>Plus is the door. GPT-4 / Bing Chat / Threads / X are leftover.</p>'
        '<script src="../../../js/immersion-2023.js"></script></body></html>\n',
        encoding="utf-8",
    )
    for name in ("404.html", "unreachable.html"):
        (pages / "error" / name).write_text(
            f'<!DOCTYPE html><html lang="en" data-itt-year="2023"><head><meta charset="utf-8"><title>{name} — 2023</title>'
            f'<link rel="stylesheet" href="../../../../css/period-2023.css"></head><body bgcolor="#f2f2f2">'
            f'<p><a href="../home.html">Starting Point</a></p><h1>Not found</h1>'
            f'<script src="../../../../js/immersion-2023.js"></script></body></html>\n',
            encoding="utf-8",
        )


def write_playable():
    d = Y / "sites" / "playable"
    d.mkdir(parents=True, exist_ok=True)
    (d / "game.html").write_text("""<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>Plus Queue — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2023.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="dp-stage" data-dp-tone="gpt" data-p23-theater>
<div class="dp-bar">Plus Queue leftover game</div>
<div class="dp-body">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Plus Queue</h1>
<p>Theater queue. Type <b>twenty</b>. Live charge never writes. Not the Plus dest gold.</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<label style="display:block"><input type="checkbox" data-p23-req> 2023 Plus Queue leftover · not Send</label>
<label style="display:block"><input type="checkbox" data-p23-req> No live charge. 4o is 2024.</label>
<p><label>Queue<br><input type="text" data-p23-field maxlength="80" autocomplete="off" placeholder="twenty"></label></p>
<p>
 <button type="button" class="dp-trap" data-p23-trap data-p23-trap-msg="No live charge. That click never writes.">Charge the card (trap)</button>
 <button type="button" class="dp-go" data-p23-go data-p23-key="game-plusq">Finish queue</button>
</p>
<p data-p23-status></p>
<p hidden data-next-flow data-next-when-key="itt23-game-plusq"><b>Next:</b> <a href="../plus/index.html">★ Subscribe Plus</a></p>
</div>
</div>
<section class="itt-4x-panel" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff">
<h2>Plus Queue leftover pack</h2>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" placeholder="twenty"></label></p>
<p><button type="button" data-4x-go="game-plusq">Type leftover</button> <span data-4x-status></span></p>
</section>
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""", encoding="utf-8")
    for name, title in (("index.html", "2023 playables"), ("famous.html", "Famous leftover — 2023"),
                        ("extra-a.html", "Plus drill — 2023"), ("extra-b.html", "$20 leftover — 2023")):
        (d / name).write_text(f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head><meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2023.css"></head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot"></div>
<p><a href="../../pages/home.html">Starting Point</a> · <a href="game.html">Plus Queue</a></p>
<h1>{title}</h1>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<p>Leftover cabinet. <a href="game.html">Plus Queue</a> is the year game.</p>
<script src="../../../../js/immersion-2023.js"></script>
</body></html>
""", encoding="utf-8")


def write_js_css():
    (ROOT / "css" / "period-2023.css").write_text(
        '@import url("period-2022.css");\n'
        ".year-2023.os-win10 { --itt-desktop-bg: #0078d7; }\n",
        encoding="utf-8",
    )
    (ROOT / "js" / "immersion-2023.js").write_text(
        """/**
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
""",
        encoding="utf-8",
    )
    rooms = [
        "pages/home.html", "pages/about.html", "pages/map.html", "pages/whats-new.html",
        "pages/error/404.html", "pages/error/unreachable.html",
        "sites/plus/index.html", "sites/gpt4/index.html", "sites/bingchat/index.html",
        "sites/threads/index.html", "sites/x/index.html", "sites/bard/index.html",
        "sites/claude2/index.html", "sites/chrome/index.html", "sites/windows10/index.html",
        "sites/youtube/index.html", "sites/wikipedia/index.html", "sites/facebook/index.html",
        "sites/reddit/index.html", "sites/dalle3/index.html", "sites/bluesky/index.html",
        "sites/playable/game.html", "sites/playable/index.html", "sites/playable/famous.html",
        "sites/playable/extra-a.html", "sites/playable/extra-b.html",
    ]
    url_lines = "\n".join(f'    "{r}",' for r in rooms)
    (ROOT / "js" / "config" / "2023.js").write_text(
        f"""/**
 * Year config — 2023 lean from-scratch
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};
  var rooms = [
{url_lines}
  ];
  var urlMap = {{
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2023/",
    "pages/about.html": "http://home.microsoft.com/intl/web2023/about.html",
    "pages/map.html": "http://museum.local/years/2023/map/"
  }};
  var i;
  for (i = 0; i < rooms.length; i++) {{
    if (!urlMap[rooms[i]]) urlMap[rooms[i]] = "http://museum.local/years/2023/" + rooms[i];
  }}
  ITT.configs["2023"] = {{
    year: "2023",
    storagePrefix: "itt23",
    home: "pages/home.html",
    prefsKey: "itt-2023-prefs",
    bookmarksKey: "itt-2023-bookmarks",
    connectedKey: "itt-2023-connected",
    immersionScript: "js/immersion-2023.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Chrome habit",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Chrome habit (museum desktop frame)...",
    defaultPrefs: {{
      underline: true, expireDays: 30, autoload: true, modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2023/",
      homePath: "pages/home.html",
      showToolbar: true, showLocation: true, showDirbar: true, showDesktopIcons: true,
      desktopBg: "#0078d7"
    }},
    urlMap: urlMap
  }};
}})(typeof window !== "undefined" ? window : this);
""",
        encoding="utf-8",
    )
    (ROOT / "js" / "config" / "immersion-2023.js").write_text(
        'window.ITT = window.ITT || {};\nITT._immersionYear = ITT._immersionYear || "2023";\n',
        encoding="utf-8",
    )


def write_extras():
    (ROOT / "js" / "immersion" / "year-2023-extras.js").write_text(
        r"""/**
 * 2023 lean extras — Plus star · GPT-4 · Bing Chat · Threads · X
 * Keys: itt23-* via YearExtras
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

  function bootPeriodTheater(doc, ns) {
    var st = doc.querySelector("[data-" + ns + "-status]");
    var hopsDone = {};
    var traps = doc.querySelectorAll("[data-" + ns + "-trap]");
    var i;
    for (i = 0; i < traps.length; i++) {
      traps[i].addEventListener("click", function () {
        var msg = this.getAttribute("data-" + ns + "-trap-msg") || "Trap. That click never writes.";
        feedback(msg, st, { error: true });
      });
    }
    var hops = doc.querySelectorAll("[data-" + ns + "-hop]");
    for (i = 0; i < hops.length; i++) {
      hops[i].addEventListener("click", function () {
        var hid = this.getAttribute("data-" + ns + "-hop") || "hop";
        hopsDone[hid] = true;
        feedback("Hop leftover · " + Object.keys(hopsDone).length + " / 2.", st);
      });
    }
    var gos = doc.querySelectorAll("[data-" + ns + "-go]");
    function persist(suf) {
      var saved = YX.loadJSON(key(suf));
      if (saved && saved.real) {
        var reqs = doc.querySelectorAll("[data-" + ns + "-req]");
        var r;
        for (r = 0; r < reqs.length; r++) reqs[r].checked = true;
        feedback("Leftover · " + key(suf), st);
        reveal(doc);
      }
    }
    for (i = 0; i < gos.length; i++) {
      persist(gos[i].getAttribute("data-" + ns + "-key") || "lx");
      gos[i].addEventListener("click", function () {
        if (countChecked(doc, "[data-" + ns + "-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (hops.length && Object.keys(hopsDone).length < 2) {
          feedback("Hop both leftovers first. Incomplete never writes.", st, { error: true });
          return;
        }
        var field = doc.querySelector("[data-" + ns + "-field]");
        var q = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
        if (field && q.length < 2) {
          feedback("Type leftover first. Empty never writes.", st, { error: true });
          return;
        }
        var suf = this.getAttribute("data-" + ns + "-key") || "lx";
        var extra = { leftover: true, q: q.slice(0, 80) };
        if (suf === "plus") extra.plus = true;
        if (suf === "game-plusq" && q.toLowerCase() !== "twenty") {
          feedback("Type twenty first. Empty / wrong never writes.", st, { error: true });
          return;
        }
        saveJSON(key(suf), blob(extra));
        feedback((suf === "plus" ? "Subscribe Plus · " : "Leftover · ") + key(suf), st);
        reveal(doc);
      });
    }
  }

  function boot(doc) {
    doc = doc || document;
    bootPeriodTheater(doc, "p23");
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2023-extras",
      featureKey: "year2023Extras",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
""",
        encoding="utf-8",
    )


def write_year_index():
    src = (ROOT / "years" / "2022" / "index.html").read_text(encoding="utf-8")
    out = src.replace("2022", "2023").replace("itt22", "itt23")
    out = out.replace(
        "2023 thesis: Send is the save · empty / Plus / GPT-4 / Bing Chat never write.\n ChatGPT · Twitter leftover · Wordle leftover · Stable Diffusion leftover.",
        "2023 thesis: Subscribe Plus is the save · GPT-4 / Bing Chat / live charge never write.\n Plus · GPT-4 leftover · Bing Chat leftover · Threads leftover.",
    )
    # The first replace already turned 2022 thesis into 2023 thesis with old words
    out = out.replace(
        "Send is the save · empty / Plus / GPT-4 / Bing Chat never write.",
        "Subscribe Plus is the save · GPT-4 / Bing Chat / live charge never write.",
    )
    out = out.replace(
        "ChatGPT · Twitter leftover · Wordle leftover · Stable Diffusion leftover.",
        "Plus · GPT-4 leftover · Bing Chat leftover · Threads leftover.",
    )
    (Y / "index.html").write_text(out, encoding="utf-8")


def write_matrix():
    mx_path = ROOT / "e2e" / "2x-links.matrix.json"
    mx = json.loads(mx_path.read_text(encoding="utf-8"))
    have = {(r.get("year"), r.get("key")) for r in mx}
    n = 0
    for row in DESTS:
        slug, suffix = row[0], row[1]
        rec = {
            "year": "2023",
            "path": f"/years/2023/sites/{slug}/index.html",
            "key": f"itt23-{suffix}",
            "kind": row[2],
            "title": row[5] + " leftover pack",
            "next": f"/years/2023/sites/{row[13].replace('../', '')}" if row[13].startswith("../") else row[13],
            "nextLabel": row[14],
        }
        if ("2023", rec["key"]) not in have:
            mx.append(rec)
            have.add(("2023", rec["key"]))
            n += 1
    rec = {
        "year": "2023",
        "path": "/years/2023/sites/playable/game.html",
        "key": "itt23-game-plusq",
        "kind": "query",
        "title": "Plus Queue leftover pack",
        "next": "/years/2023/sites/plus/index.html",
        "nextLabel": "★ Subscribe Plus",
    }
    if ("2023", rec["key"]) not in have:
        mx.append(rec)
        n += 1
    mx_path.write_text(json.dumps(mx, indent=2) + "\n", encoding="utf-8")
    return n


def main():
    Y.mkdir(parents=True, exist_ok=True)
    write_year_index()
    write_pages()
    write_playable()
    write_js_css()
    write_extras()
    for row in DESTS:
        write_dest(row)
    n = write_matrix()
    sm = ROOT / "sitemap.txt"
    t = sm.read_text(encoding="utf-8")
    extra = []
    for p in sorted(Y.rglob("*.html")):
        rel = "/" + p.relative_to(ROOT).as_posix()
        if rel not in t:
            extra.append(rel)
    if extra:
        sm.write_text(t.rstrip() + "\n" + "\n".join(extra) + "\n", encoding="utf-8")
    html = len(list(Y.rglob("*.html")))
    print(f"2023 lean door HTML {html} dests {len(DESTS)} matrix +{n} sitemap +{len(extra)}")


if __name__ == "__main__":
    main()
