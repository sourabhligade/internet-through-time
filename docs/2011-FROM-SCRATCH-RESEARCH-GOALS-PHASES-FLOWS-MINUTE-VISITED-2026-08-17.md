# 2011 — From-scratch research: goals · phases · flows · minute detail of every visited site

**Date:** 2026-08-17  
**Status:** Research mapped in the same pack shape as 2010. Lean year **is on disk** (`years/2011/`, prefix `itt11`). This file is the long implementer dump so you can **read and verify** every goal, phase, flow, and opened source. Do not restore a forest. Git only if asked.  
**This file is the long implementer dump.** Short locks live in [`2011-READ-FIRST.md`](2011-READ-FIRST.md) and [`2011-RESEARCH.md`](2011-RESEARCH.md).

| Companion | Role |
|-----------|------|
| [`2011-READ-FIRST.md`](2011-READ-FIRST.md) | Entry · do / do not |
| [`2011-RESEARCH.md`](2011-RESEARCH.md) | Short locked dossier |
| [`2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-17.md`](2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-17.md) | Harvest kits · ~22 rooms |
| [`2011-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2011-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Phase checklist |
| [`2011-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2011-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Flows A–T short |
| **This file** | Goals + steps + flows + **every visited URL, extracted** |
| [`2011-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2011-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md) | One implementer bible |
| [`references/2011/notes/VISIT-LOG-2026-08-17.txt`](references/2011/notes/VISIT-LOG-2026-08-17.txt) | URL list |
| Parent live year | `years/2010/` · `itt10` |

**Honesty:** “Visited” below means a page this pass **opened and read**. Search-snippet pages are in Part 5 and are **not** treated as pixel sources. Wikipedia category harvest (1,388 pages + 4,500 citation URLs) is a **corpus**, not 1,388 room visits. The stacked unique URL file is **10,320**. That is **not** 10,320 live GETs and **not** 10,320 rooms.

**Legal:** Educational reconstruction. `itt11-*` only. Incomplete REAL writes nothing. Never invent brand pixels. No real streams, OAuth, payments, live camera.

---

# Part 1 — Goals

## 1.1 One-line goal

Build a **museum-grade 2011 Web immersion from scratch**: **Windows 7 + IE 9** shell, ~22 lean rooms (not a forest restore), and REAL multi-step localStorage flows that recreate how people used the internet in calendar **2011** — especially **Google+ field-trial Circles / Hangouts**, **Spotify United States (invite Free / $4.99 / $9.99)**, **iPad 2 cameras**, **Facebook Timeline**, and **iPhone 4S / Siri beta** — while the mass session is still a **laptop**.

## 1.2 Visitor outcome (done = they can do this)

```
Hub → 2011
  → Win7 desktop + IE 9 (January was still IE8 — honesty chip · Chrome is a product room)
  → About:
        June Live Stats 346,004,403 sites (+67%) · 2,282,955,130 users
        Dec Pingdom/Netcraft 555 million sites · +300 million in 2011
        Pingdom users ~2.1B · Facebook 800M · Twitter 250M tweets/day (Oct) · #egypt
        thesis: Circles + legal US streaming + a voice in the phone
        bans: IG Android · Vine · iPhone 5 · Win8 · Stories · UberX · “G+ won”
  → ★ Google+: field trial invite · Circles · Hangout (up to 10) → itt11-gplus-*
  → Spotify US 14 Jul: invite Free · Unlimited $4.99 · Premium $9.99
        no Facebook at US launch · 15M songs · no real stream → itt11-spotify-invited
        22 Sep: invite wall drops (do not make July look open)
  → iPad 2: announce 2 Mar · ships 11 Mar · cameras · Smart Cover · $499/$599/$699 → itt11-ipad2
  → iPhone 4S: announce 4 Oct · ships 14 Oct · Siri beta EN/FR/DE · Jobs dies 5 Oct → itt11-siri
  → Timeline: f8 22 Sep · memoir / cover · not Graph Search → itt11-timeline
  → Airbnb leftover: city → listing → host note → itt11-airbnb
  → Instagram still iOS (Android 3 Apr 2012)
  → Qwikster: 18 Sep announce · 10 Oct reverse → itt11-qwikster
  → Snapchat seed (Picaboo → Snapchat) · snaps not Stories
  → Letter Swap · Exit · all state itt11-*
```

## 1.3 Locked thesis (copy must match)

**2011 is the year Google tries to rebuild Facebook as Circles, Spotify finally becomes legal in the United States, and the phone grows a voice.**

| Theme | Period truth | Source we opened |
|-------|--------------|------------------|
| Circles, not “friend” | G+ field trial **28 Jun**. Vic Gundotra: today’s services wrap everyone in “friend” paper. Circles · Sparks · Hangouts · Instant Upload · Messenger. Invite only. | Official Google Blog 28 Jun |
| Hangouts | Walk onto the porch. Multi-person live video. Casual, not a scheduled call. Up to **10**. | Google Blog · TC 2018 recap |
| G+ growth is signups | **10M** in two weeks · **25M** in a month · **40M** Oct (Larry Page) · **90M** EOY. Not DAU. Never “G+ won.” | TC 2018 recap citing Wired / SEL / Page |
| Spotify US | **14 Jul**. Free invite · Unlimited **$4.99** · Premium **$9.99**. **15 million** songs. **No Facebook** at launch. 10M EU / 1.6M paying. 8th territory. | TechCrunch 14 Jul (full company release) |
| Invite wall drops | **22 Sep** at f8. First six months unlimited for unpaid. Users need Facebook to bypass invite. | TechCrunch 22 Sep |
| iPad 2 | Announce **2 Mar** · US sale **11 Mar**. Front VGA + rear **720p**. FaceTime. Smart Cover **$39 / $69**. Still **$499 / $599 / $699**. | Apple Newsroom 02 Mar |
| iPhone 4S / Siri | Announce **4 Oct** · ships **14 Oct**. Dual-core A5. 8MP. 1080p. Siri **beta**: EN-US/UK/AU + FR + DE. **$199 / $299 / $399**. | Apple Newsroom 04 Oct |
| Jobs | Dies **5 Oct**. Last product he saw announced. Honesty line, not a shrine. | Period calendar (Board statement secondary) |
| Timeline | f8 **22 Sep**. “The story of your life.” Cover photo. Open Graph verbs: listen / read / watch. Not Graph Search. | Guardian f8 liveblog |
| Qwikster | **18 Sep** DVD split + games by mail. Sites not integrated. **10 Oct** reverse (~3 weeks). | TechCrunch 18 Sep · CNET lost-year class |
| Scale | June **346,004,403** sites · **2,282,955,130** users. Dec **555 million** sites · +300M. FB **800M**. Twitter **250M tweets/day**. **#egypt**. | Live Stats · Pingdom 17 Jan 2012 |
| Desktop still mass | Shell is **Win7 + IE 9** (IE9 ships **14 Mar**). January was still IE8. | Microsoft IE9 class · About honesty |

## 1.4 Hard bans (never 2011 default)

Instagram Android (Apr **2012**) · Stories / Reels / video · Vine (**2013**) · iPhone 5 · Windows 8 · Graph Search (**2013**) · Snapchat Stories · UberX national · G+ as if it replaced Facebook · Spotify US as a 2008/2009 default · Spotify + Facebook as **July** default (that is **22 Sep**) · Siri on iPhone 4 · iPad 2 as “no camera” (that was 2010) · Chrome or IE8 as the year-shell default.

## 1.5 Engineering rules

1. Prefix **`itt11`**.  
2. Incomplete REAL writes nothing.  
3. Clone **shape** from `years/2010/`, retarget Win7+IE9. **Do not restore** a deleted forest.  
4. ~22 rooms + chips. Wikipedia 1,388 names are a **checklist**, not rooms.  
5. Never invent brand pixels. Wayback `id_` or RECON.  
6. Git only if asked.

---

# Part 2 — Phases (minute steps)

`[x]` done this research / lean-door pass. `[ ]` leftover densify from opened sources. `[~]` optional forever.

### Phase 0 — Freeze · `[x]`

1. Confirm lean `years/2011/` exists (cloned from 2010 door). Do **not** grow it into a forest.  
2. Lock star = Google+ Circles / Hangouts (not Spotify, not Siri, not Timeline).  
3. Lock dual scale.  
4. Write this pack. Verify facts against V1–V16 below.

### Phase 1 — Year door · `[x]` lean · leftover `[ ]` · ROI 10

1. `years/2011/index.html` shell cloned from 2010, retarget **Win7 + IE 9**.  
2. Year attr `data-itt-year="2011"`.  
3. `js/config/2011.js` · `js/browser-2011.js` · `js/immersion-2011.js`. Prefix helper `itt11`.  
4. `css/period-2011.css` (`@import` 2010 Aero, IE9 product chrome).  
5. Hub: mark 2011 `available`.  
6. Pages: `home.html` `about.html` `map.html` `whats-new.html`.  
7. About body **must** print both site counts with source names.  
8. About **must** list bans in a table.  
9. About **must** print Pingdom social: FB 800M · Twitter 250M/day · **#egypt** · Tumblr 39M · WhatsApp 1B/day.  
10. Smoke: hub → 2011 → `#content` iframe shows home.

### Phase 2 — Google+ star · `[x]` lean · leftover `[ ]` · ROI 10

Minute UI (from Gundotra 28 Jun + Guardian 29 Jun + TC 2018 recap):

1. `sites/googleplus/index.html` — field-trial voice, **not** “sign up for the winner.”  
2. Four pillars on the page, Gundotra’s names: **Circles · Sparks · Hangouts · Instant Upload**. Messenger name lands **20 Sep** (blog update).  
3. Circles: make a named circle (college / parents / boss). Friendship is not one bucket.  
4. Quote OK: “today’s online services turn friendship into fast food—wrapping everyone in ‘friend’ paper.”  
5. Hangouts leaf: two literacy checks (`data-req`) then start. Up to **10** people. Casual porch, not a scheduled call. No live camera. No “(mock)” in visitor copy.  
6. Write `itt11-gplus-circles` after a named circle. Write `itt11-gplus-hangout` after two checks + start.  
7. Honesty: invite only until **20 Sep** · growth is **signups** · Buzz/Orkut are dead paths · **not** “G+ won.”  
8. Next-flow: Spotify US.  
9. e2e: no checks → key absent. Two checks + start → key present.

### Phase 3 — Spotify US · `[x]` lean · leftover `[ ]` · ROI 9

From TC 14 Jul (full company release) + TC 22 Sep:

1. `sites/spotify/index.html` — **desktop client** theater (iTunes-class), not a 2026 web player.  
2. Date honesty: **14 Jul 2011**. EU was **2008**. US is the 8th territory.  
3. Three SKUs on the page:  
   - **Free** — invite, ads, computer  
   - **Unlimited $4.99** — ad-free computer  
   - **Premium $9.99** — mobile + offline  
4. Catalog: **15 million** songs · **250 million** playlists · **10 million** Europeans · **1.6 million** paying.  
5. **No Facebook at US launch** (TC 14 Jul). Facebook music is **22 Sep** (f8), same day invites open.  
6. Partners named in the release: Coke/Sprite, Chevrolet, Motorola, Reebok, Sonos, The Daily.  
7. Two honesty boxes + invite → `itt11-spotify-invited`. No stream.  
8. Next-flow: Timeline (same week as the 22 Sep invite drop).  
9. e2e: no honesty → no write.

### Phase 4 — iPad 2 · `[x]` lean · leftover `[ ]` · ROI 9

From Apple 2 Mar:

1. `sites/ipad/index.html` announce (Jobs: 15 million iPads sold · “moves the bar far ahead”).  
2. **33% thinner · up to 15% lighter**. Same 9.7" LED. Dual-core **A5**. Still **10 hours**. Black or white.  
3. Cameras: front **VGA** FaceTime + Photo Booth · rear **720p HD**. This is the difference from 2010.  
4. Smart Cover: magnetic hinge · wake/sleep · folds into a stand · polyurethane **$39** · leather **$69** · (PRODUCT) RED exists.  
5. Wi-Fi **$499 / $599 / $699**. Wi-Fi+3G **$629 / $729 / $829**. AT&T and Verizon 3G models.  
6. US sale **11 Mar**. International wave **25 Mar**. iMovie + GarageBand **$4.99** each. App Store **350,000** / **65,000** native iPad.  
7. Order: capacity **and** radio **and** camera literacy. One missing → no write. `itt11-ipad2`.

### Phase 5 — iPhone 4S / Siri / iCloud · `[x]` lean · leftover `[ ]` · ROI 9

From Apple 4 Oct:

1. `sites/iphone/index.html` — 4S vs leftover 4 **$99** vs 3GS **free** on contract.  
2. Announce **4 Oct** · preorder **7 Oct** · iOS 5 **12 Oct** · ships **14 Oct**.  
3. Dual-core A5 · up to 2× CPU / 7× graphics vs iPhone 4 · 8 hours 3G talk.  
4. Camera: **8MP** · f/2.4 · 60% more pixels · lock-screen camera · volume-up shutter · **1080p** + stabilization.  
5. **Siri beta**: English (US, UK, Australia), French, German. Canned museum phrases only. No speech API. Not on iPhone 4.  
6. Prices: **$199 / $299 / $399** (16/32/64). First 4S on **AT&T + Sprint + Verizon**.  
7. iOS 5: Notification Center · **iMessage** · 200+ features. iCloud: iTunes in the Cloud · Photo Stream · Documents in the Cloud.  
8. Jobs dies **5 Oct** — one honesty line, not a shrine.  
9. Write `itt11-siri` after a 2011-class phrase (weather / remind Mom / traffic). Empty ask never writes.

### Phase 6 — Timeline · `[x]` lean · leftover `[ ]` · ROI 9

From Guardian f8 liveblog 22 Sep:

1. `sites/facebook/timeline.html` — profile is a **memoir**, not the 2010 wall.  
2. Zuck: “Timeline is the story of your life” · three pieces: all your stories, all your apps, a new way to express who you are.  
3. **Cover** — a big photo at the top. Visitor picks / acks a cover.  
4. Open Graph verbs: you don’t have to Like a book, you can **read** / **watch** / **listen**. Activity goes to the **ticker**, not the feed, so friends are not flooded.  
5. Same day: Spotify on stage with Ek · music in the ticker.  
6. Half a billion people used Facebook in a single day the week before (Zuck claim — label it).  
7. Two literacy checks → `itt11-timeline`. Graph Search is **2013** — ban.

### Phase 7 — Peaks, leftovers, funerals · `[x]` lean · leftover `[ ]` · ROI 7

1. Airbnb: city → listing → host note. `itt11-airbnb`. Gold leftover.  
2. Instagram still **iOS**. Filter → share. Android is **3 Apr 2012**. `itt11-ig-posts`. Do not steal G+’s star.  
3. Twitter: 140 or lurk. **#egypt** was Pingdom’s #1 hashtag. `itt11-tweets`.  
4. Groupon IPO **4 Nov**. Honesty + one deal. `itt11-groupon`.  
5. Tumblr: **39 million** blogs EOY. Reblog leftover. `itt11-tumblr`.  
6. Snapchat seed (Picaboo → Snapchat, Sep). Snaps disappear. **Not Stories**. `itt11-snap`.  
7. Qwikster: 18 Sep announce · sites not integrated · games by mail · 10 Oct reverse. Funeral, not a store. `itt11-qwikster`.  
8. YouTube residual. Pingdom: **1 trillion** playbacks · **48 hours**/minute uploaded (up from 2010’s 35h).

### Phase 8 — Continuity chips · `[x]` lean · leftover `[ ]` · ROI 6

Chrome product · IE9 product · Android Ice Cream Sandwich **18 Oct** · Google · Yahoo · Netflix streaming (May ~30% peak NA traffic — Cybercultural) · Twitch rebrand **6 Jun** · Kindle Fire **15 Nov $199** · WhatsApp 1B/day chip on About · iCloud chip on 4S.

### Phase 9 — Home / map / 5× / 10-flow trail · `[x]` lean · leftover `[ ]` · ROI 8

1. Guided 6-step start. Star = Google+. Do not add a 7th.  
2. Map leaves point at **writers**, not indexes.  
3. `data-next-flow` after every REAL.  
4. 10-flow trail on the gold room.  
5. 5× leftovers: Twitter · Groupon · Tumblr · About wiki · Airbnb.

### Phase 10 — Playable leftover · `[x]` · ROI 5

Letter Swap (`itt11-game-letterswap`) — Words-with-Friends-class rack. Museum original. Famous pair: memory + pong. Not the star.

### Phase 11 — Pixels · `[~]` · ROI 4

Wayback `id_` queue in harvest §10. Failed-final = RECON + note.

### Phase 12 — Tests · `[x]` lean · leftover `[ ]` · ROI 9

`e2e/2011-*.spec.js`: hub · shell · G+ incomplete/complete · Spotify · Siri · Airbnb · Timeline · Qwikster · about bans · no `itt10` writes from 2011 pages.

### Phase 13 — Docs stamp · `[x]` this pack

DISK-TRUTH + this file. `[x]` research mapped. Leftover densify stays `[ ]` until copy matches V1–V16.

### Phase 14–15 — Optional forever · `[~]`

Dual IE8 January skin · Flipboard leftover · LinkedIn IPO 19 May chip · Occupy 17 Sep culture leftover · News of the World 10 Jul culture leftover · Minecraft 1.0 18 Nov game-class leftover.

---

# Part 3 — Flows A–T (period session → museum machine)

Each flow: **what a 2011 person actually did** · **minute museum steps** · **write key** · **incomplete**.

| ID | Period session | Museum steps | Key | Incomplete |
|----|----------------|--------------|-----|------------|
| A | Double-click IE 9 on Win7 | Hub → 2011 → home | — | — |
| B | Skim “what is this year” | About · 2 literacy checks | `itt11-thesis-ack` | 0–1 checks |
| C | ★ Get a G+ invite, make Circles, hang out | Field-trial ack · named circle · 2 hangout checks · start | `itt11-gplus-hangout` / `circles` | no checks |
| D | Beg a Spotify US invite, pick a plan | Three SKUs visible · 2 honesty · invite | `itt11-spotify-invited` | no honesty |
| E | Unbox iPad 2 (it has cameras now) | Capacity + radio + camera literacy | `itt11-ipad2` | one missing |
| F | Ask Siri for the weather | 2011-class phrase | `itt11-siri` | empty ask |
| G | Rebuild your Facebook as a memoir | Cover + 2 Timeline checks | `itt11-timeline` | 0–1 checks |
| H | Message an Airbnb host | City → listing → note | `itt11-airbnb` | empty city |
| I | Filter a dinner photo (still iOS) | Photo → named filter → Share | `itt11-ig-posts` | no filter |
| J | Tweet #egypt or lurk | Follow **or** 140 chars | `itt11-tweets` | empty tweet |
| K | Today’s Groupon (IPO year) | Honesty + one deal | `itt11-groupon` | no honesty |
| L | Reblog on Tumblr | Reblog leftover | `itt11-tumblr` | skip |
| M | YouTube after dinner | Play + 48h/min honesty | residual | — |
| N | Send a disappearing snap | Snap literacy, not Stories | `itt11-snap` | no literacy |
| O | Watch Netflix split, then reverse | 18 Sep / 10 Oct ack | `itt11-qwikster` | skip |
| P | Try IE9 or Chrome as a product | Product rooms, not shell | — | — |
| Q | Android ICS phone | ICS honesty · IG still iOS | — | — |
| R | Google / Yahoo chips | Continuity | — | — |
| S | 5× leftovers | Twitter · Groupon · Tumblr · About · Airbnb | popular keys | empty |
| T | Letter Swap leftover | Playable rack | `itt11-game-letterswap` | no Start |

**Trail:** C → D (Spotify) → G (Timeline) → F (Siri) → E (iPad 2) → H (Airbnb). Do not add a 7th guided home step.

---

# Part 4 — Every visited website (minute extract)

Opened this pass. Copy only what is below. Do not invent extra Apple or Spotify digits.

---

## V1 — Cybercultural · What the Internet Was Like in 2011

- **URL:** https://cybercultural.com/p/internet-2011/  
- **Opened:** 2026-08-17 · author Richard MacManus · dated **10 Jan 2025**  
- **What it is:** Year-essay spine (same series as 2010 harvest). RWW-era synthesis, not a 2011 primary screenshot.

**Minute extract**

- Dek: 2011 sees power plays in social networking, mobile apps, cloud, and streaming. Facebook is challenged by Google+, while Netflix and Spotify expand.  
- Lead: Facebook launched **Timeline** and began an **algorithmic feed**. These changes were partly influenced by Google+.  
- Google+: announced end of June. Early excitement that it could challenge Twitter and Facebook. MacManus polled G+ users in July 2011 (RWW archive) — many said Twitter/Facebook use had decreased. **False dawn.** Tight integration with Search/Gmail meant people **inadvertently joined** when they signed up for a Google account (cites Ars 2012 brute-force signup). A year later he wrote: as a standalone social network G+ still struggles; “I wouldn’t go so far as to call it a ghost town, but… isn’t where the action is. The action is on Facebook, Twitter, … and YouTube, Google search, Blogger.”  
- Facebook Timeline: October 2011 class in this essay (f8 announce is **22 Sep** — prefer V12 for the date). Profile designed to show **highlights from a person’s entire life**, not just recent posts. Goal: make Facebook more attractive to the mainstream.  
- Algorithmic feed: marketed as “your own personal newspaper” (Mashable archive cite). You no longer see everyone you follow. “Back then, nobody thought the algorithmic feed was a big deal.” Web 2.0 was supposed to give users the power to write and to control via RSS; the implication only became clear later: Facebook controls the feed.  
- Siri: on iPhone 4S in October. “In hindsight… the first widely deployed consumer AI application.” Not ChatGPT-level.  
- Android: by **January 2011** the most-used mobile OS in the US (CNN/Comscore cite) — overtook RIM and Apple. iPhone 4S later helped iOS catch up across the decade.  
- Snapchat: launched September. “Weird new app.” Disappearing messages. Essay also mentions AR filters — **do not** put 2015-class lenses on a 2011 room. 2011 object is the disappearing snap.  
- Cloud: AWS closing in on **$1 billion** a year (RWW Oct 2011 archive). Dropbox / Google Drive grew. MacManus 2011 wrapup: used Dropbox to sync files across devices — “relatively new computing activity in 2011.” Microsoft launched **Office 365** (subscription vs boxed software).  
- Streaming: Netflix shifting from DVD to streaming + international. One study (TC 17 May 2011): Netflix largest source of Internet streaming traffic in North America, **nearly 30%** at peak hours. Spotify US July; by September had **doubled paying subscribers to 2 million**.

**Museum use:** About thesis voice · G+ “false dawn” honesty · Timeline as memoir · Siri as first mass voice · Snapchat seed not Stories · Netflix 30% traffic chip · Spotify US is new, not 2008.  
**Do not:** treat a 2025 essay as a 2011 pixel. Do not make G+ the winner. Do not put AR lenses on 2011 Snapchat.

---

## V2 — Pingdom · Internet 2011 in numbers

- **URL:** https://www.pingdom.com/blog/internet-2011-in-numbers/  
- **Opened:** 2026-08-17 · dated **17 Jan 2012**  
- **What it is:** Year-recap stat dump (same class as Pingdom 2010 used in the 2010 bible).

**Minute extract (copy these labels)**

| Bucket | Number | Note |
|--------|-------:|------|
| Email accounts | **3.146 billion** | Radicati |
| Outlook share | **27.6%** | most popular client |
| Corporate spam that still arrived | **19%** | despite filters |
| Corporate emails / day | **112** sent+received | |
| Spam share (Nov) | **71%** | down from 2010’s 89.1% |
| Hotmail users | **360 million** | largest email service |
| Email marketing ROI | **$44.25** per $1 | estimate |
| Malicious email (Nov) | **0.39%** | |
| Websites Dec | **555 million** | Netcraft 9 Dec 2011 |
| Sites added in 2011 | **300 million** | |
| .COM / .NET / .ORG | 95.5M / 13.8M / 9.3M | EOY |
| .INFO / .BIZ | 7.6M / 2.1M | |
| Registered domains Q3 | **220 million** | Verisign |
| ccTLDs Q3 | **86.9 million** | |
| TLDs | **324** | |
| social.com sale | **$2.6 million** | most expensive 2011 |
| Users | **2.1 billion** | Internet World Stats |
| Asia / Europe / NA | 922.2M / 476.2M / 271.1M | |
| LatAm / Africa / ME / Oceania | 215.9M / 118.6M / 68.6M / 21.3M | |
| Under 25 | **45%** | ITU |
| China users / penetration | **485 million** · **36.3%** | most of any country |
| Fixed broadband | **591 million** | |
| Facebook EOY | **800+ million** · **+200 million** | |
| Facebook mobile login | **350 million** | |
| Twitter accounts / active | **225 million** / **100 million** | |
| @ladygaga | **18.1 million** | most-followed class (was 7.7M in 2010) |
| Tweets / day (Oct) | **250 million** | |
| #1 hashtag | **#egypt** | |
| MTV VMA peak | **8,868** tweets/sec (Aug) | |
| Tumblr blogs EOY | **39 million** | |
| WordPress blogs | **70 million** | |
| WhatsApp | **1 billion messages in one day** (Oct) | |
| IM / social accounts | 2.6B / 2.4B | Radicati |
| Mobile broadband | **1.2 billion** active | |
| Mobile subscriptions | **5.9 billion** | |
| Handsets with a browser | **85%** | Gartner |
| iPad share of tablet web | **88%** (Dec) | Pingdom’s own |
| YouTube playbacks 2011 | **1 trillion** · **140** per person on Earth | |
| YouTube upload | **48 hours / minute** | was 35h in 2010 |
| Most viewed 2011 | Rebecca Black “Friday” | |
| US online video audience | **82.5%** | |
| YouTube US video-site share | **76.4%** (Dec) | |
| Videos viewed / month (Oct) | **201.4 billion** | 88.3B on Google sites · 43% share |
| Instagram accounts created 2011 | **14 million** | |
| Instagram photos / sec | **60** | |
| Facebook photos mid-2011 | **100 billion** estimated | |
| Flickr users / daily uploads | 51M / 4.5M | |
| Flickr hosted (Aug) | **6 billion** | was 5B Sep 2010 |
| Most popular Flickr camera | **iPhone 4** | |

**Museum use:** About dual-cite Dec **555 million** + users **2.1B**. FB 800M. Twitter 250M/day. **#egypt**. Tumblr 39M. WhatsApp 1B/day. YouTube 48h/min. Do **not** blend with Live Stats June.  
**Do not:** invent browser % — that Pingdom subsection was empty on the page we opened.

---

## V3 — Internet Live Stats · Total number of websites

- **URL:** https://www.internetlivestats.com/total-number-of-websites/  
- **Opened:** 2026-08-17  
- **What it is:** NetCraft + Live Stats June-class table. Same source the 2010 bible locks.

**Minute extract (June rows we need)**

| Year (June) | Websites | Change | Users | Users/site | “Launched” mark |
|------------:|---------:|-------:|------:|-----------:|-----------------|
| 2010 | 206,956,723 | −13% | 2,045,865,660 | 9.9 | Pinterest, Instagram |
| **2011** | **346,004,403** | **+67%** | **2,282,955,130** | **6.6** | *(none marked on this table)* |
| 2012 | 697,089,489 | +101% | 2,518,453,530 | 3.6 | |

Definition: unique hostname. Source line: NetCraft + Live Stats (Gray / Hobbes / Pingdom). ~75% of *modern* sites inactive — do not apply that % to 2011 copy. Periodic drops can be wildcard-hostname cleanup (example given is 2012, not 2011).

**Museum use:** About June **346,004,403** · users **2,282,955,130** (~2.28B).  
**Do not:** one unlabeled blend of 346,004,403 and 555 million.

---

## V4 — Official Google Blog · Introducing the Google+ project

- **URL:** https://googleblog.blogspot.com/2011/06/introducing-google-project-real-life.html  
- **Opened:** 2026-08-17 · **Vic Gundotra**, Senior Vice President, Engineering · field-trial post (28 Jun 2011 class)  
- **What it is:** The primary G+ launch text. This is the star-room voice.

**Minute extract**

- Need to connect is “among the most basic of human needs.” Online tools lose “the subtlety and substance of real-world interactions.” “Online sharing is awkward. Even broken. And we aim to fix it.”  
- Project name: **Google+**. Goal: bring “nuance and richness of real-life sharing to software.”

**+Circles**

- “Not all relationships are created equal.” College buddies / parents / boss.  
- Today’s services “turn friendship into fast food—wrapping everyone in ‘friend’ paper.” Three failures: **sloppy** (hear from everyone all the time) · **scary** (every conversation with 100 “friends” is a public performance / stage fright) · **insensitive** (we define friend/family differently).  
- People already share with real-life circles. “Just make a circle, add your people, and share what’s new.”

**+Sparks**

- Interest feed to start a conversation. “Healthy obsessions.” Muscle cars / comic books / fashion.  
- “Highly contagious content from across the Internet. On any topic you want, in **over 40 languages**.” Add interests → always something to watch, read, share with the right circle.

**+Hangouts**

- Metaphor: pub or **front porch**. “Hey, I’ve got some time, so feel free to stop by.” Unspoken understanding.  
- IM and video-calling fail: they’re **annoying** (interrupt plans) and **awkward** (no-response = gone or not interested?).  
- Hangouts = casual meetup + live multi-person video. “Stop by when you’re free… Face-to-face-to-face.”

**+Mobile**

- Location optional on every post.  
- **Instant Upload:** with permission, photos go to a **private album in the cloud** while you snap. Ready to share later.  
- **Messenger:** group messaging so everyone in the circle knows what’s going on “right this second.”  
- Available that day on **Android Market** and mobile web; “coming soon to the App Store.”

**+You / field trial**

- “We’re beginning in **Field Trial**, so you may find some rough edges, and the project is **by invitation only**.”  
- “When your invite arrives we hope you’ll join the project. But it’s entirely up to +You.”  
- **Update Sept 20:** “Made changes to reflect the new name for group messaging (**Messenger**).”

**Museum use:** Star copy. Four pillars. Invite-only until the 20 Sep update. Hangouts = porch, not a calendar invite. Instant Upload is permission + private. Do not call Messenger by that name on a June screen (the 20 Sep blog update is the rename).  
**Do not:** invent a user-count on this post — Gundotra does not print 10M here.

---

## V5 — The Guardian · Google+ launched to take on Facebook

- **URL:** https://www.theguardian.com/technology/2011/jun/29/google-plus-facebook-social-networking  
- **Opened:** 2026-08-17 · **29 Jun 2011**

**Minute extract**

- Google unveils Google+ to make online sharing “more like real life.” More than a year in the works.  
- Circles: only university friends, workmates, or families — not necessarily all at once.  
- Sparks: fishing or recipes; video calls it “nerding out.”  
- Hangout and **Huddle** (early name for group chat — becomes Messenger 20 Sep) could challenge Skype (Microsoft had just bought Skype for **$8.5bn**). Om Malik: G+ should give Blekko, Skype, and group-messaging companies pause; not sure it hurts Facebook.  
- Lou Kerner (Wedbush): Facebook has already won the global social network; he does not see this as a direct competitor.  
- Limited access at first. Reaction to **Google Buzz Feb 2010**, which auto-connected 75 million Gmail users and leaked contacts. This time Google is being more careful. No global-rollout date given.  
- Gundotra quote: “We think people communicate in very rich ways. The online tools we have to choose from give us very rigid services.” Twitter/Facebook: if you tweet or like, everyone who follows or is a friend sees it.  
- Repeats the blog line: “online sharing is awkward. Even broken.”

**Museum use:** Selective sharing vs Facebook “friend.” Buzz as the failed prior path. Huddle = early Messenger name (do not put “Huddle” on a late-2011 screen). Skype is the video rival, not Zoom.  
**Do not:** treat Kerner’s “Facebook already won” as a reason to drop the star — the 2011 *feeling* is the invite FOMO, not the 2018 autopsy.

---

## V6 — TechCrunch · Looking back at Google+ (2011 slice only)

- **URL:** https://techcrunch.com/2018/10/08/looking-back-at-google/  
- **Opened:** 2026-08-17 · Sarah Perez · **8 Oct 2018**  
- **What it is:** Shutdown recap. Use **2011 facts only**. Later years are bans.

**Minute extract (stop at 2011)**

- Prior Google social: **Orkut** 2004 · **Friend Connect** 2008 · **Buzz** 2010. G+ is the significant attempt. Line at the time: “we believe online sharing is broken.”  
- Led by **Vic Gundotra** and **Bradley Horowitz**. Circles UI: drag-and-drop profile icons — “even fun.” Better than Facebook’s contact organization then.  
- Sparks = interest content without Facebook-style Like pages.  
- Hangouts: video with **up to 10** people in a Circle. “Almost magical.” Auto-focus on the person talking. Share content in the chat.  
- Growth: **10 million** in two weeks (Wired) · **25 million** just over a month (Search Engine Land) · **40 million** by October (Larry Page / TC 13 Oct 2011) · **90 million** year-end. “Even if Google was only tracking sign-up numbers.”  
- Zuck’s first public comment: any competitor must build a social graph. Facebook then **750 million**. Signups ≠ active.  
- July backlashes: **real-names** policy · account deletions · brands banned then admitted as a mistake. Schmidt later (Aug) “find another network if you don’t want your real name” — do not put that as June launch copy.  
- August: G+ posts in signed-in search. “Search plus Your World” branding is **2012** — ban as 2011 default.  
- **2012+** forced Gmail signup, Communities, YouTube comments takeover = **not 2011 rooms**.

**Museum use:** 10 / 25 / 40 / 90 as **signup** placard, labeled. Hangouts 10. Gundotra + Horowitz. Real-names fight is July, not launch-day copy.  
**Do not:** print 2018 “90% of sessions under five seconds” on a 2011 About.

---

## V7 — TechCrunch · Spotify reveals the detail behind its US launch

- **URL:** https://techcrunch.com/2011/07/14/spotify-reveals-the-detail-behind-its-us-launch/  
- **Opened:** 2026-08-17 · Mike Butcher · **1:27 PM PDT · 14 Jul 2011**  
- **What it is:** Day-of US launch. Quotes the **full company release**. This is the Spotify-room voice.

**Minute extract**

- Butcher lead: 10 million users in two years. Launches in the US today.  
- Three packages: invite-only free, ad-supported · **$4.99**/month ad-free · **$9.99** premium that also syncs with mobile.  
- “Unlike the European service it will **not be integrated with Facebook initially**.”  
- Threatened to launch in the US since 2009. Competes with Rhapsody, MOG, Rdio.  
- “Very nice **desktop client**, not unlike iTunes,” plus more information about the music.

**Company release (copy these SKUs and counts)**

- “Hello America. Spotify here.” Available from today in the US.  
- Founded Sweden **2008**, Daniel Ek + Martin Lorentzon, “better, more convenient and legal alternative to music piracy.” Second-largest source of digital music revenue for labels in Europe (IFPI, April 2011).  
- **More than 10 million** registered users · **more than 1.6 million** paying · **7 countries** in Europe · US is the **8th territory**. “Well over **15%** paying subscribers to active free users.”  
- On-demand, **no buffering**, library of **more than 15 million songs**. Import MP3s you already own. **Over 250 million** playlists. Share via Facebook, Twitter, email, SMS — *share rails*, not the Facebook *login wall* of 22 Sep.  
- Cellphone / iPod Touch · wireless sync · Premium combines your music + 15M catalogue.

Three services during **invite-only beta**:

| Plan | Price | What you get |
|------|------:|--------------|
| **Free** | invite | On-demand, buffer-free, 15M songs, computer, social features, manage your files, sync with phone/iPod. **Occasional advertising.** |
| **Unlimited** | **$4.99**/mo | Same, **ad-free on the computer**. |
| **Premium** | **$9.99**/mo | Online or offline · computer · cellphone · other devices · enhanced sound · exclusive content. “A few fancy coffees.” |

- Ek quote: music is “the most social thing there is.”  
- US launch partners: **Coca-Cola and Sprite, Chevrolet, Motorola, Reebok, Sonos and The Daily**.  
- Ken Parks (Chief Content Officer / MD North America): full catalogues from all majors + independents including Merlin.

**Museum use:** Three SKUs on the page. 15M songs. 10M / 1.6M / 8th country. **No Facebook at July launch.** Desktop client, not a web player. No real stream.  
**Do not:** make July look like open signup. Do not put the 22 Sep Facebook wall on the 14 Jul screen.

---

## V8 — TechCrunch · Spotify no longer invite-only in the US

- **URL:** https://techcrunch.com/2011/09/22/spotify-is-no-longer-invite-only-in-the-us-and-users-get-their-first-six-months-of-service-free/  
- **Opened:** 2026-08-17 · Alexia Tsotsis · **2:19 PM PDT · 22 Sep 2011** · sitting at **Facebook f8** with Daniel Ek

**Minute extract**

- No longer invite-only in the US. Unpaid users get **first six months** with no limitations — clock starts (and is retroactive) after signup. Six months leeway **international and US**.  
- Rolling out slowly; “might take a little time for invites to drop completely” (Andres Sehr, community manager).  
- “**Users will need Facebook to bypass the invite system.**”  
- Angela Watts: “For music to be inherently social it needs to be an open model, and that’s why we decided to do it today.”  
- After six months, music encountered on Facebook counts toward the monthly Spotify limit (must go through the Spotify app to listen).  
- Tiers restated: free up to **ten hours** free monthly · **$4.99** unlimited drops ads · **$9.99** premium unlimited mobile + offline. “Paid users will continue to enjoy the service they have.”

**Museum use:** 22 Sep honesty chip on the Spotify room and on Timeline (same day). July ≠ September. Facebook becomes the door **this day**, not in July. Ten-hour free cap is a **Sep** restatement — do not put it on the 14 Jul three-SKU card as if it were launch copy.  
**Do not:** collapse 14 Jul and 22 Sep into one screen.

---

## V9 — Apple Newsroom · Apple Launches iPad 2

- **URL:** https://www.apple.com/newsroom/2011/03/02Apple-Launches-iPad-2/  
- **Opened:** 2026-08-17 · **PRESS RELEASE March 2, 2011** · San Francisco

**Minute extract**

- Jobs: “With more than **15 million** iPads sold, iPad has defined an entirely new category.” Competitors scrambling to copy gen-1; iPad 2 “moves the bar far ahead… likely cause them to go back to the drawing boards yet again.”  
- **33 percent thinner** · **up to 15 percent lighter**. Same **9.7-inch** LED-backlit LCD. Dual-core **A5**. Still **up to 10 hours**. Black or white. AT&T and Verizon 3G models.  
- Two cameras: front-facing **VGA** for **FaceTime** and **Photo Booth** · rear-facing **720p HD**. FaceTime on iPad for the first time. Photo Booth: eight effects (Squeeze, Twirl, Kaleidoscope…).  
- **Smart Cover:** self-aligning magnetic hinge · auto wake/sleep · microfiber lining · folds into a typing/video stand. Polyurethane **$39** · leather **$69**. Colors include (PRODUCT) RED.  
- iOS **4.3**: faster Safari · iTunes Home Sharing · AirPlay enhancements · side switch = rotation lock **or** mute · Personal Hotspot from iPhone 4. Built-in **gyro**. HSUPA on AT&T 3G. HDMI Video Mirroring via optional adaptor.  
- New apps: **iMovie** and **GarageBand** for iPad, **$4.99 each**, on sale **11 Mar**.  
- App Store: runs almost all of **over 350,000** apps · **more than 65,000** native iPad apps · 20 categories. iTunes: **over 14 million** songs · **50,000+** TV · **10,000+** films · **3,500+** HD.

**Pricing table (US, from this PR)**

| | 16GB | 32GB | 64GB |
|--|-----:|-----:|-----:|
| Wi-Fi | **$499** | **$599** | **$699** |
| Wi-Fi+3G (AT&T or Verizon) | **$629** | **$729** | **$829** |

Wi-Fi available **March 11**. International wave **March 25** (long country list). Verizon 3G US only.

**Museum use:** `sites/ipad/` announce + order. **Cameras exist** (ban the 2010 “no camera” line). Smart Cover prices. Same $499 class as gen-1 Wi-Fi.  
**Quote OK:** Jobs “15 million… moves the bar far ahead.”

---

## V10 — Apple Newsroom · Apple Launches iPhone 4S, iOS 5 & iCloud

- **URL:** https://www.apple.com/newsroom/2011/10/04Apple-Launches-iPhone-4S-iOS-5-iCloud/  
- **Opened:** 2026-08-17 · **PRESS RELEASE October 4, 2011** · Cupertino  
- **Voice on stage:** Philip Schiller (not Jobs).

**Minute extract**

- “Most amazing iPhone yet.” Dual-core **A5** · all-new camera · full **1080p** · **Siri**. Same day: **iOS 5** (200+ features) and **iCloud**.  
- Schiller: “iPhone 4S plus iOS 5 plus iCloud is a breakthrough combination.”  
- iOS 5: **Notification Center** · **iMessage** (text/photos/video between iOS 5 users). Free update for iPhone 4 and 3GS.  
- **Siri:** “just by asking.” Understands context. Examples in the PR (use these as museum phrases):  
  - “Will I need an umbrella this weekend?” → weather  
  - “Remind me to call Mom when I get home” → finds Mom in the address book  
  - “What’s the traffic like around here?” → uses current location  
  - Also: calls, texts, email, meetings, reminders, notes, search, local businesses, directions, facts, calculations.  
- iCloud: iTunes in the Cloud · **Photo Stream** · Documents in the Cloud. Changes on one device push to the others. Works with iPhone, iPad, iPod touch, Mac, PC.  
- Camera: **8 megapixel** · **60 percent more pixels** · custom lens · **f/2.4** · hybrid IR filter · A5 image signal processor. Camera app launches faster · shot-to-shot **twice as fast**. Lock-screen camera · **volume-up** shutter · optional grid · tap locks focus/exposure. Photos app: crop / rotate / enhance / red-eye / albums. Twitter integration + iMessage share. Photo Stream pushes a shot to iPad / iPod touch / Mac / PC / Apple TV.  
- Video: **1080p** · stabilization · better low light.  
- Same glass + stainless design, redesigned inside. A5: **up to twice** processing · **up to seven times** faster graphics vs iPhone 4. Battery **up to 8 hours** 3G talk. Dual-antenna intelligent switch. HSDPA **up to 14.4 Mbps**. World phone: CDMA and GSM customers can roam on GSM.

**Pricing & availability (this PR)**

| Model | Price (2-year) |
|-------|---------------:|
| 4S 16GB | **$199** |
| 4S 32GB | **$299** |
| 4S 64GB | **$399** |
| iPhone 4 leftover | **$99** |
| iPhone 3GS leftover | **free** on contract |

- Colors: black or white.  
- Carriers: **AT&T, Sprint, Verizon Wireless** (first 4S on all three).  
- Ships **Friday, October 14** in US, Australia, Canada, France, Germany, Japan, UK. Pre-order **Friday, October 7**.  
- **Siri beta** on 4S: English localized for **US, UK and Australia**, plus **French** and **German**.  
- iOS 5 software **October 12** via iTunes 10.5.  
- 22 more countries by end of October (AT, BE, CZ, DK, EE, FI, HU, IE, IT, LV, LI, LT, LU, MX, NL, NO, SG, SK, SI, ES, SE, CH).

**Museum use:** `sites/iphone/` 4S vs $99 4 vs free 3GS. Siri phrases from this PR. Language list. $199/$299/$399. 4 Oct vs 14 Oct. iCloud same-day chip.  
**Do not:** put Siri on iPhone 4. Do not invent Jobs on this stage (Schiller is the quoted exec).

---

## V11 — TechCrunch · Netflix splits DVD and streaming · Qwikster

- **URL:** https://techcrunch.com/2011/09/18/netflix-qwikster/  
- **Opened:** 2026-08-17 · Erick Schonfeld · **9:14 PM PDT · 18 Sep 2011**

**Minute extract**

- Reed Hastings “dropped a bombshell” (blog: `blog.netflix.com/2011/09/explanation-and-some-reflections.html`).  
- DVD-by-mail will be called **Qwikster** (`qwikster.com`). Streaming keeps the **Netflix** name. “The new business (streaming) will keep the existing name.”  
- Customers can still subscribe to both, but **the two sites will not be integrated anymore**.  
- Qwikster will also offer **video game rentals through the mail**.  
- Hastings’ fear for five years: failing to leap from DVDs to streaming. AOL dialup / Borders analogies. “Companies rarely die from moving too fast, and they frequently die from moving too slowly.”  
- Blog opens with “I messed up.” He is **not** saying the price hike was a mistake — only that he should have explained it better.  
- New Qwikster CEO: **Andy Rendich**. Video on the post.

**Museum use:** Funeral room. Literacy: announced, split, not integrated, games by mail. Pair with the **10 Oct reverse** (CNET lost-year class, Part 5). Empty click writes nothing.  
**Do not:** run Qwikster as a store the visitor keeps using. Do not skip the reverse.

---

## V12 — The Guardian · Facebook f8 liveblog (Timeline)

- **URL:** https://www.theguardian.com/technology/appsblog/2011/sep/22/facebook-f8-mark-zuckerberg-social-live  
- **Opened:** 2026-08-17 · Thursday **22 Sep 2011** liveblog

**Minute extract**

- f8 keynote. Music/media focus leaked (Spotify, Deezer, Rdio, MOG, maybe Vevo). News-feed redesign already out this week.  
- Andy Samberg opens spoofing Zuck. Then the real Zuckerberg.  
- Last five years = getting everybody signed up. Last week: first day **half a billion people used Facebook in a single day** (Zuck claim — label it). Next five years = apps and depth of engagement.  
- Profile has been at the centre of every major change. 2004 screenshot → 2008 news-feed profile, which he criticises: “We’re more than just what we did recently.” Millions have curated life stories with “no good way to share it.”  
- New profile is called **Timeline**. “Timeline is the story of your life, and it has three pieces… All your stories, all your apps, and a new way to express who you are.” Visual, tile-based. Mix of photos, maps, music (Spotify album thumbs visible in the demo). Works on mobile.  
- Shows everything recent; cherry-picks “the most important” from previous months/years. Less-important things hidden but accessible. Demo already at `facebook.com/about/timeline`.  
- Specific life events (“New Pet”). Apps can roll activity into monthly/yearly **reports**. Friends can add an app from an update.  
- Every profile has a **Cover** — a big photo at the top, chosen, cropped, swapped. “You have complete control over everything on your timeline… what’s there, and who sees everything.”  
- Open Graph evolution: “You don’t have to ‘Like’ a book, you can just read a book… watch a movie… listen to a song.” **“We’re adding verbs.”** Activity goes into the new **ticker**, not the news feed, so friends are not flooded.  
- New class of social apps: all media (music, movies, TV, news, books) + lifestyle (exercise, food, fashion, travel). **Seamless sharing** — apps can add activity without a prompt once connected.  
- Demo: log into **Spotify** inside Facebook. Click a friend’s song in the ticker → it plays **inside Facebook**, plus a chat window. Not a pop-out. Ek invited on stage. Ticker also shows Rdio and Songza.

**Museum use:** Timeline room. Cover + memoir literacy. Verbs / ticker honesty. Same-day Spotify next-flow. Half-billion-in-a-day is a **Zuck claim**, label it.  
**Do not:** Graph Search (2013). Do not make Timeline the 2010 default.

---

# Part 5 — Opened-enough secondary (search + partial; not pixel)

Use for corroboration. Prefer V1–V12 if they conflict.

| URL | What we took | Caution |
|-----|--------------|---------|
| https://www.cnet.com/tech/services-and-software/netflixs-lost-year-the-inside-story-of-the-price-hike-train-wreck/ | Price hike first · 18 Sep split · **10 Oct reverse** · ~3 weeks · SNL mock | Pair with V11 |
| https://www.theguardian.com/technology/2011/jul/14/spotify-launch-us-record-labels | Invite-only free · $4.99 / $9.99 · Warner last | Prefer V7 for SKUs |
| https://www.apple.com/newsroom/2011/10/05Statement-by-Apples-Board-of-Directors/ | Jobs dies **5 Oct** | Honesty line only |
| https://news.microsoft.com/source/2011/03/14/microsoft-announces-global-availability-of-internet-explorer-9-2/ | IE 9 **14 Mar** global availability | January shell was still IE8 |
| https://en.wikipedia.org/wiki/IPad | Announce 2 Mar · sale **11 Mar** | Prefer V9 for prices |
| https://en.wikipedia.org/wiki/IPhone_4s | “Let’s Talk iPhone” 4 Oct · Jobs dies 5 Oct | Prefer V10 |
| https://en.wikipedia.org/wiki/Spotify | US July 2011 · later hour caps are **2012** | Prefer V7 / V8 |
| https://en.wikipedia.org/wiki/Snapchat | Picaboo Jul → Snapchat Sep · snaps disappear | Not Stories |
| https://en.wikipedia.org/wiki/History_of_Facebook | Messenger · Timeline · iPad app dates | Encyclopedia |
| https://www.cbsnews.com/pictures/steve-jobs-unveils-the-ipad-2/ | $499 · cameras | Photo essay |
| https://www.cnet.com/tech/mobile/the-ipad-2-makes-its-debut/ | Ships 11 Mar | Pair with V9 |
| Wired G+ 10 million (via V6) | 10M in two weeks | Cite Wired through V6 |
| Search Engine Land G+ 25M (via V6) | 25M in a month | Cite SEL through V6 |
| TechCrunch 2011-10-13 Page 40M (via V6) | Larry Page 40M Oct | Cite through V6 |

---

# Part 6 — What was wrong with the first 2011 ship (so you can verify leftover)

1. Research was a **short lock**, not a 2010-shaped pack (no MASTER-BIBLE, no harvest, no V1–V12 extracts).  
2. Spotify was a single invite button — missing the **three 14 Jul SKUs** and the **22 Sep** invite change.  
3. Google+ copy did not always use Gundotra’s Circles / Sparks / Hangouts / Instant Upload.  
4. iPad 2 / 4S missing announce-vs-ship, Smart Cover prices, Siri language list.  
5. About missing Pingdom social numbers (#egypt, 250M tweets/day, 800M FB, 1B WhatsApp, 48h/min YouTube).  
6. No iCloud / Twitch / Kindle Fire chips.  
7. Tests can be green while the **year still does not feel like 2011**.

Rebuild is **densify in place**, not a 100-room forest.

---

# Part 7 — Do not

- Treat 10,320 URLs as rooms.  
- Invent G+ / Spotify / Apple pixels.  
- Make Siri work on iPhone 4.  
- Make Spotify US look like 2008.  
- Make July Spotify look like 22 Sep Facebook-open.  
- Make G+ look like it beat Facebook.  
- Put AR lenses on 2011 Snapchat.  
- Blend June **346,004,403** with December **555 million**.
