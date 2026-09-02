/**
 * Immersion feature registry — single source of truth per year.
 * SRP: which modules load for which year (data only) + register helpers.
 * Add a year here; do NOT copy FEATURES maps into immersion-199x.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  /** Feature list for Immersion.create orchestrator */
  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);

  /**
   * Push a feature spec { id, needs?, init }.
   * Prefer this over bare ImmersionFeatures.push in new modules.
   */
  features.register = function (spec) {
    features.push(spec);
    return spec;
  };

  /**
   * Register a page-local boot feature (digg/reddit/maps style).
   * Single IIFE responsibility: define boot + register + once-guard.
   *
   * @param {object} opts
   * @param {string} opts.id feature id
   * @param {function} opts.boot function(doc)
   * @param {string} [opts.ns] expose as ITT[ns] (default: id)
   * @param {string} [opts.featureKey] cfg.features key (default: id)
   * @param {boolean} [opts.autoBoot=true] DOM-ready boot for standalone pages
   */
  features.registerLocal = function (opts) {
    if (!opts || !opts.id || typeof opts.boot !== "function") {
      throw new Error("ImmersionFeatures.registerLocal requires id + boot");
    }
    var id = opts.id;
    var ns = opts.ns || id;
    var featureKey = opts.featureKey || id;
    var boot = opts.boot;
    var autoBoot = opts.autoBoot !== false;
    var attr = "data-itt-feat-" + id;

    function bootOnce(doc) {
      doc = doc || document;
      try {
        if (doc.documentElement && doc.documentElement.getAttribute(attr) === "1") return;
        if (doc.documentElement) doc.documentElement.setAttribute(attr, "1");
      } catch (e) { /* */ }
      boot(doc);
    }

    ITT[ns] = { boot: bootOnce };
    features.push({
      id: id,
      needs: function (cfg) {
        return !cfg.features || cfg.features[featureKey] !== false;
      },
      init: function () {
        bootOnce(document);
      }
    });

    if (autoBoot) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
          bootOnce(document);
        });
      } else {
        bootOnce(document);
      }
    }
    return bootOnce;
  };

  var CORE = [
    "immersion/shared.js",
    "immersion/residual-placard.js",
    "immersion/real-gate.js",
    "immersion/residual-real.js",
    "immersion/real-flow.js",
    "immersion/year-extras-kit.js",
    "immersion/year-5x-pack.js",
    "immersion/year-true-packs.js",
    "immersion/year-popular-3x.js",
    "immersion/year-true-leftover.js",
    "immersion/leftover-official.js",
    "immersion/year-4x-flows.js",
    "immersion/official-dest-gold.js",
    "immersion/official-verb.js",
    "immersion/flow-map.js",
    "immersion/year-playable.js",
    "config/year-extra-games.js",
    "immersion/guestbook-search.js"
  ];

  /** Per-year product modules after CORE. Keys kept as "YYYY": [ so check-all-years can see them. */
  var EXTRA = {
    "1994": [
      "immersion/geocities.js",
      "immersion/media-1994.js",
      "immersion/one-thing-machines.js",
      "immersion/source-flows.js"
    ],
    "1995": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/one-thing-machines.js"
    ],
    "1996": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/hotmail.js",
      "immersion/geocities.js",
      "immersion/plugin.js",
      "immersion/yahoo.js",
      "immersion/excite.js",
      "immersion/one-thing-machines.js"
    ],
    "1997": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/hotmail.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/yahoo.js",
      "immersion/icq.js",
      "immersion/one-thing-machines.js"
    ],
    "1998": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/hotmail.js",
      "immersion/plugin.js",
      "immersion/source-flows.js"
    ],
    "1999": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/napster.js",
      "immersion/blogger.js",
      "immersion/plugin.js",
      "immersion/aim.js",
      "immersion/sourceforge.js"
    ],
    "2000": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/napster.js",
      "immersion/blogger.js",
      "immersion/plugin.js",
      "immersion/mapquest.js"
    ],
    "2001": [
      "immersion/wikipedia.js",
      "immersion/napster.js",
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/amazon.js",
      "immersion/blogger.js",
      "immersion/one-thing-machines.js"
    ],
    "2002": [
      "immersion/stumbleupon.js",
      "immersion/friendster.js",
      "immersion/kazaa.js",
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/amazon.js",
      "immersion/blogger.js",
      "immersion/technorati.js",
      "immersion/netflix.js",
      "immersion/one-thing-machines.js"
    ],
    "2003": [
      "immersion/photobucket.js",
      "immersion/itunes.js",
      "immersion/wordpress.js",
      "immersion/linkedin.js",
      "immersion/myspace.js",
      "immersion/friendster.js",
      "immersion/adsense.js",
      "immersion/bloglines.js",
      "immersion/blogger.js",
      "immersion/delicious.js",
      "immersion/google.js",
      "immersion/one-thing-machines.js"
    ],
    "2004": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/napster.js",
      "immersion/blogger.js",
      "immersion/plugin.js",
      "immersion/friendster.js",
      "immersion/kazaa.js",
      "immersion/myspace.js",
      "immersion/itunes.js",
      "immersion/wordpress.js",
      "immersion/linkedin.js",
      "immersion/adsense.js",
      "immersion/bloglines.js",
      "immersion/gmail.js",
      "immersion/facebook.js",
      "immersion/flickr.js",
      "immersion/digg.js",
      "immersion/technorati.js",
      "immersion/delicious.js",
      "immersion/orkut.js",
      "immersion/livejournal.js",
      "immersion/craigslist.js",
      "immersion/netflix.js",
      "immersion/one-thing-machines.js",
      "immersion/source-flows.js"
    ],
    "2006": [
      "immersion/year-2006-extras.js",
      "immersion/twitter.js",
      "immersion/youtube.js",
      "immersion/maps.js",
      "immersion/facebook.js",
      "immersion/digg.js",
      "immersion/gmail.js",
      "immersion/flickr.js",
      "immersion/amazon.js",
      "immersion/one-thing-machines.js",
      "immersion/source-flows.js"
    ],
    "2005": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/napster.js",
      "immersion/blogger.js",
      "immersion/plugin.js",
      "immersion/friendster.js",
      "immersion/kazaa.js",
      "immersion/myspace.js",
      "immersion/itunes.js",
      "immersion/wordpress.js",
      "immersion/linkedin.js",
      "immersion/adsense.js",
      "immersion/bloglines.js",
      "immersion/gmail.js",
      "immersion/facebook.js",
      "immersion/flickr.js",
      "immersion/digg.js",
      "immersion/youtube.js",
      "immersion/maps.js",
      "immersion/reddit.js",
      "immersion/pandora.js",
      "immersion/podcasts.js",
      "immersion/housingmaps.js",
      "immersion/reader.js",
      "immersion/technorati.js",
      "immersion/delicious.js",
      "immersion/orkut.js",
      "immersion/livejournal.js",
      "immersion/craigslist.js",
      "immersion/netflix.js",
      "immersion/one-thing-machines.js",
      "immersion/source-flows.js"
    ],
    "2008": [
      "immersion/amazon.js",
      "immersion/auction.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/technorati.js",
      "immersion/google.js",
      "immersion/excite.js",
      "immersion/yahoo.js",
      "immersion/napster.js",
      "immersion/blogger.js",
      "immersion/plugin.js",
      "immersion/friendster.js",
      "immersion/kazaa.js",
      "immersion/myspace.js",
      "immersion/itunes.js",
      "immersion/wordpress.js",
      "immersion/linkedin.js",
      "immersion/adsense.js",
      "immersion/bloglines.js",
      "immersion/gmail.js",
      "immersion/facebook.js",
      "immersion/flickr.js",
      "immersion/youtube.js",
      "immersion/maps.js",
      "immersion/reddit.js",
      "immersion/digg.js",
      "immersion/podcasts.js",
      "immersion/delicious.js",
      "immersion/housingmaps.js",
      "immersion/feedburner.js",
      "immersion/twitter.js",
      "immersion/docs.js",
      "immersion/aws.js",
      "immersion/reader.js",
      "immersion/iphone.js",
      "immersion/netflix.js",
      "immersion/appstore.js",
      "immersion/chrome-browser.js",
      "immersion/android.js",
      "immersion/hulu.js",
      "immersion/github.js"
    ],
    "2009": [
      "immersion/year-2009-extras.js",
      "immersion/farmville.js",
      "immersion/bing.js",
      "immersion/appstore.js",
      "immersion/one-thing-machines.js"
    ],
        "2010": [
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/facebook.js",
      "immersion/youtube.js",
      "immersion/twitter.js",
      "immersion/digg.js",
      "immersion/iphone.js",
      "immersion/android.js",
      "immersion/chrome-browser.js",
      "immersion/farmville.js",
      "immersion/foursquare.js",
      "immersion/wave.js",
      "immersion/instagram.js",
      "immersion/imgur.js",
      "immersion/pinterest.js",
      "immersion/year-2010-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2011": [
      "immersion/year-2011-extras.js",
      "immersion/spotify.js",
      "immersion/one-thing-machines.js"
    ],
        "2012": [
      "immersion/youtube.js",
      "immersion/twitter.js",
      "immersion/year-2012-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2013": [
      "immersion/year-2013-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2014": [
      "immersion/year-2014-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2015": [
      "immersion/no-mock-common.js",
      "immersion/year-2015-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2016": [
      "immersion/no-mock-common.js",
      "immersion/year-2016-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2017": [
      "immersion/no-mock-common.js",
      "immersion/year-2017-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2018": [
      "immersion/no-mock-common.js",
      "immersion/year-2018-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2019": [
      "immersion/no-mock-common.js",
      "immersion/year-2019-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2007": [
      "immersion/no-mock-common.js",
      "immersion/one-thing-machines.js"
    ],
    "2021": [
      "immersion/no-mock-common.js",
      "immersion/year-2021-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2023": [
      "immersion/no-mock-common.js",
      "immersion/one-thing-machines.js"
    ],
    "2024": [
      "immersion/no-mock-common.js",
      "immersion/one-thing-machines.js"
    ],
    "2020": [
      "immersion/no-mock-common.js",
      "immersion/year-2020-extras.js",
      "immersion/one-thing-machines.js"
    ],
    "2022": [
      "immersion/no-mock-common.js",
      "immersion/one-thing-machines.js"
    ]};

  ITT.IMMERSION_FEATURES_BY_YEAR = {};
  (function buildYearLists() {
    var y;
    for (y in EXTRA) {
      if (!Object.prototype.hasOwnProperty.call(EXTRA, y)) continue;
      ITT.IMMERSION_FEATURES_BY_YEAR[y] = CORE.concat(EXTRA[y]);
    }
  })();

  /* Ten link-flows: load before flow-map so map pages can list them. */
  (function insertFlowTrails() {
    var map = ITT.IMMERSION_FEATURES_BY_YEAR;
    var y;
    for (y in map) {
      if (!Object.prototype.hasOwnProperty.call(map, y)) continue;
      var list = map[y];
      var i;
      var has = false;
      var before = -1;
      for (i = 0; i < list.length; i++) {
        if (list[i] === "immersion/flow-trails.js") has = true;
        if (list[i] === "immersion/flow-map.js" && before < 0) before = i;
      }
      if (has) continue;
      if (before >= 0) list.splice(before, 0, "immersion/flow-trails.js");
      else list.push("immersion/flow-trails.js");
    }
  })();

  ITT.immersionConfigFile = function (year) {
    return "immersion-" + year + ".js";
  };
})(typeof window !== "undefined" ? window : this);
