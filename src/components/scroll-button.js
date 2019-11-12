import PropTypes from "prop-types"
import React from "react"
import Chevron from "./chevron"

const SCROLL_DISTANCE = 256

const ScrollButton = ({ isLeft, scrollEl }) => {
  const onClick = () => {
    if (!scrollEl) return
    const { scrollLeft } = scrollEl.current
    const diff = SCROLL_DISTANCE * (isLeft ? -1 : 1)
    scrollEl.current.scroll({ left: scrollLeft + diff, behavior: "smooth" })
  }

  return (
    <button
      className="scroll-button"
      onClick={onClick}
      type="button"
      aria-hidden="true"
      tabIndex="-1"
    >
      <Chevron style={{ transform: isLeft ? "rotate(180deg)" : `` }} />
    </button>
  )
}

ScrollButton.propTypes = {
  isLeft: PropTypes.bool,
  scrollEl: PropTypes.node,
}

ScrollButton.defaultProps = {
  isLeft: false,
  scrollEl: null,
}

export default ScrollButton
