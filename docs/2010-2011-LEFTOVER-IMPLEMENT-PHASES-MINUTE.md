# 2010 + 2011 leftover — implement playbook (flows · phases · minute steps)

**Date:** 2026-08-17  
**Status:** Lean years **on disk**. This file is only what is **left**. Do not rebuild the door or the star.  
**Scan:** `years/2010/` **38 HTML** · `years/2011/` **28 HTML**.  
**Bar:** [`MUSEUM-READY-BAR-1994-2012.md`](MUSEUM-READY-BAR-1994-2012.md) A–F.  
**Short scan:** [`2010-2011-MUSEUM-GRADE-LEFT.md`](2010-2011-MUSEUM-GRADE-LEFT.md).  
**Facts:** copy only from 2010 V1–V16 and 2011 V1–V12 in the long dumps. Do not invent digits or brand pixels.  
**Legal:** `itt10-*` / `itt11-*`. Incomplete REAL writes nothing. No ripped SWF. Git only if asked.  
**Do not restore** the old 115-room 2010 forest or any 2011 clone forest.

Read order: this file → harvest queues → long dumps (for quotes) → implement one phase, then e2e that phase.

```
npm run test:e2e:2010
npm run test:e2e:2011
```

`[x]` already on disk. `[ ]` leftover. `[~]` optional forever.

---

# Part 0 — What is already done (skip)

| Surface | 2010 | 2011 |
|---------|------|------|
| Hub card + Win7 shell | `[x]` IE 8 | `[x]` IE 9 |
| About dual-cite + bans + thesis | `[x]` | `[x]` + Pingdom social table |
| Star REAL | `[x]` Instagram filter→share | `[x]` G+ Circles + Hangout |
| P0 hardware / social REAL | `[x]` iPad · iPhone 4 · OG ×2 | `[x]` iPad 2 · Siri · Timeline · Spotify US |
| Leftover REAL | `[x]` farm · 4sq · tweets · imgur · pin · uber · quora · groupon · wave · digg · wl · ballot · sling | `[x]` airbnb · ig · tweets · groupon · tumblr · snap · qwikster · letterswap |
| e2e mvp + flows A–T | `[x]` | `[x]` 34/34 |
| Research pack | `[x]` 7 files + V1–V16 | `[x]` 7 files + V1–V12 |

**Do not** re-clone shells, re-key storage, or add Wikipedia-established names as rooms.

---

# Part 1 — Flow leftover inventory

Each flow: **period session** · **on disk now** · **leftover to implement** · **key** · **incomplete**.

## 2010 flows A–T

| ID | Period session | On disk now | Leftover implement | Key | Incomplete |
|----|----------------|-------------|--------------------|-----|------------|
| A | Open Win7 + IE8 | Works | Honesty chip: XP still huge early 2010 | — | — |
| B | Read the year | Dual-cite + bans list | **Pingdom social table** (600M FB · 25B tweets · 2B YT/day · 35h/min). Bans as a **table**. | `itt10-thesis-ack` | 0–1 checks |
| C | ★ Dinner → filter → share | Filter tray + share REAL | Museum **photo well** (own stills, not a grey box). Domain **instagr.am**. Midnight / 10k-in-hours / 25k day one. Strip visitor `itt10-ig` line. | `itt10-ig` | no filter |
| D | Order an iPad $499 | Capacity + radio | **Full price table** $499/$599/$699 and 3G $629/$729/$829. 300k first-day leaf. Jobs quote. | `itt10-ipad` | one missing |
| E | FaceTime + bumper | Two checkboxes | **Letter exhibit** (Apple 2 Jul, not Jobs). $199/$299 · 3GS **$99**. Retina 960×640 / 326 ppi · 5MP+HD. | `itt10-iphone4` | skip ack |
| F | Like CNN then IMDb | Two partner Likes | Label 400M-at-F8 vs 500M-21-Jul. Billion-buttons = Zuck **claim**. | `itt10-fb-og` | 1 Like |
| G | Water the farm | Peak placard + plant | Wilt **2.5×** on the page. Forbes &lt;60M Oct. | `itt10-farm` | no plant |
| H | Check in twice | 2 check-ins | vs Gowalla one line. Mayor theater already. | `itt10-4sq` | 1 check-in |
| I | Lurk or 140 | Tweet leftover | **#sidibouzid** / New Twitter lurker line. | `itt10-tweets` | empty |
| J | YouTube after dinner | 35h leftover | Keep. Add next-flow after play. | residual | — |
| K | Imgur → Reddit | Upload theater | Keep. Confirm next Reddit. | `itt10-imgur` | empty file |
| L | Pin 2 | Pin ×2 | Keep. | `itt10-pin` | 1 pin |
| M | Hail SF black car | SF-only | Keep. Next-flow missing. | `itt10-uber` | non-SF |
| N | Ask Quora | Non-empty ask | Keep. | `itt10-quora` | empty |
| O | Today’s Groupon | Honesty + deal | Keep. | `itt10-groupon` | no honesty |
| P | Wave then funeral | Invite + 4 Aug box | Quote Urs Hölzle line. Next-flow missing. | `itt10-wave` | — |
| Q | Digg v4 → Reddit | v4 + Reddit next | Keep. | `itt10-digg` | — |
| R | One cable | Literacy | Keep. | `itt10-wl` | skip |
| S | EU ballot | Pick browser | Keep. | `itt10-ballot` | no pick |
| T | Sling leftover | Playable | Keep. No Rovio art. | `itt10-game-*` | incomplete |

**2010 trail leftover:** Instagram → iPhone 4 → iPad → OG → FarmVille is only half-wired (`data-next-flow` missing on farm, 4sq, uber, wave, ballot). Map omits Wave · Digg · Uber · Cablegate · Groupon · Quora · ballot.

## 2011 flows A–T

| ID | Period session | On disk now | Leftover implement | Key | Incomplete |
|----|----------------|-------------|--------------------|-----|------------|
| A | Open Win7 + IE9 | Works | January **IE8 honesty chip** on shell or About (line exists; make it visible in chrome) | — | — |
| B | Read the year | Dual-cite + Pingdom table + bans table | Keep. | `itt11-thesis-ack` | 0–1 |
| C | ★ Circles + Hangout | Four pillars + Hangout REAL | Circles save is a **plain array** — wrap `{multiStep,real,name}`. Reveal next on circle add. | `itt11-gplus-*` | no checks |
| D | Spotify US invite | Three SKUs + 22 Sep | Keep. | `itt11-spotify-invited` | no honesty |
| E | iPad 2 cameras | Prices + Smart Cover | Keep. Wire pixel when harvested. | `itt11-ipad2` | one missing |
| F | Ask Siri | PR phrases + langs | Reveal next after phrase (hidden next exists, Siri alias may not call `revealNextFlow`). | `itt11-siri` | empty |
| G | Timeline memoir | Cover + 2 checks | Cover is optional — pack wanted Cover **ack**. Keep 2-check write so e2e stays. Add “pick a Cover” hint. | `itt11-timeline` | 0–1 |
| H | Airbnb host note | City → listing → note | Keep. | `itt11-airbnb` | empty city |
| I | IG still iOS | Filter + 14M line | Museum photo well (same as 2010). | `itt11-ig-posts` | no filter |
| J | #egypt or lurk | 250M + #egypt | Keep. | `itt11-tweets` | empty |
| K | Groupon IPO | 4 Nov + deal | Keep. | `itt11-groupon` | no honesty |
| L | Tumblr reblog | 39M + leftover | Keep. | `itt11-tumblr` | skip |
| M | YouTube after dinner | 48h/min **copy only** | **Add play REAL** (copy 2010 YouTube leftover: 2 honesty + Play). | residual / `itt11-yt` if you add a write | no play |
| N | Disappearing snap | Seed + not Stories | Keep. | `itt11-snap` | no literacy |
| O | Qwikster funeral | 18 Sep / 10 Oct | Add May **~30% peak NA traffic** streaming honesty (Cybercultural / TC). | `itt11-qwikster` | skip |
| P | IE9 / Chrome product | 20-line stubs | Year-voice paragraph each. | — | — |
| Q | Android ICS | 20-line stub | 18 Oct · Galaxy Nexus class · IG still iOS. | — | — |
| R | Google / Yahoo chips | 20-line stubs | One sentence each. | — | — |
| S | 5× leftovers | Wired | Keep. | popular keys | empty |
| T | Letter Swap | Playable | Keep. | `itt11-game-letterswap` | no Start |

**2011 trail leftover:** Hangout → Spotify → Timeline is wired. Siri → iPad 2 next is hidden but may not reveal. Gold room has no **10-step** list.

---

# Part 2 — Shared leftover phases (do these first)

ROI-ranked. Both years.

### Phase L0 — Freeze leftover · `[x]` this file

1. Confirm lean trees (38 / 28 HTML). Do **not** grow a forest.  
2. Lock star = Instagram (2010) · Google+ (2011).  
3. Lock: never invent brand pixels. Failed-final = RECON + note.  
4. Stop. Implement L1+ only when this pack is named.

### Phase L1 — Docs that are lying · `[x]` · ROI 9 · 20 min

Minute steps:

1. Open [`DISK-TRUTH.md`](DISK-TRUTH.md). Stamp playable hub **1994–2011**. 2010 HTML **38**. 2011 HTML **28**. 2012+ **not on disk**. Strike the old 385 / 121 / “2012 live” rows in the same table.  
2. Open [`2010-READ-FIRST.md`](2010-READ-FIRST.md). Change “Year is not on disk” → lean on disk.  
3. Open [`2010-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2010-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md). Mark Phases 1–11 and 13 lean `[x]`. Leave Phase 12 pixels `[ ]`. Tick DoD items that e2e already proves.  
4. Open [`references/2011/CAPTURE-LOG.md`](references/2011/CAPTURE-LOG.md). Strike “no year HTML on disk”.  
5. Do **not** write `2010-MUSEUM-GRADE.md` / `2011-MUSEUM-GRADE.md` until L2+L3+L8 pass.

**Verify:** grep DISK-TRUTH for `385` and `Year is not on disk` in 2010-READ-FIRST — both gone.

### Phase L2 — Layer C pixels · `[x]` failed-final honest · `[~]` retry WA · ROI 10 · both years

**Rule:** year-correct Wayback `im_` / `id_` only. `file dest` must say JPEG/PNG/GIF. Reject HTML error bodies and 1×1. Log every attempt. Wire **only** after the file exists. Max **5 stills per year** for close (star + two hardware + one social chrome + one continuity).

#### L2.0 Prep

```bash
mkdir -p assets/period/2010/{ipad,iphone,instagram,facebook,foursquare,android,twitter}
mkdir -p assets/period/2011/{spotify,googleplus,facebook,ipad,iphone,ie9,netflix}
printf '%s\n' 'Educational reconstruction. [wa] or [failed-final] only. Never invent brand pixels.' \
  > assets/period/2010/README-PIXELS.txt
cp assets/period/2010/README-PIXELS.txt assets/period/2011/README-PIXELS.txt
```

#### L2.1 2010 harvest (minute, in order)

Queue: [`references/2010/harvest/HARVEST-QUEUE-2010.md`](references/2010/harvest/HARVEST-QUEUE-2010.md).

| Step | ID | Try | Dest | Wire |
|-----:|----|-----|------|------|
| 1 | H10-01 | WA `apple.com/ipad` **201003–201005** `im_` | `assets/period/2010/ipad/hero-wa.jpg` | `years/2010/sites/ipad/index.html` under h1, `<img alt="iPad 2010 [wa]">` |
| 2 | H10-03 | WA `apple.com/iphone` **201006–201008** | `assets/period/2010/iphone/hero-4-wa.jpg` | `sites/iphone/index.html` |
| 3 | H10-05/06 | WA `instagr.am` **201010–201012** · WDM 2010 iPhone | `instagram/ui-wa.png` or `logo-wa.png` | `sites/instagram/index.html` |
| 4 | H10-07 | WA `facebook.com` **201006–201010** blue bar | `facebook/logo-wa.png` | `sites/facebook/index.html` |
| 5 | H10-09 | **Copy** `assets/period/2009/foursquare/logo-wa.png` if present | `2010/foursquare/logo-wa.png` | foursquare · label **[continuity 2009]** |

For each miss: write `<!-- [failed-final] H10-0N YYYY-MM-DD WA 404 -->` in the room and a row in CAPTURE. **Do not draw a logo.**

CDX entry points (from the queue):

```
https://web.archive.org/web/20100401000000*/http://www.apple.com/ipad/
https://web.archive.org/web/20100615000000*/http://www.apple.com/iphone/
https://web.archive.org/web/20101010000000*/http://instagr.am/
https://web.archive.org/web/20100715000000*/http://www.facebook.com/
```

#### L2.2 2011 harvest (minute, in order)

Queue: [`references/2011/harvest/HARVEST-QUEUE-2011.md`](references/2011/harvest/HARVEST-QUEUE-2011.md).

| Step | ID | Try | Dest | Wire |
|-----:|----|-----|------|------|
| 1 | H11-01/02 | WA `spotify.com` **201107–201109** | `2011/spotify/hero-wa.jpg` | `sites/spotify/index.html` |
| 2 | H11-05 | WA `plus.google.com` **201107–201109** | `2011/googleplus/circles-wa.png` | `sites/googleplus/index.html` |
| 3 | H11-04 | WA facebook Timeline **201109–201110** | `2011/facebook/timeline-wa.png` | `sites/facebook/timeline.html` |
| 4 | H11-08 | WA `apple.com/ipad` **201103** | `2011/ipad/ipad2-hero-wa.jpg` | `sites/ipad/index.html` |
| 5 | H11-06 | WA `apple.com/iphone` **201110** | `2011/iphone/4s-hero-wa.jpg` | `sites/iphone/index.html` |

IE9 / Netflix / Snapchat = P1. Failed-final OK.

#### L2.3 Wire rule (every still)

```html
<p class="itt-pixel"><img src="../../../../assets/period/2010/ipad/hero-wa.jpg" alt="iPad 2010 product still [wa 2010-04]">
<br><small>[wa] Wayback · not a reconstructed logo</small></p>
```

Failed-final:

```html
<p class="itt-pixel-failed">[failed-final] iPhone 4 hero · WA 404 this pass · text shell only</p>
```

**Verify:** `ls assets/period/2010 assets/period/2011`. `file` each binary. No invented PNG.

### Phase L3 — Provenance · `[x]` · ROI 9

1. Rewrite [`references/2010/CAPTURE-LOG.md`](references/2010/CAPTURE-LOG.md) header: lean tree, date today, each H10-0N = `[wa]` path+timestamp **or** `[failed-final]` reason. Strike dests that do not exist.  
2. Same for [`references/2011/CAPTURE-LOG.md`](references/2011/CAPTURE-LOG.md).  
3. Add `docs/references/2010/ARTIFACTS-MAP.md` / 2011 row: file → room → `[wa]|[failed-final]|[continuity]`.  
4. Do not claim Layer C closed if any P0 ID is blank.

### Phase L4 — Strip visitor-facing storage codes · `[x]` · ROI 6

2009 elevate removed `ittXX-` from visitor copy. JS keys stay.

Minute:

1. In `years/2010/**/*.html` and `years/2011/**/*.html`, delete lines like `key <code>itt10-ig</code>` from the visible body. Keep `data-storage-key` / engine keys.  
2. Map pages may keep codes (implementer surface) **or** say “writes the Instagram share” without the key. Prefer words.  
3. Do not change `data-next-when-key` attributes.

**Verify:** `rg -n 'itt10-|itt11-' years/2010 years/2011 --glob '*.html'` shows only `data-*` attributes and maybe map. No “key itt…” sentences.

---

# Part 3 — 2010 leftover phases (copy · trails · chips)

### Phase 10A — About Pingdom social + bans table · `[x]` · ROI 8

File: `years/2010/pages/about.html`.

1. After the dual-cite yellow box, add a table titled **Pingdom 2010 social (12 Jan 2011 wrap-up)**. Copy **only** V2 numbers:  
   Facebook EOY **600 million** · +250M · 70% outside US  
   Tweets **25 billion** · Twitter people Sep **175 million**  
   YouTube **2 billion**/day · upload **35 hours / minute**  
   Flickr Sep **5 billion**  
   Email **107 trillion** · spam **89.1%**  
2. Do **not** blend 206,956,723 with 255 million.  
3. Replace the bans `<ul>` with a two-column table (ban · correct era) matching [`2010-RESEARCH.md`](2010-RESEARCH.md).  
4. Keep the two `[data-thesis-req]` boxes and save button. Selectors stay.

**e2e add** (Phase L8): About contains `600 million`, `35 hours`, `iPad 2`.

### Phase 10C — Instagram star leftover · `[x]` · ROI 9

File: `years/2010/sites/instagram/index.html`. Engine `js/immersion/instagram.js` already writes after filter.

1. Replace `<div class="ig-well">Museum photo · 612×612…` with **3–6 museum stills you own** (`<button data-ig-photo="dinner">` etc.). If no stills, keep a labeled **RECON square** (“museum dinner plate · not Instagram CDN”).  
2. Add honesty: domain **instagr.am** · Systrom midnight 6 Oct · **10,000** in hours · **25,000** day one · iOS only · public by default · Android Apr 2012.  
3. Keep filter buttons and `data-ig-share`. Caption still optional if current engine allows; **do not** loosen the filter gate.  
4. Keep `data-next-flow` → iPhone 4 · iPad.  
5. If you add photo pick: share still requires a **named filter**. Empty filter never writes.

**e2e:** existing C stays green. Add body `/instagr\.am|25,000|iOS only/`.

### Phase 10D — iPad prices + 300k · `[x]` · ROI 9

Files: `years/2010/sites/ipad/index.html` · `order.html` · optional new `prices.html` (prefer densify **index**, do not explode).

1. On **index**, add the US table from Apple 27 Jan:

| | 16GB | 32GB | 64GB |
|--|-----:|-----:|-----:|
| Wi-Fi | **$499** | **$599** | **$699** |
| Wi-Fi+3G | **$629** | **$729** | **$829** |

2. Leaf copy: **300,000+** US through midnight 3 Apr · **1,000,000+** apps · **250,000+** ebooks (Apple 5 Apr). Jobs: “more than three apps and close to one book.”  
3. Quote OK: “magical and revolutionary device at an unbelievable price.”  
4. On **order.html**, label each radio with the matching price (16 GB Wi-Fi $499 · 16 GB 3G $629 · …). Capacity **and** radio still required.  
5. Keep `data-ipad-order`, `name="ipad-cap"`, `name="ipad-radio"`.

**e2e:** existing D stays. Add `$629` and `300,000` on index.

### Phase 10E — iPhone 4 letter + prices · `[x]` · ROI 9

File: `years/2010/sites/iphone/index.html`. Optional leaf `letter.html` if the letter block makes index too long — **prefer one page**.

1. Delete “2 Jul **Jobs** letter”. Sign-off is **Apple**.  
2. Exhibit the 2 Jul paragraph (V7): gripping the **black strip, lower left of the metal band** can drop **4–5 bars**; the **formula that calculates bars is totally wrong**; often **2 extra bars**; free SW update; **30-day** undamaged return.  
3. Bumper giveaway = **later mid-July** optional second ack. Do **not** put “you’re holding it wrong” in the letter box.  
4. Add US prices: **$199** 16GB · **$299** 32GB · leftover 3GS 8GB **$99** · ships **24 Jun** · AT&T 2-year.  
5. Add Retina **960×640 · 326 ppi** · FaceTime **Wi-Fi** · 5MP + LED + HD · App Store **>225,000** / **>5 billion**.  
6. Keep `[data-ft-wifi]` · `[data-antenna-ack]` · `[data-iphone4-ack]`. Both boxes still required.

**e2e:** existing E stays. Add `$199`, `326`, and `/Apple/` near the letter (not Jobs-as-author).

### Phase 10F — Open Graph labels · `[x]` · ROI 7

File: `years/2010/sites/facebook/index.html` (+ cnn/imdb if you touch copy).

1. Add: F8 scale then **400 million** (CNET). **500 million** is **21 Jul**. EOY **600 million** (Pingdom).  
2. Zuck closer: expect **one billion Like buttons** in 24h — label **claim**.  
3. Keep two Like buttons / two partner pages. One Like still does not write `itt10-fb-og`.

### Phase 10G — FarmVille wilt + October slide · `[x]` · ROI 7

File: `years/2010/sites/farmville/index.html`.

1. On the peak box add: wilt at **2.5×** grow time (8h crop withers at 20h). Theater may stay ~3s.  
2. Add Forbes 15 Oct: already **below 60 million** (−25% from peak).  
3. Keep `[data-farm-check]` · plant · harvest.  
4. Add `data-next-flow` hidden → Foursquare (missing today).

### Phase 10I — Twitter #sidibouzid · `[x]` · ROI 5

File: `years/2010/sites/twitter/index.html`.

1. Add lurker line (Williams via Cybercultural): you don’t have to tweet.  
2. Add Dec honesty: **#sidibouzid**.  
3. Keep 140 leftover write.

### Phase 10-map — Map funerals + next-flow holes · `[x]` · ROI 8

File: `years/2010/pages/map.html`.

Add writers (href = page that **writes**):

- `sites/uber/index.html` → UberCab SF  
- `sites/wave/index.html` → Wave funeral  
- `sites/digg/index.html` → Digg v4  
- `sites/wikileaks/index.html` → Cablegate  
- `sites/groupon/index.html` · `quora/index.html` · `browserchoice/index.html`

Add hidden `data-next-flow` (reveal after write) on:

| Room | Next |
|------|------|
| `farmville/index.html` | Foursquare |
| `foursquare/index.html` | Twitter |
| `uber/index.html` | Quora or home |
| `wave/index.html` | Digg |
| `browserchoice/index.html` | home |
| `iphone/index.html` | already has next — call `revealNextFlow` in the iPhone-4 extras boot if it does not |

**10-step list** on Instagram (gold), after share, or a static `<ol>` on the gold room:

1. Instagram share  
2. iPhone 4 camera  
3. iPad order  
4. OG Like ×2  
5. FarmVille harvest  
6. Foursquare mayor  
7. Twitter lurk  
8. Imgur → Reddit  
9. Wave funeral  
10. Sling Nest leftover  

Do **not** add a 7th guided home step. Home ol stays 6.

### Phase 10-chips — Continuity voice (no new folders) · `[x]` · ROI 6

One paragraph each, existing files only:

| File | Voice |
|------|-------|
| `sites/android/index.html` | Nexus One **5 Jan**. First serious Google-branded handset. |
| `sites/ie9/index.html` | **Beta** in 2010. Not the January shell. Shell is IE 8. |
| `sites/chrome/index.html` | Product room. Office geek. Not default chrome. |
| `sites/windowsphone/index.html` | WP7 **21 Oct**. Metro leftover. |
| `sites/yahoo/index.html` | June compiled top-10 still Yahoo-class (Hosting.com = signal). |
| `pages/home.html` or About | Chips only (no folders): Netflix discs+stream · Hulu · Spotify **EU** · Dropbox · Gmail. One line. |

### Phase 10P-wave quote · `[x]` · ROI 4

File: `years/2010/sites/wave/index.html`.

Replace the paraphrased funeral box with Hölzle (V13): will **not continue developing Wave as a standalone product**; maintain the site at least through year-end. Public was **19 May** (not this post).

---

# Part 4 — 2011 leftover phases

Copy densify on G+ / Spotify / iPad 2 / 4S / Timeline / About is **`[x]`**. Do not rewrite those pages except the items below.

### Phase 11C — Circles write shape + next · `[x]` · ROI 7

File: `js/immersion/googleplus.js` (shared engine — **keep year-agnostic**).

1. Today `itt11-gplus-circles` is a JSON **array** of names. After add, also write (or additionally write) a blob the extras kit understands: `{ multiStep:true, real:true, year:"2011", name, ts }` **if** you can do it without breaking a 2011 test that only checks truthy. Safer: keep the array **and** set `itt11-gplus-circles-ack` via extras — **or** wrap save so the array remains and tests that only `toBeTruthy()` still pass.  
2. After a named circle add, call `ITT.revealNextFlow(doc)` so the hidden Spotify next on `googleplus/index.html` shows.  
3. Do not require a circle before Hangout (e2e C starts on `hangouts.html` alone).

**e2e:** Hangout incomplete/complete stays. Add: type a circle name → next Spotify visible.

### Phase 11F — Siri reveal next · `[x]` · ROI 5

File: `js/immersion/year-2011-extras.js` `bootSiriAlias`.

1. After `stamp()`, call `ITT.revealNextFlow(doc)`.  
2. Hidden next on `sites/iphone/index.html` already points at iPad 2.

**e2e:** existing F stays. Optional: after phrase, next iPad 2 visible.

### Phase 11M — YouTube play REAL · `[x]` · ROI 7

File: `years/2011/sites/youtube/index.html`. Reuse `js/immersion/youtube.js` (already on 2010).

1. Copy the 2010 leftover pattern: two `[data-req]` (48h/min · residual player) · `[data-yt-play]` · popular leftover optional.  
2. Honesty: **1 trillion** playbacks · **48 hours / minute** · not YouTube TV.  
3. Write only if you add a year-prefixed leftover (popular `youtube` or residual). Incomplete (no play) writes nothing.  
4. Do not fork `youtube.js`.

**e2e:** Play click updates status. Body contains `48 hours`.

### Phase 11O — Netflix 30% traffic · `[x]` · ROI 6

File: `years/2011/sites/netflix/index.html`.

1. Above the Qwikster funeral, add streaming honesty: by May 2011 Netflix was the largest source of Internet streaming traffic in North America, **nearly 30%** at peak hours (Cybercultural / TC 17 May 2011).  
2. Keep Qwikster 18 Sep / 10 Oct ack. Funeral, not a store.  
3. Keep `[data-qwikster-req]` · `[data-qwikster-ack]`.

### Phase 11PQR — Continuity stubs · `[x]` · ROI 6

Do **not** add folders. One paragraph each:

| File | Voice |
|------|-------|
| `sites/ie9/index.html` | Ships **14 Mar**. This year’s shell. January was still IE8. |
| `sites/chrome/index.html` | Product room. Not the January default. |
| `sites/android/index.html` | Ice Cream Sandwich **18 Oct**. Galaxy Nexus class. Instagram still iOS. |
| `sites/google/index.html` | Search + Gmail continuity. G+ is the social bet — not “Google won social.” |
| `sites/yahoo/index.html` | Still a mass portal. Not the 2011 star. |
| `sites/facebook/index.html` | 800M EOY · Timeline is the 2011 profile · verbs/ticker · Graph Search 2013. Link Timeline. |

### Phase 11I — Instagram photo well · `[x]` · ROI 5

Same as 10C, file `years/2011/sites/instagram/index.html`. Keep iOS-only / 14M / Android 2012. Do not steal G+’s star.

### Phase 11-trail — 10-step on G+ gold · `[x]` · ROI 7

On `sites/googleplus/index.html` add a static `<ol class="itt-10-trail">` (not a 7th home guided step):

1. About thesis  
2. G+ Circles  
3. Hangout  
4. Spotify US invite  
5. Timeline Cover  
6. Siri phrase  
7. iPad 2 order  
8. Airbnb note  
9. Qwikster funeral  
10. Letter Swap  

Home guided ol stays **6**.

---

# Part 5 — Tests + stamp

### Phase L8 — Elevated extras specs · `[x]` · ROI 9

Create (mirror 2009):

**`e2e/2010-densify.spec.js`**

- About: `206,956,723` · `255 million` · `600 million` · `35 hours` · `iPad 2`  
- Instagram: `instagr.am` or `25,000` · `iOS`  
- iPad index: `$499` · `$629` · `300,000`  
- iPhone: `$199` · `326` · letter is Apple (not “Jobs letter”)  
- FarmVille: `83.76` · `60`  
- No invented `<img>` without `[wa]` / `[failed-final]` / `[continuity]` nearby if you want a pixel lock  

**`e2e/2010-trail-real-flows.spec.js`**

1. Instagram filter+share → next iPhone 4 visible  
2. iPhone 4 both acks → next iPad visible  
3. iPad order → writes `itt10-ipad`  
4. CNN Like then IMDb → `itt10-fb-og`  
5. Farm plant+harvest → `itt10-farm`  

**`e2e/2011-densify.spec.js`**

- About: `#egypt` · `800+ million` · `48 hours`  
- G+: Circles · Sparks · Hangouts · Instant Upload  
- Spotify: `$4.99` · `$9.99` · `22 Sep` · `No Facebook`  
- iPad 2: `Smart Cover` · `$39` · `$629`  
- 4S: `French` · `iCloud` · `$199`  
- Timeline: `Cover` · `ticker`  
- Netflix: `30%` (after 11O)  

**`e2e/2011-trail-real-flows.spec.js`**

1. Hangout two checks + start → next Spotify  
2. Spotify honesty + invite → next Timeline  
3. Timeline two checks → next Siri  
4. Siri phrase → next iPad 2 (after 11F)  
5. iPad 2 order → `itt11-ipad2`  
6. Airbnb city→listing→note → `itt11-airbnb`  

Wire scripts in `package.json`:

```
"test:e2e:2010": "... e2e/2010-densify.spec.js e2e/2010-trail-real-flows.spec.js"
"test:e2e:2011": "... e2e/2011-densify.spec.js e2e/2011-trail-real-flows.spec.js"
```

Run both suites green before L9.

### Phase L9 — Stamp museum-grade · `[x]` failed-final C · only if L2+L3+L8 green

1. Write `docs/2010-MUSEUM-GRADE.md` and `docs/2011-MUSEUM-GRADE.md` in the 2009 shape (A–F table). C = `[wa]` and/or `[failed-final]`, never “we drew the logo.”  
2. Tick this file’s phases `[x]`.  
3. Point [`2010-2011-MUSEUM-GRADE-LEFT.md`](2010-2011-MUSEUM-GRADE-LEFT.md) at remaining `[~]` only.

---

# Part 6 — Optional forever · `[~]` · do not start until L9

| Item | Why it can wait |
|------|-----------------|
| Dual XP / January-IE8 skins | Honesty chip is enough |
| Flipboard · Kinect · Stuxnet · Color/Path | Not the star |
| Hulu / Spotify EU / Dropbox / Gmail **folders** | Home chips enough |
| Twitch · Kindle Fire · WhatsApp · LinkedIn IPO rooms | Named on 2011 home already |
| Occupy · News of the World · Minecraft 1.0 rooms | Culture leftover |
| Perfect WA logo for every leftover brand | Residual forever |
| 2011→2012 handoff | 2012 not on disk |
| Restore any forest | Banned |

---

# Part 7 — Definition of leftover-done (museum-ready lean)

**2010**

- [x] About Pingdom social table + bans table  
- [x] iPad full $499–$829 table + 300k  
- [x] iPhone letter is Apple · $199/$299 · 3GS $99 · Retina digits  
- [x] Instagram photo well labeled · instagr.am honesty  
- [x] Map lists Wave/Digg/Uber/Cablegate  
- [x] `data-next-flow` after farm / 4sq / uber / wave  
- [x] P0 pixels `[wa]` or `[failed-final]` (5 attempts)  
- [x] CAPTURE matches disk  
- [x] `2010-densify` + `2010-trail` green  
- [x] Existing `test:e2e:2010` still green  
- [x] No new forest rooms  

**2011**

- [x] Continuity stubs have year-voice  
- [x] YouTube play leftover  
- [x] Netflix ~30% traffic line  
- [x] Circles add reveals Spotify next  
- [x] Siri phrase reveals iPad 2 next  
- [x] 10-step list on G+ gold (home stays 6)  
- [x] P0 pixels `[wa]` or `[failed-final]` (5 attempts)  
- [x] CAPTURE matches disk  
- [x] `2011-densify` + `2011-trail` green  
- [x] Existing `test:e2e:2011` still 34+ green  
- [x] No IG Android / Vine / Win8 / “G+ won”  

**Both**

- [x] Visitor-facing `key ittYY-…` sentences stripped on P0 leftover loops  
- [~] DISK-TRUTH HTML counts (live tree is 50 / 40; stamp when asked)  
- [x] No invented brand pixels  

---

# Part 8 — Suggested day order

| Day | Phase | Done when |
|-----|-------|-----------|
| 1 | L1 docs · 10A About · 10D iPad table · 10E letter | 2010 About/iPad/iPhone copy matches V2/V4/V7 |
| 1 | 11M YouTube · 11O Netflix 30% · 11PQR stubs | 2011 stubs + YT play |
| 2 | L2 pixels both years (5+5 attempts) · L3 CAPTURE | folders exist · every P0 ID logged |
| 2 | L4 strip keys · 10-map · 11-trail · 10C/11I wells | trails + no visitor keys |
| 3 | L8 specs · fix anything red · L9 stamp | both year suites green including densify/trail |

Implement **one phase at a time**. Re-run that year’s e2e after each. Do not start 2012 from this file.
