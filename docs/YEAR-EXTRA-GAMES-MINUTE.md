# Year extra games — minute visitor steps

Two leftover extras per shipped year (1994–2018). Not the year star.
Engine: `js/games/year-extra-minute.js`. Pages: `years/YYYY/sites/playable/extra-a.html` / `extra-b.html`.

Rules:

- Start first. Empty Finish never writes.
- Traps / decoys / Accept All / live tiles / exploits never write.
- Finish after every year-true step writes `ittYY-game-<id>` with `real: true` and `multiStep: true`.
- Honesty on every page: leftover extra · museum original · incomplete never writes.

## 1994

### Mosaic inline GIF (`mosaicgif`)

- Kind: `buffer`
- Key: `itt94-game-mosaicgif`
- Dest: [NCSA Mosaic](../ncsa/index.html)
- Goal: Buffer every incoming GIF scanline before the 14.4k drops. Skip the modem die.
- Visitor:
  1. Start. Status should say Transferring…
  2. Click each GIF scanline as it lands (header, palette, scan 1–3).
  3. Do not click “14.4k dropped” — that is rot and never writes.
  4. Type mosaic in the confirm box.
  5. Finish writes itt94-game-mosaicgif. Incomplete never writes.

### Yahoo catalog hop (`yahoocat`)

- Kind: `seq`
- Key: `itt94-game-yahoocat`
- Dest: [Yahoo! 1994](../yahoo/index.html)
- Goal: Open the 1994 Yahoo directory in order: Arts → Computers → Entertainment. Type computers.
- Visitor:
  1. Start.
  2. Open Arts, then Computers, then Entertainment — in that order.
  3. Do not open the broken CGI row.
  4. Type computers.
  5. Finish writes itt94-game-yahoocat.

## 1995

### GeoCities sign-in (`geosign`)

- Kind: `form`
- Key: `itt95-game-geosign`
- Dest: [GeoCities](../geocities/index.html)
- Goal: Claim a SiliconValley homestead. Neighborhood, street address, guestbook hello.
- Visitor:
  1. Start.
  2. Neighborhood: siliconvalley
  3. Address: 1234
  4. Guestbook: hello
  5. Click Sign guestbook, then Finish. Writes itt95-game-geosign.

### AltaVista hit (`altahit`)

- Kind: `search`
- Key: `itt95-game-altahit`
- Dest: [AltaVista](../altavista/index.html)
- Goal: Type mosaic. Click the real DEC AltaVista hit. Banner and counter are decoys.
- Visitor:
  1. Start.
  2. Type mosaic in the query box.
  3. Click Search.
  4. Click the real AltaVista hit — not the banner, not the visitor counter.
  5. Finish writes itt95-game-altahit.

## 1996

### HoTMaiL send (`mailsend`)

- Kind: `form`
- Key: `itt96-game-mailsend`
- Dest: [HoTMaiL](../hotmail/index.html)
- Goal: Address a web-mail note: friend@hotmail.com / hello / inbox. Send from the browser.
- Visitor:
  1. Start.
  2. To: friend@hotmail.com
  3. Subject: hello
  4. Body: inbox
  5. Click Send, then Finish. Writes itt96-game-mailsend.

### Space Jam hoop (`jamshot`)

- Kind: `burst`
- Key: `itt96-game-jamshot`
- Dest: [Space Jam](../spacejam/index.html)
- Goal: Hit the three court hoops on the hub. Skip the banner ad.
- Visitor:
  1. Start.
  2. Click Center, Left wing, Right wing.
  3. Do not click the banner ad.
  4. Finish writes itt96-game-jamshot.

## 1997

### eBay raise (`ebayraise`)

- Kind: `seq`
- Key: `itt97-game-ebayraise`
- Dest: [eBay 1997](../ebay/index.html)
- Goal: View the listing, raise once, raise twice, confirm the bid. No real money.
- Visitor:
  1. Start.
  2. View item → Raise $1 → Raise $2 → Confirm bid, in order.
  3. Type bid.
  4. Finish writes itt97-game-ebayraise. No live auction.

### ICQ ping (`icqping`)

- Kind: `seq`
- Key: `itt97-game-icqping`
- Dest: [ICQ](../icq/index.html)
- Goal: Enter the UIN, see them online, send the message. The number was the identity.
- Visitor:
  1. Start.
  2. Enter UIN → Online → Send message, in order.
  3. Type uin.
  4. Finish writes itt97-game-icqping.

## 1998

### Lucky jump (`luckygo`)

- Kind: `search`
- Key: `itt98-game-luckygo`
- Dest: [Google Lucky](../google/lucky.html)
- Goal: Type yahoo. Hit I’m Feeling Lucky. The ten blue links and the banner are decoys.
- Visitor:
  1. Start.
  2. Type yahoo.
  3. Click I’m Feeling Lucky.
  4. Click the Lucky destination — not the ten-link list, not the banner.
  5. Finish writes itt98-game-luckygo.

### Mozilla milestone (`mozmile`)

- Kind: `seq`
- Key: `itt98-game-mozmile`
- Dest: [mozilla.org](../mozilla/index.html)
- Goal: Open M3 layout, M4 mail, M5 Chatzilla. The lizard was the other browser war.
- Visitor:
  1. Start.
  2. M3 layout → M4 mail → M5 Chatzilla, in order.
  3. Type mozilla.
  4. Finish writes itt98-game-mozmile.

## 1999

### Napster search (`napsearch`)

- Kind: `search`
- Key: `itt99-game-napsearch`
- Dest: [Napster](../napster/index.html)
- Goal: Type mp3. Click the real 192kbps row. The .exe and the empty folder are decoys. No real share.
- Visitor:
  1. Start.
  2. Type mp3. Click Search.
  3. Click the 192kbps row. Skip the .exe and the empty folder.
  4. Finish writes itt99-game-napsearch. No real share.

### AIM away (`aimaway`)

- Kind: `form`
- Key: `itt99-game-aimaway`
- Dest: [AIM](../aim/index.html)
- Goal: Set the buddy, the away word, and the reason. Idle was a status sport.
- Visitor:
  1. Start.
  2. Buddy: aolpal
  3. Away: away
  4. Reason: at school
  5. Click Set away, then Finish. Writes itt99-game-aimaway.

## 2000

### MapQuest print (`mqdrive`)

- Kind: `wizard`
- Key: `itt00-game-mqdrive`
- Dest: [MapQuest](../mapquest/index.html)
- Goal: From → To → Get directions → Print. You printed the web to drive.
- Visitor:
  1. Start.
  2. Next through From, To, Get directions, Print.
  3. Finish writes itt00-game-mqdrive. No live map.

### Pets.com sock (`petsock`)

- Kind: `pick`
- Key: `itt00-game-petsock`
- Dest: [Pets.com](../pets/index.html)
- Goal: Pick sock, kibble, and bowl. The IPO flyer is rot. Residual only.
- Visitor:
  1. Start.
  2. Pick sock, kibble, bowl.
  3. Skip the IPO flyer.
  4. Finish writes itt00-game-petsock.

## 2001

### Wiki preview (`wikiprev`)

- Kind: `form`
- Key: `itt01-game-wikiprev`
- Dest: [Wikipedia](../wikipedia/index.html)
- Goal: Article internet, edit cite needed, preview edit. Anyone can edit — preview first.
- Visitor:
  1. Start.
  2. Article: internet
  3. Edit: cite needed
  4. Preview box: edit
  5. Click Preview, then Finish. Writes itt01-game-wikiprev.

### iPod click wheel (`ipodclick`)

- Kind: `seq`
- Key: `itt01-game-ipodclick`
- Dest: [iPod](../apple/ipod.html)
- Goal: Menu → Music → Playlists → Play. 1,000 songs. The wheel was the toy.
- Visitor:
  1. Start.
  2. Menu → Music → Playlists → Play, in order.
  3. Type wheel.
  4. Finish writes itt01-game-ipodclick.

## 2002

### Stumble twice (`stumble2`)

- Kind: `pick`
- Key: `itt02-game-stumble2`
- Dest: [StumbleUpon](../stumbleupon/index.html)
- Goal: Stumble two good pages. The pop-up is rot. The next button was the feed.
- Visitor:
  1. Start.
  2. Stumble the two good pages.
  3. Skip the pop-up.
  4. Finish writes itt02-game-stumble2.

### KaZaA find (`kazaafind`)

- Kind: `search`
- Key: `itt02-game-kazaafind`
- Dest: [KaZaA](../kazaa/index.html)
- Goal: Type mp3. Click the song. The .exe is a decoy. P2P after Napster. No real share.
- Visitor:
  1. Start.
  2. Type mp3. Click Find.
  3. Click the song row. Skip the .exe.
  4. Finish writes itt02-game-kazaafind.

## 2003

### Top 8 swap (`top8swap`)

- Kind: `seq`
- Key: `itt03-game-top8swap`
- Dest: [MySpace](../myspace/index.html)
- Goal: Pick slot 3, pick slot 7, confirm the swap. Friendship was a ranked list.
- Visitor:
  1. Start.
  2. Slot 3 → Slot 7 → Confirm swap, in order.
  3. Type top8.
  4. Finish writes itt03-game-top8swap.

### 99¢ tap (`itunestap`)

- Kind: `seq`
- Key: `itt03-game-itunestap`
- Dest: [iTunes Store](../itunes/index.html)
- Goal: Browse the store, tap the 99¢ track, buy (theater). A song cost a dollar.
- Visitor:
  1. Start.
  2. Browse → 99¢ track → Buy (theater), in order.
  3. Type 99.
  4. Finish writes itt03-game-itunestap.

## 2004

### thefacebook poke (`thepoke`)

- Kind: `seq`
- Key: `itt04-game-thepoke`
- Dest: [thefacebook](../facebook/index.html)
- Goal: Join the Harvard network, find a name, poke. Poke was the first verb.
- Visitor:
  1. Start.
  2. Harvard network → Find name → Poke, in order.
  3. Type poke.
  4. Finish writes itt04-game-thepoke.

### Flickr fave (`flickrfave`)

- Kind: `pick`
- Key: `itt04-game-flickrfave`
- Dest: [Flickr](../flickr/index.html)
- Goal: Fave three stills. The stock banner is rot. The star was the social photo.
- Visitor:
  1. Start.
  2. Fave the three stills.
  3. Skip the stock banner.
  4. Finish writes itt04-game-flickrfave.

## 2005

### YouTube surge (`ytsurge`)

- Kind: `burst`
- Key: `itt05-game-ytsurge`
- Dest: [YouTube](../youtube/index.html)
- Goal: Hit play on three tiny clips. The pre-roll ad is rot. Me at the zoo was enough.
- Visitor:
  1. Start.
  2. Play the three clips.
  3. Skip the pre-roll.
  4. Finish writes itt05-game-ytsurge.

### Maps drag (`mapdrag`)

- Kind: `seq`
- Key: `itt05-game-mapdrag`
- Dest: [Google Maps](../maps/index.html)
- Goal: Grab a tile, drag, zoom. The map moved. That was new. No live tiles.
- Visitor:
  1. Start.
  2. Grab tile → Drag → Zoom, in order.
  3. Type maps.
  4. Finish writes itt05-game-mapdrag.

## 2006

### 140 type (`t140type`)

- Kind: `form`
- Key: `itt06-game-t140type`
- Dest: [Twitter](../twitter/index.html)
- Goal: Type twttr in the 140 box. The box was the game.
- Visitor:
  1. Start.
  2. Tweet box: twttr
  3. Click Update, then Finish. Writes itt06-game-t140type.

### Digg up (`diggup`)

- Kind: `pick`
- Key: `itt06-game-diggup`
- Dest: [Digg](../digg/index.html)
- Goal: Digg three stories. The sponsored row is rot. The front page was voted.
- Visitor:
  1. Start.
  2. Digg the three stories.
  3. Skip the sponsored row.
  4. Finish writes itt06-game-diggup.

## 2007

### Safari URL (`safurl`)

- Kind: `search`
- Key: `itt07-game-safurl`
- Dest: [iPhone Safari](../iphone/index.html)
- Goal: Type safari. Go. The phone was a browser. No store yet.
- Visitor:
  1. Start.
  2. Type safari. Click Go.
  3. Click the Safari page — not the App Store (that is 2008).
  4. Finish writes itt07-game-safurl.

### Street View grab (`svgrab`)

- Kind: `seq`
- Key: `itt07-game-svgrab`
- Dest: [Street View](../maps/streetview.html)
- Goal: Grab pegman, drop on the street, grab the view. The street became a panorama. Theater.
- Visitor:
  1. Start.
  2. Grab pegman → Drop street → Grab view, in order.
  3. Type street.
  4. Finish writes itt07-game-svgrab.

## 2008

### App Store get (`storeget`)

- Kind: `seq`
- Key: `itt08-game-storeget`
- Dest: [App Store](../appstore/index.html)
- Goal: Search the ~500, pick one, Get. The shelf opened. Theater.
- Visitor:
  1. Start.
  2. Search shelf → Pick one of ~500 → Get, in order.
  3. Type get.
  4. Finish writes itt08-game-storeget.

### Chrome box (`chromebox`)

- Kind: `search`
- Key: `itt08-game-chromebox`
- Dest: [Chrome](../chrome/index.html)
- Goal: Type chrome. The box was the URL and the search.
- Visitor:
  1. Start.
  2. Type chrome. Click the omnibox go.
  3. Click the Chrome hit — not the IE download.
  4. Finish writes itt08-game-chromebox.

## 2009

### Like burst (`likeburst`)

- Kind: `burst`
- Key: `itt09-game-likeburst`
- Dest: [Facebook Like](../facebook/feed.html)
- Goal: Like four feed stories. The ad Like is rot. The thumb left the feed.
- Visitor:
  1. Start.
  2. Like the four stories.
  3. Skip the ad Like.
  4. Finish writes itt09-game-likeburst.

### Farm wilt (`farmwilt`)

- Kind: `seq`
- Key: `itt09-game-farmwilt`
- Dest: [FarmVille](../farmville/index.html)
- Goal: Water plot A, water plot B, harvest. The timer was the loop.
- Visitor:
  1. Start.
  2. Water A → Water B → Harvest, in order.
  3. Type wilt.
  4. Finish writes itt09-game-farmwilt.

## 2010

### Open Graph burst (`ogburst`)

- Kind: `burst`
- Key: `itt10-game-ogburst`
- Dest: [Open Graph](../facebook/index.html)
- Goal: Like three objects off Facebook. Like left the site.
- Visitor:
  1. Start.
  2. Like the three off-site objects.
  3. Skip the fake counter.
  4. Finish writes itt10-game-ogburst.

### iPad tilt (`ipadtilt`)

- Kind: `seq`
- Key: `itt10-game-ipadtilt`
- Dest: [iPad](../ipad/index.html)
- Goal: Landscape, swipe a page, tilt back. The website, bigger. No camera.
- Visitor:
  1. Start.
  2. Landscape → Swipe page → Tilt back, in order.
  3. Type ipad.
  4. Finish writes itt10-game-ipadtilt.

## 2011

### Circles add (`circladd`)

- Kind: `pick`
- Key: `itt11-game-circladd`
- Dest: [Google+](../googleplus/index.html)
- Goal: Add three people to a circle. “Add everyone” is the overshare trap.
- Visitor:
  1. Start.
  2. Add the three people.
  3. Do not add everyone.
  4. Finish writes itt11-game-circladd.

### Spotify US play (`spotplay`)

- Kind: `seq`
- Key: `itt11-game-spotplay`
- Dest: [Spotify US](../spotify/index.html)
- Goal: Enter the invite, search a track, play. The US invite landed. Theater.
- Visitor:
  1. Start.
  2. Invite → Search track → Play, in order.
  3. Type invite.
  4. Finish writes itt11-game-spotplay.

## 2012

### Android share (`andshare`)

- Kind: `seq`
- Key: `itt12-game-andshare`
- Dest: [IG Android](../instagram/android.html)
- Goal: Open the still, open the share sheet, pick Instagram. The filter left iOS.
- Visitor:
  1. Start.
  2. Open still → Share sheet → Instagram, in order.
  3. Type android.
  4. Finish writes itt12-game-andshare.

### IPO pin (`ipopin`)

- Kind: `pick`
- Key: `itt12-game-ipopin`
- Dest: [Facebook IPO](../facebook/ipo.html)
- Goal: Pin $38, the lockup note, and the ticker. The rumor blog is rot.
- Visitor:
  1. Start.
  2. Pin $38, lockup, ticker.
  3. Skip the rumor blog.
  4. Finish writes itt12-game-ipopin.

## 2013

### Vine hold (`vinhold`)

- Kind: `hold`
- Key: `itt13-game-vinhold`
- Dest: [Vine 6s](../vine/record.html)
- Goal: Hold the record button for the 6-second beat. Six seconds was the unit.
- Visitor:
  1. Start.
  2. Hold Record for the full beat (short in ?fast=1).
  3. Letting go early does not write.
  4. Finish writes itt13-game-vinhold.

### Story 24h (`snap24`)

- Kind: `wizard`
- Key: `itt13-game-snap24`
- Dest: [Snap Stories](../snapchat/story.html)
- Goal: Snap → add to Story → 24h. Stories lasted a day.
- Visitor:
  1. Start.
  2. Next through Snap, Add to Story, 24h.
  3. Finish writes itt13-game-snap24.

## 2014

### WA install tap (`wainstall2`)

- Kind: `seq`
- Key: `itt14-game-wainstall2`
- Dest: [WhatsApp](../whatsapp/index.html)
- Goal: Get the app, allow contacts, open a chat. The deal was the weather. Install is leftover.
- Visitor:
  1. Start.
  2. Get app → Allow contacts → Open chat, in order.
  3. Type install.
  4. Finish writes itt14-game-wainstall2.

### Heartbleed rotate (`bleedack`)

- Kind: `seq`
- Key: `itt14-game-bleedack`
- Dest: [Heartbleed](../heartbleed/index.html)
- Goal: See the CVE, rotate the password, confirm. Change the password. Do not run the bug.
- Visitor:
  1. Start.
  2. See CVE → Rotate password → Confirm, in order.
  3. Type rotate.
  4. Finish writes itt14-game-bleedack. No exploit.

## 2015

### Periscope tap (`peritap`)

- Kind: `seq`
- Key: `itt15-game-peritap`
- Dest: [Periscope](../periscope/index.html)
- Goal: Title the live, go live, stop. The phone goes live. Star stays Go LIVE on the product page.
- Visitor:
  1. Start.
  2. Title → Go LIVE → Stop, in order.
  3. Type live.
  4. Finish writes itt15-game-peritap.

### Photos locker (`lockertap`)

- Kind: `seq`
- Key: `itt15-game-lockertap`
- Dest: [Google Photos](../googlephotos/index.html)
- Goal: Pick a still, lock it, confirm. The roll left the device.
- Visitor:
  1. Start.
  2. Pick still → Lock → Confirm, in order.
  3. Type locker.
  4. Finish writes itt15-game-lockertap.

## 2016

### Story tap (`storytap`)

- Kind: `seq`
- Key: `itt16-game-storytap`
- Dest: [Instagram Stories](../instagram/stories.html)
- Goal: Open camera, add a 24h slide, share. Star stays Stories on the product page.
- Visitor:
  1. Start.
  2. Camera → Add slide → Share 24h, in order.
  3. Type story.
  4. Finish writes itt16-game-storytap.

### Gym tap (`gymtap`)

- Kind: `burst`
- Key: `itt16-game-gymtap`
- Dest: [Pokémon GO leftover](../pokemongo/index.html)
- Goal: Walk three leftover gyms. The lure shop is rot. Sidewalks filled. Stories is still the star.
- Visitor:
  1. Start.
  2. Walk the three gyms.
  3. Skip the lure shop.
  4. Finish writes itt16-game-gymtap.

## 2017

### Face tap (`facetap`)

- Kind: `seq`
- Key: `itt17-game-facetap`
- Dest: [Face ID](../iphone/x.html)
- Goal: Raise the phone, scan, unlock. The face is the password. Star stays Face ID.
- Visitor:
  1. Start.
  2. Raise phone → Scan → Unlock, in order.
  3. Type face.
  4. Finish writes itt17-game-facetap.

### Battle-bus tap (`bustap`)

- Kind: `seq`
- Key: `itt17-game-bustap`
- Dest: [Fortnite leftover](../fortnite/index.html)
- Goal: Board the bus, jump, land. Saturday living rooms. Face ID is still the star.
- Visitor:
  1. Start.
  2. Board → Jump → Land, in order.
  3. Type bus.
  4. Finish writes itt17-game-bustap.

## 2018

### Manage tap (`managetap`)

- Kind: `seq`
- Key: `itt18-game-managetap`
- Dest: [GDPR Manage](../gdpr/index.html)
- Goal: See the banner, open Manage, reject extras. Accept All never writes.
- Visitor:
  1. Start.
  2. See banner → Manage → Reject extras, in order.
  3. Type manage.
  4. Do not Accept All.
  5. Finish writes itt18-game-managetap.

### FYP tap (`fyptap`)

- Kind: `seq`
- Key: `itt18-game-fyptap`
- Dest: [TikTok leftover](../tiktok/fyp.html)
- Goal: Swipe one, swipe two, linger. The loops changed their name. Not the chip.
- Visitor:
  1. Start.
  2. Swipe 1 → Swipe 2 → Linger, in order.
  3. Type fyp.
  4. Finish writes itt18-game-fyptap.
