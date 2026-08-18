/**
 * Year config — 2012 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/vinewait/index.html",
    "sites/tinderswipe/index.html",
    "sites/pinterestpublic/index.html",

    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/instagram/index.html",
    "sites/instagram/android.html",
    "sites/instagram/acquired.html",
    "sites/facebook/index.html",
    "sites/facebook/ipo.html",
    "sites/pinterest/index.html",
    "sites/iphone/index.html",
    "sites/iphone/maps.html",
    "sites/ipad/index.html",
    "sites/windows8/index.html",
    "sites/chrome/index.html",
    "sites/wikipedia/index.html",
    "sites/youtube/index.html",
    "sites/uber/index.html",
    "sites/snapchat/index.html",
    "sites/tinder/index.html",
    "sites/googledrive/index.html",
    "sites/android/index.html",
    "sites/soundcloud/index.html",
    "sites/reddit/index.html",
    "sites/twitter/index.html",
    "sites/google/index.html",
    "sites/playable/game-2.html",
    "sites/playable/game-3.html",
    "sites/playable/game-4.html",
    "sites/playable/game-5.html",
    "sites/playable/game.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html",
    "sites/medium/index.html",
    "sites/path/index.html",
    "sites/flipboard/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2012/",
    "pages/about.html": "http://home.microsoft.com/intl/web2012/about.html",
    "pages/map.html": "http://museum.local/years/2012/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2012/" + rooms[i];
    }
  }

  ITT.configs["2012"] = {
    year: "2012",
    home: "pages/home.html",
    prefsKey: "itt-2012-prefs",
    bookmarksKey: "itt-2012-bookmarks",
    connectedKey: "itt-2012-connected",
    immersionScript: "js/immersion-2012.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 9.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2012/",
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
      { title: "Instagram Android", path: "sites/instagram/android.html" },
      { title: "Facebook IPO", path: "sites/facebook/ipo.html" },
      { title: "Pinterest", path: "sites/pinterest/index.html" },
      { title: "iPhone 5", path: "sites/iphone/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2012/",
    locationHints: [
      { re: /instagram|instagr\.am/i, path: "sites/instagram/android.html" },
      { re: /ipo|nasdaq|facebook\.com/i, path: "sites/facebook/ipo.html" },
      { re: /pinterest/i, path: "sites/pinterest/index.html" },
      { re: /iphone|lightning/i, path: "sites/iphone/index.html" },
      { re: /maps\.apple|apple maps/i, path: "sites/iphone/maps.html" },
      { re: /ipad|mini/i, path: "sites/ipad/index.html" },
      { re: /windows.?8|metro/i, path: "sites/windows8/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /sopa|pipa|wikipedia/i, path: "sites/wikipedia/index.html" },
      { re: /youtube|gangnam/i, path: "sites/youtube/index.html" },
      { re: /uber/i, path: "sites/uber/index.html" },
      { re: /snapchat/i, path: "sites/snapchat/index.html" },
      { re: /tinder/i, path: "sites/tinder/index.html" },
      { re: /drive|docs\.google/i, path: "sites/googledrive/index.html" },
      { re: /android|jelly|now/i, path: "sites/android/index.html" },
      { re: /soundcloud/i, path: "sites/soundcloud/index.html" },
      { re: /reddit/i, path: "sites/reddit/index.html" },
      { re: /twitter/i, path: "sites/twitter/index.html" },
      { re: /google/i, path: "sites/google/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
