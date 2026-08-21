/**
 * Year config — 2007 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/iphone/index.html",
    "sites/gmail/index.html",
    "sites/maps/index.html",
    "sites/facebook/index.html",
    "sites/twitter/index.html",
    "sites/youtube/index.html",
    "sites/myspace/index.html",
    "sites/digg/index.html",
    "sites/vista/index.html",
    "sites/kindle/index.html",
    "sites/tumblr/index.html",
    "sites/yahoo/index.html",
    "sites/wikipedia/index.html",
    "sites/amazon/index.html",
    "sites/justin/index.html",
    "sites/ustream/index.html",
    "sites/qik/index.html",
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
    "pages/home.html": "http://home.microsoft.com/intl/web2007/",
    "pages/about.html": "http://home.microsoft.com/intl/web2007/about.html",
    "pages/map.html": "http://museum.local/years/2007/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2007/" + rooms[i];
    }
  }

  ITT.configs["2007"] = {
    year: "2007",
    home: "pages/home.html",
    prefsKey: "itt-2007-prefs",
    bookmarksKey: "itt-2007-bookmarks",
    connectedKey: "itt-2007-connected",
    immersionScript: "js/immersion-2007.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 7.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2007/",
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
      { title: "iPhone", path: "sites/iphone/index.html" },
      { title: "Gmail", path: "sites/gmail/index.html" },
      { title: "Street View", path: "sites/maps/index.html" },
      { title: "Facebook", path: "sites/facebook/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2007/",
    locationHints: [
      { re: /iphone|apple\.com\/iphone/i, path: "sites/iphone/index.html" },
      { re: /gmail/i, path: "sites/gmail/index.html" },
      { re: /street.?view|maps\.google/i, path: "sites/maps/index.html" },
      { re: /facebook/i, path: "sites/facebook/index.html" },
      { re: /twitter/i, path: "sites/twitter/index.html" },
      { re: /youtube/i, path: "sites/youtube/index.html" },
      { re: /myspace/i, path: "sites/myspace/index.html" },
      { re: /digg/i, path: "sites/digg/index.html" },
      { re: /vista|windows/i, path: "sites/vista/index.html" },
      { re: /kindle/i, path: "sites/kindle/index.html" },
      { re: /tumblr/i, path: "sites/tumblr/index.html" },
      { re: /yahoo/i, path: "sites/yahoo/index.html" },
      { re: /wikipedia/i, path: "sites/wikipedia/index.html" },
      { re: /amazon/i, path: "sites/amazon/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
