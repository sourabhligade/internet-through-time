/**
 * 2017 REAL product theaters — multi-step localStorage only (itt17-*)
 * Face ID · Fortnite · 280 · WannaCry · Vine gone · Teams GA · Equifax · P1 · P2
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2017");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2017 — load year-extras-kit.js first");
    return;
  }
  var prefix = YX.prefix;
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var loadJSON = YX.loadJSON;
  var markUsed = YX.markUsed;
  var showNext = YX.showNext;
  var checked = YX.checked;
  var countChecked = YX.countChecked;
  var val = YX.val;
  var bootTwo = YX.bootChecks;

  function bootFaceId(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-faceid-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-faceid-status]");
    var prev = loadJSON(key("faceid"), null);
    if (prev && st) feedback("Face ID literacy saved · " + key("faceid"), st);
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-faceid-no-home]") ||
        !checked(doc, "[data-faceid-not-touch]") ||
        !checked(doc, "[data-faceid-not-xs]")
      ) {
        feedback("Confirm no home button · Face ID not Touch ID · not iPhone XS.", st, { error: true });
        return;
      }
      saveJSON(key("faceid"), {
        announce: "2017-09-12",
        ship: "2017-11-03",
        noHomeButton: true,
        notTouchId: true,
        notXs: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Face ID literacy · " + key("faceid"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootFortnite(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-fn-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-fn-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-fn-date]") || !checked(doc, "[data-fn-free]") || !checked(doc, "[data-fn-no-art]")) {
        feedback("Confirm Sep 26 · free BR · no official art.", st, { error: true });
        return;
      }
      saveJSON(key("fortnite"), {
        date: "2017-09-26",
        free: true,
        players: 100,
        noOfficialArt: true,
        notSwitch: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Fortnite literacy · " + key("fortnite"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootTwitter280(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-tw280-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-tw280-status]");
    btn.addEventListener("click", function () {
      var text = val(doc, "[data-tw280-text]");
      if (text.length < 141) {
        feedback("Type 141+ characters — last year this would have failed.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-tw280-date]") || !checked(doc, "[data-tw280-not-x]")) {
        feedback("Confirm Nov 7 280 + this is not the X brand.", st, { error: true });
        return;
      }
      saveJSON(key("twitter280"), {
        date: "2017-11-07",
        chars: text.length,
        notXBrand: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("280 literacy · " + key("twitter280"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootWannaCry(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-wc-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-wc-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-wc-date]") || !checked(doc, "[data-wc-no-payload]")) {
        feedback("Confirm May 12 + this exhibit has no exploit.", st, { error: true });
        return;
      }
      saveJSON(key("wannacry"), {
        date: "2017-05-12",
        ransomware: true,
        noPayload: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("WannaCry literacy · " + key("wannacry"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootVineGone(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-vine-gone-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-vine-gone-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-vine-gone-date]") || !checked(doc, "[data-vine-gone-not-2016]")) {
        feedback("Confirm Jan 17 2017 offline + 2016 only announced it.", st, { error: true });
        return;
      }
      saveJSON(key("vine-gone"), {
        date: "2017-01-17",
        archive: true,
        not2016Announce: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Vine-gone literacy · " + key("vine-gone"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootTeamsGa(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-teams-ga-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-teams-ga-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-teams-ga-date]") || !checked(doc, "[data-teams-ga-not-preview]")) {
        feedback("Confirm Mar 14 GA + 2016 was only preview.", st, { error: true });
        return;
      }
      saveJSON(key("teams-ga"), {
        ga: "2017-03-14",
        notPreview: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Teams GA literacy · " + key("teams-ga"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootEquifax(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-eq-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-eq-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-eq-date]") || !checked(doc, "[data-eq-no-ssn]")) {
        feedback("Confirm Sep 7 + this exhibit stores no SSN.", st, { error: true });
        return;
      }
      saveJSON(key("equifax"), {
        date: "2017-09-07",
        accounts: "143M-class",
        noSsn: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Equifax literacy · " + key("equifax"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootWin10(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-win10-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-win10-mass]") || !checked(doc, "[data-win10-ended-2016]")) {
        feedback("Confirm still mass OS + free upgrade already ended in 2016.", st, { error: true });
        return;
      }
      saveJSON(key("win10"), {
        stillMass: true,
        freeEnded: "2016-07-29",
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Win10 honesty · " + key("win10"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootChrome17(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-chrome17-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-chrome17-status], [data-chrome-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-chrome17-habit]") || !checked(doc, "[data-chrome17-edge]")) {
        feedback("Confirm Chrome #1 + Edge is still EdgeHTML.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), {
        habit: true,
        notChromiumEdge: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Chrome REAL · " + key("chrome"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootMusical(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-musical-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-musical-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-musical-date]") || !checked(doc, "[data-musical-not-tiktok]")) {
        feedback("Confirm Nov 9 acquire + not TikTok US mass.", st, { error: true });
        return;
      }
      saveJSON(key("musical"), {
        acquire: "2017-11-09",
        notTikTokBrand: true,
        merge2018: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("musical.ly literacy · " + key("musical"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootSwitch(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-switch-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-switch-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-switch-date]") || !checked(doc, "[data-switch-not-fn]")) {
        feedback("Confirm Mar 3 + Fortnite is not on Switch this year.", st, { error: true });
        return;
      }
      saveJSON(key("switch"), {
        date: "2017-03-03",
        hybrid: true,
        notFortniteYet: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Switch literacy · " + key("switch"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootBitcoin(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-btc-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-btc-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-btc-ath]") || !checked(doc, "[data-btc-not-winter]")) {
        feedback("Confirm Dec ~$20k class + this is not crypto winter.", st, { error: true });
        return;
      }
      saveJSON(key("bitcoin"), {
        date: "2017-12-17",
        athClass: 20000,
        notWinter: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Bitcoin literacy · " + key("bitcoin"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootYahoo3b(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-yh3b-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-yh3b-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-yh3b-date]") || !checked(doc, "[data-yh3b-not-2016]")) {
        feedback("Confirm Oct 3 2017 is the 3B revision + 2016 was 500M/1B.", st, { error: true });
        return;
      }
      saveJSON(key("yahoo-3b"), {
        date: "2017-10-03",
        accounts: "3B",
        not2016News: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Yahoo 3B literacy · " + key("yahoo-3b"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootNn(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-nn-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-nn-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-nn-date]") || !checked(doc, "[data-nn-title2]")) {
        feedback("Confirm Dec 14 FCC vote + Title II repeal.", st, { error: true });
        return;
      }
      saveJSON(key("netneutrality"), {
        date: "2017-12-14",
        vote: "3-2",
        title2Repeal: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Net-neutrality literacy · " + key("netneutrality"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootSnapRedesign(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-snap-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-snap-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-snap-date]") || !checked(doc, "[data-snap-hated]")) {
        feedback("Confirm Nov 2017 redesign + people hated it.", st, { error: true });
        return;
      }
      saveJSON(key("snap-redesign"), {
        date: "2017-11-29",
        hated: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Snap redesign literacy · " + key("snap-redesign"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootNitro(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-nitro-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-nitro-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-nitro-date]") || !checked(doc, "[data-nitro-not-store]")) {
        feedback("Confirm Jan 23 Nitro + no real payment.", st, { error: true });
        return;
      }
      saveJSON(key("nitro"), {
        date: "2017-01-23",
        noPayment: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Nitro literacy · " + key("nitro"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootFb2b(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-fb2b-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-fb2b-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-fb2b-date]") || !checked(doc, "[data-fb2b-not-meta]")) {
        feedback("Confirm June 27 2B + not Meta branding.", st, { error: true });
        return;
      }
      saveJSON(key("fb-2b"), {
        date: "2017-06-27",
        billion: 2,
        notMeta: true,
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Facebook 2B literacy · " + key("fb-2b"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootP2(doc) {
    doc = doc || document;
    bootTwo(doc, {
      save: "[data-ipo-save]",
      status: "[data-ipo-status]",
      suffix: "snap-ipo",
      checks: ["[data-ipo-price]", "[data-ipo-novote]"],
      err: "Check $17/$24 · Class A no vote.",
      okMsg: "Snap IPO literacy",
      extra: { priced: 17, opened: 24, noVote: true }
    });
    bootTwo(doc, {
      save: "[data-yttv-save]",
      status: "[data-yttv-status]",
      suffix: "yt-tv",
      checks: ["[data-yttv-price]", "[data-yttv-not-prem]"],
      err: "Check $35 · not Premium 2018.",
      okMsg: "YouTube TV literacy",
      extra: { price: 35, notPremium2018: true }
    });
    bootTwo(doc, {
      save: "[data-echo-save]",
      status: "[data-echo-status]",
      suffix: "echo-show",
      checks: ["[data-echo-date]", "[data-echo-screen]"],
      err: "Check May 9 / Jun 28 · $229.99 · screen.",
      okMsg: "Echo Show literacy",
      extra: { price: 229.99, screen: true }
    });
    bootTwo(doc, {
      save: "[data-np-save]",
      status: "[data-np-status]",
      suffix: "notpetya",
      checks: ["[data-np-date]", "[data-np-not-wc]"],
      err: "Check June 27 · not WannaCry · no payload.",
      okMsg: "NotPetya literacy",
      extra: { notWannaCry: true, noPayload: true }
    });
    bootTwo(doc, {
      save: "[data-fl-save]",
      status: "[data-fl-status]",
      suffix: "flash-eol",
      checks: ["[data-fl-date]", "[data-fl-2020]"],
      err: "Check Jul 25 announce · dies end of 2020.",
      okMsg: "Flash EOL literacy",
      extra: { announced: "2017-07-25", dies: "2020-12-31" }
    });
    bootTwo(doc, {
      save: "[data-ios11-save]",
      status: "[data-ios11-status]",
      suffix: "ios11",
      checks: ["[data-ios11-date]", "[data-ios11-not-face]"],
      err: "Check Sep 19 · Face ID is the phone.",
      okMsg: "iOS 11 literacy",
      extra: { notFaceId: true }
    });
    bootTwo(doc, {
      save: "[data-px2-save]",
      status: "[data-px2-status]",
      suffix: "pixel2",
      checks: ["[data-px2-date]", "[data-px2-not-x]"],
      err: "Check Oct 4 / 19 · not iPhone X.",
      okMsg: "Pixel 2 literacy",
      extra: { notIphoneX: true, notPixel3: true }
    });
    bootTwo(doc, {
      save: "[data-kr-save]",
      status: "[data-kr-status]",
      suffix: "krack",
      checks: ["[data-kr-date]", "[data-kr-no-exploit]"],
      err: "Check Oct 16 · no exploit kit.",
      okMsg: "KRACK literacy",
      extra: { noExploit: true }
    });
    bootTwo(doc, {
      save: "[data-nf-save]",
      status: "[data-nf-status]",
      suffix: "nf-mylist",
      checks: ["[data-nf-2016-dl]", "[data-nf-not-onething]"],
      err: "Title + 2016 downloads + not one-thing.",
      okMsg: "My List saved",
      minLen: { sel: "[data-nf-title]", n: 2, err: "Type a title (2+ chars). Empty list does not write." },
      extra: { downloads2016: true, notOneThing: true }
    });
  }

  function restoreStatuses(doc) {
    doc = doc || document;
    var map = [
      ["faceid", "[data-faceid-status]", "Face ID saved"],
      ["fortnite", "[data-fn-status]", "Fortnite saved"],
      ["twitter280", "[data-tw280-status]", "280 saved"],
      ["wannacry", "[data-wc-status]", "WannaCry saved"],
      ["vine-gone", "[data-vine-gone-status]", "Vine-gone saved"],
      ["teams-ga", "[data-teams-ga-status]", "Teams GA saved"],
      ["equifax", "[data-eq-status]", "Equifax saved"],
      ["win10", "[data-win10-status]", "Win10 saved"],
      ["chrome", "[data-chrome17-status], [data-chrome-status]", "Chrome saved"],
      ["musical", "[data-musical-status]", "musical.ly saved"],
      ["switch", "[data-switch-status]", "Switch saved"],
      ["bitcoin", "[data-btc-status]", "Bitcoin saved"],
      ["yahoo-3b", "[data-yh3b-status]", "Yahoo 3B saved"],
      ["netneutrality", "[data-nn-status]", "NN repeal saved"],
      ["snap-redesign", "[data-snap-status]", "Snap redesign saved"],
      ["nitro", "[data-nitro-status]", "Nitro saved"],
      ["fb-2b", "[data-fb2b-status]", "FB 2B saved"],
      ["snap-ipo", "[data-ipo-status]", "Snap IPO saved"],
      ["yt-tv", "[data-yttv-status]", "YouTube TV saved"],
      ["echo-show", "[data-echo-status]", "Echo Show saved"],
      ["notpetya", "[data-np-status]", "NotPetya saved"],
      ["flash-eol", "[data-fl-status]", "Flash EOL saved"],
      ["ios11", "[data-ios11-status]", "iOS 11 saved"],
      ["pixel2", "[data-px2-status]", "Pixel 2 saved"],
      ["krack", "[data-kr-status]", "KRACK saved"],
      ["nf-mylist", "[data-nf-status]", "My List saved"]
    ];
    var i;
    var any = false;
    for (i = 0; i < map.length; i++) {
      var blob = loadJSON(key(map[i][0]), null);
      var el = doc.querySelector(map[i][1]);
      if (blob) {
        any = true;
        if (el && !el.textContent) feedback(map[i][2] + " · " + key(map[i][0]), el);
      }
    }
    if (any) showNext(doc);
  }

  function bootHomePress(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-home-press]");
    if (!btn) return;
    var note = doc.querySelector("[data-home-pressed]");
    btn.addEventListener("click", function () {
      if (note) note.removeAttribute("hidden");
    });
  }

  function bootResidualNext(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var i;
    for (i = 0; i < btns.length; i++) {
      (function (btn) {
        var suffix = btn.getAttribute("data-storage-key") || "";
        if (suffix && loadJSON(key(suffix), null)) showNext(doc);
        btn.addEventListener("click", function () {
          setTimeout(function () {
            var s = btn.getAttribute("data-storage-key") || "";
            if (s && loadJSON(key(s), null)) showNext(doc);
          }, 0);
        });
      })(btns[i]);
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    if (ITT.YearExtras && ITT.YearExtras.isFillerPage && ITT.YearExtras.isFillerPage(doc)) return;
    bootFaceId(doc);
    bootFortnite(doc);
    bootTwitter280(doc);
    bootWannaCry(doc);
    bootVineGone(doc);
    bootTeamsGa(doc);
    bootEquifax(doc);
    bootWin10(doc);
    bootChrome17(doc);
    bootMusical(doc);
    bootSwitch(doc);
    bootBitcoin(doc);
    bootYahoo3b(doc);
    bootNn(doc);
    bootSnapRedesign(doc);
    bootNitro(doc);
    bootFb2b(doc);
    bootP2(doc);
    restoreStatuses(doc);
    bootHomePress(doc);
    bootResidualNext(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2017extras",
      featureKey: "year2017extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2017extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2017extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
