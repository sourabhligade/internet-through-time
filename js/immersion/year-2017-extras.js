/**
 * 2017 REAL product theaters — multi-step localStorage only (itt17-*)
 * Face ID · Fortnite · crypto · WannaCry · 280 · Vine offline · #MeToo
 * Complex: Netflix · Spotify · YouTube · Discord · AMP · Medium · Equifax
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
        "2017";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt17";
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
  function textOf(doc, sel) {
    var el = doc.querySelector(sel);
    return el ? String(el.textContent || "").trim() : "";
  }

  /* ——— P0 ——— */

  function bootFaceId(doc) {
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
        feedback("Complete notch · look · $999 · Nov 3 steps.", st, { error: true });
        return;
      }
      saveJSON(key("faceid"), {
        multiStep: true,
        real: true,
        announce: "2017-09-12",
        stores: "2017-11-03",
        price: 999,
        ts: Date.now()
      });
      saveJSON(key("iphonex"), {
        multiStep: true,
        real: true,
        faceId: true,
        ts: Date.now()
      });
      feedback("Face ID literacy · " + key("faceid"), st);
      markUsed();
    });
  }

  function bootFortnite(doc) {
    doc = doc || document;
    var dropBtn = doc.querySelector("[data-fn-drop]");
    var saveBtn = doc.querySelector("[data-fn-save]");
    var st = doc.querySelector("[data-fn-status]");
    var log = doc.querySelector("[data-fn-log]");
    var dropped = false;
    var victory = false;
    function render() {
      if (!log) return;
      log.textContent =
        (dropped ? "● Dropped (silhouette theater)\n" : "○ Not dropped yet\n") +
        (victory ? "● Victory Royale (theater)" : "○ No Victory yet");
    }
    render();
    if (dropBtn) {
      dropBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-fn-free]")) {
          feedback("Confirm free-to-play Battle Royale first.", st, { error: true });
          return;
        }
        dropped = true;
        render();
        feedback("Dropped from the bus (theater · no official map art).", st);
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        if (!checked(doc, "[data-fn-free]") || !checked(doc, "[data-fn-sil]")) {
          feedback("Free ack + silhouette honesty required.", st, { error: true });
          return;
        }
        if (!dropped) {
          feedback("Drop first, then claim Victory.", st, { error: true });
          return;
        }
        victory = true;
        render();
        saveJSON(key("fortnite"), {
          multiStep: true,
          real: true,
          free: true,
          launch: "2017-09-26",
          silhouetteOnly: true,
          ts: Date.now()
        });
        feedback("Victory Royale theater · " + key("fortnite"), st);
        markUsed();
      });
    }
  }

  function bootCrypto(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-crypto-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-crypto-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-crypto-advice]") ||
        !checked(doc, "[data-crypto-peak]") ||
        !checked(doc, "[data-crypto-ico]")
      ) {
        feedback("Confirm not-advice · peak · ICO red flags.", st, { error: true });
        return;
      }
      saveJSON(key("crypto"), {
        multiStep: true,
        real: true,
        notAdvice: true,
        peakClass: 19783,
        peakDate: "2017-12-17",
        ts: Date.now()
      });
      feedback("Crypto literacy (not advice) · " + key("crypto"), st);
      markUsed();
    });
  }

  function bootWannaCry(doc) {
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
        date: "2017-05-12",
        patch: "MS17-010",
        noPoc: true,
        ts: Date.now()
      });
      feedback("Patch culture literacy · " + key("wannacry"), st);
      markUsed();
    });
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
        feedback("Type past 140 characters to feel the 280 change.", st, { error: true });
        return;
      }
      if (n > 280) {
        feedback("Still max 280 (museum).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-tw280-cjk]")) {
        feedback("Confirm CJK still 140 honesty.", st, { error: true });
        return;
      }
      saveJSON(key("twitter280"), {
        multiStep: true,
        real: true,
        launch: "2017-11-07",
        length: n,
        ts: Date.now()
      });
      feedback("280 composer · " + key("twitter280"), st);
      markUsed();
    });
  }

  function bootVineOffline(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-vine17-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-vine17-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-vine17-announce]") || !checked(doc, "[data-vine17-offline]")) {
        feedback("Both dates: Oct 27 2016 announce AND Jan 17 2017 offline.", st, {
          error: true
        });
        return;
      }
      saveJSON(key("vine-offline"), {
        multiStep: true,
        real: true,
        announce: "2016-10-27",
        offline: "2017-01-17",
        dualDate: true,
        ts: Date.now()
      });
      feedback("Vine offline dual-date · " + key("vine-offline"), st);
      markUsed();
    });
  }

  function bootMeToo(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-metoo-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-metoo-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-metoo-burke]") ||
        !checked(doc, "[data-metoo-platform]") ||
        !checked(doc, "[data-metoo-careful]")
      ) {
        feedback("Burke credit · platform · careful framing all required.", st, { error: true });
        return;
      }
      saveJSON(key("metoo"), {
        multiStep: true,
        real: true,
        careful: true,
        burkeCredit: true,
        viral: "2017-10-15",
        ts: Date.now()
      });
      feedback("#MeToo literacy (careful) · " + key("metoo"), st);
      markUsed();
    });
  }

  /* ——— Complex modern product rooms ——— */

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
        if (detail) detail.textContent = "Selected: " + t + " · 2017 binge residual";
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
            "</div><p style='font-size:11px;opacity:0.8'>Related: more 2017 creator residual…</p>";
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
          feedback("Read Nitro Jan 2017 literacy note.", st, { error: true });
          return;
        }
        saveJSON(key("discord"), {
          multiStep: true,
          real: true,
          messages: sent,
          ts: Date.now()
        });
        saveJSON(key("nitro"), {
          multiStep: true,
          real: true,
          launchClass: "2017-01",
          ts: Date.now()
        });
        feedback("Discord + Nitro literacy · " + key("discord"), st);
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
            "<span style='font-size:11px;color:#555'>May 2017 class: ~900k domains · 2B+ AMP pages. Not Facebook Instant Articles.</span>" +
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
          ts: Date.now()
        });
        feedback("AMP literacy · " + key("amp"), st);
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
          ts: Date.now()
        });
        feedback("Medium session · " + key("medium"), st);
        markUsed();
      });
    }
  }

  function bootEquifax(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-eq-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-eq-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-eq-date]") ||
        !checked(doc, "[data-eq-scale]") ||
        !checked(doc, "[data-eq-ssn]")
      ) {
        feedback("Date · scale · what-stolen literacy required.", st, { error: true });
        return;
      }
      saveJSON(key("equifax"), {
        multiStep: true,
        real: true,
        disclose: "2017-09-07",
        scaleClass: 147000000,
        ts: Date.now()
      });
      feedback("Equifax literacy · " + key("equifax"), st);
      markUsed();
    });
  }

  function bootChrome(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-chrome17-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-chrome17-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-chrome17-habit]") ||
        !checked(doc, "[data-chrome17-edge]") ||
        !checked(doc, "[data-chrome17-win10]")
      ) {
        feedback("Confirm habit · Edge residual · Win10 mass.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), {
        multiStep: true,
        real: true,
        year: "2017",
        ts: Date.now()
      });
      feedback("Chrome REAL · " + key("chrome"), st);
      markUsed();
    });
  }

  function bootMusically(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-mly17-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-mly17-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-mly17-not-tt]") || !checked(doc, "[data-mly17-acquire]")) {
        feedback("Not TikTok mass + ByteDance Nov seed honesty.", st, { error: true });
        return;
      }
      var cap = val(doc, "[data-mly17-caption]");
      if (cap.length < 2) {
        feedback("Write a caption (2+).", st, { error: true });
        return;
      }
      saveJSON(key("musical"), {
        multiStep: true,
        real: true,
        notTikTokMass: true,
        caption: cap,
        acquireClass: "2017-11",
        ts: Date.now()
      });
      feedback("Musical.ly residual · " + key("musical"), st);
      markUsed();
    });
  }

  function bootModernLobby(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-modern17-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-modern17-status]");
    btn.addEventListener("click", function () {
      var n = 0;
      if (checked(doc, "[data-modern17-a]")) n++;
      if (checked(doc, "[data-modern17-b]")) n++;
      if (checked(doc, "[data-modern17-c]")) n++;
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

  function bootAll(doc) {
    doc = doc || document;
    bootFaceId(doc);
    bootFortnite(doc);
    bootCrypto(doc);
    bootWannaCry(doc);
    bootTwitter280(doc);
    bootVineOffline(doc);
    bootMeToo(doc);
    bootNetflix(doc);
    bootSpotify(doc);
    bootYouTube(doc);
    bootDiscord(doc);
    bootAmp(doc);
    bootMedium(doc);
    bootEquifax(doc);
    bootChrome(doc);
    bootMusically(doc);
    bootModernLobby(doc);
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
