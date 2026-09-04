# Source catalog — gather research for any year

**Purpose:** One reusable file shape for **big URL + fact gather** before remaking or freezing a year.  
**Copy to:** [`YYYY/SOURCES.md`](SOURCE-CATALOG-TEMPLATE.md) → `docs/references/YYYY/SOURCES.md`  
**Pattern year:** [`../2020-SOURCES-100-PLUS-2026-08-11.md`](../2020-SOURCES-100-PLUS-2026-08-11.md) (128 rows).  
**Sprint leftover (one visitor-visible change):** [`SOURCE-KIT-TEMPLATE.md`](SOURCE-KIT-TEMPLATE.md) — do not put 100 URLs there.

This file is the **gather store**. It is not READ-FIRST, not a harvest essay, not CAPTURE, not ARTIFACTS-MAP.

| After catalog… | Write |
|----------------|-------|
| Locked thesis / bans / scale | `docs/YYYY-READ-FIRST.md` |
| Build order | `docs/YYYY-FROM-SCRATCH-….md` |
| Pixel attempts | `docs/references/YYYY/CAPTURE-LOG.md` |
| Room → path → `ittYY` key | `docs/references/YYYY/ARTIFACTS-MAP.md` |
| Cross-year scale line | [`SCALE-LEDGER.md`](SCALE-LEDGER.md) — one line, sourced from lock rows |

**Do not** start year HTML until the freeze bar in §6 is met.  
**Do not** invent a Live Stats June digit when the public table has no row.  
**Do not** invent brand pixels. CAPTURE is pixels; this catalog is **facts + URLs**.

---

## 0. How to use (any year)

```
1. Copy SOURCE-CATALOG-TEMPLATE.md → references/YYYY/SOURCES.md
2. Fill standing queries (section A) — same ~20 URLs every year
3. Add year-true primaries (B–F) — one-thing, P0, bans, game, voice
4. Tag every row OPEN / SNIP / BLOCK
5. Put extracted facts in the Took column (not “see page”)
6. Stop HTML until §6 freeze bar
7. Write READ-FIRST only from lock=yes rows
```

First pass: **30–40** rows (scale + one-thing + bans).  
Freeze: **80–130** rows (2020 bar).  
More is fine. Append. Never reuse an id.

---

## 1. How to read a row

| Column | Meaning |
|--------|---------|
| **Id** | `YYYY-NNN` sequential. Never reuse. If a fact was wrong, add a new row and write `supersedes YYYY-NNN` in Notes. |
| **Tag** | **OPEN** full page this pass · **SNIP** snippet enough to lock a date/number (reopen before About invent) · **BLOCK** WAF / bot / paywall |
| **Class** | `scale` · `one-thing` · `p0` · `p1` · `shell` · `ban` · `voice` · `pixel` · `wiki` · `court` · `newsroom` |
| **URL** | Canonical page you opened (or failed). One URL per row. |
| **Took** | What we pulled — dates, prices, quotes, honesty. This is the data. |
| **Lock** | **yes** = safe to paste into READ-FIRST / About. **no** = reopen or pair first. Wiki-only is never lock=yes. |
| **Pair** | Dual-cite partner id (Live Stats ↔ Netcraft, announce ↔ ship). |
| **Use** | `about` · `home` · `extras` · `game` · `capture` · `ban` |
| **Notes** | Bans this URL taught, BLOCK fallback, `supersedes`, later `room` / `ittYY-key` |

### Tag rules

| Tag | Allowed to lock? | Rule |
|-----|------------------|------|
| OPEN | yes | Prefer for one-thing + scale |
| SNIP | yes, if a second cite exists or the fact is a dated PR headline | Reopen before inventing About prose |
| BLOCK | no | Keep the row. Find a fallback (GovInfo, newsroom mirror, press reprint). |

### Class cheat

| Class | Typical section | Example |
|-------|-----------------|---------|
| `scale` | A | Live Stats June, ITU, Netcraft, HTTP Archive |
| `shell` | A | StatCounter, oldweb.today, GUIdebook, evolt |
| `one-thing` | B | The gold machine primary |
| `p0` / `p1` | C | Other spine / densify |
| `ban` | D | Next-year product that must **not** be this year’s default |
| `voice` | E | MeFi, Usenet, period press mood |
| `pixel` | F | Points at a CAPTURE attempt — do not store the image here |
| `wiki` | any | Cross-check only |
| `court` / `newsroom` | B–D | Statute, FTC, Apple/Google PR |

---

## 2. Standing queries (seed every year)

Open these first. Same list for 1995 and 2020. Leave Took empty until visited.

| # | Class | What to open | What to take |
|---|-------|--------------|--------------|
| 1 | scale | [Internet Live Stats — websites](https://www.internetlivestats.com/total-number-of-websites/) | June cell for YYYY. **Blank stays blank.** Table **ends 2018**. |
| 2 | scale | [Internet Live Stats — users](https://www.internetlivestats.com/internet-users/) | Users cell if present. Often stops **2016**. Do not invent. |
| 3 | scale | ITU Facts & Figures / year PR | Users count **and** % · label ITU |
| 4 | scale | Netcraft survey (Jan or Dec of YYYY) | Hostnames vs **active** — never blend |
| 5 | scale | Pingdom “Internet YYYY in numbers” (if it exists; ~stops 2012) | Dec websites + users class |
| 6 | scale | HTTP Archive / [Web Almanac page-weight](https://almanac.httparchive.org/) for YYYY | Median page KB · method label |
| 7 | shell | [StatCounter Global Stats](https://gs.statcounter.com/) May + Dec YYYY | Browser + OS mass |
| 8 | shell | oldweb.today + one Wayback year-home | Toolbar / default font honesty |
| 9 | shell | Version Museum + Web Design Museum year page | Product frame grammar |
| 10 | newsroom | Apple / Google / Microsoft / Facebook newsroom **year index** | Only what **shipped** that year |

Then add year-true rows. Do not pre-invent products.

**Expanded diet** (use when the year needs them) — [`../SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](../SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md):

| Id | Source | Use |
|----|--------|-----|
| X-OWT | oldweb.today | Shell feel, not embed |
| X-HTTP | HTTP Archive / Almanac | Page-weight third axis |
| X-ITU | ITU PR / FF PDF | Users % |
| X-STAT | StatCounter | Chrome overtakes IE, etc. |
| X-CISCO | Cisco VNI | Video % of traffic (streaming years) |
| X-CONG | Congress.gov · C-SPAN | Hearings (2018) |
| X-CMP | CMP / GDPR papers | Banner vs Manage (2018) |
| X-HIG | Apple HIG archives | iOS 7 / Watch / Face ID chrome language |
| X-APK | APKMirror historical | Mobile interiors |
| X-VOICE | Usenet · MetaFilter · IA TV | Period voice |

---

## 3. Year-true sections (after standing queries)

| Section | What goes here | Stop when |
|---------|----------------|-----------|
| **B. One-thing** | ≥2 OPEN/SNIP primaries for the gold machine | Dual-cite or one newsroom + one corroboration |
| **C. P0 / P1** | Other spine + densify | Each P0 has a dated primary |
| **D. Bans** | URLs that prove the **later** date | Every hard ban has one row |
| **E. Voice / culture** | Mood, event, careful bar | Optional; required for trauma-adjacent years |
| **F. Game** | Inspiration class only | No official art URL as a pixel source |

One-thing and game stay **split**. Do not promote the year game over the gold machine.

---

## 4. Fact rules (already law in this repo)

| Id | Rule |
|----|------|
| **P-A1** | Live Stats **users** cell blank → class only · never invent an integer |
| **P-A2** | Announce date ≠ ship date → two rows + Pair |
| **P-A3** | Character / locale exceptions stay on the row (Twitter CJK 140) |
| **P-A4** | Shutdown rooms name leftover functions if the primary does |
| **P-A5** | Security = literacy · never store malware / exploits |
| **P-A6** | Undisclosed M&A → press range only |
| Dual-cite | Hostnames vs users vs active sites are **three** labels, never one blended “scale” |
| Wiki | Never the only lock on a number |
| BLOCK | Keep the row · add fallback · do not delete |
| Pixels | Outcome goes to CAPTURE-LOG (`[wa]` / `[failed-final]`) · catalog only points at the attempt |

Paste only **lock=yes** facts into About / READ-FIRST. Always label the source on visitor copy.

---

## 5. Row template (paste into the year file)

```md
| YYYY-001 | OPEN | scale | [Live Stats websites](https://www.internetlivestats.com/total-number-of-websites/) | June YYYY = N (or **no row**) | yes/no | | about | |
```

Worked examples (do not copy the numbers into another year):

```md
| 2020-045 | SNIP | scale | [Live Stats websites](https://www.internetlivestats.com/total-number-of-websites/) | June table **ends 2018**. Do not invent 2019/2020. | yes | 2020-046 | about | lock the honesty line |
| 2020-046 | SNIP | scale | [Netcraft Jan 2020](https://www.netcraft.com/blog/january-2020-web-server-survey) | **1,295,973,827** hostnames · **~189M** active | yes | 2020-045 | about | do not blend with Siteefy 1.03B |
| 2020-006 | SNIP | ban | [BI Zoom 300M edit](https://www.businessinsider.com/zoom-blog-post-daily-active-users-meeting-participants-2020-4) | “300M Daily Users” quietly became **participants** | yes | 2020-003 | ban | never write 300M unique users |
```

---

## 6. Freeze bar (enough to write READ-FIRST)

- [ ] Section A visited (or BLOCK + fallback) for Live Stats websites + one other scale cite  
- [ ] Blank June / users cells called out as **no row** — not filled with a guess  
- [ ] One-thing: ≥2 OPEN/SNIP primaries  
- [ ] Every hard ban: one URL that proves the **later** year  
- [ ] Game class: one inspiration URL · no official art as a harvest target  
- [ ] Count written at the top of `SOURCES.md`  
- [ ] No HTML / hub unlock yet  

Then write `YYYY-READ-FIRST.md` from lock=yes rows only.

---

## 7. After implement

Back-fill **Notes** with `room=sites/…` and `key=ittYY-…` so ARTIFACTS-MAP can stay thin.

Do **not** copy this catalog into year HTML. Visitors see labeled scale + period rooms, not a bibliography.

---

## 8. File map

```
docs/references/SOURCE-CATALOG.md          ← this spec
docs/references/SOURCE-CATALOG-TEMPLATE.md ← copy to YYYY/SOURCES.md
docs/references/YYYY/SOURCES.md            ← the gather file
docs/references/YYYY/CAPTURE-LOG.md        ← pixels
docs/references/YYYY/ARTIFACTS-MAP.md      ← rooms
docs/YYYY-READ-FIRST.md                    ← freeze from lock=yes
```

Existing one-off catalogs stay valid. New gathers use `references/YYYY/SOURCES.md` so every year has the same path.
