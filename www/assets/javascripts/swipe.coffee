##################
# SWIPE
##################

@initSwipe = () ->
  log "touch enabled"
  listen "gesturestart", log
  listen "gestureend", log
  listen "touchstart", moveStart
  listen "touchmove", moveProgress
  listen "touchend", moveEnd

goRight = () ->
  log("going right")
  @goPrev()

goLeft = () ->
  log("going left")
  @goNext()

moveStart = (event) ->
  @startTime = (new Date()).getTime()
  if event.changedTouches
    @startPositionX = event.changedTouches[0].pageX
    @startPositionY = event.changedTouches[0].pageY
  else
    @startPositionX = event.pageX
    @startPositionY = event.pageY
#  log("moveStart" + @startPositionX + " " + @startPositionY)

moveProgress = (event) ->
#  log "moveProgress"
#  log event
  if event.changedTouches
    @endPositionX = event.changedTouches[0].pageX
    @endPositionY = event.changedTouches[0].pageY
  else
    @endPositionX = event.pageX
    @endPositionY = event.pageY

moveEnd = (event) ->
#  log("moveEnd" + @endPositionX + " " + @endPositionY)
  edgeThreshold =  72
  minimumSpeed = 0.2 #p/ms
  maximumSpeed = 2 #p/ms
  distanceThreshold = 72
#  log "distanceThreshold = " + distanceThreshold
  ratioThresholds = 2 # to one
#  log "ratioThresholds = " + ratioThresholds + " to one"

  isNearLeftEdge = @startPositionX < edgeThreshold
  isNearRightEdge = @startPositionX > (innerWidth - edgeThreshold)
  isNearEdge = isNearLeftEdge or isNearRightEdge

  endTime = (new Date()).getTime()
  timeDelta = endTime - @startTime
#  log("endTime / delta = " + endTime + " / " + timeDelta)

  if @startPositionX is 0 and @startPositionY is 0
    return false

  deltaX = @startPositionX - @endPositionX
  deltaY = @startPositionY - @endPositionY

  @startPositionX = 0
  @startPositionY = 0
  @endPositionX = 0
  @endPositionY = 0

  absoluteX = Math.abs( deltaX )
  absoluteY = Math.abs( deltaY )

  #  Thanks Pythagoras!
  distance = Math.sqrt((absoluteX * absoluteX) + (absoluteY * absoluteY))
#  log("distance: " + distance )

  if (absoluteX / absoluteY > ratioThresholds)
#    log("Horizontal")
    isHorizontal = true
  else if (absoluteY / absoluteX > ratioThresholds)
#    log("Vertical")
    isVertical = true
  else
#    log("Neither")
    return false

  pixelsPerMilliSecond = absoluteX / timeDelta

  isFarEnough =  distance > distanceThreshold
  isFastEnough = (pixelsPerMilliSecond > minimumSpeed and pixelsPerMilliSecond < maximumSpeed)

  isSwipe = isNearEdge and isHorizontal and isFastEnough and isFarEnough

  isRight = deltaX < 0

  if isSwipe
    if isRight
      log("right")
      goRight()
    else
      log("left")
      goLeft()
  else
    log("not swipe")
    return false

  return true

