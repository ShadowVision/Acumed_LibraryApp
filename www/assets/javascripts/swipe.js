// Generated by CoffeeScript 1.6.3
(function() {
  var goLeft, goRight, moveEnd, moveProgress, moveStart;

  this.initSwipe = function() {
    log("touch enabled");
    listen("gesturestart", log);
    listen("gestureend", log);
    listen("touchstart", moveStart);
    listen("touchmove", moveProgress);
    return listen("touchend", moveEnd);
  };

  goRight = function() {
    log("going right");
    return this.goPrev();
  };

  goLeft = function() {
    log("going left");
    return this.goNext();
  };

  moveStart = function(event) {
    this.startTime = (new Date()).getTime();
    if (event.changedTouches) {
      this.startPositionX = event.changedTouches[0].pageX;
      return this.startPositionY = event.changedTouches[0].pageY;
    } else {
      this.startPositionX = event.pageX;
      return this.startPositionY = event.pageY;
    }
  };

  moveProgress = function(event) {
    if (event.changedTouches) {
      this.endPositionX = event.changedTouches[0].pageX;
      return this.endPositionY = event.changedTouches[0].pageY;
    } else {
      this.endPositionX = event.pageX;
      return this.endPositionY = event.pageY;
    }
  };

  moveEnd = function(event) {
    var absoluteX, absoluteY, deltaX, deltaY, distance, distanceThreshold, edgeThreshold, endTime, isFarEnough, isFastEnough, isHorizontal, isNearEdge, isNearLeftEdge, isNearRightEdge, isRight, isSwipe, isVertical, maximumSpeed, minimumSpeed, pixelsPerMilliSecond, ratioThresholds, timeDelta;
    edgeThreshold = 72;
    minimumSpeed = 0.2;
    maximumSpeed = 2;
    distanceThreshold = 72;
    ratioThresholds = 2;
    isNearLeftEdge = this.startPositionX < edgeThreshold;
    isNearRightEdge = this.startPositionX > (innerWidth - edgeThreshold);
    isNearEdge = isNearLeftEdge || isNearRightEdge;
    endTime = (new Date()).getTime();
    timeDelta = endTime - this.startTime;
    if (this.startPositionX === 0 && this.startPositionY === 0) {
      return false;
    }
    deltaX = this.startPositionX - this.endPositionX;
    deltaY = this.startPositionY - this.endPositionY;
    this.startPositionX = 0;
    this.startPositionY = 0;
    this.endPositionX = 0;
    this.endPositionY = 0;
    absoluteX = Math.abs(deltaX);
    absoluteY = Math.abs(deltaY);
    distance = Math.sqrt((absoluteX * absoluteX) + (absoluteY * absoluteY));
    if (absoluteX / absoluteY > ratioThresholds) {
      isHorizontal = true;
    } else if (absoluteY / absoluteX > ratioThresholds) {
      isVertical = true;
    } else {
      return false;
    }
    pixelsPerMilliSecond = absoluteX / timeDelta;
    isFarEnough = distance > distanceThreshold;
    isFastEnough = pixelsPerMilliSecond > minimumSpeed && pixelsPerMilliSecond < maximumSpeed;
    isSwipe = isNearEdge && isHorizontal && isFastEnough && isFarEnough;
    isRight = deltaX < 0;
    if (isSwipe) {
      if (isRight) {
        log("right");
        goRight();
      } else {
        log("left");
        goLeft();
      }
    } else {
      log("not swipe");
      return false;
    }
    return true;
  };

}).call(this);
