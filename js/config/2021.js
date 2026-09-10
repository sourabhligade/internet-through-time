/**
 * Year config — 2021 CUT-OPEN lean door
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};
  var rooms = [
    "index.html","pages/home.html","pages/about.html","pages/map.html",
    "sites/att/index.html","sites/signal/index.html","sites/copilot/index.html",
    "sites/meta/index.html","sites/windows11/index.html","sites/flash/index.html",
    "sites/chrome/index.html","sites/windows10/index.html","sites/facebook/index.html",
    "sites/playable/game.html","sites/playable/index.html","sites/youtube/index.html","sites/wikipedia/index.html",
    "sites/clubhouse/index.html","sites/nft/index.html","sites/squid/index.html","sites/opensea/index.html","sites/coinbase/index.html","sites/robinhood/index.html","sites/gamestop/index.html","sites/parler/index.html","sites/gettr/index.html","sites/rumble/index.html","sites/telegram/index.html","sites/whatsapp/index.html","sites/instagram/index.html","sites/tiktok/index.html","sites/twitch/index.html","sites/reddit/index.html","sites/twitter/index.html","sites/discord/index.html","sites/slack/index.html","sites/zoom/index.html","sites/teams/index.html","sites/notion/index.html","sites/figma/index.html","sites/canva/index.html","sites/shopify/index.html","sites/etsy/index.html","sites/amazon/index.html","sites/ebay/index.html","sites/craigslist/index.html","sites/netflix/index.html","sites/disneyplus/index.html","sites/hbomax/index.html","sites/paramountplus/index.html","sites/peacock/index.html","sites/spotify/index.html","sites/substack/index.html","sites/patreon/index.html","sites/onlyfans/index.html","sites/github/index.html","sites/firefox/index.html","sites/brave/index.html","sites/duckduckgo/index.html","sites/bing/index.html","sites/google/index.html","sites/apple/index.html","sites/icloud/index.html","sites/ios15/index.html","sites/android12/index.html","sites/iphone13/index.html","sites/airtags/index.html","sites/epicgames/index.html","sites/fortnite/index.html","sites/roblox/index.html","sites/minecraft/index.html","sites/genshin/index.html","sites/axie/index.html","sites/boredape/index.html","sites/cryptopunks/index.html","sites/solana/index.html","sites/ethereum/index.html","sites/dogecoin/index.html","sites/tesla/index.html","sites/spacex/index.html","sites/starlink/index.html","sites/horizon/index.html","sites/houseparty/index.html","sites/venmo/index.html","sites/cashapp/index.html","sites/paypal/index.html","sites/stripe/index.html","sites/doordash/index.html","sites/uber/index.html","sites/lyft/index.html","sites/instacart/index.html","sites/airbnb/index.html","sites/zillow/index.html","sites/nextdoor/index.html","sites/strava/index.html","sites/peloton/index.html","sites/calm/index.html","sites/duolingo/index.html","sites/medium/index.html","sites/tumblr/index.html","sites/pinterest/index.html","sites/steam/index.html","sites/playstation/index.html"
  ];
  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2021/",
    "pages/about.html": "http://home.microsoft.com/intl/web2021/about.html",
    "pages/map.html": "http://museum.local/years/2021/map/"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2021/" + rooms[i];
    }
  }
  ITT.configs["2021"] = {
    year: "2021",
    rooms: rooms,
    home: "pages/home.html",
    start: "pages/home.html",
    storagePrefix: "itt21",
    prefsKey: "itt-2021-prefs",
    bookmarksKey: "itt-2021-bookmarks",
    connectedKey: "itt-2021-connected",
    immersionScript: "js/immersion-2021.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Chrome habit",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Chrome habit (museum desktop frame)...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2021/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#0078d7"
    },
    urlMap: urlMap,
    bookmarks: [
      { title: "Starting Point", path: "pages/home.html" },
      { title: "ATT Ask", path: "sites/att/index.html" },
      { title: "Signal leftover", path: "sites/signal/index.html" },
      { title: "Copilot waitlist", path: "sites/copilot/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2021/",
    locationHints: [
      { re: /att|tracking|ask app|idfa|not to track/i, path: "sites/att/index.html" },
      { re: /signal/i, path: "sites/signal/index.html" },
      { re: /copilot|waitlist/i, path: "sites/copilot/index.html" },
      { re: /meta|rename/i, path: "sites/meta/index.html" },
      { re: /windows.?11|win11/i, path: "sites/windows11/index.html" },
      { re: /flash/i, path: "sites/flash/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /windows.?10|win10/i, path: "sites/windows10/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
