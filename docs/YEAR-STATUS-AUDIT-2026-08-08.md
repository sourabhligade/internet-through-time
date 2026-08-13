# Year status audit — every hub year (1994–2020)

**Date:** 2026-08-08  
**Historical snapshot.** Hub on disk is now **1994–2015** · **2016+ not playable**. Do not use this file as execute order.  
**Execute leftover:** [`CROSS-YEAR-IMPROVE-IMPLEMENTATION-PHASES.md`](CROSS-YEAR-IMPROVE-IMPLEMENTATION-PHASES.md).  
**Scope:** Visitor-facing **real vs mock** after the one-thing conversion pass.  
**Hub (at write time):** playable **1994–2020** · locked **2021+** — later reverted.  
**Companions:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`NON-DONE.md`](NON-DONE.md) · [`COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md) · [`OLDER-YEARS-GOLD-MACHINES-GOALS-PHASES-STEPS.md`](OLDER-YEARS-GOLD-MACHINES-GOALS-PHASES-STEPS.md) (W1–W11 implement bible)

### How to read this

| Mark | Meaning |
|------|---------|
| **Gold** | Multipage product machine (Amazon/ICQ class): incomplete never writes, reload persist, period costume |
| **Product** | Dedicated JS + form path; one-thing chip is a machine, not a quiz |
| **Worksheet** | Yellow/green `.ott-real` + `data-itt-real-save` checkboxes |
| **Thesis** | About-page “Save thesis literacy” (every year still has this) |
| **Clone plaque** | Continuity-forest leftover `Save (REAL)` copied into later years |

**One-thing e2e:** `npx playwright test e2e/one-thing-per-year.spec.js --workers=1` → **55 passed** (2026-08-08).

---

## Percentages (2026-08-08)

**Full %** = one-thing 25 + signature 25 + leftover-mock bucket 25 + e2e 15 + costume 10.  
Leftover bucket: `25 × (1 − min(site plaques, 24) / 24)`. 0 plaques = 25; ≥24 plaques = 0.  
**P0 %** = same without the leftover bucket, scaled to 100: `(OT + signature + costume) / 60`.  
Thesis About quizzes are **not** in leftover (every year has one).

| Year | Full | P0 only | Leftover site plaques | Read as |
|------|-----:|--------:|----------------------:|---------|
| 1994 | **86%** | 82% | 0 | CSotD real; Yahoo/FishCam strong |
| 1995 | **97%** | 100% | 0 | Amazon gold |
| 1996 | **97%** | 100% | 0 | Hotmail gold |
| 1997 | **97%** | 100% | 0 | ICQ gold |
| 1998 | **90%** | 88% | 0 | Lucky real; Google home better costume |
| 1999 | **94%** | 95% | 0 | AIM machine |
| 2000 | **92%** | 87% | 0 | MapQuest + crash Amazon |
| 2001 | **86%** | 77% | 0 | MSN real, thin chrome |
| 2002 | **84%** | 77% | 0 | Stumble real |
| 2003 | **96%** | 93% | 0 | Photobucket → MySpace |
| 2004 | **93%** | 92% | 0 | thefacebook join |
| 2005 | **99%** | 98% | 0 | Best mid-era pack |
| 2006 | **87%** | 82% | 0 | Time You 1-step |
| 2007 | **84%** | 85% | 4 | Flash real; 4 plaques |
| 2008 | **96%** | 93% | 0 | GitHub + App Store |
| 2009 | **84%** | 77% | 0 | SO ask real |
| 2010 | **88%** | 85% | 3 | Imgur→Reddit; 3 plaques |
| 2011 | **86%** | 80% | 0 | Airbnb real |
| 2012 | **86%** | 80% | 0 | SoundCloud real |
| 2013 | **71%** | 71% | **12** | One-thing Vine chip landed · year-true iOS7/5c/Win8.1/UberX quizzes remain |
| 2014 | **87%** | 83% | **3** | Slack real; YikYak/Secret/Ello still quizzes |
| 2015 | **86%** | 80% | **0** | Discord real; clone forest gone |
| 2016 | **86%** | 80% | **0** | Musical.ly real; clone forest gone |
| 2017 | **92%** | 92% | **0** | Clones stripped 2026-08-08 · streaming leftover gone |
| 2018 | **97%** | 95% | **0** | GDPR gold P0 · clone forest stripped |
| 2019 | **93%** | 93% | **0** | Disney+ / ATV / Marshmello machines · clones gone |
| 2020 | **92%** | 92% | **0** | Zoom + P0/P1 machines (Reels/CCPA/Edge/EO/stream/iPhone12/D+/HBO/Clubhouse/Spaces/remote) |

**Hub average full: ~89%** (clone forest stripped 2013–2020, 2026-08-08).  
**1994–2012 average full: ~91%.**  
**2013–2020 average full: ~85%**.

```
100% ┤ 95 97 97 97    99    96
 90% ┤       90 94 92    93    87 88 86 86
 80% ┤ 86          86 84    84
 70% ┤                            72
 60% ┤                         65 61 61 67 61 60
 50% ┤                      53
      94 95 96 97 98 99 00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20
```

**Thesis literacy is universal** (`pages/about.html` → `ittYY-thesis-ack`). Not counted as a product mock below unless it is the only “REAL” in the year.

---

## Scoreboard

| Year | Full % | P0 % | Band | One-thing | Signature product | Site `data-itt-real-save` leftover | Named e2e specs | Next lever |
|------|------|-----------|-------------------|------------------------------------|-----------------|------------|
| 1994 | 86 | 82 | **B** | CSotD visit stamp | Yahoo dir + FishCam | 0 | 6 | Deepen CSotD to 3 rooms / date archive |
| 1995 | 97 | 100 | **A** | SSL checkout form | **Amazon cart** (gold) | 0 | 6 | Keep; costume already period |
| 1996 | 97 | 100 | **A** | Portal wars 3-hit | **Hotmail** inbox/compose (gold) | 0 | 6 | Portal wars still thin visually |
| 1997 | 97 | 100 | **A** | PointCast 2+ channels | **ICQ** UIN/buddies/IM (gold) | 0 | 9 | PointCast channels page deepen |
| 1998 | 90 | 88 | **B+** | Lucky in-year jump | Google + Amazon music | 0 | 13 | Lucky page costume vs google home |
| 1999 | 94 | 95 | **A−** | AIM sign-on / IM | AIM + Napster | 0 | 10 | AIM buddy add done; away/profile already |
| 2000 | 92 | 87 | **B+** | MapQuest from/to + ETA | Amazon crash-year + MQ | 0 | 6 | Print/directions already persist |
| 2001 | 86 | 77 | **B** | MSN sign-on / chat / nudge | Wikipedia + iPod | 0 | 7 | MSN chrome still table-thin |
| 2002 | 84 | 77 | **B** | Stumble interest + card | Friendster + Kazaa | 0 | 7 | No dedicated stumble e2e yet |
| 2003 | 96 | 93 | **A−** | Photobucket → MySpace img | MySpace + iTunes | 0 | 7 | Gold path exists |
| 2004 | 93 | 92 | **A−** | thefacebook join network | Gmail + thefacebook | 0 | 8 | Networks page costume |
| 2005 | 99 | 98 | **A** | Pandora station | **YouTube + Maps** (gold) | 0 | 11 | Best mid-era pack |
| 2006 | 87 | 82 | **B** | Time You cover name | Twitter + Digg + FB feed | 0 | 5 | Cover is 1-step; deepen UGC stamp |
| 2007 | 84 | 85 | **B** | Flash download→enable | iPhone + Gmail + Street View | **4** | 5 | Kindle / Beacon / OpenSocial / specs plaques |
| 2008 | 96 | 93 | **A−** | GitHub issue + fork tree | App Store + Chrome + GH | 0 | 6 | Fork tree done |
| 2009 | 84 | 77 | **B** | SO ask/vote | Bing + FarmVille + FB Like | 0 | 5 | SO e2e only via one-thing |
| 2010 | 88 | 85 | **B+** | Imgur → Reddit | iPad + Instagram + Imgur | **3** | 7 | Cablegate / Groupon / Digg v4 plaques |
| 2011 | 86 | 80 | **B** | Airbnb search→book | Siri + G+ + Spotify | 0 | 5 | Airbnb e2e only via one-thing |
| 2012 | 86 | 80 | **B** | SoundCloud play→comment | IG Android + FB IPO | 0 | 5 | SoundCloud e2e only via one-thing |
| 2013 | 71 | 71 | **B−** | Vine hold → post | Vine + Snap Stories + WA | **12** year-true | 7 | Convert year-true quizzes to machines |
| 2014 | 87 | 83 | **B+** | Slack workspace/chat | WhatsApp + Heartbleed + Slack | **3** YikYak/Secret/Ello | 7 | Convert those 3 quizzes |
| 2015 | 86 | 80 | **B+** | Discord send | Watch + Win10 + Periscope | **0** | 6 | Costume |
| 2016 | 86 | 80 | **B+** | Musical.ly caption post | Stories + Pokémon GO + Vine goodbye | **0** | 6 | Costume |
| 2017 | 92 | 92 | **A−** | Netflix My List | NF/Spotify/YT/Discord modern | **0** | 6 | Costume residual only |
| 2018 | 97 | 95 | **A** | GDPR CMP (+ gates YT/FB) | GDPR + TikTok + IGTV | **0** | 7 | L4 logos optional |
| 2019 | 93 | 93 | **A−** | Disney+ trial click | Stream wars + D+ / ATV+ | **0** | 6 | P0/P1 are machines |
| 2020 | 92 | 92 | **A−** | Zoom join+mute | Zoom + Reels + CCPA machines | **0** (thesis only) | 6 | Costume residual · Apple TV+ quiz leftover |

---

## Per year

### 1994 — B · CSotD stamp
- **One-thing:** click today’s pick → `itt94-csotd`. Incomplete = no visit.
- **Gold nearby:** Yahoo directory, FishCam frames, guestbook.
- **Mock leftover:** thesis only.
- **Gap:** pick is still one click + navigate, not a 3-page “today / archive / about editor” machine.
- **Test:** one-thing 1994 · `e2e/1994-*.spec.js`

### 1995 — A · Amazon gold
- **One-thing:** SSL checkout name + last4 + city → `itt95-ssl-checkout`.
- **Gold:** Amazon cart → checkout (period tables + river-A).
- **Mock leftover:** thesis only.
- **Test:** `1995-cart` · `1995-ssl-checkout` · one-thing.

### 1996 — A · Hotmail gold
- **One-thing:** visit Yahoo + Excite + AltaVista (3) → `itt96-portal-wars`.
- **Gold:** Hotmail sign-in → inbox → compose.
- **Gap:** portal wars buttons are still exhibit chips; actual portal rooms are the real costume.
- **Test:** `1996-hotmail*` · one-thing.

### 1997 — A · ICQ gold
- **One-thing:** subscribe ≥2 PointCast channels → `itt97-pointcast`.
- **Gold:** ICQ UIN / buddies / messages.
- **Test:** `1997-icq-real` · one-thing.

### 1998 — B+ · Lucky jump
- **One-thing:** I'm Feeling Lucky empty blocked; `yahoo` jumps in-year + `itt98-lucky`.
- **Gold nearby:** Google catalog search; Amazon music cart.
- **Gap:** `lucky.html` is sparse vs `google/index.html` logo costume.
- **Test:** `1998-lucky-real` · `1998-google`.

### 1999 — A− · AIM machine
- **One-thing:** AIM sign-on → `itt99-aim`. IM / away / add buddy persist.
- **Also:** Napster, Blogger, Google.
- **Test:** `1999-aim-real` · one-thing.

### 2000 — B+ · MapQuest
- **One-thing:** From + To → steps + computed ETA → print.
- **Also:** crash-year Amazon / Pets.com.
- **Test:** `2000-mapquest-real`.

### 2001 — B · MSN
- **One-thing:** mail@ sign-on → chat → nudge (`itt01-msn-*`).
- **Signature:** Wikipedia edit theater, iPod.
- **Gap:** MSN UI is table-thin vs AIM/ICQ chrome.
- **Test:** `2001-msn-real`.

### 2002 — B · StumbleUpon
- **One-thing:** interest + Stumble → museum card (`itt02-stumble`).
- **Signature:** Friendster, Kazaa.
- **Gap:** no `2002-stumble-real.spec.js` yet (one-thing covers gate).
- **Test:** one-thing 2002.

### 2003 — A− · Photobucket → MySpace
- **One-thing:** upload filename → MySpace apply shows `<img>`.
- **Gold nearby:** MySpace profile + comments.
- **Test:** `2003-photobucket-myspace-real`.

### 2004 — A− · thefacebook networks
- **One-thing:** pick college + name → join (`itt04-thefacebook-networks`).
- **Gold nearby:** Gmail invite, thefacebook profile.
- **Test:** one-thing 2004 · `2004-real-flows`.

### 2005 — A · YouTube / Maps / Pandora
- **One-thing:** Pandora station (empty blocked).
- **Gold:** YouTube watch, Maps pan/zoom, Reddit/Digg.
- **Leftover mocks:** 0 site plaques.
- **Test:** `2005-pandora-real` · `2005-youtube` · `2005-no-mock`.

### 2006 — B · Time You
- **One-thing:** name on Person of the Year cover → `itt06-time-you`.
- **Signature:** Twitter, Digg, FB News Feed.
- **Gap:** 1-step cover; trails are links not required.
- **Test:** one-thing 2006 · `2006-real-flows`.

### 2007 — B · Flash nag + 4 leftover plaques
- **One-thing:** Download → Enable → `itt07-flash-ack`.
- **Signature:** iPhone, Gmail, Street View, FB Platform.
- **Still worksheet:** Kindle, OpenSocial, Beacon, iPhone specs.
- **Next:** convert those 4 or label them thesis-not-product.

### 2008 — A− · GitHub
- **One-thing / product:** issue (title+body) + fork tree copy.
- **Signature:** App Store, Chrome, Android G1, Hulu.
- **Test:** `2008-github-real`.

### 2009 — B · Stack Overflow
- **One-thing:** ask title+body, vote (`itt09-stackoverflow`).
- **Signature:** Bing, FarmVille, Like button, Win7.
- **Gap:** no dedicated SO e2e file.

### 2010 — B+ · Imgur → Reddit + 3 plaques
- **One-thing:** upload → direct link → Reddit submit prefill.
- **Signature:** iPad, iPhone 4, Instagram filters.
- **Still worksheet:** Cablegate, Groupon, Digg v4.
- **Test:** `2010-imgur-real`.

### 2011 — B · Airbnb
- **One-thing:** city search → listing → request book.
- **Signature:** Siri, Google+, Spotify, Qwikster.
- **Gap:** no `2011-airbnb-real.spec.js`.

### 2012 — B · SoundCloud
- **One-thing:** play → comment (`itt12-soundcloud`).
- **Signature:** IG Android, FB IPO, Pinterest, Win8.
- **Gap:** no dedicated SC e2e.

### 2013 — C+ · Guided Vine, no one-thing chip (clones stripped 2026-08-08)
- **UX:** home guided ol (Vine / Snap / iOS7) — **no** `data-ott-one-thing` chip.
- **Product:** Vine post, Snap Story, WhatsApp real.
- **Still worksheet:** 24 continuity clones (Uber, IE9, Medium, FB IPO, …).
- **Next:** add one-thing chip → Vine or Snap; do not treat clones as year products.

### 2014 — B+ · Slack real (clone forest stripped 2026-08-08)
- **One-thing:** Slack join + send (`itt14-slack`).
- **Signature:** WhatsApp install/chat, Heartbleed rotate ≥2, iPhone 6.
- **Still worksheet:** 26 clone plaques + **Yik Yak / Secret / Ello** (year-true but still checkbox).
- **Test:** `2014-slack-real` · `2014-real-flows`.

### 2015 — B+ · Discord send (clone forest stripped 2026-08-08)
- **One-thing:** join server + message (`itt15-discord-body`).
- **Signature:** Watch, Win10 free, Periscope, Photos, blockers.
- **Still worksheet:** same clone set as 2013–19.
- **Test:** one-thing 2015 · `2015-real-flows`.

### 2016 — B+ · Musical.ly post (clone forest stripped 2026-08-08)
- **One-thing:** caption → post (`itt16-musical`).
- **Signature:** IG Stories, Pokémon GO, Vine goodbye, E2E WA.
- **Test:** one-thing 2016.

### 2017 — A− · Netflix My List (clones stripped 2026-08-08)
- **One-thing:** tile → My List → save queue (`itt17-netflix`).
- **Also real:** Spotify free-tier, YT watch, Discord extras, AMP, Twitter 280.
- **Mock leftover:** thesis only · `netflix/streaming.html` is caption archive pointing at modern My List.
- **Test:** one-thing 2017 · `2017-real-flows`.

### 2018 — A · GDPR machine + gate (clones stripped 2026-08-08)
- **One-thing:** Manage → pattern + rights → Save → `itt18-gdpr`. Dual quiz panel **removed**.
- **Gate:** YouTube modern + Facebook feed blocked until consent.
- **Also real:** TikTok, IGTV, Netflix/Spotify/Discord modern.
- **Mock leftover:** thesis only.
- **Test:** `2018-gdpr-gate` · `2018-real-flows` · one-thing.

### 2019 — A− · Disney+ trial + P0/P1 machines (2026-08-08)
- **One-thing:** Start trial → `itt19-disneyplus`.
- **Signature:** stream wars, Apple TV+ Watch, Marshmello enter+watch, G+ dual-date chips, FTC amount+care.
- **Mock leftover:** thesis only.
- **Test:** one-thing 2019 · `test:e2e:2019`.

### 2020 — B · Zoom (clone forest stripped 2026-08-08)
- **One-thing:** Join + mute/camera → `itt20-zoom`.
- **Signature:** Reels, CCPA, Edge stable, TikTok EO, iPhone 12.
- **Worst leftover count:** **35** site `data-itt-real-save` + many `.ott-real` densify panels.
- **Test:** one-thing 2020 · `test:e2e:2020`.

---

## Cross-cutting leftovers (not year-specific)

1. **Thesis literacy on every About** — keep as exam *or* replace with “enter year” stamp (one click, no quiz).  
2. **Continuity forest 2013–2020** — same Uber/IE9/Medium/FB-IPO plaque copied forward. These are why late years *feel* mock even when P0 products are real.  
3. **2013 missing one-thing chip** — only guided list.  
4. **Dedicated product e2e missing** for Stumble, SO, Airbnb, SoundCloud, Discord 2015, Musical.ly, Disney+, Zoom (one-thing suite covers the gate only).  
5. **Costume vs storage** — Slack/MSN/Imgur/PointCast still look residual even though keys persist. Gold feel needs period chrome next, not more checkboxes.

---

**2017–2019 implement bible (research freeze 2026-08-08):** [`2017-2019-COMPLETE-TO-READY-DEEP-RESEARCH-2026-08-08.md`](2017-2019-COMPLETE-TO-READY-DEEP-RESEARCH-2026-08-08.md)  
**Minute how-to implement:** [`2017-2019-COMPLETE-TO-READY-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](2017-2019-COMPLETE-TO-READY-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) — C1 strip clones · C2 convert 2019 `.ott-real` · C3 2017 streaming leftover. **Implement on request.**

## Suggested next order (after this audit)

| Pri | Year | Why |
|-----|------|-----|
| 1 | **2017–2019 complete-to-ready** | Freeze done · C1–C3 raises Full% 67/72/61 → ~90+ |
| 1b | **2013–2020 clone plaques** | Same 24-room strip (2017–19 first if scoped) |
| 2 | **2013 one-thing chip → Vine** | Hole in the 1994–2020 chip row |
| 3 | **2014 YikYak / Secret / Ello** | Year-true but still quizzes |
| 4 | **2010 Cablegate / Groupon / Digg v4** | 3 leftover plaques on a museum-ready year |
| 5 | **2007 Kindle / Beacon / OpenSocial** | 4 leftover plaques |
| 6 | **Costume pass** | Slack, MSN, Imgur, PointCast, Stumble (look gold, already store gold) |

Do **not** rebuild one-thing rooms as new literacy cards.

---

## How to re-run this audit

```bash
# leftover product plaques
rg -l 'data-itt-real-save' years --glob '*.html' | grep -v pages/about

# one-thing still green
npx playwright test e2e/one-thing-per-year.spec.js --workers=1

# year tree health
python3 scripts/check-all-years.py
```

Update this file when a year’s leftover `data-itt-real-save` site count hits **0** (except thesis).
