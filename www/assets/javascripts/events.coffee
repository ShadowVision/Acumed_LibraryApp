@initEvents = () ->
  listen "click", click

@click = (e) ->
  log(e.type + e.target)
  @list = e.target.classList
  id = e.target.id
  d = new Date()
  window.lastClick = d.getTime()
  if id in ["menu-icon", "font-size-icon"]
    switch id
      when  "menu-icon"
        toggle("menu")
        gotoTop()
      when  "font-size-icon"
        toggle("settings")
  else
    clearMenus()
    switch id
      when "play-icon" then togglePlaying()
      when "restart-icon" then restartCurrent()
      when "autoplay-icon" then toggleAutoPlay()
      when "set-zoom-small" then setZoom("small")
      when "set-zoom-medium" then setZoom("medium")
      when "set-zoom-large" then setZoom("large")
      else
        if e.target.tagName is "IMG"
#          if e.target.parentElement.classList.contains "Basic-Image"
          zoomImage(e.target)

  if( e.target.tagName in ['A']) and (e.target.hash)
    success = goto(e.target.hash)
    if success
      e.stopPropagation();
      e.preventDefault()
      return false
    else
      return true
  else
    if( e.target.tagName in ['BUTTON'])
      e.stopPropagation();
      e.preventDefault()
      return false