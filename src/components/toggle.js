import React, { Fragment, useState } from "react"

const Toggle = ({ index, children }) => {
  const [toggleLabel, toggleContent] = children
  const [active, setActive] = useState("")
  const toggleActive = () => setActive(active === "" ? "active" : "")
  const onKeyPress = event => {
    if (event.key === "Enter") {
      toggleActive()
    }
  }

  return (
    <Fragment>
      <div
        className="toggle"
        role="button"
        tabIndex="0"
        onClick={toggleActive}
        onKeyPress={onKeyPress}
        aria-controls={`toggle-${index}`}
        aria-expanded={active.toString()}
      >
        {toggleLabel}
        <span className="info-toggle">?</span>
      </div>
      <div className="toggle-content" style={{ display: active ? `` : `none` }}>
        {toggleContent}
      </div>
    </Fragment>
  )
}

export default Toggle
