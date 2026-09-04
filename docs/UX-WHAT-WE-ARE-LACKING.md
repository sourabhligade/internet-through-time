# What we are lacking — UI, UX, ease of use

**Date:** 2026-08-22  
**Audience:** anyone deciding what to improve next  
**Disk law:** hub is **1994–2022** (29 years). **2014 and 2022 are live lean doors.** **2023+ not on disk.** Current improve bible: [`LACKING-AND-IMPROVE-MAP.md`](LACKING-AND-IMPROVE-MAP.md).  
**Not this file:** engine bugs, e2e gates, research notebooks. Those live elsewhere.

Read this as a visitor-experience brief. It is not an implement bible and not a claim that flows are broken.

---

## One sentence

We are over-built as a **system** and under-finished as a **place**.

The museum already has trails, coaches, passports, 5× rails, and green automated flows. A first-time visitor can still fail to know what to click, and late years can still look like labeled notes inside an old Windows frame.

---

## The bar (what “good” means)

A first desktop visit should do this without reading any `docs/` file:

```
1. Land on the hub → understand “pick a year, do one real thing” in under 15 seconds
2. Enter a year without a lecture
3. Complete one signature action and feel it stick
4. Know how to get home (Starting Point vs Year menu)
5. Come back tomorrow and resume
```

Pixel-perfect brand art is **not** required for this bar.  
A modern Material / iOS redesign would **break** the exhibit. Do not optimize for that.

| Step | Status now | Why |
|-----:|------------|-----|
| 1. Land | Weak | Too many primary buttons |
| 2. Enter | Medium | Connect + coach + honesty before the page |
| 3. Do one thing | Uneven | Early years play; lean years quiz |
| 4. Get home | Medium | Two homes, explained once, forgotten |
| 5. Resume | Fixed 2026-08-22 for lean doors | Was skipping 2007 / 2009 / 2011 / 2013 |

---

## What is already good (do not “fix”)

- **Year lock.** Opening 2005 does not give you 2007’s iPhone.
- **Incomplete REAL writes nothing.** Honesty is a product rule, not a bug.
- **Shared shell.** Back, location bar, Exit — learn once, use every year.
- **Early rooms.** Yahoo drill, Amazon cart, Hotmail, I’m Feeling Lucky, Space Jam — these *are* the museum.
- **Games wing as a side door.** Correct split. Do not merge it into year shells.
- **1994–1999 table layouts, gray faces, sparse Google.** That look is the UI. Do not modernize it.

If a change makes 1996 look like a 2020 marketing site, it is the wrong change.

---

## What we are actually lacking

Ranked by visitor impact. Not by file count.

### 1. One obvious first click (ease)

The hub is a brochure: First night, atlas, 1994, 1998, 2005, 2007…2020, games, directory.

A first-time visitor should see:

- **one** start
- **one** resume (when they have a last year)
- everything else under “or jump to a year”

Until that is true, people bounce before they reach 1998 Google.

**Where:** `index.html` start-path row.

---

### 2. Late-year costume honesty (UI trust)

After ~2015 the *facts* are often right and the *frame* is wrong.

Example on disk today: `years/2020/index.html`

- `<title>` is still **Internet Explorer — 2020**
- Open Location still says **Open Location in Internet Explorer**
- Shell CSS is still `win95-netscape.css` + `ie5-overrides.css`

Visitors do not read that as “Win7 residual / honest desktop.”  
They read it as “this year didn’t finish dressing.”

That is a trust problem. It is bigger than missing a logo GIF.

**Where:** year shells `years/2015/` … `years/2020/index.html` and the chrome those shells load.

---

### 3. Gold actions that play like the product (UX feel)

The lean-year pattern is:

1. Tick two honesty boxes  
2. Then the real control writes `ittYY-*`

That is good museum ethics. It is weak game feel.

| Feels like using the year | Feels like a quiz |
|---------------------------|-------------------|
| 1995 SSL checkout (name + card + city) | About page “Save thesis literacy” |
| 1998 I’m Feeling Lucky | Dest-field “I saw this” plaques |
| 2007 iPhone (capacity + Safari, App Store is the trap) | Extra leftover rooms that only ack |
| 2020 Zoom (mute → chat → Leave) when it works | Same year as a wall of bans |

Lean doors (2007 / 2009 / 2011 / 2013 / 2015–2020) lean too hard on the checkbox machine.

**Rule to keep:** incomplete still writes nothing.  
**Rule to add:** the *save* should be the period verb (Like, pinch, Leave, Continue), not the literacy tick.

**Full walkthrough:** [`UX-GOLD-ACTIONS.md`](UX-GOLD-ACTIONS.md) — good vs quiz gates, every lean gold on disk, what “incomplete” should mean.

**Shipped 2026-08-22:** Gold / P0 saves no longer require honesty ticks. Face ID is Look → Unlock. GDPR is Manage → Save. Traps (App Store, Beacon, Join, Accept All) still never write.

---

### 4. Starting Point is a dashboard, not a homepage (scan / ease)

A typical year home now stacks:

1. ★ One-thing chip  
2. Guided 6  
3. 5× leftover rail  
4. Year-true pack  
5. Popular 3×  
6. Another 3×  
7. *Then* the period “Welcome to the Web” page

Example: `years/1995/pages/home.html` puts a dark rounded guided card on a gray Netscape page. Testers love it. The exhibit fights itself.

A visitor should see:

- one star  
- one short trail  
- the year page  

The rest can live on the flow map (`pages/map.html`).

---

### 5. Late years look empty (visual UI)

| Band | Visual feel |
|------|-------------|
| 1994–2001 | Reconstructions + harvested GIFs. Rooms feel like sites. |
| 2002–2008 | Dense forests. Playable, sometimes clone-bleed. |
| 2009–2013 lean | Thin but thesis-clear. Few pixels. |
| 2015–2020 | Almost **no** period image files. Text + checkboxes. |

File count is not completeness. 1996 with Space Jam planets beats a 300-page forest of leftover plaques.

**Never invent brand pixels.** Harvest from Wayback / Web Design Museum / Version Museum, or mark **RECON / failed-final**. Empty + honest is better than a fake logo. Empty + no still *and* no costume is why 2020 feels thin.

---

### 6. Progress you can see (reward)

The pieces exist:

- `itt-last-year` resume (lean doors fixed 2026-08-22)
- Passport stamps (`js/museum-progress.js`)
- Year meter (`js/ux/year-meter.js`)
- REAL status spans on gold rooms

They do not *drive* the session. After one gold action the visitor should feel “that year is stamped” and see a single Next.

Quiet storage writes are correct technically and invisible emotionally.

---

### 7. Repeat-visit friction (ease)

- Connect overlay is perfect **once** (1994 dial-up especially).
- Seeing it on every lean-year return, even with Skip, is a speed bump.
- Remembering “already connected this year this browser” would do more for ease than another yellow coach.

Phone is a second-class museum by choice (desktop-first shells). That is honest. What is lacking is a *readable* phone path into a year, not a mobile-native Win95 clone.

---

## Two different problems (do not mix them)

| Problem | Feels like | Fix looks like |
|---------|------------|----------------|
| **Broken flow** | Click does nothing / 404 / write fails | Repair the machine. We already gate this. |
| **Hard to use** | “I don’t know where I am / what to do / why this looks like IE in 2020” | Fewer rails, honest chrome, one gold verb |

Green Playwright does **not** mean the visit felt good. Tests click Skip, kill overlays, and follow selectors. A human still has to want the next click.

---

## Museum chrome vs period chrome

We currently layer extra UI on the exhibit:

| Layer | Job | Risk |
|-------|-----|------|
| Year shell (OS + browser) | Period costume | Late years still wear IE |
| Product HTML | The site itself | Lean years too thin |
| UX pack (`js/ux/`) | Coach, here-strip, meter | Extra yellow chrome |
| Home rails (5×, 3×, guided) | Auditor / leftover coverage | Buries the year page |

The UX pack can be turned off (`?ux=0` or `itt-ux-off`). That is good. Starting Point rails cannot. That is why homes feel loud.

**Principle:** museum voice belongs on About, honesty boxes, and the hub. Product room *bodies* should look like the year.

---

## What I would do next (if we only improve ease)

Do these in order. Stop when first-night feels short.

1. **Hub:** one Start + one Resume. Demote the other year jumps.  
2. **2015–2020 shells:** title, Open Location, and chrome CSS match Chrome / Edge / Win10 habit — not IE 5 dialogs.  
3. **Each lean gold room:** one period verb is the save; boxes are optional literacy, not the gate in front of the fun.  
4. **Starting Point:** star + guided 6 + period home. Move 5× / 3× / packs to the map.  
5. **Stills:** harvest or RECON a handful of year-true images for 2010+ gold rooms.  
6. **Stamp + Next:** after gold write, show passport + one next room.  
7. **Remember Skip** on connect for this browser + year.

Do **not** start with: another 5× pack, another leftover trio, restoring a wiped forest, or a React rewrite.

---

## How to walk this yourself (10 minutes)

1. Open `/` as if you have never seen the repo. Count primary buttons before you understand the product.  
2. Click **1995** → do SSL checkout. Notice you *used* a store.  
3. Click **2020** → read the shell title and Open Location. Notice the costume.  
4. Open `years/1995/pages/home.html` vs `years/2020/pages/home.html`. Count museum rails above the year page.  
5. Exit 2007, return to `/`, confirm **Continue 2007** appears.

That walk *is* the UX audit. This file only names what you will feel.

---

## Related files (only if you need them)

| File | Use |
|------|-----|
| `README.md` | How to run · what years exist |
| `docs/ARCHITECTURE.md` | Do not fork engines |
| `js/ux/README.md` | Coach pack on/off |
| `docs/UI-UX-IMPROVEMENT-PLAN.md` | Older phase list (2026-08-01; hub range in it may lag) |
| `docs/SOURCES.md` | Where stills and chrome references come from |
| Year `docs/YYYY-READ-FIRST.md` | Thesis · star · bans for that door |

If a markdown file disagrees with `years/` or the hub, **disk wins**.
