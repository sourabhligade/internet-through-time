/**
 * Year config — 2020 CUT-OPEN lean door
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "index.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/zoom/meeting.html",
    "sites/reels/index.html",
    "sites/openai/index.html",
    "sites/flash/index.html",
    "sites/tiktok/index.html",
    "sites/markets/wti.html",
    "sites/edge/index.html",
    "sites/ccpa/index.html",
    "sites/chrome/index.html",
    "sites/playable/game.html",
    "sites/youtube/index.html",
    "sites/wikipedia/index.html",
    "sites/facebook/index.html",
    "sites/teams/index.html",
    "sites/vine/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2020/",
    "pages/about.html": "http://home.microsoft.com/intl/web2020/about.html",
    "pages/map.html": "http://museum.local/years/2020/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2020/" + rooms[i];
    }
  }

  ITT.configs["2020"] = {
    year: "2020",
    storagePrefix: "itt20",
    home: "pages/home.html",
    prefsKey: "itt-2020-prefs",
    bookmarksKey: "itt-2020-bookmarks",
    connectedKey: "itt-2020-connected",
    immersionScript: "js/immersion-2020.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2020/",
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
      { title: "Zoom Leave", path: "sites/zoom/meeting.html" },
      { title: "Reels", path: "sites/reels/index.html" },
      { title: "GPT-3 waitlist", path: "sites/openai/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2020/",
    locationHints: [
      { re: /zoom|mute|leave|meeting/i, path: "sites/zoom/meeting.html" },
      { re: /reels/i, path: "sites/reels/index.html" },
      { re: /gpt-?3|openai|waitlist/i, path: "sites/openai/index.html" },
      { re: /flash/i, path: "sites/flash/index.html" },
      { re: /tiktok|eo/i, path: "sites/tiktok/index.html" },
      { re: /wti|oil/i, path: "sites/markets/wti.html" },
      { re: /edge/i, path: "sites/edge/index.html" },
      { re: /ccpa/i, path: "sites/ccpa/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
