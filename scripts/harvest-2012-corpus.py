#!/usr/bin/env python3
"""Harvest a 2012 research corpus: Wikipedia categories + extlinks + docs URLs + bounded CDX.

Stacked unique URLs are the museum 5k/10k method — not 5k rooms.
"""
from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "references" / "2012"
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "notes").mkdir(exist_ok=True)

UA = "InternetThroughTimeMuseum/2012-research (educational; local static reconstruction)"
API = "https://en.wikipedia.org/w/api.php"
CDX = "https://web.archive.org/cdx/search/cdx"

CATS = [
    "Category:Internet properties established in 2012",
    "Category:Software companies established in 2012",
    "Category:Websites established in 2012",
    "Category:2012 software",
    "Category:2012 in the Internet",
    "Category:Mobile software",
    "Category:Social networking services",
    "Category:Video on demand services",
    "Category:Cloud computing providers",
    "Category:Online music stores",
    "Category:IOS software",
    "Category:Android (operating system) software",
    "Category:Companies that became defunct in 2012",
    "Category:2012 mergers and acquisitions",
    "Category:Online companies established in 2011",
    "Category:Internet properties established in 2011",
    "Category:Internet properties established in 2010",
    "Category:2012 in science",
    "Category:2012 in politics",
    "Category:Initial public offerings in 2012",
    "Category:Android Jelly Bean",
    "Category:Windows 8",
]

SEED_PAGES = [
    "2012",
    "2012 in science",
    "2012 in the United States",
    "2012 in the Internet",
    "Timeline of social media",
    "Instagram",
    "Facebook",
    "Facebook, Inc.",
    "Initial public offering of Facebook",
    "Google Drive",
    "Google Now",
    "Jelly Bean (operating system)",
    "Android Jelly Bean",
    "IPhone 5",
    "IOS 6",
    "Lightning (connector)",
    "Apple Maps",
    "IPad (3rd generation)",
    "IPad (4th generation)",
    "IPad Mini",
    "Windows 8",
    "Internet Explorer 10",
    "Microsoft Surface",
    "Surface (2012 tablet)",
    "Nexus 7 (2012)",
    "Kindle Fire HD",
    "Draw Something",
    "OMGPop",
    "Tinder (app)",
    "Uber",
    "Uber (company)",
    "Gangnam Style",
    "Psy",
    "SOPA",
    "Stop Online Piracy Act",
    "PROTECT IP Act",
    "Wikipedia blackout",
    "Pinterest",
    "Snapchat",
    "Twitter",
    "YouTube",
    "Google+",
    "Spotify",
    "Netflix",
    "WhatsApp",
    "Dropbox (service)",
    "Tumblr",
    "LinkedIn",
    "Reddit",
    "Vine (service)",
    "Flappy Bird",
    "Curiosity (rover)",
    "Mars Science Laboratory",
    "Higgs boson",
    "Sandy Hook Elementary School shooting",
    "Hurricane Sandy",
    "2012 United States presidential election",
    "Arab Spring",
    "Pingdom",
    "Internet Live Stats",
    "Total number of websites",
    "Google Chrome",
    "Safari (web browser)",
    "Firefox",
    "Apple Inc.",
    "Microsoft",
    "Zynga",
    "FarmVille",
    "Angry Birds",
    "Minecraft",
    "Twitch (service)",
    "Justin.tv",
    "Hulu",
    "Pandora Radio",
    "SoundCloud",
    "Flickr",
    "Imgur",
    "Quora",
    "Airbnb",
    "Groupon",
    "Kickstarter",
    "Foursquare City Guide",
    "Skype",
    "Yahoo!",
    "AOL",
    "Bing (search engine)",
    "Ask.com",
    "Internet Explorer 9",
    "Windows 7",
    "Windows Phone 8",
    "Nexus 4",
    "Galaxy S III",
    "Samsung Galaxy S III",
    "Retina Display",
    "MacBook Pro",
    "Retina MacBook Pro",
    "The Avengers (2012 film)",
    "The Dark Knight Rises",
    "Fifty Shades of Grey",
    "Kony 2012",
    "Invisible Children",
    "Megaupload",
    "Kim Dotcom",
    "ACTA",
    "CISPA",
    "Open Graph protocol",
    "Timeline (Facebook)",
    "Siri",
    "ICloud",
    "IPhone 4S",
    "IPad 2",
]

CDX_HOSTS = [
    "instagram.com",
    "blog.instagram.com",
    "www.facebook.com",
    "newsroom.fb.com",
    "investor.fb.com",
    "drive.google.com",
    "www.google.com/drive/",
    "www.google.com/now/",
    "www.android.com",
    "www.apple.com/iphone/",
    "www.apple.com/ipad/",
    "www.apple.com/ios/",
    "maps.apple.com",
    "windows.microsoft.com",
    "www.microsoft.com/surface/",
    "www.microsoft.com/en-us/windows/internet-explorer",
    "www.amazon.com/kindle-fire",
    "omgpop.com",
    "drawsomething.omgpop.com",
    "gotinder.com",
    "www.uber.com",
    "www.youtube.com",
    "www.wikipedia.org",
    "en.wikipedia.org",
    "pinterest.com",
    "www.snapchat.com",
    "twitter.com",
    "plus.google.com",
    "www.spotify.com",
    "www.netflix.com",
    "www.whatsapp.com",
    "www.dropbox.com",
    "www.tumblr.com",
    "www.linkedin.com",
    "www.reddit.com",
    "www.twitch.tv",
    "soundcloud.com",
    "www.theverge.com",
    "techcrunch.com",
    "www.wired.com",
    "www.cnet.com",
    "googleblog.blogspot.com",
    "www.pingdom.com",
    "www.apple.com/pr/",
    "developer.apple.com",
    "www.whitehouse.gov",
    "sopastrike.com",
]


def fetch(url: str, timeout: int = 25) -> str:
    last = None
    for attempt in range(6):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read().decode("utf-8", "replace")
        except Exception as e:
            last = e
            msg = str(e)
            if "429" in msg or "503" in msg:
                time.sleep(2.5 * (attempt + 1))
                continue
            raise
    raise last  # type: ignore[misc]


def wiki(params: dict) -> dict:
    params = dict(params)
    params.setdefault("format", "json")
    params.setdefault("formatversion", "2")
    q = urllib.parse.urlencode(params)
    raw = fetch(API + "?" + q)
    return json.loads(raw)


def category_members(title: str, limit_pages: int = 800) -> list[str]:
    out: list[str] = []
    cont = None
    while len(out) < limit_pages:
        p = {
            "action": "query",
            "list": "categorymembers",
            "cmtitle": title,
            "cmlimit": "500",
            "cmtype": "page|subcat",
        }
        if cont:
            p["cmcontinue"] = cont
        try:
            data = wiki(p)
        except Exception as e:
            print("CAT FAIL", title, e)
            break
        for row in data.get("query", {}).get("categorymembers", []):
            out.append(row.get("title") or "")
        cont = (data.get("continue") or {}).get("cmcontinue")
        if not cont:
            break
        time.sleep(0.35)
    return [t for t in out if t]


def extlinks_for(titles: list[str]) -> list[tuple[str, str]]:
    rows: list[tuple[str, str]] = []
    for i in range(0, len(titles), 15):
        chunk = [t for t in titles[i : i + 15] if t]
        if not chunk:
            continue
        try:
            data = wiki(
                {
                    "action": "query",
                    "prop": "extlinks",
                    "titles": "|".join(chunk),
                    "ellimit": "500",
                }
            )
        except Exception as e:
            print("EXT FAIL", chunk[:2], e)
            time.sleep(0.4)
            continue
        for page in data.get("query", {}).get("pages", []):
            title = page.get("title") or ""
            for el in page.get("extlinks") or []:
                url = el if isinstance(el, str) else (el.get("*") or el.get("url") or "")
                if url.startswith("//"):
                    url = "https:" + url
                if url.startswith("http"):
                    rows.append((title, url))
        time.sleep(0.45)
    return rows


def docs_urls() -> list[str]:
    found: list[str] = []
    rx = re.compile(r"https?://[^\s\)\]\>\"']+")
    for p in (ROOT / "docs").rglob("*"):
        if not p.is_file():
            continue
        if p.suffix.lower() not in {".md", ".txt", ".tsv", ".json", ".html"}:
            continue
        try:
            text = p.read_text(errors="replace")
        except Exception:
            continue
        found.extend(rx.findall(text))
    return found


def tsv_2012_titles() -> list[str]:
    tsv = ROOT / "docs" / "references" / "harvest-10k" / "wikipedia-internet-properties-1994-2020.tsv"
    names = []
    if not tsv.is_file():
        return names
    for line in tsv.read_text(errors="replace").splitlines()[1:]:
        if line.startswith("2012\t"):
            names.append(line.split("\t", 1)[1].strip())
    return names


def cdx_originals(host: str, limit: int = 80) -> list[str]:
    params = {
        "url": host if host.endswith("*") or "/" in host[8:] else host + "/*",
        "from": "20120101",
        "to": "20121231",
        "output": "json",
        "fl": "original",
        "filter": "statuscode:200",
        "limit": str(limit),
        "collapse": "urlkey",
    }
    url = CDX + "?" + urllib.parse.urlencode(params)
    try:
        raw = fetch(url, timeout=18)
    except Exception as e:
        print("CDX FAIL", host, type(e).__name__)
        return []
    try:
        data = json.loads(raw)
    except Exception:
        return [ln.strip() for ln in raw.splitlines() if ln.startswith("http")]
    out = []
    for row in data[1:] if data and isinstance(data[0], list) else data:
        if isinstance(row, list) and row:
            out.append(row[0])
        elif isinstance(row, str) and row.startswith("http"):
            out.append(row)
    return out


def main() -> None:
    titles: list[str] = []
    cat_rows: list[str] = []
    for cat in CATS:
        mem = category_members(cat)
        print(f"CAT {cat}: {len(mem)}")
        for t in mem:
            cat_rows.append(f"{cat}\t{t}")
            if not t.startswith("Category:"):
                titles.append(t)
        time.sleep(0.2)

    titles.extend(SEED_PAGES)
    titles.extend(tsv_2012_titles())
    seen = set()
    uniq_titles = []
    for t in titles:
        if t and t not in seen and not t.startswith("Category:"):
            seen.add(t)
            uniq_titles.append(t)
    print("TITLES", len(uniq_titles))

    (OUT / "wikipedia-2012-established.tsv").write_text(
        "source\ttitle\n"
        + "\n".join(cat_rows)
        + "\n"
        + "\n".join(f"seed\t{t}" for t in SEED_PAGES)
        + "\n"
        + "\n".join(f"harvest-10k\t{t}" for t in tsv_2012_titles())
        + "\n",
        encoding="utf-8",
    )
    (OUT / "wikipedia-2012-pages.tsv").write_text(
        "title\n" + "\n".join(uniq_titles) + "\n", encoding="utf-8"
    )

    print("EXTLINKS…")
    ext = extlinks_for(uniq_titles)
    print("EXT ROWS", len(ext))
    (OUT / "wikipedia-2012-extlinks.tsv").write_text(
        "title\turl\n" + "\n".join(f"{t}\t{u}" for t, u in ext) + "\n",
        encoding="utf-8",
    )

    print("DOCS URLS…")
    durls = docs_urls()
    print("DOCS RAW", len(durls))
    (OUT / "docs-urls-raw.tsv").write_text(
        "url\n" + "\n".join(durls) + "\n", encoding="utf-8"
    )

    print("CDX…")
    cdx_rows: list[tuple[str, str]] = []
    for host in CDX_HOSTS:
        origs = cdx_originals(host, 90)
        print(f"  CDX {host}: {len(origs)}")
        for o in origs:
            cdx_rows.append((host, o))
        time.sleep(0.25)
    (OUT / "wayback-2012-cdx-originals.tsv").write_text(
        "host\toriginal\n" + "\n".join(f"{h}\t{u}" for h, u in cdx_rows) + "\n",
        encoding="utf-8",
    )

    all_urls = []
    all_urls.extend(u for _, u in ext)
    all_urls.extend(durls)
    all_urls.extend(u for _, u in cdx_rows)
    all_urls.extend(
        f"https://en.wikipedia.org/wiki/{urllib.parse.quote(t.replace(' ', '_'))}"
        for t in uniq_titles
    )

    uniq = []
    seen_u = set()
    for u in all_urls:
        u = u.rstrip(").,;\"'")
        if u not in seen_u:
            seen_u.add(u)
            uniq.append(u)
    (OUT / "corpus-2012-unique-urls.txt").write_text("\n".join(uniq) + "\n", encoding="utf-8")

    summary = {
        "date": "2026-08-17",
        "categories": len(CATS),
        "category_rows": len(cat_rows),
        "unique_wiki_pages": len(uniq_titles),
        "extlink_rows": len(ext),
        "docs_url_raw": len(durls),
        "cdx_rows": len(cdx_rows),
        "unique_urls": len(uniq),
        "note": "Stacked research corpus. Not rooms. Not 5k live GETs.",
    }
    (OUT / "corpus-2012-summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print("SUMMARY", json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
