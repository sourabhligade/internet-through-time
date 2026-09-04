# 2003 Museum-Grade Research + Codebase Audit

> **IMPLEMENTATION STATUS (recheck 2026-07-27):** Densify **implemented**.  
> Bugs B1–B4 fixed · multi-page P0 · Bloglines · continuity · Facemash footnote · `test_2003_museum` · e2e **16/16**.  
> Live status: [`2003-MUSEUM-GRADE.md`](2003-MUSEUM-GRADE.md). Residual: M5 WA pixels · optional M8 Flash.  
> Sections below that describe “thin rooms / Bloglines missing / bugs open” are the **pre-implement audit snapshot**.

**Date:** 2026-07-27  
**Goal:** Take **shipped MVP 2003** → **museum grade** (parity with 2002 full-year densify: authenticity, pixels, multi-page rooms, e2e breadth, docs honesty).  
**Mode:** Full re-read of local 2003 pack · disk audit of `years/2003` + assets + modules · re-visit of primary narrative/company/WA sources · actionable harvest queue.

| Companion | Role |
|-----------|------|
| [`2003-DEEP-RESEARCH-2026-07-26.md`](2003-DEEP-RESEARCH-2026-07-26.md) | MVP deep research (still valid for facts) |
| [`2002-TO-2003-HANDOFF-DEEP-RESEARCH-2026-07-26.md`](2002-TO-2003-HANDOFF-DEEP-RESEARCH-2026-07-26.md) | Scaffold deltas from shipped 2002 |
| [`2003-MUSEUM-GRADE.md`](2003-MUSEUM-GRADE.md) | Ship status card (**museum densify complete**) |
| [`2003-IMPLEMENTATION-PHASES.md`](2003-IMPLEMENTATION-PHASES.md) | Build bible |
| [`2002-MUSEUM-GRADE.md`](2002-MUSEUM-GRADE.md) | **Bar** for “museum grade” |
| [`2003-WEB-SURF-RESEARCH-2026-07-27.md`](2003-WEB-SURF-RESEARCH-2026-07-27.md) | **Deep web-surf source log** (this pass) |
| [`references/2003/CAPTURE-LOG.md`](references/2003/CAPTURE-LOG.md) | Visit + harvest log |
| [`references/2003/ASSETS.md`](references/2003/ASSETS.md) | Pixel provenance |
| [`references/2003/ARTIFACTS.md`](references/2003/ARTIFACTS.md) | Room inventory |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | Playable years |

**Status legend:** `[visited]` live · `[wa-visited]` Wayback `id_` · `[secondary]` · `[queued]` harvest · `[bug]` disk defect · `[gap]` missing vs museum bar

---

## 0. Executive summary

| Question | Answer |
|----------|--------|
| Is 2003 playable? | **Yes** — hub unlocked · 204 HTML · P0 theaters live · gates green |
| Is 2003 museum grade? | **No** — thin signature rooms · P0 logos RECON · missing Bloglines · only 1 e2e file · docs claim wipe while disk is full · 2 fact/honesty bugs |
| What blocks museum grade? | Pixel harvest + densify multi-page P0/P1 + authenticity fixes + e2e expansion + docs re-sync |

**One-line thesis (reconfirmed 2026-07-27):**  
2003 = social graphs go mass + **99¢** legal music + open self-host blogs + pro networks + AdSense economics — still pre-Facebook product, pre-Gmail, pre-Firefox 1.0, pre-YouTube.

---

## 1. What “museum grade” means here (2002 bar)

From [`2002-MUSEUM-GRADE.md`](2002-MUSEUM-GRADE.md):

| Criterion | 2002 | 2003 MVP (disk 2026-07-27) | Gap |
|-----------|------|----------------------------|-----|
| Hub unlocked | Yes | Yes | — |
| Smoke / urlMap | 193 | **204** | OK |
| Authenticity suites | 40/40 incl. p2-pixels | signature · urlmap · densify · continuity only | Need museum suite |
| E2E breadth | **4** specs · **37/37** | **1** spec · **8/8** | Major |
| P0 rooms multi-page densify | Yes | Thin (often 1–3 short HTML) | Major |
| Phase 9 pixels | RECON densify labeled | RECON for signatures · few `*-wa` | Major |
| P1 rooms | Daypop · Technorati · Phoenix honesty | AdSense live; **Bloglines missing**; Firebird **wrong** | Medium–High |
| Docs match disk | Yes | CAPTURE/ASSETS/ARTIFACTS still say **wiped/empty** | High |

---

## 2. Docs inventory (visited)

| Doc | Status on re-read | Trust for build? |
|-----|-------------------|------------------|
| `2003-DEEP-RESEARCH-2026-07-26.md` | Strong facts + visit log; still says “wiped” at top | **Yes** for thesis/timeline/room kits; ignore disk-empty banner |
| `2002-TO-2003-HANDOFF…` | Correct scaffold deltas | **Yes** |
| `2003-RESEARCH.md` | Matches thesis; hub chip stale (“Rebuild”) | Partial |
| `2003-MUSEUM-GRADE.md` | Honest **MVP shipped** | Yes as status |
| `2003-IMPLEMENTATION-PHASES.md` | Phases R–8/10–11 complete; Phase 9 open; acceptance checkboxes **unchecked** (stale) | Fix checkboxes |
| `references/2003/CAPTURE-LOG.md` | Says disk empty — **stale** | Update this pass |
| `references/2003/ASSETS.md` | Says tree empty — **stale** | Update this pass |
| `references/2003/ARTIFACTS.md` | Build targets only — **stale** | Update this pass |
| `DISK-TRUTH.md` | 2003 MVP shipped · hub open 1994–99 + 2001–03 | **Yes** |
| `LEFT-TO-DO-STEP-BY-STEP.md` | Claims 2003–05 restored + hub 1994–2005 — **stale vs hub** (2004–05 locked) | Do not trust for hub |
| `NOSTALGIA-UI-SOURCES-DETAILED.md` | General UI sources; little 2003-specific | Use WDM + WA method |

---

## 3. Live codebase audit (2026-07-27)

### 3.1 Tree scale

| Item | Count / note |
|------|----------------|
| `years/2003/**/*.html` | **204** |
| `years/2003/sites/*` | **~58** room dirs |
| `assets/period/2003/**` | **106** files |
| Signature modules | myspace · itunes · wordpress · linkedin · adsense (registry OK) |
| E2E | `e2e/2003-mvp.spec.js` only |
| Period CSS | `css/period-2003.css` (myspace-shell · itunes-store present) |

### 3.2 P0 room densify (bytes = signal)

| Room | Pages | ~Bytes | Immersion | Verdict |
|------|-------|--------|-----------|---------|
| MySpace | 2 | ~4.3k | 91-line `myspace.js` | **Thin** — home densify OK; profile form only; no invite / about / browse friends pages |
| iTunes Store | 1 | ~2.3k | 49-line `itunes.js` | **Thin** — single page; genres are no-op links; no charts / album / FairPlay authorize page |
| WordPress | 3 | ~3.1k | 59-line | **Thin** — marketing + dash + blog stubs; no install wizard multi-step |
| LinkedIn | 3 | ~3.4k | 99-line | **Thin** — home + profile + connections; no jobs / invite form page |
| AdSense | 1 | ~1.5k | 30-line | **Thin** — single signup theater |
| Home / About | 2 | ~6.5k | tour spine OK | **Good thesis** |

### 3.3 Continuity rooms (fork residue)

Heavy Amazon/Yahoo/Wiki/CNN pages exist (fork from 2002) — good continuity bulk.  
**Risk:** many pages are thin stubs (`find … -size -1500c` → 70+ files) — museum polish should densify **signature** first, not every 2001 leftover.

### 3.4 Asset honesty

| Class | Examples | Notes |
|-------|----------|-------|
| **WA** on disk | `google/logo-wa.gif` · `amazon/logo-smile-wa.gif` · `blogger/logo-wa.gif` · `yahoo/main33-wa.gif` · `wikipedia/logo-wa.*` | Continuity from prior years |
| **RECON** (labeled) | `myspace/*` · `itunes/*` · `wordpress/*` · `linkedin/*` · `adsense/*` · `xp/*` · `apple/ipod-*-recon` | `README-PIXELS.txt` + MySpace AUTH readme honest |
| **Missing** | Bloglines brand · Firebird brand · MySpace WA Tom/logo · iTunes Store WA chrome · LinkedIn WA wordmark · WP early logo WA | Harvest queue §6 |

### 3.5 Bugs / honesty defects (`[bug]`)

| ID | Location | Issue | Fix for museum grade |
|----|----------|-------|----------------------|
| **B1** | `sites/blogger/index.html` footer | Footer still **“Powered by Pyra”**; yellow note says *“Google acquisition … do **not** claim Google ownership here”* — **inverted for 2003** | Claim **Blogger · Google (acquired Feb 2003)**; keep Pyra as history only |
| **B2** | `sites/phoenix/index.html` | “Phoenix 0.1 **Released September 23, 2003**” | Phoenix **0.1 = 2002-09-23**; **2003 brand = Firebird** (rename Apr 2003). Retitle room Firebird path; ban Firefox 1.0 |
| **B3** | `sites/friendster/index.html` | “founded in **2003**” | Founded **2002**; **public mass Mar 2003**. Authenticity test looks for `"Founded 2003"` capital-F — **misses** this lowercase error |
| **B4** | `js/config/immersion-2003.js` `features{}` | Flags omit myspace/itunes/wordpress/linkedin/adsense (registry still loads them) | Align flags with registry for honesty |
| **B5** | References CAPTURE/ASSETS/ARTIFACTS | Claim empty wipe | Re-sync (this pass) |
| **B6** | `2003-IMPLEMENTATION-PHASES` acceptance | Checkboxes still open despite ship | Mark MVP acceptance done |

### 3.6 Missing rooms vs research P1

| Target | Research | Disk |
|--------|----------|------|
| Bloglines | P1 browser RSS mid-2003 | **Absent** |
| Firebird product honesty | Phoenix→Firebird 2003 | Phoenix-only wrong date |
| CNN music wire (KaZaA vs 99¢) | P1 densify | CNN pages exist; napster-story continuity — **verify** Store contrast copy |
| Facemash footnote | P2 / About only | Not present |
| Flash showcase (BowieNet/FWA) | P2 optional | Not densified |

### 3.7 Gates today

| Gate | Result |
|------|--------|
| Authenticity | `2003-signature` · `urlmap` · `densify` · `continuity` |
| E2E | `2003-mvp` 8 tests (hub · shell · home · MS · iTunes · WP · LI · AdSense) |
| Smoke | Documented green (urlMap 204) |

**Museum needs:** `test_2003_museum` (bans + blogger-google + firebird + no streaming + friendster founded 2002) · e2e buttons/links/pixels like 2002.

---

## 4. Source re-visit (2026-07-27)

### 4.1 Narrative `[visited]`

| # | URL | Key facts reconfirmed |
|---|-----|------------------------|
| 1 | https://cybercultural.com/p/internet-2003/ | Blogging mainstream; Google buys Blogger Feb; AdSense Mar→Jun self-serve; Friendster public Mar ~3M fall; MySpace Aug; iTunes Store Apr 99¢ AAC Mac→Win Oct; 25M songs Dec; Bloglines mid-2003; Flash peak; Facemash late-2003 footnote only |
| 2 | https://cybercultural.com/p/myspace-2003/ | eUniverse; **Aug 15** narrative launch; HTML custom; Tom HTML blog Oct; ~100k Oct vs Friendster ~3M; Fakesters contrast |
| 3 | https://www.internetlivestats.com/total-number-of-websites/ | **40,912,332** sites · **~778.6M** users (prior pack; still canonical for labels) |

### 4.2 Company primaries `[visited]`

| # | URL | Verified |
|---|-----|----------|
| 4 | https://www.apple.com/newsroom/2003/04/28Apple-Launches-the-iTunes-Music-Store/ | Apr 28 2003 · **99¢** · no subscription · 200k+ songs · AAC 128k · 30s previews · burn personal CDs · unlimited iPods · **3 Macs** · **Mac OS X + iTunes 4 only** · U.S. billing |
| 5 | https://www.apple.com/newsroom/2003/12/15iTunes-Music-Store-Downloads-Top-25-Million-Songs/ | Prior pack: **25M** songs · **400k+** catalog · Windows path · gifts/Allowance Oct 16 |
| 6 | Mozilla / Firebird history (Mozilla blog + secondary) | Phoenix **0.1 = 2002-09-23**; renamed **Firebird Apr 14 2003**; Firefox name 2004 — **fixes bug B2** |

### 4.3 Wayback bodies `[wa-visited]` this pass

| # | Capture | Content |
|---|---------|---------|
| 7 | `20031008115927` myspace.com/misc/about.html | “meet your friends' friends” · photos journals · Sign Up · Invite · View connections · “for everyone” list · new site developing fast |
| 8 | `20030618021947` wordpress.org | “semantic personal publishing” · aesthetics standards usability · official **b2** branch · download / WordBlog / forums |
| 9 | `20030630191256` Google AdSense PR | **Jun 18 2003** self-service · text AdWords on content · CPC · expands Mar content targeting · cut-paste HTML · English sites · Brin quote · premium >20M PV/mo |
| 10 | `20030704094052` bloglines.com | Free browser RSS · **no install** · server-side · Register · Top Feeds · ©2003 Trustic |

### 4.4 Visual grammar sources `[visited]` / `[secondary]`

| Source | URL | Use |
|--------|-----|-----|
| Web Design Museum · year 2003 | https://www.webdesignmuseum.org/gallery/year-2003 | Flash/agency mood · **LinkedIn 2003** in gallery · CSS Zen Garden era · Jamiroquai Flash |
| WDM LinkedIn 2003 | https://www.webdesignmuseum.org/gallery/linkedin-2003 | Screenshot layout grammar (blue early LI); reference only — do not hotlink as our GIF without harvest log |
| Version Museum / GUIdebook | (method from NOSTALGIA doc) | XP + IE6 chrome crops |
| FWA review 2003 | thefwa.com article 2003 (Cybercultural cites) | Peak Flash / tokyoplastic |

### 4.5 Hard bans (reconfirmed)

| Ban | Why |
|-----|-----|
| Facebook / Thefacebook product UI | 2004; Facemash = footnote only |
| Gmail | 2004 |
| YouTube | 2005 |
| Firefox **1.0** as default brand | Nov 2004 |
| Modern MySpace redesign | Early HTML profile era only |
| Unlimited free streaming default | Store = 99¢ download + DRM |
| MySpace already #1 over Friendster in 2003 | Friendster larger through fall |
| Blogger still only-Pyra with **no** Google | Acquisition is **2003** fact (bug B1) |

---

## 5. Artifact / capture queue (museum Phase 9+)

Prefer **dated WA `id_`** → save under `assets/period/2003/<brand>/` as `*-wa.gif` · log in CAPTURE-LOG · never promote `_nonauthentic`.

### 5.1 P0 pixel targets

| Priority | Artifact | Source strategy | Target path |
|----------|----------|-----------------|-------------|
| P0 | MySpace logo 2003 | WA `myspace.com` Sep–Oct 2003 HTML → image URLs; Cybercultural Sep 2003 screenshots as **layout ref** | `myspace/logo-wa.gif` |
| P0 | Tom default avatar | WA profile assets / period screenshots · RECON until found | `myspace/tom-wa.gif` |
| P0 | MySpace About full HTML extract | `20031008115927` already visited — store extract under `wayback-extracts/` | `wayback-extracts/myspace-about-20031008.txt` |
| P0 | WordPress.org early wordmark | WA `20030618021947` page images | `wordpress/logo-wa.gif` |
| P0 | iTunes Music Store web chrome | Apple.com/itunes ~Apr 29 2003 WA; Cybercultural “29 April 2003” store webpage | `itunes/store-wa.gif` or logo crop |
| P0 | LinkedIn 2003 home | WDM screenshot grammar + WA linkedin.com 2003 if CDX yields | `linkedin/logo-wa.gif` |
| P0 | AdSense wordmark / code example | google.com/adsense 2003 WA + PR page | `adsense/logo-wa.gif` |
| P1 | Bloglines logo | WA `20030704094052` | `bloglines/logo-wa.gif` |
| P1 | Friendster mass 2003 | WA Mar–Sep 2003 profile chrome | `friendster/*-wa.gif` |
| P1 | Firebird product icon | mozilla.org products/firebird 2003 | `firebird/logo-wa.gif` or phoenix rebrand |
| P2 | XP Start / IE6 toolbar true crops | GUIdebook / evolt | `xp/*-wa.gif` · `chrome/*-wa.gif` |
| P2 | Flash FWA / BowieNet still | Cybercultural / FWA — **screenshot ref only** (no Flash runtime required) | optional culture room |

### 5.2 HTML densify kits (implement from sources)

#### MySpace (from About WA + Cybercultural)

Copy / structure to densify:

- Pitch line: *“online community that lets you meet your friends' friends”*
- Three steps: **Sign Up** → **Invite** → **View connections**
- “MySpace is for everyone” list (friends, singles, families, business, classmates…)
- Scale honesty box: Aug launch · ~100k Oct · Friendster ~3M
- New pages targets: `about.html` · `invite.html` · `browse.html` (theater)
- HTML theme: allow **safe** style paste theater (already note no XSS)

#### iTunes Store (from Apple PR)

- 99¢ · no subscription · 200k+ songs · five major labels  
- AAC 128 kbps · free 30-second previews  
- Rights: unlimited personal CD burns · unlimited iPods · **up to 3 Macs** at launch  
- Platform: Mac OS X + iTunes 4 · U.S. billing first · Windows **Oct 2003**  
- New pages: `browse.html` (genre table) · `library.html` · `fairplay.html` (DRM honesty)  
- Ban streaming CTA

#### WordPress (from WA + wiki)

- Tagline exact: semantic personal publishing · aesthetics · web standards · usability  
- Official branch of **b2/cafelog**  
- Links: About · WordBlog · support forums · download  
- New pages: `download.html` · multi-step install theater · keep dashboard publish

#### LinkedIn (from wiki + WDM 2003)

- May 5 2003 launch · professional · real names · **no profile photo at launch** (period honesty if densifying)  
- PYMK · invite · connections  
- New: `invite.html` · optional jobs stub  
- Visual: early blue professional table layout (WDM grammar) — not modern navy feed

#### AdSense (from Google PR)

- Self-serve **Jun 18 2003** expands Mar content targeting  
- Cut-paste HTML · CPC text ads · not pop-ups (Brin quote usable in museum voice carefully)  
- Apply online · English sites · premium >20M PV/mo  
- Keep signup · code · earnings theater; densify copy from PR

#### Bloglines (**new room**)

- Free · browser · no install · server-side · ©2003 Trustic  
- Register · Top Feeds · subscribe theater (localStorage feed list)  
- Path: `years/2003/sites/bloglines/index.html`

#### Firebird honesty (**rewrite phoenix room**)

- Title: **Mozilla Firebird** (2003 name)  
- Lineage: Phoenix 0.1 (**2002**) → Firebird (**2003**) → Firefox (**2004**)  
- Download theater only; never “Firefox 1.0”

### 5.3 Extract files to create next

```
docs/references/2003/wayback-extracts/
  myspace-about-20031008.txt          # from visit body
  wordpress-org-20030618.txt
  adsense-pr-20030618.txt
  bloglines-20030704.txt
  visit-pass-2026-07-27-museum.txt    # this research notes
```

---

## 6. Museum-grade phase map (implement after research)

| Phase | Goal | Depends |
|-------|------|---------|
| **M0** | Docs honesty: CAPTURE · ASSETS · ARTIFACTS · MUSEUM-GRADE · phases checkboxes | — |
| **M1** | Fix bugs B1–B4 (Blogger Google · Firebird · Friendster founded 2002 · immersion flags) | M0 |
| **M2** | Multi-page densify MySpace · iTunes · WP · LinkedIn · AdSense from §5.2 | M1 |
| **M3** | New Bloglines room + home/tour link + urlMap + registry if needed | M2 |
| **M4** | Continuity densify: Friendster mass copy · CNN 99¢ vs KaZaA · Blogger Google body (not footer only) | M1 |
| **M5** | Pixel harvest P0 `*-wa.gif` + ASSETS provenance rows | parallel-ok with M2 |
| **M6** | Facemash **footnote** on About only (not a product room) | M1 |
| **M7** | Gates: `test_2003_museum` + expand e2e (buttons · link audit · pixels) | M2–M5 |
| **M8** | Optional P2 Flash culture room (static stills + honesty) | optional |
| **M9** | Re-verify smoke · authenticity · e2e · update MUSEUM-GRADE to **full year** | M7 |

**Definition of done (museum):**

- [ ] Bugs B1–B3 fixed and tested  
- [ ] Each P0 brand ≥ multi-page densify (not single stub)  
- [ ] Bloglines room live  
- [ ] ≥1 true `*-wa.gif` for MySpace **or** documented failed harvest + RECON honesty  
- [ ] Authenticity museum suite green  
- [ ] ≥3 e2e specs for 2003 green  
- [ ] `2003-MUSEUM-GRADE.md` status = full year / museum (not MVP-only)  
- [ ] CAPTURE/ASSETS match disk  

---

## 7. Legal / educational

No real P2P payloads · no copyrighted music files · no real payments/accounts · localStorage theaters only.  
Trademarks belong to owners; exhibit is reconstruction.  
Do not hotlink WDM/FWA screenshots as permanent production assets without harvest log.

---

## 8. Research completeness checklist

- [x] Re-read all 2003 docs + 2002 museum bar + DISK-TRUTH + LEFT-TO-DO honesty  
- [x] Disk audit: rooms · bytes · assets · modules · e2e · authenticity tests  
- [x] Re-visit Cybercultural internet-2003 + myspace-2003  
- [x] Re-visit Apple Newsroom Apr 28 iTunes Store  
- [x] Re-visit WA: MySpace About · WordPress · AdSense PR · Bloglines  
- [x] Re-visit WDM year-2003 + LinkedIn 2003  
- [x] Firebird rename fact-check (Phoenix 2002 → Firebird 2003)  
- [x] Artifact queue + densify kits + phase map  
- [ ] Execute harvest downloads (implement phase M5)  
- [ ] Implement densify HTML/modules (M1–M4)  

**This research package is sufficient to implement museum-grade 2003 without inventing layout grammar or wrong-year products.**

---

*Museum-grade research + audit authored 2026-07-27. Educational reconstruction only.*
