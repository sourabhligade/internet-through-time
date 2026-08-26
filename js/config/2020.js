/**
 * Year config — 2020 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/playable/extra-i.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-f.html",
    "sites/acnh/about.html",
    "sites/meet/about.html",
    "sites/facebook/about.html",
    "sites/wikipedia/about.html",
    "sites/youtube/about.html",
    "sites/flash/about.html",
    "sites/openai/about.html",
    "sites/reels/lx.html",
    "sites/zoom/lx.html",
    "sites/tteo/index.html",
    "sites/zoomabout/index.html",
    "sites/amongabout/index.html",
    "sites/ccpaabout/index.html",
    "sites/edge79about/index.html",
    "sites/wtiabout/index.html",
    "sites/flashabout/index.html",
    "sites/gpt3about/index.html",
    "sites/reelsabout/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/zoom/index.html",
    "sites/zoom/meeting.html",
    "sites/zoom/recap.html",
    "sites/zoom/about.html",
    "sites/reels/index.html",
    "sites/reels/record.html",
    "sites/reels/about.html",
    "sites/openai/index.html",
    "sites/openai/wait.html",
    "sites/flash/index.html",
    "sites/flash/eol.html",
    "sites/tiktok/index.html",
    "sites/tiktok/eo.html",
    "sites/markets/wti.html",
    "sites/edge/index.html",
    "sites/ccpa/index.html",
    "sites/meet/index.html",
    "sites/chrome/index.html",
    "sites/windows10/index.html",
    "sites/youtube/index.html",
    "sites/wikipedia/index.html",
    "sites/facebook/index.html",
    "sites/hbomax/index.html",
    "sites/peacock/index.html",
    "sites/epic/index.html",
    "sites/spacehey/index.html",
    "sites/mixer/index.html",
    "sites/twitter/hack.html",
    "sites/acnh/index.html",
    "sites/astro/index.html",
    "sites/quibi/index.html",
    "sites/playable/game.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html"
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
      { title: "Zoom meeting", path: "sites/zoom/meeting.html" },
      { title: "Reels 15s", path: "sites/reels/index.html" },
      { title: "GPT-3 waitlist", path: "sites/openai/index.html" },
      { title: "Flash EOL", path: "sites/flash/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2020/",
    locationHints: [
      { re: /zoom|meeting|mute|participants/i, path: "sites/zoom/meeting.html" },
      { re: /reels|15.?sec/i, path: "sites/reels/index.html" },
      { re: /gpt|openai|waitlist/i, path: "sites/openai/index.html" },
      { re: /flash|eol|swf/i, path: "sites/flash/index.html" },
      { re: /tiktok|13942/i, path: "sites/tiktok/index.html" },
      { re: /wti|oil|negative/i, path: "sites/markets/wti.html" },
      { re: /edge.?79|chromium edge/i, path: "sites/edge/index.html" },
      { re: /ccpa|do not sell/i, path: "sites/ccpa/index.html" },
      { re: /meet|teams/i, path: "sites/meet/index.html" },
      { re: /sus vote|among|playable|game/i, path: "sites/playable/game.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
