// Generated by CoffeeScript 1.6.3
(function() {
  this.initNav = function() {
    this.prevButton = get("prev-icon");
    this.nextButton = get("next-icon");
    this.allPageElements = document.querySelectorAll('div[data-role="page"]');
    this.menuItems = document.querySelectorAll('#menu .inner a');
    initAllPages();
    if (location && location.hash) {
      goto(location.hash);
    } else {
      goto("#title");
    }
    listenOn(window, "orientationchange", this.fitPage);
    window.addEventListener("resize", this.resizeThrottler, false);
    return setInterval(this.fitAllPages, 1000);
  };

  this.clearMenus = function() {
    remove("menu");
    return remove("settings");
  };

  this.fitToolbars = function() {
    var footer, header;
    header = get("header");
    footer = get("footer");
    header.style.width = window.innerWidth + "px";
    return footer.style.width = window.innerWidth + "px";
  };

  this.fitPage = function(page) {
    return page.style.width = window.innerWidth + "px";
  };

  this.resizeTimeout;

  this.resizeInner = function() {
    this.resizeTimeout = null;
    return this.actualResizeHandler();
  };

  this.resizeThrottler = function() {
    if (!this.resizeTimeout) {
      return this.resizeTimeout = setTimeout(this.resizeInner, 250);
    }
  };

  this.actualResizeHandler = function() {
    this.gotoTop();
    return this.moveToCurrentPage();
  };

  this.initAllPages = function() {
    return this.fitAllPages();
  };

  this.fitAllPages = function() {
    var page, _i, _len, _ref, _results;
    _ref = this.allPageElements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      page = _ref[_i];
      _results.push(fitPage(page));
    }
    return _results;
  };

  this.gotoTop = function() {
    this.currentPage.element.scrollTop = 0;
    window.scrollTo(0, 0);
    this.fitToolbars();
    return this.fitAllPages();
  };

  this.moveToCurrentPage = function() {
    var style, width, x;
    width = window.innerWidth;
    x = -(this.currentPage.index * width);
    style = "";
    if (window.moving) {
        style = "transition: -webkit-transform 300ms;";
        style +="transition: -moz-transform 300ms;"
    }
    style += "-webkit-transform: translate3d( " + x + "px ,0,0); -moz-transform:translate3d( " + x + "px,0,0)";
    return inner.setAttribute("style", style);
  };

  this.goNext = function() {
    return goto("#" + currentPage.next.id);
  };

  this.goPrev = function() {
    return goto("#" + currentPage.previous.id);
  };

  this.goto = function(hash) {
    var inner, item, matches, pageElement, pageIndex, _i, _j, _len, _len1, _ref;
    window.moving = true;
    pageIndex = hash.split("#")[1];
    if (!list.hasOwnProperty(pageIndex)) {
      log("ERROR: can not find page info for: " + pageIndex);
      return false;
    }
    pageElement = document.querySelector(hash);
    inner = document.querySelectorAll(".inner")[0];
    if (!pageElement) {
      log("No Page Element: " + hash);
      return false;
    }
    this.currentPage = list[pageIndex];
    this.currentPage.element = pageElement;
    this.gotoTop();
    this.moveToCurrentPage();
    if (currentPage.next.id) {
      this.nextButton.setAttribute("href", "#" + currentPage.next.id);
      remove("last");
    } else {
      add("last");
    }
    if (currentPage.previous.id) {
      this.prevButton.setAttribute("href", "#" + currentPage.previous.id);
      remove("first");
    } else {
      add("first");
    }
    _ref = this.menuItems;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      item.classList.remove("highlight");
    }
    matches = document.querySelectorAll('#menu .inner a[href="' + hash + '"]');
    for (_j = 0, _len1 = matches.length; _j < _len1; _j++) {
      item = matches[_j];
      item.classList.add("highlight");
    }
    stopCurrent();
    if (currentPage.media.length > 0) {
      add("sound");
      if (has("autoplay")) {
        playCurrent();
        window.moving = false;
        return true;
      }
    } else {
      remove("sound");
    }
    window.moving = false;
    return true;
  };

}).call(this);
