#!/usr/bin/env python3
"""Scan / stamp residual primary-year attrs. Opt-in writes with --stamp-known."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# Birth/public-web spine year class (primary < shell => residual in that shell)
KNOWN = {
    "yahoo": 1994, "webcrawler": 1994, "wired": 1994, "cnet": 1994, "ibm": 1994,
    "intel": 1994, "w3c": 1994, "cdnow": 1994, "blizzard": 1994, "register": 1994,
    "amazon": 1995, "geocities": 1995, "microsoft": 1995, "netscape": 1995,
    "altavista": 1995, "cnn": 1995, "excite": 1995, "infoseek": 1995, "msn": 1995,
    "lycos": 1995, "tripod": 1995, "zdnet": 1995, "pcworld": 1995, "newgrounds": 1995,
    "ebay": 1995, "match": 1995, "craigslist": 1996, "hotbot": 1996, "angelfire": 1996,
    "hotmail": 1996, "spacejam": 1996, "mapquest": 1996, "expedia": 1996,
    "flash": 1996, "apache": 1995, "gamespot": 1996, "ign": 1996, "mtv": 1995,
    "slashdot": 1997, "icq": 1997, "apple": 1997, "askjeeves": 1997, "bbc": 1997,
    "bn": 1997, "bestbuy": 1997, "godaddy": 1997, "winamp": 1997,
    "google": 1998, "dmoz": 1998, "bowienet": 1998, "youvegotmail": 1998,
    "netcenter": 1998, "xanga": 1998, "nvidia": 1998, "priceline": 1998,
    "akamai": 1998, "phpmyadmin": 1998, "netflix": 1998, "opentable": 1998,
    "paypal": 1999, "napster": 1999, "zombo": 1999, "hampsterdance": 1999,
    "blogger": 1999, "livejournal": 1999, "metafilter": 1999, "fark": 1999,
    "neopets": 1999, "eurogamer": 1999, "sourceforge": 1999, "collegehumor": 1999,
    "pets": 2000, "limewire": 2000, "bearshare": 2000, "gnutella": 2000,
    "pandora": 2000, "boingboing": 2000, "homestarrunner": 2000, "tripadvisor": 2000,
    "namecheap": 2000, "wikipedia": 2001, "kazaa": 2001, "morpheus": 2001,
    "miniclip": 2001, "xbox": 2001, "orbitz": 2001, "bittorrent": 2001,
    "ebaumsworld": 2001, "bitdefender": 2001, "plesk": 2001, "vlc": 2001,
    "wayback": 2001, "friendster": 2002, "technorati": 2002, "lastfm": 2002,
    "movabletype": 2002, "moveabletype": 2002, "stumbleupon": 2002, "gizmodo": 2002,
    "isohunt": 2002, "rapidshare": 2002, "tinyurl": 2002, "tor": 2002,
    "foobar": 2002, "dotnet": 2002, "myspace": 2003, "linkedin": 2003, "skype": 2003,
    "adsense": 2003, "wordpress": 2003, "delicious": 2003, "bloglines": 2003,
    "itunes": 2003, "steam": 2003, "4chan": 2003, "hi5": 2003, "thepiratebay": 2003,
    "metacafe": 2003, "memcached": 2003, "linode": 2003, "anonymous": 2003,
    "flickr": 2004, "facebook": 2004, "digg": 2004, "gmail": 2004, "orkut": 2004,
    "firefox": 2004, "yelp": 2004, "kayak": 2004, "nginx": 2004, "ytmnd": 2004,
    "vimeo": 2004, "engadget": 2004, "kotaku": 2004, "web20conference": 2004,
    "ds": 2004, "psp": 2004, "maps": 2005, "youtube": 2005, "reddit": 2005,
    "feedburner": 2005, "reader": 2005, "housingmaps": 2005, "bebo": 2005,
    "techcrunch": 2005, "mashable": 2005, "lifehacker": 2005, "dailymotion": 2005,
    "veoh": 2005, "clubpenguin": 2005, "razer": 2005, "megaupload": 2005,
    "mediafire": 2005, "box": 2005, "mozy": 2005, "carbonite": 2005, "mininova": 2005,
    "newsvine": 2005, "propeller": 2005, "twitter": 2006, "docs": 2006, "aws": 2006,
    "wikileaks": 2006, "kongregate": 2006, "wii": 2006, "grooveshark": 2006,
    "magnolia": 2006, "tumblr": 2007, "iphone": 2007, "friendfeed": 2007,
    "funnyordie": 2007, "crackle": 2007, "rockpapershotgun": 2007, "heroku": 2007,
    "backblaze": 2007, "mixx": 2007, "silverlight": 2007, "chrome": 2008,
    "android": 2008, "appstore": 2008, "dropbox": 2008, "hulu": 2008, "spotify": 2008,
    "github": 2008, "bitly": 2008, "airbnb": 2008, "friendconnect": 2008,
    "soundcloud": 2007, "bandcamp": 2008, "malwarebytes": 2008, "gce": 2008,
    "farmville": 2009, "foursquare": 2009, "bing": 2009, "kickstarter": 2009,
    "wave": 2009, "windows7": 2009, "ie8": 2009, "bitcoin": 2009, "square": 2009,
    "venmo": 2009, "mongodb": 2009, "redis": 2009, "nodejs": 2009, "cloudflare": 2009,
    "maxcdn": 2009, "incapsula": 2009, "uber": 2010, "ubercab": 2010, "instagram": 2010,
    "pinterest": 2010, "ipad": 2010, "groupon": 2010, "quora": 2010, "azure": 2010,
    "stripe": 2010, "rdio": 2010, "mtgox": 2010, "sucuri": 2010, "googleplus": 2011,
    "snapchat": 2011, "siri": 2011, "twitch": 2011, "ie9": 2011, "silkroad": 2011,
    "digitalocean": 2011, "fastly": 2011, "wordfence": 2011, "medium": 2012,
    "windows8": 2012, "lyft": 2012, "polygon": 2012, "coinbase": 2012,
    "vine": 2013, "windows81": 2013, "ps4": 2013, "xboxone": 2013, "telegram": 2013,
    "healthcare": 2013, "snowden": 2013, "yikyak": 2013, "cashapp": 2013,
    "robinhood": 2013, "whatsapp": 2014, "heartbleed": 2014, "billion": 2014,
    "icebucket": 2014, "echo": 2014, "oculus": 2014, "alibaba": 2014,
    "material": 2014, "serial": 2014, "cardboard": 2014, "ello": 2014,
    "windows10": 2015, "letsencrypt": 2015,
}

# drop invalid
KNOWN = {k: v for k, v in KNOWN.items() if isinstance(v, int) and 1991 <= v <= 2016}


def shell_years():
    return sorted(
        p.name
        for p in (ROOT / "years").iterdir()
        if p.is_dir() and p.name.isdigit() and (p / "sites").is_dir()
    )


def stamp_body(path: Path, primary: int) -> bool:
    t = path.read_text(encoding="utf-8", errors="replace")
    if re.search(r'data-itt-primary-year\s*=\s*"' + str(primary) + r'"', t):
        return False

    def repl(m, p=primary):
        tag = m.group(0)
        if "data-itt-primary-year" in tag:
            return re.sub(
                r'data-itt-primary-year="[^"]*"',
                f'data-itt-primary-year="{p}"',
                tag,
            )
        return tag[:-1] + f' data-itt-primary-year="{p}">'

    t2, n = re.subn(r"<body\b[^>]*>", repl, t, count=1, flags=re.I)
    if n:
        path.write_text(t2, encoding="utf-8")
        return True
    return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--year")
    ap.add_argument("--stamp-known", action="store_true")
    ap.add_argument("--all-html", action="store_true",
                    help="Stamp every html under known site dirs")
    args = ap.parse_args()
    years = [args.year] if args.year else shell_years()
    stamped = missing = has = 0
    for y in years:
        shell = int(y)
        sites = ROOT / "years" / y / "sites"
        if not sites.is_dir():
            continue
        for site_dir in sorted(sites.iterdir()):
            if not site_dir.is_dir():
                continue
            primary = KNOWN.get(site_dir.name)
            if primary is None or primary >= shell:
                continue
            index = site_dir / "index.html"
            if index.exists():
                t = index.read_text(encoding="utf-8", errors="replace")
                covered = bool(
                    re.search(r'data-itt-primary-year\s*=\s*"' + str(primary) + r'"', t)
                    or "Archive residual" in t
                    or "not new in" in t.lower()
                )
                if covered:
                    has += 1
                else:
                    missing += 1
            if args.stamp_known:
                targets = (
                    list(site_dir.rglob("*.html"))
                    if args.all_html
                    else ([index] if index.exists() else [])
                )
                for html in targets:
                    if html.is_file() and stamp_body(html, primary):
                        stamped += 1
    mode = "STAMP" if args.stamp_known else "SCAN"
    print(
        f"residual {mode}: covered_index~{has} missing_index~{missing} "
        f"stamped={stamped} years={len(years)} known_map={len(KNOWN)}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
