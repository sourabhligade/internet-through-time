# 2004 — Implementation phases from research (complete bible)

**Date:** 2026-07-30  
**Purpose:** Ordered **phase plan** with **goals · sources · crucial steps · acceptance · tests** — derived from the full research gather.  
**Research bible (all facts/copy):** [`2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md)  
**Pass log:** [`2004-SOURCE-VISIT-RESEARCH-2026-07-30.md`](2004-SOURCE-VISIT-RESEARCH-2026-07-30.md)  
**Thesis / bans:** [`2004-RESEARCH.md`](2004-RESEARCH.md)  
**Artifacts:** [`references/2004/ARTIFACTS-MAP.md`](references/2004/ARTIFACTS-MAP.md)

**Status legend**

| Mark | Meaning |
|------|---------|
| **[x]** | Done on disk (2026-07-30) |
| **[ ]** | Open / optional / re-verify |
| **[~]** | Partial or forever-optional |

**Rule:** Finish one phase before the next unless marked *parallel-ok*. Check boxes as you go.  
**Do not** rebuild `years/2004/` from scratch. **Do not** invent brand pixels. Git only on user request.

---

## 0. How to use this file

Every phase has the same shape:

```
### Goal              — what “done” means
### Why (research)    — 1–3 lines from gathered research
### Source artifacts  — exact MD / harvest / URL / files to open first
### Crucial steps     — ordered checklist (do not skip)
### Files             — paths you will touch
### Acceptance        — pass/fail before next phase
### Tests             — commands / gates
### Anti-patterns     — what NOT to do
```

### Bible stack (read before Phase 0)

| Priority | Doc | Use |
|----------|-----|-----|
| 1 | **This file** | Phase order · steps · acceptance |
| 2 | [`2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md) | Facts · copy kits · timeline · bans |
| 3 | Harvest `docs/references/harvest/found-assets/2004-m5/` | Primary HTML + logos |
| 4 | Gmail press `…/wayback-extracts/gmail-googlepress-20040401.txt` | Official Gmail framing |
| 5 | CAPTURE / ASSETS `docs/references/2004/` | Pixel honesty |
| 6 | Immersion modules `js/immersion/{gmail,facebook,flickr,digg,google}.js` | Hooks · storage |
| 7 | e2e `e2e/2004-*.spec.js` | Soft + hard gates |

### What you build (visitor outcome)

```
Hub → 2004 (Windows XP · Internet Explorer 6)
  → About / Home thesis (~51.6M sites · Web 2.0 hinge)
  → Firefox 1.0 (Nov 9 · tabs · popups · Dec 15 NYT ad · download theater)
  → Gmail (Apr 1 · invite · 1 GB · search don’t sort · compose → inbox · itt04)
  → Flickr (Feb 10 · Ludicorp · tags · upload → stream · Yahoo 2005 ban)
  → Thefacebook (Feb 4 · Harvard campus · friends · networks · not open web)
  → Google (search · IPO Aug 19)
  → Digg seed (Dec 5 · dig/bury · submit · no 2005 Maps/YT seeds)
  → MySpace mass honesty · Bloglines · Web 2.0 Conf · del.icio.us / FeedBurner
```

### Hard rules (every phase)

1. **`storagePrefix = itt04` only** (Digg 2004 → `itt04-digg-links`, not `itt05`).  
2. **Single boot:** content pages load only `js/immersion-2004.js` (no dual-load of feature modules).  
3. **Keep every `data-*` hook** when densifying HTML.  
4. **Period voice** — no “Museum theater” lead copy on product rooms.  
5. **Never invent brand pixels** — WA closed for P0; log `[failed]` / keep RECON.  
6. **Shell = XP + IE6**; Firefox is a **product room**, not the default browser chrome.  
7. **MySpace = mass social**; Thefacebook = **campus** only.  
8. **Bans:** YouTube · Twitter · open Facebook · News Feed · Chrome · Yahoo-owns-Flickr · Google Reader · Ajax product name · Digg peak.  
9. **Gates green** before declaring phase done.  
10. **Git only if user asks.**

### Global gates

**Gate A — Static**
```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
```

**Gate B — Soft e2e**
```bash
npx playwright test e2e/2004-mvp.spec.js e2e/2004-buttons.spec.js e2e/2004-live-flows.spec.js --workers=1
```

**Gate C — Hard e2e**
```bash
npx playwright test e2e/2004-flows.spec.js e2e/2004-real-flows.spec.js --workers=1
```

**Gate D — Full close**
```bash
npx playwright test e2e/2004-*.spec.js e2e/hub-years.spec.js --workers=1
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

**Gate E — Voice purge**
```bash
grep -rniE 'museum theater|Museum:|value="museum"|theater only' \
  years/2004/sites/{gmail,flickr,facebook,firefox,digg} \
  js/immersion/{gmail,facebook,flickr}.js --include='*.html' --include='*.js' || true
# Expect: empty (or only legitimate “Web Design Museum” name)
```

**Gate F — Size smoke (signature pages ≥ ~1800 B)**
```bash
python3 - <<'PY'
from pathlib import Path
for t in [
  "years/2004/sites/gmail/index.html","years/2004/sites/gmail/inbox.html","years/2004/sites/gmail/about.html",
  "years/2004/sites/gmail/invite.html","years/2004/sites/gmail/compose.html",
  "years/2004/sites/flickr/index.html","years/2004/sites/flickr/upload.html","years/2004/sites/flickr/about.html",
  "years/2004/sites/flickr/tags.html","years/2004/sites/flickr/groups.html","years/2004/sites/flickr/explore.html",
  "years/2004/sites/facebook/index.html","years/2004/sites/facebook/profile.html","years/2004/sites/facebook/about.html",
  "years/2004/sites/facebook/friends.html","years/2004/sites/facebook/networks.html","years/2004/sites/facebook/invite.html",
  "years/2004/sites/firefox/index.html","years/2004/sites/firefox/features.html","years/2004/sites/firefox/nyt-ad.html",
  "years/2004/sites/firefox/download.html","years/2004/sites/firefox/download-thanks.html","years/2004/sites/firefox/whatsnew.html",
  "years/2004/sites/digg/index.html","years/2004/sites/digg/about.html","years/2004/sites/digg/submit.html",
  "years/2004/sites/google/index.html","years/2004/sites/google/about.html","years/2004/sites/google/search.html","years/2004/sites/google/ipo.html",
]:
  p=Path(t); n=p.stat().st_size if p.exists() else -1
  print(f"{n:5d} {'OK' if n>=1800 else ('MED' if n>=1200 else 'THIN')} {t}")
PY
```

### Critical paths

```
years/2004/
  index.html                          # XP + IE6 shell
  pages/{home,about,cool,whats-new}.html
  sites/gmail/{index,inbox,compose,invite,about}.html
  sites/flickr/{index,upload,explore,tags,groups,about}.html
  sites/facebook/{index,profile,friends,networks,invite,about}.html
  sites/firefox/{index,features,download,download-thanks,whatsnew,nyt-ad}.html
  sites/digg/{index,submit,about}.html
  sites/google/{index,search,about,ipo}.html
  sites/myspace/ · bloglines/ · web20conference/ · delicious/ · feedburner/

js/config/2004.js
js/config/immersion-2004.js           # storagePrefix itt04 · tour · nav · footer About 2004
js/browser-2004.js
js/immersion-2004.js                  # thin boot only
js/immersion/{gmail,facebook,flickr,digg,google,myspace,bloglines,...}.js
js/immersion/registry.js              # 2004 feature list

assets/period/2004/{gmail,flickr,facebook,firefox,digg,google,xp,chrome}/
css/period-2004.css

docs/references/harvest/found-assets/2004-m5/
docs/references/2004/{CAPTURE-LOG,ASSETS,ARTIFACTS-MAP}.md
docs/2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md

e2e/2004-mvp.spec.js
e2e/2004-buttons.spec.js
e2e/2004-live-flows.spec.js
e2e/2004-flows.spec.js
e2e/2004-real-flows.spec.js
```

### Storage keys

| Feature | Key(s) |
|---------|--------|
| Gmail | `itt04-gmail` · `itt04-gmail-msgs` · `itt04-gmail-invites` |
| Flickr | `itt04-flickr-stream` |
| Thefacebook | `itt04-thefacebook` |
| Digg 2004 | `itt04-digg-links` |

### Hooks (must remain)

| Brand | Selectors |
|-------|-----------|
| Gmail | `data-gmail-login` · `data-gmail-list` · `data-gmail-compose` · `data-gmail-invite` · `data-gmail-search` · `data-gmail-invites` · `data-gmail-status` · … |
| Flickr | `data-flickr-stream` · `data-flickr-upload` · `data-flickr-status` |
| Thefacebook | `data-fb-login` · `data-fb-friends` · `data-fb-add` · `data-fb-invite` · `data-fb-edit` · … |
| Digg | `data-digg-list` · `data-digg-submit` · `data-digg-up` · `data-digg-bury` · `data-itt-year="2004"` on digg pages |
| Google | `data-google-search` · `data-google-results` · `data-google-lucky` |
| Firefox download | `data-itt-download="firefox-1.0"` (if used by e2e) |

---

## Phase map

| Phase | Name | Est. | Status | Blocks |
|------:|------|------|--------|--------|
| **R** | Research freeze & gather | — | **[x]** | Everything |
| **0** | Baseline inventory | S | **[x]** | Safe edits |
| **1** | Museum-voice purge | S | **[x]** | Product voice |
| **2a** | Densify Gmail | M | **[x]** | Signature P0 |
| **2b** | Densify Flickr | M | **[x]** *parallel-ok with 2a* | Signature P0 |
| **2c** | Densify Thefacebook | M | **[x]** *parallel-ok* | Signature P0 |
| **2d** | Densify Firefox 1.0 | M | **[x]** *parallel-ok* | Signature P0 |
| **3** | Digg seed densify | M | **[x]** | P1 honesty |
| **4** | Google IPO + search densify | M | **[x]** | Continuity |
| **5** | Continuity rooms light | M | **[x]** / **[~]** | Year feel |
| **6** | Home / About thesis | S–M | **[x]** | Labels |
| **7** | Immersion modules audit | S–M | **[x]** | Live flows |
| **8** | Hard e2e | M | **[x]** | Confidence |
| **9** | Soft e2e + full gates | S–M | **[x]** | Ship |
| **10** | Docs honesty | S | **[x]** | Honesty |
| **11** | Optional forever pixels | L | **[~]** skip | Absolute pixels |
| **12** | Optional long-tail densify | L | **[~]** skip | Tour-only |

**Recommended order:** R → 0 → 1 → (2a–2d *parallel-ok*) → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → (11–12 optional).

---

# Phase R — Research freeze & gather

### Goal
All primary sources visited; facts and copy kits frozen in a single research MD. No product HTML required yet.

### Why (research)
You cannot densify from memory. Cybercultural · Live Stats · Mozilla · PBS · WDM · harvest HTML are the only legitimate copy sources.

### Source artifacts

| Artifact | Path / URL |
|----------|------------|
| Gathered research (output) | `docs/2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md` |
| Cybercultural 2004 | https://cybercultural.com/p/internet-2004/ |
| Web 2.0 Conf essay | https://cybercultural.com/p/003-the-first-web-20-conference-2004/ |
| Live Stats | https://www.internetlivestats.com/total-number-of-websites/ |
| Mozilla milestones | https://blog.mozilla.org/en/firefox/firefox-milestones/ |
| PBS Gmail | https://www.pbs.org/newshour/nation/20-years-ago-people-thought-googles-gmail-launch-was-an-april-fools-day-joke |
| WDM Flickr | https://www.webdesignmuseum.org/gallery/flickr-2004 |
| Harvest | `docs/references/harvest/found-assets/2004-m5/*` |
| Gmail press | `docs/references/2004/wayback-extracts/gmail-googlepress-20040401.txt` |

### Crucial steps

1. [x] Read internal MD stack (`2004-RESEARCH`, DEEP, WEB-SURF, freeze, ARTIFACTS-MAP).  
2. [x] Visit every URL in research §1; record HTTP status + 5–15 takeaways each.  
3. [x] Read every harvest HTML (gmail, flickr, facebook, firefox, digg) + press extract.  
4. [x] Confirm scale numbers: **51,611,646** sites · **910,060,180** users.  
5. [x] Freeze bans (research §13).  
6. [x] Write copy kits per brand (research §14).  
7. [x] Write/update `2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`.  
8. [x] Write this phases file.

### Acceptance
- [x] Research MD exists with timeline · bans · copy kits · source→room wire  
- [x] No inventing product facts not in sources  

### Tests
- Manual: open research MD · every external URL listed was visited or harvest-backed  

### Anti-patterns
- Starting HTML densify before copy kits exist  
- Using modern Facebook/Gmail marketing as 2004 voice  

---

# Phase 0 — Baseline inventory freeze

### Goal
Confirm disk inventory, WA logos, hooks, and e2e list. **No content densify edits.** Scope residual only.

### Why (research)
2004 is already scaffolded (246 HTML · 66 rooms). Work is densify + honesty, not `cp years/2003`.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Year tree | `years/2004/` | HTML · rooms |
| Assets | `assets/period/2004/` | logo-wa · chrome · xp |
| Config | `js/config/{2004,immersion-2004}.js` | urlMap · `itt04` |
| e2e | `e2e/2004-*.spec.js` | Soft + hard suites |
| CAPTURE | `docs/references/2004/CAPTURE-LOG.md` | WA closed rows |

### Crucial steps

1. [x] Count HTML / rooms:
   ```bash
   find years/2004 -name '*.html' | wc -l
   find years/2004/sites -mindepth 1 -maxdepth 1 -type d | wc -l
   ```
2. [x] Confirm hub unlocks 2004 (`index.html` year card Available).  
3. [x] `file assets/period/2004/{gmail,flickr,facebook,firefox,digg}/logo-wa.gif` → real GIF/JPEG.  
4. [x] Confirm `storagePrefix: "itt04"` in `js/config/immersion-2004.js`.  
5. [x] Confirm digg pages have `data-itt-year="2004"` and load only `immersion-2004.js`.  
6. [x] Confirm no dual-load of feature scripts after boot:
   ```bash
   grep -rn 'immersion/.*\.js' years/2004/sites/{gmail,flickr,facebook,firefox,digg,google} --include='*.html' || true
   ```
7. [x] Run Gate A baseline.  
8. [x] List MED pages (`Gate F`) — know densify targets before Phase 2.

### Files
- Docs only if inventory note needed: CAPTURE / this file  

### Acceptance
- [x] Tree live · WA P0 present · `itt04` · Gate A green · dual-load 0 on P0  

### Tests
- Gate A  

### Anti-patterns
- Rebuilding year from 2003  
- Re-harvesting closed P0 WA logos  

---

# Phase 1 — Museum-voice purge

### Goal
Signature rooms speak like period products. Remove “Museum theater” / `value="museum"` / fake password museum defaults.

### Why (research)
PBS/Google/Mozilla/WDM product voice is real. “Museum theater” destroys immersion.

### Source artifacts

| Artifact | Path |
|----------|------|
| Signature HTML | `years/2004/sites/{gmail,flickr,facebook,firefox,digg}/**` |
| Immersion JS | `js/immersion/{gmail,facebook,flickr}.js` |
| Soft e2e | `e2e/2004-live-flows.spec.js` |

### Crucial steps

1. [x] Grep signature paths for `museum theater|Museum:|value="museum"|theater only`.  
2. [x] Replace HTML with product grammar (invite-only beta · this browser only · Released Nov 9…).  
3. [x] Replace JS status strings (Profile saved · Added friend · uploaded — not “museum”).  
4. [x] Empty password defaults that said `museum`.  
5. [x] Gate E clean.  
6. [x] Retune soft e2e if tests required `/museum/i`.  

### Files
- `years/2004/sites/gmail/*` · `flickr/*` · `facebook/*` · `firefox/*` · `digg/*`  
- `js/immersion/gmail.js` · `facebook.js` · `flickr.js`  
- Optionally soft e2e specs  

### Acceptance
- [x] Gate E clean on P0  
- [x] Gate B green  

### Tests
- Gate E · Gate B  

### Anti-patterns
- Leaving honesty footnotes as the *lead* sentence  
- Stripping legal/localStorage honesty that e2e needs  

---

# Phase 2a — Densify Gmail

### Goal
Gmail rooms feel like Apr 1 2004 invite beta: **Search, don’t sort** · **1 GB** · conversations · invite scarcity · compose → inbox with `itt04`.

### Why (research)
Press extract + harvest `gmail.html` + PBS: three S’s, April Fools disbelief, ~10k capacity, eBay invite lore, open signup **2007**.

### Source artifacts

| Artifact | Path | Copy you lift |
|----------|------|---------------|
| Press extract | `wayback-extracts/gmail-googlepress-20040401.txt` | Search don’t sort · 1000 MB · conversations |
| Harvest | `2004-m5/gmail.html` | “A Google approach to email” · no pop-up ads |
| PBS notes | research §5.3 | three S’s · invite social currency |
| Module | `js/immersion/gmail.js` | hooks · keys |
| Logo | `assets/period/2004/gmail/logo.gif` | WA promoted |

### Required period strings (must appear greppable on primary pages)

```
A Google approach to email
Search, don’t sort
1000 megabytes / 1 gigabyte / 1 GB
conversation
April 1, 2004
invite
No pop-up ads
```

### Crucial steps

1. [x] Open press extract + harvest; list bullets before editing.  
2. [x] Densify **index.html** (login box · Apr 1 · feature list · invite-only).  
3. [x] Densify **about.html** (three S’s · never file/delete · preview capacity honesty).  
4. [x] Densify **invite.html** (scarcity · social currency · eBay lore careful · `data-gmail-invite` · `data-gmail-invites`).  
5. [x] Densify **compose.html** (conversation-aware · compose form · `data-gmail-compose`).  
6. [x] Densify **inbox.html** (list hook · search hooks if present · labels).  
7. [x] Keep **all** `data-gmail-*` attributes and **only** boot `immersion-2004.js`.  
8. [x] Logo `src` points at period/2004 gmail logo.  
9. [x] Ban: do **not** say open signup is available; do **not** brand “Ajax” as 2004 product name.  
10. [x] Gate F: all 5 gmail pages ≥1800 B (or primary three OK + secondary OK after densify).  

### Files
```
years/2004/sites/gmail/index.html
years/2004/sites/gmail/inbox.html
years/2004/sites/gmail/compose.html
years/2004/sites/gmail/invite.html
years/2004/sites/gmail/about.html
js/immersion/gmail.js   # only if status strings need voice fix
```

### Acceptance
- [x] Greppable 1 GB + Search don’t sort + Apr 1  
- [x] Login · compose · invite flows work (`itt04-gmail*`)  
- [x] No dual-load · Gate F OK  

### Tests
```bash
npx playwright test e2e/2004-live-flows.spec.js e2e/2004-real-flows.spec.js e2e/2004-flows.spec.js -g 'gmail|Gmail' --workers=1
```

### Anti-patterns
- Modern Material Gmail UI  
- Claiming unlimited storage  
- Open registration as 2004 fact  

---

# Phase 2b — Densify Flickr  (*parallel-ok with 2a*)

### Goal
Photostream · upload · tags · groups · explore feel like Ludicorp beta: **Share pictures in real time** · folksonomy · **Yahoo buy = 2005 ban**.

### Why (research)
Harvest `flickr.html` + WDM + Cybercultural year-end buzz. Tags land through 2004; Yahoo acquisition March 2005.

### Source artifacts

| Artifact | Path | Copy you lift |
|----------|------|---------------|
| Harvest | `2004-m5/flickr.html` | Share pictures in real time · Ludicorp footer |
| WDM | research §6.2 | Web 2.0 UGC · tagging pioneer |
| Cybercultural | research §3.7 | most buzz social software app |
| Module | `js/immersion/flickr.js` | stream · upload |
| Logo | `assets/period/2004/flickr/logo.gif` | beta 106×35 |

### Required period strings

```
Share pictures in real time
Ludicorp
February 10, 2004  (or Feb 10)
tags / folksonomy
photostream
Yahoo … 2005   (ban as ownership fact)
```

### Crucial steps

1. [x] Read harvest homepage structure (nav Register/Log In · H1 · tour · Ludicorp).  
2. [x] Densify **index.html** (stream hook · launch date · Ludicorp · Yahoo ban).  
3. [x] Densify **upload.html** (`data-flickr-upload` · tags field · stream re-render).  
4. [x] Densify **tags.html** (folksonomy · sample tags · del.icio.us kinship optional).  
5. [x] Densify **groups.html** (sample groups · social software framing).  
6. [x] Densify **explore.html** (interestingness / public · WDM honesty).  
7. [x] Densify **about.html** if thin.  
8. [x] Never claim Yahoo owns Flickr in 2004.  
9. [x] Gate F OK on all 6 pages.  

### Files
```
years/2004/sites/flickr/{index,upload,explore,tags,groups,about}.html
js/immersion/flickr.js
```

### Acceptance
- [x] Ludicorp greppable · upload persists to `itt04-flickr-stream` · no Yahoo-owns  

### Tests
```bash
npx playwright test e2e/2004-*.spec.js -g 'flickr|Flickr' --workers=1
```

### Anti-patterns
- Instagram-era UI language  
- Yahoo ownership as 2004 fact  
- Inventing non-harvest logo pixels  

---

# Phase 2c — Densify Thefacebook  (*parallel-ok*)

### Goal
Campus directory product: Harvard first · friends’ friends · networks · invites · **not** open web · MySpace still mass.

### Why (research)
Harvest thefacebook.com WA text + HISTORY Feb 4 + Cybercultural MySpace 1M contrast.

### Source artifacts

| Artifact | Path | Copy you lift |
|----------|------|---------------|
| Harvest | `2004-m5/facebook.html` | college directory · Harvard · four bullets · Zuckerberg production |
| Research §7 | DETAILED research | bans · networks table |
| Module | `js/immersion/facebook.js` | `itt04-thefacebook` |
| Logo | `assets/period/2004/facebook/logo.gif` | WA |

### Required period strings

```
Thefacebook
online directory
social networks at colleges
Harvard
friends' friends  (or friends’ friends)
February 4, 2004  (or Feb 4)
Mark Zuckerberg production
```

### Crucial steps

1. [x] Densify **index.html** (login form · campus note · MySpace contrast link).  
2. [x] Densify **profile.html** (edit hooks if present).  
3. [x] Densify **friends.html** (`data-fb-friends` · `data-fb-add` · four product bullets).  
4. [x] Densify **networks.html** (Harvard open · other colleges rolling · high school/open web **not yet**).  
5. [x] Densify **invite.html** (`data-fb-invite` · .edu vibe).  
6. [x] Densify **about.html**.  
7. [x] Brand always **Thefacebook**, not modern Facebook News Feed product.  
8. [x] Gate F OK on all 6 pages.  

### Files
```
years/2004/sites/facebook/{index,profile,friends,networks,invite,about}.html
js/immersion/facebook.js
```

### Acceptance
- [x] Harvard · campus gate · friends list works · no News Feed / open registration  

### Tests
```bash
npx playwright test e2e/2004-*.spec.js -g 'facebook|Thefacebook|fb' --workers=1
```

### Anti-patterns
- Modern blue FB chrome as 2004 default  
- Claiming “everyone can join”  
- Open internet registration  

---

# Phase 2d — Densify Firefox 1.0  (*parallel-ok*)

### Goal
Product room: **Nov 9 2004** · tabs · popup block · phishing · Free Download theater · **Dec 15 NYT** community ad · IE6 still mass default honesty.

### Why (research)
Mozilla milestones + harvest `firefox.html` (“Rediscover the web” · ~4.5 MB Win · import Favorites).

### Source artifacts

| Artifact | Path | Copy you lift |
|----------|------|---------------|
| Mozilla milestones | research §8.2 | Nov 9 · Dec 15 · features |
| Harvest | `2004-m5/firefox.html` | Rediscover the web · Free Download · sizes |
| Logo | `assets/period/2004/firefox/logo.gif` | WA wordmark |

### Required period strings

```
Firefox 1.0
November 9, 2004
Rediscover the web  (or browser, reloaded)
tabbed browsing / tabs
popup
phishing  (or fraud)
December 15  (NYT ad page)
Internet Explorer 6  (honesty — mass default)
```

### Crucial steps

1. [x] Densify **index.html** (hero · feature list · honesty strip).  
2. [x] Densify **features.html**.  
3. [x] Densify **download.html** (`data-itt-download` if used · sizes · no real binary).  
4. [x] Densify **download-thanks.html** (install ritual steps).  
5. [x] Densify **whatsnew.html** (Phoenix/Firebird lineage note · 1.0 everyday pitch).  
6. [x] Densify **nyt-ad.html** (community-funded two-page · reconstruction honesty).  
7. [x] Ensure script boot present on nyt-ad if missing.  
8. [x] Gate F OK on all 6 pages.  

### Files
```
years/2004/sites/firefox/{index,features,download,download-thanks,whatsnew,nyt-ad}.html
```

### Acceptance
- [x] Nov 9 + tabs + popup greppable · download → thanks path · IE6 honesty  

### Tests
```bash
npx playwright test e2e/2004-*.spec.js -g 'firefox|Firefox' --workers=1
```

### Anti-patterns
- Making Firefox the year **shell** browser  
- Shipping real installer binaries  
- Claiming IE is already dead in 2004  

---

# Phase 3 — Digg seed densify

### Goal
Dec 5 2004 seed: dig/bury · submit · period headlines · **`itt04-digg-links`** · never 2005 Maps/YouTube seeds.

### Why (research)
Harvest digg.html shows submit culture + Dec tech/hardware/software headlines (Firefox 10M, AIM, Yahoo domains). Rise year is 2005.

### Source artifacts

| Artifact | Path | Copy you lift |
|----------|------|---------------|
| Harvest | `2004-m5/digg.html` | submit a story · digs format · sample headlines |
| Module | `js/immersion/digg.js` | year-aware seeds · storage key |
| Logo | `assets/period/2004/digg/logo.gif` | vertical mark |

### Crucial steps

1. [x] Confirm digg pages set `data-itt-year="2004"`.  
2. [x] Densify **index.html** (list hook · Dec 5 honesty · seed vs peak).  
3. [x] Densify **submit.html** (`data-digg-submit` · mine list · popular list).  
4. [x] Densify **about.html** (founders class · seed honesty).  
5. [x] Update `defaultSeed()` for year 2004 with harvest-mood titles (Firefox · Gmail · Flickr · IPO · AIM · Yahoo domains).  
6. [x] Confirm 2005 seeds (Maps/YouTube) only when year ≠ 2004.  
7. [x] Gate F OK on 3 digg pages.  

### Files
```
years/2004/sites/digg/{index,submit,about}.html
js/immersion/digg.js
```

### Acceptance
- [x] Digg/bury/submit mutate `itt04-digg-links`  
- [x] No YouTube/Maps in 2004 seed list  

### Tests
```bash
npx playwright test e2e/2004-real-flows.spec.js e2e/2004-flows.spec.js -g 'digg|Digg' --workers=1
```

### Anti-patterns
- Loading digg as 2005 peak culture  
- Dual-loading digg.js after boot  
- 2005 seed titles on 2004  

---

# Phase 4 — Google IPO + search densify

### Goal
Sparse Google home · results theater · **Aug 19 IPO** mood · year-correct about · single boot only.

### Why (research)
Cybercultural: IPO + year-end Google vs Microsoft desktop. Bans: Maps/Reader/YouTube/Chrome not 2004 defaults.

### Source artifacts

| Artifact | Path |
|----------|------|
| Research §10 | DETAILED research |
| Pages | `years/2004/sites/google/*` |
| Module | `js/immersion/google.js` (via registry) |

### Crucial steps

1. [x] Densify **index.html** (IPO strip · Gmail link · Web 2.0 conf link · **remove dual-load** of google.js/config if present).  
2. [x] Densify **about.html** (IPO · Gmail · bans “not yet”).  
3. [x] Densify **search.html** (results hooks · ©2004 not wrong year).  
4. [x] Confirm **ipo.html** has Aug 19 auction narrative.  
5. [x] Only `immersion-2004.js` at bottom of each page.  
6. [x] Gate F OK.  

### Files
```
years/2004/sites/google/{index,about,search,ipo}.html
```

### Acceptance
- [x] Aug 19 greppable · dual-load 0 · search hooks work  

### Tests
```bash
npx playwright test e2e/2004-*.spec.js -g 'google|Google|IPO|ipo' --workers=1
```

### Anti-patterns
- Dual-loading `immersion/google.js`  
- Chrome browser product room  
- Claiming Maps is 2004 default  

---

# Phase 5 — Continuity rooms light

### Goal
MySpace mass honesty · Bloglines web-app love · Web 2.0 Conference culture · del.icio.us / FeedBurner P2 — enough density for tour without full rebuild.

### Why (research)
Cybercultural: MySpace 1M · Bloglines · conf · del.icio.us tags · FeedBurner RSS stats.

### Source artifacts

| Room | Source | Key honesty |
|------|--------|-------------|
| myspace | research §3.3 · §11 | mass king vs campus FB |
| bloglines | research §3.4 | browser RSS before Reader |
| web20conference | research §4 | Oct · Web as Platform · business audience |
| delicious | research §3.7 | tags / folksonomy |
| feedburner | research §3.7 | RSS stats |

### Crucial steps

1. [x] MySpace home/about: mid-year ~1M · still most popular · link contrast to Thefacebook.  
2. [x] Bloglines: browser-based RSS · no install · any computer · **not** Google Reader.  
3. [x] Web 2.0 Conf: Oct 2004 · O’Reilly · Web as Platform · investors/business.  
4. [x] del.icio.us + FeedBurner culture pages present (P2).  
5. [x] Densify tour-adjacent thin rooms (MySpace invite/profile · Bloglines reader · Web2.0 about · del.icio.us · FeedBurner · LinkedIn).  
6. [x] Purge dual-load of feature modules (bloglines · linkedin · friendster · kazaa · adsense · googlenews).  
7. [x] Purge museum-voice on del.icio.us / FeedBurner.  

### Files
```
years/2004/sites/myspace/*
years/2004/sites/bloglines/*
years/2004/sites/web20conference/*
years/2004/sites/delicious/*
years/2004/sites/feedburner/*
years/2004/sites/linkedin/*
years/2004/sites/{friendster,kazaa,adsense,googlenews}/*  # dual-load only
```

### Acceptance
- [x] Tour-adjacent continuity rooms live · MySpace mass greppable  
- [x] Dual-load feature scripts = 0 under years/2004  
- [x] Continuity densify re-pass shipped 2026-07-30  

### Tests
```bash
npx playwright test e2e/2004-mvp.spec.js e2e/2004-buttons.spec.js --workers=1
```

### Anti-patterns
- Making Thefacebook larger than MySpace in 2004 copy  
- Google Reader as 2004 default  

---

# Phase 6 — Home / About thesis

### Goal
Starting Point + About 2004 state Live Stats + hinge thesis + tour spine.

### Why (research)
51,611,646 sites · 910,060,180 users · Web 2.0 hinge from Cybercultural.

### Crucial steps

1. [x] **pages/home.html**: XP/IE6 · ~51.6M · pillars (Firefox · Gmail · Flickr · Thefacebook · Google · MySpace).  
2. [x] **pages/about.html**: thesis paragraph · bans strip · scale numbers exact.  
3. [x] Dirbar / immersion nav order matches tour: Firefox → Gmail → Flickr → Thefacebook → Google → MySpace.  
4. [x] Footer “About **2004**” (not wrong year).  

### Files
```
years/2004/pages/home.html
years/2004/pages/about.html
js/config/immersion-2004.js   # nav · tour · footer
```

### Acceptance
- [x] Exact Live Stats numbers greppable  
- [x] Tour spine matches research  

### Tests
```bash
npx playwright test e2e/2004-mvp.spec.js e2e/hub-years.spec.js --workers=1
```

---

# Phase 7 — Immersion modules audit

### Goal
Every signature flow mutates the correct `itt04-*` key; digg year-aware; no dual-load races.

### Crucial steps

1. [x] Confirm registry `2004` list includes gmail · facebook · flickr · digg · continuity modules.  
2. [x] `gmail.js`: login · compose → msgs · invite counter.  
3. [x] `flickr.js`: upload → stream.  
4. [x] `facebook.js`: login · friends add · invite.  
5. [x] `digg.js`: year() === "2004" → `itt04-digg-links` + 2004 seeds.  
6. [x] `google.js` only via registry, not page dual-load.  
7. [x] Manual smoke in browser: connect shell → each flow once.  

### Files
```
js/immersion/registry.js
js/immersion/{gmail,facebook,flickr,digg,google}.js
js/config/immersion-2004.js
```

### Acceptance
- [x] Real localStorage mutations for all P0 flows  

### Tests
- Gate C (hard real-flows)  

---

# Phase 8 — Hard e2e

### Goal
`2004-flows` + `2004-real-flows` assert real localStorage + digg dig/bury + no race.

### Crucial steps

1. [x] Ensure `e2e/2004-flows.spec.js` exists with signature hard paths.  
2. [x] Ensure `e2e/2004-real-flows.spec.js` exists with storage asserts.  
3. [x] Pattern from `e2e/2003-flows.spec.js` if extending.  
4. [x] Run Gate C workers=1; fix flakes (dirbar timing · wait for immersion boot).  
5. [x] Clear localStorage between tests where needed.  

### Files
```
e2e/2004-flows.spec.js
e2e/2004-real-flows.spec.js
e2e/helpers.js
```

### Acceptance
- [x] Gate C green  

### Tests
- Gate C  

### Anti-patterns
- Soft presence-only asserts when hard storage is required  
- Parallel workers without re-run on flake  

---

# Phase 9 — Soft e2e + full gates

### Goal
Entire 2004 suite + authenticity + smoke + hub green.

### Crucial steps

1. [x] Run Gate B.  
2. [x] Run Gate D (all `2004-*` + hub).  
3. [x] Gate A authenticity 57/57.  
4. [x] Gate F all signature secondaries OK.  
5. [x] Gate E clean.  
6. [x] If failures: fix product first, retune tests second.  

### Acceptance
- [x] authenticity **57/57** · smoke **PASS** · e2e **44/44** (or current full count) · Gate F 19/19 OK  

### Tests
- Gate D  

---

# Phase 10 — Docs honesty close-out

### Goal
Docs match disk. CAPTURE · MUSEUM-GRADE · RESEARCH · this phases file · DETAILED research all consistent.

### Crucial steps

1. [x] Update `2004-MUSEUM-GRADE.md` with source-visit densify note.  
2. [x] Update `references/2004/CAPTURE-LOG.md` with densify pass.  
3. [x] Link DETAILED research from `2004-RESEARCH.md`.  
4. [x] Keep DISK-TRUTH residual = optional forever only.  
5. [x] This phases file checkboxes match reality.  

### Files
```
docs/2004-MUSEUM-GRADE.md
docs/2004-RESEARCH.md
docs/references/2004/CAPTURE-LOG.md
docs/DISK-TRUTH.md
docs/2004-FROM-RESEARCH-IMPLEMENTATION-PHASES.md  (this file)
docs/2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md
docs/2004-SOURCE-VISIT-RESEARCH-2026-07-30.md
```

### Acceptance
- [x] No doc claims “unbuilt” for shipped P0  
- [x] Residual = optional forever only  

### Tests
- Manual read of ship card vs `find years/2004`  

---

# Phase 11 — Optional forever pixels  (*skip unless requested*)

### Goal
Absolute shell pixel 100% (evolt IE6 toolbar OEM · true NYT ad scan).

### Crucial steps

1. [ ] Harvest evolt IE6 toolbar icons if available.  
2. [ ] Install under `assets/period/2004/chrome/` · log CAPTURE `[evolt]` or `[failed]`.  
3. [ ] Wire shell `years/2004/index.html` only if better than RECON.  
4. [ ] Never claim RECON is WA.  

### Acceptance
- [~] RECON-final accepted **or** evolt installed  

### Anti-patterns
- Inventing toolbar bitmaps  

---

# Phase 12 — Optional long-tail densify  (*skip unless requested*)

### Goal
Tour-adjacent thin pages only (not zombo/y2k pure jokes unless wanted).

### Crucial steps

1. [ ] `find years/2004 -name '*.html' -size -1500c`  
2. [ ] Filter to dirbar / tour / home-linked only.  
3. [ ] Densify top 10 from research continuity kits.  
4. [ ] urlMap already complete — re-run smoke.  

### Acceptance
- [~] Skipped with note **or** tour-adjacent thin &lt; N  

---

## Period copy kits (paste during densify)

### Gmail
```
A Google approach to email.
Search, don’t sort.
Don’t throw anything away — 1000 MB (1 GB) free.
Keep it all in context — conversations.
No pop-up ads. No banners.
Invite-only beta · April 1, 2004 · people thought it was a joke.
Invitations = social currency.
Open signup is later (2007).
Do not brand “Ajax” as a 2004 product name.
```

### Flickr
```
Share pictures in real time!
Tags · folksonomy · photostream · groups
Ludicorp · Feb 10, 2004 · Butterfield & Fake
Pink/blue beta chrome
Yahoo acquisition = March 2005 — NOT 2004 ownership
```

### Thefacebook
```
An online directory that connects people through social networks at colleges.
Harvard · February 4, 2004
Campus-gated · not open internet
Search school · classes · friends’ friends · network visualization
a Mark Zuckerberg production · © 2004
MySpace is still the mass social network
```

### Firefox
```
Rediscover the web. The browser, reloaded.
November 9, 2004 — Firefox 1.0
Tabs · popup blocking · phishing/spoof protection
Free Download · ~4.5 MB Windows class · import IE Favorites
December 15, 2004 — community NYT two-page ad
Honesty: IE6 on XP is still the mass default
```

### Digg
```
December 5, 2004 seed — dig / bury / submit a story
2005 is the rise year
Seed headlines: Firefox · Gmail · Flickr · Google IPO — not YouTube/Maps
itt04-digg-links only
```

### Google
```
Sparse homepage · August 19, 2004 IPO
Gmail · AdSense blogs · Web as Platform conference
Not yet: Maps default · Reader · YouTube · Chrome
```

### Home / About
```
51,611,646 websites · 910,060,180 users (June 2004)
Web 2.0 hinge · social software
IE6 + XP mass shell
```

---

## Master timeline (use in rooms)

| Date | Event | Room |
|------|-------|------|
| Feb 4 | Thefacebook Harvard | facebook/* |
| Feb 10 | Flickr Ludicorp | flickr/* |
| Apr 1 | Gmail preview | gmail/* |
| ~Jun | MySpace ~1M | myspace/* |
| Aug 19 | Google IPO | google/ipo.html |
| Oct | Web 2.0 Conference | web20conference/* |
| Nov 9 | Firefox 1.0 | firefox/* |
| Dec 5 | Digg public seed | digg/* |
| Dec 15 | Firefox NYT ad | firefox/nyt-ad.html |

---

## Anachronism bans (checklist every densify)

- [ ] No YouTube as 2004 product  
- [ ] No Twitter  
- [ ] No open Facebook / News Feed  
- [ ] No Chrome browser default  
- [ ] No Yahoo-owns-Flickr  
- [ ] No Google Reader  
- [ ] No Ajax as popularized product **name**  
- [ ] No Digg peak culture / Maps-YouTube digg seeds  
- [ ] No modern Facebook blue OS product  

---

## Status board (2026-07-30)

| Phase | Status |
|------:|--------|
| R Research | **Done** |
| 0 Baseline | **Done** |
| 1 Voice purge | **Done** |
| 2a–d Signature densify | **Done** (source-visit secondary densify included) |
| 3 Digg seed | **Done** |
| 4 Google | **Done** (dual-load fixed) |
| 5 Continuity | **Done** (2026-07-30 implement: densify + dual-load purge) |
| 6 Home/About | **Done** |
| 7 Immersion audit | **Done** |
| 8 Hard e2e | **Done** |
| 9 Full gates | **Done** (57/57 · 44/44 · smoke) |
| 10 Docs | **Done** |
| 11–12 Optional | **Skip** unless requested |

---

## Final ship commands

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2004/

python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2004-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

## Legal

Educational reconstruction only. No real SMTP · photo binaries · accounts · installer payloads · payments. localStorage only. Trademarks belong to their owners. Never claim RECON is WA.

---

*Derived from [`2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md). Implement one phase at a time.*
