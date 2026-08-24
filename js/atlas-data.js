/**
 * Museum atlas — visitor floor plan of every playable year and flow.
 * Paths are from repo root. Atlas page prefixes ../ when needed.
 * Museum ends 2024. Do not invent rooms.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var OPEN = [
    "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001",
    "2002", "2003", "2004", "2008", "2009",
    "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
  ];

  ITT.AtlasData = {
    openYears: OPEN,
    gapYears: ["2005", "2006", "2007"],

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
        gold: { label: "Wikipedia edit", href: "years/2001/sites/wikipedia/edit.html", key: "itt01-wiki-pages" },
        guided: [
          { label: "iPod", href: "years/2001/sites/apple/ipod.html" },
          { label: "iTunes (no Store)", href: "years/2001/sites/apple/itunes.html" }
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
        era: "MySpace · 99¢ Store",
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
        wiped: true,
        era: "YouTube · Maps · Ajax",
        thesis: "Off disk for a from-scratch rebuild.",
        gold: { label: "YouTube upload", href: "years/2005/sites/youtube/upload.html", key: "itt05-yt-uploads" },
        guided: [
          { label: "Google Maps", href: "years/2005/sites/maps/index.html" },
          { label: "Reddit / Digg", href: "years/2005/sites/reddit/index.html" }
        ],
        game: { label: "HoverChop", href: "years/2005/sites/playable/game.html" }
      },
      "2006": {
        wiped: true,
        era: "Twitter · Feed · open Facebook",
        thesis: "Off disk for a from-scratch rebuild.",
        gold: { label: "Twitter 140", href: "years/2006/sites/twitter/index.html", key: "itt06-tweets" },
        guided: [
          { label: "Facebook News Feed", href: "years/2006/sites/facebook/feed.html" },
          { label: "YouTube (Google deal late)", href: "years/2006/sites/youtube/index.html" }
        ],
        game: { label: "TrailSled", href: "years/2006/sites/playable/game.html" }
      },
            "2008": {
        era: "App Store · Chrome · G1",
        thesis: "Apps arrive. Chrome is a product room. GitHub leftover writes REAL.",
        gold: { label: "App Store", href: "years/2008/sites/appstore/index.html", key: "" },
        leftoverGold: { label: "GitHub issue (REAL leftover)", href: "years/2008/sites/github/issue.html", key: "itt08-github" },
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
        wiped: true,
        era: "iPhone Safari · no App Store",
        thesis: "Off disk for a from-scratch rebuild.",
        gold: { label: "iPhone Safari", href: "years/2007/sites/iphone/index.html", key: "itt07-iphone" },
        guided: [
          { label: "Gmail open", href: "years/2007/sites/gmail/index.html" },
          { label: "Street View", href: "years/2007/sites/maps/index.html" }
        ],
        game: { label: "Peg Walk", href: "years/2007/sites/playable/game.html" }
      },
      "2009": {
        era: "Like · FarmVille · Bing",
        thesis: "Social goes mainstream. XP + IE 8. No iPad.",
        gold: { label: "Facebook Like", href: "years/2009/sites/facebook/index.html", key: "itt09-like" },
        guided: [
          { label: "FarmVille", href: "years/2009/sites/farmville/index.html" },
          { label: "Bing", href: "years/2009/sites/bing/index.html" },
          { label: "YouTube leftover #3", href: "years/2009/sites/youtube/index.html" }
        ],
        game: { label: "Plot Neighbors", href: "years/2009/sites/playable/game.html" }
      },
      "2011": {
        era: "Google+ · Spotify US · Siri",
        thesis: "Circles, legal US streaming, and a voice on the phone.",
        gold: { label: "Google+", href: "years/2011/sites/googleplus/index.html", key: "itt11-gplus" },
        guided: [
          { label: "Spotify US", href: "years/2011/sites/spotify/index.html" },
          { label: "Siri", href: "years/2011/sites/iphone/index.html" }
        ],
        game: { label: "Letter Swap", href: "years/2011/sites/playable/game.html" }
      },
      "2013": {
        era: "Vine 6s · iOS 7 · Stories",
        thesis: "The loop is six seconds. Stories here are Snapchat, not Instagram.",
        gold: { label: "Vine 6s", href: "years/2013/sites/vine/record.html", key: "itt13-vine-posts" },
        guided: [
          { label: "iOS 7", href: "years/2013/sites/iphone/ios7.html" },
          { label: "Snapchat Stories", href: "years/2013/sites/snapchat/story.html" }
        ],
        game: { label: "Year game", href: "years/2013/sites/playable/game.html" }
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
        thesis: "Lean door. Accept All never writes. Manage does.",
        gold: { label: "GDPR Manage", href: "years/2018/sites/gdpr/index.html", key: "itt18-gdpr" },
        guided: [
          { label: "TikTok For You leftover", href: "years/2018/sites/tiktok/fyp.html" },
          { label: "Hearing", href: "years/2018/sites/trust/index.html" }
        ],
        game: { label: "Consent Dash", href: "years/2018/sites/playable/game.html" }
      },
      "2019": {
        era: "Who’s watching · Continue",
        thesis: "Lean door. Trial never writes. Continue does.",
        gold: { label: "Disney+ Who’s watching", href: "years/2019/sites/disneyplus/home.html", key: "itt19-disneyplus" },
        guided: [
          { label: "TikTok For You leftover", href: "years/2019/sites/tiktok/index.html" },
          { label: "Apple Arcade", href: "years/2019/sites/arcade/index.html" }
        ],
        game: { label: "Continue Row", href: "years/2019/sites/playable/game.html" }
      },
      "2020": {
        era: "Mute · participants · 15 seconds",
        thesis: "Join is not the save. Mute, chat, leave. GPT-3 is a waitlist.",
        gold: { label: "Zoom mute → leave", href: "years/2020/sites/zoom/meeting.html", key: "itt20-zoom" },
        guided: [
          { label: "Reels 15s leftover", href: "years/2020/sites/reels/index.html" },
          { label: "GPT-3 waitlist", href: "years/2020/sites/openai/index.html" }
        ],
        game: { label: "Sus Vote", href: "years/2020/sites/playable/game.html" }
      },
      "2021": {
        era: "Allow · Ask App Not to Track",
        thesis: "Allow is the trap. Ask App Not to Track is the save. ChatGPT is 2022.",
        gold: { label: "ATT Ask App Not to Track", href: "years/2021/sites/att/index.html", key: "itt21-att" },
        guided: [
          { label: "Signal leftover", href: "years/2021/sites/signal/index.html" },
          { label: "Copilot waitlist", href: "years/2021/sites/copilot/index.html" }
        ],
        game: { label: "Five Letter", href: "years/2021/sites/playable/game.html" }
      },
      "2022": {
        era: "Send · research preview",
        thesis: "Send is the save. Empty / Plus / GPT-4 never write. X is 2023.",
        gold: { label: "ChatGPT Send", href: "years/2022/sites/chatgpt/index.html", key: "itt22-chatgpt" },
        guided: [
          { label: "Twitter leftover", href: "years/2022/sites/twitter/index.html" },
          { label: "Wordle leftover", href: "years/2022/sites/wordle/index.html" }
        ],
        game: { label: "Prompt Box", href: "years/2022/sites/playable/game.html" }
      },
      "2023": {
        era: "Win11 residual · Chrome habit · Plus $20",
        thesis: "Subscribe is the save. Empty / stay free / GPT-4o / Gemini never write.",
        gold: { label: "ChatGPT Plus $20", href: "years/2023/sites/chatgpt/plus.html", key: "itt23-chatgpt-plus" },
        guided: [
          { label: "GPT-4 leftover", href: "years/2023/sites/chatgpt/gpt4.html" },
          { label: "Bing Chat leftover", href: "years/2023/sites/bing/chat.html" }
        ],
        game: { label: "Subscribe Dash", href: "years/2023/sites/playable/game.html" }
      },
      "2024": {
        era: "Win11 residual · Chrome habit · GPT-4o",
        thesis: "Talk is the save. Empty / GPT-5 / 4o-as-2023 never write.",
        gold: { label: "GPT-4o Talk", href: "years/2024/sites/chatgpt/4o.html", key: "itt24-gpt4o" },
        guided: [
          { label: "Gemini leftover", href: "years/2024/sites/gemini/index.html" },
          { label: "Claude 3.5 leftover", href: "years/2024/sites/claude35/index.html" }
        ],
        game: { label: "Omni Dash", href: "years/2024/sites/playable/game.html" }
      }
    },

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
          { year: "2010", href: "years/2010/sites/yahoo/index.html", note: "lean leftover" },
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
          { year: "2004", href: "years/2004/sites/amazon/index.html", note: "Web 2.0 year" },
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
          { year: "2009", href: "years/2009/sites/youtube/index.html", note: "lean leftover · June #3" },
          { year: "2010", href: "years/2010/sites/youtube/index.html", note: "lean leftover" },
          { year: "2016", href: "years/2016/sites/youtube/index.html", note: "lean leftover" },
          { year: "2018", href: "years/2018/sites/youtube/index.html", note: "lean leftover" }
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
          { year: "2004", href: "years/2004/sites/gmail/index.html", note: "invite" },
        ]
      },
      {
        id: "search",
        label: "Finding things",
        blurb: "Browse a directory → type a query → pan a map.",
        stops: [
          { year: "1994", href: "years/1994/sites/yahoo/index.html", note: "browse, don’t search" },
          { year: "1995", href: "years/1995/sites/altavista/index.html", note: "AltaVista" },
          { year: "1998", href: "years/1998/sites/google/lucky.html", note: "Lucky" },
        ]
      },
      {
        id: "phone",
        label: "Phone eats the web",
        blurb: "Safari only → App Store → filter → WhatsApp install → Face ID.",
        stops: [
          { year: "2008", href: "years/2008/sites/appstore/index.html", note: "Store opens" },
          { year: "2010", href: "years/2010/sites/instagram/index.html", note: "iOS filter" },
          { year: "2014", href: "years/2014/sites/whatsapp/index.html", note: "Install" },
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
          { year: "2001", href: "years/2001/sites/msn/index.html", note: "MSN Messenger" },
        ]
      }
    ],

    trails: [
      {
        id: "first-night",
        label: "First night",
        blurb: "The built-in 5-stop walk. Directories → Google → YouTube → iPhone → FarmVille.",
        href: "../index.html",
        startYear: "1994",
        startPath: "years/1994/?trail=first-night",
        steps: [
          { year: "1994", label: "CSotD guestbook", href: "years/1994/sites/csotd/index.html" },
          { year: "1998", label: "Sparse Google", href: "years/1998/sites/google/index.html" },
          { year: "2004", label: "thefacebook", href: "years/2004/sites/facebook/networks.html" },

        ]
      },
      {
        id: "find",
        label: "How we found things",
        blurb: "Yahoo catalog → AltaVista → Lucky → Maps → Bing.",
        steps: [
          { year: "1994", label: "Yahoo directory", href: "years/1994/sites/yahoo/index.html" },
          { year: "1995", label: "AltaVista", href: "years/1995/sites/altavista/index.html" },
          { year: "1998", label: "I’m Feeling Lucky", href: "years/1998/sites/google/lucky.html" },
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
          { year: "2014", label: "WhatsApp Install", href: "years/2014/sites/whatsapp/index.html" },
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
          { year: "2018", label: "IGTV leftover", href: "years/2018/sites/instagram/igtv.html" }
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
