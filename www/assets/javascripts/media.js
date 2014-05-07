(function() {
    this.initMedia = function() {
        log("@initMedia");
        this.play = get("play-icon");
        this.audio = get("audio");
        return this.audio.addEventListener('ended', window.audioEnded);
    };

    window.audioStatus = function(e) {
        log("audioStatus = " + e);
        if (e > 2) {
            return remove("playing");
        }
    };

    window.audioPosition = function(e) {
        var d;
        log("audioPosition = " + e);
        d = new Date();
        if ((window.lastClick + 500) < d.getTime()) {
            log("autoplay calling goNext()");
            return goNext();
        } else {
            return log("autoplay *not* calling goNext()");
        }
    };

    window.ending = false;

    window.moving = false;

    window.audioEnded = function(e) {
        log("audioEnded");
        if (window.ending || window.moving) {
            return false;
        }
        window.ending = true;
        if (has('autoplay')) {
            if (window.media != null) {
                log("checking position");
                window.media.getCurrentPosition(window.audioPosition);
            } else {
                log("autoplay calling goNext()");
                goNext();
            }
        } else {
            log("onending calling stopCurrent()");
            stopCurrent();
        }
        window.ending = false;
        log("exit onending");
        return true;
    };

    this.togglePlaying = function() {
        log("@togglePlaying");
        if (has("playing")) {
            return stopCurrent();
        } else {
            return playCurrent();
        }
    };

    this.toggleAutoPlay = function() {
        if (has("autoplay")) {
            remove("autoplay");
            return stopCurrent();
        } else {
            add("autoplay");
            return playCurrent();
        }
    };

    this.playCurrent = function() {
        var href, index, lastSource, path, src;
        log("playCurrent");
        add("playing");
        src = "assets/media/" + currentPage.media;
        if ((typeof device !== "undefined") && device.platform === "Android") {
            href = self.location.href;
            index = href.indexOf("index.html");
            path = href.substr(0, index);
            src = "assets/media/" + currentPage.media;
            log("opening: " + src);
            if (window.media != null) {
                if (lastSource !== src) {
                    window.media.stop();
                    window.media.release();
                }
            }
            window.media = new Media(path + src, log, log, window.audioStatus);
            window.media.play();
            lastSource = src;
            add("playing");
            log("playing: " + src);
        } else {
            if (audio.getAttribute("src") !== src) {
                audio.setAttribute("src", src);
                audio.load();
            }
            audio.play();
        }
        return true;
    };

    this.stopCurrent = function() {
        log("@stopCurrent");
        remove("playing");
        if ((typeof device !== "undefined" && device !== null) && device.platform === "Android") {
            if (window.media != null) {
                window.media.pause();
            }
        }
        if (typeof audio !== "undefined" && audio !== null) {
            audio.pause();
        }
        return true;
    };

    this.onPlayPause = function() {
        log("@onPlayPause");
        if (has("playing")) {
            return stopCurrent();
        } else {
            return playCurrent();
        }
    };

    this.restartCurrent = function() {
        log("@restartCurrent");
        stopCurrent();
        if ((typeof device !== "undefined") && device.platform === "Android") {
            window.media.seekTo(0);
            playCurrent();
            return true;
        }
        audio.load();
        return playCurrent();
    };

}).call(this);