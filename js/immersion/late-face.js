/**
 * Product face table. Empty while no late-year door needs period copy.
 * Does not write storage.
 */
(function (global) {
  "use strict";
  var FACE = {};

  function boot(doc) {
    var root = doc.documentElement;
    var key = root.getAttribute("data-official-key");
    var row = key && FACE[key];
    if (!row || doc.querySelector("[data-late-face]")) return;
    var box = doc.createElement("div");
    box.setAttribute("data-late-face", key);
    box.className = "product-face";
    var title = doc.createElement("p");
    title.className = "product-kicker";
    title.textContent = row[0];
    var line = doc.createElement("p");
    line.textContent = row[1];
    var mark = doc.createElement("p");
    mark.setAttribute("data-itt-capture-cite", "1");
    mark.textContent = "[failed-final] No invented brand pixel.";
    box.appendChild(title);
    box.appendChild(line);
    box.appendChild(mark);
    var host = doc.querySelector("[data-official-verb-host]");
    if (host) {
      host.insertBefore(box, host.firstChild);
      return;
    }
    var nav = doc.getElementById("itt-nav-slot");
    if (nav && nav.parentNode) nav.parentNode.insertBefore(box, nav.nextSibling);
    else doc.body.insertBefore(box, doc.body.firstChild);
  }

  function ready() {
    if (global.document) boot(global.document);
  }
  if (global.document && global.document.readyState !== "loading") ready();
  else if (global.document) global.document.addEventListener("DOMContentLoaded", ready);
})(typeof window !== "undefined" ? window : this);
