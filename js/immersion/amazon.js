/**
 * Immersion feature: amazon
 * Registers with ITT.ImmersionFeatures — init(api) only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "amazon",
    needs: function (cfg) { return cfg.features && cfg.features.amazon; },
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
      var markTourProgress = api.markTourProgress;
      var markTourUsed = api.markTourUsed || api.markTourProgress;
      var renderCounter = api.renderCounter;
      var parentBrowser = api.parentBrowser;

var BOOKS = config.books || [];

function getCart() { return loadJSON(storageKey("amazon-cart"), []); }
function setCart(c) { saveJSON(storageKey("amazon-cart"), c); }

function updateCartBadges() {
  var n = getCart().length;
  var els = document.querySelectorAll("#cart-count, [data-cart-count]");
  for (var i = 0; i < els.length; i++) els[i].textContent = String(n);
}

function bookHref(file) {
  if ((location.pathname || "").indexOf("/amazon/") !== -1) return file;
  return R("sites/amazon/" + file);
}

function initAmazonAdd() {
  var btns = document.querySelectorAll("[data-add-cart]");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (ev) {
      ev.preventDefault();
      var b = ev.currentTarget;
      var item = {
        id: b.getAttribute("data-id") || b.getAttribute("data-product-id") || "book",
        title: b.getAttribute("data-title") || "Book",
        price: parseFloat(b.getAttribute("data-price") || "0") || 0,
        author: b.getAttribute("data-author") || ""
      };
      var cart = getCart();
      cart.push(item);
      setCart(cart);
      updateCartBadges();
      var msg = "Added <b>" + escapeHtml(item.title) + "</b> to your Shopping Cart. " +
        '<a href="' + bookHref("cart.html") + '"><b>View cart</b></a> · ' +
        '<a href="' + bookHref("checkout.html") + '">Proceed to checkout</a>';
      var note = document.getElementById("cart-flash");
      if (note) {
        note.style.display = "block";
        note.innerHTML = msg;
      }
      if (api.actionFeedback) {
        api.actionFeedback(msg, { kind: "amazon-cart", statusSelector: "#cart-flash, [data-cart-flash]" });
      } else {
        showFlash(msg);
      }
      markTourUsed();
    });
  }
  updateCartBadges();
}

function initAmazonCart() {
  var list = document.querySelector("[data-cart-list]");
  if (!list) return;
  var cart = getCart();
  var totalEl = document.querySelector("[data-cart-total]");
  var total = 0;
  list.innerHTML = "";
  if (!cart.length) {
    list.innerHTML = '<tr><td colspan="3"><i>Cart empty. <a href="' + bookHref("index.html") +
      '">Continue shopping</a></i></td></tr>';
  } else {
    for (var i = 0; i < cart.length; i++) {
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + escapeHtml(cart[i].title) +
        (cart[i].author ? '<br><font size="2">' + escapeHtml(cart[i].author) + "</font>" : "") +
        '</td><td align="right">$' + cart[i].price.toFixed(2) +
        '</td><td align="center"><a href="#" data-remove="' + i + '">Remove</a></td>';
      list.appendChild(tr);
      total += cart[i].price;
    }
  }
  if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
  list.onclick = function (e) {
    var a = e.target.closest ? e.target.closest("[data-remove]") : null;
    if (!a) return;
    e.preventDefault();
    var idx = parseInt(a.getAttribute("data-remove"), 10);
    var c = getCart();
    c.splice(idx, 1);
    setCart(c);
    location.reload();
  };
  var clear = document.querySelector("[data-cart-clear]");
  if (clear) {
    clear.onclick = function (e) {
      e.preventDefault();
      setCart([]);
      location.reload();
    };
  }
  updateCartBadges();
}

function initAmazonSearch() {
  var out = document.querySelector("[data-amazon-results]");
  if (!out) return;
  var q = (qs("q") || "").toLowerCase().trim();
  var cat = qs("cat") || "";
  var input = document.querySelector('input[name="q"]');
  if (input && qs("q")) input.value = qs("q");
  var hits = BOOKS.slice();
  if (cat) hits = hits.filter(function (b) { return b.cat === cat; });
  if (q) {
    hits = hits.filter(function (b) {
      return (b.title + " " + b.author + " " + b.blurb + " " + b.cat).toLowerCase().indexOf(q) !== -1;
    });
  }
  if (!q && !cat) {
    out.innerHTML = "<p>Enter a title or author. Try: <i>gibson</i>, <i>computer</i>, <i>galaxy</i>.</p>";
    return;
  }
  if (!hits.length) {
    out.innerHTML = '<p>No titles matched. <a href="' + bookHref("index.html") + '">Browse store</a></p>';
    return;
  }
  var html = "<p><b>" + hits.length + "</b> title(s):</p><ul>";
  for (var i = 0; i < hits.length; i++) {
    var b = hits[i];
    html += '<li><a href="' + bookHref(b.file) + '"><b>' + escapeHtml(b.title) + "</b></a> — " +
      escapeHtml(b.author) + " · <b>$" + b.price.toFixed(2) + '</b><br><font size="2">' +
      escapeHtml(b.blurb) + "</font></li>";
  }
  html += "</ul>";
  out.innerHTML = html;
}

function initAmazonFeatured() {
  var el = document.querySelector("[data-amazon-featured]");
  if (!el || !BOOKS.length) return;
  var html = "<ul>";
  for (var i = 0; i < BOOKS.length; i++) {
    var b = BOOKS[i];
    html += '<li><a href="' + bookHref(b.file) + '"><b>' + escapeHtml(b.title) + "</b></a> — " +
      escapeHtml(b.author) + " · $" + b.price.toFixed(2) + "</li>";
  }
  html += "</ul>";
  el.innerHTML = html;
}

/** "Customers who bought this also bought…" period recommendation strip */
function initAmazonRecs() {
  var nodes = document.querySelectorAll("[data-amazon-recs]");
  if (!nodes.length || !BOOKS.length) return;
  var path = location.pathname || "";
  var currentId = "";
  for (var i = 0; i < BOOKS.length; i++) {
    if (path.indexOf(BOOKS[i].file) !== -1 || path.indexOf(BOOKS[i].id) !== -1) {
      currentId = BOOKS[i].id;
      break;
    }
  }
  for (var n = 0; n < nodes.length; n++) {
    var el = nodes[n];
    var cat = el.getAttribute("data-rec-for") || "";
    var picks = [];
    for (var j = 0; j < BOOKS.length; j++) {
      var b = BOOKS[j];
      if (b.id === currentId) continue;
      if (cat && b.cat !== cat) continue;
      picks.push(b);
      if (picks.length >= 4) break;
    }
    if (!picks.length) {
      for (var k = 0; k < BOOKS.length && picks.length < 4; k++) {
        if (BOOKS[k].id !== currentId) picks.push(BOOKS[k]);
      }
    }
    var html = "<ul>";
    for (var p = 0; p < picks.length; p++) {
      html += '<li><a href="' + bookHref(picks[p].file) + '"><b>' + escapeHtml(picks[p].title) +
        "</b></a> — " + escapeHtml(picks[p].author) + " · $" + picks[p].price.toFixed(2) + "</li>";
    }
    html += "</ul>";
    el.innerHTML = html;
  }
}

/** Amazon 1997 “Book of the Day” — seeded by date */
function initBookOfDay() {
  var el = document.querySelector("[data-book-of-day]");
  if (!el || !BOOKS.length) return;
  var day = Math.floor(Date.now() / 86400000);
  var b = BOOKS[day % BOOKS.length];
  el.innerHTML = '<a href="' + bookHref(b.file) + '"><b>' + escapeHtml(b.title) +
    "</b></a> by " + escapeHtml(b.author) + " — <b>$" + b.price.toFixed(2) + "</b>";
}

function parentBrowser() {
  try {
    if (window.parent && window.parent !== window && window.parent.ITT && window.parent.ITT.activeBrowser) {
      return window.parent.ITT.activeBrowser;
    }
  } catch (e) { /* cross-origin */ }
  return null;
}

function initSecureCheckoutBanner() {
  var root = document.querySelector("[data-checkout]");
  if (!root) return;
  /* SSL theater */
  var banner = document.getElementById("itt-secure-banner");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "itt-secure-banner";
    banner.innerHTML =
      '<table width="100%" cellpadding="6" cellspacing="0" border="0" bgcolor="#FFFFCC">' +
      '<tr><td><font face="Arial, Helvetica, sans-serif" size="2" color="#006600">' +
      "<b>[Key] Secure document</b> — You have entered a secure area. " +
      "Credit card information is protected with SSL encryption (simulated)." +
      "</font></td></tr></table>";
    if (root.firstChild) root.insertBefore(banner, root.firstChild);
    else root.appendChild(banner);
  }
  var br = parentBrowser();
  if (br && br.setSecureMode) {
    br.setSecureMode(true, "https://www.amazon.com/checkout.html");
  }
}

function initCheckout() {
  if (!document.querySelector("[data-checkout]")) return;
  initSecureCheckoutBanner();
  var cart = getCart();
  var list = document.querySelector("[data-checkout-list]");
  var total = 0;
  if (list) {
    list.innerHTML = "";
    for (var i = 0; i < cart.length; i++) {
      var li = document.createElement("li");
      li.textContent = cart[i].title + " — $" + cart[i].price.toFixed(2);
      list.appendChild(li);
      total += cart[i].price;
    }
    if (!cart.length) list.innerHTML = "<li><i>Cart empty</i></li>";
  }
  var t = document.querySelector("[data-checkout-total]");
  if (t) t.textContent = "$" + total.toFixed(2);
  var form = document.querySelector("form[data-checkout-form]");
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      if (!cart.length) { alert("Your cart is empty."); return; }
      var name = (form.querySelector('[name="name"]') || {}).value || "Customer";
      var email = (form.querySelector('[name="email"]') || {}).value || "you@somewhere.com";
      var order = {
        id: "A" + Date.now().toString().slice(-8),
        name: name, total: total, date: new Date().toLocaleString(), email: email
      };
      var orders = loadJSON(storageKey("amazon-orders"), []);
      orders.unshift(order);
      saveJSON(storageKey("amazon-orders"), orders.slice(0, 20));
      /* store confirmation mail for Netscape Mail theater */
      var confMails = loadJSON(storageKey("order-mail"), []);
      confMails.unshift({
        from: "orders@amazon.com",
        subject: "Your Amazon.com order " + order.id,
        body: "Dear " + name + ",\n\nThank you for your order (" + order.id + ").\n" +
          "Total: $" + total.toFixed(2) + "\n\nWe will obtain the books from distributors " +
          "and ship them shortly.\n\n— Amazon.com",
        date: order.date
      });
      saveJSON(storageKey("order-mail"), confMails.slice(0, 10));
      setCart([]);
      location.href = bookHref("order-thanks.html") + "?id=" + encodeURIComponent(order.id) +
        "&name=" + encodeURIComponent(name) + "&total=" + encodeURIComponent(total.toFixed(2));
    };
  }
}

function initOrderThanks() {
  if (!document.querySelector("[data-order-thanks]")) return;
  var a = document.querySelector("[data-order-id]");
  var b = document.querySelector("[data-order-name]");
  var c = document.querySelector("[data-order-total]");
  if (a) a.textContent = qs("id") || "—";
  if (b) b.textContent = qs("name") || "Customer";
  if (c) c.textContent = "$" + (qs("total") || "0.00");
  /* confirmation email notice */
  var note = document.getElementById("itt-order-mail-note");
  if (!note) {
    note = document.createElement("p");
    note.id = "itt-order-mail-note";
    note.innerHTML = '<font size="2">A confirmation message from <b>orders@amazon.com</b> has been ' +
      "queued in your mail (File → Mail Document / browser mail window in a full Netscape setup).</font>";
    document.body.appendChild(note);
  }
  var br = parentBrowser();
  if (br && br.setSecureMode) br.setSecureMode(false);
}

/* ---------- Eyes & Editors subscription (1995) ---------- */
function initEyesSubscribe() {
  var form = document.querySelector("form[data-amazon-eyes], form[data-eyes-form]");
  if (!form) {
    /* legacy: form with data-itt-theater on eyes page */
    if ((location.pathname || "").indexOf("/eyes") === -1) return;
    form = document.querySelector("form");
  }
  if (!form) return;
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var email = ((form.querySelector('[name="email"]') || {}).value || "").trim();
    var authors = ((form.querySelector('[name="authors"]') || {}).value || "").trim();
    var subjects = ((form.querySelector('[name="subjects"]') || {}).value || "").trim();
    if (!email) {
      showFlash("Enter an email address for Eyes notifications.");
      return;
    }
    var key = storageKey("amazon-eyes");
    var list = loadJSON(key, []) || [];
    list.unshift({
      email: email,
      authors: authors,
      subjects: subjects,
      at: new Date().toLocaleString()
    });
    saveJSON(key, list.slice(0, 20));
    var host = document.getElementById("itt-eyes-out");
    if (!host) {
      host = document.createElement("div");
      host.id = "itt-eyes-out";
      form.parentNode.insertBefore(host, form.nextSibling);
    }
    /* 1995 Amazon: plain document table, Times-ish body, navy header */
    host.innerHTML =
      '<table width="90%" cellpadding="6" cellspacing="0" border="1" bordercolor="#999999" bgcolor="#FFFFFF" style="margin:12px 0">' +
      '<tr bgcolor="#000000"><td><font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">' +
      "<b>amazon.com Eyes &amp; Editors</b> — subscription confirmation</font></td></tr>" +
      '<tr><td bgcolor="#FFFFCC"><font face="Times New Roman, Times, serif" size="3">' +
      "Thank you. We will watch for new titles matching your interests and " +
      "send e-mail to <b>" + escapeHtml(email) + "</b> when they appear in Books in Print." +
      "</font>" +
      '<hr size="1" noshade color="#999999">' +
      '<font face="Arial, Helvetica, sans-serif" size="2">' +
      "<b>Authors:</b> " + escapeHtml(authors || "(none listed)") + "<br>" +
      "<b>Subjects:</b> " + escapeHtml(subjects || "(none listed)") + "<br>" +
      "<font size=\"1\" color=\"#666666\">" + list.length +
      " profile(s) stored in this browser · free personal notification service, 1995.</font>" +
      "</font></td></tr></table>";
    showFlash("Eyes & Editors: subscription recorded for <b>" + escapeHtml(email) + "</b>.");
    markTourUsed();
  });
}

      if (config.features && config.features.amazon) {
        initAmazonAdd();
        initAmazonCart();
        initAmazonSearch();
        initAmazonFeatured();
        initAmazonRecs();
        initBookOfDay();
        initCheckout();
        initOrderThanks();
        initEyesSubscribe();
      }

    }
  });
})(typeof window !== "undefined" ? window : this);
