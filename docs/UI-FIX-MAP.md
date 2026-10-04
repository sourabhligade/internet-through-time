# UI fix map

**Historical (2026-09-30 docs pass).** Not ship law. Live hub is **27 doors** (1994–2017 and 2020–2022). **2015 and 2017 are React.** **2018, 2019, and 2023–2025 are absent.** Leftover-3× unique catalogs are **empty**. Current maps: [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`INCOMPLETE-MAP.md`](INCOMPLETE-MAP.md) · [`UNDONE-UNPLANNED-MD.md`](UNDONE-UNPLANNED-MD.md).


Date: 2026-09-29. Checkable map of `docs/UI-FIX-LIST.md`. Status: passes A, B, and C were implemented the same day. The tables below are the findings from before that pass. Open the URLs on http://127.0.0.1:8080. Phone width means 390px.

```
hub (clean — year number only)
 │
 ├─ HTML door
 │ shell chrome
 │ ├─ 1994–2014 phone: directory hidden
 │ ├─ 1994 only phone: 92px icon gutter, Help menu off-screen
 │ ├─ 2003 only ten toolbar GIFs 404
 │ ├─ 2000–2004 coach says Starting Point is the year map
 │ ├─ 2010–2013 same wrong coach sentence
 │ ├─ 2016, 2022 directory stays (Win10 CSS)
 │ └─ 2022 address is still home.microsoft.com
 │ then the room
 │ ├─ 1994–2013, 2009, 2010, 2012 [failed-final] is visible
 │ └─ 2014, 2016, 2022 that line is clipped
 │
 └─ React door 2015 and 2017
 header shows the star name on every stop
 rails take the top of a phone
 stop shows [failed-final], the storage key, and the verb below the fold
```

Atlas and `/404.html` are side doors. They fit. They are not in the fix passes.

## Pass A — words on the glass

One CSS rule covers the HTML rooms. Do not edit the 4,268 pages.

| Check | Now | File |
| --- | --- | --- |
| `/years/1994/sites/csotd/index.html` | First line is `[failed-final] csotd period still · no invented brand pixel` | Clip `.itt-pixel-failed` from `css/itt-dest-page.css`, the sheet every dest already loads. 2014, 2016, and 2022 already clip it in their period sheets. |
| Same URL | Dashed “Museum reconstruction…” note under the mark | `archive-residual` in that room. Leave the period page under it. |
| `/app/index.html#/year/2017?stop=itt17-twitter-280` | Two `[failed-final]` lines and `itt17-twitter-280` | `react/src/OfficialStop.jsx` (the `<code>` and the failed paragraph), `react/src/ProductFace.jsx` (the brand-pixel line), `react/src/YearRail.jsx` (the same line on the start screen). |
| Same URL, 390px | Header reads “2017 Face ID” while the title is Twitter 280. Tweet is below the fold. | Header is `YearRail.jsx`: Museum, All React years, year, `{star}`, `{label}`. Rails are `.rails` in `react/src/styles.css` (`max-height: 32vh` still measured 293px). The door is a `100dvh` grid, so the stop cannot grow the page. |
| `/app/index.html#/year/2017?stop=itt17-switch` | “Fortnite-on-Switch is .” | `react/src/year2017.js` stop n=6 |
| `?stop=itt17-musically` | “Not TikTok US mass .” | same file, stop n=8 |
| `/app/index.html#/` | “2023–2025 stay wiped.” | `react/src/App.jsx` `Hall` |

After the React edits, rebuild with `cd react && npm run build`. Do not hand-edit `app/assets/`.

## Pass B — phone shell

Measured at 390×844. Directory hide is `@media (max-width: 640px) { .dirbar { display: none } }` in both `css/win95-netscape.css` and `css/netscape-chrome.css`. `.os-win10 .dirbar { display: flex }` in `css/chrome-habit.css` wins over that, which is why 2016 and 2022 keep the strip.

| Door | Phone now | Owns it |
| --- | --- | --- |
| `/years/1994/` | 92px left gutter, page 286px wide. Menu does not wrap: Help’s right edge was 443. Directory hidden. Page starts at y=414 because Navigate, coach, Machine/Web/Game, and the year line stack. Year menu link opacity 0.4. | Gutter: `css/netscape-chrome.css` `html[data-itt-year="1994"] .desktop { padding: … 92px }`. 1994 is the only year with `"maximized": false`. Menu: `.menubar` is a non-wrapping flex. Exit opacity: `.exit-bar { opacity: 0.55 }` in `css/win95-netscape.css`; 1994 measured 0.4. |
| `/years/2004/` | Directory hidden (Start, Gmail, Flickr, …). Toolbar wraps, so the buttons themselves fit. Same four bars on a first visit. | `css/win95-netscape.css` 640px rule. Same rule covers 1995–2014. |
| `/years/2016/` | Not opened on a phone. CSS keeps the directory because the body is `os-win10`. Toolbar is still the IE bar (`"toolbar": "ie"`). | `ui/year/years.js` 2016, `css/chrome-habit.css` |
| `/years/2022/` | Directory visible. Legends hidden. Page about 608px tall. Chips are 16px tall. Address reads `http://home.microsoft.com/intl/web2022/` under the title “Chrome habit”. | Address: `location` in `ui/year/years.js` 2022. Chip size: `.os-win10 .dirbar .dir-btn` in `css/chrome-habit.css`. |

Coach sentences, from `js/ux/copy-bank.js` `eraOfYear`:

| Years | Era | Sentence on the yellow bar | Matches the legend |
| --- | --- | --- | --- |
| 1994–1995 | early | Starting Point is the all-years list | Yes. The legend link goes to the hub. |
| 1996–1999 | nav | Year menu returns to the hub | Does not mention Starting Point |
| 2000–2004 | xp | Starting Point = year map | No. The legend on the same screen says Starting Point is all years. |
| 2005–2009 | web2 | Exit top-left returns to the lobby | Different wording |
| 2010–2013 | app | Starting Point maps the year | No |
| 2014–2022 | modern | Year menu leaves | 2016 and 2022 hide that legend |

The legend is injected by `injectShellNavLegend` in `js/browser/chrome-ui.js`. Toolbar Home is this year’s landing. One sentence should say that on every year.

## Pass C — 2003 pictures

`/years/2003/` requests `assets/period/2003/chrome/`. That folder is not on disk. 404s: `btn-back.gif`, `btn-forward.gif`, `btn-stop.gif`, `btn-reload.gif`, `btn-home.gif`, `btn-search.gif`, `btn-favorites.gif`, `btn-history.gif`, `btn-mail.gif`, `throbber.gif`. The words under the buttons still show. The field is `"chrome": "2003"` in `ui/year/years.js`. 2005, 2006, and 2007 already use `"chrome": "2004"`, and that folder has the GIFs.

## Check after each pass

1. Hub at `/` still shows 22 year numbers, one border, no chips.
2. Pass A: Cool Site has no `[failed-final]` line. Twitter 280 at 390px shows the Tweet button without the key and without the failed lines. Switch and musical.ly read as whole sentences. Hall does not say wiped.
3. Pass B: 1994 at 390px uses the full width, Help is on screen, and the directory row is there. 2004 at 390px shows Start and Gmail. 2004’s coach agrees with the legend.
4. Pass C: 2003 toolbar images return 200.
5. 2022 at 390px still has its directory.

## Left as they are

Hub cards. Atlas hallway. `/404.html`. The 22 open doors. 2009 stays off the hub. No new year trees.
