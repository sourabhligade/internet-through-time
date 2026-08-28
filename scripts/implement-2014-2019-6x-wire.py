#!/usr/bin/env python3
"""Wire 2014–2019 6× leftover dests into year configs + flow maps.

Rooms already exist (implement-2014-2019-6x-leftovers.py).
This pass: rooms[] / urlMap, locationHints (specific first), map.html 6× strip.
Idempotent. Does not move stars or grow guided 6.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

YEARS = {
    "2014": [
        ("sites/oculus/index.html", "itt14-oc-6x", "checks", "Oculus leftover 6×", "Ello leftover 6×", "../sites/ello/index.html"),
        ("sites/ello/index.html", "itt14-el-6x", "query", "Ello leftover 6×", "Serial leftover 6×", "../sites/serial/index.html"),
        ("sites/serial/index.html", "itt14-se-6x", "hops", "Serial leftover 6×", "musical.ly leftover 6×", "../sites/musically14/index.html"),
        ("sites/musically14/index.html", "itt14-ml-6x", "query", "musical.ly leftover 6×", "TrueCrypt leftover 6×", "../sites/truecrypt/index.html"),
        ("sites/truecrypt/index.html", "itt14-tc-6x", "checks", "TrueCrypt leftover 6×", "Echo invite leftover 6×", "../sites/echoinvite/index.html"),
        ("sites/echoinvite/index.html", "itt14-ec-6x", "wait", "Echo invite leftover 6×", "★ WhatsApp Install", "../sites/whatsapp/index.html"),
    ],
    "2015": [
        ("sites/waweb/index.html", "itt15-ww-6x", "checks", "WhatsApp Web leftover 6×", "Title II leftover 6×", "../sites/titleii/index.html"),
        ("sites/titleii/index.html", "itt15-t2-6x", "checks", "Title II leftover 6×", "Swift OSS leftover 6×", "../sites/swiftoss/index.html"),
        ("sites/swiftoss/index.html", "itt15-sw-6x", "query", "Swift OSS leftover 6×", "Instant Articles leftover 6×", "../sites/instant/index.html"),
        ("sites/instant/index.html", "itt15-ia-6x", "query", "Instant Articles leftover 6×", "Agar.io leftover 6×", "../sites/agario/index.html"),
        ("sites/agario/index.html", "itt15-ag-6x", "hops", "Agar.io leftover 6×", "Secret leftover 6×", "../sites/secret/index.html"),
        ("sites/secret/index.html", "itt15-sec-6x", "query", "Secret leftover 6×", "★ Periscope Go LIVE", "../sites/periscope/index.html"),
    ],
    "2016": [
        ("sites/smario/index.html", "itt16-sm-6x", "query", "Super Mario Run leftover 6×", "Assistant leftover 6×", "../sites/assistant/index.html"),
        ("sites/assistant/index.html", "itt16-as-6x", "query", "Assistant leftover 6×", "Houseparty leftover 6×", "../sites/houseparty/index.html"),
        ("sites/houseparty/index.html", "itt16-hp-6x", "hops", "Houseparty leftover 6×", "Inbox leftover 6×", "../sites/inbox/index.html"),
        ("sites/inbox/index.html", "itt16-in-6x", "query", "Inbox leftover 6×", "LinkedIn leftover 6×", "../sites/linkedinms/index.html"),
        ("sites/linkedinms/index.html", "itt16-li-6x", "checks", "LinkedIn leftover 6×", "Jio leftover 6×", "../sites/jio/index.html"),
        ("sites/jio/index.html", "itt16-ji-6x", "query", "Jio leftover 6×", "★ Instagram Stories", "../sites/instagram/stories.html"),
    ],
    "2017": [
        ("sites/youtubetv/index.html", "itt17-ytv-6x", "query", "YouTube TV leftover 6×", "Pixel 2 leftover 6×", "../sites/pixel2/index.html"),
        ("sites/pixel2/index.html", "itt17-px-6x", "query", "Pixel 2 leftover 6×", "ARKit leftover 6×", "../sites/ios11ar/index.html"),
        ("sites/ios11ar/index.html", "itt17-ar-6x", "hops", "ARKit leftover 6×", "KRACK leftover 6×", "../sites/krack/index.html"),
        ("sites/krack/index.html", "itt17-kr-6x", "checks", "KRACK leftover 6×", "Title II repeal leftover 6×", "../sites/nnrepeal/index.html"),
        ("sites/nnrepeal/index.html", "itt17-nn-6x", "checks", "Title II repeal leftover 6×", "Flash EOL announce leftover 6×", "../sites/flashend/index.html"),
        ("sites/flashend/index.html", "itt17-fl-6x", "query", "Flash EOL announce leftover 6×", "★ Face ID", "../sites/iphone/x.html"),
    ],
    "2018": [
        ("sites/fnios/index.html", "itt18-fi-6x", "query", "Fortnite iOS leftover 6×", "Google+ sunset leftover 6×", "../sites/gplusend/index.html"),
        ("sites/gplusend/index.html", "itt18-gp-6x", "checks", "Google+ sunset leftover 6×", "Craigslist personals leftover 6×", "../sites/clpersonals/index.html"),
        ("sites/clpersonals/index.html", "itt18-cl-6x", "checks", "Craigslist personals leftover 6×", "Mastodon leftover 6×", "../sites/mastodon/index.html"),
        ("sites/mastodon/index.html", "itt18-ma-6x", "query", "Mastodon leftover 6×", "iTunes movie leftover 6×", "../sites/itunesmovie/index.html"),
        ("sites/itunesmovie/index.html", "itt18-im-6x", "query", "iTunes movie leftover 6×", "Screen Time leftover 6×", "../sites/screentime/index.html"),
        ("sites/screentime/index.html", "itt18-st-6x", "hops", "Screen Time leftover 6×", "★ GDPR Manage", "../sites/gdpr/index.html"),
    ],
    "2019": [
        ("sites/ios13dark/index.html", "itt19-dk-6x", "hops", "iOS 13 Dark Mode leftover 6×", "iPadOS leftover 6×", "../sites/ipados/index.html"),
        ("sites/ipados/index.html", "itt19-ip-6x", "query", "iPadOS leftover 6×", "Libra leftover 6×", "../sites/libra/index.html"),
        ("sites/libra/index.html", "itt19-lb-6x", "checks", "Libra leftover 6×", "CNIL leftover 6×", "../sites/cnil/index.html"),
        ("sites/cnil/index.html", "itt19-cn-6x", "checks", "CNIL leftover 6×", "FTC Facebook leftover 6×", "../sites/ftcfb/index.html"),
        ("sites/ftcfb/index.html", "itt19-ft-6x", "checks", "FTC Facebook leftover 6×", "Inbox sunset leftover 6×", "../sites/inboxend/index.html"),
        ("sites/inboxend/index.html", "itt19-ib-6x", "wait", "Inbox sunset leftover 6×", "★ Disney+ Continue", "../sites/disneyplus/home.html"),
    ],
}

HINTS = {
    "2014": [
        ('{ re: /oculus|rift/i, path: "sites/oculus/index.html" }', "oculus|rift"),
        ('{ re: /\\bello\\b/i, path: "sites/ello/index.html" }', "ello"),
        ('{ re: /serial/i, path: "sites/serial/index.html" }', "serial"),
        ('{ re: /musical\\.?ly/i, path: "sites/musically14/index.html" }', "musical"),
        ('{ re: /truecrypt/i, path: "sites/truecrypt/index.html" }', "truecrypt"),
        ('{ re: /echo.?invite|alexa.?invite/i, path: "sites/echoinvite/index.html" }', "echo.?invite"),
    ],
    "2015": [
        ('{ re: /whatsapp.?web|web\\.whatsapp/i, path: "sites/waweb/index.html" }', "whatsapp.?web"),
        ('{ re: /title.?ii|open.?internet|net.?neutrality/i, path: "sites/titleii/index.html" }', "title.?ii"),
        ('{ re: /swift/i, path: "sites/swiftoss/index.html" }', "swift"),
        ('{ re: /instant.?article/i, path: "sites/instant/index.html" }', "instant.?article"),
        ('{ re: /agar/i, path: "sites/agario/index.html" }', "agar"),
        ('{ re: /\\bsecret\\b/i, path: "sites/secret/index.html" }', "secret"),
    ],
    "2016": [
        ('{ re: /mario.?run|super.?mario/i, path: "sites/smario/index.html" }', "mario.?run"),
        ('{ re: /assistant|ok.?google|pixel/i, path: "sites/assistant/index.html" }', "assistant"),
        ('{ re: /houseparty/i, path: "sites/houseparty/index.html" }', "houseparty"),
        ('{ re: /\\binbox\\b/i, path: "sites/inbox/index.html" }', "inbox"),
        ('{ re: /linkedin/i, path: "sites/linkedinms/index.html" }', "linkedin"),
        ('{ re: /\\bjio\\b/i, path: "sites/jio/index.html" }', "jio"),
    ],
    "2017": [
        ('{ re: /youtube.?tv/i, path: "sites/youtubetv/index.html" }', "youtube.?tv"),
        ('{ re: /pixel.?2/i, path: "sites/pixel2/index.html" }', "pixel.?2"),
        ('{ re: /arkit|ios.?11/i, path: "sites/ios11ar/index.html" }', "arkit"),
        ('{ re: /krack|wpa2/i, path: "sites/krack/index.html" }', "krack"),
        ('{ re: /repeal|restore.?internet/i, path: "sites/nnrepeal/index.html" }', "repeal"),
        ('{ re: /flash/i, path: "sites/flashend/index.html" }', "flash"),
    ],
    "2018": [
        ('{ re: /fortnite.?ios|ios.?fortnite/i, path: "sites/fnios/index.html" }', "fortnite.?ios"),
        ('{ re: /google\\+|gplus|g\\+/i, path: "sites/gplusend/index.html" }', "gplus"),
        ('{ re: /craigslist|fosta|personals/i, path: "sites/clpersonals/index.html" }', "craigslist"),
        ('{ re: /mastodon/i, path: "sites/mastodon/index.html" }', "mastodon"),
        ('{ re: /itunes/i, path: "sites/itunesmovie/index.html" }', "itunes"),
        ('{ re: /screen.?time/i, path: "sites/screentime/index.html" }', "screen.?time"),
    ],
    "2019": [
        ('{ re: /dark.?mode|ios.?13/i, path: "sites/ios13dark/index.html" }', "dark.?mode"),
        ('{ re: /ipados/i, path: "sites/ipados/index.html" }', "ipados"),
        ('{ re: /libra|calibra|diem/i, path: "sites/libra/index.html" }', "libra"),
        ('{ re: /cnil/i, path: "sites/cnil/index.html" }', "cnil"),
        ('{ re: /\\bftc\\b/i, path: "sites/ftcfb/index.html" }', "ftc"),
        ('{ re: /inbox/i, path: "sites/inboxend/index.html" }', "inbox"),
    ],
}


def patch_config(year: str) -> str:
    dest = ROOT / "js" / "config" / f"{year}.js"
    t = dest.read_text(encoding="utf-8")
    added = 0
    # Insert rooms after `var rooms = [`
    m = re.search(r"var rooms = \[\n", t)
    if not m:
        return f"SKIP no rooms {year}"
    insert_at = m.end()
    chunk = []
    for rel, *_ in YEARS[year]:
        if f'"{rel}"' not in t:
            chunk.append(f'    "{rel}",\n')
            added += 1
    if chunk:
        t = t[:insert_at] + "".join(chunk) + t[insert_at:]

    # locationHints — prepend specific leftovers
    hm = re.search(r"locationHints: \[\n", t)
    if hm:
        hint_at = hm.end()
        close = t.find("]", hm.start())
        hint_block = t[hm.start() : close]
        hchunk = []
        for line, _needle in HINTS[year]:
            path = re.search(r'path: "([^"]+)"', line).group(1)
            if path in hint_block:
                continue
            hchunk.append(f"      {line},\n")
        if hchunk:
            t = t[:hint_at] + "".join(hchunk) + t[hint_at:]
            added += len(hchunk)

    dest.write_text(t, encoding="utf-8")
    return f"config {year} +{added}"


def patch_map(year: str) -> str:
    dest = ROOT / "years" / year / "pages" / "map.html"
    if not dest.is_file():
        return f"SKIP map {year}"
    t = dest.read_text(encoding="utf-8")
    marker = f"<!-- ITT-2X-6X-MAP:{year}:start -->"
    end = f"<!-- ITT-2X-6X-MAP:{year}:end -->"
    lis = []
    for rel, key, kind, title, nxt_lab, nxt in YEARS[year]:
        lis.append(
            f'<li><a href="../{rel}">{title}</a> · <code>{key}</code> · {kind} → '
            f'<a href="{nxt}">{nxt_lab}</a></li>'
        )
    inner = (
        f'<div class="itt-2x-map" data-itt-2x-6x-map="{year}" '
        f'style="margin:12px auto;padding:10px;border:1px dashed #1565c0;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:46em">'
        f"<b>6× leftover map · {year}</b> (not the chip · incomplete never writes)"
        f"<ul>\n" + "\n".join(lis) + "\n</ul></div>"
    )
    block = f"{marker}\n{inner}\n{end}\n"
    if marker in t:
        t = re.sub(
            re.escape(marker) + r".*?" + re.escape(end),
            block.strip(),
            t,
            count=1,
            flags=re.S,
        )
    elif "<!-- ITT-2X-MAP:end -->" in t:
        t = t.replace("<!-- ITT-2X-MAP:end -->", "<!-- ITT-2X-MAP:end -->\n" + block, 1)
    elif "</body>" in t:
        t = t.replace("</body>", block + "</body>", 1)
    else:
        t += block
    dest.write_text(t, encoding="utf-8")
    return f"map {year} ok"


def main() -> None:
    for year in YEARS:
        print(patch_config(year))
        print(patch_map(year))


if __name__ == "__main__":
    main()
