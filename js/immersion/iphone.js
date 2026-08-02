/**
 * iPhone Safari browse theater (localStorage)
 * Keys: {prefix}-iphone-history
 * Year HTML carries product truth (2007: no App Store · 2008: 3G + App Store CTA).
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


  var PRESETS = [
    {
      url: "http://www.google.com/",
      label: "Google",
      room: "../google/index.html",
      note: "Desktop Google on a 3.5″ screen — pinch to zoom lore."
    },
    {
      url: "http://maps.google.com/",
      label: "Maps",
      room: "../maps/index.html",
      note: "Ajax Maps in mobile Safari — still a desktop site in 2007."
    },
    {
      url: "http://www.youtube.com/",
      label: "YouTube",
      room: "../youtube/index.html",
      note: "Flash-era YouTube · Google-owned all year · often awkward on phone."
    },
    {
      url: "http://mail.google.com/",
      label: "Gmail",
      room: "../gmail/index.html",
      note: "Open Gmail (Feb 14) in Safari — desktop-class webmail on glass."
    },
    {
      url: "http://en.wikipedia.org/",
      label: "Wikipedia",
      room: "../wikipedia/index.html",
      note: "Long encyclopedia pages · lots of pinch-zoom."
    }
  ];

  function U() {
    return ITT.util || {};
  }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("iphone-history", "itt07")
      : "itt07-iphone-history";
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function openUrl(doc, url, note) {
    url = String(url || "http://www.google.com/").replace(/^\s+|\s+$/g, "");
    var list = load() || [];
    list.unshift({ url: url, ts: Date.now() });
    save(list.slice(0, 40));
    var screen = doc.querySelector("[data-iphone-screen]");
    var status = doc.querySelector("[data-iphone-status]");
    var blurb =
      note ||
      (function () {
      var y = (ITT.util && ITT.util.immersionYear) ? ITT.util.immersionYear("2007") : "2007";
      if (y === "2009") {
        return "Safari on <b>iPhone 3GS</b> · OS 3.0 · copy/paste · video · daily App Store.";
      }
      if (y === "2008") {
        return "Safari still loads the real web. <b>2008:</b> iPhone 3G + App Store — also try native apps in the App Store room.";
      }
      return "Safari loads a mobile-ish page (theater). Pinch-to-zoom lore. Many desktop sites are awkward on a 3.5″ screen. <b>No App Store</b> — web + Apple apps only in 2007.";
    })();
    if (screen) {
      screen.innerHTML =
        "<div style='margin-bottom:6px;color:#09f'>" +
        esc(url) +
        "</div>" +
        "<div>" +
        blurb +
        "</div>";
    }
    if (status) {
      status.textContent ="Opened · saved in " + storageKey()
      ittFeedback(status.textContent, status);
    }
    renderHistory(doc);
  }
  function renderHistory(doc) {
    var el = doc.querySelector("[data-iphone-history]");
    if (!el) return;
    var list = load() || [];
    if (!list.length) {
      el.innerHTML = "<font color=#888>No pages yet — Go or tap a preset.</font>";
      return;
    }
    el.innerHTML = list
      .slice(0, 12)
      .map(function (row, i) {
        return (
          "<div style='font-size:11px;margin:3px 0;border-bottom:1px solid #333;padding:3px 0'>" +
          (i + 1) +
          ". <a href='#' data-iphone-hist-url='" +
          esc(row.url) +
          "' style='color:#09f'>" +
          esc(row.url) +
          "</a></div>"
        );
      })
      .join("");
    var links = el.querySelectorAll("[data-iphone-hist-url]");
    var li;
    for (li = 0; li < links.length; li++) {
      links[li].addEventListener("click", function (ev) {
        ev.preventDefault();
        openUrl(doc, ev.currentTarget.getAttribute("data-iphone-hist-url") || "");
      });
    }
  }
  function renderPresets(doc) {
    var el = doc.querySelector("[data-iphone-presets]");
    if (!el || el.getAttribute("data-iphone-presets-bound") === "1") return;
    el.setAttribute("data-iphone-presets-bound", "1");
    el.innerHTML = PRESETS.map(function (p, i) {
      return (
        "<button type='button' data-iphone-preset='" +
        i +
        "' style='margin:2px 4px 2px 0;font-size:11px'>" +
        esc(p.label) +
        "</button>"
      );
    }).join("") +
      "<div style='font-size:10px;color:#888;margin-top:6px'>Desktop sites in Safari — " +
      "museum also links real rooms: " +
      PRESETS.map(function (p) {
        return "<a href='" + esc(p.room) + "' style='color:#6cf'>" + esc(p.label) + "</a>";
      }).join(" · ") +
      "</div>";
    var btns = el.querySelectorAll("[data-iphone-preset]");
    var bi;
    for (bi = 0; bi < btns.length; bi++) {
      btns[bi].addEventListener("click", function (ev) {
        var idx = parseInt(ev.currentTarget.getAttribute("data-iphone-preset") || "0", 10);
        var p = PRESETS[idx] || PRESETS[0];
        var input = doc.querySelector('[data-iphone-browse] [name="url"]');
        if (input) input.value = p.url;
        openUrl(doc, p.url, p.note);
      });
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-iphone-browse], [data-iphone-screen], [data-iphone-history]")) {
      return;
    }
    renderPresets(doc);
    renderHistory(doc);
    var form = doc.querySelector("[data-iphone-browse]");
    if (form && form.getAttribute("data-iphone-bound") !== "1") {
      form.setAttribute("data-iphone-bound", "1");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var input = form.querySelector('[name="url"]');
        openUrl(doc, (input && input.value) || "http://www.google.com/");
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "iphone", boot: boot });
  } else {
    ITT.iphone = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
