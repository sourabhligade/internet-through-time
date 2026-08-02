/**
 * Instagram 2010 — filter / share theater (localStorage)
 * Key: itt10-ig-posts (via immersionStorageKey)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() { return ITT.util || {}; }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("ig-posts", "itt10")
      : "itt10-ig-posts";
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "[]") || [];
    } catch (e) {
      return [];
    }
  }
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function render(doc) {
    var list = load();
    var feed = doc.querySelector("[data-ig-feed]");
    var st = doc.querySelector("[data-ig-status]");
    if (st && !st.getAttribute("data-locked")) {
      var yNote = "iOS-only 2010 theater";
      try {
        var iy =
          (ITT._immersionYear && String(ITT._immersionYear)) ||
          (doc.documentElement && doc.documentElement.getAttribute("data-itt-year")) ||
          "";
        if (iy === "2011") yNote = "iOS-only 2011 · Android April 2012";
        else if (iy === "2012" || parseInt(iy, 10) >= 2012) yNote = "iOS + Android 2012";
      } catch (eY) { /* */ }
      st.textContent = list.length + " post(s) · " + storageKey() + " · " + yNote;
    }
    if (feed) {
      if (!list.length) {
        feed.innerHTML = "<font color='#888' size='2'>Nothing here yet — pick a filter and Share above.</font>";
      } else {
        feed.innerHTML = list
          .map(function (p) {
            return (
              "<div class='feed-item'><b>" +
              esc(p.filter || "Normal") +
              "</b> · " +
              esc(p.caption || "(no caption)") +
              "</div>"
            );
          })
          .join("");
      }
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-ig-share], [data-ig-filter]")) return;
    var selected = "Normal";
    var filterBtns = doc.querySelectorAll("[data-ig-filter]");
    var i;
    for (i = 0; i < filterBtns.length; i++) {
      filterBtns[i].addEventListener("click", function (ev) {
        selected = ev.currentTarget.getAttribute("data-ig-filter") || "Normal";
        var st = doc.querySelector("[data-ig-status]");
        if (st) {
          st.setAttribute("data-locked", "1");
          st.textContent = "Filter: " + selected;
        }
      });
    }
    var share = doc.querySelector("[data-ig-share]");
    if (share) {
      share.addEventListener("click", function () {
        var capEl = doc.querySelector("[data-ig-caption]");
        var caption = capEl ? capEl.value : "";
        var list = load();
        list.unshift({ filter: selected, caption: caption, ts: Date.now() });
        save(list.slice(0, 40));
        var msg = "Shared (theater) · " + selected + " · " + storageKey();
        render(doc);
        /* After render: status + flash so list count does not wipe the “it worked” line */
        var st = doc.querySelector("[data-ig-status]");
        if (st) {
          st.setAttribute("data-locked", "1");
          st.textContent = msg;
        }
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(msg, {
            doc: doc,
            status: st,
            kind: "ig-share",
            flash: true
          });
        } else if (ITT._immersionApi && ITT._immersionApi.showFlash) {
          ITT._immersionApi.showFlash(msg);
        }
      });
    }
    render(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "instagram", boot: boot });
  } else {
    ITT.instagram = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
