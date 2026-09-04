#!/usr/bin/env python3
"""2023 museum-grade densify: +32 year-true -dp dests, residual leftovers, extra-c/d/e.

Does not: move Plus, grow guided <ol>, dest-field plaques, restore a 2023 forest,
ship Sora / 4o / GPT Store as dests.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = "2023"
PREF = "itt23"

ROOMS: list[tuple] = []


def R(slug, suffix, kind, title, extra, body, trap_lab, trap_msg):
    ROOMS.append((slug, suffix, kind, title, extra, body, trap_lab, trap_msg))


# ----- 32 year-true leftover dests -----
R("plugins", "plugins-dp", "query", "ChatGPT plugins leftover deepen",
  "plugins leftover waitlist",
  "<h1>ChatGPT plugins leftover</h1><p><b>23 Mar 2023</b> — OpenAI starts a ChatGPT plugins rollout. Plus waitlist leftover. First-party browsing + code plugins. No live plugin. GPT Store is <b>2024</b>.</p>",
  "Open the GPT Store (trap)", "GPT Store is January 2024. That click never writes.")
R("browse", "browse-dp", "checks", "ChatGPT browsing leftover deepen",
  ["23 Mar 2023 · first-party browsing leftover · Plus alpha",
   "No live web. Not Bing Chat dest gold."],
  "<h1>ChatGPT browsing leftover</h1><p><b>23 Mar 2023</b>. First-party browsing plugin leftover on the plugins announce. No live fetch. Bing Chat dest already exists.</p>",
  "Fetch the live web (trap)", "No live web. That click never writes.")
R("iosapp", "iosapp-dp", "query", "ChatGPT iOS leftover deepen",
  "ios leftover whisper",
  "<h1>ChatGPT iOS leftover</h1><p><b>18 May 2023</b> — OpenAI free iOS app (The Verge). US first. Whisper voice input leftover. Android is July. No official App Store pixel.</p>",
  "Open Sora (trap)", "Sora is 2024. That click never writes.")
R("interpreter", "interpreter-dp", "checks", "Code Interpreter leftover deepen",
  ["6 Jul 2023 · Code Interpreter leftover · later Advanced Data Analysis",
   "No live Python. Not Plus gold."],
  "<h1>Code Interpreter leftover</h1><p><b>6 Jul 2023</b>. OpenAI Code Interpreter leftover for Plus. Same day as GPT-4 API GA. No live runtime.</p>",
  "Run live code (trap)", "No live runtime. That click never writes.")
R("gpt4api", "gpt4api-dp", "checks", "GPT-4 API leftover deepen",
  ["6 Jul 2023 · GPT-4 API generally available",
   "The GPT-4 dest is 14 Mar announce. This room is API leftover."],
  "<h1>GPT-4 API leftover</h1><p><b>6 Jul 2023</b>. GPT-4 API GA leftover. 14 Mar dest already exists. No live model. 4o is 2024.</p>",
  "Call GPT-4o (trap)", "GPT-4o is 2024. That click never writes.")
R("custom", "custom-dp", "query", "Custom instructions leftover deepen",
  "custom leftover note",
  "<h1>Custom instructions leftover</h1><p><b>20 Jul 2023</b>. OpenAI custom instructions leftover for ChatGPT. Saved prefs leftover. No live model.</p>",
  "Open GPT-4o (trap)", "GPT-4o is 2024. That click never writes.")
R("android", "android-dp", "query", "ChatGPT Android leftover deepen",
  "android leftover us",
  "<h1>ChatGPT Android leftover</h1><p><b>25 Jul 2023</b> — TechCrunch. ChatGPT Android leftover in the US, India, Bangladesh, Brazil. iOS dest is May. No official Play pixel.</p>",
  "Charge Plus here (trap)", "Plus dest is the chip. That click never writes.")
R("enterprise", "enterprise-dp", "checks", "ChatGPT Enterprise leftover deepen",
  ["28 Aug 2023 · ChatGPT Enterprise leftover",
   "No live admin. Not Plus gold. Not GPT Store."],
  "<h1>ChatGPT Enterprise leftover</h1><p><b>28 Aug 2023</b>. OpenAI Enterprise leftover. Workspace leftover. No live SSO.</p>",
  "Open GPT Store (trap)", "GPT Store is 2024. That click never writes.")
R("voice", "voice-dp", "query", "ChatGPT voice leftover deepen",
  "voice leftover plus",
  "<h1>ChatGPT voice leftover</h1><p><b>25 Sep 2023</b>. Plus voice leftover. Whisper class. No live mic. Sky / 4o voice is 2024.</p>",
  "Use Sky voice (trap)", "Sky / 4o voice is 2024. That click never writes.")
R("wincopilot", "wincopilot-dp", "hops", "Windows Copilot leftover deepen",
  [("preview", "Preview leftover"), ("taskbar", "Taskbar leftover")],
  "<h1>Windows Copilot leftover</h1><p><b>26 Sep 2023</b> preview leftover (Build announce 23 May). Bing Chat dest stays Bing Chat. No live Copilot.</p>",
  "This is Bing Chat gold (trap)", "Bing Chat dest already exists. That click never writes.")
R("dallechat", "dallechat-dp", "query", "DALL·E 3 in ChatGPT leftover deepen",
  "dalle 3 in chatgpt leftover",
  "<h1>DALL·E 3 in ChatGPT leftover</h1><p><b>October 2023</b>. DALL·E 3 inside Plus leftover. Announce dest already exists. No live image. Sora is 2024.</p>",
  "Open Sora (trap)", "Sora is 2024. That click never writes.")
R("devday", "devday-dp", "checks", "OpenAI DevDay leftover deepen",
  ["6 Nov 2023 · DevDay leftover · GPT-4 Turbo · GPTs",
   "GPT Store is January 2024. That click never writes."],
  "<h1>OpenAI DevDay leftover</h1><p><b>6 Nov 2023</b>. DevDay leftover. GPT-4 Turbo + GPTs announced. Store ships 2024. No live key.</p>",
  "Open the GPT Store (trap)", "GPT Store is January 2024. That click never writes.")
R("gpts", "gpts-dp", "query", "GPTs leftover deepen",
  "gpts leftover no store",
  "<h1>GPTs leftover</h1><p><b>6 Nov 2023</b>. Custom GPTs leftover on DevDay. The public GPT Store is <b>10 Jan 2024</b> — trap. No live GPT.</p>",
  "Open the GPT Store (trap)", "GPT Store is January 2024. That click never writes.")
R("turbo", "turbo-dp", "query", "GPT-4 Turbo leftover deepen",
  "gpt-4 turbo leftover",
  "<h1>GPT-4 Turbo leftover</h1><p><b>6 Nov 2023</b>. GPT-4 Turbo leftover. 128k context class. No live model. 4o is 2024.</p>",
  "Open GPT-4o (trap)", "GPT-4o is 2024. That click never writes.")
R("grok", "grok-dp", "query", "Grok leftover deepen",
  "grok leftover xai",
  "<h1>Grok leftover</h1><p><b>4 Nov 2023</b>. xAI Grok leftover. Premium+ leftover. No live model. Not Plus gold.</p>",
  "This is Plus gold (trap)", "Plus dest is the chip. That click never writes.")
R("humane", "humane-dp", "checks", "Humane Ai Pin leftover deepen",
  ["9 Nov 2023 · Humane Ai Pin leftover announce",
   "Ships 2024. Rabbit R1 is 2024. No live pin."],
  "<h1>Humane Ai Pin leftover</h1><p><b>9 Nov 2023</b>. Humane Ai Pin leftover announce. Ships next year. Rabbit R1 is 2024. No live pin.</p>",
  "Buy the pin now (trap)", "Ships 2024. That click never writes.")
R("altman", "altman-dp", "checks", "Altman week leftover deepen",
  ["17 Nov 2023 fired · 22 Nov back · literacy leftover",
   "No live board. Not Plus gold."],
  "<h1>Altman week leftover</h1><p><b>17–22 Nov 2023</b>. OpenAI board leftover literacy. Fired Friday, back Wednesday. No live vote.</p>",
  "Cast a live board vote (trap)", "Literacy only. That click never writes.")
R("gemini", "gemini-dp", "query", "Gemini leftover deepen",
  "gemini leftover 6 dec",
  "<h1>Gemini leftover</h1><p><b>6 Dec 2023</b>. Google Gemini leftover announce. Bard dest stays March leftover. Gemini Advanced is <b>2024</b>.</p>",
  "This is Gemini Advanced gold (trap)", "Gemini Advanced is 2024. That click never writes.")
R("mixtral", "mixtral-dp", "query", "Mixtral leftover deepen",
  "mixtral leftover 8x7b",
  "<h1>Mixtral leftover</h1><p><b>11 Dec 2023</b>. Mistral Mixtral 8x7B leftover. Open-weight leftover. No live weights.</p>",
  "Download live weights (trap)", "No live weights. That click never writes.")
R("nyt", "nyt-dp", "checks", "NYT suit leftover deepen",
  ["27 Dec 2023 · NYT v. OpenAI leftover literacy",
   "No live filing. Not Plus gold."],
  "<h1>NYT suit leftover</h1><p><b>27 Dec 2023</b>. New York Times leftover suit literacy. No live docket. Not legal advice.</p>",
  "File a live brief (trap)", "Literacy only. That click never writes.")
R("euaiact", "euaiact-dp", "checks", "EU AI Act leftover deepen",
  ["8 Dec 2023 · EU AI Act political deal leftover",
   "Not GDPR 2018 gold. No live vote."],
  "<h1>EU AI Act leftover</h1><p><b>8 Dec 2023</b>. Political-deal leftover. Not the 2018 GDPR dest. No live vote.</p>",
  "Cast a live vote (trap)", "No live vote. That click never writes.")
R("llama2", "llama2-dp", "query", "Llama 2 leftover deepen",
  "llama 2 leftover",
  "<h1>Llama 2 leftover</h1><p><b>18 Jul 2023</b>. Meta Llama 2 leftover. Open-weight leftover. No live weights. Not Plus gold.</p>",
  "Download live weights (trap)", "No live weights. That click never writes.")
R("sdxl", "sdxl-dp", "query", "SDXL leftover deepen",
  "sdxl leftover prompt",
  "<h1>SDXL leftover</h1><p><b>26 Jul 2023</b>. Stability SDXL leftover. No live image. Sora is 2024. DALL·E 3 dest already exists.</p>",
  "Open Sora (trap)", "Sora is 2024. That click never writes.")
R("mistral", "mistral-dp", "query", "Mistral 7B leftover deepen",
  "mistral 7b leftover",
  "<h1>Mistral 7B leftover</h1><p><b>27 Sep 2023</b>. Mistral 7B leftover. Mixtral dest is December. No live weights.</p>",
  "Open Mixtral gold (trap)", "Mixtral dest is December leftover. That click never writes.")
R("apollo", "apollo-dp", "checks", "Apollo leftover deepen",
  ["Jun 2023 · Apollo shutdown leftover · Reddit API",
   "Reddit dest already exists. No live vote."],
  "<h1>Apollo leftover</h1><p><b>June 2023</b>. Apollo leftover shutdown next to the Reddit API blackout dest. No live Apollo.</p>",
  "Cast a live vote (trap)", "No live vote. That click never writes.")
R("svb", "svb-dp", "checks", "SVB leftover deepen",
  ["10 Mar 2023 · Silicon Valley Bank leftover literacy",
   "No live wire. Not Plus gold."],
  "<h1>SVB leftover</h1><p><b>10 Mar 2023</b>. Silicon Valley Bank leftover literacy. No live wire.</p>",
  "Send a live wire (trap)", "Literacy only. That click never writes.")
R("visionpro", "visionpro-dp", "hops", "Vision Pro leftover deepen",
  [("announce", "WWDC leftover"), ("preorder", "Pre-order leftover")],
  "<h1>Vision Pro leftover</h1><p><b>5 Jun 2023</b> WWDC leftover announce. Ships <b>2024</b>. Apple Intelligence is 2024. No live headset.</p>",
  "This already shipped (trap)", "Ships 2024. That click never writes.")
R("ios17", "ios17-dp", "query", "iOS 17 leftover deepen",
  "ios 17 leftover",
  "<h1>iOS 17 leftover</h1><p><b>18 Sep 2023</b>. iOS 17 leftover. StandBy / NameDrop leftover. Not ATT (2021). No live update.</p>",
  "This is ATT gold (trap)", "ATT is 2021. That click never writes.")
R("quest3", "quest3-dp", "query", "Quest 3 leftover deepen",
  "quest 3 leftover",
  "<h1>Quest 3 leftover</h1><p><b>October 2023</b>. Meta Quest 3 leftover. Consumer app is still Facebook / Instagram. No official Meta pixel.</p>",
  "Open Threads gold (trap)", "Threads dest already exists. That click never writes.")
R("netflixpw", "netflixpw-dp", "checks", "Netflix password leftover deepen",
  ["May 2023 · US password-sharing leftover",
   "No live account. Not Plus gold."],
  "<h1>Netflix password leftover</h1><p><b>May 2023</b>. US password-sharing leftover. Extra-member leftover. No live account.</p>",
  "Sign in live (trap)", "No live account. That click never writes.")
R("substackn", "substackn-dp", "query", "Substack Notes leftover deepen",
  "substack notes leftover",
  "<h1>Substack Notes leftover</h1><p><b>April 2023</b>. Substack Notes leftover. Twitter dest is 2022. X dest already exists. No live note.</p>",
  "This is X gold (trap)", "X dest already exists. That click never writes.")
R("xai", "xai-dp", "checks", "xAI leftover deepen",
  ["12 Jul 2023 · xAI leftover founding",
   "Grok dest is November. No live model."],
  "<h1>xAI leftover</h1><p><b>12 Jul 2023</b>. xAI leftover founding. Grok dest is November. No live model.</p>",
  "Open live Grok gold (trap)", "Grok dest is November leftover. That click never writes.")

RESIDUAL = [
    ("tiktok", "tiktok", "query", "TikTok leftover", "fyp leftover 2023",
     "<h1>TikTok leftover</h1><p>2023 leftover For You tab. Not 2023-new. Plus is the chip. No official mark.</p>",
     "This is the year chip (trap)", "TikTok is leftover. That click never writes."),
    ("midjourney", "midjourney", "query", "Midjourney leftover", "midjourney leftover v5",
     "<h1>Midjourney leftover</h1><p>2023 leftover (v5 class). No live image. Sora is 2024. DALL·E 3 dest already exists.</p>",
     "Open Sora (trap)", "Sora is 2024. That click never writes."),
    ("notion", "notion", "query", "Notion leftover", "notion leftover 2023",
     "<h1>Notion leftover</h1><p>2023 leftover docs. Notion AI leftover, not Plus gold. No live workspace.</p>",
     "This is Plus gold (trap)", "Plus dest is the chip. That click never writes."),
    ("character", "character", "query", "Character leftover", "character leftover chat",
     "<h1>Character leftover</h1><p>2023 Character.AI leftover chat. No live model. Not Plus gold.</p>",
     "Open live model (trap)", "No live model. That click never writes."),
    ("perplexity", "perplexity", "query", "Perplexity leftover", "perplexity leftover ask",
     "<h1>Perplexity leftover</h1><p>2023 leftover ask. Bing Chat dest already exists. No live search.</p>",
     "This is Bing Chat gold (trap)", "Bing Chat dest already exists. That click never writes."),
    ("mastodon", "mastodon", "query", "Mastodon leftover", "mastodon leftover 2023",
     "<h1>Mastodon leftover</h1><p>2023 leftover instance. Threads dest already exists. Not X gold.</p>",
     "This is Threads gold (trap)", "Threads dest already exists. That click never writes."),
    ("bereal", "bereal", "checks", "BeReal leftover",
     ["2023 BeReal leftover · two minutes", "Not Plus gold. No live camera."],
     "<h1>BeReal leftover</h1><p>2023 leftover two-minute take. No live camera. Plus is the chip.</p>",
     "This is Plus gold (trap)", "Plus dest is the chip. That click never writes."),
]


def fourx(suffix, kind, title, extra, nxt, nl, trap_lab, trap_msg):
    if kind == "query":
        inner = (
            f'<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" '
            f'autocomplete="off" placeholder="{extra}"></label></p>\n'
        )
        verb = "Type leftover"
    elif kind == "checks":
        labs = extra if isinstance(extra, list) else ["Leftover tick one", "Leftover tick two"]
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in labs
        )
        inner = f"<p>{boxes}</p>\n"
        verb = "Ack leftover"
    else:
        hops = extra if isinstance(extra, list) else [("a", "Hop A"), ("b", "Hop B")]
        btns = " ".join(
            f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in hops
        )
        inner = f"<p>{btns}</p>\n"
        verb = "Hop leftover"
    trap = (
        f'<p><button type="button" data-4x-trap="ban">{trap_lab}</button> '
        f'<span class="honest">{trap_msg}</span></p>\n'
    )
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"2023 leftover · incomplete never writes · not the chip</p>\n"
        f"{inner}{trap}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{PREF}-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def theater(suffix, kind, extra, body, trap_lab, trap_msg, nxt, nl):
    reqs = (
        '<label style="display:block"><input type="checkbox" data-p23-req> 2023 leftover · not Plus gold</label>\n'
        '<label style="display:block"><input type="checkbox" data-p23-req> No live model. 4o / Sora are 2024.</label>\n'
    )
    field = ""
    hops = ""
    if kind == "query":
        ph = extra if isinstance(extra, str) else "leftover"
        field = (
            f'<p><label>Leftover<br><input type="text" data-p23-field maxlength="80" '
            f'autocomplete="off" placeholder="{ph}"></label></p>\n'
        )
    elif kind == "hops":
        pairs = extra if isinstance(extra, list) else [("a", "Hop A"), ("b", "Hop B")]
        hops = "<p>" + " ".join(
            f'<button type="button" data-p23-hop="{hid}">{lab}</button>' for hid, lab in pairs
        ) + "</p>\n"
    return f"""<div class="itt-recon-gold" data-recon="{suffix}"><b>RECON frame</b> leftover theater · no official mark</div>
<div class="dp-stage" data-p23-theater>
<div class="dp-bar">2023 leftover · not the chip</div>
<div class="dp-body">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not Plus gold</p>
{body}
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
{reqs}{field}{hops}<p>
 <button type="button" class="dp-trap" data-p23-trap data-p23-trap-msg="{trap_msg}">{trap_lab}</button>
 <button type="button" class="dp-go" data-p23-go data-p23-key="{suffix}">Save leftover</button>
</p>
<p data-p23-status></p>
<p hidden data-next-flow data-next-when-key="{PREF}-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
</div>
"""


def write_room(slug, suffix, kind, title, extra, body, trap_lab, trap_msg, nxt, nl):
    dest = ROOT / "years" / YEAR / "sites" / slug / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.is_file() and f"ITT-4X:{suffix}:" in dest.read_text(encoding="utf-8"):
        return "exists"
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{YEAR}">
<head>
<meta charset="utf-8">
<title>{title} — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2023.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<!-- ITT-DP-ROOM:{slug} -->
{theater(suffix, kind, extra, body, trap_lab, trap_msg, nxt, nl)}
{fourx(suffix, kind, title, extra, nxt, nl, trap_lab, trap_msg)}
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
"""
    dest.write_text(html, encoding="utf-8")
    return "ok"


def extra_game(role, gid, title, honesty, nxt, nxt_lab):
    dest = ROOT / "years" / YEAR / "sites" / "playable" / f"extra-{role}.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    key = f"{PREF}-game-{gid}"
    js = ROOT / "js" / "games" / f"year-2023-{gid}.js"
    if not js.is_file():
        js.write_text(
            f"""/**
 * {title} — 2023 extra ({role})
 * Key: {key}
 */
(function () {{
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="{gid}"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
}})();
""",
            encoding="utf-8",
        )
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>{title} — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2023.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body class="yg-body yg-year-2023" bgcolor="#f0f0f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-more-role="{role}" data-more-kind="parlor" data-year="2023" data-game-id="{gid}" data-more-need="3" data-more-goods="note,tick,save" data-more-traps="sora" data-yg-next-href="{nxt}" data-yg-next-label="{nxt_lab}">
  <h1>{title} — 2023</h1>
  <p class="honesty yg-honesty"><b>{honesty}</b> · museum original · not official art · incomplete never writes · key <code>{key}</code></p>
  <ol class="yg-steps" data-yg-steps>
    <li data-step="start">Start</li>
    <li data-step="acts">Do the good acts. Skip traps.</li>
    <li data-step="hold">Hold the beat if shown</li>
    <li data-step="save">Finish writes <code>{key}</code></li>
  </ol>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
  <div data-more-field class="mx-field" aria-label="{title} playfield"></div>
  <p>
    <button type="button" data-game-start>Start</button>
    <button type="button" data-game-finish>Finish</button>
  </p>
  <p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nxt_lab}</a></p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
  <p class="mx-nav">
    <a href="index.html">← Playables</a> ·
    <a href="game.html">Plus Queue</a> ·
    <a href="extra-c.html">C</a> ·
    <a href="extra-d.html">D</a> ·
    <a href="extra-e.html">E</a>
  </p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/games/year-2023-{gid}.js"></script>
{fourx(f"x{role}-lx", "query", f"2023 extra-{role} leftover", f"2023 extra-{role} leftover", nxt, nxt_lab, "Open Sora (trap)", "Sora is 2024. That click never writes.")}
<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
"""
    dest.write_text(html, encoding="utf-8")


def upgrade_extra_ab():
    a = ROOT / "years" / YEAR / "sites" / "playable" / "extra-a.html"
    b = ROOT / "years" / YEAR / "sites" / "playable" / "extra-b.html"
    a.write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>Plus drill — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2023.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:360px;margin:24px auto;padding:16px;background:#fff;border:1px solid #ccc;border-radius:8px;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html">← Playables</a></p>
<h1>Plus drill</h1>
<p>Tap Queue three times. 0–2 taps never write. Sora is the 2024 trap. Not the year star.</p>
<p>
 <button type="button" data-extra-a-sora>Open Sora (trap)</button>
 <button type="button" data-extra-a-queue>Queue leftover</button>
</p>
<p data-extra-a-status></p>
<p hidden data-next-flow data-next-when-key="itt23-extra-a"><b>Next:</b> <a href="extra-b.html">$20</a></p>
<p><a href="game.html">Plus Queue</a> · <a href="../plus/index.html">★ Plus</a></p>
</div>
"""
        + fourx("xa-lx", "query", "2023 extra-a leftover", "2023 extra-a leftover", "extra-b.html", "Extra B", "Open Sora (trap)", "Sora is 2024. That click never writes.")
        + """<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    b.write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2023">
<head>
<meta charset="utf-8">
<title>$20 — 2023</title>
<link rel="stylesheet" href="../../../../css/period-2023.css">
</head>
<body bgcolor="#111" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:420px;margin:24px auto;padding:16px;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="extra-a.html">← Plus drill</a></p>
<h1>$20 / month leftover</h1>
<p>Type <code>twenty</code>. Live charge never writes. Empty never writes.</p>
<p><input data-extra-b-field placeholder="twenty"></p>
<p><button type="button" data-extra-b-save>Save leftover</button></p>
<p data-extra-b-status></p>
<p hidden data-next-flow data-next-when-key="itt23-extra-b"><b>Next:</b> <a href="extra-c.html">Plus note</a></p>
</div>
"""
        + fourx("xb-lx", "query", "2023 extra-b leftover", "2023 extra-b leftover", "extra-c.html", "Extra C", "Charge the card (trap)", "No live charge. That click never writes.")
        + """<script src="../../../../js/immersion-2023.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )


def lo_win10():
    path = ROOT / "years" / YEAR / "sites" / "windows10" / "index.html"
    t = path.read_text(encoding="utf-8")
    if "data-lo-save" in t:
        return
    panel = """<!-- ITT-LO-OFFICIAL:start -->
<section data-lo-panel="1" data-itt-year="2023" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em">
<p><b>Leftover machine</b> · not the chip · incomplete never writes · <code>itt23-win10</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty never writes.</label>
<p>
 <button type="button" data-lo-pick="stay">stay leftover</button>
 <button type="button" data-lo-pick="win11">win11 (trap pick)</button>
</p>
<p>
 <button type="button" data-lo-trap>Win11 is the January shell (trap)</button>
 <button type="button" data-lo-save data-lo-key="win10" data-lo-need-pick="stay">Save leftover</button>
</p>
<p data-lo-status></p>
</section>
<!-- ITT-LO-OFFICIAL:end -->
"""
    path.write_text(t.replace('<script src="../../../../js/immersion-2023.js"></script>', panel + '<script src="../../../../js/immersion-2023.js"></script>'), encoding="utf-8")
    mx = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(mx.read_text(encoding="utf-8"))
    if not any(d.get("year") == "2023" and d.get("suffix") == "win10" for d in data["dests"]):
        data["dests"].append({
            "year": "2023",
            "href": "sites/windows10/index.html",
            "key": "itt23-win10",
            "suffix": "win10",
            "needPick": "stay",
            "minPick": 0,
            "field": False,
            "placeholder": "",
        })
        mx.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def patch_home(dp_rows, residual_rows):
    home = ROOT / "years" / YEAR / "pages" / "home.html"
    t = home.read_text(encoding="utf-8")
    t = t.replace(
        "extras: <a href=\"../sites/playable/extra-a.html\">Plus drill</a> · <a href=\"../sites/playable/extra-b.html\">$20</a>",
        "extras: <a href=\"../sites/playable/extra-a.html\">Plus drill</a> · <a href=\"../sites/playable/extra-b.html\">$20</a> · <a href=\"../sites/playable/extra-c.html\">Plus note</a> · <a href=\"../sites/playable/extra-d.html\">Threads note</a> · <a href=\"../sites/playable/extra-e.html\">X note</a>",
    )
    links = []
    for slug, suffix, title in dp_rows:
        links.append(
            f' <a href="../sites/{slug}/index.html" data-trail-keys="{PREF}-{suffix}">{title}</a> ·'
        )
    star = ' <a href="../sites/plus/index.html">★ ChatGPT Plus</a>'
    inner = (
        f'<p class="itt-2x-trails" id="ott-2x-2023-dp" '
        f'style="margin:10px auto;padding:10px;background:#e3f2fd;border:1px solid #1565c0;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>Year-true leftover dests (deepen)</b> (new doors · not the chip · incomplete never writes):"
        + "".join(links)
        + star
        + "</p>"
    )
    block = f"<!-- ITT-2X-DP:2023:start -->\n{inner}\n<!-- ITT-2X-DP:2023:end -->\n"
    marker = "<!-- ITT-2X-DP:2023:start -->"
    end = "<!-- ITT-2X-DP:2023:end -->"
    if marker in t:
        t = re.sub(re.escape(marker) + r".*?" + re.escape(end), block.strip(), t, count=1, flags=re.S)
    else:
        t = t.replace("</body>", block + "</body>", 1)
    rlinks = []
    for slug, suffix, title in residual_rows:
        rlinks.append(
            f' <a href="../sites/{slug}/index.html" data-trail-keys="{PREF}-{suffix}">{title}</a> ·'
        )
    rinner = (
        f'<p class="itt-2x-trails" id="ott-2x-2023" style="margin:8px auto;max-width:52em;font-size:12px">'
        f"<b>2× leftover dests</b>:" + "".join(rlinks) + star + "</p>"
    )
    rblock = f"<!-- ITT-2X-TRAILS:start -->\n{rinner}\n<!-- ITT-2X-TRAILS:end -->\n"
    if "<!-- ITT-2X-TRAILS:start -->" in t:
        t = re.sub(
            r"<!-- ITT-2X-TRAILS:start -->.*?<!-- ITT-2X-TRAILS:end -->",
            rblock.strip(),
            t,
            count=1,
            flags=re.S,
        )
    else:
        t = t.replace("</body>", rblock + "</body>", 1)
    home.write_text(t, encoding="utf-8")


def patch_sitemap(slugs):
    sm = ROOT / "sitemap.txt"
    t = sm.read_text(encoding="utf-8")
    have = set(sm.read_text(encoding="utf-8").splitlines())
    extra = []
    for slug in slugs:
        url = f"/years/2023/sites/{slug}/index.html"
        if url not in have and not any(url in x for x in have):
            extra.append(url)
    for name in ("extra-c.html", "extra-d.html", "extra-e.html"):
        url = f"/years/2023/sites/playable/{name}"
        if url not in have:
            extra.append(url)
    if extra:
        sm.write_text(t.rstrip() + "\n" + "\n".join(extra) + "\n", encoding="utf-8")
    print("sitemap +", len(extra))


def patch_config(slugs):
    cfg = ROOT / "js" / "config" / "2023.js"
    t = cfg.read_text(encoding="utf-8")
    for slug in slugs:
        line = f'    "sites/{slug}/index.html",'
        if line not in t:
            t = t.replace(
                '    "sites/playable/game.html",',
                line + '\n    "sites/playable/game.html",',
                1,
            )
    for name in ("extra-c.html", "extra-d.html", "extra-e.html"):
        line = f'    "sites/playable/{name}",'
        if line not in t:
            t = t.replace(
                '    "sites/playable/extra-b.html",',
                '    "sites/playable/extra-b.html",\n' + line,
                1,
            )
    cfg.write_text(t, encoding="utf-8")


def patch_cde():
    path = ROOT / "e2e" / "year-extra-cde.matrix.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    have = {(r["year"], r["role"]) for r in rows}
    add = [
        {"year": "2023", "role": "c", "path": "/years/2023/sites/playable/extra-c.html",
         "key": "itt23-game-plusnote", "id": "plusnote", "kind": "parlor",
         "title": "Plus Note", "next": "/years/2023/sites/playable/extra-d.html"},
        {"year": "2023", "role": "d", "path": "/years/2023/sites/playable/extra-d.html",
         "key": "itt23-game-threadnote", "id": "threadnote", "kind": "parlor",
         "title": "Threads Note", "next": "/years/2023/sites/playable/extra-e.html"},
        {"year": "2023", "role": "e", "path": "/years/2023/sites/playable/extra-e.html",
         "key": "itt23-game-xnote", "id": "xnote", "kind": "parlor",
         "title": "X Note", "next": "/years/2023/sites/playable/game.html"},
    ]
    n = 0
    for rec in add:
        if (rec["year"], rec["role"]) not in have:
            rows.append(rec)
            n += 1
    path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    print("cde +", n)


def main():
    added = []
    matrix_new = []
    dp_rows = []
    slugs = []
    for i, row in enumerate(ROOMS):
        slug, suffix, kind, title, extra, body, trap_lab, trap_msg = row
        if i + 1 < len(ROOMS):
            nxt_slug = ROOMS[i + 1][0]
            nxt = f"../{nxt_slug}/index.html"
            nl = ROOMS[i + 1][3]
            next_rel = f"sites/{nxt_slug}/index.html"
        else:
            nxt = "../plus/index.html"
            nl = "★ ChatGPT Plus"
            next_rel = "sites/plus/index.html"
        st = write_room(slug, suffix, kind, title, extra, body, trap_lab, trap_msg, nxt, nl)
        dp_rows.append((slug, suffix, title))
        slugs.append(slug)
        if st == "ok":
            added.append(slug)
        matrix_new.append({
            "year": YEAR,
            "path": f"/years/2023/sites/{slug}/index.html",
            "key": f"{PREF}-{suffix}",
            "kind": kind,
            "title": title,
            "next": f"/years/2023/{next_rel}",
            "nextLabel": nl,
        })

    residual_rows = []
    for i, row in enumerate(RESIDUAL):
        slug, suffix, kind, title, extra, body, trap_lab, trap_msg = row
        if i + 1 < len(RESIDUAL):
            nxt = f"../{RESIDUAL[i + 1][0]}/index.html"
            nl = RESIDUAL[i + 1][3]
            next_rel = f"sites/{RESIDUAL[i + 1][0]}/index.html"
        else:
            nxt = "../plus/index.html"
            nl = "★ ChatGPT Plus"
            next_rel = "sites/plus/index.html"
        st = write_room(slug, suffix, kind, title, extra, body, trap_lab, trap_msg, nxt, nl)
        residual_rows.append((slug, suffix, title))
        slugs.append(slug)
        if st == "ok":
            added.append(slug)
        matrix_new.append({
            "year": YEAR,
            "path": f"/years/2023/sites/{slug}/index.html",
            "key": f"{PREF}-{suffix}",
            "kind": kind,
            "title": title,
            "next": f"/years/2023/{next_rel}",
            "nextLabel": nl,
        })

    extra_game("c", "plusnote", "Plus Note", "Inspired by Plus leftover queue. Plus dest stays gold. Empty never writes.", "extra-d.html", "Threads Note")
    extra_game("d", "threadnote", "Threads Note", "Inspired by Threads leftover 500. Plus dest stays gold. Empty never writes.", "extra-e.html", "X Note")
    extra_game("e", "xnote", "X Note", "Inspired by X leftover rebrand. Plus dest stays gold. Empty never writes.", "game.html", "Plus Queue")
    for role, gid, title, nxt, nl in (
        ("c", "plusnote", "2023 extra-c leftover", "/years/2023/sites/playable/extra-d.html", "Extra D"),
        ("d", "threadnote", "2023 extra-d leftover", "/years/2023/sites/playable/extra-e.html", "Extra E"),
        ("e", "xnote", "2023 extra-e leftover", "/years/2023/sites/playable/game.html", "Plus Queue"),
    ):
        matrix_new.append({
            "year": YEAR,
            "path": f"/years/2023/sites/playable/extra-{role}.html",
            "key": f"{PREF}-x{role}-lx",
            "kind": "query",
            "title": title,
            "next": nxt,
            "nextLabel": nl,
        })

    upgrade_extra_ab()
    for role, nxt, nl in (("a", "/years/2023/sites/playable/extra-b.html", "Extra B"),
                          ("b", "/years/2023/sites/playable/extra-c.html", "Extra C")):
        matrix_new.append({
            "year": YEAR,
            "path": f"/years/2023/sites/playable/extra-{role}.html",
            "key": f"{PREF}-x{role}-lx",
            "kind": "query",
            "title": f"2023 extra-{role} leftover",
            "next": nxt,
            "nextLabel": nl,
        })

    lo_win10()
    patch_home(dp_rows, residual_rows)
    patch_sitemap(slugs)
    patch_config(slugs)
    patch_cde()

    mx_path = ROOT / "e2e" / "2x-links.matrix.json"
    mx = json.loads(mx_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in mx}
    n = 0
    for rec in matrix_new:
        if (rec["year"], rec["key"]) not in have:
            mx.append(rec)
            have.add((rec["year"], rec["key"]))
            n += 1
    mx_path.write_text(json.dumps(mx, indent=2) + "\n", encoding="utf-8")

    html = len(list((ROOT / "years" / YEAR).rglob("*.html")))
    dests = len([p for p in (ROOT / "years" / YEAR / "sites").iterdir() if p.is_dir()])
    mcount = sum(1 for r in mx if r["year"] == YEAR)
    print(f"rooms +{len(added)}")
    print(f"matrix +{n}")
    print(f"2023 HTML {html} dests {dests} matrix {mcount}")
    if html > 90:
        raise SystemExit(f"HTML {html} exceeds 90")


if __name__ == "__main__":
    main()
