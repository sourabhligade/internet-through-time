# 2003 Museum-grade — step-by-step phases (minute detail)

**Date:** 2026-07-27  
**Purpose:** Ordered, print-ready checklist to take **shipped 2003 MVP** → **museum grade**. Every phase has goal, disk status, files, sources, exact steps, paste skeletons, acceptance, anti-patterns, time.  
**Rule:** Finish one phase before the next unless marked *parallel-ok*. Check boxes as you go.

### Research bibles (read first)

| Doc | Use |
|-----|-----|
| [`2003-WEB-SURF-RESEARCH-2026-07-27.md`](2003-WEB-SURF-RESEARCH-2026-07-27.md) | Facts · quotes · harvest URLs |
| [`2003-MUSEUM-GRADE-RESEARCH-2026-07-27.md`](2003-MUSEUM-GRADE-RESEARCH-2026-07-27.md) | Audit · bugs · definition of done |
| [`2003-DEEP-RESEARCH-2026-07-26.md`](2003-DEEP-RESEARCH-2026-07-26.md) | Room kits |
| Extracts | `docs/references/2003/wayback-extracts/*.txt` |
| Bar | [`2002-MUSEUM-GRADE.md`](2002-MUSEUM-GRADE.md) |

### Disk truth (recheck after implement 2026-07-27)

| Item | Now |
|------|-----|
| Hub 2003 | Unlocked · Available |
| Tree | `years/2003/` · **214** HTML · **58** rooms · urlMap **complete** |
| P0 | Multi-page densify · RECON logos (WA harvest residual) |
| Bugs B1–B4 | **Fixed** |
| Bloglines | **Live** (`sites/bloglines/` + `bloglines.js`) |
| E2E | `2003-mvp` + `2003-buttons` → **16/16** |
| Authenticity | `2003-signature` · densify · continuity · **museum** OK |
| Residual | M5 true WA pixels · M8 Flash optional |

### Legal (every phase)

No real P2P files · no copyrighted audio · no real payments/accounts · localStorage only · trademarks for reconstruction only · never claim RECON is WA.

---

## Phase map (museum)

| Phase | Name | Est. | Status | Blocks |
|-------|------|------|--------|--------|
| **M0** | Docs honesty (already partly done) | S | `[x]` | Clarity |
| **M1** | Honesty bugs B1–B4 | S | `[x]` | Truth |
| **M2a** | MySpace multi-page densify | M | `[x]` | Signature |
| **M2b** | iTunes Store multi-page densify | M | `[x]` | Signature |
| **M2c** | WordPress multi-page densify | M | `[x]` | Signature |
| **M2d** | LinkedIn multi-page densify | S–M | `[x]` | Signature |
| **M2e** | AdSense densify | S | `[x]` | Signature |
| **M3** | Bloglines new room | M | `[x]` | P1 gap |
| **M4** | Continuity densify (Friendster · CNN · Blogger body) | M | `[x]` | Year feel |
| **M5** | Pixel harvest `*-wa.gif` | M–L | `[ ]` *parallel-ok* | Authenticity |
| **M6** | Facemash footnote (About only) | S | `[x]` | Honesty |
| **M7** | Gates: museum tests + e2e expansion | M | `[x]` · 16 e2e | Ship bar |
| **M8** | Optional Flash culture room | M | `[ ]` optional | Mood |
| **M9** | Re-verify + promote museum status | S | `[x]` | Done |

**Order:** M1 → (M2a–e parallel-ish) → M3 → M4 → M6 → M7 → M9 · **M5 anytime after M1** · M8 last/optional.

**Museum = done when** all M1–M4 + M6–M7 + M9 green, and M5 either harvested **or** failed-harvest logged honestly.

---

# Phase M0 — Docs honesty

### Goal
Every 2003 reference doc matches **playable disk** (not wipe-era language).

### Status
Mostly done 2026-07-27. Re-check only if you edit docs later.

### Files

```
docs/references/2003/CAPTURE-LOG.md
docs/references/2003/ASSETS.md
docs/references/2003/ARTIFACTS.md
docs/2003-MUSEUM-GRADE.md
docs/2003-IMPLEMENTATION-PHASES.md
docs/DISK-TRUTH.md
docs/2003-WEB-SURF-RESEARCH-2026-07-27.md
docs/2003-MUSEUM-PHASES-STEP-BY-STEP.md   # this file
```

### Steps

1. Confirm CAPTURE-LOG says **live MVP** not empty wipe.  
2. Confirm ASSETS lists **107** files + RECON vs WA classes.  
3. Confirm ARTIFACTS lists live paths (214 HTML · Bloglines live).  
4. Confirm MUSEUM-GRADE says **museum densify complete**.  
5. Link this step-by-step from IMPLEMENTATION-PHASES.

### Acceptance

- [x] No active doc claims `years/2003` wiped while tree exists  
- [x] Web-surf + museum research linked  

### Time
S (15–30 min)

---

# Phase M1 — Honesty bugs (do first)

### Goal
Remove **wrong-year facts** so densify does not copy lies.

### Disk bugs

| ID | File | Wrong | Right |
|----|------|-------|-------|
| **B1** | `years/2003/sites/blogger/index.html` | Footer “Powered by Pyra” + yellow “do **not** claim Google ownership” | Google acquired Pyra **Feb 2003** — **claim** Google ownership for 2003 |
| **B2** | `years/2003/sites/phoenix/index.html` | “Phoenix 0.1 Released **September 23, 2003**” | Phoenix 0.1 = **2002-09-23**; 2003 brand = **Firebird** |
| **B3** | `years/2003/sites/friendster/index.html` | “founded in **2003**” | Founded **2002**; public mass **March 2003** |
| **B4** | `js/config/immersion-2003.js` | `features{}` omits myspace/itunes/wordpress/linkedin/adsense | Align flags with registry (optional but clean) |

### Files you will touch

```
years/2003/sites/blogger/index.html
years/2003/sites/blogger/edit.html      # if Pyra-only footer
years/2003/sites/blogger/view.html
years/2003/sites/phoenix/index.html
years/2003/sites/friendster/index.html
js/config/immersion-2003.js
css/period-2003.css                     # only if firebird class names
```

### Sources (open while editing)

- Web-surf §3.6 Blogger · §4.3 Firebird · §4.1 Friendster  
- Extracts: none required for M1  

---

### M1.1 Blogger Google (B1) — minute steps

1. Open `years/2003/sites/blogger/index.html`.  
2. Find yellow honesty `<p>` at bottom (after `</table>`).  
3. **Delete** the sentence: `do not claim Google ownership here`.  
4. Replace whole honesty block with:

```html
<p style="font-family:Verdana;font-size:11px;padding:8px;background:#ffc;border:1px solid #c80">
<b>2003:</b> <b>Blogger is part of Google</b> (Google acquired Pyra Labs / Blogger in
<b>February 2003</b>). Hosted blogging stays free/simple; self-host path =
<a href="../wordpress/index.html">WordPress 0.7</a>.
UI here is a museum reconstruction of early-2003 Blogger feel — not 2020 Blogger.
</p>
```

5. Change footer copyright line from only “Pyra.com Ltd” to something like:

```html
Copyright &copy; 2000–2003 · Blogger · Google (formerly Pyra Labs). Free to use. Museum reconstruction.
```

6. In `edit.html` / `view.html`: if footer still says only Pyra, add one-line “Google · formerly Pyra” note (keep layout).  
7. Grep: `rg -n "do not claim Google|Powered by Pyra" years/2003/sites/blogger/` → should not find inverted ban.  

### Acceptance B1

- [ ] Page states Google acquisition **February 2003** as fact  
- [ ] No “do not claim Google ownership”  
- [ ] Still not modern Blogger UI  

---

### M1.2 Firebird rewrite (B2) — minute steps

1. Open `years/2003/sites/phoenix/index.html`.  
2. Change `<title>` to: `Mozilla Firebird — standalone browser (2003)`.  
3. Change visible `<h1>` from Phoenix 0.1 to **Mozilla Firebird**.  
4. Replace body copy with lineage honesty:

```html
<img src="../../../../assets/period/2003/phoenix/logo.gif" width="24" height="24" alt="">
<h1 style="font-size:18px">Mozilla Firebird</h1>
<p><b>2003 name:</b> the standalone Gecko browser is known as <b>Firebird</b>
(renamed from <b>Phoenix</b> after trademark pressure).</p>
<p style="font-size:12px;background:#fff8dc;border:1px solid #cc0;padding:8px">
<b>Lineage honesty</b><br>
· Phoenix 0.1 released <b>September 23, 2002</b> (not 2003)<br>
· <b>Firebird</b> name used through 2003<br>
· <b>Firefox 1.0</b> is <b>November 2004</b> — not this year’s default brand
</p>
<p>Default web browser for most visitors in this exhibit is still
<a href="../microsoft/ie6.html">Internet Explorer 6</a> on Windows XP.
This room is the open alternative path.</p>
<p>
  <input type="button" value="Download Firebird (theater)"
    data-itt-download="firebird-win32.zip" data-itt-product="Mozilla Firebird"
    data-itt-size="8" data-itt-modem="broadband">
  <span data-itt-live-status style="display:none;font-size:11px;color:#060;margin-left:8px"></span>
</p>
<p style="font-size:11px;color:#444">Museum download theater only — no real binary.</p>
<p><a href="../mozilla/index.html">Mozilla Application Suite</a> ·
<a href="../microsoft/ie6.html">IE 6</a> ·
<a href="../../pages/home.html">← 2003 Start</a></p>
```

5. Keep path `sites/phoenix/` for urlMap stability **or** add redirect page — prefer keep path, change labels only (less urlMap churn).  
6. Update home link text if it says only “Phoenix/Firebird path” — OK as is if Firebird emphasized.  
7. Grep: `rg -n "September 23, 2003|Released September 23, 2003" years/2003/` → zero hits.  

### Acceptance B2

- [ ] No claim Phoenix 0.1 released in 2003  
- [ ] Firebird named as 2003 brand  
- [ ] Explicit ban: Firefox 1.0 not default  
- [ ] Download theater still works  

---

### M1.3 Friendster founded year (B3) — minute steps

1. Open `years/2003/sites/friendster/index.html`.  
2. Find: `Friendster was <b>founded in 2003</b>`.  
3. Replace museum honesty block with:

```html
<p style="font-size:10px;color:#666;margin-top:16px;border-top:1px solid #ddd;padding-top:8px">
<b>Museum honesty:</b> Friendster was <b>founded in 2002</b> (Jonathan Abrams).
The mass public “went live” / Silicon Valley boom year is often dated <b>March 2003</b>.
By fall 2003 ~<b>3 million</b> registered users — still larger than MySpace (~100k by Oct).
This room is early-graph reconstruction — localStorage only. No real accounts.
</p>
```

4. Keep yellow mass-year note at bottom (3M vs MySpace) — good.  
5. Grep: `rg -n "founded in 2003|Founded 2003" years/2003/sites/friendster/` → only if “2003” refers to public mass, not founding.  

### Acceptance B3

- [ ] “Founded 2002” present  
- [ ] Public mass March 2003 present  
- [ ] Still links / contrasts MySpace  

---

### M1.4 Immersion flags (B4) — minute steps

1. Open `js/config/immersion-2003.js`.  
2. In `features: { ... }` add:

```js
myspace: true,
itunes: true,
wordpress: true,
linkedin: true,
adsense: true,
```

3. Do **not** remove registry loads in `js/immersion/registry.js` — already correct.  
4. Optional: `navSubtitle` already OK.  

### Acceptance B4

- [ ] Features object lists all five signature modules  

### Anti-patterns M1

- Inventing “Google Blogger 2020” UI while fixing ownership  
- Renaming path to `sites/firefox/`  
- Saying Friendster “didn’t exist in 2002”  

### Time estimate M1
S (45–90 min)

### Gate after M1

```bash
python3 scripts/test-authenticity.py 2>&1 | grep -i 2003
# manual: open blogger, phoenix, friendster in browser
```

---

# Phase M2a — MySpace multi-page densify

### Goal
MySpace feels like **Aug–Oct 2003 seed** product: About pitch, invite flow, profile, Top 8, comments — not a 1-screen mock.

### Sources

- `docs/references/2003/wayback-extracts/myspace-about-20031008.txt`  
- Web-surf §3.1  
- Cybercultural: ~100k Oct vs Friendster ~3M · HTML custom · Tom default  

### Files

```
years/2003/sites/myspace/index.html      # densify
years/2003/sites/myspace/profile.html    # densify
years/2003/sites/myspace/about.html      # NEW
years/2003/sites/myspace/invite.html     # NEW
js/immersion/myspace.js                  # optional: invite list
js/config/2003.js                        # urlMap + titles
css/period-2003.css                      # if new classes
years/2003/pages/home.html               # link About/Invite if needed
e2e/2003-mvp.spec.js                     # extend later in M7
```

### Assets (use existing until M5)

```
assets/period/2003/myspace/logo.gif
assets/period/2003/myspace/tom.gif
assets/period/2003/myspace/friend1.gif … friend8.gif
```

---

### M2a.1 Create `about.html` (minute steps)

1. Copy skeleton from `profile.html` head (doctype, period-2003.css, myspace-shell).  
2. Title: `About MySpace — 2003`.  
3. Paste pitch from extract **verbatim-ish**:

- H1/H2: MySpace  
- Lead: “online community that lets you meet your friends' friends”  
- Photos, journals, interests  
- Six degrees / Kevin Bacon line (period flavor)  
- “MySpace is for everyone” bullet list (friends, singles, families, business, classmates…)  
- “New site developing features fast”  

4. Honesty box:

```html
<p style="font-size:11px;background:#ffc;padding:6px;border:1px solid #cc0">
<b>August 2003 launch</b> (sources: wiki often Aug 1 · narratives Aug 15 —
museum labels <b>August 2003</b>). By October still ~100k users vs Friendster ~3M.
Seed year — not yet the king.
</p>
```

5. Nav: Home · Profile · Invite · Starting Point.  
6. Scripts: `immersion-2003.js` (+ myspace.js if needed).  

### M2a.2 Create `invite.html`

1. Form: friend email + message (theater).  
2. On submit: show status “Invite queued (museum — no email sent)”.  
3. Prefer localStorage list of invites via small JS in `myspace.js`:

```js
// sketch — extend existing IIFE
// data-myspace-invite-form → push {email, when} to storage key itt03-myspace-invites
```

4. Link back to index.  

### M2a.3 Densify `index.html`

1. Keep Top 8 + comments + Tom.  
2. Add subnav: About · Invite · Edit profile.  
3. Ensure `data-myspace-comments` + comment form still work.  
4. Contacting box: Message · Forward · Add to Friends (buttons can be `type="button"` theater with status text).  
5. Link Friendster: “still bigger in 2003”.  

### M2a.4 Densify `profile.html`

1. Keep display / headline / about / mood.  
2. Add note: “HTML theme paste is period flavor — museum sanitizes; localStorage only.”  
3. Optional: textarea `theme` stored but **never** `innerHTML` raw into page (XSS ban). If you render theme, use text only or safe subset.  

### M2a.5 urlMap

In `js/config/2003.js` `urlMap` add:

```js
"sites/myspace/about.html": "http://www.myspace.com/misc/about.html",
"sites/myspace/invite.html": "http://www.myspace.com/index.cfm?fuseaction=invite",
```

(Titles in `pageTitles` if map uses them — match file pattern used for other pages.)

### M2a.6 Smoke

```bash
# list files
ls years/2003/sites/myspace/
# start server, open each page, submit profile + comment + invite
python3 scripts/test-authenticity.py 2>&1 | grep 2003
```

### Acceptance M2a

- [ ] ≥4 MySpace HTML pages  
- [ ] About contains friends' friends pitch  
- [ ] Invite theater works  
- [ ] Top 8 + comments still work  
- [ ] Scale honesty present  
- [ ] urlMap includes new pages  

### Anti-patterns

- Modern blue MySpace 2010+ redesign  
- Real email send  
- Claiming MySpace already bigger than Friendster  

### Time
M (2–4 hours)

---

# Phase M2b — iTunes Music Store multi-page densify

### Goal
Visitor feels **Apr 28 2003 legal 99¢ store**: browse · buy · library · FairPlay honesty · Windows Oct path — **not** streaming.

### Sources

- Apple PR Apr 28 + Dec 15 + Oct 16 (web-surf §3.2)  
- Existing `itunes.js` buy theater  

### Files

```
years/2003/sites/itunes/index.html       # densify landing
years/2003/sites/itunes/browse.html      # NEW genres/table
years/2003/sites/itunes/library.html     # NEW (or section)
years/2003/sites/itunes/fairplay.html    # NEW DRM honesty
years/2003/sites/itunes-note.html        # keep / retarget if orphan
js/immersion/itunes.js
js/config/2003.js
css/period-2003.css                      # .itunes-store already
assets/period/2003/itunes/logo.gif
assets/period/2003/itunes/badge-99.gif
```

---

### M2b.1 Landing densify (`index.html`)

Must include every PR fact as short labels:

| Label | Text |
|-------|------|
| Price | just **99¢** · no subscription |
| Catalog | **200,000+** songs at launch |
| Labels | BMG · EMI · Sony · Universal · Warner |
| Format | AAC **128 kbps** · not free MP3 dump |
| Preview | free **30-second** previews (theater note only) |
| Platform | Mac + iTunes 4 + OS X 10.1.5+ · **U.S. billing** first |
| Windows | **October 16, 2003** same store |
| Dec scale | **25 million** songs sold by Dec 15 · catalog **400k+** |

1. Keep `data-itunes-buy` form + library.  
2. Genre links → `browse.html?g=rock` or anchors on browse.  
3. Grep ban: no `stream now`, `spotify`, `watch instantly`, unlimited free full songs.  

### M2b.2 `browse.html`

1. Table or list of genres: Rock · Hip-Hop · Pop · Jazz · Soundtrack · Classical (from PR).  
2. 4–6 fake track rows: Title · Artist · Album · **$0.99** · Buy button `data-itunes-buy` or shared form.  
3. Note: “Museum titles are illustrative — no real audio files.”  
4. Prefer period names OK if not shipping audio (Hey Ya / OutKast already on index — fine as theater).  

### M2b.3 `library.html`

1. Host `<div data-itunes-library>` (move from index or duplicate).  
2. Empty state: “No purchases yet — buy a 99¢ track (theater).”  
3. Same `itunes.js` storage key.  

### M2b.4 `fairplay.html`

Copy kit (no legal advice tone):

- Own-download model with **DRM** (FairPlay era)  
- Launch rights: unlimited personal CD burns · unlimited iPods · **up to 3 Macs**  
- Not a subscription stream  
- No real DRM implementation — text only  

### M2b.5 Module check (`itunes.js`)

1. Confirm buy writes localStorage.  
2. Confirm library renders on library.html when script loads.  
3. If library only binds on index, use event delegation or call render on DOMContentLoaded when `[data-itunes-library]` exists.  

### M2b.6 urlMap

```js
"sites/itunes/browse.html": "http://www.apple.com/itunes/store/",
"sites/itunes/library.html": "http://www.apple.com/itunes/",
"sites/itunes/fairplay.html": "http://www.apple.com/itunes/store/",
```

### Acceptance M2b

- [ ] ≥3 iTunes pages  
- [ ] 99¢ + AAC + Mac-first + Windows Oct + 25M Dec present  
- [ ] Buy theater works from browse or index  
- [ ] Zero streaming-default CTAs  
- [ ] FairPlay honesty page  

### Time
M (2–3 hours)

---

# Phase M2c — WordPress multi-page densify

### Goal
**May 27 2003 v0.7** self-host path: marketing tagline · download · install theater · dashboard publish · view blog.

### Sources

- `wayback-extracts/wordpress-org-20030618.txt`  
- ma.tt Jan 24 2003 dilemma post (origin story link in About)  

### Files

```
years/2003/sites/wordpress/index.html
years/2003/sites/wordpress/dashboard.html
years/2003/sites/wordpress/blog.html
years/2003/sites/wordpress/download.html   # NEW
years/2003/sites/wordpress/install.html    # NEW multi-step theater
js/immersion/wordpress.js
js/config/2003.js
```

---

### M2c.1 `index.html` densify

1. Exact tagline: **semantic personal publishing** · aesthetics · web standards · usability.  
2. May 27 2003 · v0.7 · Mullenweg + Little · fork of **b2/cafelog** (~2k blogs).  
3. Links: Download · Dashboard · View blog · Blogger contrast · Movable Type contrast.  
4. “Official branch of b2” line from WA.  

### M2c.2 `download.html`

1. Button `data-wp-install` (existing) or mirror.  
2. Fake file: `wordpress-0.7.zip` theater size ~small.  
3. Status: “Downloaded (museum) — continue to install.” → link install.html.  

### M2c.3 `install.html` (multi-step theater)

Steps as UI (no real PHP):

1. Check PHP/MySQL (fake green checks)  
2. Database form (name/user/pass) — store nothing sensitive, or ignore values  
3. “Run install” → “Success · wp-admin ready” → link dashboard  

Use `data-wp-install-step` buttons; progress in localStorage `itt03-wp-installed=1`.

### M2c.4 Dashboard / blog

1. Keep `data-wp-publish` title/body.  
2. List posts on blog.html.  
3. Empty state: “Hello world!” default if no posts.  
4. Label: **0.7-era theater** — not Gutenberg.  

### M2c.5 urlMap

```js
"sites/wordpress/download.html": "http://wordpress.org/download/",
"sites/wordpress/install.html": "http://wordpress.org/support/",
```

### Acceptance M2c

- [ ] Tagline matches WA semantic publishing language  
- [ ] b2/cafelog + May 27 2003 present  
- [ ] Install multi-step theater  
- [ ] Publish → view blog works  

### Time
M (2–3 hours)

---

# Phase M2d — LinkedIn multi-page densify

### Goal
**May 5 2003** professional graph: profile · PYMK · connect · invite · connections list — not dating, not modern feed.

### Sources

- about.linkedin.com · wiki · WDM LinkedIn 2003 layout grammar  

### Files

```
years/2003/sites/linkedin/index.html
years/2003/sites/linkedin/profile.html
years/2003/sites/linkedin/connections.html
years/2003/sites/linkedin/invite.html     # NEW
js/immersion/linkedin.js                  # already rich — extend
js/config/2003.js
css/period-2003.css                       # .li-shell
```

---

### M2d.1 Landing densify

1. Keep May 5 2003 · founded Dec 2002 · Hoffman.  
2. Explicit: **professional networking — not Friendster dating**.  
3. Keep PYMK cards + `data-li-connect`.  
4. Visual: table layout · early blue · not navy video feed.  

### M2d.2 `invite.html`

1. Form: name + email + optional note.  
2. On submit: “Invitation recorded (museum).”  
3. Store in same connections list or separate invites key.  

### M2d.3 `connections.html` densify

1. Render connected people from localStorage.  
2. Empty state with link to index PYMK.  
3. Count: “You have N connections.”  

### M2d.4 Profile

1. Name · title · company already — ensure save status works.  
2. Optional: “Photos uncommon at launch” one-line honesty (secondary sources).  

### M2d.5 urlMap

```js
"sites/linkedin/invite.html": "http://www.linkedin.com/invite/",
```

### Acceptance M2d

- [ ] Invite page live  
- [ ] Connect theater persists  
- [ ] Careers framing present  
- [ ] No Facebook-like feed  

### Time
S–M (1.5–2.5 hours)

---

# Phase M2e — AdSense densify

### Goal
**Jun 18 2003** self-serve story with PR-accurate copy · code snippet · earnings theater.

### Sources

- `wayback-extracts/adsense-pr-20030618.txt`  

### Files

```
years/2003/sites/adsense/index.html      # densify only page OR split
years/2003/sites/adsense/code.html       # NEW optional
js/immersion/adsense.js
js/config/2003.js
```

---

### M2e.1 Content blocks (minute checklist)

On index (or code page) include:

- [ ] March 2003 Content-Targeted Advertising  
- [ ] June 18 2003 self-serve AdSense  
- [ ] Text AdWords on content pages · CPC  
- [ ] Apply online · cut-paste HTML  
- [ ] English sites  
- [ ] Premium >20M PV/mo (mention only)  
- [ ] Brin framing: text ads not pop-ups (paraphrase OK)  
- [ ] Pro-blog path link to Blogger  

### M2e.2 Theater

1. Signup form → Approved status.  
2. Show sample code in `<pre data-adsense-code>`:

```html
<!-- Museum sample only — not real AdSense -->
<script type="text/javascript"><!--
google_ad_client = "pub-0000000000000000";
google_ad_width = 468;
google_ad_height = 60;
//--></script>
```

3. Fake earnings line after “days” (random cents OK).  

### Acceptance M2e

- [ ] Timeline Mar + Jun 18 present  
- [ ] Cut-paste code after signup  
- [ ] No claim of real Google payouts  

### Time
S (1–1.5 hours)

---

# Phase M3 — Bloglines new room

### Goal
Add missing **P1** browser RSS reader (mid-2003 Trustic).

### Sources

- `wayback-extracts/bloglines-20030704.txt`  

### Files (all new unless noted)

```
years/2003/sites/bloglines/index.html
years/2003/sites/bloglines/register.html   # optional
years/2003/sites/bloglines/reader.html     # feed list theater
js/immersion/bloglines.js                  # NEW small module
js/immersion/registry.js                   # add to "2003" array
js/config/2003.js                          # urlMap
js/config/immersion-2003.js                # nav optional + features
years/2003/pages/home.html                 # Blogs & money list
years/2003/pages/about.html                # one line RSS/Bloglines
css/period-2003.css                        # .bloglines-shell minimal
assets/period/2003/bloglines/logo.gif      # RECON until M5
```

---

### M3.1 Create asset placeholder

1. `mkdir -p assets/period/2003/bloglines`  
2. Copy a simple RECON gif or 1×1 + CSS wordmark — log RECON in ASSETS.  
3. Later M5 replaces with WA.  

### M3.2 `index.html` copy kit

From extract:

- Free · keep up with blogs and newsfeeds  
- Subscribe RSS · Bloglines monitors · read inside Bloglines  
- **No install** · server-side · any browser  
- Register · validation email (theater)  
- Top Feeds · New Feeds links → reader  
- © **2003 Trustic, Inc.**  

### M3.3 `reader.html` + module

```js
// bloglines.js sketch
// storage: itt03-bloglines-feeds = [{url, title}]
// form data-bloglines-add: url + title
// list data-bloglines-feeds
// status: "Subscribed (museum — no remote fetch)"
```

1. Never fetch remote RSS in browser (CORS + authenticity).  
2. Fake “last updated” timestamps.  

### M3.4 Registry

In `js/immersion/registry.js` under `"2003"` array append:

```js
"immersion/bloglines.js"
```

### M3.5 Home / tour

1. Home “Blogs & money” list: add Bloglines link.  
2. Optional tour step after AdSense or WordPress.  

### M3.6 urlMap

```js
"sites/bloglines/index.html": "http://www.bloglines.com/",
"sites/bloglines/reader.html": "http://www.bloglines.com/myblogs",
```

### Acceptance M3

- [ ] Room loads · no install message present  
- [ ] Subscribe theater works  
- [ ] Registry loads module  
- [ ] urlMap complete (run authenticity urlmap test)  
- [ ] Home links to Bloglines  

### Time
M (2–3 hours)

---

# Phase M4 — Continuity densify

### Goal
2002 fork residue becomes **year-correct 2003** on key continuity rooms.

### Files

```
years/2003/sites/friendster/*     # mass year copy (after M1.3)
years/2003/sites/blogger/*        # body densify after M1.1
years/2003/sites/cnn/*            # music: KaZaA vs 99¢
years/2003/sites/kazaa/*
years/2003/sites/apple/*          # Store link from iPod pages
years/2003/pages/home.html
years/2003/pages/about.html
```

---

### M4.1 Friendster mass (minute steps)

1. After M1.3, add visible “Circle of Friends” densify if thin.  
2. Testimonials page: 1–2 sample testimonials preloaded.  
3. Friends page: seed 3–5 fake friends in HTML if empty.  
4. Keep slowness note optional: “Friendster felt slow in 2003 (museum note).”  

### M4.2 Blogger body densify

1. Beyond footer: main column mentions Google acquisition once in body prose.  
2. Link AdSense: “Monetize your Blog*Spot with AdSense (2003 path).”  
3. Link WordPress as self-host alternative.  

### M4.3 CNN music wire

1. Open `years/2003/sites/cnn/tech.html` or `napster-story.html` (whatever exists).  
2. Add short story block:

```html
<p><b>Music online, 2003:</b> P2P networks like KaZaA still wild.
Apple’s <a href="../itunes/index.html">iTunes Music Store</a> sells songs for
99¢ — legal downloads with DRM, not free unlimited streaming.</p>
```

3. Link KaZaA + iTunes both.  

### M4.4 KaZaA contrast

1. On KaZaA index: one line “Contrast: legal 99¢ Store (Apr 2003).”  
2. Keep no real file download payloads.  

### M4.5 Apple / iPod continuity

1. iPod pages must link **Music Store** (not claim Store in 2002).  
2. Note Windows Store path Oct 2003.  

### Acceptance M4

- [ ] CNN or tech story links Store vs KaZaA  
- [ ] Blogger body (not only footer) has Google 2003  
- [ ] Friendster mass honesty consistent  
- [ ] iPod ↔ Store linked  

### Time
M (2–3 hours)

---

# Phase M5 — Pixel harvest (*parallel-ok* after M1)

### Goal
Replace signature RECON with dated **WA** pixels where possible; always log honesty.

### Files / dirs

```
assets/period/2003/myspace/
assets/period/2003/itunes/
assets/period/2003/wordpress/
assets/period/2003/linkedin/
assets/period/2003/adsense/
assets/period/2003/bloglines/     # after M3
docs/references/2003/ASSETS.md
docs/references/2003/CAPTURE-LOG.md
docs/references/harvest/          # staging optional
```

### Tools

```bash
# pattern — run one brand at a time
curl -fsSL -A "InternetThroughTimeMuseum/1.0" -o /tmp/probe.gif "https://web.archive.org/web/TIMESTAMP/http://..."
file /tmp/probe.gif   # must be GIF/PNG, not HTML
# if good:
cp /tmp/probe.gif assets/period/2003/BRAND/logo-wa.gif
```

---

### M5.1 Harvest order (minute checklist)

| # | Brand | Strategy | Target filename |
|---|-------|----------|-----------------|
| 1 | MySpace | CDX images Sep–Oct 2003 · About-adjacent | `logo-wa.gif` · `tom-wa.gif` |
| 2 | WordPress | WA `20030618021947` page images | `logo-wa.gif` |
| 3 | iTunes | apple.com/itunes ~20030429 | `logo-wa.gif` or `store-wa.gif` |
| 4 | AdSense | google.com/adsense 2003 | `logo-wa.gif` |
| 5 | LinkedIn | WDM is screenshot ref — prefer real WA if any; else keep RECON | `logo-wa.gif` |
| 6 | Bloglines | WA `20030704094052` | `logo-wa.gif` |
| 7 | Friendster | Mar–Sep 2003 | optional |
| 8 | XP/IE6 | GUIdebook/evolt — shared 2001–03 | optional |

### M5.2 Per successful harvest (repeat)

1. Save as `*-wa.gif` (do not silently overwrite RECON without keeping original).  
2. Update HTML `img src` to `logo-wa.gif` **or** document “logo.gif contents replaced with WA”. Prefer explicit `-wa` + src update.  
3. CAPTURE-LOG row: timestamp · original URL · date · status `[harvested]`.  
4. ASSETS.md table row: path · WA · used by.  
5. Visual QA in browser.  

### M5.3 Per failed harvest

1. Leave RECON.  
2. CAPTURE-LOG: `[failed]` + reason (404, HTML error page, robots).  
3. Keep README-AUTHENTICITY.txt honest.  

### Acceptance M5

- [ ] ≥1 signature `*-wa.gif` **or** all failures logged  
- [ ] ASSETS + CAPTURE updated  
- [ ] No false “archive” claims on RECON  

### Time
M–L (half day to multi-day; stop when diminishing returns)

---

# Phase M6 — Facemash footnote only

### Goal
Acknowledge late-2003 Facemash **without** a Facebook product room.

### Files

```
years/2003/pages/about.html
# optional one line on home bans area — already has Facebook ban
```

### Steps

1. Open About.  
2. After honesty box add:

```html
<p style="font-size:11px;color:#444">
<b>Footnote:</b> In late 2003 a Harvard student project called
<i>Facemash</i> appeared — it is <b>not</b> Facebook / Thefacebook
(that product room belongs in <b>2004</b>). This exhibit does not reconstruct Facemash.
</p>
```

3. Confirm no `sites/facebook` or `sites/facemash` under 2003.  

### Acceptance M6

- [ ] Footnote on About  
- [ ] No Facemash product room  
- [ ] Home bans still list Facebook product  

### Time
S (15 min)

---

# Phase M7 — Gates (museum authenticity + e2e)

### Goal
Match **2002-style** confidence: automated bans + multi-spec e2e.

### Files

```
scripts/test-authenticity.py
e2e/2003-mvp.spec.js              # extend
e2e/2003-buttons.spec.js          # NEW
e2e/2003-link-button-audit.spec.js # NEW optional
e2e/2003-pixels.spec.js           # NEW optional
```

---

### M7.1 `test_2003_museum()` in authenticity (minute checklist)

Add function called from main; fail fast with clear messages:

| Check | How |
|-------|-----|
| Blogger Google | `"February 2003"` or `"Feb 2003"` in blogger index · **not** `"do not claim Google ownership"` |
| Firebird | phoenix page has `Firebird` · **not** `September 23, 2003` as Phoenix release |
| Friendster founded | `"founded in 2002"` or `"Founded 2002"` in friendster index |
| iTunes no stream | lowercased itunes HTML has no `stream now` / `spotify` |
| Bloglines exists | `years/2003/sites/bloglines/index.html` |
| MySpace densify | `about.html` exists · contains `friends' friends` or `friends' friends` variant |
| Facemash footnote | about.html has `Facemash` · no `sites/facebook` dir |
| urlMap | existing complete test still green |

### M7.2 Extend `e2e/2003-mvp.spec.js`

Add tests:

1. Bloglines page visible text “no installation” / free.  
2. MySpace about page opens.  
3. Firebird page not claiming Phoenix 0.1 in 2003.  
4. Blogger mentions Google.  

### M7.3 New `e2e/2003-buttons.spec.js` (mirror 2002 pattern)

1. Open each P0 home.  
2. Click primary theater controls (buy · publish · connect · signup · comment).  
3. Expect status text.  

### M7.4 Run gates

```bash
python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py
# with server:
npx playwright test e2e/2003-mvp.spec.js e2e/2003-buttons.spec.js
python3 scripts/smoke-production.py --base http://127.0.0.1:8080
```

### Acceptance M7

- [ ] `test_2003_museum` green  
- [ ] ≥2 e2e files green for 2003  
- [ ] smoke green · urlMap includes all new pages  

### Time
M (2–4 hours)

---

# Phase M8 — Optional Flash culture room

### Goal
Peak-Flash mood without requiring Flash runtime.

### Files (if doing)

```
years/2003/sites/flashculture/index.html   # or densify bowienet if exists
years/2003/sites/bowienet/                 # if present from fork
js/config/2003.js
years/2003/pages/home.html                 # Culture seeds
```

### Steps

1. Static page: FWA / tokyoplastic / BowieNet / Jamiroquai as **text + optional screenshot refs**.  
2. Honesty: “Flash sites needed the plugin; museum shows stills/descriptions.”  
3. Link WDM year-2003 as external research only (no hotlink required assets).  
4. Skip if timeboxed — **not** required for museum done.  

### Time
M optional (2 hours)

---

# Phase M9 — Re-verify + promote museum status

### Goal
Docs and gates agree: **2003 is museum grade** (or honest residual list).

### Steps (minute order)

1. Run full gate suite (M7 commands).  
2. Manually tour: home → MySpace → iTunes → WP → LinkedIn → AdSense → Bloglines → Firebird → Blogger → Friendster.  
3. Update `docs/2003-MUSEUM-GRADE.md`:

| Field | Target |
|-------|--------|
| Status | **Museum densify complete** (or “complete with residual pixels”) |
| E2E | list all specs + pass counts |
| Remaining optional | only true residuals |

4. Update `docs/2003-IMPLEMENTATION-PHASES.md` M1–M9 checkboxes.  
5. Update `docs/DISK-TRUTH.md` 2003 row.  
6. Update `docs/references/2003/ARTIFACTS.md` densify status column.  
7. README 2003 row if still says MVP only.  

### Acceptance M9 = museum done

- [ ] M1 bugs fixed  
- [ ] M2a–e multi-page densify  
- [ ] M3 Bloglines live  
- [ ] M4 continuity  
- [ ] M5 harvest or failed log  
- [ ] M6 Facemash footnote  
- [ ] M7 gates green  
- [ ] MUSEUM-GRADE status promoted  
- [ ] CAPTURE/ASSETS match disk  

### Time
S (1 hour)

---

## Quick reference — copy sources

| Need | Open |
|------|------|
| MySpace pitch | `wayback-extracts/myspace-about-20031008.txt` |
| WP tagline | `wayback-extracts/wordpress-org-20030618.txt` |
| AdSense PR | `wayback-extracts/adsense-pr-20030618.txt` |
| Bloglines | `wayback-extracts/bloglines-20030704.txt` |
| Full facts | `2003-WEB-SURF-RESEARCH-2026-07-27.md` |
| Bugs list | `2003-MUSEUM-GRADE-RESEARCH-2026-07-27.md` §3.5 |

---

## Anti-patterns (global)

| Don’t | Do |
|-------|-----|
| Invent Facebook room in 2003 | Facemash footnote only |
| Default Firefox 1.0 | IE6 default · Firebird side room |
| Stream-now music | 99¢ download theater |
| Claim RECON is WA | Label RECON · harvest or fail honestly |
| Skip urlMap for new HTML | Every new page → `js/config/2003.js` |
| Raw `innerHTML` user theme | Sanitize or text-only |
| Real email / payments | localStorage status only |

---

## Suggested work sessions

| Session | Phases | ~Time |
|---------|--------|-------|
| 1 | M1 only | 1 h |
| 2 | M2a MySpace | 3 h |
| 3 | M2b iTunes | 2.5 h |
| 4 | M2c + M2d + M2e | 4 h |
| 5 | M3 Bloglines | 2.5 h |
| 6 | M4 + M6 | 3 h |
| 7 | M5 harvest (parallel any day) | 3 h+ |
| 8 | M7 gates | 3 h |
| 9 | M9 promote | 1 h |
| optional | M8 Flash | 2 h |

**Total core path:** ~20–25 hours focused work (excluding deep harvest rabbit holes).

---

*Step-by-step museum phases authored 2026-07-27. Educational reconstruction only.*

---

*Rechecked 2026-07-27: implement complete for M1–M4/M6–M7/M9. Step bodies above remain the how-to record.*
