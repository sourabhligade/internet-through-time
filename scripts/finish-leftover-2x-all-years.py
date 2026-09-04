#!/usr/bin/env python3
"""Leftover 2× on every dest in every live year 1994–2019.

Existing dests only. Leftover key, not the star. 2020+ boarded.
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
YEARS = [str(y) for y in range(1994, 2020)]
LO_KEY = re.compile(r'data-lo-key="([^"]+)"')
SKIP = re.compile(r"(error|404|unreachable|handbook)", re.I)
REFRESH = re.compile(r'http-equiv=["\']refresh["\']', re.I)

# Official-10 n=1 whenKey suffix — leftover 2× never writes this.
STAR = {
    "1994": "csotd",
    "1995": "ssl-checkout",
    "1996": "portal-wars",
    "1997": "pointcast",
    "1998": "lucky",
    "1999": "aim",
    "2000": "mapquest",
    "2001": "wiki",
    "2002": "stumble",
    "2003": "photobucket",
    "2004": "thefacebook-networks",
    "2005": "yt-uploads",
    "2006": "tweets",
    "2007": "iphone",
    "2008": "github",
    "2009": "like",
    "2010": "ig",
    "2011": "gplus",
    "2012": "ig-android",
    "2013": "vine-posts",
    "2014": "wa-install",
    "2015": "periscope",
    "2016": "ig-stories",
    "2017": "faceid",
    "2018": "gdpr",
    "2019": "disneyplus",
}
GOLD = {
    "1994": "sites/csotd/index.html",
    "1995": "sites/amazon/ssl-checkout.html",
    "1996": "sites/portals/wars.html",
    "1997": "sites/pointcast/index.html",
    "1998": "sites/google/lucky.html",
    "1999": "sites/aim/index.html",
    "2000": "sites/mapquest/index.html",
    "2001": "sites/wikipedia/edit.html",
    "2002": "sites/stumbleupon/index.html",
    "2003": "sites/photobucket/index.html",
    "2004": "sites/facebook/networks.html",
    "2005": "sites/youtube/upload.html",
    "2006": "sites/twitter/index.html",
    "2007": "sites/iphone/index.html",
    "2008": "sites/github/issue.html",
    "2009": "sites/facebook/index.html",
    "2010": "sites/instagram/index.html",
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2013": "sites/vine/record.html",
    "2014": "sites/whatsapp/index.html",
    "2015": "sites/periscope/index.html",
    "2016": "sites/instagram/stories.html",
    "2017": "sites/iphone/x.html",
    "2018": "sites/gdpr/index.html",
    "2019": "sites/disneyplus/home.html",
}


def leftover_panel(year: str, suffix: str, title: str, nxt: str, nxt_lab: str) -> str:
    key = f"itt{year[2:]}-{suffix}"
    return (
        f"<!-- ITT-LO-OFFICIAL-D2:{suffix}:start -->\n"
        f'<section data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" '
        f'style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;'
        f'font-size:12px;max-width:46em;background:#fff8dc;color:#111">\n'
        f"<p><b>Leftover 2×</b> · {title} · not the chip · incomplete never writes · "
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
        f"Save leftover 2×</button>\n"
        f"</p>\n"
        f"<p data-lo-status></p>\n"
        f'<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> '
        f'<a href="{nxt}">{nxt_lab}</a></p>\n'
        f"</section>\n"
        f"<!-- ITT-LO-OFFICIAL-D2:{suffix}:end -->\n"
    )


def slug_of(rel: str) -> str:
    p = Path(rel)
    parts = list(p.parts)
    if parts and parts[0] == "sites":
        parts = parts[1:]
    name = p.stem
    if name in ("index", "more", "home", "about"):
        base = parts[0] if parts else name
    else:
        base = "-".join(parts[:-1] + [name]) if len(parts) > 1 else name
    s = re.sub(r"[^a-z0-9]+", "-", base.lower()).strip("-")
    return (s or "dest")[:24]


def uniq_suffix(base: str, used: set[str]) -> str:
    s = base
    n = 2
    while s in used:
        s = f"{base}-d{n}" if n > 2 else f"{base}-d2"
        n += 1
        if n > 80:
            s = f"{base}-d{n}-{len(used)}"
            break
    return s[:36]


def insert_before_body(text: str, block: str) -> str:
    i = text.rfind("</body>")
    if i < 0:
        return text.rstrip() + "\n" + block
    return text[:i] + block + text[i:]


def dest_pages(year: str) -> list[Path]:
    ydir = ROOT / "years" / year / "sites"
    if not ydir.is_dir():
        return []
    out = []
    for p in sorted(ydir.rglob("*.html")):
        rel = p.relative_to(ROOT / "years" / year).as_posix()
        if SKIP.search(rel):
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        if REFRESH.search(text):
            continue
        out.append(p)
    return out


def main() -> None:
    x2 = json.loads((ROOT / "e2e" / "2x-links.matrix.json").read_text())
    lo = json.loads((ROOT / "e2e" / "leftover-official.matrix.json").read_text())
    have_x2 = {(str(r["year"]), str(r["key"])) for r in x2}
    have_lo = {(str(d["year"]), str(d["suffix"])) for d in lo["dests"]}
    panels = 0
    for year in YEARS:
        ydir = ROOT / "years" / year
        if not (ydir / "index.html").is_file():
            continue
        gold = (ydir / GOLD[year]).resolve() if GOLD.get(year) else None
        pages = dest_pages(year)
        used = {STAR[year]}
        used.add(STAR[year] + "-posts")
        for p in pages:
            used.update(LO_KEY.findall(p.read_text(encoding="utf-8", errors="replace")))
        leftovers = [p for p in pages if p.resolve() != gold]
        nxt_i = 0
        year_panels = 0
        for p in pages:
            rel = p.relative_to(ydir).as_posix()
            text = p.read_text(encoding="utf-8", errors="replace")
            have = LO_KEY.findall(text)
            need = 2 - len(have)
            if need <= 0:
                continue
            base = have[0] if have else slug_of(rel)
            for _ in range(need):
                suffix = uniq_suffix(base, used)
                used.add(suffix)
                nxt_dest = None
                for _try in range(len(leftovers) or 1):
                    if not leftovers:
                        break
                    cand = leftovers[nxt_i % len(leftovers)]
                    nxt_i += 1
                    if cand.resolve() != p.resolve():
                        nxt_dest = cand
                        break
                if nxt_dest is None:
                    nxt = "../../pages/home.html"
                    nxt_lab = "Starting Point"
                    nxt_abs = f"/years/{year}/pages/home.html"
                else:
                    nxt = Path(os.path.relpath(nxt_dest, p.parent)).as_posix()
                    nxt_lab = dest_label(nxt_dest)
                    nxt_abs = f"/years/{year}/{nxt_dest.relative_to(ydir).as_posix()}"
                title = f"{year} leftover · {suffix.replace('-', ' ')}"
                text = insert_before_body(text, leftover_panel(year, suffix, title, nxt, nxt_lab))
                key = f"itt{year[2:]}-{suffix}"
                path = f"/years/{year}/{rel}"
                if (year, key) not in have_x2:
                    x2.append(
                        {
                            "year": year,
                            "path": path,
                            "key": key,
                            "kind": "query",
                            "title": title,
                            "next": nxt_abs,
                            "nextLabel": nxt_lab,
                        }
                    )
                    have_x2.add((year, key))
                if (year, suffix) not in have_lo:
                    lo["dests"].append(
                        {
                            "year": year,
                            "href": rel,
                            "key": key,
                            "suffix": suffix,
                            "needPick": "keep",
                            "minPick": 0,
                            "field": False,
                            "placeholder": f"{suffix} leftover",
                        }
                    )
                    have_lo.add((year, suffix))
                panels += 1
                year_panels += 1
            p.write_text(text, encoding="utf-8")
        print(f"{year} leftover-2x panels {year_panels}")
    (ROOT / "e2e" / "2x-links.matrix.json").write_text(json.dumps(x2, indent=2) + "\n", encoding="utf-8")
    (ROOT / "e2e" / "leftover-official.matrix.json").write_text(
        json.dumps(lo, indent=2) + "\n", encoding="utf-8"
    )
    print("total leftover-2x panels", panels)


if __name__ == "__main__":
    main()
