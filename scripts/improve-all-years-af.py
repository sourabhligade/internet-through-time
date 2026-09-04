#!/usr/bin/env python3
"""A–F improve pass for live years. No dest folders. No star moves. No push.

A  Wayback id_ favicon stills on official dests (lean years first). Keep [failed-final] on miss.
B  Period verbs on leftover plaques. data-lo-key unchanged.
C  Costume honesty notes only (2001–03 leftover-18, 2007 XP+IE6, 2015 Win7 residual).
D  Visible 3× row is painted in ui/year/start.js (ott-3x-YYYY-dp).
E  Famous + extra/more lobby links (2007/2009 stay lean — no extra/more files).
F  Official dest still-or-[failed-final] + Famous on year maps.

Wiped years 2018 / 2020–2025 are not touched.
"""
from __future__ import annotations

import json
import re
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIVE = [str(y) for y in range(1994, 2020) if y != 2018]
WIPED = {"2018", "2020", "2021", "2022", "2023", "2024", "2025"}
LEAN_STILL = ("2009", "2011", "2012", "2015", "2016", "2017", "2019")
UA = "InternetThroughTimeMuseum/improve-af (educational; static reconstruction)"
CDX = "https://web.archive.org/cdx/search/cdx"
CTX = ssl.create_default_context()

YEAR_DEFAULT = {
    "1994": "Query leftover",
    "1995": "Browse leftover",
    "1996": "Browse leftover",
    "1997": "Open leftover",
    "1998": "Query leftover",
    "1999": "Sign-on leftover",
    "2000": "Smile leftover",
    "2001": "Edit leftover",
    "2002": "Stumble leftover",
    "2003": "Upload leftover",
    "2004": "Browse leftover",
    "2005": "Maps leftover",
    "2006": "Feed leftover",
    "2007": "Safari leftover",
    "2008": "Chrome leftover",
    "2009": "Like leftover",
    "2010": "Filter leftover",
    "2011": "Circle leftover",
    "2012": "Pin leftover",
    "2013": "Hold leftover",
    "2014": "Install leftover",
    "2015": "Go-LIVE leftover",
    "2016": "Story leftover",
    "2017": "Unlock leftover",
    "2019": "Continue leftover",
}

YEAR_TRAP = {
    "1994": "Search-as-gold (trap)",
    "1995": "SSL-checkout-as-this (trap)",
    "1996": "Portal-wars-as-this (trap)",
    "1997": "PointCast-as-gold (trap)",
    "1998": "Lucky-as-this (trap)",
    "1999": "AIM-as-gold (trap)",
    "2000": "MapQuest-as-gold (trap)",
    "2001": "Wikipedia-as-this (trap)",
    "2002": "Stumble-as-gold (trap)",
    "2003": "Photobucket-as-gold (trap)",
    "2004": "thefacebook-as-gold (trap)",
    "2005": "Upload-as-gold (trap)",
    "2006": "Twttr-as-gold (trap)",
    "2007": "Safari-Go-as-gold (trap)",
    "2008": "GitHub-issue-as-gold (trap)",
    "2009": "Like-as-gold (trap)",
    "2010": "IG-iOS-as-gold (trap)",
    "2011": "Hangout-as-gold (trap)",
    "2012": "IG-Android-as-gold (trap)",
    "2013": "Vine-6s-as-gold (trap)",
    "2014": "WhatsApp-Install-as-gold (trap)",
    "2015": "Periscope-LIVE-as-gold (trap)",
    "2016": "Stories-as-gold (trap)",
    "2017": "Face-ID-as-gold (trap)",
    "2019": "Disney-plus-as-gold (trap)",
}

SLUG_VERB = {
    "amazon": "Smile leftover",
    "yahoo": "Browse leftover",
    "altavista": "Query leftover",
    "lycos": "Catalog leftover",
    "hotbot": "Query leftover",
    "webcrawler": "Query leftover",
    "infoseek": "Query leftover",
    "google": "Query leftover",
    "googlenews": "Headline leftover",
    "ebay": "Bid leftover",
    "auctionweb": "Bid leftover",
    "hotmail": "Sign-up leftover",
    "napster": "Search leftover",
    "pets": "Crash leftover",
    "gmail": "Invite leftover",
    "flickr": "Upload leftover",
    "maps": "Maps leftover",
    "facebook": "Campus leftover",
    "youtube": "Watch leftover",
    "twitter": "140 leftover",
    "chrome": "Chrome leftover",
    "appstore": "App Store leftover",
    "android": "G1 leftover",
    "hulu": "Hulu leftover",
    "aim": "Sign-on leftover",
    "icq": "Sign-on leftover",
    "aliweb": "Submit leftover",
    "wwworm": "Query leftover",
    "well": "Login leftover",
    "iuma": "Listen leftover",
    "pizzahut": "Order leftover",
    "personal": "Guestbook leftover",
    "imdb": "Search leftover title",
    "cnn": "Open leftover headline",
    "bbc": "Open leftover headline",
    "nyt": "Open leftover headline",
    "cdnow": "Buy leftover CD",
    "webvan": "Crash leftover",
    "winamp": "Play leftover",
    "netflix": "Queue leftover",
    "myspace": "Open leftover profile",
    "wikipedia": "Edit leftover",
    "wiki": "Edit leftover",
    "digg": "Bury leftover",
    "reddit": "Vote leftover",
    "blogger": "Post leftover",
    "craigslist": "Browse leftover city",
    "paypal": "Pay leftover",
    "zombo": "Reload leftover",
    "geocities": "Homestead leftover",
    "spacejam": "Planet leftover",
    "pointcast": "Channel leftover",
    "playable": "Play leftover cabinet",
    "microsoft": "Open leftover product",
    "apple": "Open leftover product",
    "iphone": "Open leftover phone",
    "ipad": "Open leftover tablet",
    "itunes": "Buy leftover track",
    "whitehouse": "Open leftover tour",
    "nasa": "Open leftover gallery",
    "mtv": "Open leftover video",
    "gamespot": "Open leftover review",
    "netscape": "Download leftover",
    "friendster": "Add leftover friend",
    "movabletype": "Publish leftover",
    "firefox": "Download leftover",
    "dmoz": "Browse leftover",
    "technorati": "Query leftover blog",
    "linkedin": "Connect leftover",
    "wordpress": "Publish leftover",
    "tumblr": "Reblog leftover",
    "skype": "Call leftover",
    "kindle": "Download leftover book",
    "mozilla": "Download leftover",
    "steam": "Install leftover",
    "livejournal": "Update leftover",
    "msn": "Sign-on leftover",
    "askjeeves": "Ask leftover",
    "lastfm": "Scrobble leftover",
    "phoenix": "Download leftover",
    "kazaa": "Search leftover",
    "hotwired": "Read leftover",
    "youvegotmail": "Sign-on leftover",
    "netcenter": "Browse leftover",
    "y2k": "Tick leftover",
    "github": "Open leftover issue",
    "orkut": "Add leftover",
    "slashdot": "Comment leftover",
    "instagram": "Filter leftover",
    "spotify": "Play leftover",
    "pinterest": "Pin leftover",
    "snapchat": "Snap leftover",
    "discord": "Join leftover",
    "whatsapp": "Install leftover",
    "vine": "Hold leftover",
    "tiktok": "Scroll leftover",
    "periscope": "Go-LIVE leftover",
    "pokemongo": "Catch leftover",
    "fortnite": "Drop leftover",
    "disneyplus": "Continue leftover",
    "googleplus": "Hangout leftover",
    "googlephotos": "Dump leftover roll",
    "windows10": "Get leftover upgrade",
    "windows7": "Upgrade leftover",
    "windows8": "Start leftover",
    "windows81": "Start leftover",
    "applemusic": "Play leftover radio",
    "edge": "Open leftover Spartan",
    "letsencrypt": "Issue leftover cert",
    "musically": "Record leftover",
    "teams": "Join leftover",
    "switch": "Play leftover",
    "wannacry": "Note leftover worm",
    "equifax": "Freeze leftover",
    "arcade": "Play leftover",
    "appletv": "Continue leftover",
    "stadia": "Play leftover",
    "airpodspro": "Pair leftover",
    "qwikster": "Split leftover",
    "airbnb": "Book leftover",
    "medium": "Publish leftover",
    "path": "Add leftover",
    "flipboard": "Flip leftover",
    "bing": "Query leftover",
    "farmville": "Plant leftover",
    "foursquare": "Check-in leftover",
    "kickstarter": "Pledge leftover",
    "imgur": "Upload leftover",
    "photobucket": "Upload leftover",
    "stumbleupon": "Stumble leftover",
    "stumble": "Stumble leftover",
    "archive": "Browse leftover capture",
    "csotd": "Sign leftover guestbook",
    "cern": "Open leftover WWW",
    "ncsa": "Open leftover Mosaic",
    "mcom": "Download leftover",
    "fishcam": "Watch leftover cam",
    "lycos": "Catalog leftover",
    "hotbot": "Query leftover",
    "infoseek": "Query leftover",
    "imdb": "Search leftover title",
    "aol": "Sign-on leftover",
    "aolportal": "Browse leftover",
    "classmates": "Find leftover",
    "portals": "Walk leftover portal",
    "excite": "Query leftover",
    "pointcast": "Channel leftover",
    "mapquest": "Get leftover directions",
    "thefacebook": "Join leftover network",
    "tinypic": "Upload leftover",
    "piczo": "Layout leftover",
    "tagged": "Add leftover",
    "odeo": "Subscribe leftover",
    "omegle": "Chat leftover",
    "chatroulette": "Next leftover",
    "beacon": "Note leftover Beacon",
    "palmpre": "Open leftover Pre",
    "minecraft": "Place leftover block",
    "twitch": "Go leftover live",
    "slack": "Send leftover",
    "icebucket": "Pour leftover",
    "heartbleed": "Note leftover bleed",
    "material": "Open leftover paper",
    "snowden": "Ack leftover",
    "telegram": "Send leftover",
    "ios7": "Open leftover flat",
    "echo": "Ask leftover",
    "meerkat": "Go leftover live",
    "agario": "Split leftover",
    "amppage": "Open leftover AMP",
    "dropbox": "Sync leftover",
    "yahoo": "Browse leftover",
}

SLUG_YEAR_VERB = {
    ("2004", "facebook"): "Campus leftover",
    ("2005", "facebook"): "Open leftover profile",
    ("2006", "facebook"): "News Feed leftover",
    ("2008", "facebook"): "Open leftover feed",
    ("2009", "facebook"): "Like leftover path",
    ("2010", "facebook"): "Open Graph leftover",
    ("2011", "facebook"): "Timeline leftover",
    ("2012", "facebook"): "IPO leftover",
    ("2005", "android"): "Note leftover acquire",
    ("2008", "android"): "G1 leftover",
    ("2005", "youtube"): "Watch leftover",
    ("2006", "youtube"): "Watch leftover Google-owned",
    ("2006", "twitter"): "140 leftover Twttr",
    ("2016", "instagram"): "Story leftover",
    ("2012", "instagram"): "Android leftover filter",
    ("2010", "instagram"): "Filter leftover",
    ("2015", "apple"): "Watch leftover",
    ("2007", "iphone"): "Safari leftover",
    ("2009", "iphone"): "3GS leftover",
    ("2014", "whatsapp"): "Install leftover",
    ("2016", "whatsapp"): "E2E leftover",
}

NEIGHBORHOOD = {
    "computers", "entertainment", "art", "science", "recreation", "business",
    "society", "news", "reference", "government", "area51", "sunsetstrip",
}

SLUG_HOST = {
    "facebook": "www.facebook.com",
    "farmville": "www.farmville.com",
    "bing": "www.bing.com",
    "iphone": "www.apple.com",
    "appstore": "itunes.apple.com",
    "twitter": "twitter.com",
    "foursquare": "foursquare.com",
    "kickstarter": "www.kickstarter.com",
    "windows7": "www.microsoft.com",
    "windows10": "www.microsoft.com",
    "windows8": "www.microsoft.com",
    "windows81": "www.microsoft.com",
    "googleplus": "plus.google.com",
    "spotify": "www.spotify.com",
    "ipad": "www.apple.com",
    "airbnb": "www.airbnb.com",
    "instagram": "instagram.com",
    "qwikster": "www.netflix.com",
    "pinterest": "www.pinterest.com",
    "medium": "medium.com",
    "path": "path.com",
    "flipboard": "flipboard.com",
    "periscope": "www.periscope.tv",
    "googlephotos": "photos.google.com",
    "applemusic": "www.apple.com",
    "edge": "www.microsoft.com",
    "apple": "www.apple.com",
    "snapchat": "www.snapchat.com",
    "discord": "discordapp.com",
    "letsencrypt": "letsencrypt.org",
    "pokemongo": "www.pokemongo.com",
    "whatsapp": "www.whatsapp.com",
    "vine": "vine.co",
    "musically": "musical.ly",
    "fortnite": "www.epicgames.com",
    "teams": "teams.microsoft.com",
    "switch": "www.nintendo.com",
    "wannacry": "www.microsoft.com",
    "equifax": "www.equifax.com",
    "disneyplus": "www.disneyplus.com",
    "tiktok": "www.tiktok.com",
    "arcade": "www.apple.com",
    "appletv": "www.apple.com",
    "stadia": "stadia.google.com",
    "airpodspro": "www.apple.com",
    "chrome": "www.google.com",
    "youtube": "www.youtube.com",
    "gmail": "mail.google.com",
    "maps": "maps.google.com",
}

SAVE_RE = re.compile(
    r'(<button\b(?=[^>]*\bdata-lo-save\b)[^>]*>)(\s*Save leftover[^<]*)(</button>)',
    re.I,
)
TRAP_RE = re.compile(
    r'(<button\b(?=[^>]*\bdata-lo-trap\b)[^>]*>)'
    r'(\s*(?:This leftover is the (?:\d{4} )?star \(trap\)|'
    r"This leftover is the year star \(trap\)|Star trap)\s*)"
    r"(</button>)",
    re.I,
)
KEY_RE = re.compile(r'data-lo-key="([^"]*)"')
TRAIL_BLOCK = re.compile(
    r'"(\d{4})":\s*\[(.*?)\](?=\s*,\s*"\d{4}":|\s*\}\s*;)',
    re.S,
)
TRAIL_HREF = re.compile(
    r'\{\s*"n":\s*(\d+)\s*,\s*"name":\s*"(.*?)"\s*,\s*"href":\s*"(.*?)"',
    re.S,
)


def dest_slug(path: Path, year: str) -> str:
    parts = path.parts
    try:
        i = parts.index("sites")
        return parts[i + 1]
    except ValueError:
        return path.parent.name


def verb_for(year: str, slug: str) -> str:
    hit = SLUG_YEAR_VERB.get((year, slug))
    if hit:
        return hit
    key = slug.lower()
    if key in SLUG_VERB:
        return SLUG_VERB[key]
    if key in NEIGHBORHOOD or (slug[:1].isupper() and slug.isalpha()):
        return "Homestead leftover"
    return YEAR_DEFAULT.get(year, "Open leftover")


def rewrite_file(year: str, path: Path) -> bool:
    raw = path.read_text(encoding="utf-8")
    if "data-lo-save" not in raw and "data-lo-trap" not in raw:
        return False
    before = KEY_RE.findall(raw)
    slug = dest_slug(path, year)
    verb = verb_for(year, slug)
    trap = YEAR_TRAP.get(year, "Year-star (trap)")

    def save_sub(m: re.Match[str]) -> str:
        return m.group(1) + verb + m.group(3)

    def trap_sub(m: re.Match[str]) -> str:
        return m.group(1) + trap + m.group(3)

    t = SAVE_RE.sub(save_sub, raw)
    t = TRAP_RE.sub(trap_sub, t)
    if KEY_RE.findall(t) != before:
        raise RuntimeError(f"keys changed {path}")
    if t == raw:
        return False
    path.write_text(t, encoding="utf-8")
    return True


def pass_b() -> dict[str, int]:
    counts = {y: 0 for y in LIVE}
    for year in LIVE:
        year_root = ROOT / "years" / year
        if not year_root.is_dir():
            continue
        for path in year_root.rglob("*.html"):
            if rewrite_file(year, path):
                counts[year] += 1
    return counts


def official_dests(year: str) -> list[tuple[int, str, str]]:
    trails = ROOT / "js" / "config" / "flow-trails.js"
    text = trails.read_text(encoding="utf-8")
    out: list[tuple[int, str, str]] = []
    for ym, body in TRAIL_BLOCK.findall(text):
        if ym != year:
            continue
        for n, name, href in TRAIL_HREF.findall(body):
            nn = int(n)
            if nn < 1 or nn > 10:
                continue
            if "/playable/" in href:
                continue
            out.append((nn, name, href))
    return out


def fetch(url: str, timeout: float = 12.0) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            return r.read()
    except (urllib.error.URLError, TimeoutError, ssl.SSLError, ValueError):
        return None


def cdx_favicon(host: str, year: str) -> tuple[str, str] | None:
    orig = f"http://{host}/favicon.ico"
    q = (
        f"{CDX}?url={urllib.parse.quote(orig)}"
        f"&from={year}0101&to={year}1231&output=json"
        f"&fl=timestamp,original,mimetype,statuscode,length"
        f"&filter=statuscode:200&limit=5"
    )
    raw = fetch(q, timeout=15.0)
    if not raw:
        return None
    try:
        rows = json.loads(raw.decode("utf-8", "replace"))
    except json.JSONDecodeError:
        return None
    if not isinstance(rows, list) or len(rows) < 2:
        return None
    for row in rows[1:]:
        if not isinstance(row, list) or len(row) < 3:
            continue
        ts, original, mime = row[0], row[1], row[2]
        if "image" not in str(mime) and not str(original).lower().endswith((".ico", ".png", ".gif", ".jpg")):
            continue
        return str(ts), str(original)
    return None


def pass_a() -> list[str]:
    log: list[str] = []
    for year in LEAN_STILL:
        for n, name, href in official_dests(year):
            rel = href.split("?")[0]
            dest = ROOT / "years" / year / rel
            if not dest.is_file():
                log.append(f"{year} {rel} missing dest")
                continue
            slug = dest_slug(dest, year)
            host = SLUG_HOST.get(slug)
            if not host:
                log.append(f"{year} {slug} no host map · keep failed-final")
                continue
            still_dir = dest.parent / "stills"
            existing = list(still_dir.glob("wayback-*")) if still_dir.is_dir() else []
            html = dest.read_text(encoding="utf-8")
            if existing and "stills/wayback-" in html:
                log.append(f"{year} {slug} already harvested")
                continue
            hit = cdx_favicon(host, year)
            time.sleep(0.35)
            if not hit:
                if "[failed-final]" not in html:
                    html = stamp_failed(html, slug)
                    dest.write_text(html, encoding="utf-8")
                    log.append(f"{year} {slug} no CDX · stamped failed-final")
                else:
                    log.append(f"{year} {slug} no CDX · keep failed-final")
                continue
            ts, original = hit
            blob = fetch(f"https://web.archive.org/web/{ts}id_/{original}", timeout=18.0)
            time.sleep(0.25)
            if not blob or len(blob) < 32 or len(blob) > 250_000:
                log.append(f"{year} {slug} empty/huge id_ · keep failed-final")
                continue
            if blob[:3] in (b"<!", b"<h", b"<H", b"<!D") or blob[:5] == b"<?xml" and b"<html" in blob[:200].lower():
                log.append(f"{year} {slug} id_ was HTML · keep failed-final")
                continue
            ext = "ico"
            if blob[:8] == b"\x89PNG\r\n\x1a\n":
                ext = "png"
            elif blob[:3] == b"GIF":
                ext = "gif"
            elif blob[:2] == b"\xff\xd8":
                ext = "jpg"
            still_dir.mkdir(parents=True, exist_ok=True)
            fname = f"wayback-{year}.{ext}"
            (still_dir / fname).write_bytes(blob)
            cite = (
                f'<p class="archive-residual" data-itt-capture-cite>'
                f"Wayback {ts} · {original} · id_ bytes · not a reconstruction.</p>\n"
                f'<p><img src="stills/{fname}" alt="" width="16" height="16"></p>\n'
            )
            html = dest.read_text(encoding="utf-8")
            html = re.sub(
                r'<p class="itt-pixel-failed"[^>]*>\[failed-final\][^<]*</p>\n?',
                cite,
                html,
                count=1,
            )
            if "stills/" + fname not in html:
                html = html.replace("<h1>", cite + "<h1>", 1)
            dest.write_text(html, encoding="utf-8")
            log.append(f"{year} {slug} harvested {fname} ({len(blob)}b)")
    return log


def stamp_failed(html: str, slug: str) -> str:
    if "[failed-final]" in html:
        return html
    line = (
        f'<p class="itt-pixel-failed">[failed-final] {slug} period still · '
        f"no invented brand pixel</p>\n"
    )
    if "<h1>" in html:
        return html.replace("<h1>", line + "<h1>", 1)
    return html.replace("<body", line + "<body", 1)


def pass_f_failed() -> int:
    n = 0
    for year in LIVE:
        for _i, _name, href in official_dests(year):
            dest = ROOT / "years" / year / href.split("?")[0]
            if not dest.is_file():
                continue
            html = dest.read_text(encoding="utf-8")
            has_still = bool(re.search(r'src="[^"]*stills/', html))
            has_img = bool(re.search(r"<img\b", html, re.I))
            if "[failed-final]" in html or has_still or has_img:
                continue
            dest.write_text(stamp_failed(html, dest_slug(dest, year)), encoding="utf-8")
            n += 1
    return n


def pass_e_maps() -> list[str]:
    done = []
    for year in LIVE:
        path = ROOT / "years" / year / "pages" / "map.html"
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        if "famous.html" in text:
            continue
        line = (
            f'<p class="itt-map-playable" style="font-size:12px">'
            f'<a href="../sites/playable/famous.html"><b>Famous games</b></a>'
            f' · <a href="../sites/playable/game.html">Year cabinet</a></p>\n'
        )
        if "</body>" in text:
            text = text.replace("</body>", line + "</body>", 1)
        else:
            text += "\n" + line
        path.write_text(text, encoding="utf-8")
        done.append(year)
    return done


def pass_c_notes() -> None:
    """Costume honesty lives in years.js + start.js. Confirm dest freeze locally."""
    for year in ("2001", "2002", "2003"):
        sites = ROOT / "years" / year / "sites"
        if not sites.is_dir():
            continue
        names = sorted(p.name for p in sites.iterdir() if p.is_dir())
        # leftover-18 freeze: do not add dests. Just report.
        print(f"  C {year} dest folders {len(names)} (freeze — no add)")


def generic_left() -> int:
    n = 0
    for year in LIVE:
        for path in (ROOT / "years" / year).rglob("*.html"):
            t = path.read_text(encoding="utf-8", errors="ignore")
            n += len(SAVE_RE.findall(t))
    return n


def main() -> int:
    print("A–F improve · live", ",".join(LIVE))
    print("B leftover plaque verbs…")
    before = generic_left()
    counts = pass_b()
    after = generic_left()
    changed = sum(counts.values())
    print(f"  files rewritten {changed} · generic buttons {before} -> {after}")
    for y in LIVE:
        if counts[y]:
            print(f"  {y} {counts[y]}")
    print("C costume / leftover-18…")
    pass_c_notes()
    print("E Famous on maps…")
    maps = pass_e_maps()
    print("  maps stamped", ",".join(maps) or "none (already had Famous)")
    print("F official dest still-or-failed-final…")
    stamped = pass_f_failed()
    print(f"  stamped failed-final on {stamped} official dests")
    print("A Wayback id_ harvest (lean official dests)…")
    for line in pass_a():
        print(" ", line)
    print("done · D/E home chip + 3× row live in ui/year/start.js · no push")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
