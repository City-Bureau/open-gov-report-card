import PropTypes from "prop-types"
import React from "react"
import Chevron from "./chevron"

const ScrollButton = ({ isLeft, scrollEl }) => {
  const onClick = () => {
    if (!scrollEl) return
    const { scrollLeft } = scrollEl.current
    const diff = isLeft ? -200 : 200
    scrollEl.current.scroll({ left: scrollLeft + diff, behavior: "smooth" })
  }

  // TODO: Fix chevron size on mobile
  return (
    <button className="scroll-button" onClick={onClick}>
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
