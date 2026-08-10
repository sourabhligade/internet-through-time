/**
 * Immersion config — 2016
 * Thesis: Stories · Pokémon GO · Reactions · WA E2E · 1.05B
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
      instagram: true,
      snapchat: true,
      youtube: true,
      facebook: true,
      twitter: true,
      spotify: true,
      iphone: true,
      amazon: false,
      auction: false
    },
    navSubtitle: "Stories · Pokémon GO · Reactions · WA E2E · 1.05B",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Stories", href: "sites/instagram/stories.html", match: "/instagram/stories" },
      { label: "PoGO", href: "sites/pogo/index.html", match: "/pogo/" },
      { label: "Reactions", href: "sites/facebook/reactions.html", match: "/facebook/reactions" },
      { label: "WA E2E", href: "sites/whatsapp/e2e.html", match: "/whatsapp/e2e" },
      { label: "Vine", href: "sites/vine/goodbye.html", match: "/vine/" },
      { label: "iPhone 7", href: "sites/iphone/7.html", match: "/iphone/7" },
      { label: "AirPods", href: "sites/airpods/index.html", match: "/airpods/" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Instagram Stories", href: "sites/instagram/stories.html" },
      { label: "Pokémon GO", href: "sites/pogo/index.html" },
      { label: "Reactions", href: "sites/facebook/reactions.html" },
      { label: "WhatsApp E2E", href: "sites/whatsapp/e2e.html" },
      { label: "Vine goodbye", href: "sites/vine/goodbye.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2016", href: "pages/about.html" },
      { label: "Instagram Live", href: "sites/instagram/live.html" },
      { label: "AMP in Search", href: "sites/amp/serp.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2016",
        href: "pages/about.html",
        match: "/about",
        hint: "1.05B · +21% · 1B Mar",
        doneMessage: "Stories · PoGO · Reactions · WA E2E · jack/AirPods · Vine dual-date."
      },
      {
        id: "stories",
        label: "Instagram Stories",
        href: "sites/instagram/stories.html",
        match: "/instagram/stories",
        hint: "Aug 2 · 24h",
        doneMessage: "Ephemeral feed industrializes Snapchat’s format."
      },
      {
        id: "pogo",
        label: "Pokémon GO",
        href: "sites/pogo/index.html",
        match: "/pogo/",
        hint: "Jul 6 · no sprites",
        doneMessage: "The sidewalk is a game board."
      },
      {
        id: "reactions",
        label: "Reactions",
        href: "sites/facebook/reactions.html",
        match: "/facebook/reactions",
        hint: "Feb 24 · six faces",
        doneMessage: "Like is no longer the only verb."
      },
      {
        id: "wa-e2e",
        label: "WhatsApp E2E",
        href: "sites/whatsapp/e2e.html",
        match: "/whatsapp/e2e",
        hint: "Apr 5 · 1B class",
        doneMessage: "Default encryption on latest clients."
      },
      {
        id: "vine",
        label: "Vine goodbye",
        href: "sites/vine/goodbye.html",
        match: "/vine/",
        hint: "Oct 27 ≠ Jan 17 2017",
        doneMessage: "Announced dying — not already gone."
      },
      {
        id: "iphone7",
        label: "iPhone 7",
        href: "sites/iphone/7.html",
        match: "/iphone/7",
        hint: "Sep 7 · no jack",
        doneMessage: "Lightning adapter in the box."
      },
      {
        id: "chrome",
        label: "Chrome",
        href: "sites/chrome/index.html",
        match: "/chrome/",
        hint: "Still habit",
        doneMessage: "Chrome remains #1 · Edge not Chromium."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
