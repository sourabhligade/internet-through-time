# 2× from scratch — checklist

**Date:** 2026-08-29  
**Status:** **S1 quality pass applied 2026-08-29 on all 31 live years** (relabel leftover verbs · gold 4× ≤1 · traps on PointCast / Lucky / MapQuest). S3 e2e still to run per year if you want Playwright green. 2025 boarded.  
**Door:** [`2X-FROM-SCRATCH-READ-FIRST-2026-08-29.md`](2X-FROM-SCRATCH-READ-FIRST-2026-08-29.md)  
**Every flow (dest · key · incomplete · complete · trap · Next):** [`2X-FROM-SCRATCH-EVERY-FLOW-MINUTE-E2E-2026-08-29.md`](2X-FROM-SCRATCH-EVERY-FLOW-MINUTE-E2E-2026-08-29.md)  
**Year-true 18 + S0–S3:** [`2X-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-29.md`](2X-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-29.md)

Serve: `python3 -m http.server 8080 --bind 127.0.0.1`  
Clear that year’s `ittYY-*` before a walk. After complete, only `ittYY-*` may appear.

**Default if named:** 1995. **Lean default:** 2006. **2025:** stay boarded.

Mark: `[ ]` open · `[~]` skip / N/A · `[x]` done.

---

## Never (fail the year if you tick any of these by doing them)

- [ ] Re-ran `scripts/build-2x-links.py` / `implement-2x-*.py` / `double-2x-every-year.py`
- [ ] Added a dest folder on a lean year
- [ ] Grew HTML on a year already at/over cap (2014/16 **70** · others **90**)
- [ ] Wiped a year or `git checkout` an old forest
- [ ] Moved the star / added a 7th guided `<li>`
- [ ] Invented brand pixels
- [ ] Leftover write also wrote the gold key
- [ ] Invented an ILS June digit after 2018
- [ ] Scaffolded 2025

---

## Shared — every named year (copy this block)

### S0 — freeze

- [ ] Year named out loud (not “do all years”)
- [ ] `test -d years/YYYY` — tree exists
- [ ] Hub `a.year-card.available.yYYYY`
- [ ] READ-FIRST + harvest §6 for that year opened
- [ ] Star locked = `flow-trails.js` n=1 (do not move)
- [ ] Guided `#ott-guided-YYYY ol > li` = **exactly 6**
- [ ] Gold dest leftover 4× counted (if ≥2, S1 starts by sinking/deleting to **≤1 below fold**)
- [ ] Every harvest N1–N18 dest exists (`ls`) — **no mkdir**
- [ ] Prefix `ittYY-*` only (1994 = `itt94-*`)
- [ ] **Stop.** Do not edit until S0 is all `[x]`

### S1 — gold + year-true 18

- [ ] Gold: trap never writes
- [ ] Gold: empty / 0–1 tick never writes
- [ ] Gold: complete writes star key `{real, year:"YYYY", multiStep}`
- [ ] Gold: reload persists
- [ ] Gold: leftover 4× on gold file **≤ 1** and **below** the star machine
- [ ] Leftover panel label is a **period verb** (not “Note leftover” / “leftover note”)
- [ ] N1–N18: incomplete never writes
- [ ] N1–N18: complete writes `ittYY-<suffix>` only
- [ ] N1–N18: Next dest 200 · Next hidden until key exists
- [ ] N18 Next → gold dest
- [ ] Completing leftover does **not** write gold key

### S2 — home + map

- [ ] Home 2× strip below guided 6 (not inside `<ol>`)
- [ ] No 7th guided `<li>`
- [ ] Map lists year-true 18 **or** home-only list if that year has no `flowMaps` tree
- [ ] Star chip unchanged

### S3 — e2e + gates

```bash
npx playwright test e2e/2x-links-all-years.spec.js --workers=2
npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1
python3 scripts/check-all-years.py
node scripts/audit-mock-flows.js
```

- [ ] `2x-links-all-years` green for that year
- [ ] `one-thing-per-year` gold still green
- [ ] Existing `e2e/YYYY-*.spec.js` still green
- [ ] `check-all-years.py` exit 0
- [ ] `audit-mock-flows.js` exit 0
- [ ] HTML count **did not rise** if already at/over cap
- [ ] No neighbor `ittYY` leak
- [ ] **Stop.** Do not start the next year unless named

---

## Scoreboard (all years)

Tick **Named** only when the year is the active implement. Tick **Done** only after S3.

| Year | Star | Named | S0 | S1 gold | S1 18 | S2 | S3 | Done |
|-----:|------|:-----:|:--:|:-------:|:-----:|:--:|:--:|:----:|
| 1994 | CSotD guestbook | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 1995 | SSL checkout | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 1996 | Portal wars | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 1997 | PointCast | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 1998 | I’m Feeling Lucky | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 1999 | AIM sign-on | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2000 | MapQuest | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2001 | Wiki edit | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2002 | StumbleUpon | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2003 | Photobucket | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2004 | thefacebook networks | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2005 | YouTube upload | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2006 | Twitter 140 | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2007 | iPhone Safari | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2008 | GitHub issue | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2009 | Facebook Like | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2010 | Instagram iOS | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2011 | Google+ | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2012 | IG Android | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2013 | Vine 6s | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2014 | WhatsApp Install | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2015 | Periscope Go LIVE | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2016 | IG Stories | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2017 | Face ID | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2018 | GDPR Manage | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2019 | Disney+ Continue | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2020 | Zoom mute→Leave | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2021 | ATT Ask | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2022 | ChatGPT Send | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2023 | ChatGPT Plus | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2024 | GPT-4o Talk | [x] | [x] | [x] | [x] | [~] | [ ] | [ ] |
| 2025 | boarded | [~] | [~] | [~] | [~] | [~] | [~] | [~] |

---

## Per-year walk (tick when that year is named)

Open the year section in the [every-flow bible](2X-FROM-SCRATCH-EVERY-FLOW-MINUTE-E2E-2026-08-29.md#1994). For each official-10 row and each matrix row: trap / empty never write · complete writes · Next 200.

### Door (every year)

- [ ] Hub card open
- [ ] `/years/YYYY/` paints the right shell (not neighbor chrome)
- [ ] Starting Point chip → star dest
- [ ] Guided = 6
- [ ] About dual-cite (ILS June **or** “table ends 2018”)
- [ ] 2× strip is **below** guided, not inside it

### Official 10

For each n=1–10 in the every-flow table:

- [ ] Dest 200
- [ ] Next dest 200
- [ ] Incomplete never writes `whenKey`
- [ ] Complete writes `whenKey`
- [ ] Trap never writes (if the year has a trap)
- [ ] n=1 leftover 4× ≤ 1 below fold

### Year-true leftover 18

Harvest §6 N1–N18 for that year:

- [ ] N1 dest + verb + Next
- [ ] N2
- [ ] N3
- [ ] N4
- [ ] N5
- [ ] N6
- [ ] N7
- [ ] N8
- [ ] N9
- [ ] N10
- [ ] N11
- [ ] N12
- [ ] N13
- [ ] N14
- [ ] N15
- [ ] N16
- [ ] N17
- [ ] N18 → gold
- [ ] No “leftover note” copy on those 18

### Popular 3×

- [ ] Dest 1 200 + leftover write isolated
- [ ] Dest 2 200 + leftover write isolated
- [ ] Dest 3 200 + leftover write isolated

### 5× extras (skip if harvest says none)

- [ ] Walked n=11–50 table in every-flow bible
- [ ] 404 / empty `whenKey` rows listed (do **not** restore lean-wipe dests)

### Matrix (do not grow)

- [ ] `e2e/2x-links-all-years.spec.js` still covers this year
- [ ] Did **not** add matrix rows
- [ ] Did **not** add dest-field plaques

---

## First-year gold drown (do these first if named)

These gold pages fail S1 until leftover panels are sunk.

| Year | Gold dest | Leftover 4× on gold | First tick |
|-----:|-----------|--------------------:|------------|
| 2006 | `sites/twitter/index.html` | 3 | [x] extras → `twitter/about.html` |
| 2007 | `sites/iphone/index.html` | 2 | [x] extras → `iphone/specs.html` |
| 2009 | `sites/facebook/index.html` | 2 | [x] extras → `facebook/feed.html` |
| 2011 | Google+ dest | 2 | [x] extras → `googleplus/about.html` |
| 2015 | Periscope dest | 2 | [x] extras → `periscope/about.html` |
| 2016 | Stories dest | 2 | [x] extras → `instagram/about.html` |
| 2017 | Face ID dest | 2 | [x] extras → `iphone/about.html` |
| 2018 | GDPR dest | 2 | [x] extras → `gdpr/about.html` |
| 2021 | ATT dest | 2 | [x] extras → `att/about.html` |
| 2022 | `sites/chatgpt/index.html` | **4** | [x] extras → `chatgpt/about.html` |
| 2023 | Plus dest | 2 | [x] extras → `plus/about.html` |
| 2024 | `sites/chatgpt/4o.html` | 2 | [x] extras → `chatgpt/plus.html` |

1997 PointCast · 1998 Lucky · 2000 MapQuest: [x] trap buttons + JS (never write).

---

## Caps (fail S3 if you grew past these)

| Year | Cap | Disk 2026-08-29 | Grew? |
|-----:|----:|----------------:|:-----:|
| 2014 | 70 | 75 | [ ] must stay ≤75 |
| 2016 | 70 | 73 | [ ] must stay ≤73 |
| 2017 | 90 | 91 | [ ] must stay ≤91 |
| 2018 | 90 | 91 | [ ] must stay ≤91 |
| 2019 | 90 | 92 | [ ] must stay ≤92 |
| 2022 | 90 | 92 | [ ] must stay ≤92 |
| Other lean | 90 | under or = | [ ] do not cross 90 |

---

## Done for the whole program

- [ ] Every live year row in the scoreboard is `[x]` **or** explicitly `[~]` skipped by name
- [ ] 2025 still boarded
- [ ] No injector re-run in git history of this pass
- [ ] DISK-TRUTH still matches the live hub (31 years)
