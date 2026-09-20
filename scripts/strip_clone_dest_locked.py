#!/usr/bin/env python3
"""Strip leftover clone machines on dest-locked lean dests.

Law: docs/CLONE-STRIP-DEST-LOCKED.md
One dest, one leftover persist key. Official dest leftover warehouse is deleted.
Leftover-3× dests keep the cream leftover-3× face.
Do not dest-lock forests or 2013 leftover 2× ×2.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

LO3X_2020 = {
    "amazon",
    "facebook",
    "google",
    "instagram",
    "youtube",
    "slack",
    "reddit",
    "wikipedia",
    "nyt",
}

A1_2020 = {
    "airbnb",
    "chrome",
    "coinbase",
    "edge",
    "figma",
    "github",
    "hbomax",
    "hulu",
    "iphone",
    "linkedin",
    "notion",
    "peacock",
    "robinhood",
    "spotify",
    "twitch",
    "twitter",
    "uber",
    "whatsapp",
    "windows10",
}


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def write(p: Path, t: str) -> None:
    if t != p.read_text(encoding="utf-8"):
        p.write_text(t, encoding="utf-8")
        print("wrote", p.relative_to(ROOT))


def drop_details_also(html: str) -> str:
    return re.sub(
        r"\n?<details class=\"itt-also-year\">[\s\S]*?</details>\n?",
        "\n",
        html,
        count=1,
    )


def drop_first_lo_section(html: str) -> str:
    """Remove the first leftover-2× <section data-lo-panel> (2020 leftover dest shape)."""
    return re.sub(
        r"<section data-lo-panel=\"1\" data-itt-dest-true=\"1\" data-itt-year=\"2020\">[\s\S]*?</section>\n*",
        "",
        html,
        count=1,
    )


def drop_comment_block(html: str, start: str, end: str | None = None) -> str:
    end = end or start.replace(":start", ":end")
    return re.sub(
        re.escape(start) + r"[\s\S]*?" + re.escape(end),
        "",
        html,
    )


def drop_2x_links(html: str, year: str) -> str:
    return re.sub(
        rf"<!-- ITT-2X-LINKS:{year}:start -->[\s\S]*?<!-- ITT-2X-LINKS:{year}:end -->",
        "",
        html,
    )


def drop_3x_also(html: str) -> str:
    return re.sub(
        r"<!-- ITT-3X-ALSO:start -->[\s\S]*?<!-- ITT-3X-ALSO:end -->",
        "",
        html,
    )


def drop_lo_official(html: str) -> str:
    return re.sub(
        r"<!-- ITT-LO-OFFICIAL:start -->[\s\S]*?<!-- ITT-LO-OFFICIAL:end -->",
        "",
        html,
    )


def drop_lo_official_d2(html: str) -> str:
    return re.sub(
        r"<!-- ITT-LO-OFFICIAL-D2:[^:]*:start -->[\s\S]*?<!-- ITT-LO-OFFICIAL-D2:[^:]*:end -->",
        "",
        html,
    )


def drop_pop3x_third(html: str) -> str:
    return re.sub(
        r"<!-- ITT-POP3X-THIRD:[^:]*:start -->[\s\S]*?<!-- ITT-POP3X-THIRD:[^:]*:end -->",
        "",
        html,
    )


def drop_2x_more(html: str) -> str:
    return re.sub(
        r"<!-- ITT-2X-MORE:[^:]*:start -->[\s\S]*?<!-- ITT-2X-MORE:[^:]*:end -->",
        "",
        html,
    )


def drop_lo_panels_not_official(html: str) -> str:
    """Remove leftover-2× machine divs (itt-YYYY-machine data-lo-panel)."""
    html = re.sub(
        r"<div data-lo-panel=\"1\"[^>]*>[\s\S]*?</div>(?=\s*(?:<div data-lo-panel|<script|<!-- |<details|</body>|$))",
        "",
        html,
    )
    html = re.sub(
        r"<section data-lo-panel=\"1\"[^>]*>[\s\S]*?</section>",
        "",
        html,
    )
    return html


def pass_a_2020() -> None:
    sites = ROOT / "years" / "2020" / "sites"
    for slug in sorted(A1_2020):
        p = sites / slug / "index.html"
        t = read(p)
        t = drop_details_also(t)
        write(p, t)

    for slug in sorted(LO3X_2020):
        p = sites / slug / "index.html"
        t = read(p)
        t = drop_details_also(t)
        t = drop_first_lo_section(t)
        write(p, t)

    play = sites / "playable" / "index.html"
    t = read(play)
    t = """<!DOCTYPE html>
<html lang="en" data-itt-year="2020">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Year game leftover — 2020</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="itt-pixel-failed" data-itt-capture-cite style="font-size:11px;margin:8px 0;font-family:Arial,sans-serif">[failed-final] Period mark · CSS / wordmark only · no invented brand pixels</p>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px;line-height:1.45">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="game.html">Year game</a></p>
<h1>Year game leftover</h1>
<p>Official dest is <a href="game.html">Leave leftover</a>. This folder is not a leftover-2× warehouse.</p>
</div>
<script src="../../../../js/immersion-2020.js"></script>
</body>
</html>
"""
    write(play, t)


def pass_c_2007_yahoo() -> None:
    p = ROOT / "years/2007/sites/yahoo/index.html"
    t = read(p)
    t = re.sub(
        r'<div data-lo-panel="1"[^>]*id="itt-lo2-yahoo-d2"[\s\S]*?</div>',
        "",
        t,
        count=1,
    )
    t = re.sub(
        r'<p hidden data-next-flow data-next-when-key="itt07-yahoo-dp">[\s\S]*?</p>',
        "",
        t,
        count=1,
    )
    write(p, t)


def pass_c_2010_amazon() -> None:
    p = ROOT / "years/2010/sites/amazon/index.html"
    t = read(p)
    t = re.sub(
        r'\n<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="2010"[^>]*>\n<p><b>Prime leftover</b>[\s\S]*?</section>',
        "",
        t,
        count=1,
    )
    write(p, t)


def pass_c_2012_yahoo() -> None:
    p = ROOT / "years/2012/sites/yahoo/index.html"
    t = read(p)
    t = drop_2x_links(t, "2012")
    t = drop_lo_official(t)
    t = drop_comment_block(t, "<!-- ITT-YES-LO2:yahoo:start -->", "<!-- ITT-YES-LO2:yahoo:end -->")
    t = drop_comment_block(t, "<!-- ITT-YES-LO3:yahoo:start -->", "<!-- ITT-YES-LO3:yahoo:end -->")
    write(p, t)


def pass_c_2016_dyn() -> None:
    p = ROOT / "years/2016/sites/dyn/index.html"
    t = read(p)
    # keep dest-unique dyn-ack + leftover-3× cream
    t = re.sub(
        r'<div data-lo-panel="1" data-itt-year="2016" class="itt-2016-machine"[\s\S]*?</div>\n?',
        "",
        t,
    )
    t = drop_details_also(t)
    t = drop_lo_official(t)
    t = drop_2x_links(t, "2016")
    t = drop_comment_block(t, "<!-- ITT-YES-LO:dyn:start -->", "<!-- ITT-YES-LO:dyn:end -->")
    t = drop_comment_block(t, "<!-- ITT-YES-LO2:dyn:start -->", "<!-- ITT-YES-LO2:dyn:end -->")
    t = drop_comment_block(t, "<!-- ITT-YES-LO3:dyn:start -->", "<!-- ITT-YES-LO3:dyn:end -->")
    t = drop_comment_block(t, "<!-- ITT-POP3:dyn:start -->", "<!-- ITT-POP3:dyn:end -->")
    write(p, t)


def pass_c_2017_youtube() -> None:
    p = ROOT / "years/2017/sites/youtube/index.html"
    t = read(p)
    t = drop_comment_block(t, "<!-- ITT-YT-LO-TRUE:start -->", "<!-- ITT-YT-LO-TRUE:end -->")
    t = drop_details_also(t)
    t = drop_2x_links(t, "2017")
    t = drop_lo_official(t)
    write(p, t)


def pass_c_2017_instagram() -> None:
    p = ROOT / "years/2017/sites/instagram/index.html"
    t = read(p)
    t = drop_details_also(t)
    t = drop_2x_links(t, "2017")
    t = drop_lo_official(t)
    write(p, t)


def pass_b_2012_official() -> None:
    for slug in ("medium", "path", "flipboard"):
        p = ROOT / "years" / "2012" / "sites" / slug / "index.html"
        t = read(p)
        t = drop_2x_links(t, "2012")
        t = drop_3x_also(t)
        t = drop_lo_official(t)
        t = drop_lo_official_d2(t)
        t = drop_pop3x_third(t)
        t = drop_2x_more(t)
        # leftover-2× machine divs (not official-verb)
        t = re.sub(
            r'<div data-lo-panel="1"[^>]*class="itt-2012-machine"[\s\S]*?</div>',
            "",
            t,
        )
        # leftover dest-true pop-go draft block that is not official-verb
        # Keep [data-official-verb] / ITT-OFFICIAL-VERB. Drop leftover pop draft after it
        # if it writes leftover (data-pop-go without being leftover-3× unique dest).
        t = re.sub(
            r'<div data-pop-panel="1"><p><input type="text" data-pop-field[\s\S]*?</div>',
            "",
            t,
        )
        t = re.sub(
            r'<p data-next-flow hidden data-next-when-key="itt12-pop-[^"]+-lx">[\s\S]*?</p>',
            "",
            t,
        )
        write(p, t)


def prune_matrix() -> None:
    p = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    dests = data["dests"]
    drop_years_d2 = {"2007", "2010", "2012", "2016", "2017", "2020"}
    lo3x_2020_href = {f"sites/{s}/index.html" for s in LO3X_2020}
    keep = []
    dropped = 0
    for row in dests:
        y = row["year"]
        key = row.get("key") or ""
        href = row.get("href") or ""
        suffix = row.get("suffix") or ""
        if y == "2020" and href in lo3x_2020_href:
            dropped += 1
            continue
        if y == "2020" and href == "sites/playable/index.html":
            dropped += 1
            continue
        if y in drop_years_d2 and (
            suffix.endswith("-d2")
            or suffix.endswith("-lx-d2")
            or key.endswith("-d2")
            or "-d2" in suffix
            or suffix.endswith("d2")
        ):
            dropped += 1
            continue
        if y == "2016" and href == "sites/dyn/index.html" and suffix != "pop3-dyn":
            # leftover-3× dest: leftover-official leftover-2× rows go
            if "pop3" not in suffix and "pop3" not in key:
                dropped += 1
                continue
        if y == "2017" and href == "sites/youtube/index.html" and (
            suffix in {"yt", "yt-2"} or key in {"itt17-yt", "itt17-yt-2"}
        ):
            # leftover-3× dest-true face stays; leftover-official leftover-2× rows go
            dropped += 1
            continue
        keep.append(row)
    data["dests"] = keep
    p.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(f"leftover-official.matrix.json {len(dests)} → {len(keep)} (dropped {dropped})")


def main() -> None:
    pass_a_2020()
    pass_b_2012_official()
    pass_c_2007_yahoo()
    pass_c_2010_amazon()
    pass_c_2012_yahoo()
    pass_c_2016_dyn()
    pass_c_2017_youtube()
    pass_c_2017_instagram()
    prune_matrix()


if __name__ == "__main__":
    main()
