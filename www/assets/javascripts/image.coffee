@zoomEnabled = true

@zoomImage = (target) ->
  if @zoomEnabled
    image = all("#image")[0]
    path = target.getAttribute "src"
    url = 'url(' + path + ')'
    image.style.backgroundImage = url
    add "image-zoom"

@unzoomImage = () ->
  remove "image-zoom"
