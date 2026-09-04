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
      var yNote = "iOS only";
      try {
        var iy =
          (ITT._immersionYear && String(ITT._immersionYear)) ||
          (doc.documentElement && doc.documentElement.getAttribute("data-itt-year")) ||
          "";
        if (iy === "2011") yNote = "iOS only · Android next year";
        else if (iy === "2012" || parseInt(iy, 10) >= 2012) yNote = "iOS + Android";
      } catch (eY) { /* */ }
      st.textContent = list.length ? list.length + " post(s) · " + yNote : yNote;
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
              (p.photo ? esc(p.photo) + " · " : "") +
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
    var filterPicked = false;
    var photoPicked = "";
    var filterBtns = doc.querySelectorAll("[data-ig-filter]");
    var photoBtns = doc.querySelectorAll("[data-ig-photo]");
    var i;
    var pi;
    for (pi = 0; pi < photoBtns.length; pi++) {
      photoBtns[pi].addEventListener("click", function (ev) {
        photoPicked = ev.currentTarget.getAttribute("data-ig-photo") || "";
        var stP = doc.querySelector("[data-ig-status]");
        if (stP && !filterPicked) {
          stP.setAttribute("data-locked", "1");
          stP.textContent = "Still: " + photoPicked + " · pick a filter to share";
        }
      });
    }
    for (i = 0; i < filterBtns.length; i++) {
      filterBtns[i].addEventListener("click", function (ev) {
        filterPicked = true;
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
        var st0 = doc.querySelector("[data-ig-status]");
        var reqs = doc.querySelectorAll("[data-req]");
        var cn = 0;
        var ci;
        for (ci = 0; ci < reqs.length; ci++) if (reqs[ci].checked) cn++;
        if (reqs.length && cn < reqs.length) {
          if (st0) {
            st0.setAttribute("data-locked", "1");
            var iyMsg = "";
            try {
              iyMsg =
                (ITT._immersionYear && String(ITT._immersionYear)) ||
                (doc.documentElement && doc.documentElement.getAttribute("data-itt-year")) ||
                "";
            } catch (eIY) { iyMsg = ""; }
            st0.textContent =
              iyMsg === "2012"
                ? "Confirm Android exists now · Facebook does not own Instagram yet on Apr 3."
                : "Confirm iOS-only · Facebook does not own Instagram yet.";
          }
          return;
        }
        if (!filterPicked) {
          if (st0) {
            st0.setAttribute("data-locked", "1");
            st0.textContent = "Pick a filter first (iOS camera ritual).";
          }
          if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
            ITT._immersionApi.actionFeedback("Pick a filter first.", {
              doc: doc,
              status: st0,
              kind: "ig-share",
              flash: false
            });
          }
          return;
        }
        var capEl = doc.querySelector("[data-ig-caption]");
        var caption = capEl ? String(capEl.value || "").replace(/^\s+|\s+$/g, "") : "";
        if (caption.length < 2) {
          if (st0) {
            st0.setAttribute("data-locked", "1");
            st0.textContent = "Write a caption first (empty share does not write).";
          }
          return;
        }
        var list = load();
        list.unshift({ filter: selected, caption: caption, photo: photoPicked || "", ts: Date.now() });
        save(list.slice(0, 40));
        var msg = "Shared · " + selected;
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
        try {
          if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
        } catch (eN) { /* */ }
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
