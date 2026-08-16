# Famous games per year (1994–2021)

**Date:** 2026-08-16  
**Ship:** `years/YYYY/sites/playable/famous.html` · `js/games/famous-kit.js` · `e2e/famous-games.spec.js`  
**Legal:** Textbook / public-domain mechanics only. Museum titles. No ripped SWF, no Nintendo/Tetris/Nokia/Miniclip pixels.  
**Contract (how to implement / full cycle / ROI / gates):** [`FAMOUS-GAMES-IMPLEMENT-BIBLE-1994-2021.md`](FAMOUS-GAMES-IMPLEMENT-BIBLE-1994-2021.md)

This file is the **pairing source** — *what* and *why* for each year. The bible is *how*.

Already on disk (do not replace): one signature year-game (`game.html`) + pack extras + 15 toys. This pack adds **two famous arcade extras** you can actually play.

| Year | Game A | Game B | Why these |
|------|--------|--------|-----------|
| 1994 | Table Tennis (Pong) | Desk Mines | Lab Pong demo · Win 3.1 Minesweeper |
| 1995 | Win95 Mines | Concentration | Win95 Games folder · Solitaire-era pairs |
| 1996 | Space Rows | Table Tennis | Shockwave shooters · still the first demo |
| 1997 | Pocket Snake | Brick Bat | Nokia 6110 Snake · portal breakout |
| 1998 | Brick Bat | Concentration | Flash nav toys · Yahoo Games pairs |
| 1999 | Fall Blocks | Pocket Snake | Flash falling-block · every Nokia |
| 2000 | Space Rows | Table Tennis | Newgrounds shooters |
| 2001 | Desk Mines | Concentration | XP Minesweeper · MSN Zone pairs |
| 2002 | Pocket Snake | Brick Bat | Java midlets · Miniclip |
| 2003 | Fall Blocks | Simon Pads | School-computer Flash |
| 2004 | Brick Bat | Desk Mines | AddictingGames · office XP |
| 2005 | Pocket Snake | Space Rows | Next to Helicopter Game |
| 2006 | Fall Blocks | Pocket Snake | Kongregate flood |
| 2007 | Table Tennis | Brick Bat | Wii Sports year |
| 2008 | Pocket Snake | Concentration | App Store free-clone flood |
| 2009 | Fall Blocks | Desk Mines | iPhone Tetris-class · Win7 Mines |
| 2010 | Pocket Snake | Brick Bat | Android Market · HTML5 canvas |
| 2011 | Concentration | Table Tennis | Casual pairs · canvas hello-world |
| 2012 | Fall Blocks | Pocket Snake | HTML5 OSS ports |
| 2013 | Pocket Snake | Brick Bat | Not Flappy (Pipe Hop stays gold game) |
| 2014 | Desk Mines | Pocket Snake | Not 2048 (Tile Fold stays) |
| 2015 | Table Tennis | Pocket Snake | Not agar.io (Blob Rush stays) |
| 2016 | Concentration | Brick Bat | Beside PoGO |
| 2017 | Pocket Snake | Fall Blocks | Not Fortnite (Storm Circle stays) |
| 2018 | Concentration | Table Tennis | Casual + demo |
| 2019 | Pocket Snake | Brick Bat | Anti-FYP toy |
| 2020 | Brick Bat | Concentration | Lockdown tabs · not Among Us |
| 2021 | Concentration | Pocket Snake | Not Wordle (Five Letter stays) |

**Engines (OSS-class):** Pong · Snake · Breakout · Minesweeper-class · falling-block · memory pairs · Space Invaders-class · Simon. All in `famous-kit.js`.

**Storage:** `ittYY-game-<engine>` after a scored run. `?test=1` writes 12 after Start for e2e. Load / no Start writes nothing.
