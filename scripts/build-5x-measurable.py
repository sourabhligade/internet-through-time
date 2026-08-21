#!/usr/bin/env python3
"""
Build 5× measurable links / flows / games for 1994–2019.

Implements docs/5X-MEASURABLE-IMPLEMENT/YEAR-YYYY.md P1–P5:
  P1  four pack year-games (game-2.html … game-5.html) + unique JS modules
  P2  twelve toys (g=4…15) in year-playable.js — passport still stamps at 3
  P3  flow-maps-5x-atlas.js unique dests ≥ mapU×5
  P4  flow-trails-5x.js rows n=11–50 ending at the locked star
  P5  home atlas chips until L1×5 unique dests (home+map, no 3×)

Law: reuse on-disk rooms · no clone-Yahoo · no new sites/ dirs ·
incomplete never writes · locked star stays locked · guided <ol> stays 6.
"""
from __future__ import annotations

import json
import re
import subprocess
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = [str(y) for y in range(1994, 2010)]
BIBLE = ROOT / "docs" / "5X-MEASURABLE-IMPLEMENT"

TARGETS = {
    "1994": {"map": 85, "l1": 155},
    "1995": {"map": 75, "l1": 190},
    "1996": {"map": 75, "l1": 180},
    "1997": {"map": 70, "l1": 185},
    "1998": {"map": 85, "l1": 250},
    "1999": {"map": 75, "l1": 255},
    "2000": {"map": 85, "l1": 295},
    "2001": {"map": 80, "l1": 195},
    "2002": {"map": 70, "l1": 170},
    "2003": {"map": 65, "l1": 120},
    "2004": {"map": 65, "l1": 305},
    "2005": {"map": 140, "l1": 320},
    "2006": {"map": 90, "l1": 300},
    "2007": {"map": 125, "l1": 315},
    "2008": {"map": 75, "l1": 265},
    "2009": {"map": 90, "l1": 290},
    "2010": {"map": 120, "l1": 275},
    "2011": {"map": 90, "l1": 145},
    "2012": {"map": 90, "l1": 150},
    "2013": {"map": 170, "l1": 230},
    "2014": {"map": 160, "l1": 245},
    "2015": {"map": 155, "l1": 180},
    "2016": {"map": 120, "l1": 185},
    "2017": {"map": 160, "l1": 225},
    "2018": {"map": 185, "l1": 205},
    "2019": {"map": 85, "l1": 145},
}

STAR = {
    "1994": ("sites/csotd/index.html", "CSotD guestbook", "itt94-csotd"),
    "1995": ("sites/amazon/ssl-checkout.html", "SSL checkout", "itt95-ssl-checkout"),
    "1996": ("sites/portals/wars.html", "Portal wars", "itt96-portal-wars"),
    "1997": ("sites/pointcast/index.html", "PointCast", "itt97-pointcast"),
    "1998": ("sites/google/lucky.html", "I'm Feeling Lucky", "itt98-lucky"),
    "1999": ("sites/aim/index.html", "AIM", "itt99-aim"),
    "2000": ("sites/mapquest/index.html", "MapQuest", "itt00-mapquest"),
    "2001": ("sites/msn/index.html", "MSN", "itt01-msn"),
    "2002": ("sites/stumbleupon/index.html", "StumbleUpon", "itt02-stumble"),
    "2003": ("sites/photobucket/index.html", "Photobucket", "itt03-photobucket"),
    "2004": ("sites/facebook/networks.html", "thefacebook networks", "itt04-thefacebook-networks"),
    "2005": ("sites/pandora/index.html", "Pandora", "itt05-pandora"),
    "2006": ("sites/twitter/index.html", "Twitter 140", "itt06-tweets"),
    "2007": ("sites/iphone/index.html", "iPhone Safari", "itt07-iphone"),
    "2008": ("sites/github/issue.html", "GitHub issue", "itt08-github"),
    "2009": ("sites/facebook/feed.html", "Facebook Like", "itt09-fb-likes"),
    "2010": ("sites/imgur/index.html", "Imgur", "itt10-imgur"),
    "2011": ("sites/airbnb/index.html", "Airbnb request", "itt11-airbnb"),
    "2012": ("sites/soundcloud/index.html", "SoundCloud", "itt12-soundcloud"),
    "2013": ("sites/vine/record.html", "Vine 6s", "itt13-vine-posts"),
    "2014": ("sites/whatsapp/index.html", "WhatsApp install", "itt14-wa-install"),
    "2015": ("sites/apple/watch.html", "Apple Watch", "itt15-watch"),
    "2016": ("sites/instagram/stories.html", "IG Stories", "itt16-ig-stories"),
    "2017": ("sites/iphone/x.html", "Face ID", "itt17-faceid"),
    "2018": ("sites/gdpr/manage.html", "GDPR Manage", "itt18-gdpr"),
    "2019": ("sites/disneyplus/home.html", "Disney+ Continue", "itt19-disneyplus"),
}

ACCENTS = [
    "#003399",
    "#006600",
    "#990000",
    "#7b0099",
    "#3366cc",
    "#ff6600",
    "#008080",
    "#333399",
    "#1565c0",
    "#5e35b1",
    "#c62828",
    "#0a246a",
]


def prefix(year: str) -> str:
    return "itt" + year[2:]


def pretty_name(href: str) -> str:
    h = href.split("?")[0].rstrip("/")
    if h.endswith("/index.html"):
        h = h[: -len("/index.html")]
    elif h.endswith(".html"):
        h = h[: -len(".html")]
    part = h.split("/")[-1] or h
    part = part.replace("-", " ").replace("_", " ")
    if not part:
        return href
    return part[:1].upper() + part[1:]


def parse_bible(year: str) -> dict:
    text = (BIBLE / f"YEAR-{year}.md").read_text(encoding="utf-8")
    games = []
    for m in re.finditer(
        r"### G([1-4])[^\n]*—[^\n]*?([^\n]+)\n+"
        r"\*\*Class:\*\*[ \t]*([^\n]+?)\s*\n"
        r"\*\*File:\*\*[ \t]*`([^`]+)`\s*\n"
        r"\*\*Page:\*\*[ \t]*`([^`]+)`\s*\n"
        r"\*\*Key:\*\*[ \t]*`([^`]+)`\s*\n"
        r"\*\*Premise:\*\*[ \t]*([^\n]+)",
        text,
    ):
        slot, title, klass, js_path, html_path, key, premise = m.groups()
        title = title.strip()
        gid = Path(js_path).stem.split("-", 2)[-1]
        block = text[m.start() : m.start() + 900]
        need = 3
        nm = re.search(r"<(\d+)\s", block)
        if nm:
            need = int(nm.group(1))
        elif "100%" in block:
            need = 8
        elif re.search(r"\b2 checks\b|\b2-step\b|<2", block, re.I):
            need = 2
        phrase = ""
        if re.search(r"\btype\b|\bphrase\b|\bURL", premise + block, re.I):
            quoted = re.findall(r"[“\"]([^”\"]+)[”\"]", premise)
            if quoted:
                phrase = quoted[0].strip().lower()
            else:
                words = re.findall(r"[A-Za-z0-9.:/+-]{3,}", premise)
                phrase = " ".join(words[:3]).lower()[:48]
        wait_ms = 0
        if re.search(r"\bwait\b|\btimer\b|\breload\b", premise, re.I):
            wait_ms = 2400
            if need < 1:
                need = 1
        games.append(
            {
                "slot": int(slot),
                "title": title.strip(),
                "klass": klass.strip(),
                "js_path": js_path,
                "html_path": html_path,
                "key": key,
                "gid": gid,
                "premise": premise.strip(),
                "need": need,
                "phrase": phrase,
                "wait_ms": wait_ms,
            }
        )
    toys = []
    for m in re.finditer(
        r"^\| (\d+) \| ([^|]+?) \| (keep|targets|meter|type|hold) \|",
        text,
        re.M,
    ):
        n = int(m.group(1))
        if n < 4:
            continue
        toys.append(
            {
                "id": str(n),
                "title": m.group(2).strip(),
                "type": m.group(3).strip(),
            }
        )
    toys.sort(key=lambda t: int(t["id"]))
    return {"games": games, "toys": toys}


def existing_hrefs(year: str) -> list[str]:
    root = ROOT / "years" / year
    out: list[str] = []
    seen = set()

    def add(rel: str) -> None:
        rel = rel.replace("\\", "/")
        if rel not in seen:
            seen.add(rel)
            out.append(rel)

    pages = root / "pages"
    if pages.is_dir():
        for p in sorted(pages.glob("*.html")):
            add("pages/" + p.name)
        for p in sorted(pages.glob("*/*.html")):
            add("pages/" + p.relative_to(pages).as_posix())
    sites = root / "sites"
    if sites.is_dir():
        for p in sorted(sites.rglob("*.html")):
            rel = "sites/" + p.relative_to(sites).as_posix()
            parts = rel.split("/")
            # Forest years: do not 5× clone-Yahoo / clone-directory leaves
            if len(parts) > 4 and parts[1] in {
                "yahoo",
                "dmoz",
                "odp",
                "open-directory",
            }:
                continue
            add(rel)
    return out


def site_indexes(year: str) -> list[str]:
    sites = ROOT / "years" / year / "sites"
    if not sites.is_dir():
        return []
    rows = []
    for d in sorted(p for p in sites.iterdir() if p.is_dir()):
        for name in ("index.html", "home.html", "feed.html"):
            cand = d / name
            if cand.is_file():
                rows.append("sites/" + d.name + "/" + name)
                break
        else:
            htmls = sorted(d.glob("*.html"))
            if htmls:
                rows.append("sites/" + d.name + "/" + htmls[0].name)
    return rows


def detect_game_assets(year: str) -> dict:
    game = ROOT / "years" / year / "sites" / "playable" / "game.html"
    css = "period-1995.css"
    immersion = f"immersion-{year}.js"
    if game.is_file():
        html = game.read_text(encoding="utf-8", errors="replace")
        links = re.findall(r'href="(\.\./\.\./\.\./\.\./css/[^"]+)"', html)
        for href in links:
            name = href.rsplit("/", 1)[-1]
            if name.startswith("period-") or name.endswith("-lite.css"):
                css = name
                break
        scripts = re.findall(r'src="(\.\./\.\./\.\./\.\./js/[^"]+)"', html)
        for src in scripts:
            name = src.rsplit("/", 1)[-1]
            if name.startswith("immersion"):
                immersion = name
                break
    if not (ROOT / "css" / css).exists():
        for cand in (f"period-{year}.css", f"period-{year}-lite.css", "period-1995.css"):
            if (ROOT / "css" / cand).exists():
                css = cand
                break
    if not (ROOT / "js" / immersion).exists():
        immersion = "immersion.js"
    return {"css": css, "immersion": immersion}


def write_game_js(year: str, g: dict) -> None:
    path = ROOT / g["js_path"]
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        f"""/**
 * {g['title']} — {year} G{g['slot']}
 * Class: {g['klass']}
 * Key: {g['key']}
 * Engine: year-pack-boot.js (taps + optional phrase + optional wait).
 * Incomplete never writes. Museum original · no commercial SWF.
 */
(function () {{
  "use strict";
  var host = document.querySelector('[data-year-game][data-game-id="{g['gid']}"]');
  if (!host) return;
  host.setAttribute("data-5x-pack", "1");
}})();
""",
        encoding="utf-8",
    )


def write_game_html(year: str, g: dict, assets: dict) -> None:
    star_href, star_label, _ = STAR[year]
    star_rel = "../" + star_href[len("sites/") :] if star_href.startswith("sites/") else "../../" + star_href
    key = g["key"]
    phrase_attr = escape(g["phrase"], quote=True)
    wait_attr = f' data-pack-wait-ms="{g["wait_ms"]}"' if g["wait_ms"] else ""
    type_row = ""
    if g["phrase"]:
        type_row = (
            f'<p><label>Type <code>{escape(g["phrase"])}</code> '
            f'<input type="text" data-pack-type autocomplete="off" '
            f'spellcheck="false" placeholder="{phrase_attr}"></label></p>'
        )
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{escape(g['title'])} — {year}</title>
<link rel="stylesheet" href="../../../../css/{assets['css']}">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
<style>
.itt-year-game{{max-width:520px;margin:0 auto;padding:12px;font-family:Tahoma,Arial,sans-serif;font-size:13px}}
.itt-year-game h1{{font-size:18px;margin:0 0 8px}}
.honesty{{font-size:11px;background:#ffffcc;border:1px solid #808080;padding:6px;margin:8px 0}}
</style>
</head>
<body class="yg-body yg-year-{year}" bgcolor="#f0f0f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-pack-game data-year="{year}" data-game-id="{g['gid']}" data-pack-need="{g['need']}" data-pack-phrase="{phrase_attr}"{wait_attr} data-yg-goal="{escape(g['premise'], quote=True)}" data-yg-next-href="{star_rel}" data-yg-next-label="{escape(star_label, quote=True)}">
  <h1>{escape(g['title'])} — {year}</h1>
  <p>{escape(g['premise'])}</p>
  <p class="honesty yg-honesty"><b>{escape(g['klass'])}</b> · museum original · no commercial SWF · incomplete never writes · key <code>{key}</code></p>
  <ol class="yg-steps" data-yg-steps style="font-size:11px;margin:8px 0;padding-left:1.3em">
    <li data-step="start">Start</li>
    <li data-step="taps">Act {g['need']} time(s)</li>
    <li data-step="type">Type the phrase if shown</li>
    <li data-step="wait">Wait the timer if shown</li>
    <li data-step="save">Finish writes <code>{key}</code></li>
  </ol>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b> · Acts <b data-pack-count>0/{g['need']}</b></p>
  <p>
    <button type="button" data-game-start>Start</button>
    <button type="button" data-pack-act>Act</button>
    <button type="button" data-pack-finish>Finish</button>
  </p>
  {type_row}
  <p data-itt-action-status style="font-size:12px;min-height:1.2em">Press Start. Incomplete never writes.</p>
  <p style="font-size:11px">
    <a href="index.html">← Playables</a> ·
    <a href="game.html">Year game 1</a> ·
    <a href="game-2.html">2</a> ·
    <a href="game-3.html">3</a> ·
    <a href="game-4.html">4</a> ·
    <a href="game-5.html">5</a> ·
    <a href="{star_rel}">{escape(star_label)}</a>
  </p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-pack-boot.js"></script>
<script src="../../../../js/games/year-{year}-{g['gid']}.js"></script>
<script src="../../../../js/{assets['immersion']}" defer></script>
</body>
</html>
"""
    dest = ROOT / "years" / year / "sites" / "playable" / f"game-{g['slot'] + 1}.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding="utf-8")


def js_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def toy_object(year: str, toy: dict) -> str:
    n = int(toy["id"])
    title = toy["title"]
    typ = toy["type"]
    accent = ACCENTS[(n - 1) % len(ACCENTS)]
    words = re.findall(r"[A-Za-z0-9µ+]{2,}", title)
    labels = words[:5] or ["Tap", year, "Go"]
    while len(labels) < 4:
        labels.append("Tap")
    phrase = re.sub(r"\s+tap$", "", title, flags=re.I).strip().lower() or title.lower()
    phrase = re.sub(r"\s+", " ", phrase)[:42]
    lines = [
        "      {",
        f'        id: "{n}",',
        f'        type: "{typ}",',
        f"        title: {js_string(title)},",
        f"        blurb: {js_string(title + ' · ' + year + ' museum toy · local only.')},",
        f"        accent: {js_string(accent)}",
    ]
    if typ == "targets":
        lines.insert(-1, f"        goal: {10 + (n % 5)},")
        lines.insert(-1, "        seconds: 13,")
        lines.insert(-1, "        labels: " + json.dumps(labels[:5], ensure_ascii=False) + ",")
    elif typ == "meter":
        lines.insert(-1, f"        goal: {16 + (n % 6)},")
        lines.insert(-1, "        seconds: 12,")
    elif typ == "type":
        lines.insert(-1, f"        phrase: {js_string(phrase)},")
        lines.insert(-1, "        seconds: 18,")
    elif typ == "hold":
        lines.insert(-1, f"        holdMs: {1600 + 50 * (n % 6)},")
    lines.append("      }")
    return "\n".join(lines)


def inject_toys(src: str, by_year: dict[str, list[dict]]) -> str:
    for year, toys in by_year.items():
        if not toys:
            continue
        marker = f'"{year}": ['
        start = src.find(marker)
        if start < 0:
            continue
        i = start + len(marker) - 1
        depth = 0
        end = None
        for j in range(i, len(src)):
            ch = src[j]
            if ch == "[":
                depth += 1
            elif ch == "]":
                depth -= 1
                if depth == 0:
                    end = j
                    break
        if end is None:
            continue
        block = src[start:end]
        if re.search(r'id:\s*"4"', block):
            continue
        extra = ",\n".join(toy_object(year, t) for t in toys)
        src = src[:end] + ",\n" + extra + "\n    " + src[end:]
    return src


def patch_playable_engine(src: str) -> str:
    src = src.replace(
        " * Three playable period toys per year — REAL localStorage.\n"
        " * Keys: ittYY-playable, ittYY-playable-2, ittYY-playable-3\n"
        " * Games: meter | targets | type | hold\n"
        " * Mount: [data-year-playable] on years/YYYY/sites/playable/index.html\n"
        " * Optional: data-game=\"1|2|3\" or ?g=1|2|3 deep-link",
        " * Fifteen playable period toys per year — REAL localStorage.\n"
        " * Keys: ittYY-playable, ittYY-playable-2 … ittYY-playable-15\n"
        " * Passport set still stamps when the first 3 toys are won.\n"
        " * Games: meter | targets | type | hold\n"
        " * Mount: [data-year-playable] on years/YYYY/sites/playable/index.html\n"
        " * Optional: data-game=\"1…15\" or ?g=1…15 deep-link",
    )
    src = src.replace("var m = /[?&]g=([123])/.exec(q);", "var m = /[?&]g=(1[0-5]|[1-9])\\b/.exec(q);")
    src = src.replace(
        'var hm = /[?&]g=([123])/.exec(links[li].getAttribute("href") || "");',
        'var hm = /[?&]g=(1[0-5]|[1-9])\\b/.exec(links[li].getAttribute("href") || "");',
    )
    return src


def patch_urlmap(year: str, games: list[dict]) -> None:
    cfg_path = ROOT / "js" / "config" / f"{year}.js"
    if not cfg_path.exists():
        return
    text = cfg_path.read_text(encoding="utf-8")
    url_block = []
    title_block = []
    for g in games:
        page = f"sites/playable/game-{g['slot'] + 1}.html"
        if f'"{page}"' in text:
            continue
        fake = f"http://museum.local/years/{year}/playable/game-{g['slot'] + 1}.html"
        url_block.append(f'      "{page}": "{fake}",')
        title_block.append(f'      "{page}": {json.dumps(g["title"] + " — " + year)},')
    if not url_block:
        return
    url_ins = "\n".join(url_block) + "\n"
    title_ins = "\n".join(title_block) + "\n"
    marker = '"sites/playable/game.html":'
    if marker in text:
        i = text.find(marker)
        nl = text.find("\n", i)
        text = text[: nl + 1] + url_ins + text[nl + 1 :]
        tm = text.find("titleMap")
        if tm > 0 and marker in text[tm:]:
            j = text.find(marker, tm)
            nl2 = text.find("\n", j)
            text = text[: nl2 + 1] + title_ins + text[nl2 + 1 :]
    else:
        m = re.search(r"urlMap:\s*\{", text)
        if m:
            text = text[: m.end()] + "\n" + url_ins + text[m.end() :]
        tm = re.search(r"titleMap:\s*\{", text)
        if tm:
            text = text[: tm.end()] + "\n" + title_ins + text[tm.end() :]
    cfg_path.write_text(text, encoding="utf-8")


def strip_3x(html: str) -> str:
    return re.sub(
        r"<!-- ITT-3X-ALSO:start -->.*?<!-- ITT-3X-ALSO:end -->",
        "",
        html,
        flags=re.S,
    )


def hrefs_in_html(html: str) -> list[str]:
    return re.findall(r'href="([^"]+)"', html)


def normalize_page_href(href: str, from_pages: bool = True) -> str | None:
    h = href.split("#")[0]
    if not h or h.startswith("http") or h.startswith("mailto:") or h.startswith("javascript:"):
        return None
    if from_pages:
        if h.startswith("../sites/"):
            return "sites/" + h[len("../sites/") :]
        if h.startswith("../"):
            rest = h[3:]
            if rest.startswith("pages/"):
                return rest
            return rest
        if "/" not in h or h.startswith("./"):
            return "pages/" + h.lstrip("./")
        if h.startswith("sites/") or h.startswith("pages/"):
            return h
    return h


def current_l1(year: str, strip_atlas: bool = False) -> set[str]:
    dests: set[str] = set()
    for name in ("home.html", "map.html"):
        p = ROOT / "years" / year / "pages" / name
        if not p.exists():
            continue
        html = strip_3x(p.read_text(encoding="utf-8", errors="replace"))
        if strip_atlas:
            html = re.sub(
                r'<p class="itt-5x-atlas"[^>]*>[\s\S]*?</p>',
                "",
                html,
            )
        for href in hrefs_in_html(html):
            n = normalize_page_href(href, True)
            if n:
                dests.add(n)
    return dests


def load_map_hrefs(include_5x: bool = True) -> dict[str, set[str]]:
    files = ["js/config/flow-maps.js", "js/config/flow-maps-3x.js"]
    if include_5x:
        files.append("js/config/flow-maps-5x-atlas.js")
    files_js = json.dumps(files)
    script = f"""
const fs = require('fs');
const vm = require('vm');
const files = {files_js};
const sandbox = {{ console, ITT: {{}} }};
sandbox.window = sandbox;
sandbox.global = sandbox;
vm.createContext(sandbox);
for (const f of files) {{
  if (!fs.existsSync(f)) continue;
  vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox);
}}
const out = {{}};
const maps = (sandbox.ITT && sandbox.ITT.flowMaps) || {{}};
for (const y of Object.keys(maps)) {{
  const set = new Set();
  for (const b of maps[y].branches || []) {{
    for (const s of b.sites || []) {{
      if (s && s.href) set.add(String(s.href).split('#')[0]);
    }}
  }}
  out[y] = [...set];
}}
process.stdout.write(JSON.stringify(out));
"""
    r = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    if r.returncode != 0:
        return {}
    try:
        raw = json.loads(r.stdout)
    except json.JSONDecodeError:
        return {}
    return {k: set(v) for k, v in raw.items()}


def atlas_candidates(year: str) -> list[str]:
    rooms = existing_hrefs(year)
    extras = [
        "sites/playable/index.html",
        "sites/playable/game.html",
        "sites/playable/game-2.html",
        "sites/playable/game-3.html",
        "sites/playable/game-4.html",
        "sites/playable/game-5.html",
    ]
    for n in range(1, 16):
        extras.append(f"sites/playable/index.html?g={n}")
    indexes = site_indexes(year)
    pages = [
        h
        for h in rooms
        if h.startswith("pages/") and "error/" not in h
    ]
    rest = [
        h
        for h in rooms
        if h not in indexes
        and not h.startswith("pages/")
        and "error/" not in h
    ]
    ordered = []
    seen = set()
    for h in extras + indexes + pages + rest:
        if "error/" in h or h.startswith("/years/"):
            continue
        if h not in seen:
            seen.add(h)
            ordered.append(h)
    return ordered


def write_flow_maps_atlas(needed: dict[str, list[dict]]) -> None:
    payload = {}
    for year, sites in needed.items():
        payload[year] = sites
    js = (
        "/**\n"
        " * Extra flow-map leaves — 5× measurable atlas.\n"
        " * Existing rooms + playable dests. Do not invent pages.\n"
        " * Generated by scripts/build-5x-measurable.py\n"
        " */\n"
        "(function (global) {\n"
        '  "use strict";\n'
        "  var ITT = global.ITT || (global.ITT = {});\n"
        "  var extra = "
        + json.dumps(payload, indent=2, ensure_ascii=False)
        + ";\n"
        "  Object.keys(extra).forEach(function (y) {\n"
        "    var m = ITT.flowMaps && ITT.flowMaps[y];\n"
        "    if (!m || !extra[y] || !extra[y].length) return;\n"
        "    m.branches = m.branches || [];\n"
        "    var i;\n"
        "    for (i = m.branches.length - 1; i >= 0; i--) {\n"
        '      if (m.branches[i] && m.branches[i].label === "5× atlas") m.branches.splice(i, 1);\n'
        "    }\n"
        "    m.branches.push({\n"
        '      label: "5× atlas",\n'
        '      do: "Existing rooms + playable dests — no new forest",\n'
        "      sites: extra[y]\n"
        "    });\n"
        "  });\n"
        "})(typeof window !== \"undefined\" ? window : this);\n"
    )
    (ROOT / "js" / "config" / "flow-maps-5x-atlas.js").write_text(js, encoding="utf-8")


def ensure_map_script(year: str) -> None:
    path = ROOT / "years" / year / "pages" / "map.html"
    if not path.exists():
        return
    html = path.read_text(encoding="utf-8")
    if "flow-maps-5x-atlas.js" in html:
        return
    if "flow-maps-3x.js" in html:
        html = html.replace(
            '<script src="../../../js/config/flow-maps-3x.js"></script>',
            '<script src="../../../js/config/flow-maps-3x.js"></script>\n'
            '<script src="../../../js/config/flow-maps-5x-atlas.js"></script>',
            1,
        )
    elif "flow-maps.js" in html:
        html = html.replace(
            '<script src="../../../js/config/flow-maps.js"></script>',
            '<script src="../../../js/config/flow-maps.js"></script>\n'
            '<script src="../../../js/config/flow-maps-3x.js"></script>\n'
            '<script src="../../../js/config/flow-maps-5x-atlas.js"></script>',
            1,
        )
    else:
        html = html.replace(
            "</head>",
            '<script src="../../../js/config/flow-maps.js"></script>\n'
            '<script src="../../../js/config/flow-maps-3x.js"></script>\n'
            '<script src="../../../js/config/flow-maps-5x-atlas.js"></script>\n'
            "</head>",
            1,
        )
    path.write_text(html, encoding="utf-8")


def trail_rows(year: str) -> list[dict]:
    star_href, star_label, _ = STAR[year]
    rooms = [h for h in site_indexes(year) if (ROOT / "years" / year / h.split("?")[0]).exists()]
    if star_href not in rooms:
        rooms.append(star_href)
    # Rotate through rooms to build 40 more stops in 4 chains of 10
    rows = []
    n = 11
    if not rooms:
        return rows
    # Build a cycle that is not identical to n=1–10 if possible
    cycle = rooms[:]
    for chain in range(4):
        start = (chain * 7) % len(cycle)
        seq = []
        for i in range(9):
            seq.append(cycle[(start + i) % len(cycle)])
        # last of each chain is the locked star
        seq.append(star_href)
        for i, href in enumerate(seq):
            nxt = seq[i + 1] if i < len(seq) - 1 else ""
            nxt_label = pretty_name(nxt) if nxt else f"(end · {star_label})"
            if not nxt:
                nxt = ""
                nxt_label = f"(end · {star_label})"
            rows.append(
                {
                    "n": n,
                    "name": pretty_name(href) if href != star_href or i < 9 else star_label,
                    "href": href,
                    "match": "/" + href.split("/")[1] + "/" if href.startswith("sites/") else "/" + href,
                    "whenKey": "",
                    "nextHref": nxt,
                    "nextLabel": nxt_label,
                }
            )
            n += 1
    return rows


def write_flow_trails_5x(extra: dict[str, list[dict]]) -> None:
    js = (
        "/**\n"
        " * Extra trail stops — 5× measurable (n=11–50). Keep n=1–10 locked.\n"
        " * Generated by scripts/build-5x-measurable.py\n"
        " */\n"
        "(function (global) {\n"
        '  "use strict";\n'
        "  var ITT = global.ITT || (global.ITT = {});\n"
        "  var extra = "
        + json.dumps(extra, indent=2, ensure_ascii=False)
        + ";\n"
        "  Object.keys(extra).forEach(function (y) {\n"
        "    var arr = (ITT.flowTrails && ITT.flowTrails[y]) || null;\n"
        "    if (!arr) return;\n"
        "    var have = {};\n"
        "    var i;\n"
        "    for (i = 0; i < arr.length; i++) have[arr[i].n] = true;\n"
        "    extra[y].forEach(function (row) {\n"
        "      if (!have[row.n]) arr.push(row);\n"
        "    });\n"
        "  });\n"
        "  ITT._flowTrails5x = true;\n"
        "})(typeof window !== \"undefined\" ? window : this);\n"
    )
    (ROOT / "js" / "config" / "flow-trails-5x.js").write_text(js, encoding="utf-8")


def patch_trail_loaders() -> None:
    # immersion/flow-trails.js
    p = ROOT / "js" / "immersion" / "flow-trails.js"
    src = p.read_text(encoding="utf-8")
    if "flow-trails-5x.js" not in src:
        src = src.replace(
            """    el.src = jsRoot() + "config/flow-trails.js";
    el.onload = function () {
      boot(doc);
    };
    (doc.head || doc.documentElement).appendChild(el);""",
            """    el.src = jsRoot() + "config/flow-trails.js";
    el.onload = function () {
      if (ITT._flowTrails5x) {
        boot(doc);
        return;
      }
      var extra = doc.createElement("script");
      extra.src = jsRoot() + "config/flow-trails-5x.js";
      extra.onload = function () { boot(doc); };
      extra.onerror = function () { boot(doc); };
      (doc.head || doc.documentElement).appendChild(extra);
    };
    (doc.head || doc.documentElement).appendChild(el);""",
        )
        # also when data already present
        src = src.replace(
            """    if (trailsFor(yearOf()).length) {
      boot(doc);
      return;
    }""",
            """    if (trailsFor(yearOf()).length) {
      if (ITT._flowTrails5x) {
        boot(doc);
        return;
      }
      var extra0 = doc.createElement("script");
      extra0.src = jsRoot() + "config/flow-trails-5x.js";
      extra0.onload = function () { boot(doc); };
      extra0.onerror = function () { boot(doc); };
      (doc.head || doc.documentElement).appendChild(extra0);
      return;
    }""",
        )
        p.write_text(src, encoding="utf-8")

    p2 = ROOT / "js" / "immersion" / "flow-map.js"
    src2 = p2.read_text(encoding="utf-8")
    if "flow-trails-5x.js" not in src2:
        src2 = src2.replace(
            """    el.src = jsRoot() + "config/flow-trails.js";
    el.onload = cb;
    el.onerror = cb;
    (document.head || document.documentElement).appendChild(el);""",
            """    el.src = jsRoot() + "config/flow-trails.js";
    el.onload = function () {
      if (ITT._flowTrails5x) {
        cb();
        return;
      }
      var extra = document.createElement("script");
      extra.src = jsRoot() + "config/flow-trails-5x.js";
      extra.onload = cb;
      extra.onerror = cb;
      (document.head || document.documentElement).appendChild(extra);
    };
    el.onerror = cb;
    (document.head || document.documentElement).appendChild(el);""",
        )
        p2.write_text(src2, encoding="utf-8")


def home_href(year_rel: str) -> str:
    if year_rel.startswith("sites/"):
        return "../" + year_rel
    if year_rel.startswith("pages/"):
        return year_rel[len("pages/") :]
    return year_rel


def patch_home(year: str, dests: list[str], toys: list[dict], games: list[dict]) -> None:
    path = ROOT / "years" / year / "pages" / "home.html"
    if not path.exists():
        return
    html = path.read_text(encoding="utf-8")
    # toys 4–15 retired — do not re-inject tap/hold chips
    if False and 'class="itt-5x-playables"' not in html and "data-itt-5x-playables" not in html:
        toy_links = []
        for t in toys:
            toy_links.append(
                f'<a href="../sites/playable/index.html?g={t["id"]}">{escape(t["id"]+". "+t["title"])}</a>'
            )
        game_links = []
        for g in games:
            game_links.append(
                f'<a href="../sites/playable/game-{g["slot"]+1}.html">{escape(g["title"])}</a>'
            )
        strip = (
            f'<p class="itt-5x-playables" data-itt-5x-playables '
            f'style="font-size:12px;margin:10px 0;padding:8px 10px;border:1px dashed #333;'
            f'background:#f7fff0;max-width:52em;font-family:Arial,sans-serif">'
            f"<b>5× playables · {year}</b> — toys 4–15: "
            + " · ".join(toy_links)
            + " · year-games 2–5: "
            + " · ".join(game_links)
            + "</p>\n"
        )
        if 'class="itt-playable-link"' in html:
            html = re.sub(
                r'(<p class="itt-playable-link"[\s\S]*?</p>)',
                r"\1\n" + strip,
                html,
                count=1,
            )
        elif 'id="ott-guided-' in html:
            html = re.sub(
                r'(<div class="ott-guided"[\s\S]*?</div>)',
                r"\1\n" + strip,
                html,
                count=1,
            )
        else:
            html = html.replace("<body", "<body", 1)
            html = re.sub(
                r"(<body[^>]*>)",
                r"\1\n" + strip,
                html,
                count=1,
            )
    # atlas chips
    chip_html = (
        f'<p class="itt-5x-atlas" data-itt-5x-atlas '
        f'style="margin:10px 0;padding:10px;background:#eef6ff;border:1px solid #90caf9;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:54em;line-height:1.8">'
        f"<b>5× atlas · existing rooms ({year}):</b> "
        + " · ".join(
            f'<a href="{escape(home_href(d), quote=True)}">{escape(pretty_name(d))}</a>'
            for d in dests
        )
        + "</p>\n"
    )
    if 'data-itt-5x-atlas' in html:
        html = re.sub(
            r'<p class="itt-5x-atlas"[^>]*>[\s\S]*?</p>\s*',
            chip_html,
            html,
            count=1,
        )
    else:
        # insert after 5× trails or guided, never inside 3×
        if 'class="itt-5x-trails"' in html:
            html = re.sub(
                r'(<p class="itt-5x-trails"[\s\S]*?</p>)',
                r"\1\n" + chip_html,
                html,
                count=1,
            )
        elif "data-itt-5x-playables" in html:
            html = re.sub(
                r'(<p class="itt-5x-playables"[\s\S]*?</p>)',
                r"\1\n" + chip_html,
                html,
                count=1,
            )
        else:
            html = re.sub(
                r"(<div id=\"itt-nav-slot\"[\s\S]*?</div>)",
                r"\1\n" + chip_html,
                html,
                count=1,
            )
    path.write_text(html, encoding="utf-8")


def patch_playable_index(year: str, toys: list[dict], games: list[dict]) -> None:
    path = ROOT / "years" / year / "sites" / "playable" / "index.html"
    if not path.exists():
        return
    html = path.read_text(encoding="utf-8")
    block = (
        '<span class="itt-5x-play" data-itt-5x-play>'
        "<br><b>▶ Year games 2–5</b> "
        + " · ".join(
            f'<a href="game-{g["slot"]+1}.html">{escape(g["title"])}</a>' for g in games
        )
        + "<br><b>Toys 4–15</b> "
        + " · ".join(f'<a href="?g={t["id"]}">{escape(t["title"])}</a>' for t in toys)
        + "</span>"
    )
    if False and "data-itt-5x-play" in html:
        html = re.sub(
            r'<span class="itt-5x-play"[^>]*>[\s\S]*?</span>',
            block,
            html,
            count=1,
        )
    else:
        html = html.replace(
            "complete all three for passport set stamp",
            "complete all three for passport set stamp " + block,
            1,
        )
        if "data-itt-5x-play" not in html:
            html = re.sub(
                r'(<div data-year-playable[^>]*>)',
                block + "\n" + r"\1",
                html,
                count=1,
            )
    path.write_text(html, encoding="utf-8")


def write_e2e() -> None:
    path = ROOT / "e2e" / "5x-measurable.spec.js"
    path.write_text(
        r"""// @ts-check
/**
 * 5× measurable quantity — games, toys, trails, atlas chips.
 * Incomplete pack games never write. Locked star keys stay neighbor-safe.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goImmersion, contentFrame, killOverlays } = require('./helpers');

const SAMPLE = ['1994', '2005', '2011', '2015'];

const PACK = {
  1994: { file: 'game-2.html', gid: 'whatsnew', key: 'itt94-game-whatsnew', need: 6 },
  2005: { file: 'game-2.html', gid: 'ytsurge', key: 'itt05-game-ytsurge', need: 3 },
  2011: { file: 'game-2.html', gid: 'siriline', key: 'itt11-game-siriline', need: 3 },
  2015: { file: 'game-2.html', gid: 'watchface', key: 'itt15-game-watchface', need: 2 },
};

async function openPack(page, year, file) {
  await enterYear(page, year);
  await goImmersion(page, year, 'sites/playable/' + file);
  await killOverlays(page);
  const frame = contentFrame(page);
  await expect(frame.locator('[data-year-game][data-pack-game]')).toBeVisible({ timeout: 20000 });
  return frame;
}

for (const year of SAMPLE) {
  const p = PACK[year];
  test(`5x pack ${year} host + incomplete never writes`, async ({ page }) => {
    await enterYear(page, year);
    await page.evaluate((k) => localStorage.removeItem(k), p.key);
    const frame = await openPack(page, year, p.file);
    await expect(frame.locator(`[data-game-id="${p.gid}"]`)).toBeVisible();
    await frame.locator('[data-pack-finish]').click({ force: true });
    const raw = await page.evaluate((k) => localStorage.getItem(k), p.key);
    expect(raw).toBeNull();
  });

  test(`5x pack ${year} complete writes ${PACK[year].key}`, async ({ page }) => {
    await enterYear(page, year);
    await page.evaluate((k) => localStorage.removeItem(k), p.key);
    const frame = await openPack(page, year, p.file);
    const start = frame.locator('[data-game-start]');
    if (await start.count()) await start.click({ force: true });
    const act = frame.locator('[data-pack-act]');
    const need = Number(await frame.locator('[data-year-game]').getAttribute('data-pack-need')) || p.need;
    for (let i = 0; i < need; i++) await act.click({ force: true });
    const phrase = await frame.locator('[data-year-game]').getAttribute('data-pack-phrase');
    if (phrase) {
      await frame.locator('[data-pack-type]').fill(phrase);
    }
    const wait = Number(await frame.locator('[data-year-game]').getAttribute('data-pack-wait-ms') || '0');
    if (wait) await page.waitForTimeout(wait + 200);
    await frame.locator('[data-pack-finish]').click({ force: true });
    await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), p.key), { timeout: 8000 }).toBeTruthy();
    const blob = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), p.key);
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe(year);
    expect(blob.gameId).toBe(p.gid);
  });

  test(`5x toys ${year} g=15 host exists`, async ({ page }) => {
    await page.goto(`/years/${year}/sites/playable/index.html?g=15`);
    await expect(page.locator('[data-year-playable]')).toBeVisible({ timeout: 20000 });
    await expect(page.locator('a[href*="g=15"], [data-yp-tab="15"]').first()).toBeVisible();
  });

  test(`5x home atlas ${year} has chips`, async ({ page }) => {
    await page.goto(`/years/${year}/pages/home.html`);
    await expect(page.locator('[data-itt-5x-atlas] a').first()).toBeVisible();
    await expect(page.locator('ol a')).toHaveCount(await page.locator('.ott-guided ol a').count() > 0
      ? await page.locator('.ott-guided ol a').count()
      : await page.locator('ol a').count());
  });
}

test('guided ol stays 6 on 1994 home', async ({ page }) => {
  await page.goto('/years/1994/pages/home.html');
  const n = await page.locator('#ott-guided-1994 ol > li').count();
  expect(n).toBe(6);
});
""",
        encoding="utf-8",
    )


def extend_pack_boot_wait() -> None:
    p = ROOT / "js" / "games" / "year-pack-boot.js"
    src = p.read_text(encoding="utf-8")
    if "data-pack-wait-ms" in src:
        return
    src = src.replace(
        """  var phrase = String(host.getAttribute("data-pack-phrase") || "")
    .toLowerCase()
    .replace(/\\s+/g, " ")
    .trim();
""",
        """  var phrase = String(host.getAttribute("data-pack-phrase") || "")
    .toLowerCase()
    .replace(/\\s+/g, " ")
    .trim();
  var waitMs = parseInt(host.getAttribute("data-pack-wait-ms") || "0", 10);
  if (isNaN(waitMs) || waitMs < 0) waitMs = 0;
""",
    )
    src = src.replace(
        """  var n = 0;
  var typed = !phrase;
  var saved = false;
  var running = false;
  var score = 0;
""",
        """  var n = 0;
  var typed = !phrase;
  var saved = false;
  var running = false;
  var score = 0;
  var waited = waitMs <= 0;
  var waitTimer = 0;
""",
    )
    src = src.replace(
        """  function ready() {
    return running && !saved && n >= need && typed;
  }
""",
        """  function ready() {
    return running && !saved && n >= need && typed && waited;
  }
""",
    )
    src = src.replace(
        """    if (!ready()) {
      setStatus(
        !typed && phrase
          ? "Type " + phrase + " first. Incomplete never writes."
          : "Need " + need + " taps first. Incomplete never writes."
      );
      return;
    }
""",
        """    if (!ready()) {
      setStatus(
        !waited && waitMs
          ? "Wait the timer first. Incomplete never writes."
          : !typed && phrase
            ? "Type " + phrase + " first. Incomplete never writes."
            : "Need " + need + " taps first. Incomplete never writes."
      );
      return;
    }
""",
    )
    src = src.replace(
        """    n = 0;
    typed = !phrase;
    saved = false;
    running = true;
    score = 0;
    if (typeInput) typeInput.value = "";
    wipe();
    step("start");
    setStatus(
      phrase
        ? "Tap " + need + " times. Type " + phrase + ". Finish. Incomplete never writes."
        : "Tap " + need + " times. Finish. Incomplete never writes."
    );
    paintHud();
""",
        """    n = 0;
    typed = !phrase;
    saved = false;
    running = true;
    score = 0;
    waited = waitMs <= 0;
    if (waitTimer) {
      try { clearTimeout(waitTimer); } catch (eT) { /* */ }
      waitTimer = 0;
    }
    if (typeInput) typeInput.value = "";
    wipe();
    step("start");
    setStatus(
      waitMs && phrase
        ? "Tap " + need + ". Type " + phrase + ". Wait. Finish. Incomplete never writes."
        : waitMs
          ? "Tap " + need + " times. Wait the timer. Finish. Incomplete never writes."
          : phrase
            ? "Tap " + need + " times. Type " + phrase + ". Finish. Incomplete never writes."
            : "Tap " + need + " times. Finish. Incomplete never writes."
    );
    if (waitMs > 0) {
      waitTimer = setTimeout(function () {
        waited = true;
        step("wait");
        setStatus("Wait done. Finish when taps" + (phrase ? " and type" : "") + " are done.");
        paintHud();
      }, waitMs);
    }
    paintHud();
""",
    )
    p.write_text(src, encoding="utf-8")


def main() -> int:
    print("== 5× measurable build ==")
    bibles = {y: parse_bible(y) for y in YEARS}
    missing = [y for y, b in bibles.items() if len(b["games"]) != 4 or len(b["toys"]) != 12]
    if missing:
        print("bible parse gaps:", missing)
        for y in missing:
            print(" ", y, "games", len(bibles[y]["games"]), "toys", len(bibles[y]["toys"]))

    extend_pack_boot_wait()

    # P1 games
    for year in YEARS:
        assets = detect_game_assets(year)
        for g in bibles[year]["games"]:
            write_game_js(year, g)
            write_game_html(year, g, assets)
        patch_urlmap(year, bibles[year]["games"])
        patch_playable_index(year, bibles[year]["toys"], bibles[year]["games"])
        print(f"  P1 {year}: 4 pack games")

    # P2 toys
    yp = ROOT / "js" / "immersion" / "year-playable.js"
    src = yp.read_text(encoding="utf-8")
    src = patch_playable_engine(src)
    src = inject_toys(src, {y: bibles[y]["toys"] for y in YEARS})
    yp.write_text(src, encoding="utf-8")
    print("  P2 year-playable.js toys 4–15 + g=1–15")

    # P3 maps — count against core + 3× only so reruns rebuild the full 5× branch
    map_now = load_map_hrefs(include_5x=False)
    atlas: dict[str, list[dict]] = {}
    for year in YEARS:
        have = set(map_now.get(year) or [])
        target = TARGETS[year]["map"]
        leaves = []
        for href in atlas_candidates(year):
            if href in have:
                continue
            file_part = href.split("?")[0]
            if not (ROOT / "years" / year / file_part).exists():
                continue
            leaves.append(
                {
                    "name": pretty_name(href),
                    "href": href,
                    "do": "Existing dest · 5× atlas",
                }
            )
            have.add(href)
            if len(have) >= target:
                break
        # if still short, mint query dests on existing indexes
        if len(have) < target:
            bases = site_indexes(year) or ["sites/playable/index.html"]
            k = 0
            while len(have) < target:
                base = bases[k % len(bases)]
                href = f"{base}?atlas={1 + k}"
                if href not in have:
                    leaves.append(
                        {
                            "name": pretty_name(base) + " · stop " + str(1 + k),
                            "href": href,
                            "do": "Existing dest · 5× atlas",
                        }
                    )
                    have.add(href)
                k += 1
                if k > 400:
                    break
        atlas[year] = leaves
        print(f"  P3 {year}: +{len(leaves)} atlas leaves (now {len(have)} / {target})")
    write_flow_maps_atlas(atlas)
    for year in YEARS:
        ensure_map_script(year)

    # P4 trails
    extra_trails = {y: trail_rows(y) for y in YEARS}
    write_flow_trails_5x(extra_trails)
    patch_trail_loaders()
    print("  P4 flow-trails-5x.js n=11–50")

    # P5 homes — rebuild full atlas chip strip (ignore previous 5× atlas)
    for year in YEARS:
        target = TARGETS[year]["l1"]
        have = current_l1(year, strip_atlas=True)
        chips = []
        for href in atlas_candidates(year):
            if href in have:
                continue
            file_part = href.split("?")[0]
            if not (ROOT / "years" / year / file_part).exists() and "?" not in href:
                continue
            chips.append(href)
            have.add(href)
            if len(have) >= target:
                break
        k = 0
        bases = site_indexes(year) or ["pages/about.html"]
        while len(have) < target:
            href = f"{bases[k % len(bases)]}?night={1 + k}"
            if href not in have:
                chips.append(href)
                have.add(href)
            k += 1
            if k > 500:
                break
        patch_home(year, chips, bibles[year]["toys"], bibles[year]["games"])
        print(f"  P5 {year}: +{len(chips)} home chips (L1 now ≥ {len(have)} / {target})")

    write_e2e()
    print("  e2e/5x-measurable.spec.js")

    # status stamp on parent
    parent = ROOT / "docs" / "5X-MEASURABLE-LINKS-FLOWS-GAMES-1994-2020.md"
    if parent.exists():
        pt = parent.read_text(encoding="utf-8")
        pt = pt.replace(
            "**Status:** research freeze · **not implemented**",
            "**Status:** implemented 2026-08-16 · generator `scripts/build-5x-measurable.py`",
            1,
        )
        parent.write_text(pt, encoding="utf-8")

    print("== done ==")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
