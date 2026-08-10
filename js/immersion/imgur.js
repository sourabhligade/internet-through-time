/**
 * Imgur 2010 — album metadata + direct link → Reddit submit
 * Keys: itt10-imgur-album · summary itt10-imgur
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function sk(suffix) {
    return U().immersionStorageKey
      ? U().immersionStorageKey(suffix, "itt10")
      : "itt10-" + suffix;
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
  function slug(name) {
    return String(name || "img")
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "img";
  }
  function feedback(msg, st, err) {
    if (st) {
      st.textContent = msg;
      st.style.color = err ? "#f88" : "#8f8";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err, kind: "imgur" });
      }
    } catch (e) { /* */ }
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-ig-upload], [data-ig-album], [data-ig-link]")) return;

    var albumKey = sk("imgur-album");
    var sumKey = sk("imgur");
    var st = doc.querySelector("[data-ig-status], [data-itt-action-status]");
    var album = loadJSON(albumKey, { items: [] }) || { items: [] };
    if (!album.items) album.items = [];

    function persistSum() {
      saveJSON(sumKey, {
        multiStep: true,
        real: true,
        year: "2010",
        count: album.items.length,
        last: album.items[0] && album.items[0].file,
        ts: Date.now()
      });
    }

    function last() {
      return album.items[0] || null;
    }

    function render() {
      var box = doc.querySelector("[data-ig-album]");
      if (box) {
        if (!album.items.length) {
          box.innerHTML = "<font color='#888' size='2'>Album empty.</font>";
        } else {
          box.innerHTML = album.items
            .map(function (it) {
              return "<div style='font-size:12px;margin:4px 0'><b>" + esc(it.title) + "</b> · <code>" + esc(it.url) + "</code></div>";
            })
            .join("");
        }
      }
      var linkEl = doc.querySelector("[data-ig-link]");
      var it = last();
      if (linkEl) {
        linkEl.textContent = it ? it.url : "(upload first)";
      }
      var redditA = doc.querySelector("[data-ig-reddit]");
      if (redditA && it) {
        redditA.href =
          "../reddit/submit.html?title=" +
          encodeURIComponent(it.title) +
          "&url=" +
          encodeURIComponent(it.url);
      }
    }

    render();

    var form = doc.querySelector("[data-ig-upload]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var inp = form.querySelector("#ott-field") || form.querySelector("[name='file']");
        var title = inp && inp.value != null ? String(inp.value).replace(/^\s+|\s+$/g, "") : "";
        if (title.length < 2) {
          feedback("Filename / title required.", st, true);
          return;
        }
        var file = slug(title);
        if (file.indexOf(".") === -1) file += ".png";
        var url = "http://i.imgur.residual/" + file;
        album.items.unshift({ id: "ig-" + Date.now(), title: title, file: file, url: url, ts: Date.now() });
        album.items = album.items.slice(0, 20);
        saveJSON(albumKey, album);
        persistSum();
        if (inp) inp.value = "";
        feedback("Hosted residual · " + url + " (no CDN).", st);
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e) { /* */ }
        render();
      });
    }

    var copyBtn = doc.querySelector("[data-ig-copy]");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var it = last();
        if (!it) {
          feedback("Upload first.", st, true);
          return;
        }
        feedback("Direct link · " + it.url, st);
      });
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "imgur", featureKey: "imgur", boot: boot });
  } else {
    features.push({
      id: "imgur",
      needs: function (cfg) {
        return !cfg.features || cfg.features.imgur !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
