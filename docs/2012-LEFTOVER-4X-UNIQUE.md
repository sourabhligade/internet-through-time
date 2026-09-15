# 2012 leftover-4× unique — step map

**Date:** 2026-09-15  
**Status:** Implemented 2026-09-15. Chrome · Twitter · SoundCloud dests already on disk. Stacked leftover-4× still 0.  
**Law:** leftover-3× unique U1–U11 / M1–M4 in [`LEFTOVER-3X-UNIQUE-CRITERIA.md`](LEFTOVER-3X-UNIQUE-CRITERIA.md). Same criteria. Fourth **strip**, not a fourth machine.  
**Lock today:** [`2012-READ-FIRST.md`](2012-READ-FIRST.md) leftover 4× **= 0**. [`DISK-TRUTH.md`](DISK-TRUTH.md) 2012 leftover 4× **0**. Implementing this pass **lifts that lock to 3 dests**, not stacked leftover-4× on every dest.

Leftover-4× unique here means **one more leftover dest strip of 3 dests already on disk**. It is **not** `data-4x-go` stacked on Snapchat. It is **not** dest-farm.

---

## 0. Law (copy leftover-3× unique)

| # | Pass | Fail |
|---|------|------|
| **U1** | One dest folder / one href | Fourth strip on Snapchat / Pizza Hut |
| **U2** | One key `itt12-pop4-<id>` per dest | `pop` + `pop4` on the same dest · `lx` + `d2` as flows |
| **U3** | Period verb for **that** dest | Shared cream + different H1 only |
| **U4** | Dest ∉ official 10 hrefs · dest ∉ leftover-3× 9 | Chrome as gold · Instagram Android leftover |
| **U5** | Official 10 + leftover-3× 9 + leftover-4× 3 = **22 keys / 21 dest folders** | New dest folders to “make 4×” |
| **U6** | Only `itt12-ig-android` writes gold | Leftover-4× writes the star |
| **U7** | Empty / 0 ticks / no pick never writes | Any click writes |
| **U8** | Trap (IG Android as gold / neighbor year) never writes leftover | Trap = save |
| **U9** | Leftover dest face **visible** on that dest · Starting Point leftover-4× **not** first paint | Cream leftover-4× on IG Android first paint · dest face folded |
| **U10** | failed-final / capture-cite | Invented Chrome / Twitter / SoundCloud pixels |
| **U11** | 2012 products only | Stories · Vine 6s · iPhone 6 · X wordmark |
| **M1–M4** | keep vs trap · field · 2 honesty ticks · Go · not DEST_FIELD / WEAK_REAL / HASH_CTA | Factory dest-field plaque |

**Do not dest-farm.** If a dest is not already under `years/2012/sites/`, **stop**.

---

## 1. Disk set (already measured)

| Set | Dest folders |
|-----|----------------|
| Official 10 | instagram · pinterest · facebook · iphone · wikipedia · medium · path · flipboard · playable |
| leftover-3× 9 | drawsomething · googledrive · snapchat · uber · buzzfeed · youtube · reddit · surface · windows8 |
| **Unused (4th-strip pool)** | **amazon · chrome · google · soundcloud · twitter · yahoo** |

24 dest folders on disk. Official 9 folders + leftover-3× 9 + unused 6 = 24. **No new folders.**

---

## 2. Named fourth strip (3 dests)

Pick from unused pool. Thesis-locked (2012-READ-FIRST): Chrome passes IE · SoundCloud leftover not star · Twitter still Twitter.

| n | Dest | Folder (exists) | Key | Verb (2012 leftover, not gold) |
|--:|------|-----------------|-----|--------------------------------|
| 1 | Chrome | `sites/chrome/index.html` | `itt12-pop4-chrome` | Chrome leftover (IE is residual, not gold) |
| 2 | Twitter | `sites/twitter/index.html` | `itt12-pop4-twitter` | Tweet leftover (not the star) |
| 3 | SoundCloud | `sites/soundcloud/index.html` | `itt12-pop4-soundcloud` | Listen leftover (not the star) |

Left unused on purpose: amazon · google · yahoo (do not dest-farm a fifth strip).

---

## 3. Look (copy leftover-3× unique dest face)

On **that dest only**, one cream panel. Same as Snapchat leftover-3× (`years/2012/sites/snapchat/index.html`):

1. Room title stays the dest name.
2. One panel `#fff8dc` · `1px solid #333` · `data-itt-lo3x="1"` · `data-itt-dest-true="1"` · `data-pop-panel="1"`.
3. Line: `<dest> · dest-true leftover-4× · incomplete never writes · <code>itt12-pop4-<id></code>`.
4. Keep + trap (trap = Instagram Android as gold).
5. Required field.
6. Two honesty checks (2012 lock · empty never writes gold).
7. Go: `data-pop-go` + `data-pop-key="pop4-<id>"`.
8. Next-flow hidden until complete: Chrome → Twitter → SoundCloud → Chrome.

**Comments:** `<!-- ITT-POP4:<id>:start -->` … `<!-- ITT-POP4:<id>:end -->`.

**Fail:** `data-4x-go` stacked leftover-4× machine · `lx`/`d2` as the unique flow · cream on `instagram/android.html`.

---

## 4. Sequence (do in this order)

### Step A — Lift the lock (docs, before HTML)

| File | Change |
|------|--------|
| `docs/2012-READ-FIRST.md` | leftover 4× **0** → leftover-4× unique **3 dests** (chrome · twitter · soundcloud). Still **0 stacked leftover-4×**. |
| `docs/DISK-TRUTH.md` | 2012 leftover 4× **0** → leftover-4× unique **3**. Stacked leftover-4× stays **0**. |
| `docs/LEFTOVER-3X-UNIQUE-CRITERIA.md` | Add leftover-4× unique row: strip **4** · 3 dests · `ittYY-pop4-<id>` · 2012 only this pass. |
| `docs/2012-LEFTOVER-4X-UNIQUE.md` | This file. Status → implementing when Step B starts. |

**Done when:** lock text no longer says leftover-4× = 0 as a ban on this strip.

### Step B — Catalog

| File | Change |
|------|--------|
| `scripts/leftover-3x-unique.json` | Add `"2012".fourth` (or sibling `scripts/leftover-4x-unique.json`) with the 3 dests + keys. |
| `e2e/leftover-3x-unique.matrix.json` **or** `e2e/leftover-4x-unique.matrix.json` | 3 rows: year `2012`, kind `fourth`, id, key, href, star `itt12-ig-android`. |

**Done when:** JSON dest ids = chrome, twitter, soundcloud. Intersection with official 10 hrefs = ∅. Intersection with leftover-3× 9 = ∅.

### Step C — Dest HTML (3 files only)

Edit existing dests. **Do not add folders.**

| File | Work |
|------|------|
| `years/2012/sites/chrome/index.html` | Insert leftover-4× cream panel. Keep existing room. |
| `years/2012/sites/twitter/index.html` | Same. |
| `years/2012/sites/soundcloud/index.html` | Same. |

Reuse leftover-3× unique engine (`data-pop-go` + `data-pop-key="pop4-<id>"`). Do **not** wire `data-4x-go` leftover-4× machines.

**Done when:** each dest has exactly **one** leftover-4× panel. Incomplete Go writes nothing. Complete writes only `itt12-pop4-<id>`. Star `itt12-ig-android` stays empty.

### Step D — Dest-lock keep

`scripts/dest_lock_lean.py` LEAN already includes 2012. Official 10 + leftover-3× dests are kept. Confirm **chrome, twitter, soundcloud** stay in the keep set (they already exist). Do not dest-lock them away.

**Done when:** `ls years/2012/sites` still has those three folders.

### Step E — Starting Point / official dests

- Do **not** add a 7th guided `<li>`.
- Do **not** put leftover-4× cream on `instagram/android.html`.
- Starting Point leftover-4× strip (if any) folds into **Also this year**.
- Dirbar stays official 10.

**Done when:** first paint on Starting Point is still star + guided 6 + official 10.

### Step F — e2e

| File | Work |
|------|------|
| `e2e/leftover-4x-unique.spec.js` (new) | Same contract as leftover-3× unique: empty never writes · complete writes `itt12-pop4-<id>` · never `itt12-ig-android`. |
| `e2e/2012-4x-flows.spec.js` | If restored, it must test **these 3 dests**, not dest-lock dests (vinewait). Do not revive stacked leftover-4×. |

**Done when:** 3 dest-true tests pass. `year-home-densify` 2012 still 6 + official 10.

### Step G — Mock + gate

- `scripts/audit-mock-flows.js` must not class the new panels as `DEST_FIELD` / `WEAK_REAL` / `HASH_CTA`.
- Do not invent Chrome / Twitter / SoundCloud logos.

**Done when:** those 3 dests are not mock-red for the leftover-4× save.

---

## 5. Do not

- Stack leftover-4× (`data-4x-go`) on leftover-3× dests or official dests.
- Add dest folders (amazon already exists — unused on purpose).
- Grow leftover-4× unique to other years in this pass.
- Restore 115-room 2012 forest.
- Write `itt12-ig-android` from leftover-4×.
- Vine · Stories · iPhone 6 · X · Material.
- Invent brand pixels.
- Change guided from 6.
- Dest-lock 2013 / 2018 / 2022 / forests.

---

## 6. Stop conditions

Stop and do not invent dests if:

- chrome / twitter / soundcloud folder is missing (they are not), or
- leftover-3× unique engine cannot key `pop4-*` without a new engine — then extend the existing pop engine, do not dest-farm.

---

## 7. Deep-research

Companion run `deep-research` is still open. This file is the **criteria map**. Implement **only after you say go**. The report may confirm or replace the three dest names; dests must still come from the unused pool in §1.
