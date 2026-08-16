#!/usr/bin/env python3
"""Add researched viral-class games 2010–2017 + literacy strips on pack pages."""
from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]

CSS = {
    "2010": "period-2010-lite.css",
    "2013": "period-2013-lite.css",
    "2014": "period-2014.css",
    "2015": "period-2015.css",
    "2016": "period-2016.css",
    "2017": "period-2017.css",
}

STAR = {
    "2010": ("../instagram/index.html", "Instagram 2010"),
    "2013": ("../vine/index.html", "Vine 2013"),
    "2014": ("../whatsapp/index.html", "WhatsApp 2014"),
    "2015": ("../apple/watch.html", "Apple Watch"),
    "2016": ("../instagram/stories.html", "Instagram Stories"),
    "2017": ("../iphone/x.html", "iPhone X / Face ID"),
}

EXISTING = {
    "2010": "Rag Trail",
    "2013": "Pipe Hop",
    "2014": "Tile Fold",
    "2015": "Blob Rush",
    "2016": "Gym Rush",
    "2017": "Storm Circle",
}

# Research-backed extras (dates labeled on the page)
NEW = {
    "2010": [
        (
            "fruit",
            "fruit.html",
            "Fruit Slash",
            "Fruit Ninja class · Halfbrick <b>21 Apr 2010</b> · no official fruit",
            4,
            "",
            "Slash",
            "Shipped <b>21 Apr 2010</b> · not Angry Birds",
        ),
    ],
    "2013": [
        (
            "triviasix",
            "triviasix.html",
            "Trivia Six",
            "Trivia Crack class · Etermax <b>2013</b> · no official spins",
            3,
            "trivia",
            "Spin",
            "Trivia Crack–class <b>2013</b> · not HQ Trivia 2016",
        ),
    ],
    "2014": [
        (
            "crosshop",
            "crosshop.html",
            "Cross Hop",
            "Crossy Road class · Hipster Whale <b>20 Nov 2014</b> · no official chicken",
            4,
            "",
            "Hop",
            "Shipped <b>20 Nov 2014</b> · not Flappy 2013 · not 2048",
        ),
    ],
    "2015": [
        (
            "vaulttap",
            "vaulttap.html",
            "Vault Tap",
            "Fallout Shelter class · <b>14 Jun 2015</b> · no official vault boy",
            3,
            "",
            "Build",
            "Shipped <b>14 Jun 2015</b> · not the Watch star",
        ),
    ],
    "2016": [
        (
            "siderun",
            "siderun.html",
            "Side Run",
            "Super Mario Run class · <b>15 Dec 2016</b> · no official Mario",
            4,
            "",
            "Run",
            "Shipped <b>15 Dec 2016</b> · not Pokémon GO (that is Gym Rush)",
        ),
    ],
    "2017": [
        (
            "planedrop",
            "planedrop.html",
            "Plane Drop",
            "PUBG-class drop · EA <b>23 Mar 2017</b> · not Storm Circle",
            3,
            "",
            "Drop",
            "PUBG EA <b>23 Mar 2017</b> · not Fortnite Dec 2017 star-adjacent",
        ),
    ],
}


def page(year: str, g: tuple) -> str:
    slug, fname, title, klass, need, phrase, act, lit_a = g
    star_href, star_label = STAR[year]
    type_block = ""
    type_li = ""
    if phrase:
        type_block = f'  <p><input data-pack-type maxlength="32" placeholder="{phrase}" style="width:70%;padding:6px"></p>\n'
        type_li = f'    <li data-step="type">Type {phrase}</li>\n'
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/{CSS[year]}">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body class="yg-body yg-year-{year}" bgcolor="#111111" text="#eeeeee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="{year}" data-game-id="{slug}" data-pack-game="1" data-pack-need="{need}" data-pack-phrase="{phrase}" data-yg-goal="Tap {need}. Finish. Incomplete never writes." data-yg-next-href="{star_href}" data-yg-next-label="{star_label}" tabindex="0" style="max-width:420px;margin:12px auto;padding:12px;font-family:Arial,sans-serif;font-size:13px">
  <h1 style="margin:0 0 6px">{title} — {year}</h1>
  <p style="margin:0">{klass}. Year one-thing is still <a href="{star_href}">{star_label}</a>.</p>
  <p class="yg-honesty yg-inspire" data-yg-inspire="1">Museum original · dated class · no official art · key <code>itt{year[2:]}-game-{slug}</code></p>
  <div data-itt-real-panel style="font-size:11px;border:1px solid #555;padding:6px;margin:8px 0">
   <b>REAL literacy</b> — incomplete never writes
   <label style="display:block;margin:4px 0"><input type="checkbox" data-req> {lit_a}</label>
   <label style="display:block;margin:4px 0"><input type="checkbox" data-req> Not official art · not the year star</label>
   <p><button type="button" data-itt-real-save data-storage-key="{slug}-lit" data-min-req="2" data-requires="[data-req]">Save literacy</button></p>
  </div>
  <ol class="yg-steps" data-yg-steps>
    <li data-step="start">New Game</li>
    <li data-step="taps">Tap {act} ×{need}</li>
{type_li}    <li data-step="save">Finish — then it saves</li>
  </ol>
  <p>
    <button type="button" data-game-start>New Game</button>
    <button type="button" data-pack-act>{act}</button>
    <button type="button" data-pack-finish>Finish</button>
    Score <b data-game-score>0</b> · Best <b data-game-best>0</b>
    · <span data-pack-count>0/{need}</span>
  </p>
{type_block}  <p data-itt-action-status style="min-height:1.3em">New Game, then tap, then Finish.</p>
  <p style="font-size:11px">
    <a href="index.html">← Playables</a> ·
    <a href="steps.html">Do this in order</a> ·
    <a href="game.html">{EXISTING[year]}</a> ·
    <a href="../../pages/home.html">Starting Point</a>
  </p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-pack-boot.js"></script>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


LIT_BLOCK = """  <div data-itt-real-panel style="font-size:11px;border:1px solid #555;padding:6px;margin:8px 0">
   <b>REAL literacy</b> — incomplete never writes
   <label style="display:block;margin:4px 0"><input type="checkbox" data-req> Dated period class · see honesty above</label>
   <label style="display:block;margin:4px 0"><input type="checkbox" data-req> Not official art · not the year star</label>
   <p><button type="button" data-itt-real-save data-storage-key="{slug}-lit" data-min-req="2" data-requires="[data-req]">Save literacy</button></p>
  </div>
"""


def add_literacy_to_existing() -> None:
    play = ROOT.glob("years/201[0-9]/sites/playable/*.html")
    for path in play:
        if path.name in {"index.html", "steps.html", "game.html", "loop.html"}:
            continue
        text = path.read_text(encoding="utf-8")
        if "data-itt-real-save" in text:
            continue
        if "data-pack-game" not in text:
            continue
        m = re.search(r'data-game-id="([^"]+)"', text)
        slug = m.group(1) if m else path.stem
        block = LIT_BLOCK.format(slug=slug)
        if 'data-yg-inspire="1"' in text:
            text = text.replace(
                'data-yg-inspire="1">',
                'data-yg-inspire="1">',
                1,
            )
            # insert after the inspire paragraph
            text = re.sub(
                r'(<p class="yg-honesty yg-inspire"[^>]*>.*?</p>)',
                r"\1\n" + block,
                text,
                count=1,
                flags=re.S,
            )
            path.write_text(text, encoding="utf-8")


def patch_config(year: str, g: tuple) -> None:
    path = ROOT / f"js/config/{year}.js"
    text = path.read_text(encoding="utf-8")
    slug, fname, title, *_ = g
    uk = f'"sites/playable/{fname}"'
    if uk in text:
        return
    ins_u = f'      {uk}: "http://museum.local/years/{year}/playable/{fname}",\n'
    ins_t = f'      {uk}: "{title}",\n'
    if '"sites/playable/game.html"' in text:
        text = text.replace('"sites/playable/game.html"', ins_u + '      "sites/playable/game.html"', 1)
        parts = text.split("titleMap", 1)
        if len(parts) == 2:
            tm = parts[1].replace('"sites/playable/game.html"', ins_t + '      "sites/playable/game.html"', 1)
            text = parts[0] + "titleMap" + tm
        path.write_text(text, encoding="utf-8")


def patch_index_and_home_and_steps(year: str, g: tuple) -> None:
    slug, fname, title, *_ = g
    idx = ROOT / f"years/{year}/sites/playable/index.html"
    it = idx.read_text(encoding="utf-8")
    if fname not in it:
        it = it.replace("game.html", f'{fname}">{title}</a> · <a href="game.html', 1)
        # that might break. safer:
    if fname not in idx.read_text(encoding="utf-8"):
        raw = idx.read_text(encoding="utf-8")
        raw = raw.replace(
            'href="steps.html"',
            f'href="steps.html"',
            1,
        )
        raw = raw.replace(
            "</a> ·\n <a href=\"game.html\">",
            f'</a> · <a href="{fname}">{title}</a> ·\n <a href="game.html">',
            1,
        )
        if f'href="{fname}"' not in raw:
            raw = raw.replace(
                '<a href="game.html">',
                f'<a href="{fname}">{title}</a> · <a href="game.html">',
                1,
            )
        idx.write_text(raw, encoding="utf-8")

    home = ROOT / f"years/{year}/pages/home.html"
    ht = home.read_text(encoding="utf-8")
    if fname not in ht:
        ht = ht.replace(
            "Do this in order</a>",
            f'Do this in order</a> · <a href="../sites/playable/{fname}"><b>{title}</b></a>',
            1,
        )
        home.write_text(ht, encoding="utf-8")

    steps = ROOT / f"years/{year}/sites/playable/steps.html"
    st = steps.read_text(encoding="utf-8")
    if fname not in st:
        st = st.replace(
            "</ol>",
            f' <li><a href="{fname}"><b>{title}</b></a> — researched add · New Game → tap → Finish.</li>\n</ol>',
            1,
        )
        steps.write_text(st, encoding="utf-8")


def main() -> None:
    add_literacy_to_existing()
    for year, games in NEW.items():
        out = ROOT / f"years/{year}/sites/playable"
        for g in games:
            (out / g[1]).write_text(page(year, g), encoding="utf-8")
            patch_config(year, g)
            patch_index_and_home_and_steps(year, g)
            print("added", year, g[2])


if __name__ == "__main__":
    main()
