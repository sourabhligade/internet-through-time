/**
 * Immersion feature: media-1994
 * Registers with ITT.ImmersionFeatures — init(api) only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }

  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "media-1994",
    needs: function () { return true; },
    init: function (api) {
      var config = api.config;
      var YEAR = api.YEAR;
      var R = api.R;
      var storageKey = api.storageKey;
      var qs = api.qs;
      var escapeHtml = api.escapeHtml;
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var showFlash = api.showFlash;
      var markTourProgress = api.markTourProgress;
      var markTourUsed = api.markTourUsed || api.markTourProgress;
      var renderCounter = api.renderCounter;
      var parentBrowser = api.parentBrowser;

function initFishCam(root) {
  var img = root.querySelector("[data-fish-frame]");
  var label = root.querySelector("[data-fish-label]");
  if (!img) return;
  var frames = [];
  for (var i = 0; i < 4; i++) {
    var attr = img.getAttribute("data-frame-" + i);
    frames.push({
      src: attr || (i === 0 ? img.src : ""),
      caption: "Tank view " + String.fromCharCode(65 + i)
    });
  }
  var n = parseInt(localStorage.getItem(storageKey("fishcam-n")) || "0", 10) || 0;
  var frame = frames[n % frames.length];
  if (frame.src) img.src = frame.src;
  localStorage.setItem(storageKey("fishcam-n"), String(n + 1));
  if (label) {
    label.textContent = "Frame " + ((n % frames.length) + 1) + " of " + frames.length +
      " · " + frame.caption + " · Reload for next frame · " + new Date().toLocaleTimeString();
  }
  var stamp = root.querySelector("[data-fish-time]");
  if (stamp) {
    var mins = 3 + (n % 5);
    stamp.textContent = "Last update: " + new Date().toLocaleTimeString() +
      " · next capture in ~" + mins + " min";
  }
}

/* ---------- Cool Site of the Day rotation (1994) ---------- */
function initCsotd(root) {
  var host = root || document.querySelector("[data-csotd]");
  if (!host) return;
  var picks = [
    { href: "../iuma/index.html", title: "Internet Underground Music Archive", blurb: "Unsigned bands. Digital audio. Downloads longer than lunch." },
    { href: "../fishcam/index.html", title: "Fish Cam", blurb: "A camera. A tank. Continuously updated over the Net." },
    { href: "../cern/index.html", title: "World Wide Web at CERN", blurb: "Where hypertext met the Internet." },
    { href: "../whitehouse/index.html", title: "The White House", blurb: "Citizens meet the Executive Branch online." },
    { href: "../hotwired/index.html", title: "HotWired", blurb: "A magazine born on the Web — banners and all." },
    { href: "../nasa/index.html", title: "NASA", blurb: "Public-domain space pictures for the patiently connected." },
    { href: "../personal/messy.html", title: "A personal home page", blurb: "Anyone with an account can publish." }
  ];
  var day = Math.floor(Date.now() / 86400000);
  var pick = picks[day % picks.length];
  var link = host.querySelector("[data-csotd-link]");
  var blurb = host.querySelector("[data-csotd-blurb]");
  var stampEl = host.querySelector("[data-csotd-date]");
  if (link) {
    link.href = pick.href;
    link.textContent = pick.title;
  }
  if (blurb) blurb.textContent = pick.blurb;
  if (stampEl) {
    var d = new Date();
    stampEl.textContent = d.toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }
}

/* ---------- IUMA player (1994) ---------- */
function initIumaPlayer(root) {
  var audioSrc = root.getAttribute("data-audio-src");
  if (!audioSrc) return;
  var bar = root.querySelector("[data-player-bar]");
  var st = root.querySelector("[data-player-status]");
  var btn = root.querySelector("[data-player-play]");
  var log = root.querySelector("[data-player-log]");
  var eta = root.querySelector("[data-player-eta]");
  var audio = new Audio(audioSrc);
  audio.preload = "auto";
  var playing = false;
  function setStatus(msg) { if (st) st.textContent = msg; }
  function setBar(pct) {
    if (!bar) return;
    pct = Math.max(0, Math.min(100, pct));
    var filled = Math.floor(pct / 10);
    var s = "[";
    for (var i = 0; i < 10; i++) s += i < filled ? "#" : "-";
    bar.textContent = s + "] " + pct + "%";
  }
  function setBtnLabel(label) {
    if (!btn) return;
    if (btn.tagName === "INPUT") btn.value = label;
    else btn.textContent = label;
  }
  var mode = root.getAttribute("data-player-mode") || "download";
  var steps = mode === "instant" ? 3 : 14;
  var step = 0;
  var totalMb = parseFloat(root.getAttribute("data-size-mb") || "2.1") || 2.1;
  setStatus("Contacting www.iuma.com…");
  setBar(0);
  if (eta) {
    eta.textContent = "Estimated time at 14,400 bps: ~" +
      Math.max(8, Math.round(totalMb * 10)) + " min (sped up for this session)";
  }
  var dl = setInterval(function () {
    step++;
    var pct = Math.floor((step / steps) * 100);
    setBar(pct);
    var received = (totalMb * pct / 100).toFixed(2);
    setStatus("Receiving audio/x-mpeg… " + received + " MB of " + totalMb.toFixed(1) + " MB (" + pct + "%)");
    if (log) log.textContent += ".";
    if (step >= steps) {
      clearInterval(dl);
      setStatus("Download complete. Helper ready — press Play.");
      setBar(100);
      if (eta) eta.textContent = "Saved to C:\\TEMP\\track.mp2 (local helper cache)";
      if (btn) btn.disabled = false;
      if (root.getAttribute("data-autoplay") === "1") tryPlay();
    }
  }, mode === "instant" ? 100 : 280);

  function tryPlay() {
    setStatus("Launching helper application for audio/x-mpeg…");
    audio.currentTime = 0;
    var p = audio.play();
    if (p && p.catch) {
      p.catch(function () {
        setStatus("Click Play — browser blocked autoplay.");
      });
    }
    playing = true;
    setBtnLabel("Stop");
  }
  if (btn) {
    btn.disabled = true;
    btn.addEventListener("click", function () {
      if (playing && !audio.paused) {
        audio.pause();
        playing = false;
        setBtnLabel("Play");
        setStatus("Stopped.");
      } else {
        tryPlay();
      }
    });
  }
  audio.addEventListener("timeupdate", function () {
    if (!audio.duration) return;
    setBar(Math.floor((audio.currentTime / audio.duration) * 100));
    setStatus("Playing… " + Math.floor(audio.currentTime) + "s / " + Math.floor(audio.duration) + "s");
  });
  audio.addEventListener("ended", function () {
    playing = false;
    setBtnLabel("Play again");
    setStatus("Finished.");
    setBar(100);
  });
}

      var fish = document.querySelectorAll("[data-fishcam]");
      for (var f = 0; f < fish.length; f++) initFishCam(fish[f]);
      var csotd = document.querySelectorAll("[data-csotd]");
      for (var c = 0; c < csotd.length; c++) initCsotd(csotd[c]);
      var players = document.querySelectorAll("[data-iuma-player]");
      for (var p = 0; p < players.length; p++) initIumaPlayer(players[p]);

    }
  });
})(typeof window !== "undefined" ? window : this);
