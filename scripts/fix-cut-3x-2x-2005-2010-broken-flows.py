#!/usr/bin/env python3
"""Fix leftover-3× dest machines missing on leftover-3× first-pack dests,
and dest-wrong leftover-2× verbs on leftover-3× 2× KEEP dests.
No new dest folders."""
from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
MARK = "ITT-POP3X-FIRST"

# dest-wrong leftover-2× factory verbs → dest-true leftover verb on KEEP dests
KEEP_LO_FIX = {
    "2005": {
        "lastfm": ("Maps leftover", "Scrobble leftover"),
        "reader": ("Maps leftover", "Subscribe leftover feed"),
        "analytics": ("Maps leftover", "Open leftover Analytics"),
        "googleearth": ("Maps leftover", "Spin leftover globe"),
        "secondlife": ("Maps leftover", "Teleport leftover"),
        "odeo": ("Maps leftover", "Subscribe leftover"),
        "linkedin": ("Maps leftover", "Connect leftover"),
    },
    "2006": {
        "wii": ("Feed leftover", "Play leftover Wii"),
        "time-you": ("Feed leftover", "Name leftover You"),
        "skype": ("Feed leftover", "Call leftover Skype"),
        "lastfm": ("Feed leftover", "Scrobble leftover"),
        "secondlife": ("Feed leftover", "Teleport leftover"),
        "wordpress": ("Feed leftover", "Publish leftover post"),
    },
    "2007": {
        "iptouch": ("Safari leftover", "Browse leftover Wi-Fi"),
        "apltv": ("Safari leftover", "Stream leftover iTunes"),
        "huluann": ("Safari leftover", "Ack leftover Hulu"),
        "gears": ("Safari leftover", "Enable leftover Gears"),
        "halo3": ("Safari leftover", "Launch leftover campaign"),
        "ipann": ("Safari leftover", "Ack leftover announce"),
        "vista": ("Safari leftover", "Ack leftover Vista"),
        "gim": ("Safari leftover", "Open leftover IMAP"),
    },
    "2008": {
        "airbnb": ("Chrome leftover", "Book leftover"),
        "groupon": ("Chrome leftover", "Buy leftover deal"),
        "spotify": ("Chrome leftover", "Enter leftover Europe invite"),
    },
    "2009": {
        "wolfram": ("Like leftover", "Query leftover Alpha"),
        "angry": ("Like leftover", "Sling leftover bird"),
        "gvoice": ("Like leftover", "Open leftover Voice"),
        "friendfeed": ("Like leftover", "Open leftover FriendFeed"),
        "bitcoin": ("Like leftover", "Ack leftover genesis block"),
        "ubercab": ("Like leftover", "Ack leftover UberCab seed"),
    },
    "2010": {
        "facetime": ("Filter leftover", "Call leftover Wi-Fi"),
        "windowsphone": ("Filter leftover", "Open leftover tile"),
        "ie9": ("Filter leftover", "Preview leftover IE9"),
        "browserchoice": ("Filter leftover", "Pick leftover ballot"),
    },
}

# leftover 3× first-pack dests missing leftover 3× dest machines
# (page, pop_id, keep, trap, next_href, next_label, weather, verb)
FIRST_PACK = {
    "2005": [
        ("youtube/watch.html", "youtube", "YouTube leftover", "Upload gold as leftover 3× (trap)", "../wikipedia/index.html", "Wikipedia leftover",
         "YouTube leftover 2005 watch. Upload is the chip on upload.html. Never write itt05-yt-uploads.", "Watch leftover"),
        ("wikipedia/index.html", "wikipedia", "Wikipedia leftover", "Upload gold as leftover 3× (trap)", "../myspace/index.html", "MySpace leftover",
         "Wikipedia leftover 2005. Not the upload chip.", "Open leftover Wikipedia"),
        ("myspace/index.html", "myspace", "MySpace leftover", "Upload gold as leftover 3× (trap)", "../yahoo/index.html", "Yahoo leftover",
         "MySpace leftover 2005. Not the upload chip.", "Open leftover MySpace"),
        ("yahoo/index.html", "yahoo", "Yahoo leftover", "Upload gold as leftover 3× (trap)", "../google/index.html", "Google leftover",
         "Yahoo leftover 2005. Not the upload chip.", "Open leftover Yahoo"),
        ("google/index.html", "google", "Google leftover", "Upload gold as leftover 3× (trap)", "../amazon/index.html", "Amazon leftover",
         "Google leftover 2005. Not the upload chip.", "Search leftover"),
        ("amazon/index.html", "amazon", "Amazon leftover", "Upload gold as leftover 3× (trap)", "../ebay/index.html", "eBay leftover",
         "Amazon leftover 2005. Not the upload chip.", "Open leftover Amazon"),
        ("ebay/index.html", "ebay", "eBay leftover", "Upload gold as leftover 3× (trap)", "../msn/index.html", "MSN leftover",
         "eBay leftover 2005. Not the upload chip.", "Open leftover eBay"),
        ("msn/index.html", "msn", "MSN leftover", "Upload gold as leftover 3× (trap)", "../aol/index.html", "AOL leftover",
         "MSN leftover 2005. Not the upload chip.", "Open leftover MSN"),
        ("aol/index.html", "aol", "AOL leftover", "Upload gold as leftover 3× (trap)", "../firefox/index.html", "Firefox leftover",
         "AOL leftover 2005. Not the upload chip.", "Open leftover AOL"),
        ("firefox/index.html", "firefox", "Firefox leftover", "Upload gold as leftover 3× (trap)", "../gmail/invite.html", "Gmail leftover",
         "Firefox leftover 2005. Not the upload chip.", "Open leftover Firefox"),
        ("gmail/invite.html", "gmail", "Gmail leftover", "Upload gold as leftover 3× (trap)", "../flickr/index.html", "Flickr leftover",
         "Gmail invite leftover 2005. Not the upload chip.", "Open leftover Gmail"),
        ("flickr/index.html", "flickr", "Flickr leftover", "Flickr official as leftover 3× (trap)", "../skype/index.html", "Skype leftover",
         "Flickr leftover 2005 leftover 999. Official flickr dest is leftover 999 weather. Never write itt05-flickr.", "Open leftover Flickr"),
        ("skype/index.html", "skype", "Skype leftover", "Upload gold as leftover 3× (trap)", "../delicious/index.html", "Delicious leftover",
         "Skype leftover 2005 leftover 999. eBay acquire is leftover weather.", "Open leftover Skype"),
        ("blogger/index.html", "blogger", "Blogger leftover", "Upload gold as leftover 3× (trap)", "../wordpress/index.html", "WordPress leftover",
         "Blogger leftover 2005 leftover 999. Not the upload chip.", "Open leftover Blogger"),
        ("wordpress/index.html", "wordpress", "WordPress leftover", "Upload gold as leftover 3× (trap)", "../cnn/index.html", "CNN leftover",
         "WordPress leftover 2005 leftover 999. Not the upload chip.", "Open leftover WordPress"),
        ("cnn/index.html", "cnn", "CNN leftover", "Upload gold as leftover 3× (trap)", "../apple/ipod.html", "iPod leftover",
         "CNN leftover 2005 leftover 999. Not the upload chip.", "Open leftover CNN"),
        ("apple/ipod.html", "ipod", "iPod leftover", "Upload gold as leftover 3× (trap)", "../dailymotion/index.html", "DailyMotion leftover",
         "iPod leftover 2005 leftover 999. Not the upload chip.", "Open leftover iPod"),
        ("dailymotion/index.html", "dailymotion", "DailyMotion leftover", "Upload gold as leftover 3× (trap)", "../vimeo/index.html", "Vimeo leftover",
         "DailyMotion leftover 2005 leftover 999. Not the upload chip.", "Open leftover DailyMotion"),
        ("vimeo/index.html", "vimeo", "Vimeo leftover", "Upload gold as leftover 3× (trap)", "../googlevideo/index.html", "Google Video leftover",
         "Vimeo leftover 2005 leftover 999. Not the upload chip.", "Open leftover Vimeo"),
        ("googlevideo/index.html", "googlevideo", "Google Video leftover", "Upload gold as leftover 3× (trap)", "../earth/index.html", "Earth leftover",
         "Google Video leftover 2005 leftover 999. Not the upload chip.", "Open leftover Google Video"),
        ("earth/index.html", "earth", "Earth leftover", "Street View 2007 as 2005 (trap)", "../mashable/index.html", "Mashable leftover",
         "Google Earth leftover 2005 leftover 999. Street View is 2007. Never write itt05-maps.", "Open leftover Earth"),
        ("mashable/index.html", "mashable", "Mashable leftover", "Upload gold as leftover 3× (trap)", "../programmableweb/index.html", "ProgrammableWeb leftover",
         "Mashable leftover 2005 leftover 999. Not the upload chip.", "Open leftover Mashable"),
        ("programmableweb/index.html", "programmableweb", "ProgrammableWeb leftover", "Upload gold as leftover 3× (trap)", "../kayak/index.html", "Kayak leftover",
         "ProgrammableWeb leftover 2005 leftover 999. Not the upload chip.", "Open leftover ProgrammableWeb"),
    ],
    "2006": [
        ("youtube/index.html", "youtube", "YouTube leftover", "YouTube official as leftover 3× (trap)", "../facebook/index.html", "Facebook leftover",
         "YouTube leftover 2006 leftover 3×. Official dest is leftover 3× weather. Never write itt06-yt.", "Watch leftover"),
        ("facebook/index.html", "facebook", "Facebook leftover", "News Feed official as leftover 3× (trap)", "../wikipedia/index.html", "Wikipedia leftover",
         "Facebook leftover 2006 leftover 3×. News Feed official is another dest machine. Never write itt06-feed / itt06-fb-open.", "Open leftover Facebook"),
    ],
}

STARS = {
    "2005": "Upload",
    "2006": "Twttr",
}


def first_block(year, pop_id, keep, trap, nxt, nxt_l, weather, verb):
    star = STARS[year]
    key = f"itt{year[2:]}-pop-{pop_id}"
    return f"""<!-- {MARK}:{pop_id}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1">
<p><b>{keep}</b> · leftover 3× · {star} is the chip · incomplete never writes · <code>{key}</code></p>
<p>{weather}</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{keep}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>Caption <input type="text" data-pop-field placeholder="{keep}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {weather.split('.')[0]}. Never write gold.</label>
<p><button type="button" data-pop-go data-pop-id="{pop_id}">{verb}</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nxt_l}</a></p>
</div>
<!-- {MARK}:{pop_id}:end -->
"""


def fix_lo_verbs():
    n = 0
    for year, dests in KEEP_LO_FIX.items():
        for dest, (wrong, right) in dests.items():
            p = ROOT / "years" / year / "sites" / dest / "index.html"
            if not p.exists():
                raise SystemExit(f"missing {p}")
            html = p.read_text(encoding="utf-8")
            # only leftover-2× / leftover-4× button labels, not leftover 3× 2×
            def repl(m):
                return m.group(0).replace(wrong, right)
            new, c = re.subn(
                rf'(<(?:button)[^>]*data-lo-save[^>]*>){re.escape(wrong)}(</button>)',
                rf'\1{right}\2',
                html,
            )
            if c:
                html = new
                n += c
                p.write_text(html, encoding="utf-8")
    print(f"leftover-2× dest-true verbs {n}")


def paint_first_pack():
    n = 0
    for year, rows in FIRST_PACK.items():
        for page, pop_id, keep, trap, nxt, nxt_l, weather, verb in rows:
            p = ROOT / "years" / year / "sites" / page
            if not p.exists():
                raise SystemExit(f"missing {p}")
            html = p.read_text(encoding="utf-8")
            html = re.sub(rf"<!-- {MARK}:{pop_id}:start -->[\s\S]*?<!-- {MARK}:{pop_id}:end -->\n?", "", html)
            if f'data-pop-id="{pop_id}"' in html and "data-pop-go" in html:
                print(f"skip already has leftover 3× dest machine {year}/{page}")
                continue
            block = first_block(year, pop_id, keep, trap, nxt, nxt_l, weather, verb)
            m = re.search(rf'<script\b[^>]*src="[^"]*immersion-{year}\.js"[^>]*>\s*</script>', html)
            if m:
                html = html[: m.start()] + block + html[m.start() :]
            elif "</body>" in html:
                html = html.replace("</body>", block + "</body>", 1)
            else:
                html += block
            if f'data-itt-year="{year}"' not in html[:500]:
                html = re.sub(r"<html\b", f'<html data-itt-year="{year}"', html, count=1)
            p.write_text(html, encoding="utf-8")
            n += 1
    print(f"leftover 3× first-pack dest machines {n}")


def main():
    fix_lo_verbs()
    paint_first_pack()
    print("broken leftover 3× / leftover-2× dest verbs fixed")


if __name__ == "__main__":
    main()
