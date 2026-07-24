/**
 * Immersion: Flickr 2004 — photo stream tags theater
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "flickr",
    needs: function (cfg) { return cfg.features && cfg.features.flickr; },
    init: function (api) {
      var loadJSON = api.loadJSON, saveJSON = api.saveJSON, storageKey = api.storageKey;
      var escapeHtml = api.escapeHtml, showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("flickr-photos");

      function seed() {
        return [
          { title: "Golden Gate fog", tags: "sf fog travel" },
          { title: "Office whiteboard", tags: "work funny" },
          { title: "Weekend hike", tags: "outdoors friends" }
        ];
      }
      function getPhotos() {
        var p = loadJSON(KEY, null);
        if (!p) { p = seed(); saveJSON(KEY, p); }
        return p;
      }

      function paint() {
        var host = document.querySelector("[data-flickr-stream]");
        if (!host) return;
        var photos = getPhotos();
        var html = '<table class="fl04-grid" width="100%"><tr>';
        for (var i = 0; i < photos.length; i++) {
          if (i && i % 4 === 0) html += "</tr><tr>";
          html += '<td><span class="fl04-thumb" title="' + escapeHtml(photos[i].title) + '"></span><br>' +
            '<font size="1">' + escapeHtml(photos[i].title) + '<br><i>' +
            escapeHtml(photos[i].tags) + '</i></font></td>';
        }
        html += "</tr></table>";
        host.innerHTML = html;
      }

      var form = document.querySelector("[data-flickr-upload]");
      if (form) {
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var title = (form.querySelector('[name="title"]') || {}).value || "Untitled";
          var tags = (form.querySelector('[name="tags"]') || {}).value || "tags";
          var photos = getPhotos();
          photos.unshift({ title: title, tags: tags });
          saveJSON(KEY, photos);
          showFlash("Photo 'uploaded' (no real file — tags + stream only).");
          markTourProgress();
          paint();
          form.reset();
        });
      }
      paint();
    }
  });
})(typeof window !== "undefined" ? window : this);
