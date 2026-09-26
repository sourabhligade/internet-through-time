# 2000 double trail — implement checklist

Stops 21–40 are on disk. The live 2000 trail is 40 stops in `js/config/flow-trails.js` (501 site folders). Do not add a second copy of these rows.

The plan below is the record of how n 21–40 were added onto official n 1–10 and leftover n 11–20. The official 10 stay MapQuest through Y2K. Starting Point stays the guided six plus those ten. Stops 21–40 show on the year flow map, not on first paint. `ui/year/start.js` already prints only `n` 1–10 into `#ott-flows-2000`.

Disk when this was written: 481 folders in `years/2000/sites/`. `docs/YEAR-BY-YEAR-RESEARCH-STEPS.md` still says 477 and “extra KEEP = 0”. That older line does not forbid these 20. It forbids restoring the dropped clones and farming unnamed homepages.

## Law for every new row

- One new folder. One `index.html`. One action. One key.
- The key is `itt00-` plus the slug. `leftover-official.js` builds that from `data-lo-key` via `prefix(2000) + "-" + suffix`, which is `itt00-` plus the suffix. `year-2000-extras.js` does not override `key`.
- The save is the shared leftover writer, not a new engine and not `data-official-verb`. Payload is `{ multiStep:true, real:true, leftover:true, year:"2000" }`.
- Empty, a trap, a field under 2 characters, a missing pick, or a wait that has not finished stores nothing. That rule is already in `bootOne` in `js/immersion/leftover-official.js`.
- `n` must be greater than 10. If a leftover save’s key matches an official stop, the writer refuses it.
- No second page of a brand already in `years/2000/sites/`. No `baidu`, `hotmail`, or `netflix`. No 1999 site and no 2001 site.
- No invented logo. If there is no 2000 capture, the page carries an honest failed-final line and a link to the citation. Do not draw a brand mark.
- Do not add these rows to the guided six, the directory buttons, or `urlMap` beyond the one new folder. Do not run `dest_lock_lean.py`.

## Shared phases

Do these in order for one slug, then the next. Do not batch all 20 HTML files before any test.

### Phase 0 — prove the slot is still empty

- [ ] `years/2000/sites/<slug>/` does not exist.
- [ ] `rg '"whenKey": "itt00-<slug>"' js/config/flow-trails.js` prints nothing.
- [ ] The slug is not a parent of a folder already there (no `napster` sibling, no second Google, no `priceline` page for WebHouse).
- [ ] The citation URL still loads, or a Wayback capture of it loads, and the date in the table below is on that page.
- [ ] A Wayback CDX query for the live host returns a `200` in 2000, or this box is marked “no 2000 capture” and the page will say failed-final. The design-gallery CDX run is in the last section. It did not cover most of these 20 hosts.

### Phase 1 — one room

Create `years/2000/sites/<slug>/index.html`.

- [ ] Title and one sentence say what the visitor does.
- [ ] A `data-lo-panel="1"` wraps the action.
- [ ] The control matches the gate column below (field, pick, or wait). A bare button with no field, pick, tick, or wait must not be the save.
- [ ] Save button: `data-lo-save` and `data-lo-key="<slug>"`.
- [ ] Status node: `data-lo-status`.
- [ ] Trap, if the real site had a wrong door: `data-lo-trap`. Trap writes nothing.
- [ ] No `data-official-key` and no `data-official-verb`.
- [ ] Cite line with the URL from this file. No made-up pixel.
- [ ] `js/immersion/boot.js` already loads `leftover-official.js` when `data-lo-save` is in the DOM. Do not add a year engine.

### Phase 2 — trail row

In the `"2000"` array of `js/config/flow-trails.js`, after `n` 20 (`itt00-netscape-d3`, href `sites/netscape/index.html`):

- [ ] Insert `n` 21–40 in the order in the table.
- [ ] Each row: `href` `sites/<slug>/index.html`, `match` `/<slug>/`, `whenKey` `itt00-<slug>`.
- [ ] `nextHref` of `n` is the href of `n+1`. `n` 40 `nextHref` is `sites/mapquest/index.html` and `nextLabel` is the MapQuest star.
- [ ] Change `n` 20 `nextHref` from `sites/mapquest/index.html` to `sites/ig/index.html` only when `ig` exists. Until then leave 20 pointing at the star.
- [ ] `lockedFlowTrails` keeps `n` 1–10 only. Confirm 2000 still returns 10, not 40.

### Phase 3 — page wires

- [ ] Open `http://127.0.0.1:8080/years/2000/sites/<slug>/index.html`.
- [ ] Empty action: `localStorage.getItem("itt00-<slug>")` is null.
- [ ] Trap, if present: key stays null.
- [ ] Real action: the value parses as `leftover: true`, `real: true`, `year: "2000"`, and `official` is absent.
- [ ] The same click does not write `itt00-mapquest` or any other `n` 1–10 key.
- [ ] Reload shows the saved state and does not create a second key.

### Phase 4 — test

Add one test to `e2e/2000-double-trail.spec.js` (new file, same shape as `e2e/leftover-2005-2006-copies.spec.js`).

- [ ] `openFresh` clears `itt00-<slug>`.
- [ ] First click or empty field expects the key falsy.
- [ ] The real action expects the key truthy and `leftover === true`.
- [ ] Run that test alone: `npx playwright test e2e/2000-double-trail.spec.js --grep "<slug>"`.
- [ ] Run `e2e/flow-check-pipeline.spec.js --grep "2–4 2000"`. It must still see 10 official stops, not 40.

### Phase 5 — do not leak onto the door

- [ ] `/years/2000/pages/home.html` guided list is still six. `#ott-flows-2000` is still the official ten.
- [ ] The new room does not appear there.
- [ ] `years/2000/sites/` count is 481 plus the number of slugs whose Phase 4 passed. No extras.
- [ ] `rg` for the slug under `js/config/leftover-2x-unique-links.js` and `leftover-3x-unique.js` is empty. These rows are trail stops, not a second link rail.

## The 20

Gates: **field** = `data-lo-field` (at least 2 characters). **pick** = one `data-lo-pick` required by `data-lo-need-pick`. **wait** = `data-lo-wait` must be pressed before save. **tick** = one `data-lo-req` checkbox, used only where the action is “open this dated page” and a field would be fiction.

| n | Slug | whenKey | Gate | Action | Date |
|---|---|---|---|---|---|
| 21 | `ig` | `itt00-ig` | field | Sign up for free dial-up. The field is the email. | 10 Jan 2000 |
| 22 | `sothebys` | `itt00-sothebys` | field | Bid. The field is the lot or the amount. | 11 Jan 2000 |
| 23 | `farmclub` | `itt00-farmclub` | pick | Vote on one unsigned band. | 31 Jan 2000 |
| 24 | `emoneymail` | `itt00-emoneymail` | field | Send money to an email address. | 8 Mar 2000 |
| 25 | `libertad-digital` | `itt00-libertad-digital` | tick | Read the first edition, then confirm. | 8 Mar 2000 |
| 26 | `globo` | `itt00-globo` | tick | Open the new portal home, then confirm. | 26 Mar 2000 |
| 27 | `scour` | `itt00-scour` | field | Search and download. The field is the file name. | 4 Apr 2000 |
| 28 | `launch` | `itt00-launch` | pick | Pick one music video and watch it. | 5 Apr 2000 |
| 29 | `ukrainska-pravda` | `itt00-ukrainska-pravda` | tick | Read the politics front, then confirm. | 16 Apr 2000 |
| 30 | `paybox` | `itt00-paybox` | field | Confirm checkout. The field is the PIN. | 11 May 2000 |
| 31 | `site59` | `itt00-site59` | pick | Book one last-minute air-plus-hotel package. | May 2000 |
| 32 | `cahoot` | `itt00-cahoot` | field | Open an account. The field is the name. | 12 Jun 2000 |
| 33 | `eluxury` | `itt00-eluxury` | pick | Put one LVMH item in the cart and check out. | 19 Jun 2000 |
| 34 | `ucsc-genome` | `itt00-ucsc-genome` | field | Search the genome draft. The field is a gene or a word. | 6 Jul 2000 |
| 35 | `bigbrother` | `itt00-bigbrother` | wait | Watch a house camera, then save. | 5 Jul 2000 |
| 36 | `emusic` | `itt00-emusic` | pick | Download one licensed MP3 from the catalog. | 24 Jul 2000 |
| 37 | `seganet` | `itt00-seganet` | pick | Join East, West, or Central for NFL 2K1. | 7 Sep 2000 |
| 38 | `foldingathome` | `itt00-foldingathome` | wait | Start the client, then save. | 1 Oct 2000 |
| 39 | `idealista` | `itt00-idealista` | field | Browse ads. The field is a Madrid street or price. | 4 Oct 2000 |
| 40 | `voteswap2000` | `itt00-voteswap2000` | tick | Open the note that the software was turned off, then confirm. | 31 Oct 2000 |

`n` 20’s next stop becomes `ig` only after `ig` is built. `voteswap2000`’s next stop is MapQuest.

### 21 · ig

Brazil. Internet Grátis at www.ig.com.br. Not Instagram. There is no `instagram` folder in 2000.

- Cite: Folha, 11 Jan 2000, https://www1.folha.uol.com.br/fsp/dinheiro/fi1101200021.htm — “lançaram ontem um novo portal que dá acesso gratuito à Internet.” The piece names IG.
- Wikipedia says the operation went on the air 9 Jan 2000. Either day is January 2000. Put 10 Jan in the room note and link both.
- Gate: email field. Empty or one character does not write `itt00-ig`.
- Phase 0 Wayback for `ig.com.br` was not in the design CDX run. Run it before building. If the earliest 200 is after 2000, stop and use a reserve.

### 22 · sothebys

Sothebys.com opened the day’s lots to online bids. Not an existing auction folder (`ebay`, `yahooauctions` stay as they are).

- Cite: the commerce pass used 11 Jan 2000 for the first lots on sothebys.com. Re-open that day’s report in Phase 0 and paste the URL into the room. Do not build on the date alone if the URL will not load.
- Gate: a lot number or an amount, at least 2 characters.
- A bid of 0 or a blank lot is the empty path.

### 23 · farmclub

farmclub.com. Musicians posted demos. Visitors voted.

- Cite: Los Angeles Times, 31 Jan 2000, https://www.latimes.com/archives/la-xpm-2000-jan-31-ca-59441-story.html — official launch, uploads and votes.
- Also: Los Angeles Times, 3 Nov 2000, https://www.latimes.com/archives/la-xpm-2000-nov-03-ca-46158-story.html — visitors voted on who should play the TV show.
- Gate: three band picks, `data-lo-need-pick` on one. No vote selected does not write.
- Not `mtv`. Not `napster`.

### 24 · emoneymail

Send up to $500 from a card or checking account to an email address. 8 Mar 2000.

- Re-open the launch article in Phase 0 and paste the URL. The commerce pass dated it 8 Mar 2000.
- Gate: recipient email field. Empty does not write.
- Not PayPal (`itt00-paypal` is official stop 4). Not `c2it`.

### 25 · libertad-digital

Spain. First edition of the paper.

- Cite: https://www.libertaddigital.com/sociedad/libertad-digital-cumple-diez-anos-1276386611/ — “El 8 de marzo del año 2000 … subía a la red la primera edición de este diario.”
- Gate: a tick that the visitor opened the 8 Mar edition. An unticked save does not write.
- The room shows the masthead as text. No drawn logo.

### 26 · globo

globo.com, the portal, not Globo On (1996) and not Globo na Copa (1998).

- Cite: https://memoriaglobo.globo.com/produtos-digitais/globocom/noticia/globocom-historico.ghtml — launched 24 Mar 2000, on the air for the whole country 26 Mar 2000.
- Gate: tick after the portal home is shown. Unticked does not write.
- Not `globo` as a substring of an existing folder. Phase 0 must `ls` the exact name.

### 27 · scour

Scour Exchange beta at scour.net. Search, download, share. The company is older. The 2000 product is the exchange.

- Cite: InternetNews, 4 Apr 2000, https://www.internetnews.com/it-management/scour-launches-file-finding-sharing-technology/
- Cite: ZDNet, 5 Apr 2000, https://www.zdnet.com/article/watch-out-napster-its-scour-net/ — about 400 people online and almost 44,000 shared files that day.
- **deep-research** named Scour and then dropped it for want of one verb. These two articles are the verb. Use them.
- Gate: a search field. Empty search does not write. A trap labeled “this is Napster” writes nothing.
- Not `napster` or `napsterweb`. Do not also build `scourexchange` or `napstermp3`.

### 28 · launch

LAUNCHcast video on demand at launch.com. Audio LAUNCHcast is late 1999. The 2000 action is picking a video.

- Cite: Streaming Media, 5 Apr 2000, https://www.streamingmedia.com/Articles/ReadArticle.aspx?ArticleID=62287 — library of over 3,000 videos.
- Cite: Microsoft, same day, https://news.microsoft.com/source/2000/04/05/bolstered-by-windows-media-launchcast-launch-medias-streaming-music-application-is-now-available-with-music-videos/
- Gate: pick one video title. No pick does not write.
- Not `mtv`. Not `real`.

### 29 · ukrainska-pravda

- Cite: https://en.wikipedia.org/wiki/Ukrainska_Pravda — infobox “Launched 16 April 2000.” The body says the project launched the day after the referendum. The referendum was 16 Apr 2000, so the body points at the 17th.
- Room note must show both wordings. Do not pick one silently.
- Gate: tick after the politics front is on screen.
- Phase 0: find a 2000 page that is not Wikipedia if one exists. Wikipedia alone is the weak cite. If no 2000 page loads, do not build this row. Take `netzeitung` from the reserve list instead.

### 30 · paybox

Mobile PIN confirm for an online checkout. 11 May 2000. Germany.

- Re-open the launch cite in Phase 0 and paste the URL. The commerce pass dated the phone-rings PIN to 11 May 2000.
- Gate: a PIN field of at least 2 characters. Empty PIN does not write.
- Not `paypal`.

### 31 · site59

Last-minute air plus hotel. May 2000. Travelocity bought it later. This room is Site59, not Travelocity. There is no `travelocity` folder. Do not create one.

- Re-open the May 2000 cite in Phase 0. If the only date is “2000” with no month, do not build. Use `idealo` from the reserve list.
- Gate: pick one package (city plus nights). No pick does not write.

### 32 · cahoot

Abbey National’s internet bank. United Kingdom.

- Cite: https://en.wikipedia.org/wiki/Cahoot — “launched in June 2000”. The BBC footnote on that page is 12 Jun 2000. Open the BBC URL in Phase 0 and quote it in the room. If the BBC page does not say 12 Jun, use the Wikipedia sentence and say the day is unverified.
- Gate: a name field. Empty does not write.
- Not `egg` if a folder of that name appears before build. Phase 0 `ls`.

### 33 · eluxury

LVMH shop at eluxury.com. Shop opened 19 Jun 2000. A Wayback capture of the host exists on 11 May 2000, before the shop. The action is the shop, not the earlier holding page.

- Cite: New York Post, 20 Jun 2000, “Bernard Arnault’s new eLuxury site launched yesterday.” Wired, 21 Jun 2000, launched Monday.
- Web Design Museum card “eLUXURY in 2000”.
- Gate: pick one house (Louis Vuitton or another LVMH name on the page) then save. No pick does not write.
- Do not build this twice. The museum pass and the commerce pass are the same site.

### 34 · ucsc-genome

The working draft, not a later genome browser anniversary.

- Cite: https://www1.ucsc.edu/news_events/press_releases/archive/00-01/07-00/genome_sequence.htm — “July 6, 2000 … posted their results on a UCSC web site (http://genome.ucsc.edu).”
- An earlier tools pass dropped the graphical browser because a 2020 anniversary page disagrees about that day. This row is the 6 Jul draft posting only.
- Gate: a search field. Empty does not write.
- Not `pubmedcentral`. Not `britannica`.

### 35 · bigbrother

US house webcams. Reviewed at broadband and 56K on 5 Jul 2000.

- Cite: https://variety.com/2000/digital/reviews/big-brother-1200463549/
- Gate: `data-lo-wait`. Save before the wait finishes does not write. The wait is the 56K pause, not a real video.
- Not `survivor` (that folder exists). Not a drawn CBS eye.

### 36 · emusic

EMusic Unlimited. Licensed MP3s. Not the majors. Not MP3.com (`mp3com` exists).

- Cite: InternetNews, 24 Jul 2000, https://www.internetnews.com/small-business/emusic-intros-mp3-subscription-service/ — more than 125,000 MP3s, $9.99 a month on an annual plan.
- Gate: pick one track title from a short list. No pick does not write.

### 37 · seganet

SegaNet, www.sega.net, 7 Sep 2000. Dreamcast and PC network. NFL 2K1 lobbies. $21.95 a month, 50 free hours.

- Cite: https://www.gamespot.com/articles/seganet-launches/1100-2625699/
- Cite: https://web.archive.org/web/20141209074409/http://www.thefreelibrary.com/Sega.com+Launches+the+World's+First+Online+Console+Gaming+Network%2c...-a065062861
- Gate: pick East, West, or Central. No city does not write.
- Not `dreamcast` if that folder appears in Phase 0. Not PlayStation 2 (`playstation2` exists).

### 38 · foldingathome

- Cite: https://foldingathome.org/science/folding — “launched by Vijay Pande at Stanford University on October 1, 2000.”
- Gate: `data-lo-wait` labeled “Start the client”. Save before the wait does not write. Do not pretend a protein viewer shipped in the page.
- Not `seti` (that folder exists). SETI@home is the older project.

### 39 · idealista

Madrid private home ads. Not `idealo` (German prices, reserve list).

- Cite: El País, https://elpais.com/diario/2003/10/12/negocio/1065963810_850215.html — “Idealista nació el 4 de octubre de 2000 con 5.000 ofertas de viviendas particulares, sólo en Madrid.” The article is 2003. Phase 0 should find a 2000 page if one exists. If only the 2003 sentence exists, build it with that sentence visible on the page, not a fake 2000 screenshot.
- Gate: a street or a price field.

### 40 · voteswap2000

voteswap2000.com. Less than a week old when California said it was brokering votes. The operators posted that the software was off. Almost 5,000 Nader/Gore matches.

- Cite: CNN, 31 Oct 2000, https://edition.cnn.com/2000/TECH/computing/10/31/traders.reut/index.html
- Cite: New York Daily News, 1 Nov 2000, https://www.nydailynews.com/2000/11/01/vote-swap-web-sites-shut-down/ — “As soon as we were informed, we shut the thing down.”
- Gate: a tick on the shutdown note. The room is the off switch, not a working swap. A button that still matches votes is the wrong action.
- Not `cnn`. The CNN article is the cite. The room is the voteswap site.

## Reserve

Use the next reserve row only when a Phase 0 box fails. Do not add a reserve on top of a built 20.

| Slug | Why it is next | Date | Cite | Gate if used |
|---|---|---|---|---|
| `netzeitung` | Official start 8 Nov 2000. A test version was up from September 2000, not before. | 8 Nov 2000 | https://www.telepolis.de/article/Offizieller-Start-der-Netzeitung-3442355.html | tick |
| `idealo` | German price portal. Online start August 2000. A 19 Jul 2000 release still said end of August. | Aug 2000 | https://www.presseportal.de/pm/22312/202791 | field |
| `requiem` | Hi-ReS! film site. Million hits in a month. Click a person on the floor. | Aug 2000, still up 17 Oct 2000 | https://dailybruin.com/2000/10/17/web-sites-create-hype-for-inde and Web Design Museum “Requiem for a Dream / 2000” | pick |
| `nbcolympics` | Sydney scoreboard. NBCOlympics.com traffic note. | 21 Sep 2000 | https://nypost.com/2000/09/21/olympics-sites-not-breaking-records-either/ | tick |
| `webhouse` | Priceline WebHouse Club stopped grocery and gas bids. Refunds. Not the `priceline` folder. | 5 Oct 2000 | https://www.deseret.com/2000/10/5/19532294/webhouse-axes-grocery-buying-service/ | tick |
| `fwa` | Favourite Website Awards. Museum dates the 2000 site 5 May 2000. | 5 May 2000 | https://www.webdesignmuseum.org/gallery/the-fwa-2000 | tick |
| `yellowscreen` | CDX earliest 200 is 19 Apr 2000. | 19 Apr 2000 | Wayback `yellowscreen.com` timestamp `20000419143538` | tick |
| `typo5` | CDX earliest 200 is 2 Mar 2000. | 2 Mar 2000 | Wayback `typo5.com` timestamp `20000302143105` | tick |
| `otnemem` | CDX earliest 200 is 26 Aug 2000. Host is “memento” reversed. Do not also build `memento` for the same site. | 26 Aug 2000 | Wayback `otnemem.com` timestamp `20000826221418` | pick |
| `nosepilot` | Museum card 30 Jul 2000. CDX earliest 200 is 17 Oct 2000. Use the October capture as the page date and mention the card. | 17 Oct 2000 | https://www.webdesignmuseum.org/gallery/nosepilot-2000 | tick |
| `skatejam2000` | Museum card 1 Jun 2000. CDX earliest 200 is 20 Jun 2000. | 20 Jun 2000 | https://www.webdesignmuseum.org/gallery/skatejam2000-2000 | tick |
| `theatlantic` | September 2000 directory beside the Napster essay. The magazine is older. Only the sidebar is the 2000 page. | Sep 2000 | https://www.theatlantic.com/past/docs/issues/2000/09/mannlinks.htm | tick |

`quickhoney` stays off the reserve until a 2000 page, not the 2011 Dallas Observer interview, is opened. `memento` the film site and `otnemem` must not both be built.

## Do not build

| Name | Why |
|---|---|
| `napstermp3` | Fan page of Napster. Official stop 5 is already Napster. |
| `scourexchange` | Same brand as `scour`. |
| `baidu`, `hotmail`, `netflix` | Dropped clones. Do not restore. |
| `adwords`, `hotornot`, `kottke`, `startupfailures`, `ohmynews`, `macrumors`, `gumtree`, `friendsreunited`, `musicbrainz`, `discogs` | Already folders. **deep-research** re-found their 2000 dates. That does not make a second room. |
| `firstgov` | Same brand as the existing `usagov` folder. |
| `shoutcast` | Directory page is real on 8 Mar 2000, but the service is older than 2000. Winamp is already a folder. |
| `mapblast` | 19 Jan 2000 Europe maps are a feature on an older site. MapQuest is official stop 1. |
| `nmap` | 28 Apr 2000 desktop download, not a page action. |
| `dom2` | 13 Nov 2000 W3C recommendation. `xhtml` is already the standards room. |
| `bartleby`, `worldlingo` | 2000 relaunch or launch cite exists, but they lost the cut to a launch with a clearer visitor verb. Use only if two of the 20 fail Phase 0. |
| `editthispage` | Copyright 1998–2000. A May 2000 capture is not a launch. |
| `perlmonks`, `jdate`, `cybertown` | Open in 2000. Not shown to have started in 2000. |
| `opendiary` | Diary Circles are 2 Nov 2000. The diary itself is older. |
| `sportsline` | 16 Mar 2000 traffic day. The site is older. |
| `sissyfight` | *Times* of 30 Mar 2000 calls it the debut. A later credits page says 1999. |
| `icewind`, `nolf`, `ultimaonline` | Real 2000 demo, retail, or expansion. The cut preferred SegaNet’s launch day. Use `nolf` (demo 1 Sep 2000) if `seganet` fails Phase 0. |
| `near` | Eros photo 14 Feb 2000, posted 7 May 2000. A picture page, not a site launch. |
| `freefarm.co.uk` | CDX earliest 200 is 24 Feb 2001. |
| `sj2k.com` | CDX earliest 200 is 19 Apr 2001. |
| `eneri.net` | CDX earliest 200 is 27 Nov 1999. |
| `52mm.com`, `why.com` | CDX earliest 200 is January 1998. |
| `petgo.com`, `thefwa.com`, `ffswede.com`, `anke-bauer.de` | CDX returned none, 503, or a timeout. No room. |
| KaZaA | March 2001. |
| iTunes, Wikipedia, Wayback Machine, IE6, Windows XP | 2001. |
| Joe Cartoon blender | On the web in 1999. |
| Finn.no | Spun out in autumn 1999. |
| Ryanair.com bookings | The filing puts them in August 1999. |
| Yoox, Net-a-Porter | Launch month disagrees across sources. |
| SoundJam | 1999 product. Apple bought it late 2000. Not a 2000 website action. |
| Homer’s Web Page, 2Advanced, derBauer, GMUNK | Gallery names without a checked 2000 first-open date. |

## What **deep-research** got wrong

It finished in 18 minutes and said only `theatlantic` and `requiem` were addable, with 18 still missing. It also said the folder listing it checked was cut off. The slice passes opened the launch articles above and checked each slug with `ls` against all 481 folders. Where this file and that report disagree, this file wins only for rows whose citation URL was opened. `theatlantic` is reserve, not one of the 20, because the magazine is older than the sidebar.

## Last check before a commit

- [ ] `node` parse of `js/config/flow-trails.js` shows 2000 `n` 1–10 still 10 and `n` 21–40 only for slugs whose tests passed.
- [ ] `e2e/2000-double-trail.spec.js` passes for every built slug.
- [ ] `e2e/flow-check-pipeline.spec.js` for 2000 still expects length 10.
- [ ] `e2e/all-years-official-10-real.spec.js` does not walk `n` > 10.
- [ ] Starting Point for 2000 still lists six guided stops and ten flows.
- [ ] No new slug appears in leftover-2×, leftover-3×, or the official ten.
- [ ] This markdown’s Phase 0 boxes for unbuilt reserve rows stay unchecked.
