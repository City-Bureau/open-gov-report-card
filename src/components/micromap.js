import PropTypes from "prop-types"
import React from "react"
import { projectPoint } from "../utils"

const Micromap = ({ style, path, bounds, points }) => (
  <svg viewBox="0,0,550,650" style={style} className="micromap">
    <g transform="translate(25,25)">
      <path d={path} fill="currentColor"></path>
      {points.map((point, idx) => {
        let [x, y] = projectPoint(point, bounds)
        return <circle key={idx} cx={x} cy={y} r={25} />
      })}
    </g>
  </svg>
)

Micromap.propTypes = {
  style: PropTypes.object,
  path: PropTypes.string.isRequired,
  bounds: PropTypes.array.isRequired,
  points: PropTypes.array,
}

Micromap.defaultProps = {
  style: {},
  points: [],
}

export default Micromap
