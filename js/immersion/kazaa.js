/**
 * KaZaA immersion — P2P search/download theater with real localStorage history
 * Keys: {prefix}-kazaa-history · no real network files
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var CATALOG = [
    { name: "demo-track-01.mp3", size: "3.8 MB", user: "user_x92", quality: "128kbps" },
    { name: "sample-album-cover.jpg", size: "420 KB", user: "sharebot", quality: "—" },
    { name: "readme-not-real.txt", size: "2 KB", user: "peer_demo", quality: "—" },
    { name: "podcast-episode.mp3", size: "12 MB", user: "dialup_dave", quality: "96kbps" },
    { name: "windows-theme.wav", size: "1.1 MB", user: "xp_fan", quality: "—" }
  ];

  function storageKey() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("kazaa-history", "itt02");
    }
    return "itt02-kazaa-history";
  }
  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "[]") || [];
    } catch (e) {
      return [];
    }
  }
  function saveHistory(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function boot(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-kazaa-search]");
    if (!form) return;
    var q = form.querySelector('[name="q"], [data-kazaa-q]');
    var out = doc.querySelector("[data-kazaa-results]");
    var prog = doc.querySelector("[data-kazaa-progress]");
    var status = doc.querySelector("[data-kazaa-status]");
    var histEl = doc.querySelector("[data-kazaa-history]");

    function renderHistory() {
      if (!histEl) return;
      var list = loadHistory();
      if (!list.length) {
        histEl.innerHTML = "<font color=#666>No downloads yet this session.</font>";
        return;
      }
      histEl.innerHTML = list
        .slice(0, 12)
        .map(function (row) {
          return (
            "<div style='font-size:11px;margin:2px 0'>✓ " +
            esc(row.file) +
            " <font color=#666>(" +
            esc(row.term || "") +
            ")</font></div>"
          );
        })
        .join("");
    }
    renderHistory();

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var term = q && q.value ? String(q.value).replace(/^\s+|\s+$/g, "") : "music";
      if (status) status.textContent = 'Searching FastTrack network for "' + term + '"…';
      if (out) out.innerHTML = "<p style='font-size:11px;color:#666'>Searching…</p>";
      setTimeout(function () {
        if (!out) return;
        var html =
          "<table border='1' cellpadding='4' cellspacing='0' width='100%' style='font-size:11px;border-collapse:collapse'>";
        html +=
          "<tr bgcolor='#336699' style='color:#fff'><th>File</th><th>Size</th><th>User</th><th>Quality</th><th></th></tr>";
        CATALOG.forEach(function (row, i) {
          var file = term + "-" + row.name;
          html +=
            "<tr bgcolor='" +
            (i % 2 ? "#f0f0f0" : "#fff") +
            "'><td>" +
            esc(file) +
            "</td><td>" +
            esc(row.size) +
            "</td><td>" +
            esc(row.user) +
            "</td><td>" +
            esc(row.quality) +
            "</td><td><button type='button' data-kazaa-dl='" +
            i +
            "' data-kazaa-file='" +
            esc(file) +
            "' data-kazaa-term='" +
            esc(term) +
            "'>Download</button></td></tr>";
        });
        html += "</table>";
        html +=
          "<p style='font-size:10px;color:#800;margin-top:6px'><b>Museum:</b> no real P2P — downloads log to localStorage only.</p>";
        out.innerHTML = html;
        if (status) status.textContent = "Found " + CATALOG.length + " results.";
        var btns = out.querySelectorAll("[data-kazaa-dl]");
        var bi;
        for (bi = 0; bi < btns.length; bi++) {
          btns[bi].addEventListener("click", function (ev) {
            var btn = ev.currentTarget;
            runDownload(
              prog,
              status,
              btn.getAttribute("data-kazaa-file") || "file",
              btn.getAttribute("data-kazaa-term") || ""
            );
          });
        }
      }, 400);
    });
  }

  function runDownload(prog, status, file, term) {
    if (status) status.textContent = "Connecting to peer…";
    if (prog) prog.style.display = "block";
    var bar = (prog && (prog.querySelector("[data-kazaa-bar]") || prog)) || null;
    var n = 0;
    var t = setInterval(function () {
      n += 10 + Math.floor(Math.random() * 15);
      if (n >= 100) {
        n = 100;
        clearInterval(t);
        var list = loadHistory();
        list.unshift({ file: file, term: term, ts: Date.now() });
        saveHistory(list.slice(0, 40));
        if (status) {
          status.textContent =
            "Download complete — logged in this browser (" + storageKey() + "). No real file written.";
        }
        try {
          var histEl = document.querySelector("[data-kazaa-history]");
          if (histEl) {
            histEl.innerHTML = list
              .slice(0, 12)
              .map(function (row) {
                return (
                  "<div style='font-size:11px;margin:2px 0'>✓ " +
                  esc(row.file) +
                  "</div>"
                );
              })
              .join("");
          }
        } catch (e) {
          /* */
        }
      }
      if (bar) {
        bar.style.width = n + "%";
        bar.textContent = n + "%";
      }
    }, 180);
  }

  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "kazaa", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
