# Games source expansion — implementation phases step-by-step

**Date:** 2026-08-07  
**Status:** Research freeze **[x]** · implement densify **[x] 2026-08-07** (G0–G8 · G11; G9/G10 light)  
**Scope:** Densify **info + UX** on **already-shipped** year games (1994–2018) + playables + games wing  
**Research bible:** [`GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md)  
**What ships today:** [`GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md`](GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md)  
**Sister (product rooms):** [`SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md)

### Can we?

**Yes.** 75 toys + 25 full games + wing already live. Phases below only densify — **no** SWF rips, **no** new game engines, **no** invent brand art.

### Legal (every phase)

1. Museum-original JS only · no commercial `.swf` / APK in repo  
2. Inspiration **class** labels only (“2048-class”, not “this is 2048”)  
3. Incomplete multi-step → **no** `ittYY-game-*` write  
4. No official Pokémon / Fortnite / Disney / Zynga free pixels  
5. localStorage theater only  

### Status marks

| Mark | Meaning |
|------|---------|
| `[ ]` | Open |
| `[~]` | Partial |
| `[x]` | Done |

### Effort

| Tag | Rough time |
|-----|------------|
| **S** | under ~2 hours |
| **M** | half day – 1 day |
| **L** | multi-day |

---

## Phase map (print this)

| Phase | Name | Effort | Done when | Status |
|------:|------|--------|-----------|--------|
| **G0** | Freeze · kits · CAPTURE scaffold | S | SOURCE-KITs for priority years + games CAPTURE file | **[x]** |
| **G1** | **PG-INSPIRE** strips all `game.html` | S–M | Every 1994–2018 game has dated inspiration class strip | **[x]** |
| **G2** | **2018 Consent Dash ↔ GDPR product parity** | M | Multi-step matches product manage/rights; e2e green | **[x]** |
| **G3** | **2009 Plot Neighbors freemium literacy** | M | Multi-step plant/harvest/neighbor + FarmVille date strip | **[x]** |
| **G4** | **Viral pack 2013–2015** | S–M | pipehop · tilefold · blobrush literacy + incomplete gates | **[x]** strips (gates light) |
| **G5** | **Flash peak 2005–2006** | S–M | heli + sled control/viral strips | **[x]** strips |
| **G6** | **Social / draw 2012 + portal 2000** | M | guessdoodle + portaljudge densify | **[x]** strips |
| **G7** | **Games wing literacy** | M | About Flashpoint/IA/Ruffle · portal chrome notes | **[x]** |
| **G8** | **Toy labels + home strip honesty** | S | `labels:[]` sweep · home titles match toys | **[x]** labels |
| **G9** | **Focus / pause contract** | S–M | year-game-boot focus + pause where missing | **[~]** focus exists; pause optional residual |
| **G10** | **Early pack 1994–1999 + mid …** | M | Remaining inspiration depth + light UX | **[x]** via G1 all years |
| **G11** | **e2e expand + grade honesty** | S | year-games* green · docs residual updated | **[x]** |

**Recommended order:** G0 → G1 → G2 → G3 → G4 → G5 → G6 → G7 → G8 → G9 → G10 → G11  

**Minimum ship stack (1–2 days):** G0 → G1 → G2 → G11  

---

# Phase G0 — Freeze · kits · CAPTURE scaffold

**Goal:** Lock menus so implementers don’t invent dates.  
**Effort:** S  
**Depends:** Research bible open  

### Steps

1. Create `docs/references/games/CAPTURE-LOG.md` with header + empty HG- table.  
2. Create `docs/references/games/SOURCE-KIT-TEMPLATE.md` (copy from research §10).  
3. Fill kits for **priority years only:**  
   - `SOURCE-KIT-2009.md` · `2013` · `2014` · `2015` · `2018` · optional `2005` · `2006` · `2012`  
4. Each kit: full game id · primary dates + URLs · bans · three toy titles · sprint checkbox.  
5. Link kits from research bible + this phases file.

### Files

```
docs/references/games/CAPTURE-LOG.md          # NEW
docs/references/games/SOURCE-KIT-TEMPLATE.md  # NEW
docs/references/games/SOURCE-KIT-2009.md      # NEW …
docs/references/games/SOURCE-KIT-2018.md
```

### Acceptance G0

- [ ] CAPTURE-LOG exists  
- [ ] ≥5 year kits filled with **URLs + dates**  
- [ ] No code change required  

---

# Phase G1 — PG-INSPIRE strips (all year games)

**Goal:** Every full year game states **inspiration class + date honesty + ban**.  
**Effort:** S–M  
**Depends:** G0 (dates locked)  
**Visitor win:** Highest honesty per minute  

### Steps

1. Open research §6 paste strips (re-verify dates once).  
2. For each `years/YYYY/sites/playable/game.html`:  
   - Ensure a visible `.yg-honesty` / inspiration block exists.  
   - Upgrade thin lines to include: **class name · primary date · not trademark claim · storage key**.  
3. Priority years first (use full paste from research):  
   **2005 · 2006 · 2009 · 2012 · 2013 · 2014 · 2015 · 2018**  
4. Remaining years: lighter strip (“period [genre] class · museum original · key `ittYY-game-…`”).  
5. Optional CSS: shared `.yg-inspire` in `css/year-game-ui.css` (border, 11px).  
6. CAPTURE: one row `HG-inspire-batch` noting visit date of research bible.

### Minute checklist (one game)

```
1. Open game.html
2. Find .honesty / .yg-honesty
3. Replace/expand with class + date + ban
4. Keep existing key code mention
5. Save · open in browser · strip readable without play
```

### Files

```
years/1994/sites/playable/game.html … years/2018/sites/playable/game.html
css/year-game-ui.css                  # optional .yg-inspire
docs/references/games/CAPTURE-LOG.md
```

### Acceptance G1

- [ ] All 25 `game.html` have inspiration class language  
- [ ] 2005/06/09/12–15/18 include **hard dates** from research  
- [ ] No claim “this is Flappy/FarmVille/2048/agar” without “class”  
- [ ] Manual spot-check 5 years in browser  

### Gate

```bash
# smoke: every game.html contains "class" or "museum" honesty
rg -l "yg-honesty|honesty" years/*/sites/playable/game.html | wc -l   # expect 25
```

---

# Phase G2 — 2018 Consent Dash ↔ product GDPR parity

**Goal:** Year game teaches same multi-step literacy as `sites/gdpr/`.  
**Effort:** M  
**Depends:** G1 strip on 2018; product GDPR multipage already on disk  

### Current state (disk)

- Product: `years/2018/sites/gdpr/` index · manage · rights · industry  
- Game: `years/2018/sites/playable/game.html` + `js/games/year-2018-consentdash.js`  
- Game already: Accept all does **not** complete REAL; Manage + rights path  

### Steps

1. **Audit gap** — open product manage.html vs consentdash panel side by side.  
2. Add to game panel if missing:  
   - Design literacy: Accept-all louder than Manage (checkbox)  
   - Marketing toggle (optional off)  
   - Link to product: `../gdpr/manage.html` · `../gdpr/rights.html` · `../gdpr/industry.html`  
3. **Incomplete gates** (must not write `itt18-game-consentdash`):  
   - Save without Manage open  
   - Save without rights check  
   - Save with Analytics still on (if REAL path requires off) — keep existing rules honest  
4. Status copy: “Not legal advice · aligns with museum GDPR room”.  
5. Inspiration strip: May 25 2018 · CMP class · link product.  
6. e2e: extend `e2e/year-games-real.spec.js` — incomplete no write · complete writes · optional manage multipage path already in product e2e.

### Files

```
years/2018/sites/playable/game.html
js/games/year-2018-consentdash.js
e2e/year-games-real.spec.js
docs/references/games/SOURCE-KIT-2018.md
docs/references/games/CAPTURE-LOG.md   # HG-2018-consent-parity
```

### Acceptance G2

- [ ] Game links to product GDPR multipage  
- [ ] Incomplete save does not write storage  
- [ ] Complete Manage path writes `itt18-game-consentdash`  
- [ ] Design or rights literacy required  
- [ ] `npx playwright test e2e/year-games-real.spec.js --grep 2018 --workers=1` green  

---

# Phase G3 — 2009 Plot Neighbors freemium densify

**Goal:** FarmVille-class freemium literacy with dated honesty.  
**Effort:** M  
**Depends:** G1 strip for 2009  

### Obtained research (do not invent)

- FarmVille Facebook launch **19 June 2009**  
- Freemium · neighbor help · energy/harvest timers class  
- Peak popularity **~2010** MAU class — label “class”  

### Steps

1. Upgrade `game.html` honesty strip with **2009-06-19** + not Zynga.  
2. Add **literacy panel** (HTML):  
   - [ ] Freemium pressure is the product (not “just a farm toy”)  
   - [ ] Neighbor help is social obligation theater  
   - [ ] No real money  
3. Wire JS: high-score / “session complete” only after literacy + ≥1 harvest (or keep current complex loop but gate **first** persist).  
4. Toy `FarmVille plant` in `year-playable.js`: blurb mentions freemium class.  
5. Link exhibit: already has `../farmville/index.html` — keep.  
6. e2e: incomplete literacy no write if you add gate; else densify assert strip text.

### Files

```
years/2009/sites/playable/game.html
js/games/year-2009-plotneighbors.js
js/immersion/year-playable.js          # 2009 toy blurb only
e2e/year-games-real.spec.js            # optional
```

### Acceptance G3

- [ ] Date + not Zynga visible without playing  
- [ ] Neighbor / freemium literacy present  
- [ ] Storage rules documented in honesty strip  
- [ ] Manual play: plant → harvest still works  

---

# Phase G4 — Viral pack 2013 · 2014 · 2015

**Goal:** Hard launch dates + clone/open-source/.io literacy on three viral games.  
**Effort:** S–M  
**Depends:** G1  

### Per-year steps

#### G4a — 2013 Pipe Hop (Flappy-class)

1. Strip: iOS **2013-05-24** · viral early 2014 · removed **~2014-02-10** · **clone flood**.  
2. Silhouette pipes only · ban Mario IP language.  
3. Optional careful one-liner: addictive one-tap class (no trauma).  
4. Optional: “calm mode” longer gaps — only if easy (else skip).  

#### G4b — 2014 Tile Fold (2048-class)

1. Strip: Cirulli **2048 web 2014-03-09** · lineage **Threes / 1024** · open-source viral.  
2. Honesty: “merge-puzzle class · not we are 2048”.  
3. Optional: first win requires reading lineage checkbox (light multi-step).  

#### G4c — 2015 Blob Rush (agar.io-class)

1. Strip: browser **2015-04-28** · Miniclip mobile **Jul 2015** · **.io games** wave.  
2. Original blobs only · no Miniclip branding.  
3. Optional: “eat smaller · avoid larger” how-to line.  

### Files

```
years/2013/sites/playable/game.html  + year-2013-pipehop.js
years/2014/sites/playable/game.html  + year-2014-tilefold.js
years/2015/sites/playable/game.html  + year-2015-blobrush.js
```

### Acceptance G4

- [ ] All three strips show hard dates from research  
- [ ] Inspiration **class** language  
- [ ] e2e year-games still green for these years  
- [ ] CAPTURE HG-viral-2013-15  

---

# Phase G5 — Flash peak 2005–2006

**Goal:** Helicopter-class + Line Rider–class honesty and control UX.  
**Effort:** S–M  

### G5a — 2005 heli (HoverChop)

1. Strip: one-button hold-to-rise · AddictingGames-era peers · museum original.  
2. UX: restart affordance visible · mute if missing · high score “this browser only”.  
3. Link wing: `games/play/heli.html` if separate.  

### G5b — 2006 sled (TrailSled)

1. Strip: **Line Rider 2006-09-23** · Digg/YouTube viral · draw-path class.  
2. UX: short how-to “draw · ride · restart”.  
3. Wing cross-link `games/play/sled.html`.  

### Acceptance G5

- [ ] Both strips dated/class-true  
- [ ] Controls discoverable without reading module source  
- [ ] No Line Rider / Helicopter commercial assets  

---

# Phase G6 — 2012 Guess Doodle + 2000 Portal Judge

**Effort:** M  

### G6a — 2012 guessdoodle

1. Strip: Draw Something **2012-02-06** · Zynga/OMGPOP **2012-03-21** class deal.  
2. UX: draw → pass device theater → guess (if not already) · async social literacy.  
3. Ban: not Zynga IP art.  

### G6b — 2000 portaljudge

1. Read NG Flash Portal History (research).  
2. Densify UI copy: vote scale · judgment culture · “portal submission” frame.  
3. Strip: Newgrounds founded 1995 · portal culture 2000s.  

### Acceptance G6

- [ ] 2012 acquisition literacy present  
- [ ] 2000 portal language feels period (blam/vote class without copying trademarked UI pixels)  

---

# Phase G7 — Games wing literacy

**Goal:** Wing explains preservation vs museum originals.  
**Effort:** M  

### Steps

1. `games/about.html` — add section:  
   - Flashpoint (since Dec 2017, 100k–200k+ experiences)  
   - IA Flash libraries  
   - Ruffle = modern rehost · we still ship JS originals  
   - Legal: no SWF rips in this museum  
2. Each portal index (`games/portals/*/index.html`): one-line **period role** (e.g. Kongregate **2006-10-10** class).  
3. Worlds: Club Penguin public **2005-10-24** · Disney **2007-08-01** · Neopets **1999** — text only.  
4. Optional: link from year game.html footers for 2005–2009: “More portal culture → games wing”.

### Files

```
games/about.html
games/portals/*/index.html
games/worlds/*/index.html
years/2005–2009/sites/playable/game.html   # footer links optional
```

### Acceptance G7

- [ ] Wing About mentions Flashpoint + no SWF policy  
- [ ] ≥3 portals have date/role line  
- [ ] No Disney/Neopets official art added  

---

# Phase G8 — Toy labels + home strip honesty

**Goal:** Targets toys show period words; homes list real toy titles.  
**Effort:** S  
**Residual ID:** G-LBL from authenticity doc  

### Steps

1. Grep `year-playable.js` for `type: "targets"` without `labels`.  
2. Add 3–6 short labels per toy (period slang, not brands you can’t use).  
3. Spot-check homes: playable strip / kicker uses engine titles (not stale copy).  
4. Optional e2e: one year playable labels visible after mount.

### Files

```
js/immersion/year-playable.js
years/*/pages/home.html          # only if strip text stale
years/*/sites/playable/index.html
```

### Acceptance G8

- [ ] No targets toy left without labels (or listed exception)  
- [ ] 1997 ICQ · 2006 Digg-class toys improved if present  

---

# Phase G9 — Focus / pause contract

**Goal:** Keyboard games don’t “eat” focus; Esc/pause exists where needed.  
**Effort:** S–M  
**Depends:** 2007 BoxShift lessons  

### Steps

1. Read `js/games/year-game-boot.js` — document current focus behavior.  
2. Ensure `data-year-game` shells: `tabindex="0"` · focus on start.  
3. Add Pause (P / Esc) for continuous games: heli · sled · pipehop · blobrush · gymrush if missing.  
4. Visible focus ring in `year-game-ui.css`.  
5. e2e optional: game shell focusable.

### Acceptance G9

- [ ] Start focuses game shell  
- [ ] At least pipehop + heli + boxshift pause or documented N/A  
- [ ] No regression on 2007  

---

# Phase G10 — Remaining years light densify

**Goal:** Close “thin strip only” years.  
**Effort:** M  
**Depends:** G1 done  

### Order (ascending effort)

1. **2016 gymrush** — PoGO Jul 6 · silhouette · battery · no GPS (sync product room bans)  
2. **2017 stormscan** — Face ID residual + multi-step already · align product copy  
3. **2007 boxshift** — puzzle-class only · pre-App-Store 2007 honesty  
4. **2008 tapgrid** — free App Store rating theater  
5. **2010 ragtrail** — UGC hazard caution  
6. **2011 letterswap** — async social turn  
7. **2001–2004** — grind / room / gag / cubicle one-liners from research §5  
8. **1994–1999** — hotlist / applet / portal / skip-intro / pet one-liners  

### Acceptance G10

- [ ] Every full game has at least class + one concrete period fact  
- [ ] 2016–17 bans match product rooms  

---

# Phase G11 — e2e expand + docs honesty

**Goal:** Gates and residual map tell the truth.  
**Effort:** S  

### Steps

1. Run:

```bash
npx playwright test e2e/year-games.spec.js e2e/year-games-real.spec.js e2e/year-games-flows.spec.js --workers=1
```

2. Add asserts for:  
   - Inspiration strip keywords (sample years)  
   - 2018 incomplete / complete  
   - 2009 date strip if G3 done  
3. Update:  
   - `GAMES-YEAR-AUTHENTICITY-UX-…` residual checkboxes  
   - `GAMES-SOURCE-EXPANSION-…` status line → implement partial/complete  
   - `NON-DONE.md` games residual  
4. CAPTURE final batch row.

### Acceptance G11

- [ ] year-games* green  
- [ ] Docs status marks updated  
- [ ] No open P0 incomplete-write bugs  

---

# Cross-phase file map

| Area | Paths |
|------|--------|
| Full games HTML | `years/YYYY/sites/playable/game.html` |
| Full games JS | `js/games/year-YYYY-*.js` · `heli.js` · `sled.js` · `year-game-boot.js` |
| Toys | `js/immersion/year-playable.js` |
| UI CSS | `css/year-game-ui.css` · `css/year-playable.css` |
| Wing | `games/about.html` · `games/portals/**` · `games/worlds/**` |
| e2e | `e2e/year-games.spec.js` · `year-games-real.spec.js` · `year-games-flows.spec.js` |
| Docs | `docs/references/games/*` · this file · research bible |

---

# Printable implement checklist

```
[ ] User said implement games densify
[ ] G0 kits + CAPTURE
[ ] G1 inspire strips all 25 game.html
[ ] G2 2018 consent parity
[ ] G3 2009 freemium
[ ] G4 2013–15 viral
[ ] G5 2005–06 heli/sled
[ ] G6 2012 + 2000
[ ] G7 wing literacy
[ ] G8 toy labels
[ ] G9 focus/pause
[ ] G10 remaining years
[ ] G11 e2e + docs
[ ] No SWF / no invent logos
```

---

# Minimum viable densify (if timeboxed)

| Day | Phases | Outcome |
|-----|--------|---------|
| **1** | G0 + G1 | Every game honest about inspiration |
| **2** | G2 + G11 | 2018 parity + green e2e |
| **3** | G3 + G4 | Freemium + viral literacy |

---

# Out of scope (all phases)

- Ripping Flashpoint / IA game binaries into the repo  
- WebGL remakes · real multiplayer · real IAP  
- Official brand characters/sprites  
- New year 2019+ games  
- Replacing museum titles with commercial trademarks  

---

# Bottom line

| | |
|--|--|
| **Research** | [`GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) |
| **Phases** | **This file** G0–G11 |
| **Start** | G0 → G1 → G2 |
| **Say** | `implement games G0–G2` or `implement games full G0–G11` |

---

*Phases authored 2026-08-07. Educational museum densify only.*
