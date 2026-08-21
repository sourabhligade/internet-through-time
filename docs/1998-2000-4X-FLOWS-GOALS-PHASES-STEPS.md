# 1998–2000 — 4× useful flows · goals · phases · minute steps

**Date:** 2026-08-19  
**Part 2 of 2.** Part 1: [`1994-1997-4X-FLOWS-GOALS-PHASES-STEPS.md`](1994-1997-4X-FLOWS-GOALS-PHASES-STEPS.md).  
**Status:** **Implemented 2026-08-19.** 54 leftover writers on existing rooms · `e2e/1998-2000-4x-flows.spec.js`. Stars stay Lucky · AIM · MapQuest.  
**Git only if asked.**

Same 4× law as part 1: **~18 new REAL sessions** on **existing rooms**. Guided `<ol>` stays **6**. Incomplete never writes. `ittYY-*` only. Never invent brand pixels. One year at a time.

Shared laws and S0/S1 live in **part 1** — do not fork them here.

```bash
npx playwright test e2e/1998-*.spec.js --workers=1
npx playwright test e2e/1999-*.spec.js --workers=1
npx playwright test e2e/2000-*.spec.js --workers=1
```

---

# 1998

**Thesis:** [`1998-RESEARCH.md`](1998-RESEARCH.md) — portal peak + first crack of the open web. Google company **4 Sep 1998**. Sparse homepage. Windows 98 **25 Jun**. AOL–Netscape announced Nov. ILS June **2,410,067**. Birthmark: Google.

**Star stays:** I’m Feeling Lucky · `itt98-lucky`.

**Already REAL:** Babel Fish · Google catalog query · Amazon CD cart · DMOZ 2-level · Mozilla split · All Your Base loop · thesis.

### Goal

Lucky stays the chip. Visitor also **types a query then Lucky** (second path), walks packed Yahoo, and hits You’ve Got Mail / GO / Snap / About — rooms that exist as plaques.

**Visitor outcome**

```
Hub → 1998 → Win98 + IE4
  → About · portals still win usage · Google is the newcomer
  → ★ I’m Feeling Lucky
  → Query → Lucky (new trail)
  → 18 leftover (YGM, GO, Snap, Valve, skip-intro…)
  → itt98-* only
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | Google **query then Lucky** trail | 10 |
| 2 | You’ve Got Mail AOL | 9 |
| 3 | GO · Snap · About/Mining Co | 9 |
| 4 | Skip-intro · Larry/Sergey | 8 |
| 5 | Valve · GameSpot · WinFiles | 7 |
| 6 | Broadcast.com · Open Diary · Netcenter | 6 |

### 18 new flows

| ID | Session | File | Key | Incomplete | Next |
|----|---------|------|-----|------------|------|
| N1 | Google **query** then Lucky | `sites/google/` + `lucky.html` | `itt98-q-then-lucky` | empty query | Yahoo |
| N2 | Yahoo packed 1998 | `sites/yahoo/` | `itt98-yahoo` | no category | YGM |
| N3 | You’ve Got Mail | `sites/youvegotmail/index.html` | `itt98-ygm` | skip | GO |
| N4 | GO.com | `sites/go/index.html` | `itt98-go` | skip | Snap |
| N5 | Snap | `sites/snap/index.html` | `itt98-snap` | empty | About |
| N6 | About / Mining Co | `sites/about/index.html` | `itt98-about` | skip | Valve |
| N7 | Valve | `sites/valve/index.html` | `itt98-valve` | skip | GameSpot |
| N8 | GameSpot | `sites/gamespot/index.html` | `itt98-gamespot` | skip | WinFiles |
| N9 | WinFiles | `sites/winfiles/index.html` | `itt98-winfiles` | skip | Hillman |
| N10 | Hillman Curtis skip-intro | `sites/hillmancurtis/index.html` | `itt98-skip` | skip wait | Larry |
| N11 | Larry Page homepage | `sites/larrypage/index.html` | `itt98-larry` | skip | Sergey |
| N12 | Sergey Brin homepage | `sites/sergeybrin/index.html` | `itt98-sergey` | skip | Broadcast |
| N13 | Broadcast.com | `sites/broadcastcom/index.html` | `itt98-bcast` | skip | Open Diary |
| N14 | Open Diary | `sites/opendiary/index.html` | `itt98-od` | empty | ICQ web |
| N15 | ICQ web | `sites/icqweb/index.html` | `itt98-icqweb` | skip | Netcenter |
| N16 | Netcenter | `sites/netcenter/index.html` | `itt98-netcenter` | skip | eBay IPO |
| N17 | eBay IPO literacy | `sites/ebay/` | `itt98-ebay-ipo` | 0–1 | Slashdot |
| N18 | Slashdot 1998 | `sites/slashdot/` | `itt98-slashdot` | empty comment | home |

### Phases

**98-P0 · Read** RESEARCH · DEEP-RESEARCH-2026-07-22 · confirm `youvegotmail go snap about valve hillmancurtis larrypage sergeybrin`.

**98-P1 · Lucky trail · N1 · ROI 10**  
Type a query on Google home → results **or** Lucky. Lucky with **empty** query never writes `itt98-lucky` (existing). New key `itt98-q-then-lucky` only if query length ≥1 **and** Lucky fires. e2e: empty Lucky blocked; `web` + Lucky writes both or the new trail key. Costume from Version Museum 1998 stills / failed-final.

**98-P2 · Portal vs newcomer · N2 N3 · ROI 9**  
Yahoo packed (TV-ad density). You’ve Got Mail = AOL culture, not a mail client.

**98-P3 · 3× writers · N4 N5 N6 · ROI 9**  
GO · Snap · About. Already on disk from 3×.

**98-P4 · Agency + founders · N10 N11 N12 · ROI 8**  
Skip-intro **wait** required. Larry/Sergey are Stanford homepages, not Google HQ.

**98-P5 · Games + files + net · N7 N8 N9 N13–N16 N18 · ROI 6–7**

**98-P6 · Money weather · N17 · ROI 7**  
eBay IPO literacy. Not a second auction star.

**98-P7 · Map + specs**  
`e2e/1998-4x-densify.spec.js` · `e2e/1998-4x-trail.spec.js` (query → Lucky). Existing lucky e2e green.

**98-P8 · Done when**  
18 keys · Google **not** labeled default search · no smile Amazon · no `itt97`/`itt99` leak.

**Hard bans:** Google as 1998 default · Unreal/Sony promo rooms · PayPal (1999).

---

# 1999

**Thesis:** [`1999-RESEARCH.md`](1999-RESEARCH.md) — IE5 · Napster · Blogger · Google $25M **7 Jun** · Y2K · Yahoo buys GeoCities. ILS June **3,177,453**. Birthmark: PayPal.

**Star stays:** AIM · `itt99-aim`.

**Already REAL:** Napster search · Blogger permalink · PayPal send · eBay watch · Y2K two checks · thesis.

### Goal

Buddy list (star) then **file-sharing + blog**. PayPal ledger deeper. LiveJournal / Neopets / eGroups write. Y2K stays weather.

**Visitor outcome**

```
Hub → 1999 → Win98 SE + IE5
  → ★ AIM sign-on / away
  → Napster search → RIAA Dec 6 literacy
  → Blogger title → permalink → edit
  → 18 leftover
  → itt99-* only · crash is next year
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | AIM away / warn (star deepen, not new room) | 10 |
| 2 | Napster → RIAA Dec 6 | 9 |
| 3 | Blogger permalink → edit | 9 |
| 4 | LiveJournal · Neopets · eGroups | 9 |
| 5 | PayPal ledger · Yahoo Messenger | 8 |
| 6 | Onion · SixDegrees · Webvan · E-Trade | 6 |

### 18 new flows

| ID | Session | File | Key | Incomplete | Next |
|----|---------|------|-----|------------|------|
| N1 | AIM **away message** | `sites/aim/` | `itt99-aim-away` | empty away | Napster |
| N2 | Napster **RIAA Dec 6** | `sites/napster/` | `itt99-riaa` | 0–1 | Blogger |
| N3 | Blogger **edit after publish** | `sites/blogger/edit.html` | `itt99-blog-edit` | no title first | LiveJournal |
| N4 | LiveJournal | `sites/livejournal/index.html` | `itt99-lj` | empty | Neopets |
| N5 | Neopets | `sites/neopets/index.html` | `itt99-neo` | skip | eGroups |
| N6 | eGroups | `sites/egroups/index.html` | `itt99-egroups` | empty | Yahoo Messenger |
| N7 | Yahoo Messenger | `sites/yahoomessenger/index.html` | `itt99-ym` | skip | SixDegrees |
| N8 | SixDegrees | `sites/sixdegrees/index.html` | `itt99-six` | skip | Onion |
| N9 | The Onion | `sites/theonion/index.html` | `itt99-onion` | skip | Dr. Koop |
| N10 | Dr. Koop | `sites/drkoop/index.html` | `itt99-koop` | skip | PayPal ledger |
| N11 | PayPal **ledger deepen** | `sites/paypal/` | `itt99-pp-ledger` | empty amount | GeoCities Yahoo |
| N12 | GeoCities after Yahoo buy | `sites/geocities/` | `itt99-gc-yahoo` | skip | Flash 4 |
| N13 | Flash 4 | `sites/flash4/index.html` | `itt99-flash4` | skip | SourceForge |
| N14 | SourceForge download | `sites/sourceforge/index.html` | `itt99-sf` | skip | Hampster |
| N15 | Hampsterdance once | `sites/hampsterdance/index.html` | `itt99-hampster` | skip | Zombo |
| N16 | Zombo once | `sites/zombo/index.html` | `itt99-zombo` | skip | Webvan |
| N17 | Webvan | `sites/webvan/index.html` | `itt99-webvan` | skip | E-Trade |
| N18 | E-Trade literacy | `sites/etrade/index.html` | `itt99-etrade` | 0–1 | Google funded |

*(Google funded Jun 7 is About/copy on `sites/google/` — fold into N18 e2e as body lock `25` / `Sequoia` if you add a 19th check on About instead of a 19th key. Cap stays 18 keys.)*

Optional About lock (not a 19th writer): Google **$25M · 7 Jun · still not default**.

### Phases

**99-P0 · Read** RESEARCH · DEEP-RESEARCH-2026-07-23 · confirm `livejournal neopets egroups yahoomessenger webvan etrade zombo`.

**99-P1 · AIM deepen · N1 · ROI 10**  
Away text ≥2 chars. Sign-on still the star key `itt99-aim`. Away is leftover `itt99-aim-away`. Incomplete empty away. e2e: sign-on still works; away separate.

**99-P2 · Napster + blog · N2 N3 · ROI 9**  
RIAA two checks (suit **6 Dec**, not the 2001 shutdown). Blogger: publish then edit same title.

**99-P3 · 3× writers · N4 N5 N6 · ROI 9**  
LiveJournal · Neopets (no real pets) · eGroups.

**99-P4 · IM + social leftover · N7 N8 · ROI 7**  
YM residual (AIM stays chip). SixDegrees literacy.

**99-P5 · Culture + money · N9–N13 N17 N18 · ROI 6–8**  
No real trades. Webvan is peak-bubble weather (crash is 2000).

**99-P6 · Toys once · N15 N16 · ROI 5**  
Hampster / Zombo: one ack. Do not make them stars.

**99-P7 · Map + specs**  
`e2e/1999-4x-densify.spec.js` · trail AIM → Napster → Blogger. Existing AIM e2e green.

**99-P8 · Done when**  
18 keys · chip still AIM · no Amazon smile · no crash-as-default (2000) · no `itt98`/`itt00` leak.

**Hard bans:** Napster as star · real P2P · crash rooms · Google default · smile logo.

---

# 2000

**Thesis:** [`2000-RESEARCH.md`](2000-RESEARCH.md) — bubble peaks and pops. AOL–TW **Jan 10–11**. NASDAQ **Mar 10**. Amazon **smile** first legal year. Napster mass. Pets.com shutdown. ILS June **17,087,182 (+438%)**. Birthmark: Baidu.

**Star stays:** MapQuest print · `itt00-mapquest`.

**Already REAL:** eBay watch+bid · Pets shop→shutdown · Amazon smile cart · Napster legal hop · Flash nag · PayPal $10/$10 · thesis.

### Goal

Directions (star) then **print**. Smile cart is leftover (not 1995 SSL). Crash weather on Pets + Startup Failures. OTAs and P2P **seeds** write.

**Visitor outcome**

```
Hub → 2000 → IE5.5 / Win98–ME residual
  → About · 17.0M June · AOL–TW · NASDAQ Mar 10
  → ★ MapQuest address → steps → print
  → Smile cart · Pets goodbye · Napster monster
  → 18 leftover
  → itt00-* only · not Wikipedia · not XP
```

### ROI

| Rank | Work | ROI |
|-----:|------|----:|
| 1 | MapQuest **print after steps** | 10 |
| 2 | Amazon smile cart deepen | 9 |
| 3 | Pets shop → sock-puppet goodbye | 9 |
| 4 | Expedia · Travelocity · Half.com | 8 |
| 5 | Gnutella · LimeWire seed · Baidu | 7 |
| 6 | AOL–TW · NASDAQ literacy · Failures catalog | 8 |

### 18 new flows

| ID | Session | File | Key | Incomplete | Next |
|----|---------|------|-----|------------|------|
| N1 | MapQuest **steps** | `sites/mapquest/` | `itt00-mq-steps` | empty from/to | print |
| N2 | MapQuest **print** | `sites/mapquest/` | `itt00-mq-print` | no steps first | Amazon |
| N3 | Amazon smile **tab hop** | `sites/amazon/` | `itt00-smile-tab` | <2 tabs | cart (existing F3) |
| N4 | Pets **goodbye** | `sites/pets/` | `itt00-pets-end` | skip shop first | Failures |
| N5 | Startup Failures catalog | `sites/startupfailures/` | `itt00-fail` | skip | Expedia |
| N6 | Expedia search | `sites/expedia/index.html` | `itt00-expedia` | empty | Travelocity |
| N7 | Travelocity | `sites/travelocity/index.html` | `itt00-travel` | empty | Half |
| N8 | Half.com | `sites/half/index.html` | `itt00-half` | skip | Baidu |
| N9 | Baidu box | `sites/baidu/index.html` | `itt00-baidu` | empty | Everything2 |
| N10 | Everything2 | `sites/everything2/index.html` | `itt00-e2` | empty | Gnutella |
| N11 | Gnutella leak literacy | `sites/gnutella/index.html` | `itt00-gnutella` | 0–1 | LimeWire |
| N12 | LimeWire seed | `sites/limewire/index.html` | `itt00-lw` | skip | Homestar |
| N13 | Homestar | `sites/homestar/index.html` | `itt00-homestar` | skip | Camworld |
| N14 | Camworld / blogroll | `sites/camworld/index.html` | `itt00-cam` | skip | iVillage |
| N15 | iVillage | `sites/ivillage/index.html` | `itt00-ivi` | skip | Women.com |
| N16 | Women.com | `sites/womencom/index.html` | `itt00-women` | skip | Macromedia |
| N17 | Macromedia Flash 5 | `sites/macromedia/index.html` | `itt00-flash5` | skip | AOL–TW |
| N18 | AOL–TW + NASDAQ literacy | `pages/about.html` or `sites/aol/` | `itt00-peak` | 0–1 (need **both** Jan merger + Mar 10) | home |

### Phases

**00-P0 · Read** RESEARCH · 2000-2002 index · confirm `expedia travelocity half baidu everything2 gnutella limewire startupfailures macromedia`.

**00-P1 · Gold second path · N1 N2 · ROI 10**  
Existing print gold: require **from + to** → steps list → print. Empty from/to never writes `itt00-mapquest`. New keys may wrap the same machine (`itt00-mq-steps` then print). e2e: incomplete blocked; complete print still `itt00-mapquest` **or** both new keys. Do not restar.

**00-P2 · Smile + Pets · N3 N4 · ROI 9**  
Amazon: smile logo **allowed this year**. 2 tabs then existing cart. Pets: shop then shutdown copy (sock puppet). No real checkout.

**00-P3 · Crash catalog + OTAs · N5–N8 · ROI 8**  
Failures list · Expedia · Travelocity · Half.com. No real flights.

**00-P4 · Search + P2P literacy · N9–N12 · ROI 7**  
Baidu is a **birthmark**, not Chinese mass default in a US museum. Gnutella/LimeWire = literacy, **no files**.

**00-P5 · Blog / Flash / portals · N13–N17 · ROI 6**

**00-P6 · Peak weather · N18 · ROI 8**  
Both: AOL–TW Jan class **and** NASDAQ Mar 10. One check never writes.

**00-P7 · Map + specs**  
`e2e/2000-4x-densify.spec.js` · trail MapQuest from/to → print · Pets shop → goodbye. Existing mapquest e2e green.

**00-P8 · Done when**  
18 keys · smile **only** on 2000 Amazon · no Wikipedia · no XP/IE6 as default · no `itt99`/`itt01` leak.

**Hard bans:** Wikipedia (Jan 2001) · Friendster · iTunes Store · “Google monopoly UI” · real P2P · real OTA booking.

---

## Part 2 execute order

| # | Year | Why |
|---|------|-----|
| 1 | **1998** | Smallest costume win (Lucky trail) · rooms already named |
| 2 | **2000** | Print + crash weather is the year people remember |
| 3 | **1999** | AIM deepen + Napster/Blogger second paths |

After a year: tick that year’s P8, run that year’s e2e, then stop. Do not open 2001 from this file.
