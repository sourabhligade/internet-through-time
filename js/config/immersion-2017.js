/**
 * Immersion config — 2017
 * Thesis: Face ID · Fortnite BR · 280 · 1.77B
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2017"] = {
    year: "2017",
    storagePrefix: "itt17",
    features: {
      year2017extras: true,
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
    navSubtitle: "Face ID · Fortnite BR · 280 · 1.77B",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Face ID", href: "sites/iphone/x.html", match: "/iphone/x" },
      { label: "Fortnite", href: "sites/fortnite/index.html", match: "/fortnite/" },
      { label: "280", href: "sites/twitter/280.html", match: "/twitter/280" },
      { label: "WannaCry", href: "sites/wannacry/index.html", match: "/wannacry/" },
      { label: "Vine gone", href: "sites/vine/gone.html", match: "/vine/" },
      { label: "Equifax", href: "sites/equifax/index.html", match: "/equifax/" },
      { label: "Teams GA", href: "sites/teams/index.html", match: "/teams/" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "iPhone X / Face ID", href: "sites/iphone/x.html" },
      { label: "Fortnite BR", href: "sites/fortnite/index.html" },
      { label: "Twitter 280", href: "sites/twitter/280.html" },
      { label: "WannaCry", href: "sites/wannacry/index.html" },
      { label: "Vine gone", href: "sites/vine/gone.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2017", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2017",
        href: "pages/about.html",
        match: "/about",
        hint: "1.77B · +69%",
        doneMessage: "Face ID · Fortnite BR · 280 · Vine gone."
      },
      {
        id: "faceid",
        label: "iPhone X / Face ID",
        href: "sites/iphone/x.html",
        match: "/iphone/x",
        hint: "Sep 12 · no home button",
        doneMessage: "The face is the password."
      },
      {
        id: "fortnite",
        label: "Fortnite BR",
        href: "sites/fortnite/index.html",
        match: "/fortnite/",
        hint: "Sep 26 · free · 100",
        doneMessage: "Battle Royale goes free."
      },
      {
        id: "twitter280",
        label: "Twitter 280",
        href: "sites/twitter/280.html",
        match: "/twitter/280",
        hint: "Nov 7",
        doneMessage: "140 becomes 280."
      },
      {
        id: "wannacry",
        label: "WannaCry",
        href: "sites/wannacry/index.html",
        match: "/wannacry/",
        hint: "May 12",
        doneMessage: "Ransomware Friday. No payload here."
      },
      {
        id: "vine",
        label: "Vine gone",
        href: "sites/vine/gone.html",
        match: "/vine/",
        hint: "Jan 17",
        doneMessage: "The archive class. 2016 only announced it."
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
