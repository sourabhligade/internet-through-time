# 2× leftover REAL dests — implementation phases · minute steps (next pass · every ship year)

**Date:** 2026-08-26  
**Status:** **Implemented 2026-08-26** Band A + Band B + Band C leftover dests + remaining no-4× dests on every ship year. Injector `scripts/implement-2x-remaining-real.py`. Ship matrix **1294**. dest-field **0**.  
**Pattern copied from:** [`2X-LINKS-EVERY-YEAR-IMPLEMENTATION-PHASES-MINUTE-2026-08-20.md`](2X-LINKS-EVERY-YEAR-IMPLEMENTATION-PHASES-MINUTE-2026-08-20.md) · [`1994-1997-4X-FLOWS-GOALS-PHASES-STEPS.md`](1994-1997-4X-FLOWS-GOALS-PHASES-STEPS.md).  
**Research freeze (sources · N-tables · Hosting.com):** [`2X-LINKS-EVERY-YEAR-NEXT-PASS-RESEARCH-GOALS-PHASES-MINUTE-2026-08-26.md`](2X-LINKS-EVERY-YEAR-NEXT-PASS-RESEARCH-GOALS-PHASES-MINUTE-2026-08-26.md).  
**Engine:** [`js/immersion/year-4x-flows.js`](../js/immersion/year-4x-flows.js).  
**Injector:** [`scripts/implement-2x-next-18-to-36.py`](../scripts/implement-2x-next-18-to-36.py) (idempotent · `<!-- ITT-4X:suffix:start -->`).  
**Git only if asked.**

**What 2× means here:** double the number of leftover REAL dests a visitor can finish. **Not** 2× raw hrefs on Starting Point. Guided `<ol>` stays **exactly 6**. Stars do not move. Incomplete never writes. Prefix `ittYY-*` only. Payload `{real:true, multiStep:true, year, kind}`.

| Companion | Role |
|-----------|------|
| This file | Implement-from-this · goals · phases · minute steps · every ship year |
| [`2X-LINKS-EVERY-YEAR-NEXT-PASS-RESEARCH-GOALS-PHASES-MINUTE-2026-08-26.md`](2X-LINKS-EVERY-YEAR-NEXT-PASS-RESEARCH-GOALS-PHASES-MINUTE-2026-08-26.md) | Research freeze · harvest honesty · Hosting.com |
| [`2X-LINKS-EVERY-YEAR-IMPLEMENTATION-PHASES-MINUTE-2026-08-20.md`](2X-LINKS-EVERY-YEAR-IMPLEMENTATION-PHASES-MINUTE-2026-08-20.md) | First 2× implement bible (already shipped) |
| [`2X-LINKS-EVERY-YEAR-RESEARCH-GOALS-PHASES-MINUTE-2026-08-20.md`](2X-LINKS-EVERY-YEAR-RESEARCH-GOALS-PHASES-MINUTE-2026-08-20.md) | Original 2× **law** |
| `e2e/2x-links.matrix.json` · `e2e/2x-links-all-years.spec.js` | Incomplete → REAL · dest 200 · no neighbor leak |
| `scripts/audit-mock-flows.js` | dest-field / weak-real / hash-cta fail |

---

## Shared laws (every phase, every year)

1. Incomplete REAL **never writes** `localStorage`.  
2. Prefix **`ittYY-*` only**. Isolation vs neighbor year.  
3. **Never invent brand pixels.** WA / WDM / Version Museum, or **failed-final**.  
4. Do **not** add a 7th guided home step.  
5. Do **not** grow a dest-field forest. Prefer a second path on a live room.  
6. Do **not** restore **2005–2007**. Do not `git checkout` those trees.  
7. Do **not** copy 2026 Wikipedia ranks (ChatGPT / Temu / Gemini app) into earlier years.  
8. ILS June websites table **ends 2018**. Use Netcraft January cells.  
9. Suffix **must not** collide with the year gold. This pass uses `-lx`.  
10. After each year: existing `e2e/YYYY-*.spec.js` stay green + `e2e/2x-links-all-years.spec.js --grep "2× leftover YYYY"`.  
11. Re-run injector is idempotent (`<!-- ITT-4X:suffix:start -->` markers).  
12. Implement **one year** at a time if you re-open. Default if you name a year now: **2013** (lean hole vs 36).

```bash
python3 scripts/implement-2x-next-18-to-36.py
python3 -m http.server 8080 --bind 127.0.0.1
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover YYYY" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1
python3 scripts/check-all-years.py
node scripts/audit-mock-flows.js
```

### Shared phase S0 — freeze (do once) · `[x]` 2026-08-26

1. Confirm ship years: **28** = 1994–2024 minus `{2005,2006,2007}`. `scripts/itt_gate.py` `SHIP_YEARS`.  
2. Count matrix before this pass: ship **594** · dest-field **0**.  
3. Lock 2× this pass = leftover REAL writers, not raw hrefs.  
4. Lock bands: A 1994–2000 · B 2001–2004 / 2008–2014 / 2022 · C 2015–2021 / 2023–2024 · wiped skip.  
5. Lock stars (table in each year section).  
6. Stop. Name a year only if you re-open.

### Shared phase S1 — trail kit · `[x]`

Every new writer: act → `ittYY-<suffix>-lx` → hidden `data-next-flow` → next room. Isolation test. Incomplete blocked. Kinds: `query` · `checks` · `hops` · `wait` · `toggle`.

Minute steps for **one** leftover writer (copy for every N-row):

1. `ls` the dest file. Confirm it exists. Do not `mkdir` unless the research table says new folder.  
2. Confirm the page already loads `js/immersion-YYYY.js` (or the year stub).  
3. Inject `<!-- ITT-4X:SUFFIX:start -->` … `data-4x-panel` · `data-4x-kind` · `data-4x-go="SUFFIX"` … `<!-- ITT-4X:SUFFIX:end -->` **before** the immersion `<script>`.  
4. `query`: `[data-4x-field]` · empty / < 2 chars never writes.  
5. `checks`: every `[data-4x-req]` must tick.  
6. `hops`: click ≥ `data-4x-min` (2) `[data-4x-hop]` first.  
7. `wait`: click `[data-4x-wait]` and wait the timer. Skip never writes.  
8. Hidden Next: `data-next-flow` · `data-next-when-key="ittYY-SUFFIX"` · href is a **live dest this year**.  
9. Add the row to `e2e/2x-links.matrix.json`.  
10. Manual: empty Go → no key · complete → `{real, multiStep, year, kind}` · neighbor `itt` prefix empty.

### Shared phase S2 — home + map · `[x]` Band A+B

`pages/home.html` gets `<!-- ITT-2X-NEXT:YYYY -->` (below guided 6 and the older `ITT-2X-TRAILS` strip). Star chip unchanged. Guided `<ol>` still 6.

Minute steps:

1. Open `years/YYYY/pages/home.html`. Count `<li>` inside `#ott-guided-YYYY`. Must be **6**.  
2. Confirm `[data-ott-one-thing]` still points at the star.  
3. Inject or replace `<!-- ITT-2X-NEXT:YYYY:start -->` list: every this-pass leftover then ★.  
4. Do not put the new list inside the guided `<ol>`.  
5. Optional: `pages/map.html` leftover list. Map is not the gold.

### Shared phase S3 — e2e + gates · `[x]` specs already on disk

`e2e/2x-links-all-years.spec.js` reads the matrix. Empty click writes nothing. Complete writes `{real, multiStep, year, kind}`. Next dest HTTP 200. No neighbor `ittYY`.

Minute steps:

1. `npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover YYYY" --workers=1`  
2. `npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1` — star unmoved.  
3. `node scripts/audit-mock-flows.js` — dest-field / weak-real / hash-cta = 0.  
4. `python3 scripts/check-all-years.py` — urlMap / hub / registry still green.  
5. Full pack is ~960 tests. Do **not** run the whole file in CI. Per-year grep only.

### Shared phase S4 — scoreboard after this pass · `[x]`

| Band | Years | Matrix before | Matrix after 2026-08-26 | dest-field |
|------|-------|--------------:|------------------------:|-----------:|
| A | 1994–2000 | 6–10 | **23–28** | 0 |
| B forest | 2001–2004 · 2008 | 18 | **36** | 0 |
| B lean second-path | 2009–2011 | 18 | **35–36** | 0 |
| B lean leftover | 2012 · 2013 · 2014 · 2022 | 18 | **35 / 27 / 30 / 33** | 0 |
| C leftover about-rooms | 2015–2021 · 2023–2024 | 36 | **41–48** | 0 |
| Remaining dests (no 4×) | 1998–2004 · 2008 · 2010 · 2012–2013 · 2022 | — | every leftover dest now writes | 0 |
| Wiped | 2005–2007 | 18 orphan | skip | — |

Ship matrix **594 → 909 → 1294**. dest-field **0**. Guided still 6. Gold dests (`csotd` · `portals` · `pointcast`) stay plaque-free. Smoke `[x]`: `itt94-yh-lx` · `itt01-aol-lx` · `itt09-bing2-lx` · `itt22-wd-lx` · `itt98-apple-rlx` · `itt08-adsense-rlx` · `itt15-adblock-rlx` · `itt18-cambridge-rlx` · `itt23-bardabout-rlx` · `itt24-bard-rlx`.

---

# 1994
**Thesis (locked):** [`1994-RESEARCH.md`](1994-RESEARCH.md) — directories beat search. NN1 · Win 3.1 · 14.4.  
**Star stays:** Cool Site of the Day · `itt94-csotd`.  
**Band:** A · +18 leftover 4× on mass rooms that had zero.  
**Matrix on disk:** **28** writers (10 prior pack + 18 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 1994
  → About · bans · dual-cite
  → ★ Cool Site of the Day
  → 28 leftover REAL dests (incomplete never writes)
  → Exit · itt94-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt94-pizza-more` | query | `sites/pizzahut/more.html` | `sites/csotd/index.html` |
| P2 | `itt94-netmarket-more` | query | `sites/netmarket/more.html` | `sites/csotd/index.html` |
| P3 | `itt94-imdb-more` | query | `sites/imdb/more.html` | `sites/csotd/index.html` |
| P4 | `itt94-galaxy-more` | query | `sites/galaxy/more.html` | `sites/csotd/index.html` |
| P5 | `itt94-gnn-more` | query | `sites/gnn/more.html` | `sites/csotd/index.html` |
| P6 | `itt94-jump-more` | query | `sites/jumpstation/more.html` | `sites/csotd/index.html` |
| P7 | `itt94-prodigy-more` | query | `sites/prodigy/more.html` | `sites/csotd/index.html` |
| P8 | `itt94-pathfinder-more` | query | `sites/pathfinder/more.html` | `sites/csotd/index.html` |
| P9 | `itt94-infoseek-more` | query | `sites/infoseek/more.html` | `sites/csotd/index.html` |
| P10 | `itt94-cis-more` | query | `sites/compuserve/more.html` | `sites/csotd/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Yahoo leftover 2× | `sites/yahoo/index.html` | `itt94-yh-lx` | hops | `sites/whitehouse/index.html` |
| N2 | White House leftover 2× | `sites/whitehouse/index.html` | `itt94-wh-lx` | query | `sites/fishcam/index.html` |
| N3 | FishCam leftover 2× | `sites/fishcam/index.html` | `itt94-fish-lx` | wait | `sites/exploratorium/index.html` |
| N4 | Exploratorium leftover 2× | `sites/exploratorium/index.html` | `itt94-exp-lx` | query | `sites/weblouvre/index.html` |
| N5 | WebLouvre leftover 2× | `sites/weblouvre/index.html` | `itt94-louvre-lx` | query | `sites/bbs/index.html` |
| N6 | BBS leftover 2× | `sites/bbs/index.html` | `itt94-bbs-lx` | query | `sites/mcom/index.html` |
| N7 | Netscape leftover 2× | `sites/mcom/index.html` | `itt94-mcom-lx` | checks | `sites/goodtimes/index.html` |
| N8 | Good Times leftover 2× | `sites/goodtimes/index.html` | `itt94-gt-lx` | checks | `sites/cern/index.html` |
| N9 | CERN leftover 2× | `sites/cern/index.html` | `itt94-cern-lx` | query | `sites/nasa/index.html` |
| N10 | NASA leftover 2× | `sites/nasa/index.html` | `itt94-nasa-lx` | query | `sites/ncsa/index.html` |
| N11 | NCSA leftover 2× | `sites/ncsa/index.html` | `itt94-ncsa-lx` | query | `sites/lycos/index.html` |
| N12 | Lycos leftover 2× | `sites/lycos/index.html` | `itt94-ly-lx` | query | `sites/webcrawler/index.html` |
| N13 | WebCrawler leftover 2× | `sites/webcrawler/index.html` | `itt94-wc-lx` | query | `sites/hotwired/index.html` |
| N14 | HotWired leftover 2× | `sites/hotwired/index.html` | `itt94-hw-lx` | query | `sites/iuma/index.html` |
| N15 | IUMA leftover 2× | `sites/iuma/index.html` | `itt94-iuma-lx` | query | `sites/compuserve/index.html` |
| N16 | CompuServe leftover 2× pack | `sites/compuserve/index.html` | `itt94-cis-lx` | query | `sites/prodigy/index.html` |
| N17 | Prodigy leftover 2× pack | `sites/prodigy/index.html` | `itt94-prod-lx` | query | `sites/infoseek/index.html` |
| N18 | Infoseek leftover 2× pack | `sites/infoseek/index.html` | `itt94-is-lx` | query | `sites/csotd/index.html` |

### Phases

**94-P0 · Read first · 20 min · [x]**  
Open `1994-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/1994/sites`). Do not create folders. Do not move `itt94-csotd`.

**94-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 18 `-lx` writers on disk.

**94-P2 · Home strip · [x]**  
`years/1994/pages/home.html` · `<!-- ITT-2X-NEXT:1994 -->` below guided 6 · star chip `itt94-csotd` unmoved · guided `<ol>` still 6.

**94-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/1994.js`.

**94-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1994" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 1994 --workers=1
```
Smoke `[x]` this pass for a named key in this year.

**94-P5 · Done when**  
28 keys write · dests 200 · 0 dest-field · existing 1994 specs green · no neighbor prefix leak · `itt94-csotd` unmoved.

**Hard bans:** do not move `itt94-csotd` · no 7th guided `<li>` · no dest-field “I read the 1994 period note” · no invented logos · no live models / ripped SWF / real payments · `itt94-*` only.

---

# 1995
**Thesis (locked):** [`1995-RESEARCH.md`](1995-RESEARCH.md) — commercial Web. Win95 · NN2 · Amazon books.  
**Star stays:** Amazon SSL checkout · `itt95-ssl-checkout`.  
**Band:** A.  
**Matrix on disk:** **27** writers (10 prior pack + 17 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 1995
  → About · bans · dual-cite
  → ★ Amazon SSL checkout
  → 27 leftover REAL dests (incomplete never writes)
  → Exit · itt95-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt95-espn-more` | query | `sites/espn/more.html` | `sites/amazon/ssl-checkout.html` |
| P2 | `itt95-salon-more` | query | `sites/salon/more.html` | `sites/amazon/ssl-checkout.html` |
| P3 | `itt95-classmates-more` | query | `sites/classmates/more.html` | `sites/amazon/ssl-checkout.html` |
| P4 | `itt95-match-more` | query | `sites/match/more.html` | `sites/amazon/ssl-checkout.html` |
| P5 | `itt95-tripod-more` | query | `sites/tripod/more.html` | `sites/amazon/ssl-checkout.html` |
| P6 | `itt95-aol-more` | query | `sites/aol/more.html` | `sites/amazon/ssl-checkout.html` |
| P7 | `itt95-wsj-more` | query | `sites/wsj/more.html` | `sites/amazon/ssl-checkout.html` |
| P8 | `itt95-hotbot-more` | query | `sites/hotbot/more.html` | `sites/amazon/ssl-checkout.html` |
| P9 | `itt95-pf-more` | query | `sites/pathfinder/more.html` | `sites/amazon/ssl-checkout.html` |
| P10 | `itt95-infoseek-more` | query | `sites/infoseek/more.html` | `sites/amazon/ssl-checkout.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | AltaVista leftover 2× | `sites/altavista/index.html` | `itt95-av-lx` | query | `sites/compuserve/index.html` |
| N2 | CompuServe leftover 2× | `sites/compuserve/index.html` | `itt95-cis-lx` | query | `sites/prodigy/index.html` |
| N3 | Prodigy leftover 2× | `sites/prodigy/index.html` | `itt95-prod-lx` | query | `sites/beanies/index.html` |
| N4 | Beanie leftover 2× | `sites/beanies/index.html` | `itt95-bn-lx` | query | `sites/aol/index.html` |
| N5 | AOL leftover 2× pack | `sites/aol/index.html` | `itt95-aol-lx` | query | `sites/cnn/index.html` |
| N6 | CNN leftover 2× | `sites/cnn/index.html` | `itt95-cnn-lx` | hops | `sites/cnet/index.html` |
| N7 | CNET leftover 2× | `sites/cnet/index.html` | `itt95-cnet-lx` | query | `sites/espn/index.html` |
| N8 | ESPN leftover 2× pack | `sites/espn/index.html` | `itt95-espn-lx` | query | `sites/microsoft/index.html` |
| N9 | Microsoft leftover 2× | `sites/microsoft/index.html` | `itt95-ms-lx` | query | `sites/netscape/index.html` |
| N10 | Netscape leftover 2× | `sites/netscape/index.html` | `itt95-ns-lx` | query | `sites/hotwired/index.html` |
| N11 | HotWired leftover 2× | `sites/hotwired/index.html` | `itt95-hw-lx` | query | `sites/whitehouse/index.html` |
| N12 | White House leftover 2× | `sites/whitehouse/index.html` | `itt95-wh-lx` | query | `sites/yahoo/index.html` |
| N13 | Yahoo leftover 2× | `sites/yahoo/index.html` | `itt95-yh-lx` | hops | `sites/infoseek/index.html` |
| N14 | Infoseek leftover 2× pack | `sites/infoseek/index.html` | `itt95-is-lx` | query | `sites/hotbot/index.html` |
| N15 | HotBot leftover 2× pack | `sites/hotbot/index.html` | `itt95-hb-lx` | query | `sites/geocities/index.html` |
| N16 | GeoCities leftover 2× | `sites/geocities/index.html` | `itt95-geo-lx` | checks | `sites/auctionweb/index.html` |
| N17 | AuctionWeb leftover literacy | `sites/auctionweb/index.html` | `itt95-aw-lx` | query | `sites/amazon/ssl-checkout.html` |

### Phases

**95-P0 · Read first · 20 min · [x]**  
Open `1995-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/1995/sites`). Do not create folders. Do not move `itt95-ssl-checkout`.

**95-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 17 `-lx` writers on disk.

**95-P2 · Home strip · [x]**  
`years/1995/pages/home.html` · `<!-- ITT-2X-NEXT:1995 -->` below guided 6 · star chip `itt95-ssl-checkout` unmoved · guided `<ol>` still 6.

**95-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/1995.js`.

**95-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1995" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 1995 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**95-P5 · Done when**  
27 keys write · dests 200 · 0 dest-field · existing 1995 specs green · no neighbor prefix leak · `itt95-ssl-checkout` unmoved.

**Hard bans:** do not move `itt95-ssl-checkout` · no 7th guided `<li>` · no dest-field “I read the 1995 period note” · no invented logos · no live models / ripped SWF / real payments · `itt95-*` only.

---

# 1996
**Thesis (locked):** [`1996-RESEARCH.md`](1996-RESEARCH.md) — portals · HoTMaiL · Space Jam.  
**Star stays:** Portal wars · `itt96-portal-wars`.  
**Band:** A.  
**Matrix on disk:** **24** writers (8 prior pack + 16 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 1996
  → About · bans · dual-cite
  → ★ Portal wars
  → 24 leftover REAL dests (incomplete never writes)
  → Exit · itt96-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt96-mtv-more` | query | `sites/mtv/more.html` | `sites/portals/wars.html` |
| P2 | `itt96-jeeves-more` | query | `sites/askjeeves/more.html` | `sites/portals/wars.html` |
| P3 | `itt96-globe-more` | query | `sites/theglobe/more.html` | `sites/portals/wars.html` |
| P4 | `itt96-tny-more` | query | `sites/totalny/more.html` | `sites/portals/wars.html` |
| P5 | `itt96-msn-more` | query | `sites/msn/more.html` | `sites/portals/wars.html` |
| P6 | `itt96-plugin-more` | query | `sites/plugin/more.html` | `sites/portals/wars.html` |
| P7 | `itt96-angel-more` | query | `sites/angelfire/more.html` | `sites/portals/wars.html` |
| P8 | `itt96-infoseek-more` | query | `sites/infoseek/more.html` | `sites/portals/wars.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | AOL portal leftover 2× | `sites/aolportal/index.html` | `itt96-aol-lx` | query | `sites/prodigy/index.html` |
| N2 | Prodigy leftover 2× | `sites/prodigy/index.html` | `itt96-prod-lx` | query | `sites/hotbot/index.html` |
| N3 | HotBot leftover 2× | `sites/hotbot/index.html` | `itt96-hb-lx` | query | `sites/microsoft/index.html` |
| N4 | Microsoft leftover 2× | `sites/microsoft/index.html` | `itt96-ms-lx` | query | `sites/msn/index.html` |
| N5 | MSN leftover 2× pack | `sites/msn/index.html` | `itt96-msn-lx` | query | `sites/amazon/index.html` |
| N6 | Amazon leftover literacy | `sites/amazon/index.html` | `itt96-am-lx` | query | `sites/excite/index.html` |
| N7 | Excite leftover 2× pack | `sites/excite/index.html` | `itt96-ex-lx` | query | `sites/yahoo/index.html` |
| N8 | Yahoo leftover 2× | `sites/yahoo/index.html` | `itt96-yh-lx` | hops | `sites/altavista/index.html` |
| N9 | AltaVista leftover 2× pack | `sites/altavista/index.html` | `itt96-av-lx` | query | `sites/geocities/index.html` |
| N10 | GeoCities leftover 2× | `sites/geocities/index.html` | `itt96-geo-lx` | checks | `sites/cnn/index.html` |
| N11 | CNN leftover 2× | `sites/cnn/index.html` | `itt96-cnn-lx` | hops | `sites/infoseek/index.html` |
| N12 | Infoseek leftover 2× pack | `sites/infoseek/index.html` | `itt96-is-lx` | query | `sites/netscape/index.html` |
| N13 | Netscape leftover 2× | `sites/netscape/index.html` | `itt96-ns-lx` | query | `sites/craigslist/index.html` |
| N14 | Craigslist leftover 2× pack | `sites/craigslist/index.html` | `itt96-cl-lx` | query | `sites/angelfire/index.html` |
| N15 | Angelfire leftover 2× pack | `sites/angelfire/index.html` | `itt96-af-lx` | query | `sites/pathfinder/index.html` |
| N16 | Pathfinder leftover 2× pack | `sites/pathfinder/index.html` | `itt96-pf-lx` | query | `sites/portals/wars.html` |

### Phases

**96-P0 · Read first · 20 min · [x]**  
Open `1996-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/1996/sites`). Do not create folders. Do not move `itt96-portal-wars`.

**96-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 16 `-lx` writers on disk.

**96-P2 · Home strip · [x]**  
`years/1996/pages/home.html` · `<!-- ITT-2X-NEXT:1996 -->` below guided 6 · star chip `itt96-portal-wars` unmoved · guided `<ol>` still 6.

**96-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/1996.js`.

**96-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1996" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 1996 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**96-P5 · Done when**  
24 keys write · dests 200 · 0 dest-field · existing 1996 specs green · no neighbor prefix leak · `itt96-portal-wars` unmoved.

**Hard bans:** do not move `itt96-portal-wars` · no 7th guided `<li>` · no dest-field “I read the 1996 period note” · no invented logos · no live models / ripped SWF / real payments · `itt96-*` only.

---

# 1997
**Thesis (locked):** [`1997-RESEARCH.md`](1997-RESEARCH.md) — IE4 · eBay · Slashdot · PointCast.  
**Star stays:** PointCast · `itt97-pointcast`.  
**Band:** A.  
**Matrix on disk:** **24** writers (7 prior pack + 17 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 1997
  → About · bans · dual-cite
  → ★ PointCast
  → 24 leftover REAL dests (incomplete never writes)
  → Exit · itt97-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt97-nyt-more` | query | `sites/nytimes/more.html` | `sites/pointcast/index.html` |
| P2 | `itt97-mp3-more` | query | `sites/mp3com/more.html` | `sites/pointcast/index.html` |
| P3 | `itt97-zdnet-more` | query | `sites/zdnet/more.html` | `sites/pointcast/index.html` |
| P4 | `itt97-bbc-more` | query | `sites/bbc/more.html` | `sites/pointcast/index.html` |
| P5 | `itt97-newscom-more` | query | `sites/newscom/more.html` | `sites/pointcast/index.html` |
| P6 | `itt97-scripting-more` | query | `sites/scripting/more.html` | `sites/pointcast/index.html` |
| P7 | `itt97-winamp-more` | query | `sites/winamp/more.html` | `sites/pointcast/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | AOL leftover 2× | `sites/aol/index.html` | `itt97-aol-lx` | query | `sites/msn/index.html` |
| N2 | MSN leftover 2× | `sites/msn/index.html` | `itt97-msn-lx` | query | `sites/excite/index.html` |
| N3 | Excite leftover 2× | `sites/excite/index.html` | `itt97-ex-lx` | query | `sites/yahoo/index.html` |
| N4 | Yahoo leftover 2× | `sites/yahoo/index.html` | `itt97-yh-lx` | hops | `sites/cnn/index.html` |
| N5 | CNN leftover 2× | `sites/cnn/index.html` | `itt97-cnn-lx` | query | `sites/netscape/index.html` |
| N6 | Netscape leftover 2× | `sites/netscape/index.html` | `itt97-ns-lx` | query | `sites/hotwired/index.html` |
| N7 | HotWired leftover 2× | `sites/hotwired/index.html` | `itt97-hw-lx` | query | `sites/drudgereport/index.html` |
| N8 | Drudge leftover 2× | `sites/drudgereport/index.html` | `itt97-dr-lx` | query | `sites/dancing-baby/index.html` |
| N9 | Dancing Baby leftover 2× | `sites/dancing-baby/index.html` | `itt97-db-lx` | checks | `sites/apple/index.html` |
| N10 | Apple leftover 2× | `sites/apple/index.html` | `itt97-ap-lx` | query | `sites/microsoft/index.html` |
| N11 | Microsoft leftover 2× | `sites/microsoft/index.html` | `itt97-ms-lx` | query | `sites/geocities/index.html` |
| N12 | GeoCities leftover 2× | `sites/geocities/index.html` | `itt97-geo-lx` | query | `sites/altavista/index.html` |
| N13 | AltaVista leftover 2× pack | `sites/altavista/index.html` | `itt97-av-lx` | query | `sites/lycos/index.html` |
| N14 | Lycos leftover 2× pack | `sites/lycos/index.html` | `itt97-ly-lx` | query | `sites/hotmail/index.html` |
| N15 | HoTMaiL leftover 2× pack | `sites/hotmail/index.html` | `itt97-hm-lx` | query | `sites/icq/index.html` |
| N16 | ICQ leftover 2× pack | `sites/icq/index.html` | `itt97-icq-lx` | query | `sites/slashdot/index.html` |
| N17 | Slashdot leftover 2× pack | `sites/slashdot/index.html` | `itt97-sd-lx` | query | `sites/pointcast/index.html` |

### Phases

**97-P0 · Read first · 20 min · [x]**  
Open `1997-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/1997/sites`). Do not create folders. Do not move `itt97-pointcast`.

**97-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 17 `-lx` writers on disk.

**97-P2 · Home strip · [x]**  
`years/1997/pages/home.html` · `<!-- ITT-2X-NEXT:1997 -->` below guided 6 · star chip `itt97-pointcast` unmoved · guided `<ol>` still 6.

**97-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/1997.js`.

**97-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1997" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 1997 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**97-P5 · Done when**  
24 keys write · dests 200 · 0 dest-field · existing 1997 specs green · no neighbor prefix leak · `itt97-pointcast` unmoved.

**Hard bans:** do not move `itt97-pointcast` · no 7th guided `<li>` · no dest-field “I read the 1997 period note” · no invented logos · no live models / ripped SWF / real payments · `itt97-*` only.

---

# 1998
**Thesis (locked):** [`1998-RESEARCH.md`](1998-RESEARCH.md) — Win98 · sparse Google.  
**Star stays:** I'm Feeling Lucky · `itt98-lucky`.  
**Band:** A.  
**Matrix on disk:** **24** writers (7 prior pack + 17 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 1998
  → About · bans · dual-cite
  → ★ I'm Feeling Lucky
  → 24 leftover REAL dests (incomplete never writes)
  → Exit · itt98-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt98-go-more` | query | `sites/go/more.html` | `sites/google/lucky.html` |
| P2 | `itt98-snap-more` | query | `sites/snap/more.html` | `sites/google/lucky.html` |
| P3 | `itt98-about-more` | query | `sites/about/more.html` | `sites/google/lucky.html` |
| P4 | `itt98-od-more` | query | `sites/opendiary/more.html` | `sites/google/lucky.html` |
| P5 | `itt98-icqweb-more` | query | `sites/icqweb/more.html` | `sites/google/lucky.html` |
| P6 | `itt98-valve-more` | query | `sites/valve/more.html` | `sites/google/lucky.html` |
| P7 | `itt98-winfiles-more` | query | `sites/winfiles/more.html` | `sites/google/lucky.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | AOL leftover 2× | `sites/aol/index.html` | `itt98-aol-lx` | query | `sites/msn/index.html` |
| N2 | MSN leftover 2× | `sites/msn/index.html` | `itt98-msn-lx` | query | `sites/excite/index.html` |
| N3 | Excite leftover 2× | `sites/excite/index.html` | `itt98-ex-lx` | query | `sites/lycos/index.html` |
| N4 | Lycos leftover 2× | `sites/lycos/index.html` | `itt98-ly-lx` | query | `sites/geocities/index.html` |
| N5 | GeoCities leftover 2× | `sites/geocities/index.html` | `itt98-geo-lx` | query | `sites/bbc/index.html` |
| N6 | BBC leftover 2× | `sites/bbc/index.html` | `itt98-bbc-lx` | hops | `sites/cnn/index.html` |
| N7 | CNN leftover 2× | `sites/cnn/index.html` | `itt98-cnn-lx` | query | `sites/hotmail/index.html` |
| N8 | HoTMaiL leftover 2× | `sites/hotmail/index.html` | `itt98-hm-lx` | query | `sites/icq/index.html` |
| N9 | ICQ leftover 2× | `sites/icq/index.html` | `itt98-icq-lx` | query | `sites/infoseek/index.html` |
| N10 | Infoseek leftover 2× | `sites/infoseek/index.html` | `itt98-is-lx` | query | `sites/hotbot/index.html` |
| N11 | HotBot leftover 2× | `sites/hotbot/index.html` | `itt98-hb-lx` | query | `sites/netscape/index.html` |
| N12 | Netscape leftover 2× | `sites/netscape/index.html` | `itt98-ns-lx` | query | `sites/microsoft/index.html` |
| N13 | Microsoft leftover 2× | `sites/microsoft/index.html` | `itt98-ms-lx` | query | `sites/altavista/index.html` |
| N14 | AltaVista leftover 2× pack | `sites/altavista/index.html` | `itt98-av-lx` | query | `sites/about/index.html` |
| N15 | About leftover 2× pack | `sites/about/index.html` | `itt98-ab-lx` | query | `sites/dmoz/index.html` |
| N16 | DMOZ leftover 2× pack | `sites/dmoz/index.html` | `itt98-dmoz-lx` | hops | `sites/slashdot/index.html` |
| N17 | Slashdot leftover 2× pack | `sites/slashdot/index.html` | `itt98-sd-lx` | query | `sites/google/lucky.html` |

### Phases

**98-P0 · Read first · 20 min · [x]**  
Open `1998-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/1998/sites`). Do not create folders. Do not move `itt98-lucky`.

**98-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 17 `-lx` writers on disk.

**98-P2 · Home strip · [x]**  
`years/1998/pages/home.html` · `<!-- ITT-2X-NEXT:1998 -->` below guided 6 · star chip `itt98-lucky` unmoved · guided `<ol>` still 6.

**98-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/1998.js`.

**98-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1998" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 1998 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**98-P5 · Done when**  
24 keys write · dests 200 · 0 dest-field · existing 1998 specs green · no neighbor prefix leak · `itt98-lucky` unmoved.

**Hard bans:** do not move `itt98-lucky` · no 7th guided `<li>` · no dest-field “I read the 1998 period note” · no invented logos · no live models / ripped SWF / real payments · `itt98-*` only.

---

# 1999
**Thesis (locked):** [`1999-RESEARCH.md`](1999-RESEARCH.md) — IE5 · Napster · AIM · Y2K.  
**Star stays:** AIM sign-on · `itt99-aim`.  
**Band:** A.  
**Matrix on disk:** **23** writers (6 prior pack + 17 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 1999
  → About · bans · dual-cite
  → ★ AIM sign-on
  → 23 leftover REAL dests (incomplete never writes)
  → Exit · itt99-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt99-neo-more` | query | `sites/neopets/more.html` | `sites/aim/index.html` |
| P2 | `itt99-egroups-more` | query | `sites/egroups/more.html` | `sites/aim/index.html` |
| P3 | `itt99-webvan-more` | query | `sites/webvan/more.html` | `sites/aim/index.html` |
| P4 | `itt99-etrade-more` | query | `sites/etrade/more.html` | `sites/aim/index.html` |
| P5 | `itt99-onion-more` | query | `sites/theonion/more.html` | `sites/aim/index.html` |
| P6 | `itt99-ym-more` | query | `sites/yahoomessenger/more.html` | `sites/aim/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | AOL leftover 2× | `sites/aol/index.html` | `itt99-aol-lx` | query | `sites/msn/index.html` |
| N2 | MSN leftover 2× | `sites/msn/index.html` | `itt99-msn-lx` | query | `sites/yahoo/index.html` |
| N3 | Yahoo leftover 2× | `sites/yahoo/index.html` | `itt99-yh-lx` | hops | `sites/excite/index.html` |
| N4 | Excite leftover 2× | `sites/excite/index.html` | `itt99-ex-lx` | query | `sites/about/index.html` |
| N5 | About leftover 2× | `sites/about/index.html` | `itt99-ab-lx` | query | `sites/google/index.html` |
| N6 | Google leftover literacy | `sites/google/index.html` | `itt99-g-lx` | query | `sites/cnn/index.html` |
| N7 | CNN leftover 2× | `sites/cnn/index.html` | `itt99-cnn-lx` | query | `sites/icq/index.html` |
| N8 | ICQ leftover 2× | `sites/icq/index.html` | `itt99-icq-lx` | query | `sites/altavista/index.html` |
| N9 | AltaVista leftover 2× | `sites/altavista/index.html` | `itt99-av-lx` | query | `sites/slashdot/index.html` |
| N10 | Slashdot leftover 2× | `sites/slashdot/index.html` | `itt99-sd-lx` | query | `sites/y2k/index.html` |
| N11 | Y2K leftover 2× | `sites/y2k/index.html` | `itt99-y2k-lx` | checks | `sites/apple/index.html` |
| N12 | Apple leftover 2× | `sites/apple/index.html` | `itt99-ap-lx` | query | `sites/microsoft/index.html` |
| N13 | Microsoft leftover 2× | `sites/microsoft/index.html` | `itt99-ms-lx` | query | `sites/hotbot/index.html` |
| N14 | HotBot leftover 2× | `sites/hotbot/index.html` | `itt99-hb-lx` | query | `sites/infoseek/index.html` |
| N15 | Infoseek leftover 2× | `sites/infoseek/index.html` | `itt99-is-lx` | query | `sites/dmoz/index.html` |
| N16 | DMOZ leftover 2× pack | `sites/dmoz/index.html` | `itt99-dmoz-lx` | query | `sites/gamespot/index.html` |
| N17 | GameSpot leftover 2× pack | `sites/gamespot/index.html` | `itt99-gs-lx` | query | `sites/aim/index.html` |

### Phases

**99-P0 · Read first · 20 min · [x]**  
Open `1999-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/1999/sites`). Do not create folders. Do not move `itt99-aim`.

**99-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 17 `-lx` writers on disk.

**99-P2 · Home strip · [x]**  
`years/1999/pages/home.html` · `<!-- ITT-2X-NEXT:1999 -->` below guided 6 · star chip `itt99-aim` unmoved · guided `<ol>` still 6.

**99-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/1999.js`.

**99-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 1999" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 1999 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**99-P5 · Done when**  
23 keys write · dests 200 · 0 dest-field · existing 1999 specs green · no neighbor prefix leak · `itt99-aim` unmoved.

**Hard bans:** do not move `itt99-aim` · no 7th guided `<li>` · no dest-field “I read the 1999 period note” · no invented logos · no live models / ripped SWF / real payments · `itt99-*` only.

---

# 2000
**Thesis (locked):** [`2000-RESEARCH.md`](2000-RESEARCH.md) — IE 5.5 · smile · crash year.  
**Star stays:** MapQuest · `itt00-mapquest`.  
**Band:** A.  
**Matrix on disk:** **23** writers (6 prior pack + 17 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2000
  → About · bans · dual-cite
  → ★ MapQuest
  → 23 leftover REAL dests (incomplete never writes)
  → Exit · itt00-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt00-half-more` | query | `sites/half/more.html` | `sites/mapquest/index.html` |
| P2 | `itt00-baidu-more` | query | `sites/baidu/more.html` | `sites/mapquest/index.html` |
| P3 | `itt00-e2-more` | query | `sites/everything2/more.html` | `sites/mapquest/index.html` |
| P4 | `itt00-expedia-more` | query | `sites/expedia/more.html` | `sites/mapquest/index.html` |
| P5 | `itt00-travel-more` | query | `sites/travelocity/more.html` | `sites/mapquest/index.html` |
| P6 | `itt00-homestar-more` | query | `sites/homestar/more.html` | `sites/mapquest/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Yahoo leftover 2× | `sites/yahoo/index.html` | `itt00-yh-lx` | hops | `sites/aol/index.html` |
| N2 | AOL leftover 2× | `sites/aol/index.html` | `itt00-aol-lx` | query | `sites/msn/index.html` |
| N3 | MSN leftover 2× | `sites/msn/index.html` | `itt00-msn-lx` | query | `sites/about/index.html` |
| N4 | About leftover 2× | `sites/about/index.html` | `itt00-ab-lx` | query | `sites/bbc/index.html` |
| N5 | BBC leftover 2× | `sites/bbc/index.html` | `itt00-bbc-lx` | hops | `sites/excite/index.html` |
| N6 | Excite leftover 2× | `sites/excite/index.html` | `itt00-ex-lx` | query | `sites/google/index.html` |
| N7 | Google leftover literacy | `sites/google/index.html` | `itt00-g-lx` | query | `sites/blogger/index.html` |
| N8 | Blogger leftover 2× | `sites/blogger/index.html` | `itt00-bg-lx` | query | `sites/paypal/index.html` |
| N9 | PayPal leftover 2× | `sites/paypal/index.html` | `itt00-pp-lx` | checks | `sites/zombo/index.html` |
| N10 | Zombo leftover literacy | `sites/zombo/index.html` | `itt00-zombo-lx` | query | `sites/altavista/index.html` |
| N11 | AltaVista leftover 2× | `sites/altavista/index.html` | `itt00-av-lx` | query | `sites/askjeeves/index.html` |
| N12 | Ask leftover 2× | `sites/askjeeves/index.html` | `itt00-ask-lx` | query | `sites/dmoz/index.html` |
| N13 | DMOZ leftover 2× | `sites/dmoz/index.html` | `itt00-dmoz-lx` | query | `sites/gamespot/index.html` |
| N14 | GameSpot leftover 2× | `sites/gamespot/index.html` | `itt00-gs-lx` | query | `sites/geocities/index.html` |
| N15 | GeoCities leftover 2× | `sites/geocities/index.html` | `itt00-geo-lx` | query | `sites/icq/index.html` |
| N16 | ICQ leftover 2× | `sites/icq/index.html` | `itt00-icq-lx` | query | `sites/slashdot/index.html` |
| N17 | Slashdot leftover 2× | `sites/slashdot/index.html` | `itt00-sd-lx` | query | `sites/mapquest/index.html` |

### Phases

**00-P0 · Read first · 20 min · [x]**  
Open `2000-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2000/sites`). Do not create folders. Do not move `itt00-mapquest`.

**00-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 17 `-lx` writers on disk.

**00-P2 · Home strip · [x]**  
`years/2000/pages/home.html` · `<!-- ITT-2X-NEXT:2000 -->` below guided 6 · star chip `itt00-mapquest` unmoved · guided `<ol>` still 6.

**00-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2000.js`.

**00-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2000" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2000 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**00-P5 · Done when**  
23 keys write · dests 200 · 0 dest-field · existing 2000 specs green · no neighbor prefix leak · `itt00-mapquest` unmoved.

**Hard bans:** do not move `itt00-mapquest` · no 7th guided `<li>` · no dest-field “I read the 2000 period note” · no invented logos · no live models / ripped SWF / real payments · `itt00-*` only.

---

# 2001
**Thesis (locked):** [`2001-RESEARCH.md`](2001-RESEARCH.md) — XP · IE6 · Wikipedia · iPod · no Store.  
**Star stays:** Wikipedia edit · `itt01-wiki-pages`.  
**Band:** B · 18→36 on existing dests.  
**Matrix on disk:** **36** writers (18 prior pack + 18 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2001
  → About · bans · dual-cite
  → ★ Wikipedia edit
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt01-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt01-wiki-prev` | hops | `sites/wikipedia/edit.html` | `sites/apple/ipod.html` |
| P2 | `itt01-ipod-lib` | query | `sites/apple/ipod.html` | `sites/broadband/index.html` |
| P3 | `itt01-broadband` | query | `sites/broadband/index.html` | `sites/msn/index.html` |
| P4 | `itt01-msn-sign` | query | `sites/msn/index.html` | `sites/google/index.html` |
| P5 | `itt01-google-q` | query | `sites/google/index.html` | `sites/yahoo/index.html` |
| P6 | `itt01-yahoo-hop` | hops | `sites/yahoo/index.html` | `sites/amazon/index.html` |
| P7 | `itt01-cart` | query | `sites/amazon/index.html` | `sites/ebay/index.html` |
| P8 | `itt01-ebay-bid` | query | `sites/ebay/index.html` | `sites/napster/index.html` |
| P9 | `itt01-napster-q` | query | `sites/napster/index.html` | `sites/gnutella/index.html` |
| P10 | `itt01-gnutella` | query | `sites/gnutella/index.html` | `sites/wayback/index.html` |
| P11 | `itt01-wayback-q` | query | `sites/wayback/index.html` | `sites/blogger/index.html` |
| P12 | `itt01-blog-q` | query | `sites/blogger/index.html` | `sites/movabletype/index.html` |
| P13 | `itt01-mt-hop` | hops | `sites/movabletype/index.html` | `sites/mozilla/index.html` |
| P14 | `itt01-mozilla-ack` | query | `sites/mozilla/index.html` | `sites/cnet/index.html` |
| P15 | `itt01-cnet-dl` | query | `sites/cnet/index.html` | `sites/bbc/index.html` |
| P16 | `itt01-bbc-q` | query | `sites/bbc/index.html` | `sites/encarta/index.html` |
| P17 | `itt01-encarta-ack` | query | `sites/encarta/index.html` | `sites/pets/index.html` |
| P18 | `itt01-pets-ack` | query | `sites/pets/index.html` | `sites/wikipedia/edit.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | AOL leftover 2× | `sites/aol/index.html` | `itt01-aol-lx` | query | `sites/about/index.html` |
| N2 | About.com leftover 2× | `sites/about/index.html` | `itt01-about-lx` | query | `sites/cnn/index.html` |
| N3 | CNN leftover 2× | `sites/cnn/index.html` | `itt01-cnn-lx` | hops | `sites/gamespot/index.html` |
| N4 | GameSpot leftover 2× | `sites/gamespot/index.html` | `itt01-gs-lx` | query | `sites/geocities/index.html` |
| N5 | Geocities leftover 2× | `sites/geocities/index.html` | `itt01-geo-lx` | checks | `sites/icq/index.html` |
| N6 | ICQ leftover 2× | `sites/icq/index.html` | `itt01-icq-lx` | query | `sites/paypal/index.html` |
| N7 | Paypal leftover 2× | `sites/paypal/index.html` | `itt01-pp-lx` | checks | `sites/slashdot/index.html` |
| N8 | Slashdot leftover 2× | `sites/slashdot/index.html` | `itt01-sd-lx` | query | `sites/limewire/index.html` |
| N9 | Limewire leftover 2× | `sites/limewire/index.html` | `itt01-lw-lx` | checks | `sites/morpheus/index.html` |
| N10 | Morpheus leftover 2× | `sites/morpheus/index.html` | `itt01-morph-lx` | query | `sites/habbo/index.html` |
| N11 | Habbo leftover 2× | `sites/habbo/index.html` | `itt01-habbo-lx` | query | `sites/runescape/index.html` |
| N12 | RuneScape leftover 2× | `sites/runescape/index.html` | `itt01-rs-lx` | query | `sites/itunes/index.html` |
| N13 | Itunes leftover 2× | `sites/itunes/index.html` | `itt01-it-lx` | checks | `sites/macromedia/index.html` |
| N14 | Macromedia leftover 2× | `sites/macromedia/index.html` | `itt01-mm-lx` | query | `sites/encarta/index.html` |
| N15 | Encarta leftover 2× | `sites/encarta/index.html` | `itt01-enc-lx` | query | `sites/askjeeves/index.html` |
| N16 | Ask Jeeves leftover 2× | `sites/askjeeves/index.html` | `itt01-ask-lx` | query | `sites/dmoz/index.html` |
| N17 | DMOZ leftover 2× | `sites/dmoz/index.html` | `itt01-dmoz-lx` | hops | `sites/moreover/index.html` |
| N18 | Moreover leftover 2× | `sites/moreover/index.html` | `itt01-more-lx` | query | `sites/wikipedia/edit.html` |

### Phases

**01-P0 · Read first · 20 min · [x]**  
Open `2001-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2001/sites`). Do not create folders. Do not move `itt01-wiki-pages`.

**01-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 18 `-lx` writers on disk.

**01-P2 · Home strip · [x]**  
`years/2001/pages/home.html` · `<!-- ITT-2X-NEXT:2001 -->` below guided 6 · star chip `itt01-wiki-pages` unmoved · guided `<ol>` still 6.

**01-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2001.js`.

**01-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2001" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2001 --workers=1
```
Smoke `[x]` this pass for a named key in this year.

**01-P5 · Done when**  
36 keys write · dests 200 · 0 dest-field · existing 2001 specs green · no neighbor prefix leak · `itt01-wiki-pages` unmoved.

**Hard bans:** do not move `itt01-wiki-pages` · no 7th guided `<li>` · no dest-field “I read the 2001 period note” · no invented logos · no live models / ripped SWF / real payments · `itt01-*` only.

---

# 2002
**Thesis (locked):** [`2002-RESEARCH.md`](2002-RESEARCH.md) — Friendster seed · KaZaA · StumbleUpon.  
**Star stays:** StumbleUpon · `itt02-stumble`.  
**Band:** B · 18→36.  
**Matrix on disk:** **36** writers (17 prior pack + 19 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2002
  → About · bans · dual-cite
  → ★ StumbleUpon
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt02-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt02-stumble-2x` | hops | `sites/stumbleupon/index.html` | `sites/friendster/index.html` |
| P2 | `itt02-ftest` | query | `sites/friendster/index.html` | `sites/kazaa/index.html` |
| P3 | `itt02-kazaa-q` | query | `sites/kazaa/index.html` | `sites/netflix/index.html` |
| P4 | `itt02-nfq` | query | `sites/netflix/index.html` | `sites/wired/index.html` |
| P5 | `itt02-wired-hop` | hops | `sites/wired/index.html` | `sites/googlenews/index.html` |
| P6 | `itt02-daypop` | query | `sites/daypop/index.html` | `sites/technorati/index.html` |
| P7 | `itt02-cosmos` | query | `sites/technorati/index.html` | `sites/blogger/index.html` |
| P8 | `itt02-blog-q` | query | `sites/blogger/index.html` | `sites/phoenix/index.html` |
| P9 | `itt02-phoenix-ack` | query | `sites/phoenix/index.html` | `sites/lastfm/index.html` |
| P10 | `itt02-lastfm` | query | `sites/lastfm/index.html` | `sites/steam/index.html` |
| P11 | `itt02-steam-ack` | query | `sites/steam/index.html` | `sites/meetup/index.html` |
| P12 | `itt02-meetup` | query | `sites/meetup/index.html` | `sites/fotolog/index.html` |
| P13 | `itt02-fotolog` | query | `sites/fotolog/index.html` | `sites/typepad/index.html` |
| P14 | `itt02-typepad` | query | `sites/typepad/index.html` | `sites/askjeeves/index.html` |
| P15 | `itt02-ask` | query | `sites/askjeeves/index.html` | `sites/amazon/index.html` |
| P16 | `itt02-cart` | query | `sites/amazon/index.html` | `sites/wikipedia/index.html` |
| P17 | `itt02-wiki-hop` | hops | `sites/wikipedia/index.html` | `sites/stumbleupon/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Google News BETA leftover | `sites/googlenews/index.html` | `itt02-gnews-lx` | query | `sites/daypop/index.html` |
| N2 | Friendster leftover 2× | `sites/friendster/index.html` | `itt02-fs-lx` | checks | `sites/livejournal/index.html` |
| N3 | LiveJournal leftover 2× | `sites/livejournal/index.html` | `itt02-lj-lx` | query | `sites/meetup/index.html` |
| N4 | Meetup leftover 2× | `sites/meetup/index.html` | `itt02-mu-lx` | query | `sites/deviantart/index.html` |
| N5 | DeviantArt leftover 2× | `sites/deviantart/index.html` | `itt02-da-lx` | query | `sites/lastfm/index.html` |
| N6 | last.fm leftover 2× | `sites/lastfm/index.html` | `itt02-lfm-lx` | query | `sites/steam/index.html` |
| N7 | Steam leftover 2× | `sites/steam/index.html` | `itt02-st-lx` | checks | `sites/netflix/index.html` |
| N8 | Netflix leftover 2× | `sites/netflix/index.html` | `itt02-nf-lx` | query | `sites/wired/index.html` |
| N9 | Wired leftover 2× | `sites/wired/index.html` | `itt02-wired-lx` | query | `sites/somethingawful/index.html` |
| N10 | Something Awful leftover 2× | `sites/somethingawful/index.html` | `itt02-sa-lx` | query | `sites/fotolog/index.html` |
| N11 | Fotolog leftover 2× | `sites/fotolog/index.html` | `itt02-fl-lx` | query | `sites/xanga/index.html` |
| N12 | Xanga leftover 2× | `sites/xanga/index.html` | `itt02-xg-lx` | query | `sites/typepad/index.html` |
| N13 | TypePad leftover 2× | `sites/typepad/index.html` | `itt02-tp-lx` | query | `sites/bbc/index.html` |
| N14 | BBC leftover 2× | `sites/bbc/index.html` | `itt02-bbc-lx` | hops | `sites/aol/index.html` |
| N15 | AOL leftover 2× | `sites/aol/index.html` | `itt02-aol-lx` | query | `sites/msn/index.html` |
| N16 | MSN leftover 2× | `sites/msn/index.html` | `itt02-msn-lx` | query | `sites/ebay/index.html` |
| N17 | eBay leftover 2× | `sites/ebay/index.html` | `itt02-ebay-lx` | query | `sites/kazaa/index.html` |
| N18 | Kazaa leftover 2× | `sites/kazaa/index.html` | `itt02-kz-lx` | checks | `sites/technorati/index.html` |
| N19 | Technorati leftover 2× | `sites/technorati/index.html` | `itt02-tech-lx` | query | `sites/stumbleupon/index.html` |

### Phases

**02-P0 · Read first · 20 min · [x]**  
Open `2002-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2002/sites`). Do not create folders. Do not move `itt02-stumble`.

**02-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 19 `-lx` writers on disk.

**02-P2 · Home strip · [x]**  
`years/2002/pages/home.html` · `<!-- ITT-2X-NEXT:2002 -->` below guided 6 · star chip `itt02-stumble` unmoved · guided `<ol>` still 6.

**02-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2002.js`.

**02-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2002" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2002 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**02-P5 · Done when**  
36 keys write · dests 200 · 0 dest-field · existing 2002 specs green · no neighbor prefix leak · `itt02-stumble` unmoved.

**Hard bans:** do not move `itt02-stumble` · no 7th guided `<li>` · no dest-field “I read the 2002 period note” · no invented logos · no live models / ripped SWF / real payments · `itt02-*` only.

---

# 2003
**Thesis (locked):** [`2003-RESEARCH.md`](2003-RESEARCH.md) — MySpace · iTunes Store · WordPress · LinkedIn.  
**Star stays:** Photobucket upload · `itt03-photobucket`.  
**Band:** B · 18→36.  
**Matrix on disk:** **36** writers (15 prior pack + 21 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2003
  → About · bans · dual-cite
  → ★ Photobucket upload
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt03-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt03-pb-fn` | query | `sites/photobucket/index.html` | `sites/myspace/index.html` |
| P2 | `itt03-it99` | query | `sites/itunes/index.html` | `sites/wordpress/index.html` |
| P3 | `itt03-wppub` | query | `sites/wordpress/index.html` | `sites/linkedin/index.html` |
| P4 | `itt03-li-inv` | query | `sites/linkedin/index.html` | `sites/adsense/index.html` |
| P5 | `itt03-bl` | query | `sites/bloglines/index.html` | `sites/friendster/index.html` |
| P6 | `itt03-ftest` | query | `sites/friendster/index.html` | `sites/skype/index.html` |
| P7 | `itt03-del` | query | `sites/delicious/index.html` | `sites/4chan/index.html` |
| P8 | `itt03-board` | query | `sites/4chan/index.html` | `sites/hi5/index.html` |
| P9 | `itt03-hi5` | query | `sites/hi5/index.html` | `sites/newgrounds/index.html` |
| P10 | `itt03-ng` | query | `sites/newgrounds/index.html` | `sites/secondlife/index.html` |
| P11 | `itt03-sl` | query | `sites/secondlife/index.html` | `sites/walmart/index.html` |
| P12 | `itt03-wm` | query | `sites/walmart/index.html` | `sites/zengarden/index.html` |
| P13 | `itt03-zen` | hops | `sites/zengarden/index.html` | `sites/phoenix/index.html` |
| P14 | `itt03-phoenix-ack` | query | `sites/phoenix/index.html` | `sites/wikipedia/index.html` |
| P15 | `itt03-wiki-hop` | hops | `sites/wikipedia/index.html` | `sites/photobucket/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | MySpace leftover two friends | `sites/myspace/index.html` | `itt03-ms-top8-lx` | hops | `sites/itunes/index.html` |
| N2 | AdSense leftover site | `sites/adsense/index.html` | `itt03-adsense-lx` | query | `sites/bloglines/index.html` |
| N3 | Skype leftover call theater | `sites/skype/index.html` | `itt03-skype-lx` | query | `sites/delicious/index.html` |
| N4 | LinkedIn leftover 2× | `sites/linkedin/index.html` | `itt03-li-lx` | query | `sites/wordpress/index.html` |
| N5 | WordPress leftover 2× | `sites/wordpress/index.html` | `itt03-wp-lx` | query | `sites/skype/index.html` |
| N6 | Skype leftover 2× | `sites/skype/index.html` | `itt03-sk-lx` | checks | `sites/hi5/index.html` |
| N7 | hi5 leftover 2× | `sites/hi5/index.html` | `itt03-hi5-lx` | query | `sites/4chan/index.html` |
| N8 | 4Chan leftover 2× | `sites/4chan/index.html` | `itt03-4c-lx` | checks | `sites/secondlife/index.html` |
| N9 | Second Life leftover 2× | `sites/secondlife/index.html` | `itt03-sl-lx` | query | `sites/newgrounds/index.html` |
| N10 | Newgrounds leftover 2× | `sites/newgrounds/index.html` | `itt03-ng-lx` | query | `sites/walmart/index.html` |
| N11 | Walmart leftover 2× | `sites/walmart/index.html` | `itt03-wm-lx` | query | `sites/cnet/index.html` |
| N12 | CNET leftover 2× | `sites/cnet/index.html` | `itt03-cnet-lx` | query | `sites/evite/index.html` |
| N13 | Evite leftover 2× | `sites/evite/index.html` | `itt03-ev-lx` | query | `sites/imageshack/index.html` |
| N14 | ImageShack leftover 2× | `sites/imageshack/index.html` | `itt03-is-lx` | query | `sites/delicious/index.html` |
| N15 | del.icio.us leftover 2× | `sites/delicious/index.html` | `itt03-del-lx` | query | `sites/tribe/index.html` |
| N16 | Tribe leftover 2× | `sites/tribe/index.html` | `itt03-tr-lx` | query | `sites/zengarden/index.html` |
| N17 | CSS Zen Garden leftover 2× | `sites/zengarden/index.html` | `itt03-css-lx` | hops | `sites/friendster/index.html` |
| N18 | Friendster leftover 2× | `sites/friendster/index.html` | `itt03-fs-lx` | checks | `sites/askjeeves/index.html` |
| N19 | Ask leftover 2× | `sites/askjeeves/index.html` | `itt03-ask-lx` | query | `sites/bloglines/index.html` |
| N20 | Bloglines leftover 2× | `sites/bloglines/index.html` | `itt03-bl-lx` | query | `sites/itunes/index.html` |
| N21 | Itunes leftover 2× | `sites/itunes/index.html` | `itt03-it-lx` | checks | `sites/photobucket/index.html` |

### Phases

**03-P0 · Read first · 20 min · [x]**  
Open `2003-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2003/sites`). Do not create folders. Do not move `itt03-photobucket`.

**03-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 21 `-lx` writers on disk.

**03-P2 · Home strip · [x]**  
`years/2003/pages/home.html` · `<!-- ITT-2X-NEXT:2003 -->` below guided 6 · star chip `itt03-photobucket` unmoved · guided `<ol>` still 6.

**03-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2003.js`.

**03-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2003" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2003 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**03-P5 · Done when**  
36 keys write · dests 200 · 0 dest-field · existing 2003 specs green · no neighbor prefix leak · `itt03-photobucket` unmoved.

**Hard bans:** do not move `itt03-photobucket` · no 7th guided `<li>` · no dest-field “I read the 2003 period note” · no invented logos · no live models / ripped SWF / real payments · `itt03-*` only.

---

# 2004
**Thesis (locked):** [`2004-RESEARCH.md`](2004-RESEARCH.md) — Gmail · Flickr · thefacebook · Firefox 1.0.  
**Star stays:** thefacebook networks · `itt04-thefacebook-networks`.  
**Band:** B · 18→36.  
**Matrix on disk:** **36** writers (16 prior pack + 20 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2004
  → About · bans · dual-cite
  → ★ thefacebook networks
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt04-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt04-fb-net` | hops | `sites/facebook/networks.html` | `sites/gmail/index.html` |
| P2 | `itt04-gmail-inv` | query | `sites/gmail/index.html` | `sites/flickr/index.html` |
| P3 | `itt04-ff-ack` | query | `sites/firefox/index.html` | `sites/digg/index.html` |
| P4 | `itt04-digg-seed` | query | `sites/digg/index.html` | `sites/orkut/index.html` |
| P5 | `itt04-orkut` | query | `sites/orkut/index.html` | `sites/livejournal/index.html` |
| P6 | `itt04-lj` | query | `sites/livejournal/index.html` | `sites/craigslist/index.html` |
| P7 | `itt04-cl` | query | `sites/craigslist/index.html` | `sites/yelp/index.html` |
| P8 | `itt04-yelp` | query | `sites/yelp/index.html` | `sites/piczo/index.html` |
| P9 | `itt04-piczo` | query | `sites/piczo/index.html` | `sites/tagged/index.html` |
| P10 | `itt04-tagged` | query | `sites/tagged/index.html` | `sites/odeo/index.html` |
| P11 | `itt04-odeo` | query | `sites/odeo/index.html` | `sites/worldofwarcraft/index.html` |
| P12 | `itt04-wow` | query | `sites/worldofwarcraft/index.html` | `sites/feedburner/index.html` |
| P13 | `itt04-fburn` | query | `sites/feedburner/index.html` | `sites/delicious/index.html` |
| P14 | `itt04-del` | query | `sites/delicious/index.html` | `sites/weather/index.html` |
| P15 | `itt04-ms` | hops | `sites/myspace/index.html` | `sites/facebook/index.html` |
| P16 | `itt04-fb-wall` | query | `sites/facebook/index.html` | `sites/facebook/networks.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Flickr leftover title | `sites/flickr/index.html` | `itt04-flickr-lx` | query | `sites/firefox/index.html` |
| N2 | Weather.com leftover zip | `sites/weather/index.html` | `itt04-weather-lx` | query | `sites/myspace/index.html` |
| N3 | Orkut leftover 2× | `sites/orkut/index.html` | `itt04-ork-lx` | query | `sites/yelp/index.html` |
| N4 | Yelp leftover 2× | `sites/yelp/index.html` | `itt04-yelp-lx` | query | `sites/craigslist/index.html` |
| N5 | Craigslist leftover 2× | `sites/craigslist/index.html` | `itt04-cl-lx` | hops | `sites/livejournal/index.html` |
| N6 | LiveJournal leftover 2× | `sites/livejournal/index.html` | `itt04-lj-lx` | query | `sites/weather/index.html` |
| N7 | Weather.com leftover 2× | `sites/weather/index.html` | `itt04-wx-lx` | query | `sites/firefox/index.html` |
| N8 | Firefox leftover 2× | `sites/firefox/index.html` | `itt04-fx-lx` | checks | `sites/digg/index.html` |
| N9 | Digg leftover 2× | `sites/digg/index.html` | `itt04-digg-lx` | query | `sites/gmail/index.html` |
| N10 | Gmail leftover 2× | `sites/gmail/index.html` | `itt04-gm-lx` | checks | `sites/worldofwarcraft/index.html` |
| N11 | WoW leftover 2× | `sites/worldofwarcraft/index.html` | `itt04-wow-lx` | query | `sites/piczo/index.html` |
| N12 | Piczo leftover 2× | `sites/piczo/index.html` | `itt04-pz-lx` | query | `sites/tagged/index.html` |
| N13 | Tagged leftover 2× | `sites/tagged/index.html` | `itt04-tg-lx` | query | `sites/odeo/index.html` |
| N14 | Odeo leftover 2× | `sites/odeo/index.html` | `itt04-od-lx` | query | `sites/basecamp/index.html` |
| N15 | Basecamp leftover 2× | `sites/basecamp/index.html` | `itt04-bc-lx` | query | `sites/flickr/index.html` |
| N16 | Flickr leftover 2× | `sites/flickr/index.html` | `itt04-fl-lx` | query | `sites/orkutcircle/index.html` |
| N17 | Orkut circle leftover 2× | `sites/orkutcircle/index.html` | `itt04-oc-lx` | hops | `sites/yelplocal/index.html` |
| N18 | Yelp local leftover 2× | `sites/yelplocal/index.html` | `itt04-yl-lx` | query | `sites/tinypic/index.html` |
| N19 | TinyPic leftover 2× | `sites/tinypic/index.html` | `itt04-tp-lx` | query | `sites/feedburner/index.html` |
| N20 | FeedBurner leftover 2× | `sites/feedburner/index.html` | `itt04-fburn-lx` | query | `sites/facebook/networks.html` |

### Phases

**04-P0 · Read first · 20 min · [x]**  
Open `2004-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2004/sites`). Do not create folders. Do not move `itt04-thefacebook-networks`.

**04-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 20 `-lx` writers on disk.

**04-P2 · Home strip · [x]**  
`years/2004/pages/home.html` · `<!-- ITT-2X-NEXT:2004 -->` below guided 6 · star chip `itt04-thefacebook-networks` unmoved · guided `<ol>` still 6.

**04-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2004.js`.

**04-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2004" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2004 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**04-P5 · Done when**  
36 keys write · dests 200 · 0 dest-field · existing 2004 specs green · no neighbor prefix leak · `itt04-thefacebook-networks` unmoved.

**Hard bans:** do not move `itt04-thefacebook-networks` · no 7th guided `<li>` · no dest-field “I read the 2004 period note” · no invented logos · no live models / ripped SWF / real payments · `itt04-*` only.

---

# 2008
**Thesis (locked):** [`2008-RESEARCH.md`](2008-RESEARCH.md) — App Store · Chrome · Android G1 · Hulu.  
**Star stays:** GitHub issue / App Store era · `itt08-github`.  
**Band:** B · 18→36.  
**Matrix on disk:** **36** writers (14 prior pack + 22 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2008
  → About · bans · dual-cite
  → ★ GitHub issue / App Store era
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt08-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt08-store` | query | `sites/appstore/index.html` | `sites/chrome/index.html` |
| P2 | `itt08-chrome-dl` | query | `sites/chrome/index.html` | `sites/android/index.html` |
| P3 | `itt08-hulu-ep` | query | `sites/hulu/index.html` | `sites/github/issue.html` |
| P4 | `itt08-gh-issue` | query | `sites/github/issue.html` | `sites/dropbox/index.html` |
| P5 | `itt08-spot-eu` | query | `sites/spotify/index.html` | `sites/stackoverflow/index.html` |
| P6 | `itt08-so` | query | `sites/stackoverflow/index.html` | `sites/posterous/index.html` |
| P7 | `itt08-posterous` | query | `sites/posterous/index.html` | `sites/grooveshark/index.html` |
| P8 | `itt08-groove` | query | `sites/grooveshark/index.html` | `sites/airbnb/index.html` |
| P9 | `itt08-abnb` | query | `sites/airbnb/index.html` | `sites/groupon/index.html` |
| P10 | `itt08-gfc` | query | `sites/friendconnect/index.html` | `sites/youtube/index.html` |
| P11 | `itt08-yt-hd` | query | `sites/youtube/index.html` | `sites/facebook/index.html` |
| P12 | `itt08-fb-con` | query | `sites/facebook/index.html` | `sites/iphone/index.html` |
| P13 | `itt08-3g` | query | `sites/iphone/index.html` | `sites/dropbox/about.html` |
| P14 | `itt08-db-about` | query | `sites/dropbox/about.html` | `sites/appstore/about.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Android Market leftover | `sites/android/index.html` | `itt08-g1-lx` | query | `sites/hulu/index.html` |
| N2 | Dropbox leftover folder | `sites/dropbox/index.html` | `itt08-db-lx` | query | `sites/spotify/index.html` |
| N3 | Groupon leftover deal | `sites/groupon/index.html` | `itt08-groupon-lx` | query | `sites/evernote/index.html` |
| N4 | Evernote leftover note | `sites/evernote/index.html` | `itt08-evernote-lx` | query | `sites/friendconnect/index.html` |
| N5 | Dropbox leftover 2× | `sites/dropbox/index.html` | `itt08-db2-lx` | query | `sites/hulu/index.html` |
| N6 | Hulu leftover 2× | `sites/hulu/index.html` | `itt08-hulu-lx` | query | `sites/spotify/index.html` |
| N7 | Spotify leftover 2× | `sites/spotify/index.html` | `itt08-sp-lx` | checks | `sites/stackoverflow/index.html` |
| N8 | Stack Overflow leftover 2× | `sites/stackoverflow/index.html` | `itt08-so-lx` | query | `sites/airbnb/index.html` |
| N9 | Airbnb leftover 2× | `sites/airbnb/index.html` | `itt08-ab-lx` | query | `sites/tumblr/index.html` |
| N10 | Tumblr leftover 2× | `sites/tumblr/index.html` | `itt08-tb-lx` | query | `sites/reddit/index.html` |
| N11 | Reddit leftover 2× | `sites/reddit/index.html` | `itt08-rd-lx` | query | `sites/android/index.html` |
| N12 | Android leftover 2× | `sites/android/index.html` | `itt08-and-lx` | checks | `sites/maps/index.html` |
| N13 | Maps leftover 2× | `sites/maps/index.html` | `itt08-maps-lx` | hops | `sites/docs/index.html` |
| N14 | Docs leftover 2× | `sites/docs/index.html` | `itt08-docs2-lx` | query | `sites/twitter/index.html` |
| N15 | Twitter leftover 2× | `sites/twitter/index.html` | `itt08-tw-lx` | query | `sites/youtube/index.html` |
| N16 | YouTube leftover 2× | `sites/youtube/index.html` | `itt08-yt-lx` | query | `sites/facebook/index.html` |
| N17 | Facebook leftover 2× | `sites/facebook/index.html` | `itt08-fb-lx` | query | `sites/ask/index.html` |
| N18 | Ask leftover 2× | `sites/ask/index.html` | `itt08-ask-lx` | query | `sites/groupon/index.html` |
| N19 | Groupon leftover 2× | `sites/groupon/index.html` | `itt08-gp-lx` | query | `sites/evernote/index.html` |
| N20 | Evernote leftover 2× | `sites/evernote/index.html` | `itt08-en-lx` | query | `sites/techcrunch/index.html` |
| N21 | TechCrunch leftover 2× | `sites/techcrunch/index.html` | `itt08-tc-lx` | query | `sites/chrome/index.html` |
| N22 | Chrome leftover 2× | `sites/chrome/index.html` | `itt08-ch-lx` | checks | `sites/github/index.html` |

### Phases

**08-P0 · Read first · 20 min · [x]**  
Open `2008-RESEARCH.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2008/sites`). Do not create folders. Do not move `itt08-github`.

**08-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 22 `-lx` writers on disk.

**08-P2 · Home strip · [x]**  
`years/2008/pages/home.html` · `<!-- ITT-2X-NEXT:2008 -->` below guided 6 · star chip `itt08-github` unmoved · guided `<ol>` still 6.

**08-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2008.js`.

**08-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2008" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2008 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**08-P5 · Done when**  
36 keys write · dests 200 · 0 dest-field · existing 2008 specs green · no neighbor prefix leak · `itt08-github` unmoved.

**Hard bans:** do not move `itt08-github` · no 7th guided `<li>` · no dest-field “I read the 2008 period note” · no invented logos · no live models / ripped SWF / real payments · `itt08-*` only.

---

# 2009
**Thesis (locked):** [`2009-READ-FIRST.md`](2009-READ-FIRST.md) — Like · FarmVille · Bing · 3GS. Lean door.  
**Star stays:** Facebook Like · `itt09-like`.  
**Band:** B · second-path · no mkdir.  
**Matrix on disk:** **36** writers (14 prior pack + 22 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2009
  → About · bans · dual-cite
  → ★ Facebook Like
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt09-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt09-like-2x` | hops | `sites/facebook/feed.html` | `sites/farmville/index.html` |
| P2 | `itt09-farm-2x` | query | `sites/farmville/index.html` | `sites/bing/index.html` |
| P3 | `itt09-bing-q` | query | `sites/bing/index.html` | `sites/foursquare/index.html` |
| P4 | `itt09-so-acc` | hops | `sites/mafiawars/index.html` | `sites/windows7/index.html` |
| P5 | `itt09-win7` | query | `sites/windows7/index.html` | `sites/omegle/index.html` |
| P6 | `itt09-omegle` | query | `sites/omegle/index.html` | `sites/chatroulette/index.html` |
| P7 | `itt09-cr` | query | `sites/chatroulette/index.html` | `sites/mafiawars/index.html` |
| P8 | `itt09-mw` | query | `sites/mafiawars/index.html` | `sites/wolframalpha/index.html` |
| P9 | `itt09-wa` | query | `sites/wolframalpha/index.html` | `sites/whatsapp/index.html` |
| P10 | `itt09-wa-ack` | query | `sites/whatsapp/index.html` | `sites/ubercab/index.html` |
| P11 | `itt09-uber-sf` | query | `sites/ubercab/index.html` | `sites/twitter/index.html` |
| P12 | `itt09-t140` | query | `sites/twitter/index.html` | `sites/youtube/index.html` |
| P13 | `itt09-yt` | query | `sites/youtube/index.html` | `sites/facebook/index.html` |
| P14 | `itt09-ie8` | query | `sites/youtube/index.html` | `sites/windows7/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Foursquare leftover venue | `sites/foursquare/index.html` | `itt09-4sq-lx` | query | `sites/kickstarter/index.html` |
| N2 | Kickstarter leftover $amt theater | `sites/kickstarter/index.html` | `itt09-ks-lx` | query | `sites/windows7/index.html` |
| N3 | Wave leftover invite | `sites/windows7/index.html` | `itt09-wave-lx` | query | `sites/windows7/index.html` |
| N4 | Chrome leftover (product room) | `sites/windows7/index.html` | `itt09-chrome-lx` | query | `sites/facebook/index.html` |
| N5 | Bing leftover 2× pack | `sites/bing/index.html` | `itt09-bing2-lx` | query | `sites/farmville/index.html` |
| N6 | FarmVille leftover 2× pack | `sites/farmville/index.html` | `itt09-fv2-lx` | hops | `sites/foursquare/index.html` |
| N7 | Foursquare leftover 2× pack | `sites/foursquare/index.html` | `itt09-4sq2-lx` | query | `sites/kickstarter/index.html` |
| N8 | Kickstarter leftover 2× pack | `sites/kickstarter/index.html` | `itt09-ks2-lx` | query | `sites/wolframalpha/index.html` |
| N9 | Wolfram leftover 2× pack | `sites/wolframalpha/index.html` | `itt09-wa2-lx` | query | `sites/chatroulette/index.html` |
| N10 | Chatroulette leftover 2× | `sites/chatroulette/index.html` | `itt09-cr-lx` | checks | `sites/omegle/index.html` |
| N11 | Omegle leftover 2× | `sites/omegle/index.html` | `itt09-og-lx` | checks | `sites/ubercab/index.html` |
| N12 | UberCab leftover 2× | `sites/ubercab/index.html` | `itt09-uber-lx` | query | `sites/whatsapp/index.html` |
| N13 | WhatsApp leftover 2× | `sites/whatsapp/index.html` | `itt09-wa-lx` | query | `sites/windows7/index.html` |
| N14 | Win7 leftover 2× | `sites/windows7/index.html` | `itt09-w7-lx` | checks | `sites/mafiawars/index.html` |
| N15 | Mafia Wars leftover 2× | `sites/mafiawars/index.html` | `itt09-mw-lx` | query | `sites/twitter/index.html` |
| N16 | Twitter leftover 2× | `sites/twitter/index.html` | `itt09-tw-lx` | query | `sites/youtube/index.html` |
| N17 | YouTube leftover 2× | `sites/youtube/index.html` | `itt09-yt-lx` | query | `sites/wikipedia/index.html` |
| N18 | Wikipedia leftover 2× | `sites/wikipedia/index.html` | `itt09-wk-lx` | query | `sites/appstore/index.html` |
| N19 | App Store leftover 2× | `sites/appstore/index.html` | `itt09-as-lx` | query | `sites/iphone/index.html` |
| N20 | iPhone leftover 2× | `sites/iphone/index.html` | `itt09-ip-lx` | checks | `sites/facebook/index.html` |
| N21 | Facebook leftover literacy | `sites/facebook/index.html` | `itt09-fb2-lx` | hops | `sites/bing/index.html` |
| N22 | Bing leftover literacy | `sites/bing/index.html` | `itt09-bing3-lx` | checks | `sites/facebook/index.html` |

### Phases

**09-P0 · Read first · 20 min · [x]**  
Open `2009-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2009/sites`). Do not create folders. Do not move `itt09-like`.

**09-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 22 `-lx` writers on disk.

**09-P2 · Home strip · [x]**  
`years/2009/pages/home.html` · `<!-- ITT-2X-NEXT:2009 -->` below guided 6 · star chip `itt09-like` unmoved · guided `<ol>` still 6.

**09-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2009.js`.

**09-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2009" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2009 --workers=1
```
Smoke `[x]` this pass for a named key in this year.

**09-P5 · Done when**  
36 keys write · dests 200 · 0 dest-field · existing 2009 specs green · no neighbor prefix leak · `itt09-like` unmoved.

**Hard bans:** do not move `itt09-like` · no 7th guided `<li>` · no dest-field “I read the 2009 period note” · no invented logos · no live models / ripped SWF / real payments · `itt09-*` only.

---

# 2010
**Thesis (locked):** [`2010-READ-FIRST.md`](2010-READ-FIRST.md) — Win7 · IE8 · iPad · Instagram iOS.  
**Star stays:** Instagram iOS filter → share · `itt10-ig`.  
**Band:** B · 18→36.  
**Matrix on disk:** **36** writers (15 prior pack + 21 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2010
  → About · bans · dual-cite
  → ★ Instagram iOS filter → share
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt10-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt10-ig-cap` | query | `sites/instagram/index.html` | `sites/ipad/order.html` |
| P2 | `itt10-ipad-ord` | query | `sites/ipad/order.html` | `sites/iphone/index.html` |
| P3 | `itt10-iphone4` | query | `sites/iphone/index.html` | `sites/facebook/cnn.html` |
| P4 | `itt10-og1` | query | `sites/facebook/cnn.html` | `sites/facebook/imdb.html` |
| P5 | `itt10-og2` | query | `sites/facebook/imdb.html` | `sites/farmville/index.html` |
| P6 | `itt10-farm-peak` | query | `sites/farmville/index.html` | `sites/foursquare/index.html` |
| P7 | `itt10-t140` | query | `sites/twitter/index.html` | `sites/youtube/index.html` |
| P8 | `itt10-yt` | query | `sites/youtube/index.html` | `sites/digg/index.html` |
| P9 | `itt10-digg-v4` | query | `sites/digg/index.html` | `sites/groupon/index.html` |
| P10 | `itt10-groupon` | query | `sites/groupon/index.html` | `sites/quora/index.html` |
| P11 | `itt10-quora` | query | `sites/quora/index.html` | `sites/uber/index.html` |
| P12 | `itt10-uber-sf` | query | `sites/uber/index.html` | `sites/wave/index.html` |
| P13 | `itt10-wave-fun` | query | `sites/wave/index.html` | `sites/browserchoice/index.html` |
| P14 | `itt10-ballot` | hops | `sites/browserchoice/index.html` | `sites/wikileaks/index.html` |
| P15 | `itt10-wl` | query | `sites/wikileaks/index.html` | `sites/instagram/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Foursquare leftover check-in | `sites/foursquare/index.html` | `itt10-4sq-lx` | query | `sites/imgur/index.html` |
| N2 | Imgur leftover title | `sites/imgur/index.html` | `itt10-imgur-lx` | query | `sites/pinterest/index.html` |
| N3 | Pinterest leftover two pins | `sites/pinterest/index.html` | `itt10-pin-lx` | hops | `sites/twitter/index.html` |
| N4 | Android leftover 2× | `sites/android/index.html` | `itt10-and-lx` | query | `sites/chrome/index.html` |
| N5 | Chrome leftover 2× | `sites/chrome/index.html` | `itt10-ch-lx` | query | `sites/dropbox/index.html` |
| N6 | Dropbox leftover 2× | `sites/dropbox/index.html` | `itt10-db-lx` | query | `sites/facetime/index.html` |
| N7 | FaceTime leftover 2× | `sites/facetime/index.html` | `itt10-ft-lx` | query | `sites/farmnote/index.html` |
| N8 | Farm leftover 2× | `sites/farmnote/index.html` | `itt10-fn-lx` | query | `sites/formspring/index.html` |
| N9 | Formspring leftover 2× | `sites/formspring/index.html` | `itt10-fs-lx` | query | `sites/gmailtab/index.html` |
| N10 | Gmail leftover 2× | `sites/gmailtab/index.html` | `itt10-gm-lx` | query | `sites/groupondeal/index.html` |
| N11 | Groupon leftover 2× | `sites/groupondeal/index.html` | `itt10-gp-lx` | query | `sites/hulustream/index.html` |
| N12 | Hulu leftover 2× | `sites/hulustream/index.html` | `itt10-hu-lx` | query | `sites/ie9/index.html` |
| N13 | IE9 leftover 2× | `sites/ie9/index.html` | `itt10-ie-lx` | query | `sites/instant/index.html` |
| N14 | Instant leftover 2× | `sites/instant/index.html` | `itt10-in-lx` | query | `sites/kickstarter/index.html` |
| N15 | Kickstarter leftover 2× | `sites/kickstarter/index.html` | `itt10-ks-lx` | query | `sites/netflix/index.html` |
| N16 | Netflix leftover 2× | `sites/netflix/index.html` | `itt10-nf-lx` | query | `sites/quorawait/index.html` |
| N17 | Quora leftover 2× | `sites/quorawait/index.html` | `itt10-qu-lx` | query | `sites/reddit/index.html` |
| N18 | Reddit leftover 2× | `sites/reddit/index.html` | `itt10-rd-lx` | query | `sites/spotifyeu/index.html` |
| N19 | Spotify leftover 2× | `sites/spotifyeu/index.html` | `itt10-sp-lx` | query | `sites/tumblr/index.html` |
| N20 | Tumblr leftover 2× | `sites/tumblr/index.html` | `itt10-tb-lx` | query | `sites/wave/index.html` |
| N21 | Wave leftover 2× | `sites/wave/index.html` | `itt10-wv-lx` | query | `sites/instagram/index.html` |

### Phases

**10-P0 · Read first · 20 min · [x]**  
Open `2010-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2010/sites`). Do not create folders. Do not move `itt10-ig`.

**10-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 21 `-lx` writers on disk.

**10-P2 · Home strip · [x]**  
`years/2010/pages/home.html` · `<!-- ITT-2X-NEXT:2010 -->` below guided 6 · star chip `itt10-ig` unmoved · guided `<ol>` still 6.

**10-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2010.js`.

**10-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2010" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2010 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**10-P5 · Done when**  
36 keys write · dests 200 · 0 dest-field · existing 2010 specs green · no neighbor prefix leak · `itt10-ig` unmoved.

**Hard bans:** do not move `itt10-ig` · no 7th guided `<li>` · no dest-field “I read the 2010 period note” · no invented logos · no live models / ripped SWF / real payments · `itt10-*` only.

---

# 2011
**Thesis (locked):** [`2011-READ-FIRST.md`](2011-READ-FIRST.md) — Google+ · Spotify US · Siri. Lean door.  
**Star stays:** Google+ · `itt11-gplus`.  
**Band:** B · 18→36.  
**Matrix on disk:** **35** writers (15 prior pack + 20 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2011
  → About · bans · dual-cite
  → ★ Google+
  → 35 leftover REAL dests (incomplete never writes)
  → Exit · itt11-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt11-hang` | query | `sites/googleplus/hangouts.html` | `sites/googleplus/index.html` |
| P2 | `itt11-circles` | query | `sites/googleplus/index.html` | `sites/spotify/index.html` |
| P3 | `itt11-spot-us` | query | `sites/spotify/index.html` | `sites/iphone/index.html` |
| P4 | `itt11-siri` | query | `sites/iphone/index.html` | `sites/facebook/index.html` |
| P5 | `itt11-qwik` | query | `sites/netflix/index.html` | `sites/snapchat/index.html` |
| P6 | `itt11-snap` | query | `sites/snapchat/index.html` | `sites/instagram/index.html` |
| P7 | `itt11-ig` | query | `sites/instagram/index.html` | `sites/tumblr/index.html` |
| P8 | `itt11-reblog` | query | `sites/tumblr/index.html` | `sites/airbnb/index.html` |
| P9 | `itt11-air` | query | `sites/airbnb/index.html` | `sites/twitter/index.html` |
| P10 | `itt11-t140` | query | `sites/twitter/index.html` | `sites/youtube/index.html` |
| P11 | `itt11-yt` | query | `sites/youtube/index.html` | `sites/icloud/index.html` |
| P12 | `itt11-icloud` | query | `sites/icloud/index.html` | `sites/ie9/index.html` |
| P13 | `itt11-ie9` | query | `sites/ie9/index.html` | `sites/linkedin/index.html` |
| P14 | `itt11-li` | query | `sites/linkedin/index.html` | `sites/pinterest/index.html` |
| P15 | `itt11-ghost` | query | `sites/snapghost/index.html` | `sites/googleplus/hangouts.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Timeline leftover two boxes | `sites/facebook/index.html` | `itt11-timeline-lx` | query | `sites/ipad/index.html` |
| N2 | iPad 2 leftover cameras | `sites/ipad/index.html` | `itt11-ipad2-lx` | query | `sites/netflix/index.html` |
| N3 | Pinterest leftover two pins | `sites/pinterest/index.html` | `itt11-pin-lx` | hops | `sites/snapghost/index.html` |
| N4 | Dropbox leftover 2× | `sites/dropbox11/index.html` | `itt11-db-lx` | query | `sites/groupon11/index.html` |
| N5 | Groupon leftover 2× | `sites/groupon11/index.html` | `itt11-gp-lx` | query | `sites/hangnote/index.html` |
| N6 | Hangout leftover 2× | `sites/hangnote/index.html` | `itt11-hg-lx` | query | `sites/ie9note/index.html` |
| N7 | IE9 leftover 2× | `sites/ie9note/index.html` | `itt11-ie-lx` | query | `sites/ipad2cam/index.html` |
| N8 | iPad 2 leftover 2× | `sites/ipad2cam/index.html` | `itt11-ip2-lx` | query | `sites/netflix11/index.html` |
| N9 | Netflix leftover 2× | `sites/netflix11/index.html` | `itt11-nf-lx` | query | `sites/qwiknote/index.html` |
| N10 | Qwikster leftover 2× | `sites/qwiknote/index.html` | `itt11-qw-lx` | query | `sites/qwikster/index.html` |
| N11 | Qwikster dest leftover 2× | `sites/qwikster/index.html` | `itt11-qw2-lx` | checks | `sites/sirileftover/index.html` |
| N12 | Siri leftover 2× | `sites/sirileftover/index.html` | `itt11-si-lx` | query | `sites/twitternote/index.html` |
| N13 | Twitter leftover 2× | `sites/twitternote/index.html` | `itt11-tw-lx` | query | `sites/icloud/index.html` |
| N14 | iCloud leftover 2× pack | `sites/icloud/index.html` | `itt11-ic-lx` | query | `sites/snapchat/index.html` |
| N15 | Snap leftover 2× pack | `sites/snapchat/index.html` | `itt11-sc-lx` | query | `sites/spotify/index.html` |
| N16 | Spotify leftover 2× pack | `sites/spotify/index.html` | `itt11-sp-lx` | query | `sites/airbnb/index.html` |
| N17 | Airbnb leftover 2× pack | `sites/airbnb/index.html` | `itt11-ab-lx` | query | `sites/linkedin/index.html` |
| N18 | LinkedIn leftover 2× pack | `sites/linkedin/index.html` | `itt11-li-lx` | query | `sites/tumblr/index.html` |
| N19 | Tumblr leftover 2× pack | `sites/tumblr/index.html` | `itt11-tb-lx` | query | `sites/youtube/index.html` |
| N20 | YouTube leftover 2× pack | `sites/youtube/index.html` | `itt11-yt-lx` | query | `sites/googleplus/index.html` |

### Phases

**11-P0 · Read first · 20 min · [x]**  
Open `2011-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2011/sites`). Do not create folders. Do not move `itt11-gplus`.

**11-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 20 `-lx` writers on disk.

**11-P2 · Home strip · [x]**  
`years/2011/pages/home.html` · `<!-- ITT-2X-NEXT:2011 -->` below guided 6 · star chip `itt11-gplus` unmoved · guided `<ol>` still 6.

**11-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2011.js`.

**11-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2011" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2011 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**11-P5 · Done when**  
35 keys write · dests 200 · 0 dest-field · existing 2011 specs green · no neighbor prefix leak · `itt11-gplus` unmoved.

**Hard bans:** do not move `itt11-gplus` · no 7th guided `<li>` · no dest-field “I read the 2011 period note” · no invented logos · no live models / ripped SWF / real payments · `itt11-*` only.

---

# 2012
**Thesis (locked):** [`2012-READ-FIRST.md`](2012-READ-FIRST.md) — IG Android · IPO $38 · SOPA. Lean.  
**Star stays:** Instagram Android · `itt12-ig-android`.  
**Band:** B · 18→36.  
**Matrix on disk:** **35** writers (8 prior pack + 27 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass leftover 4× writers on rooms that **already exist**. Next on the last leftover lands on the star. Incomplete never writes.

**Visitor outcome**

```
Hub → 2012
  → About · bans · dual-cite
  → ★ Instagram Android
  → 35 leftover REAL dests (incomplete never writes)
  → Exit · itt12-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt12-medium-more` | query | `sites/medium/more.html` | `sites/instagram/android.html` |
| P2 | `itt12-path-more` | query | `sites/path/more.html` | `sites/instagram/android.html` |
| P3 | `itt12-flip-more` | query | `sites/flipboard/more.html` | `sites/instagram/android.html` |
| P4 | `itt12-tinder-more` | query | `sites/tinder/more.html` | `sites/instagram/android.html` |
| P5 | `itt12-waze-more` | query | `sites/waze/more.html` | `sites/instagram/android.html` |
| P6 | `itt12-trello-more` | query | `sites/trello/more.html` | `sites/instagram/android.html` |
| P7 | `itt12-buzz-more` | query | `sites/buzzfeed/more.html` | `sites/instagram/android.html` |
| P8 | `itt12-lyft-more` | query | `sites/lyft/more.html` | `sites/instagram/android.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | IG leftover literacy | `sites/instagram/index.html` | `itt12-ig-lx` | query | `sites/facebook/ipo.html` |
| N2 | Facebook IPO leftover | `sites/facebook/ipo.html` | `itt12-ipo-lx` | query | `sites/pinterest/index.html` |
| N3 | Pinterest leftover 2× | `sites/pinterest/index.html` | `itt12-pin-lx` | query | `sites/windows8/index.html` |
| N4 | Win8 leftover 2× | `sites/windows8/index.html` | `itt12-w8-lx` | query | `sites/soundcloud/index.html` |
| N5 | SoundCloud leftover 2× | `sites/soundcloud/index.html` | `itt12-sc-lx` | query | `sites/youtube/index.html` |
| N6 | YouTube leftover 2× | `sites/youtube/index.html` | `itt12-yt-lx` | query | `sites/wikipedia/index.html` |
| N7 | SOPA leftover | `sites/wikipedia/index.html` | `itt12-wk-lx` | query | `sites/tinder/index.html` |
| N8 | Tinder leftover 2× | `sites/tinder/index.html` | `itt12-td-lx` | query | `sites/uber/index.html` |
| N9 | Uber leftover 2× | `sites/uber/index.html` | `itt12-ub-lx` | query | `sites/vinewait/index.html` |
| N10 | Vine wait leftover | `sites/vinewait/index.html` | `itt12-vw-lx` | query | `sites/instagram/android.html` |
| N11 | Medium leftover 2× pack | `sites/medium/index.html` | `itt12-md2-lx` | query | `sites/path/index.html` |
| N12 | Path leftover 2× | `sites/path/index.html` | `itt12-path-lx` | query | `sites/flipboard/index.html` |
| N13 | Flipboard leftover 2× | `sites/flipboard/index.html` | `itt12-flip-lx` | query | `sites/waze/index.html` |
| N14 | Waze leftover 2× | `sites/waze/index.html` | `itt12-wz-lx` | query | `sites/trello/index.html` |
| N15 | Trello leftover 2× | `sites/trello/index.html` | `itt12-tr-lx` | query | `sites/buzzfeed/index.html` |
| N16 | BuzzFeed leftover 2× | `sites/buzzfeed/index.html` | `itt12-bz-lx` | query | `sites/lyft/index.html` |
| N17 | Lyft leftover 2× | `sites/lyft/index.html` | `itt12-ly-lx` | query | `sites/kindlefire/index.html` |
| N18 | Kindle Fire leftover 2× | `sites/kindlefire/index.html` | `itt12-kf-lx` | query | `sites/googledrive/index.html` |
| N19 | Drive leftover 2× | `sites/googledrive/index.html` | `itt12-gd-lx` | query | `sites/drivebox/index.html` |
| N20 | Drive box leftover 2× | `sites/drivebox/index.html` | `itt12-gdb-lx` | query | `sites/windows8/index.html` |
| N21 | Windows8 leftover 2× | `sites/windows8/index.html` | `itt12-w8b-lx` | checks | `sites/tumblr12/index.html` |
| N22 | Tumblr leftover 2× | `sites/tumblr12/index.html` | `itt12-tb12-lx` | query | `sites/twnote12/index.html` |
| N23 | Twitter leftover 2× | `sites/twnote12/index.html` | `itt12-tw12-lx` | query | `sites/ytnote12/index.html` |
| N24 | YouTube leftover 2× | `sites/ytnote12/index.html` | `itt12-yt12-lx` | query | `sites/pinabout/index.html` |
| N25 | Pinterest about leftover 2× | `sites/pinabout/index.html` | `itt12-pina-lx` | query | `sites/igabout/index.html` |
| N26 | IG about leftover 2× | `sites/igabout/index.html` | `itt12-iga-lx` | query | `sites/ipoabout/index.html` |
| N27 | IPO about leftover 2× | `sites/ipoabout/index.html` | `itt12-ipoa-lx` | query | `sites/instagram/android.html` |

### Phases

**12-P0 · Read first · 20 min · [x]**  
Open `2012-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2012/sites`). Do not create folders. Do not move `itt12-ig-android`.

**12-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 27 `-lx` writers on disk.

**12-P2 · Home strip · [x]**  
`years/2012/pages/home.html` · `<!-- ITT-2X-NEXT:2012 -->` below guided 6 · star chip `itt12-ig-android` unmoved · guided `<ol>` still 6.

**12-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2012.js`.

**12-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2012" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2012 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**12-P5 · Done when**  
35 keys write · dests 200 · 0 dest-field · existing 2012 specs green · no neighbor prefix leak · `itt12-ig-android` unmoved.

**Hard bans:** do not move `itt12-ig-android` · no 7th guided `<li>` · no dest-field “I read the 2012 period note” · no invented logos · no live models / ripped SWF / real payments · `itt12-*` only.

---

# 2013
**Thesis (locked):** [`2013-READ-FIRST.md`](2013-READ-FIRST.md) — Vine 6s · iOS 7 · Stories. Lean.  
**Star stays:** Vine 6s · `itt13-vine-posts`.  
**Band:** B · lean · some slugs missing.  
**Matrix on disk:** **27** writers (0 prior pack + 27 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass `-lx` writers on rooms that exist. Lean tree does not have 36 leftover slugs — **do not invent folders**. Next on last leftover lands on the star.

**Visitor outcome**

```
Hub → 2013
  → About · bans · dual-cite
  → ★ Vine 6s
  → 27 leftover REAL dests (incomplete never writes)
  → Exit · itt13-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Vine leftover second hold | `sites/vine/record.html` | `itt13-vn-lx` | query | `sites/instagram/video.html` |
| N2 | iOS 7 leftover flat note | `sites/iphone/ios7.html` | `itt13-ios7-lx` | query | `sites/snapchat/story.html` |
| N3 | Stories leftover 24h note | `sites/snapchat/story.html` | `itt13-st-lx` | query | `sites/snowden/index.html` |
| N4 | Snowden leftover literacy | `sites/snowden/index.html` | `itt13-sn-lx` | query | `sites/telegram/index.html` |
| N5 | Telegram leftover chat note | `sites/telegram/index.html` | `itt13-tg-lx` | query | `sites/tumblr/index.html` |
| N6 | Yahoo×Tumblr leftover note | `sites/tumblr/index.html` | `itt13-tb-lx` | query | `sites/vine/record.html` |
| N7 | Ask.fm leftover | `sites/askfm/index.html` | `itt13-ask-lx` | query | `sites/whisper/index.html` |
| N8 | Whisper leftover | `sites/whisper/index.html` | `itt13-wh-lx` | query | `sites/youtube/index.html` |
| N9 | YouTube leftover | `sites/youtube/index.html` | `itt13-yt-lx` | query | `sites/healthcare/index.html` |
| N10 | Healthcare.gov leftover | `sites/healthcare/index.html` | `itt13-hc-lx` | query | `sites/xboxone/index.html` |
| N11 | Xbox One leftover | `sites/xboxone/index.html` | `itt13-xb-lx` | query | `sites/ouya/index.html` |
| N12 | OUYA leftover | `sites/ouya/index.html` | `itt13-oy-lx` | query | `sites/medium/index.html` |
| N13 | Medium leftover | `sites/medium/index.html` | `itt13-md-lx` | query | `sites/facebook/index.html` |
| N14 | Facebook leftover | `sites/facebook/index.html` | `itt13-fb-lx` | query | `sites/twitter/index.html` |
| N15 | Twitter leftover | `sites/twitter/index.html` | `itt13-tw-lx` | query | `sites/tumblr13/index.html` |
| N16 | Tumblr leftover 2× | `sites/tumblr13/index.html` | `itt13-tb2-lx` | query | `sites/windows81/index.html` |
| N17 | Win8.1 leftover | `sites/windows81/index.html` | `itt13-w81-lx` | query | `sites/vine/index.html` |
| N18 | Vine leftover literacy | `sites/vine/index.html` | `itt13-vine-lx` | query | `sites/vine/record.html` |
| N19 | Chrome leftover 2× | `sites/chrome/index.html` | `itt13-ch-lx` | query | `sites/instagram/index.html` |
| N20 | Reddit leftover 2× | `sites/reddit/index.html` | `itt13-rd-lx` | query | `sites/snapabout/index.html` |
| N21 | Snap leftover 2× | `sites/snapabout/index.html` | `itt13-sna-lx` | query | `sites/teleabout/index.html` |
| N22 | Telegram leftover 2× | `sites/teleabout/index.html` | `itt13-tla-lx` | query | `sites/touchabout/index.html` |
| N23 | Touch ID leftover 2× | `sites/touchabout/index.html` | `itt13-tid-lx` | query | `sites/vineabout/index.html` |
| N24 | Vineabout leftover 2× | `sites/vineabout/index.html` | `itt13-vina-lx` | checks | `sites/snowden/index.html` |
| N25 | Win8.1 leftover 2× pack | `sites/windows81/index.html` | `itt13-w81b-lx` | query | `sites/twitter/index.html` |
| N26 | Twitter leftover 2× pack | `sites/twitter/index.html` | `itt13-twb-lx` | query | `sites/youtube/index.html` |
| N27 | YouTube leftover 2× pack | `sites/youtube/index.html` | `itt13-ytb-lx` | query | `sites/vine/index.html` |

### Phases

**13-P0 · Read first · 20 min · [x]**  
Open `2013-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2013/sites`). Do not create folders. Do not move `itt13-vine-posts`.

**13-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 27 `-lx` writers on disk.

**13-P2 · Home strip · [x]**  
`years/2013/pages/home.html` · `<!-- ITT-2X-NEXT:2013 -->` below guided 6 · star chip `itt13-vine-posts` unmoved · guided `<ol>` still 6.

**13-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2013.js`.

**13-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2013" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2013 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**13-P5 · Done when**  
27 keys write · dests 200 · 0 dest-field · existing 2013 specs green · no neighbor prefix leak · `itt13-vine-posts` unmoved. Do not invent folders to force 36.

**Hard bans:** do not move `itt13-vine-posts` · no 7th guided `<li>` · no dest-field “I read the 2013 period note” · no invented logos · no live models / ripped SWF / real payments · `itt13-*` only.

---

# 2014
**Thesis (locked):** [`2014-READ-FIRST.md`](2014-READ-FIRST.md) — WhatsApp Install · Heartbleed. Lean.  
**Star stays:** WhatsApp Install · `itt14-wa-install`.  
**Band:** B · lean.  
**Matrix on disk:** **30** writers (0 prior pack + 30 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass `-lx` writers on rooms that exist. Lean tree does not have 36 leftover slugs — **do not invent folders**. Next on last leftover lands on the star.

**Visitor outcome**

```
Hub → 2014
  → About · bans · dual-cite
  → ★ WhatsApp Install
  → 30 leftover REAL dests (incomplete never writes)
  → Exit · itt14-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | WhatsApp leftover second note | `sites/whatsapp/index.html` | `itt14-wa-lx` | query | `sites/heartbleed/index.html` |
| N2 | Heartbleed leftover second rotate | `sites/heartbleed/index.html` | `itt14-hb-lx` | query | `sites/icebucket/index.html` |
| N3 | Ice Bucket leftover second name | `sites/icebucket/index.html` | `itt14-ice-lx` | query | `sites/iphone/index.html` |
| N4 | iPhone 6 leftover second size | `sites/iphone/index.html` | `itt14-ip-lx` | query | `sites/slack/index.html` |
| N5 | Slack leftover second channel | `sites/slack/index.html` | `itt14-sl-lx` | query | `sites/twitch/index.html` |
| N6 | Twitch leftover second stream | `sites/twitch/index.html` | `itt14-tw-lx` | query | `sites/whatsapp/index.html` |
| N7 | WhatsApp chat leftover | `sites/whatsapp/chat.html` | `itt14-chat-lx` | query | `sites/iphone/index.html` |
| N8 | Slack leftover 2× | `sites/slackabout/index.html` | `itt14-sl2-lx` | query | `sites/twitchabout/index.html` |
| N9 | Twitch leftover 2× | `sites/twitchabout/index.html` | `itt14-tw2-lx` | query | `sites/swarm/index.html` |
| N10 | Swarm leftover | `sites/swarm/index.html` | `itt14-sw-lx` | query | `sites/giphy/index.html` |
| N11 | Giphy leftover | `sites/giphy/index.html` | `itt14-gi-lx` | query | `sites/material/index.html` |
| N12 | Material leftover | `sites/material/index.html` | `itt14-mat-lx` | query | `sites/alipay/index.html` |
| N13 | Alipay leftover | `sites/alipay/index.html` | `itt14-ali-lx` | query | `sites/uber/index.html` |
| N14 | Uber leftover | `sites/uber/index.html` | `itt14-ub-lx` | query | `sites/facebook/index.html` |
| N15 | Facebook leftover | `sites/facebook/index.html` | `itt14-fb-lx` | query | `sites/youtube/index.html` |
| N16 | YouTube leftover | `sites/youtube/index.html` | `itt14-yt-lx` | query | `sites/wikipedia/index.html` |
| N17 | Wikipedia leftover | `sites/wikipedia/index.html` | `itt14-wk-lx` | query | `sites/whatsapp/index.html` |
| N18 | iPhone 6 leftover 2× | `sites/iphone6about/index.html` | `itt14-ip6-lx` | query | `sites/slackabout/index.html` |
| N19 | IG leftover 2× | `sites/instagram/index.html` | `itt14-ig-lx` | query | `sites/snapchat/index.html` |
| N20 | Snap leftover 2× | `sites/snapchat/index.html` | `itt14-sc-lx` | query | `sites/twitter/index.html` |
| N21 | Waabout leftover 2× | `sites/waabout/index.html` | `itt14-waa-lx` | checks | `sites/payabout/index.html` |
| N22 | Apple Pay leftover 2× | `sites/payabout/index.html` | `itt14-pay-lx` | query | `sites/materialabout/index.html` |
| N23 | Material leftover 2× pack | `sites/materialabout/index.html` | `itt14-mata-lx` | query | `sites/heartbleed/index.html` |
| N24 | Ice Bucket leftover 2× | `sites/icebucket/index.html` | `itt14-ib-lx` | query | `sites/iphone/index.html` |
| N25 | Twitch leftover 2× pack | `sites/twitch/index.html` | `itt14-twch-lx` | query | `sites/whatsapp/index.html` |
| N26 | Uber leftover 2× pack | `sites/uber/index.html` | `itt14-ub2-lx` | query | `sites/facebook/index.html` |
| N27 | Facebook leftover 2× pack | `sites/facebook/index.html` | `itt14-fb2-lx` | query | `sites/youtube/index.html` |
| N28 | YouTube leftover 2× pack | `sites/youtube/index.html` | `itt14-yt2-lx` | query | `sites/wikipedia/index.html` |
| N29 | Wikipedia leftover 2× pack | `sites/wikipedia/index.html` | `itt14-wk2-lx` | query | `sites/giphy/index.html` |
| N30 | Giphy leftover 2× pack | `sites/giphy/index.html` | `itt14-gi2-lx` | query | `sites/whatsapp/index.html` |

### Phases

**14-P0 · Read first · 20 min · [x]**  
Open `2014-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2014/sites`). Do not create folders. Do not move `itt14-wa-install`.

**14-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 30 `-lx` writers on disk.

**14-P2 · Home strip · [x]**  
`years/2014/pages/home.html` · `<!-- ITT-2X-NEXT:2014 -->` below guided 6 · star chip `itt14-wa-install` unmoved · guided `<ol>` still 6.

**14-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2014.js`.

**14-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2014" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2014 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**14-P5 · Done when**  
30 keys write · dests 200 · 0 dest-field · existing 2014 specs green · no neighbor prefix leak · `itt14-wa-install` unmoved. Do not invent folders to force 36.

**Hard bans:** do not move `itt14-wa-install` · no 7th guided `<li>` · no dest-field “I read the 2014 period note” · no invented logos · no live models / ripped SWF / real payments · `itt14-*` only.

---

# 2015
**Thesis (locked):** [`2015-READ-FIRST.md`](2015-READ-FIRST.md) — Periscope Go LIVE. Lean.  
**Star stays:** Periscope · `itt15-periscope`.  
**Band:** C · already 36 · about-rooms leftover.  
**Matrix on disk:** **36** writers (31 prior pack + 5 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2015
  → About · bans · dual-cite
  → ★ Periscope
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt15-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt15-peri-title` | query | `sites/periscope/index.html` | `sites/googlephotos/index.html` |
| P2 | `itt15-gp` | query | `sites/googlephotos/index.html` | `sites/windows10/index.html` |
| P3 | `itt15-am` | query | `sites/applemusic/index.html` | `sites/edge/index.html` |
| P4 | `itt15-block` | query | `sites/ios9/blockers.html` | `sites/snapchat/discover.html` |
| P5 | `itt15-discover` | hops | `sites/snapchat/discover.html` | `sites/discord/index.html` |
| P6 | `itt15-dc` | query | `sites/discord/index.html` | `sites/echo/index.html` |
| P7 | `itt15-meerkat` | query | `sites/meerkat/index.html` | `sites/fblive/index.html` |
| P8 | `itt15-fblive` | query | `sites/fblive/index.html` | `sites/spotify/index.html` |
| P9 | `itt15-spot` | query | `sites/spotify/index.html` | `sites/netflix/index.html` |
| P10 | `itt15-nf` | query | `sites/netflix/index.html` | `sites/instagram/index.html` |
| P11 | `itt15-ig` | query | `sites/instagram/index.html` | `sites/win10get/index.html` |
| P12 | `itt15-gw10` | query | `sites/win10get/index.html` | `sites/meerkatlive/index.html` |
| P13 | `itt15-meerkat-live` | query | `sites/meerkatlive/index.html` | `sites/periscope/watch.html` |
| P14 | `itt15-peri-w` | query | `sites/periscope/watch.html` | `sites/googlephotos/library.html` |
| P15 | `itt15-gp-lib` | query | `sites/googlephotos/library.html` | `sites/windows10/upgrade.html` |
| P16 | `itt15-w10-up` | query | `sites/windows10/upgrade.html` | `sites/applemusic/beats1.html` |
| P17 | `itt15-beats1` | query | `sites/applemusic/beats1.html` | `sites/applemusicsub/index.html` |
| P18 | `itt15-am-sub` | query | `sites/applemusicsub/index.html` | `sites/apple/faces.html` |
| P19 | `itt15-faces` | query | `sites/apple/faces.html` | `sites/apple/pair.html` |
| P20 | `itt15-pair` | query | `sites/apple/pair.html` | `sites/snapchat/index.html` |
| P21 | `itt15-snap-h` | query | `sites/snapchat/index.html` | `sites/playable/extra-a.html` |
| P22 | `itt15-xa` | query | `sites/playable/extra-a.html` | `sites/playable/extra-b.html` |
| P23 | `itt15-xb` | query | `sites/playable/extra-b.html` | `sites/playable/extra-c.html` |
| P24 | `itt15-xc` | query | `sites/playable/extra-c.html` | `sites/playable/extra-d.html` |
| P25 | `itt15-xd` | query | `sites/playable/extra-d.html` | `sites/playable/extra-e.html` |
| P26 | `itt15-xe` | query | `sites/playable/extra-e.html` | `sites/playable/game-2.html` |
| P27 | `itt15-g2` | query | `sites/playable/game-2.html` | `sites/playable/index.html` |
| P28 | `itt15-cab` | query | `sites/playable/index.html` | `sites/playable/famous.html` |
| P29 | `itt15-fam-2` | query | `sites/playable/famous.html` | `sites/ios9/blockers.html` |
| P30 | `itt15-block-2` | query | `sites/ios9/blockers.html` | `sites/letsencrypt/index.html` |
| P31 | `itt15-le-2` | query | `sites/letsencrypt/index.html` | `sites/periscope/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Win10 leftover reserve | `sites/windows10/index.html` | `itt15-win10-lx` | query | `sites/applemusic/index.html` |
| N2 | Edge Spartan leftover (not Chromium) | `sites/edge/index.html` | `itt15-edge-lx` | query | `sites/letsencrypt/index.html` |
| N3 | Let's Encrypt leftover domain | `sites/letsencrypt/index.html` | `itt15-le-lx` | query | `sites/ios9/blockers.html` |
| N4 | Echo leftover order literacy | `sites/echo/index.html` | `itt15-echo-lx` | query | `sites/apple/watch.html` |
| N5 | Watch leftover (not the chip) | `sites/apple/watch.html` | `itt15-watch-lx` | query | `sites/meerkat/index.html` |

### Phases

**15-P0 · Read first · 20 min · [x]**  
Open `2015-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2015/sites`). Do not create folders. Do not move `itt15-periscope`.

**15-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**15-P2 · Home strip · [ ]**  
`years/2015/pages/home.html` · `<!-- ITT-2X-NEXT:2015 -->` below guided 6 · star chip `itt15-periscope` unmoved · guided `<ol>` still 6.

**15-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2015.js`.

**15-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2015" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2015 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**15-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt15-periscope` unmoved. Guided 6.

**Hard bans:** do not move `itt15-periscope` · no 7th guided `<li>` · no dest-field “I read the 2015 period note” · no invented logos · no live models / ripped SWF / real payments · `itt15-*` only.

### Band C leftover (do not start unless named)

`adblock` · `amppage` · `discordabout` · `discoverabout` · `edgeabout` · `leabout` · `periabout` leftover ≠ Periscope gold · `photosabout` · `watchabout`

**15-C0 · Freeze · `[x]`** Confirm each slug exists and has **zero** `data-4x-go`. Skip playable. Skip gold dest.  
**15-C1 · One writer per leftover about-room · `[x]`** `scripts/implement-2x-remaining-real.py` · suffix `-rlx`.  
**15-C2 · Home list append · `[x]`** `ITT-2X-REMAIN:2015` · not a 7th guided step.  
**15-C3 · e2e the new keys only · `[x]`** `itt15-adblock-rlx` passed.

---

# 2016
**Thesis (locked):** [`2016-READ-FIRST.md`](2016-READ-FIRST.md) — Instagram Stories. Lean.  
**Star stays:** IG Stories · `itt16-ig-stories`.  
**Band:** C · already 36.  
**Matrix on disk:** **36** writers (29 prior pack + 7 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2016
  → About · bans · dual-cite
  → ★ IG Stories
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt16-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt16-story` | query | `sites/instagram/stories.html` | `sites/pokemongo/index.html` |
| P2 | `itt16-react` | hops | `sites/facebook/reactions.html` | `sites/whatsapp/e2e.html` |
| P3 | `itt16-specs` | query | `sites/snapchat/spectacles.html` | `sites/musically/index.html` |
| P4 | `itt16-mly` | query | `sites/musically/index.html` | `sites/windows10/end.html` |
| P5 | `itt16-slack` | query | `sites/slack/index.html` | `sites/reddit/index.html` |
| P6 | `itt16-reddit` | hops | `sites/reddit/index.html` | `sites/netflix/index.html` |
| P7 | `itt16-nf` | query | `sites/netflix/index.html` | `sites/youtube/index.html` |
| P8 | `itt16-yt` | query | `sites/youtube/index.html` | `sites/fblive/index.html` |
| P9 | `itt16-fblive` | query | `sites/fblive/index.html` | `sites/moments/index.html` |
| P10 | `itt16-moments` | query | `sites/moments/index.html` | `sites/iphone/airpods.html` |
| P11 | `itt16-gym` | query | `sites/playable/game.html` | `sites/instagram/archive.html` |
| P12 | `itt16-ig-arch` | query | `sites/instagram/archive.html` | `sites/vine/index.html` |
| P13 | `itt16-vine-h` | query | `sites/vine/index.html` | `sites/snapchat/index.html` |
| P14 | `itt16-snap-h` | query | `sites/snapchat/index.html` | `sites/playable/extra-a.html` |
| P15 | `itt16-xa` | query | `sites/playable/extra-a.html` | `sites/playable/extra-b.html` |
| P16 | `itt16-xb` | query | `sites/playable/extra-b.html` | `sites/playable/extra-c.html` |
| P17 | `itt16-xc` | query | `sites/playable/extra-c.html` | `sites/playable/extra-d.html` |
| P18 | `itt16-xd` | query | `sites/playable/extra-d.html` | `sites/playable/extra-e.html` |
| P19 | `itt16-xe` | query | `sites/playable/extra-e.html` | `sites/playable/index.html` |
| P20 | `itt16-cab` | query | `sites/playable/index.html` | `sites/facebook/reactions.html` |
| P21 | `itt16-react-2` | query | `sites/facebook/reactions.html` | `sites/pokemongo/index.html` |
| P22 | `itt16-pogo-2` | query | `sites/pokemongo/index.html` | `sites/musically/index.html` |
| P23 | `itt16-mly-2` | query | `sites/musically/index.html` | `sites/slack/index.html` |
| P24 | `itt16-slack-2` | query | `sites/slack/index.html` | `sites/youtube/index.html` |
| P25 | `itt16-yt-2` | query | `sites/youtube/index.html` | `sites/netflix/index.html` |
| P26 | `itt16-nf-2` | query | `sites/netflix/index.html` | `sites/moments/index.html` |
| P27 | `itt16-mom-2` | query | `sites/moments/index.html` | `sites/whatsapp/e2e.html` |
| P28 | `itt16-wa-2` | query | `sites/whatsapp/e2e.html` | `sites/windows10/end.html` |
| P29 | `itt16-w10e-2` | query | `sites/windows10/end.html` | `sites/instagram/stories.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Pokémon GO leftover team | `sites/pokemongo/index.html` | `itt16-pogo-lx` | query | `sites/facebook/reactions.html` |
| N2 | WhatsApp E2E leftover | `sites/whatsapp/e2e.html` | `itt16-wa-e2e-lx` | query | `sites/iphone/index.html` |
| N3 | iPhone 7 leftover no-jack | `sites/iphone/index.html` | `itt16-iphone7-lx` | query | `sites/vine/goodbye.html` |
| N4 | Vine leftover dying | `sites/vine/goodbye.html` | `itt16-vine-end-lx` | query | `sites/snapchat/spectacles.html` |
| N5 | Win10 free-upgrade ended leftover | `sites/windows10/end.html` | `itt16-win10-end-lx` | query | `sites/dyn/index.html` |
| N6 | Dyn/Mirai leftover literacy (no exploit) | `sites/dyn/index.html` | `itt16-dyn-lx` | query | `sites/slack/index.html` |
| N7 | AirPods leftover | `sites/iphone/airpods.html` | `itt16-airpods-lx` | query | `sites/playable/game.html` |

### Phases

**16-P0 · Read first · 20 min · [ ]**  
Open `2016-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2016/sites`). Do not create folders. Do not move `itt16-ig-stories`.

**16-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**16-P2 · Home strip · [ ]**  
`years/2016/pages/home.html` · `<!-- ITT-2X-NEXT:2016 -->` below guided 6 · star chip `itt16-ig-stories` unmoved · guided `<ol>` still 6.

**16-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2016.js`.

**16-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2016" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2016 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**16-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt16-ig-stories` unmoved. Guided 6.

**Hard bans:** do not move `itt16-ig-stories` · no 7th guided `<li>` · no dest-field “I read the 2016 period note” · no invented logos · no live models / ripped SWF / real payments · `itt16-*` only.

### Band C leftover (do not start unless named)

`alphago` · `e2eabout` · `iphone7about` · `pogoabout` leftover ≠ Stories · `reactabout` · `spectabout` · `storyabout` leftover literacy · `superbowl` · `win10end`

**16-C0–C3 · `[x]`** remaining REAL dests wired 2026-08-26 · `implement-2x-remaining-real.py` · suffix `-rlx`.

---

# 2017
**Thesis (locked):** [`2017-READ-FIRST.md`](2017-READ-FIRST.md) — Face ID / iPhone X. Lean.  
**Star stays:** Face ID · `itt17-faceid`.  
**Band:** C · already 36.  
**Matrix on disk:** **36** writers (32 prior pack + 4 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2017
  → About · bans · dual-cite
  → ★ Face ID
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt17-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt17-faceid-2x` | query | `sites/iphone/x.html` | `sites/iphone/animoji.html` |
| P2 | `itt17-fn` | query | `sites/fortnite/index.html` | `sites/twitter/280.html` |
| P3 | `itt17-t280` | query | `sites/twitter/280.html` | `sites/teams/index.html` |
| P4 | `itt17-wc` | query | `sites/wannacry/index.html` | `sites/equifax/index.html` |
| P5 | `itt17-eq` | query | `sites/equifax/index.html` | `sites/musically/index.html` |
| P6 | `itt17-mly` | query | `sites/musically/index.html` | `sites/echoshow/index.html` |
| P7 | `itt17-show` | query | `sites/echoshow/index.html` | `sites/snapipo/index.html` |
| P8 | `itt17-snapipo` | query | `sites/snapipo/index.html` | `sites/reddit/index.html` |
| P9 | `itt17-reddit` | hops | `sites/reddit/index.html` | `sites/youtube/index.html` |
| P10 | `itt17-yt` | query | `sites/youtube/index.html` | `sites/amazon/index.html` |
| P11 | `itt17-amzn` | query | `sites/amazon/index.html` | `sites/bitcoinath/index.html` |
| P12 | `itt17-btc` | query | `sites/bitcoinath/index.html` | `sites/playable/game.html` |
| P13 | `itt17-storm` | query | `sites/playable/game.html` | `sites/playable/famous.html` |
| P14 | `itt17-famous` | query | `sites/playable/famous.html` | `sites/iphone/x.html` |
| P15 | `itt17-xa` | query | `sites/playable/extra-a.html` | `sites/playable/extra-b.html` |
| P16 | `itt17-xb` | query | `sites/playable/extra-b.html` | `sites/playable/extra-c.html` |
| P17 | `itt17-xc` | query | `sites/playable/extra-c.html` | `sites/playable/extra-d.html` |
| P18 | `itt17-xd` | query | `sites/playable/extra-d.html` | `sites/playable/extra-e.html` |
| P19 | `itt17-xe` | query | `sites/playable/extra-e.html` | `sites/playable/index.html` |
| P20 | `itt17-cab` | query | `sites/playable/index.html` | `sites/fortnite/index.html` |
| P21 | `itt17-fn-2` | query | `sites/fortnite/index.html` | `sites/amazon/index.html` |
| P22 | `itt17-amzn-2` | query | `sites/amazon/index.html` | `sites/youtube/index.html` |
| P23 | `itt17-yt-2` | query | `sites/youtube/index.html` | `sites/reddit/index.html` |
| P24 | `itt17-reddit-2` | query | `sites/reddit/index.html` | `sites/twitter/280.html` |
| P25 | `itt17-t280-2` | query | `sites/twitter/280.html` | `sites/teams/index.html` |
| P26 | `itt17-teams-2` | query | `sites/teams/index.html` | `sites/wannacry/index.html` |
| P27 | `itt17-wc-2` | query | `sites/wannacry/index.html` | `sites/switch/index.html` |
| P28 | `itt17-sw-2` | query | `sites/switch/index.html` | `sites/musically/index.html` |
| P29 | `itt17-mly-2` | query | `sites/musically/index.html` | `sites/snapipo/index.html` |
| P30 | `itt17-snap-2` | query | `sites/snapipo/index.html` | `sites/bitcoinath/index.html` |
| P31 | `itt17-btc-2` | query | `sites/bitcoinath/index.html` | `sites/echoshow/index.html` |
| P32 | `itt17-show-2` | query | `sites/echoshow/index.html` | `sites/iphone/x.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Animoji leftover (needs Face ID gold) | `sites/iphone/animoji.html` | `itt17-animoji-lx` | query | `sites/fortnite/index.html` |
| N2 | Teams leftover create | `sites/teams/index.html` | `itt17-teams-lx` | query | `sites/vine/gone.html` |
| N3 | Vine leftover actually gone | `sites/vine/gone.html` | `itt17-vine-gone-lx` | query | `sites/switch/index.html` |
| N4 | Switch leftover buy | `sites/switch/index.html` | `itt17-switch-lx` | query | `sites/wannacry/index.html` |

### Phases

**17-P0 · Read first · 20 min · [ ]**  
Open `2017-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2017/sites`). Do not create folders. Do not move `itt17-faceid`.

**17-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**17-P2 · Home strip · [ ]**  
`years/2017/pages/home.html` · `<!-- ITT-2X-NEXT:2017 -->` below guided 6 · star chip `itt17-faceid` unmoved · guided `<ol>` still 6.

**17-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2017.js`.

**17-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2017" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2017 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**17-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt17-faceid` unmoved. Guided 6.

**Hard bans:** do not move `itt17-faceid` · no 7th guided `<li>` · no dest-field “I read the 2017 period note” · no invented logos · no live models / ripped SWF / real payments · `itt17-*` only.

### Band C leftover (do not start unless named)

`bitmoji` · `equifaxabout` · `faceabout` leftover ≠ Face ID · `hqtrivia` · `musically17` · `notpetya` · `pubgnote` · `t280about` · `wannaabout`

**17-C0–C3 · `[x]`** remaining REAL dests wired 2026-08-26 · `implement-2x-remaining-real.py` · suffix `-rlx`.

---

# 2018
**Thesis (locked):** [`2018-READ-FIRST.md`](2018-READ-FIRST.md) — GDPR Manage. Lean.  
**Star stays:** GDPR Manage · `itt18-gdpr`.  
**Band:** C · already 36.  
**Matrix on disk:** **36** writers (35 prior pack + 1 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2018
  → About · bans · dual-cite
  → ★ GDPR Manage
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt18-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt18-gdpr-2x` | query | `sites/gdpr/manage.html` | `sites/tiktok/fyp.html` |
| P2 | `itt18-fyp` | hops | `sites/tiktok/fyp.html` | `sites/trust/index.html` |
| P3 | `itt18-hear` | query | `sites/trust/index.html` | `sites/instagram/igtv.html` |
| P4 | `itt18-ns` | query | `sites/chrome/not-secure.html` | `sites/homepod/index.html` |
| P5 | `itt18-hp` | query | `sites/homepod/index.html` | `sites/spectre/index.html` |
| P6 | `itt18-sp` | query | `sites/spectre/index.html` | `sites/fortnite/switch.html` |
| P7 | `itt18-fn-sw` | query | `sites/fortnite/switch.html` | `sites/github/microsoft.html` |
| P8 | `itt18-gh-ms` | query | `sites/github/microsoft.html` | `sites/discord/index.html` |
| P9 | `itt18-dc` | query | `sites/discord/index.html` | `sites/reddit/index.html` |
| P10 | `itt18-reddit` | hops | `sites/reddit/index.html` | `sites/youtube/index.html` |
| P11 | `itt18-yt` | query | `sites/youtube/index.html` | `sites/wikipedia/index.html` |
| P12 | `itt18-wiki` | query | `sites/wikipedia/index.html` | `sites/applemusic/index.html` |
| P13 | `itt18-am` | query | `sites/applemusic/index.html` | `sites/gdpr/index.html` |
| P14 | `itt18-gdpr-door` | query | `sites/gdpr/index.html` | `sites/playable/game.html` |
| P15 | `itt18-consent` | query | `sites/playable/game.html` | `sites/fortnite/creative.html` |
| P16 | `itt18-fn-cr` | query | `sites/fortnite/creative.html` | `sites/playable/famous.html` |
| P17 | `itt18-famous` | query | `sites/playable/famous.html` | `sites/gdpr/manage.html` |
| P18 | `itt18-tt-h` | query | `sites/tiktok/index.html` | `sites/github/index.html` |
| P19 | `itt18-gh-h` | query | `sites/github/index.html` | `sites/playable/extra-a.html` |
| P20 | `itt18-xa` | query | `sites/playable/extra-a.html` | `sites/playable/extra-b.html` |
| P21 | `itt18-xb` | query | `sites/playable/extra-b.html` | `sites/playable/extra-c.html` |
| P22 | `itt18-xc` | query | `sites/playable/extra-c.html` | `sites/playable/extra-d.html` |
| P23 | `itt18-xd` | query | `sites/playable/extra-d.html` | `sites/playable/extra-e.html` |
| P24 | `itt18-xe` | query | `sites/playable/extra-e.html` | `sites/playable/index.html` |
| P25 | `itt18-cab` | query | `sites/playable/index.html` | `sites/youtube/index.html` |
| P26 | `itt18-yt-2` | query | `sites/youtube/index.html` | `sites/wikipedia/index.html` |
| P27 | `itt18-wiki-2` | query | `sites/wikipedia/index.html` | `sites/reddit/index.html` |
| P28 | `itt18-reddit-2` | query | `sites/reddit/index.html` | `sites/discord/index.html` |
| P29 | `itt18-dc-2` | query | `sites/discord/index.html` | `sites/chrome/not-secure.html` |
| P30 | `itt18-ns-2` | query | `sites/chrome/not-secure.html` | `sites/instagram/igtv.html` |
| P31 | `itt18-igtv-2` | query | `sites/instagram/igtv.html` | `sites/trust/index.html` |
| P32 | `itt18-hear-2` | query | `sites/trust/index.html` | `sites/homepod/index.html` |
| P33 | `itt18-hp-2` | query | `sites/homepod/index.html` | `sites/spectre/index.html` |
| P34 | `itt18-sp-2` | query | `sites/spectre/index.html` | `sites/applemusic/index.html` |
| P35 | `itt18-am-2` | query | `sites/applemusic/index.html` | `sites/gdpr/manage.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | IGTV leftover post (not Reels) | `sites/instagram/igtv.html` | `itt18-igtv-lx` | query | `sites/chrome/not-secure.html` |

### Phases

**18-P0 · Read first · 20 min · [ ]**  
Open `2018-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2018/sites`). Do not create folders. Do not move `itt18-gdpr`.

**18-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**18-P2 · Home strip · [ ]**  
`years/2018/pages/home.html` · `<!-- ITT-2X-NEXT:2018 -->` below guided 6 · star chip `itt18-gdpr` unmoved · guided `<ol>` still 6.

**18-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2018.js`.

**18-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2018" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2018 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**18-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt18-gdpr` unmoved. Guided 6.

**Hard bans:** do not move `itt18-gdpr` · no 7th guided `<li>` · no dest-field “I read the 2018 period note” · no invented logos · no live models / ripped SWF / real payments · `itt18-*` only.

### Band C leftover (do not start unless named)

`cambridge` leftover literacy · `fnswitch` · `fypabout` leftover ≠ GDPR · `gdpra` leftover literacy · `githubms` · `homepodabout` · `igtvabout` · `notsecure` · `spectre18`

**18-C0–C3 · `[x]`** remaining REAL dests wired 2026-08-26 · `itt18-cambridge-rlx` passed.

---

# 2019
**Thesis (locked):** [`2019-READ-FIRST.md`](2019-READ-FIRST.md) — Disney+ Continue. Lean.  
**Star stays:** Disney+ Continue · `itt19-disneyplus`.  
**Band:** C · already 36.  
**Matrix on disk:** **36** writers (19 prior pack + 17 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2019
  → About · bans · dual-cite
  → ★ Disney+ Continue
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt19-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt19-ig-fn` | query | `sites/instagram/index.html` | `sites/playable/game.html` |
| P2 | `itt19-dplus-ab` | query | `sites/disneyplus/about.html` | `sites/disneyplus/index.html` |
| P3 | `itt19-dplus-ix` | query | `sites/disneyplus/index.html` | `sites/fortnite/marshmello.html` |
| P4 | `itt19-marsh` | query | `sites/fortnite/marshmello.html` | `sites/tiktok/index.html` |
| P5 | `itt19-tt-2` | query | `sites/tiktok/index.html` | `sites/youtube/index.html` |
| P6 | `itt19-yt-2` | query | `sites/youtube/index.html` | `sites/wikipedia/index.html` |
| P7 | `itt19-wiki-2` | query | `sites/wikipedia/index.html` | `sites/chrome/index.html` |
| P8 | `itt19-ch-2` | query | `sites/chrome/index.html` | `sites/arcade/index.html` |
| P9 | `itt19-arcade-2` | query | `sites/arcade/index.html` | `sites/stadia/index.html` |
| P10 | `itt19-stadia-2` | query | `sites/stadia/index.html` | `sites/appletv/index.html` |
| P11 | `itt19-tv-2` | query | `sites/appletv/index.html` | `sites/airpodspro/index.html` |
| P12 | `itt19-app-2` | query | `sites/airpodspro/index.html` | `sites/iphone/iphone11.html` |
| P13 | `itt19-11-2` | query | `sites/iphone/iphone11.html` | `sites/edge/index.html` |
| P14 | `itt19-edge-2` | query | `sites/edge/index.html` | `sites/windows10/index.html` |
| P15 | `itt19-w10-2` | query | `sites/windows10/index.html` | `sites/instagram/index.html` |
| P16 | `itt19-ig-2` | query | `sites/instagram/index.html` | `sites/playable/index.html` |
| P17 | `itt19-cab-2` | query | `sites/playable/index.html` | `sites/playable/famous.html` |
| P18 | `itt19-fam-2` | query | `sites/playable/famous.html` | `sites/playable/extra-a.html` |
| P19 | `itt19-xa-2` | query | `sites/playable/extra-a.html` | `sites/tiktok/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | TikTok leftover FYP (not the chip) | `sites/tiktok/index.html` | `itt19-tt-lx` | query | `sites/arcade/index.html` |
| N2 | Arcade leftover pick | `sites/arcade/index.html` | `itt19-arcade-lx` | query | `sites/stadia/index.html` |
| N3 | Stadia leftover Founders | `sites/stadia/index.html` | `itt19-stadia-lx` | query | `sites/appletv/index.html` |
| N4 | Apple TV+ leftover title | `sites/appletv/index.html` | `itt19-tv-lx` | query | `sites/airpodspro/index.html` |
| N5 | AirPods Pro leftover | `sites/airpodspro/index.html` | `itt19-app-lx` | query | `sites/iphone/iphone11.html` |
| N6 | iPhone 11 leftover | `sites/iphone/iphone11.html` | `itt19-11-lx` | query | `sites/edge/index.html` |
| N7 | Edge Chromium leftover preview | `sites/edge/index.html` | `itt19-edge-lx` | query | `sites/chrome/index.html` |
| N8 | Chrome leftover habit URL | `sites/chrome/index.html` | `itt19-ch-lx` | query | `sites/youtube/index.html` |
| N9 | YouTube leftover watch | `sites/youtube/index.html` | `itt19-yt-lx` | query | `sites/instagram/index.html` |
| N10 | Instagram leftover hide-likes | `sites/instagram/index.html` | `itt19-ig-lx` | query | `sites/wikipedia/index.html` |
| N11 | Wikipedia leftover article | `sites/wikipedia/index.html` | `itt19-wiki-lx` | query | `sites/windows10/index.html` |
| N12 | Win10 leftover residual | `sites/windows10/index.html` | `itt19-w10-lx` | query | `sites/instagram/index.html` |
| N13 | Continue Row leftover year game | `sites/playable/game.html` | `itt19-game-lx` | query | `sites/playable/famous.html` |
| N14 | Famous leftover 2019 | `sites/playable/famous.html` | `itt19-famous-lx` | query | `sites/playable/index.html` |
| N15 | Playable cabinet leftover | `sites/playable/index.html` | `itt19-cab-lx` | query | `sites/playable/extra-a.html` |
| N16 | 2019 extra-a leftover | `sites/playable/extra-a.html` | `itt19-xa-lx` | query | `sites/playable/extra-b.html` |
| N17 | 2019 extra-b leftover | `sites/playable/extra-b.html` | `itt19-xb-lx` | query | `sites/tiktok/index.html` |

### Phases

**19-P0 · Read first · 20 min · [ ]**  
Open `2019-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2019/sites`). Do not create folders. Do not move `itt19-disneyplus`.

**19-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**19-P2 · Home strip · [ ]**  
`years/2019/pages/home.html` · `<!-- ITT-2X-NEXT:2019 -->` below guided 6 · star chip `itt19-disneyplus` unmoved · guided `<ol>` still 6.

**19-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2019.js`.

**19-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2019" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2019 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**19-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt19-disneyplus` unmoved. Guided 6.

**Hard bans:** do not move `itt19-disneyplus` · no 7th guided `<li>` · no dest-field “I read the 2019 period note” · no invented logos · no live models / ripped SWF / real payments · `itt19-*` only.

### Band C leftover (do not start unless named)

`airpodsabout` · `arcadeabout` · `chrome19` · `dplusabout` leftover ≠ Continue · `fn19` · `marshnote` · `stadiaabout` · `tt19` · `win10n`

**19-C0–C3 · `[x]`** remaining REAL dests wired 2026-08-26 · `implement-2x-remaining-real.py` · suffix `-rlx`.

---

# 2020
**Thesis (locked):** [`2020-READ-FIRST.md`](2020-READ-FIRST.md) — Zoom mute → leave. Lean.  
**Star stays:** Zoom leave · `itt20-zoom`.  
**Band:** C · already 36.  
**Matrix on disk:** **36** writers (18 prior pack + 18 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2020
  → About · bans · dual-cite
  → ★ Zoom leave
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt20-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt20-zm-ab` | query | `sites/zoom/about.html` | `sites/zoom/index.html` |
| P2 | `itt20-zm-ix` | query | `sites/zoom/index.html` | `sites/zoom/recap.html` |
| P3 | `itt20-zm-rc` | query | `sites/zoom/recap.html` | `sites/reels/about.html` |
| P4 | `itt20-reels-ab` | query | `sites/reels/about.html` | `sites/reels/record.html` |
| P5 | `itt20-reels-rc` | query | `sites/reels/record.html` | `sites/openai/wait.html` |
| P6 | `itt20-gpt-w` | query | `sites/openai/wait.html` | `sites/flash/eol.html` |
| P7 | `itt20-flash-eol` | query | `sites/flash/eol.html` | `sites/tiktok/eo.html` |
| P8 | `itt20-tt-eo` | query | `sites/tiktok/eo.html` | `sites/twitter/hack.html` |
| P9 | `itt20-tw-hk` | query | `sites/twitter/hack.html` | `sites/markets/wti.html` |
| P10 | `itt20-wti` | query | `sites/markets/wti.html` | `sites/acnh/index.html` |
| P11 | `itt20-acnh-2` | query | `sites/acnh/index.html` | `sites/astro/index.html` |
| P12 | `itt20-astro-2` | query | `sites/astro/index.html` | `sites/quibi/index.html` |
| P13 | `itt20-quibi-2` | query | `sites/quibi/index.html` | `sites/playable/extra-a.html` |
| P14 | `itt20-xa` | query | `sites/playable/extra-a.html` | `sites/playable/extra-b.html` |
| P15 | `itt20-xb` | query | `sites/playable/extra-b.html` | `sites/playable/index.html` |
| P16 | `itt20-cab` | query | `sites/playable/index.html` | `sites/playable/famous.html` |
| P17 | `itt20-fam-2` | query | `sites/playable/famous.html` | `sites/hbomax/index.html` |
| P18 | `itt20-hbo-2` | query | `sites/hbomax/index.html` | `sites/zoom/meeting.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Reels leftover 15s (not Shorts) | `sites/reels/index.html` | `itt20-reels-lx` | query | `sites/openai/index.html` |
| N2 | GPT-3 leftover waitlist (not ChatGPT) | `sites/openai/index.html` | `itt20-gpt-lx` | query | `sites/flash/index.html` |
| N3 | Flash leftover EOL | `sites/flash/index.html` | `itt20-flash-lx` | query | `sites/meet/index.html` |
| N4 | Meet leftover room name | `sites/meet/index.html` | `itt20-meet-lx` | query | `sites/mixer/index.html` |
| N5 | Mixer leftover shutdown | `sites/mixer/index.html` | `itt20-mixer-lx` | query | `sites/hbomax/index.html` |
| N6 | HBO Max leftover title | `sites/hbomax/index.html` | `itt20-hbo-lx` | query | `sites/peacock/index.html` |
| N7 | Peacock leftover title | `sites/peacock/index.html` | `itt20-pk-lx` | query | `sites/ccpa/index.html` |
| N8 | CCPA leftover Do Not Sell | `sites/ccpa/index.html` | `itt20-ccpa-lx` | query | `sites/chrome/index.html` |
| N9 | Chrome leftover habit URL | `sites/chrome/index.html` | `itt20-ch-lx` | query | `sites/edge/index.html` |
| N10 | Edge 79 leftover (not Legacy) | `sites/edge/index.html` | `itt20-edge-lx` | query | `sites/epic/index.html` |
| N11 | Epic leftover sideload literacy | `sites/epic/index.html` | `itt20-epic-lx` | query | `sites/tiktok/index.html` |
| N12 | TikTok leftover caption | `sites/tiktok/index.html` | `itt20-tt-lx` | query | `sites/spacehey/index.html` |
| N13 | SpaceHey leftover add-friend | `sites/spacehey/index.html` | `itt20-shy-lx` | query | `sites/youtube/index.html` |
| N14 | YouTube leftover watch | `sites/youtube/index.html` | `itt20-yt-lx` | query | `sites/wikipedia/index.html` |
| N15 | Wikipedia leftover article | `sites/wikipedia/index.html` | `itt20-wiki-lx` | query | `sites/facebook/index.html` |
| N16 | Facebook leftover 2020 residual | `sites/facebook/index.html` | `itt20-fb-lx` | query | `sites/playable/game.html` |
| N17 | 2020 game leftover | `sites/playable/game.html` | `itt20-game-lx` | query | `sites/playable/famous.html` |
| N18 | Famous leftover 2020 | `sites/playable/famous.html` | `itt20-famous-lx` | query | `sites/zoom/meeting.html` |

### Phases

**20-P0 · Read first · 20 min · [ ]**  
Open `2020-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2020/sites`). Do not create folders. Do not move `itt20-zoom`.

**20-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**20-P2 · Home strip · [ ]**  
`years/2020/pages/home.html` · `<!-- ITT-2X-NEXT:2020 -->` below guided 6 · star chip `itt20-zoom` unmoved · guided `<ol>` still 6.

**20-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2020.js`.

**20-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2020" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2020 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**20-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt20-zoom` unmoved. Guided 6.

**Hard bans:** do not move `itt20-zoom` · no 7th guided `<li>` · no dest-field “I read the 2020 period note” · no invented logos · no live models / ripped SWF / real payments · `itt20-*` only.

### Band C leftover (do not start unless named)

`amongabout` · `ccpaabout` · `edge79about` · `flashabout` · `gpt3about` leftover · `reelsabout` leftover ≠ Zoom · `tteo` · `wtiabout` · `zoomabout` leftover literacy

**20-C0–C3 · `[x]`** remaining REAL dests wired 2026-08-26 · `implement-2x-remaining-real.py` · suffix `-rlx`.

---

# 2021
**Thesis (locked):** [`2021-READ-FIRST.md`](2021-READ-FIRST.md) — ATT Ask. Lean.  
**Star stays:** ATT Ask · `itt21-att`.  
**Band:** C · already 36.  
**Matrix on disk:** **36** writers (18 prior pack + 18 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2021
  → About · bans · dual-cite
  → ★ ATT Ask
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt21-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### Prior pack already on disk (do not redo)

| ID | Key | Kind | File | Next |
|----|-----|------|------|------|
| P1 | `itt21-sig-2` | query | `sites/signal/index.html` | `sites/copilot/index.html` |
| P2 | `itt21-cop-2` | query | `sites/copilot/index.html` | `sites/meta/index.html` |
| P3 | `itt21-meta-2` | query | `sites/meta/index.html` | `sites/chrome/index.html` |
| P4 | `itt21-ch-2` | query | `sites/chrome/index.html` | `sites/youtube/index.html` |
| P5 | `itt21-yt-2` | query | `sites/youtube/index.html` | `sites/wikipedia/index.html` |
| P6 | `itt21-wiki-2` | query | `sites/wikipedia/index.html` | `sites/facebook/index.html` |
| P7 | `itt21-fb-2` | query | `sites/facebook/index.html` | `sites/flash/index.html` |
| P8 | `itt21-flash-2` | query | `sites/flash/index.html` | `sites/windows10/index.html` |
| P9 | `itt21-w10-2` | query | `sites/windows10/index.html` | `sites/windows11/index.html` |
| P10 | `itt21-w11-2` | query | `sites/windows11/index.html` | `sites/clubhouse/index.html` |
| P11 | `itt21-chouse-2` | query | `sites/clubhouse/index.html` | `sites/nft/index.html` |
| P12 | `itt21-nft-2` | query | `sites/nft/index.html` | `sites/squid/index.html` |
| P13 | `itt21-squid-2` | query | `sites/squid/index.html` | `sites/playable/index.html` |
| P14 | `itt21-cab-2` | query | `sites/playable/index.html` | `sites/playable/famous.html` |
| P15 | `itt21-fam-2` | query | `sites/playable/famous.html` | `sites/playable/game.html` |
| P16 | `itt21-game-2` | query | `sites/playable/game.html` | `sites/playable/extra-a.html` |
| P17 | `itt21-xa-2` | query | `sites/playable/extra-a.html` | `sites/playable/extra-b.html` |
| P18 | `itt21-xb-2` | query | `sites/playable/extra-b.html` | `sites/att/index.html` |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Signal leftover handle | `sites/signal/index.html` | `itt21-sig-lx` | query | `sites/copilot/index.html` |
| N2 | Copilot leftover waitlist (not ChatGPT) | `sites/copilot/index.html` | `itt21-cop-lx` | query | `sites/meta/index.html` |
| N3 | Meta leftover rename | `sites/meta/index.html` | `itt21-meta-lx` | query | `sites/chrome/index.html` |
| N4 | Chrome leftover habit URL | `sites/chrome/index.html` | `itt21-ch-lx` | query | `sites/youtube/index.html` |
| N5 | YouTube leftover watch | `sites/youtube/index.html` | `itt21-yt-lx` | query | `sites/wikipedia/index.html` |
| N6 | Wikipedia leftover article | `sites/wikipedia/index.html` | `itt21-wiki-lx` | query | `sites/facebook/index.html` |
| N7 | Facebook leftover 2021 residual | `sites/facebook/index.html` | `itt21-fb-lx` | query | `sites/flash/index.html` |
| N8 | Flash leftover brick | `sites/flash/index.html` | `itt21-flash-lx` | query | `sites/windows10/index.html` |
| N9 | Win10 leftover mass residual | `sites/windows10/index.html` | `itt21-w10-lx` | query | `sites/windows11/index.html` |
| N10 | Win11 leftover install literacy | `sites/windows11/index.html` | `itt21-w11-lx` | query | `sites/clubhouse/index.html` |
| N11 | Clubhouse leftover room | `sites/clubhouse/index.html` | `itt21-chouse-lx` | query | `sites/nft/index.html` |
| N12 | NFT leftover literacy | `sites/nft/index.html` | `itt21-nft-lx` | query | `sites/squid/index.html` |
| N13 | Squid leftover chip note | `sites/squid/index.html` | `itt21-squid-lx` | query | `sites/playable/game.html` |
| N14 | 2021 game leftover | `sites/playable/game.html` | `itt21-game-lx` | query | `sites/playable/famous.html` |
| N15 | Famous leftover 2021 | `sites/playable/famous.html` | `itt21-famous-lx` | query | `sites/att/index.html` |
| N16 | ATT leftover literacy note | `sites/att/index.html` | `itt21-att-lx` | query | `sites/playable/extra-a.html` |
| N17 | 2021 extra-a leftover | `sites/playable/extra-a.html` | `itt21-xa-lx` | query | `sites/playable/extra-b.html` |
| N18 | 2021 extra-b leftover | `sites/playable/extra-b.html` | `itt21-xb-lx` | query | `sites/signal/index.html` |

### Phases

**21-P0 · Read first · 20 min · [ ]**  
Open `2021-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2021/sites`). Do not create folders. Do not move `itt21-att`.

**21-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**21-P2 · Home strip · [ ]**  
`years/2021/pages/home.html` · `<!-- ITT-2X-NEXT:2021 -->` below guided 6 · star chip `itt21-att` unmoved · guided `<ol>` still 6.

**21-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2021.js`.

**21-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2021" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2021 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**21-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt21-att` unmoved. Guided 6.

**Hard bans:** do not move `itt21-att` · no 7th guided `<li>` · no dest-field “I read the 2021 period note” · no invented logos · no live models / ripped SWF / real payments · `itt21-*` only.

### Band C leftover (do not start unless named)

`attabout` leftover literacy ≠ ATT gold · `copabout` · `discord21` · `metaabout` · `opensea` · `robinhood` · `sigabout` leftover · `win11about` · `wordleseed`

**21-C0–C3 · `[x]`** remaining REAL dests wired 2026-08-26 · `implement-2x-remaining-real.py` · suffix `-rlx`.

---

# 2022
**Thesis (locked):** [`2022-READ-FIRST.md`](2022-READ-FIRST.md) — ChatGPT Send. Lean.  
**Star stays:** ChatGPT Send · `itt22-chatgpt`.  
**Band:** B · lean 18→33.  
**Matrix on disk:** **33** writers (0 prior pack + 33 this-pass `-lx`).

### Goal
Visitor can finish the prior leftover sessions **and** this-pass `-lx` writers on rooms that exist. Lean tree does not have 36 leftover slugs — **do not invent folders**. Next on last leftover lands on the star.

**Visitor outcome**

```
Hub → 2022
  → About · bans · dual-cite
  → ★ ChatGPT Send
  → 33 leftover REAL dests (incomplete never writes)
  → Exit · itt22-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | Twitter leftover note | `sites/twitter/index.html` | `itt22-tw-lx` | query | `sites/wordle/index.html` |
| N2 | Wordle leftover guess | `sites/wordle/index.html` | `itt22-wd-lx` | query | `sites/stablediffusion/index.html` |
| N3 | SD leftover prompt | `sites/stablediffusion/index.html` | `itt22-sd-lx` | query | `sites/mastodon/index.html` |
| N4 | Mastodon leftover instance | `sites/mastodon/index.html` | `itt22-md-lx` | query | `sites/chrome/index.html` |
| N5 | Chrome leftover habit | `sites/chrome/index.html` | `itt22-ch-lx` | query | `sites/playable/game.html` |
| N6 | Prompt Box leftover | `sites/playable/game.html` | `itt22-game-lx` | query | `sites/chatgpt/index.html` |
| N7 | BeReal leftover 2× | `sites/bereal/index.html` | `itt22-br-lx` | checks | `sites/dalle2/index.html` |
| N8 | DALL·E 2 leftover 2× | `sites/dalle2/index.html` | `itt22-dl-lx` | query | `sites/windows10/index.html` |
| N9 | Win10 leftover 2× | `sites/windows10/index.html` | `itt22-w10-lx` | checks | `sites/chatgpt/index.html` |
| N10 | ChatGPT leftover literacy | `sites/chatgpt/index.html` | `itt22-send-lx` | query | `sites/notion22/index.html` |
| N11 | Notion leftover 2× | `sites/notion22/index.html` | `itt22-nt-lx` | query | `sites/midjourney/index.html` |
| N12 | Midjourney leftover 2× | `sites/midjourney/index.html` | `itt22-mj-lx` | query | `sites/lensa/index.html` |
| N13 | Lensa leftover 2× | `sites/lensa/index.html` | `itt22-le-lx` | checks | `sites/tiktok/index.html` |
| N14 | TikTok leftover 2× | `sites/tiktok/index.html` | `itt22-tt-lx` | query | `sites/cohere/index.html` |
| N15 | Cohere leftover | `sites/cohere/index.html` | `itt22-co-lx` | query | `sites/jasper/index.html` |
| N16 | Jasper leftover | `sites/jasper/index.html` | `itt22-jsp-lx` | query | `sites/runwaygen1/index.html` |
| N17 | Runway Gen-1 leftover | `sites/runwaygen1/index.html` | `itt22-rw-lx` | query | `sites/stabilityhq/index.html` |
| N18 | Stability leftover | `sites/stabilityhq/index.html` | `itt22-stab-lx` | checks | `sites/chatgpt/index.html` |
| N19 | Cohere leftover 2× pack | `sites/cohere/index.html` | `itt22-co2-lx` | query | `sites/jasper/index.html` |
| N20 | Jasper leftover 2× pack | `sites/jasper/index.html` | `itt22-jsp2-lx` | query | `sites/runwaygen1/index.html` |
| N21 | Runway leftover 2× pack | `sites/runwaygen1/index.html` | `itt22-rw2-lx` | query | `sites/stabilityhq/index.html` |
| N22 | Stabilityhq leftover 2× | `sites/stabilityhq/index.html` | `itt22-stab2-lx` | checks | `sites/wordle/index.html` |
| N23 | SD leftover 2× pack | `sites/stablediffusion/index.html` | `itt22-sd2-lx` | query | `sites/chrome22/index.html` |
| N24 | Chrome leftover 2× | `sites/chrome22/index.html` | `itt22-ch22-lx` | query | `sites/copilot22/index.html` |
| N25 | Copilot leftover 2× | `sites/copilot22/index.html` | `itt22-cp22-lx` | query | `sites/cail22/index.html` |
| N26 | Character leftover 2× | `sites/cail22/index.html` | `itt22-cai-lx` | query | `sites/dalleabout/index.html` |
| N27 | DALL·E about leftover 2× | `sites/dalleabout/index.html` | `itt22-dla-lx` | query | `sites/gptabout/index.html` |
| N28 | Gptabout leftover 2× | `sites/gptabout/index.html` | `itt22-gpa-lx` | checks | `sites/mastoabout/index.html` |
| N29 | Masto about leftover 2× | `sites/mastoabout/index.html` | `itt22-msa-lx` | query | `sites/win10n22/index.html` |
| N30 | Win10 leftover 2× | `sites/win10n22/index.html` | `itt22-w10n-lx` | query | `sites/facebook/index.html` |
| N31 | Facebook leftover 2× | `sites/facebook/index.html` | `itt22-fb-lx` | query | `sites/youtube/index.html` |
| N32 | YouTube leftover 2× | `sites/youtube/index.html` | `itt22-yt-lx` | query | `sites/wikipedia/index.html` |
| N33 | Wikipedia leftover 2× | `sites/wikipedia/index.html` | `itt22-wk-lx` | query | `sites/chatgpt/index.html` |

### Phases

**22-P0 · Read first · 20 min · [x]**  
Open `2022-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2022/sites`). Do not create folders. Do not move `itt22-chatgpt`.

**22-P1 · Inject leftover writers · [x]**  
`python3 scripts/implement-2x-next-18-to-36.py` · marked `ITT-4X:suffix` panels on existing dests · engine `year-4x-flows.js` (CORE). 33 `-lx` writers on disk.

**22-P2 · Home strip · [x]**  
`years/2022/pages/home.html` · `<!-- ITT-2X-NEXT:2022 -->` below guided 6 · star chip `itt22-chatgpt` unmoved · guided `<ol>` still 6.

**22-P3 · urlMap · [x]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2022.js`.

**22-P4 · e2e · [x]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2022" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2022 --workers=1
```
Smoke `[x]` this pass for a named key in this year.

**22-P5 · Done when**  
33 keys write · dests 200 · 0 dest-field · existing 2022 specs green · no neighbor prefix leak · `itt22-chatgpt` unmoved. Do not invent folders to force 36.

**Hard bans:** do not move `itt22-chatgpt` · no 7th guided `<li>` · no dest-field “I read the 2022 period note” · no invented logos · no live models / ripped SWF / real payments · `itt22-*` only.

---

# 2023
**Thesis (locked):** [`2023-READ-FIRST.md`](2023-READ-FIRST.md) — ChatGPT Plus $20. Lean.  
**Star stays:** ChatGPT Plus $20 · `itt23-chatgpt-plus`.  
**Band:** C · already 36 · closed gold.  
**Matrix on disk:** **36** writers (0 prior pack + 36 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2023
  → About · bans · dual-cite
  → ★ ChatGPT Plus $20
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt23-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | ChatGPT plugins leftover | `sites/plugins/index.html` | `itt23-plug-lx` | query | `sites/codeinterp/index.html` |
| N2 | Code Interpreter leftover | `sites/codeinterp/index.html` | `itt23-ada-lx` | query | `sites/customgpts/index.html` |
| N3 | Custom GPTs leftover | `sites/customgpts/index.html` | `itt23-gpts-lx` | query | `sites/llama2/index.html` |
| N4 | Llama 2 leftover | `sites/llama2/index.html` | `itt23-l2-lx` | checks | `sites/dalle3/index.html` |
| N5 | DALL·E 3 leftover | `sites/dalle3/index.html` | `itt23-d3-lx` | query | `sites/myai/index.html` |
| N6 | Snapchat My AI leftover | `sites/myai/index.html` | `itt23-myai-lx` | query | `sites/firefly/index.html` |
| N7 | Adobe Firefly leftover | `sites/firefly/index.html` | `itt23-fly-lx` | query | `sites/m365copilot/index.html` |
| N8 | Microsoft 365 Copilot leftover | `sites/m365copilot/index.html` | `itt23-m365-lx` | checks | `sites/sge/index.html` |
| N9 | Search Generative Experience leftover | `sites/sge/index.html` | `itt23-sge-lx` | query | `sites/chatgptios/index.html` |
| N10 | ChatGPT iOS leftover | `sites/chatgptios/index.html` | `itt23-ios-lx` | checks | `sites/mixtral/index.html` |
| N11 | Mixtral leftover | `sites/mixtral/index.html` | `itt23-mix-lx` | checks | `sites/grok23/index.html` |
| N12 | Grok announce leftover | `sites/grok23/index.html` | `itt23-grok23-lx` | query | `sites/gemannounce/index.html` |
| N13 | Gemini announce leftover | `sites/gemannounce/index.html` | `itt23-gem23-lx` | checks | `sites/vpannounce/index.html` |
| N14 | Vision Pro announce leftover | `sites/vpannounce/index.html` | `itt23-vp23-lx` | checks | `sites/sdxl/index.html` |
| N15 | SDXL leftover | `sites/sdxl/index.html` | `itt23-sdxl-lx` | query | `sites/gen2/index.html` |
| N16 | Runway Gen-2 leftover | `sites/gen2/index.html` | `itt23-gen2-lx` | query | `sites/gpt4turbo/index.html` |
| N17 | GPT-4 Turbo leftover | `sites/gpt4turbo/index.html` | `itt23-turbo-lx` | query | `sites/nytvopenai/index.html` |
| N18 | NYT v OpenAI leftover | `sites/nytvopenai/index.html` | `itt23-nyt-lx` | checks | `sites/plugins/index.html` |
| N19 | Plus leftover literacy | `sites/chatgpt/plus.html` | `itt23-plus-lx` | query | `sites/chatgpt/gpt4.html` |
| N20 | GPT-4 leftover 2× | `sites/chatgpt/gpt4.html` | `itt23-gpt4-lx` | query | `sites/bing/chat.html` |
| N21 | Bing Chat leftover 2× | `sites/bing/chat.html` | `itt23-bing-lx` | query | `sites/bard/index.html` |
| N22 | Bard leftover 2× | `sites/bard/index.html` | `itt23-bard-lx` | hops | `sites/threads/index.html` |
| N23 | Threads leftover 2× | `sites/threads/index.html` | `itt23-th-lx` | query | `sites/twitter/x.html` |
| N24 | X leftover 2× | `sites/twitter/x.html` | `itt23-x-lx` | checks | `sites/claude2/index.html` |
| N25 | Claude 2 leftover 2× | `sites/claude2/index.html` | `itt23-c2-lx` | query | `sites/characterai/index.html` |
| N26 | Character.AI leftover 2× | `sites/characterai/index.html` | `itt23-cai-lx` | query | `sites/copilotx/index.html` |
| N27 | Copilot X leftover 2× | `sites/copilotx/index.html` | `itt23-cx-lx` | checks | `sites/bluesky/index.html` |
| N28 | Bluesky leftover 2× | `sites/bluesky/index.html` | `itt23-bsky-lx` | query | `sites/spotifyaidj/index.html` |
| N29 | Spotify AI DJ leftover | `sites/spotifyaidj/index.html` | `itt23-aidj-lx` | query | `sites/duolingomax/index.html` |
| N30 | Duolingo Max leftover | `sites/duolingomax/index.html` | `itt23-duo-lx` | checks | `sites/poe/index.html` |
| N31 | Quora Poe leftover | `sites/poe/index.html` | `itt23-poe-lx` | query | `sites/huggingfacechat/index.html` |
| N32 | HuggingChat leftover | `sites/huggingfacechat/index.html` | `itt23-hf-lx` | query | `sites/pika/index.html` |
| N33 | Pika Labs leftover | `sites/pika/index.html` | `itt23-pika-lx` | query | `sites/pi/index.html` |
| N34 | Inflection Pi leftover | `sites/pi/index.html` | `itt23-pi-lx` | query | `sites/neevashut/index.html` |
| N35 | Neeva shutdown leftover | `sites/neevashut/index.html` | `itt23-neeva-lx` | checks | `sites/writersstrike/index.html` |
| N36 | WGA leftover literacy | `sites/writersstrike/index.html` | `itt23-wga-lx` | checks | `sites/plugins/index.html` |

### Phases

**23-P0 · Read first · 20 min · [ ]**  
Open `2023-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2023/sites`). Do not create folders. Do not move `itt23-chatgpt-plus`.

**23-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**23-P2 · Home strip · [ ]**  
`years/2023/pages/home.html` · `<!-- ITT-2X-NEXT:2023 -->` below guided 6 · star chip `itt23-chatgpt-plus` unmoved · guided `<ol>` still 6.

**23-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2023.js`.

**23-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2023" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2023 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**23-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt23-chatgpt-plus` unmoved. Guided 6.

**Hard bans:** do not move `itt23-chatgpt-plus` · no 7th guided `<li>` · no dest-field “I read the 2023 period note” · no invented logos · no live models / ripped SWF / real payments · `itt23-*` only.

### Band C leftover (do not start unless named)

`bardabout` leftover ≠ Gemini · `beacons` · `notionai` · `plusabout` leftover literacy ≠ Plus gold · `threadsabout`

**23-C0–C3 · `[x]`** remaining REAL dests wired 2026-08-26 · `itt23-bardabout-rlx` passed.

---

# 2024
**Thesis (locked):** [`2024-READ-FIRST.md`](2024-READ-FIRST.md) — GPT-4o Talk. Lean.  
**Star stays:** GPT-4o Talk · `itt24-gpt4o`.  
**Band:** C · already 36 · closed gold.  
**Matrix on disk:** **36** writers (0 prior pack + 36 this-pass `-lx`).

### Goal
Visitor can already finish **36** leftover sessions from the 2024 denser pack. **Do not dump 36 more plaques.** Band C leftover = second-path 4× only on leftover dests that still have **zero** (typically `*about`). Lean cap stays.

**Visitor outcome**

```
Hub → 2024
  → About · bans · dual-cite
  → ★ GPT-4o Talk
  → 36 leftover REAL dests (incomplete never writes)
  → Exit · itt24-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Trail leftover → Next dest 200 | 10 |
| 2 | Empty field / 0–1 check / skip wait never writes | 10 |
| 3 | Home 2× strip (not a 7th guided step) | 8 |
| 4 | Isolation vs neighbor year | 8 |
| 5 | Map / trail lists every leftover key | 7 |

### This-pass flows on disk (`-lx`)

| ID | Session | File | Key | Kind | Next |
|----|---------|------|-----|------|------|
| N1 | nb-lx | `sites/notebooklm/index.html` | `itt24-nb-lx` | query | `sites/searchgpt/index.html` |
| N2 | sgpt-lx | `sites/searchgpt/index.html` | `itt24-sgpt-lx` | query | `sites/llama3/index.html` |
| N3 | llama-lx | `sites/llama3/index.html` | `itt24-llama-lx` | checks | `sites/grok/index.html` |
| N4 | grok-lx | `sites/grok/index.html` | `itt24-grok-lx` | query | `sites/rabbit/index.html` |
| N5 | rabbit-lx | `sites/rabbit/index.html` | `itt24-rabbit-lx` | checks | `sites/suno/index.html` |
| N6 | suno-lx | `sites/suno/index.html` | `itt24-suno-lx` | query | `sites/visionpro/index.html` |
| N7 | vp-lx | `sites/visionpro/index.html` | `itt24-vp-lx` | checks | `sites/perplexity/index.html` |
| N8 | pplx-lx | `sites/perplexity/index.html` | `itt24-pplx-lx` | query | `sites/voice/index.html` |
| N9 | voice-lx | `sites/voice/index.html` | `itt24-voice-lx` | wait | `sites/mini/index.html` |
| N10 | mini-lx | `sites/mini/index.html` | `itt24-mini-lx` | query | `sites/flux/index.html` |
| N11 | flux-lx | `sites/flux/index.html` | `itt24-flux-lx` | query | `sites/humane/index.html` |
| N12 | pin-lx | `sites/humane/index.html` | `itt24-pin-lx` | checks | `sites/gemini/index.html` |
| N13 | gem-lx | `sites/gemini/index.html` | `itt24-gem-lx` | hops | `sites/claude35/index.html` |
| N14 | c35-lx | `sites/claude35/index.html` | `itt24-c35-lx` | query | `sites/sora/index.html` |
| N15 | sora-lx | `sites/sora/index.html` | `itt24-sora-lx` | checks | `sites/appleintel/index.html` |
| N16 | ai-lx | `sites/appleintel/index.html` | `itt24-ai-lx` | checks | `sites/o1/index.html` |
| N17 | o1-lx | `sites/o1/index.html` | `itt24-o1-lx` | query | `sites/chatgpt/4o.html` |
| N18 | 4o-lx | `sites/chatgpt/4o.html` | `itt24-4o-lx` | query | `sites/notebooklm/index.html` |
| N19 | GPT Store leftover | `sites/gptstore/index.html` | `itt24-store-lx` | query | `sites/memory/index.html` |
| N20 | ChatGPT Memory leftover | `sites/memory/index.html` | `itt24-mem-lx` | query | `sites/claude3/index.html` |
| N21 | Claude 3 family leftover | `sites/claude3/index.html` | `itt24-opus-lx` | checks | `sites/devin/index.html` |
| N22 | Devin leftover | `sites/devin/index.html` | `itt24-devin-lx` | checks | `sites/udio/index.html` |
| N23 | Udio leftover | `sites/udio/index.html` | `itt24-udio-lx` | query | `sites/flash/index.html` |
| N24 | Gemini 1.5 Flash leftover | `sites/flash/index.html` | `itt24-flash-lx` | query | `sites/astra/index.html` |
| N25 | Project Astra leftover | `sites/astra/index.html` | `itt24-astra-lx` | checks | `sites/veo/index.html` |
| N26 | Veo leftover | `sites/veo/index.html` | `itt24-veo-lx` | wait | `sites/recall/index.html` |
| N27 | Copilot+ Recall leftover | `sites/recall/index.html` | `itt24-recall-lx` | checks | `sites/luma/index.html` |
| N28 | Luma Dream Machine leftover | `sites/luma/index.html` | `itt24-luma-lx` | query | `sites/gen3/index.html` |
| N29 | Runway Gen-3 leftover | `sites/gen3/index.html` | `itt24-gen3-lx` | query | `sites/artifacts/index.html` |
| N30 | Claude Artifacts leftover | `sites/artifacts/index.html` | `itt24-art-lx` | hops | `sites/llama31/index.html` |
| N31 | Llama 3.1 leftover | `sites/llama31/index.html` | `itt24-l31-lx` | checks | `sites/orion/index.html` |
| N32 | Meta Orion leftover | `sites/orion/index.html` | `itt24-orion-lx` | checks | `sites/o1mini/index.html` |
| N33 | o1-mini leftover | `sites/o1mini/index.html` | `itt24-o1m-lx` | query | `sites/canvas/index.html` |
| N34 | ChatGPT Canvas leftover | `sites/canvas/index.html` | `itt24-canvas-lx` | query | `sites/computeruse/index.html` |
| N35 | Computer Use leftover | `sites/computeruse/index.html` | `itt24-cu-lx` | checks | `sites/chatgptsearch/index.html` |
| N36 | ChatGPT Search leftover | `sites/chatgptsearch/index.html` | `itt24-csearch-lx` | query | `sites/gptstore/index.html` |

### Phases

**24-P0 · Read first · 20 min · [ ]**  
Open `2024-READ-FIRST.md` / READ-FIRST · research freeze · this table. Confirm slugs exist (`ls years/2024/sites`). Do not create folders. Do not move `itt24-gpt4o`.

**24-P1 · Inject leftover writers · [ ]**  
Band C: only inject on leftover dests that still have **zero** `data-4x-go` (about-rooms). Do not pad to 72.

**24-P2 · Home strip · [ ]**  
`years/2024/pages/home.html` · `<!-- ITT-2X-NEXT:2024 -->` below guided 6 · star chip `itt24-gpt4o` unmoved · guided `<ol>` still 6.

**24-P3 · urlMap · [ ]**  
No new folders this pass (existing dests only). urlMap already listed these rooms. If you later add a file, add it to `js/config/2024.js`.

**24-P4 · e2e · [ ]**  
```bash
npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover 2024" --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2024 --workers=1
```
Spec on disk. Run per-year grep when you re-open. Full 28-year pack is ~960 tests.

**24-P5 · Done when**  
36 keys already write. Band C leftover dests (below) each get one `-lx` or stay unmarked. dest-field 0. `itt24-gpt4o` unmoved. Guided 6.

**Hard bans:** do not move `itt24-gpt4o` · no 7th guided `<li>` · no dest-field “I read the 2024 period note” · no invented logos · no live models / ripped SWF / real payments · `itt24-*` only.

### Band C leftover (do not start unless named)

`beacons` · `notionai` · `bluesky` leftover 2nd · `characterai` leftover · `claude2` leftover. Closed for new gold dests.

**24-C0–C3 · `[x]`** remaining REAL dests wired 2026-08-26 · `itt24-bard-rlx` passed.

---

# Wiped years 2005 · 2006 · 2007

**Status:** trees gone. Hub cards locked. Matrix still holds **18 orphan rows per year** from the first 2× pack.

### Phases

**05-P0 · Do not restore · `[x]` law**  
Read [`WIPE-2005-2006-2007-MINUTE-2026-08-24.md`](WIPE-2005-2006-2007-MINUTE-2026-08-24.md). Do not `git checkout` those trees.

**05-P1 · Orphan matrix · `[ ]` optional**  
Either leave `e2e/2x-links-all-years.spec.js` skipping missing `years/YYYY/index.html` (current behavior) or delete the 54 orphan rows. Do not implement writers.

---

# Re-open checklist (one year)

Copy this when someone names a year.

1. Recite star, prefix, guided-6, ILS ban, dest-field ban.  
2. Open that year’s section above + READ-FIRST / RESEARCH.  
3. `ls years/YYYY/sites` against the N-table.  
4. If Band C: only rooms with zero `data-4x-go`.  
5. Inject **one** writer. Empty Go. Complete Go. Check `localStorage`.  
6. Repeat. Do not batch-invent folders.  
7. Home strip. Guided still 6.  
8. `npx playwright test e2e/2x-links-all-years.spec.js --grep "2× leftover YYYY" --workers=1`  
9. `node scripts/audit-mock-flows.js`  
10. Stop. Do not start the next year until this one is green.

---

# Recite before you type HTML

2× is leftover REAL writers. Empty never writes. Guided is 6. Stars stay. 2005–2007 stay wiped. Hosting.com June ranks are order-of-magnitude. 2026 Wikipedia ranks stay in 2026. Prefer rooms that already exist. Dest-field is a fail. Then name a year and implement from that year’s N-table.

