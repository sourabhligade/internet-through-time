/**
 * Year config — 2023 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/plugins/index.html",
    "sites/codeinterp/index.html",
    "sites/customgpts/index.html",
    "sites/llama2/index.html",
    "sites/dalle3/index.html",
    "sites/myai/index.html",
    "sites/firefly/index.html",
    "sites/m365copilot/index.html",
    "sites/sge/index.html",
    "sites/chatgptios/index.html",
    "sites/mixtral/index.html",
    "sites/grok23/index.html",
    "sites/gemannounce/index.html",
    "sites/vpannounce/index.html",
    "sites/sdxl/index.html",
    "sites/gen2/index.html",
    "sites/gpt4turbo/index.html",
    "sites/nytvopenai/index.html",
    "sites/tiktok/about.html",
    "sites/facebook/about.html",
    "sites/wikipedia/about.html",
    "sites/youtube/about.html",
    "sites/twitter/about.html",
    "sites/threads/about.html",
    "sites/bard/about.html",
    "sites/bing/about.html",
    "sites/chatgpt/about.html",
    "sites/threadsabout/index.html",
    "sites/bardabout/index.html",
    "sites/plusabout/index.html",
    "sites/beacons/index.html",
    "sites/notionai/index.html",
    "sites/bluesky/index.html",
    "sites/copilotx/index.html",
    "sites/characterai/index.html",
    "sites/claude2/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/chatgpt/plus.html",
    "sites/chatgpt/gpt4.html",
    "sites/bing/chat.html",
    "sites/bard/index.html",
    "sites/threads/index.html",
    "sites/twitter/x.html",
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
    "pages/home.html": "http://home.microsoft.com/intl/web2023/",
    "pages/about.html": "http://home.microsoft.com/intl/web2023/about.html",
    "pages/map.html": "http://museum.local/years/2023/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2023/" + rooms[i];
    }
  }

  ITT.configs["2023"] = {
    year: "2023",
    storagePrefix: "itt23",
    home: "pages/home.html",
    prefsKey: "itt-2023-prefs",
    bookmarksKey: "itt-2023-bookmarks",
    connectedKey: "itt-2023-connected",
    immersionScript: "js/immersion-2023.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2023/",
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
      { title: "ChatGPT Plus", path: "sites/chatgpt/plus.html" },
      { title: "Twitter leftover", path: "sites/twitter/index.html" },
      { title: "Wordle leftover", path: "sites/wordle/index.html" },
      { title: "Stable Diffusion leftover", path: "sites/stablediffusion/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2023/",
    locationHints: [
      { re: /chatgpt|plus|openai|prompt|gpt/i, path: "sites/chatgpt/plus.html" },
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
