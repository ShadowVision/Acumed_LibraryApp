
@setZoom = (size) ->
  remove "small"
  remove "medium"
  remove "large"
  add size

@setSizeSML = (sizeSML) ->
  document.setAttribute("data-size", sizeSML)
