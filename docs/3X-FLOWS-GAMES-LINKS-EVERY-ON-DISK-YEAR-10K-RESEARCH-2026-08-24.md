# 3× flows · games · links — every on-disk year (10k envelope)

**Date:** 2026-08-24  
**Status:** research freeze. **Do not implement from a stale “2014 wiped” notebook.**  
**Disk law:** hub **1994–2022** (29 years). **2005 / 2006 / 2007 match HEAD** (reverted this session).  
**Trust:** live `years/` + `scripts/itt_gate.py` `SHIP_YEARS` + this file.

**Asked:** 3× flows for every flow, plus games and links, for every year on disk. Visit ~10k websites / year of blogs and period data. Fully precise.

**Did:**

1. Counted every on-disk leftover trio, official 10, playable cabinet, and extra-c/d/e hole (2026-08-24).  
2. Opened [Internet Live Stats — total websites](https://www.internetlivestats.com/total-number-of-websites/) (June table **ends 2018** at **1,630,322,579**).  
3. Opened [Wikipedia — list of most-visited websites](https://en.wikipedia.org/wiki/List_of_most-visited_websites) (Google · YouTube · Facebook · Instagram class — **2026 ranks**, never dump into 2014–2021).  
4. Read hosting.com / Alexa-class year ranks (Yahoo → Google crossover ~2008–10; YouTube / Facebook mass after 2006).  
5. Re-read on-disk 3× engines: `popular-3x-sites.json` · `popular-3x3-sites.json` · `year-popular-3x.js` · `year-playable.js` · `year-extra-games.js`.  
6. Re-used year harvests already walked (READ-FIRST + 5k/10k maps). Did **not** open 10,000 unique live URLs × 29 years.

**10k websites maps to**

```
ask: 10k websites / year
  → research envelope (notable + mass + Wayback + ILS/Netcraft + blogs)
  → curate dests already on disk
  → NEVER 10,000 dest folders
```

Same rule as [`2020-5K-WEB-FLOW-MAP.md`](2020-5K-WEB-FLOW-MAP.md) and the 2021/2022 freezes.

**Legal:** Educational. `localStorage` only. Incomplete never writes. Never invent brand pixels. No adult rooms. Guided `<ol>` stays **6**. Stars stay locked. Lean years stay lean (~50 HTML). Git only if asked.

---

## 0. What “3× every flow” means here (lock)

Not “3× every href on home.” Not 30 new official-10 stops.

| Layer | What it is | On disk now |
|-------|------------|-------------|
| **L0 Star** | One gold verb | Locked `data-ott-one-thing` |
| **L1 Official 10** | Ten named dests + `whenKey` | `flow-trails.js` 1994–2022 |
| **L2 First 3×** | Popular leftover trio · `ittYY-pop-<id>` | `popular-3x-sites.json` all 29 years |
| **L3 Second 3×** | `data-itt-pop-more` | Present; **duplicates L4 on 2007 / 2009 / 2011** |
| **L4 Third 3×** | `data-itt-pop-3x3` · `ittYY-pop3-<id>` | `popular-3x3-sites.json` all 29 years |
| **L5 Fourth 3× (this freeze)** | **New unique leftover trio** · existing rooms only | **Not on disk** |
| **G0 Star game** | `sites/playable/game.html` | All 29 years |
| **G1 Extra A/B** | Minute extras | Missing on **2012** |
| **G2 Extra C/D/E** | Portal / viral / thesis toy | Missing on **2007 · 2009 · 2011 · 2013–2014 · 2019–2022** |
| **K 2× links** | Extra leftover writers on existing dests | Present (do not dump more hrefs) |

**Measurable done for this freeze (when named implement):**

1. L3 ≠ L4 on **2007 · 2009 · 2011** (unique slugs).  
2. Every year gets an **L5** trio of **existing** rooms, none of which are star / L2 / L3 / L4.  
3. Each L5 dest: pick + honesty **label** (ticks do not lock) + type ≥2 + go → `ittYY-pop4-<slug>`. Empty / trap never writes.  
4. Extra-c/d/e exist on the lean hole years in §4 (3 dests, not a 7th guided item).  
5. Guided 6 · stars · official 10 keys unchanged.  
6. Forest years: **0 new site folders**. Lean: **+0 site folders for L5** (reuse). Extra-c/d/e = +3 playable HTML only.  
7. `e2e/year-3x3.spec.js` still green. New `e2e/year-pop4.spec.js` when implement is named.

---

## 1. Scale (opened this pass · do not invent June 2019–2022)

Source: Internet Live Stats June table, opened 2026-08-24. **Table ends 2018.**

| Year | June websites | Users (ILS) | Birthmark / note |
|-----:|--------------:|-------------|------------------|
| 1994 | 2,738 | 25.5M | Yahoo · Gray Dec **10,022** is the other cite |
| 1995 | 23,500 | 44.8M | AltaVista · Amazon · AuctionWeb |
| 1996 | 257,601 | 77.4M | |
| 1997 | 1,117,255 | 120.8M | Yandex · Netflix DVD |
| 1998 | 2,410,067 | 188.0M | Google |
| 1999 | 3,177,453 | 280.9M | PayPal |
| 2000 | 17,087,182 | 413.4M | Baidu |
| 2001 | 29,254,370 | 500.6M | Wikipedia |
| 2002 | 38,760,373 | 662.7M | |
| 2003 | 40,912,332 | 778.6M | WordPress · LinkedIn |
| 2004 | 51,611,646 | 910.1M | Thefacebook · Flickr |
| 2005 | 64,780,617 | 1.03B | YouTube · Reddit |
| 2006 | 85,507,314 | 1.16B | Twttr |
| 2007 | 121,892,559 | 1.37B | Tumblr |
| 2008 | 172,338,726 | 1.57B | Dropbox |
| 2009 | 238,027,855 | 1.77B | |
| 2010 | 206,956,723 | 2.05B | Pinterest · Instagram · dual-cite Pingdom Dec 255M |
| 2011 | 346,004,403 | 2.28B | |
| 2012 | 697,089,489 | 2.52B | |
| 2013 | 672,985,183 | 2.76B | |
| 2014 | 968,882,453 | 2.93B | 1B hostnames **September** |
| 2015 | 863,105,652 | 3.19B | −11% |
| 2016 | 1,045,534,808 | — | +21% · 1B restabilized Mar |
| 2017 | 1,766,926,408 | — | +69% |
| 2018 | 1,630,322,579 | — | −8% · **last June cell** |
| 2019–22 | **no June cell** | ITU people-online only | Print Netcraft **January** |

Mass-visit ranks (hosting.com / Alexa-class, treat as **order of magnitude**, not dest count): Yahoo portal 1990s → Google overtakes ~2008–10 → YouTube / Facebook after 2006. **2026** Google / YouTube / Facebook / Instagram / ChatGPT ranks are **not** 2014 leftovers.

---

## 2. Disk honesty — what each year already has

Parser: `pages/home.html` `data-itt-pop3x` · `data-itt-pop-more` · `data-itt-pop-3x3` + JSON locks. Star from `data-ott-one-thing`.

| Year | Star | L2 first 3× | L3 pop-more | L4 third 3× | Hole |
|-----:|------|-------------|-------------|-------------|------|
| 1994 | CSotD | pizzahut · netmarket · imdb | prodigy · compuserve · pathfinder | lycos · infoseek · nasa | L5 only |
| 1995 | SSL | espn · cnet · salon | wsj · timewarner · hotbot | geocities · classmates · match | L5 |
| 1996 | portal wars | craigslist · askjeeves · mtv | totalny · pathfinder · hotbot | hotmail · excite · angelfire | L5 |
| 1997 | PointCast | nytimes · mp3com · zdnet | newscom · drudge · hotwired | slashdot · winamp · ebay | L5 |
| 1998 | Lucky | go · snap · about | opendiary · icqweb · broadcast | dmoz · cdnow · gamespot | L5 |
| 1999 | AIM | livejournal · neopets · egroups | onion · drkoop · sixdegrees | blogger · etrade · paypal | L5 |
| 2000 | MapQuest | half · baidu · everything2 | ivillage · women · napsterweb | expedia · paypal · ebay | L5 |
| 2001 | wiki edit | bittorrent · itunes · morpheus | moveon · grok · appleimac | google · cnet · bbc | L5 |
| 2002 | Stumble | meetup · fotolog · typepad | fark · homestar · blogspot | deviantart · daypop · encarta | L5 |
| 2003 | Photobucket | 4chan · hi5 · newgrounds | evite · tribe · secondlife | delicious · skype · adsense | L5 |
| 2004 | thefacebook | piczo · tagged · odeo | yelp · orkut · flickrpro | digg · gmail · delicious | L5 |
| 2005 | YouTube | dailymotion · vimeo · gaia | redditfront · earth · kayak | myspace · flickr · maps | L5 |
| 2006 | Twitter 140 | bebo · slideshare · newsvine | twitterbird · wikihow · diggv4 | facebook · youtube · wikipedia | L5 |
| **2007** | iPhone Safari | yahoo · wikipedia · amazon | **justin · ustream · qik** | **justin · ustream · qik** | **L3=L4** |
| 2008 | App Store / GitHub e2e | stackoverflow · posterous · grooveshark | spotifyeu · dropbox · hulu | friendconnect · evernote · lastfm | L5 |
| **2009** | Like | omegle · chatroulette · wikipedia | **mafiawars · whatsapp · ubercab** | **same three** | **L3=L4** |
| 2010 | IG iOS | netflix · tumblr · formspring | groupon · quora · ig ios | chrome · wave · android | L5 |
| **2011** | Google+ | icloud · pinterest · linkedin | **snapchat · tumblr · youtube** | **same three** | **L3=L4** |
| 2012 | IG Android | medium · path · flipboard | facebook · iphone · wikipedia | reddit · tinder · windows8 | L5 · no extra-a/b |
| 2013 | Vine | askfm · whisper · youtube | chrome · snowden · telegram | reddit · facebook · twitter | L5 · no c/d/e |
| 2014 | WhatsApp | snapchat · instagram · uber | heartbleed · icebucket · slack | youtube · wikipedia · facebook | L5 · no c/d/e |
| 2015 | Periscope | instagram · spotify · netflix | meerkat · applemusic · win10 | discord · echo · snapchat | L5 |
| 2016 | Stories | reddit · netflix · youtube | slack · fblive · moments | musically · vine · snapchat | L5 |
| 2017 | Face ID | reddit · youtube · amazon | snapipo · bitcoin · echoshow | fortnite · teams · switch | L5 |
| 2018 | GDPR | reddit · youtube · wikipedia | discord · applemusic · fortnite | tiktok · github · homepod | L5 |
| 2019 | Disney+ | youtube · instagram · wikipedia | appletv · airpods · iphone | tiktok · stadia · arcade | L5 · no c/d/e |
| 2020 | Zoom | youtube · wikipedia · facebook | meet · mixer · hbomax | acnh · astro · quibi | L5 · no c/d/e |
| 2021 | ATT | youtube · wikipedia · facebook | win11 · flash · chrome | clubhouse · nft · squid | L5 · no c/d/e |
| 2022 | ChatGPT | youtube · wikipedia · facebook | twitter · wordle · sd | tiktok · midjourney · lensa | L5 · no c/d/e |

**P0 disk bugs (fix before adding L5):** 2007, 2009, 2011 have **the same three dests** on pop-more and pop-3x3. That fails the old 3× uniqueness rule.

Late first-3× (2018–2022) is **YouTube · Wikipedia · Facebook** hostname habit. That is correct mass, not the chip. Do not replace it with ChatGPT / Instagram Stories / Reels.

---

## 3. L5 — fourth leftover 3× (existing rooms only)

Each row: three dests **already on disk**, not star, not L2–L4. Verb = pick + type ≥2 + go. Trap listed. Key `ittYY-pop4-<slug>`.

Forest years reuse continuity rooms. Lean years reuse leftover dests (no new folders).

| Year | A | B | C | Trap (never writes) | Why this year |
|-----:|---|---|---|---------------------|---------------|
| 1994 | `weblouvre` | `bbs` | `ncsa` | Live Louvre ticket | Art + night board + Mosaic lab |
| 1995 | `auctionweb` | `yahoo` | `altavista` | Real bid money | Bid · directory · DEC search |
| 1996 | `spacejam` | `yahoo` | `geocities` | Real Flash plugin | Jam hub · portal · homestead |
| 1997 | `icq` | `hotmail` | `pointcast` (not chip path) | Real ICQ network | Buddy · mail · push leftover |
| 1998 | `google` (empty box, not Lucky) | `hotmail` | `mozilla` | Real search index | Sparse search · mail · source |
| 1999 | `napster` | `aim` (not chip if already) | `y2k` | Real MP3 | Search theater · handle · clock |
| 2000 | `pets` | `amazon` | `cnn` | Real checkout | Sock · smile leftover · news |
| 2001 | `apple/ipod` | `broadband` | `msn` | Real iTunes Store | Click wheel · always-on · messenger |
| 2002 | `friendster` | `kazaa` | `wired` | Real KaZaA files | Profile · search theater · CSS |
| 2003 | `myspace` | `itunes` | `wordpress` | Real 99¢ buy | Profile · library · publish |
| 2004 | `flickr` | `firefox` | `thefacebook` networks leftover page | Real Gmail account | Tags · download · network |
| 2005 | `youtube` upload leftover not gold if collision | `reddit` | `digg` | Real video CDN | If YT is star, swap `maps` |
| 2006 | `facebook` feed | `digg` | `docs` | Real tweet send (that’s the star) | Feed · bury · spreadsheet |
| 2007 | **gmail** | **maps** | **twitter** | App Store (2008) | Open mail · Street View · SXSW |
| 2008 | **appstore** (if not felt as official n=1 on home) or `chrome` | `android` | `hulu` | Real Chrome download | Apps · G1 · free TV |
| 2009 | **farmville** | **bing** | **wolframalpha** | iPad / Instagram | Plot · search · compute |
| 2010 | `ipad` | `iphone` | `facebook` OG | IG Android (2012) | Tablet · FaceTime leftover · Like ×2 |
| 2011 | **spotify** | **iphone** (Siri) | **airbnb** | Vine / IG Android | US stream · phrase · leftover room |
| 2012 | `soundcloud` | `twitter` | `chrome` | Vine mass | Wave leftover · IPO year voice · habit |
| 2013 | **snapchat** | **instagram** | **healthcare** | IG Stories (2016) | Story 24h · 15s video · exchange |
| 2014 | **twitch** | **twitter** | **iphone** | Messenger (gold trap) | Amazon $970M · 140 · 6/6 Plus |
| 2015 | `meerkat` if not L3 else `windows10` | `applemusic` | `letsencrypt` if present else `chrome` | Stories / Reactions | Live pair · trial · HTTPS |
| 2016 | `pokemon` leftover if present else `facebook` | `whatsapp` E2E dest | `windows10` | TikTok US mass | Sidewalk literacy · lock · upgrade end |
| 2017 | `twitter` 280 dest | `vine` archive dest | `equifax` if present else `chrome` | GDPR / TikTok default | 280 · gone · breach literacy |
| 2018 | `tiktok` FYP (already leftover machine) | `igtv` | `chrome` Not secure | Accept All | FYP · long video · lock icon |
| 2019 | **fortnite** leftover | **edge`** | **chrome`** | Zoom / Reels | Chapter 2 leftover · Chromium Edge · habit |
| 2020 | **reels** | **openai** (GPT-3 waitlist) | **flash** | Join / ChatGPT / Play SWF | 15s · waitlist · EOL |
| 2021 | **signal** | **copilot** | **meta** | Allow / chat-as-Copilot / Meta app | Delay · waitlist · company rename |
| 2022 | **mastodon** | **bereal** | **dalle2** | Plus / GPT-4 / X | Exodus · 2-min · waitlist |

**2005 collision rule:** YouTube is the star. L5 must **not** be the upload gold. Use `reddit` · `digg` · `maps` if upload is the chip dest.

**2008:** Official 10 n=1 is App Store (`itt08-apps`). Home chip may still be painted GitHub for e2e. L5 uses Chrome · G1 · Hulu so the year objects are leftover sessions, not a second star.

---

## 4. Games — what to add (lean holes only)

Already on disk: every year has `game.html` + `famous.html`. Extra-c/d/e exist on 1994–2006, 2008, 2010, 2012, 2015–2018.

**Missing extra-c / extra-d / extra-e**

| Year | C portal / parlor | D viral mechanic | E year-thesis toy | Key prefix |
|-----:|-------------------|------------------|-------------------|------------|
| 2007 | Digg lobby hop | Street View peg walk (not Peg Walk gold if collision — use “two city blocks”) | Safari URL bar type | `itt07-game-` |
| 2009 | FarmVille neighbor plot | Bing vs Google leftover query | Like two partner stamps | `itt09-game-` |
| 2011 | Spotify US radio leftover | Siri phrase match | Circles leftover (not Hangout gold) | `itt11-game-` |
| 2013 | Vine loop extra (not 6s gold) | Snap 24h leftover | iOS 7 flatten leftover | `itt13-game-` |
| 2014 | Slack channel leftover | Ice Bucket nominate leftover | Tile Fold already gold — use Heartbleed rotate leftover | `itt14-game-` |
| 2019 | Continue-row extra (not gold) | Stadia leftover stream literacy | Arcade leftover card | `itt19-game-` |
| 2020 | Mute-all leftover (not Zoom gold) | Reels 15s leftover | Sus Vote already gold — use Flash uninstall leftover | `itt20-game-` |
| 2021 | Ask-drill already extra-a | Five Letter already gold — use Signal handle leftover | Copilot waitlist leftover | `itt21-game-` |
| 2022 | Send-drill already extra-a | Prompt Box already gold — use Wordle leftover guess | Mastodon instance leftover | `itt22-game-` |

**Do not:** add `game-6`. Do not add a third famous cabinet. No ripped SWF. No official art.

**2012:** extra-a/b missing. Do **not** silently fill them in this pack (old bible lock). Extra-c/d/e already exist.

---

## 5. Links (do not dump hrefs)

| Pack | Status | This freeze |
|------|--------|-------------|
| Official 10 | 10/10 dests all years | Keep. 2008 n=1 = App Store. |
| 2× leftover writers | On dests | Do not add a third 2× dump. |
| Home rails | 2021–22 collapsed in `<details>` | Keep hooks. Do not put L5 on the first screen. |
| Map | Official 10 + 3× | Add L5 as three `<li>` on `pages/map.html` only. |

**Visitor chain (every year, when implement):**

```
★ gold
  → L2 first leftover
    → L3 second leftover   (must ≠ L4)
      → L4 third leftover
        → L5 fourth leftover   (this freeze)
          → year game
            → ← Starting Point
```

Each hop writes its own `ittYY-*`. Empty / trap never writes.

---

## 6. Blogs / period voice (already on disk — steal, don’t clone)

| Year | Room | Steal |
|------|------|-------|
| 1997 | `sites/scripting/` | Daily residual. Incomplete never writes. |
| 1999 | `sites/blogger/` | Publish leftover. |
| 2002 | `sites/blogspot/` · typepad | Template leftover. |
| 2003 | `sites/wordpress/` | Publish leftover. |
| 2005–06 | `sites/techcrunch/` (2006) | Press names the stack. |
| 2004+ | delicious / digg / reddit | Folksonomy leftover, not the chip. |

Do not add a 10k-blog dest tree. One period voice sentence per leftover is enough.

---

## 7. NEVER

| Never | Why |
|-------|-----|
| 10,000 dest folders | Envelope, not rooms |
| Move any star | Locked |
| 7th guided `<li>` | Locked 6 |
| New site folders on lean years for L5 | Reuse dests |
| Restore 2005–2007 forests after the HEAD revert | 2005=315 · 2006=320 · 2007=29 |
| ChatGPT dest before 2022 | 30 Nov 2022 |
| Plus / GPT-4 / Bing Chat / Threads / X | 2023 |
| IG Stories as 2013 leftover | 2016 |
| TikTok as 2016 default | Musical.ly leftover only |
| Adult top-10 room | Compiled lists only |
| Invented brand pixels | Always |
| Real money / GPS / live model / ripped SWF | Theater |
| `google.com` dest after 2006 as habit rebuild | Banned |
| Overwrite `ittYY-pop-*` or `ittYY-pop3-*` | L2/L4 stay |

---

## 8. Implement order (only when named)

```
P0  Un-dupe L3 vs L4 on 2007 · 2009 · 2011
P1  L5 on lean doors first: 2022 → 2021 → 2020 → 2014 → 2007
     (existing rooms · pick + type + go · ticks are labels)
P2  L5 on remaining lean: 2009 · 2011 · 2013 · 2015–2019
P3  L5 on dense/forest: existing rooms only · continuity chip if clone
P4  extra-c/d/e on hole years in §4
P5  map.html three L5 links · e2e year-pop4
```

**Stop when** a visitor can do gold → four leftover websites → year game without a quiz lock, and 2007/2009/2011 trios are unique.

**Do not start with** another 5× pack, restoring a forest, or scaffolding 2023.

---

## 9. Sources opened this pass

| Source | Used for |
|--------|----------|
| https://www.internetlivestats.com/total-number-of-websites/ | June cells 1994–2018 |
| https://en.wikipedia.org/wiki/List_of_most-visited-websites | 2026 rank honesty (do not back-port) |
| hosting.com Alexa-class year tables | Yahoo / Google / YouTube / Facebook order |
| `scripts/popular-3x-sites.json` · `popular-3x3-sites.json` | L2 / L4 lock |
| Year READ-FIRST + 5k maps already in `docs/` | Lean bans |
| Live `years/1994`…`years/2022` | Room lists |

*End of freeze. Implement only when a year or P0–P5 is named.*
