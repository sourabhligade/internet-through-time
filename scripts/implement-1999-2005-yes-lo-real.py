#!/usr/bin/env python3
"""Dest-true leftover machines on YES dests that are not leftover-3× doors."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
import importlib.util

spec = importlib.util.spec_from_file_location("real", ROOT / "scripts/implement-1999-2005-lo3x-real.py")
real = importlib.util.module_from_spec(spec)
spec.loader.exec_module(real)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-1999-2005-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

YES = {
    "1999": "aol yahoo msn geocities amazon ebay netscape excite altavista icq slashdot google napster blogger paypal y2k livejournal egroups neopets etrade theonion drkoop sixdegrees hampsterdance webvan yahoomessenger cnn microsoft askjeeves sourceforge".split(),
    "2000": "womencom baidu askjeeves netscape hampsterdance y2k gamespot hotbot dmoz about infoseek bbc".split(),
    "2001": "wikipedia archive itunes apple napster google yahoo amazon cnn ebay paypal slashdot blogger microsoft mozilla encarta dmoz moveon grok appleimac movabletype xp msn askjeeves".split(),
    "2002": "stumbleupon kazaa wired phoenix mozilla ipod friendster googlenews daypop technorati fark homestar blogspot wikipedia google lastfm netflix mtv ebay amazon yahoo blogger isp movabletype".split(),
    "2003": "photobucket itunes wordpress linkedin myspace friendster adsense bloglines blogger skype delicious hi5 flash phoenix 4chan amazon yahoo wikipedia google cnn kazaa firebird".split(),
    "2004": "facebook gmail firefox flickr delicious digg web20conference myspace wikipedia yahoo amazon ebay orkut skype livejournal friendster craigslist wow linkedin cnn bbc imdb wordpress itunes bloglines google microsoft msn aol".split(),
    "2005": "youtube maps pandora housingmaps digg reddit flickr itunes techcrunch milliondollar clubpenguin kayak firefox gmail vimeo myspace wikipedia yahoo google amazon facebook dailymotion googlevideo earth lastfm reader secondlife msn aol skype delicious blogger wordpress cnn apple mashable programmableweb analytics googleearth yelp odeo linkedin".split(),
}

GOLD = {
    "1999": {"aim"},
    "2000": {"mapquest"},
    "2001": {"wikipedia"},
    "2002": {"stumbleupon"},
    "2003": {"photobucket"},
    "2004": {"facebook"},
    "2005": {"youtube"},
}

STAR_KEY = {
    "1999": "itt99-aim",
    "2000": "itt00-mapquest",
    "2001": "itt01-wiki",
    "2002": "itt02-stumble",
    "2003": "itt03-photobucket",
    "2004": "itt04-thefacebook-networks",
    "2005": "itt05-yt-uploads",
}


def leftover3x(year: str) -> set[str]:
    plan = paint.PLAN[year]
    out = set()
    for k in ("first", "second", "third"):
        out.update(s for s, _n in plan[k])
    return out


def panel(year: str, slug: str, kind: str = "first") -> str:
    verb, ph, keep, trap = real.truth(slug)
    beat = real.BEAT[year]
    star = paint.STAR[year]
    suffix = {"first": f"yeslo-{slug}", "second": f"yeslo2-{slug}", "third": f"yeslo3-{slug}"}[kind]
    storage = f"itt{year[2:]}-{suffix}"
    mark = {"first": "ITT-YES-LO", "second": "ITT-YES-LO2", "third": "ITT-YES-LO3"}[kind]
    miss = real.more_href(year, slug)
    miss_html = ""
    if miss:
        miss_html = (
            f'<p><a href="{miss}" data-itt-yeslo-miss="1">in-year miss / more · never writes leftover</a></p>'
        )
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
        used = leftover3x(year) | GOLD[year]
        for slug in dests:
            if slug in used:
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
                        "star": STAR_KEY[year],
                        "verb": verb,
                        "ph": ph,
                        "popKey": suffix,
                        "href": f"/years/{year}/sites/{slug}/index.html",
                        "miss": real.more_href(year, slug),
                    }
                )
            path.write_text(html, encoding="utf-8")
    out = ROOT / "e2e/1999-2005-yes-leftover.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print("yes leftover dests", len(rows))


if __name__ == "__main__":
    main()
