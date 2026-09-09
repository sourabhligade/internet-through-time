#!/usr/bin/env python3
"""YES leftover 3 machines on leftover dests not leftover-3× / not gold (1994–1998 + 2016/17/19)."""
from __future__ import annotations

import json
import re
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


p94 = load("p94", ROOT / "scripts/paint-1994-1998-leftover-3x-x3.py")
p16 = load("p16", ROOT / "scripts/paint-2016-2019-leftover-3x-x3.py")
r94 = load("r94", ROOT / "scripts/implement-1994-1998-lo3x-three-machines.py")
r16 = load("r16", ROOT / "scripts/implement-2016-2019-lo3x-three-machines.py")

YES = {
    "1994": "intel sun mit startingpoint weather loc exploratorium smithsonian personal".split(),
    "1995": "match npr beanies opentext hotwired sun".split(),
    "1996": "aolportal bluemountain four11 infospace realplayer theglobe xoom".split(),
    "1997": "mp3com scripting usatoday yandex dancing-baby".split(),
    "1998": "ayb bowienet four11 hillmancurtis mp3com realplayer textfiles".split(),
    "2016": "dyn".split(),
    "2017": "odyssey".split(),
    "2019": "area51 libra applecard".split(),
}

GOLD = {
    "1994": {"csotd"},
    "1995": {"amazon"},
    "1996": {"portals"},
    "1997": {"pointcast"},
    "1998": {"google"},
    "2016": {"instagram"},
    "2017": {"iphone"},
    "2019": {"disneyplus"},
}

STAR_KEY = {**r94.STAR_KEY, **r16.STAR_KEY}
BEAT = {**r94.BEAT, **r16.BEAT}
STAR_NAME = {**p94.STAR, **p16.STAR}


def leftover3x(year):
    plan = p94.PLAN.get(year) or p16.PLAN[year]
    out = set()
    for k in ("first", "second", "third"):
        out.update(s for s, _n in plan[k])
    return out


def truth(slug):
    if slug in r16.DEFAULT:
        return r16.DEFAULT[slug]
    return r94.truth(slug)


def more_href(year, slug):
    more = ROOT / f"years/{year}/sites/{slug}/more.html"
    return "more.html" if more.is_file() else None


def panel(year, slug, kind):
    verb, ph, keep, trap = truth(slug)
    beat = BEAT[year]
    star = STAR_NAME[year]
    suffix = {"first": f"yeslo-{slug}", "second": f"yeslo2-{slug}", "third": f"yeslo3-{slug}"}[kind]
    storage = f"itt{year[2:]}-{suffix}"
    mark = {"first": "ITT-YES-LO", "second": "ITT-YES-LO2", "third": "ITT-YES-LO3"}[kind]
    miss = more_href(year, slug)
    miss_html = f'<p><a href="{miss}" data-itt-yeslo-miss="1">in-year miss / more · never writes leftover</a></p>' if miss else ""
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


def main():
    rows = []
    for year, dests in YES.items():
        used = leftover3x(year) | GOLD[year]
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
                verb, ph, keep, trap = truth(slug)
                rows.append(
                    {
                        "year": year,
                        "id": slug,
                        "kind": kind,
                        "key": f"itt{year[2:]}-{suffix}",
                        "star": STAR_KEY[year],
                        "verb": verb,
                        "ph": ph,
                        "popKey": suffix,
                        "href": f"/years/{year}/sites/{slug}/index.html",
                        "miss": more_href(year, slug),
                    }
                )
            path.write_text(html, encoding="utf-8")
    out = ROOT / "e2e/undone-yes-leftover.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print("yes leftover dests", len(rows), out)


if __name__ == "__main__":
    main()
