#!/usr/bin/env python3
"""Upgrade 2020 dests: year-true verbs + leftover-official + fix 3× hrefs."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2020" / "sites"

ALSO = """<!-- ITT-3X-ALSO:start -->
<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2020" style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em"><b>Also this year · 3×</b><p style="margin:6px 0 0">
 <a href="../../pages/home.html">Starting Point</a> ·
 <a href="../../pages/map.html">Year map</a> ·
 <a href="../zoom/meeting.html">Zoom meeting</a> ·
 <a href="../reels/index.html">Reels 15s</a> ·
 <a href="../openai/index.html">GPT-3 waitlist</a> ·
 <a href="../flash/index.html">Flash EOL</a> ·
 <a href="../tiktok/index.html">TikTok EO</a> ·
 <a href="../meet/index.html">Meet leftover</a> ·
 <a href="../hbomax/index.html">HBO Max</a> ·
 <a href="../quibi/index.html">Quibi</a> ·
 <a href="../playable/game.html">Sus Vote</a>
</p></nav>
<!-- ITT-3X-ALSO:end -->
"""

# path, key suffix, h1 extra, ticks, field ph, go lab, trap lab, trap msg, nxt href, nxt lab, pick, official
VERBS = [
    (
        "reels/index.html",
        "reels",
        "Post a 15-second reel",
        [
            "5 Aug 2020 · 15-second multi-clip · 50+ countries including the US",
            "Not Stories (2016). Not IGTV (2018). Not the Zoom star.",
        ],
        "15 second reel",
        "Post reel leftover",
        "This is Stories / IGTV gold (trap)",
        "Stories are 2016. IGTV is 2018. That click never writes.",
        "../openai/index.html",
        "GPT-3 waitlist",
        "post",
        True,
    ),
    (
        "openai/index.html",
        "gpt3",
        "Join the GPT-3 waitlist",
        [
            "11 Jun 2020 · API private beta · text in, text out",
            "Waitlist, not a chat product. ChatGPT is 30 Nov 2022.",
        ],
        "waitlist not chat",
        "Join waitlist",
        "Open ChatGPT (trap)",
        "ChatGPT is 30 Nov 2022. That click never writes.",
        "../flash/index.html",
        "Flash EOL",
        "wait",
        True,
    ),
    (
        "flash/index.html",
        "flash",
        "Uninstall Flash Player",
        [
            "31 Dec 2020 support ends (announced Jul 2017)",
            "Content bricks 12 Jan 2021. Play SWF never writes.",
        ],
        "uninstall 31 dec",
        "Uninstall leftover",
        "Play SWF (trap)",
        "Play SWF never writes. Uninstall is the leftover.",
        "../tiktok/index.html",
        "TikTok EO",
        "uninstall",
        True,
    ),
    (
        "tiktok/index.html",
        "tiktok-eo",
        "The app still works",
        [
            "6 Aug 2020 EO 13942 · FR 11 Aug · 45-day transaction ban",
            "Courts enjoined. The app did not vanish.",
        ],
        "app still works",
        "Ack leftover",
        "The app vanished (trap)",
        "The app did not vanish. Courts enjoined. That click never writes.",
        "../markets/wti.html",
        "WTI",
        "works",
        True,
    ),
    (
        "markets/wti.html",
        "wti",
        "May WTI settled −$37.63",
        [
            "20 Apr 2020 · first negative WTI print in 37 years",
            "CFTC interim report. Not a $60 oil year.",
        ],
        "-37.63 20 apr",
        "Save leftover print",
        "Oil is $60 (trap)",
        "May WTI settled −$37.63. That click never writes.",
        "../edge/index.html",
        "Edge 79",
        "print",
        True,
    ),
    (
        "edge/index.html",
        "edge",
        "Edge 79 stable — 15 Jan",
        [
            "15 Jan 2020 Chromium Edge 79 stable · consumer staged",
            "Enterprise/education not auto-upgraded. Chrome is already habit.",
        ],
        "edge 79 15 jan",
        "Ack leftover",
        "Enterprise auto-upgraded (trap)",
        "Enterprise was not auto-upgraded. That click never writes.",
        "../ccpa/index.html",
        "CCPA",
        "stable",
        True,
    ),
    (
        "ccpa/index.html",
        "ccpa",
        "Do Not Sell my personal information",
        [
            "In force 1 Jan 2020 · AG enforcement 1 Jul · regs 14 Aug",
            "Do Not Sell is the leftover. Accept All never writes.",
        ],
        "do not sell",
        "Do Not Sell leftover",
        "Accept All (trap)",
        "Accept All never writes. Do Not Sell is the leftover.",
        "../chrome/index.html",
        "Chrome habit",
        "dns",
        True,
    ),
    (
        "chrome/index.html",
        "chrome",
        "Chrome is already the habit",
        [
            "Win10 + Chrome is already mass in 2020",
            "Chrome launched 2 Sep 2008. Edge 79 is a new skin.",
        ],
        "already mass",
        "Ack habit leftover",
        "Chrome launched in 2020 (trap)",
        "Chrome is 2008. Habit, not a 2020 launch. That click never writes.",
        "../playable/game.html",
        "Sus Vote",
        "habit",
        True,
    ),
    (
        "meet/index.html",
        "meet",
        "Meet leftover — free for everyone",
        [
            "29 Apr 2020 free for everyone · rollout over following weeks",
            "60 min not enforced until after 30 Sep. Meet did not replace Zoom.",
        ],
        "free for everyone",
        "Join leftover",
        "Meet replaced Zoom (trap)",
        "Meet is leftover. Zoom is the star. That click never writes.",
        "../mixer/index.html",
        "Mixer",
        "free",
        False,
    ),
    (
        "quibi/index.html",
        "quibi",
        "Quibi leftover — 6 minutes then gone",
        [
            "Launch 6 Apr 2020 · shut 21 Oct · ~$1.75B",
            "5–10 minute quick bites. Empty episode never writes.",
        ],
        "6 min gone",
        "Play leftover bite",
        "Quibi won streaming (trap)",
        "Quibi shut 21 Oct. That click never writes.",
        "../peacock/index.html",
        "Peacock",
        "bite",
        False,
    ),
    (
        "acnh/index.html",
        "acnh",
        "Turnip leftover — 20 Mar",
        [
            "20 Mar 2020 worldwide. First-month NPD smash.",
            "No Nook / villager art. Not the Zoom star.",
        ],
        "20 mar turnip",
        "Sell leftover turnips",
        "Official Nook (trap)",
        "No official Nintendo art. That click never writes.",
        "../astro/index.html",
        "Astronomical",
        "turnip",
        False,
    ),
    (
        "amongus/index.html",
        "among-lit",
        "Among Us leftover literacy",
        [
            "Launch 15 Jun 2018 · Steam 16 Nov 2018 · peak 447,476 on 26 Sep 2020",
            "3.8M concurrent is mobile+PC, not “3 million Steam.”",
        ],
        "447476 steam peak",
        "Ack leftover surge",
        "Launched in 2020 (trap)",
        "Among Us launched 15 Jun 2018. That click never writes.",
        "../tiktok/fyp.html",
        "FYP",
        "surge",
        False,
    ),
    (
        "hbomax/index.html",
        "hbomax",
        "HBO Max leftover — $14.99",
        [
            "27 May 2020 · $14.99 · 10,000 hours",
            "Friends / Big Bang as the pull. No official key art.",
        ],
        "$14.99 27 may",
        "Continue leftover",
        "Friends is free forever (trap)",
        "$14.99 is the leftover. That click never writes.",
        "../acnh/index.html",
        "ACNH",
        "continue",
        False,
    ),
    (
        "mixer/index.html",
        "mixer",
        "Mixer leftover — 22 Jul tomb",
        [
            "22 Jul 2020 Mixer sunset",
            "Facebook Gaming is not Mixer. Not 2021 live.",
        ],
        "22 jul sunset",
        "Ack tomb leftover",
        "Mixer is live 2021 (trap)",
        "Mixer sunset is 22 Jul 2020. That click never writes.",
        "../hbomax/index.html",
        "HBO Max",
        "tomb",
        False,
    ),
]


def verb_html(suffix, title, ticks, ph, go, trap, tmsg, nxt, nl, pick):
    t0, t1 = ticks
    return f"""<div class="v20-stage" data-v20-stage data-v20-key="{suffix}">
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<h2>{title}</h2>
<label style="display:block"><input type="checkbox" data-v20-req> {t0}</label>
<label style="display:block"><input type="checkbox" data-v20-req> {t1}</label>
<p><label>Year-true leftover<br><input type="text" data-v20-field maxlength="80" autocomplete="off" placeholder="{ph}"></label></p>
<p>
 <button type="button" data-v20-go data-v20-key="{suffix}"> {go}</button>
 <button type="button" data-v20-trap data-v20-trap-msg="{tmsg}">{trap}</button>
</p>
<p data-v20-status>Tick both honesties. Empty / trap never writes.</p>
<p hidden data-next-flow data-next-when-key="itt20-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
<div data-lo-panel="1" data-itt-year="2020" style="margin:12px 0;padding:12px;border:1px solid #333;max-width:46em;font-family:Arial,sans-serif;font-size:13px;background:#fffef5">
<h2 style="margin:0 0 8px;font-size:16px">{title} · leftover-official</h2>
<p><button type="button" data-lo-pick="{pick}">{pick}</button> <button type="button" data-lo-pick="skip">skip (trap)</button></p>
<p><label><input type="checkbox" data-lo-req> 2020 leftover · not the Zoom chip.</label></p>
<p><label><input type="checkbox" data-lo-req> Incomplete never writes.</label></p>
<p><button type="button" data-lo-trap>{trap}</button>
<button type="button" data-lo-save data-lo-key="{suffix}" data-lo-need-pick="{pick}">Save leftover</button></p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt20-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def patch_file(rel, official, verb_block, old_go, new_go):
    path = Y / rel
    t = path.read_text(encoding="utf-8")
    t = t.replace('href="../pages/', 'href="../../pages/')
    # insert year-true + lo-panel before first 4x
    if "data-v20-stage" not in t:
        t = t.replace("<!-- ITT-4X:", verb_block + "<!-- ITT-4X:", 1)
    if official:
        # leftover 4x pack must not steal the official whenKey
        t = re.sub(rf'data-4x-go="{re.escape(old_go)}"', f'data-4x-go="{new_go}"', t)
        t = re.sub(
            rf'data-next-when-key="itt20-{re.escape(old_go)}"',
            f'data-next-when-key="itt20-{new_go}"',
            t,
        )
    # replace broken 3x block
    t = re.sub(
        r"<!-- ITT-3X-ALSO:start -->.*?<!-- ITT-3X-ALSO:end -->\s*",
        ALSO,
        t,
        count=1,
        flags=re.S,
    )
    path.write_text(t, encoding="utf-8")


def fix_also_all():
    for p in Y.rglob("*.html"):
        t = p.read_text(encoding="utf-8")
        n = t.replace('href="../pages/', 'href="../../pages/')
        n = re.sub(
            r"<!-- ITT-3X-ALSO:start -->.*?<!-- ITT-3X-ALSO:end -->\s*",
            ALSO,
            n,
            count=1,
            flags=re.S,
        )
        if n != t:
            p.write_text(n, encoding="utf-8")


def main():
    lo_rows = []
    for row in VERBS:
        rel, suffix, title, ticks, ph, go, trap, tmsg, nxt, nl, pick, official = row
        lx = suffix + "-lx"
        block = verb_html(suffix, title, ticks, ph, go, trap, tmsg, nxt, nl, pick)
        patch_file(rel, official, block, suffix, lx)
        lo_rows.append(
            {
                "year": "2020",
                "href": "sites/" + rel,
                "key": "itt20-" + suffix,
                "suffix": suffix,
                "needPick": pick,
                "minPick": 0,
                "field": False,
                "placeholder": "",
            }
        )

    fix_also_all()

    mx = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(mx.read_text(encoding="utf-8"))
    if isinstance(data, dict) and "dests" in data:
        dests = data["dests"]
        dests = [d for d in dests if d.get("year") != "2020"]
        dests.extend(lo_rows)
        data["dests"] = dests
        mx.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    elif isinstance(data, list):
        data = [d for d in data if d.get("year") != "2020"]
        data.extend(lo_rows)
        mx.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print("upgraded", len(VERBS), "dests · lo-rows", len(lo_rows))


if __name__ == "__main__":
    main()
