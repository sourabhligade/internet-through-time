# Product improve map

**Historical (2026-09-30 docs pass).** Not ship law. Live hub is **26 doors** (1994–2016 and 2020–2022). **2015 is the React door.** **2017–2019 and 2023–2025 are absent.** Leftover-3× unique catalogs are **empty**. Current maps: [`DISK-TRUTH.md`](../DISK-TRUTH.md) · [`INCOMPLETE-MAP.md`](INCOMPLETE-MAP.md) · [`UNDONE-UNPLANNED-MD.md`](UNDONE-UNPLANNED-MD.md).


**Date:** 2026-09-27
**Status:** Historical recommendation. Not ship law. Live year list is [`DISK-TRUTH.md`](../DISK-TRUTH.md).
**Snapshot (2026-09-29), not live law:** hub **22** years (1994–2007 + 2010 + 2012–2017 + 2022). That snapshot called 2015 and 2017 React doors, called 2009 boarded, and called 2011, 2018–2021, and 2023–2025 absent. Counts below are that snapshot. Live doors are the header and [`DISK-TRUTH.md`](../DISK-TRUTH.md): **26 doors**, 1994–2016 and 2020–2022, React 2015 only.

---

## 1. What this product is

Year-locked, clickable rooms in period chrome. Not a screenshot gallery. Not a raw archive.

| This museum | Wayback Machine | [Web Design Museum](https://www.webdesignmuseum.org/) | [oldweb.today](https://oldweb.today) | [restorativland](https://restorativland.org/) |
|---|---|---|---|---|
| Curated year + OS + browser | Any URL + date | Screenshots / video | Period browser + archive | Restored ruins (GeoCities, MySpace Music) |
| Star / leftover / incomplete-never-writes | No year law | Look, don’t use | Rendering is the exhibit | Wander neighborhoods |
| 22 open years | 800B+ pages | Thousands of captures | Emulation | Millions of lost pages |

**Advantage:** meaning. 2005 does not give you the iPhone. Accept All never writes. Follow Yahoo through years in that year’s chrome.

**Do not compete** with Wayback on coverage or WDM on screenshot count.

---

## 2. Data on disk (audit snapshot)

The counts in this section are the 2026-09-13 snapshot. That snapshot is not the live list. Live law is the header and [`DISK-TRUTH.md`](../DISK-TRUTH.md): **26 doors**, 1994–2016 and 2020–2022, React 2015 only. 2017–2019 and 2023–2025 are absent.

| Layer | Count (2026-09-13 working tree) |
|---|---|
| Playable years | 26 |
| Dest folders | 6,449 |
| HTML pages | 9,588 |
| e2e specs | 330 + 19 matrices |
| Period assets | Strong 1994–2007. **2012 / 2013 / 2015 = 0 files.** 2010 = 4. 2009 thin. |

Density is harvest history, not “how big the year was”:

| Year | Dests | Read as |
|---|---|---|
| 2004 | 810 | Forest / warehouse |
| 1999 / 2000 | 432 / 486 | Forest |
| 2007 | 246 | Lean door (iPhone Safari) |
| / 2012 / | 98 / 45 / 13 | Lean door (reverted to HEAD) |
| / 2021 | 165 / 294 | Lean + leftover dest-farm still on disk |
| 2009 | 78 | Boarded — visitor never enters |
| 2022+ | — | Wiped |

Leftover-2× on **every dest**, plus leftover-3× / 4× / dest-farm, is a second museum. Tests walk it. First-time visitors hit yellow machines.

`SOURCES.md` still points at deleted dossiers (`MASTER-PROVENANCE`, `LEFT-OUT`, harvest notebooks). Visitors never open it.

GitHub tip still has 2022 live. Actions billing-locked. Pages not enabled. Local tree ≠ public product.

---

## 3. What visitors actually want

From heritage / digital-collection research (not our analytics — we have none shipped):

- Learn something new **and** “experience the past.”
- Scan for vibe; bounce from warehouses.
- A story makes them care about objects they would skip.
- Young visitors want highlights, not a dump.
- Wandering is a native old-web mode (GeoCities neighborhoods, webrings). restorativland wins on that.

We already have the story engine: first night, official 10, follow-a-site, year-locked stars. It is buried under dest count.

---

## 4. Improve — sequenced

Do these in order. Do not dest-farm to “look complete.” Do not add 2022+ to catch a calendar. Do not AI-rewrite every dest.

### Slice 0 — Publish

A 9,588-page museum that is not on a URL is a private corpus.

- [x] `museum/1994-2020-lean` pushed. The 2026-09-13 snapshot said 26 hub cards. The live hub is 22. 2022 is a live lean door.
- [x] Deploy configs: `netlify.toml` publish `.`, `vercel.json` trailingSlash + year page rewrites, `.github/workflows/pages.yml` is **workflow_dispatch only**. Repo root is the document root.
- [x] Stop claiming GitHub Actions CI. Jobs do not start while the account is billing-locked (issue #17). The gate that runs is local `npm run ci`. Billing is not unlocked.
- [x] Public URL: https://sourabhligade.github.io/internet-through-time/ (GitHub Pages legacy, branch `museum/1994-2020-lean`, 2026-10-07). Actions billing is still locked, so `.github/workflows/pages.yml` was not the publisher.

### Slice 1 — Visitor product is 22 open doors + the walks

- [x] Hub leads with **first night**, **follow-a-site**, **one star per year**.
- [x] Leftover-2× / leftover-3× default **off** (workshop / `?deep=1`). Keep for e2e.
- [x] Year cards: one clause of meaning. Lean years say dest count + star (` · 13 rooms · GDPR Manage`). Forests say they are dense.
- [x] Yahoo-directory hub skin stays. Year cards are **numbers only** (era chips hidden).

### Slice 2 — 2009 is a hole or a door

2009 is GeoCities death + Like. restorativland’s gallery *is* that wound. Boarding 78 dests reads as a gap between 2008 and 2010.

Pick one:

- [x] **A.** One-room boarded year the visitor can enter (“this year is closed; Like / GeoCities shutdown is the story”).
- [ ] **B.** Real lean door (Like as star). **Not flipped.** DISK-TRUTH ship law keeps 2009 boarded. Like dest now has dest-true `data-official-need` / `data-official-verb` if a later named pass un-boards.

Do not silently redirect to the hub forever.

### Slice 3 — Capture on every star

Late years have almost no period files. WDM / oldweb.today win on look.

- [x] Star dests: capture-cite line from leftover-official (`data-itt-capture-cite`). Official dests without a cite get a failed-final line.
- [x] Keep `[failed-final] no official brand pixels` when that is true.
- [x] Star dest cite. Do not send visitors to `SOURCES.md`.
- [x] Fix `SOURCES.md` banner: bibliography only; no `SOURCE-AUDIT.md`.

### Slice 4 — Follow-a-site is the feature to grow

Nobody else does Yahoo 1994→2010 in that year’s chrome.

- [x] Year-shell control: “same brand, next year.”
- [x] Finish existing trails (Yahoo mid years + Google mid/late rooms that exist on disk). Quality over more brands.
- [x] Atlas becomes a walk, not only a floor plan.

### Slice 5 — Dest-farm lock (remaining forests)

Same pass as / 2012 / : dests = `urlMap` ∩ disk, then delete the rest. Shared refs (flow-maps, leftover matrices, unique-manifest, READ-FIRST) in the **same** pass.

Order suggestion (largest leftover risk first):

- [x] Snapshot called 2015 wiped and treated later years as React doors. Live law: **2015 is the only React door.** 2011 and 2020–2022 are live HTML. 2017–2019 and 2023–2025 are absent.
- [ ] 2004, 1999–2003, 2005–2007, 2010 — **STOP.** Do not dest-lock forests. Later museum law forbids this box.
- [ ] 2009 only after Slice 2 — **STOP** unless a later named pass un-boards. DISK-TRUTH keeps 2009 boarded.

### Slice 6 — Optional, after the above

- [x] Period-friction toggle (14.4k / wait for GIF). Not the default. Starting Point checkbox · `localStorage itt-period-friction` · `?slow=1`. Overlay then fades.
- [x] One non-US dest per year where a mass product existed — **not dest-farmed as 28 new dests.** Famous that-year dests already on disk include Orkut 2004, WeChat leftover dest KEEP, Douyin 2016 leftover dest KEEP. Do not add a dest-farm row per year.
- [x] Shareable local postcard (“I finished 1995 Amazon SSL”) — localStorage only. Starting Point **Local postcard**. Empty never claims a finish.

---

## 5. If only three things

1. Publish the 22-year hub.
2. Lead with first night + follow-a-site + one star; fold leftover machines.
3. Dated capture on every star dest; label lean vs dense.

---

## 6. Do not

- Rebuild dest-farm to match 2004’s 810 dests.
- Ship 2022+ because the calendar moved.
- Turn the lobby into a modern marketing site.
- Treat leftover matrices / 330 specs as visitor content.
- Revert a year “fully” as tree-only. Fully = tree **and** every href / lock / comment that named dest-farm.

---

## 7. External references (audit)

- Web Design Museum — [webdesignmuseum.org](https://www.webdesignmuseum.org/) · [about](https://www.webdesignmuseum.org/about-us)
- Wayback Machine — coverage vs curated year
- oldweb.today — period browser + archive
- restorativland — [restorativland.org](https://restorativland.org/) · GeoCities gallery
- One Terabyte of Kilobyte Age — period VM vs modern pixels (Rhizome, 2014)
- Visitor: “experience the past” / learn something new — *Information* 2021, “I Want to Experience the Past”
- Online collections fail as warehouses — MW2015 UX rubric (MacDonald)
- Young visitors scan for vibe — IXD@Pratt, Merchant’s House, 2023
