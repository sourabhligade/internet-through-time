#!/usr/bin/env python3
"""Add 40 more 2022 leftover dest rooms. Does not touch official 10."""
from pathlib import Path

Y = Path(__file__).resolve().parents[1] / "years" / "2022" / "sites"

DESTS = [
    ("gmail", "Gmail", "Inbox leftover. Compose leftover. Not the chip."),
    ("outlook", "Outlook", "Mail leftover. Not the chip."),
    ("slack", "Slack", "Workspace leftover. Not the chip."),
    ("teams", "Microsoft Teams", "Chat leftover. Not the chip."),
    ("meet", "Google Meet", "Join leftover. Zoom Leave is 2020 gold."),
    ("telegram", "Telegram", "Chat leftover. Not the chip."),
    ("signal", "Signal", "15 May delay is 2021 leftover. 2022 continuity."),
    ("messenger", "Messenger", "Chat leftover. Facebook dest is separate."),
    ("ebay", "eBay", "Bid leftover. 2000 ThinkPad dest is another year."),
    ("etsy", "Etsy", "Shop leftover. Not the chip."),
    ("airbnb", "Airbnb", "Stay leftover. Not the chip."),
    ("uber", "Uber", "Ride leftover. Not the chip."),
    ("doordash", "DoorDash", "Order leftover. Not the chip."),
    ("paypal", "PayPal", "Pay leftover. No live wallet."),
    ("venmo", "Venmo", "Pay leftover. No live wallet."),
    ("robinhood", "Robinhood", "Trade leftover. No live brokerage."),
    ("opensea", "OpenSea", "NFT winter leftover. No live mint."),
    ("binance", "Binance", "Crypto leftover. No live wallet."),
    ("dropbox", "Dropbox", "Files leftover. Not the chip."),
    ("drive", "Google Drive", "Files leftover. Not the chip."),
    ("figma", "Figma", "File leftover. Not the chip."),
    ("canva", "Canva", "Design leftover. Not the chip."),
    ("steam", "Steam", "Library leftover. Not the chip."),
    ("epic", "Epic Games", "Store leftover. Not the chip."),
    ("roblox", "Roblox", "Play leftover. Not the chip."),
    ("hulu", "Hulu", "Watch leftover. Not the chip."),
    ("disneyplus", "Disney+", "Continue is 2019 gold. 2022 leftover room."),
    ("hbomax", "HBO Max", "Watch leftover. Max rename is later."),
    ("kick", "Kick", "2022 stream leftover. Not Twitch gold."),
    ("espn", "ESPN", "Scores leftover. Not the chip."),
    ("bbc", "BBC", "News leftover. Not the chip."),
    ("cnn", "CNN", "News leftover. Not the chip."),
    ("archive", "Internet Archive", "Wayback leftover. Not the chip."),
    ("imdb", "IMDb", "Title leftover. Not the chip."),
    ("duolingo", "Duolingo", "Lesson leftover. Not the chip."),
    ("patreon", "Patreon", "Support leftover. Not the chip."),
    ("medium", "Medium", "Read leftover. Not the chip."),
    ("wordpress", "WordPress", "Post leftover. Not the chip."),
    ("craigslist", "Craigslist", "List leftover. Not the chip."),
    ("maps", "Google Maps", "Search leftover. Not the chip."),
]


def short(slug):
    return slug[:8].replace("-", "")


def html(slug, title, blurb):
    s = short(slug)
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<title>{title} — 2022</title>
<link rel="stylesheet" href="../../../../css/period-2022.css?v=y22p40">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="y22-dest">
<h1>{title}</h1>
<p>{blurb}</p>
<p class="itt-pixel-failed">[failed-final] {title} mark · no harvest</p>
<div class="y22-room">
<p>2022 leftover room.</p>
<p><input type="text" maxlength="80" placeholder="{title} leftover" aria-label="{title} leftover"></p>
<p><button type="button" data-y22-room-go>Open leftover</button></p>
<p data-y22-room-out></p>
</div>
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="2022">
<p><b>{title} leftover</b> · <code>itt22-{s}-lx</code></p>
<label><input type="checkbox" data-lo-req>The chip is not this dest.</label>
<label><input type="checkbox" data-lo-req>Empty / trap never write.</label>
<p>
<button type="button" data-lo-pick="keep">{title} leftover</button>
<button type="button" data-lo-pick="trap">{title} as gold</button>
</p>
<p><input type="text" data-lo-field maxlength="80" placeholder="{title} leftover"></p>
<p>
<button type="button" data-lo-trap>Open as gold</button>
<button type="button" data-lo-save data-lo-key="{s}-lx" data-lo-need-pick="keep">{title} leftover</button>
</p>
<p data-lo-status></p>
</section>
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="2022">
<p><b>{title} cite leftover</b> · <code>itt22-{s}-d2</code></p>
<label><input type="checkbox" data-lo-req>Second path. Not the year star.</label>
<label><input type="checkbox" data-lo-req>Incomplete never writes.</label>
<p>
<button type="button" data-lo-pick="keep">{title} cite leftover</button>
<button type="button" data-lo-pick="trap">{title} as gold</button>
</p>
<p><input type="text" data-lo-field maxlength="80" placeholder="{title} cite leftover"></p>
<p>
<button type="button" data-lo-trap>Open as gold</button>
<button type="button" data-lo-save data-lo-key="{s}-d2" data-lo-need-pick="keep">{title} cite leftover</button>
</p>
<p data-lo-status></p>
</section>
</div>
<script src="../../../../js/immersion-2022.js"></script>
</body>
</html>
"""


def main():
    existing = {p.name for p in Y.iterdir() if p.is_dir()}
    written = []
    for slug, title, blurb in DESTS:
        if slug in existing:
            raise SystemExit("collision: " + slug)
        p = Y / slug / "index.html"
        p.parent.mkdir(parents=True)
        p.write_text(html(slug, title, blurb), encoding="utf-8")
        written.append(slug)
    dests = [p.name for p in Y.iterdir() if p.is_dir()]
    htmls = list(Y.parent.rglob("*.html"))
    print("wrote", len(written), "new dests")
    print("total dests", len(dests), "html", len(htmls))
    assert len(dests) == 85, len(dests)
    assert len(htmls) <= 184, len(htmls)


if __name__ == "__main__":
    main()
