/**
 * Twitter / Twttr 2006 — compose 140 · timeline (localStorage theater)
 * Keys: {prefix}-tweets via immersionStorageKey (itt06-tweets in 2006)
 * BAN: modern X chrome · For You algorithm · long posts
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var MAX = 140;

  function U() {
    return ITT.util || {};
  }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("tweets", "itt06")
      : "itt06-tweets";
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
  function seed() {
    var list = load();
    if (list && list.length) return list;
    list = [
      {
        text: "just setting up my twttr",
        who: "jack",
        ts: Date.UTC(2006, 2, 21, 20, 50, 0)
      },
      {
        text: "waiting for the public launch energy — 140 chars or less",
        who: "you",
        ts: Date.now() - 86400000 * 3
      },
      {
        text: "SMS tweets from a flip phone. Desktop is fat laptop + IE6.",
        who: "biz",
        ts: Date.now() - 86400000
      }
    ];
    save(list);
    return list;
  }
  function fmtWhen(ts) {
    try {
      var d = new Date(ts || Date.now());
      return d.toLocaleString ? d.toLocaleString() : String(d);
    } catch (e) {
      return "";
    }
  }
  function renderTimeline(doc) {
    var el = doc.querySelector("[data-twitter-timeline]");
    if (!el) return;
    var list = seed();
    el.innerHTML = list
      .slice(0, 40)
      .map(function (row) {
        return (
          "<div class='tw-item' style='border-bottom:1px solid #eee;padding:8px 0;font-size:13px'>" +
          "<b>" +
          esc(row.who || "you") +
          "</b> " +
          "<span style='color:#666;font-size:11px'>" +
          esc(fmtWhen(row.ts)) +
          "</span>" +
          "<div style='margin-top:4px'>" +
          esc(row.text || "") +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }
  function wireCounter(form, doc) {
    var input = form.querySelector('[name="status"], [data-twitter-status], textarea');
    var counter = doc.querySelector("[data-twitter-count]");
    if (!input) return;
    function paint() {
      var n = String(input.value || "").length;
      var left = MAX - n;
      if (counter) {
        counter.textContent = String(left);
        counter.style.color = left < 0 ? "#c00" : left < 20 ? "#c60" : "#666";
      }
    }
    if (input.getAttribute("data-tw-counter") !== "1") {
      input.setAttribute("data-tw-counter", "1");
      input.setAttribute("maxlength", String(MAX));
      input.addEventListener("input", paint);
      input.addEventListener("keyup", paint);
    }
    paint();
  }
  function boot(doc) {
    doc = doc || document;
    if (
      !doc.querySelector(
        "[data-twitter-compose], [data-twitter-timeline], [data-twitter-count]"
      )
    ) {
      return;
    }
    seed();
    renderTimeline(doc);

    var form = doc.querySelector("[data-twitter-compose]");
    if (form && form.getAttribute("data-tw-bound") !== "1") {
      form.setAttribute("data-tw-bound", "1");
      wireCounter(form, doc);
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var input =
          form.querySelector('[name="status"]') ||
          form.querySelector("[data-twitter-status]") ||
          form.querySelector("textarea");
        var whoEl = form.querySelector('[name="who"]');
        var text = (input && input.value) || "";
        text = String(text).replace(/^\s+|\s+$/g, "");
        var st = doc.querySelector("[data-twitter-status-msg]");
        if (!text) {
          if (st) st.textContent = "Type something first.";
          return;
        }
        if (text.length > MAX) {
          if (st) st.textContent = "Too long — " + MAX + " character limit (SMS era).";
          return;
        }
        var list = load() || seed();
        list.unshift({
          text: text,
          who: (whoEl && whoEl.value) || "you",
          ts: Date.now()
        });
        save(list.slice(0, 80));
        if (input) input.value = "";
        wireCounter(form, doc);
        renderTimeline(doc);
        var msg = "Posted · saved in this browser only.";
        if (st) st.textContent = msg;
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(msg, {
            doc: doc,
            status: st,
            kind: "twitter-post"
          });
        }
      });
    } else if (form) {
      wireCounter(form, doc);
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "twitter", boot: boot });
  } else {
    ITT.twitter = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
