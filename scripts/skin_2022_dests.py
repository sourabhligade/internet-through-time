#!/usr/bin/env python3
"""Rewrite 2022 dest HTML as 2022 pages, not black 90s forms."""
from pathlib import Path

Y = Path(__file__).resolve().parents[1] / "years" / "2022" / "sites"

OFFICIAL = {
    "chatgpt",
    "wordle",
    "twitter",
    "bereal",
    "iphone",
    "ftx",
    "mastodon",
    "tiktok",
    "windows11",
    "playable",
}


def leftover(slug, title, blurb):
    short = slug[:8].replace("-", "")
    lo3x = slug in {"reddit", "youtube", "wikipedia", "instagram", "google", "facebook"}
    lo3 = ""
    if lo3x:
        lo3 = f"""<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="2022" data-pop-go-host>
<p>2022 leftover dest-face. ChatGPT Send is the chip.</p>
<p><b>{title}</b> · <code>itt22-pop-{slug}</code></p>
<p><button type="button" data-pop-pick="keep">{title}</button>
<button type="button" data-pop-pick="trap" data-pop-trap="1">{title} as gold (trap)</button></p>
<p><input type="text" data-pop-field placeholder="leftover" maxlength="80"></p>
<label><input type="checkbox" data-pop-req>Empty never writes.</label>
<label><input type="checkbox" data-pop-req>Not the year star.</label>
<p><button type="button" data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}">{title} leftover</button>
<span data-pop-status></span></p>
</div>"""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<title>{title} — 2022</title>
<link rel="stylesheet" href="../../../../css/period-2022.css?v=y22dest">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="y22-dest">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>{blurb}. Not the chip. Incomplete never writes.</p>
<p class="itt-pixel-failed">[failed-final] {title} mark</p>
{lo3}
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="2022">
<p><b>{title} leftover</b> · <code>itt22-{short}-lx</code></p>
<label><input type="checkbox" data-lo-req>The chip is not this dest.</label>
<label><input type="checkbox" data-lo-req>Empty / trap never write.</label>
<p>
<button type="button" data-lo-pick="keep">{title} leftover</button>
<button type="button" data-lo-pick="trap">{title} as gold (trap)</button>
</p>
<p><input type="text" data-lo-field maxlength="80" placeholder="{title} leftover"></p>
<p>
<button type="button" data-lo-trap>{title} as gold (trap)</button>
<button type="button" data-lo-save data-lo-key="{short}-lx" data-lo-need-pick="keep">{title} leftover</button>
</p>
<p data-lo-status></p>
</section>
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="2022">
<p><b>{title} cite leftover</b> · <code>itt22-{short}-d2</code></p>
<label><input type="checkbox" data-lo-req>Second path. Not the year star.</label>
<label><input type="checkbox" data-lo-req>Incomplete never writes.</label>
<p>
<button type="button" data-lo-pick="keep">{title} cite leftover</button>
<button type="button" data-lo-pick="trap">{title} as gold (trap)</button>
</p>
<p><input type="text" data-lo-field maxlength="80" placeholder="{title} cite leftover"></p>
<p>
<button type="button" data-lo-trap>{title} as gold (trap)</button>
<button type="button" data-lo-save data-lo-key="{short}-d2" data-lo-need-pick="keep">{title} cite leftover</button>
</p>
<p data-lo-status></p>
</section>
</div>
<script src="../../../../js/immersion-2022.js"></script>
</body>
</html>
"""


OFFICIAL_HTML = {
    "wordle": """<!DOCTYPE html><html lang="en" data-itt-year="2022" data-official-key="itt22-wordle" data-official-honesty="1"><head><meta charset="utf-8"><title>Wordle leftover — 2022</title><link rel="stylesheet" href="../../../../css/period-2022.css?v=y22dest"></head><body><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><div class="wdl22"><p class="crumb"><a href="../../pages/home.html">Starting Point</a></p><p class="itt-pixel-failed" data-itt-capture-cite>[failed-final] Wordle leftover · NYT 31 Jan 2022 · no harvest</p><h1>WORDLE</h1><p>Leftover. Origin Oct 2021. ChatGPT Send is the chip.</p><div class="wdl22-row"><span class="wdl22-tile"></span><span class="wdl22-tile"></span><span class="wdl22-tile"></span><span class="wdl22-tile"></span><span class="wdl22-tile"></span></div><div class="wdl22-row"><span class="wdl22-tile"></span><span class="wdl22-tile"></span><span class="wdl22-tile"></span><span class="wdl22-tile"></span><span class="wdl22-tile"></span></div><p><input type="text" data-official-need data-official-min="2" maxlength="5" placeholder="guess" aria-label="five letter leftover"></p><label><input type="checkbox" data-official-req>NYT leftover. Empty never writes.</label><label><input type="checkbox" data-official-req>Not the year star.</label><p><button type="button" data-official-trap>Wordle as 2022 gold (trap)</button> <button type="button" data-official-verb>Share grid leftover</button></p><p data-official-status></p></div><script src="../../../../js/immersion-2022.js"></script></body></html>
""",
    "twitter": """<!DOCTYPE html><html lang="en" data-itt-year="2022" data-official-key="itt22-twitter" data-official-honesty="1"><head><meta charset="utf-8"><title>Twitter bird leftover — 2022</title><link rel="stylesheet" href="../../../../css/period-2022.css?v=y22dest"></head><body><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><div class="tw22"><p class="crumb"><a href="../../pages/home.html">Starting Point</a></p><p class="itt-pixel-failed" data-itt-capture-cite>[failed-final] Twitter bird leftover · 27 Oct close · X is 2023</p><h1>Twitter leftover</h1><p>Bird app. Take-private is not a visitor verb. X wordmark never writes.</p><p><textarea data-official-need data-official-min="2" maxlength="280" rows="3" placeholder="What's happening (leftover)"></textarea></p><label><input type="checkbox" data-official-req>Bird leftover. Empty never writes.</label><label><input type="checkbox" data-official-req>X is 2023. Not the chip.</label><p><button type="button" data-official-trap>X wordmark as 2022 (trap)</button> <button type="button" data-official-verb>Post leftover</button></p><p data-official-status></p></div><script src="../../../../js/immersion-2022.js"></script></body></html>
""",
    "bereal": """<!DOCTYPE html><html lang="en" data-itt-year="2022" data-official-key="itt22-bereal" data-official-honesty="1"><head><meta charset="utf-8"><title>BeReal leftover — 2022</title><link rel="stylesheet" href="../../../../css/period-2022.css?v=y22dest"></head><body><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><p class="crumb"><a href="../../pages/home.html">Starting Point</a></p><p class="itt-pixel-failed" data-itt-capture-cite>[failed-final] BeReal leftover · no harvest</p><div class="be22"><div class="be22-cam">front leftover</div><div class="be22-cam">back leftover</div></div><div class="y22-dest"><h1>BeReal leftover</h1><p>2-min drop leftover. Not the chip.</p><p><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="2-min leftover"></p><label><input type="checkbox" data-official-req>Peak leftover. Empty never writes.</label><label><input type="checkbox" data-official-req>Not the year star.</label><p><button type="button" data-official-trap>BeReal as 2022 gold (trap)</button> <button type="button" data-official-verb>2-min drop leftover</button></p><p data-official-status></p></div><script src="../../../../js/immersion-2022.js"></script></body></html>
""",
}


def official_generic(title, key, verb, trap, blurb):
    return f"""<!DOCTYPE html><html lang="en" data-itt-year="2022" data-official-key="{key}" data-official-honesty="1"><head><meta charset="utf-8"><title>{title} — 2022</title><link rel="stylesheet" href="../../../../css/period-2022.css?v=y22dest"></head><body><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><div class="y22-dest"><p class="crumb"><a href="../../pages/home.html">Starting Point</a></p><p class="itt-pixel-failed" data-itt-capture-cite>[failed-final] {title} · no harvest</p><h1>{title}</h1><p>{blurb}</p><p><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="leftover"></p><label><input type="checkbox" data-official-req>2022 leftover. Empty never writes.</label><label><input type="checkbox" data-official-req>ChatGPT Send is the star.</label><p><button type="button" data-official-trap>{trap}</button> <button type="button" data-official-verb>{verb}</button></p><p data-official-status></p></div><script src="../../../../js/immersion-2022.js"></script></body></html>
"""


def main():
    leftovers = {
        "reddit": ("Reddit", "US habit leftover"),
        "youtube": ("YouTube", "Shorts leftover"),
        "wikipedia": ("Wikipedia", "continuity leftover"),
        "instagram": ("Instagram", "Reels leftover"),
        "google": ("Google", "search leftover · Bard is 2023"),
        "facebook": ("Facebook", "app still Facebook"),
        "amazon": ("Amazon", "continuity leftover"),
        "netflix": ("Netflix", "password-sharing talk leftover"),
        "zoom": ("Zoom residual", "Leave is 2020 gold"),
        "chrome": ("Chrome habit", "shell leftover"),
        "windows10": ("Windows 10 residual", "still mass leftover"),
        "apple": ("iOS 16 leftover", "island dest is official leftover"),
        "nyt": ("NYT leftover", "Wordle dest is official leftover"),
        "openai": ("OpenAI blog leftover", "Send dest is the star"),
        "discord": ("Discord leftover", "continuity leftover"),
        "twitch": ("Twitch leftover", "continuity leftover"),
        "spotify": ("Spotify leftover", "continuity leftover"),
        "linkedin": ("LinkedIn leftover", "continuity leftover"),
        "whatsapp": ("WhatsApp leftover", "Install is 2014 gold"),
        "snapchat": ("Snapchat leftover", "continuity leftover"),
        "github": ("GitHub leftover", "issue gold is 2008"),
        "substack": ("Substack leftover", "newsletter leftover"),
        "cohost": ("Cohost leftover", "2022 small leftover"),
        "tumblr": ("Tumblr leftover", "continuity leftover"),
        "pinterest": ("Pinterest leftover", "continuity leftover"),
        "nft": ("NFT winter leftover", "literacy leftover"),
        "coinbase": ("Coinbase leftover", "no live wallet"),
        "layoffs": ("Tech layoffs leftover", "literacy leftover"),
        "youtubeshorts": ("YouTube Shorts leftover", "not gold"),
        "reels": ("Instagram Reels leftover", "Reels launched 2020"),
        "edge": ("Edge leftover", "not default gold"),
        "bluesky": ("Bluesky invite leftover", "invite leftover"),
        "midjourney": ("Midjourney leftover", "not ChatGPT Send"),
        "stablediffusion": ("Stable Diffusion leftover", "not ChatGPT Send"),
        "notion": ("Notion leftover", "continuity leftover"),
    }
    n = 0
    for slug, (title, blurb) in leftovers.items():
        p = Y / slug / "index.html"
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(leftover(slug, title, blurb), encoding="utf-8")
        n += 1
    (Y / "wordle" / "index.html").write_text(OFFICIAL_HTML["wordle"], encoding="utf-8")
    (Y / "twitter" / "index.html").write_text(OFFICIAL_HTML["twitter"], encoding="utf-8")
    (Y / "bereal" / "index.html").write_text(OFFICIAL_HTML["bereal"], encoding="utf-8")
    for slug, title, key, verb, trap, blurb in [
        ("iphone", "Dynamic Island leftover", "itt22-island", "Look leftover", "Face ID as new (trap)", "iPhone 14 Sep 2022 leftover. Face ID is 2017."),
        ("ftx", "FTX leftover", "itt22-ftx", "Ack leftover", "Live wallet (trap)", "Nov 2022 collapse literacy. No wallet."),
        ("mastodon", "Mastodon leftover", "itt22-mastodon", "Join leftover", "Twitter is dead (trap)", "Nov–Dec 2022 exodus leftover."),
        ("tiktok", "TikTok leftover", "itt22-tiktok", "For You leftover", "TikTok as 2022 gold (trap)", "US habit leftover."),
        ("windows11", "Windows 11 leftover", "itt22-win11", "Room leftover", "Win11 as January OS (trap)", "Room. Not January OS."),
    ]:
        path = Y / slug / ("14.html" if slug == "iphone" else "index.html")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(official_generic(title, key, verb, trap, blurb), encoding="utf-8")
        n += 1
    print("wrote leftover+official", n + 3)


if __name__ == "__main__":
    main()
