/**
 * Year config — 2015 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "sites/meerkatlive/index.html",
    "sites/applemusicsub/index.html",
    "sites/win10get/index.html",

    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/periscope/index.html",
    "sites/periscope/watch.html",
    "sites/googlephotos/index.html",
    "sites/googlephotos/library.html",
    "sites/windows10/index.html",
    "sites/windows10/upgrade.html",
    "sites/applemusic/index.html",
    "sites/applemusic/beats1.html",
    "sites/edge/index.html",
    "sites/apple/watch.html",
    "sites/apple/faces.html",
    "sites/apple/pair.html",
    "sites/ios9/blockers.html",
    "sites/letsencrypt/index.html",
    "sites/snapchat/index.html",
    "sites/snapchat/discover.html",
    "sites/discord/index.html",
    "sites/echo/index.html",
    "sites/meerkat/index.html",
    "sites/fblive/index.html",
    "sites/playable/game.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html",
    "sites/instagram/index.html",
    "sites/spotify/index.html",
    "sites/netflix/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2015/",
    "pages/about.html": "http://home.microsoft.com/intl/web2015/about.html",
    "pages/map.html": "http://museum.local/years/2015/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2015/" + rooms[i];
    }
  }

  ITT.configs["2015"] = {
    year: "2015",
    storagePrefix: "itt15",
    home: "pages/home.html",
    prefsKey: "itt-2015-prefs",
    bookmarksKey: "itt-2015-bookmarks",
    connectedKey: "itt-2015-connected",
    immersionScript: "js/immersion-2015.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2015/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#1b2838"
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
      { title: "Periscope", path: "sites/periscope/index.html" },
      { title: "Google Photos", path: "sites/googlephotos/index.html" },
      { title: "Windows 10", path: "sites/windows10/index.html" },
      { title: "Apple Music", path: "sites/applemusic/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2015/",
    locationHints: [
      { re: /periscope|go.?live/i, path: "sites/periscope/index.html" },
      { re: /photos|google.?photos/i, path: "sites/googlephotos/index.html" },
      { re: /windows.?10|win10|gwx/i, path: "sites/windows10/index.html" },
      { re: /apple.?music|beats/i, path: "sites/applemusic/index.html" },
      { re: /edge|spartan/i, path: "sites/edge/index.html" },
      { re: /watch|wrist/i, path: "sites/apple/watch.html" },
      { re: /blocker|ios.?9/i, path: "sites/ios9/blockers.html" },
      { re: /encrypt|lets.?encrypt|https/i, path: "sites/letsencrypt/index.html" },
      { re: /discover|snap/i, path: "sites/snapchat/discover.html" },
      { re: /discord/i, path: "sites/discord/index.html" },
      { re: /echo|alexa/i, path: "sites/echo/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
