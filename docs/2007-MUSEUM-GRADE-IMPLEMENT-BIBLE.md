# 2007 — Museum-grade implement bible

**Date:** 2026-08-06  
**Purpose:** **One exhaustive implementer document** to build, verify, densify, and perfect museum year **2007** to **museum-grade with REAL data flows only** (no soft mocks, no one-click fake success).  
**Audience:** Human or agent implementers working **phase by phase**.  
**Board:** Hub open · `years/2007/` live · prefix **`itt07`** · densify ship already landed · residual polish = this bible’s Waves / open checkboxes.  
**Legal:** Educational reconstruction only. Trademarks belong to owners. **localStorage theater only** — no real cellular, App Store binaries, map tiles, SMTP, payments, OAuth, or third-party APIs. **Never invent brand pixels.**

---

## 0. Companion docs (read order)

| Priority | Doc | Role |
|---------:|-----|------|
| **1** | **This file** | Master phases · ROI · REAL flow contracts · minute how-to |
| **2** | [`2007-MUSEUM-PERFECT-RESEARCH-AND-BUILD-MAP.md`](2007-MUSEUM-PERFECT-RESEARCH-AND-BUILD-MAP.md) | Disk map · web sources · CAPTURE C07 · residual waves |
| **3** | [`2007-RESEARCH.md`](2007-RESEARCH.md) | Thesis · timeline · bans · scale |
| **4** | [`2007-DEEP-RESEARCH-FRESH-2026-07-31.md`](2007-DEEP-RESEARCH-FRESH-2026-07-31.md) | Product kits · primaries |
| **5** | [`2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Shorter playbook + images |
| **6** | [`2007-CONNECTIONS-AND-TRAILS.md`](2007-CONNECTIONS-AND-TRAILS.md) | Product bridges |
| **7** | [`2007-RELATABLE-CONTENT-AND-PERIOD-VOICE-2026-07-31.md`](2007-RELATABLE-CONTENT-AND-PERIOD-VOICE-2026-07-31.md) | Voice kits · slang |
| **8** | [`2007-MUSEUM-GRADE.md`](2007-MUSEUM-GRADE.md) | Ship status card |
| **9** | [`references/2007/CAPTURE-LOG.md`](references/2007/CAPTURE-LOG.md) · [`ARTIFACTS-MAP.md`](references/2007/ARTIFACTS-MAP.md) | Harvest · room map |
| **10** | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`MUSEUM-READY-BAR-1994-2012.md`](MUSEUM-READY-BAR-1994-2012.md) | Engine rules · layers A–F |
| **11** | e2e | `e2e/2007-mvp` · `flows` · `real-flows` · `densify` · `trail-real-flows` |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Done on disk (verify before re-doing) |
| **[ ]** | Open work for perfect museum-grade |
| **[~]** | Optional forever (does not block A–F claim) |
| **ROI** | 1–10 visitor impact / implement effort score (10 = do first) |

---

# Part 1 — Overall goals & museum-grade definition

## 1.1 One-line goal

Build and maintain a **museum-grade 2007 Web immersion**: **Windows XP + Internet Explorer 6/7** shell, period multipage sites, and **REAL multi-step localStorage flows** that recreate how people used the internet in calendar year **2007** — especially **iPhone Safari (no App Store)**, **open Gmail**, **Street View**, **Facebook Platform**, and **Twitter’s SXSW breakout** — while most people still live on the **desktop** Web 2.0 stack.

## 1.2 Visitor outcome (done = visitor can do this)

```
Hub → open 2007
  → XP desktop + IE (Vista = optional product room only)
  → Starting Point / About:
        121,892,559 sites · 1,373,327,790 users · Tumblr birthmark
        thesis: phone becomes a browser · desktop still mass
        hard bans: Chrome · App Store · Android mass phones · invite-only Gmail default
  → iPhone: Jan 9 announce → Jun 29 ship → Safari URL history (itt07-iphone-history)
  → Gmail: open signup Feb 14 → login → compose/send → drafts (itt07-gmail*)
  → Street View: Maps → five cities → turn heading (itt07-streetview)
  → Facebook Platform: add SuperPoke-class app → remove → Beacon literacy (itt07-fb-apps)
  → Twitter: SXSW story → compose 140 → profile reads timeline (itt07-tweets)
  → YouTube: Google-owned ALL year → upload → list → watch (itt07-yt-*)
  → Continuity REAL: Digg · MySpace · Docs · AWS · Reader · Flickr · Amazon cart · …
  → Connection trails on home · flow map · playables (itt07-playable*)
  → Exit → hub resume · ALL state under itt07-* only (no itt06 bleed)
```

## 1.3 Museum-ready layers A–F (must all pass)

| Layer | Requirement | 2007 target |
|-------|-------------|-------------|
| **A Story** | Thesis on home + About · scale · hard bans | **[x]** verify Wave 1 |
| **B Densify** | P0 multipage · trails · multipath REAL actions | **[x]** + **[ ]** thin forest polish |
| **C Pixels** | WA or **failed-final RECON** · never invent | **[~]** C07 harvest open |
| **D Provenance** | CAPTURE-LOG + ASSETS honesty | **[x]** keep updated |
| **E Gates** | check-all-years · e2e pack · hub unlock | **[x]** re-run after edits |
| **F Isolation** | Prefix `itt07` only · no cross-year keys | **[x]** assert in every REAL flow |

## 1.4 What “REAL flow” means (no mocks)

| Pass | Fail (FORBIDDEN) |
|------|------------------|
| ≥2 steps or ≥1 honesty check + save | One-click “I saw” with no storage |
| Writes **`itt07-*`** with **content** (JSON/text) | Soft status text only |
| Empty / incomplete form **blocked** | Empty form “success” |
| DOM status + optional flash after write | Silent no-op |
| Trail home → product → storage | 404 / dead button |
| Year prefix only (`itt07`) | Writes `itt06` / bare keys |
| Re-open page **reads** prior state | State lost on reload |

**Mock anti-patterns (never ship):**

- `onclick` alert only  
- Button that only changes CSS class  
- “Saved!” without `localStorage.setItem`  
- Hardcoded success when required fields empty  
- Cross-year storage (`itt06-digg-links` as primary)  
- Claiming live maps / real upload binary / real mail  

**REAL pattern (preferred):**

```
[user fills required fields / multi checks]
  → immersion module validates
  → localStorage.setItem("itt07-…", JSON.stringify(payload))
  → status node textContent update + actionFeedback
  → markTourUsed(stepId) when tour step
  → reload still shows data from localStorage
```

Optional multipage REAL panel pattern:

```html
<label><input type="checkbox" data-req data-req-id="a"> honesty A</label>
<label><input type="checkbox" data-req data-req-id="b"> honesty B</label>
<button type="button"
  data-itt-real-save
  data-storage-key="beacon-ack"
  data-requires="[data-req]"
  data-min-req="2">I understand</button>
<span data-itt-action-status></span>
<!-- writes itt07-beacon-ack after ≥2 checks -->
```

## 1.5 Locked facts (do not invent)

| Fact | Value |
|------|------:|
| Websites (June class) | **121,892,559** (+43% vs 2006) |
| Internet users | **1,373,327,790** |
| Users/site | **~11.3** |
| Live Stats birthmark | **Tumblr** |
| Storage prefix | **`itt07`** |
| Shell default | **Windows XP + IE 6/7** |
| iPhone announce | **Jan 9, 2007** |
| iPhone ship US | **Jun 29, 2007** |
| iPhone prices (announce) | **$499** 4GB · **$599** 8GB |
| Carrier class | **Cingular** (→ AT&T) exclusive US |
| Gmail open | **Feb 14, 2007** |
| Facebook Platform | **May 24, 2007** |
| Street View (museum) | **May 29, 2007** |
| Street View cities | SF · NYC · Las Vegas · Miami · Denver |
| Twitter SXSW | **March 2007** |
| Vista retail | **Jan 30, 2007** |
| Android OHA | **Nov 5, 2007** (announce only) |
| Facebook Beacon | **Nov 6, 2007** |
| Kindle | **Nov 19, 2007** · $399 class |
| YouTube ownership | Google **all of 2007** (deal close Nov 13, 2006) |

## 1.6 Hard bans (never 2007 default product)

| Ban | Correct era |
|-----|-------------|
| **Chrome** browser as default | Sep 2008 |
| **App Store** / native app grid | Jul 2008 |
| **iPhone 3G** as “the” 2007 phone | 2008 |
| **Android mass phones** / Market | late 2008 |
| Gmail **invite-only as year default story** | Open Feb 14, 2007 |
| Modern iOS / X / Reels / For You | Later |
| Netflix **streaming-first** | DVD primary · Watch Now seed only |
| Campus-only Facebook | Ended Sep 2006 |
| YouTube “still independent in 2007” | **False** |

## 1.7 Engineering rules (every phase)

1. **Config + content** — densify in `years/2007/`; no new browser engine.  
2. Content pages load **only** `js/immersion-2007.js`.  
3. Storage via `storagePrefix: "itt07"` / `ITT.util.immersionStorageKey`.  
4. **Never remove `data-*` hooks** without updating module + e2e.  
5. **Period voice** — no “Museum theater” lead on product rooms.  
6. **Never invent brand pixels** — WA / RECON / CONTINUITY + CAPTURE log.  
7. Gates green before marking a phase done.  
8. **Git only if the user asks.**  
9. Prefer multi-step REAL over soft literacy acks on P0.  
10. Isolation: after save, assert sibling year keys (e.g. `itt06-*`) **not** written.

## 1.8 ROI index (how to prioritize)

| ROI | Meaning | Examples |
|----:|---------|----------|
| **10** | Blocks museum claim or wrong-year product | Bans · scale · YT ownership · Gmail open |
| **9** | P0 REAL multi-step broken | iPhone history · SV · Platform add/remove |
| **8** | Signature densify / trail | Home trails · Maps→SV handoff |
| **7** | Continuity REAL popular path | Digg · MySpace · YouTube upload |
| **6** | Voice / About calendar | Relatable copy kits |
| **5** | Optional culture multipage | Tumblr · Kindle · Netflix seed |
| **4** | FriendFeed / OpenSocial rooms | Geek culture |
| **3** | Thin stub scrub (non-trail) | Encarta · old IE pages |
| **2** | L4 pixel harvest | WA iPhone still · pegman |
| **1** | Forever optional chrome | Dual Vista shell |

**Rule:** Implement ROI ≥8 before ROI ≤4 unless user requests pixels/culture first.

---

# Part 2 — Architecture & file map (minute paths)

## 2.1 Layer cake

```
Hub index.html
  └─ years/2007/index.html          # shell: connect, menus, #content iframe
       util.js → browser-core → config/2007.js → browser-2007.js
  └─ pages/*.html · sites/**/*.html
       immersion-2007.js → immersion/boot.js
         → registry FEATURES_BY_YEAR["2007"]
         → config/immersion-2007.js
         → immersion/create.js → feature.init(api)
```

## 2.2 Critical paths

| Role | Path |
|------|------|
| Shell | `years/2007/index.html` |
| Starting Point | `years/2007/pages/home.html` |
| About | `years/2007/pages/about.html` |
| Flow map page | `years/2007/pages/map.html` |
| Cool / What’s New | `pages/cool.html` · `whats-new.html` |
| Browser config | `js/config/2007.js` |
| Immersion config | `js/config/immersion-2007.js` |
| Browser stub | `js/browser-2007.js` |
| Immersion stub | `js/immersion-2007.js` |
| Registry | `js/immersion/registry.js` (`"2007": […]`) |
| Shared UX | `js/immersion/shared.js` |
| Orchestrator | `js/immersion/create.js` |
| Flow map render | `js/immersion/flow-map.js` + `js/config/flow-maps.js` |
| Playables | `js/immersion/year-playable.js` · `sites/playable/` |
| Period CSS | `css/period-2007.css` · `period-2007-lite.css` · `period-xp-ui.css` |
| Assets | `assets/period/2007/**` |
| Provenance | `docs/references/2007/*` |

## 2.3 P0 product file matrix

| Product | HTML | Module | Primary keys |
|---------|------|--------|--------------|
| iPhone | `sites/iphone/{index,about}.html` | `iphone.js` | `itt07-iphone-history` |
| Gmail | `sites/gmail/{index,about,inbox,compose,invite}.html` | `gmail.js` | `itt07-gmail` · `itt07-gmail-msgs` · `itt07-gmail-drafts` · `itt07-gmail-invites` |
| Street View | `sites/maps/{index,streetview,about,mashups}.html` | `maps.js` | `itt07-streetview` · `itt07-maps-state` |
| Facebook Platform | `sites/facebook/{platform,about,feed,profile,index,open,…}.html` | `facebook.js` | `itt07-fb-apps` · feed/profile keys |
| Twitter | `sites/twitter/{index,about,profile}.html` | `twitter.js` | `itt07-tweets` |
| YouTube | `sites/youtube/{index,about,upload,watch,channels}.html` | `youtube.js` | `itt07-yt-uploads` · `itt07-yt-views` |

## 2.4 Continuity modules (must stay REAL under itt07)

amazon · auction · digg · myspace · flickr · docs · aws · reader · reddit · blogger · technorati · delicious · housingmaps · feedburner · wordpress · linkedin · itunes · podcasts · napster · yahoo · google · excite · geocities · slashdot · bloglines · adsense · friendster · kazaa · plugin · guestbook-search · flow-map · year-playable

## 2.5 Immersion features flags (`immersion-2007.js`)

All of: `flowMap`, `nav`, `amazon`, `auction`, `geocities`, `google`, `excite`, `yahoo`, `napster`, `blogger`, `slashdot`, `technorati`, `plugin`, `friendster`, `kazaa`, `myspace`, `itunes`, `wordpress`, `linkedin`, `adsense`, `bloglines`, `gmail`, `facebook`, `flickr`, `youtube`, `maps`, `reddit`, `digg`, `podcasts`, `delicious`, `housingmaps`, `feedburner`, `twitter`, `docs`, `aws`, `reader`, `iphone`.

## 2.6 Tour steps (config)

| id | href | match | Meaning |
|----|------|-------|---------|
| about | pages/about.html | /about | Thesis |
| iphone | sites/iphone/index.html | /iphone/ | Safari phone |
| gmail | sites/gmail/index.html | /gmail/ | Open Gmail |
| maps | sites/maps/streetview.html | /streetview | Street View |
| facebook | sites/facebook/platform.html | /platform | Platform |
| twitter | sites/twitter/index.html | /twitter/ | SXSW growth |
| youtube | sites/youtube/index.html | /youtube/ | Google-owned YT |

Visit = path match (`markTourProgress`). Used = product REAL action (`markTourUsed`).

---

# Part 3 — Complete REAL storage key catalog

## 3.1 P0 keys (signature — isolation-critical)

| Key | Type | Written by | Payload shape (class) | Read by |
|-----|------|------------|----------------------|---------|
| `itt07-iphone-history` | JSON array | `iphone.js` browse/presets | `[{url,ts},…]` | history list |
| `itt07-gmail` | JSON object | gmail login | `{email,…}` | inbox user |
| `itt07-gmail-msgs` | JSON array | compose send | `[{to,subj,body,ts},…]` | inbox list |
| `itt07-gmail-drafts` | JSON array | draft button | draft objects | compose restore |
| `itt07-gmail-invites` | string int | invite form | remaining count | invite page |
| `itt07-streetview` | JSON object | maps SV | `{city,heading,…}` | SV status/heading |
| `itt07-maps-state` | JSON | maps pan/zoom/search | map state | maps canvas |
| `itt07-fb-apps` | JSON array | platform add/remove | `[{name,id},…]` | apps list |
| `itt07-tweets` | JSON array | twitter compose | `[{text,ts},…]` | timeline + profile |
| `itt07-yt-uploads` | JSON array | youtube upload | `[{title,desc,id},…]` | index list |
| `itt07-yt-views` | JSON object | watch/like | view map | watch page |

## 3.2 Continuity keys (must use itt07 prefix via module)

| Key class | Module | Action |
|-----------|--------|--------|
| `itt07-digg-links` | digg.js | digg/bury counts |
| `itt07-myspace-profile` | myspace.js | profile save |
| `itt07-docs` | docs.js | document save |
| `itt07-aws-buckets` | aws.js | create bucket |
| `itt07-reader-subs` | reader.js | subscribe feed |
| `itt07-flickr-stream` | flickr.js | upload title list |
| `itt07-amazon-cart` | amazon.js | cart lines |
| `itt07-auction-*` / ebay bids | auction.js | bid high bidder |
| `itt07-reddit-*` | reddit.js | boosts |
| `itt07-playable` · `-2` · `-3` | year-playable.js | three toys |
| `itt07-tour-done` | shared.js | tour visited/used |
| `itt-2007-prefs` | browser config | shell prefs (browser layer) |
| `itt-2007-bookmarks` | browser | bookmarks |
| `itt-2007-connected` | browser | connect once |

## 3.3 Isolation contract (every REAL test)

```js
// After a 2007 action:
assert(localStorage.getItem('itt07-…') has content)
assert(localStorage.getItem('itt06-…') === null for same feature)
assert(localStorage.getItem('itt08-…') === null)
```

---

# Part 4 — REAL user flows A–T (contracts)

Each flow: **period story · steps · hooks · keys · e2e · ROI · status**.

### Flow A — Enter the year · ROI **10** · **[x]**

| Field | Detail |
|-------|--------|
| Story | Visitor opens 2007 desktop shell from hub |
| Steps | 1 Hub card 2007 → 2 Skip/connect → 3 Starting Point iframe |
| Hooks | `body[data-itt-year="2007"]` · `#content` · `#skip-connect` |
| Keys | `itt-2007-connected` (browser) optional |
| e2e | `2007-mvp` shell · Flow A in `2007-flows` |
| Accept | Year attribute · iframe body length > 20 · no crash |

### Flow B — Thesis / About · ROI **10** · **[x]**

| Field | Detail |
|-------|--------|
| Story | Learn scale, bans, calendar |
| Steps | 1 Starting Point → 2 About · read scale box · bans |
| Copy must include | `121,892,559` · Chrome ban · App Store ban · iPhone · Street View · Feb 14 · May 24 |
| Keys | optional thesis multi-check `itt07-thesis-ack` if added |
| e2e | Flow B · mvp about |
| Accept | Body text matches locked facts · bans present |

### Flow C — iPhone Safari · ROI **10** · **[x]**

| Field | Detail |
|-------|--------|
| Story | Late-2007 US phone as web browser · no App Store |
| Steps | 1 about (Jan 9 · Jun 29 · prices) → 2 index form URL → 3 Go → history list · OR preset YouTube/Google/Maps |
| Hooks | `[data-iphone-browse]` · `[name="url"]` · `[data-iphone-screen]` · `[data-iphone-status]` · `[data-iphone-history]` · `[data-iphone-presets]` · `[data-iphone-preset]` |
| Key | **`itt07-iphone-history`** |
| Module | `js/immersion/iphone.js` |
| Forbidden | App Store grid · 3G as default · modern iOS chrome |
| e2e | mvp iPhone · Flow C · real-flows iPhone |
| Accept | Status shows Opened · history lists URL · reload restores · `itt06-iphone-history` null |

**Minute implement densify (open polish):**

1. Add `sites/iphone/specs.html` — 3.5″ · EDGE/Wi-Fi · 2MP · prices table · link from index.  
2. Add “broken desktop site” cards (period honesty).  
3. Keep all data-* hooks.  
4. urlMap entries in `js/config/2007.js`.  
5. e2e: optional densify path still green.

### Flow D — Gmail open · ROI **10** · **[x]**

| Field | Detail |
|-------|--------|
| Story | Feb 14 open worldwide — invites are legacy side story |
| Steps | 1 about open copy → 2 index login → 3 compose send → 4 draft → 5 invite page as share-not-gate |
| Hooks | `[data-gmail-login]` · `[data-gmail-compose]` · `[data-gmail-draft]` · `[data-gmail-list]` · `[data-gmail-invite]` · `[data-gmail-invites]` · status nodes |
| Keys | `itt07-gmail` · `itt07-gmail-msgs` · `itt07-gmail-drafts` · `itt07-gmail-invites` |
| Module | `gmail.js` |
| Forbidden | “You need an invite to use Gmail” as default product |
| e2e | Flow D · real-flows Gmail |
| Accept | Login persists email · send appends msg with subject · draft saves · invite decrements share count only |

### Flow E — Street View · ROI **10** · **[x]**

| Field | Detail |
|-------|--------|
| Story | May 2007 walk five launch cities |
| Steps | 1 maps/index CTA → 2 streetview.html → 3 click city → 4 turn left/right → heading updates |
| Hooks | `[data-sv-city="San Francisco|New York|Las Vegas|Miami|Denver"]` · `[data-sv-turn]` · `[data-sv-status]` · `[data-sv-heading]` · `[data-sv-viewer]` |
| Key | **`itt07-streetview`** |
| Module | `maps.js` |
| Cities | Exactly five launch cities |
| Date copy | Museum **May 29** (Wiki May 25 OK as note) |
| e2e | mvp SV · Flow E · real-flows |
| Accept | All five buttons · city in storage JSON · turn mutates heading · Maps index links SV |

### Flow F — Facebook Platform · ROI **10** · **[x]**

| Field | Detail |
|-------|--------|
| Story | May 24 developer platform · SuperPoke-class apps · late Beacon |
| Steps | 1 platform.html → 2 add app form → 3 list shows app → 4 remove → 5 about Beacon literacy |
| Hooks | `[data-fb-app-add]` · `[data-fb-apps]` · `[data-fb-app-remove]` · `[data-fb-app-status]` |
| Key | **`itt07-fb-apps`** |
| Module | `facebook.js` |
| e2e | mvp Platform · Flow F · real-flows |
| Accept | Add writes array · remove updates list + status · about mentions Beacon / Nov |

### Flow G — Twitter SXSW · ROI **9** · **[x]**

| Field | Detail |
|-------|--------|
| Story | March breakout · 140 · “What are you doing?” |
| Steps | 1 about SXSW → 2 compose → timeline → 3 profile reads same tweets |
| Hooks | `[data-twitter-compose]` · `[data-twitter-timeline]` · textarea/input |
| Key | **`itt07-tweets`** |
| Module | `twitter.js` |
| e2e | Flow G · real-flows |
| Accept | Tweet text in storage · profile shows same · 140-class limit honesty in copy |

**Polish [ ]:** densify `profile.html` (~1.3 KB) · third-party client note (Twitterrific class) · API lore · no modern X UI.

### Flow H — YouTube Google-owned · ROI **9** · **[x]**

| Field | Detail |
|-------|--------|
| Story | Google owns YT all year · Flash culture |
| Steps | 1 about ownership → 2 upload title → 3 list → 4 watch |
| Hooks | `[data-yt-upload]` · `[data-yt-upload-status]` · list/watch hooks |
| Keys | `itt07-yt-uploads` · `itt07-yt-views` |
| Module | `youtube.js` |
| Forbidden | “still independent this year” |
| e2e | Flow H · mvp YT · real-flows |
| Accept | Upload subject in JSON · list shows title · ownership copy correct |

### Flow I — Digg · ROI **7** · **[x]**

| Field | Detail |
|-------|--------|
| Hooks | `[data-digg-list]` · `[data-digg-up]` · `[data-digg-count]` |
| Key | `itt07-digg-links` |
| Accept | Count increments · storage truthy · not `itt06-digg-links` |

### Flow J — MySpace mass · ROI **7** · **[x]**

| Field | Detail |
|-------|--------|
| Hooks | `[data-myspace-profile-form]` · `[data-myspace-status]` |
| Key | `itt07-myspace-profile` |
| Accept | Name in storage · status saved |

### Flow K — Docs / AWS / Reader / Flickr · ROI **7** · **[x]**

| Sub | Hooks | Key |
|-----|-------|-----|
| Docs | `[data-docs-save]` | `itt07-docs` |
| AWS | `[data-aws-create]` | `itt07-aws-buckets` |
| Reader | `[data-reader-add]` · `[data-reader-subs]` | `itt07-reader-subs` |
| Flickr | `[data-flickr-upload]` | `itt07-flickr-stream` |

### Flow L — Blog RSS graph · ROI **6** · **[x]/[~]**

Blogger/WP → Bloglines/Reader → FeedBurner → Technorati → Digg.  
Implement as trail links + existing module keys. Accept: trail navigable · at least one REAL subscribe/save under `itt07-*`.

### Flow M — Amazon smile cart · ROI **6** · **[x]**

`[data-add-cart]` → `itt07-amazon-cart` (prefix via amazon.js). Accept length > 0 after add.

### Flow N — Netflix DVD + Watch Now seed · ROI **5** · **[x]** thin

DVD primary honesty · Watch Now seed line. **Polish [ ]:** multipage queue REAL `itt07-netflix-queue`.

### Flow O — Vista product · ROI **5** · **[x]**

`sites/microsoft/vista.html` · shell remains XP. Accept: not forced as default shell.

### Flow P — Android OHA note · ROI **8** (bans) · **[x]**

About timeline Nov 5 · **no phone shop**. Accept: ban mass Android phones.

### Flow Q — iPhone presets trail · ROI **8** · **[x]**

Presets open Google/Maps/YouTube/Gmail-class URLs into history. Accept: preset click writes history.

### Flow R — Beacon literacy · ROI **8** · **[x]**

FB about Nov 6 · privacy. **Polish [ ]:** multi-check REAL `itt07-beacon-ack` (≥2 honesty boxes).

### Flow S — Tour used · ROI **7** · **[x]**

After REAL product action, tour step `used`. Accept: `itt07-tour-done` object form `{visited,used}`.

### Flow T — Isolation handoff · ROI **10** · **[x]**

Cross-year: leave 2007 storage alone when opening 2006/2008. Accept: handoff e2e / no key collision.

---

# Part 5 — Phase map (complete program)

| Phase | Name | ROI | Status | Blocks A–F? |
|------:|------|----:|:------:|:-----------:|
| **0** | Inventory freeze | 10 | **[x]** | Yes if skipped |
| **1** | Research lock | 10 | **[x]** | Yes |
| **2** | Home / About / scale / bans | 10 | **[x]** | Yes |
| **3** | Gmail open REAL | 10 | **[x]** | Yes |
| **4** | iPhone REAL densify | 10 | **[x]** | Yes |
| **5** | Street View REAL densify | 10 | **[x]** | Yes |
| **6** | Facebook Platform REAL | 10 | **[x]** | Yes |
| **7** | Twitter SXSW REAL | 9 | **[x]** | Yes |
| **8** | YouTube + continuity year-truth | 9 | **[x]** | Yes |
| **9** | Vista + Android note | 8 | **[x]** | Soft |
| **10** | Connection trails wiring | 8 | **[x]** | Yes |
| **11** | Hooks + storage audit | 10 | **[x]** | Yes |
| **12** | e2e pack green | 10 | **[x]** | Yes |
| **13** | Docs / museum-grade claim | 8 | **[x]** | Soft |
| **14** | Layer C pixel harvest | 2 | **[~]** | No |
| **15** | P2 culture rooms | 4–5 | **[x]** Tumblr/Kindle · **[~]** FF/OS | No |
| **16** | Relatable voice densify | 6 | **[x]** | Soft |
| **17** | Flow map + playables | 7 | **[x]** | Soft |
| **18** | Continuity forest scrub | 3–6 | **[ ]** residual | Soft |
| **19** | Beacon multipage REAL | 8 | **[ ]** polish | Soft |
| **20** | Netflix multipage REAL | 5 | **[ ]** | No |
| **21** | FriendFeed room REAL | 4 | **[~]** | No |
| **22** | OpenSocial room | 4 | **[~]** | No |
| **23** | Perfect gates re-verify | 10 | **[ ]** after edits | Yes |
| **24** | CAPTURE close + ASSETS | 2 | **[~]** | C honesty |
| **25** | Final museum-perfect claim | 9 | **[ ]** | Ship polish |

**Densify ship baseline** = Phases **0–13 + 16–17**.  
**Museum-perfect residual** = Phases **14, 18–25**.

---


# Part 6 — Phases 0–13 (ship baseline) — minute how-to

Each phase below has: **Goal · ROI · Status · Preconditions · Files · Minute steps · REAL contracts · Acceptance · e2e · Rollback**.

---

## Phase 0 — Inventory freeze · ROI **10** · **[x]**

### Goal
Know exact disk surface so work is densify/verify, not accidental rebuild.

### Preconditions
Repo root is museum static site; Node 18+ for Playwright.

### Minute steps

1. Count HTML: `find years/2007 -name '*.html' | wc -l` → expect ~**297**.  
2. List sites: `ls years/2007/sites | wc -l` → expect ~**85–86**.  
3. Assets: `find assets/period/2007 -type f | wc -l` → expect ~**162**.  
4. Confirm hub unlock: `index.html` year card 2007 available.  
5. Confirm prefix: `grep storagePrefix js/config/immersion-2007.js` → `itt07`.  
6. List e2e: `ls e2e/2007-*.spec.js` → mvp · flows · real-flows · densify · trail.  
7. Confirm P0 dirs exist: iphone gmail maps facebook twitter youtube.  
8. Confirm `data-itt-year="2007"` on shell and start pages.  
9. Run `python3 scripts/check-all-years.py` includes 2007.  
10. Write inventory note date in CAPTURE or this bible status board.

### Acceptance
- [x] Tree live · hub unlocked · prefix `itt07` · e2e pack present  

### Rollback
None (read-only phase).

---

## Phase 1 — Research lock · ROI **10** · **[x]**

### Goal
Freeze thesis, scale, bans, timeline so implementers cannot invent dates/prices.

### Sources (must open)
- Live Stats websites table  
- Apple Newsroom 2007-01-09  
- Google Blog Gmail 2007-02-14  
- Lat Long Street View  
- Facebook Platform May 24 newsroom  
- Cybercultural Internet 2007  
- `2007-RESEARCH.md` · deep research · perfect map  

### Minute steps

1. Lock scale **121,892,559** / **1,373,327,790** in About/home.  
2. Lock bans list (Chrome · App Store · Android phones · invite-default Gmail).  
3. Lock SV cities + May 29 museum date.  
4. Lock iPhone prices $499/$599 · Jan 9 · Jun 29.  
5. Lock Platform May 24 · Beacon Nov 6.  
6. Lock YT Google-owned all year.  
7. Confirm no freehand alternate scale on home.  
8. Keep dual-date honesty note for SV May 25 vs 29 if needed.  

### Acceptance
- [x] Docs + pages cite locked numbers  
- [x] Bans listed on About  

### ROI note
Wrong scale or ban = failed museum literacy. Always ROI 10.

---

## Phase 2 — Home / About / Starting Point · ROI **10** · **[x]**

### Goal
Day-one visitor sees thesis, scale, chips, trails, tour, flow map, playables, bans.

### Files
- `years/2007/pages/home.html`  
- `years/2007/pages/about.html`  
- `years/2007/pages/whats-new.html`  
- `years/2007/pages/cool.html`  
- `years/2007/pages/map.html`  
- `css/period-2007.css` · `period-xp-ui.css`  

### Minute steps

1. Home title meta: XP · IE · iPhone · open Gmail · Street View · **121,892,559**.  
2. Thesis paragraph: phone as browser · dates Jan 9 / Jun 29 / Feb 14 / May 29 / May 24.  
3. Product chips: iPhone · Street View · Gmail · Facebook (links relative `../sites/…`).  
4. Tour host: `<div data-itt-tour></div>`.  
5. Flow map link: `map.html`.  
6. Playables strip: three toys · keys `itt07-playable*`.  
7. **Connection trails** (7): Mobile web · Open Google · Maps on street · Platforms · Video front page · Blogosphere · Who owns social — each with real in-year hrefs.  
8. Hard bans box: Chrome · App Store · Android mass · invite-only Gmail.  
9. About: scale box · full timeline · bans · day-in-life (relatable pack).  
10. What’s New: 2007 Top 10 energy (not 2006 paste).  
11. Cool: must-try period list.  
12. Assert `data-itt-year="2007"` on html.  
13. Load `immersion-2007.js` only (via start page script path).  

### REAL contracts
- Tour progress on visit paths.  
- No fake trail links (404 audit).  

### Acceptance
- [x] Body contains scale + bans + P0 product names  
- [x] All trail hrefs resolve  

### e2e
`2007-mvp` home/about · Flow B · trail suite.

---

## Phase 3 — Gmail open REAL · ROI **10** · **[x]**

### Goal
Product truth = open signup after Feb 14; invites are legacy share theater; compose/draft/login **mutate storage**.

### Files
- `years/2007/sites/gmail/*.html`  
- `js/immersion/gmail.js`  
- urlMap entries in `js/config/2007.js`  

### Minute steps

1. **index.html:** Lead with Feb 14 open worldwide. Login form `data-gmail-login` fields email/pass.  
2. On submit: write `itt07-gmail` JSON · status · navigate/inbox feel.  
3. **about.html:** Quote class “no more waiting for someone to invite you” · invite nostalgia as side story.  
4. **compose.html:** Form `data-gmail-compose` · fields to/subject/body · Send writes `itt07-gmail-msgs`.  
5. Draft button `data-gmail-draft` → `itt07-gmail-drafts` · status “Draft saved”.  
6. Empty send **blocked** (module must require subject or body).  
7. **inbox.html:** `data-gmail-list` renders msgs from storage.  
8. **invite.html:** Title “legacy invites” · not gate · `data-gmail-invite` decrements `itt07-gmail-invites` from 6.  
9. Cross-links: Inbox · Compose · Invites · About · Starting Point.  
10. Period voice: 1GB+ free · search don’t sort · conversations · still beta-era optional note.  
11. Isolation: never write `itt06-gmail*`.  

### REAL contract (must pass)

| Action | Min steps | Key | Content required |
|--------|-----------|-----|------------------|
| Login | email filled + submit | `itt07-gmail` | email string |
| Send | to/subj/body + submit | `itt07-gmail-msgs` | subject substring |
| Draft | body/subj + draft click | `itt07-gmail-drafts` | draft subject |
| Invite share | form submit | `itt07-gmail-invites` | integer string |

### Acceptance
- [x] Open-default copy  
- [x] All three keys mutate  
- [x] e2e Flow D green  

### e2e
`2007-flows` Flow D · `2007-real-flows` Gmail.

---

## Phase 4 — iPhone REAL densify · ROI **10** · **[x]**

### Goal
Announce → ship → Safari web theater with **persistent history**; **no App Store**.

### Files
- `years/2007/sites/iphone/index.html`  
- `years/2007/sites/iphone/about.html`  
- `js/immersion/iphone.js`  
- dirbar/nav: immersion config iPhone entry  

### Minute steps

1. **about.html:** Jan 9 Macworld · three-in-one pitch · multi-touch · $499/$599 · Cingular · Jun 29 ship · **No App Store (July 2008)** · EDGE/Wi-Fi · Safari.  
2. **index.html:** Black phone shell CSS · honesty note · form `data-iphone-browse` · input name=url · Go button.  
3. Screen `data-iphone-screen` · status `data-iphone-status` · history `data-iphone-history`.  
4. Presets host `data-iphone-presets` filled by JS (Google · Maps · YouTube · Wikipedia class).  
5. `iphone.js`: on submit, push `{url,ts}` to `itt07-iphone-history` · render list · status “Opened · saved in itt07-iphone-history”.  
6. History click re-opens URL in theater.  
7. Links: Street View · Apple.com · Starting Point.  
8. Desktop frame note: this is website-in-IE, not full iOS simulator.  
9. **Densify open [ ]:** specs.html multipage · broken-site cards · more presets.  
10. urlMap: `sites/iphone/*.html` → period apple.com/iphone URLs.  

### REAL contract

| Action | Key | Assert |
|--------|-----|--------|
| Go | `itt07-iphone-history` | JSON array includes URL host |
| Preset | same | includes preset target |
| Reload | same | history list still populated |
| Isolation | — | `itt06-iphone-history` null |

### Acceptance
- [x] No App Store honesty  
- [x] History persists  
- [x] mvp + Flow C green  

### Primary copy bank (Apple PR)
- “revolutionary mobile phone, a widescreen iPod … and a breakthrough Internet communications device”  
- Multi-touch fingers  
- Safari desktop-class web  
- Google Maps on device  
- Cingular exclusive US  
- June 2007 availability  

---

## Phase 5 — Street View REAL densify · ROI **10** · **[x]**

### Goal
Maps feature of May 2007: five cities + turn state in **`itt07-streetview`**.

### Files
- `sites/maps/streetview.html`  
- `sites/maps/index.html`  
- `sites/maps/about.html`  
- `sites/maps/mashups.html`  
- `js/immersion/maps.js`  

### Minute steps

1. streetview.html: five buttons with exact `data-sv-city` values:  
   `San Francisco` · `New York` · `Las Vegas` · `Miami` · `Denver`.  
2. Turn controls `data-sv-turn="left|right"`.  
3. Status `data-sv-status` · heading `data-sv-heading` · viewer `data-sv-viewer`.  
4. maps.js: load prior state from `itt07-streetview` · on city click set city · save · on turn adjust heading degrees · save.  
5. maps/index.html: **obvious** CTA “Street View (May 2007)” → streetview.html (not banned).  
6. about.html: Ajax Maps + SV thesis (densify if thin ~1 KB).  
7. mashups: HousingMaps link continuity.  
8. No live tiles — theater only · period honesty line.  
9. Date: prefer May 29 museum; optional footnote May 25 wiki.  

### REAL contract

| Action | Storage fields | DOM |
|--------|----------------|-----|
| City click | `{city:"Miami",…}` | status contains Miami |
| Turn right | heading changes | heading el updates |
| Reload | restores city | viewer data-sv-active-city |

### Acceptance
- [x] Five cities · storage · Maps handoff · Flow E green  

---

## Phase 6 — Facebook Platform REAL · ROI **10** · **[x]**

### Goal
May 24 platform: add/remove apps with **`itt07-fb-apps`**; Beacon honesty late year.

### Files
- `sites/facebook/platform.html`  
- `sites/facebook/about.html`  
- `sites/facebook/feed.html` · profile · open · index  
- `js/immersion/facebook.js`  

### Minute steps

1. platform.html: intro May 24 · social graph · SuperPoke-class options.  
2. Form `data-fb-app-add` with select/input app name · submit adds to list.  
3. List host `data-fb-apps` · each row remove `data-fb-app-remove`.  
4. Status `data-fb-app-status` on remove “Removed…”.  
5. Empty add blocked if no selection.  
6. about.html: Beacon Nov 6 · partner sites · privacy · MoveOn-class lore · **not** modern React feed.  
7. feed.html: continuity News Feed · links to platform.  
8. Scale honesty: FB ~24M · MySpace ~67M class (cite).  
9. Blue/white period UI · not modern FB.  

### REAL contract

| Action | Key | Assert |
|--------|-----|--------|
| Add SuperPoke | `itt07-fb-apps` | JSON includes name |
| Remove | same | array shrinks · status Removed |
| Reload | same | list restored |

### Acceptance
- [x] Add+remove · Beacon copy · Flow F green  

### Primary facts (Meta May 24, 2007)
- 65+ developer partners · 85 applications class  
- Deep integration into social graph  

---

## Phase 7 — Twitter SXSW REAL · ROI **9** · **[x]**

### Goal
Growth-year Twitter: compose → timeline → profile; SXSW story.

### Files
- `sites/twitter/index.html` · `about.html` · `profile.html`  
- `js/immersion/twitter.js`  

### Minute steps

1. about: March SXSW · plasmas · SMS shortcode · award lore · still Obvious→Twitter Inc April class.  
2. index: compose form `data-twitter-compose` · 140 honesty · prompt “What are you doing?”  
3. Timeline `data-twitter-timeline` renders from `itt07-tweets`.  
4. profile: reads same key · densify if thin.  
5. Empty tweet blocked.  
6. Optional: third-party client note (Twitterrific class) — API drove traffic.  
7. No For You · no blue checks · no long posts.  

### REAL contract
Compose → `itt07-tweets` contains message → profile contains message.

### Acceptance
- [x] Flow G green · **[ ]** profile densify polish  

---

## Phase 8 — YouTube + continuity year-truth · ROI **9** · **[x]**

### Goal
No “independent YouTube”; Google-owned all year; Flash culture; upload REAL.

### Minute steps

1. youtube/about.html: deal close Nov 13, 2006 → **all of 2007 under Google**. Explicit “Not still independent this year.”  
2. upload.html: `data-yt-upload` title/desc · write `itt07-yt-uploads`.  
3. index list + watch views `itt07-yt-views`.  
4. Handoff links to Digg/Reddit submit with title query.  
5. Grep residual: `googlevideo`, mashable, clone forests for “independent YT” or “2006 only”.  
6. Netflix: DVD primary + Watch Now seed.  
7. MySpace still mass early/mid year class.  
8. Digg still strong.  

### Acceptance
- [x] Ownership copy · upload REAL · Flow H green  

---

## Phase 9 — Vista + Android note · ROI **8** · **[x]**

### Goal
Vista retail real; XP shell default; Android announce-only.

### Minute steps

1. `sites/microsoft/vista.html` product room Aero/UAC lore.  
2. Shell `years/2007/index.html` stays XP/IE classes.  
3. About timeline: Jan 30 Vista · Nov 5 OHA · **ban mass phones**.  
4. No Android phone product grid.  

### Acceptance
- [x] About bans Android mass · Vista not sole shell  

---

## Phase 10 — Connection trails · ROI **8** · **[x]**

### Goal
Home multi-product trails match 2007 life (see CONNECTIONS doc).

### Minute steps

1. Ensure 7 trails on home with working hrefs.  
2. Bridges: Maps↔SV · Gmail↔Maps · Platform↔Feed · YT↔Digg · iPhone presets.  
3. Document in CONNECTIONS md.  
4. e2e trail-real-flows follows ≥1 full path to storage.  

### Acceptance
- [x] Trails live · trail e2e green  

---

## Phase 11 — Hooks + storage audit · ROI **10** · **[x]**

### Goal
Every signature flow mutates **`itt07` only**.

### Minute steps

1. Grep modules for hardcoded `itt06` / `itt05` fallbacks used as primary.  
2. Fix streetview key to use year util (`immersionStorageKey("streetview", "itt07")`).  
3. Manual matrix: for each Flow C–K, clear keys → act → assert key → assert sibling year null.  
4. Ensure actionFeedback/status on saves.  
5. Empty form blocked on P0.  

### Acceptance
- [x] Isolation holds · real-flows green  

---

## Phase 12 — Hard e2e pack · ROI **10** · **[x]**

### Commands

```bash
python3 -m http.server 8080 --bind 127.0.0.1
npx playwright test e2e/2007-mvp.spec.js e2e/2007-flows.spec.js \
  e2e/2007-real-flows.spec.js e2e/2007-densify.spec.js \
  e2e/2007-trail-real-flows.spec.js e2e/hub-years.spec.js --workers=1
# or: npm run test:e2e:2007
```

### Acceptance
- [x] All green before residual polish claims  

---

## Phase 13 — Docs + museum-grade claim · ROI **8** · **[x]**

### Minute steps

1. Update `2007-MUSEUM-GRADE.md` residual honest.  
2. TO-100 YEAR-2007 residual.  
3. Point to perfect map + this bible.  
4. Do not claim L4 pixels done if CAPTURE open.  

### Acceptance
- [x] Docs match disk  

---


# Part 7 — Phases 14–25 (museum-perfect residual) — minute how-to

---

## Phase 14 — Layer C pixel harvest · ROI **2** · **[~]**

### Goal
Honest P0 brand pixels from WA/evolt/WDM or **failed-final**.

### CAPTURE rows

| ID | Target | WA window | Dest | Status |
|----|--------|-----------|------|--------|
| C07-01 | iPhone product still | apple.com/iphone mid–late 2007 | `assets/period/2007/iphone/` | **[~] open** |
| C07-02 | Street View / pegman | maps.google.com 2007 | `assets/period/2007/maps/` | **[~] open** |
| C07-03 | FB Platform chrome | facebook.com mid-2007 | `assets/period/2007/facebook/` | **[~] open** |
| C07-04 | Twitter sparse UI | twitter.com 2007 | `assets/period/2007/twitter/` | **[~] open** |
| C07-05 | Gmail open chrome | gmail.com Feb–Jun 2007 | gmail/ | **[~] open** |
| C07-06 | Vista product | microsoft.com/windows/vista | microsoft/ | **[~] open** |
| C07-07 | YouTube 2007 | youtube.com 2007 | youtube/ | partial |
| C07-08 | Kindle | amazon kindle Nov 2007 | amazon/ | optional |

### Minute harvest steps (every ID)

1. Open `web.archive.org/web/*/http://TARGET` filter **2007**.  
2. Pick mid-year or event-correct capture (not 2008 App Store).  
3. Open `id_` view → find logo/chrome image URLs.  
4. Download: `curl -L -o /tmp/x.gif 'https://web.archive.org/web/{ts}id_/{orig}'`.  
5. `file /tmp/x.gif` must say GIF/JPEG/PNG (not HTML).  
6. Install to assets path · keep RECON if failed.  
7. CAPTURE-LOG: `[wa]` ts + URL **or** `[failed-final]` reason.  
8. Wire HTML `<img src="../../../../assets/period/2007/...">` dimensions period-true.  
9. Never claim RECON as WA.  
10. Re-run authenticity script.  

### Acceptance
- [ ] Each P0 brand has `[wa]` or honest `[failed-final]`  
- [ ] No invented pixels  

### ROI note
Does not block museum-ready A–F if failed-final honesty exists.

---

## Phase 15 — P2 culture rooms · ROI **4–5** · partial **[x]/[~]**

### 15A Tumblr · ROI **5** · **[x]** thin

| Field | Detail |
|-------|--------|
| Path | `sites/tumblr/index.html` |
| Goal | Tumblelogs “blogs with less fuss” · Live Stats birthmark |
| REAL polish **[ ]** | Multipage: index · dash · new post → `itt07-tumblr-posts` JSON |
| Hooks | `data-tumblr-compose` · `data-tumblr-list` · status |
| urlMap | add tumblr paths |
| Home | directory link already or add |

### 15B Kindle · ROI **5** · **[x]** thin

| Field | Detail |
|-------|--------|
| Path | `sites/amazon/kindle.html` |
| Facts | Nov 19 2007 · $399 · sold out ~hours class |
| REAL polish **[ ]** | Claim literacy multi-check `itt07-kindle-ack` ≥2 boxes |
| Ban | Kindle Fire · modern store |

### 15C FriendFeed · ROI **4** · **[~]**

### Goal
Oct 2007 geek feed aggregator — connection product.

### Minute build recipe

1. Create `years/2007/sites/friendfeed/index.html` + `about.html`.  
2. About: aggregates Twitter, blogs, Flickr, Digg · Oct launch · geek cult.  
3. Index: checklist of sources · REAL save `itt07-friendfeed-sources` JSON array after ≥2 checks.  
4. Hooks: `data-ff-source` checkboxes · `data-ff-save` · `data-ff-status`.  
5. Prefer multipage REAL without new module: `data-itt-real-save data-storage-key="friendfeed-sources"`.  
6. urlMap + home directory + connections trail “Status streams”.  
7. e2e densify test: check 2 · save · key content.  
8. No live OAuth.  

### 15D OpenSocial · ROI **4** · **[~]**

1. `sites/opensocial/index.html` · about.  
2. Narrative: Google multi-network apps · answer to FB Platform · MySpace join class.  
3. Bridge to 2008 Friend Connect (ban claiming 2007 Friend Connect mass).  
4. REAL: literacy ack `itt07-opensocial-ack` multi-check.  
5. Links: Platform · MySpace · Google.  

### Acceptance Phase 15
- [x] Tumblr/Kindle thin exist  
- [ ] FriendFeed/OpenSocial if executing perfect culture  
- [ ] Any new room has REAL key + e2e  

---

## Phase 16 — Relatable voice · ROI **6** · **[x]**

### Goal
Period daily life language on About / whats-new / cool / P0 abouts.

### Source pack
`2007-RELATABLE-CONTENT-AND-PERIOD-VOICE-2026-07-31.md`

### Minute steps

1. Apply voice kits: iPhone · Gmail · SV · Platform · Beacon · Twitter · YT · Vista.  
2. Slang: Web 2.0 · Digg it · Top 8 · 140 · Flash · EDGE — not Chrome/App Store.  
3. Personas: student · worker · SXSW · late-adopter.  
4. Calendar spine on About.  
5. Avoid “museum theater” lead sentences on product rooms.  

### Acceptance
- [x] Voice pack applied on signature pages  

---

## Phase 17 — Flow map + playables · ROI **7** · **[x]**

### Goal
UX tree literacy + three year toys with REAL scores.

### Files
- `pages/map.html` · `[data-itt-flow-map]`  
- `js/config/flow-maps.js` year 2007  
- `sites/playable/index.html`  
- `year-playable.js` games for 2007  

### Minute steps

1. Verify flow map data thesis/shell/branches match P0.  
2. Each leaf `href` exists.  
3. Playables: keys `itt07-playable` · `-2` · `-3` write on win.  
4. Home links to map + playables.  
5. e2e flow-maps sample + playable optional.  

### REAL contract
Playable win → localStorage non-empty score/state.

### Acceptance
- [x] Map renders · playables linked  

---

## Phase 18 — Continuity forest scrub · ROI **3–6** · **[ ]** residual

### Goal
Top thin stubs on signature paths get year-true 2007 voice (not 2003/2005 paste).

### Priority scrub list (ROI order)

| ROI | Path | Work |
|----:|------|------|
| 6 | `maps/about.html` | Expand Ajax+SV thesis |
| 6 | `twitter/profile.html` | Timeline densify |
| 5 | `netflix/index.html` | DVD + Watch Now multipage |
| 5 | `docs/about.html` · edit | Year voice |
| 5 | `reader/about.html` | Gmail-ish unread lore 2007 |
| 4 | `digg/about.html` | Still strong 2007 |
| 4 | `myspace/profile.html` | Mass still · FB rising |
| 4 | `flickr/*` thin | Yahoo-owned |
| 3 | `wordpress/*` thin | 2007 version theater |
| 3 | `microsoft/ie6.html` etc. | Residual honesty XP year |
| 3 | googlevideo | Must not say YT independent |

### Minute method per file

1. Open file · note byte size.  
2. Read parent year copy risk (2005/2006).  
3. Rewrite title + 2–4 paragraphs year-true.  
4. Keep all data-* hooks.  
5. Add footer link to Starting Point + related trail.  
6. If interactive, ensure REAL key.  
7. Spot e2e if P0-adjacent.  

### Acceptance
- [ ] Signature-path thins densified  
- [ ] No wrong-year ownership claims  

---

## Phase 19 — Beacon multipage REAL · ROI **8** · **[ ]**

### Goal
Beacon is multi-step literacy with storage — not soft paragraph only.

### Minute steps

1. `sites/facebook/beacon.html` (new) or densify about section.  
2. Honesty checks (≥2): off-site publish · partner sites · privacy surprise.  
3. REAL save `itt07-beacon-ack` via `data-itt-real-save` or facebook.js.  
4. Link from Platform + about + trail Platforms.  
5. urlMap entry.  
6. e2e densify: cannot save with 0 checks · save with 2 writes key.  

### Acceptance
- [ ] Key written only after ≥2 checks  
- [ ] Trail linked  

---

## Phase 20 — Netflix multipage REAL · ROI **5** · **[ ]**

### Goal
DVD-by-mail primary queue theater + Watch Now seed honesty.

### Minute steps

1. `sites/netflix/index.html` — DVD primary pitch.  
2. `queue.html` — add title form → `itt07-netflix-queue` JSON.  
3. `watchnow.html` — limited electronic delivery seed · **not** streaming-first.  
4. Hooks: `data-netflix-add` · `data-netflix-queue` · status.  
5. Module: extend netflix.js if present or real-save panel.  
6. e2e: add title · key contains title.  

### Acceptance
- [ ] Queue REAL · streaming not primary  

---

## Phase 21 — FriendFeed room · ROI **4** · **[~]**

Execute Phase 15C fully · wire home · connections · e2e densify snippet.

---

## Phase 22 — OpenSocial room · ROI **4** · **[~]**

Execute Phase 15D fully · link Platform vs OpenSocial narrative.

---

## Phase 23 — Perfect gates re-verify · ROI **10** · **[ ]** after edits

### Full gate suite

```bash
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py
python3 scripts/smoke-production.py
python3 scripts/audit-internal-links.py   # if available

npx playwright test e2e/2007-*.spec.js e2e/hub-years.spec.js \
  e2e/year-signature-flows.spec.js -g "2007" --workers=1

npm run test:e2e:2007
```

### Manual smoke (5 min)

1. Hub → 2007 → skip connect.  
2. Trail Mobile web → iPhone Go → history.  
3. Gmail login + compose.  
4. Maps → Street View → Miami → turn.  
5. Platform add/remove.  
6. Twitter compose → profile.  
7. YouTube upload.  
8. DevTools Application: only `itt07-*` for those features.  

### Acceptance
- [ ] All automated green  
- [ ] Manual smoke pass  

---

## Phase 24 — CAPTURE close + ASSETS · ROI **2** · **[~]**

1. Every C07 row terminal status.  
2. Update ARTIFACTS-MAP residual R-list closed/optional.  
3. README-PIXELS honesty for 2007 (fix scaffold “2005” text if present).  

---

## Phase 25 — Final museum-perfect claim · ROI **9** · **[ ]**

### Checklist

- [ ] Layers A–F pass  
- [ ] All P0 REAL flows multi-step with content keys  
- [ ] Isolation verified  
- [ ] No mock soft buttons on P0  
- [ ] CAPTURE honest  
- [ ] e2e pack green  
- [ ] `2007-MUSEUM-GRADE.md` residual = L4 only  
- [ ] This bible status marks updated  

### Claim language

> **2007 is museum-ready / museum-perfect residual closed** except L4 optional brand stills (never invent).

---


# Part 8 — Product multipage build recipes (P0 perfect)

## 8.1 iPhone multipage target tree

```
sites/iphone/
  about.html      # Jan 9 announce kit
  index.html      # Safari theater REAL
  specs.html      # [ ] hardware/radio/prices table
  safari.html     # [ ] optional broken-web honesty
```

| Page | REAL? | Key |
|------|-------|-----|
| about | literacy optional | — |
| index | **YES** | `itt07-iphone-history` |
| specs | optional ack | `itt07-iphone-specs-ack` multi-check |

**Copy bank (must include):** multi-touch · Safari · no App Store · $499/$599 · Cingular · Jun 29 · EDGE/Wi-Fi · Google Maps on device · Visual Voicemail lore optional.

## 8.2 Gmail multipage tree (shipped)

```
sites/gmail/
  index.html about.html inbox.html compose.html invite.html
```

All REAL paths covered in Phase 3. Maintain open-default copy forever.

## 8.3 Maps / Street View tree

```
sites/maps/
  index.html streetview.html about.html mashups.html
```

| Page | REAL |
|------|------|
| index search/pan | `itt07-maps-state` if canvas hooks present |
| streetview | **`itt07-streetview` required** |
| mashups | link HousingMaps |

## 8.4 Facebook tree

```
sites/facebook/
  index open feed profile friends invite networks platform about
  beacon.html   # [ ] Phase 19
```

Platform REAL required. Beacon REAL preferred for perfect.

## 8.5 Twitter tree

```
sites/twitter/
  index.html about.html profile.html
```

Compose REAL required. Profile must **read** `itt07-tweets` (not empty static).

## 8.6 YouTube tree

```
sites/youtube/
  index about upload watch channels
```

Upload REAL required. About ownership required.

---

# Part 9 — Connection trails (implement detail)

## Trail 1 — Mobile web · ROI **9**

```
iphone/about.html → iphone/index.html → preset Maps → maps/streetview.html
                                     → preset YouTube → youtube/index.html
                                     → preset Google
```

Assert: history key has ≥1 entry after Safari Go.

## Trail 2 — Open Google · ROI **8**

```
gmail/about → gmail/index login → compose → maps/index → docs or reader
```

## Trail 3 — Maps on street · ROI **10**

```
maps/index → streetview → city Miami → turn → housingmaps
```

## Trail 4 — Platforms & status · ROI **9**

```
facebook/platform add app → feed → twitter compose → facebook/about Beacon
```

## Trail 5 — Video front page · ROI **7**

```
youtube/upload → index → digg (handoff) → reddit
```

## Trail 6 — Blogosphere · ROI **6**

```
blogger or wordpress → bloglines/reader → feedburner → technorati → digg
```

## Trail 7 — Who owns social · ROI **7**

```
myspace → facebook/open → platform → about (Beacon)
```

Home must list all seven with working anchors.

---

# Part 10 — e2e matrix (what each file proves)

| Spec file | Proves |
|-----------|--------|
| `2007-mvp.spec.js` | Shell · home P0 names · about bans · iPhone history · Gmail open · SV city · Platform add · YT ownership |
| `2007-flows.spec.js` | Flows A–T period contracts |
| `2007-real-flows.spec.js` | Hard storage mutations P0 + Digg/MySpace |
| `2007-densify.spec.js` | Multipage densify paths |
| `2007-trail-real-flows.spec.js` | Home trail → product → storage |
| `hub-years.spec.js` | 2007 card unlocked |
| `year-signature-flows` | Cross harness 2007 signatures if listed |

### When editing HTML hooks

1. Grep e2e for the selector.  
2. Update e2e if you rename `data-*`.  
3. Prefer keeping selectors stable.  
4. Never weaken REAL assert to soft text-only.

---

# Part 11 — Shell / browser config checklist

### `js/config/2007.js`

| Field | Expectation |
|-------|-------------|
| year | `"2007"` |
| home | `pages/home.html` |
| storage prefs keys | `itt-2007-*` |
| immersionScript | `js/immersion-2007.js` |
| connectMode | broadband class (period) |
| browserTitleSuffix | IE class |
| urlMap | **complete** for every content HTML path |
| defaultBookmarks | 2007 products |
| perf | period budgets |

### Minute urlMap rule

Every new HTML under `years/2007/` **must** get a urlMap entry or smoke fails.

```js
"sites/friendfeed/index.html": "http://friendfeed.com/",
```

### Shell DOM must keep

- `#connect-overlay` · `#connect-btn` · `#skip-connect`  
- `#content` iframe  
- menus / dialogs compatible with `browser/create.js`  
- `data-itt-year="2007"`  

---

# Part 12 — Period visual grammar

### Shell assets

`assets/period/2007/xp/start.gif` · `taskbar.gif` · `chrome/btn-*.gif` · throbber.

### Product logos (prefer logo-wa.*)

gmail · maps · facebook · youtube · digg · myspace · flickr · google · netflix · amazon smile · itunes badge-99.

### CSS

- `period-2007.css` document styles  
- XP Starting Point `.itt-start` · chips · trails via `period-xp-ui.css` chain  
- Product pages may use lite CSS for speed  

### Flash / feedback eras

`shared.js` periodEra for 2007 → web2 XP info bar class for actionFeedback.

---

# Part 13 — Sources bank (implement citation)

| Topic | URL |
|-------|-----|
| Scale | https://www.internetlivestats.com/total-number-of-websites/ |
| Year essay | https://cybercultural.com/p/internet-2007/ |
| iPhone PR | https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone/ |
| Gmail open | https://googleblog.blogspot.com/2007/02/from-gmail-with-3.html |
| Street View | https://maps.googleblog.com/2007/05/introducing-street-view.html |
| Street View wiki | https://en.wikipedia.org/wiki/Google_Street_View |
| FB Platform | https://about.fb.com/news/2007/05/facebook-unveils-platform-for-developers-of-social-applications/ |
| FB history | https://en.wikipedia.org/wiki/History_of_Facebook |
| Twitter SXSW | https://www.wired.com/2007/03/twitter-is-ruling-sxsw/ |
| Twitter 2007 essay | https://cybercultural.com/p/twitter-in-2007-the-open-platform/ |
| Vista | Microsoft Source 2007-01-29 |
| Android OHA | openhandsetalliance.com press 110507 |
| Wayback | https://web.archive.org/ |
| WDM | https://www.webdesignmuseum.org/ |
| GUIdebook | https://guidebookgallery.org/ |
| evolt | https://browsers.evolt.org/ |

---

# Part 14 — Anti-regression checklist (every PR/edit)

- [ ] No App Store UI as 2007 default  
- [ ] No Chrome as 2007 default browser product  
- [ ] No Android phone shop  
- [ ] Gmail open (not invite-gate)  
- [ ] YT Google-owned all year  
- [ ] SV five cities exact names  
- [ ] All P0 saves write `itt07-*` with content  
- [ ] No `itt06` primary keys on 2007 actions  
- [ ] data-* hooks preserved  
- [ ] urlMap updated for new pages  
- [ ] e2e 2007 pack green  
- [ ] Period voice (no modern X/FB/iOS)  
- [ ] CAPTURE updated if new images  

---

# Part 15 — Status board (update as you work)

| Phase | Status | Notes |
|------:|:------:|-------|
| 0–13 | **[x]** | Ship densify baseline |
| 14 | **[~]** | C07 harvest open (L4 forever — no invent) |
| 15 Tumblr/Kindle | **[x]** | REAL publish + literacy 2026-08-06 |
| 15 FF/OS | **[x]** | FriendFeed + OpenSocial REAL 2026-08-06 |
| 16–17 | **[x]** | voice · map · playables |
| 18 | **[x]** | maps/about · twitter/profile densify (signature path) |
| 19 Beacon REAL | **[x]** | `beacon.html` multi-check |
| 20 Netflix REAL | **[x]** | empty blocked + watchnow literacy |
| 21–22 | **[x]** | shipped as Phase 15 FF/OS |
| 23–25 | **[x]** | e2e **79 passed** · docs updated 2026-08-06 |

**Overall:** ~**99–100%** museum content under A–F · residual = **L4 pixels only**.

---

# Part 16 — Autonomous work order (agents)

```
IF user wants perfect 2007:
  1. Phase 23 baseline freeze (prove green first)
  2. Phase 11 re-audit isolation + grep bans (ROI 10)
  3. Phase 19 Beacon REAL (ROI 8)
  4. Phase 18 high-ROI thins: maps/about · twitter/profile · netflix (ROI 5–6)
  5. Phase 4 densify iPhone specs multipage (ROI 8)
  6. Phase 20 Netflix queue REAL
  7. Phase 15C/D FriendFeed + OpenSocial if culture requested
  8. Phase 14 harvest only if pixel polish requested
  9. Phase 23 full gates
  10. Phase 24–25 docs claim
NEVER invent pixels
NEVER weaken e2e REAL asserts
NEVER git commit unless asked
```

---

# Part 17 — Glossary

| Term | Meaning |
|------|---------|
| REAL | Mutates `itt07-*` with content + DOM feedback |
| Mock | Soft UI without durable state (forbidden on P0) |
| Theater | Intentional localStorage simulation of period product |
| Continuity | Product from earlier year still used in 2007 |
| failed-final | Harvest failed · RECON kept · never invent |
| L4 | Forever optional pixel perfection |
| P0 | Signature year products |
| urlMap | Browser chrome URL display map |
| Isolation | Year storage prefixes never collide |

---

# Part 18 — Legal & scope

Educational reconstruction. No real accounts, payments, map tiles, App Store binaries, cellular networks, or copyrighted media payloads. Trademarks for historical illustration only. All interactions **localStorage only** under **`itt07`**.

---

*End of 2007 museum-grade implement bible. Prefer this file for phase-by-phase work; prefer DISK-TRUTH + this status board over stale “MVP incomplete” language.*


---

# Part 19 — Minute HTML hook templates (copy patterns)

Use these patterns when densifying. Keep attribute names stable for e2e.

## 19.1 iPhone browse (REAL)

```html
<form data-iphone-browse action="#">
  Address:
  <input name="url" size="40" value="http://www.google.com/">
  <button type="submit">Go</button>
</form>
<div data-iphone-screen>Safari · multi-touch theater</div>
<div data-iphone-status></div>
<div data-iphone-history></div>
<div data-iphone-presets></div>
<!-- module fills presets; writes itt07-iphone-history -->
```

## 19.2 Gmail login + compose (REAL)

```html
<form data-gmail-login action="#">
  Email <input name="email"> Password <input name="pass" type="password">
  <button type="submit">Sign in</button>
</form>
<p data-gmail-status></p>

<form data-gmail-compose action="#">
  To <input name="to">
  Subject <input name="subject">
  <textarea name="body"></textarea>
  <button type="submit">Send</button>
  <button type="button" data-gmail-draft>Save Draft</button>
</form>
<p data-gmail-compose-status></p>
```

## 19.3 Street View (REAL)

```html
<button type="button" data-sv-city="San Francisco">San Francisco</button>
<button type="button" data-sv-city="New York">New York</button>
<button type="button" data-sv-city="Las Vegas">Las Vegas</button>
<button type="button" data-sv-city="Miami">Miami</button>
<button type="button" data-sv-city="Denver">Denver</button>
<button type="button" data-sv-turn="left">Turn left</button>
<button type="button" data-sv-turn="right">Turn right</button>
<div data-sv-viewer></div>
<p data-sv-status></p>
<p data-sv-heading></p>
```

**Critical:** City strings must match e2e exactly (spelling + spaces).

## 19.4 Facebook Platform (REAL)

```html
<form data-fb-app-add action="#">
  <select name="app">
    <option>SuperPoke!</option>
    <option>iLike</option>
    <option>Causes</option>
    <option>Quizzes</option>
  </select>
  <button type="submit">Add application</button>
</form>
<div data-fb-apps></div>
<p data-fb-app-status></p>
<!-- remove buttons injected: data-fb-app-remove -->
```

## 19.5 Twitter compose (REAL)

```html
<form data-twitter-compose action="#">
  <label>What are you doing?</label>
  <textarea name="status" maxlength="140"></textarea>
  <button type="submit">Update</button>
</form>
<div data-twitter-timeline></div>
```

## 19.6 YouTube upload (REAL)

```html
<form data-yt-upload action="#">
  Title <input name="title">
  Description <textarea name="desc"></textarea>
  <button type="submit">Upload Video</button>
</form>
<p data-yt-upload-status></p>
```

## 19.7 Multipage REAL literacy panel (no new module)

```html
<section class="itt-real-panel">
  <p>Before you continue, confirm you understand:</p>
  <label><input type="checkbox" data-req data-req-id="1"> Partner sites could publish to my feed</label>
  <label><input type="checkbox" data-req data-req-id="2"> Privacy surprise was real in Nov 2007</label>
  <button type="button"
    data-itt-real-save
    data-storage-key="beacon-ack"
    data-requires="[data-req]"
    data-min-req="2">Save literacy note</button>
  <p data-itt-action-status></p>
</section>
<!-- expects shared/real-save support writing itt07-beacon-ack -->
```

If `data-itt-real-save` not wired in 2007 shared path, implement in feature module or `shared.js` helper consistently with other years — **still must write localStorage**.

## 19.8 Digg (REAL)

```html
<div data-digg-list>
  <!-- rows with data-digg-up="0" data-digg-count="0" -->
</div>
```

## 19.9 MySpace profile (REAL)

```html
<form data-myspace-profile-form>
  Display name <input name="name">
  <input type="submit" value="Save Profile">
</form>
<p data-myspace-status></p>
```

## 19.10 Docs / AWS / Reader / Flickr

```html
<!-- Docs -->
<form data-docs-save><input name="title"><textarea name="body"></textarea>
<button type="submit">Save</button></form>
<p data-docs-status></p>

<!-- AWS -->
<form data-aws-create><input name="name"><button type="submit">Create bucket</button></form>
<p data-aws-status></p>

<!-- Reader -->
<form data-reader-add><input name="feed"><button type="submit">Subscribe</button></form>
<ul data-reader-subs></ul>
<p data-reader-status></p>

<!-- Flickr -->
<form data-flickr-upload><input name="title"><button type="submit">Upload</button></form>
```

---

# Part 20 — Minute e2e recipes (authoring)

## 20.1 Standard clear + act + assert

```js
async function clearKeys(page, keys) {
  await page.evaluate((ks) => ks.forEach((k) => localStorage.removeItem(k)), keys);
}

// 1 clear, 2 goto, 3 wait hook, 4 act, 5 status, 6 storage content, 7 isolation
await clearKeys(page, ['itt07-iphone-history']);
await page.goto('/years/2007/sites/iphone/index.html');
await page.waitForSelector('[data-iphone-browse]', { timeout: 20000 });
await page.fill('[name="url"]', 'http://www.wikipedia.org/');
await page.locator('[data-iphone-browse] button[type="submit"]').click();
await expect(page.locator('[data-iphone-status]')).toContainText(/Opened|itt07/i);
const raw = await page.evaluate(() => localStorage.getItem('itt07-iphone-history'));
expect(raw || '').toMatch(/wikipedia/i);
expect(await page.evaluate(() => localStorage.getItem('itt06-iphone-history'))).toBeNull();
```

## 20.2 Multi-check REAL gate test

```js
// 0 checks → no key
await page.locator('[data-itt-real-save]').click();
expect(await page.evaluate(() => localStorage.getItem('itt07-beacon-ack'))).toBeFalsy();
// 2 checks → key
await page.locator('[data-req]').nth(0).check();
await page.locator('[data-req]').nth(1).check();
await page.locator('[data-itt-real-save]').click();
expect(await page.evaluate(() => localStorage.getItem('itt07-beacon-ack'))).toBeTruthy();
```

## 20.3 Trail test skeleton

```js
await enterYear(page, '2007');
await goImmersion(page, '2007', 'pages/home.html');
// click trail link Street View
await goInFrame(page, 'sites/maps/streetview.html');
await page.locator('[data-sv-city="Denver"]').click();
expect(await page.evaluate(() => localStorage.getItem('itt07-streetview'))).toMatch(/Denver/);
```

## 20.4 When to add a new e2e file vs extend

| Change | Action |
|--------|--------|
| New P0 REAL hook | Extend `2007-real-flows` + `2007-flows` |
| New multipage densify | Extend `2007-densify` |
| New home trail | Extend `2007-trail-real-flows` |
| New optional culture room | Add tests in densify or new `2007-culture.spec.js` |
| Rename data-* | Update **all** e2e greps first |

---

# Part 21 — Module-level implement notes

## 21.1 `iphone.js`

| Function class | Behavior |
|----------------|----------|
| storageKey | `immersionStorageKey("iphone-history","itt07")` |
| load/save | JSON array of {url,ts} |
| bind form | submit preventDefault · push · render · status |
| presets | buttons write URL then open |
| history click | re-open |

**Do not:** call real network; navigate parent unless intentional shell API.

## 21.2 `gmail.js`

| Key helper | Kind |
|------------|------|
| KEY | user object |
| MSG | messages array |
| DRAFTKEY | drafts |
| INVKEY | invite remaining |

Login sets user · compose unshifts message · draft pushes · invite decrements.

## 21.3 `maps.js`

| Mode | Trigger |
|------|---------|
| Street View boot | presence of `[data-sv-city]` |
| Maps canvas | `[data-maps-canvas]` |
| SV key | `immersionStorageKey("streetview","itt07")` |
| Maps state | `immersionStorageKey("maps-state", yearFallback)` — ensure 2007 prefix |

**Bug watch:** fallback defaults to `itt05` in some paths — **force year util** so 2007 never writes wrong prefix.

## 21.4 `facebook.js`

Platform list load/save `itt07-fb-apps` · add from form · remove by index · render list with remove buttons.

## 21.5 `twitter.js`

Compose append tweet · render timeline · profile page reuses same key.

## 21.6 `youtube.js`

seed list if empty · upload push · watch views map · like optional.

## 21.7 `shared.js` tour

- `markTourProgress` on path match → `{visited:true}`  
- `markTourUsed('iphone')` after REAL Safari Go  
- Object form not bare `true` for partial progress  

Call `markTourUsed` from feature modules after successful save.

---

# Part 22 — urlMap bulk checklist (P0 minimum)

Ensure `js/config/2007.js` includes at least:

```
pages/home.html
pages/about.html
pages/map.html
pages/cool.html
pages/whats-new.html
pages/error/404.html
pages/error/unreachable.html
sites/iphone/index.html
sites/iphone/about.html
sites/gmail/index.html
sites/gmail/about.html
sites/gmail/inbox.html
sites/gmail/compose.html
sites/gmail/invite.html
sites/maps/index.html
sites/maps/streetview.html
sites/maps/about.html
sites/maps/mashups.html
sites/facebook/index.html
sites/facebook/platform.html
sites/facebook/about.html
sites/facebook/feed.html
sites/facebook/profile.html
sites/twitter/index.html
sites/twitter/about.html
sites/twitter/profile.html
sites/youtube/index.html
sites/youtube/about.html
sites/youtube/upload.html
sites/youtube/watch.html
sites/playable/index.html
```

**After every new HTML file:** add urlMap row same day.

---

# Part 23 — Continuity product REAL matrix (expand)

| Product | Path | Hook | Key | ROI |
|---------|------|------|-----|----:|
| Digg | digg/index | data-digg-up | itt07-digg-links | 7 |
| MySpace | myspace/profile | data-myspace-profile-form | itt07-myspace-profile | 7 |
| Docs | docs/edit | data-docs-save | itt07-docs | 6 |
| AWS | aws/index | data-aws-create | itt07-aws-buckets | 6 |
| Reader | reader/index | data-reader-add | itt07-reader-subs | 6 |
| Flickr | flickr/upload | data-flickr-upload | itt07-flickr-stream | 6 |
| Amazon | amazon book pages | data-add-cart | itt07-amazon-cart | 6 |
| eBay/Auction | ebay item | data-bid-form | itt07 bid keys | 5 |
| Reddit | reddit/index | boost hooks | itt07-reddit-* | 5 |
| Blogger | blogger | post hooks | itt07-blogger-* | 5 |
| Technorati | technorati | search/cosmos | module keys | 4 |
| Bloglines | bloglines | subscribe | module keys | 4 |
| HousingMaps | housingmaps | filter | module keys | 5 |
| delicious | delicious | save bookmark | module keys | 4 |
| LinkedIn | linkedin | profile/connections | module keys | 4 |
| iTunes | itunes | podcasts | module keys | 4 |
| Wikipedia | wikipedia | browse theater | optional | 3 |
| Steam | steam | 2007 client honesty | optional | 3 |

For each: verify year prefix · status feedback · empty blocked · e2e if P0-adjacent.

---

# Part 24 — Day-by-day implement schedule (perfect residual)

### Day 1 — Honesty + isolation (ROI 10)

| Hour | Work |
|-----:|------|
| 0–1 | Phase 23 baseline freeze · record e2e counts |
| 1–3 | Grep bans · YT ownership · Gmail open · scale numbers |
| 3–5 | Phase 11 storage audit · maps.js prefix fix if needed |
| 5–6 | Fix any failures · re-run real-flows |

### Day 2 — Beacon + Twitter/Maps densify (ROI 8)

| Hour | Work |
|-----:|------|
| 0–2 | Phase 19 Beacon multipage REAL + e2e |
| 2–4 | twitter/profile densify · about SXSW depth |
| 4–6 | maps/about densify · Maps→SV CTA QA |

### Day 3 — iPhone + Netflix multipage (ROI 5–8)

| Hour | Work |
|-----:|------|
| 0–3 | iPhone specs.html · broken-site cards · urlMap |
| 3–6 | Netflix queue + watchnow REAL · e2e densify |

### Day 4 — Culture optional + forest scrub (ROI 3–5)

| Hour | Work |
|-----:|------|
| 0–3 | FriendFeed + OpenSocial rooms OR scrub top 15 thins |
| 3–5 | Continuity year-voice pass |
| 5–6 | Link audit sample |

### Day 5 — Pixels optional + final claim (ROI 2–10)

| Hour | Work |
|-----:|------|
| 0–3 | CAPTURE C07-01…04 harvest attempts |
| 3–5 | Full e2e + authenticity + smoke |
| 5–6 | Update MUSEUM-GRADE · this bible status · perfect claim |

---

# Part 25 — Copy kits (paste-ready period voice)

## 25.1 iPhone about (facts only)

> Announced January 9, 2007 at Macworld San Francisco: a phone, a widescreen iPod, and an Internet communications device — one multi-touch slab. Ships in the United States June 29, 2007 with Cingular. Prices at announce: $499 (4GB) and $599 (8GB). The browser is Safari. There is no App Store in 2007; third-party native apps arrive with the July 2008 store. Many desktop sites look broken on a 3.5-inch screen. EDGE and Wi-Fi carry the web. Google Maps ships on the device.

## 25.2 Gmail open

> February 14, 2007: Gmail sign-ups open worldwide. You no longer need to wait for an invite as the default story. Invites become a “tell a friend” habit, not a gate. Search your mail instead of filing it. Conversations thread. Free storage measured in gigabytes still feels outrageous.

## 25.3 Street View

> May 2007: Google puts street-level photography on the map. First cities: San Francisco, New York, Las Vegas, Miami, and Denver. Drag the pegman-class control, face a new heading, and walk a block that is really a sequence of photos. Privacy debates start the same year. This museum uses theater only — no live tiles.

## 25.4 Facebook Platform

> May 24, 2007: Facebook opens a developer platform on the social graph. Add SuperPoke-class apps, quizzes, and causes. Notifications multiply. Late year, Beacon tries to publish what you do on partner sites into the feed — and the privacy backlash is part of the 2007 story. MySpace is still larger for much of the year.

## 25.5 Twitter SXSW

> March 2007, Austin: Twitter breaks out at SXSW Interactive. Hallway screens, SMS, 140 characters, “What are you doing?” Usage spikes. Developers build third-party clients. It is not yet a global news wire or a For You feed. Type a status, see it on your timeline, open your profile — same session list.

## 25.6 YouTube ownership

> Google closed the YouTube acquisition in November 2006. For all of calendar 2007, YouTube is Google-owned. Flash still plays the video. Upload a title in this museum; the binary never leaves your machine — only the title list is saved.

## 25.7 Hard bans blurb (About)

> Not yet: Google Chrome (2008), the App Store (2008), mass-market Android phones (late 2008), or an invite-only Gmail as this year’s default product. Campus-only Facebook ended in 2006. Netflix is still primarily DVD by mail; electronic delivery is a seed, not the whole product.

---

# Part 26 — ROI decision tree

```
Is the page on a P0 trail?
  YES → Does it write itt07-* with content on primary action?
          NO → FIX NOW (ROI 9–10)
          YES → Is copy year-true (bans/ownership/dates)?
                  NO → FIX NOW (ROI 8–10)
                  YES → Optional densify multipage (ROI 5–7)
  NO → Is it linked from home directory?
          YES → Thin scrub if wrong-year (ROI 3–5)
          NO → Leave or optional forever (ROI 1–3)
Is the task inventing a logo?
  YES → STOP · harvest or failed-final only (ROI 2)
```

---

# Part 27 — Failure modes & fixes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| e2e timeout on data-* | immersion not loaded | ensure immersion-2007.js on page |
| Storage null after click | wrong prefix / needs() false | check features flags · storagePrefix |
| Status updates, key empty | mock handler | wire module saveJSON |
| Cross-year pollution | hardcoded itt06 | use immersionStorageKey |
| urlMap smoke fail | new HTML unmapped | add config/2007.js entry |
| Trail 404 | wrong relative path | from pages/ use `../sites/...` |
| SV city not found | string mismatch | exact five city names |
| Platform remove missing | render forgot buttons | re-render list with data-fb-app-remove |
| Tour never completes | only visited | call markTourUsed after REAL |
| Authenticity fail | claimed WA but RECON | fix CAPTURE honesty |

---

# Part 28 — Definition of done (museum-perfect 2007)

1. **Visitor** can complete trails 1–5 without dead ends and see storage proof.  
2. **Every P0 primary action** writes non-empty `itt07-*` and survives reload.  
3. **No mock** primary buttons on P0 rooms.  
4. **Bans & ownership** copy correct.  
5. **Isolation** holds vs 2006/2008.  
6. **e2e pack** green.  
7. **CAPTURE** honest for signature brands.  
8. **Docs** residual list = L4 only.  
9. **Optional culture** either shipped REAL or explicitly `[~]`.  
10. **No invented pixels.**

---

# Part 29 — Quick command card

```bash
# Serve
python3 -m http.server 8080 --bind 127.0.0.1

# Open
open http://127.0.0.1:8080/years/2007/

# Static gates
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py

# 2007 e2e
npm run test:e2e:2007

# Grep bans residual
rg -n "App Store|Chrome browser|invite-only|still independent" years/2007/sites -g'*.html' | head

# Grep storage prefix issues
rg -n "itt06-|itt05-|itt08-" js/immersion/iphone.js js/immersion/gmail.js js/immersion/maps.js js/immersion/facebook.js js/immersion/twitter.js js/immersion/youtube.js
```

---

# Part 30 — Index of all phases (jump table)

| # | Phase | ROI | Part |
|--:|-------|----:|------|
| 0 | Inventory freeze | 10 | §6 |
| 1 | Research lock | 10 | §6 |
| 2 | Home/About | 10 | §6 |
| 3 | Gmail REAL | 10 | §6 |
| 4 | iPhone REAL | 10 | §6 |
| 5 | Street View REAL | 10 | §6 |
| 6 | FB Platform REAL | 10 | §6 |
| 7 | Twitter REAL | 9 | §6 |
| 8 | YouTube year-truth | 9 | §6 |
| 9 | Vista/Android note | 8 | §6 |
| 10 | Trails | 8 | §6 |
| 11 | Storage audit | 10 | §6 |
| 12 | e2e pack | 10 | §6 |
| 13 | Docs claim | 8 | §6 |
| 14 | Pixel harvest | 2 | §7 |
| 15 | P2 culture | 4–5 | §7 |
| 16 | Voice | 6 | §7 |
| 17 | Flow map/playables | 7 | §7 |
| 18 | Forest scrub | 3–6 | §7 |
| 19 | Beacon REAL | 8 | §7 |
| 20 | Netflix REAL | 5 | §7 |
| 21 | FriendFeed | 4 | §7 |
| 22 | OpenSocial | 4 | §7 |
| 23 | Gates re-verify | 10 | §7 |
| 24 | CAPTURE close | 2 | §7 |
| 25 | Perfect claim | 9 | §7 |

---

*Extended implement bible complete. Work ROI ≥8 first. REAL storage only. Never invent pixels.*
