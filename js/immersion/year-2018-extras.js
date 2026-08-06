/**
 * 2018 REAL product theaters — multi-step localStorage only (itt18-*)
 * GDPR · platform trust/CA careful · TikTok · IGTV
 * Complex: Netflix · Spotify · YouTube · Discord · Twitter 280 residual
 * P1: XS/XR · Google+ dual
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function prefix() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "2018";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt18";
  }
  function key(suffix) {
    var fb = prefix();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, fb) : fb + "-" + suffix;
  }
  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      st.textContent = msg;
      st.style.color = opts.error ? "#a00" : "#060";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: !opts.error, status: st, ms: 3200 });
      }
    } catch (e) {
      /* */
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      /* */
    }
  }
  function loadJSON(k, fb) {
    try {
      var r = localStorage.getItem(k);
      if (!r) return fb;
      return JSON.parse(r);
    } catch (e) {
      return fb;
    }
  }
  function markUsed() {
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
    } catch (e) {
      /* */
    }
  }
  function checked(doc, sel) {
    var el = doc.querySelector(sel);
    return !!(el && el.checked);
  }
  function val(doc, sel) {
    var el = doc.querySelector(sel);
    return el ? String(el.value || "").trim() : "";
  }

  /* ——— P0: GDPR ——— */
  function bootGdpr(doc) {
    doc = doc || document;
    var banner = doc.querySelector("[data-gdpr-banner]");
    var manageBtn = doc.querySelector("[data-gdpr-manage]");
    var acceptBtn = doc.querySelector("[data-gdpr-accept-all]");
    var rejectBtn = doc.querySelector("[data-gdpr-reject]");
    var panel = doc.querySelector("[data-gdpr-panel]");
    var saveBtn = doc.querySelector("[data-gdpr-save]");
    var dim = doc.querySelector("[data-gdpr-dim]");
    var st = doc.querySelector("[data-gdpr-status]");
    if (!banner && !saveBtn) return;

    function openPanel() {
      if (panel) panel.classList.add("is-open");
      feedback("Manage preferences open — complete rights literacy, then Save.", st);
    }
    if (manageBtn) manageBtn.addEventListener("click", openPanel);
    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        openPanel();
        var nec = doc.querySelector("[data-gdpr-necessary]");
        if (nec) nec.checked = true;
        feedback("Accept-all path: still confirm rights literacy, then Save choices.", st);
      });
    }
    if (rejectBtn) {
      rejectBtn.addEventListener("click", function () {
        openPanel();
        var a = doc.querySelector("[data-gdpr-analytics]");
        var m = doc.querySelector("[data-gdpr-marketing]");
        if (a) a.checked = false;
        if (m) m.checked = false;
        feedback("Non-essential off — confirm rights literacy, then Save.", st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-gdpr-necessary]") && !doc.querySelector("[data-gdpr-necessary][disabled]")) {
          /* necessary may be locked checked via HTML */
        }
        var necEl = doc.querySelector("[data-gdpr-necessary]");
        if (necEl && !necEl.checked) {
          feedback("Necessary cookies stay on under GDPR museum path.", st, { error: true });
          return;
        }
        if (!checked(doc, "[data-gdpr-rights]")) {
          feedback("Check rights literacy (access · erasure · portability · withdraw) — not legal advice.", st, {
            error: true
          });
          return;
        }
        if (panel && !panel.classList.contains("is-open") && manageBtn) {
          feedback("Open Manage preferences first (museum multi-step).", st, { error: true });
          return;
        }
        saveJSON(key("gdpr"), {
          multiStep: true,
          real: true,
          applies: "2018-05-25",
          analytics: checked(doc, "[data-gdpr-analytics]"),
          marketing: checked(doc, "[data-gdpr-marketing]"),
          rightsLiteracy: true,
          ts: Date.now()
        });
        if (banner) banner.style.display = "none";
        if (dim) dim.classList.remove("itt18-cookie-dim");
        feedback("Consent choices saved (museum only) · " + key("gdpr"), st);
        markUsed();
      });
    }
  }

  /* ——— P0: Trust / CA careful ——— */
  function bootTrust(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ca-save]");
    var st = doc.querySelector("[data-ca-status]");
    var cards = doc.querySelectorAll("[data-ca-card]");
    var opened = 0;
    var i;
    for (i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function () {
        this.classList.add("is-open");
        opened++;
        feedback("Timeline card open.", st);
      });
    }
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (opened < 1 && cards.length) {
        feedback("Open at least one timeline card first.", st, { error: true });
        return;
      }
      if (
        !checked(doc, "[data-ca-api]") ||
        !checked(doc, "[data-ca-congress]") ||
        !checked(doc, "[data-ca-controls]") ||
        !checked(doc, "[data-ca-careful]")
      ) {
        feedback("All 3 literacy checks + careful framing ack required.", st, { error: true });
        return;
      }
      saveJSON(key("ca"), {
        multiStep: true,
        real: true,
        careful: true,
        expose: "2018-03-17",
        congress: "2018-04-10",
        scaleClass: 87000000,
        ts: Date.now()
      });
      feedback("Platform trust literacy (careful) · " + key("ca"), st);
      markUsed();
    });
  }

  /* ——— P0: TikTok merge ——— */
  function bootTiktok(doc) {
    doc = doc || document;
    var clips = doc.querySelectorAll("[data-tt-clip]");
    var likeBtn = doc.querySelector("[data-tt-like]");
    var saveBtn = doc.querySelector("[data-tt-save]");
    var st = doc.querySelector("[data-tt-status]");
    var stage = doc.querySelector("[data-tt-stage]");
    var opened = false;
    var liked = false;
    var i;
    for (i = 0; i < clips.length; i++) {
      clips[i].addEventListener("click", function () {
        var t = this.getAttribute("data-tt-clip") || "clip";
        opened = true;
        var j;
        for (j = 0; j < clips.length; j++) clips[j].classList.remove("is-playing");
        this.classList.add("is-playing");
        if (stage) stage.textContent = "▶ Playing silhouette: " + t + " (theater · no sound rip)";
        feedback("Clip open (For You theater).", st);
      });
    }
    if (likeBtn) {
      likeBtn.addEventListener("click", function () {
        if (!opened) {
          feedback("Open a clip first.", st, { error: true });
          return;
        }
        liked = true;
        feedback("Like residual (theater).", st);
      });
    }
    if (!saveBtn) return;
    saveBtn.addEventListener("click", function () {
      if (!checked(doc, "[data-tt-brand]") || !checked(doc, "[data-tt-migrate]")) {
        feedback("Merge honesty: TikTok brand + migrate class required.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-tt-fyp]")) {
        feedback("Confirm For You is theater (not a real algo).", st, { error: true });
        return;
      }
      if (!opened) {
        feedback("Open at least one silhouette clip first.", st, { error: true });
        return;
      }
      saveJSON(key("tiktok"), {
        multiStep: true,
        real: true,
        merge: "2018-08-02",
        liked: liked,
        silhouetteOnly: true,
        ts: Date.now()
      });
      feedback("TikTok merge session · " + key("tiktok"), st);
      markUsed();
    });
  }

  /* ——— P0: IGTV ——— */
  function bootIgtv(doc) {
    doc = doc || document;
    var chans = doc.querySelectorAll("[data-igtv-channel]");
    var playBtn = doc.querySelector("[data-igtv-play]");
    var saveBtn = doc.querySelector("[data-igtv-save]");
    var player = doc.querySelector("[data-igtv-player]");
    var st = doc.querySelector("[data-igtv-status]");
    var channel = null;
    var playing = false;
    var i;
    for (i = 0; i < chans.length; i++) {
      chans[i].addEventListener("click", function () {
        channel = this.getAttribute("data-igtv-channel") || "channel";
        var j;
        for (j = 0; j < chans.length; j++) chans[j].style.fontWeight = "normal";
        this.style.fontWeight = "bold";
        feedback("Channel: " + channel, st);
      });
    }
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (!channel) {
          feedback("Pick a channel first.", st, { error: true });
          return;
        }
        playing = true;
        if (player) {
          player.classList.add("is-playing");
          var label = player.querySelector("[data-igtv-label]");
          if (label) label.textContent = "▶ " + channel + " · vertical long-form theater";
        }
        feedback("Watch segment theater.", st);
      });
    }
    if (!saveBtn) return;
    saveBtn.addEventListener("click", function () {
      if (!checked(doc, "[data-igtv-date]") || !checked(doc, "[data-igtv-format]") || !checked(doc, "[data-igtv-not-reels]")) {
        feedback("Jun 20 · ≤1 hour vertical · not Reels honesty required.", st, { error: true });
        return;
      }
      if (!channel || !playing) {
        feedback("Pick a channel and play a segment first.", st, { error: true });
        return;
      }
      saveJSON(key("igtv"), {
        multiStep: true,
        real: true,
        launch: "2018-06-20",
        channel: channel,
        notReels: true,
        ts: Date.now()
      });
      feedback("IGTV session · " + key("igtv"), st);
      markUsed();
    });
  }

  /* ——— Complex modern (from 2017 pattern) ——— */
  function bootNetflix(doc) {
    doc = doc || document;
    var tiles = doc.querySelectorAll("[data-nf-title]");
    var listEl = doc.querySelector("[data-nf-mylist]");
    var detail = doc.querySelector("[data-nf-detail]");
    var addBtn = doc.querySelector("[data-nf-add]");
    var saveBtn = doc.querySelector("[data-nf-save]");
    var st = doc.querySelector("[data-nf-status]");
    var selected = null;
    var myList = loadJSON(key("netflix-list"), []);
    if (!Array.isArray(myList)) myList = [];
    function renderList() {
      if (!listEl) return;
      listEl.innerHTML =
        myList.length === 0
          ? "<span style='opacity:0.7'>My List empty — pick a title.</span>"
          : myList
              .map(function (t) {
                return "<div>• " + t + "</div>";
              })
              .join("");
    }
    renderList();
    var i;
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function () {
        var t = this.getAttribute("data-nf-title");
        selected = t;
        var j;
        for (j = 0; j < tiles.length; j++) tiles[j].classList.remove("is-selected");
        this.classList.add("is-selected");
        if (detail) detail.textContent = "Selected: " + t + " · 2018 binge residual";
      });
    }
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        if (!selected) {
          feedback("Pick a title tile first.", st, { error: true });
          return;
        }
        if (myList.indexOf(selected) === -1) myList.push(selected);
        saveJSON(key("netflix-list"), myList);
        renderList();
        feedback("Added to My List (theater): " + selected, st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!myList.length) {
          feedback("Add at least one title to My List first.", st, { error: true });
          return;
        }
        saveJSON(key("netflix"), {
          multiStep: true,
          real: true,
          list: myList.slice(),
          ts: Date.now()
        });
        feedback("Netflix queue saved · " + key("netflix"), st);
        markUsed();
      });
    }
  }

  function bootSpotify(doc) {
    doc = doc || document;
    var playBtn = doc.querySelector("[data-sp-play]");
    var saveBtn = doc.querySelector("[data-sp-save]");
    var st = doc.querySelector("[data-sp-status]");
    var now = doc.querySelector("[data-sp-now]");
    var played = false;
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        var q = val(doc, "[data-sp-search]");
        if (q.length < 1) {
          feedback("Search a track first.", st, { error: true });
          return;
        }
        played = true;
        if (now) now.textContent = "▶ " + q + " · free-tier residual (ads theater)";
        feedback("Playing free-tier residual (theater).", st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!played) {
          feedback("Play a search result first.", st, { error: true });
          return;
        }
        if (!checked(doc, "[data-sp-free]")) {
          feedback("Confirm free-tier residual honesty.", st, { error: true });
          return;
        }
        saveJSON(key("spotify"), {
          multiStep: true,
          real: true,
          freeTier: true,
          query: val(doc, "[data-sp-search]"),
          ts: Date.now()
        });
        feedback("Spotify session · " + key("spotify"), st);
        markUsed();
      });
    }
  }

  function bootYouTube(doc) {
    doc = doc || document;
    var watchBtn = doc.querySelector("[data-yt-watch]");
    var saveBtn = doc.querySelector("[data-yt-save]");
    var st = doc.querySelector("[data-yt-status]");
    var stage = doc.querySelector("[data-yt-stage]");
    var watched = false;
    if (watchBtn) {
      watchBtn.addEventListener("click", function () {
        var q = val(doc, "[data-yt-search]");
        if (q.length < 1) {
          feedback("Search first.", st, { error: true });
          return;
        }
        watched = true;
        if (stage) {
          stage.innerHTML =
            "<div style='padding:24px;background:#222;text-align:center'>▶ " +
            q +
            "</div><p style='font-size:11px;opacity:0.8'>Related: more 2018 creator residual…</p>";
        }
        feedback("Watch theater open.", st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!watched) {
          feedback("Open a watch first.", st, { error: true });
          return;
        }
        saveJSON(key("youtube"), {
          multiStep: true,
          real: true,
          query: val(doc, "[data-yt-search]"),
          ts: Date.now()
        });
        feedback("YouTube watch saved · " + key("youtube"), st);
        markUsed();
      });
    }
  }

  function bootDiscord(doc) {
    doc = doc || document;
    var sendBtn = doc.querySelector("[data-dc-send]");
    var saveBtn = doc.querySelector("[data-dc-save]");
    var chat = doc.querySelector("[data-dc-chat]");
    var st = doc.querySelector("[data-dc-status]");
    var sent = 0;
    function appendLine(line) {
      if (!chat) return;
      var d = doc.createElement("div");
      d.textContent = line;
      chat.appendChild(d);
    }
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var ch = val(doc, "[data-dc-channel]") || "#general";
        var msg = val(doc, "[data-dc-msg]");
        if (msg.length < 1) {
          feedback("Type a message.", st, { error: true });
          return;
        }
        sent++;
        appendLine("[" + ch + "] you: " + msg);
        feedback("Message sent (theater).", st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (sent < 1) {
          feedback("Send at least one channel message first.", st, { error: true });
          return;
        }
        if (!checked(doc, "[data-dc-nitro]")) {
          feedback("Read Nitro residual literacy note.", st, { error: true });
          return;
        }
        saveJSON(key("discord"), {
          multiStep: true,
          real: true,
          messages: sent,
          nitroResidual: true,
          ts: Date.now()
        });
        feedback("Discord + Nitro residual · " + key("discord"), st);
        markUsed();
      });
    }
  }

  function bootTwitter280(doc) {
    doc = doc || document;
    var ta = doc.querySelector("[data-tw280-text]");
    var counter = doc.querySelector("[data-tw280-count]");
    var btn = doc.querySelector("[data-tw280-save]");
    var st = doc.querySelector("[data-tw280-status]");
    function updateCount() {
      if (!ta || !counter) return;
      var n = String(ta.value || "").length;
      counter.textContent = n + " / 280";
      counter.style.color = n > 280 ? "#a00" : n > 140 ? "#1da1f2" : "#666";
    }
    if (ta) {
      ta.addEventListener("input", updateCount);
      updateCount();
    }
    if (!btn) return;
    btn.addEventListener("click", function () {
      var n = ta ? String(ta.value || "").length : 0;
      if (n < 141) {
        feedback("Type past 140 characters to feel the 280 residual.", st, { error: true });
        return;
      }
      if (n > 280) {
        feedback("Still max 280 (museum).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-tw280-cjk]")) {
        feedback("Confirm CJK still 140 honesty residual.", st, { error: true });
        return;
      }
      saveJSON(key("twitter"), {
        multiStep: true,
        real: true,
        residual280: true,
        length: n,
        ts: Date.now()
      });
      feedback("280 composer residual · " + key("twitter"), st);
      markUsed();
    });
  }

  function bootModernLobby(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-modern17-save], [data-modern18-save]");
    var st = doc.querySelector("[data-modern17-status], [data-modern18-status]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var n = 0;
      if (checked(doc, "[data-modern17-a]") || checked(doc, "[data-modern18-a]")) n++;
      if (checked(doc, "[data-modern17-b]") || checked(doc, "[data-modern18-b]")) n++;
      if (checked(doc, "[data-modern17-c]") || checked(doc, "[data-modern18-c]")) n++;
      if (n < 3) {
        feedback("Check all 3 modern-web boxes.", st, { error: true });
        return;
      }
      saveJSON(key("modern"), {
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("Modern web lobby · " + key("modern"), st);
      markUsed();
    });
  }

  /* ——— P1: iPhone XS / XR ——— */
  function bootIphoneXs(doc) {
    doc = doc || document;
    var tiers = doc.querySelectorAll("[data-xs-tier]");
    var saveBtn = doc.querySelector("[data-xs-save]");
    var st = doc.querySelector("[data-xs-status]");
    var picked = null;
    var i;
    for (i = 0; i < tiers.length; i++) {
      tiers[i].addEventListener("click", function () {
        picked = this.getAttribute("data-xs-tier");
        var j;
        for (j = 0; j < tiers.length; j++) tiers[j].classList.remove("is-selected");
        this.classList.add("is-selected");
        feedback("Selected " + picked, st);
      });
    }
    if (!saveBtn) return;
    saveBtn.addEventListener("click", function () {
      if (!picked) {
        feedback("Pick a price tier (XR / XS / XS Max).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-xs-faceid]") || !checked(doc, "[data-xs-notch]")) {
        feedback("Face ID residual + notch residual honesty required.", st, { error: true });
        return;
      }
      saveJSON(key("iphonexs"), {
        multiStep: true,
        real: true,
        announce: "2018-09-12",
        tier: picked,
        faceIdResidual: true,
        ts: Date.now()
      });
      feedback("iPhone XS/XR residual · " + key("iphonexs"), st);
      markUsed();
    });
  }

  /* ——— P1: Google+ dual-date ——— */
  function bootGplus(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-gplus18-save]");
    var st = doc.querySelector("[data-gplus18-status]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-gplus18-announce]") || !checked(doc, "[data-gplus18-offline]")) {
        feedback("Both dates: Oct 8 2018 announce AND Apr 2 2019 offline.", st, { error: true });
        return;
      }
      saveJSON(key("gplus"), {
        multiStep: true,
        real: true,
        announce: "2018-10-08",
        offline: "2019-04-02",
        dualDate: true,
        ts: Date.now()
      });
      feedback("Google+ dual-date · " + key("gplus"), st);
      markUsed();
    });
  }

  /* Residual WannaCry (May 12 2017 event · densify in 2018 room) */
  function bootWannaCryResidual(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-wc-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-wc-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-wc-date]") ||
        !checked(doc, "[data-wc-patch]") ||
        !checked(doc, "[data-wc-nopoc]")
      ) {
        feedback("Date · patch · no-PoC honesty required.", st, { error: true });
        return;
      }
      saveJSON(key("wannacry"), {
        multiStep: true,
        real: true,
        residualFrom: "2017-05-12",
        date: "2017-05-12",
        patch: "MS17-010",
        noPoc: true,
        yearRoom: "2018",
        ts: Date.now()
      });
      feedback("WannaCry residual patch literacy · " + key("wannacry"), st);
      markUsed();
    });
  }

  /* Residual Face ID / Fortnite (from 2017) — densify saves still work */
  function bootFaceIdResidual(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-faceid-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-faceid-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-faceid-notch]") ||
        !checked(doc, "[data-faceid-look]") ||
        !checked(doc, "[data-faceid-price]") ||
        !checked(doc, "[data-faceid-store]")
      ) {
        feedback("Complete residual Face ID checks (notch · look · price · store date).", st, { error: true });
        return;
      }
      saveJSON(key("faceid"), {
        multiStep: true,
        real: true,
        residualFrom: "2017",
        ts: Date.now()
      });
      feedback("Face ID residual literacy · " + key("faceid"), st);
      markUsed();
    });
  }

  function bootFortniteResidual(doc) {
    doc = doc || document;
    var dropBtn = doc.querySelector("[data-fn-drop]");
    var saveBtn = doc.querySelector("[data-fn-save]");
    var st = doc.querySelector("[data-fn-status]");
    var log = doc.querySelector("[data-fn-log]");
    var dropped = false;
    function render() {
      if (!log) return;
      log.textContent = dropped ? "● Dropped (silhouette theater)" : "○ Not dropped yet";
    }
    render();
    if (dropBtn) {
      dropBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-fn-free]")) {
          feedback("Confirm free-to-play residual first.", st, { error: true });
          return;
        }
        dropped = true;
        render();
        feedback("Dropped (theater).", st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-fn-free]") || !checked(doc, "[data-fn-sil]")) {
          feedback("Free ack + silhouette honesty required.", st, { error: true });
          return;
        }
        if (!dropped) {
          feedback("Drop first.", st, { error: true });
          return;
        }
        saveJSON(key("fortnite"), {
          multiStep: true,
          real: true,
          residualFrom: "2017-09-26",
          silhouetteOnly: true,
          ts: Date.now()
        });
        feedback("Fortnite residual · " + key("fortnite"), st);
        markUsed();
      });
    }
  }

  function bootChrome(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-chrome17-save], [data-chrome18-save]");
    var st = doc.querySelector("[data-chrome17-status], [data-chrome18-status]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (
        !(checked(doc, "[data-chrome17-habit]") || checked(doc, "[data-chrome18-habit]")) ||
        !(checked(doc, "[data-chrome17-edge]") || checked(doc, "[data-chrome18-edge]")) ||
        !(checked(doc, "[data-chrome17-win10]") || checked(doc, "[data-chrome18-win10]"))
      ) {
        feedback("Confirm habit · Edge residual · Win10 mass.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), {
        multiStep: true,
        real: true,
        year: "2018",
        ts: Date.now()
      });
      feedback("Chrome REAL · " + key("chrome"), st);
      markUsed();
    });
  }

  function bootWin10(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-win10-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-win10-mass]") ||
        !checked(doc, "[data-win10-free-ended]") ||
        !checked(doc, "[data-win10-edge]")
      ) {
        feedback("Mass OS · free-upgrade-ended · Edge residual all required.", st, { error: true });
        return;
      }
      saveJSON(key("win10"), {
        multiStep: true,
        real: true,
        massDefault: true,
        freeUpgradeEnded: "2016-07-29",
        year: "2018",
        ts: Date.now()
      });
      feedback("Win10 mass residual REAL · " + key("win10"), st);
      markUsed();
    });
  }

  function bootEdge(doc) {
    doc = doc || document;
    var prefer = doc.querySelector("[data-edge-prefer]");
    var saveBtn = doc.querySelector("[data-edge-save]");
    var st = doc.querySelector("[data-edge-status]");
    var preferred = false;
    if (prefer) {
      prefer.addEventListener("click", function () {
        if (!checked(doc, "[data-edge-ships]") || !checked(doc, "[data-edge-not-chromium]")) {
          feedback("Confirm ships-with-Win10 residual + not Chromium Edge.", st, { error: true });
          return;
        }
        preferred = true;
        feedback("Preferred browser theater set — now Save Edge REAL.", st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-edge-ships]") || !checked(doc, "[data-edge-not-chromium]")) {
          feedback("Both honesty checks required.", st, { error: true });
          return;
        }
        if (!preferred) {
          feedback("Set as preferred browser (theater) first.", st, { error: true });
          return;
        }
        saveJSON(key("edge"), {
          multiStep: true,
          real: true,
          residual: true,
          notChromium: true,
          year: "2018",
          ts: Date.now()
        });
        feedback("Edge residual REAL · " + key("edge"), st);
        markUsed();
      });
    }
  }

  function bootAmp(doc) {
    doc = doc || document;
    var openBtn = doc.querySelector("[data-amp-open]");
    var saveBtn = doc.querySelector("[data-amp-save]");
    var panel = doc.querySelector("[data-amp-panel]");
    var st = doc.querySelector("[data-amp-status]");
    var opened = false;
    if (openBtn) {
      openBtn.addEventListener("click", function () {
        opened = true;
        if (panel) {
          panel.innerHTML =
            "<div style='border:1px solid #005af0;padding:10px;background:#fafafa'>" +
            "<b>⚡ AMP</b> · lightweight mobile article (theater)<br>" +
            "<span style='font-size:11px;color:#555'>Residual 2018 densify · not Instant Articles.</span>" +
            "</div>";
        }
        feedback("AMP lightning open.", st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!opened) {
          feedback("Open an AMP card first.", st, { error: true });
          return;
        }
        if (!checked(doc, "[data-amp-not-ia]")) {
          feedback("Confirm not Instant Articles honesty.", st, { error: true });
          return;
        }
        saveJSON(key("amp"), {
          multiStep: true,
          real: true,
          lightning: true,
          residual: true,
          ts: Date.now()
        });
        feedback("AMP literacy REAL · " + key("amp"), st);
        markUsed();
      });
    }
  }

  function bootMedium(doc) {
    doc = doc || document;
    var clapBtn = doc.querySelector("[data-md-clap]");
    var saveBtn = doc.querySelector("[data-md-save]");
    var st = doc.querySelector("[data-md-status]");
    var clapEl = doc.querySelector("[data-md-claps]");
    var claps = 0;
    if (clapBtn) {
      clapBtn.addEventListener("click", function () {
        var draft = val(doc, "[data-md-draft]");
        if (draft.length < 3 && claps === 0) {
          feedback("Write a draft (3+ chars) or clap an open story.", st, { error: true });
          return;
        }
        claps++;
        if (clapEl) clapEl.textContent = "👏 " + claps;
        feedback("Clap theater ×" + claps, st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        var draft = val(doc, "[data-md-draft]");
        if (draft.length < 3 && claps < 1) {
          feedback("Draft 3+ chars or clap at least once.", st, { error: true });
          return;
        }
        saveJSON(key("medium"), {
          multiStep: true,
          real: true,
          draft: draft,
          claps: claps,
          residual: true,
          ts: Date.now()
        });
        feedback("Medium session REAL · " + key("medium"), st);
        markUsed();
      });
    }
  }

  function bootMusically(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-mly18-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-mly18-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-mly18-acquire]") ||
        !checked(doc, "[data-mly18-merge]") ||
        !checked(doc, "[data-mly18-brand]")
      ) {
        feedback("Acquire 2017 · Aug 2 merge · TikTok brand all required.", st, { error: true });
        return;
      }
      saveJSON(key("musical"), {
        multiStep: true,
        real: true,
        reverseToTikTok: true,
        merge: "2018-08-02",
        ts: Date.now()
      });
      feedback("Musical.ly→TikTok reverse REAL · " + key("musical") + " · open TikTok room next", st);
      markUsed();
    });
  }

  function bootCryptoWinter(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-crypto18-save], [data-crypto-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-crypto18-status], [data-crypto-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-crypto18-advice]") && !checked(doc, "[data-crypto-advice]")) {
        feedback("Confirm not financial advice.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-crypto18-winter]") && !checked(doc, "[data-crypto-peak]")) {
        feedback("Confirm post-peak winter honesty.", st, { error: true });
        return;
      }
      if (doc.querySelector("[data-crypto18-no-trade]") && !checked(doc, "[data-crypto18-no-trade]")) {
        feedback("Confirm no trade / deposit theater.", st, { error: true });
        return;
      }
      if (doc.querySelector("[data-crypto-ico]") && !checked(doc, "[data-crypto-ico]") && !checked(doc, "[data-crypto18-no-trade]")) {
        feedback("Complete remaining crypto honesty checks.", st, { error: true });
        return;
      }
      saveJSON(key("crypto"), {
        multiStep: true,
        real: true,
        winter: true,
        notAdvice: true,
        year: "2018",
        ts: Date.now()
      });
      feedback("Crypto winter literacy REAL · " + key("crypto"), st);
      markUsed();
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootGdpr(doc);
    bootTrust(doc);
    bootTiktok(doc);
    bootIgtv(doc);
    bootNetflix(doc);
    bootSpotify(doc);
    bootYouTube(doc);
    bootDiscord(doc);
    bootTwitter280(doc);
    bootModernLobby(doc);
    bootIphoneXs(doc);
    bootGplus(doc);
    bootFaceIdResidual(doc);
    bootFortniteResidual(doc);
    bootWannaCryResidual(doc);
    bootChrome(doc);
    bootWin10(doc);
    bootEdge(doc);
    bootAmp(doc);
    bootMedium(doc);
    bootMusically(doc);
    bootCryptoWinter(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2018extras",
      featureKey: "year2018extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2018extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2018extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
