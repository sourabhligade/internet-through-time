# What to do — plan vs disk vs e2e

**Date:** 2026-09-08  
**Use this file** to execute residual work. Do not open harvest / 5k / from-scratch forest notebooks as an implement list.

**Trust order:** live `years/` · `scripts/itt_gate.py` `SHIP_YEARS` · [`DISK-TRUTH.md`](DISK-TRUTH.md) · this file · year READ-FIRST thesis/bans.

Serve while you work:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# http://127.0.0.1:8080
```

---

## 0. Ship law (do not argue with this)

| | |
|--|--|
| Live | **28 years** · 1994–2019 + 2021 + 2022 |
| Boarded | **2020 · 2023 · 2024 · 2025** |
| 2013 | **LIVE lean** · Vine 6s `itt13-vine-posts` · 17 dests · leftover-3× first + third · second **not named** |
| 2018 | **LIVE lean** · GDPR Manage `itt18-gdpr` · 13 dests · leftover-3× first + third · second **not named** |
| Leftover 2× | two `data-lo-save` on every dest index (`*-lx` + `*-d2`) · leftover key · never the star |
| Leftover 3× | first + second **never** official n=1–10 · third may sit on official dests as `pop3-*` only |
| Leftover 4× | **0** on 2012 / 2016 / 2017 / 2019 / 2013 / 2018 |
| Dest-field | **0** |
| Dest-farm | **no new dest folders** |

**Already shipped — do not rebuild:** official 10 dest files · leftover-2× floor · leftover-3× fame lock first/second (except 2013/2018 second, which is unnamed) · CUT-OPEN 2013/2018 · leftover-2× ×2 on 2019 Fortnite · CUT-HOLD-2001 · leftover-4× dest-index on required years.

---

## 1. How to read the buckets

| Bucket | Meaning | You do |
|--------|---------|--------|
| **Broken** | Dest HTML / spec is wrong on disk | Fix the named file |
| **Incomplete** | Writer exists; dest-minute e2e does not | Add or trim the named spec |
| **Improvable** | Works; thin, copy-bleed, or sample-only | Optional named pass |
| **Not implemented** | Not on disk **and** not named | Do **not** build unless a cut is named below |

A dest-minute is: land → trap / empty / 0 ticks never write → complete writes leftover or gold key only → Next same-year dest HTTP 200.

---

## 2. Do this in order

Do not skip ahead to dest-farm. Tick when the verify command is green.

### P0 — dest HTML that is actually broken

- [x] **B1** 1996 Portal Wars leftover plaque has no hook  
- [x] **B2** 2006 Twttr leftover field is malformed markup  
- [x] **B3** 2004 thefacebook leftover still says “Like leftover”

### P0 — specs that 404 or contradict the 28-year ship

- [x] **T1** Trim `e2e/2013-flows.spec.js` to dests that exist  
- [x] **T2** Invert / drop boarded-empty asserts in `2010-2015-3x-cut` and `2015-2020-3x-cut`  
- [x] **T3** Skip or delete `e2e/2012-4x-flows.spec.js` (leftover-4× locked 0)  
- [x] **T4** Stop `e2e/2018-2022-leftover-3x.spec.js` from treating 2018 as wiped

### P1 — 2018 is the thinnest live door

- [x] **E1** Add lean `2018-mvp.spec.js` + `2018-flows.spec.js`  
- [x] **E2** Walk leftover-3× dest-true for 2018 first + third  
- [x] **E3** Add leftover-2× dest-minute for 2018 dest indexes (`*-lx` then `*-d2`)  
- [x] **E4** Put the 2018 pack on the CI ship list in `scripts/ci.sh`

### P1 — 2013 leftover e2e (door is live; tests still think forest)

- [x] **E5** Leftover-3× dest-true for askfm / whisper / youtube  
- [x] **E6** Leftover-2× dest-minute for 2013 dest HTML (`*-lx` then `*-d2`)  
- [x] **E7** Include 2013 in leftover-3× uniqueness as first + third only (already started in `year-2010-plus-3x-unique.spec.js`)

### P2 — leftover-3× second dest-true (1999–2005)

- [x] **E8** Walk second-strip dest-true in `1999-2005-leftover-3x` (today first+third only)

### P2 — leftover-2× dest-minute remainder

- [x] **E9** 2016 / 2017 / 2019 leftover-2× dest-minute sample (3 dests each, not 120)  
- [x] **E10** 2021 / 2022 leftover-2× remainder stays sample unless a cut names “every writer”

### P3 — class-B docs (copy only)

- [x] **D1** Stamp remaining READ-FIRST spines that still say hub 26 / 2013 boarded (2010 / 2014–2017 / 2019 / 2020)  
- [x] **D2** Header-stamp Sept 8 playable map: CUT-OPEN **is named**  
- [x] **D3** Do **not** mass-rewrite harvest notebooks

---

## 3. Broken

Fix dest HTML only. Clone leftover hooks from a sibling dest in the same year. Incomplete never writes. Leftover never writes the star.

### B1 — 1996 Portal Wars leftover plaque

| | |
|--|--|
| File | `years/1996/sites/portals/wars.html` |
| Symptom | Button text **Do leftover** has **no** `data-official-verb` / `data-lo-save` / `data-pop-go` |
| Star | 3-portal visit table is fine · `itt96-portal-wars` |
| Do | Hook the leftover plaque as leftover-2× (`data-lo-panel` + `data-lo-save` `portals-lx` or the existing leftover key on that dest). Do **not** make it write `itt96-portal-wars`. |
| Clone from | another 1996 dest leftover-2× panel (e.g. `years/1996/sites/hotmail/index.html`) |
| Verify | trap / empty never write · complete leftover only · `itt96-portal-wars` stays empty · `npx playwright test e2e/1996-flows.spec.js e2e/one-thing-per-year.spec.js --grep 1996 --workers=1` |

### B2 — 2006 Twttr leftover field

| | |
|--|--|
| File | `years/2006/sites/twitter/index.html` |
| Symptom | Malformed leftover input: `<input L0 leftover Twttr"` |
| Star | `data-tw06-post` / `itt06-tweets` must stay |
| Do | Replace with a normal leftover-2× field: `<input type="text" data-lo-field maxlength="80" placeholder="Twttr leftover">` inside the leftover panel. Keep two leftover writers if they already exist (`t140` / `t140-d2` or `*-lx` / `*-d2`). |
| Verify | page parses · leftover complete writes leftover key only · `itt06-tweets` empty on leftover · `npx playwright test e2e/2006-official-10.spec.js e2e/one-thing-per-year.spec.js --grep 2006 --workers=1` |

### B3 — 2004 Like leftover copy

| | |
|--|--|
| File | `years/2004/sites/facebook/networks.html` |
| Symptom | Leftover-2× panels titled **Like leftover**. Like is 2009. Star is thefacebook join `itt04-thefacebook-networks`. |
| Do | Rename leftover titles/buttons to **2004 leftover** / **thefacebook leftover**. Do not change star hooks (`data-fb-join` / official key). Leftover keys stay leftover (`facebook-networks` / `*-d2`), never `itt04-thefacebook-networks`. |
| Verify | leftover complete never writes star · `npx playwright test e2e/2004-facebook-friends.spec.js e2e/one-thing-per-year.spec.js --grep 2004 --workers=1` |

---

## 4. Incomplete (implemented, e2e missing or lying)

### T1 — `2013-flows` walks dests that are not on the lean tree

**File:** `e2e/2013-flows.spec.js`

| Test | Goto | Disk |
|------|------|------|
| Telegram send | `/years/2013/sites/telegram/chat.html` | only `telegram/index.html` |
| HealthCare.gov | `/years/2013/sites/healthcare/index.html` + `status.html` | **no** `healthcare/` |
| iPhone 5c | `/years/2013/sites/iphone/5c.html` | only `ios7.html` + `touchid.html` |

**Keep:** About dual-cite · guided 6 · Vine trap/empty/complete `itt13-vine-posts` · Chrome habit · Medium · Snap Stories.

**Replace dead tests with live dest-minutes** (on-disk dests only):

| Dest | Path | Key | Trap |
|------|------|-----|------|
| Snowden | `sites/snowden/index.html` | leftover or official `itt13-snowden-ack` | Snowden-as-gold |
| Telegram | `sites/telegram/index.html` | leftover / `itt13-telegram-chat` | WhatsApp-as-star |
| Ask.fm leftover-3× | `sites/askfm/index.html` | `itt13-pop-askfm` | Formspring as 2013 gold |
| Vine leftover-2× | `sites/vine/record.html` | `itt13-vine-lx` then `itt13-vine-d2` | never `itt13-vine-posts` |

**Verify:** `npx playwright test e2e/2013-flows.spec.js e2e/2013-mvp.spec.js --workers=1` · 0 gotos to missing files.

### T2 — boarded-empty cut specs

| File | Line / assert | Do |
|------|----------------|----|
| `e2e/2010-2015-3x-cut.spec.js` | expects **no** `years/2013` | drop 2013-absent assert · keep 2013 lean checks if any |
| `e2e/2015-2020-3x-cut.spec.js` | expects **no** `years/2018` | drop 2018-absent · **keep** 2020-absent |

**Verify:** those two files pass on the 28-year disk.

### T3 — `2012-4x-flows.spec.js`

Leftover-4× on 2012 is **locked 0** (C23). Spec expects `[data-4x-go]`.

**Do:** `test.skip(true, "2012 leftover-4× locked 0")` at file top, **or** delete the file and drop `package.json` `test:e2e:2012` reference to it.

**Do not** add leftover-4× dest HTML to make the spec green.

### T4 + E2 — 2018 leftover-3× dest-true

**Today:** `e2e/2018-2022-leftover-3x.spec.js` header says 2018 wiped. `WANT` is 2021 / 2022 only.

**Disk leftover-3× (do not invent a second strip):**

| Strip | Dests | Keys |
|-------|-------|------|
| First | reddit · youtube · wikipedia | `itt18-pop-reddit` · `itt18-pop-youtube` · `itt18-pop-wikipedia` |
| Third | tiktok · github · homepod | `itt18-pop3-*` only · never official `whenKey` |
| Second | **not named** | do not add dests or tests that require `data-itt-pop-more` |

**Steps:**

1. Add `2018: { first: 3, more: 0, third: 3 }` (or first 3 + third 3) to `WANT`.  
2. Add matrix rows for the six dests (clone 2021/2022 row shape).  
3. Incomplete never writes · complete leftover:true · gold `itt18-gdpr` empty · Next 200.

**Verify:** `npx playwright test e2e/2018-2022-leftover-3x.spec.js --workers=1`

### E1 + E4 — 2018 lean year pack

There is **no** `2018-mvp.spec.js` / `2018-flows.spec.js` / `2018-densify.spec.js` / `2018-trail-real-flows.spec.js`.

**Clone shape from** `e2e/2014-mvp.spec.js` + `e2e/2014-flows.spec.js` (lean door).

**`2018-mvp.spec.js` must:**

1. Hub card `a.year-card.available[href*="years/2018"]`  
2. Guided `#ott-guided-2018 ol > li` count **6**  
3. About prints ILS June **1,630,322,579**  
4. Accept All never writes `itt18-gdpr`  
5. Manage + Save writes `itt18-gdpr`

**`2018-flows.spec.js` dest-minutes (official 10 — all on disk):**

| n | Path | whenKey | Incomplete | Complete |
|--:|------|---------|------------|----------|
| 1 | `sites/gdpr/index.html` | `itt18-gdpr` | Accept All | Manage → Save |
| 2 | `sites/tiktok/fyp.html` | `itt18-tiktok-fyp` | empty / Reels trap | period verb |
| 3 | `sites/trust/index.html` | `itt18-hearing` | Hearing-as-gold | leftover/official complete |
| 4 | `sites/instagram/igtv.html` | `itt18-igtv` | Reels as 2018 | period verb |
| 5 | `sites/chrome/not-secure.html` | `itt18-not-secure` | Edge as default | habit leftover |
| 6 | `sites/homepod/index.html` | `itt18-homepod` | HomePod-as-chip | period verb |
| 7 | `sites/spectre/index.html` | `itt18-spectre` | exploit / PoC trap | literacy leftover |
| 8 | `sites/fortnite/switch.html` | `itt18-fn-switch` | Fortnite-as-2018-gold | period verb |
| 9 | `sites/github/microsoft.html` | `itt18-github` | Copilot as 2018 | period verb |
| 10 | `sites/playable/game.html` | `itt18-game-consentdash` | game writes GDPR | Consent Dash only |

**CI:** add to `scripts/ci.sh` Playwright list:

```
e2e/2018-mvp.spec.js e2e/2018-flows.spec.js
```

**Verify:** `npx playwright test e2e/2018-mvp.spec.js e2e/2018-flows.spec.js e2e/one-thing-per-year.spec.js --grep 2018 --workers=1`

### E5 + E6 — 2013 leftover dest-true

**On disk (use these, no new folders):**

| Kind | Dest | Path | Key |
|------|------|------|-----|
| leftover-3× first | Ask.fm | `sites/askfm/index.html` | `itt13-pop-askfm` |
| leftover-3× first | Whisper | `sites/whisper/index.html` | `itt13-pop-whisper` |
| leftover-3× first | YouTube | `sites/youtube/index.html` | `itt13-pop-youtube` |
| leftover-3× third | Reddit / Facebook / Twitter | `sites/{reddit,facebook,twitter}/index.html` | `itt13-pop3-*` |
| leftover-2× | every dest HTML that has `*-lx` / `*-d2` | e.g. `vine/record.html` | `itt13-vine-lx` · `itt13-vine-d2` |

Add 2013 rows to `e2e/2010-2015-leftover-3x.spec.js` (or a tiny `e2e/2013-leftover-3x.spec.js`). Do **not** require a second strip.

**Verify:** trap Formspring-as-gold never writes · complete leftover:true · `itt13-vine-posts` empty.

### E8 — 1999–2005 leftover-3× second dest-true

**Spec:** `e2e/1999-2005-leftover-3x.spec.js` + matrix.

Today it walks **first + third**. Second-strip dests exist (`data-pop-go` / `pop2-*`).

**Do:** extend the spec to `kind: "second"` the same way first works. Dest folders stay. No new HTML if `data-pop-go` is already on the dest.

Second-strip dests to walk (from home `data-itt-pop-more`, first three per year plus the rest of the nine if the pack is 9):

| Year | Second dests (home first-3 at minimum) |
|------|----------------------------------------|
| 1999 | theonion · drkoop · sixdegrees |
| 2000 | ivillage · metafilter · napsterweb |
| 2001 | moveon · grok · appleimac |
| 2002 | fark · homestar · blogspot |
| 2003 | flash · phoenix · 4chan (second stays **5** dests — do not add a 6th) |
| 2004 | amazon · ebay · orkut |
| 2005 | firefox · gmail · vimeo |

**Verify:** `npm run test:e2e:1999-2005-3x`

### E3 / E9 / E10 — leftover-2× dest-minute

Leftover-2× **writers are on disk**. The hole is e2e.

| Year | Do |
|------|----|
| 2013 · 2018 | 3 dests each: trap / empty / `*-lx` complete / `*-d2` complete / gold empty |
| 2016 · 2017 · 2019 | same sample of 3 dests (not 120) |
| 2021 · 2022 | keep sample · do **not** dest-minute all 120 unless a cut names it |

Use `e2e/leftover-official.spec.js` / `e2e/2x-links-all-years.spec.js` if 2018 is no longer in the wiped set (it was dropped from `leftover-official.spec.js` wiped set on 2026-09-08). Confirm 2018 rows exist in `e2e/2x-links.matrix.json` and `e2e/leftover-official.matrix.json`.

---

## 5. Improvable (works; optional)

Do these only after P0–P1. None of these are dest-farm.

| ID | What | Why it is only improve | If you do it |
|----|------|------------------------|--------------|
| I1 | `2015-flows` / `2019-flows` / `2021-flows` are smoke | official 10 already dest-minute’d in `all-years-official-10-real.spec.js` | deepen year-flows to match 2016/2017/2022 |
| I2 | Leftover-4× “every dest” dest-minute | 2005–2010 / 2014 / 2021 / 2022 have writers + **one sample** dest-minute | add 2–3 more samples per year · never leftover-4× on C23 years |
| I3 | `2016-2018-3x-detail.spec.js` name | file is 2016+2017 only | rename or add 2018 leftover-3× first dests |
| I4 | `year-signature-flows` has no 2018 GDPR describe | `one-thing` already dest-minutes GDPR | add a GDPR describe for pack symmetry |
| I5 | 1994 / 2007 missing `*-densify.spec.js` | mvp + flows + trail exist | optional pack-shape only |
| I6 | `2008-STILL-OPEN-VERIFY-CHECKLIST.md` unchecked boxes | cites / `#ott-2x-2008` uniqueness / origin CI | verify, do not dest-farm |
| I7 | 2007 `fbplat` Next is keyed `itt07-fbplat-lx` | official verb + leftover-2× exist · official-10-real already walks gold | align Next reveal with official `itt07-fbplat` if Next stays hidden after gold |
| I8 | Hub / READ-FIRST still saying 26 years on some files | door is 28 | class-B stamp only (D1) |
| I9 | `flowsHtml()` on Starting Point lists trail n>10 on dense years | leftover dests look like official “this year’s flows” | slice n=1–10 in `ui/year/start.js` `flowsHtml` (C3 honesty) |

---

## 6. Not implemented — and what that means

### 6.1 Named later (do not start until the cut is named)

| Cut | What it would be | Legal how |
|-----|------------------|-----------|
| 2013 leftover-3× **second** strip | 3 on-disk dests, not official 10 | paint `data-itt-pop-more="2013"` on home + `start-extra.js` · dests already on disk (chrome / medium are leftovers; do not use vine/ig/snap/iphone) |
| 2018 leftover-3× **second** strip | same | on-disk leftover dests only · not tiktok/github/homepod (those are official / third) |
| CUT-2X-DOUBLE | a third leftover writer `*-d3` | that is leftover-4× · **banned** on C23 years · do not name this to mint 4× |
| Leftover-2× 120 ×2 | second path on existing dest HTML | no new folders |
| 2020 / 2023 / 2024 / 2025 CUT-OPEN | new lean door | clone lean 2018/2022 · never restore a forest |

### 6.2 Never implement (illegal even if an old plan lists it)

| Item | Why |
|------|-----|
| New dest folders on any live year | dest-farm (C16) |
| 2013 31-dest forest · healthcare · `iphone/5c` · `telegram/chat` | lean door is 17 dests |
| 2018 108-page / 52-dest forest | lean door is 13 dests |
| Leftover-4× on 2012 / 2016 / 2017 / 2019 / 2013 / 2018 | C23 / lean lock |
| 2019 `ios13dark/` `ftcfb/` `inboxend/` | leftover-6× dest-farm |
| Move any star | C4 |
| 7th guided `<li>` | C2 |
| Unboard 2020 Zoom / 2023 Plus / 2024 4o without a named CUT-OPEN | boarded |
| `git checkout` an old forest | DISK-TRUTH |
| Leftover-3× first/second on official n=1–10 | C7 / C8 |
| Reopen 1994–2009 / 2015–2017 leftover-3× nines | C24 |
| Grow 2003 leftover-3× second past 5 dests | dest-farm (24th folder) |

### 6.3 Plan files that look like “not implemented” but are stale

Do **not** execute these as missing dests:

| File | Lie |
|------|-----|
| `2014-CHECK-EVERY-FLOW-MAP.md` | “door not on disk” — 2014 is live |
| `2018-2022-LEFTOVER-3X-X3-MAP` / leftover-3× e2e header | 2018 wiped — 2018 is live |
| `1994-2019-FULLY-PLAYABLE-…-2026-09-08.md` header | CUT-OPEN not named — CUT-OPEN shipped |
| `2011-2020-EVERY-FLOW-MINUTE-…` 2013=31 dests / 2018=52 dests | pre-wipe forests |
| `2008-MASTER-BIBLE-…` HTML/room counts | pre-CUT-DOUBLE |
| Any 5k / leftover-120 dest catalog | research envelope |

---

## 7. Year residual (only what is still open)

| Year | Broken | Incomplete e2e | Improvable | Not implemented |
|------|--------|----------------|------------|-----------------|
| 1994 | — | — | no densify spec | leftover-4× lock 0 |
| 1995 | — | — | — | — |
| **1996** | **B1 wars leftover hook** | — | — | — |
| 1997–2003 | — | leftover-3× **second** dest-true (1999–2003) | — | 2003 second stays 5 |
| **2004** | **B3 Like leftover copy** | leftover-3× second dest-true | — | — |
| 2005 | — | leftover-3× second dest-true · leftover-4× sample-only | — | 5k dests |
| **2006** | **B2 Twttr leftover markup** | leftover-4× sample-only | — | — |
| 2007 | — | — | no densify · fbplat Next key (I7) | App Store / Chrome as 2007 gold |
| 2008 | — | — | STILL-OPEN cites | 5k / Spotify US / BTC wallet |
| 2009–2012 | — | — | delete `2012-4x-flows` | leftover-4× on 2012 |
| **2013** | `2013-flows` 404s | leftover-3× dest-true · leftover-2× dest-minute | — | second leftover-3× · forest · leftover-4× |
| 2014 | — | — | CHECK-EVERY-FLOW header stale | more leftover-6× dests |
| 2015 | — | year-flows smoke (official-10-real covers gold) | deepen year-flows | leftover-4× |
| 2016–2017 | — | leftover-2× dest-minute sample | — | leftover-4× |
| **2018** | no year pack | leftover-3× dest-true · leftover-2× dest-minute · leftover-3× spec skips year | signature GDPR describe | second leftover-3× · forest · leftover-4× |
| 2019 | — | leftover-2× dest-minute · wework leftover-3× dest-true | year-flows smoke | leftover-4× · leftover-6× dests |
| 2021–2022 | — | leftover-2× 120 remainder · 2021 official year-flows smoke | leftover-4× more samples | 2023 dests |
| 2020 / 2023–2025 | — | — | — | boarded until named CUT-OPEN |

---

## 8. Files you may touch (by bucket)

| Bucket | Files |
|--------|-------|
| B1–B3 dest HTML | `years/1996/sites/portals/wars.html` · `years/2006/sites/twitter/index.html` · `years/2004/sites/facebook/networks.html` |
| T1–T4 / E* e2e | `e2e/2013-flows.spec.js` · `e2e/2010-2015-3x-cut.spec.js` · `e2e/2015-2020-3x-cut.spec.js` · `e2e/2012-4x-flows.spec.js` · `e2e/2018-2022-leftover-3x.spec.js` + matrix · new `e2e/2018-mvp.spec.js` · new `e2e/2018-flows.spec.js` · `e2e/2010-2015-leftover-3x.spec.js` · `e2e/1999-2005-leftover-3x.spec.js` |
| CI | `scripts/ci.sh` · `package.json` (add `test:e2e:2018`) |
| I9 optional | `ui/year/start.js` `flowsHtml` slice n=1–10 |
| D1 docs | year READ-FIRST class-B spines only |

Do **not** touch: `js/config/flow-trails.js` official n=1–10 · star dests’ gold verbs · guided `<ol>` · leftover-3× fame-lock first/second nines on 1994–2012 / 2014–2017 / 2019.

---

## 9. Verify after a pass

```bash
python3 scripts/check-all-years.py
python3 scripts/process/check_urlmap.py
node scripts/audit-mock-flows.js

# after B1–B3
npx playwright test e2e/one-thing-per-year.spec.js e2e/all-years-official-10-real.spec.js --workers=1

# after T1 / E5
npx playwright test e2e/2013-flows.spec.js e2e/2013-mvp.spec.js --workers=1

# after E1 / T4
npx playwright test e2e/2018-mvp.spec.js e2e/2018-flows.spec.js e2e/2018-2022-leftover-3x.spec.js --workers=1

# after T2 / T3
npx playwright test e2e/2010-2015-3x-cut.spec.js e2e/2015-2020-3x-cut.spec.js e2e/2012-4x-flows.spec.js --workers=1
```

Pass rule: no new dest folder · dest-field still 0 · leftover complete never writes the year star · 2013/2018 stay lean.

---

## 10. One-line status

**Broken:** B1–B3 dest HTML fixed.  
**Incomplete:** T1–T4 / E1–E9 dest-true specs shipped. E10 stays sample.  
**Improvable:** I1–I7 / I9 done.  
**Not implemented (leave it):** 2013/2018 leftover-3× second · leftover-4× on lock years · forests · 2020/2023–2025 · dest-farm.
