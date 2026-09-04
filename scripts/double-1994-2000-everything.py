#!/usr/bin/env python3
"""1994–2000 double: leftover 4× writers · official 20 · guided 12.

Dests already on disk only. No dest invention.
Star n=1. No new dest folders or HTML files.
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from itt_leftover_dest import dest_label

ROOT = Path(__file__).resolve().parents[1]
YEARS = [str(y) for y in range(1994, 2001)]
DEST_FREEZE = {
    "1994": 53, "1995": 51, "1996": 52, "1997": 56,
    "1998": 52, "1999": 48, "2000": 54,
}
HTML_FREEZE = {
    "1994": 277, "1995": 247, "1996": 199, "1997": 183,
    "1998": 202, "1999": 219, "2000": 209,
}
STAR = {
    "1994": "csotd", "1995": "ssl-checkout", "1996": "portal-wars",
    "1997": "pointcast", "1998": "lucky", "1999": "aim", "2000": "mapquest",
}
LO_KEY = re.compile(r'data-lo-key="([^"]+)"')

# Extra official 11–20 slugs already on disk this year (not in official 10).
OFFICIAL_EXTRA = {
    "1994": ["cnn", "apple", "bbc", "microsoft", "ibm", "webcrawler", "ncsa", "imdb", "infoseek", "mcom"],
    "1995": ["aol", "apple", "espn", "hotwired", "ibm", "infoseek", "nyt", "pathfinder", "webcrawler", "zdnet"],
    "1996": ["cnn", "microsoft", "netscape", "icq", "espn", "disney", "archive", "askjeeves", "craigslist", "mtv"],
    "1997": ["amazon", "yahoo", "cnn", "geocities", "netscape", "altavista", "espn", "disney", "winamp", "netflix"],
    "1998": ["cnn", "microsoft", "netscape", "excite", "geocities", "aol", "lycos", "icq", "altavista", "winamp"],
    "1999": ["yahoo", "cnn", "microsoft", "geocities", "slashdot", "livejournal", "dmoz", "excite", "aol", "netscape"],
    "2000": ["yahoo", "microsoft", "geocities", "slashdot", "blogger", "aol", "excite", "dmoz", "apple", "netscape"],
}

GUIDED_EXTRA = {
    "1994": [
        ("../sites/cnn/index.html", "CNN leftover"),
        ("../sites/apple/index.html", "Apple leftover"),
        ("../sites/microsoft/index.html", "Microsoft leftover"),
        ("../sites/ibm/index.html", "IBM leftover"),
        ("../sites/webcrawler/index.html", "WebCrawler leftover"),
        ("../sites/imdb/index.html", "IMDb leftover"),
    ],
    "1995": [
        ("../sites/aol/index.html", "AOL leftover"),
        ("../sites/apple/index.html", "Apple leftover"),
        ("../sites/espn/index.html", "ESPN leftover"),
        ("../sites/hotwired/index.html", "HotWired leftover"),
        ("../sites/nyt/index.html", "NYT leftover"),
        ("../sites/zdnet/index.html", "ZDNet leftover"),
    ],
    "1996": [
        ("../sites/cnn/index.html", "CNN leftover"),
        ("../sites/microsoft/index.html", "Microsoft leftover"),
        ("../sites/netscape/index.html", "Netscape leftover"),
        ("../sites/icq/index.html", "ICQ leftover"),
        ("../sites/espn/index.html", "ESPN leftover"),
        ("../sites/disney/index.html", "Disney leftover"),
    ],
    "1997": [
        ("../sites/amazon/index.html", "Amazon leftover"),
        ("../sites/yahoo/index.html", "Yahoo leftover"),
        ("../sites/cnn/index.html", "CNN leftover"),
        ("../sites/geocities/index.html", "GeoCities leftover"),
        ("../sites/netscape/index.html", "Netscape leftover"),
        ("../sites/winamp/index.html", "Winamp leftover"),
    ],
    "1998": [
        ("../sites/cnn/index.html", "CNN leftover"),
        ("../sites/microsoft/index.html", "Microsoft leftover"),
        ("../sites/netscape/index.html", "Netscape leftover"),
        ("../sites/excite/index.html", "Excite leftover"),
        ("../sites/geocities/index.html", "GeoCities leftover"),
        ("../sites/lycos/index.html", "Lycos leftover"),
    ],
    "1999": [
        ("../sites/yahoo/index.html", "Yahoo leftover"),
        ("../sites/cnn/index.html", "CNN leftover"),
        ("../sites/microsoft/index.html", "Microsoft leftover"),
        ("../sites/geocities/index.html", "GeoCities leftover"),
        ("../sites/slashdot/index.html", "Slashdot leftover"),
        ("../sites/livejournal/index.html", "LiveJournal leftover"),
    ],
    "2000": [
        ("../sites/yahoo/index.html", "Yahoo leftover"),
        ("../sites/microsoft/index.html", "Microsoft leftover"),
        ("../sites/geocities/index.html", "GeoCities leftover"),
        ("../sites/slashdot/index.html", "Slashdot leftover"),
        ("../sites/blogger/index.html", "Blogger leftover"),
        ("../sites/excite/index.html", "Excite leftover"),
    ],
}

LABEL = {
    "cnn": "CNN leftover", "apple": "Apple leftover", "bbc": "BBC leftover",
    "microsoft": "Microsoft leftover", "ibm": "IBM leftover",
    "webcrawler": "WebCrawler leftover", "ncsa": "NCSA leftover",
    "imdb": "IMDb leftover", "infoseek": "Infoseek leftover",
    "mcom": "Mosaic leftover", "aol": "AOL leftover", "espn": "ESPN leftover",
    "hotwired": "HotWired leftover", "nyt": "NYT leftover",
    "pathfinder": "Pathfinder leftover", "zdnet": "ZDNet leftover",
    "netscape": "Netscape leftover", "icq": "ICQ leftover",
    "disney": "Disney leftover", "archive": "Archive leftover",
    "askjeeves": "Ask Jeeves leftover", "craigslist": "Craigslist leftover",
    "mtv": "MTV leftover", "amazon": "Amazon leftover", "yahoo": "Yahoo leftover",
    "geocities": "GeoCities leftover", "altavista": "AltaVista leftover",
    "winamp": "Winamp leftover", "netflix": "Netflix leftover",
    "excite": "Excite leftover", "lycos": "Lycos leftover",
    "slashdot": "Slashdot leftover", "livejournal": "LiveJournal leftover",
    "dmoz": "dmoz leftover", "blogger": "Blogger leftover",
}

GOLD_HREF = {
    "1994": "sites/csotd/index.html",
    "1995": "sites/amazon/ssl-checkout.html",
    "1996": "sites/portals/wars.html",
    "1997": "sites/pointcast/index.html",
    "1998": "sites/google/lucky.html",
    "1999": "sites/aim/index.html",
    "2000": "sites/mapquest/index.html",
}


def leftover_panel(year: str, suffix: str, title: str, nxt: str, nxt_lab: str) -> str:
    key = f"itt{year[2:]}-{suffix}"
    return (
        f"<!-- ITT-LO-OFFICIAL-D4:{suffix}:start -->\n"
        f'<section data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" '
        f'style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;'
        f'font-size:12px;max-width:46em;background:#fff8dc;color:#111">\n'
        f"<p><b>Leftover 4×</b> · {title} · not the chip · incomplete never writes · "
        f"<code>{key}</code></p>\n"
        f'<label style="display:block"><input type="checkbox" data-lo-req> '
        f"This is leftover, not the year star.</label>\n"
        f'<label style="display:block"><input type="checkbox" data-lo-req> '
        f"Trap / empty / 0 ticks never write.</label>\n"
        f"<p>\n"
        f' <button type="button" data-lo-pick="keep">{year} leftover path</button>\n'
        f' <button type="button" data-lo-pick="trap">Neighbor year (trap)</button>\n'
        f"</p>\n"
        f"<p>\n"
        f' <button type="button" data-lo-trap>Neighbor year (trap)</button>\n'
        f' <button type="button" data-lo-save data-lo-key="{suffix}" data-lo-need-pick="keep">'
        f"Save leftover 4×</button>\n"
        f"</p>\n"
        f"<p data-lo-status></p>\n"
        f'<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> '
        f'<a href="{nxt}">{nxt_lab}</a></p>\n'
        f"</section>\n"
        f"<!-- ITT-LO-OFFICIAL-D4:{suffix}:end -->\n"
    )


def dest_primary(year: str, slug: str) -> Path | None:
    d = ROOT / "years" / year / "sites" / slug
    if not d.is_dir():
        return None
    for name in ("index.html", "more.html", "about.html"):
        if (d / name).is_file():
            return d / name
    htmls = sorted(p for p in d.glob("*.html") if p.is_file())
    return htmls[0] if htmls else None


def dest_href(year: str, slug: str) -> str | None:
    p = dest_primary(year, slug)
    if not p:
        return None
    return "sites/" + p.relative_to(ROOT / "years" / year / "sites").as_posix()


def first_lo_suffix(year: str, slug: str) -> str:
    d = ROOT / "years" / year / "sites" / slug
    if not d.is_dir():
        return slug
    for f in [dest_primary(year, slug)] + sorted(d.rglob("*.html")):
        if not f or not f.is_file():
            continue
        keys = LO_KEY.findall(f.read_text(encoding="utf-8", errors="replace"))
        if keys:
            return keys[0]
    return slug


def dest_writer_count(year: str, slug: str) -> int:
    d = ROOT / "years" / year / "sites" / slug
    if not d.is_dir():
        return 0
    n = 0
    for f in d.rglob("*.html"):
        n += f.read_text(encoding="utf-8", errors="replace").count("data-lo-save")
    return n


def dest_used_keys(year: str) -> set[str]:
    used = {STAR[year]}
    sites = ROOT / "years" / year / "sites"
    for f in sites.rglob("*.html"):
        used.update(LO_KEY.findall(f.read_text(encoding="utf-8", errors="replace")))
    return used


def uniq_suffix(base: str, used: set[str]) -> str:
    s = base + "-d4" if not base.endswith("-d4") else base + "-x"
    n = 4
    while s in used:
        n += 1
        s = f"{base}-d{n}"
    return s[:36]


def insert_before_body(text: str, block: str) -> str:
    i = text.rfind("</body>")
    if i < 0:
        return text.rstrip() + "\n" + block
    return text[:i] + block + text[i:]


def count_tree(year: str) -> tuple[int, int]:
    ydir = ROOT / "years" / year
    dests = sum(1 for p in (ydir / "sites").iterdir() if p.is_dir())
    htmls = len(list(ydir.rglob("*.html")))
    return dests, htmls


def leftover_4x() -> int:
    x2 = json.loads((ROOT / "e2e" / "2x-links.matrix.json").read_text())
    lo = json.loads((ROOT / "e2e" / "leftover-official.matrix.json").read_text())
    have_x2 = {(str(r["year"]), str(r["key"])) for r in x2}
    have_lo = {(str(d["year"]), str(d["suffix"])) for d in lo["dests"]}
    panels = 0
    for year in YEARS:
        used = dest_used_keys(year)
        sites = ROOT / "years" / year / "sites"
        dests = [p for p in sorted(sites.iterdir()) if p.is_dir()]
        leftovers = [p for p in dests if p.name != "playable"]
        nxt_i = 0
        year_n = 0
        for dest in dests:
            have_n = dest_writer_count(year, dest.name)
            need = 4 - have_n
            if need <= 0:
                continue
            page = dest_primary(year, dest.name)
            if not page:
                continue
            text = page.read_text(encoding="utf-8", errors="replace")
            have = LO_KEY.findall(text)
            base = have[0] if have else dest.name
            rel = page.relative_to(ROOT / "years" / year).as_posix()
            for _ in range(need):
                suffix = uniq_suffix(base, used)
                used.add(suffix)
                nxt_dest = leftovers[nxt_i % len(leftovers)] if leftovers else dest
                nxt_i += 1
                if nxt_dest.resolve() == dest.resolve() and len(leftovers) > 1:
                    nxt_dest = leftovers[nxt_i % len(leftovers)]
                    nxt_i += 1
                nxt_page = dest_primary(year, nxt_dest.name) or nxt_dest / "index.html"
                nxt = Path(os.path.relpath(nxt_page, page.parent)).as_posix()
                nxt_lab = dest_label(nxt_page) if nxt_page.is_file() else nxt_dest.name
                nxt_abs = f"/years/{year}/{nxt_page.relative_to(ROOT / 'years' / year).as_posix()}"
                title = f"{year} leftover · {suffix.replace('-', ' ')}"
                text = insert_before_body(text, leftover_panel(year, suffix, title, nxt, nxt_lab))
                key = f"itt{year[2:]}-{suffix}"
                path = f"/years/{year}/{rel}"
                if (year, key) not in have_x2:
                    x2.append({
                        "year": year, "path": path, "key": key, "kind": "query",
                        "title": title, "next": nxt_abs, "nextLabel": nxt_lab,
                    })
                    have_x2.add((year, key))
                if (year, suffix) not in have_lo:
                    lo["dests"].append({
                        "year": year, "href": rel, "key": key, "suffix": suffix,
                        "needPick": "keep", "minPick": 0, "field": False,
                        "placeholder": f"{suffix} leftover",
                    })
                    have_lo.add((year, suffix))
                panels += 1
                year_n += 1
            page.write_text(text, encoding="utf-8")
        print(f"  leftover-4x {year} panels={year_n}")
    (ROOT / "e2e" / "2x-links.matrix.json").write_text(json.dumps(x2, indent=2) + "\n", encoding="utf-8")
    (ROOT / "e2e" / "leftover-official.matrix.json").write_text(json.dumps(lo, indent=2) + "\n", encoding="utf-8")
    return panels


def official_20() -> None:
    trails_path = ROOT / "js/config/flow-trails.js"
    src = trails_path.read_text(encoding="utf-8")
    for year in YEARS:
        extras = []
        slugs = OFFICIAL_EXTRA[year]
        hrefs = []
        for slug in slugs:
            href = dest_href(year, slug)
            if not href:
                raise SystemExit(f"{year} official extra dest missing {slug}")
            hrefs.append((slug, href))
        gold_href = GOLD_HREF[year]
        for i, (slug, href) in enumerate(hrefs):
            n = 11 + i
            nxt_slug, nxt_href = hrefs[(i + 1) % len(hrefs)]
            if i == len(hrefs) - 1:
                nxt_href = gold_href
                nxt_lab = "★ year gold leftover"
            else:
                nxt_lab = LABEL.get(nxt_slug, nxt_slug + " leftover")
            suf = first_lo_suffix(year, slug)
            extras.append(
                '      {"n": %d, "name": "%s", "href": "%s", "match": "/%s/", '
                '"whenKey": "itt%s-%s", "nextHref": "%s", "nextLabel": "%s"}'
                % (n, LABEL.get(slug, slug), href, slug, year[2:], suf, nxt_href, nxt_lab)
            )
        extra_js = ",\n".join(extras)
        pat = re.compile(rf'("{year}":\s*\[)(.*?)(\n\s*\])', re.S)
        m = pat.search(src)
        if not m:
            raise SystemExit(f"{year} trail block missing")
        body = m.group(2)
        if '"n": 11' in body:
            print(f"  official-20 {year} already has n=11")
            continue
        new_body = body.rstrip()
        if not new_body.endswith(","):
            new_body = new_body + ","
        new_body = new_body + "\n" + extra_js
        src = src[: m.start(2)] + new_body + src[m.end(2) :]
        print(f"  official-20 {year} +{len(hrefs)}")
    trails_path.write_text(src, encoding="utf-8")


def guided_12() -> None:
    path = ROOT / "ui/year/start-data.js"
    src = path.read_text(encoding="utf-8")
    for year in YEARS:
        extras = GUIDED_EXTRA[year]
        for href, _lab in extras:
            target = (ROOT / "years" / year / "pages" / href).resolve()
            if not target.is_file():
                raise SystemExit(f"{year} guided extra missing {href} -> {target}")
        rows = []
        for href, lab in extras:
            rows.append(f'      "<a href=\\"{href}\\">{lab}</a> — leftover walk"')
        extra = ",\n".join(rows)
        pat = re.compile(
            rf'("{year}":\s*\{{.*?)"items":\s*\[(.*?)(\s*\])',
            re.S,
        )
        m = pat.search(src)
        if not m:
            raise SystemExit(f"{year} guided block missing")
        items = m.group(2)
        if "leftover walk" in items and items.count("leftover walk") >= 6:
            print(f"  guided-12 {year} already doubled")
            continue
        last = items.rfind("<a href=\\\"map.html\\\"")
        line_start = items.rfind("\n", 0, last if last >= 0 else len(items))
        if line_start < 0:
            new_items = items.rstrip() + ",\n" + extra + "\n    "
        else:
            new_items = items[: line_start + 1] + extra + ",\n" + items[line_start + 1 :]
        src = src[: m.start(2)] + new_items + src[m.end(2) :]
        print(f"  guided-12 {year} +{len(extras)}")
    path.write_text(src, encoding="utf-8")


def main() -> int:
    print("1994–2000 double · dests on disk · leftover dest freeze")
    before = {y: count_tree(y) for y in YEARS}
    panels = leftover_4x()
    official_20()
    guided_12()
    for y in YEARS:
        after = count_tree(y)
        if after != before[y]:
            raise SystemExit(f"{y} dest/HTML changed {before[y]} → {after}")
        if after[0] != DEST_FREEZE[y]:
            raise SystemExit(f"{y} dest freeze {DEST_FREEZE[y]} → {after[0]}")
        if after[1] != HTML_FREEZE[y]:
            raise SystemExit(f"{y} HTML freeze {HTML_FREEZE[y]} → {after[1]}")
        under = []
        sites = ROOT / "years" / y / "sites"
        for dest in sites.iterdir():
            if dest.is_dir() and dest.name != "playable" and dest_writer_count(y, dest.name) < 4:
                under.append(dest.name)
        if under:
            raise SystemExit(f"{y} dests still under leftover 4×: {under}")
        print(f"  freeze {y} dests={after[0]} html={after[1]} leftover-4x HOLD")
    print(f"leftover-4x panels added={panels}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
