#!/usr/bin/env python3
"""CUT-OPEN 2020 Zoom lean door. Clone 2018 shape. No forest. Leftover-4× 0."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2020"

OFFICIAL = [
    ("zoom", "sites/zoom/meeting.html", "itt20-zoom", "zoom-lx", "zoom-d2", "Reels 15s leftover", "../reels/index.html", "Join as gold (trap)"),
    ("reels", "sites/reels/index.html", "itt20-reels", "reels-lx", "reels-d2", "GPT-3 waitlist leftover", "../openai/index.html", "2019 Brazil test as gold (trap)"),
    ("openai", "sites/openai/index.html", "itt20-gpt3", "gpt3-lx", "gpt3-d2", "Flash EOL leftover", "../flash/index.html", "public model as gold (trap)"),
    ("flash", "sites/flash/index.html", "itt20-flash", "flash-lx", "flash-d2", "TikTok EO leftover", "../tiktok/index.html", "Flash as 2020 gold (trap)"),
    ("tiktok", "sites/tiktok/index.html", "itt20-tiktok-eo", "tteo-lx", "tteo-d2", "WTI leftover", "../markets/wti.html", "COPPA as 2020 unlock (trap)"),
    ("markets", "sites/markets/wti.html", "itt20-wti", "wti-lx", "wti-d2", "Edge 79 leftover", "../edge/index.html", "price as gold (trap)"),
    ("edge", "sites/edge/index.html", "itt20-edge", "edge-lx", "edge-d2", "CCPA leftover", "../ccpa/index.html", "2019 preview as default (trap)"),
    ("ccpa", "sites/ccpa/index.html", "itt20-ccpa", "ccpa-lx", "ccpa-d2", "Chrome habit leftover", "../chrome/index.html", "GDPR as 2020 gold (trap)"),
    ("chrome", "sites/chrome/index.html", "itt20-chrome", "ch-lx", "ch-d2", "Sus Vote", "../playable/game.html", "Edge as 2020 default (trap)"),
    ("playable", "sites/playable/game.html", "itt20-game-among", "game-lx", "game-d2", "★ Zoom mute → Leave", "../zoom/meeting.html", "Continue Row as 2020 (trap)"),
]
FIRST = [
    ("youtube", "YouTube leftover", "itt20-pop-youtube", "yt leftover", "YouTube as gold (trap)", "../wikipedia/index.html"),
    ("wikipedia", "Wikipedia leftover", "itt20-pop-wikipedia", "wiki leftover", "Wiki as gold (trap)", "../facebook/index.html"),
    ("facebook", "Facebook leftover", "itt20-pop-facebook", "fb leftover", "Facebook as gold (trap)", "../../pages/home.html"),
]
THIRD = [
    ("teams", "Teams leftover", "itt20-pop3-teams", "pop3-teams", "teams leftover", "Teams as gold (trap)", "../vine/index.html"),
    ("vine", "Vine leftover", "itt20-pop3-vine", "pop3-vine", "vine leftover", "Vine as 2020 gold (trap)", "../tiktok/index.html"),
    ("tiktok", "TikTok leftover", "itt20-pop3-tiktok", "pop3-tiktok", "tiktok leftover", "TikTok as 2020 gold (trap)", "../../pages/home.html"),
]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def lo2x(slug: str, lx: str, d2: str, nxt: str, nxt_lab: str, trap: str) -> str:
    return f"""<!-- ITT-LO-2X:{slug}:start -->
<section data-lo-panel="1" data-itt-year="2020" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>Leftover 2×</b> · dest-true · incomplete never writes · <code>itt20-{lx}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> Year leftover. The chip is not this dest.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Empty / trap / 0 ticks never write.</label>
<p>
 <button type="button" data-lo-pick="keep">Leftover {slug}</button>
 <button type="button" data-lo-pick="trap">{trap}</button>
</p>
<p><label>Leftover honesty<br><input type="text" data-lo-field maxlength="80" placeholder="{slug} leftover" autocomplete="off"></label></p>
<p>
 <button type="button" data-lo-trap>{trap}</button>
 <button type="button" data-lo-save data-lo-key="{lx}" data-lo-need-pick="keep">Leftover {slug}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt20-{lx}"><b>Next:</b> <a href="{nxt}">{nxt_lab}</a></p>
</section>
<section data-lo-panel="1" data-itt-year="2020" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>Leftover 2× #2</b> · dest-true · incomplete never writes · <code>itt20-{d2}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> Second leftover path. Not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Incomplete never writes.</label>
<p>
 <button type="button" data-lo-pick="keep">Leftover {slug} again</button>
 <button type="button" data-lo-pick="trap">{trap}</button>
</p>
<p><label>Leftover honesty<br><input type="text" data-lo-field maxlength="80" placeholder="{slug} leftover" autocomplete="off"></label></p>
<p>
 <button type="button" data-lo-trap>{trap}</button>
 <button type="button" data-lo-save data-lo-key="{d2}" data-lo-need-pick="keep">Leftover {slug} again</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt20-{d2}"><b>Next:</b> <a href="{nxt}">{nxt_lab}</a></p>
</section>
<!-- ITT-LO-2X:{slug}:end -->
"""


def page_shell(title: str, body: str, css_depth: str = "../../../") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="{css_depth}css/period-2020.css">
</head>
<body bgcolor="#f2f2d2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
{body}
</div>
<script src="{css_depth}js/immersion-2020.js"></script>
</body></html>
"""


def dest_shell(title: str, official_key: str, body: str) -> str:
    key_attr = f' data-official-key="{official_key}"' if official_key else ""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2020"{key_attr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2d2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
{body}
</div>
<script src="../../../../js/immersion-2020.js"></script>
</body></html>
"""


def pop3x(id_: str, title: str, key: str, ph: str, trap: str, nxt: str, nxt_lab: str, pop_key: str | None = None) -> str:
    key_attr = f' data-pop-key="{pop_key}"' if pop_key else ""
    return f"""<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="2020" style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{title}</b> · leftover 3× · incomplete never writes · <code>{key}</code></p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{ph}">{title}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>{title}<br><input type="text" data-pop-field placeholder="{ph}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> 2020 leftover. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> Incomplete never writes gold.</label>
<p><button type="button" data-pop-go data-pop-id="{id_}"{key_attr}>Go leftover</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nxt_lab}</a></p>
</div>
"""


def main() -> None:
    write(
        Y / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chrome habit — 2020</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2020");</script>
<script src="../../js/lib/util.js?v=20260908cutopen"></script>
<script src="../../js/browser-core.js?v=20260908cutopen"></script>
<script src="../../js/config/2020.js?v=20260908cutopen"></script>
<script src="../../js/browser-2020.js?v=20260908cutopen"></script>
</body>
</html>
""",
    )
    write(
        Y / "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2020</title>
<link rel="stylesheet" href="../../../css/period-2020.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#e3f2fd">
<p class="itt-pop3x" data-itt-pop3x="2020" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>Also this year · 3×</b> (not the chip · empty never writes): <a href="../sites/youtube/index.html">YouTube leftover</a> · <a href="../sites/wikipedia/index.html">Wikipedia leftover</a> · <a href="../sites/facebook/index.html">Facebook leftover</a> · pick + honesty</p>
<p class="itt-pop-3x3" data-itt-pop-3x3="2020" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>3 more leftovers</b> (not the chip · empty never writes): <a href="../sites/teams/index.html">Teams leftover</a> · <a href="../sites/vine/index.html">Vine leftover</a> · <a href="../sites/tiktok/index.html">TikTok leftover</a> · pick + honesty</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2020");</script>
<script src="../../../js/immersion-2020.js" defer></script>
</body>
</html>
""",
    )
    write(
        Y / "pages/about.html",
        page_shell(
            "About 2020 — Netcraft Jan 1,295,973,827",
            """<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2020</h1>
<p><b>The meeting becomes the room.</b> Mute then chat then Leave is the save. Join never writes. 300 million is daily meeting participants, not users.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#e3f2fd"><th>Cite</th><th>Number</th></tr>
<tr><td>ILS June websites</td><td><b>blank</b> — table ends 2018 at 1,630,322,579 (−8%)</td></tr>
<tr><td>ILS users</td><td><b>blank</b> — do not invent</td></tr>
<tr><td>Netcraft January 2020</td><td><b>1,295,973,827</b> hostnames · ~189M active</td></tr>
<tr><td>Siteefy January 2020</td><td><b>1,030,111,000 / 189,021,000</b> (18.35%) · third label</td></tr>
<tr><td>Zoom April</td><td><b>300 million daily meeting participants</b> · not users</td></tr>
</table>
<p>Shell: Win10 mass · Chrome habit. Edge 79 is leftover.</p>
<h2>Bans</h2>
<ul>
<li>Disney+ Continue as star · Continue Row as year game · case-count dashboard · “300 million Zoom users” · invented ILS June 2020 digit · Meta rename · Reels as gold</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read Netcraft Jan 1,295,973,827. ILS 2020 cells blank.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> Join never writes. 300 million is participants.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p hidden data-next-flow><b>Next:</b> <a href="../sites/zoom/meeting.html">★ Zoom mute → Leave</a></p>
</section>
""",
        ),
    )
    write(
        Y / "pages/map.html",
        page_shell(
            "2020 — UX flow map",
            """<h1>2020 flow map</h1>
<ul>
<li><a href="about.html">About</a></li>
<li><a href="../sites/zoom/meeting.html">★ Zoom mute → Leave</a></li>
<li><a href="../sites/reels/index.html">Reels 15s leftover</a></li>
<li><a href="../sites/openai/index.html">GPT-3 waitlist leftover</a></li>
<li><a href="../sites/flash/index.html">Flash EOL leftover</a></li>
<li><a href="../sites/tiktok/index.html">TikTok EO leftover</a></li>
<li><a href="../sites/markets/wti.html">WTI leftover</a></li>
<li><a href="../sites/edge/index.html">Edge 79 leftover</a></li>
<li><a href="../sites/ccpa/index.html">CCPA leftover</a></li>
<li><a href="../sites/chrome/index.html">Chrome habit leftover</a></li>
<li><a href="../sites/youtube/index.html">YouTube leftover 3×</a></li>
<li><a href="../sites/wikipedia/index.html">Wikipedia leftover 3×</a></li>
<li><a href="../sites/facebook/index.html">Facebook leftover 3×</a></li>
<li><a href="../sites/teams/index.html">Teams leftover 3×</a></li>
<li><a href="../sites/vine/index.html">Vine leftover 3×</a></li>
<li><a href="../sites/playable/game.html">Sus Vote</a></li>
</ul>
""",
        ),
    )
    write(
        Y / "pages/whats-new.html",
        page_shell(
            "What's new — 2020",
            "<h1>What's new — 2020</h1><p>CUT-OPEN lean door. Zoom mute → Leave is the chip. Leftover 2× on every dest. Leftover 4× 0.</p><p><a href=\"home.html\">Starting Point</a></p>",
        ),
    )
    for name in ("404", "unreachable"):
        write(
            Y / f"pages/error/{name}.html",
            page_shell(
                f"{name} leftover — 2020",
                f'<p class="crumb"><a href="../home.html">Starting Point</a></p><h1>{name} leftover — 2020</h1><p>Museum leftover error room. Not the chip.</p>',
                css_depth="../../../../",
            ),
        )

    # Zoom star
    write(
        Y / "sites/zoom/meeting.html",
        dest_shell(
            "Zoom mute → Leave — 2020",
            "",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Zoom · mute → chat → Leave</h1>
<p>Join never writes <code>itt20-zoom</code>. 300 million is daily meeting participants, not users.</p>
<p><button type="button" data-zoom-join>Join (trap)</button></p>
<p><button type="button" data-zoom-mute>Mute leftover</button></p>
<p><label>Chat leftover<br><input type="text" data-zoom-chat maxlength="80" placeholder="can you hear me"></label>
 <button type="button" data-zoom-send>Send</button></p>
<label style="display:block"><input type="checkbox" data-zoom-req> Leave is the save. Join never writes.</label>
<label style="display:block"><input type="checkbox" data-zoom-req> 300 million is participants. Incomplete never writes.</label>
<p><button type="button" data-zoom-leave>Leave</button> <span data-zoom-status></span></p>
<p hidden data-next-flow data-next-when-key="itt20-zoom"><b>Next:</b> <a href="../reels/index.html">Reels 15s leftover</a></p>
"""
            + lo2x("zoom", "zoom-lx", "zoom-d2", "../reels/index.html", "Reels 15s leftover", "Join as gold (trap)"),
        ),
    )

    official_bodies = {
        "reels": (
            "Reels 15s leftover — 2020",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Reels 15s leftover</h1>
<p>IG 5 Aug 2020. Never 2019 gold. Never the Zoom chip.</p>
<p><label>15s leftover<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="15s leftover"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> Reels is leftover. Zoom Leave is the star.</label>
<label style="display:block"><input type="checkbox" data-official-req> 2019 Brazil test is not 2020 gold.</label>
<p>
 <button type="button" data-official-trap>2019 Brazil test as gold (trap)</button>
 <button type="button" data-official-verb>Save 15s leftover</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt20-reels"><b>Next:</b> <a href="../openai/index.html">GPT-3 waitlist leftover</a></p>
""",
        ),
        "openai": (
            "GPT-3 waitlist leftover — 2020",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>GPT-3 waitlist leftover</h1>
<p>Waitlist leftover. Not ChatGPT Send (2022). Not the chip.</p>
<p><label>Waitlist leftover<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="waitlist leftover"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> GPT-3 waitlist is leftover. Zoom Leave is the star.</label>
<label style="display:block"><input type="checkbox" data-official-req> Public chat is not 2020 gold.</label>
<p>
 <button type="button" data-official-trap>Public model as gold (trap)</button>
 <button type="button" data-official-verb>Join leftover waitlist</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt20-gpt3"><b>Next:</b> <a href="../flash/index.html">Flash EOL leftover</a></p>
""",
        ),
        "flash": (
            "Flash EOL leftover — 2020",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Flash EOL leftover</h1>
<p>31 Dec 2020 leftover literacy. Not the chip.</p>
<p><label>EOL leftover<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="eol leftover"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> Flash EOL is leftover. Zoom Leave is the star.</label>
<label style="display:block"><input type="checkbox" data-official-req> Incomplete never writes.</label>
<p>
 <button type="button" data-official-trap>Flash as 2020 gold (trap)</button>
 <button type="button" data-official-verb>Ack leftover EOL</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt20-flash"><b>Next:</b> <a href="../tiktok/index.html">TikTok EO leftover</a></p>
""",
        ),
        "tiktok": (
            "TikTok EO leftover — 2020",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>TikTok EO leftover</h1>
<p>2020 leftover literacy. COPPA is 2019. Not the chip.</p>
<p><label>EO leftover<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="eo leftover"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> TikTok EO is leftover. Zoom Leave is the star.</label>
<label style="display:block"><input type="checkbox" data-official-req> COPPA is not a 2020 unlock.</label>
<p>
 <button type="button" data-official-trap>COPPA as 2020 unlock (trap)</button>
 <button type="button" data-official-verb>Ack leftover EO</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt20-tiktok-eo"><b>Next:</b> <a href="../markets/wti.html">WTI leftover</a></p>
""",
        ),
        "markets": (
            "WTI leftover — 2020",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>WTI leftover</h1>
<p>April 2020 leftover literacy. Not a live ticker. Not the chip.</p>
<p><label>WTI leftover<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="wti leftover"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> WTI is leftover. Zoom Leave is the star.</label>
<label style="display:block"><input type="checkbox" data-official-req> Incomplete never writes.</label>
<p>
 <button type="button" data-official-trap>Price as gold (trap)</button>
 <button type="button" data-official-verb>Ack leftover WTI</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt20-wti"><b>Next:</b> <a href="../edge/index.html">Edge 79 leftover</a></p>
""",
        ),
        "edge": (
            "Edge 79 leftover — 2020",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Edge 79 leftover</h1>
<p>Out of preview 15 Jan 2020. Not the default-browser gold. Chrome habit is the shell.</p>
<p><label>Edge leftover<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="edge leftover"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> Edge 79 is leftover. Zoom Leave is the star.</label>
<label style="display:block"><input type="checkbox" data-official-req> 2019 preview is not 2020 default gold.</label>
<p>
 <button type="button" data-official-trap>2019 preview as default (trap)</button>
 <button type="button" data-official-verb>Ack leftover Edge 79</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt20-edge"><b>Next:</b> <a href="../ccpa/index.html">CCPA leftover</a></p>
""",
        ),
        "ccpa": (
            "CCPA leftover — 2020",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>CCPA leftover</h1>
<p>1 Jan 2020 leftover literacy. GDPR is 2018. Not the chip.</p>
<p><label>CCPA leftover<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="ccpa leftover"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> CCPA is leftover. Zoom Leave is the star.</label>
<label style="display:block"><input type="checkbox" data-official-req> GDPR is not 2020 gold.</label>
<p>
 <button type="button" data-official-trap>GDPR as 2020 gold (trap)</button>
 <button type="button" data-official-verb>Ack leftover CCPA</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt20-ccpa"><b>Next:</b> <a href="../chrome/index.html">Chrome habit leftover</a></p>
""",
        ),
        "chrome": (
            "Chrome habit leftover — 2020",
            """<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Chrome habit leftover</h1>
<p>Shell leftover. Edge 79 is not the default gold.</p>
<p><label>Habit leftover<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="habit leftover"></label></p>
<label style="display:block"><input type="checkbox" data-official-req> Chrome habit is leftover. Zoom Leave is the star.</label>
<label style="display:block"><input type="checkbox" data-official-req> Edge is not 2020 default gold.</label>
<p>
 <button type="button" data-official-trap>Edge as 2020 default (trap)</button>
 <button type="button" data-official-verb>Ack leftover habit</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt20-chrome"><b>Next:</b> <a href="../playable/game.html">Sus Vote</a></p>
""",
        ),
    }

    for slug, href, ok, lx, d2, nxt_lab, nxt, trap in OFFICIAL:
        if slug == "zoom":
            continue
        if slug == "playable":
            write(
                Y / href,
                dest_shell(
                    "Sus Vote — 2020",
                    ok,
                    f"""<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<div data-year-game data-year="2020" data-game-id="among">
<h1>Sus Vote</h1>
<p>Year game leftover. Continue Row is 2019. Join never writes Zoom gold.</p>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p>
 <button type="button" data-game-start>New Game</button>
 <button type="button" data-official-trap>Continue Row as 2020 (trap)</button>
</p>
<canvas id="game-canvas" width="400" height="240" style="border:1px solid #333;background:#102030;display:block;margin:8px 0"></canvas>
<p data-itt-action-status>New Game. Incomplete never writes.</p>
<p hidden data-next-flow data-next-when-key="{ok}"><b>Next:</b> <a href="{nxt}">{nxt_lab}</a></p>
</div>
"""
                    + lo2x(slug, lx, d2, nxt, nxt_lab, trap),
                ),
            )
            continue
        title, body = official_bodies[slug]
        extra = ""
        if slug == "tiktok":
            extra = pop3x(
                "tiktok",
                "TikTok leftover",
                "itt20-pop3-tiktok",
                "tiktok leftover",
                "TikTok as 2020 gold (trap)",
                "../../pages/home.html",
                "Starting Point",
                "pop3-tiktok",
            )
        write(Y / href, dest_shell(title, ok, body + extra + lo2x(slug, lx, d2, nxt, nxt_lab, trap)))

    for slug, title, key, ph, trap, nxt in FIRST:
        nxt_lab = "Wikipedia leftover" if slug == "youtube" else "Facebook leftover" if slug == "wikipedia" else "Starting Point"
        write(
            Y / f"sites/{slug}/index.html",
            dest_shell(
                f"{title} — 2020",
                "",
                f'<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p><h1>{title}</h1>'
                + pop3x(slug, title, key, ph, trap, nxt, nxt_lab)
                + lo2x(slug, f"{slug[:2]}-lx", f"{slug[:2]}-d2", nxt, nxt_lab, trap),
            ),
        )

    for slug, title, key, pop_key, ph, trap, nxt in THIRD:
        if slug == "tiktok":
            continue
        nxt_lab = "Vine leftover" if slug == "teams" else "TikTok leftover"
        write(
            Y / f"sites/{slug}/index.html",
            dest_shell(
                f"{title} — 2020",
                "",
                f'<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p><h1>{title}</h1>'
                + pop3x(slug, title, key, ph, trap, nxt, nxt_lab, pop_key)
                + lo2x(slug, f"{slug[:2]}-lx", f"{slug[:2]}-d2", nxt, nxt_lab, trap),
            ),
        )

    print("wrote years/2020 lean dests")


if __name__ == "__main__":
    main()
