/**
 * Residual REAL — every year. Blocks clone-forest one-clicks.
 * Incomplete never writes. Literacy if present; else two-step arm.
 * Does not replace product engines — capture-phase only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function yearOf() {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var dy = document.documentElement && document.documentElement.getAttribute("data-itt-year");
      if (dy) return String(dy);
    } catch (e1) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "";
  }

  function prefix() {
    var y = yearOf();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2);
    return "itt";
  }

  function countChecked(sel) {
    var nodes = document.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < nodes.length; i++) if (nodes[i].checked) n++;
    return n;
  }

  function injectBefore(el, id, html) {
    if (!el || !el.parentNode || document.getElementById(id)) return;
    var wrap = document.createElement("div");
    wrap.id = id;
    wrap.setAttribute("data-rr-panel", "1");
    wrap.style.cssText = "margin:8px 0;font-size:12px;line-height:1.4";
    wrap.innerHTML = html;
    el.parentNode.insertBefore(wrap, el);
  }

  function statusNear(el, msg) {
    var st =
      document.querySelector("[data-hulu-status], [data-appstore-status], [data-itunes-status], [data-lastfm-status], [data-dropbox-status], [data-spotify-status], [data-gfc-status], [data-netflix-stream-status], [data-netflix-status], #stream-status, [data-ks-status], [data-itt-action-status]");
    if (st) {
      try {
        st.style.display = "block";
      } catch (eSt) {
        /* */
      }
      st.textContent = msg;
    }
  }

  function twoStep(el) {
    if (!el) return false;
    if (el.getAttribute("data-rr-armed") === "1") return true;
    el.setAttribute("data-rr-armed", "1");
    return false;
  }

  function ensureLastfm() {
    var form = document.querySelector("[data-lastfm-scrobble]");
    if (!form) return;
    injectBefore(
      form,
      "rr-lastfm",
      '<label style="display:block"><input type="checkbox" data-lastfm-req> Scrobble theater — no real last.fm account</label>' +
        '<label style="display:block"><input type="checkbox" data-lastfm-req> Charts stay in this browser only</label>'
    );
  }

  function ensureDropbox() {
    var btn = document.querySelector("[data-dropbox-add]");
    if (!btn) return;
    injectBefore(
      btn,
      "rr-dropbox",
      '<label style="display:block"><input type="checkbox" data-dropbox-req> Folder sync theater — no real Dropbox servers</label>' +
        '<label style="display:block"><input type="checkbox" data-dropbox-req> Type a file name — untitled does not write</label>'
    );
  }

  function ensureSpotify() {
    var btn = document.querySelector(
      "[data-spotify-join], [data-spotify-invite], [data-spotify-plan], [data-spotify-play]"
    );
    if (!btn) return;
    if (document.querySelector("[data-spotify-ack], [data-spotify-no-stream], [data-spotify-req]")) return;
    injectBefore(
      btn,
      "rr-spotify",
      '<label style="display:block"><input type="checkbox" data-spotify-req> Spotify theater — no real stream</label>' +
        '<label style="display:block"><input type="checkbox" data-spotify-req> No real billing / no live account</label>'
    );
  }

  function ensureGfc() {
    var btn = document.querySelector("[data-gfc-enable]");
    if (!btn) return;
    if (document.querySelector("[data-gfc-opensocial], [data-gfc-noroauth], [data-gfc-check]")) return;
    injectBefore(
      btn,
      "rr-gfc",
      '<label style="display:block"><input type="checkbox" data-gfc-check data-gfc-opensocial> OpenSocial stack — write-once gadget lore</label>' +
        '<label style="display:block"><input type="checkbox" data-gfc-check data-gfc-noroauth> No real OAuth / no live Google servers</label>'
    );
  }

  function ensureNetflix() {
    var btn = document.querySelector("[data-netflix-stream]");
    if (!btn) return;
    if (document.querySelector("[data-nf-discs], [data-nf-qwikster], [data-nf-notonly], [data-nf-streamfirst], [data-nf-req]")) return;
    injectBefore(
      btn,
      "rr-nf",
      '<label style="display:block"><input type="checkbox" data-nf-req> Watch Instantly theater — no real stream</label>' +
        '<label style="display:block"><input type="checkbox" data-nf-req> Discs / residual honesty for this year</label>'
    );
  }

  function ensureHulu() {
    var btn = document.querySelector("[data-hulu-play]");
    if (!btn) return;
    if (document.querySelector("[data-hulu-check], [data-req]")) return;
    injectBefore(
      btn,
      "rr-hulu",
      '<label style="display:block"><input type="checkbox" data-hulu-check> Ad-supported full-episode theater — no real Hulu stream</label>' +
        '<label style="display:block"><input type="checkbox" data-hulu-check> Not Netflix discs · not modern Hulu+</label>'
    );
  }

  function ensureItunes() {
    var form = document.querySelector("[data-itunes-buy]");
    if (!form) return;
    if (document.querySelector("[data-itunes-req]")) return;
    injectBefore(
      form,
      "rr-itunes",
      '<label style="display:block"><input type="checkbox" data-itunes-req> 99¢ FairPlay theater — no real AAC file</label>' +
        '<label style="display:block"><input type="checkbox" data-itunes-req> No real billing</label>'
    );
  }

  function ensureKs() {
    var btn = document.querySelector("[data-ks-back]");
    if (!btn) return;
    if (document.querySelector("[data-ks-req]")) return;
    injectBefore(
      btn,
      "rr-ks",
      '<label style="display:block"><input type="checkbox" data-ks-req> Pledge theater — no real money</label>' +
        '<label style="display:block"><input type="checkbox" data-ks-req> Kickstarter residual — not a live campaign</label>'
    );
  }

  function ensureAppstore() {
    var btn = document.querySelector("[data-appstore-install]");
    if (!btn) return;
    if (document.querySelector("[data-appstore-check], [data-req]")) return;
    var host = document.querySelector("[data-appstore-catalog]") || btn;
    injectBefore(
      host,
      "rr-appstore",
      '<label style="display:block"><input type="checkbox" data-appstore-check> Launch-catalog theater — no real IPA / Apple ID</label>' +
        '<label style="display:block"><input type="checkbox" data-appstore-check> ~500 apps at launch class — not millions day one</label>'
    );
  }

  function ensureAll() {
    ensureHulu();
    ensureAppstore();
    ensureItunes();
    ensureLastfm();
    ensureDropbox();
    ensureSpotify();
    ensureGfc();
    ensureNetflix();
    ensureKs();
  }

  function block(e, msg, el) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    if (e.stopPropagation) e.stopPropagation();
    statusNear(el || e.target, msg);
    return false;
  }

  function onClick(e) {
    var t = e.target;
    if (!t || !t.closest) return;
    ensureAll();

    var hulu = t.closest("[data-hulu-play]");
    if (hulu) {
      if (document.querySelector("[data-hulu-check]") && countChecked("[data-hulu-check]") < 2) {
        return block(e, "Check both Hulu honesty boxes first.", hulu);
      }
      if (!document.querySelector("[data-hulu-check]") && !twoStep(hulu)) {
        return block(e, "Confirm: no real Hulu stream — click Play again.", hulu);
      }
    }

    var app = t.closest("[data-appstore-install]");
    if (app) {
      if (document.querySelector("[data-appstore-check]") && countChecked("[data-appstore-check]") < 2) {
        return block(e, "Check App Store literacy first.", app);
      }
    }

    var db = t.closest("[data-dropbox-add]");
    if (db) {
      var nameEl = document.querySelector("[data-dropbox-name]");
      var name = nameEl && nameEl.value ? String(nameEl.value).replace(/^\s+|\s+$/g, "") : "";
      if (name.length < 2) {
        return block(e, "Type a file name (untitled does not write).", db);
      }
      if (document.querySelector("[data-dropbox-req]") && countChecked("[data-dropbox-req]") < 2) {
        return block(e, "Check both Dropbox honesty boxes first.", db);
      }
    }

    var sp = t.closest("[data-spotify-join], [data-spotify-invite], [data-spotify-plan]");
    if (sp) {
      if (document.querySelector("[data-spotify-req]") && countChecked("[data-spotify-req]") < 2) {
        return block(e, "Check both Spotify honesty boxes first.", sp);
      }
      if (
        document.querySelector("[data-spotify-ack], [data-spotify-no-stream]") &&
        countChecked("[data-spotify-ack], [data-spotify-no-stream]") < 2
      ) {
        return block(e, "Confirm residual + no-stream first.", sp);
      }
      if (
        !document.querySelector("[data-spotify-req], [data-spotify-ack], [data-spotify-no-stream]") &&
        !twoStep(sp)
      ) {
        return block(e, "Confirm: no real billing — click again.", sp);
      }
    }

    var gfc = t.closest("[data-gfc-enable]");
    if (gfc) {
      if (
        countChecked("[data-gfc-opensocial], [data-gfc-noroauth], [data-gfc-check], [data-req]") < 2
      ) {
        return block(e, "Check OpenSocial + no-OAuth first.", gfc);
      }
    }

    var nf = t.closest("[data-netflix-stream]");
    if (nf) {
      var nfSel =
        "[data-nf-discs], [data-nf-qwikster], [data-nf-notonly], [data-nf-streamfirst], [data-nf-req]";
      if (document.querySelector(nfSel) && countChecked(nfSel) < 2) {
        return block(e, "Confirm Netflix honesty first.", nf);
      }
    }

    var ks = t.closest("[data-ks-back]");
    if (ks) {
      if (document.querySelector("[data-ks-req]") && countChecked("[data-ks-req]") < 2) {
        return block(e, "Check pledge theater boxes first.", ks);
      }
    }
  }

  function onSubmit(e) {
    var t = e.target;
    if (!t || !t.closest) return;
    ensureAll();

    var lf = t.closest ? t.closest("[data-lastfm-scrobble]") : t;
    if (lf && lf.getAttribute && lf.getAttribute("data-lastfm-scrobble") != null) {
      var trackEl = lf.querySelector('[name="track"]');
      var track = trackEl && trackEl.value ? String(trackEl.value).replace(/^\s+|\s+$/g, "") : "";
      if (track.length < 4) {
        return block(e, "Type a track (empty scrobble does not write).", lf);
      }
      if (document.querySelector("[data-lastfm-req]") && countChecked("[data-lastfm-req]") < 2) {
        return block(e, "Check both last.fm honesty boxes first.", lf);
      }
    }

    var it = t.closest ? t.closest("[data-itunes-buy]") : t;
    if (it && it.getAttribute && it.getAttribute("data-itunes-buy") != null) {
      var titleEl = it.querySelector('[name="title"]');
      var title = titleEl && titleEl.value ? String(titleEl.value).replace(/^\s+|\s+$/g, "") : "";
      if (!title) {
        return block(e, "Need a track title (empty buy does not write).", it);
      }
      if (document.querySelector("[data-itunes-req]") && countChecked("[data-itunes-req]") < 2) {
        return block(e, "Check both iTunes honesty boxes first.", it);
      }
    }
  }

  function boot(doc) {
    doc = doc || document;
    if (doc.documentElement && doc.documentElement.getAttribute("data-itt-residual-real") === "1") {
      ensureAll();
      return;
    }
    try {
      if (doc.documentElement) doc.documentElement.setAttribute("data-itt-residual-real", "1");
    } catch (eA) { /* */ }
    ensureAll();
    doc.addEventListener("click", onClick, true);
    doc.addEventListener("submit", onSubmit, true);
    setTimeout(ensureAll, 80);
    setTimeout(ensureAll, 400);
  }

  if (ITT.ImmersionFeatures && typeof ITT.ImmersionFeatures.registerLocal === "function") {
    ITT.ImmersionFeatures.registerLocal({
      id: "residualReal",
      featureKey: "residualReal",
      boot: boot
    });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
