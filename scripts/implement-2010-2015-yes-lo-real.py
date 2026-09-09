#!/usr/bin/env python3
"""YES leftover 3 machines on famous 2011–2015 dests not leftover-3× / not gold."""
from __future__ import annotations

import json
import re
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
real_spec = importlib.util.spec_from_file_location("real", ROOT / "scripts/implement-2010-2015-lo3x-real.py")
real = importlib.util.module_from_spec(real_spec)
real_spec.loader.exec_module(real)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-2010-2015-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

YES = {
    "2011": "chromebook ubercab silk rdio jobs nintendo roblox wallet maps".split(),
    "2012": "googleplus nexus play yahoo windows-phone drivebox tumblr12".split(),
    "2015": "messenger hbonow secret titleii ytgaming pinterest tumblr github linkedin".split(),
}

GOLD = {
    "2011": {"googleplus"},
    "2012": {"instagram"},
    "2014": {"whatsapp"},
    "2015": {"periscope"},
}


def leftover3x(year: str) -> set[str]:
    out = set()
    for k in ("first", "second", "third"):
        out.update(s for s, _n in paint.PLAN[year][k])
    return out


def panel(year: str, slug: str, kind: str) -> str:
    verb, ph, keep, trap = real.truth(slug)
    beat = real.BEAT[year]
    star = paint.STAR[year]
    suffix = {"first": f"yeslo-{slug}", "second": f"yeslo2-{slug}", "third": f"yeslo3-{slug}"}[kind]
    storage = f"itt{year[2:]}-{suffix}"
    mark = {"first": "ITT-YES-LO", "second": "ITT-YES-LO2", "third": "ITT-YES-LO3"}[kind]
    miss = real.more_href(year, slug)
    miss_html = ""
    if miss:
        miss_html = f'<p><a href="{miss}" data-itt-yeslo-miss="1">in-year miss / more · never writes leftover</a></p>'
    return f"""<!-- {mark}:{slug}:start -->
<div class="itt-yeslo-flow" data-pop-panel="1" data-yeslo-panel="1" data-itt-yeslo="1" data-itt-year-beat="{year}" style="margin:14px auto;padding:12px;border:1px dashed #333;max-width:46em;background:#f3e5f5;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{slug} leftover</b> · YES famous {year} · leftover {kind} · not leftover-3× door · {star} is the chip · <code>{storage}</code></p>
<p data-itt-year-copy>{beat}</p>
<p><b>M3:</b> {verb}. Empty / trap never writes.</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{ph}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>{verb}<br><input type="text" data-pop-field placeholder="{ph}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {beat}</label>
{miss_html}
<p><button type="button" data-pop-go data-pop-id="{slug}" data-pop-key="{suffix}">{keep}</button> <span data-pop-status></span></p>
</div>
<!-- {mark}:{slug}:end -->
"""


def main() -> None:
    rows = []
    for year, dests in YES.items():
        used = leftover3x(year) | GOLD.get(year, set())
        for slug in dests:
            if slug in used:
                print("skip used", year, slug)
                continue
            path = ROOT / f"years/{year}/sites/{slug}/index.html"
            if not path.is_file():
                print("missing", year, slug)
                continue
            html = path.read_text(encoding="utf-8", errors="replace")
            for kind, mark in (("first", "ITT-YES-LO"), ("second", "ITT-YES-LO2"), ("third", "ITT-YES-LO3")):
                block = panel(year, slug, kind)
                pat = rf"<!-- {mark}:{slug}:start -->.*?<!-- {mark}:{slug}:end -->"
                if re.search(pat, html, re.S):
                    html = re.sub(pat, block.strip(), html, count=1, flags=re.S)
                    st = "replaced"
                elif re.search(r"</body>", html, re.I):
                    html = re.sub(r"</body>", block + "\n</body>", html, count=1, flags=re.I)
                    st = "inserted"
                else:
                    html += "\n" + block
                    st = "appended"
                print(st, year, kind, slug)
                suffix = {"first": f"yeslo-{slug}", "second": f"yeslo2-{slug}", "third": f"yeslo3-{slug}"}[kind]
                verb, ph, keep, trap = real.truth(slug)
                rows.append(
                    {
                        "year": year,
                        "id": slug,
                        "kind": kind,
                        "key": f"itt{year[2:]}-{suffix}",
                        "star": real.STAR_KEY[year],
                        "verb": verb,
                        "ph": ph,
                        "popKey": suffix,
                        "href": f"/years/{year}/sites/{slug}/index.html",
                        "miss": real.more_href(year, slug),
                    }
                )
            path.write_text(html, encoding="utf-8")
    out = ROOT / "e2e/2010-2015-yes-leftover.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print("yes leftover dests", len(rows), out)


if __name__ == "__main__":
    main()
