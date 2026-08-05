# 2005 — Master bible: research · goals · phases · steps · ROI

**Date:** 2026-08-05  
**Purpose:** Single implementer map for museum year **2005** — frozen research, overall goals, ordered phases, minute steps, **ROI per phase**, sources, artifacts, user flows, and gates.  
**Use when:** Building from scratch, densifying residual, or re-verifying museum grade.  
**Disk truth now:** `years/2005/` **live** · hub **unlocked** · ~**274 HTML** · **78** site rooms · **162** period assets · **46** wayback extracts · prefix **`itt05`** · status **museum-ready**.  
**Implement pass 2026-08-05:** Residual voice/key honesty · iTunes podcast directory densify · P2 about densify · continuity 2004→2005 banners · gates green (authenticity **74/74** · core 2005 e2e **passed**).  
**Real-flows pack 2026-08-05:** `e2e/2005-mega-real-flows.spec.js` (boom-day multi-product · Amazon cart · MySpace graph · isolation · shell multi-step) · expanded shell tests in `2005-real-flows.spec.js` · `npm run test:e2e:2005` includes mega + youtube + live.  
**No-mock harden 2026-08-05:** YouTube/Digg/Reddit empty submit **blocked** (no Untitled mock) · densify/live suites require storage mutation · `densify-real-vs-mock` 2005 gates · Hangout e2e no longer expects `(mock)`.  
**Legal:** Educational reconstruction only. Trademarks belong to owners. **localStorage theater only** — no real video CDN, map tiles, accounts, or payments. **Never invent brand pixels.** Git only if asked.

**Status marks:** **[x]** done on disk · **[ ]** open · **[~]** optional forever (does not block ship)

---

## 0. Companion docs (read order)

| Order | Doc | Role |
|------:|-----|------|
| **0** | **This file** | Goals · phases · steps · **ROI** · research freeze |
| **1** | [`2005-RESEARCH.md`](2005-RESEARCH.md) | Canonical thesis · timeline · bans · P0 map |
| **2** | [`2005-DEEP-RESEARCH-FRESH-2026-07-31.md`](2005-DEEP-RESEARCH-FRESH-2026-07-31.md) | Product kits · minute timeline |
| **3** | [`2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md) | Full gather bible · copy kits |
| **4** | [`references/2005/ARTIFACTS-MAP.md`](references/2005/ARTIFACTS-MAP.md) | Sources → extracts → rooms → hooks |
| **5** | [`references/2005/CAPTURE-LOG.md`](references/2005/CAPTURE-LOG.md) · [`ASSETS.md`](references/2005/ASSETS.md) | Pixel honesty |
| **6** | [`references/2005/wayback-extracts/`](references/2005/wayback-extracts/) | **46** period copy banks |
| **7** | [`2005-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2005-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) | Prior playbook twin |
| **8** | [`TO-100-PERCENT/YEAR-2005.md`](TO-100-PERCENT/YEAR-2005.md) | Full rebuild phases R–9 |
| **9** | [`2005-MUSEUM-GRADE.md`](2005-MUSEUM-GRADE.md) | Ship card |
| **10** | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`DISK-TRUTH.md`](DISK-TRUTH.md) | Engine rules · hub truth |
| **11** | Parent scaffold | [`2004-MUSEUM-GRADE.md`](2004-MUSEUM-GRADE.md) · `years/2004/` |

### ROI glossary (how to read “ROI” in this doc)

| Term | Meaning in this museum |
|------|------------------------|
| **Visitor ROI** | Minutes of authentic 2005 *feeling* per hour of build work |
| **Museum ROI** | How much the year becomes *believable as 2005* (vs generic retro) |
| **Gate ROI** | How much the change reduces regression risk / greenwashes |
| **Ship ROI** | How much it moves the year toward MVP / museum-ready unlock |
| **Effort** | S = &lt;2h · M = 2–8h · L = 1–3d · XL = multi-day |
| **Leverage** | High = one change unlocks many rooms / gates · Low = polish only |

**Priority rule:** Do high **Ship ROI + Museum ROI** first (P0 products). Defer **optional forever** pixels until gates are green.

---

# Part 1 — Research freeze (locked facts)

## 1.1 One-line thesis

**2005 is when Web 2.0 becomes a business boom:** Ajax gets a name and a showcase (**Google Maps**); **YouTube** makes video upload trivial; **Reddit** and **Digg** turn the homepage into a **vote**; **M&A returns** (Yahoo→Flickr, News Corp→MySpace, eBay→Skype, Yahoo→del.icio.us); **iTunes 4.9** takes **podcasting** mainstream. Facebook is **still not** the open social web. **IE6 on XP** is the mass default; **Firefox 1.x** is what cool bloggers use. Mood = creative, API-happy, RSS-obsessed, **pre-smartphone** — not Twitter, not Chrome, not “Google owns YouTube.”

## 1.2 Why this year exists (museum purpose)

| Why | Explanation |
|-----|-------------|
| Handoff from 2004 | 2004 seeded Gmail, Flickr, Thefacebook, Firefox 1.0. **2005 is the boom year.** |
| Defining products | YouTube + Maps + Reddit + Digg rise = what people *remember* as early Web 2.0. |
| Business proof | M&A proves Web 2.0 is “open for business,” not only conference slides. |
| Scale | First **~1B users** era · **64.8M websites** (+26% YoY). |
| Handoff to 2006 | 2006 adds Twitter, open Facebook, Google←YouTube — **ban those in 2005.** |

## 1.3 Scale (locked labels — use exactly)

| Metric | Value | Source |
|--------|------:|--------|
| Websites (June 2005) | **64,780,617** | [Internet Live Stats](https://www.internetlivestats.com/total-number-of-websites/) |
| YoY change | **+26%** from 2004 (51,611,646) | Same |
| Internet users | **1,027,580,990** | Same |
| Users per site | **16** | Same |
| Birthmarks on chart | YouTube · Reddit | Same (WA links) |

**Exhibit copy:** “~64.8 million websites · ~1.03 billion internet users (first billion-user era).”

## 1.4 Hard bans (never as 2005 default)

| Ban | Correct year | Enforce where |
|-----|--------------|---------------|
| Twitter / Twttr | 2006 | About · authenticity · e2e |
| Facebook open to anyone / News Feed | Sep 2006 | Facebook rooms · About |
| Google owns YouTube | Oct 2006 | YouTube about · flows e2e |
| Chrome browser | 2008 | Shell · About |
| iPhone / App Store | 2007 / 2008 | About · authenticity |
| Vista as default OS shell | later | Shell chrome |
| Street View as default Maps UI | 2007 | Maps about · product UI |
| Modern YouTube (Material, Shorts) | later | Visual harvest policy |
| Modern Reddit (awards, redesign) | later | Reddit rooms |

## 1.5 Timeline (build-relevant, minute detail)

| Date | Event | Exhibit room |
|------|-------|--------------|
| **Feb 8 2005** | Google Maps public desktop | **P0 Maps** |
| **Feb 14 2005** | YouTube domain / founding lore | YouTube about |
| **Feb 18 2005** | Ajax essay (Jesse James Garrett / Adaptive Path) | Maps about · web-app education |
| **Feb 2005** | Ask acquires Bloglines | Bloglines / RSS |
| **Mar 20 2005** | Yahoo acquires Flickr (~$22–25M class) | Flickr continuity |
| **~Apr 2005** | HousingMaps mashup (Paul Rademacher; pre-API) | HousingMaps |
| **Apr 23 2005** | YouTube public beta · *Me at the zoo* (~19s) | **P0 YouTube** |
| **May 2005** | Accel → Facebook **$12.7M** | Facebook about |
| **Jun 2005** | Google Maps API public | Maps mashups |
| **Jun 23 2005** | Reddit launches (Huffman/Ohanian · YC S05) | **P0 Reddit** |
| **Jun 2005** | TechCrunch launches (Arrington) | TechCrunch |
| **Jun 28 2005** | iTunes **4.9** podcasting · 3,000+ free | iTunes |
| **Jun 30 2005** | **>1M** podcast subs in two days (Apple PR class) | iTunes densify |
| **Jul 1 2005** | Diggnation ep.1 (Rose / Albrecht) | Digg culture |
| **Jul 18 2005** | News Corp → Intermix/MySpace **$580M** · Fox Interactive Media | MySpace |
| **Jul 2005** | Google → Android (quiet) | Optional footnote only |
| **~Jul 2005** | Mashable | P2 tech blog |
| **Aug 2005** | Facebook buys facebook.com · drops “The” | Facebook dual-era |
| **Aug 26 2005** | Million Dollar Homepage ($1/pixel) | P2 novelty |
| **Sep 12 2005** | eBay → Skype ~**$2.6B** | Skype / news |
| **Sep 2005** | Facebook high schools — still gated | Facebook honesty |
| **Oct 2005** | Web 2.0 Conference sold-out energy | web20conference |
| **Nov 7 2005** | YouTube Sequoia **$3.5M** — still independent | YouTube about |
| **Dec 9 2005** | Yahoo → del.icio.us | delicious |
| **Dec 15 2005** | YouTube official launch class | YouTube |

## 1.6 Shell & OS (target feel)

| Layer | Spec |
|-------|------|
| OS | **Windows XP** — Luna blue Start / taskbar |
| Browser default | **Internet Explorer 6** — Address + Go · Favorites · History |
| Secondary | **Firefox 1.x** download room — “what cool bloggers use” |
| Network | Broadband default story; 56k optional in prefs |
| Address label | `Address:` (IE) |
| Storage prefix | **`itt05`** |

**Do not:** Vista default · Chrome shell · Safari Windows as mass default.

## 1.7 Primary sources (re-verified stack)

### Narrative & scale

| Source | URL | What you take |
|--------|-----|---------------|
| Cybercultural Internet 2005 | https://cybercultural.com/p/internet-2005/ | Boom thesis · M&A · Ajax · Firefox · pre-smartphone |
| Cybercultural Top 10 Web 2.0 2005 | https://cybercultural.com/p/top-10-web20-moments-2005/ | Contemporaneous ranking (note: under-ranks YT/Reddit vs later memory) |
| Internet Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | **64,780,617** · users · birthmarks |

### Product primaries

| Source | URL / note | What you take |
|--------|------------|---------------|
| Apple iTunes podcasts PR | https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/ | iTunes **4.9** · 3,000+ free · Jobs quote |
| Ajax essay (Garrett) | https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf | Feb 18 2005 · Maps/Gmail examples · stack |
| YouTube WA early | https://web.archive.org/web/20050428014715/http://www.youtube.com/ | Dating-form beta honesty **only** |
| YouTube WA mid (**default**) | https://web.archive.org/web/20050815011340/http://www.youtube.com/ | Video product UI · copy bank |
| YouTube WA late | https://web.archive.org/web/20051201042652/http://www.youtube.com/ | Channels / Friends densify |
| Reddit WA | https://web.archive.org/web/20050725010627/http://reddit.com/ | boosts · hottest/newest · sparse FP |
| Digg WA Oct | https://web.archive.org/web/20051001015226/http://digg.com/ | digg it · categories · What's Digg |
| Maps WA | maps.google.com 2005 frames | Local Search · Directions · JS required |
| HousingMaps WA | housingmaps.com ~20050615 | Craigslist disclaimer · cities · prices |
| TechCrunch WA | https://web.archive.org/web/20050614012404/http://www.techcrunch.com/ | Tracking Web 2.0 |
| del.icio.us WA | https://web.archive.org/web/20050916215933/http://del.icio.us/ | Tags · bookmarklet product UI |
| Thefacebook WA | thefacebook.com ~200504 | College directory · pre-rename |
| Facebook WA | facebook.com ~200508 | Rename-era copy |

### Visual museums

| Source | URL | Note |
|--------|-----|------|
| WDM year 2005 | https://www.webdesignmuseum.org/gallery/year-2005 | May bot-block; use prior CAPTURE |
| WDM YouTube 2005 | https://www.webdesignmuseum.org/gallery/youtube-2005 | Prefer WA logos already on disk |

### On-disk extract banks

**Path:** `docs/references/2005/wayback-extracts/` (**46** files)

| Class | Key files |
|-------|-----------|
| Narrative | `cybercultural-internet-2005.txt` · `cybercultural-top10-web20-2005.txt` · `livestats-websites.txt` |
| YouTube | `youtube_apr2005-wa.txt` · `youtube_aug2005-wa.txt` · `youtube_dec2005-wa.txt` · mid/late extracts |
| Social news | `reddit_jul2005-wa.txt` · `digg_oct2005-wa.txt` · digg extracts |
| Maps / mashup | `maps-extract.txt` · `maps_oct2005-wa.txt` · `housingmaps_2005-wa.txt` · `ajax-garrett-20050218-notes.txt` |
| Continuity M&A | `flickr-yahoo-acquire-20050320.txt` · `myspace-newscorp-20050718-notes.txt` · `ebay-skype-20050912-notes.txt` · `delicious-yahoo-20051209-notes.txt` |
| Podcasts | `apple-itunes-podcasts-20050628.txt` · `apple-itunes-podcasts-1m-20050630.txt` |
| Social | `thefacebook_may2005-wa.txt` · `facebook_sep2005-wa.txt` · `myspace_aug2005-wa.txt` |
| Press | `techcrunch_jun2005-wa.txt` · `techcrunch-extract.txt` |

## 1.8 Product kits (P0 — signature detail)

### YouTube (defining 2005 product)

| Detail | Fact |
|--------|------|
| Founders | Chad Hurley, Steve Chen, Jawed Karim |
| Domain | Feb 14 2005 |
| First video | *Me at the zoo* · Apr 23 2005 · ~19s · San Diego Zoo |
| Default UI | **Mid-2005** (Aug WA) — **not** Apr dating form |
| Late 2005 | Sequoia Nov 7 $3.5M · still **independent** |
| Storage | `itt05-yt-uploads` |
| Hooks | `data-yt-upload` · `data-yt-list` · `data-yt-player` · `data-yt-like` · `data-yt-views` · `data-yt-title` · `data-yt-status` |
| HTML | `years/2005/sites/youtube/{index,upload,watch,about,channels}.html` |
| Assets | `assets/period/2005/youtube/logo-wa.gif` **[WA]** |
| Ban | No Google ownership as 2005 fact |

**Mid-year copy bank (from WA):** “Broadcast Yourself.” · “Upload, tag and share your videos worldwide!” · Home · Watch Videos · Upload Videos · Invite Friends · Today's Featured Videos · Runtime · Views · Comments · Tags · ©2005 YouTube, LLC

### Google Maps + Ajax + HousingMaps

| Detail | Fact |
|--------|------|
| Maps public | **Feb 8 2005** |
| Ajax named | **Feb 18 2005** Garrett |
| API | **June 2005** |
| Form labels | Local Search · Directions · What / Where |
| HousingMaps | ~Apr 2005 · pre-API · Rademacher |
| Hooks | `data-maps-canvas` · pan · zoom · search · directions · status |
| Ban | No Street View as 2005 default |

**HousingMaps copy bank:** “Powered by craigslist and Google Maps (this site is in no way affiliated with craigslist or Google)” · For Rent · For Sale · Rooms · Sublets · city chooser · price ranges

### Reddit

| Detail | Fact |
|--------|------|
| Launch | **Jun 23 2005** · Y Combinator first class |
| Founders | Steve Huffman + Alexis Ohanian |
| Product language | **boosts** (period) · hottest / newest |
| Nav | register · browse · submit · faq |
| Storage | `itt05-reddit-links` · sort key `itt05-reddit-sort` |
| Hooks | `data-reddit-list` · `data-reddit-submit` · `data-reddit-status` |

### Digg (rise year; launched Dec 2004)

| Detail | Fact |
|--------|------|
| Role in 2005 | **Rise year** · rivals Slashdot (period claim) |
| Diggnation | **Jul 1 2005** ep.1 |
| Product | digg it · bury · categories · comments |
| Storage | `itt05-digg-links` · `itt05-digg-comments` |
| Hooks | digg list · submit · digg/bury · comments |

### Continuity beats (must year-truth)

| Product | 2005 truth |
|---------|------------|
| Flickr | **Yahoo-owned after Mar 20** — not Yahoo Photos clone |
| MySpace | Still mass king · **News Corp $580M Jul 18** · Fox Interactive Media |
| Facebook | Early year Thefacebook energy · **Aug rename** · **Sep high schools** · still gated · Accel $12.7M |
| iTunes | **4.9 podcasts Jun 28** · >1M subs claim Jun 30 |
| del.icio.us | Social bookmarks · **Yahoo Dec 9** |
| Skype | Independent until **eBay Sep 12 ~$2.6B** |
| Gmail / Google / Yahoo / Amazon / Wiki | Continuity densify with 2005 dates |

## 1.9 P0 / P1 / P2 room map

### P0 — must ship for credible 2005

| # | Room | Pages | Immersion | Why |
|---|------|------:|-----------|-----|
| 1 | YouTube | 5 | `youtube.js` | Defining product |
| 2 | Google Maps | 3 | `maps.js` | Ajax showcase |
| 3 | Reddit | 3 | `reddit.js` | Vote front page |
| 4 | Digg | 3 | `digg.js` | Social news rise |
| 5 | Google | 3–4 | `google.js` | Default search + Maps entry |
| 6 | MySpace | 3–5 | `myspace.js` | Mass social + sale |
| 7 | Flickr | 2–3 | `flickr.js` | Yahoo-owned photos |
| 8 | Facebook | 3–4 | `facebook.js` | Rename + high school · gated |
| 9 | Yahoo | 6–10 | `yahoo.js` | Portal + buyer of Flickr/del.icio.us |
| 10 | Amazon | 8–12 | `amazon.js` | Smile continuity |
| 11 | Wikipedia | 3–5 | — | Encyclopedia habit |
| 12 | iTunes / podcasts | 2–3 | `itunes.js` · `podcasts.js` | Podcast mainstream |

### P1 — high value

TechCrunch · Gmail · Firefox · del.icio.us · Bloglines · CNN · HousingMaps · eBay/Skype about

### P2 — flavor

Google Video · ProgrammableWeb · Mashable · Million Dollar Homepage · Memeorandum · web20conference · Roblox/Club Penguin (careful)

## 1.10 Anachronism traps (quick checklist)

Before any PR / densify pass, grep signature rooms for:

```
Twitter | Twttr | News Feed | open registration | Google acquired YouTube
Chrome browser | iPhone | App Store | Vista | Street View | Material Design | Shorts
```

Expect **zero** as current 2005 product truth (mentions of “not yet” on About are OK).

---

# Part 2 — Overall goals

## 2.1 One-line goal

Build a **museum-grade 2005 Web immersion**: Windows XP + IE 6 shell, period sites, and **real localStorage theater** that recreates how people used the internet in calendar year **2005**.

## 2.2 Visitor outcome (done = visitor can do this)

```
Hub → open 2005
  → XP desktop + IE6 (Address, Favorites, broadband story)
  → Starting Point / About:
        ~64.8M sites · ~1.03B users
        thesis: Web 2.0 business boom
        bans box: Twitter · open FB · Google-owns-YT · Chrome · iPhone · Vista default
  → YouTube: watch · upload · list (independent company · itt05-yt-uploads)
  → Google Maps: Local Search · pan/zoom (Ajax magic · no Street View)
  → HousingMaps: Craigslist-on-Maps mashup · unaffiliated disclaimer
  → Reddit: sparse front page · boost · submit (itt05-reddit-*)
  → Digg: digg/bury · Diggnation culture (rise year)
  → MySpace: still mass social · News Corp $580M story
  → Flickr: Yahoo-owned after Mar 20
  → Facebook: rename + high school · still gated (not open web)
  → iTunes: podcast subscribe theater (Jun 28, 4.9 · itt05-pod-subs)
  → TechCrunch · del.icio.us · continuity Google / Yahoo / Amazon / Wiki
  → Exit → hub · progress stays in this browser only (itt05-*)
```

## 2.3 Engineering rules (every phase)

1. **Config + content over forks** — no new browser engine for 2005.  
2. Content pages load **only** `js/immersion-2005.js` → `immersion/boot.js`.  
3. Year-native products use **`itt05-*`** localStorage keys.  
4. Keep every **`data-*`** hook when densifying HTML.  
5. **Period voice** on product rooms — no “Museum theater” lead copy.  
6. **Never invent brand pixels** — WA / CONTINUITY / RECON only; log failures in CAPTURE.  
7. YouTube default UI = **mid-2005 video product** (not Apr dating-form beta).  
8. Gates green before calling a phase done.  
9. **Git only if the user asks.**

## 2.4 Global gates

```bash
# Serve
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2005/

# Static
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
python3 scripts/audit-internal-links.py

# 2005 e2e pack
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
# or: npm run test:e2e:2005
```

## 2.5 Success criteria (MVP unlock vs 100%)

| Bar | Criteria |
|-----|----------|
| **MVP ship** | Hub unlocked · P0 YouTube/Maps/Reddit/Digg playable with real `itt05` mutation · bans enforced · smoke + auth + core e2e green |
| **Museum-ready** | Continuity M&A honesty · P1 culture rooms · WA P0 logos · densify + real-flows + trail packs · period voice on signatures |
| **100% optional forever** | Full Maps chrome · TC header GIF · bury art · all thin long-tail rooms densified |

---

# Part 3 — Phase map (with ROI)

| Phase | Name | Effort | Ship ROI | Museum ROI | Gate ROI | Leverage | Status |
|------:|------|:------:|:--------:|:----------:|:--------:|:--------:|:------:|
| **R** | Research freeze | M | ★★★★★ | ★★★★★ | ★★★★☆ | **Max** | **[x]** |
| **0** | Assets + harvest prep | M–L | ★★★★☆ | ★★★★★ | ★★★☆☆ | High | **[x]** |
| **1** | Scaffold year from 2004 | M | ★★★★★ | ★★★☆☆ | ★★★★☆ | **Max** | **[x]** |
| **2** | Home / About / tour / dirbar | S–M | ★★★★★ | ★★★★★ | ★★★★☆ | High | **[x]** |
| **3** | YouTube P0 | L | ★★★★★ | ★★★★★ | ★★★★★ | **Max** | **[x]** |
| **4** | Maps + HousingMaps P0 | L | ★★★★★ | ★★★★★ | ★★★★☆ | **Max** | **[x]** |
| **5** | Reddit P0 | M | ★★★★★ | ★★★★★ | ★★★★☆ | High | **[x]** |
| **6** | Digg P0 | M | ★★★★★ | ★★★★★ | ★★★★☆ | High | **[x]** |
| **7** | Continuity honesty (M&A) | M | ★★★★☆ | ★★★★★ | ★★★☆☆ | High | **[x]** |
| **8** | Podcasts + RSS + bookmarks | M | ★★★★☆ | ★★★★☆ | ★★★☆☆ | Med | **[x]** |
| **9** | Tech press + Web 2.0 conf | M | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | Med | **[x]** |
| **10** | Continuity portals densify | M–L | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | Med | **[x]** |
| **11** | Wire hooks + storage isolation | M | ★★★★★ | ★★★★☆ | ★★★★★ | High | **[x]** |
| **12** | Hard e2e + authenticity | M | ★★★★★ | ★★★☆☆ | ★★★★★ | High | **[x]** |
| **13** | Hub unlock + docs | S | ★★★★★ | ★★☆☆☆ | ★★★★☆ | High | **[x]** |
| **14** | Optional pixel polish | M | ★☆☆☆☆ | ★★★☆☆ | ★☆☆☆☆ | Low | **[~]** |
| **15** | Long-tail densify | L–XL | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ | Low–Med | **[x]** sig · **[~]** thin |
| **16** | Optional P2 rooms | M–L | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ | Med | **[x]** core P2 |

**MVP ship** = Phases **R–13**.  
**Museum polish** = **14–16** after green.  
**Order:** R → 0 → 1 → 2 sequential; **3–6** can run brand-by-brand in parallel after 2; **7–10** after P0 stable; **11** after hooks exist; **12** before ship label; **13** unlock last among MVP; **14–16** only after green.

### ROI summary (why this order)

| If you only have 1 day | Do | Why |
|------------------------|-----|-----|
| Day 1 | R + 0 + 1 + 2 | Year boots with thesis — unlocks all later work |
| Day 2–3 | 3 YouTube | Highest visitor memory ROI of any single room |
| Day 3–4 | 4 Maps + HousingMaps | Second signature + Ajax education |
| Day 4–5 | 5–6 Reddit + Digg | Completes “vote the front page” thesis |
| Day 5–6 | 7 + 8 + 11 + 12 + 13 | Honesty + gates + hub unlock = **ship** |
| Later | 9–10, 14–16 | Depth · culture · optional pixels |

**Negative ROI traps (avoid):**

- Inventing logos → authenticity failures + legal/museum honesty debt  
- Building Twitter/open FB “because people expect it” → year-truth collapse  
- Densifying Amazon leaves before YouTube hard flow → low signature ROI  
- Full Maps tile server → out of scope; theater is enough  
- Copying Apr 2005 YouTube dating UI as default → wrong visitor product memory  

---

# Part 4 — Phases in detail (goals · steps · files · ROI · acceptance)

---

## Phase R — Research freeze

### Goal

Lock thesis, bans, scale, timeline, P0 map, and source banks **before any code**. Prevent invented dates and anachronisms.

### Steps

1. Read this file §1 + [`2005-RESEARCH.md`](2005-RESEARCH.md) sections 0–4 completely.  
2. Inventory extracts: `ls docs/references/2005/wayback-extracts/ | wc -l` (expect **46**).  
3. Re-open primaries (or re-read stored extracts): Cybercultural ×2 · Live Stats · Apple PR · Ajax PDF notes · YT mid WA · Reddit WA.  
4. Write bans checklist (copy §1.4).  
5. Confirm P0 list: YouTube · Maps · Reddit · Digg.  
6. Confirm shell: XP + IE6.  
7. Confirm storage prefix plan: **`itt05`**.  
8. **Do not unlock hub** until Phase 13.  
9. If rebuilding: confirm strategy (wipe vs densify) — do not half-edit both.

### Sources

| Source | Use |
|--------|-----|
| This file · RESEARCH · DETAILED-GATHERED · FRESH deep | Facts |
| wayback-extracts/* | Copy banks |
| CAPTURE-LOG · ASSETS | Pixel plan |

### Files (read-only)

- All `docs/2005-*.md`  
- `docs/references/2005/**`  

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Bad research = every later phase rebuilds |
| Museum ROI | ★★★★★ | Thesis accuracy is the whole product |
| Gate ROI | ★★★★☆ | Prevents authenticity ban failures |
| Effort | M | Reading + inventory only |
| **Net** | **Highest leverage hour in the project** |

### Acceptance

- [x] Bans memorized  
- [x] P0 list agreed  
- [x] Scale number locked: **64,780,617**  
- [x] Extracts inventoried  
- [x] YouTube default frame = **mid-2005** (not Apr dating UI)

---

## Phase 0 — Assets + harvest prep

### Goal

Create `assets/period/2005/` from 2004 continuity + attempt **P0 WA logos**. No invented brand marks.

### Steps

1. `mkdir -p assets/period/2005` and brand subdirs (youtube, maps, reddit, digg, facebook, chrome, xp, …).  
2. Copy continuity packs from `assets/period/2004/`: chrome · xp · google · yahoo · amazon · myspace · gmail · flickr · facebook.  
3. For each P0 brand open dated WA `im_` capture; download logo; `file` check.  
4. Prefer: YT `logo_sm.gif` · Digg `digg.com/img/logo.gif` · Reddit header · Google wordmark as Maps mark.  
5. Write `assets/period/2005/README-PIXELS.txt` and per-brand `README-AUTHENTICITY.txt`.  
6. Update [`references/2005/ASSETS.md`](references/2005/ASSETS.md) + [`CAPTURE-LOG.md`](references/2005/CAPTURE-LOG.md).  
7. Tag every file: **WA** · **CONTINUITY** · **RECON**.  
8. If WA fails: use RECON schematic + log failed-final — **do not invent** period brand art.

### Files

```
assets/period/2005/**
docs/references/2005/ASSETS.md
docs/references/2005/CAPTURE-LOG.md
docs/references/harvest/found-assets/2005-*   # staging only
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★☆ | Logos make rooms shippable |
| Museum ROI | ★★★★★ | Wrong pixels destroy trust instantly |
| Gate ROI | ★★★☆☆ | Authenticity / honesty READMEs |
| Effort | M–L | Harvest can be blocked by WA/WDM |
| **Net** | **Do early in parallel with scaffold** |

### Acceptance

- [x] `assets/period/2005` exists  
- [x] Each P0 brand has `logo.gif`  
- [x] CAPTURE attempted; honesty tags present  
- [x] P0 logos **WA** closed (optional full chrome forever)

---

## Phase 1 — Scaffold year tree + configs from 2004

### Goal

Bootable `years/2005/` shell; hub still locked; `itt05` storage; registry entry.

### Steps

1. `cp -R years/2004 years/2005` (if rebuilding; else verify tree).  
2. Replace year strings: `data-itt-year="2005"` · titles · script tags · CSS links.  
3. Create `js/config/2005.js` (browser: urlMap, prefs, perf, bookmarks).  
4. Create `js/config/immersion-2005.js` (`storagePrefix: "itt05"`, features, nav, tour).  
5. Create thin `js/browser-2005.js` + `js/immersion-2005.js`.  
6. Create `css/period-2005.css` (`@import` prior period + 2005 deltas).  
7. Add `IMMERSION_FEATURES_BY_YEAR["2005"]` in `js/immersion/registry.js` (include youtube, maps, reddit, digg, podcasts, housingmaps, …).  
8. Shell body classes: `year-2005` · `os-winxp` · `browser-ie6`.  
9. Manual boot: `http://127.0.0.1:8080/years/2005/` — skip dial-up works.  
10. **Do not unlock hub yet.**

### Files

```
years/2005/**
js/config/2005.js
js/config/immersion-2005.js
js/browser-2005.js
js/immersion-2005.js
css/period-2005.css
js/immersion/registry.js
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Without scaffold nothing is playable |
| Museum ROI | ★★★☆☆ | Still 2004 content until later phases |
| Gate ROI | ★★★★☆ | Boots enable all e2e |
| Effort | M | Mechanical if 2004 is healthy |
| **Net** | **Required foundation — max ship ROI** |

### Acceptance

- [x] Shell loads  
- [x] `data-itt-year="2005"`  
- [x] Skip dial-up works  
- [x] `storagePrefix: "itt05"`  
- [x] Registry has 2005 feature list  

---

## Phase 2 — Home / About / tour / dirbar

### Goal

Visitor understands **2005 thesis** in under 60 seconds; navigation spine matches signature products.

### Steps

1. Rewrite `pages/home.html`: scale · boom thesis · trails (YouTube → Maps → Reddit → Digg).  
2. Rewrite `pages/about.html`: bans box · timeline highlights · shell honesty (XP+IE6).  
3. Set dirbar order in immersion config:  
   **Start · YouTube · Maps · Reddit · Digg · Gmail · Flickr · MySpace**.  
4. Tour steps match §5 user flows.  
5. Footer: **About 2005** (not leftover “About 2004”).  
6. Add/confirm `pages/map.html` flow map if year pattern requires it.  
7. Grep anachronisms under `pages/` and signature rooms.  
8. Ensure Home/About link into P0 rooms with relative paths that work in iframe.

### Files

```
years/2005/pages/home.html
years/2005/pages/about.html
years/2005/pages/map.html
js/config/immersion-2005.js   # nav · footerNav · tour
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Orientation = completion rate |
| Museum ROI | ★★★★★ | Thesis is the year identity |
| Gate ROI | ★★★★☆ | Hub/mvp e2e depends on home copy |
| Effort | S–M | Copy from research freeze |
| **Net** | **Highest museum ROI per line of HTML** |

### Acceptance

- [x] Live Stats number on Home/About  
- [x] Bans box present  
- [x] Dirbar is 2005 products  
- [x] Footer says About **2005**  
- [x] Tour IDs: youtube · maps · reddit · digg · …  

---

## Phase 3 — YouTube P0 (defining product)

### Goal

Recreate **Broadcast Yourself** culture: upload · list · watch · channels — **independent YouTube**.

### Steps

1. **Read first:**  
   - Default: `youtube_aug2005-wa.txt` / mid extract  
   - Honesty only: `youtube_apr2005-wa.txt` (dating UI for About)  
   - Late: `youtube_dec2005-wa.txt`  
   - Assets README  
2. Build/maintain multi-page room:  
   `index.html` · `upload.html` · `watch.html` · `about.html` · `channels.html`  
3. Wire hooks:

| Hook | Role |
|------|------|
| `data-yt-upload` | Form → save title to storage |
| `data-yt-list` | Render session video list |
| `data-yt-player` | Watch theater |
| `data-yt-like` | Increment views / feedback |
| `data-yt-views` · `data-yt-title` | Display |
| `data-yt-status` · `data-yt-upload-status` | Flash/status |

4. Ensure `js/immersion/youtube.js` uses year-aware keys → **`itt05-yt-uploads`**.  
5. Seed *Me at the zoo* lore on about + sample watch.  
6. About: Sequoia Nov 2005 · **still independent** · ban Google ownership.  
7. Mid-year chrome copy: Upload / Watch / Invite / Featured / Tags / Views / Comments.  
8. Add paths to `urlMap` in `js/config/2005.js`.  
9. Manual: upload → list → watch `?v=` mutates storage.  
10. e2e path: `e2e/2005-youtube.spec.js` + hard flows.

### Files

```
years/2005/sites/youtube/**
js/immersion/youtube.js
js/config/2005.js              # urlMap
js/config/immersion-2005.js    # features.youtube · tour
assets/period/2005/youtube/**
e2e/2005-youtube.spec.js
e2e/2005-flows.spec.js
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Without YouTube, 2005 is not 2005 |
| Museum ROI | ★★★★★ | Highest visitor recognition |
| Gate ROI | ★★★★★ | Hard storage mutation = anti-mock bar |
| Effort | L | Multi-page + immersion + e2e |
| **Net** | **#1 product investment** |

### Acceptance

- [x] Upload mutates `itt05-yt-uploads`  
- [x] List renders saved titles  
- [x] Watch theater works  
- [x] No “Google owns YouTube” as fact  
- [x] Mid-year UI (no dating form default)  
- [x] `2005-youtube` e2e green  

---

## Phase 4 — Google Maps + HousingMaps P0

### Goal

Ajax “magic” without live tiles: pan/zoom/search/directions theater + mashup education room.

### Steps

1. **Read first:** `maps-extract.txt` · `maps_oct2005-wa.txt` · `ajax-garrett-20050218-notes.txt` · `housingmaps_2005-wa.txt` · Google Maps launch **Feb 8**.  
2. Build `sites/maps/{index,about,mashups}.html`.  
3. Wire: `data-maps-canvas` · pan · zoom · search · directions · status.  
4. About: Ajax Feb 18 · API June · **no Street View**.  
5. Build `sites/housingmaps/index.html`: For Rent/Sale · city · price · **unaffiliated disclaimer**.  
6. Implement/verify `js/immersion/maps.js` + `housingmaps.js` (or housingmaps local boot).  
7. urlMap entries.  
8. Manual: search → status · pan shifts grid · directions path.  
9. e2e: Maps search + directions in real-flows.

### Files

```
years/2005/sites/maps/**
years/2005/sites/housingmaps/**
js/immersion/maps.js
js/immersion/housingmaps.js   # if separate
assets/period/2005/maps/**
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Second pillar of Web 2.0 thesis |
| Museum ROI | ★★★★★ | Ajax education is period literacy |
| Gate ROI | ★★★★☆ | Real interaction vs static screenshot |
| Effort | L | Canvas theater + mashup room |
| **Net** | **#2 product investment** |

### Acceptance

- [x] Local Search + Directions labels  
- [x] Pan/zoom feedback works  
- [x] HousingMaps disclaimer exact class  
- [x] Street View banned from default UI  
- [x] real-flows Maps assertions green  

---

## Phase 5 — Reddit P0

### Goal

Sparse YC-era front page: boost · submit · hottest/newest.

### Steps

1. **Read first:** `reddit_jul2005-wa.txt` · `reddit-extract.txt` · launch **Jun 23**.  
2. Build `sites/reddit/{index,submit,about}.html`.  
3. Wire: `data-reddit-list` · submit · status · sort tabs.  
4. Use period word **boosts** (not modern “upvotes” as sole label).  
5. Storage: `itt05-reddit-links` · `itt05-reddit-sort`.  
6. Seed geek/newsy headlines (period tone; not modern subreddit culture).  
7. About: Huffman/Ohanian · YC first class · “front page of the internet” pitch.  
8. e2e: boost + submit mutation.

### Files

```
years/2005/sites/reddit/**
js/immersion/reddit.js
assets/period/2005/reddit/**
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Live Stats birthmark product |
| Museum ROI | ★★★★★ | Vote-as-homepage thesis |
| Gate ROI | ★★★★☆ | Storage mutation e2e |
| Effort | M | Smaller than YT |
| **Net** | **Core P0 — do same week as Digg** |

### Acceptance

- [x] Boost mutates storage  
- [x] Submit adds link  
- [x] Sort hottest/newest works  
- [x] Sparse 2005 chrome (not modern redesign)  

---

## Phase 6 — Digg P0 (rise year)

### Goal

Digg/bury social news · Diggnation culture · categories.

### Steps

1. **Read first:** `digg_oct2005-wa.txt` · digg extracts · Diggnation **Jul 1**.  
2. Build `sites/digg/{index,submit,about}.html`.  
3. Wire digg/bury · list · submit · comments.  
4. Storage: `itt05-digg-links` · `itt05-digg-comments`.  
5. About: launched late 2004 · **2005 is the rise** · rivals Slashdot claim.  
6. Categories flavor: technology, science, apple, gaming, linux/unix…  
7. Avoid seeds that assume 2006 facts.  
8. e2e: digg + comments mutation.

### Files

```
years/2005/sites/digg/**
js/immersion/digg.js
assets/period/2005/digg/**
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Completes social-news pair with Reddit |
| Museum ROI | ★★★★★ | Diggnation = 2005 culture memory |
| Gate ROI | ★★★★☆ | Dual vote sites catch fake “mock only” rooms |
| Effort | M | Parallel to Reddit |
| **Net** | **Core P0** |

### Acceptance

- [x] Digg/bury works  
- [x] Comments storage path works  
- [x] Diggnation date on about  
- [x] real-flows Digg green  

---

## Phase 7 — Continuity honesty (M&A + social year-truth)

### Goal

Every continuity product says the **2005** truth — not 2004 leftover, not 2006 spoilers.

### Steps

1. **Flickr:** Mar 20 Yahoo ownership · not Yahoo Photos. Sources: `flickr-yahoo-acquire-20050320.txt`.  
2. **MySpace:** Jul 18 $580M · Fox Interactive Media. Source: `myspace-newscorp-20050718-notes.txt`.  
3. **Facebook:** dual-era Thefacebook → facebook · Accel $12.7M · high schools Sep · **still not open**. Sources: thefacebook + facebook WA extracts.  
4. **Skype/eBay:** Sep 12 ~$2.6B room or news beat. Source: `ebay-skype-20050912-notes.txt`.  
5. **del.icio.us:** product UI + Dec 9 Yahoo note.  
6. **Gmail / Amazon / Yahoo / Google:** year labels, ©2005 where appropriate.  
7. Grep leftover “2004” / “museum theater” on signature rooms.  
8. Optional residual: year-aware gmail/fb/flickr keys (`itt05-*`) vs document shared continuity.

### Files

```
years/2005/sites/flickr/**
years/2005/sites/myspace/**
years/2005/sites/facebook/**
years/2005/sites/skype/**          # if present
years/2005/sites/delicious/**
years/2005/sites/gmail/**
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★☆ | Prevents “wrong year” visitor complaints |
| Museum ROI | ★★★★★ | Year identity lives in continuity beats |
| Gate ROI | ★★★☆☆ | Authenticity year-voice checks |
| Effort | M | Mostly copy + about densify |
| **Net** | **High museum ROI, medium effort** |

### Acceptance

- [x] Flickr Yahoo Mar 20  
- [x] MySpace News Corp $580M  
- [x] Facebook gated + rename honesty  
- [x] No open-Facebook / News Feed as 2005 default  

---

## Phase 8 — Podcasts + RSS + bookmarks

### Goal

iTunes podcast subscribe theater + RSS/bookmark culture of 2005.

### Steps

1. **Read:** Apple PR Jun 28 · 1M subs Jun 30 notes · Bloglines · delicious Sep WA.  
2. iTunes pages: directory · subscribe buttons `data-pod-sub` · status.  
3. Storage: `itt05-pod-subs`.  
4. densify Bloglines / feedburner continuity.  
5. delicious tags + bookmarklet densify.  
6. About claims: 3,000+ free pods · >1M subs in two days.  
7. e2e: pod sub mutates storage (live or densify suite).

### Files

```
years/2005/sites/itunes/**
years/2005/sites/bloglines/**
years/2005/sites/delicious/**
js/immersion/podcasts.js
js/immersion/itunes.js
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★☆ | Unique 2005 beat (podcasts mainstream) |
| Museum ROI | ★★★★☆ | RSS era literacy |
| Gate ROI | ★★★☆☆ | One more real storage flow |
| Effort | M | |
| **Net** | **Strong P1 — do after P0** |

### Acceptance

- [x] Subscribe mutates `itt05-pod-subs`  
- [x] Jun 28 / 4.9 / scale claims present  
- [x] delicious densify from Sep WA  

---

## Phase 9 — Tech press + Web 2.0 conference culture

### Goal

Startup-press beat (TechCrunch) + conference thesis room.

### Steps

1. TechCrunch: “Tracking Web 2.0” · sparse blog · seed posts (YubNub class). Extract: `techcrunch_jun2005-wa.txt`.  
2. Optional: Mashable · ProgrammableWeb · Memeorandum.  
3. `sites/web20conference/` — Oct sold-out energy (MacManus #1 moment).  
4. urlMap + home trail links.  
5. Optional forever: TechCrunch header GIF (do not invent).

### Files

```
years/2005/sites/techcrunch/**
years/2005/sites/web20conference/**
years/2005/sites/mashable/**           # P2
years/2005/sites/programmableweb/**    # P2
years/2005/sites/memeorandum/**        # P2
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★☆☆ | Not required for hub unlock if P0 solid |
| Museum ROI | ★★★★☆ | Explains boom *business* narrative |
| Gate ROI | ★★☆☆☆ | Soft culture pages |
| Effort | M | |
| **Net** | **Do after ship bar if time-limited** |

### Acceptance

- [x] TechCrunch room live  
- [x] Web 2.0 conference culture linked from home/about  

---

## Phase 10 — Continuity portals densify

### Goal

Google · Yahoo · Amazon · Wikipedia · CNN feel year-true (not empty 2004 clones).

### Steps

1. Google: ©2005 · Searching ~8B pages class · Local/Maps entry.  
2. Yahoo: portal densify · buyer of Flickr/del.icio.us note.  
3. Amazon: smile continuity · keep cart hooks · densify thin leaves carefully.  
4. Wikipedia / CNN: 2005 voice (not leftover 2003 copy).  
5. Keep all immersion hooks when densifying.  
6. urlMap complete for new leaves.

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★☆☆ | Breadth over signature depth |
| Museum ROI | ★★★☆☆ | “Whole web” feeling |
| Gate ROI | ★★★☆☆ | Link audit · smoke urlMap |
| Effort | M–L | Many pages |
| **Net** | **Volume work — batch after P0** |

### Acceptance

- [x] Signature portals year-labeled  
- [x] Cart/search hooks still work  
- [x] urlMap unmapped ≈ 0 for content HTML  

---

## Phase 11 — Wire hooks + storage isolation

### Goal

Every signature flow mutates **`itt05-*`** and feedback works; no silent mock buttons.

### Steps

1. Grep `data-yt-` · `data-maps-` · `data-reddit-` · `data-digg-` · `data-pod-` under `years/2005`.  
2. Confirm registry loads modules for 2005.  
3. Confirm immersion features flags true in `immersion-2005.js`.  
4. Manual storage check in DevTools: keys prefixed `itt05`.  
5. Audit cross-year bleed: gmail/facebook/flickr may still use `itt04-*` — document or fix year-aware keys.  
6. `actionFeedback` on signature clicks.  
7. No dead `href="#"` primary CTAs on P0 pages.

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Real flows = product bar |
| Museum ROI | ★★★★☆ | Click → consequence = immersion |
| Gate ROI | ★★★★★ | no-mock / real-flows suites |
| Effort | M | Debugging hooks |
| **Net** | **Mandatory before claiming MVP** |

### Acceptance

- [x] YT / Maps / Reddit / Digg / pods mutate storage  
- [x] Prefix `itt05` on year-native keys  
- [x] densify-real-vs-mock class checks pass for 2005  

---

## Phase 12 — Hard e2e + authenticity

### Goal

Automated proof that 2005 is playable and year-honest.

### Steps

1. Ensure suites exist / pass:

| Spec | Proves |
|------|--------|
| `2005-mvp.spec.js` | Hub unlock · shell · P0 presence |
| `2005-buttons.spec.js` | Multi-page nav |
| `2005-live-flows.spec.js` | Soft product paths |
| `2005-flows.spec.js` | Hard YT + bans class |
| `2005-youtube.spec.js` | Upload · list · watch · storage |
| `2005-real-flows.spec.js` | Maps · Reddit · Digg · YT hard |
| `2005-densify.spec.js` | Depth rooms |
| `2005-trail-real-flows.spec.js` | Trail continuity |

2. Run authenticity: expect bans clean · 2005 in year matrix.  
3. Run smoke + link audit.  
4. Fix failures before unlock claims.  
5. Optional: add to `hub-years.spec.js` assertions.

### Commands

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Without gates, regressions greenwash ship |
| Museum ROI | ★★★☆☆ | Quality insurance |
| Gate ROI | ★★★★★ | Definition of “done” |
| Effort | M | Write + fix flakes |
| **Net** | **Do not ship without this** |

### Acceptance

- [x] Core 2005 e2e green  
- [x] Authenticity green  
- [x] Smoke green  

---

## Phase 13 — Hub unlock + docs

### Goal

Visitor can open 2005 from lobby; docs match disk truth.

### Steps

1. Unlock year card in `index.html` (available, not locked).  
2. Update hub stats / announcement if needed (years open range).  
3. Update [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`2005-MUSEUM-GRADE.md`](2005-MUSEUM-GRADE.md) · this file status.  
4. Confirm resume / signature jump links include 2005 if desired.  
5. `hub-years.spec.js` expects 2005 available.  
6. Do **not** unlock 2006 until 2006 research freeze.

### Files

```
index.html
css/hub.css
docs/DISK-TRUTH.md
docs/2005-MUSEUM-GRADE.md
docs/2005-MASTER-BIBLE-RESEARCH-GOALS-PHASES-ROI.md  # this file
e2e/hub-years.spec.js
```

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★★★★ | Tree without hub unlock = invisible |
| Museum ROI | ★★☆☆☆ | Docs honesty |
| Gate ROI | ★★★★☆ | Hub e2e |
| Effort | S | |
| **Net** | **Final MVP step** |

### Acceptance

- [x] Hub card open  
- [x] Docs say museum-ready / live  
- [x] hub-years green  

---

## Phase 14 — Optional pixel polish **[~]**

### Goal

Optional forever pixels: full Maps UI chrome · TechCrunch header · digg bury button art.

### Steps

1. Only after Phase 12 green.  
2. Harvest from WA/WDM only; update CAPTURE + ASSETS.  
3. Never invent.  
4. If blocked: leave RECON + honesty README.

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★☆☆☆☆ | Does not block ship |
| Museum ROI | ★★★☆☆ | Pixel snobs notice |
| Gate ROI | ★☆☆☆☆ | |
| Effort | M | Harvest friction high |
| **Net** | **Lowest priority — forever optional** |

### Acceptance

- [~] Optional forever  

---

## Phase 15 — Long-tail densify **[~]** remaining thin

### Goal

Thin HTML (&lt;1.5 KB) long-tail rooms get period depth without breaking hooks.

### Steps

1. List thin pages: `find years/2005 -name '*.html' -size -1500c`.  
2. Prioritize linked-from-home rooms.  
3. Densify from extracts / continuity — keep `data-*` hooks.  
4. Period voice only.  
5. Re-run authenticity after large batches.

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★☆☆☆ | Diminishing returns after signatures |
| Museum ROI | ★★★☆☆ | “Everywhere feels lived-in” |
| Gate ROI | ★★☆☆☆ | Link audit volume |
| Effort | L–XL | Many pages |
| **Net** | **Batch polish after ship** |

### Acceptance

- [x] Signature densify done  
- [~] Residual thin long-tail optional  

---

## Phase 16 — Optional P2 rooms

### Goal

Million Dollar Homepage · Memeorandum · Skype · Mashable · ProgrammableWeb · Google Video culture rooms.

### Steps

1. MDH: Aug 26 2005 · $1/pixel · $1,037,100 raised.  
2. Skype: eBay deal honesty.  
3. Memeorandum: news clustering.  
4. Mashable / ProgrammableWeb / Google Video: light culture.  
5. Wire home trails sparingly.  
6. Soft e2e load checks optional.

### ROI

| Dimension | Score | Detail |
|-----------|:-----:|--------|
| Ship ROI | ★★☆☆☆ | Flavor after MVP |
| Museum ROI | ★★★☆☆ | Completes 2005 *culture* |
| Gate ROI | ★★☆☆☆ | |
| Effort | M–L | |
| **Net** | **Do when P0–P1 green** |

### Acceptance

- [x] Core P2 rooms present on disk  
- [~] Deeper multipage optional  

---

# Part 5 — User flows (period rituals)

## Flow A — YouTube night

1. Open YouTube from dirbar.  
2. Watch featured / *Me at the zoo* theater.  
3. Upload a title → list updates (`itt05-yt-uploads`).  
4. Open watch · like · see views.  
5. Read About: independent company · Sequoia · not Google-owned.

## Flow B — Ajax Maps discovery

1. Open Google Maps.  
2. Local Search What/Where.  
3. Pan/zoom canvas (no full page reload metaphor).  
4. Directions start/end.  
5. Open HousingMaps · pick city · see disclaimer.

## Flow C — Vote the front page

1. Reddit: boost a story · submit a link · switch hottest/newest.  
2. Digg: digg a headline · open comments · Diggnation note.

## Flow D — Podcast commute era

1. iTunes · browse free podcasts.  
2. Subscribe → `itt05-pod-subs`.  
3. Status: auto-download → iPod class story.

## Flow E — M&A year trail

1. Flickr About: Yahoo Mar 20.  
2. MySpace: News Corp Jul 18 $580M.  
3. Skype/eBay: Sep 12.  
4. delicious: Yahoo Dec 9.  
5. About 2005: boom thesis.

## Flow F — Still not open Facebook

1. Facebook welcome · college/high school framing.  
2. Confirm **not** open registration / News Feed 2006 story.

## Flow G — Portal baseline

1. Google search continuity.  
2. Yahoo portal.  
3. Amazon cart continuity (`itt05` / year cart keys).  
4. Exit → Year menu.

---

# Part 6 — Wire table (edit X → read Y)

| When editing… | Read first |
|---------------|------------|
| YouTube | `youtube_aug2005-wa.txt` · mid extract · `assets/period/2005/youtube/*` · `youtube.js` · `2005-youtube.spec.js` |
| Maps | `maps-extract.txt` · Ajax notes · `maps.js` · HousingMaps extract |
| Reddit | `reddit_jul2005-wa.txt` · `reddit.js` |
| Digg | `digg_oct2005-wa.txt` · `digg.js` |
| iTunes pods | Apple PR extract · `podcasts.js` |
| Flickr Yahoo | `flickr-yahoo-acquire-20050320.txt` |
| MySpace sale | `myspace-newscorp-20050718-notes.txt` |
| Facebook dual-era | `thefacebook_may2005-wa.txt` · `facebook_sep2005-wa.txt` |
| Home/About thesis | Cybercultural + Live Stats extracts |
| Shell | ARCHITECTURE · 2004 scaffold · XP/IE assets |

---

# Part 7 — Disk inventory snapshot (2026-08-05)

| Class | Count / path |
|-------|----------------|
| HTML | **~274** under `years/2005/` |
| Site rooms | **78** under `years/2005/sites/` |
| Period assets | **162** under `assets/period/2005/` |
| Wayback extracts | **46** under `docs/references/2005/wayback-extracts/` |
| e2e | `2005-mvp` · buttons · live-flows · flows · youtube · real-flows · densify · trail-real-flows |
| storagePrefix | **`itt05`** |
| Shell | Windows XP + IE 6 |
| Hub | **Unlocked** |
| Grade | **Museum-ready** |

### P0 rooms on disk

```
years/2005/sites/youtube/   index upload watch about channels
years/2005/sites/maps/      index about mashups
years/2005/sites/reddit/    index submit about
years/2005/sites/digg/      index submit about
years/2005/sites/housingmaps/ index
```

### Residual optional forever

| Item | Notes |
|------|-------|
| Full Maps UI chrome WA | Optional |
| TechCrunch header GIF | Optional |
| digg bury button art | Optional |
| Long-tail thin HTML | ~optional densify |
| Year-aware gmail/fb/flickr keys | Optional isolation vs intentional continuity |
| Gmail mid-2005 WA re-fetch | Prior FAIL; use 2004 continuity |

---

# Part 8 — Rebuild-from-scratch checklist (if tree wiped)

```text
[ ] Phase R  Research freeze (this file)
[ ] Phase 0  assets/period/2005 + CAPTURE
[ ] Phase 1  Scaffold from years/2004 + configs + registry
[ ] Phase 2  Home/About/tour/dirbar
[ ] Phase 3  YouTube hard flows
[ ] Phase 4  Maps + HousingMaps
[ ] Phase 5  Reddit
[ ] Phase 6  Digg
[ ] Phase 7  Continuity M&A honesty
[ ] Phase 8  Podcasts + delicious + Bloglines
[ ] Phase 9  TechCrunch + conference
[ ] Phase 10 Portal densify
[ ] Phase 11 Hooks + itt05 isolation
[ ] Phase 12 e2e + authenticity green
[ ] Phase 13 Hub unlock + docs
[ ] Phase 14–16 Optional only
```

**Commands after Phase 1:**

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2005/
```

**Commands before ship (Phase 12–13):**

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

# Part 9 — ROI decision matrix (what to build next)

| Situation | Build next | Why (ROI) |
|-----------|------------|-----------|
| Tree missing | Phase 0–2 | Zero playable value until boot |
| Boot works, no YT | Phase 3 | Highest visitor recognition ROI |
| YT works, thin Maps | Phase 4 | Completes Ajax thesis |
| P0 incomplete | 5–6 | Completes vote-homepage thesis |
| P0 green, wrong year voice | Phase 7 | High museum trust ROI |
| Ready to ship | 11–13 | Gates + hub = actual unlock |
| Already museum-ready | 14–16 only if polish needed | Diminishing ship ROI |
| Time-boxed demo | R + 2 + 3 + 13 minimal | Max wow per hour (YT + thesis) |

### Cost of skipping phases

| Skip | Cost |
|------|------|
| Skip R | Invented dates · ban failures · rewrite tax |
| Skip 0 | Broken images · RECON debt · honesty failures |
| Skip 3 | Year feels empty to visitors |
| Skip 11 | “Mock museum” — buttons that do nothing |
| Skip 12 | Silent regressions on next densify |
| Skip 14–16 | Acceptable — forever optional |

---

# Part 10 — One-page summary

| Item | Value |
|------|--------|
| Thesis | Web 2.0 **business boom** |
| Scale | **64,780,617** sites · **~1.03B** users |
| Shell | XP + IE6 · `itt05` |
| P0 | YouTube · Maps · Reddit · Digg |
| Signature dates | Maps Feb 8 · Ajax Feb 18 · YT Apr 23 · Reddit Jun 23 · pods Jun 28 |
| Hard bans | Twitter · open FB · Google-owns-YT · Chrome · iPhone · Vista · Street View default |
| MVP phases | **R–13** |
| Optional | **14–16** |
| Disk now | **Museum-ready · hub unlocked** |
| Research SSOT | **This file** + `2005-RESEARCH.md` + extracts |

---

*Research freeze + ROI phase bible written 2026-08-05. Educational reconstruction only. Prefer this file + wayback extracts over memory when densifying or rebuilding.*
