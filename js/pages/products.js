"use strict";

var _firebaseApp = require("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");
var _database = require("./database.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function displayProducts(products) {
  products.forEach(function (prod) {
    var _document$getElementB;
    var product = document.createElement("div");
    product.classList.add("product", "col-sm-12", "col-md-5", "col-lg-2", "border", "border-gray", "rounded-3");
    var img = document.createElement("img");
    img.classList.add("img-fluid", "show-text-x-50", "show-text-x-50", "rounded-4");
    img.src = prod.imagePath;
    product.appendChild(img);
    (_document$getElementB = document.getElementById("".concat(prod.type, "-prod"))) === null || _document$getElementB === void 0 || _document$getElementB.prepend(product);
  });
}
function getProductsAndDisplayIt() {
  return _getProductsAndDisplayIt.apply(this, arguments);
}
function _getProductsAndDisplayIt() {
  _getProductsAndDisplayIt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _products;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getAllDocuments)();
        case 3:
          _products = _context.sent;
          if (_products) displayProducts(_products);
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("Cannot Get Products ", _context.t0);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getProductsAndDisplayIt.apply(this, arguments);
}
getProductsAndDisplayIt();
var firebaseConfig = {
  apiKey: "AIzaSyAQmrPfxjnuUA__bkqzZF-gsj4F1JLNoOg",
  authDomain: "test-d09cc.firebaseapp.com",
  projectId: "test-d09cc",
  storageBucket: "test-d09cc.appspot.com",
  messagingSenderId: "546762745938",
  appId: "1:546762745938:web:f33924bbf13e82ddd6d78b",
  measurementId: "G-4S9NPQVMK6"
};

// Initialize Firebase
var firebaseApp = (0, _firebaseApp.initializeApp)(firebaseConfig);

// Initialize Firestore
var db = (0, _firebaseFirestore.getFirestore)(firebaseApp);
var products = Array.from(document.querySelectorAll(".products"));
function displaySpecifiedNumberOfProduct(productsHolder) {
  var uniecClass = productsHolder.getAttribute("data-un-class");
  var productsContainer = Array.from(document.querySelectorAll(".".concat(uniecClass, " .holder .row div.product")));
  if (productsContainer) productsContainer.forEach(function (card, index) {
    if (index >= 5) {
      card.classList.add("d-none");
    } else {
      card.classList.remove("d-none");
    }
  });
}
function getProductsNumber(productsHolder) {
  var uniecClass = productsHolder.getAttribute("data-un-class");
  var productsLength = document.querySelectorAll(".".concat(uniecClass, " .holder .row div.product")).length;
  var productsLengthArea = document.querySelector(".".concat(uniecClass, " .products-length"));
  if (productsLengthArea) productsLengthArea.innerHTML = "".concat(productsLength, " Products");
}
function addShowingProductsNumber(productsHolder) {
  var uniecClass = productsHolder.getAttribute("data-un-class");
  var showMoreBtn = document.querySelector(".".concat(uniecClass, " .show-more"));
  var showMoreLimit = 5;
  showMoreBtn === null || showMoreBtn === void 0 || showMoreBtn.addEventListener("click", function () {
    var products = document.querySelectorAll(".".concat(uniecClass, " .holder .row div.product"));
    var productsLength = products.length;
    var showingProducts = Array.from(products).filter(function (prod) {
      return !prod.classList.contains("d-none");
    }).length;
    var productsContainer = Array.from(products);
    if (productsContainer) productsContainer.forEach(function (card, index) {
      if (index >= showingProducts + showMoreLimit) {
        card.classList.add("d-none");
      } else {
        scalingShow(card);
      }
    });
    var productsLengthArea = document.querySelector(".".concat(uniecClass, " .products-length"));
    if (productsLengthArea) productsLengthArea.innerHTML = "".concat(showingProducts + showMoreLimit > productsLength ? productsLength : showingProducts + showMoreLimit, "/").concat(productsLength, " Products ");
    if (showingProducts + showMoreLimit >= productsLength) return false;
  });
}
function setTheTitleFixedTopIfInProductScoope(productsContainer) {
  var uniecClass = productsContainer.getAttribute("data-un-class");
  var title = document.querySelector(".".concat(uniecClass, " h1.big-title"));
  var titleHeight = title === null || title === void 0 ? void 0 : title.clientHeight;
  title === null || title === void 0 || title.remove();

  // Create Title Holder For Pin Title In Page Top

  var titleHolder = document.createElement("div");
  titleHolder.classList.add("big-title", "title-holder", "bg-white");
  if (title) titleHolder.appendChild(title);
  productsContainer.prepend(titleHolder);
  titleHolder.style.width = "100%";
  function updateProductTitlePosition(titleHolder) {
    var scrollY = window.scrollY;
    var offsetTop = productsContainer.offsetTop;
    var titleHeight = title.clientHeight;
    var productsHeight = productsContainer.clientHeight;
    var inProductsScope = scrollY >= offsetTop && scrollY < offsetTop + (productsHeight - titleHeight);
    if (title) title.classList.toggle("position-fixed", inProductsScope);
    if (inProductsScope) {
      if (title) title.classList.add("start-0", "py-4", "px-2", "w-100", "z-3", "shadow-sm");
      var computedMarginTop = window.getComputedStyle(title).marginTop;
      if (title) title.style.top = "-".concat(computedMarginTop);
    } else {
      if (title) title.classList.remove("start-0", "py-4", "px-2", "w-100", "z-3", "shadow-sm");
    }
  }
  window.addEventListener("scroll", function () {
    return updateProductTitlePosition(titleHolder);
  });
}
function showClickedPictureMoreDetails(productsHolder) {
  var productsArray = Array.from(productsHolder.children);
  productsArray.forEach(function (card) {
    card.addEventListener("click", function () {
      gallery.classList.remove("d-none");
      gallery.classList.add("d-flex");
      var clickedImage = card.children[0];
      if (clickedImage.tagName == "IMG") selectedImage.src = clickedImage.src;
      imageContainer.style.height = selectedImage.clientHeight + "px";
    });
  });
}
var imageContainer = document.querySelector(".gallery .image");
var gallery = document.getElementById("gallery");
var selectedImage = document.getElementById("selected-image");
selectedImage.style.scale = "1";
var galleryCloseButton = document.querySelector(".gallery .close-gallery");
var toolsBox = document.querySelector(".gallery .tools");
var fullScreenImage = document.querySelector(".gallery .tools .full-screen");
var zoomInImage = document.querySelector(".gallery .tools .zoom-in");
var zoomOutImage = document.querySelector(".gallery .tools .zoom-out");
var closeGallery = document.querySelector(".gallery .tools .close");
var share = document.querySelector(".gallery .tools .share");
var whatsappShare = document.querySelector(".gallery .tools .whatsapp");
galleryCloseButton === null || galleryCloseButton === void 0 || galleryCloseButton.addEventListener("click", function () {
  gallery.classList.remove("d-flex");
  gallery.classList.add("d-none");
  document.exitFullscreen();
});
fullScreenImage === null || fullScreenImage === void 0 || fullScreenImage.addEventListener("click", function () {
  if (fullScreenImage.dataset.fullscreen == "true") {
    fullScreenImage.dataset.fullscreen = "false";
    fullScreenImage.innerHTML = "<i class=\"fa-solid fa-expand\"></i>";
    document.exitFullscreen();
  } else {
    fullScreenImage.dataset.fullscreen = "true";
    gallery.requestFullscreen();
    fullScreenImage.innerHTML = "<i class=\"fa-solid fa-compress\"></i>";
  }
});
zoomInImage === null || zoomInImage === void 0 || zoomInImage.addEventListener("click", function () {
  var currentScale = parseInt(window.getComputedStyle(selectedImage).scale);
  console.log(currentScale);
  if (currentScale <= 4) {
    selectedImage.style.scale = "".concat(currentScale * 2);
  }
});
zoomOutImage === null || zoomOutImage === void 0 || zoomOutImage.addEventListener("click", function () {
  var currentScale = parseInt(window.getComputedStyle(selectedImage).scale);
  console.log(currentScale);
  if (currentScale > 1) {
    selectedImage.style.scale = "".concat(currentScale / 2);
  }
});
function scalingShow(ele) {
  ele.style.scale = "0 1";
  ele.classList.remove("d-none");
  setTimeout(function () {
    ele.style.scale = "1 1";
  }, 0);
}