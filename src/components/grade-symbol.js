import PropTypes from "prop-types"
import React from "react"

const PassIcon = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={style || {}}
    viewBox="0 0 19 19"
  >
    <path
      fill="currentColor"
      fillRule="nonzero"
      d="M19 9.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 1 1 19 0zM8.401 14.53l7.049-7.048a.613.613 0 0 0 0-.867l-.867-.867a.613.613 0 0 0-.867 0l-5.748 5.748-2.684-2.683a.613.613 0 0 0-.867 0l-.867.867a.613.613 0 0 0 0 .866l3.984 3.984c.24.24.628.24.867 0z"
    />
  </svg>
)

const FailIcon = ({ style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={style || {}}
    viewBox="0 0 19 19"
  >
    <path
      fill="currentColor"
      fillRule="nonzero"
      d="M9.5 0A9.498 9.498 0 0 0 0 9.5C0 14.748 4.252 19 9.5 19S19 14.748 19 9.5 14.748 0 9.5 0zm4.658 11.994a.46.46 0 0 1 0 .651l-1.517 1.513a.46.46 0 0 1-.651 0L9.5 11.645l-2.494 2.513a.46.46 0 0 1-.651 0l-1.513-1.517a.46.46 0 0 1 0-.651L7.355 9.5 4.842 7.006a.46.46 0 0 1 0-.651l1.517-1.517a.46.46 0 0 1 .651 0L9.5 7.355l2.494-2.513a.46.46 0 0 1 .651 0l1.517 1.517a.46.46 0 0 1 0 .651L11.645 9.5l2.513 2.494z"
    />
  </svg>
)

const GradeSymbol = ({ value }) => {
  let gradeClass = `pass`
  let gradeLabel = `Passing grade`
  let gradeIcon = <PassIcon style={{ width: 20, height: 20 }} />
  if (value < 0) {
    gradeClass = `fail`
    gradeLabel = `Failing grade`
    gradeIcon = <FailIcon style={{ width: 20, height: 20 }} />
  } else if (value === 0) {
    gradeClass = `empty`
    gradeLabel = `No information for grade`
    gradeIcon = null
  }
  return (
    <span
      className={`report-card-grade ${gradeClass}`}
      role="img"
      aria-label={gradeLabel}
    >
      {gradeIcon}
    </span>
  )
}

GradeSymbol.propTypes = {
  value: PropTypes.number.isRequired,
}

export default GradeSymbol
