#!/usr/bin/env python3
"""Harvest a 2013 research corpus: Wikipedia categories + extlinks + docs URLs + bounded CDX.

Stacked unique URLs are the museum 5k/10k method — not 5k rooms.
Clone of harvest-2012-corpus.py with 2013 categories / seeds / CDX window.
"""
from __future__ import annotations

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "references" / "2013"
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "notes").mkdir(exist_ok=True)

UA = "InternetThroughTimeMuseum/2013-research (educational; local static reconstruction)"
API = "https://en.wikipedia.org/w/api.php"
CDX = "https://web.archive.org/cdx/search/cdx"

CATS = [
    "Category:Internet properties established in 2013",
    "Category:Software companies established in 2013",
    "Category:Websites established in 2013",
    "Category:2013 software",
    "Category:2013 in the Internet",
    "Category:Mobile software",
    "Category:Social networking services",
    "Category:Video on demand services",
    "Category:Cloud computing providers",
    "Category:Online music stores",
    "Category:IOS software",
    "Category:Android (operating system) software",
    "Category:Companies that became defunct in 2013",
    "Category:2013 mergers and acquisitions",
    "Category:Online companies established in 2012",
    "Category:Internet properties established in 2012",
    "Category:Internet properties established in 2011",
    "Category:2013 in science",
    "Category:2013 in politics",
    "Category:Initial public offerings in 2013",
    "Category:IOS 7",
    "Category:Windows 8.1",
    "Category:Video hosting services",
    "Category:Instant messaging clients",
    "Category:Mass surveillance",
    "Category:Cryptocurrencies",
    "Category:2013 video games",
    "Category:Smartphones introduced in 2013",
    "Category:Tablet computers introduced in 2013",
]

SEED_PAGES = [
    "2013",
    "2013 in science",
    "2013 in the United States",
    "2013 in the Internet",
    "Timeline of social media",
    "Vine (service)",
    "Instagram",
    "Snapchat",
    "Stories (social media)",
    "IOS 7",
    "IPhone 5s",
    "IPhone 5c",
    "Touch ID",
    "IPad Air (1st generation)",
    "IPad Mini 2",
    "Windows 8.1",
    "Internet Explorer 11",
    "Google Chrome",
    "Edward Snowden",
    "Global surveillance disclosures (2013–present)",
    "PRISM (surveillance program)",
    "HealthCare.gov",
    "Patient Protection and Affordable Care Act",
    "PlayStation 4",
    "Xbox One",
    "Facebook Home",
    "Telegram (software)",
    "Medium (website)",
    "Tumblr",
    "Yahoo!",
    "Bitcoin",
    "Silk Road (marketplace)",
    "Google Keep",
    "Tinder (app)",
    "Twitter",
    "Facebook",
    "WhatsApp",
    "Spotify",
    "Netflix",
    "House of Cards (American TV series)",
    "YouTube",
    "Google",
    "Reddit",
    "Pinterest",
    "Uber",
    "Uber (company)",
    "Flappy Bird",
    "Harlem Shake (meme)",
    "Boston Marathon bombing",
    "Pope Francis",
    "2013 papal conclave",
    "Nelson Mandela",
    "Internet Live Stats",
    "Total number of websites",
    "Pingdom",
    "StatCounter",
    "Safari (web browser)",
    "Firefox",
    "Apple Inc.",
    "Microsoft",
    "BlackBerry 10",
    "BlackBerry Z10",
    "Nexus 5",
    "Android KitKat",
    "Mailbox (application)",
    "Dropbox (service)",
    "Slack (software)",
    "Rdio",
    "Pandora Radio",
    "SoundCloud",
    "LinkedIn",
    "Skype",
    "Gmail",
    "Outlook.com",
    "Google Glass",
    "Chromecast",
    "Amazon Kindle",
    "Kindle Fire HDX",
    "Surface (2013 tablet)",
    "Xbox Music",
    "Xbox Video",
    "Twitch (service)",
    "Justin.tv",
    "Hulu",
    "Kickstarter",
    "Airbnb",
    "Foursquare City Guide",
    "Yik Yak",
    "Secret (app)",
    "Whisper (app)",
    "Ask.fm",
    "Vine",
    "Twitter Video",
    "Instagram video",
    "Facebook Graph Search",
    "Facebook Home",
    "Paper (Facebook)",
    "Internet Explorer 10",
    "Windows 7",
    "Windows 8",
    "Windows Phone 8",
    "Samsung Galaxy S4",
    "Mac Pro",
    "MacBook Pro",
    "Retina Display",
    "Lightning (connector)",
    "Apple Maps",
    "Siri",
    "ICloud",
    "IPhone 5",
    "IPhone 4S",
    "Healthcare.gov",
    "Obamacare",
    "Edward Joseph Snowden",
    "Glenn Greenwald",
    "Laura Poitras",
    "The Guardian",
    "The Washington Post",
    "XKeyscore",
    "Boundless Informant",
    "NSA warrantless surveillance (2001–2007)",
    "Bitcoin protocol",
    "Mt. Gox",
    "Ross Ulbricht",
    "Dark web",
    "Tor (network)",
    "Lavabit",
    "Silent Circle",
    "Silent Circle (company)",
    "CryptoCat",
    "WhatsApp encryption",
    "Yahoo Tumblr acquisition",
    "Marissa Mayer",
    "David Karp",
    "Evan Spiegel",
    "Bobby Murphy",
    "Kevin Systrom",
    "Mike Krieger",
    "Dom Hofmann",
    "Rus Yusupov",
    "Colin Kroll",
    "Jack Dorsey",
    "Mark Zuckerberg",
    "Sheryl Sandberg",
    "Tim Cook",
    "Jony Ive",
    "Satya Nadella",
    "Steve Ballmer",
    "Pew Research Center",
    "Internet Live Stats",
    "Netcraft",
]

CDX_HOSTS = [
    "vine.co",
    "www.vine.co",
    "blog.vine.co",
    "instagram.com",
    "blog.instagram.com",
    "www.snapchat.com",
    "blog.snapchat.com",
    "www.apple.com/iphone/",
    "www.apple.com/ios/",
    "www.apple.com/ipad/",
    "www.apple.com/pr/",
    "windows.microsoft.com",
    "www.microsoft.com/en-us/windows/windows-8",
    "www.google.com/chrome",
    "www.theguardian.com",
    "www.washingtonpost.com",
    "www.healthcare.gov",
    "www.facebook.com",
    "newsroom.fb.com",
    "telegram.org",
    "medium.com",
    "www.tumblr.com",
    "www.yahoo.com",
    "twitter.com",
    "www.tinder.com",
    "gotinder.com",
    "www.playstation.com",
    "www.xbox.com",
    "keep.google.com",
    "www.whatsapp.com",
    "www.spotify.com",
    "www.netflix.com",
    "www.reddit.com",
    "www.uber.com",
    "www.theverge.com",
    "techcrunch.com",
    "www.wired.com",
    "www.cnet.com",
    "www.pewresearch.org",
    "www.internetlivestats.com",
    "gs.statcounter.com",
    "www.bbc.com",
    "www.nytimes.com",
    "www.latimes.com",
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


def tsv_2013_titles() -> list[str]:
    tsv = ROOT / "docs" / "references" / "harvest-10k" / "wikipedia-internet-properties-1994-2020.tsv"
    names = []
    if not tsv.is_file():
        return names
    for line in tsv.read_text(errors="replace").splitlines()[1:]:
        if line.startswith("2013\t"):
            names.append(line.split("\t", 1)[1].strip())
    return names


def cdx_originals(host: str, limit: int = 80) -> list[str]:
    params = {
        "url": host if host.endswith("*") or "/" in host[8:] else host + "/*",
        "from": "20130101",
        "to": "20131231",
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
    titles.extend(tsv_2013_titles())
    seen = set()
    uniq_titles = []
    for t in titles:
        if t and t not in seen and not t.startswith("Category:"):
            seen.add(t)
            uniq_titles.append(t)
    print("TITLES", len(uniq_titles))

    (OUT / "wikipedia-2013-established.tsv").write_text(
        "source\ttitle\n"
        + "\n".join(cat_rows)
        + "\n"
        + "\n".join(f"seed\t{t}" for t in SEED_PAGES)
        + "\n"
        + "\n".join(f"harvest-10k\t{t}" for t in tsv_2013_titles())
        + "\n",
        encoding="utf-8",
    )
    (OUT / "wikipedia-2013-pages.tsv").write_text(
        "title\n" + "\n".join(uniq_titles) + "\n", encoding="utf-8"
    )

    print("EXTLINKS…")
    ext = extlinks_for(uniq_titles)
    print("EXT ROWS", len(ext))
    (OUT / "wikipedia-2013-extlinks.tsv").write_text(
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
    (OUT / "wayback-2013-cdx-originals.tsv").write_text(
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
    (OUT / "corpus-2013-unique-urls.txt").write_text("\n".join(uniq) + "\n", encoding="utf-8")

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
    (OUT / "corpus-2013-summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print("SUMMARY", json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
