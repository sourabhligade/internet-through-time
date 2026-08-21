/**
 * Year config — 2017 lean from-scratch
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
    "sites/snapipo/index.html",
    "sites/bitcoinath/index.html",
    "sites/echoshow/index.html",

    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/iphone/x.html",
    "sites/iphone/animoji.html",
    "sites/fortnite/index.html",
    "sites/twitter/280.html",
    "sites/teams/index.html",
    "sites/vine/gone.html",
    "sites/switch/index.html",
    "sites/wannacry/index.html",
    "sites/equifax/index.html",
    "sites/musically/index.html",
    "sites/reddit/index.html",
    "sites/youtube/index.html",
    "sites/amazon/index.html",
    "sites/playable/game.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2017/",
    "pages/about.html": "http://home.microsoft.com/intl/web2017/about.html",
    "pages/map.html": "http://museum.local/years/2017/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2017/" + rooms[i];
    }
  }

  ITT.configs["2017"] = {
    year: "2017",
    storagePrefix: "itt17",
    home: "pages/home.html",
    prefsKey: "itt-2017-prefs",
    bookmarksKey: "itt-2017-bookmarks",
    connectedKey: "itt-2017-connected",
    immersionScript: "js/immersion-2017.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 11 / Edge residual...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2017/",
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
      { title: "Face ID / iPhone X", path: "sites/iphone/x.html" },
      { title: "Fortnite BR", path: "sites/fortnite/index.html" },
      { title: "Twitter 280", path: "sites/twitter/280.html" },
      { title: "Teams GA", path: "sites/teams/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2017/",
    locationHints: [
      { re: /face.?id|iphone.?x|animoji|no.?home/i, path: "sites/iphone/x.html" },
      { re: /fortnite|battle.?royale|storm|bus/i, path: "sites/fortnite/index.html" },
      { re: /280|twitter|tweet/i, path: "sites/twitter/280.html" },
      { re: /teams|office.?365/i, path: "sites/teams/index.html" },
      { re: /vine/i, path: "sites/vine/gone.html" },
      { re: /switch|nintendo/i, path: "sites/switch/index.html" },
      { re: /wanna|ransomware|nhs/i, path: "sites/wannacry/index.html" },
      { re: /equifax|freeze|credit/i, path: "sites/equifax/index.html" },
      { re: /musical|tiktok/i, path: "sites/musically/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
