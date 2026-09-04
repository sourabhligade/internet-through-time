#!/usr/bin/env python3
"""Stamp museum-grade A gaps on existing rooms. No new dest folders. No star moves."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Official dests whose whenKey is not written by gold/extras/4x exact suffix.
MISSING = [
    ("1994", "sites/fishcam/index.html", "itt94-fishcam", "Watch the cam", False),
    ("1994", "sites/whitehouse/index.html", "itt94-wh-map", "Open the tour", False),
    ("1994", "sites/iuma/listen.html", "itt94-iuma", "Listen", False),
    ("1995", "sites/auctionweb/item-laser.html", "itt95-aw-bid", "Bid higher", True),
    ("1995", "sites/geocities/homestead.html", "itt95-homestead", "Claim this homestead", True),
    ("1996", "sites/hotmail/index.html", "itt96-hotmail-user", "Get a free address", True),
    ("1997", "sites/icq/index.html", "itt97-icq-buddy", "Sign on", True),
    ("1997", "sites/slashdot/story.html", "itt97-sd-comments-ie4", "Post a leftover comment", True),
    ("2001", "sites/msn/index.html", "itt01-msn", "Sign on", True),
    ("2009", "sites/farmville/index.html", "itt09-farm", "Plant leftover", False),
    ("2009", "sites/bing/index.html", "itt09-bing", "Search leftover", True),
    ("2009", "sites/iphone/index.html", "itt09-iphone", "Open 3GS leftover", False),
    ("2009", "sites/appstore/index.html", "itt09-apps", "Open leftover catalog", False),
    ("2009", "sites/twitter/index.html", "itt09-tweets", "Post leftover 140", True),
    ("2009", "sites/foursquare/index.html", "itt09-4sq", "Check in leftover", False),
    ("2009", "sites/kickstarter/index.html", "itt09-kickstarter", "Pledge leftover", True),
    ("2010", "sites/ipad/order.html", "itt10-ipad", "Reserve leftover", False),
    ("2010", "sites/facebook/index.html", "itt10-fb-og", "Like leftover", False),
    ("2010", "sites/farmville/index.html", "itt10-farm", "Harvest leftover", False),
    ("2010", "sites/imgur/index.html", "itt10-imgur", "Upload leftover", True),
    ("2010", "sites/foursquare/index.html", "itt10-4sq", "Check in leftover", False),
    ("2010", "sites/twitter/index.html", "itt10-tweets", "Post leftover 140", True),
    ("2011", "sites/spotify/index.html", "itt11-spotify", "Play leftover US catalog", False),
    ("2011", "sites/ipad/index.html", "itt11-ipad2", "Open leftover iPad 2", False),
    ("2011", "sites/twitter/index.html", "itt11-tweets", "Post leftover 140", True),
    ("2012", "sites/pinterest/index.html", "itt12-pin", "Pin leftover", False),
    ("2012", "sites/medium/index.html", "itt12-pop-medium", "Publish leftover", True),
    ("2012", "sites/path/index.html", "itt12-pop-path", "Add leftover", False),
    ("2012", "sites/flipboard/index.html", "itt12-pop-flipboard", "Flip leftover", False),
    ("2013", "sites/snapchat/story.html", "itt13-snap-story", "Add leftover story", False),
    ("2013", "sites/telegram/index.html", "itt13-telegram-chat", "Send leftover", True),
    ("2014", "sites/icebucket/index.html", "itt14-icebucket", "Pour leftover", False),
    ("2014", "sites/iphone/index.html", "itt14-iphone6", "Open leftover 6", False),
    ("2014", "sites/iphone/pay.html", "itt14-applepay", "Pay leftover", False),
    ("2014", "sites/material/index.html", "itt14-material", "Open leftover paper", False),
    ("2014", "sites/slack/index.html", "itt14-slack", "Send leftover", True),
    ("2014", "sites/twitch/index.html", "itt14-twitch", "Go leftover live", False),
    ("2019", "sites/arcade/index.html", "itt19-arcade", "Play leftover", False),
    ("2019", "sites/appletv/index.html", "itt19-appletv", "Continue leftover", False),
    ("2019", "sites/stadia/index.html", "itt19-stadia", "Play leftover", False),
    ("2019", "sites/iphone/iphone11.html", "itt19-iphone11", "Open leftover 11", False),
    ("2019", "sites/airpodspro/index.html", "itt19-airpods-pro", "Pair leftover", False),
]

FELT = {
    "2009": 'Like first: <a href="../sites/facebook/index.html">Facebook Like</a> — two partner pages. Then <a href="../sites/farmville/index.html">FarmVille</a>.',
    "2010": 'Filter then share: <a href="../sites/instagram/index.html">Instagram iOS</a> — empty caption never writes.',
    "2011": 'Circle then hangout: <a href="../sites/googleplus/index.html">Google+</a>. Spotify US is leftover.',
    "2012": 'Android filter: <a href="../sites/instagram/android.html">Instagram Android</a>. IPO is leftover.',
    "2013": 'Hold six seconds: <a href="../sites/vine/record.html">Vine</a> — post without hold never writes.',
    "2014": 'Install, not messenger: <a href="../sites/whatsapp/index.html">WhatsApp Install</a>. Heartbleed is leftover literacy.',
    "2015": 'Title then Go LIVE: <a href="../sites/periscope/index.html">Periscope</a> — empty title never writes.',
    "2016": '24 hours: <a href="../sites/instagram/stories.html">Instagram Stories</a>. Pokémon GO is leftover.',
    "2017": 'Look, then unlock: <a href="../sites/iphone/x.html">Face ID</a> — unlock without look never writes.',
    "2018": 'Manage, do not Accept All: <a href="../sites/gdpr/index.html">GDPR</a>. Accept All never writes.',
    "2019": 'Who’s watching, then Continue: <a href="../sites/disneyplus/home.html">Disney+</a>. Trial never writes.',
}

CITES = [
    ("1994", "sites/csotd/index.html", "Museum reconstruction of Cool Site of the Day guestbook theater. No live vote booth."),
    ("1996", "sites/portals/wars.html", "Museum reconstruction of 1996 portal-wars lobby. Space Jam stays sacred; this card is the star."),
    ("1997", "sites/pointcast/index.html", "Museum reconstruction of PointCast subscribe theater. No live push client."),
    ("1999", "sites/aim/index.html", "Museum reconstruction of AIM Buddy List sign-on. No live OSCAR."),
    ("2009", "sites/facebook/index.html", "Museum reconstruction of 2009 Like on partner pages. No live Graph."),
    ("2011", "sites/googleplus/index.html", "Museum reconstruction of Google+ circles / hangout theater. No live Circles API."),
    ("2013", "sites/vine/record.html", "Museum reconstruction of Vine 6-second hold. No live Vine codec."),
]

SKIP_BTN_ATTR = (
    "data-4x-go",
    "data-lo-save",
    "data-pop-go",
    "data-official-verb",
    "data-lo-trap",
    "data-official-trap",
)


def add_key_to_html(html: str, key: str) -> str:
    if "data-official-key=" in html:
        return html
    return html.replace("<html ", f'<html data-official-key="{key}" ', 1).replace(
        "<html>", f'<html data-official-key="{key}">', 1
    )


def has_verb(html: str) -> bool:
    return "data-official-verb" in html


def mark_existing_button(html: str, label_hint: str) -> str:
    # Prefer a real period button that is not leftover chrome.
    for m in re.finditer(r"<button\b[^>]*>", html, re.I):
        tag = m.group(0)
        if any(a in tag for a in SKIP_BTN_ATTR):
            continue
        if "data-official-verb" in tag:
            return html
        new = tag[:-1] + " data-official-verb>"
        return html[: m.start()] + new + html[m.end() :]
    for m in re.finditer(r"<input\b[^>]*type=\"submit\"[^>]*>", html, re.I):
        tag = m.group(0)
        if any(a in tag for a in SKIP_BTN_ATTR):
            continue
        if "data-official-verb" in tag:
            return html
        new = tag[:-1] + " data-official-verb>"
        return html[: m.start()] + new + html[m.end() :]
    return html


def insert_verb_block(html: str, label: str, need: bool) -> str:
    if has_verb(html):
        return html
    field = ""
    if need:
        field = (
            '<p><label>Period field<br>'
            '<input type="text" data-official-need maxlength="80" autocomplete="off" placeholder="type first"></label></p>\n'
        )
    block = (
        "\n<!-- ITT-OFFICIAL-VERB:start -->\n"
        '<section data-official-machine="1" style="margin:12px 0;padding:8px 10px;border:1px solid #666;'
        'font-family:Arial,sans-serif;font-size:12px;max-width:46em">\n'
        f"{field}"
        f'<p><button type="button" data-official-verb>{label}</button> '
        '<span data-official-status>Period verb. Empty / trap never writes.</span></p>\n'
        "</section>\n"
        "<!-- ITT-OFFICIAL-VERB:end -->\n"
    )
    # After first h1 if present, else after nav-slot
    if "</h1>" in html:
        return html.replace("</h1>", "</h1>" + block, 1)
    if 'id="itt-nav-slot"' in html:
        return re.sub(
            r'(<div id="itt-nav-slot"[^>]*>\s*</div>)',
            r"\1" + block,
            html,
            count=1,
        )
    return html.replace("</body>", block + "</body>", 1)


def stamp_dest(year: str, rel: str, key: str, label: str, need: bool) -> bool:
    path = ROOT / "years" / year / rel
    if not path.exists():
        print("MISSING FILE", path)
        return False
    html = path.read_text(encoding="utf-8", errors="ignore")
    orig = html
    html = add_key_to_html(html, key)
    html = mark_existing_button(html, label)
    if not has_verb(html):
        html = insert_verb_block(html, label, need)
    elif need and "data-official-need" not in html:
        # keep existing button; add need field only if dest already has a text input we can mark
        m = re.search(r"<input\b[^>]*type=\"text\"[^>]*>", html, re.I)
        if m and "data-official-need" not in m.group(0) and "data-4x-field" not in m.group(0) and "data-lo-field" not in m.group(0):
            tag = m.group(0)
            html = html[: m.start()] + tag[:-1] + " data-official-need>" + html[m.end() :]
    if html != orig:
        path.write_text(html, encoding="utf-8")
        return True
    return False


def add_felt(year: str, copy: str) -> bool:
    path = ROOT / "years" / year / "pages" / "home.html"
    if not path.exists():
        return False
    html = path.read_text(encoding="utf-8", errors="ignore")
    if "itt-felt-trail" in html:
        return False
    felt = f'<p class="itt-felt-trail">{copy}</p>\n'
    if 'data-ott-one-thing' in html:
        html = re.sub(
            r'(<p>\s*<a data-ott-one-thing="[^"]+"[^>]*>.*?</p>)',
            r"\1\n" + felt,
            html,
            count=1,
            flags=re.S,
        )
    elif "</script>" in html and "ITT.YearUI.paintStart" in html:
        html = html.replace(
            '<script>ITT.YearUI.paintStart("' + year + '");</script>',
            '<script>ITT.YearUI.paintStart("' + year + '");</script>\n' + felt,
            1,
        )
    else:
        html = html.replace("<div id=\"itt-nav-slot\"", felt + "<div id=\"itt-nav-slot\"", 1)
    if "year-start-quiet.css" not in html:
        html = html.replace(
            "</head>",
            '<link rel="stylesheet" href="../../../css/year-start-quiet.css">\n</head>',
            1,
        )
    path.write_text(html, encoding="utf-8")
    return True


def add_quiet(year: str) -> bool:
    path = ROOT / "years" / year / "pages" / "home.html"
    if not path.exists():
        return False
    html = path.read_text(encoding="utf-8", errors="ignore")
    if "year-start-quiet.css" in html:
        return False
    html = html.replace(
        "</head>",
        '<link rel="stylesheet" href="../../../css/year-start-quiet.css">\n</head>',
        1,
    )
    path.write_text(html, encoding="utf-8")
    return True


def add_cite(year: str, rel: str, text: str) -> bool:
    path = ROOT / "years" / year / rel
    if not path.exists():
        return False
    html = path.read_text(encoding="utf-8", errors="ignore")
    if "archive-residual" in html or "data-itt-capture-cite" in html:
        return False
    cite = (
        f'<p class="archive-residual" data-itt-capture-cite '
        f'style="font-size:11px;margin:10px 0;font-family:Arial,sans-serif">{text}</p>\n'
    )
    if 'id="itt-nav-slot"' in html:
        html = re.sub(
            r'(<div id="itt-nav-slot"[^>]*>\s*</div>)',
            r"\1\n" + cite,
            html,
            count=1,
        )
    else:
        html = html.replace("<body", "<body", 1)
        html = re.sub(r"(<body[^>]*>)", r"\1\n" + cite, html, count=1)
    path.write_text(html, encoding="utf-8")
    return True


def main() -> None:
    n = 0
    for year, rel, key, label, need in MISSING:
        if stamp_dest(year, rel, key, label, need):
            n += 1
            print("stamped", year, rel, key)
    for y, copy in FELT.items():
        if add_felt(y, copy):
            n += 1
            print("felt", y)
        if add_quiet(y):
            n += 1
            print("quiet", y)
    for y, rel, text in CITES:
        if add_cite(y, rel, text):
            n += 1
            print("cite", y, rel)
    print("changed", n)


if __name__ == "__main__":
    main()
