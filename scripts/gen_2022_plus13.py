#!/usr/bin/env python3
"""Fill 2022 dest freeze to 98 (13 more leftover rooms)."""
from pathlib import Path

Y = Path(__file__).resolve().parents[1] / "years" / "2022" / "sites"
DESTS = [
    ("yahoo", "Yahoo", "Portal leftover. Follow-a-site continuity."),
    ("bing", "Bing", "Search leftover. Not Bard."),
    ("duckduckgo", "DuckDuckGo", "Search leftover. Not the chip."),
    ("skype", "Skype", "Call leftover. Meet dest is separate."),
    ("lyft", "Lyft", "Ride leftover. Uber dest is separate."),
    ("cashapp", "Cash App", "Pay leftover. No live wallet."),
    ("gitlab", "GitLab", "Repo leftover. GitHub dest is separate."),
    ("quora", "Quora", "Ask leftover. Not the chip."),
    ("stackoverflow", "Stack Overflow", "Ask leftover. Not the chip."),
    ("peacock", "Peacock", "Watch leftover. Not the chip."),
    ("weather", "Weather", "Forecast leftover. Not the chip."),
    ("yelp", "Yelp", "Review leftover. Not the chip."),
    ("booking", "Booking.com", "Stay leftover. Airbnb dest is separate."),
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
<link rel="stylesheet" href="../../../../css/period-2022.css?v=y22p98">
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
    for slug, title, blurb in DESTS:
        if slug in existing:
            raise SystemExit("collision " + slug)
        p = Y / slug / "index.html"
        p.parent.mkdir()
        p.write_text(html(slug, title, blurb), encoding="utf-8")
    dests = [p.name for p in Y.iterdir() if p.is_dir()]
    print("dests", len(dests), "html", len(list(Y.parent.rglob("*.html"))))
    assert len(dests) == 98, len(dests)


if __name__ == "__main__":
    main()
