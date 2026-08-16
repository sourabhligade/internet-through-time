# New flows per year — minute detail (1994–2020)

**Date:** 2026-08-15  
**Status:** Spec only. **Do not implement until a year is named.** One year per pass.  
**Parent harvest:** [`FLOWS-LINKS-UX-DEEP-RESEARCH-WEB-HARVEST-2026-08-15.md`](FLOWS-LINKS-UX-DEEP-RESEARCH-WEB-HARVEST-2026-08-15.md)  
**Git only if asked.**

This file is the **build sheet**. Every **new** flow is written as a visitor walk. Gold machines already on disk are **locked** — they are the trail *head*, not rebuilt.

---

## How to read one year

Each year has:

| Tag | Meaning |
|-----|---------|
| **LOCKED** | One-thing already ships. Do not restar. Do not add a 7th guided `<li>`. |
| **F-A** | **Handoff** — `data-next-flow` after REAL save. Highest ROI. 0 new HTML. |
| **F-B** | **In-product trail** — period verb links between rooms that already exist. 0 new HTML. |
| **F-C** | **Map honesty** — add/fix a leaf so the tree names the gold. Edit `js/config/flow-maps.js` only. |
| **F-D** | **Live-UX second** — COMPLEX chip, never `data-ott-one-thing`. **+0–3 HTML.** Only if that year is named *and* A–C are done. |

Do **A → C → B → D** in that order. Skip D unless asked.

### Shared Next-chip contract (every F-A)

```html
<p class="ittYY-next" data-next-flow hidden>
  <b>Next:</b> <a href="RELATIVE">Verb · destination</a>
</p>
```

- Hidden on first paint. `year-extras-kit.showNext()` / `real-flow.js` unhides after a complete REAL write.  
- Destination is **this year’s gold** or the next verb *inside* the same product. **Not** only `pages/home.html`.  
- Skin matches the year CSS (1994 gray Mosaic line · 2007 Helvetica · 2018 system pill).  
- Incomplete click: chip stays `hidden`, **no** `localStorage` write.

### Shared REAL blob

`{ multiStep: true, real: true, year: YYYY, ts: <iso>, …typed }` under `ittYY-*` only. Neighbor year prefixes untouched.

### Shared bans

Guided home `<ol>` stays **6**. No second star. No forest map dump. No invented brand pixels. No `cp -R`. Lean remakes +3 HTML max. 2018/2020 do not pass ~60. Live Stats June table ends **2018**. Do not scaffold 2021+.

---

## 1994 — browse, don’t search

**LOCKED gold:** Cool Site of the Day · `years/1994/sites/csotd/index.html` · `itt94-csotd`  
Visit today’s pick → sign guestbook (name + note). Empty submit writes nothing.

### F-1994-A · Next after guestbook

| | |
|--|--|
| **Verb** | You picked a cool site — now *browse* the directory. |
| **Start** | `sites/csotd/index.html` (or `guestbook.html` if the save lands there) |
| **Steps** | 1. Click today’s site link (`[data-csotd-link]`). 2. Return. 3. Fill `gbname` + `gbnote`. 4. Submit. 5. Chip appears. 6. Click **Yahoo! @ Stanford**. |
| **Incomplete** | Submit empty → no `itt94-csotd` → chip hidden. |
| **Write** | existing `itt94-csotd` |
| **Chip dest** | `../yahoo/index.html` — “Browse Yahoo · don’t search” |
| **New HTML** | 0 |
| **Map** | no change (CSotD + Yahoo already leaves) |
| **Home** | no change |
| **Ban** | Do not send the chip to IUMA (that is F-D). |
| **Done** | e2e: empty hidden · complete visible · click lands on Yahoo index. |

### F-1994-B · Yahoo three-level drill

| | |
|--|--|
| **Verb** | Hierarchy is the product (Yahoo = Yet Another Hierarchical Officious Oracle). |
| **Start** | `sites/yahoo/index.html` |
| **Steps** | 1. Click **Computers** (`sites/yahoo/Computers/index.html` — folder exists). 2. Click a subcategory if present. 3. Land on a leaf (CERN / NCSA / a What’s New item). 4. Optional: `whats-new.html` / `whats-cool.html` as sibling hops. |
| **Links to add** | On index: one explicit “Computers →” plus “What’s New”. On Computers: one leaf back to `../../cern/index.html` or Mosaic. Breadcrumb: `Yahoo > Computers` (location, not history). |
| **Write** | none (navigation only) unless a later deepen reuses add-URL theater |
| **New HTML** | 0 — 14 category dirs already on disk |
| **Ban** | No search box as the default verb. No Stories chrome. |

### F-1994-C · Map thesis (optional string only)

Map already lists CSotD + Yahoo + Lycos. If thesis buries CSotD, one sentence: guestbook is the gold. **No new leaves.**

### F-1994-D · IUMA listen (live-UX second)

| | |
|--|--|
| **Verb** | First music on the Web: pick → modem bar → play residual. |
| **Pages** | reuse `iuma/{index,about}` + deepen `iuma` track residual (`text.html` / `new.html` exist). Prefer 0 new files; +1 track page only if no play residual. |
| **Key** | `itt94-iuma` — **not** a star |
| **Steps** | 1. Open IUMA. 2. Pick a band/track. 3. Watch download-bar theater. 4. Open play residual. Incomplete pick writes nothing. |
| **Home** | COMPLEX chip under P1, not guided item 7. |
| **Next after save** | back toward CSotD or Yahoo — never a second star. |
| **Ban** | Official IUMA art. Making listen the one-thing. |

---

## 1995 — commerce + homestead

**LOCKED gold:** SSL checkout · `sites/amazon/ssl-checkout.html` · `itt95-ssl-checkout`  
Name + card + city. Empty submit writes nothing.

### F-1995-A · Next after SSL

| | |
|--|--|
| **Start** | `sites/amazon/ssl-checkout.html` |
| **Steps** | Complete name/card/city → chip → **AuctionWeb** (still not called eBay). |
| **Chip dest** | `../auctionweb/index.html` — “Bid higher · AuctionWeb” |
| **Write** | existing `itt95-ssl-checkout` |
| **New HTML** | 0 |

### F-1995-B · Book → cart → SSL

| | |
|--|--|
| **Verb** | Earth’s biggest bookstore, then the padlock. |
| **Start** | `sites/amazon/index.html` |
| **Steps** | 1. Open a book (`book-neuromancer.html` or any `book-*.html`). 2. Add → `cart.html`. 3. Checkout → `ssl-checkout.html` (gold). |
| **Links** | Book pages: “Add to cart”. Cart: “SSL checkout” (not a silent form). |
| **New HTML** | 0 |

### F-1995-D · GeoCities homestead (live-UX second)

| | |
|--|--|
| **Verb** | Pick a neighborhood → title → publish → visit *your* page. |
| **Pages already** | `geocities/{index,homestead,my-homestead}.html` plus hoods: `Area51/51`, `SunsetStrip/101`, `Hollywood/1234`, `RodeoDrive/88`, `SiliconValley/42`, `WallStreet/7`. |
| **Steps** | 1. Index: choose a hood (SunsetStrip = music). 2. `homestead.html`: type a title. 3. Publish. 4. Open `my-homestead.html` and see the title after reload. |
| **Key** | `itt95-homestead` |
| **Incomplete** | Publish with empty title → no write. |
| **New HTML** | 0 |
| **Ban** | Calling it eBay. Yahoo-owned GeoCities (1999). 2 MB is the period cap in copy. |

---

## 1996 — portals + free mail

**LOCKED gold:** Portal wars · `sites/portals/wars.html` · `itt96-portal-wars`  
Visit Yahoo + Excite + AltaVista.

### F-1996-A · Next after the third portal

| | |
|--|--|
| **Start** | `sites/portals/wars.html` (chip after the third visit writes). |
| **Chip dest** | `../hotmail/index.html` — “HoTMaiL · mail from any browser” |
| **Write** | existing `itt96-portal-wars` |
| **New HTML** | 0 |

### F-1996-B · HoTMaiL compose → inbox

| | |
|--|--|
| **Verb** | Free webmail (launched 4 Jul 1996). Not ISP-bound. |
| **Start** | `sites/hotmail/index.html` |
| **Steps** | 1. Open. 2. `compose.html` — To + subject + body. 3. Send. 4. `inbox.html` shows the row. 5. `read.html` opens it. |
| **Incomplete** | Send empty → no write. |
| **Key** | deepen existing Hotmail theater if a key exists; else `itt96-hotmail` (not a star). |
| **Pages** | all four already exist |
| **Ban** | Microsoft-owned copy (acquire is Dec 1997). Outlook.com. |

### F-1996-D · My portal widgets (live-UX second)

| | |
|--|--|
| **Verb** | The page is *yours* — move 2 widgets. |
| **Pages** | `yahoo/my.html` · `excite/my.html` already exist |
| **Key** | `itt96-myportal` |
| **Steps** | 1. Open My Yahoo. 2. Move or toggle 2 modules. 3. Reload — order persists. |
| **New HTML** | 0 |
| **Ban** | iGoogle (2005). Netvibes. |

---

## 1997 — push + bid

**LOCKED gold:** PointCast · `sites/pointcast/index.html` · `itt97-pointcast`  
Subscribe News **and** Weather.

### F-1997-A · Next after two channels

| | |
|--|--|
| **Chip dest** | `../ebay/item-laptop.html` — “Bid higher · eBay” |
| **Write** | existing `itt97-pointcast` |
| **New HTML** | 0 |

### F-1997-B · eBay bid higher

| | |
|--|--|
| **Verb** | AuctionWeb renamed eBay Sep 1997. Bid must be *higher*. |
| **Start** | `sites/ebay/item-laptop.html` (or `item-pda.html`) |
| **Steps** | 1. Read the item. 2. Enter a bid above current. 3. Confirm `bid-confirm.html`. 4. Optional: `register.html` first if the form requires it. |
| **Links** | Item → confirm. Confirm → `index.html` (no `myebay.html` in 1997 — that file is 1998+). |
| **Key** | existing bid theater if present; do not invent `itt97-ebay` as a star. |
| **Ban** | Buy It Now (Nov 2000). PayPal on the item (PayPal is 1999–2002). |

### F-1997-D · Slashdot moderate (live-UX second)

| | |
|--|--|
| **Pages** | `slashdot/{index,story}.html` — +1 `about.html` only if honesty has nowhere to live (about already exists). |
| **Key** | `itt97-slashdot` |
| **Steps** | 1. Open a story. 2. Post a comment. 3. Moderate / score. 4. Reload — score persists. Empty comment writes nothing. |
| **New HTML** | 0 |
| **Ban** | Reddit look. Digg bury (2005–06). |

---

## 1998 — empty search vs packed portal

**LOCKED gold:** I’m Feeling Lucky · `sites/google/lucky.html` · `itt98-lucky`  
Type a query, then Lucky.

### F-1998-A · Next after Lucky

| | |
|--|--|
| **Chip dest** | `../yahoo/index.html` — “Packed portal · the contrast” |
| **Why** | The year *is* sparse Google vs TV-ad Yahoo. |
| **Write** | existing `itt98-lucky` |

### F-1998-B · Lucky vs Search

| | |
|--|--|
| **Start** | `sites/google/index.html` |
| **Steps** | 1. Type the same query. 2. Click **Google Search** → `search.html` (a list). 3. Back. 4. **I’m Feeling Lucky** → `lucky.html` (one hop). Link both buttons; do not hide Search. |
| **New HTML** | 0 |

### F-1998-D · Babel Fish (live-UX second)

| | |
|--|--|
| **Pages** | `altavista/babelfish.html` + `index.html` + `about.html` exist |
| **Key** | `itt98-babelfish` |
| **Steps** | 1. Type a phrase. 2. Pick a language pair. 3. Translate. 4. Reload shows last pair + result. Empty text writes nothing. |
| **Ban** | Google Translate (2006). DeepL. |

---

## 1999 — sign on, then steal music

**LOCKED gold:** AIM · `sites/aim/index.html` · `itt99-aim`  
Screen name sign-on.

**Hygiene (do first):** home guided `<ol>` has **7** items. Move SourceForge to a chip. Guided must be **6**.

### F-1999-A · Next after AIM sign-on

| | |
|--|--|
| **Chip dest** | `../napster/search.html` — “Search a track” |
| **Write** | existing `itt99-aim` |

### F-1999-B · Napster search honesty

| | |
|--|--|
| **Verb** | Search is the product. Zero-byte / “user offline” is honesty, not a crash. |
| **Start** | `sites/napster/index.html` → `search.html` → `download.html` → `client.html` |
| **Steps** | 1. Type a track. 2. Search. 3. See a result **or** a zero-file line. 4. Download theater. 5. Legal residual `legal.html` is a sibling, not a block. |
| **Key** | F-D uses `itt99-napster`; B can be links only if search already writes. |
| **Ban** | Spotify. iTunes Store (2003). Working MP3 payload. |

### F-1999-D · Napster search machine (live-UX second)

Same rooms. Make search → library residual a 3-step REAL under `itt99-napster`. Chip, not star.

---

## 2000 — print the map, then shop the crash

**LOCKED gold:** MapQuest · `sites/mapquest/index.html` · `itt00-mapquest`  
From + To.

### F-2000-A · Next after directions

| | |
|--|--|
| **Chip dest** | `../amazon/index.html` — “Smile logo · add to cart” |
| **Alt dest** | `print.html` first if print is a required gold step — then Amazon. |
| **Pages** | `index.html` · `directions.html` · `print.html` exist |

### F-2000-B · Smile cart (continuity, labeled)

| | |
|--|--|
| **Start** | `sites/amazon/index.html` |
| **Steps** | Music tab → a CD → `cart.html` → `checkout.html`. Copy must say **smile-logo 2000**, not 1995 bookstore. |
| **Ban** | Unlabeled 1995 clone as if it were new. |

### F-2000-D · eBay watch + bid (live-UX second)

| | |
|--|--|
| **Pages** | `ebay/{index,item-laptop,item-pda,myebay,bid-confirm}.html` exist |
| **Key** | `itt00-ebay-watch` |
| **Steps** | 1. Open item. 2. Watch. 3. Bid higher. 4. Reload My eBay — watch + bid still there. Buy It Now (Nov 2000) is an optional chip, **not** this machine. |
| **New HTML** | 0 |

---

## 2001 — nudge, then edit

**LOCKED gold:** MSN Messenger · `sites/msn/index.html` · `itt01-msn`  
Sign on.

### F-2001-A · Next after sign-on

| | |
|--|--|
| **Chip dest** | `../wikipedia/edit.html` — “Edit · preview is not Save” |
| **Write** | existing `itt01-msn` |

### F-2001-B · Wikipedia edit → preview → history

| | |
|--|--|
| **Verb** | Anyone can edit. Preview ≠ Save (15 Jan 2001). |
| **Start** | `sites/wikipedia/index.html` → an `article-*.html` → `edit.html` |
| **Steps** | 1. Edit a paragraph. 2. **Preview** — still no write. 3. **Save** — writes. 4. `history.html` shows a new row. 5. Reload article shows the text. |
| **Key** | deepen `itt01-wiki-pages` (named leftover). Not a star (MSN is). |
| **Pages** | `edit.html` · `history.html` · articles already exist. No `itunes/` folder — do not invent one; iPod lives under `apple/` if at all. |
| **Ban** | VisualEditor. Mobile wiki. “Wiki is the one-thing.” |

### F-2001-D · Wiki history deepen (live-UX second)

Same as B if B is still one-click. Force preview-blocked write + history row + isolation vs `itt01-msn`.

---

## 2002 — thumb, then the graph seed

**LOCKED gold:** StumbleUpon · `sites/stumbleupon/index.html` · `itt02-stumble`  
Pick an interest, then Stumble (twice in the e2e).

### F-2002-A · Next after stumble

| | |
|--|--|
| **Chip dest** | `../friendster/index.html` — “Profile · testimonials (seed)” |
| **Write** | existing `itt02-stumble` |

### F-2002-B · Thumb bias (named leftover)

| | |
|--|--|
| **Verb** | Thumb up *and* down change what comes next. |
| **Start** | `sites/stumbleupon/index.html` |
| **Steps** | 1. Pick interest. 2. Stumble. 3. Thumb up. 4. Stumble — next page biased. 5. Thumb down — different next. `history.html` lists what you saw. |
| **New HTML** | 0 (`history.html` exists) |
| **Ban** | Algorithm copy that needs a server. |

### F-2002-C · Map leaf for Stumble

Map currently leads social with Friendster. **Add** a StumbleUpon leaf on Enter or a “Stumble trail” branch: `sites/stumbleupon/index.html` · do: “Pick interest · thumb · next”.

### F-2002-D · Netflix DVD queue (live-UX second)

| | |
|--|--|
| **Pages** | `netflix/{index,queue,genres}.html` exist |
| **Key** | `itt02-netflix-q` |
| **Steps** | 1. Browse genres. 2. Add two titles to `queue.html`. 3. Reorder. 4. “Mailed” residual on reload. |
| **Honesty** | Friendster **launched Mar 2003**; 2002 is seed/work. Do not write “launched 2002” on About. |
| **Ban** | Streaming Watch Now as default (2007 seed). |

---

## 2003 — hotlink, then 99¢

**LOCKED gold:** Photobucket · `sites/photobucket/index.html` · `itt03-photobucket`  
Filename + upload.

### F-2003-A · Next after upload

| | |
|--|--|
| **Chip dest** | `../myspace/profile.html` — “Paste the hotlink” |
| **Write** | existing `itt03-photobucket` |

### F-2003-B · Photobucket → MySpace

| | |
|--|--|
| **Verb** | The product is the **URL**, not the gallery. |
| **Start** | `photobucket/index.html` → `codes.html` (embed/hotlink) → `myspace/profile.html` |
| **Steps** | 1. Upload `party.jpg`. 2. Copy the hotlink line on `codes.html`. 3. Open MySpace profile. 4. Image appears / residual notes the URL. |
| **Pages** | all exist |
| **Ban** | Instagram. Facebook photo albums. |

### F-2003-D · iTunes 99¢ (live-UX second)

| | |
|--|--|
| **Pages** | `itunes/{index,browse,library,fairplay}.html` exist |
| **Key** | `itt03-itunes` |
| **Steps** | 1. Browse. 2. 1-click residual at **99¢**. 3. `library.html` lists the track. FairPlay is honesty, not a DRM exploit. |
| **Ban** | Streaming. $0.69/1.29 later tiers. Official Apple art. |

---

## 2004 — college graph, then 1 GB mail

**LOCKED gold:** thefacebook networks · `sites/facebook/networks.html` · `itt04-thefacebook-networks`  
Harvard (or a college) + name.

### F-2004-A · Next after join network

| | |
|--|--|
| **Chip dest** | `../gmail/invite.html` — “1 GB · invite lore · Apr 1” |
| **Write** | existing `itt04-thefacebook-networks` |

### F-2004-B · Network → friends → profile

| | |
|--|--|
| **Verb** | College email graph. Not News Feed. |
| **Start** | `facebook/networks.html` → `friends.html` → `profile.html` → `invite.html` |
| **Steps** | 1. Join Harvard. 2. See friends in-network. 3. Open profile. 4. Invite is growth, not open-reg. |
| **Ban** | News Feed (Sep 2006). Open registration (Sep 2006). The Like button (2009). Mapping the 80-folder forest. |

### F-2004-D · Flickr photostream (live-UX second)

| | |
|--|--|
| **Pages** | `flickr/{index,upload,tags,explore,groups}.html` exist |
| **Key** | `itt04-flickr` |
| **Steps** | 1. Upload residual. 2. Add a tag. 3. Open tags / explore — photo in the stream after reload. |
| **Ban** | Instagram filters. Yahoo-owned copy as if 2005+ redesign. |

---

## 2005 — name a station, then broadcast

**LOCKED gold:** Pandora · `sites/pandora/index.html` · `itt05-pandora`  
Station name.

### F-2005-A · Next after station

| | |
|--|--|
| **Chip dest** | `../youtube/upload.html` — “Broadcast Yourself · still independent” |
| **Write** | existing `itt05-pandora` |
| **Honesty** | Google buys YouTube **Oct 2006**. 2005 copy must say independent. |

### F-2005-B · YouTube upload → watch

| | |
|--|--|
| **Start** | `youtube/index.html` → `upload.html` → `watch.html` |
| **Steps** | 1. Title a clip. 2. Upload residual. 3. Watch. 4. Like (not a Facebook Like). First-video literacy (“Me at the zoo”, 23 Apr) lives on About, not as a fake embed of Jawed. |
| **Sibling** | Maps: `maps/index.html` pan/zoom → `mashups.html` (HousingMaps). Link from YouTube footer as “also 2005”, not a 7th guided step. |

### F-2005-D · Google Reader (live-UX second)

| | |
|--|--|
| **Disk** | **No** `years/2005/sites/reader/`. 2006 has `reader/{index,about}.html`. |
| **Rule** | Do **not** `cp` 2006. If D is named: +3 max `reader/{index,item,about}.html` year-true 2005. |
| **Key** | `itt05-reader` |
| **Steps** | Subscribe → star → unread persist. |
| **Ban** | Using 2006 Reader as 2005. Feedly. |

---

## 2006 — 140, then the Feed

**LOCKED gold:** Twitter · `sites/twitter/index.html` · `itt06-tweets`  
140-char compose.

### F-2006-A · Next after tweet

| | |
|--|--|
| **Chip dest** | `../facebook/feed.html` — “News Feed · open graph” |
| **Write** | existing `itt06-tweets` |

### F-2006-B · Tweet → profile from storage

| | |
|--|--|
| **Start** | `twitter/index.html` → `profile.html` |
| **Steps** | 1. Post ≤140. 2. Open profile — the tweet is there (from `itt06-tweets`). 3. Over 140 blocked, no write. |
| **Sibling** | `facebook/open.html` = open registration literacy. `youtube/about.html` = **now Google-owned**. Fix any leftover “independent” copy. |

### F-2006-D · Digg bury / promote (live-UX second)

| | |
|--|--|
| **Pages** | `digg/{index,submit,about}.html` exist |
| **Key** | `itt06-digg` |
| **Steps** | 1. Submit a story. 2. Bury or promote. 3. Front page order changes on reload. |
| **Ban** | Digg v4 (2010). Reddit look. |

---

## 2007 — phone as browser, no Get

**LOCKED gold:** iPhone Safari · `sites/iphone/index.html` · `itt07-iphone`  
Checks: shipped 29 Jun · **no App Store**.

### F-2007-A · Next after literacy save

| | |
|--|--|
| **Chip dest** | `../maps/streetview.html` — “Pegman · May 29” |
| **Write** | existing `itt07-iphone` |

### F-2007-B · Safari URL + mobile-broken

| | |
|--|--|
| **Pages** | `iphone/{index,about,specs}.html` |
| **Steps** | 1. Type / pick a preset URL. 2. Land on a **broken desktop** card (Flash / wide table). 3. That *is* the 2007 verb — web apps, not Get. |
| **Siblings** | `gmail/` is **open** (no invite). `facebook/platform.html` = f8 24 May. `facebook/beacon.html` = leak. `flashplayer/` exists for the nag — not an App Store. |
| **Copy bug** | Google Video must **not** say YouTube is still independent. |

### F-2007-D · Street View pegman (live-UX second)

| | |
|--|--|
| **Pages** | `maps/{index,streetview,about,mashups}.html` exist |
| **Key** | `itt07-streetview` |
| **Steps** | 1. Drag pegman. 2. Persist last pano. 3. Reload still there. |
| **Ban** | App Store · Chrome · Android mass (all 2008). Official Google panos. |

---

## 2008 — issue, then Get

**LOCKED gold:** GitHub issue · `sites/github/issue.html` · `itt08-github`  
Title + body.

### F-2008-A · Next after issue

| | |
|--|--|
| **Chip dest** | `../appstore/index.html` — “Get · >500 apps · Jul 10” |
| **Write** | existing `itt08-github` |

### F-2008-B · App Store get (in-room)

| | |
|--|--|
| **Pages** | `appstore/{index,about}.html` only — **no library.html yet** |
| **Steps (B, 0 HTML)** | Index: browse a category line → confirm Get theater on the same page. Link About for 10 Jul / 3G $199. |
| **Apple lock** | Newsroom 10 Jul 2008: **over 500** native apps, **>125 free**, 3G on sale **11 Jul**. Do not write 552 on About unless paired. |

### F-2008-D · App Store library (live-UX second)

| | |
|--|--|
| **New HTML** | **+1** `appstore/library.html` (forest year — keep it one file). |
| **Key** | `itt08-appstore` |
| **Steps** | Browse → confirm Get → library lists the app after reload. |
| **Ban** | Like button (2009). iPhone 3GS. Infinite App Store grid. Official icons. |

---

## 2009 — Like, then I’m at

**LOCKED gold:** Facebook Like · `sites/facebook/feed.html` · `itt09-fb-likes`  
Like a story (status post empty does not write).

### F-2009-A · Next after Like

| | |
|--|--|
| **Chip dest** | `../foursquare/index.html` — “Check in” |
| **Write** | existing `itt09-fb-likes` |

### F-2009-B · Like is one tap

| | |
|--|--|
| **Steps** | Feed → `[data-fb-like]` → count increments → reload persists. Do not require a status essay (that is incomplete on purpose). |
| **Sibling** | `stackoverflow/question.html` — accept **exactly one** `itt09-so-accepted` if still thin. `farmville/index.html` plant → wait. |

### F-2009-D · Foursquare check-in (live-UX second)

| | |
|--|--|
| **Pages** | `foursquare/{index,venue,about}.html` exist |
| **Key** | `itt09-foursquare` |
| **Steps** | 1. Open a venue. 2. Check in + optional shout. 3. Mayor residual. 4. Reload. |
| **Ban** | Swarm. Instagram. iPad. |

---

## 2010 — upload, then submit

**LOCKED gold:** Imgur · `sites/imgur/index.html` · `itt10-imgur`  
Filename upload. **Already has** Next → `../reddit/submit.html`.

### F-2010-A · Keep Imgur Next; add Reddit Next

| | |
|--|--|
| **Existing** | Imgur chip → Reddit submit (do not remove). |
| **New chip** | On `reddit/submit.html` after a complete post: → `../instagram/index.html` — “Filters · iOS only”. |
| **Write** | existing Reddit/Imgur keys |

### F-2010-B · Imgur URL on Reddit

| | |
|--|--|
| **Steps** | 1. Upload `meme.png`. 2. Copy album/image URL (`album.html` exists). 3. Reddit submit prefills that URL. 4. Post. |
| **Ban** | Instagram Android (3 Apr 2012). Stories (2016). |

### F-2010-D · Instagram first camera (live-UX second)

| | |
|--|--|
| **Pages** | `instagram/{index,filters,about}.html` exist — **no grid.html** |
| **Key** | `itt10-ig` |
| **Steps** | Pick a filter → persist on a grid residual. +1 `grid.html` only if index cannot show the square. |
| **Copy** | **iOS-only.** No Android button. |

---

## 2011 — request a stay (gold is invisible on the map)

**LOCKED gold:** Airbnb · `sites/airbnb/{index,listing,request}.html` · `itt11-airbnb`  
City → listing → request. **Map thesis still says Spotify US. No Airbnb leaf.**

### F-2011-C · Map gold (do this first)

| | |
|--|--|
| **Edit** | `ITT.flowMaps["2011"]` |
| **Thesis** | Streaming + Timeline + Siri stays as *year weather*. Add: **Airbnb request is the one-thing.** |
| **New branch** | label: `Stay request` · do: `Host accepts — not Instant Book` |
| **Leaves** | `Airbnb search` → `sites/airbnb/index.html` · `Listing` → `listing.html` · `Request` → `request.html` (steps: Search city / Open listing / Request to book) |
| **Spotify** | Keep as a **P1** leaf under “Music streaming US”. Do not delete. Do not restar. |

### F-2011-A · Next after request

| | |
|--|--|
| **Start** | `sites/airbnb/request.html` (or index after book click) |
| **Chip dest** | `../facebook/timeline.html` — “Timeline · JSON, not 1” |
| **Write** | existing `itt11-airbnb` |
| **Reload** | Listing still selected if plaque/key present (named leftover). |

### F-2011-B · Timeline is a life story

| | |
|--|--|
| **Start** | `facebook/timeline.html` |
| **Steps** | Save must write **JSON** (object with events), never `"1"`. Reload renders the story. |
| **New HTML** | 0 |
| **Ban** | Instant Book as gold. Restore 2010 forest. Snap as star. |

### F-2011-D · Uber SF (live-UX second)

| | |
|--|--|
| **Disk** | **No** `years/2011/sites/uber/`. 2012 has `uber/index.html`. |
| **Rule** | Do not copy 2012. Lean **+3**: `uber/{index,sf,ride}.html` only if this year is named after C+A. |
| **Key** | `itt11-uber` |
| **Steps** | Pin SF → request → “car is coming” · **no pay**. |
| **Ban** | UberX (2012). Lyft as star. |

---

## 2012 — timed comment (also missing from the map)

**LOCKED gold:** SoundCloud · `sites/soundcloud/{index,track,about}.html` · `itt12-soundcloud`  
Play + comment text.

### F-2012-C · Map gold (do this first)

| | |
|--|--|
| **New branch** | `Timed comment` · do: `Play · comment at a time` |
| **Leaves** | `SoundCloud` → `index.html` · `Track` → `track.html` (steps: Play / Type comment / Post) |
| **Keep** | IG Android · IPO · SOPA as other branches. |

### F-2012-A · Next after comment

| | |
|--|--|
| **Chip dest** | `../instagram/android.html` — “Android · Apr 3” |
| **Write** | existing `itt12-soundcloud` |
| **Deepen** | Comment stores a **time** (playhead residual), not only text (named leftover). |

### F-2012-B · IG Android vs iOS leftover

| | |
|--|--|
| **Start** | `instagram/android.html` |
| **Links** | Android (this year) · `index.html` (app) · `acquired.html` (FB buy) — three rooms already. |
| **Ban** | Stories. Reels. |

### F-2012-D · Pinterest board (live-UX second)

| | |
|--|--|
| **Pages** | `pinterest/{index,about}.html` — **no board.html** |
| **+1** | `pinterest/board.html` if named (lean +3 cap). |
| **Key** | `itt12-pinterest` |
| **Steps** | Pin → board → reload wall. |

---

## 2013 — hold 6s, then 24h

**LOCKED gold:** Vine · `sites/vine/record.html` · `itt13-vine-posts`  
Hold → caption → post.

### F-2013-A · Next after Vine post

| | |
|--|--|
| **Chip dest** | `../snapchat/story.html` — “My Story · 24h” |
| **Write** | existing `itt13-vine-posts` |
| **Already** | Tinder has Next → `matches.html`. Keep it. |

### F-2013-B · Stories & 15s (map already has the trail)

| | |
|--|--|
| **Start** | `snapchat/story.html` → `instagram/video.html` |
| **Steps** | Add to My Story (24h honesty) · IG Video 15s + filter. These are **not** IG Stories (2016). |
| **Ban** | IG Stories. Reels. Healthcare.gov as gold. |

### F-2013-D · Tinder deck (live-UX second)

| | |
|--|--|
| **Pages** | `tinder/{index,matches,about}.html` exist |
| **Key** | `itt13-tinder` |
| **Steps** | Swipe L/R (not two buttons if a deck can deepen in place) → matches persist. |
| **Ban** | Second star. Official Tinder art. |

---

## 2014 — install chat, then #general

**LOCKED gold:** WhatsApp · `sites/whatsapp/index.html` · `itt14-wa-install`  
Name + install. Chat is `chat.html`.

### F-2014-A · Next after install

| | |
|--|--|
| **Existing** | One Next already → Slack `channel.html`. **Keep.** If it fires too early (install only), also put a chip on `whatsapp/chat.html` after first send → Slack. |
| **Write** | existing WA keys |

### F-2014-B · Slack #general persist

| | |
|--|--|
| **Pages** | `slack/{index,channel,about}.html` exist |
| **Steps** | Open #general → send → reload thread still there. Slack is **P1**, not the star. |
| **Sibling** | Heartbleed `rotate.html` — rotate ≥2 services. |

### F-2014-D · Twitch chat (live-UX second)

| | |
|--|--|
| **Pages** | only `twitch/index.html` |
| **+2** | `channel.html` + `about.html` if named (lean +3). |
| **Key** | `itt14-twitch` |
| **Steps** | Channel → send → reload thread. |
| **Ban** | Watch **ships** (2015). Official Twitch/Nintendo art. |

---

## 2015 — wrist ships, then go live

**LOCKED gold:** Apple Watch · `sites/apple/watch.html` · `itt15-watch`  
Shipped 24 Apr check.

### F-2015-A · Next after pair/save

| | |
|--|--|
| **Chip dest** | `../periscope/index.html` — “Go live” (or `../windows10/upgrade.html` if you want OS first — pick **one** primary Next). |
| **Write** | existing `itt15-watch` |
| **New HTML** | 0 — currently **0** Next chips on the whole year. |

### F-2015-B · Discord #general (in-room; rooms exist)

| | |
|--|--|
| **Pages** | `discord/{index,server,channel,about}.html` exist |
| **Steps** | Server → #general → send → persist (FLOWS-LINKS leftover 7). Chip under P1, not guided 7. |
| **Ban** | Stories as 2015 gold. Slack look on Discord. |

### F-2015-D · Discord as live-UX second

Same rooms. Only if B is still a plaque. Key `itt15-discord`. No new HTML.

---

## 2016 — tap 24h (pattern year)

**LOCKED gold:** Instagram Stories · `sites/instagram/stories.html` · `itt16-ig-stories`  
**Already 28 Next chips.** Do not flood more.

### F-2016-A · Audit destinations (no new rooms)

| | |
|--|--|
| **Job** | Walk every `[data-next-flow]`. Gold and game stay first. Replace “About / home only” leftovers with Stories or Vine goodbye. |
| **New HTML** | 0 |

### F-2016-B · Stories tap-through (in-room)

| | |
|--|--|
| **Pages** | `stories.html` · `stories-about.html` · `watch.html` |
| **Steps** | Add a 24h frame → tap through → expire honesty. Not Reels. Not TikTok. |
| **Date** | **2 Aug 2016** (TechCrunch). |

### F-2016-D · musical.ly (live-UX second)

| | |
|--|--|
| **Pages** | `musically/{index,create}.html` exist |
| **Key** | `itt16-musical` |
| **Steps** | Sound → clip residual → feed. Chip. **Not** 2018 TikTok. |
| **Ban** | TikTok US mass / 2 Aug 2018 merge as if 2016. |

---

## 2017 — face is the password

**LOCKED gold:** iPhone X / Face ID · `sites/iphone/x.html` · `itt17-faceid`  
**Already 33 Next chips.**

### F-2017-A · Audit destinations

| | |
|--|--|
| **Job** | Prefer Face ID residual / Fortnite game / 280. Do not point leftovers only at home. |
| **Optional chip** | Watch Series 3 leftover → Face ID (named). |
| **Dates** | Announce **12 Sep** · $999 · ship **3 Nov** · swipe-up, no Home. |

### F-2017-B · Face ID is the phone, not iOS 11

| | |
|--|--|
| **Links** | `iphone/x.html` ↔ `iphone/index.html` (iPhone 8 residual). iOS 11 is a harvest room, not the star. |

### F-2017-D · Netflix My List (live-UX second)

| | |
|--|--|
| **Pages** | only `netflix/index.html` |
| **+2** | `list.html` + `about.html` if named (lean +3). |
| **Key** | `itt17-netflix` |
| **Ban** | GDPR (2018). TikTok merge. HomePod **in stores**. Official Netflix art. |

---

## 2018 — Manage, then For You

**LOCKED gold:** GDPR · `sites/gdpr/{index,manage,rights,blocked}.html` · `itt18-gdpr`  
Accept All is the **trap**. Manage is the gold.  
**Already 29 Next chips.** Manage → FYP already.

### F-2018-A · Keep Manage → FYP; fix home-only leftovers

| | |
|--|--|
| **Job** | Chips that only say Starting Point (Fortnite Switch, Dropbox IPO, Pixel, Portal, Flickr 1000, HomePod) — pick a year-true sibling or leave as true ends. Do not make *every* leftover → home. |
| **Nouwens** | Reject must stay visible. Hiding Reject is the exhibit (+22–23 pp consent), not our default pattern. |

### F-2018-B · FYP is still a plaque (in-room)

| | |
|--|--|
| **Pages** | `tiktok/{index,fyp}.html` — **no create.html** in 2018 (2019 has create). |
| **Steps (0 HTML)** | Index → FYP. Caption/post stays F-D. |
| **Date** | musical.ly merge **2 Aug 2018**. |
| **Cap** | Do not pass **60** HTML (now 48). |

### F-2018-D · FYP reorder (live-UX second)

| | |
|--|--|
| **+1** | `tiktok/create.html` only if named. |
| **Key** | `itt18-tiktok-fyp` |
| **Steps** | Caption → post → FYP order changes from taps. Never a second star. |
| **Ban** | Reels (2020). Disney+. Official TikTok art. |

---

## 2019 — remake, then Continue

**LOCKED intended gold:** Disney+ · `sites/disneyplus/{index,home,queue,kids,about}.html` · `itt19-disneyplus`  
**Disk:** 526 HTML forest · home has **no** guided `<ol>` · **no** `data-ott-one-thing` · 12 Next chips mostly → home.

**Do not add F-A/B/C into the forest.** Remake first (~42–60 HTML). Then:

### F-2019-R · Remake lobby (not a densify)

| | |
|--|--|
| **Home** | Guided **6**: About · Disney+ · TikTok FYP chip · Arcade chip · TV+ chip · Map. One `data-ott-one-thing` → Disney+ index. |
| **Delete/ignore** | Amazon/Yahoo/Google clone trees. Do not `cp` 2018. |
| **Scale** | Live Stats **has no 2019 websites row**. Do not invent. |

### F-2019-A · After remake: Next after Disney+

| | |
|--|--|
| **Steps** | Plan → Join → Watchlist/`queue.html`. Chip → `../appletv/index.html` — “Continue · not the star”. |
| **Write** | `itt19-disneyplus` |
| **Date** | **12 Nov 2019**. Trial trap is the gold feel. |

### F-2019-D · Apple TV+ Continue (live-UX second)

| | |
|--|--|
| **Pages** | `appletv/{index,watch,about}.html` exist |
| **Key** | `itt19-tvplus` |
| **Steps** | Profile → title → continue row persist. After remake only. |
| **Ban** | Stadia as co-star. Official Disney/Apple art. |

---

## 2020 — Join is the trap

**LOCKED gold:** Zoom · `sites/zoom/{index,join,meeting,recap,about}.html` · `itt20-zoom`  
Join → mute → chat → leave.  
**Only 4 Next attrs** (Reels ↔ TikTok EO, recap → Reels/CCPA).

### F-2020-A · Next on every Zoom step + three P0s

| | |
|--|--|
| **join.html** (after valid join, before leave) | → `meeting.html` — “You’re muted” |
| **meeting.html** (after mute + chat, before leave) | stay in-product |
| **recap.html** (after complete REAL) | keep Reels · CCPA; **add** `../flash/eol.html` as third, not home |
| **reels.html** | already → TikTok EO — keep |
| **ccpa/index.html** | add chip → `../zoom/recap.html` or gold index — “Join is the trap” |
| **flash/eol.html** | add chip → Zoom recap or CCPA |
| **Write** | existing `itt20-zoom` / existing P0 keys |
| **New HTML** | 0 |
| **Scale** | 300M = daily meeting **participants** (Yuan 17 Mar 2021), not unique users. No June websites digit. |

### F-2020-B · Reels is 15s, not Stories

| | |
|--|--|
| **Pages** | `instagram/{reels,stories,igtv}.html` |
| **Links** | Reels (5 Aug 2020, 15s) ≠ Stories (2016) ≠ IGTV (2018). One line on each page to the other two. |

### F-2020-D · Quibi 6-min then gone (live-UX second)

| | |
|--|--|
| **Pages** | only `quibi/index.html` |
| **+2** | `show.html` + `gone.html` if named (lean +3; year is 52 HTML). |
| **Key** | `itt20-quibi-ep` |
| **Steps** | Show → 6-min theater → gone-in-year honesty. |
| **Ban** | Case-count dashboard. Official Zoom/Quibi art. 2021+. |

---

## Cross-year implement order (when you start)

| Priority | Year | Flows | New HTML |
|----------|------|-------|----------|
| 1 | **2011** | C map + A Next + B Timeline JSON | 0 |
| 2 | **2012** | C map + A Next + timed comment | 0 |
| 3 | **2020** | A chips on Zoom/CCPA/Flash | 0 |
| 4 | **1994** | A Next + B Yahoo drill | 0 |
| 5 | **1999** | Hygiene guided 7→6 + A Next | 0 |
| 6 | **2002** | C Stumble leaf + A Next | 0 |
| 7 | 1995–2010, 2013–15 | A only (one chip on gold) | 0 |
| 8 | 2016–18 | A audit only | 0 |
| 9 | **2019** | Remake, then A | rebuild, not +links |
| last | any | D live-UX second | 0–3 |

Never `implement leftover all`. Never `implement live ux all years`.

---

## e2e gate for any F-A

```
1. Open gold URL. [data-next-flow] is hidden.
2. Incomplete action. localStorage ittYY-gold absent. chip still hidden.
3. Complete action. key is a JSON blob with real:true.
4. Chip visible. href is the dest in this file (not only home).
5. Click dest. URL matches. Neighbor prefix itt(YY±1) untouched.
```

Skin + copy still year-true. Mechanism is shared.
