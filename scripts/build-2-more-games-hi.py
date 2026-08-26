#!/usr/bin/env python3
"""Emit extra-h / extra-i REAL leftover games for every open year.

Does not move gold, extra-a–g, famous cabinets, or guided ol. Skips 2005–2007.
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


G("1994", "h", "gophermap", "Gopher Map", "parlor",
  "Gopher leftover map. Gopher Dig is extra-c.",
  "menu,item,back", "dead-gopher")
G("1994", "i", "bookrot", "Book Rot", "quiz",
  "Hotlist leftover rot. Hotlist Surfer stays gold.",
  "open,mark,skip", "live-link")

G("1995", "h", "geoguest", "Geo Guest", "parlor",
  "GeoCities leftover guestbook. SSL stays gold.",
  "sign,hello,leave", "moved-site")
G("1995", "i", "altabox", "Alta Box", "quiz",
  "AltaVista leftover box. Hit is extra-b.",
  "type,search,hit", "banner")

G("1996", "h", "jamnote", "Jam Note", "quiz",
  "Space Jam leftover planet. Planet Hop stays gold.",
  "earth,hub,leave", "looney-ip")
G("1996", "i", "mailhold", "Mail Hold", "hold",
  "HoTMaiL leftover send wait. Send is extra-a.",
  "hold", "", "", 1, 2000)

G("1997", "h", "ebaynote", "eBay Note", "parlor",
  "eBay leftover raise. Connect Four stays gold.",
  "watch,raise,leave", "live-bid")
G("1997", "i", "pcskip", "Push Skip", "quiz",
  "PointCast leftover skip. PointCast gold stays.",
  "skip,idle,leave", "always-on")

G("1998", "h", "luckynote", "Lucky Note", "quiz",
  "Lucky leftover jump. Lucky gold stays.",
  "type,lucky,land", "directory")
G("1998", "i", "moznote", "Moz Note", "parlor",
  "mozilla.org leftover milestone.",
  "open,read,ack", "download-bin")

G("1999", "h", "aimidle", "AIM Idle", "parlor",
  "AIM leftover away. Sign-on stays gold.",
  "away,idle,back", "exploit-uin")
G("1999", "i", "napidle", "Nap Idle", "hold",
  "Napster leftover queue wait. No real share.",
  "hold", "", "", 1, 2000)

G("2000", "h", "mqprint", "MQ Print", "parlor",
  "MapQuest leftover print. MapQuest gold stays.",
  "from,to,print", "live-tiles")
G("2000", "i", "crashnote", "Crash Note", "quiz",
  "2000 leftover epitaph. Pets.com is residual.",
  "read,ack,leave", "checkout")

G("2001", "h", "editnote", "Edit Note", "parlor",
  "Wikipedia leftover preview. Edit stays gold.",
  "type,preview,leave", "live-save")
G("2001", "i", "codehold", "Code Hold", "hold",
  "Code Red leftover patch wait.",
  "hold", "", "", 1, 2000)

G("2002", "h", "stumble3", "Stumble 3", "parlor",
  "StumbleUpon leftover next. Stumble gold stays.",
  "stumble,again,idle", "toolbar-spy")
G("2002", "i", "ljnote", "LJ Note", "quiz",
  "LiveJournal leftover post. No live blog.",
  "title,body,preview", "track-spam")

G("2003", "h", "delnote", "Del Note", "parlor",
  "del.icio.us leftover tag. Photobucket stays gold.",
  "tag,save,view", "import-all")
G("2003", "i", "skypenote", "Skype Note", "quiz",
  "Skype leftover call. No live audio.",
  "dial,idle,leave", "live-call")

G("2004", "h", "flick2", "Flick Two", "parlor",
  "Flickr leftover fave. Networks stay gold.",
  "fave,tag,idle", "hotlink")
G("2004", "i", "orcutnote", "Orkut Note", "quiz",
  "Orkut leftover invite. thefacebook stays gold.",
  "invite,ack,leave", "mass-add")

G("2008", "h", "issue2", "Issue Two", "parlor",
  "GitHub leftover issue. Issue gold stays.",
  "title,body,open", "live-push")
G("2008", "i", "dropnote", "Drop Note", "quiz",
  "Dropbox leftover sync. No live folder.",
  "drop,sync,ack", "share-all")

G("2009", "h", "farm2", "Farm Two", "parlor",
  "FarmVille leftover water. Like gold stays.",
  "water,idle,leave", "pay-wilt")
G("2009", "i", "win7note", "Win7 Note", "quiz",
  "Windows 7 leftover residual.",
  "ack,leave,idle", "upgrade-now")

G("2010", "h", "ipadnote", "iPad Note", "quiz",
  "iPad leftover $499. Instagram stays gold.",
  "price,wifi,ack", "3g-gold")
G("2010", "i", "ftwait", "FaceTime Wait", "hold",
  "FaceTime leftover Wi-Fi wait.",
  "hold", "", "", 1, 2000)

G("2011", "h", "hang2", "Hang Two", "parlor",
  "Hangout leftover. Google+ gold stays.",
  "join,mute,leave", "live-cam")
G("2011", "i", "spotnote", "Spot Note", "quiz",
  "Spotify leftover US invite.",
  "invite,wait,ack", "free-forever")

G("2012", "h", "share2", "Share Two", "parlor",
  "IG Android leftover share. Share stays gold.",
  "crop,filter,share", "iphone-only")
G("2012", "i", "iponote", "IPO Note", "quiz",
  "Facebook IPO leftover. IG Android stays gold.",
  "read,ack,leave", "buy-stock")

G("2013", "h", "post2", "Post Two", "parlor",
  "Vine leftover post. 6s gold stays.",
  "hold,caption,post", "fifteen")
G("2013", "i", "flatnote", "Flat Note", "quiz",
  "iOS 7 leftover flatten. Leather is the trap.",
  "flat,swipe,home", "leather")

G("2014", "h", "install2", "Install Two", "parlor",
  "WhatsApp leftover Install. Install gold stays.",
  "code,tick,install", "messenger")
G("2014", "i", "icenote", "Ice Note", "quiz",
  "Ice Bucket leftover nominate. No celebrity stills.",
  "name,pour,pass", "live-video")

G("2015", "h", "live2", "Live Two", "parlor",
  "Periscope leftover LIVE. Go LIVE stays gold.",
  "title,live,stop", "save-forever")
G("2015", "i", "lockernote", "Locker Note", "quiz",
  "Google Photos leftover locker.",
  "upload,ack,leave", "unlimited-lie")

G("2016", "h", "slide2", "Slide Two", "parlor",
  "IG Stories leftover slide. Stories gold stays.",
  "slide,post,idle", "keep-forever")
G("2016", "i", "reactnote", "React Note", "quiz",
  "Reactions leftover. Stories gold stays.",
  "like,wow,leave", "dislike")

G("2017", "h", "look2", "Look Two", "parlor",
  "Face ID leftover look. Face ID gold stays.",
  "look,swipe,home", "passcode-only")
G("2017", "i", "clipnote", "Clip Note", "quiz",
  "Paperclips leftover click. Not the gold.",
  "click,buy,quota", "sell-out")

G("2018", "h", "banner2", "Banner Two", "parlor",
  "GDPR leftover banner. Manage stays gold.",
  "manage,purpose,save", "accept-all")
G("2018", "i", "hearingnote", "Hearing Note", "quiz",
  "2018 leftover hearing. Reels are not this year.",
  "read,ack,leave", "reels")

G("2019", "h", "face2", "Face Two", "parlor",
  "Disney+ leftover face. Continue stays gold.",
  "adult,kids,continue", "free-trial")
G("2019", "i", "arcnote", "Arcade Note", "quiz",
  "Apple Arcade leftover card.",
  "browse,save,leave", "subscribe-all")

G("2020", "h", "leave2", "Leave Two", "parlor",
  "Zoom leftover Leave. Mute-leave stays gold.",
  "mute,chat,leave", "join-only")
G("2020", "i", "gpt3note", "GPT-3 Note", "quiz",
  "GPT-3 leftover waitlist. ChatGPT is 2022.",
  "wait,ack,leave", "open-chat")

G("2021", "h", "dialog2", "Dialog Two", "parlor",
  "ATT leftover dialog. Ask stays gold.",
  "ask,tick,leave", "allow")
G("2021", "i", "metanote2", "Meta Two", "quiz",
  "Meta leftover rename. App still Facebook.",
  "company,app-stays,date", "meta-app")

G("2022", "h", "box2", "Box Two", "parlor",
  "ChatGPT leftover box. Send stays gold.",
  "type,send,idle", "plus")
G("2022", "i", "sdnote", "SD Note", "quiz",
  "Stable Diffusion leftover. No live weights.",
  "prompt,ack,leave", "rip-weights")

G("2023", "h", "twenty2", "Twenty Two", "parlor",
  "Plus leftover $20. Plus stays gold.",
  "pick,tick,sub", "stay-free")
G("2023", "i", "xnote2", "X Two", "quiz",
  "X leftover. Still Twitter in 2022. Plus stays gold.",
  "ack,leave,idle", "steal-gold")

G("2024", "h", "omni2b", "Omni Two B", "parlor",
  "4o leftover omni. Talk stays gold.",
  "pick,tick,talk", "gpt5")
G("2024", "i", "soranote2", "Sora Two", "quiz",
  "Sora leftover preview. Not public mass.",
  "preview,ack,leave", "download")

G("2025", "h", "r1two", "R1 Two", "parlor",
  "R1 leftover Think. Think stays gold.",
  "pick,tick,think", "v3")
G("2025", "i", "opnote", "Op Note", "quiz",
  "Operator leftover. Not the chip.",
  "ack,leave,idle", "treat-gold")

ROLE_FILE = {"h": "extra-h.html", "i": "extra-i.html"}
NEXT_FILE = {"h": "extra-i.html", "i": "game.html"}
NEXT_LABEL = {"h": "Extra I", "i": "Year star"}

STRIP_RE = re.compile(
    r"<!-- ITT-2G2-STRIP:start -->.*?<!-- ITT-2G2-STRIP:end -->\s*",
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
    <a href="extra-g.html">G</a> ·
    <a href="extra-h.html">H</a> ·
    <a href="extra-i.html">I</a>
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
 * {title} — {year} extra (2-more H/I pack)
 * Key: {prefix(year)}-game-{slug}
 */
(function () {{
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="{slug}"]');
  if (!host) return;
  host.setAttribute("data-2g2-engine", "1");
}})();
"""


def strip_for(year: str, rows: list) -> str:
    bits = [f'<a href="extra-{role}.html"><b>{title}</b></a>' for _y, role, slug, title, *_r in rows]
    return (
        "<!-- ITT-2G2-STRIP:start -->\n"
        f'<p data-itt-year-two-more-b="{year}" class="itt-year-two-more-b" style="font-size:13px;margin:10px 0">'
        f"<b>Two more {year} games</b> — "
        + " · ".join(bits)
        + ' <span style="font-size:11px;color:#444">(leftover extras · not the star · incomplete never writes)</span></p>\n'
        "<!-- ITT-2G2-STRIP:end -->\n"
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
    for role in ("h", "i"):
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
        r"\n  /\* ITT-2G2:start \*/.*?/\* ITT-2G2:end \*/\n",
        "\n",
        src,
        flags=re.S,
    )
    block_lines = ["  /* ITT-2G2:start */"]
    for year in sorted(by_year):
        yy = year[2:]
        for _y, role, slug, title, *_r in by_year[year]:
            block_lines.append(
                f"  ;(ITT.yearExtraGames[{year!r}] = ITT.yearExtraGames[{year!r}] || []).push("
                f'{{id:{slug!r},title:{title!r},href:"extra-{role}.html",key:"itt{yy}-game-{slug}"}});'
            )
    block_lines.append("  /* ITT-2G2:end */")
    if "  /* ITT-2G:end */" in src:
        src = src.replace("  /* ITT-2G:end */", "  /* ITT-2G:end */\n" + "\n".join(block_lines), 1)
    elif "  /* ITT-3G:end */" in src:
        src = src.replace("  /* ITT-3G:end */", "  /* ITT-3G:end */\n" + "\n".join(block_lines), 1)
    else:
        src = src.rstrip() + "\n" + "\n".join(block_lines) + "\n"
    cfg.write_text(src, encoding="utf-8")


def patch_nav(year: str) -> None:
    play = ROOT / "years" / year / "sites" / "playable"
    extra = ' ·\n    <a href="extra-h.html">H</a> ·\n    <a href="extra-i.html">I</a>'
    for name in ("extra-c.html", "extra-d.html", "extra-e.html", "extra-f.html", "extra-g.html"):
        p = play / name
        if not p.is_file():
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        if 'href="extra-h.html"' in t:
            continue
        old = '    <a href="extra-g.html">G</a>\n  </p>'
        if old in t:
            t = t.replace(old, '    <a href="extra-g.html">G</a>' + extra + "\n  </p>", 1)
            p.write_text(t, encoding="utf-8")


def main() -> int:
    by_year: dict[str, list] = {}
    for row in GAMES:
        by_year.setdefault(row[0], []).append(row)

    matrix = []
    n_html = 0
    n_js = 0
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
        n_html += 1
        (ROOT / "js" / "games" / f"year-{year}-{slug}.js").write_text(
            engine_js(year, slug, title), encoding="utf-8"
        )
        n_js += 1
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
        patch_nav(year)

    write_extra_config(by_year)
    (ROOT / "e2e" / "year-extra-hi.matrix.json").write_text(
        json.dumps(matrix, indent=2) + "\n", encoding="utf-8"
    )
    print(f"html {n_html} · js {n_js} · matrix {len(matrix)} · years {len(by_year)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
