# Games per year — implementation bibles

**Date:** 2026-08-06  
**Purpose:** One detailed build bible **per museum year** (1994–2015): which game, how it works minute-by-minute, goals, phases, files, acceptance.  
**Companion research:** [`../GAMES-PERIOD-RESEARCH-2026-07-31.md`](../GAMES-PERIOD-RESEARCH-2026-07-31.md) · live wing [`../../games/`](../../games/)  
**Legal (all years):** Museum-**original** HTML/JS only · **no** ripped commercial `.swf` · original names/art · label period **inspiration** on About copy.

## Index

| Year | Game (museum title) | Genre class | Effort | File |
|------|---------------------|-------------|--------|------|
| 1994 | Hotlist Surfer | Early web / hotlist | S | [YEAR-1994.md](YEAR-1994.md) |
| 1995 | Applet Checkers | Java applet board | M | [YEAR-1995.md](YEAR-1995.md) |
| 1996 | Planet Hop | Space Jam hub clicker | S–M | [YEAR-1996.md](YEAR-1996.md) |
| 1997 | Lobby Connect Four | Yahoo Games / ClassicGames | S–M | [YEAR-1997.md](YEAR-1997.md) |
| 1998 | Skip-Intro Runner | Agency Flash culture | M | [YEAR-1998.md](YEAR-1998.md) |
| 1999 | Pixel Pet Dash | Neopets-class pet + mini | M | [YEAR-1999.md](YEAR-1999.md) |
| 2000 | Portal Judge | Newgrounds Portal culture | S | [YEAR-2000.md](YEAR-2000.md) |
| 2001 | Clickscape | RuneScape-class click grind | M | [YEAR-2001.md](YEAR-2001.md) |
| 2002 | Room Sticky | Habbo-class room toy | M | [YEAR-2002.md](YEAR-2002.md) |
| 2003 | Gags Lite | Kids MMO turn mini | M | [YEAR-2003.md](YEAR-2003.md) |
| 2004 | Cubicle Whack | Casual reaction / “whack” | S–M | [YEAR-2004.md](YEAR-2004.md) |
| 2005 | HoverChop (year wire) | Helicopter Flash class | S (exists) | [YEAR-2005.md](YEAR-2005.md) |
| 2006 | TrailSled (year wire) | Line Rider class | S (exists) | [YEAR-2006.md](YEAR-2006.md) |
| 2007 | Box Shift | Portal-puzzle class | M–L | [YEAR-2007.md](YEAR-2007.md) |
| 2008 | Tap Grid Free | App Store free-game | M | [YEAR-2008.md](YEAR-2008.md) |
| 2009 | Plot Neighbors | FarmVille-class | M | [YEAR-2009.md](YEAR-2009.md) |
| 2010 | Rag Trail | Physics / Happy Wheels class | M–L | [YEAR-2010.md](YEAR-2010.md) |
| 2011 | Letter Swap | Social word game | M | [YEAR-2011.md](YEAR-2011.md) |
| 2012 | Guess Doodle | Draw Something class | M | [YEAR-2012.md](YEAR-2012.md) |
| 2013 | Pipe Hop | Flappy-class one-tap | S–M | [YEAR-2013.md](YEAR-2013.md) |
| 2014 | Tile Fold | 2048-class merge | M | [YEAR-2014.md](YEAR-2014.md) |
| 2015 | Blob Rush | agar.io-class arena | M | [YEAR-2015.md](YEAR-2015.md) |

## Shared integration (every year)

```
years/YYYY/
  sites/playable/
    index.html          # existing toys + link to game.html
    game.html           # YEAR GAME (this bible)
js/games/
  scores.js             # shared high-score helper (exists)
  year-game-boot.js     # NEW shared boot (Phase 0 once)
  year-YYYY-<slug>.js   # per-year game logic
css/games.css           # extend for year chrome
e2e/
  year-games.spec.js    # all years: start → end → storage
```

### Storage contract

| Key | Meaning |
|-----|---------|
| `ittYY-game-<id>` | Year-isolated best run / save blob |
| `itt-games-scores` | Optional shared arcade board (wing) |
| Never write | On bare page load or incomplete start |

### Shared gates

```bash
python3 -m http.server 8080 --bind 127.0.0.1
npx playwright test e2e/year-games.spec.js --workers=1
# plus year pack if present:
# npx playwright test e2e/YYYY-*.spec.js --workers=1
```

### Build order recommendation

1. **Scaffold all** `game.html` stubs + boot (all years, theater shell).  
2. **Wire existing:** 2005 HoverChop · 2006 TrailSled · optional Blox→2004.  
3. **Viral pack:** 2009 · 2013 · 2014 · 1999.  
4. **Early pack:** 1994 · 1995 · 1997 · 1998.  
5. **Fill remaining** by effort ascending.

## How to use a YEAR-*.md file

1. Read **Goals** and **How it works** before coding.  
2. Execute **phases in order** (unless *parallel-ok*).  
3. Each phase has **Goal · Sources · What · How (minute) · Files · Acceptance**.  
4. Check off `[ ]` → `[x]` when acceptance passes.  
5. Update this README status column when a year ships.

---

## Implementation status (2026-08-06)

**All 21 years ship a playable `years/YYYY/sites/playable/game.html`.**

| Year | Game | Module | Storage key |
|------|------|--------|-------------|
| 1994 | Hotlist Surfer | `year-1994-hotlist.js` | `itt94-game-hotlist` |
| 1995 | Applet Checkers | `year-1995-checkers.js` | `itt95-game-checkers` |
| 1996 | Planet Hop | `year-1996-planets.js` | `itt96-game-planets` |
| 1997 | Lobby Connect Four | `year-1997-connect4.js` | `itt97-game-connect4` |
| 1998 | Skip-Intro Runner | `year-1998-skipintro.js` | `itt98-game-skipintro` |
| 1999 | Pixel Pet Dash | `year-1999-petdash.js` | `itt99-game-petdash` |
| 2000 | Portal Judge | `year-2000-portaljudge.js` | `itt00-game-portaljudge` |
| 2001 | Clickscape | `year-2001-clickscape.js` | `itt01-game-clickscape` |
| 2002 | Room Sticky | `year-2002-roomsticky.js` | `itt02-game-roomsticky` |
| 2003 | Gags Lite | `year-2003-gagslite.js` | `itt03-game-gagslite` |
| 2004 | Cubicle Whack | `year-2004-cubewhack.js` | `itt04-game-cubewhack` |
| 2005 | HoverChop | `heli.js` + boot | `itt05-game-heli` |
| 2006 | TrailSled | `sled.js` + boot | `itt06-game-sled` |
| 2007 | Box Shift | `year-2007-boxshift.js` | `itt07-game-boxshift` |
| 2008 | Tap Grid Free | `year-2008-tapgrid.js` | `itt08-game-tapgrid` |
| 2009 | Plot Neighbors | `year-2009-plotneighbors.js` | `itt09-game-plotneighbors` |
| 2010 | Rag Trail | `sled.js` themed | `itt10-game-sled` |
| 2011 | Letter Swap | `year-2011-letterswap.js` | `itt11-game-letterswap` |
| 2012 | Guess Doodle | `year-2012-guessdoodle.js` | `itt12-game-guessdoodle` |
| 2013 | Pipe Hop | `year-2013-pipehop.js` | `itt13-game-pipehop` |
| 2014 | Tile Fold | `year-2014-tilefold.js` | `itt14-game-tilefold` |

Shared: `js/games/year-game-boot.js` · e2e `e2e/year-games.spec.js` + `e2e/year-games-flows.spec.js`.

How to play: open a year → Starting Point / Playables → **▶ Full year game**.

### Complexity upgrades (2026-08-06 pass 2)

| Year | Upgrade |
|------|---------|
| 1995 | Full multi-jump chains · mandatory captures · smarter AI · king both ways · move hints |
| 2001 | BFS pathfind · mining skill · tree HP/respawn · 12-slot inv · bank dual items |
| 2007 | 7 levels · A/C portals · button/door · move counter · level skip |
| 2009 | 5 crops · unlock tiers · wilt · neighbor cooldown |
| 2010 | Freehand drag physics · bounce/friction · distance stars (not just click-points sled) |
| 2011 | ~900-word dict · Scrabble bag · tile click · shuffle · bingo · 2-min rounds |
| 2013 | Difficulty ramp (speed + tighter gaps) · bronze/silver/gold medals |
