#!/usr/bin/env python3
"""Leftover 2× on gold dests. Leftover key, not the star. Existing dests only."""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from itt_leftover_dest import dest_label

ROOT = Path(__file__).resolve().parents[1]
YEARS = [str(y) for y in range(2010, 2020)]
GOLD = {
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
STAR = {
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
LO_KEY = re.compile(r'data-lo-key="([^"]+)"')


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


def uniq_suffix(base: str, used: set[str]) -> str:
    s = f"{base}-d2"
    n = 2
    while s in used:
        n += 1
        s = f"{base}-d{n}"
    return s[:36]


def leftover_pool(year: str, skip: Path) -> list[Path]:
    gold = (ROOT / "years" / year / GOLD[year]).resolve()
    out = []
    for p in sorted((ROOT / "years" / year / "sites").rglob("*.html")):
        if p.resolve() in (gold, skip.resolve()):
            continue
        if re.search(r"(error|404|unreachable|handbook)", p.as_posix(), re.I):
            continue
        if "data-lo-save" not in p.read_text(encoding="utf-8", errors="replace"):
            continue
        out.append(p)
    return out


def main() -> None:
    x2 = json.loads((ROOT / "e2e" / "2x-links.matrix.json").read_text())
    lo = json.loads((ROOT / "e2e" / "leftover-official.matrix.json").read_text())
    have_x2 = {(str(r["year"]), str(r["key"])) for r in x2}
    have_lo = {(str(d["year"]), str(d["suffix"])) for d in lo["dests"]}
    n = 0
    for year in YEARS:
        ydir = ROOT / "years" / year
        gold = ydir / GOLD[year]
        if not gold.is_file():
            continue
        text = gold.read_text(encoding="utf-8")
        sufs = LO_KEY.findall(text)
        if len(sufs) >= 2:
            continue
        used = set()
        for p in (ydir / "sites").rglob("*.html"):
            used.update(LO_KEY.findall(p.read_text(encoding="utf-8", errors="replace")))
        used.add(STAR[year])
        base = sufs[0] if sufs else Path(GOLD[year]).parent.name
        suffix = uniq_suffix(base, used)
        pool = leftover_pool(year, gold)
        if pool:
            nxt_dest = pool[0]
            nxt = Path(os.path.relpath(nxt_dest, gold.parent)).as_posix()
            nxt_lab = dest_label(nxt_dest)
            nxt_abs = f"/years/{year}/{nxt_dest.relative_to(ydir).as_posix()}"
        else:
            nxt = "../../pages/home.html"
            nxt_lab = "Starting Point"
            nxt_abs = f"/years/{year}/pages/home.html"
        title = f"{year} leftover · {suffix.replace('-', ' ')}"
        i = text.rfind("</body>")
        block = leftover_panel(year, suffix, title, nxt, nxt_lab)
        text = text[:i] + block + text[i:] if i >= 0 else text + "\n" + block
        gold.write_text(text, encoding="utf-8")
        key = f"itt{year[2:]}-{suffix}"
        rel = GOLD[year]
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
        n += 1
        print(f"{year} {rel} + {suffix}")
    (ROOT / "e2e" / "2x-links.matrix.json").write_text(json.dumps(x2, indent=2) + "\n", encoding="utf-8")
    (ROOT / "e2e" / "leftover-official.matrix.json").write_text(
        json.dumps(lo, indent=2) + "\n", encoding="utf-8"
    )
    print("gold leftover-2x", n)


if __name__ == "__main__":
    main()
