/**
 * Immersion feature: slashdot
 * Registers with ITT.ImmersionFeatures — init(api) only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "slashdot",
    needs: function () { return true; },
    init: function (api) {
      var config = api.config;
      var YEAR = api.YEAR;
      var R = api.R;
      var storageKey = api.storageKey;
      var qs = api.qs;
      var escapeHtml = api.escapeHtml;
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var showFlash = api.showFlash;
      var actionFeedback = api.actionFeedback || showFlash;
      var markTourProgress = api.markTourProgress;
      var markTourUsed = api.markTourUsed || api.markTourProgress;
      var renderCounter = api.renderCounter;
      var parentBrowser = api.parentBrowser;

/** Slashdot-style comment form → localStorage */
function initSlashdotComments() {
  var list = document.querySelector("[data-sd-comments]");
  var form = document.querySelector("form[data-sd-comment-form]");
  if (!list && !form) return;
  var storyId = (document.body.getAttribute("data-sd-story") || "ie4") + "";
  var key = storageKey("sd-comments", storyId);
  var seeds = config.slashdotSeeds || [
    {
      nick: "Anonymous Coward",
      subject: "Great, another browser to test against…",
      body: "Now I have to test Netscape 3, 4, IE3, AND IE4?",
      score: "1"
    },
    {
      nick: "LinuxFan42",
      subject: "Netscape Communicator has everything I need",
      body: "IE4 doesn't even run on Linux.",
      score: "3"
    }
  ];
  function loadComments() {
    var stored = loadJSON(key, null);
    if (stored && stored.length) return stored;
    return seeds.slice();
  }
  function saveComments(arr) {
    saveJSON(key, arr.slice(0, 40));
  }
  function paint(arr) {
    if (!list) return;
    list.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
      var c = arr[i];
      var div = document.createElement("div");
      div.className = "sd-comment";
      div.innerHTML =
        '<font face="Verdana, Arial, sans-serif" size="2">' +
        "<b>" + escapeHtml(c.subject || "Comment") + "</b><br>" +
        '<font size="1">by <b>' + escapeHtml(c.nick || "Anonymous Coward") +
        "</b> · <span class=\"sd-score\">(Score: " + escapeHtml(c.score || "1") + ")</span></font><br><br>" +
        escapeHtml(c.body || "") +
        "</font>";
      list.appendChild(div);
    }
  }
  var comments = loadComments();
  paint(comments);
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      var nick = ((form.querySelector('[name="nick"]') || {}).value || "Anonymous Coward").trim();
      var subject = ((form.querySelector('[name="subject"]') || {}).value || "Re: story").trim();
      var body = ((form.querySelector('[name="body"]') || {}).value || "").trim();
      if (!body) {
        actionFeedback("Write a comment first.");
        return;
      }
      comments.unshift({ nick: nick, subject: subject, body: body, score: "1", date: new Date().toLocaleString() });
      saveComments(comments);
      paint(comments);
      form.reset();
      actionFeedback("Comment posted.");
      markTourUsed();
    };
  }
}

      initSlashdotComments();

    }
  });
})(typeof window !== "undefined" ? window : this);
