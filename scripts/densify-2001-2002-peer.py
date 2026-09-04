#!/usr/bin/env python3
"""Raise 2001 / 2002 to 2000-class forest density.

Copies year-true continuity rooms from years/2000/sites (rewrite year / css /
js / leftover keys). Does not restore the wiped 2001/2002 forests from git,
does not invent brand pixels, does not move stars, does not pad 2× to 171.
2003 and 2025 stay boarded.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SRC_YEAR = "2000"

# Unique year-true trees — never overwrite.
KEEP = {
    "2001": {
        "wikipedia",
        "apple",
        "itunes",
        "archive",
        "blogdex",
        "encarta",
        "movabletype",
        "mozilla",
    },
    "2002": {
        "stumbleupon",
        "friendster",
        "kazaa",
        "wired",
        "phoenix",
        "googlenews",
        "daypop",
        "technorati",
        "lastfm",
        "mtv",
        "isp",
        "ipod",
        "movabletype",
        "wikipedia",
    },
}

# 2000-only current events / trees owned by KEEP.
SKIP = {
    "apple",  # 2001 ipod / 2002 ipod stay year-true
    "y2k",
    "youvegotmail",
}

# playable: copy only files that do not already exist
MERGE_ONLY = {"playable"}

PRIMARY = {
    "amazon": "1995",
    "yahoo": "1994",
    "geocities": "1995",
    "cnn": "1995",
    "altavista": "1995",
    "hotmail": "1996",
    "excite": "1996",
    "ebay": "1997",
    "icq": "1997",
    "napster": "1999",
    "blogger": "1999",
    "hampsterdance": "1999",
    "zombo": "1999",
    "netscape": "1994",
    "slashdot": "1997",
    "gnutella": "2000",
    "pets": "2000",
    "askjeeves": "1997",
    "dmoz": "1998",
    "infoseek": "1998",
    "hotbot": "1997",
    "mapquest": "2000",
    "paypal": "1999",
    "flash4": "1996",
}

STAR = {
    "2001": ("sites/wikipedia/edit.html", "Wikipedia edit"),
    "2002": ("sites/stumbleupon/index.html", "Stumble"),
}

ILS = {
    "2001": ("29,254,370 websites · 500,609,240 users", "June 2001 ILS"),
    "2002": ("38,760,373 websites · 662,663,600 users", "June 2002 ILS"),
}


def leftover_html(year: str, title: str, blurb: str, key: str, ph: str, nxt: str, nxt_l: str, img: str = "") -> str:
    pfx = year[2:]
    pic = ""
    if img:
        pic = (
            f'<p><img src="{img}" alt="" border="0"></p>\n'
        )
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="crumb"><a href="../../pages/home.html">← Starting Point</a> · <a href="../../pages/about.html">About</a></p>
<p class="itt-pixel-failed" data-itt-capture-cite style="font-size:11px">[failed-final] Period mark · CSS / wordmark only · no invented brand pixels</p>
{pic}<h1>{title}</h1>
<p>{blurb}</p>
<label style="display:block"><input type="checkbox" data-req> Year-true leftover · not the chip</label>
<label style="display:block"><input type="checkbox" data-req> Incomplete never writes</label>
<p><input type="text" id="lx-{key}" maxlength="80" placeholder="{ph}"></p>
<p><button type="button" data-itt-real-save data-storage-key="{key}" data-min-req="2" data-requires="[data-req]" data-require-field="#lx-{key}" data-require-field-min="2">Save leftover</button>
<span data-itt-action-status></span></p>
<p hidden data-next-flow data-next-when-key="itt{pfx}-{key}"><b>Next:</b> <a href="{nxt}">{nxt_l}</a></p>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def rewrite(text: str, year: str, rel: str = "") -> str:
    src = SRC_YEAR
    pfx = year[2:]
    src_pfx = src[2:]
    text = text.replace(f'data-itt-year="{src}"', f'data-itt-year="{year}"')
    text = text.replace(f"data-itt-year='{src}'", f'data-itt-year="{year}"')
    text = text.replace(f"period-{src}.css", f"period-{year}.css")
    text = text.replace(f"immersion-{src}.js", f"immersion-{year}.js")
    text = text.replace(f"itt{src_pfx}-", f"itt{pfx}-")
    text = text.replace(f"/years/{src}/", f"/years/{year}/")
    text = text.replace(f"web{src}", f"web{year}")
    text = text.replace(f"{src} leftover", f"{year} leftover")
    text = text.replace(f"residual {src}", f"residual {year}")

    def asset_sub(m: re.Match) -> str:
        path = m.group(0)
        tail = path.split(f"assets/period/{src}/", 1)[-1]
        if (ROOT / "assets" / "period" / year / tail).is_file():
            return path.replace(f"period/{src}/", f"period/{year}/")
        return path

    text = re.sub(rf"(?:\.\./)*assets/period/{src}/[^\"'\s>]+", asset_sub, text)

    if f'data-itt-year="{year}"' not in text:
        text = re.sub(
            r"<html([^>]*)>",
            rf'<html\1 data-itt-year="{year}">',
            text,
            count=1,
            flags=re.I,
        )

    # 2000 IE 5.5 page must not claim it is still this year's shell.
    if rel.endswith("microsoft/ie55.html"):
        text = text.replace(
            "Default chrome for the 2000 year room is branded <b>IE 5.5</b> on Windows 98 SE / ME-family look —\n <b>not</b> Windows XP / IE 6 (2001 default story).",
            f"IE 5.5 is last year’s leftover. This year’s shell is <b>IE 6 on XP</b> ({year}).",
        )
        text = text.replace(
            "This year’s shell",
            "Last year’s leftover shell",
        )
        text = re.sub(
            r"Internet Explorer 5\.5 — 2000",
            f"Internet Explorer 5.5 leftover — {year}",
            text,
        )
    return text


def continuity_chip(year: str) -> str:
    return (
        f'<p class="itt-continuity-chip" data-itt-continuity-archive="1" data-itt-forest="1" '
        f'style="font-size:11px;background:#ffc;border:1px solid #c90;padding:6px 8px;margin:8px 0;'
        f'font-family:Arial,sans-serif"><b>Continuity archive</b> — this room is held over from an '
        f"earlier year. Year-true {year} products sit on the Starting Point chips and the star.</p>\n"
    )


def stamp_primary(text: str, slug: str, year: str) -> str:
    primary = PRIMARY.get(slug)
    if not primary or int(primary) >= int(year):
        return text
    if "data-itt-primary-year=" in text:
        return text
    m = re.search(r"<body(\s[^>]*)?>", text, re.I)
    if not m:
        return text
    raw = m.group(0)
    if not raw.endswith(">"):
        return text
    new = raw[:-1] + f' data-itt-primary-year="{primary}">'
    return text[: m.start()] + new + text[m.end() :]


def insert_chip(text: str, year: str) -> str:
    if "itt-continuity-chip" in text:
        return text
    chip = continuity_chip(year)
    if '<div id="itt-nav-slot"' in text:
        return text.replace(
            '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>',
            '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n' + chip,
            1,
        )
    m = re.search(r"<body[^>]*>", text, re.I)
    if not m:
        return text
    return text[: m.end()] + "\n" + chip + text[m.end() :]


def copy_file(src: Path, dest: Path, year: str, slug: str, rel: str) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix.lower() in {".html", ".htm", ".css", ".js"}:
        text = src.read_text(encoding="utf-8", errors="replace")
        text = rewrite(text, year, rel)
        if src.suffix.lower() in {".html", ".htm"}:
            text = stamp_primary(text, slug, year)
            if dest.name == "index.html":
                text = insert_chip(text, year)
        dest.write_text(text, encoding="utf-8")
    else:
        shutil.copy2(src, dest)


def copy_continuity(year: str) -> tuple[int, int]:
    src_root = ROOT / "years" / SRC_YEAR / "sites"
    dest_root = ROOT / "years" / year / "sites"
    keep = KEEP[year]
    copied = 0
    skipped = 0
    for src_dir in sorted(p for p in src_root.iterdir() if p.is_dir()):
        slug = src_dir.name
        if slug in SKIP or slug in keep:
            skipped += 1
            continue
        dest_dir = dest_root / slug
        for src_file in src_dir.rglob("*"):
            if not src_file.is_file():
                continue
            rel_in_slug = src_file.relative_to(src_dir)
            dest_file = dest_dir / rel_in_slug
            if slug in MERGE_ONLY and dest_file.exists():
                skipped += 1
                continue
            rel = f"sites/{slug}/{rel_in_slug.as_posix()}"
            copy_file(src_file, dest_file, year, slug, rel)
            copied += 1
    return copied, skipped


def write_if_missing(path: Path, html: str) -> bool:
    if path.exists():
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
    return True


def add_year_true_rooms(year: str) -> int:
    n = 0
    sites = ROOT / "years" / year / "sites"
    if year == "2001":
        # Always-on leftover (Pew still minority; 2002 names the 21% figure).
        n += write_if_missing(
            sites / "broadband" / "index.html",
            leftover_html(
                year,
                "Always-on leftover",
                "Broadband is rising on XP desktops. Always-on is still not mass. Not a live ISP signup. Wikipedia is the chip.",
                "broadband",
                "cable or dsl",
                "../msn/index.html",
                "MSN",
            ),
        )
        n += write_if_missing(
            sites / "wayback" / "index.html",
            leftover_html(
                year,
                "Wayback Machine leftover",
                "Public 24 Oct 2001. Same leftover as the archive room. Broken images honesty. Not the wiki chip.",
                "wayback-q",
                "http://www.yahoo.com/",
                "../blogger/index.html",
                "Blogger",
            ),
        )
        n += write_if_missing(
            sites / "cnet" / "index.html",
            leftover_html(
                year,
                "CNET leftover",
                "Download.com leftover theater. Type a filename. No real bytes. Not the wiki chip.",
                "cnet-dl",
                "winzip.exe",
                "../bbc/index.html",
                "BBC",
            ),
        )
        n += write_if_missing(
            sites / "microsoft" / "ie6.html",
            leftover_html(
                year,
                "Internet Explorer 6 leftover",
                "IE 6 ships with XP (25 Oct 2001 retail). This door’s shell. Not Edge. Not Chrome.",
                "ie6",
                "ie6 leftover",
                "../xp/index.html",
                "Windows XP",
            ),
        )
        xp_img = "../../../../assets/period/2001/xp/start.gif"
        n += write_if_missing(
            sites / "xp" / "index.html",
            leftover_html(
                year,
                "Windows XP leftover",
                "Retail 25 Oct 2001. Start-button leftover. This door’s desktop. Not Vista. Not the wiki chip.",
                "xp",
                "start leftover",
                "../wikipedia/edit.html",
                "Wikipedia",
                img=xp_img,
            ),
        )
    if year == "2002":
        nflix = "../../../../assets/period/2002/netflix/logo.gif"
        n += write_if_missing(
            sites / "netflix" / "index.html",
            leftover_html(
                year,
                "Netflix DVD leftover",
                "Queue leftover. Name a disc. No live stream. Photobucket / Store are later. Stumble is the chip.",
                "nfq",
                "Amelie",
                "../wired/index.html",
                "Wired",
                img=nflix,
            ),
        )
        steam = "../../../../assets/period/2002/steam/logo.gif"
        n += write_if_missing(
            sites / "steam" / "index.html",
            leftover_html(
                year,
                "Steam leftover",
                "2002 leftover storefront. Not a real install. Not the Stumble chip.",
                "steam-ack",
                "half-life leftover",
                "../meetup/index.html",
                "Meetup",
                img=steam,
            ),
        )
        n += write_if_missing(
            sites / "meetup" / "index.html",
            leftover_html(
                year,
                "Meetup leftover",
                "2002 leftover RSVP theater. Name a topic. Not a live event. Stumble is the chip.",
                "meetup",
                "web standards",
                "../fotolog/index.html",
                "Fotolog",
            ),
        )
        n += write_if_missing(
            sites / "fotolog" / "index.html",
            leftover_html(
                year,
                "Fotolog leftover",
                "Caption leftover. No live photo host. Photobucket is 2003. Stumble is the chip.",
                "fotolog",
                "roof",
                "../typepad/index.html",
                "TypePad",
            ),
        )
        n += write_if_missing(
            sites / "typepad" / "index.html",
            leftover_html(
                year,
                "TypePad leftover",
                "Six Apart leftover. TrackBack lives on Movable Type. Not the Stumble chip.",
                "typepad",
                "hello",
                "../askjeeves/index.html",
                "Ask Jeeves",
            ),
        )
        n += write_if_missing(
            sites / "microsoft" / "ie6.html",
            leftover_html(
                year,
                "Internet Explorer 6 leftover",
                "Still this door’s shell in 2002. Phoenix 0.1 is the leftover open-source path. Not Firefox 1.0.",
                "ie6",
                "ie6 leftover",
                "../phoenix/index.html",
                "Phoenix",
            ),
        )
        xp_img = "../../../../assets/period/2002/xp/start.gif"
        if not (ROOT / "assets/period/2002/xp/start.gif").is_file():
            xp_img = "../../../../assets/period/2001/xp/start.gif"
        n += write_if_missing(
            sites / "xp" / "index.html",
            leftover_html(
                year,
                "Windows XP leftover",
                "Continuity desktop leftover. Always-on is still a minority (Pew May 2002: 21%). Not the Stumble chip.",
                "xp",
                "start leftover",
                "../stumbleupon/index.html",
                "Stumble",
                img=xp_img,
            ),
        )
    return n


def rebuild_rooms(year: str) -> int:
    root = ROOT / "years" / year
    rooms = []
    for pth in sorted(root.rglob("*.html")):
        rel = pth.relative_to(root).as_posix()
        if rel == "index.html":
            continue
        rooms.append(rel)
    cfg = ROOT / f"js/config/{year}.js"
    text = cfg.read_text(encoding="utf-8")
    body = ",\n    ".join(f'"{r}"' for r in rooms)
    new = re.sub(
        r"var rooms = \[\n.*?\n  \];",
        "var rooms = [\n    " + body + "\n  ];",
        text,
        count=1,
        flags=re.S,
    )
    if "var rooms = [" not in new:
        raise SystemExit(f"could not rewrite rooms[] in js/config/{year}.js")
    if new != text:
        cfg.write_text(new, encoding="utf-8")
    return len(rooms)


def scan_leftover_rows(year: str) -> list[dict]:
    root = ROOT / "years" / year
    star_key = "itt01-wiki" if year == "2001" else "itt02-stumble"
    rows = []
    have = set()
    key_re = re.compile(r'data-next-when-key="(itt\d{2}-[^"]+)"')
    next_re = re.compile(
        r'data-next-when-key="(itt\d{2}-[^"]+)"[^>]*>.*?<a href="([^"]+)">([^<]+)</a>',
        re.S,
    )
    save_re = re.compile(r'data-storage-key="([^"]+)"')
    go_re = re.compile(r'data-4x-go="([^"]+)"')
    for pth in sorted(root.rglob("*.html")):
        rel = pth.relative_to(root).as_posix()
        text = pth.read_text(encoding="utf-8", errors="replace")
        found = []
        for m in next_re.finditer(text):
            found.append((m.group(1), m.group(2), m.group(3)))
        if not found:
            for m in key_re.finditer(text):
                found.append((m.group(1), STAR[year][0], STAR[year][1]))
            for m in go_re.finditer(text):
                found.append((f"itt{year[2:]}-{m.group(1)}", STAR[year][0], STAR[year][1]))
            for m in save_re.finditer(text):
                found.append((f"itt{year[2:]}-{m.group(1)}", STAR[year][0], STAR[year][1]))
        for key, nxt, lab in found:
            if key == star_key or key in have:
                continue
            if not key.startswith(f"itt{year[2:]}-"):
                continue
            have.add(key)
            if nxt.startswith("../"):
                # resolve relative to this file
                nxt_path = (pth.parent / nxt).resolve()
                try:
                    nxt = nxt_path.relative_to((ROOT / "years" / year).resolve()).as_posix()
                except ValueError:
                    nxt = STAR[year][0]
            elif nxt.startswith("/years/"):
                nxt = nxt.split(f"/years/{year}/", 1)[-1]
            rows.append(
                {
                    "year": year,
                    "path": f"/years/{year}/{rel}",
                    "key": key,
                    "kind": "query",
                    "title": f"{year} leftover · {key}",
                    "next": f"/years/{year}/{nxt}",
                    "nextLabel": lab,
                }
            )
    return rows


def rebuild_2x() -> tuple[int, int]:
    matrix_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(matrix_path.read_text(encoding="utf-8"))
    kept = [r for r in rows if r.get("year") not in {"2001", "2002"}]
    added = 0
    for year in ("2001", "2002"):
        scanned = scan_leftover_rows(year)
        # Prefer 2000 cloned dests that actually exist; fill from scan.
        src_rows = [r for r in rows if r.get("year") == "2000"]
        have = set()
        for r in src_rows:
            path = r["path"].replace("/years/2000/", f"/years/{year}/")
            disk = ROOT / path.lstrip("/")
            if not disk.is_file():
                continue
            key = r["key"].replace("itt00-", f"itt{year[2:]}-")
            nxt = r.get("next", "").replace("/years/2000/", f"/years/{year}/")
            if nxt and not (ROOT / nxt.lstrip("/")).is_file():
                nxt = f"/years/{year}/{STAR[year][0]}"
                lab = STAR[year][1]
            else:
                lab = r.get("nextLabel") or STAR[year][1]
            kept.append(
                {
                    "year": year,
                    "path": path,
                    "key": key,
                    "kind": r.get("kind") or "query",
                    "title": r.get("title", "").replace("2000", year) or f"{year} leftover",
                    "next": nxt or f"/years/{year}/{STAR[year][0]}",
                    "nextLabel": lab,
                }
            )
            have.add(key)
            added += 1
        for r in scanned:
            if r["key"] in have:
                continue
            kept.append(r)
            have.add(r["key"])
            added += 1
    matrix_path.write_text(json.dumps(kept, indent=2) + "\n", encoding="utf-8")
    c1 = sum(1 for r in kept if r["year"] == "2001")
    c2 = sum(1 for r in kept if r["year"] == "2002")
    return c1, c2


def replace_js_string_key(path: Path, year: str, html: str) -> None:
    text = path.read_text(encoding="utf-8")
    key = f'  "{year}": '
    i = text.find(key)
    if i < 0:
        raise SystemExit(f"missing {year} in {path}")
    j = text.find('"', i + len(key))
    if j < 0:
        raise SystemExit(f"no string start for {year} in {path}")
    k = j + 1
    while k < len(text):
        if text[k] == "\\":
            k += 2
            continue
        if text[k] == '"':
            break
        k += 1
    encoded = json.dumps(html, ensure_ascii=False)
    path.write_text(text[:i] + key + encoded + text[k + 1 :], encoding="utf-8")


def forest_start_extra(year: str) -> str:
    sites_root = ROOT / "years" / year / "sites"
    star_href, star_lab = STAR[year]
    star_href = "../" + star_href
    ils, ils_src = ILS[year]
    if year == "2001":
        mass = (
            '<p class="itt-mass-honesty" data-itt-mass="2001" style="font-family:Arial,sans-serif;'
            'font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em">'
            "<b>AOL / Yahoo / MSN</b> still own June visits. Google is about <b>#15</b>. "
            "Gold is Wikipedia edit. Preview is not Save. No iTunes Store.</p>"
        )
        felt = (
            '<p class="itt-felt-trail">After you preview: '
            '<a href="../sites/wikipedia/edit.html">edit Wikipedia</a> — preview is not Save. '
            'Then <a href="../sites/archive/index.html">Wayback</a> · '
            '<a href="../sites/apple/ipod.html">iPod</a> · '
            '<a href="../sites/itunes/index.html">iTunes library</a>.</p>'
        )
        chips = [
            ('../sites/wikipedia/edit.html', 'Wikipedia', 'anyone can edit'),
            ('../sites/archive/index.html', 'Wayback', '24 Oct public'),
            ('../sites/itunes/index.html', 'iTunes', 'library · no Store'),
            ('../sites/apple/ipod.html', 'iPod', '1,000 songs · $399'),
            ('../sites/napster/index.html', 'Napster', 'endgame leftover'),
            ('../sites/movabletype/index.html', 'Movable Type', 'publish leftover'),
        ]
        leftover = [
            ('../sites/broadband/index.html', 'Always-on'),
            ('../sites/microsoft/ie6.html', 'IE6'),
            ('../sites/xp/index.html', 'Windows XP'),
            ('../sites/msn/index.html', 'MSN'),
            ('../sites/ebay/index.html', 'eBay'),
            ('../sites/gnutella/index.html', 'Gnutella'),
            ('../sites/blogger/index.html', 'Blogger'),
            ('../sites/blogdex/index.html', 'Blogdex'),
            ('../sites/mozilla/index.html', 'Mozilla'),
            ('../sites/encarta/index.html', 'Encarta'),
        ]
        pop = [
            ('../sites/google/index.html', 'Google'),
            ('../sites/yahoo/index.html', 'Yahoo'),
            ('../sites/cnn/index.html', 'CNN'),
        ]
        thesis = (
            "Anyone can edit. Preview is not Save. Wayback opens. iTunes is a library. "
            "The iPod holds 1,000 songs. No Store."
        )
        meta = "Windows XP · Internet Explorer 6"
    else:
        mass = (
            '<p class="itt-mass-honesty" data-itt-mass="2002" style="font-family:Arial,sans-serif;'
            'font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em">'
            "<b>Always-on is still a minority</b> (Pew May 2002: 21% / ~24M). "
            "Gold is Stumble. Empty topic never writes. No Store. No MySpace.</p>"
        )
        felt = (
            '<p class="itt-felt-trail">Click <a href="../sites/stumbleupon/index.html">Stumble</a> — '
            "empty topic never writes. Then "
            '<a href="../sites/isp/index.html">always-on</a> · '
            '<a href="../sites/kazaa/index.html">KaZaA</a> · '
            '<a href="../sites/wired/index.html">Wired CSS</a>.</p>'
        )
        chips = [
            ('../sites/stumbleupon/index.html', 'StumbleUpon', 'topic + Stumble'),
            ('../sites/isp/index.html', 'Always-on', 'Pew 21%'),
            ('../sites/kazaa/index.html', 'KaZaA', 'no real files'),
            ('../sites/wired/index.html', 'Wired', 'Oct CSS redesign'),
            ('../sites/friendster/index.html', 'Friendster', 'seed · public 2003'),
            ('../sites/phoenix/index.html', 'Phoenix', '0.1 leftover'),
        ]
        leftover = [
            ('../sites/movabletype/trackback.html', 'TrackBack'),
            ('../sites/ipod/index.html', 'iPod gen 2'),
            ('../sites/googlenews/index.html', 'Google News'),
            ('../sites/daypop/index.html', 'Daypop'),
            ('../sites/technorati/index.html', 'Technorati'),
            ('../sites/netflix/index.html', 'Netflix DVD'),
            ('../sites/steam/index.html', 'Steam'),
            ('../sites/lastfm/index.html', 'last.fm seed'),
            ('../sites/meetup/index.html', 'Meetup'),
            ('../sites/blogger/index.html', 'Blogger'),
        ]
        pop = [
            ('../sites/daypop/index.html', 'Daypop'),
            ('../sites/googlenews/index.html', 'Google News'),
            ('../sites/technorati/index.html', 'Technorati'),
        ]
        thesis = (
            "Stumble is the save. Always-on is still a minority appliance. "
            "KaZaA leftover. No Store. No MySpace."
        )
        meta = "Windows XP · Internet Explorer 6"

    cont = (
        '<p class="itt-continuity-note" data-itt-forest="1" style="font-family:Arial,sans-serif;'
        'font-size:11px;margin:8px 0;padding:6px 8px;background:#ffffcc;border:1px dashed #996;max-width:48em">'
        "Amazon / Yahoo / portal rooms below may be <b>held over</b> from earlier years. "
        f"Year-true {year} products sit on the chips and the star.</p>"
    )

    chip_html = []
    for href, label, sub in chips:
        chip_html.append(
            f'<a href="{href}" class="chip-blue"><b>{label}</b><br><span style="color:#666">{sub}</span></a>'
        )
    lx_html = " · ".join(f'<a href="{h}">{l}</a>' for h, l in leftover)
    pop_html = " · ".join(f'<a href="{h}">{l}</a>' for h, l in pop)

    groups = []
    for slug in sorted(p.name for p in sites_root.iterdir() if p.is_dir()):
        pages = sorted(
            p.relative_to(sites_root / slug).as_posix()
            for p in (sites_root / slug).rglob("*.html")
        )
        if not pages:
            continue
        links = []
        for pg in pages:
            href = f"../sites/{slug}/{pg}"
            lab = slug if pg == "index.html" else f"{slug}/{pg.replace('.html','')}"
            links.append(f'<a href="{href}">{lab}</a>')
        groups.append(
            f"<p style=\"margin:4px 0;font-size:12px\"><b>{slug}</b> — " + " · ".join(links) + "</p>"
        )

    return (
        mass + "\n" + felt + "\n" + cont + "\n"
        '<table class="itt-start" cellpadding="0" cellspacing="0" border="0">\n'
        f'<tr><td class="itt-start-title"><b>Starting Point — {year}</b>'
        f'<span class="itt-start-meta"> · {meta} · {ils} ({ils_src})</span></td></tr>\n'
        f'<tr><td class="itt-start-thesis">\n <b>{thesis}</b>\n</td></tr>\n'
        '<tr><td class="itt-start-body">\n'
        '<div data-itt-tour></div>\n'
        f'<p class="itt-flow-map-link"><a href="map.html"><b>&#9783; {year} UX flow map</b></a> — '
        "tree of trails, sites, and what each one does</p>\n"
        f'<div class="itt-product-chips"><b class="itt-chips-label">Open these first ({year} products)</b>\n'
        + "\n".join(chip_html)
        + "\n</div>\n"
        f'<p class="itt-2x-trails" id="ott-2x-{year}"><b>2× leftover</b> · {lx_html}</p>\n'
        f'<p class="itt-pop3x" data-itt-pop3x><b>Also popular</b> · {pop_html}</p>\n'
        f'<p><a href="{star_href}"><b>★ {star_lab}</b></a></p>\n'
        f'<h2 style="font-size:14px;margin:16px 0 8px">Rooms this year</h2>\n'
        + "\n".join(groups)
        + "\n</td></tr>\n</table>\n"
    )


def rewrite_map(year: str) -> None:
    root = ROOT / "years" / year
    sites = root / "sites"
    star_href, star_lab = STAR[year]
    lis = [f'<li><a href="../{star_href}">★ {star_lab}</a></li>']
    for slug in sorted(p.name for p in sites.iterdir() if p.is_dir()):
        idx = sites / slug / "index.html"
        href = f"../sites/{slug}/index.html" if idx.exists() else None
        if not href:
            first = next(iter(sorted(sites.joinpath(slug).rglob("*.html"))), None)
            if not first:
                continue
            href = "../" + first.relative_to(root).as_posix()
        lis.append(f'<li><a href="{href}">{slug}</a></li>')
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{year} — UX flow map</title>
<link rel="stylesheet" href="../../../css/period-{year}.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>{year} flow map</h1>
<p>Star first. Continuity rooms are held over from earlier years. Incomplete never writes.</p>
<ul>
{chr(10).join(lis)}
</ul>
<p><a href="home.html">← Starting Point</a></p>
<script src="../../../js/immersion-{year}.js"></script>
</body>
</html>
"""
    (root / "pages" / "map.html").write_text(html, encoding="utf-8")


def patch_start_data(year: str) -> None:
    path = ROOT / "ui" / "year" / "start-data.js"
    text = path.read_text(encoding="utf-8")
    if year == "2001":
        block = '''  "2001": {
    "href": "../sites/wikipedia/edit.html",
    "label": "★ One-thing · Wikipedia edit REAL",
    "items": [
      "<a href=\\"about.html\\">About 2001</a> — memory · jukebox · monopoly",
      "<a href=\\"../sites/wikipedia/edit.html\\">Wikipedia</a> — edit · preview is not Save",
      "<a href=\\"../sites/archive/index.html\\">Wayback leftover</a> — Oct 24 public",
      "<a href=\\"../sites/itunes/index.html\\">iTunes library leftover</a> — no Store",
      "<a href=\\"../sites/apple/ipod.html\\">iPod leftover</a> — 1,000 songs · $399",
      "<a href=\\"../sites/broadband/index.html\\">Always-on leftover</a> · <a href=\\"../sites/microsoft/ie6.html\\">IE6</a> · <a href=\\"../sites/xp/index.html\\">XP</a>",
      "<a href=\\"../sites/amazon/index.html\\">Amazon smile</a> · <a href=\\"../sites/yahoo/index.html\\">Yahoo</a> · <a href=\\"../sites/ebay/index.html\\">eBay</a>",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  }'''
    else:
        block = '''  "2002": {
    "href": "../sites/stumbleupon/index.html",
    "label": "★ One-thing · StumbleUpon REAL",
    "items": [
      "<a href=\\"about.html\\">About 2002</a> — always-on minority · Stumble",
      "<a href=\\"../sites/stumbleupon/index.html\\">StumbleUpon</a> — topic + Stumble",
      "<a href=\\"../sites/isp/index.html\\">Always-on leftover</a> — Pew 21%",
      "<a href=\\"../sites/kazaa/index.html\\">KaZaA leftover</a> — no real files",
      "<a href=\\"../sites/wired/index.html\\">Wired CSS leftover</a> — Oct redesign",
      "<a href=\\"../sites/friendster/index.html\\">Friendster seed</a> · <a href=\\"../sites/phoenix/index.html\\">Phoenix 0.1</a>",
      "<a href=\\"../sites/netflix/index.html\\">Netflix DVD</a> · <a href=\\"../sites/steam/index.html\\">Steam</a> · <a href=\\"../sites/amazon/index.html\\">Amazon</a>",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  }'''
    text2 = re.sub(
        rf'  "{year}": \{{.*?\n  \}}',
        block,
        text,
        count=1,
        flags=re.S,
    )
    if text2 != text:
        path.write_text(text2, encoding="utf-8")


def patch_years_dir(year: str) -> None:
    path = ROOT / "ui" / "year" / "years.js"
    text = path.read_text(encoding="utf-8")
    if year == "2001":
        new_dir = """    "dir": [
      {"go": "pages/home.html", "label": "Start"},
      {"go": "sites/wikipedia/index.html", "label": "Wikipedia"},
      {"go": "sites/archive/index.html", "label": "Wayback"},
      {"go": "sites/apple/ipod.html", "label": "iPod"},
      {"go": "sites/itunes/index.html", "label": "iTunes"},
      {"go": "sites/google/index.html", "label": "Google"},
      {"go": "sites/yahoo/index.html", "label": "Yahoo!"},
      {"go": "sites/amazon/index.html", "label": "Amazon"},
      {"go": "sites/ebay/index.html", "label": "eBay"},
      {"go": "sites/msn/index.html", "label": "MSN"},
      {"go": "sites/napster/index.html", "label": "Napster"},
      {"go": "pages/about.html", "label": "About"}
    ],"""
    else:
        new_dir = """    "dir": [
      {"go": "pages/home.html", "label": "Start"},
      {"go": "sites/stumbleupon/index.html", "label": "Stumble"},
      {"go": "sites/kazaa/index.html", "label": "KaZaA"},
      {"go": "sites/wired/index.html", "label": "Wired"},
      {"go": "sites/friendster/index.html", "label": "Friendster"},
      {"go": "sites/google/index.html", "label": "Google"},
      {"go": "sites/yahoo/index.html", "label": "Yahoo!"},
      {"go": "sites/amazon/index.html", "label": "Amazon"},
      {"go": "sites/googlenews/index.html", "label": "Google News"},
      {"go": "sites/phoenix/index.html", "label": "Phoenix"},
      {"go": "sites/isp/index.html", "label": "Always-on"},
      {"go": "pages/about.html", "label": "About"}
    ],"""
    m = re.search(rf'  "{year}": \{{.*?"dir": \[.*?\n    \],', text, re.S)
    if not m:
        raise SystemExit(f"could not find years.js dir {year}")
    old = m.group(0)
    prefix = old[: old.find('"dir":')]
    text2 = text[: m.start()] + prefix + new_dir + text[m.end() :]
    if text2 == text:
        return
    path.write_text(text2, encoding="utf-8")


def patch_popular_3x3() -> None:
    path = ROOT / "scripts" / "popular-3x3-sites.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    data["2001"] = [
        {"id": "google", "name": "Google", "title": "Google leftover", "why": "2001 leftover third trio. Not the chip.", "verb": "Pick search then go.", "ph": "nupedia", "btn": "Open leftover"},
        {"id": "yahoo", "name": "Yahoo", "title": "Yahoo leftover", "why": "2001 leftover third trio. Not the chip.", "verb": "Pick directory then go.", "ph": "News", "btn": "Open leftover"},
        {"id": "cnn", "name": "CNN", "title": "CNN leftover", "why": "2001 leftover third trio. Not the chip.", "verb": "Pick headline then go.", "ph": "Afghanistan", "btn": "Open leftover"},
    ]
    data["2002"] = [
        {"id": "daypop", "name": "Daypop", "title": "Daypop leftover", "why": "2002 leftover third trio. Not the chip.", "verb": "Pick link then go.", "ph": "blog", "btn": "Open leftover"},
        {"id": "googlenews", "name": "Google News", "title": "Google News leftover", "why": "2002 leftover third trio. Not the chip.", "verb": "Pick cluster then go.", "ph": "iraq", "btn": "Open leftover"},
        {"id": "technorati", "name": "Technorati", "title": "Technorati leftover", "why": "2002 leftover third trio. Not the chip.", "verb": "Pick cosmos then go.", "ph": "plasticbag", "btn": "Open leftover"},
    ]
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def patch_atlas() -> None:
    path = ROOT / "js" / "atlas-data.js"
    text = path.read_text(encoding="utf-8")
    text2 = text.replace(
        '    leanYears: [\n      "2001", "2002", "2006",',
        '    leanYears: [\n      "2006",',
    )
    if text2 != text:
        path.write_text(text2, encoding="utf-8")
    e2e = ROOT / "e2e" / "atlas-all-flows.spec.js"
    et = e2e.read_text(encoding="utf-8")
    et2 = et.replace(
        'const LEAN = [\n  "2001", "2002", "2006",',
        'const LEAN = [\n  "2006",',
    )
    if et2 != et:
        e2e.write_text(et2, encoding="utf-8")


def patch_disk_truth() -> None:
    path = ROOT / "docs" / "DISK-TRUTH.md"
    text = path.read_text(encoding="utf-8")
    text = text.replace(
        "| **1994–2000, 2004** | Live dense / forest reconstructions |\n| **2001** | Live lean door · Wikipedia edit `itt01-wiki` |\n| **2002** | Live lean door · StumbleUpon `itt02-stumble` |",
        "| **1994–2002, 2004** | Live dense / forest reconstructions |\n| **2001** | Live forest · Wikipedia edit `itt01-wiki` |\n| **2002** | Live forest · StumbleUpon `itt02-stumble` |",
    )
    path.write_text(text, encoding="utf-8")
    gate = ROOT / "scripts" / "itt_gate.py"
    gt = gate.read_text(encoding="utf-8")
    gt = gt.replace(
        "# 2003 / 2025 wiped. 2001–2002 lean doors live. Lean doors 2006 / 2007 / 2020–2024 stay live.",
        "# 2003 / 2025 wiped. 2001–2002 forest (2000-class continuity). Lean doors 2006 / 2007 / 2020–2024 stay live.",
    )
    gate.write_text(gt, encoding="utf-8")


def main() -> int:
    for year in ("2001", "2002"):
        copied, skipped = copy_continuity(year)
        extra = add_year_true_rooms(year)
        rooms = rebuild_rooms(year)
        replace_js_string_key(ROOT / "ui" / "year" / "start-extra.js", year, forest_start_extra(year))
        patch_start_data(year)
        patch_years_dir(year)
        rewrite_map(year)
        html_n = len(list((ROOT / "years" / year).rglob("*.html")))
        sites_n = len([p for p in (ROOT / "years" / year / "sites").iterdir() if p.is_dir()])
        print(f"{year}: copied={copied} skipped_trees={skipped} extra_rooms={extra} rooms={rooms} html={html_n} sites={sites_n}")
    c1, c2 = rebuild_2x()
    print(f"2× dests: 2001={c1} 2002={c2}")
    patch_popular_3x3()
    patch_atlas()
    patch_disk_truth()
    print("densify 2001/2002 peer cut done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
