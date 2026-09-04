# Every year · every flow · every game — live e2e run

**Started:** 2026-09-01T11:57:00.593Z
**Finished:** 2026-09-01T12:08:54.270Z
**Method:** Chromium walks gold (full complete + key write), official 10 (live page), every `sites/playable/*.html` (start / leftover extra / minute complete), every 2× leftover dest (wait `data-4x-ready`, incomplete never writes, complete writes), every popular 3× dest, then crawls in-year hrefs (museum year-root resolve).
**Incomplete never writes** is asserted on leftover 2× / popular 3× / empty game Finish.
**Wiped:** 2006, 2007 — no year tree.

**Totals:** 905 pass · 2538 fail

| Year | Gold | Official 10 | Games | 2× leftover | Popular 3× | Links |
|------|------|-------------|-------|-------------|------------|-------|
| 1994 | 1/1 | 10/10 | 20/20 | 0/56 | 3/3 | ok (31) |
| 1995 | 1/1 | 10/10 | 20/20 | 0/54 | 3/3 | ok (33) |
| 1996 | 1/1 | 10/10 | 20/20 | 0/48 | 3/3 | ok (24) |
| 1997 | 1/1 | 10/10 | 20/20 | 0/48 | 3/3 | ok (30) |
| 1998 | 1/1 | 10/10 | 20/20 | 0/66 | 3/3 | ok (29) |
| 1999 | 1/1 | 10/10 | 20/20 | 0/64 | 3/3 | ok (37) |
| 2000 | 1/1 | 10/10 | 20/20 | 76/76 | 3/3 | ok (35) |
| 2001 | 1/1 | 10/10 | 20/20 | 0/23 | 3/3 | ok (31) |
| 2002 | 0/1 | 10/10 | 20/20 | 0/23 | 3/3 | ok (24) |
| 2003 | 1/1 | 10/10 | 20/20 | 0/18 | 0/0 | ok (28) |
| 2004 | 1/1 | 10/10 | 20/20 | 0/204 | 3/3 | ok (41) |
| 2005 | 1/1 | 10/10 | 18/20 | 0/128 | 3/3 | ok (24) |
| 2006 | 1/1 | 10/10 | 18/21 | 0/139 | 3/3 | ok (23) |
| 2008 | 1/1 | 10/10 | 20/20 | 0/267 | 3/3 | ok (41) |
| 2010 | 1/1 | 10/10 | 20/20 | 0/148 | 3/3 | ok (28) |
| 2012 | 1/1 | 10/10 | 16/16 | 0/162 | 3/3 | ok (30) |
| 2013 | 1/1 | 10/10 | 16/16 | 0/117 | 3/3 | ok (28) |
| 2014 | 1/1 | 10/10 | 18/18 | 0/74 | 3/3 | ok (25) |
| 2015 | 1/1 | 10/10 | 20/20 | 0/140 | 3/3 | ok (28) |
| 2016 | 1/1 | 10/10 | 18/18 | 0/102 | 3/3 | ok (25) |
| 2017 | 1/1 | 10/10 | 20/20 | 0/174 | 3/3 | ok (28) |
| 2018 | 1/1 | 10/10 | 20/20 | 0/171 | 3/3 | ok (31) |
| 2019 | 1/1 | 10/10 | 16/16 | 0/180 | 3/3 | ok (33) |
| 2021 | 1/1 | 10/10 | 17/17 | 0/120 | 0/3 | ok (15) |
| 2022 | 1/1 | 10/10 | 7/7 | 0/0 | 0/3 | ok (15) |

## 1994

### Gold
- [x] sites/csotd/index.html — complete → itt94-csotd

### Official 10
- [x] 1. CSotD guestbook — sites/csotd/index.html
- [x] 2. Yahoo drill — sites/yahoo/index.html
- [x] 3. Mosaic origin — sites/cern/index.html
- [x] 4. Fish Cam — sites/fishcam/index.html
- [x] 5. White House — sites/whitehouse/index.html
- [x] 6. NASA — sites/nasa/index.html
- [x] 7. IUMA listen — sites/iuma/listen.html
- [x] 8. HotWired — sites/hotwired/index.html
- [x] 9. Lycos catalog — sites/lycos/index.html
- [x] 10. Year game — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt94-game-mosaicgif
- [x] extra-b.html — minute → itt94-game-yahoocat
- [x] extra-c.html — more-game → itt94-game-gopherdig
- [x] extra-d.html — more-game started
- [x] extra-e.html — more-game → itt94-game-gbflood
- [x] extra-f.html — more-game → itt94-game-fingerwho
- [x] extra-g.html — more-game → itt94-game-lynxline
- [x] extra-h.html — more-game → itt94-game-gophermap
- [x] extra-i.html — more-game → itt94-game-bookrot
- [x] famous.html — started
- [x] game-2.html — pack-game → itt94-game-whatsnew
- [x] game-3.html — pack-game → itt94-game-iumabuf
- [x] game-4.html — pack-game → itt94-game-cernhop
- [x] game-5.html — pack-game → itt94-game-fishwait
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt94-game-sharewarp
- [x] more-b.html — more-game → itt94-game-telnet
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] 1994 leftover · bbs about — no data-4x-go bbs-about
- [ ] 1994 leftover · bbs files — no data-4x-go bbs-files
- [ ] 1994 leftover · bbs log — no data-4x-go bbs-log
- [ ] BBS leftover 2× — no data-4x-go bbs-lx
- [ ] 1994 leftover · cern about — no data-4x-go cern-about
- [ ] 1994 leftover · cern line mode — no data-4x-go cern-line-mode
- [ ] CERN leftover 2× — no data-4x-go cern-lx
- [ ] 1994 leftover · cern www — no data-4x-go cern-www
- [ ] CompuServe leftover 2× pack — no data-4x-go cis-lx
- [ ] CompuServe leftover forum — no data-4x-go cis-more
- [ ] 1994 leftover · csotd about — no data-4x-go csotd-about
- [ ] 1994 leftover · csotd archive — no data-4x-go csotd-archive
- [ ] 1994 leftover · csotd — no data-4x-go csotd-d2
- [ ] 1994 leftover · csotd guestbook — no data-4x-go csotd-guestbook
- [ ] Exploratorium leftover 2× — no data-4x-go exp-lx
- [ ] 1994 leftover · exploratorium about — no data-4x-go exploratorium-about
- [ ] 1994 leftover · exploratorium exhibits — no data-4x-go exploratorium-exhibits
- [ ] 1994 leftover · exploratorium perception — no data-4x-go exploratorium-perception
- [ ] FishCam leftover 2× — no data-4x-go fish-lx
- [ ] 1994 leftover · fishcam about — no data-4x-go fishcam-about
- [ ] 1994 leftover · fishcam still — no data-4x-go fishcam-still
- [ ] Open a second Galaxy category — no data-4x-go galaxy-more
- [ ] GNN leftover second page — no data-4x-go gnn-more
- [ ] 1994 leftover · goodtimes about — no data-4x-go goodtimes-about
- [ ] Good Times leftover 2× — no data-4x-go gt-lx
- [ ] 1994 leftover · hotwired ad att — no data-4x-go hotwired-ad-att
- [ ] 1994 leftover · hotwired ad zima — no data-4x-go hotwired-ad-zima
- [ ] 1994 leftover · hotwired agent — no data-4x-go hotwired-agent
- [ ] 1994 leftover · hotwired coin — no data-4x-go hotwired-coin
- [ ] 1994 leftover · hotwired renaissance — no data-4x-go hotwired-renaissance
- [ ] 1994 leftover · hotwired signal — no data-4x-go hotwired-signal
- [ ] HotWired leftover 2× — no data-4x-go hw-lx
- [ ] Open a title card leftover — no data-4x-go imdb-more
- [ ] Infoseek leftover results — no data-4x-go infoseek-more
- [ ] Infoseek leftover 2× pack — no data-4x-go is-lx
- [ ] 1994 leftover · iuma about — no data-4x-go iuma-about
- [ ] 1994 leftover · iuma bands download — no data-4x-go iuma-bands-download
- [ ] 1994 leftover · iuma bands garage orbit — no data-4x-go iuma-bands-garage-orbit
- [ ] 1994 leftover · iuma bands space cadet — no data-4x-go iuma-bands-space-cadet
- [ ] 1994 leftover · iuma bands static free — no data-4x-go iuma-bands-static-free
- [ ] 1994 leftover · iuma — no data-4x-go iuma-d2
- [ ] IUMA leftover 2× — no data-4x-go iuma-lx
- [ ] JumpStation leftover results — no data-4x-go jump-more
- [ ] WebLouvre leftover 2× — no data-4x-go louvre-lx
- [ ] Lycos leftover 2× — no data-4x-go ly-lx
- [ ] Netscape leftover 2× — no data-4x-go mcom-lx
- [ ] NASA leftover 2× — no data-4x-go nasa-lx
- [ ] NCSA leftover 2× — no data-4x-go ncsa-lx
- [ ] Confirm first-retail leftover — no data-4x-go netmarket-more
- [ ] Pathfinder leftover magazine — no data-4x-go pathfinder-more
- [ ] Confirm pizza leftover — no data-4x-go pizza-more
- [ ] Prodigy leftover 2× pack — no data-4x-go prod-lx
- [ ] Prodigy leftover second door — no data-4x-go prodigy-more
- [ ] WebCrawler leftover 2× — no data-4x-go wc-lx
- [ ] White House leftover 2× — no data-4x-go wh-lx
- [ ] Yahoo leftover 2× — no data-4x-go yh-lx

### Popular 3×
- [x] Pizza Hut — itt94-pop-pizzahut
- [x] NetMarket — itt94-pop-netmarket
- [x] IMDb — itt94-pop-imdb

### Links crawled from gold / official 10 / home / about
- [x] 31 URLs resolved

## 1995

### Gold
- [x] sites/amazon/ssl-checkout.html — complete → itt95-ssl-checkout

### Official 10
- [x] 1. SSL checkout — sites/amazon/ssl-checkout.html
- [x] 2. Amazon book — sites/amazon/index.html
- [x] 3. AuctionWeb bid — sites/auctionweb/item-laser.html
- [x] 4. GeoCities homestead — sites/geocities/homestead.html
- [x] 5. Yahoo directory — sites/yahoo/index.html
- [x] 6. AltaVista — sites/altavista/index.html
- [x] 7. CNN — sites/cnn/index.html
- [x] 8. Microsoft — sites/microsoft/index.html
- [x] 9. Netscape — sites/netscape/index.html
- [x] 10. Classmates — sites/classmates/index.html

### Games
- [x] extra-a.html — minute → itt95-game-geosign
- [x] extra-b.html — minute → itt95-game-altahit
- [x] extra-c.html — more-game started
- [x] extra-d.html — more-game → itt95-game-geoplot
- [x] extra-e.html — more-game → itt95-game-soldeal
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt95-game-auctiontap
- [x] extra-h.html — more-game → itt95-game-geoguest
- [x] extra-i.html — more-game → itt95-game-altabox
- [x] famous.html — started
- [x] game-2.html — pack-game → itt95-game-mines
- [x] game-3.html — pack-game → itt95-game-snipe
- [x] game-4.html — pack-game → itt95-game-avop
- [x] game-5.html — pack-game → itt95-game-homestead
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt95-game-yalert
- [x] more-b.html — more-game → itt95-game-orchall
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] 1995 leftover · altavista about — no data-4x-go altavista-about
- [ ] 1995 leftover · altavista search — no data-4x-go altavista-search
- [ ] 1995 leftover · amazon book — no data-4x-go amazon-book
- [ ] 1995 leftover · amazon book accidental — no data-4x-go amazon-book-accidental
- [ ] 1995 leftover · amazon book being digita — no data-4x-go amazon-book-being-digita
- [ ] 1995 leftover · amazon book cuckoos egg — no data-4x-go amazon-book-cuckoos-egg
- [ ] 1995 leftover · amazon book diamond age — no data-4x-go amazon-book-diamond-age
- [ ] 1995 leftover · amazon book hackers — no data-4x-go amazon-book-hackers
- [ ] 1995 leftover · amazon book hitchhiker — no data-4x-go amazon-book-hitchhiker
- [ ] 1995 leftover · amazon book microserfs — no data-4x-go amazon-book-microserfs
- [ ] 1995 leftover · amazon book neuromancer — no data-4x-go amazon-book-neuromancer
- [ ] 1995 leftover · amazon book road ahead — no data-4x-go amazon-book-road-ahead
- [ ] 1995 leftover · amazon book snow crash — no data-4x-go amazon-book-snow-crash
- [ ] 1995 leftover · amazon cart — no data-4x-go amazon-cart
- [ ] 1995 leftover · amazon checkout — no data-4x-go amazon-checkout
- [ ] 1995 leftover · amazon eyes — no data-4x-go amazon-eyes
- [ ] 1995 leftover · amazon order thanks — no data-4x-go amazon-order-thanks
- [ ] 1995 leftover · amazon search — no data-4x-go amazon-search
- [ ] 1995 leftover · amazon ssl checkout — no data-4x-go amazon-ssl-checkout
- [ ] AOL leftover 2× pack — no data-4x-go aol-lx
- [ ] AOL leftover keyword — no data-4x-go aol-more
- [ ] 1995 leftover · auctionweb about — no data-4x-go auctionweb-about
- [ ] 1995 leftover · auctionweb item — no data-4x-go auctionweb-item
- [ ] 1995 leftover · auctionweb item bean — no data-4x-go auctionweb-item-bean
- [ ] 1995 leftover · auctionweb item disk — no data-4x-go auctionweb-item-disk
- [ ] 1995 leftover · auctionweb item laser — no data-4x-go auctionweb-item-laser
- [ ] 1995 leftover · auctionweb item modem — no data-4x-go auctionweb-item-modem
- [ ] 1995 leftover · auctionweb item netscape — no data-4x-go auctionweb-item-netscape
- [ ] 1995 leftover · auctionweb list — no data-4x-go auctionweb-list
- [ ] AltaVista leftover 2× — no data-4x-go av-lx
- [ ] AuctionWeb leftover literacy — no data-4x-go aw-lx
- [ ] Beanie leftover 2× — no data-4x-go bn-lx
- [ ] CompuServe leftover 2× — no data-4x-go cis-lx
- [ ] Classmates leftover result — no data-4x-go classmates-more
- [ ] CNET leftover 2× — no data-4x-go cnet-lx
- [ ] CNN leftover 2× — no data-4x-go cnn-lx
- [ ] ESPN leftover 2× pack — no data-4x-go espn-lx
- [ ] ESPNet leftover scoreboard — no data-4x-go espn-more
- [ ] GeoCities leftover 2× — no data-4x-go geo-lx
- [ ] HotBot leftover 2× pack — no data-4x-go hb-lx
- [ ] HotBot leftover results — no data-4x-go hotbot-more
- [ ] HotWired leftover 2× — no data-4x-go hw-lx
- [ ] Infoseek leftover 1995 — no data-4x-go infoseek-more
- [ ] Infoseek leftover 2× pack — no data-4x-go is-lx
- [ ] Match leftover profile — no data-4x-go match-more
- [ ] Microsoft leftover 2× — no data-4x-go ms-lx
- [ ] Netscape leftover 2× — no data-4x-go ns-lx
- [ ] Pathfinder leftover 1995 — no data-4x-go pf-more
- [ ] Prodigy leftover 2× — no data-4x-go prod-lx
- [ ] Salon leftover essay — no data-4x-go salon-more
- [ ] Tripod leftover page — no data-4x-go tripod-more
- [ ] White House leftover 2× — no data-4x-go wh-lx
- [ ] WSJ leftover story — no data-4x-go wsj-more
- [ ] Yahoo leftover 2× — no data-4x-go yh-lx

### Popular 3×
- [x] ESPNet — itt95-pop-espn
- [x] CNET — itt95-pop-cnet
- [x] Salon — itt95-pop-salon

### Links crawled from gold / official 10 / home / about
- [x] 33 URLs resolved

## 1996

### Gold
- [x] sites/portals/wars.html — complete → itt96-portal-wars

### Official 10
- [x] 1. Portal wars — sites/portals/wars.html
- [x] 2. HoTMaiL — sites/hotmail/index.html
- [x] 3. Space Jam — sites/spacejam/index.html
- [x] 4. My Yahoo — sites/yahoo/my.html
- [x] 5. GeoCities — sites/geocities/index.html
- [x] 6. Amazon — sites/amazon/index.html
- [x] 7. AuctionWeb — sites/auctionweb/index.html
- [x] 8. Excite — sites/excite/index.html
- [x] 9. AltaVista — sites/altavista/index.html
- [x] 10. Year game — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt96-game-mailsend
- [x] extra-b.html — minute → itt96-game-jamshot
- [x] extra-c.html — more-game started
- [x] extra-d.html — more-game → itt96-game-fsskip
- [x] extra-e.html — more-game → itt96-game-jamquiz
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt96-game-excitebox
- [x] extra-h.html — more-game → itt96-game-jamnote
- [x] extra-i.html — more-game started
- [x] famous.html — started
- [x] game-2.html — pack-game → itt96-game-hotmail
- [x] game-3.html — pack-game → itt96-game-realbuf
- [x] game-4.html — pack-game → itt96-game-myyahoo
- [x] game-5.html — pack-game → itt96-game-jamhub
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt96-game-quakehop
- [x] more-b.html — more-game → itt96-game-pocketred
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Angelfire leftover 2× pack — no data-4x-go af-lx
- [ ] 1996 leftover · altavista about — no data-4x-go altavista-about
- [ ] 1996 leftover · altavista search — no data-4x-go altavista-search
- [ ] Amazon leftover literacy — no data-4x-go am-lx
- [ ] 1996 leftover · amazon book hitchhiker — no data-4x-go amazon-book-hitchhiker
- [ ] 1996 leftover · amazon book neuromancer — no data-4x-go amazon-book-neuromancer
- [ ] 1996 leftover · amazon book road ahead — no data-4x-go amazon-book-road-ahead
- [ ] 1996 leftover · amazon book snow crash — no data-4x-go amazon-book-snow-crash
- [ ] 1996 leftover · amazon cart — no data-4x-go amazon-cart
- [ ] 1996 leftover · amazon checkout — no data-4x-go amazon-checkout
- [ ] 1996 leftover · amazon order thanks — no data-4x-go amazon-order-thanks
- [ ] 1996 leftover · amazon search — no data-4x-go amazon-search
- [ ] Angelfire leftover page — no data-4x-go angel-more
- [ ] AOL portal leftover 2× — no data-4x-go aol-lx
- [ ] 1996 leftover · auctionweb item laser — no data-4x-go auctionweb-item-laser
- [ ] 1996 leftover · auctionweb item modem — no data-4x-go auctionweb-item-modem
- [ ] 1996 leftover · auctionweb list — no data-4x-go auctionweb-list
- [ ] AltaVista leftover 2× pack — no data-4x-go av-lx
- [ ] Craigslist leftover 2× pack — no data-4x-go cl-lx
- [ ] CNN leftover 2× — no data-4x-go cnn-lx
- [ ] 1996 leftover · cnn scitech — no data-4x-go cnn-scitech
- [ ] 1996 leftover · cnn showbiz — no data-4x-go cnn-showbiz
- [ ] 1996 leftover · cnn world — no data-4x-go cnn-world
- [ ] Excite leftover 2× pack — no data-4x-go ex-lx
- [ ] 1996 leftover · excite my — no data-4x-go excite-my
- [ ] 1996 leftover · excite search — no data-4x-go excite-search
- [ ] GeoCities leftover 2× — no data-4x-go geo-lx
- [ ] 1996 leftover · geocities — no data-4x-go geocities-d2
- [ ] 1996 leftover · geocities — no data-4x-go geocities-d3
- [ ] 1996 leftover · geocities — no data-4x-go geocities-d4
- [ ] 1996 leftover · geocities — no data-4x-go geocities-d5
- [ ] 1996 leftover · geocities — no data-4x-go geocities-d6
- [ ] 1996 leftover · geocities — no data-4x-go geocities-d7
- [ ] theGlobe leftover — no data-4x-go globe-more
- [ ] HotBot leftover 2× — no data-4x-go hb-lx
- [ ] Infoseek leftover 1996 — no data-4x-go infoseek-more
- [ ] Infoseek leftover 2× pack — no data-4x-go is-lx
- [ ] Ask Jeeves leftover answer — no data-4x-go jeeves-more
- [ ] Microsoft leftover 2× — no data-4x-go ms-lx
- [ ] MSN leftover 2× pack — no data-4x-go msn-lx
- [ ] MSN leftover 1996 — no data-4x-go msn-more
- [ ] MTV leftover video page — no data-4x-go mtv-more
- [ ] Netscape leftover 2× — no data-4x-go ns-lx
- [ ] Pathfinder leftover 2× pack — no data-4x-go pf-lx
- [ ] Plugin leftover skip — no data-4x-go plugin-more
- [ ] Prodigy leftover 2× — no data-4x-go prod-lx
- [ ] totalny leftover listing — no data-4x-go tny-more
- [ ] Yahoo leftover 2× — no data-4x-go yh-lx

### Popular 3×
- [x] Craigslist — itt96-pop-craigslist
- [x] Ask Jeeves — itt96-pop-askjeeves
- [x] MTV — itt96-pop-mtv

### Links crawled from gold / official 10 / home / about
- [x] 24 URLs resolved

## 1997

### Gold
- [x] sites/pointcast/index.html — complete → itt97-pointcast

### Official 10
- [x] 1. PointCast — sites/pointcast/index.html
- [x] 2. ICQ — sites/icq/index.html
- [x] 3. eBay laptop — sites/ebay/item-laptop.html
- [x] 4. HoTMaiL — sites/hotmail/index.html
- [x] 5. Slashdot — sites/slashdot/story.html
- [x] 6. Drudge — sites/drudge/index.html
- [x] 7. HotBot — sites/hotbot/index.html
- [x] 8. AIM seed — sites/aim/index.html
- [x] 9. Apple — sites/apple/think-different.html
- [x] 10. Microsoft — sites/microsoft/index.html

### Games
- [x] extra-a.html — minute → itt97-game-ebayraise
- [x] extra-b.html — minute → itt97-game-icqping
- [x] extra-c.html — more-game → itt97-game-classiclobby
- [x] extra-d.html — more-game → itt97-game-acroround
- [x] extra-e.html — more-game → itt97-game-zonespades
- [x] extra-f.html — more-game → itt97-game-slashmod
- [x] extra-g.html — more-game started
- [x] extra-h.html — more-game → itt97-game-ebaynote
- [x] extra-i.html — more-game → itt97-game-pcskip
- [x] famous.html — started
- [x] game-2.html — pack-game → itt97-game-icqslap
- [x] game-3.html — pack-game → itt97-game-ebaybid
- [x] game-4.html — pack-game → itt97-game-pcchan
- [x] game-5.html — pack-game → itt97-game-slashmod
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt97-game-shard
- [x] more-b.html — more-game → itt97-game-crypt
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] 1997 leftover · altavista about — no data-4x-go altavista-about
- [ ] 1997 leftover · altavista babelfish — no data-4x-go altavista-babelfish
- [ ] 1997 leftover · altavista search — no data-4x-go altavista-search
- [ ] 1997 leftover · amazon book being digita — no data-4x-go amazon-book-being-digita
- [ ] 1997 leftover · amazon book contact — no data-4x-go amazon-book-contact
- [ ] 1997 leftover · amazon book dove — no data-4x-go amazon-book-dove
- [ ] 1997 leftover · amazon book microserfs — no data-4x-go amazon-book-microserfs
- [ ] 1997 leftover · amazon cart — no data-4x-go amazon-cart
- [ ] 1997 leftover · amazon checkout — no data-4x-go amazon-checkout
- [ ] 1997 leftover · amazon ipo — no data-4x-go amazon-ipo
- [ ] 1997 leftover · amazon order thanks — no data-4x-go amazon-order-thanks
- [ ] 1997 leftover · amazon search — no data-4x-go amazon-search
- [ ] AOL leftover 2× — no data-4x-go aol-lx
- [ ] Apple leftover 2× — no data-4x-go ap-lx
- [ ] 1997 leftover · apple think different — no data-4x-go apple-think-different
- [ ] 1997 leftover · apple thinkdifferent — no data-4x-go apple-thinkdifferent
- [ ] AltaVista leftover 2× pack — no data-4x-go av-lx
- [ ] BBC leftover story — no data-4x-go bbc-more
- [ ] 1997 leftover · cnn diana — no data-4x-go cnn-diana
- [ ] CNN leftover 2× — no data-4x-go cnn-lx
- [ ] 1997 leftover · cnn pathfinder — no data-4x-go cnn-pathfinder
- [ ] 1997 leftover · cnn showbiz — no data-4x-go cnn-showbiz
- [ ] 1997 leftover · cnn tech — no data-4x-go cnn-tech
- [ ] Dancing Baby leftover 2× — no data-4x-go db-lx
- [ ] Drudge leftover 2× — no data-4x-go dr-lx
- [ ] 1997 leftover · drudge — no data-4x-go drudge-d2
- [ ] 1997 leftover · ebay bid confirm — no data-4x-go ebay-bid-confirm
- [ ] 1997 leftover · ebay category — no data-4x-go ebay-category
- [ ] 1997 leftover · ebay item — no data-4x-go ebay-item
- [ ] 1997 leftover · ebay item laptop — no data-4x-go ebay-item-laptop
- [ ] 1997 leftover · ebay item pda — no data-4x-go ebay-item-pda
- [ ] Excite leftover 2× — no data-4x-go ex-lx
- [ ] GeoCities leftover 2× — no data-4x-go geo-lx
- [ ] HoTMaiL leftover 2× pack — no data-4x-go hm-lx
- [ ] HotWired leftover 2× — no data-4x-go hw-lx
- [ ] ICQ leftover 2× pack — no data-4x-go icq-lx
- [ ] Lycos leftover 2× pack — no data-4x-go ly-lx
- [ ] MP3.com leftover track — no data-4x-go mp3-more
- [ ] Microsoft leftover 2× — no data-4x-go ms-lx
- [ ] MSN leftover 2× — no data-4x-go msn-lx
- [ ] News.com leftover — no data-4x-go newscom-more
- [ ] Netscape leftover 2× — no data-4x-go ns-lx
- [ ] NYTimes leftover story — no data-4x-go nyt-more
- [ ] Scripting leftover — no data-4x-go scripting-more
- [ ] Slashdot leftover 2× pack — no data-4x-go sd-lx
- [ ] Winamp leftover skin — no data-4x-go winamp-more
- [ ] Yahoo leftover 2× — no data-4x-go yh-lx
- [ ] ZDNet leftover file — no data-4x-go zdnet-more

### Popular 3×
- [x] NYTimes — itt97-pop-nytimes
- [x] MP3.com — itt97-pop-mp3com
- [x] ZDNet — itt97-pop-zdnet

### Links crawled from gold / official 10 / home / about
- [x] 30 URLs resolved

## 1998

### Gold
- [x] sites/google/lucky.html — complete → itt98-lucky

### Official 10
- [x] 1. I'm Feeling Lucky — sites/google/lucky.html
- [x] 2. Google empty — sites/google/index.html
- [x] 3. Yahoo packed — sites/yahoo/index.html
- [x] 4. Amazon Music — sites/amazon/music.html
- [x] 5. eBay — sites/ebay/index.html
- [x] 6. CDnow — sites/cdnow/index.html
- [x] 7. HoTMaiL — sites/hotmail/index.html
- [x] 8. Mozilla.org — sites/mozilla/index.html
- [x] 9. Slashdot — sites/slashdot/index.html
- [x] 10. DMOZ — sites/dmoz/index.html

### Games
- [x] extra-a.html — minute → itt98-game-luckygo
- [x] extra-b.html — minute → itt98-game-mozmile
- [x] extra-c.html — more-game → itt98-game-yparlor
- [x] extra-d.html — more-game → itt98-game-jacknet
- [x] extra-e.html — more-game → itt98-game-bannerdodge
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt98-game-dmozrow
- [x] extra-h.html — more-game → itt98-game-luckynote
- [x] extra-i.html — more-game → itt98-game-moznote
- [x] famous.html — started
- [x] game-2.html — pack-game → itt98-game-dmoz
- [x] game-3.html — pack-game → itt98-game-babel
- [x] game-4.html — pack-game → itt98-game-mozsplit
- [x] game-5.html — pack-game → itt98-game-gotobid
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt98-game-ladder
- [x] more-b.html — more-game → itt98-game-tram
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] About leftover 2× pack — no data-4x-go ab-lx
- [ ] About leftover guide — no data-4x-go about-more
- [ ] 1998 leftover · altavista about — no data-4x-go altavista-about
- [ ] 1998 leftover · altavista babelfish — no data-4x-go altavista-babelfish
- [ ] 1998 leftover · altavista search — no data-4x-go altavista-search
- [ ] 1998 leftover · amazon book being digita — no data-4x-go amazon-book-being-digita
- [ ] 1998 leftover · amazon book contact — no data-4x-go amazon-book-contact
- [ ] 1998 leftover · amazon book dove — no data-4x-go amazon-book-dove
- [ ] 1998 leftover · amazon book microserfs — no data-4x-go amazon-book-microserfs
- [ ] 1998 leftover · amazon cart — no data-4x-go amazon-cart
- [ ] 1998 leftover · amazon cd homogenic — no data-4x-go amazon-cd-homogenic
- [ ] 1998 leftover · amazon cd ok computer — no data-4x-go amazon-cd-ok-computer
- [ ] 1998 leftover · amazon cd ray of light — no data-4x-go amazon-cd-ray-of-light
- [ ] 1998 leftover · amazon cd the miseducati — no data-4x-go amazon-cd-the-miseducati
- [ ] 1998 leftover · amazon checkout — no data-4x-go amazon-checkout
- [ ] 1998 leftover · amazon music — no data-4x-go amazon-music-d2
- [ ] 1998 leftover · amazon order thanks — no data-4x-go amazon-order-thanks
- [ ] 1998 leftover · amazon search — no data-4x-go amazon-search
- [ ] AOL leftover 2× — no data-4x-go aol-lx
- [ ] apple leftover REAL — no data-4x-go apple-rlx
- [ ] 1998 leftover · apple think different — no data-4x-go apple-think-different
- [ ] AltaVista leftover 2× pack — no data-4x-go av-lx
- [ ] ayb leftover REAL — no data-4x-go ayb-rlx
- [ ] BBC leftover 2× — no data-4x-go bbc-lx
- [ ] 1998 leftover · bowienet about — no data-4x-go bowienet-about
- [ ] bowienet leftover REAL — no data-4x-go bowienet-rlx
- [ ] 1998 leftover · cdnow about — no data-4x-go cdnow-about
- [ ] 1998 leftover · cdnow browse — no data-4x-go cdnow-browse
- [ ] cdnow leftover REAL — no data-4x-go cdnow-rlx
- [ ] 1998 leftover · cnn diana — no data-4x-go cnn-diana
- [ ] CNN leftover 2× — no data-4x-go cnn-lx
- [ ] 1998 leftover · cnn pathfinder — no data-4x-go cnn-pathfinder
- [ ] 1998 leftover · cnn showbiz — no data-4x-go cnn-showbiz
- [ ] 1998 leftover · cnn tech — no data-4x-go cnn-tech
- [ ] 1998 leftover · cnn world — no data-4x-go cnn-world
- [ ] 1998 leftover · dmoz about — no data-4x-go dmoz-about
- [ ] 1998 leftover · dmoz category — no data-4x-go dmoz-category
- [ ] DMOZ leftover 2× pack — no data-4x-go dmoz-lx
- [ ] 1998 leftover · dmoz submit — no data-4x-go dmoz-submit
- [ ] 1998 leftover · ebay bid confirm — no data-4x-go ebay-bid-confirm
- [ ] 1998 leftover · ebay category — no data-4x-go ebay-category
- [ ] 1998 leftover · ebay item laptop — no data-4x-go ebay-item-laptop
- [ ] 1998 leftover · ebay item pda — no data-4x-go ebay-item-pda
- [ ] 1998 leftover · ebay myebay — no data-4x-go ebay-myebay
- [ ] Excite leftover 2× — no data-4x-go ex-lx
- [ ] GeoCities leftover 2× — no data-4x-go geo-lx
- [ ] GO leftover channel — no data-4x-go go-more
- [ ] goto leftover REAL — no data-4x-go goto-rlx
- [ ] HotBot leftover 2× — no data-4x-go hb-lx
- [ ] HoTMaiL leftover 2× — no data-4x-go hm-lx
- [ ] ICQ leftover 2× — no data-4x-go icq-lx
- [ ] ICQ web leftover — no data-4x-go icqweb-more
- [ ] Infoseek leftover 2× — no data-4x-go is-lx
- [ ] Lycos leftover 2× — no data-4x-go ly-lx
- [ ] mp3com leftover REAL — no data-4x-go mp3com-rlx
- [ ] Microsoft leftover 2× — no data-4x-go ms-lx
- [ ] MSN leftover 2× — no data-4x-go msn-lx
- [ ] Netscape leftover 2× — no data-4x-go ns-lx
- [ ] Open Diary leftover — no data-4x-go od-more
- [ ] realplayer leftover REAL — no data-4x-go realplayer-rlx
- [ ] Slashdot leftover 2× pack — no data-4x-go sd-lx
- [ ] Snap leftover results — no data-4x-go snap-more
- [ ] textfiles leftover REAL — no data-4x-go textfiles-rlx
- [ ] Valve leftover — no data-4x-go valve-more
- [ ] winamp leftover REAL — no data-4x-go winamp-rlx
- [ ] WinFiles leftover — no data-4x-go winfiles-more

### Popular 3×
- [x] GO.com — itt98-pop-go
- [x] Snap — itt98-pop-snap
- [x] About — itt98-pop-about

### Links crawled from gold / official 10 / home / about
- [x] 29 URLs resolved

## 1999

### Gold
- [x] sites/aim/index.html — complete → itt99-aim

### Official 10
- [x] 1. AIM sign-on — sites/aim/index.html
- [x] 2. Napster — sites/napster/search.html
- [x] 3. Google — sites/google/index.html
- [x] 4. Blogger — sites/blogger/edit.html
- [x] 5. Y2K — sites/y2k/index.html
- [x] 6. SourceForge — sites/sourceforge/index.html
- [x] 7. PayPal — sites/paypal/send.html
- [x] 8. Amazon — sites/amazon/index.html
- [x] 9. eBay — sites/ebay/item-laptop.html
- [x] 10. Ask Jeeves — sites/askjeeves/index.html

### Games
- [x] extra-a.html — minute → itt99-game-napsearch
- [x] extra-b.html — minute → itt99-game-aimaway
- [x] extra-c.html — more-game → itt99-game-pogotile
- [x] extra-d.html — more-game → itt99-game-picohall
- [x] extra-e.html — more-game started
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt99-game-napquery
- [x] extra-h.html — more-game → itt99-game-aimidle
- [x] extra-i.html — more-game started
- [x] famous.html — started
- [x] game-2.html — pack-game → itt99-game-napq
- [x] game-3.html — pack-game → itt99-game-bpub
- [x] game-4.html — pack-game → itt99-game-y2kclk
- [x] game-5.html — pack-game → itt99-game-paysend
- [x] game.html — host ok
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt99-game-camp
- [x] more-b.html — more-game → itt99-game-binds
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] About leftover 2× — no data-4x-go ab-lx
- [ ] 1999 leftover · aim about — no data-4x-go aim-about
- [ ] 1999 leftover · aim — no data-4x-go aim-d2
- [ ] 1999 leftover · aim im — no data-4x-go aim-im
- [ ] 1999 leftover · aim profile — no data-4x-go aim-profile
- [ ] 1999 leftover · altavista about — no data-4x-go altavista-about
- [ ] 1999 leftover · altavista babelfish — no data-4x-go altavista-babelfish
- [ ] 1999 leftover · altavista search — no data-4x-go altavista-search
- [ ] 1999 leftover · amazon auctions — no data-4x-go amazon-auctions
- [ ] 1999 leftover · amazon book being digita — no data-4x-go amazon-book-being-digita
- [ ] 1999 leftover · amazon book contact — no data-4x-go amazon-book-contact
- [ ] 1999 leftover · amazon book dove — no data-4x-go amazon-book-dove
- [ ] 1999 leftover · amazon book harry cos — no data-4x-go amazon-book-harry-cos
- [ ] 1999 leftover · amazon book microserfs — no data-4x-go amazon-book-microserfs
- [ ] 1999 leftover · amazon book tuesdays — no data-4x-go amazon-book-tuesdays
- [ ] 1999 leftover · amazon cart — no data-4x-go amazon-cart
- [ ] 1999 leftover · amazon cd homogenic — no data-4x-go amazon-cd-homogenic
- [ ] 1999 leftover · amazon cd ok computer — no data-4x-go amazon-cd-ok-computer
- [ ] 1999 leftover · amazon cd ray of light — no data-4x-go amazon-cd-ray-of-light
- [ ] 1999 leftover · amazon cd the miseducati — no data-4x-go amazon-cd-the-miseducati
- [ ] 1999 leftover · amazon checkout — no data-4x-go amazon-checkout
- [ ] 1999 leftover · amazon dvd matrix — no data-4x-go amazon-dvd-matrix
- [ ] 1999 leftover · amazon electronics — no data-4x-go amazon-electronics
- [ ] 1999 leftover · amazon electronics palm  — no data-4x-go amazon-electronics-palm-
- [ ] 1999 leftover · amazon music — no data-4x-go amazon-music
- [ ] 1999 leftover · amazon order thanks — no data-4x-go amazon-order-thanks
- [ ] 1999 leftover · amazon search — no data-4x-go amazon-search
- [ ] 1999 leftover · amazon toy furby — no data-4x-go amazon-toy-furby
- [ ] 1999 leftover · amazon toys — no data-4x-go amazon-toys
- [ ] 1999 leftover · amazon zshops — no data-4x-go amazon-zshops
- [ ] AOL leftover 2× — no data-4x-go aol-lx
- [ ] Apple leftover 2× — no data-4x-go ap-lx
- [ ] 1999 leftover · apple think different — no data-4x-go apple-think-different
- [ ] 1999 leftover · askjeeves ask — no data-4x-go askjeeves-ask
- [ ] AltaVista leftover 2× — no data-4x-go av-lx
- [ ] 1999 leftover · blogger post — no data-4x-go blogger-post
- [ ] boocom leftover REAL — no data-4x-go boocom-rlx
- [ ] bowienet leftover REAL — no data-4x-go bowienet-rlx
- [ ] CNN leftover 2× — no data-4x-go cnn-lx
- [ ] DMOZ leftover 2× pack — no data-4x-go dmoz-lx
- [ ] eGroups leftover list — no data-4x-go egroups-more
- [ ] E*TRADE leftover — no data-4x-go etrade-more
- [ ] Excite leftover 2× — no data-4x-go ex-lx
- [ ] Google leftover literacy — no data-4x-go g-lx
- [ ] GameSpot leftover 2× pack — no data-4x-go gs-lx
- [ ] HotBot leftover 2× — no data-4x-go hb-lx
- [ ] ICQ leftover 2× — no data-4x-go icq-lx
- [ ] Infoseek leftover 2× — no data-4x-go is-lx
- [ ] matrix leftover REAL — no data-4x-go matrix-rlx
- [ ] Microsoft leftover 2× — no data-4x-go ms-lx
- [ ] MSN leftover 2× — no data-4x-go msn-lx
- [ ] msngaming leftover REAL — no data-4x-go msngaming-rlx
- [ ] mynetscape leftover REAL — no data-4x-go mynetscape-rlx
- [ ] Neopets leftover pet — no data-4x-go neo-more
- [ ] netcenter leftover REAL — no data-4x-go netcenter-rlx
- [ ] netscape leftover REAL — no data-4x-go netscape-rlx
- [ ] Onion leftover — no data-4x-go onion-more
- [ ] Slashdot leftover 2× — no data-4x-go sd-lx
- [ ] seti leftover REAL — no data-4x-go seti-rlx
- [ ] Webvan leftover — no data-4x-go webvan-more
- [ ] Y2K leftover 2× — no data-4x-go y2k-lx
- [ ] Yahoo leftover 2× — no data-4x-go yh-lx
- [ ] Yahoo Messenger leftover — no data-4x-go ym-more
- [ ] youvegotmail leftover REAL — no data-4x-go youvegotma-rlx

### Popular 3×
- [x] LiveJournal — itt99-pop-livejournal
- [x] Neopets — itt99-pop-neopets
- [x] eGroups — itt99-pop-egroups

### Links crawled from gold / official 10 / home / about
- [x] 37 URLs resolved

## 2000

### Gold
- [x] sites/mapquest/index.html — complete → itt00-mapquest

### Official 10
- [x] 1. MapQuest — sites/mapquest/index.html
- [x] 2. Amazon smile — sites/amazon/index.html
- [x] 3. eBay — sites/ebay/item-laptop.html
- [x] 4. PayPal — sites/paypal/send.html
- [x] 5. Napster — sites/napster/search.html
- [x] 6. Gnutella — sites/gnutella/index.html
- [x] 7. Pets.com — sites/pets/shop.html
- [x] 8. Google — sites/google/index.html
- [x] 9. CNN — sites/cnn/index.html
- [x] 10. Y2K — sites/y2k/index.html

### Games
- [x] extra-a.html — minute → itt00-game-mqdrive
- [x] extra-b.html — minute → itt00-game-petsock
- [x] extra-c.html — more-game → itt00-game-diamgrid
- [x] extra-d.html — more-game → itt00-game-hsloop
- [x] extra-e.html — more-game → itt00-game-ngjudge
- [x] extra-f.html — more-game → itt00-game-petsock2
- [x] extra-g.html — more-game started
- [x] extra-h.html — more-game → itt00-game-mqprint
- [x] extra-i.html — more-game → itt00-game-crashnote
- [x] famous.html — started
- [x] game-2.html — pack-game → itt00-game-mqprint
- [x] game-3.html — pack-game → itt00-game-petsock
- [x] game-4.html — pack-game → itt00-game-flash3
- [x] game-5.html — pack-game → itt00-game-dutch
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt00-game-twin
- [x] more-b.html — more-game → itt00-game-dust
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [x] About leftover 2× — itt00-ab-lx
- [x] 2000 leftover · altavista about — itt00-altavista-about
- [x] 2000 leftover · altavista babelfish — itt00-altavista-babelfish
- [x] 2000 leftover · altavista search — itt00-altavista-search
- [x] 2000 leftover · amazon about smile — itt00-amazon-about-smile
- [x] 2000 leftover · amazon auctions — itt00-amazon-auctions
- [x] 2000 leftover · amazon book being digita — itt00-amazon-book-being-digita
- [x] 2000 leftover · amazon book contact — itt00-amazon-book-contact
- [x] 2000 leftover · amazon book dove — itt00-amazon-book-dove
- [x] 2000 leftover · amazon book harry cos — itt00-amazon-book-harry-cos
- [x] 2000 leftover · amazon book microserfs — itt00-amazon-book-microserfs
- [x] 2000 leftover · amazon book tuesdays — itt00-amazon-book-tuesdays
- [x] 2000 leftover · amazon cart — itt00-amazon-cart-d2
- [x] 2000 leftover · amazon cd homogenic — itt00-amazon-cd-homogenic
- [x] 2000 leftover · amazon cd ok computer — itt00-amazon-cd-ok-computer
- [x] 2000 leftover · amazon cd ray of light — itt00-amazon-cd-ray-of-light
- [x] 2000 leftover · amazon cd the miseducati — itt00-amazon-cd-the-miseducati
- [x] 2000 leftover · amazon checkout — itt00-amazon-checkout
- [x] 2000 leftover · amazon dvd matrix — itt00-amazon-dvd-matrix
- [x] 2000 leftover · amazon electronics — itt00-amazon-electronics
- [x] 2000 leftover · amazon electronics palm  — itt00-amazon-electronics-palm-
- [x] 2000 leftover · amazon music — itt00-amazon-music
- [x] 2000 leftover · amazon order thanks — itt00-amazon-order-thanks
- [x] 2000 leftover · amazon search — itt00-amazon-search
- [x] 2000 leftover · amazon toy furby — itt00-amazon-toy-furby
- [x] 2000 leftover · amazon toys — itt00-amazon-toys
- [x] 2000 leftover · amazon zshops — itt00-amazon-zshops
- [x] AOL leftover 2× — itt00-aol-lx
- [x] apple leftover REAL — itt00-apple-rlx
- [x] 2000 leftover · apple think different — itt00-apple-think-different
- [x] Ask leftover 2× — itt00-ask-lx
- [x] 2000 leftover · askjeeves ask — itt00-askjeeves-ask
- [x] AltaVista leftover 2× — itt00-av-lx
- [x] Baidu leftover results — itt00-baidu-more
- [x] BBC leftover 2× — itt00-bbc-lx
- [x] Blogger leftover 2× — itt00-bg-lx
- [x] 2000 leftover · blogger edit — itt00-blogger-edit
- [x] 2000 leftover · blogger view — itt00-blogger-view
- [x] 2000 leftover · bowienet about — itt00-bowienet-about
- [x] bowienet leftover REAL — itt00-bowienet-rlx
- [x] 2000 leftover · camworld about — itt00-camworld-about
- [x] 2000 leftover · camworld blogroll — itt00-camworld-blogroll
- [x] 2000 leftover · cnn aol tw — itt00-cnn-aol-tw
- [x] 2000 leftover · cnn diana — itt00-cnn-diana
- [x] 2000 leftover · cnn pathfinder — itt00-cnn-pathfinder
- [x] 2000 leftover · cnn showbiz — itt00-cnn-showbiz
- [x] 2000 leftover · cnn tech — itt00-cnn-tech
- [x] DMOZ leftover 2× — itt00-dmoz-lx
- [x] Everything2 leftover writeup — itt00-e2-more
- [x] Excite leftover 2× — itt00-ex-lx
- [x] Expedia leftover — itt00-expedia-more
- [x] Google leftover literacy — itt00-g-lx
- [x] GeoCities leftover 2× — itt00-geo-lx
- [x] GameSpot leftover 2× — itt00-gs-lx
- [x] Half.com leftover used CD — itt00-half-more
- [x] hampsterdance leftover REAL — itt00-hampsterda-rlx
- [x] Homestar leftover — itt00-homestar-more
- [x] hotbot leftover REAL — itt00-hotbot-rlx
- [x] ICQ leftover 2× — itt00-icq-lx
- [x] infoseek leftover REAL — itt00-infoseek-rlx
- [x] kottke leftover REAL — itt00-kottke-rlx
- [x] matrix leftover REAL — itt00-matrix-rlx
- [x] metafilter leftover REAL — itt00-metafilter-rlx
- [x] microsoft leftover REAL — itt00-microsoft-rlx
- [x] MSN leftover 2× — itt00-msn-lx
- [x] msngaming leftover REAL — itt00-msngaming-rlx
- [x] mynetscape leftover REAL — itt00-mynetscape-rlx
- [x] napsterweb leftover REAL — itt00-napsterweb-rlx
- [x] netcenter leftover REAL — itt00-netcenter-rlx
- [x] netscape leftover REAL — itt00-netscape-rlx
- [x] PayPal leftover 2× — itt00-pp-lx
- [x] Slashdot leftover 2× — itt00-sd-lx
- [x] Travelocity leftover — itt00-travel-more
- [x] Yahoo leftover 2× — itt00-yh-lx
- [x] youvegotmail leftover REAL — itt00-youvegotma-rlx
- [x] Zombo leftover literacy — itt00-zombo-lx

### Popular 3×
- [x] Half.com — itt00-pop-half
- [x] Baidu — itt00-pop-baidu
- [x] Everything2 — itt00-pop-everything2

### Links crawled from gold / official 10 / home / about
- [x] 35 URLs resolved

## 2001

### Gold
- [x] sites/wikipedia/edit.html — complete → itt01-wiki-pages

### Official 10
- [x] 1. Wikipedia — sites/wikipedia/edit.html
- [x] 2. Wayback — sites/archive/index.html
- [x] 3. iTunes library — sites/itunes/index.html
- [x] 4. iPod — sites/apple/ipod.html
- [x] 5. Napster leftover — sites/napster/index.html
- [x] 6. Movable Type — sites/movabletype/index.html
- [x] 7. Google leftover — sites/google/index.html
- [x] 8. Yahoo leftover — sites/yahoo/index.html
- [x] 9. Amazon smile leftover — sites/amazon/index.html
- [x] 10. Clickscape — sites/playable/game.html

### Games
- [x] extra-a.html — lean leftover page
- [x] extra-b.html — lean leftover page
- [x] extra-c.html — more-game → itt01-game-minipitch
- [x] extra-d.html — more-game → itt01-game-appletslice
- [x] extra-e.html — more-game → itt01-game-redpatch
- [x] extra-f.html — more-game → itt01-game-ipodspin
- [x] extra-g.html — more-game started
- [x] extra-h.html — more-game → itt01-game-editnote
- [x] extra-i.html — more-game → itt01-game-codehold
- [x] famous.html — lean leftover page
- [x] game-2.html — pack-game → itt01-game-mqprint
- [x] game-3.html — pack-game → itt01-game-petsock
- [x] game-4.html — pack-game → itt01-game-flash3
- [x] game-5.html — pack-game → itt01-game-dutch
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — lean leftover page
- [x] more-b.html — lean leftover page
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Wiki leftover recent changes — no data-4x-go wiki-hist
- [ ] Wiki leftover languages — no data-4x-go wiki-lang
- [ ] Wayback leftover URL — no data-4x-go wayback
- [ ] Wayback leftover about — no data-4x-go wa-url
- [ ] iTunes library leftover — no data-4x-go itunes
- [ ] iTunes rip/mix leftover — no data-4x-go itunes-lx
- [ ] iPod leftover — no data-4x-go ipod
- [ ] iPod leftover FAQ — no data-4x-go ipod-lx
- [ ] Napster endgame leftover — no data-4x-go napster
- [ ] Napster leftover search — no data-4x-go nap-q
- [ ] Movable Type leftover — no data-4x-go mt
- [ ] Movable Type leftover about — no data-4x-go mt-lx
- [ ] Blogdex leftover — no data-4x-go blogdex
- [ ] Blogger Pyra leftover — no data-4x-go blogger
- [ ] Warblog leftover — no data-4x-go tpm
- [ ] Google 2001 leftover — no data-4x-go google
- [ ] Yahoo 2001 leftover — no data-4x-go yahoo
- [ ] Amazon smile leftover — no data-4x-go amz
- [ ] CNN Nov 2001 leftover — no data-4x-go cnn
- [ ] Mozilla 0.9 leftover — no data-4x-go moz
- [ ] Encarta leftover — no data-4x-go encarta
- [ ] Weblogs.com ping leftover — no data-4x-go ping
- [ ] Clickscape — no data-4x-go game-clickscape

### Popular 3×
- [x] Google — itt01-pop-google
- [x] Yahoo — itt01-pop-yahoo
- [x] CNN — itt01-pop-cnn

### Links crawled from gold / official 10 / home / about
- [x] 31 URLs resolved

## 2002

### Gold
- [ ] sites/stumbleupon/index.html — complete threw: locator.check: Timeout 12000ms exceeded.
Call log:
  - waiting for locator('[data-su-interest=\'tech\']')


### Official 10
- [x] 1. StumbleUpon — sites/stumbleupon/index.html
- [x] 2. Always-on — sites/isp/index.html
- [x] 3. KaZaA — sites/kazaa/index.html
- [x] 4. Wired CSS — sites/wired/index.html
- [x] 5. Phoenix — sites/phoenix/index.html
- [x] 6. Mozilla 1.0 — sites/mozilla/index.html
- [x] 7. iPod gen 2 — sites/ipod/index.html
- [x] 8. Friendster seed — sites/friendster/index.html
- [x] 9. TrackBack — sites/movabletype/trackback.html
- [x] 10. Room Sticky — sites/playable/game.html

### Games
- [x] extra-a.html — lean leftover page
- [x] extra-b.html — lean leftover page
- [x] extra-c.html — more-game → itt02-game-stickwalk
- [x] extra-d.html — more-game → itt02-game-growsprout
- [x] extra-e.html — more-game → itt02-game-fleetnight
- [x] extra-f.html — more-game → itt02-game-friendseed
- [x] extra-g.html — more-game started
- [x] extra-h.html — more-game → itt02-game-stumble3
- [x] extra-i.html — more-game → itt02-game-ljnote
- [x] famous.html — lean leftover page
- [x] game-2.html — pack-game → itt02-game-mqprint
- [x] game-3.html — pack-game → itt02-game-petsock
- [x] game-4.html — pack-game → itt02-game-flash3
- [x] game-5.html — pack-game → itt02-game-dutch
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — lean leftover page
- [x] more-b.html — lean leftover page
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Stumble leftover topic — no data-4x-go su-lx
- [ ] Always-on leftover — no data-4x-go broadband
- [ ] Excite@Home leftover — no data-4x-go bb-lx
- [ ] KaZaA leftover — no data-4x-go kazaa
- [ ] KaZaA Lite leftover — no data-4x-go kazaa-lite
- [ ] Wired CSS leftover — no data-4x-go wired
- [ ] Wired CSS leftover theme — no data-4x-go wired-css
- [ ] Phoenix 0.1 leftover — no data-4x-go phoenix
- [ ] Mozilla 1.0 leftover — no data-4x-go mozilla
- [ ] iPod gen 2 leftover — no data-4x-go ipod2
- [ ] iPod gen 2 specs leftover — no data-4x-go ipod2-lx
- [ ] Friendster seed leftover — no data-4x-go fs
- [ ] Friendster leftover circle — no data-4x-go fs-seed
- [ ] TrackBack leftover — no data-4x-go trackback
- [ ] TrackBack leftover ping — no data-4x-go tb-ping
- [ ] Daypop leftover — no data-4x-go daypop
- [ ] MTV leftover — no data-4x-go mtv
- [ ] last.fm leftover — no data-4x-go lastfm
- [ ] Google News leftover — no data-4x-go gnews
- [ ] Wikipedia 2002 leftover — no data-4x-go wiki-lx
- [ ] Amazon smile leftover — no data-4x-go amz
- [ ] Yahoo 2002 leftover — no data-4x-go yahoo
- [ ] Room Sticky — no data-4x-go game-roomsticky

### Popular 3×
- [x] Daypop — itt02-pop-daypop
- [x] Google News — itt02-pop-googlenews
- [x] Technorati — itt02-pop-technorati

### Links crawled from gold / official 10 / home / about
- [x] 24 URLs resolved

## 2003

### Gold
- [x] sites/photobucket/index.html — complete → itt03-photobucket

### Official 10
- [x] 1. Photobucket — sites/photobucket/index.html
- [x] 2. iTunes Store — sites/itunes/index.html
- [x] 3. WordPress — sites/wordpress/dashboard.html
- [x] 4. LinkedIn — sites/linkedin/invite.html
- [x] 5. MySpace — sites/myspace/index.html
- [x] 6. Friendster mass — sites/friendster/friends.html
- [x] 7. AdSense — sites/adsense/index.html
- [x] 8. Bloglines — sites/bloglines/index.html
- [x] 9. Blogger-Google — sites/blogger/edit.html
- [x] 10. Gags Lite — sites/playable/game.html

### Games
- [x] extra-a.html — started
- [x] extra-b.html — started
- [x] extra-c.html — started
- [x] extra-d.html — started
- [x] extra-e.html — started
- [x] extra-f.html — started
- [x] extra-g.html — started
- [x] extra-h.html — started
- [x] extra-i.html — started
- [x] famous.html — started
- [x] game-2.html — started
- [x] game-3.html — started
- [x] game-4.html — started
- [x] game-5.html — started
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — started
- [x] more-b.html — started
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Photobucket album leftover — no data-4x-go pb-lx
- [ ] MySpace friends leftover — no data-4x-go ms-friends
- [ ] Store 99 leftover — no data-4x-go itunes-99
- [ ] WP leftover — no data-4x-go wp-lx
- [ ] LI invite leftover — no data-4x-go li-invite
- [ ] Friendster mass leftover — no data-4x-go fs-mass
- [ ] AdSense leftover — no data-4x-go adsense-lx
- [ ] Bloglines leftover — no data-4x-go bloglines
- [ ] Blogger leftover — no data-4x-go blogger-g
- [ ] Skype leftover — no data-4x-go skype
- [ ] 4chan leftover — no data-4x-go 4chan-lx
- [ ] delicious leftover — no data-4x-go delicious
- [ ] Firebird leftover — no data-4x-go firebird
- [ ] Flash leftover — no data-4x-go flash-fwa
- [ ] hi5 leftover — no data-4x-go hi5
- [ ] Amazon leftover — no data-4x-go amz
- [ ] Yahoo leftover — no data-4x-go yahoo
- [ ] Gags Lite — no data-4x-go game-gagslite

### Popular 3×

### Links crawled from gold / official 10 / home / about
- [x] 28 URLs resolved

## 2004

### Gold
- [x] sites/facebook/networks.html — complete → itt04-thefacebook-networks

### Official 10
- [x] 1. thefacebook networks — sites/facebook/networks.html
- [x] 2. Gmail — sites/gmail/index.html
- [x] 3. Firefox 1.0 — sites/firefox/index.html
- [x] 4. Flickr — sites/flickr/index.html
- [x] 5. del.icio.us — sites/delicious/index.html
- [x] 6. Digg seed — sites/digg/index.html
- [x] 7. Friends — sites/facebook/friends.html
- [x] 8. Profile — sites/facebook/profile.html
- [x] 9. Invite — sites/facebook/invite.html
- [x] 10. Web 2.0 Conf — sites/web20conference/index.html

### Games
- [x] extra-a.html — minute → itt04-game-thepoke
- [x] extra-b.html — minute → itt04-game-flickrfave
- [x] extra-c.html — more-game → itt04-game-ntight
- [x] extra-d.html — more-game → itt04-game-addictpick
- [x] extra-e.html — more-game started
- [x] extra-f.html — more-game → itt04-game-thepoke2
- [x] extra-g.html — more-game → itt04-game-gmailinv
- [x] extra-h.html — more-game → itt04-game-flick2
- [x] extra-i.html — more-game → itt04-game-orcutnote
- [x] famous.html — started
- [x] game-2.html — pack-game → itt04-game-poke
- [x] game-3.html — pack-game → itt04-game-ginvite
- [x] game-4.html — pack-game → itt04-game-flickrfave
- [x] game-5.html — pack-game → itt04-game-ffdl
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt04-game-gate60
- [x] more-b.html — more-game → itt04-game-rollball
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] adsense leftover REAL — no data-4x-go adsense-rlx
- [ ] 2004 leftover · adsense stats — no data-4x-go adsense-stats
- [ ] 2004 leftover · altavista about — no data-4x-go altavista-about
- [ ] 2004 leftover · altavista babelfish — no data-4x-go altavista-babelfish
- [ ] altavista leftover REAL — no data-4x-go altavista-rlx
- [ ] 2004 leftover · altavista search — no data-4x-go altavista-search
- [ ] 2004 leftover · amazon auctions — no data-4x-go amazon-auctions
- [ ] 2004 leftover · amazon book being digita — no data-4x-go amazon-book-being-digita
- [ ] 2004 leftover · amazon book contact — no data-4x-go amazon-book-contact
- [ ] 2004 leftover · amazon book dove — no data-4x-go amazon-book-dove
- [ ] 2004 leftover · amazon book harry cos — no data-4x-go amazon-book-harry-cos
- [ ] 2004 leftover · amazon book microserfs — no data-4x-go amazon-book-microserfs
- [ ] 2004 leftover · amazon book tuesdays — no data-4x-go amazon-book-tuesdays
- [ ] 2004 leftover · amazon cart — no data-4x-go amazon-cart
- [ ] 2004 leftover · amazon cd homogenic — no data-4x-go amazon-cd-homogenic
- [ ] 2004 leftover · amazon cd ok computer — no data-4x-go amazon-cd-ok-computer
- [ ] 2004 leftover · amazon cd ray of light — no data-4x-go amazon-cd-ray-of-light
- [ ] 2004 leftover · amazon cd the miseducati — no data-4x-go amazon-cd-the-miseducati
- [ ] 2004 leftover · amazon checkout — no data-4x-go amazon-checkout
- [ ] 2004 leftover · amazon dvd matrix — no data-4x-go amazon-dvd-matrix
- [ ] 2004 leftover · amazon electronics — no data-4x-go amazon-electronics
- [ ] 2004 leftover · amazon electronics palm  — no data-4x-go amazon-electronics-palm-
- [ ] 2004 leftover · amazon music — no data-4x-go amazon-music
- [ ] 2004 leftover · amazon order thanks — no data-4x-go amazon-order-thanks
- [ ] amazon leftover REAL — no data-4x-go amazon-rlx
- [ ] 2004 leftover · amazon search — no data-4x-go amazon-search
- [ ] 2004 leftover · amazon toy furby — no data-4x-go amazon-toy-furby
- [ ] 2004 leftover · amazon toys — no data-4x-go amazon-toys
- [ ] 2004 leftover · amazon zshops — no data-4x-go amazon-zshops
- [ ] aol leftover REAL — no data-4x-go aol-rlx
- [ ] 2004 leftover · apple ipod — no data-4x-go apple-ipod
- [ ] 2004 leftover · apple ipod faq — no data-4x-go apple-ipod-faq
- [ ] 2004 leftover · apple ipod howto — no data-4x-go apple-ipod-howto
- [ ] 2004 leftover · apple ipod specs — no data-4x-go apple-ipod-specs
- [ ] 2004 leftover · apple itunes — no data-4x-go apple-itunes
- [ ] apple leftover REAL — no data-4x-go apple-rlx
- [ ] 2004 leftover · apple think different — no data-4x-go apple-think-different
- [ ] 2004 leftover · askjeeves ask — no data-4x-go askjeeves-ask
- [ ] askjeeves leftover REAL — no data-4x-go askjeeves-rlx
- [ ] 2004 leftover · bbc about — no data-4x-go bbc-about
- [ ] bbc leftover REAL — no data-4x-go bbc-rlx
- [ ] 2004 leftover · bbc tech — no data-4x-go bbc-tech
- [ ] 2004 leftover · bbc world — no data-4x-go bbc-world
- [ ] Basecamp leftover 2× — no data-4x-go bc-lx
- [ ] 2004 leftover · blogdex about — no data-4x-go blogdex-about
- [ ] blogdex leftover REAL — no data-4x-go blogdex-rlx
- [ ] 2004 leftover · blogger edit — no data-4x-go blogger-edit
- [ ] blogger leftover REAL — no data-4x-go blogger-rlx
- [ ] 2004 leftover · blogger view — no data-4x-go blogger-view
- [ ] 2004 leftover · bloglines reader — no data-4x-go bloglines-reader
- [ ] bloglines leftover REAL — no data-4x-go bloglines-rlx
- [ ] 2004 leftover · bowienet about — no data-4x-go bowienet-about
- [ ] bowienet leftover REAL — no data-4x-go bowienet-rlx
- [ ] Craigslist leftover post — no data-4x-go cl
- [ ] Craigslist leftover 2× — no data-4x-go cl-lx
- [ ] 2004 leftover · cnn aol tw — no data-4x-go cnn-aol-tw
- [ ] 2004 leftover · cnn diana — no data-4x-go cnn-diana
- [ ] 2004 leftover · cnn election — no data-4x-go cnn-election
- [ ] 2004 leftover · cnn markets — no data-4x-go cnn-markets
- [ ] 2004 leftover · cnn napster story — no data-4x-go cnn-napster-story
- [ ] 2004 leftover · cnn pathfinder — no data-4x-go cnn-pathfinder
- [ ] cnn leftover REAL — no data-4x-go cnn-rlx
- [ ] 2004 leftover · cnn showbiz — no data-4x-go cnn-showbiz
- [ ] 2004 leftover · cnn tech — no data-4x-go cnn-tech
- [ ] 2004 leftover · cnn world — no data-4x-go cnn-world
- [ ] 2004 leftover · craigslist about — no data-4x-go craigslist-about
- [ ] 2004 leftover · craigslist category — no data-4x-go craigslist-category
- [ ] 2004 leftover · craigslist post — no data-4x-go craigslist-post
- [ ] daypop leftover REAL — no data-4x-go daypop-rlx
- [ ] del.icio.us leftover — no data-4x-go del
- [ ] 2004 leftover · delicious about — no data-4x-go delicious-about
- [ ] 2004 leftover · digg about — no data-4x-go digg-about
- [ ] Digg leftover 2× — no data-4x-go digg-lx
- [ ] Digg leftover submit — no data-4x-go digg-seed
- [ ] 2004 leftover · digg submit — no data-4x-go digg-submit
- [ ] 2004 leftover · dmoz about — no data-4x-go dmoz-about
- [ ] 2004 leftover · dmoz category — no data-4x-go dmoz-category
- [ ] dmoz leftover REAL — no data-4x-go dmoz-rlx
- [ ] 2004 leftover · ebay bid confirm — no data-4x-go ebay-bid-confirm
- [ ] 2004 leftover · ebay category — no data-4x-go ebay-category
- [ ] 2004 leftover · ebay item laptop — no data-4x-go ebay-item-laptop
- [ ] 2004 leftover · ebay item pda — no data-4x-go ebay-item-pda
- [ ] 2004 leftover · ebay myebay — no data-4x-go ebay-myebay
- [ ] 2004 leftover · ebay register — no data-4x-go ebay-register
- [ ] ebay leftover REAL — no data-4x-go ebay-rlx
- [ ] 2004 leftover · ebay search — no data-4x-go ebay-search
- [ ] 2004 leftover · ebay sell — no data-4x-go ebay-sell
- [ ] encarta leftover REAL — no data-4x-go encarta-rlx
- [ ] excite leftover REAL — no data-4x-go excite-rlx
- [ ] 2004 leftover · excite search — no data-4x-go excite-search
- [ ] 2004 leftover · facebook about — no data-4x-go facebook-about
- [ ] 2004 leftover · facebook friends — no data-4x-go facebook-friends
- [ ] 2004 leftover · facebook invite — no data-4x-go facebook-invite
- [ ] 2004 leftover · facebook poke — no data-4x-go facebook-poke
- [ ] 2004 leftover · facebook profile — no data-4x-go facebook-profile
- [ ] thefacebook leftover two campuses — no data-4x-go fb-net
- [ ] thefacebook leftover wall — no data-4x-go fb-wall
- [ ] FeedBurner leftover burn — no data-4x-go fburn
- [ ] FeedBurner leftover 2× — no data-4x-go fburn-lx
- [ ] Firefox 1.0 leftover — no data-4x-go ff-ack
- [ ] 2004 leftover · firefox download — no data-4x-go firefox-download
- [ ] 2004 leftover · firefox download thanks — no data-4x-go firefox-download-thanks
- [ ] 2004 leftover · firefox features — no data-4x-go firefox-features
- [ ] 2004 leftover · firefox nyt ad — no data-4x-go firefox-nyt-ad
- [ ] 2004 leftover · firefox whatsnew — no data-4x-go firefox-whatsnew
- [ ] Flickr leftover 2× — no data-4x-go fl-lx
- [ ] 2004 leftover · flickr about — no data-4x-go flickr-about
- [ ] 2004 leftover · flickr explore — no data-4x-go flickr-explore
- [ ] 2004 leftover · flickr fave — no data-4x-go flickr-fave
- [ ] 2004 leftover · flickr groups — no data-4x-go flickr-groups
- [ ] Flickr leftover title — no data-4x-go flickr-lx
- [ ] 2004 leftover · flickr tags — no data-4x-go flickr-tags
- [ ] 2004 leftover · flickr upload — no data-4x-go flickr-upload
- [ ] flickrpro leftover REAL — no data-4x-go flickrpro-rlx
- [ ] 2004 leftover · folklore about — no data-4x-go folklore-about
- [ ] 2004 leftover · friendster friends — no data-4x-go friendster-friends-lx
- [ ] 2004 leftover · friendster profile — no data-4x-go friendster-profile
- [ ] friendster leftover REAL — no data-4x-go friendster-rlx
- [ ] 2004 leftover · friendster testimonials — no data-4x-go friendster-testimonials
- [ ] Firefox leftover 2× — no data-4x-go fx-lx
- [ ] 2004 leftover · gamespot about — no data-4x-go gamespot-about
- [ ] 2004 leftover · gamespot downloads — no data-4x-go gamespot-downloads
- [ ] 2004 leftover · gamespot previews — no data-4x-go gamespot-previews
- [ ] gamespot leftover REAL — no data-4x-go gamespot-rlx
- [ ] 2004 leftover · geocities — no data-4x-go geocities
- [ ] 2004 leftover · geocities — no data-4x-go geocities-d2
- [ ] 2004 leftover · geocities neighborhoods — no data-4x-go geocities-neighborhoods
- [ ] geocities leftover REAL — no data-4x-go geocities-rlx
- [ ] Gmail leftover 2× — no data-4x-go gm-lx
- [ ] 2004 leftover · gmail about — no data-4x-go gmail-about
- [ ] 2004 leftover · gmail compose — no data-4x-go gmail-compose
- [ ] 2004 leftover · gmail inbox — no data-4x-go gmail-inbox
- [ ] Gmail leftover invite login — no data-4x-go gmail-inv
- [ ] 2004 leftover · gmail invite — no data-4x-go gmail-invite
- [ ] 2004 leftover · gnutella about — no data-4x-go gnutella-about
- [ ] gnutella leftover REAL — no data-4x-go gnutella-rlx
- [ ] 2004 leftover · google about — no data-4x-go google-about
- [ ] 2004 leftover · google ipo — no data-4x-go google-ipo
- [ ] google leftover REAL — no data-4x-go google-rlx
- [ ] 2004 leftover · google search — no data-4x-go google-search
- [ ] googlenews leftover REAL — no data-4x-go googlenews-rlx
- [ ] hampsterdance leftover REAL — no data-4x-go hampsterda-rlx
- [ ] 2004 leftover · hampsterdance about — no data-4x-go hampsterdance-about
- [ ] hotbot leftover REAL — no data-4x-go hotbot-rlx
- [ ] icq leftover REAL — no data-4x-go icq-rlx
- [ ] imdb leftover REAL — no data-4x-go imdb-rlx
- [ ] infoseek leftover REAL — no data-4x-go infoseek-rlx
- [ ] isp leftover REAL — no data-4x-go isp-rlx
- [ ] itunes leftover REAL — no data-4x-go itunes-rlx
- [ ] kazaa leftover REAL — no data-4x-go kazaa-rlx
- [ ] lastfm leftover REAL — no data-4x-go lastfm-rlx
- [ ] linkedin leftover REAL — no data-4x-go linkedin-rlx
- [ ] LiveJournal leftover update — no data-4x-go lj
- [ ] LiveJournal leftover 2× — no data-4x-go lj-lx
- [ ] loudcloud leftover REAL — no data-4x-go loudcloud-rlx
- [ ] macromedia leftover REAL — no data-4x-go macromedia-rlx
- [ ] metafilter leftover REAL — no data-4x-go metafilter-rlx
- [ ] microsoft leftover REAL — no data-4x-go microsoft-rlx
- [ ] moreover leftover REAL — no data-4x-go moreover-rlx
- [ ] movabletype leftover REAL — no data-4x-go movabletyp-rlx
- [ ] mozilla leftover REAL — no data-4x-go mozilla-rlx
- [ ] MySpace leftover hops — no data-4x-go ms
- [ ] msn leftover REAL — no data-4x-go msn-rlx
- [ ] mtv leftover REAL — no data-4x-go mtv-rlx
- [ ] napster leftover REAL — no data-4x-go napster-rlx
- [ ] netcenter leftover REAL — no data-4x-go netcenter-rlx
- [ ] netflix leftover REAL — no data-4x-go netflix-rlx
- [ ] netscape leftover REAL — no data-4x-go netscape-rlx
- [ ] Orkut circle leftover 2× — no data-4x-go oc-lx
- [ ] Odeo leftover 2× — no data-4x-go od-lx
- [ ] Odeo leftover subscribe — no data-4x-go odeo
- [ ] Orkut leftover 2× — no data-4x-go ork-lx
- [ ] Orkut leftover add — no data-4x-go orkut
- [ ] orkutseed leftover REAL — no data-4x-go orkutseed-rlx
- [ ] paypal leftover REAL — no data-4x-go paypal-rlx
- [ ] pets leftover REAL — no data-4x-go pets-rlx
- [ ] phoenix leftover REAL — no data-4x-go phoenix-rlx
- [ ] Piczo leftover layout — no data-4x-go piczo
- [ ] Piczo leftover 2× — no data-4x-go pz-lx
- [ ] skype leftover REAL — no data-4x-go skype-rlx
- [ ] slashdot leftover REAL — no data-4x-go slashdot-rlx
- [ ] startupfailures leftover REAL — no data-4x-go startupfai-rlx
- [ ] steam leftover REAL — no data-4x-go steam-rlx
- [ ] Tagged leftover tag — no data-4x-go tagged
- [ ] technorati leftover REAL — no data-4x-go technorati-rlx
- [ ] Tagged leftover 2× — no data-4x-go tg-lx
- [ ] TinyPic leftover 2× — no data-4x-go tp-lx
- [ ] walmart leftover REAL — no data-4x-go walmart-rlx
- [ ] wayback leftover REAL — no data-4x-go wayback-rlx
- [ ] Weather.com leftover zip — no data-4x-go weather-lx
- [ ] wikipedia leftover REAL — no data-4x-go wikipedia-rlx
- [ ] wired leftover REAL — no data-4x-go wired-rlx
- [ ] wordpress leftover REAL — no data-4x-go wordpress-rlx
- [ ] WoW retail leftover — no data-4x-go wow
- [ ] WoW leftover 2× — no data-4x-go wow-lx
- [ ] wow leftover REAL — no data-4x-go wow-rlx
- [ ] Weather.com leftover 2× — no data-4x-go wx-lx
- [ ] y2k leftover REAL — no data-4x-go y2k-rlx
- [ ] yahoo leftover REAL — no data-4x-go yahoo-rlx
- [ ] Yelp leftover local — no data-4x-go yelp
- [ ] Yelp leftover 2× — no data-4x-go yelp-lx
- [ ] Yelp local leftover 2× — no data-4x-go yl-lx
- [ ] youvegotmail leftover REAL — no data-4x-go youvegotma-rlx
- [ ] zombo leftover REAL — no data-4x-go zombo-rlx

### Popular 3×
- [x] Piczo — itt04-pop-piczo
- [x] Tagged — itt04-pop-tagged
- [x] Odeo — itt04-pop-odeo

### Links crawled from gold / official 10 / home / about
- [x] 41 URLs resolved

## 2005

### Gold
- [x] sites/youtube/upload.html — complete → itt05-yt-uploads

### Official 10
- [x] 1. Upload — sites/youtube/upload.html
- [x] 2. Maps leftover — sites/maps/index.html
- [x] 3. Pandora leftover — sites/pandora/index.html
- [x] 4. HousingMaps leftover — sites/housingmaps/index.html
- [x] 5. Digg leftover — sites/digg/index.html
- [x] 6. Reddit leftover — sites/reddit/index.html
- [x] 7. Flickr leftover — sites/flickr/index.html
- [x] 8. iTunes podcasts leftover — sites/itunes/podcasts.html
- [x] 9. TechCrunch leftover — sites/techcrunch/index.html
- [x] 10. HoverChop — sites/playable/game.html

### Games
- [ ] extra-a.html — minute complete did not write itt05-game-thepoke
- [ ] extra-b.html — minute complete did not write itt05-game-flickrfave
- [x] extra-c.html — more-game → itt05-game-ntight
- [x] extra-d.html — more-game → itt05-game-addictpick
- [x] extra-e.html — more-game started
- [x] extra-f.html — more-game → itt05-game-thepoke2
- [x] extra-g.html — more-game → itt05-game-gmailinv
- [x] extra-h.html — more-game → itt05-game-flick2
- [x] extra-i.html — more-game → itt05-game-orcutnote
- [x] famous.html — started
- [x] game-2.html — pack-game → itt05-game-poke
- [x] game-3.html — pack-game → itt05-game-ginvite
- [x] game-4.html — pack-game → itt05-game-flickrfave
- [x] game-5.html — pack-game → itt05-game-ffdl
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt05-game-gate60
- [x] more-b.html — more-game → itt05-game-rollball
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Digg leftover 2× — no data-4x-go digg-lx
- [ ] thefacebook leftover two campuses — no data-4x-go fb-net
- [ ] FeedBurner leftover 2× — no data-4x-go fburn-lx
- [ ] Flickr leftover title — no data-4x-go flickr-lx
- [ ] YouTube leftover title — no data-4x-go yt-lx
- [ ] Maps leftover — no data-4x-go maps
- [ ] Pandora leftover — no data-4x-go pandora
- [ ] HousingMaps leftover — no data-4x-go hm
- [ ] Digg leftover — no data-4x-go digg
- [ ] Reddit leftover — no data-4x-go reddit
- [ ] Flickr leftover — no data-4x-go flickr
- [ ] iTunes podcast leftover — no data-4x-go pod
- [ ] TechCrunch leftover — no data-4x-go tc
- [ ] Ajax leftover — no data-4x-go ajax-lx
- [ ] Earth leftover — no data-4x-go earth-lx
- [ ] Club Penguin leftover — no data-4x-go cp-lx
- [ ] Kayak leftover — no data-4x-go kayak-lx
- [ ] Million Dollar leftover — no data-4x-go mdh-lx
- [ ] µTorrent leftover — no data-4x-go utorrent
- [ ] Second Life leftover — no data-4x-go secondlife
- [ ] YouTube invite leftover — no data-4x-go yt-inv
- [ ] YouTube watch leftover — no data-4x-go yt-watch
- [ ] Maps leftover two views — no data-4x-go maps-lx
- [ ] Maps hotels near LAX — no data-4x-go maps-lax
- [ ] Maps no-Street-View — no data-4x-go maps-nsv
- [ ] HousingMaps city — no data-4x-go hm-lx
- [ ] HousingMaps ticks — no data-4x-go hm-ck
- [ ] Reddit leftover boost — no data-4x-go reddit-lx
- [ ] Reddit hottest — no data-4x-go reddit-hot
- [ ] Reddit empty-submit — no data-4x-go reddit-empty
- [ ] Digg promote — no data-4x-go digg-up
- [ ] Diggnation ep.1 — no data-4x-go diggnation
- [ ] Pandora station leftover — no data-4x-go pandora-lx
- [ ] Pandora genome — no data-4x-go pandora-ck
- [ ] iTunes podcast subscribe — no data-4x-go pod-lx
- [ ] iTunes 1M / 2 days — no data-4x-go pod-1m
- [ ] Flickr tags — no data-4x-go flickr-tag
- [ ] delicious leftover tag — no data-4x-go deli-lx
- [ ] delicious bookmarklet — no data-4x-go deli-bm
- [ ] TechCrunch leftover — no data-4x-go tc-lx
- [ ] Mashable leftover — no data-4x-go mash-lx
- [ ] ProgrammableWeb leftover — no data-4x-go pw-lx
- [ ] DailyMotion leftover — no data-4x-go dm-lx
- [ ] Vimeo leftover — no data-4x-go vimeo-lx
- [ ] Google Video search — no data-4x-go gv-lx
- [ ] Google Video play — no data-4x-go gv-play
- [ ] Firefox 1.5 leftover — no data-4x-go fx15-lx
- [ ] Bloglines leftover — no data-4x-go blines-lx
- [ ] Web 2.0 Conference — no data-4x-go w20-lx
- [ ] Facebook rename leftover — no data-4x-go fb-rename
- [ ] Facebook high school leftover — no data-4x-go fb-hs
- [ ] MySpace $580M leftover — no data-4x-go ms-580
- [ ] Facebook invite leftover — no data-4x-go fb-inv
- [ ] Friendster leftover — no data-4x-go friendster-lx
- [ ] Gaia leftover — no data-4x-go gaia-lx
- [ ] Skype leftover — no data-4x-go skype-lx
- [ ] Skype call leftover — no data-4x-go skype-call
- [ ] Gmail invite leftover — no data-4x-go gmail-lx
- [ ] Google search leftover — no data-4x-go google-q
- [ ] Yahoo leftover — no data-4x-go yahoo-lx
- [ ] Technorati leftover — no data-4x-go techno-lx
- [ ] Movable Type leftover — no data-4x-go mt-lx
- [ ] WordPress leftover — no data-4x-go wp-lx
- [ ] Blogger leftover — no data-4x-go blogger-lx
- [ ] Last.fm leftover — no data-4x-go lastfm-lx
- [ ] LinkedIn leftover — no data-4x-go li-lx
- [ ] Steam leftover — no data-4x-go steam-lx
- [ ] Wikipedia leftover — no data-4x-go wiki-lx
- [ ] Amazon leftover — no data-4x-go amz-lx
- [ ] eBay leftover — no data-4x-go ebay-lx
- [ ] PayPal leftover — no data-4x-go paypal-lx
- [ ] CNN leftover — no data-4x-go cnn-lx
- [ ] iPod leftover — no data-4x-go ipod-lx
- [ ] Microsoft leftover — no data-4x-go msft-lx
- [ ] AdSense leftover — no data-4x-go adsense-lx
- [ ] Slashdot leftover — no data-4x-go slash-lx
- [ ] MetaFilter leftover — no data-4x-go mefi-lx
- [ ] Memeorandum leftover — no data-4x-go memo-lx
- [ ] Daypop leftover — no data-4x-go daypop-lx
- [ ] Netflix DVD leftover — no data-4x-go nflix-dvd
- [ ] MapQuest print leftover — no data-4x-go mq-print
- [ ] Ask/Bloglines leftover — no data-4x-go ask-acq
- [ ] Android footnote leftover — no data-4x-go android-fn
- [ ] Accel leftover — no data-4x-go fb-accel
- [ ] YouTube Sequoia leftover — no data-4x-go yt-seq
- [ ] YouTube Dec launch leftover — no data-4x-go yt-dec
- [ ] Independent YouTube leftover — no data-4x-go yt-ind
- [ ] MySpace leftover — no data-4x-go ms-lx
- [ ] AltaVista leftover — no data-4x-go altavista-lx
- [ ] Ask Jeeves leftover — no data-4x-go jeeves-lx
- [ ] Encarta leftover — no data-4x-go encarta-lx
- [ ] Excite leftover — no data-4x-go excite-lx
- [ ] HotBot leftover — no data-4x-go hotbot-lx
- [ ] Infoseek leftover — no data-4x-go infoseek-lx
- [ ] DMOZ leftover — no data-4x-go dmoz-lx
- [ ] GeoCities leftover — no data-4x-go geo-lx
- [ ] ICQ leftover — no data-4x-go icq-lx
- [ ] KaZaA leftover — no data-4x-go kazaa-lx
- [ ] Napster epitaph leftover — no data-4x-go nap-ep
- [ ] Gnutella leftover — no data-4x-go gnutella-lx
- [ ] Netscape leftover — no data-4x-go netscape-lx
- [ ] Netcenter leftover — no data-4x-go netcenter-lx
- [ ] AOL leftover — no data-4x-go aol-lx
- [ ] MTV leftover — no data-4x-go mtv-lx
- [ ] GameSpot leftover — no data-4x-go gamespot-lx
- [ ] Wired leftover — no data-4x-go wired-lx
- [ ] Wayback leftover — no data-4x-go wayback-lx
- [ ] Macromedia leftover — no data-4x-go macro-lx
- [ ] Mozilla leftover — no data-4x-go mozilla-lx
- [ ] ISP leftover — no data-4x-go isp-lx
- [ ] Pets.com leftover — no data-4x-go pets-ep
- [ ] Startup-failures leftover — no data-4x-go fail-lx
- [ ] You've Got Mail leftover — no data-4x-go ygm-lx
- [ ] Moreover leftover — no data-4x-go moreover-lx
- [ ] Blogdex leftover — no data-4x-go blogdex-lx
- [ ] BowieNet leftover — no data-4x-go bowie-lx
- [ ] Phoenix leftover — no data-4x-go phoenix-lx
- [ ] Loudcloud leftover — no data-4x-go loud-lx
- [ ] Zombo leftover — no data-4x-go zombo-lx
- [ ] Y2K leftover — no data-4x-go y2k-ep
- [ ] Hampster leftover — no data-4x-go hamp-lx
- [ ] Google News leftover — no data-4x-go gnews-lx
- [ ] Maps API leftover — no data-4x-go maps-api
- [ ] HousingMaps second city — no data-4x-go hm-city2
- [ ] Reddit submit leftover — no data-4x-go reddit-sub
- [ ] Digg submit leftover — no data-4x-go digg-sub
- [ ] iTunes browse leftover — no data-4x-go itunes-browse
- [ ] HoverChop leftover path — no data-4x-go heli-lx

### Popular 3×
- [x] Million Dollar Homepage — itt05-pop-milliondollar
- [x] Club Penguin — itt05-pop-clubpenguin
- [x] Kayak — itt05-pop-kayak

### Links crawled from gold / official 10 / home / about
- [x] 24 URLs resolved

## 2006

### Gold
- [x] sites/twitter/index.html — complete → itt06-tweets

### Official 10
- [x] 1. Twttr — sites/twitter/index.html
- [x] 2. News Feed leftover — sites/facebook/feed.html
- [x] 3. Facebook open leftover — sites/facebook/open.html
- [x] 4. YouTube Google-owned leftover — sites/youtube/index.html
- [x] 5. Google Docs leftover — sites/googledocs/index.html
- [x] 6. S3 leftover — sites/aws/index.html
- [x] 7. IE7 leftover — sites/ie7/index.html
- [x] 8. Wiki millionth leftover — sites/wikipedia/millionth.html
- [x] 9. Roblox leftover — sites/roblox/index.html
- [x] 10. Line Rider leftover — sites/playable/linerider.html

### Games
- [ ] extra-a.html — minute complete did not write itt06-game-thepoke
- [ ] extra-b.html — minute complete did not write itt06-game-flickrfave
- [x] extra-c.html — more-game → itt06-game-ntight
- [x] extra-d.html — more-game → itt06-game-addictpick
- [x] extra-e.html — more-game started
- [x] extra-f.html — more-game → itt06-game-thepoke2
- [x] extra-g.html — more-game → itt06-game-gmailinv
- [x] extra-h.html — more-game → itt06-game-flick2
- [x] extra-i.html — more-game → itt06-game-orcutnote
- [x] famous.html — started
- [x] game-2.html — pack-game → itt06-game-poke
- [x] game-3.html — pack-game → itt06-game-ginvite
- [x] game-4.html — pack-game → itt06-game-flickrfave
- [x] game-5.html — pack-game → itt06-game-ffdl
- [x] game.html — started
- [x] index.html — cabinet
- [ ] linerider.html — no game host / start / leftover dest
- [x] more-a.html — more-game → itt06-game-gate60
- [x] more-b.html — more-game → itt06-game-rollball
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Twttr update — no data-4x-go tweets
- [ ] News Feed leftover — no data-4x-go feed
- [ ] Facebook open leftover — no data-4x-go fb-open
- [ ] YouTube Google-owned leftover — no data-4x-go yt-google
- [ ] Google Docs leftover — no data-4x-go gdocs
- [ ] AWS S3 leftover — no data-4x-go s3
- [ ] IE7 leftover — no data-4x-go ie7
- [ ] Wiki millionth leftover — no data-4x-go wiki-1m
- [ ] Roblox leftover — no data-4x-go roblox
- [ ] Line Rider leftover — no data-4x-go game-linerider
- [ ] Digg leftover 2× — no data-4x-go digg-lx
- [ ] thefacebook leftover two campuses — no data-4x-go fb-net
- [ ] FeedBurner leftover 2× — no data-4x-go fburn-lx
- [ ] Flickr leftover title — no data-4x-go flickr-lx
- [ ] YouTube leftover title — no data-4x-go yt-lx
- [ ] Maps leftover — no data-4x-go maps
- [ ] Pandora leftover — no data-4x-go pandora
- [ ] HousingMaps leftover — no data-4x-go hm
- [ ] Digg leftover — no data-4x-go digg
- [ ] Reddit leftover — no data-4x-go reddit
- [ ] Flickr leftover — no data-4x-go flickr
- [ ] iTunes podcast leftover — no data-4x-go pod
- [ ] TechCrunch leftover — no data-4x-go tc
- [ ] Ajax leftover — no data-4x-go ajax-lx
- [ ] Earth leftover — no data-4x-go earth-lx
- [ ] Club Penguin leftover — no data-4x-go cp-lx
- [ ] Kayak leftover — no data-4x-go kayak-lx
- [ ] Million Dollar leftover — no data-4x-go mdh-lx
- [ ] µTorrent leftover — no data-4x-go utorrent
- [ ] Second Life leftover — no data-4x-go secondlife
- [ ] YouTube invite leftover — no data-4x-go yt-inv
- [ ] YouTube watch leftover — no data-4x-go yt-watch
- [ ] Maps leftover two views — no data-4x-go maps-lx
- [ ] Maps hotels near LAX — no data-4x-go maps-lax
- [ ] Maps no-Street-View — no data-4x-go maps-nsv
- [ ] HousingMaps city — no data-4x-go hm-lx
- [ ] HousingMaps ticks — no data-4x-go hm-ck
- [ ] Reddit leftover boost — no data-4x-go reddit-lx
- [ ] Reddit hottest — no data-4x-go reddit-hot
- [ ] Reddit empty-submit — no data-4x-go reddit-empty
- [ ] Digg promote — no data-4x-go digg-up
- [ ] Diggnation ep.1 — no data-4x-go diggnation
- [ ] Pandora station leftover — no data-4x-go pandora-lx
- [ ] Pandora genome — no data-4x-go pandora-ck
- [ ] iTunes podcast subscribe — no data-4x-go pod-lx
- [ ] iTunes 1M / 2 days — no data-4x-go pod-1m
- [ ] Flickr tags — no data-4x-go flickr-tag
- [ ] delicious leftover tag — no data-4x-go deli-lx
- [ ] delicious bookmarklet — no data-4x-go deli-bm
- [ ] TechCrunch leftover — no data-4x-go tc-lx
- [ ] Mashable leftover — no data-4x-go mash-lx
- [ ] ProgrammableWeb leftover — no data-4x-go pw-lx
- [ ] DailyMotion leftover — no data-4x-go dm-lx
- [ ] Vimeo leftover — no data-4x-go vimeo-lx
- [ ] Google Video search — no data-4x-go gv-lx
- [ ] Google Video play — no data-4x-go gv-play
- [ ] Firefox 1.5 leftover — no data-4x-go fx15-lx
- [ ] Bloglines leftover — no data-4x-go blines-lx
- [ ] Web 2.0 Conference — no data-4x-go w20-lx
- [ ] Facebook rename leftover — no data-4x-go fb-rename
- [ ] Facebook high school leftover — no data-4x-go fb-hs
- [ ] MySpace $580M leftover — no data-4x-go ms-580
- [ ] Facebook invite leftover — no data-4x-go fb-inv
- [ ] Friendster leftover — no data-4x-go friendster-lx
- [ ] Gaia leftover — no data-4x-go gaia-lx
- [ ] Skype leftover — no data-4x-go skype-lx
- [ ] Skype call leftover — no data-4x-go skype-call
- [ ] Gmail invite leftover — no data-4x-go gmail-lx
- [ ] Google search leftover — no data-4x-go google-q
- [ ] Yahoo leftover — no data-4x-go yahoo-lx
- [ ] Technorati leftover — no data-4x-go techno-lx
- [ ] Movable Type leftover — no data-4x-go mt-lx
- [ ] WordPress leftover — no data-4x-go wp-lx
- [ ] Blogger leftover — no data-4x-go blogger-lx
- [ ] Last.fm leftover — no data-4x-go lastfm-lx
- [ ] LinkedIn leftover — no data-4x-go li-lx
- [ ] Steam leftover — no data-4x-go steam-lx
- [ ] Wikipedia leftover — no data-4x-go wiki-lx
- [ ] Amazon leftover — no data-4x-go amz-lx
- [ ] eBay leftover — no data-4x-go ebay-lx
- [ ] PayPal leftover — no data-4x-go paypal-lx
- [ ] CNN leftover — no data-4x-go cnn-lx
- [ ] iPod leftover — no data-4x-go ipod-lx
- [ ] Microsoft leftover — no data-4x-go msft-lx
- [ ] AdSense leftover — no data-4x-go adsense-lx
- [ ] Slashdot leftover — no data-4x-go slash-lx
- [ ] MetaFilter leftover — no data-4x-go mefi-lx
- [ ] Memeorandum leftover — no data-4x-go memo-lx
- [ ] Daypop leftover — no data-4x-go daypop-lx
- [ ] Netflix DVD leftover — no data-4x-go nflix-dvd
- [ ] MapQuest print leftover — no data-4x-go mq-print
- [ ] Ask/Bloglines leftover — no data-4x-go ask-acq
- [ ] Android footnote leftover — no data-4x-go android-fn
- [ ] Accel leftover — no data-4x-go fb-accel
- [ ] YouTube Sequoia leftover — no data-4x-go yt-seq
- [ ] YouTube Dec launch leftover — no data-4x-go yt-dec
- [ ] Independent YouTube leftover — no data-4x-go yt-ind
- [ ] MySpace leftover — no data-4x-go ms-lx
- [ ] AltaVista leftover — no data-4x-go altavista-lx
- [ ] Ask Jeeves leftover — no data-4x-go jeeves-lx
- [ ] Encarta leftover — no data-4x-go encarta-lx
- [ ] Excite leftover — no data-4x-go excite-lx
- [ ] HotBot leftover — no data-4x-go hotbot-lx
- [ ] Infoseek leftover — no data-4x-go infoseek-lx
- [ ] DMOZ leftover — no data-4x-go dmoz-lx
- [ ] GeoCities leftover — no data-4x-go geo-lx
- [ ] ICQ leftover — no data-4x-go icq-lx
- [ ] KaZaA leftover — no data-4x-go kazaa-lx
- [ ] Napster epitaph leftover — no data-4x-go nap-ep
- [ ] Gnutella leftover — no data-4x-go gnutella-lx
- [ ] Netscape leftover — no data-4x-go netscape-lx
- [ ] Netcenter leftover — no data-4x-go netcenter-lx
- [ ] AOL leftover — no data-4x-go aol-lx
- [ ] MTV leftover — no data-4x-go mtv-lx
- [ ] GameSpot leftover — no data-4x-go gamespot-lx
- [ ] Wired leftover — no data-4x-go wired-lx
- [ ] Wayback leftover — no data-4x-go wayback-lx
- [ ] Macromedia leftover — no data-4x-go macro-lx
- [ ] Mozilla leftover — no data-4x-go mozilla-lx
- [ ] ISP leftover — no data-4x-go isp-lx
- [ ] Pets.com leftover — no data-4x-go pets-ep
- [ ] Startup-failures leftover — no data-4x-go fail-lx
- [ ] You've Got Mail leftover — no data-4x-go ygm-lx
- [ ] Moreover leftover — no data-4x-go moreover-lx
- [ ] Blogdex leftover — no data-4x-go blogdex-lx
- [ ] BowieNet leftover — no data-4x-go bowie-lx
- [ ] Phoenix leftover — no data-4x-go phoenix-lx
- [ ] Loudcloud leftover — no data-4x-go loud-lx
- [ ] Zombo leftover — no data-4x-go zombo-lx
- [ ] Y2K leftover — no data-4x-go y2k-ep
- [ ] Hampster leftover — no data-4x-go hamp-lx
- [ ] Google News leftover — no data-4x-go gnews-lx
- [ ] Maps API leftover — no data-4x-go maps-api
- [ ] HousingMaps second city — no data-4x-go hm-city2
- [ ] Reddit submit leftover — no data-4x-go reddit-sub
- [ ] Digg submit leftover — no data-4x-go digg-sub
- [ ] iTunes browse leftover — no data-4x-go itunes-browse
- [ ] HoverChop leftover path — no data-4x-go heli-lx
- [ ] Wii leftover — no data-4x-go wii

### Popular 3×
- [x] Roblox — itt06-pop-roblox
- [x] Wikipedia millionth — itt06-pop-wikipedia
- [x] AWS S3 — itt06-pop-aws

### Links crawled from gold / official 10 / home / about
- [x] 23 URLs resolved

## 2008

### Gold
- [x] sites/github/issue.html — complete → itt08-github

### Official 10
- [x] 1. GitHub issue — sites/github/issue.html
- [x] 2. App Store leftover — sites/appstore/index.html
- [x] 3. Chrome — sites/chrome/index.html
- [x] 4. Android G1 — sites/android/index.html
- [x] 5. Hulu — sites/hulu/index.html
- [x] 6. Facebook — sites/facebook/index.html
- [x] 7. Twitter — sites/twitter/index.html
- [x] 8. YouTube — sites/youtube/index.html
- [x] 9. Dropbox — sites/dropbox/index.html
- [x] 10. iPhone 3G — sites/iphone/index.html

### Games
- [x] extra-a.html — minute → itt08-game-storeget
- [x] extra-b.html — minute → itt08-game-chromebox
- [x] extra-c.html — more-game → itt08-game-fourkey
- [x] extra-d.html — more-game → itt08-game-touchroom
- [x] extra-e.html — more-game → itt08-game-burnrope
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt08-game-omni2
- [x] extra-h.html — more-game → itt08-game-issue2
- [x] extra-i.html — more-game → itt08-game-dropnote
- [x] famous.html — started
- [x] game-2.html — pack-game → itt08-game-store500
- [x] game-3.html — pack-game → itt08-game-chromebox
- [x] game-4.html — pack-game → itt08-game-g1market
- [x] game-5.html — pack-game → itt08-game-huluep
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt08-game-rewind
- [x] more-b.html — more-game → itt08-game-cell
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] iPhone 3G leftover — no data-4x-go 3g
- [ ] Airbnb leftover 2× — no data-4x-go ab-lx
- [ ] Airbnb leftover listing — no data-4x-go abnb
- [ ] 2008 leftover · about — no data-4x-go about
- [ ] 2008 leftover · about — no data-4x-go about10lx
- [ ] 2008 leftover · about — no data-4x-go about11lx
- [ ] 2008 leftover · about — no data-4x-go about12lx
- [ ] 2008 leftover · about — no data-4x-go about13lx
- [ ] 2008 leftover · about — no data-4x-go about14lx
- [ ] 2008 leftover · about — no data-4x-go about15lx
- [ ] 2008 leftover · about — no data-4x-go about16lx
- [ ] 2008 leftover · about — no data-4x-go about17lx
- [ ] 2008 leftover · about — no data-4x-go about18lx
- [ ] 2008 leftover · about — no data-4x-go about19lx
- [ ] 2008 leftover · about — no data-4x-go about20lx
- [ ] 2008 leftover · about — no data-4x-go about21lx
- [ ] 2008 leftover · about — no data-4x-go about22lx
- [ ] 2008 leftover · about — no data-4x-go about23lx
- [ ] 2008 leftover · about — no data-4x-go about24lx
- [ ] 2008 leftover · about — no data-4x-go about25lx
- [ ] 2008 leftover · about — no data-4x-go about26lx
- [ ] 2008 leftover · about — no data-4x-go about27lx
- [ ] 2008 leftover · about — no data-4x-go about28lx
- [ ] 2008 leftover · about — no data-4x-go about2lx
- [ ] 2008 leftover · about — no data-4x-go about3lx
- [ ] 2008 leftover · about — no data-4x-go about4lx
- [ ] 2008 leftover · about — no data-4x-go about5lx
- [ ] 2008 leftover · about — no data-4x-go about6lx
- [ ] 2008 leftover · about — no data-4x-go about7lx
- [ ] 2008 leftover · about — no data-4x-go about8lx
- [ ] 2008 leftover · about — no data-4x-go about9lx
- [ ] 2008 leftover · about — no data-4x-go aboutlx
- [ ] adsense leftover REAL — no data-4x-go adsense-rlx
- [ ] 2008 leftover · altavista about — no data-4x-go altavista-about
- [ ] 2008 leftover · altavista babelfish — no data-4x-go altavista-babelfish
- [ ] altavista leftover REAL — no data-4x-go altavista-rlx
- [ ] 2008 leftover · altavista search — no data-4x-go altavista-search
- [ ] 2008 leftover · amazon auctions — no data-4x-go amazon-auctions
- [ ] 2008 leftover · amazon book being digita — no data-4x-go amazon-book-being-digita
- [ ] 2008 leftover · amazon book contact — no data-4x-go amazon-book-contact
- [ ] 2008 leftover · amazon book dove — no data-4x-go amazon-book-dove
- [ ] 2008 leftover · amazon book harry cos — no data-4x-go amazon-book-harry-cos
- [ ] 2008 leftover · amazon book microserfs — no data-4x-go amazon-book-microserfs
- [ ] 2008 leftover · amazon book tuesdays — no data-4x-go amazon-book-tuesdays
- [ ] 2008 leftover · amazon cart — no data-4x-go amazon-cart
- [ ] 2008 leftover · amazon cd homogenic — no data-4x-go amazon-cd-homogenic
- [ ] 2008 leftover · amazon cd ok computer — no data-4x-go amazon-cd-ok-computer
- [ ] 2008 leftover · amazon cd ray of light — no data-4x-go amazon-cd-ray-of-light
- [ ] 2008 leftover · amazon cd the miseducati — no data-4x-go amazon-cd-the-miseducati
- [ ] 2008 leftover · amazon checkout — no data-4x-go amazon-checkout
- [ ] 2008 leftover · amazon dvd matrix — no data-4x-go amazon-dvd-matrix
- [ ] 2008 leftover · amazon electronics — no data-4x-go amazon-electronics
- [ ] 2008 leftover · amazon electronics palm  — no data-4x-go amazon-electronics-palm-
- [ ] 2008 leftover · amazon kindle — no data-4x-go amazon-kindle
- [ ] 2008 leftover · amazon music — no data-4x-go amazon-music
- [ ] 2008 leftover · amazon order thanks — no data-4x-go amazon-order-thanks
- [ ] amazon leftover REAL — no data-4x-go amazon-rlx
- [ ] 2008 leftover · amazon search — no data-4x-go amazon-search
- [ ] 2008 leftover · amazon toy furby — no data-4x-go amazon-toy-furby
- [ ] 2008 leftover · amazon toys — no data-4x-go amazon-toys
- [ ] 2008 leftover · amazon zshops — no data-4x-go amazon-zshops
- [ ] Android leftover 2× — no data-4x-go and-lx
- [ ] 2008 leftover · android about — no data-4x-go android-about
- [ ] 2008 leftover · android market — no data-4x-go android-market
- [ ] 2008 leftover · apple ipod — no data-4x-go apple-ipod
- [ ] 2008 leftover · apple ipod faq — no data-4x-go apple-ipod-faq
- [ ] 2008 leftover · apple ipod howto — no data-4x-go apple-ipod-howto
- [ ] 2008 leftover · apple ipod specs — no data-4x-go apple-ipod-specs
- [ ] 2008 leftover · apple itunes — no data-4x-go apple-itunes
- [ ] apple leftover REAL — no data-4x-go apple-rlx
- [ ] 2008 leftover · apple think different — no data-4x-go apple-think-different
- [ ] 2008 leftover · appstore about — no data-4x-go appstore-about
- [ ] Ask leftover 2× — no data-4x-go ask-lx
- [ ] 2008 leftover · askjeeves ask — no data-4x-go askjeeves-ask
- [ ] askjeeves leftover REAL — no data-4x-go askjeeves-rlx
- [ ] 2008 leftover · aws about — no data-4x-go aws-about
- [ ] aws leftover REAL — no data-4x-go aws-rlx
- [ ] 2008 leftover · aws s3 — no data-4x-go aws-s3
- [ ] 2008 leftover · blogdex about — no data-4x-go blogdex-about
- [ ] blogdex leftover REAL — no data-4x-go blogdex-rlx
- [ ] 2008 leftover · blogger edit — no data-4x-go blogger-edit
- [ ] blogger leftover REAL — no data-4x-go blogger-rlx
- [ ] 2008 leftover · blogger view — no data-4x-go blogger-view
- [ ] 2008 leftover · bloglines reader — no data-4x-go bloglines-reader
- [ ] bloglines leftover REAL — no data-4x-go bloglines-rlx
- [ ] 2008 leftover · bowienet about — no data-4x-go bowienet-about
- [ ] bowienet leftover REAL — no data-4x-go bowienet-rlx
- [ ] Chrome leftover 2× — no data-4x-go ch-lx
- [ ] 2008 leftover · chrome about — no data-4x-go chrome-about
- [ ] Chrome leftover download — no data-4x-go chrome-dl
- [ ] 2008 leftover · cnn aol tw — no data-4x-go cnn-aol-tw
- [ ] 2008 leftover · cnn diana — no data-4x-go cnn-diana
- [ ] 2008 leftover · cnn election — no data-4x-go cnn-election
- [ ] 2008 leftover · cnn markets — no data-4x-go cnn-markets
- [ ] 2008 leftover · cnn napster story — no data-4x-go cnn-napster-story
- [ ] 2008 leftover · cnn pathfinder — no data-4x-go cnn-pathfinder
- [ ] cnn leftover REAL — no data-4x-go cnn-rlx
- [ ] 2008 leftover · cnn showbiz — no data-4x-go cnn-showbiz
- [ ] 2008 leftover · cnn tech — no data-4x-go cnn-tech
- [ ] 2008 leftover · cnn world — no data-4x-go cnn-world
- [ ] daypop leftover REAL — no data-4x-go daypop-rlx
- [ ] Dropbox leftover about — no data-4x-go db-about
- [ ] Dropbox leftover folder — no data-4x-go db-lx
- [ ] Dropbox leftover 2× — no data-4x-go db2-lx
- [ ] 2008 leftover · delicious about — no data-4x-go delicious-about
- [ ] delicious leftover REAL — no data-4x-go delicious-rlx
- [ ] 2008 leftover · digg about — no data-4x-go digg-about
- [ ] digg leftover REAL — no data-4x-go digg-rlx
- [ ] 2008 leftover · digg submit — no data-4x-go digg-submit
- [ ] 2008 leftover · dmoz about — no data-4x-go dmoz-about
- [ ] 2008 leftover · dmoz category — no data-4x-go dmoz-category
- [ ] dmoz leftover REAL — no data-4x-go dmoz-rlx
- [ ] 2008 leftover · docs about — no data-4x-go docs-about
- [ ] 2008 leftover · docs edit — no data-4x-go docs-edit
- [ ] Docs leftover 2× — no data-4x-go docs2-lx
- [ ] 2008 leftover · dropbox refer — no data-4x-go dropbox-refer
- [ ] dropboxfolder leftover REAL — no data-4x-go dropboxfol-rlx
- [ ] 2008 leftover · ebay bid confirm — no data-4x-go ebay-bid-confirm
- [ ] 2008 leftover · ebay category — no data-4x-go ebay-category
- [ ] 2008 leftover · ebay item laptop — no data-4x-go ebay-item-laptop
- [ ] 2008 leftover · ebay item pda — no data-4x-go ebay-item-pda
- [ ] 2008 leftover · ebay myebay — no data-4x-go ebay-myebay
- [ ] 2008 leftover · ebay register — no data-4x-go ebay-register
- [ ] ebay leftover REAL — no data-4x-go ebay-rlx
- [ ] 2008 leftover · ebay search — no data-4x-go ebay-search
- [ ] 2008 leftover · ebay sell — no data-4x-go ebay-sell
- [ ] 2008 leftover · edit — no data-4x-go edit
- [ ] Evernote leftover 2× — no data-4x-go en-lx
- [ ] encarta leftover REAL — no data-4x-go encarta-rlx
- [ ] Evernote leftover note — no data-4x-go evernote-lx
- [ ] excite leftover REAL — no data-4x-go excite-rlx
- [ ] 2008 leftover · excite search — no data-4x-go excite-search
- [ ] 2008 leftover · facebook about — no data-4x-go facebook-about
- [ ] 2008 leftover · facebook connect — no data-4x-go facebook-connect
- [ ] 2008 leftover · facebook feed — no data-4x-go facebook-feed
- [ ] 2008 leftover · facebook friends — no data-4x-go facebook-friends
- [ ] 2008 leftover · facebook invite — no data-4x-go facebook-invite
- [ ] 2008 leftover · facebook networks — no data-4x-go facebook-networks
- [ ] 2008 leftover · facebook open — no data-4x-go facebook-open
- [ ] 2008 leftover · facebook platform — no data-4x-go facebook-platform
- [ ] 2008 leftover · facebook profile — no data-4x-go facebook-profile
- [ ] Facebook Connect leftover — no data-4x-go fb-con
- [ ] Facebook leftover 2× — no data-4x-go fb-lx
- [ ] feedburner leftover REAL — no data-4x-go feedburner-rlx
- [ ] 2008 leftover · firefox download — no data-4x-go firefox-download
- [ ] 2008 leftover · firefox download thanks — no data-4x-go firefox-download-thanks
- [ ] 2008 leftover · firefox features — no data-4x-go firefox-features
- [ ] 2008 leftover · firefox nyt ad — no data-4x-go firefox-nyt-ad
- [ ] firefox leftover REAL — no data-4x-go firefox-rlx
- [ ] 2008 leftover · firefox whatsnew — no data-4x-go firefox-whatsnew
- [ ] 2008 leftover · flickr about — no data-4x-go flickr-about
- [ ] 2008 leftover · flickr explore — no data-4x-go flickr-explore
- [ ] 2008 leftover · flickr groups — no data-4x-go flickr-groups
- [ ] flickr leftover REAL — no data-4x-go flickr-rlx
- [ ] 2008 leftover · flickr tags — no data-4x-go flickr-tags
- [ ] 2008 leftover · flickr upload — no data-4x-go flickr-upload
- [ ] 2008 leftover · friendconnect about — no data-4x-go friendconnect-about
- [ ] 2008 leftover · friendster friends — no data-4x-go friendster-friends-lx
- [ ] 2008 leftover · friendster profile — no data-4x-go friendster-profile
- [ ] friendster leftover REAL — no data-4x-go friendster-rlx
- [ ] 2008 leftover · friendster testimonials — no data-4x-go friendster-testimonials
- [ ] Android Market leftover — no data-4x-go g1-lx
- [ ] 2008 leftover · gamespot about — no data-4x-go gamespot-about
- [ ] 2008 leftover · gamespot downloads — no data-4x-go gamespot-downloads
- [ ] 2008 leftover · gamespot previews — no data-4x-go gamespot-previews
- [ ] gamespot leftover REAL — no data-4x-go gamespot-rlx
- [ ] 2008 leftover · geocities — no data-4x-go geocities
- [ ] 2008 leftover · geocities — no data-4x-go geocities-d2
- [ ] 2008 leftover · geocities neighborhoods — no data-4x-go geocities-neighborhoods
- [ ] geocities leftover REAL — no data-4x-go geocities-rlx
- [ ] Friend Connect leftover — no data-4x-go gfc
- [ ] GitHub leftover issue title — no data-4x-go gh-issue
- [ ] 2008 leftover · github about — no data-4x-go github-about
- [ ] 2008 leftover · github — no data-4x-go github-d2
- [ ] 2008 leftover · github fork — no data-4x-go github-fork
- [ ] 2008 leftover · github repo — no data-4x-go github-repo
- [ ] 2008 leftover · gmail about — no data-4x-go gmail-about
- [ ] 2008 leftover · gmail compose — no data-4x-go gmail-compose
- [ ] 2008 leftover · gmail inbox — no data-4x-go gmail-inbox
- [ ] 2008 leftover · gmail invite — no data-4x-go gmail-invite
- [ ] gmail leftover REAL — no data-4x-go gmail-rlx
- [ ] 2008 leftover · gnutella about — no data-4x-go gnutella-about
- [ ] gnutella leftover REAL — no data-4x-go gnutella-rlx
- [ ] 2008 leftover · google about — no data-4x-go google-about
- [ ] 2008 leftover · google ipo — no data-4x-go google-ipo
- [ ] google leftover REAL — no data-4x-go google-rlx
- [ ] 2008 leftover · google search — no data-4x-go google-search
- [ ] googlenews leftover REAL — no data-4x-go googlenews-rlx
- [ ] googlevideo leftover REAL — no data-4x-go googlevide-rlx
- [ ] 2008 leftover · googlevideo about — no data-4x-go googlevideo-about
- [ ] Groupon leftover 2× — no data-4x-go gp-lx
- [ ] Grooveshark leftover song — no data-4x-go groove
- [ ] Groupon leftover deal — no data-4x-go groupon-lx
- [ ] hampsterdance leftover REAL — no data-4x-go hampsterda-rlx
- [ ] 2008 leftover · hampsterdance about — no data-4x-go hampsterdance-about
- [ ] hotbot leftover REAL — no data-4x-go hotbot-rlx
- [ ] 2008 leftover · hotbot search — no data-4x-go hotbot-search
- [ ] housingmaps leftover REAL — no data-4x-go housingmap-rlx
- [ ] 2008 leftover · hulu about — no data-4x-go hulu-about
- [ ] Hulu leftover episode title — no data-4x-go hulu-ep
- [ ] Hulu leftover 2× — no data-4x-go hulu-lx
- [ ] huluwatch leftover REAL — no data-4x-go huluwatch-rlx
- [ ] 2008 leftover · icq about — no data-4x-go icq-about
- [ ] icq leftover REAL — no data-4x-go icq-rlx
- [ ] infoseek leftover REAL — no data-4x-go infoseek-rlx
- [ ] isp leftover REAL — no data-4x-go isp-rlx
- [ ] itunes leftover REAL — no data-4x-go itunes-rlx
- [ ] kazaa leftover REAL — no data-4x-go kazaa-rlx
- [ ] lastfm leftover REAL — no data-4x-go lastfm-rlx
- [ ] linkedin leftover REAL — no data-4x-go linkedin-rlx
- [ ] loudcloud leftover REAL — no data-4x-go loudcloud-rlx
- [ ] macromedia leftover REAL — no data-4x-go macromedia-rlx
- [ ] Maps leftover 2× — no data-4x-go maps-lx
- [ ] mashable leftover REAL — no data-4x-go mashable-rlx
- [ ] memeorandum leftover REAL — no data-4x-go memeorandu-rlx
- [ ] metafilter leftover REAL — no data-4x-go metafilter-rlx
- [ ] microsoft leftover REAL — no data-4x-go microsoft-rlx
- [ ] milliondollar leftover REAL — no data-4x-go milliondol-rlx
- [ ] moreover leftover REAL — no data-4x-go moreover-rlx
- [ ] movabletype leftover REAL — no data-4x-go movabletyp-rlx
- [ ] mozilla leftover REAL — no data-4x-go mozilla-rlx
- [ ] msn leftover REAL — no data-4x-go msn-rlx
- [ ] mtv leftover REAL — no data-4x-go mtv-rlx
- [ ] myspace leftover REAL — no data-4x-go myspace-rlx
- [ ] napster leftover REAL — no data-4x-go napster-rlx
- [ ] netcenter leftover REAL — no data-4x-go netcenter-rlx
- [ ] netflix leftover REAL — no data-4x-go netflix-rlx
- [ ] netscape leftover REAL — no data-4x-go netscape-rlx
- [ ] paypal leftover REAL — no data-4x-go paypal-rlx
- [ ] pets leftover REAL — no data-4x-go pets-rlx
- [ ] phoenix leftover REAL — no data-4x-go phoenix-rlx
- [ ] 2008 leftover · playable — no data-4x-go playable
- [ ] Posterous leftover title — no data-4x-go posterous
- [ ] programmableweb leftover REAL — no data-4x-go programmab-rlx
- [ ] Reddit leftover 2× — no data-4x-go rd-lx
- [ ] reader leftover REAL — no data-4x-go reader-rlx
- [ ] 2008 leftover · search — no data-4x-go search
- [ ] 2008 leftover · search — no data-4x-go searchlx
- [ ] skype leftover REAL — no data-4x-go skype-rlx
- [ ] slashdot leftover REAL — no data-4x-go slashdot-rlx
- [ ] Stack Overflow leftover ask — no data-4x-go so
- [ ] Stack Overflow leftover 2× — no data-4x-go so-lx
- [ ] Spotify leftover 2× — no data-4x-go sp-lx
- [ ] Spotify EU leftover — no data-4x-go spot-eu
- [ ] spotifyeu leftover REAL — no data-4x-go spotifyeu-rlx
- [ ] spotifyseed leftover REAL — no data-4x-go spotifysee-rlx
- [ ] startupfailures leftover REAL — no data-4x-go startupfai-rlx
- [ ] steam leftover REAL — no data-4x-go steam-rlx
- [ ] App Store leftover literacy — no data-4x-go store
- [ ] 2008 leftover · story — no data-4x-go story
- [ ] Tumblr leftover 2× — no data-4x-go tb-lx
- [ ] TechCrunch leftover 2× — no data-4x-go tc-lx
- [ ] technorati leftover REAL — no data-4x-go technorati-rlx
- [ ] time you leftover REAL — no data-4x-go timeyou-rlx
- [ ] Twitter leftover 2× — no data-4x-go tw-lx
- [ ] 2008 leftover · upload — no data-4x-go upload
- [ ] wayback leftover REAL — no data-4x-go wayback-rlx
- [ ] web20conference leftover REAL — no data-4x-go web20confe-rlx
- [ ] wikipedia leftover REAL — no data-4x-go wikipedia-rlx
- [ ] wired leftover REAL — no data-4x-go wired-rlx
- [ ] wordpress leftover REAL — no data-4x-go wordpress-rlx
- [ ] y2k leftover REAL — no data-4x-go y2k-rlx
- [ ] yahoo leftover REAL — no data-4x-go yahoo-rlx
- [ ] youvegotmail leftover REAL — no data-4x-go youvegotma-rlx
- [ ] YouTube HD leftover — no data-4x-go yt-hd
- [ ] YouTube leftover 2× — no data-4x-go yt-lx
- [ ] zombo leftover REAL — no data-4x-go zombo-rlx

### Popular 3×
- [x] Stack Overflow — itt08-pop-stackoverflow
- [x] Posterous — itt08-pop-posterous
- [x] Grooveshark — itt08-pop-grooveshark

### Links crawled from gold / official 10 / home / about
- [x] 41 URLs resolved

## 2010

### Gold
- [x] sites/instagram/index.html — complete → itt10-ig

### Official 10
- [x] 1. Instagram — sites/instagram/index.html
- [x] 2. iPhone 4 — sites/iphone/index.html
- [x] 3. iPad — sites/ipad/order.html
- [x] 4. Open Graph — sites/facebook/index.html
- [x] 5. FarmVille peak — sites/farmville/index.html
- [x] 6. Imgur — sites/imgur/index.html
- [x] 7. Foursquare — sites/foursquare/index.html
- [x] 8. Twitter — sites/twitter/index.html
- [x] 9. YouTube — sites/youtube/index.html
- [x] 10. Sling Nest — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt10-game-ogburst
- [x] extra-b.html — minute → itt10-game-ipadtilt
- [x] extra-c.html — more-game → itt10-game-raghill
- [x] extra-d.html — more-game → itt10-game-fourobj
- [x] extra-e.html — more-game started
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt10-game-ognote
- [x] extra-h.html — more-game → itt10-game-ipadnote
- [x] extra-i.html — more-game started
- [x] famous.html — started
- [x] game-2.html — pack-game → itt10-game-igfilter
- [x] game-3.html — pack-game → itt10-game-ipadrot
- [x] game-4.html — pack-game → itt10-game-oglike
- [x] game-5.html — pack-game → itt10-game-imgurup
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt10-game-raghill
- [x] more-b.html — more-game → itt10-game-meatrun
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Foursquare leftover check-in — no data-4x-go 4sq-lx
- [ ] Android leftover 2× — no data-4x-go and-lx
- [ ] 2010 leftover · and lx d2 — no data-4x-go and-lx-d2
- [ ] angrybirds leftover REAL — no data-4x-go angrybirds-rlx
- [ ] 2010 leftover · angrybirds rlx d2 — no data-4x-go angrybirds-rlx-d2
- [ ] 2010 leftover · ask d2 — no data-4x-go ask-d2
- [ ] Browser Ballot leftover pick — no data-4x-go ballot
- [ ] 2010 leftover · ballot d2 — no data-4x-go ballot-d2
- [ ] Chrome leftover 2× — no data-4x-go ch-lx
- [ ] 2010 leftover · ch lx d2 — no data-4x-go ch-lx-d2
- [ ] 2010 leftover · chrome about — no data-4x-go chrome-about
- [ ] 2010 leftover · chrome d2 — no data-4x-go chrome-d2
- [ ] Dropbox leftover 2× — no data-4x-go db-lx
- [ ] 2010 leftover · db lx d2 — no data-4x-go db-lx-d2
- [ ] Digg v4 leftover — no data-4x-go digg-v4
- [ ] 2010 leftover · digg v4 d2 — no data-4x-go digg-v4-d2
- [ ] 2010 leftover · facebook about — no data-4x-go facebook-about
- [ ] 2010 leftover · facebook d2 — no data-4x-go facebook-d2
- [ ] 2010 leftover · facebook d2 — no data-4x-go facebook-d3
- [ ] FarmVille peak leftover — no data-4x-go farm-peak
- [ ] 2010 leftover · farm peak d2 — no data-4x-go farm-peak-d2
- [ ] 2010 leftover · farmville about — no data-4x-go farmville-about
- [ ] 2010 leftover · farmville d2 — no data-4x-go farmville-d2
- [ ] flickrbox leftover REAL — no data-4x-go flickrbox-rlx
- [ ] 2010 leftover · flickrbox rlx d2 — no data-4x-go flickrbox-rlx-d2
- [ ] Farm leftover 2× — no data-4x-go fn-lx
- [ ] 2010 leftover · fn lx d2 — no data-4x-go fn-lx-d2
- [ ] 2010 leftover · formspring d2 — no data-4x-go formspring-d2
- [ ] 2010 leftover · foursqnote d2 — no data-4x-go foursqnote-d2
- [ ] foursqnote leftover REAL — no data-4x-go foursqnote-rlx
- [ ] 2010 leftover · foursquare d2 — no data-4x-go foursqua-d2
- [ ] 2010 leftover · foursquare about — no data-4x-go foursquare-about
- [ ] 2010 leftover · foursquare d2 — no data-4x-go foursquare-d2
- [ ] Formspring leftover 2× — no data-4x-go fs-lx
- [ ] FaceTime leftover 2× — no data-4x-go ft-lx
- [ ] 2010 leftover · ft lx d2 — no data-4x-go ft-lx-d2
- [ ] Gmail leftover 2× — no data-4x-go gm-lx
- [ ] 2010 leftover · gmailtab d2 — no data-4x-go gmailtab-d2
- [ ] 2010 leftover · google d2 — no data-4x-go google-d2
- [ ] google leftover REAL — no data-4x-go google-rlx
- [ ] Groupon leftover 2× — no data-4x-go gp-lx
- [ ] Groupon leftover deal — no data-4x-go groupon
- [ ] 2010 leftover · groupon d2 — no data-4x-go groupon-d2
- [ ] 2010 leftover · groupondeal d2 — no data-4x-go groupondea-d2
- [ ] Hulu leftover 2× — no data-4x-go hu-lx
- [ ] 2010 leftover · hulustream d2 — no data-4x-go hulustream-d2
- [ ] IE9 leftover 2× — no data-4x-go ie-lx
- [ ] 2010 leftover · ie9 d2 — no data-4x-go ie9-d2
- [ ] Instagram leftover caption path — no data-4x-go ig-cap
- [ ] 2010 leftover · imgur d2 — no data-4x-go imgur-d2
- [ ] Imgur leftover title — no data-4x-go imgur-lx
- [ ] Instant leftover 2× — no data-4x-go in-lx
- [ ] 2010 leftover · instagram about — no data-4x-go instagram-about
- [ ] 2010 leftover · instagram d2 — no data-4x-go instagram-d2
- [ ] 2010 leftover · instagramios d2 — no data-4x-go instagrami-d2
- [ ] instagramios leftover REAL — no data-4x-go instagrami-rlx
- [ ] 2010 leftover · instant d2 — no data-4x-go instant-d2
- [ ] 2010 leftover · ipad about — no data-4x-go ipad-about
- [ ] 2010 leftover · ipad — no data-4x-go ipad-d2
- [ ] 2010 leftover · ipad d2 — no data-4x-go ipad-d3
- [ ] 2010 leftover · ipad d2 — no data-4x-go ipad-d4
- [ ] 2010 leftover · ipad d2 — no data-4x-go ipad-d5
- [ ] 2010 leftover · ipad d2 — no data-4x-go ipad-d6
- [ ] iPad leftover $499 literacy — no data-4x-go ipad-ord
- [ ] 2010 leftover · ipad safari — no data-4x-go ipad-safari
- [ ] 2010 leftover · iphone about — no data-4x-go iphone-about
- [ ] 2010 leftover · iphone d2 — no data-4x-go iphone-d2
- [ ] 2010 leftover · iphone d2 — no data-4x-go iphone-d3
- [ ] iPhone 4 leftover FaceTime/Antenna — no data-4x-go iphone4
- [ ] 2010 leftover · kickstarter d2 — no data-4x-go kickstarte-d2
- [ ] Kickstarter leftover 2× — no data-4x-go ks-lx
- [ ] 2010 leftover · netflix d2 — no data-4x-go netflix-d2
- [ ] Netflix leftover 2× — no data-4x-go nf-lx
- [ ] Open Graph leftover Like CNN — no data-4x-go og1
- [ ] 2010 leftover · og1 d2 — no data-4x-go og1-d2
- [ ] Open Graph leftover Like IMDb — no data-4x-go og2
- [ ] 2010 leftover · og2 d2 — no data-4x-go og2-d2
- [ ] Pinterest leftover two pins — no data-4x-go pin-lx
- [ ] 2010 leftover · pinbeta d2 — no data-4x-go pinbeta-d2
- [ ] pinbeta leftover REAL — no data-4x-go pinbeta-rlx
- [ ] 2010 leftover · pinterest d2 — no data-4x-go pinteres-d2
- [ ] 2010 leftover · pinterest about — no data-4x-go pinterest-about
- [ ] 2010 leftover · pinterest d2 — no data-4x-go pinterest-d2
- [ ] 2010 leftover · playable — no data-4x-go playable
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d10
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d11
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d12
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d13
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d14
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d15
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d16
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d17
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d18
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d19
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d2
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d3
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d4
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d5
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d6
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d7
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d8
- [ ] 2010 leftover · playable d2 — no data-4x-go playable-d9
- [ ] 2010 leftover · playable extra a — no data-4x-go playable-extra-a
- [ ] 2010 leftover · playable extra b — no data-4x-go playable-extra-b
- [ ] 2010 leftover · playable extra c — no data-4x-go playable-extra-c
- [ ] 2010 leftover · playable extra d — no data-4x-go playable-extra-d
- [ ] 2010 leftover · playable extra e — no data-4x-go playable-extra-e
- [ ] 2010 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2010 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2010 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2010 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2010 leftover · playable famous — no data-4x-go playable-famous
- [ ] 2010 leftover · playable game — no data-4x-go playable-game
- [ ] 2010 leftover · playable game 2 — no data-4x-go playable-game-2
- [ ] 2010 leftover · playable game 3 — no data-4x-go playable-game-3
- [ ] 2010 leftover · playable game 4 — no data-4x-go playable-game-4
- [ ] 2010 leftover · playable game 5 — no data-4x-go playable-game-5
- [ ] 2010 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2010 leftover · playable more b — no data-4x-go playable-more-b
- [ ] Quora leftover 2× — no data-4x-go qu-lx
- [ ] Quora leftover ask — no data-4x-go quora
- [ ] 2010 leftover · quora d2 — no data-4x-go quora-d2
- [ ] 2010 leftover · quorawait d2 — no data-4x-go quorawait-d2
- [ ] Reddit leftover 2× — no data-4x-go rd-lx
- [ ] 2010 leftover · reddit d2 — no data-4x-go reddit-d2
- [ ] 2010 leftover · reddit d2 — no data-4x-go reddit-d3
- [ ] 2010 leftover · reddit submit — no data-4x-go reddit-submit
- [ ] Spotify leftover 2× — no data-4x-go sp-lx
- [ ] 2010 leftover · spotifyeu d2 — no data-4x-go spotifyeu-d2
- [ ] Twitter leftover 140 lurk OK — no data-4x-go t140
- [ ] Tumblr leftover 2× — no data-4x-go tb-lx
- [ ] 2010 leftover · trail q d2 — no data-4x-go trail-q-d2
- [ ] 2010 leftover · trail q d2 — no data-4x-go trail-q-d2-d2
- [ ] 2010 leftover · tumblr d2 — no data-4x-go tumblr-d2
- [ ] 2010 leftover · twitter d2 — no data-4x-go twitter-d2
- [ ] 2010 leftover · uber d2 — no data-4x-go uber-d2
- [ ] UberCab SF leftover — no data-4x-go uber-sf
- [ ] Wave funeral leftover — no data-4x-go wave-fun
- [ ] 2010 leftover · wikileaks d2 — no data-4x-go wikileaks-d2
- [ ] 2010 leftover · windowsphone d2 — no data-4x-go windowspho-d2
- [ ] windowsphone leftover REAL — no data-4x-go windowspho-rlx
- [ ] Cablegate leftover one-cable — no data-4x-go wl
- [ ] Wave leftover 2× — no data-4x-go wv-lx
- [ ] yahoo leftover REAL — no data-4x-go yahoo-rlx
- [ ] 2010 leftover · youtube about — no data-4x-go youtube-about
- [ ] 2010 leftover · youtube d2 — no data-4x-go youtube-d2
- [ ] 2010 leftover · youtube d2 — no data-4x-go youtube-d3
- [ ] YouTube leftover — no data-4x-go yt

### Popular 3×
- [x] Netflix — itt10-pop-netflix
- [x] Tumblr — itt10-pop-tumblr
- [x] Formspring — itt10-pop-formspring

### Links crawled from gold / official 10 / home / about
- [x] 28 URLs resolved

## 2012

### Gold
- [x] sites/instagram/android.html — complete → itt12-ig-android

### Official 10
- [x] 1. Instagram Android — sites/instagram/android.html
- [x] 2. Pinterest — sites/pinterest/index.html
- [x] 3. Facebook IPO — sites/facebook/ipo.html
- [x] 4. Facebook 1B — sites/facebook/index.html
- [x] 5. Maps flop — sites/iphone/maps.html
- [x] 6. SOPA — sites/wikipedia/sopa.html
- [x] 7. Medium — sites/medium/index.html
- [x] 8. Path — sites/path/index.html
- [x] 9. Flipboard — sites/flipboard/index.html
- [x] 10. Guess Doodle — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt12-game-andshare
- [x] extra-b.html — minute → itt12-game-ipopin
- [x] extra-c.html — more-game → itt12-game-frogslice
- [x] extra-d.html — more-game → itt12-game-repubpress
- [x] extra-e.html — more-game → itt12-game-strokeguess
- [x] extra-f.html — more-game → itt12-game-instahead
- [x] extra-g.html — more-game → itt12-game-sopanote
- [x] extra-h.html — more-game → itt12-game-share2
- [x] extra-i.html — more-game → itt12-game-iponote
- [x] famous.html — started
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt12-game-candyrow
- [x] more-b.html — more-game → itt12-game-silkwalk
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] 2012 leftover · ama — no data-4x-go ama
- [ ] amazon leftover REAL — no data-4x-go amazon-rlx
- [ ] 2012 leftover · amazon rlx d2 — no data-4x-go amazon-rlx-d2
- [ ] BuzzFeed leftover list — no data-4x-go buzz-more
- [ ] 2012 leftover · buzz more d2 — no data-4x-go buzz-more-d2
- [ ] 2012 leftover · buzzfeed d2 — no data-4x-go buzzfeed-d2
- [ ] BuzzFeed leftover 2× — no data-4x-go bz-lx
- [ ] 2012 leftover · chrome d2 — no data-4x-go chrome-d2
- [ ] 2012 leftover · chrome d2 — no data-4x-go chrome-d3
- [ ] Draw Something leftover — 2012 — no data-4x-go draw-lx
- [ ] 2012 leftover · drawsomething d2 — no data-4x-go draw-lx-d2
- [ ] 2012 leftover · facebook about — no data-4x-go facebook-about
- [ ] 2012 leftover · facebook d2 — no data-4x-go facebook-d2
- [ ] 2012 leftover · facebook d2 — no data-4x-go facebook-d3
- [ ] Flipboard leftover 2× — no data-4x-go flip-lx
- [ ] 2012 leftover · flip lx d2 — no data-4x-go flip-lx-d2
- [ ] Flipboard leftover — no data-4x-go flip-more
- [ ] 2012 leftover · flip more d2 — no data-4x-go flip-more-d2
- [ ] 2012 leftover · flipboard about — no data-4x-go flipboard-about
- [ ] 2012 leftover · flipboard d2 — no data-4x-go flipboard-d2
- [ ] 2012 leftover · game — no data-4x-go game
- [ ] Drive leftover 2× — no data-4x-go gd-lx
- [ ] 2012 leftover · gd lx d2 — no data-4x-go gd-lx-d2
- [ ] Drive box leftover 2× — no data-4x-go gdb-lx
- [ ] 2012 leftover · gdb lx d2 — no data-4x-go gdb-lx-d2
- [ ] gmail leftover REAL — no data-4x-go gmail-rlx
- [ ] 2012 leftover · gmail rlx d2 — no data-4x-go gmail-rlx-d2
- [ ] google leftover REAL — no data-4x-go google-rlx
- [ ] 2012 leftover · google rlx d2 — no data-4x-go google-rlx-d2
- [ ] 2012 leftover · googleplus — no data-4x-go googleplus
- [ ] 2012 leftover · googleplus d2 — no data-4x-go googleplus-d2
- [ ] IG leftover literacy — no data-4x-go ig-lx
- [ ] IG about leftover 2× — no data-4x-go iga-lx
- [ ] 2012 leftover · igabout d2 — no data-4x-go igabout-d2
- [ ] 2012 leftover · instagram d2 — no data-4x-go instagra-d2
- [ ] 2012 leftover · instagram d2 — no data-4x-go instagra-d3
- [ ] 2012 leftover · instagram about — no data-4x-go instagram-about
- [ ] 2012 leftover · instagram acquired — no data-4x-go instagram-acquired
- [ ] 2012 leftover · instagram android — no data-4x-go instagram-android
- [ ] 2012 leftover · instagram d2 — no data-4x-go instagram-d2
- [ ] 2012 leftover · iphone — no data-4x-go iphone
- [ ] 2012 leftover · iphone d2 — no data-4x-go iphone-d2
- [ ] 2012 leftover · iphone d2 — no data-4x-go iphone-d3
- [ ] 2012 leftover · iphone maps — no data-4x-go iphone-maps
- [ ] Facebook IPO leftover — no data-4x-go ipo-lx
- [ ] 2012 leftover · ipo lx d2 — no data-4x-go ipo-lx-d2
- [ ] IPO about leftover 2× — no data-4x-go ipoa-lx
- [ ] 2012 leftover · ipoabout d2 — no data-4x-go ipoabout-d2
- [ ] Kindle Fire leftover 2× — no data-4x-go kf-lx
- [ ] 2012 leftover · kindlefire d2 — no data-4x-go kindlefire-d2
- [ ] Lyft leftover 2× — no data-4x-go ly-lx
- [ ] 2012 leftover · lyft d2 — no data-4x-go lyft-d2
- [ ] 2012 leftover · lyft d2 — no data-4x-go lyft-d3
- [ ] Lyft leftover — no data-4x-go lyft-more
- [ ] Yahoo / Mayer leftover — Jul 2012 — no data-4x-go marissa-lx
- [ ] 2012 leftover · yahoo-marissa d2 — no data-4x-go marissa-lx-d2
- [ ] Medium leftover 2× pack — no data-4x-go md2-lx
- [ ] 2012 leftover · medium about — no data-4x-go medium-about
- [ ] 2012 leftover · medium d2 — no data-4x-go medium-d2
- [ ] 2012 leftover · medium d2 — no data-4x-go medium-d3
- [ ] 2012 leftover · medium d2 — no data-4x-go medium-d4
- [ ] Medium leftover post — no data-4x-go medium-more
- [ ] 2012 leftover · netflix d2 — no data-4x-go netflix-d2
- [ ] netflix leftover REAL — no data-4x-go netflix-rlx
- [ ] Nexus leftover — 2012 — no data-4x-go nexus-lx
- [ ] 2012 leftover · nexus d2 — no data-4x-go nexus-lx-d2
- [ ] 2012 leftover · path about — no data-4x-go path-about
- [ ] 2012 leftover · path d2 — no data-4x-go path-d2
- [ ] 2012 leftover · path d2 — no data-4x-go path-d3
- [ ] 2012 leftover · path d2 — no data-4x-go path-d4
- [ ] Path leftover 2× — no data-4x-go path-lx
- [ ] Path leftover — no data-4x-go path-more
- [ ] Pinterest leftover 2× — no data-4x-go pin-lx
- [ ] Pinterest about leftover 2× — no data-4x-go pina-lx
- [ ] 2012 leftover · pinabout d2 — no data-4x-go pinabout-d2
- [ ] 2012 leftover · pinterest d2 — no data-4x-go pinteres-d2
- [ ] 2012 leftover · pinterest about — no data-4x-go pinterest-about
- [ ] 2012 leftover · pinterest d2 — no data-4x-go pinterest-d2
- [ ] 2012 leftover · play — no data-4x-go play
- [ ] 2012 leftover · play d2 — no data-4x-go play-d2
- [ ] 2012 leftover · playable — no data-4x-go playable
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d10
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d11
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d12
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d13
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d14
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d15
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d2
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d3
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d4
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d5
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d6
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d7
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d8
- [ ] 2012 leftover · playable d2 — no data-4x-go playable-d9
- [ ] 2012 leftover · playable extra a — no data-4x-go playable-extra-a
- [ ] 2012 leftover · playable extra b — no data-4x-go playable-extra-b
- [ ] 2012 leftover · playable extra c — no data-4x-go playable-extra-c
- [ ] 2012 leftover · playable extra d — no data-4x-go playable-extra-d
- [ ] 2012 leftover · playable extra e — no data-4x-go playable-extra-e
- [ ] 2012 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2012 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2012 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2012 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2012 leftover · playable famous — no data-4x-go playable-famous
- [ ] 2012 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2012 leftover · playable more b — no data-4x-go playable-more-b
- [ ] 2012 leftover · reddit — no data-4x-go reddit
- [ ] 2012 leftover · reddit about — no data-4x-go reddit-about
- [ ] 2012 leftover · reddit d2 — no data-4x-go reddit-d2
- [ ] 2012 leftover · reddit d2 — no data-4x-go reddit-d3
- [ ] 2012 leftover · reddit d2 — no data-4x-go reddit-d4
- [ ] SoundCloud leftover 2× — no data-4x-go sc-lx
- [ ] 2012 leftover · snapchat — no data-4x-go snapchat
- [ ] 2012 leftover · snapchat d2 — no data-4x-go snapchat-d2
- [ ] 2012 leftover · soundcloud d2 — no data-4x-go soundclo-d2
- [ ] 2012 leftover · soundcloud d2 — no data-4x-go soundcloud-d2
- [ ] 2012 leftover · soundcloud pop — no data-4x-go soundcloud-pop
- [ ] Surface leftover — 2012 announce — no data-4x-go surface-lx
- [ ] 2012 leftover · surface d2 — no data-4x-go surface-lx-d2
- [ ] Tumblr leftover 2× — no data-4x-go tb12-lx
- [ ] Tinder leftover 2× — no data-4x-go td-lx
- [ ] 2012 leftover · tinder about — no data-4x-go tinder-about
- [ ] 2012 leftover · tinder d2 — no data-4x-go tinder-d2
- [ ] 2012 leftover · tinder d2 — no data-4x-go tinder-d3
- [ ] 2012 leftover · tinder d2 — no data-4x-go tinder-d4
- [ ] Tinder leftover swipe — no data-4x-go tinder-more
- [ ] Trello leftover 2× — no data-4x-go tr-lx
- [ ] 2012 leftover · trail q d2 — no data-4x-go trail-q-d2
- [ ] 2012 leftover · trello d2 — no data-4x-go trello-d2
- [ ] 2012 leftover · trello d2 — no data-4x-go trello-d3
- [ ] Trello leftover card — no data-4x-go trello-more
- [ ] 2012 leftover · tumblr — no data-4x-go tumblr
- [ ] 2012 leftover · tumblr d2 — no data-4x-go tumblr-d2
- [ ] 2012 leftover · tumblr12 d2 — no data-4x-go tumblr12-d2
- [ ] Twitter leftover 2× — no data-4x-go tw12-lx
- [ ] 2012 leftover · twitter — no data-4x-go twitter
- [ ] 2012 leftover · twitter d2 — no data-4x-go twitter-d2
- [ ] 2012 leftover · twnote12 d2 — no data-4x-go twnote12-d2
- [ ] Uber leftover 2× — no data-4x-go ub-lx
- [ ] 2012 leftover · uber d2 — no data-4x-go uber-d2
- [ ] 2012 leftover · vinewait d2 — no data-4x-go vinewait-d2
- [ ] Vine wait leftover — no data-4x-go vw-lx
- [ ] Win8 leftover 2× — no data-4x-go w8-lx
- [ ] Windows8 leftover 2× — no data-4x-go w8b-lx
- [ ] 2012 leftover · waze d2 — no data-4x-go waze-d2
- [ ] 2012 leftover · waze d2 — no data-4x-go waze-d3
- [ ] Waze leftover route — no data-4x-go waze-more
- [ ] 2012 leftover · wikipedia d2 — no data-4x-go wikipedi-d2
- [ ] 2012 leftover · wikipedia d2 — no data-4x-go wikipedia-d2
- [ ] 2012 leftover · wikipedia sopa — no data-4x-go wikipedia-sopa
- [ ] 2012 leftover · windows8 about — no data-4x-go windows8-about
- [ ] 2012 leftover · windows8 d2 — no data-4x-go windows8-d2
- [ ] SOPA leftover — no data-4x-go wk-lx
- [ ] Windows Phone leftover — 2012 — no data-4x-go wp-lx
- [ ] 2012 leftover · windows-phone d2 — no data-4x-go wp-lx-d2
- [ ] Waze leftover 2× — no data-4x-go wz-lx
- [ ] yahoo leftover REAL — no data-4x-go yahoo-rlx
- [ ] 2012 leftover · youtube d2 — no data-4x-go youtube-d2
- [ ] YouTube leftover 2× — no data-4x-go yt-lx
- [ ] YouTube leftover 2× — no data-4x-go yt12-lx
- [ ] 2012 leftover · ytnote12 d2 — no data-4x-go ytnote12-d2

### Popular 3×
- [x] Medium — itt12-pop-medium
- [x] Path — itt12-pop-path
- [x] Flipboard — itt12-pop-flipboard

### Links crawled from gold / official 10 / home / about
- [x] 30 URLs resolved

## 2013

### Gold
- [x] sites/vine/record.html — complete → itt13-vine-posts

### Official 10
- [x] 1. Vine 6s — sites/vine/record.html
- [x] 2. IG Video — sites/instagram/video.html
- [x] 3. Stories — sites/snapchat/story.html
- [x] 4. iOS 7 — sites/iphone/ios7.html
- [x] 5. Touch ID — sites/iphone/touchid.html
- [x] 6. Snowden — sites/snowden/index.html
- [x] 7. Telegram — sites/telegram/index.html
- [x] 8. Yahoo×Tumblr — sites/tumblr/index.html
- [x] 9. Win8.1 — sites/windows81/index.html
- [x] 10. Loop Six — sites/playable/game.html

### Games
- [x] extra-a.html — leftover extra → itt13-game-six
- [x] extra-b.html — leftover extra → itt13-game-stories
- [x] extra-c.html — more-game → itt13-game-loopspare
- [x] extra-d.html — more-game started
- [x] extra-e.html — more-game → itt13-game-flattap
- [x] extra-f.html — more-game → itt13-game-vineloop2
- [x] extra-g.html — more-game started
- [x] extra-h.html — more-game → itt13-game-post2
- [x] extra-i.html — more-game → itt13-game-flatnote
- [x] famous.html — started
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt13-game-pipetap
- [x] more-b.html — more-game → itt13-game-booth
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Ask.fm leftover — no data-4x-go ask-lx
- [ ] 2013 leftover · ask lx d2 — no data-4x-go ask-lx-d2
- [ ] Bitcoin leftover — 2013 literacy — no data-4x-go bt-13
- [ ] 2013 leftover · bitcoin13 d2 — no data-4x-go bt-13-d2
- [ ] Chrome leftover 2× — no data-4x-go ch-lx
- [ ] 2013 leftover · chrome d2 — no data-4x-go chrome-d2
- [ ] 2013 leftover · facebook about — no data-4x-go facebook-about
- [ ] 2013 leftover · facebook d2 — no data-4x-go facebook-d2
- [ ] 2013 leftover · facebook d2 — no data-4x-go facebook-d3
- [ ] Facebook leftover — no data-4x-go fb-lx
- [ ] Healthcare.gov leftover — no data-4x-go hc-lx
- [ ] 2013 leftover · healthcare d2 — no data-4x-go healthca-d2
- [ ] 2013 leftover · healthcare d2 — no data-4x-go healthca-d3
- [ ] 2013 leftover · healthcare d2 — no data-4x-go healthcare-d2
- [ ] 2013 leftover · healthcare pop — no data-4x-go healthcare-pop
- [ ] 2013 leftover · healthcare status — no data-4x-go healthcare-status
- [ ] Hangouts leftover — 2013 — no data-4x-go hg-13
- [ ] 2013 leftover · hangouts13 d2 — no data-4x-go hg-13-d2
- [ ] IG leftover 2× — no data-4x-go ig-lx
- [ ] 2013 leftover · instagram d2 — no data-4x-go instagram-d2
- [ ] instagram leftover REAL — no data-4x-go instagram-rlx
- [ ] 2013 leftover · instagram video — no data-4x-go instagram-video
- [ ] iOS 7 leftover flat note — no data-4x-go ios7-lx
- [ ] 2013 leftover · ios7about — no data-4x-go ios7about
- [ ] 2013 leftover · ios7about d2 — no data-4x-go ios7about-d2
- [ ] 2013 leftover · iphone 5c — no data-4x-go iphone-5c
- [ ] 2013 leftover · iphone d2 — no data-4x-go iphone-d2
- [ ] 2013 leftover · iphone d2 — no data-4x-go iphone-d3
- [ ] 2013 leftover · iphone d2 — no data-4x-go iphone-d4
- [ ] 2013 leftover · iphone touchid — no data-4x-go iphone-touchid
- [ ] Medium leftover — no data-4x-go md-lx
- [ ] 2013 leftover · medium d2 — no data-4x-go medium-d2
- [ ] 2013 leftover · ouya d2 — no data-4x-go ouya-d2
- [ ] OUYA leftover — no data-4x-go oy-lx
- [ ] Patreon leftover — 2013 — no data-4x-go pa-13
- [ ] 2013 leftover · patreon d2 — no data-4x-go pa-13-d2
- [ ] 2013 leftover · playable — no data-4x-go playable
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d10
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d11
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d12
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d13
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d14
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d15
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d2
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d3
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d4
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d5
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d6
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d7
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d8
- [ ] 2013 leftover · playable d2 — no data-4x-go playable-d9
- [ ] 2013 leftover · playable extra a — no data-4x-go playable-extra-a
- [ ] 2013 leftover · playable extra b — no data-4x-go playable-extra-b
- [ ] 2013 leftover · playable extra c — no data-4x-go playable-extra-c
- [ ] 2013 leftover · playable extra d — no data-4x-go playable-extra-d
- [ ] 2013 leftover · playable extra e — no data-4x-go playable-extra-e
- [ ] 2013 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2013 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2013 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2013 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2013 leftover · playable famous — no data-4x-go playable-famous
- [ ] 2013 leftover · playable game — no data-4x-go playable-game
- [ ] 2013 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2013 leftover · playable more b — no data-4x-go playable-more-b
- [ ] Reddit leftover 2× — no data-4x-go rd-lx
- [ ] 2013 leftover · reddit about — no data-4x-go reddit-about
- [ ] 2013 leftover · reddit d2 — no data-4x-go reddit-d2
- [ ] 2013 leftover · reddit d2 — no data-4x-go reddit-d3
- [ ] Snowden leftover literacy — no data-4x-go sn-lx
- [ ] Snap leftover 2× — no data-4x-go sna-lx
- [ ] 2013 leftover · snapabout d2 — no data-4x-go snapabout-d2
- [ ] 2013 leftover · snapchat about — no data-4x-go snapchat-about
- [ ] 2013 leftover · snapchat d2 — no data-4x-go snapchat-d2
- [ ] 2013 leftover · snapchat d2 — no data-4x-go snapchat-d3
- [ ] 2013 leftover · snowden about — no data-4x-go snowden-about
- [ ] 2013 leftover · snowden d2 — no data-4x-go snowden-d2
- [ ] 2013 leftover · snowden d2 — no data-4x-go snowden-d3
- [ ] Stories leftover 24h note — no data-4x-go st-lx
- [ ] Yahoo×Tumblr leftover note — no data-4x-go tb-lx
- [ ] Tumblr leftover 2× — no data-4x-go tb2-lx
- [ ] 2013 leftover · teleabout d2 — no data-4x-go teleabout-d2
- [ ] 2013 leftover · telegram about — no data-4x-go telegram-about
- [ ] 2013 leftover · telegram chat — no data-4x-go telegram-chat-d2
- [ ] 2013 leftover · telegram d2 — no data-4x-go telegram-d2
- [ ] 2013 leftover · telegram d2 — no data-4x-go telegram-d3
- [ ] 2013 leftover · telegram d2 — no data-4x-go telegram-d4
- [ ] Telegram leftover chat note — no data-4x-go tg-lx
- [ ] Twitter IPO leftover — 7 Nov 2013 — no data-4x-go ti-13
- [ ] 2013 leftover · twitteripo d2 — no data-4x-go ti-13-d2
- [ ] Touch ID leftover 2× — no data-4x-go tid-lx
- [ ] Telegram leftover 2× — no data-4x-go tla-lx
- [ ] 2013 leftover · touchabout d2 — no data-4x-go touchabout-d2
- [ ] 2013 leftover · tumblr about — no data-4x-go tumblr-about
- [ ] 2013 leftover · tumblr d2 — no data-4x-go tumblr-d2
- [ ] 2013 leftover · tumblr d2 — no data-4x-go tumblr-d3
- [ ] 2013 leftover · tumblr13 d2 — no data-4x-go tumblr13-d2
- [ ] Twitter leftover — no data-4x-go tw-lx
- [ ] Twitter leftover 2× pack — no data-4x-go twb-lx
- [ ] 2013 leftover · twitter about — no data-4x-go twitter-about
- [ ] 2013 leftover · twitter d2 — no data-4x-go twitter-d2
- [ ] Vineabout leftover 2× — no data-4x-go vina-lx
- [ ] 2013 leftover · vine about — no data-4x-go vine-about
- [ ] 2013 leftover · vine d2 — no data-4x-go vine-d2
- [ ] 2013 leftover · vine d2 — no data-4x-go vine-d3
- [ ] Vine leftover literacy — no data-4x-go vine-lx
- [ ] 2013 leftover · vineabout d2 — no data-4x-go vineabout-d2
- [ ] Vine leftover second hold — no data-4x-go vn-lx
- [ ] Win8.1 leftover — no data-4x-go w81-lx
- [ ] Win8.1 leftover 2× pack — no data-4x-go w81b-lx
- [ ] Whisper leftover — no data-4x-go wh-lx
- [ ] 2013 leftover · whisper d2 — no data-4x-go whisper-d2
- [ ] Xbox One leftover — no data-4x-go xb-lx
- [ ] 2013 leftover · xboxone d2 — no data-4x-go xboxone-d2
- [ ] Yik Yak leftover — 2013 seed — no data-4x-go yk-13
- [ ] 2013 leftover · yikyak13 d2 — no data-4x-go yk-13-d2
- [ ] YouTube leftover — no data-4x-go yt-lx
- [ ] YouTube leftover 2× pack — no data-4x-go ytb-lx

### Popular 3×
- [x] Ask.fm — itt13-pop-askfm
- [x] Whisper — itt13-pop-whisper
- [x] YouTube — itt13-pop-youtube

### Links crawled from gold / official 10 / home / about
- [x] 28 URLs resolved

## 2014

### Gold
- [x] sites/whatsapp/index.html — complete → itt14-wa-install

### Official 10
- [x] 1. WhatsApp — sites/whatsapp/index.html
- [x] 2. Chat — sites/whatsapp/chat.html
- [x] 3. Heartbleed — sites/heartbleed/index.html
- [x] 4. Ice Bucket — sites/icebucket/index.html
- [x] 5. iPhone 6 — sites/iphone/index.html
- [x] 6. Apple Pay — sites/iphone/pay.html
- [x] 7. Material — sites/material/index.html
- [x] 8. Slack — sites/slack/index.html
- [x] 9. Twitch — sites/twitch/index.html
- [x] 10. Tile Fold — sites/playable/game.html

### Games
- [x] extra-a.html — lean leftover page
- [x] extra-b.html — lean leftover page
- [x] extra-c.html — more-game → itt14-game-slackchan
- [x] extra-d.html — more-game → itt14-game-icepour
- [x] extra-e.html — more-game → itt14-game-rotatels
- [x] extra-f.html — more-game → itt14-game-wa2step
- [x] extra-g.html — more-game → itt14-game-bleednote
- [x] extra-h.html — more-game → itt14-game-install2
- [x] extra-i.html — more-game → itt14-game-icenote
- [x] famous.html — started
- [x] game-2.html — pack-game → itt14-game-icehold
- [x] game-3.html — pack-game → itt14-game-waticks
- [x] game-4.html — pack-game → itt14-game-hbpatch
- [x] game-5.html — pack-game → itt14-game-paytap
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt14-game-clone
- [x] more-b.html — more-game → itt14-game-inn

### 2× leftover dests
- [ ] Alipay leftover — no data-4x-go ali-lx
- [ ] 2014 leftover · ali lx d2 — no data-4x-go ali-lx-d2
- [ ] WhatsApp chat leftover — no data-4x-go chat-lx
- [ ] Echo invite leftover 6× — no data-4x-go ec-6x
- [ ] 2014 leftover · ec 6x d2 — no data-4x-go ec-6x-d2
- [ ] Ello leftover 6× — no data-4x-go el-6x
- [ ] 2014 leftover · el 6x d2 — no data-4x-go el-6x-d2
- [ ] 2014 leftover · facebook about — no data-4x-go facebook-about
- [ ] Facebook leftover — no data-4x-go fb-lx
- [ ] Facebook leftover 2× pack — no data-4x-go fb2-lx
- [ ] 2014 leftover · fb2 lx d2 — no data-4x-go fb2-lx-d2
- [ ] Giphy leftover — no data-4x-go gi-lx
- [ ] Giphy leftover 2× pack — no data-4x-go gi2-lx
- [ ] 2014 leftover · gi2 lx d2 — no data-4x-go gi2-lx-d2
- [ ] Heartbleed leftover second rotate — no data-4x-go hb-lx
- [ ] 2014 leftover · hb lx d2 — no data-4x-go hb-lx-d2
- [ ] 2014 leftover · heartbleed about — no data-4x-go heartbleed-about
- [ ] Ice Bucket leftover 2× — no data-4x-go ib-lx
- [ ] 2014 leftover · ib lx d2 — no data-4x-go ib-lx-d2
- [ ] Ice Bucket leftover second name — no data-4x-go ice-lx
- [ ] 2014 leftover · icebucket about — no data-4x-go icebucket-about
- [ ] IG leftover 2× — no data-4x-go ig-lx
- [ ] 2014 leftover · ig lx d2 — no data-4x-go ig-lx-d2
- [ ] 2014 leftover · instagram about — no data-4x-go instagram-about
- [ ] iPhone 6 leftover second size — no data-4x-go ip-lx
- [ ] 2014 leftover · ip lx d2 — no data-4x-go ip-lx-d2
- [ ] iPhone 6 leftover 2× — no data-4x-go ip6-lx
- [ ] 2014 leftover · iphone pay — no data-4x-go iphone-pay
- [ ] Material leftover — no data-4x-go mat-lx
- [ ] Material leftover 2× pack — no data-4x-go mata-lx
- [ ] musical.ly leftover 6× — no data-4x-go ml-6x
- [ ] Oculus leftover 6× — no data-4x-go oc-6x
- [ ] Apple Pay leftover 2× — no data-4x-go pay-lx
- [ ] 2014 leftover · playable — no data-4x-go playable
- [ ] 2014 leftover · playable extra a — no data-4x-go playable-extra-a
- [ ] 2014 leftover · playable extra b — no data-4x-go playable-extra-b
- [ ] 2014 leftover · playable extra c — no data-4x-go playable-extra-c
- [ ] 2014 leftover · playable extra d — no data-4x-go playable-extra-d
- [ ] 2014 leftover · playable extra e — no data-4x-go playable-extra-e
- [ ] 2014 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2014 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2014 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2014 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2014 leftover · playable famous — no data-4x-go playable-famous
- [ ] 2014 leftover · playable game — no data-4x-go playable-game
- [ ] 2014 leftover · playable game 2 — no data-4x-go playable-game-2
- [ ] 2014 leftover · playable game 3 — no data-4x-go playable-game-3
- [ ] 2014 leftover · playable game 4 — no data-4x-go playable-game-4
- [ ] 2014 leftover · playable game 5 — no data-4x-go playable-game-5
- [ ] 2014 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2014 leftover · playable more b — no data-4x-go playable-more-b
- [ ] Snap leftover 2× — no data-4x-go sc-lx
- [ ] Serial leftover 6× — no data-4x-go se-6x
- [ ] Slack leftover second channel — no data-4x-go sl-lx
- [ ] Slack leftover 2× — no data-4x-go sl2-lx
- [ ] 2014 leftover · slack about — no data-4x-go slack-about
- [ ] 2014 leftover · snapchat about — no data-4x-go snapchat-about
- [ ] Swarm leftover — no data-4x-go sw-lx
- [ ] TrueCrypt leftover 6× — no data-4x-go tc-6x
- [ ] Twitch leftover second stream — no data-4x-go tw-lx
- [ ] Twitch leftover 2× — no data-4x-go tw2-lx
- [ ] Twitch leftover 2× pack — no data-4x-go twch-lx
- [ ] Twitter leftover 2× — no data-4x-go twt-lx
- [ ] Uber leftover — no data-4x-go ub-lx
- [ ] Uber leftover 2× pack — no data-4x-go ub2-lx
- [ ] 2014 leftover · uber about — no data-4x-go uber-about
- [ ] WhatsApp leftover second note — no data-4x-go wa-lx
- [ ] Waabout leftover 2× — no data-4x-go waa-lx
- [ ] 2014 leftover · whatsapp about — no data-4x-go whatsapp-about
- [ ] Wikipedia leftover — no data-4x-go wk-lx
- [ ] Wikipedia leftover 2× pack — no data-4x-go wk2-lx
- [ ] 2014 leftover · youtube about — no data-4x-go youtube-about
- [ ] YouTube leftover — no data-4x-go yt-lx
- [ ] YouTube leftover 2× pack — no data-4x-go yt2-lx

### Popular 3×
- [x] Snapchat — itt14-pop-snapchat
- [x] Instagram — itt14-pop-instagram
- [x] Uber — itt14-pop-uber

### Links crawled from gold / official 10 / home / about
- [x] 25 URLs resolved

## 2015

### Gold
- [x] sites/periscope/index.html — complete → itt15-periscope

### Official 10
- [x] 1. Periscope Go LIVE — sites/periscope/index.html
- [x] 2. Google Photos — sites/googlephotos/index.html
- [x] 3. Windows 10 — sites/windows10/index.html
- [x] 4. Apple Music — sites/applemusic/index.html
- [x] 5. Edge Spartan — sites/edge/index.html
- [x] 6. Watch leftover — sites/apple/watch.html
- [x] 7. Snap Discover — sites/snapchat/discover.html
- [x] 8. Discord — sites/discord/index.html
- [x] 9. Let's Encrypt — sites/letsencrypt/index.html
- [x] 10. Blob Rush — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt15-game-peritap
- [x] extra-b.html — minute → itt15-game-lockertap
- [x] extra-c.html — more-game → itt15-game-splitdrill
- [x] extra-d.html — more-game started
- [x] extra-e.html — more-game → itt15-game-traywhack
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt15-game-gwxnote
- [x] extra-h.html — more-game → itt15-game-live2
- [x] extra-i.html — more-game → itt15-game-lockernote
- [x] famous.html — started
- [x] game-2.html — pack-game → itt15-game-meerkathop
- [x] game-3.html — minute → itt15-game-fbliveceleb
- [x] game-4.html — minute → itt15-game-win10tray
- [x] game-5.html — minute → itt15-game-watchface
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt15-game-mercy
- [x] more-b.html — more-game → itt15-game-kickoff
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] adblock leftover REAL — no data-4x-go adblock-rlx
- [ ] 2015 leftover · adblock rlx d2 — no data-4x-go adblock-rlx-d2
- [ ] Agar.io leftover 6× — no data-4x-go ag-6x
- [ ] 2015 leftover · ag 6x d2 — no data-4x-go ag-6x-d2
- [ ] Apple Music leftover trial honesty — no data-4x-go am
- [ ] 2015 leftover · am d2 — no data-4x-go am-d2
- [ ] Apple Music leftover trial note — no data-4x-go am-sub
- [ ] 2015 leftover · am sub d2 — no data-4x-go am-sub-d2
- [ ] amppage leftover REAL — no data-4x-go amppage-rlx
- [ ] 2015 leftover · amppage rlx d2 — no data-4x-go amppage-rlx-d2
- [ ] 2015 leftover · applemusic about — no data-4x-go applemusic-about
- [ ] 2015 leftover · applemusic d2 — no data-4x-go applemusic-d2
- [ ] Beats 1 leftover show — no data-4x-go beats1
- [ ] 2015 leftover · beats1 d2 — no data-4x-go beats1-d2
- [ ] iOS9 leftover content blockers — no data-4x-go block
- [ ] iOS 9 leftover blocker name — no data-4x-go block-2
- [ ] 2015 leftover · block d2 — no data-4x-go block-d2
- [ ] 2015 cabinet leftover — no data-4x-go cab
- [ ] Discord leftover join — no data-4x-go dc
- [ ] 2015 leftover · dc d2 — no data-4x-go dc-d2
- [ ] 2015 leftover · discord about — no data-4x-go discord-about
- [ ] 2015 leftover · discord d2 — no data-4x-go discord-d2
- [ ] discordabout leftover REAL — no data-4x-go discordabo-rlx
- [ ] 2015 leftover · discordabo rlx d2 — no data-4x-go discordabo-rlx-d2
- [ ] Snap Discover leftover tiles — no data-4x-go discover
- [ ] discoverabout leftover REAL — no data-4x-go discoverab-rlx
- [ ] 2015 leftover · discoverab rlx d2 — no data-4x-go discoverab-rlx-d2
- [ ] 2015 leftover · echo about — no data-4x-go echo-about
- [ ] 2015 leftover · echo d2 — no data-4x-go echo-d2
- [ ] Echo leftover order literacy — no data-4x-go echo-lx
- [ ] 2015 leftover · echo lx d2 — no data-4x-go echo-lx-d2
- [ ] Edge Spartan leftover (not Chromium) — no data-4x-go edge-lx
- [ ] 2015 leftover · edge lx d2 — no data-4x-go edge-lx-d2
- [ ] edgeabout leftover REAL — no data-4x-go edgeabout-rlx
- [ ] 2015 leftover · edgeabout rlx d2 — no data-4x-go edgeabout-rlx-d2
- [ ] Watch leftover face name — no data-4x-go faces
- [ ] 2015 leftover · faces d2 — no data-4x-go faces-d2
- [ ] Famous leftover 2015 second — no data-4x-go fam-2
- [ ] FB Live leftover celebs-only — no data-4x-go fblive
- [ ] 2015 leftover · fblive d2 — no data-4x-go fblive-d2
- [ ] 2015 second game leftover — no data-4x-go g2
- [ ] 2015 leftover · googlephotos d2 — no data-4x-go googlephot-d2
- [ ] 2015 leftover · googlephotos about — no data-4x-go googlephotos-about
- [ ] Google Photos leftover backup — no data-4x-go gp
- [ ] 2015 leftover · gp d2 — no data-4x-go gp-d2
- [ ] Photos leftover library name — no data-4x-go gp-lib
- [ ] 2015 leftover · gp lib d2 — no data-4x-go gp-lib-d2
- [ ] Get Windows 10 leftover — no data-4x-go gw10
- [ ] Instant Articles leftover 6× — no data-4x-go ia-6x
- [ ] 2015 leftover · ia 6x d2 — no data-4x-go ia-6x-d2
- [ ] Instagram leftover (no Stories) — no data-4x-go ig
- [ ] 2015 leftover · ig d2 — no data-4x-go ig-d2
- [ ] 2015 leftover · instagram about — no data-4x-go instagram-about
- [ ] 2015 leftover · instagram d2 — no data-4x-go instagram-d2
- [ ] Let's Encrypt leftover second domain — no data-4x-go le-2
- [ ] Let's Encrypt leftover domain — no data-4x-go le-lx
- [ ] 2015 leftover · le lx d2 — no data-4x-go le-lx-d2
- [ ] leabout leftover REAL — no data-4x-go leabout-rlx
- [ ] 2015 leftover · leabout rlx d2 — no data-4x-go leabout-rlx-d2
- [ ] Meerkat leftover stream — no data-4x-go meerkat
- [ ] 2015 leftover · meerkat d2 — no data-4x-go meerkat-d2
- [ ] Meerkat live leftover — no data-4x-go meerkat-live
- [ ] 2015 leftover · meerkat live d2 — no data-4x-go meerkat-live-d2
- [ ] 2015 leftover · netflix about — no data-4x-go netflix-about
- [ ] 2015 leftover · netflix d2 — no data-4x-go netflix-d2
- [ ] Netflix leftover — no data-4x-go nf
- [ ] 2015 leftover · nf d2 — no data-4x-go nf-d2
- [ ] Watch leftover pair literacy — no data-4x-go pair
- [ ] 2015 leftover · pair d2 — no data-4x-go pair-d2
- [ ] Peach leftover — 2015 — no data-4x-go peach-lx
- [ ] 2015 leftover · peach d2 — no data-4x-go peach-lx-d2
- [ ] Periscope leftover titled Go LIVE — no data-4x-go peri-title
- [ ] 2015 leftover · peri title d2 — no data-4x-go peri-title-d2
- [ ] Periscope leftover watch title — no data-4x-go peri-w
- [ ] 2015 leftover · peri w d2 — no data-4x-go peri-w-d2
- [ ] periabout leftover REAL — no data-4x-go periabout-rlx
- [ ] 2015 leftover · periabout rlx d2 — no data-4x-go periabout-rlx-d2
- [ ] 2015 leftover · periscope about — no data-4x-go periscope-about
- [ ] 2015 leftover · periscope d2 — no data-4x-go periscope-d2
- [ ] photosabout leftover REAL — no data-4x-go photosabou-rlx
- [ ] 2015 leftover · photosabou rlx d2 — no data-4x-go photosabou-rlx-d2
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d10
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d11
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d12
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d13
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d14
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d15
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d16
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d17
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d2
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d3
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d4
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d5
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d6
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d7
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d8
- [ ] 2015 leftover · playable d2 — no data-4x-go playable-d9
- [ ] 2015 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2015 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2015 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2015 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2015 leftover · playable game — no data-4x-go playable-game
- [ ] 2015 leftover · playable game 3 — no data-4x-go playable-game-3
- [ ] 2015 leftover · playable game 4 — no data-4x-go playable-game-4
- [ ] 2015 leftover · playable game 5 — no data-4x-go playable-game-5
- [ ] 2015 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2015 leftover · playable more b — no data-4x-go playable-more-b
- [ ] Secret leftover 6× — no data-4x-go sec-6x
- [ ] 2015 leftover · secret d2 — no data-4x-go secret-d2
- [ ] Snapchat leftover story note — no data-4x-go snap-h
- [ ] 2015 leftover · snapchat about — no data-4x-go snapchat-about
- [ ] 2015 leftover · snapchat d2 — no data-4x-go snapchat-d2
- [ ] 2015 leftover · snapchat d2 — no data-4x-go snapchat-d3
- [ ] 2015 leftover · snapchat d2 — no data-4x-go snapchat-d4
- [ ] Spotify leftover — no data-4x-go spot
- [ ] 2015 leftover · spotify d2 — no data-4x-go spotify-d2
- [ ] Swift OSS leftover 6× — no data-4x-go sw-6x
- [ ] 2015 leftover · swiftoss d2 — no data-4x-go swiftoss-d2
- [ ] Title II leftover 6× — no data-4x-go t2-6x
- [ ] 2015 leftover · titleii d2 — no data-4x-go titleii-d2
- [ ] Win10 leftover upgrade literacy — no data-4x-go w10-up
- [ ] Watch leftover (not the chip) — no data-4x-go watch-lx
- [ ] 2015 leftover · watch lx d2 — no data-4x-go watch-lx-d2
- [ ] 2015 leftover · watchabout d2 — no data-4x-go watchabout-d2
- [ ] watchabout leftover REAL — no data-4x-go watchabout-rlx
- [ ] 2015 leftover · waweb d2 — no data-4x-go waweb-d2
- [ ] Win10 leftover reserve — no data-4x-go win10-lx
- [ ] 2015 leftover · win10get d2 — no data-4x-go win10get-d2
- [ ] 2015 leftover · windows10 d2 — no data-4x-go windows1-d2
- [ ] 2015 leftover · windows10 d2 — no data-4x-go windows1-d3
- [ ] 2015 leftover · windows10 about — no data-4x-go windows10-about
- [ ] 2015 leftover · windows10 d2 — no data-4x-go windows10-d2
- [ ] WhatsApp Web leftover 6× — no data-4x-go ww-6x
- [ ] 2015 extra-a leftover — no data-4x-go xa
- [ ] 2015 leftover · xa d2 — no data-4x-go xa-d2
- [ ] 2015 extra-b leftover — no data-4x-go xb
- [ ] 2015 leftover · xb d2 — no data-4x-go xb-d2
- [ ] 2015 extra-c leftover — no data-4x-go xc
- [ ] 2015 extra-d leftover — no data-4x-go xd
- [ ] 2015 extra-e leftover — no data-4x-go xe

### Popular 3×
- [x] Instagram — itt15-pop-instagram
- [x] Spotify — itt15-pop-spotify
- [x] Netflix — itt15-pop-netflix

### Links crawled from gold / official 10 / home / about
- [x] 28 URLs resolved

## 2016

### Gold
- [x] sites/instagram/stories.html — complete → itt16-ig-stories

### Official 10
- [x] 1. Instagram Stories — sites/instagram/stories.html
- [x] 2. Pokémon GO — sites/pokemongo/index.html
- [x] 3. Reactions — sites/facebook/reactions.html
- [x] 4. WhatsApp E2E — sites/whatsapp/e2e.html
- [x] 5. iPhone 7 — sites/iphone/index.html
- [x] 6. Vine goodbye — sites/vine/goodbye.html
- [x] 7. Spectacles — sites/snapchat/spectacles.html
- [x] 8. musical.ly — sites/musically/index.html
- [x] 9. Win10 upgrade ends — sites/windows10/end.html
- [x] 10. Gym Rush — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt16-game-storytap
- [x] extra-b.html — minute → itt16-game-gymtap
- [x] extra-c.html — more-game → itt16-game-coilsnake
- [x] extra-d.html — more-game → itt16-game-tankslice
- [x] extra-e.html — more-game started
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt16-game-pokehunt
- [x] extra-h.html — more-game → itt16-game-slide2
- [x] extra-i.html — more-game → itt16-game-reactnote
- [x] famous.html — started
- [x] game-2.html — minute → itt16-game-storyrail
- [x] game-3.html — minute → itt16-game-walkgo
- [x] game-4.html — minute → itt16-game-reactbar
- [x] game-5.html — minute → itt16-game-lipapp
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt16-game-slither
- [x] more-b.html — more-game → itt16-game-spawn

### 2× leftover dests
- [ ] AirPods leftover — no data-4x-go airpods-lx
- [ ] 2016 leftover · airpods lx d2 — no data-4x-go airpods-lx-d2
- [ ] alphago leftover REAL — no data-4x-go alphago-rlx
- [ ] 2016 leftover · alphago rlx d2 — no data-4x-go alphago-rlx-d2
- [ ] Assistant leftover 6× — no data-4x-go as-6x
- [ ] 2016 leftover · as 6x d2 — no data-4x-go as-6x-d2
- [ ] 2016 cabinet leftover — no data-4x-go cab
- [ ] 2016 leftover · cab d2 — no data-4x-go cab-d2
- [ ] Dyn/Mirai leftover literacy (no exploit) — no data-4x-go dyn-lx
- [ ] 2016 leftover · dyn lx d2 — no data-4x-go dyn-lx-d2
- [ ] e2eabout leftover REAL — no data-4x-go e2eabout-rlx
- [ ] 2016 leftover · e2eabout rlx d2 — no data-4x-go e2eabout-rlx-d2
- [ ] 2016 leftover · facebook about — no data-4x-go facebook-about
- [ ] FB Live leftover everyone — no data-4x-go fblive
- [ ] 2016 leftover · fblive d2 — no data-4x-go fblive-d2
- [ ] Gym Rush leftover literacy — no data-4x-go gym
- [ ] 2016 leftover · gym d2 — no data-4x-go gym-d2
- [ ] Houseparty leftover 6× — no data-4x-go hp-6x
- [ ] 2016 leftover · hp 6x d2 — no data-4x-go hp-6x-d2
- [ ] Stories leftover archive note — no data-4x-go ig-arch
- [ ] 2016 leftover · ig arch d2 — no data-4x-go ig-arch-d2
- [ ] Inbox leftover 6× — no data-4x-go in-6x
- [ ] 2016 leftover · in 6x d2 — no data-4x-go in-6x-d2
- [ ] 2016 leftover · instagram about — no data-4x-go instagram-about
- [ ] iPhone 7 leftover no-jack — no data-4x-go iphone7-lx
- [ ] 2016 leftover · iphone7 lx d2 — no data-4x-go iphone7-lx-d2
- [ ] iphone7about leftover REAL — no data-4x-go iphone7abo-rlx
- [ ] 2016 leftover · iphone7abo rlx d2 — no data-4x-go iphone7abo-rlx-d2
- [ ] Jio leftover 6× — no data-4x-go ji-6x
- [ ] 2016 leftover · ji 6x d2 — no data-4x-go ji-6x-d2
- [ ] LinkedIn leftover 6× — no data-4x-go li-6x
- [ ] 2016 leftover · li 6x d2 — no data-4x-go li-6x-d2
- [ ] Musical.ly leftover (not TikTok) — no data-4x-go mly
- [ ] musical.ly leftover second caption — no data-4x-go mly-2
- [ ] 2016 leftover · mly d2 — no data-4x-go mly-d2
- [ ] Moments leftover second album — no data-4x-go mom-2
- [ ] Moments leftover — no data-4x-go moments
- [ ] 2016 leftover · moments d2 — no data-4x-go moments-d2
- [ ] 2016 leftover · musically about — no data-4x-go musically-about
- [ ] 2016 leftover · netflix about — no data-4x-go netflix-about
- [ ] Netflix leftover — no data-4x-go nf
- [ ] Netflix leftover second title — no data-4x-go nf-2
- [ ] 2016 leftover · nf d2 — no data-4x-go nf-d2
- [ ] 2016 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2016 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2016 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2016 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2016 leftover · playable famous — no data-4x-go playable-famous
- [ ] 2016 leftover · playable game 2 — no data-4x-go playable-game-2
- [ ] 2016 leftover · playable game 3 — no data-4x-go playable-game-3
- [ ] 2016 leftover · playable game 4 — no data-4x-go playable-game-4
- [ ] 2016 leftover · playable game 5 — no data-4x-go playable-game-5
- [ ] 2016 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2016 leftover · playable more b — no data-4x-go playable-more-b
- [ ] GO leftover sidewalk note — no data-4x-go pogo-2
- [ ] Pokémon GO leftover team — no data-4x-go pogo-lx
- [ ] 2016 leftover · pogo lx d2 — no data-4x-go pogo-lx-d2
- [ ] pogoabout leftover REAL — no data-4x-go pogoabout-rlx
- [ ] 2016 leftover · pogoabout rlx d2 — no data-4x-go pogoabout-rlx-d2
- [ ] 2016 leftover · pokemongo about — no data-4x-go pokemongo-about
- [ ] Reactions leftover two faces — no data-4x-go react
- [ ] Reactions leftover second face — no data-4x-go react-2
- [ ] 2016 leftover · react d2 — no data-4x-go react-d2
- [ ] reactabout leftover REAL — no data-4x-go reactabout-rlx
- [ ] 2016 leftover · reactabout rlx d2 — no data-4x-go reactabout-rlx-d2
- [ ] Reddit leftover two votes — no data-4x-go reddit
- [ ] 2016 leftover · reddit about — no data-4x-go reddit-about
- [ ] 2016 leftover · reddit d2 — no data-4x-go reddit-d2
- [ ] Slack leftover channel — no data-4x-go slack
- [ ] Slack leftover channel — no data-4x-go slack-2
- [ ] 2016 leftover · slack d2 — no data-4x-go slack-d2
- [ ] Super Mario Run leftover 6× — no data-4x-go sm-6x
- [ ] 2016 leftover · sm 6x d2 — no data-4x-go sm-6x-d2
- [ ] Snapchat leftover 2016 residual — no data-4x-go snap-h
- [ ] Spectacles leftover — no data-4x-go specs
- [ ] spectabout leftover REAL — no data-4x-go spectabout-rlx
- [ ] Stories leftover add (empty blocked) — no data-4x-go story
- [ ] 2016 leftover · story d2 — no data-4x-go story-d2
- [ ] storyabout leftover REAL — no data-4x-go storyabout-rlx
- [ ] superbowl leftover REAL — no data-4x-go superbowl-rlx
- [ ] 2016 leftover · vine about — no data-4x-go vine-about
- [ ] Vine leftover dying — no data-4x-go vine-end-lx
- [ ] Vine leftover loop note — no data-4x-go vine-h
- [ ] Win10 leftover second note — no data-4x-go w10e-2
- [ ] WhatsApp leftover second lock — no data-4x-go wa-2
- [ ] WhatsApp E2E leftover — no data-4x-go wa-e2e-lx
- [ ] 2016 leftover · whatsapp about — no data-4x-go whatsapp-about
- [ ] Win10 free-upgrade ended leftover — no data-4x-go win10-end-lx
- [ ] win10end leftover REAL — no data-4x-go win10end-rlx
- [ ] 2016 extra-a leftover — no data-4x-go xa
- [ ] 2016 leftover · xa d2 — no data-4x-go xa-d2
- [ ] 2016 extra-b leftover — no data-4x-go xb
- [ ] 2016 leftover · xb d2 — no data-4x-go xb-d2
- [ ] 2016 extra-c leftover — no data-4x-go xc
- [ ] 2016 leftover · xc d2 — no data-4x-go xc-d2
- [ ] 2016 extra-d leftover — no data-4x-go xd
- [ ] 2016 leftover · xd d2 — no data-4x-go xd-d2
- [ ] 2016 extra-e leftover — no data-4x-go xe
- [ ] 2016 leftover · xe d2 — no data-4x-go xe-d2
- [ ] 2016 leftover · youtube about — no data-4x-go youtube-about
- [ ] YouTube leftover — no data-4x-go yt
- [ ] YouTube leftover second watch — no data-4x-go yt-2

### Popular 3×
- [x] Reddit — itt16-pop-reddit
- [x] Netflix — itt16-pop-netflix
- [x] YouTube — itt16-pop-youtube

### Links crawled from gold / official 10 / home / about
- [x] 25 URLs resolved

## 2017

### Gold
- [x] sites/iphone/x.html — complete → itt17-faceid

### Official 10
- [x] 1. Face ID / iPhone X — sites/iphone/x.html
- [x] 2. Fortnite BR — sites/fortnite/index.html
- [x] 3. Twitter 280 — sites/twitter/280.html
- [x] 4. Teams GA — sites/teams/index.html
- [x] 5. Vine gone — sites/vine/gone.html
- [x] 6. Nintendo Switch — sites/switch/index.html
- [x] 7. WannaCry — sites/wannacry/index.html
- [x] 8. musical.ly — sites/musically/index.html
- [x] 9. Equifax freeze — sites/equifax/index.html
- [x] 10. Storm Circle — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt17-game-facetap
- [x] extra-b.html — minute → itt17-game-bustap
- [x] extra-c.html — more-game → itt17-game-clipdesk
- [x] extra-d.html — more-game → itt17-game-hintguess
- [x] extra-e.html — more-game → itt17-game-pondtier
- [x] extra-f.html — more-game started
- [x] extra-g.html — more-game → itt17-game-tweet280
- [x] extra-h.html — more-game → itt17-game-look2
- [x] extra-i.html — more-game → itt17-game-clipnote
- [x] famous.html — started
- [x] game-2.html — minute → itt17-game-swipeup
- [x] game-3.html — minute → itt17-game-animojipick
- [x] game-4.html — minute → itt17-game-dropbus
- [x] game-5.html — minute → itt17-game-twoeighty
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt17-game-plane
- [x] more-b.html — more-game → itt17-game-plateau
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] 2017 leftover · amazon about — no data-4x-go amazon-about
- [ ] 2017 leftover · amazon d2 — no data-4x-go amazon-d2
- [ ] Amazon leftover — no data-4x-go amzn
- [ ] Amazon leftover second search — no data-4x-go amzn-2
- [ ] 2017 leftover · amzn d2 — no data-4x-go amzn-d2
- [ ] Animoji leftover (needs Face ID gold) — no data-4x-go animoji-lx
- [ ] 2017 leftover · animoji lx d2 — no data-4x-go animoji-lx-d2
- [ ] AirPods leftover deepen — no data-4x-go ap17-dp
- [ ] 2017 leftover · ap17 dp d2 — no data-4x-go ap17-dp-d2
- [ ] ARKit leftover 6× — no data-4x-go ar-6x
- [ ] 2017 leftover · ar 6x d2 — no data-4x-go ar-6x-d2
- [ ] Bitcoin Cash leftover deepen — no data-4x-go bch-dp
- [ ] 2017 leftover · bch dp d2 — no data-4x-go bch-dp-d2
- [ ] bitmoji leftover REAL — no data-4x-go bitmoji-rlx
- [ ] 2017 leftover · bitmoji rlx d2 — no data-4x-go bitmoji-rlx-d2
- [ ] Bitcoin ATH leftover literacy — no data-4x-go btc
- [ ] Bitcoin leftover second note — no data-4x-go btc-2
- [ ] 2017 leftover · btc d2 — no data-4x-go btc-d2
- [ ] 2017 cabinet leftover — no data-4x-go cab
- [ ] 2017 leftover · cab d2 — no data-4x-go cab-d2
- [ ] Cloudbleed leftover deepen — no data-4x-go cbleed-dp
- [ ] 2017 leftover · cbleed dp d2 — no data-4x-go cbleed-dp-d2
- [ ] Credit freeze leftover deepen — no data-4x-go cfrz-dp
- [ ] 2017 leftover · cfrz dp d2 — no data-4x-go cfrz-dp-d2
- [ ] CME Bitcoin leftover deepen — no data-4x-go cmebtc-dp
- [ ] 2017 leftover · cmebtc dp d2 — no data-4x-go cmebtc-dp-d2
- [ ] Core ML leftover deepen — no data-4x-go coreml-dp
- [ ] 2017 leftover · coreml dp d2 — no data-4x-go coreml-dp-d2
- [ ] Discord leftover deepen — no data-4x-go dc17-dp
- [ ] 2017 leftover · dc17 dp d2 — no data-4x-go dc17-dp-d2
- [ ] Equifax leftover freeze literacy — no data-4x-go eq
- [ ] 2017 leftover · eq d2 — no data-4x-go eq-d2
- [ ] equifaxabout leftover REAL — no data-4x-go equifaxabo-rlx
- [ ] 2017 leftover · equifaxabo rlx d2 — no data-4x-go equifaxabo-rlx-d2
- [ ] faceabout leftover REAL — no data-4x-go faceabout-rlx
- [ ] 2017 leftover · faceabout rlx d2 — no data-4x-go faceabout-rlx-d2
- [ ] Face ID leftover two boxes — no data-4x-go faceid-2x
- [ ] 2017 leftover · faceid 2x d2 — no data-4x-go faceid-2x-d2
- [ ] Famous leftover 2017 — no data-4x-go famous
- [ ] 2017 leftover · famous d2 — no data-4x-go famous-d2
- [ ] Facebook 2 billion leftover deepen — no data-4x-go fb2b-dp
- [ ] 2017 leftover · fb2b dp d2 — no data-4x-go fb2b-dp-d2
- [ ] Flash EOL announce leftover 6× — no data-4x-go fl-6x
- [ ] 2017 leftover · fl 6x d2 — no data-4x-go fl-6x-d2
- [ ] Fortnite leftover drop — no data-4x-go fn
- [ ] Fortnite leftover second drop — no data-4x-go fn-2
- [ ] 2017 leftover · fn d2 — no data-4x-go fn-d2
- [ ] 2017 leftover · fortnite about — no data-4x-go fortnite-about
- [ ] 2017 leftover · fortnite d2 — no data-4x-go fortnite-d2
- [ ] HomePod announce leftover deepen — no data-4x-go hpodann-dp
- [ ] 2017 leftover · hpodann dp d2 — no data-4x-go hpodann-dp-d2
- [ ] hqtrivia leftover REAL — no data-4x-go hqtrivia-rlx
- [ ] 2017 leftover · hqtrivia rlx d2 — no data-4x-go hqtrivia-rlx-d2
- [ ] iOS 11 leftover deepen — no data-4x-go ios11-dp
- [ ] 2017 leftover · ios11 dp d2 — no data-4x-go ios11-dp-d2
- [ ] 2017 leftover · iphone about — no data-4x-go iphone-about
- [ ] 2017 leftover · iphone d2 — no data-4x-go iphone-d2
- [ ] iPhone 8 leftover deepen — no data-4x-go iphone8-dp
- [ ] 2017 leftover · iphone8 dp d2 — no data-4x-go iphone8-dp-d2
- [ ] KRACK leftover 6× — no data-4x-go kr-6x
- [ ] 2017 leftover · kr 6x d2 — no data-4x-go kr-6x-d2
- [ ] Musical.ly leftover — no data-4x-go mly
- [ ] musical.ly leftover second caption — no data-4x-go mly-2
- [ ] 2017 leftover · mly d2 — no data-4x-go mly-d2
- [ ] musically17 leftover REAL — no data-4x-go musically1-rlx
- [ ] 2017 leftover · musically1 rlx d2 — no data-4x-go musically1-rlx-d2
- [ ] Title II repeal leftover 6× — no data-4x-go nn-6x
- [ ] 2017 leftover · nn 6x d2 — no data-4x-go nn-6x-d2
- [ ] notpetya leftover REAL — no data-4x-go notpetya-rlx
- [ ] 2017 leftover · notpetya rlx d2 — no data-4x-go notpetya-rlx-d2
- [ ] Odyssey leftover deepen — no data-4x-go odyssey-dp
- [ ] 2017 leftover · odyssey dp d2 — no data-4x-go odyssey-dp-d2
- [ ] Android Oreo leftover deepen — no data-4x-go oreo-dp
- [ ] 2017 leftover · oreo dp d2 — no data-4x-go oreo-dp-d2
- [ ] Apple Park leftover deepen — no data-4x-go park-dp
- [ ] 2017 leftover · park dp d2 — no data-4x-go park-dp-d2
- [ ] Pixelbook leftover deepen — no data-4x-go pbook-dp
- [ ] 2017 leftover · pbook dp d2 — no data-4x-go pbook-dp-d2
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d10
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d11
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d2
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d3
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d4
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d5
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d6
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d7
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d8
- [ ] 2017 leftover · playable d2 — no data-4x-go playable-d9
- [ ] 2017 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2017 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2017 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2017 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2017 leftover · playable game 2 — no data-4x-go playable-game-2
- [ ] 2017 leftover · playable game 3 — no data-4x-go playable-game-3
- [ ] 2017 leftover · playable game 4 — no data-4x-go playable-game-4
- [ ] 2017 leftover · playable game 5 — no data-4x-go playable-game-5
- [ ] 2017 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2017 leftover · playable more b — no data-4x-go playable-more-b
- [ ] pubgnote leftover REAL — no data-4x-go pubgnote-rlx
- [ ] 2017 leftover · pubgnote rlx d2 — no data-4x-go pubgnote-rlx-d2
- [ ] Pixel 2 leftover 6× — no data-4x-go px-6x
- [ ] 2017 leftover · px 6x d2 — no data-4x-go px-6x-d2
- [ ] Reddit leftover two — no data-4x-go reddit
- [ ] Reddit leftover second row — no data-4x-go reddit-2
- [ ] 2017 leftover · reddit about — no data-4x-go reddit-about
- [ ] 2017 leftover · reddit d2 — no data-4x-go reddit-d2
- [ ] 2017 leftover · reddit d2 — no data-4x-go reddit-d3
- [ ] Echo Show leftover — no data-4x-go show
- [ ] Echo Show leftover second note — no data-4x-go show-2
- [ ] 2017 leftover · show d2 — no data-4x-go show-d2
- [ ] Signal leftover deepen — no data-4x-go sig17-dp
- [ ] 2017 leftover · sig17 dp d2 — no data-4x-go sig17-dp-d2
- [ ] Slack leftover deepen — no data-4x-go slack17-dp
- [ ] 2017 leftover · slack17 dp d2 — no data-4x-go slack17-dp-d2
- [ ] Snap IPO leftover second note — no data-4x-go snap-2
- [ ] Snap IPO leftover — no data-4x-go snapipo
- [ ] 2017 leftover · snapipo d2 — no data-4x-go snapipo-d2
- [ ] Storm Circle leftover literacy — no data-4x-go storm
- [ ] 2017 leftover · storm d2 — no data-4x-go storm-d2
- [ ] Save the World leftover deepen — no data-4x-go stw-dp
- [ ] 2017 leftover · stw dp d2 — no data-4x-go stw-dp-d2
- [ ] Switch leftover second reserve — no data-4x-go sw-2
- [ ] 2017 leftover · switch about — no data-4x-go switch-about
- [ ] 2017 leftover · switch d2 — no data-4x-go switch-d2
- [ ] Switch leftover buy — no data-4x-go switch-lx
- [ ] 2017 leftover · switch lx d2 — no data-4x-go switch-lx-d2
- [ ] Twitter leftover must exceed 140 — no data-4x-go t280
- [ ] Twitter leftover second 280 — no data-4x-go t280-2
- [ ] 2017 leftover · t280 d2 — no data-4x-go t280-d2
- [ ] t280about leftover REAL — no data-4x-go t280about-rlx
- [ ] 2017 leftover · t280about rlx d2 — no data-4x-go t280about-rlx-d2
- [ ] Teams leftover second name — no data-4x-go teams-2
- [ ] 2017 leftover · teams about — no data-4x-go teams-about
- [ ] 2017 leftover · teams d2 — no data-4x-go teams-d2
- [ ] Teams leftover create — no data-4x-go teams-lx
- [ ] 2017 leftover · teams lx d2 — no data-4x-go teams-lx-d2
- [ ] Telegram leftover deepen — no data-4x-go tg17-dp
- [ ] 2017 leftover · tg17 dp d2 — no data-4x-go tg17-dp-d2
- [ ] 2017 leftover · twitter about — no data-4x-go twitter-about
- [ ] 2017 leftover · twitter d2 — no data-4x-go twitter-d2
- [ ] Vault 7 leftover deepen — no data-4x-go vault7-dp
- [ ] 2017 leftover · vault7 dp d2 — no data-4x-go vault7-dp-d2
- [ ] Vine leftover actually gone — no data-4x-go vine-gone-lx
- [ ] 2017 leftover · vine gone lx d2 — no data-4x-go vine-gone-lx-d2
- [ ] wannaabout leftover REAL — no data-4x-go wannaabout-rlx
- [ ] 2017 leftover · wannaabout rlx d2 — no data-4x-go wannaabout-rlx-d2
- [ ] 2017 leftover · wannacry about — no data-4x-go wannacry-about
- [ ] 2017 leftover · wannacry d2 — no data-4x-go wannacry-d2
- [ ] 2017 leftover · watch3 d2 — no data-4x-go watch3-d2
- [ ] Watch Series 3 leftover deepen — no data-4x-go watch3-dp
- [ ] WannaCry leftover literacy (no payload) — no data-4x-go wc
- [ ] WannaCry leftover second literacy — no data-4x-go wc-2
- [ ] 2017 extra-a leftover — no data-4x-go xa
- [ ] 2017 leftover · xa d2 — no data-4x-go xa-d2
- [ ] 2017 extra-b leftover — no data-4x-go xb
- [ ] 2017 leftover · xb d2 — no data-4x-go xb-d2
- [ ] 2017 leftover · xboxonex d2 — no data-4x-go xboxonex-d2
- [ ] 2017 extra-c leftover — no data-4x-go xc
- [ ] 2017 leftover · xc d2 — no data-4x-go xc-d2
- [ ] 2017 extra-d leftover — no data-4x-go xd
- [ ] 2017 leftover · xd d2 — no data-4x-go xd-d2
- [ ] 2017 extra-e leftover — no data-4x-go xe
- [ ] 2017 leftover · xe d2 — no data-4x-go xe-d2
- [ ] Xbox One X leftover deepen — no data-4x-go xonex-dp
- [ ] 2017 leftover · yahoo3b d2 — no data-4x-go yahoo3b-d2
- [ ] Yahoo 3 billion leftover deepen — no data-4x-go yahoo3b-dp
- [ ] 2017 leftover · youtube about — no data-4x-go youtube-about
- [ ] 2017 leftover · youtube d2 — no data-4x-go youtube-d2
- [ ] 2017 leftover · youtubetv d2 — no data-4x-go youtubetv-d2
- [ ] YouTube leftover — no data-4x-go yt
- [ ] YouTube leftover second watch — no data-4x-go yt-2
- [ ] YouTube TV leftover 6× — no data-4x-go ytv-6x
- [ ] 2017 leftover · zoom17 d2 — no data-4x-go zoom17-d2
- [ ] Zoom leftover deepen — no data-4x-go zoom17-dp

### Popular 3×
- [x] Reddit — itt17-pop-reddit
- [x] YouTube — itt17-pop-youtube
- [x] Amazon — itt17-pop-amazon

### Links crawled from gold / official 10 / home / about
- [x] 28 URLs resolved

## 2018

### Gold
- [x] sites/gdpr/index.html — complete → itt18-gdpr

### Official 10
- [x] 1. GDPR Manage — sites/gdpr/index.html
- [x] 2. TikTok For You — sites/tiktok/fyp.html
- [x] 3. Hearing — sites/trust/index.html
- [x] 4. IGTV — sites/instagram/igtv.html
- [x] 5. Chrome 68 — sites/chrome/not-secure.html
- [x] 6. HomePod — sites/homepod/index.html
- [x] 7. Spectre — sites/spectre/index.html
- [x] 8. Fortnite on Switch — sites/fortnite/switch.html
- [x] 9. GitHub $7.5B — sites/github/microsoft.html
- [x] 10. Consent Dash — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt18-game-managetap
- [x] extra-b.html — minute → itt18-game-fyptap
- [x] extra-c.html — more-game → itt18-game-range15
- [x] extra-d.html — more-game started
- [x] extra-e.html — more-game → itt18-game-bannerfight
- [x] extra-f.html — more-game → itt18-game-manage2
- [x] extra-g.html — more-game → itt18-game-fypnote
- [x] extra-h.html — more-game → itt18-game-banner2
- [x] extra-i.html — more-game → itt18-game-hearingnote
- [x] famous.html — started
- [x] game-2.html — minute → itt18-game-cookiebar
- [x] game-3.html — minute → itt18-game-fypforu
- [x] game-4.html — minute → itt18-game-notlock
- [x] game-5.html — minute → itt18-game-igtvrow
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt18-game-dashclimb
- [x] more-b.html — more-game → itt18-game-votetick
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] Apple Music leftover — no data-4x-go am
- [ ] Apple Music leftover second trial — no data-4x-go am-2
- [ ] 2018 leftover · am d2 — no data-4x-go am-d2
- [ ] Bitcoin leftover 2018 deepen — no data-4x-go btc18-dp
- [ ] 2018 leftover · btc18 dp d2 — no data-4x-go btc18-dp-d2
- [ ] 2018 cabinet leftover — no data-4x-go cab
- [ ] 2018 leftover · cab d2 — no data-4x-go cab-d2
- [ ] cambridge leftover REAL — no data-4x-go cambridge-rlx
- [ ] 2018 leftover · cambridge rlx d2 — no data-4x-go cambridge-rlx-d2
- [ ] Craigslist personals leftover 6× — no data-4x-go cl-6x
- [ ] 2018 leftover · cl 6x d2 — no data-4x-go cl-6x-d2
- [ ] Consent Dash leftover (Manage wins) — no data-4x-go consent
- [ ] 2018 leftover · consent d2 — no data-4x-go consent-d2
- [ ] Discord leftover — no data-4x-go dc
- [ ] Discord leftover second join — no data-4x-go dc-2
- [ ] 2018 leftover · dc d2 — no data-4x-go dc-d2
- [ ] 2018 leftover · discord about — no data-4x-go discord-about
- [ ] 2018 leftover · discord d2 — no data-4x-go discord-d2
- [ ] 1.1.1.1 leftover deepen — no data-4x-go dns-dp
- [ ] 2018 leftover · dns dp d2 — no data-4x-go dns-dp-d2
- [ ] Duplex leftover deepen — no data-4x-go duplex-dp
- [ ] 2018 leftover · duplex dp d2 — no data-4x-go duplex-dp-d2
- [ ] Epic Games Store leftover deepen — no data-4x-go egs-dp
- [ ] 2018 leftover · egs dp d2 — no data-4x-go egs-dp-d2
- [ ] Famous leftover 2018 — no data-4x-go famous
- [ ] 2018 leftover · famous d2 — no data-4x-go famous-d2
- [ ] Fortnite iOS leftover 6× — no data-4x-go fi-6x
- [ ] 2018 leftover · fi 6x d2 — no data-4x-go fi-6x-d2
- [ ] Fortnite Creative leftover — no data-4x-go fn-cr
- [ ] 2018 leftover · fn cr d2 — no data-4x-go fn-cr-d2
- [ ] Fortnite Switch leftover drop — no data-4x-go fn-sw
- [ ] 2018 leftover · fn sw d2 — no data-4x-go fn-sw-d2
- [ ] fnswitch leftover REAL — no data-4x-go fnswitch-rlx
- [ ] 2018 leftover · fnswitch rlx d2 — no data-4x-go fnswitch-rlx-d2
- [ ] TikTok leftover two FYP taps — no data-4x-go fyp
- [ ] fypabout leftover REAL — no data-4x-go fypabout-rlx
- [ ] 2018 leftover · fypabout rlx d2 — no data-4x-go fypabout-rlx-d2
- [ ] GDPR Manage leftover two ticks — no data-4x-go gdpr-2x
- [ ] 2018 leftover · gdpr 2x d2 — no data-4x-go gdpr-2x-d2
- [ ] 2018 leftover · gdpr about — no data-4x-go gdpr-about
- [ ] 2018 leftover · gdpr d2 — no data-4x-go gdpr-d2
- [ ] GDPR leftover door (Accept All never here) — no data-4x-go gdpr-door
- [ ] 2018 leftover · gdpr door d2 — no data-4x-go gdpr-door-d2
- [ ] gdpra leftover REAL — no data-4x-go gdpra-rlx
- [ ] 2018 leftover · gdpra rlx d2 — no data-4x-go gdpra-rlx-d2
- [ ] Group FaceTime leftover deepen — no data-4x-go gft-dp
- [ ] 2018 leftover · gft dp d2 — no data-4x-go gft-dp-d2
- [ ] GitHub leftover issue note — no data-4x-go gh-h
- [ ] 2018 leftover · gh h d2 — no data-4x-go gh-h-d2
- [ ] Microsoft♥GitHub leftover — no data-4x-go gh-ms
- [ ] 2018 leftover · gh ms d2 — no data-4x-go gh-ms-d2
- [ ] 2018 leftover · github about — no data-4x-go github-about
- [ ] 2018 leftover · github d2 — no data-4x-go github-d2
- [ ] githubms leftover REAL — no data-4x-go githubms-rlx
- [ ] 2018 leftover · githubms rlx d2 — no data-4x-go githubms-rlx-d2
- [ ] God of War leftover deepen — no data-4x-go gow-dp
- [ ] 2018 leftover · gow dp d2 — no data-4x-go gow-dp-d2
- [ ] Google+ sunset leftover 6× — no data-4x-go gp-6x
- [ ] 2018 leftover · gp 6x d2 — no data-4x-go gp-6x-d2
- [ ] Hearing leftover sit — no data-4x-go hear
- [ ] Hearing leftover second note — no data-4x-go hear-2
- [ ] 2018 leftover · homepod about — no data-4x-go homepod-about
- [ ] 2018 leftover · homepod d2 — no data-4x-go homepod-d2
- [ ] homepodabout leftover REAL — no data-4x-go homepodabo-rlx
- [ ] 2018 leftover · homepodabo rlx d2 — no data-4x-go homepodabo-rlx-d2
- [ ] HomePod leftover reserve — no data-4x-go hp
- [ ] HomePod leftover second reserve — no data-4x-go hp-2
- [ ] 2018 leftover · hp d2 — no data-4x-go hp-d2
- [ ] IGTV leftover second title — no data-4x-go igtv-2
- [ ] IGTV leftover post (not Reels) — no data-4x-go igtv-lx
- [ ] 2018 leftover · igtv lx d2 — no data-4x-go igtv-lx-d2
- [ ] igtvabout leftover REAL — no data-4x-go igtvabout-rlx
- [ ] 2018 leftover · igtvabout rlx d2 — no data-4x-go igtvabout-rlx-d2
- [ ] iTunes movie leftover 6× — no data-4x-go im-6x
- [ ] 2018 leftover · im 6x d2 — no data-4x-go im-6x-d2
- [ ] 2018 leftover · instagram about — no data-4x-go instagram-about
- [ ] 2018 leftover · instagram d2 — no data-4x-go instagram-d2
- [ ] iOS 12 leftover deepen — no data-4x-go ios12-dp
- [ ] 2018 leftover · ios12 dp d2 — no data-4x-go ios12-dp-d2
- [ ] Labo leftover deepen — no data-4x-go labo-dp
- [ ] 2018 leftover · labo dp d2 — no data-4x-go labo-dp-d2
- [ ] Mastodon leftover 6× — no data-4x-go ma-6x
- [ ] 2018 leftover · ma 6x d2 — no data-4x-go ma-6x-d2
- [ ] Memoji leftover deepen — no data-4x-go memoji-dp
- [ ] 2018 leftover · memoji dp d2 — no data-4x-go memoji-dp-d2
- [ ] Mojave leftover deepen — no data-4x-go mojave-dp
- [ ] 2018 leftover · mojave dp d2 — no data-4x-go mojave-dp-d2
- [ ] notsecure leftover REAL — no data-4x-go notsecure-rlx
- [ ] 2018 leftover · notsecure rlx d2 — no data-4x-go notsecure-rlx-d2
- [ ] Chrome 68 leftover Not Secure — no data-4x-go ns
- [ ] Chrome leftover second URL — no data-4x-go ns-2
- [ ] 2018 leftover · ns d2 — no data-4x-go ns-d2
- [ ] Oculus Go leftover deepen — no data-4x-go ogo-dp
- [ ] 2018 leftover · ogo dp d2 — no data-4x-go ogo-dp-d2
- [ ] Android Pie leftover deepen — no data-4x-go pie-dp
- [ ] 2018 leftover · pie dp d2 — no data-4x-go pie-dp-d2
- [ ] Pixel 3 leftover deepen — no data-4x-go pixel3-dp
- [ ] 2018 leftover · pixel3 dp d2 — no data-4x-go pixel3-dp-d2
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d10
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d11
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d2
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d3
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d4
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d5
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d6
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d7
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d8
- [ ] 2018 leftover · playable d2 — no data-4x-go playable-d9
- [ ] 2018 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2018 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2018 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2018 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2018 leftover · playable game 2 — no data-4x-go playable-game-2
- [ ] 2018 leftover · playable game 3 — no data-4x-go playable-game-3
- [ ] 2018 leftover · playable game 4 — no data-4x-go playable-game-4
- [ ] 2018 leftover · playable game 5 — no data-4x-go playable-game-5
- [ ] 2018 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2018 leftover · playable more b — no data-4x-go playable-more-b
- [ ] Portal leftover deepen — no data-4x-go portal-dp
- [ ] 2018 leftover · portal dp d2 — no data-4x-go portal-dp-d2
- [ ] Red Dead 2 leftover deepen — no data-4x-go rdr2-dp
- [ ] 2018 leftover · rdr2 dp d2 — no data-4x-go rdr2-dp-d2
- [ ] Reddit leftover two — no data-4x-go reddit
- [ ] Reddit leftover second row — no data-4x-go reddit-2
- [ ] 2018 leftover · reddit about — no data-4x-go reddit-about
- [ ] 2018 leftover · reddit d2 — no data-4x-go reddit-d2
- [ ] 2018 leftover · reddit d2 — no data-4x-go reddit-d3
- [ ] Slack leftover deepen — no data-4x-go slack18-dp
- [ ] 2018 leftover · slack18 dp d2 — no data-4x-go slack18-dp-d2
- [ ] Smash leftover deepen — no data-4x-go smash-dp
- [ ] 2018 leftover · smash dp d2 — no data-4x-go smash-dp-d2
- [ ] Spectre leftover literacy — no data-4x-go sp
- [ ] Spectre leftover second literacy — no data-4x-go sp-2
- [ ] 2018 leftover · sp d2 — no data-4x-go sp-d2
- [ ] 2018 leftover · spectre18 d2 — no data-4x-go spectre18-d2
- [ ] spectre18 leftover REAL — no data-4x-go spectre18-rlx
- [ ] Screen Time leftover 6× — no data-4x-go st-6x
- [ ] 2018 leftover · st 6x d2 — no data-4x-go st-6x-d2
- [ ] 2018 leftover · tiktok about — no data-4x-go tiktok-about
- [ ] 2018 leftover · tiktok d2 — no data-4x-go tiktok-d2
- [ ] 2018 leftover · tiktok d2 — no data-4x-go tiktok-d3
- [ ] 2018 leftover · tiktok d2 — no data-4x-go tiktok-d4
- [ ] TikTok leftover home note — no data-4x-go tt-h
- [ ] Tumblr leftover ban deepen — no data-4x-go tumblr18-dp
- [ ] 2018 leftover · tumblrban d2 — no data-4x-go tumblrban-d2
- [ ] 2018 leftover · watch4 d2 — no data-4x-go watch4-d2
- [ ] Watch Series 4 leftover deepen — no data-4x-go watch4-dp
- [ ] Wikipedia leftover — no data-4x-go wiki
- [ ] Wikipedia leftover second article — no data-4x-go wiki-2
- [ ] 2018 leftover · wikipedia about — no data-4x-go wikipedia-about
- [ ] 2018 leftover · wikipedia d2 — no data-4x-go wikipedia-d2
- [ ] 2018 extra-a leftover — no data-4x-go xa
- [ ] 2018 leftover · xa d2 — no data-4x-go xa-d2
- [ ] 2018 extra-b leftover — no data-4x-go xb
- [ ] 2018 leftover · xb d2 — no data-4x-go xb-d2
- [ ] 2018 extra-c leftover — no data-4x-go xc
- [ ] 2018 leftover · xc d2 — no data-4x-go xc-d2
- [ ] 2018 extra-d leftover — no data-4x-go xd
- [ ] 2018 leftover · xd d2 — no data-4x-go xd-d2
- [ ] 2018 extra-e leftover — no data-4x-go xe
- [ ] 2018 leftover · xe d2 — no data-4x-go xe-d2
- [ ] iPhone XR leftover deepen — no data-4x-go xr-dp
- [ ] 2018 leftover · xr dp d2 — no data-4x-go xr-dp-d2
- [ ] iPhone XS leftover deepen — no data-4x-go xs-dp
- [ ] 2018 leftover · xs dp d2 — no data-4x-go xs-dp-d2
- [ ] 2018 leftover · youtube about — no data-4x-go youtube-about
- [ ] 2018 leftover · youtube d2 — no data-4x-go youtube-d2
- [ ] YouTube leftover — no data-4x-go yt
- [ ] YouTube leftover second watch — no data-4x-go yt-2
- [ ] 2018 leftover · zoom18 d2 — no data-4x-go zoom18-d2
- [ ] Zoom leftover deepen — no data-4x-go zoom18-dp

### Popular 3×
- [x] Reddit — itt18-pop-reddit
- [x] YouTube — itt18-pop-youtube
- [x] Wikipedia — itt18-pop-wikipedia

### Links crawled from gold / official 10 / home / about
- [x] 31 URLs resolved

## 2019

### Gold
- [x] sites/disneyplus/home.html — complete → itt19-disneyplus

### Official 10
- [x] 1. Disney+ Who’s watching — sites/disneyplus/home.html
- [x] 2. TikTok For You — sites/tiktok/index.html
- [x] 3. Apple Arcade — sites/arcade/index.html
- [x] 4. Apple TV+ — sites/appletv/index.html
- [x] 5. Stadia — sites/stadia/index.html
- [x] 6. iPhone 11 — sites/iphone/iphone11.html
- [x] 7. AirPods Pro — sites/airpodspro/index.html
- [x] 8. Chrome habit — sites/chrome/index.html
- [x] 9. Windows 10 residual — sites/windows10/index.html
- [x] 10. Continue Row — sites/playable/game.html

### Games
- [x] extra-a.html — minute → itt19-game-whoswatch
- [x] extra-b.html — minute → itt19-game-trialtrap
- [x] extra-c.html — more-game → itt19-game-rowextra
- [x] extra-d.html — more-game started
- [x] extra-e.html — more-game → itt19-game-arcadecard
- [x] extra-f.html — more-game → itt19-game-continue2
- [x] extra-g.html — more-game → itt19-game-stadnote
- [x] extra-h.html — more-game → itt19-game-face2
- [x] extra-i.html — more-game → itt19-game-arcnote
- [x] famous.html — started
- [x] game.html — started
- [x] index.html — cabinet
- [x] more-a.html — more-game → itt19-game-squaddrop
- [x] more-b.html — more-game → itt19-game-honk
- [x] more-c.html — started
- [x] more-d.html — started

### 2× leftover dests
- [ ] iPhone 11 leftover second note — no data-4x-go 11-2
- [ ] iPhone 11 leftover — no data-4x-go 11-lx
- [ ] 2019 leftover · 11 lx d2 — no data-4x-go 11-lx-d2
- [ ] Apple Card leftover deepen — no data-4x-go acard-dp
- [ ] 2019 leftover · acard dp d2 — no data-4x-go acard-dp-d2
- [ ] airpodsabout leftover REAL — no data-4x-go airpodsabo-rlx
- [ ] 2019 leftover · airpodsabo rlx d2 — no data-4x-go airpodsabo-rlx-d2
- [ ] 2019 leftover · airpodspro about — no data-4x-go airpodspro-about
- [ ] 2019 leftover · airpodspro d2 — no data-4x-go airpodspro-d2
- [ ] Allo leftover deepen — no data-4x-go allo-dp
- [ ] 2019 leftover · allo dp d2 — no data-4x-go allo-dp-d2
- [ ] Apex leftover deepen — no data-4x-go apex-dp
- [ ] 2019 leftover · apex dp d2 — no data-4x-go apex-dp-d2
- [ ] AirPods Pro leftover second note — no data-4x-go app-2
- [ ] AirPods Pro leftover — no data-4x-go app-lx
- [ ] 2019 leftover · app lx d2 — no data-4x-go app-lx-d2
- [ ] 2019 leftover · appletv about — no data-4x-go appletv-about
- [ ] 2019 leftover · appletv d2 — no data-4x-go appletv-d2
- [ ] Arcade leftover second title — no data-4x-go arcade-2
- [ ] 2019 leftover · arcade about — no data-4x-go arcade-about
- [ ] 2019 leftover · arcade d2 — no data-4x-go arcade-d2
- [ ] Arcade leftover pick — no data-4x-go arcade-lx
- [ ] 2019 leftover · arcade lx d2 — no data-4x-go arcade-lx-d2
- [ ] arcadeabout leftover REAL — no data-4x-go arcadeabou-rlx
- [ ] 2019 leftover · arcadeabou rlx d2 — no data-4x-go arcadeabou-rlx-d2
- [ ] Article 17 leftover deepen — no data-4x-go art17-dp
- [ ] 2019 leftover · art17 dp d2 — no data-4x-go art17-dp-d2
- [ ] 2019 cabinet leftover second — no data-4x-go cab-2
- [ ] Playable cabinet leftover — no data-4x-go cab-lx
- [ ] 2019 leftover · cab lx d2 — no data-4x-go cab-lx-d2
- [ ] Catalina leftover deepen — no data-4x-go cata-dp
- [ ] 2019 leftover · cata dp d2 — no data-4x-go cata-dp-d2
- [ ] Chrome leftover second URL — no data-4x-go ch-2
- [ ] Chrome leftover habit URL — no data-4x-go ch-lx
- [ ] 2019 leftover · ch lx d2 — no data-4x-go ch-lx-d2
- [ ] chrome19 leftover REAL — no data-4x-go chrome19-rlx
- [ ] 2019 leftover · chrome19 rlx d2 — no data-4x-go chrome19-rlx-d2
- [ ] CNIL leftover 6× — no data-4x-go cn-6x
- [ ] 2019 leftover · cn 6x d2 — no data-4x-go cn-6x-d2
- [ ] 2019 leftover · disneyplus d2 — no data-4x-go disneypl-d2
- [ ] 2019 leftover · disneyplus — no data-4x-go disneyplus-d2
- [ ] 2019 leftover · disneyplus lx — no data-4x-go disneyplus-lx
- [ ] iOS 13 Dark Mode leftover 6× — no data-4x-go dk-6x
- [ ] 2019 leftover · dk 6x d2 — no data-4x-go dk-6x-d2
- [ ] Disney+ leftover about note — no data-4x-go dplus-ab
- [ ] 2019 leftover · dplus ab d2 — no data-4x-go dplus-ab-d2
- [ ] Disney+ leftover door note — no data-4x-go dplus-ix
- [ ] 2019 leftover · dplus ix d2 — no data-4x-go dplus-ix-d2
- [ ] dplusabout leftover REAL — no data-4x-go dplusabout-rlx
- [ ] 2019 leftover · dplusabout rlx d2 — no data-4x-go dplusabout-rlx-d2
- [ ] Edge leftover second note — no data-4x-go edge-2
- [ ] Edge Chromium leftover preview — no data-4x-go edge-lx
- [ ] 2019 leftover · edge lx d2 — no data-4x-go edge-lx-d2
- [ ] Famous leftover 2019 second — no data-4x-go fam-2
- [ ] Famous leftover 2019 — no data-4x-go famous-lx
- [ ] 2019 leftover · famous lx d2 — no data-4x-go famous-lx-d2
- [ ] Find My leftover deepen — no data-4x-go findmy-dp
- [ ] 2019 leftover · findmy dp d2 — no data-4x-go findmy-dp-d2
- [ ] 5G leftover deepen — no data-4x-go fiveg-dp
- [ ] 2019 leftover · fiveg dp d2 — no data-4x-go fiveg-dp-d2
- [ ] fn19 leftover REAL — no data-4x-go fn19-rlx
- [ ] 2019 leftover · fn19 rlx d2 — no data-4x-go fn19-rlx-d2
- [ ] Chapter 2 leftover deepen — no data-4x-go fnch2-dp
- [ ] 2019 leftover · fnch2 dp d2 — no data-4x-go fnch2-dp-d2
- [ ] World Cup leftover deepen — no data-4x-go fnwc-dp
- [ ] 2019 leftover · fnwc dp d2 — no data-4x-go fnwc-dp-d2
- [ ] Galaxy Fold leftover deepen — no data-4x-go fold-dp
- [ ] 2019 leftover · fold dp d2 — no data-4x-go fold-dp-d2
- [ ] FTC Facebook leftover 6× — no data-4x-go ft-6x
- [ ] 2019 leftover · ft 6x d2 — no data-4x-go ft-6x-d2
- [ ] Continue Row leftover year game — no data-4x-go game-lx
- [ ] 2019 leftover · game lx d2 — no data-4x-go game-lx-d2
- [ ] Game Pass leftover deepen — no data-4x-go gpass-dp
- [ ] 2019 leftover · gpass dp d2 — no data-4x-go gpass-dp-d2
- [ ] Google+ leftover end deepen — no data-4x-go gplus19-dp
- [ ] 2019 leftover · gplus19 dp d2 — no data-4x-go gplus19-dp-d2
- [ ] Huawei leftover deepen — no data-4x-go huawei-dp
- [ ] 2019 leftover · huawei dp d2 — no data-4x-go huawei-dp-d2
- [ ] Inbox sunset leftover 6× — no data-4x-go ib-6x
- [ ] 2019 leftover · ib 6x d2 — no data-4x-go ib-6x-d2
- [ ] Instagram leftover second hide-likes — no data-4x-go ig-2
- [ ] Instagram leftover 2019 residual — no data-4x-go ig-fn
- [ ] Instagram leftover hide-likes — no data-4x-go ig-lx
- [ ] 2019 leftover · ig lx d2 — no data-4x-go ig-lx-d2
- [ ] 2019 leftover · instagram about — no data-4x-go instagram-about
- [ ] 2019 leftover · instagram d2 — no data-4x-go instagram-d2
- [ ] iPadOS leftover 6× — no data-4x-go ip-6x
- [ ] 2019 leftover · ip 6x d2 — no data-4x-go ip-6x-d2
- [ ] iTunes leftover end deepen — no data-4x-go itunes-dp
- [ ] 2019 leftover · itunes dp d2 — no data-4x-go itunes-dp-d2
- [ ] Libra leftover 6× — no data-4x-go lb-6x
- [ ] 2019 leftover · lb 6x d2 — no data-4x-go lb-6x-d2
- [ ] Lyft IPO leftover deepen — no data-4x-go lyft-dp
- [ ] 2019 leftover · lyft dp d2 — no data-4x-go lyft-dp-d2
- [ ] Fortnite leftover concert note — no data-4x-go marsh
- [ ] 2019 leftover · marsh d2 — no data-4x-go marsh-d2
- [ ] marshnote leftover REAL — no data-4x-go marshnote-rlx
- [ ] 2019 leftover · marshnote rlx d2 — no data-4x-go marshnote-rlx-d2
- [ ] Mixer leftover deepen — no data-4x-go mixer-dp
- [ ] 2019 leftover · mixer dp d2 — no data-4x-go mixer-dp-d2
- [ ] News+ leftover deepen — no data-4x-go news-dp
- [ ] 2019 leftover · news dp d2 — no data-4x-go news-dp-d2
- [ ] Pixel 4 leftover deepen — no data-4x-go pixel4-dp
- [ ] 2019 leftover · pixel4 dp d2 — no data-4x-go pixel4-dp-d2
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d10
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d2
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d3
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d4
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d5
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d6
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d7
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d8
- [ ] 2019 leftover · playable d2 — no data-4x-go playable-d9
- [ ] 2019 leftover · playable extra c — no data-4x-go playable-extra-c
- [ ] 2019 leftover · playable extra d — no data-4x-go playable-extra-d
- [ ] 2019 leftover · playable extra e — no data-4x-go playable-extra-e
- [ ] 2019 leftover · playable extra f — no data-4x-go playable-extra-f
- [ ] 2019 leftover · playable extra g — no data-4x-go playable-extra-g
- [ ] 2019 leftover · playable extra h — no data-4x-go playable-extra-h
- [ ] 2019 leftover · playable extra i — no data-4x-go playable-extra-i
- [ ] 2019 leftover · playable more a — no data-4x-go playable-more-a
- [ ] 2019 leftover · playable more b — no data-4x-go playable-more-b
- [ ] Oculus Quest leftover — May 2019 — no data-4x-go quest-lx
- [ ] 2019 leftover · quest d2 — no data-4x-go quest-lx-d2
- [ ] Sidecar leftover deepen — no data-4x-go sidecar-dp
- [ ] 2019 leftover · sidecar dp d2 — no data-4x-go sidecar-dp-d2
- [ ] Sign in with Apple leftover deepen — no data-4x-go siwa-dp
- [ ] 2019 leftover · siwa dp d2 — no data-4x-go siwa-dp-d2
- [ ] Slack listing leftover deepen — no data-4x-go slipo-dp
- [ ] 2019 leftover · slipo dp d2 — no data-4x-go slipo-dp-d2
- [ ] Stadia leftover second note — no data-4x-go stadia-2
- [ ] 2019 leftover · stadia about — no data-4x-go stadia-about
- [ ] 2019 leftover · stadia d2 — no data-4x-go stadia-d2
- [ ] Stadia leftover Founders — no data-4x-go stadia-lx
- [ ] 2019 leftover · stadia lx d2 — no data-4x-go stadia-lx-d2
- [ ] stadiaabout leftover REAL — no data-4x-go stadiaabou-rlx
- [ ] 2019 leftover · stadiaabou rlx d2 — no data-4x-go stadiaabou-rlx-d2
- [ ] SwiftUI leftover deepen — no data-4x-go swiftui-dp
- [ ] 2019 leftover · swiftui dp d2 — no data-4x-go swiftui-dp-d2
- [ ] 2019 leftover · tiktok about — no data-4x-go tiktok-about
- [ ] 2019 leftover · tiktok d2 — no data-4x-go tiktok-d2
- [ ] TikTok leftover second sound — no data-4x-go tt-2
- [ ] TikTok leftover FYP (not the chip) — no data-4x-go tt-lx
- [ ] 2019 leftover · tt lx d2 — no data-4x-go tt-lx-d2
- [ ] tt19 leftover REAL — no data-4x-go tt19-rlx
- [ ] 2019 leftover · tt19 rlx d2 — no data-4x-go tt19-rlx-d2
- [ ] Apple TV+ leftover second title — no data-4x-go tv-2
- [ ] Apple TV+ leftover title — no data-4x-go tv-lx
- [ ] 2019 leftover · tv lx d2 — no data-4x-go tv-lx-d2
- [ ] Uber IPO leftover deepen — no data-4x-go uber-dp
- [ ] 2019 leftover · uber dp d2 — no data-4x-go uber-dp-d2
- [ ] Win10 leftover second residual — no data-4x-go w10-2
- [ ] Win10 leftover residual — no data-4x-go w10-lx
- [ ] 2019 leftover · w10 lx d2 — no data-4x-go w10-lx-d2
- [ ] Watch Series 5 leftover deepen — no data-4x-go watch5-dp
- [ ] 2019 leftover · watch5 dp d2 — no data-4x-go watch5-dp-d2
- [ ] WeWork leftover deepen — no data-4x-go wework-dp
- [ ] 2019 leftover · wework dp d2 — no data-4x-go wework-dp-d2
- [ ] Wikipedia leftover second article — no data-4x-go wiki-2
- [ ] Wikipedia leftover article — no data-4x-go wiki-lx
- [ ] 2019 leftover · wiki lx d2 — no data-4x-go wiki-lx-d2
- [ ] 2019 leftover · wikipedia about — no data-4x-go wikipedia-about
- [ ] 2019 leftover · wikipedia d2 — no data-4x-go wikipedia-d2
- [ ] win10n leftover REAL — no data-4x-go win10n-rlx
- [ ] 2019 leftover · win10n rlx d2 — no data-4x-go win10n-rlx-d2
- [ ] 2019 extra-a leftover second — no data-4x-go xa-2
- [ ] 2019 extra-a leftover — no data-4x-go xa-lx
- [ ] 2019 leftover · xa lx d2 — no data-4x-go xa-lx-d2
- [ ] 2019 extra-b leftover — no data-4x-go xb-lx
- [ ] 2019 leftover · xb lx d2 — no data-4x-go xb-lx-d2
- [ ] xCloud leftover deepen — no data-4x-go xcloud-dp
- [ ] 2019 leftover · xcloud dp d2 — no data-4x-go xcloud-dp-d2
- [ ] 2019 leftover · youtube about — no data-4x-go youtube-about
- [ ] 2019 leftover · youtube d2 — no data-4x-go youtube-d2
- [ ] YouTube leftover second watch — no data-4x-go yt-2
- [ ] YouTube leftover watch — no data-4x-go yt-lx
- [ ] 2019 leftover · ytcoppa d2 — no data-4x-go ytcoppa-d2
- [ ] YouTube COPPA leftover deepen — no data-4x-go ytcoppa-dp
- [ ] 2019 leftover · zoom19 d2 — no data-4x-go zoom19-d2
- [ ] Zoom leftover deepen — no data-4x-go zoom19-dp

### Popular 3×
- [x] YouTube — itt19-pop-youtube
- [x] Instagram — itt19-pop-instagram
- [x] Wikipedia — itt19-pop-wikipedia

### Links crawled from gold / official 10 / home / about
- [x] 33 URLs resolved

## 2021

### Gold
- [x] sites/att/index.html — complete → itt21-att

### Official 10
- [x] 1. ATT Ask — sites/att/index.html
- [x] 2. Signal leftover — sites/signal/index.html
- [x] 3. Copilot waitlist — sites/copilot/index.html
- [x] 4. Meta rename — sites/meta/index.html
- [x] 5. Windows 11 leftover — sites/windows11/index.html
- [x] 6. Flash brick — sites/flash/index.html
- [x] 7. Chrome habit — sites/chrome/index.html
- [x] 8. Windows 10 residual — sites/windows10/index.html
- [x] 9. Facebook leftover — sites/facebook/index.html
- [x] 10. Five Letter — sites/playable/game.html

### Games
- [x] extra-a.html — lean leftover page
- [x] extra-b.html — lean leftover page
- [x] extra-c.html — lean leftover page
- [x] extra-d.html — lean leftover page
- [x] extra-e.html — lean leftover page
- [x] extra-f.html — lean leftover page
- [x] extra-g.html — lean leftover page
- [x] extra-h.html — lean leftover page
- [x] extra-i.html — lean leftover page
- [x] famous.html — lean leftover page
- [x] game.html — host ok
- [x] index.html — cabinet
- [x] more-a.html — lean leftover page
- [x] more-b.html — lean leftover page
- [x] more-c.html — lean leftover page
- [x] more-d.html — lean leftover page
- [x] more.html — lean leftover page

### 2× leftover dests
- [ ] 2021 leftover · YouTube Shorts leftover — no data-4x-go shorts-dp
- [ ] 2021 leftover · AirTag leftover — no data-4x-go airtag-dp
- [ ] 2021 leftover · Coinbase listing leftover — no data-4x-go coin-dp
- [ ] 2021 leftover · Beeple Everydays leftover — no data-4x-go beeple-dp
- [ ] 2021 leftover · BAYC leftover — no data-4x-go bayc-dp
- [ ] 2021 leftover · Log4j patch leftover — no data-4x-go log4j-dp
- [ ] 2021 leftover · WhatsApp policy leftover — no data-4x-go wa21-dp
- [ ] 2021 leftover · Telegram surge leftover — no data-4x-go tg21-dp
- [ ] 2021 leftover · iOS 15 Focus leftover — no data-4x-go ios15-dp
- [ ] 2021 leftover · Mail Privacy leftover — no data-4x-go mailpp-dp
- [ ] 2021 leftover · iCloud Private Relay leftover — no data-4x-go relay-dp
- [ ] 2021 leftover · Hide My Email leftover — no data-4x-go hidemail-dp
- [ ] 2021 leftover · Twitter Spaces leftover — no data-4x-go spaces-dp
- [ ] 2021 leftover · Super Follows leftover — no data-4x-go superfol-dp
- [ ] 2021 leftover · Facebook outage leftover — no data-4x-go fbout-dp
- [ ] 2021 leftover · Haugen leftover — no data-4x-go haugen-dp
- [ ] 2021 leftover · DALL·E 1 leftover — no data-4x-go dalle1-dp
- [ ] 2021 leftover · OpenAI Codex leftover — no data-4x-go codex-dp
- [ ] 2021 leftover · Windows 365 leftover — no data-4x-go win365-dp
- [ ] 2021 leftover · Android 12 leftover — no data-4x-go and12-dp
- [ ] 2021 leftover · Pixel 6 leftover — no data-4x-go pixel6-dp
- [ ] 2021 leftover · TikTok-as-2021 leftover — no data-4x-go tt21-dp
- [ ] 2021 leftover · Snap Spotlight leftover — no data-4x-go spotlight-dp
- [ ] 2021 leftover · Discord Stage leftover — no data-4x-go dstage-dp
- [ ] 2021 leftover · Substack leftover — no data-4x-go substack-dp
- [ ] 2021 leftover · Notion 2021 leftover — no data-4x-go notion21-dp
- [ ] 2021 leftover · FigJam leftover — no data-4x-go figjam-dp
- [ ] 2021 leftover · Roblox listing leftover — no data-4x-go rbxipo-dp
- [ ] 2021 leftover · Affirm leftover — no data-4x-go affirm-dp
- [ ] 2021 leftover · Paramount+ leftover — no data-4x-go paramount-dp
- [ ] 2021 leftover · Disney+ Day leftover — no data-4x-go dplus21-dp
- [ ] 2021 leftover · NBA Top Shot leftover — no data-4x-go topshot-dp
- [ ] 2021 leftover · Clubhouse leftover — no data-4x-go club-dp
- [ ] 2021 leftover · GME leftover — no data-4x-go gme-dp
- [ ] 2021 leftover · Epic v Apple leftover — no data-4x-go epic-dp
- [ ] 2021 leftover · Robinhood leftover — no data-4x-go hood-dp
- [ ] 2021 leftover · OpenSea leftover — no data-4x-go opensea-dp
- [ ] 2021 leftover · Wordle seed leftover — no data-4x-go wordle-dp
- [ ] 2021 leftover · Copilot second path leftover — no data-4x-go cop-lx
- [ ] 2021 leftover · ATT literacy leftover — no data-4x-go att-lx
- [ ] 2021 leftover · Signal second path leftover — no data-4x-go sig-lx
- [ ] 2021 leftover · Meta app stays Facebook leftover — no data-4x-go meta-lx
- [ ] 2021 leftover · Win11 not January leftover — no data-4x-go win11-lx
- [ ] 2021 leftover · Flash Play trap leftover — no data-4x-go flash-lx
- [ ] 2021 leftover · Chrome habit second path — no data-4x-go chrome-lx
- [ ] 2021 leftover · YouTube leftover 3× — no data-4x-go pop-youtube
- [ ] 2021 leftover · Wikipedia leftover 3× — no data-4x-go pop-wiki
- [ ] 2021 leftover · Facebook leftover 3× — no data-4x-go pop-fb3
- [ ] 2021 leftover · Clubhouse 3×3 leftover — no data-4x-go pop3-club
- [ ] 2021 leftover · NFT literacy 3×3 — no data-4x-go pop3-nft
- [ ] 2021 leftover · Squid Game print leftover — no data-4x-go pop3-squid
- [ ] 2021 leftover · musical.ly leftover — no data-4x-go mly-lx
- [ ] 2021 leftover · Equifax leftover — no data-4x-go eq-lx
- [ ] 2021 leftover · AirPods leftover — no data-4x-go pods-lx
- [ ] 2021 leftover · Discord leftover — no data-4x-go disc-lx
- [ ] 2021 leftover · Echo Show leftover — no data-4x-go echo-lx
- [ ] 2021 leftover · Pixel leftover 2 — no data-4x-go pix-lx
- [ ] 2021 leftover · Telegram leftover 2 — no data-4x-go tg-lx
- [ ] 2021 leftover · Watch leftover — no data-4x-go watch-lx
- [ ] 2021 leftover · Xbox leftover — no data-4x-go xbox-lx
- [ ] 2021 leftover · Yahoo 3B leftover — no data-4x-go y3b-lx
- [ ] 2021 leftover · Zoom leftover note — no data-4x-go zoom-lx
- [ ] 2021 leftover · Teams leftover — no data-4x-go teams-lx
- [ ] 2021 leftover · Slack leftover — no data-4x-go slack-lx
- [ ] 2021 leftover · Bitcoin leftover — no data-4x-go btc-lx
- [ ] 2021 leftover · NFT mint-trap dest — no data-4x-go nft-lx
- [ ] 2021 leftover · Spaces second path leftover — no data-4x-go spc-lx
- [ ] 2021 leftover · Super Follows second leftover — no data-4x-go sf-lx
- [ ] 2021 leftover · iCloud leftover — no data-4x-go icloud-lx
- [ ] 2021 leftover · FaceTime leftover — no data-4x-go ft-lx
- [ ] 2021 leftover · iMessage leftover — no data-4x-go imsg-lx
- [ ] 2021 leftover · Win11 pop-more leftover — no data-4x-go w11-more
- [ ] 2021 leftover · YouTube leftover watch — no data-4x-go yt-lx
- [ ] 2021 leftover · Wikipedia leftover edit — no data-4x-go wk-lx
- [ ] 2021 leftover · Amazon leftover — no data-4x-go amzn-lx
- [ ] 2021 leftover · Reddit leftover — no data-4x-go reddit-lx
- [ ] 2021 leftover · Netflix leftover — no data-4x-go nfx-lx
- [ ] 2021 leftover · Spotify leftover — no data-4x-go spot-lx
- [ ] 2021 leftover · Instagram leftover — no data-4x-go ig-lx
- [ ] 2021 leftover · Twitter leftover — no data-4x-go tw-lx
- [ ] 2021 leftover · TikTok leftover 2 — no data-4x-go tt-lx
- [ ] 2021 leftover · Google leftover — no data-4x-go g-lx
- [ ] 2021 leftover · Gmail leftover — no data-4x-go gm-lx
- [ ] 2021 leftover · Maps leftover — no data-4x-go maps-lx
- [ ] 2021 leftover · PayPal leftover — no data-4x-go pp-lx
- [ ] 2021 leftover · Slack leftover 2 — no data-4x-go sl-lx
- [ ] 2021 leftover · Discord leftover 2 — no data-4x-go dc-lx
- [ ] 2021 leftover · Zoom leftover 2 — no data-4x-go zm-lx
- [ ] 2021 leftover · Teams leftover 2 — no data-4x-go tm-lx
- [ ] 2021 leftover · Notion leftover 2 — no data-4x-go no-lx
- [ ] 2021 leftover · Figma leftover — no data-4x-go fg-lx
- [ ] 2021 leftover · GitHub leftover — no data-4x-go gh-lx
- [ ] 2021 leftover · LinkedIn leftover — no data-4x-go li-lx
- [ ] 2021 leftover · Twitch leftover — no data-4x-go twitch-lx
- [ ] 2021 leftover · Steam leftover — no data-4x-go steam-lx
- [ ] 2021 leftover · Epic leftover 2 — no data-4x-go egs-lx
- [ ] 2021 leftover · PlayStation leftover — no data-4x-go ps-lx
- [ ] 2021 leftover · Xbox leftover 2 — no data-4x-go xb-lx
- [ ] 2021 leftover · Nintendo leftover — no data-4x-go nin-lx
- [ ] 2021 leftover · Fortnite leftover — no data-4x-go fn-lx
- [ ] 2021 leftover · Among Us leftover — no data-4x-go au-lx
- [ ] 2021 leftover · Roblox leftover play — no data-4x-go rbx-lx
- [ ] 2021 leftover · Substack leftover 2 — no data-4x-go ss-lx
- [ ] 2021 leftover · Patreon leftover — no data-4x-go pat-lx
- [ ] 2021 leftover · Twitch bits leftover — no data-4x-go bits-lx
- [ ] 2021 leftover · Kindle leftover — no data-4x-go kindle-lx
- [ ] 2021 leftover · iCloud leftover 2 — no data-4x-go ic2-lx
- [ ] 2021 leftover · Edge leftover — no data-4x-go edge-lx
- [ ] 2021 leftover · Safari leftover — no data-4x-go saf-lx
- [ ] 2021 leftover · Firefox leftover — no data-4x-go ff-lx
- [ ] 2021 leftover · Brave leftover — no data-4x-go brave-lx
- [ ] 2021 leftover · Continuity close leftover — no data-4x-go cont-lx
- [ ] 2021 leftover · Signal leftover — no data-4x-go signal
- [ ] 2021 leftover · Copilot waitlist — no data-4x-go copilot
- [ ] 2021 leftover · Meta rename — no data-4x-go meta
- [ ] 2021 leftover · Win11 leftover — no data-4x-go win11
- [ ] 2021 leftover · Flash brick — no data-4x-go flash-brick
- [ ] 2021 leftover · Chrome habit — no data-4x-go chrome
- [ ] 2021 leftover · Win10 residual — no data-4x-go win10
- [ ] 2021 leftover · Facebook leftover — no data-4x-go pop-facebook

### Popular 3×
- [ ] YouTube — no data-pop-go
- [ ] Wikipedia — no data-pop-go
- [ ] Facebook — no data-pop-go

### Links crawled from gold / official 10 / home / about
- [x] 15 URLs resolved

## 2022

### Gold
- [x] sites/chatgpt/index.html — complete → itt22-chatgpt

### Official 10
- [x] 1. ChatGPT Send — sites/chatgpt/index.html
- [x] 2. Twitter leftover — sites/twitter/index.html
- [x] 3. Wordle leftover — sites/wordle/index.html
- [x] 4. Stable Diffusion — sites/stablediffusion/index.html
- [x] 5. Mastodon leftover — sites/mastodon/index.html
- [x] 6. BeReal leftover — sites/bereal/index.html
- [x] 7. DALL·E 2 leftover — sites/dalle2/index.html
- [x] 8. Chrome habit — sites/chrome/index.html
- [x] 9. Windows 10 residual — sites/windows10/index.html
- [x] 10. Prompt Box — sites/playable/game.html

### Games
- [x] close.html — lean leftover page
- [x] famous.html — lean leftover page
- [x] game.html — host ok
- [x] index.html — cabinet
- [x] more-c.html — lean leftover page
- [x] more-d.html — lean leftover page
- [x] more.html — lean leftover page

### 2× leftover dests

### Popular 3×
- [ ] YouTube — no data-pop-go
- [ ] Wikipedia — no data-pop-go
- [ ] Facebook — no data-pop-go

### Links crawled from gold / official 10 / home / about
- [x] 15 URLs resolved

