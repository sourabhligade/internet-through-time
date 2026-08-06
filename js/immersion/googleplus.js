/**
 * Google+ 2011 — Circles · +1 · Hangouts offline theater (localStorage only)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function year() {
    return String(
      ITT._immersionYear ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "2011"
    );
  }
  function key(kind) {
    if (U().immersionStorageKey) return U().immersionStorageKey(kind, "itt11");
    return "itt" + year().slice(2) + "-" + kind;
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function loadJSON(k, fb) {
    try {
      var r = localStorage.getItem(k);
      return r != null && r !== "" ? JSON.parse(r) : fb;
    } catch (e) {
      return fb;
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { /* */ }
  }

  function boot(doc) {
    doc = doc || document;
    var circleHost = doc.querySelector("[data-gplus-circles]");
    var addBtn = doc.querySelector("[data-gplus-add-circle]");
    var nameIn = doc.querySelector("[data-gplus-circle-name]");
    var plusBtns = doc.querySelectorAll("[data-gplus-plusone]");
    var hangoutBtn = doc.querySelector("[data-gplus-hangout-start]");
    var hangoutOut = doc.querySelector("[data-gplus-hangout]");
    var status = doc.querySelector("[data-gplus-status]");

    function setStatus(html) {
      if (status) status.innerHTML = html;
    }

    function renderCircles() {
      if (!circleHost) return;
      var circles = loadJSON(key("gplus-circles"), ["Friends", "Family", "Acquaintances"]);
      circleHost.innerHTML = circles
        .map(function (c) {
          return "<span class='circle-chip'>" + esc(c) + "</span>";
        })
        .join(" ");
    }

    renderCircles();
    setStatus("Google+ field trial · Circles · Hangouts · +1 · this browser only");

    if (addBtn && nameIn) {
      addBtn.addEventListener("click", function (ev) {
        ev.preventDefault();
        var n = String(nameIn.value || "").replace(/^\s+|\s+$/g, "");
        if (!n) return;
        var circles = loadJSON(key("gplus-circles"), ["Friends", "Family", "Acquaintances"]);
        circles.push(n);
        saveJSON(key("gplus-circles"), circles.slice(0, 24));
        nameIn.value = "";
        renderCircles();
        setStatus("Circle <b>" + esc(n) + "</b> saved.");
        if (ITT._immersionApi && (ITT._immersionApi.markTourUsed || ITT._immersionApi.markTourProgress)) {
          (ITT._immersionApi.markTourUsed || ITT._immersionApi.markTourProgress)();
        }
      });
    }

    var plused = loadJSON(key("gplus-plusone"), {});
    for (var i = 0; i < plusBtns.length; i++) {
      (function (btn) {
        var id = btn.getAttribute("data-gplus-plusone") || "post";
        if (plused[id]) btn.className = (btn.className || "") + " on";
        btn.addEventListener("click", function (ev) {
          ev.preventDefault();
          plused[id] = !plused[id];
          saveJSON(key("gplus-plusone"), plused);
          if (plused[id]) {
            if (btn.className.indexOf("on") === -1) btn.className += " on";
            setStatus("+1 on <b>" + esc(id) + "</b> (not a Facebook Like).");
          } else {
            btn.className = btn.className.replace(/\bon\b/g, "");
            setStatus("+1 removed from <b>" + esc(id) + "</b>.");
          }
        });
      })(plusBtns[i]);
    }

    if (hangoutBtn && hangoutOut) {
      hangoutBtn.addEventListener("click", function (ev) {
        ev.preventDefault();
        var circle =
          (document.querySelector("[data-gplus-circle].on, [data-gplus-circle-active]") &&
            (document.querySelector("[data-gplus-circle].on, [data-gplus-circle-active]")
              .getAttribute("data-gplus-circle") ||
              document.querySelector("[data-gplus-circle].on, [data-gplus-circle-active]")
                .textContent)) ||
          "Friends";
        var session = {
          started: true,
          circle: String(circle).trim() || "Friends",
          tiles: ["You", "Alex", "Sam"],
          ts: Date.now()
        };
        hangoutOut.innerHTML =
          "<div style='background:#111;color:#eee;padding:12px;border:1px solid #444' data-gplus-hangout-session>" +
          "<b>Hangout started</b> · circle: <b>" +
          (session.circle.replace(/</g, "&lt;")) +
          "</b><br>" +
          "<span style='display:inline-block;width:48px;height:48px;background:#444;margin:6px;text-align:center;line-height:48px'>A</span>" +
          "<span style='display:inline-block;width:48px;height:48px;background:#555;margin:6px;text-align:center;line-height:48px'>S</span>" +
          "<span style='display:inline-block;width:48px;height:48px;background:#1a73e8;margin:6px;text-align:center;line-height:48px'>You</span>" +
          "<p style='font-size:11px;color:#aaa'>Multi-person video in this browser only · no live camera · 2011 field-trial theater</p></div>";
        saveJSON(key("gplus-hangout"), session);
        setStatus("Hangout started with " + session.tiles.length + " people · saved.");
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback("Hangout started · circle “" + session.circle + "”.", {
            flash: true
          });
        }
        if (ITT._immersionApi && (ITT._immersionApi.markTourUsed || ITT._immersionApi.markTourProgress)) {
          (ITT._immersionApi.markTourUsed || ITT._immersionApi.markTourProgress)();
        }
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "googleplus",
      featureKey: "googleplus",
      boot: boot
    });
  } else {
    ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
    ITT.ImmersionFeatures.push({
      id: "googleplus",
      needs: function (cfg) {
        return !cfg.features || cfg.features.googleplus !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
