import PropTypes from "prop-types"
import React from "react"

const GradeSymbol = ({ value }) => {
  let gradeClass = `pass`
  let gradeLabel = `Passing grade`
  if (value < 0) {
    gradeClass = `fail`
    gradeLabel = `Failing grade`
  } else if (value === 0) {
    gradeClass = `empty`
    gradeLabel = `No information for grade`
  }
  return (
    <span
      className={`report-card-grade ${gradeClass}`}
      role="img"
      aria-label={gradeLabel}
    />
  )
}

GradeSymbol.propTypes = {
  value: PropTypes.number.isRequired,
}

export default GradeSymbol
