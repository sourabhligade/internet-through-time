# Viral coefficients + one extreme hit per year (1994–2021)

**Date:** 2026-08-16  
**Ask:** find something extremely viral for each museum year; map k-factor loops we can integrate.  
**This file is research + integrate map only.** It does **not** restar gold, dest-fill help/faq, scaffold 2022, or invent brand pixels. Implement rooms only after a separate “ok do it” turn.

**Implement contract:** [`VIRAL-COEFFICIENTS-IMPLEMENT-BIBLE-1994-2021.md`](VIRAL-COEFFICIENTS-IMPLEMENT-BIBLE-1994-2021.md) — goals, freeze locks, phases V0–V4, every flow card, wiring, e2e.

**Companions:** year `*-RESEARCH.md` / `*-MUSEUM-GRADE.md` · `GAMES-PER-YEAR/` · `DISK-TRUTH.md` · `2021-READ-FIRST.md`

---

## 0. Honesty about “visit 4k websites”

I did **not** open 4,000 individual browser tabs in this pass. Claiming that would be a fake visit log.

**4k-class corpus actually used (same stack as prior 5k/10k harvests):**

| Layer | What it is | Scale |
|-------|------------|-------|
| A | Wikipedia [List of Internet phenomena](https://en.wikipedia.org/wiki/List_of_Internet_phenomena) + [Category:Internet memes by year of introduction](https://en.wikipedia.org/wiki/Category:Internet_memes_by_year_of_introduction) | **~1,095** dedicated meme pages in the 1994–2021 year cats alone (1 / 6 / 7 / 5 / 5 / 7 / 13 / 18 / 14 / 21 / 34 / 38 / 62 / 34 / 49 / 44 / 39 / 67 / 49 / 45 / 49 / 66 / 68 / 67 / 78 / 116 / 93) plus the long phenomena list |
| B | Know Your Meme year / popular indexes + named KYM entries (Good Times, Dancing Baby, AYB, Hampster Dance, Rickroll, Nyan Cat, Harlem Shake, The Dress, Distracted Boyfriend, Yanny/Laurel, Area 51, Bernie mittens, Wordle) | hundreds of dated entries |
| C | Named **k-factor primaries** | Hotmail (TechCrunch 2009 “PS: I love you”; Bhatia/Smith/Draper) · PayPal (Thiel CS183 / Startup Archive: $10 both sides, 7–10% daily) · Dropbox (Houston: 100k → 4M / 15 mo · 2.8M invites Apr 2010 · ~35% daily signups) · Ice Bucket (ALS.org + Meta 2014: 17M films · 10B views · $220M) · Gangnam (HISTORY / Guinness: first YT 1B, 21 Dec 2012) |
| D | HTTP Archive / CrUX yearly origin sets + Internet Live Stats + Netcraft (already cited in year bibles) | **thousands** of origins; used as *scale context*, not as 4,000 new rooms |
| E | On-disk ITT harvests (`*-DEEP-RESEARCH*`, `*-5X-HARVEST`, `GAMES-PER-YEAR`) + live `years/*/sites` inventory | 28 years already harvested |

If a later pass needs a literal 4,000-URL harvest log, that is a separate crawl script (HA origins × year), not a human tab-open.

---

## 1. Two different things named “viral”

Do **not** mix these in a room.

| Kind | Formula / feel | Museum job | Example |
|------|----------------|------------|---------|
| **Product k-factor** | `K = i × c` · invites sent per user × conversion. `K > 1` (briefly) is the textbook loop. Cycle time matters as much as K. Sustained `K > 1` is rare and always saturates. | Play the **loop**: send → footer/invite/cash/storage → new account theater. Incomplete never writes. | Hotmail signature · PayPal $10/$10 · Dropbox 500 MB both sides · FarmVille neighbor · Ice Bucket nominate-3 |
| **Culture hit** | One artifact that *everyone forwarded* that year. Not a product CAC. Measured in views, remixes, or “did you see.” | Literacy plaque + a **toy that is not the copyrighted artifact**. No ripped SWF / MP3 / YT embed. | Hampster Dance (already) · Rickroll · Nyan Cat · Gangnam 1B · Harlem Shake · The Dress · Yanny/Laurel |

Canonical growth-deck trio (every K-factor article repeats these three): **Hotmail, PayPal, Dropbox**. Ice Bucket is the charity-nominate cousin. Those four are the only loops with published numbers strong enough to put on a plaque.

---

## 2. Hard bans (read before any room)

- **Never restar gold.** 1994 CSOTD, 1996 Hotmail as *the* 1996 one-thing (if locked), 2014 WhatsApp buy, 2016 Pokémon GO, 2021 ATT, etc. stay locked. Viral rooms are **P1 chips / toys / residual plaques**.
- **Never dest-fill.** No new `help.html` / `faq.html` / `legal.html` forests. One room ≤ 3 HTML files.
- **Never invent brand pixels.** Wordmark RECON or already-captured `[wa]` only. No “draw Psy,” no generated Bernie face, no fake YouTube chrome with a stolen thumbnail.
- **Never rip media.** No SWF, no YT iframe, no MP3 of Rick Astley / Psy / Harlem Shake / Nyan. CSS/JS theater or a silent literacy strip.
- **Never ship shock or harm toys.** Goatse, 2G1C, Tide Pod “eat,” challenge-that-hurts-you. Tide Pod is a **warning plaque only**.
- **Never deepfake real people.** Bernie mittens = AP photo *attribution plaque*, not a generated likeness.
- **Lean years stay lean.** 2011–2021 get **one** extra chip + **one** room (or deepen an existing room). No clone-Yahoo.
- **Prefix only `ittYY-*`.** Incomplete never writes.
- **Guided `<ol>` stays 6.** New chip goes on home “also this year” or map, not into the six.
- **2022 wall stays shut.** ChatGPT, Copilot GA-as-mass, Elon/Twitter close, Threads, BeReal mass, Wordle-as-NYT-game-of-the-year-after-Jan-2022.

---

## 3. Integrate grammar (how a year gets the hit)

Pick **exactly one** path per year:

| Path | When | What we ship | Gold? |
|------|------|--------------|-------|
| **A · Deepen existing room** | Loop already has a site dir but the mechanic is decoration | Add the *invite/nominate/signature* step + `ittYY-viral-*` REAL | No |
| **B · New lean room** | Hit is missing and museum-safe | `sites/<slug>/{index,about}.html` · 1 home chip · 1 map row · urlMap | No |
| **C · Toy only** | Copyright / likeness / audio makes a “site” dishonest | `year-playable.js` extra or `sites/playable` strip · no fake brand home | No |
| **D · Already enough** | Disk already teaches the hit | Do **not** add a second room. Optional one-line plaque. | — |

Home chip pattern (lean years): **one** line under residual, `data-itt-viral`, href to the room. Not 140 atlas chips.

---

## 4. Master table — one extreme hit per year

`Disk` = a dedicated `years/YYYY/sites/<slug>` (or year-game) already exists.  
`K?` = published product loop (`K = i × c` class) vs culture.

| Year | The one extreme hit | Kind | Why this year (not a runner-up) | Disk | Path | Integrate (one sentence) |
|------|---------------------|------|----------------------------------|------|------|---------------------------|
| **1994** | **Good Times** email hoax | Culture + proto-K | First mass “forward this or your CPU dies” panic. Wiki: subject `Good Times`, “nth-complexity infinite binary loop.” Mosaic CSOTD is already gold. | No | **B** | Forward-hoax page: read warning → Forward to 5 names → `itt94-goodtimes`. Trap = “Delete it and you’ll be fine” without forwarding. |
| **1995** | **Beanie Babies** as first Internet collecting sensation | Culture | Wikipedia List of Internet phenomena: cited as the world’s first Internet sensation (1995). Classmates.com is reunion-forward but not the year’s *meme*. | No | **B** | Collector checklist theater (names + “retired” tag). No Ty logo pixel. `itt95-beanie`. |
| **1996** | **Hotmail “Get your free email at HoTMaiL”** | **K** | Textbook loop. Launch Jul 1996 · ~1M by ~6 mo · ~12M in 18 mo · ~17% of then-Internet class · MSFT buy 30 Dec 1997 $400M. Draper pushed the footer; Bhatia dropped the “PS I love you” clause, kept the URL. | **Yes** `hotmail/` | **A** | Compose must *append* the footer on Send and the recipient read-view is the signup CTA. Key `itt96-hotmail-sig`. Dancing Baby is runner-up (C, 1997). |
| **1997** | **Dancing Baby** peak | Culture | 1996 Character Studio demo → 1997 *Ally McBeal* makes it mass. ICQ “uh-oh” is already a 1997 gold-adjacent room. | No | **C** | CSS/JS stick-figure loop + literacy (no ripped AVI). `itt97-baby`. |
| **1998** | **All Your Base** starts circulating | Culture | Zero Wing (1991) bad English → late-90s GIF/subtitle meme; peaks 2000–01. 1998 is when it leaves the forum. Google/YGM already on disk. | No | **C/B** | Subtitle-card toy (“All your base are belong to us.”) + 1998 date honesty. `itt98-ayb`. Full peak room can wait for 2000. |
| **1999** | **Hampster Dance** | Culture | Deidre LaCarte ~Jun 1998; **1999** is the forward-to-everyone year. Zombo + Napster already exist. PayPal $10 *starts* late 1999 — peak numbers are 2000. | **Yes** `hampsterdance/` | **D** | Already the 1999 culture room. Optional: one “email this page” forward that writes `itt99-hampster-fwd`. |
| **2000** | **PayPal $10 / $10** | **K** | Thiel: 1k mid-Nov 1999 → 12k end-Dec → 100k 3 Feb 2000 → 1M mid-Apr 2000 · **7–10% compounding daily**. Both sides paid. AYB *peaks* this year as culture runner-up. | **Yes** `paypal/` | **A** | Refer-a-friend: you get $10 theater, they get $10 theater, no real money. `itt00-paypal-ref`. Homestar already on disk as culture. |
| **2001** | **All Your Base remix peak + Wikipedia cite-loop** | Culture / proto-K | Feb 2001 flash/remix wave. Wikipedia launch 15 Jan 2001 is the *other* K (every cite is an invite). Wiki room already exists. | Wiki **yes** · AYB **no** | **B** small | One AYB 2001 remix-literacy page (no ripped Flash). `itt01-ayb`. Do not clone Wikipedia. |
| **2002** | **Friendster invite / circle of friends** | **K** | Pre-MySpace social graph. Invite-only feel + testimonials. Something Awful culture is runner-up; shock sites banned. | **Yes** `friendster/` | **A** | Invite 3 emails → circle grows. `itt02-fs-invite`. |
| **2003** | **Star Wars Kid** (Ghyslain Raza) **or** **Badger Badger Badger** | Culture | 2003 is the cruel-viral year (Star Wars Kid) and the Weebl loop year. MySpace launches Aug 2003 (already on disk). | No | **C** | **Prefer Badger** (CSS loop, no real kid). Star Wars Kid = **text plaque only** (bullying literacy, no video). `itt03-badger`. |
| **2004** | **Thefacebook .edu hop** | **K** | College-network lock-in: you need a .edu, you invite your dorm. JibJab *This Land* is the culture runner-up (Flash — no rip). Dean Scream is TV→web. | **Yes** `facebook/` | **A** | .edu field + “invite 3 roommates.” `itt04-fb-edu`. Do not restar 2004 gold. |
| **2005** | **Million Dollar Homepage** + YouTube share-URL | Culture / proto-K | Alex Tew 1,000,000 pixels at $1. YouTube May 2005 (already). Lazy Sunday Dec 2005. Chuck Norris Facts. | **Yes** `milliondollar/` + `youtube/` | **D/A** | Million Dollar already. Deepen YouTube: “email this video URL” as the 2005 share loop. `itt05-yt-url`. |
| **2006** | **Line Rider** (23 Sep) / **lonelygirl15** / **Evolution of Dance** | Culture | Line Rider is already the year-game. YouTube→Google Oct. Twitter launch. Elf Yourself (OfficeMax) is ad-viral. | Year-game **yes** | **D** | Do not add a second viral game. Optional lonelygirl15 **hoax-literacy** plaque (no ripped vlog). |
| **2007** | **Rickroll** | Culture | 4chan bait-and-switch → Apr 2007 mass. iPhone is already 2007 gold-adjacent. | No | **C** | Fake “free iPhone” / “see this” link → **text** “Never Gonna Give You Up — 1987 · no audio here.” `itt07-rick`. **No MP3.** |
| **2008** | **Dropbox 500 MB both sides** | **K** | 100k (Sep 2008) → 4M (~15 mo) · **3,900%** · Apr 2010 2.8M invites · ~35% of daily signups. Charlie Bit My Finger is culture runner-up (no rip). | **Yes** `dropbox/` | **A** | Folder theater stays. Add Refer: both sides +500 MB cap 16 GB. `itt08-dbx-ref`. |
| **2009** | **FarmVille neighbor** | **K** | Zynga 19 Jun 2009 · 1M DAU-class in days · Facebook canvas. Invite-to-tend is the loop (not the farm itself). | **Yes** `farmville/` | **A** | Neighbor button already exists — make it require 2 names and write `itt09-fv-neighbor`. |
| **2010** | **Double Rainbow** / **Bed Intruder Song** | Culture | “What does it mean?” 8 Jul 2010 Yosemite clip. Auto-Tune the News / Antoine Dodson. Instagram + Pinterest launch (already). Old Spice response videos. | No | **B** | Double Rainbow literacy + “share the link” (no YT embed). `itt10-rainbow`. |
| **2011** | **Nyan Cat** (Apr) | Culture | 25-hour / loop-the-internet year. Rebecca Black Friday is runner-up (cruel). Siri / G+ already on disk. | No | **C** | CSS pop-tart cat + progress bar, **silent**. `itt11-nyan`. Lean: one chip. |
| **2012** | **Gangnam Style — first YouTube 1 billion** | Culture | Uploaded 15 Jul 2012 · **1,000,382,639 views 21 Dec 2012** (Guinness / HISTORY). Kony 2012 is the dark K (share-to-end-war). Draw Something already. | No | **B** | Counter-plaque: “first video to 1B” + horse-dance **CSS** (no Psy video, no YT iframe). `itt12-gangnam`. |
| **2013** | **Harlem Shake** (Feb) | Culture | ~4,000 videos/day class · ~1B views in ~40 days (press class). Doge + Grumpy Cat same year. Vine already on disk. Flappy is 2013–14. | No | **C** | 15-second “build / drop” timer toy, no audio. `itt13-harlem`. Doge = Comic Sans plaque runner-up. |
| **2014** | **ALS Ice Bucket Challenge** | **K** | Nominate-N. ALS.org: **17M films · 159 countries · 10B views · $220M**. Meta 7 Sep 2014: 17M videos Jun 1–Sep 1, 10B views, 440M people. TIME: 2.4M unique FB videos by mid-Aug. | **Yes** `icebucket/` + `als/` | **A** | Form currently has **one** nominate field; copy says 2+. Require **3 names** (the real mechanic). `itt14-ice-nom3`. Charity education, no mockery, no payment. |
| **2015** | **The Dress** (26 Feb) | Culture | White-gold vs blue-black. Left Shark Super Bowl. Netflix and chill. | No | **C** | Two buttons, one dress swatch (CSS only). `itt15-dress`. |
| **2016** | **Pokémon GO** (6 Jul) | Culture + proto-K | Parks fill up. Invite-a-friend-to-the-gym is the loop; we already have catch/stop/team. Harambe + Mannequin Challenge are culture runners-up. | **Yes** `pokemongo/` | **D/A** | Optional: “text a friend the gym” `itt16-pogo-invite`. Do not restar 2016 gold. |
| **2017** | **Distracted Boyfriend** | Culture | Stock-photo remix that ate 2017. Tide Pod = **warning plaque only** (never a playable eat). Despacito 1B is YT residual. | No | **C** | Three-label comic (boyfriend / girlfriend / other) with museum-drawn stick figures, **not** the Getty photo. `itt17-distracted`. |
| **2018** | **Yanny vs Laurel** | Culture | Audio-perception split (May 2018). In My Feelings / Kiki is dance-challenge (no rip). Fortnite dances already. GDPR is already 2018 gold-adjacent. | No | **C** | Two-label button (no ripped WAV if we don’t have a licensed clip — text “some heard Yanny, some Laurel”). `itt18-yanny`. |
| **2019** | **Storm Area 51** | Culture | Facebook event → 2M+ “going” class · Jul–Sep 2019. Baby Yoda / OK Boomer / Old Town Road runners-up. TikTok US already. | No | **B** | RSVP theater: Going / Interested / Can’t. Honesty: they did not raid. `itt19-area51`. |
| **2020** | **Among Us** | Culture + proto-K | Crewmate invite / “sus.” Room already exists. Tiger King + Zoom are runners-up (Zoom already). Bernie mittens is **Jan 2021**. | **Yes** `among-us-room/` | **D** | Deepen only if invite is missing: “add 4 crew.” Do not dest-fill the help/faq already in that dir. |
| **2021** | **Wordle** (Oct) + **Bernie mittens** (20 Jan) | Culture | Wordle is already the year-game (Five Letter). ATT is locked gold. Sea shanty / Squid Game / NFT boom are runners-up. | Year-game **yes** | **D** | **Do not add a second 2021 game.** Optional residual plaque: Bernie mittens = AP attribution + “the photo, not a generator.” No likeness toy. |

---

## 5. Disk truth — what already teaches a viral loop

| Room | Years present | What it does today | What’s missing for K-literacy |
|------|---------------|--------------------|-------------------------------|
| `hotmail/` | 1996–98 | Footer text is **decoration** on compose/inbox/read | Send does not *teach* “every mail is an invite.” No `itt96-hotmail-sig`. |
| `paypal/` | 1999–2010 | Send-money theater | No $10/$10 refer. Peak numbers belong on **2000**. |
| `hampsterdance/` | 1999–2010 | Culture room | Optional forward. |
| `zombo/` · `homestar/` | 1999+ / 2000 | Culture | Enough. |
| `friendster/` | 2002–10 | Testimonials | Invite-3 not first-class. |
| `facebook/` | 2004– | Feed / friends | .edu hop not a required viral step. |
| `milliondollar/` | 2005–10 | Pixel grid | Enough. |
| `youtube/` | 2005– | Watch/upload class | 2005 share-URL loop thin. |
| `dropbox/` | 2008–10, 2018 | Folder theater | **No 500 MB referral.** |
| `farmville/` | 2009–10 | Plant/harvest + neighbor **button** | Neighbor does not require 2 names / REAL key. |
| `icebucket/` + `als/` | 2014 | Name + **1** nominate | Mechanic is nominate-**3**. |
| `pokemongo/` | 2016 | Catch / stop / team | Invite optional. |
| `among-us-room/` | 2020 | Among Us literacy | dest-fill help/faq already there — do not add more. |
| `att/` + Five Letter | 2021 | Locked gold + year-game | Enough. |
| **Missing entirely** | — | Good Times, Beanie, Dancing Baby, AYB, Badger, Rickroll, Nyan, Gangnam, Harlem, Doge, The Dress, Distracted, Yanny, Area 51 | Paths B/C above |

---

## 6. The four published coefficients (quote-ready plaques)

Put these numbers on the room, labeled with source. Do not invent a “K = 2.3” for years that have no paper.

### 6.1 Hotmail — 1996 (product K)

- Loop: every outbound message carries `Get your free email at HoTMaiL` (Draper; Bhatia dropped “PS: I love you”).
- Launch **4 Jul 1996** class · **~3,000 users/day** after footer · **750k by Labor Day** · **1M in ~6 months** · **2M five weeks later (~20k/day)** · **~12 million in 18 months** · Microsoft **30 Dec 1997**, **~$400M**.
- Sources: TechCrunch 2009-10-18 “PS: I love you. Get your free email at Hotmail”; ILCTR / Bhatia bios; innovationfootprints Hotmail note.
- Museum: footer must appear on the **sent letter**, not only on the marketing home.

### 6.2 PayPal — 1999–2000 (product K, cash)

- Loop: **$10 to join + $10 per friend** (later cut to $5). CAC ≈ $20 and they accepted it.
- Thiel: **1,000 mid-Nov 1999 → 12,000 end-Dec → 100,000 3 Feb 2000 → 1,000,000 mid-Apr 2000** · **7–10% compounding daily**.
- Sources: Thiel CS183 / Startup Archive transcript; ReferralCandy / Viral Loops case writeups quoting the same figures.
- Museum: **no real money**. Two localStorage balances, labeled theater.

### 6.3 Dropbox — 2008–2010 (product K, storage)

- Loop: **+500 MB both sides**, cap **16 GB** Basic (later Plus 1 GB / 32 GB).
- **100k Sep 2008 → 4M in ~15 months (3,900%)** · **2.8 million invites in April 2010** · **~35% of daily signups** from referrals.
- Sources: Drew Houston talks; ReferralCandy 2014; Viral Loops / ReferralRock case studies.
- Museum: referral page next to the existing folder toy. Do not replace sync theater.

### 6.4 Ice Bucket — 2014 (nominate K)

- Loop: film → dump or donate → **tag N friends** (the tag *is* the invite).
- ALS.org: **17 million films · 159 countries · 10 billion views · $220 million**.
- Meta (update 7 Sep 2014): **>17 million videos 1 Jun–1 Sep** · **>10 billion views** · **>440 million people**.
- TIME 15 Aug 2014: Facebook said **2.4 million unique videos** (mid-August snapshot).
- Museum: require **3 nominate names**. Charity education. No payment. No mockery.

### 6.5 Culture-scale numbers (not K, still plaque-worthy)

| Hit | Number | Source class |
|-----|--------|--------------|
| Gangnam Style | First YT video to **1,000,382,639** views · **21 Dec 2012** · 159 days after upload | Guinness · HISTORY.com · Wikipedia |
| Harlem Shake | **~4,000 videos/day** peak · ~**1B views / ~40 days** press class · Feb 2013 | Contemporary press / Mashable “Harlem Shake of the summer” later reused for Ice Bucket |
| Wordle | Wardle Oct 2021 · NYT buy Jan 2022 (**2022 wall** — we teach 2021 independent site only) | Already year-game |
| Pokémon GO | Niantic 6 Jul 2016 · parks / battery / three teams | Already rooms |

---

## 7. Year cards (implement-ready, still not implemented)

Each card is the *only* viral add for that year if we get a go.

### 1994 — Good Times

- **Files:** `years/1994/sites/goodtimes/{index,about}.html`
- **Flow:** open hoax mail → read “nth-complexity infinite binary loop” → Forward (5 period names) **or** Delete (trap, no write).
- **REAL:** `itt94-goodtimes` on Forward only.
- **Home chip:** “Good Times (do not open)” on 1994 home residual.
- **Sources:** Wikipedia List of Internet phenomena → Email → Goodtimes virus.

### 1995 — Beanie Babies

- **Files:** `years/1995/sites/beanies/{index,about}.html`
- **Flow:** checklist of 6 generic bean names (no Ty trademarks as logos) → mark “retired.”
- **REAL:** `itt95-beanie` when 4+ checked.
- **Honesty:** “cited as first Internet collecting sensation” — not that every 1995 user owned one.

### 1996 — Hotmail signature (deepen)

- **Touch:** `compose.html` + read view + `js/immersion/hotmail.js` / `immersion-1996.js`.
- **Flow:** login → compose → Send **always** appends `Get your free email at HoTMaiL` → recipient read shows signup link → create account theater.
- **REAL:** `itt96-hotmail-sig`.
- **Do not** change 1996 gold / guided ol.

### 1997 — Dancing Baby toy

- **Files:** `years/1997/sites/dancing-baby/index.html` **or** playable strip.
- **Flow:** CSS 3-frame stick baby loop + 1996 origin / 1997 *Ally McBeal* date.
- **REAL:** `itt97-baby` on “I watched the loop.”
- **Ban:** no ripped AVI.

### 1998 — AYB subtitle

- **Files:** `years/1998/sites/ayb/index.html`
- **Flow:** three yellow subtitle cards. Last card is the line.
- **REAL:** `itt98-ayb`.

### 1999 — Hampster (keep)

- Optional `data-hampster-fwd` email-this-page. Else **D**.

### 2000 — PayPal refer (deepen)

- **Touch:** `years/2000/sites/paypal/refer.html` (new sibling, do not overwrite send).
- **Flow:** your theater balance + $10 · friend email · they get $10.
- **REAL:** `itt00-paypal-ref` when both names filled.
- **Numbers on plaque:** Thiel sequence.

### 2001 — AYB remix literacy

- One page. “The Flash remix is not here.” Link back to Wikipedia room.

### 2002 — Friendster invite (deepen)

- Invite 3 → testimonials still work. `itt02-fs-invite`.

### 2003 — Badger loop

- CSS badger/mushroom/snake cycle, silent chant as **text**. `itt03-badger`.
- Star Wars Kid: 4 sentences on `about.html` of the same room, no video.

### 2004 — facebook .edu (deepen)

- Existing facebook index: require `*@*.edu` + 3 roommate names. `itt04-fb-edu`.
- Do not restar 2004 one-thing.

### 2005 — YouTube URL share (deepen) + keep Million Dollar

- “Email this video” with a `youtube.com/watch?v=`-shaped fake id. `itt05-yt-url`.

### 2006 — keep Line Rider

- Optional `lonelygirl15` 8-line hoax plaque on youtube about. No new game.

### 2007 — Rickroll toy

- Button labeled like a 2007 bait link → text reveal. `itt07-rick`.
- **No audio, no official video.**

### 2008 — Dropbox refer (deepen)

- `years/2008/sites/dropbox/refer.html`. +500 MB both · cap 16 GB theater. `itt08-dbx-ref`.

### 2009 — FarmVille neighbor (deepen)

- `data-farm-neighbor` requires 2 names. `itt09-fv-neighbor`.

### 2010 — Double Rainbow

- `years/2010/sites/double-rainbow/index.html`. Share-the-link. No YT. `itt10-rainbow`.

### 2011 — Nyan CSS (lean)

- One file. Silent pop-tart. One home chip. `itt11-nyan`.
- Do not re-bloat 2011 atlas.

### 2012 — Gangnam 1B plaque

- Counter from 0 → 1,000,382,639 (labeled 21 Dec 2012). CSS horse-dance **optional**, no video. `itt12-gangnam`.

### 2013 — Harlem 15s timer

- Build (10s) / drop (5s) with on-screen labels. No audio. `itt13-harlem`.
- Doge one-liner on same about.

### 2014 — Ice Bucket nominate-3 (deepen)

- Three nominate fields. Incomplete never writes. Keep ALS charity copy. `itt14-ice-nom3` (existing `itt14-icebucket-posts` can stay as the feed key).

### 2015 — The Dress

- Two buttons, one CSS gradient dress. Tally local only. `itt15-dress`.

### 2016 — Pokémon GO keep

- Optional gym-text invite. Do not restar gold.

### 2017 — Distracted stick comic

- Three museum stick figures + three editable labels. **Not** the stock photo. `itt17-distracted`.
- Tide Pod: 6-line “do not eat detergent” plaque on the same about, no toy.

### 2018 — Yanny / Laurel

- Two buttons. If we cannot host a licensed clip, **do not fake a spectrogram as the real audio**. Text split is honest. `itt18-yanny`.

### 2019 — Area 51 RSVP

- Facebook-event grammar. Honesty footer: they did not storm the base. `itt19-area51`.

### 2020 — Among Us keep

- If invite < 4 crew, add one field. Do not add dest-fill pages.

### 2021 — Wordle + ATT keep

- Bernie mittens residual on `sites/residual/` already exists — add 4 sentences + AP credit. No generator.

---

## 8. Implementation phases (only if you say go)

| Phase | Years | Work | Done when |
|-------|-------|------|-----------|
| **V0** | — | This doc. No HTML. | You are here. |
| **V1** | 1996, 2000, 2008, 2009, 2014 | Deepen the four published K loops + FarmVille | Each has a REAL key; e2e 1 spec file `e2e/viral-loops.spec.js` |
| **V2** | 1994, 1997, 2007, 2011, 2012, 2013, 2015 | Culture toys (Good Times, Baby, Rickroll, Nyan, Gangnam, Harlem, Dress) | Lean rooms, no media rips, home chip + urlMap |
| **V3** | 1995, 1998, 2001, 2003, 2010, 2017, 2018, 2019 | Remaining culture | Same grammar |
| **V4** | 1999, 2004–06, 2016, 2020–21 | Deepen-or-skip (already enough) | No second rooms |

**ROI:** V1 is the only phase that adds *measurable* museum literacy the dest-5× swamp did not. V2 is the “awesome for that year” ask. V3 is optional. V4 is restraint.

**Not in scope:** dest-fill 2021 help/faq · 2022 · L4 pixels · closing GitHub PR #1 · new gold stars.

---

## 9. Sources (named primaries)

| Claim | Primary |
|-------|---------|
| K = i × c | First Round Review glossary; getlaunchlist K-factor guide; startups.com lexicon |
| Hotmail footer + 12M / 18 mo | https://techcrunch.com/2009/10/18/ps-i-love-you-get-your-free-email-at-hotmail/ |
| PayPal $10 + 7–10% daily + headcount | Thiel CS183 / https://www.startuparchive.org/p/peter-thiel-tells-the-founding-story-of-paypal |
| Dropbox 100k→4M, 2.8M invites, 35% | Houston talks; https://www.referralcandy.com/blog/dropbox-referral-program/ |
| Ice Bucket 17M / 10B / $220M | https://www.als.org/ibc-how-it-started · https://about.fb.com/news/2014/08/the-ice-bucket-challenge-on-facebook/ · TIME 2014-08-15 |
| Gangnam first 1B 21 Dec 2012 | https://www.history.com/this-day-in-history/december-21/gangnam-style-first-youtube-video-to-hit-one-billion-views · Guinness 107048 |
| Phenomena / year cats | https://en.wikipedia.org/wiki/List_of_Internet_phenomena · https://en.wikipedia.org/wiki/Category:Internet_memes_by_year_of_introduction |
| Good Times / Dancing Baby / Beanie Babies | same Wikipedia list (Email / Animation / Advertising) |

---

## 10. Decision needed

This pass stops at the map.

Reply **“do V1”** (four real K loops + FarmVille), **“do V1+V2”** (add the culture toys), or **“leave it”**. I will not open 28 new rooms unless you pick a phase.
