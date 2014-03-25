##################
# UTIL
# #################

@add = (name)  -> return document.body.classList.add(name)
@all = (selector) -> return document.querySelectorAll(selector)
@get = (id) -> return document.getElementById(id)
@has = (name)  -> return document.body.classList.contains(name)

@listen = (eventName, handler, capture) ->
  return document.addEventListener(eventName, handler, capture or true)

@listenOn = (object, eventName, handler, capture) ->
  return object.addEventListener(eventName, handler, capture or true)

@log = (msg)   ->
  get("log").innerHTML = msg + "<br>" + get("log").innerHTML
  console.log(msg)

@remove = (name)  -> return document.body.classList.remove(name)
@toggle = (name) -> return (if has(name) then remove(name) else add(name))
@touchable = () -> return ('ontouchmove' in document.documentElement)

@isMobile = () ->
  if device?
    return true
  else
    return false

#
#Android = () ->
#  if navigator.userAgent.match(/Android/i)
#    return true
#  else
#    return false
#
#iOS = () ->
#  if navigator.userAgent.match(/iPhone|iPad|iPod/i)
#    return true
#  else
#    return false

#BlackBerry = () -> return navigator.userAgent.match(/BlackBerry/i) ? true : false
#Windows = () -> return navigator.userAgent.match(/IEMobile/i) ? true : false
