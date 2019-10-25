import PropTypes from "prop-types"
import React from "react"
import { getGrade } from "../grading"

const Grade = ({ score, isLarge }) => (
  <div className={`grade ${getGrade(score)} ${isLarge ? "is-large" : ""}`}>
    <span>{getGrade(score)}</span>
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
