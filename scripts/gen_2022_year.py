#!/usr/bin/env python3
"""Generate years/2022 lean door (45 dests, 2020 density, 2021 chrome)."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2022"

OFFICIAL = [
    ("chatgpt", "sites/chatgpt/index.html", "itt22-chatgpt", "ChatGPT Send", "Send", "GPT-4 as 2022 gold (trap)", "Type a prompt. Send writes. Empty / GPT-4 never write."),
    ("wordle", "sites/wordle/index.html", "itt22-wordle", "Wordle leftover", "Share grid leftover", "Wordle as 2022 gold (trap)", "NYT 31 Jan 2022 leftover. Origin is 2021. Not the chip."),
    ("twitter", "sites/twitter/index.html", "itt22-twitter", "Twitter bird leftover", "Post leftover", "X wordmark as 2022 (trap)", "Bird app. Musk close 27 Oct. X is 2023."),
    ("bereal", "sites/bereal/index.html", "itt22-bereal", "BeReal leftover", "2-min drop leftover", "BeReal as 2022 gold (trap)", "2022 peak leftover. Not the chip."),
    ("iphone", "sites/iphone/14.html", "itt22-island", "Dynamic Island leftover", "Look leftover", "Face ID as new (trap)", "iPhone 14 Sep 2022 leftover. Face ID is 2017."),
    ("ftx", "sites/ftx/index.html", "itt22-ftx", "FTX leftover", "Ack leftover", "Live wallet (trap)", "Nov 2022 collapse literacy. No wallet. Not the chip."),
    ("mastodon", "sites/mastodon/index.html", "itt22-mastodon", "Mastodon leftover", "Join leftover", "Twitter is dead (trap)", "Nov–Dec 2022 exodus leftover. Not the chip."),
    ("tiktok", "sites/tiktok/index.html", "itt22-tiktok", "TikTok leftover", "For You leftover", "TikTok as 2022 gold (trap)", "US habit leftover. Not the chip."),
    ("windows11", "sites/windows11/index.html", "itt22-win11", "Windows 11 leftover", "Room leftover", "Win11 as January OS (trap)", "Room. Not January OS. Chrome habit is the shell."),
    ("playable", "sites/playable/game.html", "itt22-game-prompt", "Prompt Queue", "New Game", "ChatGPT Send as the game (trap)", "Year game. Star stays ChatGPT Send."),
]

LO3X_FIRST = [
    ("reddit", "Reddit", "reddit leftover"),
    ("youtube", "YouTube", "Shorts leftover"),
    ("wikipedia", "Wikipedia", "wiki leftover"),
]
LO3X_THIRD = [
    ("instagram", "Instagram", "Reels leftover"),
    ("google", "Google", "search leftover"),
    ("facebook", "Facebook", "app still Facebook"),
]
LEFTOVER = LO3X_FIRST + LO3X_THIRD + [
    ("amazon", "Amazon", "continuity leftover"),
    ("netflix", "Netflix", "password-sharing talk leftover"),
    ("zoom", "Zoom residual", "Leave is 2020 gold"),
    ("chrome", "Chrome habit", "shell leftover"),
    ("windows10", "Windows 10 residual", "still mass leftover"),
    ("apple", "iOS 16 leftover", "island dest is official leftover"),
    ("nyt", "NYT leftover", "Wordle dest is official leftover"),
    ("openai", "OpenAI blog leftover", "Send dest is the star"),
    ("discord", "Discord leftover", "continuity leftover"),
    ("twitch", "Twitch leftover", "continuity leftover"),
    ("spotify", "Spotify leftover", "continuity leftover"),
    ("linkedin", "LinkedIn leftover", "continuity leftover"),
    ("whatsapp", "WhatsApp leftover", "Install is 2014 gold"),
    ("snapchat", "Snapchat leftover", "continuity leftover"),
    ("github", "GitHub leftover", "issue gold is 2008"),
    ("substack", "Substack leftover", "newsletter leftover"),
    ("cohost", "Cohost leftover", "2022 small leftover"),
    ("tumblr", "Tumblr leftover", "continuity leftover"),
    ("pinterest", "Pinterest leftover", "continuity leftover"),
    ("nft", "NFT winter leftover", "literacy leftover"),
    ("coinbase", "Coinbase leftover", "no live wallet"),
    ("layoffs", "Tech layoffs leftover", "literacy leftover"),
    ("youtubeshorts", "YouTube Shorts leftover", "not gold"),
    ("reels", "Instagram Reels leftover", "Reels launched 2020"),
    ("edge", "Edge leftover", "not default gold"),
    ("bluesky", "Bluesky invite leftover", "invite leftover"),
    ("midjourney", "Midjourney leftover", "not ChatGPT Send"),
    ("stablediffusion", "Stable Diffusion leftover", "not ChatGPT Send"),
    ("notion", "Notion leftover", "continuity leftover"),
]

assert len(OFFICIAL) == 10
assert len({x[0] for x in LEFTOVER} | {x[0] for x in OFFICIAL}) == 45, (
    len(LEFTOVER) + len(OFFICIAL),
    len({x[0] for x in LEFTOVER} | {x[0] for x in OFFICIAL}),
)


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def official_html(slug: str, href: str, key: str, title: str, verb: str, trap: str, blurb: str) -> str:
    extra = ""
    if slug == "chatgpt":
        extra = """<div class="gpt22-shell"><div class="gpt22-bar"><span>chat · 30 Nov 2022</span><span>failed-final</span></div>
<div class="gpt22-stage">Type. Send writes. GPT-4 never writes.</div>
<div class="gpt22-dock"><label>Prompt <textarea data-official-need data-official-min="2" maxlength="200" rows="3" placeholder="explain this like I am five"></textarea></label>
<button type="button" data-official-verb>Send</button>
<button type="button" data-official-trap>GPT-4 as 2022 gold (trap)</button></div></div>"""
        field = ""
    elif slug == "playable":
        return f"""<!DOCTYPE html><html lang="en" data-itt-year="2022" data-official-key="{key}"><head><meta charset="utf-8"><title>{title} — 2022</title><link rel="stylesheet" href="../../../../css/period-2022.css"></head><body bgcolor="#f2f2d2" text="#111"><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px"><p class="crumb"><a href="../../pages/home.html">Starting Point</a></p><div data-year-game data-year="2022" data-game-id="prompt"><h1>{title}</h1><p class="itt-pixel-failed" data-itt-capture-cite>[failed-final] Prompt Queue mark · no harvest</p><p>{blurb}</p><p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p><p><button type="button" data-game-start>New Game</button><button type="button" data-official-trap>{trap}</button></p><canvas id="game-canvas" width="400" height="240" style="border:1px solid #333;background:#102030;display:block;margin:8px 0"></canvas><p data-itt-action-status>New Game. Incomplete never writes.</p><p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b><a href="../chatgpt/index.html">★ ChatGPT Send</a></p></div></div><script src="../../../../js/immersion-2022.js"></script></body></html>
"""
    else:
        field = f'<p><label>{title}<br><input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="leftover"></label></p>'
    next_href = "sites/wordle/index.html" if slug == "chatgpt" else "../chatgpt/index.html"
    next_label = "Wordle leftover" if slug == "chatgpt" else "★ ChatGPT Send"
    if slug != "chatgpt":
        next_href = "../chatgpt/index.html"
    honesty = "" if slug == "chatgpt" else ' data-official-honesty="1"'
    return f"""<!DOCTYPE html><html lang="en" data-itt-year="2022" data-official-key="{key}"{honesty}><head><meta charset="utf-8"><title>{title} — 2022</title><link rel="stylesheet" href="../../../../css/period-2022.css"></head><body bgcolor="#111" text="#eee"><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><p class="crumb" style="max-width:720px;margin:12px auto;font-size:12px"><a href="../../pages/home.html">Starting Point</a></p><p class="itt-pixel-failed" data-itt-capture-cite style="max-width:720px;margin:8px auto;font-size:11px">[failed-final] {title} mark · no harvest</p><div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px"><h1>{title}</h1><p>{blurb}</p>{extra}{field}<label style="display:block"><input type="checkbox" data-official-req>2022 leftover honesty. Empty / trap never writes.</label><label style="display:block"><input type="checkbox" data-official-req>ChatGPT Send is the star. This dest never writes <code>itt22-chatgpt</code> unless this is the star dest.</label><p><button type="button" data-official-trap>{trap}</button> <button type="button" data-official-verb>{verb}</button> <span data-official-status></span></p><p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b><a href="{next_href}">{next_label}</a></p></div><script src="../../../../js/immersion-2022.js"></script></body></html>
"""


def leftover_html(slug: str, title: str, blurb: str, lo3x: bool) -> str:
    short = slug[:8].replace("-", "")
    lo3 = ""
    if lo3x:
        lo3 = f"""<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="2022" data-itt-year-copy style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111"><p data-itt-year-copy>2022. ChatGPT Send is the chip. Win10 + Chrome habit.</p><p><b>{title}</b> · incomplete never writes · <code>itt22-pop-{slug}</code></p><p><button type="button" data-pop-pick="keep" data-pop-q="{slug} leftover">{title}</button><button type="button" data-pop-pick="trap" data-pop-trap="1">{title} as gold (trap)</button></p><p><label>{title}<br><input type="text" data-pop-field placeholder="leftover" size="28" maxlength="80"></label></p><label><input type="checkbox" data-pop-req>2022. Empty never writes.</label><label><input type="checkbox" data-pop-req>Incomplete never writes gold.</label><p><button type="button" data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}">{title} leftover</button><span data-pop-status></span></p><p hidden data-next-flow data-next-when-key="itt22-pop-{slug}"><b>Next:</b><a href="../../pages/home.html">Starting Point</a></p></div>"""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<title>{title} — 2022</title>
<link rel="stylesheet" href="../../../../css/period-2022.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>{blurb}. Leftover-2× dest-true. Incomplete never writes. Star stays empty.</p>
<p class="itt-pixel-failed">[failed-final] {title} mark</p>
{lo3}
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="2022" style="margin:14px 0;padding:12px;border:1px dashed #666;background:#fff8dc;font-size:12px">
<p><b>{title} leftover</b> · dest-true · incomplete never writes · <code>itt22-{short}-lx</code></p>
<label style="display:block"><input type="checkbox" data-lo-req>Year. The chip is not this dest.</label>
<label style="display:block"><input type="checkbox" data-lo-req>Empty / trap / 0 ticks never write.</label>
<p>
<button type="button" data-lo-pick="keep">{title} leftover</button>
<button type="button" data-lo-pick="trap">{title} as gold (trap)</button>
</p>
<p><label>honesty<br>
<input type="text" data-lo-field maxlength="80" placeholder="{title} leftover" autocomplete="off">
</label></p>
<p>
<button type="button" data-lo-trap>{title} as gold (trap)</button>
<button type="button" data-lo-save data-lo-key="{short}-lx" data-lo-need-pick="keep">{title} leftover</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt22-{short}-lx"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
</section>
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="2022" style="margin:14px 0;padding:12px;border:1px dashed #666;background:#fff8dc;font-size:12px">
<p><b>{title} cite leftover</b> · dest-true · incomplete never writes · <code>itt22-{short}-d2</code></p>
<label style="display:block"><input type="checkbox" data-lo-req>Second path. Not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req>Incomplete never writes.</label>
<p>
<button type="button" data-lo-pick="keep">{title} cite leftover</button>
<button type="button" data-lo-pick="trap">{title} as gold (trap)</button>
</p>
<p><label>honesty<br>
<input type="text" data-lo-field maxlength="80" placeholder="{title} cite leftover" autocomplete="off">
</label></p>
<p>
<button type="button" data-lo-trap>{title} as gold (trap)</button>
<button type="button" data-lo-save data-lo-key="{short}-d2" data-lo-need-pick="keep">{title} cite leftover</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt22-{short}-d2"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
</section>
</div>
<script src="../../../../js/immersion-2022.js"></script>
</body>
</html>
"""


def main() -> None:
    if Y.exists():
        for p in Y.rglob("*"):
            if p.is_file():
                p.unlink()

    rooms = [o[1] for o in OFFICIAL] + [f"sites/{s}/index.html" for s, _, _ in LEFTOVER]
    rooms += [
        "index.html",
        "pages/home.html",
        "pages/about.html",
        "pages/map.html",
        "pages/whats-new.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
    ]

    write(
        Y / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chrome habit — 2022</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js?v=20260914y22"></script>
<script src="../../ui/year/shell.js?v=20260914y22"></script>
<script>ITT.YearUI.paint("2022");</script>
<script src="../../js/lib/util.js?v=20260914y22"></script>
<script src="../../js/browser-core.js?v=20260914y22"></script>
<script src="../../js/config/2022.js?v=20260914y22"></script>
<script src="../../js/browser-2022.js?v=20260914y22"></script>
</body>
</html>
""",
    )
    write(
        Y / "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2022">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2022</title>
<link rel="stylesheet" href="../../../css/period-2022.css">
<link rel="stylesheet" href="../../../ui/year/start.css?v=20260914quiet">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#e3f2fd">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/ui.js?v=20260914quiet"></script>
<script>ITT.YearUI.paintStart("2022");</script>
<script src="../../../js/immersion-2022.js" defer></script>
</body>
</html>
""",
    )
    write(
        Y / "pages/about.html",
        """<!DOCTYPE html><html lang="en" data-itt-year="2022"><head><meta charset="utf-8"><title>About 2022 — ITU 5.3B / 66%</title><link rel="stylesheet" href="../../../css/period-2022.css"></head><body bgcolor="#f2f2d2" text="#111"><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px"><p class="crumb"><a href="home.html">Starting Point</a></p><h1>About 2022</h1><p><b>You type to a model.</b> Send is the save. Empty and GPT-4 never write. ILS June 2022 websites does not exist.</p><table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px"><tr bgcolor="#e3f2fd"><th>Cite</th><th>Number</th></tr><tr><td>ILS June websites</td><td><b>blank</b> — table ends 2018 at 1,630,322,579 (−8%)</td></tr><tr><td>ILS users</td><td><b>blank</b> — do not invent</td></tr><tr><td>ITU 2022</td><td><b>5.3 billion users / 66%</b></td></tr><tr><td>ChatGPT</td><td><b>30 Nov 2022</b> · Send writes</td></tr></table><p>Shell: Win10 mass · Chrome habit. Win11 is a room.</p><h2>Bans</h2><ul><li>X wordmark · Threads · GPT-4 as the 2022 model · Vision · Bard · invent June 2022 ILS digit · ATT Ask as gold · Zoom Leave as gold · Face ID as new</li></ul><section style="margin:14px 0;padding:10px;border:1px dashed #666"><label style="display:block"><input type="checkbox" data-req data-thesis-req>I read ITU 5.3B / 66%. ILS 2022 cells blank.</label><label style="display:block"><input type="checkbox" data-req data-thesis-req>Send writes. Empty / GPT-4 never write.</label><p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p><p data-itt-real-status></p><p hidden data-next-flow><b>Next:</b><a href="../sites/chatgpt/index.html">★ ChatGPT Send</a></p></section></div><script src="../../../js/immersion-2022.js"></script></body></html>
""",
    )
    map_lis = ['<li><a href="about.html">About</a></li>', '<li><a href="../sites/chatgpt/index.html">★ ChatGPT Send</a></li>']
    for slug, href, _k, title, *_rest in OFFICIAL[1:]:
        map_lis.append(f'<li><a href="../{href}">{title}</a></li>')
    for slug, title, _b in LO3X_FIRST + LO3X_THIRD:
        map_lis.append(f'<li><a href="../sites/{slug}/index.html">{title}</a></li>')
    write(
        Y / "pages/map.html",
        f"""<!DOCTYPE html><html lang="en" data-itt-year="2022"><head><meta charset="utf-8"><title>2022 — UX flow map</title><link rel="stylesheet" href="../../../css/period-2022.css"></head><body bgcolor="#f2f2d2" text="#111"><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px"><h1>2022 flow map</h1><ul>{''.join(map_lis)}</ul></div><script src="../../../js/immersion-2022.js"></script></body></html>
""",
    )
    write(
        Y / "pages/whats-new.html",
        """<!DOCTYPE html><html lang="en" data-itt-year="2022"><head><meta charset="utf-8"><title>What's new — 2022</title><link rel="stylesheet" href="../../../css/period-2022.css"></head><body bgcolor="#f2f2d2" text="#111"><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px"><h1>What's new — 2022</h1><p>CUT-OPEN lean door. ChatGPT Send is the chip. Wordle / bird / BeReal / island leftover. X / Threads / GPT-4 are not this year.</p><p><a href="home.html">Starting Point</a></p></div><script src="../../../js/immersion-2022.js"></script></body></html>
""",
    )
    for name in ("404", "unreachable"):
        write(
            Y / "pages/error" / f"{name}.html",
            f"""<!DOCTYPE html><html lang="en" data-itt-year="2022"><head><meta charset="utf-8"><title>{name} — 2022</title><link rel="stylesheet" href="../../../../css/period-2022.css"></head><body bgcolor="#f2f2d2" text="#111"><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div><div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px"><p class="crumb"><a href="../home.html">Starting Point</a></p><h1>{name} — 2022</h1><p>Museum error room. Not the chip.</p></div><script src="../../../../js/immersion-2022.js"></script></body></html>
""",
        )

    lo3x_slugs = {s for s, _, _ in LO3X_FIRST + LO3X_THIRD}
    for slug, href, key, title, verb, trap, blurb in OFFICIAL:
        write(Y / href, official_html(slug, href, key, title, verb, trap, blurb))
    for slug, title, blurb in LEFTOVER:
        write(Y / "sites" / slug / "index.html", leftover_html(slug, title, blurb, slug in lo3x_slugs))

    dests = sorted(p.name for p in (Y / "sites").iterdir() if p.is_dir())
    htmls = list(Y.rglob("*.html"))
    print(f"dests={len(dests)} html={len(htmls)}")
    assert len(dests) == 45, dests
    assert len(htmls) <= 90, len(htmls)


if __name__ == "__main__":
    main()
