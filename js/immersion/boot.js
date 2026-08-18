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
      ["siri", "immersion/siri.js"],
      ["icq", "immersion/icq.js"],
      ["aim", "immersion/aim.js"],
      ["mapquest", "immersion/mapquest.js"],
      ["photobucket", "immersion/photobucket.js"],
      ["pandora", "immersion/pandora.js"],
      ["github", "immersion/github.js"],
      ["msn", "immersion/msn.js"],

      ["imgur", "immersion/imgur.js"],
      ["cnn", "immersion/facebook.js"],
      ["wave", "immersion/wave.js"],
      ["sourceforge", "immersion/sourceforge.js"],
      ["oneThingMachines", "immersion/one-thing-machines.js"],
      ["bbs", "immersion/source-flows.js"],
      ["zengarden", "immersion/source-flows.js"],
      ["neocities", "immersion/source-flows.js"],
      ["spacehey", "immersion/source-flows.js"],
      ["textfiles", "immersion/source-flows.js"],
      ["folklore", "immersion/source-flows.js"],
      ["elon", "immersion/source-flows.js"],
      ["macromedia", "immersion/plugin.js"],
      ["flashplayer", "immersion/plugin.js"],
      ["flash", "immersion/plugin.js"],
      ["sourceforge", "immersion/sourceforge.js"]
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
    /* CORE first — honesty + 5× + packs must not wait 1.2s (that felt like mock). */
    add("immersion/shared.js");
    add("immersion/residual-placard.js");
    add("immersion/real-gate.js");
    add("immersion/residual-real.js");
    add("immersion/real-flow.js");
    add("immersion/flow-trails.js");
    add("immersion/year-extras-kit.js");
    add("immersion/year-5x-pack.js");
    add("immersion/year-true-packs.js");
    add("immersion/year-popular-3x.js");
    add("immersion/one-thing-machines.js");
    add("immersion/official-dest-gold.js");
    add("immersion/source-flows.js");
    var yi;
    for (yi = 0; yi < all.length; yi++) {
      if (/immersion\/year-\d{4}-extras\.js$/.test(all[yi])) add(all[yi]);
    }
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
    if (
      path.indexOf("/macromedia") !== -1 ||
      path.indexOf("/flash") !== -1 ||
      path.indexOf("/plugin") !== -1
    ) {
      add("immersion/plugin.js");
    }
    if (
      path.indexOf("/pages/") !== -1 ||
      path.indexOf("/map.html") !== -1
    ) {
      add("immersion/flow-map.js");
    }
    if (path.indexOf("/playable") !== -1) {
      add("config/year-extra-games.js");
      add("immersion/year-playable.js");
    }
    /* Pets.com shop reuses Amazon cart hooks — load the engine off /amazon/. */
    if (path.indexOf("/pets/") !== -1) add("immersion/amazon.js");
    try {
      if (
        typeof document !== "undefined" &&
        document.querySelector &&
        document.querySelector("[data-add-cart]")
      ) {
        add("immersion/amazon.js");
      }
    } catch (eCart) { /* */ }
    if (
      path.indexOf("guestbook") !== -1 ||
      path.indexOf("/search") !== -1 ||
      path.indexOf("whitehouse") !== -1 ||
      path.indexOf("/geocities/") !== -1 ||
      path.indexOf("/personal/") !== -1
    ) {
      add("immersion/guestbook-search.js");
    }
    try {
      if (
        typeof document !== "undefined" &&
        document.querySelector &&
        document.querySelector("[data-guestbook], form[data-gb-form], [data-search]")
      ) {
        add("immersion/guestbook-search.js");
      }
    } catch (eGb) { /* */ }
    if (
      path.indexOf("/csotd") !== -1 ||
      path.indexOf("/fishcam") !== -1 ||
      path.indexOf("/iuma") !== -1
    ) {
      add("immersion/media-1994.js");
    }
    /* Unused product engines stay off this page. A new iframe loads the
       matching module on navigate — loading all 30 on YouTube is the 2005+ lag. */
    return { priority: priority, rest: [] };
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
        /* Passport + first-night (shared with hub / year shell) */
        if (!(ITT.MuseumProgress && ITT.MuseumProgress.stamp)) {
          return loadScript(base + "museum-progress.js");
        }
        return Promise.resolve();
      })
      .then(function () {
        /* UX pack for content pages — easy remove: delete this block */
        return loadAll(base, [
          "ux/flags.js",
          "ux/copy-bank.js",
          "ux/real-coach.js",
          "ux/here-strip.js",
          "ux/year-meter.js",
          "ux/boot-content.js"
        ]).catch(function () {
          /* UX optional — immersion still works without it */
        });
      })
      .then(function () {
        return loadScript(base + "immersion/registry.js");
      })
      .then(function () {
        return loadScript(base + "immersion/layers.js").catch(function () {
          /* layers.js is optional chrome; missing file must not kill boot */
        });
      })
      .then(function () {
        var map = ITT.IMMERSION_FEATURES_BY_YEAR || {};
        var features = map[YEAR] || map["1995"] || [];
        var split = splitFeaturesForPage(features);
        ITT._immersionFeatureSplit = split;

        var KIT = "immersion/year-extras-kit.js";
        var phase1 = split.priority.slice();
        if (!(ITT.immersionConfigs && ITT.immersionConfigs[YEAR])) {
          var cfgFile =
            (ITT.immersionConfigFile && ITT.immersionConfigFile(YEAR)) ||
            "immersion-" + YEAR + ".js";
          phase1.push("config/" + cfgFile);
        }

        /* loadAll is Promise.all + async scripts — extras can parse before the
           kit even when both are in priority. Peel the kit out and load it
           first so year extras / true-packs bind ITT.YearExtras. */
        function withoutKit(list) {
          var out = [];
          var wi;
          for (wi = 0; wi < (list || []).length; wi++) {
            if (list[wi] !== KIT) out.push(list[wi]);
          }
          return out;
        }
        var listedKit = false;
        var fi;
        for (fi = 0; fi < features.length; fi++) {
          if (features[fi] === KIT) listedKit = true;
        }
        phase1 = withoutKit(phase1);
        split.rest = withoutKit(split.rest);

        var PLAY_DATA = "config/year-playable.js";
        var needPlayData = false;
        var pi;
        for (pi = 0; pi < phase1.length; pi++) {
          if (phase1[pi] === "immersion/year-playable.js") needPlayData = true;
        }

        function afterKit() {
          var ready = Promise.resolve();
          if (needPlayData && !ITT.yearPlayableGames) {
            ready = loadScript(base + PLAY_DATA);
          }
          return ready.then(function () {
            return loadAll(base, phase1);
          }).then(function () {
            return loadScript(base + "immersion/create.js");
          }).then(function () {
            bootCreate();
            try {
              if (ITT.UX && typeof ITT.UX.bootContent === "function") {
                ITT.UX.bootContent(document);
              }
            } catch (eUxBoot) { /* */ }
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
        }

        if (listedKit && !(ITT.YearExtras && ITT.YearExtras.forYear)) {
          return loadScript(base + KIT).then(afterKit);
        }
        return afterKit();
      })
      .catch(function (err) {
        console.error("ITT immersion bootstrap failed:", err);
      });
  }

  ITT.ImmersionBoot = {
    start: start,
    loadScript: loadScript,
    splitFeaturesForPage: splitFeaturesForPage
  };

  // Auto-start when year already set (year stub loaded this file)
  if (ITT._immersionYear) {
    start(ITT._immersionYear);
  }
})(typeof window !== "undefined" ? window : this);
