# 2016 — Improvement plan (detail how it will be done)

**Date:** 2026-08-13  
**Purpose:** Full **how / files / acceptance** for residual 2016 work after L3 ship.  
**Status:** **Wave 1 + densify hardening implemented 2026-08-13** · `npm run test:e2e:2016` **77 passed**. Wave 3 (CAPTURE / forest scrub) still open.  
**Disk truth now:** Hub **1994–2016** · **`years/2016/` L3 densify** · prefix **`itt16`** · **65 e2e green**.  
**Companions:**  
- [`2016-MASTER-BIBLE-FLOWS-ARTIFACTS-UI-UX.md`](2016-MASTER-BIBLE-FLOWS-ARTIFACTS-UI-UX.md) (original build bible)  
- [`2016-READ-FIRST.md`](2016-READ-FIRST.md) · [`2016-MUSEUM-GRADE.md`](2016-MUSEUM-GRADE.md)  
- Scan source: conversation residual audit (2026-08-13)

**Rules (unchanged):** localStorage theater only · never invent brand pixels · incomplete REAL blocks write · year prefix `itt16` only · git only if asked.

---

## 0. How to use this doc

| You want… | Do this |
|-----------|---------|
| Approve / reject work | Check boxes under each item’s **Confirm** section |
| See order | §1 waves · §2 item-by-item |
| Gate after implement | §7 acceptance commands |
| Skip forever | Mark item **[skip]** · do not implement |

**Confirm format (for you):**  
For each item ID (e.g. `W1-01`), reply:

```
W1-01: yes
W1-02: no
W1-03: yes with note — …
Wave 2: later
Wave 3: skip for now
```

Only items marked **yes** get implemented.

---

## 1. Waves (order)

| Wave | Theme | Goal | Est. effort |
|------|--------|------|-------------|
| **Wave 1** | P0 UX fixes | Noticeable visitor bugs / year-voice / trail glue | 1–2 days |
| **Wave 2** | Densify depth | Multipage · stronger REAL · home progress | 2–3 days |
| **Wave 3** | L4 forever | CAPTURE · clone forest · optional literacy | open-ended |

**Recommended:** confirm Wave 1 fully first · run e2e · then decide Wave 2.

```
AFTER ANY IMPLEMENT PASS
  python3 scripts/check-all-years.py
  npm run test:e2e:2016
```

---

# WAVE 1 — P0 UX (high visitor impact)

## W1-01 · Snap residual year-voice (T1 end)

### Why
`sites/snapchat/story.html` is still **2013 Stories invent copy** (“Not Instagram Stories (2016)”). In **2016**, Snap must read as **competitor still live**, not “we invented Stories and IG doesn’t have them.”

### How it will be done

1. Open `years/2016/sites/snapchat/story.html`.  
2. Rewrite title, H1 lead, honesty banner:
   - **2016 competitor honesty:** Snapchat Stories still mass · Instagram Stories launched Aug 2 2016 · war for 24h format.  
   - Remove inverted “Not Instagram Stories” as primary frame.  
3. Keep REAL: add snap to My Story → `itt16-snap-story` (or keep existing key if already used).  
4. Add crumb: Start · **IG Stories** · Discover residual.  
5. Apply light `itt16-shell` / yellow Snap shell consistency (optional class from `period-2016.css`).  
6. Add **Next →** optional CTA back to home or to Pokémon GO if coming from T1.  
7. e2e: densify or trail asserts body matches `/compet|still|Instagram Stories|2016/i` and **not** “Not Instagram Stories (2016)” as sole ban line.

### Files

| Path | Action |
|------|--------|
| `years/2016/sites/snapchat/story.html` | Rewrite copy · crumbs · optional next |
| `e2e/2016-densify.spec.js` or `2016-trail-real-flows.spec.js` | Assert year-true competitor text |
| `e2e/2016-trail-real-flows.spec.js` | Optional hop: Stories → Snap residual load |

### Acceptance

- [ ] Title/H1/body speak **2016 Stories war**, not 2013 invent-only  
- [ ] Add-to-story still writes storage  
- [ ] Link to `instagram/stories.html` present  
- [ ] e2e green  

### Confirm
**[ ] yes · [ ] no · [ ] yes with note: ________**

---

## W1-02 · musical.ly index list renders from storage

### Why
Create page posts to `itt16-musically`, but **index** has `data-mly-list` and **never boots a render** → app home feels broken.

### How it will be done

1. In `js/immersion/year-2016-extras.js` → `bootMusically`:  
   - On **any** page with `[data-mly-list]`, call `render()` even if no post button.  
   - Keep post logic only when `[data-mly-post]` exists.  
2. Optional: index shows “Create a post →” already — ensure list populates after navigate from create.  
3. e2e: post on `create.html` → goto `index.html` → list contains song text (or storage poll + list text).

### Files

| Path | Action |
|------|--------|
| `js/immersion/year-2016-extras.js` | Split render-only vs post-bind |
| `years/2016/sites/musically/index.html` | Minor copy if needed (“your posts”) |
| `e2e/2016-real-flows.spec.js` | New test: create then index list |

### Acceptance

- [ ] After REAL post, opening index shows at least one list item  
- [ ] Empty state still shows when no posts  
- [ ] e2e green  

### Confirm
**[ ] yes · [ ] no · [ ] yes with note: ________**

---

## W1-03 · GO trail Next CTAs + “fix step” links

### Why
Bible wants continuous trail. `index` / `team` lack success **Next** panels; battery alone has `data-itt16-next`. Visitors can get stuck mid-trail.

### How it will be done

1. **team.html:** After team pick feedback (or always show static next): primary link **Catch →** `catch.html`.  
2. **catch.html:** After successful catch (reveal next already partial) ensure button **Battery literacy →** always visible as secondary trail (not only after catch).  
3. **battery.html:** If save fails missing prior steps, status already errors — add links:
   - “Do location →” `index.html`  
   - “Pick team →” `team.html`  
   - “Catch first →” `catch.html`  
4. Optional: on battery success, keep Next → Reactions.  
5. e2e: assert hrefs present (densify already checks multipage links; extend if needed).

### Files

| Path | Action |
|------|--------|
| `years/2016/sites/pokemongo/team.html` | Next CTA row |
| `years/2016/sites/pokemongo/catch.html` | Always-visible battery link |
| `years/2016/sites/pokemongo/battery.html` | Fix-up links in hint/error area |
| `e2e/2016-densify.spec.js` | Assert CTAs |

### Acceptance

- [ ] Each GO page has clear forward navigation  
- [ ] Failed final save points user to missing step  
- [ ] Full trail e2e still green  

### Confirm
**[ ] yes · [ ] no · [ ] yes with note: ________**

---

## W1-04 · AirPods pair wires into `itt16-airpods`

### Why
`airpods/pair.html` is a stub. Bible: pair theater contributes to product key.

### How it will be done

1. **pair.html:** Add literacy check “open case near iPhone (theater)” + button `data-airpods-pair`.  
2. **year-2016-extras.js** → extend `bootAirPods` or `bootAirPodsPair`:  
   - Require order already saved **or** allow pair-only with honesty that orders Dec 13 class.  
   - Prefer: merge into existing JSON: `{ ordered?, paired: true, multiStep, real, ts }`.  
3. **index.html:** Link “Pair theater →” already exists; after order save, Next can include pair.  
4. e2e: order on index → pair → storage has `paired` true (or key still truthy with paired field).

### Files

| Path | Action |
|------|--------|
| `years/2016/sites/airpods/pair.html` | REAL UI |
| `years/2016/sites/airpods/index.html` | Crumb/next to pair |
| `js/immersion/year-2016-extras.js` | Pair merge write |
| `e2e/2016-real-flows.spec.js` | Pair step test |

### Acceptance

- [ ] Pair incomplete blocked  
- [ ] Pair success updates `itt16-airpods`  
- [ ] e2e green  

### Confirm
**[ ] yes · [ ] no · [ ] yes with note: ________**

---

## W1-05 · map.html title year hygiene

### Why
`<title>2014 — UX flow map</title>` on 2016 map is wrong (clone residue).

### How it will be done

1. Set `<title>2016 — UX flow map</title>`.  
2. Ensure `data-itt-flow-map` still loads `ITT.flowMaps["2016"]` (already via immersion year).  
3. e2e shell or densify: goto map → title or body contains 2016.

### Files

| Path | Action |
|------|--------|
| `years/2016/pages/map.html` | Title + any leftover 2014 strings |
| `e2e/2016-mvp.spec.js` or densify | Assert 2016 |

### Acceptance

- [ ] Title is 2016  
- [ ] Flow map renders branches  
- [ ] e2e green  

### Confirm
**[ ] yes · [ ] no · [ ] yes with note: ________**

---

## W1-06 · Allo require non-empty message for REAL

### Why
`data-require-field-value` is decorative today; save only needs 2 checkboxes. Bible: smart reply + message theater.

### How it will be done

1. Mark message input `data-allo-msg` (or name + data-require-field on button if real-flow supports it).  
2. Prefer custom save in extras **or** use `data-itt-real-save` with `data-require-field="[data-allo-msg]"` if real-flow supports selector (check `real-flow.js` — uses `data-require-field` as querySelector).  
3. Empty message → blocked; chip click fills field then save works.  
4. Optional: append last message to a small list div.  
5. e2e: empty blocked then chip+checks+save.

### Files

| Path | Action |
|------|--------|
| `years/2016/sites/allo/index.html` | Hooks on input · button attrs |
| `js/immersion/real-flow.js` | Only if require-field already works (prefer no engine change) |
| `e2e/2016-real-flows.spec.js` | Incomplete then success |

### Acceptance

- [ ] Empty message does not write `itt16-allo`  
- [ ] Chip-filled message + checks writes key  
- [ ] e2e green  

### Confirm
**[ ] yes · [ ] no · [ ] yes with note: ________**

---

## W1-07 · Trail e2e: T1 includes Snap residual hop

### Why
T1 bible is Stories → Snap residual; e2e only hits IG today.

### How it will be done

1. Expand `e2e/2016-trail-real-flows.spec.js` T1:  
   - Stories success  
   - `goto` snapchat/story.html  
   - Assert 2016 competitor copy (depends on W1-01)  
   - Optional: add snap REAL if page supports  
2. Depends on **W1-01** copy rewrite.

### Files

| Path | Action |
|------|--------|
| `e2e/2016-trail-real-flows.spec.js` | Extend T1 |

### Acceptance

- [ ] T1 fails if Snap page still 2013-only invent frame  
- [ ] Full pack green  

### Confirm
**[ ] yes · [ ] no · [ ] yes with note: ________**  
*(Recommend yes only if W1-01 yes)*

---

# WAVE 2 — Densify depth

## W2-01 · Home trail progress (localStorage)

### Why
Visitor cannot see which trails already completed.

### How it will be done

1. On `home.html`, add small script (inline or extras `bootHomeProgress`):  
   - Read keys: `itt16-ig-stories`, `itt16-pogo`, `itt16-reactions`, `itt16-iphone7-jack`+`airpods`, `itt16-vine-end`+`musically`, `itt16-wa-e2e`.  
   - Mark matching `.itt16-trail-card` with class `is-done` + “✓ done” kicker.  
2. CSS in `period-2016.css`: border green · checkmark.  
3. e2e: set key via evaluate → reload home → card contains done marker.

### Files

| Path | Action |
|------|--------|
| `years/2016/pages/home.html` | data attributes on cards `data-trail-keys` |
| `js/immersion/year-2016-extras.js` | `bootHomeProgress` |
| `css/period-2016.css` | `.itt16-trail-card.is-done` |
| `e2e/2016-mvp.spec.js` | Progress assert |

### Confirm
**[ ] yes · [ ] no · [ ] later**

---

## W2-02 · Stories about multipage

### Why
Bible multipage densify; only single stories.html today.

### How it will be done

1. Add `sites/instagram/stories-about.html` (or `about-stories.html`): Aug 2 literacy · Snap war · not Reels.  
2. Link from stories.html crumb.  
3. Optional soft REAL ack `itt16-ig-stories-about` **or** no storage (nav only).  
4. densify e2e: path 200 + text Aug 2.

### Confirm
**[ ] yes · [ ] no · [ ] later**

---

## W2-03 · Reactions multi-post densify

### Why
Single static post only.

### How it will be done

1. Two more museum posts on `reactions.html` (or `reactions-feed.html`).  
2. Reaction choice scoped per post via `data-fb-react-post="1"` or single global still OK if UI shows which post.  
3. Storage shape: `{ reaction, postId?, … }` — keep backward compatible with string reaction.  
4. e2e still passes with one pick.

### Confirm
**[ ] yes · [ ] no · [ ] later**

---

## W2-04 · WhatsApp multipage (chat residual + security)

### Why
Security-only is thin vs 2014 WA densify.

### How it will be done

1. Keep `security.html` as E2E REAL.  
2. Add `sites/whatsapp/e2e-about.html` literacy page **or** enhance chat residual with banner “default E2E 2016 → security room”.  
3. Link security ↔ index/chat.  
4. densify asserts multipage hrefs.

### Confirm
**[ ] yes · [ ] no · [ ] later**

---

## W2-05 · Win10 free-end + Anniversary multipage

### Why
Only free-end panel; Anniversary Update is calendar spine.

### How it will be done

1. `windows10/anniversary.html`: Aug 2 AU class · free offer already ended Jul 29 honesty.  
2. Link from index.  
3. Optional separate key `itt16-win10-au` or single key remains `win10-end`.  
4. densify + shell honesty still pass on free end.

### Confirm
**[ ] yes · [ ] no · [ ] later**

---

## W2-06 · Edge download → prefer two-step (2015 parity)

### Why
Currently one literacy save; 2015 Edge was download then prefer.

### How it will be done

1. Restore two buttons `data-edge-download` / `data-edge-prefer` in 2016 extras or real-flow.  
2. Prefer blocked until downloaded.  
3. Key `itt16-edge` JSON `{ downloaded, preferred }`.  
4. e2e real + shell honesty.

### Confirm
**[ ] yes · [ ] no · [ ] later**

---

## W2-07 · P1 multipage (Rift · LinkedIn · Spectacles · Switch)

### Why
Each is single literacy panel.

### How it will be done (per room, same pattern)

| Room | New page | Content |
|------|----------|---------|
| Rift | `oculus/rift-ship.html` | Mar 28 ship · $599 · tethered |
| LinkedIn | `linkedin/deal-about.html` | $26.2B · independence note |
| Spectacles | `snapchat/snapbot.html` | Find Snapbot theater steps |
| Switch | `nintendo/switch-trailer.html` | Oct 20 · ships 2017 |

Link from index · densify path load · REAL stays on primary page unless moved carefully.

### Confirm
**[ ] all · [ ] subset: ________ · [ ] later · [ ] skip**

---

## W2-08 · GO progress chips (step done UI)

### Why
Step list is static; chips never mark done.

### How it will be done

1. On each GO page, read intermediate keys (`pogo-loc`, `pogo-team`, `pogo-catches`, `pogo`).  
2. Add class `done` on matching `itt16-steps li`.  
3. CSS already can reuse `.itt16-steps li.done .n { background: #2e7d32 }`.  
4. Optional e2e class assert after trail.

### Confirm
**[ ] yes · [ ] no · [ ] later**

---

# WAVE 3 — L4 forever

## W3-01 · CAPTURE harvest H16-01…10

### Why
All product rooms are text/CSS; `assets/period/2016/*` empty.

### How it will be done

1. Follow [`references/2016/CAPTURE-LOG.md`](references/2016/CAPTURE-LOG.md).  
2. Primary press / Wayback / newsroom only.  
3. Success → wire `<img>` in HTML.  
4. Fail → mark **[failed-final]** + RECON placard.  
5. **Never invent** brand art.

### Confirm
**[ ] start harvest · [ ] later · [ ] skip**

---

## W3-02 · Continuity forest strategy

### Why
Clone leaves 2012–15 products writing `itt16-*` with wrong product years.

### How it will be done (choose one strategy)

| Option | Method | Effort |
|--------|--------|--------|
| **A Badge** | CSS/banner “Continuity · pre-2016 product” on residual room templates | Medium |
| **B Archive only** | Home strip only (already) · leave forest | Low · status quo |
| **C Scrub top 20** | Year-true 2016 voice on Chrome, FB residual, IG main, Snap, Netflix, Spotify, Uber, Gmail, Amazon… | High |

### Confirm
**[ ] A · [ ] B · [ ] C · [ ] later**

---

## W3-03 · Optional platform literacy room (Flow T)

### Why
Bible optional; election/social “fake news” phrase year.

### How it will be done

1. New `sites/news/platform-literacy.html` (or similar).  
2. Three checks: ranking · share buttons · ad targeting class.  
3. **Hard ban:** no candidate campaign pages · no harassment dump.  
4. Key `itt16-platform-literacy`.  
5. Link only from about or P1 strip · not primary trail.  
6. e2e optional densify.

### Confirm
**[ ] yes · [ ] no · [ ] later**

---

## W3-04 · Shell late-year Win10 class option

### Why
Free upgrade ended; shell still pure `os-win7`.

### How it will be done

1. Document honesty: residual Win7 OK all year.  
2. Optional: `body` class toggle `os-win10` after `itt16-win10-end` set (prefs) — **only if** CSS exists and e2e shell honesty updated.  
3. Default remains Win7 residual unless confirmed.

### Confirm
**[ ] yes · [ ] no · [ ] keep Win7 residual only**

---

# 2. Dependency map

```
W1-01 Snap copy  ──►  W1-07 T1 e2e hop
W1-02 m.ly list  ──►  (independent)
W1-03 GO CTAs    ──►  (independent)
W1-04 AirPods pair ──► (independent)
W1-05 map title  ──►  (independent)
W1-06 Allo msg   ──►  (independent)

Wave 2 items mostly independent after Wave 1
W3-01 CAPTURE independent
W3-02 forest independent
W3-03 literacy independent
```

**Safe parallel after confirm:** W1-01…W1-06 can be one PR/pass together.

---

# 3. Explicit non-goals (unless you override)

| Item | Reason |
|------|--------|
| Real GPS / Niantic / Graph / Apple APIs | Museum rule |
| Invent brand logos / product photos | CAPTURE only |
| TikTok-branded default room | Hard ban |
| Chromium Edge · Face ID · Reels | Hard ban |
| Partisan campaign UI | Flow T careful only |
| Re-scaffold whole year from scratch | Already L3 live |
| Git commit/push | Only if asked |

---

# 4. Test plan (after each wave)

```bash
python3 scripts/check-all-years.py
npm run test:e2e:2016
```

| Wave | Extra manual checks |
|------|---------------------|
| 1 | T1 Stories → Snap residual feels 2016 war · m.ly index shows posts · GO mid-pages have Next · AirPods pair · Allo empty blocks · map title |
| 2 | Home cards mark done · multipage hrefs · Edge two-step if built |
| 3 | CAPTURE wired or failed-final · forest badge if A |

Update grade card residual list when wave ships.

---

# 5. Confirm checklist (copy back)

```
WAVE 1
W1-01 Snap residual year-voice:     [ yes / no / note ]
W1-02 musical.ly index list:        [ yes / no / note ]
W1-03 GO Next + fix-up links:       [ yes / no / note ]
W1-04 AirPods pair REAL:            [ yes / no / note ]
W1-05 map.html title 2016:          [ yes / no / note ]
W1-06 Allo require message:         [ yes / no / note ]
W1-07 T1 e2e Snap hop:              [ yes / no / note ]

WAVE 2
W2-01 Home trail progress:          [ yes / no / later ]
W2-02 Stories about multipage:      [ yes / no / later ]
W2-03 Reactions multi-post:         [ yes / no / later ]
W2-04 WA multipage:                 [ yes / no / later ]
W2-05 Win10 Anniversary multipage:  [ yes / no / later ]
W2-06 Edge download→prefer:         [ yes / no / later ]
W2-07 P1 multipage pack:            [ all / subset / later / skip ]
W2-08 GO step chips done UI:        [ yes / no / later ]

WAVE 3
W3-01 CAPTURE H16:                  [ start / later / skip ]
W3-02 Forest strategy:              [ A badge / B archive / C scrub / later ]
W3-03 Platform literacy room:       [ yes / no / later ]
W3-04 Shell Win10 class:            [ yes / no / keep Win7 ]

Notes:
________________________________
```

---

# 6. Suggested default confirmation (if you want a recommended pack)

If you prefer a single default “yes” set:

| ID | Recommend |
|----|-----------|
| W1-01…W1-06 | **yes** (full Wave 1) |
| W1-07 | **yes** with W1-01 |
| W2-01, W2-08 | **yes** (progress UX) |
| W2-02…W2-07 | **later** |
| Wave 3 | **later** · forest **B** (status quo) |

---

# 7. After you confirm

Implementer will:

1. Only touch **yes** items.  
2. Keep e2e green.  
3. Update this doc status line + `2016-MUSEUM-GRADE.md` residual.  
4. Not start Wave 2/3 unless confirmed.

**Status:** Waiting for your verify/confirm on checklist §5.  
