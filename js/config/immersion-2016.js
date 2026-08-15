/**
 * Immersion config — 2016 (lean)
 * Thesis: Stories · PoGO · Reactions · jack · AirPods · Vine · WA E2E
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2016"] = {
    year: "2016",
    storagePrefix: "itt16",
    features: {
      year2016extras: true,
      yearplayable: true,
      flowMap: true,
      nav: true,
      chromeBrowser: true,
      amazon: false,
      auction: false,
      geocities: false,
      napster: false
    },
    navSubtitle: "Stories · PoGO · Reactions · 1.05B",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Stories", href: "sites/instagram/stories.html", match: "/stories" },
      { label: "PoGO", href: "sites/pokemongo/index.html", match: "/pokemongo/" },
      { label: "Reactions", href: "sites/facebook/reactions.html", match: "/reactions" },
      { label: "Jack", href: "sites/iphone/jack.html", match: "/jack" },
      { label: "AirPods", href: "sites/airpods/index.html", match: "/airpods/" },
      { label: "Vine", href: "sites/vine/goodbye.html", match: "/vine/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Stories", href: "sites/instagram/stories.html" },
      { label: "Pokémon GO", href: "sites/pokemongo/index.html" },
      { label: "Reactions", href: "sites/facebook/reactions.html" },
      { label: "Jack", href: "sites/iphone/jack.html" },
      { label: "Vine goodbye", href: "sites/vine/goodbye.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2016", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2016",
        href: "pages/about.html",
        match: "/about",
        hint: "1.05B June · +21% · 1B restabilized",
        doneMessage: "Stories · outdoor AR · beyond Like."
      },
      {
        id: "stories",
        label: "Instagram Stories",
        href: "sites/instagram/stories.html",
        match: "/stories",
        hint: "Aug 2 · 24h",
        doneMessage: "The Story format goes mass."
      },
      {
        id: "pogo",
        label: "Pokémon GO",
        href: "sites/pokemongo/index.html",
        match: "/pokemongo/",
        hint: "Jul 6 · outdoor AR",
        doneMessage: "The sidewalk is the board."
      },
      {
        id: "reactions",
        label: "Reactions",
        href: "sites/facebook/reactions.html",
        match: "/reactions",
        hint: "Feb 24 · Love Haha Wow Sad Angry",
        doneMessage: "Like is no longer the only button."
      },
      {
        id: "jack",
        label: "iPhone 7 jack",
        href: "sites/iphone/jack.html",
        match: "/jack",
        hint: "Sep 7 · no headphone jack",
        doneMessage: "Courage is a missing port."
      },
      {
        id: "vine",
        label: "Vine goodbye",
        href: "sites/vine/goodbye.html",
        match: "/vine/",
        hint: "Oct 27 wind-down",
        doneMessage: "Six seconds starts to die."
      },
      {
        id: "chrome",
        label: "Chrome",
        href: "sites/chrome/index.html",
        match: "/chrome/",
        hint: "desktop habit",
        doneMessage: "Chrome remains the habit browser."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
