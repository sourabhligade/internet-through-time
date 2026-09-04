# Museum-grade complete — new data · flows · links · websites (1994–2020)

**Date:** 2026-08-16  
**Status:** Research map. **Do not implement until a year is named.**  
**Question:** What *new* sources, flows, links, and websites does each year still need to reach **museum-grade A**?  
**Bar:** [`MUSEUM-GRADE-GAP-MAP-1994-2016.md`](MUSEUM-GRADE-GAP-MAP-1994-2016.md) · [`MUSEUM-READY-BAR-1994-2012.md`](MUSEUM-READY-BAR-1994-2012.md)  
**Disk:** 27 years playable · **347** unique room slugs · `flow-maps.js` **does not parse** (2019 leftover).  
**Legal:** Educational reconstruction. localStorage only. **Never invent brand pixels.** No real accounts, payments, ripped SWF, live tiles.

---

## 0. How to read this (do not mix the two 1,000s)

| Ask | What it means here | What it does **not** mean |
|-----|--------------------|---------------------------|
| **“1k websites per year”** | A **research kit** of ≥1,000 dated URLs used to *design* the year (WDM stills, Wayback `id_` captures, Wikipedia + refs, Cybercultural, Version Museum, Pingdom, ITU, evolt, GUIdebook) | Add 1,000 HTML rooms. That **fails** Gold A (“forest drowns thesis”). 2006–2010 already prove this. |
| **New websites (exhibit)** | 3–8 **year-true** rooms still missing, or deepen a thin room into a **gold machine** | Clone Amazon/Yahoo/Google into a lean year |
| **New flows** | Visitor verbs: incomplete never writes · reload persist · `data-next-flow` after REAL | Extra checkbox plaques |
| **New links** | In-room period links + trail chips that land on the **page that writes** the key | 404s · cross-year forest |

**Gold product** = ≥2 pages that do different jobs · incomplete never writes · reload restores · period costume · home chip + map leaf + urlMap + e2e.

**Already Gold A (do not reopen as unbuilt):** 1995 · 1996 · 1997 · 2005. Leftover = L4 pixels + the shared map parse.

**P0 before any new room:** delete the 2017 fragment in `js/config/flow-maps.js` (lines ~4096–4117). Until that lands, **no year map hydrates**.

---

## 1. Shared 1,000-URL kit (run once per year)

Copy this. Fill `YYYY`. Do **not** invent a June Live Stats cell if the table has no row.

| # | Stack | How many URLs | What you take |
|---|--------|---------------|---------------|
| 1 | [Web Design Museum year gallery](https://www.webdesignmuseum.org/gallery) · `…/gallery/year-YYYY` | **70 (1994) → 471 (1996)** and later year pages | Layout grammar. Counts on [all-websites](https://www.webdesignmuseum.org/all-websites): 1994(70) · 1995(133) · 1996(471). Open each card + “first versions” exhibition. |
| 2 | [WDM web-design-history](https://www.webdesignmuseum.org/web-design-history) year slice | 15–40 milestones | Exact launch dates |
| 3 | Wikipedia `Category:Internet properties established in YYYY` + `List of websites founded before 1995` (early years) | **50–200+** articles · each article **3–10 refs** | Founding facts. Example: [before 1995 list](https://en.wikipedia.org/wiki/List_of_websites_founded_before_1995) · [1994 category](https://en.wikipedia.org/wiki/Category:Internet_properties_established_in_1994) … through [1999](https://en.wikipedia.org/wiki/Category:Internet_properties_established_in_1999) (~200 pages) |
| 4 | Wayback CDX for that year’s **P0 brands** | 15 brands × 8 dated captures = **~120** | `web.archive.org/web/YYYYmmddid_/http://…` · log `[wa]` or `[failed-final]` |
| 5 | [Cybercultural year essays](https://cybercultural.com/year/) `internet-YYYY` + outbound | 20–60 | Thesis / mood. 1994–2012 live as of this pass. |
| 6 | [Version Museum](https://www.versionmuseum.com/) brand timelines (Amazon, Yahoo, Netscape, Windows) | 10–30 stills | Costume, not new rooms |
| 7 | [evolt browsers](https://browsers.evolt.org/) + [GUIdebook](https://guidebookgallery.org/) | 10–25 chrome crops | Shell honesty (2011–13 still show **XP Start** + `assets/period/2007/chrome/*`) |
| 8 | Live Stats / [Pingdom year-in-numbers](https://www.pingdom.com/blog/) / ITU Facts & Figures | 5–15 | Dual-cite scale. **No invented 2019/2020 June website digit.** |
| 9 | This repo’s existing harvests | **already well over 1,000** URLs across `docs/YYYY-*-RESEARCH*` / `*-WEB-HARVEST*` / `2020-SOURCES-100-PLUS` | Re-open only if About invents a number |
| 10 | Alexa / hosting.com “most visited YYYY” lists | 10 | Mass-object honesty (Yahoo vs Google vs Facebook vs YouTube) |

**How a year hits 1,000 without 1,000 rooms:**  
WDM year cards + Wikipedia category × refs + 15-brand Wayback grid already exceeds 1,000 for mid-1990s. Late lean years (2011–2020) pad with ITU/Pingdom/app-store press + failed-final CAPTURE attempts (HTML interstitials still count as visited).

**Log** in `docs/references/YYYY/CAPTURE-LOG.md` (create `references/2017/` — it is **missing**). Tag `OPEN` / `SNIP` / `BLOCK` per [`references/SOURCE-CATALOG.md`](references/SOURCE-CATALOG.md).

---

## 2. Cross-year flow work (do once, helps all 27)

These are **links and machines**, not new forests.

| ID | Flow | Years | Done when |
|----|------|-------|-----------|
| **X0** | Parse-fix `flow-maps.js` | all | `node --check js/config/flow-maps.js` · every `pages/map.html` paints `.itt-fmap` |
| **X1** | `data-next-flow` after REAL save → **this year’s gold**, not only home | 1994–2015 (2016–18 already have 28–33) | Chip visible after write |
| **X2** | Map F-loop `href` = the page that **writes** the advertised key | 1996 My · 1998 Babel Fish · 2001 iPod · 2003 Photobucket key · 2006 Feed · 2008 GitHub issue · 2010 Imgur vs IG · 2013 Snap story · 2014 Twitch · 2016 Marketplace · 2017 280 · 2018 FYP / Chrome 68 · 2020 CCPA | Trail `whenKey` matches extras key |
| **X3** | Shell honesty 2011–2013 | 2011–13 | Start banner **not** “Windows XP”; toolbar not `assets/period/2007/chrome/*`; body class matches title (Win7 · IE9) |
| **X4** | Year-voice strip | 2015 titled 2014 · 2016 Chrome `ch-2014` · 2019 titleMap “iPhone 5s” / “Win10 free upgrade” | Titles match year |
| **X5** | 5× markup or stop advertising F1–F5 | 2010 · 2011 · 2012 · 2019 | Either `[data-5x-loop]` on keep-set **or** delete 5× branch copy |
| **X6** | Guided `<ol>` stays **6** | 1999 is 7 · several 2004–09 have extra 7s | Home list = 6 |

---

## 3. Per-year map

For each year: **on disk · leftover vs Gold A · new flows · new websites · new links · source kit notes.**  
New websites are **exhibit rooms**. Source kit is **research URLs**.

### 1994 — 21 rooms · Overall 87% · A−

**On disk:** CSotD · Yahoo@Stanford · IUMA · FishCam · WH map · NCSA · CERN · HotWired · Lycos · NASA · WebCrawler · GNN · JumpStation · Galaxy.

**Leftover:** 5× “listen / wait timer / map click” is checkboxes, not the verb. No `period-1994.css`. L4 NN1.

**New flows (existing rooms):**
1. CSotD: today pick → archive → guestbook (already almost gold) · write only after wander + name.
2. FishCam: timer must elapse before `itt94-fishcam` (no skip).
3. WH: imagemap click writes `itt94-wh-map` (not 5× on index).
4. Yahoo: 3 distinct hubs → `itt94-yahoo-wander` (machine exists; 5× must not bypass).

**New websites (exhibit, not forest):**
| Room | Why | Flow | Sources |
|------|-----|------|---------|
| `sites/imdb/` | IMDb on the Web late 1993 / mass 1994 | Search title → title page | WDM · Wikipedia [before 1995](https://en.wikipedia.org/wiki/List_of_websites_founded_before_1995) · Cardiff-era WA |
| `sites/doctorfun/` | Early webcomic NCSA called a breakthrough | Strip → next | Wikipedia 1993 list |
| `sites/trojancam/` | First webcam | Still + “pot status” timer | Trojan Room coffee pot histories |
| `sites/arxiv/` | LANL preprint → web 1993 | Lookup id → abstract | arxiv.org history |

**New links:** CSotD → Yahoo hub → NCSA What’s New → IUMA. Home 5× F5 must carry `data-trail-keys="itt94-whatsnew"`.

**1k kit:** WDM 1994 (70) + before-1995 list (~80 named) × refs + 12-brand WA grid.

---

### 1995 — 19 rooms · 92% · **already A**

**Leftover:** L4 NN2. Optional residual pack.

**New websites only if deepening mass hole:**
| Room | Why | Flow |
|------|-----|------|
| `sites/craigslist/` | **Founded 1995** — not on disk until 2004 | City → category → post theater (no real ads) |
| `sites/salon/` | Salon.com Nov 1995 web magazine | Article → letters |

**New flows:** AuctionWeb 5× must live on `item-*.html` bid form, not list index. SSL stays the star.

**1k kit:** WDM 1995 (133) + [1995 category](https://en.wikipedia.org/wiki/Category:Internet_properties_established_in_1995).

---

### 1996 — 21 rooms · 91% · **already A**

**New flows:** F1 “moved widgets” → `sites/yahoo/my.html` + `sites/excite/my.html`, not directory home.

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/nytimes/` | nytimes.com 1996 mass news | Section → story |
| `sites/craigslist/` | if not built in 1995 | same as 1995, year-voice 1996 |

**1k kit:** WDM 1996 (**471** cards — this year *alone* is nearly half the 1k). Space Jam planets already exist.

---

### 1997 — 25 rooms · 90% · **already A**

**New flows:** eBay 5× on `item-laptop.html` bid, not index.

**New websites (optional):**
| Room | Why | Flow |
|------|-----|------|
| `sites/netflix-mail/` | Netflix **founded 1997** (DVD mail; Store is 2003) | Queue add · “no streaming” honesty |
| `sites/slashdot/` | already gold-adjacent | comment not empty already real |

**1k kit:** WDM 1997 + IE4 evolt + [1997 category](https://en.wikipedia.org/wiki/Category:Internet_properties_established_in_1997).

---

### 1998 — 38 rooms · 86% · A−

**New flows:** Babel Fish form on `altavista/babelfish.html` writes `itt98-babelfish`. Lucky costume = Google home (already mostly).

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/opendiary/` | Early public diary host | Entry → permalink |
| `sites/deja/` | Deja News → Usenet on the Web | Query → thread |

**New links:** Lucky → Yahoo packed → Amazon Music → eBay. Demote 3× BowieNet/YGM from gold spine (keep as 3×).

**1k kit:** WDM 1998 + Google first-versions + [1998 category](https://en.wikipedia.org/wiki/Category:Internet_properties_established_in_1998).

---

### 1999 — 41 rooms · 85% · A−

**New flows:** Napster home F1 must carry `itt99-napster`. AIM already gold.

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/livejournal/` | 1999 mass blog (now only a 2002 room) | Post → friends page |
| `sites/paypal/` | already on disk | send theater deepen |

**1k kit:** [1999 category ~200 pages](https://en.wikipedia.org/wiki/Category:Internet_properties_established_in_1999) × refs easily clears 1k.

---

### 2000 — 49 rooms · 82% · A−

**New flows:** Home must load `immersion-2000.js` (not config twice). Strip 1999 Y2K/Hampster/Zombo from 2000 3× gold.

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/tripadvisor/` | 2000 launch | City → review theater |
| `sites/half/` | already on disk | buy/sell deepen |

**Mass object:** Google + Yahoo still the visits leaders ([hosting.com 2006 table](https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/) shows the later shift). Crash spine stays Pets + smile.

---

### 2001 — 51 rooms · 81% · A−

**New flows:** F2 iPod → `sites/apple/ipod.html` + `itunes.html`, **not** Think Different `apple/index.html`. Drop Windows Live link from MSN (2013 product).

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/bittorrent/` | Protocol 2001 | “.torrent open” literacy · no payload |
| Wikipedia | already gold | Save already `itt01-wiki-pages` on `edit.html` |

---

### 2002 — 62 rooms · 93% · B+

**New flows:** Stumble must be a **named map leaf** (today Friendster is). Rotator: interest → 2 stumbles → keep.

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| Friendster | deepen profile + testimonial (already rooms) | not a new slug |
| `sites/lastfm/` | already | scrobble theater |

Do **not** add forest. Gold A here is Stumble as habit, not more 1999 leftovers.

---

### 2003 — 67 rooms · 93% · A−

**New flows:** Trail `whenKey` = `itt03-photobucket-album`. MySpace: Top 8 **picker** (not 5× “saved 8”).

**New websites:** none required. Optional `sites/4chan/` **literacy-only** (news, no board UI).

**New links:** Photobucket hotlink → MySpace profile reload shows `<img>`.

---

### 2004 — 84 rooms · 93% · A−

**New flows:** thefacebook: after join, **friends graph** page (poke/add persist). Gmail F2 “compose invite” → `invite.html` / `compose.html`.

**New websites:** none. Yelp / Orkut / Flickr / Gmail / Firefox already exist.

**Mass object:** MySpace still US #1 social; Facebook is campus. Do not pretend Feed (2006).

---

### 2005 — 86 rooms · 94% · **already A**

**Leftover:** L4 Maps tiles. Optional TechCrunch header WA.

**New flows only:** YouTube 5× on `upload.html` / `watch.html` like key, not index.

**Do not add rooms.**

---

### 2006 — 90 rooms · 91% · A− (forest)

**New flows:** News Feed 5× → `facebook/feed.html` (`data-fb-status-post`). Twitter stays the star.

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/justintv/` | Justin.tv 2007-adjacent; 2006 is YouTube buy + Twitter | optional 2007 |
| VK | Russian FB-class 2006 | **skip** unless a year-true residual chip |

**Do not prune forest unless asked.** Gold A = Twitter + Feed machines, not more clones.

**Sources:** [Cybercultural 2006](https://cybercultural.com/p/internet-2006/) · Wikipedia social timeline (Twitter launch · Facebook Feed).

---

### 2007 — 96 rooms · 92% · A−

**New flows:** Street View 5× → `maps/streetview.html`. iPhone stays star.

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/justintv/` | Justin.tv 2007 live | “broadcast / watch” literacy · no video CDN |
| Hulu | 2008 room exists | 2007 = announce chip only |

**Sources:** [Cybercultural 2007](https://cybercultural.com/p/internet-2007/) · Tumblr / iPhone / Street View already on disk.

---

### 2008 — 99 rooms · 90% · A−

**New flows:** One-thing chip → `sites/github/issue.html` (write), index is lobby. Mass object is **App Store**, not GitHub — keep GitHub as builder gold; put App Store as guided #1.

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/stackoverflow/` | SO **launched Sep 2008** (now only 2009) | ask → answers → accept |
| Groupon | already 2008 residual | city deal |

**Sources:** [Cybercultural 2008](https://cybercultural.com/p/internet-2008/) — App Store · 3G · Chrome · G1 · MySpace still huge.

---

### 2009 — 107 rooms · 92% · B+

**New flows:** Like stays star. FarmVille 5× neighbor must not replace plant/harvest. `feed.html` needs `data-itt-year="2009"`.

**New websites:** none required (Bing, 4sq, SO, Kickstarter, Wave already).

**Mass object:** Facebook Like + FarmVille, not SO. Map already says this.

**Sources:** [Cybercultural 2009](https://cybercultural.com/p/internet-2009/).

---

### 2010 — 116 rooms · 88% · A− (fattest forest)

**New flows:** **Pick one mass gold.** Disk star is Imgur; map F1 is Instagram. For Gold A: either move chip to `instagram/index.html` (filter → share) **or** change map F1 to Imgur. Do not keep both as “the” one-thing.

**New websites:** none. iPad / IG / Pinterest / Uber seed / Quora already.

**5×:** add `[data-5x-loop]` on keep-set **or** drop F1–F5 copy.

**Sources:** [Cybercultural 2010](https://cybercultural.com/p/internet-2010/).

---

### 2011 — 21 rooms · 65% · lean A−

**Leftover that blocks A:** XP Start + 2007 chrome GIFs. No extras. No 5×. READ-FIRST stale. Airbnb missing from flow-map (FLOWS-LINKS harvest already named this).

**New flows:** Map leaf for Airbnb (city → listing → request). Siri trail `href` = `iphone/siri.html`.

**New websites (lean cap ~55 HTML):**
| Room | Why | Flow |
|------|-----|------|
| Shell only | Win7 + IE9 chrome from evolt / WDM IE9 | not a site |
| `sites/rdio/` optional | pre-Spotify US competitor | plan literacy |

**Do not restore forest.** Gold A = Airbnb machine + honest Win7 shell + Airbnb on the map.

**Sources:** [Cybercultural 2011](https://cybercultural.com/p/internet-2011/) · WDM IE9 / iPhone 4S.

---

### 2012 — 22 rooms · 67% · lean A−

**New flows:** Map leaf for SoundCloud (`track.html` timed comment). Fix trail nextLabels (IPO vs IG buy; Win8 vs iPad mini).

**New websites:**
| Room | Why | Flow |
|------|-----|------|
| `sites/buzzfeed/` | 2012 listicle mass | quiz / list · share buttons theater |
| Waze | already | deepen |

**Shell:** same XP/2007 chrome fix as 2011.

**Sources:** [Cybercultural 2012](https://cybercultural.com/p/internet-2012/) · SOPA / FB IPO / IG Android already rooms.

---

### 2013 — 29 rooms · 75% · lean A−

**New flows:** Snap 24h → `snapchat/story.html` writes `itt13-snap-story`. iOS7 → `ios7.html` / `touchid.html`. Snowden save key = map key.

**New websites:** none required (Vine / Telegram / Tinder / Healthcare already).

**Shell:** Win7, not XP.

---

### 2014 — 29 rooms · 77% · claimed A, disk A−

**New flows:** Twitch “send then reload” → actually build chat **or** change `do` to go-live literacy. Heartbleed rotate stays `rotate.html`. Chip already WhatsApp.

**New websites:** none. Venmo optional literacy (`sites/venmo/`).

**Honesty:** grade says 43 HTML; disk **62**. Home `portal-2013` CSS → 2014. Chrome logo 2013 WA is failed-final (legal).

---

### 2015 — 31 rooms · 66% · A−

**New flows:** none until titles are 2015.

**New websites:** **do not add.** Strip / relabel:
- `whatsapp/*` titled 2014
- `oculus/index.html` 2014
- `secret/compose.html` 2014
- titleMap: Touch ID 5s · Snap Stories 2013 · iOS 8 / Pay

Watch stays star. Discord: load `bootDiscord15` or delete the claim.

---

### 2016 — 23 rooms · 66% · claimed A, disk A−

**New flows:** Marketplace F5 → `facebook/marketplace.html` (`itt16-marketplace`).

**New websites:** **do not add Allo / LinkedIn / Switch** (grade lists them; remake cut them).

**Honesty:** rewrite `sites/chrome/index.html` as 2016 habit (not `ch-2014` / “2014 browser war” / `primary-year="2008"`). Stories `primary-year` must be 2016 or 2010-residual labeled.

---

### 2017 — 29 rooms · 72% · claimed A, disk A−

**New flows:** F3 280 → `twitter/280.html` (`itt17-twitter280`). F1 Netflix → extras key `itt17-nf-mylist`. Face ID next-link → `iphone/x.html`.

**New websites:** none.

**New data required:** create `docs/references/2017/CAPTURE-LOG.md` + `assets/period/2017/README-PIXELS.txt`. Grade A without a reference kit is a paper A.

**Sources:** Face ID keynote pages · WannaCry CERT · Vine sunset · Fortnite BR press. No official Apple/Epic art.

---

### 2018 — 29 rooms · 77% · A−

**New flows:** F1 FYP → `tiktok/fyp.html`. F4 Not Secure → `chrome/not-secure.html`. GDPR stays star (Accept All never writes).

**New websites:** none (FOSTA / GitHub buy / Spotify direct already).

**Pixels:** only `README-PIXELS.txt` — failed-final is enough for A−; Gold A stays L4.

---

### 2019 — 25 rooms · **50%** · A− blocked

**New flows:** **X0 parse-fix is this year’s leftover.** Remove 2017 Fortnite / 280 / WannaCry / Face ID objects. Add 5× on keep-set **or** drop F1–F5 heading.

**New websites:** none. Disney+ Continue is gold.

**Honesty:** titleMap “iPhone 5s — 2019” · “Win10 free upgrade — 2019”. Docs 49 HTML vs disk 52.

**1k kit:** Disney+ press · Arcade · TV+ · Stadia · TikTok FYP · ITU 4.1B / 53.6% · **no** Live Stats June 2019 websites row.

---

### 2020 — 36 rooms · 68% · A−

**New flows:** CCPA key `itt20-ccpa-dns` everywhere (home 5× says `itt20-ccpa`). Shop page needs `[data-dns]` or drop “opt out here.” Quibi 5× key = extras key.

**New websites:** none. Zoom is gold. Do not add Jan 6 / ATT-as-default / ChatGPT.

**New data:** write `docs/2020-MUSEUM-GRADE.md`. Fix READ-FIRST title (“do not scaffold yet” is false). Game **is** on disk (`year-2020-among.js`).

**1k kit:** Netcraft Jan 2020 (~189M active) · ITU +10.2% · Zoom 10M→300M **participants** · Reels Aug 5 · Flash Dec 31 · CCPA. No invented ILS June 2020 cell.

---

## 4. New websites still missing (mass, not on disk)

Diffed against all `years/*/sites/*` slugs. Only **widely used** + year-true. AIM / MapQuest / Pandora / Photobucket / Imgur / Stumble / SoundCloud / GitHub / SO / Airbnb / Slack **are already on disk** (older missing-list is stale).

| Year | Add | Do not add |
|------|-----|------------|
| 1994 | IMDb · Doctor Fun · Trojan cam · arXiv | Extra Yahoo leaves |
| 1995 | **Craigslist** · Salon | Second Amazon |
| 1996 | NYTimes.com | Another portal skin |
| 1997 | Netflix-mail (optional) | Google (1998) |
| 1998 | Open Diary · Deja News | Smile Amazon |
| 1999 | LiveJournal (year-true) | 2001 products |
| 2000 | TripAdvisor | More 1999 memes |
| 2001 | BitTorrent literacy | iTunes Store (2003) |
| 2002 | — (deepen Stumble) | Steam-as-2002 mass |
| 2003 | — (Top 8 picker) | 4chan board UI |
| 2004–05 | — | Anything |
| 2006–10 | Justin.tv (07) · SO in **2008** | Forest rooms |
| 2011–13 | BuzzFeed (12) · shell chrome | Clone forest restore |
| 2014–16 | Venmo optional · **title/chrome fixes** | Allo / Meta / Reels |
| 2017–20 | **reference kits + parse fix** | 2021+ |

---

## 5. New link-flows (the UX layer)

Pattern already ships 2016–2018 (`showNext()` in `year-extras-kit.js`). Port backward.

| After this REAL write | Next chip | Year |
|----------------------|-----------|------|
| `itt94-csotd` | Yahoo Computers hub | 1994 |
| `itt95-ssl-checkout` | AuctionWeb item | 1995 |
| `itt96-portal-wars` | HoTMaiL login | 1996 |
| `itt97-pointcast` | ICQ sign-on | 1997 |
| `itt98-lucky` | Amazon Music | 1998 |
| `itt99-aim` | Napster | 1999 |
| `itt00-mapquest` | Amazon smile | 2000 |
| `itt01-msn` | Wikipedia edit | 2001 |
| `itt02-stumble` | Friendster profile | 2002 |
| `itt03-photobucket-album` | MySpace | 2003 |
| `itt04-thefacebook-networks` | Gmail invite | 2004 |
| `itt05-pandora` | YouTube upload | 2005 |
| `itt06-tweets` | Facebook Feed | 2006 |
| `itt07-iphone` | Street View | 2007 |
| `itt08-github` / `itt08-appstore` | Chrome 3-check | 2008 |
| `itt09-fb-likes` | FarmVille plant | 2009 |
| `itt10-imgur` **or** `itt10-ig-posts` | the other one | 2010 |
| `itt11-airbnb` | Timeline | 2011 |
| `itt12-soundcloud` | IG Android | 2012 |
| `itt13-vine-posts` | Snap story | 2013 |
| `itt14-wa-msgs` | Heartbleed rotate | 2014 |
| `itt15-watch` | Win10 free | 2015 |
| `itt16-ig-stories` | PoGO | 2016 |
| `itt17-faceid` | 280 compose | 2017 |
| `itt18-gdpr` | TikTok FYP | 2018 |
| `itt19-disneyplus` | TikTok / Arcade | 2019 |
| `itt20-zoom` | Reels 15s | 2020 |

---

## 6. Execute order (museum-grade A, not a 27-year rewrite)

Do **one year** when named. Default:

| # | Year | Why |
|---|------|-----|
| **0** | **all** | X0 parse-fix `flow-maps.js` (unlocks maps) |
| **1** | **2019** | Fragment is the bomb · titleMap · 5× |
| **2** | **2011** | Airbnb onto map · Win7 shell |
| **3** | **2012** | SoundCloud onto map · same shell |
| **4** | **2015** | Strip 2014 titles |
| **5** | **2016** | Chrome 2014 clone · Marketplace href |
| **6** | **2010** | Imgur vs IG one gold |
| **7** | **1995 Craigslist** | Biggest mass hole in early Web |
| **8** | **2002 Stumble leaf** | B+ → A |
| **9** | **2008** | Chip → issue.html · SO 2008 room |
| **10** | **2017** | Reference kit + key splits |

**Do not** grow 2006–2010 HTML. **Do not** restore lean-year forests. **Do not** invent 2019/2020 Live Stats June website counts.

---

## 7. Honesty about “1,000 websites each year”

Visited this pass (live): WDM all-websites + year counts · Wikipedia before-1995 list (full) · Wikipedia year categories 1994–1999 · Cybercultural year index + 2008 essay · social-media timeline · hosting.com most-visited tables · this repo’s room inventory (347 slugs) · COMPLEX / WIDELY-USED / FLOWS-LINKS harvests.

**Not claimed:** 27 × 1,000 unique HTTP GETs in one sitting. The **kit in §1** is how an implementer actually reaches 1,000 dated URLs per year without lying and without a 1,000-room forest.

**Companion (older, still useful):** [`FLOWS-LINKS-UX-DEEP-RESEARCH-WEB-HARVEST-2026-08-15.md`](FLOWS-LINKS-UX-DEEP-RESEARCH-WEB-HARVEST-2026-08-15.md) — hole is **handoff**, not missing pages. This file adds the **museum-grade A** room/flow/source layer on top.

---

*Educational reconstruction only.*
