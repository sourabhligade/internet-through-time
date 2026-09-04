# Hub scan + improve program — 1994–2016 (2017+ parked)

**Date:** 2026-08-10  
**Purpose:** Single **implement-from-this** map of what the full-repo scan found and how to close it.  
**Scan method:** `years/*` HTML · `check-all-years.py` · `js/config/flow-maps.js` hrefs vs disk · one-thing chips · e2e pack shape · clone-forest folders · `assets/period/YYYY` · grade cards · [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`NON-DONE.md`](NON-DONE.md) · [`MUSEUM-GRADE-GAP-MAP-1994-2016.md`](MUSEUM-GRADE-GAP-MAP-1994-2016.md) · [`COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md).  
**Git only if asked.**

**Disk now:** Hub **1994–2016** · `check-all-years` **23/23 pass** · flow-map hrefs **0 dead** · one-thing chip on every home · **2017+ not on disk**.

---

## 0. How to use

### 0.1 Every phase has

| Section | Meaning |
|---------|---------|
| **Goal** | What done looks like |
| **Why** | What the scan found |
| **Disk start** | What is true before you start |
| **Files** | Paths |
| **Minute steps** | Numbered checklist |
| **Storage / REAL** | `ittYY-*` · incomplete **never writes** |
| **Acceptance** | Pass / fail |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

Work **one phase** (usually **one year**) at a time. Do not lean three forests in one pass.

### 0.2 Status marks

| Mark | Meaning |
|------|---------|
| **[x]** | True on disk after 2026-08-10 scan / 2014–16 pass |
| **[ ]** | Open — next work |
| **[~]** | Optional / L4 forever |

### 0.3 Two bars (do not mix)

| Bar | 100% means | Who has it |
|-----|------------|------------|
| **Museum-ready A–F** | Thesis · P0 REAL · pixels WA **or** failed-final · CAPTURE · e2e · `ittYY` | **All 1994–2016** (2013 label in DISK-TRUTH still says MVP — grade card is L3) |
| **Museum-grade A** | One-thing **is** the gold machine · leftover = **L4 pixels only** · forest does **not** drown the year | **1995 · 1996 · 1997 · 2005 · 2014** |

Failed-final stills **are** layer C pass. Perfect WA logos are **L4** and never block A.

### 0.4 Hard rules

1. Config + content only. No engine fork.  
2. Prefix **`ittYY-*`**. Incomplete never writes.  
3. **Never invent brand pixels.**  
4. Do **not** reopen A years (1995 · 1996 · 1997 · 2005 · 2014) for densify.  
5. Do **not** `git checkout HEAD -- years/2016`.  
6. Do **not** scaffold **2017+** unless the user says so.  
7. Continuity clones in 1995–2005 can stay (year-true). Forest in **2006–2013** is the problem.  
8. Git only if asked.

### 0.5 Bible stack

| # | Doc | Use |
|---|-----|-----|
| **0** | This file | **★ Program + execute order** |
| **1** | [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable |
| **2** | [`MUSEUM-GRADE-GAP-MAP-1994-2016.md`](MUSEUM-GRADE-GAP-MAP-1994-2016.md) | Per-year A leftover (2014 row updated) |
| **3** | [`2014-2016-TO-100-PERCENT-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md`](2014-2016-TO-100-PERCENT-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md) | 2014 lean playbook to copy |
| **4** | [`COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md) | Next *machine* (not a new chip) |
| **5** | [`NON-DONE.md`](NON-DONE.md) | Architecture / docs residual |

---

## 1. Scan scoreboard (2026-08-10)

### 1.1 Years

| Range | HTML class | Hub | Health |
|-------|------------|-----|--------|
| **1994–2016** | 43–412 | Unlocked | **23/23 pass** |
| **2017+** | **0** | Locked | Not a year |

### 1.2 Per year (disk + grade)

| Year | HTML | Sites | e2e specs | Flow-map rooms | Dead hrefs | One-thing | Grade A | Forest clones* |
|-----:|-----:|------:|----------:|---------------:|-----------:|-----------|:-------:|:--------------:|
| 1994 | 173 | 19 | 7 | 17 | 0 | CSotD | A− | yahoo (year-true) |
| 1995 | 142 | 15 | 6 | 11 | 0 | SSL checkout | **A** | year-true |
| 1996 | 100 | 18 | 7 | 11 | 0 | Portal wars | **A** | year-true |
| 1997 | 84 | 20 | 9 | 14 | 0 | PointCast | **A** | year-true |
| 1998 | 125 | 33 | 13 | 14 | 0 | Lucky | A− | year-true |
| 1999 | 148 | 37 | 11 | 14 | 0 | AIM | **?** | year-true |
| 2000 | 173 | 45 | 6 | 16 | 0 | MapQuest | A− | year-true |
| 2001 | 186 | 47 | 8 | 15 | 0 | MSN | A− | year-true |
| 2002 | 204 | 58 | 8 | 12 | 0 | Stumble | **B+** | year-true |
| 2003 | 226 | 64 | 7 | 13 | 0 | Photobucket | A− | year-true |
| 2004 | 283 | 79 | 9 | 11 | 0 | thefacebook | A− | year-true |
| 2005 | 285 | 83 | 11 | 26 | 0 | Pandora | **A** | year-true |
| 2006 | 296 | 87 | 5 | 14 | 0 | Twitter 140 | A− | **yes** |
| 2007 | 312 | 93 | 5 | 24 | 0 | iPhone Safari | A− | **yes** |
| 2008 | 323 | 97 | 6 | 15 | 0 | GitHub | A− | **yes** |
| 2009 | 334 | 106 | 6 | 17 | 0 | Stack Overflow | **B+** | **yes** |
| 2010 | 372 | 115 | 7 | 22 | 0 | Imgur | A− | **yes** |
| 2011 | 46 | 17 | 6 | 12 | 0 | Airbnb | A− | **no · lean** |
| 2012 | 47 | 20 | 6 | 13 | 0 | SoundCloud | A− | **no · lean** |
| 2013 | 49 | 26 | 8 | 34 | 0 | Vine 6s | A− | **no · lean** |
| 2014 | 43 | 25 | 9 | 30 | 0 | WhatsApp | **A** | **no** |
| 2015 | 67 | 38 | 7 | 28 | 0 | Watch ships | A− | **no** |
| 2016 | 44 | 25 | 9 | 30 | 0 | IG Stories | A− | **no** |

\*Forest = `sites/amazon` + `yahoo` + `geocities` (+ napster/pets) still present. Year-true 1995–2005 Amazon/Yahoo is **correct**. 2006–2013 copies are the drown.

### 1.3 e2e pack shape

Ideal late pack: `mvp` · `flows` · `real-flows` · `densify` · `trail`.

| Years | Pack | Note |
|-------|------|------|
| **2000–2016** | Full shape | 2014–16 REAL audited 2026-08-10 |
| **1994–1999** | Flows + signature specs · no named `mvp` / `densify` / `trail` | Other deep suites exist (cart, hotmail, icq). Optional. |

### 1.4 Period assets (L4 cliff)

1994–2007: 22–162 files. **2008: 16 · 2011: 8 · 2013: 4.** Failed-final RECON is legal. Do not invent.

### 1.5 Three leftover classes

| Class | Years | Fix |
|-------|-------|-----|
| **Forest drowns thesis** | **2006–2010** lighter clones remain | 2011–13 leaned 2026-08-10 · optional S12 for 2006–10 |
| **Chip ≠ mass habit** | **2002** Stumble card · **2009** SO · **2008** GitHub vs App Store · **2010** Imgur vs iPad/IG | Rotator / move chip / accept A− |
| **Honest leftover** | 1994 · 1998–2001 · 2003–04 · 2007 pegman · 2015–16 pixels | Costume / second gold / L4 |

**Already A — do not reopen:** 1995 · 1996 · 1997 · 2005 · **2014**.

---

## 2. Lacking years (not on disk)

| Year | Thesis class (research only) | Status |
|------|------------------------------|--------|
| **2017** | Face ID / X · Fortnite free · WannaCry · 280 · Equifax | **0 HTML** |
| **2018** | GDPR · TikTok US · IGTV · CA | **0 HTML** |
| **2019** | Disney+ · Apple TV+ · Marshmello | **0 HTML** |
| **2020** | Zoom · Reels · CCPA | **0 HTML** |
| **2021+** | — | Never started |

Older 2017–2020 trees were built then **removed** (2026-08-09 revert). MDs that still say those years shipped are **stale**.

**To exist later:** copy **2015/2016 lean** (not 2013 forest). New file. Research freeze first. **Not this program unless the user names a year.**

---

## 3. Incomplete flows (what “not done” means)

**Not missing:** flow-map 404s. Scan found **0 dead hrefs**.

**Still incomplete** vs gold A / complex bar:

| Flow | Year | Now | Done when |
|------|------|-----|-----------|
| Stumble rotator | 2002 | 1 card + interest | 3+ in-year cards · history · write after 2+ stumbles **or** move chip to Friendster |
| Like / FarmVille as one-thing | 2009 | SO ask is chip | Chip is Like **or** plant→harvest · SO stays trail |
| App Store machine | 2008 | GitHub issue is chip | Accept builder gold **or** browse→get `itt08-apps` |
| IG filter→share iOS-only | 2010 | Imgur→Reddit is chip | Share requires filter click · Imgur can stay chip |
| MySpace customize + hotlink reload | 2003 | Photobucket path gold-lite | Reload shows `<img>` without re-apply |
| thefacebook friends persist | 2004 | Join network stamp | Add friend · reload still sees them |
| MapQuest costume | 2000 | Logic done | Print page looks like 2000 directions |
| CSotD as nightly ritual | 1994 | 3-room exists | Accept A− (Yahoo is depth) |
| 2011–13 visitor hits P0 first | 2011–13 | Forest 378–412 | Lean ~50–80 **or** archive gate on every clone |

2014–2016 flow-map machines are **REAL** (incomplete no-write). Do not re-audit as unbuilt.

---

## 4. Program order

| # | Phase | Year | Blocks A? | Est. |
|---|-------|------|:---------:|:----:|
| **S0** | Freeze + re-count | all | Safety | S |
| **S1** | **2013 lean** | 2013 | **Yes** | M–L |
| **S2** | **2012 lean** | 2012 | **Yes** | M–L |
| **S3** | **2011 lean** | 2011 | **Yes** | M–L |
| **S4** | 2002 Stumble rotator **or** Friendster chip | 2002 | Yes for B+ | M |
| **S5** | 2009 chip → Like or FarmVille | 2009 | Yes for B+ | M |
| **S6** | 2008 accept GitHub A− **or** App Store machine | 2008 | Optional | S–M |
| **S7** | 2010 IG share REAL (chip can stay Imgur) | 2010 | A− → A | M |
| **S8** | 2003 MySpace body | 2003 | A− → A | M |
| **S9** | 2004 campus graph | 2004 | A− → A | M |
| **S10** | 2000 MapQuest costume | 2000 | A− → A | S |
| **S11** | **Audit 1999** (no implement until named) | 1999 | Honesty | S |
| **S12** | Optional forest-light 2006–2010 archive chips | 2006–10 | Feel | M |
| **S13** | Docs honesty (DISK-TRUTH 2013 · N24–N26) | docs | No | S |
| **S14** | Architecture N20–N22 | js/css | No | L |
| **S15** | L4 pixel retries | any | **No** | forever |
| **S16** | 2017+ | — | **Stop** | — |

**Must (gold A on remaining B+/forest years):** S0 → S1 → S2 → S3 → S4 → S5.  
**Should:** S7–S11 · S13.  
**Skip unless asked:** S6 App Store · S12 · S14 · S15 · S16.

Copy **2014 lean** ([`2014-2016-TO-100-PERCENT-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md`](2014-2016-TO-100-PERCENT-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md) P1–P6) for S1–S3.

---

# Phase S0 — Freeze + re-count **[x]**

### Goal
Numbers in §1 still match disk before anyone deletes a forest.

### Why
2014 lean changed HTML. This file will rot if you skip a recount.

### Minute steps
1. `python3 scripts/check-all-years.py` → expect **23/23**.  
2. `for y in $(seq 1994 2016); do printf '%s %s\n' $y $(find years/$y -name '*.html' | wc -l); done`  
3. Confirm `years/2017` does not exist.  
4. Paste new HTML counts into §1.2 if they drifted.

### Acceptance
- [ ] 23/23 pass  
- [ ] 2017+ still absent  
- [ ] 2014 still ~43 · 2015 ~67 · 2016 ~44

### Tests
```bash
python3 scripts/check-all-years.py
test ! -d years/2017
```

### Anti-patterns
Leaning 2013 before this count.

---

# Phase S1 — 2013 lean **[x]**

### Goal
`years/2013/` is **~50–80 HTML**. Vine / Snap / iOS 7 / IG Video / Snowden stay. Amazon/Yahoo/GeoCities **gone**.

### Why
Largest forest (412). Vine chip is already gold. Same job as 2014.

### Disk start
412 HTML · 124 site folders · one-thing `sites/vine/record.html` · `itt13-vine-posts`.

### KEEP (do not delete)
- `sites/vine/` (record + index)  
- `sites/snapchat/story.html`  
- `sites/instagram/video.html`  
- `sites/iphone/` year-true iOS 7 / 5s / 5c / Touch ID  
- `sites/snowden/` · `sites/healthcare/` · `sites/apple/` iPad Air if present  
- `sites/whatsapp/` pre-FB  
- `sites/playable/` Pipe Hop / Loop Six  
- `pages/{home,about,map,whats-new}` · shell  
- P1: PS4 · Xbox One · FB Home if on home guided

### KILL
`amazon` · `yahoo` · `geocities` · `napster` · `pets` · `zombo` · 1995–2012 continuity not on the KEEP list.

### Minute steps
1. Inventory KEEP / CHIP / KILL → `docs/references/2013/notes/LEAN-INVENTORY.txt`.  
2. `cp -R years/2013 /tmp/itt-2013-clone-backup-$(date +%Y%m%d)`.  
3. Confirm backup HTML = live 412.  
4. Delete KILL folders only.  
5. Slim `js/config/2013.js` urlMap / dirSiteKeys / locationHints / commands (no yahoo directory).  
6. Home chip: “This year is lean…” (copy 2014 home).  
7. Fix broken in-year hrefs.  
8. Update `e2e/2013-shell-honesty.spec.js` if it still hits deleted rooms (404 is the new truth).  
9. `npm run test:e2e:2013` · `one-thing` 2013 · `check-all-years --years 2013`.

### Storage / REAL
Do not touch `itt13-vine-posts` contract. Incomplete Vine still writes nothing.

### Acceptance
- [ ] HTML **50–80**  
- [ ] `sites/amazon` absent  
- [ ] One-thing still Vine record  
- [ ] e2e 2013 green  

### Tests
```bash
find years/2013 -name '*.html' | wc -l
test ! -d years/2013/sites/amazon
npx playwright test e2e/2013-*.spec.js e2e/one-thing-per-year.spec.js -g "2013" --workers=1
```

### Anti-patterns
Deleting Vine record · restoring 2012 forest into 2013 · IG/FB Stories.

---

# Phase S2 — 2012 lean **[x]**

### Goal
Same as S1 for **2012**. Target **50–80 HTML**. SoundCloud + IG Android + FB IPO stay.

### Why
390 HTML forest. SoundCloud comment is already the machine.

### KEEP
`sites/soundcloud/` · `sites/instagram/android.html` (+ iOS-honest index) · `sites/facebook/ipo.html` · Pinterest · iPhone 5 / Maps note · Win8 **late** product · playable · pages/shell.

### KILL
Same clone set as S1.

### Minute steps
Same 9 steps as S1 with `2012` · backup `/tmp/itt-2012-clone-backup-*` · `itt12-soundcloud` unchanged.

### Acceptance
- [ ] HTML 50–80 · no amazon · one-thing SoundCloud · e2e 2012 green  

### Anti-patterns
Stories / Reels / TikTok / Meta · Win8 as January default.

---

# Phase S3 — 2011 lean **[x]**

### Goal
Same as S1 for **2011**. Airbnb 3-step stays.

### KEEP
`sites/airbnb/` · Spotify US · Timeline · Google+ · Siri / iPhone 4S / iOS 5 / iCloud · iPad 2 · Qwikster · IE 9 · playable · pages/shell.

### Minute steps
Same 9 steps · `itt11-airbnb` unchanged · **Instagram stays iOS-only**.

### Acceptance
- [ ] HTML 50–80 · no amazon · one-thing Airbnb · e2e 2011 green  

### Anti-patterns
IG Android as default (that is 2012).

---

# Phase S4 — 2002 Stumble rotator **[x]**

### Goal
Stumble feels like a habit, not a museum card. Grade **A−**.

### Why
Only **B+** mid-era year whose leftover is the product, not forest.

### Files
```
years/2002/sites/stumbleupon/index.html
js/immersion/  (stumble module or extras)
e2e/2002-stumble-real.spec.js
e2e/one-thing-per-year.spec.js
```

### Minute steps
1. Keep ≥1 interest required.  
2. Stumble advances through **in-year rooms only** (Friendster, Wired, Google News, Daypop, Wikipedia…).  
3. Write `itt02-stumble` only after **2+ stumbles** (update e2e if you change the gate).  
4. Alternate: move `data-ott-one-thing="2002"` to Friendster save-profile + add-friend.  
5. Isolation vs `itt01-*` / `itt03-*`.

### Acceptance
- [ ] Incomplete (no interest) writes nothing  
- [ ] 2+ stumbles persist on reload  
- [ ] `2002-stumble-real` green  

### Anti-patterns
MySpace · iTunes Store · Facebook · “most adults have broadband.”

---

# Phase S5 — 2009 chip = mass habit **[x]**

### Goal
One-thing is **Like** or **FarmVille plant→harvest**. SO stays the nerd trail from 2008 GitHub.

### Why
Only other **B+**. Content is 100%; the star is the wrong ritual.

### Files
```
years/2009/pages/home.html
years/2009/sites/facebook/   # Like
years/2009/sites/farmville/
e2e/one-thing-per-year.spec.js
e2e/2009-real-flows.spec.js
```

### Minute steps
1. Pick **one** chip (recommended: Like on a 2009 article).  
2. Incomplete (no click / no plant) writes nothing.  
3. Complete writes `itt09-*` year key (not 2010 Open Graph).  
4. Move `data-ott-one-thing="2009"` + update one-thing spec.  
5. Home guided: SO becomes phase-2 trail.

### Acceptance
- [ ] Chip href is Like or FarmVille  
- [ ] e2e incomplete / complete / isolation green  

### Anti-patterns
iPad mass · IG/Snap · Spotify US · Win7 as January default.

---

# Phase S6 — 2008 GitHub vs App Store **[~]**

### Goal
Either **accept A−** (GitHub = how code lived) **or** gold-up App Store ~500 honesty → `itt08-apps`.

### Minute steps
1. Default: accept A− · one line in 2008-MUSEUM-GRADE residual.  
2. Only if asked: browse → get/install theater · no 2010 225k count.

### Anti-patterns
Instagram / Snap / Spotify US · Material Chrome.

---

# Phase S7 — 2010 IG share REAL **[ ]**

### Goal
Filter click required before share. Imgur can **stay** the named one-thing.

### Files
```
years/2010/sites/instagram/
e2e/2010-real-flows.spec.js
```

### Minute steps
1. Share blocked until a **filter** is clicked.  
2. Honesty: iOS-only · no Android · no Stories.  
3. e2e: incomplete no write · complete writes `itt10-*`.

### Acceptance
- [ ] No filter → no key  
- [ ] Isolation vs `itt09-*` / `itt11-*`  

---

# Phase S8 — 2003 MySpace body **[ ]**

### Goal
Photobucket apply survives reload on the profile. Tom stays failed-final / RECON text.

### Files
```
years/2003/sites/myspace/
years/2003/sites/photobucket/
e2e/2003-photobucket-myspace-real.spec.js
```

### Minute steps
1. Keep upload empty-blocked.  
2. Apply writes `itt03-myspace*` + `<img>` after reload.  
3. Comment + invite persist.  
4. No invented Tom pixel.

### Acceptance
- [ ] Reload shows hotlink without re-apply  
- [ ] Existing photobucket e2e still green  

---

# Phase S9 — 2004 campus graph **[ ]**

### Goal
Join Harvard → add a friend → reload still sees them.

### Files
```
years/2004/sites/facebook/
e2e/2004-facebook-friends.spec.js
e2e/one-thing-per-year.spec.js
```

### Minute steps
1. Join still requires network + name.  
2. Friends list under `itt04-thefacebook` is visible gold.  
3. Poke may stay a toy. Facemash = footnote.  
4. Not open Facebook · not News Feed / Like / Timeline.

### Acceptance
- [ ] Friend persists on reload  
- [ ] Isolation vs `itt03-*` / `itt05-*`  

---

# Phase S10 — 2000 MapQuest costume **[ ]**

### Goal
Print page looks like 2000 directions (tables, blue links), not a museum form.

### Files
```
years/2000/sites/mapquest/
js/immersion/mapquest.js
e2e/2000-mapquest-real.spec.js
```

### Minute steps
1. Harvest WA 2000 / WDM — no invented logo.  
2. From/To still required. Print writes only after a trip.  
3. Failed-final README if no still.

### Anti-patterns
Google Maps slippy (2005) · iTunes Store · Spotify.

---

# Phase S11 — Audit 1999 **[ ]**

### Goal
Written A / A− / B+ with evidence. **No implement until user says `audit 1999` then implement.**

### Minute steps
1. Read `1999-MUSEUM-GRADE.md` · AIM rooms · `e2e/1999-aim-real.spec.js`.  
2. Compare AIM chrome to 1997 ICQ.  
3. One paragraph in the gap map 1999 section.  
4. If AIM = ICQ-class → mark **A−** and stop.

### Anti-patterns
Rebuilding AIM as a new literacy card.

---

# Phase S12 — 2006–2010 archive chips **[~]**

### Goal
Home of each fat year has a 2014-style “continuity archive” chip. **No delete** unless the user asks for lean.

### Years
2006 · 2007 · 2008 · 2009 · 2010 (2011–13 should already be lean after S1–S3).

### Minute steps
1. Add `data-itt-continuity-archive` chip: year-true P0 named · Amazon/Yahoo may look earlier.  
2. Do not add clone rooms.

---

# Phase S13 — Docs honesty **[x]**

### Goal
No living doc claims 2013 is unbuilt, 2014 still has a 432 forest, or hub stops at 2005.

### Files
```
docs/DISK-TRUTH.md                 # 2013 MVP vs L3
docs/MUSEUM-GRADE-GAP-MAP-1994-2016.md  # “wrong chip” 06/07 / 2014 forest class
docs/NON-DONE.md                   # N24
docs/TO-100-PERCENT/PLAN-2011-2012-2013-TO-100.md  # N25
docs/MUSEUM-READY-BAR-1994-2012.md # N26 rename honesty
docs/INCOMPLETE-YEARS-RESEARCH.md  # stale 2003 absent
docs/PROJECT-INVENTORY.md · LEFT-OUT.md · LEFT-TO-DO
```

### Minute steps
1. DISK-TRUTH 2013: **Museum-ready L3** (or keep MVP only if you refuse S1).  
2. Gap map class table: remove 2014 from “forest drowns”; 2006/2007 chips already Twitter / iPhone.  
3. Banner on INCOMPLETE-YEARS: “historical — trust DISK-TRUTH.”  
4. Do not rewrite every research MD.

### Acceptance
- [ ] DISK-TRUTH · this file · gap map agree on 2011–16  

---

# Phase S14 — Architecture **[~]**

| ID | Work | Blocks visitors? |
|----|------|:----------------:|
| N20 | Split `js/browser/create.js` | No |
| N21 | Period CSS `@import` + deltas | No |
| N22 | `scripts/new-year.py` | No |
| N23 | `document.write` loader | No |

Do **after** S1–S5 if ever.

---

# Phase S15 — L4 pixels **[~]**

Never start here. Never invent.

| Band | What |
|------|------|
| 1994–2001 | evolt / GUIdebook OEM toolbars |
| 2008–2016 | WA logo cliff (16 → 4 files) |
| All | Failed-final rows stay failed-final |

---

# Phase S16 — 2017+ **[x] rule**

**Not a gap. Do not scaffold.**

If someone later says **implement 2017**: new lean year, 2015/2016 pattern, freeze first. Thesis class: Face ID · Fortnite free · WannaCry · 280. **Not this file.**

---

## 5. Storage prefixes (never break)

`itt94` … `itt16` only. Isolation test vs neighbor years after every phase.

| Year | One-thing key (do not rename casually) |
|------|----------------------------------------|
| 1994 | `itt94-csotd` |
| 1995 | `itt95-ssl-checkout` |
| 1996 | `itt96-portal-wars` |
| 1997 | `itt97-pointcast` |
| 2002 | `itt02-stumble` (gate may tighten in S4) |
| 2009 | `itt09-stackoverflow` until S5 moves it |
| 2013 | `itt13-vine-posts` |
| 2014 | `itt14-wa-install` |
| 2015 | `itt15-watch` |
| 2016 | `itt16-ig-stories` |

---

## 6. Tests cheat sheet

```bash
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py

# After any lean year YYYY
npx playwright test e2e/YYYY-*.spec.js e2e/one-thing-per-year.spec.js -g "YYYY" --workers=1
test ! -d years/YYYY/sites/amazon

# After S4 / S5
npx playwright test e2e/2002-stumble-real.spec.js e2e/2009-real-flows.spec.js \
  e2e/one-thing-per-year.spec.js --workers=1
```

---

## 7. Anti-patterns (whole program)

| Temptation | Why not |
|------------|---------|
| Perfect every logo | L4 |
| Reopen 1995/96/97/05/14 densify | Already A |
| Lean 2005 Amazon | Year-true, not a clone |
| Restore HEAD 2016 | 400-page forest |
| Scaffold 2017 to look complete | Wrong museum |
| Move 2016 chip off Stories | Wrong thesis |
| Soft-write on incomplete | Breaks REAL |
| Three forests in one PR | Unreviewable |

---

## 8. Visitor end-state

```
Hub 1994–2016 (23) · 2017+ locked
  1995–97 · 2005 · 2014     already A
  2013 · 2012 · 2011        lean · P0 first
  2002 Stumble habit        A−
  2009 Like or FarmVille    A−
  2003–04 · 2000 · 2010     optional second gold
  L4 pixels                 forever optional
```

---

*End. Must path **S0–S5 + S13 landed 2026-08-10** (2013/12/11 lean · Stumble 2+ · 2009 Like chip · docs). Prefer this file over LEFT-OUT / INCOMPLETE-YEARS / PROJECT-INVENTORY.*
