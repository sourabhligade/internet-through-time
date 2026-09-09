/**
 * Museum atlas — visitor floor plan of every playable year and flow.
 * Paths are from repo root. Atlas page prefixes ../ when needed.
 * 2007 / 2009 / 2011 / 2013–2020 lean doors live. Hallway ends at 2020. Do not invent rooms.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var OPEN = [
    "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"
  ];

  ITT.AtlasData = {
    openYears: OPEN,
    gapYears: [],

    wings: [
      { id: "gray", label: "Gray / directories", blurb: "Directories, SSL cart, portal hop.", years: ["1994", "1995", "1996"] },
      { id: "bubble", label: "Bubble", blurb: "Push, Lucky, AIM, MapQuest.", years: ["1997", "1998", "1999", "2000"] },
      { id: "rebuild", label: "Rebuild", blurb: "Wiki edit, Stumble, Photobucket, thefacebook, Twttr, iPhone Safari.", years: ["2001", "2002", "2003", "2004", "2005", "2006", "2007"] },
      { id: "phone", label: "Phone eats the web", blurb: "App Store → Like → Circles. Vine 6s is the 2013 door.", years: ["2008", "2009", "2010", "2011", "2012", "2013"] },
      { id: "stream", label: "Streams / tracking", blurb: "WhatsApp Install, Stories, Face ID, GDPR Manage, Continue watching, Zoom Leave.", years: ["2014", "2015", "2016", "2017", "2018", "2019", "2020"] }
    ],

    leanYears: [
      "2007",
      "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020",
      "2011", "2009"
    ],

    notThisYear: {
      "1994": "No search box as the door. Directories first.",
      "1995": "Not eBay yet — AuctionWeb. SSL is the object.",
      "1996": "Flash and CSS are born. Portals are still home.",
      "1997": "PointCast is the gold, not eBay.",
      "1998": "Portals still win. Google is sparse.",
      "1999": "Buddy lists and P2P. Not modern chat.",
      "2000": "Peak and crash in one year. Pets.com is an epitaph.",
      "2001": "Anyone can edit. Preview is not Save. No Store.",
      "2002": "Stumble. Always-on is still a minority. No Store. No MySpace.",
      "2003": "Photobucket hotlink is the save. 99¢ leftover. Friendster still larger than MySpace.",
      "2004": "College network only. Not modern Facebook.",
      "2005": "YouTube upload is the save. Maps / Reddit / Digg leftover. Google does not own YouTube.",
      "2006": "140 because SMS. News Feed leftover. No iPhone.",
      "2007": "Safari only. App Store is 2008. Desktop still mass.",
      "2008": "Apps arrive. Desktop is still mass.",
      "2009": "Like, not Reactions. No iPad.",
      "2010": "iPhone only. Android Instagram is next year.",
      "2011": "Circles and Siri. Timeline is leftover.",
      "2012": "The square photo leaves the iPhone.",
      "2013": "Stories here are Snapchat, not Instagram.",
      "2014": "Messenger is the trap. Install is the save.",
      "2015": "Go LIVE. No Stories on Instagram yet.",
      "2016": "Snapchat invented the 24-hour slide.",
      "2017": "Look to unlock. Fortnite is leftover.",
      "2018": "Accept All never writes. Reels are not this year.",
      "2019": "No Reels. No Zoom as mass. Trial never writes.",
      "2020": "Join never writes. 300 million is participants, not users. ChatGPT is 2022."},

    /* L1 nostalgia — visitor postcard only. Open years. Wiped years omit this. */
    remember: {
      "1994": "The whole public Web is still countable. You browse a directory. You sign the book. There is no search box as the door.",
      "1995": "Stores wake up. You type a name, a card, a city. AuctionWeb is not eBay yet.",
      "1996": "Your homepage is a portal. Free mail arrives. The movie site is a playground.",
      "1997": "News pushes itself onto the desktop. You get a number, not a handle.",
      "1998": "Yahoo is still fat. Google is almost nothing. Skipping the intro is the sport.",
      "1999": "The ding meant they were there. You signed on. You did not text.",
      "2000": "You typed from and to and printed the page. Some sites would not be here next year.",
      "2001": "You edited an article. Preview was not Save. The library had no Store yet.",
      "2002": "You picked a topic and stumbled. Always-on was still a minority. Firefox was not here yet.",
      "2003": "You uploaded a photo to get a URL you could paste. Songs were 99¢. Friendster was still bigger.",
      "2004": "You needed a college. The wall was not a Feed. Gmail was an invite.",
      "2005": "You uploaded a clip. You dragged a map. You boosted a link. Google did not own YouTube yet.",
      "2006": "You typed 140 because SMS. News Feed was leftover. There was no iPhone yet.",
      "2007": "You used Safari on the phone. The App Store was next year. Desktop was still mass.",
      "2008": "There were about five hundred apps. The desktop was still mass. Chrome was a product room.",
      "2009": "You Liked a partner page. Beacon never wrote. Reactions were not here yet.",
      "2010": "The photo was square. The filter had a name. Android is next year.",
      "2011": "You named a circle. Hangout was the save. G+ won never wrote.",
      "2012": "The square left the iPhone. Wikipedia went dark for a day.",
      "2013": "The loop was six seconds. Stories here are Snapchat, not Instagram.",
      "2014": "Nineteen billion dollars. Install is the save. Messenger is the trap.",
      "2015": "You titled it. Then you went LIVE. The locker said unlimited high quality.",
      "2016": "The slide lasted twenty-four hours. Snapchat invented the format. People walked into lamp posts.",
      "2017": "There was no Home button. You looked. You swiped up. Two hundred and eighty characters.",
      "2018": "The banner was the door. Accept All never wrote. Manage did. The loops changed their name.",
      "2019": "You picked a face. A seven-day trial is the trap. Continue is the save.",
      "2020": "You muted, then chatted, then Left. Join never wrote. Three hundred million is participants, not users."},

    /* Guided 6 for years whose Starting Point is inline (start-data.js stops at 2009). */
    guidedFull: {
      "2010": [
        { label: "About 2010", href: "years/2010/pages/about.html" },
        { label: "Instagram — filter then share", href: "years/2010/sites/instagram/index.html" },
        { label: "iPhone 4 — FaceTime Wi-Fi", href: "years/2010/sites/iphone/index.html" },
        { label: "iPad — $499", href: "years/2010/sites/ipad/index.html" },
        { label: "Open Graph — Like ×2", href: "years/2010/sites/facebook/index.html" },
        { label: "Year flow map", href: "years/2010/pages/map.html" }
      ],
      "2012": [
        { label: "About 2012", href: "years/2012/pages/about.html" },
        { label: "Instagram Android — filter → share", href: "years/2012/sites/instagram/android.html" },
        { label: "Facebook IPO — $38", href: "years/2012/sites/facebook/ipo.html" },
        { label: "SOPA blackout — 18 Jan", href: "years/2012/sites/wikipedia/sopa.html" },
        { label: "iPhone Maps flop — iOS 6", href: "years/2012/sites/iphone/maps.html" },
        { label: "Pinterest — pin ≥2", href: "years/2012/sites/pinterest/index.html" }
      ],
      "2013": [
        { label: "About 2013", href: "years/2013/pages/about.html" },
        { label: "Vine — hold 6s", href: "years/2013/sites/vine/record.html" },
        { label: "iOS 7 — flat", href: "years/2013/sites/iphone/ios7.html" },
        { label: "Snapchat Stories — 24h", href: "years/2013/sites/snapchat/story.html" },
        { label: "IG Video leftover — 15s", href: "years/2013/sites/instagram/video.html" },
        { label: "Year flow map", href: "years/2013/pages/map.html" }
      ],
      "2014": [
        { label: "About 2014", href: "years/2014/pages/about.html" },
        { label: "WhatsApp — Install", href: "years/2014/sites/whatsapp/index.html" },
        { label: "Heartbleed leftover — rotate", href: "years/2014/sites/heartbleed/index.html" },
        { label: "Ice Bucket leftover — nominate", href: "years/2014/sites/icebucket/index.html" },
        { label: "iPhone 6 leftover", href: "years/2014/sites/iphone/index.html" },
        { label: "Year flow map", href: "years/2014/pages/map.html" }
      ],
      "2015": [
        { label: "About 2015", href: "years/2015/pages/about.html" },
        { label: "Periscope — title then Go LIVE", href: "years/2015/sites/periscope/index.html" },
        { label: "Google Photos — backup HQ", href: "years/2015/sites/googlephotos/index.html" },
        { label: "Windows 10 — free upgrade", href: "years/2015/sites/windows10/index.html" },
        { label: "Apple Music — 3-month trial", href: "years/2015/sites/applemusic/index.html" },
        { label: "Year flow map", href: "years/2015/pages/map.html" }
      ],
      "2016": [
        { label: "About 2016", href: "years/2016/pages/about.html" },
        { label: "Instagram Stories — 24h slide", href: "years/2016/sites/instagram/stories.html" },
        { label: "Pokémon GO leftover", href: "years/2016/sites/pokemongo/index.html" },
        { label: "Reactions — five faces", href: "years/2016/sites/facebook/reactions.html" },
        { label: "WhatsApp E2E — default lock", href: "years/2016/sites/whatsapp/e2e.html" },
        { label: "Year flow map", href: "years/2016/pages/map.html" }
      ],
      "2017": [
        { label: "About 2017", href: "years/2017/pages/about.html" },
        { label: "Face ID / iPhone X", href: "years/2017/sites/iphone/x.html" },
        { label: "Fortnite BR leftover", href: "years/2017/sites/fortnite/index.html" },
        { label: "Twitter 280", href: "years/2017/sites/twitter/280.html" },
        { label: "Teams GA", href: "years/2017/sites/teams/index.html" },
        { label: "Year flow map", href: "years/2017/pages/map.html" }
      ],
      "2018": [
        { label: "About 2018", href: "years/2018/pages/about.html" },
        { label: "GDPR Manage — Accept All never writes", href: "years/2018/sites/gdpr/index.html" },
        { label: "TikTok For You — Aug 2 merge", href: "years/2018/sites/tiktok/fyp.html" },
        { label: "Hearing — Apr 10", href: "years/2018/sites/trust/index.html" },
        { label: "IGTV — not Reels", href: "years/2018/sites/instagram/igtv.html" },
        { label: "Year flow map", href: "years/2018/pages/map.html" }
      ]},

    years: {
      "1994": {
        era: "Gray web · 14.4k · Netscape 1.0",
        thesis: "Directories before search. The public Web’s first mass year.",
        gold: { label: "Cool Site of the Day guestbook", href: "years/1994/sites/csotd/index.html", key: "itt94-csotd" },
        guided: [
          { label: "Yahoo @ Stanford", href: "years/1994/sites/yahoo/index.html" },
          { label: "CERN / WWW", href: "years/1994/sites/cern/index.html" }
        ],
        game: { label: "Hotlist Surfer", href: "years/1994/sites/playable/game.html" }
      },
      "1995": {
        era: "Win95 · Netscape 2 · commercial Web",
        thesis: "Stores and auctions wake up. SSL is the 1995 object.",
        gold: { label: "Amazon SSL checkout", href: "years/1995/sites/amazon/ssl-checkout.html", key: "itt95-ssl-checkout" },
        guided: [
          { label: "AuctionWeb", href: "years/1995/sites/auctionweb/index.html" },
          { label: "GeoCities homestead", href: "years/1995/sites/geocities/homestead.html" }
        ],
        game: { label: "Applet Checkers", href: "years/1995/sites/playable/game.html" }
      },
      "1996": {
        era: "Portals · HoTMaiL · Space Jam",
        thesis: "Portal wars and free webmail. Hop Yahoo, Excite, AltaVista.",
        gold: { label: "Portal wars (3 portals)", href: "years/1996/sites/portals/wars.html", key: "itt96-portal-wars" },
        guided: [
          { label: "HoTMaiL", href: "years/1996/sites/hotmail/index.html" },
          { label: "Space Jam", href: "years/1996/sites/spacejam/index.html" }
        ],
        game: { label: "Planet Hop", href: "years/1996/sites/playable/game.html" }
      },
      "1997": {
        era: "IE 4 · 56k · push · IM",
        thesis: "Browser-war peak. PointCast push is the gold, not eBay.",
        gold: { label: "PointCast channels", href: "years/1997/sites/pointcast/index.html", key: "itt97-pointcast" },
        guided: [
          { label: "ICQ", href: "years/1997/sites/icq/index.html" },
          { label: "eBay laptop", href: "years/1997/sites/ebay/item-laptop.html" }
        ],
        game: { label: "Lobby Connect Four", href: "years/1997/sites/playable/game.html" }
      },
      "1998": {
        era: "Win98 · portals still rule · Google!",
        thesis: "Sparse Google appears. I’m Feeling Lucky is the 1998 object.",
        gold: { label: "I’m Feeling Lucky", href: "years/1998/sites/google/lucky.html", key: "itt98-lucky" },
        guided: [
          { label: "Yahoo packed", href: "years/1998/sites/yahoo/index.html" },
          { label: "Amazon Music", href: "years/1998/sites/amazon/music.html" }
        ],
        game: { label: "Skip-Intro Runner", href: "years/1998/sites/playable/game.html" }
      },
      "1999": {
        era: "Bubble peak · Napster · Y2K",
        thesis: "Buddy lists and P2P. AIM sign-on is the gold.",
        gold: { label: "AIM sign-on", href: "years/1999/sites/aim/index.html", key: "itt99-aim" },
        guided: [
          { label: "Napster", href: "years/1999/sites/napster/index.html" },
          { label: "Blogger", href: "years/1999/sites/blogger/edit.html" }
        ],
        game: { label: "Pixel Pet Dash", href: "years/1999/sites/playable/game.html" }
      },
      "2000": {
        era: "Smile · crash · MapQuest",
        thesis: "Peak and crash in one year. From + to is the gold.",
        gold: { label: "MapQuest from/to", href: "years/2000/sites/mapquest/index.html", key: "itt00-mapquest" },
        guided: [
          { label: "Amazon smile", href: "years/2000/sites/amazon/index.html" },
          { label: "Pets.com", href: "years/2000/sites/pets/index.html" }
        ],
        game: { label: "Lot Life", href: "years/2000/sites/playable/game.html" }
      },
      "2001": {
        era: "XP · IE 6 · Wiki · iPod",
        thesis: "Post-crash rebuild. Anyone can edit.",
        gold: { label: "Wikipedia edit", href: "years/2001/sites/wikipedia/edit.html", key: "itt01-wiki" },
        guided: [
          { label: "iPod", href: "years/2001/sites/apple/ipod.html" },
          { label: "iTunes (no Store)", href: "years/2001/sites/itunes/index.html" }
        ],
        game: { label: "Clickscape", href: "years/2001/sites/playable/game.html" }
      },
      "2002": {
        era: "Always-on minority · KaZaA",
        thesis: "Stumble twice. Social seed, not mass Facebook.",
        gold: { label: "StumbleUpon", href: "years/2002/sites/stumbleupon/index.html", key: "itt02-stumble" },
        guided: [
          { label: "Friendster", href: "years/2002/sites/friendster/index.html" },
          { label: "KaZaA", href: "years/2002/sites/kazaa/index.html" }
        ],
        game: { label: "Room Sticky", href: "years/2002/sites/playable/game.html" }
      },
      "2003": {
        wiped: false,
        era: "Photobucket · 99¢ Store",
        thesis: "Social + paid music. Photobucket hotlink is the gold.",
        gold: { label: "Photobucket upload", href: "years/2003/sites/photobucket/index.html", key: "itt03-photobucket" },
        guided: [
          { label: "MySpace", href: "years/2003/sites/myspace/index.html" },
          { label: "iTunes Store 99¢", href: "years/2003/sites/itunes/index.html" }
        ],
        game: { label: "Gags Lite", href: "years/2003/sites/playable/game.html" }
      },
      "2004": {
        era: "Web 2.0 named",
        thesis: "College networks. thefacebook is not modern Facebook.",
        gold: { label: "thefacebook networks", href: "years/2004/sites/facebook/networks.html", key: "itt04-thefacebook-networks" },
        guided: [
          { label: "Gmail invite", href: "years/2004/sites/gmail/index.html" },
          { label: "Flickr", href: "years/2004/sites/flickr/index.html" }
        ],
        game: { label: "Gem Cascade", href: "years/2004/sites/playable/game.html" }
      },
      "2005": {
        era: "YouTube · Maps · Ajax",
        thesis: "Web 2.0 boom. Upload is the save. Independent YouTube.",
        gold: { label: "YouTube upload", href: "years/2005/sites/youtube/upload.html", key: "itt05-yt-uploads" },
        guided: [
          { label: "Google Maps", href: "years/2005/sites/maps/index.html" },
          { label: "Reddit / Digg", href: "years/2005/sites/reddit/index.html" }
        ],
        game: { label: "HoverChop", href: "years/2005/sites/playable/game.html" }
      },
      "2006": {
        wiped: false,
        era: "Twitter 140 · News Feed leftover",
        thesis: "140 because SMS. News Feed leftover. No iPhone.",
        gold: { label: "Twitter 140", href: "years/2006/sites/twitter/index.html", key: "itt06-tweets" },
        guided: [
          { label: "News Feed leftover", href: "years/2006/sites/facebook/feed.html" },
          { label: "Firefox leftover", href: "years/2006/sites/firefox/index.html" }
        ],
        game: { label: "TrailSled", href: "years/2006/sites/playable/game.html" }
      },
            "2008": {
        era: "App Store · Chrome · G1",
        thesis: "GitHub issue is the star. App Store · Chrome · G1 leftover. Chrome is a product room.",
        gold: { label: "GitHub issue", href: "years/2008/sites/github/issue.html", key: "itt08-github" },
        leftoverGold: { label: "App Store leftover", href: "years/2008/sites/appstore/index.html", key: "itt08-apps" },
        guided: [
          { label: "Chrome", href: "years/2008/sites/chrome/index.html" },
          { label: "Android G1", href: "years/2008/sites/android/index.html" }
        ],
        game: { label: "Goo Span", href: "years/2008/sites/playable/game.html" }
      },
            "2010": {
        era: "iPad · Instagram iOS · Open Graph",
        thesis: "Filter on iPhone only. Android is next year.",
        gold: { label: "Instagram iOS filter+share", href: "years/2010/sites/instagram/index.html", key: "itt10-ig" },
        guided: [
          { label: "iPad", href: "years/2010/sites/ipad/index.html" },
          { label: "Open Graph", href: "years/2010/sites/facebook/index.html" }
        ],
        game: { label: "Sling Nest", href: "years/2010/sites/playable/game.html" }
      },
            "2012": {
        era: "Square photo · IPO · blackout",
        thesis: "Instagram leaves the iPhone. Facebook goes public. Wikipedia goes dark.",
        gold: { label: "Instagram Android", href: "years/2012/sites/instagram/android.html", key: "itt12-ig-android" },
        guided: [
          { label: "Facebook IPO", href: "years/2012/sites/facebook/ipo.html" },
          { label: "SOPA blackout", href: "years/2012/sites/wikipedia/sopa.html" }
        ],
        game: { label: "Guess Doodle", href: "years/2012/sites/playable/game.html" }
      },
      "2007": {
        era: "iPhone Safari · Street View leftover",
        thesis: "Safari is the save. App Store never writes. Desktop is still mass.",
        gold: { label: "iPhone Safari", href: "years/2007/sites/iphone/index.html", key: "itt07-iphone" },
        guided: [
          { label: "Street View leftover", href: "years/2007/sites/streetview/index.html" },
          { label: "Gmail open leftover", href: "years/2007/sites/gmail/index.html" }
        ],
        game: { label: "Safari Queue", href: "years/2007/sites/playable/game.html" }
      },
      "2009": {
        era: "Like · FarmVille leftover · XP + IE 8",
        thesis: "Like two partner pages is the save. Beacon never writes. Win7 is October leftover.",
        gold: { label: "Facebook Like", href: "years/2009/sites/facebook/index.html", key: "itt09-like" },
        guided: [
          { label: "FarmVille leftover", href: "years/2009/sites/farmville/index.html" },
          { label: "Bing leftover", href: "years/2009/sites/bing/index.html" }
        ],
        game: { label: "Plot Neighbors", href: "years/2009/sites/playable/game.html" }
      },
      "2011": {
        era: "Circles · Hangout · Win7 + IE 9",
        thesis: "Hangout is the save. G+ won never writes. IG Android is 2012.",
        gold: { label: "Google+ Hangout", href: "years/2011/sites/googleplus/index.html", key: "itt11-gplus" },
        guided: [
          { label: "Spotify US leftover", href: "years/2011/sites/spotify/index.html" },
          { label: "Siri leftover", href: "years/2011/sites/iphone/index.html" }
        ],
        game: { label: "Letter Swap", href: "years/2011/sites/playable/game.html" }
      },
      "2013": {
        era: "Vine 6s · iOS 7 · Stories",
        thesis: "Lean door. Hold 6s then post. Stories here are Snapchat, not Instagram.",
        gold: { label: "Vine 6s", href: "years/2013/sites/vine/record.html", key: "itt13-vine-posts" },
        guided: [
          { label: "IG Video leftover", href: "years/2013/sites/instagram/video.html" },
          { label: "Snapchat Stories", href: "years/2013/sites/snapchat/story.html" }
        ],
        game: { label: "Loop Six", href: "years/2013/sites/playable/game.html" }
      },
      "2014": {
        era: "WhatsApp · Heartbleed · Ice",
        thesis: "Lean door. Messaging becomes the mass internet. $19B install is the gold.",
        gold: { label: "WhatsApp Install", href: "years/2014/sites/whatsapp/index.html", key: "itt14-wa-install" },
        guided: [
          { label: "Heartbleed", href: "years/2014/sites/heartbleed/index.html" },
          { label: "Ice Bucket", href: "years/2014/sites/icebucket/index.html" }
        ],
        game: { label: "Tile Fold", href: "years/2014/sites/playable/game.html" }
      },
      "2015": {
        era: "Go LIVE · Photos locker · Win10",
        thesis: "Lean door. Periscope titled Go LIVE is the gold.",
        gold: { label: "Periscope Go LIVE", href: "years/2015/sites/periscope/index.html", key: "itt15-periscope" },
        guided: [
          { label: "Google Photos", href: "years/2015/sites/googlephotos/index.html" },
          { label: "Windows 10 upgrade", href: "years/2015/sites/windows10/index.html" }
        ],
        game: { label: "Blob Rush", href: "years/2015/sites/playable/game.html" }
      },
      "2016": {
        era: "Stories · sidewalks · five faces",
        thesis: "Lean door. 24-hour slide. Snapchat invented the format.",
        gold: { label: "Instagram Stories", href: "years/2016/sites/instagram/stories.html", key: "itt16-ig-stories" },
        guided: [
          { label: "Pokémon GO leftover", href: "years/2016/sites/pokemongo/index.html" },
          { label: "Reactions", href: "years/2016/sites/facebook/reactions.html" }
        ],
        game: { label: "Gym Rush", href: "years/2016/sites/playable/game.html" }
      },
      "2017": {
        era: "Face ID · free storm · 280",
        thesis: "Lean door. Look to unlock. Fortnite is leftover.",
        gold: { label: "Face ID / iPhone X", href: "years/2017/sites/iphone/x.html", key: "itt17-faceid" },
        guided: [
          { label: "Fortnite leftover", href: "years/2017/sites/fortnite/index.html" },
          { label: "Twitter 280", href: "years/2017/sites/twitter/280.html" }
        ],
        game: { label: "Storm Circle", href: "years/2017/sites/playable/game.html" }
      },
      "2018": {
        era: "Banner · hearing · For You",
        thesis: "Lean door. Accept All never writes. Manage is the save.",
        gold: { label: "GDPR Manage", href: "years/2018/sites/gdpr/index.html", key: "itt18-gdpr" },
        guided: [
          { label: "TikTok For You", href: "years/2018/sites/tiktok/fyp.html" },
          { label: "Hearing leftover", href: "years/2018/sites/trust/index.html" }
        ],
        game: { label: "Consent Dash", href: "years/2018/sites/playable/game.html" }
      },
      "2019": {
        era: "Who’s watching · Continue",
        thesis: "Profiles become the door. A weeklong trial is the trap. Continue watching is the save.",
        gold: { label: "Disney+ Continue", href: "years/2019/sites/disneyplus/home.html", key: "itt19-disneyplus" },
        guided: [
          { label: "TikTok For You", href: "years/2019/sites/tiktok/index.html" },
          { label: "Apple Arcade", href: "years/2019/sites/arcade/index.html" },
          { label: "Stadia Founder's", href: "years/2019/sites/stadia/index.html" }
        ],
        game: { label: "Continue Row", href: "years/2019/sites/playable/game.html" }
      },
      "2020": {
        era: "Mute · chat · Leave",
        thesis: "Lean door. Join never writes. Mute then chat then Leave is the save. 300 million is participants, not users.",
        gold: { label: "Zoom Leave", href: "years/2020/sites/zoom/meeting.html", key: "itt20-zoom" },
        guided: [
          { label: "YouTube leftover", href: "years/2020/sites/youtube/index.html" },
          { label: "Wikipedia leftover", href: "years/2020/sites/wikipedia/index.html" },
          { label: "Facebook leftover", href: "years/2020/sites/facebook/index.html" }
        ],
        game: { label: "Sus Vote", href: "years/2020/sites/playable/game.html" }
      }},

    threads: [
      {
        id: "yahoo",
        label: "Yahoo",
        blurb: "Directory → packed portal. Still there after Google.",
        stops: [
          { year: "1994", href: "years/1994/sites/yahoo/index.html", note: "Stanford" },
          { year: "1995", href: "years/1995/sites/yahoo/index.html", note: "yahoo.com" },
          { year: "1996", href: "years/1996/sites/yahoo/index.html", note: "My Yahoo" },
          { year: "1998", href: "years/1998/sites/yahoo/index.html", note: "still winning" },
          { year: "2000", href: "years/2000/sites/yahoo/index.html", note: "crash year" },
          { year: "2010", href: "years/2010/sites/yahoo/index.html", note: "lean leftover" }
        ]
      },
      {
        id: "amazon",
        label: "Amazon",
        blurb: "Bookstore → music aisle → smile. Continuity after 2000.",
        stops: [
          { year: "1995", href: "years/1995/sites/amazon/ssl-checkout.html", note: "SSL gold" },
          { year: "1996", href: "years/1996/sites/amazon/index.html", note: "catalog" },
          { year: "1998", href: "years/1998/sites/amazon/music.html", note: "Music" },
          { year: "2000", href: "years/2000/sites/amazon/index.html", note: "smile" },
          { year: "2004", href: "years/2004/sites/amazon/index.html", note: "Web 2.0 year" }
        ]
      },
      {
        id: "google",
        label: "Google",
        blurb: "Sparse search → habit → Maps → Chrome → Photos.",
        stops: [
          { year: "1998", href: "years/1998/sites/google/lucky.html", note: "Lucky gold" },
          { year: "2001", href: "years/2001/sites/google/index.html", note: "default" },
          { year: "2008", href: "years/2008/sites/chrome/index.html", note: "Chrome" },
          { year: "2015", href: "years/2015/sites/googlephotos/index.html", note: "Photos locker" }
        ]
      },
      {
        id: "facebook",
        label: "Facebook",
        blurb: "College wall → Feed → Like → Open Graph → Timeline.",
        stops: [
          { year: "2004", href: "years/2004/sites/facebook/networks.html", note: "thefacebook" },
          { year: "2010", href: "years/2010/sites/facebook/index.html", note: "Open Graph" },
          { year: "2016", href: "years/2016/sites/facebook/reactions.html", note: "Reactions leftover" }
        ]
      },
      {
        id: "youtube",
        label: "YouTube",
        blurb: "Independent upload → Google-owned → leftover lean rooms.",
        stops: [
          { year: "2010", href: "years/2010/sites/youtube/index.html", note: "lean leftover" },
          { year: "2016", href: "years/2016/sites/youtube/index.html", note: "lean leftover" },
          { year: "2017", href: "years/2017/sites/youtube/index.html", note: "lean leftover" }
        ]
      },
      {
        id: "mail",
        label: "Mail",
        blurb: "Free webmail → invite Gmail → open Gmail.",
        stops: [
          { year: "1996", href: "years/1996/sites/hotmail/index.html", note: "HoTMaiL" },
          { year: "1997", href: "years/1997/sites/hotmail/index.html", note: "inbox" },
          { year: "1998", href: "years/1998/sites/hotmail/index.html", note: "continuity" },
          { year: "2004", href: "years/2004/sites/gmail/index.html", note: "invite" }
        ]
      },
      {
        id: "search",
        label: "Finding things",
        blurb: "Browse a directory → type a query → pan a map.",
        stops: [
          { year: "1994", href: "years/1994/sites/yahoo/index.html", note: "browse, don’t search" },
          { year: "1995", href: "years/1995/sites/altavista/index.html", note: "AltaVista" },
          { year: "1998", href: "years/1998/sites/google/lucky.html", note: "Lucky" }
        ]
      },
      {
        id: "phone",
        label: "Phone eats the web",
        blurb: "Safari only → App Store → filter → WhatsApp install → Face ID.",
        stops: [
          { year: "2008", href: "years/2008/sites/appstore/index.html", note: "Store opens" },
          { year: "2010", href: "years/2010/sites/instagram/index.html", note: "iOS filter" },
          { year: "2016", href: "years/2016/sites/whatsapp/e2e.html", note: "E2E leftover" },
          { year: "2017", href: "years/2017/sites/iphone/x.html", note: "Face ID" }
        ]
      },
      {
        id: "im",
        label: "Chat / IM",
        blurb: "ICQ → AIM → Hangouts. Not iMessage.",
        stops: [
          { year: "1997", href: "years/1997/sites/icq/index.html", note: "ICQ" },
          { year: "1999", href: "years/1999/sites/aim/index.html", note: "AIM gold" },
          { year: "2001", href: "years/2001/sites/msn/index.html", note: "MSN Messenger" }
        ]
      }
    ],

    trails: [
      {
        id: "first-night",
        label: "First night",
        blurb: "The built-in 5-stop walk. CSotD → Google → thefacebook → App Store → Instagram. Stops in 2010.",
        href: "../index.html",
        startYear: "1994",
        startPath: "years/1994/?trail=first-night",
        steps: [
          { year: "1994", label: "CSotD guestbook", href: "years/1994/sites/csotd/index.html" },
          { year: "1998", label: "Sparse Google", href: "years/1998/sites/google/index.html" },
          { year: "2004", label: "thefacebook", href: "years/2004/sites/facebook/networks.html" },
          { year: "2008", label: "App Store", href: "years/2008/sites/appstore/index.html" },
          { year: "2010", label: "Instagram iOS", href: "years/2010/sites/instagram/index.html" }
        ]
      },
      {
        id: "find",
        label: "How we found things",
        blurb: "Yahoo catalog → AltaVista → Lucky → Maps → Bing.",
        steps: [
          { year: "1994", label: "Yahoo directory", href: "years/1994/sites/yahoo/index.html" },
          { year: "1995", label: "AltaVista", href: "years/1995/sites/altavista/index.html" },
          { year: "1998", label: "I’m Feeling Lucky", href: "years/1998/sites/google/lucky.html" }
        ]
      },
      {
        id: "buy",
        label: "How we bought",
        blurb: "SSL cart → auction → 99¢ song → App Store.",
        steps: [
          { year: "1995", label: "Amazon SSL", href: "years/1995/sites/amazon/ssl-checkout.html" },
          { year: "1997", label: "eBay bid", href: "years/1997/sites/ebay/item-laptop.html" },
          { year: "2003", label: "iTunes 99¢", href: "years/2003/sites/itunes/index.html" },
          { year: "2008", label: "App Store", href: "years/2008/sites/appstore/index.html" }
        ]
      },
      {
        id: "talk",
        label: "How we talked",
        blurb: "Free mail → ICQ → AIM → Gmail → 140.",
        steps: [
          { year: "1996", label: "HoTMaiL", href: "years/1996/sites/hotmail/index.html" },
          { year: "1997", label: "ICQ", href: "years/1997/sites/icq/index.html" },
          { year: "1999", label: "AIM", href: "years/1999/sites/aim/index.html" },
          { year: "2004", label: "Gmail invite", href: "years/2004/sites/gmail/index.html" }
        ]
      },
      {
        id: "phone-trail",
        label: "Phone ate the web",
        blurb: "Safari-only → Store → filter → WhatsApp install → Face ID.",
        steps: [
          { year: "2008", label: "App Store", href: "years/2008/sites/appstore/index.html" },
          { year: "2010", label: "Instagram iOS", href: "years/2010/sites/instagram/index.html" },
          { year: "2016", label: "WhatsApp E2E leftover", href: "years/2016/sites/whatsapp/e2e.html" },
          { year: "2017", label: "Face ID", href: "years/2017/sites/iphone/x.html" }
        ]
      },
      {
        id: "broadcast",
        label: "Broadcast yourself",
        blurb: "Upload → live → 24-hour slide. Vine is the 2013 gold.",
        steps: [
          { year: "2015", label: "Periscope LIVE", href: "years/2015/sites/periscope/index.html" },
          { year: "2016", label: "Instagram Stories", href: "years/2016/sites/instagram/stories.html" },
          { year: "2017", label: "musical.ly leftover", href: "years/2017/sites/musically/index.html" }
        ]
      },
      {
        id: "games",
        label: "Period games wing",
        blurb: "Separate Flash-portal lobby. Not ripped SWF.",
        steps: [
          { year: "", label: "Games lobby", href: "games/index.html" },
          { year: "", label: "HoverChop", href: "games/play/heli.html" },
          { year: "", label: "TrailSled", href: "games/play/sled.html" }
        ]
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
