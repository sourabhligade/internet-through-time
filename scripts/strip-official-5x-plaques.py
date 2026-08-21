#!/usr/bin/env python3
"""Remove mock 5× checkbox plaques from official trail dests that already
have a REAL product writer (named hook or typed 4× query).

Official 5× loops satisfy {real, multiStep} but are dest-literacy mock.
After a product verb exists on the same page, the plaque is leftover noise.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOOP_RE = re.compile(
    r'\s*<div class="itt-5x-loop"[^>]*data-5x-loop[\s\S]*?</div>\s*',
    re.I,
)

OFFICIAL_PLAQUE = [
    ("1995", "sites/geocities/homestead.html"),
    ("1997", "sites/icq/index.html"),
    ("1998", "sites/google/index.html"),
    ("1998", "sites/mozilla/index.html"),
    ("1998", "sites/dmoz/index.html"),
    ("2000", "sites/amazon/index.html"),
    ("2001", "sites/apple/ipod.html"),
    ("2001", "sites/broadband/index.html"),
    ("2001", "sites/wayback/index.html"),
    ("2001", "sites/movabletype/index.html"),
    ("2002", "sites/friendster/index.html"),
    ("2002", "sites/kazaa/index.html"),
    ("2002", "sites/googlenews/index.html"),
    ("2002", "sites/wired/index.html"),
    ("2003", "sites/myspace/index.html"),
    ("2003", "sites/itunes/index.html"),
    ("2003", "sites/wordpress/index.html"),
    ("2003", "sites/linkedin/index.html"),
    ("2003", "sites/adsense/index.html"),
    ("2004", "sites/gmail/index.html"),
    ("2004", "sites/firefox/index.html"),
    ("2004", "sites/flickr/index.html"),
    ("2004", "sites/digg/index.html"),
    ("2005", "sites/maps/index.html"),
    ("2005", "sites/housingmaps/index.html"),
    ("2005", "sites/digg/index.html"),
    ("2005", "sites/reddit/index.html"),
    ("2006", "sites/youtube/index.html"),
    ("2006", "sites/digg/index.html"),
    ("2006", "sites/docs/index.html"),
    ("2006", "sites/time-you/index.html"),
    ("2007", "sites/gmail/index.html"),
    ("2007", "sites/twitter/index.html"),
    ("2008", "sites/appstore/index.html"),
    ("2008", "sites/chrome/index.html"),
    ("2008", "sites/android/index.html"),
    ("2008", "sites/hulu/index.html"),
    ("2008", "sites/dropbox/index.html"),
    ("2009", "sites/farmville/index.html"),
    ("2009", "sites/stackoverflow/index.html"),
    ("2009", "sites/bing/index.html"),
    ("2009", "sites/foursquare/index.html"),
    ("2010", "sites/facebook/index.html"),
    ("2010", "sites/foursquare/index.html"),
    ("2010", "sites/twitter/index.html"),
    ("2010", "sites/youtube/index.html"),
    ("2011", "sites/facebook/timeline.html"),
    ("2011", "sites/instagram/index.html"),
    ("2011", "sites/twitter/index.html"),
    ("2012", "sites/pinterest/index.html"),
    ("2012", "sites/facebook/ipo.html"),
    ("2012", "sites/facebook/index.html"),
    ("2012", "sites/iphone/maps.html"),
    ("2012", "sites/wikipedia/sopa.html"),
]


def has_real_writer(html: str) -> bool:
    if "data-4x-field" in html or "data-4x-hop=" in html:
        return True
    if re.search(
        r"data-(?:ig12-|faceid-|gdpr-|ipo-|csotd|google-lucky|aim-|mq-|yt-upload|farm-|appstore-|pb-|fb-|itunes|gmail|flickr|digg|reddit|maps-|4sq-|chrome-|android-|hulu-|bing-|sopa-)",
        html,
    ):
        return True
    return False


def main() -> int:
    stripped = 0
    skipped = 0
    for year, rel in OFFICIAL_PLAQUE:
        p = ROOT / "years" / year / rel
        if not p.is_file():
            print("missing", year, rel)
            skipped += 1
            continue
        html = p.read_text(encoding="utf-8", errors="replace")
        if "data-5x-loop" not in html and "data-5x-save" not in html:
            continue
        if not has_real_writer(html):
            # add a typed 4× query so we do not leave the dest writer-less
            suffix = "trail-q"
            if f"data-4x-go=\"{suffix}\"" not in html:
                block = (
                    f"<!-- ITT-4X:{suffix}:start -->\n"
                    f'<section class="itt-4x-panel" data-4x-panel data-4x-kind="query" data-4x-min="2" '
                    f'style="margin:12px 0;padding:10px;border:1px dashed #333;font-family:Arial,sans-serif;'
                    f'font-size:13px;max-width:46em;background:#fff8e1">\n'
                    f"<b>Official dest leftover</b> · typed verb · incomplete never writes\n"
                    f'<p><label>type then save<br>'
                    f'<input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="ok"></label></p>\n'
                    f'<p><button type="button" data-4x-go="{suffix}">Save leftover</button> '
                    f"<span data-4x-status></span></p>\n"
                    f"</section>\n<!-- ITT-4X:{suffix}:end -->\n"
                )
                html = re.sub(r"</body\s*>", block + "</body>", html, count=1, flags=re.I)
        new, n = LOOP_RE.subn("\n", html)
        # also leftover unmarked 5x blocks
        if n == 0 and "data-5x-save" in html:
            new2 = re.sub(
                r'\s*<div[^>]*data-5x-loop[\s\S]*?</div>\s*',
                "\n",
                html,
                flags=re.I,
            )
            if new2 != html:
                new = new2
                n = 1
        if n:
            p.write_text(new, encoding="utf-8")
            stripped += n
            print("stripped 5x", year, rel)
        else:
            print("no loop match", year, rel)
    print("stripped loops", stripped, "skipped", skipped)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
