# YYYY — source catalog

**Year:** YYYY  
**Prefix (planned):** `ittYY`  
**Last visit:** YYYY-MM-DD  
**Pass:** 1 (standing queries)  
**Spec:** [`../SOURCE-CATALOG.md`](../SOURCE-CATALOG.md)  
**Companions:** `../../YYYY-READ-FIRST.md` (write after freeze) · [`CAPTURE-LOG.md`](CAPTURE-LOG.md) · [`ARTIFACTS-MAP.md`](ARTIFACTS-MAP.md)

**How to read a row:** [`SOURCE-CATALOG.md`](../SOURCE-CATALOG.md) §1.  
**Tags:** **OPEN** full page · **SNIP** snippet · **BLOCK** WAF/paywall.  
**Lock:** yes = may paste into READ-FIRST / About. Wiki-only is never lock=yes.

**Count:** **0** distinct URLs · OPEN 0 · SNIP 0 · BLOCK 0

Copy this file to `docs/references/YYYY/SOURCES.md`. Replace YYYY. Append rows. Never reuse an id.

---

## A. Standing queries — scale + shell

Same list every year. Fill Took. Add fallback rows under BLOCK.

| Id | Tag | Class | URL | Took | Lock | Pair | Use | Notes |
|----|-----|-------|-----|------|------|------|-----|-------|
| YYYY-001 | | scale | [Live Stats websites](https://www.internetlivestats.com/total-number-of-websites/) | June YYYY cell, or **no row** | | | about | Blank stays blank. Table ends 2018. |
| YYYY-002 | | scale | [Live Stats users](https://www.internetlivestats.com/internet-users/) | Users cell if present | | | about | Often stops 2016. Do not invent. |
| YYYY-003 | | scale | ITU Facts & Figures / PR for YYYY | Users · % | | YYYY-001 | about | Label ITU |
| YYYY-004 | | scale | Netcraft survey Jan or Dec YYYY | Hostnames · active | | YYYY-001 | about | Never blend active into hostnames |
| YYYY-005 | | scale | Pingdom Internet YYYY in numbers (if exists) | Dec websites · users class | | YYYY-001 | about | Stops ~2012 |
| YYYY-006 | | scale | HTTP Archive / Web Almanac page-weight YYYY | Median KB · method | | | about | Third axis |
| YYYY-007 | | shell | [StatCounter](https://gs.statcounter.com/) May YYYY | Browser · OS share | | YYYY-008 | shell | |
| YYYY-008 | | shell | StatCounter Dec YYYY | Browser · OS share | | YYYY-007 | shell | Dual month |
| YYYY-009 | | shell | oldweb.today + Wayback year-home | Toolbar / fonts | | | shell | Research only — do not embed OWT |
| YYYY-010 | | shell | Version Museum · Web Design Museum year | Product frame | | | capture | Grammar, not pixels here |
| YYYY-011 | | newsroom | Apple Newsroom year index | Shipped this year only | | | p0 | |
| YYYY-012 | | newsroom | Google / Keyword year index | Shipped this year only | | | p0 | |
| YYYY-013 | | newsroom | Microsoft / Windows year index | Shipped this year only | | | p0 | |
| YYYY-014 | | newsroom | Facebook / Instagram about-blog year | Shipped this year only | | | p0 | Not Meta before Oct 2021 |

---

## B. One-thing

Gold machine. ≥2 primaries before lock=yes.

| Id | Tag | Class | URL | Took | Lock | Pair | Use | Notes |
|----|-----|-------|-----|------|------|------|-----|-------|
| YYYY-015 | | one-thing | | | | | extras | Primary |
| YYYY-016 | | one-thing | | | | YYYY-015 | extras | Corroboration |

---

## C. P0 / P1 spine

| Id | Tag | Class | URL | Took | Lock | Pair | Use | Notes |
|----|-----|-------|-----|------|------|------|-----|-------|
| YYYY-017 | | p0 | | | | | home | |
| YYYY-018 | | p0 | | | | | home | |
| YYYY-019 | | p1 | | | | | extras | |

---

## D. Bans (later-year proofs)

One URL per hard ban that proves the **later** date.

| Id | Tag | Class | URL | Took | Lock | Pair | Use | Notes |
|----|-----|-------|-----|------|------|------|-----|-------|
| YYYY-020 | | ban | | | | | ban | e.g. Reels is Aug 2020, not 2019 |
| YYYY-021 | | ban | | | | | ban | |

---

## E. Voice / culture

| Id | Tag | Class | URL | Took | Lock | Pair | Use | Notes |
|----|-----|-------|-----|------|------|------|-----|-------|
| YYYY-022 | | voice | | | | | home | Mood only |

---

## F. Game class

Inspiration only. No official sprites as a harvest target.

| Id | Tag | Class | URL | Took | Lock | Pair | Use | Notes |
|----|-----|-------|-----|------|------|------|-----|-------|
| YYYY-023 | | p1 | | | | | game | Class + date. Not the one-thing. |

---

## G. More (append)

Keep going. Next id is YYYY-024.

| Id | Tag | Class | URL | Took | Lock | Pair | Use | Notes |
|----|-----|-------|-----|------|------|------|-----|-------|

---

## Freeze bar

- [ ] Section A: Live Stats websites + one other scale cite (or no-row honesty)  
- [ ] One-thing: ≥2 OPEN/SNIP  
- [ ] Every hard ban has a later-date URL  
- [ ] Game class URL · no official art  
- [ ] Count updated in the header  
- [ ] READ-FIRST not written from SNIP-only wiki  
- [ ] No year HTML yet  
