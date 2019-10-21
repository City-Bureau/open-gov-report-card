import PropTypes from "prop-types"
import React from "react"

const GRADES = ["F", "D", "C", "B", "A"]

const Grade = ({ score, isLarge }) => (
  <div
    className={`grade ${score} ${GRADES[score]} ${isLarge ? "is-large" : ""}`}
  >
    <span>{GRADES[score]}</span>
  </div>
)

Grade.propTypes = {
  score: PropTypes.number.isRequired,
  isLarge: PropTypes.bool,
}

Grade.defaultProps = {
  isLarge: false,
}

export default Grade
