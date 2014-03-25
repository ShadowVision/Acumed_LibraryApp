########
# MAIN #
########

init = () ->
  log 'main'
  initNav()
  initMedia()
  initSwipe()
  initEvents()

  if location.hash
    goto location.hash
  else
    goto "#title"

init()
