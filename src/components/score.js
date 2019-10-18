import PropTypes from "prop-types"
import React from "react"

const SCORE_BARS = [4, 3, 2, 1]

const Score = ({ score }) => (
  <div className="score">
    {SCORE_BARS.map(val => (
      <div key={val} className={`score-bar ${score >= val ? "filled" : ""}`} />
    ))}
  </div>
)

Score.propTypes = {
  score: PropTypes.number.isRequired,
}

export default Score
