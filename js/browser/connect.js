/**
 * Browser dial-up connect helpers (SRP)
 * Pure-ish helpers used by browser/create.js for connect ritual + modem audio.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var modemAudioCtx = null;
  var modemGain = null;

  function playModemSound(durationMs, opts) {
    opts = opts || {};
    if (opts.prefersReducedMotion) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!modemAudioCtx) modemAudioCtx = new AC();
      var ctx = modemAudioCtx;
      if (ctx.state === "suspended") ctx.resume();

      modemGain = ctx.createGain();
      modemGain.gain.setValueAtTime(0.07, ctx.currentTime);
      modemGain.connect(ctx.destination);

      var dur = (durationMs || 2400) / 1000;
      var now = ctx.currentTime;
      var t = now;

      var dial = ctx.createOscillator();
      dial.type = "sine";
      dial.frequency.setValueAtTime(350, t);
      dial.connect(modemGain);
      dial.start(t);
      dial.stop(t + 0.3);
      t += 0.35;

      var carrier = ctx.createOscillator();
      carrier.type = "sawtooth";
      carrier.frequency.setValueAtTime(1200, t);
      carrier.frequency.linearRampToValueAtTime(2400, t + 0.4);
      carrier.frequency.linearRampToValueAtTime(980, t + 0.8);
      carrier.connect(modemGain);
      carrier.start(t);
      carrier.stop(t + 0.8);
      t += 0.85;

      var remaining = Math.max(0.5, dur - (t - now));
      var bufSize = Math.floor(ctx.sampleRate * remaining);
      var noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      var data = noiseBuf.getChannelData(0);
      for (var ni = 0; ni < bufSize; ni++) {
        data[ni] = (Math.random() * 2 - 1) * 0.4;
        if (ni % 80 < 40) data[ni] *= 0.6;
      }
      var noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      var hpf = ctx.createBiquadFilter();
      hpf.type = "highpass";
      hpf.frequency.setValueAtTime(800, t);
      noise.connect(hpf);
      hpf.connect(modemGain);
      noise.start(t);
      noise.stop(t + remaining);

      modemGain.gain.setValueAtTime(0.07, now);
      modemGain.gain.linearRampToValueAtTime(0, now + dur);
    } catch (eAudio) { /* continue silently */ }
  }

  function stopModemSound() {
    if (modemGain && modemAudioCtx) {
      try {
        modemGain.gain.cancelScheduledValues(modemAudioCtx.currentTime);
        modemGain.gain.setValueAtTime(0, modemAudioCtx.currentTime);
      } catch (e) { /* */ }
    }
  }

  function connectSequence(busyFirst, config) {
    config = config || {};
    var mode = String(config.connectMode || "dialup").toLowerCase();
    // 2001–2002 always-on broadband minority: skip ATDT modem ritual
    if (mode === "broadband" || mode === "always-on" || mode === "always_on") {
      return [
        "Initializing network adapter...",
        "DHCP discover...",
        "IP address assigned.",
        "DNS servers resolved.",
        config.connectSpeedLine || "Connected · always-on broadband",
        "Network stack ready.",
        "Connected to Internet.",
        config.connectBrowserLine || "Starting Internet Explorer 6.0..."
      ];
    }
    var lines = [
      "Initializing modem...",
      "ATZ",
      "OK",
      "ATDT 1-800-555-WEB1",
      "DIALING...",
      "RINGING..."
    ];
    if (busyFirst) {
      lines.push("BUSY", "Hanging up...", "Retrying...", "ATDT 1-800-555-WEB1", "DIALING...");
    }
    lines = lines.concat([
      "CONNECT",
      config.connectSpeedLine || "CONNECT 28800/ARQ",
      "Negotiating PPP...",
      "Authenticating...",
      "Login successful.",
      "Connected to Internet.",
      config.connectBrowserLine || "Starting Netscape Navigator…"
    ]);
    return lines;
  }

  ITT.BrowserConnect = {
    playModemSound: playModemSound,
    stopModemSound: stopModemSound,
    connectSequence: connectSequence,
    install: function (/* api */) { /* optional future full wire */ }
  };
})(typeof window !== "undefined" ? window : this);
