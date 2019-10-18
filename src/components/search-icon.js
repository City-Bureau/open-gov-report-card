import React from "react"

const SearchIcon = ({ style }) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13 13"
    style={style || {}}
  >
    <path
      fill="currentColor"
      d="M9.291 8.176h-.587l-.208-.2A4.81 4.81 0 0 0 9.663 4.83 4.831 4.831 0 1 0 4.83 9.663a4.81 4.81 0 0 0 3.144-1.167l.201.208v.587L11.893 13 13 11.893 9.291 8.176zm-4.46 0a3.34 3.34 0 0 1-3.344-3.345A3.34 3.34 0 0 1 4.83 1.487 3.34 3.34 0 0 1 8.176 4.83a3.34 3.34 0 0 1-3.345 3.345z"
    ></path>
  </svg>
)

export default SearchIcon
