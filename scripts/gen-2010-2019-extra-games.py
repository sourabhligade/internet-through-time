#!/usr/bin/env python3
"""Generate 4 extra year games per year 2010–2017."""
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
    "2010": ("game.html", "Rag Trail"),
    "2013": ("game.html", "Pipe Hop"),
    "2014": ("game.html", "Tile Fold"),
    "2015": ("game.html", "Blob Rush"),
    "2016": ("game.html", "Gym Rush"),
    "2017": ("game.html", "Storm Circle"),
}

TOYS = {
    "2010": ("App Store tap", "iPad multitouch", "nofilter"),
    "2013": ("Flap tap", "6s hold", "available"),
    "2014": ("Fold tap", "ice hold", "three months free"),
    "2015": ("Blob tap", "watch hold", "go outside"),
    "2016": ("Gym tap", "stories hold", "two hundred eighty"),
    "2017": ("Storm tap", "notch hold", "i want to be forgotten"),
}

# slug, file, title, class line, need, phrase, act label
GAMES = {
    "2010": [
        ("sling", "sling.html", "Sling Flock", "Angry Birds class · 2009/10 surge · no official birds", 4, "", "Sling"),
        ("square", "square.html", "Square Shot", "Instagram Oct 6 2010 · square frame · not Stories", 3, "square", "Shoot"),
        ("pad", "pad.html", "Pad Flick", "iPad 2010 · home icons · no official chrome", 3, "", "Flick"),
        ("kinect", "kinect.html", "Kinect Wave", "Kinect Nov 4 2010 · silhouette wave", 3, "", "Wave"),
    ],
    "2013": [
        ("swipedeck", "swipedeck.html", "Swipe Deck", "Tinder class · no official cards · not the Vine star", 4, "", "Swipe"),
        ("tweet140", "tweet140.html", "Tweet 140", "140 characters · type the line", 3, "just setting up", "Post"),
        ("onesnap", "onesnap.html", "One Snap", "Xbox One reveal · snap 3 tiles", 3, "", "Snap tile"),
        ("keepbox", "keepbox.html", "Keep Box", "Google Keep 2013 · pin 3 notes", 3, "", "Pin"),
    ],
    "2014": [
        ("icedump", "icedump.html", "Ice Dump", "Ice Bucket 2014 · pour 3 · ALS literacy", 3, "", "Pour"),
        ("bleedkey", "bleedkey.html", "Bleed Key", "Heartbleed · rotate 3 passwords theater", 3, "rotate", "Rotate"),
        ("bluetick", "bluetick.html", "Blue Tick", "WhatsApp ticks · not the $19B star", 3, "", "Tick"),
        ("bendtap", "bendtap.html", "Bend Tap", "iPhone 6 Bendgate · tap 3", 3, "", "Bend"),
    ],
    "2015": [
        ("faceround", "faceround.html", "Face Round", "Watch face pick · not the Watch star save", 3, "", "Pick face"),
        ("livehold", "livehold.html", "Live Hold", "Periscope class · hold go-live", 3, "", "Go live"),
        ("peachtap", "peachtap.html", "Peach Tap", "Peach 2015 · tap 3 magics", 3, "", "Magic"),
        ("musictrial", "musictrial.html", "Music Trial", "Apple Music · type the trial line", 3, "three months", "Start"),
    ],
    "2016": [
        ("slide24", "slide24.html", "Slide 24", "Stories-class 24h · not the Stories star save", 3, "", "Slide"),
        ("jackpull", "jackpull.html", "Jack Pull", "iPhone 7 jack death · pull 3 times", 3, "", "Pull"),
        ("reacthold", "reacthold.html", "React Hold", "Facebook Reactions · hold beyond Like", 3, "", "React"),
        ("vinebye", "vinebye.html", "Vine Bye", "Vine wind-down · type goodbye", 3, "goodbye vine", "Post"),
    ],
    "2017": [
        ("notchduck", "notchduck.html", "Notch Duck", "iPhone X notch · duck 3 · not Face ID star", 3, "", "Duck"),
        ("animoji", "animoji.html", "Ani Wave", "Animoji class · wave 3 · no official faces", 3, "", "Wave"),
        ("stormloot", "stormloot.html", "Loot Ping", "BR class ping · not Storm Circle", 3, "", "Ping"),
        ("savenet", "savenet.html", "Save Net", "Net neutrality Dec 2017 · type the line", 3, "save the net", "File"),
    ],
}


def html_page(year: str, g: tuple) -> str:
    slug, fname, title, klass, need, phrase, act = g
    css = CSS[year]
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
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body class="yg-body yg-year-{year}" bgcolor="#111111" text="#eeeeee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="{year}" data-game-id="{slug}" data-pack-game="1" data-pack-need="{need}" data-pack-phrase="{phrase}" data-yg-goal="Tap {need}. Finish. Incomplete never writes." data-yg-next-href="{star_href}" data-yg-next-label="{star_label}" tabindex="0" style="max-width:420px;margin:12px auto;padding:12px;font-family:Arial,sans-serif;font-size:13px">
  <h1 style="margin:0 0 6px">{title} — {year}</h1>
  <p style="margin:0">{klass}. Year one-thing is still <a href="{star_href}">{star_label}</a>.</p>
  <p class="yg-honesty yg-inspire" data-yg-inspire="1">Museum original · no official art · key <code>itt{year[2:]}-game-{slug}</code></p>
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
    <a href="game.html">{EXISTING[year][1]}</a> ·
    <a href="../../pages/home.html">Starting Point</a>
  </p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-pack-boot.js"></script>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def steps_page(year: str) -> str:
    css = CSS[year]
    star_href, star_label = STAR[year]
    ex_href, ex_title = EXISTING[year]
    toys = TOYS.get(year, ("Toy 1", "Toy 2", "Toy 3"))
    extra_lis = "\n".join(
        f' <li><a href="{g[1]}"><b>{g[2]}</b></a> — New Game → {g[6]} ×{g[4]}'
        + (f' → type <code>{g[5]}</code>' if g[5] else "")
        + " → Finish.</li>"
        for g in GAMES[year]
    )
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{year} games — do this in order</title>
<link rel="stylesheet" href="../../../../css/{css}">
</head>
<body bgcolor="#ffffff" text="#000000" data-itt-year="{year}">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="640" align="center" cellpadding="12"><tr><td style="font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a> · <a href="index.html">Lobby</a></p>
<h1>{year} — do this in order</h1>
<p>Five year games + three toys. Star is still <a href="{star_href}">{star_label}</a>. Stop early: nothing writes.</p>
<ol>
 <li><a href="{ex_href}"><b>{ex_title}</b></a> — the original year game.</li>
{extra_lis}
 <li><a href="index.html?g=1">Toy 1 {toys[0]}</a></li>
 <li><a href="index.html?g=2">Toy 2 {toys[1]}</a></li>
 <li><a href="index.html?g=3">Toy 3 {toys[2]}</a></li>
</ol>
</td></tr></table>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def patch_config(year: str) -> None:
    path = ROOT / f"js/config/{year}.js"
    text = path.read_text(encoding="utf-8")
    extras = GAMES[year] + [("steps", "steps.html", f"{year} games — do this in order", "", 0, "", "")]
    url_ins = ""
    title_ins = ""
    for slug, fname, title, *_ in extras:
        uk = f'"sites/playable/{fname}"'
        if uk not in text:
            url_ins += f'      {uk}: "http://museum.local/years/{year}/playable/{fname}",\n'
            title_ins += f'      {uk}: "{title}",\n'
    if url_ins and '"sites/playable/game.html"' in text:
        text = text.replace(
            '"sites/playable/game.html"',
            url_ins.rstrip() + "\n      " + '"sites/playable/game.html"',
            1,
        )
        # titleMap second occurrence of playable/game
        parts = text.split("titleMap", 1)
        if len(parts) == 2 and title_ins:
            tm = parts[1]
            tm = tm.replace(
                '"sites/playable/game.html"',
                title_ins.rstrip() + "\n      " + '"sites/playable/game.html"',
                1,
            )
            text = parts[0] + "titleMap" + tm
        path.write_text(text, encoding="utf-8")


def patch_index(year: str) -> None:
    path = ROOT / f"years/{year}/sites/playable/index.html"
    text = path.read_text(encoding="utf-8")
    links = " · ".join(f'<a href="{g[1]}">{g[2]}</a>' for g in GAMES[year])
    extra = f' <a href="steps.html"><b>Do this in order</b></a> · {links} ·'
    if "steps.html" not in text:
        text = text.replace('<a href="game.html">', extra + '\n <a href="game.html">', 1)
        path.write_text(text, encoding="utf-8")


def patch_home(year: str) -> None:
    path = ROOT / f"years/{year}/pages/home.html"
    text = path.read_text(encoding="utf-8")
    if "playable/steps.html" in text:
        return
    links = " · ".join(
        f'<a href="../sites/playable/{g[1]}"><b>{g[2]}</b></a>' for g in GAMES[year]
    )
    needle = "itt-playable-link"
    if needle in text:
        text = text.replace(
            "▶ Playables",
            f'▶ Playables · <a href="../sites/playable/steps.html">Do this in order</a> · {links} ·',
            1,
        )
        path.write_text(text, encoding="utf-8")


def main() -> None:
    for year, games in GAMES.items():
        outdir = ROOT / f"years/{year}/sites/playable"
        outdir.mkdir(parents=True, exist_ok=True)
        for g in games:
            (outdir / g[1]).write_text(html_page(year, g), encoding="utf-8")
        (outdir / "steps.html").write_text(steps_page(year), encoding="utf-8")
        patch_config(year)
        patch_index(year)
        patch_home(year)
        print("wrote", year, len(games) + 1, "pages")


if __name__ == "__main__":
    main()
