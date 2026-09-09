#!/usr/bin/env python3
"""Dest-true leftover-3× machines for 2011–2015. No new folders. Skip 2010/2013."""
from __future__ import annotations

import json
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
old_spec = importlib.util.spec_from_file_location("old", ROOT / "scripts/implement-2006-2010-lo3x-real.py")
old = importlib.util.module_from_spec(old_spec)
old_spec.loader.exec_module(old)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-2010-2015-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

DEFAULT = dict(old.DEFAULT)
DEFAULT.update(
    {
        "icloud": ("open leftover Photo Stream then honesty", "Photo Stream", "iCloud leftover", "iCloud-as-gold (trap)"),
        "kindlefire": ("open leftover Silk then shop theater", "Kindle Fire", "Kindle Fire leftover", "empty (trap)"),
        "twitch": ("open leftover channel then watch theater", "channel", "Twitch leftover", "live-Twitch (trap)"),
        "gmusic": ("search leftover track then play theater", "track", "Google Music leftover", "Spotify-US-as-gold (trap)"),
        "android4": ("open leftover ICS then honesty", "ICS", "Android 4 leftover", "empty (trap)"),
        "lion": ("open leftover Lion notes then honesty", "Lion", "OS X Lion leftover", "empty (trap)"),
        "qwikster": ("queue leftover DVD then split honesty", "DVD", "Qwikster leftover", "Qwikster-as-gold (trap)"),
        "airbnb": ("request leftover stay then host note", "stay", "Airbnb leftover", "Airbnb-as-gold (trap)"),
        "drawsomething": ("draw leftover word then send theater", "word", "Draw Something leftover", "empty (trap)"),
        "googledrive": ("title leftover file then share theater", "file", "Drive leftover", "Docs-as-Drive (trap)"),
        "snapchat": ("send leftover snap then honesty", "snap", "Snap leftover", "Stories-as-2012 (trap)"),
        "uber": ("request leftover ride then theater", "ride", "Uber leftover", "live-charge (trap)"),
        "buzzfeed": ("open leftover listicle then share", "listicle", "BuzzFeed leftover", "empty (trap)"),
        "soundcloud": ("play leftover track then honesty", "track", "SoundCloud leftover", "empty (trap)"),
        "surface": ("open leftover Surface then honesty", "Surface", "Surface leftover", "empty (trap)"),
        "trello": ("title leftover board then card theater", "board", "Trello leftover", "empty (trap)"),
        "lyft": ("request leftover ride then theater", "ride", "Lyft leftover", "live-charge (trap)"),
        "waze": ("route leftover then drive theater", "route", "Waze leftover", "empty (trap)"),
        "medium": ("title leftover post then publish theater", "post", "Medium leftover", "public-as-2012 (trap)"),
        "path": ("add leftover friend then honesty", "friend", "Path leftover", "empty (trap)"),
        "flipboard": ("flip leftover magazine then honesty", "magazine", "Flipboard leftover", "empty (trap)"),
        "windows8": ("open leftover Start screen then honesty", "Start", "Windows 8 leftover", "empty (trap)"),
        "musically14": ("record leftover 15s then honesty", "clip", "musical.ly leftover", "TikTok-as-2014 (trap)"),
        "truecrypt": ("open leftover TrueCrypt then honesty", "volume", "TrueCrypt leftover", "empty (trap)"),
        "oculus": ("open leftover Rift leftover then honesty", "Rift", "Oculus leftover", "empty (trap)"),
        "serial": ("play leftover episode then honesty", "episode", "Serial leftover", "empty (trap)"),
        "ello": ("name leftover profile then post theater", "profile", "Ello leftover", "empty (trap)"),
        "heartbleed": ("rotate leftover then honesty", "rotate", "Heartbleed leftover", "exploit (trap)"),
        "icebucket": ("nominate leftover then honesty", "nominate", "Ice Bucket leftover", "empty (trap)"),
        "material": ("open leftover Material then honesty", "Material", "Material leftover", "empty (trap)"),
        "slack": ("open leftover #general then honesty", "#general", "Slack leftover", "Slack-as-gold (trap)"),
        "meerkat": ("go leftover live then honesty", "live", "Meerkat leftover", "Periscope-as-leftover (trap)"),
        "applemusicsub": ("start leftover trial then honesty", "trial", "Music leftover", "empty (trap)"),
        "win10get": ("open leftover GWX then honesty", "GWX", "Get Windows 10 leftover", "Win10-as-gold (trap)"),
        "vine": ("hold leftover 6s then post theater", "6s", "Vine leftover", "empty (trap)"),
        "echo": ("ask leftover Alexa then honesty", "Alexa", "Echo leftover", "empty (trap)"),
        "tinder": ("swipe leftover then honesty", "swipe", "Tinder leftover", "empty (trap)"),
        "googlephotos": ("upload leftover then honesty", "photo", "Photos leftover", "Photos-as-gold (trap)"),
        "windows10": ("open leftover Start then honesty", "Start", "Windows 10 leftover", "Win10-as-gold (trap)"),
        "applemusic": ("start leftover radio then honesty", "radio", "Apple Music leftover", "Music-as-gold (trap)"),
        "edge": ("type leftover URL then Go", "url", "Edge leftover", "Edge-as-gold (trap)"),
        "discord": ("join leftover server then honesty", "server", "Discord leftover", "Discord-as-gold (trap)"),
        "letsencrypt": ("issue leftover cert then honesty", "cert", "Let's Encrypt leftover", "LE-as-gold (trap)"),
        "nexus": ("open leftover Nexus then honesty", "Nexus", "Nexus leftover", "empty (trap)"),
        "play": ("search leftover app then get theater", "app", "Play leftover", "empty (trap)"),
        "drivebox": ("title leftover file then share theater", "file", "Drive leftover", "empty (trap)"),
        "tumblr12": ("reblog leftover then honesty", "post", "Tumblr leftover", "empty (trap)"),
        "windows-phone": ("open leftover WP leftover", "WP", "Windows Phone leftover", "empty (trap)"),
        "chromebook": ("open leftover Chromebook then honesty", "Chromebook", "Chromebook leftover", "empty (trap)"),
        "ubercab": ("request leftover UberCab then theater", "ride", "UberCab leftover", "live-charge (trap)"),
        "silk": ("open leftover Silk then honesty", "Silk", "Silk leftover", "empty (trap)"),
        "rdio": ("play leftover album then honesty", "album", "Rdio leftover", "empty (trap)"),
        "jobs": ("open leftover tribute then honesty", "remember", "Jobs leftover", "empty (trap)"),
        "wallet": ("tap leftover Wallet then honesty", "tap", "Wallet leftover", "empty (trap)"),
        "messenger": ("send leftover message then honesty", "message", "Messenger leftover", "empty (trap)"),
        "hbonow": ("watch leftover episode then honesty", "episode", "HBO Now leftover", "empty (trap)"),
        "secret": ("post leftover secret then honesty", "secret", "Secret leftover", "empty (trap)"),
        "titleii": ("open leftover Title II then honesty", "Title II", "Title II leftover", "empty (trap)"),
        "ytgaming": ("open leftover Gaming then honesty", "channel", "YT Gaming leftover", "empty (trap)"),
        "googleplus": ("open leftover Circles then honesty", "Circle", "G+ leftover", "G+-as-gold (trap)"),
    }
)

BEAT = {
    "2011": "2011 leftover. Google+ Circles is the chip. Win7 + IE9. Snap Stories / IG Android are later.",
    "2012": "2012 leftover. Instagram Android is the chip. Vine / Stories are 2013. Win7 residual.",
    "2014": "2014 leftover. WhatsApp Install is the chip. Echo is 2015. Win7 + IE9.",
    "2015": "2015 leftover. Periscope Go LIVE is the chip. Stories-as-2015-default never writes.",
}

STAR_KEY = {
    "2011": "itt11-gplus",
    "2012": "itt12-ig-android",
    "2014": "itt14-wa-install",
    "2015": "itt15-periscope",
}


def truth(slug: str):
    return DEFAULT.get(slug, ("open leftover dest then dest-true verb", "leftover", f"{slug} leftover", "anachronism (trap)"))


def more_href(year: str, slug: str):
    more = ROOT / f"years/{year}/sites/{slug}/more.html"
    if more.is_file():
        return "more.html"
    return None


def real_panel(year: str, slug: str, name: str, kind: str, nxt):
    star = paint.STAR[year]
    verb, ph, keep, trap = truth(slug)
    beat = BEAT[year]
    if kind == "third":
        storage = f"itt{year[2:]}-pop3-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}"'
        mark = "ITT-POP3X-THIRD"
    elif kind == "second":
        storage = f"itt{year[2:]}-pop2-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop2-{slug}"'
        mark = "ITT-POP3X-SECOND"
    else:
        storage = f"itt{year[2:]}-pop-{slug}"
        go = f'data-pop-go data-pop-id="{slug}"'
        mark = "ITT-POP3X-FIRST"
    miss = more_href(year, slug)
    miss_html = ""
    if miss:
        miss_html = (
            f'<p class="itt-lo3x-miss"><b>M2 miss / wall:</b> '
            f'<a href="{miss}" data-itt-lo3x-miss="1">in-year miss / more · never writes leftover-3×</a></p>'
        )
    next_html = ""
    if nxt:
        next_html = (
            f'<p hidden data-next-flow data-next-when-key="{storage}">'
            f'<b>Next:</b> <a href="../{nxt[0]}/index.html">{nxt[1]}</a></p>'
        )
    return f"""<!-- {mark}:{slug}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="{year}" data-itt-lo3x-verb="{verb}" style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{name}</b> · leftover 3× · {year}-true · {star} is the chip · incomplete never writes · <code>{storage}</code></p>
<p data-itt-year-copy>{beat}</p>
<p><b>M3:</b> {verb}. Empty / trap never writes.</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{ph}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>{verb}<br><input type="text" data-pop-field placeholder="{ph}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {beat}</label>
{miss_html}
<p><button type="button" {go}>{keep}</button> <span data-pop-status></span></p>
{next_html}
</div>
<!-- {mark}:{slug}:end -->
"""


def replace_or_insert(path: Path, year: str, slug: str, name: str, kind: str, nxt) -> str:
    if not path.is_file():
        return "missing"
    html = path.read_text(encoding="utf-8", errors="replace")
    mark = {"first": "ITT-POP3X-FIRST", "second": "ITT-POP3X-SECOND", "third": "ITT-POP3X-THIRD"}[kind]
    block = real_panel(year, slug, name, kind, nxt)
    pat = rf"<!-- {mark}:{slug}:start -->.*?<!-- {mark}:{slug}:end -->"
    import re

    if re.search(pat, html, re.S):
        html = re.sub(pat, block.strip(), html, count=1, flags=re.S)
        path.write_text(html, encoding="utf-8")
        return "replaced"
    if re.search(r"</body>", html, re.I):
        html = re.sub(r"</body>", block + "\n</body>", html, count=1, flags=re.I)
    else:
        html += "\n" + block
    path.write_text(html, encoding="utf-8")
    return "inserted"


def write_matrix(rows) -> None:
    out = ROOT / "e2e/2010-2015-leftover-3x.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print("matrix", len(rows), out)


def main() -> None:
    counts = {"replaced": 0, "inserted": 0, "missing": 0}
    rows = []
    for year, plan in paint.PLAN.items():
        for kind in ("first", "second", "third"):
            items = plan[kind]
            for i, (slug, name) in enumerate(items):
                nxt = items[(i + 1) % len(items)]
                path = ROOT / f"years/{year}/sites/{slug}/index.html"
                st = replace_or_insert(path, year, slug, name, kind, nxt)
                counts[st] = counts.get(st, 0) + 1
                print(st, year, kind, slug)
                verb, ph, keep, trap = truth(slug)
                key = {
                    "first": f"itt{year[2:]}-pop-{slug}",
                    "second": f"itt{year[2:]}-pop2-{slug}",
                    "third": f"itt{year[2:]}-pop3-{slug}",
                }[kind]
                rows.append(
                    {
                        "year": year,
                        "kind": kind,
                        "id": slug,
                        "name": name,
                        "key": key,
                        "star": STAR_KEY[year],
                        "verb": verb,
                        "ph": ph,
                        "keep": keep,
                        "trap": trap,
                        "beat": BEAT[year],
                        "miss": more_href(year, slug),
                        "nextId": nxt[0],
                        "href": f"/years/{year}/sites/{slug}/index.html",
                    }
                )
    write_matrix(rows)
    print(counts)


if __name__ == "__main__":
    main()
