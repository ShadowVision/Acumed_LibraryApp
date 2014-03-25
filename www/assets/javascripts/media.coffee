##################
# MEDIA
##################

@initMedia = () ->
  log "@initMedia"
  @play = get("play-icon")
  @audio = get("audio")
  @audio.addEventListener 'ended', window.audioEnded

window.audioStatus = (e) ->
  log("audioStatus = " + e)
  if e > 2
    remove "playing"

window.audioPosition = (e) ->
  log("audioPosition = " + e)
  d = new Date()
  if (window.lastClick + 500) < d.getTime()
    log "autoplay calling goNext()"
    goNext()
  else
    log "autoplay *not* calling goNext()"


#flag to prevent re-entry when stopping because of next button
window.ending = false
window.moving = false

window.audioEnded = (e) ->
  log "audioEnded"

  if window.ending or window.moving
    return false

  window.ending = true

  if has 'autoplay'
#    log("has autoplay = " + (has 'autoplay'))
#    log("window.moving=" + window.moving)
#    log("window.ending=" + window.ending)
    if window.media?
      log "checking position"
      window.media.getCurrentPosition(window.audioPosition)
    else
      log "autoplay calling goNext()"
      goNext();
  else
    log "onending calling stopCurrent()"
    stopCurrent()

  window.ending = false
  log "exit onending"
  return true

@togglePlaying = ->
  log "@togglePlaying"
  if has("playing")
    stopCurrent()
  else
    playCurrent()

@toggleAutoPlay = ->
  if has "autoplay"
    remove "autoplay"
    stopCurrent()
  else
    add "autoplay"
    playCurrent()

@playCurrent = ->
  log "playCurrent"
  add "playing"
  src = "assets/media/" + currentPage.media

  if device? and device.platform is "Android"
      href = self.location.href
      index = href.indexOf("index.html")
      path = href.substr(0,index)
      log("opening: " + path + src)

      if window.media?
        if lastSource != src
          window.media.stop()
          window.media.release()

      window.media = new Media(path + src, window.audioEnded, log, window.audioStatus);
      window.media.play()
      lastSource = src
      add "playing"
      log("playing: " + path + src)
  else
    if audio.getAttribute("src") != src
      audio.setAttribute "src", src
      audio.load()

    audio.play()
  return true

@stopCurrent = ->
  log "@stopCurrent"
  remove "playing"
  if device? and device.platform is "Android"
      if window.media?
        window.media.pause();
  if audio?
    audio.pause()
  return true

@onPlayPause = () ->
  log "@onPlayPause"
  if has "playing"
    stopCurrent()
  else
    playCurrent()

@restartCurrent = ->
  log "@restartCurrent"
  stopCurrent()
  if device?
    if device.platform is "Android"
      window.media.seekTo(0);
      playCurrent()
      return true
  audio.load()
  playCurrent()