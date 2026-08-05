# 2007 — Museum-perfect research & build map

**Date:** 2026-08-06  
**Purpose:** Single implementer bible to take **2007 from “museum-ready / ~98% content” → perfect residual polish** without inventing pixels or reopening ship.  
**Method:** Full re-read of all 2007 project MDs + disk inventory + e2e + immersion + **web primary sources** (Apple, Facebook, Google, Live Stats, Cybercultural, WA harvest paths).  
**Board today:** **Museum-ready** · hub open · `itt07` · densify + flows A–T green · residual = **L4 pixels + optional culture rooms + thin continuity forest**.

| Use this for… | Not for… |
|---------------|----------|
| Where every file lives · what is already done · exact residual | Claiming year is unbuilt |
| Harvest URLs · CAPTURE IDs · multipage densify steps | Inventing brand art |
| Multi-step REAL flows · storage keys · gates | Live maps / SMTP / App Store binaries |

**Implement next:** full phase-by-phase bible with ROI + REAL contracts → [`2007-MUSEUM-GRADE-IMPLEMENT-BIBLE.md`](2007-MUSEUM-GRADE-IMPLEMENT-BIBLE.md) (~2k lines).

---

## 0. One-screen status

| Metric | Value |
|--------|------:|
| Ship label | **Museum-ready** (elevate 2026-08-02) |
| Content % (A–F, honest C) | **~98%** |
| Perfect L4 pixels | **open (optional forever)** |
| HTML | **~297** under `years/2007/` |
| Site rooms | **~85** |
| Period assets | **~162** under `assets/period/2007/` |
| Thin HTML (&lt;1.5 KB) | **~73** (mostly continuity stubs) |
| e2e pack | `mvp` · `flows` · `real-flows` · `densify` · `trail-real-flows` |
| Prefix | **`itt07`** |
| Shell | **Windows XP + IE 6/7** (Vista = product room only) |

**Verdict:** Do **not** rebuild 2007. Perfect it: Layer C harvest · densify thin high-ROI rooms · optional FriendFeed/OpenSocial · continuity voice scrub · keep bans hard.

---

## 1. Thesis (locked — do not rewrite freely)

**2007 is when the phone becomes a real web browser you carry — while most people still live on the desktop Web 2.0 stack.**

| Theme | Truth |
|-------|--------|
| Mobile | iPhone announce **Jan 9** · ship US **Jun 29** · **Safari only** · **no App Store** |
| Accounts | Gmail **open worldwide Feb 14** |
| Maps | **Street View** (museum **May 29** · Wikipedia often **May 25**) · 5 US cities |
| Social platform | **Facebook Platform May 24** · **Beacon Nov 6** privacy |
| Status | **Twitter** SXSW **March** breakout · 140 · “What are you doing?” |
| Video | **YouTube Google-owned all year** (deal closed Nov 13, 2006) |
| OS | **Vista retail Jan 30** · **XP still mass default** |
| Future phones | **Android OHA Nov 5** — announce only · **no mass phones** |
| Scale | **121,892,559** sites · **1,373,327,790** users · Live Stats birthmark **Tumblr** |

Mood: mobile *promise* + platform *power* + privacy panic — **fat laptops for most of the world**.

---

## 2. Hard bans (never 2007 default)

| Ban | Correct era | Source class |
|-----|-------------|--------------|
| **Chrome** browser | Sep 2008 | Browser history |
| **App Store** / native app grid | Jul 2008 | Apple · Cybercultural |
| **iPhone 3G** as “the” 2007 phone | 2008 | Continuity |
| **Android mass phones** / Market | late 2008 (G1) | OHA Nov 2007 = note only |
| Gmail **invite-only as year default** | Open Feb 14, 2007 | Google Blog |
| Modern iOS / X / Reels / For You | Later | — |
| Netflix **streaming-first** | DVD primary · Watch Now **seed** | Cybercultural |
| Campus-only Facebook | Ended Sep 2006 | Continuity |
| YouTube “still independent in 2007” | **False** | Ownership Nov 2006 |

---

## 3. Locked timeline (build-relevant)

| Date | Event | Exhibit |
|------|-------|---------|
| **Jan 9** | iPhone announced (Macworld) | `sites/iphone/about.html` |
| **Jan class** | Netflix “Watch Now” / electronic delivery seed | `sites/netflix/` |
| **Jan 30** | Windows Vista consumer retail | `sites/microsoft/vista.html` |
| **Feb** | Tumblr launches | `sites/tumblr/` (thin) |
| **Feb 14** | Gmail open worldwide | `sites/gmail/*` |
| **Mar** | Twitter @ SXSW · award lore | `sites/twitter/about.html` |
| **Apr** | Google → DoubleClick ($3.1B class) | Optional ads |
| **May class** | Microsoft → aQuantive (~$6B) | Optional |
| **May 24** | Facebook Platform (f8) · 65 partners · 85 apps class | `sites/facebook/platform.html` |
| **May 25–29** | Street View public · SF · NYC · Vegas · Miami · Denver | `sites/maps/streetview.html` |
| **Jun 29** | iPhone ships US · Cingular exclusive · $499/$599 | `sites/iphone/index.html` |
| **Oct** | FriendFeed · OpenSocial | **Missing rooms** (optional P2) |
| **Oct 29** | Hulu private beta | Optional note |
| **Nov 5** | OHA + Android announced | About note only |
| **Nov 6** | Facebook Beacon | FB about honesty |
| **Nov 19** | Kindle ships $399 | `sites/amazon/kindle.html` (thin) |
| **2008** | Chrome · App Store · G1 | **Bans** |

### Street View date honesty

| Source | Date |
|--------|------|
| Wikipedia Street View | **May 25, 2007** |
| Google Lat Long / museum authenticity | Prefer **May 29, 2007** |
| **Museum lock** | **May 29** on copy + e2e · five cities fixed |

---

## 4. Disk map — where everything lives

### 4.1 Architecture path (do not fork engines)

```
Hub index.html
  → years/2007/index.html          # XP+IE shell · connect · #content iframe
       util + browser-core + config/2007.js + browser-2007.js
  → pages/home.html                # Starting Point · trails · chips · tour
  → sites/<brand>/*.html           # immersion-2007.js only
       → immersion/boot.js → registry[2007] → create.js + feature modules
```

| Layer | Paths |
|-------|-------|
| Shell | `years/2007/index.html` |
| Starting Point / About / Map | `years/2007/pages/{home,about,map,cool,whats-new}.html` |
| Product rooms | `years/2007/sites/*/` (**85** dirs) |
| Playables | `years/2007/sites/playable/index.html` |
| Browser config | `js/config/2007.js` (urlMap · prefs · connect · bookmarks) |
| Immersion config | `js/config/immersion-2007.js` (features · nav · tour · `itt07`) |
| Year stubs | `js/browser-2007.js` · `js/immersion-2007.js` |
| Feature modules | `js/immersion/{iphone,gmail,maps,facebook,twitter,youtube,…}.js` |
| Registry list | `js/immersion/registry.js` → `"2007": [ … ]` |
| Period CSS | `css/period-2007.css` (+ lite) · imports prior XP chain |
| XP UI kit | `css/period-xp-ui.css` (Starting Point window) |
| Assets | `assets/period/2007/**` |
| Provenance | `docs/references/2007/{CAPTURE-LOG,ARTIFACTS-MAP}.md` |
| e2e | `e2e/2007-*.spec.js` (5 files) |
| Flow map data | `js/config/flow-maps.js` → `ITT.flowMaps["2007"]` |

### 4.2 P0 rooms (signature) — disk truth 2026-08-06

| Product | HTML paths | Module | Storage keys | Status |
|---------|------------|--------|--------------|--------|
| **iPhone** | `sites/iphone/{index,about}.html` | `iphone.js` | `itt07-iphone-history` | Live multipage · Safari theater · no App Store |
| **Gmail open** | `sites/gmail/{index,about,inbox,compose,invite}.html` | `gmail.js` | `itt07-gmail*` | Open-default copy **done** · invite = legacy |
| **Street View** | `sites/maps/{index,streetview,about,mashups}.html` | `maps.js` | `itt07-streetview` | 5 cities · Maps CTA |
| **Facebook Platform** | `sites/facebook/{platform,about,feed,profile,…}.html` | `facebook.js` | `itt07-fb-apps` | Add/remove apps · Beacon on about |
| **Twitter** | `sites/twitter/{index,about,profile}.html` | `twitter.js` | `itt07-tweets` | SXSW about · timeline |
| **YouTube** | `sites/youtube/{index,about,upload,watch,channels}.html` | `youtube.js` | `itt07-yt-*` | Google-owned all year |

### 4.3 Continuity rooms (keep year-truth)

MySpace · Digg · Flickr · Docs · AWS · Reader · Reddit · Netflix (DVD + seed) · Wikipedia · WordPress · Steam (rewritten 2007 client) · Amazon smile · iTunes Store · Firefox · Google · Yahoo · etc.

### 4.4 Thin / optional already on disk

| Room | Path | Notes |
|------|------|-------|
| Tumblr | `sites/tumblr/index.html` | ~2 KB thin · Live Stats birthmark |
| Kindle | `sites/amazon/kindle.html` | Nov 19 $399 |
| Vista | `sites/microsoft/vista.html` | Product only |
| Netflix | `sites/netflix/index.html` | Single page |

### 4.5 Missing optional P2 (high culture ROI)

| Room | Why 2007 | Build if perfecting culture layer |
|------|----------|-----------------------------------|
| **FriendFeed** | Oct · geek feed aggregator | Connects Twitter · blogs · Flickr · Digg |
| **OpenSocial** | Oct · Google multi-network apps | Leads into 2008 Friend Connect |
| Hulu note | Private beta Oct 29 | Not mass product — About/whats-new only OK |

### 4.6 Immersion features enabled (config)

From `js/config/immersion-2007.js`: amazon · auction · geocities · google · excite · yahoo · napster · blogger · slashdot · technorati · plugin · friendster · kazaa · myspace · itunes · wordpress · linkedin · adsense · bloglines · **gmail** · **facebook** · flickr · **youtube** · **maps** · reddit · digg · podcasts · delicious · housingmaps · feedburner · **twitter** · docs · aws · reader · **iphone** · flowMap · nav.

### 4.7 Signature storage keys (REAL flows)

| Key | Product action |
|-----|----------------|
| `itt07-iphone-history` | Safari URL browse history |
| `itt07-gmail` / `itt07-gmail-msgs` / drafts | Login · compose · drafts |
| `itt07-streetview` | City + turn state |
| `itt07-fb-apps` | Platform app list |
| `itt07-tweets` | Timeline posts |
| `itt07-yt-uploads` / views | Upload · watch |
| `itt07-digg-*` · `itt07-amazon-cart` · … | Continuity modules |

**Rule:** All year-native via `storagePrefix: "itt07"`. Never hardcode another year’s prefix in modules.

---

## 5. Primary web sources (bookmark bank)

### 5.1 Scale & year essay

| Topic | URL | Use |
|-------|-----|-----|
| Website counts | https://www.internetlivestats.com/total-number-of-websites/ | **121,892,559** · users **1,373,327,790** · Tumblr birthmark |
| Year narrative | https://cybercultural.com/p/internet-2007/ | Thesis · desktop vs mobile · ads · Netflix seed · FB/MySpace scale |
| Top tech stories 2007 | https://ricmac.org/2007/12/31/top-10-web-tech-stories-of-2007/ | What’s New energy |

### 5.2 P0 product primaries

| Product | Primary source | Locked facts to extract |
|---------|----------------|-------------------------|
| **iPhone** | https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone/ | Three-in-one · multi-touch · Safari · Maps · **Cingular** · **$499/$599** · **June 2007** ship · EDGE/Wi-Fi · **no App Store** |
| **Gmail open** | https://googleblog.blogspot.com/2007/02/from-gmail-with-3.html | Feb 14 open worldwide · “no more waiting for invite” |
| **Street View** | https://maps.googleblog.com/2007/05/introducing-street-view.html | Launch post · five cities |
| Street View wiki | https://en.wikipedia.org/wiki/Google_Street_View | May 25 class (museum still May 29) |
| **Facebook Platform** | https://about.fb.com/news/2007/05/facebook-unveils-platform-for-developers-of-social-applications/ | May 24 · 65 partners · 85 apps · social graph |
| FB history | https://en.wikipedia.org/wiki/History_of_Facebook | Platform May 24 · Beacon Nov 6 · Pages same day class |
| **Twitter SXSW** | https://www.wired.com/2007/03/twitter-is-ruling-sxsw/ · Wikipedia History of Twitter | 20k→60k tweets/day class · plasmas · award |
| Twitter 2007 essay | https://cybercultural.com/p/twitter-in-2007-the-open-platform/ | API · third-party clients · April Twitter Inc |
| **Vista** | https://news.microsoft.com/source/2007/01/29/microsoft-launches-windows-vista-and-microsoft-office-2007-to-consumers-worldwide/ | Jan 30 retail |
| **Android OHA** | https://www.openhandsetalliance.com/press_110507.html · Google Blog “Where’s my Gphone?” | Announce only · phones 2008 |
| Netflix electronic delivery | WA netflix.com Media Center 2007 (Cybercultural cites) | DVD primary · Watch Now seed |

### 5.3 UI / pixel source stack (Layer C)

| Source | URL | Use |
|--------|-----|-----|
| Wayback Machine | https://web.archive.org/ | Year-correct HTML + `id_`/`im_` logos |
| Web Design Museum | https://www.webdesignmuseum.org/ | Brand screenshots by year |
| Version Museum | https://www.versionmuseum.com/ | Amazon / Yahoo timelines |
| GUIdebook | https://guidebookgallery.org/ | XP / Vista chrome |
| evolt browsers | https://browsers.evolt.org/ | Real IE6/7 toolbar bitmaps |
| Apple Newsroom | (iPhone PR above) | Marketing stills research only until CAPTURE |

### 5.4 Recommended Wayback CDX targets (harvest)

| ID | Target URL class | Window | Install dest |
|----|------------------|--------|--------------|
| **C07-01** | `apple.com/iphone` | mid–late **2007** | `assets/period/2007/iphone/` |
| **C07-02** | `maps.google.com` | May–Dec **2007** | `assets/period/2007/maps/` pegman / chrome |
| **C07-03** | `facebook.com` · developers | mid **2007** | `assets/period/2007/facebook/` |
| **C07-04** | `twitter.com` | Mar–Dec **2007** | `assets/period/2007/twitter/` |
| **C07-05** | `gmail.com` / mail.google.com | Feb–Jun **2007** | Gmail open chrome |
| **C07-06** | microsoft.com/windows/vista | 2007 | Vista product (shell stays XP) |
| **C07-07** | `youtube.com` | 2007 | Continuity under Google (partial done) |
| **C07-08** | amazon.com/kindle | Nov–Dec 2007 | Optional |

**Harvest steps (every artifact):**

1. Find CDX date for **2007 only** — not 2008 App Store chrome.  
2. Open `id_` capture → extract logo/chrome image URLs.  
3. Download via `…/web/{ts}id_/{orig}`; run `file` — must be GIF/JPEG/PNG.  
4. Install `assets/period/2007/<brand>/…` · keep RECON if failed.  
5. Log `docs/references/2007/CAPTURE-LOG.md` as `[wa]` or `[failed-final]`.  
6. Wire HTML `img` · never claim RECON as WA.  
7. Re-run authenticity + `e2e/2007-*.spec.js`.

---

## 6. Existing project research (read fully before editing)

| Doc | Role | Read priority |
|-----|------|---------------|
| **This file** | Perfect map · residual · harvest | ★ |
| [`2007-RESEARCH.md`](2007-RESEARCH.md) | Thesis · timeline · bans | ★ |
| [`2007-DEEP-RESEARCH-FRESH-2026-07-31.md`](2007-DEEP-RESEARCH-FRESH-2026-07-31.md) | Product kits · sources · flows | ★ |
| [`2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Phases 0–16 · acceptance | ★ |
| [`2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) | Long densify bible | ★ |
| [`2007-CONNECTIONS-AND-TRAILS.md`](2007-CONNECTIONS-AND-TRAILS.md) | Product bridges | ★ |
| [`2007-RELATABLE-CONTENT-AND-PERIOD-VOICE-2026-07-31.md`](2007-RELATABLE-CONTENT-AND-PERIOD-VOICE-2026-07-31.md) | Voice · slang · day-in-life | ★ |
| [`2007-MUSEUM-GRADE.md`](2007-MUSEUM-GRADE.md) | Ship status card | ★ |
| [`TO-100-PERCENT/YEAR-2007.md`](TO-100-PERCENT/YEAR-2007.md) | Residual checklist | ★ |
| [`references/2007/CAPTURE-LOG.md`](references/2007/CAPTURE-LOG.md) | Harvest queue C07-* | ★ |
| [`references/2007/ARTIFACTS-MAP.md`](references/2007/ARTIFACTS-MAP.md) | Room → module → keys | ★ |
| [`references/2007/wayback-extracts/HARVEST-DENSIFY-QUEUE-2026-08-01.md`](references/2007/wayback-extracts/HARVEST-DENSIFY-QUEUE-2026-08-01.md) | Optional harvest cookbook | ★ |
| Visit logs | `references/2007/notes/*` | Research notes |
| [`MUSEUM-READY-BAR-1994-2012.md`](MUSEUM-READY-BAR-1994-2012.md) | Layers A–F | Bar |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content rule | Always |

**Phases 0–13 + 16 already [x]** per clear playbook. Only **[~]** remain for perfect work.

---

## 7. Period user flows A–T (implement + e2e map)

| ID | Flow | Steps | Assert |
|----|------|-------|--------|
| **A** | Enter year | Hub → 2007 shell · skip connect | `data-itt-year=2007` |
| **B** | Thesis | About: scale · bans · timeline | `121,892,559` · Chrome/App Store bans |
| **C** | iPhone announce→ship | about → index Safari | `itt07-iphone-history` |
| **D** | Gmail open | signup/login · compose | open Feb 14 · storage |
| **E** | Street View | Maps → SV · pick city · turn | `itt07-streetview` · 5 cities |
| **F** | FB Platform | platform add SuperPoke-class · remove | `itt07-fb-apps` |
| **G** | Beacon literacy | FB about | Nov privacy copy |
| **H** | Twitter SXSW | compose 140 · profile | `itt07-tweets` |
| **I** | YouTube Google year | about · upload · watch | ownership · `itt07-yt-*` |
| **J** | Video→votes | YT → Digg/Reddit | handoff links |
| **K** | MySpace mass | profile theater | continuity |
| **L** | Digg front page | digg/bury | `itt07` digg keys |
| **M** | Flickr/Yahoo | explore | continuity |
| **N** | Docs/AWS/Reader | collab cloud | modules |
| **O** | Blog RSS graph | Bloglines/Reader/Technorati | trail |
| **P** | Netflix DVD + seed | queue honesty | Watch Now line |
| **Q** | Vista product | vista.html · not shell | XP shell still |
| **R** | Android note | About OHA · no phone shop | ban mass phones |
| **S** | iPhone presets | Maps · Google · YT · Gmail | presets open |
| **T** | Tour complete | mark used on real actions | `itt07-tour-done` |

**e2e files:**

| Spec | Covers |
|------|--------|
| `e2e/2007-mvp.spec.js` | Shell · home · about bans · iPhone · Gmail · SV · Platform · YT |
| `e2e/2007-flows.spec.js` | Full A–T period flows |
| `e2e/2007-real-flows.spec.js` | Hard storage |
| `e2e/2007-densify.spec.js` | Multipage densify |
| `e2e/2007-trail-real-flows.spec.js` | Home trail → storage |

---

## 8. Connection trails (visitor UX)

From home (`pages/home.html`) + [`2007-CONNECTIONS-AND-TRAILS.md`](2007-CONNECTIONS-AND-TRAILS.md):

1. **Mobile web** — iPhone about → Safari → Maps/Gmail/YouTube presets  
2. **Open Google** — Gmail open → Maps → Docs/Reader  
3. **Maps on street** — Maps → Street View → HousingMaps  
4. **Platforms & status** — FB Platform → Feed → Twitter → Beacon about  
5. **Video front page** — YouTube → Digg → Reddit  
6. **Blogosphere** — Blogger/WP → Bloglines/Reader → Technorati → Digg  
7. **Who owns social** — MySpace mass → Facebook open → Platform  

```
Google stack: Gmail ↔ Maps ↔ Street View ↔ YouTube (owned) ↔ Docs/Reader
Social: MySpace mass · FB Platform · Twitter SXSW · Digg · Beacon
Mobile late: iPhone Safari of desktop sites · NO App Store
```

---

## 9. Residual → perfect (ordered work program)

### Priority legend

| Tier | Meaning |
|------|---------|
| **P0** | Blocks “perfect” claim on Layer C honesty or wrong-year copy |
| **P1** | High visitor ROI densify |
| **P2** | Optional culture rooms |
| **L4** | Forever optional pixels — never invent |

### Wave 1 — Honesty audit (½ day) **P0**

| # | Task | How | Accept |
|---|------|-----|--------|
| W1.1 | Grep bans | No Chrome/App Store as default product in 2007 rooms | `rg` clean |
| W1.2 | YouTube ownership | No “independent this year” | YT about OK · recheck googlevideo |
| W1.3 | Gmail open | Invite not gate | Already open-default — re-verify compose/inbox |
| W1.4 | Scale lock | Home + About show **121,892,559** | e2e Flow B |
| W1.5 | Street View cities | Exactly five launch cities | e2e SV |

### Wave 2 — Layer C pixel harvest **L4** (optional but “perfect”)

| # | CAPTURE | Target | Accept |
|---|---------|--------|--------|
| W2.1 | C07-01 | iPhone 2007 marketing still | `[wa]` or `[failed-final]` |
| W2.2 | C07-02 | Maps/SV pegman-era crop | same |
| W2.3 | C07-03 | FB Platform blue/white chrome | same |
| W2.4 | C07-04 | Twitter sparse 2007 bird/UI | same |
| W2.5 | C07-05 | Gmail open signup chrome | same |
| W2.6 | evolt | IE6/7 toolbar if missing | optional shell |

### Wave 3 — Densify thin high-ROI rooms **P1**

| # | Room | Goal | Files |
|---|------|------|-------|
| W3.1 | iPhone | Ship multipage: announce · specs · Safari · “broken site” cards | `sites/iphone/*` · keep hooks |
| W3.2 | Twitter profile | Deeper timeline read · third-party client note (Twitterrific class) | `profile.html` (now ~1.3 KB) |
| W3.3 | Maps about | Expand from ~1 KB · Ajax + SV thesis | `maps/about.html` |
| W3.4 | Netflix | DVD queue multipage + Watch Now honesty seed | `sites/netflix/` |
| W3.5 | Tumblr | Dashboard theater multipage · tumblelog post | `sites/tumblr/` |
| W3.6 | Kindle | Ship multipage · sold-out lore · no modern Kindle Fire | `amazon/kindle.html` |
| W3.7 | Continuity scrub | Top 20 thin stubs year-voice 2007 | Prefer P0-adjacent first |

**Hooks rule:** Never remove `data-iphone-*` · `data-gmail-*` · `data-sv-*` · `data-fb-app-*` · twitter compose hooks.

### Wave 4 — Optional P2 culture rooms **P2**

| # | Room | Build recipe |
|---|------|--------------|
| W4.1 | **FriendFeed** | `sites/friendfeed/index.html` + about · aggregate chips (Twitter/Digg/Flickr) · `itt07-friendfeed` literacy ack multipage · urlMap · home directory link |
| W4.2 | **OpenSocial** | `sites/opensocial/` · Google vs FB Platform narrative · bridge MySpace · leads to 2008 Friend Connect |
| W4.3 | Registry | Only if new immersion behavior needed — prefer `data-itt-real-save` multipage without new module |

### Wave 5 — Gates & docs **P0 for claim**

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2007-*.spec.js e2e/hub-years.spec.js --workers=1
```

Update:

1. `docs/2007-MUSEUM-GRADE.md` residual section  
2. `docs/references/2007/CAPTURE-LOG.md` statuses  
3. This file checkboxes when waves close  
4. **Do not** invent freehand “% complete” — use labels

---

## 10. Engineering rules (every edit)

1. **Config + content** — densify inside `years/2007/`; no new browser engine.  
2. Content pages load **only** `js/immersion-2007.js`.  
3. Storage: **`itt07-*`** via `ITT.util.immersionStorageKey` / config prefix.  
4. Keep every **`data-*`** hook when editing HTML.  
5. **Period voice** — no “Museum theater” lead copy on product rooms.  
6. **Never invent brand pixels** — WA / RECON / CONTINUITY only; log CAPTURE.  
7. Gates green before calling a wave done.  
8. **Git only if the user asks.**

---

## 11. Period visual grammar (on disk)

### Shell (XP + IE)

`assets/period/2007/xp/{start,taskbar}.gif` · `assets/period/2007/chrome/btn-*.gif` · throbber.

### Product logos present (sample)

Gmail · Maps · Facebook · YouTube · Digg · MySpace · Flickr · Google · Netflix · Amazon smile · iTunes 99¢ — under `assets/period/2007/<brand>/`.

**Note:** `README-PIXELS.txt` still says “2005 scaffold” in places — **do not trust that line**; verify each file’s CAPTURE row. Prefer `logo-wa.*` over RECON when harvesting succeeds.

---

## 12. iPhone product kit (from Apple PR — implement copy)

Use these facts in rooms (do not invent others):

| Fact | Value |
|------|--------|
| Announce | Jan 9, 2007 · Macworld San Francisco |
| Pitch | Phone + widescreen iPod + Internet communications device |
| UI | Multi-touch · fingers · no hardware QWERTY |
| Browser | Safari · desktop-class HTML · pinch-zoom lore |
| Maps | Google Maps app on device |
| Mail | HTML email · Yahoo push IMAP class · Gmail works |
| Radio | EDGE + Wi-Fi · Bluetooth · quad-band GSM |
| Carrier US | **Cingular** exclusive (→ AT&T branding class) |
| Price | **$499** 4GB · **$599** 8GB |
| Ship | US **June 2007** (museum **Jun 29**) · Europe late 2007 · Asia 2008 |
| **Forbidden 2007** | App Store · third-party native apps · App grid home |

---

## 13. Facebook Platform kit (from Meta newsroom)

| Fact | Value |
|------|--------|
| Date | **May 24, 2007** · f8 |
| Launch | 65+ developer partners · 85 applications class |
| Quote energy | “Social graph” · build businesses on Facebook |
| Scale class | FB ~**24M** · MySpace ~**67M** (NYT-era · Cybercultural) |
| Late year | **Beacon Nov 6** · partner sites · privacy revolt |
| Apps class | SuperPoke · quizzes · causes · social spam learning |

---

## 14. What “perfect 2007” means (acceptance)

| Layer | Perfect when… |
|-------|----------------|
| **A Story** | Thesis · dual scale · bans · calendar on About/home (already) |
| **B Densify** | P0 multipage rich · trails · optional FriendFeed · thin forest scrubbed for signature paths |
| **C Pixels** | C07 harvest closed `[wa]` or honest `[failed-final]` for P0 brands |
| **D Provenance** | CAPTURE-LOG + ARTIFACTS-MAP updated |
| **E Gates** | All `e2e/2007-*` green · authenticity · smoke |
| **F Isolation** | Only `itt07-*` on handoff |

**Does not require:** Perfect evolt OEM chrome · live Street View tiles · real App Store · full Win Vista as default shell.

---

## 15. Suggested autonomous work order (next sessions)

```
1. Wave 1 honesty grep + fix any residual wrong-year copy
2. Wave 2 harvest C07-01…04 (iPhone · pegman · FB · Twitter) — stop at failed-final
3. Wave 3 densify Twitter profile · Maps about · Netflix multipage · iPhone depth
4. Wave 4 FriendFeed + OpenSocial educational rooms (optional culture)
5. Wave 5 full gates + update MUSEUM-GRADE residual to closed/optional-only
```

**Do not** start 2008 App Store chrome on 2007 disk.  
**Do not** claim perfect until Wave 1 + gates green; Wave 2–4 are polish.

---

## 16. Verify commands (copy-paste)

```bash
cd /path/to/internet-through-time
python3 -m http.server 8080 --bind 127.0.0.1

# Static
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py

# 2007 pack
npx playwright test e2e/2007-mvp.spec.js e2e/2007-flows.spec.js \
  e2e/2007-real-flows.spec.js e2e/2007-densify.spec.js \
  e2e/2007-trail-real-flows.spec.js e2e/hub-years.spec.js --workers=1

# Optional package script
npm run test:e2e:2007
```

---

## 17. Legal

Educational reconstruction only. Trademarks belong to owners. **localStorage theater only** — no real cellular data, App Store binaries, map tiles, SMTP, payments, or third-party APIs. **Never invent brand pixels.**

---

*End of 2007 museum-perfect research & build map. Prefer this + DISK-TRUTH over stale “MVP incomplete” language.*
