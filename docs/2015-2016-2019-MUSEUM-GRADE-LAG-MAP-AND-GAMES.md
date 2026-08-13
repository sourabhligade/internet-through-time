# 2015 · 2016 · 2019 — Museum-grade lag map (minute detail)  
## Flows · UX · UI · links · experience · games / signature journeys

**Date:** 2026-08-13  
**Scope:** The three **uncommitted “done” years** on branch `museum/1994-2020-lean`  
**Purpose:** Exact where we lag behind **damn museum grade**, what to do next (minute steps), and **one game or famous flow** to implement per year.  
**Implement from (goals · phases · steps):** **[`2015-2016-2019-GOALS-PHASES-AND-STEPS-CLEAR.md`](2015-2016-2019-GOALS-PHASES-AND-STEPS-CLEAR.md)** ← operational playbook  
**Law:** localStorage theater only · incomplete REAL never writes · never invent brand pixels · year prefix only (`itt15` / `itt16` / `itt19`).

### Grade ladder (shared museum language)

| Level | Meaning |
|-------|---------|
| **Freeze** | Dual-cite · bans · calendar · artifacts |
| **MVP** | P0 rooms + About + shell boot + real e2e |
| **L3 densify** | Multipage P0 · trail pack · densify gems · shell honesty · e2e pack green · CAPTURE queue open OK |
| **L4 / damn museum** | CAPTURE OK or failed-final · clone-forest year-voice · residual stamps · shell OS/dirbar true · home progress · zero soft mocks · DISK-TRUTH promote · process:check |

### Snapshot (working tree · not git HEAD)

| Year | Claimed grade | e2e tests (approx) | Site forest dirs | CAPTURE | Home trail progress keys | Residual `data-itt-primary-year` | Shell dirbar truth | Git |
|------|---------------|-------------------:|-----------------:|---------|--------------------------|--------------------------------:|--------------------|-----|
| **2015** | L3 densify | **53** | ~147 | H15 **all open RECON** | **0** (cards lack `data-trail-keys`) | **0** | **Wrong** (Vine / IG Video / Stories / iPhone 5s / iOS 7 / Win8.1) | untracked tree |
| **2016** | L3 densify | **77** | ~152 | H16 **all open RECON** | **6** (T1–T6) | **0** | **Wrong** (same 2013-class dirbar as clone) | untracked tree |
| **2019** | Playable L3-ish · promote open | **71** | ~158 | H19 **queued RECON** | **6** (T1–T6) | **0** | **Fixed** (TikTok · Disney+ · Arcade · TV+ · iPhone 11 · Stadia) | untracked tree |

**Home links:** all three Starting Points resolve (0 missing hrefs on home).  
**Hub:** working unlocks 2015 · 2016 · 2019; HEAD still ends **2014**.  
**Gap years:** **2017 · 2018** not open (honest jump 2016→2019).

---

# Part 0 — Cross-year lag (all three share these)

These are the **shared “not damn museum yet”** problems. Fix once as patterns, apply per year.

## X-01 · CAPTURE / pixels = C tier forever until harvest

| Lag | Detail |
|-----|--------|
| What | Product rooms are CSS + text + geometric RECON. Asset folders exist; **no H* item marked OK**. |
| Why it hurts museum grade | Visitor “feels fake” next to real period press chrome. |
| Minute fix | For each H-ID in CAPTURE-LOG: (1) source URL + date, (2) drop file under `assets/period/YYYY/…`, (3) wire one `img` or `background`, (4) mark **OK** or **failed-final** + placard. |
| Done when | Every P0 room either has period still **or** explicit `RECON · not period pixel` placard logged failed-final. |

## X-02 · Clone forest (~150 site dirs) is earlier-year voice

| Lag | Detail |
|-----|--------|
| What | Amazon · Yahoo · Wikipedia · iPhone 5s · Win8.1 · etc. still carry **pre-spine** titles, prices, iOS versions, inbox copy. |
| Why | Scaffold clone from prior year; only P0 spine rewritten. |
| Minute fix | (A) Stamp `data-itt-primary-year="NNNN"` on residual rooms + residual-placard.js; (B) or hide forest from dirbar/bookmarks and route only spine; (C) long scrub: year-voice pass top 20 residual sites. |
| Done when | No dirbar/bookmark points at pre-year primary product as “current”; residual rooms announce primary year. |

## X-03 · Shell chrome lies (OS / browser / dirbar)

| Year | Body class today | Should feel like | Dirbar today |
|------|------------------|------------------|--------------|
| 2015 | `os-win7 browser-ie9` | Win10 free-upgrade era + Edge residual + Chrome habit | Vine · IG Video · Stories · iPhone 5s · iOS 7 · Win8.1 |
| 2016 | same | Win10 free **ended** · Chrome habit · Edge Spartan residual | same wrong bar |
| 2019 | same (dirbar **fixed**) | Win10 mass · Chrome habit · always-on | TikTok · Disney+ · … **OK** |

| Minute fix | Files |
|------------|-------|
| Rewrite dirbar `data-go` to year P0 only | `years/YYYY/index.html` |
| Align connect overlay thesis | same |
| Align inbox desktop message | same |
| Prefer CSS shell tokens for Win10 class if museum has them | `css/win*.css` / year body classes |
| e2e shell-honesty asserts dirbar hrefs | `e2e/YYYY-shell-honesty.spec.js` |

## X-04 · Residual placard never stamped

| Lag | `grep data-itt-primary-year` count = **0** on all three year trees. |
| Fix | `PROCESS_STAMP=1 npm run process:residual-stamp` **only for known maps** · or hand-stamp Watch residual on 2016/2019, Netflix residual on 2019, etc. |
| Done when | Opening residual Watch on 2016 shows chip “primary 2015”. |

## X-05 · Git / DISK-TRUTH / process gate

| Lag | Years untracked · DISK-TRUTH may still say hub ends earlier · process:check not claimed. |
| Fix | Owner commit decision · update DISK-TRUTH · `python3 scripts/check-all-years.py` · full year e2e · optional `npm run process:check`. |

## X-06 · Tour / next-CTA consistency

| Lag | Some rooms reveal `[data-ittNN-next]`; others dead-end; home cards on **2015** never mark ✓ done. |
| Fix | Universal next strip after REAL; home `data-trail-keys` + `bootHomeProgress` (2016/2019 pattern → port to 2015). |

---

# Part 1 — Year 2015

## 1.1 Thesis (locked)

**Wearables ship · free Win10 + Edge · go-live war · Apple Music · iOS 9 blockers · Google Photos** — site count **dips** after 1B (Live Stats June **863,105,652 · −11%** · users **3,185,996,155**).  
**Bans:** Instagram Stories / FB Reactions / TikTok / Chromium Edge as mass defaults.

## 1.2 Current grade (honest)

| Layer | Score | Evidence |
|-------|------:|----------|
| Freeze / scale | **A** | About dual-cite · bans · READ-FIRST |
| P0 product REAL | **A−** | Watch · Win10 · Edge · live apps · Music · blockers · Photos |
| Trail UX on home | **B−** | Cards exist · **no** `data-trail-keys` · no done marks |
| Multipage | **A−** | faces · pair · upgrade · about · live about · beats1 · library |
| Densify gems | **A−** | Peach · Discord · Discover · Secret · Messenger bots |
| Shell / dirbar | **D** | Clone dirbar 2013-class |
| Forest residual | **C** | ~147 dirs · unstamped |
| Pixels | **C** | H15-01…10 open |
| e2e | **A** | 53 tests · 6 packs |
| **Overall** | **L3 content · L4 shell/pixels lag** | Museum-ready for P0 play · not “damn” |

## 1.3 Flow map (as shipped) vs lag

| Trail / flow | Path(s) | Key | What works | Where we lag (minute) |
|--------------|---------|-----|------------|------------------------|
| **B Thesis** | `pages/about.html` | `itt15-thesis-ack` | Dual-cite · 2 checks · real-save | No 1B-dip narrative depth on home; ban list could name Chromium Edge explicitly like grade card |
| **T1 Wearable** | `apple/watch.html` · faces · pair | `itt15-watch` | face/band/shipped gate | Pair multipage may not require watch key (verify chain); faces page thin RECON; no home ✓ |
| **T2 Free OS** | `windows10/` · `edge/` | `itt15-win10` · `itt15-edge` | free upgrade honesty · Edge download→prefer | Win10 “ended 2016” not on 2015 page (good); Edge about may be thin; no combined trail key on one card |
| **T3 Go live** | Meerkat · Periscope · FB Live | `itt15-*-live` | title required · empty blocked | Home card only links **Meerkat** — Periscope/FB Live secondary; three apps feel parallel not one multipage war; no shared “live war complete” key |
| **T4 Privacy** | `ios9/blockers` · `googlephotos/` | `itt15-blockers` · `itt15-googlephotos` | literacy REAL | Library multipage optional; Photos RECON; no trail progress |
| **T5 Music** | `applemusic/` trial · beats1 | `itt15-applemusic` | trial REAL | Spotify residual voice weak; Beats 1 is mostly link literacy |
| **Gems** | Discover · Discord · Peach · Secret · bots | various | basic REAL | Discord early branding careful; Secret compose multi-step shallow; Messenger bots one panel |
| **Shell enter** | `/years/2015/` | — | boots | Dirbar wrong; `os-win7` class; inbox may say wrong year thesis |

### UX / UI lags (2015)

| ID | Lag | Visitor impact | Minute fix |
|----|-----|----------------|------------|
| 15-UX-01 | Trail cards **no** `data-trail-keys` | No ✓ progress | Add keys + `bootHomeProgress` in `year-2015-extras.js` (copy 2016) |
| 15-UX-02 | Dirbar Vine / Stories / iPhone 5s / iOS 7 / Win8.1 | Feels 2013 | Replace with Watch · Win10 · Edge · Periscope · Music · Photos · Chrome |
| 15-UX-03 | Go-live trail starts at Meerkat only | Misses Periscope primary | Home T3 → Periscope index · chain Meerkat · FB Live |
| 15-UX-04 | CSS theater only (no period stills) | Flat product rooms | H15 CAPTURE wire |
| 15-UX-05 | Watch faces/pair may not share step UI | Weak multipage | Step rail like 2016 GO `data-pogo-steps` |
| 15-UX-06 | Tour module generic | Low year voice | Year-specific tour chips on home |
| 15-UX-07 | `cool.html` / error pages clone voice | Dead ends feel old | Light year stamp |

### Links / experience lags (2015)

| ID | Lag | Fix |
|----|-----|-----|
| 15-L-01 | Dirbar targets pre-2015 products as current | Shell dirbar rewrite + e2e |
| 15-L-02 | Bookmarks in `js/config/2015.js` may still list old spine | Align defaultBookmarks to P0 |
| 15-L-03 | Continuity archive (WhatsApp deal · Heartbleed · Ice Bucket · iPhone 6) good | Add residual placard primary years |
| 15-L-04 | No all-flows multipage e2e like 2019 | Add `e2e/2015-all-flows-check.spec.js` for Watch pair · Edge prefer · live empty |

## 1.4 Path to damn museum grade (2015) — ordered work

### Wave A — Shell truth (½–1 day)

1. `years/2015/index.html` dirbar → Start · Watch · Win10 · Edge · Periscope · Music · Photos · Chrome.  
2. Connect overlay: Watch ships · free Win10 · go live · Music · Photos · −11%.  
3. Inbox desktop string 2015 thesis.  
4. e2e shell-honesty: assert dirbar + not Vine/iOS7 primary.  
5. Optional body class toward Win10-era if CSS exists (do not invent Win11).

### Wave B — Home trail parity with 2016/2019 (½ day)

1. Add `data-trail-keys` on each card:
   - T1 `itt15-watch`
   - T2 `itt15-win10,itt15-edge`
   - T3 pick primary live key or require all three live keys
   - T4 `itt15-blockers,itt15-googlephotos`
   - T5 `itt15-applemusic`
   - Gems optional separate strip  
2. Port `bootHomeProgress` into `year-2015-extras.js`.  
3. densify e2e: done marks after seed keys.

### Wave C — Flow depth (1–2 days)

| Flow | Minute depth |
|------|----------------|
| Watch | require face + band + shipped · pair requires watch key · faces page lists saved face |
| Edge | enforce download before prefer (already pattern) · about page Spartan literacy e2e |
| Live war | one lobby page linking 3 apps · “war complete” when ≥2 live keys |
| Photos | backup → library list from storage |
| Music | trial → Beats 1 ack multipage |

### Wave D — CAPTURE H15 (open-ended)

H15-01 Watch · H15-02 Win10 · H15-03 Edge · H15-04 Periscope · H15-05 Music · H15-06 Photos · H15-07 blockers · H15-08 Discover.

### Wave E — Forest residual (days–weeks)

Stamp top residuals; scrub Amazon/Yahoo only if owner wants year-voice.

### Wave F — Promote

Update DISK-TRUTH · MUSEUM-GRADE residual = L4 only pixels/forest · commit.

## 1.5 Signature **game or famous flow** for 2015

### Primary pick (recommended): **Famous flow — Windows 10 free upgrade “Get Windows 10” / reserve theater**

| Field | Spec |
|-------|------|
| **Why 2015** | Defining mass OS event of the year · free upgrade offer · GWX tray culture · Jul 29 2015 general availability class |
| **Not** | Invent Win11 · invent paid-only 2015 |
| **Museum path** | Expand `sites/windows10/` beyond upgrade: `gwx.html` (tray nag literacy) · `upgrade.html` (reserve) · `index.html` (shipped free class) |
| **Steps (REAL)** | 1) Check “free for eligible Win7/8.1” · 2) Check “not forced invent” honesty · 3) Reserve / start upgrade theater → `itt15-win10` · 4) Optional Edge hop |
| **Storage** | `itt15-win10` `{reserved, freeOffer:true, multiStep, real, ts}` |
| **UI** | Blue Win10 panel · “Get Windows 10” word RECON · not invent Start11 |
| **e2e** | incomplete checks block · full multipage writes key |

### Alternate **game** (if you want a game room): **Fallout Shelter** (free mobile · Jun 2015)

| Field | Spec |
|-------|------|
| **Why** | Huge free mobile hit tied to Fallout 4 year · vault-building literacy |
| **Path** | `sites/falloutshelter/index.html` (new) · not replace P0 |
| **Steps** | Assign dwellers to power/food/water · one incident · save vault state → `itt15-foshelter` |
| **Honesty** | Mobile game theater · no real Bethesda assets invent · RECON vault grid |
| **Priority** | **P1 densify** after Wave A–C — not required for L3 claim |

### Do **not** implement as 2015 mass defaults

Pokémon GO (2016) · Fortnite free BR (2017) · Instagram Stories mass (2016).

---

# Part 2 — Year 2016

## 2.1 Thesis (locked)

**Stories · outdoor AR · Reactions · jack death · AirPods · Vine end · musical.ly · WA E2E** — sites **1,045,534,808 (+21%)** · users **3,424,971,237** · 1B restabilized Mar 2016.  
**Bans:** TikTok brand · Meta · Reels · Chromium Edge · Face ID / iPhone X.

## 2.2 Current grade (honest)

| Layer | Score | Evidence |
|-------|------:|----------|
| Freeze / bible / harvest | **A** | Full doc pack + improvement plan |
| P0 REAL multipage | **A** | GO 4-page · Stories · Reactions · jack · AirPods pair · Vine · m.ly · WA |
| P1 densify | **A−** | Allo · Rift · LinkedIn · Win10 end · Spectacles · Switch · Edge 2-step |
| Home progress | **A** | `data-trail-keys` + done marks |
| Shell / dirbar | **D** | **Still Vine / Stories / iPhone 5s / Win8.1** (worse than 2019) |
| Forest residual | **C** | ~152 dirs · 0 primary-year stamps |
| Pixels | **C** | H16 open |
| e2e | **A** | **77** tests |
| Wave 1–2 plan | **Mostly done** | Snap voice · m.ly list · etc. (see improvement plan) |
| **Overall** | **Strongest of the three for product depth** · shell/pixels hold it back |

## 2.3 Flow map vs lag

| Trail | Path | Key | Works | Lag (minute) |
|-------|------|-----|-------|--------------|
| **T1 Stories war** | IG Stories → Snap residual | `itt16-ig-stories` · snap | Multi-step · competitor copy improved | Snap still not first-class trail card; Discover residual thin |
| **T2 Outdoor AR** | pogo index→team→catch→battery | `itt16-pogo*` | Best multipage in museum | No real map pixels; server-fail lore optional; battery page can feel bolted on |
| **T3 Reactions** | `facebook/reactions.html` | `itt16-reactions` | Pick + save | Single page · no feed multipage; emoji RECON not brand tray |
| **T4 Phone autumn** | jack → AirPods → pair | jack · airpods | Gates good | iPhone index still 5s/ios7 forest; AirPods product still geometric |
| **T5 Six-second end** | Vine goodbye → musical.ly | vine-end · musically | Brand ban TikTok held | musical.ly create vs index list must stay wired; no “download app” multipage |
| **T6 Trust** | WA E2E · Allo | wa-e2e · allo | Literacy REAL | Allo soft-reply needs require-field discipline (already hardened in tests) |
| **P1** | Rift · LinkedIn · Switch · Spectacles · Win10 end · Edge | various | Load + REAL | Switch is announce-only (good); Rift not Quest (good); densify UI uneven |

### UX / UI / links lags (2016)

| ID | Lag | Minute fix |
|----|-----|------------|
| 16-UX-01 | **Dirbar still 2013-class** | Start · Stories · GO · Reactions · jack · AirPods · Vine · WA · Chrome |
| 16-UX-02 | Shell `os-win7` / free upgrade **ended** copy only on site not shell | Connect + Win10 room cross-link “offer ended Jul 29” |
| 16-UX-03 | iPhone forest pre-7 as default index | `iphone/index.html` redirect or banner “2016 → jack.html” |
| 16-UX-04 | Facebook forest (ipo, 2004 open) as residual | Stamp primary years · reactions is P0 only |
| 16-UX-05 | CAPTURE H16-01…10 open | Harvest Stories ring · GO map · Reactions tray · AirPods |
| 16-UX-06 | No residual placard on Watch/Music archive links | Stamp 2015 |
| 16-UX-07 | Map page depends on flow-maps seed | Verify map title says 2016 Stories/GO not 2015 |
| 16-L-01 | Bookmarks/locationHints may still prioritize old | Align to P0 (partially done) |

## 2.4 Path to damn museum grade (2016)

### Wave A — Shell (must; ½ day)

Same as 2015 Wave A but P0 targets: Stories · GO · Reactions · jack · AirPods · Vine · WA · Chrome.  
e2e: **fail if dirbar contains iOS 7 or Win8.1 as primary.**

### Wave B — Finish improvement-plan Wave 3 items only

1. CAPTURE H16.  
2. Forest badge/scrub top 15 residuals.  
3. Optional election/platform literacy **careful** room (mechanics only).  

### Wave C — GO L4 depth (optional damn)

| Step | Detail |
|------|--------|
| Map RECON | Static grid “nearby” not GPS invent |
| Gym/raid literacy | One page · not invent 2018–19 raids as 2016 day-one without cite |
| Battery chain | require catch before battery save (already partial) |

### Wave D — Promote + commit

DISK-TRUTH · grade card residual list = CAPTURE/forest only.

## 2.5 Signature **game** for 2016 (already P0 — deepen, don’t replace)

### **Pokémon GO** (Jul 6 2016) — the year’s game · keep as T2

| Field | Spec |
|-------|------|
| **Status** | Already museum P0 multipage |
| **Damn-grade deepen** | (1) location honesty → (2) team Mystic/Valor/Instinct → (3) catch species list with RECON sprites only if CAPTURE OK · else shapes → (4) battery drain → (5) optional “server busy” flash honesty |
| **Do not invent** | Remote raids · Adventure Sync · Ticketed GO Fest as 2016 default |
| **Storage** | Keep `itt16-pogo` · `pogo-loc` · `pogo-team` · `pogo-catches` |
| **UI minute** | Team colors blue/red/yellow · step rail on every page · Next CTAs always visible after gate |
| **e2e** | Full multipage already · add assert team class `is-on` persists |

### Alternate famous non-game flow (already P0)

**Instagram Stories (Aug 2 2016)** — keep T1; damn-grade = CAPTURE story ring + sticker chips + Snap residual war card on home.

### Alternate second game (P1 only)

**Overwatch** (May 24 2016) — hero pick + quick play theater · **do not** displace GO as signature.

---

# Part 3 — Year 2019

## 3.1 Thesis (locked)

**TikTok For You · Disney+ · Arcade · TV+ · AirPods Pro · iPhone 11 · Stadia** — websites table **ends 2018 at 1,630,322,579** · ITU **~4.1B · 53.6%**.  
**Bans:** COVID mass · Reels-as-2019 · Clubhouse · Meta rebrand · invent 2019 Live Stats June row · Stadia shutdown as day-one.

## 3.2 Current grade (honest)

| Layer | Score | Evidence |
|-------|------:|----------|
| Freeze / harvest / goals / bible | **A** | Full pack + detailed phases |
| P0 multipage REAL | **A** | All T1–T6 multipage + gates |
| P1 | **B+** | FTC $5B · residuals linked · Netflix residual still old forest |
| Home progress | **A** | trail keys + done |
| Shell dirbar | **A−** | Fixed to P0 · body still `os-win7 browser-ie9` |
| Forest residual | **C−** | ~158 dirs · reactions/jack still present as if current |
| Pixels | **C** | folders empty-ish · H19 queued |
| e2e | **A** | **71** incl. all-flows-check |
| Gap honesty | **B** | 2017–18 missing on hub — OK if labeled |
| **Overall** | **Playable L3 product spine** · promote blocked by CAPTURE + forest + DISK-TRUTH |

## 3.3 Flow map vs lag

| Trail | Path | Key | Works | Lag (minute) |
|-------|------|-----|-------|--------------|
| **T1 TikTok** | index · create · about | `itt19-tiktok` | Caption+checks · list · create shares key | No scroll FYP rail animation; sound chips RECON; no CAPTURE logo; For You is text list not vertical video theater |
| **T2 Disney+** | join · queue · about | `itt19-disneyplus` | Plan gate · queue needs join | No profiles multipage; no day-one 10M banner on join; catalog is select not tiles; brand navy RECON only |
| **T3 Arcade** | trial · play · about | `itt19-arcade` | Game select · play requires trial | Games list invent-careful titles; no offline download step UI; $4.99 not always on page |
| **T4 Hardware** | iphone11 · airpodspro · pair | iphone11 · airpods-pro | Color field · ANC · pair | Home said dual cam (fixed); iPhone forest still jack/ios7; Pro Max not default (good) |
| **T5 Stadia** | claim · stream · about | `itt19-stadia` | Tier · stream multipage | Founder’s kit RECON; must keep shutdown ban; no Chromecast Ultra pair page |
| **T6 TV+** | start · watch · about | `itt19-appletv` | Originals · progress | Thin originals list; free-year hardware literacy on watch page only |
| **P1 FTC** | `facebook/ftc-fine.html` | `itt19-ftc-fine` | REAL | Not on trail cards; Facebook forest still 2004-class pages |
| **Thesis** | about | thesis-ack | dual-cite honest | Could surface 53.6% on home lead too |

### UX / UI / links lags (2019)

| ID | Lag | Minute fix |
|----|-----|------------|
| 19-UX-01 | Shell still `os-win7 browser-ie9` | Soften labels to Win10/Chrome class if assets allow |
| 19-UX-02 | Netflix/Spotify/IG residual = old product UI | Residual placard + 2019 streaming-war one-liner |
| 19-UX-03 | Facebook `reactions.html` still in forest | Banner “not 2019 primary · see FTC / trails” |
| 19-UX-04 | TikTok vertical theater missing | CSS phone frame + caption overlay RECON (no invent logo) |
| 19-UX-05 | Disney+ lacks profile pick | Optional `profiles.html` multipage before queue |
| 19-UX-06 | CAPTURE H19 all queued | Wire Apple/Disney/Google press packages |
| 19-UX-07 | No hub note for 2017–18 gap | Hub microcopy “2017–18 research gap · jump to 2019” |
| 19-L-01 | `iphone/index.html` still pre-11 default | Banner → iphone11.html |
| 19-L-02 | Bookmarks may still list residual first | Already improved; re-check config |
| 19-L-03 | Grade card not “L3 promote” formal | After CAPTURE + DISK-TRUTH |

## 3.4 Path to damn museum grade (2019)

### Wave A — Honesty polish (½ day)

1. Hub gap label 2017–18.  
2. Stamp residuals Netflix/IG/AirPods gen1.  
3. iPhone index → 11.  
4. Facebook non-FTC pages residual banner.  
5. Home lead: 53.6% + 2018 table end.

### Wave B — Product theater depth (1–2 days)

| Product | Add |
|---------|-----|
| TikTok | Phone bezel UI · sound on chip · duet literacy line |
| Disney+ | Profile pick · Watchlist tiles from queue · Nov 12 banner |
| Arcade | Price $4.99 · Family Sharing check · play session timer theater |
| TV+ | Free year with hardware check · episode 1 progress % |
| Stadia | Founder’s kit checklist · latency honesty slider (not real net) |
| AirPods Pro | Transparency vs ANC toggle theater after pair |

### Wave C — CAPTURE H19 + promote

Wire stills · mark OK/failed-final · update MUSEUM-GRADE · DISK-TRUTH · commit.

### Wave D — Optional densify products (only with harvest)

| Product | Cite need |
|---------|-----------|
| Instagram shopping / checkout early | careful |
| WWDC SwiftUI literacy | optional |
| Libra / crypto **literacy only** | no wallet buy UI |
| **Apex Legends** (game — see below) | Feb 2019 |

## 3.5 Signature **game** for 2019

### Primary pick: **Apex Legends free BR drop theater** (Feb 4 2019)

| Field | Spec |
|-------|------|
| **Why 2019** | Sudden free-to-play battle royale explosion · EA/Respawn · same year as streaming/cloud stack |
| **Relation to spine** | **P1 densify game** — does not replace Arcade/Stadia (those are service launches) |
| **Path** | `years/2019/sites/apex/index.html` · `drop.html` · `squad.html` |
| **Steps (REAL)** | 1) Literacy: free-to-play · not invent Warzone-as-2019 · 2) Pick legend class (RECON names only with care / generic classes if legal nervous) · 3) Drop zone text · 4) Squad fill checks → `itt19-apex` |
| **Storage** | `itt19-apex` `{legend, drop, multiStep, real, launch:"2019-02-04"}` |
| **Honesty** | No invent later seasons as day-one; no real EA logos invent — CAPTURE or RECON placard |
| **e2e** | empty drop blocked · incomplete squad blocked · full save |

### Already-on-spine games (deepen, don’t duplicate)

| Product | Role |
|---------|------|
| **Apple Arcade** (Sep 19) | Subscription games service — keep T3 |
| **Stadia** (Nov 19) | Cloud try — keep T5 · **not** invent shutdown |

### Famous non-game flow (if you skip new game)

**Disney+ launch night** (Nov 12) — already T2; damn-grade = profiles + queue + day-one load honesty.

---

# Part 4 — Side-by-side: what “done damn museum” means

| Criterion | 2015 now | 2016 now | 2019 now | Damn target |
|-----------|----------|----------|----------|-------------|
| Dual-cite About | ✅ | ✅ | ✅ | ✅ + home echo |
| All P0 multipage REAL | ✅− | ✅ | ✅ | ✅ + next CTAs everywhere |
| Home trail ✓ progress | ❌ | ✅ | ✅ | ✅ |
| Shell dirbar = year spine | ❌ | ❌ | ✅ | ✅ |
| CAPTURE P0 stills | ❌ open | ❌ open | ❌ queued | OK or failed-final |
| Residual stamps | ❌ | ❌ | ❌ | ✅ top 20 |
| Forest year-voice | ❌ | ❌ | ❌ | partial OK |
| e2e multipage gates | good | best | best+all-flows | keep green |
| Signature game depth | Win10 flow / optional Shelter | **GO** deep | Arcade+Stadia · optional Apex | one polished game journey |
| DISK-TRUTH / commit | ❌ | ❌ | ❌ | ✅ |
| Hub gap 2017–18 | n/a | n/a | unlabeled | labeled |

---

# Part 5 — Priority roadmap (if only one engineer)

```
Week 1 — Shell truth
  2015 dirbar + connect + inbox
  2016 dirbar + connect + inbox
  2019 body/OS label polish + hub gap label
  e2e shell-honesty each year green

Week 2 — Home + residual pattern
  2015 data-trail-keys + bootHomeProgress
  residual placard stamp known rooms (Watch@2016, Netflix@2019, …)
  iPhone index banners (2016→jack, 2019→11)

Week 3 — Signature deepen
  2015: GWX / free upgrade multipage polish
  2016: GO step-rail + CAPTURE one still if possible
  2019: TikTok phone frame + Disney+ profiles OR Apex P1

Week 4+ — CAPTURE batch + forest top-20 + DISK-TRUTH + commit
```

### Effort vs museum impact

| Work | Impact | Effort |
|------|--------|--------|
| Fix dirbar 2015+2016 | **Very high** | Low |
| 2015 home trail keys | High | Low |
| Residual placards | High honesty | Low–med |
| CAPTURE one still per P0 | High “looks museum” | Med–high (legal/source) |
| Full forest scrub | High completeness | **Very high** |
| New Apex room | Medium novelty | Med |
| Fallout Shelter 2015 | Medium novelty | Med |
| GO L4 map theater | High for 2016 | Med |

---

# Part 6 — Per-year “do this next” checklist (copy/paste)

## 2015 next 10

1. [ ] Dirbar P0 rewrite  
2. [ ] Connect + inbox 2015 thesis  
3. [ ] `data-trail-keys` + home progress boot  
4. [ ] Go-live home card → Periscope first  
5. [ ] Watch pair requires `itt15-watch`  
6. [ ] Edge prefer requires download (assert e2e)  
7. [ ] Bookmarks = P0 only  
8. [ ] H15-01 Watch still or failed-final  
9. [ ] Residual stamp 2014 archive links  
10. [ ] Optional: GWX free-upgrade famous flow polish  

## 2016 next 10

1. [ ] Dirbar P0 rewrite (critical)  
2. [ ] Connect + inbox 2016 thesis  
3. [ ] iPhone index → jack banner  
4. [ ] Stamp 2015 residuals on home archive  
5. [ ] H16-01 Stories ring or failed-final  
6. [ ] H16-02 GO still or failed-final  
7. [ ] GO step rail on all multipage  
8. [ ] Snap residual on home as T1b chip  
9. [ ] musical.ly index list still renders (regression guard)  
10. [ ] Optional: Overwatch P1 **or** deepen GO only  

## 2019 next 10

1. [ ] Hub 2017–18 gap label  
2. [ ] iPhone index → 11 banner  
3. [ ] Residual stamps Netflix/IG/AirPods gen1  
4. [ ] TikTok phone-frame UI  
5. [ ] Disney+ profiles multipage  
6. [ ] Arcade $4.99 + Family Sharing check  
7. [ ] H19 Disney+ / TikTok / AirPods Pro stills  
8. [ ] Formal MUSEUM-GRADE L3 promote language after CAPTURE  
9. [ ] Optional: **Apex Legends** P1 drop theater  
10. [ ] DISK-TRUTH + commit with 2015/2016  

---

# Part 7 — Signature map (one line each)

| Year | Signature journey (implement or deepen) | Type |
|------|------------------------------------------|------|
| **2015** | **Windows 10 free upgrade / GWX reserve theater** (primary) · optional **Fallout Shelter** vault (P1 game) | Famous OS flow · optional game |
| **2016** | **Pokémon GO** multipage AR literacy (primary game of the internet that year) · **Stories war** as co-signature social flow | Game + social flow |
| **2019** | **Disney+ launch stack** (famous flow) · **Apple Arcade / Stadia** (service games) · optional **Apex Legends** free BR drop (P1 game) | Streaming + games |

---

# Part 8 — Definition: “damn museum grade” for these three

You may claim **damn museum grade** for a year only when:

1. **All P0 trails** multipage REAL · incomplete never writes · e2e all-flows green.  
2. **Shell dirbar + connect + inbox** speak **that year’s spine only**.  
3. **Home** trail ✓ progress works.  
4. **CAPTURE**: every P0 has OK still **or** failed-final placard (no silent fake).  
5. **Residuals** stamped or de-linked from primary navigation.  
6. **Signature game/flow** is multipage, cited, and tested.  
7. **DISK-TRUTH + hub** match disk · year committed or explicitly branch-noted.  
8. **No soft mock** one-click success on any spine action.

**Today:**  
- **2016** closest on **product depth**.  
- **2019** closest on **test rigor + dirbar**.  
- **2015** strongest early L3 content but **weakest shell + home progress**.  
- **None** are damn-complete until CAPTURE + shell (2015/2016) + residual stamps + promote.

---

*End of lag map. Implement from Wave A shell first — highest visitor impact per hour.*
