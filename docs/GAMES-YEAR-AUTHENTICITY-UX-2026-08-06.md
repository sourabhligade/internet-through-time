# Year games — authenticity & UX improvement pass

**Date:** 2026-08-06  
**Scope:** In-year **game cabinet** + **full year game** (`sites/playable/game.html`) for live years **1994–2009**. Toys (meter/targets/type/hold) were removed 2026-08-17.  
**Legal:** Museum-original JS only · no ripped SWFs · no official brand game assets · localStorage theater only.

---

## What ships

| Layer | Path | Role |
|-------|------|------|
| **Playables lobby** | `years/YYYY/sites/playable/index.html` | Cabinet: featured year game + famous pair |
| **Playable engine** | `js/immersion/year-playable.js` | Renders `[data-yp-cabinet]` from `js/config/year-playable.js` |
| **Playable CSS** | `css/year-playable.css` | Era shells (early · nav · xp · web2 · app · modern) |
| **Full year game** | `years/YYYY/sites/playable/game.html` | Signature game per year |
| **Year game boot** | `js/games/year-game-boot.js` | Storage keys `ittYY-game-*` · focus |
| **Year modules** | `js/games/year-YYYY-*.js` | Dedicated games (1994–2015 + **2016–2018 new**) |
| **Games wing** | `games/` | Separate lobby (HoverChop · TrailSled · Blox) |

---

## UX flow (visitor)

```
Home → ▶ Play this year’s game
  → game.html signature session → ittYY-game-<id>
  → Famous games (optional) → ittYY-game-<engine>
  → Back to Starting Point / year tour
```

Lobby is a **cabinet**, not a 3-toy rail. Year meter “Playable” lights from any `ittYY-game-*` save.

---

## Authenticity improvements (this pass)

1. **Era-styled shells** for playables (Times/Win chrome early · XP blue bar · dark modern 2018).  
2. **Goal / how-to strip** under each toy blurb.  
3. **Labeled targets** (not just dots) for signature toys — e.g. 1994 hotlist brands, 2005 YouTube, 2018 cookie CTAs.  
4. **REAL multi-step** on full games: 2018 Consent Dash refuses write until Manage + rights + Analytics off.  
5. **Hard bans in copy:** no official PoGO sprites · no Face ID biometrics · no Fortnite skins · no legal advice.  
6. **2016 Gym Rush · 2017 Storm Scan · 2018 Consent Dash** fill missing full-game years.  
7. **Chrome nav** on every playable index: Home · Map · About · Full game · Toys 1–3 · set stamp hint.  
8. **Passport stamps** on toy win + set complete + full game wins (where wired).

---

## Full year game map

| Year | Game id | Module / host | Thesis |
|-----:|---------|---------------|--------|
| 1994 | hotlist | year-1994-hotlist | Netscape hotlist surf |
| 1995 | checkers | year-1995-checkers | Desktop game culture |
| 1996 | planets | year-1996-planets | Space Jam portal energy |
| 1997 | connect4 | year-1997-connect4 | Casual Java/ActiveX era |
| 1998 | skipintro | year-1998-skipintro | Skip intro culture |
| 1999 | petdash | year-1999-petdash | Pet.com / Y2K play |
| 2000 | lotlife | year-2000-lotlife | The Sims–class lot / needs |
| 2001 | clickscape | year-2001-clickscape | Broadband / clicker |
| 2002 | roomsticky | year-2002-roomsticky | Friendster room |
| 2003 | gagslite | year-2003-gagslite | MySpace gags |
| 2004 | gemcascade | year-2004-gemcascade | Bejeweled / PopCap match-3 |
| 2005 | heli | heli.js | Helicopter Flash class |
| 2006 | sled | sled.js | Trail sled casual |
| 2007 | boxshift | year-2007-boxshift | iPhone-era puzzle |
| 2008 | goospan | year-2008-goospan | World of Goo span |
| 2009 | plotneighbors | year-2009-plotneighbors | FarmVille plots |
| 2010 | ragtrail | year-2010-ragtrail | iPad / app trail |
| 2011 | letterswap | year-2011-letterswap | Word game class |
| 2012 | guessdoodle | year-2012-guessdoodle | Draw Something class |
| 2013 | pipehop | year-2013-pipehop | Flappy-class silhouette |
| 2014 | tilefold | year-2014-tilefold | 2048-class |
| 2015 | blobrush | year-2015-blobrush | Agar-class |
| **2016** | **gymrush** | **year-2016-gymrush** | PoGO map-node silhouette |
| **2017** | **stormscan** | **year-2017-stormscan** | Face scan + storm multi-step |
| **2018** | **consentdash** | **year-2018-consentdash** | GDPR Manage REAL |

---

## Storage keys

| Pattern | Meaning |
|---------|---------|
| `ittYY-playable` · `-2` · `-3` | Toy scores / wins |
| `ittYY-playable-set` | All three toys won once |
| `ittYY-game-<id>` | Full year game best / literacy blob |

---

## e2e

```bash
# Full matrix: load · real storage · flows · a11y (every year 1994–2018)
npm run test:e2e:year-games
# A11y + primary flow only:
npm run test:e2e:year-games-a11y
```

Coverage: all year `game.html` loads · REAL incomplete/complete · full flow matrix ·
**a11y shell** (region, tabindex, aria-label, live status, focus, primary CTA) ·
playable lobby smoke · 2016 Gym Rush · 2017 incomplete · 2018 Consent incomplete/complete.

---

## Residual forever

- Perfect pixel-art period mascots (do not invent brand characters)  
- Audio modem samples for 1994 dial-up toy  
- Full 3D/WebGL remakes (out of scope)  
- Games wing SWF rips (never)

## Source expansion research (2026-08-07)

**Research-only map** (Flashpoint · IA Flash · viral launches · FarmVille freemium · portal histories → densify info/UX on games we already ship):

→ [`GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md)  
→ **Phases:** [`GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) (G0–G11)

Sister (product years, not games): [`SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md)

---

## Implement follow-ups (optional)

| ID | Item | Status |
|----|------|--------|
| G-LBL | Add `labels:[]` to remaining targets toys | **[x]** batch 2026-08-07 |
| G-HOME | Ensure every home playable strip lists current toy titles from GAMES | residual |
| G-WING | Cross-link games wing ↔ year game.html more clearly | residual · wing About densify **[x]** |
| G-INSPIRE | Inspiration strips all game.html | **[x]** 2026-08-07 |
| G-2009 | Freemium literacy gate | **[x]** |
| G-2018 | Consent Dash product GDPR parity | **[x]** |
