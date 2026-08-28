/**
 * Year config — 2016 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/smario/index.html",
    "sites/assistant/index.html",
    "sites/houseparty/index.html",
    "sites/inbox/index.html",
    "sites/linkedinms/index.html",
    "sites/jio/index.html",
    "sites/playable/extra-i.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-f.html",
    "sites/vine/about.html",
    "sites/musically/about.html",
    "sites/youtube/about.html",
    "sites/netflix/about.html",
    "sites/reddit/about.html",
    "sites/whatsapp/about.html",
    "sites/facebook/about.html",
    "sites/pokemongo/about.html",
    "sites/instagram/about.html",
    "sites/win10end/index.html",
    "sites/spectabout/index.html",
    "sites/iphone7about/index.html",
    "sites/e2eabout/index.html",
    "sites/reactabout/index.html",
    "sites/storyabout/index.html",
    "sites/pogoabout/index.html",
    "sites/superbowl/index.html",
    "sites/alphago/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "sites/slack/index.html",
    "sites/fblive/index.html",
    "sites/moments/index.html",

    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/instagram/stories.html",
    "sites/instagram/archive.html",
    "sites/pokemongo/index.html",
    "sites/facebook/reactions.html",
    "sites/whatsapp/e2e.html",
    "sites/iphone/index.html",
    "sites/iphone/airpods.html",
    "sites/vine/index.html",
    "sites/vine/goodbye.html",
    "sites/snapchat/index.html",
    "sites/snapchat/spectacles.html",
    "sites/musically/index.html",
    "sites/windows10/end.html",
    "sites/dyn/index.html",
    "sites/reddit/index.html",
    "sites/netflix/index.html",
    "sites/youtube/index.html",
    "sites/playable/game.html",
    "sites/playable/game-5.html",
    "sites/playable/game-4.html",
    "sites/playable/game-3.html",
    "sites/playable/game-2.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2016/",
    "pages/about.html": "http://home.microsoft.com/intl/web2016/about.html",
    "pages/map.html": "http://museum.local/years/2016/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2016/" + rooms[i];
    }
  }

  ITT.configs["2016"] = {
    year: "2016",
    storagePrefix: "itt16",
    home: "pages/home.html",
    prefsKey: "itt-2016-prefs",
    bookmarksKey: "itt-2016-bookmarks",
    connectedKey: "itt-2016-connected",
    immersionScript: "js/immersion-2016.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2016/",
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
      { title: "Instagram Stories", path: "sites/instagram/stories.html" },
      { title: "Pokémon GO", path: "sites/pokemongo/index.html" },
      { title: "Reactions", path: "sites/facebook/reactions.html" },
      { title: "WhatsApp E2E", path: "sites/whatsapp/e2e.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2016/",
    locationHints: [
      { re: /mario.?run|super.?mario/i, path: "sites/smario/index.html" },
      { re: /assistant|ok.?google|pixel/i, path: "sites/assistant/index.html" },
      { re: /houseparty/i, path: "sites/houseparty/index.html" },
      { re: /\binbox\b/i, path: "sites/inbox/index.html" },
      { re: /linkedin/i, path: "sites/linkedinms/index.html" },
      { re: /\bjio\b/i, path: "sites/jio/index.html" },
      { re: /stor(y|ies)|instagram/i, path: "sites/instagram/stories.html" },
      { re: /pokemon|pogo|go/i, path: "sites/pokemongo/index.html" },
      { re: /react|haha|wow/i, path: "sites/facebook/reactions.html" },
      { re: /whatsapp|e2e|encrypt/i, path: "sites/whatsapp/e2e.html" },
      { re: /iphone.?7|jack|dongle/i, path: "sites/iphone/index.html" },
      { re: /airpod/i, path: "sites/iphone/airpods.html" },
      { re: /vine/i, path: "sites/vine/goodbye.html" },
      { re: /spectacle|snapbot/i, path: "sites/snapchat/spectacles.html" },
      { re: /musical|tiktok/i, path: "sites/musically/index.html" },
      { re: /windows.?10|win10|upgrade/i, path: "sites/windows10/end.html" },
      { re: /dyn|mirai|ddos/i, path: "sites/dyn/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
