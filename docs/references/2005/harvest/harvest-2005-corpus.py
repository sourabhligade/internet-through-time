#!/usr/bin/env python3
"""Stack a 2005 research corpus the way 2011 was stacked.

Bibliography only. Not dest folders. Not 5k live GETs.
"""
from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
UA = "InternetThroughTimeMuseum/2005-harvest (research bibliography; +https://github.com)"
URL_RE = re.compile(r"https?://[^\s\]\)>'\"<>]+", re.I)

DEST_DOMAINS = {
    "youtube": "youtube.com",
    "maps": "maps.google.com",
    "reddit": "reddit.com",
    "digg": "digg.com",
    "flickr": "flickr.com",
    "pandora": "pandora.com",
    "housingmaps": "housingmaps.com",
    "techcrunch": "techcrunch.com",
    "myspace": "myspace.com",
    "facebook": "facebook.com",
    "gmail": "gmail.google.com",
    "yahoo": "yahoo.com",
    "google": "google.com",
    "msn": "msn.com",
    "aol": "aol.com",
    "ebay": "ebay.com",
    "amazon": "amazon.com",
    "ask": "ask.com",
    "bbc": "bbc.co.uk",
    "walmart": "walmart.com",
    "wikipedia": "en.wikipedia.org",
    "dailymotion": "dailymotion.com",
    "vimeo": "vimeo.com",
    "googlevideo": "video.google.com",
    "earth": "earth.google.com",
    "googleearth": "earth.google.com",
    "itunes": "apple.com",
    "clubpenguin": "clubpenguin.com",
    "milliondollar": "milliondollarhomepage.com",
    "delicious": "del.icio.us",
    "bloglines": "bloglines.com",
    "feedburner": "feedburner.com",
    "kayak": "kayak.com",
    "lastfm": "last.fm",
    "mashable": "mashable.com",
    "programmableweb": "programmableweb.com",
    "reader": "google.com/reader",
    "analytics": "google.com/analytics",
    "craigslist": "craigslist.org",
    "skype": "skype.com",
    "linkedin": "linkedin.com",
    "wordpress": "wordpress.org",
    "blogger": "blogger.com",
    "technorati": "technorati.com",
    "slashdot": "slashdot.org",
    "metafilter": "metafilter.com",
    "cnn": "cnn.com",
    "wired": "wired.com",
    "imdb": "imdb.com",
    "netflix": "netflix.com",
    "paypal": "paypal.com",
    "steam": "steampowered.com",
    "secondlife": "secondlife.com",
    "firefox": "mozilla.org",
    "mozilla": "mozilla.org",
    "microsoft": "microsoft.com",
    "apple": "apple.com",
    "orkut": "orkut.com",
    "friendster": "friendster.com",
    "livejournal": "livejournal.com",
    "piczo": "piczo.com",
    "tagged": "tagged.com",
    "gaia": "gaiaonline.com",
    "yelp": "yelp.com",
    "basecamp": "basecamphq.com",
    "odeo": "odeo.com",
    "tinypic": "tinypic.com",
    "wow": "worldofwarcraft.com",
    "worldofwarcraft": "worldofwarcraft.com",
    "xbox360": "xbox.com",
    "utorrent": "utorrent.com",
    "adsense": "google.com/adsense",
    "ajax": "adaptivepath.com",
    "web20conference": "web2con.com",
    "googlenews": "news.google.com",
    "mapquest": "mapquest.com",
    "weather": "weather.com",
    "gamespot": "gamespot.com",
    "mtv": "mtv.com",
    "icq": "icq.com",
    "geocities": "geocities.com",
    "altavista": "altavista.com",
    "askjeeves": "ask.com",
    "hotbot": "hotbot.com",
    "infoseek": "infoseek.com",
    "excite": "excite.com",
    "netscape": "netscape.com",
    "dmoz": "dmoz.org",
    "wayback": "archive.org",
    "encarta": "encarta.msn.com",
}

WIKI_CATS = [
    "Category:Websites_established_in_2005",
    "Category:Internet_properties_established_in_2005",
    "Category:Online_companies_established_in_2005",
    "Category:Software_companies_established_in_2005",
    "Category:2005_software",
    "Category:2005_in_the_Internet",
    "Category:2005_in_computing",
    "Category:2005_mergers_and_acquisitions",
    "Category:Video_hosting_services",
    "Category:Social_networking_services",
    "Category:Web_2.0",
]

WIKI_PAGES = [
    "2005_in_the_Internet",
    "2005_in_science",
    "Timeline_of_social_media",
    "Timeline_of_web_search_engines",
    "Timeline_of_YouTube",
    "YouTube",
    "Me_at_the_zoo",
    "Google_Maps",
    "Ajax_(programming)",
    "Reddit",
    "Digg",
    "Flickr",
    "Pandora_Radio",
    "HousingMaps",
    "TechCrunch",
    "MySpace",
    "Facebook",
    "iTunes",
    "Podcast",
    "Google_Earth",
    "Google_Video",
    "Google_Reader",
    "Google_Analytics",
    "Club_Penguin",
    "The_Million_Dollar_Homepage",
    "Delicious_(website)",
    "Bloglines",
    "FeedBurner",
    "Kayak_(company)",
    "Last.fm",
    "Mashable",
    "ProgrammableWeb",
    "DailyMotion",
    "Vimeo",
    "Web_2.0",
    "Internet_Explorer_6",
    "Firefox",
    "Yahoo!",
    "Skype",
    "News_Corporation",
    "Web_2.0_Conference",
    "Internet_Live_Stats",
    "Netcraft",
    "List_of_virtual_communities_with_more_than_1_million_users",
    "List_of_social_networking_websites",
    "History_of_YouTube",
    "History_of_Google",
    "History_of_the_Internet",
    "Web_design",
]


def norm(u: str) -> str:
    u = u.rstrip(").,;]}>'\"\\")
    u = u.split("#")[0]
    return u.strip()


def fetch(url: str, timeout: int = 40) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def wiki_api(params: dict) -> dict:
    params = dict(params)
    params.setdefault("format", "json")
    url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params)
    return json.loads(fetch(url).decode("utf-8", "replace"))


def category_members(title: str) -> list[str]:
    out = []
    cmcontinue = None
    while True:
        p = {
            "action": "query",
            "list": "categorymembers",
            "cmtitle": title,
            "cmlimit": "500",
            "cmtype": "page",
        }
        if cmcontinue:
            p["cmcontinue"] = cmcontinue
        try:
            data = wiki_api(p)
        except Exception as e:
            print("CAT FAIL", title, e)
            break
        for m in data.get("query", {}).get("categorymembers", []):
            t = m.get("title") or ""
            if t and not t.startswith("Category:"):
                out.append(t)
        cmcontinue = data.get("continue", {}).get("cmcontinue")
        if not cmcontinue:
            break
        time.sleep(0.15)
    return out


def page_extlinks(titles: list[str]) -> list[tuple[str, str]]:
    rows = []
    for i in range(0, len(titles), 10):
        batch = titles[i : i + 10]
        p = {
            "action": "query",
            "prop": "extlinks",
            "ellimit": "500",
            "titles": "|".join(batch),
            "redirects": "1",
        }
        elcontinue = None
        while True:
            q = dict(p)
            if elcontinue:
                q["elcontinue"] = elcontinue
            try:
                data = wiki_api(q)
            except Exception as e:
                print("EXT FAIL", batch[:2], e)
                break
            pages = data.get("query", {}).get("pages", {})
            for pg in pages.values():
                title = pg.get("title") or ""
                for el in pg.get("extlinks", []) or []:
                    u = el.get("*") if isinstance(el, dict) else None
                    if not u and isinstance(el, dict):
                        u = el.get("url")
                    if isinstance(el, str):
                        u = el
                    if u:
                        rows.append((title, norm(u)))
            elcontinue = data.get("continue", {}).get("elcontinue")
            if not elcontinue:
                break
            time.sleep(0.12)
        time.sleep(0.12)
    return rows


def cdx(domain: str, limit: int = 120) -> list[str]:
    q = {
        "url": domain,
        "matchType": "domain",
        "from": "20050101",
        "to": "20051231",
        "output": "json",
        "fl": "original",
        "collapse": "urlkey",
        "filter": "statuscode:200",
        "limit": str(limit),
    }
    url = "https://web.archive.org/cdx/search/cdx?" + urllib.parse.urlencode(q)
    try:
        raw = fetch(url, timeout=50)
    except Exception as e:
        print("CDX FAIL", domain, e)
        return []
    try:
        data = json.loads(raw.decode("utf-8", "replace"))
    except Exception:
        return []
    out = []
    for row in data[1:] if data and isinstance(data, list) else []:
        if isinstance(row, list) and row:
            out.append(norm(row[0]))
        elif isinstance(row, str):
            out.append(norm(row))
    return out


def extract_md_urls() -> set[str]:
    urls = set()
    globs = [
        "docs/*2005*",
        "docs/1999-2005*",
        "docs/2005-2010*",
        "docs/references/2005/**/*",
        "docs/EVERY-YEAR-IMPROVE-DEEP-RESEARCH-WEB-HARVEST-2026-08-19.md",
        "docs/MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md",
        "docs/FLOWS-LINKS-UX-DEEP-RESEARCH-WEB-HARVEST-2026-08-15.md",
        "docs/DISK-TRUTH.md",
        "docs/5X-FLOWS-LINKS-EVERY-ON-DISK-YEAR-1994-2014.md",
        "docs/YEAR-FASCINATING-INTEGRATE-GOALS-PHASES-MINUTE-E2E.md",
    ]
    files = []
    for g in globs:
        files.extend(ROOT.glob(g))
    # famous-3x dest notes
    files.extend((ROOT / "docs/1999-2005-famous-3x-every-dest").glob("*.md"))
    for p in files:
        if not p.is_file():
            continue
        try:
            t = p.read_text(errors="ignore")
        except Exception:
            continue
        for m in URL_RE.findall(t):
            urls.add(norm(m))
    return urls


def extract_5x_2005() -> set[str]:
    urls = set()
    p = ROOT / "docs/references/5x-improve-corpus-1994-2013-urls.txt"
    if not p.exists():
        return urls
    for ln in p.read_text(errors="ignore").splitlines():
        if "2005" not in ln:
            continue
        for m in URL_RE.findall(ln):
            urls.add(norm(m))
        if ln.startswith("http"):
            urls.add(norm(ln.strip()))
    return urls


def extract_wiki_tsv() -> set[str]:
    urls = set()
    p = ROOT / "docs/references/harvest-10k/wikipedia-internet-properties-1994-2020.tsv"
    if p.exists():
        for ln in p.read_text(errors="ignore").splitlines():
            if ln.startswith("2005\t"):
                name = ln.split("\t", 1)[1].strip()
                slug = urllib.parse.quote(name.replace(" ", "_"))
                urls.add("https://en.wikipedia.org/wiki/" + slug)
    titles = ROOT / "docs/references/2005/harvest/WIKIPEDIA-2005-TITLES.txt"
    if titles.exists():
        for ln in titles.read_text(errors="ignore").splitlines():
            name = ln.strip()
            if name and not name.startswith("#"):
                slug = urllib.parse.quote(name.replace(" ", "_"))
                urls.add("https://en.wikipedia.org/wiki/" + slug)
    return urls


def existing_corpus() -> set[str]:
    urls = set()
    p = OUT / "URL-CORPUS-2005.txt"
    if not p.exists():
        return urls
    for ln in p.read_text(errors="ignore").splitlines():
        if ln.startswith("http"):
            urls.add(norm(ln))
    return urls


def main() -> None:
    stacked: set[str] = set()
    sources = Counter()

    print("=== local MD URLs ===")
    md = extract_md_urls()
    stacked |= md
    sources["local_md"] = len(md)
    print(" local_md", len(md), "stacked", len(stacked))

    print("=== existing corpus ===")
    old = existing_corpus()
    stacked |= old
    sources["existing_corpus"] = len(old)
    print(" existing", len(old), "stacked", len(stacked))

    print("=== 5x corpus 2005 filter ===")
    five = extract_5x_2005()
    stacked |= five
    sources["five_x_2005"] = len(five)
    print(" 5x", len(five), "stacked", len(stacked))

    print("=== wiki 2005 titles ===")
    wiki_pages = extract_wiki_tsv()
    stacked |= wiki_pages
    sources["wiki_title_pages"] = len(wiki_pages)
    print(" wiki titles", len(wiki_pages), "stacked", len(stacked))

    print("=== wikipedia categories ===")
    titles = set(WIKI_PAGES)
    for cat in WIKI_CATS:
        members = category_members(cat)
        titles.update(members)
        print(" ", cat, len(members), "titles now", len(titles))
        time.sleep(0.2)
    (OUT / "wikipedia-2005-pages.tsv").write_text(
        "title\n" + "\n".join(sorted(titles)) + "\n"
    )
    sources["wiki_pages"] = len(titles)

    print("=== wikipedia extlinks ===")
    ext = page_extlinks(sorted(titles))
    ext_path = OUT / "wikipedia-2005-extlinks.tsv"
    with ext_path.open("w") as f:
        f.write("source_title\turl\n")
        for title, u in ext:
            f.write(f"{title}\t{u}\n")
            stacked.add(u)
    sources["wiki_extlinks"] = len({u for _, u in ext})
    print(" extlinks", sources["wiki_extlinks"], "stacked", len(stacked))

    print("=== wayback CDX 2005 ===")
    cdx_rows = []
    for dest, domain in sorted(DEST_DOMAINS.items()):
        rows = cdx(domain, limit=150)
        print("  CDX", dest, domain, len(rows))
        for u in rows:
            cdx_rows.append((dest, domain, u))
            stacked.add(u)
        time.sleep(0.25)
    with (OUT / "wayback-2005-cdx-originals.tsv").open("w") as f:
        f.write("dest\tdomain\toriginal\n")
        for dest, domain, u in cdx_rows:
            f.write(f"{dest}\t{domain}\t{u}\n")
    sources["cdx_rows"] = len(cdx_rows)
    sources["cdx_unique"] = len({u for *_, u in cdx_rows})
    print(" cdx unique", sources["cdx_unique"], "stacked", len(stacked))

    # primaries that must be present
    primaries = [
        "https://www.internetlivestats.com/total-number-of-websites/",
        "https://cybercultural.com/p/internet-2005/",
        "https://www.webdesignmuseum.org/gallery/year-2005",
        "https://googleblog.blogspot.com/2005/02/mapping-your-way.html",
        "https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/",
        "https://www.apple.com/newsroom/2005/06/30iTunes-Podcast-Subscriptions-Top-One-Million-in-First-Two-Days/",
        "https://blog.flickr.net/en/2005/03/20/yahoo-actually-does-acquire-flickr/",
        "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/",
        "http://news.netcraft.com/archives/2005/06/01/june_2005_web_server_survey.html",
        "http://news.netcraft.com/archives/2005/12/02/december_2005_web_server_survey.html",
        "https://www.google.com/press/zeitgeist2005.html",
        "http://googlepress.blogspot.com/2005/06/google-maps-api_29.html",
        "https://blog.youtube/news-and-events/youtube-receives-35m-in-funding-from/",
        "https://en.wikipedia.org/wiki/Me_at_the_zoo",
        "https://en.wikipedia.org/wiki/2005_in_the_Internet",
    ]
    stacked.update(primaries)
    sources["primaries"] = len(primaries)

    urls = sorted(u for u in stacked if u.startswith("http"))
    corpus = OUT / "URL-CORPUS-2005.txt"
    header = (
        "# 2005 URL corpus — research bibliography, not dests\n"
        "# Date: 2026-09-10 restack\n"
        "# Honesty: local 2005 MDs + prior corpus + 5x-2005 filter + Wikipedia 2005 pages/extlinks + Wayback CDX 2005.\n"
        "# Not dest folders. Not 4,000 opened pages.\n"
        f"# Unique URLs: {len(urls)}\n"
    )
    corpus.write_text(header + "\n".join(urls) + "\n")

    summary = {
        "date": "2026-09-10",
        "note": "Stacked research corpus. Not rooms. Not 5k live GETs.",
        "sources": dict(sources),
        "unique_urls": len(urls),
        "target_2011": 10320,
        "new_vs_old_corpus": len(set(urls) - old),
    }
    (OUT / "corpus-2005-summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print("=== DONE ===")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
