/**
 * Follow a site through the years — only rooms that exist on disk.
 * 2009 boarded (skipped). Used by the year-shell control and the hub / atlas walks.
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
        stop("2007", "sites/yahoo/index.html", "iPhone year"),
        stop("2008", "sites/yahoo/index.html", "App Store year"),
        stop("2010", "sites/yahoo/index.html", "lean"),
        stop("2011", "sites/yahoo/index.html", "Circles year"),
        stop("2012", "sites/yahoo/index.html", "IPO year"),
        stop("2015", "sites/yahoo/index.html", "Go LIVE year"),
        stop("2019", "sites/yahoo/index.html", "Continue year")
      ]
    },
    amazon: {
      label: "Amazon",
      match: /\/sites\/amazon\//,
      stops: [
        stop("1995", "sites/amazon/ssl-checkout.html", "SSL gold"),
        stop("1996", "sites/amazon/index.html", "catalog"),
        stop("1997", "sites/amazon/index.html", "IPO year"),
        stop("1998", "sites/amazon/music.html", "Music"),
        stop("1999", "sites/amazon/index.html", "multi-cat"),
        stop("2000", "sites/amazon/index.html", "smile"),
        stop("2001", "sites/amazon/index.html", "rebuild"),
        stop("2002", "sites/amazon/index.html", "continuity"),
        stop("2003", "sites/amazon/index.html", "99¢ year"),
        stop("2004", "sites/amazon/index.html", "Web 2.0 year"),
        stop("2006", "sites/amazon/index.html", "Twttr year"),
        stop("2008", "sites/amazon/index.html", "App Store year"),
        stop("2010", "sites/amazon/index.html", "lean"),
        stop("2012", "sites/amazon/index.html", "IPO year"),
        stop("2015", "sites/amazon/index.html", "Go LIVE year"),
        stop("2017", "sites/amazon/index.html", "Face ID year"),
        stop("2019", "sites/amazon/index.html", "Continue year"),
        stop("2021", "sites/amazon/index.html", "ATT year"),
        stop("2022", "sites/amazon/index.html", "ChatGPT year")
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
        stop("2007", "sites/google/index.html", "iPhone year"),
        stop("2008", "sites/google/index.html", "Chrome year"),
        stop("2010", "sites/google/index.html", "lean"),
        stop("2011", "sites/google/index.html", "Circles year"),
        stop("2012", "sites/google/index.html", "IPO year"),
        stop("2015", "sites/googlephotos/index.html", "Photos locker"),
        stop("2019", "sites/google/index.html", "Continue year"),
        stop("2021", "sites/google/index.html", "ATT year"),
        stop("2022", "sites/google/index.html", "ChatGPT year")
      ]
    },
    facebook: {
      label: "Facebook",
      match: /\/sites\/facebook\//,
      stops: [
        stop("2004", "sites/facebook/networks.html", "thefacebook"),
        stop("2006", "sites/facebook/feed.html", "News Feed"),
        stop("2007", "sites/facebook/index.html", "Platform leftover"),
        stop("2008", "sites/facebook/index.html", "continuity"),
        stop("2010", "sites/facebook/index.html", "Open Graph"),
        stop("2011", "sites/facebook/index.html", "Timeline"),
        stop("2012", "sites/facebook/index.html", "IPO"),
        stop("2013", "sites/facebook/index.html", "Vine year"),
        stop("2014", "sites/facebook/index.html", "Install year"),
        stop("2015", "sites/facebook/index.html", "Go LIVE year"),
        stop("2016", "sites/facebook/reactions.html", "Reactions"),
        stop("2017", "sites/facebook/index.html", "2017 door · no Facebook dest"),
        stop("2022", "sites/facebook/index.html", "leftover Facebook")
      ]
    },
    youtube: {
      label: "YouTube",
      match: /\/sites\/youtube\//,
      stops: [
        stop("2006", "sites/youtube/index.html", "Google deal"),
        stop("2007", "sites/youtube/index.html", "iPhone year"),
        stop("2008", "sites/youtube/index.html", "App Store year"),
        stop("2010", "sites/youtube/index.html", "lean"),
        stop("2011", "sites/youtube/index.html", "Circles year"),
        stop("2012", "sites/youtube/index.html", "IPO year"),
        stop("2013", "sites/youtube/index.html", "Vine year"),
        stop("2014", "sites/youtube/index.html", "Install year"),
        stop("2015", "sites/youtube/index.html", "Go LIVE year"),
        stop("2022", "sites/youtube/index.html", "leftover YouTube")
      ]
    },
    twitter: {
      label: "Twitter",
      match: /\/sites\/twitter\//,
      stops: [
        stop("2006", "sites/twitter/index.html", "Twttr"),
        stop("2007", "sites/twitter/index.html", "iPhone year"),
        stop("2008", "sites/twitter/index.html", "App Store year"),
        stop("2010", "sites/twitter/index.html", "lean"),
        stop("2011", "sites/twitter/index.html", "Circles year"),
        stop("2012", "sites/twitter/index.html", "IPO year"),
        stop("2013", "sites/twitter/index.html", "Vine year"),
        stop("2014", "sites/twitter/index.html", "Install year"),
        stop("2015", "sites/twitter/index.html", "Go LIVE year"),
        stop("2017", "sites/twitter/280.html", "280"),
        stop("2019", "sites/twitter/index.html", "Continue year"),
        stop("2021", "sites/twitter/index.html", "ATT year"),
        stop("2022", "sites/twitter/index.html", "bird leftover")
      ]
    },
    instagram: {
      label: "Instagram",
      match: /\/sites\/instagram\//,
      stops: [
        stop("2010", "sites/instagram/index.html", "iOS"),
        stop("2011", "sites/instagram/index.html", "Circles year"),
        stop("2012", "sites/instagram/android.html", "Android"),
        stop("2014", "sites/instagram/index.html", "Install year"),
        stop("2015", "sites/instagram/index.html", "Go LIVE year"),
        stop("2016", "sites/instagram/stories.html", "Stories"),
        stop("2017", "sites/instagram/index.html", "leftover Instagram on this door · itt17-instagram17"),
        stop("2019", "sites/instagram/index.html", "Continue year"),
        stop("2021", "sites/instagram/index.html", "ATT year"),
        stop("2022", "sites/instagram/index.html", "ChatGPT year")
      ]
    },
    iphone: {
      label: "iPhone / Safari",
      match: /\/sites\/iphone\//,
      stops: [
        stop("2007", "sites/iphone/index.html", "Safari"),
        stop("2008", "sites/iphone/index.html", "3G"),
        stop("2010", "sites/iphone/index.html", "iPhone 4"),
        stop("2011", "sites/iphone/index.html", "Siri leftover"),
        stop("2012", "sites/iphone/index.html", "Maps flop leftover"),
        stop("2013", "sites/iphone/ios7.html", "iOS 7"),
        stop("2014", "sites/iphone/index.html", "Install year"),
        stop("2015", "sites/iphone/index.html", "Go LIVE year"),
        stop("2016", "sites/iphone/index.html", "iPhone 7 · no jack"),
        stop("2017", "sites/iphone/x.html", "Face ID"),
        stop("2022", "sites/iphone/14.html", "Island leftover")
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

  function nextFrom(pathname, year) {
    var id = brandOf(pathname);
    if (!id) return null;
    var brand = BRANDS[id];
    var i = indexOfYear(brand.stops, year);
    if (i < 0) i = indexOfYear(brand.stops, yearFromPath(pathname));
    if (i < 0 || i + 1 >= brand.stops.length) return null;
    var rec = brand.stops[i + 1];
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
