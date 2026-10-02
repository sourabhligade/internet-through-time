/**
 * Product face on 2016 official rooms.
 * Does not write storage. The existing verb still does.
 */
(function (global) {
  "use strict";
  var FACE = {
    "itt16-ig-stories": ["Stories", "Tap the ring. An empty story writes nothing. Reels is the trap."],
    "itt16-pogo": ["Pokémon GO", "Tap one nearby creature. Already-caught writes nothing."],
    "itt16-fb-react": ["Reactions", "Love, haha, wow, sad, angry. Like-as-the-only-save is the trap."],
    "itt16-wa-e2e": ["WhatsApp", "Turn the lock on. No lock writes nothing."],
    "itt16-iphone7": ["iPhone 7", "The jack is gone. Face ID writes nothing."],
    "itt16-vine-end": ["Vine", "A 6-second loop that is closing. A new loop writes nothing."],
    "itt16-spectacles": ["Spectacles", "Pair the glasses. A plain Snap writes nothing."],
    "itt16-musically": ["musical.ly", "Fifteen seconds. TikTok For You writes nothing."],
    "itt16-win10-end": ["Windows 10", "The free upgrade is closing. Still-free writes nothing."],
    "itt16-game-gymrush": ["Gym Rush", "The year toy. A score of 0 writes nothing."],
  };

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
