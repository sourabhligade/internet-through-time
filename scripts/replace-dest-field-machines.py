#!/usr/bin/env python3
"""Replace dest-field factory plaques with year-true product machines.

Does not invent brand pixels. Incomplete never writes. Keys stay ittYY-*.
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def page(
    year: str,
    title: str,
    css: str,
    immersion: str,
    heading: str,
    body: str,
    next_href: str,
    next_label: str,
    extra_attr: str = "",
    body_attr: str = "",
) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}" data-itt-primary-year="{year}"{extra_attr}>
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/{css}">
</head>
<body bgcolor="#ffffff" text="#111111" link="#0000cc" vlink="#551a8b"{body_attr}>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="640" align="center" cellpadding="12"><tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">← Starting Point {year}</a> · <a href="index.html">Room home</a></p>
<h1 style="font-size:18px;margin:0 0 8px">{heading}</h1>
{body}
<p style="margin-top:14px;font-size:12px"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</td></tr></table>
<script src="../../../../js/{immersion}" defer></script>
</body>
</html>
"""


def real_form(key: str, fields: list[tuple[str, str, str]], submit: str, hint: str) -> str:
    names = " ".join(n for n, _, _ in fields)
    rows = []
    for name, label, ph in fields:
        rows.append(
            f'<p><label>{label}<br>'
            f'<input type="text" name="{name}" placeholder="{ph}" style="width:70%;padding:4px"></label></p>'
        )
    return (
        f'<form data-itt-real-form data-storage-key="{key}" data-require-name="{names}">\n'
        + "\n".join(rows)
        + f'\n<p><button type="submit">{submit}</button></p>\n'
        f'<p data-itt-action-status style="min-height:1.2em;font-size:12px">{hint}</p>\n'
        f"</form>"
    )


PAGES: dict[str, str] = {}

# --- 1994 ---
PAGES["years/1994/sites/fishcam/still.html"] = page(
    "1994",
    "FishCam still — 1994",
    "period-1995.css",
    "immersion-1994.js",
    "FishCam still",
    """<p>Netscape FishCam: wait for the next tank still, then keep it. No live camera.</p>
<div data-fishcam data-fish-root>
 <p><img data-fish-frame data-frame-0="../../../../assets/gif/broken.gif" width="160" height="120" alt="tank still"></p>
 <p data-fish-label>Frame 1</p>
 <p><button type="button" data-ott-click>Wait for next still</button></p>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> I waited for a second still</label>
 <label style="display:block;margin:6px 0"><input type="checkbox" data-req> Local still · not a live camera</label>
 <p><button type="button" data-itt-real-save data-storage-key="fish-still" data-min-req="2" data-min-clicks="1" data-click-sel="[data-ott-click]">Keep this still</button></p>
 <p data-itt-action-status style="min-height:1.2em;font-size:12px">Wait once + both checks. Incomplete never writes.</p>
</div>""",
    "../csotd/index.html",
    "CSotD guestbook",
)

PAGES["years/1994/sites/iuma/bands.html"] = page(
    "1994",
    "IUMA bands — 1994",
    "period-1995.css",
    "immersion-1994.js",
    "IUMA bands",
    """<p>Internet Underground Music Archive — pick a band and a city. No MP3 payload.</p>
"""
    + real_form(
        "iuma-bands",
        [
            ("band", "Band name", "your band"),
            ("city", "City / scene", "Santa Cruz"),
        ],
        "List this band",
        "Both fields required. Incomplete never writes.",
    ),
    "../csotd/index.html",
    "CSotD guestbook",
)

PAGES["years/1994/sites/iuma/listen.html"] = page(
    "1994",
    "IUMA listen — 1994",
    "period-1995.css",
    "immersion-1994.js",
    "IUMA listen",
    """<p>Helper-app download theater. No ripped audio file.</p>
<div data-iuma-player data-player-mode="download">
 <p><button type="button" data-player-play>Start download helper</button></p>
 <div data-player-bar style="width:200px;height:12px;border:1px solid #000;background:#eee"></div>
 <p data-player-eta></p>
 <p data-player-status></p>
 <p data-player-log></p>
</div>
<form data-itt-real-form data-storage-key="iuma-listen2" data-require-name="track city">
 <p><label>Track title<br><input type="text" name="track" placeholder="demo track" style="width:70%;padding:4px"></label></p>
 <p><label>City<br><input type="text" name="city" placeholder="Santa Cruz" style="width:70%;padding:4px"></label></p>
 <p><button type="submit">Log this listen</button></p>
 <p data-itt-action-status style="min-height:1.2em;font-size:12px">Empty title never writes.</p>
</form>""",
    "../csotd/index.html",
    "CSotD guestbook",
)

PAGES["years/1994/sites/webcrawler/search.html"] = page(
    "1994",
    "WebCrawler search — 1994",
    "period-1995.css",
    "immersion-1994.js",
    "WebCrawler search",
    """<p>Early full-text crawler. Type a query — empty search never writes.</p>
"""
    + real_form(
        "wc-q",
        [
            ("q", "Query", "yahoo"),
            ("hint", "What you hoped to find", "directory vs crawler"),
        ],
        "Search",
        "Query + hint required.",
    ),
    "../csotd/index.html",
    "CSotD guestbook",
)

# --- 1995 ---
PAGES["years/1995/sites/auctionweb/item.html"] = page(
    "1995",
    "AuctionWeb item — 1995",
    "period-1995.css",
    "immersion-1995.js",
    "AuctionWeb item",
    """<p>Person-to-person listing. Never say eBay. Bid must beat the high or nothing writes.</p>
<div data-auction-id="aw-plaque" data-min="5">
 <p>Opening / min <b>$5.00</b> · High <b data-high-bid>$5.00</b> · <span data-high-bidder>(opening)</span></p>
 <form data-bid-form>
  Your name: <input name="bidder" size="24"><br>
  Your bid (USD): $<input name="bid" size="8"><br>
  <button type="submit">Place Bid</button>
 </form>
 <ul data-bid-history></ul>
 <p data-itt-action-status style="font-size:12px">Low / empty bid never writes.</p>
</div>""",
    "../amazon/ssl-checkout.html",
    "SSL checkout",
)

# --- 1996 ---
PAGES["years/1996/sites/geocities/homestead.html"] = page(
    "1996",
    "GeoCities homestead — 1996",
    "period-1996.css",
    "immersion-1996.js",
    "File a homestead",
    """<p>Free neighborhood page. Title + about required. Empty claim never writes.</p>
<form data-homestead-form>
 <p>Neighborhood:
  <select name="neighborhood">
   <option>Hollywood</option><option>SiliconValley</option><option>Area51</option>
   <option>CapitolHill</option><option>SunsetStrip</option>
  </select>
  Street # <input name="number" size="6" placeholder="1234">
 </p>
 <p>Page title<br><input name="title" size="40" placeholder="Welcome to my homepage"></p>
 <p>About<br><textarea name="about" rows="3" cols="48" placeholder="Under construction…"></textarea></p>
 <p><label><input type="checkbox" name="construction"> Under construction gif</label></p>
 <p><button type="submit">Claim homestead</button></p>
 <p data-homestead-status data-itt-action-status></p>
</form>""",
    "../portals/wars.html",
    "Portal wars",
)

PAGES["years/1996/sites/realplayer/buffer.html"] = page(
    "1996",
    "RealPlayer buffer — 1996",
    "period-1996.css",
    "immersion-1996.js",
    "RealPlayer buffer",
    """<p>28.8k stream theater. Skip the plugin nag, then name the clip. No ripped RA.</p>
<div data-plugin-required="RealPlayer">
 <p><a href="#" data-plugin-skip>Skip intro / HTML version</a></p>
 <div data-plugin-panel hidden>
  <p data-plugin-alt>Buffering 28.8… (theater)</p>
 </div>
</div>
"""
    + real_form(
        "real",
        [
            ("clip", "Clip title", "CNN live residual"),
            ("kbps", "Link speed", "28800"),
        ],
        "Log this buffer",
        "Clip + speed required.",
    ),
    "../portals/wars.html",
    "Portal wars",
)

# --- 1997 ---
PAGES["years/1997/sites/apple/thinkdifferent.html"] = page(
    "1997",
    "Think Different — 1997",
    "period-1997.css",
    "immersion-1997.js",
    "Think Different",
    """<p>Campaign literacy — pick a hero and a line. No Apple logo invent.</p>
"""
    + real_form(
        "td",
        [
            ("hero", "Hero on the poster", "Turing / Gandhi / Picasso class"),
            ("line", "The line you remember", "Think different"),
        ],
        "Save campaign note",
        "Both fields required.",
    ),
    "../pointcast/index.html",
    "PointCast",
)

PAGES["years/1997/sites/drudge/story.html"] = page(
    "1997",
    "Drudge story — 1997",
    "period-1997.css",
    "immersion-1997.js",
    "Drudge tip",
    """<p>Tip the report. Headline + source required. No live wire.</p>
"""
    + real_form(
        "drudge",
        [
            ("headline", "Headline", "developing…"),
            ("source", "Source desk", "wires / tipster"),
        ],
        "File tip",
        "Empty headline never writes.",
    ),
    "../pointcast/index.html",
    "PointCast",
)

PAGES["years/1997/sites/ebay/item.html"] = page(
    "1997",
    "eBay item — 1997",
    "period-1997.css",
    "immersion-1997.js",
    "eBay item (black wordmark era)",
    """<p>Black eBay. Bid must beat the high. Name + amount required.</p>
<div data-auction-id="ebay-b" data-min="25">
 <p>High <b data-high-bid>$25.00</b> · <span data-high-bidder>(opening)</span></p>
 <form data-bid-form>
  Bidder: <input name="bidder" size="20"><br>
  Max bid $ <input name="bid" size="8"><br>
  <button type="submit">Place Bid</button>
 </form>
 <ul data-bid-history></ul>
</div>""",
    "../pointcast/index.html",
    "PointCast",
)

PAGES["years/1997/sites/icq/uin.html"] = page(
    "1997",
    "ICQ UIN — 1997",
    "period-1997.css",
    "immersion-1997.js",
    "Get a UIN",
    """<p>Uh-oh. Register a nickname — empty never writes. Theater UIN only.</p>
<form data-icq-register>
 Nickname: <input name="nick" size="20">
 <button type="submit">Register</button>
</form>
<p data-icq-status data-icq-uin-display></p>
<p>Then add a buddy (needs your UIN first):</p>
<form data-icq-buddy-form>
 Buddy UIN: <input name="uin" size="12">
 Nick: <input name="nick" size="14">
 <button type="submit">Add buddy</button>
</form>
<ul data-icq-buddies></ul>""",
    "../pointcast/index.html",
    "PointCast",
)

PAGES["years/1997/sites/slashdot/moderate.html"] = page(
    "1997",
    "Slashdot moderate — 1997",
    "period-1997.css",
    "immersion-1997.js",
    "Moderate",
    """<p data-sd-story="ie4">Score the thread. Empty comment never posts.</p>
<div data-sd-comments></div>
<form data-sd-comment-form>
 Nick: <input name="nick" size="16"><br>
 Subject: <input name="subject" size="32"><br>
 <textarea name="body" rows="4" cols="48" placeholder="Score +1 Insightful…"></textarea><br>
 <button type="submit">Post comment</button>
</form>""",
    "../pointcast/index.html",
    "PointCast",
    body_attr=' data-sd-story="ie4"',
)

# --- 1998 ---
PAGES["years/1998/sites/dmoz/submit.html"] = page(
    "1998",
    "DMOZ submit — 1998",
    "period-1998.css",
    "immersion-1998.js",
    "Suggest a site",
    """<p>Open Directory. URL + category. Editors (theater) review later.</p>
"""
    + real_form(
        "dmoz",
        [
            ("url", "Site URL", "http://www.example.com/"),
            ("cat", "Category", "Computers/Internet"),
        ],
        "Suggest URL",
        "Both fields required.",
    ),
    "../google/lucky.html",
    "I'm Feeling Lucky",
)

PAGES["years/1998/sites/ebay/watch.html"] = page(
    "1998",
    "eBay watch — 1998",
    "period-1998.css",
    "immersion-1998.js",
    "Watch this item",
    """<p>Add to My eBay watch list. Item # + max you would bid.</p>
"""
    + real_form(
        "watch",
        [
            ("item", "Item #", "2847593"),
            ("max", "Max you would bid", "50"),
        ],
        "Add to watch list",
        "Both fields required.",
    ),
    "../google/lucky.html",
    "I'm Feeling Lucky",
)

PAGES["years/1998/sites/mozilla/split.html"] = page(
    "1998",
    "Mozilla split — 1998",
    "period-1998.css",
    "immersion-1998.js",
    "mozilla.org split",
    """<p>Communicator source vs the mozilla.org project. Name the tarball and the license you remember.</p>
"""
    + real_form(
        "moz",
        [
            ("tarball", "What you would download", "mozilla source"),
            ("license", "License class", "NPL / MPL"),
        ],
        "Log the split",
        "Both fields required.",
    ),
    "../google/lucky.html",
    "I'm Feeling Lucky",
)

# --- 1999 ---
PAGES["years/1999/sites/blogger/publish.html"] = page(
    "1999",
    "Blogger publish — 1999",
    "period-1999.css",
    "immersion-1999.js",
    "Publish a post",
    """<p>Pyra Blogger. Body required. Empty never writes. FTP theater.</p>
<form data-blogger-post>
 Title: <input name="title" size="36"><br>
 <textarea name="body" rows="6" cols="52" placeholder="Today I installed…"></textarea><br>
 Link (optional): <input name="link" size="36"><br>
 <button type="submit">Publish</button>
</form>
<p data-blogger-status data-itt-action-status></p>""",
    "../aim/index.html",
    "AIM",
)

PAGES["years/1999/sites/ebay/watch.html"] = page(
    "1999",
    "eBay watch — 1999",
    "period-1999.css",
    "immersion-1999.js",
    "Watch this item",
    """<p>Multicolor eBay era. Item + max. Empty never writes.</p>
"""
    + real_form(
        "ebay",
        [
            ("item", "Item #", "beanie-99"),
            ("max", "Max bid", "12"),
        ],
        "Watch item",
        "Both fields required.",
    ),
    "../aim/index.html",
    "AIM",
)

PAGES["years/1999/sites/y2k/clock.html"] = page(
    "1999",
    "Y2K clock — 1999",
    "period-1999.css",
    "immersion-1999.js",
    "Y2K clock",
    """<p>IT theater — not the crash (that is 2000). Name the system and the fallback.</p>
"""
    + real_form(
        "y2k",
        [
            ("system", "System you would patch", "payroll / BIOS"),
            ("fallback", "Fallback if the clock rolls", "paper / extra staff"),
        ],
        "File contingency",
        "Both fields required.",
    ),
    "../aim/index.html",
    "AIM",
)

# --- 2000 ---
PAGES["years/2000/sites/ebay/dutch.html"] = page(
    "2000",
    "eBay Dutch auction — 2000",
    "period-2000.css",
    "immersion-2000.js",
    "Dutch auction",
    """<p>Qty + price. Empty never writes. Crash-year marketplace, smile Amazon is next door.</p>
"""
    + real_form(
        "dutch",
        [
            ("qty", "Quantity you want", "3"),
            ("price", "Your price each", "8.50"),
        ],
        "Place Dutch bid",
        "Qty + price required.",
    ),
    "../mapquest/index.html",
    "MapQuest",
)

# --- 2001 ---
PAGES["years/2001/sites/movabletype/publish.html"] = page(
    "2001",
    "Movable Type publish — 2001",
    "period-2001.css",
    "immersion-2001.js",
    "Publish (Movable Type)",
    """<p>Title + body. TrackBack is a sibling room. Empty never writes.</p>
"""
    + real_form(
        "mt",
        [
            ("title", "Entry title", "Hello weblog"),
            ("body", "Entry body", "Installed MT tonight…"),
        ],
        "Publish entry",
        "Title + body required.",
    ),
    "../msn/index.html",
    "MSN",
)

PAGES["years/2001/sites/wayback/lookup.html"] = page(
    "2001",
    "Wayback lookup — 2001",
    "period-2001.css",
    "immersion-2001.js",
    "Wayback Machine lookup",
    """<p>Public web archive. URL + date class. No live CDX fetch.</p>
"""
    + real_form(
        "wb",
        [
            ("url", "URL to look up", "http://www.yahoo.com/"),
            ("when", "Date class", "1996-12"),
        ],
        "Look up",
        "URL + date required.",
    ),
    "../msn/index.html",
    "MSN",
)

# --- 2002 ---
PAGES["years/2002/sites/friendster/testimonial.html"] = page(
    "2002",
    "Friendster testimonial — 2002",
    "period-2002.css",
    "immersion-2002.js",
    "Write a testimonial",
    """<p>Friend graph rehearsal. Mass often 2003 — label it. Name + text required.</p>
<form data-friendster-add-form>
 Friend: <input name="fname" size="18"><br>
 Testimonial: <input name="fabout" size="40"><br>
 <button type="submit">Post testimonial</button>
</form>
<p data-friendster-status data-itt-action-status></p>
<div data-friendster-root>
 <ul data-friendster-friends></ul>
</div>""",
    "../stumbleupon/index.html",
    "StumbleUpon",
)

PAGES["years/2002/sites/googlenews/cluster.html"] = page(
    "2002",
    "Google News cluster — 2002",
    "period-2002.css",
    "immersion-2002.js",
    "News cluster",
    """<p>BETA cluster. Headline + outlet. No live feed.</p>
"""
    + real_form(
        "gn",
        [
            ("headline", "Cluster headline", "Mozilla 1.0 ships"),
            ("outlet", "Outlet in the cluster", "Wired / AP"),
        ],
        "Pin this cluster",
        "Both fields required.",
    ),
    "../stumbleupon/index.html",
    "StumbleUpon",
)

# --- 2003 ---
PAGES["years/2003/sites/itunes/song.html"] = page(
    "2003",
    "iTunes Store song — 2003",
    "period-2003.css",
    "immersion-2003.js",
    "99¢ song",
    """<p>Mac-first store. Title required. No real AAC, no charge.</p>
<form data-itunes-buy>
 Track: <input name="title" size="28"><br>
 Artist: <input name="artist" size="28"><br>
 <button type="submit">Buy 99¢</button>
</form>
<p data-itunes-status></p>
<div data-itunes-library></div>""",
    "../photobucket/index.html",
    "Photobucket",
)

PAGES["years/2003/sites/myspace/top8.html"] = page(
    "2003",
    "MySpace Top 8 — 2003",
    "period-2003.css",
    "immersion-2003.js",
    "Top 8",
    """<p>All 8 slots, no duplicates. Incomplete never writes.</p>
<form data-ms-top8>
 <p>
  <select data-ms-top8-slot><option value="">1</option><option>Tom</option><option>Alex</option><option>Sam</option><option>Jordan</option><option>Riley</option><option>Casey</option><option>Morgan</option><option>Quinn</option></select>
  <select data-ms-top8-slot><option value="">2</option><option>Tom</option><option>Alex</option><option>Sam</option><option>Jordan</option><option>Riley</option><option>Casey</option><option>Morgan</option><option>Quinn</option></select>
  <select data-ms-top8-slot><option value="">3</option><option>Tom</option><option>Alex</option><option>Sam</option><option>Jordan</option><option>Riley</option><option>Casey</option><option>Morgan</option><option>Quinn</option></select>
  <select data-ms-top8-slot><option value="">4</option><option>Tom</option><option>Alex</option><option>Sam</option><option>Jordan</option><option>Riley</option><option>Casey</option><option>Morgan</option><option>Quinn</option></select>
 </p>
 <p>
  <select data-ms-top8-slot><option value="">5</option><option>Tom</option><option>Alex</option><option>Sam</option><option>Jordan</option><option>Riley</option><option>Casey</option><option>Morgan</option><option>Quinn</option></select>
  <select data-ms-top8-slot><option value="">6</option><option>Tom</option><option>Alex</option><option>Sam</option><option>Jordan</option><option>Riley</option><option>Casey</option><option>Morgan</option><option>Quinn</option></select>
  <select data-ms-top8-slot><option value="">7</option><option>Tom</option><option>Alex</option><option>Sam</option><option>Jordan</option><option>Riley</option><option>Casey</option><option>Morgan</option><option>Quinn</option></select>
  <select data-ms-top8-slot><option value="">8</option><option>Tom</option><option>Alex</option><option>Sam</option><option>Jordan</option><option>Riley</option><option>Casey</option><option>Morgan</option><option>Quinn</option></select>
 </p>
 <p><button type="button" data-ms-top8-save>Save Top 8</button> <span data-ms-top8-status></span></p>
</form>""",
    "../photobucket/index.html",
    "Photobucket",
)

PAGES["years/2003/sites/wordpress/publish.html"] = page(
    "2003",
    "WordPress publish — 2003",
    "period-2003.css",
    "immersion-2003.js",
    "Publish",
    """<p>Self-hosted. Title + body. Empty never writes.</p>
<form data-wp-publish>
 Title: <input name="title" size="36"><br>
 <textarea name="body" rows="5" cols="48" placeholder="Hello world"></textarea><br>
 <button type="submit">Publish</button>
</form>
<p data-wp-status></p>
<div data-wp-posts></div>""",
    "../photobucket/index.html",
    "Photobucket",
)

# --- 2004 ---
PAGES["years/2004/sites/facebook/poke.html"] = page(
    "2004",
    "thefacebook poke — 2004",
    "period-2004.css",
    "immersion-2004.js",
    "Poke",
    """<p>.edu network poke. Who + campus. Empty never writes. No News Feed (2006).</p>
"""
    + real_form(
        "poke",
        [
            ("who", "Who to poke", "roommate@college.edu"),
            ("campus", "Network", "Harvard / your .edu"),
        ],
        "Poke",
        "Both fields required.",
    ),
    "../facebook/networks.html",
    "Networks",
)

PAGES["years/2004/sites/flickr/fave.html"] = page(
    "2004",
    "Flickr fave — 2004",
    "period-2004.css",
    "immersion-2004.js",
    "Add to faves",
    """<p>Not Yahoo-owned yet. Title + tags. Empty never writes.</p>
<form data-flickr-upload>
 Title: <input name="title" size="28"><br>
 Tags: <input name="tags" size="28" placeholder="cat, sanfrancisco"><br>
 <button type="submit">Fave / keep</button>
</form>
<p data-flickr-status></p>
<div data-flickr-stream></div>""",
    "../facebook/networks.html",
    "thefacebook networks",
)

# --- 2005 ---
PAGES["years/2005/sites/digg/bury.html"] = page(
    "2005",
    "Digg bury — 2005",
    "period-2005.css",
    "immersion-2005.js",
    "Bury",
    """<p>Digg it or bury it. Comment optional after a vote. Independent YouTube is next door.</p>
<div data-digg-list></div>
<p data-digg-status></p>""",
    "../pandora/index.html",
    "Pandora",
)

PAGES["years/2005/sites/maps/drag.html"] = page(
    "2005",
    "Google Maps drag — 2005",
    "period-2005.css",
    "immersion-2005.js",
    "Drag the map",
    """<p>Feb 8 2005 Ajax map. Search a place, then pan. No Street View (2007).</p>
<form data-maps-search>
 <input data-maps-q name="q" size="28" placeholder="San Francisco">
 <button type="submit" data-maps-search>Search</button>
</form>
<p>
 <button type="button" data-maps-pan="w">←</button>
 <button type="button" data-maps-pan="n">↑</button>
 <button type="button" data-maps-pan="s">↓</button>
 <button type="button" data-maps-pan="e">→</button>
 <button type="button" data-maps-zoom="in">+</button>
 <button type="button" data-maps-zoom="out">−</button>
</p>
<div data-maps-canvas style="width:420px;height:220px;border:1px solid #666;background:#cde;position:relative"></div>
<p data-maps-status></p>
<div data-maps-results></div>""",
    "../pandora/index.html",
    "Pandora",
)

PAGES["years/2005/sites/pandora/thumb.html"] = page(
    "2005",
    "Pandora thumb — 2005",
    "period-2005.css",
    "immersion-2005.js",
    "Thumb the station",
    """<p>Create a station, then thumb. No official audio.</p>
<div data-pd-root>
 <form data-pd-create>
  Seed artist/song: <input name="seed" id="ott-field" size="24">
  <button type="submit">Create station</button>
 </form>
 <div data-pd-now></div>
 <p>
  <button type="button" data-pd-play>Play</button>
  <button type="button" data-pd-up>Thumb up</button>
  <button type="button" data-pd-down>Thumb down</button>
  <button type="button" data-pd-skip>Skip</button>
 </p>
 <p data-pd-status data-itt-action-status></p>
</div>""",
    "../pandora/index.html",
    "Pandora",
)


def main() -> int:
    n = 0
    for rel, html in PAGES.items():
        path = ROOT / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(html, encoding="utf-8")
        n += 1
        print("wrote", rel)
    print("replaced", n, "dest-field plaques")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
