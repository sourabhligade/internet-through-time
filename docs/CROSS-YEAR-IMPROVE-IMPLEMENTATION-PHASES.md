# Cross-year improve — execute this (1994–2015 vs 2014 bar)

**Date:** 2026-08-10  
**Purpose:** Single **implement-from-this** checklist after the 2014 I1–I10 leftover pass. Turns the live scan (“what is different vs 2014 and the gold years”) into **ordered phases** with files, copy, storage, tests, and anti-patterns.  
**Do not re-scaffold any year.** Hub **1994–2015** already boots. Flows already pass.  
**Git only if asked.**

**Disk truth now:** Hub **1994–2015** · **2016+ not on disk** · 2014 **museum-ready A–F** · 2015 leftover L0–L6 **[x]** · 2013 still has the *same leftover class 2014 just closed* (Chrome one-click + Win7/IE8 clone voice).

**This file supersedes leftover execute order** in [`YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md`](YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md) for **open disk years only** (research IDs stay; **run X-phases here**).  
Do **not** use that file’s 2016–2018 rows — those years are **not on disk**.

---

## 0. How to use

### 0.1 Every phase has

| Section | Meaning |
|---------|---------|
| **Goal** | What done looks like |
| **Why** | Frozen fact / steal-from-year |
| **Artifact / sources** | URLs + CAPTURE — do not invent |
| **Disk start** | What exists before you start |
| **Files** | Paths |
| **Steps** | Ordered checklist |
| **Copy bank** | Paste-ready period phrases |
| **Storage / REAL** | `ittYY-*` · incomplete **never writes** |
| **Acceptance** | Pass/fail |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

### 0.2 Bible stack

| # | Doc | Use |
|---|-----|-----|
| **0** | [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable |
| **1** | **This file** | **★ Improve steps** |
| **2** | [`2014-IMPROVE-MUSEUM-GRADE-GAMES-IMPLEMENTATION-PHASES.md`](2014-IMPROVE-MUSEUM-GRADE-GAMES-IMPLEMENTATION-PHASES.md) | Pattern we just shipped (I1 voice · I2 Chrome · I3 game bible) |
| **3** | [`YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md`](YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md) | Older IDs · clone-scrub strings |
| **4** | [`MUSEUM-READY-BAR-1994-2012.md`](MUSEUM-READY-BAR-1994-2012.md) | Layers A–F |
| **5** | [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Incomplete never writes |
| **6** | live **2014** Chrome / Win7 / extras | Steal HTML + extras boot |
| **7** | live **2015** `bootChrome15` | Same 3-check in extras |
| **8** | [`GAMES-PER-YEAR/YEAR-2014.md`](GAMES-PER-YEAR/YEAR-2014.md) | Game-bible template for 2015 |
| **9** | Year `YYYY-READ-FIRST.md` / `YYYY-MUSEUM-GRADE.md` | Thesis · bans · grade |
| **10** | [`NON-DONE.md`](NON-DONE.md) | Residual forever vs this execute list |

### 0.3 Status marks

| Mark | Meaning |
|------|---------|
| **[x]** | Already true on disk 2026-08-10 |
| **[ ]** | Open — do this |
| **[~]** | Partial / forever optional |

### 0.4 What “done” means

| Claim | Required phases | Not required |
|-------|-----------------|--------------|
| **Ship (already)** | All years 1994–2015 hub-unlocked · flows green | leftover |
| **2013 leftover-closed** | **X1 + X2 + X3** | 2nd game · WA stills |
| **2015 clone-honest** | **X4 + X5 + X6** | New 2015 rooms |
| **Chrome REAL 2008–2012** | **X7–X11** | Pixel harvest |
| **2014 polish** | **X12** (IE8 voice) | X13 gold Twitch · X14 Flappy room |
| **Early gold deepen** | **X15** only if we want 1994 ritual | 2006 Time You (already 2-trail) |
| **L4** | listed only | never |

### 0.5 Hard rules

1. Config + content + extras only · **no engine fork** except the one shared Chrome gate in `chrome-browser.js` (X7).  
2. Storage **year prefix only** (`itt08`…`itt15`). Incomplete **never writes**.  
3. Never invent brand pixels. Failed-final / continuity / RECON only.  
4. **Do not rewrite** Amazon/Yahoo/Google forests. Visitor-visible residual or an “archive residual” chip.  
5. One-thing per year **does not change**.  
6. Chrome 3-check copy must be **year-true** (2008 is launch, 2012 is #1 global, 2014/15 already done).  
7. **Do not scaffold 2016+.**  
8. When you kill `data-chrome-download` one-click, **you must update that year’s e2e** in the same phase — 2008/2010/2012/2013 tests click it today.  
9. **Git only if asked.**

### 0.6 Locked comparison (scan 2026-08-10)

| Year | HTML | Assets | Extra boots | Game | Chrome | Leftover class |
|-----:|-----:|-------:|-------------|------|--------|----------------|
| 1994–97 | 84–173 | 22–50 | — | 1 | n/a | Gold machines (keep) |
| 2005 | 285 | **162** | — | HoverChop | n/a | **Best mid-era — keep** |
| 2006 | 296 | 162 | — | TrailSled | n/a | Time You **already** 2-trail |
| 2007 | 312 | 162 | 8 | Box Shift | n/a | Thin extras optional |
| 2008–12 | 323–390 | **5–20** | 2010 only | 1 | **one-click** | X7–X11 |
| **2013** | 412 | 4 | **20** | **2** | **one-click** | X1–X3 |
| **2014** | 432 | 9 | 12 | Tile Fold + bible | **3-check** | X12 voice · X13 optional |
| **2015** | 446 | 11 | **24** | Blob Rush, **no bible** | **3-check** | X4–X6 |
| 2016+ | — | — | — | — | — | **not on disk** |

**2014 is not the best year.** Gold = **1995 Amazon · 1996 Hotmail · 1997 ICQ · 2005 YouTube/Maps**. 2013 still wins **games + extras**. 2014/2015 win **Chrome REAL + late e2e pack**.

### 0.7 Global gates (run after each wave)

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/year-core-flows.spec.js e2e/year-signature-flows.spec.js \
  e2e/year-handoff-flows.spec.js e2e/all-years-real-system.spec.js --workers=1
```

**Voice grep (X1 / X12)**
```bash
# Must be empty after X1:
grep -n 'shell default for 2012' years/2013/sites/windows7 --include='*.html'
# Must not claim 2009 mass shell inside 2013–2015:
grep -n '2009 honesty' years/2013/sites/ie8 years/2014/sites/ie8 years/2015/sites/ie8
```

**Chrome grep (X2 / X7–X11)**
```bash
# After a year is converted, this file must not one-click-write:
grep -n 'data-chrome-download' years/YYYY/sites/chrome/index.html
# 2014/2015 already 0. 2008–2013 are the work.
```

---

## 1. Phase map

| Phase | Name | Steal | Est. | Status | Wave |
|-------|------|-------|------|--------|------|
| **X0** | Inventory — do not rebuild years | — | S | **[x]** scan 2026-08-10 | — |
| **X1** | 2013 Win7 / IE8 year-voice | 2014 I1 | S | **[x]** | **A · 2013** |
| **X2** | 2013 Chrome 3-check REAL | 2014 I2 / `bootChrome14` | S | **[x]** | A |
| **X3** | 2013 tests for X1–X2 | 2014-real-flows Chrome | S | **[x]** | A |
| **X4** | 2015 Blob Rush bible + gold band | `YEAR-2014.md` | S | **[x]** | **B · 2015** |
| **X5** | 2015 leftover-2014 rooms → residual archive | 2014 Snowden residual chip | S | **[x]** | B |
| **X6** | 2015 docs honesty (DISK-TRUTH leftover line) | 2014 I10 | S | **[x]** | B |
| **X7** | Shared Chrome gate + **2008** 3-check | 2014 + comic literacy | M | **[x]** | **C · Chrome** |
| **X8** | 2009 Chrome 3-check | X7 | S | **[x]** | C |
| **X9** | 2010 Chrome 3-check | X7 | S | **[x]** | C |
| **X10** | 2011 Chrome 3-check | X7 | S | **[x]** | C |
| **X11** | 2012 Chrome 3-check (Chrome > IE year) | 2012 share copy already on page | S | **[x]** | C |
| **X12** | 2014 IE8 / `portal-2013` voice | X1 | S | **[x]** | **D · 2014** |
| **X13** | 2014 Twitch gold-lite (optional) | 2013 Telegram | M | **[x]** channel + 2 checks | D |
| **X14** | 2014 I3b Flappy-flood room (optional) | what’s-new Feb 10 line | S | **[~]** | D |
| **X15** | 1994 CSotD wander-before-stamp | 2014 Slack incomplete | S | **[x]** | **E · early** |
| **X16** | 1998 Lucky costume = Google home | 1998 google/index | S | **[x]** logo/home chrome already + `data-itt-year` | E |
| **X17** | 2013 `flow-link-verify` pack | 2014-flow-link-verify | M | **[x]** | F |
| **X18** | 2007 Kindle / Beacon deepen | 2013 extras | M | **[~]** whisper→order already | F |
| **X19** | 2011 Qwikster dual-site trail | 2010 densify-culture | S | **[x]** Netflix visit required | F |
| **X20** | Pixels L4 2008–2015 | failed-final only | L | **[~]** | L4 |
| **X21** | Docs drift (NON-DONE still says 2015+ unbuilt) | this file | S | **[x]** | docs |
| **X22** | Do **not** scaffold 2016+ | — | — | **[x]** rule | stop |

**Order:** X1 → X2 → X3 → X4 → X5 → X6 → X7 → X8–X11 → X12 → X21.  
*parallel-ok after X3:* X4–X6 with X12.  
*parallel-ok after X7:* X8–X11 (same HTML recipe).  
**Skip X13–X20 unless we want densify, not leftover-close.**

---

# Phase X0 — Inventory (already true) **[x]**

### Goal
Do not rebuild 1994–2015. Do not reopen gold years.

### Disk start (2026-08-10)

| Keep — do not redo | Evidence |
|--------------------|----------|
| 1995–97 gold | Amazon cart · Hotmail inbox · ICQ UIN |
| 2005 gold | YouTube + Maps + 11 e2e · 162 assets |
| 2006 Time You | `one-thing-machines.js` already requires **name + 2 trails** |
| 2014 I1–I10 | Chrome 3-check · Tile Fold death-write · Cardboard/Slack/gems · 117 e2e |
| 2015 L0–L6 | Watch/Win10/Periscope REAL · Chrome 3-check · 123 e2e |
| All-years flows | 320 passed (core · signature · handoff · REAL · games) |

### Anti-patterns
`cp years/2013 years/2016` · changing 2014 one-thing off WhatsApp · inventing Chrome % · rewriting forests.

---

# Phase X1 — 2013 year-voice **[x]**

### Goal
Visitor-visible residual pages say **2013 residual**, not leftover 2012/2009 mass-PC copy.

### Why
Same clone-voice hole 2014 I1 closed. 2013 Win7 still: “shell default for **2012**”. `sites/ie8/index.html` is titled IE9 and says **“2009 honesty · XP + IE 9”**.

### Artifact / sources
2013 READ FIRST · Win7 GA **Oct 22, 2009** · 2013 shell = **Win7 + IE 9 / Chrome** · IE11 with 8.1 · IE9 is 2011 product not this year’s story.

### Disk start
```
years/2013/sites/windows7/index.html   → "Mass PC year 2013" + "shell default for 2012"
years/2013/sites/ie8/index.html        → title IE9 · 2009 honesty · XP + IE 9
```

### Files
```
years/2013/sites/windows7/{index,about,features}.html   # about/features if same voice
years/2013/sites/ie8/index.html
years/2013/sites/ie9/index.html                         # keep as 2011 archive residual
e2e/2013-shell-honesty.spec.js                          # add voice asserts (X3)
```

### Steps
1. Win7 index: keep “Mass PC year **2013**” (true residual). Replace “shell default for **2012**” with “Museum shell default for **2013**: **Win7 + IE 9 / Chrome**.”
2. Point late product to Win8.1 / IE11, not IE9-as-this-year.
3. IE8 room: either retitle to **IE 8 archive residual** (2009 product, not 2013 shell) **or** redirect copy to IE9-as-2011-archive. Do **not** say XP is the 2013 mass shell.
4. Grep `years/2013` for `shell default for 2012` and `2009 honesty` on visitor-visible P0/P1 pages only. Forest Amazon/Yahoo: skip (X0 rule 4).

### Copy bank
- “Mass residual 2013 (GA Oct 22, 2009). Honest museum default shell.”
- “Browser class: IE 9 / Chrome. IE 8 is a 2009 archive, not this year’s story.”
- “Windows 8.1 + IE 11 are this year’s *product* rooms — not January mass OS.”

### Storage / REAL
None (voice only).

### Acceptance
- No `shell default for 2012` under `years/2013/sites/windows7`.
- IE8/IE9 rooms do not claim XP is the 2013 museum shell.
- About 2013 still reachable.

### Tests
```bash
grep -n 'shell default for 2012' years/2013 --include='*.html'
npm run test:e2e:2013
```

### Anti-patterns
Calling Win8.1 the January shell. Deleting IE8 page (break links). Rewriting 400 forest pages.

---

# Phase X2 — 2013 Chrome 3-check REAL **[x]**

### Goal
2013 Chrome room no longer one-click-writes `itt13-chrome`. Three year-true checks required.

### Why
2014 I2 / 2015 `bootChrome15`. 2013 is the global-#1 habit year; US desktop still IE-plurality class. Edge is **2015**.

### Artifact / sources
Live `years/2014/sites/chrome/index.html` + `bootChrome14` in `js/immersion/year-2014-extras.js`. 2013 page already has the StatCounter share table.

### Disk start
```
years/2013/sites/chrome/index.html   data-chrome-download + data-chrome-prefer
js/immersion/chrome-browser.js       one-click save (year prefix via immersionStorageKey)
e2e/2013-real-flows.spec.js          clicks download → expects itt13-chrome
e2e/2013-shell-honesty.spec.js       same
```

### Files
```
years/2013/sites/chrome/index.html
js/immersion/year-2013-extras.js     # bootChrome13 (prefer extras, not engine fork)
```

### Steps
1. Remove `data-chrome-download`. Keep costume (logo continuity, share table).
2. Add three checks + save (see copy bank).
3. `bootChrome13` in extras: all three required · write `itt13-chrome` `{ habit, notEdge, downloaded, multiStep, real, year:"2013" }`.
4. Prefer-button: either delete or also require the three checks (do not one-click prefer).
5. `chrome-browser.js` will no-op if download/prefer are gone. Leave engine for X7.

### Copy bank
- Check 1: “Chrome is global #1 habit in 2013 — US desktop still IE plurality residual.”
- Check 2: “Edge / Win10 retail are 2015 — not this year.”
- Check 3: “Download Chrome (theater) — no real installer.”
- Button: “Save Chrome habit REAL”
- Key line: `itt13-chrome` · incomplete never writes

### Storage / REAL
| Key | Incomplete |
|-----|------------|
| `itt13-chrome` | <3 checks · bare click |

### Acceptance
- `grep data-chrome-download years/2013/sites/chrome` empty.
- Bare save writes nothing.
- Three checks write `itt13-chrome` with `real:true`.

### Tests
See **X3**. Until X3 lands, `npm run test:e2e:2013` **will fail** on Chrome download tests — **do X2+X3 in one sitting**.

### Anti-patterns
Using 2014 US 45/33 numbers on the 2013 page. Leaving `data-chrome-download` for “compat.” Hardcoding `itt08-chrome`.

---

# Phase X3 — 2013 tests **[x]**

### Goal
2013 pack proves voice + Chrome REAL. No-mock isolation still green.

### Files
```
e2e/2013-shell-honesty.spec.js
e2e/2013-real-flows.spec.js
e2e/no-mock-flows.spec.js            # add 2013 Chrome if not covered
```

### Steps
1. Replace “click `[data-chrome-download]` → key” with: count download == 0 · bare save no write · 3 checks write.
2. Add Win7 residual assert: body matches `/residual 2013|Mass PC year 2013/` and **not** `shell default for 2012`.
3. Run:
```bash
npm run test:e2e:2013
npx playwright test e2e/year-signature-flows.spec.js e2e/no-mock-flows.spec.js -g "2013|Chrome" --workers=1
```

### Acceptance
`test:e2e:2013` green. Signature 2013 Vine/Snap unchanged.

### Anti-patterns
Weakening tests to `toBeTruthy()` on any chrome key. Skipping isolation.

---

# Phase X4 — 2015 game bible **[x]**

### Goal
`docs/GAMES-PER-YEAR/YEAR-2015.md` exists. Blob Rush documents death-write + gold band. README index row added.

### Why
2014 I3. `year-2015-blobrush.js` **already** `saveBest` on `endRun` (eaten by bigger cell / New Game mid-run). Missing: bible + explicit `{ gold:true }` at museum-short mass.

### Disk start
```
js/games/year-2015-blobrush.js       endRun → saveBest({ mass })
years/2015/sites/playable/game.html  host ok
docs/GAMES-PER-YEAR/YEAR-2015.md     MISSING
docs/GAMES-PER-YEAR/README.md        table stops at 2014
```

### Files
```
docs/GAMES-PER-YEAR/YEAR-2015.md          # new — clone YEAR-2014.md shape
docs/GAMES-PER-YEAR/README.md             # add 2015 Blob Rush row
js/games/year-2015-blobrush.js            # optional gold:true at mass 80 or 120
years/2015/sites/playable/game.html       # honesty strip: agar.io-class 2015 · not agar.io
```

### Steps
1. Copy `YEAR-2014.md` structure. Title **Blob Rush**. Key `itt15-game-blobrush`. Inspiration: **agar.io** (2015 browser mania). Legal: original cells · never the name as museum title · no ripped art.
2. Document: load never writes · death `saveBest` · gold at **mass 80** (museum-short; live code celebrates 120 — pick one and match JS).
3. If JS has no `gold` flag, add `merge: { gold: true }` when mass ≥ band, and `gold: false` on death with score>0 (already writes).
4. README index + GAMES authenticity one-liner.

### Copy bank
- “agar.io-class · 2015 browser-tab mania · museum title Blob Rush · not agar.io.”
- “Gold band mass 80 (museum-short). Death still writes best.”

### Storage / REAL
| Key | Incomplete |
|-----|------------|
| `itt15-game-blobrush` | load / mass 0 |

### Acceptance
Bible exists. `year-games-real` 2015 still writes. Isolation: no `itt14-game-tilefold`.

### Tests
```bash
npx playwright test e2e/year-games-real.spec.js e2e/year-games-flows.spec.js -g "2015" --workers=1
```

### Anti-patterns
Second Flappy. Calling it agar.io. Gold at 1000 (not museum-short).

---

# Phase X5 — 2015 leftover-2014 rooms **[x]**

### Goal
2014-product rooms that still sit in `years/2015/` are labeled **Residual 2014 · archive**, not “this year’s P0.”

### Why
2015 was cloned from 2014. Home/guided already Watch-first (good). Tree still has Heartbleed, Twitch $970M, Alibaba IPO, Bendgate, Material, 1B-cross, Oculus-as-2014-bet as **live 2-check worksheets** writing `itt15-*`.

### Disk start (live worksheets)
```
years/2015/sites/heartbleed/rotate.html     itt15-heartbleed-rotate
years/2015/sites/twitch/index.html          itt15-twitch
years/2015/sites/alibaba/index.html         itt15-alibaba
years/2015/sites/iphone/bendgate.html       itt15-bendgate
years/2015/sites/material/index.html        itt15-material
years/2015/sites/billion/index.html         itt15-billion-ack
years/2015/sites/oculus/index.html          itt15-oculus   # also have cv1.html as 2015 pre-ship — keep that
```

### Files
Those HTML files + `years/2015/pages/home.html` (only if they appear above guided — they should not).  
`years/2015/sites/oculus/cv1.html` is the **2015** room — do not residual-chip that one.

### Steps
1. Yellow/red banner on each leftover file:
   “**Residual 2014.** This product’s mass story was last year. 2015 one-thing is **Apple Watch shipped**.”
2. Link to the 2015 analogue when one exists (Oculus → `cv1.html` pre-ship; 1B → About 1B-dip honesty).
3. Do **not** delete files (urlMap + tests). Do **not** promote them onto `#ott-guided-2015`.
4. Optional: stop writing `itt15-twitch` etc. and make the residual chip non-saving (literacy only). Safer: keep REAL but banner-first.

### Copy bank
- “Residual 2014 · CVE-2014-0160 is last year’s panic. This year: Let’s Encrypt + password hygiene leftover.”
- “Twitch $970M closed 2014. This year is live-video *war* (Periscope / Meerkat), not the acquisition.”
- “Bendgate is 2014. This year: iPhone 6s + 3D Touch.”

### Storage / REAL
No new keys. If you disable saves, update any 2015 densify test that still hits those paths.

### Acceptance
Opening `/years/2015/sites/heartbleed/` says Residual 2014 in the first screenful. Guided home still Watch-first.

### Tests
```bash
npm run test:e2e:2015
# add 2–3 asserts in 2015-shell-honesty or densify:
# heartbleed body matches /Residual 2014|last year/
```

### Anti-patterns
Deleting Heartbleed (breaks urlMap). Moving Watch off one-thing. Calling CV1 “retail 2015.”

---

# Phase X6 — 2015 docs honesty **[x]**

### Goal
DISK-TRUTH / grade / leftover tables match disk (MVP leftover is **closed**; pixels stay C).

### Files
```
docs/DISK-TRUTH.md                         # 2015 "MVP building / L0–L6" → leftover [x], pixels C
docs/2015-MUSEUM-GRADE.md                  # execute leftover line
docs/2015-IMPLEMENTATION-PHASES-STEP-BY-STEP.md  # header e2e 16 pass → 123
docs/2015-READ-FIRST.md                    # leftover pointer
```

### Steps
Same as 2014 I10. Do **not** claim L4 WA stills. Point improve leftovers at **this file X4–X5**.

### Acceptance
No doc says “2015 research-only” or “L0–L6 open.”

---

# Phase X7 — Shared Chrome gate + 2008 **[x]**

### Goal
One shared REAL gate in `chrome-browser.js`: if `[data-chrome-req]` exists, **all must be checked** before download/prefer writes. Then 2008 HTML gets three **launch-year** checks.

### Why
2008–2012 all use `chrome-browser.js` + `data-chrome-download`. Forking extras per year is fine (2013 X2) but 2008–2012 should share the engine they already have.  
**2008 is not “habit #1”** — it is **Windows beta Sep 2 / 1.0 Dec 11 / comic**.

### Artifact / sources
CAPTURE `[wa]` 2008 logo + dlpage already on the room. Google Chrome comic (text RECON, no stolen panels).

### Disk start
```
js/immersion/chrome-browser.js             one-click save
years/2008/sites/chrome/index.html         download + prefer
e2e/2008-mvp.spec.js
e2e/2008-flows.spec.js
e2e/2008-real-flows.spec.js
e2e/2008-trail-real-flows.spec.js
e2e/year-signature-flows.spec.js           2008 Chrome download theater
```

### Files
Those six + this phase’s HTML.

### Steps
1. In `chrome-browser.js` `boot`:
   - `var reqs = doc.querySelectorAll("[data-chrome-req]");`
   - `function checksOk()` — if `reqs.length === 0` return **true** (legacy; X8–X11 will add boxes).
   - On download **and** prefer: if `!checksOk()` feedback error, **return** (no `save`).
   - When checks pass, set `o.multiStep = true; o.real = true`.
2. 2008 HTML: three `[data-chrome-req]` labels (copy bank). Keep download + prefer buttons (costume is the download page).
3. Update **every** 2008 test that clicks download:
   - incomplete click → `itt08-chrome` falsy
   - three checks + download → truthy
4. Isolation: still `itt08-chrome` only (prefix comes from `immersionStorageKey`, not the hardcoded `"itt08"` fallback — do not switch to writing `itt14`).

### Copy bank (2008 only)
- “Public beta Sep 2, 2008 is **Windows-first** — Mac/Linux later.”
- “Not the museum mass shell (XP + IE 7). Product room, not rewrite the desktop.”
- “Download Chrome (theater) — comic-book browser, no real installer.”

### Storage / REAL
| Key | Incomplete |
|-----|------------|
| `itt08-chrome` | checks present and any unchecked |

### Acceptance
2008 pack green. 2009–2012 **still pass** (no boxes yet → legacy one-click still writes). Convert them in X8–X11 immediately after so we do not leave a mixed bar.

### Tests
```bash
npm run test:e2e:2008
npx playwright test e2e/year-signature-flows.spec.js -g "2008" --workers=1
```

### Anti-patterns
Removing the 2008 WA download screenshot. Using 2012 “#1” copy in 2008. Breaking 2009–2012 in this phase (legacy path must remain until those years get boxes).

---

# Phase X8 — 2009 Chrome **[x]**

### Goal
Same gate as X7 with **2009** copy (still not #1; Mac/Linux late; Chrome OS announce is not mass PC).

### Files
```
years/2009/sites/chrome/index.html
e2e/2009-*.spec.js                         # only if they click download
```

### Copy bank
- “2009: Chrome is real daily software, not a Sep-2008 novelty.”
- “Chrome OS announce (Nov 19) is **not** a mass PC replacement.”
- “Museum shell stays XP + IE 8 (after March). Download is theater.”

### Storage
`itt09-chrome` · 3 checks.

### Tests
```bash
npm run test:e2e:2009
```

---

# Phase X9 — 2010 Chrome **[x]**

### Files
```
years/2010/sites/chrome/index.html
e2e/2010-real-flows.spec.js                # "Chrome download mutates itt10-chrome"
e2e/2010-flows.spec.js
```

### Copy bank
- “2010: Chrome is a product room next to IE 8 / IE 9 beta — not the sole shell.”
- “IE 9 is **beta** this year (not 2011 ship as mass).”
- “Download theater · auto-update lore · no real installer.”

### Storage
`itt10-chrome`.

### Tests
```bash
npm run test:e2e:2010
```

---

# Phase X10 — 2011 Chrome **[x]**

### Files
```
years/2011/sites/chrome/index.html
e2e/2011-real-flows.spec.js                # grep before editing
```

### Copy bank
- “2011: IE 9 is the Microsoft *product* story. Chrome is the habit climbing next to it.”
- “Not Chrome OS as mass PC. Not Edge.”
- “Download theater.”

### Storage
`itt11-chrome`.

---

# Phase X11 — 2012 Chrome **[x]**

### Goal
This is the **Chrome > IE** year. Page already has May 2012 / July 33.8 vs 32 copy. Only the one-click is wrong.

### Files
```
years/2012/sites/chrome/index.html
e2e/2012-trail-real-flows.spec.js
e2e/2012-real-flows.spec.js                # grep
```

### Copy bank
- “Chrome first overtook IE globally around May 2012 (StatCounter class). Label the source.”
- “US/UK may still show IE residual — not a fake permanent %.”
- “Not Chrome OS as mass PC. IE 10 ships with Windows 8 (Oct) — product, not January shell.”

### Storage
`itt12-chrome`.

### Tests
```bash
npm run test:e2e:2012
npx playwright test e2e/year-core-flows.spec.js e2e/year-signature-flows.spec.js -g "2012|2008|2010|2013" --workers=1
```

### Acceptance (end of wave C)
```bash
grep -n 'data-chrome-download' years/200{8,9}/sites/chrome years/201{0,1,2,3}/sites/chrome
# download button may remain; the *un-gated* one-click path must be gone
# (gated download OK for 2008–12; 2013 removed it in X2)
```

---

# Phase X12 — 2014 leftover voice **[x]**

### Goal
Finish the one 2014 I1 miss: IE8 room + `portal-2013` class.

### Disk start
```
years/2014/sites/ie8/index.html     "2009 honesty" · "XP + IE 9"
years/2014/pages/home.html          class="portal-2014 portal-2013"
```

### Steps
1. IE8: “Archive residual 2009 · this museum year is **IE 11 / Chrome** on **Win7 residual**. Win10 is TP only.”
2. Home: drop `portal-2013` if no CSS depends on it (check `css/period-2014.css` / `period-2013.css`). If CSS needs the class, keep it and add an HTML comment “CSS hook only.”
3. Same pass on `years/2015/sites/ie8/index.html` (identical clone string).

### Tests
```bash
npm run test:e2e:2014
grep -n '2009 honesty' years/2014/sites/ie8 years/2015/sites/ie8
```

---

# Phase X13 — 2014 Twitch gold-lite **[~]**

### Goal
Twitch is a **room you use**, not two checkboxes. Optional — does not block any claim.

### Why
2014 P1 worksheets (Twitch / Oculus / Alibaba / Material / Bendgate / 1B) are the remaining gap vs 2005/2013. Twitch is the highest-memory one ($970M · Aug 25).

### Disk start
`years/2014/sites/twitch/index.html` — 2-check `itt14-twitch`.

### Steps (minute)
1. Keep the $970M / 55M uniques literacy.
2. Add channel name (2+ chars) + “live game video not YouTube VOD” check + “not the 2014 one-thing (WhatsApp is)” check.
3. Boot in `year-2014-extras.js` `bootTwitch` — empty name / missing checks write nothing.
4. e2e in `2014-real-flows.spec.js`.

### Storage
`itt14-twitch` `{ channel, liveNotVod, notOtt, real, multiStep }`.

### Anti-patterns
Ripped Twitch player. Live HLS. Making Twitch the one-thing.

**Same recipe later (do not batch unless asked):** Oculus (kit + not-retail) · Alibaba (ticker + not-Amazon) · Material (paper + same-week Cardboard).

---

# Phase X14 — 2014 Flappy-flood literacy **[~]**

### Goal
A small room for **~10 Feb 2014** store kill + clone flood. **Not** a second Flappy (Pipe Hop stays 2013).

### Files
```
years/2014/sites/playable/flappy-flood.html    # or sites/flappy/index.html
years/2014/pages/whats-new.html                # already has Feb 10 line
```

### Storage
Optional `itt14-flappy-flood` 2-check (Android Jan 30 · kill ~Feb 10 · not this board).

### Anti-patterns
New tap-flap game. Copying Pipe Hop.

---

# Phase X15 — 1994 CSotD wander-before-stamp **[~]**

### Goal
Guestbook stamp only after the visitor **clicks today’s pick** (the actual 1994 ritual).

### Why
CSotD already has today / archive / guestbook + name≥2. It is not a one-click chip anymore. Remaining gold deepen: wander first.

### Disk start
```
years/1994/sites/csotd/index.html
years/1994/sites/csotd/archive.html
years/1994/sites/csotd/guestbook.html
js/immersion/one-thing-machines.js   bootCsotd
e2e/1994-csotd-real.spec.js
```

### Steps
1. In `bootCsotd`: track `wandered` on `[data-csotd-link]` click.
2. Submit without wander → error, no write.
3. Archive clicks still do **not** stamp (already true).
4. Update `1994-csotd-real` + one-thing 1994.

### Storage
`itt94-csotd` / `itt94-csotd-gb` — add `wandered:true`.

### Anti-patterns
Stamping on page load. Breaking archive.

---

# Phase X16 — 1998 Lucky costume **[~]**

### Goal
I’m Feeling Lucky page looks like **1998 Google home**, not a sparse jump sheet.

### Files
```
years/1998/sites/google/lucky.html
years/1998/sites/google/index.html     # steal logo/table
e2e/1998-lucky-real.spec.js
```

### Steps
Clone visual chrome from `google/index.html`. Keep empty-query block + in-year jump + `itt98-lucky`. Do not change the REAL gate.

---

# Phase X17 — 2013 flow-link-verify **[~]**

### Goal
Same href/REAL matrix 2014/2015 have.

### Files
```
e2e/2013-flow-link-verify.spec.js      # clone 2014 file, swap year/prefix/rooms
package.json                           # add to test:e2e:2013
js/config/flow-maps.js                 # 2013 map already exists — assert those hrefs
```

### Rooms to list
Vine · IG video · Snap story · iOS 7 · Chrome · Snowden · PS4 · Xbox · WhatsApp · Loop Six · Pipe Hop.

---

# Phase X18 — 2007 Kindle / Beacon deepen **[~]**

### Goal
Existing extras (`bootKindle` · `bootBeacon`) feel like 2013 Telegram, not a plaque.

### Files
```
years/2007/sites/amazon/kindle.html
js/immersion/year-2007-extras.js
e2e/2007-real-flows.spec.js
```

### Anti-patterns
Reopening 2007 MVP. Live Amazon.

---

# Phase X19 — 2011 Qwikster trail **[~]**

### Goal
Netflix/Qwikster is a **two-site** trail (the actual 2011 humiliation), not one page.

### Files
```
years/2011/sites/netflix/qwikster.html     # exists
years/2011/sites/netflix/index.html
e2e/2011-trail-real-flows.spec.js
```

### Storage
`itt11-qwikster` only after visiting both + honesty “this split lasted weeks, then died.”

---

# Phase X20 — Pixels L4 **[~]**

### Goal
Failed-final / continuity labels only. **Never invent logos.**

| Year | Honest move |
|------|-------------|
| 2008–2010 | Already have some `[wa]` — retry failed-final only |
| 2011–2013 | 4–8 files · CAPTURE honesty READMEs |
| 2014 | Heartbleed CC0 already RECON · WA stills leftover |
| 2015 | dirs exist · files empty · keep C |

Does **not** block any claim in §0.4.

---

# Phase X21 — Docs drift **[x]**

### Goal
Canonical docs stop contradicting disk.

### Disk start (wrong today)
- `docs/NON-DONE.md` still says “**2015+ is not playable.**”
- `docs/YEAR-STATUS-AUDIT-2026-08-08.md` scores 2016–2020 and calls 2014 Slack the one-thing (WhatsApp is).
- `docs/LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md` hub 1994–2018.
- `docs/MUSEUM-READY-BAR-1994-2012.md` claims 2014–2016 museum-ready (2016 not on disk).

### Files
```
docs/NON-DONE.md
docs/DISK-TRUTH.md
docs/YEAR-STATUS-AUDIT-2026-08-08.md     # banner: historical · hub now 1994–2015
docs/MUSEUM-READY-BAR-1994-2012.md       # 2016+ sentence
docs/LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md
```

### Steps
1. NON-DONE ship-truth line → hub **1994–2015**. Point ★ to **this file**.
2. DISK-TRUTH header “2015 MVP building” → 2015 leftover closed / pixels C.
3. Banner on the Aug-08 audit: do not use for execute order.
4. Bar file: museum-ready claim through **2015** only.

### Anti-patterns
Deleting the audit (it is history). Unlocking 2016 on the hub in docs.

---

# Phase X22 — Stop **[x]**

Do **not**:
- Scaffold 2016 / 2017 / 2018
- `cp years/2015 years/2016`
- Add IG Stories / Pokémon GO / Reactions as 2015 products
- Add a second Flappy to 2014
- Claim 2014 is “better than 2005”

---

## 2. Copy bank — Chrome checks by year (paste only)

| Year | Check 1 | Check 2 | Check 3 |
|------|---------|---------|---------|
| 2008 | Windows-first beta Sep 2 | Not the XP+IE7 shell | Download theater |
| 2009 | Daily software, not novelty | Chrome OS announce ≠ mass PC | Download theater |
| 2010 | Product next to IE 8 / IE 9 beta | IE 9 is beta this year | Download theater |
| 2011 | Climbing next to IE 9 product | Not Chrome OS mass · not Edge | Download theater |
| 2012 | Global overtake May 2012 (StatCounter class) | US/UK may still be IE residual | Not Chrome OS mass PC |
| 2013 | Global #1 habit | US desktop IE plurality residual | Not Edge (2015) |
| 2014 | **[x]** global #1 · US IE ~45 / Chrome ~33 | **[x]** not Edge | **[x]** theater |
| 2015 | **[x]** habit residual next to Edge | **[x]** Edge is EdgeHTML not Chromium | **[x]** theater |

---

## 3. Storage map (new / changed)

| Key | Phase | Incomplete |
|-----|-------|------------|
| `itt13-chrome` | X2 | <3 checks |
| `itt15-game-blobrush` | X4 | load / mass 0 (already) · gold flag optional |
| `itt08-chrome` … `itt12-chrome` | X7–X11 | checks present and unchecked |
| `itt14-twitch` | X13 | empty channel / <2 honesty |
| `itt14-flappy-flood` | X14 | <2 |
| `itt94-csotd` | X15 | no wander / empty name |
| `itt11-qwikster` | X19 | one site only |

Existing P0 keys stay.

---

## 4. Test matrix (must stay green)

| After phase | Command |
|-------------|---------|
| X3 | `npm run test:e2e:2013` |
| X4 | `npx playwright test e2e/year-games-real.spec.js -g "2015" --workers=1` |
| X5–X6 | `npm run test:e2e:2015` |
| X7 | `npm run test:e2e:2008` + signature 2008 |
| X8–X11 | that year’s `test:e2e:YYYY` |
| X12 | `npm run test:e2e:2014` |
| X21 | no e2e (docs) |
| Any wave end | `python3 scripts/check-all-years.py` · `python3 scripts/audit-internal-links.py` · year-core + signature + handoff |

---

## 5. Done definition

| You can say | When |
|-------------|------|
| **2013 leftover-closed** | X1 X2 X3 **[x]** |
| **2015 clone-honest** | X4 X5 X6 **[x]** |
| **Chrome REAL 2008–2015** | X2 + X7–X11 **[x]** (2014/15 already) |
| **2014 voice residual closed** | X12 **[x]** |
| **Cross-year leftover-closed** | A+B+C+X12+X21 |
| **Gold deepen** | X13 / X15 / X16 / X18 / X19 optional |
| **2016 ready to start** | only after an explicit freeze + this file’s X22 still holds until then |

**Git only if asked.**
