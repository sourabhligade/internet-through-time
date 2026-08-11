# 2019 from scratch — goals · phases · minute steps

**Date:** 2026-08-11  
**Purpose:** Single **implement-from-this** file to build museum year **2019 as its own year**. Bigger than leftover maps on purpose: 2019 is the first year *not on this disk* after 2018 shipped, and COMPLEX already named it as the streaming-wars machine.  
**Research freeze:** [`2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md`](2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md)  
**Entry:** [`2019-READ-FIRST.md`](2019-READ-FIRST.md)  
**Game:** [`GAMES-PER-YEAR/YEAR-2019.md`](GAMES-PER-YEAR/YEAR-2019.md)  
**Legal:** Educational · localStorage only · never invent brand pixels · no real Disney+/Apple product, payments, livestream trauma, or “you are subscribed.” **Git only if asked.**

**Disk now:** Hub **1994–2018**. `years/2019/` **does not exist**. Parent pattern = live lean **2018**.  
**Do not** `cp years/2018` and do not restore any `HEAD:years/2019` forest (Consent Dash, GDPR tour, extras `prefix()` → `"2018"`).

---

## 0. How to use

Every phase: **Goal · Why · Disk start · Files · Minute steps · Storage · Acceptance · Tests · Anti-patterns.**

| # | Doc |
|---|-----|
| 0 | [`2019-READ-FIRST.md`](2019-READ-FIRST.md) ★ freeze |
| **1** | [`2019-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2019-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) ★ map |
| **1b** | [`2019-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](2019-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) ★ file-level steps |
| **1c** | **This file** — S-grammar + markup sketches |
| 2 | [`2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md`](2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md) |
| 3 | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) |
| 4 | [`COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md) §2019 |
| 5 | [`SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) §2.1–2.2 |
| 6 | [`GAMES-PER-YEAR/YEAR-2019.md`](GAMES-PER-YEAR/YEAR-2019.md) |
| 7 | Live `years/2018/` as **pattern only** |

### Hard rules

1. **Lean new HTML** (~42–55). Cap **60**. No 2018 clone forest. No Amazon CDs. No 2013 Facebook feed as 2019.  
2. Config + content only. No new browser engine. No fork of `create.js`.  
3. Pages load **only** `js/immersion-2019.js` → `immersion/boot.js`.  
4. Storage **`itt19-*`**. Incomplete **never writes**. Isolation vs `itt18-*`.  
5. One-thing = **Disney+ Who’s Watching + Continue, 12 Nov**. Not a trial click. Not Marshmello (second gold). Not Apple TV+. Not G+. Not FTC.  
6. Reverse 2018 bans carefully (Disney+ · Marshmello · G+ **death** · FTC $5B · Libra · CNIL €50M · Edge **preview / Jan 2020 ship date** · Flickr enforce · Inbox death · iPhone 11).  
7. Keep banned: Meta · Reels · COVID · Zoom mass · Travis Scott · official Disney/Apple/Epic art · Chromium Edge **as default** · Face ID as new · Stories as new · GDPR as this year’s gold.  
8. Home = one-thing → guided 6 → playables → P1 chips → residual chips **last**.  
9. Continuity = **chips**. GDPR / TikTok FYP / IGTV / Face ID do not get new gold rooms.  
10. Never invent pixels. WA / WDM / Newsroom / Disney IR / FTC / failed-final.  
11. Do **not** scaffold 2020+ in this pass.  
12. Git only if asked.  
13. COMPLEX Y0: `prefix()` fallback **`"2019"`**, never `"2018"`.  
14. Start trial is **visible**. REAL save is **profile + continue only**.

### Locked numbers (paste only these)

| Fact | Value |
|------|------:|
| Live Stats June 2019 | **not on public table** (ends 2018 at **1,630,322,579**) |
| Netcraft Jun 2019 active | **~186.7M** (Apache **54,879,492** = **29.39%**) |
| ITU FF 2019 | **~4.1B · +5.3% · just over 53%** |
| HA 2019 Almanac p50 | desktop **1934 KB / 74 req** · mobile **1745 KB / 69 req** |
| Disney+ | **12 Nov · $6.99 / $69.99 · >10M day one · 7 profiles · Kids · 4 streams** |
| Bundle | **$12.99** D+ / Hulu ads / ESPN+ |
| Apple TV+ | **1 Nov · $4.99 · 1 yr free** new device from **10 Sep** |
| Marshmello | **2 Feb · ~10.7M** |
| G+ death | **2 Apr** (date locked **30 Jan**) |
| FTC | **24 Jul · $5B** |
| CNIL | **21 Jan · €50M** |
| iPhone 11 | **10 Sep announce · 20 Sep stores · from $699 · not 5G** |
| iOS 13 / Arcade | **19 Sep · Arcade $4.99** |
| Stadia | **19 Nov · Founder’s $129 · Pro $9.99** |
| Edge stable | **15 Jan 2020** (date named **4 Nov 2019**) |
| Prefix | **`itt19`** |

---

# Part 1 — Goals

## 1.1 One-line goal

Build a **lean museum-grade 2019**: Win10 mass, Chrome habit, EdgeHTML + Chromium **preview**, REAL theater for **Disney+ Continue · Marshmello · Apple TV+ · G+ funeral · FTC $5B · CNIL**, P1 densify, **Continue Row**, dual-cite **Netcraft ~187M active + ITU 4.1B / 53%**, hard 2020 wall — **without** an 2018 forest and **without** a trial checkbox as gold.

## 1.2 Visitor outcome

```
Hub → 2019
  → Win10 mass · Chrome habit · EdgeHTML + Chromium preview chip
  → Starting Point
        ★ One-thing: Disney+ Who’s Watching + Continue 12 Nov
        ▶ Guided 6
        ▶ Continue Row
        residual last (GDPR 2018 · TikTok FYP · IGTV · Face ID · Stories · 280)
  → About: Live Stats table ended · Netcraft ~187M · ITU 4.1B / 53% · HA 1934/1745 KB · bans
        REAL → itt19-thesis-ack
  → Disney+: Who’s watching → rows → Continue → kids lock → itt19-disneyplus
  → Marshmello: timed beats → itt19-marshmello
  → Apple TV+ / G+ funeral / FTC
  → Exit · itt19-* only · itt-last-year=2019
```

## 1.3 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G1** | Thesis | Table ended · Netcraft ~187M · ITU 4.1B / 53% · bans |
| **G2** | Lean tree | ~42–55 HTML · no Amazon forest · no 2018 GDPR tour |
| **G3** | One-thing Disney+ | Incomplete never writes `itt19-disneyplus` · trial ≠ save |
| **G4** | Profiles | ≥2 (adult + kids) · continue **per profile** · kids block |
| **G5** | P0 REAL | Disney+ · Marshmello · Apple TV+ · G+ · FTC · CNIL |
| **G6** | P1 | Flickr enforce · Inbox · Huawei GMS · Quest · iPadOS · Libra · IG likes · World Cup · iPhone 11 · iOS 13 · Arcade · Edge preview · Stadia |
| **G7** | Game | Continue Row · `itt19-game-continuerow` · parity with product |
| **G8** | Isolation | Only `itt19-*` (+ `itt-last-year`) · extras never write `itt18-*` |
| **G9** | Pixels | Harvested **or** failed-final |
| **G10** | Gates | `check-all-years` · `test:e2e:2019` · hub 2019 |
| **G11** | No 2020+ bleed | No COVID · no Reels · no Zoom mass · no Travis Scott · no Edge-as-default |
| **G12** | No 2018 steal | GDPR is a chip. TikTok FYP is a chip. Consent Dash does not ship. |

## 1.4 Flows A–F

| ID | Period life | Path | Write |
|----|-------------|------|-------|
| **A** | Who’s watching | home → `disneyplus/index.html` → profiles → continue | `itt19-disneyplus` |
| **B** | Stand in the park | `fortnite/marshmello.html` → ≥2 beats | `itt19-marshmello` |
| **C** | Apple living room | `appletv/` → $4.99 + year-free + not D+ | `itt19-appletv` |
| **D** | Plus funeral | `googleplus/funeral.html` → 2 Apr + not 2018 announce | `itt19-gplus` |
| **E** | Five billion | `ftc/` → $5B + 24 Jul + not a targeting UI | `itt19-ftc` |
| **F** | Fifty million euros | `cnil/` → €50M + 21 Jan + GDPR applied 2018 | `itt19-cnil` |

Guided home 6: About · Disney+ · Marshmello · Apple TV+ · G+ · FTC / CNIL.

---

# Part 2 — Phase map

| Phase | Name | Est. | Status | Blocks |
|-------|------|------|--------|--------|
| **S0** | Research freeze | — | **[x]** 2026-08-11 | — |
| **S1** | Do **not** restore any 2019 forest | S | **[ ]** | Safety |
| **S2** | Lean scaffold (no `cp 2018`) | M | **[ ]** | Boots |
| **S3** | Shell · connect · dirbar | S–M | **[ ]** | Voice |
| **S4** | Home / About / map / whats-new | M | **[ ]** | Thesis |
| **S5a** | Disney+ profiles + continue | L | **[ ]** | **One-thing** |
| **S5b** | Marshmello timed theater | M | **[ ]** | Second gold |
| **S5c** | Apple TV+ | S–M | **[ ]** | Stack |
| **S5d** | G+ funeral | S–M | **[ ]** | Dual-date |
| **S5e** | FTC $5B | S | **[ ]** | Careful |
| **S5f** | CNIL €50M | S | **[ ]** | 2018 reverse |
| **S6** | Chrome habit + Edge preview | S | **[ ]** | Habit |
| **S7** | Continuity chips | S | **[ ]** | Residual last |
| **S8** | `year-2019-extras.js` + `prefix()` | M | **[ ]** | Wiring |
| **S9** | P1 densify | M | **[ ]** | Depth |
| **S10** | Continue Row + 3 toys | M | **[ ]** | Game |
| **S11** | flow-maps · trails · matrix | M | **[ ]** | Journeys |
| **S12** | e2e pack | M | **[ ]** | Gates |
| **S13** | Hub + check-all-years + docs | S | **[ ]** | **Ship** |
| **S14** | Pixel harvest / failed-final | M | **[ ]** | Layer C |
| **S15** | P2 harvest rooms | M | **[ ]** | After A− |

**Order:** S0 → S1 → S2 → S3 → S4 → S8-stub → (S5a **first**, then S5b–S5f + S6 parallel-ok) → S8-complete → S7 + S9 + S10 → S11 → S12 → S13.  
**S15 after** visitor can walk A–F.  
**MVP ship** = S2–S6 + S8 + S11–S13 + S5a green.  
**Museum-ready A−** = MVP + S7 + S9 + S10 + S14 (or failed-final).  
**Museum-grade A** = A− + S15 + docs honest.  
**Still not gold-A L4** = official Disney/Apple/Epic art stays absent.

---

# Part 3 — Minute steps

# Phase S0 — Research freeze **[x]**

### Goal
Facts locked. No invent.

### Why
2018 scaffolded *after* READ-FIRST. 2019 has more dual-dates (G+ announce≠death, Flickr announce≠enforce, Edge announce≠preview≠ship, Libra paper≠wallet, HBO Max name≠launch, Zoom IPO≠Zoom mass, Disney+ trial≠continue). YEAR-STATUS and SCALE-LEDGER already lie about disk.

### Disk start
These five files on disk. `test ! -d years/2019` is true.

### Minute steps
1. Confirm Live Stats June table **ends 2018**. Do not invent 2019.  
2. Confirm Netcraft Jun 2019 Apache **54,879,492 / 29.39%** → ~**186.7M**.  
3. Confirm ITU **4.1B / +5.3% / just over 53%** from FF 2019 (reopen PDF).  
4. Confirm one-thing = **Disney+ profiles + continue** (COMPLEX §2019), **not** trial.  
5. Confirm Marshmello **2 Feb · ~10.7M**.  
6. Confirm Edge stable is **15 Jan 2020**.  
7. Confirm bans (COVID · Reels · Zoom mass · Meta · Travis Scott · Edge default).  
8. Confirm GDPR / TikTok FYP stay **2018 chips**.

### Acceptance
- [x] READ-FIRST + harvest + this file + YEAR-2019 + CAPTURE-LOG on disk  

### Anti-patterns
Scaffold before freeze · restore HEAD forest · trial as one-thing · “Edge shipped in 2019” as the default browser · “the web has X websites in June 2019” without a source.

---

# Phase S1 — Do not restore the forest **[ ]**

### Goal
Worktree stays clean. Any old `HEAD:years/2019` is reference-only.

### Why
YEAR-STATUS, IMPLEMENT-VERIFIED-GATES, and PRODUCT-FIVE-FIXES talk as if 2019 already shipped (trial click, Consent Dash `year-2019-consentdash.js`, extras writing `itt18-*`). **This branch has 0 HTML.** Copying an old tree would drag a GDPR tour and a 2018 game into the streaming year.

### Minute steps
1. `test ! -d years/2019` (must be true).  
2. `test ! -f js/config/2019.js`.  
3. Optional: `git log --all --oneline -- years/2019 | head` — **read, do not checkout**.  
4. **Do not** `git checkout HEAD -- years/2019 js/config/2019.js css/period-2019.css`.  
5. **Do not** `cp -R years/2018 years/2019`.  
6. **Do not** copy `js/games/year-2018-consentdash.js` → `year-2019-consentdash.js`.

### Acceptance
- [ ] No 200-HTML tree appears  
- [ ] Implementer can name three old rooms they will **not** copy (2018 GDPR tour as 2019, Consent Dash, 2013 Facebook feed as 2019)

### Anti-patterns
“The old 2019 was A−, just restore it.” That year is not on *this* disk and its extras fell back to `"2018"`.

---

# Phase S2 — Lean scaffold **[ ]**

### Goal
Year boots: shell + empty-ish home + stubs. ~18–25 HTML first.

### Files to create

```
years/2019/index.html
years/2019/pages/{home,about,map,whats-new,cool}.html
years/2019/pages/error/{404,unreachable}.html
js/config/2019.js
js/config/immersion-2019.js
js/immersion-2019.js
js/browser-2019.js
css/period-2019.css
assets/period/2019/README-PIXELS.txt
js/immersion/year-2019-extras.js          # stub bootAll
js/immersion/registry.js                  # add "2019" array
```

### `period-2019.css` rule

```css
/* 2019 period — deltas on 2018 */
@import url("period-2018.css");
```

Only add: Who’s Watching grid, continue rail, concert clock, funeral card, $5B receipt. Do **not** re-import 2017→2016→…. 2018 already chains.

### `immersion-2019.js` (copy shape, change year)

```js
ITT._immersionYear = "2019";
```

### `browser-2019.js`

```js
bootBrowserYear("2019");
```

### `config/2019.js` minimum

- `year: "2019"`
- `prefsKey: "itt-2019-prefs"`
- `storage` via immersion prefix `itt19`
- `home: "pages/home.html"`
- `browserTitleSuffix: " - Chrome / Edge"`
- `connectMode: "broadband"`
- `defaultPrefs.modemDelay` low (18-ish, same class as 2018)
- `urlMap` **only for files you add**
- `locationHints` for disneyplus / marshmello / appletv / gplus / ftc

### `registry.js` add **after** the `"2018"` block

```js
"2019": [
  "immersion/shared.js",
  "immersion/real-flow.js",
  "immersion/year-true-packs.js",
  "immersion/flow-map.js",
  "immersion/year-playable.js",
  "immersion/guestbook-search.js",
  "immersion/year-2019-extras.js"
]
```

Lean. Do **not** add snapchat.js / 2013 leftover modules / year-2018-extras.

### Minute steps
1. Copy **stubs** `immersion-2018.js` / `browser-2018.js` → 2019, change year strings only.  
2. Write `config/2019.js` from 2018: year, prefsKey `itt-2019-*`, home, urlMap **only for files you add**.  
3. Duplicate 2018 shell HTML; replace connect thesis; `data-itt-year="2019"`; `body` class `year-2019`.  
4. Register year in `registry.js`.  
5. Smoke: `python3 -m http.server 8080` → `/years/2019/` skip connect → iframe home.  
6. Confirm no console `missing config 2019`.

### Acceptance
- [ ] `/years/2019/` loads without console missing-config  
- [ ] `data-itt-year="2019"` on shell  
- [ ] Home visible in `#content`  
- [ ] Network tab: period-2019.css → period-2018.css only  

### Anti-patterns
Copying 2018 `urlMap` wholesale (broken GDPR links become 2019 “gold”) · forking `create.js` · adding `year-2018-extras`.

---

# Phase S3 — Shell voice **[ ]**

### Goal
Connect overlay, window title, dirbar feel like a 2019 desktop. COMPLEX X7: drop Vine / iOS7 / IE7 / 56k.

### Minute steps
1. Connect copy: “Disney+ · Marshmello · 4.1B people · the hostname table ended.”  
2. Title: “Chrome / Edge — 2019”.  
3. Dirbar keys: Disney+, Marshmello, Apple TV+, G+, Chrome, Win10.  
4. `connectBrowserLine`: “Starting Chrome...”  
5. No GDPR as first dirbar button. No Vine.  
6. Edge tile, if any, says **EdgeHTML · Chromium preview**.

### Acceptance
- [ ] Skip connect reveals chrome  
- [ ] Dirbar ≥5 year-true labels  
- [ ] Zero “56k” / “Vine” / “IE7” / “Manage cookies” as the first chrome control  

### Anti-patterns
2013 purple AIM leftovers · iPhone X as the window icon · Consent Dash in the dirbar.

---

# Phase S4 — Home / About / map / whats-new **[ ]**

### Goal
Thesis + guided 6 + residual last.

### Home order (mandatory)

1. `data-ott-one-thing="2019"` → `../sites/disneyplus/index.html`  
2. `#ott-guided-2019` ol **exactly 6** li + About link inside  
3. Playables strip (Continue Row)  
4. P1 chips (after S9 exists; empty heading ok at first)  
5. Residual chips **last** (GDPR 2018 · TikTok FYP · IGTV · Face ID · Stories · 280 · Vine gone)  
6. Hard-ban box (COVID · Reels · Zoom mass · Meta · Travis Scott · Edge default · official art)

### Guided 6 (lock)

```html
<ol id="ott-guided-2019">
  <li><a href="about.html">About 2019</a> — table ended · 4.1B</li>
  <li><a href="../sites/disneyplus/index.html">Disney+</a> — Nov 12 · Who’s watching</li>
  <li><a href="../sites/fortnite/marshmello.html">Marshmello</a> — Feb 2 · 10.7M</li>
  <li><a href="../sites/appletv/index.html">Apple TV+</a> — Nov 1 · $4.99</li>
  <li><a href="../sites/googleplus/funeral.html">Google+</a> — Apr 2 funeral</li>
  <li><a href="../sites/ftc/index.html">FTC $5B</a> · <a href="../sites/cnil/index.html">CNIL €50M</a></li>
</ol>
```

### About

- Table rows: Live Stats June **not published** · Netcraft active **~186.7M (method)** · ITU **4.1B / 53% / +5.3%** · HA **1934 / 1745 KB**  
- Honesty: hostnames ≠ people · table ended ≠ the web died  
- `[data-itt-real-save]` `data-storage-key="thesis-ack"` `data-min-req="2"`  
  - check: “Live Stats’ June table stops at 2018; we do not invent a 2019 digit”  
  - check: “ITU says just over 53% of the world is online — about 4.1 billion”  
- Bans listed  
- Optional third-axis: Almanac p50 requests 74 / 69

### Map

`pages/map.html` hosts `[data-itt-flow-map]` (S11 fills `ITT.flowMaps["2019"]`).

### What's new

Calendar table from READ-FIRST §4. P0 dates first. P2 dates wait for S15.

### Acceptance
- [ ] Guided 6  
- [ ] About incomplete click writes nothing  
- [ ] Residual appears after guided in DOM  
- [ ] One-thing href contains `disneyplus`

### Anti-patterns
GDPR as `data-ott-one-thing` · residual strip above guided · “1.63B websites in June 2019” · “187 million people online”.

---

# Phase S5a — Disney+ one-thing **[ ]**

### Goal
`itt19-disneyplus` only after Who’s Watching + Continue + kids honesty.

### Why
This is the year. COMPLEX Y1–Y4. Disney company news 12 Nov. CNBC 10M on 13 Nov.

### Files

```
years/2019/sites/disneyplus/index.html      # Who’s watching + trial CTA
years/2019/sites/disneyplus/home.html       # rows + Continue
years/2019/sites/disneyplus/kids.html       # kids shell
years/2019/sites/disneyplus/about.html      # $6.99 / 10M / Fox / bundle
css/period-2019.css                         # .itt19-whos · .itt19-row
js/immersion/year-2019-extras.js            # bootDisney · hydrateContinue
```

### Markup — index (Who’s watching)

```html
<div data-whos-watching>
  <h1>Who's watching?</h1>
  <button type="button" data-profile="adult-1">Adult</button>
  <button type="button" data-profile="kids-1">Kids</button>
  <button type="button" data-profile-add>Add profile</button>
</div>
<p><button type="button" data-dplus-trial>Start free trial</button></p>
<p data-itt-action-status></p>
```

Trial CTA CSS: visible, filled. It is period-true and **must not save**.

### Trial behavior (lock)

Clicking Start free trial:

1. Sets a status line: “That is the period button. This exhibit only saves after Who’s watching and Continue.”  
2. Does **not** call `saveJSON`.  
3. Does **not** set `itt19-disneyplus`.

### Markup — home (rows)

```html
<section data-continue-row>
  <h2>Continue Watching</h2>
  <ol data-continue-list></ol>
</section>
<section data-rows>
  <article data-title="mando" data-kids-ok="0">The Mandalorian</article>
  <article data-title="lion-king" data-kids-ok="0">The Lion King</article>
  <article data-title="nemo" data-kids-ok="1">Finding Nemo</article>
  <article data-title="frozen" data-kids-ok="1">Frozen</article>
</section>
<button type="button" data-add-continue>Add to Continue</button>
<label><input type="checkbox" data-dplus-date> Launches 12 Nov 2019 at $6.99</label>
<label><input type="checkbox" data-dplus-not-trial> Trial is not the save</label>
<label><input type="checkbox" data-dplus-kids> Kids is a different row</label>
<button type="button"
  data-itt-real-save
  data-storage-key="disneyplus"
  data-min-req="3"
  data-requires="[data-dplus-date],[data-dplus-not-trial],[data-dplus-kids]">Save profiles</button>
```

### Behavior
1. Active profile in `session` until save.  
2. Add to Continue pushes `title` into that profile’s `continueIds`.  
3. Kids profile **omits** `data-kids-ok="0"` titles (Y4 honesty).  
4. Save requires: **2 profiles exist**, adult continue **≥2**, all 3 checks.  
5. Reload hydrates grid + continue from storage.  
6. Never draw official art. CSS avatars (colored circles) + text titles.

### REAL blob

```js
{
  multiStep: true,
  real: true,
  year: "2019",
  ts: Date.now(),
  profile: "adult-1",
  profiles: ["adult-1", "kids-1"],
  continueIds: { "adult-1": ["mando", "lion-king"], "kids-1": [] },
  kidsBlocked: true,
  path: "continue"
}
```

### Minute steps
1. Write four Disney+ pages in period voice. Honesty: Fox closed **20 Mar**; Europe **31 Mar 2020**.  
2. Wire extras `bootDisney`. Empty Save writes nothing.  
3. Isolation: do not write `itt18-*`.  
4. About page: 500 films / 7,500 eps / 7 profiles / 4 streams / 10 downloads / bundle $12.99 / 10M day one / launch-day errors.

### Acceptance
- [ ] Bare trial does not write  
- [ ] Save with 1 profile or 0 continue items does not write  
- [ ] 2 profiles + 2 continue + 3 checks writes `itt19-disneyplus` JSON  
- [ ] Reload shows the same continue ids on the same profile  
- [ ] Kids view hides `mando`  
- [ ] No “Welcome to Disney+ 2024” chrome · no official castle  

### Tests
See S12 `2019-real-flows` and `2019-densify-real`.

### Anti-patterns
One-click trial success · “museum subscriber” · HBO Max as the gold · pre-filled continue that auto-saves.

---

# Phase S5b — Marshmello **[ ]**

### Goal
`itt19-marshmello` after ≥2 timed beats + “not Travis Scott”.

### Files
`years/2019/sites/fortnite/marshmello.html`  
Optional thin `fortnite/index.html` residual → Switch 2018 chip + World Cup (S9).

### Markup
- Map silhouette (CSS park) + clock  
- `[data-mello-beat]` buttons or auto ticks at ~8s / ~16s (do not require real audio)  
- `[data-mello-date]` 2 Feb 2019  
- `[data-mello-count]` ~10.7M  
- `[data-mello-not-travis]`  
- Save

### Copy
Variety 21 Feb. Pleasant Park. First Epic live show class. Travis Scott is April 2020.

### Acceptance
- [ ] Save with 0 beats writes nothing  
- [ ] Two beats + two checks writes `itt19-marshmello`  
- [ ] No downloaded helmet / Epic slash / audio from the show  

### Anti-patterns
Calling it a 2018 concert · Travis Scott sticker · autoplay a YouTube rip.

---

# Phase S5c — Apple TV+ **[ ]**

### Goal
`itt19-appletv` after **$4.99** + **1 Nov** + “year free with new device from 10 Sep” + “not Disney+”.

### Files
`years/2019/sites/appletv/index.html`

### Checks
1. **$4.99** / 7-day trial / Family 6.  
2. **1 Nov 2019** · 100+ countries · tv.apple.com.  
3. New iPhone/iPad/Mac/Apple TV from **10 Sep** includes **one year**.  
4. Not Disney+. Not Netflix’s library.

### Anti-patterns
Drawing the tv+ mark from marketing stills · claiming Ted Lasso (2020).

---

# Phase S5d — G+ funeral **[ ]**

### Goal
`itt19-gplus` after “dies **2 Apr 2019**” + “date locked **30 Jan**” + “announced Oct 2018, not this year’s birth.”

### Files
`years/2019/sites/googleplus/funeral.html`  
Optional export-zip theater (COMPLEX): a fake `takeout` list the visitor checks — **no real Google Takeout**.

### Next-flow
Inbox gone (same day) · CNIL (GDPR receipt).

### Anti-patterns
Calling April 2 the announce day · inventing the 2011-era multi-color G as a 2019 redesign.

---

# Phase S5e — FTC $5B **[ ]**

### Goal
3 literacy checks → `itt19-ftc`. No targeting UI.

### Checks (lock)

1. “**$5 billion** civil penalty, **24 Jul 2019**, FTC + DOJ.”  
2. “It enforces the **2012** privacy order — Cambridge Analytica is the 2018 story this fine sits on.”  
3. “This exhibit has no audience builder.”

Quote from [ftc.gov 24 Jul](https://www.ftc.gov/news-events/news/press-releases/2019/07/ftc-imposes-5-billion-penalty-sweeping-new-privacy-restrictions-facebook), attributed.

### Careful bar
Timeline · amount · 2012 order. **Do not** gamify harm. **Do not** let the visitor pick a voter segment.

---

# Phase S5f — CNIL €50M **[ ]**

### Goal
`itt19-cnil` after **€50M** + **21 Jan 2019** + “GDPR applied **25 May 2018**.”

### Files
`years/2019/sites/cnil/index.html`

### Why this is P0
2018 freeze **parked** CNIL because it is January 2019. Reverse that park here. Do not make it the one-thing.

### Anti-patterns
“We are now compliant” · treating the fine as 2018 gold.

---

# Phase S6 — Chrome habit + Edge preview **[ ]**

| Page | Does | Key |
|------|------|-----|
| `sites/chrome/index.html` | 3-check habit + not-Edge-default | `itt19-chrome` |
| `sites/edge/preview.html` | Insider / **4 Nov** names **15 Jan 2020** · 2018 was announce | `itt19-edge` |

### Checks for Edge
1. Announced **6 Dec 2018**.  
2. 2019 is **preview / Insider**.  
3. Stable **15 Jan 2020** — not this year’s default browser.

### Acceptance
- [ ] Incomplete never writes either key  
- [ ] Habit room does not claim Chrome launched in 2019  
- [ ] Body does not say “Edge ships this year” without the January 2020 clause  

---

# Phase S7 — Continuity chips **[ ]**

Home residual only (not 80 rooms).

| Chip | Points at | Line |
|------|-----------|------|
| GDPR | `sites/gdpr/residual.html` | “25 May **2018**. CNIL is the 2019 receipt.” Prefer in-year 1-page residual. Do **not** write `itt19-gdpr` as gold. |
| TikTok FYP | `sites/tiktok/residual.html` | “Aug 2 **2018** merge. Not Reels.” |
| IGTV | `sites/instagram/igtv.html` thin | “Jun 20 **2018**. Hide-likes is this year.” |
| Face ID | `sites/iphone/faceid.html` thin | “2017. 11 is a camera.” |
| Stories | `sites/instagram/stories.html` thin | “Aug 2 **2016**.” |
| 280 | `sites/twitter/280.html` thin | “Nov 7 **2017**. Fleets are 2020.” |
| Vine gone | `sites/vine/gone.html` thin | “Jan 17 **2017**.” |
| CCPA | chip | Signed 2018 · **in force 1 Jan 2020**. |
| Win10 | `sites/windows10/index.html` | Free offer already ended. |
| Flash | chip | Still plays · dies end **2020**. |

### Acceptance
- [ ] Residual block is **after** guided 6 in the DOM  
- [ ] No chip is `data-ott-one-thing`  

---

# Phase S8 — extras wiring **[ ]**

### File
`js/immersion/year-2019-extras.js` — copy **shape** of `year-2018-extras.js`:

- `prefix()` → `itt19` with fallback **`"2019"`** (COMPLEX Y0 — the old clone fell back to `"2018"`)  
- `bootAll` lists every S5/S6/S9/S15 boot  
- `registerLocal({ id: "year2019extras", featureKey: "year2019extras" })`  
- Every save: `multiStep: true, real: true, year: "2019"`  
- Incomplete return **before** `saveJSON`  
- `showNext()` on `[data-next-flow]`

### `immersion-2019.js` features

```js
features: {
  year2019extras: true,
  yearplayable: true,
  flowMap: true,
  nav: true,
  chromeBrowser: true
}
```

Do not enable `amazon` / `auction` / `year2018extras`.

### Acceptance
- [ ] Standalone Disney+ page boots extras  
- [ ] Neighbor `itt18-gdpr` untouched in e2e  
- [ ] `prefix()` never returns `itt18` on a 2019 page  

---

# Phase S9 — P1 densify **[ ]**

One HTML each. Copy shape from `years/2018/sites/homepod/index.html` + a `boot*` in extras. Home: new strip **Also in 2019 (P1)** after guided, before residuals.

| # | Room | Path | Do this | Writes | Next-flow |
|---|------|------|---------|--------|-----------|
| 1 | Flickr 1000 | `sites/flickr/1000.html` | **Enforce 8 Jan** · announce was Nov 2018 | `itt19-flickr` | G+ |
| 2 | Inbox gone | `sites/inbox/gone.html` | **2 Apr** · same day as G+ · features → Gmail | `itt19-inbox` | G+ |
| 3 | Huawei GMS | `sites/huawei/gms.html` | Entity List **15 May** · Google pause · not HarmonyOS mass | `itt19-huawei` | Edge preview |
| 4 | Oculus Quest | `sites/oculus/quest.html` | **21 May · $399** · standalone · Rift S same day + PC | `itt19-quest` | Marshmello |
| 5 | iPadOS / Catalina | `sites/ipados/index.html` | WWDC **3 Jun** · iPadOS **24 Sep** · Catalina **7 Oct** · iTunes splits | `itt19-ipados` | iOS 13 |
| 6 | Libra | `sites/libra/index.html` | **18 Jun** white paper · Calibra · **not live** · not Diem | `itt19-libra` | FTC |
| 7 | IG hide likes | `sites/instagram/likes.html` | Jul test · 7-country class · not Reels | `itt19-ig-likes` | IGTV chip |
| 8 | FN World Cup | `sites/fortnite/worldcup.html` | **26–28 Jul · $30M · Bugha $3M** · Arthur Ashe | `itt19-fn-wc` | Marshmello |
| 9 | iPhone 11 | `sites/iphone/11.html` | **$699** · stores **20 Sep** · **not 5G** · Face ID not new | `itt19-iphone11` | iOS 13 |
| 10 | iOS 13 | `sites/ios13/index.html` | **19 Sep** · Dark Mode · Sign in with Apple · **not Face ID** | `itt19-ios13` | Arcade |
| 11 | Apple Arcade | `sites/arcade/index.html` | **19 Sep · $4.99** · 100+ · 1-mo trial | `itt19-arcade` | Apple TV+ |
| 12 | Stadia | `sites/stadia/index.html` | **19 Nov · $129 / $9.99** · do not write the 2023 shutdown as 2019 fact | `itt19-stadia` | Disney+ |

Cap: if the tree is already at 55, merge iOS 13 + Arcade, or iPadOS + Catalina, rather than blow 60.

### Acceptance
- [ ] Each new key writes only after ≥2 checks  
- [ ] Home P1 strip exists  
- [ ] Guided 6 unchanged  

---

# Phase S10 — Continue Row + 3 toys **[ ]**

### Year game
`js/games/year-2019-continuerow.js` · `sites/playable/game.html`  
See [`GAMES-PER-YEAR/YEAR-2019.md`](GAMES-PER-YEAR/YEAR-2019.md).  
Honor `YearGame.isPaused`. Literacy before score. Start trial is a **trap lane** (no points). Profile + kids + continue scores.

Lobby must link the product Disney+ room (“see also Who’s watching”).

### Toys (`year-playable.js` `"2019"` — do **not** fall back to 2018)

| # | Type | Title | Writes |
|---|------|-------|--------|
| 1 | targets | **Who’s watching** Adult/Kids/Add | `itt19-playable` |
| 2 | hold | **Continue-row scroll** (~2s) | `itt19-playable-2` |
| 3 | type | **who's watching** | `itt19-playable-3` |

Phrase must match exactly.

`DEFAULT_GOALS["2019"]` + `DEFAULT_NEXT` → Disney+.

### Acceptance
- [ ] Game incomplete literacy writes no best score  
- [ ] Toys do not use 2018 “i want to be forgotten” fallback  
- [ ] `e2e/year-games*.spec.js` 2019 row exists after S12  

### Anti-patterns
Shipping Consent Dash again · Continue Row that awards Start trial.

---

# Phase S11 — Maps · trails · matrix **[ ]**

### flow-maps.js

```js
ITT.flowMaps["2019"] = {
  thesis: "Disney+ · Marshmello · G+ funeral · 4.1B people · the hostname table ended.",
  shell: "Windows 10 mass · Chrome habit · EdgeHTML + Chromium preview",
  year: "2019",
  branches: [
    { label: "Enter & orient", sites: [ home, about, map, whats-new ] },
    { label: "Who's watching", sites: [ disneyplus/index, disneyplus/home, disneyplus/kids, disneyplus/about ] },
    { label: "A park that is a map", sites: [ fortnite/marshmello, fortnite/worldcup ] },
    { label: "The other living room", sites: [ appletv, arcade, stadia ] },
    { label: "Funerals & receipts", sites: [ gplus, inbox, cnil, ftc ] },
    { label: "P1 densify", sites: [ flickr, huawei, quest, ipados, libra, ig-likes, iphone11, ios13, edge ] },
    { label: "P2 harvest (not the one-thing)", sites: [ /* S15 */ ] }
  ]
};
```

Every `href` must exist or the flow-map-real suite (extend its year list to 2019) will fail.

### museum-progress.js

```js
"2019": yearVisitTour("2019",
  { path: "sites/disneyplus/index.html", label: "Disney+", blurb: "Nov 12 · Who’s watching.", match: "/disneyplus" },
  { path: "sites/fortnite/marshmello.html", label: "Marshmello", blurb: "Feb 2 · 10.7M.", match: "/marshmello" })
```

Change loops `for (y = 1994; y <= 2018)` → `y <= 2019` in **both** places.

### REAL_FLOW_MATRIX
Add row: year 2019 · path Disney+ home · key `itt19-disneyplus` · hook `[data-itt-real-save]`.

### Passport / start trails
`e2e/year-start-trails.spec.js` and `e2e/museum-progress.spec.js` counts: 25 years → **26**.

### Acceptance
- [ ] Map page renders branches  
- [ ] Start trail 2019 has Disney+ + Marshmello  

---

# Phase S12 — e2e pack **[ ]**

### Create (mirror 2018 names)

```
e2e/2019-mvp.spec.js
e2e/2019-flows.spec.js
e2e/2019-real-flows.spec.js
e2e/2019-densify.spec.js
e2e/2019-densify-real.spec.js
e2e/2019-game.spec.js
e2e/2019-trail-real-flows.spec.js
e2e/2019-shell-honesty.spec.js
e2e/2019-flow-link-verify.spec.js
```

### `package.json`

```
"test:e2e:2019": "playwright test e2e/2019-mvp.spec.js e2e/2019-densify.spec.js e2e/2019-densify-real.spec.js e2e/2019-game.spec.js e2e/2019-flows.spec.js e2e/2019-real-flows.spec.js e2e/2019-trail-real-flows.spec.js e2e/2019-shell-honesty.spec.js e2e/2019-flow-link-verify.spec.js e2e/2014-2016-flow-map-real.spec.js --workers=1"
```

### Shared suites to extend (do not fork engines)

| File | Change |
|------|--------|
| `e2e/one-thing-per-year.spec.js` | 2019 path `sites/disneyplus/index.html` (or home) · homes loop `y <= 2019` |
| `e2e/all-years-real-system.spec.js` | YEARS include 2019 · thesis-ack |
| `e2e/year-signature-flows.spec.js` | Disney+ continue |
| `e2e/year-core-flows.spec.js` | location hint disneyplus |
| `e2e/year-games*.spec.js` | Continue Row |
| `e2e/year-handoff-flows.spec.js` | 2018 G+ announce → 2019 funeral · 2018 Edge announce → 2019 preview |
| `e2e/hub-years.spec.js` | 26 years |
| `e2e/2014-2016-flow-map-real.spec.js` | year list through 2019 |
| `e2e/no-mock-flows.spec.js` | 2019 keys |

### Real-flow assertions (every P0/P1 key)

1. Incomplete click → `localStorage` missing key.  
2. Complete → JSON with `multiStep`, `real`, `year: "2019"`.  
3. Neighbor `itt18-gdpr` still absent (unless the test seeded it).  
4. Disney+: trial path does **not** write.  
5. Kids: `mando` not in kids continue after a kids-only add attempt.

### Locator hygiene (from 2018 scars)

- Prefer `.first()` on nav+body duplicate links.  
- Residual chips that are `hidden` fail “visible” tests — add a **visible** GDPR residual line.  
- Do not look for Consent Dash.

### Acceptance
```
npm run test:e2e:2019
npx playwright test e2e/one-thing-per-year.spec.js e2e/all-years-real-system.spec.js -g 2019
```

---

# Phase S13 — Hub + docs **[ ]**

### Minute steps
1. `index.html` year card `y2019` **available** · resume regex include 2019 · footer **“2020+ not on disk”**.  
2. `css/hub.css` chip color if needed.  
3. `scripts/check-all-years.py`  
   - `KNOWN_YEARS = range(1994, 2020)`  
   - signature list: home, about, `sites/disneyplus/index.html`, `sites/disneyplus/home.html`, `sites/fortnite/marshmello.html`, `sites/appletv/index.html`, `sites/googleplus/funeral.html`, `sites/playable/game.html`, chrome, windows10  
4. `scripts/itt_gate.py` / `oss-visitor-gate.mjs` if they hardcode 2018 as last year — bump.  
5. `js/museum-progress.js` loops to 2019 (S11).  
6. Docs **after tests green**:  
   - `DISK-TRUTH.md` — hub 1994–2019 · 2019 lean A−  
   - `NON-DONE.md` — 2019 playable · 2020+ not on disk  
   - `2019-MUSEUM-GRADE.md` — write a short grade card (A− until S15)  
   - Correct `SCALE-LEDGER.md` “on disk” if not already  
   - Do **not** rewrite COMPLEX as if the old 2019 forest is live  
7. `games/index.html` / `games/about.html` year list if they enumerate years.  
8. Do **not** unlock 2020.

### Acceptance
- [ ] Hub shows **26** years 1994–2019  
- [ ] `check-all-years.py` 2019 **pass**  
- [ ] Footer does not say “2019+ not on disk”  

### Anti-patterns
Claiming museum-grade A before S15 · claiming L4 art · unlocking because YEAR-STATUS once said A−.

---

# Phase S14 — Pixels **[ ]** failed-final is A-legal

### Goal
Every `<img>` is Wayback / Newsroom / Disney IR / FTC / failed-final RECON. Never invent the castle, the helmet, or the tv+ mark.

### Minute steps
1. Create `assets/period/2019/{disneyplus,fortnite,appletv,googleplus,ftc,chrome}/README-AUTHENTICITY.txt`.  
2. Try Wayback `im_` + Version Museum + Newsroom + Disney IR **text** pages.  
3. Log every fail in `docs/references/2019/CAPTURE-LOG.md` (stub already exists).  
4. CSS silhouettes: Who’s Watching circles, continue rail, park clock.  
5. CMP leftover CSS from 2018 must **not** appear as the 2019 hero.

### Acceptance
- [ ] Used `<img>` are WA / WDM / Newsroom / failed-final labeled  
- [ ] CAPTURE-LOG exists even if every attempt failed  

---

# Phase S15 — P2 harvest (after A−) **[ ]**

Copy 2018 P2 table grammar. Guided 6 unchanged. Home strip **Also in 2019 (P2 harvest)** after P1, before residuals.

| # | Room | Path | Do this | Writes |
|---|------|------|---------|--------|
| 1 | Tumblr → Automattic | `sites/tumblr/sold.html` | **12 Aug** · after Dec 2018 ban · no porn theater | `itt19-tumblr` |
| 2 | WeWork S-1 | `sites/wework/ipo.html` | **30 Sep** withdraw · unicorn hangover · not a roast | `itt19-wework` |
| 3 | AirPods Pro | `sites/airpods/pro.html` | **28/30 Oct · $249** · ANC | `itt19-airpods` |
| 4 | Zoom IPO chip | `sites/zoom/ipo.html` | **18 Apr** listing · **not mass remote** | `itt19-zoom-ipo` |
| 5 | Slack listing | `sites/slack/direct.html` | **20 Jun** direct listing | `itt19-slack` |
| 6 | Uber / Lyft chip | `sites/uber/ipo.html` | May / Mar · optional merge one page | `itt19-uber` |
| 7 | HBO Max named | `sites/hbomax/named.html` | **9 Jul** · launches **2020** | `itt19-hbomax` |
| 8 | Pixel 4 / Android 10 | `sites/pixel/4.html` | optional merge | `itt19-pixel4` |

### Parked even in P2
Galaxy Fold drama · HarmonyOS announce · Fortnite Chapter 2 · *The Witcher* · GoT S8 · Endgame · Area 51 · Notre Dame livestream · Apple Card · Facebook Dating · Mixer · xCloud · Peacock/Quibi announce · 5G carrier ads · EVALI · impeachment / Brexit (politics-as-chrome).

### Tests
Extend `2019-densify-real.spec.js` the same way 2018 P2 did.

---

# Part 4 — Room inventory (target tree)

Cap **60**. MVP is the P0 + shell. Counts are *files*, not rooms.

```
years/2019/
  index.html
  pages/home.html
  pages/about.html
  pages/map.html
  pages/whats-new.html
  pages/cool.html
  pages/error/404.html
  pages/error/unreachable.html
  sites/disneyplus/index.html
  sites/disneyplus/home.html
  sites/disneyplus/kids.html
  sites/disneyplus/about.html
  sites/fortnite/marshmello.html
  sites/fortnite/worldcup.html
  sites/appletv/index.html
  sites/googleplus/funeral.html
  sites/ftc/index.html
  sites/cnil/index.html
  sites/chrome/index.html
  sites/chrome/about.html
  sites/edge/preview.html
  sites/windows10/index.html
  sites/flickr/1000.html
  sites/inbox/gone.html
  sites/huawei/gms.html
  sites/oculus/quest.html
  sites/ipados/index.html
  sites/libra/index.html
  sites/instagram/likes.html
  sites/instagram/igtv.html          # residual
  sites/instagram/stories.html       # residual
  sites/iphone/11.html
  sites/iphone/faceid.html           # residual
  sites/ios13/index.html
  sites/arcade/index.html
  sites/stadia/index.html
  sites/gdpr/residual.html
  sites/tiktok/residual.html
  sites/twitter/280.html
  sites/vine/gone.html
  sites/playable/index.html
  sites/playable/game.html
  # S15
  sites/tumblr/sold.html
  sites/wework/ipo.html
  sites/airpods/pro.html
  sites/zoom/ipo.html
  sites/slack/direct.html
  sites/hbomax/named.html
```

---

# Part 5 — Storage isolation matrix

| Key | Room | REAL when |
|-----|------|-----------|
| `itt19-thesis-ack` | about | 2 checks |
| `itt19-disneyplus` | disneyplus | 2 profiles + 2 continue + 3 checks |
| `itt19-marshmello` | marshmello | 2 beats + not-Travis |
| `itt19-appletv` | appletv | $4.99 + date + not D+ |
| `itt19-gplus` | funeral | 2 Apr + 30 Jan + 2018 announce |
| `itt19-ftc` | ftc | $5B + 24 Jul + no targeting |
| `itt19-cnil` | cnil | €50M + 21 Jan + GDPR 2018 |
| `itt19-chrome` | chrome | habit 3-check |
| `itt19-edge` | preview | announce ≠ preview ≠ ship |
| `itt19-game-continuerow` | playable | literacy + profile path |
| `itt19-*` P1/P2 | densify | ≥2 checks each |

Neighbor: `itt18-gdpr` / `itt18-tiktok-fyp` / `itt18-game-consentdash` must stay untouched.

---

# Part 6 — Copy bank (short)

See harvest §8. Implementer pastes, then cites.

**Home one-thing:** `Who’s watching? Kids is a different row. The concert is a map. Plus is a funeral.`

**Switch (2018 residual if linked):** `The 2018 Switch room already had Fortnite. This year is the concert and the World Cup.`

**Stadia:** `November 19, 2019. Founder’s $129. Pro $9.99. Do not write the ending in this room.`

**Edge:** `Preview this year. Stable January 15, 2020. Chrome is still the habit.`

---

# Part 7 — Done / not done

**S0 done.** Everything else waits on an implement ask.

**Do not do next without being asked:** scaffold `years/2019/`, unlock the hub card, write e2e, copy 2018.

**When asked to implement:** start S1 → S2. Do not start at S13.
