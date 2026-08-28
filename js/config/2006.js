/**
 * Year config — 2006 lean from-scratch
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
    "sites/facebook/feed.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/famous.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-c.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-e.html",
    "sites/amazon/index.html",
    "sites/aol/index.html",
    "sites/ask/index.html",
    "sites/aws/index.html",
    "sites/bebo/index.html",
    "sites/calendar/index.html",
    "sites/delicious/index.html",
    "sites/digg/index.html",
    "sites/docs/index.html",
    "sites/facebook/index.html",
    "sites/firefox/index.html",
    "sites/flickr/index.html",
    "sites/gmail/index.html",
    "sites/huffpost/index.html",
    "sites/maps/index.html",
    "sites/meebo/index.html",
    "sites/msn/index.html",
    "sites/myspace/index.html",
    "sites/newsvine/index.html",
    "sites/reader/index.html",
    "sites/reddit/index.html",
    "sites/secondlife/index.html",
    "sites/skype/index.html",
    "sites/slideshare/index.html",
    "sites/time-you/index.html",
    "sites/twitter/index.html",
    "sites/wikileaks/index.html",
    "sites/wikipedia/index.html",
    "sites/wordpress/index.html",
    "sites/youtube/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2006/",
    "pages/about.html": "http://home.microsoft.com/intl/web2006/about.html",
    "pages/map.html": "http://museum.local/years/2006/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2006/" + rooms[i];
    }
  }

  ITT.configs["2006"] = {
    year: "2006",
    home: "pages/home.html",
    prefsKey: "itt-2006-prefs",
    bookmarksKey: "itt-2006-bookmarks",
    connectedKey: "itt-2006-connected",
    immersionScript: "js/immersion-2006.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 6.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2006/",
      homePath: "pages/home.html"
    },
    urlMap: urlMap
  };
})(typeof window !== "undefined" ? window : this);
