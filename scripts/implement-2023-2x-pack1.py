#!/usr/bin/env python3
"""2023 Phase 1 leftover-pop upgrade + Phase 2 2× pack 1 (18 writers).

Does not: move star, grow guided <ol>, dest-field plaques, invent ILS June.
Incomplete never writes. Idempotent.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2023"
SITES = YEAR / "sites"

# slug, title, suffix, kind, extra, blurb, ytl_pick, ytl_field, ytl_trap, next_slug, next_label
DESTS = [
    ("plugins", "ChatGPT plugins leftover", "plug-lx", "query", "plugin leftover",
     "23 Mar 2023 leftover. Waitlist plugins. Not the GPT Store. Not the chip.",
     "plug", "plugin leftover", "Treat as GPT Store (trap)", "codeinterp", "Code Interpreter leftover"),
    ("codeinterp", "Code Interpreter leftover", "ada-lx", "query", "python leftover",
     "2023 leftover. Later Advanced Data Analysis. No live Python. Not the chip.",
     "ada", "python leftover", "Live Python (trap)", "customgpts", "Custom GPTs leftover"),
    ("customgpts", "Custom GPTs leftover", "gpts-lx", "query", "custom gpt leftover",
     "6 Nov 2023 DevDay leftover. Not the 10 Jan 2024 GPT Store. Not the chip.",
     "gpts", "custom gpt leftover", "Treat as GPT Store (trap)", "llama2", "Llama 2 leftover"),
    ("llama2", "Llama 2 leftover", "l2-lx", "checks",
     ["18 Jul leftover · no live weights", "Not the chip"],
     "18 Jul 2023 leftover. No ripped weights. Not the chip.",
     "l2", "llama 2 leftover", "Ripped weights (trap)", "dalle3", "DALL·E 3 leftover"),
    ("dalle3", "DALL·E 3 leftover", "d3-lx", "query", "dalle 3 leftover",
     "20 Sep 2023 leftover. Not 2022 DALL·E 2. No live image. Not the chip.",
     "d3", "dalle 3 leftover", "Treat as DALL·E 2 gold (trap)", "myai", "My AI leftover"),
    ("myai", "Snapchat My AI leftover", "myai-lx", "query", "my ai leftover",
     "Feb 2023 leftover. Not a live chat. Not the chip.",
     "myai", "my ai leftover", "Live chat (trap)", "firefly", "Firefly leftover"),
    ("firefly", "Adobe Firefly leftover", "fly-lx", "query", "firefly leftover",
     "Mar 2023 leftover. No live generate. Not the chip.",
     "fly", "firefly leftover", "Live generate (trap)", "m365copilot", "365 Copilot leftover"),
    ("m365copilot", "Microsoft 365 Copilot leftover", "m365-lx", "checks",
     ["16 Mar announce leftover", "Not Copilot X dest · not the chip"],
     "16 Mar 2023 leftover. Announce leftover. Not the chip.",
     "m365", "365 leftover", "Treat as gold (trap)", "sge", "SGE leftover"),
    ("sge", "Search Generative Experience leftover", "sge-lx", "query", "sge leftover",
     "May 2023 leftover. Not the Gemini app. Not the chip.",
     "sge", "sge leftover", "Treat as Gemini app (trap)", "chatgptios", "ChatGPT iOS leftover"),
    ("chatgptios", "ChatGPT iOS leftover", "ios-lx", "checks",
     ["18 May leftover", "Not GPT-4o · not the chip"],
     "18 May 2023 leftover. App leftover. Not GPT-4o. Not the chip.",
     "ios", "ios leftover", "Treat as 4o (trap)", "mixtral", "Mixtral leftover"),
    ("mixtral", "Mixtral leftover", "mix-lx", "checks",
     ["11 Dec leftover · no live weights", "Not the chip"],
     "11 Dec 2023 leftover. No ripped weights. Not the chip.",
     "mix", "mixtral leftover", "Ripped weights (trap)", "grok23", "Grok announce leftover"),
    ("grok23", "Grok announce leftover", "grok23-lx", "query", "grok leftover",
     "Nov 2023 leftover. Announce leftover. Not 2024 Grok dest. Not the chip.",
     "grok23", "grok leftover", "Treat as 2024 gold (trap)", "gemannounce", "Gemini announce leftover"),
    ("gemannounce", "Gemini announce leftover", "gem23-lx", "checks",
     ["6 Dec model announce leftover", "Bard is still the 2023 chat name"],
     "6 Dec 2023 leftover. Model announce. Bard is still the 2023 chat name. Gemini app is 8 Feb 2024.",
     "gem23", "gemini announce leftover", "Treat as Gemini app (trap)", "vpannounce", "Vision Pro announce leftover"),
    ("vpannounce", "Vision Pro announce leftover", "vp23-lx", "checks",
     ["5 Jun WWDC announce leftover", "US ship is 2 Feb 2024"],
     "5 Jun 2023 leftover. Announce leftover. US ship is 2024. Not the chip.",
     "vp23", "vision announce leftover", "Treat as 2024 ship (trap)", "sdxl", "SDXL leftover"),
    ("sdxl", "SDXL leftover", "sdxl-lx", "query", "sdxl leftover",
     "Jul 2023 leftover. No live weights. Not the chip.",
     "sdxl", "sdxl leftover", "Ripped weights (trap)", "gen2", "Gen-2 leftover"),
    ("gen2", "Runway Gen-2 leftover", "gen2-lx", "query", "gen-2 leftover",
     "2023 leftover. No live clip. Not the chip.",
     "gen2", "gen-2 leftover", "Live clip (trap)", "gpt4turbo", "GPT-4 Turbo leftover"),
    ("gpt4turbo", "GPT-4 Turbo leftover", "turbo-lx", "query", "turbo leftover",
     "6 Nov 2023 leftover. Not GPT-4o. Not the chip.",
     "turbo", "turbo leftover", "Treat as 4o (trap)", "nytvopenai", "NYT leftover"),
    ("nytvopenai", "NYT v OpenAI leftover", "nyt-lx", "checks",
     ["27 Dec leftover literacy", "Not the chip"],
     "27 Dec 2023 leftover literacy. Not the chip.",
     "nyt", "nyt leftover", "Treat as gold (trap)", "plugins", "Plugins leftover"),
]

POPS = [
    (SITES / "tiktok" / "index.html", "pop3-tiktok", "fyp", "fyp leftover",
     "It launched this year (trap)", "Open leftover", "query", "tt-lx",
     "../midjourney/index.html", "Midjourney leftover"),
    (SITES / "midjourney" / "index.html", "pop3-midjourney", "imagine", "/imagine leftover",
     "This is the Plus chip (trap)", "Imagine leftover", "query", "mj-lx",
     "../lensa/index.html", "Lensa leftover"),
    (SITES / "lensa" / "index.html", "pop3-lensa", "avatar", "avatar leftover",
     "This is the Plus chip (trap)", "Avatar leftover", "query", "le-lx",
     "../../pages/home.html", "Starting Point"),
    (SITES / "facebook" / "index.html", "pop-facebook", "connect", "connect leftover",
     "Threads as 2023 gold (trap)", "Connect leftover", "query", "fb-lx",
     "../chatgpt/plus.html", "ChatGPT Plus"),
    (SITES / "youtube" / "index.html", "pop-youtube", "watch", "youtube leftover",
     "YouTube as the chip (trap)", "Watch leftover", "query", "yt-lx",
     "../wikipedia/index.html", "Wikipedia leftover"),
    (SITES / "wikipedia" / "index.html", "pop-wikipedia", "cite", "wiki leftover",
     "Wiki as the chip (trap)", "Cite leftover", "query", "wk-lx",
     "../facebook/index.html", "Facebook leftover"),
]

DEAD = [
    (SITES / "bereal" / "index.html", "br-lx", "checks", "BeReal leftover",
     "../dalle2/index.html", "DALL·E 2 leftover"),
    (SITES / "dalle2" / "index.html", "dl-lx", "query", "DALL·E 2 leftover",
     "../chrome/index.html", "Chrome habit"),
    (SITES / "windows10" / "index.html", "w10-lx", "checks", "Win10 residual",
     "../playable/game.html", "Subscribe Dash"),
]

VERB = {"query": "Type leftover", "checks": "Ack leftover", "hops": "Hop leftover", "wait": "Wait leftover"}


def fourx(suffix: str, kind: str, title: str, nxt: str, nl: str, extra=None) -> str:
    if kind == "query":
        ph = extra if isinstance(extra, str) else "ok leftover"
        inner = (
            f'<p><label>{title}<br>'
            f'<input type="text" data-4x-field maxlength="80" autocomplete="off" '
            f'placeholder="{ph}"></label></p>\n'
        )
    elif kind == "checks":
        labs = extra if isinstance(extra, list) else ["2023 leftover · not the chip", "Incomplete never writes"]
        inner = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in labs
        )
        inner = f"<p>{inner}</p>\n"
    elif kind == "hops":
        hops = extra or [("a", "Hop A"), ("b", "Hop B")]
        btns = " ".join(f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in hops)
        inner = f"<p>{btns}</p>\n"
    elif kind == "wait":
        inner = '<p><button type="button" data-4x-wait data-4x-wait-ms="2000">Wait leftover timer</button></p>\n'
    else:
        raise ValueError(kind)
    verb = VERB[kind]
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"2023 leftover · incomplete never writes · not the chip</p>\n"
        f"{inner}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="itt23-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def ytl_block(suffix: str, pick: str, field: str, trap: str, verb: str) -> str:
    return (
        f'<div data-ytl data-ytl-key="{suffix}" data-ytl-need-pick="{pick}" '
        f'data-ytl-need-field="{field}" data-ytl-verb="{verb}" data-itt-year="2023" '
        f'style="margin:12px 0;padding:12px;border:1px solid #333;background:#fff">\n'
        f"<p>\n"
        f' <button type="button" data-ytl-pick="{pick}" data-ytl-q="{field}">{verb}</button>\n'
        f' <button type="button" data-ytl-pick="trap">{trap}</button>\n'
        f"</p>\n"
        f'<p><label>Note<br><input type="text" data-ytl-field maxlength="80" '
        f'placeholder="{field}" autocomplete="off"></label></p>\n'
        f'<label style="display:block"><input type="checkbox" data-ytl-req> '
        f"2023 leftover · not the chip</label>\n"
        f"<p>\n"
        f' <button type="button" data-ytl-trap>{trap}</button>\n'
        f' <button type="button" data-ytl-go>{verb}</button>\n'
        f" <span data-ytl-status></span>\n"
        f"</p>\n"
        f"</div>\n"
    )


def dest_html(d) -> str:
    slug, title, suffix, kind, extra, blurb, pick, field, trap, ns, nl = d
    nxt = f"../{ns}/index.html"
    return (
        f'<!DOCTYPE html>\n'
        f'<html lang="en" data-itt-year="2023">\n'
        f"<head>\n"
        f'<meta charset="utf-8">\n'
        f"<title>{title} — 2023</title>\n"
        f'<link rel="stylesheet" href="../../../../css/period-2022.css">\n'
        f'<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">\n'
        f"</head>\n"
        f'<body bgcolor="#f2f2f2" text="#111">\n'
        f'<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
        f'<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">\n'
        f'<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>\n'
        f"<h1>{title}</h1>\n"
        f'<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>\n'
        f"<p>{blurb}</p>\n"
        f"{ytl_block(suffix, pick, field, trap, 'Open leftover')}"
        f"{fourx(suffix, kind, title, nxt, nl, extra)}"
        f"</div>\n"
        f'<script src="../../../../js/immersion-2023.js"></script>\n'
        f"</body>\n"
        f"</html>\n"
    )


def inject_before_script(text: str, block: str) -> str:
    needle = '<script src="../../../../js/immersion-2023.js"></script>'
    if "ITT-4X:" in block:
        suf = block.split("ITT-4X:", 1)[1].split(":", 1)[0]
        if f"ITT-4X:{suf}:" in text:
            return text
    if needle in text:
        return text.replace(needle, block + "\n" + needle, 1)
    return text


def upgrade_pops() -> int:
    n = 0
    for path, ytl_key, pick, field, trap, verb, kind, four, nxt, nl in POPS:
        t = path.read_text(encoding="utf-8")
        t = t.replace("Note leftover", verb)
        t = t.replace("Watch (theater)", verb)
        t = t.replace("Open article (theater)", verb)
        t = t.replace("Save leftover", verb)
        if f'data-ytl-key="{ytl_key}"' not in t:
            t = inject_before_script(t, ytl_block(ytl_key, pick, field, trap, verb))
        if f'data-4x-go="{four}"' not in t:
            t = inject_before_script(t, fourx(four, kind, verb, nxt, nl))
        path.write_text(t, encoding="utf-8")
        n += 1
    for path, four, kind, title, nxt, nl in DEAD:
        t = path.read_text(encoding="utf-8")
        if f'data-4x-go="{four}"' not in t:
            t = inject_before_script(t, fourx(four, kind, title, nxt, nl))
            path.write_text(t, encoding="utf-8")
            n += 1
    return n


def write_dests() -> int:
    n = 0
    for d in DESTS:
        dest = SITES / d[0] / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(dest_html(d), encoding="utf-8")
        n += 1
    return n


def patch_home() -> None:
    home = YEAR / "pages" / "home.html"
    text = home.read_text(encoding="utf-8")
    if "ott-2x-2023" in text:
        return
    bits = []
    for slug, title, suffix, *_ in DESTS:
        bits.append(
            f' <a href="../sites/{slug}/index.html" data-trail-keys="itt23-{suffix}">{title}</a> →'
        )
    trail = (
        "<!-- ITT-2X-TRAILS:start -->\n"
        '<p class="itt-2x-trails" id="ott-2x-2023" style="margin:10px auto;padding:10px;'
        "background:#e8f5e9;border:1px solid #2e7d32;font-family:Arial,sans-serif;"
        'font-size:12px;max-width:52em"><b>2× leftover dests</b> (not the chip · incomplete never writes):\n'
        + "\n".join(bits)
        + '\n <a href="../sites/chatgpt/plus.html">★ ChatGPT Plus $20</a>\n'
        "</p>\n"
        "<!-- ITT-2X-TRAILS:end -->\n"
    )
    text = text.replace("</body>", trail + "</body>", 1)
    home.write_text(text, encoding="utf-8")


def patch_map() -> None:
    mp = YEAR / "pages" / "map.html"
    if not mp.is_file():
        return
    text = mp.read_text(encoding="utf-8")
    if "itt23-plug-lx" in text:
        return
    lis = "\n".join(
        f' <li><a href="../sites/{slug}/index.html">{title}</a> · '
        f"<code>itt23-{suffix}</code> · {kind}</li>"
        for slug, title, suffix, kind, *_ in DESTS
    )
    blk = (
        "<!-- ITT-2X-MAP:start -->\n"
        '<div class="itt-2x-map" data-itt-2x-map="2023" '
        'style="margin:12px 0;padding:10px;border:1px dashed #2e7d32;'
        'font-family:Arial,sans-serif;font-size:12px">'
        "<b>2× leftover map · pack 1 · 18 dests</b>\n<ul>\n"
        + lis
        + "\n</ul></div>\n<!-- ITT-2X-MAP:end -->\n"
    )
    if "</body>" in text:
        text = text.replace("</body>", blk + "</body>", 1)
        mp.write_text(text, encoding="utf-8")


def patch_config() -> None:
    cfg = ROOT / "js" / "config" / "2023.js"
    src = cfg.read_text(encoding="utf-8")
    insert = []
    for slug, *_ in DESTS:
        rel = f"sites/{slug}/index.html"
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
    for d in DESTS:
        slug, title, suffix, kind, extra, _b, _p, _f, _t, ns, nl = d
        key = f"itt23-{suffix}"
        if key in have:
            continue
        rows.append(
            {
                "year": "2023",
                "path": f"/years/2023/sites/{slug}/index.html",
                "key": key,
                "kind": kind,
                "title": title,
                "next": f"/years/2023/sites/{ns}/index.html",
                "nextLabel": nl,
            }
        )
        added += 1
    path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    print(f"matrix +{added} (now {sum(1 for r in rows if r['year']=='2023')} 2023 rows)")


def main() -> int:
    pops = upgrade_pops()
    dests = write_dests()
    patch_home()
    patch_map()
    patch_config()
    patch_matrix()
    print(f"upgraded {pops} pop/dead dests · wrote {dests} 2× dests")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
