/**
 * Year config — 2022 CUT-OPEN lean door
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "index.html",
    "pages/about.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "pages/home.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/amazon/index.html",
    "sites/bereal/index.html",
    "sites/chatgpt/index.html",
    "sites/dalle2/index.html",
    "sites/facebook/index.html",
    "sites/ftx/index.html",
    "sites/google/index.html",
    "sites/instagram/index.html",
    "sites/instagram/reels.html",
    "sites/ios16/index.html",
    "sites/iphone/14.html",
    "sites/m2/index.html",
    "sites/mastodon/index.html",
    "sites/midjourney/index.html",
    "sites/musk/index.html",
    "sites/netflix/index.html",
    "sites/nyt/index.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/reddit/index.html",
    "sites/stablediff/index.html",
    "sites/temu/index.html",
    "sites/tiktok/index.html",
    "sites/twitter/files.html",
    "sites/twitter/index.html",
    "sites/wikipedia/index.html",
    "sites/windows11/index.html",
    "sites/wordle/index.html",
    "sites/youtube/index.html",
    "sites/youtube/shorts.html"
  ];;;;;

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2022/",
    "pages/about.html": "http://home.microsoft.com/intl/web2022/about.html",
    "pages/map.html": "http://museum.local/years/2022/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2022/" + rooms[i];
    }
  }

  ITT.configs["2022"] = {
    year: "2022",
    storagePrefix: "itt22",
    home: "pages/home.html",
    prefsKey: "itt-2022-prefs",
    bookmarksKey: "itt-2022-bookmarks",
    connectedKey: "itt-2022-connected",
    immersionScript: "js/immersion-2022.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2022/",
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
      { title: "ChatGPT Send", path: "sites/chatgpt/index.html" },
      { title: "Wordle leftover", path: "sites/wordle/index.html" },
      { title: "Twitter bird leftover", path: "sites/twitter/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2022/",
    locationHints: [
      { re: /chatgpt|prompt|openai/i, path: "sites/chatgpt/index.html" },
      { re: /wordle/i, path: "sites/wordle/index.html" },
      { re: /twitter|bird|musk/i, path: "sites/twitter/index.html" },
      { re: /bereal/i, path: "sites/bereal/index.html" },
      { re: /island|iphone/i, path: "sites/iphone/14.html" },
      { re: /ftx/i, path: "sites/ftx/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
