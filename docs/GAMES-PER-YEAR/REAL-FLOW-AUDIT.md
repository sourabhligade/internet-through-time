# Year games — REAL flow alignment audit

**Date:** 2026-08-06  
**Scope:** `years/YYYY/sites/playable/game.html` for **1994–2014**  
**Gates:**  
- Static key/script audit  
- `e2e/year-games.spec.js` + `year-games-flows.spec.js` (playable)  
- `e2e/year-games-real.spec.js` (**REAL** contract)

## REAL rules used

| Pass | Fail |
|------|------|
| Year-prefixed key `ittYY-game-<id>` (1994 → `itt94`) | Cross-year key pollution |
| Payload has content (`real: true`, year, gameId / best / state) | Soft `setItem(k,'1')` success |
| Incomplete multi-step does **not** write (2000 ballot) | Empty form “saved” |
| Complete primary path can write | State evaporates on reload (state games) |

## Matrix

| Year | Game id | Storage key | Write when | Incomplete gate | REAL e2e |
|------|---------|-------------|----------------|-----------------|----------|
| 1994 | hotlist | `itt94-game-hotlist` | round end, score>0 | no write on bare load | ✓ |
| 1995 | checkers | `itt95-game-checkers` | win/loss/draw/resign | no write until game ends | ✓ resign |
| 1996 | planets | `itt96-game-planets` | round end, score>0 | load clean | ✓ API + isolation |
| 1997 | connect4 | `itt97-game-connect4` | win/loss/draw/resign | lobby incomplete OK | ✓ resign |
| 1998 | skipintro | `itt98-game-skipintro` | crash with score>0 | load clean | ✓ API |
| 1999 | petdash | `itt99-game-petdash` | feed/rest/catch | load may hydrate only if prior | ✓ feed |
| 2000 | portaljudge | `itt00-game-portaljudge` | all 5 rates + submit | **submit blocked / no write** | ✓ both |
| 2001 | clickscape | `itt01-game-clickscape` | walk/chop/mine/bank | load without prior key | ✓ structure |
| 2002 | roomsticky | `itt02-game-roomsticky` | place/note/walk | load clean | ✓ place |
| 2003 | gagslite | `itt03-game-gagslite` | fight end | start without end OK | ✓ |
| 2004 | cubewhack | `itt04-game-cubewhack` | timer end score>0 | load clean | ✓ |
| 2005 | heli | `itt05-game-heli` | crash + year hook | load clean | ✓ hook |
| 2006 | sled | `itt06-game-sled` | ride finish + hook | load clean | ✓ |
| 2007 | boxshift | `itt07-game-boxshift` | level clear progress | load may resume | ✓ structure |
| 2008 | tapgrid | `itt08-game-tapgrid` | install / bubble end | load clean | ✓ |
| 2009 | plotneighbors | `itt09-game-plotneighbors` | plant/harvest/help | empty plant blocked if poor | ✓ plant |
| 2010 | ragtrail | `itt10-game-ragtrail` | run end score>0 | load clean | ✓ |
| 2011 | letterswap | `itt11-game-letterswap` | timer end score>0 | invalid word no score write | ✓ |
| 2012 | guessdoodle | `itt12-game-guessdoodle` | 5-round session end | incomplete round no best | ✓ |
| 2013 | pipehop | `itt13-game-pipehop` | die score>0 | load clean | ✓ |
| 2014 | tilefold | `itt14-game-tilefold` | moves update bestScore | load clean | ✓ |

## Alignment checklist

| Check | Status |
|-------|--------|
| Every year has `game.html` + `data-year` + `data-game-id` | ✓ |
| Storage prefix matches year (`itt94`…`itt14`) | ✓ |
| Shared `ITT.YearGame.saveBest/saveJSON` used | ✓ |
| No soft-mock `setItem(...,'1')` in year game JS | ✓ |
| 2000 multi-step literacy incomplete null | ✓ e2e |
| Isolation sample 2005↛2006 | ✓ e2e |
| Flow playable suite | ✓ 46 passed |
| REAL suite | ✓ 43 passed |

## Commands

```bash
# Playable flows (UI actions)
npx playwright test e2e/year-games-flows.spec.js e2e/year-games.spec.js --workers=1

# REAL storage contracts
npx playwright test e2e/year-games-real.spec.js --workers=1
```

## Residual (honest)

- Score-end games that end with **score 0** intentionally do not write best (REAL empty-block).  
- Some long end-of-round paths (hotlist full timer, letterswap 2 min) are proven via `YearGame.saveBest` API + partial UI; full timer soak is optional CI cost.  
- Product **site** flows (Amazon cart, YouTube, etc.) are separate from year-game REAL packs — see `docs/REAL-FLOW-SYSTEM.md` and year `*-flows.spec.js`.
