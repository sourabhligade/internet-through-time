/**
 * Pandora 2005 — station seed · canned tracks · thumbs · free-tier ads
 * Keys: itt05-pandora-station · summary itt05-pandora
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var TRACKS = [
    { id: "t1", artist: "Radiohead residual", title: "Fake Plastic Songs" },
    { id: "t2", artist: "The White Stripes residual", title: "Seven Nation Dial-up" },
    { id: "t3", artist: "Gwen Stefani residual", title: "Hollaback Modem" },
    { id: "t4", artist: "Green Day residual", title: "Boulevard of Broken 56k" },
    { id: "t5", artist: "Coldplay residual", title: "Yellow Bandwidth" },
    { id: "t6", artist: "Kelly Clarkson residual", title: "Since U Been Online" },
    { id: "t7", artist: "Kanye West residual", title: "Gold Digger (low bitrate)" },
    { id: "t8", artist: "Gnarls Barkley residual", title: "Crazy Codec" }
  ];

  function U() {
    return ITT.util || {};
  }
  function sk(suffix) {
    return U().immersionStorageKey
      ? U().immersionStorageKey(suffix, "itt05")
      : "itt05-" + suffix;
  }
  function loadJSON(k, fb) {
    try {
      var raw = localStorage.getItem(k);
      if (raw == null || raw === "") return fb;
      return JSON.parse(raw);
    } catch (e) {
      return fb;
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function feedback(msg, st, err) {
    if (st) {
      st.textContent = msg;
      st.style.color = err ? "#f88" : "#8f8";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err, kind: "pandora" });
      }
    } catch (e) { /* */ }
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-pd-root], [data-pd-create], [data-pd-now]")) return;

    var key = sk("pandora-station");
    var sum = sk("pandora");
    var status = doc.querySelector("[data-pd-status], [data-itt-action-status]");
    var stn = loadJSON(key, null);

    function persist() {
      if (!stn) return;
      stn.multiStep = true;
      stn.real = true;
      stn.year = "2005";
      stn.ts = Date.now();
      saveJSON(key, stn);
      saveJSON(sum, stn);
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) {
        /* */
      }
    }

    function currentTrack() {
      if (!stn) return TRACKS[0];
      var idx = typeof stn.index === "number" ? stn.index : 0;
      return TRACKS[((idx % TRACKS.length) + TRACKS.length) % TRACKS.length];
    }

    function renderNow() {
      var el = doc.querySelector("[data-pd-now]");
      if (!el) return;
      if (!stn || !stn.seed) {
        el.innerHTML = "<font color='#888'>No station yet — create one from a seed artist/song.</font>";
        return;
      }
      var t = currentTrack();
      var ad =
        stn.plays && stn.plays % 4 === 0 && stn.plays > 0
          ? "<p style='background:#330;padding:8px;border:1px solid #850' data-pd-ad>Free-tier ad residual · skip after literacy</p>"
          : "";
      el.innerHTML =
        "<p style='background:#222;padding:14px;border:1px solid #333'><b>" +
        esc(t.artist) +
        "</b><br>" +
        esc(t.title) +
        "<br><font size='1' color='#888'>Station: " +
        esc(stn.seed) +
        " · plays " +
        (stn.plays || 0) +
        " · ads " +
        (stn.adsSeen || 0) +
        "</font></p>" +
        ad;
    }

    renderNow();
    var seedOut = doc.querySelector("[data-pd-seed]");
    if (seedOut && stn && stn.seed) seedOut.textContent = stn.seed;

    var pdTrap = doc.querySelector("[data-pd-trap]");
    if (pdTrap && pdTrap.getAttribute("data-pd-trap-bound") !== "1") {
      pdTrap.setAttribute("data-pd-trap-bound", "1");
      pdTrap.addEventListener("click", function () {
        feedback("Pandora is not the 2005 star. That click never writes.", status, true);
      });
    }
    var create = doc.querySelector("[data-pd-create]");
    if (create) {
      create.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var inp = create.querySelector("#ott-field") || create.querySelector("[name='seed']");
        var seed = inp && inp.value != null ? String(inp.value).replace(/^\s+|\s+$/g, "") : "";
        if (seed.length < 2) {
          feedback("Type an artist or song seed first.", status, true);
          return;
        }
        stn = { seed: seed, thumbs: {}, plays: 1, adsSeen: 0, index: 0 };
        persist();
        feedback("Station created · " + seed + " (no real audio CDN).", status);
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e) { /* */ }
        renderNow();
      });
    }

    function needStation() {
      if (!stn || !stn.seed) {
        feedback("Create a station first.", status, true);
        return false;
      }
      return true;
    }

    function afterPlay() {
      stn.plays = (stn.plays || 0) + 1;
      if (stn.plays % 4 === 0) stn.adsSeen = (stn.adsSeen || 0) + 1;
      persist();
      renderNow();
    }

    var play = doc.querySelector("[data-pd-play], [data-ott-click='play']");
    if (play && play.getAttribute("data-pd-bound") !== "1") {
      play.setAttribute("data-pd-bound", "1");
      play.addEventListener("click", function () {
        if (!needStation()) return;
        afterPlay();
        feedback("Playing residual (silent bar · museum).", status);
      });
    }

    var up = doc.querySelector("[data-pd-up], [data-ott-click='up'], [data-ott-click='thumb-up']");
    if (up && up.getAttribute("data-pd-bound") !== "1") {
      up.setAttribute("data-pd-bound", "1");
      up.addEventListener("click", function () {
        if (!needStation()) return;
        var t = currentTrack();
        stn.thumbs[t.id] = 1;
        stn.index = (stn.index || 0) + 1;
        afterPlay();
        feedback("Thumb up · next residual track.", status);
      });
    }

    var down = doc.querySelector("[data-pd-down], [data-ott-click='down'], [data-ott-click='thumb-down']");
    if (down && down.getAttribute("data-pd-bound") !== "1") {
      down.setAttribute("data-pd-bound", "1");
      down.addEventListener("click", function () {
        if (!needStation()) return;
        var t = currentTrack();
        stn.thumbs[t.id] = -1;
        stn.index = (stn.index || 0) + 2;
        afterPlay();
        feedback("Thumb down · skipped residual.", status);
      });
    }

    var skip = doc.querySelector("[data-pd-skip], [data-ott-click='skip']");
    if (skip && skip.getAttribute("data-pd-bound") !== "1") {
      skip.setAttribute("data-pd-bound", "1");
      skip.addEventListener("click", function () {
        if (!needStation()) return;
        stn.index = (stn.index || 0) + 1;
        afterPlay();
        feedback("Skip residual (free-tier limit theater).", status);
      });
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "pandora", featureKey: "pandora", boot: boot });
  } else {
    features.push({
      id: "pandora",
      needs: function (cfg) {
        return !cfg.features || cfg.features.pandora !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
