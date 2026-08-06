# 2005 Residual Implementation — step-by-step

**Date:** 2026-07-30  
**Status:** **Implemented 2026-07-30**  
**Overview:** [`2005-RESIDUAL-IMPLEMENTATION-PHASES.md`](2005-RESIDUAL-IMPLEMENTATION-PHASES.md)  
**Artifacts map:** [`references/2005/ARTIFACTS-MAP.md`](references/2005/ARTIFACTS-MAP.md)  
**Audit:** [`2005-DEEP-RESEARCH-AUDIT-2026-07-30.md`](2005-DEEP-RESEARCH-AUDIT-2026-07-30.md)

**Rule:** Finish one phase before the next unless *parallel-ok*. Check every `[ ]`.

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
| ARTIFACTS-MAP | Before densify | Source → room · R1–R14 |
| Audit §5–§6 | Before densify | Kits · visits |
| **Audit §4.7** | Before densify / web search | **MD corpus → web search queue W1–W13** |
| Extracts | During densify | `docs/references/2005/wayback-extracts/` |
| CAPTURE / ASSETS | Pixels | Do not re-harvest P0 |
| `2005-RESEARCH.md` · DEEP `2026-07-24` | Timeline · gaps | Dates already frozen in MD |
| `e2e/2004-real-flows.spec.js` | Phase 4 | Pattern |
| `e2e/2005-youtube.spec.js` | Phase 4 | YT bar |

### MD-first research (before guessing on the web)

1. Read the phase **Source artifacts** table.  
2. If densify needs a fact MD already has (Jun 23, Mar Yahoo, Jul 28 podcasts…) — **use the MD**, do not re-web invent.  
3. If densify needs a **gap** (HousingMaps primary, Maps exact day, mid-year YouTube, del.icio.us non-outage) — open **AUDIT §4.7 queue W1–W13**, search/visit, log 3–5 lines, then edit HTML.

## What you build

```
Hub → 2005 (XP · IE 6)
  → YouTube (hard already)
  → Maps (Local Search · What/Where · Ajax · mashups)
  → Reddit (boosts · submit · Jun 23)
  → Digg rise (digg/bury · itt05)
  → TC · HousingMaps · iTunes podcasts
  → FB rename/HS · Flickr Yahoo · MySpace News Corp
```

## What you do NOT do

| Forbidden | Why |
|-----------|-----|
| Rebuild year tree | Already live |
| Invent brand pixels | CAPTURE closed |
| Dual-load feature JS after boot | Race |
| Google owns YouTube in 2005 | Later |
| Street View / Twitter / open FB / Chrome / iPhone | Bans |
| Use empty `youtube_late-extract.txt` | Failed capture |
| Git without ask | Policy |

## Legal
No real video host · map tiles · SMTP · accounts. localStorage only. Never claim RECON is WA.

## Hard rules
1. Prefix config `itt05` (gmail/fb/flickr may share `itt04`)  
2. P0 logos already WA  
3. Period voice; honesty footnotes only when needed  
4. Shell = XP + IE6  
5. Keep all `data-*` hooks · single boot script  
6. Soft + hard e2e stay green  

## Critical paths

```
years/2005/sites/{youtube,maps,reddit,digg,facebook,flickr,myspace,itunes,techcrunch,housingmaps,gmail}/
js/config/immersion-2005.js          # FIX About 2004 footer
js/immersion/{youtube,maps,reddit,digg,podcasts,gmail,facebook,flickr,myspace}.js
assets/period/2005/{youtube,maps,reddit,digg,...}/
docs/references/2005/wayback-extracts/
e2e/2005-*.spec.js
# CREATE: e2e/2005-real-flows.spec.js
```

## Storage keys

| Feature | Key |
|---------|-----|
| YouTube | `itt05-yt-uploads` |
| Reddit | `itt05-reddit-links` |
| Digg 2005 | `itt05-digg-links` |
| Podcasts | `itt05-pod-subs` |
| Gmail | `itt04-gmail*` (shared) |
| Facebook | `itt04-thefacebook` (shared) |
| Flickr | `itt04-flickr-stream` (shared) |

## Hooks (do not remove)

| Brand | Selectors |
|-------|-----------|
| YouTube | `data-yt-upload` · `data-yt-list` · `data-yt-player` · `data-yt-like` · `data-yt-views` · `data-yt-title` · `data-yt-upload-status` |
| Maps | `data-maps-canvas` · `data-maps-zoom` · `data-maps-pan` · `data-maps-search` · `data-maps-status` |
| Reddit | `data-reddit-list` · `data-reddit-submit` · `data-reddit-status` · `data-reddit-up` |
| Digg | `data-digg-list` · `data-digg-submit` · `data-digg-status` · `data-digg-up` · `data-digg-bury` · `data-digg-mine` |
| Podcasts | `data-pod-sub` · `data-pod-status` |

## Global gates (commands)

**Gate A**
```bash
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

**Gate B**
```bash
npx playwright test e2e/2005-mvp.spec.js e2e/2005-buttons.spec.js \
  e2e/2005-live-flows.spec.js e2e/2005-flows.spec.js e2e/2005-youtube.spec.js --workers=1
```

**Gate C** (after Phase 4)
```bash
npx playwright test e2e/2005-real-flows.spec.js --workers=1
```

**Gate D**
```bash
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

**Gate E**
```bash
grep -rniE 'museum theater|Museum:|\(museum\)|theater only|value="museum"' \
  years/2005/sites/{youtube,maps,reddit,digg,facebook,gmail,flickr,myspace,techcrunch,housingmaps,itunes} \
  js/immersion/{maps,reddit,digg,youtube,podcasts,myspace}.js \
  --include='*.html' --include='*.js' || true
```

**Gate F**
```bash
python3 - <<'PY'
from pathlib import Path
for t in [
  "years/2005/sites/maps/index.html","years/2005/sites/maps/about.html","years/2005/sites/maps/mashups.html",
  "years/2005/sites/reddit/index.html","years/2005/sites/reddit/about.html","years/2005/sites/reddit/submit.html",
  "years/2005/sites/digg/index.html","years/2005/sites/digg/about.html","years/2005/sites/digg/submit.html",
  "years/2005/sites/techcrunch/index.html","years/2005/sites/techcrunch/about.html",
  "years/2005/sites/housingmaps/index.html",
  "years/2005/sites/facebook/about.html","years/2005/sites/flickr/about.html",
  "years/2005/sites/myspace/about.html","years/2005/sites/itunes/index.html",
]:
  p=Path(t); n=p.stat().st_size if p.exists() else -1
  print(f"{n:5d} {'OK' if n>=1800 else ('MED' if n>=1200 else 'THIN')} {t}")
PY
```

## Phase index

| Phase | Name | Blocks next? |
|------:|------|--------------|
| 0 | Baseline freeze | Yes |
| 1 | Config + voice purge | Yes |
| 2a | Densify Maps | *parallel-ok* with 2b–2c |
| 2b | Densify Reddit | *parallel-ok* |
| 2c | Densify Digg | *parallel-ok* |
| 3a–f | Continuity densify | Soft |
| 4 | Hard e2e real-flows | Yes |
| 5 | Soft retune + Gate D | Yes |
| 6 | Docs | Ship |
| 7 | Optional | Skip |

---

# Phase 0 — Baseline freeze

### Goal
Confirm inventory and residual scope. **No content edits.**

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Audit | `docs/2005-DEEP-RESEARCH-AUDIT-2026-07-30.md` | Residual kits |
| Overview plan | `docs/2005-RESIDUAL-IMPLEMENTATION-PHASES.md` | Phase map |
| Artifacts map | `docs/references/2005/ARTIFACTS-MAP.md` | R1–R14 |
| Extracts | `docs/references/2005/wayback-extracts/*` | Non-empty copy sources |
| Immersion config | `js/config/immersion-2005.js` | Footer bug `About 2004` |
| WA logos | `assets/period/2005/{youtube,maps,reddit,digg}/logo*.gif` | Pixel honesty |
| e2e | `e2e/2005-*.spec.js` | Baseline suites |

### Steps
1. [ ] Confirm tree exists  
   ```bash
   test -d years/2005/sites/youtube && test -f js/immersion/youtube.js && echo OK
   ls e2e/2005-*.spec.js
   ls docs/references/2005/wayback-extracts/
   ```
2. [ ] Run **Gate A** — record pass/fail  
3. [ ] Confirm extracts sizes (skip empty `youtube_late-extract.txt`)  
   ```bash
   wc -c docs/references/2005/wayback-extracts/*
   ```
4. [ ] Confirm WA logos  
   ```bash
   file assets/period/2005/youtube/logo-wa.gif assets/period/2005/maps/logo-wa.gif \
        assets/period/2005/reddit/logo.gif assets/period/2005/digg/logo-wa.gif
   ```
5. [ ] Confirm footer bug present (Phase 1 target)  
   ```bash
   grep -n 'About 2004' js/config/immersion-2005.js
   ```
6. [ ] Skim ARTIFACTS-MAP §9 R1–R14  

### Acceptance
- [ ] Gate A green  
- [ ] Scope understood: residual densify only  
- [ ] Extracts present; youtube_late ignored  
- [ ] WA logos present  
- [ ] Footer bug confirmed  

### Tests
- Gate A only  

---

# Phase 1 — Config hygiene + voice purge

### Goal
Footer says **About 2005**. Signature HTML + immersion status use product grammar (no museum/theater spam).

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Config | `js/config/immersion-2005.js` | footerNav fix |
| HTML rooms | `years/2005/sites/{maps,gmail,facebook,flickr,myspace,techcrunch,itunes}/**` | Voice strings |
| Immersion JS | `js/immersion/{maps,reddit,myspace}.js` | Status/seed strings |
| This section tables | below | Exact find → replace |
| Soft e2e | `e2e/2005-live-flows.spec.js` | Regex retune if needed |

### Steps

#### Step 1.1 — Config footer
- [ ] In `js/config/immersion-2005.js` replace  
  `{ label: "About 2004", href: "pages/about.html" }`  
  → `{ label: "About 2005", href: "pages/about.html" }`  
- [ ] Verify: `grep -n 'About 200' js/config/immersion-2005.js` shows only 2005  

#### Step 1.2 — HTML voice purge (exact table)

**Maps** (`years/2005/sites/maps/`)

| File | Find | Replace |
|------|------|---------|
| `about.html` | `Museum: controls change a status line only — no real GIS tiles.` | `Controls update the status line only — no live GIS tiles in this browser.` |
| `index.html` | `Drag/zoom theater — no live map tiles. Feb 2005 public Maps energy.` | `Pan and zoom controls — no live map tiles in this browser. February 2005 public Maps.` |

**Gmail** (`years/2005/sites/gmail/`)

| File | Find | Replace |
|------|------|---------|
| `index.html` | `Museum theater — no real accounts.` | `Invite-only beta. No real accounts are created outside this browser.` |
| `index.html` | `value="museum"` | `value=""` |
| `about.html` | `Museum theater only — no real SMTP.` | `No real SMTP — messages stay in this browser.` |
| `invite.html` | `Museum theater: you have` | `You have` |
| `compose.html` | `Want an invite? (museum theater)` | `Need an invite?` |
| `compose.html` | `No real SMTP — localStorage only (museum). Appears in inbox list as sent theater.` | `No real SMTP. Sent mail appears in your inbox list in this browser only.` |

**Facebook** (`years/2005/sites/facebook/`)

| File | Find | Replace |
|------|------|---------|
| `index.html` | `value="museum"` | `value=""` |
| `invite.html` | `No real email is sent — localStorage museum only.` | `No email is sent — invites are recorded in this browser only.` |
| `networks.html` | `Status (museum)` | `Status` |
| `friends.html` | `Museum theater — friend list is localStorage only. No real accounts.` | `Friend list is stored in this browser only. No real accounts.` |

**Flickr**

| File | Find | Replace |
|------|------|---------|
| `groups.html` | `128 photos (museum fake counts)` | `128 photos` |
| `upload.html` | `Museum theater — no real image binary stored. Photostream updates from localStorage.` | `No image file is stored — title and tags join your photostream in this browser.` |

**MySpace**

| File | Find | Replace |
|------|------|---------|
| `index.html` | `Tom is everyone's first friend (museum default).` | `Tom is everyone's first friend.` |
| `index.html` | `Edit your profile HTML vibes (museum).` | `Edit your profile HTML vibes.` |
| `about.html` | `museum labels <b>August 2003</b>` | `this exhibit labels <b>August 2003</b>` |
| `invite.html` | `(Museum theater — no real email is sent.)` | `(No real email is sent — recorded in this browser only.)` |

**TechCrunch**

| File | Find | Replace |
|------|------|---------|
| `index.html` | `Seed headlines (museum)` | `Seed headlines` |
| `about.html` | `museum reconstruction, not the live site.` | `period reconstruction of early TechCrunch — not the live site.` |

**iTunes**

| File | Find | Replace |
|------|------|---------|
| `fairplay.html` | `Museum: no real DRM, no real files, no payments.` | `No real DRM, no real files, no payments in this browser.` |
| `index.html` | `No real audio files or payments in this museum.` | `No real audio files or payments in this browser.` |
| `index.html` | `(museum note)` | remove or `(free podcasts directory)` |
| `browse.html` | `(museum sample rows)` | `(sample rows)` |
| `browse.html` | `Museum titles are illustrative` | `Titles are illustrative` |
| `library.html` | `Purchases from the museum store` | `Purchases from the store` |
| `library.html` | `densified for museum year` | `densified for the 2005 year` |

#### Step 1.3 — JS status purge

| File | Find | Replace |
|------|------|---------|
| `maps.js` | `theater only, no live tiles. Feb 2005 Maps energy.` | `no live map tiles in this browser. Feb 2005 Maps.` |
| `maps.js` | `(theater geocode)` | `(Local Search — no live geocode)` |
| `reddit.js` | `submitted (local front page).` | `Submitted — on your front page in this browser.` |
| `myspace.js` | `HTML vibes (museum).` | `HTML vibes.` |
| `myspace.js` | `(museum default friend)` | remove parenthetical |
| `myspace.js` | `Invite queued (museum — no email sent).` | `Invite queued (no email sent).` |

#### Step 1.4 — Optional register retry
- [ ] If maps/reddit/youtube/podcasts still throw on missing `registerLocal`, use digg.js retry pattern:
```js
function register() {
  if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
    setTimeout(register, 20);
    return;
  }
  ITT.ImmersionFeatures.registerLocal({ id: "…", boot: boot });
}
register();
```

#### Step 1.5 — Soft e2e retune
- [ ] If live-flows match `/museum/i`, retune to `/browser|saved|submitted|local|Sent|Upload/i`

#### Step 1.6 — Verify
- [ ] Run Gate E  
- [ ] Run Gate B subset (youtube + flows)  

### Acceptance
- [ ] Footer **About 2005** only  
- [ ] Gate E clean  
- [ ] Gate B youtube/flows green  

### Tests
- Gate E · Gate B subset  

---

# Phase 2a — Densify Google Maps

### Goal
Maps rooms match **February 2005** Local Search grammar from saved extract. Hooks work; pan/zoom/search update status.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Extract | `docs/references/2005/wayback-extracts/maps-extract.txt` | Maps · Local Search · Directions · What/Where · JS required |
| Audit kit | AUDIT §5.6 Maps | Ajax · HousingMaps · no Street View |
| Pixels | `assets/period/2005/maps/logo.gif` · README | WA mark |
| Module | `js/immersion/maps.js` | Status + search behavior |
| Pages | `years/2005/sites/maps/{index,about,mashups}.html` | Edit targets (thin) |

**Extract phrases (required):**
- Nav: **Maps · Local Search · Directions**
- What e.g. `pizza` · Where e.g. `Poughkeepsie, NY`
- Start address · End address
- *JavaScript must be enabled…*
- Public **February 2005** · Ajax named **Feb 18, 2005**
- Ban: **no Street View** as 2005 default

### Steps
1. [ ] Open extract + current `index.html`  
2. [ ] Densify **`index.html`** (≥1800 B):  
   - Logo + nav: Maps · Local Search · Directions · About Ajax · Mashups · Start  
   - Form `data-maps-search` with What/Where labels (or labeled single `q`)  
   - Canvas + zoom + pan hooks  
   - Period status (no museum)  
   - Only `immersion-2005.js`  
3. [ ] Densify **`about.html`** (≥1500 B): Feb 2005 · Ajax/Garrett · no Street View · links to mashups/HousingMaps  
4. [ ] Densify **`mashups.html`** (≥1200 B): HousingMaps class · link `../housingmaps/index.html` · API web energy  
5. [ ] Polish `maps.js` status strings if not done in Phase 1  
6. [ ] Optional: dual What/Where fields → update maps.js to read them  

### Acceptance
- [ ] Local Search / Directions / What·Where class present  
- [ ] Hooks intact · pan/zoom/search work  
- [ ] Gate F maps not THIN  

### Tests
```bash
npx playwright test e2e/2005-mvp.spec.js e2e/2005-buttons.spec.js -g 'maps|Maps' --workers=1
# manual: pan, zoom, search updates status
```

---

# Phase 2b — Densify Reddit

### Goal
Sparse YC front page with **boosts** language; vote + submit persist via `itt05-reddit-links`.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Extract | `wayback-extracts/reddit-extract.txt` | register/browse/submit/faq · sorts · boosts |
| Module | `js/immersion/reddit.js` | KEY `itt05-reddit-links` · **submit re-render bug** |
| Pixels | `assets/period/2005/reddit/logo.gif` | WA logo |
| Pages | `years/2005/sites/reddit/{index,submit,about}.html` | Edit targets |

**Extract phrases (required):**
- Nav: register · browse · submit · faq  
- Sorts: hottest · newest · recently promoted · top · all-time  
- Row: “with N **boosts**”  
- About: **June 23, 2005** · Huffman · Ohanian · Y Combinator  

### Steps
1. [ ] Open extract + `reddit.js`  
2. [ ] Densify **`index.html`** (≥1800 B): logo · nav · sort strip · `data-reddit-list` · Jun 23 line · boosts language  
3. [ ] Densify **`submit.html`** (≥1200 B): form `data-reddit-submit` title+url · `data-reddit-status` · link to index  
4. [ ] Densify **`about.html`** (≥1500 B): founders · YC · boosts · no modern awards UI  
5. [ ] **Fix `reddit.js`:** after submit save, if `[data-reddit-list]` present call `render(doc)`; period status text  
6. [ ] Optional: register() retry  
7. [ ] Seed titles stay period-safe (Maps/YouTube/Firefox class OK)  

### Acceptance
- [ ] Vote increments score + storage  
- [ ] Submit appears on index after navigation  
- [ ] “boosts” greppable on index or about  
- [ ] Gate F reddit OK  

### Tests
- Manual vote/submit · Gate F · Gate B subset  

---

# Phase 2c — Densify Digg (2005 rise)

### Goal
Rise-year Digg with live digg/bury/submit; storage key **`itt05-digg-links`**.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Extract | `wayback-extracts/digg-extract.txt` (+ digg2) | digg it · comments · categories · Diggnation |
| Module | `js/immersion/digg.js` | year-aware key · register retry already |
| Pixels | `assets/period/2005/digg/logo.gif` · `comments-wa.gif` | WA |
| Pages | `years/2005/sites/digg/{index,submit,about}.html` | Edit targets |

**Extract phrases (required):**
- digg · about · register · login · latest · front page  
- digg it · bury · comments · categories  
- Diggnation culture  
- Public **Dec 5, 2004** · **2005 is the rise**  

### Steps
1. [ ] Open extract + digg.js seeds  
2. [ ] Densify **`index.html`** (≥1800 B): logo · Popular/Submit/About · rise honesty · `data-digg-list` · optional categories/Diggnation  
3. [ ] Densify **`submit.html`** (≥1200 B): `data-digg-submit` · status · mine · list  
4. [ ] Densify **`about.html`** (≥1500 B): Dec 5 · 2005 rise · digg/bury honesty  
5. [ ] Confirm pages only load `immersion-2005.js`  
6. [ ] Confirm storage writes **`itt05-digg-links`** (not itt04) in 2005  

### Acceptance
- [ ] Digg +1 · bury −1 · submit on home  
- [ ] Key is `itt05-digg-links`  
- [ ] Gate F digg OK  

### Tests
- Manual digg/bury/submit · Gate F  

---

# Phase 2 close

### Goal
All three densify rooms pass size + soft e2e.

### Source artifacts
- Gate F script · Gate B suites · densified pages  

### Steps
1. [ ] Run Gate F for maps/reddit/digg  
2. [ ] Run full Gate B  
3. [ ] Manual smoke three P0 flows  

### Acceptance
- [ ] Gate F mostly OK  
- [ ] Gate B green  

### Tests
- Gate F · Gate B  

---

# Phase 3a — Facebook rename densify

### Goal
2005 rename + high-school expansion honesty; still not open internet; no News Feed.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Extract | `wayback-extracts/facebook-extract.txt` | Welcome · colleges · not everywhere yet |
| Audit | AUDIT Facebook 2005 | Aug rename · Sep HS |
| Pages | `sites/facebook/{about,index,networks}.html` | Edit targets |
| Pixels | `assets/period/2005/facebook/*` | Continuity logos |

### Steps
1. [ ] About/index: **August 2005** facebook.com / drop “The”  
2. [ ] **September 2005** high school networks  
3. [ ] Still not open registration (2006) · no News Feed  
4. [ ] Keep Welcome / college directory grammar from extract  
5. [ ] Hooks `data-fb-*` still work (`itt04-thefacebook` OK)  

### Acceptance
- [ ] Grep Aug/Sep 2005 honesty  
- [ ] Profile/friends still work  

### Tests
```bash
grep -niE 'August 2005|September 2005|high school|not.*open' years/2005/sites/facebook/*.html
```

---

# Phase 3b — Flickr Yahoo ownership

### Goal
State **Yahoo acquired Flickr March 2005** as current ownership; product still photos/tags/groups.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Extract | `flickr-extract.txt` | Photo sharing grammar |
| Narrative | Cybercultural / AUDIT | Yahoo Mar 2005 |
| Pages | `sites/flickr/about.html` (+ optional index) | Edit targets |

### Steps
1. [ ] About: **Yahoo acquired Flickr March 2005**  
2. [ ] Still tags/groups/photostream product  
3. [ ] Do not claim Ludicorp-only as current owner  
4. [ ] Voice already clean from Phase 1  

### Acceptance
- [ ] Grep Yahoo + March/2005 on flickr about  

### Tests
```bash
grep -niE 'Yahoo|March 2005' years/2005/sites/flickr/about.html
```

---

# Phase 3c — MySpace News Corp

### Goal
**July 2005 News Corp** acquisition beat; profile HTML theater continues; mass social still huge.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Narrative | Cybercultural 2005 · AUDIT | News Corp Jul 2005 |
| Pages | `sites/myspace/{about,index}.html` | Edit targets |

### Steps
1. [ ] About: **July 2005 News Corp** acquisition  
2. [ ] Index honesty line if useful  
3. [ ] Keep profile/Top 8 grammar  

### Acceptance
- [ ] Grep News Corp / July 2005  

### Tests
```bash
grep -niE 'News Corp|July 2005' years/2005/sites/myspace/*.html
```

---

# Phase 3d — iTunes podcasts

### Goal
**June 28, 2005** · iTunes **4.9** free podcast directory; subscribe hooks work without museum voice.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Apple PR | https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/ | Date · 4.9 · free podcasts |
| Module | `js/immersion/podcasts.js` | KEY `itt05-pod-subs` · `data-pod-sub` |
| Pages | `sites/itunes/*` | Podcast-facing densify |
| Pixels | `assets/period/2005/itunes/*` | Continuity |

### Steps
1. [ ] Densify index (and podcast pages) with Jun 28 2005 · 4.9 · free directory  
2. [ ] Keep `data-pod-sub` / `data-pod-status`  
3. [ ] Confirm Phase 1 voice purge on itunes pages  
4. [ ] Manual: click subscribe → status updates  

### Acceptance
- [ ] Grep `June 28` or `4.9` + podcast  
- [ ] Subscribe still works  

### Tests
- Manual pod-sub · Gate B subset if present  

---

# Phase 3e — TechCrunch densify

### Goal
Tagline **Tracking Web 2.0**; Jun 2005 launch; sparse blog from extract; about no longer thin.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Extract | `wayback-extracts/techcrunch-extract.txt` | Tracking Web 2.0 · YubNub · Gataga |
| Pages | `sites/techcrunch/{index,about}.html` | Edit targets (about ~474 B) |

### Steps
1. [ ] Index: tagline **Tracking Web 2.0** · Jun 2005 · 1–2 sample posts (YubNub class OK) · ≥1800 B  
2. [ ] About: densify from thin · period reconstruction voice  
3. [ ] No “museum” leads  

### Acceptance
- [ ] Grep `Tracking Web 2.0`  
- [ ] Gate F TC OK  

### Tests
```bash
grep -ni 'Tracking Web 2.0' years/2005/sites/techcrunch/*.html
```

---

# Phase 3f — HousingMaps densify

### Goal
Educational Craigslist-class + Google Maps mashup; explains 2005 API web culture.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Lore | AUDIT HousingMaps kit · Rademacher class | Mashup story |
| Maps link | `sites/maps/mashups.html` | Cross-link |
| Page | `sites/housingmaps/index.html` | Edit target (~834 B) |

### Steps
1. [ ] Densify index ≥1500–1800 B  
2. [ ] Explain mashup (CL-class + Maps) · educational only · not real CL data  
3. [ ] Link from/to Maps mashups  

### Acceptance
- [ ] Grep mashup / Maps class  
- [ ] Gate F HousingMaps MED or OK  

### Tests
- Gate F · manual link from maps  

---

# Phase 3 close

### Goal
All continuity beats greppable; soft e2e still green.

### Source artifacts
- Densified continuity pages · Gate B/E/F  

### Steps
1. [ ] Beats grep:  
   ```bash
   grep -rniE 'August 2005|September 2005|Yahoo.*Flickr|News Corp|June 28, 2005|Tracking Web 2.0|boosts|Local Search' \
     years/2005/sites/{facebook,flickr,myspace,itunes,techcrunch,housingmaps,maps,reddit} --include='*.html' | head -40
   ```
2. [ ] Gate B  
3. [ ] Gate E  
4. [ ] Gate F  

### Acceptance
- [ ] Beats present · Gate B green · voice clean  

### Tests
- Gate B · E · F  

---

# Phase 4 — Create `e2e/2005-real-flows.spec.js`

### Goal
Hard suite proves Maps/Reddit/Digg/YouTube storage + DOM; no boot race.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Pattern | `e2e/2004-real-flows.spec.js` | clear keys · gotoDirect · pageerror |
| YT hard | `e2e/2005-youtube.spec.js` | itt05 patterns |
| Helpers | `e2e/helpers.js` | enterYear · goInFrame · waitForImmersion |
| Create | `e2e/2005-real-flows.spec.js` | New file |

### Steps

#### Step 4.1 — Create file skeleton
```js
// @ts-check
/**
 * 2005 real localStorage flows — Maps · Reddit · Digg · YouTube · bans.
 * storagePrefix itt05 · digg year-aware itt05-digg-links.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

async function clearItt05(page, prefixes) {
  await page.evaluate((prefs) => {
    try {
      Object.keys(localStorage)
        .filter((k) => prefs.some((p) => k.indexOf(p) === 0))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* */ }
  }, prefixes);
}

async function gotoDirect(page, path, readySelector) {
  const errors = [];
  const onErr = (err) => errors.push(String(err && err.message ? err.message : err));
  page.on('pageerror', onErr);
  await page.goto(path);
  await page.waitForSelector(readySelector, { timeout: 20000 });
  await page.waitForTimeout(400);
  page.off('pageerror', onErr);
  return errors;
}
```

#### Step 4.2 — Direct page tests (implement all)
| # | Test | Ready selector / assert |
|---|------|-------------------------|
| 1 | youtube no race | `[data-yt-list]` · no `registerLocal missing` |
| 2 | maps no race | `[data-maps-canvas]` |
| 3 | reddit no race | `[data-reddit-list]` |
| 4 | digg no race | `[data-digg-list]` |
| 5 | youtube upload | clear `itt05-yt-uploads` · unique title in storage + list |
| 6 | reddit submit | clear `itt05-reddit-links` · submit · index shows title |
| 7 | reddit boost | click `[data-reddit-up]` · score + storage |
| 8 | digg digg/bury | +1 then −1 count |
| 9 | digg submit key | title in **`itt05-digg-links`** (not written only to itt04) |
| 10 | maps search/zoom | status changes |

#### Step 4.3 — Shell tests
| # | Test | Notes |
|---|------|-------|
| 11 | shell reddit submit + vote | `enterYear(page,'2005')` |
| 12 | shell digg digg + submit | storage itt05 |
| 13 | bans | no Google-owns-YT as 2005 fact · no Twitter · FB still gated |

#### Step 4.4 — Run
- [ ] Gate C green  
- [ ] Gate B still green  

### Acceptance
- [ ] File exists  
- [ ] Gate C green  
- [ ] Gate B green  

### Tests
- Gate C · Gate B  

---

# Phase 5 — Soft retune + full gates

### Goal
All 2005 e2e + authenticity + smoke green.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Soft specs | `e2e/2005-mvp|buttons|live-flows.spec.js` | Retune selectors/status |
| Hard specs | flows · youtube · real-flows | Stay green |

### Steps
1. [ ] Fix soft tests broken by voice/densify  
2. [ ] Run Gate D  
3. [ ] Fix flakes  
4. [ ] Gate E + Gate F  

### Acceptance
- [ ] All `2005-*` e2e green  
- [ ] authenticity + smoke green  
- [ ] Gate E + F pass  

### Tests
- Gate D · E · F  

---

# Phase 6 — Docs close-out

### Goal
Docs match disk; residual marked implemented.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| MUSEUM-GRADE | `docs/2005-MUSEUM-GRADE.md` | Residual closed · real-flows listed |
| RESEARCH | `docs/2005-RESEARCH.md` | Closed date |
| This plan + overview | residual phase MDs | Status Implemented · `[x]` |
| CAPTURE | `references/2005/CAPTURE-LOG.md` | Implement note |
| ARTIFACTS-MAP | `references/2005/ARTIFACTS-MAP.md` | R1–R12 checked |
| Audit | `2005-DEEP-RESEARCH-AUDIT-2026-07-30.md` | Implement checked |

### Steps
1. [ ] Flip residual plan status → Implemented  
2. [ ] Mark phases `[x]` in this file  
3. [ ] Update MUSEUM-GRADE e2e list  
4. [ ] Check ARTIFACTS-MAP R1–R12  
5. [ ] CAPTURE residual close note  
6. [ ] Spot-check links  

### Acceptance
- [ ] Docs match disk  

### Tests
- Doc review only  

---

# Phase 7 — Optional forever

### Goal
Optional only — not required for residual ship.

### Source artifacts

| Item | Note |
|------|------|
| Year-aware gmail/fb/flickr keys | Isolate from itt04 |
| Maps chrome WA | CAPTURE optional |
| TC header GIF | Optional |
| del.icio.us re-harvest | Extract was outage page |
| Wiki logo WA | RECON residual |

### Steps
1. [ ] Only if user asks  
2. [ ] Gate A if assets change  

### Acceptance
- N/A unless run  

### Tests
- Gate A if pixels change  

---

# Session runbook

```text
[ ] Phase 0  Gate A · extracts · WA logos · footer bug
[ ] Phase 1  Footer About 2005 · voice tables · JS status
[ ] Phase 1  Gate E · Gate B subset
[ ] Phase 2a Maps densify
[ ] Phase 2b Reddit densify + submit re-render
[ ] Phase 2c Digg densify
[ ] Phase 2  Gate F · Gate B
[ ] Phase 3a Facebook Aug/Sep 2005
[ ] Phase 3b Flickr Yahoo Mar 2005
[ ] Phase 3c MySpace News Corp Jul 2005
[ ] Phase 3d iTunes podcasts Jun 28 / 4.9
[ ] Phase 3e TechCrunch Tracking Web 2.0
[ ] Phase 3f HousingMaps mashup
[ ] Phase 3  Beats grep · Gate B · E · F
[ ] Phase 4  e2e/2005-real-flows.spec.js · Gate C
[ ] Phase 5  Gate D
[ ] Phase 6  Docs
[ ] STOP — ask before git
```

---

# Extract quote bank (densify source)

| Brand | Source file | Key phrases |
|-------|-------------|-------------|
| Maps | `maps-extract.txt` | Local Search · Directions · What pizza · Where Poughkeepsie · JS required |
| Reddit | `reddit-extract.txt` | register · browse · submit · faq · hottest · boosts |
| Digg | `digg-extract.txt` | digg it · comments · Diggnation · categories |
| TechCrunch | `techcrunch-extract.txt` | Tracking Web 2.0 · YubNub |
| YouTube | `youtube-extract.txt` | Broadcast Yourself (early dating UI = footnote only) |
| Facebook | `facebook-extract.txt` | Welcome · colleges · not everywhere yet · ©2005 |
| Flickr | `flickr-extract.txt` | Photo sharing · free account (+ Yahoo from narrative) |
| youtube_late | empty | **Do not use** |

---

# Done when

| # | Criterion | Phase |
|---|-----------|------:|
| 1 | About 2005 footer · voice clean | 1 |
| 2 | Maps/Reddit/Digg densified from extracts | 2 |
| 3 | Continuity year beats | 3 |
| 4 | `2005-real-flows` green | 4 |
| 5 | Full e2e + auth + smoke | 5 |
| 6 | Docs updated | 6 |
| 7 | Bans hold | all |

---

**One-line:** Fix footer → purge voice → densify Maps/Reddit/Digg from extracts → continuity beats → hard real-flow e2e.

*Educational reconstruction only.*
