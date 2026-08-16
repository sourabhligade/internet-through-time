# Improve map — 5× research, flows, and links (1994–2020)

**Date:** 2026-08-15  
**Status:** Research + implement map. **Do not start every year.** Name a wave.  
**Git only if asked.**

**Execute TODO (goals · phases · minute steps · ROI · `[ ]` per year):** [`IMPROVE-5X-TODO-GOALS-PHASES-STEPS-ROI-FLOWS-1994-2020.md`](IMPROVE-5X-TODO-GOALS-PHASES-STEPS-ROI-FLOWS-1994-2020.md)

**Grounded in:** year-by-year disk audit (this session) · last push `1bd50e7f` 2016 remake · leftover execute 2026-08-14 · COMPLEX-LIVE · [`WIDELY-USED-MISSING-INTEGRATIONS-1994-2018.md`](WIDELY-USED-MISSING-INTEGRATIONS-1994-2018.md) · per-year READ-FIRST / museum-grade.

**Companions (do not reopen as unbuilt):**  
[`DISK-TRUTH.md`](DISK-TRUTH.md) · [`NON-DONE.md`](NON-DONE.md) · [`TO-100-LEFTOVER-TODO-EXECUTE-2026-08-14.md`](TO-100-LEFTOVER-TODO-EXECUTE-2026-08-14.md) · [`COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md`](COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md) · [`ARCHITECTURE.md`](ARCHITECTURE.md) · 2016 implement bible [`2016-FROM-SCRATCH-IMPLEMENT-BIBLE-PHASES-FLOWS-MINUTE-2026-08-15.md`](2016-FROM-SCRATCH-IMPLEMENT-BIBLE-PHASES-FLOWS-MINUTE-2026-08-15.md)

---

## 0. How to use

| You say | You do |
|---------|--------|
| `implement hygiene` | Wave 0 only (§2) |
| `research 5x 2007` | That year’s harvest pack only (§4 recipe + that year’s row) |
| `implement 5x flows 2007` | That year’s five new flows + links only |
| `implement 5x all years` | **Do not.** One year per pass |

This file is the **single improvement map** after the full-year audit. Older leftover bibles still have stale `[ ]`. Trust **disk + this file**.

---

## 1. What “5×” means (so it does not become a forest)

Today most years have **one locked star**, a **6-step guided `<ol>`**, a playable toy set, a year game, and a thin trail strip. That is the museum spine. It is **not** thin because we forgot Yahoo existed — late years were *pruned on purpose*.

**5× is not 5× HTML.** 2011 at 49 × 5 = 245 would restore the 2010 forest. Forbidden.

| Layer | Baseline now | 5× target | Cap |
|-------|--------------|-----------|-----|
| **R · Research** | ~5–15 cited spine URLs / year | **≥ 25 new visited URLs** (Wayback `id_` · newsroom · Pew/ITU · WDM/Version Museum) logged in `docs/references/YYYY/CAPTURE-LOG.md` + a `YYYY-5X-HARVEST.md` | Never invent pixels |
| **F · Flows** | 1 star + ~1–2 COMPLEX | **+5 REAL use-loops** per year (F1–F5 below). Incomplete never writes. Reload persists. | Not a 2nd star |
| **L · Links** | Guided 6 + a few trails | **+5 year-true trails** on home/map + **Next chip** after each new REAL + 1 handoff href to the *next* year’s related room | Guided `<ol>` stays **6** |

### 1.1 A “flow” (same bar as COMPLEX-LIVE)

Must:

- Visitor **does** something (search, bid, pin, swipe, publish, queue) — not “I understand”
- **≥ 2 pages** with different jobs (reuse existing folders first)
- Incomplete click → **no** `ittYY-*` write
- Complete → `{ multiStep, real, year, ts, …typed }`
- Home gets a **trail chip** under P1 / “also”, **not** `data-ott-one-thing`
- e2e: empty blocked · complete persist · neighbor prefix untouched

Must not:

- Steal the locked star
- Add a 7th guided `<li>`
- Invent logos
- Clone AltaVista/Pets/Amazon CDs into lean years
- Scaffold 2021+

### 1.2 A “link” (what 5× links actually are)

For each new flow, wire **all five**:

1. Home trail card `data-trail-keys="ittYY-…"`
2. Year `pages/map.html` / `js/config/flow-maps.js` leaf
3. Product **Next** chip `[data-next-flow]` → the next flow in that year’s F1–F5 chain
4. `js/config/YYYY.js` `urlMap` + `titleMap` + one `locationHints` regex
5. One **cross-room** href (e.g. Photobucket → MySpace, Imgur → Reddit, jack → AirPods)

Forest years (1998–2010): **prefer linking rooms that already exist** over new HTML.  
Lean years (2011–14, 2016–18, 2020): **+3 HTML max** for the whole 5-flow pack. Reuse first.

### 1.3 Hard locks (every year)

1. One-thing chips stay locked (table §3).  
2. Config + content. **No engine fork.**  
3. Prefix `ittYY-*` only.  
4. Never invent brand pixels. Failed-final is legal.  
5. Do not restore pruned forests (2011–14, 2016–18, 2020).  
6. **2019: prune before any 5× densify.**  
7. Do not reopen gold years as “broken”: **1995–97, 2005, 2017–18, 2020 Zoom**. 5× there = deepen + link, not a new star.  
8. Git only if asked.

---

## 2. Wave 0 — hygiene (do this before 5×)

The audit and the last push left **product holes that 5× would make worse** if ignored.

| ID | What | Why first | Done when |
|----|------|-----------|-----------|
| **H0** | Last push `1bd50e7f` is **S0 + prune + Stories gold**, not the full 2016 bible | Allo/LinkedIn/Switch still in the *pushed* tree; STEM/Jio only **uncommitted** | Either commit the dirty 51-HTML 2016 slice **or** leave it, but do not 5×-densify the 57-HTML GitHub copy |
| **H1** | **`prune 2019`** | 526 HTML forest + 2014 Heartbleed tour + Disney+ star/index split + Chrome img 404 | ≤ 60 HTML · tour is Disney+/TikTok/Arcade · star = Who’s Watching/Continue · trial never writes |
| **H2** | 2015 map title still “2014” · Chrome page still “2014 browser war” | Two leftover copy bugs | Titles say 2015 |
| **H3** | Docs honesty | Leftover still says 2015/16 forests 485/519; DISK-TRUTH 2014=43, 2019=lean | Write disk counts: 2011=49 · 2012=47 · 2013=59 · 2014=58 · 2015=95 · 2016=51 (worktree) / 57 (origin) · 2019=526 · no 2021 |
| **H4** | Do not commit the other ~1,600 dirty files as “2016 remake” | Unrelated years mixed in | 2016-only commit if you commit at all |

**Recommend order:** H3 docs (cheap) → H2 2015 copy → **H1 prune 2019** → H0 2016 commit-or-hold → then 5× one year.

---

## 3. Locked stars (never retarget)

| Year | Star | Key | HTML now | Model |
|-----:|------|-----|----------|--------|
| 1994 | CSotD wander + guestbook | `itt94-csotd` | 177 | Authored forest |
| 1995 | Amazon SSL checkout | `itt95-ssl-checkout` | 142 | Gold · stop-as-star |
| 1996 | Portal wars 3-hit | `itt96-portal-wars` | 111 | Gold · stop-as-star |
| 1997 | PointCast ≥2 channels | `itt97-pointcast` | 84 | Gold · stop-as-star |
| 1998 | I’m Feeling Lucky | `itt98-lucky` | 127 | Forest |
| 1999 | AIM sign-on + IM | `itt99-aim` | 151 | Forest |
| 2000 | MapQuest From+To | `itt00-mapquest` | 173 | Forest |
| 2001 | MSN window | `itt01-msn` | 186 | Forest |
| 2002 | Stumble rotator | `itt02-stumble` | 209 | Forest |
| 2003 | Photobucket → MySpace | `itt03-photobucket` | 232 | Forest |
| 2004 | thefacebook networks | `itt04-thefacebook-networks` | 289 | Forest |
| 2005 | Pandora station | `itt05-pandora` | 294 | Gold · stop-as-star |
| 2006 | Twitter 140 | `itt06-tweets` | 299 | Forest labeled |
| 2007 | iPhone Safari | `itt07-iphone` | 315 | Forest labeled |
| 2008 | GitHub | `itt08-github` | 326 | Forest labeled |
| 2009 | Facebook Like | `itt09-fb-likes` | 338 | Forest labeled |
| 2010 | Imgur → Reddit | `itt10-imgur` | 378 | Forest peak |
| 2011 | Airbnb request | `itt11-airbnb` | 49 | Lean |
| 2012 | SoundCloud timed comment | `itt12-soundcloud` | 47 | Lean |
| 2013 | Vine 6s | `itt13-vine-posts` | 59 | Lean |
| 2014 | WhatsApp | `itt14-wa-install` | 58 | Lean A |
| 2015 | Apple Watch ship | `itt15-watch` | 95 | Lean-ish |
| 2016 | Instagram Stories | `itt16-ig-stories` | 51 / 57 origin | Lean remake |
| 2017 | Face ID | `itt17-faceid` | 49 | Lean A |
| 2018 | GDPR Manage | `itt18-gdpr` | 48 | Lean A− |
| 2019 | Disney+ (trial = trap) | `itt19-disneyplus` | **526** | **Prune first** |
| 2020 | Zoom join≠save | `itt20-zoom` | 52 | Lean |

---

## 4. 5× research recipe (copy per year)

Create `docs/YYYY-5X-HARVEST.md` + append `docs/references/YYYY/CAPTURE-LOG.md`.

### 4.1 Visit quota (this is the 5×)

| Bucket | Count | Where |
|--------|------:|--------|
| Dated Wayback `id_` HTML of **each F1–F5 product** | 5–10 | `web.archive.org` year-correct |
| Newsroom / blog announce for each flow | 5 | Apple / Meta / Google / company blog |
| Screenshot museums | 5 | [Web Design Museum](https://www.webdesignmuseum.org/) · [Version Museum](https://www.versionmuseum.com/) |
| Scale / context | 3 | Live Stats · ITU · Pingdom · Pew (never blend cells) |
| Chrome / OS still | 2 | evolt · GUIdebook · failed-final if interstitial |
| **Minimum new URLs** | **≥ 25** | Log URL · date visited · what you took · `[wa]` / `[failed-final]` |

### 4.2 What to extract (not vibes)

For each F-flow:

1. Exact product **verb** (Stumble, Hotlink, I’m Feeling Lucky, Who’s watching).  
2. **Date lock** (ship / ban / dual-cite).  
3. Markup hooks already on disk (`data-*`) — deepen before new HTML.  
4. One **honest residual** if the brand pixel harvest fails.  
5. One **Next** destination inside the same year.

### 4.3 Research bans

- Do not invent a Live Stats June 2019/2020 websites digit.  
- Do not treat a 2017 product as 2016 weather (Chrome “Not secure”, Face ID, TikTok logo, Reels).  
- Do not harvest exploit PoCs (Heartbleed is literacy, not a CVE playground).  
- Do not rip SWF / commercial audio / official Pokémon/Fortnite/Among Us art.

---

## 5. Per-year improve map — 5 new flows + links

**How to read a row**

- **Reuse** = folder already on disk. Prefer this.  
- **+n** = new HTML allowed (lean years budget the whole pack).  
- **Key** = write only on complete.  
- **Next** = the chip after REAL (link layer).  
- **Research first** = harvest URLs before code.

COMPLEX-LIVE’s “one new machine” is **F1** here. F2–F5 are the 5× expansion.

---

### 1994 — authored gold · deepen, don’t flatten

**Star stays CSotD.** Yahoo tree is handmade density — do not delete.

| # | New flow | Reuse | Key | Next | Research first |
|---|---------|-------|-----|------|----------------|
| F1 | **IUMA listen** — pick track → modem bar → Play residual | `iuma/` (9 files) | `itt94-iuma` | FishCam | IUMA 1994 helper-app docs · no MP3 store |
| F2 | **FishCam stills** — wait 8s → next still persist | `fishcam/` | `itt94-fishcam` | White House | netscape.com FishCam captures |
| F3 | **White House imagemap** — click a building → room | `whitehouse/` | `itt94-wh-map` | Yahoo Computers | 1994 WH.gov imagemap |
| F4 | **Yahoo 3-hub wander** — Computers → Entertainment → News (already partial) | `yahoo/` | `itt94-yahoo-wander` (exists — thicken) | CSotD archive | akebono Yahoo |
| F5 | **What’s New / NCSA** — open a dated What’s New item | `ncsa/` · `cern/` | `itt94-whatsnew` | IUMA | NCSA What’s New 1994 |

**Links:** Starting Point trail strip of 5; map branch “First night on the Web”; handbook hrefs must stay year-root (`sites/…` not `pages/sites/`).  
**Do not:** steal CSotD · invent NN1 OEM pixels (L4).

---

### 1995 — gold year · 5× = link + homestead, not a new cart

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | GeoCities homestead publish → visit | `geocities/` + e2e already | `itt95-homestead` | AuctionWeb |
| F2 | AuctionWeb low bid → confirm (not eBay name) | `auctionweb/` | `itt95-aw-bid` | Yahoo |
| F3 | AltaVista keyword → result catalog | `altavista/` | `itt95-av` | CNN |
| F4 | HotWired department hop (3 sections) | `hotwired/` | `itt95-hotwired` | Amazon cart *view* (not SSL star) |
| F5 | Netscape What’s Cool / What’s New buttons | `netscape/` | `itt95-cool` | GeoCities |

**Do not:** rename AuctionWeb → eBay · reopen SSL as a second star.

---

### 1996 — gold year

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | My Yahoo / My Excite — move 2 widgets | `yahoo/my` · `excite/my` | `itt96-myportal` | HoTMaiL |
| F2 | HoTMaiL compose → inbox persist | `hotmail/` | `itt96-hotmail` | Space Jam |
| F3 | Space Jam 3-planet wander | `spacejam/` | `itt96-jam` | RealPlayer |
| F4 | RealPlayer buffer theater | `realplayer/` | `itt96-real` | Guestbook |
| F5 | Guestbook sign min 2 | existing guestbook | `itt96-gb` | Portal wars (star, not a rewrite) |

---

### 1997 — gold year

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Slashdot moderate persist | `slashdot/` | `itt97-slashdot` | eBay |
| F2 | eBay bid confirm (1997 black wordmark) | `ebay/` | `itt97-ebay-bid` | ICQ |
| F3 | ICQ add buddy (already multipage — thicken) | `icq/` | `itt97-icq-buddy` | PointCast |
| F4 | Think Different / Apple product hop | `apple/` | `itt97-td` | Drudge |
| F5 | Drudge headline click → story | `drudge/` | `itt97-drudge` | Slashdot |

**Do not:** PointCast tick overlay unless named (optional `[~]`).

---

### 1998

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Babel Fish type → pair → persist | `altavista/babelfish.html` | `itt98-babelfish` | DMOZ |
| F2 | Google **search** catalog (not Lucky) | `google/search.html` | `itt98-google-q` | Amazon Music |
| F3 | Amazon Music CD add | `amazon/` | `itt98-amzn-cd` | eBay IPO literacy |
| F4 | DMOZ category drill 2 levels | `dmoz/` | `itt98-dmoz` | Mozilla |
| F5 | Mozilla / netscape.org split literacy | `mozilla/` · `netscape/` | `itt98-mozilla` | Lucky (star remains) |

**Do not:** restyle Lucky as 2005 Google.

---

### 1999

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Napster search → zero-file honesty | `napster/search.html` | `itt99-napster` | Blogger |
| F2 | Blogger publish permalink | `blogger/` | `itt99-blogger` | PayPal |
| F3 | PayPal send residual (no money) | `paypal/` | `itt99-paypal` | eBay |
| F4 | eBay browse + watch (multicolor era) | `ebay/` | `itt99-ebay` | AIM (star) |
| F5 | Y2K literacy 2-check (Zombo/Hampster stay weather) | `y2k/` | `itt99-y2k` | Google funded |

**Do not:** prune Hamster/Y2K/Zombo.

---

### 2000

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | eBay watch + bid reload | `ebay/myebay` | `itt00-ebay-watch` | Pets |
| F2 | Pets.com shop → shutdown honesty | `pets/` | `itt00-pets` | Amazon smile |
| F3 | Amazon smile cart (not 1995 SSL) | `amazon/` | `itt00-amzn` | Napster legal |
| F4 | Napster legal news hop | `napster/` | `itt00-nap-legal` | Flash nag |
| F5 | Flash 4 install nag theater | `flash4/` | `itt00-flash` | MapQuest (star) |

---

### 2001

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Wikipedia edit → preview → history (deepen) | `wikipedia/` | `itt01-wiki-pages` | iPod |
| F2 | iPod / iTunes 2 library (no Store) | `apple/ipod` · `itunes` | `itt01-ipod` | Wayback |
| F3 | Wayback lookup theater | `wayback/` | `itt01-wayback` | Movable Type |
| F4 | Movable Type publish | `movabletype/` | `itt01-mt` | Broadband |
| F5 | Always-on ISP literacy | `broadband/` | `itt01-bb` | MSN (star) |

**Do not:** iTunes Store (2003) · Skype UI.

---

### 2002

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Netflix DVD queue reorder + mailed residual | `netflix/` | `itt02-netflix-q` | Friendster |
| F2 | Friendster profile + testimonial | `friendster/` | `itt02-fs` | KaZaA |
| F3 | KaZaA search theater (no files) | `kazaa/` | `itt02-kazaa` | Wired |
| F4 | Wired all-CSS article hop | `wired/` | `itt02-wired` | Google News |
| F5 | Google News BETA click | `googlenews/` | `itt02-gnews` | Stumble (star) |

**Do not:** live-random the open Web.

---

### 2003

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | iTunes 99¢ browse → library residual | `itunes/` | `itt03-itunes` | WordPress |
| F2 | WordPress publish | `wordpress/` | `itt03-wp` | LinkedIn |
| F3 | LinkedIn invite | `linkedin/` | `itt03-li` | MySpace Top 8 |
| F4 | MySpace Top 8 persist | `myspace/` | `itt03-ms-top8` | AdSense |
| F5 | AdSense report residual | `adsense/` | `itt03-adsense` | Photobucket (star) |

---

### 2004

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Flickr upload residual → tag → stream | `flickr/` | `itt04-flickr` | Gmail |
| F2 | Gmail invite compose | `gmail/` | `itt04-gmail` | Firefox |
| F3 | Firefox 1.0 download thanks | `firefox/` | `itt04-fx` | Digg seed |
| F4 | Digg seed vote | `digg/` | `itt04-digg` | folklore |
| F5 | folklore.org story open | `folklore/` | `itt04-folk` | networks (star) |

**Do not:** News Feed (2006).

---

### 2005 — gold year · deepen existing P0, do not add Reader as a hole

Leftover law: **do not reopen 2005.** 5× = **links + deepen**, not a new competitor to Pandora.

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | YouTube upload → watch → like (deepen) | `youtube/` | `itt05-yt` | Maps |
| F2 | Maps Ajax pan persist last view | `maps/` | `itt05-maps` | Reddit |
| F3 | Reddit upvote persist | `reddit/` | `itt05-reddit` | Digg |
| F4 | Digg bury/promote | `digg/` | `itt05-digg` | Housing Maps |
| F5 | Housing Maps mashup literacy | `housingmaps/` | `itt05-hm` | Pandora (star) |

**Do not:** Google-owns-YouTube · Twitter · Chrome · iPhone · new `sites/reader/` unless explicitly named.

---

### 2006

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Digg bury → front page (exists — trail it) | `digg/` | `itt06-digg` | Feed |
| F2 | Facebook News Feed story click | `facebook/feed.html` | `itt06-feed` | YouTube dual-date |
| F3 | YouTube Google-owns late-2006 honesty | `youtube/` | `itt06-yt` | Docs |
| F4 | Google Docs create residual | `docs/` | `itt06-docs` | Time You |
| F5 | Time “You” literacy 2-check | existing Time room | `itt06-time-you` | Twitter (star) |

**Do not:** prune 299 unless named `prune 2006`.

---

### 2007

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Street View last-pano persist | `maps/streetview.html` | `itt07-streetview` | Gmail open |
| F2 | Gmail **open** (no invite) send | `gmail/` | `itt07-gmail` | Platform |
| F3 | Facebook Platform add app residual | `facebook/platform.html` | `itt07-fb-app` | Twitter SXSW |
| F4 | Twitter SXSW compose (not 140-star of 2006) | `twitter/` | `itt07-tw` | Kindle literacy |
| F5 | Kindle page literacy (already 2-req — trail it) | `amazon/kindle.html` | `itt07-kindle-ack` | iPhone (star) |

---

### 2008

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | App Store get → library | `appstore/` | `itt08-appstore` | Chrome |
| F2 | Chrome 3-check (exists — trail it) | `chrome/` | `itt08-chrome` | G1 |
| F3 | Android Market browse | `android/` | `itt08-g1` | Hulu |
| F4 | Hulu queue add | `hulu/` | `itt08-hulu` | Dropbox |
| F5 | Dropbox empty-folder residual | `dropbox/` | `itt08-db` | GitHub (star) |

---

### 2009

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Foursquare check-in + shout | `foursquare/` | `itt09-foursquare` | FarmVille |
| F2 | FarmVille neighbor + 3s grow | `farmville/` | `itt09-farm` | Bing |
| F3 | Bing search catalog | `bing/` | `itt09-bing` | SO |
| F4 | SO accept-one (exists — trail it) | `stackoverflow/` | `itt09-so-accepted` | Win7 |
| F5 | Win7 / IE8 product hop | `windows7/` · `ie8/` | `itt09-w7` | Like (star) |

**Do not:** move the star to SO.

---

### 2010 — forest peak · link, don’t clone

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Instagram filter **required** → grid | `instagram/` | `itt10-ig` | iPad |
| F2 | iPad Safari / claim (exists — trail) | `ipad/` | `itt10-ipad-history` | Foursquare |
| F3 | Foursquare mayor residual | `foursquare/` | `itt10-4sq` | Open Graph |
| F4 | Open Graph Like on 2010 CNN | `facebook/` · `cnn/` | `itt10-og` | Wave funeral |
| F5 | Wave funeral literacy | `wave/` | `itt10-wave` | Imgur (star) |

**Do not:** prune 378 unless named. Do not steal Imgur star.

---

### 2011 — lean · whole pack ≤ +3 HTML

| # | New flow | Reuse / + | Key | Next |
|---|---------|-----------|-----|------|
| F1 | Uber SF pin → request (no pay) | **+3** `uber/{index,sf,ride}` | `itt11-uber` | Spotify |
| F2 | Spotify US invite + $4.99 / $9.99 | `spotify/` | `itt11-spotify` | Timeline |
| F3 | Timeline JSON (not `"1"`) | `facebook/timeline.html` | `itt11-fb-timeline` | Siri |
| F4 | Siri canned phrase | `iphone/` · `siri` | `itt11-siri` | Qwikster |
| F5 | Qwikster honesty 2-check | `netflix/qwikster.html` | `itt11-qwikster` | Airbnb (star) |

If Uber is skipped, do **not** add other new folders. Lean cap still holds.

---

### 2012 — lean · ≤ +3 HTML

| # | New flow | Reuse / + | Key | Next |
|---|---------|-----------|-----|------|
| F1 | Pinterest pin → board persist | `pinterest/` +1 | `itt12-pinterest` | IG Android |
| F2 | IG Android Apr 3 theater | `instagram/android.html` | `itt12-ig-and` | IPO |
| F3 | Facebook IPO literacy | `facebook/ipo.html` | `itt12-ipo` | Maps flop |
| F4 | iPhone 5 Maps flop 2-check | `iphone/maps.html` | `itt12-maps` | SOPA |
| F5 | SOPA blackout literacy | existing SOPA room if any · else chip on home | `itt12-sopa` | SoundCloud (star) |

**Also polish (not a 6th flow):** home lede still says “Photos go Android” — make it name SoundCloud.

---

### 2013 — lean · rooms exist

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Tinder swipe persist (e2e exists — trail it) | `tinder/` | `itt13-tinder` | Snap |
| F2 | Snap Story 24h expire | `snapchat/` | `itt13-snap-story` | IG Video |
| F3 | IG Video 15s | `instagram/video.html` | `itt13-igvid` | iOS 7 |
| F4 | iOS 7 / Touch ID literacy | `iphone/ios7.html` | `itt13-ios7` | Snowden |
| F5 | Snowden / PRISM literacy 2-check | `snowden/` | `itt13-snowden` | Vine (star) |

**Polish:** tour href → `vine/record.html` (star is record, tour is index).

---

### 2014 — lean A

| # | New flow | Reuse / + | Key | Next |
|---|---------|-----------|-----|------|
| F1 | Twitch chat send → reload | `twitch/` +2 | `itt14-twitch` | Slack |
| F2 | Slack #general (3 pages exist — trail) | `slack/` | `itt14-slack` | Heartbleed |
| F3 | Heartbleed rotate-password literacy | `heartbleed/` | `itt14-hb` | Ice Bucket |
| F4 | Ice Bucket share residual | `icebucket/` | `itt14-ice` | 1B / iPhone 6 |
| F5 | iPhone 6 + 1B sites literacy | `iphone/` · `billion/` | `itt14-1b` | WhatsApp (star) |

**Do not:** move star to Slack.

---

### 2015 — lean-ish 95 · polish then 5×

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Discord #general persist (exists) | `discord/` | `itt15-discord` | GWX |
| F2 | Win10 free / GWX reserve | `windows10/` | `itt15-win10` | Periscope |
| F3 | Periscope / Meerkat go-live | `periscope/` · `meerkat/` · `fblive/` | `itt15-live` | Music |
| F4 | Apple Music station | `applemusic/` | `itt15-music` | Photos |
| F5 | Google Photos unlimited + iOS 9 blockers | `googlephotos/` · `ios9/` | `itt15-photos` | Watch (star) |

**First:** map title + Chrome 2015 voice (H2).

---

### 2016 — remake in flight · 5× only after H0

Pushed tree = 57 HTML + wiki buttons. Worktree = 51 + STEM + Jio. **Finish H0 before adding more rooms.**

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | musical.ly sound → clip residual (not TikTok) | `musically/` | `itt16-musically` | Dyn |
| F2 | Dyn / Mirai Friday-down (no exploit) | `dyn/` | `itt16-dyn` | STEM |
| F3 | STEM LIGO chirp **or** AlphaGo Game 4 | `stem/` (worktree) | `itt16-stem` | Jio |
| F4 | Jio Welcome Offer through 31 Dec | `jio/` (worktree) | `itt16-jio` | Marketplace |
| F5 | Marketplace no-pay **or** Spectacles | `facebook/marketplace.html` · `snapchat/spectacles.html` | `itt16-mkt` / `itt16-spec` | Stories (star) |

**Do not:** Allo / LinkedIn / Switch back · 7th guided li · Chrome “Not secure” · Face ID · Reels · TikTok logo.

---

### 2017 — lean A · deepen, don’t rebuild Face ID

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Netflix My List persist | `netflix/` +2 max | `itt17-netflix` | Fortnite |
| F2 | Fortnite BR literacy (no official art) | `fortnite/` | `itt17-fn` | 280 |
| F3 | Twitter 280 compose | `twitter/280.html` | `itt17-280` | WannaCry |
| F4 | WannaCry literacy (no exploit) | `wannacry/` | `itt17-wc` | Vine gone |
| F5 | Vine actually gone 17 Jan | `vine/gone.html` | `itt17-vine-gone` | Face ID (star) |

---

### 2018 — lean A− · Accept All stays the trap

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | TikTok FYP reorder (exists — trail) | `tiktok/` | `itt18-tiktok-fyp` | Hearing |
| F2 | CA / Senate hearing literacy | `trust/` | `itt18-hearing` | IGTV |
| F3 | IGTV upload residual | `instagram/igtv.html` | `itt18-igtv` | Not Secure |
| F4 | Chrome 68 Not Secure | `chrome/not-secure.html` | `itt18-notsec` | Spectre |
| F5 | Spectre / HomePod literacy | `spectre/` · `homepod/` | `itt18-spectre` | GDPR (star) |

**Do not:** Accept All writes · Chromium Edge as 2018 default.

---

### 2019 — **prune first**, then 5× on the keep-set

Do **not** add flows into AltaVista/Pets/Amazon. After H1:

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | TikTok For You caption → FYP | `tiktok/` | `itt19-tiktok` | Arcade |
| F2 | Apple Arcade pick → trial residual | `arcade/` | `itt19-arcade` | TV+ |
| F3 | Apple TV+ continue row | `appletv/` | `itt19-tvplus` | Stadia |
| F4 | Stadia Founder’s literacy | `stadia/` | `itt19-stadia` | iPhone 11 |
| F5 | iPhone 11 + AirPods Pro · Marshmello chip | `iphone/iphone11.html` · `airpodspro/` · `fortnite/marshmello.html` | `itt19-iphone11` | Disney+ (star) |

Unify gold in the prune: Who’s Watching + Continue write `itt19-disneyplus`; `index.html` stays the **trial trap**.

---

### 2020 — lean · don’t reopen Zoom

| # | New flow | Reuse | Key | Next |
|---|---------|-------|-----|------|
| F1 | Quibi 6-min episode → gone | `quibi/` +2 | `itt20-quibi-ep` | Reels |
| F2 | IG Reels 15s | `instagram/reels.html` | `itt20-reels` | Flash EOL |
| F3 | Flash EOL 31 Dec | `flash/eol.html` | `itt20-flash` | CCPA |
| F4 | CCPA / privacy literacy | `ccpa/` | `itt20-ccpa` | ACNH |
| F5 | ACNH island residual · Meet residual chip | `acnh/` · `meet/` | `itt20-acnh` | Zoom (star) |

**Do not:** ATT (2021) · Meta · Jan 6 · Clubhouse **mass**.

---

## 6. Cross-year handoff links (5 extra, museum-wide)

These are **links**, not new years. Each is one href + e2e in `year-handoff-flows` style.

| From | To | Why |
|------|----|-----|
| 1995 SSL thanks | 1999 Amazon / 2000 smile | Cart survives the smile, not the year |
| 1998 Lucky | 2005 Maps / 1999 Google funded | Sparse search → funded → local |
| 2003 Photobucket | 2004 Flickr | Hotlink Web → folksonomy |
| 2007 iPhone Safari | 2008 App Store | Browser phone → platform phone |
| 2016 Stories | 2018 TikTok FYP / 2020 Reels | 24h copy → FYP → Reels split |

Handoff pages must say **which year owns the product**. Never write `itt16-*` from 2018.

---

## 7. Implement waves (ROI)

Do **not** start at 1995 or 2017.

| Wave | Years | What | Why this order |
|------|-------|------|----------------|
| **W0** | — | Hygiene H1–H4 | 2019 forest + docs + 2016 push honesty |
| **W1** | **2019** keep-set 5× | After prune, F1–F5 | Only BUILD year |
| **W2** | **2016** worktree | Commit remake · then F1–F5 | Last push leftover |
| **W3** | **2011 · 2012 · 2014** | Lean 5× (Uber / Pinterest / Twitch) | Highest nostalgia / missing COMPLEX |
| **W4** | **2002 · 2003 · 2004 · 2008 · 2009 · 2010** | Forest **link** 5× (reuse rooms) | Rooms exist; trails don’t |
| **W5** | **1994 · 1998 · 1999 · 2000 · 2001 · 2006 · 2007** | Deepen authored / crash / social | After W4 |
| **W6** | **1995–97 · 2005 · 2013 · 2015 · 2017 · 2018 · 2020** | Link-only 5× | Gold years — do not rebuild stars |
| **W-L4** | any | Pixels | Never required |

**Hub math:** W0+W1 move honesty (2019 75 → ~90 if prune holds). W3–W5 move *feel*, not the frozen 91 snapshot. Do not invent a new Full% until W1 is on disk.

---

## 8. Per-flow file touch list (copy)

```
docs/YYYY-5X-HARVEST.md                         # 25+ URLs first
docs/references/YYYY/CAPTURE-LOG.md             # one row per still
years/YYYY/sites/<product>/{index,job,about}.html
years/YYYY/pages/home.html                      # trail chip only
years/YYYY/pages/map.html                       # leaf
js/config/YYYY.js                               # urlMap · titleMap · locationHints
js/config/flow-maps.js                          # branch + do-string
js/config/immersion-YYYY.js                     # footerNav optional
js/immersion/<product>.js  OR  year-YYYY-extras.js
e2e/YYYY-<product>-live.spec.js                 # empty / complete / reload / isolation
```

**Tests after each year**

```bash
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1
npx playwright test e2e/YYYY-real-flows.spec.js e2e/YYYY-<product>-live.spec.js --workers=1
```

Star e2e must still be green. If a 5× flow breaks the star, revert the flow, not the star.

---

## 9. What 5× is *not*

| Not this | Why |
|----------|-----|
| 5× HTML | Restores the clone forest the museum spent August killing |
| 5 new stars | Breaks one-thing + e2e + passport |
| 5× `year-YYYY-extras.js` gods | New rooms = `registerLocal` files on lean years |
| 5× L4 logo hunts | Failed-final is already 100%-legal |
| “Implement leftover all” | Most leftover `[ ]` are already on disk |
| 5× from the **pushed** 2016 57-HTML tree while worktree is 51 | You would densify wiki rooms the bible cut |
| 5× inside 2019 before prune | You would 5× Pets.com |

---

## 10. Scoreboard after this program (honest)

| Already true | This map adds |
|--------------|---------------|
| 27 years playable · 27 stars · games wing | 27 × 5 = **135 new REAL loops** (many reuse folders) |
| 2016 Stories gold **pushed** | 2016 F1–F5 + commit STEM/Jio |
| 2011–14 / 17–18 / 20 lean | +3 HTML/year max · 5 trails each |
| 2019 playable **forest** | Prune, then 5 year-true trails |
| Frozen Full ~91 | Honesty first; do not reprint a new % until W1 |

---

## 11. Suggested first words back

1. `implement hygiene` — H1 prune 2019 · H2 2015 copy · H3 docs counts  
2. `research 5x 2011` — harvest pack only  
3. `implement 5x flows 2011` — Uber + four reuse loops  

If you want the next file after this one: a **single-year** `YYYY-5X-HARVEST.md` with the 25 URLs actually visited — say the year.
