# Lean double — phases, steps, goals

**Date:** 2026-09-24  
**Law:** [`LEAN-DOUBLE-CRITERIA.md`](LEAN-DOUBLE-CRITERIA.md) D1–D15.  
**Ship law when they disagree:** [`DISK-TRUTH.md`](DISK-TRUTH.md) and `scripts/itt_gate.py`.  
**This file does not add dest HTML.** A named implement pass comes after the cited list.

**5,000 websites is the research walk.** It is not 5,000 new folders. A site is kept only with a cite, only if it was famous in that year, and only if that folder is not already used. Official flows stay at 10. Leftover-3× catalogs stay empty. Incomplete never writes. Leftover never writes the year star. No invented brand pixels.

The companion research run is `deep-research` (started 2026-09-24). It reads the repo markdown and ranked web lists. It does not open 5,000 pages by itself.

---

## Goal

Fill thin lean doors up to the cap in the criteria, with leftover dests that were popular that year. Miss the cap rather than invent a dest.

| Class | Years | This pass |
|---|---|---|
| Double leftover dests | 2007, 2010, 2011, 2012, 2014, 2016, 2021, 2022 | New leftover dests, one writer each, dest-disjoint |
| Holes only | 2013, 2020 | A row only when a cite names a real hole |
| Stop | Forests 1994–2006 and 2008, boarded 2009, dense 2015 / 2017 / 2019, wiped 2023–2025 | No new dests |

**2018 conflict.** The criteria still lists 2018 as a thin door (GDPR Manage, aim 26). Live disk has no 2018 tree. Do not restore it in this pass unless a later note says the wipe was a mistake.

---

## Live disk vs the 20 Sep cap

Recount before any HTML. Caps below are the criteria aims, not a quota. Counts are first-level dest folders on 24 Sep 2026.

| Year | Live dests | Criteria cap | Room under the cap | Pass |
|---:|---:|---:|---:|---|
| 2007 | 33 | 46 | 13 | Double |
| 2010 | 29 | 44 | 15 | Double |
| 2011 | 41 | 62 | 21 | Double |
| 2012 | 32 | 48 | 16 | Double |
| 2013 | 47 | 54 | 7 | Holes only |
| 2014 | 25 | 36 | 11 | Double |
| 2016 | 53 | 64 | 11 | Double |
| 2018 | 0 (wiped) | 26 | — | Stop until the wipe is reopened on purpose |
| 2020 | 22 | 38 | — | Holes only. Live tree is already under the old 38. Do not fill it back up |
| 2021 | 18 | 30 | 12 | Double |
| 2022 | 24 | 38 | 14 | Double |

Official 10 does not grow. 2012 leftover-4× (Chrome, Twitter, SoundCloud) stays 4×, not a second leftover dest.

---

## Phase 0 — Lock the rules

**Goal:** One law before any site is proposed.

1. Read [`LEAN-DOUBLE-CRITERIA.md`](LEAN-DOUBLE-CRITERIA.md) D1–D15 and §5 taken slugs.
2. Read [`DISK-TRUTH.md`](DISK-TRUTH.md). Where the 20 Sep scorecard disagrees with the tree, the tree wins.
3. Freeze the stop list: forests, 2009, 2015, 2017, 2019, 2023–2025, and 2018 while it stays wiped.
4. Freeze do-not-propose rows in criteria §14 (neighbor gold, dest-lock skips, traps).

**Done when:** A year is labeled Double, Holes, or Stop, and taken slugs for that year are listed.

---

## Phase 1 — Walk the sources

**Goal:** Consider more than 5,000 period websites. Extract candidates. Do not build folders.

### Step 1.1 — Repo markdown

Read these in full. They are the sources we already have.

| Source | What to take |
|---|---|
| [`SOURCES.md`](SOURCES.md) | Primary cites and failed-final reasons |
| [`YEAR-BY-YEAR-RESEARCH-STEPS.md`](YEAR-BY-YEAR-RESEARCH-STEPS.md) | Year-true launches and mass |
| [`DEST-TRUE-FLOW-NAMES.md`](DEST-TRUE-FLOW-NAMES.md) | Names already used |
| [`LEFTOVER-2X-UNIQUE-LINKS.md`](LEFTOVER-2X-UNIQUE-LINKS.md) | Links already shipped |
| [`DUPLICATE-UNIQUE-LINKS.md`](DUPLICATE-UNIQUE-LINKS.md) | Slugs that must stay unique |
| [`TODO-EXTRA-DEST-RESEARCH.md`](TODO-EXTRA-DEST-RESEARCH.md) | Open research rows |
| `docs/2x-harvest-c-1999.md` through `docs/2x-harvest-c-2004.md` | Forest harvest. Cite only. Do not copy those dests onto lean years |
| Criteria §5 and §13 | Slugs already on disk |

### Step 1.2 — Web ranks

For each Double year, open a primary or labeled secondary rank. Use the envelope in criteria §6:

- Wikipedia category of internet properties established that year
- Timeline of the history of the Internet
- Cybercultural year essay `https://cybercultural.com/p/internet-YYYY/`
- Web Design Museum gallery `https://www.webdesignmuseum.org/gallery/year-YYYY`
- Hosting.com most-visited since 1995
- Period company blog, newsroom, or SEC filing
- Wayback capture, or an honest `[failed-final]` if the capture is gone

Internet Live Stats June website counts end in 2018. Do not invent a later June cell.

### Step 1.3 — Candidate row

For every site that might become a dest, write one row:

`year · slug · plain name · why it was popular that year · source title · source locator · already on disk?`

**Done when:** The walk has considered more than 5,000 websites across the markdown and the ranks, and every candidate row has a locator. Uncited names are dropped here.

---

## Phase 2 — Score every candidate

**Goal:** KEEP or DROP. One miss fails the row.

Run D1–D15 on each row. Drop if any of these is true:

1. The slug is already an official stop, a leftover trail stop, a 2× link, a 4× dest, or a taken slug in criteria §5.
2. The same dest would have two keys (`lx` and `d2` counted as two dests).
3. The verb is a cloned “open leftover” with no period action.
4. The fame belongs to a neighbor year (the star of the next year, or a trap in §14).
5. There is no cite.
6. The year is Stop, or Holes with no cited hole.
7. The row would grow official 10 or leftover-3×.

**Done when:** Each Double year has a KEEP list no longer than the room under the cap. Holes years have a KEEP list of zero unless a cite names the hole. Forests have no KEEP list.

---

## Phase 3 — Cite check

**Goal:** A second reader confirms the KEEP list. The deep-research run is this phase.

1. For each KEEP row, open the source locator again.
2. Confirm the year of fame matches the door.
3. Confirm the slug is still absent on disk.
4. Mark the row KEEP, DROP, or DO-NOT-APPLY.
5. Write the result with the source title and locator on every KEEP row.

**Done when:** No KEEP row lacks a locator, and no KEEP row reuses a slug already on that year.

---

## Phase 4 — Named implement

**Goal:** HTML only for KEEP rows, after this phase is named. Not during research.

For each KEEP dest, in order:

1. One folder `years/YYYY/sites/<slug>/`.
2. One leftover writer. Key shape `ittYY-<slug>-lx`. One key. Not a second `-d2` on the same dest.
3. Empty field and zero ticks write nothing.
4. A finished visit writes that leftover key and reveals the next leftover stop.
5. The year star key is never written from this dest.
6. No invented logo. Use `[failed-final]` or a real capture cite.
7. Add the slug once to the leftover-2× link list. Do not also put it on the official trail.
8. Stop at the cap. Extra cited rows wait.

**Done when:** Dest count is at or under the cap, every new page resolves, and no new slug appears twice.

---

## Phase 5 — Prove the flows

**Goal:** The new dests behave, and old doors do not change.

1. e2e: empty never writes, complete writes the leftover key, leftover never writes the star, slug is not on the official trail.
2. Mock gate: `DEST_FIELD`, `WEAK_REAL`, and `HASH_CTA` stay 0 on the new dests.
3. Recount official stops. They are still 10 (2012, 2013, and 2014 stay at their current shorter trails until a separate pass says otherwise).
4. Leftover-3× catalogs stay empty. 2012 leftover-4× stays the three named dests.
5. Hub still says 27 years. 2009 stays boarded. 2018 stays wiped.

**Done when:** Those checks pass on every year that received a new dest, and Stop years are unchanged.

---

## Phase 6 — Stop

**Goal:** Do not keep going because the cap was not hit.

- A year with no more cited, dest-disjoint, year-true sites stops under the cap.
- Do not dest-farm to raise a percentage.
- Do not restore 2009, 2018, or 2023–2025 from this map.
- Do not commit until a named commit pass.

---

## Order

```
Phase 0  lock rules and taken slugs
Phase 1  read markdown + web ranks  (>5,000 sites considered)
Phase 2  KEEP / DROP against D1–D15
Phase 3  second reader confirms cites   ← deep-research
Phase 4  named HTML pass, one writer each
Phase 5  e2e + mock + recount
Phase 6  stop under the cap
```

Do not start Phase 4 from the research notes alone.
