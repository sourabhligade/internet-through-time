# Flows + links UX — deep-research harvest

**Date:** 2026-08-15  
**Question:** How do we add more **links** and **flows** so each year *feels* like using that year’s web — without growing forests, stealing the one-thing, or inventing 404s.  
**Status:** Research only. **Do not implement until a year is named.** Catalog/parked work stays aside.  
**Per-year walk-throughs:** [`FLOWS-LINKS-UX-NEW-FLOWS-PER-YEAR-DETAIL-2026-08-15.md`](FLOWS-LINKS-UX-NEW-FLOWS-PER-YEAR-DETAIL-2026-08-15.md)  
**Git only if asked.**

Companions (newest intent wins; older checkboxes are often stale):

| File | Role |
|------|------|
| [`FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md`](FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md) | 38,044 internal links · **0 broken** |
| [`FLOW-MAPS.md`](FLOW-MAPS.md) · `js/config/flow-maps.js` | Visitor tree |
| [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Incomplete never writes |
| [`2010-2020-FLOWS-TODO-GOALS-PHASES-STEPS.md`](2010-2020-FLOWS-TODO-GOALS-PHASES-STEPS.md) | Guided `<ol>` **exactly 6** |
| [`COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md`](COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md) | Second machines — all `[ ]` until a year is named |
| [`references/SOURCE-CATALOG.md`](references/SOURCE-CATALOG.md) | How to tag OPEN / SNIP / BLOCK |

This file is the **harvest**. It is not READ-FIRST, not a SOURCE-CATALOG fill, not HTML.

---

## 0. Answer first

The hole is **handoff**, not missing pages.

| What people assume | What disk actually is (2026-08-15) |
|--------------------|-------------------------------------|
| Add more sites → better UX | 2004–2010 already have **80–115** site folders. 2019 has **166**. Mapping them is a forest restore. |
| Fix 404s | Audit already: **0 broken** hrefs. |
| Grow the home list | Guided `<ol>` is locked at **6**. 1999 already has **7** (violation). 2019 has **0**. |
| New gold machines | One-things exist. 2011 Airbnb and 2012 SoundCloud are **on disk** and **off the map**. |

Highest-ROI add (cited below):

1. Put the **year’s gold on that year’s map** (2011 Airbnb · 2012 SoundCloud).  
2. Add **`data-next-flow` chips** after a REAL save — destination is **this year’s gold**, never only `pages/home.html`. Pattern already ships in 2016–2018.  
3. Add **period verbs as in-room links** (Yahoo category → leaf; bid → My eBay; Join → mute → leave) on rooms that already exist.  
4. Do **not** map the Amazon/Yahoo/Google clone forests. Do **not** grow 2018/2020 past ~60 HTML. Do **not** remake 2019 by copying 2018.

---

## 1. Disk truth this pass

### 1.1 HTML · guided · Next chips · one-thing

| Year | HTML | Guided `<ol>` | `data-next-flow` | One-thing on home | Map gold match? |
|-----:|-----:|--------------:|-----------------:|-------------------|-----------------|
| 1994 | 177 | 6 | 0 | yes | CSotD on map |
| 1995 | 142 | 6 | 0 | yes | Amazon / AuctionWeb on map |
| 1996 | 100 | 6 | 0 | yes | HoTMaiL on map |
| 1997 | 84 | 6 | 0 | yes | PointCast / eBay on map |
| 1998 | 127 | 6 | 0 | yes | Google! Lucky on map |
| 1999 | 151 | **7** | 0 | yes | AIM + Napster on map |
| 2000 | 173 | 6 | 0 | yes | MapQuest on map |
| 2001 | 186 | 6 | 0 | yes | MSN + Wikipedia on map |
| 2002 | 209 | 6 | 0 | yes | Stumble **not** a named leaf (Friendster is) |
| 2003 | 232 | 6 | 0 | yes | Photobucket → MySpace on map |
| 2004 | 289 | 6 + extra 7 | 0 | yes | thefacebook on map |
| 2005 | 294 | 6 + extra 7 | 0 | yes | Pandora + YouTube on map |
| 2006 | 299 | 6 + extra 7 | 0 | yes | Twitter on map |
| 2007 | 315 | 6 + 6 | 0 | yes | iPhone Safari on map |
| 2008 | 326 | 6 + 6 + 4 | 0 | yes | GitHub + App Store on map |
| 2009 | 338 | 6 + 6 + 4 | 0 | yes | Like / SO / 4sq on map |
| 2010 | 378 | 6 + 6 | **1** | yes | Imgur → Reddit on map |
| 2011 | **46** | 6 + 4 | **0** | yes (Airbnb) | **No Airbnb leaf.** Thesis still “Spotify US” |
| 2012 | **47** | 6 + 5 | **0** | yes (SoundCloud) | **No SoundCloud leaf.** Visual-apps trail is IG |
| 2013 | 59 | 6 + 7 | 2 | yes | Vine / Stories on map |
| 2014 | 58 | 6 + 7 | 1 | yes | WhatsApp on map |
| 2015 | 95 | 6 + 4 | 0 | yes | Watch on map |
| 2016 | 103 | 6 | **28** | yes | Stories on map |
| 2017 | 49 | 6 + 6 | **33** | yes | Face ID on map |
| 2018 | 48 | 6 + 6 | **29** | yes | GDPR on map |
| 2019 | **526** | **0** | 12 (most → home) | **no** | Disney+ is a leaf; home is not a lobby |
| 2020 | 52 | 6 | **4** | yes | Zoom on map |

`showNext()` lives in `js/immersion/year-extras-kit.js` and unhides `[data-next-flow]` after a REAL write. Early years never call it.

### 1.2 Maps vs folders

`ITT.flowMaps` has all **27** years (1994–2020). Hrefs are **year-relative** (`sites/yahoo/index.html`) and resolve from `years/YYYY/pages/map.html`. A naive “file exists at repo root” check is a false miss.

Unmapped **site folders** are huge on forest years (2004=80, 2008=97, 2009=106, 2010=115, 2019=166). That is **not** a todo to add 166 map leaves. Lean years (2011=17 folders, 2012=20) can take **one** missing gold leaf each.

`steps[]` exist on some early/mid maps (Yahoo drill, MapQuest, Photobucket, Pandora, Imgur). Late lean maps (2011, 2012, 2017, 2018, 2020) mostly omit them. Optional; do not invent a second ritual.

### 1.3 What later docs already named (do not invent)

Newest leftover boards, deduped by the 2026-08-15 markdown pass:

| Layer | Status | Use for *links/flows* |
|-------|--------|------------------------|
| FLOWS-LINKS improve 1–9 | mostly `[x]` | Already shipped machines. Do not rebuild. |
| COMPLEX primaries | mostly shipped | Chip, don’t restar. |
| COMPLEX live-UX **seconds** | all `[ ]` | Only if a year is named. Not this harvest’s implement. |
| Next-flow to gold | written as law; missing 1994–2015 | **This** is the UX add. |
| 2019 remake | forest 526 vs ~60 cap | Do not densify. Remake later. |

---

## 2. UX laws from period + museum sources

These are the rules for *where a new link goes*. They are not taste.

### 2.1 Location, not history

Nielsen recommended breadcrumbs **since 1995**. 2007 write-up: breadcrumbs show **hierarchy**, not the session path. History duplicates **Back**, the web’s second-most-used control. Deep-link arrivals (search, Cool Site, a friend’s URL) are the case breadcrumbs exist for.

2018 NN/g (Laubheimer): 11 guidelines. Do not replace global nav. One canonical path on a polyhierarchy. Current page is last and **not** a link. Flat 1–2 level sites do **not** need a trail. Mobile: do not wrap; prefer one “up” link.

**Museum mapping:** Yahoo 1994 *is* a breadcrumb year (Computers > Internet > …). Instagram Stories 2016 is **not**. Do not sprinkle `Home > Site > Page` on a 2017 lean room. Do sprinkle it on Yahoo / DMOZ / GeoCities neighborhoods.

### 2.2 You-are-here (Farrell, NN/g 2015)

Visitors do not use the front door. Each page must answer “what site, what topic, what year.” Toolkit: logo → homepage, nav highlight, heading, unique `<title>`, human URL, breadcrumb, date cue.

**Museum mapping:** year shell already does logo + location bar. Content HTML should keep a **year-true** “you are here” (Yahoo category path, Gmail invite lore, “college network”, “You’re muted”). Dead ends need a way back that is **not** only the browser Back — Farrell’s Telegraph 404 pattern.

### 2.3 Nielsen’s 10 heuristics (1994, still the museum’s REAL bar)

| # | Heuristic | Museum flow meaning |
|---|-----------|---------------------|
| 1 | Visibility of status | After save, show the list / the Next chip in **<1s**. Incomplete stays silent *and coaches*. |
| 2 | Real-world language | Period verbs: *browse, bid, homestead, Lucky, bury, Get, Like, request, hold, Manage, Join*. Not “Submit form A”. |
| 3 | Control / exit | Cancel · leave meeting · reject cookies. Accept All is the **2018 trap**, not the exit. |
| 4 | Consistency | `data-next-flow` markup + extras-kit unhide. Don’t invent a second chip system. |
| 5 | Error prevention | Incomplete **never writes**. Preview ≠ Save (Wikipedia 2001). |
| 6 | Recognition not recall | Map tree + guided 6 + Next chip. Don’t make the visitor remember `sites/foo/bar.html`. |
| 7 | Flexibility | Handbook / What’s New for experts; guided 6 for first night. |
| 8 | Minimal | Lean years +3 HTML max. One Next, not a footer of 12. |
| 9 | Recover | Empty REAL says what to type. Zero-byte Napster search is honesty, not a crash. |
| 10 | Help in context | `pages/handbook.html` / About — not a tutorial wall on the gold machine. |

### 2.4 Period chrome is story, not a trap

UX-IMPROVEMENT bible + heuristic #2: do not Material-ize 1997. A 1994 Next chip should look like a gray Mosaic line (`<p><b>Next:</b> …`), not a 2018 pill. The **mechanism** (`data-next-flow` + `hidden` until REAL) can be shared. The **skin** is the year’s CSS.

### 2.5 Museum-specific locks (do not argue)

- Guided home `<ol>` stays **exactly 6**. COMPLEX / Next / “also” chips live **under** P1, never as item 7.  
- **No second star.** Never a second `data-ott-one-thing`.  
- Next-flow points at **this year’s gold**, not only Starting Point.  
- Lean remakes: **~40–70 HTML**, 2018-style hard cap **~60**.  
- Incomplete never writes `{ multiStep, real, year, ts }`.  
- Live Stats June table **ends 2018**. 2019/2020 About does not invent a websites cell. Zoom **300M** is daily meeting **participants** (Yuan 2021-03-17), not unique users.  
- Do not invent brand pixels. Do not `cp -R` a prior year. Do not scaffold 2021+.

---

## 3. Period navigation verbs (what a “flow” *was*)

A new link is only worth adding if it teaches that year’s verb.

| Era | How people moved | Verb to put on links | Do **not** fake |
|-----|------------------|----------------------|-----------------|
| **1994–1995** | Hierarchical directories (Yahoo = “Yet Another Hierarchical Officious Oracle”). Gopher menus. Cool Site of the Day as a *single* outbound hop. HotWired banner (27 Oct 1994) is a **click**, 468×60. GeoCities: pick a **neighborhood** then a street number (2 MB). | Browse · drill · visit today’s site · homestead · click HERE | Search-the-whole-web as default. Stories. Infinite scroll. |
| **1996–1997** | Portals as home. HoTMaiL (4 Jul 1996) = mail from **any** browser. AuctionWeb → eBay (Sep 1997) + **Feedback Forum**. PointCast push. ICQ UIN. Slashdot moderate. | Compose · send · bid higher · feedback · subscribe channel · sign on | App Store. News Feed. |
| **1998–1999** | Empty Google vs packed portal. I’m Feeling Lucky. Napster (1 Jun 1999) search → download → library. AIM screen name. Blogger publish. | Type a query · Lucky · search a track · sign on | Instant Book. FYP. |
| **2000–2001** | Crash + memory. MapQuest From/To/print. Wikipedia (15 Jan 2001) edit → **preview is not Save** → history. MSN Messenger. iPod/iTunes library. | Get directions · print · preview · save · nudge | Street View pegman (2007). |
| **2002–2003** | Social graph seed. Friendster work 2002 / public **Mar 2003** (six degrees + testimonials). MySpace HTML + Tom. Photobucket filename → hotlink. iTunes Store **99¢**. WordPress. | Stumble · testimonial · comment · upload filename · buy 99¢ | College-only facebook (2004). |
| **2004–2005** | Web 2.0 named. thefacebook **4 Feb 2004** Harvard / college email. Gmail **1 Apr 2004** 1 GB + invite (capacity ~10k). Flickr tags. Firefox tabs. YouTube **23 Apr 2005** “Me at the zoo”. Maps slippy pan. Digg/Reddit vote. | Join a **network** · invite · upload · watch · like · pan/zoom · bury | Open-to-all Facebook (2006). Google owns YouTube (Oct 2006). |
| **2006–2007** | News Feed + open registration. Twitter 140. YouTube sale. iPhone **9 Jan / 29 Jun 2007** — Safari, **no App Store**. Street View 29 May. Facebook Platform **24 May 2007** f8 (~65 partners / 85 apps). Beacon leak. Gmail opens. | Post 140 · open the Feed · drag pegman · add an app · Safari URL | Native Get (2008). Like button (2009). |
| **2008–2010** | App Store **10 Jul 2008**, **>500** native apps (Apple Newsroom). Chrome Windows beta. G1. Like **9 Feb 2009**. Foursquare check-in. FarmVille wait. Imgur → Reddit. Instagram **6 Oct 2010** **iOS-only**. iPad $499. | Get · Like · check in · plant/wait · upload + submit · pick a filter | Android Instagram (3 Apr 2012). Stories (2016). |
| **2011–2013** | Airbnb **request** (host accepts — not Instant Book as the gold). Timeline as life story (JSON, not `"1"`). SoundCloud **timed** comment. IG Android. Vine **hold** 6s. Snap Stories **24h**. iOS 7 flat. | Request to book · comment at 0:32 · hold to record · swipe story | IG Stories (2 Aug 2016). Reels (2020). |
| **2014–2016** | WhatsApp $19B class. Slack #general persist. Heartbleed rotate. Apple Watch ships. Discord #channel. Instagram Stories **2 Aug 2016**, 24h tap-through (then 500M MAU class). Pokémon GO outdoor. Vine goodbye. | Chat · rotate password · go live · tap story · catch outside | Reels. TikTok US mass (2018 merge). |
| **2017–2018** | iPhone X / Face ID **12 Sep 2017**, $999, ship **3 Nov**, swipe-up, no Home. Fortnite BR year-game. GDPR **25 May 2018** — Accept All is the trap; **Manage** is gold. Nouwens 2020: remove Reject → +22–23 pp consent. TikTok For You **2 Aug 2018** musical.ly merge. Hearing 10 Apr. | Unlock with face · Manage cookies · tap For You | Reels. Disney+. Zoom default. |
| **2019–2020** | Disney+ **12 Nov 2019** trial trap / Continue. Zoom: 10M (Dec 2019) → **300M daily meeting participants** (Apr 2020) — Yuan 17 Mar 2021. Join is the trap. Reels **5 Aug 2020** 15s. CCPA Do Not Sell. Flash **31 Dec 2020**. Live Stats table **has no 2019/2020 websites row**. | Join · mute · chat · leave · Continue · Do Not Sell | Case-count dashboard. Invent a June websites digit. |

---

## 4. How to add links (mechanics)

Four surfaces. Use the **smallest** one that teaches the verb.

### 4.1 In-room period links (every year)

On an existing product page, add 1–3 hrefs that a 199X/200X user would have clicked **inside that product**:

| Year example | From | To | Why |
|--------------|------|----|-----|
| 1994 | `yahoo/index.html` | `yahoo/Computers/index.html` → a leaf | Hierarchy *is* the UX (WDM + Yahoo backronym). |
| 1995 | `geocities/index.html` | `geocities/SunsetStrip/…` or Area51 | Neighborhood before HTML. |
| 1997 | `ebay/item-*.html` | `ebay/myebay.html` | Bid then Feedback / My eBay (eBay Inc. history: Feedback 1997, My eBay 1998). |
| 2001 | `wikipedia` edit | preview page · history | Preview ≠ Save. |
| 2003 | Photobucket | MySpace profile img | Hotlink is the product. |
| 2004 | `facebook/networks.html` | profile / friends | College graph, not News Feed. |
| 2007 | `iphone` Safari | a **mobile-broken** card | Phone as browser, no Get. |
| 2008 | `appstore/index.html` | a library residual | Get → library (Apple: >500 apps, 10 Jul). |
| 2010 | Imgur | `reddit/submit.html` | Already the one Next on 2010. |
| 2018 | `gdpr/manage.html` | `tiktok/fyp.html` | Already the gold pattern. |
| 2020 | `zoom/recap.html` | Reels · CCPA | Already there; only **2** rooms have chips. |

Rules: href must exist. No `javascript:`. No “Coming soon.” Continuity rooms (Amazon 2008 copying Amazon 2000) stay **labeled archive**, not new trail heads.

### 4.2 `data-next-flow` chips (the missing layer)

Markup (already in 2016–2018):

```html
<p class="ittYY-next" data-next-flow hidden>
  <b>Next:</b> <a href="../GOLD/index.html">Gold name · verb</a>
</p>
```

Show only after REAL save (`year-extras-kit.showNext` / `real-flow.js`). Hidden on first paint so the e2e “empty stays hidden” contract holds.

**Where to put the first chip in a thin year:** the one-thing success state, then 2–4 P0 rooms that currently dump the visitor.

**Where not to:** every residual. 2019’s 12 chips mostly say Starting Point — that is a **dead** Next (heuristic #8 + “never only home”).

Destination priority:

1. This year’s gold machine  
2. The next step *inside* the same product (Manage → Rights, Join → Meeting)  
3. The year game **only** if the gold already saved  
4. Starting Point only from a true end (Dropbox IPO, pixel leftover)

Skin: match the year. 1995 = blue underlined Times. 2007 = Helvetica + aqua. 2018 = system UI pill is allowed.

### 4.3 Flow-map leaves (only if the room exists and is a verb)

Add a leaf when **all** of these are true:

- The HTML file exists.  
- The visitor can **do** the year’s verb there.  
- The map currently **omits the gold** or a P0 trail head.  
- The year is lean, **or** the leaf is a 3-site trail (not a 40-site dump).

Do **not** add a leaf for every folder in 2006 or 2019.

`steps[]` (3 short strings) only when the room is multi-step REAL. Copy 2000 MapQuest / 2010 Imgur, not a novel schema.

### 4.4 Home guided list

**Do not add a 7th `<li>`.** 1999 already violates. 2004–2010 extra `<ol>`s are leftovers — do not grow them. 2019 has **no** `<ol>`: that is a remake bug, not a “add links” ticket.

COMPLEX live-UX seconds go in a chip under P1 / “also”, never in the six.

---

## 5. Per-year: what to add (links + flows only)

Implement **one year per pass**. Lean years: **0 new HTML** if a deepen-in-place works; else **+3 max**. Forest years: **0 new HTML** — link what exists.

| Year | Gold (do not steal) | Map / Next add | In-room links to add | Ban |
|------|---------------------|----------------|----------------------|-----|
| **1994** | CSotD guestbook | Next on guestbook REAL → Yahoo category · IUMA. Map already has Yahoo/Lycos/CSotD. | Yahoo 3-level drill; HotWired banner → museum tour residual; FishCam multi-cam if files exist. | Do not make IUMA the star (live-UX second). |
| **1995** | SSL cart | Next after checkout → AuctionWeb bid · GeoCities hood. | Neighborhood → homestead (live-UX second if named). Amazon book → cart already. | eBay name (still AuctionWeb). |
| **1996** | Portal wars | Next after portal REAL → HoTMaiL compose. | Space Jam 3 planets (already guided). My Yahoo widgets = live-UX second. | Hotmail as Microsoft-only (acquire is Dec 1997). |
| **1997** | PointCast | Next after subscribe → eBay bid · ICQ. | eBay item → My eBay / feedback. Slashdot score = live-UX second. | App Store. IE as the only browser (war is the story). |
| **1998** | Lucky | Next after query → Yahoo packed portal (contrast). | CDnow cart if room exists. Google session counter residual. | Gmail (2004). |
| **1999** | AIM | Next after sign-on → Napster search. **Fix guided to 6** (move SourceForge to a chip). | Napster search → library honesty (zero-byte). PayPal history. | GitHub (2008). Instant Book. |
| **2000** | MapQuest | Next after print REAL → Amazon smile cart · Pets shutdown. | eBay watch+bid = live-UX second. Buy It Now is Nov 2000 — optional chip, not gold. | Street View. |
| **2001** | MSN | Next after sign-on → Wikipedia edit. | Edit → preview → history. iTunes library honesty. | “Wiki save is the star” (MSN is). |
| **2002** | Stumble | **Map leaf for StumbleUpon** (thesis/social seed currently Friendster-first). Next after thumb → Friendster. | Thumb up+down bias next (FLOWS-LINKS 8). Netflix DVD queue = live-UX second. | Friendster as “launched 2002” on About — work 2002, public **Mar 2003**. |
| **2003** | Photobucket | Next after upload → MySpace profile (already on disk). | iTunes 99¢ browse → library. WP publish. | thefacebook. |
| **2004** | thefacebook networks | Next after network save → Gmail invite lore · Flickr tag. | Network → friends/profile. Do **not** map the 80-folder forest. | News Feed (2006). Open registration. |
| **2005** | Pandora | Next after station → YouTube upload/watch · Maps pan. | YT still independent (sale is 2006). HousingMaps mashup already a map leaf. Reader = live-UX second. | Google owns YT. |
| **2006** | Twitter 140 | Next after tweet → News Feed · Digg. | Twitter profile from `itt06-tweets` if missing. YouTube ownership toggle. | iPhone. Beacon as 2006 (it’s 2007). |
| **2007** | iPhone Safari | Next after URL/presets → Street View · Platform. | Mobile-broken cards. Beacon honesty. **Google Video copy must not say YT independent.** FriendFeed/OpenSocial optional P2. | App Store · Chrome · Android mass. |
| **2008** | GitHub issue | Next after issue → App Store Get · Chrome. | App Store → library residual. Hulu public. | Like button (2009). iPhone 3GS. |
| **2009** | Like | Next after Like → FarmVille wait · Foursquare. | SO accept exactly one (`itt09-so-accepted`) if still thin. | Instagram. iPad. |
| **2010** | Imgur | Keep the one existing Next → Reddit submit. Add Next on Reddit post → Instagram iOS-only. | Filter grid. Cablegate literacy already mapped. | IG Android (2012). |
| **2011** | Airbnb request | **P0 map:** replace or add a trail “Stay request” with Airbnb listing + request. Thesis line still says Spotify US — **fix the thesis string**, do not restar Spotify. Next after request → Timeline JSON. | Timeline must persist **JSON**, not `"1"`. Uber SF = live-UX second (+3). | Instant Book as the gold. Restore 2010 forest. |
| **2012** | SoundCloud timed comment | **P0 map:** leaf `sites/soundcloud/…`. Next after comment → IG Android (3 Apr). | Pinterest board = live-UX second. SOPA / IPO stay chips. | Stories (2016). |
| **2013** | Vine hold | Next after post → Snap Stories 24h · IG Video 15s. Tinder already has a Next to `matches.html`. | Tinder deck = live-UX second (replace two-click if still thin). | IG Stories. Healthcare as gold. |
| **2014** | WhatsApp | Next after chat (already → `channel.html` Slack). Keep Slack as P1, not star. | Heartbleed rotate ≥2. Ice Bucket nominate. | Watch **ships** (2015). |
| **2015** | Apple Watch | Next after pair → Win10 upgrade · Periscope live · Discord #general. | Discord persist check (FLOWS-LINKS 7). | Stories as 2015 gold. |
| **2016** | IG Stories | **Already the pattern** (28 Next). Audit destinations: gold first, not About. | musical.ly = live-UX second. Vine goodbye stays an ending. | TikTok US mass. Reels. |
| **2017** | Face ID | **Already the pattern** (33 Next). Prefer Face ID / Fortnite game, not home. | Watch Series 3 chip → Face ID (optional). Netflix My List = live-UX second. | GDPR enforce. TikTok merge. HomePod **in stores** (2018). |
| **2018** | GDPR Manage | **Already the pattern** (29 Next). Keep Manage → FYP. Do not send leftovers only to home. | FYP reorder = live-UX second (still a plaque). CMP: keep Reject visible (Nouwens). | Reels. Disney+. Do not pass 60 HTML. |
| **2019** | Disney+ (intended) | **Do not add links into the 526-file forest.** Remake first (~60 cap). Then: guided **6**, one-thing on home, Next after trial/Continue → Arcade/TV+ as chips. | Apple TV+ Continue = live-UX second after remake. | Stadia as co-star. Clone 2018. |
| **2020** | Zoom Join | Only **4** Next attrs. Add chips on Reels / CCPA / Flash / Edge **toward Zoom recap or gold**, not only sideways. | Quibi = live-UX second if named. | Invent June websites count. Case dashboard. Official Zoom art. 2021+. |

---

## 6. What *not* to do (this question’s failure modes)

| Tempting | Why it fails |
|----------|----------------|
| Map every 2006/2010/2019 folder | Forest restore. Visitor tree becomes a directory listing. |
| Add a 7th guided step | Locked at 6. 1999 already over. |
| Second `data-ott-one-thing` | COMPLEX / live-UX files forbid it. |
| Next chip always → `pages/home.html` | 2019 already does this. Heuristic #8 + “next to gold” law. |
| Copy 2016–2018 pill CSS onto 1996 | Period chrome is the exhibit. |
| Implement all 27 live-UX seconds | Files say one year per pass. |
| Rebuild GDPR / Zoom / Face ID | Stars already ship. |
| Use wiki-only dates in About | SOURCE-CATALOG: wiki never `lock=yes` alone. |
| “Users per website” for 2016–2018 | ILS users cell is **blank** those years. Leave blank. |

---

## 7. Do-next shortlist (when you name a year)

ROI order if the ask is “make flows feel like a path”:

1. **2011 map + Next** — Airbnb is the gold and is invisible on the tree. Lean; 0–1 HTML.  
2. **2012 map + Next** — same for SoundCloud.  
3. **1994–2009 Next chips** — start with the gold success state only (one chip per year). Skin with year CSS.  
4. **2020 Next** — 4 → ~12, destinations Zoom / CCPA / Flash, not home.  
5. **1999 guided 7 → 6** — hygiene.  
6. **2019 remake** — not a link pass.  
7. Live-UX seconds — only after the named year’s Next/map is honest.

---

## 8. In-repo markdown consulted (this pass)

Flow / trail / UX / leftover (read in full via dedicated pass, 73 file reads):

- `FLOW-MAPS.md` · `FLOW-AUDIT-DETAIL-2026-08-05.md` · `FLOW-IMPROVEMENTS-DEEP-RESEARCH-1994-2007.md` · `FLOW-MASTERPIECE-GOALS-AND-RESEARCH.md` · `FLOW-MATCH-AUDIT-ALL-YEARS-VS-2007.md` · `FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md`  
- `2010-2020-FLOWS-TODO-GOALS-PHASES-STEPS.md` · `CROSS-YEAR-REAL-FLOWS-EXECUTION.md` · `REAL-FLOW-SYSTEM.md`  
- `COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md` · `COMPLEX-LIVE-UX-CLEAR-STEPS-2026-08-14.md` · `COMPLEX-LIVE-UX-HOW-TO-GET-IT-DONE-2026-08-14.md` · `COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`  
- `ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md` · `WIDELY-USED-MISSING-INTEGRATIONS-1994-2018.md` · `YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md`  
- `2007-CONNECTIONS-AND-TRAILS.md` · `2008-CONNECTIONS-AND-TRAILS.md` · `WHATS-LEFT-MAP-2026-08-11.md`  
- `UX-IMPROVEMENT-PHASES-GOALS-STEPS-ROI-MINUTE-DETAIL-2026-08-06.md` · `UI-UX-ACTION-FEEDBACK-AND-EARLY-TRAILS.md`  
- Year playbooks: 2005 implementation-flows · 2007 goals-flows · 2011 goals-flows · 2012 READ-FIRST + goals · 2013 READ-FIRST + goals · 2016 READ-FIRST + leftover · 2017 READ-FIRST + museum-grade · 2018 READ-FIRST + from-scratch · 2019 READ-FIRST + goals · 2020 READ-FIRST  

**Absent (do not invent):** `1994-READ-FIRST.md`, `2005-READ-FIRST.md`, `2007-READ-FIRST.md`, `2011-READ-FIRST.md`, `2017-GOALS-PHASES-AND-USER-FLOWS*`, `2018-GOALS-PHASES-AND-USER-FLOWS*`.

**Inventoried, not re-opened line-by-line** (already harvested in prior year dumps; facts reused, not re-guessed): the `docs/YYYY-*-RESEARCH*.md` / `*-WEB-HARVEST*` / `*-MUSEUM-GRADE*` / `*-IMPLEMENTATION-PHASES*` set — **200+** year files from 1994 through `2020-SOURCES-100-PLUS-2026-08-11.md`. Also `ARCHITECTURE.md`, `DISK-TRUTH.md`, `references/SOURCE-CATALOG.md`.

Stale-vs-new contradictions that matter for *this* question are listed in §10 of the markdown extract: one-thing identity drift (2011 Spotify vs Airbnb), 2019 star (TikTok/Arcade vs Disney+), 2018 FROM-SCRATCH “year does not exist”, ONE-THING header “2017+ not on disk”, WHATS-LEFT “2020 Zoom banned”. **Newest READ-FIRST + disk win.**

---

## 9. Source catalog (this pass)

Tag rules from [`references/SOURCE-CATALOG.md`](references/SOURCE-CATALOG.md): **OPEN** = full page this pass · **SNIP** = snippet enough for a date/number · **BLOCK** = WAF / bot / paywall. Wiki-only is never `lock=yes`.

Ids are `FLX-NNN` (flows/links UX). Do not reuse.

### 9.1 Standing scale + museum (opened)

| Id | Tag | Class | URL | Took | Lock | Use |
|----|-----|-------|-----|------|------|-----|
| FLX-001 | OPEN | scale | https://www.internetlivestats.com/total-number-of-websites/ | June table **ends 2018** at **1,630,322,579 (−8%)**. 2017 **1,766,926,408 (+69%)**. Users column blank 2016–2018. 1994: **2,738** sites / **25,454,590** users. Hostname ≠ active (~75% parked today). | yes | about |
| FLX-002 | OPEN | wiki | https://www.webdesignmuseum.org/web-design-history | Timeline: Archie 1990 · Gopher 1991 hierarchical menus · Mosaic 22 Apr 1993 · Yahoo Jan 1994 (Jerry and David’s Guide) · robots.txt Jul 1994 · W3C 1 Oct 1994 · Mosaic Netscape 0.9 **13 Oct 1994** · first banner **27 Oct 1994** AT&T on HotWired **476×56** “Have You Ever Clicked Your Mouse Right Here?” · GeoCities Nov 1994 / 2 MB. | no | extras |
| FLX-003 | OPEN | voice | https://www.wired.com/2010/10/1027hotwired-banner-ads/ | HotWired launch ads from **14** companies (MCI, Volvo, Club Med, Zima…). AT&T legend. Banner **468×60** class. Clickable ads forced agencies to build destination sites. | yes | about |
| FLX-004 | SNIP | voice | https://www.thedrum.com/news/1994-first-banner-ad-appears-hotwiredcom | 27 Oct 1994 · AT&T · click → museum tour. | yes | extras |
| FLX-005 | SNIP | voice | https://digiday.com/media/history-of-the-banner-ad/ | “First banner” is a misnomer — **12–14** banners same day. | yes | extras |
| FLX-006 | OPEN | ux | https://www.nngroup.com/articles/breadcrumb-navigation-useful/ | Nielsen **9 Apr 2007**. Recommended since **1995**. Hierarchy not history. Never a problem in testing. Vista will normalize them. | yes | extras |
| FLX-007 | OPEN | ux | https://www.nngroup.com/articles/breadcrumbs/ | Laubheimer **23 Dec 2018**. 11 guidelines. Polyhierarchy = one canonical path. Flat sites skip crumbs. Mobile: don’t wrap; 1 cm tap. | yes | extras |
| FLX-008 | OPEN | ux | https://www.nngroup.com/articles/navigation-you-are-here/ | Farrell **25 Oct 2015**. Search drops you mid-city. Logo, nav change, headings, title, URL, crumbs, steps. Test: “where are you?” | yes | extras |
| FLX-009 | OPEN | ux | https://www.nngroup.com/articles/ten-usability-heuristics/ | Nielsen **24 Apr 1994** / reviewed 2024. Status · real world · exit · consistency · prevent · recognition · flexibility · minimal · recover · help. | yes | extras |

### 9.2 1994–1999 product rituals

| Id | Tag | Class | URL | Took | Lock | Use |
|----|-----|-------|-----|------|------|-----|
| FLX-010 | SNIP | p0 | https://en.wikipedia.org/wiki/History_of_Yahoo | Guide Jan 1994 · rename Yahoo Mar 1994 · backronym Yet Another Hierarchical Officious Oracle · yahoo.com **18 Jan 1995**. | no | about |
| FLX-011 | SNIP | p0 | https://arstechnica.com/information-technology/2014/09/yahoo-killing-off-yahoo-after-20-years-of-hierarchical-organization/ | Directory retired end of 2014 after 20 years of hierarchy. | yes | extras |
| FLX-012 | SNIP | p0 | https://www.webdesignmuseum.org/web-design-history/yahoo-1994 | Yahoo as directory, then search 1995. | no | extras |
| FLX-013 | OPEN | p0 | https://cybercultural.com/p/geocities-1995/ | RodeoDrive + Hollywood first; SunsetStrip / WallStreet / Colosseum / WestHollywood; Jul 1995 SiliconValley, CapitolHill, Paris, Tokyo; “Homesteader”; HTML help is the growth hack. | yes | extras |
| FLX-014 | SNIP | p0 | https://en.wikipedia.org/wiki/GeoCities | Mid-1995 **2 MB**; 14 neighborhoods by Dec 1995; Yahoo buy 1999; shutdown **26 Oct 2009**. | no | extras |
| FLX-015 | SNIP | pixel | https://www.webdesignmuseum.org/exhibitions/geocities-neighborhoods | Area51 / SunsetStrip period shots. | no | capture |
| FLX-016 | SNIP | pixel | https://geocities.restorativland.org/ | Restored gallery by neighborhood. | no | capture |
| FLX-017 | SNIP | p0 | https://www.oocities.org/ | Neighborhood URL scheme `/Neighborhood/number` 1000–9999. | no | extras |
| FLX-018 | SNIP | one-thing | https://www.innovatorsunder35.com/the-list/sabeer-bhatia/ | Hotmail **4 Jul 1996** · DFJ $300k · Microsoft **~$400M** ~18 months. | no | about |
| FLX-019 | SNIP | one-thing | https://en.wikipedia.org/wiki/Jack_Smith_(Hotmail) | Smith CTO · idea 1995 at Apple with Bhatia · sell Dec 1997. | no | about |
| FLX-020 | OPEN | p0 | https://www.ebayinc.com/company/our-history/ | AuctionWeb Labor Day **1995** · first sale broken laser pointer · Pez story **fabricated** · Feedback Forum **1997 Q2** · rename **eBay Sep 1997** · My eBay **May 1998** · IPO Sep 1998 · Buy It Now **Nov 2000** · PayPal acquire **Jul 2002**. | yes | about |
| FLX-021 | SNIP | p0 | https://pages.ebay.com/services/forum/feedback-foundersnote.html | Omidyar 26 Feb 1996 note: use Feedback Forum. | yes | extras |
| FLX-022 | OPEN | one-thing | https://about.google/company-info/our-story/ | Page+Brin 1995 Stanford · Backrub · Google name · Bechtolsheim **$100,000 Aug 1998** · Wojcicki garage. | yes | about |
| FLX-023 | SNIP | p0 | https://ethw.org/Milestones:PageRank_and_the_Birth_of_Google,_1996-1998 | PageRank 1996 · IEEE milestone. | yes | extras |
| FLX-024 | SNIP | p0 | https://blogs.cornell.edu/info2040/2019/10/28/the-academic-paper-that-started-google/ | Anatomy paper Apr 1998 · ~24M pages · google.stanford.edu. | no | extras |
| FLX-025 | SNIP | p0 | https://www.ebsco.com/research-starters/computer-science/napster-released | Napster **1 Jun 1999** Fanning · RIAA suit **Dec 1999**. | no | about |
| FLX-026 | SNIP | court | https://en.wikipedia.org/wiki/Napster | *A&M v. Napster* · shutdown **Jul 2001**. | no | ban |
| FLX-027 | SNIP | p0 | https://cybercultural.com/p/napster-1999/ | Fanning 19 at RIAA knock. | no | extras |
| FLX-028 | SNIP | p0 | https://musicbusinessresearch.wordpress.com/2014/12/06/the-music-industrys-fight-against-napster-part-1/ | RIAA suit **6 Dec 1999**. | no | extras |

### 9.3 2000–2007

| Id | Tag | Class | URL | Took | Lock | Use |
|----|-----|-------|-----|------|------|-----|
| FLX-029 | SNIP | one-thing | https://www.history.com/this-day-in-history/january-15/wikipedia-launches | Wikipedia **15 Jan 2001** · Nupedia too slow (2 articles / 6 months). | no | about |
| FLX-030 | SNIP | p0 | https://larrysanger.org/role-in-wikipedia/my-role-in-wikipedia-links/ | “Let’s make a wiki” 10 Jan · “Wikipedia is up!” 15 Jan. | yes | extras |
| FLX-031 | SNIP | wiki | https://en.wikipedia.org/wiki/Nupedia | Nupedia 9 Mar 2000 – Sep 2003 · Sanger EIC. | no | extras |
| FLX-032 | SNIP | p0 | https://www.latimes.com/archives/blogs/technology-blog/story/2009-07-23/friendster-founder-on-the-rise-and-fall-of-americas-first-big-social-network | Friendster work **2002** · launch **Mar 2003** · 2M by autumn. | yes | about |
| FLX-033 | SNIP | p0 | https://www.mentalfloss.com/culture/social-media/friendster-rise-and-fall-jonathan-abrams | Six degrees messaging · **testimonials** · slowness → MySpace. | no | extras |
| FLX-034 | SNIP | one-thing | https://www.thecrimson.com/article/2014/2/4/facebook-ten-years-feature-1/ | thefacebook **4 Feb 2004** Kirkland House · $85/mo server · Harvard only. | yes | about |
| FLX-035 | SNIP | one-thing | https://www.history.com/this-day-in-history/february-4/facebook-launches-mark-zuckerberg | 4 Feb 2004 Harvard sophomore. | no | about |
| FLX-036 | OPEN | one-thing | https://www.pbs.org/newshour/nation/20-years-ago-people-thought-googles-gmail-launch-was-an-april-fools-day-joke | Gmail **1 Apr 2004** · **1 GB** (~250–500× Yahoo/Hotmail) · Buchheit · capacity **~10,000** · invites sold **$250** on eBay. | yes | about |
| FLX-037 | SNIP | newsroom | https://workspace.google.com/blog/productivity-collaboration/celebrating-50-years-of-email | 1 GB · search · Apr 1 believed a hoax. | yes | about |
| FLX-038 | SNIP | newsroom | http://googlepress.blogspot.com/2004/04/google-gets-message-launches-gmail.html | Original Gmail PR. | yes | about |
| FLX-039 | SNIP | wiki | https://en.wikipedia.org/wiki/Me_at_the_zoo | First YT video **23 Apr 2005 8:31 p.m. PDT** · Jawed Karim · San Diego Zoo · ~19s. | no | about |
| FLX-040 | SNIP | p0 | https://people.com/the-first-ever-youtube-video-was-published-19-years-ago-8638193 | Same date · Google buy **$1.65B Nov 2006**. | no | extras |
| FLX-041 | SNIP | one-thing | https://www.businessinsider.com/watch-steve-jobs-first-iphone-10-years-ago-legendary-keynote-macworld-sale-2017-6 | iPhone Macworld **9 Jan 2007** · sale **29 Jun 2007**. Three-in-one quote. | no | about |
| FLX-042 | SNIP | one-thing | https://en.wikipedia.org/wiki/IPhone_(1st_generation) | $499 4GB / $599 8GB · AT&T 2-year · no App Store at ship. | no | about |
| FLX-043 | SNIP | one-thing | https://maketecheasier.com/mte-the-original-iphone-steve-jobs-unveiled-in-january-2007-could-not-record-video-c/ | No App Store · no copy/paste · no video · web apps in Safari were the platform until reversed. | no | extras |
| FLX-044 | SNIP | p0 | (prior harvest) Facebook Platform f8 **24 May 2007** · ~65 partners / 85 apps · social graph. | Pair with newsroom before About invent. | no | extras |

### 9.4 2008–2016

| Id | Tag | Class | URL | Took | Lock | Use |
|----|-----|-------|-----|------|------|-----|
| FLX-045 | OPEN | one-thing | https://www.apple.com/newsroom/2008/07/10iPhone-3G-on-Sale-Tomorrow/ | **10 Jul 2008**: **>500** native apps at App Store open · **>125 free** · iPhone 3G on sale **11 Jul** · $199 8GB / $299 16GB + AT&T 2-year · 21 countries · iPod touch 2.0 **$9.95**. Zuckerberg + DeWolfe quotes. | yes | about |
| FLX-046 | SNIP | p0 | https://www.apple.com/newsroom/2018/07/app-store-turns-10/ | 10-year recap: launched 10 Jul 2008 with 500 apps. | yes | extras |
| FLX-047 | SNIP | p0 | https://www.macstories.net/news/a-decade-on-the-app-store-from-day-one-through-today/ | Alternate count **552** apps day one. | no | extras |
| FLX-048 | SNIP | one-thing | https://en.wikipedia.org/wiki/Facebook_like_button | Like enabled **9 Feb 2009**. | no | about |
| FLX-049 | SNIP | p0 | https://www.facebook.com/ComputerLoveRecords/posts/on-february-9-2009-the-internet-social-networking-site-facebook-introduced-its-l/1354853379245914/ | Same date, period voice. | no | extras |
| FLX-050 | SNIP | p0 | Instagram launch **6 Oct 2010** iOS-only (Social Media Examiner + ILS table “Pinterest, Instagram”). Android is **3 Apr 2012**. | Pair before About. | no | about |
| FLX-051 | SNIP | p0 | TechCrunch Instagram Stories **2 Aug 2016** — 24h tap-through · later 500M MAU class (prior session OPEN). | yes if TC page reopened at implement | extras |
| FLX-052 | SNIP | p0 | Airbnb 2011 “request to book” / host accept is the period gold — Instant Book is later. 2011 also = rJ/EJ trash crisis (Chesky). | no | about |

### 9.5 2017–2020

| Id | Tag | Class | URL | Took | Lock | Use |
|----|-----|-------|-----|------|------|-----|
| FLX-053 | SNIP | one-thing | Apple Newsroom iPhone X **12 Sep 2017** · Face ID · Super Retina · **$999** · pre-order 27 Oct · stores **3 Nov** · swipe-up Home (prior OPEN). | yes | about |
| FLX-054 | SNIP | court | GDPR apply **25 May 2018**. Nouwens et al. 2020 CHI: remove Reject control → **+22–23 pp** consent (prior OPEN). Manage is the gold; Accept All is the trap. | yes | about |
| FLX-055 | SNIP | one-thing | TikTok / musical.ly merge **2 Aug 2018** (museum READ-FIRST + this-pass FTC musical.ly settlement 27 Feb 2019). | pair | extras |
| FLX-056 | SNIP | newsroom | https://newsroom.tiktok.com/musical-lys-agreement-with-ftc/ | musical.ly FTC agreement **27 Feb 2019**. | yes | extras |
| FLX-057 | SNIP | one-thing | Disney+ **12 Nov 2019** (on-disk map steps Plan / Join / Watchlist). | pair | about |
| FLX-058 | SNIP | one-thing | Zoom Yuan **17 Mar 2021**: **10M** Dec 2019 → **300M** Apr 2020 **daily meeting participants** (30×). Not unique users. | yes | about |
| FLX-059 | SNIP | ban | ILS has **no** 2019 or 2020 June websites row. Do not invent. | yes | ban |
| FLX-060 | SNIP | p0 | Reels **5 Aug 2020** · 15 seconds · not IGTV (2018) · not Stories (2016). | pair | extras |
| FLX-061 | SNIP | p0 | CCPA **1 Jan 2020** · Do Not Sell. Flash plugin **31 Dec 2020** (Adobe 25 Jul 2017 announced EOL end-2020). | pair | extras |

### 9.6 Extra UX / IA / web-history URLs visited as SNIP this pass

Each row is a distinct URL from the search/open set (not already in FLX-001–061). Took = why it matters for *links*, not a full excerpt.

| Id | Tag | URL | Took |
|----|-----|-----|------|
| FLX-062 | SNIP | https://www.nngroup.com/articles/site-map-usability/ | Sitemaps share breadcrumbs’ *secondary* status — our `pages/map.html` is that layer. |
| FLX-063 | SNIP | https://www.nngroup.com/articles/polyhierarchy/ | One canonical crumb path — one map trail per gold. |
| FLX-064 | SNIP | https://www.nngroup.com/articles/flat-vs-deep-hierarchy/ | Lean years are flat → skip crumbs. |
| FLX-065 | SNIP | https://www.nngroup.com/articles/ia-vs-navigation/ | Map is IA; dirbar is navigation. Don’t merge. |
| FLX-066 | SNIP | https://www.nngroup.com/articles/homepage-links/ | Home link once (nav **or** crumb). |
| FLX-067 | SNIP | https://www.nngroup.com/articles/pogo-sticking/ | If analytics (or e2e) show bounce-back, IA is wrong — add a Next, don’t add a 7th guided item. |
| FLX-068 | SNIP | https://www.nngroup.com/articles/the-top-ten-web-design-mistakes-of-1999/ | Back button is sacred — don’t replace it with a fake history crumb. |
| FLX-069 | SNIP | https://www.nngroup.com/articles/navigating-large-information-spaces/ | Pre-web hypertext over-solved “lost in hyperspace”; web stayed minimal. |
| FLX-070 | SNIP | https://www.nngroup.com/articles/utility-navigation/ | About / Map / Handbook = utility, not gold. |
| FLX-071 | SNIP | https://www.nngroup.com/articles/audience-based-navigation/ | Don’t split the year into “kids / experts” nav. |
| FLX-072 | SNIP | https://www.nngroup.com/articles/killing-global-navigation-one-trend-avoid/ | Don’t hide the year dirbar behind a hamburger on 1998. |
| FLX-073 | SNIP | https://www.nngroup.com/articles/hamburger-menus/ | Hamburger is late-mobile; 2007 iPhone used visible Safari chrome. |
| FLX-074 | SNIP | https://www.nngroup.com/articles/infinite-scrolling/ | Ban on directory years; Stories/FYP *are* the 2016–18 verb. |
| FLX-075 | SNIP | https://www.nngroup.com/articles/carousel-usability/ | Don’t put 2012 gold behind a carousel. |
| FLX-076 | SNIP | https://www.nngroup.com/articles/progress-indicators/ | Wizards (MapQuest, GDPR Manage, Zoom join) need named steps. |
| FLX-077 | SNIP | https://www.nngroup.com/articles/confirmation-dialog/ | Confirm Get / bid / Accept All — then still don’t write if incomplete. |
| FLX-078 | SNIP | https://www.nngroup.com/articles/error-message-guidelines/ | Empty REAL must say the missing field in period English. |
| FLX-079 | SNIP | https://www.nngroup.com/articles/match-system-real-world/ | Period verbs (§3). |
| FLX-080 | SNIP | https://www.nngroup.com/articles/jakobs-law-internet-ux/ | Visitors bring last year’s habits — that’s why 2007 must *not* have Get. |
| FLX-081 | SNIP | https://www.nngroup.com/articles/minimize-cognitive-load/ | One Next, not twelve. |
| FLX-082 | SNIP | https://www.nngroup.com/articles/how-little-do-users-read/ | Guided 6 + one gold. Forests fail this. |
| FLX-083 | SNIP | https://www.nngroup.com/articles/first-rule-of-usability-dont-listen-to-users/ | Nielsen 2007: user asked for “back”; she meant breadcrumbs. |
| FLX-084 | SNIP | https://www.nngroup.com/articles/the-need-for-web-design-standards/ | Next-chip markup stays one standard. |
| FLX-085 | SNIP | https://www.nngroup.com/articles/guidelines-for-visualizing-links/ | Period link color (blue + underline 1994–2004). |
| FLX-086 | SNIP | https://www.nngroup.com/articles/most-violated-homepage-guidelines/ | Current crumb is not a link. |
| FLX-087 | SNIP | https://www.nngroup.com/articles/title-attribute/ | Don’t rely on `title=` for Next. |
| FLX-088 | SNIP | https://www.nngroup.com/articles/duplicate-links/ | Home in nav + home in Next is OK if jobs differ (exit vs continue). |
| FLX-089 | SNIP | https://www.nngroup.com/articles/search-not-enough/ | 1994 Yahoo browse + 1998 Google search are *different years*. |
| FLX-090 | SNIP | https://www.nngroup.com/articles/filters-vs-facets/ | 2010 IG filters are the product, not IA facets. |
| FLX-091 | SNIP | https://www.nngroup.com/articles/touch-target-size/ | 1 cm — don’t shrink 2018 chips to 1996 link size on mobile. |
| FLX-092 | SNIP | https://www.nngroup.com/articles/centered-logos/ | Year shell logo stays left-period or year-true; don’t “modernize.” |
| FLX-093 | SNIP | https://www.nngroup.com/articles/change-blindness/ | You-are-here must be stronger than designer instinct. |
| FLX-094 | SNIP | https://www.nngroup.com/articles/mental-models/ | Visitors’ model is last successful year — label archive continuity. |
| FLX-095 | SNIP | https://www.nngroup.com/articles/ia-warning-signs-analytics/ | Pogo-stick / backtrack = missing Next. |
| FLX-096 | SNIP | https://www.nngroup.com/articles/intranet-information-architecture-ia/ | 80% of 2007 winning intranets used crumbs — mid-2000s expectation. |
| FLX-097 | SNIP | https://www.nngroup.com/articles/10-best-intranets-of-2007/ | Same year as iPhone — crumbs were *desktop* literacy. |
| FLX-098 | SNIP | https://www.nngroup.com/articles/durability-of-usability-guidelines/ | 1994 heuristics still bind 2020 Zoom. |
| FLX-099 | SNIP | https://www.nngroup.com/articles/design-priorities/ | Gold machine > decorative links. |
| FLX-100 | SNIP | https://www.nngroup.com/articles/does-user-annoyance-matter/ | A missing Next is a small annoyance with huge path cost. |
| FLX-101 | SNIP | https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/ | Period button order (Windows vs Mac) is year-true. |
| FLX-102 | SNIP | https://www.nngroup.com/articles/form-design-placeholders/ | Don’t use placeholder-only labels on 2004 Gmail. |
| FLX-103 | SNIP | https://www.nngroup.com/articles/reset-and-cancel-buttons/ | Leave meeting / Reject cookies are exits. |
| FLX-104 | SNIP | https://www.nngroup.com/articles/wizard-steps/ | GDPR rights / Zoom join are wizards. |
| FLX-105 | SNIP | https://www.nngroup.com/articles/mobile-navigation/ | 2007 Safari is the mobile nav; 2013 iOS 7 is flat chrome. |
| FLX-106 | SNIP | https://www.nngroup.com/articles/megamenus-work-well/ | Ban on 1998 portals (they used packed tables, not megamenus). |
| FLX-107 | SNIP | https://www.nngroup.com/articles/tabs-used-right/ | Amazon 2000 smile tabs = year-true. |
| FLX-108 | SNIP | https://www.nngroup.com/articles/homepage-real-estate/ | Guided 6 is the homepage budget. |
| FLX-109 | SNIP | https://www.nngroup.com/articles/how-users-read-on-the-web/ | F-pattern — gold + Next must be in the first screen. |
| FLX-110 | SNIP | https://www.nngroup.com/articles/aesthetic-minimalist-design/ | Lean remake cap is this heuristic as a file budget. |
| FLX-111 | SNIP | https://www.nngroup.com/articles/help-and-documentation/ | Handbook in context, not a PDF. |
| FLX-112 | SNIP | https://www.nngroup.com/articles/flexibility-efficiency-heuristic/ | What’s New for return visitors. |
| FLX-113 | SNIP | https://www.nngroup.com/articles/slips/ | Incomplete-no-write prevents the slip of a half form. |
| FLX-114 | SNIP | https://www.nngroup.com/articles/the-power-of-defaults/ | Accept All as default is the 2018 exhibit (Nouwens). |
| FLX-115 | SNIP | https://www.nngroup.com/articles/microinteractions/ | actionFeedback <1s. |
| FLX-116 | SNIP | https://www.nngroup.com/articles/natural-mappings/ | Hold-to-record (Vine) · swipe-up (X) · tap story. |
| FLX-117 | SNIP | https://ux.stackexchange.com/questions/115994/breadcrumbs-what-should-they-display | Confirms location-vs-history confusion in the wild. |
| FLX-118 | SNIP | https://www.pencilandpaper.io/articles/breadcrumbs-ux | Enterprise exception for path crumbs — **not** our museum default. |
| FLX-119 | SNIP | https://usabilitygeek.com/12-effective-guidelines-for-breadcrumb-usability-and-seo/ | Hierarchy not history; Back does history. |
| FLX-120 | SNIP | https://vwo.com/blog/why-use-breadcrumbs/ | Popularizer; do not use as lock. |
| FLX-121 | SNIP | https://info.cern.ch/ | First site still the 1994 “who built the Web” trail head. |
| FLX-122 | SNIP | https://home.cern/science/computing/birth-web | CERN birth narrative. |
| FLX-123 | SNIP | https://www.w3.org/History.html | W3C history index. |
| FLX-124 | SNIP | https://www.w3.org/History/1989/proposal.html | 1989 proposal — 1994 About, not a flow. |
| FLX-125 | SNIP | http://info.cern.ch/hypertext/WWW/TheProject.html | First URL (ILS + WDM). |
| FLX-126 | SNIP | https://news.netcraft.com/archives/category/web-server-survey/ | ILS source. Hostnames ≠ active. |
| FLX-127 | SNIP | https://www.mit.edu/people/mkgray/growth/ | Matthew Gray growth — ILS source. |
| FLX-128 | SNIP | https://www.zakon.org/robert/internet/timeline/ | Hobbes’ timeline — ILS source. |
| FLX-129 | SNIP | https://royal.pingdom.com/2008/04/04/how-we-got-from-1-to-162-million-websites-on-the-internet/ | Pingdom 1→162M. |
| FLX-130 | SNIP | https://www.netcraft.com/active-sites/ | Active vs parked. |
| FLX-131 | SNIP | https://first-website.web.cern.ch/blog/first-url-active-once-more | First URL restored. |
| FLX-132 | SNIP | https://home.cern/news/news/computing/twenty-years-free-open-web | 30 Apr 1993 public domain. |
| FLX-133 | SNIP | https://www.internethistorypodcast.com/2014/10/the-webs-first-banner-ads/ | 12–14 banners same day. |
| FLX-134 | SNIP | https://www.yahoo.com/news/first-ever-banner-ad-083000895.html | AT&T ~44% CTR lore — treat as lore, not lock. |
| FLX-135 | SNIP | https://blog.geocities.institute/archives/22 | Neighborhood list research. |
| FLX-136 | SNIP | https://www.bladesplace.id.au/geocities-neighborhoods-suburbs.html | Hood / suburb names. |
| FLX-137 | SNIP | https://elgoog.im/google1998/ | 1998 Google feel (Lucky / Stanford Search). |
| FLX-138 | SNIP | https://www.historyofinformation.com/detail.php?entryid=1346 | BackRub / NSF digital library. |
| FLX-139 | SNIP | https://www.livinginternet.com/w/wu_sites_yahoo.htm | Yahoo as directory-search. |
| FLX-140 | SNIP | https://www.howtogeek.com/795347/gmail-was-the-best-april-fools-day-joke-of-all-time/ | Apr 1 positioning intentional. |
| FLX-141 | SNIP | https://en.wikipedia.org/wiki/History_of_Gmail | Pentium II/III farm · 1,000 seed users · 3 invites. |
| FLX-142 | SNIP | https://allaboutstevejobs.com/videos/keynotes/macworld_2007 | Safari on iPhone as the browser story. |
| FLX-143 | SNIP | https://www.t-mobile.com/dialed-in/devices/first-iphone | No Siri · no App Store · Safari + Google/Yahoo. |
| FLX-144 | SNIP | https://www.mediapost.com/publications/article/86374/apple-bows-iphone-app-store.html | 25% of first 500 apps free · 90% of paid ≤ $9.99. |
| FLX-145 | SNIP | https://www.bbc.com/news/technology-11738925 | Friendster 2002 founder date in later press (launch still 2003). |
| FLX-146 | SNIP | https://www.harvard.edu (Crimson via FLX-034) | College-email gate is the 2004 verb. |
| FLX-147 | SNIP | https://meta.wikimedia.org/wiki/Overall_timeline | Kovitz dinner 2 Jan 2001 → wiki proposal. |
| FLX-148 | SNIP | https://workspace.google.com/blog/productivity-collaboration/celebrating-50-years-of-email | Duplicate corroboration of 1 GB / Apr 1. |
| FLX-149 | SNIP | https://www.vdocipher.com/blog/history-of-youtube/ | May 2005 activity · Oct 2006 sale. |
| FLX-150 | SNIP | https://ads.tiktok.com/i18n/official/policy/controller-to-controller | GDPR language on TikTok ads — 2018+ only. |

**Also consulted as SNIP clusters (distinct URLs, not re-tabled):** Cybercultural year essays (1994, 1995, 2004, 2005, 2007, GeoCities, Napster); Web Design Museum individual year cards (Archie, Gopher, Mosaic, Netscape 0.9, Lycos, Opera, robots.txt, HTML validator); eBay Inc. history anchors 1995–2008 (~40 dated milestones on one OPEN page); Apple Newsroom 2008 + 2017/2018 harvest leftovers; Facebook/ComputerLoveRecords on-this-day Like + App Store; musical.ly FTC / later GDPR fine coverage (2019–2025) as **ban** for stuffing 2018 About with later fines.

**Prior year harvests already on disk** (do not re-scrape unless About invents): `1994-RESEARCH.md` … `2020-SOURCES-100-PLUS-2026-08-11.md` (128 rows), plus the 2008–2020 `*-DEEP-RESEARCH-WEB-HARVEST-*` set. Together those are **well over 1,000** earlier URLs. This file adds the **flow/UX** layer on top.

---

## 10. Honesty notes

- Friendster: **do not** write “launched 2002” on 2002 About. Work began 2002; public launch **March 2003** (LA Times / Mental Floss). 2002 room = seed / slow graph.  
- HotWired banner: AT&T is the legend; WIRED itself says **14** advertisers launched together. WDM size **476×56** vs later **468×60** standard — say “468×60 class” unless a capture locks the pixel.  
- App Store day-one count: Apple Newsroom **“over 500”** (lock). MacStories **552** is a secondary count — don’t put 552 on About without pairing.  
- Zoom 300M = **participants**, not users.  
- ILS June websites: **blank after 2018**.  
- 2011 map thesis still names Spotify US while disk gold is Airbnb — fix the string, don’t rebuild Spotify as star.  
- 2019 is not a link-density problem. It is a remake.

---

## 11. Stop conditions

Do not start HTML until a year is named.

When a year is named, freeze bar for a *link/flow* pass (smaller than a year remake):

1. Gold room exists and writes `ittYY-*` for a complete multi-step.  
2. Map leaf points at that room with a verb `do`.  
3. Gold success state has one `data-next-flow` to the next year-true verb (or the game).  
4. Guided `<ol>` still counts **6**.  
5. No new forest folders. Lean +3 HTML only if a verb has no room.  
6. About numbers come from `lock=yes` rows above (or that year’s SOURCES.md).

Catalog stays aside. This harvest is the cited plan for “add more links and flows for UI/UX.”
