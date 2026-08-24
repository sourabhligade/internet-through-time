/**
 * Year config — 2021 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/clubhouse/about.html",
    "sites/windows11/about.html",
    "sites/facebook/about.html",
    "sites/wikipedia/about.html",
    "sites/youtube/about.html",
    "sites/meta/about.html",
    "sites/copilot/about.html",
    "sites/signal/about.html",
    "sites/att/about.html",
    "sites/discord21/index.html",
    "sites/robinhood/index.html",
    "sites/opensea/index.html",
    "sites/wordleseed/index.html",
    "sites/win11about/index.html",
    "sites/attabout/index.html",
    "sites/metaabout/index.html",
    "sites/copabout/index.html",
    "sites/sigabout/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/att/index.html",
    "sites/signal/index.html",
    "sites/copilot/index.html",
    "sites/meta/index.html",
    "sites/windows11/index.html",
    "sites/flash/index.html",
    "sites/chrome/index.html",
    "sites/windows10/index.html",
    "sites/youtube/index.html",
    "sites/wikipedia/index.html",
    "sites/facebook/index.html",
    "sites/clubhouse/index.html",
    "sites/nft/index.html",
    "sites/squid/index.html",
    "sites/playable/game.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2021/",
    "pages/about.html": "http://home.microsoft.com/intl/web2021/about.html",
    "pages/map.html": "http://museum.local/years/2021/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2021/" + rooms[i];
    }
  }

  ITT.configs["2021"] = {
    year: "2021",
    storagePrefix: "itt21",
    home: "pages/home.html",
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
      { title: "ATT", path: "sites/att/index.html" },
      { title: "Signal leftover", path: "sites/signal/index.html" },
      { title: "Copilot waitlist", path: "sites/copilot/index.html" },
      { title: "Meta rename", path: "sites/meta/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2021/",
    locationHints: [
      { re: /att|tracking|idfa|14\.5/i, path: "sites/att/index.html" },
      { re: /signal|whatsapp/i, path: "sites/signal/index.html" },
      { re: /copilot|codex|waitlist/i, path: "sites/copilot/index.html" },
      { re: /meta|metaverse|rename/i, path: "sites/meta/index.html" },
      { re: /win(dows)?\s*11/i, path: "sites/windows11/index.html" },
      { re: /flash|brick|swf/i, path: "sites/flash/index.html" },
      { re: /five letter|wordle|playable|game/i, path: "sites/playable/game.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
