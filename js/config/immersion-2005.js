/**
 * Immersion config — 2005
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2005"] = {
    year: "2005",
    storagePrefix: "itt05",
    features: {
      nav: true,
      amazon: true,
      auction: true,
      geocities: true,
      google: true,
      excite: true,
      yahoo: true,
      napster: true,
      blogger: true,
      slashdot: true,
      technorati: true,
      plugin: true,
      friendster: true,
      kazaa: true,
      myspace: true,
      itunes: true,
      wordpress: true,
      linkedin: true,
      adsense: true,
      bloglines: true,
      gmail: true,
      facebook: true,
      flickr: true,
      youtube: true,
      maps: true,
      reddit: true,
      digg: true,
      podcasts: true,
      delicious: true,
      housingmaps: true,
      feedburner: true
    },
    navSubtitle: "IE 6 · Windows XP · YouTube · Maps · Reddit · Digg",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" },
      { label: "Maps", href: "sites/maps/index.html", match: "/maps/" },
      { label: "Reddit", href: "sites/reddit/index.html", match: "/reddit/" },
      { label: "Digg", href: "sites/digg/index.html", match: "/digg/" },
      { label: "Gmail", href: "sites/gmail/index.html", match: "/gmail/" },
      { label: "Flickr", href: "sites/flickr/index.html", match: "/flickr/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "YouTube", href: "sites/youtube/index.html" },
      { label: "Maps", href: "sites/maps/index.html" },
      { label: "HousingMaps", href: "sites/housingmaps/index.html" },
      { label: "del.icio.us", href: "sites/delicious/index.html" },
      { label: "Web 2.0 Conf", href: "sites/web20conference/index.html" },
      { label: "About 2005", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2005",
        href: "pages/about.html",
        match: "/about",
        hint: "64.8M sites · Web 2.0 boom",
        doneMessage: "YouTube · Maps · Reddit · Digg."
      },
      {
        id: "youtube",
        label: "YouTube",
        href: "sites/youtube/index.html",
        match: "/youtube/",
        hint: "Apr 23 beta · Broadcast Yourself",
        doneMessage: "Upload theater — no real video host."
      },
      {
        id: "maps",
        label: "Google Maps",
        href: "sites/maps/index.html",
        match: "/maps/",
        hint: "Ajax poster child",
        doneMessage: "Pan/zoom theater — no live tiles."
      },
      {
        id: "reddit",
        label: "Reddit",
        href: "sites/reddit/index.html",
        match: "/reddit/",
        hint: "Jun 23 · boosts · YC first class",
        doneMessage: "Boost theater — sparse front page."
      },
      {
        id: "digg",
        label: "Digg",
        href: "sites/digg/index.html",
        match: "/digg/",
        hint: "2005 rise · Diggnation Jul 1",
        doneMessage: "Digg/bury theater — rise year."
      },
      {
        id: "myspace",
        label: "MySpace",
        href: "sites/myspace/index.html",
        match: "/myspace/",
        hint: "News Corp $580M Jul 18",
        doneMessage: "Mass social + sale story."
      },
      {
        id: "itunes",
        label: "iTunes Podcasts",
        href: "sites/itunes/index.html",
        match: "/itunes/",
        hint: "Jun 28 · >1M subs in two days",
        doneMessage: "Podcast directory — free, auto-download lore."
      },
      {
        id: "housingmaps",
        label: "HousingMaps",
        href: "sites/housingmaps/index.html",
        match: "/housingmaps/",
        hint: "Apr mashup · pre-API",
        doneMessage: "Craigslist-on-Maps filter theater."
      },
      {
        id: "delicious",
        label: "del.icio.us",
        href: "sites/delicious/index.html",
        match: "/delicious/",
        hint: "tags · Yahoo Dec 9",
        doneMessage: "Social bookmarks — folksonomy."
      }
    ]

  };
})(typeof window !== "undefined" ? window : this);
