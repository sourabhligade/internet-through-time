# Widely used missing products — implementation phases step-by-step

**Date:** 2026-08-07  
**Status:** Research freeze **[x]** · implement **[ ]** (start only when user names a wave/product)  
**Research:** [`WIDELY-USED-MISSING-DEEP-RESEARCH-1994-2018.md`](WIDELY-USED-MISSING-DEEP-RESEARCH-1994-2018.md)  
**Idea list:** [`WIDELY-USED-MISSING-INTEGRATIONS-1994-2018.md`](WIDELY-USED-MISSING-INTEGRATIONS-1994-2018.md)  
**★ One thing per year (canonical pick list):** [`ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md`](ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md)  
**Pattern template:** 2018 densify rooms + `js/immersion/year-YYYY-extras.js` multi-step REAL  

---

## How to use this file

| You say | You do |
|---------|--------|
| `implement one-thing 2000` | Open one-thing table → **MapQuest** → **G0–G6** + **B1–B10** |
| `implement 1999 AIM` | Same · only that year’s one thing |
| `implement Wave A` | Phases **G0–G6** once · then **A1–A8** (AIM) · **A9–A16** (MSN) — *two years’ one-things* |
| `implement MapQuest 2000` | **G0–G6** · then **B1–B10** only for year 2000 |
| `implement Photobucket + Imgur` | **G0–G6** · **D1–D12** — *two years’ one-things* |
| `implement all waves` | Prefer **one-thing-per-year 1994→2018** order instead of stacking many products in one year |

**Do not** start code until the user picks a wave or product. This doc is the implement bible.

---

# Part 0 — Global rules (every phase)

## 0.1 Never violate

1. Educational · **localStorage only** — no real AOL/MSN/GitHub accounts, no live maps, no streaming CDN, no payments.  
2. **Never invent brand logo pixels** — CSS RECON + wordmark text · CAPTURE `[wa]` or `[failed-final]`.  
3. Incomplete multi-step → **no** `localStorage` write.  
4. Year-true bans (no Meta early · no Reels · no COVID UI · no real torrent payloads).  
5. Prefix isolation: `itt` + 2-digit year → `itt00-aim`, `itt05-photobucket`, etc.  
6. Prefer **one primary year** fully done, then residual copy into adjacent years (do not half-build 8 years at once).

## 0.2 Shared file touch list (per product · primary year YYYY)

```
years/YYYY/sites/<product>/
  index.html
  …multipage…
  about.html
js/immersion/year-YYYY-extras.js     # bootXxx + register in bootAll
js/config/immersion-YYYY.js          # optional nav/footer
js/config/YYYY.js                    # urlMap titles + defaultBookmarks
js/config/flow-maps.js               # ITT.flowMaps["YYYY"] branch
years/YYYY/pages/home.html           # chip + trail
years/YYYY/pages/map.html            # usually auto via flow-maps
css/period-YYYY.css                  # product RECON classes (or shared period CSS)
docs/references/YYYY/CAPTURE-LOG.md  # H-row
e2e/YYYY-densify.spec.js             # load + incomplete + complete
  (or new e2e/YYYY-<product>-real.spec.js if densify file missing)
assets/period/YYYY/<product>/.gitkeep
```

## 0.3 HTML room shell template (copy for every page)

```html
<!DOCTYPE html>
<html lang="en" data-itt-year="YYYY" data-itt-room="p0">
<head>
<meta charset="utf-8">
<title>PRODUCT — period title</title>
<link rel="stylesheet" href="../../../../css/period-YYYY.css">
</head>
<body bgcolor="…" text="…">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<!-- multipage subnav links -->
<!-- REAL controls with data-* hooks -->
<!-- status line data-xxx-status -->
<!-- proof key note -->
<script src="../../../../js/immersion-YYYY.js" defer></script>
</body>
</html>
```

## 0.4 Extras boot template (add to `year-YYYY-extras.js`)

```js
function bootProduct(doc) {
  doc = doc || document;
  var saveBtn = doc.querySelector("[data-prod-save]");
  if (!saveBtn) return;
  var st = doc.querySelector("[data-prod-status]");
  // wire clicks that set local step flags
  saveBtn.addEventListener("click", function () {
    // if incomplete → feedback error · return
    saveJSON(key("product-suffix"), {
      multiStep: true,
      real: true,
      ts: Date.now()
    });
    feedback("Saved · " + key("product-suffix"), st);
    markUsed();
  });
}
// inside bootAll(doc): bootProduct(doc);
```

Reuse existing helpers in that year’s extras file: `key()`, `saveJSON()`, `checked()`, `feedback()`, `markUsed()` — same pattern as GDPR/TikTok boots in `year-2018-extras.js`.

## 0.5 e2e template

```js
test("PRODUCT incomplete no write", async ({ page }) => {
  await page.goto("/years/YYYY/sites/product/index.html");
  await page.evaluate(() => localStorage.removeItem("ittYY-product"));
  await page.locator("[data-prod-save]").click();
  expect(await page.evaluate(() => localStorage.getItem("ittYY-product"))).toBeFalsy();
});

test("PRODUCT complete writes", async ({ page }) => {
  await page.goto("/years/YYYY/sites/product/index.html");
  // complete all steps with locators
  await page.locator("[data-prod-save]").click();
  expect(await page.evaluate(() => localStorage.getItem("ittYY-product"))).toBeTruthy();
});
```

## 0.6 Global phases G0–G6 (run once per wave, before product phases)

| Phase | Name | Steps | Done when |
|------:|------|-------|-----------|
| **G0** | Confirm research | Re-open deep research § for product · print bans | Dates locked |
| **G1** | Pick primary year | Choose **one** YYYY from placement matrix | Year chosen |
| **G2** | Capture dirs | `mkdir -p assets/period/YYYY/<product>` · CAPTURE-LOG stub row | Dir + row |
| **G3** | CSS classes | Add `.itt-product-*` RECON to `period-YYYY.css` (or year delta) | Classes load |
| **G4** | Scaffold HTML | Create multipage under `years/YYYY/sites/<product>/` | Pages 200 OK |
| **G5** | Wire REAL | Boot in extras · incomplete no write | Manual QA |
| **G6** | Wire discovery | home chip · flow-maps · urlMap · bookmarks · CAPTURE · e2e | Suite green |

**Order:** G0→G1→G2→G3→G4→G5→G6 · then product-specific phases below.

---

# Part 1 — Wave A · Chat (AIM + MSN/WLM)

**Primary years:** AIM → **2001** (or 2000) · MSN → **2003** (or 2001)  
**Keys:** `itt01-aim` · `itt03-msn` (adjust digits to year)  
**Effort:** L (~2–4 days both)

## Phase map Wave A

| Phase | Product | Done when | Status |
|------:|---------|-----------|--------|
| **A0** | G0–G6 for AIM year | Scaffold ready | **[ ]** |
| **A1** | AIM `index.html` sign-on + Buddy List | Page + data hooks | **[ ]** |
| **A2** | AIM `im.html` chat | Send residual | **[ ]** |
| **A3** | AIM `away.html` away message | Editor REAL | **[ ]** |
| **A4** | AIM `profile.html` + `about.html` | Dates May 1997 · shutdown 2017 label | **[ ]** |
| **A5** | `bootAim` extras | multi-step · `ittYY-aim` | **[ ]** |
| **A6** | Home + flow-maps + CAPTURE AIM | Discovery | **[ ]** |
| **A7** | e2e AIM incomplete/complete | Green | **[ ]** |
| **A8** | Trail AIM ↔ ICQ | Chip both rooms | **[ ]** |
| **A9** | G0–G6 for MSN year | Scaffold | **[ ]** |
| **A10** | MSN `index.html` + `chat.html` | Nudge button | **[ ]** |
| **A11** | MSN `wlive.html` rebrand dual-date | If year ≥2006 | **[ ]** |
| **A12** | MSN `about.html` Jul 22 1999 | Microsoft PR date | **[ ]** |
| **A13** | `bootMsn` extras | `ittYY-msn` | **[ ]** |
| **A14** | Wire + CAPTURE MSN | | **[ ]** |
| **A15** | e2e MSN | Green | **[ ]** |
| **A16** | Trail MSN ↔ AIM ↔ Skype | Triple trail | **[ ]** |

### A1 — AIM index (minute steps)

1. Create `years/YYYY/sites/aim/index.html`.  
2. Subnav: Sign on · IM · Away · Profile · About.  
3. Controls:  
   - `[data-aim-screen]` text input  
   - `[data-aim-signon]` button  
   - Buddy list: 3 static buddies `[data-aim-buddy="…"]`  
   - `[data-aim-status]` status line  
4. CSS: dark blue AIM-era residual panel `.itt-aim-list` (RECON, no logo invent).  
5. Open in browser: immersion nav appears · year attribute correct.

### A2 — AIM im.html

1. Require signed-on residual: if no session flag, show “Sign on first” link to index.  
2. Chat: `[data-aim-msg]` · `[data-aim-send]` · log `[data-aim-log]`.  
3. Optional receive residual line after send (canned theater reply).  
4. Link back to Buddy List.

### A3 — AIM away.html

1. `[data-aim-away-text]` textarea.  
2. `[data-aim-away-save-local]` sets in-page “away active” flag (required for full REAL).  
3. Literacy: away message as 1999–2005 identity culture.

### A4 — AIM about.html

1. Table: May 1997 launch · peak class · 15 Dec 2017 shutdown.  
2. Hard bans list.  
3. Sources footnote (Smithsonian · multi).

### A5 — bootAim (required steps for save)

```
[data-aim-save] enabled only after:
  1. signedOn (screen name ≥3)
  2. (opened buddy + sent ≥1 msg) OR (away set)
  3. [data-aim-literacy] checked (no real AOL)
```

Payload:

```js
{
  multiStep: true,
  real: true,
  product: "aim",
  launchClass: "1997-05",
  screen: "…",
  away: bool,
  messages: n,
  ts: Date.now()
}
```

Key: `key("aim")` → `ittYY-aim`.

### A6 — Discovery wiring AIM

1. **home.html:** chip `AIM Buddy List REAL` → `sites/aim/index.html`.  
2. **flow-maps.js** under year branches:  
   `{ "name": "AIM", "href": "sites/aim/index.html", "do": "Buddy List · Away", "steps": ["Sign on", "IM or Away", "Save"] }`  
3. **config/YYYY.js:** urlMap title + bookmark `{ title: "AIM", path: "sites/aim/index.html" }`.  
4. **CAPTURE-LOG:**  
   `| HYY-aim | date | Research · multipage RECON | Buddy List · Away · no invent logo | RECON |`

### A7 — e2e AIM

1. incomplete: click save immediately → no key.  
2. complete: fill screen · signon · click buddy · type msg · send · check literacy · save → key truthy.  
3. Optional: away path alternate complete.

### A8 — Trail

1. From AIM about: link “Also used: ICQ” → existing ICQ room.  
2. From ICQ about (if exists): link AIM residual.  
3. Home trail “IM night 2001”: AIM → ICQ → MSN (when MSN lands).

### A9–A16 — MSN (same pattern)

| File | Hooks |
|------|-------|
| `index.html` | `[data-msn-email]` · `[data-msn-signon]` · contact list `[data-msn-contact]` |
| `chat.html` | `[data-msn-msg]` · `[data-msn-send]` · `[data-msn-nudge]` |
| `wlive.html` | checkboxes MSN name · Live rebrand date |
| `about.html` | 1999-07-22 · Live · Skype 2013 |

**bootMsn save requires:** signed on · ≥1 message · ≥1 nudge · literacy · (if wlive page present: dual-name checks).

**CSS:** `.itt-msn-nudge` orange residual button.

**Trail:** MSN → AIM · MSN → Skype (years that have Skype).

### Wave A acceptance

```bash
# replace YYYY
grep -n 'ittYY-aim\|ittYY-msn' js/immersion/year-YYYY-extras.js
npm run test:e2e:YYYY   # or densify file with new tests
python3 scripts/check-all-years.py
# Manual: open /years/YYYY/sites/aim/ incomplete no write · complete writes
```

---

# Part 2 — Wave B · MapQuest

**Primary year:** **2000** (or 2002)  
**Key:** `itt00-mapquest`  
**Effort:** M–L  

| Phase | Work | Status |
|------:|------|--------|
| **B1** | G0–G6 year 2000 | **[ ]** |
| **B2** | `index.html` From/To form | **[ ]** |
| **B3** | `directions.html` step list theater | **[ ]** |
| **B4** | `print.html` printable CSS residual | **[ ]** |
| **B5** | `about.html` 1996 · Google Maps 2005 honesty | **[ ]** |
| **B6** | `bootMapquest` | **[ ]** |
| **B7** | Home chip + flow-maps + CAPTURE | **[ ]** |
| **B8** | e2e incomplete/complete | **[ ]** |
| **B9** | Trail 2000 MapQuest → 2005 `sites/maps/` “what came next” | **[ ]** |
| **B10** | Optional residual copy to 2002–2004 | **[ ]** |

### B2–B4 minute detail

**index.html**

- `[data-mq-from]` · `[data-mq-to]`  
- `[data-mq-go]` generates steps into sessionStorage **or** in-memory only until save  
- Do **not** call any maps API  

**directions.html**

- Render 5–8 fake step strings from from/to text (template: “Head north on …”)  
- `[data-mq-print]` navigates to print.html  

**print.html**

- Monospace steps · “Print this page (theater)”  
- `[data-mq-print-ack]` checkbox required for save  

**bootMapquest save requires**

1. from.length ≥ 2 · to.length ≥ 2  
2. directions generated (flag)  
3. print ack **or** “I used print residual” check  
4. literacy: not live GPS / not Google Maps  

### B9 trail

On 2005 Maps room (existing): strip  

> Before Google Maps (2005), many drivers used **MapQuest** printouts → link to `/years/2000/sites/mapquest/` or same-year residual if present.

---

# Part 3 — Wave C · Pandora

**Primary year:** **2008** or **2009** (pre–Spotify US 2011)  
**Key:** `itt09-pandora`  

| Phase | Work | Status |
|------:|------|--------|
| **C1** | G0–G6 | **[ ]** |
| **C2** | `index.html` create station | **[ ]** |
| **C3** | `player.html` thumbs · ad residual · skip residual | **[ ]** |
| **C4** | `genome.html` Music Genome literacy | **[ ]** |
| **C5** | `about.html` Aug/Nov 2005 · freemium | **[ ]** |
| **C6** | `bootPandora` | **[ ]** |
| **C7** | Wire + CAPTURE + e2e | **[ ]** |
| **C8** | Trail → Spotify 2011 room dual “radio vs on-demand” | **[ ]** |

### bootPandora save requires

1. Station name ≥2 chars  
2. ≥1 thumb up **or** down (`[data-pd-up]` / `[data-pd-down]`)  
3. Free-tier ads honesty `[data-pd-free]`  
4. Not full on-demand library `[data-pd-not-od]`  

**No real audio** — status text “▶ Playing residual theater”.

---

# Part 4 — Wave D · Photobucket + Imgur

## D-Photobucket — primary **2006**

| Phase | Work | Status |
|------:|------|--------|
| **D1** | G0–G6 year 2006 | **[ ]** |
| **D2** | `index.html` upload residual (filename only) | **[ ]** |
| **D3** | `album.html` album list | **[ ]** |
| **D4** | `codes.html` Direct / IMG / BBCode residual | **[ ]** |
| **D5** | `about.html` May 2003 · Fox 2007 | **[ ]** |
| **D6** | `bootPhotobucket` · key `photobucket` | **[ ]** |
| **D7** | Trail → MySpace “paste hotlink” | **[ ]** |
| **D8** | e2e + CAPTURE | **[ ]** |

**Save requires:** filename set · album open · **copied** one code type (button sets flag) · literacy no CDN.

## D-Imgur — primary **2010**

| Phase | Work | Status |
|------:|------|--------|
| **D9** | G0–G6 year 2010 | **[ ]** |
| **D10** | multipage index · image · album · about (Feb 23 2009) | **[ ]** |
| **D11** | `bootImgur` · key `imgur` | **[ ]** |
| **D12** | Trail → Reddit · e2e + CAPTURE | **[ ]** |

**Save requires:** upload residual · copy link residual · literacy.

---

# Part 5 — Wave E · StumbleUpon

**Primary year:** **2009** or **2010**  
**Key:** `itt10-stumble`  

| Phase | Work | Status |
|------:|------|--------|
| **E1** | G0–G6 | **[ ]** |
| **E2** | `index.html` interest checkboxes (≥6 topics) | **[ ]** |
| **E3** | `stumble.html` button cycles **museum-safe cards** (internal hrefs only) | **[ ]** |
| **E4** | `toolbar.html` extension residual literacy | **[ ]** |
| **E5** | `about.html` 2001 · peak · Jun 2018 shutdown | **[ ]** |
| **E6** | `bootStumble` | **[ ]** |
| **E7** | Wire + e2e + CAPTURE | **[ ]** |

### Critical: card deck (no open Web crawl)

Hardcode 8–12 cards pointing at **existing year rooms** only, e.g.:

- Space Jam · Zombo · Wikipedia · YouTube residual · Digg · etc.  

**Save requires:** ≥2 interests · stumble count ≥3 · thumbs once · literacy “theater cards only”.

---

# Part 6 — Wave F · GitHub + Stack Overflow

**Primary year:** **2009** (both launched 2008)  

## GitHub phases

| Phase | Work | Status |
|------:|------|--------|
| **F1** | G0–G6 | **[ ]** |
| **F2** | `repo.html` README + file tree residual | **[ ]** |
| **F3** | `issues.html` open issue residual | **[ ]** |
| **F4** | `about.html` Apr 2008 launch class | **[ ]** |
| **F5** | `bootGithub` · `itt09-github` | **[ ]** |
| **F6** | e2e + CAPTURE | **[ ]** |

**Save requires:** open repo · view README flag · issue open or comment · no-real-git literacy.

## Stack Overflow phases

| Phase | Work | Status |
|------:|------|--------|
| **F7** | G0–G6 | **[ ]** |
| **F8** | `question.html` vote · accept residual | **[ ]** |
| **F9** | `ask.html` draft ≥20 chars | **[ ]** |
| **F10** | `about.html` 15 Sep 2008 | **[ ]** |
| **F11** | `bootStackoverflow` · `itt09-stackoverflow` | **[ ]** |
| **F12** | Trail GitHub ↔ SO · e2e | **[ ]** |

**Save requires:** open Q · (vote or accept) · optional ask · literacy.

---

# Part 7 — Wave G · Airbnb + Slack

## Airbnb — primary **2014** or **2015**

| Phase | Work | Status |
|------:|------|--------|
| **G1a** | G0–G6 | **[ ]** |
| **G2a** | `index.html` city search | **[ ]** |
| **G3a** | `listing.html` amenities residual | **[ ]** |
| **G4a** | `request.html` multi-step request (dates residual · guests) | **[ ]** |
| **G5a** | `about.html` Aug 11 2008 · rename 2009 · trust literacy | **[ ]** |
| **G6a** | `bootAirbnb` · `itt15-airbnb` | **[ ]** |
| **G7a** | e2e + CAPTURE · no payment | **[ ]** |

**Save requires:** search · open listing · complete request steps · no-real-booking literacy · no invent Belo as 2008 logo (2014 logo = residual label).

## Slack — primary **2015**

| Phase | Work | Status |
|------:|------|--------|
| **G1b** | G0–G6 | **[ ]** |
| **G2b** | `index.html` workspace residual | **[ ]** |
| **G3b** | `channel.html` #general · compose · send | **[ ]** |
| **G4b** | `integrations.html` bots residual literacy | **[ ]** |
| **G5b** | `about.html` Feb 2014 public · Aug 2013 preview | **[ ]** |
| **G6b** | `bootSlack` · `itt15-slack` | **[ ]** |
| **G7b** | Trail Slack ↔ Discord honesty (work vs game chat) | **[ ]** |
| **G8b** | e2e + CAPTURE | **[ ]** |

**Save requires:** enter workspace · send ≥1 channel message · work-not-Discord check.

---

# Part 8 — Wave H · Flash nag + reCAPTCHA

**Not full brand homes** — densify friction UX.

| Phase | Work | Status |
|------:|------|--------|
| **H1** | Optional `years/2008/sites/flashplayer/index.html` multipage | **[ ]** |
| **H2** | CSS `.itt-flash-nag` sticky banner component | **[ ]** |
| **H3** | Inject residual chip on 3 sample rooms (e.g. 2006 YT residual, 2008 Newgrounds portal link, 2010 game room) via small shared snippet or per-page include | **[ ]** |
| **H4** | `bootFlashNag` · dismiss + literacy → `ittYY-flash-ack` | **[ ]** |
| **H5** | reCAPTCHA theater component: checkbox `[data-captcha-check]` + label | **[ ]** |
| **H6** | Wire captcha into 2 forms (e.g. blog comment residual · gmail signup residual if present) | **[ ]** |
| **H7** | e2e: flash ack · captcha blocks form save until checked | **[ ]** |
| **H8** | CAPTURE H-flash · H-captcha | **[ ]** |

**Ban:** real SWF · real challenge service · security scare theater.

---

# Part 9 — SoundCloud (optional add-on wave)

**Primary year:** **2013**  
**Key:** `itt13-soundcloud`  

Phases mirror Pandora: index · track waveform RECON · upload residual · about Oct 17 2008 · boot · trail to Spotify · e2e.

**Save requires:** open track · play residual · comment or repost residual · no-real-audio literacy.

---

# Part 10 — Cross-year residual copy (after primary year green)

Do **not** full multipage every year. Pattern:

1. Primary year = full multipage REAL.  
2. Adjacent years:  
   - Option A: thin **index residual** + link “full museum room in YEAR”  
   - Option B: copy multipage + change `data-itt-year` + extras boot registration for that year only if extras file exists  

| Product | Primary | Residual years (thin OK) |
|---------|---------|---------------------------|
| AIM | 2001 | 1999–2000, 2002–2005 |
| MSN | 2003 | 2001–2002, 2004–2007 |
| MapQuest | 2000 | 1998–1999, 2001–2004 |
| Pandora | 2009 | 2007–2008, 2010–2011 |
| Photobucket | 2006 | 2004–2005, 2007–2008 |
| Imgur | 2010 | 2009, 2011–2015 |
| StumbleUpon | 2010 | 2007–2009, 2011–2012 |
| GitHub / SO | 2009 | 2008, 2010–2012 |
| Airbnb | 2015 | 2011–2014, 2016–2018 |
| Slack | 2015 | 2014, 2016–2018 |

---

# Part 11 — Docs & grade honesty (after any wave ships)

| Step | File | Action |
|------|------|--------|
| 1 | `docs/references/YYYY/CAPTURE-LOG.md` | H-rows |
| 2 | `docs/references/YYYY/SOURCE-KIT.md` if exists | Product row |
| 3 | `docs/YYYY-MUSEUM-GRADE.md` | Residual densify note |
| 4 | `docs/DISK-TRUTH.md` | Optional one-line densify |
| 5 | `docs/WIDELY-USED-MISSING-INTEGRATIONS-1994-2018.md` | Mark product **[x] shipped** |
| 6 | This phases file | Check phase boxes **[x]** |

---

# Part 12 — Master checklist (print)

### Before coding

- [ ] User named wave or product  
- [ ] Primary year chosen  
- [ ] Deep research section re-read (dates · bans)  

### Per product

- [ ] Multipage HTML (≥3 pages)  
- [ ] `data-*` hooks match boot  
- [ ] Incomplete no write  
- [ ] Complete writes `ittYY-*`  
- [ ] Home chip  
- [ ] flow-maps branch  
- [ ] urlMap / bookmark  
- [ ] CAPTURE row  
- [ ] e2e incomplete + complete  
- [ ] Trail to existing sibling room  
- [ ] No invent logo  
- [ ] `check-all-years` still pass  

### After wave

- [ ] `npm run test:e2e:YYYY` green  
- [ ] Manual smoke: home → product → save → localStorage key  

---

# Part 13 — Suggested calendar (if doing all)

| Week | Ship |
|------|------|
| 1 | Wave A AIM (primary year) |
| 2 | Wave A MSN + trails |
| 3 | Wave B MapQuest + Maps trail |
| 4 | Wave C Pandora + Spotify trail |
| 5 | Wave D Photobucket + Imgur |
| 6 | Wave E StumbleUpon |
| 7 | Wave F GitHub + Stack Overflow |
| 8 | Wave G Airbnb + Slack |
| 9 | Wave H Flash + captcha · docs pass |

Parallelize only if multiple implementers; single agent: **one product green before next**.

---

# Part 14 — Command reference

```bash
# Health
python3 scripts/check-all-years.py

# Year suite (example)
npm run test:e2e:2001
npm run test:e2e:2006
npm run test:e2e:2009
npm run test:e2e:2010
npm run test:e2e:2015

# Grep wiring
rg "bootAim|bootMapquest|itt01-aim" js/immersion years --glob '*.{js,html}'

# Manual server
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/YYYY/sites/aim/
```

---

# Part 15 — Quick start recipes

### Recipe 1 — “Ship AIM for 2001 only”

1. G0–G6 with YYYY=2001 product=aim  
2. A1–A7  
3. Stop (A8 optional if ICQ exists)  
4. Mark integration list AIM **[x]** for 2001  

### Recipe 2 — “Ship MapQuest for 2000”

1. G0–G6 · B1–B9  
2. Link from 2005 maps honesty strip  

### Recipe 3 — “Ship Photobucket + Imgur pack”

1. D1–D8 on 2006  
2. D9–D12 on 2010  
3. Cross-trail MySpace ↔ Photobucket · Reddit ↔ Imgur  

### Recipe 4 — “Ship 2015 markets pack”

1. Airbnb G1a–G7a  
2. Slack G1b–G8b  
3. Dual chip “Trust markets 2015” on home  

---

*End of implementation phases — widely used missing products — 2026-08-07.*
