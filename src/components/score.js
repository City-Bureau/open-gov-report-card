import PropTypes from "prop-types"
import React from "react"

const SCORE_BARS = [1, 2, 3, 4]

const Score = ({ score, isLarge }) => (
  <div className={`score ${isLarge ? "is-large" : ""}`}>
    {SCORE_BARS.map(val => (
      <div key={val} className={`score-bar ${score >= val ? "filled" : ""}`} />
    ))}
  </div>
)

Score.propTypes = {
  score: PropTypes.number.isRequired,
  isLarge: PropTypes.bool,
}

Score.defaultProps = {
  isLarge: false,
}

export default Score
