# 2× REAL dests — implementation phases · minute steps (every ship year)

**Date:** 2026-08-20  
**Status:** **Implemented 2026-08-20** on disk. 15 hole-years received **18 leftover writers** each. Band A (1994–2000, 2012) received **more.html** second dests.  
**Pattern copied from:** [`1994-1997-4X-FLOWS-GOALS-PHASES-STEPS.md`](1994-1997-4X-FLOWS-GOALS-PHASES-STEPS.md) · engine [`js/immersion/year-4x-flows.js`](../js/immersion/year-4x-flows.js) · injector [`scripts/build-2x-links.py`](../scripts/build-2x-links.py).  
**Git only if asked.**

**What 2× means here:** double the number of REAL leftover dests a visitor can finish. **Not** 2× raw hrefs on Starting Point. Guided `<ol>` stays **exactly 6**. Stars do not move. Incomplete never writes. Prefix `ittYY-*` only.

| Companion | Role |
|-----------|------|
| This file | Implement-from-this · goals · phases · minute steps · every year |
| [`2X-LINKS-EVERY-YEAR-RESEARCH-GOALS-PHASES-MINUTE-2026-08-20.md`](2X-LINKS-EVERY-YEAR-RESEARCH-GOALS-PHASES-MINUTE-2026-08-20.md) | Research freeze · harvest honesty |
| [`1994-1997-4X-FLOWS-GOALS-PHASES-STEPS.md`](1994-1997-4X-FLOWS-GOALS-PHASES-STEPS.md) | Original 4× kit (already shipped) |
| `e2e/2x-links.matrix.json` · `e2e/2x-links-all-years.spec.js` | Incomplete → REAL · dest 200 · no neighbor leak |

---

## Shared laws (every phase, every year)

1. Incomplete REAL **never writes** `localStorage`.  
2. Prefix **`ittYY-*` only**. Isolation vs neighbor year.  
3. **Never invent brand pixels.** WA / WDM / Version Museum, or **failed-final**.  
4. Do **not** add a 7th guided home step.  
5. Do **not** grow a dest-field forest.  
6. Do **not** restore 2013–2014.  
7. After each year: existing `e2e/YYYY-*.spec.js` stay green + `e2e/2x-links-all-years.spec.js`.  
8. Re-run injector is idempotent (`<!-- ITT-4X:suffix:start -->` markers).

```bash
python3 scripts/build-2x-links.py
python3 -m http.server 8080 --bind 127.0.0.1
npx playwright test e2e/2x-links-all-years.spec.js --workers=2
python3 scripts/check-all-years.py
node scripts/audit-mock-flows.js
```

### Shared phase S0 — freeze (do once) · `[x]`

1. Confirm ship years: 1994–2012 + 2015–2018 (23).  
2. Count `data-4x-go`: 1994–2000 and 2012 already had 18 original 4× writers. 2001–2011 and 2015–2018 had **0**.  
3. Lock stars (table in each year section).  
4. Lock 2× = **18 leftover writers** on existing slugs (Band B/C) **or** `more.html` second dests (Band A).  
5. Stop. Name a year only if you re-open.

### Shared phase S1 — trail kit · `[x]`

Every new writer: act → `ittYY-*` → hidden `data-next-flow` → next room. Isolation test. Incomplete blocked. Kinds: `query` · `checks` · `hops` · `wait` · `toggle`.

### Shared phase S2 — home + map · `[x]`

`pages/home.html` gets `<!-- ITT-2X-TRAILS -->` (below guided 6). `pages/map.html` gets `<!-- ITT-2X-MAP -->`. Star chip unchanged.

### Shared phase S3 — e2e + gates · `[x]` specs on disk

`e2e/2x-links-all-years.spec.js` reads the matrix. Empty click writes nothing. Complete writes `{real, multiStep, year, kind}`. Next dest HTTP 200. No neighbor `ittYY`.

---

# 1994
**Thesis (locked):** `1994-RESEARCH.md` — directories beat search. NN1 · Win 3.1 · 14.4.
**Star stays:** Cool Site of the Day · `itt94-csotd`.
**Band:** A · deepen more.html (original 18 4× already shipped).

### Goal
Visitor can finish the original 18 leftover sessions **and** 10 second dests (`more.html`) without a new folder. Next on `more.html` lands on the star.

**Visitor outcome**

```
Hub → 1994
  → About · bans · dual-cite
  → ★ Cool Site of the Day
  → 10 2× leftover dests (incomplete never writes)
  → Exit · itt94-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Confirm pizza leftover | `sites/pizzahut/more.html` | `itt94-pizza-more` | query | `sites/csotd/index.html` |
| N2 | Confirm first-retail leftover | `sites/netmarket/more.html` | `itt94-netmarket-more` | query | `sites/csotd/index.html` |
| N3 | Open a title card leftover | `sites/imdb/more.html` | `itt94-imdb-more` | query | `sites/csotd/index.html` |
| N4 | Open a second Galaxy category | `sites/galaxy/more.html` | `itt94-galaxy-more` | query | `sites/csotd/index.html` |
| N5 | GNN leftover second page | `sites/gnn/more.html` | `itt94-gnn-more` | query | `sites/csotd/index.html` |
| N6 | JumpStation leftover results | `sites/jumpstation/more.html` | `itt94-jump-more` | query | `sites/csotd/index.html` |
| N7 | Prodigy leftover second door | `sites/prodigy/more.html` | `itt94-prodigy-more` | query | `sites/csotd/index.html` |
| N8 | Pathfinder leftover magazine | `sites/pathfinder/more.html` | `itt94-pathfinder-more` | query | `sites/csotd/index.html` |
| N9 | Infoseek leftover results | `sites/infoseek/more.html` | `itt94-infoseek-more` | query | `sites/csotd/index.html` |
| N10 | CompuServe leftover forum | `sites/compuserve/more.html` | `itt94-cis-more` | query | `sites/csotd/index.html` |

### Phases

**94-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/1994/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**94-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**94-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**94-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/1994.js` (`rooms[]` or `urlMap`).

**94-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1994" --workers=1`

**94-P5 · Done when**  
10 keys can write · dests 200 · 0 dest-field · existing 1994 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt94-csotd` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 1995
**Thesis (locked):** `1995-RESEARCH.md` — commercial Web. Win95 · NN2 · Amazon books.
**Star stays:** Amazon SSL checkout · `itt95-ssl-checkout`.
**Band:** A · deepen more.html (original 18 4× already shipped).

### Goal
Visitor can finish the original 18 leftover sessions **and** 10 second dests (`more.html`) without a new folder. Next on `more.html` lands on the star.

**Visitor outcome**

```
Hub → 1995
  → About · bans · dual-cite
  → ★ Amazon SSL checkout
  → 10 2× leftover dests (incomplete never writes)
  → Exit · itt95-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | ESPNet leftover scoreboard | `sites/espn/more.html` | `itt95-espn-more` | query | `sites/amazon/ssl-checkout.html` |
| N2 | Salon leftover essay | `sites/salon/more.html` | `itt95-salon-more` | query | `sites/amazon/ssl-checkout.html` |
| N3 | Classmates leftover result | `sites/classmates/more.html` | `itt95-classmates-more` | query | `sites/amazon/ssl-checkout.html` |
| N4 | Match leftover profile | `sites/match/more.html` | `itt95-match-more` | query | `sites/amazon/ssl-checkout.html` |
| N5 | Tripod leftover page | `sites/tripod/more.html` | `itt95-tripod-more` | query | `sites/amazon/ssl-checkout.html` |
| N6 | AOL leftover keyword | `sites/aol/more.html` | `itt95-aol-more` | query | `sites/amazon/ssl-checkout.html` |
| N7 | WSJ leftover story | `sites/wsj/more.html` | `itt95-wsj-more` | query | `sites/amazon/ssl-checkout.html` |
| N8 | HotBot leftover results | `sites/hotbot/more.html` | `itt95-hotbot-more` | query | `sites/amazon/ssl-checkout.html` |
| N9 | Pathfinder leftover 1995 | `sites/pathfinder/more.html` | `itt95-pf-more` | query | `sites/amazon/ssl-checkout.html` |
| N10 | Infoseek leftover 1995 | `sites/infoseek/more.html` | `itt95-infoseek-more` | query | `sites/amazon/ssl-checkout.html` |

### Phases

**95-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/1995/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**95-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**95-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**95-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/1995.js` (`rooms[]` or `urlMap`).

**95-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1995" --workers=1`

**95-P5 · Done when**  
10 keys can write · dests 200 · 0 dest-field · existing 1995 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt95-ssl-checkout` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 1996
**Thesis (locked):** `1996-RESEARCH.md` — portals · HoTMaiL · Space Jam.
**Star stays:** Portal wars · `itt96-portal-wars`.
**Band:** A · deepen more.html (original 18 4× already shipped).

### Goal
Visitor can finish the original 18 leftover sessions **and** 8 second dests (`more.html`) without a new folder. Next on `more.html` lands on the star.

**Visitor outcome**

```
Hub → 1996
  → About · bans · dual-cite
  → ★ Portal wars
  → 8 2× leftover dests (incomplete never writes)
  → Exit · itt96-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | MTV leftover video page | `sites/mtv/more.html` | `itt96-mtv-more` | query | `sites/portals/wars.html` |
| N2 | Ask Jeeves leftover answer | `sites/askjeeves/more.html` | `itt96-jeeves-more` | query | `sites/portals/wars.html` |
| N3 | theGlobe leftover | `sites/theglobe/more.html` | `itt96-globe-more` | query | `sites/portals/wars.html` |
| N4 | totalny leftover listing | `sites/totalny/more.html` | `itt96-tny-more` | query | `sites/portals/wars.html` |
| N5 | MSN leftover 1996 | `sites/msn/more.html` | `itt96-msn-more` | query | `sites/portals/wars.html` |
| N6 | Plugin leftover skip | `sites/plugin/more.html` | `itt96-plugin-more` | query | `sites/portals/wars.html` |
| N7 | Angelfire leftover page | `sites/angelfire/more.html` | `itt96-angel-more` | query | `sites/portals/wars.html` |
| N8 | Infoseek leftover 1996 | `sites/infoseek/more.html` | `itt96-infoseek-more` | query | `sites/portals/wars.html` |

### Phases

**96-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/1996/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**96-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**96-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**96-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/1996.js` (`rooms[]` or `urlMap`).

**96-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1996" --workers=1`

**96-P5 · Done when**  
8 keys can write · dests 200 · 0 dest-field · existing 1996 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt96-portal-wars` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 1997
**Thesis (locked):** `1997-RESEARCH.md` — IE4 · eBay · ICQ · PointCast.
**Star stays:** PointCast · `itt97-pointcast`.
**Band:** A · deepen more.html (original 18 4× already shipped).

### Goal
Visitor can finish the original 18 leftover sessions **and** 7 second dests (`more.html`) without a new folder. Next on `more.html` lands on the star.

**Visitor outcome**

```
Hub → 1997
  → About · bans · dual-cite
  → ★ PointCast
  → 7 2× leftover dests (incomplete never writes)
  → Exit · itt97-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | NYTimes leftover story | `sites/nytimes/more.html` | `itt97-nyt-more` | query | `sites/pointcast/index.html` |
| N2 | MP3.com leftover track | `sites/mp3com/more.html` | `itt97-mp3-more` | query | `sites/pointcast/index.html` |
| N3 | ZDNet leftover file | `sites/zdnet/more.html` | `itt97-zdnet-more` | query | `sites/pointcast/index.html` |
| N4 | BBC leftover story | `sites/bbc/more.html` | `itt97-bbc-more` | query | `sites/pointcast/index.html` |
| N5 | News.com leftover | `sites/newscom/more.html` | `itt97-newscom-more` | query | `sites/pointcast/index.html` |
| N6 | Scripting leftover | `sites/scripting/more.html` | `itt97-scripting-more` | query | `sites/pointcast/index.html` |
| N7 | Winamp leftover skin | `sites/winamp/more.html` | `itt97-winamp-more` | query | `sites/pointcast/index.html` |

### Phases

**97-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/1997/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**97-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**97-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**97-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/1997.js` (`rooms[]` or `urlMap`).

**97-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1997" --workers=1`

**97-P5 · Done when**  
7 keys can write · dests 200 · 0 dest-field · existing 1997 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt97-pointcast` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 1998
**Thesis (locked):** `1998-RESEARCH.md` — Lucky · portals still win usage.
**Star stays:** I'm Feeling Lucky · `itt98-lucky`.
**Band:** A · deepen more.html (original 18 4× already shipped).

### Goal
Visitor can finish the original 18 leftover sessions **and** 7 second dests (`more.html`) without a new folder. Next on `more.html` lands on the star.

**Visitor outcome**

```
Hub → 1998
  → About · bans · dual-cite
  → ★ I'm Feeling Lucky
  → 7 2× leftover dests (incomplete never writes)
  → Exit · itt98-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | GO leftover channel | `sites/go/more.html` | `itt98-go-more` | query | `sites/google/lucky.html` |
| N2 | Snap leftover results | `sites/snap/more.html` | `itt98-snap-more` | query | `sites/google/lucky.html` |
| N3 | About leftover guide | `sites/about/more.html` | `itt98-about-more` | query | `sites/google/lucky.html` |
| N4 | Open Diary leftover | `sites/opendiary/more.html` | `itt98-od-more` | query | `sites/google/lucky.html` |
| N5 | ICQ web leftover | `sites/icqweb/more.html` | `itt98-icqweb-more` | query | `sites/google/lucky.html` |
| N6 | Valve leftover | `sites/valve/more.html` | `itt98-valve-more` | query | `sites/google/lucky.html` |
| N7 | WinFiles leftover | `sites/winfiles/more.html` | `itt98-winfiles-more` | query | `sites/google/lucky.html` |

### Phases

**98-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/1998/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**98-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**98-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**98-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/1998.js` (`rooms[]` or `urlMap`).

**98-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1998" --workers=1`

**98-P5 · Done when**  
7 keys can write · dests 200 · 0 dest-field · existing 1998 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt98-lucky` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 1999
**Thesis (locked):** `1999-RESEARCH.md` — AIM · Napster · Blogger · Y2K.
**Star stays:** AIM sign-on · `itt99-aim`.
**Band:** A · deepen more.html (original 18 4× already shipped).

### Goal
Visitor can finish the original 18 leftover sessions **and** 6 second dests (`more.html`) without a new folder. Next on `more.html` lands on the star.

**Visitor outcome**

```
Hub → 1999
  → About · bans · dual-cite
  → ★ AIM sign-on
  → 6 2× leftover dests (incomplete never writes)
  → Exit · itt99-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Neopets leftover pet | `sites/neopets/more.html` | `itt99-neo-more` | query | `sites/aim/index.html` |
| N2 | eGroups leftover list | `sites/egroups/more.html` | `itt99-egroups-more` | query | `sites/aim/index.html` |
| N3 | Webvan leftover | `sites/webvan/more.html` | `itt99-webvan-more` | query | `sites/aim/index.html` |
| N4 | E*TRADE leftover | `sites/etrade/more.html` | `itt99-etrade-more` | query | `sites/aim/index.html` |
| N5 | Onion leftover | `sites/theonion/more.html` | `itt99-onion-more` | query | `sites/aim/index.html` |
| N6 | Yahoo Messenger leftover | `sites/yahoomessenger/more.html` | `itt99-ym-more` | query | `sites/aim/index.html` |

### Phases

**99-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/1999/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**99-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**99-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**99-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/1999.js` (`rooms[]` or `urlMap`).

**99-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1999" --workers=1`

**99-P5 · Done when**  
6 keys can write · dests 200 · 0 dest-field · existing 1999 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt99-aim` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2000
**Thesis (locked):** `2000-RESEARCH.md` — smile · crash · MapQuest.
**Star stays:** MapQuest · `itt00-mapquest`.
**Band:** A · deepen more.html (original 18 4× already shipped).

### Goal
Visitor can finish the original 18 leftover sessions **and** 6 second dests (`more.html`) without a new folder. Next on `more.html` lands on the star.

**Visitor outcome**

```
Hub → 2000
  → About · bans · dual-cite
  → ★ MapQuest
  → 6 2× leftover dests (incomplete never writes)
  → Exit · itt00-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Half.com leftover used CD | `sites/half/more.html` | `itt00-half-more` | query | `sites/mapquest/index.html` |
| N2 | Baidu leftover results | `sites/baidu/more.html` | `itt00-baidu-more` | query | `sites/mapquest/index.html` |
| N3 | Everything2 leftover writeup | `sites/everything2/more.html` | `itt00-e2-more` | query | `sites/mapquest/index.html` |
| N4 | Expedia leftover | `sites/expedia/more.html` | `itt00-expedia-more` | query | `sites/mapquest/index.html` |
| N5 | Travelocity leftover | `sites/travelocity/more.html` | `itt00-travel-more` | query | `sites/mapquest/index.html` |
| N6 | Homestar leftover | `sites/homestar/more.html` | `itt00-homestar-more` | query | `sites/mapquest/index.html` |

### Phases

**00-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2000/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**00-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**00-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**00-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2000.js` (`rooms[]` or `urlMap`).

**00-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2000" --workers=1`

**00-P5 · Done when**  
6 keys can write · dests 200 · 0 dest-field · existing 2000 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt00-mapquest` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2001
**Thesis (locked):** `2001-RESEARCH.md` — Wikipedia · iPod library · XP+IE6.
**Star stays:** Wikipedia edit · `itt01-wiki-pages`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2001
  → About · bans · dual-cite
  → ★ Wikipedia edit
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt01-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Wiki preview then leftover | `sites/wikipedia/edit.html` | `itt01-wiki-prev` | hops | `sites/apple/ipod.html` |
| N2 | Name a track in the iPod library | `sites/apple/ipod.html` | `itt01-ipod-lib` | query | `sites/broadband/index.html` |
| N3 | Always-on ISP leftover | `sites/broadband/index.html` | `itt01-broadband` | checks | `sites/msn/index.html` |
| N4 | MSN leftover sign-on | `sites/msn/index.html` | `itt01-msn-sign` | query | `sites/google/index.html` |
| N5 | Google 2001 catalog query | `sites/google/index.html` | `itt01-google-q` | query | `sites/yahoo/index.html` |
| N6 | Yahoo 2001 two hubs | `sites/yahoo/index.html` | `itt01-yahoo-hop` | hops | `sites/amazon/index.html` |
| N7 | Amazon smile leftover search | `sites/amazon/index.html` | `itt01-cart` | query | `sites/ebay/index.html` |
| N8 | eBay leftover bid theater | `sites/ebay/index.html` | `itt01-ebay-bid` | query | `sites/napster/index.html` |
| N9 | Napster leftover search (no files) | `sites/napster/index.html` | `itt01-napster-q` | query | `sites/gnutella/index.html` |
| N10 | Gnutella scare leftover | `sites/gnutella/index.html` | `itt01-gnutella` | checks | `sites/wayback/index.html` |
| N11 | Wayback first-look leftover | `sites/wayback/index.html` | `itt01-wayback-q` | query | `sites/blogger/index.html` |
| N12 | Blogger leftover title | `sites/blogger/index.html` | `itt01-blog-q` | query | `sites/movabletype/index.html` |
| N13 | Movable Type leftover hops | `sites/movabletype/index.html` | `itt01-mt-hop` | hops | `sites/mozilla/index.html` |
| N14 | Mozilla 0.9 leftover | `sites/mozilla/index.html` | `itt01-mozilla-ack` | checks | `sites/cnet/index.html` |
| N15 | CNET leftover download name | `sites/cnet/index.html` | `itt01-cnet-dl` | query | `sites/bbc/index.html` |
| N16 | BBC leftover headline | `sites/bbc/index.html` | `itt01-bbc-q` | query | `sites/encarta/index.html` |
| N17 | Encarta vs wiki leftover | `sites/encarta/index.html` | `itt01-encarta-ack` | checks | `sites/pets/index.html` |
| N18 | Pets.com archive leftover | `sites/pets/index.html` | `itt01-pets-ack` | checks | `sites/wikipedia/edit.html` |

### Phases

**01-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2001/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**01-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**01-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**01-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2001.js` (`rooms[]` or `urlMap`).

**01-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2001" --workers=1`

**01-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2001 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt01-wiki-pages` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2002
**Thesis (locked):** `2002-RESEARCH.md` — Stumble · KaZaA · always-on.
**Star stays:** StumbleUpon · `itt02-stumble`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2002
  → About · bans · dual-cite
  → ★ StumbleUpon
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt02-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Stumble leftover ×2 | `sites/stumbleupon/index.html` | `itt02-stumble-2x` | hops | `sites/friendster/index.html` |
| N2 | Friendster leftover testimonial | `sites/friendster/index.html` | `itt02-ftest` | query | `sites/kazaa/index.html` |
| N3 | KaZaA leftover search (no files) | `sites/kazaa/index.html` | `itt02-kazaa-q` | query | `sites/netflix/index.html` |
| N4 | Netflix DVD leftover queue | `sites/netflix/index.html` | `itt02-nfq` | query | `sites/wired/index.html` |
| N5 | Wired CSS leftover hops | `sites/wired/index.html` | `itt02-wired-hop` | hops | `sites/googlenews/index.html` |
| N6 | Google News BETA leftover | `sites/googlenews/index.html` | `itt02-gnews` | query | `sites/daypop/index.html` |
| N7 | Daypop leftover query | `sites/daypop/index.html` | `itt02-daypop` | query | `sites/technorati/index.html` |
| N8 | Technorati cosmos leftover | `sites/technorati/index.html` | `itt02-cosmos` | query | `sites/blogger/index.html` |
| N9 | Blogger Pyra leftover | `sites/blogger/index.html` | `itt02-blog-q` | query | `sites/phoenix/index.html` |
| N10 | Phoenix 0.1 leftover | `sites/phoenix/index.html` | `itt02-phoenix-ack` | checks | `sites/lastfm/index.html` |
| N11 | Last.fm leftover seed | `sites/lastfm/index.html` | `itt02-lastfm` | query | `sites/steam/index.html` |
| N12 | Steam leftover | `sites/steam/index.html` | `itt02-steam-ack` | checks | `sites/meetup/index.html` |
| N13 | Meetup leftover RSVP | `sites/meetup/index.html` | `itt02-meetup` | query | `sites/fotolog/index.html` |
| N14 | Fotolog leftover caption | `sites/fotolog/index.html` | `itt02-fotolog` | query | `sites/typepad/index.html` |
| N15 | TypePad leftover publish | `sites/typepad/index.html` | `itt02-typepad` | query | `sites/askjeeves/index.html` |
| N16 | Ask leftover question | `sites/askjeeves/index.html` | `itt02-ask` | query | `sites/amazon/index.html` |
| N17 | Amazon smile leftover | `sites/amazon/index.html` | `itt02-cart` | query | `sites/wikipedia/index.html` |
| N18 | Wikipedia leftover hops | `sites/wikipedia/index.html` | `itt02-wiki-hop` | hops | `sites/stumbleupon/index.html` |

### Phases

**02-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2002/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**02-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**02-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**02-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2002.js` (`rooms[]` or `urlMap`).

**02-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2002" --workers=1`

**02-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2002 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt02-stumble` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2003
**Thesis (locked):** `2003-RESEARCH.md` — Photobucket · MySpace · 99¢ Store.
**Star stays:** Photobucket · `itt03-photobucket`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2003
  → About · bans · dual-cite
  → ★ Photobucket
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt03-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Photobucket leftover filename | `sites/photobucket/index.html` | `itt03-pb-fn` | query | `sites/myspace/index.html` |
| N2 | MySpace leftover two friends | `sites/myspace/index.html` | `itt03-ms-top8` | hops | `sites/itunes/index.html` |
| N3 | iTunes 99¢ leftover | `sites/itunes/index.html` | `itt03-it99` | query | `sites/wordpress/index.html` |
| N4 | WordPress leftover publish | `sites/wordpress/index.html` | `itt03-wppub` | query | `sites/linkedin/index.html` |
| N5 | LinkedIn leftover invite | `sites/linkedin/index.html` | `itt03-li-inv` | query | `sites/adsense/index.html` |
| N6 | AdSense leftover site | `sites/adsense/index.html` | `itt03-adsense` | query | `sites/bloglines/index.html` |
| N7 | Bloglines leftover subscribe | `sites/bloglines/index.html` | `itt03-bl` | query | `sites/friendster/index.html` |
| N8 | Friendster leftover (still larger) | `sites/friendster/index.html` | `itt03-ftest` | query | `sites/skype/index.html` |
| N9 | Skype leftover call theater | `sites/skype/index.html` | `itt03-skype` | checks | `sites/delicious/index.html` |
| N10 | del.icio.us leftover post | `sites/delicious/index.html` | `itt03-del` | query | `sites/4chan/index.html` |
| N11 | 4chan leftover board code | `sites/4chan/index.html` | `itt03-board` | query | `sites/hi5/index.html` |
| N12 | hi5 leftover add | `sites/hi5/index.html` | `itt03-hi5` | query | `sites/newgrounds/index.html` |
| N13 | Newgrounds leftover play theater | `sites/newgrounds/index.html` | `itt03-ng` | query | `sites/secondlife/index.html` |
| N14 | Second Life leftover | `sites/secondlife/index.html` | `itt03-sl` | checks | `sites/walmart/index.html` |
| N15 | Walmart leftover cart theater | `sites/walmart/index.html` | `itt03-wm` | query | `sites/zengarden/index.html` |
| N16 | CSS Zen Garden leftover themes | `sites/zengarden/index.html` | `itt03-zen` | hops | `sites/phoenix/index.html` |
| N17 | Phoenix leftover | `sites/phoenix/index.html` | `itt03-phoenix-ack` | checks | `sites/wikipedia/index.html` |
| N18 | Wikipedia leftover hops | `sites/wikipedia/index.html` | `itt03-wiki-hop` | hops | `sites/photobucket/index.html` |

### Phases

**03-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2003/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**03-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**03-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**03-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2003.js` (`rooms[]` or `urlMap`).

**03-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2003" --workers=1`

**03-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2003 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt03-photobucket` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2004
**Thesis (locked):** `2004-RESEARCH.md` — thefacebook campus · Gmail · Flickr · Firefox 1.0.
**Star stays:** thefacebook networks · `itt04-thefacebook-networks`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2004
  → About · bans · dual-cite
  → ★ thefacebook networks
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt04-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | thefacebook leftover two campuses | `sites/facebook/networks.html` | `itt04-fb-net` | hops | `sites/gmail/index.html` |
| N2 | Gmail leftover invite login | `sites/gmail/index.html` | `itt04-gmail-inv` | query | `sites/flickr/index.html` |
| N3 | Flickr leftover title | `sites/flickr/index.html` | `itt04-flickr` | query | `sites/firefox/index.html` |
| N4 | Firefox 1.0 leftover | `sites/firefox/index.html` | `itt04-ff-ack` | checks | `sites/digg/index.html` |
| N5 | Digg leftover submit | `sites/digg/index.html` | `itt04-digg-seed` | query | `sites/orkut/index.html` |
| N6 | Orkut leftover add | `sites/orkut/index.html` | `itt04-orkut` | query | `sites/livejournal/index.html` |
| N7 | LiveJournal leftover update | `sites/livejournal/index.html` | `itt04-lj` | query | `sites/craigslist/index.html` |
| N8 | Craigslist leftover post | `sites/craigslist/index.html` | `itt04-cl` | query | `sites/yelp/index.html` |
| N9 | Yelp leftover local | `sites/yelp/index.html` | `itt04-yelp` | query | `sites/piczo/index.html` |
| N10 | Piczo leftover layout | `sites/piczo/index.html` | `itt04-piczo` | query | `sites/tagged/index.html` |
| N11 | Tagged leftover tag | `sites/tagged/index.html` | `itt04-tagged` | query | `sites/odeo/index.html` |
| N12 | Odeo leftover subscribe | `sites/odeo/index.html` | `itt04-odeo` | query | `sites/worldofwarcraft/index.html` |
| N13 | WoW retail leftover | `sites/worldofwarcraft/index.html` | `itt04-wow` | checks | `sites/feedburner/index.html` |
| N14 | FeedBurner leftover burn | `sites/feedburner/index.html` | `itt04-fburn` | query | `sites/delicious/index.html` |
| N15 | del.icio.us leftover | `sites/delicious/index.html` | `itt04-del` | query | `sites/weather/index.html` |
| N16 | Weather.com leftover zip | `sites/weather/index.html` | `itt04-weather` | query | `sites/myspace/index.html` |
| N17 | MySpace leftover hops | `sites/myspace/index.html` | `itt04-ms` | hops | `sites/facebook/index.html` |
| N18 | thefacebook leftover wall | `sites/facebook/index.html` | `itt04-fb-wall` | query | `sites/facebook/networks.html` |

### Phases

**04-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2004/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**04-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**04-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**04-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2004.js` (`rooms[]` or `urlMap`).

**04-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2004" --workers=1`

**04-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2004 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt04-thefacebook-networks` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2005
**Thesis (locked):** `2005-RESEARCH.md` — YouTube independent · Maps · Reddit · Digg.
**Star stays:** YouTube upload · `itt05-yt-uploads`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2005
  → About · bans · dual-cite
  → ★ YouTube upload
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt05-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | YouTube leftover upload title | `sites/youtube/upload.html` | `itt05-yt-title` | query | `sites/maps/index.html` |
| N2 | Maps leftover two views | `sites/maps/index.html` | `itt05-maps-hop` | hops | `sites/reddit/index.html` |
| N3 | Reddit leftover boost | `sites/reddit/index.html` | `itt05-reddit-up` | hops | `sites/digg/index.html` |
| N4 | Digg leftover bury path | `sites/digg/index.html` | `itt05-digg-bury` | hops | `sites/housingmaps/index.html` |
| N5 | HousingMaps leftover city | `sites/housingmaps/index.html` | `itt05-hm` | query | `sites/pandora/index.html` |
| N6 | Pandora leftover seed | `sites/pandora/index.html` | `itt05-pandora-q` | query | `sites/itunes/index.html` |
| N7 | iTunes podcast leftover | `sites/itunes/index.html` | `itt05-pod` | query | `sites/dailymotion/index.html` |
| N8 | DailyMotion leftover title | `sites/dailymotion/index.html` | `itt05-dm` | query | `sites/vimeo/index.html` |
| N9 | Vimeo leftover title | `sites/vimeo/index.html` | `itt05-vimeo` | query | `sites/gaia/index.html` |
| N10 | Gaia leftover avatar | `sites/gaia/index.html` | `itt05-gaia` | query | `sites/flickr/index.html` |
| N11 | Flickr leftover (Yahoo-era) | `sites/flickr/index.html` | `itt05-flickr` | query | `sites/gmail/index.html` |
| N12 | Gmail leftover invite | `sites/gmail/index.html` | `itt05-gmail` | query | `sites/myspace/index.html` |
| N13 | MySpace leftover hops | `sites/myspace/index.html` | `itt05-ms` | hops | `sites/feedburner/index.html` |
| N14 | FeedBurner leftover | `sites/feedburner/index.html` | `itt05-fburn` | query | `sites/kayak/index.html` |
| N15 | KAYAK leftover search | `sites/kayak/index.html` | `itt05-kayak` | query | `sites/googleearth/index.html` |
| N16 | Google Earth leftover | `sites/googleearth/index.html` | `itt05-earth` | checks | `sites/utorrent/index.html` |
| N17 | µTorrent leftover scare | `sites/utorrent/index.html` | `itt05-ut` | checks | `sites/google/index.html` |
| N18 | Google leftover catalog | `sites/google/index.html` | `itt05-google-q` | query | `sites/youtube/watch.html` |

### Phases

**05-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2005/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**05-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**05-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**05-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2005.js` (`rooms[]` or `urlMap`).

**05-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2005" --workers=1`

**05-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2005 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt05-yt-uploads` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2006
**Thesis (locked):** `2006-RESEARCH.md` — Twitter · Feed · open FB. No iPhone.
**Star stays:** Twitter 140 · `itt06-tweets`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2006
  → About · bans · dual-cite
  → ★ Twitter 140
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt06-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Twitter leftover 140 | `sites/twitter/index.html` | `itt06-t140` | query | `sites/facebook/index.html` |
| N2 | Facebook Feed leftover post | `sites/facebook/index.html` | `itt06-fb-feed` | query | `sites/youtube/index.html` |
| N3 | YouTube Google-owns leftover | `sites/youtube/index.html` | `itt06-yt-ack` | checks | `sites/docs/index.html` |
| N4 | Google Docs leftover save | `sites/docs/index.html` | `itt06-docs` | query | `sites/aws/index.html` |
| N5 | AWS leftover bucket | `sites/aws/index.html` | `itt06-aws` | query | `sites/reader/index.html` |
| N6 | Google Reader leftover add | `sites/reader/index.html` | `itt06-reader` | query | `sites/digg/index.html` |
| N7 | Digg leftover front | `sites/digg/index.html` | `itt06-digg-v4` | hops | `sites/time-you/index.html` |
| N8 | Time You leftover two trails | `sites/time-you/index.html` | `itt06-timeyou` | hops | `sites/bebo/index.html` |
| N9 | Bebo leftover profile | `sites/bebo/index.html` | `itt06-bebo` | query | `sites/slideshare/index.html` |
| N10 | SlideShare leftover deck | `sites/slideshare/index.html` | `itt06-slides` | query | `sites/newsvine/index.html` |
| N11 | Newsvine leftover seed | `sites/newsvine/index.html` | `itt06-nv` | query | `sites/wikileaks/index.html` |
| N12 | WikiLeaks leftover read | `sites/wikileaks/index.html` | `itt06-wl` | checks | `sites/meebo/index.html` |
| N13 | Meebo leftover chat theater | `sites/meebo/index.html` | `itt06-meebo` | query | `sites/huffpost/index.html` |
| N14 | HuffPost leftover headline | `sites/huffpost/index.html` | `itt06-huff` | query | `sites/wikipedia/index.html` |
| N15 | Wikipedia leftover cite | `sites/wikipedia/index.html` | `itt06-wiki-cite` | query | `sites/myspace/index.html` |
| N16 | MySpace still-mass leftover | `sites/myspace/index.html` | `itt06-ms` | hops | `sites/amazon/index.html` |
| N17 | Amazon leftover cart | `sites/amazon/index.html` | `itt06-cart` | query | `sites/gmail/index.html` |
| N18 | Gmail leftover (still invite-ish) | `sites/gmail/index.html` | `itt06-gmail` | query | `sites/twitter/index.html` |

### Phases

**06-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2006/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**06-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**06-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**06-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2006.js` (`rooms[]` or `urlMap`).

**06-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2006" --workers=1`

**06-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2006 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt06-tweets` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2007
**Thesis (locked):** `2007-RESEARCH.md` — iPhone Safari no Store · open Gmail.
**Star stays:** iPhone Safari · `itt07-iphone`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2007
  → About · bans · dual-cite
  → ★ iPhone Safari
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt07-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | iPhone Safari leftover (no Store) | `sites/iphone/index.html` | `itt07-saf-ack` | checks | `sites/gmail/index.html` |
| N2 | Gmail leftover open send | `sites/gmail/index.html` | `itt07-gmail-open` | query | `sites/maps/index.html` |
| N3 | Street View leftover turn | `sites/maps/index.html` | `itt07-sv` | hops | `sites/facebook/index.html` |
| N4 | Facebook Platform leftover app | `sites/facebook/index.html` | `itt07-fb-app` | query | `sites/twitter/index.html` |
| N5 | Twitter leftover 140 | `sites/twitter/index.html` | `itt07-t-sxsw` | query | `sites/kindle/index.html` |
| N6 | Kindle leftover Whispernet | `sites/kindle/index.html` | `itt07-kindle` | checks | `sites/tumblr/index.html` |
| N7 | Tumblr leftover tumble | `sites/tumblr/index.html` | `itt07-tumble` | query | `sites/friendfeed/index.html` |
| N8 | FriendFeed leftover two sources | `sites/friendfeed/index.html` | `itt07-ff` | hops | `sites/facebook/index.html` |
| N9 | Justin.tv leftover stream name | `sites/justintv/index.html` | `itt07-jtv` | query | `sites/ustream/index.html` |
| N10 | Ustream leftover event | `sites/ustream/index.html` | `itt07-ustream` | query | `sites/qik/index.html` |
| N11 | Qik leftover clip | `sites/qik/index.html` | `itt07-qik` | query | `sites/etsy/index.html` |
| N12 | Etsy leftover listing | `sites/etsy/index.html` | `itt07-etsy` | query | `sites/netflix/index.html` |
| N13 | Netflix Watch Now leftover | `sites/netflix/index.html` | `itt07-nf-watch` | checks | `sites/hulu/index.html` |
| N14 | Hulu leftover literacy | `sites/hulu/index.html` | `itt07-hulu-ack` | checks | `sites/iphone/specs.html` |
| N15 | iPhone specs leftover | `sites/iphone/specs.html` | `itt07-iphone-specs` | checks | `sites/opensocial/index.html` |
| N16 | OpenSocial leftover | `sites/opensocial/index.html` | `itt07-os` | checks | `sites/rickroll/index.html` |
| N17 | Rickroll leftover literacy | `sites/rickroll/index.html` | `itt07-rick` | checks | `sites/kindlestore/index.html` |
| N18 | Kindle store leftover | `sites/kindlestore/index.html` | `itt07-kstore` | checks | `sites/iphone/safari.html` |

### Phases

**07-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2007/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**07-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**07-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**07-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2007.js` (`rooms[]` or `urlMap`).

**07-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2007" --workers=1`

**07-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2007 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt07-iphone` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2008
**Thesis (locked):** `2008-RESEARCH.md` — App Store · Chrome product · G1 · Hulu.
**Star stays:** App Store · `itt08-apps`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2008
  → About · bans · dual-cite
  → ★ App Store
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt08-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | App Store leftover literacy | `sites/appstore/index.html` | `itt08-store` | checks | `sites/chrome/index.html` |
| N2 | Chrome leftover download | `sites/chrome/index.html` | `itt08-chrome-dl` | checks | `sites/android/index.html` |
| N3 | Android Market leftover | `sites/android/index.html` | `itt08-g1` | checks | `sites/hulu/index.html` |
| N4 | Hulu leftover episode title | `sites/hulu/index.html` | `itt08-hulu-ep` | query | `sites/github/issue.html` |
| N5 | GitHub leftover issue title | `sites/github/issue.html` | `itt08-gh-issue` | query | `sites/dropbox/index.html` |
| N6 | Dropbox leftover folder | `sites/dropbox/index.html` | `itt08-db` | query | `sites/spotify/index.html` |
| N7 | Spotify EU leftover | `sites/spotify/index.html` | `itt08-spot-eu` | checks | `sites/stackoverflow/index.html` |
| N8 | Stack Overflow leftover ask | `sites/stackoverflow/index.html` | `itt08-so` | query | `sites/posterous/index.html` |
| N9 | Posterous leftover title | `sites/posterous/index.html` | `itt08-posterous` | query | `sites/grooveshark/index.html` |
| N10 | Grooveshark leftover song | `sites/grooveshark/index.html` | `itt08-groove` | query | `sites/airbnb/index.html` |
| N11 | Airbnb leftover listing | `sites/airbnb/index.html` | `itt08-abnb` | query | `sites/groupon/index.html` |
| N12 | Groupon leftover deal | `sites/groupon/index.html` | `itt08-groupon` | query | `sites/evernote/index.html` |
| N13 | Evernote leftover note | `sites/evernote/index.html` | `itt08-evernote` | query | `sites/friendconnect/index.html` |
| N14 | Friend Connect leftover | `sites/friendconnect/index.html` | `itt08-gfc` | checks | `sites/youtube/index.html` |
| N15 | YouTube HD leftover | `sites/youtube/index.html` | `itt08-yt-hd` | checks | `sites/facebook/index.html` |
| N16 | Facebook Connect leftover | `sites/facebook/index.html` | `itt08-fb-con` | checks | `sites/iphone/index.html` |
| N17 | iPhone 3G leftover | `sites/iphone/index.html` | `itt08-3g` | checks | `sites/dropbox/about.html` |
| N18 | Dropbox leftover about | `sites/dropbox/about.html` | `itt08-db-about` | checks | `sites/appstore/about.html` |

### Phases

**08-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2008/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**08-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**08-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**08-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2008.js` (`rooms[]` or `urlMap`).

**08-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2008" --workers=1`

**08-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2008 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt08-apps` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2009
**Thesis (locked):** `2009-RESEARCH.md` — Like · FarmVille · Bing · 3GS.
**Star stays:** Facebook Like · `itt09-fb-likes`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2009
  → About · bans · dual-cite
  → ★ Facebook Like
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt09-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Facebook Like leftover ×2 | `sites/facebook/feed.html` | `itt09-like-2x` | hops | `sites/farmville/index.html` |
| N2 | FarmVille leftover plant literacy | `sites/farmville/index.html` | `itt09-farm-2x` | checks | `sites/bing/index.html` |
| N3 | Bing leftover query | `sites/bing/index.html` | `itt09-bing-q` | query | `sites/foursquare/index.html` |
| N4 | Foursquare leftover venue | `sites/foursquare/index.html` | `itt09-4sq` | query | `sites/kickstarter/index.html` |
| N5 | Kickstarter leftover $amt theater | `sites/kickstarter/index.html` | `itt09-ks` | query | `sites/wave/index.html` |
| N6 | Wave leftover invite | `sites/wave/index.html` | `itt09-wave` | checks | `sites/stackoverflow/index.html` |
| N7 | SO leftover accept path | `sites/stackoverflow/index.html` | `itt09-so-acc` | hops | `sites/windows7/index.html` |
| N8 | Win7 / IE8 leftover | `sites/windows7/index.html` | `itt09-win7` | checks | `sites/omegle/index.html` |
| N9 | Omegle leftover first line (text) | `sites/omegle/index.html` | `itt09-omegle` | query | `sites/chatroulette/index.html` |
| N10 | Chatroulette leftover no-cam | `sites/chatroulette/index.html` | `itt09-cr` | checks | `sites/mafiawars/index.html` |
| N11 | Mafia Wars leftover job | `sites/mafiawars/index.html` | `itt09-mw` | query | `sites/wolframalpha/index.html` |
| N12 | Wolfram leftover query | `sites/wolframalpha/index.html` | `itt09-wa` | query | `sites/whatsapp/index.html` |
| N13 | WhatsApp leftover literacy | `sites/whatsapp/index.html` | `itt09-wa-ack` | checks | `sites/ubercab/index.html` |
| N14 | UberCab SF leftover | `sites/ubercab/index.html` | `itt09-uber-sf` | checks | `sites/twitter/index.html` |
| N15 | Twitter leftover 140 | `sites/twitter/index.html` | `itt09-t140` | query | `sites/youtube/index.html` |
| N16 | YouTube leftover | `sites/youtube/index.html` | `itt09-yt` | checks | `sites/ie8/index.html` |
| N17 | IE8 leftover | `sites/ie8/index.html` | `itt09-ie8` | checks | `sites/chrome/index.html` |
| N18 | Chrome leftover (product room) | `sites/chrome/index.html` | `itt09-chrome` | checks | `sites/facebook/index.html` |

### Phases

**09-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2009/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**09-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**09-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**09-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2009.js` (`rooms[]` or `urlMap`).

**09-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2009" --workers=1`

**09-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2009 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt09-fb-likes` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2010
**Thesis (locked):** `2010-READ-FIRST.md` — IG iOS · iPad · Open Graph. Lean.
**Star stays:** Instagram iOS · `itt10-ig`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2010
  → About · bans · dual-cite
  → ★ Instagram iOS
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt10-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Instagram leftover caption path | `sites/instagram/index.html` | `itt10-ig-cap` | query | `sites/ipad/order.html` |
| N2 | iPad leftover $499 literacy | `sites/ipad/order.html` | `itt10-ipad-ord` | checks | `sites/iphone/index.html` |
| N3 | iPhone 4 leftover FaceTime/Antenna | `sites/iphone/index.html` | `itt10-iphone4` | checks | `sites/facebook/cnn.html` |
| N4 | Open Graph leftover Like CNN | `sites/facebook/cnn.html` | `itt10-og1` | checks | `sites/facebook/imdb.html` |
| N5 | Open Graph leftover Like IMDb | `sites/facebook/imdb.html` | `itt10-og2` | checks | `sites/farmville/index.html` |
| N6 | FarmVille peak leftover | `sites/farmville/index.html` | `itt10-farm-peak` | checks | `sites/foursquare/index.html` |
| N7 | Foursquare leftover check-in | `sites/foursquare/index.html` | `itt10-4sq` | query | `sites/imgur/index.html` |
| N8 | Imgur leftover title | `sites/imgur/index.html` | `itt10-imgur` | query | `sites/pinterest/index.html` |
| N9 | Pinterest leftover two pins | `sites/pinterest/index.html` | `itt10-pin` | hops | `sites/twitter/index.html` |
| N10 | Twitter leftover 140 lurk OK | `sites/twitter/index.html` | `itt10-t140` | query | `sites/youtube/index.html` |
| N11 | YouTube leftover | `sites/youtube/index.html` | `itt10-yt` | checks | `sites/digg/index.html` |
| N12 | Digg v4 leftover | `sites/digg/index.html` | `itt10-digg-v4` | checks | `sites/groupon/index.html` |
| N13 | Groupon leftover deal | `sites/groupon/index.html` | `itt10-groupon` | query | `sites/quora/index.html` |
| N14 | Quora leftover ask | `sites/quora/index.html` | `itt10-quora` | query | `sites/uber/index.html` |
| N15 | UberCab SF leftover | `sites/uber/index.html` | `itt10-uber-sf` | checks | `sites/wave/index.html` |
| N16 | Wave funeral leftover | `sites/wave/index.html` | `itt10-wave-fun` | checks | `sites/browserchoice/index.html` |
| N17 | Browser Ballot leftover pick | `sites/browserchoice/index.html` | `itt10-ballot` | hops | `sites/wikileaks/index.html` |
| N18 | Cablegate leftover one-cable | `sites/wikileaks/index.html` | `itt10-wl` | checks | `sites/instagram/index.html` |

### Phases

**10-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2010/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**10-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**10-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**10-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2010.js` (`rooms[]` or `urlMap`).

**10-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2010" --workers=1`

**10-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2010 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt10-ig` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2011
**Thesis (locked):** `2011-READ-FIRST.md` — G+ · Spotify US · Siri. Lean.
**Star stays:** Google+ Hangouts · `itt11-gplus-hangout`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2011
  → About · bans · dual-cite
  → ★ Google+ Hangouts
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt11-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | G+ Hangouts leftover literacy | `sites/googleplus/hangouts.html` | `itt11-hang` | checks | `sites/googleplus/index.html` |
| N2 | G+ leftover circle name | `sites/googleplus/index.html` | `itt11-circles` | query | `sites/spotify/index.html` |
| N3 | Spotify US leftover invite | `sites/spotify/index.html` | `itt11-spot-us` | checks | `sites/iphone/index.html` |
| N4 | Siri leftover type/chip | `sites/iphone/index.html` | `itt11-siri` | query | `sites/facebook/index.html` |
| N5 | Timeline leftover two boxes | `sites/facebook/index.html` | `itt11-timeline` | checks | `sites/ipad/index.html` |
| N6 | iPad 2 leftover cameras | `sites/ipad/index.html` | `itt11-ipad2` | checks | `sites/netflix/index.html` |
| N7 | Qwikster leftover reversed-split | `sites/netflix/index.html` | `itt11-qwik` | checks | `sites/snapchat/index.html` |
| N8 | Snapchat leftover not-Stories | `sites/snapchat/index.html` | `itt11-snap` | checks | `sites/instagram/index.html` |
| N9 | Instagram iOS leftover | `sites/instagram/index.html` | `itt11-ig` | checks | `sites/tumblr/index.html` |
| N10 | Tumblr leftover reblog | `sites/tumblr/index.html` | `itt11-reblog` | checks | `sites/airbnb/index.html` |
| N11 | Airbnb leftover pick | `sites/airbnb/index.html` | `itt11-air` | query | `sites/twitter/index.html` |
| N12 | Twitter leftover 140 | `sites/twitter/index.html` | `itt11-t140` | query | `sites/youtube/index.html` |
| N13 | YouTube leftover | `sites/youtube/index.html` | `itt11-yt` | checks | `sites/icloud/index.html` |
| N14 | iCloud leftover | `sites/icloud/index.html` | `itt11-icloud` | checks | `sites/ie9/index.html` |
| N15 | IE9 leftover | `sites/ie9/index.html` | `itt11-ie9` | checks | `sites/linkedin/index.html` |
| N16 | LinkedIn leftover | `sites/linkedin/index.html` | `itt11-li` | query | `sites/pinterest/index.html` |
| N17 | Pinterest leftover two pins | `sites/pinterest/index.html` | `itt11-pin` | hops | `sites/snapghost/index.html` |
| N18 | Snap leftover ghost | `sites/snapghost/index.html` | `itt11-ghost` | checks | `sites/googleplus/hangouts.html` |

### Phases

**11-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2011/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**11-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**11-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**11-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2011.js` (`rooms[]` or `urlMap`).

**11-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2011" --workers=1`

**11-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2011 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt11-gplus-hangout` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2012
**Thesis (locked):** `2012-READ-FIRST.md` — IG Android · IPO · SOPA. Lean.
**Star stays:** Instagram Android · `itt12-ig-android`.
**Band:** A · deepen more.html (original 18 4× already shipped).

### Goal
Visitor can finish the original 18 leftover sessions **and** 8 second dests (`more.html`) without a new folder. Next on `more.html` lands on the star.

**Visitor outcome**

```
Hub → 2012
  → About · bans · dual-cite
  → ★ Instagram Android
  → 8 2× leftover dests (incomplete never writes)
  → Exit · itt12-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Medium leftover post | `sites/medium/more.html` | `itt12-medium-more` | query | `sites/instagram/android.html` |
| N2 | Path leftover | `sites/path/more.html` | `itt12-path-more` | query | `sites/instagram/android.html` |
| N3 | Flipboard leftover | `sites/flipboard/more.html` | `itt12-flip-more` | query | `sites/instagram/android.html` |
| N4 | Tinder leftover swipe | `sites/tinder/more.html` | `itt12-tinder-more` | query | `sites/instagram/android.html` |
| N5 | Waze leftover route | `sites/waze/more.html` | `itt12-waze-more` | query | `sites/instagram/android.html` |
| N6 | Trello leftover card | `sites/trello/more.html` | `itt12-trello-more` | query | `sites/instagram/android.html` |
| N7 | BuzzFeed leftover list | `sites/buzzfeed/more.html` | `itt12-buzz-more` | query | `sites/instagram/android.html` |
| N8 | Lyft leftover | `sites/lyft/more.html` | `itt12-lyft-more` | query | `sites/instagram/android.html` |

### Phases

**12-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2012/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**12-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**12-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**12-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2012.js` (`rooms[]` or `urlMap`).

**12-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2012" --workers=1`

**12-P5 · Done when**  
8 keys can write · dests 200 · 0 dest-field · existing 2012 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt12-ig-android` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2015
**Thesis (locked):** `2015-READ-FIRST.md` — Periscope · Photos · Win10. Lean.
**Star stays:** Periscope Go LIVE · `itt15-periscope`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2015
  → About · bans · dual-cite
  → ★ Periscope Go LIVE
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt15-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Periscope leftover titled Go LIVE | `sites/periscope/index.html` | `itt15-peri-title` | query | `sites/googlephotos/index.html` |
| N2 | Google Photos leftover backup | `sites/googlephotos/index.html` | `itt15-gp` | checks | `sites/windows10/index.html` |
| N3 | Win10 leftover reserve | `sites/windows10/index.html` | `itt15-win10` | checks | `sites/applemusic/index.html` |
| N4 | Apple Music leftover trial honesty | `sites/applemusic/index.html` | `itt15-am` | checks | `sites/edge/index.html` |
| N5 | Edge Spartan leftover (not Chromium) | `sites/edge/index.html` | `itt15-edge` | checks | `sites/letsencrypt/index.html` |
| N6 | Let's Encrypt leftover domain | `sites/letsencrypt/index.html` | `itt15-le` | query | `sites/ios9/index.html` |
| N7 | iOS9 leftover content blockers | `sites/ios9/blockers.html` | `itt15-block` | checks | `sites/snapchat/discover.html` |
| N8 | Snap Discover leftover tiles | `sites/snapchat/discover.html` | `itt15-discover` | hops | `sites/discord/index.html` |
| N9 | Discord leftover join | `sites/discord/index.html` | `itt15-dc` | query | `sites/echo/index.html` |
| N10 | Echo leftover order literacy | `sites/echo/index.html` | `itt15-echo` | checks | `sites/apple/index.html` |
| N11 | Watch leftover (not the chip) | `sites/apple/watch.html` | `itt15-watch` | checks | `sites/meerkat/index.html` |
| N12 | Meerkat leftover stream | `sites/meerkat/index.html` | `itt15-meerkat` | query | `sites/fblive/index.html` |
| N13 | FB Live leftover celebs-only | `sites/fblive/index.html` | `itt15-fblive` | checks | `sites/spotify/index.html` |
| N14 | Spotify leftover | `sites/spotify/index.html` | `itt15-spot` | checks | `sites/netflix/index.html` |
| N15 | Netflix leftover | `sites/netflix/index.html` | `itt15-nf` | checks | `sites/instagram/index.html` |
| N16 | Instagram leftover (no Stories) | `sites/instagram/index.html` | `itt15-ig` | checks | `sites/win10get/index.html` |
| N17 | Get Windows 10 leftover | `sites/win10get/index.html` | `itt15-gw10` | checks | `sites/meerkatlive/index.html` |
| N18 | Meerkat live leftover | `sites/meerkatlive/index.html` | `itt15-meerkat-live` | query | `sites/periscope/watch.html` |

### Phases

**15-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2015/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**15-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**15-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**15-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2015.js` (`rooms[]` or `urlMap`).

**15-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2015" --workers=1`

**15-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2015 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt15-periscope` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2016
**Thesis (locked):** `2016-READ-FIRST.md` — Stories · leftover GO. Lean.
**Star stays:** Instagram Stories · `itt16-ig-stories`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2016
  → About · bans · dual-cite
  → ★ Instagram Stories
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt16-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Stories leftover add (empty blocked) | `sites/instagram/stories.html` | `itt16-story` | query | `sites/pokemongo/index.html` |
| N2 | Pokémon GO leftover team | `sites/pokemongo/index.html` | `itt16-pogo` | checks | `sites/facebook/index.html` |
| N3 | Reactions leftover two faces | `sites/facebook/reactions.html` | `itt16-react` | hops | `sites/whatsapp/e2e.html` |
| N4 | WhatsApp E2E leftover | `sites/whatsapp/e2e.html` | `itt16-wa-e2e` | checks | `sites/iphone/index.html` |
| N5 | iPhone 7 leftover no-jack | `sites/iphone/index.html` | `itt16-iphone7` | checks | `sites/vine/index.html` |
| N6 | Vine leftover dying | `sites/vine/goodbye.html` | `itt16-vine-end` | checks | `sites/snapchat/spectacles.html` |
| N7 | Spectacles leftover | `sites/snapchat/spectacles.html` | `itt16-specs` | checks | `sites/musically/index.html` |
| N8 | Musical.ly leftover (not TikTok) | `sites/musically/index.html` | `itt16-mly` | checks | `sites/windows10/index.html` |
| N9 | Win10 free-upgrade ended leftover | `sites/windows10/end.html` | `itt16-win10-end` | checks | `sites/dyn/index.html` |
| N10 | Dyn/Mirai leftover literacy (no exploit) | `sites/dyn/index.html` | `itt16-dyn` | checks | `sites/slack/index.html` |
| N11 | Slack leftover channel | `sites/slack/index.html` | `itt16-slack` | query | `sites/reddit/index.html` |
| N12 | Reddit leftover two votes | `sites/reddit/index.html` | `itt16-reddit` | hops | `sites/netflix/index.html` |
| N13 | Netflix leftover | `sites/netflix/index.html` | `itt16-nf` | checks | `sites/youtube/index.html` |
| N14 | YouTube leftover | `sites/youtube/index.html` | `itt16-yt` | checks | `sites/fblive/index.html` |
| N15 | FB Live leftover everyone | `sites/fblive/index.html` | `itt16-fblive` | checks | `sites/moments/index.html` |
| N16 | Moments leftover | `sites/moments/index.html` | `itt16-moments` | checks | `sites/iphone/airpods.html` |
| N17 | AirPods leftover | `sites/iphone/airpods.html` | `itt16-airpods` | checks | `sites/playable/game.html` |
| N18 | Gym Rush leftover literacy | `sites/playable/game.html` | `itt16-gym` | checks | `sites/instagram/archive.html` |

### Phases

**16-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2016/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**16-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**16-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**16-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2016.js` (`rooms[]` or `urlMap`).

**16-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2016" --workers=1`

**16-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2016 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt16-ig-stories` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2017
**Thesis (locked):** `2017-READ-FIRST.md` — Face ID · 280. Lean.
**Star stays:** Face ID · `itt17-faceid`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2017
  → About · bans · dual-cite
  → ★ Face ID
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt17-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Face ID leftover two boxes | `sites/iphone/x.html` | `itt17-faceid-2x` | checks | `sites/iphone/animoji.html` |
| N2 | Animoji leftover (needs Face ID gold) | `sites/iphone/animoji.html` | `itt17-animoji` | checks | `sites/fortnite/index.html` |
| N3 | Fortnite leftover drop | `sites/fortnite/index.html` | `itt17-fn` | query | `sites/twitter/280.html` |
| N4 | Twitter leftover must exceed 140 | `sites/twitter/280.html` | `itt17-t280` | query | `sites/teams/index.html` |
| N5 | Teams leftover create | `sites/teams/index.html` | `itt17-teams` | query | `sites/vine/index.html` |
| N6 | Vine leftover actually gone | `sites/vine/gone.html` | `itt17-vine-gone` | checks | `sites/switch/index.html` |
| N7 | Switch leftover buy | `sites/switch/index.html` | `itt17-switch` | checks | `sites/wannacry/index.html` |
| N8 | WannaCry leftover literacy (no payload) | `sites/wannacry/index.html` | `itt17-wc` | checks | `sites/equifax/index.html` |
| N9 | Equifax leftover freeze literacy | `sites/equifax/index.html` | `itt17-eq` | checks | `sites/musically/index.html` |
| N10 | Musical.ly leftover | `sites/musically/index.html` | `itt17-mly` | checks | `sites/echoshow/index.html` |
| N11 | Echo Show leftover | `sites/echoshow/index.html` | `itt17-show` | checks | `sites/snapipo/index.html` |
| N12 | Snap IPO leftover | `sites/snapipo/index.html` | `itt17-snapipo` | checks | `sites/reddit/index.html` |
| N13 | Reddit leftover two | `sites/reddit/index.html` | `itt17-reddit` | hops | `sites/youtube/index.html` |
| N14 | YouTube leftover | `sites/youtube/index.html` | `itt17-yt` | checks | `sites/amazon/index.html` |
| N15 | Amazon leftover | `sites/amazon/index.html` | `itt17-amzn` | query | `sites/bitcoinath/index.html` |
| N16 | Bitcoin ATH leftover literacy | `sites/bitcoinath/index.html` | `itt17-btc` | checks | `sites/playable/game.html` |
| N17 | Storm Circle leftover literacy | `sites/playable/game.html` | `itt17-storm` | checks | `sites/playable/famous.html` |
| N18 | Famous leftover 2017 | `sites/playable/famous.html` | `itt17-famous` | checks | `sites/iphone/x.html` |

### Phases

**17-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2017/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**17-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**17-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**17-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2017.js` (`rooms[]` or `urlMap`).

**17-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2017" --workers=1`

**17-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2017 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt17-faceid` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---
# 2018
**Thesis (locked):** `2018-READ-FIRST.md` — GDPR Manage. Accept All never writes.
**Star stays:** GDPR Manage · `itt18-gdpr`.
**Band:** B/C · 18 leftover writers on rooms that existed.

### Goal
Visitor can finish **18 leftover REAL sessions** on rooms that already existed. Star / guided 6 / official 10 stay locked.

**Visitor outcome**

```
Hub → 2018
  → About · bans · dual-cite
  → ★ GDPR Manage
  → 18 2× leftover dests (incomplete never writes)
  → Exit · itt18-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Map lists every leftover key | 7 |

### Flows on disk

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | GDPR Manage leftover two ticks | `sites/gdpr/manage.html` | `itt18-gdpr-2x` | checks | `sites/tiktok/fyp.html` |
| N2 | TikTok leftover two FYP taps | `sites/tiktok/fyp.html` | `itt18-fyp` | hops | `sites/trust/index.html` |
| N3 | Hearing leftover sit | `sites/trust/index.html` | `itt18-hear` | checks | `sites/instagram/igtv.html` |
| N4 | IGTV leftover post (not Reels) | `sites/instagram/igtv.html` | `itt18-igtv` | query | `sites/chrome/not-secure.html` |
| N5 | Chrome 68 leftover Not Secure | `sites/chrome/not-secure.html` | `itt18-ns` | checks | `sites/homepod/index.html` |
| N6 | HomePod leftover reserve | `sites/homepod/index.html` | `itt18-hp` | checks | `sites/spectre/index.html` |
| N7 | Spectre leftover literacy | `sites/spectre/index.html` | `itt18-sp` | checks | `sites/fortnite/switch.html` |
| N8 | Fortnite Switch leftover drop | `sites/fortnite/switch.html` | `itt18-fn-sw` | query | `sites/github/microsoft.html` |
| N9 | Microsoft♥GitHub leftover | `sites/github/microsoft.html` | `itt18-gh-ms` | checks | `sites/discord/index.html` |
| N10 | Discord leftover | `sites/discord/index.html` | `itt18-dc` | query | `sites/reddit/index.html` |
| N11 | Reddit leftover two | `sites/reddit/index.html` | `itt18-reddit` | hops | `sites/youtube/index.html` |
| N12 | YouTube leftover | `sites/youtube/index.html` | `itt18-yt` | checks | `sites/wikipedia/index.html` |
| N13 | Wikipedia leftover | `sites/wikipedia/index.html` | `itt18-wiki` | query | `sites/applemusic/index.html` |
| N14 | Apple Music leftover | `sites/applemusic/index.html` | `itt18-am` | checks | `sites/gdpr/index.html` |
| N15 | GDPR leftover door (Accept All never here) | `sites/gdpr/index.html` | `itt18-gdpr-door` | checks | `sites/playable/game.html` |
| N16 | Consent Dash leftover (Manage wins) | `sites/playable/game.html` | `itt18-consent` | checks | `sites/fortnite/creative.html` |
| N17 | Fortnite Creative leftover | `sites/fortnite/creative.html` | `itt18-fn-cr` | query | `sites/playable/famous.html` |
| N18 | Famous leftover 2018 | `sites/playable/famous.html` | `itt18-famous` | checks | `sites/gdpr/manage.html` |

### Phases

**18-P0 · Read first · 20 min · `[x]`**  
Open RESEARCH / READ-FIRST · this table. Confirm slugs exist (`ls years/2018/sites`). Do not create folders (Band B/C) except `more.html` (Band A).

**18-P1 · Inject leftover writers · `[x]`**  
`python3 scripts/build-2x-links.py` · marked `ITT-4X:suffix` panels · engine `year-4x-flows.js` (CORE).

**18-P2 · Home + map · `[x]`**  
`pages/home.html` 2× trail · `pages/map.html` leftover list · guided `<ol>` still 6.

**18-P3 · urlMap · `[x]`**  
New `more.html` pages added to `js/config/2018.js` (`rooms[]` or `urlMap`).

**18-P4 · e2e · `[x]` spec**  
`npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2018" --workers=1`

**18-P5 · Done when**  
18 keys can write · dests 200 · 0 dest-field · existing 2018 specs green · no neighbor prefix leak.

**Hard bans:** do not move `itt18-gdpr` · no Wikipedia-name rooms · no Accept All write · no invented logos.

---

## Definition of done (all years)

- [x] 2001–2011 and 2015–2018 each have **18** `data-4x-go` leftover writers  
- [x] 1994–2000 and 2012 have original 4× **plus** `more.html` second dests  
- [x] Guided home `<ol>` still 6 on every year  
- [x] Stars unchanged  
- [x] `check-all-years.py` 23/23 pass  
- [x] `audit-mock-flows.js` OK (no dest-field / weak-REAL / hash-CTA)  
- [x] `audit-all-year-flows.js` — every **on-disk** star is **REAL**; official 10-stop **PLAQUE = 0**; leftover 5× checkbox plaques **stripped** (typed leftover verb remains)  
- [x] 2× leftover writers are **query or hops** (literacy-only `checks` converted)  
- [x] `e2e/2x-links-all-years.spec.js` + matrix on disk  
- [ ] Full `npm run test:e2e:2x` green on the machine that runs Playwright (run when you name it)  
- 2013–2014 official dests **MISSING** on purpose (years wiped)

**Re-open a year:** edit `scripts/build-2x-links.py` · re-run · existing markers replace in place.
