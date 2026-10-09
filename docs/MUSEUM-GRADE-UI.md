# Museum-grade UI and UX

**Date:** 2026-10-04
**Status:** Map. Phases 1–7 are done. Phase 7 is the public URL, 2026-10-07.
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · `js/year-card.json`. Hub is **25 doors** (1994–2015 and 2020–2022). **2015 is the React door.** **2017–2019 and 2023–2025 are absent.** **2009 is live** (Like `itt09-like`). Forests **1994–2006** stay frozen.
The live door count is 26 in [`DISK-TRUTH.md`](DISK-TRUTH.md).
**Looked at:** every year 1994–2022 on `http://127.0.0.1:8080`, desktop 1100px. HTML doors are `years/YYYY/pages/home.html`. 2015 is `/app/index.html#/year/2015`.

Museum grade means a visitor can enter any live door, tell what year they are in from the window, do the one star, and leave by a trail that is the same year. It does not mean more rooms, a shared Chrome skin, or a modern lobby.

Phases 1–7 below stay shipped. Remaining visitor UI+UX on dests already on disk (honesty writers, dest-in-window, receipt glass, 390 rewalk, 2015 React glass, public tree vs local) lives in [`MUSEUM-GRADE-UX-COMPLETE.md`](MUSEUM-GRADE-UX-COMPLETE.md). Five UX phase locks: [`MUSEUM-GRADE-UX-PHASES.md`](MUSEUM-GRADE-UX-PHASES.md). Do not reopen these seven chrome phases as a new program.

## Done when

1. Each of the 25 doors opens from the hub and the window matches that year's OS and browser.
2. Starting Point shows six guided steps and that year's flows. Each list is one card. The card belongs to that year.
3. A flow row shows its stop number once.
4. The period footer is one row. It does not cover the lists.
5. The status line says `Document: Done` and a small second count. A load that never started does not print about a billion seconds.
6. A trap, an empty field, and a missing pick write nothing. The star key is the only official save.
7. A visitor never sees `[failed-final]`, a storage key, or the words "Open leftover" as the thing to do.
8. At 390px the year window still fits. The menu stays on screen. The directory row is still reachable.
9. `docs/checklists/` can be ticked for every live door. 2020 and 2021 get a checklist. 2017 does not come back.
10. One public URL serves the same tree. Until then the museum is local.

## The seven phases

| Phase | What it finishes | State |
| --- | --- | --- |
| 1 | A card on both Starting Point lists, for every live year | Passed. `e2e/start-cards.spec.js`, 25 of 25. Every HTML home plus the 2015 guided six. |
| 2 | One footer, one stop number, an honest status clock | Passed. `e2e/phase2-footer-clock.spec.js`, 51 of 51. Every HTML year plus 2015. 2026-10-04 |
| 3 | The window matches that year: toolbar, address, coach | Passed. `e2e/phase3-window.spec.js`, 88 of 88. Every HTML address and coach line. 2026-10-04 |
| 4 | Phone, 390px, all 25 doors | Passed. `e2e/phase4-phone.spec.js`. Lists match, guided is six, the menubar stays inside 390. |
| 5 | Builder words off the glass | Passed. `e2e/phase5-glass.spec.js`, 27 of 27, 2026-10-04 |
| 6 | The walk matches the checklist, then the boxes get ticked | Walked. 548 ticked, 44 left open. 2026-10-05 |
| 7 | One public URL | Passed. https://sourabhligade.github.io/internet-through-time/ serves the 25 doors. 2017–2019 and 2023–2025 are 404. |

## Where the cards stand

Both lists measured at 1100px. A year holds when guided and flows share one card.

| Year | Guided card | Flows card | Grade |
| --- | --- | --- | --- |
| 1994 | Win95 gray `#c0c0c0` | same | Holds |
| 1995 | Win95 gray | same | Holds |
| 1996 | Win95 gray | same | Holds |
| 1997 | Win95 gray | same | Holds |
| 1998 | Navy `#0a246a` | same | Holds |
| 1999 | Navy | same | Holds |
| 2000 | Navy | same | Holds |
| 2001 | Navy | same | Holds |
| 2002 | XP blue `#3a6ea5` | same | Holds |
| 2003 | XP blue | same | Holds |
| 2004 | XP blue | same | Holds |
| 2005 | XP blue | same | Holds |
| 2006 | XP blue | same | Holds |
| 2007 | XP blue | same | Holds. Both lists use `#cfe4ff`. |
| 2008 | XP blue `#3a6ea5` | same | Holds. Phase 1. Page background is Luna beige `#ece9d8`. |
| 2009 | Like blue `#3b5998` | same | Holds. The card stays Like blue. The page is `#e7ebf2`. |
| 2010 | Light `#f2f2f2` | same | Holds. Both lists use `#125688`. |
| 2011 | Google red `#dd4b39` | same | Holds. Phase 1. Links `#ffe8e4`. |
| 2012 | Light `#f2f2f2` | same | Holds. Both lists use `#125688`. |
| 2013 | Vine green `#00bf8f` | same | Holds |
| 2014 | Light `#f2f2f2` | same | Holds. Phase 1. The black bar is gone. |
| 2015 | React door, Periscope | same door | Holds. `/app/index.html#/year/2015` opens the guided six. |
| 2017 | no door | | Absent. `#/year/2017` says it is not a door. |
| 2018 | no door | | Absent. Same page. |
| 2019 | no door | | Absent. Same page. |
| 2020 | White Chrome | same | Holds. The page is `#f8f9fa`, the same canvas as 2021 and 2022. |
| 2021 | White Chrome | same | Holds. Phase 1. Flows stay two columns. |
| 2022 | White Chrome | same | Holds |
| 2023–2025 | no door | | Absent. Leave them absent. |

All 25 live doors hold on the Starting Point cards. Commit `04f48d26f` removed the fill that painted every Starting Point as a white Chrome card. That fill was hiding broken rules. It stays off.

## Phase 1 — Cards

**Done.** First pass put the missing cards back. The second pass covers all 25 HTML homes and the 2015 door. `ui/year/start.js` was not given the catch-all back.

| Year | Second pass |
| --- | --- |
| 2007 | Both lists use `#cfe4ff`. The row text `#90caf9` stays in the data. The stylesheet wins. |
| 2009 | The card stays `#3b5998` with `#d8dfea` links. The page is `#e7ebf2`, so the Luna blue fill does not paint the whole window. |
| 2010, 2012 | Both lists use `#125688`. The row text `#9fd4f0` stays in the data. The stylesheet wins. |
| 2020 | `css/period-2020.css` paints the page `#f8f9fa` with `#202124` text. The card stays white. |

| Year | What was put back |
| --- | --- |
| 2008 | XP card `#3a6ea5`, links `#cfe4ff`, page `#ece9d8`. Wipe `3498b60b13` had removed these. |
| 2011 | Blank `html[data-itt-year=""]` selectors that used to say `2011` say `2011` again. The card that wins is `#dd4b39`, links `#ffe8e4`. `period-2011.css` still forces link blue on a page with no `#itt-year-ui`. A later rule in `start.css` beats that flatten. |
| 2014 | Both lists are `#f2f2f2`. `period-2014.css` still has an unscoped `.ott-guided { background: #111 }`. The year rule wins. |
| 2020, 2021 | Same white card and `#1967d2` links as 2022. 2021 flows stay two columns. |

Do not redo Phase 1. A later phase that touches `start.css` must remeasure all 25 HTML homes before it is called done. Guided stays six. 2004 keeps 8 flows. 2013 and 2014 keep 9. The other HTML years keep 10.

## Phase 2 — One footer, one number, one clock

**Done.** Homes already had one footer, a hidden exhibit nav, and the stop number inside the link. The clock was hidden on the Chrome-habit shell and missing on the React door.

| File | Change |
| --- | --- |
| `ui/year/shell.js` | Chrome-habit `#status` is no longer `hidden`. |
| `css/period-2022.css` | `.statusbar` stays on screen. The other Chrome-habit chrome stays hidden. |
| `react/src/YearRail.jsx` | `#status` reads `Document: Done (N sec)`. A count over 600 seconds is omitted. |
| `react/src/styles.css` | `.react-status` is the 2015 line. |
| `js/browser/create.js` | The comment now says a zero `loadStartedAt` is the epoch. The second-count math is unchanged. |
| `app/` | Rebuilt in Phase 3. Current script is `index-Cp5Cu98S.js`. |

Every live Starting Point. Open `years/YYYY/pages/home.html` except 2015, which is the React door.

| Check | Pass | Fail |
| --- | --- | --- |
| `#itt-exhibit-foot` | One row under the lists | A second nav, or the row covering a list |
| `#itt-exhibit-nav` | Hidden | A second menu above the lists |
| Flow row | The number is inside the link. `.ott-flows ol` is `list-style: none` | The `ol` marker adds a second number |
| Status | Open `years/YYYY/`, load a room. The line is `Document: Done` plus a small second count | About a billion seconds, or no line at all |

Do this in groups. One year from the group is enough if the shell is shared. If that year fails, open every year in the group.

| Group | Years | Shell to open |
| --- | --- | --- |
| Win95 | 1994, 1995, 1996, 1997 | [1994](http://127.0.0.1:8080/years/1994/) |
| Win98 / IE | 1998, 1999, 2000, 2001 | [1998](http://127.0.0.1:8080/years/1998/) |
| XP card years | 2002, 2003, 2004, 2005, 2006, 2007, 2008 | [2004](http://127.0.0.1:8080/years/2004/) and [2008](http://127.0.0.1:8080/years/2008/) |
| Like | 2009 | [2009](http://127.0.0.1:8080/years/2009/) |
| Light desktop | 2010, 2011, 2012 | [2011](http://127.0.0.1:8080/years/2011/) |
| Vine | 2013 | [2013](http://127.0.0.1:8080/years/2013/) |
| Flat | 2014 | [2014](http://127.0.0.1:8080/years/2014/) |
| React | 2015 | [2015](http://127.0.0.1:8080/app/index.html#/year/2015) |
| Chrome habit | 2020, 2021, 2022 | [2022](http://127.0.0.1:8080/years/2022/) |

Files if a group fails:

- Footer and the `ol` marker: `ui/year/start.css`
- Status clock: `finishDocumentLoad` in `js/browser/create.js`. A zero `loadStartedAt` is the epoch. `navigate` stamps the start, and a duration over 600 seconds is omitted.

2015 has no HTML footer. The pass there is the status of the React shell, not `#itt-exhibit-foot`.

## Phase 3 — The window is that year

**Done.** Toolbar GIFs already resolved. Every HTML address matches `js/year-card.json`. 2020 and 2021 are Win10 Chrome habit on `http://home.microsoft.com/intl/webYEAR/`. 2022 stays on `https://www.google.com/web2022/`. The coach line on every HTML year says the museum list and this year's Starting Point. `copy-bank.js` was left as it is. 2023, 2024, and 2025 use the same not-a-door page as 2017, 2018, and 2019.

| File | Change |
| --- | --- |
| `react/src/YearRail.jsx` | The star name shows on the Starting Point only. A stop's header is that stop. |
| `react/src/App.jsx` | 2017, 2018, and 2019 say they are not a door and link to the museum hub. |
| `app/` | Rebuilt. Current script is `index-Cp5Cu98S.js`. |

`ui/year/years.js` names the toolbar GIF folder. Recheck the pictures. Do not invent a new toolbar.

| Year | `chrome` folder | What to confirm |
| --- | --- | --- |
| 1994–2002 | that year | Back, forward, stop, reload, home resolve. No broken-image icon. |
| 2003 | `2004` | The ten buttons are the 2004 GIFs, not a request to `assets/period/2003/chrome/`. The old map said that folder 404s. The field already points at 2004. Confirm the images return 200. |
| 2004 | its own | Same buttons, plus the address is a 2004 location. |
| 2005, 2006 | that year | Own folder. Buttons resolve. |
| 2007, 2008 | `2004` | XP buttons, not a missing 2007 or 2008 folder. |
| 2009 | `2007` | Those GIFs return 200. The card stays Like blue. The page is `#e7ebf2`. |
| 2010–2014, 2020–2022 | `null` | No GIF toolbar is expected. The lean shell is the window. A missing-image icon is a fail. |
| 2015 | React | No GIF toolbar. The chrome is the React habit shell. |

Then these four, which are not the GIF check:

| Door | Look |
| --- | --- |
| [2022](http://127.0.0.1:8080/years/2022/) | Address is this year's location. It does not say `home.microsoft.com` under a Chrome-habit title. |
| [2015](http://127.0.0.1:8080/app/index.html#/year/2015) | Header is the stop you are on. It is not the star name on every stop. |
| `#/year/2017`, `#/year/2018`, `#/year/2019` | Must not open the 2015 door. An absent year shows the hub, or a plain "not a door" page. It does not show Periscope. |

Coach. `injectShellNavLegend` in `js/browser/chrome-ui.js` already says: lost visitors use the museum list for all years, and toolbar Home is this year's Starting Point. `js/ux/copy-bank.js` says the same sentence. That sentence is on screen for every HTML year. If a year still says Starting Point is the year map, change that year in `copy-bank.js` only.

## Phase 4 — Phone

**Done.** Measured every live door at 390×844. Help, the directory, Start, Home, and the cards already fit. The Chrome-habit directory chips were 32px tall because the shared 640px rule sets `min-height: 32px` on every directory button. `css/chrome-habit.css` puts those chips back to 16px on a phone. 1994 keeps its own sheet. The second pass also locks six guided steps, matching list colors, and every top menubar label inside 390. The menubar already fit, so no shell sheet changed. The 2009 page is `#e7ebf2` and the 2020 page is `#f8f9fa` inside the window too.

Viewport **390×844**. One pass per door. Do not edit until that door has been opened at this size. The 2026-09-29 notes are a lead, not a current measurement.

| Years | What must be true |
| --- | --- |
| 1994–1997 | The icon gutter does not steal the width. Help is on screen. The directory row wraps. It is not `display: none`. |
| 1998–2001 | Same. The navy cards from Phase 1 still fit. Text does not run under the window edge. |
| 2002–2009 | Directory wraps. Start and the year's own toolbar Home stay reachable. 2004 must still show Start, Gmail, and Flickr. |
| 2010–2014 | The light, red, green, or gray card is still one card. No sideways scroll. |
| 2015 | The verb is in the first screen. The storage key is not. The rails do not take the whole screen before the verb. |
| 2020, 2021, 2022 | Directory stays, as 2022 already did on a phone. Chips stay about 16px. 2021's two columns may stack. They may not overflow. |

Files, only after a door fails: the year shell CSS for that OS (`css/period-YYYY.css` or the shell sheet that door already loads). Do not add a shared phone skin that repaints 1994 and 2022 the same way.

## Phase 5 — Words off the glass

**Done.** `[failed-final]` stays in the HTML. `js/immersion/boot.js` loads `css/itt-dest-page.css` on every dest, and that sheet clips `.itt-pixel-failed` and `.archive-residual`. The same boot pass now marks a `code` tag whose whole text is a storage key (`itt` plus the year plus a slug) with `data-itt-clip`, which that sheet already hides. The sentence around the key stays. A save receipt such as `Saved · itt04-openoffice` stays, because Board D already requires that line.

The 42 buttons already used the sentence on the page. Five pages never name another action, so the button stays **Open leftover**: `extremetech`, `hatena`, `redhat`, `lenta`, `kuro5hin`. 2015 shows no builder line and no readable key. The header on a stop is that stop.

A visitor does not see a builder note, a storage key on the room, or "Open leftover" as the action except on those five pages.

One dest in each live HTML year is locked: the builder line is clipped, and a `code` storage key is clipped. 2015's Apple Music stop is locked the same way.

Phase 5 does not invent a verb. The button, the keep pick, and the field placeholder use the bold sentence already on the page.

The 42: `h2g2`, `wikitravel`, `memoryalpha`, `discogs`, `macrumors`, `distrowatch`, `softpedia`, `extremetech`, `fileplanet`, `spybot`, `adaware`, `xboxlive`, `photoshopcs`, `office2003`, `openoffice`, `fedora`, `knoppix`, `hatena`, `live365`, `investopedia`, `fatwallet`, `redhat`, `salesforce`, `teoma`, `alltheweb`, `americangreetings`, `battlenet`, `diaryland`, `epinions`, `ehow`, `ezboard`, `lenta`, `netzero`, `ivillage`, `weatherbug`, `urbandictionary`, `eurogamer`, `gamerankings`, `mobygames`, `sourceforge`, `kuro5hin`, `everything2`.

A new room is not part of this phase. A verb that is only "Open leftover" is not a room.

## Phase 6 — The walk, then the tick

**Walked 2026-10-05.** 592 checklist lines against `http://127.0.0.1:8080`. A box was ticked only after that URL did what the line says. The files on 2026-10-07 hold 561 ticked boxes and 31 open boxes.

`docs/checklists/2020.md` and `docs/checklists/2021.md` were written from the live trails and walked: 14 of 14 each. 2022 was already a file: 14 of 14. 2017–2019 and 2023–2025 still have no file.

The nine breaks below were fixed before the tick. Gem Cascade (`itt04-game-gemcascade`) was ticked from the same `years/2004/sites/playable/game.html`: a plain Start writes nothing, and `?fast=1` on that URL calls the same `saveBest` writer.

Still open, on purpose:

- 2000 stops 21–40 (20). Those folders are not the phase. Do not build them.
- 2008 leftover pack: each KEEP dest, leftover never writes the star, and next is a 2008 dest. The App Store visit itself is ticked. 103 of 104 dest folders already have a save control. The game cabinet is the one without a leftover panel.
- 2011 and 2015 image lines. `assets/period/2011/` and `assets/period/2015/` are absent.
- 2015 stops whose names are not on the live door: `itt15-googlephotos`, `itt15-applemusic`, `itt15-snap-discover`, `itt15-discord`, `itt15-le`, `itt15-game-blobrush`. The door, the guided six, Periscope, Windows 10, Edge, Watch, and the empty leftover list are ticked.

Closed 2026-10-05 after a visit: Slashdot stores `{real, official, comments}` on `itt97-sd-comments-ie4`. 2007 MySpace, eBay, and Wikipedia write `*-lx` and show Next. 2010 Google and Android, 2012 YouTube, and 2013 YouTube and Twitter write the checklist leftover key. Empty and trap write nothing. The year star stays empty. 2013 Twitter still writes `itt13-tweets`. Play on 2012 YouTube still writes `itt12-yt`.

Fix the breaks first. Then walk `docs/checklists/`. Tick a line only after that URL does what the line says. An unticked line is honest. A ticked line that was not opened is not.

Breaks, before any of these years can be ticked all the way through:

| Year | Break |
| --- | --- |
| 1995 | Pathfinder plaque, year-game key split, AuctionWeb missing from the start |
| 1997 | HotBot does not navigate after a save |
| 1999 | AllAdvantage empty-check misses |
| 2000 | Boo.com and Webvan empty-checks miss |
| 2001 | Wikipedia empty-check misses |
| 2003 | LinkedIn empty-check misses |
| 2005 | YouTube empty-check misses |
| 2006 | Twitter empty-check misses |
| 2007 | iPhone empty-check misses |

Checklists. Open counts are the 2026-10-04 list, except 2020 and 2021, which are the files now.

| File | Open | Rule for this phase |
| --- | ---: | --- |
| 1994, 1995, 1996, 1997, 1998, 1999 | 23 | Official 10, then the sample leftover trail |
| 2000 | 43 | Tick only stops that exist. Stops 21–40 in `docs/2000-DOUBLE-TRAIL.md` are not on disk. Leave those boxes open. Do not build the folders. |
| 2001, 2002, 2003 | 23 | |
| 2004 | 21 | Official trail is 8, not 10 |
| 2005 | 22 | |
| 2006 | 23 | |
| 2007 | 30 | |
| 2008 | 17 | |
| 2009 | 19 | Live door. Ignore older docs that say 2009 stays boarded. |
| 2010 | 25 | |
| 2011 | 14 | |
| 2012 | 24 | |
| 2013 | 39 | |
| 2014 | 19 | |
| 2015 | 14 | React URL is the right one |
| 2020 | 0 | 14 of 14 in `docs/checklists/2020.md` |
| 2021 | 0 | 14 of 14 in `docs/checklists/2021.md` |
| 2022 | 14 | |
| 2017–2019, 2023–2025 | no file | Do not add one |

## Phase 7 — Publish

Done 2026-10-07. GitHub Pages, legacy build, branch `museum/1994-2020-lean`, root `/`. Public URL: https://sourabhligade.github.io/internet-through-time/

The published tree is the tree already on that branch. It serves the same 25 doors. It does not serve 2017–2019 or 2023–2025. The hub is still the year cards, not a marketing page.

Actions billing is still locked, so the Pages workflow cannot run. The live site is the branch publish, not that workflow. Local checks stay at `http://127.0.0.1:8080`.

## Not these seven phases

- Famous-double ceilings. Caps, not quotas: 2007 to 64, 2010 to 56, 2011 to 72, 2012 to 62, 2014 to 48, 2020 to 42, 2021 to 34, 2022 to 48. No new rooms until you name them.
- 1999–2004 doubling. Still waits on the word `2x`. The 2004 map is `docs/2x-harvest-d-2004.md`.
- New dest folders under 1994–2006.
- Restoring 2017, 2018, 2019, or 2023–2025.
- The code scan. It is not the visitor walk.

## Order

1. Phase 1 is done. Do not put the catch-all Chrome fill back.
2. Phase 2 is done. The Chrome-habit status line stays visible. Do not put `hidden` back on `#status`.
3. Phase 3 is done. Do not send `#/year/2017` back to the 2015 door. The star name stays off a stop's header.
4. Phase 4 is done. Chrome-habit directory chips stay about 16px on a phone. Do not paint 1994 with that skin.
5. Phase 5 is done. Leave `[failed-final]` in the HTML. The five generic buttons stay Open leftover.
6. Phase 6 breaks, then tick.
7. Phase 7 is done. The public URL stays the 25-door tree. Do not add 2017–2019 or 2023–2025 to it.
