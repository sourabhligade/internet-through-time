#!/usr/bin/env python3
"""Upgrade 2024 leftover-pop / dead dests to year-true + 4× REAL writers.

Does not move star or grow guided. Incomplete never writes.
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2024" / "sites"

# suffix, pick, field, trap, verb, kind, extra-for-4x-inner
POPS = [
    (
        Y / "tiktok" / "index.html",
        "pop3-tiktok",
        "fyp",
        "fyp leftover",
        "It launched this year (trap)",
        "Open leftover",
        "query",
        "tt-lx",
        "../midjourney/index.html",
        "Midjourney leftover",
    ),
    (
        Y / "midjourney" / "index.html",
        "pop3-midjourney",
        "imagine",
        "/imagine leftover",
        "This is the ChatGPT chip (trap)",
        "Imagine leftover",
        "query",
        "mj-lx",
        "../lensa/index.html",
        "Lensa leftover",
    ),
    (
        Y / "lensa" / "index.html",
        "pop3-lensa",
        "avatar",
        "avatar leftover",
        "This is the ChatGPT chip (trap)",
        "Avatar leftover",
        "query",
        "le-lx",
        "../../pages/home.html",
        "Starting Point",
    ),
    (
        Y / "facebook" / "index.html",
        "pop-facebook",
        "connect",
        "connect leftover",
        "Threads as 2024 gold (trap)",
        "Connect leftover",
        "query",
        "fb-lx",
        "../chatgpt/4o.html",
        "GPT-4o Talk",
    ),
    (
        Y / "youtube" / "index.html",
        "pop-youtube",
        "watch",
        "youtube leftover",
        "YouTube as the chip (trap)",
        "Watch leftover",
        "query",
        "yt-lx",
        "../wikipedia/index.html",
        "Wikipedia leftover",
    ),
    (
        Y / "wikipedia" / "index.html",
        "pop-wikipedia",
        "cite",
        "wiki leftover",
        "Wiki as the chip (trap)",
        "Cite leftover",
        "query",
        "wk-lx",
        "../facebook/index.html",
        "Facebook leftover",
    ),
]

DEAD = [
    (
        Y / "bereal" / "index.html",
        "br-lx",
        "checks",
        "BeReal leftover",
        "../dalle2/index.html",
        "DALL·E 2 leftover",
    ),
    (
        Y / "dalle2" / "index.html",
        "dl-lx",
        "query",
        "DALL·E 2 leftover",
        "../chrome/index.html",
        "Chrome habit",
    ),
    (
        Y / "windows10" / "index.html",
        "w10-lx",
        "checks",
        "Win10 residual",
        "../playable/game.html",
        "Omni Dash",
    ),
]


def fourx(suffix: str, kind: str, title: str, nxt: str, nl: str) -> str:
    if kind == "query":
        inner = (
            f'<p><label>{title}<br>'
            f'<input type="text" data-4x-field maxlength="80" autocomplete="off" '
            f'placeholder="ok leftover"></label></p>\n'
        )
        verb = "Type leftover"
    else:
        inner = (
            '<p><label style="display:block"><input type="checkbox" data-4x-req> '
            "2024 leftover · not the chip</label>\n"
            '<label style="display:block"><input type="checkbox" data-4x-req> '
            "Incomplete never writes</label></p>\n"
        )
        verb = "Ack leftover"
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"2024 leftover · incomplete never writes · not the chip</p>\n"
        f"{inner}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="itt24-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def ytl(suffix: str, pick: str, field: str, trap: str, verb: str) -> str:
    return (
        f'<div data-ytl data-ytl-key="{suffix}" data-ytl-need-pick="{pick}" '
        f'data-ytl-need-field="{field}" data-ytl-verb="{verb}" data-itt-year="2024" '
        f'style="margin:12px 0;padding:12px;border:1px solid #333;background:#fff">\n'
        f"<p>\n"
        f' <button type="button" data-ytl-pick="{pick}" data-ytl-q="{field}">{verb}</button>\n'
        f' <button type="button" data-ytl-pick="trap">{trap}</button>\n'
        f"</p>\n"
        f'<p><label>Note<br><input type="text" data-ytl-field maxlength="80" '
        f'placeholder="{field}" autocomplete="off"></label></p>\n'
        f'<label style="display:block"><input type="checkbox" data-ytl-req> '
        f"2024 leftover · not the chip</label>\n"
        f"<p>\n"
        f' <button type="button" data-ytl-trap>{trap}</button>\n'
        f' <button type="button" data-ytl-go>{verb}</button>\n'
        f" <span data-ytl-status></span>\n"
        f"</p>\n"
        f"</div>\n"
    )


def inject_before_script(text: str, block: str) -> str:
    needle = '<script src="../../../../js/immersion-2024.js"></script>'
    if block.split("data-4x-go=", 1)[-1][:20] in text and "data-4x-go" in block:
        # already has this 4x suffix
        suf = block.split("ITT-4X:", 1)[1].split(":", 1)[0]
        if f"ITT-4X:{suf}:" in text:
            return text
    if needle in text:
        return text.replace(needle, block + "\n" + needle, 1)
    return text


def main() -> int:
    n = 0
    for path, ytl_key, pick, field, trap, verb, kind, four, nxt, nl in POPS:
        t = path.read_text(encoding="utf-8")
        t = t.replace("Note leftover", verb)
        t = t.replace("Watch (theater)", verb)
        t = t.replace("Open article (theater)", verb)
        t = t.replace("Save leftover", verb)
        if f'data-ytl-key="{ytl_key}"' not in t:
            t = inject_before_script(t, ytl(ytl_key, pick, field, trap, verb))
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
    print(f"upgraded {n} dests")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
