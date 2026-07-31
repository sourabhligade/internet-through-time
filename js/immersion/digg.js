/**
 * Digg — dig/bury + submit + comments (localStorage)
 * Year seeds differ (2004 seed year vs 2005 rise). Keys use immersion storagePrefix.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function year() {
    if (ITT.util && ITT.util.immersionYear) {
      return ITT.util.immersionYear("2005");
    }
    return String(
      ITT._immersionYear ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "2005"
    );
  }

  function fallbackPrefix() {
    var y = year();
    if (y === "2004") return "itt04";
    if (y === "2006") return "itt06";
    if (y === "2008") return "itt08";
    if (y === "2007") return "itt07";
    return "itt05";
  }
  function storageKey() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("digg-links", fallbackPrefix());
    }
    return fallbackPrefix() + "-digg-links";
  }
  function commentsKey() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("digg-comments", fallbackPrefix());
    }
    return fallbackPrefix() + "-digg-comments";
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function loadComments() {
    try {
      return JSON.parse(localStorage.getItem(commentsKey()) || "{}") || {};
    } catch (e) {
      return {};
    }
  }
  function saveComments(map) {
    localStorage.setItem(commentsKey(), JSON.stringify(map));
  }
  function esc(s) {
    if (ITT.util && ITT.util.escapeHtml) return ITT.util.escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function ensureIds(list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (!list[i].id) list[i].id = "d" + i + "-" + String(list[i].title || "").slice(0, 12);
    }
    return list;
  }

  function defaultSeed() {
    if (year() === "2004") {
      /* Period-correct Dec 2004 seed (harvest digg.html mood · no YT/Maps) */
      return [
        { id: "d04-0", title: "Firefox 1.0 released — Nov 9", diggs: 42, url: "http://www.mozilla.org/products/firefox/" },
        { id: "d04-1", title: "Firefox hits 10 million downloads!!!!!", diggs: 36, url: "http://www.spreadfirefox.com/" },
        { id: "d04-2", title: "Gmail invites on eBay", diggs: 18, url: "http://gmail.google.com/" },
        { id: "d04-3", title: "Flickr tags everything (Ludicorp)", diggs: 27, url: "http://www.flickr.com/" },
        { id: "d04-4", title: "Google IPO — Aug 19 auction", diggs: 22, url: "http://www.google.com/" },
        { id: "d04-5", title: "AOL Locks Out AIM Screen Names", diggs: 17, url: "http://www.eweek.com/" },
        { id: "d04-6", title: "Yahoo Slashes Domain prices to $4.98", diggs: 15, url: "http://news.netcraft.com/" }
      ];
    }
    if (year() === "2007") {
      return [
        {
          id: "d07-0",
          title: "iPhone ships — multi-touch Safari, no App Store yet",
          diggs: 6200,
          url: "http://www.apple.com/iphone/"
        },
        {
          id: "d07-1",
          title: "Google Street View is live in US cities",
          diggs: 4100,
          url: "http://maps.google.com/"
        },
        {
          id: "d07-2",
          title: "Facebook Platform: third-party apps on the graph",
          diggs: 3800,
          url: "http://www.facebook.com/"
        },
        {
          id: "d07-3",
          title: "Gmail is open to everyone (no invite)",
          diggs: 2900,
          url: "http://gmail.google.com/"
        },
        {
          id: "d07-4",
          title: "Twitter everywhere after SXSW",
          diggs: 2400,
          url: "http://twitter.com/"
        }
      ];
    }
    if (year() === "2006") {
      /* Peak UGC year — power diggers · algorithm drama · Time “You” culture */
      return [
        {
          id: "d06-0",
          title: "Google to acquire YouTube for $1.65 billion",
          diggs: 4820,
          url: "http://www.youtube.com/"
        },
        {
          id: "d06-1",
          title: "Twitter launches publicly — 140 characters",
          diggs: 2100,
          url: "http://twitter.com/"
        },
        {
          id: "d06-2",
          title: "Facebook opens to everyone (not just .edu)",
          diggs: 3500,
          url: "http://www.facebook.com/"
        },
        {
          id: "d06-3",
          title: "Amazon EC2: rent a server by the hour",
          diggs: 980,
          url: "http://aws.amazon.com/"
        },
        {
          id: "d06-4",
          title: "Time Person of the Year is… You",
          diggs: 5600,
          url: "http://www.time.com/"
        },
        {
          id: "d06-5",
          title: "Digg algorithm drama: top users bury stories",
          diggs: 1800,
          url: "http://digg.com/"
        },
        {
          id: "d06-6",
          title: "IE 7 is out — tabs for the masses",
          diggs: 740,
          url: "http://www.microsoft.com/windows/ie/"
        }
      ];
    }
    return [
      {
        id: "d05-0",
        title: "Firefox 1.x for the rest of us",
        diggs: 120,
        url: "http://www.mozilla.org/products/firefox/"
      },
      {
        id: "d05-1",
        title: "Google Maps mashups everywhere",
        diggs: 95,
        url: "http://maps.google.com/"
      },
      {
        id: "d05-2",
        title: "YouTube is eating bandwidth",
        diggs: 80,
        url: "http://www.youtube.com/"
      },
      {
        id: "d05-3",
        title: "Diggnation ep.1 is out",
        diggs: 64,
        url: "http://revision3.com/diggnation/"
      }
    ];
  }

  function seed() {
    var list = load();
    if (list && list.length) return ensureIds(list);
    list = ensureIds(defaultSeed());
    save(list);
    return list;
  }

  function render(doc) {
    var el = doc.querySelector("[data-digg-list]");
    if (!el) return;
    var list = seed();
    var comments = loadComments();
    el.innerHTML = list
      .map(function (row, idx) {
        var sid = row.id || String(idx);
        var urlBit = row.url
          ? " <font size='1' color='#666'>" + esc(row.url) + "</font>"
          : "";
        var cList = comments[sid] || [];
        var cHtml =
          cList.length === 0
            ? "<font size='1' color='#999'>no comments yet</font>"
            : cList
                .slice(0, 8)
                .map(function (c) {
                  return (
                    "<div style='margin:2px 0 2px 8px;font-size:11px;color:#333'>· " +
                    esc(c.text) +
                    " <font color='#888'>(" +
                    esc(c.who || "digg user") +
                    ")</font></div>"
                  );
                })
                .join("");
        return (
          "<div class='digg-item' data-digg-row='" +
          idx +
          "' data-digg-id='" +
          esc(sid) +
          "'>" +
          "<div class='digg-score'>" +
          "<div class='digg-count-wrap'><b data-digg-count='" +
          idx +
          "'>" +
          (row.diggs || 0) +
          "</b><span class='digg-count-label'>diggs</span></div>" +
          "<button type='button' class='digg-btn-up' data-digg-up='" +
          idx +
          "'>digg it</button>" +
          "<button type='button' class='digg-btn-bury' data-digg-bury='" +
          idx +
          "'>bury</button>" +
          "</div>" +
          "<div class='digg-body'>" +
          "<a class='heading digg-title' href='" +
          esc(row.url || "#") +
          "'>" +
          esc(row.title) +
          "</a>" +
          urlBit +
          "<div class='digg-meta'>technology · " +
          cList.length +
          " comments · digg / bury</div>" +
          "<div class='digg-comments' data-digg-comments='" +
          esc(sid) +
          "'>" +
          cHtml +
          "</div>" +
          "<form data-digg-comment-form='" +
          esc(sid) +
          "' action='#' class='digg-comment-form'>" +
          "<input name='comment' size='36' placeholder='add a comment…' maxlength='200'> " +
          "<button type='submit'>post</button>" +
          "</form>" +
          "</div>" +
          "<div class='digg-clear'></div>" +
          "</div>"
        );
      })
      .join("");

    function wire(attr, delta) {
      var btns = el.querySelectorAll("[" + attr + "]");
      var i;
      for (i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (ev) {
          var idx = parseInt(ev.currentTarget.getAttribute(attr), 10);
          var list2 = seed();
          if (list2[idx]) {
            list2[idx].diggs = Math.max(0, (list2[idx].diggs || 0) + delta);
            save(list2);
            render(doc);
          }
        });
      }
    }
    wire("data-digg-up", 1);
    wire("data-digg-bury", -1);

    var forms = el.querySelectorAll("[data-digg-comment-form]");
    var fi;
    for (fi = 0; fi < forms.length; fi++) {
      forms[fi].addEventListener("submit", function (ev) {
        ev.preventDefault();
        var form = ev.currentTarget;
        var sid = form.getAttribute("data-digg-comment-form");
        var input = form.querySelector('[name="comment"]');
        var text = (input && input.value) || "";
        text = String(text).replace(/^\s+|\s+$/g, "");
        if (!text) return;
        var map = loadComments();
        if (!map[sid]) map[sid] = [];
        map[sid].unshift({ text: text.slice(0, 200), who: "you", ts: Date.now() });
        map[sid] = map[sid].slice(0, 20);
        saveComments(map);
        if (input) input.value = "";
        render(doc);
        renderMine(doc);
      });
    }
  }

  function renderMine(doc) {
    var mine = doc.querySelector("[data-digg-mine]") || doc.getElementById("digg-mine");
    if (!mine) return;
    var list = seed().filter(function (r) {
      return r.mine;
    });
    if (!list.length) {
      mine.innerHTML = "<li><font color=#666>No submissions yet.</font></li>";
      return;
    }
    mine.innerHTML = list
      .map(function (i) {
        return (
          "<li><b>" +
          esc(i.title) +
          "</b>" +
          (i.url ? "<br><font size=1 color=#666>" + esc(i.url) + "</font>" : "") +
          " · " +
          (i.diggs || 1) +
          " diggs</li>"
        );
      })
      .join("");
  }

  function queryParam(doc, name) {
    try {
      var s =
        (doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) ||
        (typeof location !== "undefined" ? location.search : "") ||
        "";
      var m = s.match(new RegExp("[?&]" + name + "=([^&]*)"));
      return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
    } catch (e) {
      return "";
    }
  }

  function prefillSubmit(form, doc) {
    if (!form) return;
    var t = queryParam(doc, "title");
    var u = queryParam(doc, "url");
    var ti = form.querySelector('[name="title"]');
    var ui = form.querySelector('[name="url"]');
    if (t && ti) ti.value = t;
    if (u && ui) ui.value = u;
  }

  function boot(doc) {
    doc = doc || document;
    render(doc);
    renderMine(doc);
    var form = doc.querySelector("[data-digg-submit]") || doc.getElementById("digg-submit");
    if (form && form.getAttribute("data-digg-submit-bound") !== "1") {
      form.setAttribute("data-digg-submit-bound", "1");
      prefillSubmit(form, doc);
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var title =
          ((form.querySelector('[name="title"]') || form.elements.title || {}).value) ||
          "untitled";
        var url =
          ((form.querySelector('[name="url"]') || form.elements.url || {}).value) || "";
        var list = seed();
        list.unshift({
          id: "d" + Date.now(),
          title: title,
          url: url,
          diggs: 1,
          mine: true,
          ts: Date.now()
        });
        save(ensureIds(list.slice(0, 40)));
        var st =
          doc.querySelector("[data-digg-status]") || doc.getElementById("digg-status");
        if (st) {
          st.innerHTML =
            "Submitted — now on the digg list (" +
            esc(title) +
            "). " +
            '<a href="index.html">Popular</a> · ' +
            '<a href="../reddit/submit.html?title=' +
            encodeURIComponent(title) +
            "&url=" +
            encodeURIComponent(url) +
            '">Also submit to Reddit</a>';
        }
        form.reset();
        render(doc);
        renderMine(doc);
      });
    }
  }

  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "digg", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
