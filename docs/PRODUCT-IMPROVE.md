# Product improve map

**Date:** 2026-09-13  
**Status:** Recommendation. Not ship law.  
**Canonical year law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) + `scripts/itt_gate.py` `SHIP_YEARS`.

This file maps the 2026-09-13 audit: what is on disk, what live web-history museums do, and how to improve *this* museum without dest-farming.

---

## 1. What this product is

Year-locked, clickable rooms in period chrome. Not a screenshot gallery. Not a raw archive.

| This museum | Wayback Machine | [Web Design Museum](https://www.webdesignmuseum.org/) | [oldweb.today](https://oldweb.today) | [restorativland](https://restorativland.org/) |
|---|---|---|---|---|
| Curated year + OS + browser | Any URL + date | Screenshots / video | Period browser + archive | Restored ruins (GeoCities, MySpace Music) |
| Star / leftover / incomplete-never-writes | No year law | Look, don’t use | Rendering is the exhibit | Wander neighborhoods |
| ~27 playable years | 800B+ pages | Thousands of captures | Emulation | Millions of lost pages |

**Advantage:** meaning. 2005 does not give you the iPhone. Accept All never writes. Follow Yahoo through years in that year’s chrome.

**Do not compete** with Wayback on coverage or WDM on screenshot count.

---

## 2. Data on disk (audit snapshot)

Hub **27 years open** (1994–2008 + 2010–2021). **2009 boarded.** **2022+ wiped.**

| Layer | Count (2026-09-13 working tree) |
|---|---|
| Playable years | 27 |
| Dest folders | 6,449 |
| HTML pages | 9,588 |
| e2e specs | 330 + 19 matrices |
| Period assets | Strong 1994–2007. **2012 / 2013 / 2015 = 0 files.** 2010 = 4. 2008–2009 thin. |

Density is harvest history, not “how big the year was”:

| Year | Dests | Read as |
|---|---|---|
| 2004 | 810 | Forest / warehouse |
| 1999 / 2000 | 432 / 486 | Forest |
| 2008 | 597 | Forest |
| 2007 | 246 | Lean door (iPhone Safari) |
| 2011 / 2012 / 2018 | 98 / 45 / 13 | Lean door (reverted to HEAD) |
| 2019 / 2021 | 165 / 294 | Lean + leftover dest-farm still on disk |
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

- [x] `museum/1994-2020-lean` pushed (`20b20c076`+). Hub 27 cards. No 2022 year tree.
- [ ] Unlock GitHub Actions billing or stop claiming CI (not verified this pass).
- [ ] Enable GitHub Pages / Netlify / Vercel public URL (repo is on origin; Pages not verified).

### Slice 1 — Visitor product is 27 doors + 5 walks

- [x] Hub leads with **first night**, **follow-a-site**, **one star per year**.
- [x] Leftover-2× / leftover-3× default **off** (workshop / `?deep=1`). Keep for e2e.
- [x] Year cards: one clause of meaning. Lean years say dest count + star (`2018 · 13 rooms · GDPR Manage`). Forests say they are dense.
- [x] Yahoo-directory hub skin stays. Year cards are **numbers only** (era chips hidden).

### Slice 2 — 2009 is a hole or a door

2009 is GeoCities death + Like. restorativland’s gallery *is* that wound. Boarding 78 dests reads as a bug between 2008 and 2010.

Pick one:

- [x] **A.** One-room boarded year the visitor can enter (“this year is closed; Like / GeoCities shutdown is the story”).
- [ ] **B.** Real lean door (Like as star).

Do not silently redirect to the hub forever.

### Slice 3 — Capture on every star

Late years have almost no period files. WDM / oldweb.today win on look.

- [x] Star dests: capture-cite line from leftover-official (`data-itt-capture-cite`). Official 10 remaining dests still pending.
- [x] Keep `[failed-final] no official brand pixels` when that is true.
- [x] Star dest cite. Do not send visitors to `SOURCES.md`.
- [x] Fix `SOURCES.md` banner: bibliography only; no `SOURCE-AUDIT.md`.

### Slice 4 — Follow-a-site is the feature to grow

Nobody else does Yahoo 1994→2010 in that year’s chrome.

- [ ] Year-shell control: “same brand, next year.”
- [ ] Finish existing trails (Yahoo missing mid years; Google missing most). Quality over more brands.
- [ ] Atlas becomes a walk, not only a floor plan.

### Slice 5 — Dest-farm lock (remaining forests)

Same pass as 2011 / 2012 / 2018: dests = `urlMap` ∩ disk, then delete the rest. Shared refs (flow-maps, leftover matrices, unique-manifest, READ-FIRST) in the **same** pass.

Order suggestion (largest leftover risk first):

- [ ] 2019, 2021, 2017, 2015
- [ ] 2004, 2008, 1999–2003, 2005–2007, 2010
- [ ] 2009 only after Slice 2

### Slice 6 — Optional, after the above

- [ ] Period-friction toggle (14.4k / wait for GIF). Not the default.
- [ ] One non-US dest per year where a mass product existed (Orkut 2004, Cyworld, Mixi, 2ch). Not a dest-farm.
- [ ] Shareable local postcard (“I finished 1995 Amazon SSL”) — still localStorage only.

---

## 5. If only three things

1. Publish the 27-year hub.
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
