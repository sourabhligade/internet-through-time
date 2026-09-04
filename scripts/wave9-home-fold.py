#!/usr/bin/env python3
"""Wave 9 — wrap leftover warehouse under .itt-home-more.

Years: 1994–2003, 2007, 2009. 2011 has no ITT-3X-LINKS on home.html
(start-extra leftover packs already use fold selectors). 2018 wiped.

See docs/EVERY-YEAR-NEXT-IMPROVE-MAP-GOALS-PHASES-FLOWS-MINUTE-2026-09-03.md Wave 9.
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = (
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2007",
    "2009",
)
START = "<!-- ITT-3X-LINKS:start -->"
END = "<!-- ITT-3X-LINKS:end -->"
OPEN = (
    "<!-- ITT-HOME-MORE:start -->\n"
    '<div class="itt-home-more">\n'
    '<p class="itt-home-more-label">Also this year · leftover warehouse</p>\n'
)
CLOSE = "</div>\n<!-- ITT-HOME-MORE:end -->\n"


def wrap(year: str) -> str:
    path = ROOT / "years" / year / "pages" / "home.html"
    text = path.read_text(encoding="utf-8")
    if "class=\"itt-home-more\"" in text or "class='itt-home-more'" in text:
        return f"{year}: already wrapped"
    if START not in text or END not in text:
        return f"{year}: no 3× strip"
    text = text.replace(START, OPEN + START, 1)
    text = text.replace(END, END + "\n" + CLOSE, 1)
    path.write_text(text, encoding="utf-8")
    return f"{year}: wrapped"


def main() -> None:
    for year in YEARS:
        print(wrap(year))


if __name__ == "__main__":
    main()
