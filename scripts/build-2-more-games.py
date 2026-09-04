#!/usr/bin/env python3
"""Emit extra-f / extra-g REAL leftover games for every open year.

Same kit as extra-c/d/e (year-more-kit.js). Does not move gold, extra-a/b, extra-c/d/e,
famous cabinets, or guided ol. Skips wiped 2005–2007.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2005", "2006", "2007"}

GAMES: list[tuple] = []


def G(year, role, slug, title, kind, inspire, goods, traps="", prompt="", need=3, hold_ms=2000):
    GAMES.append((year, role, slug, title, kind, inspire, goods, traps, prompt, need, hold_ms))


# Two leftover extras per open year. Not the star. No official art.
G("1994", "f", "fingerwho", "Finger Who", "parlor",
  "finger / whois class. Not a 1996 Flash toy.",
  "lookup,reply,idle", "exploit")
G("1994", "g", "lynxline", "Lynx Line", "quiz",
  "Lynx text browser hop. Inline GIF is extra-a.",
  "link,back,home", "download-bin")

G("1995", "f", "nscapplet", "NSCA Plug", "hold",
  "Netscape helper-app wait. Force-skip never writes.",
  "hold", "", "", 1, 2000)
G("1995", "g", "auctiontap", "Auction Tap", "parlor",
  "AuctionWeb leftover tap. SSL checkout stays gold.",
  "watch,bid-note,leave", "buy-now")

G("1996", "f", "shockwait", "Shock Wait", "hold",
  "Shockwave badge leftover wait.",
  "hold", "", "", 1, 2000)
G("1996", "g", "excitebox", "Excite Box", "quiz",
  "Excite leftover query. Planet Hop stays gold.",
  "type,search,hit", "banner")

G("1997", "f", "slashmod", "Slash Mod", "parlor",
  "Slashdot leftover moderate. Connect Four stays gold.",
  "read,mod,meta", "troll")
G("1997", "g", "uinwait", "UIN Wait", "hold",
  "ICQ leftover UIN wait. Ping is extra-b.",
  "hold", "", "", 1, 2000)

G("1998", "f", "skipintro", "Skip Intro", "hold",
  "1998 skip-intro leftover. Lucky stays gold.",
  "hold", "", "", 1, 2000)
G("1998", "g", "dmozrow", "DMOZ Row", "quiz",
  "DMOZ leftover catalog row. Not Google gold.",
  "open,read,back", "paid-submit")

G("1999", "f", "y2ktick", "Y2K Tick", "hold",
  "Y2K leftover clock. AIM gold stays.",
  "hold", "", "", 1, 2000)
G("1999", "g", "napquery", "Nap Query", "parlor",
  "Napster leftover search. No real share.",
  "type,find,idle", "share-warez")

G("2000", "f", "petsock2", "Sock Wave", "quiz",
  "Pets.com leftover puppet. MapQuest stays gold.",
  "wave,note,leave", "checkout")
G("2000", "g", "flashpad2", "Flash Pad", "hold",
  "2000 Flash leftover pad. No SWF.",
  "hold", "", "", 1, 2000)

G("2001", "f", "ipodspin", "iPod Spin", "parlor",
  "iPod leftover wheel. Wiki edit stays gold.",
  "scroll,click,menu", "rip")
G("2001", "g", "wikiprev2", "Wiki Hold", "hold",
  "Wikipedia leftover preview wait.",
  "hold", "", "", 1, 2000)

G("2002", "f", "friendseed", "Friend Seed", "parlor",
  "Friendster leftover seed. Stumble stays gold.",
  "invite,accept,wall", "mass-add")
G("2002", "g", "kaznote", "KaZaA Note", "quiz",
  "KaZaA leftover find. No real share.",
  "search,idle,leave", "install-spyware")

G("2003", "f", "top8note", "Top 8 Note", "parlor",
  "MySpace leftover Top 8. Photobucket stays gold.",
  "swap,save,view", "auto-add")
G("2003", "g", "ninetynine", "99¢ Note", "quiz",
  "iTunes leftover 99¢ tap. Theater only.",
  "browse,tap,ack", "live-buy")

G("2004", "f", "thepoke2", "Poke Burst", "parlor",
  "thefacebook leftover poke. Networks stay gold.",
  "poke,nudge,idle", "off-campus")
G("2004", "g", "gmailinv", "Gmail Invite", "quiz",
  "Gmail leftover invite. Not the facebook gold.",
  "invite,wait,open", "forward-spam")

G("2008", "f", "storewait", "Store Wait", "hold",
  "App Store leftover wait. GitHub issue stays gold.",
  "hold", "", "", 1, 2000)
G("2008", "g", "omni2", "Omni Two", "parlor",
  "Chrome leftover omnibox. Not official pixels.",
  "type,go,back", "google-dest")

G("2009", "f", "like2", "Like Two", "parlor",
  "Like leftover burst. Like gold stays on the feed dest.",
  "like,like-2,idle", "react")
G("2009", "g", "bingnote", "Bing Note", "quiz",
  "Bing leftover box. Not the Like gold.",
  "type,search,hit", "cashback")

G("2010", "f", "filter2", "Filter Two", "hold",
  "Instagram leftover filter hold. Filter-share stays gold.",
  "hold", "", "", 1, 2000)
G("2010", "g", "ognote", "OG Note", "quiz",
  "Open Graph leftover Like. Instagram stays gold.",
  "like,share,idle", "timeline")

G("2011", "f", "sirinote", "Siri Note", "quiz",
  "Siri leftover wait. Google+ stays gold.",
  "ask,wait,ack", "live-mic")
G("2011", "g", "circle2", "Circle Two", "parlor",
  "Google+ leftover circle. Hangout stays gold.",
  "add,share,idle", "public-all")

G("2012", "f", "instahead", "Insta Head", "parlor",
  "Instagram Android leftover head. Share stays gold.",
  "crop,filter,share", "iphone-only")
G("2012", "g", "sopanote", "SOPA Note", "quiz",
  "SOPA leftover blackout. Wikipedia dark is leftover.",
  "read,ack,leave", "petition-live")

G("2013", "f", "vineloop2", "Vine Loop 2", "parlor",
  "Vine leftover loop. 6s post stays gold. No Vine art.",
  "loop,caption,post", "fifteen")
G("2013", "g", "snap24", "Snap 24", "hold",
  "Snapchat leftover 24h. Vine gold stays.",
  "hold", "", "", 1, 2000)

G("2014", "f", "wa2step", "WA Two-Step", "parlor",
  "WhatsApp leftover verify. Install stays gold.",
  "code,tick,open", "sms-exploit")
G("2014", "g", "bleednote", "Bleed Note", "quiz",
  "Heartbleed leftover rotate. Exploit is the trap.",
  "revoke,reissue,rotate", "dump-mem")

G("2015", "f", "liveheart", "Live Heart", "hold",
  "Periscope leftover heart-hold. Go LIVE stays gold.",
  "hold", "", "", 1, 2000)
G("2015", "g", "gwxnote", "GWX Note", "quiz",
  "Get Windows 10 leftover tray. Decline is the save.",
  "whack,decline,idle", "reserve")

G("2016", "f", "story24b", "Story 24b", "hold",
  "IG Stories leftover 24h. Stories gold stays.",
  "hold", "", "", 1, 2000)
G("2016", "g", "pokehunt", "Poke Hunt", "parlor",
  "Pokémon GO leftover hunt. No Niantic art.",
  "map,catch,idle", "live-gps")

G("2017", "f", "facehold", "Face Hold", "hold",
  "Face ID leftover look. iPhone X gold stays.",
  "hold", "", "", 1, 2000)
G("2017", "g", "tweet280", "Tweet 280", "parlor",
  "280 leftover type. Face ID stays gold.",
  "type,post,idle", "thread-unroll")

G("2018", "f", "manage2", "Manage Two", "parlor",
  "GDPR leftover Manage. Accept All is the trap. Manage stays gold.",
  "manage,purpose,save", "accept-all")
G("2018", "g", "fypnote", "FYP Note", "quiz",
  "TikTok leftover For You. GDPR gold stays.",
  "open,scroll,leave", "live-fyp")

G("2019", "f", "continue2", "Continue Two", "parlor",
  "Disney+ leftover Continue. Trial is the trap. Continue stays gold.",
  "face,row,continue", "free-trial")
G("2019", "g", "stadnote", "Stadia Note", "quiz",
  "Stadia leftover wait. No live stream.",
  "wait,ack,leave", "play-now")

G("2020", "f", "mute2", "Mute Two", "parlor",
  "Zoom leftover mute. Join is the trap. Mute-leave stays gold.",
  "mute,chat,leave", "join-only")
G("2020", "g", "flashnote", "Flash Note", "quiz",
  "Flash EOL leftover. Play SWF is the trap.",
  "notice,uninstall,leave", "play-swf")

G("2021", "f", "ask2", "Ask Two", "parlor",
  "ATT leftover Ask. Allow is the trap. Ask stays gold.",
  "ask,tick,leave", "allow")
G("2021", "g", "copnote", "Copilot Note", "quiz",
  "Copilot leftover waitlist. Chat box is the trap.",
  "email,wait,preview", "open-chat")

G("2022", "f", "send2", "Send Two", "parlor",
  "ChatGPT leftover Send. Empty never writes. Send stays gold.",
  "type,send,idle", "plus")
G("2022", "g", "plusnote", "Plus Note", "quiz",
  "Plus leftover $20. Plus is 2023. Send stays gold.",
  "ack,leave,idle", "subscribe")

G("2023", "f", "subnote", "Sub Note", "parlor",
  "Plus leftover Subscribe. Stay free never writes. Plus stays gold.",
  "pick,tick,sub", "stay-free")
G("2023", "g", "bardnote", "Bard Note", "quiz",
  "Bard leftover. Gemini is 2024.",
  "ask,ack,leave", "gemini")

G("2024", "f", "talk2", "Talk Two", "parlor",
  "4o leftover Talk. Empty never writes. Talk stays gold.",
  "pick,tick,talk", "gpt5")
G("2024", "g", "gemnote", "Gem Note", "quiz",
  "Gemini leftover. Bard is the old name.",
  "ask,ack,leave", "bard")

G("2025", "f", "think2", "Think Two", "parlor",
  "R1 leftover Think. Empty / V3 never write. Think stays gold.",
  "pick,tick,think", "v3")
G("2025", "g", "v3trap", "V3 Note", "quiz",
  "V3 leftover. R1 is the chip. GPT-5 January is the trap.",
  "ack,leave,idle", "gpt5-jan")

ROLE_FILE = {"f": "extra-f.html", "g": "extra-g.html"}
NEXT_FILE = {"f": "extra-g.html", "g": "game.html"}
NEXT_LABEL = {"f": "Extra G", "g": "Year star"}

STRIP_RE = re.compile(
    r"<!-- ITT-2G-STRIP:start -->.*?<!-- ITT-2G-STRIP:end -->\s*",
    re.S,
)
BODY_RE = re.compile(r"</body\s*>", re.I)


def prefix(year: str) -> str:
    return "itt" + year[2:]


def period_css(year: str) -> str:
    if year == "1994":
        return "mosaic-defaults.css"
    p = ROOT / "css" / f"period-{year}.css"
    if p.is_file():
        return f"period-{year}.css"
    return "period-2022.css"


def html_page(year, role, slug, title, kind, inspire, goods, traps, prompt, need, hold_ms) -> str:
    key = f"{prefix(year)}-game-{slug}"
    nxt = NEXT_FILE[role]
    nxt_lab = NEXT_LABEL[role]
    css = period_css(year)
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
<div class="itt-year-game yg-shell" data-year-game data-more-game data-more-role="{role}" data-more-kind="{kind}" data-year="{year}" data-game-id="{slug}" data-more-need="{need}" data-more-goods="{goods}" data-more-traps="{traps_attr}"{prompt_attr}{hold_attr} data-yg-next-href="{nxt}" data-yg-next-label="{nxt_lab}">
  <h1>{title} — {year}</h1>
  <p class="honesty yg-honesty"><b>Inspired by {inspire}</b> · leftover extra · museum original · not official art · incomplete never writes · key <code>{key}</code></p>
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
    <a href="extra-e.html">E</a> ·
    <a href="extra-f.html">F</a> ·
    <a href="extra-g.html">G</a>
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
 * {title} — {year} extra (2-more pack)
 * Key: {prefix(year)}-game-{slug}
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {{
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="{slug}"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
}})();
"""


def strip_for(year: str, rows: list) -> str:
    bits = []
    for _y, role, slug, title, *_rest in rows:
        bits.append(f'<a href="extra-{role}.html"><b>{title}</b></a>')
    return (
        "<!-- ITT-2G-STRIP:start -->\n"
        f'<p data-itt-year-two-more="{year}" class="itt-year-two-more" style="font-size:13px;margin:10px 0">'
        f"<b>Two more {year} games</b> — "
        + " · ".join(bits)
        + ' <span style="font-size:11px;color:#444">(leftover extras · not the star · incomplete never writes)</span></p>\n'
        "<!-- ITT-2G-STRIP:end -->\n"
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
    for role in ("f", "g"):
        rel = f"sites/playable/{ROLE_FILE[role]}"
        if rel in src:
            continue
        if "var rooms = [" in src:
            src = src.replace("var rooms = [", f'var rooms = [\n    "{rel}",', 1)
            changed = True
    if changed:
        cfg.write_text(src, encoding="utf-8")


def write_extra_config(by_year: dict) -> None:
    cfg = ROOT / "js" / "config" / "year-extra-games.js"
    src = cfg.read_text(encoding="utf-8")
    src = re.sub(
        r"\n  /\* ITT-2G:start \*/.*?/\* ITT-2G:end \*/\n",
        "\n",
        src,
        flags=re.S,
    )
    # Pull stray 2025 3G pushes back inside the IIFE.
    stray = re.search(
        r"\}\)\(typeof window !== \"undefined\" \? window : this\);\n+"
        r"((?:  ;\(ITT\.yearExtraGames\['2025'\].*\n)+)",
        src,
    )
    extra_2025 = stray.group(1) if stray else ""
    if stray:
        src = src[: stray.start()] + "})(typeof window !== \"undefined\" ? window : this);\n"
    block_lines = ["  /* ITT-2G:start */"]
    for year in sorted(by_year):
        yy = year[2:]
        for _y, role, slug, title, *_r in by_year[year]:
            block_lines.append(
                f"  ;(ITT.yearExtraGames[{year!r}] = ITT.yearExtraGames[{year!r}] || []).push("
                f'{{id:{slug!r},title:{title!r},href:"extra-{role}.html",key:"itt{yy}-game-{slug}"}});'
            )
    block_lines.append("  /* ITT-2G:end */")
    if extra_2025 and "yearExtraGames['2025']" not in src.split("ITT-3G:end")[0][-800:]:
        src = src.replace("  /* ITT-3G:end */", extra_2025 + "  /* ITT-3G:end */", 1)
    if "\n};\n})(typeof window" in src:
        src = src.replace(
            "\n};\n})(typeof window",
            "\n};\n" + "\n".join(block_lines) + "\n})(typeof window",
            1,
        )
    elif "  /* ITT-3G:end */" in src:
        src = src.replace("  /* ITT-3G:end */", "  /* ITT-3G:end */\n" + "\n".join(block_lines), 1)
    else:
        src = src.rstrip() + "\n" + "\n".join(block_lines) + "\n"
    cfg.write_text(src, encoding="utf-8")


def patch_cde_nav(year: str) -> None:
    play = ROOT / "years" / year / "sites" / "playable"
    extra = ' ·\n    <a href="extra-f.html">F</a> ·\n    <a href="extra-g.html">G</a>'
    for name in ("extra-c.html", "extra-d.html", "extra-e.html"):
        p = play / name
        if not p.is_file():
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        if 'href="extra-f.html"' in t:
            continue
        t = t.replace(
            '    <a href="extra-e.html">E</a>\n  </p>',
            '    <a href="extra-e.html">E</a>' + extra + "\n  </p>",
            1,
        )
        p.write_text(t, encoding="utf-8")


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
            print("skip no playable", year)
            continue
        (dest_dir / ROLE_FILE[role]).write_text(
            html_page(year, role, slug, title, kind, inspire, goods, traps, prompt, need, hold_ms),
            encoding="utf-8",
        )
        wrote_html += 1
        js = ROOT / "js" / "games" / f"year-{year}-{slug}.js"
        js.write_text(engine_js(year, slug, title), encoding="utf-8")
        wrote_js += 1
        matrix.append(
            {
                "year": year,
                "role": role,
                "path": f"/years/{year}/sites/playable/{ROLE_FILE[role]}",
                "key": f"{prefix(year)}-game-{slug}",
                "id": slug,
                "kind": kind,
                "title": title,
                "next": f"/years/{year}/sites/playable/{NEXT_FILE[role]}",
            }
        )

    for year, rows in by_year.items():
        if year in WIPED:
            continue
        upsert_strip(ROOT / "years" / year / "sites" / "playable" / "index.html", year, rows)
        ensure_rooms(year)
        patch_cde_nav(year)

    write_extra_config(by_year)
    out = ROOT / "e2e" / "year-extra-fg.matrix.json"
    out.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")
    print(f"html {wrote_html} · js {wrote_js} · matrix {len(matrix)} · years {len(by_year)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
