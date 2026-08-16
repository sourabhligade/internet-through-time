/**
 * Photobucket 2003 — album metadata + hotlink codes (no CDN)
 * Keys: itt03-photobucket-album · summary itt03-photobucket
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function sk(suffix) {
    return U().immersionStorageKey
      ? U().immersionStorageKey(suffix, "itt03")
      : "itt03-" + suffix;
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
    return String(name || "pic")
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "pic";
  }
  function feedback(msg, st, err) {
    if (st) {
      st.textContent = msg;
      st.style.color = err ? "#a00" : "#060";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { status: st, flash: !err, kind: "photobucket" });
      }
    } catch (e) { /* */ }
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-pb-upload], [data-pb-album], [data-pb-codes]")) return;

    var albumKey = sk("photobucket-album");
    var sumKey = sk("photobucket");
    var status = doc.querySelector("[data-pb-status], [data-itt-action-status]");
    var album = loadJSON(albumKey, { items: [] }) || { items: [] };
    if (!album.items) album.items = [];

    function persistSummary() {
      saveJSON(sumKey, {
        multiStep: true,
        real: true,
        year: "2003",
        count: album.items.length,
        last: album.items[0] && album.items[0].file,
        ts: Date.now()
      });
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) {
        /* */
      }
    }

    function renderAlbum() {
      var box = doc.querySelector("[data-pb-album]");
      if (!box) return;
      if (!album.items.length) {
        box.innerHTML = "<font size='2' color='#555'>Album empty — upload a filename residual.</font>";
        return;
      }
      box.innerHTML = album.items
        .map(function (it) {
          return (
            "<div style='padding:4px 0;border-bottom:1px solid #ddd;font-size:12px'><b>" +
            esc(it.title) +
            "</b> · <code>" +
            esc(it.file) +
            "</code></div>"
          );
        })
        .join("");
    }

    function renderCodes() {
      var box = doc.querySelector("[data-pb-codes]");
      if (!box) return;
      var it = album.items[0];
      if (!it) {
        box.innerHTML = "<font size='2'>Upload on the album page first.</font>";
        return;
      }
      var url = "http://i.photobucket.residual/img/" + it.file;
      box.innerHTML =
        "<pre class='ott-pre' data-ott-click='copy-direct'>Direct: " +
        esc(url) +
        "</pre>" +
        "<pre class='ott-pre' data-ott-click='copy-img'>&lt;img src=\"" +
        esc(url) +
        "\" alt=\"" +
        esc(it.title) +
        "\"&gt;</pre>" +
        "<pre class='ott-pre' data-ott-click='copy-bbc'>[img]" +
        esc(url) +
        "[/img]</pre>" +
        "<p style='font-size:11px'>Paste the IMG tag into MySpace profile HTML theater.</p>";
    }

    renderAlbum();
    renderCodes();

    var form = doc.querySelector("[data-pb-upload]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var inp = form.querySelector("#ott-field") || form.querySelector("[name='file']");
        var title = inp && inp.value != null ? String(inp.value).replace(/^\s+|\s+$/g, "") : "";
        if (title.length < 2) {
          feedback("Filename / title required.", status, true);
          return;
        }
        var file = slug(title);
        if (file.indexOf(".") === -1) file += ".jpg";
        album.items.unshift({
          id: "pb-" + Date.now(),
          title: title,
          file: file,
          code: '<img src="http://i.photobucket.residual/img/' + file + '">',
          ts: Date.now()
        });
        album.items = album.items.slice(0, 20);
        saveJSON(albumKey, album);
        persistSummary();
        if (inp) inp.value = "";
        feedback("Uploaded residual · " + file + " (no CDN · this browser only).", status);
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e) { /* */ }
        renderAlbum();
      });
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "photobucket", featureKey: "photobucket", boot: boot });
  } else {
    features.push({
      id: "photobucket",
      needs: function (cfg) {
        return !cfg.features || cfg.features.photobucket !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
