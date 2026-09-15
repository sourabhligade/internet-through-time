/**
 * Year config — 2017 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
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
    "sites/amazon/about.html",
    "sites/amazon/index.html",
    "sites/bitcoinath/index.html",
    "sites/botw/index.html",
    "sites/cloudbleed/index.html",
    "sites/creditfrz/index.html",
    "sites/cuphead/index.html",
    "sites/discord17/index.html",
    "sites/echoshow/index.html",
    "sites/equifax/index.html",
    "sites/fortnite/about.html",
    "sites/fortnite/index.html",
    "sites/gettingoverit/index.html",
    "sites/hangoutschat/index.html",
    "sites/hollowknight/index.html",
    "sites/hqtrivia/index.html",
    "sites/instagram/index.html",
    "sites/instagram17/index.html",
    "sites/ios11/index.html",
    "sites/iphone/about.html",
    "sites/iphone/animoji.html",
    "sites/iphone/stills/wayback-2017.ico",
    "sites/iphone/x.html",
    "sites/krack/index.html",
    "sites/messengerday/index.html",
    "sites/musically/index.html",
    "sites/notpetya/index.html",
    "sites/pixelbook/index.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-c.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-f.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-i.html",
    "sites/playable/famous.html",
    "sites/playable/game-2.html",
    "sites/playable/game-3.html",
    "sites/playable/game-4.html",
    "sites/playable/game-5.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/playable/more-c.html",
    "sites/playable/more-d.html",
    "sites/pubgnote/index.html",
    "sites/reddit/about.html",
    "sites/reddit/index.html",
    "sites/slack17/index.html",
    "sites/snapipo/index.html",
    "sites/snapmap/index.html",
    "sites/splatoon2/index.html",
    "sites/switch/about.html",
    "sites/switch/index.html",
    "sites/tbh/index.html",
    "sites/teams/about.html",
    "sites/teams/index.html",
    "sites/teams/stills/wayback-2017.ico",
    "sites/twitter/280.html",
    "sites/twitter/about.html",
    "sites/twitter/stills/wayback-2017.ico",
    "sites/twitterlite/index.html",
    "sites/vine/gone.html",
    "sites/wannacry/about.html",
    "sites/wannacry/index.html",
    "sites/xboxonex/index.html",
    "sites/yahoo3b/index.html",
    "sites/youtube/about.html",
    "sites/youtube/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2017/",
    "pages/about.html": "http://home.microsoft.com/intl/web2017/about.html",
    "pages/map.html": "http://museum.local/years/2017/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"};
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
      { title: "Teams GA", path: "sites/teams/index.html" },
      { title: "Leftover-2× WhatsApp Status", path: "sites/whatsapp/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2017/",
    locationHints: [      { re: /snap.?map/i, path: "sites/snapmap/index.html" },
      { re: /botw|breath.?of.?the.?wild|zelda.?wild/i, path: "sites/botw/index.html" },
      { re: /cuphead/i, path: "sites/cuphead/index.html" },
      { re: /krack|wpa2/i, path: "sites/krack/index.html" },
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
