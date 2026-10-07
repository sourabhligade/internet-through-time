# UI fix list

**Historical (2026-09-30 docs pass).** Not ship law. Live hub is **26 doors** (1994–2016 and 2020–2022). **2015 is the React door.** **2017–2019 and 2023–2025 are absent.** Leftover-3× unique catalogs are **empty**. Current maps: [`DISK-TRUTH.md`](../DISK-TRUTH.md) · [`INCOMPLETE-MAP.md`](INCOMPLETE-MAP.md) · [`UNDONE-UNPLANNED-MD.md`](UNDONE-UNPLANNED-MD.md).


Date: 2026-09-29. Looked at the live museum on http://127.0.0.1:8080 in a headless browser at 1280×800 and 390×844. Pages: hub, 1994, 2003, 2004, 2022, atlas, React hall, 2015, Twitter 280, `/404.html`, and Cool Site of the Day. Status: the three passes below were implemented the same day. The notes are the findings from before that pass.

The hub is in the shape already chosen: 22 cards, year number only, same thin border, no era chips. Leave it.

## 1. Builder lines sit on the page

`[failed-final]` is the first line of Cool Site of the Day, above the blue header: “[failed-final] csotd period still · no invented brand pixel”. A dashed note under it says the room is a reconstruction. 4,268 HTML files under `years/` contain that mark. CSS clips it only for `data-itt-year` 2014, 2016, and 2022. On 1994–2013, 2009, 2010, and 2012 it renders as a normal paragraph.

The same sentence is on every React stop, and the product face adds “[failed-final] No invented brand pixel.” Twitter 280 at 390px shows both, plus the storage key `itt17-twitter-280`, and the Tweet button is below the fold. The header reads “2017 Face ID” while the title is Twitter 280, because the star name stays in the header on every stop.

Two 2017 facts are unfinished sentences: Nintendo Switch says “Fortnite-on-Switch is .” and musical.ly says “Not TikTok US mass .”

The React hall lede says “2023–2025 stay wiped.”

Fix: clip or delete the failed-final line everywhere a visitor can see it, the same way 2016 and 2022 already clip it. On the React door, drop the key from the page, put the current stop in the header, and let the verb sit in the first screen on a phone. Fill the two blank facts. Say the absent years are absent.

## 2. A phone loses the year window

At 390px, 1994 keeps a 92px left gutter for desktop icons (`html[data-itt-year="1994"] .desktop` padding). The page inside the window is 286px wide. The menu bar does not wrap, so Directory and Help run off the right edge (Help’s right edge measured at 443). The directory strip is `display: none` under 640px in `css/win95-netscape.css` and `css/netscape-chrome.css`. 2004 at 390px has the same hidden strip: Start, Gmail, Flickr, and the rest are gone. The start page still lists the sites. After you leave that page, the strip is gone.

Before the window, a first visit stacks four bars: Navigate, the coach, Machine/Web/Game, and the year line. On 1994 that pushes the page to y=414 of an 844px screen. The year-menu link on 1994 is at opacity 0.4. The coach disagrees with itself: 1994 says Starting Point is the all-years list, and the legend does go to the hub. The 2000–2004 coach, visible at the same time as that legend, says Starting Point is the year map. 2010–2013 says the same wrong thing.

2022 on a phone is the one that fits: the directory stays, the extra legends are hidden, and the page is about 608px tall. The chips are 16px tall. The address bar still shows `home.microsoft.com` under a “Chrome habit” title.

Fix: under 640px, drop the 1994 icon gutter, wrap the menu, and keep the directory as a wrapping row (2022 already does). Use one Starting Point sentence. The legend link is the hub. Toolbar Home is this year.

## 3. 2003 toolbar bitmaps are missing

2003 asks for `assets/period/2003/chrome/`, and that folder is not on disk. These ten return 404: back, forward, stop, reload, home, search, favorites, history, mail, throbber. The words under the buttons still show. 2004 and later point their chrome at a folder that exists.

Fix: point 2003’s `chrome` at a year that has the GIFs, or add those ten files.

## Checked and left

Atlas at 390px does not overflow sideways. The hallway cards wrap their labels and open. The top links are about 14px tall, and the page is long. `/404.html` fits a phone. The hub cards are 57px tall, equal width, chips and blurbs `display: none`.

Not opened this pass: the games wing, and a phone walk of every year between the samples above.
