#!/usr/bin/env python3
"""Replace 2006 mock leftover plaques with period product theaters.

Keeps leftover-official + 4× + pop panels so e2e still walks them.
Visitor-first click is the product (watch / digg / type / put / subscribe).
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITES = ROOT / "years" / "2006" / "sites"

THEATERS = {
    "youtube": """
<div class="yt-wrap" style="max-width:52em;margin:12px auto;font-family:Arial,Helvetica,sans-serif;font-size:13px">
<p>Independent until <b>9 Oct</b>. Flash player. Brand stays YouTube. Google-owned as a January fact is the trap.</p>
<div data-yt-list class="yt-grid"></div>
<div data-yt-player class="yt-player-stage" style="background:#111;color:#fff;height:180px;text-align:center;padding-top:70px;margin:10px 0">Flash theater · click a clip then Watch</div>
<p><button type="button" data-yt06-watch>Watch this clip</button>
<button type="button" data-yt06-trap>Google already owns YouTube (March)</button>
<span data-yt06-status data-yt-status></span></p>
<p class="honest" style="font-size:12px">Empty Watch never writes. Pick a clip first.</p>
</div>
""",
    "digg": """
<div class="dg-wrap" style="max-width:52em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>2006 peak. Digg or bury a seed. Digg <b>v4 is 2010</b> — not this room.</p>
<div data-digg-list></div>
<p class="honest" style="font-size:12px">Use Digg / Bury on a story. Empty never writes.</p>
</div>
""",
    "docs": """
<div class="docs-shell">
<p>Writely bought 9 Mar. Docs &amp; Spreadsheets <b>10 Oct</b>. Type in the browser — not a desktop install.</p>
<form data-docs-save>
<p><label>Title<br><input type="text" name="title" data-docs-title maxlength="80" placeholder="Untitled document"></label></p>
<p><textarea name="body" data-docs-body rows="8" style="width:95%;min-height:180px" placeholder="Type in the browser…"></textarea></p>
<p><button type="submit">Save document</button> <span data-docs-status></span></p>
</form>
<p>Shared with</p>
<ul data-docs-collab></ul>
</div>
""",
    "aws": """
<div class="aws-shell">
<p>S3 <b>14 Mar</b> · $0.15/GB-mo · 5 GB objects. Developers, not shoppers. EC2 is an August limited beta.</p>
<table border="1" cellpadding="4" cellspacing="0"><thead><tr><th>Bucket</th><th>Region</th><th>Objects</th></tr></thead>
<tbody data-aws-buckets></tbody></table>
<form data-aws-create>
<p><label>Bucket name<br><input type="text" name="name" maxlength="40" placeholder="my-startup-assets"></label></p>
<p><button type="submit">Put bucket (theater)</button> <span data-aws-status></span></p>
</form>
<p class="honest" style="font-size:12px">Empty name still makes a “bucket” theater name. Consumer AWS console is the trap — not on this page.</p>
</div>
""",
    "reader": """
<div class="rd-wrap" style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>RSS in a Gmail-ish shell by September. Mark unread leftover. Feedly is 2013.</p>
<ul data-reader-subs></ul>
<div data-reader-items></div>
<form data-reader-add>
<p><label>Feed<br><input type="text" name="feed" maxlength="80" placeholder="http://leftover.example"></label></p>
<p><button type="submit">Add subscription</button> <span data-reader-status></span></p>
</form>
</div>
""",
    "reddit": """
<div class="rd-wrap" style="max-width:46em;margin:12px auto;font-family:Verdana,Arial,sans-serif;font-size:13px">
<p>Still sparse next to Digg. Boost a leftover link. Awards / 2020 redesign never write.</p>
<div data-reddit-list></div>
</div>
""",
    "time-you": """
<div class="ty-wrap" style="max-width:46em;margin:12px auto;font-family:Georgia,serif;font-size:15px">
<p>December. <i>You</i> are Person of the Year. Lev Grossman. No invented cover pixels.</p>
<p>[failed-final] Time issue theater</p>
<p><button type="button" data-ty06-open>Open the issue</button>
<button type="button" data-ty06-trap>Download the official cover JPEG</button>
<span data-ty06-status></span></p>
<p class="honest" style="font-size:12px">Open is the leftover verb. Invented pixels never write.</p>
</div>
""",
    "facebook-feed": """
<div class="fb-feed" style="max-width:46em;margin:12px auto;font-family:Tahoma,Arial,sans-serif;font-size:13px;background:#fff;border:1px solid #8b9dc3;padding:10px">
<p style="background:#3b5998;color:#fff;padding:6px 8px;margin:-10px -10px 10px">facebook · News Feed</p>
<p>5 Sep stream. Click a story. Hide / ignore backlash never writes. Campus-only after 26 Sep is a lie.</p>
<div data-fb-feed></div>
<p><button type="button" data-feed-hide>Hide News Feed (trap)</button>
<span data-feed-status></span></p>
<form data-fb-status-post>
<p><textarea name="status" maxlength="200" placeholder="What's on your mind?"></textarea></p>
<p><button type="submit">Share</button> <span data-fb-feed-status></span></p>
</form>
</div>
""",
    "flickr": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Yahoo photostream. Tag a leftover still. Not the chip.</p>
<div data-flickr-stream></div>
<form data-flickr-upload>
<p><input type="text" name="title" maxlength="60" placeholder="saturday market"></p>
<p><button type="submit">Upload (theater)</button> <span data-flickr-status></span></p>
</form>
</div>
""",
    "maps": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Slippy map leftover. <b>No Street View. No pegman.</b> Pegman is May 2007.</p>
<p><input type="text" data-p06-field maxlength="60" placeholder="san francisco"></p>
<p><button type="button" data-p06-go data-p06-key="maps-go">Search the map</button>
<button type="button" data-p06-trap>Drop pegman</button>
<span data-p06-status></span></p>
</div>
""",
    "gmail": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Still invite-ish. Open-to-all is <b>14 Feb 2007</b>.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="friend@college.edu"></p>
<p><button type="button" data-p06-go data-p06-key="gmail-compose">Compose leftover</button>
<button type="button" data-p06-trap>Anyone can sign up</button>
<span data-p06-status></span></p>
</div>
""",
    "myspace": """
<div style="max-width:46em;margin:12px auto;font-family:Verdana,sans-serif;font-size:13px;background:#e5e5e5;padding:10px">
<p>Still mass social. News Corp. Edit a profile leftover.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="Tom is still your first friend"></p>
<p><button type="button" data-p06-go data-p06-key="ms-profile">Save profile</button>
<span data-p06-status></span></p>
</div>
""",
    "amazon": """
<div style="max-width:46em;margin:12px auto;font-family:Verdana,sans-serif;font-size:13px">
<p>Continuity cart. Not the 1995 SSL gold.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="Web 2.0 book"></p>
<p><button type="button" data-p06-go data-p06-key="cart-add">Add to cart</button>
<span data-p06-status></span></p>
</div>
""",
    "wikipedia": """
<div style="max-width:46em;margin:12px auto;font-family:sans-serif;font-size:13px">
<p>Cite a leftover article. Not the 2001 gold.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="web 2.0"></p>
<p><button type="button" data-p06-go data-p06-key="wiki-cite-go">Cite</button>
<span data-p06-status></span></p>
</div>
""",
    "wordpress": """
<div style="max-width:46em;margin:12px auto;font-family:Georgia,serif;font-size:15px">
<p>Hosted blog leftover. Publish a title.</p>
<p><input type="text" data-p06-field maxlength="60" placeholder="hello weblog"></p>
<p><button type="button" data-p06-go data-p06-key="wp-pub">Publish</button>
<span data-p06-status></span></p>
</div>
""",
    "delicious": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Yahoo bookmarks. Tag a leftover URL.</p>
<p><input type="text" data-p06-field maxlength="60" placeholder="twitter 140"></p>
<p><button type="button" data-p06-go data-p06-key="deli-save">Save bookmark</button>
<span data-p06-status></span></p>
</div>
""",
    "bebo": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px;color:#fff">
<p>School network mass outside Facebook colleges.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="school"></p>
<p><button type="button" data-p06-go data-p06-key="bebo-name">Name a profile</button>
<span data-p06-status></span></p>
</div>
""",
    "slideshare": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Decks on the web. Title a leftover deck.</p>
<p><input type="text" data-p06-field maxlength="60" placeholder="startup deck"></p>
<p><button type="button" data-p06-go data-p06-key="slides-up">Upload deck (theater)</button>
<span data-p06-status></span></p>
</div>
""",
    "newsvine": """
<div style="max-width:46em;margin:12px auto;font-family:Georgia,serif;font-size:15px">
<p>Seed a headline. Comments leftover.</p>
<p><input type="text" data-p06-field maxlength="80" placeholder="local vote"></p>
<p><button type="button" data-p06-go data-p06-key="nv-seed">Seed</button>
<span data-p06-status></span></p>
</div>
""",
    "wikileaks": """
<div style="max-width:46em;margin:12px auto;font-family:Georgia,serif;font-size:14px">
<p>Oct 2006 class. Read leftover. No invented mark.</p>
<p><button type="button" data-p06-go data-p06-key="wl-read" data-p06-min="0">Read the leak theater</button>
<button type="button" data-p06-trap>Download classified files</button>
<span data-p06-status></span></p>
</div>
""",
    "meebo": """
<div style="max-width:46em;margin:12px auto;font-family:Tahoma,sans-serif;font-size:13px">
<p>Web IM in the browser. Send a leftover line.</p>
<p><input type="text" data-p06-field maxlength="80" placeholder="you there?"></p>
<p><button type="button" data-p06-go data-p06-key="meebo-send">Send</button>
<span data-p06-status></span></p>
</div>
""",
    "huffpost": """
<div style="max-width:46em;margin:12px auto;font-family:Georgia,serif;font-size:16px">
<p>May 2006 launch. Open a leftover headline.</p>
<p><input type="text" data-p06-field maxlength="80" placeholder="off the bus"></p>
<p><button type="button" data-p06-go data-p06-key="huff-open">Open headline</button>
<span data-p06-status></span></p>
</div>
""",
    "firefox": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Firefox 2 · <b>24 Oct</b>. Mass default stays IE6.</p>
<p><button type="button" data-p06-go data-p06-key="fx2-dl" data-p06-min="0">Download Firefox 2 (theater)</button>
<button type="button" data-p06-trap>Make Chrome the default</button>
<span data-p06-status></span></p>
</div>
""",
    "calendar": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Google Calendar · <b>13 Apr 2006</b>. Add an event leftover.</p>
<p><input type="text" data-p06-field maxlength="60" placeholder="dentist 13 Apr"></p>
<p><button type="button" data-p06-go data-p06-key="gcal-add">Add event</button>
<span data-p06-status></span></p>
</div>
""",
    "secondlife": """
<div style="max-width:46em;margin:12px auto;font-family:Verdana,sans-serif;font-size:13px">
<p>2006 mainstream peak. Teleport leftover. Not the chip.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="help island"></p>
<p><button type="button" data-p06-go data-p06-key="sl-tp">Teleport</button>
<span data-p06-status></span></p>
</div>
""",
    "skype": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>eBay-owned IM. Call leftover. Not a 2006 launch.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="echo123"></p>
<p><button type="button" data-p06-go data-p06-key="sk-call">Call</button>
<span data-p06-status></span></p>
</div>
""",
    "msn": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Portal channel leftover.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="news"></p>
<p><button type="button" data-p06-go data-p06-key="msn-ch">Open channel</button>
<span data-p06-status></span></p>
</div>
""",
    "ask": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Ask leftover query. Not the chip.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="what is twitter"></p>
<p><button type="button" data-p06-go data-p06-key="ask-q">Ask</button>
<span data-p06-status></span></p>
</div>
""",
    "aol": """
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p>Screen-name leftover.</p>
<p><input type="text" data-p06-field maxlength="40" placeholder="screen name"></p>
<p><button type="button" data-p06-go data-p06-key="aol-sn">Sign on leftover</button>
<span data-p06-status></span></p>
</div>
""",
    "facebook": """
<div style="max-width:46em;margin:12px auto;font-family:Tahoma,sans-serif;font-size:13px;background:#fff;border:1px solid #8b9dc3;padding:10px">
<p>Open registration <b>26 Sep</b>. Geographic networks. Campus-only after that date is a lie. Feed is the leftover dest.</p>
<form data-fb-open-register>
<p><input type="text" name="name" maxlength="40" placeholder="your name"></p>
<p><input type="text" name="email" maxlength="60" placeholder="you@example.com"></p>
<p><input type="text" name="network" maxlength="40" placeholder="San Francisco"></p>
<p><button type="submit">Register (open)</button>
<button type="button" data-p06-trap>College email only</button>
<span data-fb-open-status></span></p>
</form>
<p><a href="feed.html">News Feed leftover →</a></p>
</div>
""",
}


LO_LABEL = {
    "youtube": ("Watch leftover", "This clip is independent until Oct. Google-owned as January is the trap.", "watch", "Watch"),
    "digg": ("Digg this leftover", "2006 peak · not Digg v4 (2010).", "digg", "Digg it"),
    "reddit": ("Boost leftover", "Sparse 2006 front. Awards never write.", "sub", "Boost"),
    "docs": ("Save this leftover doc", "Type in the browser. Desktop Office-only is the trap.", "doc", "Save doc"),
    "aws": ("Put leftover object", "S3 theater. Consumer console is the trap.", "s3", "Put object"),
    "reader": ("Subscribe leftover", "Add a feed. Feedly 2013 never writes.", "feed", "Subscribe"),
    "time-you": ("Open leftover issue", "You · Dec 2006. No invented cover.", "you", "Open issue"),
}


def extract_tail(html: str) -> str:
    """Keep lo/4x/pop/script/also from the existing dest."""
    m = re.search(
        r'(<div data-lo-panel|<div class="itt-pop3"|<div class="itt-5x-loop"|<!-- ITT-4X:)',
        html,
    )
    if not m:
        m = re.search(r"<script src=", html)
    if not m:
        return html
    tail = html[m.start() :]
    tail = tail.replace(">Save leftover<", ">Save period leftover<")
    tail = tail.replace(">Do leftover<", ">Second leftover pack<")
    tail = tail.replace(">Confirm leftover<", ">Second leftover pack<")
    tail = tail.replace(">Open leftover<", ">Popular leftover<")
    return tail


def patch(slug: str, theater_key: str | None = None) -> None:
    path = SITES / slug / ("feed.html" if theater_key == "facebook-feed" else "index.html")
    html = path.read_text(encoding="utf-8")
    key = theater_key or slug
    theater = THEATERS.get(key)
    if not theater:
        print("skip", slug)
        return
    # Relabel leftover-official ticks to year-true copy (keep data-lo-*)
    if slug in LO_LABEL:
        title, honest, _need, btn = LO_LABEL[slug]
        html = re.sub(
            r"<h2 style=\"margin:0 0 8px;font-size:16px\">[^<]+</h2>",
            f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>',
            html,
            count=1,
        )
        html = html.replace(
            "Period verb · incomplete never writes · not the Twttr chip.",
            honest,
        )
        html = html.replace(
            ">2006 leftover · not the chip.</label>",
            f">{honest[:70]}</label>",
        )
        html = html.replace(">Save leftover<", f">{btn}<")
        html = html.replace(">Save period leftover<", f">{btn}<")
    tail = extract_tail(html)
    # Rebuild head through h1/blurb, then theater, then tail
    head_m = re.search(r"(<p class=\"crumb\">[\s\S]*?</p>\s*<h1>[^<]+</h1>\s*<p>[^<]*</p>)", html)
    if not head_m:
        print("no head", slug, path)
        return
    prefix = html[: head_m.end()]
    new = prefix + "\n" + theater + "\n" + tail
    path.write_text(new, encoding="utf-8")
    print("ok", path.relative_to(ROOT))


def main() -> None:
    for slug in THEATERS:
        if slug == "facebook-feed":
            patch("facebook", "facebook-feed")
        else:
            patch(slug)
    # Twitter: keep gold, just relabel 4× as second pack
    tw = SITES / "twitter" / "index.html"
    t = tw.read_text(encoding="utf-8")
    t = t.replace(">Do leftover<", ">Second leftover pack<")
    tw.write_text(t)
    print("ok twitter labels")


if __name__ == "__main__":
    main()
