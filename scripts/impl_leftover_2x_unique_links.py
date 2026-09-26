#!/usr/bin/env python3
"""Leftover-2× unique dest links.

2× unique dest slugs in leftover-2× rails. One dest once. Dests already on disk.
2000–2006 KEEP original unique dests. Strip duplicate hrefs. Official dest leftover-2×
first paint = 0. Do not dest-farm dest folders. Do not grow leftover-3× unique.
Do not write dest-true leftover dest I/O. 2009 boarded. 2023–2025 wiped.
Leftover-2× unique dest links stay dest-disjoint from leftover-3× unique dest links
(one dest once as a link). Cite: docs/LEFTOVER-2X-UNIQUE-LINKS.md ·
docs/DUPLICATE-UNIQUE-LINKS.md
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from itt_gate import SHIP_YEARS  # noqa: E402
from itt_leftover_dest import dest_label  # noqa: E402

HREF = re.compile(r"""href=["']([^"'#?]+)["']""", re.I)
SLUG = re.compile(r"(?:(?:\.\./)+|\.?/?sites/)([^/]+)/")
OFF_KEY = re.compile(r'data-official-key=')
BLOCK = re.compile(
    r"<!-- ITT-2X-(?:LINKS|TARGET):\d{4}:start -->[\s\S]*?<!-- ITT-2X-(?:LINKS|TARGET):\d{4}:end -->"
)
P_RAIL = re.compile(
    r"<p[^>]*(?:data-itt-2x-links|data-itt-2x-unique)[^>]*>[\s\S]*?</p>",
    re.I,
)
NAV_RAIL = re.compile(
    r"<nav[^>]*(?:data-itt-2x-links|data-itt-2x-unique)[^>]*>[\s\S]*?</nav>",
    re.I,
)

# Cited ADD dests (dests already on disk). Not alphabetical warehouse fill.
CITED_ADD: dict[str, list[str]] = {
    "1994": [
        "netscape", "cdnow", "snopes", "webring", "eworld", "sfgate", "simpsons",
        "fogcam", "dalnet", "powwow", "purple", "pseudo", "talkorigins",
        "nineplanets", "owl", "winfiles", "registercom", "lambiek", "nausicaa",
        "inducks", "gemm", "complaint", "uselesspages", "sentence", "ten", "vlib",
        "zonezero", "cashiers", "dickinson", "flyaow", "goantiques", "hobnob",
        "libru", "libero", "linhsinhsin", "phonelosers", "rsssf", "sweetwater",
        "wahm",
    ],
    "1995": [
        "excite", "msn", "ie", "javascript", "java", "php", "apache", "wikiwiki",
        "dogpile", "gamefaqs", "newgrounds", "broadcast", "boingboing", "firefly",
        "viaweb", "findlaw", "dictionary", "epicurious", "ivillage", "webshots",
        "opera", "apod", "careerbuilder", "angieslist", "anipike", "antiwar",
        "autoweb", "boston", "cbr", "cyberian", "edmunds", "findagrave", "hellcom",
        "hollywood", "icc", "ipl", "isfdb", "medscape", "mercury", "mirsky",
        "movieweb", "musicblvd", "nick", "planetout", "realtor", "sciencedaily",
        "sep", "vatican", "wunderground",
        "webex", "vrbo", "getty", "worlds", "telegarden", "iep", "datalounge",
        "wirtualna", "walla", "townhall", "versiontracker", "waiter", "starbright",
        "fics", "allaboutjazz", "asiaone", "charityvillage", "cruisecritic",
        "mythica", "zug", "adrenaline", "covers", "cyclingnews", "dermnet",
        "eighttrack", "folkden", "mudconnector", "outpostgallifrey", "raptureready",
        "rxlist", "shetland", "swissinfo", "technosphere", "terraquest", "wargamer",
        "wireplay", "yachtworld",
    ],
    "1996": [
        "flash", "css1", "internetexpo", "netday", "nn3", "ie3", "expedia",
        "gamespot", "gamespy", "ign", "juno", "mapquest", "webtv", "rocketmail",
        "thestreet", "travelocity", "webmd", "webvan", "yahoojapan", "yahookids",
        "yahoonews", "yahoohotjobs", "onion", "alexa", "aintitcool", "abebooks",
        "ancestry", "bolt", "athome", "downloadcom", "earthcam", "edgar", "elfwood",
        "experts", "gimps", "gurl", "peapod", "pubmed", "quackwatch", "rambler",
        "rediff", "seznam", "sohu", "starmedia", "theforce", "uol", "yellowpages",
    ],
    "1997": [
        "ie4", "communicator", "activedesktop", "netcaster", "backweb", "amazonipo",
        "sixdegrees", "fortunecity", "etoys", "yahoomail", "yahoofinance",
        "yahoosports",
    ],
    "1998": ["americangreetings"],
    "1999": [
        "lycos", "go", "bbc", "infospace", "bluemountain", "realplayer", "tripod",
        "passport", "looksmart", "snap", "xoom", "goto", "juno", "weather", "attnet",
        "mtv", "fortunecity", "citysearch", "sportsline", "earthlink", "barnes",
        "womencom", "ivillage", "foxnews", "macromedia", "cdnow", "mindspring", "sony",
        "snowball", "idg", "mypoints", "travelocity", "mcafee", "mapquest", "msnbc",
        "pathfinder", "digitalcity", "expedia", "broadcastcom", "warnerbros", "go2net",
        "exciteathome", "nbci",
        "craigslist", "cyworld", "diaryland", "digitalspy", "disney", "drudge",
        "drugstore", "dslreports", "ehow", "epinions", "espn", "etoys", "eurogamer",
        "everquest", "ezboard", "fark", "fatwallet", "flooz", "freeserve", "freshdirect",
        "gamefaqs", "gamerankings", "garageband", "h2g2", "halfcom", "hushmail", "ie5",
        "imode", "surveymonkey", "seamless", "overstock", "ofoto", "jibjab", "fastmail",
        "slickdeals", "trademe", "ctrip", "dangdang", "dcinside", "fc2", "kaskus",
        "tianya", "eksisozluk", "indexhu", "nunl", "malaysiakini", "bungie", "neogaf",
        "dvdtalk", "adventuregamers", "ocremix", "advogato", "postini", "singingfish",
        "icravetv", "pitas", "thirdvoice", "webshots", "cluetrain", "healthline",
        "speechbot", "internet2", "asheron", "quake3", "unreal", "aoe2", "dreamcast",
        "counterstrike", "healtheon",
    ],
    "2000": [
        "lycos", "passport", "nbci", "bluemountain", "tripod", "iwon", "iwin",
        "looksmart", "weather", "real", "go", "mypoints", "halfcom", "homestead",
        "goto", "msnbc", "jobsonline", "freelotto", "bizrate", "infospace",
        "coolsavings", "windows2000", "macosx", "itools", "g4cube", "pocketpc",
        "openoffice", "spybot", "nokia3310", "photoshop6", "directx8", "pentium4",
        "usbflash", "deusex", "viral405", "usagov", "coppa", "verizon", "verisign",
        "egghead", "nasdaq", "xhtml", "blogspot", "caramail", "audiogalaxy",
        "valueamerica",
    ],
    "2001": [
        "googleimages", "macosx", "officexp", "sharepoint", "windowsmessenger", "idvd",
        "vlc", "teamspeak", "filezilla", "apache2", "justeat", "opodo", "confused",
        "chessgames", "myopera", "ratemyteachers", "yahoomusic", "gigwise", "gridorg",
        "meetic", "mousebreaker", "mydd", "oldversion", "postopia", "profootballtalk",
        "freedb",
    ],
    "2002": [
        "xboxlive", "creativecommons", "openoffice", "picasa", "flashmx", "emule",
        "tor", "gametrailers", "afterellen", "stereogum", "metrolyrics", "scotusblog",
        "realultimatepower", "savekaryn", "skyrock", "qidian", "iwiw", "filmaffinity",
        "smashboards",
    ],
    "2003": [
        "xing", "tribe", "shutterstock", "alipay", "readwriteweb", "blogforamerica",
        "weblogsinc", "osshakespeare", "quickflix", "terranova", "azureus", "fedora",
        "thunderbird", "mozillafoundation", "ituneswin", "swgalaxies", "eveonline",
        "winserver2003",
    ],
    "2004": [
        "ubuntu", "xpsp2", "msnspaces", "msnmessenger7", "halflife2", "cssource",
        "doom3", "fable", "mgs3", "katamari", "papermario", "nintendods", "psp",
        "ipodmini", "ipodphoto", "garageband", "ilife04", "jibjab", "keyhole",
        "googlelocal", "yousendit", "backpack", "dailysourcecode", "woot",
        "podcastalley", "libsyn", "mediamatters", "rails", "truecrypt", "perezhilton",
        "jalopnik", "tuaw", "cinematical", "eclipse", "tvsquad", "nginx", "markdown",
        "greasemonkey", "xboxlive", "rometw", "battlefront", "kotor2", "ut2004",
        "nfsu2", "ninjagaiden", "madden2005", "fifa2005", "alistapart", "videolog",
        "go", "looksmart", "alltheweb", "teoma", "webcrawler", "earthlink", "ivillage",
        "juno", "attnet", "icerocket", "phoronix", "netlog", "confluence", "vocaloid",
        "ucbrowser", "ccleaner", "wmp10", "flashmx", "camino", "pokemonfirered",
        "pokemonemerald", "pikmin2", "metroidprime2", "mario64ds", "pictochat",
        "lineage2", "dofus", "granturismo4", "burnout3", "xpmce", "creativecommons",
    ],
    "2007": [
        "hackernews", "friendfeed", "netflix", "appletv", "ipodtouch", "justintv",
        "icanhas", "funnyordie", "pownce", "androidann", "gears", "iplayer",
        "amazonmp3", "safari3", "wiki", "myspace", "maps", "ebay", "stumble", "wow",
        "flickr", "reddit", "digg", "iphone", "streetview", "gmail", "fbplat",
        "twitter", "youtube", "tumblr", "kindle", "ie6", "playable",
    ],
    "2008": ["bbc", "wikipedia", "reddit", "netflix"],
    "2010": [
        "flipboard", "minecraft", "hulu", "angry", "googlebuzz", "chromewebstore",
        "kinect", "cityville", "ibooks", "playable",
    ],
    "2011": [
        "snapchat", "ios5", "imessage", "honeycomb", "ics", "wechat", "line", "temple",
        "skyrim", "nytpaywall", "skypebuy", "grouponipo", "zyngaipo", "googlewallet",
        "stripe", "codecademy", "nintendo3ds", "psnhack", "gowalla",
    ],
    "2012": [
        "tinder", "duolingo", "coursera", "udacity", "edx", "nexus7", "jellybean",
        "ios6", "googleplay", "kindlefirehd", "coinbase", "playable",
    ],
    "2013": [
        "bitcoin", "bustle", "canva13", "chromecast", "deliveroo", "dogecoin",
        "doordash", "emojipedia", "facebookhome", "giphy", "googlekeep", "graphsearch",
        "gta5", "hangouts13", "healthcare", "hummingbird", "internetorg", "iphone5s",
        "itch", "itunesradio", "kahoot", "kitkat", "mega", "patreon", "pluto",
        "prism13", "producthunt13", "ps413", "react", "unsplash", "vicenews",
        "waitbutwhy", "xboxone13", "askfm", "whisper", "youtube", "chrome", "medium",
        "yikyak", "reddit", "facebook", "twitter",
    ],
    "2014": [
        "alibabaipo", "oculusfb", "inbox", "echo", "flappybird", "game2048", "ios8",
        "facebook", "youtube", "wikipedia", "twitter", "applepay", "heartbleed",
        "icebucket", "instagram", "iphone", "material", "musically14", "playable",
        "slack", "snapchat", "truecrypt", "twitch", "uber", "whatsapp",
    ],
    "2015": [
        "androidpay", "applenews", "applepencil", "applewatch", "beats1", "dx12",
        "elcapitan", "ethereum", "fblive", "http2", "instantarticles", "ipadpro",
        "ipfs", "iphone6s", "k8s",
    ],
    "2016": [
        "douyin", "airpods", "pixel", "nougat", "allo", "duo", "googlehome",
        "oculusrift", "psvr", "overwatch", "doom2016", "uncharted4", "nomanssky",
        "clashroyale", "panamapapers", "figma", "thedao", "ethereum", "ios10",
        "sierra", "daydream", "battlefield1", "letsencrypt",
    ],
    "2017": [
        "cuphead", "twitterlite", "hangoutschat", "snapmap", "instagram17", "botw",
        "splatoon2", "tbh", "messengerday", "gettingoverit", "hollowknight", "cardano",
        "codww2", "destiny2", "essentialph1", "galaxys8", "googlehomemini",
        "googlelens", "googlepay", "highsierra", "horizonzd", "imacpro", "injustice2",
        "ipadpro105", "ipadpro129", "iphone8plus",
    ],
    "2018": [
        "gplusgone", "androidpie", "ios12", "pubg", "rdr2", "mojave", "onedot",
        "epicstore", "nso", "espnplus", "caffeine", "reddit", "youtube", "wikipedia",
        "instagram", "chrome", "fortnite", "gdpr", "github", "homepod", "spectre",
        "tiktok", "trust", "playable",
    ],
    "2019": [
        "apex", "airpods2", "android10", "applewatch5", "astralchain", "bloodstained",
        "borderlands3", "catalina", "control19", "crashteamracing", "daysgone",
        "deathstranding", "discoelysium", "dmc5", "fireemblem3h", "galaxyfold",
        "galaxynote10", "galaxys10", "geforcenow", "ipad7", "ipadmini5",
        "jedifallenorder", "kingdomhearts3", "linksawakening", "luigismansion3",
        "macbookpro16", "applecard",
    ],
    "2020": [
        "clubhouse", "hbomax", "peacock", "google", "youtube", "facebook", "wikipedia",
        "instagram", "amazon", "amongus", "animalcrossing", "classroom", "discord",
        "houseparty", "netflix", "playable",
    ],
    "2021": [
        "nft", "coinbaseipo", "epicapple", "google", "youtube", "facebook", "twitter",
        "instagram", "amazon", "att", "chrome", "copilot", "flash", "meta", "playable",
        "signal", "windows10", "windows11",
    ],
    "2022": [
        "temu", "stablediff", "midjourney", "dalle2", "ios16", "m2", "google",
        "youtube", "facebook", "twitter", "wikipedia", "reddit", "instagram", "amazon",
        "bereal", "chatgpt", "ftx", "iphone", "mastodon", "netflix", "nyt", "playable",
        "tiktok", "windows11", "wordle",
    ],
}


def dest_folders(year: str) -> set[str]:
    d = ROOT / "years" / year / "sites"
    if not d.is_dir():
        return set()
    return {p.name for p in d.iterdir() if p.is_dir()}


def dest_has_index(year: str, slug: str) -> bool:
    return (ROOT / "years" / year / "sites" / slug / "index.html").is_file()


def extract_keep_original(year: str, dest_set: set[str]) -> list[str]:
    seen: list[str] = []
    have: set[str] = set()
    year_root = ROOT / "years" / year
    for p in list(year_root.rglob("*.html")) + list(year_root.rglob("*.htm")):
        t = p.read_text(encoding="utf-8", errors="replace")
        blocks: list[str] = []
        for m in re.finditer(
            r"ITT-2X-(?:LINKS|TARGET):\d{4}:start -->(.*?)<!-- ITT-2X-(?:LINKS|TARGET)",
            t,
            re.S,
        ):
            blocks.append(m.group(1))
        for m in re.finditer(
            r"<p[^>]*(?:data-itt-2x-links|data-itt-2x-unique)[^>]*>(.*?)</p>",
            t,
            re.S | re.I,
        ):
            blocks.append(m.group(1))
        for b in blocks:
            for h in HREF.findall(b):
                sm = SLUG.search(h.replace("\\", "/"))
                if not sm:
                    continue
                slug = sm.group(1)
                if slug in dest_set and slug not in have:
                    have.add(slug)
                    seen.append(slug)
    return seen


def unique_dests(year: str) -> list[str]:
    ds = {s for s in dest_folders(year) if dest_has_index(year, s)}
    keep = extract_keep_original(year, ds)
    add = [s for s in CITED_ADD.get(year, []) if s in ds]
    out: list[str] = []
    have: set[str] = set()
    for s in keep + add:
        if s not in have and s in ds:
            have.add(s)
            out.append(s)
    return out


def _flow_trail_chunk(year: str) -> str:
    trails = ROOT / "js" / "config" / "flow-trails.js"
    text = trails.read_text(encoding="utf-8", errors="replace")
    m = re.search(rf'"{year}"\s*:\s*\[', text)
    if not m:
        return ""
    i = m.end()
    depth = 1
    while i < len(text) and depth:
        if text[i] == "[":
            depth += 1
        elif text[i] == "]":
            depth -= 1
        i += 1
    return text[m.end() : i]


def official_slugs(year: str) -> set[str]:
    out = set()
    for stop in re.finditer(
        r'\{\s*"n":\s*(\d+),\s*"name":\s*"[^"]*",\s*"href":\s*"sites/([^/]+)/',
        _flow_trail_chunk(year),
    ):
        if 1 <= int(stop.group(1)) <= 10:
            out.add(stop.group(2))
    return out


def leftover_trail_slugs(year: str) -> set[str]:
    out = set()
    for stop in re.finditer(
        r'\{\s*"n":\s*(\d+),\s*"name":\s*"[^"]*",\s*"href":\s*"sites/([^/]+)/',
        _flow_trail_chunk(year),
    ):
        if int(stop.group(1)) >= 11:
            out.add(stop.group(2))
    return out


def leftover_4x_unique_ids() -> dict[str, set[str]]:
    path = ROOT / "e2e" / "leftover-4x-unique.matrix.json"
    out: dict[str, set[str]] = {}
    if not path.is_file():
        return out
    data = json.loads(path.read_text(encoding="utf-8"))
    for row in data if isinstance(data, list) else []:
        y = str(row.get("year") or "")
        slug = row.get("id") or ""
        if y and slug:
            out.setdefault(y, set()).add(slug)
    return out


def leftover_3x_unique_dest_true_ids() -> dict[str, set[str]]:
    path = ROOT / "js" / "config" / "leftover-3x-unique.js"
    out: dict[str, set[str]] = {}
    if not path.is_file():
        return out
    cur = None
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r'\s*"(\d{4})"\s*:', line)
        if m:
            cur = m.group(1)
            out.setdefault(cur, set())
            continue
        m = re.search(r'"id":\s*"([^"]+)"', line)
        if m and cur:
            out[cur].add(m.group(1))
    return out


def official_dest_html(year: str, path: Path, html: str, off: set[str]) -> bool:
    if OFF_KEY.search(html):
        return True
    m = re.search(r"/sites/([^/]+)/", path.as_posix())
    if m and m.group(1) in off:
        return True
    return False


def is_start_or_pages(year: str, path: Path) -> bool:
    return f"/years/{year}/pages/" in path.as_posix()


def rail_html(year: str, dests: list[str], from_slug: str | None) -> str:
    bits = [
        f'<p class="itt-2x-unique" data-itt-2x-links="{year}" '
        'style="margin:12px auto;padding:8px;border:1px dashed #888;'
        'font-family:Arial,sans-serif;font-size:11px;max-width:52em">'
        f"<b>Also this year · leftover-2× unique dests</b> "
        "(not the chip · one dest once)"
    ]
    for slug in dests:
        if from_slug and slug == from_slug:
            continue
        dest = ROOT / "years" / year / "sites" / slug / "index.html"
        if not dest.is_file():
            continue
        name = dest_label(dest)
        bits.append(f' · <a href="../{slug}/index.html">{name}</a>')
    bits.append("</p>")
    inner = "".join(bits)
    return (
        f"<!-- ITT-2X-LINKS:{year}:start -->{inner}<!-- ITT-2X-LINKS:{year}:end -->"
    )


def strip_rails(html: str) -> str:
    html = BLOCK.sub("", html)
    html = P_RAIL.sub("", html)
    html = NAV_RAIL.sub("", html)
    return html


def has_leftover_rail(html: str) -> bool:
    return (
        "ITT-2X-LINKS" in html
        or "ITT-2X-TARGET" in html
        or "data-itt-2x-links" in html
        or "data-itt-2x-unique" in html
    )


def inject_or_replace(html: str, rail: str) -> str:
    html = strip_rails(html)
    if re.search(r"</body>", html, re.I):
        return re.sub(r"</body>", rail + "</body>", html, count=1, flags=re.I)
    return html + rail


def leftover_3x_unique_link_ids() -> dict[str, set[str]]:
    """Dest slugs already on leftover-3× unique dest links. One dest once as a link."""
    path = ROOT / "js" / "config" / "leftover-3x-unique-links.js"
    out: dict[str, set[str]] = {}
    if not path.is_file():
        return out
    cur = None
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r'\s*"(\d{4})"\s*:', line)
        if m:
            cur = m.group(1)
            out.setdefault(cur, set())
            continue
        m = re.search(r'"id":\s*"([^"]+)"', line)
        if m and cur:
            out[cur].add(m.group(1))
    return out


def dest_disjoint_3x_unique_links(
    catalog: dict[str, list[dict]],
) -> dict[str, list[str]]:
    """Drop leftover-3× unique dest link dests from leftover-2× unique dest links."""
    return _drop_ids(catalog, leftover_3x_unique_link_ids())


def dest_disjoint_owned_dests(
    catalog: dict[str, list[dict]],
) -> dict[str, list[str]]:
    """Drop dests that already have another year map from leftover-2× unique dest links."""
    lo4 = leftover_4x_unique_ids()
    skip: dict[str, set[str]] = {}
    for year in list(catalog.keys()):
        ban = set()
        ban |= leftover_3x_unique_link_ids().get(year) or set()
        ban |= official_slugs(year)
        ban |= leftover_trail_slugs(year)
        ban |= lo4.get(year) or set()
        if year == "2016":
            try:
                trip = json.loads(
                    (ROOT / "e2e" / "lean-triple-leftover.matrix.json").read_text(
                        encoding="utf-8"
                    )
                )
                ban |= {r["id"] for r in trip if str(r.get("year")) == "2016"}
            except OSError:
                pass
        if ban:
            skip[year] = ban
    return _drop_ids(catalog, skip)


def _drop_ids(
    catalog: dict[str, list[dict]], skip: dict[str, set[str]]
) -> dict[str, list[str]]:
    dropped: dict[str, list[str]] = {}
    for year, rows in list(catalog.items()):
        ban = skip.get(year) or set()
        if not ban:
            continue
        keep = []
        gone = []
        for row in rows:
            if row["id"] in ban:
                gone.append(row["id"])
            else:
                keep.append(row)
        if gone:
            catalog[year] = keep
            dropped[year] = gone
    return dropped


def load_js_catalog() -> dict[str, list[dict]]:
    text = (ROOT / "js" / "config" / "leftover-2x-unique-links.js").read_text(
        encoding="utf-8"
    )
    m = re.search(r"ITT\.leftover2xUniqueLinks = \s*(\{.*\})\s*;", text, re.S)
    if not m:
        raise SystemExit("leftover-2x unique dest links catalog missing")
    raw = json.loads(m.group(1))
    return {str(y): list(rows) for y, rows in raw.items()}


def leftover_href_count(year: str, dests: list[str], from_slug: str | None) -> int:
    n = 0
    for slug in dests:
        if from_slug and slug == from_slug:
            continue
        dest = ROOT / "years" / year / "sites" / slug / "index.html"
        if dest.is_file():
            n += 1
    return n


def rewrite_existing_rails(catalog: dict[str, list[dict]], years: list[str] | None = None) -> int:
    """Replace ITT-2X-LINKS on leftover dest HTML that already has a rail. No new injects."""
    rewritten = 0
    years = years or list(catalog.keys())
    lo3x_true = leftover_3x_unique_dest_true_ids()
    for year in years:
        dests = [r["id"] for r in catalog.get(year, [])]
        year_root = ROOT / "years" / year
        if not year_root.is_dir():
            continue
        off = official_slugs(year)
        unique_true = lo3x_true.get(year) or set()
        htmls = list(year_root.rglob("*.html")) + list(year_root.rglob("*.htm"))
        for path in htmls:
            html = path.read_text(encoding="utf-8", errors="replace")
            if is_start_or_pages(year, path):
                continue
            if official_dest_html(year, path, html, off):
                continue
            if not has_leftover_rail(html):
                continue
            from_slug = None
            m = re.search(r"/sites/([^/]+)/", path.as_posix())
            if m:
                from_slug = m.group(1)
            if from_slug and from_slug in unique_true:
                new = strip_rails(html)
            elif leftover_href_count(year, dests, from_slug) == 0:
                new = strip_rails(html)
            else:
                rail = rail_html(year, dests, from_slug)
                new = inject_or_replace(html, rail)
            if new != html:
                path.write_text(new, encoding="utf-8")
                rewritten += 1
    return rewritten


def write_catalog(catalog: dict[str, list[dict]]) -> None:
    write_js(catalog)
    matrix = []
    for year, rows in catalog.items():
        matrix.append({"year": year, "dests": [r["id"] for r in rows], "n": len(rows)})
    (ROOT / "e2e" / "leftover-2x-unique-links.matrix.json").write_text(
        json.dumps(matrix, indent=2) + "\n", encoding="utf-8"
    )


def write_js(catalog: dict[str, list[dict]]) -> None:
    lines = [
        "/** Leftover-2× unique dest links — one dest once. Dests already on disk. */",
        "(function (global) {",
        '  "use strict";',
        "  var ITT = global.ITT || (global.ITT = {});",
        "  ITT.leftover2xUniqueLinks = ",
        json.dumps(catalog, indent=2),
        ";",
        "})(typeof window !== \"undefined\" ? window : this);",
        "",
    ]
    (ROOT / "js" / "config" / "leftover-2x-unique-links.js").write_text(
        "\n".join(lines), encoding="utf-8"
    )


def build_catalog() -> dict[str, list[dict]]:
    catalog: dict[str, list[dict]] = {}
    for year in SHIP_YEARS:
        dests = unique_dests(year)
        if year in ("2013", "2014"):
            have = set(dests)
            for s in sorted(dest_folders(year)):
                if s not in have and dest_has_index(year, s):
                    dests.append(s)
                    have.add(s)
        rows = []
        for s in dests:
            dest = ROOT / "years" / year / "sites" / s / "index.html"
            name = dest_label(dest) if dest.is_file() else s
            rows.append({"id": s, "name": name})
        catalog[year] = rows
    dest_disjoint_owned_dests(catalog)
    return catalog


def rewrite_dest_html(catalog: dict[str, list[dict]]) -> tuple[int, int, int]:
    rewritten = 0
    stripped_official = 0
    injected = 0
    for year in SHIP_YEARS:
        dests = [r["id"] for r in catalog[year]]
        year_root = ROOT / "years" / year
        if not year_root.is_dir():
            continue
        off = official_slugs(year)
        htmls = list(year_root.rglob("*.html")) + list(year_root.rglob("*.htm"))
        for path in htmls:
            html = path.read_text(encoding="utf-8", errors="replace")
            orig = html
            if is_start_or_pages(year, path):
                continue
            from_slug = None
            m = re.search(r"/sites/([^/]+)/", path.as_posix())
            if m:
                from_slug = m.group(1)
            if official_dest_html(year, path, html, off):
                if has_leftover_rail(html):
                    html = strip_rails(html)
                    if html != orig:
                        path.write_text(html, encoding="utf-8")
                        stripped_official += 1
                continue
            rail = rail_html(year, dests, from_slug)
            if has_leftover_rail(html):
                html = inject_or_replace(html, rail)
                if html != orig:
                    path.write_text(html, encoding="utf-8")
                    rewritten += 1
            elif from_slug:
                html = inject_or_replace(html, rail)
                if html != orig:
                    path.write_text(html, encoding="utf-8")
                    injected += 1
    return rewritten, injected, stripped_official


def main() -> int:
    catalog_only = "--catalog-only" in sys.argv
    strip_overlap = "--strip-3x-overlap" in sys.argv
    strip_owned = "--strip-owned-dests" in sys.argv
    if strip_overlap or strip_owned:
        catalog = load_js_catalog()
        dropped = (
            dest_disjoint_owned_dests(catalog)
            if strip_owned
            else dest_disjoint_3x_unique_links(catalog)
        )
        write_catalog(catalog)
        years = sorted(set(dropped.keys()) | set(catalog.keys()))
        rewritten = rewrite_existing_rails(catalog, years)
        n_drop = sum(len(v) for v in dropped.values())
        label = (
            "owned dests (official · leftover trail n=11+ · leftover-4× unique dests · leftover-3× unique dest links)"
            if strip_owned
            else "leftover-3× unique dest link dests"
        )
        print(
            f"stripped {label} from leftover-2× unique dest links "
            f"{n_drop} dests · years {len(dropped)} · rewrote existing rails {rewritten}"
        )
        for year in sorted(dropped.keys()):
            print(f"  {year} dropped {len(dropped[year])} remain {len(catalog[year])}")
        return 0
    catalog = build_catalog()
    write_catalog(catalog)
    rewritten = injected = stripped_official = 0
    if not catalog_only:
        rewritten, injected, stripped_official = rewrite_dest_html(catalog)
        print(
            f"rewrote leftover dest rails {rewritten} · injected {injected} · "
            f"stripped official dest leftover-2× {stripped_official}"
        )
    else:
        print("catalog only · dest HTML unchanged")
    for year in SHIP_YEARS:
        print(f"  {year} unique dests {len(catalog[year])}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
