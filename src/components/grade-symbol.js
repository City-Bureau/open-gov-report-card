import PropTypes from "prop-types"
import React from "react"

const GradeSymbol = ({ value }) => {
  let gradeClass = `pass`
  if (value < 0) {
    gradeClass = `fail`
  } else if (value === 0) {
    gradeClass = `empty`
  }
  return (
    <span
      className={`report-card-grade ${gradeClass}`}
      role="img"
      aria-label="Passing grade"
    />
  )
}

GradeSymbol.propTypes = {
  value: PropTypes.number.isRequired,
}

export default GradeSymbol
