#!/usr/bin/env python3
"""Fill 1994-1999 leftover-official writers to leftover-120. Existing dests first."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = ["1994", "1995", "1996", "1997", "1998", "1999"]
STAR = {
    "1994": "itt94-csotd",
    "1995": "itt95-ssl-checkout",
    "1996": "itt96-portal-wars",
    "1997": "itt97-pointcast",
    "1998": "itt98-lucky",
    "1999": "itt99-aim",
}
NEW = {
    "1994": [
        ("well", "The WELL leftover", "The WELL on the Web. Not a 2000s forum.", "live post (trap)"),
        ("wwworm", "WWW Worm leftover", "McBryan World Wide Web Worm. Not Google.", "Google (trap)"),
        ("aliweb", "ALIWEB leftover", "ALIWEB 1994. Not Yahoo gold.", "Yahoo-as-this (trap)"),
        ("startingpoint", "Starting Point leftover", "Starting Point directory. Not the museum chip.", "chip-as-this (trap)"),
        ("ibm", "IBM.com leftover", "IBM corporate 1994. No modern IBM.", "live cart (trap)"),
        ("firstvirtual", "First Virtual leftover", "First Virtual 1994. No live card.", "live charge (trap)"),
        ("harvest", "Harvest leftover", "Harvest search. AltaVista is 1995.", "AltaVista (trap)"),
        ("microsoft", "Microsoft.com leftover", "microsoft.com 1994. No Win95 as January.", "Win95-as-January (trap)"),
        ("apple", "Apple leftover", "Apple on the Web 1994. Think Different is 1997.", "Think Different (trap)"),
        ("mit", "MIT leftover", "Campus leftover. Not the chip.", "search-as-gold (trap)"),
        ("stanford", "Stanford leftover", "Yahoo's dorm leftover.", "Yahoo-as-this (trap)"),
        ("uiuc", "UIUC / NCSA leftover", "Mosaic residual. NN1 is late-year shell.", "NN1-as-already-here (trap)"),
        ("sun", "Sun leftover", "Sun Microsystems leftover.", "live buy (trap)"),
        ("intel", "Intel leftover", "Intel.com leftover.", "live buy (trap)"),
        ("cisco", "Cisco leftover", "Cisco.com leftover.", "live buy (trap)"),
        ("loc", "Library of Congress leftover", "LOC leftover.", "live checkout (trap)"),
        ("smithsonian", "Smithsonian leftover", "Smithsonian leftover.", "live ticket (trap)"),
        ("time", "Time leftover", "Time / Pathfinder sibling. Pathfinder dest stays.", "Pathfinder-as-this (trap)"),
        ("pbs", "PBS leftover", "PBS.org leftover.", "live stream (trap)"),
        ("weather", "Weather leftover", "Weather leftover literacy. weather.com mass is later.", "weather.com-as-1994 (trap)"),
        ("cnn", "CNN leftover", "CNN leftover literacy 1994. Mass CNN.com is later.", "CNN-as-gold (trap)"),
        ("bbc", "BBC leftover", "BBC leftover literacy.", "live stream (trap)"),
        ("nyt", "NYT leftover", "New York Times leftover literacy.", "paywall live (trap)"),
        ("berkeley", "Berkeley leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("cmu", "CMU leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("fbi", "FBI leftover", "FBI.gov leftover 1994.", "live tip (trap)"),
        ("npr", "NPR leftover", "NPR leftover literacy.", "live stream (trap)"),
        ("reuters", "Reuters leftover", "Reuters leftover literacy.", "live ticker (trap)"),
        ("hp", "HP leftover", "Hewlett-Packard leftover.", "live buy (trap)"),
        ("adobe", "Adobe leftover", "Adobe leftover. No live download.", "live download (trap)"),
        ("realaudio", "RealAudio leftover", "RealAudio leftover 1994–95 class.", "live stream (trap)"),
        ("princeton", "Princeton leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("harvard", "Harvard leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("yale", "Yale leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("columbia", "Columbia leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("caltech", "Caltech leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("noaa", "NOAA leftover", "NOAA leftover.", "live radar (trap)"),
        ("usgs", "USGS leftover", "USGS leftover.", "live map (trap)"),
        ("un", "UN leftover", "United Nations leftover.", "live vote (trap)"),
        ("eff", "EFF leftover", "Electronic Frontier Foundation leftover.", "live petition (trap)"),
        ("isoc", "ISOC leftover", "Internet Society leftover.", "live join (trap)"),
        ("senate", "Senate leftover", "Senate.gov leftover.", "live vote (trap)"),
        ("house", "House leftover", "House.gov leftover.", "live vote (trap)"),
    ],
    "1995": [
        ("webcrawler", "WebCrawler leftover", "Still mass 1995. Not 1994-only.", "Google (trap)"),
        ("suck", "suck.com leftover", "HotWired suck.com 1995.", "live comment (trap)"),
        ("zdnet", "ZDNet leftover", "ZDNet leftover.", "live download (trap)"),
        ("opentext", "Open Text leftover", "Open Text Web Index.", "AltaVista-as-this (trap)"),
        ("submitit", "Submit It leftover", "Submit It! leftover.", "live submit (trap)"),
        ("thespot", "The Spot leftover", "The Spot 1995 webisodic. No live cam.", "live cam (trap)"),
        ("starwave", "Starwave leftover", "Starwave leftover.", "live stream (trap)"),
        ("netcom", "Netcom leftover", "Netcom ISP leftover.", "live account (trap)"),
        ("uunet", "UUNET leftover", "UUNET leftover.", "live account (trap)"),
        ("ibm", "IBM leftover", "IBM.com leftover.", "live cart (trap)"),
        ("apple", "Apple leftover", "Apple leftover 1995.", "Think Different (trap)"),
        ("mit", "MIT leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("weather", "Weather leftover", "Weather leftover.", "live radar (trap)"),
        ("bbc", "BBC leftover", "BBC leftover.", "live stream (trap)"),
        ("nyt", "NYT leftover", "NYT leftover.", "paywall live (trap)"),
        ("sun", "Sun leftover", "Sun leftover.", "live buy (trap)"),
        ("intel", "Intel leftover", "Intel leftover.", "live buy (trap)"),
        ("well", "The WELL leftover", "The WELL leftover.", "live post (trap)"),
        ("startingpoint", "Starting Point leftover", "Starting Point leftover.", "chip-as-this (trap)"),
        ("harvest", "Harvest leftover", "Harvest leftover.", "AltaVista-as-this (trap)"),
        ("cnn", "CNN leftover", "CNN leftover 1995.", "CNN-as-gold (trap)"),
        ("espn", "ESPN SportZone leftover", "ESPN SportZone 1995 leftover.", "live stream (trap)"),
        ("time", "Time leftover", "Time leftover.", "live subscribe (trap)"),
        ("loc", "Library of Congress leftover", "LOC leftover.", "live checkout (trap)"),
        ("pbs", "PBS leftover", "PBS leftover.", "live stream (trap)"),
        ("fbi", "FBI leftover", "FBI leftover.", "live tip (trap)"),
        ("npr", "NPR leftover", "NPR leftover.", "live stream (trap)"),
        ("reuters", "Reuters leftover", "Reuters leftover.", "live ticker (trap)"),
        ("hp", "HP leftover", "HP leftover.", "live buy (trap)"),
        ("adobe", "Adobe leftover", "Adobe leftover.", "live download (trap)"),
        ("princeton", "Princeton leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("harvard", "Harvard leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("yale", "Yale leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("eff", "EFF leftover", "EFF leftover.", "live petition (trap)"),
        ("isoc", "ISOC leftover", "ISOC leftover.", "live join (trap)"),
        ("un", "UN leftover", "UN leftover.", "live vote (trap)"),
        ("senate", "Senate leftover", "Senate leftover.", "live vote (trap)"),
        ("house", "House leftover", "House leftover.", "live vote (trap)"),
        ("realaudio", "RealAudio leftover", "RealAudio leftover.", "live stream (trap)"),
    ],
    "1996": [
        ("webcrawler", "WebCrawler leftover", "comScore 1996 still top-visited.", "Google (trap)"),
        ("tripod", "Tripod leftover", "Tripod homestead leftover.", "GeoCities-as-this (trap)"),
        ("xoom", "Xoom leftover", "Xoom leftover.", "live host (trap)"),
        ("zdnet", "ZDNet leftover", "ZDNet leftover.", "live download (trap)"),
        ("suck", "suck.com leftover", "suck.com leftover.", "live comment (trap)"),
        ("archive", "Internet Archive leftover", "Internet Archive 1996. No live crawl.", "live Wayback (trap)"),
        ("four11", "Four11 leftover", "Four11 leftover.", "live lookup (trap)"),
        ("bluemountain", "Blue Mountain leftover", "Blue Mountain Arts leftover.", "live send (trap)"),
        ("infospace", "InfoSpace leftover", "InfoSpace leftover.", "live lookup (trap)"),
        ("weather", "Weather leftover", "Weather leftover.", "live radar (trap)"),
        ("bbc", "BBC leftover", "BBC leftover.", "live stream (trap)"),
        ("nyt", "NYT leftover", "NYT leftover.", "paywall live (trap)"),
        ("ibm", "IBM leftover", "IBM leftover.", "live cart (trap)"),
        ("apple", "Apple leftover", "Apple leftover. Think Different is 1997.", "Think Different (trap)"),
        ("well", "The WELL leftover", "The WELL leftover.", "live post (trap)"),
        ("espn", "ESPN leftover", "ESPN SportZone leftover.", "live stream (trap)"),
        ("disney", "Disney Online leftover", "Disney Online leftover.", "live stream (trap)"),
        ("barnes", "Barnes & Noble leftover", "BN.com leftover.", "live buy (trap)"),
        ("icq", "ICQ leftover", "ICQ 1996 leftover seed. AIM is 1997.", "AIM-as-this (trap)"),
        ("zdnet2", "Ziff leftover", "Ziff/ZDNet second leftover.", "live download (trap)"),
        ("sun", "Sun leftover", "Sun leftover.", "live buy (trap)"),
        ("intel", "Intel leftover", "Intel leftover.", "live buy (trap)"),
        ("mit", "MIT leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("loc", "Library of Congress leftover", "LOC leftover.", "live checkout (trap)"),
        ("pbs", "PBS leftover", "PBS leftover.", "live stream (trap)"),
        ("fbi", "FBI leftover", "FBI leftover.", "live tip (trap)"),
        ("npr", "NPR leftover", "NPR leftover.", "live stream (trap)"),
        ("reuters", "Reuters leftover", "Reuters leftover.", "live ticker (trap)"),
        ("hp", "HP leftover", "HP leftover.", "live buy (trap)"),
        ("adobe", "Adobe leftover", "Adobe leftover.", "live download (trap)"),
        ("princeton", "Princeton leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("harvard", "Harvard leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("eff", "EFF leftover", "EFF leftover.", "live petition (trap)"),
        ("isoc", "ISOC leftover", "ISOC leftover.", "live join (trap)"),
        ("time", "Time leftover", "Time leftover.", "live subscribe (trap)"),
        ("loc", "Library of Congress leftover", "LOC leftover.", "live checkout (trap)"),
        ("smithsonian", "Smithsonian leftover", "Smithsonian leftover.", "live ticket (trap)"),
        ("un", "UN leftover", "UN leftover.", "live vote (trap)"),
        ("senate", "Senate leftover", "Senate leftover.", "live vote (trap)"),
    ],
    "1997": [
        ("tripod", "Tripod leftover", "Tripod leftover.", "live host (trap)"),
        ("xoom", "Xoom leftover", "Xoom leftover.", "live host (trap)"),
        ("bluemountain", "Blue Mountain leftover", "Blue Mountain leftover.", "live send (trap)"),
        ("infospace", "InfoSpace leftover", "InfoSpace leftover.", "live lookup (trap)"),
        ("four11", "Four11 leftover", "Four11 leftover.", "live lookup (trap)"),
        ("webcrawler", "WebCrawler leftover", "WebCrawler leftover.", "Google (trap)"),
        ("zdnet", "ZDNet leftover", "ZDNet leftover.", "live download (trap)"),
        ("weather", "Weather leftover", "Weather leftover.", "live radar (trap)"),
        ("disney", "Disney Online leftover", "Disney Online leftover.", "live stream (trap)"),
        ("barnes", "Barnes leftover", "BN.com leftover.", "live buy (trap)"),
        ("usatoday", "USA Today leftover", "USA Today leftover.", "live paywall (trap)"),
        ("archive", "Internet Archive leftover", "Internet Archive leftover. No live crawl.", "live Wayback (trap)"),
        ("netflix", "Netflix leftover", "Netflix founded 1997. Mail-DVD leftover. Streaming is later.", "streaming-as-1997 (trap)"),
        ("yandex", "Yandex leftover", "Yandex 1997 leftover. Not Google.", "Google (trap)"),
        ("well", "The WELL leftover", "The WELL leftover.", "live post (trap)"),
        ("ibm", "IBM leftover", "IBM leftover.", "live cart (trap)"),
        ("espn", "ESPN leftover", "ESPN leftover.", "live stream (trap)"),
        ("suck", "suck leftover", "suck.com leftover.", "live comment (trap)"),
        ("goto", "GoTo leftover", "GoTo seed leftover. Mass is 1998.", "paid-search-as-gold (trap)"),
        ("real", "Real.com leftover", "RealNetworks leftover.", "live stream (trap)"),
        ("sun", "Sun leftover", "Sun leftover.", "live buy (trap)"),
        ("intel", "Intel leftover", "Intel leftover.", "live buy (trap)"),
        ("mit", "MIT leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("loc", "Library of Congress leftover", "LOC leftover.", "live checkout (trap)"),
        ("pbs", "PBS leftover", "PBS leftover.", "live stream (trap)"),
        ("fbi", "FBI leftover", "FBI leftover.", "live tip (trap)"),
        ("npr", "NPR leftover", "NPR leftover.", "live stream (trap)"),
        ("reuters", "Reuters leftover", "Reuters leftover.", "live ticker (trap)"),
        ("hp", "HP leftover", "HP leftover.", "live buy (trap)"),
        ("adobe", "Adobe leftover", "Adobe leftover.", "live download (trap)"),
        ("princeton", "Princeton leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("harvard", "Harvard leftover", "Campus leftover.", "search-as-gold (trap)"),
        ("eff", "EFF leftover", "EFF leftover.", "live petition (trap)"),
        ("isoc", "ISOC leftover", "ISOC leftover.", "live join (trap)"),
        ("time", "Time leftover", "Time leftover.", "live subscribe (trap)"),
        ("loc", "Library of Congress leftover", "LOC leftover.", "live checkout (trap)"),
        ("smithsonian", "Smithsonian leftover", "Smithsonian leftover.", "live ticket (trap)"),
        ("un", "UN leftover", "UN leftover.", "live vote (trap)"),
        ("senate", "Senate leftover", "Senate leftover.", "live vote (trap)"),
    ],
    "1998": [
        ("tripod", "Tripod leftover", "Media Metrix 1998 #12.", "live host (trap)"),
        ("xoom", "Xoom leftover", "Media Metrix 1998 #13.", "live host (trap)"),
        ("bluemountain", "Blue Mountain leftover", "Media Metrix 1998 #9.", "live send (trap)"),
        ("infospace", "InfoSpace leftover", "Media Metrix 1998 #20.", "live lookup (trap)"),
        ("four11", "Four11 leftover", "RelevantKnowledge 1997–98.", "live lookup (trap)"),
        ("webcrawler", "WebCrawler leftover", "Still ranked 1998.", "Google-as-already-mass (trap)"),
        ("weather", "Weather leftover", "weather.com ranked 1998.", "live radar (trap)"),
        ("disney", "Disney Online leftover", "Disney Online ranked 1998.", "live stream (trap)"),
        ("barnes", "Barnes leftover", "BN ranked 1998.", "live buy (trap)"),
        ("usatoday", "USA Today leftover", "USA Today leftover.", "live paywall (trap)"),
    ],
    "1999": [
        ("tripod", "Tripod leftover", "Homestead leftover 1999.", "live host (trap)"),
        ("xoom", "Xoom leftover", "Xoom leftover 1999.", "live host (trap)"),
        ("bluemountain", "Blue Mountain leftover", "Blue Mountain leftover.", "live send (trap)"),
        ("infospace", "InfoSpace leftover", "InfoSpace leftover.", "live lookup (trap)"),
        ("weather", "Weather leftover", "Weather leftover.", "live radar (trap)"),
        ("disney", "Disney leftover", "Disney Online leftover.", "live stream (trap)"),
        ("barnes", "Barnes leftover", "BN leftover.", "live buy (trap)"),
        ("usatoday", "USA Today leftover", "USA Today leftover.", "live paywall (trap)"),
        ("four11", "Four11 leftover", "Four11 leftover.", "live lookup (trap)"),
        ("webcrawler", "WebCrawler leftover", "WebCrawler leftover.", "Google-as-gold (trap)"),
    ],
}


def leftover_html(year, prefix, star, suffix, title, blurb, trap, next_href, next_label):
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#c0c0c0" text="#000">
<p class="archive-residual" data-itt-capture-cite style="font-size:11px;margin:10px 0;font-family:Arial,sans-serif">[failed-final] {title} · no official brand pixels.</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>{title}</h1>
<p>{blurb}</p>
<p class="honest">Leftover {year}. Completing this never writes <code>{star}</code>.</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
</div>
<div data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" style="margin:14px auto;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em">
<p style="font-size:11px;color:#444;margin:0 0 8px">{year} leftover machine · incomplete never writes</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
<p>
 <button type="button" data-lo-pick="a">{title.replace(' leftover','')} room</button>
 <button type="button" data-lo-pick="b">{title.replace(' leftover','')} second path</button>
</p>
<p><label><input type="checkbox" data-lo-req> Leftover {year} · not the star.</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{suffix}" data-lo-kind="hops" data-lo-min-pick="2">Save leftover {title}</button> <span data-lo-status></span></p>
</div>
<p hidden data-next-flow data-next-when-key="{prefix}-{suffix}" style="max-width:46em;margin:8px auto;font-family:Arial,sans-serif;font-size:13px"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def count_lo(year: str) -> int:
    n = 0
    for p in (ROOT / "years" / year / "sites").rglob("*.html"):
        if "data-lo-save" in p.read_text(encoding="utf-8", errors="replace"):
            n += 1
    return n


def used_suffixes(year: str) -> set[str]:
    out = set()
    for p in (ROOT / "years" / year / "sites").rglob("*.html"):
        t = p.read_text(encoding="utf-8", errors="replace")
        m = re.search(r'data-lo-key="([^"]+)"', t)
        if m:
            out.add(m.group(1))
    return out


def matrix_append(rows):
    path = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    dests = data.get("dests") or []
    have = {(d["year"], d["href"], d["suffix"]) for d in dests}
    added = 0
    for r in rows:
        key = (r["year"], r["href"], r["suffix"])
        if key in have:
            continue
        dests.append(r)
        have.add(key)
        added += 1
    data["dests"] = dests
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return added


def main() -> None:
    prefix_of = {y: "itt" + y[2:] for y in YEARS}
    new_rows = []
    for year in YEARS:
        star = STAR[year]
        prefix = prefix_of[year]
        sites = ROOT / "years" / year / "sites"
        used = used_suffixes(year)
        before = count_lo(year)
        # 1) second path on dests with exactly one leftover page
        for d in sorted(p for p in sites.iterdir() if p.is_dir()):
            if count_lo(year) >= 120:
                break
            pages = []
            for f in d.rglob("*.html"):
                t = f.read_text(encoding="utf-8", errors="replace")
                if "data-lo-save" in t:
                    pages.append(f)
            if len(pages) != 1:
                continue
            more = d / "more.html"
            if more.exists():
                continue
            suf = d.name + "-2"
            if suf in used:
                suf = d.name + "-2p"
            used.add(suf)
            more.write_text(
                leftover_html(
                    year, prefix, star, suf, d.name + " leftover 2nd",
                    "Second leftover path. Never the star.",
                    "star-as-this (trap)",
                    "../" + pages[0].parent.name + "/" + pages[0].name,
                    "Back leftover",
                ),
                encoding="utf-8",
            )
            new_rows.append({
                "year": year,
                "href": f"sites/{d.name}/more.html",
                "key": f"{prefix}-{suf}",
                "suffix": suf,
                "needPick": "a",
                "minPick": 2,
                "field": False,
                "placeholder": "",
            })
        # 2) new dest folders
        for slug, title, blurb, trap in NEW[year]:
            if count_lo(year) >= 120:
                break
            dest = sites / slug / "index.html"
            if dest.exists():
                continue
            dest.parent.mkdir(parents=True, exist_ok=True)
            suf = slug + "-dp"
            n = 2
            while suf in used:
                suf = f"{slug}-dp{n}"
                n += 1
            used.add(suf)
            dest.write_text(
                leftover_html(year, prefix, star, suf, title, blurb, trap, "../../pages/home.html", "Starting Point"),
                encoding="utf-8",
            )
            new_rows.append({
                "year": year,
                "href": f"sites/{slug}/index.html",
                "key": f"{prefix}-{suf}",
                "suffix": suf,
                "needPick": "a",
                "minPick": 2,
                "field": False,
                "placeholder": "",
            })
        after = count_lo(year)
        print(f"{year} leftover {before} → {after}")
    added = matrix_append(new_rows)
    print("matrix rows added", added)


if __name__ == "__main__":
    main()
