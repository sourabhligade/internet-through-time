/**
 * Follow a site through the years — only rooms that exist on disk.
 * 2009 is live HTML (Like). Used by the year-shell control and the hub / atlas walks.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function stop(year, path, note) {
    return { year: year, path: path, note: note || "" };
  }

  var BRANDS = {
    yahoo: {
      label: "Yahoo",
      match: /\/sites\/yahoo\//,
      stops: [
        stop("1994", "sites/yahoo/index.html", "Stanford"),
        stop("1995", "sites/yahoo/index.html", "yahoo.com"),
        stop("1996", "sites/yahoo/index.html", "portal"),
        stop("1997", "sites/yahoo/index.html", "directory"),
        stop("1998", "sites/yahoo/index.html", "still winning"),
        stop("1999", "sites/yahoo/index.html", "bubble"),
        stop("2000", "sites/yahoo/index.html", "crash year"),
        stop("2001", "sites/yahoo/index.html", "rebuild"),
        stop("2002", "sites/yahoo/index.html", "broadband"),
        stop("2003", "sites/yahoo/index.html", "portal leftover"),
        stop("2004", "sites/yahoo/index.html", "Web 2.0 year"),
        stop("2005", "sites/yahoo/index.html", "still #1"),
        stop("2006", "sites/yahoo/index.html", "Twttr year"),
      ]
    },
    amazon: {
      label: "Amazon",
 match: /\/sites\/amazon(ipo)?\//,
      stops: [
        stop("1995", "sites/amazon/ssl-checkout.html", "SSL gold"),
        stop("1996", "sites/amazon/index.html", "catalog"),
 stop("1997", "sites/amazonipo/index.html", "IPO year"),
        stop("1998", "sites/amazon/music.html", "Music"),
        stop("1999", "sites/amazon/index.html", "multi-cat"),
        stop("2000", "sites/amazon/index.html", "smile"),
        stop("2001", "sites/amazon/index.html", "rebuild"),
        stop("2002", "sites/amazon/index.html", "continuity"),
        stop("2003", "sites/amazon/index.html", "99¢ year"),
        stop("2004", "sites/amazon/index.html", "Web 2.0 year"),
        stop("2006", "sites/amazon/index.html", "Twttr year"),
      ]
    },
    google: {
      label: "Google",
      match: /\/sites\/(google|googlephotos)\//,
      stops: [
        stop("1998", "sites/google/lucky.html", "Lucky gold"),
        stop("1999", "sites/google/index.html", "funded"),
        stop("2000", "sites/google/index.html", "habit"),
        stop("2001", "sites/google/index.html", "default"),
        stop("2002", "sites/google/index.html", "Stumble year"),
        stop("2003", "sites/google/index.html", "Photobucket year"),
        stop("2004", "sites/google/index.html", "thefacebook year"),
        stop("2006", "sites/google/index.html", "YouTube deal year"),
        stop("2010", "sites/google/index.html", "lean"),
      ]
    },
    facebook: {
      label: "Facebook",
      match: /\/sites\/(facebook|fbplat)\//,
      stops: [
        stop("2004", "sites/facebook/networks.html", "thefacebook"),
        stop("2006", "sites/facebook/feed.html", "News Feed"),
        stop("2007", "sites/fbplat/index.html", "Platform"),
        stop("2009", "sites/facebook/index.html", "Like"),
        stop("2010", "sites/facebook/index.html", "Open Graph"),
        stop("2011", "sites/facebook/index.html", "Timeline"),
        stop("2012", "sites/facebook/index.html", "IPO"),
        stop("2013", "sites/facebook/index.html", "Vine year"),
        stop("2014", "sites/facebook/index.html", "Install year"),
      ]
    },
    youtube: {
      label: "YouTube",
      match: /\/sites\/youtube\//,
      stops: [
        stop("2006", "sites/youtube/index.html", "Google deal"),
        stop("2007", "sites/youtube/index.html", "iPhone year"),
        stop("2010", "sites/youtube/index.html", "lean"),
        stop("2012", "sites/youtube/index.html", "IPO year"),
        stop("2013", "sites/youtube/index.html", "Vine year"),
        stop("2014", "sites/youtube/index.html", "Install year"),
        stop("2015", "app/index.html#/year/2015?stop=itt15-youtube", "YouTube Red"),
      ]
    },
    twitter: {
      label: "Twitter",
      match: /\/sites\/twitter\//,
      stops: [
        stop("2006", "sites/twitter/index.html", "Twttr"),
        stop("2007", "sites/twitter/index.html", "iPhone year"),
        stop("2010", "sites/twitter/index.html", "lean"),
        stop("2011", "sites/twitter/index.html", "140"),
        stop("2012", "sites/twitter/index.html", "IPO year"),
        stop("2013", "sites/twitter/index.html", "Vine year"),
        stop("2014", "sites/twitter/index.html", "Install year"),
      ]
    },
    instagram: {
      label: "Instagram",
      match: /\/sites\/instagram\//,
      stops: [
        stop("2010", "sites/instagram/index.html", "iOS"),
        stop("2011", "sites/instagram/index.html", "iPhone app"),
        stop("2012", "sites/instagram/android.html", "Android"),
        stop("2014", "sites/instagram/index.html", "Install year"),
      ]
    },
    iphone: {
      label: "iPhone / Safari",
      match: /\/sites\/iphone\//,
      stops: [
        stop("2007", "sites/iphone/index.html", "Safari"),
        stop("2010", "sites/iphone/index.html", "iPhone 4"),
        stop("2011", "sites/iphone/index.html", "Siri"),
        stop("2012", "sites/iphone/index.html", "Maps flop leftover"),
        stop("2013", "sites/iphone/ios7.html", "iOS 7"),
        stop("2014", "sites/iphone/index.html", "Install year"),
      ]
    }
  };

  function brandOf(pathname) {
    var id;
    for (id in BRANDS) {
      if (!Object.prototype.hasOwnProperty.call(BRANDS, id)) continue;
      if (BRANDS[id].match.test(String(pathname || ""))) return id;
    }
    return "";
  }

  function indexOfYear(stops, year) {
    var i;
    for (i = 0; i < stops.length; i++) if (stops[i].year === String(year)) return i;
    return -1;
  }

  var SKIP_YEARS = {
    "2016": 1,
    "2017": 1,
    "2018": 1,
    "2019": 1,
    "2023": 1,
    "2024": 1,
    "2025": 1
  };

  function nextFrom(pathname, year) {
    var id = brandOf(pathname);
    if (!id) return null;
    var brand = BRANDS[id];
    var i = indexOfYear(brand.stops, year);
    if (i < 0) i = indexOfYear(brand.stops, yearFromPath(pathname));
 if (i < 0) return null;
 var rec = null;
 var j;
 for (j = i + 1; j < brand.stops.length; j++) {
 if (!SKIP_YEARS[brand.stops[j].year]) {
 rec = brand.stops[j];
 break;
 }
 }
 if (!rec) return null;
    return {
      brand: id,
      label: brand.label,
      year: rec.year,
      path: rec.path,
      note: rec.note
    };
  }

  function yearFromPath(pathname) {
    var m = String(pathname || "").match(/\/years\/(\d{4})\//);
    return m ? m[1] : "";
  }

  ITT.FollowSite = {
    brands: BRANDS,
    brandOf: brandOf,
    next: nextFrom,
    yearFromPath: yearFromPath
  };
})(typeof window !== "undefined" ? window : this);
