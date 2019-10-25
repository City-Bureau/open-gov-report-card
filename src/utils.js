import { geoMercator } from "d3-geo"

export const projectPoint = ([lon, lat], bounds) => {
  const width = 500
  const height = 600
  const projection = geoMercator()
    .scale(1)
    .translate([0, 0])
  const s =
    1.0 /
    Math.max(
      (bounds[1][0] - bounds[0][0]) / width,
      (bounds[1][1] - bounds[0][1]) / height
    )
  const t = [
    (width - s * (bounds[1][0] + bounds[0][0])) / 2,
    (height - s * (bounds[1][1] + bounds[0][1])) / 2,
  ]

  return projection.scale(s).translate(t)([lon, lat])
}

/* eslint-disable */
// Debounce function from underscore
export const debounce = (func, wait, immediate) => {
  let timeout
  return function() {
    const context = this
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
/* eslint-enable */
