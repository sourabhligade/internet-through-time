#!/usr/bin/env python3
"""Finish leftover 2× on 2010–2019 dests that still have one leftover key.

Existing dests only. 2020 stays boarded. Official-10 stays 10.
"""
from __future__ import annotations

import json
import os
import re
from pathlib import Path

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
CONT = re.compile(r"Continuity leftover \d+", re.I)


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data) -> None:
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def leftover_pool(year: str) -> list[Path]:
    gold = (ROOT / "years" / year / GOLD[year]).resolve()
    yd = ROOT / "years" / year / "sites"
    out = []
    for p in sorted(yd.rglob("*.html")):
        if p.resolve() == gold:
            continue
        if re.search(r"(error|404|unreachable|handbook)", p.as_posix(), re.I):
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        if "data-lo-save" not in text:
            continue
        out.append(p)
    return out


def uniq_suffix(base: str, used: set[str]) -> str:
    s = f"{base}-d2"
    n = 2
    while s in used:
        n += 1
        s = f"{base}-d{n}"
    return s[:36]


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


def insert_before_body(text: str, block: str) -> str:
    i = text.rfind("</body>")
    if i < 0:
        return text.rstrip() + "\n" + block
    return text[:i] + block + text[i:]


def dest_true_continuity(text: str, dest: Path) -> str:
    """Replace factory Continuity leftover N titles with dest-true labels."""
    lab = dest_label(dest)
    if not CONT.search(text):
        return text
    out = text
    out = re.sub(r"<title>Continuity leftover \d+[^<]*</title>", f"<title>{lab} leftover</title>", out, flags=re.I)
    out = re.sub(r"<h1>Continuity leftover \d+[^<]*</h1>", f"<h1>{lab}</h1>", out, flags=re.I)
    return out


def main() -> None:
    x2 = load_json(ROOT / "e2e" / "2x-links.matrix.json")
    lo = load_json(ROOT / "e2e" / "leftover-official.matrix.json")
    have_x2 = {(str(r["year"]), str(r["key"])) for r in x2}
    have_lo = {(str(d["year"]), str(d["suffix"])) for d in lo["dests"]}
    added_panels = added_x2 = added_lo = dest_trued = 0

    for year in YEARS:
        ydir = ROOT / "years" / year
        if not (ydir / "index.html").is_file():
            continue
        gold = (ydir / GOLD[year]).resolve()
        used = set()
        for p in (ydir / "sites").rglob("*.html"):
            used.update(LO_KEY.findall(p.read_text(encoding="utf-8", errors="replace")))
        used.add(STAR[year])
        pool = leftover_pool(year)

        for p in sorted((ydir / "sites").rglob("*.html")):
            rel = p.relative_to(ydir).as_posix()
            if re.search(r"(error|404|unreachable|handbook)", rel, re.I):
                continue
            text = p.read_text(encoding="utf-8", errors="replace")
            trued = dest_true_continuity(text, p)
            if trued != text:
                text = trued
                dest_trued += 1
            sufs = LO_KEY.findall(text)
            if p.resolve() == gold:
                if text != p.read_text(encoding="utf-8", errors="replace"):
                    p.write_text(text, encoding="utf-8")
                continue
            if len(sufs) >= 2:
                if text != p.read_text(encoding="utf-8", errors="replace"):
                    p.write_text(text, encoding="utf-8")
                continue
            if re.search(r'http-equiv=["\']refresh["\']', text, re.I):
                continue

            base = sufs[0] if sufs else p.parent.name
            suffix = uniq_suffix(base, used)
            used.add(suffix)
            nxt_dest = None
            for cand in pool:
                if cand.resolve() != p.resolve() and cand.resolve() != gold:
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
            p.write_text(text, encoding="utf-8")
            added_panels += 1
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
                added_x2 += 1
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
                added_lo += 1
            print(f"{rel} + {suffix}")

    write_json(ROOT / "e2e" / "2x-links.matrix.json", x2)
    write_json(ROOT / "e2e" / "leftover-official.matrix.json", lo)
    print("panels", added_panels, "2x rows", added_x2, "lo rows", added_lo, "dest-trued", dest_trued)


if __name__ == "__main__":
    main()
