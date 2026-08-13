# Games source expansion — can we add more info & UX to already-shipped year games?

**Date:** 2026-08-07 · **Updated:** 2026-08-07 (deep research pass — obtained dates + per-year map + exec summary)  
**Status:** Research freeze **[x]** · implement densify **[x] 2026-08-07** (see phases G0–G11)  
**Scope:** All **already-shipped** museum game layers for hub years **1994–2018**  
**Path:** `docs/GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`  
**Implement phases (step-by-step):** [`GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) — **G0–G11**

### One-line answer

**Yes.** We already ship **75 playable toys + 25 full year games + games wing**. Under-used sources (Flashpoint, IA Flash, viral launch primaries, FarmVille freemium press, portal histories) can densify **information strips, honesty copy, multipage how-tos, freemium/viral literacy, and UX chrome** without ripping SWFs or rebuilding engines.

---

# Executive summary (read this first)

## Can we?

| | |
|--|--|
| **Answer** | **Yes** |
| **Why** | Games are already on disk for every hub year **1994–2018** |
| **What residual means** | Densify info + UX + honesty — **not** scaffold new engines or years |
| **What we never do** | Rip commercial SWFs/APKs · invent brand sprites · claim “this is Flappy/FarmVille/agar” |

### What already ships

| Layer | Count / scope |
|-------|----------------|
| **Year playables** | **75** micro-toys (3 × 25 years) via `year-playable.js` |
| **Full year games** | **25** signature games (hotlist → consentdash) |
| **Games wing** | HoverChop · TrailSled · Blox + portal/world theaters |

### Deep research obtained (lock before visitor copy)

| Topic | Fact for museum use |
|-------|---------------------|
| **Flashpoint Archive** | Preserves **100k–200k+** web experiences since **Dec 2017**; launcher + proxy for sitelocks — research UX only |
| **IA Flash libraries** | ~**20k** Flash items · ~**6.5k** Flash games — genre peers |
| **Ruffle** | Modern rehost literacy (“why museum ships JS originals”) |
| **Line Rider** | Uploaded **2006-09-23** (DeviantArt) → Digg/YouTube viral → densify **2006 sled** |
| **Helicopter class** | One-button chopper loop, mid-2000s portal peers → densify **2005 heli** |
| **FarmVille** | Facebook **2009-06-19** · freemium neighbor energy · peak MAU class → **2009 plotneighbors** |
| **Draw Something** | Launch **2012-02-06** · Zynga deal **~2012-03-21** → **2012 guessdoodle** |
| **Flappy Bird** | iOS **2013-05-24** · Android **2014-01-30** · store kill **~2014-02-10** · clone flood → **2013 pipehop** |
| **2048** | Web **2014-03-09** (Cirulli) · Threes lineage → **2014 tilefold** |
| **agar.io** | Browser **2015-04-28** · Miniclip mobile **Jul 7–8 2015** → **2015 blobrush** |
| **Newgrounds** | Founded **1995-07-06** · Flash Portal History years → **2000 portaljudge** + wing |
| **Kongregate** | **~2006-10-10** launch class → wing + 2006 energy |
| **2018 Consent Dash** | Must stay in lockstep with product GDPR manage/rights/CMP research |

### What’s in this MD (full sections below)

| § | Contents |
|---|----------|
| **§0** | Can we do it? (detail) |
| **§1** | Inventory — three layers + full game map + toy samples |
| **§2** | Expanded source diet (G-FP, G-IA, G-VIR, …) |
| **§3** | Deep research findings (Flashpoint, viral dates, freemium, UX patterns) |
| **§4** | What “more info & UX” means without new engines |
| **§5** | **Year-by-year densify blueprint 1994–2018** |
| **§6** | Paste-ready inspiration strips for `game.html` |
| **§7–8** | Cross-game patterns + recommended implement order (not started) |
| **§9–11** | Files preview · SOURCE-KIT skeleton · acceptance |
| **§12** | URL bank |
| **§13** | Bottom line |

### Best implement later (when you say go — not done yet)

1. **PG-INSPIRE** — inspiration strips on every `game.html` (§6 copy)  
2. **2018 consentdash** parity with product GDPR multipage  
3. **2009** freemium plant/harvest REAL (FarmVille dates)  
4. **2013–2015** viral literacy (pipehop · tilefold · blobrush)  
5. Wing About + portal chrome · toy `labels:[]` sweep  

**Command ideas:** `do games phase 0–2` · `do PG-INSPIRE all years` · `do 2018 consentdash parity`

### Sister research (product years, not games)

[`SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) — product rooms (GDPR, About triple-cite, etc.). Same method; different files.

---

### Companions

| Doc | Role |
|-----|------|
| [`GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md`](GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md) | What ships today |
| [`GAMES-PERIOD-RESEARCH-2026-07-31.md`](GAMES-PERIOD-RESEARCH-2026-07-31.md) | Original wing research |
| [`GAMES-PER-YEAR/README.md`](GAMES-PER-YEAR/README.md) | Per-year build bibles |
| [`SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) | Sister: **product** rooms (not games) |
| [`js/immersion/year-playable.js`](../js/immersion/year-playable.js) | Live toy catalog |
| [`js/games/`](../js/games/) | Full year game modules |

### Legal (stricter than product rooms)

1. **Museum-original JS only** — never ship commercial `.swf` / APK / console ROMs.  
2. **No official brand game art** (Pokémon, Fortnite, Disney CP, Zynga marks as free pixels).  
3. Always say **inspiration class** (“2048-class”, “Flappy-class silhouette”) — never “this is the real X”.  
4. Multi-step literacy: incomplete → **no** `ittYY-game-*` write.  
5. Flashpoint / IA / Ruffle = **research** for UX grammar only — not a redistribute license.  
6. localStorage theater only · no real multiplayer / ads / IAP.

---

# §0 — Can we do it?

| Question | Answer |
|----------|--------|
| Are year games already implemented? | **Yes** — 1994–2018 full games + 3 toys/year |
| Empty years? | **No** |
| Can new sources add value? | **Yes** — dates, freemium/viral literacy, portal chrome, control-scheme honesty, a11y |
| Need new game engines? | **No** for densify · only copy + multipage + small UX hooks |
| Blocks museum-ready claim? | **No** — optional residual |
| Same as product SOURCE-EXPANSION? | Same method · **different files** |

**Yes we can.** Rest of this file: obtained research + year-by-year “what to add”.

---

# §1 — What already ships (truth on disk)

## 1.1 Three layers

```
A  Year playables   years/YYYY/sites/playable/index.html
                    js/immersion/year-playable.js   → 3 toys/year (75 total)
B  Full year game   years/YYYY/sites/playable/game.html
                    js/games/year-*.js | heli.js | sled.js
C  Games wing       games/  arcade + portal theaters + world lobbies
```

## 1.2 Full year games (live map)

| Year | Id | Module | Inspiration class (honest) |
|-----:|----|--------|----------------------------|
| 1994 | hotlist | year-1994-hotlist | Netscape hotlist surf |
| 1995 | checkers | year-1995-checkers | Desktop / Java applet board |
| 1996 | planets | year-1996-planets | Space Jam–class portal hop |
| 1997 | connect4 | year-1997-connect4 | Yahoo Games lobby board |
| 1998 | skipintro | year-1998-skipintro | Agency Flash skip-intro |
| 1999 | petdash | year-1999-petdash | Neopets-class pet care |
| 2000 | portaljudge | year-2000-portaljudge | Newgrounds Portal vote |
| 2001 | clickscape | year-2001-clickscape | Click-grind / early MMO feel |
| 2002 | roomsticky | year-2002-roomsticky | Habbo-class room toy |
| 2003 | gagslite | year-2003-gagslite | Kids MMO gag mini |
| 2004 | cubewhack | year-2004-cubewhack | Casual reaction / cubicle |
| 2005 | heli | heli.js | **Helicopter Game–class** one-button chopper |
| 2006 | sled | sled.js | **Line Rider–class** trail |
| 2007 | boxshift | year-2007-boxshift | Portal-*puzzle-class* (not Valve IP) |
| 2008 | tapgrid | year-2008-tapgrid | App Store free-tap grid |
| 2009 | plotneighbors | year-2009-plotneighbors | **FarmVille-class** plots |
| 2010 | ragtrail | year-2010-ragtrail | Physics ragdoll trail class |
| 2011 | letterswap | year-2011-letterswap | Social word swap |
| 2012 | guessdoodle | year-2012-guessdoodle | **Draw Something–class** |
| 2013 | pipehop | year-2013-pipehop | **Flappy-class** one-tap |
| 2014 | tilefold | year-2014-tilefold | **2048-class** merge |
| 2015 | blobrush | year-2015-blobrush | **agar.io-class** arena |
| 2016 | gymrush | year-2016-gymrush | PoGO map-node **silhouette** |
| 2017 | stormscan | year-2017-stormscan | Face-scan + storm multi-step |
| 2018 | consentdash | year-2018-consentdash | GDPR Manage REAL |

## 1.3 Playable toys (catalog lives in `year-playable.js`)

Types: **meter** · **targets** · **type** · **hold**. Examples:

| Year | Toys (titles) |
|-----:|---------------|
| 1994 | Dial-up handshake · Hotlist hunt · First URL |
| 2005 | YouTube view surge · Reddit first post · Maps drag |
| 2009 | FarmVille plant · Status update · Bitcoin block |
| 2013 | Vine 6s hold · Snap streak · WhatsApp status |
| 2016 | Gym rush silhouette · AR hold · Live title |
| 2018 | Cookie banner slap · For You scroll · GDPR rights line |

## 1.4 Common sources already used (keep)

Wiki timelines · portal name lists · project `GAMES-PER-YEAR` bibles · legal “no SWF” stance.

---

# §2 — Expanded sources (games diet)

| ID | Source | Obtained role for ITT games |
|----|--------|------------------------------|
| **G-FP** | [Flashpoint Archive](https://flashpointarchive.org/) | 200k+ web experiences preserved since **Dec 2017**; launcher + proxy for sitelocks; research **HUD / mute / more games** chrome |
| **G-IA** | [IA Flash](https://archive.org/details/softwarelibrary_flash) · [Flash Games](https://archive.org/details/softwarelibrary_flash_games) | ~20k Flash items · ~6.5k Flash games — playable research peers |
| **G-RUFF** | [Ruffle](https://ruffle.rs/) | Modern Flash rehost literacy (“why we still ship JS originals”) |
| **G-NG** | [NG Flash Portal History](https://www.newgrounds.com/wiki/about-newgrounds/history/flash-portal-history) | Year-by-year portal culture; NG founded **1995-07-06** |
| **G-KG** | Kongregate | Alpha/launch **2006-10-10** class — badges, revenue-share portal |
| **G-HELI** | Helicopter Game histories | SeeThru / AddictingGames class — one-button chopper peers for **2005 heli** |
| **G-LR** | Line Rider | **2006-09-23** DeviantArt upload (Boštjan Čadež) — trail culture for **2006 sled** |
| **G-FV** | FarmVille | FB **2009-06-19** · freemium · peak MAU class — **2009 plotneighbors** |
| **G-DS** | Draw Something | Launch **2012-02-06** · Zynga buys OMGPOP **2012-03-21** — **2012 guessdoodle** |
| **G-FBIRD** | Flappy Bird | iOS **2013-05-24** · Android **2014-01-30** · removed **~2014-02-10** — **2013 pipehop** |
| **G-2048** | 2048 / Threes | Cirulli web **2014-03-09** · Threes earlier Feb 2014 — **2014 tilefold** |
| **G-AGAR** | agar.io | Browser **2015-04-28** · Miniclip mobile **2015-07-07/08** — **2015 blobrush** |
| **G-CMP** | CMP / GDPR research | Sister product doc — **2018 consentdash** parity |
| **G-A11Y** | Focus / pause / skip patterns | Cross-year UX residual |

---

# §3 — Deep research findings (obtained facts)

> Re-open primaries before locking visitor copy. Label every date. Inspiration class only.

## 3.1 Flashpoint Archive

| Fact | Use |
|------|-----|
| Project from **Dec 2017** (BlueMaxima → Flashpoint Archive) | Games wing About: preservation era |
| **100k–200k+** games/anims; Flash, Shockwave, Java, HTML5… | Genre peer research |
| Proxy defeats **sitelock** (games refuse off-host play) | Literacy: “why archives need launchers” |
| Infinity (on-demand) vs Ultimate (full dump) | Ops note only — we don’t host their blobs |

**Museum densify idea:** `games/about.html` panel — *We research peers in Flashpoint/IA; we ship museum JS, not archived SWFs.*

## 3.2 Internet Archive Flash libraries

| Collection | Scale class | Use |
|------------|-------------|-----|
| Software Library: Flash | ~**19–20k** items | Animations + apps |
| Flash Games | ~**6.5k** items | Direct peers for heli / reaction / portal |
| Kids' Zone Flash | ~**1.2k** | Cool Math adjacent literacy |

## 3.3 Signature genre dates (lock for game.html strips)

| Inspiration class | Hard date(s) obtained | Our game |
|-------------------|----------------------|----------|
| Helicopter one-button | Flash peer **~2002–2004** class (SeeThru lore · AddictingGames listing class) | **2005 heli** |
| Line Rider | **2006-09-23** DeviantArt (fšk / Čadež); Digg+YouTube viral fall 2006 | **2006 sled** |
| Kongregate portal | **2006-10-10** launch class | Wing + 2006 energy |
| FarmVille | **2009-06-19** Facebook; ~1M DAU in days; peak ~**80M MAU class ~2010** | **2009 plotneighbors** |
| Draw Something | **2012-02-06** OMGPOP; Zynga deal **2012-03-21** (~$180–210M class) | **2012 guessdoodle** |
| Flappy Bird | iOS **2013-05-24**; Android **2014-01-30**; remove **~2014-02-10**; clone flood | **2013 pipehop** |
| 2048 | Web **2014-03-09** Cirulli; lineage Threes / 1024 | **2014 tilefold** |
| agar.io | Browser **2015-04-28** Valadares; Miniclip mobile **Jul 7–8 2015** | **2015 blobrush** |
| Newgrounds | Founded **1995-07-06** | Wing + **2000 portaljudge** |
| Club Penguin | Public **2005-10-24**; Disney **2007-08-01** | Wing worlds only (no Disney art) |

## 3.4 Helicopter / Line Rider (mid-Flash peak)

**Helicopter Game class**

- One-button hold-to-rise chopper through cave/ceiling obstacles is a defining **AddictingGames-era** loop.  
- Attribution lore varies (SeeThru.co.uk / 2002–2004 class) — museum says **“Helicopter-class one-button flyer”**, not a trademarked title.  
- UX to steal (research): high-score vanity · immediate restart · mute · frustrating difficulty honesty.

**Line Rider**

- Uploaded **23 Sep 2006** · 10k views/day-one class · Digg amplifies · YouTube captures **15M views by Dec 2006** class.  
- Sandbox: draw lines → sledder physics.  
- **2006 sled** densify: “draw path / ghost trail” literacy; label Line Rider–class; no claiming official LR assets.

## 3.5 FarmVille freemium (2009)

| Fact | Museum game UX |
|------|----------------|
| Launch **19 Jun 2009** on Facebook | Date strip on plotneighbors |
| Built fast (~6 weeks class lore) | “Social games shipped like web products” |
| Energy / harvest timers · neighbor help | Multi-step REAL: plant → wait theater → harvest → visit neighbor |
| Freemium coins / pressure | Literacy checkbox: not Zynga; no real spend |

## 3.6 Viral 2012–2015 (merge / flap / blob)

| Year | Obtained narrative for `game.html` |
|-----:|-------------------------------------|
| **2012** | Draw Something: 5 weeks → **~20M** downloads class; Zynga acquires OMGPOP in **~6 weeks**. Teach async draw/guess — not Zynga IP. |
| **2013** | Flappy: sleeper then Jan 2014 #1; creator removes game amid clone/addiction press. Teach **one-tap obstacle class** + clone flood literacy. |
| **2014** | 2048 (Mar 9) open-source viral after Threes; clone of clone culture. Teach **merge-tile class** + open-source honesty. |
| **2015** | agar.io Apr 28 browser → Miniclip mobile July; starts **.io games** wave. Teach **eat-to-grow arena class** · original blobs only. |

## 3.7 2016–2018 alignment with product research

| Year | Game | Product source overlap |
|-----:|------|------------------------|
| 2016 | gymrush | PoGO Jul 6 · silhouette · no GPS · no official art |
| 2017 | stormscan | Face ID HIG layout · multi-step incomplete block |
| 2018 | consentdash | **Must mirror** product GDPR manage/rights/CMP literacy |

## 3.8 UX patterns extracted from preservation research

| Pattern | Seen in Flash/portal era | Apply to our games |
|---------|--------------------------|--------------------|
| Skip intro | Agency sites 1998–2004 | skipintro big CTA |
| More games ribbon | Miniclip/Addicting footers | Optional wing link bar |
| High score local | Most Flash | Label “this browser only” |
| Sitelock | Commercial Flash | About literacy only |
| Mute always | Portals | Ensure mute on full games |
| Instant restart | Heli / Flappy class | R key / click restart affordance |

---

# §4 — What “more info & UX” means (no new engine)

| Kind | Examples on **already implemented** games |
|------|-------------------------------------------|
| **Info** | Launch-date strip · freemium/viral literacy · “JS not SWF” · clone-flood note |
| **UX structure** | How-to multipage · pause/mute · incomplete literacy gate |
| **UX copy** | Goal lines · toy `labels:[]` · period slang phrases |
| **UX wayfinding** | Home strip titles · wing ↔ year game.html |
| **Gates** | year-games e2e asserts for new strings/keys |

---

# §5 — Year-by-year implement map (research blueprint)

For each year: **sources to open** · **info to add** · **UX to add** · **files** · **effort**.  
Implement only when you say go.

### Template per year

```
INFO: game.html strip (date · class · ban)
UX:   how-to · incomplete gate · labels · focus
TOYS: phrase/labels from period voice
```

---

## 5.1 1994–1999

| Year | Full game densify | Toy densify | Sources | Effort |
|-----:|-------------------|-------------|---------|--------|
| **1994** | Hotlist: “bookmarks were the app switcher” | Dial-up audio optional; hotlist labels already partial | Modem lore · CERN URL primary | S |
| **1995** | Checkers: applet sandbox literacy | Win95 hold Start timing honesty | Java applet culture · Win95 | S |
| **1996** | Planets: portal hop map | Space Jam stars — original toy not movie SWF | Live Space Jam · FP portal peers | S |
| **1997** | Connect4: lobby chat strip | ICQ popup labels | Yahoo Games WA · ICQ manuals | S |
| **1998** | Skipintro: **hostile intro UX** literacy | Lucky type phrase already good | Agency Flash on IA/FP | S–M |
| **1999** | Petdash: care meter freemium seed | Neopets-class honesty | Neopets history | M |

## 5.2 2000–2004

| Year | Full game densify | Sources | Effort |
|-----:|-------------------|---------|--------|
| **2000** | Portaljudge: **0–5 vote · blam/protect language** from NG history | NG Portal History · FP | M |
| **2001** | Clickscape: grind honesty (“this is the work”) | Early browser MMO secondary | S |
| **2002** | Roomsticky: room social literacy | Habbo histories (no brand art) | M |
| **2003** | Gagslite: kids MMO turn mini | Toontown-class secondary | S |
| **2004** | Cubewhack: office rage toy · combo feedback research | FP casual peers | S |

## 5.3 2005–2009 (high ROI)

| Year | Full game densify | Obtained hook | Effort |
|-----:|-------------------|---------------|--------|
| **2005** | Heli: one-button hold rise · cave scroll · instant death restart | Helicopter-class 2002–04 peers · AddictingGames culture | S–M |
| **2006** | Sled: draw-path literacy · viral YouTube capture culture | **Line Rider 2006-09-23** · Digg/YouTube explosion | M |
| **2007** | Boxshift: puzzle-class only · focus contract | Portal *genre* careful · iPhone pre-App-Store games | S |
| **2008** | Tapgrid: free App Store rating theater | App Store free charts class | M |
| **2009** | **Plotneighbors freemium multi-step** | **FarmVille 2009-06-19** · energy/neighbor | **M** priority |

## 5.4 2010–2013

| Year | Full game densify | Obtained hook | Effort |
|-----:|-------------------|---------------|--------|
| **2010** | Ragtrail: UGC hazard caution copy | Physics flash peers | S |
| **2011** | Letterswap: async social turn | Words With Friends class press | S |
| **2012** | Guessdoodle: draw/guess + acquisition literacy | **Draw Something 2012-02-06** · Zynga Mar 21 | M |
| **2013** | Pipehop: silhouette + clone flood + careful addiction note | **Flappy 2013-05-24 / kill 2014-02** | M |

## 5.5 2014–2018 (high ROI)

| Year | Full game densify | Obtained hook | Effort |
|-----:|-------------------|---------------|--------|
| **2014** | Tilefold: merge + **Threes→2048 lineage** honesty | **2048 = 2014-03-09** | M |
| **2015** | Blobrush: arena eat + **.io wave** literacy | **agar.io 2015-04-28** · Miniclip Jul | M |
| **2016** | Gymrush: battery · no GPS · silhouette (sync product PoGO) | PoGO Jul 6 primary | S–M |
| **2017** | Stormscan: align Face ID / WannaCry product copy | HIG + product rooms | S |
| **2018** | **Consentdash ↔ product GDPR manage/rights** | CMP + EUR-Lex + product multipage | **M** priority |

## 5.6 Games wing

| Surface | Research densify |
|---------|------------------|
| `games/about.html` | Flashpoint + IA + Ruffle literacy panel |
| Portal rooms | NG vote chrome · Kongregate badges · Miniclip “more games” |
| Worlds | CP 2005-10-24 · Disney 2007-08-01 · Neopets 1999 — text only |
| Arcade | Shared pause/mute/score kit from FP peer notes |

---

# §6 — Ready-to-paste info strips (for later implement)

Copy only after re-verify. All are **inspiration class**.

### 2005 HoverChop / heli
> **Helicopter-class** one-button flyer. Hold to rise, release to fall — a defining mid-2000s portal loop (AddictingGames-era peers). Museum original · no commercial SWF.

### 2006 TrailSled / sled
> **Line Rider–class** trail toy. Line Rider uploaded **23 Sep 2006** and went viral via Digg/YouTube. We teach draw-a-path physics theater — original art only.

### 2009 Plot Neighbors
> **FarmVille-class** social farm. FarmVille launched on Facebook **19 Jun 2009** and defined freemium neighbor pressure. This is museum theater — not Zynga · no real payments.

### 2012 Guess Doodle
> **Draw Something–class** async sketch. Draw Something launched **6 Feb 2012**; OMGPOP sold to Zynga weeks later. Original markers only.

### 2013 Pipe Hop
> **Flappy-class** one-tap obstacle. Flappy Bird (iOS **24 May 2013**) went mega in early 2014 then vanished from stores. Silhouette pipes · no Mario IP · clone-flood literacy.

### 2014 Tile Fold
> **2048-class** merge puzzle. Cirulli’s 2048 hit the web **9 Mar 2014**, after Threes. Open-source viral culture — not “we are 2048.”

### 2015 Blob Rush
> **agar.io-class** eat-to-grow arena. agar.io browser **28 Apr 2015**; Miniclip mobile July 2015. Original blobs only · no Miniclip branding.

### 2018 Consent Dash
> **GDPR consent-class** Manage path. Aligns with museum GDPR rooms (May 25 2018). Not legal advice · multi-step before score.

---

# §7 — Cross-game UX patterns (future kit)

| ID | Pattern | Years first |
|----|---------|-------------|
| **PG-INSPIRE** | Inspiration strip on every `game.html` | All |
| **PG-INCOMPLETE** | Literacy checks before score write | 2009 · 2013–15 · 2018 |
| **PG-LABELS** | `labels:[]` on targets toys | Sweep 1997–2010 |
| **PG-WING** | Footer: Play wing portals | 2005–2009 |
| **PG-FOCUS** | Focus ring + Pause in year-game-boot | All, esp. 2007 |
| **PG-CONSENT-PARITY** | Consent Dash = product GDPR steps | 2018 |
| **PG-FREEMIUM** | Energy/neighbor multi-step | 2009 |
| **PG-VIRAL** | Clone-flood / open-source one-liner | 2013–15 |
| **PG-WHY-JS** | “Why not real Flash?” on wing About | Wing |

---

# §8 — Recommended implement order (not started)

| Phase | Work | Effort | Why |
|------:|------|--------|-----|
| **0** | `docs/references/games/SOURCE-KIT*.md` for 2005·06·09·12–15·18 | S | Freeze menus |
| **1** | **PG-INSPIRE** strips (§6 copy) on all `game.html` | S–M | Max honesty / least risk |
| **2** | **2018 consentdash** parity with product GDPR multipage | M | Align literacy |
| **3** | **2009 freemium** multi-step plotneighbors | M | FarmVille primary dates |
| **4** | **2013–2015** viral literacy (pipehop · tilefold · blobrush) | S–M | Hard dates above |
| **5** | **2005–2006** heli/sled control + viral strips | S–M | Helicopter + Line Rider dates |
| **6** | Wing About + portal chrome densify | M | Flashpoint + NG |
| **7** | PG-LABELS toy sweep | S | Low risk |
| **8** | Optional 1994 modem audio | L4 | Forever optional |

---

# §9 — Files implement would touch (preview)

| Change | Paths |
|--------|-------|
| Inspiration / literacy strips | `years/*/sites/playable/game.html` |
| Freemium / consent multi-step | `js/games/year-2009-*.js` · `year-2018-consentdash.js` |
| Toy labels / phrases | `js/immersion/year-playable.js` |
| Wing literacy | `games/about.html` · `games/portals/*` |
| Focus/pause | `js/games/year-game-boot.js` |
| CAPTURE | `docs/references/games/CAPTURE-LOG.md` (create) |
| e2e | `e2e/year-games.spec.js` · `year-games-real.spec.js` |

**Not touched for densify:** ripping Flashpoint packages · new WebGL engines.

---

# §10 — Games SOURCE-KIT skeleton

```markdown
# GAMES SOURCE-KIT — YYYY
## Full game
- Id / module:
- Inspiration class:
- Primary dates (URL + visit day):
- Flashpoint/IA peer titles (research only):
- Bans:
## Three toys
| # | Title | Period referent | labels needed? |
## Wing overlap
## Sprint checklist
- [ ] game.html info strip
- [ ] UX change
- [ ] CAPTURE HG-…
- [ ] e2e green
```

---

# §11 — Acceptance (when implement runs)

1. Inspiration class + dated strip on `game.html` with labeled sources.  
2. No ripped assets · bans hold.  
3. Claimed multi-step → incomplete does not write storage.  
4. Visit/CAPTURE row for research.  
5. `npx playwright test e2e/year-games.spec.js e2e/year-games-real.spec.js --workers=1` green.

---

# §12 — URL bank (research visits)

| Topic | URL |
|-------|-----|
| Flashpoint | https://flashpointarchive.org/ |
| Flashpoint FAQ | https://flashpointarchive.org/faq |
| IA Flash Games | https://archive.org/details/softwarelibrary_flash_games |
| Ruffle | https://ruffle.rs/ |
| NG portal history | https://www.newgrounds.com/wiki/about-newgrounds/history/flash-portal-history |
| Line Rider | https://en.wikipedia.org/wiki/Line_Rider |
| FarmVille | https://en.wikipedia.org/wiki/FarmVille |
| FarmVille 15yr | https://www.theguardian.com/games/article/2024/jul/05/farmville-at-15-how-a-cutesy-facebook-game-shaped-the-modern-internet |
| Draw Something | https://en.wikipedia.org/wiki/Draw_Something |
| Flappy Bird | https://en.wikipedia.org/wiki/Flappy_Bird |
| 2048 | https://en.wikipedia.org/wiki/2048_(video_game) |
| agar.io | https://en.wikipedia.org/wiki/Agar.io |
| Helicopter Game (fandom class) | https://flashgaming.fandom.com/wiki/Helicopter_Game |
| Product GDPR sister research | [`SOURCE-EXPANSION-…1994-2018.md`](SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) |

---

# §13 — Bottom line

| | |
|--|--|
| **Can we?** | **Yes** — games already implemented |
| **This file?** | Deep research + year map + paste-ready strips |
| **Implement now?** | **No** — wait for explicit “implement games densify” |
| **First ships later** | Inspiration strips · 2018 consent parity · 2009 freemium · 2013–15 viral honesty |

**Say to implement:** `implement games G0–G2` or `implement games full G0–G11`  
**Phase detail:** [`GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md)

---

*Research compiled 2026-08-07 from primary/secondary sources listed above. Educational museum use only. Re-verify dates before visitor-facing lock.*
