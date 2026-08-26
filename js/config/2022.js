/**
 * Year config — 2022 lean from-scratch
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
    "sites/cohere/index.html",
    "sites/jasper/index.html",
    "sites/runwaygen1/index.html",
    "sites/stabilityhq/index.html",
    "sites/bereal/about.html",
    "sites/mastodon/about.html",
    "sites/facebook/about.html",
    "sites/wikipedia/about.html",
    "sites/youtube/about.html",
    "sites/stablediffusion/about.html",
    "sites/wordle/about.html",
    "sites/twitter/about.html",
    "sites/chatgpt/about.html",
    "sites/copilot22/index.html",
    "sites/cail22/index.html",
    "sites/notion22/index.html",
    "sites/win10n22/index.html",
    "sites/chrome22/index.html",
    "sites/berealabout/index.html",
    "sites/mastoabout/index.html",
    "sites/dalleabout/index.html",
    "sites/gptabout/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/chatgpt/index.html",
    "sites/twitter/index.html",
    "sites/wordle/index.html",
    "sites/stablediffusion/index.html",
    "sites/mastodon/index.html",
    "sites/bereal/index.html",
    "sites/dalle2/index.html",
    "sites/chrome/index.html",
    "sites/windows10/index.html",
    "sites/youtube/index.html",
    "sites/wikipedia/index.html",
    "sites/facebook/index.html",
    "sites/tiktok/index.html",
    "sites/midjourney/index.html",
    "sites/lensa/index.html",
    "sites/playable/game.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html"
  ];

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
      { title: "ChatGPT", path: "sites/chatgpt/index.html" },
      { title: "Twitter leftover", path: "sites/twitter/index.html" },
      { title: "Wordle leftover", path: "sites/wordle/index.html" },
      { title: "Stable Diffusion leftover", path: "sites/stablediffusion/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2022/",
    locationHints: [
      { re: /chatgpt|openai|prompt|gpt/i, path: "sites/chatgpt/index.html" },
      { re: /twitter|bird|musk/i, path: "sites/twitter/index.html" },
      { re: /wordle|nyt|times/i, path: "sites/wordle/index.html" },
      { re: /stable.?diffusion|dreamstudio|openrail/i, path: "sites/stablediffusion/index.html" },
      { re: /mastodon/i, path: "sites/mastodon/index.html" },
      { re: /bereal/i, path: "sites/bereal/index.html" },
      { re: /dall/i, path: "sites/dalle2/index.html" },
      { re: /prompt box|playable|game/i, path: "sites/playable/game.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
