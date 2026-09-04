# 2000 Artifacts Inventory — Build Kit

**Purpose:** Single checklist of **every artifact** useful for building the year-2000 room: logos, chrome, Wayback captures, screenshots, copy snippets, audio/visual culture, immersion data, and code reuse.  
**Status:** Research kit (historical). **Disk truth 2026-07-28:** `years/2000/` + `assets/period/2000/` **live museum densify** — do not wipe. Leftover tickets: `docs/TO-100-PERCENT/RESEARCH-FREEZE-2000.md`.  
**Rebuild status:** [`docs/2000-MUSEUM-GRADE.md`](../../2000-MUSEUM-GRADE.md)  
**Companions:**  
- [`docs/2000-RESEARCH.md`](../../2000-RESEARCH.md) — thesis, sites, bans  
- [`docs/2000-DEEP-RESEARCH-2026-07-23.md`](../../2000-DEEP-RESEARCH-2026-07-23.md) — visit log  
- [`CAPTURE-LOG.md`](CAPTURE-LOG.md) — dated URLs  
- [`ASSETS.md`](ASSETS.md) — on-disk provenance after harvest  
- [`docs/2000-WEB-SURF-RESEARCH-2026-07-27.md`](../../2000-WEB-SURF-RESEARCH-2026-07-27.md) — rebuild web-surf  
- [`docs/2000-MUSEUM-PHASES-STEP-BY-STEP.md`](../../2000-MUSEUM-PHASES-STEP-BY-STEP.md) — implement steps  

**Legal:** Educational reconstruction. Trademarks belong to owners. Never ship real copyrighted music files or live payment rails.

---

## 0. How to use this file

| Column | Meaning |
|--------|---------|
| **Artifact** | What to capture or create |
| **Role** | Where it appears in the exhibit |
| **Source method** | WDM / WA / Version Museum / evolt / reconstruct |
| **Priority** | P0 must-ship · P1 high · P2 polish |
| **Disk target** | Path under repo once harvested |
| **Status** | `[ ]` todo · `[~]` partial · `[x]` done |

---

## 1. Browser & OS chrome

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| IE 5.5 empty window chrome | Year shell frame | WDM IE 5.5 screenshots; evolt IE5.5 install crop | P0 | `assets/period/2000/chrome/` | `[ ]` |
| IE toolbar buttons (Back/Forward/Stop/Refresh/Home) | Shell buttons | Crop from WDM Customize Toolbar / evolt | P0 | `chrome/btn-*.gif` | `[ ]` |
| IE throbber (blue `e`) | Loading theater | WDM empty page; may adapt 1999 IE5 pack then retouch | P0 | `chrome/throbber.gif` | `[ ]` |
| Address bar + Go button styling | Shell CSS | WDM IE5.5; `css/ie5-overrides.css` fork | P0 | `css/ie5-overrides.css` → 2000 deltas | `[ ]` |
| Favorites / History panel look notes | Optional explorer bar | WDM Favorites shot | P1 | docs notes | `[ ]` |
| Print Preview UI note | About/product page | WDM IE5.5 feature list | P1 | sites/microsoft | `[ ]` |
| Windows 98 SE Start button | Desktop chrome | Reuse/adapt `assets/period/1999/win98/start.gif` | P0 | `win98/start.gif` | `[ ]` |
| Windows ME Start / branding (optional late year) | Optional OS toggle | Wikipedia + period screenshots | P2 | `winme/start.gif` | `[ ]` |
| Netscape 6 classic theme crops | Secondary browser page | WDM Netscape 6.0 | P1 | `netscape6/*.gif` | `[ ]` |
| Netscape 6 My Sidebar shot | Educational | WDM | P1 | `netscape6/sidebar.gif` | `[ ]` |
| Win98 desktop wallpaper (teal/gray) | Shell background | GUIdebook / VM screenshot | P1 | `win98/desktop.gif` or CSS | `[ ]` |
| Modem handshake WAV (optional) | Dial-up ritual | IA modem collections (license check) | P2 | `assets/audio/` | `[ ]` |

---

## 2. Amazon (P0 signature — smile year)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| **Smile logo** wordmark (A→Z orange arrow) | Header brand — **required** | Turner Duckworth case; Version Museum 2000; WA amazon GIF | P0 | `amazon/logo-smile.gif` | `[ ]` |
| Smile logo small / favicon-ish | Tab, cart, footer | Same | P0 | `amazon/logo-smile-sm.gif` | `[ ]` |
| Letter-A smile mark | Optional compact mark | Version Museum / VMA storyboard | P1 | `amazon/logo-a.gif` | `[ ]` |
| Homepage tab bar strip (many tabs) | “Tab insanity” | LukeW history; Version Museum; WA home.html mid-2000 | P0 | `amazon/tabs.gif` or HTML table tabs | `[ ]` |
| Tab color variants per store | Category differentiation | LukeW 1998–2000 color note | P1 | CSS + HTML | `[ ]` |
| Search header / nav well | Home density | WA mid-2000 home.html | P0 | HTML reconstruct | `[ ]` |
| Product page 2000 frame | PDP grammar | Version Museum “product page (2000)” | P1 | `sites/amazon/product-*.html` | `[ ]` |
| Marketplace / zShops copy blocks | Third-party sellers story | Version Museum Marketplace 2000 note | P0 | HTML | `[ ]` |
| Auctions residual chrome | Continuity from 1999 | WA / prior year | P1 | HTML | `[ ]` |
| “Earth’s Biggest Selection” / store slogans | Home hero | WA 2000 | P0 | copy strings | `[ ]` |
| Cart / checkout SSL banner | Immersion reuse | Existing amazon.js patterns | P0 | module data | `[ ]` |
| Catalog data (books, CDs, DVD, toys, electronics, tools, kitchen…) | Cart theater | Curated fictional period titles | P0 | `config/immersion-2000.js` | `[ ]` |

**Banned Amazon artifacts in 2000:** modern black-nav Amazon; responsive 2010s layout; Prime as dominant (Prime is 2005).

---

## 3. Napster (P0)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| Napster wordmark / logo | Marketing + client title | WA Apr 2000; extend 1999 pack | P0 | `napster/logo.gif` | `[ ]` |
| “music at Internet speed” tagline | Home hero | `[wa-text]` `20000407210312` www1.napster.com | P0 | copy | `[x]` researched |
| Download Beta 5a CTA | Home | Same WA | P0 | HTML | `[ ]` |
| Macster mention | Cross-platform note | Same WA | P1 | HTML | `[ ]` |
| MP3 Copyright Policy page text | Legal theater | WA dmca/terms links | P0 | `sites/napster/policy.html` | `[ ]` |
| Aug 2000 redesigned home | Lawsuit-era marketing | Cybercultural cites WA 20000815 | P0 | harvest | `[ ]` |
| Client window chrome (search, results, transfer) | Immersion UI | Period screenshots; reconstruct | P0 | `napster/client-*.gif` + HTML | `[ ]` |
| Peer list / user-count theater numbers | Immersion | 10M / 22M / 50M narrative beats | P0 | napster.js data | `[ ]` |
| Legal banner states (pre/post Jul 26) | Crisis UI | Cybercultural napster-2000 | P0 | HTML variants | `[ ]` |
| Fanning TIME / BusinessWeek cover refs | News culture (not full magazines) | Cybercultural; covers as external refs | P2 | news HTML | `[ ]` |

**Banned:** real MP3s, modern streaming Napster brand, Spotify-like player.

---

## 4. Yahoo! portal (P0)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| Yahoo! purple/red wordmark | Masthead | Continuity + WA 2000 | P0 | `yahoo/logo.gif` | `[ ]` |
| Y2K Yahoo homepage layout | Portal density target | Version Museum “Y2K Yahoo 2000” | P0 | HTML | `[ ]` |
| Service strip (Mail, Messenger, Auctions, Shopping…) | Stickiness | WA 2000 yahoo.com | P0 | HTML | `[ ]` |
| Directory category columns | Classic Yahoo | WA | P0 | HTML | `[ ]` |
| Finance / markets module | Crash-year anxiety | WA | P1 | HTML | `[ ]` |
| My Yahoo personalize | Immersion | Reuse yahoo.js | P0 | module | `[ ]` |
| World Yahoo!s / Get Local | Density | WA | P1 | HTML | `[ ]` |
| GeoCities inside Yahoo chrome | Homestead continuity | WA geocities.com 2000 | P1 | HTML | `[ ]` |

---

## 5. Google (P0)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| Google! / Google logo 2000 | Sparse home | WA mid/late 2000; WDM continuity | P0 | `google/logo.gif` | `[ ]` |
| Home form labels (“Search the web…”) | Exact period copy | WA HTML extract | P0 | HTML | `[ ]` |
| I’m Feeling Lucky | Continuity | Reuse google.js | P0 | module | `[ ]` |
| Results page grammar | Blue links, sparse | WA | P0 | HTML | `[ ]` |
| About / company blurb 2000 | Rising searcher | WA / press | P1 | HTML | `[ ]` |
| Search corpus (~50–100 fake period hits) | Theater | Curated | P0 | immersion-2000.js | `[ ]` |

**Banned:** Material logo, app grid, modern doodle system as default, Knowledge Graph.

---

## 6. eBay (P0)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| Multicolor eBay logo | Continuity from 1999 | Reuse/adapt 1999 multicolor | P0 | `ebay/logo.gif` | `[ ]` |
| Home category list + counts | Marketplace density | WA mid-2000 | P0 | HTML | `[ ]` |
| My eBay | Stickiness | WA | P0 | HTML | `[ ]` |
| Bid form | Immersion | auction.js | P0 | module | `[ ]` |
| PayPal adjacency note | Payments story | Copy only | P1 | HTML | `[ ]` |
| Global sites footer | International | WA | P1 | HTML | `[ ]` |

---

## 7. News & crash culture (P0)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| CNN Interactive 2000 home | News portal | WA CDX-verified 2000 only | P0 | HTML | `[ ]` |
| CNN logo period | Masthead | WA / prior packs | P0 | `cnn/logo.gif` | `[ ]` |
| Story: AOL–Time Warner | Jan lead | NYT + CNN WA | P0 | `cnn/aol-tw.html` | `[ ]` |
| Story: NASDAQ peak / slide | Mar–EOY | Cybercultural | P0 | `cnn/markets.html` | `[ ]` |
| Story: Napster injunction | Jul | Cybercultural | P0 | `cnn/napster.html` | `[ ]` |
| Story: Pets.com folds | Nov | Wikipedia + WA | P0 | `cnn/pets.html` | `[ ]` |
| Pets.com home reconstruction | Dot-bomb room | WA pets.com 2000 | P0 | `sites/pets/` | `[ ]` |
| Sock puppet still / logo | Culture icon | Press; reconstruct | P0 | `pets/puppet.gif` or logo | `[ ]` |
| Super Bowl ad reference | About/news | Wikipedia Pets.com | P1 | copy | `[ ]` |
| Startupfailures.com style list | Crash catalog | WA `20000815111548` | P1 | `sites/startupfailures/` | `[ ]` |
| FuckedCompany-style tone note | Optional | Guardian/secondary | P2 | news only | `[ ]` |

---

## 8. PayPal / X.com (P0/P1)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| PayPal / X.com wordmark 2000 | Payments birth | WA paypal.com / x.com | P0 | `paypal/logo.gif` | `[ ]` |
| “Send money” form chrome | Immersion theater | WA | P0 | HTML + localStorage | `[ ]` |
| Merger copy (X.com + Confinity) | About blurb on site | Wikipedia X.com bank | P0 | HTML | `[ ]` |
| Palm IR beam lore (optional) | Historical note | Prior Confinity story | P2 | HTML | `[ ]` |

---

## 9. Flash & design culture (P1)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| Macromedia home Jun 2000 | Flash product story | WA macromedia.com | P1 | HTML | `[ ]` |
| Flash 5 / ActionScript feature bullets | Educational | Cybercultural; product docs | P1 | HTML | `[ ]` |
| Splash page “Enter Site” pattern | Period UX theater | Reconstruct GIF/CSS; skip control required | P1 | template | `[ ]` |
| Newgrounds 2000 frame | Flash portal | WDM Newgrounds 2000 | P1 | HTML | `[ ]` |
| Homestar Runner early home | Flash series | WA `20000511142552` | P1 | HTML + note About Ruffle | `[ ]` |
| 2Advanced / agency portfolio still | Design porn P2 | WDM | P2 | optional | `[ ]` |
| Loading bar GIF | Splash theater | Reconstruct | P1 | `flash/loading.gif` | `[ ]` |

**Note:** Prefer **non-SWF** reconstructions (GIF/CSS/JS) so modern browsers work without Flash. Optional Ruffle is out of scope for v1.

---

## 10. Blogs, social news, RSS (P1)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| Blogger / Pyra logo | Continuity | WA 2000; 1999 pack | P0 | `blogger/logo.gif` | `[ ]` |
| Publish form + reverse-chron | Immersion | blogger.js | P0 | module | `[ ]` |
| Blogroll sidebar pattern | Social blogging | CamWorld WA Mar; Kottke Oct | P1 | HTML widget | `[ ]` |
| Slashdot green-bar home | Social news | WA Jun 2000 | P1 | HTML | `[ ]` |
| Slashdot logo | Masthead | Prior / WA | P1 | `slashdot/logo.gif` | `[ ]` |
| MetaFilter 2000 home | Community weblog | WA Mar 2000 | P1 | HTML | `[ ]` |
| RSS educational diagram | 0.91 vs 1.0 fork | Cybercultural blogs-rss-2000 | P2 | `sites/rss/` | `[ ]` |

---

## 11. Microsoft / Netscape product rooms (P1)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| IE 5.5 download landing copy | Product room | WDM + MS WA | P1 | `sites/microsoft/ie55.html` | `[ ]` |
| Windows ME product page | OS room | Wikipedia + MS WA | P1 | `sites/microsoft/winme.html` | `[ ]` |
| MSN.com 2000 frame | Portal property | WDM IE5.5 shows MSN 2000 | P1 | HTML | `[ ]` |
| Netscape 6 download page | Gecko ship | WDM; WA home.netscape.com/browsers/6 | P1 | HTML | `[ ]` |
| “Introducing Netscape 6” feature list | Standards pitch | WDM resources links | P1 | HTML | `[ ]` |

---

## 12. Search rivals & homestead (P1)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| AltaVista portal home | Contrast vs Google | WA 2000 | P1 | HTML | `[ ]` |
| Ask Jeeves butler + question box | NL search | WA 2000; 1999 pack | P1 | `askjeeves/` | `[ ]` |
| GeoCities neighborhoods + glitter OK | Homestead | WA 2000 | P1 | HTML | `[ ]` |
| Under construction GIFs | Homestead flavor | Existing kits date-filter | P1 | assets | `[ ]` |

---

## 13. P2P / music adjacent (P1–P2)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| Gnutella educational page | Decentralized P2P | Wikipedia Frankel; press | P1 | `sites/gnutella/` | `[ ]` |
| Winamp download tease | Nullsoft family | Period screenshots | P2 | HTML | `[ ]` |
| SoundJam / pre-iTunes note | Apple music path | Cybercultural; AppleInsider lineage | P2 | `sites/apple/` note only | `[ ]` |
| Atlantic “Heavenly Jukebox” citation | News/longread | theatlantic.com past issues | P2 | CNN or culture page | `[ ]` |

---

## 14. Gaming & pop web (P2 — WDM year-2000)

| Artifact | Role | Source method | Pri | Disk target | Status |
|----------|------|---------------|-----|-------------|--------|
| Diablo II promo frame | Gaming web density | WDM | P2 | optional site | `[ ]` |
| The Sims promo | Gaming | WDM | P2 | optional | `[ ]` |
| Counter-Strike promo | Gaming | WDM | P2 | optional | `[ ]` |
| Rockstar Games 2000 | Gaming publisher | WDM | P2 | optional | `[ ]` |
| PBS Kids / Nick Jr. | Kids portals | WDM | P2 | optional | `[ ]` |
| Tomb Raider / Star Trek / McDonald’s | Brand density | WDM | P2 | optional | `[ ]` |

---

## 15. Immersion data artifacts (not images)

| Artifact | Role | Pri | Location | Status |
|----------|------|-----|----------|--------|
| Tour stops (6–8) | Yellow coach | P0 | `config/immersion-2000.js` | `[ ]` |
| locationHints map | Address bar shortcuts | P0 | `config/2000.js` | `[ ]` |
| urlMap + titleMap | Every HTML path | P0 | `config/2000.js` | `[ ]` |
| Amazon catalog 2000 | Multi-store SKUs | P0 | immersion-2000.js | `[ ]` |
| Napster fake library | Search results | P0 | immersion-2000.js | `[ ]` |
| Google hit corpus | Search theater | P0 | immersion-2000.js | `[ ]` |
| eBay listings | Bids | P0 | immersion-2000.js | `[ ]` |
| Blog starter posts | Blogger seed | P1 | immersion-2000.js | `[ ]` |
| Feature flags | registry 2000 | P0 | `immersion/registry.js` | `[ ]` |
| localStorage prefixes | `itt-2000-*` / `itt00` | P0 | modules | `[ ]` |
| Authenticity rules | smile required; no XP; no Wikipedia | P0 | `scripts/test-authenticity.py` | `[ ]` |
| e2e specs | Playwright year suite | P0 | `e2e/2000-*.spec.js` | `[ ]` |

---

## 16. Code / engine reuse checklist

| Existing artifact | 2000 use |
|-------------------|----------|
| `js/immersion/amazon.js` | Extend for smile era + Marketplace flags |
| `js/immersion/napster.js` | Scale + legal banner modes |
| `js/immersion/blogger.js` | + blogroll |
| `js/immersion/google.js` | New corpus year |
| `js/immersion/auction.js` | Continuity |
| `js/immersion/yahoo.js` | My Yahoo |
| `js/browser/*` | Shared chrome; year config only |
| `css/period-1999.css` | Fork → `period-2000.css` |
| `css/ie5-overrides.css` | Base + 5.5 notes |
| `years/1999/**` | Structural fork template |
| `e2e/1999-*.spec.js` | Pattern for 2000 |

---

## 17. Suggested on-disk tree (create in Phase 0)

```
assets/period/2000/
  amazon/
  napster/
  yahoo/
  google/
  ebay/
  cnn/
  pets/
  paypal/
  blogger/
  slashdot/
  askjeeves/
  flash/
  netscape6/
  microsoft/
  chrome/
  win98/
docs/references/2000/
  ARTIFACTS.md          ← this file
  ASSETS.md             ← fill after harvest
  CAPTURE-LOG.md
  wayback-extracts/     ← save HTML/txt for P0
    amazon.html
    google.html
    yahoo.html
    napster-apr.html
    napster-aug.html
    ebay.html
    pets.html
    slashdot.html
    blogger.html
years/2000/             ← not created until Phase 1
```

---

## 18. Harvest order (ROI)

1. **Amazon smile + tabs** (defines the year visually)  
2. **Napster Apr + Aug WA** (culture war)  
3. **Yahoo Y2K home**  
4. **Google sparse home**  
5. **IE 5.5 chrome crops**  
6. **Pets.com + crash catalog**  
7. **eBay + PayPal**  
8. **CNN CDX-true stories**  
9. **Flash/Newgrounds/Homestar**  
10. **Netscape 6**  

---

## 19. Definition of “artifacts ready”

Phase 0 complete when:

- [ ] P0 logos exist under `assets/period/2000/` (even if interim PIL reconstructions)  
- [ ] CAPTURE-LOG has visited/extracted stamps for Amazon, Napster, Yahoo, Google, eBay, Pets  
- [ ] ASSETS.md lists every shipped GIF with source line  
- [ ] Banned list enforced in authenticity notes  

---

*Artifacts inventory created 2026-07-23. Update Status column as harvest proceeds.*
