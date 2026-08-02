/**
 * Immersion boot — shared loader for all years (SRP: loading only).
 * Year stubs set ITT._immersionYear then load this file.
 *
 * Order: util → (features ‖ year immersion config) → create.js → Immersion.create
 */
(function (global) {
  "use strict";

  var ITT = global.ITT || (global.ITT = {});

  function scriptDirFromLoader() {
    var s = document.currentScript;
    if (s && s.src) {
      // .../js/immersion/boot.js → .../js/
      return s.src.replace(/\/immersion\/[^/]*$/, "/");
    }
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (/\/immersion\/boot\.js(\?|$)/.test(src)) {
        return src.replace(/\/immersion\/[^/]*$/, "/");
      }
      if (/immersion(-\d{4})?\.js(\?|$)/.test(src) && src.indexOf("/immersion/") === -1) {
        return src.replace(/\/[^/]*$/, "/");
      }
    }
    var path = location.pathname || "";
    var idx = path.indexOf("/years/");
    if (idx !== -1) return path.slice(0, idx) + "/js/";
    return "/js/";
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-itt-src="' + src + '"]');
      if (existing) {
        if (existing.getAttribute("data-itt-loaded") === "1") return resolve();
        existing.addEventListener("load", function () { resolve(); });
        existing.addEventListener("error", function () { reject(new Error(src)); });
        return;
      }
      var el = document.createElement("script");
      el.src = src;
      el.async = true;
      el.setAttribute("data-itt-src", src);
      el.onload = function () {
        el.setAttribute("data-itt-loaded", "1");
        resolve();
      };
      el.onerror = function () { reject(new Error("Failed to load " + src)); };
      (document.head || document.documentElement).appendChild(el);
    });
  }

  function resolveYear() {
    if (ITT._immersionYear) return String(ITT._immersionYear);
    var htmlY = document.documentElement.getAttribute("data-itt-year");
    if (htmlY) return htmlY;
    var path = location.pathname || "";
    var m = path.match(/\/years\/(\d{4})\//);
    if (m) return m[1];
    return "1995";
  }

  /**
   * Split feature list so the current product page boots fast.
   * 2005 loads ~30 modules; waiting on all of them makes YouTube/Maps/etc. feel laggy.
   * Priority: shared + page-matched module(s). Rest loads after Immersion.create.
   */
  function splitFeaturesForPage(all) {
    all = all || [];
    var path = "";
    try {
      path = String((typeof location !== "undefined" && location.pathname) || "").toLowerCase();
    } catch (e) {
      path = "";
    }
    var hints = [
      ["youtube", "immersion/youtube.js"],
      ["housingmaps", "immersion/housingmaps.js"],
      ["maps", "immersion/maps.js"],
      ["reddit", "immersion/reddit.js"],
      ["digg", "immersion/digg.js"],
      ["delicious", "immersion/delicious.js"],
      ["gmail", "immersion/gmail.js"],
      ["facebook", "immersion/facebook.js"],
      ["flickr", "immersion/flickr.js"],
      ["myspace", "immersion/myspace.js"],
      ["itunes", "immersion/itunes.js"],
      ["blogger", "immersion/blogger.js"],
      ["bloglines", "immersion/bloglines.js"],
      ["technorati", "immersion/technorati.js"],
      ["wordpress", "immersion/wordpress.js"],
      ["linkedin", "immersion/linkedin.js"],
      ["adsense", "immersion/adsense.js"],
      ["friendster", "immersion/friendster.js"],
      ["orkut", "immersion/orkut.js"],
      ["livejournal", "immersion/livejournal.js"],
      ["craigslist", "immersion/craigslist.js"],
      ["amazon", "immersion/amazon.js"],
      ["ebay", "immersion/auction.js"],
      ["auctionweb", "immersion/auction.js"],
      ["slashdot", "immersion/slashdot.js"],
      ["google", "immersion/google.js"],
      ["yahoo", "immersion/yahoo.js"],
      ["excite", "immersion/excite.js"],
      ["napster", "immersion/napster.js"],
      ["kazaa", "immersion/kazaa.js"],
      ["netflix", "immersion/netflix.js"],
      ["geocities", "immersion/geocities.js"],
      ["hotmail", "immersion/hotmail.js"],
      ["twitter", "immersion/twitter.js"],
      ["docs", "immersion/docs.js"],
      ["aws", "immersion/aws.js"],
      ["reader", "immersion/reader.js"],
      ["iphone", "immersion/iphone.js"],
      ["appstore", "immersion/appstore.js"],
      ["chrome", "immersion/chrome-browser.js"],
      ["android", "immersion/android.js"],
      ["hulu", "immersion/hulu.js"],
      ["farmville", "immersion/farmville.js"],
      ["bing", "immersion/bing.js"],
      ["foursquare", "immersion/foursquare.js"],
      ["kickstarter", "immersion/kickstarter.js"],
      ["wave", "immersion/wave.js"],
      ["instagram", "immersion/instagram.js"],
      ["pinterest", "immersion/pinterest.js"],
      ["feedburner", "immersion/feedburner.js"],
      ["podcasts", "immersion/podcasts.js"],
      ["spotify", "immersion/spotify.js"],
      ["googleplus", "immersion/googleplus.js"],
      ["snapchat", "immersion/snapchat.js"],
      ["siri", "immersion/siri.js"]
    ];
    var priority = [];
    var seen = {};
    function add(rel) {
      if (!rel || seen[rel]) return;
      var i;
      for (i = 0; i < all.length; i++) {
        if (all[i] === rel) {
          seen[rel] = 1;
          priority.push(rel);
          return;
        }
      }
    }
    /* shared first — nav / flash / tour */
    add("immersion/shared.js");
    var h;
    for (h = 0; h < hints.length; h++) {
      var key = hints[h][0];
      if (
        path.indexOf("/sites/" + key + "/") !== -1 ||
        path.indexOf("/" + key + "/") !== -1
      ) {
        add(hints[h][1]);
        if (key === "itunes") add("immersion/podcasts.js");
        if (key === "maps") add("immersion/housingmaps.js");
      }
    }
    /* guestbook / search pages */
    if (
      path.indexOf("guestbook") !== -1 ||
      path.indexOf("/search") !== -1 ||
      path.indexOf("whitehouse") !== -1
    ) {
      add("immersion/guestbook-search.js");
    }
    var rest = [];
    var j;
    for (j = 0; j < all.length; j++) {
      if (!seen[all[j]]) rest.push(all[j]);
    }
    /* If nothing page-specific matched, keep full list as priority (home/about). */
    if (priority.length <= 1 && rest.length) {
      return { priority: all.slice(), rest: [] };
    }
    return { priority: priority, rest: rest };
  }

  function loadAll(base, rels) {
    var jobs = [];
    var i;
    for (i = 0; i < rels.length; i++) {
      jobs.push(loadScript(base + rels[i]));
    }
    return Promise.all(jobs);
  }

  function start(year) {
    var YEAR = String(year || resolveYear());
    ITT._immersionYear = YEAR;
    var base = scriptDirFromLoader();

    function bootCreate() {
      var cfg = ITT.immersionConfigs && ITT.immersionConfigs[YEAR];
      if (!cfg || !ITT.Immersion) {
        console.error("ITT immersion " + YEAR + ": config or create missing");
        return;
      }
      if (document.documentElement.getAttribute("data-itt-immersion-booted") === YEAR) return;
      document.documentElement.setAttribute("data-itt-immersion-booted", YEAR);
      ITT.Immersion.create(cfg);
    }

    /**
     * Init only modules that registered after first create (deferred phase).
     * Uses ITT._immersionFeaturesInited cursor set by create.js boot.
     */
    function bootLateFeatures() {
      try {
        var cfg = ITT.immersionConfigs && ITT.immersionConfigs[YEAR];
        if (!cfg || !ITT.ImmersionFeatures) return;
        var api = ITT._immersionApi;
        var features = ITT.ImmersionFeatures;
        var start = typeof ITT._immersionFeaturesInited === "number" ? ITT._immersionFeaturesInited : 0;
        var i;
        for (i = start; i < features.length; i++) {
          var f = features[i];
          if (!f || typeof f.init !== "function") continue;
          try {
            if (f.needs && !f.needs(cfg)) continue;
            f.init(api);
          } catch (err) {
            console.error("ITT immersion late feature failed:", f.id, err);
          }
        }
        ITT._immersionFeaturesInited = features.length;
      } catch (e) { /* */ }
    }

    var needUtil = !(ITT.util);
    var chain = needUtil ? loadScript(base + "lib/util.js") : Promise.resolve();

    chain
      .then(function () {
        return loadScript(base + "immersion/registry.js");
      })
      .then(function () {
        var map = ITT.IMMERSION_FEATURES_BY_YEAR || {};
        var features = map[YEAR] || map["1995"] || [];
        var split = splitFeaturesForPage(features);
        ITT._immersionFeatureSplit = split;

        var phase1 = split.priority.slice();
        if (!(ITT.immersionConfigs && ITT.immersionConfigs[YEAR])) {
          var cfgFile =
            (ITT.immersionConfigFile && ITT.immersionConfigFile(YEAR)) ||
            "immersion-" + YEAR + ".js";
          phase1.push("config/" + cfgFile);
        }

        return loadAll(base, phase1).then(function () {
          return loadScript(base + "immersion/create.js");
        }).then(function () {
          bootCreate();
          /* Defer the rest so YouTube/Maps/etc. paint and wire immediately */
          if (split.rest && split.rest.length) {
            var loadRest = function () {
              loadAll(base, split.rest)
                .then(function () {
                  bootLateFeatures();
                })
                .catch(function (err) {
                  console.error("ITT immersion deferred features failed:", err);
                });
            };
            if (typeof requestIdleCallback === "function") {
              requestIdleCallback(function () {
                loadRest();
              }, { timeout: 1200 });
            } else {
              setTimeout(loadRest, 0);
            }
          }
        });
      })
      .catch(function (err) {
        console.error("ITT immersion bootstrap failed:", err);
      });
  }

  ITT.ImmersionBoot = { start: start, loadScript: loadScript };

  // Auto-start when year already set (year stub loaded this file)
  if (ITT._immersionYear) {
    start(ITT._immersionYear);
  }
})(typeof window !== "undefined" ? window : this);
