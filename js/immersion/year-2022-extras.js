/**
 * 2022 dest machines — ChatGPT preview, Wordle grid, Twitter bird, BeReal drop,
 * dest-true leftover rooms. Official-verb still writes the key. Empty / GPT-4 never write.
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

  function markProductReady(doc) {
    try {
      doc.documentElement.setAttribute("data-official-product-ready", "1");
    } catch (eR) { /* */ }
  }

  function destSlug() {
    var m = String(location.pathname || "").match(/\/sites\/([^/]+)/);
    return m ? m[1] : "";
  }

  function replyFor(q) {
    q = String(q || "").toLowerCase();
    if (/hello|hi\b|hey/.test(q)) {
      return "Hello. I am ChatGPT, a language model trained by OpenAI. This is the 30 Nov 2022 research preview. Ask me something.";
    }
    if (/who are you|what are you/.test(q)) {
      return "I am ChatGPT. Usage is free in this preview. I am not GPT-4 — that model is not this year.";
    }
    if (/gpt-?4|plus/.test(q)) {
      return "I am the free November 2022 preview. GPT-4 and ChatGPT Plus are not this dest. Try a normal question.";
    }
    if (/quantum/.test(q)) {
      return "Quantum computing leftover answer: bits can be 0 and 1 at once in a limited sense. I can be wrong. This is the research preview.";
    }
    if (/http request|javascript/.test(q)) {
      return "In 2022 leftover JS you still use fetch(). I do not run your code here. Send another prompt.";
    }
    if (/wordle|bereal|twitter|elon/.test(q)) {
      return "I can talk about that in text. I do not open those apps from here. Type another prompt, then Send.";
    }
    return "Here is a first-week answer: I predict the next tokens from your prompt. I can be wrong. Send another message to keep going.";
  }

  function bootChat(doc) {
    var host = doc.querySelector(".gpt22-shell");
    if (!host || host.getAttribute("data-gpt22-bound") === "1") return;
    host.setAttribute("data-gpt22-bound", "1");
    var stage = host.querySelector(".gpt22-stage");
    var field = host.querySelector("[data-official-need]");
    var send = host.querySelector("[data-official-verb]");
    var trap = host.querySelector("[data-official-trap]");
    var examples = host.querySelector("[data-gpt22-examples]");
    if (!stage || !field || !send) return;
    stage.innerHTML =
      '<div class="gpt22-thread" id="gpt22-thread">' +
      '<div class="gpt22-msg gpt22-msg-sys">ChatGPT · 30 Nov 2022 research preview. Type a prompt. Send is the save.</div>' +
      "</div>";
    var thread = stage.querySelector("#gpt22-thread");
    function add(role, text) {
      var el = doc.createElement("div");
      el.className = "gpt22-msg gpt22-msg-" + role;
      el.textContent = text;
      thread.appendChild(el);
      thread.scrollTop = thread.scrollHeight;
    }
    if (examples) {
      examples.addEventListener("click", function (ev) {
        var b = ev.target && ev.target.getAttribute ? ev.target : null;
        var ex = b && b.getAttribute("data-gpt22-ex");
        if (!ex) return;
        field.value = ex;
        field.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    send.addEventListener("click", function () {
      var q = String(field.value || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 2) return;
      if (examples) examples.setAttribute("hidden", "hidden");
      add("user", q);
      add("bot", replyFor(q));
      field.value = "";
    });
    if (trap) {
      trap.addEventListener("click", function () {
        add("sys", "GPT-4 is March 2023. This preview never writes that.");
      });
    }
  }

  function bootWordle(doc) {
    var host = doc.querySelector(".wdl22");
    if (!host || host.getAttribute("data-wdl22-bound") === "1") return;
    host.setAttribute("data-wdl22-bound", "1");
    var field = host.querySelector("[data-official-need]");
    var verb = host.querySelector("[data-official-verb]");
    var tiles = host.querySelectorAll(".wdl22-tile");
    if (!field || !tiles.length) return;
    var secret = "CRANE";
    var row = 0;
    var keys = host.querySelector("[data-wdl22-keys]");
    var share = host.querySelector("[data-wdl22-share]");
    var keyMap = {};
    if (keys && !keys.getAttribute("data-bound")) {
      keys.setAttribute("data-bound", "1");
      var rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
      var r, c, rowEl, b;
      for (r = 0; r < rows.length; r++) {
        rowEl = doc.createElement("div");
        rowEl.className = "wdl22-keyrow";
        for (c = 0; c < rows[r].length; c++) {
          b = doc.createElement("button");
          b.type = "button";
          b.className = "wdl22-key";
          b.textContent = rows[r].charAt(c);
          keyMap[rows[r].charAt(c)] = b;
          b.addEventListener("click", function () {
            var cur = String(field.value || "").toUpperCase().replace(/[^A-Z]/g, "");
            if (cur.length < 5) {
              field.value = (cur + this.textContent).toLowerCase();
              field.dispatchEvent(new Event("input", { bubbles: true }));
            }
          });
          rowEl.appendChild(b);
        }
        keys.appendChild(rowEl);
      }
    }
    function paintKey(ch, cls) {
      var k = keyMap[ch];
      if (!k) return;
      if (k.className.indexOf("is-hit") >= 0) return;
      if (cls === "is-near" && k.className.indexOf("is-near") >= 0) return;
      k.className = "wdl22-key " + cls;
    }
    function paintGuess(guess) {
      var g = String(guess || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5);
      var i, cls;
      for (i = 0; i < 5; i++) {
        var t = tiles[row * 5 + i];
        if (!t) continue;
        t.textContent = g.charAt(i) || "";
        cls = !g.charAt(i) ? "" : g.charAt(i) === secret.charAt(i) ? "is-hit" : secret.indexOf(g.charAt(i)) >= 0 ? "is-near" : "is-miss";
        t.className = "wdl22-tile" + (cls ? " " + cls : "");
        if (cls) paintKey(g.charAt(i), cls);
      }
      if (share) {
        share.removeAttribute("hidden");
        share.textContent = "Wordle leftover " + (row + 1) + "/6";
      }
    }
    field.addEventListener("input", function () {
      var g = String(field.value || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5);
      field.value = g.toLowerCase();
      var i;
      for (i = 0; i < 5; i++) {
        var t = tiles[row * 5 + i];
        if (t && !/\bis-hit\b|\bis-near\b|\bis-miss\b/.test(t.className)) t.textContent = g.charAt(i) || "";
      }
    });
    if (verb) {
      verb.addEventListener("click", function () {
        var g = String(field.value || "").toUpperCase().replace(/[^A-Z]/g, "");
        if (g.length < 5) return;
        paintGuess(g);
        if (row < 5) row += 1;
      });
    }
  }

  function bootTwitter(doc) {
    var host = doc.querySelector(".tw22");
    if (!host || host.getAttribute("data-tw22-bound") === "1") return;
    host.setAttribute("data-tw22-bound", "1");
    var field = host.querySelector("[data-official-need]");
    var verb = host.querySelector("[data-official-verb]");
    var count = host.querySelector("[data-tw22-count]");
    if (!field || !verb) return;
    var feed = host.querySelector(".tw22-feed") || doc.createElement("div");
    if (!feed.parentNode) {
      feed.className = "tw22-feed";
      host.appendChild(feed);
    }
    function tick() {
      if (!count) return;
      var n = 280 - String(field.value || "").length;
      count.textContent = String(n);
    }
    field.addEventListener("input", tick);
    tick();
    verb.addEventListener("click", function () {
      var q = String(field.value || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 2) return;
      var card = doc.createElement("div");
      card.className = "tw22-post";
      card.textContent = q;
      feed.insertBefore(card, feed.firstChild);
      field.value = "";
      tick();
    });
  }

  function bootIsland(doc) {
    var host = doc.querySelector(".is22");
    if (!host || host.getAttribute("data-is22-bound") === "1") return;
    host.setAttribute("data-is22-bound", "1");
    var pill = host.querySelector(".is22-pill");
    var verb = doc.querySelector("[data-official-key='itt22-island'] [data-official-verb]");
    if (!pill || !verb) return;
    verb.addEventListener("click", function () {
      pill.className = "is22-pill is-on";
      pill.textContent = "island · looking";
      markProductReady(doc);
    });
    pill.addEventListener("click", function () {
      pill.className = "is22-pill is-on";
      pill.textContent = "island · looking";
      markProductReady(doc);
    });
  }

  function bootTiktok(doc) {
    var host = doc.querySelector(".tt22");
    if (!host || host.getAttribute("data-tt22-bound") === "1") return;
    host.setAttribute("data-tt22-bound", "1");
    var stage = host.querySelector(".tt22-stage");
    var verb = doc.querySelector("[data-official-key='itt22-tiktok'] [data-official-verb]");
    if (!stage || !verb) return;
    verb.addEventListener("click", function () {
      stage.textContent = "For You leftover · playing";
      stage.className = "tt22-stage is-on";
      markProductReady(doc);
    });
    stage.addEventListener("click", function () {
      stage.textContent = "For You leftover · playing";
      stage.className = "tt22-stage is-on";
      markProductReady(doc);
    });
  }

  function bootGoogle(doc) {
    var form = doc.querySelector("[data-g22-search]");
    if (!form || form.getAttribute("data-g22-bound") === "1") return;
    form.setAttribute("data-g22-bound", "1");
    var field = form.querySelector("[data-g22-q]");
    var out = form.querySelector("[data-g22-hits]");
    var go = form.querySelector("[data-g22-go]");
    if (!field || !out || !go) return;
    go.addEventListener("click", function () {
      var q = String(field.value || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 2) {
        out.textContent = "Type a search. Empty never writes gold.";
        return;
      }
      out.innerHTML =
        "<p><b>Results leftover</b> · 2022 search habit · not Bard</p>" +
        "<p>1. " + q + " — leftover hit</p>" +
        "<p>2. " + q + " — Wikipedia leftover</p>" +
        "<p>3. " + q + " — news leftover</p>";
    });
  }

  function bootBereal(doc) {
    var host = doc.querySelector(".be22");
    if (!host || host.getAttribute("data-be22-bound") === "1") return;
    host.setAttribute("data-be22-bound", "1");
    var verb = doc.querySelector("[data-official-key='itt22-bereal'] [data-official-verb]");
    var cams = host.querySelectorAll(".be22-cam");
    if (!verb || cams.length < 2) return;
    var clock = doc.createElement("p");
    clock.className = "be22-clock";
    clock.setAttribute("data-be22-clock", "1");
    clock.textContent = "2:00 leftover";
    host.parentNode.insertBefore(clock, host);
    var left = 120;
    var tick = setInterval(function () {
      if (left <= 0) {
        clearInterval(tick);
        clock.textContent = "time leftover";
        return;
      }
      left -= 1;
      clock.textContent = Math.floor(left / 60) + ":" + (left % 60 < 10 ? "0" : "") + (left % 60) + " leftover";
    }, 1000);
    var shot = { back: false, front: false };
    function shoot(i) {
      if (i === 0) {
        shot.back = true;
        cams[0].textContent = "back · taken";
        cams[0].className = cams[0].className.replace(/\bis-shot\b/g, "") + " is-shot";
      } else {
        shot.front = true;
        cams[1].textContent = "front · taken";
        cams[1].className = cams[1].className.replace(/\bis-shot\b/g, "") + " is-shot";
      }
      if (shot.back && shot.front) markProductReady(doc);
    }
    cams[0].addEventListener("click", function () { shoot(0); });
    cams[1].addEventListener("click", function () { shoot(1); });
    verb.addEventListener("click", function () {
      clearInterval(tick);
      clock.textContent = "taken leftover";
      shoot(0);
      shoot(1);
    });
  }

  function bootOfficialOut(doc) {
    var verb = doc.querySelector("[data-official-verb]");
    var out = doc.querySelector("[data-y22-official-out]");
    var field = doc.querySelector("[data-official-need]");
    var html = doc.documentElement;
    if (!verb || !out || html.getAttribute("data-y22-off-bound") === "1") return;
    html.setAttribute("data-y22-off-bound", "1");
    var key = html.getAttribute("data-official-key") || "";
    verb.addEventListener("click", function () {
      var q = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (q.length < 2) {
        out.textContent = "";
        return;
      }
      if (key === "itt22-ftx") {
        out.textContent = "Nov 2022 leftover · collapsed. No wallet.";
        markProductReady(doc);
      } else if (key === "itt22-mastodon") {
        out.textContent = "Joined leftover · " + q;
        markProductReady(doc);
      } else if (key === "itt22-win11") {
        out.textContent = "Room leftover · Win10 still mass. Chrome habit stays.";
        markProductReady(doc);
      } else if (key === "itt22-game-prompt") {
        out.textContent = "Queue leftover · " + q + ". Star stays ChatGPT Send.";
        markProductReady(doc);
        var qel = doc.querySelector("[data-pq22-q]");
        if (qel) {
          var li = doc.createElement("li");
          li.textContent = q;
          qel.appendChild(li);
        }
      }
    });
  }

  function destFaceHtml(slug) {
    var faces = {
      reddit: "reddit leftover · old.reddit habit · r/all",
      youtube: "YouTube leftover · Watch later · not Shorts gold",
      wikipedia: "Wikipedia leftover · search the free encyclopedia",
      instagram: "Instagram leftover · grid · Reels are not this dest gold",
      google: "Google leftover · 2022 search habit · not Bard",
      facebook: "Facebook leftover · News Feed · Meta rename is 2021 leftover",
      gmail: "Gmail leftover · Inbox · Compose",
      spotify: "Spotify leftover · 2022 Wrapped is a leftover, not gold",
      netflix: "Netflix leftover · password sharing leftover",
      amazon: "Amazon leftover · cart leftover",
      midjourney: "Midjourney leftover · /imagine · Discord leftover",
      stablediffusion: "Stable Diffusion leftover · prompt · not ChatGPT",
      discord: "Discord leftover · #general",
      slack: "Slack leftover · thread leftover",
      twitch: "Twitch leftover · live leftover",
      uber: "Uber leftover · ride leftover",
      doordash: "DoorDash leftover · order leftover",
      airbnb: "Airbnb leftover · stay leftover",
      linkedin: "LinkedIn leftover · feed leftover",
      snapchat: "Snapchat leftover · not BeReal",
      whatsapp: "WhatsApp leftover · chat leftover",
      telegram: "Telegram leftover · chat leftover",
      signal: "Signal leftover · chat leftover",
      teams: "Teams leftover · meeting leftover",
      meet: "Meet leftover · Zoom Leave is 2020 gold",
      disneyplus: "Disney+ leftover · Continue is 2019 gold",
      hbomax: "HBO Max leftover · Discovery+ leftover",
      hulu: "Hulu leftover · watch leftover",
      roblox: "Roblox leftover · play leftover",
      steam: "Steam leftover · library leftover",
      epic: "Epic leftover · store leftover",
      github: "GitHub leftover · issue leftover",
      notion: "Notion leftover · page leftover",
      figma: "Figma leftover · file leftover",
      canva: "Canva leftover · design leftover",
      duolingo: "Duolingo leftover · lesson leftover",
      substack: "Substack leftover · post leftover",
      medium: "Medium leftover · story leftover",
      bluesky: "Bluesky leftover · invite leftover · not X",
      cohost: "cohost leftover · post leftover",
      kick: "Kick leftover · stream leftover",
      layoffs: "Winter 2022 leftover · literacy only",
      openai: "OpenAI leftover · blog · Send stays on ChatGPT",
      zoom: "Zoom leftover · Leave is 2020 gold",
      reels: "Reels leftover · launched 2020 · not 2022 gold",
      youtubeshorts: "Shorts leftover · 2021 mass · not 2022 gold"
    };
    return faces[slug] || slug + " leftover · 2022 room · not gold";
  }

  function destResult(slug, kind, q) {
    var t = esc(q);
    var rows = {
      reddit:
        '<div data-y22-ok="search"><p>r/all leftover</p><p>↑ leftover · ' +
        t +
        "</p><p>↑ leftover · comments leftover</p></div>",
      youtube:
        '<div data-y22-ok="watch"><div class="y22-yt-stage">Now playing leftover</div><p>' +
        t +
        " · 2022 leftover · not Shorts gold</p></div>",
      wikipedia:
        '<div data-y22-ok="search"><p><b>' +
        t +
        "</b> leftover</p><p>From Wikipedia, the free encyclopedia leftover. Not the 2001 edit star.</p></div>",
      instagram:
        '<div data-y22-ok="search"><div class="y22-grid"><span></span><span></span><span></span><span></span><span></span><span></span></div><p>grid leftover · ' +
        t +
        "</p></div>",
      google:
        '<div data-y22-ok="search"><p>Results leftover · not Bard</p><p>1. ' +
        t +
        "</p><p>2. " +
        t +
        " — Wikipedia leftover</p></div>",
      facebook:
        '<div data-y22-ok="compose"><p>News Feed leftover</p><p>You: ' + t + "</p></div>",
      gmail:
        '<div data-y22-ok="compose"><p>Sent leftover</p><p>To: leftover · ' + t + "</p></div>",
      spotify:
        '<div data-y22-ok="play"><p>Now playing leftover</p><p>' + t + " · Wrapped leftover</p></div>",
      netflix:
        '<div data-y22-ok="watch"><p>Continue leftover</p><p>' + t + " · password leftover</p></div>",
      amazon:
        '<div data-y22-ok="shop"><p>Cart leftover</p><p>' + t + " · 2022 leftover</p></div>",
      midjourney:
        '<div data-y22-ok="compose"><p>/imagine leftover</p><p>' +
        t +
        "</p><p class=\"y22-mj\">[failed-final] no invented image</p></div>",
      stablediffusion:
        '<div data-y22-ok="compose"><p>txt2img leftover</p><p>' +
        t +
        "</p><p class=\"y22-mj\">[failed-final] no invented image</p></div>",
      discord: '<div data-y22-ok="compose"><p>#general leftover</p><p>You: ' + t + "</p></div>",
      slack: '<div data-y22-ok="compose"><p>thread leftover</p><p>You: ' + t + "</p></div>",
      twitch: '<div data-y22-ok="watch"><p>LIVE leftover</p><p>' + t + "</p></div>",
      uber: '<div data-y22-ok="ride"><p>Driver leftover · 4 min</p><p>' + t + "</p></div>",
      doordash: '<div data-y22-ok="shop"><p>Order leftover</p><p>' + t + "</p></div>",
      airbnb: '<div data-y22-ok="stay"><p>Stay leftover</p><p>' + t + "</p></div>",
      linkedin: '<div data-y22-ok="compose"><p>Feed leftover</p><p>You: ' + t + "</p></div>",
      snapchat: '<div data-y22-ok="compose"><p>Snap leftover · not BeReal</p><p>' + t + "</p></div>",
      whatsapp: '<div data-y22-ok="compose"><p>Chat leftover</p><p>You: ' + t + "</p></div>",
      telegram: '<div data-y22-ok="compose"><p>Chat leftover</p><p>You: ' + t + "</p></div>",
      signal: '<div data-y22-ok="compose"><p>Chat leftover</p><p>You: ' + t + "</p></div>",
      teams: '<div data-y22-ok="compose"><p>Meeting leftover</p><p>' + t + "</p></div>",
      meet: '<div data-y22-ok="compose"><p>Join leftover · Zoom Leave is 2020 gold</p><p>' + t + "</p></div>",
      disneyplus: '<div data-y22-ok="watch"><p>Continue leftover · 2019 gold stays Continue</p><p>' + t + "</p></div>",
      hbomax: '<div data-y22-ok="watch"><p>HBO Max leftover</p><p>' + t + "</p></div>",
      hulu: '<div data-y22-ok="watch"><p>Watch leftover</p><p>' + t + "</p></div>",
      roblox: '<div data-y22-ok="play"><p>Playing leftover</p><p>' + t + "</p></div>",
      steam: '<div data-y22-ok="play"><p>Library leftover</p><p>' + t + "</p></div>",
      epic: '<div data-y22-ok="shop"><p>Store leftover</p><p>' + t + "</p></div>",
      github: '<div data-y22-ok="compose"><p>Issue leftover</p><p>' + t + "</p></div>",
      notion: '<div data-y22-ok="files"><p>Page leftover</p><p>' + t + "</p></div>",
      figma: '<div data-y22-ok="files"><p>File leftover</p><p>' + t + "</p></div>",
      canva: '<div data-y22-ok="files"><p>Design leftover</p><p>' + t + "</p></div>",
      duolingo: '<div data-y22-ok="play"><p>Lesson leftover</p><p>' + t + "</p></div>",
      substack: '<div data-y22-ok="news"><p>Post leftover</p><p>' + t + "</p></div>",
      medium: '<div data-y22-ok="news"><p>Story leftover</p><p>' + t + "</p></div>",
      bluesky: '<div data-y22-ok="compose"><p>Invite leftover · not X</p><p>' + t + "</p></div>",
      cohost: '<div data-y22-ok="compose"><p>Post leftover</p><p>' + t + "</p></div>",
      kick: '<div data-y22-ok="watch"><p>Stream leftover</p><p>' + t + "</p></div>",
      layoffs: '<div data-y22-ok="news"><p>Winter 2022 leftover</p><p>' + t + "</p></div>",
      openai: '<div data-y22-ok="news"><p>OpenAI leftover · Send stays on ChatGPT</p><p>' + t + "</p></div>",
      zoom: '<div data-y22-ok="compose"><p>Meeting leftover · Leave is 2020 gold</p><p>' + t + "</p></div>",
      reels: '<div data-y22-ok="watch"><p>Reels leftover · 2020 launch</p><p>' + t + "</p></div>",
      youtubeshorts: '<div data-y22-ok="watch"><p>Shorts leftover · 2021 mass</p><p>' + t + "</p></div>",
      nyt: '<div data-y22-ok="news"><p>Headline leftover</p><p>' + t + "</p></div>",
      cnn: '<div data-y22-ok="news"><p>Headline leftover</p><p>' + t + "</p></div>",
      bbc: '<div data-y22-ok="news"><p>Headline leftover</p><p>' + t + "</p></div>",
      espn: '<div data-y22-ok="news"><p>Score leftover</p><p>' + t + "</p></div>",
      maps: '<div data-y22-ok="search"><p>Directions leftover</p><p>' + t + "</p></div>",
      drive: '<div data-y22-ok="files"><p>Opened leftover</p><p>' + t + "</p></div>",
      dropbox: '<div data-y22-ok="files"><p>Opened leftover</p><p>' + t + "</p></div>",
      paypal: '<div data-y22-ok="pay"><p>Sent leftover · no live wallet</p><p>' + t + "</p></div>",
      venmo: '<div data-y22-ok="pay"><p>Sent leftover · no live wallet</p><p>' + t + "</p></div>",
      robinhood: '<div data-y22-ok="pay"><p>Ticket leftover · no live trade</p><p>' + t + "</p></div>",
      coinbase: '<div data-y22-ok="pay"><p>Ticket leftover · no live wallet</p><p>' + t + "</p></div>",
      binance: '<div data-y22-ok="pay"><p>Ticket leftover · no live wallet</p><p>' + t + "</p></div>",
      nft: '<div data-y22-ok="shop"><p>NFT leftover · winter 2022</p><p>' + t + "</p></div>",
      opensea: '<div data-y22-ok="shop"><p>OpenSea leftover · winter 2022</p><p>' + t + "</p></div>",
      ebay: '<div data-y22-ok="shop"><p>Bid leftover</p><p>' + t + "</p></div>",
      etsy: '<div data-y22-ok="shop"><p>Cart leftover</p><p>' + t + "</p></div>",
      imdb: '<div data-y22-ok="search"><p>Title leftover</p><p>' + t + "</p></div>",
      pinterest: '<div data-y22-ok="search"><p>Pin leftover</p><p>' + t + "</p></div>",
      messenger: '<div data-y22-ok="compose"><p>Chat leftover</p><p>You: ' + t + "</p></div>",
      outlook: '<div data-y22-ok="compose"><p>Sent leftover</p><p>' + t + "</p></div>",
      wordpress: '<div data-y22-ok="compose"><p>Post leftover</p><p>' + t + "</p></div>",
      tumblr: '<div data-y22-ok="compose"><p>Post leftover</p><p>' + t + "</p></div>",
      patreon: '<div data-y22-ok="pay"><p>Pledge leftover · no live card</p><p>' + t + "</p></div>",
      archive: '<div data-y22-ok="search"><p>Wayback leftover</p><p>' + t + "</p></div>",
      apple: '<div data-y22-ok="news"><p>Apple leftover · iOS 16 leftover</p><p>' + t + "</p></div>",
      chrome: '<div data-y22-ok="search"><p>Chrome leftover · habit shell stays</p><p>' + t + "</p></div>",
      edge: '<div data-y22-ok="search"><p>Edge leftover · Chromium habit</p><p>' + t + "</p></div>",
      windows10: '<div data-y22-ok="files"><p>Win10 leftover · still mass</p><p>' + t + "</p></div>"
    };
    if (rows[slug]) return rows[slug];
    if (kind === "compose") return '<div class="y22-msg" data-y22-ok="compose">You: ' + t + "</div>";
    if (kind === "shop") return '<div data-y22-ok="shop">In cart leftover: ' + t + "</div>";
    if (kind === "watch") return '<div data-y22-ok="watch">Now playing leftover: ' + t + "</div>";
    if (kind === "ride") return '<div data-y22-ok="ride">Driver leftover · ' + t + "</div>";
    if (kind === "pay") return '<div data-y22-ok="pay">Sent leftover · ' + t + " · no live wallet</div>";
    if (kind === "stay") return '<div data-y22-ok="stay">Stay leftover · ' + t + "</div>";
    if (kind === "news") return '<div data-y22-ok="news">Headline leftover · ' + t + "</div>";
    if (kind === "play") return '<div data-y22-ok="play">Playing leftover · ' + t + "</div>";
    if (kind === "files") return '<div data-y22-ok="files">Opened leftover · ' + t + "</div>";
    return (
      '<div data-y22-ok="search"><p>Results leftover · not Bard</p><p>1. ' +
      t +
      "</p><p>2. " +
      t +
      " — Wikipedia leftover</p></div>"
    );
  }

  function bindKind(host) {
    if (host.getAttribute("data-y22-bound") === "1") return;
    host.setAttribute("data-y22-bound", "1");
    var kind = host.getAttribute("data-y22-kind") || "search";
    var slug = destSlug();
    var go = host.querySelector("[data-y22-room-go]");
    var field = host.querySelector("[data-y22-q]") || host.querySelector("input, textarea");
    var out = host.querySelector("[data-y22-result]");
    if (!host.querySelector("[data-y22-face]")) {
      var face = host.ownerDocument.createElement("div");
      face.setAttribute("data-y22-face", slug);
      face.className = "y22-face";
      face.textContent = destFaceHtml(slug);
      host.insertBefore(face, host.firstChild);
    }
    if (!go || !out) return;
    go.addEventListener("click", function () {
      var q = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (q.length < 2) {
        out.textContent = "";
        out.setAttribute("data-y22-empty", "1");
        return;
      }
      out.removeAttribute("data-y22-empty");
      out.innerHTML = destResult(slug, kind, q);
    });
  }

  function bootRooms(doc) {
    var rooms = doc.querySelectorAll("[data-y22-kind]");
    var i;
    for (i = 0; i < rooms.length; i++) {
      bindKind(rooms[i]);
    }
  }

  function boot() {
    var doc = document;
    bootChat(doc);
    bootWordle(doc);
    bootTwitter(doc);
    bootBereal(doc);
    bootIsland(doc);
    bootTiktok(doc);
    bootGoogle(doc);
    bootRooms(doc);
    bootOfficialOut(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year2022extras",
      featureKey: "oneThingMachines",
      boot: boot
    });
  } else {
    if (docReady()) boot();
    else document.addEventListener("DOMContentLoaded", boot);
  }
  function docReady() {
    return document.readyState === "complete" || document.readyState === "interactive";
  }
})(typeof window !== "undefined" ? window : this);
