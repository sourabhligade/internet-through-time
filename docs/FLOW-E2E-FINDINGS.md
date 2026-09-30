# Flow end-to-end findings

Browser run on 2026-09-28 against http://127.0.0.1:8080. Two passes.

**Recheck 2026-09-29.** Playwright against the same local server, only the 7 empty-write URLs and the 28 finished-click URLs below. The tables were not edited and the 6,786-page crawl was not rerun.

- An empty click on all 7 wrote nothing.
- A finished click wrote the room key on 27 of the 28 once the real ticks, field, pick, and leftover wait were done. Those rooms were incomplete clicks on 2026-09-28. 2016 still requires every product checkbox, not only `data-official-req`.
- HotBot (`itt97-hotbot`) writes, then the search form opens `search.html`. The key is in `localStorage` on that results page. The navigation stays.
- PayPal with `localStorage.setItem` throwing shows “This browser blocked the save.” and does not store `itt99-paypal`.

1. **Named flows.** Every trail stop in `js/config/flow-trails.js`, plus every React official and leftover stop. **449** links.
2. **Every page.** Every HTML file under `years/`. **6,786** links.

A link counts as a real visit only when all of these are true:

- The page loads.
- The control is a real save, leftover save, or cart action, not mock copy.
- An empty click writes nothing.
- A finished click writes that room’s own key.
- A cart click changes the page.

A page with no save button and no mock text is an ordinary room. It is not a failed flow.

## Totals

### Every page

| Result | Count |
|---|---|
| Real save worked | 5,464 |
| Ordinary page, no save button | 1,263 |
| Finished click wrote nothing | 28 |
| Click left the page before the save could be read | 22 |
| Empty click wrote a save | 7 |
| Page reads as mock text | 2 |

5,464 of the real saves were leftover saves. 165 were official saves. The crawler did not record a live Add to cart button. Eight files contain the words “add to cart” in the markup. On the live page that control is either an image or a link that leaves the page, so the click was not scored as a cart change.

### Named flows

| Result | Count |
|---|---|
| Real save worked | 300 |
| Ordinary page | 8 |
| Link 404 | 92 |
| Click left the page | 22 |
| Finished click wrote nothing | 21 |
| Empty click wrote a save | 6 |

The 92 missing links are all in 2015 (8), 2017 (30) (31), and 2021 (23). Those years are React doors. The trail still points at `years/YYYY/sites/…` files that are not on disk.

## Criteria, and what to do

| What you see | Do this |
|---|---|
| Empty click writes the key | Repair the verb. An unfinished visit must not save. |
| Finished click does not write | Repair the requirements, or remove the room from the official trail if it is not a real stop. |
| Click navigates away | Repair the control so the save stays on the page, then rerun that URL. |
| Page text is mock | Remove the page from the trail. Do not add a fake save. |
| Trail link 404s on a React year | Remove that HTML href from the trail. Point the stop at `/app/index.html#/year/YYYY?stop=KEY`. |
| Ordinary page, no verb | Leave it. It is a room, not a flow. Do not add a save just to make the count go up. |
| Real save already passes | Leave it. |

Do not add destination folders to pad a short trail. 2004 still has 8 official stops. 2012, 2013, and 2014 still have 9. Those lists were written that way.

## Repair: empty click writes a save

These seven pages stored the key before the visit was finished. The verb must ignore the click until the required checks, field, or pick are done.

| Year | Page | Key |
|---|---|---|
| 1999 | `years/1999/sites/paypal/send.html` | `itt99-paypal` |
| 2004 | `years/2004/sites/gmail/index.html` | `itt04-gmail` |
| 2005 | `years/2005/sites/gmail/index.html` | `itt05-gmail` |
| 2006 | `years/2006/sites/gmail/index.html` | `itt06-gmail` |
| 2006 | `years/2006/sites/firefox/index.html` | `itt06-fx` |
| 2012 | `years/2012/sites/medium/index.html` | `itt12-pop-medium` |
| 2012 | `years/2012/sites/path/index.html` | `itt12-pop-path` |

Open each URL, click the verb with nothing filled, and confirm `localStorage` does not gain that key. Then finish the real steps and confirm the key appears.

## Repair: finished click writes nothing

The button is on the page. A completed attempt did not store the key. Check that every required box, field, and pick is wired to the same verb the test clicked. If the room is only a picture and was never a stop, take it off the official trail instead of inventing steps.

| Year | Page | Key | Kind |
|---|---|---|---|
| 1994 | `years/1994/sites/csotd/index.html` | `itt94-csotd` | official |
| 1997 | `years/1997/sites/ebay/item-laptop.html` | `itt97-ebay` | official |
| 1997 | `years/1997/sites/hotbot/index.html` | `itt97-hotbot` | official |
| 1999 | `years/1999/sites/ebay/item-laptop.html` | `itt99-ebay` | official |
| 2000 | `years/2000/sites/bigbrother/index.html` | `itt00-bigbrother` | leftover |
| 2000 | `years/2000/sites/ebay/item-laptop.html` | `itt00-ebay` | official |
| 2000 | `years/2000/sites/foldingathome/index.html` | `itt00-foldingathome` | leftover |
| 2004 | `years/2004/sites/digg/index.html` | `itt04-digg` | official |
| 2004 | `years/2004/sites/facebook/invite.html` | `itt04-fb-invite` | official |
| 2005 | `years/2005/sites/things43/index.html` | `itt05-43t` | leftover |
| 2005 | `years/2005/sites/youtube/upload.html` | `itt05-yt-uploads` | official |
| 2006 | `years/2006/sites/facebook/friends.html` | `itt06-fb-friends` | official |
| 2006 | `years/2006/sites/facebook/invite.html` | `itt06-fb-invite` | official |
| 2006 | `years/2006/sites/facebook/profile.html` | `itt06-fb-profile` | official |
| 2006 | `years/2006/sites/flickr/index.html` | `itt06-flickr` | official |
| 2006 | `years/2006/sites/twitter/index.html` | `itt06-tweets` | official |
| 2010 | `years/2010/sites/facebook/index.html` | `itt10-fb-og` | official |
| 2010 | `years/2010/sites/youtube/index.html` | `itt10-yt` | official |
| 2012 | `years/2012/sites/facebook/index.html` | `itt12-facebook` | official |
| 2012 | `years/2012/sites/facebook/ipo.html` | `itt12-fb-ipo` | official |
| 2012 | `years/2012/sites/iphone/maps.html` | `itt12-maps` | official |
| 2012 | `years/2012/sites/wikipedia/sopa.html` | `itt12-sopa` | official |
| 2016 | `years/2016/sites/iphone/index.html` | `itt16-iphone7` | official |
| 2016 | `years/2016/sites/pokemongo/index.html` | `itt16-pogo` | official |
| 2016 | `years/2016/sites/snapchat/spectacles.html` | `itt16-spectacles` | official |
| 2016 | `years/2016/sites/vine/goodbye.html` | `itt16-vine-end` | official |
| 2016 | `years/2016/sites/whatsapp/e2e.html` | `itt16-wa-e2e` | official |
| 2016 | `years/2016/sites/windows10/end.html` | `itt16-win10-end` | official |

2016 is the cluster. Those six are the official ten for that year, and the finished click did not write. Fix the 2016 verb once, then rerun all six.

## Rerun: the click left the page

These rooms navigated away while the check was still reading the save. Search, directory, and shop links do that. The visit may still be real. Rerun each one and read `localStorage` after the navigation settles. Do not treat the current row as a failed product until that rerun.

- 1994 Fish Cam, Lycos, Yahoo
- 1995 AltaVista, Amazon, Netscape, Yahoo
- 1996 Amazon, Excite, HoTMaiL
- 1998 Amazon Music, CDnow, eBay, Google “I’m Feeling Lucky”, Yahoo
- 1999 Ask Jeeves, Google, Napster search
- 2000 CNN, Google, Napster search, Pets.com shop

Pets.com shop is one of the eight “add to cart” files. The cart click left the page, so the cart change was not scored.

The other seven files that contain “add to cart” are:

- `years/1995/sites/cyberian/index.html`
- `years/1996/sites/amazon/index.html`
- `years/1997/sites/etoys/index.html`
- `years/1998/sites/amazon/music.html`
- `years/1999/sites/amazon/music.html`
- `years/2000/sites/amazon/index.html`
- `years/2000/sites/amazon/music.html`

For each, the Add to cart control must update the cart on that page. If it only navigates, keep the navigation and confirm the next page shows the item. If the words are present and nothing happens, the control is mock and should be wired or removed.

## Remove: mock text

These two pages contain mock copy (`coming soon`, `not built`, `this is a mock`, or `lorem ipsum`). Take them off any trail. Do not add a save on top of placeholder text.

- `years/1994/sites/whitehouse/new.html`
- `years/1995/sites/geocities/SunsetStrip/101/index.html`

## Remove from the HTML trail, point at the React door

2015, 2017, and 2021 are React doors. `js/config/flow-trails.js` still lists HTML hrefs for them, and those files 404. For each stop, delete the `years/YYYY/…` href and use the React stop:

`http://127.0.0.1:8080/app/index.html#/year/YYYY?stop=WHEN_KEY`

The React stops themselves were in the named-flow run. A React stop that already writes on a finished click stays. A React stop whose HTML twin 404s should not stay in the HTML trail.

Counts of missing HTML trail links: 2015 has 8, 2017 has 30 has 31, 2021 has 23.

## Leave alone

1,263 pages have no save verb and no mock text. They are period rooms. Adding a save to each one would turn the museum into a form farm.

5,464 leftover and official saves already passed the empty-click and finished-click checks. Do not retune those.

2004’s official list stops at 8. 2012, 2013, and 2014 stop at 9. Do not invent stops 9 and 10 to fill the table.

## Where this was checked

The page-by-page log is `/tmp/itt-flow-run.jsonl` from the 6,786-page run. The named-flow totals above are from the 449-link run that finished just before that. The index of names and links is http://127.0.0.1:8080/flow-index/ while the local server is up.
