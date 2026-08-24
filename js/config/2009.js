/**
 * Year config — 2009 lean from-scratch
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/facebook/index.html",
    "sites/facebook/feed.html",
    "sites/wolframalpha/index.html",
    "sites/farmville/index.html",
    "sites/bing/index.html",
    "sites/iphone/index.html",
    "sites/appstore/index.html",
    "sites/twitter/index.html",
    "sites/foursquare/index.html",
    "sites/kickstarter/index.html",
    "sites/windows7/index.html",
    "sites/omegle/index.html",
    "sites/chatroulette/index.html",
    "sites/youtube/index.html",
    "sites/wikipedia/index.html",
    "sites/mafiawars/index.html",
    "sites/whatsapp/index.html",
    "sites/ubercab/index.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/famous.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "pages/error/404.html",
    "pages/error/unreachable.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2009/",
    "pages/about.html": "http://home.microsoft.com/intl/web2009/about.html",
    "pages/map.html": "http://museum.local/years/2009/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2009/" + rooms[i];
    }
  }

  ITT.configs["2009"] = {
    year: "2009",
    home: "pages/home.html",
    prefsKey: "itt-2009-prefs",
    bookmarksKey: "itt-2009-bookmarks",
    connectedKey: "itt-2009-connected",
    immersionScript: "js/immersion-2009.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2009/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#3a6ea5"
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
      { title: "Like", path: "sites/facebook/index.html" },
      { title: "FarmVille", path: "sites/farmville/index.html" },
      { title: "Bing", path: "sites/bing/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2009/",
    locationHints: [
      { re: /facebook|like/i, path: "sites/facebook/index.html" },
      { re: /farmville|zynga/i, path: "sites/farmville/index.html" },
      { re: /bing/i, path: "sites/bing/index.html" },
      { re: /iphone|3gs/i, path: "sites/iphone/index.html" },
      { re: /app.?store/i, path: "sites/appstore/index.html" },
      { re: /twitter/i, path: "sites/twitter/index.html" },
      { re: /foursquare/i, path: "sites/foursquare/index.html" },
      { re: /kickstarter/i, path: "sites/kickstarter/index.html" },
      { re: /windows.?7|win7/i, path: "sites/windows7/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
