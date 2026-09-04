#!/usr/bin/env python3
"""Emit extra-c/d/e REAL games for every ship year.

See docs/3-MORE-GAMES-EVERY-YEAR-IMPLEMENTATION-PHASES-MINUTE-2026-08-20.md
Idempotent. Does not touch gold, famous, extra-a/b, game-2–5, guided ol.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2005", "2006", "2007"}

# year, role, slug, title, kind, inspire, goods, traps, prompt, need, hold_ms
GAMES: list[tuple] = []


def G(year, role, slug, title, kind, inspire, goods, traps="", prompt="", need=3, hold_ms=2000):
    if year in WIPED:
        return
    GAMES.append((year, role, slug, title, kind, inspire, goods, traps, prompt, need, hold_ms))


# 1994
G("1994", "c", "gopherdig", "Gopher Dig", "parlor",
  "Gopher menus / JumpStation class. Not a 1996 Flash toy.",
  "CERN,Yahoo@Stanford,NASA", "dead-gopher")
G("1994", "d", "hang144", "14.4 Hang", "hold",
  "14.4k CONNECT hang. Release early never writes.",
  "hold", "", "", 1, 2000)
G("1994", "e", "gbflood", "Guestbook Flood", "draw",
  "CSotD / early guestbook class. Empty never writes.",
  "signed,noted,linked", "", "hello")

# 1995
G("1995", "c", "appletload", "Applet Load", "hold",
  "Java applet 1995 start bar. Force-skip never writes.",
  "hold", "", "", 1, 2000)
G("1995", "d", "geoplot", "Homestead Plot", "place",
  "GeoCities homestead class. Moved-site is the trap.",
  "plot-a,plot-b,plot-c", "moved")
G("1995", "e", "soldeal", "Win95 Sol Deal", "parlor",
  "Win95 Games folder class. Not Microsoft art.",
  "deal,tableau,king", "redeal-cheat")

# 1996
G("1996", "c", "swbadge", "Shockwave Badge", "hold",
  "Shockwave.com 1995–96 class.",
  "hold", "", "", 1, 2000)
G("1996", "d", "fsskip", "FutureSplash Skip", "dodge",
  "FutureSplash Aug 1996 / Flash Dec 1996. Waiting to 100% is the trap.",
  "skip-early,skip-pad,skip-again", "wait-100")
G("1996", "e", "jamquiz", "Jam Planet Quiz", "quiz",
  "Space Jam hub class — text tokens, not Warner art. Planet Hop stays gold.",
  "Earth,Jupiter,Moron Mountain", "Looney-IP")

# 1997
G("1997", "c", "classiclobby", "Classic Lobby", "parlor",
  "ClassicGames.com Jul 1997 parlor class.",
  "sit,follow-suit,trick", "leave-table")
G("1997", "d", "acroround", "Acro Round", "draw",
  "Acrophobia 1997 class. Empty phrase never writes.",
  "witty,vote,next", "", "web")
G("1997", "e", "zonespades", "Zone Spades", "parlor",
  "MSN Gaming Zone Spades class.",
  "deal,follow,trick", "renege")

# 1998
G("1998", "c", "yparlor", "Yahoo Parlor", "parlor",
  "Yahoo Games 31 Mar 1998 (ClassicGames buy) class.",
  "join,move-one,move-two", "ragequit")
G("1998", "d", "jacknet", "Jack Netshow", "quiz",
  "You Don't Know Jack: The Netshow Shockwave class.",
  "skip-splash,beat-a,beat-b", "buzz-wrong")
G("1998", "e", "bannerdodge", "Banner Dodge", "dodge",
  "1998 portal banner flood class.",
  "dodge-1,dodge-2,honest-ad", "popup-click")

# 1999
G("1999", "c", "pogotile", "Pogo Tile", "match3",
  "Pogo.com 1999 casual Java class. Not Pogo art.",
  "match-1,match-2,match-3", "waste")
G("1999", "d", "picohall", "Pico Hall", "quiz",
  "Pico's School 1999 / Newgrounds class. Original rooms, not Pico sprites.",
  "hall,locker,exit", "wrong-door")
G("1999", "e", "neostock", "Neopets Stock", "idle",
  "Neopets 15 Nov 1999 games-room class. No official pixels.",
  "buy,sell,hold", "scam-stock")

# 2000
G("2000", "c", "diamgrid", "Diamond Grid", "match3",
  "Bejeweled / Diamond Mine browser 2000 class. Smaller than 2004 Gem Cascade.",
  "match-1,match-2,match-3", "waste")
G("2000", "d", "hsloop", "Homestar Loop", "quiz",
  "Homestar Runner 1 Jan 2000 class. Original panels, not Homestar art.",
  "panel-1,panel-2,panel-3", "skip-toon")
G("2000", "e", "ngjudge", "Portal Judge", "parlor",
  "Newgrounds Flash Portal judge class.",
  "rate-a,rate-b,rate-c", "under-review")

# 2001
G("2001", "c", "minipitch", "Miniclip Pitch", "runner",
  "Miniclip ~2001 sports-mini class. Not Miniclip art.",
  "kick-1,kick-2,kick-3", "own-goal")
G("2001", "d", "appletslice", "Applet Slice", "parlor",
  "RuneScape Jan 2001 Java grind slice. Clickscape stays gold.",
  "walk,chop,bank", "logout-wild")
G("2001", "e", "redpatch", "Code Red Patch", "quiz",
  "Code Red / Nimda 2001 patch order. Wrong order never writes.",
  "iis,restart,verify", "open-mail")

# 2002
G("2002", "c", "stickwalk", "Stick Walk", "runner",
  "Alien Hominid 2002 class. Original stick, not NG art.",
  "run,shot,clear", "crash")
G("2002", "d", "growsprout", "GROW Sprout", "quiz",
  "GROW (On, 2002) click-order class.",
  "seed,water,sun", "stomp")
G("2002", "e", "fleetnight", "Fleet Night", "idle",
  "OGame 2002 browser strat class. No live server.",
  "queue,send,arrive", "recall-cheat")

# 2003
G("2003", "c", "kolturn", "KoL Turn", "parlor",
  "Kingdom of Loathing 2003 class. Original text.",
  "adventure,combat,meat", "suicide-owl")
G("2003", "d", "pointclick", "Point Click", "quiz",
  "Samorost 2003 point-and-click class. Original drawing.",
  "rock,bug,door", "eat-rock")
G("2003", "e", "gaghand", "Gag Hand", "parlor",
  "Toontown Jun 2003 gag class. Gags Lite stays gold. No Disney art.",
  "pie,seltzer,land", "sad-meter")

# 2004
G("2004", "c", "ntight", "Tight Jump", "runner",
  "N (Metanet) 2004 precision class.",
  "jump-1,jump-2,land", "spike")
G("2004", "d", "addictpick", "Addicting Pick", "parlor",
  "AddictingGames / Atom 2004 list class.",
  "pick,play,rate", "malware-ad")
G("2004", "e", "puckslap", "Puck Slap", "hold",
  "Yetisports 2004 timing class.",
  "hold", "", "", 1, 1800)

# 2005
G("2005", "c", "stickday", "Stick Life Day", "parlor",
  "Stick RPG ~2005 day loop class.",
  "job,sleep,job-again", "bar-fight-trap")
G("2005", "d", "carttime", "Cart Timing", "runner",
  "Club Penguin 24 Oct 2005 cart-surf class. No CP art.",
  "push,lean,land", "derail")
G("2005", "e", "shaftdig", "Shaft Dig", "idle",
  "Motherload / XGen mid-2000s dig class.",
  "dig,fuel,upgrade", "lava")

# 2006
G("2006", "c", "kongbadge2", "Kong Badge", "parlor",
  "Kongregate ~10 Oct 2006 badge class. Museum badge, not Kong art.",
  "play,score,badge", "buy-badge")
G("2006", "d", "fancydash", "Fancy Dash", "runner",
  "Fancy Pants Adventures 2006 stick-platform class.",
  "run,jump,flag", "pit")
G("2006", "e", "flowcell", "Flow Cell", "dodge",
  "flOw 2006 cell-grow class.",
  "eat,grow,split", "wall")

# 2007
G("2007", "c", "dartlane", "Dart Lane", "place",
  "Bloons / Bloons TD 2007 class. No Ninja Kiwi art.",
  "tower-a,tower-b,start-wave", "sell-all")
G("2007", "d", "deskpath", "Desk Path", "place",
  "Desktop Tower Defense, Paul Preece Mar 2007 class.",
  "desk,path,wave", "block-exit")
G("2007", "e", "trickcard", "Trick Card", "quiz",
  "The Impossible Quiz 2007 class. Obvious answer is the trap.",
  "read,think,honest", "obvious")

# 2008
G("2008", "c", "fourkey", "Four Key Dash", "runner",
  "QWOP 12 Nov 2008 class. Not Foddy art.",
  "thigh-l,calf-l,step", "faceplant")
G("2008", "d", "touchroom", "Touch Room", "parlor",
  "Achievement Unlocked 2008 class.",
  "touch-lamp,touch-rug,touch-door", "reset-room")
G("2008", "e", "burnrope", "Burn Rope", "quiz",
  "You Have to Burn the Rope 2008 class.",
  "walk,jump,burn", "fight-boss")

# 2009
G("2009", "c", "roofrun", "Roof Run", "runner",
  "Canabalt 2009 one-button class.",
  "run,jump,roof", "miss-ledge")
G("2009", "d", "orclimb", "Orpheus Climb", "runner",
  "Don't Look Back 2009 class. Wrong door is the trap.",
  "climb,ignore,exit", "look-back")
G("2009", "e", "wiltclock", "Wilt Clock", "hold",
  "FarmVille 19 Jun 2009 wilt literacy. Plot Neighbors stays gold.",
  "hold", "", "", 1, 2000)

# 2010
G("2010", "c", "raghill", "Rag Hill", "physics",
  "Happy Wheels 2010 class / unused YEAR-2010 Rag Trail bible. PG: no gore.",
  "ramp-a,ramp-b,drop", "gore")
G("2010", "d", "fourobj", "Four Objects", "quiz",
  "Escaping the Prison 2010 click-object class.",
  "vent,key,door", "guard")
G("2010", "e", "filterhold", "Filter Hold", "hold",
  "Instagram 2010 filter-share timing. Sling Nest stays gold.",
  "hold", "", "", 1, 2000)

# 2011
G("2011", "c", "rushlane", "Rush Lane", "place",
  "Kingdom Rush 2011 class. No Ironhide art.",
  "tower-a,tower-b,wave", "sell-hero")
G("2011", "d", "griphold", "Grip Hold", "hold",
  "GIRP 2011 letter-hold class.",
  "hold", "", "", 1, 2000)
G("2011", "e", "spentweek", "Spent Week", "quiz",
  "Spent 2011 money-choice class. Payday loan is the trap.",
  "rent,bus,food", "payday-loan")

# 2012
G("2012", "c", "frogslice", "Frog Slice", "quiz",
  "Frog Fractions 2012 fake-edutainment class.",
  "math,wait,real", "just-fractions")
G("2012", "d", "repubpress", "Republia Press", "quiz",
  "The Republia Times (Pope, 2012) headline class.",
  "loyal,quiet,print", "leak")
G("2012", "e", "strokeguess", "Stroke Guess", "draw",
  "Draw Something 6 Feb 2012 class. Guess Doodle stays the draw gold.",
  "cat,house,star", "", "cat")

# 2013
G("2013", "c", "loopspare", "Loop Spare", "parlor",
  "Vine-class leftover loop — not the 6s gold. No Vine art.",
  "loop-a,loop-b,post", "fifteen")
G("2013", "d", "storyhold", "Story Hold", "hold",
  "Snapchat Stories 2013 24h leftover. Vine gold stays.",
  "hold", "", "", 1, 2000)
G("2013", "e", "flattap", "Flat Tap", "quiz",
  "iOS 7 flatten leftover. Skeuomorph is the trap.",
  "flat,swipe,home", "leather")

# 2014
G("2014", "c", "slackchan", "Slack Chan", "parlor",
  "Slack Feb 2014 leftover channel. Tile Fold stays gold.",
  "join,type,pin", "email-all")
G("2014", "d", "icepour", "Ice Pour", "draw",
  "Ice Bucket Jul 2014 leftover nominate. No celebrity stills.",
  "name,pour,pass", "", "friend")
G("2014", "e", "rotatels", "Rotate TLS", "quiz",
  "Heartbleed Apr 2014 rotate leftover. Exploit is the trap.",
  "revoke,reissue,rotate", "dump-mem")

# 2015
G("2015", "c", "splitdrill", "Split Drill", "dodge",
  "agar.io 28 Apr 2015 split drill. Blob Rush stays the arena gold.",
  "eat,grow,split", "eat-larger")
G("2015", "d", "hearthold", "Heart Hold", "hold",
  "Periscope 2015 heart-hold class.",
  "hold", "", "", 1, 2000)
G("2015", "e", "traywhack", "Tray Whack", "dodge",
  "Get Windows 10 GWX tray class. Decline is the honest win.",
  "whack,whack-2,decline", "reserve")

# 2016
G("2016", "c", "coilsnake", "Coil Snake", "runner",
  "slither.io 2016 class. Not official art.",
  "boost,turn,grow", "bite-self")
G("2016", "d", "tankslice", "Tank Slice", "parlor",
  "Diep.io 2016 one-upgrade class.",
  "move,upgrade,shot", "afk")
G("2016", "e", "slideexpire", "Slide Expire", "hold",
  "Instagram Stories 2016 24h expire theater. Gym Rush stays gold.",
  "hold", "", "", 1, 2000)

# 2017
G("2017", "c", "clipdesk", "Clip Desk", "idle",
  "Universal Paperclips 2017 class.",
  "click,buy,quota", "sell-out")
G("2017", "d", "hintguess", "Hint Guess", "draw",
  "skribbl.io 2017 stroke-guess class.",
  "stroke-1,stroke-2,guess", "", "tree")
G("2017", "e", "pondtier", "Pond Tier", "idle",
  "Mope.io 2017 one-tier evolve class.",
  "eat,hide,evolve", "be-eaten")

# 2018
G("2018", "c", "range15", "Range 15", "runner",
  "Krunker.io 2018 aim-trainer class. Museum boxes.",
  "ads,flick,hit", "spray")
G("2018", "d", "driftcorner", "Drift Corner", "hold",
  "Drift Hunters 2018 class. Hold one corner.",
  "hold", "", "", 1, 2000)
G("2018", "e", "bannerfight", "Banner Fight", "quiz",
  "GDPR 25 May 2018 banner. Accept All is the trap. Consent Dash stays gold.",
  "manage,purpose-a,purpose-b", "accept-all")

# 2019
G("2019", "c", "rowextra", "Row Extra", "parlor",
  "Disney+ Continue leftover row. Continue Row stays gold. No Disney art.",
  "profile,row,continue", "free-trial")
G("2019", "d", "stadiawait", "Stadia Wait", "hold",
  "Stadia 2019 leftover stream wait. No live stream.",
  "hold", "", "", 1, 2000)
G("2019", "e", "arcadecard", "Arcade Card", "quiz",
  "Apple Arcade 2019 leftover card. Paywall is the trap.",
  "browse,save,play-one", "subscribe-all")

# 2020
G("2020", "c", "muteround", "Mute Round", "parlor",
  "Zoom leftover mute-all. Sus Vote / Zoom gold stay.",
  "mute,chat,leave", "join-only")
G("2020", "d", "reel15", "Reel 15", "hold",
  "Reels 5 Aug 2020 15s leftover. 24s is the trap.",
  "hold", "", "", 1, 2000)
G("2020", "e", "flashbrick", "Flash Brick", "quiz",
  "Flash EOL 31 Dec 2020 leftover. Play SWF is the trap.",
  "notice,uninstall,newgrounds", "play-swf")

# 2021
G("2021", "c", "sighandle", "Sig Handle", "parlor",
  "Signal leftover handle. ATT gold stays. Empty never writes.",
  "type,join,note", "mass-delete")
G("2021", "d", "waitcop", "Wait Copilot", "quiz",
  "Copilot 2021 waitlist leftover. Chat box is the trap (ChatGPT is 2022).",
  "email,wait,preview", "open-chat")
G("2021", "e", "metanote", "Meta Note", "quiz",
  "Meta rename leftover. Consumer app is the trap.",
  "company,app-stays,date", "meta-app")

# 2022
G("2022", "c", "wordguess", "Word Guess", "quiz",
  "Wordle leftover Times-free. Prompt Box stays gold. No NYT tiles.",
  "guess,check,next", "paywall")
G("2022", "d", "mastoinst", "Masto Inst", "parlor",
  "Mastodon leftover instance. X is the trap.",
  "pick,join,toot", "open-x")
G("2022", "e", "bereal2", "BeReal Two", "hold",
  "BeReal leftover two-minute window. Filter pack is the trap.",
  "hold", "", "", 1, 2000)

ROLE_FILE = {"c": "extra-c.html", "d": "extra-d.html", "e": "extra-e.html"}
NEXT_FILE = {"c": "extra-d.html", "d": "extra-e.html", "e": "game.html"}
NEXT_LABEL = {"c": "Extra D", "d": "Extra E", "e": "Year star"}

STRIP_RE = re.compile(
    r"<!-- ITT-3G-STRIP:start -->.*?<!-- ITT-3G-STRIP:end -->\s*",
    re.S,
)
BODY_RE = re.compile(r"</body\s*>", re.I)


def prefix(year: str) -> str:
    return "itt" + year[2:]


def period_css(year: str) -> str:
    return "mosaic-defaults.css" if year == "1994" else f"period-{year}.css"


def html_page(year, role, slug, title, kind, inspire, goods, traps, prompt, need, hold_ms) -> str:
    key = f"{prefix(year)}-game-{slug}"
    nxt = NEXT_FILE[role]
    nxt_lab = NEXT_LABEL[role]
    if role == "e":
        nxt_lab = "Year star"
    css = period_css(year)
    goods_attr = goods
    traps_attr = traps or "trap"
    prompt_attr = f' data-more-prompt="{prompt}"' if prompt else ""
    hold_attr = f' data-more-hold-ms="{hold_ms}"' if kind == "hold" else ""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body class="yg-body yg-year-{year}" bgcolor="#f0f0f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-more-role="{role}" data-more-kind="{kind}" data-year="{year}" data-game-id="{slug}" data-more-need="{need}" data-more-goods="{goods_attr}" data-more-traps="{traps_attr}"{prompt_attr}{hold_attr} data-yg-next-href="{nxt}" data-yg-next-label="{nxt_lab}">
  <h1>{title} — {year}</h1>
  <p class="honesty yg-honesty"><b>Inspired by {inspire}</b> · museum original · not official art · incomplete never writes · key <code>{key}</code></p>
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
    <a href="game.html">Year star</a> ·
    <a href="extra-c.html">C</a> ·
    <a href="extra-d.html">D</a> ·
    <a href="extra-e.html">E</a>
  </p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/games/year-{year}-{slug}.js"></script>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def engine_js(year, slug, title) -> str:
    return f"""/**
 * {title} — {year} extra (3-more pack)
 * Key: {prefix(year)}-game-{slug}
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {{
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="{slug}"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
}})();
"""


def strip_for(year: str, rows: list) -> str:
    bits = []
    for _y, role, slug, title, *_rest in rows:
        bits.append(f'<a href="extra-{role}.html"><b>{title}</b></a>')
    return (
        "<!-- ITT-3G-STRIP:start -->\n"
        f'<p data-itt-year-more="{year}" class="itt-year-more" style="font-size:13px;margin:10px 0">'
        f"<b>Three more {year} games</b> — "
        + " · ".join(bits)
        + ' <span style="font-size:11px;color:#444">(not the star · incomplete never writes)</span></p>\n'
        "<!-- ITT-3G-STRIP:end -->\n"
    )


def upsert_strip(index: Path, year: str, rows: list) -> None:
    if not index.is_file():
        return
    text = index.read_text(encoding="utf-8", errors="replace")
    block = strip_for(year, rows)
    if STRIP_RE.search(text):
        text = STRIP_RE.sub(block, text, count=1)
    else:
        m = BODY_RE.search(text)
        if m:
            text = text[: m.start()] + block + text[m.start() :]
        else:
            text = text.rstrip() + "\n" + block
    index.write_text(text, encoding="utf-8")


def ensure_rooms(year: str) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.is_file():
        return
    src = cfg.read_text(encoding="utf-8")
    changed = False
    for role in ("c", "d", "e"):
        rel = f"sites/playable/{ROLE_FILE[role]}"
        if rel in src:
            continue
        if "var rooms = [" in src:
            src = src.replace("var rooms = [", f'var rooms = [\n    "{rel}",', 1)
            changed = True
        elif "urlMap:" in src or "urlMap =" in src:
            um = re.search(r"urlMap:\s*\{", src)
            if um:
                src = (
                    src[: um.end()]
                    + f'\n      "{rel}": "http://museum.local/years/{year}/{rel}",'
                    + src[um.end() :]
                )
                changed = True
    if changed:
        cfg.write_text(src, encoding="utf-8")


def write_extra_config(by_year: dict) -> None:
    cfg = ROOT / "js" / "config" / "year-extra-games.js"
    src = cfg.read_text(encoding="utf-8")
    # Remove previously injected 3G block
    src = re.sub(
        r"\n  /\* ITT-3G:start \*/.*?/\* ITT-3G:end \*/\n",
        "\n",
        src,
        flags=re.S,
    )
    # Ensure 2012 key exists
    if '"2012"' not in src:
        src = src.replace(
            '  "2015": [',
            '  "2012": [\n  ],\n  "2015": [',
            1,
        )
    block_lines = ["  /* ITT-3G:start */"]
    for year in sorted(by_year):
        yy = year[2:]
        for _y, role, slug, title, *_r in by_year[year]:
            block_lines.append(
                f'  ;(ITT.yearExtraGames[{year!r}] = ITT.yearExtraGames[{year!r}] || []).push('
                f'{{id:{slug!r},title:{title!r},href:"extra-{role}.html",key:"itt{yy}-game-{slug}"}});'
            )
    block_lines.append("  /* ITT-3G:end */")
    # After the object literal, still inside the IIFE.
    src = src.replace(
        "\n};\n})(typeof window",
        "\n};\n" + "\n".join(block_lines) + "\n})(typeof window",
        1,
    )
    cfg.write_text(src, encoding="utf-8")


def main() -> int:
    by_year: dict[str, list] = {}
    for row in GAMES:
        by_year.setdefault(row[0], []).append(row)

    matrix = []
    wrote_html = 0
    wrote_js = 0
    for year, role, slug, title, kind, inspire, goods, traps, prompt, need, hold_ms in GAMES:
        if year in WIPED:
            continue
        dest_dir = ROOT / "years" / year / "sites" / "playable"
        if not dest_dir.is_dir():
            continue
        html = html_page(year, role, slug, title, kind, inspire, goods, traps, prompt, need, hold_ms)
        (dest_dir / ROLE_FILE[role]).write_text(html, encoding="utf-8")
        wrote_html += 1
        js = ROOT / "js" / "games" / f"year-{year}-{slug}.js"
        js.write_text(engine_js(year, slug, title), encoding="utf-8")
        wrote_js += 1
        nxt = f"/years/{year}/sites/playable/{NEXT_FILE[role]}"
        matrix.append(
            {
                "year": year,
                "role": role,
                "path": f"/years/{year}/sites/playable/{ROLE_FILE[role]}",
                "key": f"{prefix(year)}-game-{slug}",
                "id": slug,
                "kind": kind,
                "title": title,
                "next": nxt,
            }
        )

    for year, rows in by_year.items():
        upsert_strip(ROOT / "years" / year / "sites" / "playable" / "index.html", year, rows)
        ensure_rooms(year)

    write_extra_config(by_year)

    out = ROOT / "e2e" / "year-extra-cde.matrix.json"
    out.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")
    print(f"html {wrote_html} · js {wrote_js} · matrix {len(matrix)} · years {len(by_year)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
