# P0–P3 implement bible — 3× links · un-dupe · extra-c/d/e

**Date:** 2026-08-24  
**Parent research:** [`3X-LINKS-EVERY-YEAR-MEASURABLE-RESEARCH-2026-08-24.md`](3X-LINKS-EVERY-YEAR-MEASURABLE-RESEARCH-2026-08-24.md)  
**Status:** execute this file. Git only if asked.

**Locks (do not break)**

1. Stars stay. Guided `<ol>` stays **exactly 6**.  
2. Official 10 keys stay. L4 third trio (`data-itt-pop-3x3`) dests stay.  
3. 2005 / 2006 / 2007 **site folders** stay HEAD. Do **not** restore `etsy/` · `friendfeed/`.  
4. Incomplete REAL never writes. Never invent brand pixels. No ripped SWF.  
5. Forest: 0 new site rooms. Lean extra-c/d/e = **+3 playable HTML** only.

---

# P0 — re-stamp 3×-also on 2005–2007

**Why:** HEAD revert stripped `ITT-3X-ALSO` / `ITT-3X-LINKS`. Cov is 2.5% / 1.9% / 0%.

**Engine:** [`scripts/build-3x-links.py`](../scripts/build-3x-links.py)  
Idempotent. Replaces marked blocks only. Does **not** create rooms.

**Minute steps**

1. Confirm dests we deleted are still gone:
   - `years/2007/sites/etsy/` **absent**
   - `years/2007/sites/friendfeed/` **absent**
2. Run from repo root:
   ```bash
   python3 scripts/build-3x-links.py
   ```
   Script walks **1994–2022**. That is correct: lobby/also rewrite is idempotent; `flow-maps-3x.js` is regenerated from on-disk rooms.
3. **2007 is not in `LEAN_NO_LOBBY`** (that set is 2010–2022). After the run, 2007 lobby pages (`home` · `about` · `whats-new` · `cool` if present) get `[data-itt-3x-links]` listing the **18** committed rooms. Dest pages get `[data-itt-3x-also]`.
4. 2005 / 2006: lobby on the 4 lobby pages; also-stamp on dest HTML.
5. Count:
   ```
   2005 content also+lobby ≥ 300   (was 8)
   2006 content also+lobby ≥ 300   (was 6)
   2007 dest pages with also ≥ 20  (was 0)
   ```
6. `e2e/3x-links.spec.js` still: home has lobby **or** pop3x · guided 6 · star · sample href 200.

**Do not:** add rooms. Do not edit year extras. Do not move stars.

---

# P1 — 9 broken 3× hrefs → 0

**Measured 2026-08-24 (before P0):**

| n | Year | From | href |
|--:|-----:|------|------|
| 1–4 | 2003 | home / about / whats-new / cool | `../s` |
| 5 | 2006 | home | `../sites/napster/about.ht` |
| 6–9 | 2008 | home / about / whats-new / cool | `../sites/mashable/ab` |

**Minute steps**

1. After P0, re-scan 3× blocks for hrefs that do not resolve to a file.  
2. If P0 rewrite already dropped the truncated strings, P1 is **0 remaining**.  
3. If any remain **inside** `ITT-3X-LINKS` / `ITT-3X-ALSO`, delete that one `<a>` or point it at a real dest (`sites/napster/index.html`, drop mashable if no folder).  
4. Do **not** invent `mashable/` or a napster `about.ht`.  
5. Close when broken count = **0**.

---

# P2 — un-dupe L3 vs L4 on 2007 · 2009 · 2011

**Keep L4** (`data-itt-pop-3x3`) — e2e `year-3x3` writes `itt07-pop3-justin` / `itt09-pop3-mafiawars` / `itt11-pop3-snapchat`.

**Change only L3** (`data-itt-pop-more`) to three **other existing** dests.

| Year | L4 stays | New L3 pop-more | Files that must exist |
|-----:|----------|-----------------|------------------------|
| 2007 | justin · ustream · qik | **gmail · maps · twitter** | `years/2007/sites/{gmail,maps,twitter}/index.html` |
| 2009 | mafiawars · whatsapp · ubercab | **farmville · bing · wolframalpha** | `years/2009/sites/{farmville,bing,wolframalpha}/index.html` |
| 2011 | snapchat · tumblr · youtube | **spotify · iphone · airbnb** | `years/2011/sites/{spotify,iphone,airbnb}/index.html` |

**Minute steps**

1. Confirm the six dest folders exist (they do on HEAD lean doors).  
2. Edit only the `<p data-itt-pop-more="YYYY">` inner links on:
   - `years/2007/pages/home.html`
   - `years/2009/pages/home.html`
   - `years/2011/pages/home.html`  
   If about/map copy the same strip, change those too (grep `data-itt-pop-more`).  
3. Do **not** edit `data-itt-pop-3x3` or first `data-itt-pop3x`.  
4. `e2e/year-more-3x.spec.js` only asserts **3** `a[href*="sites/"]` — new slugs are fine.  
5. Close when:
   - pop-more slugs ≠ pop-3x3 slugs on those three years  
   - each of the 9 hrefs is HTTP 200  
   - guided 6 · stars unchanged

---

# P3 — extra-c / extra-d / extra-e on 9 hole years

**Holes:** 2007 · 2009 · 2011 · 2013 · 2014 · 2019 · 2020 · 2021 · 2022

**Engine:** [`scripts/build-3-more-games.py`](../scripts/build-3-more-games.py)  
Already has G() rows for **2007 · 2009 · 2011**. They are skipped by:

```
WIPED = {"2007", "2009", "2011", "2013", "2014"}
```

**Minute steps**

1. Set `WIPED = set()` (or drop those five). 2013–2014 and 2019–2022 still need **new G() rows**.  
2. Add three games per missing year (C portal · D viral · E thesis toy). No official art. Keys `ittYY-game-<slug>`.

| Year | C | D | E |
|-----:|---|---|---|
| 2007 | Dart Lane (`dartlane`) already in script | Desk Path (`deskpath`) | Trick Card (`trickcard`) |
| 2009 | Roof Run (`roofrun`) | Orpheus Climb (`orclimb`) | Wilt Clock (`wiltclock`) |
| 2011 | Rush Lane (`rushlane`) | Grip Hold (`griphold`) | Spent Week (`spentweek`) |
| 2013 | Loop Spare (`loopspare`) parlor | Story Hold (`storyhold`) hold | Flat Tap (`flattap`) quiz |
| 2014 | Slack Chan (`slackchan`) parlor | Ice Pour (`icepour`) draw | Rotate TLS (`rotatels`) quiz |
| 2019 | Row Extra (`rowextra`) parlor | Stadia Wait (`stadiawait`) hold | Arcade Card (`arcadecard`) quiz |
| 2020 | Mute Round (`muteround`) parlor | Reel 15 (`reel15`) hold | Flash Brick (`flashbrick`) quiz |
| 2021 | Sig Handle (`sighandle`) parlor | Wait Copilot (`waitcop`) quiz | Meta Note (`metanote`) quiz |
| 2022 | Word Guess (`wordguess`) quiz | Masto Inst (`mastoinst`) parlor | BeReal 2 (`bereal2`) hold |

3. Run:
   ```bash
   python3 scripts/build-3-more-games.py
   ```
   Writes `years/YYYY/sites/playable/extra-{c,d,e}.html` · `js/games/year-YYYY-<slug>.js` · updates `year-extra-games.js` 3G block · `e2e/year-extra-cde.matrix.json` · playable index strip · urlMap rows.  
4. Count: **+27 HTML** (9×3). Lean years stay under ~50.  
5. `npm run test:e2e:3g` (`e2e/year-extra-cde.spec.js`) — Start+Finish with `?test=1` writes REAL; Finish alone does not.

**Do not:** replace `game.html`. Do not add `game-6`. Do not add a third famous cabinet.

---

# Verify (after all four)

```bash
python3 scripts/check-all-years.py
# 3× links + leftover uniqueness
npx playwright test e2e/3x-links.spec.js e2e/year-3x3.spec.js e2e/year-more-3x.spec.js --workers=2
npx playwright test e2e/year-extra-cde.spec.js --workers=2
```

**Close table**

| Phase | Done when |
|-------|-----------|
| P0 | 2005 cov ≥98% · 2006 ≥98% · 2007 dests have also |
| P1 | 3× href 404 count = 0 |
| P2 | 2007/2009/2011 pop-more ≠ pop-3x3 · 9 dests 200 |
| P3 | those 9 years have extra-c/d/e · 3g e2e green |

---

# Execute log — 2026-08-24 (closed)

Locks held: no new site rooms · etsy/friendfeed still absent · guided 6 · stars untouched · 2005–2007 folders stay HEAD.

## P0 — re-stamp

`python3 scripts/build-3x-links.py` (idempotent, all years). P3’s extra-c/d/e emit wiped also-stamps on those playable pages, so the linker was run **again** after P3.

| Year | Lobby | Also / dests | Cov | etsy / friendfeed |
|-----:|------:|-------------:|----:|-------------------|
| 2005 | 4/4 | 308/308 | **100%** | absent |
| 2006 | 4/4 | 313/313 | **100%** | absent |
| 2007 | 3/3 | 26/26 | **100%** | absent |

Forest years 1994–2009 now 100% lobby+also. Lean 2010–2022 stay 88–95% (`LEAN_NO_LOBBY`).

## P1 — broken hrefs

The 9 truncated strings (`../s`, `about.ht`, `mashable/ab`) were measurement-window artifacts **and** leftover from the pre-P0 stamp. After the rewrite:

| Scan | Pages | 3× hrefs | 404 |
|------|------:|---------:|----:|
| `ITT-3X-LINKS` + `ITT-3X-ALSO` marked blocks, 1994–2022 | 3,521+ | **87,203** | **0** |

## P2 — un-dupe L3 vs L4

Edited only `data-itt-pop-more` on `years/{2007,2009,2011}/pages/home.html`. L4 `data-itt-pop-3x3` unchanged.

| Year | L2 stays | L3 now | L4 stays | L2∩L3∩L4 |
|-----:|----------|--------|----------|-----------|
| 2007 | yahoo · wikipedia · amazon | **gmail · maps · twitter** | justin · ustream · qik | ∅ |
| 2009 | omegle · chatroulette · wikipedia | **farmville · bing · wolframalpha** | mafiawars · whatsapp · ubercab | ∅ |
| 2011 | icloud · pinterest · linkedin | **spotify · iphone · airbnb** | snapchat · tumblr · youtube | ∅ |

All 9 dest `index.html` exist.

## P3 — extra-c/d/e on 9 hole years

`WIPED = set()` in `scripts/build-3-more-games.py`. Added G() rows for 2013 · 2014 · 2019–2022. Emitter wrote HTML + year-game JS + `year-extra-games.js` 3G block + `e2e/year-extra-cde.matrix.json`.

| Year | C | D | E | keys |
|-----:|---|---|---|------|
| 2007 | Dart Lane | Desk Path | Trick Card | `itt07-game-{dartlane,deskpath,trickcard}` |
| 2009 | Roof Run | Orpheus Climb | Wilt Clock | `itt09-game-{roofrun,orclimb,wiltclock}` |
| 2011 | Rush Lane | Grip Hold | Spent Week | `itt11-game-{rushlane,griphold,spentweek}` |
| 2013 | Loop Spare | Story Hold | Flat Tap | `itt13-game-{loopspare,storyhold,flattap}` |
| 2014 | Slack Chan | Ice Pour | Rotate TLS | `itt14-game-{slackchan,icepour,rotatels}` |
| 2019 | Row Extra | Stadia Wait | Arcade Card | `itt19-game-{rowextra,stadiawait,arcadecard}` |
| 2020 | Mute Round | Reel 15 | Flash Brick | `itt20-game-{muteround,reel15,flashbrick}` |
| 2021 | Sig Handle | Wait Copilot | Meta Note | `itt21-game-{sighandle,waitcop,metanote}` |
| 2022 | Word Guess | Masto Inst | BeReal Two | `itt22-game-{wordguess,mastoinst,bereal2}` |

Follow-up (not a new room): 2021 / 2022 leftover strips (`pop3x` · `pop-more` · `pop-3x3`) sit **outside** the collapsed `<details>` so `toBeVisible()` holds.

## Verify (ran)

```
python3 scripts/check-all-years.py
# 29 on disk · 29 pass · 0 fail

npx playwright test e2e/3x-links.spec.js e2e/year-3x3.spec.js \
  e2e/year-more-3x.spec.js e2e/year-extra-cde.spec.js --workers=2
# 197 passed (30.0s)
```

Includes 2021/2022 3×-links + year-3x3 + year-more-3x, and extra-c/d/e Start+Finish REAL on all 9 hole years. Guided ol sample stays 6.

| Phase | Result |
|-------|--------|
| P0 | **closed** — 2005/2006/2007 dest also = 100% · 0 new rooms |
| P1 | **closed** — 3× href 404 = 0 |
| P2 | **closed** — L3 ≠ L4 on 2007/2009/2011 |
| P3 | **closed** — 29/29 have extra-c/d/e · 3g e2e green |

**Not in this pass:** P4 (2012 extra-a/b) · P5 (tighten year-3x3 to assert L3 ≠ L4).

---

*Implement from this file. Do not start P4 (2012 extra-a/b) here.*
