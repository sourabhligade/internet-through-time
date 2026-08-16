/**
 * Immersion config — 2019
 * Thesis: TikTok For You · Disney+ · Arcade · Apple TV+ · AirPods Pro ·
 * iPhone 11 · Stadia · websites table ends 2018 · ITU ~4.1B users
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2019"] = {
    year: "2019",
    storagePrefix: "itt19",
    features: {
      year2019extras: true,
      yearplayable: true,
      flowMap: true,
      nav: true,
      amazon: false,
      auction: false,
      geocities: false,
      napster: false,
      heartbleed: false
    },
    navSubtitle: "TikTok · Disney+ · Arcade · TV+ · Stadia · 2018 table ended",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Disney+", href: "sites/disneyplus/home.html", match: "/disneyplus/" },
      { label: "TikTok", href: "sites/tiktok/index.html", match: "/tiktok/" },
      { label: "Arcade", href: "sites/arcade/index.html", match: "/arcade/" },
      { label: "TV+", href: "sites/appletv/index.html", match: "/appletv/" },
      { label: "Stadia", href: "sites/stadia/index.html", match: "/stadia/" },
      { label: "iPhone 11", href: "sites/iphone/iphone11.html", match: "/iphone/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Disney+", href: "sites/disneyplus/home.html" },
      { label: "TikTok", href: "sites/tiktok/index.html" },
      { label: "Arcade", href: "sites/arcade/index.html" },
      { label: "Apple TV+", href: "sites/appletv/index.html" },
      { label: "Stadia", href: "sites/stadia/index.html" },
      { label: "Continue Row", href: "sites/playable/game.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2019", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2019",
        href: "pages/about.html",
        match: "/about",
        hint: "table ended 2018 · ITU 4.1B",
        doneMessage: "Services sell as hard as hardware."
      },
      {
        id: "disneyplus",
        label: "Disney+",
        href: "sites/disneyplus/home.html",
        match: "/disneyplus/",
        hint: "Nov 12 · Who’s watching · trial is the trap",
        doneMessage: "Continue row is the save."
      },
      {
        id: "tiktok",
        label: "TikTok For You",
        href: "sites/tiktok/index.html",
        match: "/tiktok/",
        hint: "caption · FYP",
        doneMessage: "Short video is the habit."
      },
      {
        id: "arcade",
        label: "Apple Arcade",
        href: "sites/arcade/index.html",
        match: "/arcade/",
        hint: "Sep 19 · no ads no IAP",
        doneMessage: "Games as a service."
      },
      {
        id: "appletv",
        label: "Apple TV+",
        href: "sites/appletv/index.html",
        match: "/appletv/",
        hint: "Nov 1 · originals",
        doneMessage: "Second streamer stack."
      },
      {
        id: "stadia",
        label: "Stadia",
        href: "sites/stadia/index.html",
        match: "/stadia/",
        hint: "Nov 19 · Founder’s",
        doneMessage: "Cloud try day-one."
      },
      {
        id: "iphone11",
        label: "iPhone 11",
        href: "sites/iphone/iphone11.html",
        match: "/iphone11",
        hint: "dual camera · AirPods Pro",
        doneMessage: "Autumn hardware."
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
