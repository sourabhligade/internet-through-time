/**
 * Immersion feature registry — single source of truth per year.
 * SRP: which modules load for which year (data only).
 * Add a year here; do NOT copy FEATURES maps into immersion-199x.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  /** @type {Object.<string, string[]>} paths relative to js/ */
  ITT.IMMERSION_FEATURES_BY_YEAR = {
    "1994": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/geocities.js",
      "immersion/media-1994.js"
    ],
    "1995": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js"
    ],
    "1996": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/hotmail.js",
      "immersion/geocities.js",
      "immersion/plugin.js",
      "immersion/yahoo.js"
    ],
    "1997": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js"
    ],
    "1998": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/hotmail.js",
      "immersion/plugin.js"
    ],
    "1999": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/napster.js",
      "immersion/blogger.js",
      "immersion/plugin.js"
    ],
    "2000": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/napster.js",
      "immersion/blogger.js",
      "immersion/plugin.js"
    ],
    "2002": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/blogger.js",
      "immersion/friendster.js",
      "immersion/kazaa.js"
    ],
    "2001": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/napster.js",
      "immersion/blogger.js"
    ],
    "2003": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/blogger.js",
      "immersion/friendster.js",
      "immersion/kazaa.js",
      "immersion/myspace.js",
      "immersion/itunes.js",
      "immersion/wordpress.js",
      "immersion/linkedin.js"
    ],
    "2004": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/blogger.js",
      "immersion/friendster.js",
      "immersion/myspace.js",
      "immersion/gmail.js",
      "immersion/facebook.js",
      "immersion/flickr.js"
    ],
    "2005": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/blogger.js",
      "immersion/friendster.js",
      "immersion/myspace.js",
      "immersion/gmail.js",
      "immersion/facebook.js",
      "immersion/flickr.js",
      "immersion/youtube.js",
      "immersion/maps.js",
      "immersion/reddit.js",
      "immersion/digg.js",
      "immersion/podcasts.js"
    ]
  };

  ITT.immersionConfigFile = function (year) {
    return "immersion-" + year + ".js";
  };
})(typeof window !== "undefined" ? window : this);
