#!/usr/bin/env python3
"""
Build 5× real dests from docs/5X-REAL-DEST-IMPLEMENT/YEAR-YYYY.md

D1 extras on existing dirs · D2 dual-cited new dirs (lean) · D3 fill
until L1/map targets. No ?night= · no 404 chips · incomplete never writes.
"""
from __future__ import annotations

import json
import re
import subprocess
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "docs" / "5X-REAL-DEST-IMPLEMENT"
YEARS = [str(y) for y in range(1994, 2010)]

STAR = {
    "1994": ("sites/csotd/index.html", "CSotD guestbook"),
    "1995": ("sites/amazon/ssl-checkout.html", "SSL checkout"),
    "1996": ("sites/portals/wars.html", "Portal wars"),
    "1997": ("sites/pointcast/index.html", "PointCast"),
    "1998": ("sites/google/lucky.html", "I'm Feeling Lucky"),
    "1999": ("sites/aim/index.html", "AIM"),
    "2000": ("sites/mapquest/index.html", "MapQuest"),
    "2001": ("sites/msn/index.html", "MSN"),
    "2002": ("sites/stumbleupon/index.html", "StumbleUpon"),
    "2003": ("sites/photobucket/index.html", "Photobucket"),
    "2004": ("sites/facebook/networks.html", "thefacebook networks"),
    "2005": ("sites/pandora/index.html", "Pandora"),
    "2006": ("sites/twitter/index.html", "Twitter 140"),
    "2007": ("sites/iphone/index.html", "iPhone Safari"),
    "2008": ("sites/github/issue.html", "GitHub issue"),
    "2009": ("sites/facebook/feed.html", "Facebook Like"),
    "2010": ("sites/imgur/index.html", "Imgur"),
    "2011": ("sites/airbnb/index.html", "Airbnb request"),
    "2012": ("sites/soundcloud/index.html", "SoundCloud"),
    "2013": ("sites/vine/record.html", "Vine 6s"),
    "2014": ("sites/whatsapp/index.html", "WhatsApp install"),
    "2015": ("sites/apple/watch.html", "Apple Watch"),
    "2016": ("sites/instagram/stories.html", "IG Stories"),
    "2017": ("sites/iphone/x.html", "Face ID"),
    "2018": ("sites/gdpr/manage.html", "GDPR Manage"),
    "2019": ("sites/disneyplus/home.html", "Disney+ Continue"),
    "2020": ("sites/zoom/index.html", "Zoom mute/leave"),
}

TARGETS = {
    "1994": (85, 155),
    "1995": (75, 190),
    "1996": (75, 180),
    "1997": (70, 185),
    "1998": (85, 250),
    "1999": (75, 255),
    "2000": (85, 295),
    "2001": (80, 195),
    "2002": (70, 170),
    "2003": (65, 120),
    "2004": (65, 305),
    "2005": (140, 320),
    "2006": (90, 300),
    "2007": (125, 315),
    "2008": (75, 265),
    "2009": (90, 290),
    "2010": (120, 275),
    "2011": (90, 145),
    "2012": (90, 150),
    "2013": (170, 230),
    "2014": (160, 245),
    "2015": (155, 180),
    "2016": (120, 185),
    "2017": (160, 225),
    "2018": (185, 205),
    "2019": (85, 145),
    "2020": (205, 245),
}

DONE = {"2002", "2003", "2008", "2009", "2010"}
D3_NAMES = [
    "help",
    "faq",
    "press",
    "legal",
    "tips",
    "status",
    "support",
    "privacy",
    "terms",
    "notes",
    "blog",
    "news",
]


def prefix(year: str) -> str:
    return "itt" + year[2:]


def pretty(href: str) -> str:
    h = href.split("?")[0].rstrip("/")
    if h.endswith("/index.html"):
        h = h[: -len("/index.html")]
    elif h.endswith(".html"):
        h = h[: -len(".html")]
    part = h.split("/")[-1] or h
    part = part.replace("-", " ").replace("_", " ")
    return (part[:1].upper() + part[1:]) if part else href


def parse_bible(year: str) -> dict:
    text = (BIBLE / f"YEAR-{year}.md").read_text(encoding="utf-8")
    d1 = []
    for m in re.finditer(
        r"\| `sites/([^/`]+)/` \| `([^`]+\.html)` \| ([^|]+?) \| ([^|]+?) \|",
        text,
    ):
        slug, fn, premise, keycol = m.groups()
        writer = None
        km = re.search(r"`(itt\d{2}-[a-z0-9-]+)`", keycol)
        if km:
            writer = km.group(1)
        d1.append(
            {
                "slug": slug,
                "file": fn,
                "premise": premise.strip(),
                "writer": writer,
            }
        )
    d2 = []
    for m in re.finditer(
        r"\| `([a-z0-9][a-z0-9-]*)` \| ([^|]+?) \| ([^|]+?) \| ([^|]+?) \| ([^|]+?) \|",
        text,
    ):
        slug, name, beat, c1, c2 = m.groups()
        if slug in {"sites"} or ".html" in slug:
            continue
        d2.append(
            {
                "slug": slug,
                "name": name.strip(),
                "beat": beat.strip(),
                "cite1": c1.strip(),
                "cite2": c2.strip(),
            }
        )
    return {"d1": d1, "d2": d2}


def detect_css(year: str) -> str:
    for cand in (f"period-{year}.css", f"period-{year}-lite.css", "period-1995.css"):
        if (ROOT / "css" / cand).exists():
            return cand
    return "period-1995.css"


def detect_immersion(year: str) -> str:
    if (ROOT / "js" / f"immersion-{year}.js").exists():
        return f"immersion-{year}.js"
    return "immersion.js"


def star_rel_from_site(star_href: str) -> str:
    # from years/Y/sites/foo/bar.html → ../<star after sites/>
    if star_href.startswith("sites/"):
        return "../" + star_href[len("sites/") :]
    return "../../" + star_href


def html_page(
    year: str,
    title: str,
    premise: str,
    css: str,
    immersion: str,
    star_rel: str,
    star_label: str,
    writer_key: str | None,
    honesty: str,
) -> str:
    pref = prefix(year)
    suffix = ""
    if writer_key:
        suffix = writer_key.replace(pref + "-", "", 1)
    if writer_key:
        # Product form — never dest-field / "I read the period note" plaques.
        body = f"""
<p>{escape(premise)}</p>
<p class="honesty" style="font-size:11px;background:#ffffcc;border:1px solid #888;padding:6px">{escape(honesty)} · museum original · no commercial SWF · incomplete never writes · key <code>{escape(writer_key)}</code></p>
<form data-itt-real-form data-storage-key="{escape(suffix)}" data-require-name="what why">
<p><label>What you did<br>
<input type="text" name="what" placeholder="product action" style="width:70%;padding:6px"></label></p>
<p><label>Why this year<br>
<input type="text" name="why" placeholder="year-true reason" style="width:70%;padding:6px"></label></p>
<p><button type="submit">Save this step</button></p>
<p data-itt-action-status style="min-height:1.2em;font-size:12px">Both fields required. Empty never writes.</p>
</form>
"""
    else:
        body = f"""
<p>{escape(premise)}</p>
<p class="honesty" style="font-size:11px;background:#ffffcc;border:1px solid #888;padding:6px">{escape(honesty)} · museum original · literacy dest · no write · no commercial SWF</p>
<p style="font-size:12px;color:#444">Open this page, read it, then follow Next. Load alone does not write storage.</p>
"""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}" data-itt-primary-year="{year}">
<head>
<meta charset="utf-8">
<title>{escape(title)} — {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
</head>
<body bgcolor="#f4f4f4" text="#111" link="#00c" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="640" align="center" cellpadding="12"><tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">← Starting Point {year}</a> · <a href="index.html">Room home</a></p>
<h1 style="font-size:18px;margin:0 0 8px">{escape(title)}</h1>
{body}
<p style="margin-top:14px;font-size:12px"><b>Next:</b> <a href="{escape(star_rel, quote=True)}">{escape(star_label)}</a></p>
</td></tr></table>
<script src="../../../../js/{immersion}" defer></script>
</body>
</html>
"""


def patch_urlmap(year: str, rels: list[str], titles: dict[str, str]) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.exists() or not rels:
        return
    text = cfg.read_text(encoding="utf-8")
    url_lines = []
    title_lines = []
    for rel in rels:
        if f'"{rel}"' in text:
            continue
        fake = f"http://museum.local/years/{year}/{rel}"
        url_lines.append(f'      "{rel}": "{fake}",')
        title_lines.append(f'      "{rel}": {json.dumps(titles.get(rel, pretty(rel)))},')
    if not url_lines:
        return
    m = re.search(r"urlMap:\s*\{", text)
    if m:
        text = text[: m.end()] + "\n" + "\n".join(url_lines) + "\n" + text[m.end() :]
    tm = re.search(r"titleMap:\s*\{", text)
    if tm:
        text = text[: tm.end()] + "\n" + "\n".join(title_lines) + "\n" + text[tm.end() :]
    cfg.write_text(text, encoding="utf-8")


def append_home_chips(year: str, rels: list[str]) -> None:
    path = ROOT / "years" / year / "pages" / "home.html"
    if not path.exists() or not rels:
        return
    html = path.read_text(encoding="utf-8")
    chips = []
    for rel in rels:
        if rel.startswith("sites/"):
            href = "../" + rel
        elif rel.startswith("pages/"):
            href = rel[len("pages/") :]
        else:
            href = rel
        chips.append(f'<a href="{escape(href, quote=True)}">{escape(pretty(rel))}</a>')
    add = " · " + " · ".join(chips)
    if "data-itt-5x-atlas" in html:
        html = re.sub(
            r'(<p class="itt-5x-atlas"[^>]*>[\s\S]*?)</p>',
            r"\1" + add + "</p>",
            html,
            count=1,
        )
    path.write_text(html, encoding="utf-8")


def merge_atlas(new_leaves: dict[str, list[dict]]) -> None:
    ap = ROOT / "js" / "config" / "flow-maps-5x-atlas.js"
    src = ap.read_text(encoding="utf-8")
    m = re.search(r"var extra = (\{[\s\S]*?\});\n  Object.keys", src)
    extra = json.loads(m.group(1)) if m else {}
    for y, leaves in new_leaves.items():
        have = {L.get("href") for L in extra.get(y, [])}
        extra.setdefault(y, [])
        for L in leaves:
            if L["href"] not in have:
                extra[y].append(L)
                have.add(L["href"])
    js = (
        "/**\n * Extra flow-map leaves — 5× real dests.\n"
        " * Generated by scripts/build-5x-real-dests.py\n */\n"
        "(function (global) {\n"
        '  "use strict";\n'
        "  var ITT = global.ITT || (global.ITT = {});\n"
        "  var extra = "
        + json.dumps(extra, indent=2, ensure_ascii=False)
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
        '      do: "Real dests · existing + densify + dual-cite",\n'
        "      sites: extra[y]\n"
        "    });\n"
        "  });\n"
        '})(typeof window !== "undefined" ? window : this);\n'
    )
    ap.write_text(js, encoding="utf-8")


def count_l1(year: str) -> int:
    dests = set()
    for name in ("home.html", "map.html"):
        p = ROOT / "years" / year / "pages" / name
        if not p.exists():
            continue
        html = re.sub(
            r"<!-- ITT-3X-ALSO:start -->.*?<!-- ITT-3X-ALSO:end -->",
            "",
            p.read_text(encoding="utf-8", errors="replace"),
            flags=re.S,
        )
        for href in re.findall(r'href="([^"]+)"', html):
            h = href.split("#")[0]
            if not h or h.startswith(("http", "mailto", "javascript")):
                continue
            dests.add(h)
    return len(dests)


def site_dirs(year: str) -> list[str]:
    s = ROOT / "years" / year / "sites"
    if not s.is_dir():
        return []
    return sorted(p.name for p in s.iterdir() if p.is_dir() and p.name != "playable")


def write_one(year: str, slug: str, fn: str, title: str, premise: str, writer: str | None, honesty: str, assets: dict) -> bool:
    dest = ROOT / "years" / year / "sites" / slug / fn
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        return False
    star_href, star_label = STAR[year]
    dest.write_text(
        html_page(
            year,
            title,
            premise,
            assets["css"],
            assets["immersion"],
            star_rel_from_site(star_href),
            star_label,
            writer,
            honesty,
        ),
        encoding="utf-8",
    )
    return True


def main() -> int:
    atlas_new: dict[str, list[dict]] = {}
    print("== 5× real dests ==")
    print("  dest-field / period-note plaques are banned — new rooms use product forms")
    for year in YEARS:
        if year in DONE:
            print(f"  {year} dests already at target — skip")
            continue
        bible = parse_bible(year)
        assets = {"css": detect_css(year), "immersion": detect_immersion(year)}
        created: list[str] = []
        titles: dict[str, str] = {}
        map_t, l1_t = TARGETS[year]
        lean = int(year) >= 2011

        for row in bible["d1"]:
            slug, fn = row["slug"], row["file"]
            if not (ROOT / "years" / year / "sites" / slug).is_dir():
                continue
            title = pretty(slug + "/" + fn)
            ok = write_one(
                year,
                slug,
                fn,
                title,
                row["premise"],
                row["writer"],
                f"{year} · {slug} · {row['premise']}",
                assets,
            )
            if ok:
                rel = f"sites/{slug}/{fn}"
                created.append(rel)
                titles[rel] = title

        if lean:
            for row in bible["d2"]:
                slug = row["slug"]
                # forest years must not grow dirs; lean only
                base = ROOT / "years" / year / "sites" / slug
                honesty = f"{row['beat']} · {row['cite1']} · {row['cite2']}"
                for fn, title, premise, writer in (
                    (
                        "index.html",
                        row["name"],
                        f"{row['name']} — {row['beat']}. Two checks then save.",
                        prefix(year) + "-" + slug,
                    ),
                    (
                        "about.html",
                        row["name"] + " · about",
                        f"{row['name']} · {row['cite1']} / {row['cite2']}. Literacy only.",
                        None,
                    ),
                    (
                        "do.html",
                        row["name"] + " · do",
                        f"Do the {year} {row['name']} verb. Empty never writes.",
                        prefix(year) + "-" + slug + "-do",
                    ),
                ):
                    ok = write_one(year, slug, fn, title, premise, writer, honesty, assets)
                    if ok:
                        rel = f"sites/{slug}/{fn}"
                        created.append(rel)
                        titles[rel] = title

        # D3 fill until L1 target (unique href strings on home+map after we add chips)
        # Pre-count: add enough unique files, then chip them all
        need = l1_t - count_l1(year)
        if need > 0:
            for slug in site_dirs(year):
                if need <= 0:
                    break
                for stem in D3_NAMES:
                    if need <= 0:
                        break
                    fn = stem + ".html"
                    title = pretty(slug + "/" + fn)
                    ok = write_one(
                        year,
                        slug,
                        fn,
                        title,
                        f"{year} {slug} · {stem} surface. Period literacy dest.",
                        None,
                        f"{year} densify · {slug}/{stem}",
                        assets,
                    )
                    if ok:
                        rel = f"sites/{slug}/{fn}"
                        created.append(rel)
                        titles[rel] = title
                        need -= 1

        patch_urlmap(year, created, titles)
        append_home_chips(year, created)
        atlas_new[year] = [
            {"name": titles.get(r, pretty(r)), "href": r, "do": "Real dest · 5× densify"}
            for r in created
        ]
        print(f"  {year}: +{len(created)} pages  L1 now ~{count_l1(year)} / {l1_t}")

    merge_atlas(atlas_new)
    print("== atlas merged ==")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
