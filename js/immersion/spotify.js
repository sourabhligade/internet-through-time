/**
 * Spotify US launch theater (2011) — invite free · plans · playlist · ad flash
 * localStorage only — no real streams.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function year() {
    return String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        "2011"
    );
  }
  function key(kind) {
    if (U().immersionStorageKey) return U().immersionStorageKey(kind, "itt11");
    return "itt" + year().slice(2) + "-" + kind;
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function loadJSON(k, fb) {
    try {
      var r = localStorage.getItem(k);
      return r != null && r !== "" ? JSON.parse(r) : fb;
    } catch (e) {
      return fb;
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { /* */ }
  }

  function boot(doc) {
    doc = doc || document;
    var inviteBtn = doc.querySelector("[data-spotify-invite]");
    var planBtns = doc.querySelectorAll("[data-spotify-plan]");
    var playBtns = doc.querySelectorAll("[data-spotify-play]");
    var addBtns = doc.querySelectorAll("[data-spotify-add]");
    var status = doc.querySelector("[data-spotify-status]");
    var list = doc.querySelector("[data-spotify-playlist]");
    var ad = doc.querySelector("[data-spotify-ad]");

    function state() {
      return {
        invited: loadJSON(key("spotify-invited"), false),
        plan: loadJSON(key("spotify-plan"), "none"),
        playlist: loadJSON(key("spotify-playlist"), [])
      };
    }
    function setStatus(html) {
      if (status) status.innerHTML = html;
    }
    function renderList() {
      if (!list) return;
      var pl = state().playlist;
      if (!pl.length) {
        list.innerHTML = "<span style='color:#888'>Playlist empty — add tracks below.</span>";
        return;
      }
      list.innerHTML = pl
        .map(function (t, i) {
          return (
            "<div class='track' style='border-bottom:1px solid #333;padding:6px 0'>" +
            (i + 1) +
            ". <b>" +
            esc(t.title) +
            "</b> <span style='color:#888'>" +
            esc(t.artist || "") +
            "</span></div>"
          );
        })
        .join("");
    }

    var st0 = state();
    if (st0.invited) {
      setStatus(
        "Invite accepted · plan: <b>" +
          esc(st0.plan === "none" ? "free (invite)" : st0.plan) +
          "</b> · this browser only"
      );
    } else {
      setStatus("US launch Jul 14, 2011 — free tier starts <b>invite-only</b>.");
    }
    renderList();

    if (inviteBtn) {
      inviteBtn.addEventListener("click", function (ev) {
        ev.preventDefault();
        saveJSON(key("spotify-invited"), true);
        if (state().plan === "none") saveJSON(key("spotify-plan"), "free");
        setStatus("Invite accepted · free ad-supported listening unlocked (museum theater).");
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(
            "Spotify invite accepted — free tier (this browser).",
            { doc: doc, status: status, kind: "spotify-invite" }
          );
        } else if (ITT._immersionApi && ITT._immersionApi.showFlash) {
          ITT._immersionApi.showFlash("Spotify invite accepted — free tier (this browser).");
        }
        if (ITT._immersionApi && (ITT._immersionApi.markTourUsed || ITT._immersionApi.markTourProgress)) {
          (ITT._immersionApi.markTourUsed || ITT._immersionApi.markTourProgress)();
        }
      });
    }

    for (var i = 0; i < planBtns.length; i++) {
      planBtns[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        var b = ev.currentTarget;
        var plan = b.getAttribute("data-spotify-plan") || "free";
        saveJSON(key("spotify-invited"), true);
        saveJSON(key("spotify-plan"), plan);
        setStatus("Plan set to <b>" + esc(plan) + "</b> · localStorage only · no real billing.");
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback("Spotify plan: " + esc(plan), {
            doc: doc,
            status: status,
            kind: "spotify-plan"
          });
        } else if (ITT._immersionApi && ITT._immersionApi.showFlash) {
          ITT._immersionApi.showFlash("Spotify plan: " + esc(plan));
        }
      });
    }

    function ensureInvite() {
      if (!state().invited) {
        setStatus("<span style='color:#fcc'>Need an invite first — click Accept invite.</span>");
        return false;
      }
      return true;
    }

    for (var j = 0; j < addBtns.length; j++) {
      addBtns[j].addEventListener("click", function (ev) {
        ev.preventDefault();
        if (!ensureInvite()) return;
        var b = ev.currentTarget;
        var pl = state().playlist;
        pl.push({
          title: b.getAttribute("data-title") || "Track",
          artist: b.getAttribute("data-artist") || ""
        });
        saveJSON(key("spotify-playlist"), pl.slice(0, 40));
        renderList();
        var amsg =
          "Added <b>" + esc(b.getAttribute("data-title") || "track") + "</b> to playlist.";
        setStatus(amsg);
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(
            "Added “" + (b.getAttribute("data-title") || "track") + "” to playlist",
            { doc: doc, status: status, kind: "spotify-add" }
          );
        }
      });
    }

    for (var k = 0; k < playBtns.length; k++) {
      playBtns[k].addEventListener("click", function (ev) {
        ev.preventDefault();
        if (!ensureInvite()) return;
        var plan = state().plan;
        var title =
          (ev.currentTarget.getAttribute("data-title") || "track") + "";
        if (plan === "free" || plan === "none") {
          if (ad) {
            ad.style.display = "block";
            ad.innerHTML =
              "<b>Audio ad</b> — free tier · “Brought to you by a period sponsor” · then: now playing <b>" +
              esc(title) +
              "</b>";
          }
          setStatus("Playing <b>" + esc(title) + "</b> (free · ad interstitial theater).");
        } else {
          if (ad) ad.style.display = "none";
          setStatus("Playing <b>" + esc(title) + "</b> (" + esc(plan) + " · ad-free theater).");
        }
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "spotify",
      featureKey: "spotify",
      boot: boot
    });
  } else {
    ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
    ITT.ImmersionFeatures.push({
      id: "spotify",
      needs: function (cfg) {
        return !cfg.features || cfg.features.spotify !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
