##################
# NAV
##################

@initNav = () ->
  @prevButton = get("prev-icon")
  @nextButton = get("next-icon")
  @allPageElements = document.querySelectorAll('div[data-role="page"]')
  @menuItems = document.querySelectorAll('#menu .inner a')

  initAllPages()

  if location and location.hash
    goto(location.hash)
  else
    goto("#title")

  listenOn window, "orientationchange", @fitPage

  window.addEventListener("resize", @resizeThrottler, false);

  setInterval @fitAllPages, 1000

@clearMenus = () ->
  remove("menu")
  remove("settings")

@fitToolbars = () ->
  header = get "header"
  footer = get "footer"
  header.style.width = window.innerWidth + "px"
  footer.style.width = window.innerWidth + "px"

@fitPage = (page) ->
  page.style.width = window.innerWidth + "px"

@resizeTimeout

@resizeInner = () ->
  @resizeTimeout = null;
  @actualResizeHandler();

@resizeThrottler = () ->
  if not @resizeTimeout
    @resizeTimeout = setTimeout( @resizeInner, 250 )

@actualResizeHandler = () ->
  @gotoTop()
  @moveToCurrentPage()

@initAllPages = () ->
  @fitAllPages()

@fitAllPages = () ->
  for page in @allPageElements
    fitPage(page)

@gotoTop = () ->
  @currentPage.element.scrollTop = 0
  window.scrollTo 0, 0
  @fitToolbars()
  @fitAllPages()

@moveToCurrentPage = () ->
  width = window.innerWidth
  x = -(@currentPage.index * width)
  style = ""

  if window.moving
    style = "transition: -webkit-transform 300ms;"

  style += "-webkit-transform: translate3d( " + x + "px ,0,0)"
  inner.setAttribute("style", style)

@goNext = () ->
  goto("#" + currentPage.next.id)

@goPrev = () ->
  goto("#" + currentPage.previous.id)

@goto = (hash) ->
  window.moving = true
  pageIndex = hash.split("#")[1]

  if !list.hasOwnProperty(pageIndex)
    log "ERROR: can not find page info for: " + pageIndex
    return false

  pageElement = document.querySelector(hash)
  inner = document.querySelectorAll(".inner")[0]

  if !pageElement
    log "No Page Element: " + hash
    return false

  @currentPage = list[pageIndex]
  @currentPage.element = pageElement

  @gotoTop()
  @moveToCurrentPage()

  if currentPage.next.id
    @nextButton.setAttribute("href", "#" + currentPage.next.id)
    remove "last"
  else
    add "last"

  if currentPage.previous.id
    @prevButton.setAttribute("href", "#" + currentPage.previous.id)
    remove "first"
  else
    add "first"

  for item in @menuItems
    item.classList.remove("highlight")

  matches = document.querySelectorAll('#menu .inner a[href="'+hash+'"]')

  for item in matches
    item.classList.add("highlight")

  stopCurrent()
  if currentPage.media.length > 0
    add "sound"
    if has "autoplay"
      playCurrent()
      window.moving = false
      return true
  else
    remove "sound"
  window.moving = false
  return true