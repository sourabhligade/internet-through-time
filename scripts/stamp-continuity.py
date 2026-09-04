#!/usr/bin/env python3
"""Add data-itt-primary-year to clone rooms (W1-B / W5). Additive. No deletes."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Product slug → year that owns it (museum one-thing / P0 year)
PRIMARY = {
    "amazon": "1995",
    "yahoo": "1994",
    "geocities": "1995",
    "cnn": "1995",
    "altavista": "1995",
    "auctionweb": "1995",
    "hotmail": "1996",
    "excite": "1996",
    "ebay": "1997",
    "icq": "1997",
    "napster": "1999",
    "aim": "1999",
    "blogger": "1999",
    "friendster": "2002",
    "kazaa": "2002",
    "stumbleupon": "2002",
    "myspace": "2003",
    "itunes": "2003",
    "photobucket": "2003",
    "gmail": "2004",
    "facebook": "2004",
    "flickr": "2004",
    "youtube": "2005",
    "maps": "2005",
    "reddit": "2005",
    "digg": "2005",
    "pandora": "2005",
    "twitter": "2006",
    "iphone": "2007",
    "appstore": "2008",
    "chrome": "2008",
    "farmville": "2009",
    "bing": "2009",
    "instagram": "2010",
    "imgur": "2010",
    "hampsterdance": "1999",
    "zombo": "1999",
    "y2k": "1999",
    "youvegotmail": "1998",
    "netscape": "1994",
    "slashdot": "1997",
    "gnutella": "2000",
    "encarta": "2001",
    "pets": "2000",
    "askjeeves": "1997",
    "dmoz": "1998",
    "infoseek": "1998",
    "hotbot": "1997",
}

STAMP_YEARS = (2006, 2007, 2008, 2009, 2010, 2015, 2016, 2019)

BODY_RE = re.compile(r"<body(\s[^>]*)?>", re.I)


def stamp_file(path: Path, primary: str) -> bool:
    text = path.read_text(encoding="utf-8", errors="replace")
    if f'data-itt-primary-year="{primary}"' in text:
        return False
    if "data-itt-primary-year=" in text:
        return False
    m = BODY_RE.search(text)
    if not m:
        return False
    raw = m.group(0)
    if raw.endswith(">"):
        new = raw[:-1] + f' data-itt-primary-year="{primary}">'
    else:
        return False
    path.write_text(text[: m.start()] + new + text[m.end() :], encoding="utf-8")
    return True


def main() -> None:
    n = 0
    for year in STAMP_YEARS:
        sites = ROOT / "years" / str(year) / "sites"
        if not sites.is_dir():
            continue
        for slug, primary in PRIMARY.items():
            if int(primary) >= year:
                continue
            folder = sites / slug
            if not folder.is_dir():
                continue
            for html in folder.rglob("*.html"):
                if stamp_file(html, primary):
                    n += 1
    print(f"stamped {n} html files")


if __name__ == "__main__":
    main()
