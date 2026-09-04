#!/usr/bin/env python3
"""2020 lean door from the 2026-08-28 harvest.

Star: Zoom mute → chat → Leave · itt20-zoom
28 leftover dests (more than 2007's 18). Incomplete never writes.
No official brand pixels. Guided 6. HTML ≤90. No June ILS digit.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2020"

ALSO = [
    ("../../pages/home.html", "Starting Point"),
    ("../../pages/map.html", "Year map"),
    ("../zoom/meeting.html", "Zoom meeting"),
    ("../reels/index.html", "Reels 15s"),
    ("../openai/index.html", "GPT-3 waitlist"),
    ("../flash/index.html", "Flash EOL"),
    ("../tiktok/index.html", "TikTok EO"),
    ("../meet/index.html", "Meet leftover"),
    ("../hbomax/index.html", "HBO Max"),
    ("../quibi/index.html", "Quibi"),
    ("../playable/game.html", "Sus Vote"),
]


def also_nav(prefix="../"):
    bits = []
    for href, lab in ALSO:
        h = href
        if prefix == "../../" and href.startswith("../../"):
            h = href
        elif prefix == "../" and href.startswith("../../"):
            h = href[3:]
        bits.append(f' <a href="{h}">{lab}</a> ·')
    return (
        '<!-- ITT-3X-ALSO:start -->\n'
        '<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2020" '
        'style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em">'
        '<b>Also this year · 3×</b><p style="margin:6px 0 0">\n'
        + "\n".join(bits)
        + "\n</p></nav>\n<!-- ITT-3X-ALSO:end -->\n"
    )


def fourx(suffix, title, nxt, nl, placeholder="type leftover"):
    return f"""<!-- ITT-4X:{suffix}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:Segoe UI,Arial,sans-serif;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2020 leftover · incomplete never writes · not the Zoom chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="{placeholder}"></label></p>
<p><button type="button" data-4x-go="{suffix}">Save leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt20-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</section>
<!-- ITT-4X:{suffix}:end -->
"""


# slug, file, title, body, suffix, placeholder, trap_lab, trap_msg, nxt, nl
DESTS = [
    ("reels", "index.html", "Instagram Reels leftover — 15 seconds",
     "<p><b>5 Aug 2020</b> · 15-second multi-clip · 50+ countries including the US. Not Stories (2016). Not IGTV (2018). Not the Zoom star.</p>",
     "reels", "15 second reel", "This is Stories / IGTV gold (trap)",
     "Stories are 2016. IGTV is 2018. That click never writes.",
     "../openai/index.html", "GPT-3 waitlist"),
    ("openai", "index.html", "GPT-3 API waitlist",
     "<p><b>11 Jun 2020</b> · OpenAI API private beta. Text in, text out. Waitlist, not a chat product. ChatGPT is <b>30 Nov 2022</b>.</p>",
     "gpt3", "waitlist not chat", "Open ChatGPT (trap)",
     "ChatGPT is 30 Nov 2022. That click never writes.",
     "../flash/index.html", "Flash EOL"),
    ("flash", "index.html", "Flash Player EOL",
     "<p><b>31 Dec 2020</b> support ends (announced Jul 2017). Content bricks <b>12 Jan 2021</b>. Uninstall is the leftover. Play SWF never writes.</p>",
     "flash", "uninstall 31 dec", "Play SWF (trap)",
     "Play SWF never writes. Uninstall is the leftover.",
     "../tiktok/index.html", "TikTok EO"),
    ("tiktok", "index.html", "TikTok EO 13942 leftover",
     "<p><b>6 Aug 2020</b> EO 13942 · twin WeChat EO 13943. Commerce IDs 18 Sep. Courts enjoined. <b>The app still works.</b></p>",
     "tiktok-eo", "app still works", "The app vanished (trap)",
     "The app did not vanish. Courts enjoined. That click never writes.",
     "../markets/wti.html", "WTI"),
    ("markets", "wti.html", "WTI negative — 20 Apr 2020",
     "<p><b>20 Apr 2020</b> May WTI settled <b>−$37.63</b>. First negative print in 37 years. CFTC interim report. Not a $60 oil year.</p>",
     "wti", "-37.63 20 apr", "Oil is $60 (trap)",
     "May WTI settled −$37.63. That click never writes.",
     "../edge/index.html", "Edge 79"),
    ("edge", "index.html", "Chromium Edge 79",
     "<p><b>15 Jan 2020</b> Edge 79 stable. Consumer staged. Enterprise/education not auto-upgraded. Chrome is already the habit.</p>",
     "edge", "edge 79 15 jan", "Enterprise auto-upgraded (trap)",
     "Enterprise was not auto-upgraded. That click never writes.",
     "../ccpa/index.html", "CCPA"),
    ("ccpa", "index.html", "CCPA Do Not Sell",
     "<p>In force <b>1 Jan 2020</b>. AG enforcement <b>1 Jul 2020</b>. Final regs <b>14 Aug 2020</b>. Do Not Sell is the leftover. Accept All never writes.</p>",
     "ccpa", "do not sell", "Accept All (trap)",
     "Accept All never writes. Do Not Sell is the leftover.",
     "../chrome/index.html", "Chrome habit"),
    ("chrome", "index.html", "Chrome habit — 2020",
     "<p>Win10 + Chrome is already mass. Edge 79 is a new skin. This dest is leftover habit, not a new browser of 2020.</p>",
     "chrome", "already mass", "Chrome launched in 2020 (trap)",
     "Chrome is 2008. Habit, not a 2020 launch. That click never writes.",
     "../playable/game.html", "Sus Vote"),
    ("meet", "index.html", "Google Meet leftover — free 29 Apr",
     "<p><b>29 Apr 2020</b> Meet free for everyone. Pair leftover next to Zoom. Meet did not replace the star.</p>",
     "meet", "free for everyone", "Meet replaced Zoom (trap)",
     "Meet is leftover. Zoom is the star. That click never writes.",
     "../mixer/index.html", "Mixer"),
    ("mixer", "index.html", "Mixer leftover — 22 Jul 2020",
     "<p><b>22 Jul 2020</b> Mixer sunset. Tomb card. Facebook Gaming is not Mixer.</p>",
     "mixer", "22 jul sunset", "Mixer is live 2021 (trap)",
     "Mixer sunset is 22 Jul 2020. That click never writes.",
     "../hbomax/index.html", "HBO Max"),
    ("hbomax", "index.html", "HBO Max leftover — 27 May 2020",
     "<p><b>27 May 2020</b> · <b>$14.99</b> · 10,000 hours. Friends / Big Bang as the pull. No official key art.</p>",
     "hbomax", "$14.99 27 may", "Friends is free forever (trap)",
     "$14.99 is the leftover. That click never writes.",
     "../acnh/index.html", "ACNH"),
    ("acnh", "index.html", "Animal Crossing New Horizons leftover",
     "<p><b>20 Mar 2020</b> worldwide. Turnip leftover. No Nook / villager art. Not the Zoom star.</p>",
     "acnh", "20 mar turnip", "Official Nook (trap)",
     "No official Nintendo art. That click never writes.",
     "../astro/index.html", "Astronomical"),
    ("astro", "index.html", "Fortnite Astronomical leftover",
     "<p><b>23 Apr 2020</b> · <b>12.3 million concurrent</b>. Sky + clock silhouette. No concert rip.</p>",
     "astro", "12.3 million 23 apr", "Play the concert rip (trap)",
     "No concert rip. That click never writes.",
     "../quibi/index.html", "Quibi"),
    ("quibi", "index.html", "Quibi leftover — Apr–Oct 2020",
     "<p>Launch <b>6 Apr</b> · shut <b>21 Oct</b>. ~$1.75B. 5–10 minute quick bites. Empty episode never writes.</p>",
     "quibi", "6 min gone", "Quibi won streaming (trap)",
     "Quibi shut 21 Oct. That click never writes.",
     "../peacock/index.html", "Peacock"),
    ("peacock", "index.html", "Peacock leftover — 15 Jul 2020",
     "<p><b>15 Jul 2020</b>. Tier leftover. Not 2021 gold.</p>",
     "peacock", "15 jul peacock", "Peacock is 2021 gold (trap)",
     "Peacock leftover is 15 Jul 2020. That click never writes.",
     "../clubhouse/index.html", "Clubhouse"),
    ("clubhouse", "index.html", "Clubhouse leftover — invite 2020",
     "<p>iOS invite <b>2020</b>. Mass is <b>2021</b>. Invite field leftover.</p>",
     "club", "invite 2020", "Clubhouse is 2020 mass gold (trap)",
     "Mass is 2021. Invite leftover only. That click never writes.",
     "../discord/index.html", "Discord"),
    ("discord", "index.html", "Discord leftover — 100M → 140M",
     "<p>2020 class growth. Discord did not launch in 2020. Server leftover.</p>",
     "discord", "100 to 140", "Discord launched in 2020 (trap)",
     "Discord is older. That click never writes.",
     "../youtube/index.html", "YouTube Shorts"),
    ("youtube", "index.html", "YouTube Shorts leftover — India 14 Sep",
     "<p><b>14 Sep 2020</b> · 15 seconds · India-first. Not Reels. Not a US-default 2020 gold.</p>",
     "shorts", "india 15s 14 sep", "Shorts are Reels (trap)",
     "Shorts are India-first 14 Sep. Not Reels. That click never writes.",
     "../wikipedia/index.html", "Wikipedia"),
    ("wikipedia", "index.html", "Wikipedia leftover — 2020 mass",
     "<p>Mass habit leftover. Wikipedia did not launch in 2020.</p>",
     "wiki", "mass leftover", "Wikipedia is a 2020 birth (trap)",
     "Wikipedia is 2001. That click never writes.",
     "../facebook/index.html", "Facebook"),
    ("facebook", "index.html", "Facebook leftover — WhatsApp 2B",
     "<p>WhatsApp <b>2 billion 12 Feb 2020</b>. Meta rename is <b>28 Oct 2021</b>.</p>",
     "fb", "whatsapp 2 billion", "Meta rename 2020 (trap)",
     "Meta rename is 2021. That click never writes.",
     "../spacehey/index.html", "SpaceHey"),
    ("spacehey", "index.html", "SpaceHey leftover — Nov 2020",
     "<p><b>Nov 2020</b> MySpace-class leftover. Not 2020 gold.</p>",
     "spacehey", "nov 2020 about me", "MySpace 2020 gold (trap)",
     "SpaceHey is leftover. That click never writes.",
     "../exposure/index.html", "Exposure Notification"),
    ("exposure", "index.html", "Exposure Notification leftover",
     "<p>Apple + Google partner <b>10 Apr</b> · API <b>20 May 2020</b>. Opt-in leftover. Not a case dashboard.</p>",
     "en", "opt-in 10 apr", "Case dashboard (trap)",
     "No case dashboard dest. That click never writes.",
     "../epic/index.html", "Epic v Apple"),
    ("epic", "index.html", "Epic v Apple leftover — 13 Aug 2020",
     "<p><b>13 Aug 2020</b> Fortnite leaves the stores. Not “Fortnite won.”</p>",
     "epic", "13 aug leaves stores", "Fortnite won the store (trap)",
     "Fortnite left the stores. That click never writes.",
     "../iphone12/index.html", "iPhone 12"),
    ("iphone12", "index.html", "iPhone 12 leftover — 13 Oct 2020",
     "<p><b>13 Oct 2020</b> · 5G · MagSafe. ATT prompt is <b>iOS 14.5 / 2021</b>. No product shot.</p>",
     "iphone12", "5g magsafe 13 oct", "ATT prompt 2020 gold (trap)",
     "ATT is 14.5 / 2021. That click never writes.",
     "../fleets/index.html", "Fleets"),
    ("fleets", "index.html", "Twitter Fleets leftover",
     "<p><b>17 Nov 2020</b> · dies <b>3 Aug 2021</b>. 24h leftover, not Stories forever.</p>",
     "fleets", "17 nov 24h", "Fleets are forever (trap)",
     "Fleets die 3 Aug 2021. That click never writes.",
     "../teams/index.html", "Teams"),
    ("teams", "index.html", "Microsoft Teams leftover",
     "<p><b>29 Apr 2020</b> · 75 million DAU class. Pair leftover. Teams did not steal the Zoom star.</p>",
     "teams", "75m dau leftover", "Teams replaced Zoom (trap)",
     "Teams is leftover. Zoom is the star. That click never writes.",
     "../ps5/index.html", "PS5 queue"),
    ("ps5", "index.html", "PS5 leftover — sold-out queue",
     "<p><b>12 Nov 2020</b> · $399 / $499. Xbox Series X is 10 Nov. Sold-out queue. No console art.</p>",
     "ps5", "sold out 12 nov", "You bought one (trap)",
     "Sold-out queue leftover. That click never writes.",
     "../fallguys/index.html", "Fall Guys"),
    ("fallguys", "index.html", "Fall Guys leftover — 4 Aug 2020",
     "<p><b>4 Aug 2020</b>. Leftover crown. Not the year gold. Sus Vote stays the official game.</p>",
     "fallguys", "4 aug leftover", "Fall Guys is the year gold (trap)",
     "Fall Guys is leftover. Sus Vote is the cabinet. That click never writes.",
     "../stimulus/index.html", "Stimulus"),
    ("stimulus", "index.html", "Get My Payment leftover — Apr 2020",
     "<p>CARES / IRS Get My Payment leftover. No live IRS. No wallet dest.</p>",
     "stimulus", "get my payment", "Open a wallet (trap)",
     "No wallet dest. That click never writes.",
     "../schrems/index.html", "Schrems II"),
    ("schrems", "index.html", "Schrems II leftover — 16 Jul 2020",
     "<p><b>16 Jul 2020</b> Case C-311/18. Privacy Shield invalid leftover. GDPR gold is <b>2018</b>.</p>",
     "schrems", "c-311/18 16 jul", "GDPR is 2020 gold (trap)",
     "GDPR Manage is 2018. That click never writes.",
     "../zoom/wait.html", "Zoom waiting room"),
    ("ios14", "index.html", "iOS 14 widgets leftover — 16 Sep 2020",
     "<p><b>16 Sep 2020</b> widgets. ATT prompt is <b>14.5 / 2021</b>. Word tiles, no Apple art.</p>",
     "ios14", "widgets 16 sep", "ATT is 2020 gold (trap)",
     "ATT is 2021. That click never writes.",
     "../quest2/index.html", "Quest 2"),
    ("quest2", "index.html", "Quest 2 leftover — 13 Oct 2020",
     "<p><b>13 Oct 2020</b>. Black visor rect. No Oculus glyph. Metaverse-as-gold is later.</p>",
     "quest2", "13 oct visor", "Metaverse 2021 gold (trap)",
     "Quest 2 is leftover. That click never writes.",
     "../disneyplus/index.html", "Disney+ leftover"),
    ("disneyplus", "index.html", "Disney+ leftover — 2019 star residual",
     "<p>Disney+ Continue is the <b>2019</b> star. Trial is still the trap. Not 2020 gold.</p>",
     "dplus", "2019 star leftover", "Disney+ is 2020 gold (trap)",
     "Disney+ gold is 2019. That click never writes.",
     "../amongus/index.html", "Among Us literacy"),
    ("amongus", "index.html", "Among Us leftover literacy",
     "<p>Launch <b>15 Jun 2018</b>. Viral Sep 2020. Steam peak <b>447,476</b> on 26 Sep. All-platform weekend 3 million then 3.8M concurrent. Not “3 million Steam.” Bean silhouettes only.</p>",
     "among-lit", "447476 steam peak", "Launched in 2020 (trap)",
     "Among Us launched 15 Jun 2018. That click never writes.",
     "../tiktok/fyp.html", "TikTok FYP"),
]


def write_dest(slug, fname, title, body, suffix, placeholder, trap_lab, trap_msg, nxt, nl):
    dest = Y / "sites" / slug / fname
    dest.parent.mkdir(parents=True, exist_ok=True)
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="lo20" style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="../../pages/about.html">About</a></p>
<p class="itt-pixel-failed">[failed-final] no official brand pixels</p>
<h1>{title}</h1>
{body}
<p><button type="button" data-z20-trap data-z20-trap-msg="{trap_msg}">{trap_lab}</button></p>
<p data-z20-trap-status></p>
{fourx(suffix, title, nxt, nl, placeholder)}
</div>
<script src="../../../../js/immersion-2020.js"></script>
{also_nav()}
</body>
</html>
"""
    dest.write_text(html, encoding="utf-8")


def write_zoom():
    z = Y / "sites" / "zoom"
    z.mkdir(parents=True, exist_ok=True)
    (z / "index.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>Join Meeting — Zoom leftover trap</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] no Zoom wordmark</p>
<h1>Join Meeting</h1>
<p>Join is the trap. Mute + chat + Leave on the meeting page writes the star. Free Basic group calls were <b>40 minutes</b> (Thanksgiving lift 26–27 Nov only).</p>
<p><button type="button" data-zoom-join>Join Meeting</button></p>
<p data-zoom-join-status></p>
<p><a href="meeting.html"><b>Open the meeting (mute → leave)</b></a></p>
<!-- ITT-4X:zm-ix:start -->
<section class="itt-4x-panel" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333">
<h2 style="font-size:16px">Join leftover literacy</h2>
<p class="honest">Join never writes the star. This pack is leftover only.</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" placeholder="join is the trap"></label></p>
<p><button type="button" data-4x-go="zm-ix">Save leftover</button> <span data-4x-status></span></p>
<p hidden data-next-flow data-next-when-key="itt20-zm-ix"><b>Next:</b> <a href="meeting.html">Zoom meeting</a></p>
</section>
<!-- ITT-4X:zm-ix:end -->
</div>
<script src="../../../../js/immersion-2020.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (z / "meeting.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>You’re muted — Zoom 2020</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#1a1a1a" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="z20-meet" style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px;background:#2d2d2d;padding:16px">
<p class="crumb"><a href="../../pages/home.html" style="color:#9cf">Starting Point</a> · <a href="index.html" style="color:#9cf">Join (trap)</a></p>
<p class="itt-pixel-failed">[failed-final] color tiles · You’re muted · no Zoom logo</p>
<h1>You’re muted</h1>
<p>300 million is <b>daily meeting participants</b> (Yuan 17 Mar 2021), not users. Join never writes. Mute + type chat + Leave writes <code>itt20-zoom</code>.</p>
<div style="display:flex;gap:8px;margin:12px 0">
 <div style="width:72px;height:48px;background:#4a90d9"></div>
 <div style="width:72px;height:48px;background:#7b8"></div>
 <div style="width:72px;height:48px;background:#c85"></div>
</div>
<label style="display:block"><input type="checkbox" data-zoom-req> Participants, not users — 10M Dec 2019 → 300M Apr 2020 daily meeting participants</label>
<label style="display:block"><input type="checkbox" data-zoom-req> Join is the trap. ChatGPT is not a 2020 product.</label>
<p>
 <button type="button" data-zoom-mute aria-pressed="false">Mute</button>
 <button type="button" data-zoom-video>Start with video on (trap)</button>
</p>
<p><label>Chat<br><input type="text" data-zoom-chat maxlength="80" autocomplete="off" placeholder="can you hear me"></label>
 <button type="button" data-zoom-send>Send</button></p>
<p><button type="button" data-zoom-leave>Leave</button></p>
<p data-zoom-status></p>
<p hidden data-next-flow data-next-when-key="itt20-zoom"><b>Next:</b> <a href="../reels/index.html">Reels 15s leftover</a></p>
</div>
<script src="../../../../js/immersion-2020.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (z / "wait.html").write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>Waiting Room leftover — Zoom 5.0</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] no Zoom mark</p>
<h1>Waiting Room leftover</h1>
<p><b>22 Apr 2020</b> Zoom 5.0 / 90-day plan. AES-256-GCM. Waiting Room default-on for education, Basic, single-license Pro. 11-digit IDs. This dest never writes the star.</p>
<p><button type="button" data-z20-trap data-z20-trap-msg="Waiting room leftover never writes itt20-zoom.">Admit everyone (trap)</button></p>
{fourx("wait", "Waiting room leftover", "meeting.html", "Zoom meeting", "waiting room 5.0")}
</div>
<script src="../../../../js/immersion-2020.js"></script>
{also_nav()}
</body>
</html>
""",
        encoding="utf-8",
    )


def write_tiktok_fyp():
    dest = Y / "sites" / "tiktok" / "fyp.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>TikTok FYP leftover — app still works</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html">TikTok EO</a> · <a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] no TikTok wordmark</p>
<h1>For You leftover</h1>
<p>After EO 13942 the app still works. This is leftover FYP literacy, not the EO official stop.</p>
<p><button type="button" data-z20-trap data-z20-trap-msg="Vanished-app theater never writes.">The store is empty (trap)</button></p>
{fourx("ttfyp", "FYP leftover", "../zoom/meeting.html", "Zoom meeting", "app still works")}
</div>
<script src="../../../../js/immersion-2020.js"></script>
{also_nav()}
</body>
</html>
""",
        encoding="utf-8",
    )


def write_playable():
    p = Y / "sites" / "playable"
    p.mkdir(parents=True, exist_ok=True)
    extras = [
        ("extra-a.html", "Mute drill", "extra-a", "muteround", "Mute drill", "extra-b.html", "Participants"),
        ("extra-b.html", "Participants-not-users", "extra-b", "parts", "Participants", "extra-c.html", "Fall leftover"),
        ("extra-c.html", "Fall leftover desk", "game-fall", "fall", "Fall leftover", "extra-d.html", "Turnip"),
        ("extra-d.html", "Turnip desk", "game-turnip", "turnip", "Turnip", "extra-e.html", "Flash Brick"),
        ("extra-e.html", "Flash Brick", "game-flashbrick", "flashbrick", "Flash Brick", "game.html", "Sus Vote"),
        ("more-a.html", "Mute Round", "game-muteround", "muteround", "Mute Round", "more-b.html", "Reel 15"),
        ("more-b.html", "Reel 15", "game-reel15", "reel15", "Reel 15", "extra-a.html", "Mute drill"),
    ]
    for fname, h1, gid, kind, honest, nxt, nl in extras:
        (p / fname).write_text(
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>{h1} — 2020</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-year="2020" data-game-id="{gid}" data-more-kind="place" data-more-need="3" data-more-goods="cell-0,cell-1,cell-2" data-more-traps="offpath" data-minute-extra style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html">Playables</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>{h1}</h1>
<p class="honesty yg-honesty"><b>{honest}</b> · museum original · no official sprites · incomplete never writes · key <code>itt20-{gid if gid.startswith("game-") or gid.startswith("extra-") else "game-" + gid}</code></p>
<ol class="yg-steps" data-yg-steps>
 <li data-step="start">Start</li>
 <li data-step="acts">Do the year-true acts. Traps never write.</li>
 <li data-step="save">Finish writes the leftover game key</li>
</ol>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<div data-more-field class="mx-field"></div>
<p><button type="button" data-game-start>Start</button> <button type="button" data-game-finish>Finish</button></p>
<p data-itt-action-status>Press Start. Incomplete never writes.</p>
<p hidden data-next-flow data-next-when-key="itt20-{gid if gid.startswith("game-") or gid.startswith("extra-") else "game-" + gid}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/immersion-2020.js"></script>
</body>
</html>
""",
            encoding="utf-8",
        )
    (p / "game.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>Sus Vote — 2020</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#1b1f3a" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="2020" data-game-id="among" style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html" style="color:#9cf">Playables</a></p>
<h1>Sus Vote</h1>
<p class="yg-honesty">Among Us class. Launch <b>15 Jun 2018</b>. Viral Sep 2020. Steam peak <b>447,476</b> (26 Sep). All-platform weekend 3 million then 3.8M concurrent — not “3 million Steam.” Bean silhouettes only. Star stays Zoom.</p>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p>
 <span style="display:inline-block;width:18px;height:22px;background:#c33;border-radius:8px 8px 4px 4px"></span>
 <span style="display:inline-block;width:18px;height:22px;background:#36c;border-radius:8px 8px 4px 4px"></span>
 <span style="display:inline-block;width:18px;height:22px;background:#3c3;border-radius:8px 8px 4px 4px"></span>
</p>
<label><input type="checkbox" data-sus-req> Task bar finished — fake, like the year</label><br>
<label><input type="checkbox" data-sus-req> Emergency meeting — vote is required</label>
<p><label>Line <input type="text" data-sus-field maxlength="24" placeholder="red is sus" autocomplete="off"></label></p>
<p>
 <button type="button" data-game-start>Start</button>
 <button type="button" data-sus-vote>Vote</button>
 <button type="button" data-sus-skip>Skip vote (trap)</button>
</p>
<p data-itt-action-status data-sus-status>Start. Skip vote never writes.</p>
<p hidden data-next-flow data-next-when-key="itt20-game-among"><b>Next:</b> <a href="../zoom/meeting.html">Zoom meeting</a></p>
</div>
<!-- ITT-4X:game-among:start -->
<section class="itt-4x-panel" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px auto;padding:12px;border:1px solid #666;max-width:46em;background:#fff;color:#111">
<h2 style="font-size:16px">Sus Vote leftover pack</h2>
<p class="honest">Official 10 also writes from Vote above. This pack is a second leftover.</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" placeholder="red is sus"></label></p>
<p><button type="button" data-4x-go="game-among">Save leftover</button> <span data-4x-status></span></p>
<p hidden data-next-flow data-next-when-key="itt20-game-among"><b>Next:</b> <a href="../zoom/meeting.html">Zoom</a></p>
</section>
<!-- ITT-4X:game-among:end -->
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/immersion-2020.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (p / "index.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>2020 playables</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>2020 playables</h1>
<p>Star stays Zoom. Sus Vote is the official cabinet. more-a/b and extras are leftover.</p>
<ul>
 <li><a href="game.html"><b>Sus Vote</b></a> — Among Us class · 2018 launch · 2020 viral</li>
 <li><a href="more-a.html">Mute Round</a></li>
 <li><a href="more-b.html">Reel 15</a></li>
 <li><a href="extra-a.html">Mute drill</a> · <a href="extra-b.html">Participants</a> · <a href="extra-c.html">Fall leftover</a> · <a href="extra-d.html">Turnip</a> · <a href="extra-e.html">Flash Brick</a></li>
</ul>
<!-- ITT-4X:cab:start -->
<section class="itt-4x-panel" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333">
<h2 style="font-size:16px">Cabinet leftover</h2>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" placeholder="cabinet leftover"></label></p>
<p><button type="button" data-4x-go="cab">Save leftover</button> <span data-4x-status></span></p>
<p hidden data-next-flow data-next-when-key="itt20-cab"><b>Next:</b> <a href="game.html">Sus Vote</a></p>
</section>
<!-- ITT-4X:cab:end -->
</div>
<script src="../../../../js/immersion-2020.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )


def write_pages():
    pages = Y / "pages"
    pages.mkdir(parents=True, exist_ok=True)
    (pages / "error").mkdir(exist_ok=True)
    (pages / "error" / "404.html").write_text(
        '<!DOCTYPE html><html lang="en" data-itt-year="2020"><head><meta charset="utf-8"><title>404</title></head><body><p>Not found.</p></body></html>\n',
        encoding="utf-8",
    )
    (pages / "error" / "unreachable.html").write_text(
        '<!DOCTYPE html><html lang="en" data-itt-year="2020"><head><meta charset="utf-8"><title>Unreachable</title></head><body><p>Unreachable.</p></body></html>\n',
        encoding="utf-8",
    )

    leftover_links = [
        ("../sites/meet/index.html", "itt20-meet", "Meet leftover"),
        ("../sites/mixer/index.html", "itt20-mixer", "Mixer leftover"),
        ("../sites/hbomax/index.html", "itt20-hbomax", "HBO Max leftover"),
        ("../sites/acnh/index.html", "itt20-acnh", "ACNH leftover"),
        ("../sites/astro/index.html", "itt20-astro", "Astronomical leftover"),
        ("../sites/quibi/index.html", "itt20-quibi", "Quibi leftover"),
        ("../sites/peacock/index.html", "itt20-peacock", "Peacock leftover"),
        ("../sites/clubhouse/index.html", "itt20-club", "Clubhouse leftover"),
        ("../sites/discord/index.html", "itt20-discord", "Discord leftover"),
        ("../sites/youtube/index.html", "itt20-shorts", "Shorts leftover"),
        ("../sites/wikipedia/index.html", "itt20-wiki", "Wikipedia leftover"),
        ("../sites/facebook/index.html", "itt20-fb", "Facebook leftover"),
        ("../sites/spacehey/index.html", "itt20-spacehey", "SpaceHey leftover"),
        ("../sites/exposure/index.html", "itt20-en", "EN leftover"),
        ("../sites/epic/index.html", "itt20-epic", "Epic leftover"),
        ("../sites/iphone12/index.html", "itt20-iphone12", "iPhone 12 leftover"),
        ("../sites/fleets/index.html", "itt20-fleets", "Fleets leftover"),
        ("../sites/teams/index.html", "itt20-teams", "Teams leftover"),
        ("../sites/ps5/index.html", "itt20-ps5", "PS5 leftover"),
        ("../sites/fallguys/index.html", "itt20-fallguys", "Fall Guys leftover"),
        ("../sites/stimulus/index.html", "itt20-stimulus", "Stimulus leftover"),
        ("../sites/schrems/index.html", "itt20-schrems", "Schrems leftover"),
        ("../sites/zoom/wait.html", "itt20-wait", "Waiting room leftover"),
        ("../sites/ios14/index.html", "itt20-ios14", "iOS 14 leftover"),
        ("../sites/quest2/index.html", "itt20-quest2", "Quest 2 leftover"),
        ("../sites/disneyplus/index.html", "itt20-dplus", "Disney+ leftover"),
        ("../sites/amongus/index.html", "itt20-among-lit", "Among Us literacy"),
        ("../sites/tiktok/fyp.html", "itt20-ttfyp", "TikTok FYP leftover"),
    ]
    trail = " →\n ".join(
        f'<a href="{href}" data-trail-keys="{key}">{lab}</a>' for href, key, lab in leftover_links
    )
    (pages / "home.html").write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2020</title>
<link rel="stylesheet" href="../../../css/period-2020.css">
<link rel="stylesheet" href="../../../css/year-start-quiet.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:12px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px">
<p><a data-ott-one-thing="2020" href="../sites/zoom/meeting.html" style="display:inline-block;padding:5px 12px;background:#2d8cff;color:#fff;border-radius:14px;text-decoration:none;font-weight:bold">★ One-thing · Zoom mute → leave REAL</a></p>
<p class="itt-felt-trail">Join is the trap. Mute, type in chat, Leave: <a href="../sites/zoom/meeting.html">Zoom meeting</a>.</p>
<div class="ott-guided" id="ott-guided-2020" style="margin:12px 0;padding:14px;background:#111;color:#f5f5f7;border-radius:6px">
 <b>▶ Guided flow · 2020</b>
 <ol style="margin:8px 0 0;padding-left:1.3em;line-height:1.7">
  <li><a href="about.html" style="color:#9cf">About 2020</a> — table ends 2018 · participants not users</li>
  <li><a href="../sites/zoom/meeting.html" style="color:#9cf">Zoom meeting</a> — mute → chat → Leave</li>
  <li><a href="../sites/reels/index.html" style="color:#9cf">Reels 15s leftover</a> — 5 Aug</li>
  <li><a href="../sites/openai/index.html" style="color:#9cf">GPT-3 waitlist leftover</a> — not a chat</li>
  <li><a href="../sites/flash/index.html" style="color:#9cf">Flash EOL leftover</a> — 31 Dec</li>
  <li><a href="map.html" style="color:#9cf">Year flow map</a></li>
 </ol>
</div>
<p class="itt-mass-honesty" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em"><b>No June websites cell.</b> Live Stats table ends 2018 at 1,630,322,579. Netcraft Jan 2020: <b>1,295,973,827</b> hostnames · <b>~189 million</b> active. Zoom <b>300 million daily meeting participants</b> — not users. Chrome is already habit.</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a1a1a" style="border:2px solid #2d8cff">
<tr bgcolor="#111"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — 2020</b> · Win10 mass · Chrome habit · Zoom mute → leave
</td></tr>
<tr bgcolor="#d6eaf8"><td style="padding:8px 12px">
 <b>Join is the trap. Mute + chat + Leave is the save.</b>
 Participants, not users. Reels / GPT-3 / Flash are leftover.
</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <div data-itt-tour></div>
 <p><a href="map.html"><b>2020 UX flow map</b></a> · <a href="whats-new.html">What’s new</a> · <a href="about.html">About</a></p>
 <p class="itt-playable-link" data-itt-year-extras="2020" style="padding:8px;border:2px solid #333;background:#ffc"><b>▶ Play this year’s game</b> — <a href="../sites/playable/game.html"><b>Sus Vote</b></a> · extras: <a href="../sites/playable/more-a.html">Mute Round</a> · <a href="../sites/playable/more-b.html">Reel 15</a></p>
 <p class="itt-year-true-pack"><b>Also 2020 residual (not the one-thing):</b>
  <a href="../sites/reels/index.html"><b>Reels 15s</b></a> ·
  <a href="../sites/openai/index.html"><b>GPT-3 waitlist</b></a> ·
  <a href="../sites/flash/index.html"><b>Flash EOL</b></a> ·
  <a href="../sites/tiktok/index.html"><b>TikTok EO</b></a> ·
  <a href="../sites/ccpa/index.html"><b>CCPA</b></a>
 </p>
</td></tr>
</table>
</div>
<div class="itt-home-more" data-itt-year="2020">
<p class="itt-home-more-label">Also this year</p>
<p data-itt-pop3x="2020" class="itt-pop3x">Also popular in 2020 (leftover, not the chip): <a href="../sites/meet/index.html">Meet</a> · <a href="../sites/hbomax/index.html">HBO Max</a> · <a href="../sites/quibi/index.html">Quibi</a></p>
<p data-itt-pop-more="2020" class="itt-pop-more" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>3 more leftovers</b> (not the chip): <a href="../sites/acnh/index.html">ACNH</a> · <a href="../sites/mixer/index.html">Mixer</a> · <a href="../sites/discord/index.html">Discord</a> · pick + honesty · empty never writes</p>
</div>
<p class="itt-2x-trails" id="ott-2x-2020" style="margin:10px auto;padding:10px;background:#e8f5e9;border:1px solid #2e7d32;font-family:Arial,sans-serif;font-size:12px;max-width:52em"><b>2× leftover dests</b> (not the chip · incomplete never writes):
 {trail} →
 <a href="../sites/zoom/meeting.html">★ Zoom meeting</a></p>
<nav class="itt-3x-links" data-itt-3x-links data-itt-year="2020" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:11px;line-height:1.75;max-width:54em"><b>More rooms this year · 3×</b>
<p style="margin:6px 0 0">
 <a href="../sites/zoom/meeting.html">Zoom meeting</a> ·
 <a href="../sites/zoom/index.html">Join trap</a> ·
 <a href="../sites/reels/index.html">Reels</a> ·
 <a href="../sites/openai/index.html">GPT-3</a> ·
 <a href="../sites/flash/index.html">Flash</a> ·
 <a href="../sites/tiktok/index.html">TikTok EO</a> ·
 <a href="../sites/markets/wti.html">WTI</a> ·
 <a href="../sites/edge/index.html">Edge 79</a> ·
 <a href="../sites/ccpa/index.html">CCPA</a> ·
 <a href="../sites/chrome/index.html">Chrome habit</a> ·
 <a href="../sites/playable/game.html">Sus Vote</a> ·
 <a href="../sites/meet/index.html">Meet</a> ·
 <a href="../sites/hbomax/index.html">HBO Max</a> ·
 <a href="../sites/quibi/index.html">Quibi</a> ·
 <a href="../sites/acnh/index.html">ACNH</a> ·
 <a href="../sites/playable/more-a.html">Mute Round</a> ·
 <a href="../sites/playable/more-b.html">Reel 15</a>
</p>
</nav>
<script src="../../../js/year-ui/start-data.js"></script>
<script src="../../../js/immersion-2020.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )

    (pages / "about.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>About 2020 — dual scale · bans</title>
<link rel="stylesheet" href="../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2020</h1>
<p><b>2020 is the year the meeting becomes the internet — mute, type in chat, Leave is the save — while the Live Stats June table stops at 2018 and Zoom’s 300 million figure is daily meeting participants, not users.</b></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#d6eaf8"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b> (<b>−8%</b>). <b>No June 2020 websites digit.</b></td></tr>
<tr><td>Netcraft January 2020</td><td><b>1,295,973,827</b> hostnames · <b>249,618,033</b> domains · <b>9,576,845</b> computers · <b>~189 million</b> active — <b>January</b>, never June</td></tr>
<tr><td>Siteefy Jan 2020 compilation</td><td><b>1,030,111,000 / 189,021,000</b> (18.35%) — <b>third label</b>. Do not blend with 1,295,973,827.</td></tr>
<tr><td>ITU 2020 people-online</td><td>about <b>+10.2%</b> (largest in a decade) between 2019 ~4.1B / 53% and 2021 ~4.9B / 63%. No ILS June users cell.</td></tr>
<tr><td>Zoom April 2020</td><td><b>300 million daily meeting participants</b> (Yuan 17 Mar 2021). 10M Dec 2019 → 200M Mar → 300M Apr. Not unique users.</td></tr>
</table>
<p style="font-size:12px">The Live Stats June table ends 2018. Do not invent a 2020 websites cell. Netcraft’s January class is a different ruler. Siteefy’s compilation is a third label. Zoom walked back “daily active users” (CNBC 30 Apr 2020 class).</p>
<h2>How a day felt</h2>
<p>Chrome on Win10. A Join link. You’re muted. Chat is the only way to say can you hear me. Forty minutes later the Basic call dies. After lunch: Among Us, turnips, a 15-second reel, Do Not Sell, a Quibi nobody finished, WTI at minus thirty-seven dollars. 31 Dec Flash is a tombstone. Nobody has ChatGPT. Nobody has an ATT prompt that sticks.</p>
<h2>Bans — not 2020 defaults</h2>
<table border="1" cellpadding="4" cellspacing="0">
<tr><th align="left">Never 2020 default</th><th align="left">Correct era</th></tr>
<tr><td><b>June ILS 2020 websites digit</b></td><td>table ends 2018</td></tr>
<tr><td><b>300 million Zoom users / DAU</b></td><td>participants · walked back 30 Apr</td></tr>
<tr><td><b>Case-count dashboard</b></td><td>WHO 11 Mar is mood</td></tr>
<tr><td><b>ChatGPT</b></td><td>30 Nov 2022</td></tr>
<tr><td><b>ATT Ask App Not to Track</b></td><td>iOS 14.5 / 2021</td></tr>
<tr><td><b>Reels as the star</b></td><td>5 Aug leftover</td></tr>
<tr><td><b>TikTok vanished</b></td><td>app still works</td></tr>
<tr><td><b>Among Us launched 2020</b></td><td>15 Jun 2018</td></tr>
</table>
<label><input type="checkbox" data-req data-thesis-req> I read that the Live Stats June table ends 2018 and I will not invent a 2020 websites cell.</label><br>
<label><input type="checkbox" data-req data-thesis-req> I know 300 million is daily meeting participants, not users, and Join never writes the star.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button>
<span data-itt-action-status></span></p>
<h2>Sources this door is built from</h2>
<ul style="font-size:12px;line-height:1.45">
<li><b>Scale</b> — ILS June table ends 2018 at 1,630,322,579. Netcraft Jan 2020: 1,295,973,827 / ~189M active. Siteefy Jan 2020 compilation is a third label.</li>
<li><b>Zoom</b> — Yuan 17 Mar 2021 · 22 Apr 2020 5.0 / 90-day plan · 40-minute Basic cap.</li>
<li><b>Leftovers</b> — Reels 5 Aug · Flash 31 Dec · CCPA 1 Jan / 1 Jul · EO 13942 6 Aug · WTI −$37.63 · Edge 79 15 Jan · GPT-3 waitlist 11 Jun.</li>
<li><b>Look</b> — <code>docs/2020-READ-FIRST.md</code> · harvest 2026-08-28.</li>
</ul>
<p><a href="home.html">← Starting Point</a></p>
</div>
<script src="../../../js/immersion-2020.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )

    (pages / "map.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>2020 flow map</title>
<link rel="stylesheet" href="../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:16px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px;line-height:1.5">
<p class="crumb"><a href="home.html">← Starting Point</a> · <a href="about.html">About</a></p>
<h1>2020 UX flow map</h1>
<p>Join is highlighted. <b>Mute + chat + Leave is the real click</b>. Star = Zoom. Guided list stays 6. 28 leftover dests sit off the official 10.</p>
<pre style="font-size:11px;background:#111;color:#9cf;padding:10px;overflow:auto">
Starting Point
 ├─ Guided 6 …… About → ★ Zoom → Reels → GPT-3 → Flash → this map
 ├─ Official 10 … Zoom → Reels → GPT-3 → Flash → TikTok EO → WTI
 │                 → Edge → CCPA → Chrome → Sus Vote ──► Zoom
 └─ 2× leftovers … 28 dests (Meet … FYP) ──► Zoom
</pre>
<ol data-itt-ten-flows style="padding-left:1.3em">
 <li>★ <a href="../sites/zoom/meeting.html">Zoom mute → leave</a> — Join never writes. <code>itt20-zoom</code>.</li>
 <li><a href="../sites/reels/index.html">Reels 15s leftover</a> — 5 Aug. <code>itt20-reels</code>.</li>
 <li><a href="../sites/openai/index.html">GPT-3 waitlist leftover</a> — 11 Jun. <code>itt20-gpt3</code>.</li>
 <li><a href="../sites/flash/index.html">Flash EOL leftover</a> — 31 Dec. <code>itt20-flash</code>.</li>
 <li><a href="../sites/tiktok/index.html">TikTok EO leftover</a> — 6 Aug. <code>itt20-tiktok-eo</code>.</li>
 <li><a href="../sites/markets/wti.html">WTI −$37.63 leftover</a> — 20 Apr. <code>itt20-wti</code>.</li>
 <li><a href="../sites/edge/index.html">Edge 79 leftover</a> — 15 Jan. <code>itt20-edge</code>.</li>
 <li><a href="../sites/ccpa/index.html">CCPA leftover</a> — Do Not Sell. <code>itt20-ccpa</code>.</li>
 <li><a href="../sites/chrome/index.html">Chrome habit leftover</a>. <code>itt20-chrome</code>.</li>
 <li><a href="../sites/playable/game.html">Sus Vote</a>. <code>itt20-game-among</code>.</li>
</ol>
<p><a href="about.html">About</a> · <a href="home.html">Home</a></p>
<div data-itt-flow-map></div>
</div>
<script src="../../../js/config/flow-maps.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../js/immersion-2020.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (pages / "whats-new.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>What’s new — 2020</title>
<link rel="stylesheet" href="../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>What’s new — 2020</h1>
<p>Zoom mute → leave is the one-thing. 28 leftover dests (more than 2007). No June ILS digit. No 300 million users copy.</p>
<p><a href="about.html">About</a> · <a href="map.html">Map</a></p>
</div>
<script src="../../../js/immersion-2020.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )


def write_js():
    rooms = [
        "pages/home.html",
        "pages/about.html",
        "pages/map.html",
        "pages/whats-new.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
        "sites/zoom/index.html",
        "sites/zoom/meeting.html",
        "sites/zoom/wait.html",
        "sites/tiktok/fyp.html",
        "sites/playable/index.html",
        "sites/playable/game.html",
        "sites/playable/more-a.html",
        "sites/playable/more-b.html",
        "sites/playable/extra-a.html",
        "sites/playable/extra-b.html",
        "sites/playable/extra-c.html",
        "sites/playable/extra-d.html",
        "sites/playable/extra-e.html",
    ]
    for slug, fname, *_rest in DESTS:
        rooms.append(f"sites/{slug}/{fname}")
    rooms = list(dict.fromkeys(rooms))

    url_lines = ['    "index.html": "http://museum.local/index.html",']
    for r in rooms:
        url_lines.append(f'    "{r}": "http://museum.local/years/2020/{r}",')
    (ROOT / "js" / "config" / "2020.js").write_text(
        """/**
 * Year config — 2020 lean from-scratch
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = %s;

  var urlMap = {
%s
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2020/" + rooms[i];
    }
  }

  ITT.configs["2020"] = {
    year: "2020",
    home: "pages/home.html",
    prefsKey: "itt-2020-prefs",
    bookmarksKey: "itt-2020-bookmarks",
    connectedKey: "itt-2020-connected",
    immersionScript: "js/immersion-2020.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Chrome habit",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Chrome habit...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20
    },
    urlMap: urlMap,
    titleMap: {
      "pages/home.html": "Welcome to the World Wide Web — 2020",
      "pages/about.html": "About 2020",
      "sites/zoom/meeting.html": "You’re muted — Zoom 2020"
    }
  };
})(typeof window !== "undefined" ? window : this);
"""
        % (json.dumps(rooms, indent=4), "\n".join(url_lines)),
        encoding="utf-8",
    )

    (ROOT / "js" / "config" / "immersion-2020.js").write_text(
        """/**
 * Immersion config — 2020 lean
 * Thesis: Join is the trap · mute + chat + Leave is the save
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2020"] = {
    year: "2020",
    storagePrefix: "itt20",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2020Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 mass · Chrome habit · Zoom mute → leave",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Zoom", href: "sites/zoom/meeting.html", match: "/zoom/" },
      { label: "Reels", href: "sites/reels/index.html", match: "/reels/" },
      { label: "GPT-3", href: "sites/openai/index.html", match: "/openai/" },
      { label: "Flash", href: "sites/flash/index.html", match: "/flash/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Zoom meeting", href: "sites/zoom/meeting.html" },
      { label: "Reels leftover", href: "sites/reels/index.html" },
      { label: "About 2020", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
""",
        encoding="utf-8",
    )

    (ROOT / "js" / "immersion-2020.js").write_text(
        """/**
 * Immersion year stub — 2020
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2020";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = me && me.src ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
""",
        encoding="utf-8",
    )

    (ROOT / "js" / "browser-2020.js").write_text(
        """/**
 * Browser year stub — 2020
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2020");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2020"]) {
    console.error("ITT 2020 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2020"]);
})();
""",
        encoding="utf-8",
    )

    (ROOT / "js" / "immersion" / "year-2020-extras.js").write_text(
        r"""/**
 * 2020 lean extras — Zoom mute → chat → Leave
 * Keys: itt20-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2020");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2020 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2020", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function reveal(doc) {
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
    } catch (eN) { /* */ }
  }
  function countChecked(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function bootTraps(doc) {
    var traps = doc.querySelectorAll("[data-z20-trap]");
    var i;
    for (i = 0; i < traps.length; i++) {
      traps[i].addEventListener("click", function () {
        var msg = this.getAttribute("data-z20-trap-msg") || "Trap. That click never writes.";
        var st = doc.querySelector("[data-z20-trap-status], [data-zoom-join-status], [data-zoom-status], [data-sus-status]");
        feedback(msg, st, { error: true });
      });
    }
    var join = doc.querySelector("[data-zoom-join]");
    if (join) {
      join.addEventListener("click", function () {
        feedback("Join is the trap. Mute + chat + Leave writes the star.", doc.querySelector("[data-zoom-join-status]"), { error: true });
      });
    }
    var vid = doc.querySelector("[data-zoom-video]");
    if (vid) {
      vid.addEventListener("click", function () {
        feedback("Video-on / unmute-to-save never writes.", doc.querySelector("[data-zoom-status]"), { error: true });
      });
    }
  }

  function bootZoom(doc) {
    var mute = doc.querySelector("[data-zoom-mute]");
    var send = doc.querySelector("[data-zoom-send]");
    var leave = doc.querySelector("[data-zoom-leave]");
    var chat = doc.querySelector("[data-zoom-chat]");
    var st = doc.querySelector("[data-zoom-status]");
    if (!leave) return;
    var sent = false;
    var saved = YX.loadJSON(key("zoom"));
    if (saved && saved.real) {
      var reqs0 = doc.querySelectorAll("[data-zoom-req]");
      var r0;
      for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
      if (mute) mute.setAttribute("aria-pressed", "true");
      sent = true;
      feedback("Meeting leftover · " + key("zoom"), st);
      reveal(doc);
    }
    if (mute) {
      mute.addEventListener("click", function () {
        var on = mute.getAttribute("aria-pressed") === "true";
        mute.setAttribute("aria-pressed", on ? "false" : "true");
        mute.textContent = on ? "Mute" : "Unmute";
        feedback(on ? "Unmuted. Leave still needs mute + chat." : "Muted.", st);
      });
    }
    if (send) {
      send.addEventListener("click", function () {
        var t = chat && chat.value ? String(chat.value).trim() : "";
        if (t.length < 2) {
          feedback("Type at least 2 characters in chat. Incomplete never writes.", st, { error: true });
          return;
        }
        sent = true;
        feedback("Chat sent. Now Leave.", st);
      });
    }
    leave.addEventListener("click", function () {
      if (countChecked(doc, "[data-zoom-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!mute || mute.getAttribute("aria-pressed") !== "true") {
        feedback("Mute first. Unmute leave never writes.", st, { error: true });
        return;
      }
      var t = chat && chat.value ? String(chat.value).trim() : "";
      if (!sent || t.length < 2) {
        feedback("Send chat (≥2 chars) before Leave. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(
        key("zoom"),
        blob({
          participantsNotUsers: true,
          muted: true,
          left: true,
          chat: t.slice(0, 80)
        })
      );
      feedback("Left muted · " + key("zoom"), st);
      reveal(doc);
    });
  }

  function bootAmong(doc) {
    var vote = doc.querySelector("[data-sus-vote]");
    var skip = doc.querySelector("[data-sus-skip]");
    var field = doc.querySelector("[data-sus-field]");
    var st = doc.querySelector("[data-sus-status]");
    var start = doc.querySelector("[data-game-start]");
    if (!vote) return;
    var started = false;
    if (start) {
      start.addEventListener("click", function () {
        started = true;
        feedback("Meeting called. Task + vote still required.", st);
      });
    }
    if (skip) {
      skip.addEventListener("click", function () {
        feedback("Skip vote never writes.", st, { error: true });
      });
    }
    vote.addEventListener("click", function () {
      if (!started) {
        feedback("Start first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-sus-req]") < 2) {
        feedback("Tick both honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      var t = field && field.value ? String(field.value).trim() : "";
      if (t.length < 3) {
        feedback("Type the emergency line. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("game-among"), blob({ vote: t.slice(0, 40), launched2018: true }));
      feedback("Voted · " + key("game-among"), st);
      reveal(doc);
    });
  }

  function bootAll(doc) {
    bootTraps(doc);
    bootZoom(doc);
    bootAmong(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2020-extras", featureKey: "year2020Extras", boot: bootAll });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
""",
        encoding="utf-8",
    )


def write_css():
    src = ROOT / "css" / "period-2021.css"
    dst = ROOT / "css" / "period-2020.css"
    if src.exists() and not dst.exists():
        text = src.read_text(encoding="utf-8")
        text = text.replace("2021", "2020").replace("itt21", "itt20")
        dst.write_text("/* 2020 lean · Win10 + Chrome habit · no official Zoom art */\n" + text, encoding="utf-8")
    elif not dst.exists():
        dst.write_text(
            "/* 2020 lean door */\nbody{font-family:Segoe UI,Arial,sans-serif}\n.itt-pixel-failed{font-size:11px;color:#666}\n",
            encoding="utf-8",
        )


def copy_shell():
    src = ROOT / "years" / "2021" / "index.html"
    dst = Y / "index.html"
    text = src.read_text(encoding="utf-8")
    text = text.replace("2021", "2020")
    text = text.replace("itt21", "itt20")
    text = text.replace("ATT leftover year", "Zoom mute → leave")
    text = text.replace("ATT · Signal · Copilot waitlist", "Zoom mute → leave · participants not users")
    text = text.replace(
        "2019 thesis: Who’s watching is the door · a 7-day trial is the trap · Continue is the save.\n Disney+ Continue · TikTok leftover · Arcade · Stadia.",
        "2020 thesis: Join is the trap · mute + chat + Leave is the save.\n Participants, not users. Reels / GPT-3 / Flash leftover.",
    )
    # 2021 index thesis block
    text = re.sub(
        r"2021 thesis:.*?(?=</p>)",
        "2020 thesis: Join is the trap · mute + chat + Leave is the save. Participants, not users.",
        text,
        count=1,
        flags=re.S,
    )
    if "2021 thesis" in text:
        text = text.replace("2021 thesis", "2020 thesis")
    text = text.replace("js/config/2020.js", "js/config/2020.js")
    text = text.replace("Chrome habit — 2020", "Chrome habit — 2020")
    dst.write_text(text, encoding="utf-8")


def patch_wires():
    sd = ROOT / "js" / "year-ui" / "start-data.js"
    s = sd.read_text(encoding="utf-8")
    if '"2020"' not in s:
        block = """  "2020": {
    "href": "../sites/zoom/meeting.html",
    "label": "★ One-thing · Zoom mute → leave REAL",
    "items": [
      "<a href=\\"about.html\\">About 2020</a> — dual scale · bans",
      "<a href=\\"../sites/zoom/meeting.html\\">Zoom meeting</a> — mute + chat + Leave REAL",
      "<a href=\\"../sites/reels/index.html\\">Reels 15s leftover</a> — 5 Aug",
      "<a href=\\"../sites/openai/index.html\\">GPT-3 waitlist leftover</a> — not a chat",
      "<a href=\\"../sites/flash/index.html\\">Flash EOL leftover</a> — 31 Dec",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  },
"""
        s = s.replace('  "2021":', block + '  "2021":')
        if '"2020"' not in s:
            s = s.replace('  "2019":', block + '  "2019":')
        sd.write_text(s, encoding="utf-8")

    ft = ROOT / "js" / "config" / "flow-trails.js"
    t = ft.read_text(encoding="utf-8")
    if '"2020"' not in t:
        block = """    "2020": [
      {"n": 1, "name": "Zoom mute", "href": "sites/zoom/meeting.html", "match": "/zoom/meeting", "whenKey": "itt20-zoom", "nextHref": "sites/reels/index.html", "nextLabel": "Reels 15s"},
      {"n": 2, "name": "Reels 15s", "href": "sites/reels/index.html", "match": "/reels/", "whenKey": "itt20-reels", "nextHref": "sites/openai/index.html", "nextLabel": "GPT-3 waitlist"},
      {"n": 3, "name": "GPT-3 waitlist", "href": "sites/openai/index.html", "match": "/openai/", "whenKey": "itt20-gpt3", "nextHref": "sites/flash/index.html", "nextLabel": "Flash EOL"},
      {"n": 4, "name": "Flash EOL", "href": "sites/flash/index.html", "match": "/flash/", "whenKey": "itt20-flash", "nextHref": "sites/tiktok/index.html", "nextLabel": "TikTok EO"},
      {"n": 5, "name": "TikTok EO", "href": "sites/tiktok/index.html", "match": "/tiktok/", "whenKey": "itt20-tiktok-eo", "nextHref": "sites/markets/wti.html", "nextLabel": "WTI"},
      {"n": 6, "name": "WTI −$37.63", "href": "sites/markets/wti.html", "match": "/markets/", "whenKey": "itt20-wti", "nextHref": "sites/edge/index.html", "nextLabel": "Edge 79"},
      {"n": 7, "name": "Edge 79", "href": "sites/edge/index.html", "match": "/edge/", "whenKey": "itt20-edge", "nextHref": "sites/ccpa/index.html", "nextLabel": "CCPA"},
      {"n": 8, "name": "CCPA", "href": "sites/ccpa/index.html", "match": "/ccpa/", "whenKey": "itt20-ccpa", "nextHref": "sites/chrome/index.html", "nextLabel": "Chrome habit"},
      {"n": 9, "name": "Chrome habit", "href": "sites/chrome/index.html", "match": "/chrome/", "whenKey": "itt20-chrome", "nextHref": "sites/playable/game.html", "nextLabel": "Sus Vote"},
      {"n": 10, "name": "Sus Vote", "href": "sites/playable/game.html", "match": "/playable/game", "whenKey": "itt20-game-among", "nextHref": "sites/zoom/meeting.html", "nextLabel": "Zoom"}
    ],
"""
        t = t.replace('    "2021":', block + '    "2021":')
        ft.write_text(t, encoding="utf-8")

    fm = ROOT / "js" / "config" / "flow-maps.js"
    m = fm.read_text(encoding="utf-8")
    if 'ITT.flowMaps["2020"]' not in m:
        block = """
  ITT.flowMaps["2020"] = {
    "thesis": "Join is the trap. Mute + chat + Leave writes the star. Participants, not users.",
    "shell": "Windows 10 · Chrome habit",
    "how": [
      "Zoom: mute + chat + Leave → itt20-zoom (Join never writes)",
      "Reels 15s leftover · GPT-3 waitlist · Flash 31 Dec",
      "28 leftover dests on the 2× trail — more than 2007"
    ],
    "year": "2020",
    "branches": [
      {
        "label": "Enter",
        "do": "Meeting lobby",
        "sites": [
          { "name": "Starting Point", "href": "pages/home.html", "do": "Zoom · Reels · Flash" },
          { "name": "About 2020", "href": "pages/about.html", "do": "No June ILS · 300M participants" },
          { "name": "Year flow map", "href": "pages/map.html", "do": "Official 10" }
        ]
      },
      {
        "label": "Official 10",
        "do": "Star then leftovers",
        "sites": [
          { "name": "1 Zoom mute", "href": "sites/zoom/meeting.html", "do": "Leave → itt20-zoom" },
          { "name": "2 Reels 15s", "href": "sites/reels/index.html", "do": "15s leftover" },
          { "name": "3 GPT-3 waitlist", "href": "sites/openai/index.html", "do": "waitlist not chat" },
          { "name": "4–10 leftovers", "href": "sites/flash/index.html", "do": "Flash · EO · WTI · Edge · CCPA · Chrome · Sus" }
        ]
      }
    ]
  };

"""
        m = m.replace('ITT.flowMaps["2021"]', block + 'ITT.flowMaps["2021"]')
        fm.write_text(m, encoding="utf-8")

    reg = ROOT / "js" / "immersion" / "registry.js"
    r = reg.read_text(encoding="utf-8")
    if '"2020"' not in r:
        r = r.replace(
            '    "2021": [',
            '    "2020": [\n      "immersion/no-mock-common.js",\n      "immersion/year-2020-extras.js",\n      "immersion/one-thing-machines.js"\n    ],\n    "2021": [',
        )
        reg.write_text(r, encoding="utf-8")

    gate = ROOT / "scripts" / "itt_gate.py"
    g = gate.read_text(encoding="utf-8")
    g = g.replace('_WIPED = {"2020", "2024", "2025"}', '_WIPED = {"2024", "2025"}')
    g = g.replace("2020 stays wiped.", "2020 lean door is live.")
    g = g.replace("2020, 2024–2025 wiped.", "2024–2025 wiped.")
    gate.write_text(g, encoding="utf-8")


def main():
    Y.mkdir(parents=True, exist_ok=True)
    write_css()
    copy_shell()
    write_pages()
    write_zoom()
    write_tiktok_fyp()
    for row in DESTS:
        write_dest(*row)
    write_playable()
    write_js()
    patch_wires()
    n = len(list(Y.rglob("*.html")))
    print("2020 HTML", n)


if __name__ == "__main__":
    main()
