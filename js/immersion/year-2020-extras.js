/**
 * 2020 and 2021 leftover rooms. A finished save shows the room in the frame.
 * The leftover writer still owns the key. Empty and trap never paint.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function slugOf() {
    var m = String(location.pathname || "").match(/\/sites\/([^/]+)/);
    return m ? m[1] : "";
  }

  function row(year, slug, safe) {
    var stage = '<div class="era-stage">Now playing</div><p>' + safe + "</p>";
    var grid = '<div class="era-grid"><span></span><span></span><span></span><span></span><span></span><span></span></div><p>' + safe + "</p>";
    var y20 = {
      youtube: '<div data-era-ok="watch">' + stage + "</div>",
      peacock: '<div data-era-ok="watch">' + stage + "<p>Peacock leftover · Jul 2020</p></div>",
      hbomax: '<div data-era-ok="watch">' + stage + "<p>HBO Max leftover · May 2020</p></div>",
      instagram: '<div data-era-ok="social">' + grid + "</div>",
      google: '<div data-era-ok="search"><p>Results</p><p>1. ' + safe + "</p><p>2. " + safe + " — Wikipedia</p></div>",
      wikipedia: "<div data-era-ok=\"read\"><p><b>" + safe + "</b></p><p>From Wikipedia, the free encyclopedia. Not the 2001 edit star.</p></div>",
      amazon: '<div data-era-ok="shop"><p>In the cart</p><p>' + safe + "</p></div>",
      facebook: '<div data-era-ok="social"><p>News Feed</p><p>You: ' + safe + "</p></div>",
      reddit: '<div data-era-ok="read"><p>r/all</p><p>↑ ' + safe + "</p></div>",
      slack: '<div data-era-ok="chat"><p>#general</p><p>You: ' + safe + "</p></div>",
      nyt: '<div data-era-ok="read"><p>Headline</p><p>' + safe + "</p></div>",
      clubhouse: '<div data-era-ok="voice"><p>Hand raised</p><p>' + safe + " · hallway</p></div>"
    };
    var y21 = {
      youtube: '<div data-era-ok="watch">' + stage + "</div>",
      instagram: '<div data-era-ok="social">' + grid + "</div>",
      google: '<div data-era-ok="search"><p>Results</p><p>1. ' + safe + "</p><p>2. " + safe + "</p></div>",
      amazon: '<div data-era-ok="shop"><p>In the cart</p><p>' + safe + "</p></div>",
      twitter: '<div data-era-ok="social"><p>Tweet</p><p>You: ' + safe + "</p><p>Still Twitter. Not X.</p></div>",
      nft: '<div data-era-ok="pay"><p>Mint ticket</p><p>' + safe + " · no live mint</p></div>",
      coinbaseipo: '<div data-era-ok="pay"><p>Direct listing · 14 Apr 2021</p><p>' + safe + " · no live trade</p></div>",
      epicapple: '<div data-era-ok="phone"><p>Sideload</p><p>' + safe + " · the store stays the other room</p></div>"
    };
    var table = year === "2021" ? y21 : y20;
    return table[slug] || '<div data-era-ok="read"><p>' + safe + "</p></div>";
  }

  function boot(doc) {
    doc.addEventListener("click", function (ev) {
      var t = ev.target;
      var btn = t && t.closest ? t.closest("[data-lo-save]") : null;
      if (!btn) return;
      var host = btn.closest("[data-lo-panel]");
      if (!host || host.hasAttribute("data-y22-kind")) return;
      var field = host.querySelector("[data-lo-field]");
      var out = host.querySelector("[data-era-result]");
      if (!field || !out) return;
      var reqs = host.querySelectorAll("[data-lo-req]");
      var i;
      for (i = 0; i < reqs.length; i++) if (!reqs[i].checked) return;
      var keep = host.querySelector('[data-lo-pick="keep"]');
      if (keep && keep.getAttribute("aria-pressed") !== "true") return;
      var q = String(field.value || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 2) return;
      var year = doc.documentElement.getAttribute("data-itt-year") || "";
      out.innerHTML = row(year, slugOf(), esc(q));
    }, true);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year2020extras",
      featureKey: "oneThingMachines",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
