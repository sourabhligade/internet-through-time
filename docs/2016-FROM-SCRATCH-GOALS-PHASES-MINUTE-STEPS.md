# 2016 from scratch — goals · phases · minute steps

**Date:** 2026-08-10  
**Purpose:** Single **implement-from-this** file to build museum year **2016 as its own year**.  
**Research freeze:** [`2016-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md`](2016-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md)  
**Entry:** [`2016-READ-FIRST.md`](2016-READ-FIRST.md)  
**Legal:** Educational · localStorage only · never invent brand pixels · no real GPS / Pokémon art / payments / bots / exploits. **Git only if asked.**

**Disk now:** Hub **1994–2016**. `years/2016/` **lean MVP live** (~37 HTML). Parent pattern = live lean **2015**.  
**Do not** `cp years/2015` and do not restore `HEAD:years/2016` forest.

---

## 0. How to use

Every phase: **Goal · Why · Disk start · Files · Minute steps · Storage · Acceptance · Tests · Anti-patterns.**

| # | Doc |
|---|-----|
| 0 | [`2016-READ-FIRST.md`](2016-READ-FIRST.md) |
| **1** | **This file ★ execute** |
| 2 | Research + artifacts |
| 3 | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) |
| 4 | [`GAMES-PER-YEAR/YEAR-2016.md`](GAMES-PER-YEAR/YEAR-2016.md) |
| 5 | Live `years/2015/` as **pattern only** |

### Hard rules

1. **Lean new HTML** (~40–70). No 2015 clone forest.  
2. Config + content only. No new browser engine.  
3. Pages load **only** `js/immersion-2016.js` → `immersion/boot.js`.  
4. Storage **`itt16-*`**. Incomplete **never writes**.  
5. One-thing = **Instagram Stories Aug 2**. Not Musical.ly. Not PoGO (that is Gym Rush). Not Vine death.  
6. Reverse 2015 bans carefully (Stories · Reactions · E2E · bots · CV1 ship · PoGO · Win10 offer over).  
7. Keep banned: Meta · TikTok brand · Face ID · Reels · official Pokémon art · GDPR.  
8. Home = one-thing → guided 6 → playables → residual chips **last**.  
9. Continuity = **chips**.  
10. Never invent pixels. WA / WDM / Version Museum / Newsroom / failed-final.  
11. Do **not** scaffold 2017+ in this pass.  
12. Git only if asked.

### Locked numbers (paste only these)

| Fact | Value |
|------|------:|
| Live Stats June sites | **1,045,534,808** (**+21%** vs 863,105,652) |
| 1B | Restabilized **Mar 2016** (first crossed Sep 2014, then dipped) |
| 2016 arc | ~**900M Jan → ~1.7B Dec** hostnames |
| Active | ~**170M** all year |
| Users | **3,424,971,237 (46.1%)** Live Stats users table · ITU ~47% late-year class |
| Stories | **Aug 2 2016** |
| Reactions | **Feb 24 2016** · Like + Love Haha Wow Sad Angry |
| PoGO | **Jul 6 2016** US/AU/NZ |
| WA E2E | **Apr 5 2016** · 1B users class |
| Messenger bots | F8 **Apr 12 2016** |
| CV1 | **Mar 28 2016** · ~**$599** |
| Win10 free ends | **Jul 29 2016** |
| iPhone 7 | **Sep 7 2016** · no 3.5 mm jack |
| AirPods | **Dec 13 2016** order · **$159** |
| Vine announce | **Oct 27 2016** · nothing today |
| Vine app/archive | **Jan 17 2017** |
| Prefix | **`itt16`** |

---

# Part 1 — Goals

## 1.1 One-line goal

Build a **lean museum-grade 2016**: Win10 mass (free-upgrade **closed**), Chrome habit, REAL theater for **Stories · PoGO literacy · Reactions · WA E2E · jack/AirPods · Vine dual-date · Win10 end**, P1 densify, Gym Rush, dual-cite **1.045B (+21%)**, hard 2017 wall — **without** a 2015 forest.

## 1.2 Visitor outcome

```
Hub → 2016
  → Win10 mass · free upgrade ended Jul 29 · Chrome · Edge residual
  → Starting Point
        ★ One-thing: Instagram Stories Aug 2
        ▶ Guided 6
        ▶ Gym Rush
        residual last (Watch 2015 · Snap Stories · Musical.ly not TikTok)
  → About: 1,045,534,808 (+21%) · 1B Mar · ~3.4B ITU · bans
        REAL → itt16-thesis-ack
  → Stories: 24h check → add → itt16-ig-stories
  → PoGO literacy → itt16-pogo · Gym Rush game
  → Reactions pick · WA E2E · jack + AirPods · Vine dual-date
  → Exit · itt16-* only · itt-last-year=2016
```

## 1.3 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G1** | Thesis | 1.045B · +21% · 1B Mar · bans |
| **G2** | Lean tree | ~40–70 HTML · no Amazon CDs / Pets as P0 |
| **G3** | One-thing Stories | Incomplete never writes `itt16-ig-stories` |
| **G4** | P0 REAL | Stories · PoGO · Reactions · WA E2E · 7/AirPods · Vine · Win10 end |
| **G5** | P1 | Bots · CV1 ship · LinkedIn · Allo · Musical.ly not-TikTok |
| **G6** | Game | Gym Rush · `itt16-game-gymrush` · no official sprites |
| **G7** | Isolation | Only `itt16-*` (+ `itt-last-year`) |
| **G8** | Pixels | H16 harvested **or** failed-final |
| **G9** | Gates | `check-all-years` · `test:e2e:2016` · hub 2016 |
| **G10** | No 2017+ bleed | No Face ID · no 280 · no GDPR · no TikTok brand · no Reels |

## 1.4 Flows A–F

| ID | Period life | Path | Write |
|----|-------------|------|-------|
| **A** | Add to Story | home → `instagram/stories.html` → 24h + add | `itt16-ig-stories` |
| **B** | Go outside | `pogo/` literacy → Gym Rush | `itt16-pogo` · game |
| **C** | Feel the post | `facebook/reactions.html` → pick one | `itt16-reactions` |
| **D** | Private chat | `whatsapp/e2e.html` → two checks | `itt16-wa-e2e` |
| **E** | No jack | `iphone/7.html` → `airpods/` | `itt16-iphone7` · `itt16-airpods` |
| **F** | Vine is dying | `vine/goodbye.html` → dual-date | `itt16-vine` |

Guided home 6: About · Stories · PoGO · Reactions · WA E2E · Vine/AirPods.

---

# Part 2 — Phase map

| Phase | Name | Est. | Status | Blocks |
|-------|------|------|--------|--------|
| **S0** | Research freeze | — | **[x]** 2026-08-10 | — |
| **S1** | Do **not** restore HEAD forest | S | **[x]** lean new HTML | Safety |
| **S2** | Lean scaffold (no `cp 2015`) | M | **[x]** | Boots |
| **S3** | Shell · connect · dirbar | S–M | **[x]** | Voice |
| **S4** | Home / About / map / whats-new | M | **[x]** | Thesis |
| **S5a** | Stories REAL | M | **[x]** | **One-thing** |
| **S5b** | PoGO literacy | M | **[x]** | Culture |
| **S5c** | Reactions | S | **[x]** | Feed |
| **S5d** | WA E2E | S–M | **[x]** | Trust |
| **S5e** | iPhone 7 + AirPods | M | **[x]** | Hardware |
| **S5f** | Vine dual-date + Win10 end | S–M | **[x]** | Honesty |
| **S6** | Chrome 3-check | S | **[x]** | Habit |
| **S7** | Continuity chips | S | **[x]** | Residual last |
| **S8** | `year-2016-extras.js` | M | **[x]** | Wiring |
| **S9** | P1 densify | M | **[x]** | Depth |
| **S10** | Gym Rush + 3 toys | M | **[x]** | Game |
| **S11** | flow-maps · trails · matrix | M | **[x]** | Journeys |
| **S12** | e2e pack | M | **[x]** | Gates |
| **S13** | Hub + check-all-years + docs | S | **[x]** | **Ship** |
| **S14** | Pixel harvest H16-20+ | M | **[x]** failed-final | Layer C |
| **S15** | Densify 16-D1–D6 (deep harvest) | M | **[x]** [`2016-DENSIFY-GOALS-PHASES-MINUTE-STEPS.md`](2016-DENSIFY-GOALS-PHASES-MINUTE-STEPS.md) | Depth |

**Order:** S0 → S1 → S2 → S3 → S4 → (S5a–S5f + S6 *parallel-ok*) → S8 → S7 + S9 + S10 → S11 → S12 → S13.  
**MVP ship** = S2–S6 + S8 + S11–S13 + S5a green. **[x]**  
**Museum-ready** = MVP + S7 + S9 + S10 + S14 (or failed-final). **[~]**  
**Deeper 2016** = S15 after [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md).

---

# Part 3 — Minute steps

# Phase S0 — Research freeze **[x]**

### Goal
Facts locked. No invent.

### Minute steps
1. Confirm Live Stats **1,045,534,808 (+21%)**.  
2. Confirm one-thing = **Stories Aug 2** (not Musical.ly, not PoGO).  
3. Confirm Vine **Oct 27 ≠ Jan 17 2017**.  
4. Confirm WA E2E **Apr 5** · Reactions **Feb 24** · AirPods **Dec 13 $159**.  
5. Confirm bans (TikTok brand · Face ID · official sprites · Meta · Reels).

### Acceptance
- [x] READ-FIRST + research + this file on disk  

### Anti-patterns
Scaffold before freeze · restore HEAD forest · Musical.ly as one-thing without re-litigating.

---

# Phase S1 — Do not restore the forest **[ ]**

### Goal
Worktree stays clean. Old `HEAD:years/2016` is reference-only.

### Minute steps
1. `test ! -d years/2016` (should be true on this branch).  
2. Optional: `git show HEAD:docs/2016-READ-FIRST.md` for scraps.  
3. **Do not** `git checkout HEAD -- years/2016 js/config/2016.js`.  
4. Snapshot nothing unless you later create files.

### Acceptance
- [ ] No 400-HTML tree appears  
- [ ] Implementer can name three HEAD rooms they will **not** copy (amazon CDs, altavista, napster)

---

# Phase S2 — Lean scaffold **[ ]**

### Goal
Year boots: shell + empty-ish home + stubs. ~15–25 HTML first.

### Files to create
```
years/2016/index.html          # copy structure from years/2015/index.html; year strings + thesis line
years/2016/pages/{home,about,map,whats-new,cool}.html
years/2016/pages/error/{404,unreachable}.html
js/config/2016.js              # storage-ready urlMap for rooms you actually create
js/config/immersion-2016.js    # storagePrefix: "itt16" · features.year2016extras
js/immersion-2016.js           # ITT._immersionYear = "2016"
js/browser-2016.js             # bootBrowserYear("2016")
css/period-2016.css            # @import period-2015.css + small deltas
assets/period/2016/README-PIXELS.txt
js/immersion/registry.js       # "2016": [shared, real-flow, flow-map, year-playable, year-2016-extras, …]
```

### Minute steps
1. Copy **stubs** `immersion-2015.js` / `browser-2015.js` → 2016, change year only.  
2. Write `config/2016.js` from 2015: year, prefsKey `itt-2016-*`, home, urlMap **only for files you add**.  
3. Write `immersion-2016.js` config: nav Stories · PoGO · Reactions · WA E2E · Vine · Chrome.  
4. Duplicate 2015 shell HTML; replace connect thesis; `data-itt-year="2016"`; `body` classes Win10.  
5. Register year in `registry.js` (include `year-2016-extras.js` even if extras file is a stub bootAll).  
6. Smoke: `python3 -m http.server 8080` → `/years/2016/` skip connect → iframe home.

### Acceptance
- [ ] `/years/2016/` loads without console missing-config  
- [ ] `data-itt-year="2016"` on shell  
- [ ] Home visible in `#content`

### Tests
```
# after S13: python3 scripts/check-all-years.py
```

### Anti-patterns
Copying 2015 `urlMap` wholesale (broken links) · forking `create.js`.

---

# Phase S3 — Shell voice **[ ]**

### Goal
Connect overlay, window title, dirbar feel like 2016 desktop.

### Minute steps
1. Connect copy: “Stories · Pokémon GO · Reactions · 1.05B hostnames.”  
2. Title: “Chrome / Edge — 2016” or Win10 product line.  
3. Dirbar keys: Stories, PoGO, Reactions, WA E2E, Vine, Chrome.  
4. `defaultPrefs.modemDelay` low (broadband).  
5. No 2015 Watch as first dirbar button.

### Acceptance
- [ ] Skip connect reveals chrome  
- [ ] Dirbar ≥5 year-true labels  

---

# Phase S4 — Home / About / map / whats-new **[ ]**

### Goal
Thesis + guided 6 + residual last.

### Home order (mandatory)
1. `data-ott-one-thing="2016"` → `../sites/instagram/stories.html`  
2. `#ott-guided-2016` ol **exactly 6** li + About link inside  
3. Playables strip  
4. P1 chips  
5. Residual chips **last** (Watch 2015 · Snap · Musical.ly not TikTok · Photos)  
6. Hard-ban box (Face ID · TikTok brand · Meta · Reels · sprites)

### About
- 1,045,534,808 · +21% · 1B Mar 2016 · ~3.4B ITU  
- `[data-itt-real-save]` `data-storage-key="thesis-ack"` `data-min-req="2"`  
- Bans listed  

### Minute steps
1. Write home from 2015 home **structure**, 2016 copy.  
2. Write about with real-flow markup.  
3. `map.html` host `[data-itt-flow-map]`.  
4. `whats-new.html` calendar table from READ-FIRST §3.

### Acceptance
- [ ] Guided 6  
- [ ] About incomplete click writes nothing  
- [ ] Residual appears after guided in DOM  

### Tests
```
npx playwright test e2e/2016-mvp.spec.js --workers=1   # after S12 exists
```

---

# Phase S5a — Stories one-thing **[ ]**

### Goal
`itt16-ig-stories` only after 24h check + add.

### Files
`years/2016/sites/instagram/stories.html` · extras `bootStories`  
`years/2016/sites/instagram/index.html` (feed residual → Stories)

### Markup
- `[data-ig-stories-24h]` checkbox  
- `[data-ig-stories-not-reels]` checkbox  
- `[data-ig-stories-caption]`  
- `[data-ig-stories-add]`  
- `[data-ig-stories-status]`  
- Tray `[data-ig-stories-list]`

### Minute steps
1. Copy period voice (not “museum Stories”). Honesty line: Aug 2 2016 · Snap still competes.  
2. Wire extras: if !24h || !not-reels → error, return. Else save JSON `{ caption, multiStep, real, year:"2016", ts }`.  
3. Reload hydrates list.  
4. Isolation: do not write `itt15-*`.

### Acceptance
- [ ] Bare add does not write  
- [ ] Two checks + add writes `itt16-ig-stories`  
- [ ] No “Your story” 2018+ chrome  

---

# Phase S5b — Pokémon GO literacy **[ ]**

### Goal
`itt16-pogo` after location honesty + team + catch. **No sprites.**

### Markup
- `[data-pogo-location]` “This exhibit does not use real GPS”  
- `[data-pogo-no-art]` “No official Pokémon art”  
- `[data-pogo-team]` valor|mystic|instinct (generic names ok; do not draw official emblems)  
- `[data-pogo-catch]`  
Silhouettes only (CSS circles).

### Acceptance
- [ ] Incomplete never writes  
- [ ] Body has no nintendo.com ripped img  

---

# Phase S5c — Reactions **[ ]**

### Goal
Pick exactly one of 6 → `itt16-reactions`.

### Minute steps
1. Post theater + Like + Love Haha Wow Sad Angry.  
2. Save requires a pick.  
3. Copy: Feb 24 2016 global · not a Dislike button.

---

# Phase S5d — WhatsApp E2E **[ ]**

### Goal
Two literacy checks → `itt16-wa-e2e`.

### Checks
- What E2E means (WhatsApp cannot read)  
- Default on latest clients **Apr 5 2016** · 2015 Web was not this story  

Link from residual `whatsapp/index.html` → `e2e.html`.

---

# Phase S5e — iPhone 7 + AirPods **[ ]**

### iPhone 7
Checks: jack gone · Lightning adapter in box · **not Face ID / not iPhone X**.  
Key `itt16-iphone7`.

### AirPods
Checks: **$159** · **Dec 13 2016** order · **not Pro**.  
Key `itt16-airpods`. No real checkout.

---

# Phase S5f — Vine + Win10 end **[ ]**

### Vine
Checks: announced **Oct 27 2016** · **not already offline** (Jan 17 2017).  
After ack: hide/disable `[data-vine-post]` / hold so **new posts cannot write** `itt16-vine-posts`.  
Key `itt16-vine`.

### Win10
Checks: free offer **started Jul 29 2015** · **ended Jul 29 2016** · Win10 still the mass OS.  
Key `itt16-win10-end`.

---

# Phase S6 — Chrome 3-check **[ ]**

Same pattern as 2008–2015: habit + not-Edge-default + download theater → `itt16-chrome`. Incomplete never writes.

---

# Phase S7 — Continuity chips **[ ]**

Home residual only (not 80 rooms):  
Watch 2015 · Snap Stories · Musical.ly (label not TikTok) · Photos · Periscope · Discord.  
Period voice on product rooms; museum voice on chips.

---

# Phase S8 — extras wiring **[ ]**

### File
`js/immersion/year-2016-extras.js` — copy **shape** of `year-2015-extras.js`:
- `prefix()` → `itt16`  
- `bootAll` lists every S5/S6/S9 boot  
- `registerLocal({ id: "year2016extras", featureKey: "year2016extras" })`  
- Every save: `multiStep: true, real: true, year: "2016"`  
- Incomplete return **before** `saveJSON`

### Acceptance
- [ ] Standalone page `data-itt-feat-year2016extras="1"`  
- [ ] Neighbor `itt15-*` untouched in e2e  

---

# Phase S9 — P1 densify **[ ]**

| Room | Gate | Key |
|------|------|-----|
| Messenger bots | F8 2016 + not 2015 business-only | `itt16-bots` |
| Oculus CV1 | shipped Mar 28 + ~$599 | `itt16-rift` |
| LinkedIn deal | $26.2B + Jun 13 | `itt16-linkedin` |
| Allo | Sep 21 + smart reply theater | `itt16-allo` |
| Musical.ly | caption + **not TikTok** | `itt16-musical` |

---

# Phase S10 — Gym Rush + 3 toys **[ ]**

### Year game
`js/games/year-2016-gymrush.js` · `sites/playable/game.html`  
See [`GAMES-PER-YEAR/YEAR-2016.md`](GAMES-PER-YEAR/YEAR-2016.md).  
Honor `YearGame.isPaused`. No official art. Literacy: Jul 6 2016 · not GPS · slither.io is also 2016 but **not** this game (2015 already claimed .io).

### Toys (`year-playable.js` `"2016"` — do not fall back to 2015)

| # | Type | Title | Writes |
|---|------|-------|--------|
| 1 | hold | **Add to Story** (~2s) | `itt16-playable` |
| 2 | targets | **Reaction tap** Love/Haha/Wow/Sad/Angry | `itt16-playable-2` |
| 3 | type | **catch them all** (generic phrase, not ™) | `itt16-playable-3` |

Phrase must match exactly. Avoid official Pokémon slogan if it creates TM risk — use `go outside` if needed.

`DEFAULT_GOALS["2016"]` + `DEFAULT_NEXT` → Stories.

---

# Phase S11 — Maps · trails · matrix **[ ]**

1. `ITT.flowMaps["2016"]` branches: Enter · Stories · Street AR · Feed emotion · Trust · Hardware · Goodbye.  
2. `YEAR_STARTS["2016"]` in `museum-progress.js` (About + Stories + PoGO). Loop `for (y = 1994; y <= 2016)`.  
3. `REAL_FLOW_MATRIX` row: year 2016 · path Stories · key `itt16-ig-stories` · hook `[data-ig-stories-add]`.  
4. Passport grid will become **23** years — update `year-start-trails.spec.js` and `museum-progress.spec.js` counts (21→22 was 2015; now 23).

---

# Phase S12 — e2e pack **[ ]**

Create (mirror 2015 names):

```
e2e/2016-mvp.spec.js
e2e/2016-flows.spec.js
e2e/2016-real-flows.spec.js      # incomplete → complete every P0/P1 key
e2e/2016-densify.spec.js
e2e/2016-trail-real-flows.spec.js
e2e/2016-shell-honesty.spec.js
e2e/2016-flow-link-verify.spec.js
```

`package.json`:
```
"test:e2e:2016": "playwright test e2e/2016-mvp.spec.js e2e/2016-densify.spec.js e2e/2016-flows.spec.js e2e/2016-real-flows.spec.js e2e/2016-trail-real-flows.spec.js e2e/2016-shell-honesty.spec.js e2e/2016-flow-link-verify.spec.js --workers=1"
```

Also extend: `one-thing-per-year` · `all-years-real-system` YEARS · `year-signature-flows` · `year-playable` 2016 · `year-games*` · `hub-years` · `KNOWN_YEARS` in check-all-years.

### Acceptance
```
npm run test:e2e:2016
npx playwright test e2e/one-thing-per-year.spec.js e2e/all-years-real-system.spec.js -g 2016
```

---

# Phase S13 — Hub + docs **[ ]**

### Minute steps
1. `index.html` year card `y2016` available · resume regex `201[0-6]`.  
2. `scripts/check-all-years.py` `KNOWN_YEARS` through 2016 + signature rooms list.  
3. `DISK-TRUTH.md` · `NON-DONE.md` · SCALE-LEDGER row: **MVP live** (only after tests green).  
4. `css/hub.css` if 2016 chip needs color.  
5. Do **not** unlock 2017.

### Acceptance
- [ ] Hub shows 23 years 1994–2016  
- [ ] `check-all-years.py` 2016 **pass**  

---

# Phase S14 — Pixels **[x]** failed-final

### Minute steps
1. Create `assets/period/2016/{instagram,pogo,facebook,whatsapp,vine,airpods}/README-AUTHENTICITY.txt`.  
2. Try Wayback `im_` + Version Museum + Newsroom.  
3. Log every fail in [`references/2016/CAPTURE-LOG.md`](references/2016/CAPTURE-LOG.md).  
4. Never draw Pikachu or IG glyph.

### Acceptance
- [x] Used `<img>` are WA / WDM / Newsroom / failed-final RECON labeled (Chrome reuses 2013 WA still)

---

# Phase S15 — Densify 16-D1–D6 **[x]**

**★ Full minute bible:** [`2016-DENSIFY-GOALS-PHASES-MINUTE-STEPS.md`](2016-DENSIFY-GOALS-PHASES-MINUTE-STEPS.md) (D0–D14).  
**Research freeze:** [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md) §4.  
**Do not** steal one-thing. Lean chips or one HTML each.

### Goal
Ship the six highest-ROI 2016 products the first freeze never named.

| ID | Room | Gate | Key |
|----|------|------|-----|
| 16-D1 | `sites/instagram/live.html` | Nov 21 + inside Stories + disappears when you end · not Reels | `itt16-ig-live` |
| 16-D2 | `sites/amp/serp.html` | Feb 24 2016 **in Search** (2015 was announce only) | `itt16-amp-serp` |
| 16-D3 | `sites/facebook/live.html` | Everyone (not 2015 celebs) · Apr 6 features | `itt16-fb-live` |
| 16-D4 | `sites/dyn/index.html` | Oct 21 + Mirai IoT + not a payload | `itt16-dyn` |
| 16-D5 | `sites/pixel/index.html` + `sites/home/index.html` | Pixel Oct 4 · Home **$129** ships Nov 4 | `itt16-pixel` · `itt16-home` |
| 16-D6 | `sites/snapchat/spectacles.html` | $129 + Snapbot + Snap still competes | `itt16-spectacles` |

Also paste About: **3,424,971,237 (46.1%)** · IG **500M Jun 21** · PoGO **500M DL Sep 7**.

### Minute steps
1. Do **not** `cp` 2015 AMP announce as if it were SERP.  
2. Wire extras `bootAll` + incomplete never writes.  
3. Home residual chips **after** guided 6.  
4. e2e incomplete → complete each new key.  
5. Skip 16-D7–D20 unless a later pass.

### Acceptance
- [ ] Each new key writes only after ≥2 checks  
- [ ] Neighbor `itt15-*` untouched  
- [ ] One-thing still Stories  

### Anti-patterns
Promoting Pixel/Home or Musical.ly over Stories · building a Dyn exploit · Nintendo Mario sprites · Teams as 2020 mass.

---

# Part 4 — Copy bank (paste)

**Home one-thing:** `★ One-thing · Instagram Stories Aug 2 REAL`  
**Guided:** About 2016 · Stories 24h · Pokémon GO (no sprites) · Reactions · WhatsApp E2E · Vine is dying  
**About scale:** `1,045,534,808 websites (Live Stats June, +21%) · 1B restabilized March 2016 · 3,424,971,237 people online (Live Stats July 1, 46.1%) · ITU late-year ~47%`  
**Bans line:** `No TikTok brand · no Meta · no Face ID · no Reels · no official Pokémon art · Vine not already gone in October`  
**Stories honesty:** `Launched August 2, 2016 · lasts 24 hours · Snapchat still competes · not Reels`  
**Vine honesty:** `Announced October 27, 2016 — nothing happens today. App / archive class January 17, 2017.`  
**AirPods:** `Order December 13, 2016 · $159 with case · not AirPods Pro`  
**E2E:** `Default on latest WhatsApp clients April 5, 2016 · a billion users class · 2015 Web was QR, not this`

---

# Part 5 — Tests cheat-sheet (after S12)

```bash
python3 scripts/check-all-years.py
npm run test:e2e:2016
npx playwright test e2e/one-thing-per-year.spec.js -g 2016 --workers=1
npx playwright test e2e/all-years-real-system.spec.js -g 2016 --workers=1
npx playwright test e2e/year-games-real.spec.js e2e/all-years-playable.spec.js -g 2016 --workers=1
```

**MVP = S2–S6 + S8 + S11–S13 + Stories green. Do not claim museum-ready without S7/S9/S10/S14 (or failed-final).**
