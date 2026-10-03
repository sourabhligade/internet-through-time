/**
 * Year config — 2011 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};
  var rooms = [
    "index.html",
    "sites/googleplus/index.html",
    "sites/spotify/index.html",
    "sites/iphone/index.html",
    "sites/facebook/index.html",
    "sites/ipad/index.html",
    "sites/airbnb/index.html",
    "sites/instagram/index.html",
    "sites/twitter/index.html",
    "sites/qwikster/index.html",
    "sites/playable/game.html",
    "sites/playable/famous.html",
    "sites/snapchat/index.html",
    "sites/ios5/index.html",
    "sites/imessage/index.html",
    "sites/honeycomb/index.html",
    "sites/ics/index.html",
    "sites/wechat/index.html",
    "sites/line/index.html",
    "sites/temple/index.html",
    "sites/skyrim/index.html",
    "sites/nytpaywall/index.html",
    "sites/skypebuy/index.html",
    "sites/grouponipo/index.html",
    "sites/zyngaipo/index.html",
    "sites/googlewallet/index.html",
    "sites/stripe/index.html",
    "sites/codecademy/index.html",
    "sites/nintendo3ds/index.html",
    "sites/psnhack/index.html",
    "sites/chromebook/index.html",
    "sites/icloud/index.html",
    "sites/pinterest/index.html",
    "sites/linkedin/index.html",
    "sites/kindlefire/index.html",
    "sites/minecraft/index.html",
    "sites/twitch/index.html",
    "sites/gmusic/index.html",
    "sites/pandora/index.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "pages/home.html",
    "pages/map.html",
    "pages/checklist.html",
    "pages/about.html",
    "pages/whats-new.html",
    "pages/cool.html"
  ];
  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2011/"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://home.microsoft.com/intl/web2011/" + rooms[i];
    }
  }
  ITT.configs["2011"] = {
    year: "2011",
    home: "pages/home.html",
    prefsKey: "itt-2011-prefs",
    bookmarksKey: "itt-2011-bookmarks",
    connectedKey: "itt-2011-connected",
    immersionScript: "js/immersion-2011.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 8.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2011/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#1e4d78"
    },
    perf: {
      navJitterMax: 50,
      navFixedMax: 40,
      imageBudgetMs: 360,
      imageMinStepMs: 30,
      imageMaxStepMs: 80,
      imageStartMs: 70,
      connectEarlyMs: 100,
      connectLineMs: 160,
      connectBusyMs: 280,
      connectEndMs: 120,
      connectBusyChance: 0.08
    },
    urlMap: urlMap,
    bookmarks: [
      { title: "Starting Point", path: "pages/home.html" },
      { title: "Google+", path: "sites/googleplus/index.html" },
      { title: "Spotify", path: "sites/spotify/index.html" },
      { title: "Siri", path: "sites/iphone/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2011/",
    locationHints: [
      { re: /google\s*\+|gplus|circle/i, path: "sites/googleplus/index.html" },
      { re: /spotify/i, path: "sites/spotify/index.html" },
      { re: /siri/i, path: "sites/iphone/index.html" },
      { re: /timeline|facebook/i, path: "sites/facebook/index.html" },
      { re: /ipad/i, path: "sites/ipad/index.html" },
      { re: /airbnb/i, path: "sites/airbnb/index.html" },
      { re: /instagram/i, path: "sites/instagram/index.html" },
      { re: /twitter/i, path: "sites/twitter/index.html" },
      { re: /qwikster|netflix/i, path: "sites/qwikster/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : global);
