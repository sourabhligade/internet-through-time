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
      "immersion/hotmail.js",
      "immersion/geocities.js",
      "immersion/slashdot.js",
      "immersion/yahoo.js"
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
    "2005": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
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
      "immersion/netflix.js"
    ],
    "2006": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
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
      "immersion/netflix.js"
    ],
    "2007": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
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
      "immersion/netflix.js"
    ],
    "2008": [

      "immersion/shared.js",
      "immersion/guestbook-search.js",
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
      "immersion/hulu.js"
    ],
    "2004": [
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
      "immersion/netflix.js"
    ],
    "2003": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
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
      "immersion/netflix.js"
    ],
    "2002": [
      "immersion/shared.js",
      "immersion/guestbook-search.js",
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
      "immersion/netflix.js"
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
      "immersion/blogger.js",
      "immersion/plugin.js"
    ]
  };

  ITT.immersionConfigFile = function (year) {
    return "immersion-" + year + ".js";
  };
})(typeof window !== "undefined" ? window : this);
