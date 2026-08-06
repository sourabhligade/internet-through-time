# Year games — authenticity & UX improvement pass

**Date:** 2026-08-06  
**Scope:** In-year **playables** (3 toys / year) + **full year game** (`sites/playable/game.html`) for **1994–2018**.  
**Legal:** Museum-original JS only · no ripped SWFs · no official brand game assets · localStorage theater only.

---

## What ships

| Layer | Path | Role |
|-------|------|------|
| **Playables lobby** | `years/YYYY/sites/playable/index.html` | 3 period toys via `data-year-playable` |
| **Playable engine** | `js/immersion/year-playable.js` | meter / targets / type / hold + set progress |
| **Playable CSS** | `css/year-playable.css` | Era shells (early · nav · xp · web2 · app · modern) |
| **Full year game** | `years/YYYY/sites/playable/game.html` | Signature game per year |
| **Year game boot** | `js/games/year-game-boot.js` | Storage keys `ittYY-game-*` · focus |
| **Year modules** | `js/games/year-YYYY-*.js` | Dedicated games (1994–2015 + **2016–2018 new**) |
| **Games wing** | `games/` | Separate lobby (HoverChop · TrailSled · Blox) |

---

## UX flow (visitor)

```
Home → ▶ Playables strip
  → Toy 1 Play → win ✓ (passport stamp playable-1)
  → Toy 2 → Toy 3
  → all 3 → ittYY-playable-set + passport playable-set
  → Full year game → signature session → ittYY-game-<id>
  → Back to Starting Point / year tour
```

Progress rail on lobby: `○ ○ ○` → `● ● ●` with count **n/3**.

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
| 2000 | portaljudge | year-2000-portaljudge | Flash portal voting literacy |
| 2001 | clickscape | year-2001-clickscape | Broadband / clicker |
| 2002 | roomsticky | year-2002-roomsticky | Friendster room |
| 2003 | gagslite | year-2003-gagslite | MySpace gags |
| 2004 | cubewhack | year-2004-cubewhack | Flash cube era |
| 2005 | heli | heli.js | Helicopter Flash class |
| 2006 | sled | sled.js | Trail sled casual |
| 2007 | boxshift | year-2007-boxshift | iPhone-era puzzle |
| 2008 | tapgrid | year-2008-tapgrid | App Store tap |
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
npx playwright test e2e/year-games.spec.js e2e/year-games-real.spec.js --workers=1
# or year-games flows packs if present
```

New coverage: 2016 Gym Rush · 2017 incomplete · 2018 Consent incomplete/complete.

---

## Residual forever

- Perfect pixel-art period mascots (do not invent brand characters)  
- Audio modem samples for 1994 dial-up toy  
- Full 3D/WebGL remakes (out of scope)  
- Games wing SWF rips (never)

---

## Implement follow-ups (optional)

| ID | Item |
|----|------|
| G-LBL | Add `labels:[]` to remaining targets toys (1997 ICQ, 2006 Digg, …) |
| G-HOME | Ensure every home playable strip lists current toy titles from GAMES |
| G-WING | Cross-link games wing ↔ year game.html more clearly |
