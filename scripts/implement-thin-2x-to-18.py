#!/usr/bin/env python3
"""Bring thin years to 18 leftover 2× writers (2022 + 2014 + 2013 + 2012).

Injects ITT-4X panels on existing dests. 2022 also creates 4 new leftover rooms.
Does not move stars or grow guided <ol>. Incomplete never writes.
Idempotent.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

VERB = {
    "query": "Type leftover",
    "checks": "Ack leftover",
    "hops": "Hop leftover",
}

# year, rel_path, suffix, kind, title, extra, next_rel, next_label
INJECT = [
    # 2022 — 8 on existing dests
    ("2022", "sites/bereal/index.html", "br-lx", "checks", "BeReal leftover 2×",
     ["Two-minute leftover", "Not the chip"],
     "sites/dalle2/index.html", "DALL·E 2 leftover"),
    ("2022", "sites/dalle2/index.html", "dl-lx", "query", "DALL·E 2 leftover 2×",
     "dalle leftover", "sites/windows10/index.html", "Win10 leftover"),
    ("2022", "sites/windows10/index.html", "w10-lx", "checks", "Win10 leftover 2×",
     ["2022 leftover · not the chip", "Not January 2023"],
     "sites/chatgpt/index.html", "ChatGPT leftover"),
    ("2022", "sites/chatgpt/index.html", "send-lx", "query", "ChatGPT leftover literacy",
     "send leftover", "sites/notion22/index.html", "Notion leftover"),
    ("2022", "sites/notion22/index.html", "nt-lx", "query", "Notion leftover 2×",
     "notion leftover", "sites/midjourney/index.html", "Midjourney leftover"),
    ("2022", "sites/midjourney/index.html", "mj-lx", "query", "Midjourney leftover 2×",
     "imagine leftover", "sites/lensa/index.html", "Lensa leftover"),
    ("2022", "sites/lensa/index.html", "le-lx", "checks", "Lensa leftover 2×",
     ["28 Nov leftover", "Not the chip"],
     "sites/tiktok/index.html", "TikTok leftover"),
    ("2022", "sites/tiktok/index.html", "tt-lx", "query", "TikTok leftover 2×",
     "tiktok leftover", "sites/cohere/index.html", "Cohere leftover"),
    # 2014 — 12 on existing dests
    ("2014", "sites/whatsapp/chat.html", "chat-lx", "query", "WhatsApp chat leftover",
     "chat leftover", "sites/iphone/index.html", "iPhone 6 leftover"),
    ("2014", "sites/slackabout/index.html", "sl2-lx", "query", "Slack leftover 2×",
     "slack leftover", "sites/twitchabout/index.html", "Twitch leftover"),
    ("2014", "sites/twitchabout/index.html", "tw2-lx", "query", "Twitch leftover 2×",
     "twitch leftover", "sites/swarm/index.html", "Swarm leftover"),
    ("2014", "sites/swarm/index.html", "sw-lx", "query", "Swarm leftover",
     "swarm leftover", "sites/giphy/index.html", "Giphy leftover"),
    ("2014", "sites/giphy/index.html", "gi-lx", "query", "Giphy leftover",
     "giphy leftover", "sites/material/index.html", "Material leftover"),
    ("2014", "sites/material/index.html", "mat-lx", "query", "Material leftover",
     "material leftover", "sites/alipay/index.html", "Alipay leftover"),
    ("2014", "sites/alipay/index.html", "ali-lx", "query", "Alipay leftover",
     "alipay leftover", "sites/uber/index.html", "Uber leftover"),
    ("2014", "sites/uber/index.html", "ub-lx", "query", "Uber leftover",
     "uber leftover", "sites/facebook/index.html", "Facebook leftover"),
    ("2014", "sites/facebook/index.html", "fb-lx", "query", "Facebook leftover",
     "facebook leftover", "sites/youtube/index.html", "YouTube leftover"),
    ("2014", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover",
     "youtube leftover", "sites/wikipedia/index.html", "Wikipedia leftover"),
    ("2014", "sites/wikipedia/index.html", "wk-lx", "query", "Wikipedia leftover",
     "wiki leftover", "sites/whatsapp/index.html", "WhatsApp Install"),
    ("2014", "sites/iphone6about/index.html", "ip6-lx", "query", "iPhone 6 leftover 2×",
     "iphone 6 leftover", "sites/slackabout/index.html", "Slack leftover"),
    # 2013 — 12
    ("2013", "sites/askfm/index.html", "ask-lx", "query", "Ask.fm leftover",
     "ask leftover", "sites/whisper/index.html", "Whisper leftover"),
    ("2013", "sites/whisper/index.html", "wh-lx", "query", "Whisper leftover",
     "whisper leftover", "sites/youtube/index.html", "YouTube leftover"),
    ("2013", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover",
     "youtube leftover", "sites/healthcare/index.html", "Healthcare leftover"),
    ("2013", "sites/healthcare/index.html", "hc-lx", "query", "Healthcare.gov leftover",
     "healthcare leftover", "sites/xboxone/index.html", "Xbox One leftover"),
    ("2013", "sites/xboxone/index.html", "xb-lx", "query", "Xbox One leftover",
     "xbox leftover", "sites/ouya/index.html", "OUYA leftover"),
    ("2013", "sites/ouya/index.html", "oy-lx", "query", "OUYA leftover",
     "ouya leftover", "sites/medium/index.html", "Medium leftover"),
    ("2013", "sites/medium/index.html", "md-lx", "query", "Medium leftover",
     "medium leftover", "sites/facebook/index.html", "Facebook leftover"),
    ("2013", "sites/facebook/index.html", "fb-lx", "query", "Facebook leftover",
     "facebook leftover", "sites/twitter/index.html", "Twitter leftover"),
    ("2013", "sites/twitter/index.html", "tw-lx", "query", "Twitter leftover",
     "twitter leftover", "sites/tumblr13/index.html", "Tumblr leftover"),
    ("2013", "sites/tumblr13/index.html", "tb2-lx", "query", "Tumblr leftover 2×",
     "tumblr leftover", "sites/windows81/index.html", "Win8.1 leftover"),
    ("2013", "sites/windows81/index.html", "w81-lx", "query", "Win8.1 leftover",
     "win8 leftover", "sites/vine/index.html", "Vine leftover"),
    ("2013", "sites/vine/index.html", "vine-lx", "query", "Vine leftover literacy",
     "vine leftover", "sites/vine/record.html", "Vine 6s"),
    # 2012 — 10
    ("2012", "sites/instagram/index.html", "ig-lx", "query", "IG leftover literacy",
     "ig leftover", "sites/facebook/ipo.html", "IPO leftover"),
    ("2012", "sites/facebook/ipo.html", "ipo-lx", "query", "Facebook IPO leftover",
     "ipo leftover", "sites/pinterest/index.html", "Pinterest leftover"),
    ("2012", "sites/pinterest/index.html", "pin-lx", "query", "Pinterest leftover 2×",
     "pin leftover", "sites/windows8/index.html", "Win8 leftover"),
    ("2012", "sites/windows8/index.html", "w8-lx", "query", "Win8 leftover 2×",
     "win8 leftover", "sites/soundcloud/index.html", "SoundCloud leftover"),
    ("2012", "sites/soundcloud/index.html", "sc-lx", "query", "SoundCloud leftover 2×",
     "sound leftover", "sites/youtube/index.html", "YouTube leftover"),
    ("2012", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover 2×",
     "youtube leftover", "sites/wikipedia/index.html", "Wikipedia leftover"),
    ("2012", "sites/wikipedia/index.html", "wk-lx", "query", "SOPA leftover",
     "sopa leftover", "sites/tinder/index.html", "Tinder leftover"),
    ("2012", "sites/tinder/index.html", "td-lx", "query", "Tinder leftover 2×",
     "swipe leftover", "sites/uber/index.html", "Uber leftover"),
    ("2012", "sites/uber/index.html", "ub-lx", "query", "Uber leftover 2×",
     "uber leftover", "sites/vinewait/index.html", "Vine wait leftover"),
    ("2012", "sites/vinewait/index.html", "vw-lx", "query", "Vine wait leftover",
     "vine wait leftover", "sites/instagram/android.html", "IG Android"),
]

# 2022 new rooms
NEW_2022 = [
    ("cohere", "Cohere leftover", "co-lx", "query", "cohere leftover",
     "2022 leftover. No live model. Not the chip.",
     "co", "cohere leftover", "Live model (trap)", "jasper", "Jasper leftover"),
    ("jasper", "Jasper leftover", "jsp-lx", "query", "jasper leftover",
     "2022 leftover. Copy leftover. No live generate. Not the chip.",
     "jsp", "jasper leftover", "Live generate (trap)", "runwaygen1", "Runway Gen-1 leftover"),
    ("runwaygen1", "Runway Gen-1 leftover", "rw-lx", "query", "gen-1 leftover",
     "2022 leftover. No live video. Not the chip.",
     "rw", "gen-1 leftover", "Live clip (trap)", "stabilityhq", "Stability leftover"),
    ("stabilityhq", "Stability leftover", "stab-lx", "checks",
     ["2022 leftover · no live weights", "Not the chip"],
     "2022 leftover. No ripped weights. Not the chip.",
     "stab", "stability leftover", "Ripped weights (trap)", "chatgpt", "ChatGPT Send"),
]

HOME_STAR = {
    "2022": ' <a href="../sites/chatgpt/index.html">★ ChatGPT Send</a>',
    "2014": ' <a href="../sites/whatsapp/index.html">★ WhatsApp Install</a>',
    "2013": ' <a href="../sites/vine/record.html">★ Vine 6s</a>',
    "2012": None,  # detect
}

PREFIX = {"2022": "itt22", "2014": "itt14", "2013": "itt13", "2012": "itt12"}


def panel_inner(kind: str, extra) -> str:
    if kind == "query":
        ph = extra if isinstance(extra, str) else "ok leftover"
        return (
            f'<p><label>Leftover<br>'
            f'<input type="text" data-4x-field maxlength="80" autocomplete="off" '
            f'placeholder="{ph}"></label></p>\n'
        )
    if kind == "checks":
        labs = extra if isinstance(extra, list) else [
            "leftover · not the chip",
            "Incomplete never writes",
        ]
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in labs
        )
        return f"<p>{boxes}</p>\n"
    hops = extra or [("a", "Hop A"), ("b", "Hop B")]
    btns = " ".join(
        f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in hops
    )
    return f"<p>{btns}</p>\n"


def fourx(year: str, suffix: str, kind: str, title: str, nxt: str, nl: str, extra) -> str:
    pref = PREFIX[year]
    verb = VERB[kind]
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"{year} leftover · incomplete never writes · not the chip</p>\n"
        f"{panel_inner(kind, extra)}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{pref}-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def script_tag(year: str, dest: Path) -> str:
    # depth from dest to year root
    rel = dest.relative_to(ROOT / "years" / year)
    depth = len(rel.parts)
    prefix = "/".join([".."] * depth)
    return f'<script src="{prefix}/js/immersion-{year}.js"></script>'


def inject_file(year: str, rel: str, suffix: str, kind: str, title: str, extra, next_rel: str, nl: str) -> bool:
    dest = ROOT / "years" / year / rel
    if not dest.is_file():
        print(f"SKIP missing {year}/{rel}")
        return False
    t = dest.read_text(encoding="utf-8")
    if f"ITT-4X:{suffix}:" in t or f'data-4x-go="{suffix}"' in t:
        return False
    # relative next from this dest
    dest_dir = dest.parent
    next_abs = ROOT / "years" / year / next_rel
    try:
        nxt = Path(next_abs).relative_to(dest_dir).as_posix()
        if not nxt.startswith("."):
            nxt = nxt  # same or child
    except ValueError:
        nxt = "../" * (len(dest.relative_to(ROOT / "years" / year).parts) - 1) + next_rel
    block = fourx(year, suffix, kind, title, nxt, nl, extra)
    needle = script_tag(year, dest)
    if needle in t:
        t = t.replace(needle, block + "\n" + needle, 1)
    elif "</body>" in t:
        t = t.replace("</body>", block + "</body>", 1)
    else:
        t += block
    dest.write_text(t, encoding="utf-8")
    return True


def dest_html_2022(d) -> str:
    slug, title, suffix, kind, extra, blurb, pick, field, trap, ns, nl = d
    nxt = f"../{ns}/index.html" if ns != "chatgpt" else "../chatgpt/index.html"
    inner = panel_inner(kind, extra)
    verb = VERB[kind]
    return (
        "<!DOCTYPE html>\n"
        '<html lang="en" data-itt-year="2022">\n'
        "<head>\n<meta charset=\"utf-8\">\n"
        f"<title>{title} — 2022</title>\n"
        '<link rel="stylesheet" href="../../../../css/period-2022.css">\n'
        '<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">\n'
        "</head>\n"
        '<body bgcolor="#f2f2f2" text="#111">\n'
        '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
        '<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">\n'
        '<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>\n'
        f"<h1>{title}</h1>\n"
        '<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>\n'
        f"<p>{blurb}</p>\n"
        f'<div data-ytl data-ytl-key="{suffix}" data-ytl-need-pick="{pick}" '
        f'data-ytl-need-field="{field}" data-ytl-verb="Open leftover" data-itt-year="2022" '
        f'style="margin:0 0 16px">\n'
        f'<p><button type="button" data-ytl-pick="{pick}" data-ytl-q="{field}">Open leftover</button>\n'
        f' <button type="button" data-ytl-pick="trap">{trap}</button></p>\n'
        f'<p><label>Note<br><input type="text" data-ytl-field maxlength="80" '
        f'placeholder="{field}" autocomplete="off"></label></p>\n'
        '<label style="display:block"><input type="checkbox" data-ytl-req> '
        "2022 leftover · not the chip</label>\n"
        f'<p><button type="button" data-ytl-trap>{trap}</button>\n'
        ' <button type="button" data-ytl-go>Open leftover</button>\n'
        " <span data-ytl-status></span></p></div>\n"
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        '<p class="honest" style="margin:0 0 8px;font-size:12px">'
        "2022 leftover · incomplete never writes · not the chip</p>\n"
        f"{inner}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        "<span data-4x-status></span></p>\n"
        '<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="itt22-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        "</section>\n<!-- ITT-4X:{suffix}:end -->\n"
        "</div>\n"
        '<script src="../../../../js/immersion-2022.js"></script>\n'
        "</body></html>\n"
    )


def write_2022_new() -> int:
    n = 0
    sites = ROOT / "years" / "2022" / "sites"
    for d in NEW_2022:
        slug = d[0]
        dest = sites / slug / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(dest_html_2022(d), encoding="utf-8")
        n += 1
    return n


def patch_home(year: str) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    text = home.read_text(encoding="utf-8")
    pref = PREFIX[year]
    rows = [r for r in INJECT if r[0] == year]
    extras = []
    if year == "2022":
        for slug, title, suffix, *_ in NEW_2022:
            extras.append((f"sites/{slug}/index.html", suffix, title))
    marker_key = extras[0][1] if extras else rows[-1][2]
    if f"{pref}-{marker_key}" in text and (year != "2022" or "itt22-co-lx" in text):
        return
    bits = []
    for _y, rel, suffix, _k, title, _e, _nr, _nl in rows:
        bits.append(
            f' <a href="../{rel}" data-trail-keys="{pref}-{suffix}">{title}</a> →'
        )
    for rel, suffix, title in extras:
        bits.append(
            f' <a href="../{rel}" data-trail-keys="{pref}-{suffix}">{title}</a> →'
        )
    extra = "\n".join(bits)
    star = HOME_STAR.get(year)
    if star and star in text:
        text = text.replace(star, extra + "\n" + star, 1)
    elif year == "2012":
        # trail already ends at lyft → star
        needle = 'data-trail-keys="itt12-lyft-more"'
        if needle in text and "itt12-ig-lx" not in text:
            # insert before the star link at end of the p
            idx = text.find('★')
            if idx != -1:
                # find start of the star <a
                a = text.rfind("<a ", 0, idx)
                text = text[:a] + extra + "\n" + text[a:]
    else:
        if "</p>\n</body>" in text:
            text = text.replace(
                "</p>\n</body>", extra + "</p>\n</body>", 1
            )
    home.write_text(text, encoding="utf-8")


def patch_config(year: str, rels: list[str]) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    src = cfg.read_text(encoding="utf-8")
    insert = []
    for rel in rels:
        if f'"{rel}"' not in src:
            insert.append(f'    "{rel}",')
    if not insert:
        return
    src = src.replace("var rooms = [", "var rooms = [\n" + "\n".join(insert), 1)
    cfg.write_text(src, encoding="utf-8")


def patch_matrix() -> None:
    path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    have = {r["key"] for r in rows}
    added = 0
    for year, rel, suffix, kind, title, _e, next_rel, nl in INJECT:
        key = f"{PREFIX[year]}-{suffix}"
        if key in have:
            continue
        rows.append(
            {
                "year": year,
                "path": f"/years/{year}/{rel}",
                "key": key,
                "kind": kind,
                "title": title,
                "next": f"/years/{year}/{next_rel}",
                "nextLabel": nl,
            }
        )
        added += 1
    for d in NEW_2022:
        slug, title, suffix, kind, _extra, _b, _p, _f, _t, ns, nl = d
        key = f"itt22-{suffix}"
        if key in have:
            continue
        rows.append(
            {
                "year": "2022",
                "path": f"/years/2022/sites/{slug}/index.html",
                "key": key,
                "kind": kind,
                "title": title,
                "next": f"/years/2022/sites/{ns}/index.html",
                "nextLabel": nl,
            }
        )
        added += 1
    path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    from collections import Counter
    c = Counter(r["year"] for r in rows)
    print(f"matrix +{added} · 2012={c.get('2012')} 2013={c.get('2013')} 2014={c.get('2014')} 2022={c.get('2022')}")


def main() -> int:
    inj = 0
    missing_ip6 = False
    for row in INJECT:
        year, rel, suffix, kind, title, extra, next_rel, nl = row
        dest = ROOT / "years" / year / rel
        if year == "2014" and rel == "sites/iphone6about/index.html" and not dest.is_file():
            # fallback already listed separately? use payabout if present
            alt = ROOT / "years" / "2014" / "sites" / "payabout" / "index.html"
            if alt.is_file():
                rel = "sites/payabout/index.html"
                missing_ip6 = True
            else:
                print("SKIP 2014 iphone6about / payabout missing")
                continue
        if inject_file(year, rel, suffix, kind, title, extra, next_rel, nl):
            inj += 1
    newn = write_2022_new()
    for year in ("2022", "2014", "2013", "2012"):
        patch_home(year)
    patch_config("2022", [f"sites/{d[0]}/index.html" for d in NEW_2022])
    patch_matrix()
    print(f"injected {inj} · 2022 new dests {newn} · ip6-fallback={missing_ip6}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
