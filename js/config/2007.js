/**
 * Year config — 2007 lean from-scratch
 * Do not restore the leftover urlMap forest.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/iphone/index.html",
    "sites/gmail/index.html",
    "sites/maps/index.html",
    "sites/facebook/index.html",
    "sites/twitter/index.html",
    "sites/youtube/index.html",
    "sites/myspace/index.html",
    "sites/digg/index.html",
    "sites/vista/index.html",
    "sites/tumblr/index.html",
    "sites/kindle/index.html",
    "sites/kindlestore/index.html",
    "sites/friendfeed/index.html",
    "sites/justintv/index.html",
    "sites/ustream/index.html",
    "sites/qik/index.html",
    "sites/etsy/index.html",
    "sites/netflix/index.html",
    "sites/hulu/index.html",
    "sites/opensocial/index.html",
    "sites/rickroll/index.html",
    "sites/iphone/specs.html",
    "sites/playable/index.html",
    "sites/playable/game.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-c.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-e.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2007/",
    "pages/about.html": "http://home.microsoft.com/intl/web2007/about.html",
    "pages/map.html": "http://museum.local/years/2007/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2007/" + rooms[i];
    }
  }

  ITT.configs["2007"] = {
    year: "2007",
    home: "pages/home.html",
    prefsKey: "itt-2007-prefs",
    bookmarksKey: "itt-2007-bookmarks",
    connectedKey: "itt-2007-connected",
    immersionScript: "js/immersion-2007.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 7.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2007/",
      homePath: "pages/home.html"
    },
    urlMap: urlMap
  };
})(typeof window !== "undefined" ? window : this);
