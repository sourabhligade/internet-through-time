# 2004 Residual Implementation — step-by-step

**Date:** 2026-07-30  
**Status:** **Implemented 2026-07-30**  
**Overview:** [`2004-RESIDUAL-IMPLEMENTATION-PHASES.md`](2004-RESIDUAL-IMPLEMENTATION-PHASES.md)  
**Artifacts map:** [`references/2004/ARTIFACTS-MAP.md`](references/2004/ARTIFACTS-MAP.md)  
**Audit:** [`2004-DEEP-RESEARCH-AUDIT-2026-07-30.md`](2004-DEEP-RESEARCH-AUDIT-2026-07-30.md)  
**Research freeze:** [`2004-RESEARCH-FREEZE-2026-07-30.md`](2004-RESEARCH-FREEZE-2026-07-30.md)

**Rule:** Finish one phase before the next unless *parallel-ok*. Check every `[ ]`. *(All required phases marked done after implement.)*

Every phase uses:

```
### Goal
### Source artifacts
### Steps
### Acceptance
### Tests
```

---

# 0. Before any phase

## Bible stack

| Doc | When | Use |
|-----|------|-----|
| **This file** | Always | Steps · exact edits |
| Overview phases | Always | Phase map · gates |
| ARTIFACTS-MAP | Before densify | Source → room |
| Audit §9.5 | Before densify | Period copy kits |
| Harvest HTML | During densify | `docs/references/harvest/found-assets/2004-m5/` |
| Gmail press extract | Gmail densify | `wayback-extracts/gmail-googlepress-20040401.txt` |
| CAPTURE / ASSETS | Pixels | Do not re-harvest P0 |
| Research freeze | Post-ship | Full MD corpus truth |
| Hard pattern | Phase 4 | `e2e/2003-flows` · `e2e/2004-real-flows` |

## What you build

```
Hub → 2004 (XP · IE 6)
  → Firefox 1.0 product (tabs · popups · download · NYT ad)
  → Gmail (invite · 1 GB · search · compose → inbox · itt04)
  → Flickr (upload → stream · tags · Ludicorp)
  → Thefacebook (Harvard · friends · networks · itt04)
  → Google IPO mood · Digg Dec seed · MySpace mass honesty
```

## What you do NOT do

| Forbidden | Why |
|-----------|-----|
| Rebuild year | Already live |
| YouTube / Maps / Reddit rooms | **2005** |
| Load digg.js (2005 seeds) | itt05 + Maps/YouTube digs |
| Yahoo owns Flickr as 2004 fact | Mar 2005 |
| Dual-load feature JS | Race |
| Invent brand pixels | CAPTURE closed |
| Git without ask | Policy |

## Legal
No real SMTP · photo binaries · accounts · installers. localStorage only. Never claim RECON is WA.

## Hard rules
1. `itt04` only  
2. P0 logos WA  
3. Period voice  
4. Shell XP + IE6  
5. MySpace mass · Thefacebook campus  
6. Keep `data-*` hooks · single boot script  
7. Soft + hard e2e stay green  

## Critical paths

```
years/2004/
  sites/gmail/{index,inbox,compose,invite,about}.html
  sites/flickr/{index,upload,explore,tags,groups,about}.html
  sites/facebook/{index,profile,friends,networks,invite,about}.html
  sites/firefox/{index,features,download,download-thanks,whatsnew,nyt-ad}.html
  sites/digg/{index,submit,about}.html
  sites/google/ipo.html · myspace · bloglines · web20conference

js/config/immersion-2004.js
js/immersion/{gmail,facebook,flickr}.js
docs/references/harvest/found-assets/2004-m5/
  gmail.html · flickr.html · facebook.html · firefox.html · digg.html
docs/references/2004/wayback-extracts/gmail-googlepress-20040401.txt

e2e/2004-mvp|buttons|live-flows.spec.js
e2e/2004-flows.spec.js
e2e/2004-real-flows.spec.js
```

## Storage keys

| Feature | Key |
|---------|-----|
| Gmail | `itt04-gmail` · `itt04-gmail-msgs` · `itt04-gmail-invites` |
| Flickr | `itt04-flickr-stream` |
| Thefacebook | `itt04-thefacebook` |
| Digg | `itt04-digg-subs` / digg list under itt04 |

## Hooks (must remain)

| Brand | Selectors |
|-------|-----------|
| Gmail | `data-gmail-login` · `data-gmail-list` · `data-gmail-compose` · `data-gmail-invite` · `data-gmail-search` · `data-gmail-q` · … |
| Flickr | `data-flickr-stream` · `data-flickr-upload` · `data-flickr-status` |
| Thefacebook | `data-fb-login` · `data-fb-friends` · `data-fb-add` · `data-fb-edit` · … |
| Digg | submit form · digg list / digg-up · digg-bury (if present) · **no digg.js** |

## Global gates

**Gate A**
```bash
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

**Gate B**
```bash
npx playwright test e2e/2004-mvp.spec.js e2e/2004-buttons.spec.js e2e/2004-live-flows.spec.js --workers=1
```

**Gate C**
```bash
npx playwright test e2e/2004-flows.spec.js e2e/2004-real-flows.spec.js --workers=1
```

**Gate D**
```bash
npx playwright test e2e/2004-*.spec.js e2e/hub-years.spec.js --workers=1
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

**Gate E**
```bash
grep -rniE 'museum theater|Museum:|value="museum"|theater only' \
  years/2004/sites/{gmail,flickr,facebook,firefox,digg} \
  js/immersion/{gmail,facebook,flickr}.js --include='*.html' --include='*.js' || true
```

**Gate F**
```bash
python3 - <<'PY'
from pathlib import Path
for t in [
  "years/2004/sites/gmail/index.html","years/2004/sites/gmail/inbox.html","years/2004/sites/gmail/about.html",
  "years/2004/sites/flickr/index.html","years/2004/sites/flickr/upload.html","years/2004/sites/flickr/about.html",
  "years/2004/sites/facebook/index.html","years/2004/sites/facebook/profile.html","years/2004/sites/facebook/about.html",
  "years/2004/sites/firefox/index.html","years/2004/sites/firefox/features.html","years/2004/sites/firefox/nyt-ad.html",
  "years/2004/sites/digg/index.html","years/2004/sites/google/ipo.html",
]:
  p=Path(t); n=p.stat().st_size if p.exists() else -1
  print(f"{n:5d} {'OK' if n>=1800 else ('MED' if n>=1200 else 'THIN')} {t}")
PY
```

## Phase index

| Phase | Name | Status |
|------:|------|--------|
| 0 | Baseline freeze | **Done** |
| 1 | Voice purge | **Done** |
| 2a–d | Densify Gmail · Flickr · FB · Firefox | **Done** |
| 3 | Continuity light | **Done** |
| 4 | Hard e2e | **Done** |
| 5 | Soft retune + gates | **Done** |
| 6 | Docs | **Done** |
| 7 | Optional forever | Skip |

---

# Phase 0 — Baseline freeze

### Goal
Confirm inventory; no content edits.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Audit | `docs/2004-DEEP-RESEARCH-AUDIT-2026-07-30.md` | Residual kits |
| Overview | `docs/2004-RESIDUAL-IMPLEMENTATION-PHASES.md` | Phase map |
| Harvest | `2004-m5/` | gmail/flickr/facebook/firefox/digg.html |
| WA logos | `assets/period/2004/{gmail,flickr,facebook,firefox,digg}/logo-wa.gif` | Pixel honesty |

### Steps
1. [x] `test -d years/2004/sites/gmail && ls e2e/2004-*.spec.js`  
2. [x] Gate A  
3. [x] `grep digg.js years/2004/sites/digg/*` → expect none  
4. [x] `file assets/period/2004/*/logo-wa.gif`  
5. [x] Skim audit §9.5  

### Acceptance
- [x] Gate A green · scope residual only · no digg.js · WA present  

### Tests
- Gate A  

---

# Phase 1 — Museum-voice purge

### Goal
Remove visitor-facing museum/theater framing from signature rooms + immersion status.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Replace tables | this section | Exact find → replace |
| Gate E | signature paths | Verify clean |

### Steps

#### 1.1 HTML (apply class)

| Brand | Find class | Replace class |
|-------|------------|---------------|
| Gmail | Museum theater · value="museum" · localStorage museum | Invite-only beta / empty password / this browser only |
| Flickr | museum fake counts · Museum theater upload | plain counts · no image file stored |
| Facebook | value="museum" · View profile theater · Status (museum) · Museum theater friends | empty password · View profile · Status · browser only |
| Firefox | museum does not ship · Museum honesty · museum strip | Released Nov 9 · Browser honesty · community ad |
| Digg | museum — local only · seed theater | Submitted / seed honesty without museum word |

#### 1.2 JS
| File | Find class | Replace |
|------|------------|---------|
| gmail.js | theater invites / museum status | period scarcity voice |
| facebook.js | museum save / theater friend | Profile saved / Added friend |
| flickr.js | theater upload | just uploaded / no image file |

#### 1.3 Soft e2e
Retune `/museum/i` status expectations if present.

### Acceptance
- [x] Gate E clean on P0  
- [x] Gate B green  

### Tests
- Gate E · Gate B  

---

# Phase 2a — Densify Gmail

### Goal
Period Gmail: invite · 1 GB · search mail · compose → inbox · itt04.

### Source artifacts

| Artifact | Path |
|----------|------|
| Extract | `wayback-extracts/gmail-googlepress-20040401.txt` |
| Harvest | `2004-m5/gmail.html` · `gmail2.html` |
| WA | `assets/period/2004/gmail/logo.gif` |
| Module | `js/immersion/gmail.js` |
| Pages | `years/2004/sites/gmail/*` |

### Extract-derived copy (required)
- A Google approach to email  
- **Search, don’t sort.**  
- Don’t throw anything away · **1000 MB / 1 GB**  
- Keep it all in context · conversations  
- No pop-up ads / no banners  
- Apr 1 invite-only beta  

### Steps
1. [x] index · about · invite · compose · inbox densify  
2. [x] Hooks: `data-gmail-*` intact  
3. [x] Only immersion-2004.js  
4. [x] ≥1800 B primary  

### Acceptance
- [x] 1 GB / Search don’t sort greppable · login/compose work  

### Tests
```bash
npx playwright test e2e/2004-live-flows.spec.js e2e/2004-real-flows.spec.js -g 'gmail' --workers=1
```

---

# Phase 2b — Densify Flickr

### Goal
Photostream · tags · Ludicorp · upload theater · Yahoo **2005 ban**.

### Source artifacts
Harvest `flickr.html` · logo-wa · `flickr.js` · pages  

### Extract-derived copy
- Share pictures in real time  
- Brought to you by **Ludicorp**  
- Register / Log In / tour  
- Tags · groups · photostream  

### Steps
1. [x] index · upload · explore · tags · groups · about  
2. [x] Yahoo ownership = **not** 2004 fact  
3. [x] `itt04-flickr-stream` works  

### Acceptance
- [x] Ludicorp · upload persists · no Yahoo-owns  

### Tests
- flickr live/real-flows  

---

# Phase 2c — Densify Thefacebook

### Goal
Harvard campus directory · friends graph · not open internet · not News Feed.

### Source artifacts
Harvest `facebook.html` · WA thefacebook · HISTORY · `facebook.js`  

### Extract-derived copy
- Online directory · colleges  
- Open at **Harvard**  
- Search people · classes · friends’ friends · network viz  
- a Mark Zuckerberg production  

### Steps
1. [x] index · profile · friends · networks · invite · about  
2. [x] `itt04-thefacebook` · data-fb-*  
3. [x] Contrast MySpace mass social  

### Acceptance
- [x] Harvard / campus / not open greppable · add friend works  

### Tests
- facebook real-flows  

---

# Phase 2d — Densify Firefox 1.0

### Goal
Nov 9 product · features · download theater · Dec 15 NYT ad · IE6 still default shell.

### Source artifacts
Mozilla press · harvest firefox.html · nyt-ad · milestones  

### Extract-derived copy
- Rediscover the web  
- Popup block · tabs · phishing · Live Bookmarks · IE import  
- **November 9, 2004**  
- **December 15, 2004** community NYT ad  

### Steps
1. [x] index · features · download · download-thanks · whatsnew · nyt-ad  
2. [x] No real installer binary  
3. [x] Dec 15 string (buttons e2e)  

### Acceptance
- [x] Nov 9 + Dec 15 present · soft tests green  

### Tests
```bash
npx playwright test e2e/2004-buttons.spec.js -g 'firefox|nyt' --workers=1
```

---

# Phase 2 close

### Goal
Gate F + Gate B after all densify.

### Source artifacts
Gate F targets · Gate B  

### Steps
1. [x] Gate F  
2. [x] Full Gate B  
3. [x] Fix links  

### Acceptance
- [x] Primary pages OK/MED · Gate B green  

### Tests
- Gate F · B  

---

# Phase 3 — Continuity light densify

### Goal
Tour-adjacent intentional rooms only.

### Source artifacts

| Room | Sources |
|------|---------|
| Digg | wiki Dec 5 · harvest digg.html |
| Google IPO | Aug 19 class |
| MySpace | Cybercultural 1M |
| Bloglines | Cybercultural / RWW |
| Web 2.0 Conf | Cybercultural conf essay |

### Steps

#### 3.1 Digg seed
- [x] Seed digs: Firefox · Gmail invites · Flickr tags · IPO — **never** YouTube/Maps  
- [x] Dec 5 2004 · seed vs 2005 rise  
- [x] **No** `digg.js` script tag  
- [x] itt04 storage  

#### 3.2 Google IPO
- [x] August 19, 2004 · auction narrative  

#### 3.3 MySpace
- [x] Mass king vs campus Thefacebook  

#### 3.4 Bloglines
- [x] Browser RSS · Google Reader = 2005 footnote  

#### 3.5 Web 2.0 Conference
- [x] Oct 2004 · Web as Platform  

### Acceptance
- [x] Digg Dec 5 · IPO Aug 19 · no 2005 dig headlines · Gate B  

### Tests
```bash
npx playwright test e2e/2004-buttons.spec.js -g 'digg|ipo' --workers=1
```

---

# Phase 4 — Hard e2e

### Goal
Prove signature flows with DOM + localStorage.

### Source artifacts
`e2e/2003-flows.spec.js` · `e2e/helpers.js` · create `2004-flows` · `2004-real-flows`  

### Steps

#### Required tests (implemented)
| # | Test |
|---|------|
| 1 | No registerLocal race on gmail/flickr/facebook/digg |
| 2 | Gmail login → compose → inbox + `itt04-gmail-msgs` |
| 3 | Gmail invite decrement `itt04-gmail-invites` |
| 4 | Flickr upload → stream + storage |
| 5 | Thefacebook login · add friend · storage |
| 6 | Digg digg +1 · bury −1 · submit (itt04 not itt05 peak seeds) |
| 7 | Shell paths via enterYear 2004 |
| 8 | Bans: no YouTube product default · no open FB |

### Acceptance
- [x] Gate C green · Gate B green  

### Tests
- Gate C · B  

---

# Phase 5 — Soft retune + full gates

### Goal
All 2004 e2e + authenticity + smoke green.

### Source artifacts
live-flows · mvp · buttons · hard suites  

### Steps
1. [x] Retune soft after voice  
2. [x] Gate D  
3. [x] Gate E + F  

### Acceptance
- [x] All `2004-*` green · auth 57/57 · smoke OK  

### Tests
- Gate D · E · F  

---

# Phase 6 — Docs close-out

### Goal
Docs match disk.

### Source artifacts
MUSEUM-GRADE · RESEARCH · residual plans · CAPTURE · ARTIFACTS-MAP · freeze  

### Steps
1. [x] Residual Implemented status  
2. [x] e2e list includes flows + real-flows  
3. [x] CAPTURE residual closed  
4. [x] Research freeze + ARTIFACTS-MAP  

### Acceptance
- [x] Docs match disk  

### Tests
- Doc review  

---

# Phase 7 — Optional forever

### Goal
Skip by default.

### Source artifacts
evolt IE pack · Tom RECON · wiki logo  

### Steps
1. [ ] Only if user asks  

### Acceptance
- N/A  

### Tests
- Gate A if assets change  

---

# Session runbook (historical — all done)

```text
[x] Phase 0  Gate A · digg.js absent · WA logos
[x] Phase 1  Voice purge · Gate E
[x] Phase 2a Gmail densify
[x] Phase 2b Flickr densify
[x] Phase 2c Thefacebook densify
[x] Phase 2d Firefox densify
[x] Phase 2  Gate F · B
[x] Phase 3  Digg seed · IPO · MySpace · Bloglines · Web2.0
[x] Phase 4  2004-flows + real-flows · Gate C
[x] Phase 5  Gate D
[x] Phase 6  Docs
[x] STOP — residual shipped
```

---

# Extract / harvest quote bank

### Gmail
> A Google approach to email · Search, don’t sort · Don’t throw anything away · 1000 MB · conversations · no pop-up ads · Apr 1 invite

### Flickr
> Share pictures in real time · Ludicorp · Register/Log In · tags/groups

### Thefacebook
> college directory · Harvard · friends’ friends · Mark Zuckerberg production · ©2004

### Firefox
> Rediscover the web · tabs · popup block · phishing · Live Bookmarks · Nov 9 · Dec 15 NYT

### Digg
> dig / bury · submit a story · Dec 5 2004 seed · categories technology

---

# Done when (ship bar — met)

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Voice clean | **Met** |
| 2 | Signature densified | **Met** |
| 3 | Continuity beats | **Met** |
| 4 | Hard + real flows green | **Met** |
| 5 | Full e2e + auth + smoke | **Met** |
| 6 | Docs updated | **Met** |
| 7 | Bans hold | **Met** |

---

**One-line:** Voice purge → densify Gmail/Flickr/Thefacebook/Firefox from harvest+press → Digg seed + continuity → hard real-flow e2e (itt04) — **implemented 2026-07-30**.

*Educational reconstruction only.*
