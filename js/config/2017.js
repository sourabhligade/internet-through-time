/**
 * Year config — 2017 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/airpods17/index.html",
    "sites/android8/index.html",
    "sites/applepark/index.html",
    "sites/bch/index.html",
    "sites/cloudbleed/index.html",
    "sites/cmebtc/index.html",
    "sites/coreml/index.html",
    "sites/creditfrz/index.html",
    "sites/discord17/index.html",
    "sites/facebook2b/index.html",
    "sites/fnstw/index.html",
    "sites/homepodann/index.html",
    "sites/ios11/index.html",
    "sites/iphone8/index.html",
    "sites/odyssey/index.html",
    "sites/pixelbook/index.html",
    "sites/playable/more-c.html",
    "sites/playable/more-d.html",
    "sites/signal17/index.html",
    "sites/slack17/index.html",
    "sites/telegram17/index.html",
    "sites/vault7/index.html",
    "sites/watch3/index.html",
    "sites/xboxonex/index.html",
    "sites/yahoo3b/index.html",
    "sites/zoom17/index.html",
    "sites/youtubetv/index.html",
    "sites/pixel2/index.html",
    "sites/ios11ar/index.html",
    "sites/krack/index.html",
    "sites/nnrepeal/index.html",
    "sites/flashend/index.html",
    "sites/playable/extra-i.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-f.html",
    "sites/wannacry/about.html",
    "sites/amazon/about.html",
    "sites/youtube/about.html",
    "sites/reddit/about.html",
    "sites/switch/about.html",
    "sites/teams/about.html",
    "sites/twitter/about.html",
    "sites/fortnite/about.html",
    "sites/iphone/about.html",
    "sites/pubgnote/index.html",
    "sites/equifaxabout/index.html",
    "sites/wannaabout/index.html",
    "sites/musically17/index.html",
    "sites/t280about/index.html",
    "sites/faceabout/index.html",
    "sites/bitmoji/index.html",
    "sites/hqtrivia/index.html",
    "sites/notpetya/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
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
    browserTitleSuffix: " - Chrome habit",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Chrome habit (museum desktop frame)...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2017/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: false,
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
      { re: /youtube.?tv/i, path: "sites/youtubetv/index.html" },
      { re: /pixel.?2/i, path: "sites/pixel2/index.html" },
      { re: /arkit|ios.?11/i, path: "sites/ios11ar/index.html" },
      { re: /krack|wpa2/i, path: "sites/krack/index.html" },
      { re: /repeal|restore.?internet/i, path: "sites/nnrepeal/index.html" },
      { re: /flash/i, path: "sites/flashend/index.html" },
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
